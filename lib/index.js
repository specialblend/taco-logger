import { createLogger as createLogger$1, transports } from 'winston';
import flat from 'flat';
import { unless, is, pipe, map, curry, pick, always } from 'ramda';

const serializeChild = unless(is(String), JSON.stringify);
const serializeObject = pipe(flat, map(serializeChild));

const normalizeEventLog = curry(
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

function exception(err, type, info, exceptionMessage) {
    const error = pick(['message', 'stack'], err);
    const payload = {
        info,
        error,
    };
    return this.event(type, payload, exceptionMessage, 'error');
}

const buildDefaultTransport = always(new transports.Console);

function createLogger(options = {}) {
    const { namespace = 'app', transports = [buildDefaultTransport()], ...winstonLoggerOptions } = options;
    const winstonLogger = createLogger$1({
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

export default createLogger;
export { buildDefaultTransport };
