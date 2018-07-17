/**
 * @file Footer component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import './index.styl'
export default class Footer extends Component {

  constructor(props) {
      super(props)
      this.state = {
        now:new Date(),
        int:''
      }
  }

  render() {

    const textstyle = {
        //'lineHeight':(document.documentElement.clientHeight>901?90:50)+'px'
        'lineHeight': '40px'

    }
    const footerstyle ={
     // 'paddingBottom':(document.documentElement.clientHeight>901?110:0)+'px'
        'paddingBottom': '0px'
    }
      // let now = this.state.now
      // let year=now.getFullYear();
      // let month = now.getMonth()+1;
      //   if(month<10) month = '0' + month;
      // let day = now.getDate();
      //     if(day<10) day = '0' + day;
      // let hours = now.getHours();
      //     if(hours<10) hours = '0' + hours;
      // let minutes = now.getMinutes();
      //     if(minutes<10) minutes = '0' + minutes;
      // let seconds = now.getSeconds();
      //     if(seconds<10) seconds = '0' + seconds;
      let timenow=sessionStorage.getItem('lastDate')
      return (
          <div className="mainfooter" style={footerstyle}>
              <p style={textstyle}>浙江瀚普智慧科技有限公司</p>
              <span style={textstyle}>{timenow}</span>
          </div>
      )
  }
  componentDidMount() {
    let i=setInterval(function () {
      this.setState({now:new Date()})
    }.bind(this),1000);
    this.setState({int:i})
  }

  componentWillUnmount() {
    let int = this.state.int
    clearInterval(int)
  }
}
