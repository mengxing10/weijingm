/**
 * @file PC
 * @author zlc <lichao9182@126.com>
 */

import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, match, browserHistory, hashHistory} from 'react-router'
import {createLocation} from 'history'
import {syncHistoryWithStore} from 'react-router-redux'
import axios from 'axios'
import configureStore from './store'
import routes from './router.js'
import './common/utils/pretreat'
import './common/index.styl'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

match({routes, location: createLocation}, () => {

    render(


        <Provider store={store}>

            <Router history={history}>{routes}</Router>

        </Provider>,

        document.getElementById('app')

    )
})
