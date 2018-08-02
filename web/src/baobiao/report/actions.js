/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import {
  REQUESTBAOBIAO,
  RECEIVEBAOBIAO,
   REQUESTYEARMONTH,
   RECEIVEYEARMONTH, 
   REQUESTREPORTNOW,
   RECEIVEREPORTNOW 


} from './constants/actionTypes'

import {reportAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}




/**
 * 获取月报表
 *
 * @param {all} params
 */
export function getMonthReport(params) {
    return async dispatch => {
        dispatch(request(REQUESTBAOBIAO, params))

        try {
            let monthReport = await axios.post(reportAPI.monthReport, params);

         
            

            let res ={monthReport:monthReport}
            dispatch(receive(RECEIVEBAOBIAO, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEBAOBIAO, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取年月
 *
 * @param {all} params
 */
export function getYearMonth(params) {
    return async dispatch => {
        dispatch(request(REQUESTYEARMONTH, params))

        try {
            

            let yearMonth = await axios.post(reportAPI.yearMonth, params);

            
            let res ={yearMonth:yearMonth}
            dispatch(receive(RECEIVEYEARMONTH, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEYEARMONTH, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取当前月报表
 *
 * @param {all} params
 */
export function getMonthReportNow(params) {
    return async dispatch => {
        dispatch(request(REQUESTREPORTNOW, params))

        try {
            

             // let monthReportNow = await axios.post(reportAPI.monthReportNow, params);
            // let res ={monthReportNow:monthReportNow}
             let monthReport = await axios.post(reportAPI.monthReportNow, params);
            
           let res ={monthReport:monthReport}

            dispatch(receive(RECEIVEREPORTNOW, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEREPORTNOW, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取分厂
 *
 * @param {all} params
 */
export function getAllBranch(params) {
    return async dispatch => {
        dispatch(request(REQUESTBAOBIAO, params))

        try {
            let allBranch = await axios.post(reportAPI.allBranch, params);
            let res ={allBranch:allBranch}
            dispatch(receive(RECEIVEBAOBIAO, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEBAOBIAO, {status: 2, errmsg: '数据错误'}))
        }
    }
}
