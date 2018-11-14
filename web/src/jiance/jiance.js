/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory,Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Tabbar from '../tabbar'
import Header from '../header'
import './styles/index.styl'

class Jiance extends Component {
  constructor(props) {
      super(props);
      this.state = {
        menuId:'reshui'
      } ;
  }
  render() {
    let {menuId} = this.state
    return(
      <div className="per">
        <Header title="监测" path="home" backIcon="true" />
        <div className="jiancewrap per_wrap">
          <div className="jiance-search">
            <div className="search-left">南京维景国际酒店</div>
            <div className="search-right"><label className="input"><input placeholder="搜索酒店"/></label></div>
          </div>
          <div className="jiance-menu">
            <div className={classNames("menu",{active:menuId=='reshui'})} onClick={this.menuOptions.bind(this,'reshui')}><span>生活热水</span></div>
            <div className={classNames("menu",{active:menuId=='zhileng'})} onClick={this.menuOptions.bind(this,'zhileng')}><span>制冷系统</span></div>
            <div className={classNames("menu",{active:menuId=='cainuan'})} onClick={this.menuOptions.bind(this,'cainuan')}><span>采暖系统</span></div>
          </div>
          <div className="jiance-body">
            <div className="body-top">
              <div className="top-i">
                <span>总功率(kw）</span><span>455,602</span>
              </div>
              <div className="top-i">
                <span>总冷功率(kw）</span><span>455,602</span>
              </div>
              <div className="top-i">
                <span>COP</span><span>455,602</span>
              </div>
            </div>
            <div>
              <div className="conf-i">
                <div className="title">压力</div>
                <div className="conn">
                  <div className="conn-i">
                    <div>集水器压力(MPa)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>分水器压力(MPa)</div>
                    <div>455602</div>
                  </div>
                </div>
              </div>
              <div className="conf-i">
                <div className="title">总管温度</div>
                <div className="conn">
                  <div className="conn-i">
                    <div>冷冻水进水总管温度(℃)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>相电压UA(V)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>冷冻水进水总管温度(℃)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>冷冻水进水总管温度(℃)</div>
                    <div>455602</div>
                  </div>
                </div>
              </div>
              <div className="conf-i">
                <div className="title">各区温度</div>
                <div className="conn">
                  <div className="conn-i">
                    <div>冷冻水进水总管温度(℃)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>相电压UA(V)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>冷冻水进水总管温度(℃)</div>
                    <div>455602</div>
                  </div>
                  <div className="conn-i">
                    <div>冷冻水进水总管温度(℃)</div>
                    <div>455602</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabbar/>
      </div>
    )
  }
  menuOptions(path){
    this.setState({menuId:path})
  }
};

export default connect(state => state, null)(Jiance);
