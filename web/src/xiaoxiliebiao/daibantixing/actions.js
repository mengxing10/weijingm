/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {
  REQUESTXXLIST,
  RECEIVEXXLIST


} from './constants/actionTypes'

import {tixingAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}





/**
 * 获取待办提醒数据
 *
 * @param {all} params
 */
export function getTixingData(params) {
    return async dispatch => {
        dispatch(request(REQUESTXXLIST, params))
        try {
          let tixingdatas =  await axios.post(tixingAPI.tixingdatas, params);
          let res = {"tixingdata":tixingdatas.data};
          dispatch(receive(RECEIVEXXLIST, res));
        }
        catch (err) {
          console.error('捕获到错误: ', err)
          dispatch(receive(RECEIVEXXLIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}
