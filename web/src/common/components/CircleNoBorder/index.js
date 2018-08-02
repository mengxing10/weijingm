/**
 * @file Circle 图表组件
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import classNames from 'classnames'
import CountUp from 'react-countup';
import './circle.styl'

export default class Circle extends Component {

    constructor(props) {
        super(props)

        this.state={
          prenum:0,
        }
    }

    render() {





        let {width, height, title, num, unit, index, active} = this.props

        index = index == undefined ? 1 : index

        return (
            <div onClick={::this.cb} className={classNames("circle-wrap", {active: active})}>
                <h3>{title}</h3>
                <div className="circle-view" style={{width: width + 'px', height: height + 'px'}}>
                    <canvas width={width} height={height} id={`canvas-${index}`}></canvas>
                    <p><CountUp start={this.state.prenum} end={num} decimals={1} duration={3} /></p>
                    <span>{unit}</span>
                </div>
            </div>
        )
    }

    cb() {
        this.props.cb && this.props.cb(this.props.index)
    }

    // componentDidMount() {
    //   let devicePixelRatio = window.devicePixelRatio || 1
    //   let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    //       ctx.backingStorePixelRatio || 1
    //   let ratio = devicePixelRatio / backingStoreRatio
    //
    //
    //
    //   if (devicePixelRatio !== backingStoreRatio) {
    //       canvas.width = width * ratio
    //       canvas.height = height * ratio
    //
    //       canvas.style.width = width + 'px'
    //       canvas.style.height = height + 'px'
    //       ctx.scale(ratio, ratio)
    //
    //   }
    // }
    // shouldComponentUpdate(nextprops,nextstate){
    //
    //   return nextprops.end!=this.props.end ||
    // }

    componentWillUpdate(nextprops) {

      if(nextprops.end!=this.props.end||nextprops.num!=this.props.num){
        this.setState({prenum:this.props.num})

      let {bgColor, end, lineWidth, index} = nextprops

      index = index == undefined ? 1 : index

      end = Math.min(2, Math.max(0, end))

      let canvas = document.getElementById('canvas-' + index)

      let ctx = canvas.getContext('2d')
      let width = canvas.width
      let height = canvas.height

      let x = width / 2
      let y = height / 2


      let imgfill = ctx.createLinearGradient(0,0,175,50);
          imgfill.addColorStop(0,"#04fdf7");
          imgfill.addColorStop(0.5,"#7ffd53");
          imgfill.addColorStop(1,"#f5cb07");

      // 取消自适应操作
      // let devicePixelRatio = window.devicePixelRatio || 1
      // let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
      //     ctx.backingStorePixelRatio || 1
      // let ratio = devicePixelRatio / backingStoreRatio
      //
      //
      //
      // if (devicePixelRatio !== backingStoreRatio) {
      //     canvas.width = width * ratio
      //     canvas.height = height * ratio
      //
      //     canvas.style.width = width + 'px'
      //     canvas.style.height = height + 'px'
      //     ctx.scale(ratio, ratio)
      //
      // }

      drawArc(0, 2, bgColor)

      drawArc(0.505, end + 0.5)

      function drawArc(start, end, color) {
          ctx.beginPath()
          if (color) {
              ctx.strokeStyle = color
          }
          else {
              ctx.strokeStyle = imgfill
          }
          // console.log(x,' ' ,y, '' ,lineWidth);
          ctx.lineCap = 'round'
          ctx.lineWidth = lineWidth
          ctx.arc(x, y, x - lineWidth / 2, start * Math.PI, end * Math.PI, false)
          ctx.stroke()
      }
    }
  }

  componentDidMount() {
    let {bgColor, end, lineWidth, index} = this.props

    index = index == undefined ? 1 : index

    end = Math.min(2, Math.max(0, end))

    let canvas = document.getElementById('canvas-' + index)

    let ctx = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height

    let x = width / 2
    let y = height / 2

    let imgfill = ctx.createLinearGradient(0,0,175,50);
        // imgfill.addColorStop(0,"#04fdf7");
        // imgfill.addColorStop(0.5,"#7ffd53");
        // imgfill.addColorStop(1,"#f5cb07");
        
        // 2017.12.26 update
        imgfill.addColorStop(0,"#2ad4d9");
        imgfill.addColorStop(0.5,"#2ad4d9");
        imgfill.addColorStop(1,"#2ad4d9");

    // 取消自适应操作
    // let devicePixelRatio = window.devicePixelRatio || 1
    // let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    //     ctx.backingStorePixelRatio || 1
    // let ratio = devicePixelRatio / backingStoreRatio
    //
    //
    //
    // if (devicePixelRatio !== backingStoreRatio) {
    //     canvas.width = width * ratio
    //     canvas.height = height * ratio
    //
    //     canvas.style.width = width + 'px'
    //     canvas.style.height = height + 'px'
    //     ctx.scale(ratio, ratio)
    //
    // }

    drawArc(0, 2, bgColor)

    drawArc(0.505, end + 0.5)



    function drawArc(start, end, color) {
        ctx.beginPath()
        if (color) {
            ctx.strokeStyle = color
        }
        else {
            ctx.strokeStyle =imgfill
        }
        // console.log(x,' ' ,y, '' ,lineWidth);
        ctx.lineCap = 'round'
        ctx.lineWidth = lineWidth
        ctx.arc(x, y, x - lineWidth / 2, start * Math.PI, end * Math.PI, false)
        ctx.stroke()
    }


}

}
