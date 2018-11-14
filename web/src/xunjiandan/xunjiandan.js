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

class Xunjiandan extends Component {
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
        <Header title="制冷" path="xunjian" backIcon="true" />
        <div className="xunjiandanwrap per_wrap2">
          <div className="xunjiandan-search">下次巡检时间 13:00</div>
          <div className="fenge"></div>
          <div className="xunjiandan-body">
            <div className="table-head">
              <div>计划时间</div><div>完成时间</div><div></div>
            </div>
            {list&&list.map((item,i)=>{
              return (
                <div className="table-tr" key={i}>
                  <div className="wancheng">09:00</div><div></div><div>未完成</div>
                </div>
              )
            })}
            {list&&list.map((item,i)=>{
              return (
                <div className="table-tr" key={i}>
                  <div className="wancheng">10:00</div><div>10:05</div><div>已完成</div>
                </div>
              )
            })}
            <div className="table-tr">
              <div className="wancheng">13:00</div><div></div><div className="dxj">待巡检</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

};

export default connect(state => state, null)(Xunjiandan);
