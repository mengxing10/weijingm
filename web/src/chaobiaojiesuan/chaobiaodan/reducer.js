/**
 * @file chaobiaodanReducer
 * @author zlc <lichao9182@126.com>
 */
const initialState = {
  bengzhanlist:[],
  bengzus:[{ key: 0, text: '全部', value:'all' }],
  chaobiaodanlist:{"pageNo": 1,"pageSize": 20,"pageCount": 1,
                  "recordCount": 1,"data": []
                  },
  chaobiaodaninfo:{"waters": [],
                "groupTotal": {},
                "hourElectrics": []
              },
  chaobiaodanadd:{"waters": [],
                "groupTotal": {},
                "hourElectrics": []
              },
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'REQUESTE_BENGZHANLIST':
      {
        return Object.assign({}, state, {REQUESTE_BENGZHANLIST: 'start'});
      }
      case 'RECEIVE_BENGZHANLIST':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_BENGZHANLIST: action.data.errmsg?'start':'done'
            }
        )
      }
      case 'REQUESTE_BENGZULIST':
      {
        return Object.assign({}, state, {REQUESTE_BENGZULIST: 'start'});
      }
      case 'RECEIVE_BENGZULIST':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_BENGZULIST: action.data.errmsg?'start':'done'
            }
        )
      }
      case 'REQUESTE_CHAOBIAODANLIST':
      {
        return Object.assign({}, state, {REQUESTE_CHAOBIAODANLIST: 'start'});
      }
      case 'RECEIVE_CHAOBIAODANLIST':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_CHAOBIAODANLIST: action.data.errmsg?'start':'done'
            }
        )
      }

      case 'REQUESTE_CHAOBIAODANINFO':
      {
        return Object.assign({}, state, {REQUESTE_CHAOBIAODANINFO: 'start'});
      }
      case 'RECEIVE_CHAOBIAODANINFO':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_CHAOBIAODANINFO: action.data.errmsg?'start':'done'
            }
        )
      }
      case 'REQUESTE_CHAOBIAODANADD':
      {
        return Object.assign({}, state, {REQUESTE_CHAOBIAODANINFO: 'start'});
      }
      case 'RECEIVE_CHAOBIAODANADD':
      {
        return Object.assign(
            {},
            state,
            {
              ...action.data,
              REQUESTE_CHAOBIAODANINFO: action.data.errmsg?'start':'done'
            }
        )
      }


      default:
          return state
    }
}
