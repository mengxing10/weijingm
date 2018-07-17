
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
    const statue = this.props.type=='xiaolv'?'效率':this.props.type=='jiankangdu'?'健康':'';
    const show = this.props.type=='xiaolv'?false:true;
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
                  {show &&
                    <div className="query-data">
                    <Dropdown placeholder='数据选择' fluid  selection  options={options}
                       defaultValue={this.state.dataTypes} ref="shujuType"
                      onChange={this.onChangeDataType.bind(this,this.props.type)}/>
                    </div>}
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
                </div>
                <div className="charts-wrap" >
                    <div className="left-charts" >
                    { show&&<ReactEcharts
                          option={this.state.optionsType}  //this.state.optionsType
                           onEvents={EventsDict}
                           className="charts-body"/>}
                   {!show && <ReactEcharts
                         option={this.state.optionsType}  //this.state.optionsType
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
      var shujuType = obj.value;
      var shuju = [];
      var time = this.state.endDate;
      if(shujuType=='shishi'){
        time = moment(this.state.endDate).subtract(1,'d')
      }
      if(shujuType=='xiaoshi'){
        time = moment(this.state.endDate).subtract(3,'d')
      }
      if(shujuType=='ri'){
        time = moment(this.state.endDate).subtract(15,'d')
      }
      if(shujuType=='yue'){
        time = moment(this.state.endDate).subtract(1,'y')
      }
      this.setState({
        startDate:time
      })
      shuju = this.getCurrentData(time,this.state.endDate,obj.value,this.props.type);
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
        month_sub+=12*year_sub;
      }
      num = month_sub;
      formatStr='YYYY/MM';
      addType='M';
    }
    if(statue=='jiankangdu'){
      max=90;min=50;
      for(var i=0;i<=num;i++){
        xdata.push(moment(starttime).add(i, addType).format(formatStr));
        ydata0.push(baseEnd);
        ydata1.push(Math.floor(Math.random()*(max-min+1)+min));
      }
    }
    if(statue=='xiaolv'){
      max=15;min=1;
      for(var i=0;i<=num;i++){
        xdata.push(moment(starttime).add(i, addType).format(formatStr));
        var seriesList = {
          series:[
            {data:[2,4,6,8,9,10,9,8,7,6,4,2],type:'line',symbol:'none'},
            {name:"101水泵",data:[[2, 9],[Math.floor(Math.random()*(max-min+1)+min), 6.95],[Math.floor(Math.random()*(max-min+1)+min), 7.58],
                [9.0, 8.81],[11.0, 8.33],[Math.floor(Math.random()*(max-min+1)+min), 9.96],[6.0, 7.24],[4.0, 4.26],[Math.floor(Math.random()*(max-min+1)+min), 10.84],[7.0, 4.82],[5.0, 5.68]
            ],type: 'scatter'}
          ]}
          ydata0.push(seriesList);
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
    var types = 'shishi';
    var shuju = {};
    if(type=='xiaolv'){
      types = 'ri';
      shuju = this.getCurrentData(moment().subtract(7,'d'),this.state.endDate,types,type);
    }else{
      shuju = this.getCurrentData(this.state.startDate,this.state.endDate,types,type);
    }
    var XiangMuDaBiaoLv_tc = this.getOptions(type,shuju);
    this.setState({optionsType:XiangMuDaBiaoLv_tc});
  }
  getOptions(type,shuju){
    var XiangMuDaBiaoLv_tc ={};
    if(type=='jiankangdu'){
      XiangMuDaBiaoLv_tc = {
        lineColors: ["#facc17","#f04864"], //2c8cf9
        barWidth:8,
        grid: ['40%','15%','5%','5%'],
        legend:{left:'40%',top:'6%'},
        xAxis: {name:"",data:shuju.xdata}, //月
        yAxis: {name:["%"]},
        series:{
            lines:[
              {name:"故障",data:shuju.ydata1,areaStyle: {normal: {color:"#facc17"}},symbol:'emptyCircle' },
              {name:"警戒",data:shuju.ydata0,lineStyle:{ type:'dashed'} }
            ],
         }
      };
      return GeneralCharts.theLineBar(XiangMuDaBiaoLv_tc);
    }
    if(type=='xiaolv'){
      var max=15,min=1;
      var options = {
        lineColors: ["#73eecc","#00e099","#facc17","#5c67e5"], //2c8cf9
        scatterColors: ["#73eecc","#00e099","#facc17","#5c67e5"],  //2c8cf9
        grid: ['25%','15%','20%','5%'],
        legend:{left:'30%',top:'6%',},
        xAxis: {name:"m³/h",data:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
        yAxis: {name:["H/m"]},
        series: {
        },
      };
      var baseOption =  GeneralCharts.theLineBar(options);
      baseOption.timeline= {
        show: true,
        y:0,
        axisType: 'time',
        lineStyle:{color:'white'},
        label:{color:'white',position:10},
        controlStyle:{normal:{color:'white',borderWidth:{color:'white',borderColor:'white'}},itemSize:20,itemGap:16},
        data: shuju.xdata,
        tooltip: {formatter: '{c}'},
        top:'81%',
      };
      baseOption.tooltip.trigger = 'item';
      baseOption.tooltip.formatter = function(params) {
		            			                return params.seriesName + '<br/> ' +params.value[0]+options.xAxis.name + '<br/> '+params.value[1]+options.yAxis.name;
		            			        };
      console.log(baseOption)
      XiangMuDaBiaoLv_tc.baseOption =  baseOption;
      XiangMuDaBiaoLv_tc.options = shuju.ydata0;
      return XiangMuDaBiaoLv_tc;
    }
    return XiangMuDaBiaoLv_tc;
  }
  tanchuangClose(){
    this.props.tanchuangClose()
  }

  handleChangeStart(dateString, { dateMoment, timestamp}) {
      var shujuType = '';
      if(this.props.type=='xiaolv'){
        shujuType='ri'
      }else{
        shujuType = this.refs.shujuType.state.value;
      }
      var timeCha = this.state.endDate.toDate().getTime() - dateMoment.toDate().getTime();
      const{infos,endDate,startDate} = this.state
      var shuju = [];
      if(shujuType=='shishi'){
        if (timeCha<0) {
          if(dateMoment.toDate().getTime()>moment().toDate().getTime()){
            shuju = this.getCurrentData(startDate,endDate,'shishi',this.props.type)
          }else if(moment().toDate().getTime()-dateMoment.toDate().getTime()<3600*24*1000){
            this.setState({
              startDate: moment().subtract(1,'h'),
              endDate: moment(),
            })
            shuju = this.getCurrentData(moment().subtract(1,'h'),moment(),'shishi',this.props.type)
          }else{
            this.setState({
                startDate: dateMoment,
                endDate: moment(dateString).add(1,'d')
            })
            shuju = this.getCurrentData(dateMoment,moment(dateString).add(1,'d'),'shishi',this.props.type)
          }
        }else{
          this.setState({
              startDate: dateMoment,
              endDate: moment(dateString).add(1,'d')
          })
          shuju = this.getCurrentData(dateMoment,moment(dateString).add(1,'d'),'shishi',this.props.type)
        }
      }else{
        if (timeCha<0) {
          this.setState({
              startDate: this.state.endDate,
              endDate: dateMoment
          })
          shuju = this.getCurrentData(endDate,dateMoment,shujuType,this.props.type)
        }else {
          this.setState({
              startDate: dateMoment,
          })
          shuju = this.getCurrentData(dateMoment,endDate,shujuType,this.props.type)
        }
      }
      var XiangMuDaBiaoLv_tc = this.getOptions(this.props.type,shuju);
      this.setState({optionsType:XiangMuDaBiaoLv_tc});
    }

  handleChangeEnd(dateString, { dateMoment, timestamp}) {
      const{infos,startDate,endDate} = this.state
      var shujuType = '';
      if(this.props.type=='xiaolv'){
        shujuType='ri'
      }else{
        shujuType = this.refs.shujuType.state.value;
      }
      var timeCha = moment().toDate().getTime() - dateMoment.toDate().getTime();
      var endStartcha = dateMoment.toDate().getTime() - this.state.startDate.toDate().getTime();
      var shuju = [];
      if(timeCha<0||endStartcha<0){//结束时间大于当前时间,或者结束时间小于开始时间
        this.setState({
            endDate: moment()
        })
        shuju = this.getCurrentData(startDate,moment(),shujuType,this.props.type)
      }else{
        if(shujuType=='shishi'){
          if(dateMoment.toDate().getTime() - this.state.startDate.toDate().getTime() > 24*3600000){
            this.setState({
                endDate: moment(startDate).add(1,'d')
            })
            shuju = this.getCurrentData(startDate,moment(startDate).add(1,'d'),shujuType,this.props.type)
          }else{
            this.setState({
                endDate: dateMoment
            })
            shuju = this.getCurrentData(startDate,dateMoment,shujuType,this.props.type)
          }
        }else{
          this.setState({
              endDate: dateMoment
          })
          shuju = this.getCurrentData(startDate,dateMoment,shujuType,this.props.type)
        }
      }

      var XiangMuDaBiaoLv_tc = this.getOptions(this.props.type,shuju);
      this.setState({optionsType:XiangMuDaBiaoLv_tc});
    }

  getRandomNum(max,min){
    var num = 0;
    num = Math.floor(Math.random()*(max-min+1)+min)
    return num;
  }

  onChangeJianyi(){
    var con = ['建议们建议们泵组泵站XXXXXXXXXXXXXXXsdfdgfrddfdv',
    '运行良好，经常检查维护即可.运行良好，经常检查维护即可.运行良好，经常检查维护即可',
  '运行不良好，请尽快安排人员维修','AAAAAAAAAAAAA运行不良好，请尽快安排人员维修'];
    con.sort(function(){return (0.5-Math.random());})
    this.setState({jianyi:con[0]});
  }
  componentWillMount(){
    if(this.props.type=='xiaolv'){
      this.setState({startDate:moment().subtract(7,'d')})
    }
    this.handleClickStart(this.props.type)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if ((_.isEqual(this.props.shuju, nextProps.shuju)&&_.isEqual(this.state, nextState)) ) {
        return false
    }
    return true
  }



}
