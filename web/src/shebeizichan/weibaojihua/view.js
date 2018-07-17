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
class Weibaojihua extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            deviceType:'quanbu',
            xinzeng:false,
            chakan:false,
            peijian:false,
            bengzu:[],
            shebei:[]
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }
    onXinzeng(){
      this.setState({xinzeng:true})
    }
    onXingzengN(){
      this.setState({xinzeng:false,chakan:false})
    }
    onChakan(){
      this.setState({chakan:true})
    }
    onPeijian(){
      this.setState({peijian:true})
    }
    onPeijianN(){
      this.setState({peijian:false})
    }
    handleChange = (e, { value }) => this.setState({ value })

    onClickBengzhan(){
      var bz = [{key:'bz1',text:'1#泵组',value:'1'},{key:'bz2',text:'2#泵组',value:'2'},{key:'bz3',text:'3#泵组',value:'3'},
                {key:'bz4',text:'4#泵组',value:'4'},{key:'bz5',text:'1#泵组',value:'5'},{key:'bz6',text:'2#泵组',value:'6'},{key:'bz7',text:'3#泵组',value:'7'}];
       bz = bz.sort(function() {
                return (0.5-Math.random());
            });
      this.setState({bengzu:bz,shebei:[]})
    }
    onClickBengzu(){
      var sbei = [{key:'b1',text:'101#水泵',value:'1'},{key:'b2',text:'1#电机',value:'2'},
      {key:'b3',text:'102#水泵',value:'3'},{key:'b4',text:'3#电机',value:'4'}];
      this.setState({shebei:sbei})
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
        var startDate= moment("2018-01-01");
        var endDate= moment().add(1, 'd');
        let title = ""
        let project =this.props.location.query.project;
          title += project=="jbxx"?"基本信息管理":project=="wbjh"?"维保计划":project=="wbjl"?"维保记录":"基本信息管理"

        const thead=[{width:"15%",value:"编号"},{width:"15%",value:"类型"},{width:"20%",value:"设备"},{width:"25%",value:"维保开始日期"}
                    ,{width:"15%",value:"维保周期"},{width:"20%",value:"操作"}]

        const options =[
          { key: 1, text: '维修', value: 1 },
          { key: 2, text: '保养', value: 2 }
        ]

        const tbody=[[1,"保养","101#水泵","2018-02-12","月",<span><i>修改</i><i onClick={this.onChakan.bind(this)}>查看</i></span>],
          [2,"","102#水泵","2018-03-02","",<span><i>修改</i><i onClick={this.onChakan.bind(this)}>查看</i></span>],
          [3,"","","","",""],
          [4,"","","","",""],
          [5,"","","","",""],
          [6,"","","","",""]
        ]

        const bengzhan = [{key:'z1',text:"28#泵站",value:"1"},
                          {key:'z2',text:"38#泵站",value:"2"},
                          {key:'z3',text:"黄河泵站",value:"3"},{key:'z4',text:"6#泵站",value:"4"}];

        let {bengzus,shebeis} = this.state
        //const bengzu = [{key:1,text:'1#泵组',value:'1'},{key:2,text:'2#泵组',value:'2'},{key:3,text:'3#泵组',value:'3'},{key:4,text:'4#泵组',value:'4'},{key:1,text:'1#泵组',value:'1'},{key:2,text:'2#泵组',value:'2'},{key:3,text:'3#泵组',value:'3'},{key:4,text:'4#泵组',value:'4'}];
        //const shebei = [{key:1,text:'101#水泵',value:'1'},{key:2,text:'1#电机',value:'2'},{key:3,text:'102#水泵',value:'3'},{key:4,text:'3#电机',value:'4'}];

        return (
          <div className="table-shebei">
            <h3 className="weixiu-title labStyle">{title}</h3>
            <div className="sub-title fix">
              <span className={'quanbu' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'quanbu')} >全部</span>
              <span className={'28' == this.state.deviceType? "itab {key:1,text:'28#泵站',value='1'},{key:1,text:'28#泵站',value='1'},active" : 'itab'} onClick={this.selectDeviceType.bind(this,'28')}>28#泵站</span>
              <span className={'38' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'38')}>38#泵站</span>
              <span className={'huanghe' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'huanghe')}>黄河泵站</span>
              <span className={'6' == this.state.deviceType? "itab active" : 'itab'} onClick={this.selectDeviceType.bind(this,'6')}>6#泵站</span>
            </div>
            <div className="query-condition">
                <span className="query-name labStyle">设备名称</span>
                  <Input type="text" className="query-value" ref="deviceName" name=""   onChange={this.handleChangeInput.bind(this)}/>
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
                <span className="commitBtn">查询</span><span className="commitBtn" onClick={this.onXinzeng.bind(this)}>新增</span>
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
            {this.state.xinzeng &&
              <div className="modal-xinzeng">
                  <div className="title">
                      <span className="btn" onClick={this.onXingzengN.bind(this)} >保存</span><span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label>类型：</label></div>
                        <div className="div2 div_time"><div className="query-value">
                                              <Dropdown
                                                className="query-value" defaultValue={options[0].value}
                                                 selection openOnFocus options={options}
                                               /></div></div>
                       <div className="div1"><label>设备：</label></div>
                       <div className="div2 div_time fix">
                         <div className="query-value2"><Dropdown
                           className="query-value" defaultValue={bengzhan[0].value}
                            selection openOnFocus options={bengzhan} onChange={this.onClickBengzhan.bind(this)}
                          /></div>
                          {this.state.bengzu.length > 0 && <div className="query-value2"><Dropdown
                            className="query-value" defaultValue={this.state.bengzu[0].value}
                             selection openOnFocus options={this.state.bengzu} onChange={this.onClickBengzu.bind(this)}
                           /></div>}
                           {this.state.shebei.length > 0 && <div className="query-value2"><Dropdown
                             className="query-value" defaultValue={this.state.shebei[0].value}
                              selection openOnFocus options={this.state.shebei}
                            /></div>}
                        </div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>是否周期性安排：</label></div>
                        <div className="div2 div_time">
                          <span className="label"><Form.Field><Radio
                            label='是'
                            name='radioGroup'
                            value='this'
                            checked={this.state.value === 'this'}
                            onChange={this.handleChange}
                          /></Form.Field> </span>
                          <span className="label"><Form.Field><Radio
                            label='否'
                            name='radioGroup'
                            value='that'
                            checked={this.state.value === 'that'}
                            onChange={this.handleChange}
                          /></Form.Field></span>
                          </div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>开始日期：</label></div>
                        <div className="div2 div_time"><DateField
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
                          </DateField></div>
                        <div className="div1"><label>结束日期：</label></div>
                        <div className="div2 div_time">
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
                        </DateField></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>维保厂家：</label></div>
                        <div className="div2"><input type="text" /></div>
                        <div className="div1"><label>维保电话：</label></div>
                        <div className="div2"><input type="text" /></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>维保内容：</label></div>
                        <div className="div3"><textarea></textarea></div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>配件需求：</label></div>
                        <div className="div2">
                          <span className="selectsMul">
                            <span className="selects_item">配件A,3个<i></i></span>
                            <span className="selects_item">配件B，1个<i></i></span>
                          </span>
                          <span className="span-btn" onClick={this.onPeijian.bind(this)} >选择配件</span></div>
                      </div>


                    </div>
                  </div>
              </div>}

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
                        <span>选用数量</span>
                      </li>
                      <li className="fix">
                        <span>配件1</span>
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
              <div className="modal-xinzeng modal-chakan">
                  <div className="title">
                      <span onClick={this.onXingzengN.bind(this)} className="btn">取消</span>
                  </div>
                  <div className="gongdan-content">
                    <div className="ul_1 fix">
                      <div className="items fix">
                        <div className="div1"><label>类型：</label></div>
                        <div className="div1 div1_tl">保养</div>
                        <div className="div1"><label>设备：</label></div>
                        <div className="div1 div2 div1_tl">28#泵站2泵组101#水泵</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>是否周期性安排：</label></div>
                        <div className="div1 div1_tl">是</div>
                        <div className="div1"><label>维保周期：</label></div>
                        <div className="div1 div1_tl">2月/次</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>开始日期：</label></div>
                        <div className="div1 div1_tl">XXXXXX</div>
                        <div className="div1"><label>结束日期：</label></div>
                        <div className="div1 div1_tl">2018-03-09</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>维保厂家：</label></div>
                        <div className="div1 div1_tl">AAAAAAAAAA</div>
                        <div className="div1"><label>维保电话：</label></div>
                        <div className="div1 div1_tl">12345</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>维保内容：</label></div>
                        <div className="div1 div1_tl div3">维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容维保内容</div>
                      </div>
                      <div className="items fix">
                        <div className="div1"><label>配件需求：</label></div>
                        <div className="div1 div1_tl div2">配件A,3个;配件B，1个</div>
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
export default connect(state => state.weibaojihua, mapDispatchToProps)(Weibaojihua);
