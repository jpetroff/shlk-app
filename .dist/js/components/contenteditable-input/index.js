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
import styles from './contenteditable-input.less';
import _ from 'underscore';
import React from 'react';
import ContentEditable from 'react-contenteditable';
export var ContentEditableInput = function (props) {
    var passProps = _.omit(props, ['placeholder', 'ref']);
    var id = React.useState(btoa((Math.random() * 100000).toString()).replace(/[=/+]/ig, ''))[0];
    var placeholderStyle = "#".concat(id, ":after {content: '").concat(_.isEmpty(props.html) ? props.placeholder : '', "'}");
    var handleKeyPress = function (event) {
        console.log(event.nativeEvent);
        if (event.nativeEvent.keyCode == 13)
            event.nativeEvent.preventDefault();
        if (event.nativeEvent.keyCode == 32) {
            event.nativeEvent.preventDefault();
            var pos = window.getSelection();
        }
    };
    return (React.createElement("span", { className: styles.wrapperClass },
        React.createElement(ContentEditable, __assign({ id: id }, passProps, { className: "input__resizable ".concat(props.className ? props.className : ''), onKeyPress: handleKeyPress })),
        React.createElement("style", null, placeholderStyle)));
};
