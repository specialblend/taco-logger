import BunyanLogger from 'bunyan';
import flat from 'flat';
import { curry, is, map, pipe, unless } from 'ramda';

const serializeChild = unless(is(String), JSON.stringify);
const serializeObject = pipe(flat, map(serializeChild));

const normalizeLogPayload = curry(
    (name, type, meta) => {
        const payload = {
            [name]: {
                [type]: meta,
            },
        };
        return serializeObject(payload);
    }
);

export class Logger extends BunyanLogger {
    normalizeLog(first, ...rest) {
        if (is(Object, first) && this.fields.type) {
            const payload = normalizeLogPayload(this.fields.name, this.fields.type, first);
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

    type(type) {
        return this.child({ type });
    }
}

export default function createLogger(options) {
    return new Logger(options);
}
