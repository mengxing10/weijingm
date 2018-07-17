


const initialState = {
  tablenames:  [{key:0,value:'company',text:'客户公司'}],
  table_column_info:[],
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
          return Object.assign(
              {},
              state,
              {
                ...action.data,
              }
      )
    }
}
