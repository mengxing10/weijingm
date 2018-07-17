
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import '../styles/index.styl'
import ShiXiang from './ShiXiang'

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
    let {done} = this.props
    let data =[
        {name:"28-203",id:"28-203",tz:'wx',status:true,data:[
          {status:true,title:"维修派单",name:"王一川",time:"2018年7月11日 10:27:03"},
          {status:true,title:"接单",name:"王毅",time:"2018年7月11日 12:10:21"},
          {status:true,title:"反馈",name:"王毅",time:"2018年7月12日 10:54:00"},
          {status:true,title:"验收",name:"王一川",time:"2018年7月12日 10:30:05"},
      ]},
        {name:"28-204",id:"28-204",tz:'byang',status:true,data:[
          {status:true,title:"保养派单",name:"张宏伟",time:"2018年7月12日 09:30:32"},
          {status:true,title:"接单",name:"赵风云",time:"2018年7月12日 10:20:02"},
          {status:true,title:"反馈",name:"赵风云",time:"2018年7月12日 12:31:01"},
          {status:true,title:"验收",name:"张宏伟",time:"2018年7月12日 13:30:54"},
        ]},
        {name:"28-204",id:"28-204",tz:'byang',status:false,data:[
          {status:true,title:"保养派单",name:"张宏伟",time:"2018年7月12日 19:30:30"},
          {status:true,title:"接单",name:"赵风云",time:"2018年7月13日 08:00:21"},
          {status:false,title:"反馈",name:"",time:""},
          {status:false,title:"验收",name:"",time:""},
        ]},


    ]

    return(
      <div className="tcpanel">
        <div className="tc_bg"></div>
        <div className="tc_wrap" style={this.props.TancengStyle}>
            <div className="tc_title">
                <h3>工单进度</h3><i className="close_icon" onClick={::this.tanchuangClose}></i>
            </div>
            <div className='tc_wrap_body'>
              <div className="charts-wrap" >
                  {data.map((item,i)=>(done==item.status&&<ShiXiang
                    key={i}  goNewPage={::this.goNewPage}
                    svgId={`svg_shixiang_${i}`} data={item}/>))}
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
    browserHistory.push(`/bgp/pc/weixiuwh/gongdan?project=${pumpGroup}`);
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
