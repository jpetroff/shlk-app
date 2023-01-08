import styles from './icons.less';
import React from 'react';
import LogoSvg from '../../assets/svg/logo.svg';
import LogoCSvg from '../../assets/svg/logo-compact.svg';
import AvatarSvg from '../../assets/svg/icon/avatar.svg';
import CaretRightSvg from '../../assets/svg/icon/caret-right.svg';
import CrossSvg from '../../assets/svg/icon/cross.svg';
import EnterSvg from '../../assets/svg/icon/enter.svg';
export var Logo = LogoSvg;
export var LogoC = LogoCSvg;
export var Avatar = AvatarSvg;
export var CaretRight = CaretRightSvg;
export var Cross = CrossSvg;
export var Enter = EnterSvg;
export var IconSize;
(function (IconSize) {
    IconSize["SMALL"] = "small";
    IconSize["LARGE"] = "large";
})(IconSize || (IconSize = {}));
var Icon = function (_a) {
    var useIcon = _a.useIcon, size = _a.size;
    var globalClass = 'icon-svg';
    var IconNode = useIcon;
    return (React.createElement("div", { className: "".concat(styles.wrapperClass, " ").concat(globalClass, " ").concat(globalClass, "_size-").concat(size) },
        React.createElement(IconNode, { className: "".concat(globalClass, "__node") })));
};
export default Icon;
