import createLogger from './src/main';

const name = 'taco';
const logger = createLogger({ name });

const payload = {
    awsRequestId: 'drfcgvhbjnk',
    invokedFunctionArn: 'sdrftgvyhjukl',
};

logger.type('HandlerBoot').info(payload, 'info message with payload');
logger.type('foo').error(payload, 'error message with payload');
