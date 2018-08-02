/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'
import classNames from 'classnames'
import CsvFetch from '../../../common/components/CsvFetch'
import MyTable from '../../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Button ,Checkbox,TextArea} from 'semantic-ui-react'
import Pager from '../../../common/components/Pager'

import moment from 'moment'
import Menus from '../../../common/components/Menus'
class BaoyangRenwu extends Component {
    constructor(props) {
        super(props)
        this.curWorkordertypeid = 4; //保养 默认
        this.operateType="" //当前办理类型: linqu, fangong, zuofei
        this.state = {
          //创建用
          workOrderTypeID:4,
          deviceAssetID:-1,
          projectID:1,
          managerID:1,
          workOrderLinks:[],
          workOrderStaffs:[],
          workOrderStaffNames:[], //辅助workOrderStaffs使用
          workOrderDeviceTypes:[],
          workOrderDeviceTypesMap:{}, //辅助workOrderDeviceTypes使用
          workOrderLevelID:1, //紧急程度
          budgetary:0,
          title:'',
          planingTimeStart: moment().valueOf(),
          planingTimeEnd: moment().add(1, 'month').valueOf(),
          issueAttachmentContent:'',
          issueAttachmentImageBase64s:[],
          issueAttachmentImageBase64sNames:[],//issueAttachmentImageBase64s

          testImg:'',
          solutionAttachmentContent:'',
          solutionAttachmentImageBase64s:[],
          solutionAttachmentImageBase64sNames:[],//solutionAttachmentImageBase64s
          // workOrderDeviceTypesMap["1"]={ "deviceTypeID": 1, // -- 备件编号
          //                                 "quantity": 1   //-- 备件数量
          //                                }

          //办理业务用:  办理 linqu, fangong, shangbao, zuofei 时用
          selectWorkOrderID:-1,
          opinion:'',

          //shangbao:
          responseAttachmentContent:'',
          //workOrderDeviceTypeActuals:[],
          //workOrderDeviceTypeActualsMap:{}, //辅助workOrderDeviceTypeActuals使用
          responseAttachmentImageBase64s:[],
          responseAttachmentImageBase64sNames:[],


          //查询用:
          qlayoutID:-1,
          qstatusid:-1,

           // startDate: moment("2016-01-01"),
           // endDate: moment().add(1, 'd'),
          page:1,
          deviceFilter:"",
          xinzengShow:false,
          paifa:false,
          guanlianGongdan:false,
          peijian:false,
          chakan:false,
          chakan2:false,
          chakan3:false,
          chakan4:false,
          banli:false,
          yanshou:false,
          renyuan:false
        }
    }
    onBanliN(){
      this.setState({paifa:false,banli:false,yanshou:false})
    }
    render() {
      var startDate= moment("2018-01-01");
      var endDate= moment().add(1, 'd');
      //alert(moment().valueOf());
      var startDatePlan= moment();//.add(1, 'd');
      var endDatePlan= moment().add(1, 'month');
      let title = "点检";
      let project =this.props.location.query.project;
      //title += project=="wx"?"维修":project=="xj"?"巡检":project=="bx"?"报修":project=="wbjh"?"维保计划":""
      // title += project=="wx"?"维修":project=="dj"?"点检":project=="dx"?"定修":project=="byang"?"保养":""

      // if(project=="wx"){ title= "设备维修";this.curWorkordertypeid = 3; }
      // else if(project=="dj")  { title= "点检";  this.curWorkordertypeid = 1; }
      // else if(project=="dx")  { title= "定修";  this.curWorkordertypeid = 2; }
      // else if(project=="byrw")  { title= "设备保养";  this.curWorkordertypeid = 4; }
      // console.log("当前类型: " + title + ","+ this.curWorkordertypeid)

      var othis = this;

      var {workOrderFullData, layoutData, workOrderData,deviceAssetData,workOrderStatusData,workOrderTypeData,staffData,deviceTypeData,companyData}  =this.props;       //,addCompanyData
      var workOrderInfo = workOrderFullData.data.workOrderInfo;

      var stars = [];
      if(workOrderInfo.evaluate >0){
        for(var p=0;p<workOrderInfo.evaluate;p++){
          stars.push(p);
        }
      }
      var workOrderInfo2 = workOrderFullData.data; //{width:"10%",value:"类型"},
      const thead=[{width:"10%",value:"编号"},{width:"10%",value:"设备"}
                  ,{width:"15%",value:"时间"},{width:"15%",value:"标题"},{width:"15%",value:"级别"}
                  ,{width:"15%",value:"发布人"},{width:"10%",value:"办理状态"},{width:"10%",value:"操作"}]

      const options =[
        { key: -1, text: '全部', value: -1 },
        // { key: 2, text: '28/38泵站', value: 2 },
        // { key: 3, text: '综合泵站', value: 3 },
        // { key: 4, text: '黄河泵站', value: 4 },
        // { key: 5, text: '3/4泵站', value: 5 }
      ]
      const options2 =[
        // { key: 1, text: '代办', value: 1 },
        // { key: 2, text: '已办', value: 2 }
        { key: -1, text: '全部', value: -1 }
      ]
      //负责人/工作人员 8.1:
      var staffOptions =[];
      if(staffData&&staffData.resultCode==0){
        for(var i=0;i<staffData.data.length;i++){
          var newOpt = {};
          newOpt.key = staffData.data[i].staffID;
          newOpt.value = staffData.data[i].staffID;
          newOpt.text = staffData.data[i].name;
          staffOptions.push(newOpt );
        }
      }

      //工单类别6.2:
      // var workOrderTypeOptions =[];
      // if(workOrderTypeData&&workOrderTypeData.resultCode==0)
      // {
      //   for(var i=0;i<workOrderTypeData.data.length;i++)
      //   {
      //     var newOpt = {};
      //     newOpt.key = workOrderTypeData.data[i].workOrderTypeID;
      //     newOpt.value = workOrderTypeData.data[i].workOrderTypeID;
      //     newOpt.text = workOrderTypeData.data[i].workOrderTypeName;
      //     workOrderTypeOptions.push(newOpt );
      //   }
      // }

      //设备名称7.1
      var deviceAssetOptions =[ { key: -1, text: '请选择', value: -1 }];  //{ key: -1, text: '全部', value: -1 }
      if(deviceAssetData&&deviceAssetData.resultCode==0)
      {
        for(var i=0;i<deviceAssetData.data.length;i++)
        {
          var newOpt = {};
          newOpt.key = deviceAssetData.data[i].deviceAssetID;
          newOpt.value = deviceAssetData.data[i].deviceAssetID;
          newOpt.text = deviceAssetData.data[i].deviceAssetName;
          deviceAssetOptions.push(newOpt );
        }
      }

      //管理层级
      var layoutDataOptions =[ { key: -1, text: '全部', value: -1 }];
      if(layoutData&&layoutData.resultCode==0)
      {
        for(var i=0;i<layoutData.data.length;i++)
        {
          var newOpt = {};
          newOpt.key = layoutData.data[i].layoutID;
          newOpt.value = layoutData.data[i].layoutID;
          newOpt.text = layoutData.data[i].layoutName;
          layoutDataOptions.push(newOpt );
        }
      }

      //项目名称5.1
      // var companyOptions =[];
      // if(companyData&&companyData.resultCode==0)
      // {
      //   for(var i=0;i<companyData.data.length;i++)
      //   {
      //     var newOpt = {};
      //     newOpt.key = companyData.data[i].projectID;
      //     newOpt.value = companyData.data[i].projectID;
      //     newOpt.text = companyData.data[i].projectName;
      //     companyOptions.push(newOpt );
      //   }
      // }

      //工单紧急程度:
      var workOrderLevelOptions=[{key: 1,value:1,text: "一般"},{key: 2,value:2,text: "紧急"}];

      if(workOrderStatusData&&workOrderStatusData.resultCode==0)
      {
        for(var i=0;i<workOrderStatusData.data.length;i++)
        {
          //if(workOrderStatusData.data[i].statusID>=2)
          {
            var newOpt = {};
            newOpt.key = workOrderStatusData.data[i].statusID;
            newOpt.value = workOrderStatusData.data[i].statusID;
            newOpt.text = workOrderStatusData.data[i].statusName;
            options2.push(newOpt );
          }
        }
      }

      const options3 =[
        { key: 1, text: '全部', value: 1 },
        { key: 2, text: '设备名称1', value: 2 },
        { key: 3, text: '设备名称2', value: 3 },
        { key: 4, text: '设备名称3', value: 4 },
        { key: 5, text: '设备名称4', value: 5 }
      ]
      //   const tbody=[[1,"维修","101#水泵","2018-02-08 00:30:00","温度过高","一级报警","系统提醒","待领取",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)}>查看</span>],
      //   [2,"维修","102#水泵","2018-02-28 00:30:00","温度过高","一级报警","系统提醒","待反馈",<span style={{cursor:'pointer'}} onClick={this.onChakan2.bind(this)} >查看</span>],
      //   [3,"维修","102#水泵","2018-02-28 00:30:00","温度过高","三级报警","系统提醒","待验收",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>],
      //   [4,"维修","102#水泵","2018-02-28 00:30:00","温度过高","一般","系统提醒","已完成",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan4.bind(this)} >查看</span>],
      //   [5,"维修","102#水泵","2018-02-28 00:30:00","温度过高","紧急","张三","返工",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan2.bind(this)} >查看</span>],
      //   [6,"维修","102#水泵","2018-02-28 00:30:00","温度过高","紧急","系统提醒","待验收",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>]
      // ]

      //   var tbody=[
      //   [1,"维修","101#水泵","2018-02-08 00:30:00","温度过高","一级报警","系统提醒","待领取",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this,'chakan')}>查看</span>],
      //   [2,"维修","102#水泵","2018-02-28 00:30:00","温度过高","一级报警","系统提醒","待反馈",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this,'chakan2')} >查看</span>],
      //   [3,"维修","102#水泵","2018-02-28 00:30:00","温度过高","三级报警","系统提醒","待验收",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,'chakan3')} >查看</span>],
      //   [4,"维修","102#水泵","2018-02-28 00:30:00","温度过高","一般","系统提醒","已完成",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,'chakan4')} >查看</span>],
      //   [5,"维修","102#水泵","2018-02-28 00:30:00","温度过高","紧急","张三","返工",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,'chakan5')} >查看</span>],
      //   [6,"维修","102#水泵","2018-02-28 00:30:00","温度过高","紧急","系统提醒","待验收",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,'chakan2')} >查看</span>]
      // ]
      var pageCount =0;

      // if(addCompanyData)
      // if( addCompanyData.resultCode == 0 )
      //   {  alert("添加成功")}

      var tbody= [];
      if(workOrderData && workOrderData.resultCode == 0 ){
        pageCount = workOrderData.data.pageCount;
        for(var i=0;i<workOrderData.data.data.length;i++){
          var  arr = new Array();
          // var status = workOrderData.data[i].statusName; //未审核，通过，未通过
          // if(companyData.data.data[i].statusName==false)  status = "无效";
          // else
          // {  status = "有效";
          //      // if(companyData.data.data[i].isValid == 0) status = "有效";
          //       //else  status = "已通过";
          // }
          //
          // this.curWorkordertypeid
          // var workOrderTypeName = "维修";
          // if(workOrderData.data.data[i]. workOrderTypeID==1)
          //   workOrderTypeName = "点检";
          // else if(workOrderData.data.data[i]. workOrderTypeID==2)
          //   workOrderTypeName = "定修";
          // else if(workOrderData.data.data[i]. workOrderTypeID==3)
          //     workOrderTypeName = "维修";
          // else if(workOrderData.data.data[i]. workOrderTypeID==4)
          //     workOrderTypeName = "保养";
          var updateTime = moment (workOrderData.data.data[i].updaetTime).format('YYYY-MM-DD HH:mm:ss');
          // var btnHtml = <Button style={ { fontSize:"14px"}}    color='teal'  onClick={this.openUpdate.bind(this,workOrderData.data[i])}>查看</Button>
          // var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>
          var  statusFlag = ""
          var sid = workOrderData.data.data[i].statusID;
          if(sid == 2)
            statusFlag = "chakan";
          else if(sid == 3)
            statusFlag = "chakan2";
          else if(sid == 4)
            statusFlag = "chakan3";
          else if(sid == 5)
            statusFlag = "chakan4";  //workOrderTypeName,
          var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,statusFlag,workOrderData.data.data[i].workOrderID)} >查看</span>
          var arr = [workOrderData.data.data[i].workOrderID,  workOrderData.data.data[i].deviceAssetName ,updateTime,workOrderData.data.data[i].title,workOrderData.data.data[i].workOrderLevelName,workOrderData.data.data[i].createUserID,workOrderData.data.data[i].statusName,btnHtml];//id:workOrderData.data.data[i].workOrderID
          tbody.push(arr);
        }
      }
      const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}

        return (
          <div className="table-baoyangrenwu" style={BodyStyle}>
           {/*<h3 className="weixiu-title labStyle">{title}</h3>  */}
            <h3>&nbsp;</h3>
            <div className="query-condition">
                <span className="query-name labStyle">泵站选择</span>
                  <div className="query-value">
                    <Dropdown
                      onChange={this.handleChangeDropdown.bind(this,'qlayoutID')}
                      className="query-value"
                       defaultValue={layoutDataOptions[0].value}
                       selection
                       openOnFocus
                       options={layoutDataOptions}
                     />
                  </div>
                <label className="labStyle">开始时间</label>
                    <DateField ref="theSTime"
                        dateFormat="YYYY-MM-DD HH:mm:ss"
                        locale="zh-cn"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        defaultValue={startDate}
                        //value={this.state.startDate}
                        //onChange={::this.handleChangeStart}
                        >
                        <DatePicker
                            navigation={true}
                            locale="zh-cn"
                            forceValidDate={true}
                            highlightWeekends={true}
                            highlightToday={true}
                            weekNumbers={true}
                            weekStartDay={0}
                            footer={true}
                            />
                    </DateField>
                <label className="labStyle">结束时间</label>
                    <DateField ref="theETime"
                    dateFormat="YYYY-MM-DD HH:mm:ss"
                    locale="zh-cn"
                    forceValidDate={true}
                    updateOnDateClick={true}
                    defaultValue={endDate}
                    //value={this.state.endDate}
                   // onChange={::this.handleChangeEnd}
                    >
                    <DatePicker
                        navigation={true}
                        locale="zh-cn"
                        forceValidDate={true}
                        highlightWeekends={true}
                        highlightToday={true}
                        weekNumbers={true}
                        weekStartDay={0}
                        footer={true}
                        />
                </DateField>
                <label className="labStyle">办理状态</label>
                  <div className="query-value">
                    <Dropdown
                      onChange={this.handleChangeDropdown.bind(this,'qstatusid')}
                      className="query-value"
                       defaultValue={options2[0].value}
                       selection
                       openOnFocus
                       options={options2}
                     />
                  </div>
                <span className="commitBtn" onClick={this.queryData.bind(this,1)}>查询</span>
            </div>
            <div className="weixiu-table">
              <div className="xinzeng-btn"><span onClick={this.onXingzeng.bind(this)} >新增</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={pageCount}
                     gap={2}
                     change={::this.changePager}
                     current ={1}
                     fetching={false}
               /></div>
            </div>
            {this.state.xinzengShow &&
              <div className="gongdan-modal">
                  <div className="title">
                      <span className="btn" onClick={this.onPaifa.bind(this)} >派发</span><span onClick={this.onFanHui.bind(this)} className="btn">返回</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 ul_1b fix">
                      <div className="items fix">
                       {/*
                        <div className="div1"><label><i className="xing">*</i>项目名称：</label></div>
                        <div className="div2">
                                <div className="query-value">
                                              <Dropdown
                                                onChange={this.handleChangeDropdown.bind(this,'projectID')}
                                                className="query-value" defaultValue={companyOptions[0].value}
                                                 selection openOnFocus options={companyOptions}
                                               /></div>


                        </div>*/}

                        <div className="div1"><label><i className="xing">*</i>设备名称：</label></div>
                        <div className="div2"><div className="query-value">
                                              <Dropdown
                                                onChange={this.handleChangeDropdown.bind(this,'deviceAssetID')}
                                                className="query-value" defaultValue={deviceAssetOptions[0].value}
                                                 selection openOnFocus options={deviceAssetOptions}
                                               /></div></div>

                        <div className="div1"><label>关联工单：</label></div>
                        <div className="div2">
                            <span className="selectsMul">

                            {this.state.workOrderLinks.map(function(item){
                              return <span className="selects_item">{item}</span>
                            })}
                            {/*  <span className="selects_item">工单一<i></i></span>
                              <span className="selects_item">工单二<i></i></span>
                              <span className="selects_item">工单三<i></i></span>
                              */}
                            </span>
                            <span className="span-btn" onClick={this.onGuanlian.bind(this)}>关联工单</span></div>




                      </div>
                      {/*
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>类别：</label></div>
                        <div className="div2"><div className="query-value">
                             <Dropdown
                               onChange={this.handleChangeDropdown.bind(this,'workOrderTypeID')}
                               className="query-value"
                                defaultValue={workOrderTypeOptions[0].value}
                                selection
                                openOnFocus
                                options={workOrderTypeOptions}
                              /></div>
                           </div>
                      </div>
                    */}
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>标题：</label></div>
                        <div className="div2"><Input onChange={this.handleChangeInput.bind(this,'title')}/></div>
                        <div className="div1"><label><i className="xing">*</i>紧急程度：</label></div>
                        <div className="div2">

                                <div className="query-value">
                                              <Dropdown
                                                onChange={this.handleChangeDropdown.bind(this,'workOrderLevelID')}
                                                className="query-value" defaultValue={workOrderLevelOptions[0].value}
                                                 selection openOnFocus options={workOrderLevelOptions}
                                  /></div>

                      {/*
                          <span className="label"><Form.Field><Radio
                            label='紧急'
                            name='radioGroup'
                            value='this'
                            checked={this.state.value === 'this'}
                            onChange={this.handleChange}
                          /></Form.Field> </span>
                          <span className="label"><Form.Field><Radio
                            label='一般'
                            name='radioGroup'
                            value='that'
                            checked={this.state.value === 'that'}
                            onChange={this.handleChange}
                          /></Form.Field></span>
                      */}

                          </div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>计划开始时间：</label></div>
                        <div className="div2"><DateField
                              dateFormat="YYYY-MM-DD HH:mm:ss"
                              locale="zh-cn"
                              forceValidDate={true}
                              updateOnDateClick={true}
                              defaultValue={startDatePlan}
                              //value={this.state.startDate}
                              onChange={::this.handleChangeStart}

                              >
                              <DatePicker
                                  navigation={true}
                                  locale="zh-cn"
                                  forceValidDate={true}
                                  highlightWeekends={true}
                                  highlightToday={true}
                                  weekNumbers={true}
                                  weekStartDay={0}
                                  footer={true}
                                  />
                          </DateField></div>
                        <div className="div1"><label><i className="xing">*</i>计划完成时间：</label></div>
                        <div className="div2">
                          <DateField
                            dateFormat="YYYY-MM-DD HH:mm:ss"
                            locale="zh-cn"
                            forceValidDate={true}
                            updateOnDateClick={true}
                            defaultValue={endDatePlan}
                            //value={this.state.endDate}
                            onChange={::this.handleChangeEnd}
                            >
                            <DatePicker
                                navigation={true}
                                locale="zh-cn"
                                forceValidDate={true}
                                highlightWeekends={true}
                                highlightToday={true}
                                weekNumbers={true}
                                weekStartDay={0}
                                footer={true}
                                />
                        </DateField></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>负责人：</label></div>
                        <div className="div2">
                        <div className="query-value">
                          <Dropdown
                            onChange={this.handleChangeDropdown.bind(this,'managerID')}
                             className="query-value"
                             defaultValue={staffOptions[0].value}
                             selection
                             openOnFocus
                             options={staffOptions}
                           /></div>
                        </div>
                        <div className="div1"><label><i className="xing">*</i>工作人员：</label></div>
                        <div className="div2">
                           <span className="selectsMul">

                            {this.state.workOrderStaffNames.map(function(item){

                              // var theName='';
                              // for( var j=0;j<staffData.data.length;j++)
                              // {
                              //     if(staffData.data[j].staffID==item)
                              //     {
                              //       theName= staffData.data[j].name;
                              //     }

                              // }
                              //
                              return <span className="selects_item">{item}</span>
                            })}
                             {/*
                             <span className="selects_item">人员一<i></i></span>
                             <span className="selects_item">人员二<i></i></span>
                             <span className="selects_item">人员三<i></i></span>
                             */}
                           </span>
                           <span className="span-btn" onClick={this.onRenyuan.bind(this)}>选择人员</span></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>预算(元)：</label></div>
                        <div className="div2"><Input onChange={this.handleChangeInput.bind(this,'budgetary')}/></div>
                        <div className="div1"><label><i className="xing">*</i>配件需求：</label></div>
                        <div className="div2">
                          <span className="selectsMul">

                            {/*
                            <span className="selects_item">配件A,3个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                            */}

                            {
                               Object.keys(this.state.workOrderDeviceTypesMap).map(function(key)
                               {

                                  if(othis.state.workOrderDeviceTypesMap[key].quantity!="")
                                  {

                                     // othis.state.workOrderDeviceTypes.push( {deviceTypeID:key,quantity:othis.state.workOrderDeviceTypesMap[key].quantity});
                                      return  <span className="selects_item"> { othis.state.workOrderDeviceTypesMap[key].deviceTypeName +"," + othis.state.workOrderDeviceTypesMap[key].quantity+"个"}</span>
                                  }

                                })


                            }

                          </span>
                          <span className="span-btn" onClick={this.onPeijian.bind(this)} >选择配件</span></div>
                      </div>
                    </div>

                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>问题描述：</label></div>
                        <div className="div3"><TextArea onChange={this.handleChangeInput.bind(this,'issueAttachmentContent')}/></div>
                        <div className="div_fujian div_file"><span><input ref = "issueAttachmentImageBase64s" id="issueAttachmentImageBase64s" onChange={this.handleChangeFile.bind(this,"issueAttachmentImageBase64s")} type="file" /><span className="span-btn file-span">上传文件</span></span>

                         {
                            this.state.issueAttachmentImageBase64sNames.map(function(item){ return  <span>{item} </span> })
                          }

                        </div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>技术方案：</label></div>
                        <div className="div3"><TextArea onChange={this.handleChangeInput.bind(this,'solutionAttachmentContent')}/></div>
                        <div className="div_fujian div_file"><span><input ref = "solutionAttachmentImageBase64s" id="solutionAttachmentImageBase64s"  onChange={this.handleChangeFile.bind(this,"solutionAttachmentImageBase64s")}   type="file" /><span className="span-btn file-span">上传文件</span></span>
                          {
                            this.state.solutionAttachmentImageBase64sNames.map(function(item){ return  <span  key={item} >{item} </span> })
                          }

                           </div>
                      </div>

                      {/* <img ref='testImg' src=''  /> */}



                    </div>
                  </div>
              </div>
            }
            {this.state.paifa &&
              <div className="modal-alert">
                <div className="title">
                  <span>提示</span>
                </div>
                <div className="content">
                  <p>确定要派发？</p>
                </div>
                <div className="footer">
                  <span onClick={this.onPaifaY.bind(this)} >是</span><span onClick={this.onPaifaN.bind(this)}>否</span>
                </div>
              </div>
            }
            {this.state.guanlianGongdan &&
            <div className="modal-alert modal-guanlian">
              <div className="title">
                <div className="fix">
                  <span>工单选择</span>
                  <div className="spans"><span onClick={this.onGuanlianY.bind(this,'gongdan')} >确认</span><span onClick={this.onGuanlianN.bind(this,'gongdan')} >取消</span></div>
                </div>
                <div className="search">
                  <input placeholder="请输入关键字"/><span className="search-btn">搜索</span>
                </div>
              </div>
              <div className="content">
                 <ul>
                   <li className="fix">
                    <span className="li_span1"><Checkbox style={{ visibility:'hidden' }} label={{ children: '' }} /></span>
                    <span>设备名称</span>
                    <span>标题</span>
                    <span>创建时间</span>
                  </li>
                   {
　　　　　　            workOrderData.data.data.map(function(item){
                        var isChk = false;
                        var idx =  othis.state.workOrderLinks.indexOf(item.workOrderID);
                        if(idx>-1) isChk = true;

　　　　　　　　        return <li className="fix"><span className="li_span1"><Checkbox defaultChecked={isChk}  onChange={othis.handleChangeCheckbox.bind(othis,item.workOrderID,"workOrderLinks",item.title)}/></span><span>{item.deviceAssetName}</span><span>{item.title}</span><span> { moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }</span></li>})
　　　　　
　　　　            }
                  </ul>


              </div>
              <div className="footer">
                <Pager total={pageCount}
                       gap={2}
                       change={::this.changePager}
                       current ={1}
                       fetching={false}
                 />
              </div>
            </div>}

            {this.state.renyuan &&
            <div className="modal-alert modal-guanlian">
              <div className="title">
                <div className="fix">
                  <span>人员选择</span>
                  <div className="spans"><span onClick={this.onGuanlianY.bind(this,'renyuan')} >确认</span><span onClick={this.onGuanlianN.bind(this,'renyuan')} >取消</span></div>
                </div>
                <div className="search">
                  <input placeholder="请输入关键字"/><span className="search-btn">搜索</span>
                </div>
              </div>
              <div className="content">
                <ul>
                  <li className="fix">
                    <span className="li_span1"><Checkbox label={{ children: '' }} /></span>
                    <span>姓名</span>
                    <span>职位</span>
                    <span>电话</span>
                  </li>

                    {
　　　　　　            staffData.data.map(function(item){
                        var isChk = false;
                        var idx =  othis.state.workOrderStaffs.indexOf(item.staffID);
                        if(idx>-1) isChk = true;

                        //postInfos
                        var postNames = [];
                        for(var i=0;i<item.postInfos.length;i++)
                            postNames.push(item.postInfos[i].postName);

                        postNames.join(',')
　　　　　　　　        return <li className="fix"><span className="li_span1"><Checkbox defaultChecked={isChk}  onChange={othis.handleChangeCheckbox.bind(othis,item.staffID,"workOrderStaffs",item.name)}/></span><span>{item.name}</span><span>{postNames.join(',')}</span><span> { item.mobile }</span></li>})
　　　　　
　　　　            }

                </ul>
              </div>
              <div className="footer">
                <Pager total={1}
                       gap={2}
                       //change={::this.changePager}
                       current ={1}
                       fetching={false}
                 />
              </div>
            </div>}

            {this.state.peijian &&
              <div className="modal-alert modal-guanlian modal-peijian">
                <div className="title">
                  <div className="fix">
                    <span>配件清单</span>
                    <div className="spans"><span onClick={this.onPeijianN.bind(this)} >确定</span><span onClick={this.onPeijianN.bind(this)} >取消</span></div>
                  </div>
                  <div className="search">
                    <input placeholder="请输入关键字"/><span className="search-btn">搜索</span>
                  </div>
                </div>
                <div className="content">
                  <ul>
                    <li className="fix">
                     {/* <span className="li_span1"><Checkbox style={{ visibility:'hidden' }} label={{ children: '' }} /></span>    */}
                      <span>配件</span>
                      <span>选用数量</span>
                    </li>

                    {

                        //deviceTypeName
　　　　　　            deviceTypeData.data.map(function(item){
                        //var isChk = false;
                        // var idx =  othis.state.workOrderDeviceTypes.indexOf(item.deviceTypeID);
                        // if(idx>-1) isChk = true;
                        var theNum = "";

                        var iType =  othis.state.workOrderDeviceTypesMap[item.deviceTypeID];
                        if( typeof(iType)!='undefined')
                            theNum =  othis.state.workOrderDeviceTypesMap[item.deviceTypeID].quantity;

                        //<span className="li_span1"> <Checkbox defaultChecked={isChk}  onChange={othis.handleChangeCheckbox.bind(othis,item.deviceTypeID,"workOrderDeviceTypes")}/></span>

　　　　　　　　        return <li className="fix"><span>{item.deviceTypeName}</span><span> <Input  defaultValue={theNum} onChange={othis.handleChangeDeviceType.bind(othis,item)}/> </span></li>})
　　　　　
　　　　            }

                  </ul>
                </div>
                <div className="footer">
                  <Pager total={1}
                         gap={2}
                         //change={::this.changePager}
                         current ={1}
                         fetching={false}
                   />
                </div>
              </div>
            }

            {this.state.chakan &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span>工单号：{workOrderInfo.workOrderID}</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onLingqu.bind(this,'linqu')}>领取</span><span onClick={this.onChakanN.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>工单信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">设备名称:</span><span>{workOrderInfo.deviceAssetName} </span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">类别:</span><span>{workOrderInfo.workOrderTypeName}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">标题:</span><span>{workOrderInfo.title}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">派发人:</span><span>{workOrderInfo.name}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">派发时间:</span><span>{moment(workOrderInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">紧急程度:</span><span>{workOrderInfo.workOrderLevelName}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">计划开始时间:</span><span> {moment(workOrderInfo.planingTimeStart).format('YYYY-MM-DD HH:mm:ss')} </span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">计划完成时间:</span><span>{moment(workOrderInfo.planingTimeEnd).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">预算:</span><span>{workOrderInfo.budgetary}元</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">负责人:</span><span>{workOrderInfo.managerID}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">工作人员:</span><span>{workOrderInfo2.workOrderStaffInfos.map(function(item){ return <label>{item.name}&nbsp;&nbsp;</label> }) }       </span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">关联工单:</span><span>{workOrderInfo2.workOrderLinkInfos.map(function(item){ return <label>{item.workOrderIDLink}&nbsp;&nbsp;</label> }) }       </span>
                    </div>




                  </div>
                </div>
                <div className="chakan_item">
                  <span>问题描述</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                   {workOrderInfo2.issueWorkOrderAttachmentIntegratedInfo&&workOrderInfo2.issueWorkOrderAttachmentIntegratedInfo.content}
                  </div>
                </div>
                <div className="chakan_item">
                  <span>技术方案</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    <p>{workOrderInfo2.solutionWorkOrderAttachmentIntegratedInfo&&workOrderInfo2.solutionWorkOrderAttachmentIntegratedInfo.content} </p>
                    <p className="fujian">

                      { workOrderInfo2.solutionWorkOrderAttachmentIntegratedInfo&&workOrderInfo2.solutionWorkOrderAttachmentIntegratedInfo.imageCode&&workOrderInfo2.solutionWorkOrderAttachmentIntegratedInfo.imageCode.map(function(item){
                          return   <span> {item} </span>
                          })
                      }

                    </p>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>配件需求</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                      {workOrderInfo2.workOrderDeviceTypeInfos.map(function(item){
                          return  <span> {item.deviceTypeName}: {item.quantity}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          })
                      }

                  </div>
                </div>
                <div className="chakan_item">
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                      {workOrderInfo2.workOrderFlowInfos.map(function(item){


                           return  <li><span>{item.createDateTime}</span><span>{item.nickName}</span><span>{item.statusName }-{item.workOrderID}</span><span className="span_w">{item.opinion}</span></li>


                          })
                      }



                      {/*
                      <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                      </li>
                      */}

                    </ul>
                  </div>
                </div>
              </div>
            </div>}

            {this.state.chakan2 &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号： {workOrderInfo.workOrderID}</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onLingqu.bind(this,'shangbao')}>上报</span><span onClick={this.onLingqu.bind(this,'zuofei')}>作废</span><span onClick={this.onChakan2N.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>工单信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">处理人:</span><span>{workOrderInfo.name}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">处理人电话:</span><span>134546565700</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">处理结果:</span> <TextArea className="w_1_textarea" onChange={this.handleChangeInput.bind(this,'responseAttachmentContent')}/>
                    </div>
                    <div className="w_1 w_3 fix">
                      <span className="w_1_span1">使用配件:</span>
                      <span className="w_1_span2">
                          <span className="span-btn" onClick={this.onPeijian.bind(this)} >选择配件</span>
                          <span className="selectsMul">
                           {/*
                            <span className="selects_item">配件A,3个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                           */}

                            {
                               Object.keys(this.state.workOrderDeviceTypesMap).map(function(key)
                               {

                                  if(othis.state.workOrderDeviceTypesMap[key].quantity!="")
                                  {

                                      return  <span className="selects_item"> { othis.state.workOrderDeviceTypesMap[key].deviceTypeName +"," + othis.state.workOrderDeviceTypesMap[key].quantity+"个"}</span>
                                  }

                                })


                            }
                          </span>
                          </span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">附件信息:</span>
                      <span className="w_1_span2">
                          <div className="div_file">
                          <input ref = "responseAttachmentImageBase64s" id="responseAttachmentImageBase64s" onChange={this.handleChangeFile.bind(this,"responseAttachmentImageBase64s")} type="file"  /><span className="span-btn file-span">上传文件</span></div>
                          <span className="selectsMul">
                           {/*
                            <span className="selects_item">附件信息1.doc<i></i></span>
                            <span className="selects_item">附件2.doc<i></i></span>
                          */}
                            {
                             this.state.responseAttachmentImageBase64sNames.map(function(item){ return  <span>{item} </span> })
                            }
                          </span>
                       </span>

                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                    {/*
                      <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                      </li>
                      */}
                     {workOrderInfo2.workOrderFlowInfos.map(function(item){
                           return  <li><span>{item.createDateTime}</span><span>{item.nickName}</span><span>{item.statusName }-{item.workOrderID}</span><span className="span_w">{item.opinion}</span></li>

                          })
                      }

                    </ul>
                  </div>
                </div>
              </div>
            </div>}

            {this.state.chakan3 &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号：{workOrderInfo.workOrderID}</span>
                  <div className="chakan_title_btns">
                 {/*  <span onClick={this.onYanshou.bind(this)}>验收</span><span onClick={this.onLingqu.bind(this,'fangong')}>返工</span><span onClick={this.onChakan3N.bind(this)}>返回</span></div> */}
                  <span onClick={this.onChakan3N.bind(this)}>返回</span></div>

                </div>
                <div className="chakan_item">
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">处理人:</span><span>{workOrderInfo.name}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">处理人电话:</span><span>134546565700</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">处理结果:</span><span>  {workOrderInfo.responseName} </span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">使用配件:</span><span>

                        {workOrderInfo2.workOrderDeviceTypeActualInfos.map(function(item){
                          return  <span> {item.deviceTypeName}: {item.quantity}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          })
                        }

                      </span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">附件信息:</span>
                      <span>
                      {/*
                      <p><i className="fujian_icon"></i><span>附件1.doc</span></p>
                      <p><i className="fujian_icon"></i><span>附件附件2.doc</span></p>
                        */}
                      {
                        workOrderInfo2.responseWorkOrderAttachmentIntegratedInfo&&workOrderInfo2.responseWorkOrderAttachmentIntegratedInfo.imageCode&&workOrderInfo2.responseWorkOrderAttachmentIntegratedInfo.imageCode.map(function(item){
                        return   <p><i className="fujian_icon"></i><span> {item}</span></p>
                         })
                      }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                     {/*
                      <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                      </li>
                     */}
                      {workOrderInfo2.workOrderFlowInfos.map(function(item){
                           return  <li><span>{item.createDateTime}</span><span>{item.nickName}</span><span>{item.statusName }-{item.workOrderID}</span><span className="span_w">{item.opinion}</span></li>

                          })
                      }


                    </ul>
                  </div>
                </div>
              </div>
            </div>}
            {this.state.chakan4 &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号：{workOrderInfo.workOrderID}</span>
                  <div className="chakan_title_btns">
                  {/*<span onClick={this.onLingqu.bind(this,'fangong')}>返工</span><span onClick={this.onYanshou.bind(this)}>重验</span>*/} <span onClick={this.onChakan4N.bind(this)}>返回</span>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>工单验收信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">验收人:</span><span>{workOrderInfo.name}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">验收时间:</span><span>2018-6-19 20:00</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">工作评价: {workOrderInfo.evaluate}</span>
                      <span>
                       {    stars.map(function(item){

                                return <i className="star_icon"></i>

                             })

                       }
                      </span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">工作评语:</span><span>  {workOrderInfo.evaluateMemo} </span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">处理结果:</span><span>   {workOrderInfo.responseName} </span>
                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                       {/* <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                        </li>
                       */}
                        {workOrderInfo2.workOrderFlowInfos.map(function(item){
                           return  <li><span>{item.createDateTime}</span><span>{item.nickName}</span><span>{item.statusName }-{item.workOrderID}</span><span className="span_w">{item.opinion}</span></li>

                          })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>}

            {this.state.banli &&
            <div className="modal-alert modal-guanlian modal-banli">
              <div className="title">
                <div className="fix">
                  <span>工单办理</span>
                </div>
              </div>
              <div className="content">
                <div className="banli-item fix">
                  <div className="div1">办理意见：</div>
                  <div className="div2"> <TextArea onChange={this.handleChangeInput.bind(this,'opinion')}/> </div></div>
                <div className="banli-item fix">
                    <div className="div1">下一步：</div>
                    <div className="div2">工单反馈</div></div>
              </div>
              <div className="footer">
                <span onClick={this.onBanliY.bind(this)} >提交</span>
                <span onClick={this.onBanliN.bind(this)}>取消</span>
              </div>
            </div>}

            {this.state.yanshou &&
            <div className="modal-alert modal-guanlian modal-banli modal-yanshou">
              <div className="title">
                <div className="fix">
                  <span>验收</span>
                </div>
              </div>
              <div className="content">
                <div className="banli-item fix">
                  <div className="div1">工作评价：</div>
                  <div className="div2 stars"><i className="star_r star"></i><i className="star_r star"></i><i className="star_r star"></i>
                    <i className="star_w star"></i><i className="star_w star"></i></div></div>
                <div className="banli-item fix">
                  <div className="div1">工作评语：</div>
                  <div className="div2"><textarea></textarea></div></div>
                <div className="banli-item fix">
                  <div className="div1">处理结果：</div>
                  <div className="div2"><div className="query-value">
                                        <Dropdown
                                          className="query-value" defaultValue={options3[0].value}
                                           selection openOnFocus options={options3}
                                         /></div></div></div>
                <div className="banli-item fix">
                    <div className="div1">附件信息：</div>
                    <div className="div2">
                      <div className="div_fujian div_file">
                        <span><input type="file" /><span className="span-btn file-span">上传文件</span></span>
                        <span className="fujian selects_item">附件一.doc<i className="close_icon"></i></span>
                        <span className="fujian selects_item">附件一.doc<i className="close_icon"></i></span>
                        <span className="fujian selects_item">附件一.doc<i className="close_icon"></i></span>
                      </div></div></div>
              </div>
              <div className="footer">
                <span onClick={this.onPaifaY.bind(this)} >提交</span><span onClick={this.onPaifaN.bind(this)}>取消</span>
              </div>
            </div>}

          </div>
        )
    }
  onPaifaN(){
    this.setState({paifa:false,banli:false,yanshou:false})
  }
  onGuanlian(){
    this.setState({guanlianGongdan:true})
  }
  onGuanlianN(glType){
    if(glType=='gongdan')
    {
      //清除已经关联的工单：
      this.setState({workOrderLinks:[]})
    }
    this.setState({guanlianGongdan:false,renyuan:false})
  }

  onGuanlianY(){
    this.setState({guanlianGongdan:false,renyuan:false})
  }
  async onPaifaY(){
    if(this.state.workOrderLinks.length==0||
       this.state.deviceAssetID == -1||
     this.state.workOrderStaffs.length==0||
     this.state.workOrderDeviceTypes.length==0||
     this.state.title==''||
     this.state.budgetary==''||
     this.state.issueAttachmentContent==''||
     this.state.issueAttachmentImageBase64s.length==0){
      alert("信息不完整");
      this.onPaifaN();return;
    }
    var newObj =  {
      "workOrderInfo": {
        "deviceAssetID": this.state.deviceAssetID,  //-- 设备资产编号
        "projectID":  this.state.projectID, //-- 项目编号
        "workOrderTypeID":  this.state.workOrderTypeID,// -- 工单类型编号
        "planingTimeStart": this.state.planingTimeStart, // -- 计划开始时间（时间戳）
        "planingTimeEnd": this.state.planingTimeEnd,// -- 计划完成时间（时间戳）
        "title": this.state.title, //-- 标题
        "budgetary": this.state.budgetary, //-- 预算（可以是小数）
        "expenditure": 0, //-- 实际支出（无需要填写0）
        "managerID": this.state.managerID, //-- 管理人员编号
        "workOrderLevelID": this.state.workOrderLevelID, //-- 紧急程度编号
      },
      "workOrderLinks": this.state.workOrderLinks,  // [ 1, 2] -- 关联工单编号列表
      "workOrderDeviceTypes": this.state.workOrderDeviceTypes,    //-- 工单计划备件编号列表
      "workOrderStaffs": this.state.workOrderStaffs,  //-- 工单人员编号列表
      "issueAttachmentContent": this.state.issueAttachmentContent, //-- 问题描述文字部分，最长2000字
      "issueAttachmentImageBase64s": this.state.issueAttachmentImageBase64s , //-- 问题描述图片列表（Base64编码 MIMO方式)
      "solutionAttachmentContent": this.state.solutionAttachmentContent, //-- 解决方案描述文字部分，最长2000字（选填）
      "solutionAttachmentImageBase64s":   this.state.solutionAttachmentImageBase64s //-- 解决方案图片列表（Base64编码，MIMO方式）（选填）
    };
    const {createWorkorder} = this.props;
    console.log("=================");
    console.log(newObj);
    await createWorkorder( newObj,this.checkResult,this );
    this.setState({paifa:false,xinzengShow:false});

    this.getGongdanList(this.curWorkordertypeid);
  }
  onPeijian(){
    this.setState({peijian:true})
  }
  onPeijianN(){

       //更新this.state.workOrderDeviceTypes的值:
       this.state.workOrderDeviceTypes =[];
       console.log( "1_workOrderDeviceTypes的值: ")
       console.log(  this.state.workOrderDeviceTypes);

        for(var key in this.state.workOrderDeviceTypesMap)
        {
            if(this.state.workOrderDeviceTypesMap[key].quantity!="")
                   this.state.workOrderDeviceTypes.push( {deviceTypeID:key,quantity:this.state.workOrderDeviceTypesMap[key].quantity});
        }

      console.log( "2_workOrderDeviceTypes的值: ")
      console.log(  this.state.workOrderDeviceTypes);

      this.setState({peijian:false})
  }


  //查看
  onChakan(workorderStatusFlag,workOrderID)
  {
    // alert(workorderStatusFlag);
    //this.state[workorderStatusFlag] = true;
    const {getWorkOrderFull } = this.props;
    getWorkOrderFull({orderid:workOrderID});

    var kan = {};
    kan[workorderStatusFlag] = true;
    kan["selectWorkOrderID"] = workOrderID;
    this.setState(kan);
  }

  async onBanliY(){
    console.log( "当前办理类型为: " + this.operateType);
    if(this.operateType == 'linqu'){
      //办理领取:
      //alert("办理领取");
      const {acceptWorkorder}  =this.props;
      var newObj ={
        workOrderID: this.state.selectWorkOrderID,      // -- 工单编号
        opinion: this.state.opinion //-- 办理意见
      };
      console.log("领取工单:");
      console.log(newObj);
      //await acceptWorkorder( newObj,this.checkResult,this );
    }
    else if( this.operateType == 'shangbao'){
      const  {completeJob}  =this.props;
      var newObj ={
        workOrderID: this.state.selectWorkOrderID,      // -- 工单编号
        opinion: this.state.opinion, //-- 办理意见
        responseAttachmentContent: this.state.responseAttachmentContent,
        responseAttachmentImageBase64s: this.state.responseAttachmentImageBase64s,
        workOrderDeviceTypeActuals: this.state.workOrderDeviceTypes
      };
      console.log("上报工单:");
      console.log(newObj);
      await completeJob( newObj,this.checkResult,this );
    }
    this.setState({paifa:false,banli:false,yanshou:false,chakan:false,chakan2:false});

    this.getGongdanList(this.curWorkordertypeid);
  }
  onChakanN(){
    this.setState({chakan:false})
  }
  onChakan2N(){
    this.setState({chakan2:false})
  }
  onChakan3N(){
    this.setState({chakan3:false})
  }
  onChakan4N(){
    this.setState({chakan4:false})
  }

  onLingqu(operateType)
  {
    console.log("设置当前操作类型为: " + operateType);
    this.operateType = operateType;
    this.setState({banli:true})
  }
  onYanshou(){
    this.setState({yanshou:true})
  }
  onRenyuan(){
    this.setState({renyuan:true})
  }
  handleChange = (e, { value }) => this.setState({ value })
  //工单列表
  getGongdanList(workordertypeid){
    const {getWorkOrder} = this.props;
    var q = {
      workordertypeid:workordertypeid,
      pagesize:10,
      pageno:1}
    getWorkOrder(q);

  }

  handleChangeInput(code,ev)
  {
    console.log("改变input," + code + " ====" +  ev.target.value )
   // this.setState({[code]:ev.target.value})  //"gongWeiCode"
    this.state[code] =  ev.target.value;

  }

  changePager(id)
  {

     // const { getMonthReportNow,monthReportNow}  =this.props;

     // if(id>monthReportNow.data.page.totalCount/monthReportNow.data.page.pageSize+1) return;

     // this.setState({fetchcditem: true,page:id});
      this.queryData(id);

  }

  handleChangeStart(strTime,mTime){

     // var sf = mTime.dateMoment.valueOf();
    this.state.planingTimeStart = mTime.dateMoment.valueOf();
    console.log("planingTimeStart:  --- " +  this.state.planingTimeStart)

  }
  handleChangeEnd(strTime,mTime){
     this.state.planingTimeEnd = mTime.dateMoment.valueOf();
      console.log("planingTimeEnd:  --- " +  this.state.planingTimeEnd)
  }




  handleChangeDropdown(code,ev,obj)
  {
    console.log("改变DropDown," + code + " ====" +  obj.value )
   // this.setState({[code]:ev.target.value})  //"gongWeiCode"
    this.state[code] =  obj.value;


  }

  handleChangeCheckbox(code,checkType,name,ev,obj)
  {
       //checkType 为类型, 如：workOrderStaffs workOrderLinks
          if(obj.checked)
          {
                this.state[checkType].push(code);
                if(checkType=='workOrderStaffs')
                   this.state.workOrderStaffNames.push(name);
          }
          else
          {
              var idx =  this.state[checkType].indexOf(code);
              if(idx>-1)
              {
                    this.state[checkType].splice(idx, 1);

                    if(checkType=='workOrderStaffs')
                      this.state.workOrderStaffNames.splice(idx, 1);
              }

          }

         // checkType = 'workOrderLinks' //数组，用来存元素workOrderCode

  }


handleChangeDeviceType(deviceTypeObj,ev,obj)
{

     //debugger;
    var iObj =   {deviceTypeID:deviceTypeObj.deviceTypeID,deviceTypeName:deviceTypeObj.deviceTypeName, quantity:obj.value   } ;
    this.state.workOrderDeviceTypesMap[deviceTypeObj.deviceTypeID] =iObj;
     console.log(iObj);

   // this.state.workOrderDeviceTypes.push(  {deviceTypeID:obj.value}  )

   //console.log("以下输出第一个元素：");
   //console.log(this.state.workOrderDeviceTypesMap[0]);


      // workOrderDeviceTypesMap["1"]={ "deviceTypeID": 1, // -- 备件编号
      //                                     "quantity": 1   //-- 备件数量
      //       deviceTypeName
      //                                    }

}


  onXingzeng(){
    const { getWorkOrder} = this.props;
    var q = {
      workordertypeid:this.curWorkordertypeid,
      pagesize:12,
      pageno:1
      // deviceassetid:this.state.qlayoutID,
      // statusid:this.state.qstatusid,
      // createtimestart:moment(this.refs.theSTime.getInput().value).toDate().getTime(),
      // createtimeend:moment(this.refs.theETime.getInput().value).toDate().getTime()
    }
    console.log(q);
    getWorkOrder( q );
    this.setState({xinzengShow:!this.state.xinzengShow,paifa:false,guanlianGongdan:false,peijian:false,chakan2:false})
  }
  onFanHui(){
    //var {workOrderData  }  =this.props;
    //workOrderData
    this.setState({xinzengShow:!this.state.xinzengShow,paifa:false,guanlianGongdan:false,peijian:false,chakan2:false});
  }
  onPaifa(){
    this.setState({paifa:true})
  }
  checkResult(res,t){
    if(res.resultCode==0){
      //alert("派发成功");
      alert(res.resultMessage);
      //t.closeCreate();
    }
  }
handleChangeFile(fileID,o,t){
  var reader = new FileReader();
  var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
  //var file = $("#issueAttachmentContent")[0].files[0];
  var file = this.refs[fileID].files[0];
  var imgUrlBase64;
        if (file) {
          //将文件以Data URL形式读入页面
          imgUrlBase64 = reader.readAsDataURL(file);
          console.log(fileID);
          //console.log(reader.result);
          if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length){
            alert( '上传失败，请上传不大于2M的图片！');
            return;
          }
          setTimeout(function(reader,fileID,t){
              console.log("上传文件内容: ");
              console.log( reader.result);
             // this.state[fileID].push(reader.result.substring(reader.result.indexOf(",") + 1) );
              t.state[fileID].push(reader.result);
          }, 1000,reader,fileID,this);

          //更新上传文件名列表:
          var attNames = fileID+'Names';
          // this.state[attNames].push(file.name);
          var tt= {};
          tt[attNames] = [];
          this.state[attNames].map(function(t){   tt[attNames].push(t)   })
          tt[attNames].push(file.name);
          this.setState(tt);
          console.log( attNames +",上传文件名: " + file.name);
          // while(  reader.result.length==0)
          // {

          //   //this.state[fileID].push(reader.result);
          //   console.log(fileID +": 内容为空," +  reader.result );
          //  // console.log(  reader.result);

          //      if( reader.result.length>0) break;

          // }

         // console.log(  reader.result);


          // else
          // {

          //    console.log(fileID +": 内容为空");
          //    console.log(   reader.result );


          // }


             // if(reader.result && reader.result.length>0)
             //      this.setState({testImg:reader.result});


            //测试上传的图片文件:
           // this.refs.testImg.src = reader.result;
            // reader.onload = function (e)
            // {
            //       //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            //       if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
            //             alert( '上传失败，请上传不大于2M的图片！');
            //             return;
            //         }else{
            //             //执行上传操作
            //             alert(reader.result);
            //         }
            // }
         }
  }
  queryData(curPageno){
    const { getWorkOrder} = this.props;
    var q = {
      pagesize:10,
      pageno:curPageno,
      workordertypeid:this.curWorkordertypeid,
      layoutid:this.state.qlayoutID,
      statusid:this.state.qstatusid,
      createtimestart:moment(this.refs.theSTime.getInput().value).toDate().getTime(),
      createtimeend:moment(this.refs.theETime.getInput().value).toDate().getTime()
    }
    getWorkOrder(q);
  }
  openUpdate(){}
  componentWillReceiveProps(nextprops){
    var nextp= nextprops.location.query.project;
    var thisp = this.props.location.query.project;
    var curWorkordertypeid = 1;
    if(thisp!=nextp){
      if(nextp=="wx"){curWorkordertypeid = 3; }
      else if(nextp=="dj")  {curWorkordertypeid = 1; }
      else if(nextp=="dx")  {curWorkordertypeid = 2; }
      else if(nextp=="byrw")  {curWorkordertypeid = 4; }
      this.getGongdanList(curWorkordertypeid);
    }
  }
  componentDidMount() {
    const {getWorkOrderStatus,getDeviceAsset} = this.props;
    getWorkOrderStatus({});
    getDeviceAsset({});
    this.getGongdanList(4);
  }
  componentWillMount(){}
  componentWillUnmount() {}
}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.baoyangrenwu, mapDispatchToProps)(BaoyangRenwu);
