/**
 * @file chaobiaodanAction
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'


let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

const apiServer = `http://39.106.150.90:8080/baogang-meterread/`;

const api ={
  //获取结算单列表
  jiesuandanlist:`${apiServer}charge/report/select`,
  //获取单个结算单详情
  jiesuandaninfo:`${apiServer}charge/detail/select?uuid=`,
  //导出结算单
  jiesuandandaochu:`${apiServer}charge/detail/export?uuid=`,
  //新增结算单，查询自动生成的结算单
  jiesuandannew:`${apiServer}charge/report/tbl`,
  //获取修改新增结算单的抄表单列表
  jiesuandanmod:`${apiServer}charge/report/option?`,
  //生成新的结算单，同时获取新的UUID,跳转到详情页面
  jiesuandangen:`${apiServer}charge/report/generate`,
  //获取配置参数列表
  jiesuandanconf:`${apiServer}charge/unit/allunit`,
  //修改配置参数
  jiesuandanconfmod:`${apiServer}charge/unit/updateunit`,
}


/**
 * 获取结算单列表
 *
 * @param {all} params
 */
export function getJieSuanList(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANLIST'))
      try {


        let result =  await axios.post(api.jiesuandanlist,params)
        if(result.resultCode==0){

          let jiesuanlist = result.data

          let res = {"jiesuanlist":jiesuanlist};
          dispatch(receive('RECEIVE_JIESUANLIST', res));

        }else{
            alert(`获取数据失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)
        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}



/**
 * 获取抄表单详情
 *
 * @param {all} params
 */
export function getJieSuanDanInfo(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANDANINFO', params))
      try {
        let result =  await axios.get(`${api.jiesuandaninfo}${params}`)
        if(result.resultCode==0){
          let res = {"jiesuandaninfo":result.data};
          dispatch(receive('RECEIVE_JIESUANDANINFO', res));
        }
        else{
          alert(`获取数据失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)

        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}




/**
 * 导出结算单
 *
 * @param {all} params
 */
export function getJieSuanDanDaoChu(params) {
  return async dispatch => {
      try {
        let href = `${api.jiesuandandaochu}${params}`
        let element = document.createElement("a");
        element.setAttribute("href", href);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("导出失败，服务器无响应！")
      }
  }
}



/**
 * 新增抄表单
 *
 * @param {all} params
 */
export function getJieSuanDanNew() {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANDANNEW'))
      try {
        let result =  await axios.get(`${api.jiesuandannew}`)
        if(result.resultCode==0){
          let res = {"jiesuandannew":result.data};
          dispatch(receive('RECEIVE_JIESUANDANNEW', res));
        }
        else{
          alert(`获取数据失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)

        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}

//



/**
 * 修改结算单里的抄表单
 *
 * @param {all} params
 */
export function getJieSuanDanMod(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANDANMOD'))
      let pars = `startId=${params}`
      try {
        let result =  await axios.get(`${api.jiesuandanmod}${pars}`)
        if(result.resultCode==0){
          let res = {"jiesuandanmod":result.data};
          dispatch(receive('RECEIVE_JIESUANDANMOD', res));
        }
        else{
          alert(`获取数据失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)

        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}



/**
 * 生成结算单
 *
 * @param {all} params
 */
export function getJieSuanDanGen(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANDANGEN'))

      try {
        let result =  await axios.post(api.jiesuandangen,params)
        if(result.resultCode==0){
          let res = {"jiesuandangen":result.data};
          dispatch(receive('RECEIVE_JIESUANDANGEN', res));
        }
        else{
          alert(`生成失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)
        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}




/**
 * 获取结算配置参数
 *
 * @param {all} params
 */
export function getJieSuanDanConf() {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANDANCONF'))

      try {
        let result =  await axios.get(api.jiesuandanconf)
        if(result.resultCode==0){
          let res = {"jiesuandanconf":result.data};
          dispatch(receive('RECEIVE_JIESUANDANCONF', res));
        }
        else{
          alert(`获取失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)
        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}



/**
 * 获取结算配置参数
 *
 * @param {all} params
 */
export function getJieSuanDanConfMod(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_JIESUANDANCONFMOD',params))

      try {
        debugger
        let result =  await axios.post(api.jiesuandanconfmod,params)
        if(result.resultCode==0){
          dispatch(receive('RECEIVE_JIESUANDANCONFMOD'));
        }
        else{
          alert(`修改失败！错误编码：${result.resultCode},错误提示：${result.resultMessage}`)
        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert("服务器无响应！请稍后再试")
      }
  }
}
