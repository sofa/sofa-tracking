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
