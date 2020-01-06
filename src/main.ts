import { is, pick } from 'ramda';
import BunyanLogger, { LoggerOptions } from 'bunyan';
import normalize from './normalize';

const isObject = is(Object);

const formatException = pick(['message', 'stack', 'code']);

export class Logger extends BunyanLogger {
    normalizeLog(data: any): any {
        if (isObject(data)) {
            return normalize(this.fields.name, this.fields.type, data);
        }
        return data;
    }

    // @ts-ignore
    debug(data: any, ... params: any[]): void {
        return super.debug(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    info(data: any, ... params: any[]): void {
        return super.info(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    warn(data: any, ... params: any[]): void {
        return super.warn(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    error(data: any, ... params: any[]): void {
        return super.error(this.normalizeLog(data), ... params);
    }

    // @ts-ignore
    fatal(data: any, ... params: any[]): void {
        return super.error(this.normalizeLog(data), ... params);
    }

    exception(ex: any, ... params: any[]): void {
        const exception = formatException(ex);
        return this.error({ exception }, ... params);
    }

    type(type: String): BunyanLogger {
        return this.child({ type });
    }
}

export default function createLogger(options: LoggerOptions): Logger {
    return new Logger(options);
}
