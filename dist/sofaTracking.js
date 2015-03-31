/**
 * sofa-tracking - v0.8.0 - Tue Mar 31 2015 18:06:35 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, document, undefined) {
'use strict';
/* global sofa */
/* global Image */
/**
 * @sofadoc class
 * @name sofa.tracking.BingTracker
 * @namespace sofa.tracking
 *
 * @package sofa-tracking
 *
 * @requiresPackage sofa-core
 * @requiresPackage sofa-http-service
 * @distFile dist/sofa.tracking.js
 *
 * @description
 * A Bing Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.BingTracker', function (options) {

    var self = {};

    /**
     * @sofadoc method
     * @name sofa.tracking.BingTracker#setup
     * @memberof sofa.tracking.BingTracker
     *
     * @description
     * Sets up Bing tracking code snippet with provided client
     * information like account number and domain name.
     */
    self.setup = function () {

    };

    /**
     * @sofadoc method
     * @name sofa.tracking.BingTracker#trackEvent
     * @memberof sofa.tracking.BingTracker
     *
     * @description
     * Dummy tracking method for Bing, only transactions can be tracked.
     */
    self.trackEvent = function () {

    };

    /**
     * @sofadoc method
     * @name sofa.tracking.BingTracker#trackTransaction
     * @memberof sofa.tracking.BingTracker
     *
     * @description
     * Pushes transaction data using the Bing Ecommerce Tracking API
     *
     * @param {object} transactionData Transaction data object.
     */
    self.trackTransaction = function (transactionData) {
        var url = '//flex.msn.com/mstag/tag/' + options.siteId +
        '/analytics.html?dedup=' + (options.dedup || '1') +
        '&domainId=' + (options.domainId) +
        '&type=' + (options.type || '1') +
        '&revenue=' + transactionData.totals.subtotal +
        '&actionid=' + options.actionId;
        var image = new Image(1, 1);
        image.src = url;
    };

    return self;
});

'use strict';
/* global sofa */

/**
 * @sofadoc class
 * @name sofa.tracking.GoogleAdwordsConversionTracker
 * @namespace sofa.tracking
 *
 * @package sofa-tracking
 * @requiresPackage sofa-core
 * @requiresPackage sofa-http-service
 *
 * @distFile dist/sofa.tracking.js
 *
 * @description
 * A Google AdWords Conversion Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.GoogleAdwordsConversionTracker', function () {

    var self = {};

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAdwordsConversionTracker#trackConversion
     * @memberof sofa.tracking.GoogleAdwordsConversionTracker
     *
     * @description
     *
     *
     * @param {object} conversionData Event data object.
     */
    /* jshint ignore:start */
    self.trackConversion = function (conversionData) {

        var google_conversion_id = conversionData.id,
            google_conversion_language = conversionData.lang,
            google_conversion_format = conversionData.format,
            google_conversion_color = conversionData.color,
            google_conversion_label = conversionData.label,
            google_conversion_value = conversionData.value,
            google_conversion_currency = conversionData.currency,
            google_remarketing_only = conversionData.remarketing;

        var oldDocumentWrite = document.write;

        // change document.write temporary
        document.write = function (node) {
            document.body.appendChild(node);
        };

        (function () {
            var s = document.createElement('script');
            s.src = '//www.googleadservices.com/pagead/conversion.js';
            s.async = true,
            s.onload = function () {
                setTimeout(function () {
                    document.write = oldDocumentWrite;
                }, 100);
            };
            document.body.appendChild(s);
        }());
    };
    /* jshint ignore:end */

    return self;
});

