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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/ban-types */
import styles from './Home.less';
import { modifyURLSlug, validateURL } from '../../js/utils';
import config from '../../js/config.development';
import React from 'react';
import _ from 'underscore';
import HeroInput from '../../components/hero-input/index';
import { ShortlinkDisplay } from '../../components/shortlink-display';
import { ShortlinkSlugInput } from '../../components/shortlink-slug-input';
import linkTools from '../../js/url-tools';
import clipboardTools from '../../js/clipboard-tools';
import Query from '../../js/shortlink-queries';
import LSC from '../../js/localstorage-cache';
import { Header } from '../Header';
var globalCommands;
(function (globalCommands) {
    globalCommands[globalCommands["submitAndCopy"] = 0] = "submitAndCopy";
})(globalCommands || (globalCommands = {}));
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props) || this;
        var predefinedLocation = linkTools.queryUrlSearchParams(['l'], (_b = (_a = props.router) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.search)[0];
        _this.state = {
            location: _.unescape(predefinedLocation || ''),
            generatedShortlink: undefined,
            generatedDescriptiveShortlink: undefined,
            generatedHash: undefined,
            userTag: 'evgn',
            descriptionTag: '',
            errorState: {},
            loadingState: {
                createLinkIsLoading: false,
                createDescriptiveLinkIsLoading: false
            }
        };
        _this.heroInputRef = React.createRef();
        // _.bindAll(this, 'updateLocation', 'submitLocation', 'handleSuccessPaste', 'handleDescriptorChange', '_submitDescriptor', 'saveLSCache')
        _.bindAll.apply(_, __spreadArray([_this], _.functions(_this), false));
        _this.submitDescriptor = _.debounce(_this._submitDescriptor, 500);
        _this.updateDeferredLocation = _.once(function () { var _a; return ((_a = _this.props.extension) === null || _a === void 0 ? void 0 : _a.activeTabUrl) && _this.setState({ location: _this.props.extension.activeTabUrl }); });
        return _this;
    }
    Home.prototype.componentDidMount = function () {
        if (this.heroInputRef.current)
            this.heroInputRef.current.focus();
        if (validateURL(this.state.location))
            this.submitLocation();
        this.handleGlobalEvents(true);
    };
    Home.prototype.componentWillUnmount = function () {
        this.handleGlobalEvents(false);
    };
    Home.prototype.handleGlobalEvents = function (bind) {
        if (bind === void 0) { bind = true; }
        if (bind) {
            window.addEventListener('keypress', this.onGlobalKeypress);
        }
        else {
            window.removeEventListener('keypress', this.onGlobalKeypress);
        }
    };
    Home.prototype.onGlobalKeypress = function (event) {
        console.log('keypress', event);
        if (event.ctrlKey && event.shiftKey && event.code == 'KeyC') {
            this.handleGlobalCommand(globalCommands.submitAndCopy);
        }
    };
    Home.prototype.componentDidUpdate = function () {
        var _a;
        console.log('UPD', this.props);
        if (((_a = this.props.extension) === null || _a === void 0 ? void 0 : _a.activeTabUrl) != this.state.location)
            this.updateDeferredLocation();
    };
    Home.prototype.updateLocation = function (str) {
        this.setState({
            location: str.trim(),
            generatedShortlink: undefined,
            generatedDescriptiveShortlink: undefined,
            generatedHash: undefined,
        });
    };
    Home.prototype.handleGlobalCommand = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('global command:', command);
                        _a = command;
                        switch (_a) {
                            case globalCommands.submitAndCopy: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.submitLocation()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, clipboardTools.copy(this.state.generatedShortlink)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.setShortlinkState = function (args) {
        console.log(args);
        var newState = {
            generatedShortlink: linkTools.generateShortlinkFromHash(args.hash),
            generatedHash: args.hash,
            location: args.location,
            errorState: {
                createLinkResult: undefined
            }
        };
        if (!_.isEmpty(args.descriptionTag)) {
            newState = __assign(__assign({}, newState), { userTag: args.userTag, descriptionTag: args.descriptionTag, generatedDescriptiveShortlink: linkTools.generateDescriptiveShortlink({ userTag: args.userTag, descriptionTag: args.descriptionTag }) });
        }
        this.setState(newState);
        _.defer(this.saveLSCache);
    };
    Home.prototype.retrieveLSCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cachedURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LSC.checkShortlinkCache({ url: this.state.location })];
                    case 1:
                        cachedURL = _a.sent();
                        if (cachedURL == null || !cachedURL.hash)
                            return [2 /*return*/, false];
                        if (this.state.userTag != cachedURL.userTag ||
                            (this.state.descriptionTag != '' && this.state.descriptionTag != cachedURL.descriptionTag))
                            return [2 /*return*/, false];
                        console.log('[LS] Retrieved object:\n', cachedURL);
                        this.setShortlinkState({
                            location: cachedURL.url,
                            hash: cachedURL.hash,
                            userTag: cachedURL.userTag,
                            descriptionTag: cachedURL.descriptionTag
                        });
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Home.prototype.saveLSCache = function () {
        if (!this.state.generatedHash)
            console.error('Empty hash to be saved!');
        LSC.storeShortlink({
            url: this.state.location,
            hash: this.state.generatedHash,
            userTag: this.state.userTag,
            descriptionTag: this.state.descriptionTag
        });
    };
    Home.prototype.submitLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var location, cachedResult, locationUrl, result_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._clearErrorState();
                        location = this.state.location.trim();
                        if (_.isEmpty(location))
                            return [2 /*return*/];
                        return [4 /*yield*/, this.retrieveLSCache()];
                    case 1:
                        cachedResult = _a.sent();
                        if (cachedResult)
                            return [2 /*return*/];
                        this.setState({ loadingState: { createLinkIsLoading: true } });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        locationUrl = linkTools.fixProtocol(location);
                        return [4 /*yield*/, Query.createShortlink(locationUrl)];
                    case 3:
                        result_1 = _a.sent();
                        console.log('[Home] submitLocation\n', result_1);
                        if (!result_1 || !result_1.hash)
                            throw new Error("Unexpected error: shortlink for '".concat(locationUrl, "' was not created. Please, try again"));
                        this.setShortlinkState({
                            location: result_1.location,
                            hash: result_1.hash
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        this.setState({ errorState: { createLinkResult: err_1 } });
                        console.error(err_1);
                        return [3 /*break*/, 5];
                    case 5:
                        this.setState({ loadingState: { createLinkIsLoading: false } });
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.handleSuccessPaste = function (clipText) {
        this.setState({
            location: clipText
        });
        this.submitLocation();
    };
    Home.prototype.handleDescriptorChange = function (value, type) {
        if (type == 'userTag')
            this.setState({ userTag: modifyURLSlug(value) });
        else if (type == 'descriptionTag')
            this.setState({ descriptionTag: modifyURLSlug(value) });
        this.setState({ loadingState: { createDescriptiveLinkIsLoading: true } });
        this.submitDescriptor();
    };
    Home.prototype._submitDescriptor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result_2, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._clearErrorState();
                        console.log('[Home] submitDescriptor\n', this.state.userTag, this.state.descriptionTag);
                        if (_.isEmpty(this.state.descriptionTag)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.retrieveLSCache()];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Query.createShortlinkDescriptor({ userTag: this.state.userTag,
                                descriptionTag: this.state.descriptionTag,
                                location: this.state.location,
                                hash: this.state.generatedHash
                            })];
                    case 3:
                        result_2 = _a.sent();
                        if (!result_2 || !result_2.descriptor)
                            return [2 /*return*/];
                        this.setShortlinkState({
                            location: result_2.location,
                            hash: result_2.hash,
                            userTag: result_2.descriptor.userTag,
                            descriptionTag: result_2.descriptor.descriptionTag
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        console.error(err_2);
                        return [3 /*break*/, 5];
                    case 5:
                        this.setState({ loadingState: { createDescriptiveLinkIsLoading: false } });
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype._generateTextPattern = function () {
        return [
            linkTools.displayServiceUrl + '/',
            { key: 'userTag', value: this.state.userTag, placeholder: 'user' },
            '@',
            { key: 'descriptionTag', value: this.state.descriptionTag, placeholder: 'your-custom-url' },
        ];
    };
    Home.prototype._clearErrorState = function () {
        this.setState({ errorState: {} });
    };
    Home.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Header, null),
            React.createElement("div", { className: "".concat(styles.homepage, " body__layout") },
                React.createElement("div", { className: "body__layout__offset-wrapper" },
                    React.createElement(HeroInput, { inputRef: this.heroInputRef, onChange: this.updateLocation, onSubmit: this.submitLocation, name: "URL", placeholder: "Type or paste a link", value: this.state.location })),
                React.createElement(ShortlinkDisplay, { placeholder: config.displayServiceUrl, shortlink: this.state.generatedShortlink, isLoading: this.state.loadingState.createLinkIsLoading }),
                this.state.generatedShortlink &&
                    React.createElement(ShortlinkSlugInput, { text: this._generateTextPattern(), onChange: this.handleDescriptorChange, show: this.state.generatedShortlink ? true : false, generatedLink: this.state.generatedDescriptiveShortlink, isLoading: this.state.loadingState.createDescriptiveLinkIsLoading }))));
    };
    return Home;
}(React.Component));
export { Home };
