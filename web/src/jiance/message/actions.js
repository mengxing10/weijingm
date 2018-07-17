/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {
  REQUESTXIAOXIBAOXIU,
  RECEIVEXIAOXIBAOXIU,

  REQUESTXIAOXIBAOXIUXQ,
  RECEIVEXIAOXIBAOXIUXQ,

  REQUESTXIAOXIWEIHUXQ,
  RECEIVEXIAOXIWEIHUXQ,

  REQUESTXJMB,
  RECEIVEXJMB,
  REQUESTXJSHOW,
  RECEIVEXJSHOW,

  REQUESTCLEARUNREAD,
  RECEIVECLEARUNREAD


} from './constants/actionTypes'

import {xiaoxiAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}




/**
 * 根据topic获取设备
 */
export function getShebeiList(params) {
    return async dispatch => {
        dispatch(request(REQUESTXIAOXIBAOXIU, params))

        try {
            let weihushebei = await axios.post(xiaoxiAPI.shebeilist, params);
            let res ={"weihushebei":weihushebei}
            dispatch(receive(RECEIVEXIAOXIBAOXIU, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEXIAOXIBAOXIU, {status: 2, errmsg: '数据错误'}))
        }
    }
}
/**
 * 获取报修详情
 */
export function getbaoxiuxiangqing(params) {
    return async dispatch => {
        dispatch(request(REQUESTXIAOXIBAOXIUXQ, params))
        var path1=params.path
        try {
            console.log(path1)
            let baoxiuxq = await axios.post(xiaoxiAPI.mmonitorbaoxiuxiangqing, {
                "id":path1
            })
            let res ={"baoxiuxq":baoxiuxq.data}
            dispatch(receive(RECEIVEXIAOXIBAOXIUXQ, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEXIAOXIBAOXIUXQ, {status: 2, errmsg: '数据错误'}))
        }
    }
}
//获取维修详情
export function getweixiuxiangqing(params) {
    return async dispatch => {
        dispatch(request(REQUESTXIAOXIWEIHUXQ, params))
        var path1=params.path
        try {
            console.log(path1)
            let weixiuxq = await axios.post(xiaoxiAPI.mmonitorweihuxiangqing, {
                "id":path1
            })
            let res ={"weixiuxq":weixiuxq.data}
            dispatch(receive(RECEIVEXIAOXIWEIHUXQ, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(RECEIVEXIAOXIWEIHUXQ, {status: 2, errmsg: '数据错误'}))
        }
    }
}
 
//巡检模板
export function getxjlist(params) {
    var xiangmus=params.xiangmu
    return async dispatch => {
        dispatch(request(REQUESTXJMB, params))
        try {
            let res = await axios.post(xiaoxiAPI.xunjianchushi, {
                xiangmu:xiangmus
            })
            dispatch(receive(RECEIVEXJMB, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEXJMB, {status: 2, errmsg: '数据错误'}))
        }
    }
}
//巡检查询
export function xjshow(params) {
    var xiangmus=params.xiangmu
    var time=params.startTime
    return async dispatch => {
        dispatch(request(REQUESTXJSHOW, params))
        try {
            let res = await axios.post(xiaoxiAPI.xunjianshow, {
                    xiangmu:xiangmus,
                    startTime:time,
                    stopTime:time
            })
            dispatch(receive(RECEIVEXJSHOW, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEXJSHOW, {status: 2, errmsg: '数据错误'}))
        }
    }
}

//清空未读消息数
export function clearMessageNumber(params) {
    var topicid=params.topicid
    var userid=params.userid
    return async dispatch => {
        dispatch(request(REQUESTCLEARUNREAD, params))
        try {
            let res = await axios.post(xiaoxiAPI.clearunread, {
                    topicid:topicid,
                    userid:userid
            })
            dispatch(receive(RECEIVECLEARUNREAD, res))
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVECLEARUNREAD, {status: 2, errmsg: '数据错误'}))
        }
    }
}




 
