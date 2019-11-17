# taco-logger

wrapper around `bunyan` logger to provide namespaced, flattened JSON logs - safe for elastic/filebeat

## install

```bash
npm install @specialblend/taco-logger
```

## examples

code

```javascript
const createLogger = require('./index').default;

const name = 'taco';
const requestId = 'a90e0e3c-7159-453e-b224-cc5fa5cfe3a6';

const logger = createLogger({ name }).withRequestId(requestId);

logger.info({ foo: 'bar', baz: 'faz' }, 'this is a normal bunyan info log -- not safe for elasticsearch!');
logger.error({ foo: 'bar', baz: 'faz' }, 'this is a normal bunyan error log -- not safe for elasticsearch!');

logger.type('TestLog').info({ foo: 'bar', baz: 'faz' }, 'this is a flattened, normalized info log; safe for elasticsearch.');
logger.type('TestError').error({ foo: 'bar', baz: 'faz' }, 'this is a flattened, normalized error log; safe for elasticsearch.');

const exception = new Error('this is a test error.');
logger.type('SomeError').exception(exception, 'this is a flattened, normalized error log which prints exception.(message|stack|code); safe for elasticsearch.');

```

output

```
{"name":"taco","hostname":"whisky","pid":83428,"requestId":"a90e0e3c-7159-453e-b224-cc5fa5cfe3a6","level":30,"foo":"bar","baz":"faz","msg":"this is a normal bunyan info log -- not safe for elasticsearch!","time":"2019-11-17T03:36:03.114Z","v":0}
{"name":"taco","hostname":"whisky","pid":83428,"requestId":"a90e0e3c-7159-453e-b224-cc5fa5cfe3a6","level":50,"foo":"bar","baz":"faz","msg":"this is a normal bunyan error log -- not safe for elasticsearch!","time":"2019-11-17T03:36:03.117Z","v":0}
{"name":"taco","hostname":"whisky","pid":83428,"requestId":"a90e0e3c-7159-453e-b224-cc5fa5cfe3a6","type":"TestLog","level":30,"taco.TestLog.foo":"bar","taco.TestLog.baz":"faz","msg":"this is a flattened, normalized info log; safe for elasticsearch.","time":"2019-11-17T03:36:03.119Z","v":0}
{"name":"taco","hostname":"whisky","pid":83428,"requestId":"a90e0e3c-7159-453e-b224-cc5fa5cfe3a6","type":"TestError","level":50,"taco.TestError.foo":"bar","taco.TestError.baz":"faz","msg":"this is a flattened, normalized error log; safe for elasticsearch.","time":"2019-11-17T03:36:03.120Z","v":0}
{"name":"taco","hostname":"whisky","pid":83428,"requestId":"a90e0e3c-7159-453e-b224-cc5fa5cfe3a6","type":"SomeError","level":50,"taco.SomeError.exception.message":"this is a test error.","taco.SomeError.exception.stack":"Error: this is a test error.\n    at Object.<anonymous> (/Users/specialblend/workspace/taco-logger/example.js:14:13)\n    at Module._compile (internal/modules/cjs/loader.js:936:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)\n    at Module.load (internal/modules/cjs/loader.js:790:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:703:12)\n    at Function.Module.runMain (internal/modules/cjs/loader.js:999:10)\n    at internal/main/run_main_module.js:17:11","msg":"this is a flattened, normalized error log which prints exception.(message|stack|code); safe for elasticsearch.","time":"2019-11-17T03:36:03.121Z","v":0}
```

output (pretty)

```
{
  "name": "taco",
  "hostname": "whisky",
  "pid": 83491,
  "requestId": "a90e0e3c-7159-453e-b224-cc5fa5cfe3a6",
  "level": 30,
  "foo": "bar",
  "baz": "faz",
  "msg": "this is a normal bunyan info log -- not safe for elasticsearch!",
  "time": "2019-11-17T03:36:16.554Z",
  "v": 0
}
{
  "name": "taco",
  "hostname": "whisky",
  "pid": 83491,
  "requestId": "a90e0e3c-7159-453e-b224-cc5fa5cfe3a6",
  "level": 50,
  "foo": "bar",
  "baz": "faz",
  "msg": "this is a normal bunyan error log -- not safe for elasticsearch!",
  "time": "2019-11-17T03:36:16.555Z",
  "v": 0
}
{
  "name": "taco",
  "hostname": "whisky",
  "pid": 83491,
  "requestId": "a90e0e3c-7159-453e-b224-cc5fa5cfe3a6",
  "type": "TestLog",
  "level": 30,
  "taco.TestLog.foo": "bar",
  "taco.TestLog.baz": "faz",
  "msg": "this is a flattened, normalized info log; safe for elasticsearch.",
  "time": "2019-11-17T03:36:16.556Z",
  "v": 0
}
{
  "name": "taco",
  "hostname": "whisky",
  "pid": 83491,
  "requestId": "a90e0e3c-7159-453e-b224-cc5fa5cfe3a6",
  "type": "TestError",
  "level": 50,
  "taco.TestError.foo": "bar",
  "taco.TestError.baz": "faz",
  "msg": "this is a flattened, normalized error log; safe for elasticsearch.",
  "time": "2019-11-17T03:36:16.556Z",
  "v": 0
}
{
  "name": "taco",
  "hostname": "whisky",
  "pid": 83491,
  "requestId": "a90e0e3c-7159-453e-b224-cc5fa5cfe3a6",
  "type": "SomeError",
  "level": 50,
  "taco.SomeError.exception.message": "this is a test error.",
  "taco.SomeError.exception.stack": "Error: this is a test error.\n    at Object.<anonymous> (/Users/specialblend/workspace/taco-logger/example.js:14:13)\n    at Module._compile (internal/modules/cjs/loader.js:936:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)\n    at Module.load (internal/modules/cjs/loader.js:790:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:703:12)\n    at Function.Module.runMain (internal/modules/cjs/loader.js:999:10)\n    at internal/main/run_main_module.js:17:11",
  "msg": "this is a flattened, normalized error log which prints exception.(message|stack|code); safe for elasticsearch.",
  "time": "2019-11-17T03:36:16.556Z",
  "v": 0
}

```
