/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
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
            // menus:[  {name:'project',text:'项目',haschild:true,address:'/bgp/pc/nengxiao/weixiu2',openchild:true,
            //                  value:[
            //                         {name:'p1',text:'沙日召',selected:false},
            //                         {name:'p2',text:'沙日召',selected:false},
            //                         {name:'p3',text:'沙日召',selected:true}
            //                  ]
            //                 },
            //                 {name:'project',text:'项目4',haschild:true,address:'/bgp/pc/nengxiao/weixiu2',openchild:false,
            //                                  value:[
            //                                         {name:'p1',text:'沙日召',selected:false},
            //                                         {name:'p2',text:'沙日召',selected:false},
            //                                         {name:'p3',text:'沙日召',selected:true}
            //                                  ]
            //                                 },
            //           {name:'project1',text:'项目2',haschild:false,address:'/bgp/pc/nengxiao/weixiu2',openchild:false,
            //             value:[]
            //                },
            //         ] ▼ 
            menus:this.props.menus,
          }
      }
      render() {
         const {menus} = this.state
          
          return (
                <div className="charts-menu-2">
                    <div className="charts-menu-head"></div>
                    {
                      menus.map((item,i)=>(
                        <div key={i} className={classNames("charts-menu-list")}>
                          <div onClick ={this.menuClick.bind(this,i,item.address,item.haschild)} className ={classNames("charts-menu-item",{active:item.openchild})}>
                            <span>{item.text}
                              <dd className ={classNames({active:item.haschild})}>&or;</dd>
                            </span>
                          </div>
                          <div className={classNames("charts-menu-item-child",{active:item.openchild})}>
                          {item.value.map((iitem,j)=>(
                            <div key={j} className={classNames({active:iitem.selected})}  onClick ={this.itemClick.bind(this,i,j,item.address,iitem.name)} >
                            <span>{iitem.text}</span>
                            </div>
                          ))}
                          </div>
                        </div>

                      ))
                    }

                </div>


          )
      }

      inverseMenu(){
        const {openMenu}= this.state
        this.setState({openMenu:!openMenu})
      }
      menuClick(i,address,haschild){
        let {menus} = this.state
        menus.forEach((item,j)=>menus[j].openchild=false)
        menus[i].openchild=true

        this.setState({menus:menus})
        browserHistory.push(address)

      }
      itemClick(i,j,address,name){
        let {menus} = this.state
        menus[i].value.forEach((item,z)=>{ menus[i].value[z]["selected"]=false})
        menus[i].value[j]["selected"]=true
        this.setState({menus:menus})
        browserHistory.push(`${address}?project=${name}`)
      }



};
