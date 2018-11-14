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

class Diqu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        list:[1,2,3,4,5]
      } ;
  }
  render() {
    let {list} = this.state
    return(
      <div>
        <Header title="地区" path="home" backIcon="true" />
        <div className="diquwrap per_wrap2">
          {list&&list.map((item,i)=>{
            return(
              <div className="item" key={i}>
                <div className="item-top">
                  <div className="top-title">北部地区</div><div className={classNames("fen",{"warn":i==0})}>4.7</div>
                </div>
                <div className="item-middle">
                  <div className="middle-l">
                    <div className="title1">年能耗费用(万元）</div>
                    <div className="title2">80.21</div>
                  </div>
                  <div className="middle-l">
                    <div className="title1">年能耗费用(万元）</div>
                    <div className="title2">80.21</div>
                    <div className="title3">预测下月费用<span className="title4"> 52.42 </span>万元</div>
                  </div>
                </div>
                <div className="item-bottom">
                  <div className="bottom-i">
                    <div className="title1">电耗(万元)</div>
                    <div className="content1">138.21</div>
                  </div>
                  <div className="bottom-i">
                    <div className="title1">水耗(万元)</div>
                    <div className="content1">138.21</div>
                  </div>
                  <div className="bottom-i">
                    <div className="title1">气耗(万元)</div>
                    <div className="content1">138.21</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
};
export default connect(state => state, null)(Diqu);
