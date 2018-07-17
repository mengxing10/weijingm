
const initialState = {
  // jiancedata:{pagename:'jiance_zonglan',status:2,
  //      //工艺达标率 累计运行时间  达标运行时间
  //     d1:{data:[0,1,2],status:2},
  //     //工艺达标率
  //     d2:{data:[1,2,3,4,5,6,7,8,9,10],status:2},
  //     //健康达标率
  //     d3:{data:[1,2,3,4,5,6,7,8,9,10],status:2},
  //     //吨水能耗
  //     d4:{data:[0,1,2],status:2},
  //     //吨水能耗达标率
  //     d5:{data:[1,2,3,4,5,6,7,8,9,10],status:2},
  //     //吨钢水耗
  //     d6:{data:[1,2,3,4],status:2},
  //
  //     d7:{data:[1,1,1,1,1,0,0,0],status:2},



      //报警信息



  // },
}
export default function reducer(state=initialState, action) {
  let pagename = action.type.split("_")[3]
    switch (pagename) {
        case "jiankong":
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
