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

class Weixiu extends Component {
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
        <Header title="维修" path="home" backIcon="true" />
        <div className="weixiuwrap per_wrap">
          <div className="weixiu-search">
            <div className="search-left" onClick={this.addWeixiu.bind(this,'jiudianxz')}>南京维景国际酒店</div>
            <div className="search-right"><label className="input"><input placeholder="搜索酒店"/></label></div>
          </div>
          <div className="weixiu-menu">
            <div className={classNames("menu",{active:menuId=='jinxing'})} onClick={this.menuOptions.bind(this,'jinxing')}><span>进行中</span></div>
            <div className={classNames("menu",{active:menuId=='wancheng'})} onClick={this.menuOptions.bind(this,'wancheng')}><span>已完成</span></div>
          </div>
          <div className="weixiu-body">
            <div className="body-ii">
              <div className="body-head" onClick={this.addWeixiu.bind(this,'weixiuxq')}>
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
            
            {list&&list.map((item,i)=>{
              return (
                <div className="body-ii" key={i}>
                  <div className="body-head" onClick={this.addWeixiu.bind(this,'weixiuhf')}>
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
              )
            })}
            <div className="body-ii">
              <div className="body-head" onClick={this.addWeixiu.bind(this,'weixiuys')}>
                <div className="head-title">编号单: 1234567890976</div>
                <div className="head-type">紧急</div>
                <div className="head-status">待验收</div>
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
          <span className="weixiu-btn" onClick={this.addWeixiu.bind(this,'weixiuadd')}></span>
        </div>
        <Tabbar />
      </div>
    )
  }
  menuOptions(path){
    this.setState({menuId:path})
  }
  addWeixiu(path){
    browserHistory.push(`/weijingm/${path}`)
  }
};

export default connect(state => state, null)(Weixiu);
