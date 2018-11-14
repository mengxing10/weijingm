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

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {

      } ;
  }
  render() {
    return(
      <div className="per">
        <Header title="首页" path="home" backIcon="false" />
        <div className="homewrap per_wrap">
          <div className="item">
            <div className="item-left nengxiao">
              <span className="biaoti" style={{color:"#ccc"}}>能耗能效</span>
            </div>
            <div className="item-right">
              <div className="right-item" onClick={this.menuOptions.bind(this,'jituan')}><i className="icons icon1"></i><span>集团</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'diqu')}><i className="icons icon2"></i><span>地区</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'jiudian')}><i className="icons icon3"></i><span>酒店</span></div>
            </div>
          </div>
          <div className="item">
            <div className="item-left shebei">
              <span className="biaoti" style={{color:"#ccc"}}>设备设施</span>
            </div>
            <div className="item-right">
              <div className="right-item" onClick={this.menuOptions.bind(this,'jiance')}><i className="icons icon4"></i><span>监测</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'baojing')}><i className="icons icon5"></i><span>报警</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'weixiu')}><i className="icons icon6"></i><span>维修</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'baoyang')}><i className="icons icon7"></i><span>保养</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'xunjian')}><i className="icons icon8"></i><span>巡检</span></div>
            </div>
          </div>
          <div className="item">
            <div className="item-left fenxi">
              <span className="biaoti" style={{color:"#ccc"}}>分析报告</span>
            </div>
            <div className="item-right">
              <div className="right-item"><i className="icons icon9"></i><span>集团</span></div>
              <div className="right-item"><i className="icons icon10"></i><span>酒店</span></div>
            </div>
          </div>
          <div className="item">
            <div className="item-left jiaoshi">
              <span className="biaoti" style={{color:"#ccc"}}>培训教室</span>
            </div>
            <div className="item-right">
              <div className="right-item" onClick={this.menuOptions.bind(this,'shipin')}><i className="icons icon11"></i><span>视频</span></div>
              <div className="right-item" onClick={this.menuOptions.bind(this,'wendang')}><i className="icons icon12"></i><span>文档</span></div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
  menuOptions(path){
    browserHistory.push(`/weijingm/${path}`)
  }
};

export default connect(state => state, null)(Home);
