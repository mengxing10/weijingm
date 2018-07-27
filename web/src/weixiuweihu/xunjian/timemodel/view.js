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

import 'rc-time-picker/assets/index.css';
import ReactDom from 'react-dom';
import TimePicker from 'rc-time-picker';
import Pager from '../../../common/components/Pager'


class Timemodel extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            moban:[],
            planname:'',
            xinzeng:false,
            chakan:false,
            xiugai:false,
            planTimeModeId:-1
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
        var startDate= moment("2018-01-01");
        var   endDate= moment().add(1, 'd');
        const showSecond = true
        const str = showSecond ? 'HH:mm:ss' : 'HH:mm'
        var othis = this;


        const thead=[{width:"30%",value:"编号"},{width:"30%",value:"模板名称"},{width:"30%",value:"操作"}]

        let timemodelData = this.props.timemodelData;

        const tbody = this.parseTbBody(timemodelData.data);

        const tbodyOld=[[1,"模板一","2018-3-1",<span><i onClick={this.onChakan.bind(this)}>查看</i><i>修改</i></span>],
                    [2,"模板二","2018-3-5",<span><i onClick={this.onChakan.bind(this)}>查看</i><i>修改</i></span>],
                    [3,"","",""]
                  ]
        const BodyStyle={height: document.documentElement.clientHeight-130  +'px'};
        return (
          <div className="tab-xunjian" style={BodyStyle} >
            <div className="weixiu-table timemodel">
              <div className="xinzeng-btn"><span onClick={this.onXinzeng.bind(this)}>新增</span></div>
              <MyTable thead={thead} tbody={tbody}/>
              <div className="pages">
              <Pager total={this.props.timemodelData.pageCount}
                     gap={3}
                     change={::this.changePager}
                     current ={this.props.timemodelData.pageNo}
                     fetching={false}
               /></div>
            </div>



            {this.state.xinzeng &&
            <div className="modal-alert modal-guanlian modal-timemodel">
              <div className="title">
                <div className="fix">
                  <span>新增计划时间模板</span>
                  <div className="spans"><i onClick={this.onXinzengN.bind(this)} className="close_icon"></i></div>
                </div>
              </div>
              <div className="content">
                <div className="content_input">
                  <label>模板名称</label><input ref="name" type="text" placeholder="请输入"/>
                </div>
                <ul>
                  <li className="fix">
                    <span>序号</span>
                    <span>时间</span>
                  </li>
                  {
                    this.state.moban.map((value, i) => {
                        return (
                          <li className="fix timepicker" key={i}>
                            <span>{value.num}</span>
                            <span><TimePicker
                              style={{ width: '80%' }}
                              showSecond={showSecond}
                              defaultValue={moment('00:00:00','HH:mm:ss')}
                              className="xxx"
                              //onChange={this.onChange}
                              ref={value.num}
                            /><i className="close_icon2" onClick={this.delMoban.bind(this,i)}></i></span>
                          </li>
                        )
                    })}
                </ul>
                <i className="add_icon" onClick={this.onAddMoban.bind(this)}></i>
              </div>
              <div className="footer">
                <span className="span_btn" onClick={this.onXinzengOption.bind(this)}>保存</span>
              </div>
            </div>}

            {this.state.xiugai &&
            <div className="modal-alert modal-guanlian modal-timemodel">
              <div className="title">
                <div className="fix">
                  <span>修改计划时间模板</span>
                  <div className="spans"><i onClick={this.onXiugaiN.bind(this)} className="close_icon"></i></div>
                </div>
              </div>
              <div className="content">
                <input ref="id" type="hidden" value={this.state.planTimeModeId}/>
                <div className="content_input">
                  <label>模板名称</label><input ref="name" type="text" placeholder="请输入" defaultValue={this.state.planname}/>
                </div>
                <ul>
                  <li className="fix">
                    <span>序号</span>
                    <span>时间</span>
                  </li>
                  {
                    this.state.moban.map((value, i) => {
                        return (
                          <li className="fix timepicker" key={i}>
                            <span>{value.num}</span>
                            <span><TimePicker
                              style={{ width: '80%' }}
                              showSecond={showSecond}
                              defaultValue={moment(value.con,'HH:mm:ss')}
                              className="xxx"
                              //onChange={this.onChange}
                              ref={value.num}
                              //value={value.con}
                            /><i className="close_icon2" onClick={this.delMoban.bind(this,i)}></i></span>
                          </li>
                        )
                    })}
                </ul>
                <i className="add_icon" onClick={this.onAddMoban.bind(this)}></i>
              </div>
              <div className="footer">
                <span className="span_btn" onClick={this.onXiugaiOption.bind(this)}>保存</span>
              </div>
            </div>}

            {this.state.chakan &&
            <div className="modal-alert modal-guanlian modal-timemodel">
              <div className="title">
                <div className="fix">
                  <span>{this.state.planname}</span>
                  <div className="spans"><i onClick={this.onChakanN.bind(this)} className="close_icon"></i></div>
                </div>
              </div>
              <div className="content">
                <ul>
                  <li className="fix">
                    <span>序号</span>
                    <span>时间</span>
                  </li>
                  {this.state.moban.map((item,i) => {
                    return (
                      <li className="fix" key={i}>
                        <span>{item.num}</span>
                        <span>{item.con}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>}
          </div>
        )
    }

    //新增
    onXinzeng(){
      this.setState({xinzeng:true})
    }
    onXinzengN(){
      this.setState({xinzeng:false,moban:[]})
    }
    //新增时间模板
    async onXinzengOption(){
      const {setTimemodelData}  =this.props;
      let pars ={};
      var times = [];
      this.state.moban.forEach(item => {
        times.push(this.refs[item.num].picker.value);
      });
      pars["planTimeName"] = this.refs.name.value;
      pars["planTime"]=times.toString();
      await setTimemodelData(pars);
      this.setState({xinzeng:false});

      //请求数据
      const {getTimemodelData}  =this.props
      let parsa ={};
      getTimemodelData(parsa)
    }
    //修改
    onXiugai(item){
      var planTime = item.planTime.split(",");
      var moban_a = [];
      planTime.forEach((item,i) => {
        moban_a.push({num:i+1,con:item});
      })
      this.setState({xiugai:true,planTimeModeId:item.planTimeModeId,planname:item.planTimeName,moban:moban_a});
    }
    onXiugaiN(){
      this.setState({xiugai:false,planTimeModeId:-1,planname:'',moban:[]})
    }
    async onXiugaiOption(){
      const {modifyTimemodelData}  =this.props;
      let pars ={};
      var times = [];
      this.state.moban.forEach(item => {
        times.push(this.refs[item.num].picker.value);
      });
      pars["planTimeName"] = this.refs.name.value;
      pars["planTime"]=times.toString();
      pars["planTimeModeId"]=this.refs.id.value;
      await modifyTimemodelData(pars);
      this.setState({xiugai:false});

      //请求数据
      const {getTimemodelData}  =this.props;
      let parsa ={};
      getTimemodelData(parsa);
    }
    //查看
    onChakan(item){
      var planTime = item.planTime.split(",");
      var moban_a = [];
      planTime.forEach((item,i) => {
        moban_a.push({num:i+1,con:item});
      })
      this.setState({chakan:true,planname:item.planTimeName,moban:moban_a})
    }
    onChakanN(){
      this.setState({chakan:false,planname:'',moban:[]})
    }
    //分页
    changePager(value){
      const {getTimemodelData}  = this.props
      let pars ={};
      pars["pageno"] = value;
      getTimemodelData(pars)
    }




    delMoban(i){
      var list = this.state.moban
      list.splice(i,1)
      this.setState({moban:list})
    }
    onAddMoban(){
      var list = this.state.moban
      var i = 1
      if(list.length>0){
        i = parseInt(list[list.length-1].num)+1
      }
      list.push({num:i,con:'00:00:00'})
      this.setState({moban:list})
    }
    onChange(value) {
      const showSecond = true
      const str = showSecond ? 'HH:mm:ss' : 'HH:mm'
      console.log(value && value.format(str));
    }

    queryData()
    {
        var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
        var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
    }
    parseTbBody(data){
      return data.map((item, i) => {
        var status = <span><i onClick={this.onChakan.bind(this,item,i)}>查看</i><i onClick={this.onXiugai.bind(this,item)} >修改</i></span>;
        return ([i+1,item.planTimeName,status]);
      })
    }





   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {
      const {getTimemodelData}  = this.props
      let pars ={};
      getTimemodelData(pars)
   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.timemodel, mapDispatchToProps)(Timemodel);
