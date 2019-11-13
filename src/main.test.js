import winston from 'winston';
import createLogger, { buildDefaultTransport } from './main';
import normalizeEventLog from './normalizeLog';

const defaultTransport = buildDefaultTransport();
const transport = new winston.transports.Console;
const transports = [transport];

const defaultLogHandler = jest.spyOn(defaultTransport, 'log');
const logHandler = jest.spyOn(transport, 'log');

const fooStr = 'foo-str-fgvhbjnkmlgfvhbjnkml';
const fooUnsignedInt = 42;
const fooZeroInt = 0;
const fooSignedInt = -42;
const fooFloat = 12.34;
const fooBoolTrue = true;
const fooBoolFalse = false;
const fooEmptyObj = {};
const fooEmptyArr = [];

const fooArr = [
    fooStr,
    fooUnsignedInt,
    fooZeroInt,
    fooSignedInt,
    fooFloat,
    fooBoolTrue,
    fooBoolFalse,
];

const fooFlatObjLiteral = {
    fooStr,
    fooUnsignedInt,
    fooZeroInt,
    fooSignedInt,
    fooFloat,
    fooBoolTrue,
    fooBoolFalse,
};

const fooNestedObjLiteral = {
    ...fooFlatObjLiteral,
    fooEmptyObj,
    fooEmptyArr,
    fooArr,
};

