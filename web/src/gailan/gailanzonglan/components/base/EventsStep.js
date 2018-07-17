/**
 * @file SVGIDMap SVGIDMap图表组件
 * @author qiaolf <qiao.l.f@outlook.com>
 */

import React, {Component} from 'react'
import * as d3 from 'd3'

export default class SVGIDMap extends Component {

    constructor(props) {
      super(props);
      this.state = {
        inter:0,


      }
    }

    render() {

      let {id, width, height}=this.props;

      return (
        <div id={id} style={{width: width, height: height , margin:"auto"}} ></div>
      )
    }

    componentDidUpdate(){
      let {data}=this.props;

      this.draw_id_svg(data);
    }

    componentDidMount(){
      let {data}=this.props;
      this.draw_id_svg(data);
    }
    componentWillUnmount() {

    }

    //Load the image data, and draw need  optimization
    //bg-svg: background svg
    //props: a hash map for id, text value and color
    draw_id_svg(data){

      const svg_container_id='#'+this.props.id

      d3.select(svg_container_id).selectAll("svg").remove();
    //   d3.select(svg_container_id).node().appendChild(
    //   d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').node()
    // );
    //
    let svgData = d3.select(svg_container_id).append("svg")
    .attr("width",1500)
    .attr("height", 108).style("margin-top", 50).style("margin-left", "auto")
    let jindu = svgData.append("g")
    let titles = svgData.append("g")
    let names = svgData.append("g")
    let times = svgData.append("g")
    let wid = data.length?svgData.attr("width")/(data.length)-18:svgData.attr("width")
    data.map((item,i)=>{
      let color = item.status?"#2cc2f9":"#5085c6"
      let linecolor = i<(data.length-1)&&data[i+1].status?"#2cc2f9":"#5085c6"
      let textColor = item.status?"#fff":"#5085c6"

      jindu.append("circle")
                  .attr("cx",67.78+i*wid).attr("cy",9.015)
                  .attr("r",0).style("fill", color).transition().delay(400*i).ease("linear").duration(400).attr("r",9.02)
      i<(data.length-1)&&jindu.append("rect").attr("x",67.78+i*wid+9.02).attr("y",7)
                  .attr("width",0).attr("height",4)
                  .style("fill", linecolor).transition().delay(400*i).ease("linear").duration(400).attr("width",wid)
      titles.append("text")
                  .attr("x",55+i*wid).attr("y",41)
                  .style("fill", textColor).transition().delay(400*i).ease("elastic").duration(400).text(item.title)
      names.append("text")
                  .attr("x",52+i*wid).attr("y",78)
                  .style("fill", textColor).transition().delay(400*i).ease("elastic").duration(400).text(item.name)
      times.append("text")
                  .attr("x",5+i*wid).attr("y",106)
                  .style("fill", textColor).transition().delay(400*i).ease("elastic").duration(400).text(item.time)
    })

   d3.select(svg_container_id).select("svg").attr('width','100%').attr('height','100%').node()

    }

  }
