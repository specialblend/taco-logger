import { withTaggedMocks } from '@specialblend/jest-pipe';
import Bunyan from 'bunyan';
import { join } from 'ramda';
import { $debug, $error, $fatal, $info, $trace, $warn } from '../__mocks__/bunyan';
import Logger from './Logger';

const $name = 'TestLoggerFoo';

describe('Logger', () => {
    test('is Function', () => {
        expect(Logger).toBeFunction();
    });
    describe('instance', () => {
        const $options = { name: $name };
        const $logger = new Logger($options);
        test('is instanceof Bunyan', () => {
            expect($logger).toBeInstanceOf(Bunyan);
        });
        test('has expected base methods', () => {
            expect($logger.trace).toBeFunction();
            expect($logger.debug).toBeFunction();
            expect($logger.info).toBeFunction();
            expect($logger.error).toBeFunction();
            expect($logger.fatal).toBeFunction();
        });
        describe('method', () => {
            describe('trace', () => {
                test('is Function', () => {
                    expect($logger.trace).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->trace(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->trace(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->trace(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('debug', () => {
                test('is Function', () => {
                    expect($logger.debug).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->debug(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->debug(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->debug(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('info', () => {
                test('is Function', () => {
                    expect($logger.info).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->info(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->info(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->info(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('warn', () => {
                test('is Function', () => {
                    expect($logger.warn).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->warn(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->warn(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->warn(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('error', () => {
                test('is Function', () => {
                    expect($logger.error).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->error(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->error(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->error(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('fatal', () => {
                test('is Function', () => {
                    expect($logger.fatal).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->fatal(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->fatal(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->fatal(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('type', () => {
                test('is Function', () => {
                    expect($logger.type).toBeFunction();
                });
                describe('when called', () => {
                    withTaggedMocks('Logger->log(payload:string, type:none)', $mocks => {
                        const $type = $mocks.uniqueSafeTag('type');
                        const $typedLogger = $logger.type($type);
                        test('returns instance of Logger', () => {
                            expect($typedLogger).toBeInstanceOf(Logger);
                        });
                        test('has expected type field', () => {
                            expect($typedLogger.fields.type).toBe($type);
                        });
                    });
                });
            });
        });
    });
    describe('child of instance', () => {
        const $options = { name: $name };
        const $meta = { $foo: 'foo' };
        const $logger = new Logger($options).child($meta);
        test('is instanceof Bunyan', () => {
            expect($logger).toBeInstanceOf(Bunyan);
        });
        test('has expected base methods', () => {
            expect($logger.trace).toBeFunction();
            expect($logger.debug).toBeFunction();
            expect($logger.info).toBeFunction();
            expect($logger.error).toBeFunction();
            expect($logger.fatal).toBeFunction();
        });
        describe('method', () => {
            describe('trace', () => {
                test('is Function', () => {
                    expect($logger.trace).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->trace(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->trace(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->trace(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('debug', () => {
                test('is Function', () => {
                    expect($logger.debug).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->debug(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->debug(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->debug(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('info', () => {
                test('is Function', () => {
                    expect($logger.info).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->info(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->info(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->info(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('warn', () => {
                test('is Function', () => {
                    expect($logger.warn).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->warn(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->warn(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->warn(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('error', () => {
                test('is Function', () => {
                    expect($logger.error).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->error(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->error(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->error(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('fatal', () => {
                test('is Function', () => {
                    expect($logger.fatal).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->fatal(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->fatal(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->fatal(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('type', () => {
                test('is Function', () => {
                    expect($logger.type).toBeFunction();
                });
                describe('when called', () => {
                    withTaggedMocks('Logger->log(payload:string, type:none)', $mocks => {
                        const $type = $mocks.uniqueSafeTag('type');
                        const $typedLogger = $logger.type($type);
                        test('returns instance of Logger', () => {
                            expect($typedLogger).toBeInstanceOf(Logger);
                        });
                        test('has expected type field', () => {
                            expect($typedLogger.fields.type).toBe($type);
                        });
                    });
                });
            });
        });
    });
    describe('child of child of instance', () => {
        const $options = { name: $name };
        const $meta = { $foo: 'foo' };
        const $moreMeta = { $bar: 'bar' };
        const $logger = new Logger($options).child($meta).child($moreMeta);
        test('is instanceof Bunyan', () => {
            expect($logger).toBeInstanceOf(Bunyan);
        });
        test('has expected base methods', () => {
            expect($logger.trace).toBeFunction();
            expect($logger.debug).toBeFunction();
            expect($logger.info).toBeFunction();
            expect($logger.error).toBeFunction();
            expect($logger.fatal).toBeFunction();
        });
        describe('method', () => {
            describe('trace', () => {
                test('is Function', () => {
                    expect($logger.trace).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->trace(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->trace(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->trace(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).trace($payload);
                            });
                            test('calls Bunyan trace with expected payload', () => {
                                expect($trace).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('debug', () => {
                test('is Function', () => {
                    expect($logger.debug).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->debug(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->debug(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->debug(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).debug($payload);
                            });
                            test('calls Bunyan debug with expected payload', () => {
                                expect($debug).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('info', () => {
                test('is Function', () => {
                    expect($logger.info).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->info(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->info(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->info(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).info($payload);
                            });
                            test('calls Bunyan info with expected payload', () => {
                                expect($info).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('warn', () => {
                test('is Function', () => {
                    expect($logger.warn).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->warn(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->warn(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->warn(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).warn($payload);
                            });
                            test('calls Bunyan warn with expected payload', () => {
                                expect($warn).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('error', () => {
                test('is Function', () => {
                    expect($logger.error).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->error(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->error(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->error(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).error($payload);
                            });
                            test('calls Bunyan error with expected payload', () => {
                                expect($error).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('fatal', () => {
                test('is Function', () => {
                    expect($logger.fatal).toBeFunction();
                });
                describe('when called', () => {
                    describe('with string payload and no type', () => {
                        withTaggedMocks('Logger->fatal(payload:string, type:none)', $mocks => {
                            const $payload = $mocks.uniqueSafeTag('payload');
                            beforeAll(() => {
                                $logger.fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and no type', () => {
                        withTaggedMocks('Logger->fatal(payload:Object, type:none)', $mocks => {
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith($payload);
                            });
                        });
                    });
                    describe('with Object payload and type', () => {
                        withTaggedMocks('Logger->fatal(payload:Object, type:none)', $mocks => {
                            const $type = $mocks.uniqueSafeTag('type');
                            const $payload = {
                                foo: $mocks.uniqueSafeTag('foo'),
                                bar: $mocks.uniqueSafeTag('bar'),
                            };
                            beforeAll(() => {
                                $logger.type($type).fatal($payload);
                            });
                            test('calls Bunyan fatal with expected payload', () => {
                                expect($fatal).toHaveBeenCalledWith({
                                    [join('.', [$name, $type, 'foo'])]: $payload.foo,
                                    [join('.', [$name, $type, 'bar'])]: $payload.bar,
                                });
                            });
                        });
                    });
                });
            });
            describe('type', () => {
                test('is Function', () => {
                    expect($logger.type).toBeFunction();
                });
                describe('when called', () => {
                    withTaggedMocks('Logger->log(payload:string, type:none)', $mocks => {
                        const $type = $mocks.uniqueSafeTag('type');
                        const $typedLogger = $logger.type($type);
                        test('returns instance of Logger', () => {
                            expect($typedLogger).toBeInstanceOf(Logger);
                        });
                        test('has expected type field', () => {
                            expect($typedLogger.fields.type).toBe($type);
                        });
                    });
                });
            });
        });
    });
});
