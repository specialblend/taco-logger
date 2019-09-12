import flat from 'flat';
import { curry, is, map, pipe, unless } from 'ramda';

const serializeChild = unless(is(String), JSON.stringify);
const serializeObject = pipe(flat, map(serializeChild));

const normalizeEventLog = curry(
    (namespace, eventType, event) => {
        const payload = {
            namespace,
            [namespace]: {
                eventType,
                event: {
                    [eventType]: event,
                },
            },
        };
        return serializeObject(payload);
    }
);

export default normalizeEventLog;
