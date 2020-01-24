/* eslint-disable max-params,func-style */
import flat from 'flat';
import BunyanLogger from 'bunyan';
import { either, is, map, pick, pipe, unless, when } from 'ramda';

const isString = is(String);
const isError = is(Error);
const isObject = is(Object);
const serializeException = pick(['message', 'stack', 'code']);
const isSerializable = either(isObject, isError);
const serializeChild = unless(isString, JSON.stringify);
const serializeObject = pipe(flat, map(serializeChild));
const serializePayload = when(isError, serializeException);

export default class Logger extends BunyanLogger {
    private serialize(payload: any): any {
        const { name, type } = this.fields;
        if (isSerializable(payload) && is(String, type)) {
            const data = serializePayload(payload);
            const log = {
                [name]: {
                    [type]: data,
                },
            };
            return serializeObject(log);
        }
        return payload;
    }

    private log(emitter: Function = this.info, payload?: any, ...params: any[]): boolean | void {
        const _emitter = emitter.bind(this);
        if (typeof payload === 'undefined') {
            return _emitter();
        }
        const data = this.serialize(payload);
        return _emitter(data, ...params);
    }

    trace(): boolean
    trace(error: Error, ...params: any[]): void;
    trace(obj: object, ...params: any[]): void;
    trace(format: any, ...params: any[]): void;
    trace(payload?: any, ...params: any[]): boolean | void {
        return this.log(super.trace, payload, ...params);
    }

    debug(): boolean
    debug(error: Error, ...params: any[]): void;
    debug(obj: object, ...params: any[]): void;
    debug(format: any, ...params: any[]): void;
    debug(payload?: any, ...params: any[]): boolean | void {
        return this.log(super.debug, payload, ...params);
    }

    info(): boolean
    info(error: Error, ...params: any[]): void;
    info(obj: object, ...params: any[]): void;
    info(format: any, ...params: any[]): void;
    info(payload?: any, ...params: any[]): boolean | void {
        return this.log(super.info, payload, ...params);
    }

    warn(): boolean
    warn(error: Error, ...params: any[]): void;
    warn(obj: object, ...params: any[]): void;
    warn(format: any, ...params: any[]): void;
    warn(payload?: any, ...params: any[]): boolean | void {
        return this.log(super.warn, payload, ...params);
    }

    error(): boolean
    error(error: Error, ...params: any[]): void;
    error(obj: object, ...params: any[]): void;
    error(format: any, ...params: any[]): void;
    error(payload?: any, ...params: any[]): boolean | void {
        return this.log(super.error, payload, ...params);
    }

    fatal(): boolean
    fatal(error: Error, ...params: any[]): void;
    fatal(obj: object, ...params: any[]): void;
    fatal(format: any, ...params: any[]): void;
    fatal(payload?: any, ...params: any[]): boolean | void {
        return this.log(super.fatal, payload, ...params);
    }

    /**
	 * Shorthand for child({ type })
	 * @param {string} namespace namespace
	 * @returns {Logger} child logger
	 */
    type(namespace: string): Logger {
        return this.child({ type: namespace }) as Logger;
    }

    child(options: Record<string, any>, simple?: boolean): Logger {
        return super.child.bind(this)(options, simple) as Logger;
    }
}
