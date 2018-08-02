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
//import MyCharts from '../components/MyCharts'
import GeneralCharts from '../../common/components/GeneralCharts'
import {Form, Button,Dropdown, Input,Checkbox,Progress} from 'semantic-ui-react'
import SVGIDMap from './components/SVGMAPBYID'
import * as commonActions from '../../common/actions.js'
import {ToastContainer} from "react-toastr"
import Loading from '../../common/components/Loading'
import TanChuang from './components/TanChuang'
import moment from 'moment'

class GailanZonglan extends Component {
    constructor(props) {
        super(props)
        this.resizeWindow1=this.resizeWindow.bind(this)
        this.state = {
          jiancedata:{pagename:'jiance_zonglan',status:2,
               //工艺达标率 累计运行时间  达标运行时间
              d1:{data:[0.98,1031,1044],status:2},
              //工艺达标率
              d2:{data:[0,0,0,0,0,0,37,38,59,610],status:2},
              //健康达标率
              d3:{data:[0,0,0,0,0,0,17,8,99,630],status:2},
              //吨水能耗
              d4:{data:[0.34,0.21,0.72],status:2},
              //吨水能耗达标率
              d5:{data:[0,0,113,634,125,0,0,0,0,0],status:2},
              //吨钢水耗
              d6:{data:[35,32122,1233,43214],status:2},

              d7:{data:[1,1,1,1,1,1,1,1],status:2},

              //报警信息

          },
          pageRequest:{d8:{pageRequest:{column:"time",order:"desc",page:{pageNum:1,pageSize:5}}}},
          BodyStyle:{height: document.documentElement.clientHeight-80  +'px'},
          RightHeightStyle:{height: document.documentElement.clientHeight-150  +'px'},
          ChartsStyle:{height: (document.documentElement.clientHeight*0.2)  +'px'},
          TancengStyle:{height: document.documentElement.clientHeight-120  +'px'},
          tanchuang_type:'',
          tanceng:false,
          shuju:{
            xdata:[2,2,3,4,5,6,7,8,9,10,11,12],
            ydata0:[60,60,60,60,60,60,60,60,60,60,60,60],
            ydata1:[80,80,80,80,80,80,80,80,80,80,80,80],
            ydata2:[69,63,56,79,64,73,55,63,72,54,39,63],
            ydata3:[33,43,23,33,63,33,33,38,29,54,41,29],
            ydata4:[11,26,16,12,21,23,22,28,21,15,19,26],
            ydata5:[13,23,6,14,24,13,25,18,11,35,29,16],
          },

        }
    }

