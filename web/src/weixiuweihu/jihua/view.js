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
import { DateField,DatePicker} from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio} from 'semantic-ui-react'

import moment from 'moment'
import Menus from '../../common/components/Menus'
import HeatMap2 from './components/HeatMap2.js'
import LineAndBar from './components/LineAndBar.js'
import BarOne from './components/BarOne.js'
class Jihua extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            deviceFilter:"",
            jihua:false,
            gongshi:false,
            chakan:false
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onChange = time => this.setState({ time })

    onChakan(){
      this.setState({chakan:true})
    }
    onChakanN(){
      this.setState({chakan:false})
    }
    onJihua(){
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
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');

        const options =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '28/38泵站', value: 2 },
          { key: 3, text: '综合泵站', value: 3 },
          { key: 4, text: '黄河泵站', value: 4 },
          { key: 5, text: '3/4泵站', value: 5 }
        ]
        var xdata = ['00:00', '01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00',
                    '11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00',];
        var ydata = ['设备一', '设备二', '设备三','设备四', '设备五', '设备六'];
        var data = [['04:00','设备一','1'],['01:00','设备二','2'],['09:00','设备三','2'],['06:00','设备四','1'],['08:00','设备五','2']];

        var legends = ['配件A','配件B','配件C','配件D','人员','所需工时'];

        var time = ['2018-5-1','2018-5-2','2018-5-3','2018-5-4','2018-5-5','2018-5-6','2018-5-7','2018-5-8','2018-5-9','2018-5-10','2018-5-11','2018-5-12'];
        var data1=[1,2,3,4,1,3,2,1,2,3,5,4];
        var data2=[2,3,2,1,1,6,4,7,2,3,1,2];
        var renyuan=[3,3,2,4,5,6,4,7,2,3,1,2];
        var data3=[6,4,2.5,6,5,1,3,3,5,7,2,7,4];
        var serdata = [
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
            {
                name:'人员',
                type:'bar',
                data:renyuan,
                label: {
                    normal: {
                        show: true
                    }
                }
            },
            {
                name:'所需工时',
                type:'line',
                yAxisIndex: 1,
                data:data3
            }];


        var barxdata = ['人员A', '人员B','人员C','人员D','人员E','人员F','人员G','人员H'];
        var barydata = [3,6,5,8,4,5,8,3];
        var bardata = [{
                name:'工时',
                type:'bar',
                data:barydata,
                barWidth:'20',
                label: {
                    normal: {
                        show: true
                    }
                }
            }];
        var that=this;
        const EventsDict = {
            click: function (data, echart) {
                    console.log(data.value[0])
                    that.onChakan()
                }
        }
        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'}



        return (
          <div className="table-baoxiu" style={BodyStyle}>
            <div className="query-condition">
                <span className="query-name labStyle">泵站选择</span>
                  <div className="query-value">
                    <Dropdown
                      className="query-value"
                       defaultValue={options[0].value}
                       selection
                       openOnFocus
                       options={options}
                     />
                  </div>
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
            <div className="weixiu-table">
              <div className="xinzeng-btn xinzeng-btn2"><span onClick={this.onJihua.bind(this)} >人员及配件计划</span><span onClick={this.onGongshi.bind(this)} >工时统计</span></div>
              <HeatMap2  style={{width:'100%',height:'400px',margin:'35px auto 0'}}
                  xdata={xdata}
                  ydata={ydata}
                  data={data} EventsDict={EventsDict}/>

            </div>
            {this.state.chakan &&
              <div className="modal-alert modal-guanlian modal-timemodel modal-jihua">
                <div className="title">
                  <div className="fix">
                    <span>维保内容</span>
                    <div className="spans"><i className="close_icon" onClick={this.onChakanN.bind(this)} ></i></div>
                  </div>
                </div>
                <div className="content">
                  <div className="item_lists fix">
                    <div className="div_w_4 div_w_label">类型：</div><div className="div_w_4">保养</div>
                    <div className="div_w_4 div_w_label">设备：</div><div className="div_w_4">28#泵站1泵组101水泵</div></div>
                  <div className="item_lists fix">
                    <div className="div_w_4 div_w_label">是否周期性安排：</div><div className="div_w_4">是</div>
                    <div className="div_w_4 div_w_label">维保周期：</div><div className="div_w_4">2月/次</div></div>
                  <div className="item_lists fix">
                    <div className="div_w_4 div_w_label">开始时间：</div><div className="div_w_4">2018-2-1</div>
                    <div className="div_w_4 div_w_label">结束时间：</div><div className="div_w_4">2020-2-1</div></div>
                  <div className="item_lists fix">
                    <div className="div_w_4 div_w_label">维保厂家：</div><div className="div_w_4">厂家名称厂家名称</div>
                    <div className="div_w_4 div_w_label">厂家电话：</div><div className="div_w_4">030-87234443</div></div>
                  <div className="item_lists fix"><div className="div_w_4 div_w_label">维保内容：</div><div className="div_w_4_3">维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容</div></div>
                  <div className="item_lists fix"><div className="div_w_4 div_w_label">所需配件：</div><div className="div_w_4_3">配件A,2个；配件B，4个</div></div>
                  <div className="item_lists fix"><div className="div_w_4 div_w_label">所需工时：</div><div className="div_w_4_3">3人.天</div></div>
                </div>
                <div className="footer">

                </div>
              </div>}

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
                      <p>共计所需：A配件8个，B配件15个，C配件7个，D配件24个，E配件6个</p>
                      <p>所需人员：共计23个，工时共计22.5人·天</p></div>
                </div>
              </div>}

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
export default connect(state => state.jihua, mapDispatchToProps)(Jihua);
