/**
 * @file SVGIDMap SVGIDMap图表组件
 * @author qiaolf <qiao.l.f@outlook.com>
 */

import React, {Component} from 'react'
import * as cubism from'cubism'
import './horizon.css'

export default class CudismPlot extends Component {

    constructor(props) {
      super(props);
    }

    render() {

      let {id, width}=this.props;

      return (
        //TODO: set the display properties here
//
// width={width} height={height}
        <div id={id} style={{width: width}} ></div>
      )
    }

    componentDidUpdate(){

      let {id,horizon_height,width,dates, labels, data_by_col}=this.props;


      this.cubism_plot(id,horizon_height,width,dates, labels, data_by_col);
    }

    componentDidMount(){

      let {id,horizon_height,width,dates, labels, data_by_col}=this.props;

      this.cubism_plot(id,horizon_height,width,dates, labels, data_by_col);
    }



    // function to make the plot
    cubism_plot(id,horizon_height,width,dates, labels, data_by_col){
    

        // dates from strings to proper dates
        // var format = d3.time.format("%Y-%m-%d");
        // dates = dates.map(function(d) { return(format.parse(d)) })
        //
        //简体中文本地化
        var zh = d3.locale({
            decimal: ".",
            thousands: ",",
            grouping: [3],
            currency: ["¥", ""],
            dateTime: "%a %b %e %X %Y",
            date: "%Y/%-m/%-d",
            time: "%H:%M:%S",
            periods: ["上午", "下午"],
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        });
        //svg宽，高
        // var width = 1000,height = 500;
        //时间比例尺
        var timeScale = d3.time.scale()
            .domain([dates[0], dates[dates.length-1]])
            .range([0, dates.length-1]);

        //时间轴
        // var axis = d3.svg.axis()
        // .scale(timeScale)
        // .tickFormat(zh.timeFormat("%Y年%b"))
        // .orient("bottom")
        //添加时间轴
        // range of data
        var ylim = [d3.min(data_by_col.map(function(d) { return(d3.min(d)) })),
                    d3.max(data_by_col.map(function(d) { return(d3.max(d)) }))]

        // gap in times
        var size =dates.length
        var gap = (+dates[1] - +dates[0])
        var axis_height = 30

        var dF = new Date(2015,1,1)
        var context = cubism.context()
            .serverDelay(size)
            .step(gap)
            .size(size)
            .stop();

        context.scale=timeScale
        var div = d3.select("div#"+id).style("width", width + "px")


        d3.selectAll(".horizon").call(context.horizon().remove).remove()

        d3.selectAll(".axis").call(context.axis().remove).remove();
        // d3.selectAll(".rule").call(context.rule().remove).remove();


        div.append("div")
            .attr("class", "rule")
            .call(context.rule());

        // top axis

        var top_axis = context.axis().orient("top").ticks(3).tickFormat(zh.timeFormat("%-m/%-d %H:%M"))
        var top_axis_svg = div.append("svg")
            .attr("width", width).attr("class", "top axis")
                          .attr("height", axis_height)
            .append("g")
            // top_axis.scale(timeScale)
        top_axis_svg.call(top_axis)



        // bottom axis
        // var bottom_axis = context.axis().orient("bottom").ticks(12)
        // var bottom_axis_svg = div.append("svg")
        //     .attr("width", width).attr("class", "bottom axis")
        //                   .attr("height", axis_height)
        //     .append("g")
        // bottom_axis_svg.call(bottom_axis)

        var Data = []
        for(let i=0; i<labels.length; i++) {
            Data.push(make_metric(data_by_col[i], labels[i]))
        }

        div.selectAll(".horizon")
            .data(Data)
            .enter().insert("div", ".bottom")
            .attr("class", "horizon")
            .call(context.horizon().height(horizon_height)
                  .extent(ylim).colors(["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"].reverse()) // adjust y-axis in each
                  .format(d3.format(".1f")));

        context.on("focus", function(i) {
            d3.selectAll(".value").style("right", i == null ? null : width - i  + "px");
        });

        function make_metric(vector, label) {
            return context.metric(function(start, stop, step, callback) {
                    callback(null, vector)
            }, label);
        }
    }



  }
