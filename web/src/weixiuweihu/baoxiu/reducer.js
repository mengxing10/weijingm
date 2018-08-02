/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */

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

  REQUESTABNORMAL,
  RECEIVEABNORMAL,


  REQUESTWORKORDERSTATUS,
  RECEIVEWORKORDERSTATUS,

  REQUESTCREATEABNORMAL,
  RECEIVECREATEABNORMAL,

  REQUESTABNORMALFULL,
  RECEIVEABNORMALFULL,


} from './constants/actionTypes'

const initialState = {


                      abnormalFullData:{

                                        resultCode: -1,
                                        data: {
                                              "abnormalReportID": 1,
                                              "abnormalLevelID": 1,
                                              "layoutID": 1,
                                              "deviceAssetID": 3,
                                              "title": "",
                                              "createUserID": 1,
                                              "isConfirmed": true,
                                              "createTime": 1529994177000,
                                              "confirmUserID": 1,
                                              "confirmTime": 1529994177000,
                                              "abnormalResponseID": 2,
                                              "abnormalAtachmentID": 1,
                                              "confirmUserName": "张三丰",
                                              "abnormalResponseName": "消除",
                                              "deviceAssetName": "",
                                              "createUserName": "张三丰",
                                              "abnormalLevelName": "正常",
                                              "content": "",  
                                              "abnormalAttachmentCodes": []                        
                                              
                                          }

                          },
                      svgdata:{},
                      powerdata:{},
                      energydata:{},
                      gl:{},
                      yl:{},
                      hourdata:{},

                    
}

export default function reducer(state = initialState, action) {
    switch (action.type) {





 


        case REQUESTWORKORDERSTATUS:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEWORKORDERSTATUS:
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





        case REQUESTLENGZHANDATA:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVELENGZHANDATA:
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


        case REQUESTABNORMAL:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEABNORMAL:
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

        case REQUESTABNORMALFULL:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEABNORMALFULL:
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

        case REQUESTCREATEABNORMAL:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVECREATEABNORMAL:
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




          case REQUESTTERMDATA:
          {
              return Object.assign({}, state, {fetchsvgdata: 'start'});
            }

          case RECEIVETERMDATA:
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
