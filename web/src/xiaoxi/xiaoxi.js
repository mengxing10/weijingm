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

class Xiaoxi extends Component {
  constructor(props) {
      super(props);
      this.state = {

      } ;
  }
  render() {
    let list = [1,2,3,4,5]
    return(
      <div>
        <Header title="消息" path="home"/>
        <div className="xiaoxiwrap per_wrap">
          <div className="fenge"></div>
          <div className="xiaoxi-item">
            <div className="left-item"><i className="nengxiao"></i></div>
            <div className="right-item">
              <div className="right-title">
                <span>能耗能效</span><span className="time">08:57</span>
              </div>
              <div className="right-content">
                <span>水泵底部震动过大，有异响...</span>
              </div>
            </div>
          </div>
          <div className="xiaoxi-item">
            <div className="left-item"><i className="shebei"></i></div>
            <div className="right-item">
              <div className="right-title">
                <span>设备设施</span><span className="time">08:57</span>
              </div>
              <div className="right-content">
                <span>12：00巡检计划已完成</span>
              </div>
            </div>
          </div>
          <div className="xiaoxi-item">
            <div className="left-item"><i className="fenxibaogao"></i></div>
            <div className="right-item">
              <div className="right-title">
                <span>分析报告</span><span className="time">08:57</span>
              </div>
              <div className="right-content">
                <span>水泵底部震动过大，有异响...</span>
              </div>
            </div>
          </div>
          <div className="xiaoxi-item">
            <div className="left-item"><i className="peixunjiaoshi"></i></div>
            <div className="right-item">
              <div className="right-title">
                <span>培训教室</span><span className="time">08:57</span>
              </div>
              <div className="right-content">
                <span>视频有更新</span>
              </div>
            </div>
          </div>
          <div className="xiaoxi-item">
            <div className="left-item"><i className="user"></i></div>
            <div className="right-item">
              <div className="right-title">
                <span>我的消息</span><span className="time">08:57</span>
              </div>
              <div className="right-content">
                <span>用户名已更改</span>
              </div>
            </div>
          </div>
          {list&&list.map((item,i)=>{
            return (
              <div className="xiaoxi-item" key={i}>
                <div className="left-item"><i className="user"></i></div>
                <div className="right-item">
                  <div className="right-title">
                    <span>我的消息</span><span className="time">08:57</span>
                  </div>
                  <div className="right-content">
                    <span>用户名已更改</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Footer/>
      </div>
    )
  }
};
export default connect(state => state, null)(Xiaoxi);
