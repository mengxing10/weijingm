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

import {deviceAPI} from './constants/api'

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
            let monthReport = await axios.post(deviceAPI.monthReport, params);

         
            

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
export function deleteDevice(params) {
    return async dispatch => {
        dispatch(request(REQUESTYEARMONTH, params))

        try {
            

            let deleteDevice = await axios.post(deviceAPI.deleteDevice, params).then(function(res){              
                                        //dispatch(receive(RECEIVESETMAIL, res)); 
                                       // let res ={addResult:addResult}
                                        dispatch(receive(RECEIVEBAOBIAO, res));

                                        location.reload();           
                                   });

            
            // let res ={yearMonth:yearMonth}
            // dispatch(receive(RECEIVEYEARMONTH, res));
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
export function queryDevice(params) {
    return async dispatch => {
        dispatch(request(REQUESTREPORTNOW, params))

        try {
                  
           
             let deviceList = await axios.post(deviceAPI.queryDevice, params);
            
             let res ={deviceList:deviceList}

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
export function addDevice(params) {
    return async dispatch => {
        dispatch(request(REQUESTBAOBIAO, params))

        try {
            let addResult= await axios.post(deviceAPI.addDevice, params).then(function(res){              
                                        //dispatch(receive(RECEIVESETMAIL, res)); 
                                       // let res ={addResult:addResult}
                                        dispatch(receive(RECEIVEBAOBIAO, res));

                                        location.reload();           
                                   });
            // let res ={addResult:addResult}
            // dispatch(receive(RECEIVEBAOBIAO, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEBAOBIAO, {status: 2, errmsg: '数据错误'}))
        }
    }
}
