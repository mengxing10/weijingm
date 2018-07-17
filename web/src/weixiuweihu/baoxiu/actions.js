/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
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

   
  REQUESTABNORMAL,
  RECEIVEABNORMAL,

  REQUESTCREATEABNORMAL,
  RECEIVECREATEABNORMAL,

   REQUESTWORKORDERSTATUS,
    RECEIVEWORKORDERSTATUS,

    REQUESTABNORMALFULL,
    RECEIVEABNORMALFULL,


    
} from './constants/actionTypes'

import {API} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}







/**
 * 添加报修单 abnormal
 *
 * @param {all} params  
 */
export function createAbnormal(params,checkResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTCREATEABNORMAL, params))

        try {
            
                //v1: OK
                // let addCompanyData = await axios.post(reportAPI.addstationgroup, params);   
                // let res ={addCompanyData:addCompanyData}
                // dispatch(receive(RECEIVEYEARMONTH, res));


                //v2:
                axios.post(API.createabnormal, params).then(function (res) {

                let res1 = {createAbnormalData:res};
                dispatch(receive(RECEIVECREATEABNORMAL, res1));
                checkResult(res,t); 


                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVECREATEABNORMAL, {status: 2, errmsg: '数据错误'}))
        }
    }
}








/**
 * 获取报修单详细信息
 * @param {all} params
 */
export function getAbnormalFull(params) {
    return async dispatch => {
        dispatch(request(REQUESTABNORMALFULL, params))

        try {

            var  p='';
            if(params!=null)
                {
                        //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
                        p='?reportid=' + params.reportid ;                           
                    
                }

            let abnormalFullData = await axios.get( API.getabnormalfull + p);            
            let res ={abnormalFullData:abnormalFullData}
            dispatch(receive(RECEIVEABNORMALFULL, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEABNORMALFULL, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取报修单列表
 * @param {all} params
 */
export function getAbnormal(params) {
    return async dispatch => {
        dispatch(request(REQUESTABNORMAL, params))

        try {

            var  p='?pagesize=' + params.pagesize + '&pageno=' + params.pageno;

            if(params!=null)
                {


                  // reportid – 报修单编号

                  // createtimestart – 报修单创建时间起始

                  // createtimeend – 报修单创建时间截止

                  // responseid – 报修单处理结果

                  // layoutid – 管理层级（泵站）



                     // var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
                     // p='?workordertypeid =' + params.workordertypeid ;  // + '&createtimestart=' + params.createtimestart+ '&createtimeend=' + params.createtimeend;
                            
                        if(  params.createtimestart )
                           p =p+ '&createtimestart=' + params.createtimestart

                        if(params.createtimeend)
                           p =p+ '&createtimeend=' + params.createtimeend

                        if(params.responseid && params.responseid!=-1)
                           p =p+ '&responseid=' + params.responseid

                        if(params.layoutid && params.layoutid!=-1)
                           p =p+ '&layoutid=' + params.layoutid

                        // if(params.reportid && params.reportid!=-1)
                        //    p =p+ '&reportid=' + params.reportid


                }

            let abnormalData = await axios.get(API.getabnormal + p);                
            let res ={abnormalData:abnormalData}
            dispatch(receive(RECEIVEABNORMAL, res));


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEABNORMAL, {status: 2, errmsg: '数据错误'}))
        }
    }
}







/**
 * 获取工单状态列表
 *
 * @param {all} params
 */
export function getWorkOrderStatus(params) {
    return async dispatch => {
        dispatch(request(REQUESTWORKORDERSTATUS, params))

        try {

             //WORKORDERSTATUS
             //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
             var p='';

              let layoutData2  = await axios.get(API.getlayout + '?projectid=1'); 

              let abnormalResponseData = await axios.get(API.getabnormalresponse); 

              let deviceAssetData = await axios.get(API.getdeviceasset);  

              let abnormalLevelData = await axios.get(API.getabnormallevel);  
               

             // let workOrderStatusData = await axios.get(reportAPI.getworkorderstatus + p); 

             // let workOrderTypeData = await axios.get(reportAPI.getworkordertype); 
                
             // let deviceTypeData = await axios.get(reportAPI.getdevicetype); 

             // let staffData = await axios.get(reportAPI.getstaff); 

             // let companyData = await axios.get(reportAPI.getprojectlist); 
         
             // let res ={layoutData:layoutData,companyData:companyData,workOrderStatusData:workOrderStatusData,workOrderTypeData:workOrderTypeData,deviceTypeData:deviceTypeData,staffData:staffData}
            


            let res ={layoutData2:layoutData2,abnormalResponseData:abnormalResponseData,deviceAssetData:deviceAssetData,abnormalLevelData:abnormalLevelData};
            dispatch(receive(RECEIVEWORKORDERSTATUS, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEWORKORDERSTATUS, {status: 2, errmsg: '数据错误'}))
        }
    }
}









/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function getHomeData(params) {

    return async dispatch => {


        dispatch(request(REQUESTLENGZHANDATA, params))

        try {

          let svgdata =  await axios.post(API.svg, params);
          let powerdata =  await axios.post(API.power, params);
          let energydata =  await axios.post(API.energy, params)
          let res = {"svgdata":svgdata,"powerdata":powerdata,"energydata":energydata};
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
