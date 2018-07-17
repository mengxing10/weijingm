/**
 * @file SVGIDMap SVGIDMap图表组件
 * @author qiaolf <qiao.l.f@outlook.com>
 */

import React, {Component} from 'react'
import * as d3 from 'd3'

export default class SVGIDMap extends Component {

    constructor(props) {
      super(props);
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

    //Load the image data, and draw need  optimization
    //bg-svg: background svg
    //props: a hash map for id, text value and color
    draw_id_svg(bg_svg, props){

      const svg_container_id='#'+this.props.id
      d3.html(bg_svg,function(svgData){



        //Replace all the data and set the color properties
        //Handle the tspan element, ignore the tref element for simplification
        //Also ignore the `complext tspan structure, e.g. rotate etc
        //All the replaceble element appear in the same tspan or text node

        props.forEach(function(item){
         //
            switch(item.valuetype){
              case 1:
                 d3.select(svgData).select("#p"+item.pointid).text(`${Math.round(item.value*100)/100} `)
                 break;
              case 2:
                  if(item.value==1) {d3.select(svgData).select("#s"+item.pointid).style("fill","#00ff00")
                  .selectAll("path,circle").style("fill","#00ff00")}
                  else if(item.value==0) {
                    d3.select(svgData).select("#s"+item.pointid).style("fill","#fa607e")
                    .selectAll("path,circle").style("fill","#fa607e")
                  }
                  break;
              case 3:
                  if(item.value==1) d3.select(svgData).select("#s"+item.pointid).style("fill","#fa607e")
                  .selectAll("path,circle").style("fill","#fa607e")
                  break;
              case 4:
                  if(item.value==1) d3.select(svgData).select("#s"+item.pointid).style("fill","#d7d20f")
                  .selectAll("path,circle").style("fill","#d7d20f")
                  break;
              case 5:
                  if(item.value==1) d3.select(svgData).select("#s"+item.pointid).style("fill","#36c0c8")
                  .selectAll("path,circle").style("fill","#36c0c8")
                  break;
            }




        })

        // d3.select(svgData).select("#ch1_runing").style("fill","#16c9c3")
        // d3.select(svgData).selectAll("text").each(function(){
        //
        //   //Only handle the text without tspan
        //
        //   // if(this.childElementCount==0){
        //
        //
        //       let key=d3.select(this).id;
        //
        //
        //       if(props.hasOwnProperty(key)){
        //
        //         // let tcolor=props[key]["color"]?props[key]["color"]:"#16c9c3";
        //         let txt=props[key];
        //
        //         d3.select(this).text(txt);
        //         // d3.select(this).attr("fill",tcolor).text(txt);
        //
        //       //console.log(this.innerHTML);
        //
        //     }
        //
        //   // }
        // })
        //
        // //scan for the tspan elements
        // d3.select(svgData).selectAll("tspan").each(function(){
        //   //console.log(this.innerHTML);
        //   //duplated code, improve
        //   let key=d3.select(this).text();
        //     if(props.hasOwnProperty(key)){
        //
        //
        //       // let tcolor=props[key]["color"]?props[key]["color"]:"#16c9c3";
        //       let txt=props[key];
        //
        //
        //
        //       d3.select(this).text(txt);
        //
        //       // d3.select(this).attr("style","fill:"+tcolor).text(txt);
        //       // d3.select(this).attr("fill",tcolor).text(txt);
        //
        //     //console.log(this.innerHTML);
        //
        //   }
        // })


        //Append the svg content to the container
          d3.select(svg_container_id).select("svg").remove();

          // d3.select("svg").remove();
          d3.select(svg_container_id).node().appendChild(
          //Fix with 100%, and container sizde determine the
          d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').node()
          //F
          // d3.select(svgData).select("svg").attr('width','100%').attr('height','100%').attr("transform", "rotate(-90)").node()
        );

      });
    }
  }
