/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import {
  //结算单列表
  REQUESTJIESUANDANLIST,
  RECEIVEJIESUANDANLIST,
  //结算单明细
  REQUESTJIESUANDANINFO,
  RECEIVEJIESUANDANINFO,
  //抄表单列表
  REQUESTECHAOBIAODANLIST,
  RECEIVECHAOBIAODANLIST,
  //生成结算单
  REQUESTADDJIESUANDAN,
  RECEIVEADDJIESUANDAN,
} from './constants/actionTypes'

const initialState = {
  jiesuandanData:{data:[]},
  jiesuandanInfo:{billDetails:[]},
  cbdlist:{data:[]},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case REQUESTJIESUANDANLIST:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEJIESUANDANLIST:
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
      case REQUESTJIESUANDANINFO:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEJIESUANDANINFO:
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
      case REQUESTADDJIESUANDAN:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEADDJIESUANDAN:
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
