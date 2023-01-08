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
import styles from './link.less';
import React from 'react';
import _ from 'underscore';
import Icon, { IconSize } from '../icons';
export var LinkColors;
(function (LinkColors) {
    LinkColors["USER"] = "user";
    LinkColors["APP"] = "app";
})(LinkColors || (LinkColors = {}));
var Link = function (_args) {
    var args = _.clone(_args);
    _.defaults(args, {
        isDisabled: false,
        isLoading: false,
        colorScheme: LinkColors.APP
    });
    if (_.isEmpty(args.label))
        return (React.createElement(React.Fragment, null));
    var globalClass = 'link';
    var linkMods = [];
    linkMods.push(globalClass + '_' + args.colorScheme);
    if (args.isLoading)
        linkMods.push(globalClass + '_loading');
    if (args.isDisabled || args.isLoading)
        linkMods.push(globalClass + '_disabled');
    if (args.parentHover)
        linkMods.push(globalClass + '_parent-hover');
    var htmlAnchorAttributes = _.omit(args, 'colorScheme', 'label', 'icon', 'iconSize', 'isDisabled', 'iconRight', 'isLoading', 'parentHover');
    return (React.createElement("a", __assign({}, htmlAnchorAttributes, { className: "".concat(styles.wrapperClass, " ").concat(globalClass, " ").concat(linkMods.join(' '), " ").concat(args.className) }),
        args.icon && !args.iconRight &&
            React.createElement(Icon, { useIcon: args.icon, size: args.iconSize || IconSize.SMALL }),
        args.label,
        args.icon && args.iconRight &&
            React.createElement(Icon, { useIcon: args.icon, size: args.iconSize || IconSize.SMALL })));
};
export default Link;
