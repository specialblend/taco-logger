const createLogger = require('../index').default;

const name = 'taco';
const requestId = 'a90e0e3c-7159-453e-b224-cc5fa5cfe3a6';

const logger = createLogger({ name }).withRequestId(requestId);

logger.info({ foo: 'bar', baz: 'faz' }, 'this is a normal bunyan info log -- not safe for elasticsearch!');
logger.error({ foo: 'bar', baz: 'faz' }, 'this is a normal bunyan error log -- not safe for elasticsearch!');

logger.type('TestLog').info({ foo: 'bar', baz: 'faz' }, 'this is a flattened, normalized info log; safe for elasticsearch.');
logger.type('TestError').error({ foo: 'bar', baz: 'faz' }, 'this is a flattened, normalized error log; safe for elasticsearch.');

const err = new Error('this is a test error.');
logger.type('SomeError').exception(err, 'this is a flattened, normalized error log which prints err.(message|stack|code); safe for elasticsearch.');
