/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

export const apiServer = `http://39.106.150.90:8080/baogang-meterreading/`;

export const chaobiaodanAPI ={
  // 抄表单列表
  chaobiaodanlist:`${apiServer}meterreading/meterreadingreportcontroller/getreport`,
  // 抄表列表
  chaobiaolist:`${apiServer}meterreading/meterreadingdetail/getdetailby`,
  //抄表单明细查看
  chaobiaodaninfo:`${apiServer}meterreading/meterreadingreportdetail/getmeterreadingreportdetail`,
  //生成抄表单
  addmeterreadingreport:`${apiServer}meterreading/meterreadingreportcontroller/addmeterreadingreport`,
  //导出抄表单
  getexport:`${apiServer}meterreading/meterreadingreportdetail/exportmeterreadingreportdetail`,



}
