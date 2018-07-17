/**
 * @file 统一维护API
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

export const apiServer = `http://39.106.150.90:8080/baogang-meterreading/`;


export const billAPI ={

    //结算单列表
    getbilllist:`${apiServer}charge/projectbill/getbilllist`,
    //结算单明细
    getbilldetaillist:`${apiServer}charge/projectbilldetail/getbilldetaillist`,
    // 抄表单列表
    chaobiaodanlist:`${apiServer}meterreading/meterreadingreportcontroller/getreport`,
    //生成结算单
    addbill:`${apiServer}charge/projectbill/generateprojectbill`,
    //导出结算单
    getexcel:`${apiServer}charge/projectbilldetail/getexcel`,
}
