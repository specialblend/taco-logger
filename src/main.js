/* eslint-disable import/no-extraneous-dependencies,max-params,no-invalid-this,func-style */

import * as winston from 'winston';
import normalizeEventLog from './normalizeLog';
import { always, pick } from 'ramda';

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

function exception(err, type, info, exceptionMessage) {
    const error = pick(['message', 'stack'], err);
    const payload = {
        info,
        error,
    };
    return this.event(type, payload, exceptionMessage, 'error');
}

export const buildDefaultTransport = always(new winston.transports.Console);

export default function createLogger(options = {}) {
    const { namespace = 'app', transports = [buildDefaultTransport()], ...winstonLoggerOptions } = options;
    const winstonLogger = winston.createLogger({
        transports,
        ...winstonLoggerOptions,
    });
    return Object.assign(winstonLogger, {
        namespace,
        event,
        exception,
        withRequestId,
    });
}
