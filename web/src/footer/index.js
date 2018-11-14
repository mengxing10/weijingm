/**
 * @file Footer component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import './index.styl'
import classNames from 'classnames'
export default class Footer extends Component {
  constructor(props) {
      super(props)
      this.state = {
        
      }
  }

  render() {
    let typeId = location.pathname.split('/')[2]
    if(typeof typeId ==  'undefined')   typeId =  'home';
    return (
        <div className="tabbar">
          <div className={classNames("tabbar-item",{active:typeId=='home'})} onClick={this.changeMenu.bind(this,'home')}>
            <i className="tabbar-icon home"></i><span className="tabbar-title">首页</span>
          </div>
          <div className={classNames("tabbar-item",{active:typeId=='message'})} onClick={this.changeMenu.bind(this,'message')}>
            <i className="tabbar-icon message"></i><span className="tabbar-title">消息</span>
          </div>
          <div className={classNames("tabbar-item",{active:typeId=='my'})} onClick={this.changeMenu.bind(this,'my')}>
            <i className="tabbar-icon my"></i><span className="tabbar-title">我的</span>
          </div>
        </div>
    )
  }
  changeMenu(object){
    if(object == 'login')   cookies.remove("isLogin")
    this.direact(object);
  }
  direact(path) {
    if(path == 'login')   cookies.remove("isLogin")
    browserHistory.push(`/weijingm/${path}`)
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
}
