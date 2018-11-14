/**
 * @file libraryAction 设备库
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

 import axios from 'axios'
 import _ from 'lodash'
 import moment from 'moment'
 // import Cookies from 'universal-cookie'
 // const cookies = new Cookies();

 let request = (type, params) => {return {type, params}}
 let receive = (type, data) => {return {type, data}}

 // let apiPath = `http://49.4.94.245:8080/zl10/`
 // let apiPath = `http://49.4.94.245:8080/EnergyBureau.portal/`
 //
 // axios.defaults.headers.post['jsessionid'] ='eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0TGlzdCI6W3sidXVpZCI6IjA2NGNiZGYxLWM2MjItNDZlYS04Mjk3LWQzMTYwMWJjMDU4YiIsInByb2plY3ROYW1lIjoi5rK75rKZMjAwTVciLCJwcm9qZWN0Tm8iOiIyMDAxMDAwMSIsInByb2plY3REZXNjIjoi5rK75rKZMjAwTVciLCJjbG91ZCI6ImppZW5lbmciLCJhZGRyZXNzIjoi5YaF6JKZ5Y-k6YSC5bCU5aSa5pav5p2t6ZSm5peX54us6LS15aGU5ouJ6ZWHIiwiaW5zdGFsbGVkQ2FwYWNpdHkiOjIwMC4wLCJzdWJzdGF0aW9uTnVtIjpudWxsLCJhcGkiOm51bGwsInByb2plY3RTdGF0dXMiOjQsImxvbmdpdHVkZSI6MTA5Ljc4MTExLCJsYXRpdHVkZSI6MzkuNjI0ODYxLCJyZWdpb24iOiLlhoXokpnlj6QiLCJidWlsZGluZ1RpbWUiOiIyMDE1LTA5LTMwIiwiY29tcGxldGlvblRpbWUiOiIyMDE2LTA2LTE5In0seyJ1dWlkIjoiMjc5ZDM1MDYtYjkxOS00YTJlLWI0ZGMtZTlmMTJlMTFjMTQ2IiwicHJvamVjdE5hbWUiOiLkuIvoirHlm63nlLXnq5kiLCJwcm9qZWN0Tm8iOiIyMDA3MDAwMSIsInByb2plY3REZXNjIjoi5LiL6Iqx5Zut55S156uZIiwiY2xvdWQiOm51bGwsImFkZHJlc3MiOiLmsrPljJfnnIHlvKDlrrblj6PluILkuIvoirHlm63ljLrlrprmlrnmsLTkuaHlvpDlrrbnqpHmnZEiLCJpbnN0YWxsZWRDYXBhY2l0eSI6ODAuMCwic3Vic3RhdGlvbk51bSI6bnVsbCwiYXBpIjpudWxsLCJwcm9qZWN0U3RhdHVzIjoxLCJsb25naXR1ZGUiOjExNS41MjEwNjcsImxhdGl0dWRlIjo0MC40MjIyNDcsInJlZ2lvbiI6Iuays-WMlyIsImJ1aWxkaW5nVGltZSI6IjIwMTUtMDItMjgiLCJjb21wbGV0aW9uVGltZSI6IjIwMTgtMDgtMDkifSx7InV1aWQiOiIyYTFjNTM3ZS1lZTcwLTQ1MDYtODZmZi0yMzI0NjUyYzAyYWEiLCJwcm9qZWN0TmFtZSI6IuiDvea6kOWxgOekuuiMg-mhueebriIsInByb2plY3RObyI6IjIwMDQwMDAxIiwicHJvamVjdERlc2MiOiLog73mupDlsYDnpLrojIPpobnnm64iLCJjbG91ZCI6Imd1YW5nZnUiLCJhZGRyZXNzIjoi5YaF6JKZ5Y-k6YSC5bCU5aSa5pav5p2t6ZSm5peX54us6LS15aGU5ouJ6ZWH5LiD5pif5rmW5rKZ5ryg5pmv5Yy65YaFIiwiaW5zdGFsbGVkQ2FwYWNpdHkiOjAuNDUsInN1YnN0YXRpb25OdW0iOjMsImFwaSI6IkVuZXJneUJ1cmVhdS5wb3J0YWwiLCJwcm9qZWN0U3RhdHVzIjo0LCJsb25naXR1ZGUiOjEwOC41MzkwODcsImxhdGl0dWRlIjo0MC42NTI2OTgsInJlZ2lvbiI6IuWGheiSmeWPpCIsImJ1aWxkaW5nVGltZSI6IjIwMTYtMDktMzAiLCJjb21wbGV0aW9uVGltZSI6IjIwMTctMDgtMDkifSx7InV1aWQiOiIzMTdjNzBkOS1iZjkzLTQ4Y2UtYTY4OC00ZDU0NDRkMTUwODIiLCJwcm9qZWN0TmFtZSI6IuaAgOadpeeUteermSIsInByb2plY3RObyI6IjIwMDgwMDAxIiwicHJvamVjdERlc2MiOiLmgIDmnaXnlLXnq5kiLCJjbG91ZCI6bnVsbCwiYWRkcmVzcyI6Iuays-WMl-ecgeaAgOadpeWOv-ilv-WFq-mHjOmVh-ilv-WFq-mHjOadkSIsImluc3RhbGxlZENhcGFjaXR5Ijo3MC4wLCJzdWJzdGF0aW9uTnVtIjpudWxsLCJhcGkiOm51bGwsInByb2plY3RTdGF0dXMiOjEsImxvbmdpdHVkZSI6MTE0LjcyNzY4MywibGF0aXR1ZGUiOjQxLjE2ODUyNCwicmVnaW9uIjoi5rKz5YyXIiwiYnVpbGRpbmdUaW1lIjoiMjAxNS0wOC0yNSIsImNvbXBsZXRpb25UaW1lIjoiMjAxOC0wOC0wOSJ9LHsidXVpZCI6IjRmZGJkYzUwLTRmZjctNGJjYy05YzZhLWNhMzdmNTlkOGRhMSIsInByb2plY3ROYW1lIjoi5a6j5YyW55S156uZNjBNVyIsInByb2plY3RObyI6IjIwMDYwMDAxIiwicHJvamVjdERlc2MiOiLlrqPljJbnlLXnq5k2ME1XIiwiY2xvdWQiOm51bGwsImFkZHJlc3MiOiLmsrPljJfnnIHlvKDlrrblj6PluILlrqPljJbljLrkvq_lrrblupnkuaHliJjlrrbnqpHmnZEiLCJpbnN0YWxsZWRDYXBhY2l0eSI6NjAuMCwic3Vic3RhdGlvbk51bSI6bnVsbCwiYXBpIjpudWxsLCJwcm9qZWN0U3RhdHVzIjoxLCJsb25naXR1ZGUiOjExNS4yOTIyNSwibGF0aXR1ZGUiOjQwLjUwOTYzMSwicmVnaW9uIjoi5rKz5YyXIiwiYnVpbGRpbmdUaW1lIjoiMjAxNS0wNy0zMSIsImNvbXBsZXRpb25UaW1lIjoiMjAxOC0wOC0wOSJ9LHsidXVpZCI6IjZhODJmZTRkLTBlMGQtNGVhMy1iZDcxLTVlODNjZTQ5YTI1YSIsInByb2plY3ROYW1lIjoi5rKZ5pel5pitMTAwTVciLCJwcm9qZWN0Tm8iOiIyMDAzMDAwMSIsInByb2plY3REZXNjIjoi5rKZ5pel5pitMTAwTVciLCJjbG91ZCI6Imd1YW5nZnUiLCJhZGRyZXNzIjoi5YaF6JKZ5Y-k6YSC5bCU5aSa5pav5p2t6ZSm5peX54us6LS15aGU5ouJ6ZWH5bel5Lia5Zut5Yy6IiwiaW5zdGFsbGVkQ2FwYWNpdHkiOjEwMC4wLCJzdWJzdGF0aW9uTnVtIjo1MSwiYXBpIjoiemwxMDAiLCJwcm9qZWN0U3RhdHVzIjo0LCJsb25naXR1ZGUiOjEwOC44NzU2MTgsImxhdGl0dWRlIjozOS41ODA4MzEsInJlZ2lvbiI6IuWGheiSmeWPpCIsImJ1aWxkaW5nVGltZSI6IjIwMTQtMDYtMzAiLCJjb21wbGV0aW9uVGltZSI6IjIwMTUtMDEtMjQifSx7InV1aWQiOiI4NDk3YjUwMS1jMGE1LTQ1NjMtYWE2ZS04NWU4ODYzY2Q0ZjciLCJwcm9qZWN0TmFtZSI6Iuato-WIqTEwTVciLCJwcm9qZWN0Tm8iOiIyMDAyMDAwMSIsInByb2plY3REZXNjIjoi5q2j5YipMTBNVyIsImNsb3VkIjoiZ3VhbmdmdSIsImFkZHJlc3MiOiLlhoXokpnlj6TphILlsJTlpJrmlq_mna3plKbml5fni6zotLXloZTmi4nplYflt6XkuJrlm63ljLoiLCJpbnN0YWxsZWRDYXBhY2l0eSI6MTAuMCwic3Vic3RhdGlvbk51bSI6NSwiYXBpIjoiemwxMCIsInByb2plY3RTdGF0dXMiOjQsImxvbmdpdHVkZSI6MTA4LjcyNjAyOCwibGF0aXR1ZGUiOjQwLjEwNjI0NiwicmVnaW9uIjoi5YaF6JKZ5Y-kIiwiYnVpbGRpbmdUaW1lIjoiMjAxMy0xMS0zMCIsImNvbXBsZXRpb25UaW1lIjoiMjAxNC0xMS0xMCJ9LHsidXVpZCI6ImM5MDBlMWYwLTZkOTQtNGFmMi1iOGYwLTU0ZjliNWExY2ZmNiIsInByb2plY3ROYW1lIjoi5byg5YyX55S156uZIiwicHJvamVjdE5vIjoiMjAwOTAwMDEiLCJwcm9qZWN0RGVzYyI6IuW8oOWMl-eUteermSIsImNsb3VkIjpudWxsLCJhZGRyZXNzIjoi5rKz5YyX55yB5byg5a625Y-j5biC5byg5YyX5Y6_5bCP5LqM5Y-w6ZWHIiwiaW5zdGFsbGVkQ2FwYWNpdHkiOjUwLjAsInN1YnN0YXRpb25OdW0iOm51bGwsImFwaSI6bnVsbCwicHJvamVjdFN0YXR1cyI6NCwibG9uZ2l0dWRlIjoxMTQuNTk3MTc3LCJsYXRpdHVkZSI6NDEuMTQ5ODQsInJlZ2lvbiI6Iuays-WMlyIsImJ1aWxkaW5nVGltZSI6IjIwMTctMDItMjgiLCJjb21wbGV0aW9uVGltZSI6IjIwMTctMDYtMjkifSx7InV1aWQiOiJmZDc3NmE0NC1jZGVlLTRhYWMtOWQ5MS0zMjQzOGMzMjNhYmUiLCJwcm9qZWN0TmFtZSI6IuWuo-WMlueUteermTMwTVciLCJwcm9qZWN0Tm8iOiIyMDA1MDAwMSIsInByb2plY3REZXNjIjoi5a6j5YyW55S156uZMzBNVyIsImNsb3VkIjpudWxsLCJhZGRyZXNzIjoi5rKz5YyX55yB5byg5a625Y-j5biC5a6j5YyW5Y6_6aG-5a626JCl6ZWH5aSn5aCh5a2Q5p2RIiwiaW5zdGFsbGVkQ2FwYWNpdHkiOjMwLjAsInN1YnN0YXRpb25OdW0iOm51bGwsImFwaSI6bnVsbCwicHJvamVjdFN0YXR1cyI6MSwibG9uZ2l0dWRlIjoxMTUuMTEwMDAyLCJsYXRpdHVkZSI6NDAuNTg1MDY3LCJyZWdpb24iOiLmsrPljJciLCJidWlsZGluZ1RpbWUiOiIyMDE2LTA5LTMwIiwiY29tcGxldGlvblRpbWUiOiIyMDE4LTA4LTA5In1dLCJhZG1pbiI6MSwiaWQiOiI0NTRjMmU3NC03MzU5LTQ2NTMtOGZjOS1hNjExMTgyOTllM2IiLCJzdGF0ZSI6dHJ1ZSwidXJsIjoiaHR0cDovLzE4MC43Ni4xNjguOC9lY2xvdWQvZ2Z5L3BjL2hvbWUvIn0.GnNmY0avX_g1xlvWTPi45V1zpuK7YYpaPYhB13tuDfU';
 let projectApi = JSON.parse(sessionStorage.getItem("projectList"))
 let projectname = sessionStorage.getItem("projectname")
 let apiPath='http://49.4.94.245:8080/'
 if(projectname&&projectname!='undefined'){
   apiPath+=_.find(projectApi, ['projectName', projectname]).api?_.find(projectApi, ['projectName', projectname]).api:'';
 }
 apiPath += '/'
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
// http://49.4.94.245:8080/photovoltaic.portal/confTable/selectTableData
//let selectTableData = `${apiPath}confTable/selectTableData`
// {"tableName":"test1",columnNames:["c1","c2"],"pageRequest":{"page":{"pageSize":1,"pageNum":1}}}
/**
 * 获取设备库列表
 *
 * @param {all} params
 */

 // let selectTableColumn = `${apiPath}confTable/selectTableColumn`
 // {"tableName":"test1"}

 // http://49.4.94.245:8080/EnergyBureau.portal/dataInfo/spotData
 let spotData = `${apiPath}dataInfo/spotData`
