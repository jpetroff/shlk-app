import constants from './constants';
export function validateURL(str) {
    return constants.regexWeburl.test(str);
}
export function modifyURLSlug(str) {
    str = str.replace(/[^a-z0-9\s-]/ig, '');
    // str = str.replace(/\s+/ig, ' ').trim()
    str = str.replace(/\s/ig, '-');
    return str;
}
export function testShortcutPasteWithKeyboard() {
    return !(Modernizr.touchevents && Modernizr.mq(constants.MediaQueries.mobile));
}
