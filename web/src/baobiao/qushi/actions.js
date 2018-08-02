/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
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

import {API,POINTID} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}





/**
 * 获取实时数据
 *
 * @param {all} params
 */
export function getRealData(params) {

    return async dispatch => {


        dispatch(request(REQUESTREAL, params))

        try {
            params["pointId"] = POINTID.real
            let realData = await axios.post(API.realData, params);
            let res = {realData:realData};
            dispatch(receive(RECEIVEREAL, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTREAL, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 获取逐时历史数据
 *
 * @param {all} params
 */
export function getHisHourData(params) {

    return async dispatch => {

        dispatch(request(REQUESTHISHOUR, params))

        try {
            params["pointId"] = POINTID.hisHour
            params["timeType"] = "hour"
            let hisHourData = await axios.post(API.hisData, params);
            let res = {hisHourData:hisHourData};
            dispatch(receive(RECEIVEHISHOUR, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTHISHOUR, {status: 2, errmsg: '数据错误'}))
        }
    }
}


/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getHisDayData(params) {

    return async dispatch => {

        dispatch(request(REQUESTHISDAY, params))

        try {
            params["pointId"] = POINTID.hisDay
            params["timeType"] = "day"
            let hisDayData = await axios.post(API.hisData, params);
            let res = {hisDayData:hisDayData};
            dispatch(receive(RECEIVEHISDAY, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTHISDAY, {status: 2, errmsg: '数据错误'}))
        }
    }
}


/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getHisMonthData(params) {

    return async dispatch => {

        dispatch(request(REQUESTHISMONTH, params))

        try {
            params["pointId"] = POINTID.hisMonth
            params["timeType"] = "month"
            let hisMonthData = await axios.post(API.hisData, params);
            let res = {hisMonthData:hisMonthData};
            dispatch(receive(RECEIVEHISMONTH, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTHISMONTH, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getHisYearData(params) {

    return async dispatch => {

        dispatch(request(REQUESTHISYEAR, params))

        try {
            params["pointId"] = POINTID.hisYear
            params["timeType"] = "month"
            let hisYearData = await axios.post(API.hisData, params);
            let res = {hisMonthData:hisYearData};
            dispatch(receive(RECEIVEHISYEAR, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTHISYEAR, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取逐日历史数据
 *需要传入pointid 数组
 * @param {all} params
 */
export function getHisWholeData(params) {

    return async dispatch => {

        dispatch(request(REQUESTHISWHOLE, params))

        try {
            params["timeType"] = "whole"
            let hisWholeData = await axios.post(API.hisData, params);
            let res = {hisWholeData:hisWholeData};
            dispatch(receive(RECEIVEHISWHOLE, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTHISWHOLE, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取逐时历史数据
 *
 * @param {all} params
 */
export function getRepHourData(params) {

    return async dispatch => {

        dispatch(request(REQUESTREPHOUR, params))

        try {
            params["pointId"] = POINTID.repHour
            params["timeType"] = "hour"
            let repHourData = await axios.post(API.repData, params);
            let res = {repHourData:repHourData};
            dispatch(receive(RECEIVEREPHOUR, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTREPHOUR, {status: 2, errmsg: '数据错误'}))
        }
    }
}


/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getRepDayData(params) {

    return async dispatch => {

        dispatch(request(REQUESTREPDAY, params))

        try {
            params["pointId"] = POINTID.repDay
            params["timeType"] = "day"
            let repDayData = await axios.post(API.repData, params);
            let res = {repDayData:repDayData};
            dispatch(receive(RECEIVEREPDAY, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTREPDAY, {status: 2, errmsg: '数据错误'}))
        }
    }
}


/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getRepWeekData(params) {

    return async dispatch => {

        dispatch(request(REQUESTREPWEEK, params))

        try {
            params["pointId"] = POINTID.repWeek
            params["timeType"] = "week"
            let repWeekData = await axios.post(API.repData, params);
            let res = {repWeekData:repWeekData};
            dispatch(receive(RECEIVEREPWEEK, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTREPWEEK, {status: 2, errmsg: '数据错误'}))
        }
    }
}




/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getRepMonthData(params) {

    return async dispatch => {

        dispatch(request(REQUESTREPMONTH, params))

        try {
            params["pointId"] = POINTID.repMonth
            params["timeType"] = "month"
            let repMonthData = await axios.post(API.repData, params);
            let res = {repMonthData:repMonthData};
            dispatch(receive(RECEIVEREPMONTH, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTREPMONTH, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取逐日历史数据
 *
 * @param {all} params
 */
export function getRepYearData(params) {

    return async dispatch => {

        dispatch(request(REQUESTREPYEAR, params))

        try {
            params["pointId"] = POINTID.repYear
            params["timeType"] = "year"
            let repYearData = await axios.post(API.repData, params);
            let res = {repMonthData:repYearData};
            dispatch(receive(RECEIVEREPYEAR, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(REQUESTREPYEAR, {status: 2, errmsg: '数据错误'}))
        }
    }
}






/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function getCurveData(params) {

    return async dispatch => {


        dispatch(request(REQUESTTERMDATA, params))

        try {

            let dayData = await axios.post(API.hisData, params.day);
            let monthData = await axios.post(API.hisData, params.month);
            let res = {dayData:dayData,monthData:monthData};

            dispatch(receive(RECEIVETERMDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTTERMDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}
