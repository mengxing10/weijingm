
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import '../styles/index.styl'
import DunShui from './DunShui'
export default class TcDunshui extends Component {

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
    let data =[
      {name:"28-2泵组",id:"28-1",data:[0.21,0.29,0.34,0.1,0.5],
        jianyi:"吨水能耗有4.2%的改进空间，改进后预计年节省电量6万kWh，查看详情"},
      {name:"38泵站",id:"38-all",data:[0.08,0.1,0.12,0.05,0.15],jianyi:"无"}

    ]
    return(
      <div className="tcpanel">
        <div className="tc_bg"></div>
        <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title">
                <h3>吨水能耗 KW·h/t</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div className='tc_wrap_body'>
                <div className="charts-wrap" >
                  {data.map((item,i)=>(<DunShui key={i} svgId={`svg_dunshui_${i}`} data={item} goNewPage={::this.goNewPage}/>))}
                </div>
            </div>
         </div>
      </div>
    )

  }

  tanchuangClose(){
    this.props.tanchuangClose()
  }
  goNewPage(pumpGroup){
    browserHistory.push(`/bgp/pc/gailan/bengzu?groupid=${pumpGroup}`);
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
