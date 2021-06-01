import reducer from './reducer.js';
import { createStore } from './core.js';
import withLogger from './logger.js';

const { attach, dispatch, connect } = createStore(withLogger(reducer))

window.dispatch = dispatch

export {
    attach,
    connect
}