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
class Daiban extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            page:1,
            deviceFilter:"",
            paifa:false,
            guanlianGongdan:false,
            peijian:false,
            chakan:false,
            chakan2:false,
            chakan3:false,
            chakan4:false,
            banli:false,
            yanshou:false,
            renyuan:false,
            chakanBaoxiu:false
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onPaifa(){
      this.setState({paifa:true})
    }
    onPaifaY(){
      this.setState({paifa:false,xinzengShow:false})
    }
    onPaifaN(){
      this.setState({paifa:false,banli:false,yanshou:false})
    }
    onGuanlian(){
      this.setState({guanlianGongdan:true})
    }
    onGuanlianN(){
      this.setState({guanlianGongdan:false,renyuan:false})
    }
    onPeijian(){
      this.setState({peijian:true})
    }
    onPeijianN(){
      this.setState({peijian:false})
    }
    onChakanBaoxiu(){
      this.setState({chakanBaoxiu:true})
    }
    onChakan(){
      this.setState({chakan:true})
    }

    onChakanN(){
      this.setState({chakan:false,chakanBaoxiu:false})
    }
    onChakan2(){
      this.setState({chakan2:true})
    }
    onChakan2N(){
      this.setState({chakan2:false})
    }
    onChakan3(){
      this.setState({chakan3:true})
    }
    onChakan3N(){
      this.setState({chakan3:false})
    }
    onChakan4(){
      this.setState({chakan4:true})
    }
    onChakan4N(){
      this.setState({chakan4:false})
    }
    onLingqu(){
      this.setState({banli:true})
    }
    onYanshou(){
      this.setState({yanshou:true})
    }
    onRenyuan(){
      this.setState({renyuan:true})
    }
    handleChange = (e, { value }) => this.setState({ value })

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
        var startDate= moment("2018-01-01");
        var   endDate= moment().add(1, 'd');
        let title = ""
        let project =this.props.location.query.project;
          title += project=="db"?"待办":project=="yb"?"已办":"待办"

      const meuncont=[
                        {name:'project',text:'项目',mutilselect:false,pagechange:true,
                         value:[       {name:'all',text:'全部',address:'/bgp/pc/weixiu',selected:true},
                                       {name:'reshui',text:'生活热水',address:'/bgp/pc/weixiu',selected:false},
                                       {name:'yongchi',text:'泡池泳池',address:'/bgp/pc/weixiu',selected:false},
                                       {name:'guolu',text:'锅炉房',address:'/bgp/pc/weixiu',selected:false}
                                   ]
                        }
                    ];

        const thead=[{width:"10%",value:"编号"},{width:"10%",value:"类型"},{width:"10%",value:"设备"}
                    ,{width:"25%",value:"时间"},{width:"15%",value:"内容"},{width:"10%",value:"当前状态"},{width:"10%",value:"操作"}]

        const options =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '报修', value: 2 },
          { key: 3, text: '维修', value: 3 },
          { key: 4, text: '保养', value: 4 },
          { key: 5, text: '巡检', value: 5 }
        ]
        const options2 =[
          { key: 1, text: '代办', value: 1 },
          { key: 2, text: '已办', value: 2 }
        ]
        const options3 =[
          { key: 1, text: '全部', value: 1 },
          { key: 2, text: '设备名称1', value: 2 },
          { key: 3, text: '设备名称2', value: 3 },
          { key: 4, text: '设备名称3', value: 4 },
          { key: 5, text: '设备名称4', value: 5 }
        ]


        const tbody=[[1,"维修","101#水泵","2018-02-08 00:30:00","温度过高","待领取(运维)",<span style={{cursor:'pointer'}} onClick={this.onChakan.bind(this)}>查看</span>],
        [2,"维修","102#水泵","2018-02-28 00:30:00","温度过高","待反馈(运维)",<span style={{cursor:'pointer'}} onClick={this.onChakan2.bind(this)} >查看</span>],
        [3,"维修","102#水泵","2018-02-28 00:30:00","温度过高","返工(运维)",<span style={{cursor:'pointer'}} onClick={this.onChakan2.bind(this)} >查看</span>],
        [4,"报修","102#水泵","2018-02-28 00:30:00","温度过高","待确认(运维)",<span style={{cursor:'pointer'}} onClick={this.onChakanBaoxiu.bind(this)} >查看</span>],
        [5,"维修","102#水泵","2018-02-28 00:30:00","温度过高","待验收(管理员)",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakan3.bind(this)} >查看</span>],
        [6,"报修","102#水泵","2018-02-28 00:30:00","温度过高","待确认(管理员)",<span style={{color:'#7598f7',cursor:'pointer'}} onClick={this.onChakanBaoxiu.bind(this)} >查看</span>]

      ]
        return (
          <div className="table-baoxiu">
            <h3 className="weixiu-title labStyle">{title}（括号里的内容是提示内容，对接接口时删掉）</h3>
            <div className="query-condition">
                <span className="query-name labStyle">类型选择</span>
                  <div className="query-value">
                    <Dropdown
                      className="query-value"
                       defaultValue={options[0].value}
                       selection
                       openOnFocus
                       options={options}
                     />
                  </div>
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
                <label className="labStyle">办理状态</label>
                  <div className="query-value">
                    <Dropdown
                      className="query-value"
                       defaultValue={options2[0].value}
                       selection
                       openOnFocus
                       options={options2}
                     />
                  </div>
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

            {this.state.paifa &&
              <div className="modal-alert">
                <div className="title">
                  <span>提示</span>
                </div>
                <div className="content">
                  <p>确定要派发？</p>
                </div>
                <div className="footer">
                  <span onClick={this.onPaifaY.bind(this)} >是</span><span onClick={this.onPaifaN.bind(this)}>否</span>
                </div>
              </div>
            }


            {this.state.peijian &&
              <div className="modal-alert modal-guanlian modal-peijian">
                <div className="title">
                  <div className="fix">
                    <span>配件清单</span>
                    <div className="spans"><span onClick={this.onPeijianN.bind(this)} >确定</span><span onClick={this.onPeijianN.bind(this)} >取消</span></div>
                  </div>
                  <div className="search">
                    <input placeholder="请输入关键字"/><span className="search-btn">搜索</span>
                  </div>
                </div>
                <div className="content">
                  <ul>
                    <li className="fix">
                      <span>配件</span>
                      <span>型号</span>
                      <span>选用数量</span>
                    </li>
                    <li className="fix">
                      <span>配件1</span>
                      <span>ddss</span>
                      <span><input type="text"/></span>
                    </li>
                  </ul>
                </div>
                <div className="footer">
                  <Pager total={5}
                         gap={2}
                         //change={::this.changePager}
                         current ={1}
                         fetching={false}
                   />
                </div>
              </div>
            }

            {this.state.chakan &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span>工单号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onLingqu.bind(this)}>领取</span><span onClick={this.onChakanN.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>工单信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">设备名称:</span><span>28泵站2泵组102#水泵</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">类别:</span><span>维修</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">标题:</span><span>维修维修水泵</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">派发人:</span><span>张文</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">派发时间:</span><span>2018-6-19 13:00</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">紧急程度:</span><span>一般</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">计划开始时间:</span><span>2018-6-19</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">计划完成时间:</span><span>2018-6-28</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">预算:</span><span>2028元</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">负责人:</span><span>王毅</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">工作人员:</span><span>张三、李四、王维</span>
                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>问题描述</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述
                  </div>
                </div>
                <div className="chakan_item">
                  <span>技术方案</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    <p>技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案技术方案</p>
                    <p className="fujian"><span>技术方案附件信息.doc</span></p>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>配件需求</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    配件需求，配件需求，配件需求，配件需求，配件需求，配件需求配件需求配件需求配件需求
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

            {this.state.chakan2 &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onLingqu.bind(this)}>上报</span><span onClick={this.onLingqu.bind(this)}>作废</span><span onClick={this.onChakan2N.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>工单信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">处理人:</span><span>张文</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">处理人电话:</span><span>134546565700</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">处理结果:</span><textarea className="w_1_textarea"></textarea>
                    </div>
                    <div className="w_1 w_3 fix">
                      <span className="w_1_span1">使用配件:</span>
                      <span className="w_1_span2">
                          <span className="span-btn" onClick={this.onPeijian.bind(this)} >选择配件</span>
                          <span className="selectsMul">
                            <span className="selects_item">配件A,3个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                            <span className="selects_item">配件配件A,3个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                          </span>
                          </span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">附件信息:</span>
                      <span className="w_1_span2">
                          <div className="div_file">
                          <input type="file" /><span className="span-btn file-span">上传文件</span></div>
                          <span className="selectsMul">
                            <span className="selects_item">附件信息1.doc<i></i></span>
                            <span className="selects_item">附件2.doc<i></i></span>
                          </span>
                       </span>

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

            {this.state.chakan3 &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onYanshou.bind(this)}>验收</span><span onClick={this.onLingqu.bind(this)}>返工</span><span onClick={this.onChakan3N.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">处理人:</span><span>张文</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">处理人电话:</span><span>134546565700</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">处理结果:</span><span>处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果处理结果</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">使用配件:</span><span>使用配件使用配件使用配件使用配件使用配件使用配件使用配件使用配件</span>
                    </div>
                    <div className="w_1 w_3">
                      <span className="w_1_span1">附件信息:</span>
                      <span><p><i className="fujian_icon"></i><span>附件1.doc</span></p>
                      <p><i className="fujian_icon"></i><span>附件附件2.doc</span></p></span>
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
            {this.state.chakan4 &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">工单详情</span>
                  <span>工单号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onLingqu.bind(this)}>返工</span><span onClick={this.onYanshou.bind(this)}>重验</span><span onClick={this.onChakan4N.bind(this)}>返回</span></div>
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

            {this.state.banli &&
            <div className="modal-alert modal-guanlian modal-banli">
              <div className="title">
                <div className="fix">
                  <span>工单办理</span>
                </div>
              </div>
              <div className="content">
                <div className="banli-item fix">
                  <div className="div1">办理意见：</div>
                  <div className="div2"><textarea></textarea></div></div>
                <div className="banli-item fix">
                    <div className="div1">下一步：</div>
                    <div className="div2">工单反馈</div></div>
              </div>
              <div className="footer">
                <span onClick={this.onPaifaY.bind(this)} >提交</span><span onClick={this.onPaifaN.bind(this)}>取消</span>
              </div>
            </div>}

            {this.state.yanshou &&
            <div className="modal-alert modal-guanlian modal-banli modal-yanshou">
              <div className="title">
                <div className="fix">
                  <span>验收</span>
                </div>
              </div>
              <div className="content">
                <div className="banli-item fix">
                  <div className="div1">工作评价：</div>
                  <div className="div2 stars"><i className="star_r star"></i><i className="star_r star"></i><i className="star_r star"></i>
                    <i className="star_w star"></i><i className="star_w star"></i></div></div>
                <div className="banli-item fix">
                  <div className="div1">工作评语：</div>
                  <div className="div2"><textarea></textarea></div></div>
                <div className="banli-item fix">
                  <div className="div1">处理结果：</div>
                  <div className="div2"><div className="query-value">
                                        <Dropdown
                                          className="query-value" defaultValue={options3[0].value}
                                           selection openOnFocus options={options3}
                                         /></div></div></div>
                <div className="banli-item fix">
                    <div className="div1">附件信息：</div>
                    <div className="div2">
                      <div className="div_fujian div_file">
                        <span><input type="file" /><span className="span-btn file-span">上传文件</span></span>
                        <span className="fujian selects_item">附件一.doc<i className="close_icon"></i></span>
                        <span className="fujian selects_item">附件一.doc<i className="close_icon"></i></span>
                        <span className="fujian selects_item">附件一.doc<i className="close_icon"></i></span>
                      </div></div></div>
              </div>
              <div className="footer">
                <span onClick={this.onPaifaY.bind(this)} >提交</span><span onClick={this.onPaifaN.bind(this)}>取消</span>
              </div>
            </div>}

            {this.state.chakanBaoxiu &&
            <div className="gongdan-modal gongdan-chakan">
              <div className="chakan_container">
                <div className="fix chakan_title">
                  <span className="title_bg">报修详情</span>
                  <span>编号：2018061903</span>
                  <div className="chakan_title_btns">
                  <span onClick={this.onLingqu.bind(this)}>确认</span><span onClick={this.onChakanN.bind(this)}>返回</span></div>
                </div>
                <div className="chakan_item">
                  <span>报修信息</span>
                  <div className="chakan_item_con fix">
                    <div className="w_3">
                      <span className="w_3_span1">设备名称:</span><span>28泵站2泵组102#水泵</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">类别:</span><span>维修</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">标题:</span><span>维修维修水泵</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">上报人:</span><span>张文</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">上报时间:</span><span>2018-6-19 13:00</span>
                    </div>
                    <div className="w_3">
                      <span className="w_3_span1">紧急程度:</span><span>一般</span>
                    </div>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>问题描述</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    <p>问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述</p>
                    <p className="fujian"><span>问题描述附件信息.doc</span></p>
                  </div>
                </div>
                <div className="chakan_item">
                  <span>配件需求</span>
                  <div className="chakan_item_con chakan_item_con1 fix">
                    配件需求，配件需求，配件需求，配件需求，配件需求，配件需求配件需求配件需求配件需求
                  </div>
                </div>
                <div className="chakan_item">
                  <span>办理过程</span>
                  <div className="chakan_item_con chakan_item_con2 fix">
                    <ul className="guocheng">
                      <li>
                        <span>2018-6-19 14:00</span><span>王明</span><span>上报报修</span>
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
export default connect(state => state.daiban, mapDispatchToProps)(Daiban);
