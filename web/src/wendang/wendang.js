/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import './styles/index.styl'
import Swiper from '../common/swiper/swiper.js'
import swipercss from '../common/swiper/swipercss.css'

class Wendang extends Component {
  constructor(props) {
      super(props);
      this.state = {

      } ;
  }
  render() {
    let list = [1,2,3,4,5],types=['推荐','变频器','冷机','冷塔','电机','其它',]
    return(
      <div>
        <div className="wendang-head">
          <div className="head_iconleft" onClick={this.direact.bind(this,'home')}></div>
          <div className="head_title">文档</div>
          <div className="head_rig"></div>
        </div>
        <div className="wendangwrap per_wrap">
          <div className="wendang-ss">
            <label className="ss-input-w foc">
              <input className="ss-input" />
            </label>
          </div>
          <div className="wendang-menu">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <span className="menu-name active">推荐</span>
                </div>
                {types.map((item,i)=>{
                  return (
                    <div className="swiper-slide" key={i} >
                      <span className="menu-name">{item}</span>
                    </div>
                  )
                })}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="fenge"></div>
          <div className="wendang-body">
            <div className="wendang-item">
              <div className="left-item"><i></i></div>
              <div className="right-item">
                <div className="right-title">2017年12月试题</div>
                <div className="right-content">
                  <span>2016-12-29  11:55</span><span className="rdi">8.5M</span>
                </div>
              </div>
            </div>
            {list&&list.map((item,i)=>{
              return (
                <div className="wendang-item" key={i}>
                  <div className="left-item"><i></i></div>
                  <div className="right-item">
                    <div className="right-title">2017年{item}月试题</div>
                    <div className="right-content">
                      <span>2016-12-29  11:55</span><span className="rdi">8.5M</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    var swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 5,
      autoplay:false,
      effect : 'slide',
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      //
      // },
    });
  }
  direact(path) {
    if(path == 'login')   cookies.remove("isLogin")
    browserHistory.push(`/weijingm/${path}`)
  }
};
export default connect(state => state, null)(Wendang);
