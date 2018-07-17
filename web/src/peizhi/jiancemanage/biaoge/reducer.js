


const initialState = {
  tablenames:  [{key:0,value:'peizhi_yemian',text:'逆变器型号库2'}],
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
