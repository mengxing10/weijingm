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

class GuzhangYuce extends Component {

  constructor(props) {
    super(props)
this.selectDevices ={};
    this.deviceFilter = '';
    this.projectid = 1;
    this.project = "shuibeng";
    this.state = {
      levelId:1,
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
    let project = 'shuibeng',projectName = '水泵';


    var curLevel = this.state.levelId==1?"差": this.state.levelId==2?"中":this.state.levelId==3?"良":"优";
    var ss = this;
    const EventsDict = {
      click: function(data, echart) {

        // alert(data.seriesName + ','+ data.name +','+ data.value  + ','+ data.seriesIndex);
        ss.addData(data);

      },
      legendselectchanged: function() {}
    };

    // if ('undefined' != typeof(this.props.location.query.project))
    //   project = this.props.location.query.project;
    // if (project == 'dianji')
    //   projectName = '电机';
    // else if (project == 'shuibeng') {
    //   projectName = '水泵';
    // } else if (project == 'bianpinqi') {
    //   projectName = '变频器';
    // } else if (project == 'famen') {
    //   projectName = '阀门';
    // }
    // this.project =  "shuibeng";
    // const meuncont = [

    //   {
    //     name: 'project',
    //     text: '项目',
    //     mutilselect: false,
    //     pagechange: true,
    //     value: [
    //       {
    //         name: 'all',
    //         text: '设备概览',
    //         address: '/sanya/pc/device',
    //         selected: true
    //       }, {
    //         name: 'dianji',
    //         text: '电机',
    //         address: '/sanya/pc/device',
    //         selected: false
    //       }, {
    //         name: 'shuibeng',
    //         text: '水泵',
    //         address: '/sanya/pc/device',
    //         selected: false
    //       }, {
    //         name: 'bianpinqi',
    //         text: '变频器',
    //         address: '/sanya/pc/device',
    //         selected: false
    //       }
    //     ]
    //   }

    // ];

   // const { } = this.state
   // const query = this.props.location.query
   // const {fetchbaobiao} = this.props

    var tHeight = window.innerHeight;
    //alert(tHeight);
    if(tHeight < 800)  tHeight = 810;

    var wrapHeight = {
      height: (tHeight - 100 + 10 + 200) + 'px'
    };

    if (project == "dianji" || project == "shuibeng" || project == 'bianpinqi'|| project == 'famen')
     {

      tHeight=700;
      wrapHeight = {
        height: (tHeight - 100 + 10 ) + 'px'
      };

    }
    // else if(project == 'all')
    // {
    //    wrapHeight = {
    //    height: (tHeight - 100 + 10 + 300) + 'px'
    //   };
    // }
    var mapstyle = {
      width: (window.innerWidth - 320 - 20 - 60 -50) + 'px',
      height: '100%',
     // border:'1px solid red',

    }
    var rightStyle = {
      top: '112px',
      height: (tHeight - 100 + 10 + 300) + 'px'
    }

    var chartStyle = {
      //width: '1200px',
      width: (window.innerWidth - 320 - 20 - 60 -60) + 'px',
      height: '150px',
      //borderWidth: '1px',
      //borderColor: 'white'
      paddingBottom:'30px',
      paddingTop:'0px',
      border: '1px solid #3F70C1'
    };

     var leftCharts ={
                width: (window.innerWidth - 400 - 140 -60 ) + 'px',
                height: '220px'
             };


     var deviceDatas= [];
       for(var i=0;i<2;i++)
        {
           var deviceData =
            {
              legend:{left:'center'},
              lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
              barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
              xAxis: {name:"月",data:[1,2,3,4,5,6,7,8,9,10,11,12]},
              yAxis: {name:["h","%"]},
              series:{
                        lines:[
                                {name:"累计运行时间",yAxisIndex:0,data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                                {name:"维修时间",yAxisIndex:0,data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}
                             ],
                        bars: [
                                {name:"维修率",yAxisIndex:1,data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                                {name:"报修率",yAxisIndex:1,data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}

                             ]
                     }
            };
            deviceDatas.push(deviceData);
          }




        var shuibengs = {0:["203#水泵","204#水泵"],1:["203#水泵","204#水泵"]};

        this.selectDevices = shuibengs;
        if (this.project == 'shuibeng')
            this.selectDevices = shuibengs;
         else  if (this.project == 'bianpinqi')
            this.selectDevices = bianpinqis;
         else  if (this.project == 'famen')
            this.selectDevices = famens;

      const BodyStyle={height: document.documentElement.clientHeight-130  +'px'}


    return (<div className='jny-device theBody' style={BodyStyle}>
       <div className="charts-wrap" >
            <div className="left-charts2" >
              <div className="div1 contentDiv">
                <div className="div1_1 labStyle">
                  {this.selectDevices[this.state.levelId][0]}<span className="dname">X1345</span>
                </div>
                <div className="div1_2">
                  <ReactEcharts option={GeneralCharts.theLineBar(deviceDatas[0])} style={leftCharts} className='tab-2'/>
                </div>
              </div>

              <div className="div1 contentDiv">
                <div className="div1_1 labStyle">
                  {this.selectDevices[this.state.levelId][1]}<span className="dname">X1345</span>
                  <span className="cname">位置</span>
                </div>
                <div className="div1_2">
                  <ReactEcharts option={GeneralCharts.theLineBar(deviceDatas[1])} style={leftCharts} className='tab-2'/>

                </div>
              </div>

            </div>

            <div className="right-charts2">

                                <div className="div1 tabBkColor2">
                                   <div className="div1_1">
                                        <div className="div1_1_left" >
                                            <div>{curLevel}</div>
                                        </div>
                                        <div className="div1_1_right" >
                                           <a className="atop" href="javascript:void(0)" onClick={this.linkto.bind(this, 0)}>></a>

                                        </div>
                                   </div>
                                   <div className="div1_2">
                                        <div className="div1_2_row">
                                              <div className="atop">2018-01-12</div>
                                              <div className="abottom">设备安装时间</div>
                                        </div>
                                        <div className="div1_2_row">
                                              <div className="atop">2018-01-18</div>
                                              <div className="abottom">开始运行时间</div>
                                        </div>
                                        <div className="div1_2_row"></div>
                                   </div>
                                   <div className="div1_2">
                                        <div className="div1_2_row">
                                              <div className="atop">22.2</div>
                                              <div className="abottom">累计运行时间</div>
                                        </div>
                                        <div className="div1_2_row">
                                              <div className="atop">22.2</div>
                                              <div className="abottom">维修时间</div>
                                        </div>
                                        <div className="div1_2_row"></div>
                                   </div>
                                   <div className="div1_2">
                                        <div className="div1_2_row">
                                              <div className="atop">4.3%</div>
                                              <div className="abottom">维修率</div>
                                        </div>
                                         <div className="div1_2_row">
                                              <div className="atop">1.2%</div>
                                              <div className="abottom">报修率</div>
                                        </div>
                                        <div className="div1_2_row"></div>
                                   </div>



                                </div>



                                 <div className="div1 tabBkColor2">
                                   <div className="div1_1">
                                        <div className="div1_1_left" >
                                            <div>{curLevel}</div>
                                        </div>
                                        <div className="div1_1_right" >

                                            <a className="atop" href="javascript:void(0)" onClick={this.linkto.bind(this, 1)}>></a>
                                        </div>

                                   </div>
                                    <div className="div1_2">
                                        <div className="div1_2_row">
                                              <div className="atop">2018-01-12</div>
                                              <div className="abottom">设备安装时间</div>
                                        </div>
                                        <div className="div1_2_row">
                                              <div className="atop">2018-01-18</div>
                                              <div className="abottom">开始运行时间</div>
                                        </div>
                                        <div className="div1_2_row"></div>
                                   </div>
                                  <div className="div1_2">
                                        <div className="div1_2_row">
                                              <div className="atop">22.2</div>
                                              <div className="abottom">累计运行时间</div>
                                        </div>
                                        <div className="div1_2_row">
                                              <div className="atop">22.2</div>
                                              <div className="abottom">维修时间</div>
                                        </div>
                                        <div className="div1_2_row"></div>


                                   </div>
                                   <div className="div1_2">
                                        <div className="div1_2_row">
                                              <div className="atop">1.6%</div>
                                              <div className="abottom">维修率</div>
                                        </div>
                                         <div className="div1_2_row">
                                              <div className="atop">1.2%</div>
                                              <div className="abottom">报修率</div>
                                        </div>
                                        <div className="div1_2_row"></div>
                                   </div>

                                </div>

                        </div>

          </div>



    </div>)
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

  queryData() {


    // alert( this.refs.startDt.getInput().value  + "----" + this.refs.endDt.getInput().value) ;
   // if('undefined'!= typeof(this.props.location.query.type))
    //  type =this.props.location.query.type;

    // var endDate =this.refs.endDt.getInput().value + ' 00:00:00';
    // var startDate  =  this.refs.startDt.getInput().value + ' 00:00:00';
    // var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
    // const {queryDevice} = this.props;
    // queryDevice({topicid: this.projectid, name: this.deviceFilter});


  }




  componentWillReceiveProps(nextprops) {




  }

  componentWillMount() {


  }



}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
};
export default connect(state => null, mapDispatchToProps)(GuzhangYuce);
