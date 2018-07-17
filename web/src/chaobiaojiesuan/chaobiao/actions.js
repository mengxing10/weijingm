/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {
  //获取抄表数据
  REQUESTECHAOBIAOLIST,
  RECEIVECHAOBIAOLIST,
  //获取抄表指标项
  REQUESTDEVICEINFO,
  RECEIVEDEVICEINFO,
  //保存抄表数据
  REQUESTADDCHAOBIAO,
  RECEIVEADDCHAOBIAO,
  //抄表详细数据
  REQUESTCHAOBIAOINFO,
  RECEIVECHAOBIAOINFO,

} from './constants/actionTypes'

import {chaobiaoAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

/**
 * 获取抄表数据
 *
 * @param {all} params
 */
export function getChaobiaoData(params) {
    return async dispatch => {
        dispatch(request(REQUESTECHAOBIAOLIST, params))
        try {
          let chaobiaodata =  await axios.post(chaobiaoAPI.chaobiaolist, params)
          let res = {"chaobiaodata":chaobiaodata.data};
          dispatch(receive(RECEIVECHAOBIAOLIST, res));
        }
        catch (err) {
          console.error('捕获到错误: ', err)
          dispatch(receive(RECEIVECHAOBIAOLIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 保存抄表数据
 *
 * @param {all} params
 */
export function addChaobiaoData(params) {
    return async dispatch => {
        dispatch(request(REQUESTADDCHAOBIAO, params))
        try {
          let result =  await axios.post(chaobiaoAPI.addmeterreading, params)
          let res = {"addchaobiaoresult":result};
          dispatch(receive(RECEIVEADDCHAOBIAO, res));
        }
        catch (err) {
          console.error('捕获到错误: ', err)
          dispatch(receive(RECEIVEADDCHAOBIAO, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 获取抄表指标项数据
 *
 * @param {all} params
 */
export function getDeviceInfo(params) {
    return async dispatch => {
        dispatch(request(REQUESTDEVICEINFO, params))
        try {
          var p = '?stationgroupcode='+params.stationgroupcode;
          let deviceinfodata =  await axios.get(chaobiaoAPI.deviceinfo+p);
          let res = {"deviceinfodata":deviceinfodata.data};
          dispatch(receive(RECEIVEDEVICEINFO, res));
        }
        catch (err) {
          console.error('捕获到错误: ', err)
          dispatch(receive(RECEIVEDEVICEINFO, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 获取抄表明细数据
 *
 * @param {all} params
 */
export function getChaobiaoInfo(params) {
    return async dispatch => {
        dispatch(request(REQUESTCHAOBIAOINFO, params))
        try {
          var p = '?readingid='+params.readingid;
          let chaobiaoinfo =  await axios.get(chaobiaoAPI.chaobiaoinfo+p);
          let res = {"chaobiaoinfo":chaobiaoinfo.data};
          dispatch(receive(RECEIVECHAOBIAOINFO, res));
        }
        catch (err) {
          console.error('捕获到错误: ', err)
          dispatch(receive(RECEIVECHAOBIAOINFO, {status: 2, errmsg: '数据错误'}))
        }
    }
}
