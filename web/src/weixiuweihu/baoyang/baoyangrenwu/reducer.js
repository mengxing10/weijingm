/**
 * @file homeReducer
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import {


REQUESTCOMPLETEJOB,
RECEIVECOMPLETEJOB,

  REQUESTCREATEWORKORDER,
  RECEIVECREATEWORKORDER,

  REQUESTACCEPTWORKORDER,
  RECEIVEACCEPTWORKORDER,

  REQUESTDEVICEASSET,
  RECEIVEDEVICEASSET,

  REQUESTWORKORDERSTATUS,
  RECEIVEWORKORDERSTATUS,

  REQUESTBAOBIAO,
  RECEIVEBAOBIAO,

    REQUESTWORKORDERFULL,
    RECEIVEWORKORDERFULL,


   REQUESTYEARMONTH,
   RECEIVEYEARMONTH,
   REQUESTREPORTNOW,
   RECEIVEREPORTNOW

} from './constants/actionTypes'

const initialState = {

companyData:{resultCode:-1,data:[]},
workOrderData:{resultCode:-1,data:[]},
deviceTypeData:{resultCode:-1,data:[]},
staffData:{resultCode:-1,data:[]},

workOrderFullData:{
    resultCode: -1,
    resultMessage: "操作正确完成",
    data: {
        workOrderInfo: {
            expenditure: 0.0,
            workOrderLevelName: "正常",
            workOrderCode: "201806180001",
            deviceAssetID: 1,
            managerID: 1,
            title: "这里是标题",
            budgetary: 0.0,
            deviceAssetName: "有名字的水泵",
            statusID: 1,
            issueAttachmentID: 1,
            statusName: "待派单（新建）",
            workOrderID: 1,
            workOrderLevelID: 1,
            projectID: 1,
            planingTimeEnd: 1529468666000,
            hasClosed: 0,
            planingTimeStart: 1529402349000,
            createUserID: 1,
            workOrderTypeID: 1,
            createTime: 1529382278000,
            solutionAttachmentID: 2,
            name: "张三丰2",
            workOrderTypeName: "点检",
            projectName: "包钢项目1",
            evaluate: 0,
            evaluateMemo: "这里是工作评语",
            responseID: 1,           // -- 工作结果编号
            responseName: "检查-正常", //-- 工作结果
            isSuccess: true  //-- 结果是否成功
        },
        issueWorkOrderAttachmentIntegratedInfo: { // -- 问题描述部分
            attachmentID: 1,
            content: "这里是附件1的文字文字部分",
            imageCode: [
                "123123123123"
            ]
        },
        solutionWorkOrderAttachmentIntegratedInfo: { //-- 解决方案部分
            attachmentID: 2,
            content: "这里是附件2的文字文字部分",
            imageCode: [
                "4324234234234"
            ]
        },
        responseWorkOrderAttachmentIntegratedInfo:{   //-- 反馈附件部分，结构同上
            attachmentID: 1,
            content: "这里是反馈附件1的文字文字部分",
            imageCode: [
                "123123123123"
            ]
        },
        evaluateWorkOrderAttachmentIntegratedInfo: {  //-- 评价附件部分，结构同上
           attachmentID: 1,
            content: "这里是评价附件1的文字文字部分",
            imageCode: [
                "123123123123"
            ]
        },


        workOrderDeviceTypeInfos: [],
        workOrderDeviceTypeActualInfos: [],
        workOrderLinkInfos: [],
        workOrderFlowInfos: [],
        workOrderStaffInfos: []

    }



},




yearMonth:
{"status":1,"data":{"year_month_list":[{"year":2017,"month_list":[6,9]}]}},

monthReport:
{
  "status": 1,
  "data": {
    "statisticalReportlist": [
      {
         "id": "2017-09-03-170001",
        "pumpCode": 170001,
        "shangqiLeishiqiDushu": 0,
        "dangqiLeishiqiDushu": 0,
        "leijiYunxingXiaoshishu": 0,
        "shangqiDianbiaoDushu": 0,
        "dangqiDianbiaoDushu": 0,
        "dangqiYongdianliang": 0,
        "gaizaoqianGonglv": 0,
        "dangqiJieshengDianneng": 0,
        "year": 0,
        "month": 0,
        "jienenglv": 0,
        "readtime": "0",
        "shangciChaobiaoRiqi": "0",
        "name":""
      }
    ]
  }
},

monthReportNow:
{
  "status": 1,
  "data": {
    "statisticalReportlist": [
      {
        "id": "170001",
        "pumpCode": 170001,
        "shangqiLeishiqiDushu": 0,
        "dangqiLeishiqiDushu": 0,
        "leijiYunxingXiaoshishu": 0,
        "shangqiDianbiaoDushu": 0,
        "dangqiDianbiaoDushu": 0,
        "dangqiYongdianliang": 0,
        "gaizaoqianGonglv": 0,
        "dangqiJieshengDianneng": 0,
        "jienenglv": 0,
        "readtime": "0",
        "shangciChaobiaoRiqi": "0"
      }
          ]
  }
},

baobiao:{"status":0,"data":{"data":[]}},
entityCode:"20010001",

}
export default function reducer(state = initialState, action) {
    switch (action.type) {




        case REQUESTCREATEWORKORDER:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVECREATEWORKORDER:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }


        case REQUESTCOMPLETEJOB:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVECOMPLETEJOB:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }




        case REQUESTACCEPTWORKORDER:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEACCEPTWORKORDER:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }



        case REQUESTWORKORDERSTATUS:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEWORKORDERSTATUS:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }


        case REQUESTDEVICEASSET:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEDEVICEASSET:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }




       case REQUESTWORKORDERFULL:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEWORKORDERFULL:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }



        case REQUESTBAOBIAO:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEBAOBIAO:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }


        case REQUESTYEARMONTH:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEYEARMONTH:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }



        case REQUESTREPORTNOW:
        {
            return Object.assign({}, state, {fetchbaobiao: 'start'});
          }

        case RECEIVEREPORTNOW:
        {
            return Object.assign(
                {},
                state,
                {
                  ...action.data,
                  fetchbaobiao: action.data.errmsg?'start':'done'
                }
            )
          }






        default:
            return state
    }
}
