/**
 * @file 简易状态管理
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

import Emitter from './emitter';

export default class Store extends Emitter {

    constructor(initialState = {}) {
        super();

        let me = this;

        me.state = initialState;
    }

    get() {
        return this.state;
    }

    set(state) {
        this.state = Object.assign(
            {},
            this.state,
            state
        );
    }
}