    render() {

        let  jiancedataS = this.state.jiancedata
        let  jiancedataP = this.props.jiancedata
        let jiancedata = jiancedataS
        let {BodyStyle,ChartsStyle,RightHeightStyle} = this.state
        //工艺达标率
        var daBiaoOption={
            title: {
                    text: jiancedata.d1.data[0]*100,
                    x: '39%',
                    y: '25%',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#73ecee',
                        fontSize:'36'
                    }
                },
              color:["#73ecee","#5c67e5","#00e099","#facc17"],
              itemWidth:8,
              legend: {
                orient : 'vertical',
                x : "48%",
                y : "58%",
                itemGap:2,
                itemWidth:0,
                textStyle:{
                        color:'#9ac5ec'
                    },
                data:["去年","今年"]
              },
              series:[{
                              name:"工艺达标率",
                              type:'pie',
                              radius: ['65%', '72.5%'],
                              center: ['50%','36%'],
                              labelShow:false,
                              hoverAnimation: false,
                              startAngle :-90,
                              itemStyle:{
                                normal: {
                                    label: {show:false},
                                    labelLine: {show:false}
                                }
                              },
                              data:[

                                      {value:jiancedata.d1.data[0]*100, name:'今年'},
                                      {value:100-jiancedata.d1.data[0]*100, name:'',
                                        itemStyle:{  normal : {
                                        color: 'rgba(0,0,0,0)',
                                        label: {show:false},
                                        labelLine: {show:false}
                                    }
                                  }}
                                   ]
                              },

                              {
                              name:"工艺达标率",
                              type:'pie',
                              radius: ['55%', '62.5%'],
                              center: ['50%','36%'],
                              labelShow:true,
                              hoverAnimation: false,
                              startAngle :-90,
                              itemStyle:{
                                normal: {
                                    label: {show:false},
                                    labelLine: {show:false}
                                }
                              },
                              data:[
                                      {value:jiancedata.d1.data[0]*100-10, name:'去年'},
                                      {value:100-jiancedata.d1.data[0]*100+10, name:'',
                                        itemStyle:{  normal : {
                                          color: 'rgba(0,0,0,0)',
                                          label: {show:false},
                                          labelLine: {show:false}
                                      }
                                    }}
                                   ]
                              }
                              ]

            };
         // 达标率分布
        // 达标率分布
        var daBiaoFbOption ={
            barWidth: 8,
            legend:{
                  show:false
                   },
            grid: ['20%','15%','5%','5%'],
            lineColors: ['white'], //可选
            xAxis: {name:"%",data:[10,20,30,40,50,60,70,80,90,100]},
            yAxis: {name:["小时"]},
            series:{
                      lines:[
                              {name:"达标时长",data:jiancedata.d2.data}
                           ]

                   }
          };
        //健康度分布
        var jianKangFbOption ={
            legend:{
                  show:false
                   },
            grid: ['20%','15%','5%','5%'],
            barColors:  [['#facc17','#facc17','#facc17'],['#677ee0','#677ee0','#677ee0'],['#FFD531','#FC9000','#F34E00']], //可选
            barWidth:8,
            xAxis: {name:"%",data:[10,20,30,40,50,60,70,80,90,100]},  //,data:[1,2,3,4,5,6,7]
            yAxis: {name:["小时"]},
            series:{
                      bars: [
                              {name:"时长",data:jiancedata.d3.data}
                            ]
                   }
          };
        //吨水能耗分布
        var dunShuiFbOption ={
            barWidth: 8,
            legend:{
                  show:false
                   },
            lineColors: ['white'], //可选
            grid: ['20%','15%','5%','5%'],
            xAxis: {name:"kWh/t",data:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]},
            yAxis: {name:["小时"]},
            series:{
                      lines:[
                              {name:"时长",data:jiancedata.d5.data,
                               markArea:
                                      {
                                          data: [

                                                 [{ itemStyle:{normal:{color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(0,224,153, 0)'},{offset: 1,color: 'rgba(0,224,153, 1)'} ])  }},
                                                      xAxis:0,
                                                      yAxis:0
                                                  },
                                                  {
                                                      xAxis:3,
                                                      yAxis:700
                                                  }],
                                                 [{ itemStyle:{normal:{color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(250,204,23, 0)'},{offset: 1,color: 'rgba(250,204,23, 1)'} ])  }},
                                                      xAxis:3,
                                                      yAxis:0
                                                  },
                                                  {
                                                      xAxis:6,
                                                      yAxis:700
                                                  }],
                                                  [{  itemStyle:{normal:{color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(92,103,229, 0)'},{offset: 1,color: 'rgba(92,103,229, 1)'} ])  }},
                                                      xAxis:6,
                                                      yAxis:0
                                                  },
                                                  {
                                                      xAxis:9,
                                                      yAxis:700
                                                  }]

                                                  ]
                                      }
                             }
                           ]
                   }
          };
        // const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}
        const BarsStyle={height: 25   +'px'}
        let svgpath = '/resources/zonglan.svg';
        let svgdata = []
        let xiaoxis = this.props.xiaoxis?this.props.xiaoxis.slice(0,3):[]


        return (
          <div className="gailanzonglan theBody" style={BodyStyle} >
            <ToastContainer ref="toastcontainer" className="toast-top-right"/>
            <div className="gailanzonglan-top">
                <h2>总览</h2>
                <span>更新时间: {moment().format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div className="gailanzonglan-body " style={RightHeightStyle}>
                <div className="gailanzonglan-left">
                    <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'dabiao')}>
                        <h3>工艺达标率 %</h3>
                        <div className="charts" >
                          <div className="charts-body">
                            <ReactEcharts  option={daBiaoOption}  style={ ChartsStyle}/>
                          </div>
                          <div className="charts-text" >
                            <div className={classNames({active:false})}></div>
                          <span>达标率98%，未达标泵组28-1</span>
                          </div>
                        </div>
                    </div>
                    <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'dabiao')} >
                      <h3>达标率分布</h3>
                      <ReactEcharts
                          option={GeneralCharts.theLineBar(daBiaoFbOption)}
                          style={ChartsStyle}  className="charts"/>
                    </div>
                    <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'jiankang')} >
                        <h3>健康度分布</h3>
                         <ReactEcharts
                          option={GeneralCharts.theLineBar(jianKangFbOption)}
                          style={ChartsStyle} className="charts"/>
                    </div>
                </div>
                <div className="gailanzonglan-center">

                    <div className="gailanzonglan-center-mid">
                      <SVGIDMap svg={svgpath}
                         width="95%" height="95%"
                         goNewPage = {::this.goNewPage}
                         data={jiancedata.d7.data}
                        id='svg-02'/>
                    </div>
                    <div className="gailanzonglan-center-bot">
                      <div className="gailanzonglan-center-bot-left">
                            {xiaoxis.map(item=>(<div className="xiaoxi-item" onClick={this.toXiaoXi.bind(this,item.messageTypeID)}>
                              <div className="xiaoxi-icon">{item.messageModelName}</div>
                              <div className="alarmText">
                                <div className="aTime">{item.messageSendTime}</div>
                              <div className="aMsg">{item.messageDesc}</div>
                              </div>
                            </div>))}
                      </div>
                      <div className="gailanzonglan-center-bot-center" ></div>
                      <div className="gailanzonglan-center-bot-right">
                          <div className="gongdan-body-1">
                              <div className="gongdan-item" onClick={this.tanchuangOpen.bind(this,'dabiao')}>
                                  <div className="icon dabiao-icon"></div>
                                <div className="item"><span>2<sub>/3</sub></span><h3>达标占比</h3></div>
                              </div>
                              <div className="gongdan-item" onClick={this.tanchuangOpen.bind(this,'jiedian')}>
                                  <div className="icon jiedian-icon"></div>
                                <div className="item"><span>20<sub>%</sub></span><h3>节电率</h3></div>
                              </div>
                              <div className="gongdan-item" onClick={this.tanchuangOpen.bind(this,'jiankang')}>
                                  <div className="icon jiankang-icon"></div>
                                <div className="item"><span>90<sub>%</sub></span><h3>健康度</h3></div>
                              </div>
                          </div>
                          <div className="gongdan-body-2" >
                              <div className="gongdan-item" onClick={this.tanchuangOpen.bind(this,'weiban')}>
                                  <div className="icon weiban-icon"></div>
                                <div className="item"><span>0</span><h3>报警未办</h3></div>
                              </div>
                              <div className="gongdan-item" onClick={this.tanchuangOpen.bind(this,'weibanshixiang')}>
                                  <div className="icon daiban-icon"></div>
                                <div className="item"><span>1</span><h3>待办事项</h3></div>
                              </div>
                              <div className="gongdan-item" onClick={this.tanchuangOpen.bind(this,'yibanshixiang')}>
                                  <div className="icon yiban-icon"></div>
                                <div className="item"><span>2</span><h3>办结事项</h3></div>
                              </div>
                          </div>
                      </div>

                    </div>
                </div>
                <div className="gailanzonglan-right">
                    <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'dunshui')}>
                        <h3>平均吨水能耗 KW·h/t</h3>
                        <div className="charts">
                            <ReactEcharts
                              option={::this.getGuangOption() }
                              style={ChartsStyle} className="charts-body"/>
                            <div className="charts-text">整体优化空间4.9%，优化后预计年节省电量19万kWh</div>
                       </div>
                    </div>
                    <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'dunshui')}>
                      <h3>吨水能耗分布</h3>
                      <ReactEcharts
                          option={GeneralCharts.theLineBar(dunShuiFbOption)}
                          style={ChartsStyle} className="charts"/>
                    </div>
                    <div className="gailanzonglan-left-panel contentDiv" >
                        <h3>吨钢耗新水量</h3>
                        <div className="panel-data" style={ChartsStyle}>
                              <div className="panel-data-top">5.6 m³/t</div>
                              <ReactEcharts
                                  option={::this.getBarOption()}
                                  style={BarsStyle} />
                              <div className="panel-data-bottom" >
                                  <div className="child-left" >
                                        <h3 >总用水</h3>
                                      <span>134432089 m³</span>
                                   </div>
                                   <div className="child-right">
                                        <div className="child-right-item-1">
                                            <h3>生产用水</h3>
                                          <span>134342898 m³</span>
                                        </div>
                                        <div className="child-right-item-2">
                                            <h3>生活用水</h3>
                                          <span>32898 m³</span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                    </div>
                </div>
            </div>

            {this.state.tanceng&&<TanChuang
              type={this.state.tanchuang_type}
              tanchuangClose={::this.tanchuangClose}
              TancengStyle={this.state.TancengStyle}

            />}

          </div>

        )
    }
    tanchuangOpen(type){
      this.setState({tanchuang_type:type,tanceng:true})
    }
    toXiaoXi(tab){
      switch(tab){
        case 3:
          browserHistory.push(`/bgp/pc/xiaoxi?project=yxbj`);
          break;
        case 4:
          browserHistory.push(`/bgp/pc/xiaoxi?project=nxzd`);
          break;
        case 5:
          browserHistory.push(`/bgp/pc/xiaoxi?project=gzzd`);
          break;
        default:
          browserHistory.push(`/bgp/pc/xiaoxi?project=dbtx`);
          break;

      }
    }
    tanchuangClose(){
      this.setState({tanceng:false})

    }
   getGuangOption(){
     const {jiancedata} = this.state
      let angle = [210, -30],
          splitNum = 10,
          baseVal = 0.7,//jiancedata.d4.data[0],
          bestVal = 0.3,////jiancedata.d4.data[1],
          curVal = 0.38,//jiancedata.d4.data[2],
          radius=80,
          center=["50%","45%"];
      var option = {
          tooltip: {
              show: false,
          },
          series: [
            {
              name:'最外层渐变色',
              z: 3,
              type: "gauge",
              center:center,
              radius :radius+'%',
              min: 0,
              max: 1,
              startAngle: angle[0],
              endAngle: angle[1],
              splitNumber: splitNum*10,
              axisLine: {
                  lineStyle: {
                    color: [
                            [
                              bestVal, new echarts.graphic.LinearGradient(
                              0, 0, 1, 0, [{
                              offset: 0,
                              color: '#00e099'
                            },
                              {
                                offset: 1,
                                color: '#facc17'
                              }
                            ]
                              )
                            ],
                            [
                              baseVal, new echarts.graphic.LinearGradient(
                              0, 0, 1, 0, [{
                              offset: 0,
                              color: '#facc17'
                            },
                              {
                                offset: 1,
                                color: '#5c67e5'
                              }
                            ]
                              )
                            ],
                            [
                              1, '#5c67e5'
                            ]
                          ],

                      width: 5
                  }
              },
              axisTick: {
                  lineStyle: {
                      color: "",
                      width: 2
                  },
                  length: 0,
                  splitNumber: 1
              },
              axisLabel: {
                  distance: -46,
                  formatter: function(v) {
                      if ( v == bestVal) return "最优值";
                      if ( v == baseVal) return '基准值';
                      //else if(v==alertVal) return ''
                  },
                  textStyle: {
                      color: "#a3cff6",
                        fontSize:12
                  }
              },
              splitLine: {
                  show: true,
                  length: 10,
                  lineStyle: {
                      color: 'transparent',
                      width: 2
                  }
              },
              itemStyle: {
                  normal: {
                      color: "#fff",
                      shadowBlur: 10
                  }
              },
              detail: {
                formatter: "{value}",
                offsetCenter: ["0", "38%"],
                textStyle: {
                    fontSize: 24,
                    color: "#a3cff6"
                }
             },
              title: {
                  show: false
              },
              pointer: {
                  show:true,
                  width:1,
              },
              data: [{
                  name: "",
                  value: curVal
              }]
          },
           {
              name: "中文名称层",
              type: "gauge",
              min: 0,
              max: 1,
              z:4,
              center:center,
              radius :radius+'%',
              startAngle: angle[0],
              endAngle: angle[1],
              splitNumber: splitNum*10,
              axisLine: {
                  lineStyle: {
                      color: [
                          [1, "transparent"]
                      ],
                      width: 8
                  }
              },
              axisTick: {
                  lineStyle: {
                      color: "transparent",
                      width: 2
                  },
                  length: 0,
                  splitNumber: 1
              },
              axisLabel: {
                  distance: -25,
                  formatter: function(v) {
                    if ( v == bestVal) return "{a|}";
                    if ( v == baseVal) return '{b|}';
                      //else if(v==alertVal) return ''
                  },
                  rich: {
                      a: {
                        backgroundColor: {
                              image: require('./styles/img/shuidib.png'),
                              rotation:180,

                          },
                          height: 25,
                          width:25,
                      },
                      b: {
                        backgroundColor: {
                              image: require('./styles/img/shuidi.png')
                          },
                          height: 25,
                          width:25
                      },

                      },
                  textStyle: {
                      color: "#fb5310",
                      fontSize:12,
                      fontWeight: "4000"
                  }
              },
              splitLine: {
                  show: true,
                  length: 10,
                  lineStyle: {
                      color: 'transparent',
                      width: 2
                  }
              },
              itemStyle: {
                  normal: {
                      color: "transparent"
                  }
              },
              pointer: {
                  length: 0
              },
              detail: {
                  show: false
              },
              title: {
                  show: false
              },
              data: [{
                  name: "",
                  value: ''
              }]
          }, {
              name: "内环仪表盘四段颜色",
              type: "gauge",
              min: 0,
              max: 1,
              center:center,
              radius :radius-5+'%',
              startAngle: angle[0],
              endAngle: angle[1],
              splitNumber: splitNum*3,
              axisLine: {
                  lineStyle: {
                    color: [
                            [
                              bestVal, new echarts.graphic.LinearGradient(
                              0, 0, 1, 0, [{
                              offset: 0,
                              color: '#00e099'
                            },
                              {
                                offset: 1,
                                color: '#facc17'
                              }
                            ]
                              )
                            ],
                            [
                              baseVal, new echarts.graphic.LinearGradient(
                              0, 0, 1, 0, [{
                              offset: 0,
                              color: '#facc17'
                            },
                              {
                                offset: 1,
                                color: '#5c67e5'
                              }
                            ]
                              )
                            ],
                            [
                              1, '#5c67e5'
                            ]
                          ],
                      width: 5
                  }
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  distance: 5,
                  formatter: function(v) {
                    if ( v == 0) return "{a|0}";
                    if ( v == 1) return '{b|1}';
                      //else if(v==alertVal) return ''
                  },
                  textStyle: {
                      color: "#a3cff6",
                        fontSize:12
                  },
                  rich:{
                    a:{
                      color: '#00e099'
                    },
                    b:{
                      color: '#5c67e5'
                    }
                  }
              },
              splitLine: {
                  show: true,
                  length: 8,
                  lineStyle: {
                      color: '#23458b',
                      width: 3
                  }
              },
              itemStyle: {
                  normal: {
                      color: "transparent"
                  }
              },
              pointer: { //仪表盘指针
                  length: '0',
              },

              detail: {
                  show:false
              },
              title: {
                  show: false
              },
              data: [{
                  name: "",
                  value: ''
              }]
          }]
      }
      return option
    }
   getBarOption(){
    let data = 5.6
    let max = 10
    let serise = []
    let arrays = new Array(10).fill(1)
    arrays.forEach((item,i)=>{
      serise.push({
        type: 'bar',
        stack:"one",
        barWidth: '15',
        itemStyle: {
          normal: {
            color: data>i*1?'#73ecee':'#084277',
            borderColor :"transparent"
          }
        },
        data: [8]
      }
      )
      serise.push(
        {
          type: 'bar',
          stack:"one",
          barWidth: '15',
          itemStyle: {
            normal: {
              color: 'transparent',
              borderColor :"transparent"
            }
          },
          data: [2]
        }
      )
    })
      let option = {
    		tooltip: {
    			trigger: 'axis'
    		},
    		grid: {
    			show: false,
    			zlevel: 0,
    			z: 2,
    			left: "5%",
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
            show:false,
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
    		series: serise
    	}
      return option
    }
    goNewPage(pumpGroup){
      browserHistory.push(`/bgp/pc/gailan/bengzu?groupid=${pumpGroup}`);
    }


    componentWillReceiveProps(nextProps) {
     const {jiancedata}=this.state

     let {pagename} = jiancedata
     if(nextProps.jiancedata.pagename&&pagename==nextProps.jiancedata.pagename){
     // if (nextProps.jiancestatus == 0 && nextProps.jiancemsg) {
     //   this.refs.toastcontainer.error(`${nextProps.jiancemsg}`, ``, {
     //     timeOut: 2000,
     //     closeButton: true
     //   })
     // } else if (nextProps.jiancestatus == 1 && nextProps.jiancemsg) {
     //   this.refs.toastcontainer.success(`${nextProps.jiancemsg}`, ``, {
     //     timeOut: 2000,
     //     closeButton: true
     //   })
     // } else if (nextProps.jiancestatus == 2 && nextProps.jiancemsg) {
     //   this.refs.toastcontainer.info(`${nextProps.jiancemsg}`, ``, {
     //     timeOut: 1000,
     //     closeButton: true
     //   })
     // }
     // if (this.props.location.query.projectname != nextProps.location.query.projectname) {
     //   const {data} = nextProps
     //    this.initPage(nextProps,data)
     // }
     //
     let {jiancedata} = nextProps

     // this.setState({jiancedata:nextProps.jiancedata})
   }

   }

   async  initPage(p,data){
      const {getPageConf,getPageData} =p
      let {pageRequest} = this.state

      let {pagename} = data
      await getPageConf(pagename,data)
      await getPageData(pagename,data,pageRequest)
   }

   async  getNewPageData(pagename,data){
      const {getPageConf,getPageData} = this.props

      await getPageConf(pagename,data)
      await getPageData(pagename,data)
   }



   componentWillMount(){
     let {jiancedata} = this.state
     // this.initPage(this.props,jiancedata)

   }
   resizeWindow(){
       let BodyStyle={height: document.documentElement.clientHeight-80  +'px'}
       let ChartsStyle={height: (document.documentElement.clientHeight*0.20)  +'px'}
       let RightHeightStyle={height: document.documentElement.clientHeight-150  +'px'}
       this.setState({BodyStyle:BodyStyle,ChartsStyle:ChartsStyle,RightHeightStyle:RightHeightStyle})
   }
   componentDidMount() {
      window.addEventListener('resize', this.resizeWindow1)
    }
    componentWillUnmount() {
       window.removeEventListener('resize', this.resizeWindow1)
    }

}


function mapDispatchToProps (dispatch) {
        return bindActionCreators({...commonActions,...actions}, dispatch);
    };
export default connect(state => state.gailanzonglan, mapDispatchToProps)(GailanZonglan);
