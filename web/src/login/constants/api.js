/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */

 export const apiServer = window.apiPath;
// export const apiServertwo = window.apiPathtwo;

// export const apiServer = 'http://192.168.31.155:8089/';
// export const apiServer = 'http://180.76.168.8:8080/energycloud.portal/';


//export const apiServer = `http://118.190.88.23:8080/energycloud.portal/`;
// export const apiServertwo = `http://118.190.88.23:8080/energycloud.portal/`;
// export const apiServerlocal = `http://118.190.88.23:8080/energycloud.portal/`;
// export const apiServerthree = `http://118.190.88.23:8080/energycloud.portal/`;


//2018.1.4
// http://118.190.88.23:8084/YanAnEnergyStation.portal/user/login
  //loginout
export const loginAPI = {

  //登陆操作
    login:  `${apiServer}user/login`,
    logout:  `${apiServer}user/logout`

}
