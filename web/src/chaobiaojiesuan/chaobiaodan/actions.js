/**
 * @file chaobiaodanAction
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'


let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}

const apiServer = `http://192.168.30.233:8081/baogang-meterread/`;

const chaobiaoAPI ={
  bengzhanlist:`${apiServer}pump/level/option?parentid=0`,

  bengzulist:`${apiServer}pump/level/option?parentid=`,

  // 抄表列表
  chaobiaodanlist:`${apiServer}meterreading/report/select`,
  //抄表单明细查看
  chaobiaodaninfo:`${apiServer}meterreading/detail/tbldata?uuid=`,
  //新增抄表单
  chaobiaodanadd:`${apiServer}standard/index/tbl`,
  //生成抄表单
  chaobiaodannew:`${apiServer}meterreading/report/generate`

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


        let result =  await axios.get(chaobiaoAPI.bengzhanlist)
        if(result.resultCode==0){

          let bengzhanlist = result.data
          bengzhanlist.unshift({"name":"全部","id":0})
          let res = {"bengzhanlist":bengzhanlist};
          dispatch(receive('RECEIVE_BENGZHANLIST', res));

        }else{
            dispatch(receive('RECEIVE_BENGZHANLIST', {status: result.resultCode, errmsg: result.resultMessage}))
        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive('RECEIVE_BENGZHANLIST', {status: 2, errmsg: '数据错误'}))
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

        let result =  await axios.get(`${chaobiaoAPI.bengzulist}${params}`)
        if(result.resultCode==0){

          let bengzus = result.data.map(item=>({key:item.id,text:item.name,value:item.id}))
          bengzus.unshift({ key: 0, text: '全部', value:'all' })
          let res = {"bengzus":bengzus};
          dispatch(receive('RECEIVE_BENGZULIST', res));

        }else{
            dispatch(receive('RECEIVE_BENGZULIST', {status: result.resultCode, errmsg: result.resultMessage}))
        }
      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive('RECEIVE_BENGZULIST', {status: 2, errmsg: '数据错误'}))
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
        let result =  await axios.post(chaobiaoAPI.chaobiaodanlist, params)
        if(result.resultCode==0){
          let res = {"chaobiaodanlist":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANLIST', res));
        }
        else{
            dispatch(receive('RECEIVE_BENGZULIST', {status: result.resultCode, errmsg: result.resultMessage}))
        }


      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive('RECEIVE_CHAOBIAODANLIST', {status: 2, errmsg: '数据错误'}))
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
        let result =  await axios.get(`${chaobiaoAPI.chaobiaodaninfo}${params}`)
        if(result.resultCode==0){
          let res = {"chaobiaodaninfo":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANINFO', res));
        }
        else{
            dispatch(receive('RECEIVE_CHAOBIAODANINFO', {status: result.resultCode, errmsg: result.resultMessage}))
        }


      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive('RECEIVE_CHAOBIAODANINFO', {status: 2, errmsg: '数据错误'}))
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
        let result =  await axios.get(`${chaobiaoAPI.chaobiaodanadd}${pars}`)
        if(result.resultCode==0){
          let res = {"chaobiaodanadd":result.data};
          dispatch(receive('RECEIVE_CHAOBIAODANADD', res));
        }
        else{
            dispatch(receive('RECEIVE_CHAOBIAODANADD', {status: result.resultCode, errmsg: result.resultMessage}))
        }


      }
      catch (err) {
        console.error('捕获到错误: ', err)
        dispatch(receive('RECEIVE_CHAOBIAODANADD', {status: 2, errmsg: '数据错误'}))
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

        let result =  await axios.post(chaobiaoAPI.chaobiaodannew, params)
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
