/**
 * @file Circle 图表组件
 * @author zlc <lichao9182@126.com>
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
                  onEvents={EventsDict}
                  style={style}
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
              left:"6%",
              top:"15%",
              right:"5%",
              bottom:"5%",

            },
            xAxis: {
                type: 'category',
                data: xdata,
                splitArea: {
                    show: false
                },
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
                axisTick:{
                  inside:true,
                },
                splitArea: {
                    show: false
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
                    {value: 1, label: '维修计划', color: '#f5b054'},
                    {value: 2, label: '保养计划', color: '#090'}
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
