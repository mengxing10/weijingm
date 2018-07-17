/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {
  //抄表单列表
  REQUESTECHAOBIAODANLIST,
  RECEIVECHAOBIAODANLIST,
  //抄表列表
  REQUESTECHAOBIAOLIST,
  RECEIVECHAOBIAOLIST,
  //抄表单明细
  REQUESTCHAOBIAODANINFO,
  RECEIVECHAOBIAODANINFO,
  //生成抄表单
  REQUESTADDCHAOBIAODAN,
  RECEIVEADDCHAOBIAODAN,

} from './constants/actionTypes'

import {chaobiaodanAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}


/**
 * 生成抄表单
 *
 * @param {all} params
 */
export function addChaobiaodan(params) {
  return async dispatch => {
      dispatch(request(REQUESTADDCHAOBIAODAN, params))
      try {
        let result =  await axios.post(chaobiaodanAPI.addmeterreadingreport, params)
        let res = {};
        dispatch(receive(RECEIVEADDCHAOBIAODAN, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVEADDCHAOBIAODAN, {status: 2, errmsg: '数据错误'}))
      }
  }
}

/**
 * 获取抄表单列表
 *
 * @param {all} params
 */
export function getChaobiaodanData(params) {
  return async dispatch => {
      dispatch(request(REQUESTECHAOBIAODANLIST, params))
      try {
        let chaobiaodandata =  await axios.post(chaobiaodanAPI.chaobiaodanlist, params)
        let res = {"chaobiaodanlist":chaobiaodandata.data};
        dispatch(receive(RECEIVECHAOBIAODANLIST, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVECHAOBIAODANLIST, {status: 2, errmsg: '数据错误'}))
      }
  }
}
/**
 * 获取抄表列表
 *
 * @param {all} params
 */
export function getChaobiaoData(params) {
  return async dispatch => {
      dispatch(request(REQUESTECHAOBIAOLIST, params))
      try {
        let chaobiaodata =  await axios.post(chaobiaodanAPI.chaobiaolist, params)
        let res = {"chaobiaolist":chaobiaodata.data};
        dispatch(receive(RECEIVECHAOBIAOLIST, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVECHAOBIAOLIST, {status: 2, errmsg: '数据错误'}))
      }
  }
}

/**
 * 获取抄表单明细
 *
 * @param {all} params
 */
export function getChaobiaodanInfo(params) {
  return async dispatch => {
      dispatch(request(REQUESTCHAOBIAODANINFO, params))
      try {
        let chaobiaodaninfo =  await axios.post(chaobiaodanAPI.chaobiaodaninfo, params)
        let res = {"chaobiaodaninfo":chaobiaodaninfo.data};
        dispatch(receive(RECEIVECHAOBIAODANINFO, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVECHAOBIAODANINFO, {status: 2, errmsg: '数据错误'}))
      }
  }
}
