/**
 * sofa-tracking - v0.9.3 - Wed May 06 2015 18:42:46 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
'use strict';

angular
    .module('sofa.tracking', ['sofa.core'])
    .factory('trackingService', function () {
        return new sofa.tracking.TrackingService();
    });
}(angular));
