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

  REQUESTMAINPLANSET,
  RECEIVEMAINPLANSET,

  REQUESTMAINPLANSETDETAIL,
  RECEIVEMAINPLANSETDETAIL,

  REQUESTTOTALFITTING,
  RECEIVETOTALFITTING,


  REQUESTADDREPAIR,
  RECEIVEADDREPAIR,



} from './constants/actionTypes'

const initialState = {
deviceTypeData:{resultCode:-1,data:[]},
totalfittingData:{
 resultCode:-1,
 data: {timeCosuming:0,fitting:[]}

},

resultInfoData:{
          resultCode:-1,
          data:{  


          description:"测试一",
          deviceAssetName:"name",
          endTime:1531402562000,
          fitting:[],
          maintenencePlanID:6,
          maintenenceType:2,
          name:"变压器",
          period:"3",
          periodtype:3,
          startTime:1530279324000,
          timeConsuming:25,
          title:"标题测试",

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



        case REQUESTADDREPAIR:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
        }

        case RECEIVEADDREPAIR:
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



        case REQUESTTOTALFITTING:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVETOTALFITTING:
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



          
        
        case REQUESTMAINPLANSETDETAIL:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEMAINPLANSETDETAIL:
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

          

        case REQUESTMAINPLANSET:
        {
            return Object.assign({}, state, {fetchsvgdata: 'start'});
          }

        case RECEIVEMAINPLANSET:
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
