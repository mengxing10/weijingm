/**
 * @file libraryAction 设备库
 * @author zlc <lichao9182@126.com>
 */

 import axios from 'axios'
 import _ from 'lodash'
 import moment from 'moment'
 import Cookies from 'universal-cookie'
 const cookies = new Cookies();

 let request = (type, params) => {return {type, params}}
 let receive = (type, data) => {return {type, data}}


 let apiPath = `http://39.106.150.90:8080/baogang/`

let deleteTableData = `${apiPath}confTable/deleteTableData`
//{"tableName":"test1","uuid":"d4c8a909-1a80-4d21-9c6f-4126a34f43ab"}
let updateTableData = `${apiPath}confTable/updateTableData`
//"tableName":"test1","object":{"uuid":"0cbcb40a-6747-41a5-972d-a6945a51037f","c1":"大法师法水电费第三方_之修改","c4":1113.20}}
let addTableData = `${apiPath}confTable/addTableData`
// {"tableName":"test1","object":{"c1":"大法师法水电费第三方","c4":3.20}}


let selectTableColumn = `${apiPath}confTable/selectTableColumn`
// {"tableName":"test1"}
let selectTableDataCondition = `${apiPath}confTable/selectTableDataCondition`
//
// {
// 	"tableName":"test1",
// 	"selectConditionPo":[
// 	{"columnName":"c1","logicalSymbol":"like","condition":"%大法师%"},
// 	{"columnName":"c4","logicalSymbol":">","condition":"3.2"}
// ]
// }
// http://180.76.168.8:8080/photovoltaic.portal/confTable/selectTableData
//let selectTableData = `${apiPath}confTable/selectTableData`
// {"tableName":"test1",columnNames:["c1","c2"],"pageRequest":{"page":{"pageSize":1,"pageNum":1}}}
/**
 * 获取设备库列表
 *
 * @param {all} params
 */

 // let selectTableColumn = `${apiPath}confTable/selectTableColumn`
 // {"tableName":"test1"}

 // http://180.76.168.8:8080/EnergyBureau.portal/dataInfo/spotData
 let spotData = `${apiPath}dataInfo/spotData`
