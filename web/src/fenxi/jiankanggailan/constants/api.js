/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */

 export const apiServer = window.apiPath;
// export const apiServertwo = window.apiPathtwo;

// export const apiServer = 'http://192.168.31.155:8089/';
// export const apiServer = 'http://instance-fj9bwjer:8080/energycloud.portal/';




 //export const apiServer = `http://118.190.88.23:8080/energycloud.portal/`;
 //export const apiServer = `http://192.168.30.233:8080/BoKaiPumpManage.portal/`;

//export const apiServer = `http://192.168.30.142:8080/YanAnEnergyStation.portal/`;// window.apiPath;

export const deviceAPI ={

    //月报表:
    devices:`${apiServer}reportform/selectReportForm`,
    monthReport:`${apiServer}report/reportHistory`,
    yearMonth:`${apiServer}report/yearMonth`,
  //  monthReportNow:`${apiServer}report/reportNow`,
    allBranch:`${apiServer}branch/allBranch`,

    // 成产日报--报表`
    queryDevice:`${apiServer}shebei/selectshebei`,
    deleteDevice:`${apiServer}shebei/deleteshebei`,
    addDevice:`${apiServer}shebei/addshebei`

}
