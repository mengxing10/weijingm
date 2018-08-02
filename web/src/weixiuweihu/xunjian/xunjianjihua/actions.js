/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import {
  //查询巡检计划
  REQUESTXUNJIANLIST,
  RECEIVEXUNJIANLIST,
  //查询巡检单
  REQUESTXUNJIANDAN,
  RECEIVEXUNJIANDAN,

} from './constants/actionTypes'

import {xjAPI} from './constants/api'
import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

/**
 * 获取巡检计划数据
 *
 * @param {all} params
 */
export function getStationstatus(params) {
    return async dispatch => {
        dispatch(request(REQUESTXUNJIANLIST, params))
        try {
          var  p='?1=1';
          if(params.datetime)
            p =p + '&datetime=' + params.datetime;

          let xunjiandata =  await axios.get(xjAPI.getstationstatus+p);
          let res = {"xunjiandata":xunjiandata.data};
          dispatch(receive(RECEIVEXUNJIANLIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEXUNJIANLIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 获取巡检单数据
 *
 * @param {all} params
 */
export function getpcStationinfo(params) {
    return async dispatch => {
        dispatch(request(REQUESTXUNJIANDAN, params))
        try {
          var  p='?1=1';
          if(params.stationid)
            p =p + '&stationid=' + params.stationid;
          if(params.planid)
            p =p + '&planid=' + params.planid;
          let xunjiandandata =  await axios.get(xjAPI.getpcstationinfo+p);
          let res = {"xunjiandandata":xunjiandandata.data};
          dispatch(receive(RECEIVEXUNJIANDAN, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEXUNJIANDAN, {status: 2, errmsg: '数据错误'}))
        }
    }
}
