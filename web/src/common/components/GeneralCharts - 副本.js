import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'


 // '#2c8cf9' 此为白色背景页面
 var lineColors =  ['#00b3ad','#fdac3b','#fa5576', '#4886ff']; 
 var barColors = [['#8d59f8','#8d59f8','#8d59f8'],['#fdac3b','#fdac3b','#fdac3b'],['#ff7687','#ff7687','#ff7687']];
 var titleColor = '#405e7c';
 var legendColor = '#859db4';
 var axisColor = '#bbc0c3';
 var ringColors = ['#8d59f8','#646390'];

//此为灰色背景页面
lineColors =  ['#8d59f8','#3cbdc6','#ff7687', '#77a3fe']; 
barColors = [['#3cbdc6','#3cbdc6','#3cbdc6'],['#ff7687','#ff7687','#ff7687'],['#77a3fe','#77a3fe','#77a3fe']];
titleColor = '#a2a1b3';  
legendColor = '#a2a1b3';


//此为蓝色背景页面
lineColors =  ['#8d59f8','#3cbdc6','#ff7687', '#77a3fe']; 
barColors = [['#3cbdc6','#3cbdc6','#3cbdc6'],['#ff7687','#ff7687','#ff7687'],['#77a3fe','#77a3fe','#77a3fe']];
titleColor = '#a3cff6';  
legendColor = '#a3cff6';


