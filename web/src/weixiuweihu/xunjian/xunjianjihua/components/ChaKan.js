
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import _ from 'lodash'
import {Form, Button,Dropdown, Input,Checkbox,Grid} from 'semantic-ui-react'
import { DateField,DatePicker } from 'react-date-picker'
import moment from 'moment'
import '../styles/index.styl'
export default class Chakan extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    const xunjiandan = this.props.xunjiandan;
    var bengzhanhj = [];//[{"val": 0,"name": "temprature","type": "double","desc": "环境温度(℃)"}]
    var shebeidata = [];//[{'head':'101#水泵','body':body}]
    var body = [];//[{"val": "未填写","name": "pressOut","type": "double","desc": "出口压力(Mpa)"}]
    xunjiandan.forEach((item,i)=>{
      item.forEach((item2=>{
        if(item2.type=='title'&&item2.name=='泵站环境'){
          bengzhanhj = item
        }
      }))
    });
    for(var i=0;i<xunjiandan.length;i++){
      var xjd = xunjiandan[i];
      var shebeiName = '';
      var shebeiBody = [];
      for(var j=0;j<xjd.length;j++){
        var item = xjd[j];
        if(shebeiName!=''){
          shebeiBody.push(item);
        }
        if(item.type=='title'&&item.name!='泵站环境'){
          shebeiName = item.name;
          continue;
        }
      }
      if(shebeiName!=''){
        shebeidata.push({head:shebeiName,body:shebeiBody});
      }
    }
    bengzhanhj.forEach((item,i)=>{
      if(item.type=='title'){
        bengzhanhj.splice(i,1);
      }
    });
    return(
      <div className="gongdan-modal gongdan-chakan">
        <div className="chakan_container">
          <div className="fix chakan_title">
            <span>巡检单：{this.props.stationName} {this.props.planTime}</span>
            <div className="chakan_title_btns">
            <span onClick={this.onChakanN.bind(this)}>返回</span></div>
          </div>

          <div className="chakan_item">
            <span>泵站环境</span>
            <div className="chakan_item_con fix">
              <div className="w_3" style={{display:'none'}}>
                <span className="w_3_span1">巡检时间:</span><span>2018-02-12 09:00</span>
              </div>
              <div className="w_3" style={{display:'none'}}>
                <span className="w_3_span1">巡检人:</span><span>张华</span>
              </div>
              {bengzhanhj.map((item,i)=>{
                return (
                  <div className="w_3" key={i}>
                    <span className="w_3_span1">{item.desc}:</span><span>{item.val}</span>
                  </div>
                )
              })}

            </div>
          </div>
          {shebeidata.map((item,i)=>{
            return (
              <div className="chakan_item" key={i}>
                <span>{item.head}</span>
                <div className="chakan_item_con fix">
                  {item.body.map((item2,j)=>{
                    return (
                      <div className="w_3" key={j}>
                        <span className="w_3_span1">{item2.desc}:</span><span>{item2.val}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )

  }


  onChakanN(){
    this.props.onChakanN()
  }
  componentWillMount(){

  }

}
