/**
 * @file loginAction
 * @author qiaolifeng <qiao.l.f@outlook.com>
 *
 * 状态码统一约定:
 * 0 成功, 非0 失败
 * 其他特殊含义状态码待进一步确定
 */

import axios from 'axios'
import {
    UPLOGINSTATUS,
    SENDLOGININFO,
    RECEIVELOGININFO,
} from './constants/actionTypes'

import {loginAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'
import cookie from 'cookie'
import {browserHistory} from 'react-router'
let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}



/**
 * 登陆后更新登录字段
 *
 * @param {boolean} 是否登陆
 */
 export function upLoginStatus(params) {
    return async dispatch => {
        try {
            //Todo:request the login info from server
            //let res = await axios.post(loginAPI.login, {params})

            //if (+res.code !== 0) {
                //dispatch(receive(RECEIVELOGININFO, {status: 1, errmsg: res.msg}))
            //}
            //else {
                //dispatch(receive(RECEIVELOGININFO, {status: 0, data: res.data}))
            //}
            dispatch(receive(RECEIVELOGININFO, {status: 0, data:{"isLogin":params}}))

        }
        catch (e) {
            console.error('捕获到错误: ', e)
            dispatch(receive(RECEIVELOGININFO, {status: 2, errmsg: '数据错误'}))
        }
    }

}

/**
 * 登录提交
 *
 * @param {all} params 具体待定
 */
export function getLoginInfo(params,checkResult,t) {


    return async dispatch => {
        try {
            //Todo:request the login info from server
            // let loginResult = await axios.post(loginAPI.login, params)
            // console.log(res);
            // let res ={loginResult:loginResult}
            // dispatch(receive(RECEIVELOGININFO, res))

            // // let isLogin=params.user==="admin" && params.password==="admin"
            // // dispatch(receive(RECEIVELOGININFO, {status: 0, data:{"isLogin":isLogin}}))
             checkResult( {"status":1,data:{userid:"admin"},"errorCode":-2,"errorMessage":"用户不存在"},t);



           /*
             await axios.post(loginAPI.login, params).then(function(res){

            checkResult(res,t);
            // var ds= res;  //{"status":0,"errorCode":-2,"errorMessage":"用户不存在"}
            //  //{"status":0,"errorCode":-3,"errorMessage":"密码错误"}
            //  //if (window.history.length)
            //  if(ds.status==1) 
            //  {
            //     //browserHistory.goBack()
            //     browserHistory.push('/yayd/pc/home')
            // }
            // // HACK手工敲url直接进入登录页面的情况
            // else {
            //     alert(ds.errorMessage);

            //     //this.refs.password.value = '';
            //     //window.location.href = '/yayd/pc/login'
            // }
            
        
           })

             */
            // if(res.data)
            // {
            //     this.error = '';
            //     window.location.href = '/';
            // }else {
            //     this.error = '帐号或者密码错误';
            // }
         


           //    if (window.history.length) {
        //         //browserHistory.goBack()
        //         browserHistory.push('/yayd/pc/home')
        //     }
        //     // HACK手工敲url直接进入登录页面的情况
        //     else {
        //         window.location.href = '/yayd/pc/login'
        //     }
        //     
        //     
        //     
        //     
        //     

        }
        catch (e) {
            console.error('捕获到错误: ', e)
            dispatch(receive(RECEIVELOGININFO, {status: 2, errmsg: '数据错误'}))
        }



    }
}
