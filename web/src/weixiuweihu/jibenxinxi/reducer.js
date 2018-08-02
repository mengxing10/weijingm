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
REQUESTDEVICECOUNT,
RECEIVEDEVICECOUNT, 

  REQUESTDEVICEBYTYPE,
  RECEIVEDEVICEBYTYPE, 

  REQUESTADDDEVICE,
  RECEIVEADDDEVICE,

  REQUESTDEVICEINFO,
  RECEIVEDEVICEINFO,

} from './constants/actionTypes'

const initialState = {

  layoutData:{resultCode:-1,data:[]},
  svgdata:{},
                      powerdata:{},
                      energydata:{},
                      gl:{},
                      yl:{},
                      hourdata:{},

                    
}

export default function reducer(state = initialState, action) {
    switch (action.type) {




        case REQUESTDEVICEINFO:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEDEVICEINFO:
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




        case REQUESTADDDEVICE:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEADDDEVICE:
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




        case REQUESTDEVICEBYTYPE:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEDEVICEBYTYPE:
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

          

        case REQUESTDEVICECOUNT:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEDEVICECOUNT:
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
