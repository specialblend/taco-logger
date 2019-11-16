import createLogger from './index';

describe('createLogger', () => {
    test('is Function', () => {
        expect(createLogger).toBeFunction();
    });
});
