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

class Xunjian extends Component {
  constructor(props) {
      super(props);
      this.state = {
        menuId:'jinxing',
        list:[1,2]
      } ;
  }
  render() {
    let {menuId,list} = this.state
    return(
      <div className="per">
        <Header title="巡检" path="home" backIcon="true" />
        <div className="xunjianwrap per_wrap">
          <div className="xunjian-search">
            <div className="search-left">南京维景国际酒店</div>
            <div className="search-right"><label className="input"><input placeholder="搜索酒店"/></label></div>
          </div>
          <div className="xunjian-body">
            {list&&list.map((item,i)=>{
              return (
                <div className="body-ii" key={i}>
                  <div className="body-head" onClick={this.xunjiandan.bind(this)}>
                    <div className="head-title">制冷</div>
                    <div className="head-status zhong">巡检中</div>
                  </div>
                  <div className="body-b">
                    <div className="b-b">
                    下次巡检时间：2018-06-15  13:00
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="body-ii">
              <div className="body-head">
                <div className="head-title">制冷</div>
                <div className="head-status wei">未完成</div>
              </div>
              <div className="body-b">
                <div className="b-b">
                下次巡检时间：2018-06-15  13:00
                </div>
              </div>
            </div>
            <div className="body-ii">
              <div className="body-head">
                <div className="head-title">制冷</div>
                <div className="head-status">已完成</div>
              </div>
              <div className="body-b">
                <div className="b-b">
                下次巡检时间：2018-06-15  13:00
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
  xunjiandan(){
    browserHistory.push(`/weijingm/xunjiandan`)
  }
};

export default connect(state => state, null)(Xunjian);
