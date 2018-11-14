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

class Baoyang extends Component {
  constructor(props) {
      super(props);
      this.state = {
        menuId:'jinxing',
        list:[1,2,3,4,5]
      } ;
  }
  render() {
    let {menuId,list} = this.state
    return(
      <div className="per">
        <Header title="保养" path="home" backIcon="true" />
        <div className="baoyangwrap per_wrap">
          <div className="baoyang-search">
            <div className="search-left">南京维景国际酒店</div>
            <div className="search-right"><label className="input"><input placeholder="搜索酒店"/></label></div>
          </div>
          <div className="baoyang-menu">
            <div className={classNames("menu",{active:menuId=='jinxing'})} onClick={this.menuOptions.bind(this,'jinxing')}><span>进行中</span></div>
            <div className={classNames("menu",{active:menuId=='wancheng'})} onClick={this.menuOptions.bind(this,'wancheng')}><span>已完成</span></div>
          </div>
          <div className="baoyang-body">
            <div className="body-ii">
              <div className="body-head" onClick={this.baoyangxx.bind(this)}>
                <div className="head-title">编号单: 1234567890976</div>
                <div className="head-type">紧急</div>
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
                  <div className="body-head">
                    <div className="head-title">编号单: 1234567890976</div>
                    <div className="head-type">紧急</div>
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
          </div>
        </div>
        <Tabbar />
      </div>
    )
  }
  menuOptions(path){
    this.setState({menuId:path})
  }
  baoyangxx(){
    browserHistory.push(`/weijingm/baoyangxx`)
  }
};

export default connect(state => state, null)(Baoyang);
