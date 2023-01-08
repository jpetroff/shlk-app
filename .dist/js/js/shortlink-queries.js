var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
import _ from 'underscore';
import { GraphQLClient, gql } from 'graphql-request';
import { validateURL } from './utils';
import config from './config.development';
var GraphQLHomeQuery = /** @class */ (function () {
    function GraphQLHomeQuery() {
        this.queryUrl = config.serviceUrl + '/api';
        this.gqlClient = new GraphQLClient(this.queryUrl, { headers: {} });
    }
    GraphQLHomeQuery.prototype.createShortlink = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var query, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (validateURL(location) == false) {
                            throw new Error("Not a valid URL: '".concat(location, "'"));
                        }
                        query = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\tmutation createShortlinkWithVars (\n\t\t\t$location: String!\n\t\t){\n\t\t\tcreateShortlink(location: $location) {\n\t\t\t\thash\n\t\t\t\tlocation\n\t\t\t}\n\t\t}\n\t\t"], ["\n\t\tmutation createShortlinkWithVars (\n\t\t\t$location: String!\n\t\t){\n\t\t\tcreateShortlink(location: $location) {\n\t\t\t\thash\n\t\t\t\tlocation\n\t\t\t}\n\t\t}\n\t\t"])));
                        return [4 /*yield*/, this.gqlClient.request(query, { location: location })];
                    case 1:
                        response = _a.sent();
                        console.log('[GQL] createShortlink\n', response);
                        return [2 /*return*/, response.createShortlink];
                }
            });
        });
    };
    GraphQLHomeQuery.prototype.createShortlinkDescriptor = function (_a) {
        var userTag = _a.userTag, descriptionTag = _a.descriptionTag, location = _a.location, hash = _a.hash;
        return __awaiter(this, void 0, void 0, function () {
            var query, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (_.isEmpty(descriptionTag) || _.isEmpty(location))
                            return [2 /*return*/, null];
                        query = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\tmutation createDescriptiveShortlinkWithVars(\n\t\t\t$userTag: String\n\t\t\t$descriptionTag: String!\n\t\t\t$location: String!\n\t\t\t$hash: String\n\t\t) {\n\t\t\tcreateDescriptiveShortlink(userTag: $userTag, descriptionTag: $descriptionTag, location: $location, hash: $hash) {\n\t\t\t\thash\n\t\t\t\tlocation\n\t\t\t\tdescriptor {\n\t\t\t\t\tuserTag\n\t\t\t\t\tdescriptionTag\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t"], ["\n\t\tmutation createDescriptiveShortlinkWithVars(\n\t\t\t$userTag: String\n\t\t\t$descriptionTag: String!\n\t\t\t$location: String!\n\t\t\t$hash: String\n\t\t) {\n\t\t\tcreateDescriptiveShortlink(userTag: $userTag, descriptionTag: $descriptionTag, location: $location, hash: $hash) {\n\t\t\t\thash\n\t\t\t\tlocation\n\t\t\t\tdescriptor {\n\t\t\t\t\tuserTag\n\t\t\t\t\tdescriptionTag\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t"])));
                        return [4 /*yield*/, this.gqlClient.request(query, { userTag: userTag, descriptionTag: descriptionTag, location: location, hash: hash })];
                    case 1:
                        response = _b.sent();
                        console.log('[GQL] createShortlinkDescriptor\n', response);
                        return [2 /*return*/, response.createDescriptiveShortlink];
                }
            });
        });
    };
    return GraphQLHomeQuery;
}());
export default new GraphQLHomeQuery();
var templateObject_1, templateObject_2;
