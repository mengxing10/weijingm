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
    if(typeof typeId ==  'undefined')   typeId =  'jiance';
      return (
          <div className="tabbar2">
            <div className={classNames("tabbar-item",{active:typeId=='jiance'})} onClick={this.changeMenu.bind(this,'jiance')}>
              <i className="tabbar-icon jiance"></i><span className="tabbar-title">监测</span>
            </div>
            <div className={classNames("tabbar-item",{active:typeId=='baojing'})} onClick={this.changeMenu.bind(this,'baojing')}>
              <i className="tabbar-icon bj"></i><span className="tabbar-title">报警</span>
            </div>
            <div className={classNames("tabbar-item",{active:typeId=='weixiu'})} onClick={this.changeMenu.bind(this,'weixiu')}>
              <i className="tabbar-icon wx"></i><span className="tabbar-title">维修</span>
            </div>
            <div className={classNames("tabbar-item",{active:typeId=='baoyang'})} onClick={this.changeMenu.bind(this,'baoyang')}>
              <i className="tabbar-icon by"></i><span className="tabbar-title">保养</span>
            </div>
            <div className={classNames("tabbar-item",{active:typeId=='xunjian'})} onClick={this.changeMenu.bind(this,'xunjian')}>
              <i className="tabbar-icon xj"></i><span className="tabbar-title">巡检</span>
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
