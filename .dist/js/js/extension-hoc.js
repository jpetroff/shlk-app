var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect } from 'react';
import browserApi from './browser-api';
browserApi.onMessage(function (message, sender, sendResponse) {
    return true;
});
export function withExtension(Component) {
    function ComponentWithExtensionProp(props) {
        var _a = useState(''), activeTabUrl = _a[0], setActiveTabUrl = _a[1];
        useEffect(function () {
            function deferredStateUpdate(result) {
                console.log(result, activeTabUrl);
                setActiveTabUrl(result.url);
            }
            browserApi.getTab(true).then(deferredStateUpdate);
        });
        return React.createElement(Component, __assign({}, props, { extension: { activeTabUrl: activeTabUrl } }));
    }
    return ComponentWithExtensionProp;
}
