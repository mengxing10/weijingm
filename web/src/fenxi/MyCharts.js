import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
export default {



 
  Line3Bar(alldata) {

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
        bottom: '10%',
        top: '20%',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        data: x,
        name: axis.x,
        nameTextStyle: {
          color: '#4c99e6'
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

      yAxis:  
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

            //   ,{
            //     show: true,
            //     type: 'value',
            //     name: axis.y[1],
            //     nameLocation: 'end',
            //     position:"right",
            //     nameTextStyle: {
            //         color: '#21b5d5'
            //     },
            //     splitNumber: 3,
            //     axisLine: {
            //         show: false,
            //     },
            //     axisTick: {
            //         show: false,
            //         alignWithLabel: true
            //     },
            //     axisLabel: {
            //         textStyle: {
            //             color: '#3f81fc'
            //         }
            //     },
            //     splitLine: {
            //        show: false,
            //         lineStyle: {
            //             color: 'rgba(0, 0, 0, .2)'
            //         }
            //     }
            // }


       
      series: [
        {
          name: data[0].name,
          type: 'line',
          symbol: 'none',
          smooth: true,
         // yAxisIndex: 0,
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
           type: 'bar',
          barWidth: 12,
          //yAxisIndex: 1,
          itemStyle: {
            normal: {
              // barBorderRadius: 10000,     #53ff53   #00ec00   #00bb00

              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#53ff53'
                }, {
                  offset: 0.5,
                  color: '#00ec00'
                }, {
                  offset: 1,
                  color: '#00bb00'
                }
              ], false)
            }
          },
          data: data[1].value
        },

        {
          name: data[2].name, //data[1].name,
          type: 'bar',
          barWidth: 12,
        
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
  },




  TwoBar(data) {
    let data1 = data.data1 //{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let data2 = data.data2 //{name:"平均温度",value:[13,53,6,34,64,23,35]};
    let x = data.x //[1,2,3,4,5,6,7]; ,8,9,10,11,12
    let axis = data.axis //{y:"℃",x:"h",title:""}
    return {
      legend: {
        data: [
          data.data1.name, data.data2.name
        ],
        align: 'right',
        itemWidth: 4,
        right: 10,
        textStyle: {
          color: '#21b5d5'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        formatter: '{b0}' + axis.x + '<br/>{a0}: {c0} ' + axis.y + '<br />{a1}: {c1} ' + axis.y
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '10%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: x,
        name: axis.x,
        nameTextStyle: {
          color: '#4c99e6'
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

      yAxis: {
        show: true,
        type: 'value',
        name: axis.y,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#4c99e6'
        },
        splitNumber: 3,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
          alignWithLabel: true
        }, 
        axisLabel: {
          textStyle: {
            color: '#4c99e6'
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
          name: data1.name,
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#2fd0e3'
            }
          },
          data: data1.value
        }, {
          name: data2.name,
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#677ee0'

            }
          },
          data: data2.value
        }
      ]
    }
  },

  OneBar(data) {
    let data1 = data.data1 //{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let data2 = data.data2 //{name:"平均温度",value:[13,53,6,34,64,23,35]};
    let x = data.x //[1,2,3,4,5,6,7]; ,8,9,10,11,12
    let axis = data.axis //{y:"℃",x:"h",title:""}
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        formatter: '{b0}' + axis.x + '<br/>{a0}: {c0} ' + axis.y
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '10%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: x,
        name: axis.x,
        nameTextStyle: {
          color: '#4c99e6'
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

      yAxis: {
        show: true,
        type: 'value',
        name: axis.y,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#4c99e6'
        },
        splitNumber: 3,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: '#4c99e6'
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
          name: data1.name,
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#dbb250'
            }
          },
          data: data1.value
        }
      ]
    }
  },

  TwoCircle(alldata) {
    // let legenddata=['水','电','气']
    // let title =""
    // let data =[{name:"水",value:324},{name:"电",value:324},{name:"气",value:324}]
    let legenddata = alldata.legenddata
    let title = alldata.title
    let data = alldata.data
    let sum = data[0].value + data[1].value
    return {
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}"
      },
      color: [
        '#2fd0e3', '#677ee0'
      ],
      grid: {
        left: '2%',
        right: '10%',
        bottom: '10%',
        top: '20%',
        containLabel: true
      },
      legend: {
        data: [
          data[0].name,
          data[1].name
        ],
        x: 'right',
        padding: 5,
        itemWidth: 8,
        icon: "circle",
        textStyle: {
          color: '#21b5d5'
        }
      },
      series: [
        {
          name: data[0].name,
          center: [
            "50%", "50%"
          ],
          radius: [
            "59%", "60%"
          ],
          clockWise: false,
          hoverAnimation: false,
          type: "pie",
          data: [
            {
              "value": data[0].value,
              "name": data[0].name,
              "itemStyle": {
                "normal": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  },
                  "color": "#2fd0e3",
                  "borderColor": "#2fd0e3",
                  "borderWidth": 10
                },
                "emphasis": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  }
                }
              }
            }, {
              "value": sum,
              "itemStyle": {
                "normal": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  },
                  "color": '#26569a',
                  "borderColor": '#26569a',
                  "borderWidth": 10
                },
                "emphasis": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  }
                }
              }
            }
          ]
        }, {
          "name": data[1].name,
          "center": [
            "50%", "50%"
          ],
          "radius": [
            "51.5%", "52.5%"
          ],
          "clockWise": false,
          "hoverAnimation": false,
          "type": "pie",
          "data": [
            {
              "value": data[1].value,
              "name": data[1].name,
              "itemStyle": {
                "normal": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  },
                  "color": "#677ee0",
                  "borderColor": "#677ee0",
                  "borderWidth": 10
                },
                "emphasis": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  }
                }
              }
            }, {
              "value": sum,
              "itemStyle": {
                "normal": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  },
                  "color": '#215297',
                  "borderColor": '#215297',
                  "borderWidth": 10
                },
                "emphasis": {
                  "label": {
                    "show": false
                  },
                  "labelLine": {
                    "show": false
                  }
                }
              }
            }
          ]
        }
      ]
    };
  },


  MoreBar(data) {


     let y = data.y//{name:"平均温度",value:[13,53,6,34,64,23,35]};
     let x = data.x//[1,2,3,4,5,6,7]; //,8,9,10,11,12
     let axis = data.axis//{y:"℃",x:"h",title:""}
     return {
         grid: {
           left: '2%',
           right: '10%',
           bottom: '10%',
           top: '20%',
           containLabel: true
         },
         xAxis:
             {
                 type : 'category',
                 data : x,
                 axisLabel:{
                     fontSize : 20,
                     show: true,
                     color:"#4c99e6",//"#55aeff",
                 },
                 axisLine: {
                     lineStyle: {
                         show: true,
                         color:"#4c99e6",
                         width:1
                     }
                 },
                 axisTick: {
                     show:false,
                     alignWithLabel: true
                 },

             } ,

             yAxis: {
               show: true,
               type: 'value',
               name: axis.y,
               nameLocation: 'end',
               nameTextStyle: {
                 color: '#4c99e6'
               },
               splitNumber: 3,
               axisLine: {
                 show: false
               },
               axisTick: {
                 show:false,
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




  TwoLine(alldata) {

    let data = alldata.y //{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let x = alldata.x //[1,2,3,4,5,6,7]; ,8,9,10,11,12
    let axis = alldata.axis //{y:"℃",x:"h",title:""}

    return {
      textStyle: {
        fontSize: 14
      },
      //color:['#2dc8e5','#0ddfb4','#eefa48'],
      color: [
        '#2feaf9', '#f8910c', '#84d5d8'
      ],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} "
      },
      "legend": {
        orient: 'vertical',
        left: 'right',
        // top:'top',
        // bottom:20,
        padding: 20,
        icon: 'circle',
        // data: legenddata,
        textStyle: {
          color: 'white',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        formatter: '{b0}' + axis.x + '<br/>{a0}: {c0} ' +'<br />{a1}: {c1} ' // +'<br />{a2}: {c2} '
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '10%',
        top: '20%',
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

      yAxis: {
        show: true,
        type: 'value',
        name: axis.y,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#21b5d5'
        },
        splitNumber: 3,
        axisLine: {
          show: false
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
        }

      ]
    }
  },




  SingleLine(alldata) {

    let data = alldata.y //{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let x = alldata.x //[1,2,3,4,5,6,7]; ,8,9,10,11,12
    let axis = alldata.axis //{y:"℃",x:"h",title:""}

    return {
      textStyle: {
        fontSize: 14
      },
      //color:['#2dc8e5','#0ddfb4','#eefa48'],
      color: [
        '#2feaf9', '#f8910c', '#84d5d8'
      ],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} "
      },
      "legend": {
        orient: 'vertical',
        left: 'right',
        // top:'top',
        // bottom:20,
        padding: 20,
        icon: 'circle',
        // data: legenddata,
        textStyle: {
          color: 'white',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        formatter: '{b0}' + axis.x + '<br/>{a0}: {c0} ' //+'<br />{a1}: {c1} '+'<br />{a2}: {c2} '
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '10%',
        top: '20%',
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

      yAxis: {
        show: true,
        type: 'value',
        name: axis.y,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#21b5d5'
        },
        splitNumber: 3,
        axisLine: {
          show: false
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


  SingleAreaLine(alldata) {

    let data = alldata.y //{name:"基准温度",value:[23,23,23,23,23,23,23]};
    let x = alldata.x //[1,2,3,4,5,6,7]; ,8,9,10,11,12
    let axis = alldata.axis //{y:"℃",x:"h",title:""}

    return {
      textStyle: {
        fontSize: 14
      },
      //color:['#2dc8e5','#0ddfb4','#eefa48'],
      color: [
        '#2feaf9', '#f8910c', '#84d5d8'
      ],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} "
      },
      "legend": {
        orient: 'vertical',
        left: 'right',
        // top:'top',
        // bottom:20,
        padding: 20,
        icon: 'circle',
        // data: legenddata,
        textStyle: {
          color: 'white',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        formatter: '{b0}' + axis.x + '<br/>{a0}: {c0} ' //+'<br />{a1}: {c1} '+'<br />{a2}: {c2} '
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '5%',
        top: '25%',
        containLabel: true
      },
      xAxis: {
        show: false,
        type: 'category',
        data: x,
        name: axis.x,
        nameTextStyle: {
          color: '#21b5d5'
        },
        axisLine: {
          lineStyle: {
            show: false,
            color: '#21b5d5'
          }
        },
        axisTick: {
          show: false,
          alignWithLabel: false
        },
        axisLabel: {
          interval: 0,
          fontSize: 10

        }
      },

      yAxis: {
        show: false,
        type: 'value',
        name: axis.y,
        nameLocation: 'end',
        nameTextStyle: {
          color: '#21b5d5'
        },
        splitNumber: 3,
        axisLine: {
          show: false
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
          areaStyle: {
            normal: {
              color:new echarts.graphic.LinearGradient(
                  0, 1, 0, 0,
                  [
                      {
                          offset: 0,
                          color: 'rgba(44,98,193,0.3)'
                      },
                      {
                          offset: 0.5,
                          color: 'rgba(44,98,193,0.7)'
                      },
                      {
                          offset: 1,
                          color: 'rgba(44,98,193,1)'
                      }
                  ],
                  false
              )
            }
          },
          data: data.value
        }

      ]
    }
  },


}
