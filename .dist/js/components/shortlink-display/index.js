import styles from './shortlink-display.less';
import React from 'react';
import _ from 'underscore';
import Link, { LinkColors } from '../link';
import clipboardTools from '../../js/clipboard-tools';
export var ShortlinkDisplay = function (_a) {
    var placeholder = _a.placeholder, hashLength = _a.hashLength, shortlink = _a.shortlink, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b;
    function copyOnClick() {
        if (shortlink) {
            clipboardTools.copy(shortlink);
        }
    }
    var globalClass = 'shortlink-display';
    var shortlinkDisplayMods = [];
    if (_.isEmpty(shortlink))
        shortlinkDisplayMods.push(globalClass + '_empty');
    var placeholderText = placeholder + '/____';
    var linkLabel = '← Copy shortlink';
    if (isLoading)
        linkLabel = 'Loading...';
    if (_.isEmpty(shortlink))
        linkLabel = '← Link will appear here';
    var displayShortlink = (new String(shortlink)).replace(/^https?\:\/\//ig, '');
    var activeActionWrapperClass = !_.isEmpty(shortlink) ? 'shortlink-display__action-wrapper_has-shortlink' : '';
    return (React.createElement("div", { className: "".concat(styles.wrapperClass, " ").concat(globalClass, " ").concat(shortlinkDisplayMods.join(' ')), onClick: copyOnClick },
        React.createElement("div", { className: "shortlink-display__action-wrapper ".concat(activeActionWrapperClass), onClick: copyOnClick },
            React.createElement("span", { className: 'shortlink-display__text' }, shortlink ? displayShortlink : placeholderText),
            React.createElement(Link, { href: '#', className: 'shortlink-display__copy_pseudolink', colorScheme: LinkColors.APP, isDisabled: _.isEmpty(shortlink), isLoading: isLoading, label: linkLabel }))));
};
