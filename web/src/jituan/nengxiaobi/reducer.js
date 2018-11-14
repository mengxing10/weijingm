
const initialState = {
  jienenglvpeizhi:{result:{page:{pageNum:1,pageCount:1}}},
  realData:{"dbdsData":[],"jnlData":[],"jnlvData":[],"zylvData":[],conf:[],b_yxscData:[]},
}
export default function reducer(state=initialState, action) {
  let pagename = action.type.split("_")[3]
  pagename = action.type.split("_")[4]?pagename+"_"+action.type.split("_")[4]:pagename
  let obj ={}
    switch (pagename) {
      case "fenxi_jienenglv":
        return Object.assign(
            {},
            state,
            {
              ...action.data,
            }
      )
      case "FENXIDATA_JIENENGLV":
        return Object.assign(
            {},
            state,
            {
              ...action.data,
            }
      )
      default:
          return state
    }
}
