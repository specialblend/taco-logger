/// <reference types="ts-toolbelt" />
import BunyanLogger, { LoggerOptions } from 'bunyan';
export declare const normalize: import("Function/Curry").Curry<(name: string, type: string, meta: Object) => any>;
export interface Exception {
    message: String;
    stack?: String;
    code?: String;
}
export declare class Logger extends BunyanLogger {
    normalizeLog(data: any): any;
    trace(data: Object, ...params: any[]): void;
    debug(data: Object, ...params: any[]): void;
    info(data: Object, ...params: any[]): void;
    warn(data: Object, ...params: any[]): void;
    error(data: Object, ...params: any[]): void;
    fatal(data: Object, ...params: any[]): void;
    exception(ex: Exception, ...params: any[]): void;
    type(_type: String): BunyanLogger;
}
export default function createLogger(options: LoggerOptions): Logger;
