'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var winston = require('winston');
var flat = _interopDefault(require('flat'));
var ramda = require('ramda');

const serializeChild = ramda.unless(ramda.is(String), JSON.stringify);
const serializeObject = ramda.pipe(flat, ramda.map(serializeChild));

const normalizeEventLog = ramda.curry(
    (namespace, eventType, event) => {
        const payload = {
            namespace,
            [namespace]: {
                eventType,
                event: {
                    [eventType]: event,
                },
            },
        };
        return serializeObject(payload);
    }
);

/* eslint-disable import/no-extraneous-dependencies,max-params,no-invalid-this,func-style */

function event(eventType, eventPayload, message, level = 'info') {
    const normalizedEvent = normalizeEventLog(this.namespace, eventType, eventPayload);
    if (typeof message === 'undefined') {
        return this.log(level, normalizedEvent);
    }
    return this.log(level, message, normalizedEvent);
}

function withRequestId(requestId) {
    return this.child({ requestId });
}

const buildDefaultTransport = ramda.always(new winston.transports.Console);

function createLogger(options = {}) {
    const { namespace = 'app', transports = [buildDefaultTransport()], ...winstonLoggerOptions } = options;
    const winstonLogger = winston.createLogger({
        transports,
        ...winstonLoggerOptions,
    });
    return Object.assign(winstonLogger, {
        namespace,
        event,
        withRequestId,
    });
}

exports.buildDefaultTransport = buildDefaultTransport;
exports.default = createLogger;
