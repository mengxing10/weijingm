/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {Checkbox} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Tabbar from '../tabbar'
import Header from '../header'
import './styles/index.styl'

class WeixiuPj extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showCar:false
      } ;
  }
  render() {
    let list = [1,2,3,4,5,6,7,7,8]
    let {showCar} = this.state
    return(
      <div className="weixiupjwrap">
        <Header title="使用配件" path="weixiuhf" backIcon="true" />
        <div className="pj-container">
          <div className="pj-item">
            <div className="left"><label className="checkbox" onClick={this.toggleCheckbox.bind(this)}></label></div>
            <div className="right">
              <div className="center">
                <div className="center-top">叶轮</div>
                <div className="center-bottom">型号：ssc</div>
              </div>
              <div className="right-r">
                <div className="add">+</div><input type="number" value="0"/><div className="sub">-</div>
              </div>
            </div>
          </div>
          {list&&list.map((item,i)=>{
            return (
              <div className="pj-item" key={i}>
                <div className="left"><label className="checkbox" onClick={this.toggleCheckbox.bind(this)}></label></div>
                <div className="right">
                  <div className="center">
                    <div className="center-top">叶轮</div>
                    <div className="center-bottom">型号：ssc</div>
                  </div>
                  <div className="right-r">
                    <div className="add">+</div><input type="number" value={item}/><div className="sub">-</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="weixiupj-footer">
          <div className="footer-left">123件<div className="list-icon" onClick={this.toggleCar.bind(this)}></div></div>
          <div className="footer-right">确认</div>
        </div>
        <div className={classNames("shopCar",{dpn:!showCar})}>
          <div className="pj-item-car">
            <div className="right">
              <div className="center">
                <div className="center-top">叶轮</div>
                <div className="center-bottom">型号：ssc</div>
              </div>
              <div className="right-r">
                <div className="add">+</div><input type="number" value="0"/><div className="sub">-</div>
              </div>
            </div>
          </div>
          {[1,2,3,4,5].map((item,i)=>{
            return (
              <div className="pj-item-car" key={i}>
                <div className="right">
                  <div className="center">
                    <div className="center-top">叶轮</div>
                    <div className="center-bottom">型号：ssc</div>
                  </div>
                  <div className="right-r">
                    <div className="add">+</div><input type="number" value="0"/><div className="sub">-</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className={classNames("shopCar_bg",{dpn:!showCar})}></div>
      </div>
    )
  }
  toggleCar(){
    this.setState({showCar:!this.state.showCar})
  }
  toggleCheckbox(e){
    if(e.target.getAttribute("class").indexOf('blue')>-1){
      e.target.classList.remove("blue")
    }else{
      e.target.classList.add("blue")
    }
  }
  baojingc(){
    browserHistory.push(`/weijingm/baojingc`)
  }
};

export default connect(state => state, null)(WeixiuPj);
