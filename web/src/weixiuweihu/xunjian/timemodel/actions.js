/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import {
  //时间模板数据
  REQUESTTIMELIST,
  RECEIVETIMELIST,
  //添加
  REQUESTADDTIMELIST,
  RECEIVEADDTIMELIST,

  //修改
  REQUESTMODIFYTIMELIST,
  RECEIVEMODIFYTIMELIST,

} from './constants/actionTypes'

import {modelAPI} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

/**
 * 获取时间模板列表
 *
 * @param {all} params
 */
export function getTimemodelData(params) {
    return async dispatch => {
        dispatch(request(REQUESTTIMELIST))
        try{
          var  p='?id=1';
          if(params.pageno)
            p =p + '&pageno=' + params.pageno;
          else
            p =p + '&pageno=1';
          if(params.pagesize)
            p =p + '&pagesize=' + params.pagesize;
          else
            p =p + '&pagesize=10';
          let timemodelData =  await axios.get(modelAPI.modellist+p);
          let res = {"timemodelData":timemodelData.data};
          dispatch(receive(RECEIVETIMELIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVETIMELIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 添加时间模板
 *
 * @param {all} params
 */
export function setTimemodelData(params) {
    return async dispatch => {
        dispatch(request(REQUESTADDTIMELIST))
        try {
          let result =  await axios.post(modelAPI.addmodel,params)
          let res = {"timemodelResult":result};
          dispatch(receive(RECEIVEADDTIMELIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEADDTIMELIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 修改时间模板
 *
 * @param {all} params
 */
export function modifyTimemodelData(params) {
    return async dispatch => {
        dispatch(request(REQUESTMODIFYTIMELIST))
        try {
          let result =  await axios.post(modelAPI.modifymodel,params)
          let res = {"timemodelResult":result};
          dispatch(receive(RECEIVEMODIFYTIMELIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEMODIFYTIMELIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}
