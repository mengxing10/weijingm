/**
 * @file indexReducer
 * @author zlc <lichao9182@126.com>
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as user}  from './user';
import {reducer as login} from './login';
import {reducer as nengxiaobi} from './jituan/nengxiaobi';
export default combineReducers({
    user,
    login,
    nengxiaobi,
    routing: routerReducer
})
