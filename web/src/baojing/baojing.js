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

class Baojing extends Component {
  constructor(props) {
      super(props);
      this.state = {
        menuId:'reshui'
      } ;
  }
  render() {
    let {menuId} = this.state
    return(
      <div className="per">
        <Header title="报警" path="home" backIcon="true" />
        <div className="baojingwrap per_wrap">
          <div className="baojing-search">
            <div className="search-left">南京维景国际酒店</div>
            <div className="search-right"><label className="input"><input placeholder="搜索酒店"/></label></div>
          </div>
          <div className="baojing-body">
            <div className="body-ii">
              <div className="body-head" onClick={this.baojingc.bind(this)}>
                <div className="head-title">编号单: 1234567890976</div>
                <div className="head-type">紧急</div>
                <div className="head-status">未处理</div>
              </div>
              <div className="body-b">
                <div className="b-t">
                  <span>制冷</span><span>2018-09-15  09:46</span>
                </div>
                <div className="b-b">
                  <div>设备:1#冷机</div>
                  <div>内容:底部震动过大，有异响</div>
                </div>
              </div>
            </div>
            <div className="body-ii">
              <div className="body-head" onClick={this.baojingc.bind(this)}>
                <div className="head-title">编号单: 1234567890976</div>
                <div className="head-type">紧急</div>
                <div className="head-status">未处理</div>
              </div>
              <div className="body-b">
                <div className="b-t">
                  <span>制冷</span><span>2018-09-15  09:46</span>
                </div>
                <div className="b-b">
                  <div>设备:1#冷机</div>
                  <div>内容:底部震动过大，有异响</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabbar />
      </div>
    )
  }
  menuOptions(path){
    this.setState({menuId:path})
  }
  baojingc(){
    browserHistory.push(`/weijingm/baojingc`)
  }
};

export default connect(state => state, null)(Baojing);
