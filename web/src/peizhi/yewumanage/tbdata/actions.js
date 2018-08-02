/**
 * @file libraryAction 设备库
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import _ from 'lodash'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

// let apiPath = `http://180.76.168.8:8080/zl10/`
// let apiPath = `http://180.76.168.8:8080/EnergyBureau.portal/`
let apiPath = `http://192.168.10.113:8080/btplatform/`
let deleteTableData = `${apiPath}confTable/deleteTableData`
//{"tableName":"test1","uuid":"d4c8a909-1a80-4d21-9c6f-4126a34f43ab"}
let updateTableData = `${apiPath}confTable/updateTableData`
//"tableName":"test1","object":{"uuid":"0cbcb40a-6747-41a5-972d-a6945a51037f","c1":"大法师法水电费第三方_之修改","c4":1113.20}}
let addTableData = `${apiPath}confTable/addTableData`
// {"tableName":"test1","object":{"c1":"大法师法水电费第三方","c4":3.20}}
let selectTableColumn = `${apiPath}confTable/selectTableColumn`
// {"tableName":"test1"}
let addTableConf = `${apiPath}confTable/addTableConf`
//{"tableInfo":{"chineseName":"测试表1","englishName":"test1"},"tableColumnInfos":[
// {"columnChineseName":"列1","columnEnglishName":"c1","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":1},
// {"columnChineseName":"列2","columnEnglishName":"c2","isDel":"0","columnType":"double","contentLength":100,"serialNumber":2},
// {"columnChineseName":"列3","columnEnglishName":"c3","isDel":"0","columnType":"timestamp","contentLength":100,"serialNumber":3},
// {"columnChineseName":"列4","columnEnglishName":"c4","isDel":"0","columnType":"double","contentLength":100,"serialNumber":4},
// {"columnChineseName":"列5","columnEnglishName":"c5","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":5},
// {"columnChineseName":"列6","columnEnglishName":"c6","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":6},
// {"columnChineseName":"列7","columnEnglishName":"c7","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":7},
// {"columnChineseName":"列8","columnEnglishName":"c8","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":8},
// {"columnChineseName":"列9","columnEnglishName":"c9","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":9},
// {"columnChineseName":"列10","columnEnglishName":"c10","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":10}
// ]}
let updateTableConf = `${apiPath}confTable/updateTableConf`

//{"tableInfo":{"id":"7d39fd1c-cb5c-4d36-90a2-7c0267eec195","chineseName":"测试表修改"},"tableColumnInfos":[
// {"columnChineseName":"列1","columnEnglishName":"c1","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":1},
// 	{"columnChineseName":"列2","columnEnglishName":"c2","isDel":"0","columnType":"double","contentLength":100,"serialNumber":2},
// 	{"columnChineseName":"列3","columnEnglishName":"c3","isDel":"0","columnType":"timestamp","contentLength":100,"serialNumber":3},
// 	{"columnChineseName":"列4","columnEnglishName":"c4","isDel":"0","columnType":"double","contentLength":100,"serialNumber":4},
// 	{"columnChineseName":"列5","columnEnglishName":"c5","isDel":"0","columnType":"integer","contentLength":100,"serialNumber":5},
// 	{"columnChineseName":"列6","columnEnglishName":"c6","isDel":"0","columnType":"date","contentLength":100,"serialNumber":6},
// 	{"columnChineseName":"新增的列6","columnEnglishName":"c8","isDel":"0","columnType":"date","contentLength":100,"serialNumber":8},
// 	{"columnChineseName":"列7","columnEnglishName":"c7","isDel":"0","columnType":"time","contentLength":100,"serialNumber":7}
// 	]}

//http://180.76.168.8:8080/photovoltaic.portal/confTable/selectTableDataCondition
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
let selectTableData = `${apiPath}confTable/selectTableData`
// {"tableName":"test1",columnNames:["c1","c2"],"pageRequest":{"page":{"pageSize":1,"pageNum":1}}}
// http://180.76.168.8:8080/photovoltaic.portal/confTable/selectTableInfo
let selectTableInfo = `${apiPath}confTable/selectTableInfo`
// http://180.76.168.8:8080/photovoltaic.portal/confTable/selectTableColumnInfo
let selectTableColumnInfo = `${apiPath}confTable/selectTableColumnInfo`

let delTableConf = `${apiPath}confTable/delTableConf`
// {"tableName":表英文名称}

let  deleteColumn = `${apiPath}confTable/deleteColumn`
//{"tableName":表英文名,"columnEnglishName":列英文名}

let addColumns = `${apiPath}confTable/addColumns`
// {
// 	"tableName": 英文表名,
// 	"tableColumnInfos": [{
// 			"columnChineseName": 列中文名,
// 			"columnEnglishName": 列英文名,
// 			"isDel":是否删除(暂未用到)
// 			"columnType": 列数据类型varchar、double、integer、timestamp、date、time
// 			"contentLength": 数据长度
// 			"serialNumber": 排序序号
// 		}
// 	]
// }
function initApi(){
  selectTableInfo = `${apiPath}confTable/selectTableInfo`
  deleteTableData = `${apiPath}confTable/deleteTableData`
  updateTableData = `${apiPath}confTable/updateTableData`
  addTableData = `${apiPath}confTable/addTableData`
  selectTableColumn = `${apiPath}confTable/selectTableColumn`
  addTableConf = `${apiPath}confTable/addTableConf`
  updateTableConf = `${apiPath}confTable/updateTableConf`
  selectTableDataCondition = `${apiPath}confTable/selectTableDataCondition`
  selectTableData = `${apiPath}confTable/selectTableData`
  selectTableInfo = `${apiPath}confTable/selectTableInfo`
  selectTableColumnInfo = `${apiPath}confTable/selectTableColumnInfo`
  delTableConf = `${apiPath}confTable/delTableConf`
  deleteColumn = `${apiPath}confTable/deleteColumn`
  addColumns = `${apiPath}confTable/addColumns`

}
/**
 * 获取设备库列表
 *
 * @param {all} params
 */
