import BunyanLogger from 'bunyan';
import { $debug, $error, $fatal, $info, $trace, $warn } from '../__mocks__/bunyan';
import createLogger, { Logger } from './main';
import normalize from './normalize';

jest.mock('bunyan');

const $messageStr = 'test string message';

const $messageObj = {
    foo: {
        bar: 'baz',
    },
    alpha: {
        bravo: {
            charlie: 'delta',
        },
        echo: 'foxtrot',
    },
};

describe('createLogger', () => {
    test('is Function', () => {
        expect(createLogger).toBeFunction();
    });
    describe('when called', () => {
        let logger = null;
        const name = 'taco';
        beforeAll(() => {
            logger = createLogger({ name });
        });
        test('returns instance of Logger', () => {
            expect(logger).toBeInstanceOf(Logger);
        });
        test('returns instance of BunyanLogger', () => {
            expect(logger).toBeInstanceOf(BunyanLogger);
        });
        describe('inherited methods', () => {
            test('has type method', () => {
                expect(logger.type).toBeFunction();
            });
            test('type method returns expected result', () => {
                const typedLogger = logger.type('foo');
                expect(typedLogger).toHaveProperty(['fields', 'type'], 'foo');
            });
            describe('normalizeLog', () => {
                describe('act as passthru', () => {
                    test('when type is String, but first arg is not Object', () => {
                        const typedLogger = logger.type('foo');
                        expect(typedLogger.normalizeLog($messageStr)).toMatchObject([$messageStr]);
                        expect(typedLogger.normalizeLog($messageStr, $messageStr)).toMatchObject([$messageStr, $messageStr]);
                        expect(typedLogger.normalizeLog($messageStr, $messageStr, $messageStr)).toMatchObject([$messageStr, $messageStr, $messageStr]);
                    });
                    test('when first arg is Object, but type is not string', () => {
                        expect(logger.type(null).normalizeLog($messageObj)).toMatchObject([$messageObj]);
                        expect(logger.type(undefined).normalizeLog($messageObj)).toMatchObject([$messageObj]);
                        expect(logger.type(true).normalizeLog($messageObj)).toMatchObject([$messageObj]);
                        expect(logger.type(false).normalizeLog($messageObj)).toMatchObject([$messageObj]);
                        expect(logger.type($messageObj).normalizeLog($messageObj)).toMatchObject([$messageObj]);
                    });
                });
                describe('normalizes payload', () => {
                    test('when type is String, and first arg is Object', () => {
                        const typedLogger = logger.type('foo');
                        const result = typedLogger.normalizeLog($messageObj, $messageStr);
                        const $expectedPayload = normalize(name, 'foo', $messageObj);
                        expect(result).toMatchObject([$expectedPayload, $messageStr]);
                    });
                });
            });
            test('trace works as expected', () => {
                logger.trace($messageObj, $messageStr);
                expect($trace).toHaveBeenCalledWith(...logger.normalizeLog($messageObj, $messageStr));
            });
            test('debug works as expected', () => {
                logger.debug($messageObj, $messageStr);
                expect($debug).toHaveBeenCalledWith(...logger.normalizeLog($messageObj, $messageStr));
            });
            test('info works as expected', () => {
                logger.info($messageObj, $messageStr);
                expect($info).toHaveBeenCalledWith(...logger.normalizeLog($messageObj, $messageStr));
            });
            test('warn works as expected', () => {
                logger.warn($messageObj, $messageStr);
                expect($warn).toHaveBeenCalledWith(...logger.normalizeLog($messageObj, $messageStr));
            });
            test('error works as expected', () => {
                logger.error($messageObj, $messageStr);
                expect($error).toHaveBeenCalledWith(...logger.normalizeLog($messageObj, $messageStr));
            });
            test('fatal works as expected', () => {
                logger.fatal($messageObj, $messageStr);
                expect($fatal).toHaveBeenCalledWith(...logger.normalizeLog($messageObj, $messageStr));
            });
            test('withRequestId works as expected', () => {
                expect(logger.withRequestId('gdfghfdhgfhfg')).toHaveProperty(['fields', 'requestId'], 'gdfghfdhgfhfg');
            });
        });
    });
});
