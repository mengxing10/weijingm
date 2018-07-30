/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

// export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';


//export const apiServer = `http://180.76.168.8:8080/cloudplatform.portal/`;


//冬冬
//export const apiServer = `http://192.168.30.129:8080/`;
var apiServer = `http://39.106.150.90:8080/baogang-device/`;


var apiPlan = `http://39.106.150.90:8080/baogang-plan/`;
export const reportAPI ={

    // 成产日报--报表
    errorlist:`${apiServer}guangfuinfos/errorlist`,
  //  getlayout:`${apiServer}organization/managementlayout/getlayout?projectid=1`,
    getalldevicetype:`${apiServer}device/devicetype/getalllist`,  //7.2
    // getdevicecount:`${apiServer}device/deviceasset/getdevicecountbyname`, //7.8 查询设备
    getfittings:`${apiServer}device/fitting/getfittings`, //7.11 查询所有配件 ?pageno=1&pagesize=2

    getmainplanset:`${apiPlan}maintenenceplan/getplanlist`, //7.12 查询维保计划设置
    getmainplansetDetail:`${apiPlan}maintenenceplan/getplan`, //7.13 查询维保计划设置详情
   // addfitting:`${apiServer}device/maintenence/addfitting`, //7.15 新增
    addfitting:`${apiPlan}maintenenceplan/addplan`,
    updateplan:`${apiPlan}maintenenceplan/updateplan`, //7.? 修改维保计划设置详情
  

    
//服务器上的：
   getlayout:`http://39.106.150.90:8080/baogang-device/organization/managementlayout/getlayout?projectid=1`,
   getdevicecount:`http://39.106.150.90:8080/baogang-device/device/deviceasset/getdevicecountbyname`, //7.8 查询设备


}
