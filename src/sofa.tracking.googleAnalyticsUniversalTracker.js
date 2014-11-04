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
    self.trackEvent = function () {
        ga('set', 'anonymizeIp', true);
        ga('send', 'pageview');
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

        ga('require', 'ec');

        transactionData.items.forEach(function (item) {
            ga('ec:addProduct', {
                'id': item.id,
                'name': item.name,
                'category': null,
                'brand': null,
                'variant': item.variant.id,
                'price': item.price / 100.0,
                'quantity': item.quantity
            });
        });

        ga('ec:setAction', 'purchase', {
            'id': transactionData.id,
            'affiliation': null,
            'revenue': transactionData.totals.grandTotal / 100.0,
            'tax': transactionData.totals.taxSum / 100.0,
            'shipping': transactionData.totals.shippingAmount / 100.0,
            'coupon': null
        });

        ga('send', 'pageview', {
            'anonymizeIp': true
        });
    };

    return self;
});
