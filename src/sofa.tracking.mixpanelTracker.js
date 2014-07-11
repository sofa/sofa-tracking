'use strict';
/* global sofa */

/**
 * @name mixpanelTracker
 * @namespace sofa.tracking.mixpanelTracker
 *
 * @description
 * A Mixpanel Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.MixpanelTracker', function (options) {

    var self = {};

    /**
     * @method setup
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * Sets up Mixpanel tracking code snippet with provided client
     * information like account number and domain name.
     */
    self.setup = function () {
        /* jshint ignore:start */
        (function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
        for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
        /* jshint ignore:end */

        window.mixpanel.init(options.token);
    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * The bread and butter of Mixpanel, where it can track actions instead of pageviews
     */
    self.trackAction = function (action, actionData) {
        actionData['Store Name'] = options.storePath;
        window.mixpanel.track(action, actionData);
    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * Dummy tracking method for Mixpanel, only actions can be tracked.
     */
    self.trackEvent = function () {

    };

    /**
     * @method trackTransaction
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * Dummy tracking method for Mixpanel, only actions can be tracked.
     */
    self.trackTransaction = function () {

    };

    return self;
});
