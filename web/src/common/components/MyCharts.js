import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
export default {


   getStackBarOption(alldata)
    {

          let legenddata=alldata.legenddata
          let title =alldata.axis.title
          let data =alldata.data

         return {

             title: {
                text: title,
                padding:[10,10,10,20],
                textStyle:{
                  color:"#fff",
                  fontSize:16,
                }
              },
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              legend: {
                  data:['水','电','气'],
                  x: 'right',
                  orient: 'vertical',
                  padding:20,
                  icon: 'circle',
                  textStyle:{color:'white',fontSize:14}
              },
              color:['#2c8cf9','#f8910c','#84d5d8'],
              grid: {
                   left: '2%',
              right: '10%',
              bottom: '5%',
              top: '25%',
              containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      //name: alldata.axis.x,
                      data : alldata.x,//['周一','周二','周三','周四']
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
                          show:true,
                          alignWithLabel: true
                      },
                      axisLabel:{
                          interval:0,
                          fontSize:10

                      }
                  }
              ],
              yAxis : [
                  {
                      name: alldata.axis.y,
                      type : 'value',
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
                              color: '#21b5d5'
                          }
                      },
                      splitLine: {
                          lineStyle: {
                              color: 'rgba(0, 0, 0, .2)'
                          }
                      }
                  }
              ],
              series : [
                  {
                      name:'水',
                      type:'bar',
                      stack: '广告',
                      barWidth: 25,
                      data:[20, 32, 41, 34]
                  },
                  {
                      name:'电',
                      type:'bar',
                      stack: '广告',
                      data:[120, 132, 101, 134]
                  },
                  {
                      name:'气',
                      type:'bar',
                      stack: '广告',
                      data:[220, 182, 191, 234]
                  }


              ]
          };

    },
  //多环形图
  MoreCircle(alldata)
  {
        // let legenddata=['水','电','气']
        // let title =""
        // let data =[{name:"水",value:324},{name:"电",value:324},{name:"气",value:324}]
        let legenddata=alldata.legenddata
        let title =alldata.title
        let data =alldata.data
        let sum=data[0].value+data[1].value+data[2].value
          return  {
            title: {
              text: title,
              padding:[10,10,10,20],
              textStyle:{
                color:"#fff",
                fontSize:16,
              }
            },
              textStyle: {fontSize:14 },
              color:['#2dc8e5','#0ddfb4','#eefa48'],
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              "legend": {
                  orient: 'vertical',
                  left: 'right',
                  // top:'top',
                  // bottom:20,
                  padding:20,
                  icon: 'circle',
                  data: legenddata,
                  textStyle:{color:'white',fontSize:14}
              },
              "tooltip": {
                  "trigger": 'item',
                  "formatter": "{a} : ({d}%)"
              },
                  "series": [{
                  "name": data[0].name,
                  "center": [
                      "50%",
                      "50%"
                  ],
                  "radius": [
                      "59%",
                      "60%"
                  ],
                  "clockWise": false,
                  "hoverAnimation": false,
                  "type": "pie",
                  "data": [{
                      "value": data[0].value,
                      "name": "",
                      "label": {
                          "normal": {
                              "show": true,
                              "formatter": ""+sum,
                              "textStyle": {
                                  "fontSize": 28,
                                  "fontWeight": "bold",
                                  "color":"#fff"
                              },
                              "position": "center"
                          }
                      },
                      "labelLine": {
                          "show": false
                      },
                      "itemStyle": {
                          "normal": {
                              "color": "#2dc8e5",
                              "borderColor": "#2dc8e5",
                              "borderWidth": 10,
                              "capType" :"round"
                          },
                          "emphasis": {
                              "color": "#2dc8e5",
                              "borderColor": "#2dc8e5",
                              "borderWidth": 10
                          }
                      },
                  }, {
                      "name": " ",
                      "value": data[1].value+data[2].value,
                      "itemStyle": {
                          "normal": {
                              "label": {
                                  "show": false
                              },
                              "labelLine": {
                                  "show": false
                              },
                              "color": 'rgba(0,0,0,0)',
                              "borderColor": 'rgba(1,1,1,0.2)',
                              "borderWidth": 10
                          },
                          "emphasis": {
                              "color": 'rgba(0,0,0,0)',
                              "borderColor": 'rgba(0,0,0,0)',
                              "borderWidth": 10
                          }
                      }
                  }]
              }, {
                  "name": data[1].name,
                  "center": [
                      "50%",
                      "50%"
                  ],
                  "radius": [
                      "51.5%",
                      "52.5%"
                  ],
                  "clockWise": false,
                  "hoverAnimation": false,
                  "type": "pie",
                  "data": [{
                      "value": data[1].value,
                      "name": "",
                      "label": {
                          "normal": {
                              "show": true,
                              "formatter": '',
                              "textStyle": {
                                  "fontSize": 28,
                                  "fontWeight": "bold"
                              },
                              "position": "center"
                          }
                      },
                      "labelLine": {
                          "show": false
                      },
                      "itemStyle": {
                          "normal": {
                              "color": "#0ddfb4",
                              "borderColor": "#0ddfb4",
                              "borderWidth": 10
                          },
                          "emphasis": {
                              "color": "#0ddfb4",
                              "borderColor": "#0ddfb4",
                              "borderWidth": 10
                          }
                      },
                  }, {
                      "name": " ",
                      "value": data[0].value+data[2].value,
                      "itemStyle": {
                          "normal": {
                              "label": {
                                  "show": false
                              },
                              "labelLine": {
                                  "show": false
                              },
                              "color": 'rgba(1,1,1,0)',
                              "borderColor": 'rgba(1,1,1,0.2)',
                              "borderWidth": 10
                          },
                          "emphasis": {
                              "color": 'rgba(1,1,1,0)',
                              "borderColor": 'rgba(1,1,1,0.2)',
                              "borderWidth": 10
                          }
                      }
                  }]
              },
                  {
                      "name": data[2].name,
                      "center": [
                          "50%",
                          "50%"
                      ],
                      "radius": [
                          "44.5%",
                          "45.5%"
                      ],
                      "clockWise": false,
                      "hoverAnimation": false,
                      "type": "pie",
                      "data": [{
                          "value": data[2].value,
                          "name": "",
                          "label": {
                              "normal": {
                                  "show": true,
                                  "formatter": '',
                                  "textStyle": {
                                      "fontSize": 28,
                                      "fontWeight": "bold"
                                  },
                                  "position": "center"
                              }
                          },
                          "labelLine": {
                              "show": false
                          },
                          "itemStyle": {
                              "normal": {
                                  "color": "#eefa48",
                                  "borderColor": "#eefa48",
                                  "borderWidth": 10
                              },
                              "emphasis": {
                                  "color": "#eefa48",
                                  "borderColor": "#eefa48",
                                  "borderWidth": 10
                              }
                          },
                      }, {
                          "name": " ",
                          "value": data[1].value+data[0].value,
                          "itemStyle": {
                              "normal": {
                                  "label": {
                                      "show": false
                                  },
                                  "labelLine": {
                                      "show": false
                                  },
                                  "color": 'rgba(1,1,1,0)',
                                  "borderColor": 'rgba(1,1,1,0.2)',
                                  "borderWidth": 10
                              },
                              "emphasis": {
                                  "color": 'rgba(1,1,1,0)',
                                  "borderColor": 'rgba(1,1,1,0.2)',
                                  "borderWidth": 10
                              }
                          }
                      }]
                  }
              ]
          };
      //return opt1;




  },




  //圈图
   CircleAndValue(data){
     let val=data.val,bfl=data.bfl,tName=data.tName,danwei=data.danwei
      var dataStyle = {
                normal: {
                    label: {show:false},
                    labelLine: {show:false},
                    shadowBlur: 40,
                    shadowColor: 'rgba(40, 40, 40, 0.5)',
                }
        };
      var placeHolderStyle = {
                  normal : {
                      color: 'rgba(0,0,0,0)',
                      label: {show:false},
                      labelLine: {show:false}
                  },
                  emphasis : {
                      color: 'rgba(0,0,0,0)'
                  }
        };

        var total = {
            name: danwei,
            value: val,
        }
        var sub = 100-bfl

      return  {
            color: ['#85b6b2', '#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
            tooltip : {
                show: false,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: [{
                   text: total.value,
                   left: '49%',
                   top: '41%',
                   textAlign: 'center',
                   textBaseline: 'middle',
                   textStyle: {
                       color: '#fff',
                       fontWeight: 'normal',
                       fontSize: 40
                   }
               }, {
                   text: total.name,
                   left: '49%',
                   top: '66%',
                   textAlign: 'center',
                   textBaseline: 'middle',
                   textStyle: {
                       color: '#fff',
                       fontWeight: 'normal',
                       fontSize: 12
                   }
               }],

            series : [
                {
                    name:tName,
                    type:'pie',
                    clockWise:true,
                    radius : [70,78],
                    itemStyle : dataStyle,
                    hoverAnimation: false,
                    startAngle :-90,
                    data:[
                        {
                            value:bfl,
                            name:'01',
                            itemStyle:{
                                normal:{
                                    barBorderRadius: 10000,
                                    color: new echarts.graphic.LinearGradient(
                                            0, 1, 0, 0,
                                            [
                                                {
                                                    offset: 0,
                                                    color: '#3c7af1'
                                                },
                                                {
                                                    offset: 0.5,
                                                    color: '#3c7af1'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#3c7af1'
                                                }
                                            ],
                                            false
                                  )
                                }
                            }
                        },
                        {
                            value:sub,
                            name:'01',
                            itemStyle:{
                                normal:{
                                    color:'#284591'
                                  }
                                }
                        },
                    ]
                }

            ]
        };
  },


   BaseLineAndBar(data) {


      let data1 = data.data1//{name:"基准温度",value:[23,23,23,23,23,23,23]};
      let data2 = data.data2//{name:"平均温度",value:[13,53,6,34,64,23,35]};
      let x = data.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
      let axis = data.axis//{y:"℃",x:"h",title:""}
      return {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              },
            // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
              formatter: '{b0}'+axis.x+'<br/>{a0}: {c0} '+axis.y+'<br />{a1}: {c1} '+axis.y
          },
          grid: {
              left: '2%',
              right: '10%',
              bottom: '20%',
              top: '15%',
              containLabel: true
          },
          xAxis:
              {
                  type : 'category',
                  data : x,
                  name: axis.x,
                  nameTextStyle: {
                      color: '#21b5d5'
                  },
                  axisLine: {
                      lineStyle: {
                          show: true,
                          color: 'rgba(0, 0, 0, .1)'
                      }
                  },
                  axisTick: {
                      show:true,
                      alignWithLabel: true
                  },
                  axisLabel:{
                      interval:0,
                      rotate:-45,
                      fontSize:10

                  }
              } ,

          yAxis:
            {
                show: true,
                type: 'value',
                name: axis.y,
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
                        color: '#21b5d5'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, .2)'
                    }
                }
            },
          series: [
              {
                  name:data2.name,
                  type:'bar',
                  barWidth: 8,
                  label:{
                    normal:{
                        show: true,
                        position: 'bottom',
                        formatter: '{b}',
                        textStyle:{
                            color: '#21b5d5'
                        }
                    }
                  },
                  itemStyle:{
                      normal:{
                          // barBorderRadius: 10000,
                          color: new echarts.graphic.LinearGradient(
                              0, 1, 0, 0,
                              [
                                  {
                                      offset: 0,
                                      color: '#2febf9'
                                  },
                                  {
                                      offset: 0.5,
                                      color: '#28d2f9'
                                  },
                                  {
                                      offset: 1,
                                      color: '#0c6df9'
                                  }
                              ],
                              false
                          )
                      }
                  },
                  data: data2.value
              },

              {
                  name: data1.name,
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  lineStyle: {
                      normal: {
                          color: '#c8e948',
                          width: 2,
                          shadowColor: 'rgba(0, 0, 0, .5)',
                          shadowBlur: 10
                      }
                  },
                  data: data1.value
              }
          ]
      }
  },


     BaseLineAndBar(data) {


        let data1 = data.data1//{name:"基准温度",value:[23,23,23,23,23,23,23]};
        let data2 = data.data2//{name:"平均温度",value:[13,53,6,34,64,23,35]};
        let x = data.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
        let axis = data.axis//{y:"℃",x:"h",title:""}
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
              // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
                formatter: '{b0}'+axis.x+'<br/>{a0}: {c0} '+axis.y+'<br />{a1}: {c1} '+axis.y
            },
            grid: {
                left: '2%',
                right: '10%',
                bottom: '20%',
                top: '15%',
                containLabel: true
            },
            xAxis:
                {
                    type : 'category',
                    data : x,
                    name: axis.x,
                    nameTextStyle: {
                        color: '#21b5d5'
                    },
                    axisLine: {
                        lineStyle: {
                            show: true,
                            color: 'rgba(0, 0, 0, .1)'
                        }
                    },
                    axisTick: {
                        show:true,
                        alignWithLabel: true
                    },
                    axisLabel:{
                        interval:0,
                        rotate:-45,
                        fontSize:10

                    }
                } ,

            yAxis:
              {
                  show: true,
                  type: 'value',
                  name: axis.y,
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
                          color: '#21b5d5'
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          color: 'rgba(0, 0, 0, .2)'
                      }
                  }
              },
            series: [
                {
                    name:data2.name,
                    type:'bar',
                    barWidth: 8,
                    label:{
                      normal:{
                          show: true,
                          position: 'bottom',
                          formatter: '{b}',
                          textStyle:{
                              color: '#21b5d5'
                          }
                      }
                    },
                    itemStyle:{
                        normal:{
                            // barBorderRadius: 10000,
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,
                                [
                                    {
                                        offset: 0,
                                        color: '#2febf9'
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#28d2f9'
                                    },
                                    {
                                        offset: 1,
                                        color: '#0c6df9'
                                    }
                                ],
                                false
                            )
                        }
                    },
                    data: data2.value
                },

                {
                    name: data1.name,
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            color: '#c8e948',
                            width: 2,
                            shadowColor: 'rgba(0, 0, 0, .5)',
                            shadowBlur: 10
                        }
                    },
                    data: data1.value
                }
            ]
        }
    },


   BaseLineAndBarAndTwoY(data) {


      let data2 = {name:"节能量",value:[123,223,223,323,423,253,230]};//data.data1//{name:"基准温度",value:[23,23,23,23,23,23,23]};
      let data1 = {name:"作业率",value:[73,53,62,64,64,73,65]};//data.data2//{name:"平均温度",value:[13,53,6,34,64,23,35]};
      let x = ["2017年1期","2017年2期","2017年3期","2017年4期","2018年1期","2018年2期","2018年3期"];//data.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
      let axis ={y:["kWh","%"],x:"Q",title:""} //data.axis//{y:"℃",x:"h",title:""}
      return {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              },
            // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
              formatter: '{b0}'+'<br/>{a0}: {c0} '+axis.y[0]+'<br />{a1}: {c1} '+axis.y[1]
          },
          grid: {
              left: '2%',
              right: '10%',
              bottom: '20%',
              top: '15%',
              containLabel: true
          },
          xAxis:
              {
                  type : 'category',
                  data : x,
                  name : axis.x,

                  nameTextStyle: {
                      color: '#21b5d5'
                  },
                  axisLine: {
                      lineStyle: {
                          show: true,
                          color: '#3f81fc'
                      }
                  },
                  axisTick: {
                      show:true,
                      alignWithLabel: true
                  },
                  axisLabel:{
                      interval:0,
                      rotate:45,
                      fontSize:10

                  }
              } ,

          yAxis:[
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
                  name:data2.name,
                  type:'bar',
                  barWidth: 8,
                  yAxisIndex: 0,
                  itemStyle:{
                      normal:{
                          // barBorderRadius: 10000,
                          color: new echarts.graphic.LinearGradient(
                              0, 1, 0, 0,
                              [
                                  {
                                      offset: 0,
                                      color: '#2febf9'
                                  },
                                  {
                                      offset: 0.5,
                                      color: '#28d2f9'
                                  },
                                  {
                                      offset: 1,
                                      color: '#0c6df9'
                                  }
                              ],
                              false
                          )
                      }
                  },
                  data: data2.value
              },

              {
                  name: data1.name,
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  yAxisIndex: 1,

                  lineStyle: {
                      normal: {
                          color: '#c8e948',
                          width: 2,
                          shadowColor: 'rgba(0, 0, 0, .5)',
                          shadowBlur: 10
                      }
                  },
                  data: data1.value
              }
          ]
      }
  },

  MoreSeriesAndBar(data) {

     let y = data.y//{name:"平均温度",value:[13,53,6,34,64,23,35]};
     let x = data.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
     let axis = data.axis//{y:"℃",x:"h",title:""}
     return {
         title: {
           text: axis.title,
           padding:[10,10,10,20],
           textStyle:{
             color:"#fff",
             fontSize:16,
           }
         },
         xAxis:
             {
                 type : 'category',
                 data : x,
                 axisLabel:{
                     fontSize : 20,
                     show: true,
                     color:"#55aeff",
                 },
                 axisLine: {
                     lineStyle: {
                         show: true,
                         color:"#55aeff",
                         width:2
                     }
                 },
                 axisTick: {
                     show:false,
                     alignWithLabel: true
                 },

             } ,

         yAxis:
           {
               show: false,
           },
         series: [
             {
                 name:y.name,
                 type:'bar',
                 barWidth: 24,
                 label:{
                   normal:{
                       show: true,
                       position: 'top',
                       textStyle:{
                           color: '#21b5d5'
                       }
                   }
                 },
                 itemStyle:{
                     normal:{
                         // barBorderRadius: 10000,
                         color: new echarts.graphic.LinearGradient(
                             0, 1, 0, 0,
                             [
                                 {
                                     offset: 0,
                                     color: '#2febf9'
                                 },
                                 {
                                     offset: 0.5,
                                     color: '#28d2f9'
                                 },
                                 {
                                     offset: 1,
                                     color: '#0c6df9'
                                 }
                             ],
                             false
                         )
                     }
                 },
                 data: y.value
             }

         ]
     }
 },

 MoreLine(alldata) {


    let data = alldata.data//{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let x = alldata.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
    let axis = alldata.axis//{y:"℃",x:"h",title:""}
    let legenddata=alldata.legenddata
    return {
      title: {
        text: axis.title,
        padding:[10,10,10,20],
        textStyle:{
          color:"#fff",
          fontSize:16,
        }
      },
        textStyle: {fontSize:14 },
        //color:['#2dc8e5','#0ddfb4','#eefa48'],
        color:['#2c8cf9','#f8910c','#84d5d8'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        "legend": {
            orient: 'vertical',
            left: 'right',
            // top:'top',
            // bottom:20,
            padding:20,
            icon: 'circle',
            data: legenddata,
            textStyle:{color:'white',fontSize:14}
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
          // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
            formatter: '{b0}'+axis.x+'<br/>{a0}: {c0} '+'<br />{a1}: {c1} '+'<br />{a2}: {c2} '
        },
        grid: {
            left: '2%',
            right: '10%',
            bottom: '5%',
            top: '25%',
            containLabel: true
        },
        xAxis:
            {
                type : 'category',
                data : x,
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
                    show:true,
                    alignWithLabel: true
                },
                axisLabel:{
                    interval:0,
                    fontSize:10

                }
            } ,

        yAxis:
          {
              show: true,
              type: 'value',
              name: axis.y,
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
                      color: '#21b5d5'
                  }
              },
              splitLine: {
                  lineStyle: {
                      color: 'rgba(0, 0, 0, .2)'
                  }
              }
          },
        series: [
          {
              name: data[0].name,
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
              data: data[0].value
          },
          {
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

          // {
          //     name: data[2].name,
          //     type: 'line',
          //     symbol: 'none',
          //     smooth: true,
          //     lineStyle: {
          //         normal: {
          //             width: 2,
          //             shadowColor: 'rgba(0, 0, 0, .5)',
          //             shadowBlur: 10
          //         }
          //     },
          //     data: data[2].value
          // },


        ]
    }
},

 SingleLine(alldata) {


    let data = alldata.data//{name:"基准温度",value:[23,23,23,23,23,23,23]};

   //let data =  {name:"基准温度",value:[23,23,23,28]};
    let x = alldata.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
    let axis = alldata.axis//{y:"℃",x:"h",title:""}
    let legenddata=alldata.legenddata
   // let titles = axis.title

    return {
      title: {
        text:  axis.title,  //titles[idx],
        padding:[10,10,10,20],
        left:'center',
        textStyle:{
          color:"#fff",
          fontSize:14,
        }
      },
        textStyle: {fontSize:14 },
        //color:['#2dc8e5','#0ddfb4','#eefa48'],
        color:['#2c8cf9','#f8910c','#84d5d8'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        "legend": {
            orient: 'vertical',
            left: 'right',
            // top:'top',
            // bottom:20,
            padding:20,
            icon: 'circle',
           // data: legenddata,
            textStyle:{color:'white',fontSize:14}
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
          // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
            formatter: '{b0}'+axis.x+'<br/>{a0}: {c0} '//+'<br />{a1}: {c1} '+'<br />{a2}: {c2} '
        },
        grid: {
            left: '2%',
            right: '10%',
            bottom: '5%',
            top: '25%',
            containLabel: true
        },
        xAxis:
            {
                type : 'category',
                data : x,
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
                    show:true,
                    alignWithLabel: true
                },
                axisLabel:{
                    interval:0,
                    fontSize:10

                }
            } ,

        yAxis:
          {
              show: true,
              type: 'value',
              name: axis.y,
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
                      color: '#21b5d5'
                  }
              },
              splitLine: {
                  lineStyle: {
                      color: 'rgba(0, 0, 0, .2)'
                  }
              }
          },
        series: [
          {
              name: data.name,
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
              data: data.value
          }





        ]
    }
},




}