export function selectTableNameList(data={}) {

  return async dispatch => {
    initApi()
    // dispatch(request('REQUESTTABLENAMELIST', params))
    // let par =params?params: {"tableName":"table_info",columnNames:["uuid","TABLE_ENGLISH_NAME","table_chinese_name"]}
    let res = {}
    res['status'] =2
    res['msg'] = '请求表格列表中...'
    res['data'] = data
    res['data']['tablenames'] = []
    res['data']['table'] = {}

    res['data']['dataConfs'] ={}
    dispatch(request('TBDATAGUANLINAMES',res))

    try {
      let tabeinfos = await axios.post(selectTableInfo, {})
      res['status'] =tabeinfos['status']
      res['msg'] =tabeinfos['msg']
      if (tabeinfos.data.result){
        res['data']['tablenames'] = tabeinfos.data.result.map((item, i) => ({key: i, text: item.chineseName, value: item.englishName ,type:item.type}))
      }
      res['status'] =1
      res['data']['tablenames']['status'] =1
      dispatch(receive('TBDATAGUANLINAMES',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      res['status'] =0
      res['data']['tablenames']['status'] =0
      res['msg'] ='请求失败,服务器无响应'
      dispatch(receive('TBDATAGUANLINAMES',res))
    }
  }
}

export function operateTableData(pageName,type,opt,data={table:{}},dataParams={},pageParams={},updateStatus=true) {
  initApi()
  return async dispatch => {
      let res = {}

      res['data'] = data
      res['status'] =  2
      res['msg'] = '请求数据中...'
      if(updateStatus){
        res['data']['table']['status'] =2
      }
      dispatch(request(`${pageName}_${opt}_req`,res))
      
      try {
          let tPs ={}
          let obj ={}
          tPs['tableName']=pageName
          tPs['type']=type

          obj['object']=dataParams
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
          res['status'] = optRes['resultCode']==0?1:0
          res['msg'] = optRes['resultMessage']
          dispatch(receive(`${pageName}_${opt}_rec`,res))
          //更新页面对应数据
           let resTd= await axios.post(selectTableDataCondition, {...tPs,...pageParams})

          res['data']['table'] =resTd
          res['status'] = resTd['resultCode']==0?1:0
          res['msg'] = resTd['resultMessage']
          dispatch(receive(`${pageName}_sel_rec`,res))
      }catch (err) {
        console.error('捕获到错误: ', err)
        res['status'] = 0
        res['msg'] = '操作失败,服务器无响应'
        res['data']['table']['status'] =0

        dispatch(receive(`${pageName}_${opt}_err`,res))
      }
    }

}
