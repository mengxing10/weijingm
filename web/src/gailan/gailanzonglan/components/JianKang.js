
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import '../styles/tcdunshui.styl'
import HengZhiZhen from './base/HengZhiZhen'

export default class JianKang extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    let svgpath = '/resources/jiankang.svg';
    let {data} = this.props
    return (
      <div className="dunshui-panel" onClick={this.goNewPage.bind(this,data.id)}>
      <h3>{data.name}</h3>
    <div className="charts-body">
        <HengZhiZhen
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
