/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from 'moment'
import {
  Button,
  Input,
  Icon,
  Divider,
  Popup,
  Dropdown,
  Tab
} from 'semantic-ui-react'
import classNames from 'classnames'
import EditTable from '../../common/components/EditTable'
import Pager from '../../common/components/Pager'
import CsvFetch from '../../common/components/CsvFetch'
import {DateField, DatePicker, MonthView, Calendar, YearView} from 'react-date-picker'
import * as actions from './actions.js'
import './styles/index.styl'
import Menu from '../../common/components/Menus'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import GeneralCharts from '../../common/components/GeneralCharts'

class Dabiao extends Component {

  constructor(props) {
    super(props)
this.selectDevices ={};
    this.deviceFilter = '';
    this.projectid = 1;
    this.project = "dianji";
    this.state = {
      levelId:4,
      currentLegend: {},
      currentProject: {},
      addmnitem: false,
      startDate: moment("2017-01-01"),
      endDate: moment().add(1, 'd'),
      isOpened: false,
      deviceFilter: ''
    }
  }

  // 根据type + query
  // type决定title

  // type + query决定table数据
  render() {

    var startDate = moment("2017-01-01");
    var endDate = moment().add(1, 'd');
    var ss = this;
    const EventsDict = {
      click: function(data, echart) {
        ss.addData(data);
      },
      legendselectchanged: function() {}
    };
    const options = [
      {
        key: '实时数据',
        text: '实时数据',
        value: 'shishi',
      },
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

       // var deviceDatas= [];
       // for(var i=0;i<2;i++)
       //  {
       //     var deviceData =
       //      {
       //        legend:{left:'center'},
       //        lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
       //        barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
       //        xAxis: {name:"月",data:[1,2,3,4,5,6,7,8,9,10,11,12]},
       //        yAxis: {name:["%"]},
       //        series:{
       //                  lines:[
       //                          {name:"水泵效率",yAxisIndex:0,data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
       //                       ],
       //                  bars: [

       //                       ]
       //               }
       //      };
       //      deviceDatas.push(deviceData);
       //  }



           var DaBiaoLvOption = {
          //scatterColors: ['#facc17', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
          //lineColors: ["#2c8cf9","#00e099","#facc17","#5c67e5"],
          grid: ['20%','15%','5%','5%'],
          scatterColors: ["#73eecc","#00e099","#facc17","#5c67e5"],
          xAxis: {name:"m³/h",data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
          yAxis: {name:["P/pa"]},
          series: {
                  scatters:[
                     {
                      name:'故障',
                     // symbolSize: 20,
                      //itemStyle:{color:'#73eecc'},
                      data:
                      [
                          [10.0, 8.04],
                          [8.0, 6.95],
                          [13.0, 7.58],
                          [9.0, 8.81],
                          [11.0, 8.33],
                          [14.0, 9.96],
                          [6.0, 7.24],
                          [4.0, 4.26],
                          [12.0, 10.84],
                          [7.0, 4.82],
                          [5.0, 5.68]
                      ],
                      //type: 'scatter',
                      markArea:
                      {
                          itemStyle:{normal:{color:'rgba(252, 243, 170, 0.39)'}},
                          data: [[{
                                      xAxis:6,
                                      yAxis:5
                                  },
                                  {
                                      xAxis:12,
                                      yAxis:10
                                  }]]
                      }
                   }]
         }
      };



      var DaBiaoLvOption2 = {
      
                grid: ['20%','15%','25%','5%'],
                scatterColors: ["#73eecc","#00e099","#facc17","#5c67e5"],
                xAxis: {name:"m³/h",data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
                yAxis: {name:["P/pa"]},
                series: {}
            };


       var   baseOption =  GeneralCharts.theLineBar( DaBiaoLvOption2 );

      baseOption.timeline= {
                                loop: false,   
                                y:170,     
                                axisType: 'category',
                                show: true,
                                autoPlay: true,
                                playInterval: 1000,
                                lineStyle:{color:'white'},
                                label:{color:'white'},

                                data: ['2016', '2017', '2018']
                              };


     var  DaBiaoLvOption3 = {};
     DaBiaoLvOption3.baseOption =  baseOption;

     DaBiaoLvOption3.options = [
              
              {
              series:[{
                      name:'故障',
                     // symbolSize: 20,
                      //itemStyle:{color:'#73eecc'},
                      data:
                      [
                          [10.0, 8.04],
                          [8.0, 6.95],
                          [13.0, 7.58],
                          [9.0, 8.81],
                          [11.0, 8.33],
                          [14.0, 9.96],
                          [6.0, 7.24],
                          [4.0, 4.26],
                          [12.0, 10.84],
                          [7.0, 4.82],
                          [5.0, 5.68]
                      ],
                      type: 'scatter',
                      markArea:
                      {
                          itemStyle:{normal:{color:'rgba(252, 243, 170, 0.39)'}},
                          data: [[{
                                      xAxis:6,
                                      yAxis:5
                                  },
                                  {
                                      xAxis:12,
                                      yAxis:10
                                  }]]
                      }
                   }]},

             {
              series:[{
                      name:'故障',
                     // symbolSize: 20,
                      //itemStyle:{color:'#73eecc'},
                      data:
                      [
                          [10.0, 9.04],
                          [8.0, 6.95],
                          [6.0, 7.58],
                          [9.0, 8.81],
                          [11.0, 6.33],
                          [14.0, 9.96],
                          [6.0, 7.24],
                          [14.0, 5.26],
                          [8.0, 10.84],
                          [7.0, 8.82],
                          [5.0, 7.68]
                      ],
                      type: 'scatter',
                      markArea:
                      {
                          itemStyle:{normal:{color:'rgba(252, 243, 170, 0.39)'}},
                          data: [[{
                                      xAxis:4,
                                      yAxis:5
                                  },
                                  {
                                      xAxis:10,
                                      yAxis:10
                                  }]]
                      }
                   }]},


                                 {
              series:[{
                      name:'故障',
                     // symbolSize: 20,
                      //itemStyle:{color:'#73eecc'},
                      data:
                      [
                          [4.0, 6.04],
                          [8.0, 8.95],
                          [4.0, 9.58],
                          [9.0, 8.81],
                          [11.0, 8.33],
                          [7.0, 9.96],
                          [6.0, 7.24],
                          [14.0, 4.26],
                          [6.0, 10.84],
                          [7.0, 9.82],
                          [5.0, 6.68]
                      ],
                      type: 'scatter',
                      markArea:
                      {
                          itemStyle:{normal:{color:'rgba(252, 243, 170, 0.39)'}},
                          data: [[{
                                      xAxis:2,
                                      yAxis:3
                                  },
                                  {
                                      xAxis:8,
                                      yAxis:8
                                  }]]
                      }
                   }]}



            ];




        var shuibengs = {4:["101#水泵","102#水泵"],3:["103#水泵","104#水泵"],2:["201#水泵","202#水泵"],1:["203#水泵","204#水泵"]};

        this.selectDevices = shuibengs;
        const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}



    return (<div className='dabiaofenxi theBody' style={BodyStyle}>
      <div className="shuibengfenxi-top">
        <div className="query-data">
        <Dropdown placeholder='数据选择' fluid  selection  options={options}
          value = "shishi"/>
        </div>
        <div className="query-condition">

            <label>日期</label>
                <DateField
                    dateFormat="YYYY-MM-DD HH:mm:ss"
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
                  dateFormat="YYYY-MM-DD HH:mm:ss"
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

       <div className="charts-wrap" >
            <div className="left-charts" >
                <h3 className="charts-title">201水泵</h3>
              <div className="charts-body">
                  <ReactEcharts option={  DaBiaoLvOption3  } style={{height:"220px" ,width:"100%"}} className='div1'/>
                </div>
            </div>
            <div className="right-charts">
              <h3>运行统计</h3>
            <div className="tongji">
                {[1,2,3,4,5,6].map(item=>(<div className="tongji-item">
                  <h3>{item}</h3>
                  <span>故障次数</span>
              </div>))}
              </div>
            </div>
      </div>



    </div>)
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

selectLevel(levelId)
{
  this.setState({levelId: levelId});
}


  linkto(idx)
  {
    // browserHistory.push('/bgp/pc/jiankang/shuibeng')
   // this.setState({currentProject:  this.project})
     var deviceName = this.selectDevices[this.state.levelId][idx] ;
    this.setState({currentProject: {projectId:this.project,deviceName:deviceName}})

    const me = this;
    me.refs.adddevice && me.refs.adddevice.show()
  }

  /*
  MoreLineBar(alldata) {

    let data = alldata.data //{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let x = alldata.x //[1,2,3,4,5,6,7]; ,8,9,10,11,12
    let axis = alldata.axis //{y:"℃",x:"h",title:""}
    let legenddata = alldata.legenddata
    return {
      title: {
        text: '', // axis.title,
        padding: [
          10, 10, 10, 20
        ],
        textStyle: {
          color: "#fff",
          fontSize: 16
        }
      },
      textStyle: {
        fontSize: 14
      },
      //color:['#2dc8e5','#0ddfb4','#eefa48'],
      //color:['#2c8cf9','#f8910c','#84d5d8'], #FF6200
      color: [
        '#FF6200', '#FFEE2B', '#84d5d8', 'green'
      ],
      // tooltip: {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b} : {c} ({d}%)"
      // },
      "legend": {
        orient: 'horizontal',//'vertical',
        //left: 'right',
        top:'top',
	      width:'auto',
       // padding: 20,
        //icon: 'circle',
        data: legenddata,
        textStyle: {
          color: '#6597F5',
          fontSize: 12
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        formatter: '{b0}' + axis.x + '<br/>{a0}: {c0} ' + '<br />{a1}: {c1} ' + '<br />{a2}: {c2} '+'<br />{a3}: {c3}'
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '5%',
        top: '25%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: x,
        name: axis.x,
        nameTextStyle: {
          color: '#4c99e6',//'#21b5d5'
        },
        axisLine: {
          lineStyle: {
            show: true,
            color: '#4c99e6'
          }
        },
        axisTick: {
          show: true,
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          fontSize: 10

        }
      },

      yAxis: [
       {
                show: true,
                type: 'value',
                name: axis.y[0],
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#21b5d5'
                },
                splitNumber: 3,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        color: '#3f81fc'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, .2)'
                    }
                }
            },
            {
                show: true,
                type: 'value',
                name: axis.y[1],
                nameLocation: 'end',
                position:"right",
                nameTextStyle: {
                    color: '#21b5d5'
                },
                splitNumber: 3,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        color: '#3f81fc'
                    }
                },
                splitLine: {
                   show: false,
                    lineStyle: {
                        color: 'rgba(0, 0, 0, .2)'
                    }
                }
            }


      ],
      series: [
        {
          name: data[0].name,
          type: 'line',
          symbol: 'none',
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            normal: {
              width: 2,
              shadowColor: 'rgba(0, 0, 0, .5)',
              shadowBlur: 10
            }
          },
          data: data[0].value
        }, {
          name: data[1].name,
          type: 'line',
          symbol: 'none',
          smooth: true,
          lineStyle: {
            normal: {
              width: 2,
              shadowColor: 'rgba(0, 0, 0, .5)',
              shadowBlur: 10
            }
          },
          data: data[1].value
        },

        {
          name: data[2].name, //data[1].name,
          type: 'bar',
          barWidth: 12,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              // barBorderRadius: 10000,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#2febf9'
                }, {
                  offset: 0.5,
                  color: '#28d2f9'
                }, {
                  offset: 1,
                  color: '#0c6df9'
                }
              ], false)
            }
          },
          data: data[2].value
        }, {
          name: data[3].name, //data[1].name,
          type: 'bar',
          barWidth: 12,
          itemStyle: {
            normal: {
              // barBorderRadius: 10000,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#FFD531' //'#2febf9'
                }, {
                  offset: 0.5,
                  color: '#FC9000' //'#28d2f9'
                }, {
                  offset: 1,
                  color: '#F34E00' //'#0c6df9'
                }
              ], false)
            }
          },
          data: data[3].value
        }

      ]
    }
  }

 */

  executeAdd_device(newDevice) {

    const {addDevice} = this.props;
    newDevice.topicid = this.projectid;
    addDevice(newDevice);

  }

  exitAdd_device(mod) {
    console.log('----mod: ', mod);
    this.refs.adddevice.hide();
    const {adddevice} = this.props
    // TODO ajax 保存密码
    if (mod) {
      var params = mod
      // setdevice(params)
    }
  }

  exitSet_device(mod) {
    console.log('----mod: ', mod);
    this.refs.setdevice.hide();
    const {setdevice} = this.props
    // TODO ajax 保存密码
    if (mod) {
      var params = mod
      // setdevice(params)
    }
  }



  addData(lengend) {

    //this.currentLegend = lengend;
    this.setState({currentLegend: lengend})
    const me = this;

    // if (!edit) {
    //     return false
    // }

    me.refs.adddevice && me.refs.adddevice.show()

  }

  queryData() {


    // alert( this.refs.startDt.getInput().value  + "----" + this.refs.endDt.getInput().value) ;
   // if('undefined'!= typeof(this.props.location.query.type))
    //  type =this.props.location.query.type;

    // var endDate =this.refs.endDt.getInput().value + ' 00:00:00';
    // var startDate  =  this.refs.startDt.getInput().value + ' 00:00:00';
    // var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
    const {queryDevice} = this.props;
    queryDevice({topicid: this.projectid, name: this.deviceFilter});


  }




  componentWillReceiveProps(nextprops) {

    var pid = nextprops.location.query.project;
    if (pid == 'dianji')
      this.projectid = 2
    else if (pid == 'shuibeng')
      this.projectid = 3
    else if (pid == 'bianpinqi')
      this.projectid = 4
    else
      this.projectid = 1


  }

  componentWillMount() {


  }



}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
};
export default connect(state => null, mapDispatchToProps)(Dabiao);
