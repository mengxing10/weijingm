/**
 * @file homeAction home
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import _ from 'lodash'

let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}


let apiPath = `http://118.190.44.91:8080/hangang/`
//let apiPath = `http://192.168.30.140:8080/EnergyBureau.portal/`

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



let tableName = "peizhi_fenxi_jienenglv"


/**
 * 获取测点
 *
 * @param {all} params {pag}
 */
export function getJienenglvPeiZhi(page) {
    return async dispatch => {
        dispatch(request(`GetPageConf_REQ_${tableName}`, page))
        // params={"tableName":"test1",columnNames:["c1","c2"],"pageRequest":{"page":{"pageSize":1,"pageNum":1}}}
        try {
            let params = {"tableName":tableName,"pageRequest":{column:"bianhao",order:"asc","page":page}}
            let result = await axios.post(selectTableDataCondition, params)
            //let datas = datatypes.data.result.map(item=>({id:item.xuhao,key:item.pointid,name:item.pointtext}))
            let jienenglvpeizhi ={}
            jienenglvpeizhi['name'] = ['b_dbds','b_yxsc']
            jienenglvpeizhi['pointeIds'] = jienenglvpeizhi['name'].map(item=>{
              return (result.data.result.map(item2=>(item2[item])))
            })
            jienenglvpeizhi['conf'] = result.data.result
            jienenglvpeizhi['result'] = result.data
            let res ={jienenglvpeizhi:jienenglvpeizhi,REQUEST_GETYUNXINGPEIZHI: result.data.errmsg?'start':'done'}
            dispatch(receive(`GetPageConf_REC_${tableName}`, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)
            //alert('获取节能率配置失败，请检查网络！')
            dispatch(receive('GetPageConf_ERR_${tableName}', {status: 2, errmsg: '数据错误'}))
        }
    }
}





/**
 * 获取新曲线数据
 *
 * @param {all} params
 * //{"aggregateAndPointIds":["max#15","min#25","avg#35","last#45","first#55"],"startDate":"2018-05-03 15:00:00",
 * "endDate":"2018-05-03 17:00:00","interval":"10m"}
 */
export function getJienenglvFenXiData(params) {
    return async dispatch => {
        dispatch(request(`GetPageData_REQ_PEIZHI_FENXIDATA_JIENENGLV`, params))
        try {

            //作业率
            let zylPars = {}
            let zylPointIdStart =[]
            let zylPointIdStop =[]
            params['pointeIds'][1].forEach(item=>{
              zylPointIdStart.push(`${params['startDate'].format('YYYY-MM-DD HH:mm:ss')}${item}`)
              zylPointIdStop.push(`${params['endDate'].format('YYYY-MM-DD HH:mm:ss')}${item}`)
            })
            let zylDataConf = {}
            params['pointeIds'][1].forEach((item,i)=>{
              zylDataConf[item]=[zylPointIdStart[i],zylPointIdStop[i]];
            })
            zylPars["dateAndPointId"] = zylPointIdStart.concat(zylPointIdStop)
            let zylrealResult = await axios.post(spotData, zylPars);//电表读数
            let timeIntervalHour = (params['endDate'].toDate().getTime()-params['startDate'].toDate().getTime())/1000/3600
            let zylvData = []
            let b_yxscData = []
            params['pointeIds'][1].forEach((item,i)=>{
              let yxsc1 = zylrealResult.data[zylDataConf[item][1]]>0?zylrealResult.data[zylDataConf[item][1]]:'NaN';
              let yxsc0 = zylrealResult.data[zylDataConf[item][0]]>0?zylrealResult.data[zylDataConf[item][0]]:'NaN';
              let yxsc=yxsc1-yxsc0
              yxsc = yxsc/3600000
              zylvData[i] = yxsc/timeIntervalHour*100
              b_yxscData.push(yxsc)
            })

            //电表读数
            let dbdsPars = {}
            let dbdsPointIdStart =[]
            let dbdsPointIdStop =[]
            params['pointeIds'][0].forEach(item=>{
              dbdsPointIdStart.push(`${params['startDate'].format('YYYY-MM-DD HH:mm:ss')}${item}`)
              dbdsPointIdStop.push(`${params['endDate'].format('YYYY-MM-DD HH:mm:ss')}${item}`)
            })
            let dbdsDataConf = {}
            params['pointeIds'][0].forEach((item,i)=>{
              dbdsDataConf[item]=[dbdsPointIdStart[i],dbdsPointIdStop[i]];
            })
            dbdsPars["dateAndPointId"] = dbdsPointIdStart.concat(dbdsPointIdStop)
            let dbdsrealResult = await axios.post(spotData, dbdsPars);//电表读数

            let dbdsData =[]
            let jnlData = []
            let jnlvData = []
            params['pointeIds'][0].forEach((item,i)=>{
              let dbdsstart = dbdsrealResult.data[dbdsDataConf[item][0]]>0?dbdsrealResult.data[dbdsDataConf[item][0]]:'NaN'
              let dbdsend = dbdsrealResult.data[dbdsDataConf[item][1]]>0?dbdsrealResult.data[dbdsDataConf[item][1]]:'NaN'
              dbdsData[i]= [dbdsstart,dbdsend]
              let dbdscData=dbdsend-dbdsstart
              jnlData[i] = (params['conf'][i]['b_gqgl']/1)*b_yxscData[i]-dbdscData
              jnlvData[i] = (params['conf'][i]['b_gqgl']*b_yxscData[i]-dbdscData)/(params['conf'][i]['b_gqgl']*b_yxscData[i])*100
            })
            let conf = params['conf']


            let realData = {"dbdsData":dbdsData,"jnlData":jnlData,"jnlvData":jnlvData,"zylvData":zylvData,"conf":conf,"b_yxscData":b_yxscData}
            let res ={realData:realData}
            dispatch(receive(`GetPageData_REC_PEIZHI_FENXIDATA_JIENENGLV`, res));
        }

        catch (err) {
            console.error('捕获到错误: ', err)
            //alert('获取平均值失败！请检查网络！')
            dispatch(receive(`GetPageData_ERR_PEIZHI_FENXIDATA_JIENENGLV`, {status: 2, errmsg: '数据错误'}))
        }
    }
}
