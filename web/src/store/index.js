/**
 * @file createStore
 * @author zlc <lichao9182@126.com>
 */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducer.js'

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createLogger())
    //applyMiddleware(thunk)
)(createStore)

export default initialState => createStoreWithMiddleware(rootReducer, initialState)
