/**
 * @file Circle 图表组件
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

export default class LineAndBar extends Component {

    constructor(props) {
        super(props)
        this.state={
          prenum:0,
        }
    }

    render() {
        let {xdata,maxValue,interval,legends,serdata,style} = this.props
        var colors = ['#cf0','#3ff', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

        return (
            <div onClick={::this.cb} >
                <ReactEcharts ref='rightChart'
                  option={::this.getMapOption(xdata,maxValue,interval,legends,serdata)}
                  style={style}
                className='dayele' />
            </div>
        )
    }

    cb() {
        this.props.cb && this.props.cb(this.props.index)
    }


    getMapOption(xdata,maxValue,interval,legends,serdata)
    {
        return {
            color:['#cf0','#3ff', '#0f0', '#d48265', '#c9f',  '#f0f', '#bda29a','#6e7074', '#546570', '#c4ccd3','#ff9'],
            tooltip: {
                show:true,
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },
            },
            dataZoom: [{
                startValue: '2017-05-1',
                y:'84%'
            }, {
                type: 'inside'
            }],
            grid:{
              bottom:'25%'
            },
            legend: {
                data:legends,
                y:'94%'
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
                axisPointer:{
                  type:'shadow'
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '个数',
                    min: 0,
                    max: maxValue,
                    interval: interval,
                    axisLine:{
                      lineStyle:{
                        color:'#fff'
                      }
                    }
                },
                {
                    type: 'value',
                    name: '工时/人·天',
                    min: 0,
                    max: maxValue,
                    interval: interval,
                    axisLine:{
                      lineStyle:{
                        color:'#fff'
                      }
                    }
                }
            ],
            series: serdata
        }
    }
componentWillUpdate(nextprops) {
}
componentDidMount() {
}
}
