import flat from 'flat';
import { curry, is, map, pipe, unless } from 'ramda';

const isString = is(String);

const serializeChild = unless(isString, JSON.stringify);
const serializeObject = pipe(flat, map(serializeChild));

const normalize = curry(
    (name, type, meta) => {
        const payload = {
            [name]: {
                [type]: meta,
            },
        };
        return serializeObject(payload);
    },
);

export default normalize;