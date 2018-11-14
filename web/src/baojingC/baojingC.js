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

class BaojingC extends Component {
  constructor(props) {
      super(props);
      this.state = {

      } ;
  }
  render() {
    return(
      <div className="baojingcwrap">
        <Header title="制冷" path="baojing" backIcon="true" />
        <div className="per_wrap">
          <div className="container">
            <div className="item">
              <div className="title">订单号</div>
              <div className="con">12345678907</div>
            </div>
            <div className="item">
              <div className="title">设备名称</div>
              <div className="con">1#冷机</div>
            </div>
            <div className="item">
              <div className="title">设备位置</div>
              <div className="con">空调机房</div>
            </div>
            <div className="item">
              <div className="title">报警时间</div>
              <div className="con">2018-09-15 09:46</div>
            </div>
            <div className="item">
              <div className="title">紧急程度</div>
              <div className="con">紧急</div>
            </div>
            <div className="item2">
              <div className="title">报警内容</div>
              <div className="con">底部震动过大，有异响底部震动过大，有异响底部震动过大，有异响底部震动过大，有异响底部震动过大，有异响</div>
            </div>
          </div>
        </div>
        <div className="chuliBtn">
          <div>忽略</div><div>报修</div>
        </div>
      </div>
    )
  }

};

export default connect(state => state, null)(BaojingC);
