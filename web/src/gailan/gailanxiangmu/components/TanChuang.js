
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import _ from 'lodash'
import GeneralCharts from '../../../common/components/GeneralCharts'
import {Form, Button,Dropdown, Input,Checkbox,Grid} from 'semantic-ui-react'
import { DateField,DatePicker } from 'react-date-picker'
import moment from 'moment'
import '../styles/index.styl'
export default class TanChuang extends Component {

  constructor(props) {
      super(props)
      this.state={
        startDate: moment().subtract(1,'h'),
        endDate: moment(),
        dataTypes:'shishi',
        statue:'',
        optionsType:null,
        jianyi:''
      }

  }

  render() {
    const statue = this.props.type=='dabiaolv'?'达标率':this.props.type=='zuoyelv'?'作业率':this.props.type=='jiankangdu'?'健康度':this.props.type=='nengxiao'?'能效':'';
    const options = [
      {
        key: '实时数据',
        text: '实时数据',
        value: 'shishi',
      },
      {
        key: '小时数据',
        text: '小时数据',
        value: 'xiaoshi',
      },
      {
        key: '逐日数据',
        text: '逐日数据',
        value: 'ri',
      },
      {
        key: '逐月数据',
        text: '逐月数据',
        value: 'yue',
      },


    ]
    var that = this
    const EventsDict = {
        click: function (data, echart) {
          that.onChangeJianyi();
        }
    }
    return(

      <div className="tanchuang">
         <div className="tc_bg"></div>

         <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title fix">
                <h3>{statue}</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div>
              <div className='tc_wrap_body theBody'>
                <div className="tc_wrap_body-top">
                  <div className="query-data">
                  <Dropdown placeholder='数据选择' fluid  selection  options={options}
                     defaultValue={this.state.dataTypes}
                    onChange={this.onChangeDataType.bind(this,this.props.type)}/>
                  </div>
                  <div className="query-condition">
                      <label>日期</label>
                          <DateField
                              dateFormat="YYYY-MM-DD HH:mm:ss"
                              locale="zh-cn"
                              forceValidDate={true}
                              updateOnDateClick={true}
                              // defaultValue={1495031479774}
                              value={this.state.startDate}
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
                                  footer={false}
                                  />
                          </DateField>
                          <label>至</label>
                            <DateField
                            dateFormat="YYYY-MM-DD HH:mm:ss"
                            locale="zh-cn"
                            forceValidDate={true}
                            updateOnDateClick={true}
                            // defaultValue={1495031479774}
                            value={this.state.endDate}
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
                                footer={false}
                                />
                        </DateField>
                  </div>
                  <div className="query-btn">查询</div>
                </div>
                <div className="charts-wrap" >
                    <div className="left-charts" >
                    { this.state.optionsType.yAxis&&<ReactEcharts
                          option={GeneralCharts.theLineBar( this.state.optionsType )}  //this.state.optionsType
                           onEvents={EventsDict}
                           className="charts-body"/>}
                    </div>
                    <div className="right-charts">
                      <h3>运行建议</h3>
                      <div className="jianyi">
                        {this.state.jianyi}
                      </div>
                    </div>
                </div>
             </div>
            </div>

         </div>
      </div>
    )

  }
  onChangeDataType(id,ev,obj){
    var shuju = this.getCurrentData(this.state.startDate,this.state.endDate,obj.value,this.props.type);
    var XiangMuDaBiaoLv_tc = this.getOptions(this.props.type,shuju);
    this.setState({optionsType:XiangMuDaBiaoLv_tc});
  }
  getCurrentData(starttime,endtime,types,statue){
    var num = 0;
    var min=50,max=88,baseTop=80,baseEnd=60,formatStr='YYYY/MM/DD',addType='m';//一些变量
    var xdata=[],ydata0=[],ydata1=[],ydata2=[],ydata3=[],ydata4=[],ydata5=[];
    var timestamp = moment(endtime).format('X')-moment(starttime).format('X');
    if(types=='shishi'){
      num = Math.ceil(timestamp/60);
      formatStr='YYYY/MM/DD HH:mm';
      addType='m';
    }
    if(types=='xiaoshi'){
      num = Math.ceil(timestamp/60/60);
      formatStr='YYYY/MM/DD HH';
      addType='h';
    }
    if(types=='ri'){
      num = Math.floor(timestamp/60/60/24);
      formatStr='YYYY/MM/DD';
      addType='d';
    }
    if(types=='yue'){
      var year_sub = moment(endtime).year() - moment(starttime).year();
      var month_sub = moment(endtime).month() - moment(starttime).month();
      if(year_sub>0){
        month_sub+=12;
      }
      num = month_sub;
      formatStr='YYYY/MM';
      addType='M';
    }
    if(statue=='dabiaolv'||statue=='zuoyelv'){
      for(var i=0;i<=num;i++){
        xdata.push(moment(starttime).add(i, addType).format(formatStr));
        ydata0.push(baseEnd);
        ydata1.push(baseTop);
        ydata2.push(Math.floor(Math.random()*(max-min+1)+min));
      }
    }
    if(statue=='jiankangdu'){
      max=30;min=20;
      for(var i=0;i<=num;i++){
        xdata.push(moment(starttime).add(i, addType).format(formatStr));
        ydata0.push(Math.floor(Math.random()*(max-min+1)+min));
        ydata1.push(Math.floor(Math.random()*(max-min+1)+min));
        ydata2.push(Math.floor(Math.random()*(max-min+1)+min));
      }
    }
    if(statue=='nengxiao'){
      max=30;min=20;
      for(var i=0;i<=num;i++){
        xdata.push(moment(starttime).add(i, addType).format(formatStr));
        ydata0.push(60);
        ydata1.push(40);
        ydata2.push(Math.floor(Math.random()*(70-40+1)+40));
        ydata3.push(Math.floor(Math.random()*(max-min+1)+min));
        ydata4.push(Math.floor(Math.random()*(max-min+1)+min));
        ydata5.push(Math.floor(Math.random()*(max-min+1)+min));
      }
    }

    var shuju={
      xdata:xdata,
      ydata0:ydata0,
      ydata1:ydata1,
      ydata2:ydata2,
      ydata3:ydata3,
      ydata4:ydata4,
      ydata5:ydata5,
    }
    //this.setState({shuju:shuju});
    return shuju;
  }

