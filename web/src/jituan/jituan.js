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
import Swiper from '../common/swiper/swiper.min.js'
import swipercss from '../common/swiper/swiper.min.css'

class Jituan extends Component {
  constructor(props) {
      super(props);
      this.state = {
      } ;
  }
  render() {
    return(
      <div className="per">
        <Header title="集团" path="home" backIcon="true" />
        <div className="jituanwrap per_wrap2" id="jituanwrap">
          <div className="jituan-wiper">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="item">
                    <div className="item-top">
                      <div className="title1">本月收入</div>
                      <div className="content1">30000.00</div>
                    </div>
                    <div className="item-bottom">
                      <div className="bottom-left">
                        <div className="title1">累计收入</div>
                        <div className="content2">10.0000.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="item item2">
                    <div className="item-top">
                      <div className="title1">本月费用</div>
                      <div className="content1">30000.00</div>
                    </div>
                    <div className="item-bottom">
                      <div className="bottom-left">
                        <div className="title1">累计费用</div>
                        <div className="content2">30000.00</div>
                      </div>
                      <div className="bottom-right">
                        <div className="title1">预测下月费用</div>
                        <div className="content2">30000.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    var swiper = new Swiper('.swiper-container', {
      effect: 'slide',//slide  coverflow
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      pagination: {
        // el: '.swiper-pagination',
      },
      // watchSlidesProgress : true,
      on: {
        progress:function(progress){
          // console.log(progress)
          // for (var i = 0; i < swiper.slides.length; i++){
          //   var slide = swiper.slides[i];
          //   es = slide.style;
          //   es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'rotate('+360*slide.progress+'deg)';
          // }
        },
        sliderMove: function(es){
          es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'rotate(90deg)';
        },
        setTransition:function(transition){
          // console.log(transition)
        }
        
      }
    });
    

    
  }
};
export default connect(state => state, null)(Jituan);
