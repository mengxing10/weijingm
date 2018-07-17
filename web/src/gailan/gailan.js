/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'


class Gailan extends Component {
      constructor(props) {
          super(props);

          this.state = {typeId:"zonglan",openMenu:false} ;
      }
      render() {
          const {query} = this.props.location
          let menus=[
            {name:'zonglan',text:'总览',haschild:false,address:'/bgp/pc/gailan/zonglan',openchild:true,value:[]},
            {name:'xiangmu',text:'项目',haschild:false,address:'/bgp/pc/gailan/xiangmu',openchild:true,value:[]},
            {name:'bengzu',text:'泵组',haschild:false,address:'/bgp/pc/gailan/bengzu',openchild:true,value:[]},
            {name:'shuibeng',text:'水泵',haschild:false,address:'/bgp/pc/gailan/shuibeng',openchild:true,value:[]}


            ]
          let {openMenu} = this.state
          let typeId = location.pathname.split('/')[4]
          if( typeof typeId ==  'undefined')   typeId =  'zonglan';

          return (
            <div className="per-content">
              <div className={classNames("charts-main-menus-icon",{active:openMenu})}
                onClick={::this.openMainMenu}></div>
              <div className={classNames("charts-main-menus",{active:!openMenu})}>
                <div   className ={classNames("charts-menu-item",{active:typeId=='zonglan'})}
                  onClick={this.selectType.bind(this,'zonglan')}>总览</div>
                <div    className ={classNames("charts-menu-item",{active:typeId=='xiangmu'})}
                  onClick={this.selectType.bind(this,'xiangmu')}>项目</div>
                <div    className ={classNames("charts-menu-item",{active:typeId=='bengzu'})}
                  onClick={this.selectType.bind(this,'bengzu')}>泵组</div>
                <div    className ={classNames("charts-menu-item",{active:typeId=='shuibeng'})}
                  onClick={this.selectType.bind(this,'shuibeng')}>水泵</div>
              </div>
              {this.props.children}
            </div>

          )
      }
      openMainMenu(){
        this.setState({openMenu:true})
      }
      selectType(typeId)
      {

        //alert(idx);
       //this.typeId = typeId;
        this.setState({typeId: typeId});
        browserHistory.push('/bgp/pc/gailan/' +  typeId )
        this.setState({openMenu:false})

      }



};


export default connect(state => state, null)(Gailan);
