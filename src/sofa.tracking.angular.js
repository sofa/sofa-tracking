'use strict';

angular.module('sofa.tracking', ['sofa.core'])

.factory('trackingService', function($window, $http, configService) {
    return new sofa.tracking.TrackingService($window, $http, configService);
});