'use strict';
/* global sofa */
/* global document */
/* global window */
/* global Image */
/* global _gaq */
/* global location */
/**
 * @sofadoc class
 * @name sofa.tracking.GoogleAnalyticsTracker
 * @namespace sofa.tracking
 *
 * @package sofa-tracking
 * @requiresPackage sofa-core
 * @requiresPackage sofa-http-service
 *
 * @distFile dist/sofa.tracking.js
 *
 * @description
 * A Google Analytics Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.GoogleAnalyticsTracker', function (options) {

    var self = {};

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAnalyticsTracker#setup
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
     * @sofadoc method
     * @name sofa.tracking.GoogleAnalyticsTracker#trackEvent
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
        }

        _gaq.push(dataToBePushed);
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAnalyticsTracker#trackTransaction
     * @memberof sofa.tracking.GoogleAnalyticsTracker
     *
     * @description
     * Pushes transaction data using the Google Analytics Ecommerce Tracking API
     *
     * @param {object} transactionData Transaction data object.
     */
    self.trackTransaction = function (transactionData) {

        if (options.conversionId) {
            var url = 'http://www.googleadservices.com/pagead/conversion/' +
                options.conversionId + '/?value=' + transactionData.totals.subtotal + '&label=' +
                options.conversionLabel + '&guid=ON&script=0';
            var image = new Image(1, 1);
            image.src = url;
        }

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
/* global ga */

/**
 * @sofadoc class
 * @name sofa.tracking.GoogleAnalyticsUniversalTracker
 * @namespace sofa.tracking
 *
 * @package sofa-tracking
 * @requiresPackage sofa-core
 * @requiresPackage sofa-http-service
 *
 * @distFile dist/sofa.tracking.js
 *
 * @description
 * A Google Analytics Universal Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.GoogleAnalyticsUniversalTracker', function (options) {

    var self = {};

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAnalyticsUniversalTracker#setup
     * @memberof sofa.tracking.GoogleAnalyticsUniversalTracker
     *
     * @description
     * Sets up Google Analytics Universal tracking code snippet with provided client
     * information like account number and domain name.
     */
    self.setup = function () {
        /* jshint ignore:start */
        var disableStr = 'ga-disable-' + options.accountNumber;

        if (document.cookie.indexOf(disableStr + '=true') > -1) {
          window[disableStr] = true;
        }

        function gaOptout() {
          document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
          window[disableStr] = true;
        }

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        /* jshint ignore:end */

        ga('create', options.accountNumber, 'auto');
        ga('require', 'linkid', 'linkid.js');
        ga('require', 'displayfeatures');
        ga('require', 'ec');
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAnalyticsUniversalTracker#trackEvent
     * @memberof sofa.tracking.GoogleAnalyticsUniversalTracker
     *
     * @description
     * Explicit event tracking. This method pushes tracking data
     * to Google Analytics Universal.
     *
     * @param {object} eventData Event data object.
     */
    self.trackEvent = function (eventData) {
        ga('set', 'anonymizeIp', true);

        eventData.category = eventData.category || '';
        eventData.action = eventData.action || '';
        eventData.label = eventData.label || '';
        eventData.value = eventData.value || '';

        if (eventData.category === 'pageView') {
            ga('send', 'pageview', eventData.label);
        } else {
            ga('send', {
                'hitType': 'event',
                'eventCategory': eventData.category,
                'eventAction': eventData.action,
                'eventLabel': eventData.label,
                'eventValue': eventData.value
            });
        }
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAnalyticsUniversalTracker#trackTransaction
     * @memberof sofa.tracking.GoogleAnalyticsUniversalTracker
     *
     * @description
     * Pushes transaction data using the Google Analytics Universal Ecommerce Tracking API
     *
     * @param {object} transactionData Transaction data object.
     */
    self.trackTransaction = function (transactionData) {

        transactionData.items.forEach(function (item) {
            ga('ec:addProduct', {
                'id': item.sku,
                'name': item.name,
                'category': null,
                'brand': null,
                'variant': null,
                'price': item.price,
                'quantity': item.qty
            });
        });

        ga('ec:setAction', 'purchase', {
            'id': transactionData.token,
            'affiliation': null,
            'revenue': transactionData.totals.grandtotal,
            'tax': transactionData.totals.vat,
            'shipping': transactionData.totals.shipping,
            'coupon': null
        });

        ga('send', 'pageview', {
            'anonymizeIp': true
        });
    };

    return self;
});

'use strict';
/* global sofa */
/**
 * @sofadoc class
 * @name sofa.tracking.TrackingService
 * @namespace sofa.tracking
 *
 * @package sofa-tracking
 *
 * @requiresPackage sofa-core
 * @requiresPackage sofa-http-service
 *
 * @requires window
 * @requires sofa.HttpService
 * @requires sofa.ConfigService
 *
 * @distFile dist/sofa.tracking.js
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
     * @sofadoc method
     * @name sofa.tracking.TrackingService#addTracker
     * @memberof sofa.tracking.TrackingService
     *
     * @description
     * Adds a concrete tracker service implementation and also takes care
     * of the setup.
     *
     * @param {object} tracker Concrete tracker implementation.
     */
    self.addTracker = function (tracker) {
        if (tracker.setup && typeof tracker.setup === 'function') {
            tracker.setup();
        }

        trackers.push(tracker);
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#trackEvent
     * @memberof sofa.tracking.TrackingService
     *
     * @description
     * Forces all registered trackers to track an event.
     *
     * @param {object} eventData Event data object.
     */
    self.trackEvent = function (eventData) {

        self.emit('trackEvent', self, eventData);

        trackers.forEach(function (tracker) {
            if (tracker.trackEvent && typeof tracker.trackEvent === 'function') {
                tracker.trackEvent(eventData);
            }
        });
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#trackTransaction
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
                    if (tracker.trackTransaction && typeof tracker.trackTransaction === 'function') {
                        tracker.trackTransaction(transactionData);
                    }
                });
            });

    };

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#trackConversion
     * @memberof sofa.TrackingService
     *
     * @description
     * Forces all registered trackers to track a conversion.
     *
     * @param {obj} conversion data object.
     */
    self.trackConversion = function (conversionData) {

        self.emit('trackConversion', self, conversionData);

        trackers.forEach(function (tracker) {
            if (tracker.trackConversion && typeof tracker.trackConversion === 'function') {
                tracker.trackConversion(conversionData);
            }
        });
    };

    return self;
});
}(sofa, document));
