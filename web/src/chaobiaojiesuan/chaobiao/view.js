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
class Chaobiao extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment().subtract(1,'M'),
            endDate: moment(),
            cbDate:moment(),
            code:'',
            xinzeng:false,
            chakan:false
        }
    }

    render() {
        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'};
        let title = ""
        let project =this.props.location.query.project;
          title += project=="cb"?"抄表":project=="cbd"?"抄表单":project=="jsd"?"结算单":"抄表"

        const thead=[{width:"5%",value:"编号"},{width:"20%",value:"项目/工位代码"},{width:"20%",value:"结算单元名称"}
                    ,{width:"25%",value:"抄表日期"},{width:"20%",value:"抄表人"},{width:"10%",value:"操作"}]

        const options =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '张三', value: 2 },
        ]
        let chaobiaodata = this.props.chaobiaodata;
        const  tbody = this.parseTbBody(chaobiaodata.data);

        const tbodyOld=[[1,"代码","泵组名称1泵组","2018-02-08 00:30:00","王嘉",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)}>查看</span>],
        [2,"","102#水泵","2018-02-28 00:30:00","",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)} >查看</span>],

      ]
      var stationGroupName='';
      var indexs = [];
      var b = JSON.stringify(this.props.deviceinfodata) == "{}";
      if(!b){
        stationGroupName=this.props.deviceinfodata.stationGroupName;
        indexs = this.props.deviceinfodata.indexs;
      }
      var indexs_ck = [];
      if(!(JSON.stringify(this.props.chaobiaoinfo) == "{}")){
        indexs_ck = this.props.chaobiaoinfo.indexs;
      }
        return (
          <div className="table-chaobiao" style={BodyStyle} >
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="query-condition">
                <span className="query-name labStyle">项目/工位代码</span>
                  <Input type="text" className="query-value" onChange={this.handleChangeInput.bind(this)} />
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
                <label className="labStyle">抄表人</label>
                  <div className="query-value">
                    <Dropdown
                      className="query-value"
                       defaultValue={options[0].value}
                       selection
                       openOnFocus
                       options={options}
                     />
                  </div>
                <span className="commitBtn" onClick={this.onHandleSearch.bind(this)}>查询</span>
            </div>
            <div className="weixiu-table">
              <div className="xinzeng-btn"><span onClick={this.onXingzeng.bind(this)} >抄表</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={this.props.chaobiaodata.pageCount}
                     gap={2}
                     change={::this.changePager}
                     current ={this.props.chaobiaodata.pageNo}
                     fetching={false}
               /></div>
            </div>
            {this.state.xinzeng &&
              <div className="modal-xinzeng">
                  <div className="title">
                      <span className="btn" onClick={this.onAddChaobiao.bind(this)} >保存</span><span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label>工位代码：</label></div>
                        <div className="div2"><input type="text" ref="code" /><span className="sousuo" onClick={this.searchDeviceinfo.bind(this)}>搜索</span></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>系统/工位信息：</label></div>
                        <div className="div1 div2">
                          <div className="sousuo_con"><span>{stationGroupName}</span></div>
                        </div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>抄表日期：</label></div>
                        <div className="div2 div_time"><DateField
                            dateFormat="YYYY-MM-DD"
                            locale="zh-cn"
                            forceValidDate={true}
                            updateOnDateClick={true}
                            //defaultValue={startDate}
                            value={this.state.cbDate}
                            onChange={::this.handleChangeCb}
                            ref="cbtime"
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
                      {indexs.map((item,i)=>{
                        return (
                          <div className="items fix" key={i}>
                            <div className="div1"><label>{item.deviceAssetName}：</label></div>
                            <div className="div2"><input type="text" ref={item.indexPinyin} /></div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
              </div>}


            {this.state.chakan &&
              <div className="modal-xinzeng">
                  <div className="title">
                      <span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label>工位代码：</label></div>
                        <div className="div1 div2">{this.props.chaobiaoinfo.stationGroupCode}</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>系统/工位信息：</label></div>
                        <div className="div1 div2">
                          <div className="sousuo_con"><span>{this.props.chaobiaoinfo.stationGroupName}</span></div>
                        </div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>抄表日期：</label></div>
                        <div className="div1 div2">{this.props.chaobiaoinfo.readingDate}</div>
                      </div>
                      {indexs_ck.map((item,i)=>{
                        return(
                          <div className="items fix" key={i}>
                            <div className="div1"><label>{item.indexName}：</label></div>
                            <div className="div1 div2">{item.value}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
              </div>}
          </div>
        )
    }

  onXingzeng(){
    this.setState({xinzeng:true,cbDate:moment()});
  }
  onXingzengN(){
    this.setState({xinzeng:false,chakan:false})
  }
  onChakan(id){
    const {getChaobiaoInfo}  = this.props
    let pars ={};
    pars["readingid"]=id;
    getChaobiaoInfo(pars);
    this.setState({chakan:true})
  }
  //保存抄表数据
  async onAddChaobiao(){
    var code = this.refs.code.value;
    var cbtime = this.refs.cbtime.field.props.value;
    const {addChaobiaoData}  = this.props
    let pars ={};
    pars["stationGroupCode"] = code;
    pars["readingDate"]=cbtime;
    var flag = false;
    var indexs = this.props.deviceinfodata.indexs;
    for(var i=0;i<indexs.length;i++){
      var refname = indexs[i].indexPinyin;
      var value = this.refs[refname].value;
      if(value==''){
        flag = false;
        break;
      }else{
        flag = true;
        pars[indexs[i].indexPinyin+indexs[i].indexCode]=value;
      }
    }
    if(!flag){
      alert("请填写完整再保存");
      return;
    }
    await addChaobiaoData(pars);
    if(this.props.addchaobiaoresult.resultCode!=0){
      alert("抄表信息已存在，不能重复录入！")
    }
    this.setState({xinzeng:false})
    this.onHandleSearch();
  }
  parseTbBody(data){
    return data.map((item, i) => {
      //[1,"代码","泵组名称1泵组","2018-02-08 00:30:00","王嘉",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)}>查看</span>]
      var status = <span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this,item.readingID)}>查看</span>;
      return ([i+1,item.stationGroupCode,item.stationGroupName,item.readingDate,item.nickName,status]);
    })
  }
  handleChangeInput(ev){
    this.setState({"code":ev.target.value})
  }
  searchDeviceinfo(){
    var code = this.refs.code.value;
    const {getDeviceInfo}  = this.props
    let pars ={};
    pars["stationgroupcode"]=code;
    getDeviceInfo(pars);
  }
  onHandleSearch(){
    var code = this.state.code;
    var starttime = this.refs.starttime.field.props.value;
    var endtime = this.refs.endtime.field.props.value;
    const {getChaobiaoData}  = this.props
    let pars ={};
    if(code!=''){
      pars["stationGroupCode"] = code;
    }
    pars["startReadingDate"]=starttime;
    pars["endReadingDate"]=endtime;
    pars["pageSize"]=10;
    getChaobiaoData(pars);
  }
  changePager(value){
    const {getChaobiaoData}  = this.props
    let pars ={};
    var code = this.state.code;
    var starttime = this.refs.starttime.field.props.value;
    var endtime = this.refs.endtime.field.props.value;
    if(code!=''){
      pars["stationGroupCode"] = code;
    }
    pars["startReadingDate"]=starttime;
    pars["endReadingDate"]=endtime;
    pars["pageNo"]=value;
    pars["pageSize"]=10;
    getChaobiaoData(pars);
  }
  handleChange = (e, { value }) => this.setState({ value })
  handleChangeCb(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().toDate().getTime()){
      this.setState({
        cbDate:moment()
      });
    }else{
      this.setState({
        cbDate:dateMoment
      });
    }
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

  componentWillReceiveProps(nextprops){}
  componentDidMount() {
    this.onHandleSearch();
  }
  componentWillUnmount() {}
}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.chaobiao, mapDispatchToProps)(Chaobiao);
