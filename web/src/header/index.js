/**
 * @file Header component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Icon, Dropdown, Input} from 'semantic-ui-react'
import {Link, browserHistory} from 'react-router'
import {RiseModal,DropModal,Toast} from 'boron'
import classNames from 'classnames'
import './index.styl'
import Cookies from 'universal-cookie'
import SetParams from '../user/components/SetParams'
const cookies = new Cookies();
export default class Header extends Component {



    constructor(props) {
        super(props)

        this.state = {
            searchv: "",
            showMenus:[1,2,3,4,5].map(item=>{return false})
          }

    }

    render() {
        const cpath = location.pathname.split('/')[3]
        const isReport = cpath == 'report'

        const isHome = cpath == 'home'
        const isBaobiao = cpath == 'baobiao'
        const isNengxiao = cpath == 'nengxiao'
        const isJiankang = cpath == 'jiankang'

        const isAnalysis = cpath == 'analysis'
        const isYunwei = cpath == 'yunwei'
        const isUser = cpath == 'user'
        const isAlarm = cpath == 'xiaoxi'


        const cpath2 = location.pathname.split('/')[3]
        const isDevice = cpath2 == 'device'
        const isWarn = cpath2 == 'warn'
        const isXunjian = cpath2 == 'xunjian'
        const isWeixiu = cpath2 == 'weixiu'
        const isBaoxiu = cpath2 == 'baoxiu'
        const isPslist = cpath2 == 'pslist'
        const isCrud = cpath2 == 'crud'
        const isPeizhi = cpath2 == 'peizhi'

        const isGailan = cpath2 == 'gailan'
        const options = [
          {
            key: '系统概览',
            text: '系统概览',
            value: 'gailan',
            content: '系统概览',
          },

          {
            key: '系统监测',
            text: '系统监测',
            value: 'jiance',
            content: '系统监测',
          },
          {
            key: '维修维护',
            text: '维修维护',
            value: 'weixiuwh',
            content: '维修维护',
          },
          {
            key: '抄表结算',
            text: '抄表结算',
            value: 'chaobiaojiesuan',
            content: '抄表结算',
          },
          {
            key: '分析报表',
            text: '分析报表',
            value: 'fenxi',
            content: '分析报表',
          },

          {
            key: '设备资产',
            text: '设备资产',
            value: 'shebeizichan',
            content: '设备资产',
          },
          {
            key: '系统配置',
            text: '系统配置',
            value: 'peizhi',
            content: '系统配置',
          },
          {
            key: '退出系统',
            text: '退出系统',
            value: 'login',
            content: '退出系统',
          }

        ]

        let mitem = "mitem"
        let mitemshebei = "mitemshebei"


        return (
            <div className="pumpheader theheader">
                <h1>
                    <p>
                        <span className ="title">包钢智慧泵站云平台</span>
                    </p>
                </h1>
                <Dropdown value={cpath2}
                  onChange={::this.changeMenu}
                  className="theMenu"
                  icon ="align left"
                  inline options={options} />
                <div className={classNames('usericon', {active: isUser})} onClick={this.direact.bind(this, 'user')}></div>
                <div className={classNames('alarmicon', {active: isAlarm}, {newalarm:true })} onClick={this.direact.bind(this, 'xiaoxi')}></div>




            </div>
        )
    }





changeMenu(event,object)
{


   var selMenu = object.value;
    if(selMenu == 'login')   cookies.remove("isLogin")
   this.direact(selMenu);

}
  jumpmoniter2(isView,numId,link){


     window.open("/bgp/pc/jiankong/demo.html");


  }
    jumpmoniter(isView,numId,link){
      if(isView){
        const showMenus = this.state
        let pathname = location.pathname
        let search = location.search
        if(search.indexOf("menusEn")>0){

          if(!showMenus[numId]){
            search=search.replace('menusEn=false','menusEn=true')
          }else{
            search=search.replace('menusEn=true','menusEn=false')

          }
          showMenus[numId]=!showMenus[numId]
          this.setState({showMenus:showMenus})
        }else{
          if(search)
            search+='&menusEn=true'
          else {
            search+='?menusEn=true'

            }
          showMenus[numId]=true
          this.setState({showMenus:showMenus})
        }
        browserHistory.push(`${pathname}${search}`);
      }else{
        browserHistory.push(link);
      }

    }


      sichange(ev){
        this.setState({
          searchv: ev.target.value
        })
      }

     skeydown(ev) {
        if(ev.keyCode===13){

          this.setState({
            searchv: ev.target.value
          })
          browserHistory.push(`/bgp/pc/search?query=${this.state.searchv}`);
      }
    }


    direact(path) {
        browserHistory.push(`/bgp/pc/${path}`)
        // window.location.href=`/ecloud/${path}`
    }

    logout(){
        cookies.remove("isLogin")

        browserHistory.push(`/bgp/pc/login`)


    }



    exitcb_parmas(mod) {
        console.log('----mod: ', mod);
        this.refs.setmail.hide();
        const {setmail} = this.props
        // TODO ajax 保存密码
        if (mod) {
            var params=mod
            setmail(params)
        }
    }



    setParam()
    {

       this.refs.setmail.show()
    }

}
