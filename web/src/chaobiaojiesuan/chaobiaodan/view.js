/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import {chaobiaodanAPI} from './constants/api'
import './styles/index.styl'
import classNames from 'classnames'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Checkbox} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Chaobiaodan extends Component {
    constructor(props) {
        super(props)
        this.reportid='';
        this.state = {
            startDate: moment().subtract(3,'M'),
            endDate: moment(),
            cbstartDate:moment().subtract(1,'d'),
            cbendDate:moment().subtract(1,'d'),
            xinzeng:false,
            chakan:false
        }
    }


    render() {
      var startDate = moment();
      var endDate = moment();
        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'};
        let title = ""
        let project =this.props.location.query.project;
          title += project=="cb"?"抄表":project=="cbd"?"抄表单":project=="jsd"?"结算单":"抄表"


        const thead=[{width:"10%",value:"编号"},{width:"20%",value:"抄表单日期"}
                    ,{width:"35%",value:"起止日期"},{width:"20%",value:"是否结算"},{width:"10%",value:"操作"}]
        let chaobiaodanlist = this.props.chaobiaodanlist;
        const  tbody = this.parseTbBody(chaobiaodanlist.data);


      const thead2=[{width:"10%",value:"编号"},{width:"20%",value:"项目/工位代码"}
      ,{width:"20%",value:"项目/工位名称"},{width:"20%",value:"抄表日期"},{width:"10%",value:"电表读数"}
      ,{width:"10%",value:"累时器读数"},{width:"10%",value:"水表"}]

      const tbody2=this.parseTbBody2(this.props.chaobiaolist);

      let chaobiaodaninfo = this.props.chaobiaodaninfo;
    const thead3=[{width:"20%",value:"项目/工位"},{width:"15%",value:"电表读数"}
                ,{width:"15%",value:"累时器读数"},{width:"15%",value:"水表读数"}
                ,{width:"20%",value:"抄表日期"},{width:"15%",value:"备注"}]

    const tbody3=this.parseTbBody3(chaobiaodaninfo.page.data);

        return (
          <div className="table-chaobiao" style={BodyStyle}>
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="query-condition">
                <label className="labStyle">抄表时间</label>
                    <DateField
                        dateFormat="YYYY-MM-DD"
                        locale="zh-cn"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        //defaultValue={startDate}
                        value={this.state.startDate}
                        onChange={::this.handleChangeStart}
                        ref="starttime"
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
                    dateFormat="YYYY-MM-DD"
                    locale="zh-cn"
                    forceValidDate={true}
                    updateOnDateClick={true}
                    //defaultValue={endDate}
                    value={this.state.endDate}
                    onChange={::this.handleChangeEnd}
                    ref="endtime"
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
                <span className="commitBtn" onClick={this.onHandleSearch.bind(this)}>查询</span>
            </div>
            <div className="weixiu-table">
              <div className="xinzeng-btn"><span onClick={this.onXingzeng.bind(this)} >新增抄表单</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
               <Pager total={this.props.chaobiaodanlist.pageCount}
                      gap={2}
                      change={::this.changePager}
                      current ={this.props.chaobiaodanlist.pageNo}
                      fetching={false}
                /></div>
            </div>
            {this.state.xinzeng &&
              <div className="modal-xinzeng">
                  <div className="query-condition">
                    <label className="labStyle">开始日期</label>
                    <DateField
                        dateFormat="YYYY-MM-DD"
                        locale="zh-cn"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        //defaultValue={startDate}
                        value={this.state.cbstartDate}
                        onChange={::this.handleChangeStartcb}
                        ref="cbstarttime"
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
                    <label className="labStyle">终止日期</label>
                    <DateField
                      dateFormat="YYYY-MM-DD"
                      locale="zh-cn"
                      forceValidDate={true}
                      updateOnDateClick={true}
                      //defaultValue={endDate}
                      value={this.state.cbendDate}
                      onChange={::this.handleChangeEndcb}
                      ref="cbendtime"
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
                      <span className="commitBtn" onClick={this.onHandleSearchcb.bind(this)}>查询</span>
                      <span onClick={this.onXingzengN.bind(this)} className="commitBtn btn">返回</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="weixiu-table">
                      <div className="table-title"></div>
                      <MyTable thead={thead2} tbody={tbody2}/>
                      <span className="content-botm-btn" onClick={this.onAddchaobiaodan.bind(this)} >生成抄表单</span>
                    </div>
                  </div>
              </div>}


            {this.state.chakan &&
              <div className="modal-xinzeng">
                  <div className="title">
                    <span onClick={this.onDayin.bind(this,chaobiaodanAPI.getexport,this.reportid)} className="btn">导出</span>
                    <span onClick={this.onXingzengN.bind(this)} className="btn">返回</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="weixiu-table">
                      <div className="table-title">{chaobiaodaninfo.reportStartDate}至{chaobiaodaninfo.reportEndDate}</div>
                      <MyTable thead={thead3} tbody={tbody3}/>
                    </div>
                  </div>
              </div>}
          </div>
        )
    }
    //导出
    onDayin(url,query){
      //window.open(url+'?reportid='+query)
      var element = document.createElement("a");
      element.setAttribute("href", url+'?reportid='+query);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  //查询抄表单
  onHandleSearch(){
    var starttime = this.refs.starttime.field.props.value;
    var endtime = this.refs.endtime.field.props.value;
    const {getChaobiaodanData}  = this.props
    let pars ={};
    pars["startEndDate"]=starttime;
    pars["endEndDate"]=endtime;
    pars["pageSize"]=10;
    getChaobiaodanData(pars);
  }
  //查询抄表
  onHandleSearchcb(){
    var starttime = this.state.cbstartDate;//this.refs.cbstarttime.field.props.value;
    var endtime = this.state.cbendDte;//this.refs.cbendtime.field.props.value;
    const {getChaobiaoData}  = this.props
    let pars ={};
    pars["startReadingDate"]=starttime;
    pars["endReadingDate"]=endtime;
    getChaobiaoData(pars);
  }
  //生成抄表单
  async onAddchaobiaodan(){
    var cbstarttime = this.refs.cbstarttime.field.props.value;
    var cbendtime = this.refs.cbendtime.field.props.value;
    const {addChaobiaodan}  = this.props
    let pars ={};
    pars["reportStartDate"]=cbstarttime;
    pars["reportEndDate"]=cbendtime;
    await addChaobiaodan(pars);

    this.onHandleSearch();

    this.onXingzengN();
  }
  //分页
  changePager(value){
    const {getChaobiaodanData}  = this.props
    let pars ={};
    var starttime = this.refs.starttime.field.props.value;
    var endtime = this.refs.endtime.field.props.value;
    pars["startEndDate"]=starttime;
    pars["endEndDate"]=endtime;
    pars["pageNo"]=value;
    pars["pageSize"]=10;
    getChaobiaodanData(pars);
  }
  changeMenu(event,object)
  {
    var selMenu = object.value;
  }
  handleChangeInput(ev){
      this.setState({"deviceFilter":ev.target.value})
  }
  onXingzeng(){
    this.setState({xinzeng:true});
    setTimeout(this.onHandleSearchcb(), 1000);
  }
  onXingzengN(){
    this.setState({xinzeng:false,chakan:false})
  }
  onChakan(id){
    this.reportid = id;
    const {getChaobiaodanInfo}  = this.props
    let pars ={};
    pars["reportID"]=id;
    getChaobiaodanInfo(pars);
    this.setState({chakan:true});
  }
  handleChangeStart(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().toDate().getTime()){
      this.setState({
        startDate:moment()
      });
      return;
    }
    if(this.state.endDate.toDate().getTime()<dateMoment.toDate().getTime()){
      this.setState({
        endDate: dateMoment,
        startDate:this.state.endDate
      });
    }else{
      this.setState({
        startDate: dateMoment
      });
    }
  }
  handleChangeEnd(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().toDate().getTime()){
      this.setState({
        endDate:moment()
      });
      return;
    }
    if(this.state.startDate.toDate().getTime()>dateMoment.toDate().getTime()){
      this.setState({
        startDate: dateMoment,
        endDate:this.state.startDate
      });
    }else{
      this.setState({
        endDate: dateMoment
      });
    }
  }
  handleChangeStartcb(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().subtract(1,'d').toDate().getTime()){
      this.setState({
        cbstartDate:moment().subtract(1,'d')
      });
      return;
    }
    if(this.state.cbendDate.toDate().getTime()<dateMoment.toDate().getTime()){
      this.setState({
        cbendDate: dateMoment,
        cbstartDate:this.state.cbendDate
      });
    }else{
      this.setState({
        cbstartDate: dateMoment
      });
    }
  }
  handleChangeEndcb(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().subtract(1,'d').toDate().getTime()){
      this.setState({
        cbendDate:moment().subtract(1,'d')
      });
      return;
    }
    if(this.state.cbstartDate.toDate().getTime()>dateMoment.toDate().getTime()){
      this.setState({
        cbstartDate: dateMoment,
        cbendDate:this.state.cbstartDate
      });
    }else{
      this.setState({
        cbendDate: dateMoment
      });
    }
  }

  componentWillReceiveProps(nextprops){}
  componentDidMount() {
    this.onHandleSearch();
  }
  componentWillUnmount() {}
  parseTbBody(data){
    return data.map((item, i) => {
      //[1,"2018年04月02日","2018-02-08至2018-03-08","是",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)}>查看</span>]
      var status = <span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this,item.reportID)}>查看</span>;
      return ([i+1,item.createTime,item.reportStartDate+"至"+item.reportEndDate,item.hasCharged,status]);
    })
  }
  parseTbBody2(data){
    return data.map((item, i) => {
      //[编号,项目/工位代码,项目/工位名称,"抄表日期",电表，累时器，水表]
      var dbps = item.dbps;
      var lsqxss = item.lsqxss;
      var sbs = item.sbs;
      dbps = typeof(dbps)=='undefined'?'':dbps;
      lsqxss = typeof(lsqxss)=='undefined'?'':lsqxss;
      sbs = typeof(sbs)=='undefined'?'':sbs;
      return ([i+1,item.stationGroupCode,item.stationGroupName,item.readingDate,dbps,lsqxss,sbs]);
    })
  }
  parseTbBody3(data){
    return data.map(item=>{
      var beizhu = item.description.substring(1,10);
      var status = <span title={item.description}>{beizhu}</span>;//
      return ([item.stationGroupName,item.electricMeterValue,item.timerMeterValue,item.waterMeterValue,item.readingDate,status]);
    });
  }
}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.chaobiaodan, mapDispatchToProps)(Chaobiaodan);
