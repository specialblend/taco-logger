import normalizeEventLog from './normalizeLog';

const fooStr = 'foo-str-fgvhbjnkmlgfvhbjnkml';
const fooUnsignedInt = 42;
const fooZeroInt = 0;
const fooSignedInt = -42;
const fooFloat = 12.34;
const fooBoolTrue = true;
const fooBoolFalse = false;
const fooEmptyObj = {};
const fooEmptyArr = {};

const fooArr = [
    fooStr,
    fooUnsignedInt,
    fooZeroInt,
    fooSignedInt,
    fooFloat,
    fooBoolTrue,
    fooBoolFalse,
];

const fooFlatObjLiteral = {
    fooStr,
    fooUnsignedInt,
    fooZeroInt,
    fooSignedInt,
    fooFloat,
    fooBoolTrue,
    fooBoolFalse,
};

const fooNestedObjLiteral = {
    ...fooFlatObjLiteral,
    fooEmptyObj,
    fooEmptyArr,
    fooArr,
};

const fooNamespace = 'FooNamespace';
const fooEventType = 'FooEventType';

describe('normalizeEventLog', () => {
    test('is Function', () => {
        expect(normalizeEventLog).toBeFunction();
    });
    describe('when called', () => {
        let normalizeFooEvent = null;
        beforeAll(() => {
            normalizeFooEvent = normalizeEventLog(fooNamespace, fooEventType);
        });
        test('returns Function', () => {
            expect(normalizeFooEvent).toBeFunction();
        });
        describe('when called', () => {
            describe('returns expected result', () => {
                test('with plain flat object', () => {
                    const normalizedEventLog = normalizeFooEvent(fooFlatObjLiteral);
                    expect(normalizedEventLog).toMatchObject({
                        namespace: 'FooNamespace',
                        'FooNamespace.eventType': 'FooEventType',
                        'FooNamespace.event.FooEventType.fooStr': 'foo-str-fgvhbjnkmlgfvhbjnkml',
                        'FooNamespace.event.FooEventType.fooUnsignedInt': '42',
                        'FooNamespace.event.FooEventType.fooZeroInt': '0',
                        'FooNamespace.event.FooEventType.fooSignedInt': '-42',
                        'FooNamespace.event.FooEventType.fooFloat': '12.34',
                        'FooNamespace.event.FooEventType.fooBoolTrue': 'true',
                        'FooNamespace.event.FooEventType.fooBoolFalse': 'false',
                    });
                });
                test('with nested object', () => {
                    const normalizedEventLog = normalizeFooEvent(fooNestedObjLiteral);
                    expect(normalizedEventLog).toMatchObject({
                        namespace: 'FooNamespace',
                        'FooNamespace.eventType': 'FooEventType',
                        'FooNamespace.event.FooEventType.fooStr': 'foo-str-fgvhbjnkmlgfvhbjnkml',
                        'FooNamespace.event.FooEventType.fooUnsignedInt': '42',
                        'FooNamespace.event.FooEventType.fooZeroInt': '0',
                        'FooNamespace.event.FooEventType.fooSignedInt': '-42',
                        'FooNamespace.event.FooEventType.fooFloat': '12.34',
                        'FooNamespace.event.FooEventType.fooBoolTrue': 'true',
                        'FooNamespace.event.FooEventType.fooBoolFalse': 'false',
                        'FooNamespace.event.FooEventType.fooEmptyObj': '{}',
                        'FooNamespace.event.FooEventType.fooEmptyArr': '{}',
                        'FooNamespace.event.FooEventType.fooArr.0': 'foo-str-fgvhbjnkmlgfvhbjnkml',
                        'FooNamespace.event.FooEventType.fooArr.1': '42',
                        'FooNamespace.event.FooEventType.fooArr.2': '0',
                        'FooNamespace.event.FooEventType.fooArr.3': '-42',
                        'FooNamespace.event.FooEventType.fooArr.4': '12.34',
                        'FooNamespace.event.FooEventType.fooArr.5': 'true',
                        'FooNamespace.event.FooEventType.fooArr.6': 'false',
                    });
                });
            });
        });
    });
});
