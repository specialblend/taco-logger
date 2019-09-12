# taco-logger

wrapper around `winston` logger to provide namespaced, flattened JSON event logger - safe for elastic/filebeat

## install

```bash
npm install @specialblend/taco-logger
```

## example log format

example

```javascript
logger
    .withRequestId('537ff8cb-a5fd-41d7-8de7-188407163608')
    .event('LoginFailed', { username: 'alice@example.com', failedAttempts: }, 'Failed login attempt');
```

output:

```json
{"requestId":"537ff8cb-a5fd-41d7-8de7-188407163608","namespace":"FooBar","FooBar.eventType":"LoginFailed","FooBar.event.LoginFailed.username":"alice@example.com","level":"info","message":"Failed login attempt"}
```

output (pretty):
```json
{
  "requestId": "537ff8cb-a5fd-41d7-8de7-188407163608",
  "namespace": "FooBar",
  "FooBar.eventType": "LoginFailed",
  "FooBar.event.LoginFailed.username": "alice@example.com",
  "level": "info",
  "message": "Failed login attempt"
}
```

## usage

```javascript
import createLogger from './lib';

// minimal call: createLogger();

const appLogger = createLogger();

// minimal call: appLogger.event(<eventType>, <event>)

appLogger.event('LoginFailed', { username: 'alice@example.com' });
// => {"namespace":"app","app.eventType":"LoginFailed","app.event.LoginFailed.username":"alice@example.com","level":"info"}

// log event with message

appLogger.event('LoginFailed', { username: 'alice@example.com' }, 'Failed login attempt');
// => {"namespace":"app","app.eventType":"LoginFailed","app.event.LoginFailed.username":"alice@example.com","level":"info","message":"Failed login attempt"}

// log event with requestId

appLogger
    .withRequestId('537ff8cb-a5fd-41d7-8de7-188407163608')
    .event('LoginFailed', { username: 'alice@example.com' }, 'Failed login attempt');
// => {"requestId":"537ff8cb-a5fd-41d7-8de7-188407163608","namespace":"app","app.eventType":"LoginFailed","app.event.LoginFailed.username":"alice@example.com","level":"info","message":"Failed login attempt"}

// create logger with namespace

const myFooBarLogger = createLogger({ namespace: 'FooBar' });

// minimal call: myLogger.event(<eventType>, <event>)

myFooBarLogger.event('LoginFailed', { username: 'alice@example.com' });
// => {"namespace":"FooBar","FooBar.eventType":"LoginFailed","FooBar.event.LoginFailed.username":"alice@example.com","level":"info"}

// log event with message

myFooBarLogger.event('LoginFailed', { username: 'alice@example.com' }, 'Failed login attempt');
// => {"namespace":"FooBar","FooBar.eventType":"LoginFailed","FooBar.event.LoginFailed.username":"alice@example.com","level":"info","message":"Failed login attempt"}

// log event with requestId

myFooBarLogger
    .withRequestId('537ff8cb-a5fd-41d7-8de7-188407163608')
    .event('LoginFailed', { username: 'alice@example.com' }, 'Failed login attempt');
// => {"requestId":"537ff8cb-a5fd-41d7-8de7-188407163608","namespace":"FooBar","FooBar.eventType":"LoginFailed","FooBar.event.LoginFailed.username":"alice@example.com","level":"info","message":"Failed login attempt"}

```
