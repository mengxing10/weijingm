/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

 export const apiServer = window.apiPath;
// export const apiServertwo = window.apiPathtwo;

// export const apiServer = 'http://192.168.31.155:8089/';
// export const apiServer = 'http://instance-fj9bwjer:8080/energycloud.portal/';




 //export const apiServer = `http://118.190.88.23:8080/energycloud.portal/`;
 //export const apiServer = `http://192.168.30.233:8080/BoKaiPumpManage.portal/`;

export const reportAPI ={

    //月报表:
    monthReport:`${apiServer}report/reportHistory`,
    yearMonth:`${apiServer}report/yearMonth`,
    monthReportNow:`${apiServer}report/reportNow`,
    allBranch:`${apiServer}branch/allBranch`,

    // 成产日报--报表`
    baobiao:`${apiServer}guangfuinfos/reportlist`,


}
