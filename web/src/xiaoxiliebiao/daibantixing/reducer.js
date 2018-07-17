/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

 import {
   REQUESTXXLIST,
   RECEIVEXXLIST
 } from './constants/actionTypes'

const initialState = {tixingdata:{data:[]}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTXXLIST:
        {
          return Object.assign({}, state, {fetchsvgdata: 'start'});
        }
        case RECEIVEXXLIST:
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
