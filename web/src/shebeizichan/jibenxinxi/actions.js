/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import {
  //获取冷站监测SVG的数据
  REQUESTLENGZHANDATA,
  RECEIVELENGZHANDATA,
  //获取冷站功率及COP数据
  REQUESTPOWERDATA,
  RECEIVEPOWERDATA,
  //获取能耗数据图表
  REQUESTENERGYDATA,
  RECEIVEENERGYDATA,

  //末端数据
  REQUESTTERMDATA,
  RECEIVETERMDATA,

  REQUESTDEVICECOUNT,
  RECEIVEDEVICECOUNT, 

  REQUESTDEVICEBYTYPE,
  RECEIVEDEVICEBYTYPE, 
  REQUESTADDDEVICE,
  RECEIVEADDDEVICE,
  REQUESTDEVICEINFO,
  RECEIVEDEVICEINFO,


} from './constants/actionTypes'

import {reportAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}



 


 

/**
 * 添加公司
 *
 * @param {all} params
 */
export function addDevice(params,t) {  //checkResult
    return async dispatch => {
        dispatch(request(REQUESTADDDEVICE, params))

        try {
            
 
            axios.post(reportAPI.adddevice, params).then(function (res) {

                let res1 = {addDeviceData:res};
                dispatch(receive(RECEIVEADDDEVICE, res1));
                t.checkResult(res,t); 
  
                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEYEARMONTH, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取设备列表
 * @param {all} params
 */
export function getDeviceByType(params) {
    return async dispatch => {
        dispatch(request(REQUESTDEVICEBYTYPE, params))

        try {
 
             var p = '?devicetypeid=' + params.devicetypeid ;
            
             let deviceByTypeData = await axios.get(reportAPI.getdeviceByType + p);    
             let res ={deviceByTypeData:deviceByTypeData}
             dispatch(receive(RECEIVEDEVICEBYTYPE, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEDEVICEBYTYPE, {status: 2, errmsg: '数据错误'}))
        }
    }
}




export function getDeviceInfo(params) {
    return async dispatch => {
        dispatch(request(REQUESTDEVICEINFO, params))

        try {
 
             var p = '?deviceassetid=' + params.deviceassetid ;
            
             let deviceInfoData = await axios.get(reportAPI.getdeviceinfo + p);    
             let res ={deviceInfoData:deviceInfoData}
             dispatch(receive(RECEIVEDEVICEINFO, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEDEVICEBYTYPE, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取设备列表
 * @param {all} params
 */
export function getDevicecount(params) {
    return async dispatch => {
        dispatch(request(REQUESTDEVICECOUNT, params))

        try {
 

            var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno;

            // name : 设备名称
            // layoutid:泵站id
            // pageno,pagesize 分页详情
            if(params!=null)
                {
                        //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
                      //  p='?workordertypeid=' + params.workordertypeid +'&pagesize=' + params.pagesize + '&pageno=' + params.pageno;  // + '&createtimestart=' + params.createtimestart+ '&createtimeend=' + params.createtimeend;
                            
                        // if(  params.createtimestart )
                        //    p =p+ '&createtimestart=' + params.createtimestart

                        // if(params.createtimeend)
                        //    p =p+ '&createtimeend=' + params.createtimeend

                        if(params.name && params.name!='')
                           p =p+ '&name=' + params.name
                        if(params.layoutid && params.layoutid!=-1)
                           p =p+ '&layoutid=' + params.layoutid

                }

             let devicecountData = await axios.get(reportAPI.getdevicecount + p);    
             let res ={devicecountData:devicecountData}
             dispatch(receive(RECEIVEDEVICECOUNT, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEDEVICECOUNT, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function getInitData(params) {

    return async dispatch => {


        dispatch(request(REQUESTLENGZHANDATA, params))

        try {

            let layoutData =  await axios.get(reportAPI.getlayout, params);
            let devicetypeData =  await axios.get(reportAPI.getalldevicetype);
            let res = {layoutData:layoutData,devicetypeData:devicetypeData };
            dispatch(receive(RECEIVELENGZHANDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTLENGZHANDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}






/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function getTermData(params) {

    return async dispatch => {


        dispatch(request(REQUESTTERMDATA, params))

        try {

          let gl =  await axios.post(API.gl, params);
          let yl =  await axios.post(API.yl, params);
          let hourdata =  await axios.post(API.hourdata, params)
            let res = {"gl":gl,"yl":yl,"hourdata":hourdata};
            dispatch(receive(RECEIVETERMDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTTERMDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}