// {"dateAndPointId":["2018-05-03 16:49:59#99", "P1m#97", "2018-05-02 16:51:59#99", "now#98"]}
// http://180.76.168.8:8080/EnergyBureau.portal/dataInfo/chartData
let chartData = `${apiPath}dataInfo/chartData`
//{"aggregateAndPointIds":["max#15","min#25","avg#35","last#45","first#55"],"startDate":"2018-05-03 15:00:00","endDate":"2018-05-03 17:00:00","interval":"10m"}
let pageDataConfTable = 'peizhi_yemian'//`${pageDataConfTable}`
let defTime = {
 today : {startDate:moment().startOf('day').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
 thisMonth:{startDate:moment().startOf('month').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
 thisYear :  {startDate:moment().startOf('year').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
 thisHour :  {startDate:moment().startOf('hour').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
 thisWeek :  {startDate:moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') }
}

function initApi(){

  deleteTableData = `${apiPath}confTable/deleteTableData`
  updateTableData = `${apiPath}confTable/updateTableData`
  addTableData = `${apiPath}confTable/addTableData`
  selectTableColumn = `${apiPath}confTable/selectTableColumn`
  selectTableDataCondition = `${apiPath}confTable/selectTableDataCondition`
  spotData = `${apiPath}dataInfo/spotData`
  chartData = `${apiPath}dataInfo/chartData`
  pageDataConfTable = 'peizhi_yemian'//`${pageDataConfTable}`
  defTime = {
  today : {startDate:moment().startOf('day').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
  thisMonth:{startDate:moment().startOf('month').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
  thisYear :  {startDate:moment().startOf('year').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
  thisHour :  {startDate:moment().startOf('hour').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') },
  thisWeek :  {startDate:moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:SS'),endDate:moment().format('YYYY-MM-DD HH:mm:SS') }

 }
}



export function getPageConf(pageName,data={},pageParams={}) {
  initApi()
  return async dispatch => {
    let res = {}

    res['jiancestatus'] = 2
    res['jiancemsg'] = '请求数据中...'
    res['jiancedata'] = data
    
    dispatch(request(`GetPageConf_REQ_${pageName}`,res))

    try {
      //获取数据配置
      let dataconfPars = {"tableName":pageDataConfTable,
      	"selectConditionPo":[{"columnName":"page","logicalSymbol":"=","condition":`${pageName}`}]}
        let dataCfs= await axios.post(selectTableDataCondition, {...dataconfPars,...pageParams})
        res['jiancedata']['dataConfs'] = dataCfs.data.result[0]
        res['jiancestatus']=dataCfs['status']
        res['jiancemsg']='请求页面配置成功'
        dispatch(receive(`GetPageConf_REC_${pageName}`,res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      res['jiancestatus'] = 0
      res['jiancemsg'] = '请求页面配置失败，服务器无响应'
      dispatch(request(`GetPageConf_REC_${pageName}`,res))
    }
  }
}


export function getPageData(pageName,data={},pageParams={},reLoading=false) {
  //pageParams:{d1:{pageRequest:{column:"time",order:"desc",page:{pageNum:1,pageSize:20,totalCount:155}}}} 仅仅针对表格排序和数量
  initApi()
  return async dispatch => {
    let res = {}
    res['jiancemsg'] = '请求数据中...'
    res['jiancedata'] = data
    if(reLoading) {res['jiancestatus'] = 2,res['jiancedata']['status'] = 2}
    dispatch(request(`GetPageData_REQ_${pageName}`,res))
    res['jiancemsg']=''
    try {

      //@test
      let dataConfs = res['jiancedata']['dataConfs']
      let confKeys =[]
      let confDatas = []
      let i =0
      for (var key in dataConfs) {
        if(key.indexOf('d')==0&&dataConfs[key]){
          confKeys[i] = key
          confDatas[i] =dataConfs[key]
          i++

        }
      }
      let rPsKeys =[]   //数据点key值保存  d1 d2 d3
      let rPs =[]    //数据点id参数   "dateAndPointId":["2018-05-03 16:49:59#99", "P1m#97", "2018-05-02 16:51:59#99", "now#98"]

      let cPsKeys = []  //曲线key值保存  d1 d2 d3
      let cPs =[]    //曲线数据ID参数    "aggregateAndPointIds":["max#15","min#25","avg#35","last#45","first#55"]
      let cPsTime =[] //曲线时间参数  "startDate":"2018-05-03 15:00:00","endDate":"2018-05-03 17:00:00"
      let cPsInerval =[] //曲线时间间隔参数  "interval":"10m"

      let tPsKeys = []   //表格key保存  d1 d2  d3
      let tPs = []    //表格名称参数  "tableName":"test1",
      let tPsCols = []  //表格列名参数    columnNames:["c1","c2"]
      let tPsCons = []  //表格查询条件参数 	"selectConditionPo":[{"columnName":"c1","logicalSymbol":"like","condition":"%大法师%"},
        // 	{"columnName":"c4","logicalSymbol":">","condition":"3.2"}]
      //R@time#pointid,time#pointid
      //H@max#pointid,avg#pointid@starttime,stoptime
      //T@tableName@columnName,columnName@{condintion}
      let tIndex = 0
      let rIndex = 0
      let cIndex = 0
      for (var i = 0; i < confDatas.length; i++) {
        const confDt = confDatas[i].split('@')

        switch (confDt[0]) {
          case 'R':
            rPs.push({dateAndPointId:confDt[1].split(',').map(item=>item.replace(/\s+/g,""))})
            rPsKeys[rIndex] =confKeys[i]
            rIndex++
          break;
          case 'C':  //C@MAX#12,MAX#13@today@1h   //今日12 13数据的分时曲线 取最大值
            cPs.push({aggregateAndPointIds:confDt[1].split(',').map(item=>item.replace(/\s+/g,""))})
            cPsKeys[cIndex] =confKeys[i]
            if(confDt[2]){cPsTime.push(defTime[confDt[2].replace(/\s+/g,"")])}else{cPsTime.push(defTime['today'])}
            if(confDt[3]){cPsInerval.push({interval:confDt[3].replace(/\s+/g,"")})}else{cPsInerval.push({interval:'1h'})}
            cIndex++
          break;
          case 'T': //T@jiance_nibianqi@c1,c2,c3@c1,>,0;c2,>,0
            tPs.push({tableName:confDt[1]})
            tPsKeys[tIndex] =confKeys[i]
            tIndex++
            if(confDt[2]){tPsCols.push({columnNames:confDt[2].split(',')})}
            if(confDt[3]){
              tPsCons.push({selectConditionPo:confDt[3].split(';').map(item=>{
                let itemArr = item.split(',')
                return {"columnName":itemArr[0].replace(/\s+/g,""),
                  "logicalSymbol":itemArr[1].replace(/\s+/g,""),
                  "condition":itemArr[2].replace(/\s+/g,"")}
                }
              )})
            }

          break;
          default:
        }
      }

      //获取数据点数据
      for(var i=0; i < rPs.length ; i++){

        let readRealData =  await axios.post(spotData, rPs[i])
        if(readRealData.status==1){
          res['jiancemsg']+=`获取${rPsKeys[i]}实时点成功;             `
          let lastDate = readRealData['data']['lastDate']


          sessionStorage.setItem('lastDate',lastDate)
        }
        //readRealData['msg']+
        res['jiancedata'][rPsKeys[i]]['status'] =  readRealData.status

        if(readRealData.status==1){
              res['jiancedata'][rPsKeys[i]]['data']=rPs[i]['dateAndPointId'].map((item,i)=>(readRealData.data[item]))

        }
      }
      //获取曲线数据
      for(var i=0; i < cPs.length ; i++){
        let pagePars = {...cPs[i],...cPsTime[i],...cPsInerval[i],...pageParams}
        let readChartData =  await axios.post(chartData, {...cPs[i],...cPsTime[i],...cPsInerval[i]})
        res['jiancedata'][cPsKeys[i]]['status'] =  readChartData.status
        res['jiancemsg']+=`获取${cPsKeys[i]}曲线成功;             `
        // readChartData['msg']+'\n'

        if(readChartData.status==1){
              res['jiancedata'][cPsKeys[i]]['data']['result']=cPs[i]['aggregateAndPointIds'].map((item,i)=>(readChartData.data.result[item]))
              res['jiancedata'][cPsKeys[i]]['data']['dateList']=readChartData.data.dateList
        }
      }
      //获取表格数据
      for (var i = 0; i < tPs.length; i++) {
          res['jiancedata'][tPsKeys[i]]= await axios.post(selectTableDataCondition, {...tPs[i],...tPsCols[i],...tPsCons[i],...pageParams[tPsKeys[i]]})
          res['jiancemsg']+=`获取${tPsKeys[i]}表格成功;         `
          //res['jiancedata'][tPsKeys[i]]+'\n'
      }
      res['jiancedata']['status']=1
      dispatch(receive(`GetPageData_REC_${pageName}`,res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      res['jiancestatus'] = 0
      res['jiancedata']['status'] = 0

      res['jiancemsg'] = '请求数据失败'
      dispatch(request(`GetPageData_REQ_${pageName}`,res))
    }
  }
}
export function operateTableData(pageName,opt,dataId,data={},dataParams={},pageParams={},reLoading=false) {
  initApi()
  return async dispatch => {
      let res = {}

      res['jiancemsg'] = '请求数据中...'
      res['jiancedata'] = data
      res['jiancestatus'] =  2
      if(reLoading)
        {res['jiancedata'][dataId]['status'] =2}
      dispatch(request(`GetPageData_REQ_${pageName}_${dataId}`,res))
      try {
          let dataConf = data['dataConfs'][dataId].split('@')
          let tPs ={}
          if(dataConf[1]){tPs['tableName']=dataConf[1]}
          if(dataConf[2]){tPs['columnNames']=dataConf[2].split(',')}
          tPs['type']=0
          let obj = {object:dataParams}

          let optRes ={}
          switch (opt) {
            case 'del':
              optRes = await axios.post(deleteTableData, {...tPs,...obj})
              break;
            case 'add':
              optRes=await axios.post(addTableData, {...tPs,...obj})
              break;
            case 'mod':
              optRes = await axios.post(updateTableData, {...tPs,...obj})
              break;
            default:
          }
          res['jiancestatus'] = optRes['status']
          res['jiancemsg'] = optRes['msg']
          dispatch(receive(`GetPageData_REC_${pageName}_${dataId}`,res))
          //更新页面对应数据

           let resTd= await axios.post(selectTableDataCondition, {...tPs,...pageParams})
          res['jiancedata'][dataId] =resTd
          res['jiancestatus'] = resTd['status']
          res['jiancemsg'] = resTd['msg']
          dispatch(receive(`GetPageData_REC_${pageName}_${dataId}`,res))
      }catch (err) {
        console.error('捕获到错误: ', err)
        res['jiancestatus'] = 0
        res['jiancemsg'] = '操作失败,服务器无响应'
        res['jiancedata'][dataId]['status'] =0

        dispatch(receive(`GetPageData_REC_${pageName}_${dataId}`,res))
      }
    }

}
