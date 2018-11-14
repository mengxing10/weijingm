/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from 'moment'
import {Button, Input, Icon, Divider, Popup, Dropdown} from 'semantic-ui-react'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { DateField,DatePicker } from 'react-date-picker'
import 'react-date-picker/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import * as actions from './actions.js'
import './styles/index.styl'
import MyTable from '../../common/components/MyTable'
import Pager from '../../common/components/Pager'

class Nengxiaobi extends Component {
    constructor(props) {
        super(props)
        this.state = {
          list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
          menuId:'nengxiaobi',
          menufix:false
        }
    }

    render() {
      let {list,menuId,menufix} = this.state;
      return (
        <div className="nengxiaobiwrap">
          <div className={classNames("jituan-menu",{menufix:menufix})}>
            <span onClick={this.menuOptions.bind(this,'nengxiaobi')} className={menuId=='nengxiaobi'?'active':''}>能效比</span>
            <span onClick={this.menuOptions.bind(this,'nenghao')} className={menuId=='nenghao'?'active':''}>单位面积能耗</span>
            <span onClick={this.menuOptions.bind(this,'zongnenghao')} className={menuId=='zongnenghao'?'active':''}>总能耗</span>
          </div>
          <div className="table-head">
            <div>排名</div><div>酒店名称</div>
            <div>能效比</div><div>费用(元)</div>
          </div>
          <div className="table-body">
            {list&&list.map(item=>{
              return(
                <div className="body-tr" key={item}>
                  <div className="body-td"><span>{item}</span></div>
                  <div className="body-td">北京维京大酒店</div>
                  <div className="body-td">70%</div>
                  <div className="body-td">21,900</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    //菜单事件
    menuOptions(object){
      this.setState({menuId:object})
    }
    componentDidMount() {
      this.onScrollHander()
    }
    //监听页面滚动
    onScrollHander(){
      let ctx = this;
      let a = document.getElementById("jituanwrap")
      a.onscroll = function () {
        if( a.scrollTop  > 170){
          ctx.setState({menufix:true})
        }else{
          ctx.setState({menufix:false})
        }
      }
    }

    componentWillReceiveProps(nextProps) {

    }

}




function mapDispatchToProps (dispatch) {
    return bindActionCreators(actions, dispatch);
};
export default connect(state => state.nengxiaobi, mapDispatchToProps)(Nengxiaobi);
