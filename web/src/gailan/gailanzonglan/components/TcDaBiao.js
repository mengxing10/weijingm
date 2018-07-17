
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import '../styles/index.styl'
import DaBiao from './DaBiao'
export default class TcDaBiao extends Component {

  constructor(props) {
      super(props)
      this.state={
        startDate: moment().subtract(1,'h'),
        endDate: moment(),
        dataTypes:'shishi',
        statue:'',
        optionsType:null,
        openNum:1,
        jianyi:''
      }

  }

  render() {
    let data =[
      {name:"28-2泵组",id:"28-2",status:1,zhibiao:"液位 m",max:17.5,min:12,value:14,jianyi:""},
      {name:"38泵站",id:"38-all",status:0,zhibiao:"压力 MPa",max:0.28,min:0.15,value:0.12,jianyi:"压力偏低,查看详情"}

    ]
    let dabiaoNum = 0
    data.forEach(item=>{if(item.status==1) dabiaoNum++})
    let weiNum = data.length-dabiaoNum
    const {openNum} = this.state


    return(
      <div className="tcpanel">
        <div className="tc_bg"></div>
        <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title">
                <h3>工艺达标率</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div className='tc_wrap_body'>
                <div className="charts-condition">
                  <div className={classNames("item",{active:openNum==1})} onClick={this.openDaBiaoEn.bind(this,1)}>
                    <h3>{dabiaoNum}</h3>
                    <span>达标</span>
                  </div>
                  <div className={classNames("item",{active:openNum==0})} onClick={this.openDaBiaoEn.bind(this,0)}>
                    <h3>{weiNum}</h3>
                    <span>未达标</span>
                  </div>
                </div>
                <div className="charts-wrap" >
                  {data.map((item,i)=>(item.status==openNum&&<DaBiao key={i} value = {item} goNewPage={::this.goNewPage}/>))}
                </div>
            </div>
         </div>
      </div>
    )

  }

  tanchuangClose(){
    this.props.tanchuangClose()
  }
  openDaBiaoEn(id){
    this.setState({openNum:id})
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
