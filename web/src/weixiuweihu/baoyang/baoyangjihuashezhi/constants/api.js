/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

// export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';


//export const apiServer = `http://180.76.168.8:8080/cloudplatform.portal/`;


//冬冬
//export const apiServer = `http://192.168.30.129:8080/`;
var apiServer = `http://39.106.150.90:8080/baogang-device/`;
export const reportAPI ={

    // 成产日报--报表
    errorlist:`${apiServer}guangfuinfos/errorlist`,
    getlayout:`${apiServer}organization/managementlayout/getlayout?projectid=1`,
    getalldevicetype:`${apiServer}device/devicetype/getalllist`,  //7.2
    getdevicecount:`${apiServer}device/deviceasset/getdevicecountbyname`, //7.8 查询设备
    getfittings:`${apiServer}device/fitting/getfittings`, //7.11 查询所有配件 ?pageno=1&pagesize=2
    getmainplanset:`${apiServer}device/maintenence/getfittings`, //7.12 查询维保计划设置
    getmainplansetDetail:`${apiServer}device/maintenence/getmaintenenceplan`, //7.13 查询维保计划设置详情
    addfitting:`${apiServer}device/maintenence/addfitting`, //7.15 新增

    




}
