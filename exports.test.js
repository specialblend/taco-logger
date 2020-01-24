import createLogger, { Logger } from './lib';

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
