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

      //const data = [0.2,0.34,0.6]
      const max = 1,min = 0, val= props

      let that= this
      d3.html(bg_svg,function(svgData){
          let width=d3.select(svgData).select("#g0").attr("width")


          let x = that.getCx(val,max,min,width)
          d3.select(svgData).select("#g1").attr("transform","translate(0,0)")
          .transition().ease("circle").duration(400)
          .attr("transform","translate("+x+",0)")
          d3.select(svgData).select("#p1").text(val*100+'%')

          d3.select(svg_container_id).select("svg").remove();
          d3.select(svg_container_id).node().appendChild(
          d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').node()
        );

      });
    }
    getCx(val,max,min,width){
      return (val-min)/(max-min)*width
    }
  }
