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

class Baoyangxx extends Component {
  constructor(props) {
      super(props);
      this.state = {
        
      } ;
  }
  render() {
    return(
      <div className="per">
        <Header title="制冷" path="baoyang" backIcon="true" />
        <div className="baoyangxxwrap per_wrap">
          <div className="item1">
            <div className="iitem1">
              <div className="title1">设备名称</div>
              <div className="con1">28泵站3泵组303#水泵 </div>
            </div>
            <div className="iitem1">
              <div className="title1">标题</div>
              <div className="con1">更换28泵站3泵组303#水泵配件A</div>
            </div>
            <div className="iitem1">
              <div className="title1">保养周期类型</div>
              <div className="con1">时间周期</div>
            </div>
            <div className="iitem1">
              <div className="title1">保养周期</div>
              <div className="con1">2月/次</div>
            </div>
          </div>
          <div className="item1">
            <div className="iitem2">
              <div className="title1">保养内容</div>
              <div className="con1">底部震动过大，有异响</div>
            </div>
          </div>
          <div className="item1">
            <div className="iitem2">
              <div className="title1">保养结果</div>
              <div className="con1">底部震动过大，有异响</div>
            </div>
          </div>
          <div className="item1">
            <div className="iitem1">
              <div className="title1">实际工时</div>
              <div className="con1">时间周期</div>
            </div>
            <div className="iitem1">
              <div className="title1">使用配件</div>
              <div className="con1 con1-icon">选择配件</div>
            </div>
          </div>
          <div className="item1">
            <div className="iitem2">
              <div className="title1">使用配件</div>
              <div className="con1">
                <div className="con1-item"><span>A配件</span><span>12个</span></div>
                <div className="con1-item"><span>B配件</span><span>12个</span></div>
                <div className="con1-item"><span>B配件</span><span>12个</span></div>
                <div className="con1-item"><span>X配件</span><span>12个</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="baoyangxx-btn">提交</div>
      </div>
    )
  }
  menuOptions(path){
    this.setState({menuId:path})
  }
};

export default connect(state => state, null)(Baoyangxx);
