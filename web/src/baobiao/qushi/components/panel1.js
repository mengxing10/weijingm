/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * @file Setpasswd component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
//import MyCharts from '../../../common/components/MyCharts'
import GeneralCharts from '../../../common/components/GeneralCharts'
import classNames from 'classnames'

import '../styles/index.styl'
export default class AddDevice extends Component {

    constructor(props) {
        super(props)
        this.state = {
          timeType:"q",
        }
    }

    render() {
      const {timeType} = this.state
      const {data} = this.props
      let jienenglv=data.jienenglv//{val:78,bfl:78,tName:"节能率",danwei:"%"}
      let title =data.title//"项目"
      let shouyi =data.shouyi//"项目"

 
      var deviceData =
            { title:"节能量/作业率",     
              legend:{left:'center'},                                            
              lineColors: ['#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选 '#FF6200', 
              barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
              xAxis: {name:"Q",data:["2017年1期","2017年2期","2017年3期","2017年4期","2018年1期","2018年2期","2018年3期"]},
              yAxis: {name:["kWh","%"]},
              series:{              
                        lines:[
                                {name:"作业率",yAxisIndex:1,data:[73,53,62,64,64,73,65].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                                //{name:"总吨水能耗",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}
                             ],
                        bars: [
                                {name:"节能量",yAxisIndex:0,data:[123,223,223,323,423,253,230].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}
                                 
                             ]
                     }
            };

        return (
          <div className="panel-qushi contentDiv2">
              <div className="panel-shouyi">
                <h3 className="labStyle">{title}</h3>
                <div className="shouyi labStyle">
                  <span>总节能收益</span>
                  <div className="value">
                    <dt>￥</dt>
                    <span>{shouyi}</span>
                  </div>
                </div>
              </div>
              <div className="panel-jienenglv">
                <ReactEcharts
                    option={GeneralCharts.theRing(jienenglv)}
                    style={{width: '100%', height: '70%'}}
                    className='tab-2' />
                <span>节能率</span>
                </div>
                <div className="panel-quxian">
                <div className="quxian-zhouqi">
                  <span className={classNames({active:timeType=="q"})} onClick={this.setTimetype.bind(this,"q")}>季度</span>
                  <span className={classNames({active:timeType=="m"})} onClick={this.setTimetype.bind(this,"m")}>月份</span>
                </div>
                <ReactEcharts
                    //option={MyCharts.BaseLineAndBarAndTwoY(jienenglv)}
                    option={GeneralCharts.theLineBar(deviceData)}
                    style={{width: '100%', height: '70%'}}
                    className='tab-2'/>
                 {/*<span>节能量/作业率</span>*/} 

                </div>
          </div>


        )
    }

setTimetype(id){this.setState({timeType:id})}




}
