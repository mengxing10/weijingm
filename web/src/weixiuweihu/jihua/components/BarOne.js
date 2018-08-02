/**
 * @file Circle 图表组件
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

export default class BarOne extends Component {

    constructor(props) {
        super(props)
        this.state={
          prenum:0,
        }
    }

    render() {
        let {xdata,ydata,legends,style,data} = this.props
        var colors = ['#cf0','#3ff', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

        return (
            <div onClick={::this.cb} >
                <ReactEcharts ref='rightChart'
                  option={::this.getMapOption(xdata,ydata,legends,data)}
                  style={style}
                className='dayele' />
            </div>
        )
    }

    cb() {
        this.props.cb && this.props.cb(this.props.index)
    }


    getMapOption(xdata,ydata,legends,data)
    {
        return {
            color:['#2fd0e3'],
            tooltip: {
                show:true,
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,1)',
                padding: [5, 10],
                textStyle: {
                    color: '#7588E4',
                },
            },

            legend: {
                data:legends
            },
            xAxis: {
                type: 'category',
                data: xdata,
                axisTick:{
                  interval:0,
                  inside:true
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
                    name: '工时/天',
                    axisLine:{
                      lineStyle:{
                        color:'#fff'
                      }
                    }
                }
            ],
            series: data
        }
    }
componentWillUpdate(nextprops) {
}
componentDidMount() {
}
}
