import { EventEmitter } from 'events';

export default class MockTransports extends EventEmitter {
    constructor(...args) {
        super(...args);
        this.__log__ = jest.fn();
    }

    log(...args) {
        this.__log__(...args);
        return super.log(...args);
    }
}
