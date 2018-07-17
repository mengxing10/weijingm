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

      let {id, width, height ,goNewPage}=this.props;

      return (
        //TODO: set the display properties here
        <div id={id} style={{width: width, height: height}} ></div>
      )
    }

    componentDidUpdate(){
        // this.draw_new_svg()
    }

    componentDidMount(){
      this.draw_new_svg()
    }
    draw_new_svg(){
      // d3.timer(function(){
      let inter = this.state.inter
      clearInterval(inter)
      let that = this
      inter = setInterval(function () {
        let {svg, data}=that.props;
        that.draw_id_svg(svg, data);
      },1000)
       this.setState({inter:inter})

    }
    componentWillUnmount() {
      let inter = this.state.inter
      clearInterval(inter)
    }

    //Load the image data, and draw need  optimization
    //bg-svg: background svg
    //props: a hash map for id, text value and color
    draw_id_svg(bg_svg, data){

      const svg_container_id='#'+this.props.id
      const goNewPage = this.props.goNewPage

      const smallIds = new Array(12).fill(1).map((item,i)=>("b1-"+i))
      const filters = ["#filter-5","#filter-7","#filter-8","#filter-3",
                      "#filter-4","#filter-6","#filter-2","#filter-9"]
      const bengzu = ["3","tiaojie","4","qifu","6-1","6-2","zong-1","zong-2","28-1","28-2","38"]

      d3.html(bg_svg,function(svgData){

        //闪烁动作
        smallIds.forEach(function(item,i){
            d3.select(svgData).select("#"+item).transition().ease("circle").duration(400+i*5).attr("r", 10)
            .transition().ease("circle").duration(400+i*5).attr("r", 8)
        })
        //变色动作

        data.forEach(function(iitem,i){

           let key = `#s${i+1}`
           let keyb = `#b1-${i+1}`
           // console.log(iitem);
           // d3.select(svgData).select(key).selectAll('circle').style("fill","#00ff00")
            if(iitem==1){//1为黄色正常
                d3.select(svgData).select(key).selectAll('circle').style("fill","#fbf938");
                d3.select(svgData).select(filters[i]).select("[result=flood]").attr("flood-color","#fffe02");
                d3.select(svgData).select(filters[i]).select("[result=flood-2]").attr("flood-color","#fffd10");

            }else{//0为故障
              d3.select(svgData).select(key).selectAll('circle').style("fill","#ff6058");
              d3.select(svgData).select(filters[i]).select("[result=flood]").attr("flood-color","#ff4e00");
              d3.select(svgData).select(filters[i]).select("[result=flood-2]").attr("flood-color","#ff5f5f");
            }
        })
        //跳转页面动作
          bengzu.forEach(function(iitem,i){
            let key = `#t${i+1}`
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
