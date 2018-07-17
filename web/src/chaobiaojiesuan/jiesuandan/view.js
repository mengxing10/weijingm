/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import {billAPI} from './constants/api'
import './styles/index.styl'
import classNames from 'classnames'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Checkbox} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Jiesuandan extends Component {
    constructor(props) {
        super(props)
        this.billid='';
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
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'};
        let title = ""
        let project =this.props.location.query.project;
          title += project=="cb"?"抄表":project=="cbd"?"抄表单":project=="jsd"?"结算单":"抄表"

        const thead=[{width:"10%",value:"编号"},{width:"30%",value:"结算单日期"}
                    ,{width:"35%",value:"起止日期"},{width:"20%",value:"操作"}];
                    console.log(this.props.jiesuandanData);
        const  tbody = this.parseTbBody(this.props.jiesuandanData.data);

      const thead2=[{width:"20%",value:"编号"},{width:"35%",value:"抄表单日期"}
                  ,{width:"45%",value:"起止日期"}]
      const tbody2 = this.parseTbBody2(this.props.cbdlist.data);

      const thead3=[{width:"10%",value:"结算单元"},{width:"15%",value:"用水总量（吨/立方米）"}
                  ,{width:"15%",value:"用电总量（kW·h）"},{width:"20%",value:"吨水能耗基准值（kW·h/t）"},{width:"13%",value:"节电量（kW·h）"}
                ,{width:"13%",value:"节电率（%）"},{width:"13%",value:"节电费（元）"}]
      const tbody3 = this.parseTbBody3(this.props.jiesuandanInfo.billDetails);

        return (
          <div className="table-chaobiao" style={BodyStyle}>
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="query-condition">
                <label className="labStyle">开始时间</label>
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
              <div className="xinzeng-btn"><span onClick={this.onXingzeng.bind(this)} >新增结算单</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={this.props.jiesuandanData.pageCount}
                     gap={2}
                     change={::this.changePager}
                     current ={this.props.jiesuandanData.pageNo}
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
                      <span className="commitBtn" onClick={this.onHandleSearchcb.bind(this)}>查询</span><span onClick={this.onXingzengN.bind(this)} className="commitBtn btn">返回</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="weixiu-table">
                      <div className="table-title"></div>
                      <div className="jiesuandan-con">
                        <div className="ul_1 fix">
                          <div className="items fix">
                            <div className="div1"><label>电费单价(元/kW·h)：</label></div>
                            <div className="div2"><input type="text" ref="electricPrice"/></div>
                            <div className="div1"><label>分成比例(%)：</label></div>
                            <div className="div2"><input type="text" ref="sharingRatio"/></div>
                          </div>
                        </div>
                      </div>
                      <MyTable thead={thead2} tbody={tbody2}/>
                      <span className="content-botm-btn" onClick={this.onAddbill.bind(this)} >生成结算单</span>
                    </div>
                  </div>
              </div>}


            {this.state.chakan &&
              <div className="modal-xinzeng">
                  <div className="title">
                      <span onClick={this.onDayin.bind(this,billAPI.getexcel,this.billid)} className="btn">导出</span>
                      <span onClick={this.onXingzengN.bind(this)} className="btn">返回</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="table-title">{this.props.jiesuandanInfo.billStartDate}至{this.props.jiesuandanInfo.billEndDate}</div>
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label>结算单开始日期：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.billStartDate}</div>
                        <div className="div1"><label>结算单截止日期：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.billEndDate}</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>电费单价：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.electricPrice}(元/kW·h)</div>
                        <div className="div1"><label>分成比例（乙方）：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.sharingRatio}%</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>节约总金额：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.savingTotalAmount}（元）</div>
                        <div className="div1"><label>分成总金额（乙方）：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.sharingAmount}元</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>总节电量：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.savingTotalElectric}（kW·h）</div>
                        <div className="div1"><label>平均节能率：</label></div>
                        <div className="div1 div2">{this.props.jiesuandanInfo.averageSavingRate}%</div>
                      </div>
                    </div>
                    <div className="weixiu-table">
                      <MyTable thead={thead3} tbody={tbody3}/>
                    </div>
                  </div>
              </div>}
          </div>
        )
    }
  changeMenu(event,object)
  {
    var selMenu = object.value;
    //console.log(selMenu)
  }
  onDayin(url,query){
    //window.open(url+'?billid='+query)
    var element = document.createElement("a");
    element.setAttribute("href", url+'?billid='+query);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  async onAddbill(){
    var electricPrice = this.refs.electricPrice.value;//----电价
    var sharingRatio = this.refs.sharingRatio.value;//----分成比例(乙方)
    var reportIDs = [];//----抄表单主表ID集合如：[36,37,38,39,40,41,42,43,44]
    var cbdlists = this.props.cbdlist.data;
    cbdlists.forEach(item=>{
      reportIDs.push(item.reportID);
    });
    const {addJiesuandanData} = this.props;
    let pars={};
    pars["electricPrice"]=electricPrice;
    pars["sharingRatio"]=sharingRatio;
    pars["reportIDs"]=reportIDs;
    console.log(pars);
    await addJiesuandanData(pars);
    this.setState({xinzeng:false});
    this.onHandleSearch();
  }
  changePager(value){
    const {getBillData}  = this.props
    let pars ={};
    var starttime = this.refs.starttime.field.props.value;
    var endtime = this.refs.endtime.field.props.value;
    pars["startDate"]=starttime;
    pars["endDate"]=endtime;
    pars["pageNo"]=value;
    pars["pageSize"]=10;
    getBillData(pars);
  }
  //查询结算单
  onHandleSearch(){
    var starttime = this.refs.starttime.field.props.value;
    var endtime = this.refs.endtime.field.props.value;
    const {getBillData}  = this.props
    let pars ={};
    pars["startDate"]=starttime;
    pars["endDate"]=endtime;
    pars["pageSize"]=10;
    getBillData(pars);
  }
  //查询抄表单
  onHandleSearchcb(){
    var starttime = this.state.cbstartDate;//this.refs.cbstarttime.field.props.value;
    var endtime = this.state.cbendDte;//this.refs.cbendtime.field.props.value;
    const {getChaobiaodanData}  = this.props
    let pars ={};
    pars["startEndDate"]=starttime;
    pars["endEndDate"]=endtime;
    pars["pageSize"]=100;
    getChaobiaodanData(pars);
  }
  parseTbBody(data){
    return data.map((item, i) => {
      //[1,"2018年04月02日","2018-02-08至2018-03-08",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)}>查看</span>]
      var status = <span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this,item.billID)}>查看</span>;
      return ([i+1,moment(item.createTime).format("YYYY-MM-DD"),item.billStartDate+"至"+item.billEndDate,status]);
    })
  }
  parseTbBody2(data){
    return data.map((item, i) => {
      return ([i+1,item.createTime,item.reportStartDate+"至"+item.reportEndDate]);
    })
  }
  parseTbBody3(data){
    return data.map((item, i) => {
      //[结算单元,用水总量（吨/立方米）,用电总量（kW·h）,吨水能耗基准值（kW·h/t）,节电量（kW·h）,节电率（%）,节电费（元）]

      return ([item.stationGroupName,item.waterUsage,item.electricUsage,item.baseValue,item.savingElectric,item.savingRate,item.savingAmount]);
    })
  }
  onXingzeng(){
    this.setState({xinzeng:true});
    setTimeout(this.onHandleSearchcb(), 1000);
  }
  onXingzengN(){
    this.setState({xinzeng:false,chakan:false})
  }
  onChakan(id){
    this.billid = id;
    const {getBillInfoData}  = this.props
    let pars ={};
    pars["billid"]=id;
    getBillInfoData(pars);
    this.setState({chakan:true})
  }
  handleChange = (e, { value }) => this.setState({ value })
  handleChangeInput(ev){
      this.setState({"deviceFilter":ev.target.value})
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


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.jiesuandan, mapDispatchToProps)(Jiesuandan);
