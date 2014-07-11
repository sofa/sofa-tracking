'use strict';
/* global sofa */
/* global Image */
/**
 * @name BingTracker
 * @namespace sofa.tracking.BingTracker
 *
 * @description
 * A Bing Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.BingTracker', function (options) {

    var self = {};

    /**
     * @method setup
     * @memberof sofa.tracking.BingTracker
     *
     * @description
     * Sets up Bing tracking code snippet with provided client
     * information like account number and domain name.
     */
    self.setup = function () {

    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.BingTracker
     *
     * @description
     * Dummy tracking method for Bing, only transactions can be tracked.
     */
    self.trackEvent = function () {

    };

    /**
     * @method trackAction
     * @memberof sofa.tracking.BingTracker
     *
     * @description
     * Dummy tracking method for Bing, only transactions can be tracked.
     */
    self.trackAction = function () {

    };

    /**
     * @method trackTransaction
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
