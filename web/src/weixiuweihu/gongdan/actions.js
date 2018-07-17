/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {

    REQUESTCREATEWORKORDER,
    RECEIVECREATEWORKORDER,

    REQUESTACCEPTWORKORDER,
    RECEIVEACCEPTWORKORDER,

    REQUESTCOMPLETEJOB,
    RECEIVECOMPLETEJOB,

    REQUESTDEVICEASSET,
    RECEIVEDEVICEASSET,

    REQUESTWORKORDERSTATUS,
    RECEIVEWORKORDERSTATUS,
    REQUESTBAOBIAO,
    RECEIVEBAOBIAO,


    REQUESTWORKORDERFULL,
    RECEIVEWORKORDERFULL,


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
 * 获取工单列表
 * @param {all} params
 */
export function getWorkOrder(params) {
  return async dispatch => {
    dispatch(request(REQUESTBAOBIAO, params))
    try {
      var  p='';
      if(params!=null){
        //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
        p='?workordertypeid=' + params.workordertypeid +'&pagesize=' + params.pagesize + '&pageno=' + params.pageno;  // + '&createtimestart=' + params.createtimestart+ '&createtimeend=' + params.createtimeend;
        if(  params.createtimestart )
           p =p+ '&createtimestart=' + params.createtimestart

        if(params.createtimeend)
           p =p+ '&createtimeend=' + params.createtimeend

        if(params.statusid && params.statusid!=-1)
           p =p+ '&statusid=' + params.statusid
        if(params.layoutid && params.layoutid!=-1)
           p =p+ '&layoutid=' + params.layoutid

      }
      let workOrderData = await axios.get(reportAPI.getalllist + p);
      let res ={workOrderData:workOrderData}
      dispatch(receive(RECEIVEBAOBIAO, res));
    }
    catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVEBAOBIAO, {status: 2, errmsg: '数据错误'}))
    }
  }
}





/**
 * 获取工单详细信息
 * @param {all} params
 */
export function getWorkOrderFull(params) {
    return async dispatch => {
        dispatch(request(REQUESTWORKORDERFULL, params))

        try {

            var  p='';
            if(params!=null)
                {
                        //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
                        p='?orderid=' + params.orderid ;

                }

            let workOrderFullData = await axios.get(reportAPI.getworkorderfull + p);
            let res ={workOrderFullData:workOrderFullData}
            dispatch(receive(RECEIVEWORKORDERFULL, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEWORKORDERFULL, {status: 2, errmsg: '数据错误'}))
        }
    }
}






/**
 * 领取工单
 *
 * @param {all} params
 */
export function acceptWorkorder(params,checkResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTACCEPTWORKORDER, params))

        try {

                axios.post(reportAPI.acceptworkorder, params).then(function (res) {

                let res1 = {acceptWorkorderData:res};
                dispatch(receive(RECEIVEACCEPTWORKORDER, res1));
                checkResult(res,t);

                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEACCEPTWORKORDER, {status: 2, errmsg: '数据错误'}))
        }
    }
}







/**
 * 领取工单
 *
 * @param {all} params
 */
export function completeJob(params,checkResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTCOMPLETEJOB, params))

        try {

                axios.post(reportAPI.completejob, params).then(function (res) {

                let res1 = {acceptWorkorderData:res};
                dispatch(receive(RECEIVECOMPLETEJOB, res1));
                checkResult(res,t);

                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVECOMPLETEJOB, {status: 2, errmsg: '数据错误'}))
        }
    }
}







/**
 * 添加工单
 *
 * @param {all} params
 */
export function createWorkorder(params,checkResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTCREATEWORKORDER, params))
        try {
          axios.post(reportAPI.createworkorder, params)
          .then(function (res) {
            console.log("**********");
            console.log(res);
            let res1 = {createWorkorderData:res};
            dispatch(receive(RECEIVECREATEWORKORDER, res1));
            checkResult(res,t);
            //alert(res.resultMessage)
            //if(res.resultCode==0) alert("添加成功")
            //else alert("添加失败")
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVECREATEWORKORDER, {status: 2, errmsg: '数据错误'}))
        }
    }
}








