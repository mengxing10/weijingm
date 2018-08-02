/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */

export const apiServer = window.apiPath;



export const API ={
    hisData:`${apiServer}conmoncontroller/getCurveData`,
    realData:`${apiServer}conmoncontroller/getRealData`,
    repData:`${apiServer}reportform/selectReportForm`,
}

export const POINTID ={
    real:[],
    hisHour:[1,2,3],
    hisDay:[1,2,3],
    hisMonth:[1,2,3],
    hisYear:[1,2,3],
  
    repHour:[1,2,3],
    repDay:[1,2,3],
    repWeek:[1,2,3],
    repMonth:[1,2,3],
    repYear:[1,2,3],

}
