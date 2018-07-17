/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
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

} from './constants/actionTypes'

const initialState = {svgdata:{},
                      powerdata:{},
                      energydata:{},
                      gl:{},
                      yl:{},
                      hourdata:{},

                    }

export default function reducer(state = initialState, action) {
    switch (action.type) {


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
