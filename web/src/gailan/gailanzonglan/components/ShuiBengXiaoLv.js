
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import '../styles/tcxiaolv.styl'
import JieDianLv from './base/JieDianLv'

export default class ShiXiang extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    let svgpath = '/resources/jiedianlv.svg';
    let {data} = this.props
    return (
      <div className="xiaolv-panel"  onClick={this.goNewPage.bind(this,data.id)}>
        <h3>{data.name}</h3>
      <div className="charts-body">
        <div className="charts">
          <JieDianLv
            width="100%" height="70%" svg={svgpath} data={data.data} id={this.props.svgId}
          />
        </div>
        <div className="texts">
          <h3>提升建议</h3>
        <p>{data.jianyi}</p>
        </div>
      </div>


    </div>

    )
  }

  goNewPage(id){
    this.props.goNewPage(id)
  }


}
