/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Header from '../header'
import './styles/index.styl'
import {Icon, Dropdown, Input,Form,Radio,Button,Checkbox,TextArea,Image} from 'semantic-ui-react'
import { request } from 'https';
import $ from 'jquery'

class WeixiuXq extends Component {
  constructor(props) {
      super(props);
      this.state = {
        tabId:1
      } ;
  }
  render() {
    let {tabId} = this.state
    return(
      <div className="weixiuxqwrap">
        <Header title="制冷" path="weixiu" backIcon="true" />
        <div className="weixiuxq-body per_wrap2">
          <div className="xq-menu">
            <div className={classNames("menui",{act:tabId==1})} onClick={this.changeTab.bind(this,1)}><span>订单状态</span></div>
            <div className={classNames("menui",{act:tabId==2})} onClick={this.changeTab.bind(this,2)}><span>订单详情</span></div>
          </div>
          <div className={classNames("xq-body-zt",{dpn:tabId==2})}>
            <div className="body-item">
              <div className="item-top blues"><div className="statue">已完成</div></div>
              <div className="item-bottom"></div>
            </div>
            <div className="body-item">
              <div className="item-top">
                <div className="left">王明</div><div className="right">08/13 15:00</div>
              </div>
              <div className="item-bottom">
                <div className="bottom-i">
                  <div className="i-left">工作评价</div>
                  <div className="i-right">
                    <i className="star act"></i>
                    <i className="star act"></i>
                    <i className="star act"></i>
                    <i className="star act"></i>
                    <i className="star"></i>
                  </div>
                </div>
                <div className="bottom-i">
                  <div className="i-left">工作评语</div>
                  <div className="i-right">办理意见内容办理意见内容办理意见办理意见内容办理意见内容办理意见内容办理意见内容</div>
                </div>
              </div>
            </div>
            <div className="body-item">
              <div className="item-top">
                <div className="left">王明</div><div className="right">08/13 15:00</div>
              </div>
              <div className="item-bottom">
                <div className="bottom-i">
                  <div className="i-left">使用配件</div>
                  <div className="i-right">
                    <div className="i-right-list">
                      <div className="left">A配件</div><div className="right">12个</div>
                    </div>
                    <div className="i-right-list">
                      <div className="left">A配件</div><div className="right">12个</div>
                    </div>
                  </div>
                </div>
                <div className="bottom-i">
                  <div className="i-left">处理结果</div>
                  <div className="i-right">办理意见内容办理意见内容办理意见办理意见内容办理意见内容办理意见内容办理意见内容</div>
                </div>
                <div className="bottom-i bottom-i-img">
                    <Image ref='testImg' id='testImg0' onClick={this.onClickImg.bind(this,'testImg0')} size='mini' src={require('./styles/img/1.jpg')}  />
                    <Image ref='testImg' id='testImg1' onClick={this.onClickImg.bind(this,'testImg1')} size='mini' src={require('./styles/img/1.jpg')}  />
                    <Image ref='testImg' id='testImg2' onClick={this.onClickImg.bind(this,'testImg2')} size='mini' src={require('./styles/img/1.jpg')}  />
                </div>
              </div>
            </div>
          </div>
          <div className={classNames("xq-body-xx",{dpn:tabId==1})}>
            <div className="dd-item">
              <div className="dd-item-i"><div className="ileft">订单号</div><div className="iright">12345678907</div></div>
              <div className="dd-item-i"><div className="ileft">设备名称</div><div className="iright">1#冷机</div></div>
              <div className="dd-item-i"><div className="ileft">标题内容</div><div className="iright">空调机房</div></div>
              <div className="dd-item-i"><div className="ileft">报修人</div><div className="iright">907</div></div>
              <div className="dd-item-i"><div className="ileft">下单时间</div><div className="iright">2018-09-15 09:46</div></div>
              <div className="dd-item-i"><div className="ileft">紧急程度</div><div className="iright">一般</div></div>
            </div>
            <div className="dd-con">
              <div className="dd-item-i"><div className="top">问题描述</div><div className="bottom">底部震动过大，有异响</div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  changeTab(path){
    this.setState({tabId:path})
  }
  baojingc(){
    browserHistory.push(`/weijingm/baojingc`)
  }
  onClickImg(refid){
    console.log(refid)
    $( "#"+ refid ).toggleClass( "mini")
  }
};

export default connect(state => state, null)(WeixiuXq);
