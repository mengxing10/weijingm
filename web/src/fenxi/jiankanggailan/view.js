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
import {deviceAPI} from './constants/api'
import 'react-date-picker/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import * as actions from './actions.js'
import './styles/index.styl'

import Menu from '../../common/components/Menus'
import {RiseModal, WaveModal, DropModal, Toast} from 'boron'
import Setdevice from './components/SetDevice'
import Adddevice from './components/AddDevice'

import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import MyCharts from './components/MyCharts'
class JiankangGailan extends Component {

  constructor(props) {
    super(props)

    this.deviceFilter = '';
    this.projectid = 1;
    this.state = {
      levelId:4,
      deviceType:"shuibeng",
      currentLegend: {},
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
    let project = 'all',
      projectName = '设备概览';

    var curLevel = this.state.levelId==1?"差": this.state.levelId==2?"中":this.state.levelId==3?"良":"优";
    var ss = this;
    const EventsDict = {
      click: function(data, echart) {

        // alert(data.seriesName + ','+ data.name +','+ data.value  + ','+ data.seriesIndex);
        ss.addData(data);

      },
      legendselectchanged: function() {}
    };


    var chartStyle = {
      //width: '1200px',
      //width: (window.innerWidth - 320 - 20 - 60 -60) + 'px',
      height: '150px',
      marignBottom:'20px',
      //borderWidth: '1px',
      //borderColor: 'white'

      // paddingBottom:'30px',
      // paddingTop:'0px',
       border: '1px solid #3F70C1'
    };
    var tabStyle = {
      //width: '1200px',
      //width: (window.innerWidth - 320 - 20 - 60 -60) + 'px',
      height: '150px',
      marignBottom:'20px',
      //borderWidth: '1px',
      //borderColor: 'white'

      // paddingBottom:'30px',
      // paddingTop:'0px',
    };




        var allDevices = {
          shuibeng:["28-203#水泵","28-204#水泵","38-2#水泵","38-3#水泵"]};


      var selectDevices = allDevices[this.state.deviceType] ;

        // if (this.project == 'shuibeng')
        //     this.selectDevices = shuibengs;
        //  else  if (this.project == 'bianpinqi')
        //     this.selectDevices = bianpinqis;




    var deviceDatas =[
        {
        data: [{name:"累计运行时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"报修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}],
        x :[1,2,3,4,5,6,7,8,9,10,11,12],
        legenddata:["累计运行时间",'维修时间','维修率','报修率'],
        axis : {y:["h","%"],x:"月",title:selectDevices[0]}},

        {
        data: [{name:"累计运行时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"报修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}],
        x :[1,2,3,4,5,6,7,8,9,10,11,12],
        legenddata:["累计运行时间",'维修时间','维修率','报修率'],
        axis : {y:["h","%"],x:"月",title:selectDevices[1]}},

        {
        data: [{name:"累计运行时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"报修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}],
        x :[1,2,3,4,5,6,7,8,9,10,11,12],
        legenddata:["累计运行时间",'维修时间','维修率','报修率'],
        axis : {y:["h","%"],x:"月",title:selectDevices[2]}},


        {
        data: [{name:"累计运行时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"报修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}],
        x :[1,2,3,4,5,6,7,8,9,10,11,12],
        legenddata:["累计运行时间",'维修时间','维修率','报修率'],
        axis : {y:["h","%"],x:"月",title:selectDevices[3]}},

        {
        data: [{name:"累计运行时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修时间",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"维修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
        {name:"报修率",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}],
        x :[1,2,3,4,5,6,7,8,9,10,11,12],
        legenddata:["累计运行时间",'维修时间','维修率','报修率'],
        axis : {y:["h","%"],x:"月",title:selectDevices[4]}}

    ];
const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}

    return (<div className='jiankang-kailan theBody' style={BodyStyle}>
      {
        <div className="head-part">
            <div className="device-tab labStyle">
            </div>

            <div className="query-line labStyle">
              <div className="item8"></div>
              {/* <div className="item1">&nbsp;&nbsp;&nbsp;&nbsp;运行</div> */
              }
              <div className="item2">&nbsp;&nbsp;&nbsp;&nbsp;故障停机</div>
              <div className="item3">&nbsp;&nbsp;&nbsp;&nbsp;非故障停机</div>
              <div className="item4">&nbsp;&nbsp;&nbsp;&nbsp;维修</div>
              <div className="item5">&nbsp;&nbsp;&nbsp;&nbsp;报修</div>
              <div className="item6">&nbsp;&nbsp;&nbsp;&nbsp;保养</div>
            </div>

          </div>

      }

      {
         <div className="rp-wrap"  >
            <div className="center-charts3">
              <div>
              <ReactEcharts option={MyCharts.StepLine(deviceDatas[0])} style={chartStyle}  onEvents={EventsDict}/>
              </div>
              <div>
              <ReactEcharts option={MyCharts.StepLine(deviceDatas[1])} style={chartStyle} onEvents={EventsDict}/>
              </div>
              <div>
              <ReactEcharts option={MyCharts.StepLine(deviceDatas[2])} style={chartStyle}  onEvents={EventsDict}/>
              </div>
              <div>
              <ReactEcharts option={MyCharts.StepLine(deviceDatas[3])} style={chartStyle} onEvents={EventsDict}/>
              </div>

            </div>

            <div className="right-charts" >
              {[1,2,3,4].map((item,i)=>(<div className="theRow" key ={i} style={tabStyle}>
                <div className="yunxing contentDiv3">运行时间<span className="theHour">1238</span>h</div>
                <div className="tingji contentDiv3">停机时间<span className="theHour">28</span>h</div>
              </div>))}

            </div>

          </div>
      }



    </div>)
  }



selectDeviceType(deviceType)
{
  this.setState({deviceType: deviceType});
}

selectLevel(levelId)
{
  this.setState({levelId: levelId});
}


  linkto()
  {
     browserHistory.push('/baogang/pc/jiankang/shuibeng')
  }
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
          color: '#21b5d5'
        },
        axisLine: {
          lineStyle: {
            show: true,
            color: '#21b5d5'
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
export default connect(state => state.jiankanggailan, mapDispatchToProps)(JiankangGailan);
