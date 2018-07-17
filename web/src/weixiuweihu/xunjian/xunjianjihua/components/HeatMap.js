/**
 * @file Circle 图表组件
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

export default class HeatMap extends Component {

    constructor(props) {
        super(props)
        this.state={
          prenum:0,
        }
    }

    render() {
        let {xdata,ydata,style,data,EventsDict} = this.props
        var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                      '7a', '8a', '9a','10a','11a',
                      '12p', '1p', '2p', '3p', '4p', '5p',
                      '6p', '7p', '8p', '9p', '10p', '11p'];
        var days = ['Saturday', 'Friday', 'Thursday','Wednesday', 'Tuesday', 'Monday', 'Sunday'];

       // var data = [[0,0,1],[1,1,1],[2,2,2],[3,3,3],[2,4,3],[4,5,3],[5,6,3]];


        return (
            <div onClick={::this.cb} >
                <ReactEcharts ref='rightChart'
                  option={::this.getMapOption(xdata,ydata,data)}
                  style={style} onEvents={EventsDict}
                className='dayele' />
            </div>
        )
    }

    cb() {
        this.props.cb && this.props.cb(this.props.index)
    }


    getMapOption(xdata,ydata,data)
    {
        return {
            tooltip: {
                show:false,
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },

            },
            grid:{
              show:true,
              top:'16%',
              left:'8%',
              right:0,
              bottom:0,
              borderColor:'#fff',
              borderWidth:2
            },
            xAxis: {
                type: 'category',
                data: xdata,
                position:'top',
                axisTick:{
                  interval:0,
                  inside:true,
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff'
                  }
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:['#fff']
                  }
                }
            },
            yAxis: {
                type: 'category',
                data: ydata,
                max:7,
                axisTick:{
                  inside:true,
                },
                inverse:true,
                axisLine:{
                  lineStyle:{
                    color:'#fff'
                  }
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color:['#fff']
                  }
                }
            },
            visualMap: {
                type:'piecewise',
                calculable: true,
                orient: 'horizontal',
                pieces: [
                    {value: 1, label: '已完成', color: '#090'},
                    {value: 2, label: '未完成', color: '#f5b054'},
                    {value: 3, label: '未填写', color: '#c9c9c9'}
                ],
                right: '15%',
                top: '1%',
                textStyle:{
                  color:'#fff'
                }
            },
            series: [{
                name: '',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        }
    }
componentWillUpdate(nextprops) {
}
componentDidMount() {
}
}
