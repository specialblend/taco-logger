"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var flat_1 = __importDefault(require("flat"));
var ramda_1 = require("ramda");
var bunyan_1 = __importDefault(require("bunyan"));
var formatException = ramda_1.pick(['message', 'stack', 'code']);
var isString = ramda_1.is(String);
var serializeChild = ramda_1.unless(isString, JSON.stringify);
var serializeObject = ramda_1.pipe(flat_1.default, ramda_1.map(serializeChild));
exports.normalize = ramda_1.curry(function (name, type, meta) {
    var _a, _b;
    var payload = (_a = {},
        _a[name] = (_b = {},
            _b[type] = meta,
            _b),
        _a);
    // @ts-ignore
    return serializeObject(payload);
});
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logger.prototype.normalizeLog = function (data) {
        if (ramda_1.is(Object, data) && ramda_1.is(String, this.fields.type)) {
            return exports.normalize(this.fields.name, this.fields.type, data);
        }
        return data;
    };
    // @ts-ignore
    Logger.prototype.trace = function (data) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _super.prototype.trace.apply(this, __spreadArrays([this.normalizeLog(data)], params));
    };
    // @ts-ignore
    Logger.prototype.debug = function (data) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _super.prototype.debug.apply(this, __spreadArrays([this.normalizeLog(data)], params));
    };
    // @ts-ignore
    Logger.prototype.info = function (data) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _super.prototype.info.apply(this, __spreadArrays([this.normalizeLog(data)], params));
    };
    // @ts-ignore
    Logger.prototype.warn = function (data) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _super.prototype.warn.apply(this, __spreadArrays([this.normalizeLog(data)], params));
    };
    // @ts-ignore
    Logger.prototype.error = function (data) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _super.prototype.error.apply(this, __spreadArrays([this.normalizeLog(data)], params));
    };
    // @ts-ignore
    Logger.prototype.fatal = function (data) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return _super.prototype.fatal.apply(this, __spreadArrays([this.normalizeLog(data)], params));
    };
    Logger.prototype.exception = function (ex) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var exception = formatException(ex);
        return this.error.apply(this, __spreadArrays([{ exception: exception }], params));
    };
    Logger.prototype.type = function (_type) {
        return this.child({ type: _type });
    };
    return Logger;
}(bunyan_1.default));
exports.Logger = Logger;
function createLogger(options) {
    return new Logger(options);
}
exports.default = createLogger;