describe('createLogger', () => {
    test('is Function', () => {
        expect(createLogger).toBeFunction();
    });
    describe('when called', () => {
        describe('with default everything', () => {
            const namespace = 'app';
            let logger = null;
            beforeAll(() => {
                logger = createLogger();
            });
            test('has expected built-in methods', () => {
                expect(logger.info).toBeFunction();
                expect(logger.error).toBeFunction();
                expect(logger.warn).toBeFunction();
            });
            describe('#event', () => {
                test('is Function', () => {
                    expect(logger.event).toBeFunction();
                });
                describe('logs expected data', () => {
                    test('with eventType and event only', () => {
                        const eventType = 'EventTypeAlpha';
                        logger.event(eventType, fooNestedObjLiteral);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level: 'info',
                        });
                        expect(defaultLogHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with eventType, event and message', () => {
                        const eventType = 'EventTypeBravo';
                        const message = 'This is a test message. erdtfyghuewsrxdfctgvyhuijijoklp';
                        logger.event(eventType, fooNestedObjLiteral, message);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level: 'info',
                            message,
                        });
                        expect(defaultLogHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with eventType, event, message and level', () => {
                        const eventType = 'EventTypeCharlie';
                        const level = 'warn';
                        const message = 'This is a test message. azswexdrfctvgybhunjimkol';
                        logger.event(eventType, fooNestedObjLiteral, message, level);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level,
                            message,
                        });
                        expect(defaultLogHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with requestId', () => {
                        const eventType = 'EventTypeDelta';
                        const level = 'warn';
                        const message = 'This is a test message. sexdrcftvgybhunjijuyhtgfrdsc';
                        const requestId = 'test.request.id-edrftgyhujikolp';
                        const requestIdLogger = logger.withRequestId(requestId);
                        requestIdLogger.event(eventType, fooNestedObjLiteral, message, level);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            message,
                            level,
                            requestId,
                        });
                        expect(defaultLogHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                });
            });
            describe('#exception', () => {
                test('is Function', () => {
                    expect(logger.exception).toBeFunction();
                });
                test('logs expected data', () => {
                    const myErr = new Error('test error message');
                    const eventType = 'ExceptionTypeCharlie';
                    const level = 'error';
                    const message = 'This is a test message. azswexdrfctvgybhunjimkol';
                    logger.exception(myErr, eventType, fooNestedObjLiteral, message);
                    const expectedPayload = {
                        info: fooNestedObjLiteral,
                        error: {
                            message: myErr.message,
                            stack: myErr.stack,
                        },
                    };
                    const expectedLog = expect.objectContaining({
                        ...normalizeEventLog(namespace, eventType, expectedPayload),
                        level,
                        message,
                    });
                    expect(defaultLogHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                });
            });
        });
        describe('with default namespace', () => {
            const namespace = 'app';
            let logger = null;
            beforeAll(() => {
                logger = createLogger({
                    transports,
                });
            });
            test('has expected built-in methods', () => {
                expect(logger.info).toBeFunction();
                expect(logger.error).toBeFunction();
                expect(logger.warn).toBeFunction();
            });
            describe('#event', () => {
                test('is Function', () => {
                    expect(logger.event).toBeFunction();
                });
                describe('logs expected data', () => {
                    test('with eventType and event only', () => {
                        const eventType = 'EventTypeAlpha';
                        logger.event(eventType, fooNestedObjLiteral);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level: 'info',
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with eventType, event and message', () => {
                        const eventType = 'EventTypeBravo';
                        const message = 'This is a test message. erdtfyghuewsrxdfctgvyhuijijoklp';
                        logger.event(eventType, fooNestedObjLiteral, message);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level: 'info',
                            message,
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with eventType, event, message and level', () => {
                        const eventType = 'EventTypeCharlie';
                        const level = 'warn';
                        const message = 'This is a test message. azswexdrfctvgybhunjimkol';
                        logger.event(eventType, fooNestedObjLiteral, message, level);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level,
                            message,
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with requestId', () => {
                        const eventType = 'EventTypeDelta';
                        const level = 'warn';
                        const message = 'This is a test message. sexdrcftvgybhunjijuyhtgfrdsc';
                        const requestId = 'test.request.id-edrftgyhujikolp';
                        const requestIdLogger = logger.withRequestId(requestId);
                        requestIdLogger.event(eventType, fooNestedObjLiteral, message, level);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            message,
                            level,
                            requestId,
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                });
            });
        });
        describe('with provided namespace', () => {
            const namespace = 'taco';
            let logger = null;
            beforeAll(() => {
                logger = createLogger({
                    namespace,
                    transports,
                });
            });
            test('has expected built-in methods', () => {
                expect(logger.info).toBeFunction();
                expect(logger.error).toBeFunction();
                expect(logger.warn).toBeFunction();
            });
            describe('#event', () => {
                test('is Function', () => {
                    expect(logger.event).toBeFunction();
                });
                describe('logs expected data', () => {
                    test('with eventType and event only', () => {
                        const eventType = 'EventTypeAlpha';
                        logger.event(eventType, fooNestedObjLiteral);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level: 'info',
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with eventType, event and message', () => {
                        const eventType = 'EventTypeBravo';
                        const message = 'This is a test message. erdtfyghuewsrxdfctgvyhuijijoklp';
                        logger.event(eventType, fooNestedObjLiteral, message);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level: 'info',
                            message,
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with eventType, event, message and level', () => {
                        const eventType = 'EventTypeCharlie';
                        const level = 'warn';
                        const message = 'This is a test message. azswexdrfctvgybhunjimkol';
                        logger.event(eventType, fooNestedObjLiteral, message, level);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            level,
                            message,
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                    test('with requestId', () => {
                        const eventType = 'EventTypeDelta';
                        const level = 'warn';
                        const message = 'This is a test message. sexdrcftvgybhunjijuyhtgfrdsc';
                        const requestId = 'test.request.id-edrftgyhujikolp';
                        const requestIdLogger = logger.withRequestId(requestId);
                        requestIdLogger.event(eventType, fooNestedObjLiteral, message, level);
                        const expectedLog = expect.objectContaining({
                            ...normalizeEventLog(namespace, eventType, fooNestedObjLiteral),
                            message,
                            level,
                            requestId,
                        });
                        expect(logHandler).toHaveBeenCalledWith(expectedLog, expect.any(Function));
                    });
                });
            });
        });
    });
});