export default {

  theLineBar(option)  //3bar,1 line
   {
    //barColors:['#53ff53','#00ec00','#00bb00']
    //var lineColors =  ['#8d59f8', '#3cbdc6', '#ff7687', '77a3fe','#2c8cf9'];
    //var barColors = [ ['#8d59f8','#8d59f8','#8d59f8'],['#3cbdc6','#3cbdc6','#3cbdc6'],['#ff7687','#ff7687','#ff7687']];
    //var barColors = [ ['#53ff53','#00ec00','#00bb00'],['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']];
    var barWidth = 12;
    var legendOrient = 'horizontal';
    var legendLeft  = 'center';
    var legendTop  = 'bottom';

    if ('undefined' != typeof(option.lineColors))
        lineColors = option.lineColors;

    if ('undefined' != typeof(option.barColors))
        barColors = option.barColors;

    if ('undefined' != typeof(option.barWidth))
              barWidth = option.barWidth;

    if ('undefined' != typeof(option.legend))
        { 
         if ('undefined' != typeof(option.legend.orient))
                    legendOrient = option.legend.orient;

         if ('undefined' != typeof(option.legend.left))
                    legendLeft = option.legend.left;

         if ('undefined' != typeof(option.legend.top))
                    legendTop = option.legend.top;
        }
    
            // legend:{
            //     orient: 'horizontal',  //horizontal vertical
            //     left:'right', //auto 'left', 'center', 'right'
            //     top:'top', //auto 'top', 'middle', 'bottom'             
            //  },

   var yAxisObjs =[];
   for(var i=0;i<2;i++)
    {
      var  splitShow= true;
      if(i==1) splitShow= false;
      var yAxisObj = 
           {
                show: true,
                type: 'value',
                name: option.yAxis.name[i], 
                nameLocation: 'end',
                nameTextStyle: {
                    color: axisColor //'#4c99e6'
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
                        color: axisColor
                    }
                },
                splitLine: {  
                    show: splitShow,
                    lineStyle: {
                        color: 'rgba(0, 0, 0, .2)'
                    }
                }
            };
        yAxisObjs.push(yAxisObj);

      }
    var theyAxis =  yAxisObjs[0];     
    if(option.yAxis.name.length==2)  
          theyAxis = yAxisObjs; 


    var theLegenddata = [];
    var theSeries = [];
    //formatter: '{b0}' + option.xAxis.name + '<br/>{a0}: {c0} ' + '<br />{a1}: {c1} ' + '<br />{a2}: {c2} '+'<br />{a3}: {c3}'
    var theFormatter = '{b0}' + option.xAxis.name ;
    var m=0;
    if ('undefined' != typeof(option.series.lines))
        for(var i=0;i<option.series.lines.length;i++)
        {
           theFormatter += '<br/>{a' + i +'}: {c'+ i +'}';
           theLegenddata.push(option.series.lines[i].name);
           

           var iSeries = {  name: option.series.lines[i].name,
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
              data: option.series.lines[i].data
            };
           if('undefined'!= option.series.lines[i].yAxisIndex) 
              iSeries.yAxisIndex =  option.series.lines[i].yAxisIndex;
           theSeries.push(iSeries);
           m=i;

        }
    else  m=-1;   
    if ('undefined' != typeof(option.series.bars))
    for(var j=0;j<option.series.bars.length;j++)
    {

          //if( 'undefined'!= typeof( option.series.bars[j].barColors ))
          //  barColors[j] = option.series.bars[j].barColors;
          theFormatter += '<br/>{a' + (m+1+j) +'}: {c'+ (m+1+j) +'}';
          theLegenddata.push(option.series.bars[j].name);

          var iSeries = {
              name: option.series.bars[j].name, 
              type: 'bar',
              barWidth: barWidth,           
              itemStyle: {
                normal: {
                  // barBorderRadius: 10000,
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: barColors[j][0] //option.series.bars[j].barColors[0] //'#2febf9'
                    }, {
                      offset: 0.5,
                      color: barColors[j][1] //option.series.bars[j].barColors[1] //'#28d2f9'
                    }, {
                      offset: 1,
                      color: barColors[j][2] //option.series.bars[j].barColors[2] //'#0c6df9'
                    }
                  ], false)
                }
              },
              data: option.series.bars[j].data,
            };

           if('undefined'!= option.series.bars[j].yAxisIndex) 
              iSeries.yAxisIndex =  option.series.bars[j].yAxisIndex;
          theSeries.push(iSeries);


    }
 
    return {
      title: {
                text: option.title, // axis.title,
                // left:'center',
                // top:'bottom',
               // padding: [0, 10, 0, 10], 
                left:'center',
                top:'top', 
                //padding: [0, 0, 0, 10],                           
                textStyle: {color: titleColor,fontSize: 16 }                
                               
      },
      textStyle: {fontSize: 12},
            
      //color:['#2c8cf9','#f8910c','#84d5d8'], #FF6200
      color: lineColors,      
      legend: {
        // orient: 'horizontal',//'vertical',
        // //left: 'right',
        // top:'top',
        // width:'auto',

        orient: legendOrient,//option.legend.orient,// 'vertical',horizontal
        left: legendLeft,//option.legend.left, //'auto' 'left', 'center', 'right'
        top:legendTop,//option.legend.top, //'auto' 'top', 'middle', 'bottom'
        itemWidth: barWidth,
       // padding: [15,0,0,0],
        icon: 'circle',
        data: theLegenddata,
        textStyle: {
          color: legendColor,//'#6597F5',
          fontSize: 12
        }
      },

      // tooltip: {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b} : {c} ({d}%)"
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        // formatter: '{b0}日<br/>{a0}: {c0} 千瓦时'
        //formatter: '{b0}' + option.xAxis.name + '<br/>{a0}: {c0} ' + '<br />{a1}: {c1} ' + '<br />{a2}: {c2} '+'<br />{a3}: {c3}'
        formatter: theFormatter
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
        data: option.xAxis.data, 
        name: option.xAxis.name, 
        nameTextStyle: {
          color: axisColor
        },
        axisLine: {
          lineStyle: {
            show: true,
            color: axisColor
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

      yAxis:theyAxis,           
      series:theSeries
    }
  },

   thePie(option)
   {
      var theColors = lineColors;//['#FF6200', '#FFEE2B', '#84d5d8', '#c4ccd3','#2c8cf9']; //f8910c
      var theLegenddata = [];
      //var theSeries = [];
      //formatter: '{b0}' + option.xAxis.name + '<br/>{a0}: {c0} ' + '<br />{a1}: {c1} ' + '<br />{a2}: {c2} '+'<br />{a3}: {c3}'
       

    var legendOrient = 'horizontal';
    var legendLeft  = 'center';
    var legendTop  = 'bottom';

   if ('undefined' != typeof(option.legend))
    { 
     if ('undefined' != typeof(option.legend.orient))
                legendOrient = option.legend.orient;

     if ('undefined' != typeof(option.legend.left))
                legendLeft = option.legend.left;

     if ('undefined' != typeof(option.legend.top))
                legendTop = option.legend.top;
   }



      if ('undefined' != typeof(option.color))
        theColors = option.color;

      for(var i=0;i<option.series.pies.data.length;i++)    
        theLegenddata.push(option.series.pies.data[i].name);

      return {

          title: {
                text: option.title, // axis.title,
                left:'center',
                top:'top',
                padding: [0, 10, 0, 10],                             
                textStyle: {color: titleColor,fontSize: 16 }                
                               
          },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },


          legend: {
              orient: legendOrient,// 'vertical',horizontal
              left: legendLeft, //'auto' 'left', 'center', 'right'
              top:legendTop, //'auto' 'top', 'middle', 'bottom'
              icon: 'circle',
              data: theLegenddata, //['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
              textStyle: {
                  color: legendColor,//'#6597F5',
                  fontSize: 12
                }
          },
          color:theColors,
          series: [
              {
                  name: option.series.pies.name,//'访问来源',
                  type:'pie',
                  radius: option.series.pies.radius,//['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: true,
                           // formatter: '{b} : {c} ({d}%)',
                          formatter: '{d}%',
                          position: 'outside'  //inside  outside center
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '16',
                              formatter: '',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: true
                      }
                  },
                  // itemStyle:{ 
                  //           normal:{ 
                  //                 label:{ 
                  //                   show: true, 
                  //                   formatter: '{b} : {c} ({d}%)' 
                  //                 }, 
                  //                 labelLine :{show:true} 
                  //               } 
                  //           },
                  data: option.series.pies.data
              }
          ]
      };


   },


  
   theRing(data){
     let val=data.val,bfl=data.bfl,tName=data.tName,danwei=data.danwei;
     var title = "";
     if( typeof(data.title)!='undefined')
         title=data.title;
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
            title:title
        }
        var sub = 100-bfl

      return  {
            color: ['#85b6b2', '#6d4f8d','#cd5e7e', '#e38980','#f7db88'],
            tooltip : {
                show: false,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title: [
                  {
                    text: total.title,//option.title, // axis.title,
                    left:'center',
                    top:'top',
                    padding: [0, 10, 0, 10],                             
                    textStyle: {color: titleColor,fontSize: 16 }                
                                       
                  },
                  {
                   text: total.value + total.name,
                   left: '49%',
                   top: '48%',//'41%',
                   textAlign: 'center',
                   textBaseline: 'middle',
                   textStyle: {
                       color: titleColor,
                       fontWeight: 'normal',
                       fontSize: 30
                        }
                  }
                  // {  
                  //  text: total.name,
                  //  left: '49%',
                  //  top: '66%',
                  //  textAlign: 'center',
                  //  textBaseline: 'middle',
                  //  textStyle: {
                  //      color: titleColor,
                  //      fontWeight: 'normal',
                  //      fontSize: 12
                  //      }
                  //  }
               ],

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
                                                    color: ringColors[0] //'#3c7af1' // var ringColors = ['#8d59f8','#646390'];
                                                },
                                                {
                                                    offset: 0.5,
                                                    color: ringColors[0] //'#3c7af1'
                                                },
                                                {
                                                    offset: 1,
                                                    color: ringColors[0] //'#3c7af1'
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
                                    color:ringColors[1] //'#f5f7fa' //'#646390' //'#284591'
                                  }
                                }
                        },
                    ]
                }

            ]
        };
  }

  
 


}
