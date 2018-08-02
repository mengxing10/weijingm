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
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Checkbox} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Weibaojilu extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            deviceType:'quanbu',
            chakan:false
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onChakan(){
      this.setState({chakan:true})
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
        let project =this.props.location.query.project;
          title += project=="jbxx"?"基本信息管理":project=="wbjh"?"维保计划":project=="wbjl"?"维保记录":"基本信息管理"

        const thead=[{width:"10%",value:"编号"},{width:"10%",value:"类型"},{width:"15%",value:"设备名称"},{width:"15%",value:"时间"}
                    ,{width:"20%",value:"内容"},{width:"10%",value:"级别"},{width:"10%",value:"提交人"},{width:"10%",value:"操作"}]

        const options =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '抄表人a', value: 2 },
          { key: 3, text: '抄表人b', value: 3 },
          { key: 4, text: '抄表人c', value: 4 },
          { key: 5, text: '抄表人d', value: 5 }
        ]


        const tbody=[[1,"维修","101#水泵","2018-03-12 13:00:00","轴温过高","一级警报","系统提醒",<span><i onClick={this.onChakan.bind(this)}>查看</i></span>],
        [2,"维修","102#水泵","2018-04-12 15:00:00","轴温过高","一级警报","系统提醒",<span><i onClick={this.onChakan.bind(this)}>查看</i></span>],
        [3,"","","","","","",""],
        [4,"","","","","","",""],
        [5,"","","","","","",""],
        [6,"","","","","","",""]
      ]
        return (
          <div className="table-shebei">
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="sub-title fix">
              <span className={'quanbu' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'quanbu')} >全部</span>
              <span className={'28' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'28')}>28#泵站</span>
              <span className={'38' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'38')}>38#泵站</span>
              <span className={'huanghe' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'huanghe')}>黄河泵站</span>
              <span className={'6' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'6')}>6#泵站</span>
            </div>
            <div className="query-condition">
                <Checkbox label={{ children: '全部' }} /><Checkbox label={{ children: '保修' }} /><Checkbox label={{ children: '维修' }} />
                <Checkbox label={{ children: '保养' }} /><Checkbox label={{ children: '巡检' }} />
                <label className="labStyle">开始时间</label>
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
                <span className="commitBtn">查询</span>
            </div>
            <div className="weixiu-table">
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={5}
                     gap={2}
                     //change={::this.changePager}
                     current ={1}
                     fetching={false}
               /></div>
            </div>


            {this.state.chakan &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onChakanN.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>工单验收信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">验收人:</span><span>张文</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">验收时间:</span><span>2018-6-19 20:00</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">工作评价:</span><span><i className="star_icon"></i><i className="star_icon"></i><i className="star_icon"></i><i className="star_icon"></i><i className="star_icon"></i></span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">工作评语:</span><span>工作评语工作评语工作评语工作评语工作评语工作评语工作评语工作评语工作评语工作评语</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">处理结果:</span><span>处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果</span>
                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                      <li>
                        <span>2018-6-19 14:00</span><span>张总</span><span>派发维修单-2018061903</span>
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










   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {

   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.weibaojilu, mapDispatchToProps)(Weibaojilu);
