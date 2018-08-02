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
import { DateField,DatePicker} from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,TextArea,Image } from 'semantic-ui-react'
import Pager from '../../../common/components/Pager'
import moment from 'moment'
import Menus from '../../../common/components/Menus'
import HeatMap2 from './components/HeatMap2.js'
import LineAndBar from './components/LineAndBar.js'
import BarOne from './components/BarOne.js'
class Jihua extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)

        this.planIDs=[];
        this.state = {

              //查询用:
            qlayoutID:-1,

            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            deviceFilter:"",
            jihua:false,
            gongshi:false,
            chakan:false,
            byStatus:'',



            paifa:false,
            //添加保养结果：
            repairplanID:-1,
            userid:1,

            workOrderDeviceTypes:[],
            workOrderDeviceTypesMap:{}, //辅助workOrderDeviceTypes使用
            issueAttachmentImageBase64s:[],
            issueAttachmentImageBase64sNames:[],//issueAttachmentImageBase64s
            t:1
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onChange = time => this.setState({ time })

    onChakan(dataIndex){

       var curPlanID =  this.planIDs[dataIndex];
       console.log("repairplanID: "+ curPlanID);
       const  {getResultInfoDetail} = this.props;
       getResultInfoDetail({id: curPlanID,status:this.state.byStatus })
      
       this.setState({chakan:true,repairplanID:curPlanID});


    }
    onChakanN(){
      this.setState({chakan:false})
    }
    onJihua(){

        const { getTotalFitting} = this.props;
         
        var qFitObj={
                starttime:moment(this.refs.qStarttime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
                //endtime:moment(this.refs.qEndtime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
                 endtime:moment(this.refs.qStarttime.getInput().value).add(1,'months').format('YYYY-MM-DD HH:mm:ss')
              }
        getTotalFitting(qFitObj)

      this.setState({jihua:true})
    }
    onGongshi(){
      this.setState({gongshi:true})
    }
    onCloseN(){
      this.setState({chakan:false,jihua:false,gongshi:false})
    }
    handleChange = (e, { value }) => this.setState({ value })

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同


    render() {
            var othis = this;
        var startDate= moment();
        var endDate= moment().add(1, 'd');
        const {mainPlanInfoData,layoutData,totalfittingData,resultInfoData,deviceTypeData,resultInfoImgs} = this.props;

        var theImgs = [];
        
         if(resultInfoImgs&&resultInfoImgs.resultCode==0)
         {
            theImgs = resultInfoImgs.data;

         }


        // const options =[
        //   { key: 1, text: '全部', value: 1 },
        //   { key: 2, text: '28/38泵站', value: 2 },
        //   { key: 3, text: '综合泵站', value: 3 },
        //   { key: 4, text: '黄河泵站', value: 4 },
        //   { key: 5, text: '3/4泵站', value: 5 }
        // ]
        // 
        // var xdata = ['00:00', '01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00',
        //             '11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00',];
        // var ydata = ['设备一', '设备二', '设备三','设备四', '设备五', '设备六'];
        // var data = [['04:00','设备一','1'],['01:00','设备二','2'],['09:00','设备三','3'],['06:00','设备四','1'],['08:00','设备五','2']];
 
    if(deviceTypeData.resultCode==0)
    {



      var sfa = deviceTypeData;
     
      
    }

        //moment().add(1,'months').format('DD')

       var maxDay= parseInt(moment( ).endOf('month').format("DD"));  //YYYY-MM-

       var tdeviceAssetName="",tperiodtype="",tmaintenenceType="",ttitle="" ,tdescription="",tdes ="";
       var tfittings = '',ttimeConsuming = "",tuser="";
       if(resultInfoData.resultCode!=-1 && resultInfoData.data!=null )
       {
          tdeviceAssetName= resultInfoData.data.deviceAssetName;

          if(resultInfoData.data.periodtype==1) 
          {
              tperiodtype="时间周期";
              if(resultInfoData.data.maintenenceType==1) tmaintenenceType= "保养周期：" + resultInfoData.data.period + "月/次";
              else if(resultInfoData.data.maintenenceType==2) tmaintenenceType="保养周期：" +resultInfoData.data.period +"季度/次";
              else if(resultInfoData.data.maintenenceType==3) tmaintenenceType="保养周期：" +resultInfoData.data.period +"年/次";

          }
          else if(resultInfoData.data.periodtype==2) 
          { tperiodtype="运行时间";

            tmaintenenceType=  "运行时长："+ resultInfoData.data.period+"(h)";

          }
          else if(resultInfoData.data.periodtype==3) 
            { tperiodtype="临时任务"; tmaintenenceType=  "" }


          ttitle= resultInfoData.data.title;

          tdescription = resultInfoData.data.description;
          tdes = resultInfoData.data.des;
          ttimeConsuming = resultInfoData.data.timeConsuming;
          tuser = resultInfoData.data.user;
          for(var m=0;m< resultInfoData.data.fittings.length;m++)      
          {

            //，3个；
            tfittings +=  resultInfoData.data.fittings[m].fittingname +"，"+ resultInfoData.data.fittings[m].num+"个；";

          }
          
           



       }
       


        var xdata = new Array(maxDay);
             for(var i=0;i<31;i++)
             {
                if(i<9)
                  xdata[i] = '0' +(i+1) ;
                else
                  xdata[i] = (i+1) +'';
             }

        //var ydata = ['设备1', '设备2', '设备3','设备4', '设备5', '设备6', '设备7', '设备8'];
        //var data = [['4','设备1','1'],['5','设备1','2'],['1','设备2','2'],['9','设备3','3'],['6','设备4','4'],['21','设备5','2']];

        var ydata = [];
        var data = [];
        this.planIDs = [];

// deviceName
// maintenencePlanID
// status
// time
        
        if(mainPlanInfoData&&mainPlanInfoData.resultCode==0)
        {
            for(var i=0;i<mainPlanInfoData.data.length;i++)
            {
                  var dataIdx = ydata.indexOf(mainPlanInfoData.data[i].deviceName) ;
                  if(dataIdx < 0)
                       {
                         ydata.push(mainPlanInfoData.data[i].deviceName)
                       }

                  //moment().add(1, 'd'),

                 //moment(this.refs.theStarttime2.getInput().value).format('YYYY-MM-DD 00:00:00');

                 //moment (mainPlanInfoData.data[i].time).format('DD');
        
                  var iData=  [moment (mainPlanInfoData.data[i].time).format('DD'),mainPlanInfoData.data[i].deviceName,mainPlanInfoData.data[i].status+''];
                  data.push(iData);
                  this.planIDs.push(mainPlanInfoData.data[i].maintenencePlanID);


            }
        }


        //var legends = ['配件A','配件B','配件C','配件D','所需工时']; //'人员',

       // var time = ['2018-5-1','2018-5-2','2018-5-3','2018-5-4','2018-5-5','2018-5-6','2018-5-7','2018-5-8','2018-5-9','2018-5-10','2018-5-11','2018-5-12'];
        var data1=[1,2,3,4,1,3,2,1,2,3,5,4];
        var data2=[2,3,2,1,1,6,4,7,2,3,1,2];
       // var renyuan=[3,3,2,4,5,6,4,7,2,3,1,2];
        var data3=[6,4,2.5,6,5,1,3,3,5,7,2,7,4];


        
        var info = null;
        var time=[];
        var timeCosumings =[];
        var legends = [];
        var theDatas = [];
        if(totalfittingData.resultCode==0)
        { 
            for(var i=0;i<totalfittingData.data.fittingList.length;i++)
            {

                 info = totalfittingData.data.fittingList[i];
                 time.push( moment(info.time ).format('YYYY-MM-DD') );//  HH:mm:ss
                 timeCosumings.push(info.timeConsuming);

                 for(var j=0;j<info.fittingInfo.length;j++)
                 {
                      var dataIdx = legends.indexOf(info.fittingInfo[j].name) ;
                      if(dataIdx < 0)
                      {
                          legends.push(info.fittingInfo[j].name)

                          var theData= new Array(totalfittingData.data.fittingList.length);
                          for(var k=0;k<totalfittingData.data.fittingList.length;k++)
                              theData[k] = 0;
                          theDatas.push(theData);  

                      }
                          if(dataIdx==-1) dataIdx=theDatas.length-1 ;
                          //theData[i] = info.fittingList[j].fittingnum;
                          //theDatas[dataIdx][i] =  info.fittingList[j].fittingnum;
                          var ss =  theDatas[dataIdx];
                          ss[i] =  info.fittingInfo[j].fittingNum;
                 }              
            }
            
        }


 console.log(legends);
 console.log(theDatas);


var serdata = new Array();

for(var k=0;k<legends.length;k++)
{

    serdata.push(  {
                name:legends[k],
                type:'bar',
                stack:'配件',
                data:theDatas[k],
                label: {
                    normal: {
                        show: true
                    }
                }
            });
}


  serdata.push({
                name:'所需工时',
                type:'line',
                yAxisIndex: 1,
                data:timeCosumings
            });


//legends = ['配件A','配件B','配件C','配件D','所需工时']; //'人员',
var serdata1 = [
            {
                name:'配件A',
                type:'bar',
                stack:'配件',
                data:data1,
                label: {
                    normal: {
                        show: true
                    }
                }
            },
            {
                name:'配件B',
                type:'bar',
                stack:'配件',
                data:data2,
                label: {
                    normal: {
                        show: true
                    }
                }
            },
            {
                name:'配件C',
                type:'bar',
                stack:'配件',
                data:data1,
                label: {
                    normal: {
                        show: true
                    }
                }
            },
            {
                name:'配件D',
                type:'bar',
                stack:'配件',
                data:data2,
                barGap: '0',
                label: {
                    normal: {
                        show: true
                    }
                }
            },
            // {
            //     name:'人员',
            //     type:'bar',
            //     data:renyuan,
            //     label: {
            //         normal: {
            //             show: true
            //         }
            //     }
            // },
            {
                name:'所需工时',
                type:'line',
                yAxisIndex: 1,
                data:data3
            }];


        // var barxdata = ['人员A', '人员B','人员C','人员D','人员E','人员F','人员G','人员H'];
        // var barydata = [3,6,5,8,4,5,8,3];
        // var bardata = [{
        //         name:'工时',
        //         type:'bar',
        //         data:barydata,
        //         barWidth:'20',
        //         label: {
        //             normal: {
        //                 show: true
        //             }
        //         }
        //     }];
        var that=this;
        const EventsDict = {
            click: function (data, echart) {

                    that.setState({byStatus:data.data[2]});
                    //console.log(data.value[0])
                    that.onChakan(data.dataIndex)

                   

                }
        }
        const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}

 

    var totalFit = 0;
    if(totalfittingData.resultCode==0)
    {

      totalFit =  totalfittingData.data.totalTimeConsuming;


    }
//-DD HH:mm:ss
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


        return (
          <div className="table-baoyangjihua" style={BodyStyle}>
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
                <label className="labStyle">时间</label>
                    <DateField ref='qStarttime'
                        dateFormat="YYYY-MM"
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
                {/*<label className="labStyle">至</label>
                    <DateField ref='qEndtime'
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
              */}
                <span className="commitBtn" onClick={this.queryData.bind(this,1)}>查询</span>
            </div>
            <div className="weixiu-table">
              <div className="xinzeng-btn xinzeng-btn2"><span onClick={this.onJihua.bind(this)} >人员及配件计划</span>{/*<span onClick={this.onGongshi.bind(this)} >工时统计</span>*/}</div>
              <HeatMap2  style={{width:'100%',height:'400px',margin:'35px auto 0'}}
                  xdata={xdata}
                  ydata={ydata}
                  data={data} EventsDict={EventsDict}/>

            </div>
 



      {this.state.chakan &&
              <div className="gongdan-modal">
                  <div className="title">
                      { this.state.byStatus=='1'&&<span className="btn" onClick={this.onPaifa.bind(this)} >提交</span>}<span onClick={this.onChakanN.bind(this)} className="btn">返回</span>
                  </div>


                  <div className="gongdan-content">

                    <div className="lanTitle">保养详情</div>


                      <div className="ul_1 ul_1b fix">

                      <div className="items fix">        
                            <div className="div1">设备名称： </div>
                            <div className="div2"><label>{tdeviceAssetName}</label></div>                                                                   
                      </div>
  
                        <div className="items fix">        
                            <div className="div1">保养周期类型： </div>
                            <div className="div2"><label>{tperiodtype}</label></div>  
                            <div className="div1">{tmaintenenceType} </div>
                                                                                                                    
                      </div>

                      <div className="items fix">        
                            <div className="div1">标题： </div>
                            <div className="div2"><label>{ttitle}</label></div>                                                                   
                      </div>

                      <div className="items fix">        
                            <div className="div1">保养内容： </div>
                            <div className="div2"><label>{tdescription}</label></div>                                                                   
                      </div>                                          
  
                    </div>
                    <div className="lanTitle">保养结果</div>
 

                    { this.state.byStatus=='1'&&<div className="ul_1 fix">

                      <div className="items fix">
                        <div className="div1"><label>结果：</label></div>
                        <div className="div3"><TextArea onChange={this.handleChangeInput.bind(this,'des')}/></div>
                        <div className="div_fujian div_file"><span><input ref = "issueAttachmentImageBase64s" id="issueAttachmentImageBase64s" onChange={this.handleChangeFile.bind(this,"issueAttachmentImageBase64s")} type="file" /><span className="span-btn file-span">上传图片</span></span>

                         {
                            this.state.issueAttachmentImageBase64sNames.map(function(item,i){ return  <span key={i}>{item} </span> })
                          }

                        </div>
                      </div> 


                      <div className="items fix">
                         <div className="div1"><label>配件：</label></div>
                         <div className="div2" style={{width:'85%'}}>
                          <span className="selectsMul">             
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
                          <span className="span-btn" onClick={this.onPeijian.bind(this)} >选择配件</span>
                         </div>

                      </div>   


                      <div className="items fix">
                        <div className="div1"><label>工时：</label></div>
                        <div className="div2"><Input onChange={this.handleChangeInput.bind(this,'timeConsuming')}/></div>                                          
                      </div>


                    </div>}


                    { this.state.byStatus!='1'&&<div className="ul_1 fix">


                      <div className="items fix">        
                            <div className="div1">结果： </div>
                            <div className="div2"><label>{tdes}</label></div>                                                                   
                      </div>
  
                        <div className="items fix">        
                            <div className="div1">附件： </div>
                            <div className="div2"> 
                            
                            {  
                              theImgs.map(function(item,index){

                                  return <Image ref={'testImg'+index} id={'testImg'+index} onClick={othis.onClickImg.bind(othis,'testImg'+index)}   style={{display:'inline-block',paddingLeft:'5px',cursor:'pointer'}} size='mini' src={ item }  />

                              })
                              }

                            </div>  
                            <div className="div1">  </div>
                                                                                                                    
                      </div>

                      <div className="items fix">        
                            <div className="div1">配件： </div>
                            <div className="div2"><label>{tfittings}</label></div>                                                                   
                      </div>

                      <div className="items fix">        
                            <div className="div1">工时： </div>
                            <div className="div2"><label>{ttimeConsuming}</label></div>                                                                   
                      </div>   

                      <div className="items fix">        
                            <div className="div1">操作人员： </div>
                            <div className="div2"><label>{tuser}</label></div>                                                                   
                      </div>   

                    </div>}


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
                    {deviceTypeData.resultCode==0&&deviceTypeData.data.data.map(function(item){
                       
                        var theNum = "";
                        var iType =  othis.state.workOrderDeviceTypesMap[item.categoryid];
                        if( typeof(iType)!='undefined')
                            theNum =  othis.state.workOrderDeviceTypesMap[item.categoryid].quantity;
                        //<span className="li_span1"> <Checkbox defaultChecked={isChk}  onChange={othis.handleChangeCheckbox.bind(othis,item.deviceTypeID,"workOrderDeviceTypes")}/></span>
　　　　　　　　         return <li className="fix"><span>{item.name}</span><span> <Input  defaultValue={theNum} onChange={othis.handleChangeDeviceType.bind(othis,item)}/> </span></li>})}
                  </ul>
                </div>
                <div className="footer">
                  <Pager total={1} gap={2}
                         //change={::this.changePager}
                         current ={1}
                         fetching={false} />
                </div>
              </div>
            }




            {this.state.jihua &&
              <div className="modal-alert modal-guanlian modal-timemodel modal-jihua modal-jihua-bg">
                <div className="title">
                  <div className="fix">
                    <div className="spans"><i className="close_icon" onClick={this.onCloseN.bind(this)} ></i></div>
                  </div>
                </div>
                <div className="content">
                    <h3 className="content_title">人员及配件计划</h3>
                    <LineAndBar xdata={time}
                                maxValue={20}
                                interval={5}
                                legends={legends}
                                serdata={serdata}
                                style={{width:'100%',height:'400px'}} />
                     <div className="content_tips">
                      
                      <p>共计所需：{totalfittingData.resultCode==0&&totalfittingData.data.fittingSum.map(function(item){  return <span>{item.name}{item.number}个，</span> }) }</p>
                      <p>所需工时：共计{totalFit}人·天</p></div>
                </div>
              </div>}
                {/*
              {this.state.gongshi &&
                <div className="modal-alert modal-guanlian modal-timemodel modal-jihua modal-jihua-bg">
                  <div className="title">
                    <div className="fix">
                      <div className="spans"><i className="close_icon" onClick={this.onCloseN.bind(this)} ></i></div>
                    </div>
                  </div>
                  <div className="content">
                    <div className="content_search">
                      <label className="labStyle">时间</label>
                          <DateField
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
                      <label className="labStyle">至</label>
                          <DateField
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
                      <span className="commitBtn">查询</span>
                    </div>
                    <h3 className="content_title">人员工时统计</h3>
                    <BarOne xdata={barxdata}
                      ydata={barydata}
                      legends={'工时'}
                      data={bardata}/>
                  </div>
                </div>}

              */}
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



onPaifa(){
    this.setState({paifa:true})
  }
  checkResult(res,t){
    if(res.resultCode==0){
     
      alert(res.resultMessage);
      //t.closeCreate();
      //this.getGongdanList(this.curWorkordertypeid);
    }
  }

  onPaifaN(){
    this.setState({paifa:false})
  }


async onPaifaY()
{
    console.log(this.state.issueAttachmentImageBase64s);
    if(
     this.state.repairplanID == -1||
     this.state.workOrderDeviceTypes.length==0||  //此为配件信息
     this.state.des==''||
     this.state.timeConsuming==''||
     this.state.issueAttachmentContent==''||
     this.state.issueAttachmentImageBase64s.length==0){
      alert("信息不完整");
      this.onPaifaN();return;
    }

    
    var fittings =[];
    for(var t=0;t<this.state.workOrderDeviceTypes.length;t++)
    {
        //old: {deviceTypeID: "9", quantity: "3"}
        fittings.push({"number":parseInt(this.state.workOrderDeviceTypes[t].quantity),"fittingID":parseInt(this.state.workOrderDeviceTypes[t].deviceTypeID)});


    }


    var newObj =  {
 
    //  "time":"2018-07-25 15:25",
      "fittings": fittings,    //--  备件编号列表
      "userID": this.state.userid,  //-- 工单人员编号列表
      "des": this.state.des, //-- 问题描述文字部分，最长2000字
      "planID": this.state.repairplanID,
      "file": this.state.issueAttachmentImageBase64s , //-- 问题描述图片列表（Base64编码 MIMO方式)
      'timeConsuming':this.state.timeConsuming
     
     
    };
    const {addResult} = this.props;
    console.log("=================");
    console.log(newObj);
    await addResult( newObj,this );
    this.setState({paifa:false,chakan:false});

   // this.getGongdanList(this.curWorkordertypeid);
  }




onClickImg(refid)
{

 // debugger;
  var sfa = $("#"+ refid);
  var sf2 = this.refs[refid];
$( "#"+ refid ).toggleClass( "mini")

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

  onPeijian(){
    this.setState({peijian:true})
  }

  handleChangeDropdown(code,ev,obj)
    {
      console.log("改变DropDown," + code + " ====" +  obj.value )
     // this.setState({[code]:ev.target.value})  //"gongWeiCode"
      this.state[code] =  obj.value;

      // if(code=='periodtype')  //切换保养周期类型
      // {
      //     //debugger;
      //     if( obj.value == 2) //运行时长
      //     {
      //         this.refs.periodDrop.style.display='none';
      //         this.refs.periodName.innerHTML ='运行时长(h)：'
      //     }
      //     else
      //     {
      //        this.refs.periodDrop.style.display='';
      //        this.refs.periodName.innerHTML ='保养周期：'

      //     }
      //    //const {getDeviceByType } = this.props;
      //    //getDeviceByType({devicetypeid:obj.value});


      // }


    }





    queryDataNouse()
    {
        var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
        var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
        //alert(this.refs.startDt.getInput().value );
        //alert(this.refs.endDt.getInput().value );
        // const {getInstantQuery,instantQuery}  =this.props;
        // instantQuery.data.report_list=[];
        // getInstantQuery({"branchId":this.state.branchId, "startDate":startDate,"endDate":endDate});

    }



handleChangeDeviceType(deviceTypeObj,ev,obj)
{

     //debugger;
    var iObj =   {deviceTypeID:deviceTypeObj.categoryid,deviceTypeName:deviceTypeObj.name, quantity:obj.value   } ;
    this.state.workOrderDeviceTypesMap[deviceTypeObj.categoryid] =iObj;
     console.log(iObj);

   // this.state.workOrderDeviceTypes.push(  {deviceTypeID:obj.value}  )

   //console.log("以下输出第一个元素：");
   //console.log(this.state.workOrderDeviceTypesMap[0]);


      // workOrderDeviceTypesMap["1"]={ "deviceTypeID": 1, // -- 备件编号
      //                                     "quantity": 1   //-- 备件数量
      //       deviceTypeName
      //                                    }

}
    queryData(curPageno)
    {
       // var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
       //  var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
       //alert(this.refs.startDt.getInput().value );
       //alert(this.refs.endDt.getInput().value );

        var q = {
                pagesize:1000,
                pageno:curPageno,
                layoutid:this.state.qlayoutID,
               // name:this.state.qname,
                starttime:moment(this.refs.qStarttime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
                endtime:moment(this.refs.qStarttime.getInput().value).add(1,'months').format('YYYY-MM-DD HH:mm:ss')
                //endtime:moment(this.refs.qEndtime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
              }

        console.log(q);

        const { getMainPlanSet} = this.props;

        getMainPlanSet(q);


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
        //t.state[fileID].push(reader.result.substring(reader.result.indexOf(",") + 1) );   
        t.state[fileID].push(reader.result);
    }, 1000,reader,fileID,this);
    // reader.onload = function(){
    //   //读取完成后，数据保存在对象的result属性中
    //   console.log("上传文件内容: ");
    //   console.log(this.result)
    //   this.state[fileID].push(this.result);
    // }

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





   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {

        const { getInitData,getTotalFitting,getResultInfoDetail} = this.props;
        getInitData({});

        var qFitObj={
                starttime:moment(this.refs.qStarttime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
                endtime:moment(this.refs.qStarttime.getInput().value).add(1,'months').format('YYYY-MM-DD HH:mm:ss')
                //endtime:moment(this.refs.qEndtime.getInput().value).format('YYYY-MM-DD HH:mm:ss'),
              }
      // getTotalFitting(qFitObj)

      this.queryData(1);


  

   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.jihua, mapDispatchToProps)(Jihua);
