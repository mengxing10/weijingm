/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */

 import {
    REQUESTDATATYPES,
    RECEIVEDATATYPES,
    REQUESTCURVES,
    RECEIVECURVES,
    REQUESTDELETE,
    RECEIVEDELETE

 } from './constants/actionTypes'

const initialState = {curveslist:[],
  datatypes:{data:[]}
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTDATATYPES:
        {
            return Object.assign({}, state, {fetchdatatypes: 'start'});
          }

        case RECEIVEDATATYPES:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchdatatypes: action.data.errmsg?'start':'done'
                }
            )
          }
          case REQUESTCURVES:
          {
              return Object.assign({}, state, {fetchcurves: 'start'});
            }

          case RECEIVECURVES:
          {
              action.data.curves?state.curveslist.push(action.data.curves):console.log(
                'wurururu'
              );
              return Object.assign(
                  {},
                  state,
                  {
                    fetchcurves: action.data.errmsg?action.data.datatype+'start':action.data.datatype+'done'
                  }
              )
            }
            case REQUESTDELETE:
            {
                // let index ;
                return Object.assign(
                    {},
                    state,
                    {
                      deletecurves: 'start'
                    }

                )
              }
            case RECEIVEDELETE:
            {
                let index ;
                state.curveslist.forEach((item,i)=>{
                  if(item.datatype==action.data.datatype){index=i}
                  })
                state.curveslist.splice(index,1)

                return Object.assign(
                    {},
                    state,
                    {
                      deletecurves: action.data.datatype+'done'
                    }

                )
              }

        default:
            return state
    }
}
