/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Tabbar from '../tabbar'
import Header from '../header'
import './styles/index.styl'

class WeixiuYs extends Component {
  constructor(props) {
      super(props);
      this.state = {
        star:1
      } ;
  }
  render() {
    let {star} = this.state
    return(
      <div className="weixiuyswrap">
        <Header title="验收" path="weixiu" backIcon="true" />
        <div className="container per_wrap">
          <div className="weixiu-item1">
            <div className="title1">工作评价</div>
            <div className="title2">
              <div className="stars">
              <div className={classNames("star",{act:star>=1})} onClick={this.changeStar.bind(this,1)}></div>
              <div className={classNames("star",{act:star>=2})} onClick={this.changeStar.bind(this,2)}></div>
              <div className={classNames("star",{act:star>=3})} onClick={this.changeStar.bind(this,3)}></div>
              <div className={classNames("star",{act:star>=4})} onClick={this.changeStar.bind(this,4)}></div>
              <div className={classNames("star",{act:star>=5})} onClick={this.changeStar.bind(this,5)}></div>
              </div>
            </div>
          </div>
          <div className="weixiu-item2">
            <div className="con1" contentEditable placeholder="请输入文字"></div>
          </div>
          <div className="weixiu-item2">
            <div className="con1" contentEditable placeholder="处理结果"></div>
          </div>
        </div>
        <div className="weixiuys-btn">提交</div>
      </div>
    )
  }
  changeStar(num){
    this.setState({star:num})
  }
  baojingc(){
    browserHistory.push(`/weijingm/baojingc`)
  }
};

export default connect(state => state, null)(WeixiuYs);
