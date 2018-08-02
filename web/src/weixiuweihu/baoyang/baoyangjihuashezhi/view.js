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
import {Icon, Dropdown, Menu,Input,Form,Radio,Checkbox,TextArea} from 'semantic-ui-react'
import Pager from '../../../common/components/Pager'

import moment from 'moment'
import Menus from '../../../common/components/Menus'
class BaoyangJihuaShezhi extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {


            //查询用:
            qlayoutID:-1,
            qname:'',


            //创建
            layoutid:-1,
            workOrderDeviceTypes:[],
            workOrderDeviceTypesMap:{}, //辅助workOrderDeviceTypes使用
            maintenenceType:1,
            period:0,
            periodtype:1,
            deviceAssetID:-1,
            description:'',
            maintenanceCode:'',
            maintenanceFactory:'',
            timeConsuming:0,
            title:'',


            //deviceDataOptions:  [ { key: -1, text: '请选择', value: -1 }],
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            deviceType:'quanbu',
            xinzeng:false,
            xiugai:false,
            chakan:false,
            peijian:false,
            bengzu:[],
            shebei:[],


            //选择某项：
            //mainPlanSetDetailData.data.layoutID 
            curLayoutID:-1,
            curStartTime:1531538019000,
            curEndTime:1531538019000,
            curDeviceAssetID:-1,
            curPeriodtype:-1,
            curPlan:{}
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }


     
    // onXiugai(){
    //   this.setState({xinzeng:true})
    // }


     onXiugai(statusFlag,maintenencePlan)
    {


        var maintenencePlanID  = maintenencePlan.maintenencePlanID;

         const { getMainplansetDetail } = this.props;
        // getDeviceByType({devicetypeid:devicecountID});
        // getMainplansetDetail({id:maintenencePlanID});
         var kan = {};
         kan[statusFlag] = true;
         kan["selectDevicecountID"] = maintenencePlanID;
         kan["curLayoutID"] =  maintenencePlan.layoutID; 

        kan["curStartTime"] =  maintenencePlan.startTime; 
        kan["curEndTime"] =  maintenencePlan.endTime; 
             
       kan["curDeviceAssetID"] = maintenencePlan.deviceAssetID;
       kan["deviceAssetID"]    = maintenencePlan.deviceAssetID;
        kan["curPeriodtype"] = maintenencePlan.periodtype;
        
         kan["curPlan"] = maintenencePlan;
        //kan["deviceAssetID"] = maintenencePlan.deviceAssetID;

//periodtype 
         this.setState(kan);
 

this.state.description =  maintenencePlan.description;
this.state.periodtype = maintenencePlan.periodtype;
this.state.maintenenceType  = maintenencePlan.maintenenceType;
//this.state.deviceAssetID  = maintenencePlan.deviceAssetID;
this.state.period  = maintenencePlan.period;
this.state.title  = maintenencePlan.title;


   //                    "description": this.state.description,
   //                    "periodtype": this.state.periodtype,
   //                    "maintenenceType": this.state.maintenenceType,
   //                    "deviceassetid": this.state.deviceAssetID,
   //                    "period": parseInt(this.state.period),
   //                    "title":  this.state.title,





         this.onClickBengzhan(null,{value:maintenencePlan.layoutID});
        // this.handleChangeDropdown('periodtype',this,{value: maintenencePlan.periodtype });

    }




    onXiugaiN(){
      this.setState({xiugai:false,chakan:false})
    }

    onXiugaiY()
    {
     

       if(this.state.layoutid==-1 ||    
       //   this.state.deviceAssetID==-1||
          this.state.description==''||
         // this.state.workOrderDeviceTypes.length==0||
         // this.state.maintenanceCode==''||
        //  this.state.maintenanceFactory==''||
          this.state.period==0||
         // this.state.timeConsuming==0||
          this.state.title=='')
          {  
             alert("内容不完整");return;
          }

 
       this.setState({xiugai:false,chakan:false})
      var t1 = moment(this.refs.theStarttime2.getInput().value).format('YYYY-MM-DD 00:00:00');
      var t2 = moment(this.refs.theEndtime2.getInput().value).format('YYYY-MM-DD 00:00:00');
      console.log(t1);
      console.log(t2);

      var fittings = [];

      this.state.workOrderDeviceTypes.map(function(item){
            fittings.push({fittingid:parseInt(item.categoryid) ,fittingnum:parseInt(item.quantity)})       })

      var assetID = this.state.deviceAssetID;

      if(this.state.deviceAssetID==-1)  assetID = this.state.curDeviceAssetID;

       
      var newObj = {
                      "maintenenceplanid":this.state.selectDevicecountID,
                      "starttime":t1,
                      "endtime":t2,
                      "description": this.state.description,
                      "periodtype": this.state.periodtype,
                      "maintenencetype": this.state.maintenenceType,
                      "deviceassetid": assetID,//this.state.deviceAssetID,
                      "period": parseInt(this.state.period),
                      "title":  this.state.title,
                   //   "timeConsuming":  parseInt(this.state.timeConsuming),
                   //   "maintenanceFactory":this.state.maintenanceFactory,
                   //   "maintenanceCode":this.state.maintenanceCode,
                      "layoutID":this.state.layoutid,
                    //  "fitting":  fittings
                  }

       console.log(newObj);
       const {updatePlan} = this.props;
       updatePlan(newObj,this);





    }

    onXinzeng(){
      this.setState({xinzeng:true})
    }
    onXingzengN(){
      this.setState({xinzeng:false,chakan:false})
    }


    onXingzengY()
    {

       if(this.state.layoutid==-1 ||
          this.state.deviceAssetID==-1||
          this.state.description==''||
         // this.state.workOrderDeviceTypes.length==0||
         // this.state.maintenanceCode==''||
        //  this.state.maintenanceFactory==''||
          this.state.period==0||
         // this.state.timeConsuming==0||
          this.state.title=='')
          {
             alert("内容不完整");return;
          }

      this.setState({xinzeng:false,chakan:false})
      var t1 = moment(this.refs.theStarttime.getInput().value).format('YYYY-MM-DD 00:00:00');
      var t2 = moment(this.refs.theEndtime.getInput().value).format('YYYY-MM-DD 00:00:00');

        //    var t1 = moment(this.refs.theStarttime2.getInput().value).format('YYYY-MM-DD 00:00:00');
      console.log(t1);
      console.log(t2);

      var fittings = [];

      this.state.workOrderDeviceTypes.map(function(item){
            fittings.push({fittingid:parseInt(item.categoryid) ,fittingnum:parseInt(item.quantity)})       })

      var newObj = {
                      "starttime":t1,
                      "endtime":t2,
                      "description": this.state.description,
                      "periodtype": this.state.periodtype,
                      "maintenenceType": this.state.maintenenceType,
                      "deviceassetid": this.state.deviceAssetID,
                      "period": parseInt(this.state.period),
                      "title":  this.state.title,
                   //   "timeConsuming":  parseInt(this.state.timeConsuming),
                   //   "maintenanceFactory":this.state.maintenanceFactory,
                   //   "maintenanceCode":this.state.maintenanceCode,
                      "layoutID":this.state.layoutid,
                    //  "fitting":  fittings
                  }

       console.log(newObj);
       const {addFitting} = this.props;
       addFitting(newObj,this);

    }


    // onChakan(){
    //   this.setState({chakan:true})
    // }


    onChakan(statusFlag,maintenencePlanID)
    {

         const { getMainplansetDetail } = this.props;
        // getDeviceByType({devicetypeid:devicecountID});
         getMainplansetDetail({id:maintenencePlanID});
         var kan = {};
         kan[statusFlag] = true;
         kan["selectDevicecountID"] = maintenencePlanID;
         this.setState(kan);
    }



    onPeijian(){
      this.setState({peijian:true})
    }
    onPeijianN(){
      this.setState({peijian:false})
    }


    onPeijianY(){

         //更新this.state.workOrderDeviceTypes的值:
         this.state.workOrderDeviceTypes =[];
         console.log( "配件1_workOrderDeviceTypes的值: ")
         console.log(  this.state.workOrderDeviceTypes);

          for(var key in this.state.workOrderDeviceTypesMap)
          {
              if(this.state.workOrderDeviceTypesMap[key].quantity!="")
                     this.state.workOrderDeviceTypes.push( {categoryid:key,quantity:this.state.workOrderDeviceTypesMap[key].quantity});
          }

        console.log( "配件2_workOrderDeviceTypes的值: ")
        console.log(  this.state.workOrderDeviceTypes);

        this.setState({peijian:false})
    }



    handleChange = (e, { value }) => this.setState({ value })

    onClickBengzhan(ev,obj){

 
         const {getDevicecount } = this.props;

         var q = {
                    pagesize:20,
                    pageno:1,
                    layoutid:obj.value
                    //name:this.state.qname
                 }

        console.log(q);

        getDevicecount(q,this);

        this.setState({layoutid:obj.value,deviceAssetID:-1})
        console.log("改变DropDown,layoutid===" + obj.value );

      // var bz = [{key:'bz1',text:'1#泵组',value:'1'},{key:'bz2',text:'2#泵组',value:'2'},{key:'bz3',text:'3#泵组',value:'3'},
      //           {key:'bz4',text:'4#泵组',value:'4'},{key:'bz5',text:'1#泵组',value:'5'},{key:'bz6',text:'2#泵组',value:'6'},{key:'bz7',text:'3#泵组',value:'7'}];
      //  bz = bz.sort(function() {
      //           return (0.5-Math.random());
      //       });
      // this.setState({bengzu:bz,shebei:[]})


    }


   bengZhanResult(res,t)
   {

    // alert(res.resultMessage);
    // this.setState({deviceDataOptions:deviceDataOptions})
    // if(res.resultCode==0)
        //  t.closeCreate();

   }

   checkResult(res,t)
   {

       alert(res.resultMessage);
    }

    onClickBengzu(){

      // var sbei = [{key:'b1',text:'101#水泵',value:'1'},{key:'b2',text:'1#电机',value:'2'},
      // {key:'b3',text:'102#水泵',value:'3'},{key:'b4',text:'3#电机',value:'4'}];
      // this.setState({shebei:sbei})
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        let title = "";
        var othis = this;
        // var {  devicecountData,layoutData,deviceByTypeData,devicetypeData,deviceInfoData}  =this.props;
        var {  devicecountData,layoutData,deviceByTypeData,deviceInfoData,fittingsData,mainPlanSetData,mainPlanSetDetailData}  =this.props;   //devicetypeData


        let project =this.props.location.query.project;
          title += project=="jbxx"?"基本信息":project=="wbjh"?"维保计划":project=="wbjl"?"维保记录":"基本信息"

        const thead=[{width:"5%",value:"编号"},{width:"15%",value:"泵站"},{width:"20%",value:"设备"},{width:"20%",value:"维保开始日期"}
                    ,{width:"15%",value:"维保周期"},{width:"20%",value:"标题"},{width:"5%",value:"操作"},{width:"10%",value:""}]

        const options =[
          { key: 1, text: '维修', value: 1 },
          { key: 2, text: '保养', value: 2 }
        ]


        //管理层级
        var layoutDataOptions =[ { key: -1, text: '请选择', value: -1 }];
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


       // 设备选择
      
       var deviceDataOptions =[ { key: -1, text: '请选择', value: -1 }];
        //const {devicecountData} = this.props;
        if(devicecountData&&devicecountData.resultCode==0)
        {
         
        
            for(var i=0;i<devicecountData.data.data.length;i++)
            {
                  var newOpt = {};
                  newOpt.key = devicecountData.data.data[i].deviceAssetID;
                  newOpt.value = devicecountData.data.data[i].deviceAssetID;
                  newOpt.text = devicecountData.data.data[i].deviceAssetName;
                  deviceDataOptions.push(newOpt );
            }
        }


      // 保养周期类型选择
       var maintainPeriodOptions =[ //{ key: -1, text: '请选择', value: -1 },
                                    { key: 1, text: '时间周期', value: 1 },{ key: 2, text: '运行时间', value:2 } ,{ key: 3, text: '临时任务', value:3 }];


      // 保养周期类型选择
       var periodValueOptions =[ { key: 1, text: '月/次', value:1 },
                                    { key: 2, text: '季度/次', value: 2 },{ key: 3, text: '年/次', value:3 } ];



        // const tbody=[[1,"保养","101#水泵","2018-02-12","月",<span><i>修改</i><i onClick={this.onChakan.bind(this)}>查看</i></span>],
        //   [2,"","102#水泵","2018-03-02","",<span><i>修改</i><i onClick={this.onChakan.bind(this)}>查看</i></span>],
        //   [3,"","","","",""],
        //   [4,"","","","",""],
        //   [5,"","","","",""],
        //   [6,"","","","",""]
        // ]

        const bengzhan = [{key:'z1',text:"28#泵站",value:"1"},
                          {key:'z2',text:"38#泵站",value:"2"},
                          {key:'z3',text:"黄河泵站",value:"3"},{key:'z4',text:"6#泵站",value:"4"}];

        let {bengzus,shebeis} = this.state
        //const bengzu = [{key:1,text:'1#泵组',value:'1'},{key:2,text:'2#泵组',value:'2'},{key:3,text:'3#泵组',value:'3'},{key:4,text:'4#泵组',value:'4'},{key:1,text:'1#泵组',value:'1'},{key:2,text:'2#泵组',value:'2'},{key:3,text:'3#泵组',value:'3'},{key:4,text:'4#泵组',value:'4'}];
        //const shebei = [{key:1,text:'101#水泵',value:'1'},{key:2,text:'1#电机',value:'2'},{key:3,text:'102#水泵',value:'3'},{key:4,text:'3#电机',value:'4'}];




        var tbody=[];
        var pageCount = 0;
        if(mainPlanSetData && mainPlanSetData.resultCode == 0 )
          {


                   pageCount = mainPlanSetData.data.pageCount;
                   for(var i=0;i<mainPlanSetData.data.data.length;i++)
                   {
                        var  arr = new Array();

                        var workOrderTypeName = "维修";

                        var updateTime = moment (mainPlanSetData.data.data[i].updaetTime).format('YYYY-MM-DD HH:mm:ss');

                        // var btnHtml = <Button style={ { fontSize:"14px"}}    color='teal'  onClick={this.openUpdate.bind(this,mainPlanSetData.data[i])}>查看</Button>

                        // var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>
                        var  statusFlag = "chakan";
                        var sid = mainPlanSetData.data.data[i].statusID;

// HH:mm:ss
                        var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,"chakan",mainPlanSetData.data.data[i].maintenencePlanID)} >查看</span> 
                        var xiugaiHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onXiugai.bind(this,'xiugai',mainPlanSetData.data.data[i])} >修改</span>

                        var arr = [mainPlanSetData.data.data[i].maintenencePlanID, mainPlanSetData.data.data[i].layoutName,mainPlanSetData.data.data[i].deviceAssetName, moment(mainPlanSetData.data.data[i].startTime).format('YYYY-MM-DD'),mainPlanSetData.data.data[i].period,mainPlanSetData.data.data[i].title,xiugaiHtml,btnHtml];  //mainPlanSetData.data.data[i].num,
                        tbody.push(arr);


                   }
          }




    var mainTypeStr = '';
    if(mainPlanSetDetailData&&mainPlanSetDetailData.data.periodtype==1)
    {

       var mainType = mainPlanSetDetailData.data.maintenenceType;
       if(mainType==1)  mainTypeStr = '月/次';
       else if(mainType==2)  mainTypeStr = '季度/次';
       else if(mainType==3)  mainTypeStr = '年/次';
       else mainTypeStr = '';
    }
        const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}

        return (
          <div className="table-baoyangjihuashezhi" style={BodyStyle} >
           <h3>&nbsp;</h3>
            {/*<h3 className="weixiu-title labStyle">{title}</h3> */}
             {/*
            <div className="sub-title fix">

              <span className={-1 == this.state.qlayoutID? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,-1)} >全部</span>

              { layoutData&&layoutData.resultCode==0&&layoutData.data.map(function(item){

              return <span key={item.layoutID} className={item.layoutID == othis.state.qlayoutID? "itab active" : 'itab'} onClick={othis.selectDeviceType.bind(othis,item.layoutID)}>{item.layoutName}</span>

              } )}


              <span className={'quanbu' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'quanbu')} >全部</span>
              <span className={'28' == this.state.deviceType? "itab {key:1,text:'28#泵站',value='1'},{key:1,text:'28#泵站',value='1'},active" : 'itab'} onClick={this.selectDeviceType.bind(this,'28')}>28#泵站</span>
              <span className={'38' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'38')}>38#泵站</span>
              <span className={'huanghe' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'huanghe')}>黄河泵站</span>
              <span className={'6' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'6')}>6#泵站</span>

 HH:mm:ss
            </div> */}
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

                <span className="query-name labStyle">设备名称</span>
                  <Input type="text" className="query-value" ref="deviceName" onChange={this.handleChangeInput.bind(this,'qname')} />
                <label className="labStyle">开始时间</label>
                    <DateField ref='qStarttime'
                        dateFormat="YYYY-MM-DD"
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
                    <DateField ref='qEndtime'
                    dateFormat="YYYY-MM-DD"
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
                <span className="commitBtn" onClick={this.queryData.bind(this,1)}>查询</span>
            </div>
            <div className="weixiu-table">
              <div className="xinzeng-btn"><span onClick={this.onXinzeng.bind(this)} >新增</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={pageCount}
                     gap={2}
                     change={::this.changePager}
                     current ={1}
                     fetching={false}
               /></div>
            </div>
            {this.state.xinzeng &&
              <div className="modal-xinzeng">
                  <div className="title">
                      <span className="btn" onClick={this.onXingzengY.bind(this)} >保存</span><span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
                        {/*
                        <div className="div1"><label>类型：</label></div>
                        <div className="div2 div_time"><div className="query-value">
                                              <Dropdown
                                                className="query-value" defaultValue={options[0].value}
                                                 selection openOnFocus options={options}
                                               /></div></div>
                        */}

                       <div className="div1"><label>设备名称：</label></div>
                       <div className="div2 div_time">
                         <Dropdown
                           className="query-value" style={{width:'160px'}} defaultValue={layoutDataOptions[0].value}
                            selection openOnFocus options={layoutDataOptions} onChange={this.onClickBengzhan.bind(this)}
                          /> 
                        </div>

                        <div className="div2 div_time">

                                          <Dropdown
                                           onChange={this.handleChangeDropdown.bind(this,'deviceAssetID')}
                                           className="query-value" defaultValue={deviceDataOptions[0].value}
                                            selection openOnFocus options={deviceDataOptions}
                                          /> 

                        </div>





                      </div>
                      <div className="items fix">
                        <div className="div1"><label>周期类型：</label></div>
                        <div className="div2 div_time ">
                                 <Dropdown onChange={this.handleChangeDropdown.bind(this,'periodtype')}
                                     className="query-value" defaultValue={maintainPeriodOptions[0].value}
                                     selection openOnFocus options={maintainPeriodOptions}
                                   />
                        </div>

                        <div className="div1 divlbl"><span ref='periodName'>保养周期：</span></div>
                        <div className="div2  "> <div  ref='periodInput'className="query-value2"><Input  onChange={this.handleChangeInput.bind(this,'period')}  />   </div>
                                 <div ref='periodDrop' className="query-value2"><Dropdown   onChange={this.handleChangeDropdown.bind(this,'maintenenceType')} defaultValue={periodValueOptions[0].value} selection openOnFocus options={periodValueOptions} /></div>


                        </div>




                      </div>
                      <div className="items fix">
                        <div className="div1"><label>时间范围：</label></div>
                        <div className="div2 div_time"><DateField ref="theStarttime"
                              dateFormat="YYYY-MM-DD"
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
                          </DateField></div>
                        {/*<div className="div1"><label>结束日期：</label></div> */}
                        <div className="div2 div_time">
                          <DateField ref="theEndtime"
                            dateFormat="YYYY-MM-DD"
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
                        </DateField></div>
                      </div>

                    {/*
                      <div className="items fix">
                        <div className="div1"><label>维保厂家：</label></div>
                        <div className="div2"><Input type="text" onChange={this.handleChangeInput.bind(this,'maintenanceFactory')}/></div>
                        <div className="div1"><label>维保电话：</label></div>
                        <div className="div2"><Input type="text" onChange={this.handleChangeInput.bind(this,'maintenanceCode')} /></div>
                      </div>
                      */}
                      <div className="items fix">
                        <div className="div1"><label>保养标题：</label></div>
                        <div className="div3"><TextArea onChange={this.handleChangeInput.bind(this,'title')} ></TextArea></div>
                        </div>
                    

                      <div className="items fix">
                        <div className="div1"><label>保养内容：</label></div>
                        <div className="div3"><TextArea onChange={this.handleChangeInput.bind(this,'description')}></TextArea></div>
                      </div>
       


                    </div>
                  </div>
              </div>}



     {this.state.xiugai &&
              <div className="modal-xinzeng">
                  <div className="title">
                      <span className="btn" onClick={this.onXiugaiY.bind(this)} >保存</span><span onClick={this.onXiugaiN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
             
                       <div className="div1"><label>设备名称：</label></div>
                       <div className="div2 div_time">
                         <Dropdown
                           className="query-value" style={{width:'160px'}} defaultValue= {  this.state.curLayoutID }
                            selection openOnFocus options={layoutDataOptions} onChange={this.onClickBengzhan.bind(this)}
                          /> 
                        </div>

                        <div className="div2 div_time">

                                          <Dropdown
                                           onChange={this.handleChangeDropdown.bind(this,'deviceAssetID')}
                                           className="query-value" defaultValue={ this.state.curDeviceAssetID}
                                            selection openOnFocus options={deviceDataOptions}
                                          /> 

                        </div>




                      </div>
                      <div className="items fix">
                        <div className="div1"><label>周期类型：</label></div>
                        <div className="div2 div_time ">
                                 <Dropdown onChange={this.handleChangeDropdown.bind(this,'periodtype')}
                                     className="query-value" defaultValue={ this.state.curPeriodtype}
                                     selection openOnFocus options={maintainPeriodOptions}
                                   />
                        </div>

                        <div className="div1 divlbl"><span ref='periodName'>保养周期：</span></div>
                        <div className="div2  "> <div  ref='periodInput'className="query-value2"><Input  onChange={this.handleChangeInput.bind(this,'period')} defaultValue={ this.state.curPlan.period } />   </div>
                                 <div ref='periodDrop' className="query-value2"><Dropdown   onChange={this.handleChangeDropdown.bind(this,'maintenenceType')} defaultValue={ this.state.curPlan.maintenenceType } selection openOnFocus options={periodValueOptions} /></div>


                        </div>




                      </div>
                      <div className="items fix">
                        <div className="div1"><label>时间范围：</label></div>
                        <div className="div2 div_time"><DateField ref="theStarttime2"
                              dateFormat="YYYY-MM-DD"
                              locale="zh-cn"
                              forceValidDate={true}
                              updateOnDateClick={true}
                              defaultValue= {moment( this.state.curStartTime).format('YYYY-MM-DD')} 
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
                          </DateField></div>
                        {/*<div className="div1"><label>结束日期：</label></div> */}
                        <div className="div2 div_time">
                          <DateField ref="theEndtime2"
                            dateFormat="YYYY-MM-DD"
                            locale="zh-cn"
                            forceValidDate={true}
                            updateOnDateClick={true}
                            defaultValue= {moment( this.state.curEndTime).format('YYYY-MM-DD')}
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
                        </DateField></div>
                      </div>
 
                      <div className="items fix">
                        <div className="div1"><label>保养标题：</label></div>
                        <div className="div3"><TextArea defaultValue={ this.state.curPlan.title } onChange={this.handleChangeInput.bind(this,'title')} /> </div>
                        </div>
                    

                      <div className="items fix">
                        <div className="div1"><label>保养内容：</label></div>
                        <div className="div3"><TextArea defaultValue={ this.state.curPlan.description } onChange={this.handleChangeInput.bind(this,'description')}/> </div>
                      </div>
       


                    </div>
                  </div>
              </div>}







              {this.state.peijian &&
                <div className="modal-alert modal-guanlian modal-peijian">
                  <div className="title">
                    <div className="fix">
                      <span>配件清单</span>
                      <div className="spans"><span onClick={this.onPeijianY.bind(this)} >确定</span><span onClick={this.onPeijianN.bind(this)} >取消</span></div>
                    </div>
                    <div className="search">
                      <input placeholder="请输入关键字"/><span className="search-btn">搜索</span>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li className="fix">
                        <span>配件</span>
                        <span>选用数量</span>
                      </li>
                      {/*
                      <li className="fix">
                        <span>配件1</span>
                        <span><input type="text"/></span>
                      </li>

                      {

　　　　　　            fittingsData.data.data.map(function(item){
                        var theNum = "";

                        var iType =  othis.state.workOrderDeviceTypesMap[item.categoryid];
                        if( typeof(iType)!='undefined')
                            theNum =  othis.state.workOrderDeviceTypesMap[item.categoryid].quantity;

　　　　　　　　        return <li className="fix"  ><span>{item.name}</span><span> <Input  defaultValue={theNum} onChange={othis.handleChangeDeviceType.bind(othis,item)}/> </span></li>})
　　　　　
　　　　            }*/}


                    </ul>
                  </div>
                  <div className="footer">
                   {/*
                    <Pager total={5}
                           gap={2}
                           //change={::this.changePager}
                           current ={1}
                           fetching={false}
                     />
                     */}

                  </div>
                </div>
              }


            {this.state.chakan &&
              <div className="modal-xinzeng modal-chakan">
                  <div className="title">
                      <span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">

                        <div className="div1"><label>设备名称：</label></div>
                        <div className="div1 div2 div1_tl">{ mainPlanSetDetailData.data.deviceAssetName }</div>
                      </div>
                      <div className="items fix">
                       {/*
                        <div className="div1"><label>是否周期性安排：</label></div>
                        <div className="div1 div1_tl">是</div>

                        <div className="div1"><label>维保周期：</label></div>
                        <div className="div1 div1_tl">2月/次</div>
                       */}

                        { mainPlanSetDetailData.data.periodtype==1&&<div><div className="div1"><label>保养周期：</label></div><div className="div1 div1_tl"> {mainPlanSetDetailData.data.period} {mainTypeStr}</div></div> }
                        { mainPlanSetDetailData.data.periodtype==2&&<div><div className="div1"><label>运行时长(h)：</label></div><div className="div1 div1_tl"> {mainPlanSetDetailData.data.period}</div></div> }


                      </div>
                      <div className="items fix">
                        <div className="div1"><label>时间范围：</label></div>
                        <div className="div1 div1_tl" style={{width:'360px'}}>{moment( mainPlanSetDetailData.data.startTime).format('YYYY-MM-DD')}至{moment( mainPlanSetDetailData.data.endTime).format('YYYY-MM-DD')}</div>
                        
                      </div>
                    {/*

                      <div className="div1"><label>结束日期：</label></div>
                        <div className="div1 div1_tl">{moment( mainPlanSetDetailData.data.endTime).format('YYYY-MM-DD HH:mm:ss')}</div>


                      <div className="items fix">
                        <div className="div1"><label>维保厂家：</label></div>
                        <div className="div1 div1_tl">{mainPlanSetDetailData.data.maintenanceFactory}</div>
                        <div className="div1"><label>维保电话：</label></div>
                        <div className="div1 div1_tl">{mainPlanSetDetailData.data.maintenanceCode}</div>
                      </div>

                      <div className="div1"><label>所需工时：</label></div>
                        <div className="div1 div1_tl"> { mainPlanSetDetailData.data.timeConsuming }  </div>


                      */}
                      <div className="items fix">
                        <div className="div1"><label>保养标题：</label></div>
                        <div className="div1 div1_tl"> { mainPlanSetDetailData.data.title } </div>
                        
                      </div>

                      <div className="items fix">
                        <div className="div1"><label>保养内容：</label></div>
                        <div className="div1 div1_tl div3"> { mainPlanSetDetailData.data.description }</div>
                      </div>
                      {/*
                      <div className="items fix">
                        <div className="div1"><label>配件需求：</label></div>
                        <div className="div1 div1_tl div2">
                          {
                                mainPlanSetDetailData.data.fitting.map(function(item){

                                      return <span>{item.name}，{item.fittingnum}个；</span>

                                })


                          }

                        </div>
                      </div>
                      */}
                     
                    </div>
                  </div>
              </div>}
          </div>
        )
    }
    changeMenu(event,object)
    {
      var selMenu = object.value;
      console.log(selMenu)
  }
    // handleChangeInput(ev){
    //     this.setState({"deviceFilter":ev.target.value})
    // }


    handleChangeInput(code,ev)
    {
      console.log("改变input," + code + " ====" +  ev.target.value )
     // this.setState({[code]:ev.target.value})  //"gongWeiCode"
      this.state[code] =  ev.target.value;

    }


    handleChangeStart(){

    }
    handleChangeEnd(){

    }


    // queryData()
    // {
    //     var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
    //     var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
    //     //alert(this.refs.startDt.getInput().value );
    //     //alert(this.refs.endDt.getInput().value );
    //     // const {getInstantQuery,instantQuery}  =this.props;
    //     // instantQuery.data.report_list=[];
    //     // getInstantQuery({"branchId":this.state.branchId, "startDate":startDate,"endDate":endDate});

    // }



    queryData(curPageno)
    {
       // var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
       //  var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
       //alert(this.refs.startDt.getInput().value );
       //alert(this.refs.endDt.getInput().value );

        var q = {
                pagesize:8,
                pageno:curPageno,
                layoutid:this.state.qlayoutID,
                name:this.state.qname,
                starttime:moment(this.refs.qStarttime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
                endtime:moment(this.refs.qEndtime.getInput().value).format('YYYY-MM-DD 23:59:59'),
              }

        console.log(q);

        const { getMainPlanSet} = this.props;

        getMainPlanSet(q);


    }



 changePager(id)
        {

           //  const { devicecountData}  =this.props;

           //  if(id>devicecountData.data.pageCount+1) return;
           //  console.log("curPage:" + id +", totalPageCount:" + devicecountData.data.pageCount )
           // this.setState({fetchcditem: true,page:id});
            this.queryData(id);

        }

    // selectDeviceType(deviceType)
    // {
    //   this.setState({deviceType: deviceType});
    // }


    selectDeviceType(deviceTypeID)
    {
      this.setState({qlayoutID: deviceTypeID});
      console.log("qlayoutID:" + deviceTypeID );
    }

    handleChangeDeviceType(deviceTypeObj,ev,obj)
    {

         //debugger;
        var iObj =   {categoryid:deviceTypeObj.categoryid,name:deviceTypeObj.name, quantity:obj.value   } ;
        this.state.workOrderDeviceTypesMap[deviceTypeObj.categoryid] =iObj;
        console.log(iObj);

   }

  handleChangeDropdown(code,ev,obj)
    {
      console.log("改变DropDown," + code + " ====" +  obj.value )
     // this.setState({[code]:ev.target.value})  //"gongWeiCode"
      this.state[code] =  obj.value;

      if(code=='periodtype')  //切换保养周期类型
      {
          //debugger;
          if( obj.value == 2) //运行时长
          {
            this.refs.periodInput.style.visibility="visible";
              this.refs.periodDrop.style.display='none';
               this.refs.periodName.style.display='';
              this.refs.periodName.innerHTML ='运行时长(h)：'
          }
          else if( obj.value ==1) //时间周期
          {
            this.refs.periodInput.style.visibility="visible";
             this.refs.periodDrop.style.display='';
              this.refs.periodName.style.display='';
             this.refs.periodName.innerHTML ='保养周期：'

          }
          else  //临时任务
          {
               this.refs.periodDrop.style.display='none';
               this.refs.periodName.style.display='none';
               this.refs.periodInput.style.visibility="hidden";
               

          }


         //const {getDeviceByType } = this.props;
         //getDeviceByType({devicetypeid:obj.value});


      }


    }


   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {

        const { getInitData} = this.props;

        // getDevicecount(q);
         getInitData({});

        this.queryData(1);

        //      var q = {
        //           pagesize:8,
        //           pageno:1
        //         };
        // const { getFittings } = this.props;

        // getFittings(q);

   }


   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.baoyangjihuashezhi, mapDispatchToProps)(BaoyangJihuaShezhi);
