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
        //TODO: set the display properties here
        <div id={id} style={{width: width, height: height}} ></div>
      )
    }

    componentDidUpdate(){
      //Load and draw the svg from url, cache, need optimization
      let {svg, data}=this.props;

      this.draw_id_svg(svg, data);
    }

    componentDidMount(){
      //Load and draw the svg from url, cache, need optimization
      let {svg, data}=this.props;
      this.draw_id_svg(svg, data);
    }
    componentWillUnmount() {

    }

    //Load the image data, and draw need  optimization
    //bg-svg: background svg
    //props: a hash map for id, text value and color
    draw_id_svg(bg_svg, props){

      const svg_container_id='#'+this.props.id

      const data = props
      const max = data[4],min = data[3], val= data[1]

      let that= this
      d3.html(bg_svg,function(svgData){
        let height=d3.select(svgData).select("svg").attr("height")

        data.forEach((item,i)=>{
          let y = that.getCy(item,max,min,height)
          d3.select(svgData).select("#g"+i).attr("transform","translate(0,0)")
          .transition().ease("circle").duration(400)
          .attr("transform","translate(0,"+-y+")")
          }
        )

        if(data[1]>data[2]){
          d3.select(svgData).select("#s"+1).style("fill","#ed321f");
        }


        d3.select(svgData).select("#p1").text(val)
        d3.select(svgData).select("#p2").text(data[0])
        d3.select(svgData).select("#p3").text(data[2])






          d3.select(svg_container_id).select("svg").remove();
          d3.select(svg_container_id).node().appendChild(
          d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').node()
        );

      });
    }
    getCy(val,max,min,height){
      return (val-min)/(max-min)*height*0.8
    }
  }
