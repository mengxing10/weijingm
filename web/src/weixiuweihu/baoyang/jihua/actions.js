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

  REQUESTMAINPLANSET,
  RECEIVEMAINPLANSET,

  REQUESTMAINPLANSETDETAIL,
  RECEIVEMAINPLANSETDETAIL,


  REQUESTTOTALFITTING,
  RECEIVETOTALFITTING,

  REQUESTADDREPAIR,
  RECEIVEADDREPAIR,
  



} from './constants/actionTypes'

import {reportAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}






/**
 * 添加配件
 *
 * @param {all} params
 */
export function addResult(params,t) {

    return async dispatch => {

        dispatch(request(REQUESTADDREPAIR, params))

        try {

            // let addfittingData =  await axios.post(reportAPI.addfitting, params);     
            // let res = {addfittingData:addfittingData };
            // dispatch(receive(RECEIVEADDFITTING, res));

            axios.post(reportAPI.addresult,params).then(function (res) {

                let res1 = {addrepairData:res};
                dispatch(receive(RECEIVEADDREPAIR, res1));
                 t.checkResult(res,t); 
  
                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });







        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEADDFITTING, {status: 2, errmsg: '数据错误'}))
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
            let deviceTypeData = await axios.get(reportAPI.getfittings);
            //let deviceTypeData =  await axios.get(reportAPI.getalldevicetype);
            let res = {layoutData:layoutData,deviceTypeData:deviceTypeData }; //
          
            dispatch(receive(RECEIVELENGZHANDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTLENGZHANDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取人员及配件
 * @param {all} params
 */
export function getTotalFitting(params) {
    return async dispatch => {
        dispatch(request(REQUESTTOTALFITTING, params))

        try {
 
            //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno;
            // if(params!=null)
            //     {
            //             if(params.name && params.name!='')
            //                p =p+ '&name=' + params.name
            //              if(params.layoutid && params.layoutid!=-1)
            //                 p =p+ '&layoutid=' + params.layoutid
            //     }

            // var p = '?id=' + params.id; 
             //var p = '?starttime=2010-05-02 15:00:00&endtime=2020-05-02 16:00:00';
             var p = '?starttime=' + params.starttime + '&endtime=' + params.endtime ;
             let totalfittingData = await axios.get(reportAPI.gettotalfitting + p);    
             let res ={totalfittingData:totalfittingData}
             dispatch(receive(RECEIVETOTALFITTING, res));
 
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVETOTALFITTING, {status: 2, errmsg: '数据错误'}))
        }
    }
}







/**
 * 获取维保计划设置详情
 * @param {all} params
 */
export function getResultInfoDetail(params,t) {
    return async dispatch => {
        dispatch(request(REQUESTMAINPLANSETDETAIL, params))

        try {
 
            //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno;
            // if(params!=null)
            //     {
            //             if(params.name && params.name!='')
            //                p =p+ '&name=' + params.name
            //              if(params.layoutid && params.layoutid!=-1)
            //                 p =p+ '&layoutid=' + params.layoutid
            //     }

             var p = '?id=' + params.id;
             //p = '?id=38'  ;
             var resultInfoImgs =null;

             let resultInfoData = await axios.get(reportAPI.getresultinfo + p);  
             if(params.status==2) //完成 ，需要查看图片，请求图片
             {
                   //http://192.168.30.129:8080/maintenenceresult/getimg?id=34
                 resultInfoImgs = await axios.get(reportAPI.getimg + p);   
             }  
             let res ={resultInfoData:resultInfoData,resultInfoImgs:resultInfoImgs}
             dispatch(receive(RECEIVEMAINPLANSETDETAIL, res));
 
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEMAINPLANSETDETAIL, {status: 2, errmsg: '数据错误'}))
        }
    }
}







/**
 * 获取维保计划设置
 * @param {all} params
 */
export function getMainPlanSet(params,t) {
    return async dispatch => {
        dispatch(request(REQUESTMAINPLANSET, params))

        try {
 
            var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno  + '&starttime=' + params.starttime + '&endtime=' + params.endtime ;
            if(params!=null)
                {
                        if(params.name && params.name!='')
                           p =p+ '&name=' + params.name
                         if(params.layoutid && params.layoutid!=-1)
                            p =p+ '&layoutID=' + params.layoutid


                }

             let mainPlanInfoData = await axios.get(reportAPI.getmainplanInfo + p);    
             let res ={mainPlanInfoData:mainPlanInfoData}
             dispatch(receive(RECEIVEMAINPLANSET, res));
 
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEMAINPLANSET, {status: 2, errmsg: '数据错误'}))
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
