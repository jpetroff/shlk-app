import _ from 'underscore';
import constants from './constants';
import config from './config.development';
var LinkTools = /** @class */ (function () {
    function LinkTools() {
        this.baseUrl = config.serviceUrl;
        this.displayServiceUrl = config.displayServiceUrl;
    }
    LinkTools.prototype.validateURL = function (str) {
        return constants.regexWeburl.test(str);
    };
    LinkTools.prototype.sanitizeURLSlug = function (str) {
        str = str.replace(/[^a-z0-9\s-]/ig, '');
        // str = str.replace(/\s+/ig, ' ').trim()
        str = str.replace(/\s/ig, '-');
        return str;
    };
    LinkTools.prototype.generateShortlinkFromHash = function (hash) {
        return "".concat(this.baseUrl, "/").concat(hash);
    };
    LinkTools.prototype.generateDescriptiveShortlink = function (_a) {
        var userTag = _a.userTag, descriptionTag = _a.descriptionTag;
        var userTagPart = userTag ? userTag + '@' : '';
        return "".concat(this.baseUrl, "/").concat(userTagPart).concat(descriptionTag);
    };
    LinkTools.prototype.fixProtocol = function (url) {
        if (this.validateURL(url))
            return url;
        var result = 'https://' + url.trim();
        if (this.validateURL(result))
            return result;
        throw new Error("URL ".concat(result, " is not valid"));
    };
    /*
        For query array [ 'param1', 'param2', ... ]
        Returns corresponding query values or null [ 'value1', null, ...  ]
     */
    LinkTools.prototype.queryUrlSearchParams = function (queryParam, searchParamsString) {
        if (!searchParamsString)
            return Array.from({ length: _.size(queryParam) }, function () { return null; });
        var searchParams = new URLSearchParams(searchParamsString);
        var result = [];
        _.forEach(queryParam, function (param) {
            result.push(searchParams.get(param));
        });
        _.map(result, function (item) {
            if (item != null)
                return decodeURIComponent(item);
        });
        return result;
    };
    return LinkTools;
}());
export default new LinkTools();
