// @ts-ignore
import flat from 'flat';
import { curry, is, map, pick, pipe, unless, useWith } from 'ramda';
import BunyanLogger, { LoggerOptions } from 'bunyan';

const formatException = pick(['message', 'stack', 'code']);

const isString = is(String);
const serializeChild = unless(isString, JSON.stringify);
const serializeObject = pipe(flat, map(serializeChild));

export const normalize = curry(
    (name: string, type: string, meta: Object) => {
        const payload = {
            [name]: {
                [type]: meta,
            },
        };
        // @ts-ignore
        return serializeObject(payload);
    },
);

export interface Exception {
    message: String,
    stack?: String,
    code?: String
}

export class Logger extends BunyanLogger {
    normalizeLog(data: any): any {
        if (is(Object, data) && is(String, this.fields.type)) {
            return normalize(this.fields.name, this.fields.type, data);
        }
        return data;
    }

    // @ts-ignore
    trace(data: Object, ... params: any[]): void {
        return super.trace(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    debug(data: Object, ... params: any[]): void {
        return super.debug(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    info(data: Object, ... params: any[]): void {
        return super.info(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    warn(data: Object, ... params: any[]): void {
        return super.warn(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    error(data: Object, ... params: any[]): void {
        return super.error(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    fatal(data: Object, ... params: any[]): void {
        return super.fatal(this.normalizeLog(data), ... params);
    }

    exception(ex: Exception, ... params: any[]): void {
        const exception = formatException(ex);
        return this.error({ exception }, ... params);
    }

    type(_type: String) {
        return this.child({ type: _type });
    }
}

export default function createLogger(options: LoggerOptions): Logger {
    return new Logger(options);
}
