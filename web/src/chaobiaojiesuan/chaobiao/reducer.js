/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import {
  //获取抄表数据
  REQUESTECHAOBIAOLIST,
  RECEIVECHAOBIAOLIST,
  REQUESTDEVICEINFO,
  RECEIVEDEVICEINFO,
  //保存抄表数据
  REQUESTADDCHAOBIAO,
  RECEIVEADDCHAOBIAO,
  //抄表详细数据
  REQUESTCHAOBIAOINFO,
  RECEIVECHAOBIAOINFO,

} from './constants/actionTypes'

const initialState = {
  chaobiaodata:{data:[]},
  deviceinfodata:{},
  addchaobiaoresult:{},
  chaobiaoinfo:{},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case REQUESTECHAOBIAOLIST:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVECHAOBIAOLIST:
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
      case REQUESTDEVICEINFO:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEDEVICEINFO:
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
      case REQUESTADDCHAOBIAO:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEADDCHAOBIAO:
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
      case REQUESTCHAOBIAOINFO:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVECHAOBIAOINFO:
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
