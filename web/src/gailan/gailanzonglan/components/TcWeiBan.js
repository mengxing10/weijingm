
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import '../styles/index.styl'
import EditTableGw from '../../../common/components/EditTableGw'


export default class TcJieDianLv extends Component {

  constructor(props) {
      super(props)
      this.state={
        startDate: moment().subtract(1,'h'),
        endDate: moment(),
        dataTypes:'shishi',
        statue:'',
        optionsType:null,
        jianyi:''
      }

  }

  render() {
    let thead = [
      {
        "id": "deviceName",
        "value": "设备名称"
      },
      {
        "id": "baojing",
        "value": "报警描述"
      },
      {
        "id": "baojingTime",
        "value": "报警时间"
      }, {
        "id": "timeline",
        "value": "未处理时长"
      }, {
        "id": "status",
        "value": "当前状态"
      }
    ]
    let result =[]
    let widths =['15%','50%','15%','10%','10%']


    return(
      <div className="tcpanel">
        <div className="tc_bg"></div>
        <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title">
                <h3>未处理报警</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div className='tc_wrap_body'>
              <div className="charts-wrap" >
                <EditTableGw thead={thead} tdata={result} widths={widths} />
              </div>
            </div>
         </div>
      </div>
    )

  }

  tanchuangClose(){
    this.props.tanchuangClose()
  }

  componentWillMount(){

  }
  shouldComponentUpdate(nextProps, nextState) {
    if ((_.isEqual(this.props, nextProps)&&_.isEqual(this.state, nextState)) ) {
        return false
    }
    return true
  }



}
