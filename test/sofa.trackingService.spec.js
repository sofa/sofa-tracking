'use strict';
/* global sofa */

describe('sofa.TrackingService', function () {

    var trackingService, trackerMock;

    beforeEach(function () {
        var q = new sofa.QService(),
            httpService = new sofa.mocks.httpService(q),
            configService = new sofa.ConfigService();

        trackerMock = {
            setup: function () {},
            trackEvent: function () {},
            trackTransaction: function () {}
        };

        trackingService = new sofa.TrackingService(window, httpService, configService);
    });

    it('should be defined', function () {
        expect(trackingService).toBeDefined();
    });

    it('should be an object', function () {
        expect(typeof trackingService).toBe('object');
    });

    it('should have a method addTracker', function () {
        expect(trackingService.addTracker).toBeDefined();
    });

    it('should have a method trackEvent', function () {
        expect(trackingService.trackEvent).toBeDefined();
    });

    it('should have a method trackTransaction', function () {
        expect(trackingService.trackTransaction).toBeDefined();
    });

    describe('sofa.TrackingService#addTracker', function () {

        it('should be a function', function () {
            expect(typeof trackingService.addTracker).toBe('function');
        });

        it('should add a tracker', function () {
            trackingService.addTracker(trackerMock);
            expect(trackingService.__trackers.length).toBe(1);
        });
    });

    describe('sofa.TrackingService#trackEvent', function () {

        beforeEach(function () {
            trackingService.__trackers = [];
        });

        it('should be a function', function () {
            expect(typeof trackingService.trackEvent).toBe('function');
        });

        it('should track an event', function () {
            spyOn(trackerMock, 'trackEvent');
            trackingService.addTracker(trackerMock);
            trackingService.trackEvent();
            expect(trackerMock.trackEvent).toHaveBeenCalled();
        });
    });

    describe('sofa.TrackingService#trackTransaction', function () {

        it('should be a function', function () {
            expect(typeof trackingService.trackTransaction).toBe('function');
        });
    });
});
