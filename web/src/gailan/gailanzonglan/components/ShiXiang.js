
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import '../styles/tcshixiang.styl'
import EventsStep from './base/EventsStep'

export default class ShiXiang extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    let svgpath = '/resources/jiankang.svg';
    let {data} = this.props
    return (
      <div className="shixiang-panel" onClick={this.goNewPage.bind(this,data.tz)}>
      <h3>{data.name}</h3>
      <div className="charts-body">
        <EventsStep
          width="95%" height="95%" data={data.data} id={this.props.svgId}
        />
      </div>

    </div>

    )
  }

  goNewPage(id){
    this.props.goNewPage(id)
  }


}
