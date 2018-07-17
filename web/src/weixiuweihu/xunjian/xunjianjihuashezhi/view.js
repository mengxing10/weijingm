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
import CsvFetch from '../../../common/components/CsvFetch'
import MyTable from '../../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio} from 'semantic-ui-react'

import moment from 'moment'
import Menus from '../../../common/components/Menus'
import Pager from '../../../common/components/Pager'
class Xunjianjihuashezhi extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            planTimeModeId:-1,
            bengzhan:'',
            timemodelName:'',
            moban:[],
            xinzeng:false,
            chakan:false,
            xiugai:false,
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onXinzeng(){
      this.setState({xinzeng:true})
    }
    onXinzengN(){
      this.setState({xinzeng:false,xiugai:false,moban:[]})
    }
    async onChakan(item){
      let pars ={};
      const {getptbyid}  = this.props;
      pars["inspectionid"]=item.planTimeModeId;
      await getptbyid(pars);
      var timeList = this.props.timemodel.planTime;
      var timePlanModel = [];
      var times = timeList.split(",")
      var a = times.forEach(function(iitem,i){
        timePlanModel.push({num:i+1,con:iitem});
      });
      //var list = [{num:'1',con:'01:00'},{num:'2',con:'02:00'},{num:'3',con:'03:00'},{num:'4',con:'04:00'}]
      this.setState({chakan:true,moban:timePlanModel,bengzhan:item.stationName,timemodelName:this.props.timemodel.planTimeName,})
    }
    async onXiugai(item){
      let pars ={};
      const {getptbyid}  = this.props;
      pars["inspectionid"]=item.planTimeModeId;
      await getptbyid(pars);
      var timeList = this.props.timemodel.planTime;
      var timePlanModel = [];
      var times = timeList.split(",")
      var a = times.forEach(function(iitem,i){
        timePlanModel.push({num:i+1,con:iitem});
      });
      //var list = [{num:'1',con:'01:00'},{num:'2',con:'02:00'},{num:'3',con:'03:00'},{num:'4',con:'04:00'}]
      this.setState({xiugai:true,planId:item.stationMapTimeID,moban:timePlanModel,bengzhan:item.stationName,timemodelName:item.planTimeModeId,})

    }
    onChakanN(){
      this.setState({chakan:false,moban:[]})
    }
    onTimechange(a,ev,obj){
      var timePlanModel = [];
      this.props.timemodelDatas.forEach(item => {
        if(obj.value==item.planTimeModeId){
          var times = item.planTime.split(",")
          var a = times.forEach(function(iitem,i){
            timePlanModel.push({num:i+1,con:iitem});
          });
        }
      });
      //var list = [{num:'1',con:'01:00'},{num:'2',con:'02:00'},{num:'3',con:'03:00'},{num:'4',con:'04:00'}]
      this.setState({moban:timePlanModel})
    }


    render() {
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        const options = this.props.bengzhandata.map(item => {
          return ({key:item.layoutID,text:item.layoutName,value:item.layoutID})
        });
        // [
        //   { key: 1, text: '全部', value: 1 },
        //   { key: 2, text: '28/38泵站', value: 2 },
        // ]
        const options2 = this.props.timemodelDatas.map(item => {
          return ({key:item.planTimeModeId,text:item.planTimeName,value:item.planTimeModeId})
        })
        // const options2 = [
        //   { key: 1, text: '模板一', value: 1,con:'12:00,11:00'},
        // ]
        const thead=[{width:"20%",value:"编号"},{width:"20%",value:"泵站"},{width:"20%",value:"模板名称"},{width:"30%",value:"操作"}]
        let plandata = this.props.plandata;
        const tbody = this.parseTbBody(plandata.data);
        // const tbody0=[[1,"28#泵站","模板一","2018-3-1",<span><i onClick={this.onChakan.bind(this)}>查看</i><i>修改</i></span>],
        //             [2,"38#泵站","模板二","2018-3-5",<span><i onClick={this.onChakan.bind(this)}>查看</i><i>修改</i></span>],
        //             [3,"","",""]
        //           ]
        const bengzhan = this.state.bengzhan;
        const timemodelName = this.state.timemodelName;
        return (
          <div className="timemodel tab-xunjian">
            <div className="query-condition">
              <span className="query-name labStyle">泵站选择：</span>
                <div className="query-value">
                  <Dropdown
                    className="query-value"
                     defaultValue={options[0].value}
                     selection
                     openOnFocus
                     options={options}
                     ref='searchBengzhan'
                   />
                </div>
                <span className="commitBtn" onClick={this.selectPlan.bind(this)}>查询</span>
            </div>
            <div className="weixiu-table">
              <div className="xinzeng-btn"><span onClick={this.onXinzeng.bind(this)}>新增</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={this.props.plandata.pageCount}
                     gap={3}
                     change={::this.changePager}
                     current ={this.props.plandata.pageNo}
                     fetching={false}
               /></div>
            </div>

            {this.state.xinzeng &&
            <div className="modal-alert modal-guanlian modal-timemodel">
              <div className="title">
                <div className="fix">
                  <span>新增巡检计划</span>
                  <div className="spans"><i onClick={this.onXinzengN.bind(this)} className="close_icon"></i></div>
                </div>
              </div>
              <div className="content">
                <div className="content_input">
                  <label>泵站</label>
                  <span >
                    <Dropdown
                      className="query-value"
                       defaultValue={options[0].value}
                       selection
                       openOnFocus
                       options={options}
                       ref='bengzhan'
                     />
                  </span>
                </div>
                <div className="content_input">
                  <label>计划时间模板</label>
                  <span>
                    <Dropdown
                      className="query-value"
                       //defaultValue={options2[0].value}
                       selection
                       openOnFocus
                       options={options2}
                       onChange={this.onTimechange.bind(this,'aaa')}
                       ref='timemodel'
                     />
                  </span>
                </div>
                <ul>
                  <li className="fix">
                    <span>序号</span>
                    <span>时间</span>
                  </li>
                  {
                    this.state.moban.map((value, i) => {
                        return (
                          <li className="fix" key={i}>
                            <span>{value.num}</span>
                            <span>{value.con}</span>
                          </li>
                        )
                    })}
                </ul>
              </div>
              <div className="footer">
                <span className="span_btn" onClick={this.onXinzengOption.bind(this)}>保存</span>
              </div>
            </div>}

            {this.state.chakan &&
            <div className="modal-alert modal-guanlian modal-timemodel">
              <div className="title">
                <div className="fix">
                  <span>巡检计划</span>
                  <div className="spans"><i onClick={this.onChakanN.bind(this)} className="close_icon"></i></div>
                </div>
              </div>
              <div className="content">
              <div className="content_input">
                <label>泵站：</label>
                <span>{bengzhan}</span>
              </div>
              <div className="content_input">
                <label>计划时间模板：</label>
                <span>{timemodelName}</span>
              </div>
                <ul>
                  <li className="fix">
                    <span>序号</span>
                    <span>时间</span>
                  </li>
                  {
                    this.state.moban.map((value, i) => {
                        return (
                          <li className="fix" key={i}>
                            <span>{value.num}</span>
                            <span>{value.con}</span>
                          </li>
                        )
                    })}
                </ul>
              </div>
            </div>}

            {this.state.xiugai &&
            <div className="modal-alert modal-guanlian modal-timemodel">
              <div className="title">
                <div className="fix">
                  <span>修改巡检计划</span><input type="hidden" ref="planId" value={this.state.planId}/>
                  <div className="spans"><i onClick={this.onXinzengN.bind(this)} className="close_icon"></i></div>
                </div>
              </div>
              <div className="content">
                <div className="content_input">
                  <label>泵站</label>
                  <span>{bengzhan}</span>
                </div>
                <div className="content_input">
                  <label>计划时间模板</label>
                  <span>
                    <Dropdown
                      className="query-value"
                       defaultValue={timemodelName}
                       selection
                       openOnFocus
                       options={options2}
                       onChange={this.onTimechange.bind(this,'aaa')}
                       ref='timemodel'
                     />
                  </span>
                </div>
                <ul>
                  <li className="fix">
                    <span>序号</span>
                    <span>时间</span>
                  </li>
                  {
                    this.state.moban.map((value, i) => {
                        return (
                          <li className="fix" key={i}>
                            <span>{value.num}</span>
                            <span>{value.con}</span>
                          </li>
                        )
                    })}
                </ul>
              </div>
              <div className="footer">
                <span className="span_btn" onClick={this.onXiugaiOption.bind(this)}>保存</span>
              </div>
            </div>}
          </div>
        )
    }

  componentWillReceiveProps(nextprops){

  }
  //新增巡检计划
  async onXinzengOption(){
    const {addStationmaptime}  =this.props;
    let pars ={};
    pars["stationID"] = this.refs.bengzhan.state.value;
    pars["stationName"]=this.refs.bengzhan.ref.innerText;
    pars["planTimeModeId"]=this.refs.timemodel.state.value;
    await addStationmaptime(pars);
    this.setState({xinzeng:false});

    //请求数据
    const {getMaptime}  = this.props
    let parsa ={};
    getMaptime(parsa)
  }
  //修改巡检计划
  async onXiugaiOption(){
    const {updateStationmaptime}  =this.props;
    let pars ={};
    pars["stationMapTimeID"] = this.refs.planId.value;
    pars["planTimeModeId"]=this.refs.timemodel.state.value;
    await updateStationmaptime(pars);
    this.setState({xiugai:false});

    //请求数据
    const {getMaptime}  = this.props
    let parsa ={};
    getMaptime(parsa)
  }
  //查询
  selectPlan(){
    const {getMaptime}  = this.props
    let pars ={};
    console.log(this.refs.searchBengzhan.ref.innerText)
    pars["stationname"]=this.refs.searchBengzhan.ref.innerText;
    getMaptime(pars)
  }
  parseTbBody(data){
    return data.map((item, i) => {
      var status = <span><i onClick={this.onChakan.bind(this,item,i)}>查看</i><i onClick={this.onXiugai.bind(this,item)} >修改</i></span>;
      var id = item.planTimeModeId;
      return ([i+1,item.stationName,item.planTimeName,status]);
    })
  }

  componentWillMount(){
    let pars ={};
    const {getBengzhan}  = this.props
    pars["projectid"]=1;
    getBengzhan(pars)

    const {getTimemodelData}  = this.props
    getTimemodelData(pars)
  }
  //分页
  changePager(value){
    const {getMaptime}  = this.props
    let pars ={};
    pars["pageno"] = value;
    getMaptime(pars)
  }

  componentDidMount() {
    const {getMaptime}  = this.props
    let pars ={};
    getMaptime(pars)

  }



  componentWillUnmount() {
  }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.xunjianjihuashezhi, mapDispatchToProps)(Xunjianjihuashezhi);
