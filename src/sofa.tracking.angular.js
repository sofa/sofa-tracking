'use strict';

angular
    .module('sofa.tracking', ['sofa.core'])
    .factory('trackingService', function () {
        return new sofa.tracking.TrackingService();
    });
