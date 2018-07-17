/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

 import {

       //获取实时数据
     REQUESTREAL,
     RECEIVEREAL,

       //获取小时历史数据
     REQUESTHISHOUR,
     RECEIVEHISHOUR,

       //获取日历史数据
     REQUESTHISDAY,
     RECEIVEHISDAY,

       //获取月历史数据
     REQUESTHISMONTH,
     RECEIVEHISMONTH,
       //获取年历史数据
     REQUESTHISYEAR,
     RECEIVEHISYEAR,
       //获取时间段内所有数据
     REQUESTHISWHOLE,
     RECEIVEHISWHOLE,

       //获取小时报表数据
     REQUESTREPHOUR,
     RECEIVEREPHOUR,

       //获取日报表数据
     REQUESTREPDAY,
     RECEIVEREPDAY,

       //获取周报表数据
     REQUESTREPWEEK,
     RECEIVEREPWEEK,

       //获取月报表数据
     REQUESTREPMONTH,
     RECEIVEREPMONTH,
       //获取年报表数据
     REQUESTREPYEAR,
     RECEIVEREPYEAR,



 } from './constants/actionTypes'

const initialState = {
  realData:{"data":[{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"status":0},
  hisHourData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  hisDayData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  hisMonthData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  hisYearData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  hisWholeData:{"status":0},
  repHourData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  repDayData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  repWeekData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  repMonthData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},
  repYearData:{"status":0,"data":{"48":[],"63":[],"78":[],"shijian":[]}},



}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTREAL:
        {
            return Object.assign({}, state);
        }

        case RECEIVEREAL:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }

        case REQUESTHISHOUR:
        {
            return Object.assign({}, state);
        }

        case RECEIVEHISHOUR:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }

        case REQUESTHISDAY:
        {
            return Object.assign({}, state);
        }

        case RECEIVEHISDAY:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }
        case REQUESTHISMONTH:
        {
            return Object.assign({}, state);
        }

        case RECEIVEHISMONTH:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }
        case REQUESTHISYEAR:
        {
            return Object.assign({}, state);
        }

        case RECEIVEHISYEAR:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }


        case REQUESTHISWHOLE:
        {
            return Object.assign({}, state);
        }

        case RECEIVEHISWHOLE:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }




        case REQUESTREPHOUR:
        {
            return Object.assign({}, state);
        }

        case RECEIVEREPHOUR:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }

        case REQUESTREPDAY:
        {
            return Object.assign({}, state);
        }

        case RECEIVEREPDAY:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }
        case REQUESTREPWEEK:
        {
            return Object.assign({}, state);
        }

        case RECEIVEREPWEEK:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }
        case REQUESTREPMONTH:
        {
            return Object.assign({}, state);
        }

        case RECEIVEREPMONTH:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }
        case REQUESTREPYEAR:
        {
            return Object.assign({}, state);
        }

        case RECEIVEREPYEAR:
        {
            return Object.assign(
                {},
                state,
                {  ...action.data}
            )
        }





        default:
            return state
    }
}
