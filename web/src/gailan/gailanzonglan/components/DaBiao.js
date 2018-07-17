
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import '../styles/tcdabiao.styl'
export default class Dunshui extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    let {value} = this.props
    let error = value.max<value.value || value.value<value.min
    return (
      <div className="dabiao-panel" onClick={this.goNewPage.bind(this,value.id)}>
      <h3>{value.name}</h3>
      <div className="charts-body">
        <div className="item"></div>
        <div className="item">
          <h3>{value.zhibiao}</h3>
          <span className={classNames({active:error})}>{value.value}</span>
          <h3>{value.min}~{value.max}</h3>
        </div>
        <div className="item"></div>


      </div>
      {value.jianyi!=''&&<div className="charts-text">
        <h3>诊断建议</h3>
        <p>{value.jianyi}</p>
      </div>}



    </div>

    )
  }
  goNewPage(id){
    this.props.goNewPage(id)
  }
}
