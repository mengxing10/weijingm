/**
 * @file 用户页面
 * @author zlc <lichao9182@126.com>
 */


import axios from 'axios'
import {
    REQUESTSETMAIL,
    RECEIVESETMAIL,
    REQUESTSETNAME,
    RECEIVESETNAME,
    REQUESTSETPASSWD,
    RECEIVESETPASSWD,
    REQUESTSETPHONE,
    RECEIVESETPHONE,
    REQUESTUSERDETAIL,
    RECEIVEUSERDETAIL,
} from './constants/actionTypes'

import {nameAPI} from './constants/api'
import ERRORCODE from './constants/errorCode'

import Cookies from 'universal-cookie'
const cookies = new Cookies();


let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}



/**
 * 设置名字
 *
 * @param {all} params
 */
export function setname(params) {
    const {newname}=params;
   var id=1;

    const  url= nameAPI.setname
    return async dispatch => {
        dispatch(request(REQUESTSETNAME, params))

        try {
            let res = await axios.post(url,{
                id:id,
                username:newname
            });
            //console.log(res)
            dispatch(receive(RECEIVESETNAME, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVESETNAME, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 设置邮箱
 *
 * @param {all} params
 */
export function setmail(params) {
    const {newmail}=params;
    var id=cookies.get("userid");
    const  url= nameAPI.setemail+"?id="+id+"&email=" + params.newmail;
    return async dispatch => {
        dispatch(request(REQUESTSETMAIL, params))
         if(id!='undefined')
                { 
                try {
                    let res = await axios.post(url,{
                        id:id,
                        email:newmail
                    }).then(function(res){              
                                     dispatch(receive(RECEIVESETMAIL, res));         
                                     location.reload();           
                                   });
                }
                catch (err) {
                    console.error('捕获到错误: ', err)

                    dispatch(receive(RECEIVESETMAIL, {status: 2, errmsg: '数据错误'}))
                }

              }
         else
             {
                console.error('捕获到错误: ', err)
                dispatch(receive(RECEIVESETMAIL, {status: 2, errmsg: '数据错误'}))
            }

    }
}




/**
 * 设置密码
 *
 * @param {all} params
 */
export function setpasswd(params) {
    const {newpwd}=params;
    var id=cookies.get("userid");
    const  url= nameAPI.setpasswd+"?id="+id+"&password=" + params.newpwd;
    return async dispatch => {
        dispatch(request(REQUESTSETPASSWD, params))

        if(id!='undefined')
        {  
                try {
                    let res = await axios.post(url,{
                        id:id,
                        password:newpwd
                    }).then(function(res){              
                             dispatch(receive(REQUESTSETPASSWD, res));         
                             location.reload();           
                           });

                }
                catch (err) {
                    console.error('捕获到错误: ', err)

                    dispatch(receive(RECEIVESETPASSWD, {status: 2, errmsg: '数据错误'}))
                }
        }
         else
             {
                console.error('捕获到错误: ', err)
                dispatch(receive(RECEIVESETPASSWD, {status: 2, errmsg: '数据错误'}))
            }
    }
}



/**
 * 设置手机
 *
 * @param {all} params
 */
export function setphone(params) {
    const {newphone}=params;
    var id=cookies.get("userid");
    const  url= nameAPI.setphone+"?id="+id+"&mobile=" + params.newphone;
    return async dispatch => {
        
        dispatch(request(REQUESTSETPHONE, params))

        if(id!='undefined')
        {         
            try {
                await axios.post(url,{
                    id:id,
                    mobile:newphone
                }).then(function(res){              
                     dispatch(receive(REQUESTSETPHONE, res));         
                     location.reload();           
                   });

           }
            catch (err) {
                console.error('捕获到错误: ', err)

                dispatch(receive(RECEIVESETPHONE, {status: 2, errmsg: '数据错误'}))
            }

         }
         else
             {
                console.error('捕获到错误: ', err)
                dispatch(receive(RECEIVESETPHONE, {status: 2, errmsg: '数据错误'}))
            }




    }
}


/**
 * 获取用户列表
 *
 * @param {all} params
 */
export function getUserDetail(params) {

    const  url= nameAPI.detail
    return async dispatch => {
        dispatch(request(REQUESTUSERDETAIL, params))

        try {
            let userdetail = await axios.post(url,params);
            let res = {userdetail:userdetail}
            //console.log(res)
            dispatch(receive(RECEIVEUSERDETAIL, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTUSERDETAIL, {status: 2, errmsg: '数据错误'}))
        }
    }
}
