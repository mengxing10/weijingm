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

class jiudianXz extends Component {
  constructor(props) {
      super(props);
      this.state = {
        diqu:'bj'
      } ;
  }
  render() {
    let {diqu} = this.state
    return(
      <div className="jdxzwrap">
        <Header title="选择酒店" path="weixiu" backIcon="true" />
        <div className="container per_wrap2">
          <div className="jiudian-ss">
            <label className="ss-input-w">
              <input className="ss-input" />搜索酒店
            </label>
          </div>
          <div className="jiudian-list">
            <div className="left">
              <div className={classNames("quyu",{act:diqu=='bj'})} onClick={this.toggleCheckbox.bind(this,'bj')}>北京</div>
              <div className={classNames("quyu",{act:diqu=='sh'})} onClick={this.toggleCheckbox.bind(this,'sh')}>上海</div>
              <div className={classNames("quyu",{act:diqu=='cd'})} onClick={this.toggleCheckbox.bind(this,'cd')}>成都</div>
              <div className={classNames("quyu",{act:diqu=='sz'})} onClick={this.toggleCheckbox.bind(this,'sz')}>深圳</div>
              <div className={classNames("quyu",{act:diqu=='js'})} onClick={this.toggleCheckbox.bind(this,'js')}>江苏</div>
              <div className={classNames("quyu",{act:diqu=='nj'})} onClick={this.toggleCheckbox.bind(this,'nj')}>南京</div>
            </div>
            <div className="right">
              <div className="name">北京丽都维景酒店</div>
              <div className="name">北京广安门维景国际大酒店</div>
              <div className="name">北京旅居华侨饭店</div>
              <div className="name">北京远通维景国际大酒店</div>
              <div className="name">北京和平里旅居酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京龙熙维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店</div>
              <div className="name">北京维景国际大酒店1</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  toggleCheckbox(name){
    this.setState({diqu:name})
  }
  baojingc(){
    browserHistory.push(`/weijingm/baojingc`)
  }
};

export default connect(state => state, null)(jiudianXz);
