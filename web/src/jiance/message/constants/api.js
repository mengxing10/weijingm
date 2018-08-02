/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */


// export const apiServertwo = window.apiPathtwo;

// export const apiServer = 'http://192.168.31.155:8089/';
// export const apiServer = 'http://instance-fj9bwjer:8080/energycloud.portal/';

 //export const apiServer = `http://118.190.88.23:8080/energycloud.portal/`;
 export const apiServer = `http://118.190.88.23:8086/SanYaBoYue.portal/`;

//export const apiServer = window.apiPath;
//export const apiServer = `http://192.168.30.142:8080/YanAnEnergyStation.portal/`;// window.apiPath;
export const xiaoxiAPI ={

    shebeilist: `${apiServer}device/getDevicesByTopicid `,
    mmonitorbaoxiuxiangqing: `${apiServer}repair/getRepairDetail`,
    mmonitorweihuxiangqing: `${apiServer}maintain/getMaintainDetail`,
    //巡检模板接口
    xunjianchushi:`${apiServer}routinginspection/getModellist `,
    //巡检展示数据接口
    xunjianshow:`${apiServer}routinginspection/getlist`,
    //清空未读消息数
    clearunread:`${apiServer}message/clearMessageNumber`,

}
