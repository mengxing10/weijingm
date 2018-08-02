/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */

// export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';


   //export const apiServer = `http://180.76.168.8:8080/cloudplatform.portal/`;

   // export const apiServerBase =  `http://192.168.30.233:8081/btplatform/`;

   // export const apiServer = `http://192.168.10.108:8080/btplatform/`;

   //dongdong addr:
   // export const apiServer = `http://192.168.30.233:8081/btplatform/`;
    
    // export const apiServer = `http://192.168.30.129/`;
    // 2018.7.18 开开合并接口
    //export const apiServer   = `http://39.106.150.90:8080/btplatform/`;

    export const apiServer   = `http://39.106.150.90:8080/baogang-abnormal/`;

    export const API ={

    // 成产日报--报表
    errorlist:`${apiServer}guangfuinfos/errorlist`,

    getabnormal:`${apiServer}abnormal/getfullbyany`,

    //获取管理层级: 4.1
     getlayout:`${apiServer}organization/managementlayout/getlayout`,

    //12.1 紧急情况列表
     getabnormallevel:`${apiServer}abnormal/abnormallevel/getalllist`,
    
     //12.2 获取报修结果状态:
     getabnormalresponse:`${apiServer}/abnormal/abnormalresponse/getalllist`,

     //12.3 创建报修单
     createabnormal:`${apiServer}/abnormal/create`,

     //12.5获取报修单详细信息:
     getabnormalfull:`${apiServer}/abnormal/getbyid`,
  


     getdeviceasset:`${apiServer}device/deviceasset/getlistbyname`, //7.1  获取所有设备

 
  
 





}
