/* eslint-disable class-methods-use-this */
export const $trace = jest.fn();
export const $debug = jest.fn();
export const $info = jest.fn();
export const $warn = jest.fn();
export const $error = jest.fn();
export const $fatal = jest.fn();

export default class BunyanLogger {
    constructor(fields) {
        this.fields = fields;
    }

    trace(...args) {
        return $trace(...args);
    }

    debug(...args) {
        return $debug(...args);
    }

    info(...args) {
        return $info(...args);
    }

    warn(...args) {
        return $warn(...args);
    }

    error(...args) {
        return $error(...args);
    }

    fatal(...args) {
        return $fatal(...args);
    }

    child(fields) {
        return new this.constructor({ ...this.fields, ...fields });
    }
}
