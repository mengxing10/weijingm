
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import '../styles/index.styl'
import ShuiBengXiaoLv from './ShuiBengXiaoLv'

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
    let data =[
        {name:"28-203",id:"28-203",data:[90,75,85,22],
        jianyi:"无"},
        {name:"28-204",id:"28-204",data:[90,75,83,19],
          jianyi:"效率偏低，低于最高效率点3.5%。如更换额定扬程120m，额定流量1100m3/h的水泵，年节电量可增加6.1万kWh"},
        {name:"38-2",id:"28-204",data:[91,77,82,20],jianyi:"无"},
        {name:"38-3",id:"28-204",data:[91,77,84,21],jianyi:"无"}

    ]
    return(
      <div className="tcpanel">
        <div className="tc_bg"></div>
        <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title">
                <h3>水泵效率</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div className='tc_wrap_body'>
              <div className="charts-wrap" >
                  {data.map((item,i)=>(<ShuiBengXiaoLv key={i} svgId={`svg_shuibengxiaolv_${i}` } data={item} goNewPage={::this.goNewPage}/>))}
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
