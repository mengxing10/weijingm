/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
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
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Checkbox} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Jibenxinxi extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.curAttributeValue=[];
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            deviceType:-1,
            xinzeng:false,
            chakan:false,

            //查询用:
            qlayoutID:-1,
            qname:'',

            selectDevicecountID:-1,

            //创建:
            layoutID:-1,
            deviceTypeID:-1,
            deviceAssetName:'',
            attributeValue:[],

            aa:-1


        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onXinzeng(){
      this.setState({xinzeng:true})
    }

    onXingzengY(){


       if(this.state.layoutID==-1|| this.state.deviceTypeID==-1||this.state.deviceAssetName=='' || this.curAttributeValue.length==0|| this.curAttributeValue.indexOf('')>-1)
       {
              alert("信息不完整");return;

       }


       this.setState({xinzeng:false,chakan:false})
       const{addDevice,deviceByTypeData} = this.props;


      var attributeKey =[],attributeType=[],attributeUnit=[];
      if(deviceByTypeData && deviceByTypeData.data.length>0)
        {
           //newObj.layoutId =  deviceByTypeData.data[0].deviceTypeID;
           for(var k=0;k<deviceByTypeData.data.length;k++)
           {

              attributeKey.push(deviceByTypeData.data[k].attributeKey);
              attributeType.push(deviceByTypeData.data[k].attributeType);
              attributeUnit.push(deviceByTypeData.data[k].attributeUnit);

           }
        }


       var newObj = {

                      layoutId:this.state.layoutID,
                      deviceAssetName: this.state.deviceAssetName,
                      deviceTypeId:this.state.deviceTypeID,
                      attributeValue: this.curAttributeValue,
                      attributeKey:attributeKey,
                      attributeUnit:attributeUnit,
                      attributeType:attributeType
            };

       console.log("添加设备如下：");
       console.log(newObj);
       addDevice(newObj,this);



    }

    onXingzengN(){
      this.setState({xinzeng:false,chakan:false})
    }
    // onChakan(){
    //   this.setState({chakan:true})
    // }
    handleChange = (e, { value }) => this.setState({ value })

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {

        var othis = this;
        var {  devicecountData,layoutData,deviceByTypeData,devicetypeData,deviceInfoData}  =this.props;


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




        //设备类型
        var devicetypeOptions =[ { key: -1, text: '请选择', value: -1 }];
        if(devicetypeData&&devicetypeData.resultCode==0)
        {

            for(var i=0;i<devicetypeData.data.length;i++)
            {
                  var newOpt = {};
                  newOpt.key = devicetypeData.data[i].deviceTypeID;
                  newOpt.value = devicetypeData.data[i].deviceTypeID;
                  newOpt.text = devicetypeData.data[i].deviceTypeName;
                  devicetypeOptions.push(newOpt );
            }
        }


        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        let title = ""
        let project =this.props.location.query.project;
          title += project=="jbxx"?"基本信息":project=="wbjh"?"维保计划":project=="wbjl"?"维保记录":"基本信息"

        const thead=[{width:"20%",value:"编号"},{width:"20%",value:"泵站"},{width:"20%",value:"设备名称"},{width:"20%",value:"类别"}
                    ,{width:"20%",value:"操作"}]  //,{width:"15%",value:"台数"}

        const options =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '抄表人a', value: 2 },
          { key: 3, text: '抄表人b', value: 3 },
          { key: 4, text: '抄表人c', value: 4 },
          { key: 5, text: '抄表人d', value: 5 }
        ]

        var tbody=[];
        // const tbody=[[1,"1#水泵","水泵","1",<span><i>修改</i><i onClick={this.onChakan.bind(this)}>查看</i></span>],
        // [2,"102#水泵","水泵","3",<span><i>修改</i><i onClick={this.onChakan.bind(this)}>查看</i></span>],
        // [3,"","","",""],
        // [4,"","","",""],
        // [5,"","","",""],
        // [6,"","","",""]
        // ]

        var deviceLines = [];
        if(deviceByTypeData && deviceByTypeData.data.length>0)
        {

                     deviceLines = [];
                     var lineNum = Math.ceil(deviceByTypeData.data.length/3);
                     console.log("lineNum: " + lineNum );
                      for(var u=0;u<lineNum;u++)
                      {

                        deviceLines.push(u);

                      }
                    othis.state.attributeValue.length=0;

                    deviceByTypeData.data.map(function(t){othis.state.attributeValue.push('')});


        }





        var deviceInfoLines = [];
        if(deviceInfoData && deviceInfoData.data.length>0)
        {

                    deviceInfoLines = [];
                    var lineNum = Math.ceil(deviceInfoData.data.length/3);
                    console.log("deviceInfoLines: " + lineNum );
                    for(var u=0;u<lineNum;u++)
                    {

                      deviceInfoLines.push(u);

                    }

       }



        var pageCount = 0;
        if(devicecountData && devicecountData.resultCode == 0 )
          {


                   pageCount = devicecountData.data.pageCount;
                   for(var i=0;i<devicecountData.data.data.length;i++)
                   {
                        var  arr = new Array();

                        var workOrderTypeName = "维修";

                        var updateTime = moment (devicecountData.data.data[i].updaetTime).format('YYYY-MM-DD HH:mm:ss');

                        // var btnHtml = <Button style={ { fontSize:"14px"}}    color='teal'  onClick={this.openUpdate.bind(this,devicecountData.data[i])}>查看</Button>

                        // var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>
                        var  statusFlag = "chakan";
                        var sid = devicecountData.data.data[i].statusID;


                        var btnHtml = <span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan.bind(this,statusFlag,devicecountData.data.data[i].deviceAssetID)} >查看</span>
                        var arr = [devicecountData.data.data[i].deviceAssetID, devicecountData.data.data[i].layoutName,devicecountData.data.data[i].deviceAssetName, devicecountData.data.data[i].deviceTypeName,btnHtml];  //devicecountData.data.data[i].num,
                        tbody.push(arr);


                   }
          }






        return (
          <div className="table-shebei">
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="sub-title fix">

              <span className={-1 == this.state.qlayoutID? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,-1)} >全部</span>

              { layoutData.resultCode==0&&layoutData.data.map(function(item){

              return <span key={item.layoutID} className={item.layoutID == othis.state.qlayoutID? "itab active" : 'itab'} onClick={othis.selectDeviceType.bind(othis,item.layoutID)}>{item.layoutName}</span>

              } )}

           {/*
              <span className={'28' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'28')}>28#泵站</span>
              <span className={'38' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'38')}>38#泵站</span>
              <span className={'huanghe' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'huanghe')}>黄河泵站</span>
              <span className={'6' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'6')}>6#泵站</span>
           */}

            </div>
            <div className="query-condition">
                <span className="query-name labStyle">设备名称</span>
                  <Input type="text" className="query-value" ref="deviceName" name=""    onChange={this.handleChangeInput.bind(this,'qname')} />
                   {/*  <label className="labStyle">开始时间</label>
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
                <label className="labStyle">结束时间</label>
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
                 */}
                <span className="commitBtn"  onClick={this.queryData.bind(this,1)}>查询</span><span className="commitBtn" onClick={this.onXinzeng.bind(this)}>新增</span>
            </div>
            <div className="weixiu-table">
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
                        <div className="div1"><label>泵站：</label></div>
                        <div className="div1 div1_tl">
                            <Dropdown
                              onChange={this.handleChangeDropdown.bind(this,'layoutID')}
                              className="query-value"
                               defaultValue={layoutDataOptions[0].value}
                               selection
                               openOnFocus
                               options={layoutDataOptions}
                             />
                        </div>


                        <div className="div1"><label>设备类型：</label></div>
                        <div className="div1 div1_tl">
                            <Dropdown
                              onChange={this.handleChangeDropdown.bind(this,'deviceTypeID')}
                              className="query-value"
                               defaultValue={devicetypeOptions[0].value}
                               selection
                               openOnFocus
                               options={devicetypeOptions}
                             />

                        </div>

                        <div className="div1"><label>设备名称：</label></div>
                        <div className="div1 div1_tl">
                        <Input onChange={this.handleChangeInput.bind(this,'deviceAssetName')}/>
                        </div>



                    </div>





                       {
                            deviceLines.map(function(item){
                           return     <div key={item*3} className="items fix">



 {item*3<deviceByTypeData.data.length&&<div>

   <div className="div1"><label>{ deviceByTypeData.data[item*3].attributeKey}&nbsp;{ deviceByTypeData.data[item*3].attributeUnit}</label>：</div>
   <div className="div1 div1_tl"> <Input key={Math.random()*100}  defaultValue=''  onChange={othis.handleChangeInputAdd.bind(othis,item*3)}/></div>
  </div>
 }

 {item*3+1<deviceByTypeData.data.length&&<div>

   <div className="div1"><label>{ deviceByTypeData.data[item*3+1].attributeKey}&nbsp;{ deviceByTypeData.data[item*3+1].attributeUnit}</label>：</div>
   <div className="div1 div1_tl"> <Input key={Math.random()*100} defaultValue='' onChange={othis.handleChangeInputAdd.bind(othis, item*3+1)}/></div>
  </div>
 }

 {item*3+2<deviceByTypeData.data.length&&<div>

   <div className="div1"><label>{ deviceByTypeData.data[item*3+2].attributeKey}&nbsp;{ deviceByTypeData.data[item*3+2].attributeUnit}</label>：</div>
   <div className="div1 div1_tl"><Input key={Math.random()*100}  defaultValue='' onChange={othis.handleChangeInputAdd.bind(othis,item*3+2)} /></div>
  </div>
 }



                                </div>

                            })
                       }





                     {/*
                      <div className="items fix">
                        <div className="div1"><label>设备名称：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>安装位置：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>额定电压：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>


                      <div className="items fix">
                        <div className="div1"><label>厂家：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>泵转速：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>泵的版本：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>铭牌上标准：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>额定电流：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>额定功率：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>橡胶代码：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>进出水代码：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>叶轮：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>材料代码：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>最大压力/温度（高温）：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>最大压力/温度（低温）：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>法兰标准：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>压力等级：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>进出口：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>介质温度（常温型）：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>介质温度（低温型）：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>最大环境温度：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>电机相数：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>防护等级：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>绝缘等级：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>电机功率：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                        <div className="div1"><label>能效等级：</label></div>
                        <div className="div1 div1_tl"><input type="text" /></div>
                      </div>
                    */}
                    </div>
                  </div>
              </div>}


            {this.state.chakan &&
              <div className="modal-xinzeng modal-chakan">
                  <div className="title">
                      <span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">

                  {/*
                      <div className="items fix">
                        <div className="div1"><label>设备名称：</label></div>
                        <div className="div1 div1_tl">XXX</div>
                        <div className="div1"><label>安装位置：</label></div>
                        <div className="div1 div1_tl">AAAAA</div>
                        <div className="div1"><label>额定电压：</label></div>
                        <div className="div1 div1_tl">XXXX</div>
                      </div>
                  */}

                       {
                            deviceInfoLines.map(function(item){
                           return     <div className="items fix">



 {item*3<deviceInfoData.data.length&&<div>

   <div className="div1"><label>{ deviceInfoData.data[item*3].attributeKey}</label>: </div>
   <div className="div1 div1_tl">{ deviceInfoData.data[item*3].attributeValue }{ deviceInfoData.data[item*3].attributeUnit}</div>
  </div>
 }

 {item*3+1<deviceInfoData.data.length&&<div>

   <div className="div1"><label>{ deviceInfoData.data[item*3+1].attributeKey}</label>:</div>
   <div className="div1 div1_tl">{  deviceInfoData.data[item*3+1].attributeValue }{ deviceInfoData.data[item*3+1].attributeUnit}</div>
  </div>
 }

 {item*3+2<deviceInfoData.data.length&&<div>

   <div className="div1"><label>{ deviceInfoData.data[item*3+2].attributeKey}</label>: </div>
   <div className="div1 div1_tl">{ deviceInfoData.data[item*3+2].attributeValue }{ deviceInfoData.data[item*3+2].attributeUnit}</div>
  </div>
 }



                                </div>

                            })
                       }

                       {/*
                      <div className="items fix">
                        <div className="div1"><label>厂家：</label></div>
                        <div className="div1 div1_tl"></div>
                        <div className="div1"><label>泵转速：</label></div>
                        <div className="div1 div1_tl">111</div>
                        <div className="div1"><label>泵的版本：</label></div>
                        <div className="div1 div1_tl"></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>铭牌上标准：</label></div>
                        <div className="div1 div1_tl">XXXXXX</div>
                        <div className="div1"><label>额定电流：</label></div>
                        <div className="div1 div1_tl"></div>
                        <div className="div1"><label>额定功率：</label></div>
                        <div className="div1 div1_tl"></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>橡胶代码：</label></div>
                        <div className="div1 div1_tl">xxxxxxxxx</div>
                        <div className="div1"><label>进出水代码：</label></div>
                        <div className="div1 div1_tl">xxxxxxxxxxx</div>
                        <div className="div1"><label>叶轮：</label></div>
                        <div className="div1 div1_tl">123qw</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>材料代码：</label></div>
                        <div className="div1 div1_tl">aaaaaa</div>
                        <div className="div1"><label>最大压力/温度（高温）：</label></div>
                        <div className="div1 div1_tl">zxczzz</div>
                        <div className="div1"><label>最大压力/温度（低温）：</label></div>
                        <div className="div1 div1_tl">xxxxxxx</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>法兰标准：</label></div>
                        <div className="div1 div1_tl">QAS</div>
                        <div className="div1"><label>压力等级：</label></div>
                        <div className="div1 div1_tl">3</div>
                        <div className="div1"><label>进出口：</label></div>
                        <div className="div1 div1_tl">ER</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>介质温度（常温型）：</label></div>
                        <div className="div1 div1_tl">123</div>
                        <div className="div1"><label>介质温度（低温型）：</label></div>
                        <div className="div1 div1_tl">23</div>
                        <div className="div1"><label>最大环境温度：</label></div>
                        <div className="div1 div1_tl">342</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>电机相数：</label></div>
                        <div className="div1 div1_tl">2</div>
                        <div className="div1"><label>防护等级：</label></div>
                        <div className="div1 div1_tl">1</div>
                        <div className="div1"><label>绝缘等级：</label></div>
                        <div className="div1 div1_tl">1</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>电机功率：</label></div>
                        <div className="div1 div1_tl">120</div>
                        <div className="div1"><label>能效等级：</label></div>
                        <div className="div1 div1_tl">1</div>
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



    handleChangeInputAdd(theIdx,ev)
    {
      console.log("改变input," + theIdx + " ====" +  ev.target.value )
     // this.setState({[code]:ev.target.value})  //"gongWeiCode"
     // this.state[code] =  ev.target.value;


     this.state.attributeValue[theIdx]  = ev.target.value;
     this.curAttributeValue = [];
     for(var u=0;u<this.state.attributeValue.length;u++)
     {
         this.curAttributeValue.push( this.state.attributeValue[u]);

     }

     //console.log(this.state.attributeValue);
     console.log(this.curAttributeValue);



    }

    handleChangeStart(){
       //test handleChange Input value  event ganweitech:homeAction
    }
    handleChangeEnd(){

    }


    onChakan(statusFlag,deviceAssetID)
    {

         const {getDeviceByType,getDeviceInfo } = this.props;
        // getDeviceByType({devicetypeid:devicecountID});
         getDeviceInfo({deviceassetid:deviceAssetID});
         var kan = {};
         kan[statusFlag] = true;
         kan["selectDevicecountID"] = deviceAssetID;
         this.setState(kan);
    }


  changePager(id)
        {

            const { devicecountData}  =this.props;

           //  if(id>devicecountData.data.pageCount+1) return;
           //  console.log("curPage:" + id +", totalPageCount:" + devicecountData.data.pageCount )
           // this.setState({fetchcditem: true,page:id});
            this.queryData(id);

        }
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
                name:this.state.qname
              }

        console.log(q);

        const { getDevicecount} = this.props;

        getDevicecount(q);


    }




    selectDeviceType(deviceTypeID)
    {
      this.setState({qlayoutID: deviceTypeID});
      console.log("qlayoutID:" + deviceTypeID );
    }


  handleChangeDropdown(code,ev,obj)
    {
      console.log("改变DropDown," + code + " ====" +  obj.value )
     // this.setState({[code]:ev.target.value})  //"gongWeiCode"
      this.state[code] =  obj.value;

      if(code=='deviceTypeID')  //切换设备类型
      {

         const {getDeviceByType } = this.props;
         getDeviceByType({devicetypeid:obj.value});

         //this.state.attributeValue.map(function(item){item='';});




      }


    }


   checkResult(res,t)
   {

     alert(res.resultMessage);
    // if(res.resultCode==0)
        //  t.closeCreate();

   }



   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {



        const { getDevicecount,getInitData} = this.props;

        // var q = {
        //           pagesize:8,
        //           pageno:1
        //         };

        // getDevicecount(q);
        getInitData({});

   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.jibenxinxi, mapDispatchToProps)(Jibenxinxi);
