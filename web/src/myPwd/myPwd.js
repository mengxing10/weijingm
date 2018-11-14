/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Footer from '../footer'
import Header from '../header'
import './styles/index.styl'

class MyPwd extends Component {
  constructor(props) {
      super(props);
      this.state = {

      } ;
  }
  render() {
    return(
      <div>
        <Header title="账户安全设置" path="my" backIcon="true"/>
        <div className="mywrap per_wrap2">
          <div className="itemList">
            <div className="item">
              <span className="title">原密码</span>
              <input className="input" placeholder="请输入"/>
            </div>
            <div className="item">
              <span className="title">新密码</span>
              <input className="input" placeholder="请输入"/>
            </div>
          </div>
          <div className="btn">确认</div>
        </div>
      </div>
    )
  }
};
export default connect(state => state, null)(MyPwd);
