
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import '../styles/index.styl'
import JianKang from './JianKang'

export default class TcJianKang extends Component {

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
      {name:"28-203",id:"28-203",data:0.98,jianyi:"无"},
      {name:"28-204",id:"28-204",data:0.95,jianyi:"无"},
      {name:"38-2",id:"38-2",data:0.99,jianyi:"无"},
      {name:"38-3",id:"38-3",data:0.93,jianyi:"无"},


    ]


    return(
      <div className="tcpanel">
        <div className="tc_bg"></div>
        <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title">
                <h3>健康度</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div className='tc_wrap_body'>
                <div className="charts-wrap" >
                  {data.map((item,i)=>(<JianKang key={i} svgId={`svg_jiankang_${i}`}
                    goNewPage= {::this.goNewPage}
                    data ={item}/>))}
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
    browserHistory.push(`/bgp/pc/gailan/shuibeng?id=${pumpGroup}`);
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
