/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {
  //结算单列表
  REQUESTJIESUANDANLIST,
  RECEIVEJIESUANDANLIST,
  //结算单明细
  REQUESTJIESUANDANINFO,
  RECEIVEJIESUANDANINFO,
  //抄表单列表
  REQUESTECHAOBIAODANLIST,
  RECEIVECHAOBIAODANLIST,
  //生成结算单
  REQUESTADDJIESUANDAN,
  RECEIVEADDJIESUANDAN,

} from './constants/actionTypes'

import {billAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}
/**
 * 生成结算单
 * @param {all} params
 */
export function addJiesuandanData(params) {
  return async dispatch => {
      dispatch(request(REQUESTADDJIESUANDAN, params))
      try {
        let result =  await axios.post(billAPI.addbill, params);
        let res = {};
        dispatch(receive(RECEIVEADDJIESUANDAN, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVEADDJIESUANDAN, {status: 2, errmsg: '数据错误'}))
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
        let chaobiaodandata =  await axios.post(billAPI.chaobiaodanlist, params)
        let res = {"cbdlist":chaobiaodandata.data};
        dispatch(receive(RECEIVECHAOBIAODANLIST, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVECHAOBIAODANLIST, {status: 2, errmsg: '数据错误'}))
      }
  }
}
/**
 * 获取结算单明细
 *
 * @param {all} params
 */
export function getBillInfoData(params) {
  return async dispatch => {
      dispatch(request(REQUESTJIESUANDANINFO, params))
      try {
        let jiesuandanInfo =  await axios.get(billAPI.getbilldetaillist+'?billid='+params.billid);
        let res = {"jiesuandanInfo":jiesuandanInfo.data};
        dispatch(receive(RECEIVEJIESUANDANINFO, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVEJIESUANDANINFO, {status: 2, errmsg: '数据错误'}))
      }
  }
}
/**
 * 获取结算单列表
 *
 * @param {all} params
 */
export function getBillData(params) {
  return async dispatch => {
      dispatch(request(REQUESTJIESUANDANLIST, params))
      try {
        let jiesuandanData =  await axios.post(billAPI.getbilllist, params)
        let res = {"jiesuandanData":jiesuandanData.data};
        dispatch(receive(RECEIVEJIESUANDANLIST, res));
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive(RECEIVEJIESUANDANLIST, {status: 2, errmsg: '数据错误'}))
      }
  }
}
