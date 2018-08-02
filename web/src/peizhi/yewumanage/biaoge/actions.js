/**
 * @file libraryAction 设备库
 * @author zlc <lichao9182@126.com>
 */
 import axios from 'axios'
 import _ from 'lodash'
 import Cookies from 'universal-cookie'
 const cookies = new Cookies();
 import $ from 'jquery';

 let request = (type, params) => {return {type, params}}
 let receive = (type, data) => {return {type, data}}

 // let apiPath = `http://180.76.168.8:8080/zl10/`

 // let apiPath = `http://180.76.168.8:8080/EnergyBureau.portal/`

 let apiPath = `http://192.168.10.113:8080/btplatform/`
 let excelPath = `http://192.168.10.113:8080/btplatform/confTable/excel`

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
export function selectTableNameList(params) {
  initApi()
  return async dispatch => {

    // dispatch(request('REQUESTTABLENAMELIST', params))
    // let par =params?params: {"tableName":"table_info",columnNames:["uuid","TABLE_ENGLISH_NAME","table_chinese_name"]}
    let tablenames = []
    dispatch(request('REQ_selectTableNameList',{status: 2, errmsg: '请求表格列表中...'}))

    try {
      let tabeinfos = await axios.post(selectTableInfo, {})

      if (tabeinfos.data.result)
        tablenames = tabeinfos.data.result.map((item, i) => ({key: i, text: item.chineseName, value: item.englishName}))
      tablenames.push({key: tablenames.length, text: '新增', value: 'add'})
      let res = {
        status: 1,
        tablenames: tablenames,
        errmsg: ''
      }
      dispatch(receive('REC_selectTableNameList',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_selectTableNameList',{status: 0, errmsg: '请求失败,服务器无响应'}))
    }
  }
}

export function addNewTable(params) {
  initApi()
  return async dispatch => {
    dispatch(request('REQ_addNewTable',{status: 2, errmsg: '添加表格中...'}))
    try {
      let addRes = await axios.post(addTableConf, params)
      let res = {
        status: addRes.status,
        addRes: addRes.data,
        errmsg: addRes.msg
          ? addRes.msg
          : '添加成功'
      }
      dispatch('REC_addNewTable',receive(res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_addNewTable',{status: 0, errmsg: '添加表格失败'}))
    }
  }
}

export function modOldTable(params) {
  initApi()
  return async dispatch => {
    dispatch(request('REQ_modOldTable',{status: 2, errmsg: '修改表格中...'}))
    try {
      let modRes = await axios.post(updateTableConf, params)
      let res = {
        status: modRes.status,
        modRes: modRes.data,
        errmsg: modRes.msg
          ? modRes.msg
          : '修改成功'
      }
      dispatch(receive('REC_modOldTable',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_modOldTable',{status: 0, errmsg: '修改表格失败'}))
    }
  }
}

export function delOldTable(params) {
  initApi()
  return async dispatch => {

    dispatch(request('REQ_delOldTable',{status: 2, errmsg: '删除表格中...'}))
    try {
      let delRes = await axios.post(delTableConf, params)
      let res = {
        status: delRes.status,
        modRes: delRes.data,
        errmsg: delRes.msg
          ? delRes.msg
          : '修改成功'
      }
      dispatch(receive('REC_delOldTable',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_delOldTable',{status: 0, errmsg: '删除表格失败'}))
    }
  }
}


export function delOldTableColumn(params) {
  initApi()
  return async dispatch => {

    dispatch(request('REQ_delOldTableColumn',{status: 2, errmsg: '删除表格列信息中...'}))
    try {
      let delColRes = await axios.post(deleteColumn, params)
      let res = {
        status: delColRes.status,
        delColRes: delColRes.data,
        errmsg: delColRes.msg
          ? delColRes.msg
          : '修改成功'
      }

      dispatch(receive('REC_delOldTableColumn',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_delOldTableColumn',{status: 0, errmsg: '删除表格列信息失败'}))
    }
  }
}


export function addOldTableColumn(params) {
  initApi()
  return async dispatch => {

    dispatch(request('REQ_addOldTableColumn',{status: 2, errmsg: '添加表格列信息中...'}))
    try {
      let addColRes = await axios.post(addColumns, params)
      let res = {
        status: addColRes.status,
        addColRes: addColRes.data,
        errmsg: addColRes.msg
          ? addColRes.msg
          : '修改成功'
      }
      dispatch(receive('REC_addOldTableColumn',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_addOldTableColumn',{status: 0, errmsg: '添加表格列信息失败'}))
    }
  }
}



export function selectColumnList(tablename) {
  initApi()
  return async dispatch => {
    dispatch(request('REQ_selectColumnList',{status: 2, errmsg: '请求表格列数据中...'}))
    try {
      let params = {
        "tableName": `${tablename}`
      }
      let table_infos = await axios.post(selectTableColumnInfo, params)
      let table_column_info = table_infos.data.result.sort((a, b) => (parseInt(a.serialNumber) - parseInt(b.serialNumber)))
      let res = {
        status: table_column_info.status,
        table_column_info: table_column_info,
        errmsg: ''
      }
      dispatch(receive('REC_selectColumnList',res))
    } catch (err) {
      console.error('捕获到错误: ', err)
      dispatch(receive('REC_selectColumnList',{status: 0, table_column_info: [], errmsg: '请求表格配置失败'}))
    }
  }
}

export function uploadExcel(data,file) {
    let res = {}
    res['status'] = 2
    res['errmsg'] = '上传表格中...'
    

    return async dispatch => {
        dispatch(request('REQUESTPCUPLOADIMG', res))
        try {
          let param = new FormData()  // 创建form对象
          param.append('excelFile', file, file.name)  // 通过append向form对象添加数据
          param.append('chunk', '0') // 添加form表单中其他数据
          var settings = {
          "async": true,
          "crossDomain": true,
          "url": excelPath,
          "method": "POST",
          "processData": false,
          "contentType": false,
          "mimeType": "multipart/form-data",
          "data": param
        }

        await $.ajax(settings).done(function (response) {
          console.log(response);
          let resp = JSON.parse(response)
          res['status'] = resp.resultCode==0?1:0
          res['errmsg'] = resp.resultMessage
        });
        dispatch(receive('RECEIVEPCUPLOADIMG', res));
        }
        catch (err) {
            console.error('捕获到错误: ', err)
            res['status'] = 0
            res['errmsg'] = '上传表格失败！！'
            dispatch(receive('REQUESTPCUPLOADIMG', res))
        }
    }
}
