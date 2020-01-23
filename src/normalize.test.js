import { normalize } from './main';

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

describe('normalize', () => {
    test('is Function', () => {
        expect(normalize).toBeFunction();
    });
    describe('returns expected result', () => {
        test('for string meta', () => {
            const $name = 'taco';
            const $type = 'alpha';
            const $meta = 'bravo';
            const $result = normalize($name, $type, $meta);
            expect($result).toMatchObject({
                [`${$name}.${$type}`]: $meta,
            });
        });
        test('for object meta', () => {
            const $name = 'taco';
            const $type = 'alpha';
            const $meta = $messageObj;
            const $result = normalize($name, $type, $meta);
            expect($result).toMatchObject({
                'taco.alpha.foo.bar': 'baz',
                'taco.alpha.alpha.bravo.charlie': 'delta',
                'taco.alpha.alpha.echo': 'foxtrot',
            });
        });
    });
});
