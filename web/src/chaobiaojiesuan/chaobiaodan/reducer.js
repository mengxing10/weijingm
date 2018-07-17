/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import {
  //抄表单列表
  REQUESTECHAOBIAODANLIST,
  RECEIVECHAOBIAODANLIST,
  //抄表列表
  REQUESTECHAOBIAOLIST,
  RECEIVECHAOBIAOLIST,
  //抄表单明细
  REQUESTCHAOBIAODANINFO,
  RECEIVECHAOBIAODANINFO,
  //生成抄表单
  REQUESTADDCHAOBIAODAN,
  RECEIVEADDCHAOBIAODAN,
} from './constants/actionTypes'

const initialState = {
  chaobiaodanlist:{data:[]},
  chaobiaolist:[],
  chaobiaodaninfo:{page:{data:[]}},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case REQUESTECHAOBIAODANLIST:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVECHAOBIAODANLIST:
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
      case REQUESTCHAOBIAODANINFO:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVECHAOBIAODANINFO:
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
      case REQUESTADDCHAOBIAODAN:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEADDCHAOBIAODAN:
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