// {"dateAndPointId":["2018-05-03 16:49:59#99", "P1m#97", "2018-05-02 16:51:59#99", "now#98"]}
// http://49.4.94.245:8080/EnergyBureau.portal/dataInfo/chartData
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
  projectApi = JSON.parse(sessionStorage.getItem("projectList"))
  projectname = sessionStorage.getItem("projectname")
  console.log(projectname)
  apiPath='http://49.4.94.245:8080/'
  if(projectname&&projectname!='undefined'){
    apiPath+=_.find(projectApi, ['projectName', projectname]).api?_.find(projectApi, ['projectName', projectname]).api:'';
  }
  apiPath += '/'

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

    res['status'] = 2
    res['msg'] = '请求数据中...'
    res['data'] = data
    dispatch(request(`GetPageConf_REQ_${pageName}`,res))

    try {
      //获取数据配置
      let dataconfPars = {"tableName":pageDataConfTable,
      	"selectConditionPo":[{"columnName":"page","logicalSymbol":"=","condition":`${pageName}`}]}
        let dataCfs= await axios.post(selectTableDataCondition, {...dataconfPars,...pageParams})
        res['data']['dataConfs'] = dataCfs.data.result[0]
        res['status']=dataCfs['status']
        res['msg']='请求页面配置成功'
        //debugger
        dispatch(receive(`GetPageConf_REC_${pageName}`,res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      res['status'] = 0
      res['msg'] = '请求页面配置失败，服务器无响应'
      dispatch(request(`GetPageConf_ERR_${pageName}`,res))
    }
  }
}


