/**
 * @file createStore.dev.js
 * @author zlc <lichao9182@126.com>
 */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducer.js'
import {persistState} from 'redux-devtools'
import DevTools from '../containers/DevTools'

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createLogger()),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)

export default initialState => createStoreWithMiddleware(rootReducer, initialState)
