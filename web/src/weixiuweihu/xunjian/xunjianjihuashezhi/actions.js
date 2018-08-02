/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import {
  //查询列表
  REQUESTMAPTIMELIST,
  RECEIVEMAPTIMELIST,
  //泵站列表
  REQUESTBENGZHANLIST,
  RECEIVEBENGZHANLIST,
  //时间模板数据
  REQUESTTIMELIST,
  RECEIVETIMELIST,
  //添加巡检计划
  REQUESTINSPECTION,
  RECEIVEINSPECTION,
  //修改巡检计划
  REQUESTINSPECTIONUP,
  RECEIVEINSPECTIONUP,
  //查询指定的时间模板
  REQUESTTIMEMODEL,
  RECEIVETIMEMODEL,

} from './constants/actionTypes'
import {mapAPI} from './constants/api'
import ERRORCODE from './constants/errorCode'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

/**
 * 获取主页数据
 *
 * @param {all} params
 */
export function getMaptime(params) {
    return async dispatch => {
        dispatch(request(REQUESTMAPTIMELIST, params))
        try {
          var  p='?1==1';
          if(params.pageno)
            p =p + '&pageno=' + params.pageno;
          else
            p =p + '&pageno=1';
          if(params.pagesize)
            p =p + '&pagesize=' + params.pagesize;
          else
            p =p + '&pagesize=10';
          if(params.stationname)
            p =p + '&stationname=' + params.stationname;
          console.log(p);
          let plandata =  await axios.get(mapAPI.getstationmaptime+p)
          let res = {"plandata":plandata.data};
          dispatch(receive(RECEIVEMAPTIMELIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEMAPTIMELIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 获取所有泵站数据
 *
 * @param {all} params
 */
export function getBengzhan(params) {
    return async dispatch => {
        dispatch(request(REQUESTBENGZHANLIST, params))
        try {
          let bengzhandata =  await axios.get(mapAPI.getlayout+"?projectid="+params.projectid)
          let res = {"bengzhandata":bengzhandata.data};
          dispatch(receive(RECEIVEBENGZHANLIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEBENGZHANLIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}
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
            p =p + '&pagesize=200';
          let timemodelDatas =  await axios.get(mapAPI.modellist+p);
          let res = {"timemodelDatas":timemodelDatas.data.data};
          dispatch(receive(RECEIVETIMELIST, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVETIMELIST, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 添加巡检计划
 *
 * @param {all} params
 */
export function addStationmaptime(params) {
    return async dispatch => {
        dispatch(request(REQUESTINSPECTION))
        try {
          let result =  await axios.post(mapAPI.addstationmaptime,params)
          let res = {"timemodelResult":result};
          dispatch(receive(RECEIVEINSPECTION, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEINSPECTION, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 修改巡检计划
 *
 * @param {all} params
 */
export function updateStationmaptime(params) {
    return async dispatch => {
        dispatch(request(REQUESTINSPECTIONUP))
        try {
          let result =  await axios.post(mapAPI.updatestationmaptime,params)
          let res = {"timemodelResult":result};
          dispatch(receive(RECEIVEINSPECTIONUP, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVEINSPECTIONUP, {status: 2, errmsg: '数据错误'}))
        }
    }
}

/**
 * 根据id获取时间模板详情
 *
 * @param {all} params
 */
export function getptbyid(params) {
    return async dispatch => {
        dispatch(request(REQUESTTIMEMODEL, params))
        try {
          let timemodel =  await axios.get(mapAPI.getptbyid+"?inspectionid="+params.inspectionid)
          let res = {"timemodel":timemodel.data};
          dispatch(receive(RECEIVETIMEMODEL, res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            dispatch(receive(RECEIVETIMEMODEL, {status: 2, errmsg: '数据错误'}))
        }
    }
}
