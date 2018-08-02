/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */

import {
  //时间模板数据
  REQUESTTIMELIST,
  RECEIVETIMELIST,

  //添加
  REQUESTADDTIMELIST,
  RECEIVEADDTIMELIST,

  //修改
  REQUESTMODIFYTIMELIST,
  RECEIVEMODIFYTIMELIST,
} from './constants/actionTypes'

const initialState = {timemodelData:{data:[{planTimeName:''}]}

                    }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTTIMELIST:
        {
          return Object.assign({}, state, {fetchsvgdata: 'start'});
        }
        case RECEIVETIMELIST:
        {
          return Object.assign(
              {},
              state,
              {
                ...action.data,
                fetchsvgdata: action.data.errmsg?'start':'done'
              }
          )
        }
        case REQUESTADDTIMELIST:
        {
          return Object.assign({}, state, {fetchsvgdata: 'start'});
        }
        case RECEIVEADDTIMELIST:
        {
          return Object.assign(
              {},
              state,
              {
                ...action.data,
                fetchsvgdata: action.data.errmsg?'start':'done'
              }
          )
        }
        case REQUESTMODIFYTIMELIST:
        {
          return Object.assign({}, state, {fetchsvgdata: 'start'});
        }
        case RECEIVEMODIFYTIMELIST:
        {
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
