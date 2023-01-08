var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import _ from 'underscore';
import React from 'react';
import styles from './hero-input.less';
import Button, { ButtonSize, ButtonType } from '../button';
import { Cross, Enter } from '../icons';
import { testShortcutPasteWithKeyboard } from '../../js/utils';
import clipboardTools from '../../js/clipboard-tools';
var HeroInput = function (_a) {
    var _this = this;
    var onChange = _a.onChange, onSubmit = _a.onSubmit, name = _a.name, placeholder = _a.placeholder, _b = _a.value, value = _b === void 0 ? "" : _b, inputRef = _a.inputRef;
    var _c = React.useState(false), isFocus = _c[0], setFocus = _c[1];
    var handleKeyDown = function (event) {
        if (event.keyCode == 13 && _.isFunction(onSubmit)) {
            onSubmit();
        }
    };
    var handlePaste = function () { return __awaiter(_this, void 0, void 0, function () {
        var clipText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clipboardTools.paste()];
                case 1:
                    clipText = _a.sent();
                    if (clipText && clipText != '') {
                        onChange(clipText);
                        onSubmit();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClear = function () {
        onChange('');
    };
    var onFocus = function () { return setFocus(true); };
    var onBlur = function () { return setFocus(false); };
    var wrapperMods = [];
    if (isFocus)
        wrapperMods.push(styles.wrapperClass + '_focus');
    if (testShortcutPasteWithKeyboard())
        wrapperMods.push(styles.wrapperClass + '_can-shortcut-paste');
    if (value && value != '') {
        wrapperMods.push(styles.wrapperClass + '_not-empty');
    }
    else {
        wrapperMods.push(styles.wrapperClass + '_empty');
    }
    return (React.createElement("div", { className: "".concat(styles.wrapperClass, " ").concat(wrapperMods.join(' ')) },
        React.createElement("input", { className: "hero-input", id: styles.labelId, ref: inputRef, onChange: function (event) { return onChange(event.target.value); }, onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: onBlur, name: name, value: value, autoComplete: 'off' }),
        React.createElement("div", { className: "hero-input__actions" },
            React.createElement("label", { htmlFor: styles.labelId },
                React.createElement(Button, { className: 'hero-input__clear', icon: Cross, type: ButtonType.GHOST_PRIMARY, size: ButtonSize.LARGE, onClick: handleClear })),
            React.createElement("label", { htmlFor: styles.labelId },
                React.createElement(Button, { className: 'hero-input__paste', label: 'Paste', type: ButtonType.PRIMARY, size: ButtonSize.LARGE, onClick: handlePaste })),
            React.createElement(Button, { icon: Enter, className: 'hero-input__create', label: 'Create', type: ButtonType.PRIMARY, size: ButtonSize.LARGE, onClick: onSubmit })),
        React.createElement("div", { className: "placeholder placeholder_".concat((value != '') ? 'hide' : 'show') }, placeholder)));
};
export default HeroInput;
