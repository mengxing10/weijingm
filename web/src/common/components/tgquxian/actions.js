/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import _ from 'lodash'

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
let pageDataConfTable = 'peizhi_quxian_28'//`${pageDataConfTable}`




/**
 * 获取测点
 *
 * @param {all} params
 */
export function getDataName(params) {
    return async dispatch => {
        dispatch(request('REQUEST_GETDATANAME', params))
        // params={"tableName":"test1",columnNames:["c1","c2"],"pageRequest":{"page":{"pageSize":1,"pageNum":1}}}
        try {
            let datatypes = await axios.post(selectTableDataCondition, params)
            //let datas = datatypes.data.result.map(item=>({id:item.xuhao,key:item.pointid,name:item.pointtext}))
            let res ={dataname:datatypes.data.result[0]['pointtext'],REQUEST_GETDATANAME: datatypes.data.errmsg?'start':'done'}
            dispatch(receive('RECEIVE_GETDATANAME', res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)
            alert('获取数据点名字失败，请检查网络！')
            //dispatch(receive(RECEIVEDATATYPES, {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取新曲线数据
 *
 * @param {all} params
 */
export function getNewCurves(params) {
    return async dispatch => {
        dispatch(request('REQUEST_GETNEWCURVES', params))
        try {
            let data = await axios.post(chartData, params);
            debugger
            let curves= {time:data.data.dateList,value:data.data.result[params.aggregateAndPointIds[0]]}
            let res ={curves:curves,REQUEST_GETNEWCURVES: data.data.errmsg?'start':'done'}
            dispatch(receive('RECEIVE_GETNEWCURVES', res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)
            alert('获取曲线失败！请检查网络！')
            //dispatch(receive(RECEIVECURVES, {status: 2, errmsg: '数据错误'}))
        }
    }
}
