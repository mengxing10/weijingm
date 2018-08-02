/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { DateField,DatePicker } from 'react-date-picker'
import moment from 'moment'
import {Popup, Dropdown} from 'semantic-ui-react'

//import MyCharts from '../components/MyCharts'
import GeneralCharts from '../../common/components/GeneralCharts'

class Bengzhan extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)

        this.state = {

          startDate:  moment().add(-1,"day"),
          endDate: moment(),
          typeId:location.pathname.split('/')[4]

        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
      const options = [
        {
          key: '小时数据',
          text: '小时数据',
          value: 'xiaoshi',
        },
        {
          key: '逐日数据',
          text: '逐日数据',
          value: 'ri',
        },
        {
          key: '逐月数据',
          text: '逐月数据',
          value: 'yue',
        },


      ]

        let {typeId} =  this.state
        let paiming = "吨水能耗排名"
        let {project} = this.props.location.query
        var xiaolvData =
         {
           legend:{left:'center'},
           lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
           barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
           xAxis: {name:"月",data:[1,2,3,4,5,6,7,8,9,10,11,12]},
           yAxis: {name:["%"]},
           series:{
                     lines:[
                             {name:"水泵效率",yAxisIndex:0,data:[80,80,80,80,80,80,80].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          ],
                     bars: [

                          ]
                  }
         };
         var shuiLiangData =
          {
            legend:{left:'center'},
            lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
            barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
            xAxis: {name:"月",data:[1,2,3,4,5,6,7,8,9,10,11,12]},
            yAxis: {name:["m3"]},
            series:{
                      lines:[
                              {name:"输水量",yAxisIndex:0,data:[6430,6430,6430,6430,6430,6430,6430].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                           ],
                      bars: [

                           ]
                   }
          };
          var dianLiangData =
           {
             legend:{left:'center'},
             lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
             barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
             xAxis: {name:"月",data:[1,2,3,4,5,6,7,8,9,10,11,12]},
             yAxis: {name:["kW·h"]},
             series:{
                       lines:[
                               {name:"耗电量",yAxisIndex:0,data:[5210,5210,5210,5210,5210,5210,5210].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                            ],
                       bars: [

                            ]
                    }
           };

      const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}



        return (
          <div className="bengzhanfenxi theBody" style={BodyStyle}>
            <div className="bengzhanfenxi-top">
              <div className="query-data">
              <Dropdown placeholder='数据选择' fluid  selection  options={options}
                value = "xiaoshi"/>
              </div>
              <div className="query-condition">

                  <label>日期</label>
                      <DateField
                          dateFormat="YYYY-MM-DD"
                          locale="zh-cn"
                          forceValidDate={true}
                          updateOnDateClick={true}
                          // defaultValue={1495031479774}
                          value={this.state.startDate}
                          onChange={::this.handleChangeStart}
                          >
                          <DatePicker
                              navigation={true}
                              locale="zh-cn"
                              forceValidDate={true}
                              highlightWeekends={true}
                              highlightToday={true}
                              weekNumbers={true}
                              weekStartDay={0}
                              footer={false}
                              />
                      </DateField>
                      <label>至</label>
                        <DateField
                        dateFormat="YYYY-MM-DD"
                        locale="zh-cn"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        // defaultValue={1495031479774}
                        value={this.state.endDate}
                        onChange={::this.handleChangeEnd}
                        >
                        <DatePicker
                            navigation={true}
                            locale="zh-cn"
                            forceValidDate={true}
                            highlightWeekends={true}
                            highlightToday={true}
                            weekNumbers={true}
                            weekStartDay={0}
                            footer={false}
                            />
                    </DateField>
              </div>
              <div className="query-btn">生成报表</div>
            </div>
            <div className="bengzhanfenxi-wrap">
            <div className="bengzhanfenxi-left">
              <div className="left-top-panel">
                <div className="item">
                  <h3>耗电量</h3>
                  <span>32456kWh</span>
                </div>
                <div className="item">
                  <h3>输水量</h3>
                <span>132456m3</span>
                </div>
                <div className="item">
                  <h3>吨水能耗</h3>
                <span>0.343kWh/m3</span>
                </div>
                <div className="item">
                  <h3>节电率</h3>
                <span>34.1%</span>
                </div>
              </div>
              <div className="left-middle-panel">
                <h3>吨水能耗</h3>

              <ReactEcharts option={GeneralCharts.theLineBar(xiaolvData)} style={{height:"220px" ,width:"100%"}} className='div1'/>
            </div>
              <div className="left-bottom-panel">
                <div className="right-panel">
                  <h3>能耗</h3>
                <ReactEcharts option={GeneralCharts.theLineBar(dianLiangData)} style={{height:"220px" ,width:"100%"}} className='div1'/>
              </div>
                <div className="left-panel">
                  <h3>输水量</h3>

                <ReactEcharts option={GeneralCharts.theLineBar(shuiLiangData)} style={{height:"220px" ,width:"100%"}} className='div1'/>
              </div>

              </div>

            </div>
              <div className="bengzhanfenxi-right">
                <h3 className="title">{paiming}</h3>
                <div className="right-panel-wrap">
                {
                  [1].map(item=>(
                    <div className="panel-item">
                      <i>{item}</i>
                    <h3>{project=="all"?"28/38泵站":"2组"}</h3>
                      <div>
                        <ReactEcharts ref={item.datatype}
                          option={::this.getBarOption()}
                          style={{width: '100%', height: '100%'}}
                        />


                      </div>
                      <span>{project=="all"?"0.38 kWh/t":"0.22 kWh/t"}</span>
                    </div>
                  ))
                }
                </div>
            </div>
          </div>



          </div>

        )
    }



    handleChangeStart(dateString, { dateMoment, timestamp}) {
        const{infos,endDate} = this.state
                if (dateMoment.toDate().getTime() > this.state.endDate.toDate().getTime()) {
                    this.setState({
                        startDate: this.state.endDate,
                        endDate: dateMoment
                    })
                }
                else {
                    this.setState({
                        startDate: dateMoment,
                    })
                }
                this.getAllCurves(infos,dateMoment,endDate)
            }
    handleChangeEnd(dateString, { dateMoment, timestamp}) {
            const{infos,startDate} = this.state
                if (dateMoment.toDate().getTime() < this.state.startDate.toDate().getTime()) {
                    this.setState({
                        startDate: dateMoment,
                        endDate: this.state.startDate
                    })
                }
                else {
                    this.setState({
                        endDate: dateMoment,
                    })
                }

                this.getAllCurves(infos,startDate,dateMoment)
            }




timeChange(t){

  this.setState({time:t})
}
getBarOption(){
  var rate = [0.18]
  let option = {
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			show: false,
			zlevel: 0,
			z: 2,
			left: "-0%",
			top: "20%",
			right: 10,
			bottom: 10,

		},
		tooltip: {
			show: false
		},
		xAxis: {
			type: 'value',
			axisLabel: {
				inside: false,
				textStyle: {
					color: '#fff'
				}
			},
			max:100,
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			type: 'category',
      data: [],
			axisLabel: {
				show: false,
				inside: false,
				textStyle: {
					color: '#fff'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			z: 10
		},
		series: [{
			name: '',
			type: 'bar',
			barWidth: '10',
			itemStyle: {
				normal: {
					barBorderRadius: 5,
					shadowBlur: 10,
					shadowColor: '#111',
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 0,
						color: '#cd250c'
					}, {
						offset: 0.5,
						color: '#4C9BB0'
					}, {
						offset: 1,
						color: '#16c627'
					}])
				}
			},
			data: [100]
		}, {
			name: '',
			type: 'line',
			symbol: 'triangle',
			symbolSize: 12,
			itemStyle: {
				normal: {
					barBorderRadius: 5,
					shadowBlur: 10,
					shadowColor: '#111',
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 0,
						color: '#CABB49'
					}, {
						offset: 0.5,
						color: '#CABB49'
					}, {
						offset: 1,
						color: '#CABB49'
					}]),
					label: {
						show: false,
					}
				}
			},
			data: [76]
		}]
	}
  return option
}





   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {

   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => null, mapDispatchToProps)(Bengzhan);
