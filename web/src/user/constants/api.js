/**
 * @file 统一维护API
 * @author zlc <lichao9182@126.com>
 */

//export const apiServer = 'http://118.190.88.23:8080/energycloud.portal/';
 export const apiServer = window.apiPath;

export const nameAPI = {
    //用户信息
    detail: `${apiServer}user/selectDtail`,
    //modify: `${apiServer}user/modify`,
     
    //pc修改用户名
    setname: `${apiServer}user/modify`,
    //pc修改密码
    setpasswd: `${apiServer}user/modify`,
    //pc修改邮箱
    setemail: `${apiServer}user/modify`,
    //pc修改手机号
    setphone: `${apiServer}user/modify`

}
