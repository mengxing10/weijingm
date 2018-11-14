/**
 * @file homeReducer
 * @author zlc <lichao9182@126.com>
 */


const initialState = {dataname:'',
  curves:{time:[],value:[]}
}
export default function reducer(state = initialState, action) {
    switch (action.type) {

          case 'REQUEST_GETNEWCURVES':
          {
              return Object.assign({}, state, {REQUEST_GETNEWCURVES: 'start'});
            }

          case 'RECEIVE_GETNEWCURVES':
          {
            return Object.assign(
                {},
                state,
                {
                  ...action.data

                }
            )
          }
          case 'REQUEST_GETDATANAME':
          {
              return Object.assign({}, state, {REQUEST_GETDATANAME: 'start'});
            }

          case 'RECEIVE_GETDATANAME':
          {
            return Object.assign(
                {},
                state,
                {
                  ...action.data

                }
            )
          }

        default:
            return state
    }
}
