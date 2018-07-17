/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

// export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';


export const apiServer = `http://39.106.150.90:8080/baogang-meterreading/`;


export const chaobiaoAPI ={

    // 抄表列表
    chaobiaolist:`${apiServer}meterreading/controller/getmeterreadingsummary`,
    //抄表指标项
    deviceinfo:`${apiServer}device/stationgroup/getstationdeviceinfo`,
    //保存抄表数据
    addmeterreading:`${apiServer}meterreading/controller/addmeterreading`,
    //抄表明细查看
    chaobiaoinfo:`${apiServer}meterreading/controller/getbyreadingid`

}
