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
import CsvFetch from '../../common/components/CsvFetch'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker} from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,TextArea} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Baoxiu extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            time:'00:00',
            page:1,
            deviceFilter:"",
            xinzengShow:false,
            paifa:false,
            chakan:false,

            planingTimeStart: moment().valueOf(),
            planingTimeEnd: moment().add(1, 'month').valueOf(),


         //新增:
          layoutID:-1,
          content:'', //问题描述
          attachmentBase64s:[],
          attachmentBase64sNames:[],//attachmentBase64s

          //查询用:
          qlayoutID:-1,
          qresponseid:-1,

          //办理业务用
          selectReportID:-1,



        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onChange = time => this.setState({ time })
    onXingzeng(){
      this.setState({xinzengShow:!this.state.xinzengShow})
    }
    onPaifa(){
      this.setState({paifa:true})
    }
    // onPaifaY(){
    //   this.setState({paifa:false,xinzengShow:false})
    // }



    onPaifaY()
    {

      if(this.state.abnormalLevelID == -1||this.state.layoutID == -1||
         this.state.deviceAssetID == -1||
         this.state.title==''||
         this.state.content==''||
         this.state.attachmentBase64s.length==0)
         {

            alert("信息不完整");return;

         }

      var newObj =  {
                      "layoutID": this.state.layoutID,          // 管理层级编号
                      "deviceAssetID": this.state.deviceAssetID,     // 设备资产编号
                      "title":this.state.title,// 报修单标题
                      "abnormalLevelID": this.state.abnormalLevelID,   // 报修单紧急程度编号
                      "content": this.state.content, // 报修问题描述
                      "attachmentBase64s": this.state.attachmentBase64s
               };


      console.log(newObj);

      const  {createAbnormal}  =this.props;

      createAbnormal( newObj,this.checkResult,this );

      this.setState({paifa:false,xinzengShow:false})
    }



   checkResult(res,t)
   {
     // debugger;

     if(res.resultCode==0)
      {
         //alert("派发成功");
         alert(res.resultMessage);
        //  t.closeCreate();
      }

   }

    onPaifaN(){
      this.setState({paifa:false})
    }
    // onChakan(){
    //   this.setState({chakan:true})
    // }
    //

    onChakan(statusFlag,reportid)
    {
        //alert(statusFlag);
        //this.state[statusFlag] = true;


        const {getAbnormalFull } = this.props;

        getAbnormalFull({reportid:reportid});

        var kan = {};
        kan[statusFlag] = true;
        kan["selectReportID"] = reportid;
        this.setState(kan);
    }



    onChakanN(){
      this.setState({chakan:false})
    }
    handleChange = (e, { value }) => this.setState({ value })

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        let title = ""
        var pageCount =0;
        const {layoutData2,abnormalData,abnormalResponseData,deviceAssetData,abnormalLevelData,abnormalFullData} = this.props;
        var tbody= [];

       var abnormalInfo =  abnormalFullData.data;
       // if(abnormalFullData&& abnormalFullData.resultCode==0)
       // {

       // abnormalInfo =  abnormalFullData.data;


       // }
       if(abnormalData&& abnormalData.resultCode==0)
        {

                   tbody= [];
                   pageCount = abnormalData.data.pageCount
                   for(var i=0;i<abnormalData.data.data.length;i++)
                   {
                          var  arr = new Array();
                         // var status = abnormalData.data[i].statusName; //未审核，通过，未通过
                          // if(companyData.data.data[i].statusName==false)  status = "无效";
                          // else
                          // {  status = "有效";
                          //      // if(companyData.data.data[i].isValid == 0) status = "有效";
                          //       //else  status = "已通过";

                          // }
                          //
                          // this.curWorkordertypeid
                         // var workOrderTypeName = "维修";
                         // if(abnormalData.data[i]. workOrderTypeID==1)
                         //      workOrderTypeName = "点检";
                         // else if(abnormalData.data[i]. workOrderTypeID==2)
                         //      abnormalData = "定修";
                         //  else if(abnormalData.data[i]. workOrderTypeID==3)
                         //      workOrderTypeName = "维修";
                         //  else if(abnormalData.data[i]. workOrderTypeID==4)
                         //      workOrderTypeName = "保养";



                        var updateTime = moment (abnormalData.data.data[i].createTime).format('YYYY-MM-DD HH:mm:ss');


                        // var btnHtml = <Button style={ { fontSize:"14px"}}    color='teal'  onClick={this.openUpdate.bind(this,abnormalData.data[i])}>查看</Button>

                       // var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>
                        var  statusFlag = "chakan";
                        // var sid = abnormalData.data[i].statusID;
                        // if(sid == 2)
                        //   statusFlag = "chakan";

                        // else if(sid == 3)
                        //   statusFlag = "chakan2";

                        // else if(sid == 4)
                        //   statusFlag = "chakan3";

                        //  else if(sid == 5)
                        //   statusFlag = "chakan4";


                        //workOrderTypeName,
                        var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,statusFlag,abnormalData.data.data[i].abnormalReportID)} >查看</span>
                        var arr = [abnormalData.data.data[i].abnormalReportID,  abnormalData.data.data[i].deviceAssetName ,updateTime,abnormalData.data.data[i].title,abnormalData.data.data[i].abnormalLevelName,abnormalData.data.data[i].createUserName,abnormalData.data.data[i].abnormalResponseName,btnHtml];

                       tbody.push(arr);


                   }






        }

        //管理层级
        var layoutDataOptions =[ { key: -1, text: '请选择', value: -1 }];
        if(layoutData2&&layoutData2.resultCode==0)
        {

            for(var i=0;i<layoutData2.data.length;i++)
            {
                  var newOpt = {};
                  newOpt.key = layoutData2.data[i].layoutID;
                  newOpt.value = layoutData2.data[i].layoutID;
                  newOpt.text = layoutData2.data[i].layoutName;
                  layoutDataOptions.push(newOpt );
            }
        }



       //办理状态
        const options2 =[ { key: -1, text: '请选择', value: -1 }  ]
        if(abnormalResponseData&&abnormalResponseData.resultCode==0)
        {
            for(var i=0;i<abnormalResponseData.data.length;i++)
            {
                 //if(abnormalResponseData.data[i].statusID>=2)
                  {
                    var newOpt = {};
                    newOpt.key = abnormalResponseData.data[i].abnormalResponseID;
                    newOpt.value = abnormalResponseData.data[i].abnormalResponseID;
                    newOpt.text = abnormalResponseData.data[i].abnormalResponseName;
                    options2.push(newOpt );
                  }
            }
        }



       //设备名称7.1
        var deviceAssetOptions =[ { key: -1, text: '请选择', value: -1 }];
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




       var abnormalLevelOptions =[{ key: -1, text: '请选择', value: -1 } ];
        if(abnormalLevelData&&abnormalLevelData.resultCode==0)
        {

            for(var i=0;i<abnormalLevelData.data.length;i++)
            {
                  var newOpt = {};
                  newOpt.key = abnormalLevelData.data[i].abnormalLevelID;
                  newOpt.value = abnormalLevelData.data[i].abnormalLevelID;
                  newOpt.text = abnormalLevelData.data[i].abnormalLevelName;
                  abnormalLevelOptions.push(newOpt );
            }
        }



      let project =this.props.location.query.project;
      //  title += project=="wx"?"维修":project=="xj"?"巡检":project=="bx"?"设备报修":project=="wbjh"?"维保计划":""
      title = "设备报修";
      const meuncont=[
                        {name:'project',text:'项目',mutilselect:false,pagechange:true,
                         value:[       {name:'all',text:'全部',address:'/baogang/pc/weixiu',selected:true},
                                       {name:'reshui',text:'生活热水',address:'/baogang/pc/weixiu',selected:false},
                                       {name:'yongchi',text:'泡池泳池',address:'/baogang/pc/weixiu',selected:false},
                                       {name:'guolu',text:'锅炉房',address:'/baogang/pc/weixiu',selected:false}
                                   ]
                        }
                    ];
        //,{width:"10%",value:"类型"}
        const thead=[{width:"10%",value:"编号"},{width:"10%",value:"设备"}
                    ,{width:"15%",value:"时间"},{width:"15%",value:"内容"},{width:"15%",value:"级别"}
                    ,{width:"15%",value:"发布人"},{width:"10%",value:"办理状态"},{width:"10%",value:"操作"}]



        // const options =[
        //   { key: 1, text: '全部', value: 1 },
        //   { key: 2, text: '28/38泵站', value: 2 },
        //   { key: 3, text: '综合泵站', value: 3 },
        //   { key: 4, text: '黄河泵站', value: 4 },
        //   { key: 5, text: '3/4泵站', value: 5 }
        // ]
        // const options2 =[
        //   { key: 1, text: '代办', value: 1 },
        //   { key: 2, text: '已办', value: 2 }
        // ]
        const options3 =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '设备名称1', value: 2 },
          { key: 3, text: '设备名称2', value: 3 },
          { key: 4, text: '设备名称3', value: 4 },
          { key: 5, text: '设备名称4', value: 5 }
        ]


      //   const tbody=[[1,"报修","101#水泵","2018-02-08 00:30:00","温度过高","一级报警","系统提醒","待领取",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)} >查看</span>],
      //   [2,"报修","102#水泵","2018-02-28 00:30:00","温度过高","一级报警","系统提醒","待反馈",<span style={{cursor:'pointer'}}>查看</span>],
      //   [3,"","102#水泵","2018-02-28 00:30:00","温度过高","三级报警","系统提醒","待验收",<span style={{color:'#7598f7',cursor:'pointer'}}>查看</span>],
      //   [4,"","102#水泵","2018-02-28 00:30:00","温度过高","一般","系统提醒","已完成",<span style={{color:'#7598f7',cursor:'pointer'}}>查看</span>],
      //   [5,"","102#水泵","2018-02-28 00:30:00","温度过高","紧急","张三","返工",<span style={{color:'#7598f7',cursor:'pointer'}}>查看</span>],
      //   [6,"","102#水泵","2018-02-28 00:30:00","温度过高","紧急","系统提醒","",<span style={{color:'#7598f7',cursor:'pointer'}}>查看</span>]
      // ]
       const BodyStyle={height: document.documentElement.clientHeight-80  +'px'}
        return (
          <div className="table-sbbaoxiu" style={BodyStyle}>
            <h3 className="weixiu-title labStyle">{title}</h3>
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
                      //onChange={::this.handleChangeEnd}
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
                     onChange={this.handleChangeDropdown.bind(this,'qresponseid')}
                      className="query-value"
                       defaultValue={options2[0].value}
                       selection
                       openOnFocus
                       options={options2}
                     />
                  </div>
                <span className="commitBtn"  onClick={this.queryData.bind(this,1)} >查询</span>
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
                      <span className="btn" onClick={this.onPaifa.bind(this)} >上报</span><span onClick={this.onXingzeng.bind(this)} className="btn">返回</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>设备名称：</label></div>
                        <div className="div2">
                          <div className="query-value">
                                              <Dropdown
                                                onChange={this.handleChangeDropdown.bind(this,'deviceAssetID')}
                                                className="query-value" defaultValue={deviceAssetOptions[0].value}
                                                 selection openOnFocus options={deviceAssetOptions}
                                               /></div></div>
                        <div className="div1"><label><i className="xing">*</i>标题：</label></div>
                        <div className="div2"><Input onChange={this.handleChangeInput.bind(this,'title')}/></div>
                      </div>
                    </div>
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>紧急程度：</label></div>
                        <div className="div2">
                                 <div className="query-value">
                                              <Dropdown
                                                onChange={this.handleChangeDropdown.bind(this,'abnormalLevelID')}
                                                className="query-value" defaultValue={abnormalLevelOptions[0].value}
                                                 selection openOnFocus options={abnormalLevelOptions}
                                  /></div>
                        </div>


                        <div className="div1"><label><i className="xing">*</i>泵站选择：</label></div>
                        <div className="div2">
                                 <div className="query-value">
                                              <Dropdown
                                                onChange={this.handleChangeDropdown.bind(this,'layoutID')}
                                                className="query-value" defaultValue={layoutDataOptions[0].value}
                                                 selection openOnFocus options={layoutDataOptions}
                                  /></div>
                        </div>




                      </div>
                      <div className="items fix">
                        <div className="div1"><label><i className="xing">*</i>问题描述：</label></div>
                        <div className="div3"> <TextArea onChange={this.handleChangeInput.bind(this,'content')}/> </div>
                        <div className="div_fujian div_file"><span><input ref = "attachmentBase64s" id="attachmentBase64s" onChange={this.handleChangeFile.bind(this,"attachmentBase64s")} type="file" /><span className="span-btn file-span">上传文件</span></span>
                         {
                            this.state.attachmentBase64sNames.map(function(item){ return  <span key={item} >{item} </span> })
                          }

                        </div>
                      </div>
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
                  <p>确定要上报？</p>
                </div>
                <div className="footer">
                  <span onClick={this.onPaifaY.bind(this)} >是</span><span onClick={this.onPaifaN.bind(this)}>否</span>
                </div>
              </div>
            }
            {this.state.chakan &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">报修详情</span>
                  <span>编号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onChakanN.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>报修信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">设备名称:</span><span> {abnormalInfo.deviceAssetName}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">类别:</span><span>维修</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">标题:</span><span> {abnormalInfo.title}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">上报人:</span><span> {abnormalInfo.createUserName}</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">上报时间:</span><span>  { moment(abnormalInfo.createTime).format('YYYY-MM-DD HH:mm:ss') } </span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">紧急程度:</span><span> {abnormalInfo.abnormalLevelName}</span>
                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>问题描述</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    <p>{abnormalInfo.content}</p>
                     {/*<p className="fujian"><span>问题描述附件信息.doc</span></p>*/}

                     {

                          abnormalInfo.abnormalAttachmentCodes&&abnormalInfo.abnormalAttachmentCodes.map(function(item){
                          return   <p className="fujian"><span> {item}</span></p>
                           })
                      }


                  </div>
                </div>

                <div className="chakan_item">
                {/*
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                      <li>
                        <span>2018-6-19 14:00</span><span>王明</span><span>上报报修</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                      </li>
                      <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                      </li>
                      <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
                        <span className="span_w">办理意见办理意见办理意见办理意见办理意见,办理意见办理意见</span>
                      </li>
                    </ul>
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



  changePager(id)
        {

           // const { getMonthReportNow,monthReportNow}  =this.props;

           // if(id>monthReportNow.data.page.totalCount/monthReportNow.data.page.pageSize+1) return;

           // this.setState({fetchcditem: true,page:id});
            this.queryData(id);

        }


  handleChangeDropdown(code,ev,obj)
    {


      console.log("改变DropDown," + code + " ====" +  obj.value )
     // this.setState({[code]:ev.target.value})  //"gongWeiCode"
      this.state[code] =  obj.value;


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


    queryData_test()
    {
        var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
        var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
        //alert(this.refs.startDt.getInput().value );
        //alert(this.refs.endDt.getInput().value );
        // const {getInstantQuery,instantQuery}  =this.props;
        // instantQuery.data.report_list=[];
        // getInstantQuery({"branchId":this.state.branchId, "startDate":startDate,"endDate":endDate});

    }



handleChangeFile(fileID,o,t)
{


        var reader = new FileReader();
        var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        //var file = $("#issueAttachmentContent")[0].files[0];

        var file = this.refs[fileID].files[0];
        var imgUrlBase64;
        if (file) {
            //将文件以Data URL形式读入页面
            imgUrlBase64 = reader.readAsDataURL(file);

             console.log(fileID);
           // console.log(reader.result);

            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {alert( '上传失败，请上传不大于2M的图片！'); return; }



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


         }


   }







    queryData(curPageno)
    {

        // var obj = {companyname:this.state.whereCompanyName,pageno:curPageno,pagesize:5
        // qlayoutID:-1,
        // qresponseid:-1,

        var q = {
                       // workordertypeid:this.curWorkordertypeid,

                        pagesize:12,
                        pageno:curPageno,
                        layoutid:this.state.qlayoutID,

                        responseid:this.state.qresponseid,

                        createtimestart:moment(this.refs.theSTime.getInput().value).toDate().getTime(),

                        createtimeend:moment(this.refs.theETime.getInput().value).toDate().getTime()

                        //新接口添加如下：
                        // reportid
                        // responseid – 报修单处理结果
                 };

         console.log(q);
         const { getAbnormal} = this.props;
         getAbnormal(  q );

    }



   componentWillReceiveProps(nextprops)
   {

   }


    componentDidMount()
    {

         const { getAbnormal,getWorkOrderStatus} = this.props;

        // reportid

        //createtimestart

        //createtimeend

        //responseid


        getWorkOrderStatus({});

      //  var param = {layoutid:1};
      //  getAbnormal(param);
      this.queryData(1);

    }

    componentWillMount()
    {
     //
     //console.log("componentWillMount");


    }

   componentWillUnmount() {
     console.log("");
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.baoxiuwh, mapDispatchToProps)(Baoxiu);
