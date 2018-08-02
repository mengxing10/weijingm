/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */

import {
  //查询
  REQUESTXUNJIANLIST,
  RECEIVEXUNJIANLIST,
  //查询巡检单
  REQUESTXUNJIANDAN,
  RECEIVEXUNJIANDAN,

} from './constants/actionTypes'

const initialState = {xunjiandata:[],xunjiandandata:[]}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTXUNJIANLIST:{
          return Object.assign({}, state, {fetchsvgdata: 'start'});
        }
        case RECEIVEXUNJIANLIST:{
          return Object.assign(
              {},
              state,
              {
                ...action.data,
                fetchsvgdata: action.data.errmsg?'start':'done'
              }
          )
        }
        case REQUESTXUNJIANDAN:{
          return Object.assign({}, state, {fetchsvgdata: 'start'});
        }
        case RECEIVEXUNJIANDAN:{
          return Object.assign(
              {},
              state,
              {
                ...action.data,
                fetchsvgdata: action.data.errmsg?'start':'done'
              }
          )
        }
        default:
          return state
    }
}
