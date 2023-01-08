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
import { useLocation, useNavigate, useParams } from 'react-router';
import React from 'react';
export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        var location = useLocation();
        var navigate = useNavigate();
        var params = useParams();
        return React.createElement(Component, __assign({}, props, { router: { location: location, navigate: navigate, params: params } }));
    }
    return ComponentWithRouterProp;
}
