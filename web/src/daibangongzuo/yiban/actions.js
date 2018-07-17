/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import axios from 'axios'
import {
  //获取冷站监测SVG的数据
  REQUESTLENGZHANDATA,
  RECEIVELENGZHANDATA,
  //获取冷站功率及COP数据
  REQUESTPOWERDATA,
  RECEIVEPOWERDATA,
  //获取能耗数据图表
  REQUESTENERGYDATA,
  RECEIVEENERGYDATA,

  //末端数据
  REQUESTTERMDATA,
  RECEIVETERMDATA,

} from './constants/actionTypes'

import {API} from './constants/api'

import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}





/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function getHomeData(params) {

    return async dispatch => {


        dispatch(request(REQUESTLENGZHANDATA, params))

        try {

          let svgdata =  await axios.post(API.svg, params);
          let powerdata =  await axios.post(API.power, params);
          let energydata =  await axios.post(API.energy, params)
            let res = {"svgdata":svgdata,"powerdata":powerdata,"energydata":energydata};
            dispatch(receive(RECEIVELENGZHANDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTLENGZHANDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}



/**
 * 获取监测主页数据
 *
 * @param {all} params
 */
export function getTermData(params) {

    return async dispatch => {


        dispatch(request(REQUESTTERMDATA, params))

        try {

          let gl =  await axios.post(API.gl, params);
          let yl =  await axios.post(API.yl, params);
          let hourdata =  await axios.post(API.hourdata, params)
            let res = {"gl":gl,"yl":yl,"hourdata":hourdata};
            dispatch(receive(RECEIVETERMDATA, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive(REQUESTTERMDATA, {status: 2, errmsg: '数据错误'}))
        }
    }
}
