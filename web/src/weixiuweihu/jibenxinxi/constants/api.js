/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

// export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';


//export const apiServer = `http://180.76.168.8:8080/cloudplatform.portal/`;

//冬冬
//export const apiServer = `http://192.168.30.129:8080/`;

//http://192.168.30.129:8080/device/deviceasset/getdevicecountbyname

//开开:
//export const apiServer = `http://192.168.30.233:8081/baogang-device/`;

 export const apiServer   = `http://39.106.150.90:8080/baogang-device/`;

export const reportAPI ={

    // 成产日报--报表
    errorlist:`${apiServer}guangfuinfos/errorlist`,

    getdevicecount:`${apiServer}device/deviceasset/getdevicecountbyname`,

    // getlayout:`http://192.168.30.129/organization/managementlayout/getlayout?projectid=1`,
    // getdeviceByType:`http://192.168.30.129/device/deviceasset/getlist`,  // 7.5

    getlayout:`${apiServer}organization/managementlayout/getlayout?projectid=1`,
    getdeviceByType:`${apiServer}device/deviceasset/getlist`,  // 7.5



    getalldevicetype:`${apiServer}device/devicetype/getalllist`,  //7.2
    getdeviceinfo:`${apiServer}/device/deviceasset/getdeviceinfo`,  // 7.9
    adddevice:`${apiServer}/device/deviceasset/adddevice`,  // 7.10


    //2018.7.9 开开:
     // getlayout:`http://192.168.30.233:8081/btplatform/organization/managementlayout/getlayout?projectid=1`,
     // getdeviceByType:`${apiServer}device/deviceasset/getlist?devicetypeid=3`,


}