  handleClickStart(type){
    
    var shuju = this.getCurrentData(this.state.startDate,this.state.endDate,'shishi',type);
    var XiangMuDaBiaoLv_tc = this.getOptions(type,shuju);
    this.setState({optionsType:XiangMuDaBiaoLv_tc});
  }
  getOptions(type,shuju){
    var XiangMuDaBiaoLv_tc ={};
    if(type=="dabiaolv"||type=="zuoyelv"){
      XiangMuDaBiaoLv_tc = {
        title: "",
        grid: ['30%','15%','1%','5%'],
        legend:{left:'center',top:'top'},
        lineColors:  ['#facc17','#73ecee','white'], //可选
        barWidth:8,
        xAxis: {name:'',data:shuju.xdata},
        yAxis: {name:["%"]},
        series:{
          lines:[
             {name:"良",data:shuju.ydata0,lineStyle:{ type:'dashed'} },
             {name:"优",data:shuju.ydata1,lineStyle:{ type:'dashed'} },
             {name:"预测",data:shuju.ydata2,symbol:'emptyCircle'  }
          ],
        }
      };
    }
    if(type=='jiankangdu'){
      XiangMuDaBiaoLv_tc = {
        lineColors:['white'],
        grid: ['40%','15%','5%','5%'],
        legend:{left:'30%',top:'6%'},
        barColors:  [['#73ecee','#73ecee','#73ecee'],['#f04864','#f04864','#f04864']],
        barWidth:8,
        xAxis: {name:"h",data:shuju.xdata},  //月
        yAxis: {name:["台","%"]},
        series:{
                  lines:[
                          {name:"健康度",yAxisIndex:1,data:shuju.ydata0}
                        ],
                  bars: [
                          {name:"正常台数",yAxisIndex:0,data:shuju.ydata1,stack:'个数'},
                          {name:"维修台数",yAxisIndex:0,data:shuju.ydata2,stack:'个数'}
                        ]
               }
      };
    }
    if(type=='nengxiao'){
      XiangMuDaBiaoLv_tc = {
        lineColors:  ['#facc17','#73ecee','white'], //可选
       // barColors:  [['#2fd0e3','#2fd0e3','#2fd0e3'],['#677ee0','#677ee0','#677ee0'],['#ff7687','#ff7687','#ff7687']], //可选
        barColors:  [['#5c67e5','#5c67e5','#5c67e5'],['#facc17','#facc17','#facc17'],['#00e099','#00e099','#00e099']],
        barWidth:8,
        legend:{left:'10%',top:'6%'},
        grid: ['40%','15%','5%','5%'],
        xAxis: {name:"h",data:shuju.xdata},  //月
        yAxis: {name:["组","kW.h/t"]},
        series:{
                  lines:[
                          {name:"基准线",data:shuju.ydata0,lineStyle:{ type:'dashed'} },
                          {name:"最优线",data:shuju.ydata1,lineStyle:{ type:'dashed'} },
                          {name:"吨水能耗",yAxisIndex:0,data:shuju.ydata2},

                        ],
                  bars: [
                          {name:"低能效",yAxisIndex:1,data:shuju.ydata3,stack:'个数'},
                          {name:"中能效",yAxisIndex:1,data:shuju.ydata4,stack:'个数'},
                          {name:"高能效",yAxisIndex:1,data:shuju.ydata5,stack:'个数'}
                        ]
               }
      };
    }
    return XiangMuDaBiaoLv_tc;
  }
  tanchuangClose(){
    this.props.tanchuangClose()
  }
  handleChangeStart(dateString, { dateMoment, timestamp}) {
    const{infos,endDate} = this.state
    var shuju = [];
    console.log(moment(dateMoment).format('YYYY/MM/DD'))
    if (dateMoment.toDate().getTime() > this.state.endDate.toDate().getTime()) {
        this.setState({
            startDate: this.state.endDate,
            endDate: dateMoment
        })
        shuju = this.getCurrentData(endDate,dateMoment,'ri',this.props.type)
    }
    else {
        this.setState({
            startDate: dateMoment,
        })
        shuju = this.getCurrentData(dateMoment,endDate,'ri',this.props.type)
    }
    var XiangMuDaBiaoLv_tc = this.getOptions(this.props.type,shuju);
    this.setState({optionsType:XiangMuDaBiaoLv_tc});
  }
  handleChangeEnd(dateString, { dateMoment, timestamp}) {
    const{infos,startDate,endDate} = this.state
    var shuju = [];
    if (dateMoment.toDate().getTime() < this.state.startDate.toDate().getTime()) {
        this.setState({
            startDate: dateMoment,
            endDate: this.state.startDate
        })
        shuju = this.getCurrentData(dateMoment,startDate,'ri',this.props.type)
    }
    else {
        this.setState({
            endDate: dateMoment,
        })
        shuju = this.getCurrentData(startDate,dateMoment,'ri',this.props.type)
    }
    var XiangMuDaBiaoLv_tc = this.getOptions(this.props.type,shuju);
    this.setState({optionsType:XiangMuDaBiaoLv_tc});
  }
  onChangeJianyi(){
    //this.setState({jianyi:'建议们'})
    
    //
    var con = ['建议们建议们泵组泵站XXXXXXXXXXXXXXXsdfdgfrddfdv',
    '运行良好，经常检查维护即可.运行良好，经常检查维护即可.运行良好，经常检查维护即可',
  '运行不良好，请尽快安排人员维修','AAAAAAAAAAAAA运行不良好，请尽快安排人员维修'];
    con.sort(function(){return (0.5-Math.random());})
    this.setState({jianyi:con[0]});
  }
  componentWillMount(){
    this.handleClickStart(this.props.type)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if ((_.isEqual(this.props.shuju, nextProps.shuju)&&_.isEqual(this.state, nextState)) ) {
        return false
    }
    return true
  }



}
