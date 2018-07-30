/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

// export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';


//export const apiServer = `http://180.76.168.8:8080/cloudplatform.portal/`;
//var apiServer = `http://39.106.150.90:8080/baogang-device/`;

//冬冬
export const apiServer = `http://39.106.150.90:8080/baogang-plan/`;

export const reportAPI ={

    // 成产日报--报表
    errorlist:`${apiServer}guangfuinfos/errorlist`,

 //   getlayout:`${apiServer}organization/managementlayout/getlayout?projectid=1`,
 //   getmainplanInfo:`${apiServer}maintenenceplan/getplaninfo`, //7.12 查询维保计划设置
     getmainplanInfo:`http://39.106.150.90:8080/baogang-plan/maintenenceplan/getplaninfo`, //7.12 查询维保计划设置

    getmainplansetDetail:`${apiServer}maintenenceplan/getplan`, //7.13 查询维保计划设置详情
    //gettotalfitting:`${apiServer}device/maintenence/gettotalfitting`, //7.16 获取人员及配件计划
    gettotalfitting:`${apiServer}maintenenceresult/gettotal`, //16.6
    getresultinfo:`${apiServer}maintenenceresult/getresultinfo`, //16.6
    getimg:`${apiServer}maintenenceresult/getimg`, //16.11

       // addfitting:`${apiServer}device/maintenence/addfitting`, //7.15 新增
    addfitting:`${apiServer}maintenenceplan/addplan`,
    updateplan:`${apiServer}maintenenceplan/updateplan`, //7.? 修改维保计划设置详情



   addresult:`${apiServer}maintenenceresult/addresult`,  //18.3

//服务器上的：
   getlayout:`http://39.106.150.90:8080/baogang-device/organization/managementlayout/getlayout?projectid=1`,
  // getdevicecount:`http://39.106.150.90:8080/baogang-device/device/deviceasset/getdevicecountbyname`, //7.8 查询设备
   //getdevicetype:`${apiServer}device/devicetype/getalllist`,   //7.2 获取所有设备类型
  getdevicetype:`http://39.106.150.90:8080/baogang-device/device/devicetype/getalllist`,   //7.2 获取所有设备类型
  getfittings:`http://39.106.150.90:8080/baogang-device/device/fitting/getfittings?pageno=1&pagesize=20`,
//7.11 获取所有配件 39.106.150.90:8080/baogang-device/device/fitting/getfittings?pageno=1&pagesize=5


}
