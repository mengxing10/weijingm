/**
 * @file chaobiaodanReducer
 * @author zlc <lichao9182@126.com>
 */
const initialState = {
  jiesuanlist:{"pageNo": 1,"pageSize": 20,"pageCount": 1,
                  "recordCount": 1,"data": []
                  },

  jiesuandaninfo:{
                "chargeReport": {},
                "chargeDetails": []
              },
  jiesuandannew:[],
  jiesuandanmod:{endReadingDate:{},startReadingDate:{}},
  jiesuandangen:'',
  jiesuandanconf:[],




}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'REQUESTE_JIESUANLIST':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANLIST: 'start'});
      }
      case 'RECEIVE_JIESUANLIST':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_JIESUANLIST: 'done'
            }
        )
      }
      case 'REQUESTE_JIESUANDANINFO':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANDANINFO: 'start'});
      }
      case 'RECEIVE_JIESUANDANINFO':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_JIESUANDANINFO: 'done'
            }
        )
      }
      case 'REQUESTE_JIESUANDANNEW':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANDANNEW: 'start'});
      }
      case 'RECEIVE_JIESUANDANNEW':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_JIESUANDANNEW: 'done'
            }
        )
      }
      case 'REQUESTE_JIESUANDANMOD':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANDANMOD: 'start'});
      }
      case 'RECEIVE_JIESUANDANMOD':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_JIESUANDANMOD: 'done'
            }
        )
      }
      case 'REQUESTE_JIESUANDANGEN':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANDANMOD: 'start'});
      }
      case 'RECEIVE_JIESUANDANGEN':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_JIESUANDANMOD: 'done'
            }
        )
      }
      case 'REQUESTE_JIESUANDANCONF':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANDANCONF: 'start'});
      }
      case 'RECEIVE_JIESUANDANCONF':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_JIESUANDANCONF: 'done'
            }
        )
      }
      case 'REQUESTE_JIESUANDANCONFMOD':
      {
        return Object.assign({}, state, {REQUESTE_JIESUANDANCONFMOD: 'start'});
      }
      case 'RECEIVE_JIESUANDANCONFMOD':
      {
        return Object.assign(
            {},
            state,
            {
              REQUESTE_JIESUANDANCONFMOD: 'done'
            }
        )
      }


      default:
          return state
    }
}
