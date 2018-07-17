/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import {
  //根据topic获取设备
  REQUESTXIAOXIBAOXIU,
  RECEIVEXIAOXIBAOXIU,

  REQUESTXIAOXIBAOXIUXQ,
  RECEIVEXIAOXIBAOXIUXQ,

  REQUESTXIAOXIWEIHUXQ,
  RECEIVEXIAOXIWEIHUXQ,

  REQUESTXJMB,
  RECEIVEXJMB,
  REQUESTXJSHOW,
  RECEIVEXJSHOW,

  REQUESTCLEARUNREAD,
  RECEIVECLEARUNREAD
     

} from './constants/actionTypes'
import React, {Component, PropTypes} from 'react'
const initialState = {

}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTXIAOXIBAOXIU:
        {
            return Object.assign({}, state, {fetchweuhushebei: 'start'});
          }
        case RECEIVEXIAOXIBAOXIU:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchweuhushebei: action.data.errmsg?'start':'done'
                }
            )
          }

        case REQUESTXIAOXIBAOXIUXQ:
        {
            return Object.assign({}, state, {fetchbaoxiuxq: 'start'});
        }
        case RECEIVEXIAOXIBAOXIUXQ:
            return Object.assign(
                {},
                state,
                {

                    ...action.data,
                //baoxiuxq:action.data.data,
                fetchbaoxiuxq: 'done'
                //fetchbaoxiuxq: action.data.errmsg?'start':'done'
                }
          )

        case REQUESTXIAOXIWEIHUXQ:
            return Object.assign({}, state, {fetchweixiuxq: 'start'});
        case RECEIVEXIAOXIWEIHUXQ:
            return Object.assign(
                {},
                state,
                {
                    ...action.data,
                // weixiuxq:action.data.data,
                fetchweixiuxq: 'done'
                }
            )
        //获取巡检模板
        case REQUESTXJMB:
            return Object.assign({}, state, {fetchxjlist: 'start'});
        case RECEIVEXJMB:
            return Object.assign(
                {},
                state,
                {
                    ...action.data,
                  xunjianlist:action.data.data,
                  fetchxjlist: 'done'
                }
            )
        case REQUESTXJSHOW:
              return Object.assign({}, state, {fetchxjshow: 'start'});
        case RECEIVEXJSHOW:
              return Object.assign(
                  {},
                  state,
                  {
                      ...action.data,
                     xunjianshow:action.data.data,
                     fetchxjshow: 'done'
                 }
              )
        //清空未读消息数
        case REQUESTCLEARUNREAD:
              return Object.assign({}, state, {fetchclearunread: 'start'});
        case RECEIVECLEARUNREAD:
              return Object.assign(
                  {},
                  state,
                  {
                      ...action.data,
                     clearunread:action.data.data,
                     fetchclearunread: 'done'
                 }
              )
        default:
            return state
    }
}

 
