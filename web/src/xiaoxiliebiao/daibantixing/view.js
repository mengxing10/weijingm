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
import {Icon, Dropdown, Menu,Input,Form,Radio,Checkbox} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Daibantixing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
        }
    }

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        let title = ""

        let project =this.props.location.query.project;
          title += project=="dbtx"?"待办提醒":project=="yxbj"?"运行报警":project=="nxzd"?"能效诊断":project=="gzzd"?"故障诊断":"待办提醒"
        let tixingdatas = this.props.tixingdata.data;
        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'}

        return (
          <div className="table-xiaoxi" style={BodyStyle}>
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="weixiu-table">
              <div className="news_list">
                {tixingdatas.map((item, i) => {
                    var messageText=JSON.parse(item.messageText);
                    var type=item.messageModelName;
                    type = type=="报修"?"bx":type=="巡检"?"xj":"";
                    var spans = '';
                    var statusp = '';
                    if(project=='dbtx'){
                      spans = <div className="item_top">
                        <span>{item.messageModelName}</span>
                        <span>{messageText.businessName}</span>
                        <span>{messageText.businessCode}</span>
                      </div>;
                      statusp = messageText.status;
                    }
                    if(project=='yxbj'){
                      spans = <div className="item_top">
                        <span>{item.messageModelName}</span>
                        <span>{messageText.businessName}</span>
                      </div>;
                      statusp = messageText.status;
                    }
                    if(project=='nxzd'||project=='gzzd'){
                      spans = <div className="item_top">
                        <span>{messageText.businessName}</span>
                      </div>;
                    }

                    return (
                      <div className="news_item fix" key={i}>
                        <div className="item1"><i className={type}></i></div>
                        <div className="item2" onClick={this.onClickContent.bind(this,item.messageID,item.messageModelName)}>
                          {spans}
                          <div className="item_top">{messageText.messageDesc}</div>
                        </div>
                        <div className="item3"><p>{statusp}</p><p>{item.messageSendTime}</p></div>
                      </div>
                    )
                })}
              </div>
              <div className="pages">
              <Pager total={this.props.tixingdata.pageCount}
                     gap={3}
                     change={::this.changePager}
                     current ={this.props.tixingdata.pageNo}
                     fetching={false}
               /></div>
            </div>

          </div>
        )
    }
    changeMenu(event,object)
    {
      var selMenu = object.value;
      console.log(selMenu)
  }
    handleChangeInput(ev){
        this.setState({"deviceFilter":ev.target.value})
    }
    handleChangeStart(){

    }
    handleChangeEnd(){

    }


    queryData()
    {
        var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
        var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
        //alert(this.refs.startDt.getInput().value );
        //alert(this.refs.endDt.getInput().value );
        // const {getInstantQuery,instantQuery}  =this.props;
        // instantQuery.data.report_list=[];
        // getInstantQuery({"branchId":this.state.branchId, "startDate":startDate,"endDate":endDate});

    }


    selectDeviceType(deviceType)
    {
      this.setState({deviceType: deviceType});
    }
    //跳转到维保详情页面
    onClickContent(id,type){
      console.log(type+"--------------"+id);
      var selMenu = "jiance/warn";
      this.direact(selMenu);
    }
    changePager(value){
      var typeID=this.getTypeId(this.props.location.query.project);
      this.getXiaoxiData(value,typeID);
    }
    direact(path) {
        browserHistory.push(`/bgp/pc/${path}`)
    }

  componentWillReceiveProps(nextprops){
   var nextp= nextprops.location.query.project;
   var thisp = this.props.location.query.project;
   if(thisp!=nextp){
     var typeID=this.getTypeId(nextp);
     this.getXiaoxiData(1,typeID);
   }
  }

  getXiaoxiData(pageNo,typeID){
    const {getTixingData}  =this.props
    let pars ={}
    pars["messageTypeID"] = typeID;
    pars["pageNo"]=pageNo;
    getTixingData(pars)
  }
  getTypeId(project){
    var typeID=[];
    if(project=='dbtx'){
      typeID=[2,6,7,8,9];
    }
    if(project=='yxbj'){
      typeID=[3];
    }
    if(project=='nxzd'){
      typeID=[4];
    }
    if(project=='gzzd'){
      typeID=[5];
    }
    return typeID;
  }
  componentDidMount() {
    var pro = this.props.location.query.project;
    if(typeof(pro)=='undefined'){
      pro='dbtx';
    }
    var typeID=this.getTypeId(pro);
    this.getXiaoxiData(1,typeID);
  }
}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.daibantixing, mapDispatchToProps)(Daibantixing);
