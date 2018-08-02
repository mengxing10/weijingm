/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import React, {Component, PropTypes} from 'react'
import { Icon } from 'semantic-ui-react'

import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import fastclick from 'fastclick'
import classNames from 'classnames'

import './styles/index.styl'


export default class Menus extends Component {
      constructor(props) {
          super(props);
          this.state = {
              openMenu:true,
              menuActive:[true,false,false,false,false,false,false,false],
              itemlist:[{name:"全部",query:"all",active:true},
                            {name:"28/38泵站",query:"28",active:false},
                            {name:"3/4泵站",query:"3",active:false},
                            {name:"综合泵站",query:"6",active:false}],


          }
      }
      render() {

        const {openMenu,menuActive,itemlist} = this.state
        const address=[
          `/bgp/pc/yunwei/monitor`,
          `/bgp/pc/yunwei/xiaoxi`,
          `/bgp/pc/yunwei/warn`,
          `/bgp/pc/yunwei/xunjian`,
          `/bgp/pc/yunwei/device`,
          `/bgp/pc/yunwei/weixiu`,
          `/bgp/pc/yunwei/baoxiu`,
        ]
          return (
                <div className="charts-menu">
                    <div  className={classNames("charts-menu-list",{active:openMenu})}>
                      <div onClick ={this.menuClick.bind(this,0,address[0])}className ={classNames("charts-menu-item",{active:menuActive[0]})}>
                        <Icon  size='big'>
                        <svg
                         xmlns="http://www.w3.org/2000/svg">
                         <path id="泵站概览" class="cls-1" d="M7297,4041v1h4v2h-23v-5h3v-1h-1v-1h-3v-2h3v-1h1v-3h-1v-1h4v1h-1v8h1v3h9v-1h-5v-11h14v11h-5Zm-3,2h2v-2h-2v2Zm6-11h-10v1h10v-1Zm0,3h-10v1h10v-1Zm0,3h-10v1h10v-1Zm-19-9h-1v-1h1v-2h2v2h1v1h-3Zm5,9v-1h-2v-2h2v-1h1v4h-1Zm7-12h4v3h-4v-3Zm-13,12h3v1h-3v-1Z" transform="translate(-7277 -4026)"/>
                        </svg>
                      </Icon>
                        <span>泵站监测</span>
                          <div className={classNames("charts-menu-item-child",{active:menuActive[0]})}>
                          {itemlist.map((item,i)=>(
                            <span key={i} onClick ={this.itemClick.bind(this,i,address[0],item.query)} className={classNames({active:item.active})}>{item.name}</span>
                          ))}
                          </div>
                      </div>
                      <div onClick ={this.menuClick.bind(this,1,address[1])}className ={classNames("charts-menu-item",{active:menuActive[1]})}>
                        <Icon  size='big'>
                        <svg
                         xmlns="http://www.w3.org/2000/svg">
                        <path id="实时消息" class="cls-1" d="M7297.97,4094l-6.97,3.99-6.97-3.99H7279v-13h24v13h-5.03Zm-13.97-8a2,2,0,1,0,2,2A2.006,2.006,0,0,0,7284,4086Zm7,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,7291,4086Zm7,0a2,2,0,1,0,2,2A2.006,2.006,0,0,0,7298,4086Z" transform="translate(-7279 -4081)"/>
                      </svg>
                      </Icon>
                        <span>实时消息</span>
                      </div>
                      <div onClick ={this.menuClick.bind(this,2,address[2])}className ={classNames("charts-menu-item",{active:menuActive[2]})}>
                        <Icon  size='big'>
                        <svg
                         xmlns="http://www.w3.org/2000/svg">
                        <path id="报警消息_" data-name="报警消息 " class="cls-1" d="M7298.06,4164h-17.12a0.939,0.939,0,0,1-.94-0.94v-0.12a0.939,0.939,0,0,1,.94-0.94h17.12a0.939,0.939,0,0,1,.94.94v0.12A0.939,0.939,0,0,1,7298.06,4164Zm-5.52-16.28,1.58-2.54,0.85,0.53-1.58,2.54Zm1.46,4.78v8.5h-9v-8.5a3.5,3.5,0,0,1,3.5-3.5h2A3.5,3.5,0,0,1,7294,4152.5Zm-4-.5h-1v5h1v-5Zm0,6h-1v1h1v-1Zm-1-14h1v3h-1v-3Zm-5,1.51,0.69-.52,1.3,2.49-0.69.52Z" transform="translate(-7280 -4144)"/>
                        </svg>
                      </Icon>
                        <span>报警信息</span>
                          <div className={classNames("charts-menu-item-child",{active:menuActive[2]})}>
                          {itemlist.map((item,i)=>(
                            <span key={i} onClick ={this.itemClick.bind(this,i,address[2],item.query)} className={classNames({active:item.active})}>{item.name}</span>
                          ))}
                          </div>
                      </div>
                      <div onClick ={this.menuClick.bind(this,3,address[3])}className ={classNames("charts-menu-item",{active:menuActive[3]})}>
                        <Icon size='big'>
                        <svg xmlns="http://www.w3.org/2000/svg">
                          <path id="圆角矩形_3134" data-name="圆角矩形 3134" class="cls-2" d="M7293.7,4225h-13.4a1.306,1.306,0,0,1-1.3-1.28h0v-1.42a1.279,1.279,0,0,1,.56-1.04l0.83-3.69a2.686,2.686,0,0,1,2.79-2.56h1.4c1.54,0,2.52,1.67,3.07,2.56,0.33,0.54,1.47,2.2,2.33,3.43h2.54l-0.45-1.09a0.737,0.737,0,0,1,.16-0.8,0.36,0.36,0,0,1,.57.21l0.69,1.68h0.21a1.3,1.3,0,0,1,1.3,1.3v1.4A1.3,1.3,0,0,1,7293.7,4225Zm-5.81-.77-2.74-3.98a0.674,0.674,0,0,0-.83-0.18,0.46,0.46,0,0,0-.22.69l2.74,3.98a0.679,0.679,0,0,0,.83.19A0.47,0.47,0,0,0,7287.89,4224.23Z" transform="translate(-7279 -4206)"/>
                          <path id="矩形_3137" data-name="矩形 3137" class="cls-2" d="M7293.31,4213l7.69,4.94-2.31,4.06-7.69-4.94Zm0.3,2.01,5.39,3.17-2.61,4.82-5.39-3.18Z" transform="translate(-7279 -4206)"/>
                        </svg>
                      </Icon>
                        <span>系统巡检</span>
                          <div className={classNames("charts-menu-item-child",{active:menuActive[3]})}>
                          {itemlist.map((item,i)=>(
                            <span key={i} onClick ={this.itemClick.bind(this,i,address[3],item.query)} className={classNames({active:item.active})}>{item.name}</span>
                          ))}
                          </div>

                      </div>
                      <div className ={classNames("charts-menu-item",{active:menuActive[4]})}
                           onClick ={this.menuClick.bind(this,4,address[4])}>
                          <Icon size='big'>
                          <svg
                           xmlns="http://www.w3.org/2000/svg">
                           <path id="设备信息" class="cls-1" d="M7288,4274v-1h11v1h-11Zm2-8h8v6h-8v-6Zm2,5h4v-1h-4v1Zm0-3h4v-1h-4v1Zm-4-3v2h-2v5h-4v-17h12v10h-6Zm1-8h-5v1h5v-1Zm0,2h-5v1h5v-1Zm1,2h-6v1h6v-1Zm-1,10h-1v-1h-1v-2h1v-1h1v4Z" transform="translate(-7282 -4255)"/>
                           </svg>
                        </Icon>
                        <span>设备信息 <Icon  name = "angle down" size='large' /></span>
                          <div className={classNames("charts-menu-item-child",{active:menuActive[4]})}>
                          {itemlist.map((item,i)=>(
                            <span key={i} onClick ={this.itemClick.bind(this,i,address[4],item.query)} className={classNames({active:item.active})}>{item.name}</span>
                          ))}
                          </div>
                      </div>
                      <div className ={classNames("charts-menu-item",{active:menuActive[5]})}
                           onClick ={this.menuClick.bind(this,5,address[5])}>
                          <Icon size='big'>
                          <svg
                           xmlns="http://www.w3.org/2000/svg">
                          <path id="维修信息" class="cls-1" d="M7294,4325.82V4329h-2v-3.18a2.988,2.988,0,0,1,0-5.64V4323h2v-2.82A2.988,2.988,0,0,1,7294,4325.82Zm-6-1.82a6,6,0,0,0,.83,3H7282v-17h12v8A6,6,0,0,0,7288,4324Zm1-12h-5v1h5v-1Zm0,2h-5v1h5v-1Zm1,2h-6v1h6v-1Z" transform="translate(-7282 -4310)"/>
                        </svg>
                        </Icon>
                        <span>维修信息 <Icon  name = "angle down" size='large' /></span>
                          <div className={classNames("charts-menu-item-child",{active:menuActive[5]})}>
                          {itemlist.map((item,i)=>(
                            <span key={i} onClick ={this.itemClick.bind(this,i,address[5],item.query)} className={classNames({active:item.active})}>{item.name}</span>
                          ))}
                          </div>
                      </div>
                      <div className ={classNames("charts-menu-item",{active:menuActive[6]})}
                           onClick ={this.menuClick.bind(this,6,address[6])}>
                          <Icon size='big'>
                          <svg
                           xmlns="http://www.w3.org/2000/svg">
                          <path id="报修信息" class="cls-1" d="M7295.61,4511.77l-4.84,4.87a1.047,1.047,0,0,1-1.49.11,1.09,1.09,0,0,1,.11-1.51l4.83-4.87a1.059,1.059,0,0,1,1.5-.11A1.09,1.09,0,0,1,7295.61,4511.77ZM7281,4517v-17h12v9.12l-7.88,7.88H7281Zm7-15h-5v1h5v-1Zm0,2h-5v1h5v-1Zm1,2h-6v1h6v-1Zm0.01,12.22-2,.79,0.78-2.02Z" transform="translate(-7281 -4500)"/>
                        </svg>
                        </Icon>
                        <span>报修信息 <Icon  name = "angle down" size='large' /></span>
                          <div className={classNames("charts-menu-item-child",{active:menuActive[6]})}>
                          {itemlist.map((item,i)=>(
                            <span key={i} onClick ={this.itemClick.bind(this,i,address[6],item.query)} className={classNames({active:item.active})}>{item.name}</span>
                          ))}
                          </div>
                      </div>

                      <div onClick={::this.inverseMenu}  className={classNames("charts-menu-innerbutton")}></div>
                    </div>
                    <div onClick={::this.inverseMenu} className={classNames("charts-menu-button",{active:!openMenu})}></div>
                </div>


          )
      }

      inverseMenu(){
        const {openMenu}= this.state
        this.setState({openMenu:!openMenu})
      }
      menuClick(i,address){

        const {menuActive} = this.state
        if(!menuActive[i]){
        menuActive.fill(false)
        menuActive[i]=true
        this.setState({menuActive:menuActive})
        browserHistory.push(address)
        }

      }
      itemClick(i,address,query){
        
        let {itemlist} = this.state
        itemlist.forEach((item,j)=>{if(i!=j){itemlist[j]["active"]=false}})
        itemlist[i]["active"]=true
        this.setState({itemlist:itemlist})
          browserHistory.push(`${address}?project=${query}`)
      }



};
