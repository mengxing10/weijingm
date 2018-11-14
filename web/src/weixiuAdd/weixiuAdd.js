/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Tabbar from '../tabbar'
import Header from '../header'
import './styles/index.styl'
import UpImage from 'react-uplod-img'

class WeixiuAdd extends Component {
  constructor(props) {
      super(props);
      this.state = {
        imgList:[],
        imgListNames:[],
      } ;
  }
  render() {
    let {imgList,imgListNames} = this.state
    return(
      <div className="weixiuaddwrap">
        <Header title="新建工单" path="weixiu" backIcon="true" />
        <div className="container per_wrap">
          <div className="fenge"></div>
          <div className="weixiu-item1">
            <div className="title1">系统选择</div>
            <div className="title2">选择系统</div>
          </div>
          <div className="weixiu-item1">
            <div className="title1">设备选择</div>
            <div className="title2"></div>
          </div>
          <div className="weixiu-item1">
            <div className="title1">紧急程度</div>
            <div className="title2"></div>
          </div>
          <div className="fenge"></div>
          <div className="weixiu-item2">
            <div className="title1">标题</div>
            <div className="con1" contentEditable placeholder="最少输入6个字，最多输入15个字"></div>
          </div>
          <div className="fenge"></div>
          <div className="weixiu-item2 weixiu-item3">
            <div className="title1">问题描述</div>
            <div className="con1" contentEditable placeholder="最少输入6个字，最多输入50个字"></div>
          </div>
          <div className="fenge"></div>
          <div className="weixiu-item2 weixiu-item-img">
            {/* <div className="imgAdd">
              <img className="weixiu_img" src={require('./styles/img/icon001.png')} alt="" /><i className="closeBtn"></i>
            </div> */}
            {imgListNames&&imgListNames.map((item,i)=>{
              return (
                <div className="imgAdd" key={i}>
                  <img className="weixiu_img" src={imgList[i]} alt="" /><i className="closeBtn" onClick={this.clearFujian.bind(this,item)}></i>
                </div>
              )
            })}
            
            <div className="imgAdd">
              <img className="weixiu_img" src={require('./styles/img/icon001.png')} alt="" />
              <input type="file" className="img-input" onChange={this.uppic2.bind(this)} multiple= "true" />
              
            </div>
          </div>
        </div>
        <div className="weixiuadd-btn">提交</div>
      </div>
    )
  }
  //上传图片
  uppic2(ev){
    let file = ev.target
    if(typeof FileReader == "undefined"){
        alert("您的浏览器不支持FileReader对象！");
    }
    let {imgList,imgListNames} = this.state
    for(var intI=0;intI<file.files.length;intI++){
        var tmpFile = file.files[intI];
        var reader = new FileReader();//每循环一次都要重新new一个FileReader实例
        reader.onload=function(evt){
          // console.log(evt)
          // console.log(evt.target.result)
          imgList.push(evt.target.result)
        };
        reader.readAsDataURL(tmpFile);
        // console.log(tmpFile.name)
        imgListNames.push(tmpFile.name)
    }
    setTimeout(function(imgList,imgListNames,t){
      t.setState({imgList:imgList,imgListNames:imgListNames})
    }, 500,imgList,imgListNames,this);
  }
  clearFujian(fujianName){
    // console.log(fujianName); //文件名:
    let {imgList,imgListNames} = this.state;
    var index = imgListNames.indexOf(fujianName);   
    if (index > -1) {
        setTimeout(function(lists,listNames,index,t){
          imgList.splice(index, 1);
          imgListNames.splice(index, 1);
          t.setState({imgList:imgList})
          t.setState({imgListNames:imgListNames})
        }, 500,imgList,imgListNames,index,this);
    }
  }

  menuOptions(path){
    this.setState({menuId:path})
  }
  baojingc(){
    browserHistory.push(`/weijingm/baojingc`)
  }
};

export default connect(state => state, null)(WeixiuAdd);
