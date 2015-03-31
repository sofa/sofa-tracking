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
            s.async = true;
            s.onload = function () {
                setTimeout(function () {
                    document.write = oldDocumentWrite;
                }, 100);
            };
        }());
    };
    /* jshint ignore:end */

    return self;
});
