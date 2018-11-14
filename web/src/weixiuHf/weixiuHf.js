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

class WeixiuHf extends Component {
  constructor(props) {
      super(props);
      this.state = {
      } ;
  }
  render() {
    return(
      <div className="weixiuhfwrap">
        <Header title="回复" path="weixiu" backIcon="true" />
        <div className="container per_wrap">
          <div className="fenge"></div>
          <div className="weixiu-item1">
            <div className="title1">实际工时</div>
            <div className="title3"><div className="input" contentEditable placeholder="请输入工时"></div>人/天</div>
          </div>
          <div className="fenge"></div>
          <div className="weixiu-item1" onClick={this.changePeijian.bind(this)}>
            <div className="title1">使用配件</div>
            <div className="title2">123件</div>
          </div>
          <div className="fenge"></div>
          <div className="weixiu-item2">
            <div className="title1">处理结果</div>
            <div className="con1" contentEditable placeholder="请填写处理结果"></div>
          </div>
          <div className="weixiu-item2">
            <img className="weixiu_img" src={require('./styles/img/icon001.png')} alt="" />
          </div>
        </div>
        <div className="weixiuhf-btn">提交</div>
      </div>
    )
  }
  menuOptions(path){
    this.setState({menuId:path})
  }
  changePeijian(){
    browserHistory.push(`/weijingm/weixiupj`)
  }
};

export default connect(state => state, null)(WeixiuHf);
