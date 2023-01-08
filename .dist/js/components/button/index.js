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
import styles from './button.less';
import React from 'react';
import _ from 'underscore';
import Icon, { IconSize, CaretRight } from '../icons';
export var ButtonSize;
(function (ButtonSize) {
    ButtonSize["LARGE"] = "large";
    ButtonSize["SMALL"] = "small";
})(ButtonSize || (ButtonSize = {}));
export var ButtonType;
(function (ButtonType) {
    ButtonType["PRIMARY"] = "primary";
    ButtonType["GHOST"] = "ghost";
    ButtonType["SECONDARY"] = "secondary";
    ButtonType["GHOST_PRIMARY"] = "ghost_primary";
})(ButtonType || (ButtonType = {}));
var BtnIcnMap = _.object([ButtonSize.LARGE, ButtonSize.SMALL,], [IconSize.LARGE, IconSize.SMALL,]);
var Button = function (args) {
    var globalClass = 'button';
    var buttonClassMods = [];
    buttonClassMods.push(globalClass + '_' + args.size);
    buttonClassMods.push(globalClass + '_' + args.type);
    if (args.isDisabled)
        buttonClassMods.push(globalClass + '_disabled');
    if (!args.label && args.icon)
        buttonClassMods.push(globalClass + '_icon-only');
    var htmlAnchorProps = _.omit(args, 'size', 'type', 'isDisabled', 'isCaret', 'label', 'icon');
    return (React.createElement("a", __assign({}, htmlAnchorProps, { className: "".concat(args.className, " ").concat(globalClass, " ").concat(buttonClassMods.join(' '), " ").concat(styles.wrapperClass) }),
        args.icon &&
            React.createElement(Icon, { className: "".concat(globalClass, "__icon"), useIcon: args.icon, size: BtnIcnMap[args.size] || IconSize.SMALL }),
        args.label &&
            React.createElement("span", { className: "".concat(globalClass, "__label") }, args.label),
        args.isCaret &&
            React.createElement(Icon, { useIcon: CaretRight, size: IconSize.SMALL })));
};
export default Button;
