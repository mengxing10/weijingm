/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'
import './styles/index.styl'
import Swiper from '../common/swiper/swiper.js'
import swipercss from '../common/swiper/swipercss.css'

class Shipin extends Component {
  constructor(props) {
      super(props);
      this.state = {
        vid:'q0531vjcw93',
      } ;
  }
  render() {
    let list = [1,2,3,4,5],types=['推荐','变频器','冷机','冷塔','电机','其它',]
    const datalist = [{'key':'1','name':'西门子变频器调试教程','time':'2018-2-1','num':'25:05','vid':'q0531vjcw93'},
      {'key':'2','name':'变频器安装说明','time':'2018-2-1','num':'46:06','vid':'v01575crm6i'},
      {'key':'3','name':'变频器原理介绍','time':'2018-2-1','num':'20:06','vid':'n0623x7c1jh'},
    ]
    return(
      <div>
        <div className="shipin-head">
          <div className="head_iconleft" onClick={this.direact.bind(this,'home')}></div>
          <div className="head_title">视频</div>
          <div className="head_rig"></div>
        </div>
        <div className="shipinwrap per_wrap">
          <div className="shipin-ss">
            <label className="ss-input-w foc">
              <input className="ss-input" />
            </label>
          </div>
          <div className="shipin-menu">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <span className="menu-name active">推荐</span>
                </div>
                {types.map((item,i)=>{
                  return (
                    <div className="swiper-slide" key={i} >
                      <span className="menu-name">{item}</span>
                    </div>
                  )
                })}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="fenge"></div>
          <div className="shipin-body">
            <div className="shipin-item">
              <div className="item-top"></div>
              <div className="item-bottom">西门子变频器参数设置和实操训练</div>
            </div>
            {datalist&&datalist.map((item,i)=>{
              return (
                <div className="shipin-item" key={i}>
                  <div className="item-top"></div>
                  <div className="item-bottom">{item.name}</div>
                </div>
              )
            })}
            {datalist&&datalist.map((item,i)=>{
              return (
                <div className="shipin-item" key={i}>
                  <div className="item-top"></div>
                  <div className="item-bottom">{item.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    var swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 5,
      autoplay:false,
      effect : 'slide',
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      //
      // },
    });
    this.playv(this.state.vid);
    
  }
  
  direact(path) {
    if(path == 'login')   cookies.remove("isLogin")
    browserHistory.push(`/weijingm/${path}`)
  }
  playv(vid){
    var video = new tvp.VideoInfo();
    video.setVid(vid);//视频vid v01575crm6i,n0623x7c1jh,r0018hmh1pa
    var player = new tvp.Player('100%','100%');//视频高宽
    player.setCurVideo(video);
    player.addParam("adplay",0);//是否播放广告；1播放，0不播放，默认为1
    player.addParam("autoplay",0);//是否自动播放，1为自动播放，0为不自动播放
    player.addParam("showend","0");
    //player.addParam("wmode","transparent");
    //player.addParam("pic","http://ossweb-img.qq.com/images/roco/act/a20120925movie/video_pic.jpg");//默认图片地址
    player.addParam("flashskin", "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");//是否调用精简皮肤，不使用则删掉此行代码
    player.write("videoCon");
  }
};
export default connect(state => state, null)(Shipin);
