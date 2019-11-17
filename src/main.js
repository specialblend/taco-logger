import BunyanLogger from 'bunyan';
import { and, is, pick } from 'ramda';
import normalize from './normalize';

const isString = is(String);
const isObject = is(Object);

const formatException = pick(['message', 'stack', 'code']);

export class Logger extends BunyanLogger {
    normalizeLog(first, ...rest) {
        if (and(isString(this.fields.type), isObject(first))) {
            const payload = normalize(this.fields.name, this.fields.type, first);
            return [payload, ...rest];
        }
        return [first, ...rest];
    }

    trace(...args) {
        return super.trace(...this.normalizeLog(...args));
    }

    debug(...args) {
        return super.debug(...this.normalizeLog(...args));
    }

    info(...args) {
        return super.info(...this.normalizeLog(...args));
    }

    warn(...args) {
        return super.warn(...this.normalizeLog(...args));
    }

    error(...args) {
        return super.error(...this.normalizeLog(...args));
    }

    fatal(...args) {
        return super.fatal(...this.normalizeLog(...args));
    }

    exception(ex, ...args) {
        const err = formatException(ex);
        return this.error({ err }, ...args);
    }

    type(type) {
        return this.child({ type });
    }

    withRequestId(requestId) {
        return this.child({ requestId });
    }
}

export default function createLogger(options) {
    return new Logger(options);
}
