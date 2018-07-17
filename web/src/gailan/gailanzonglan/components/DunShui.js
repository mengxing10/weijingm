
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import ShuZhiZhen from './base/ShuZhiZhen'
import '../styles/tcdunshui.styl'
export default class Dunshui extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    let title = "28-2组泵"
    let svgpath = '/resources/dunshuinenghao.svg';
    let svgdata =[0.21,0.34,0.48,0,0.6]
    let {data} = this.props
    return (
      <div className="dunshui-panel" onClick={this.goNewPage.bind(this,data.id)}>
      <h3>{data.name}</h3>
      <div className="charts-body">
        <ShuZhiZhen
          svg={svgpath} width="95%" height="95%" data={data.data} id={this.props.svgId}
        />
      </div>
      <div className="charts-text">
        <h3>诊断建议</h3>
        <p>{data.jianyi}</p>
      </div>



    </div>

    )
  }
  goNewPage(id){
    this.props.goNewPage(id)
  }
}