export function getPageData(pageName,data={},pageParams={},reLoading=false) {
  //pageParams:{d1:{pageRequest:{column:"time",order:"desc",page:{pageNum:1,pageSize:20,totalCount:155}}}} 仅仅针对表格排序和数量
  initApi()
  return async dispatch => {
    let res = {}
    res['msg'] = '请求数据中...'
    res['data'] = data
    if(reLoading) {res['status'] = 2,res['data']['status'] = 2}

    dispatch(request(`GetPageData_REQ_${pageName}`,res))
    res['msg']=''
    try {

      //@test
      let dataConfs = res['data']['dataConfs']
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
        res['msg']+=`获取${rPsKeys[i]}实时点成功;             `
        //readRealData['msg']+
        let lastDate = readRealData['data']['lastDate']

        sessionStorage.setItem('lastDate',lastDate)
        res['data'][rPsKeys[i]]['status'] =  readRealData.status

        if(readRealData.status==1){
              res['data'][rPsKeys[i]]['data']=rPs[i]['dateAndPointId'].map((item,i)=>(readRealData.data[item]))

        }
      }
      //获取曲线数据
      for(var i=0; i < cPs.length ; i++){
        let pagePars = {...cPs[i],...cPsTime[i],...cPsInerval[i],...pageParams}
        let readChartData =  await axios.post(chartData, {...cPs[i],...cPsTime[i],...cPsInerval[i]})
        res['data'][cPsKeys[i]]['status'] =  readChartData.status
        res['msg']+=`获取${cPsKeys[i]}曲线成功;             `
        // readChartData['msg']+'\n'

        if(readChartData.status==1){
              res['data'][cPsKeys[i]]['data']['result']=cPs[i]['aggregateAndPointIds'].map((item,i)=>(readChartData.data.result[item]))
              res['data'][cPsKeys[i]]['data']['dateList']=readChartData.data.dateList
        }
      }
      //获取表格数据
      for (var i = 0; i < tPs.length; i++) {
          res['data'][tPsKeys[i]]= await axios.post(selectTableDataCondition, {...tPs[i],...tPsCols[i],...tPsCons[i],...pageParams[tPsKeys[i]]})
          res['msg']+=`获取${tPsKeys[i]}表格成功;         `
          //res['data'][tPsKeys[i]]+'\n'
      }
      res['data']['status']=1
      dispatch(receive(`GetPageData_REC_${pageName}`,res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      res['status'] = 0
      res['data']['status'] = 0

      res['msg'] = '请求数据失败'
      dispatch(request(`GetPageData_ERR_${pageName}`,res))
    }
  }
}
export function operateTableData(pageName,opt,dataId,data={},dataParams={},pageParams={},reLoading=false) {
  initApi()
  return async dispatch => {
      let res = {}
      //debugger
      res['msg'] = '请求数据中...'
      res['data'] = data
      res['status'] =  2
      if(reLoading)
        {res['data'][dataId]['status'] =2}
      dispatch(request(`OPERATETABLE_REQ_${pageName}_${dataId}`,res))
      try {
          let dataConf = data['dataConfs'][dataId].split('@')
          let tPs ={}
          if(dataConf[1]){tPs['tableName']=dataConf[1]}
          if(dataConf[2]){tPs['columnNames']=dataConf[2].split(',')}
          tPs['type']=0
          let obj = dataParams

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
          res['status'] = optRes['status']
          res['msg'] = optRes['msg']
          dispatch(receive(`OPERATETABLE_REC_${pageName}_${dataId}`,res))
          //更新页面对应数据

           let resTd= await axios.post(selectTableDataCondition, {...tPs,...pageParams})
          res['data'][dataId] =resTd
          res['status'] = resTd['status']
          res['msg'] = resTd['msg']
          dispatch(receive(`GetPageData_REC_${pageName}_${dataId}`,res))
      }catch (err) {
        console.error('捕获到错误: ', err)
        res['status'] = 0
        res['msg'] = '操作失败,服务器无响应'
        res['data'][dataId]['status'] =0

        dispatch(receive(`OPERATETABLE_ERR_${pageName}_${dataId}`,res))
      }
    }

}
