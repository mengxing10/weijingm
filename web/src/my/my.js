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
import Cookies from 'universal-cookie'
const cookies = new Cookies();


class My extends Component {
  constructor(props) {
      super(props);
      this.state = {

      } ;
  }
  render() {
    return(
      <div>
        <Header title="我的" path="home"/>
        <div className="mywrap per_wrap">
          <div className="itemList">
            <div className="item">
              <span className="title">姓名</span>
              <span className="con">张力</span>
            </div>
            <div className="item">
              <span className="title">电话</span>
              <span className="con">2345224</span>
            </div>
            <div className="item">
              <span className="title">部门</span>
              <span className="con">运维部</span>
            </div>
          </div>
          <div className="itemList">
            <div className="item" onClick={this.mypwd.bind(this)}>
              <span className="title">账户安全设置</span>
              <span className="title2"></span>
            </div>
          </div>
          <div className="btn" onClick={this.loginOut.bind(this)}>退出登录</div>
        </div>
        <Footer/>
      </div>
    )
  }
  componentWillMount() {
    const isLogin = cookies.get("isLogin")?true:false

    if (!isLogin) {
      browserHistory.push('/weijingm/login')
    }
  }
  mypwd(){
    browserHistory.push('/weijingm/mypwd');
  }
  loginOut(){
    cookies.remove("isLogin")
    browserHistory.push('/weijingm/login');
  }
};
export default connect(state => state, null)(My);
