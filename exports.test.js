import createLogger, { Logger } from './index';

describe('createLogger', () => {
    test('is Function', () => {
        expect(createLogger).toBeFunction();
    });
});

describe('Logger', () => {
    test('is Function', () => {
        expect(Logger).toBeFunction();
    });
});
