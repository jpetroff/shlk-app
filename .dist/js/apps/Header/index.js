var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import styles from './Header.less';
import React from 'react';
import { Logo, LogoC } from '../../components/icons';
import constants from '../../js/constants';
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.isMobile = Modernizr.mq(constants.MediaQueries.mobile);
        return _this;
    }
    Header.prototype.render = function () {
        return (React.createElement("div", { className: "".concat(styles.wrapperClass, " app-header") },
            React.createElement(Logo, { className: "app-header__logo app-header__logo_d" }),
            React.createElement(LogoC, { className: "app-header__logo app-header__logo_m" })));
    };
    return Header;
}(React.Component));
export { Header };
