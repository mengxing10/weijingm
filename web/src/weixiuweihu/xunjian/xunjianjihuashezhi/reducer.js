/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */

import {
  //查询列表
  REQUESTMAPTIMELIST,
  RECEIVEMAPTIMELIST,

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
const initialState = {plandata:{data:[{stationName:''}]},
bengzhandata:[{layoutID:-1,layoutName:'全部'}],
timemodelDatas:[{planTimeModeId:-1,planTimeName:""}],
timemodel:{planTimeName:''},

                    }

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case REQUESTMAPTIMELIST:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEMAPTIMELIST:
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              fetchsvgdata: action.data.errmsg?'start':'done'
            }
        )
      }
      case REQUESTBENGZHANLIST:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEBENGZHANLIST:
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              fetchsvgdata: action.data.errmsg?'start':'done'
            }
        )
      }
      case REQUESTTIMELIST:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVETIMELIST:
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              fetchsvgdata: action.data.errmsg?'start':'done'
            }
        )
      }
      case REQUESTINSPECTION:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEINSPECTION:
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              fetchsvgdata: action.data.errmsg?'start':'done'
            }
        )
      }
      case REQUESTTIMEMODEL:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVETIMEMODEL:
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              fetchsvgdata: action.data.errmsg?'start':'done'
            }
        )
      }
      case REQUESTINSPECTIONUP:
      {
        return Object.assign({}, state, {fetchsvgdata: 'start'});
      }
      case RECEIVEINSPECTIONUP:
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              fetchsvgdata: action.data.errmsg?'start':'done'
            }
        )
      }
      default:
        return state
    }
}
