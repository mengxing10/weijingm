/**
 * @file createStore.pro.js
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducer.js'

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createLogger())
)(createStore)

export default initialState => createStoreWithMiddleware(rootReducer, initialState)