/**
 * 获取月报表
 *
 * @param {all} params
 */
export function getDeviceAsset(params) {
    return async dispatch => {
        dispatch(request(REQUESTDEVICEASSET, params))

        try {


            //var p = '?pagesize=' + params.pagesize + '&pageno=' + params.pageno + '&companyname=' + params.companyname ;
             var p='';
             let deviceAssetData = await axios.get(reportAPI.getdeviceasset + p);


            let res ={deviceAssetData:deviceAssetData}
            dispatch(receive(RECEIVEDEVICEASSET, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEDEVICEASSET, {status: 2, errmsg: '数据错误'}))
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


             let layoutData  = await axios.get(reportAPI.getlayout + '?projectid=1');

             let workOrderStatusData = await axios.get(reportAPI.getworkorderstatus);

             let workOrderTypeData = await axios.get(reportAPI.getworkordertype);

             let deviceTypeData = await axios.get(reportAPI.getdevicetype);

             let staffData = await axios.get(reportAPI.getstaff);


            let companyData = await axios.get(reportAPI.getprojectlist);



            //  let companyData = await axios.get(reportAPI.getCompany , params );

            // http://192.168.10.112:80/project/company/addcompany
            // var p = {companyName: "2",companyPinyin: "2",address: "2",isValid: true};

            let res ={layoutData:layoutData,companyData:companyData,workOrderStatusData:workOrderStatusData,workOrderTypeData:workOrderTypeData,deviceTypeData:deviceTypeData,staffData:staffData}
            dispatch(receive(RECEIVEWORKORDERSTATUS, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEWORKORDERSTATUS, {status: 2, errmsg: '数据错误'}))
        }
    }
}






/**
 * 添加公司
 *
 * @param {all} params
 */
export function addCompany(params,checkResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTYEARMONTH, params))

        try {

            //v1: OK
            // let addCompanyData = await axios.post(reportAPI.addCompany, params);
            // let res ={addCompanyData:addCompanyData}
            // dispatch(receive(RECEIVEYEARMONTH, res));

            //v2:
            axios.post(reportAPI.addCompany, params).then(function (res) {

                let res1 = {addCompanyData:res};
                dispatch(receive(RECEIVEYEARMONTH, res1));
                checkResult(res,t);
               // alert(res.resultMessage)
               // if(res.resultCode==0) alert("添加成功")
               // else alert("添加失败")

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
 * 修改公司
 *
 * @param {all} params
 */
export function modifyCompany(params,modifyResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTYEARMONTH, params))

        try {

            //v1: OK
            // let addCompanyData = await axios.post(reportAPI.addCompany, params);
            // let res ={addCompanyData:addCompanyData}
            // dispatch(receive(RECEIVEYEARMONTH, res));

            //v2:
            axios.post(reportAPI.modifycompany, params).then(function (res) {

                let res1 = {addCompanyData:res};
                dispatch(receive(RECEIVEYEARMONTH, res1));
                modifyResult(res,t);
               // alert(res.resultMessage)
               // if(res.resultCode==0) alert("添加成功")
               // else alert("添加失败")

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
 * 获取当前月报表
 *
 * @param {all} params
 */
export function getPinyin(params,pinyinResult,t) {
    return async dispatch => {
        dispatch(request(REQUESTREPORTNOW, params))

        try {


             // let monthReportNow = await axios.post(reportAPI.monthReportNow, params);
            // let res ={monthReportNow:monthReportNow}
            //  let monthReport = await axios.post(reportAPI.getpinyin, params);

            // let res ={monthReport:monthReport}

            // dispatch(receive(RECEIVEREPORTNOW, res));


             var c = '?company=' + params.company;
             axios.get(reportAPI.getpinyin+c).then(function (res) {

                let res1 = {getPinyinData:res};
                dispatch(receive(RECEIVEREPORTNOW, res1));
                pinyinResult(res,t);


                console.log(res);
              }).catch(function (error) {
                console.log(error);

            });





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
