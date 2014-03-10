'use strict';
/* global sofa */

describe('sofa.tracking.googleAnalyticsTracker', function () {

    var tracker;

    beforeEach(function () {
        tracker = new sofa.tracking.GoogleAnalyticsTracker();
    });

    it('should be defined', function () {
        expect(tracker).toBeDefined();
    });

    it('should be an object', function () {
        expect(typeof tracker).toBe('object');
    });

    it('should have a method setup', function () {
        expect(tracker.setup).toBeDefined();
    });

    it('should have a method trackEvent', function () {
        expect(tracker.trackEvent).toBeDefined();
    });

    it('should have a method trackTransaction', function () {
        expect(tracker.trackTransaction).toBeDefined();
    });

    describe('sofa.tracking.googleAnalyticsTracker#trackEvent', function () {

        it('should be a function', function () {
            expect(typeof tracker.trackTransaction).toBe('function');
        });
    });

    describe('sofa.tracking.googleAnalyticsTracker#trackTransaction', function () {

        it('should be a function', function () {
            expect(typeof tracker.trackTransaction).toBe('function');
        });
    });
});
