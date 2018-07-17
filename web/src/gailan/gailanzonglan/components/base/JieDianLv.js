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
      const max = 95,min = 50, max1 = 27,min1 = 0,
      v0= props[1],v1= props[2],v2= props[0],v3=props[3]

      let that= this
      d3.html(bg_svg,function(svgData){
        let width=d3.select(svgData).select("#gAll").attr("width")


        let g0 = that.getCx(v0,max,min,width)
        let g1 = that.getCx(v1,max,min,width)
        let g2 = that.getCx(v2,max,min,width)
        let g3 = that.getCx(v3,max1,min1,width)

        d3.select(svgData).select("#g0").attr("transform","translate(0,0)")
        .transition().delay(200).ease("linear").duration(200)
        .attr("transform","translate("+g0+",0)")
        d3.select(svgData).select("#g1").attr("transform","translate(0,0)")
        .transition().delay(400).ease("linear").duration(200)
        .attr("transform","translate("+g1+",0)")
        d3.select(svgData).select("#g2").attr("transform","translate(0,0)")
        .transition().delay(600).ease("linear").duration(200)
        .attr("transform","translate("+g2+",0)")
        d3.select(svgData).select("#g3").attr("transform","translate(0,0)")
        .transition().delay(800).ease("linear").duration(200)
        .attr("transform","translate("+g3+",0)")

          d3.select(svg_container_id).select("svg").remove();
          d3.select(svg_container_id).node().appendChild(
          d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').style('margin-top','30px').node()
        );

      });
    }
    getCx(val,max,min,width){
      return width-(val-min)/(max-min)*width
    }
  }
