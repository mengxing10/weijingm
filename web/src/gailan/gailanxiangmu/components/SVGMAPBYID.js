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
      let that = this
      // d3.timer(function(){


      let inter = setInterval(function () {
        that.draw_id_svg(svg, data);
      },1200)
       this.setState({inter:inter})
      // })
    }
    componentWillUnmount() {
      let inter = this.state.inter
      clearInterval(inter)
    }

    //Load the image data, and draw need  optimization
    //bg-svg: background svg
    //props: a hash map for id, text value and color
    draw_id_svg(bg_svg, props){

      const svg_container_id='#'+this.props.id

      const smallIds = new Array(13).fill(1).map((item,i)=>("c1-"+i))
      const bigIds = new Array(13).fill(1).map((item,i)=>("c2-"+i))
      const largeIds = new Array(13).fill(1).map((item,i)=>("c3-"+i))
      const bengzu = ['28-1','28-2','38-all']
      const goNewPage = this.props.goNewPage


      d3.html(bg_svg,function(svgData){
        smallIds.forEach(function(item){
            d3.select(svgData).select("#"+item).transition().duration(200).style("opacity",0.0)
            .transition().duration(800).style("opacity",1.0);
        })
        bigIds.forEach(function(item){
            d3.select(svgData).select("#"+item).transition().duration(400).style("opacity",0.0)
            .transition().duration(1000).style("opacity",1.0);
        })
        largeIds.forEach(function(item){
            d3.select(svgData).select("#"+item).transition().duration(600).style("opacity",0.0)
            .transition().duration(1200).style("opacity",1.0);
        })
        bengzu.forEach(function(iitem,i){
          let key = `#s${i+1}`
          d3.select(svgData).select(key).attr("cursor","pointer").on("click", function(d) {
                  if(goNewPage){goNewPage(iitem)}
            })
          })





          d3.select(svg_container_id).select("svg").remove();
          d3.select(svg_container_id).node().appendChild(
          d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').node()
        );

      });
    }
  }
