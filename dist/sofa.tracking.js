;(function (sofa, undefined) {

'use strict';
/* global sofa */
/* global document */
/* global window */
/* global Image */
/* global _gaq */
/* global location */
/**
 * @name GoogleAnalyticsTracker
 * @namespace sofa.tracking.GoogleAnalyticsTracker
 *
 * @description
 * A Google Analytics Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.GoogleAnalyticsTracker', function (options) {

    var self = {};

    /**
     * @method setup
     * @memberof sofa.tracking.GoogleAnalyticsTracker
     *
     * @description
     * Sets up Google Analytics tracking code snippet with provided client
     * information like account number and domain name.
     */
    self.setup = function () {
        var _gaq = self._gaq = window._gaq = window._gaq || [];

        _gaq.push(['_setAccount', options.accountNumber]);
        _gaq.push(['_setDomainName', options.domainName]);
        _gaq.push(['_setAllowLinker', true]);

        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.GoogleAnalyticsTracker
     *
     * @description
     * Explicit event tracking. This method pushes tracking data
     * to Google Analytics.
     *
     * @param {object} eventData Event data object.
     */
    self.trackEvent = function (eventData) {

        eventData.category = eventData.category || '';
        eventData.action = eventData.action || '';
        eventData.label = eventData.label || '';
        eventData.value = eventData.value || '';

        var dataToBePushed = [];

        if (eventData.category === 'pageView') {
            dataToBePushed.push('_trackPageview');
            dataToBePushed.push(eventData.label);
        } else {
            // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
            dataToBePushed.push('_trackEvent');
            dataToBePushed.push(eventData.category);
            dataToBePushed.push(eventData.action);
            dataToBePushed.push(eventData.label);

            // value is optional
            if (eventData.value) {
                dataToBePushed.push(eventData.value);
            }

            if (eventData.action === 'google_conversion' && options.conversionId) {
                var url = 'http://www.googleadservices.com/pagead/conversion/' +
                    options.conversionId + '/?value=' + eventData.value + '&label=' +
                    options.conversionLabel + '&guid=ON&script=0';
                var image = new Image(1, 1);
                image.src = url;
            }
        }

        _gaq.push(dataToBePushed);
    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.GoogleAnalyticsTracker
     *
     * @description
     * Pushes transaction data using the Google Analytics Ecommerce Tracking API
     *
     * @param {object} transactionData Transaction data object.
     */
    self.trackTransaction = function (transactionData) {
        _gaq.push(['_gat._anonymizeIp']);
        _gaq.push(['_addTrans',
            transactionData.token,               // transaction ID - required
            location.host,                       // affiliation or store name
            transactionData.totals.subtotal,     // total - required; Shown as "Revenue" in the
                                                 // Transactions report. Does not include Tax and Shipping.
            transactionData.totals.vat,          // tax
            transactionData.totals.shipping,     // shipping
            '',                                  // city
            '',                                  // state or province
            transactionData.billing.countryname, // country
        ]);

        transactionData.items.forEach(function (item) {
            _gaq.push(['_addItem',
                transactionData.token,           // transaction ID - necessary to associate item with transaction
                item.productId,                  // SKU/code - required
                item.name,                       // product name - necessary to associate revenue with product
                '',                              // category or variation
                item.price,                      // unit price - required
                item.qty                         // quantity - required
            ]);
        });

        _gaq.push(['_trackTrans']);

    };

    return self;
});

'use strict';
/* global sofa */
/**
 * @name TrackingService
 * @namespace sofa.TrackingService
 *
 * @description
 * Abstraction layer to communicate with concrete tracker services
 * like Google Analytics.
 */
sofa.define('sofa.tracking.TrackingService', function ($window, $http, configService) {

    var self = {};
    var trackers = self.__trackers = [];

    //allow this service to raise events
    sofa.observable.mixin(self);

    /**
     * @method addTracker
     * @memberof sofa.TrackingService
     *
     * @description
     * Adds a concrete tracker service implementation and also takes care
     * of the setup. It'll throw exceptions if the tracker service
     * doesn't implement the needed API.
     *
     * @param {object} tracker Concrete tracker implementation.
     */
    self.addTracker = function (tracker) {

        if (!tracker.setup) {
            throw new Error('tracker must implement a setup method');
        }

        if (!tracker.trackEvent) {
            throw new Error('tracker must implement a trackEvent method');
        }

        if (!tracker.trackTransaction) {
            throw new Error('tracker must implement a trackTransaction method');
        }

        tracker.setup();
        trackers.push(tracker);
    };

    /**
     * @method trackEvent
     * @memberof sofa.TrackingService
     *
     * @description
     * Forces all registered trackers to track an event.
     *
     * @param {object} eventData Event data object.
     */
    self.trackEvent = function (eventData) {

        self.emit('trackEvent', self, eventData);

        trackers.forEach(function (tracker) {
            tracker.trackEvent(eventData);
        });
    };

    /**
     * @method trackTransaction
     * @memberof sofa.TrackingService
     *
     * @description
     * First requests information about a token from the backend, then
     * forces all registered trackers to track the associated transaction.
     *
     * @param {string} token.
     */
    self.trackTransaction = function (token) {

        var requestTransactionDataUrl = configService.get('checkoutUrl') + 'summaryfin.php';

        $http.get(requestTransactionDataUrl + '?token=' + token + '&details=get')
            .then(function (response) {
                var transactionData = sofa.Util.toJson(response.data);

                transactionData.token = token;

                self.emit('trackTransaction', self, transactionData);

                trackers.forEach(function (tracker) {
                    tracker.trackTransaction(transactionData);
                });
            });

    };

    return self;
});

}(sofa));
