'use strict';
/* global sofa, document */

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
     * @name sofa.tracking.GoogleAdwordsConversionTracker#setup
     * @memberof sofa.tracking.GoogleAdwordsConversionTracker
     *
     * @description
     *
     *
     */
    self.setup = function () {
        (function () {
            var s = document.createElement('script');
            s.src = '//www.googleadservices.com/pagead/conversion_async.js';
            s.async = true;
            document.body.appendChild(s);
        }());
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.GoogleAdwordsConversionTracker#trackConversion
     * @memberof sofa.tracking.GoogleAdwordsConversionTracker
     *
     * @description
     *
     *
     * @param {object} conversionData.
     */
    /* jshint ignore:start */
    self.trackConversion = function (conversionData) {
        window.google_trackConversion({
            google_conversion_id: conversionData.id,
            google_conversion_language: conversionData.lang,
            google_conversion_format: conversionData.format,
            google_conversion_color: conversionData.color,
            google_conversion_label: conversionData.label,
            google_conversion_value: conversionData.value,
            google_conversion_currency: conversionData.currency,
            google_remarketing_only: conversionData.remarketing
        });
    };
    /* jshint ignore:end */

    return self;
});
