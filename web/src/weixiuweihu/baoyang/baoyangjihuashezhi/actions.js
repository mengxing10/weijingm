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

  REQUESTDEVICECOUNT,
  RECEIVEDEVICECOUNT, 

  REQUESTGETFITTINGS,
  RECEIVEGETFITTINGS,

  REQUESTMAINPLANSET,
  RECEIVEMAINPLANSET,

  REQUESTMAINPLANSETDETAIL,
  RECEIVEMAINPLANSETDETAIL,

  REQUESTADDFITTING,
  RECEIVEADDFITTING,

} from './constants/actionTypes'

import {reportAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}






/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function addFitting(params,t) {

    return async dispatch => {

        dispatch(request(REQUESTADDFITTING, params))

        try {

            // let addfittingData =  await axios.post(reportAPI.addfitting, params);     
            // let res = {addfittingData:addfittingData };
            // dispatch(receive(RECEIVEADDFITTING, res));



            axios.post(reportAPI.addfitting,params).then(function (res) {

                let res1 = {addfittingData:res};
                dispatch(receive(RECEIVEADDFITTING, res1));
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
 * 获取维保计划设置详情
 * @param {all} params
 */
export function getMainplansetDetail(params,t) {
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
             let mainPlanSetDetailData = await axios.get(reportAPI.getmainplansetDetail + p);    
             let res ={mainPlanSetDetailData:mainPlanSetDetailData}
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
                            p =p+ '&stationid=' + params.layoutid


                }

             let mainPlanSetData = await axios.get(reportAPI.getmainplanset + p);    
             let res ={mainPlanSetData:mainPlanSetData}
             dispatch(receive(RECEIVEMAINPLANSET, res));
 
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEMAINPLANSET, {status: 2, errmsg: '数据错误'}))
        }
    }
}






/**
 * 获取配件
 * @param {all} params
 */
export function getFittings(params,t) {
    return async dispatch => {
        dispatch(request(REQUESTGETFITTINGS, params))

        try {
 

            var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno;
   
            if(params!=null)
                {
             

                        if(params.name && params.name!='')
                           p =p+ '&name=' + params.name
                        // if(params.layoutid && params.layoutid!=-1)
                        //    p =p+ '&layoutid=' + params.layoutid

                }

             let fittingsData = await axios.get(reportAPI.getfittings + p);    
             let res ={fittingsData:fittingsData}
             dispatch(receive(RECEIVEGETFITTINGS, res));
 


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEGETFITTINGS, {status: 2, errmsg: '数据错误'}))
        }
    }
}







/**
 * 获取设备列表
 * @param {all} params
 */
export function getDevicecount(params,t) {
    return async dispatch => {
        dispatch(request(REQUESTDEVICECOUNT, params))

        try {
 

            var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno;
   
            if(params!=null)
                {
             

                        if(params.name && params.name!='')
                           p =p+ '&name=' + params.name
                        if(params.layoutid && params.layoutid!=-1)
                           p =p+ '&layoutid=' + params.layoutid

                }

             // let devicecountData = await axios.get(reportAPI.getdevicecount + p);    
             // let res ={devicecountData:devicecountData}
             // dispatch(receive(RECEIVEDEVICECOUNT, res));


            
              
            axios.get(reportAPI.getdevicecount + p).then(function (res) {

                let res1 = {devicecountData:res};
                dispatch(receive(RECEIVEDEVICECOUNT, res1));
                //t.bengZhanResult(res,t); 
  
                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });





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
            //let devicetypeData =  await axios.get(reportAPI.getalldevicetype);
            let res = {layoutData:layoutData }; //,devicetypeData:devicetypeData
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
export function getHomeData(params) {

    return async dispatch => {


        dispatch(request(REQUESTLENGZHANDATA, params))

        try {

          let svgdata =  await axios.post(reportAPI.svg, params);
          let powerdata =  await axios.post(reportAPI.power, params);
          let energydata =  await axios.post(reportAPI.energy, params)
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

          let gl =  await axios.post(reportAPI.gl, params);
          let yl =  await axios.post(reportAPI.yl, params);
          let hourdata =  await axios.post(reportAPI.hourdata, params)
            let res = {"gl":gl,"yl":yl,"hourdata":hourdata};
            dispatch(receive(RECEIVETERMDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTTERMDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}
