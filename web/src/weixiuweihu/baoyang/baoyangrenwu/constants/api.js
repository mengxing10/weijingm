/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */


// export const apiServertwo = window.apiPathtwo;

// export const apiServer = 'http://192.168.31.155:8089/';
// export const apiServer = 'http://instance-fj9bwjer:8080/energycloud.portal/';




 //export const apiServer = `http://118.190.88.23:8080/energycloud.portal/`;
 //export const apiServer = `http://192.168.30.233:8080/BoKaiPumpManage.portal/`;
 //
 //
 //正式用:  export const apiServer = window.apiPath;
 //测试用：
//export const apiServer =  `http://192.168.10.116:80/project/company/`; //getCompany?pagesize=4&pageno=1/


// export const apiServerBase =  `http://192.168.30.233:8081/btplatform/`;

// export const apiServer = `http://192.168.30.233:8081/btplatform/`; //`http://192.168.10.105:8080/btplatform/`;


//`http://192.168.10.105:8080/btplatform/`;
//export const apiServerBase =  `http://192.168.30.129/`;

 export const apiServer = `http://39.106.150.90:8080/btplatform/`; 


export const reportAPI ={



    //月报表:
    monthReport:`${apiServer}report/reportHistory`,
    yearMonth:`${apiServer}report/yearMonth`,
    monthReportNow:`${apiServer}report/reportNow`,
    allBranch:`${apiServer}branch/allBranch`,

    // 成产日报--报表`
    getCompany:`${apiServer}getcompany`,
    addCompany:`${apiServer}addcompany`,
    //getpinyin:`${apiServerBase}common/pinyin/getpinyin`,
    getpinyin:`${apiServer}common/pinyin/getpinyin`,
    modifycompany:`${apiServer}modifycompany`,




    //获取项目信息: 5.1
     getprojectlist:`${apiServer}project/controller/getprojectlist`,
    //获取管理层级: 4.1
     getlayout:`${apiServer}organization/managementlayout/getlayout`,



     getworkorderstatus:`${apiServer}workorder/workorderstatus/getall`, //6.1 获取所有工单状态码
     getworkordertype:`${apiServer}workorder/workordertype/getalllist`, // 6.2 获取工单类型 ，初始载入:
     createworkorder:`${apiServer}workorder/create`, //6.4 新建一个工单

     //getalllist:`${apiServer}workorder/getalllist`,//6.6获取所有工单

     getworkorderfull:`${apiServer}workorder/getfullbyid`,   //6.7  获取完整工单信息
     acceptworkorder:`${apiServer}workorder/accept`,   //6.9  办理领取
     completejob:`${apiServer}workorder/completejob`,   //6.10  反馈工单，完工
     getalllist:`${apiServer}workorder/getlistbylayoutcratetimetype`,//6.12 获取所有工单


     getdeviceasset:`${apiServer}device/deviceasset/getlistbyname`, //7.1  获取所有设备
     getdevicetype:`${apiServer}device/devicetype/getalllist`,   //7.2 获取所有设备类型
     getstaff:`${apiServer}workorder/staff/getalllist`,   //  8.1 工作人员  初始载入:   // 8.1 getalllist  8.2 getlistbyany





}
