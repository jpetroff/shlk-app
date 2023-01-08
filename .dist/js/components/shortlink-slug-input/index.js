import styles from './shortlink-slug-input.less';
import _ from 'underscore';
import React from 'react';
import Link, { LinkColors } from '../link';
export var ShortlinkSlugInput = function (_a) {
    var text = _a.text, onChange = _a.onChange, _b = _a.show, show = _b === void 0 ? true : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, generatedLink = _a.generatedLink;
    var hideClass = show ? '' : styles.wrapperClass + '_hide';
    var linkLabel = '← Copy custom shortlink';
    if (_.isEmpty(generatedLink))
        linkLabel = '';
    if (isLoading)
        linkLabel = 'Loading...';
    var activeActionWrapperClass = !_.isEmpty(generatedLink) ? 'slug-input__action-wrapper_has-shortlink' : '';
    function handleCopy() {
        if (_.isFunction(navigator.clipboard.writeText) && generatedLink) {
            navigator.clipboard.writeText(generatedLink);
        }
    }
    return (React.createElement("div", { className: "".concat(styles.wrapperClass, " ").concat(hideClass) },
        React.createElement("div", { className: 'slug-input__label' }, "Customize link further with a custom slug"),
        React.createElement("div", { className: "slug-input__action-wrapper ".concat(activeActionWrapperClass), onClick: handleCopy },
            React.createElement("div", { className: 'slug-input-wrapper' }, text.map(function (chunk, index) {
                if (_.isString(chunk)) {
                    return (React.createElement("span", { key: index, className: "text-filler input-common-style" }, chunk));
                }
                else {
                    return (React.createElement("span", { key: index, className: "input-resizable" },
                        React.createElement("input", { className: "input-resizable__real-input input-common-style", value: chunk.value, onChange: function (event) { onChange(event.target.value, chunk.key); } }),
                        React.createElement("span", { className: "input-resizable__width-sizer input-common-style input-resizable__width-sizer_".concat(chunk.value ? 'hide' : 'show') }, chunk.value || chunk.placeholder)));
                }
            })),
            React.createElement(Link, { href: '#', className: 'slug-input__copy_pseudolink', colorScheme: LinkColors.APP, isDisabled: _.isEmpty(generatedLink), isLoading: isLoading, label: linkLabel }))));
};
