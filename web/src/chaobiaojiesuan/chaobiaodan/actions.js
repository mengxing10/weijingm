/**
 * @file chaobiaodanAction
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'


let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

const apiServer = `http://39.106.150.90:8080/baogang-meterread/`;

const api ={
  //泵站列表
  bengzhanlist:`${apiServer}pump/level/option?parentid=0`,
  //泵组列表
  bengzulist:`${apiServer}pump/level/option?parentid=`,

  // 抄表列表
  chaobiaodanlist:`${apiServer}meterreading/report/select`,
  //抄表单明细查看
  chaobiaodaninfo:`${apiServer}meterreading/detail/tbldata?uuid=`,
  //抄表单导出
  chaobiaodandaochu:`${apiServer}meterreading/detail/export?uuid=`,
  //新增抄表单
  chaobiaodanadd:`${apiServer}standard/index/tbl`,
  //生成抄表单
  chaobiaodannew:`${apiServer}meterreading/report/generate`,
  //删除抄表单
  chaobiaodandel:`${apiServer}meterreading/report/delete?uuid=`,

}


/**
 * 获取泵站列表
 *
 * @param {all} params
 */
export function getBengZhanList() {
  return async dispatch => {
      dispatch(request('REQUESTE_BENGZHANLIST'))
      try {


        let result =  await axios.get(api.bengzhanlist)
        if(result.resultCode==0){

          let bengzhanlist = result.data
          bengzhanlist.unshift({"name":"全部","id":0})
          let res = {"bengzhanlist":bengzhanlist};
          dispatch(receive('RECEIVE_BENGZHANLIST', res));

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
 * 获取泵站列表
 *
 * @param {all} params
 */
export function getBengZuList(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_BENGZULIST',params))
      try {

        let result =  await axios.get(`${api.bengzulist}${params}`)
        if(result.resultCode==0){

          let bengzus = result.data.map(item=>({key:item.id,text:item.name,value:item.id}))
          bengzus.unshift({ key: 0, text: '全部', value:'all' })
          let res = {"bengzus":bengzus};
          dispatch(receive('RECEIVE_BENGZULIST', res));

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
 * 获取抄表单列表
 *
 * @param {all} params
 */
export function getChaoBiaoDanList(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_CHAOBIAODANLIST', params))
      try {
        let result =  await axios.post(api.chaobiaodanlist, params)
        if(result.resultCode==0){
          let res = {"chaobiaodanlist":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANLIST', res));
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
 * 获取抄表单详情
 *
 * @param {all} params
 */
export function getChaoBiaoDanInfo(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_CHAOBIAODANINFO', params))
      try {
        let result =  await axios.get(`${api.chaobiaodaninfo}${params}`)
        if(result.resultCode==0){
          let res = {"chaobiaodaninfo":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANINFO', res));
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
 * 导出抄表单
 *
 * @param {all} params
 */
export function getChaoBiaoDanDaoChu(params) {
  return async dispatch => {
      try {
        let href = `${api.chaobiaodandaochu}${params}`
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
 * 删除抄表单
 *
 * @param {all} params
 */
export function getChaoBiaoDanDel(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_CHAOBIAODANDEL', params))
      try {
        let result =  await axios.get(`${api.chaobiaodandel}${params}`)
        if(result.resultCode==0){
          let res = {"chaobiaodandel":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANDEL', params))
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
 * 新增抄表单
 *
 * @param {all} params
 */
export function getChaoBiaoDanAdd(params) {
  return async dispatch => {
      dispatch(request('REQUESTE_CHAOBIAODANADD', params))
      try {
        let pars = `?pumpgroupid=${params.pumpgroupid}&readingdate=${params.readingdate}`
        let result =  await axios.get(`${api.chaobiaodanadd}${pars}`)
        if(result.resultCode==0){
          let res = {"chaobiaodanadd":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANADD', res));
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
 * 新增抄表单
 *
 * @param {all} params
 */
export function postChaoBiaoDanNew(params) {
  return async dispatch => {
      try {

        let result =  await axios.post(api.chaobiaodannew, params)
        if(result.resultCode==0){
          alert('生成新抄表单成功')
        }
        else{
          alert(`生成新抄表单失败：${result.resultMessage}`)
        }


      }
      catch (err) {
        console.error('捕获到错误: ', err)
        alert(`生成新抄表单失败：服务器无响应`)
      }
  }
}
