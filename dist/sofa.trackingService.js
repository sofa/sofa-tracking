;(function (sofa, undefined) {

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
sofa.define('sofa.TrackingService', function ($window, $http, configService) {

    var self = {};
    var trackers = self.__trackers = [];

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

                trackers.forEach(function (tracker) {
                    tracker.trackTransaction(transactionData);
                });
            });

    };

    return self;
});

}(sofa));
