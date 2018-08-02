/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */

import {
  //报表

  REQUESTBAOBIAO,
  RECEIVEBAOBIAO,
     REQUESTYEARMONTH,
   RECEIVEYEARMONTH, 
   REQUESTREPORTNOW,
   RECEIVEREPORTNOW 

} from './constants/actionTypes'
import React, {Component, PropTypes} from 'react'
const initialState = {

yearMonth:
{"status":1,"data":{"year_month_list":[{"year":2017,"month_list":[6,9]}]}},


monthReport:
{
  "status": 1,
  "data": {
    "statisticalReportlist": [
      {
        "id": "2017-09-03-170001",
        "pumpCode": 170001,
        "shangqiLeishiqiDushu": 0,
        "dangqiLeishiqiDushu": 0,
        "leijiYunxingXiaoshishu": 0,
        "shangqiDianbiaoDushu": 0,
        "dangqiDianbiaoDushu": 0,
        "dangqiYongdianliang": 0,
        "gaizaoqianGonglv": 0,
        "dangqiJieshengDianneng": 0,
        "year": 0,
        "month": 0,
        "jienenglv": 0,
        "readtime": "0",
        "shangciChaobiaoRiqi": "0",
        "name":""
      }
    ]
  }
},

deviceList:
{
  "status": 1,
  "data":[
    {"name": '冷却塔',
    "model": 'NC8402QAN4FPK',
    "number": 4,
    "madefactory": '斯必克冷却技术有限公司',
    "madedate": '2016-06'
    }
  ]


},

baobiao:{"status":0,"data":{"data":[]}},
entityCode:"20010001",

}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTBAOBIAO:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEBAOBIAO:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }


        case REQUESTYEARMONTH:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEYEARMONTH:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }



        case REQUESTREPORTNOW:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEREPORTNOW:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }



          


        default:
            return state
    }
}
