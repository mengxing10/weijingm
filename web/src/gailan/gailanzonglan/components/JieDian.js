
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import _ from 'lodash'
import '../styles/tcdunshui.styl'
import GeneralCharts from '../../../common/components/GeneralCharts'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
export default class JieDian extends Component {

  constructor(props) {
      super(props)
      this.state={

      }

  }

  render() {
    let title = "28-2组泵"
    var daBiaoFbOption ={
        barWidth: 8,
        legend:{
              show:false,
               },
        lineColors: ['white'], //可选
        xAxis: {name:"%",data:[10,20,30,40,50,60,70,80,90,100]},
        yAxis: {name:["小时"]},
        series:{
                  lines:[
                          {name:"达标时长",data:[2,3,1,2,3,4,5,5,6,6,7]}
                       ]

               }
      };
    return (
      <div className="dunshui-panel">
      <h3>28-2组泵</h3>
      <div className="charts-body">
        <ReactEcharts
            option={GeneralCharts.theLineBar(daBiaoFbOption)}
            style={{width:"100%",height:"100%"}}  className="charts"/>
      </div>
      <div className="charts-text">
        <h3>运行建议</h3>
        <p></p>
      </div>



    </div>

    )



  }
}
