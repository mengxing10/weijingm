/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'


class Fenxi extends Component {
  constructor(props) {
      super(props);

       this.state = {typeId:"bengzhan",nameId:'all'} ;

  }
  render() {
      const {query} = this.props.location
      let typeId = location.pathname.split('/')[4]
      let nameId = location.search.split('=')[1]
       //monitor?project=28
      if( typeof typeId ==  'undefined')   typeId =  'bengzhan';
      if( typeof nameId ==  'undefined')   nameId =  'all';
      let nengxiaomenu =(
        <div className="right-menus">
          <div className ={classNames("mitem",{active:nameId=='all'})} onClick={this.selectName.bind(this,'all')}>
              <span>全部</span>
          </div>
          <div className ={classNames("mitem",{active:nameId=='28'})} onClick={this.selectName.bind(this,'28')}>
              <span>28/38泵站</span>
          </div>
        {/*  <div className ={classNames("mitem",{active:nameId=='3'})} onClick={this.selectName.bind(this,'3')}>
              <span>黄河泵站</span>
          </div>
          <div className ={classNames("mitem",{active:nameId=='6'})} onClick={this.selectName.bind(this,'6')}>
              <span>综合泵站</span>
          </div>*/}

          </div>)

      return (
        <div className="per-content theBody">
          <div className="charts-menu-list2">
            <div  className ={classNames("charts-menu-item",{active:typeId=='bengzhan'})}
              onClick={this.selectType.bind(this,'bengzhan')}>
              <span>能效分析</span></div>

            <div   className ={classNames("charts-menu-item",{active:typeId=='guzhangyuce'})}
               onClick={this.selectType.bind(this,'guzhangyuce')}>
              <span>健康分析</span></div>
            <div   className ={classNames("charts-menu-item",{active:typeId=='jiankanggailan'})}
               onClick={this.selectType.bind(this,'jiankanggailan')}>
              <span>运维分析</span></div>
            {/*<div   className ={classNames("charts-menu-item",{active:typeId=='dabiao'})}
               onClick={this.selectType.bind(this,'dabiao')}>
              <span>达标分析</span></div>
              <div  className ={classNames("charts-menu-item",{active:typeId=='shuibeng'})}
                onClick={this.selectType.bind(this,'shuibeng')}>
                <span>水泵效率</span></div>

            <div   className ={classNames("charts-menu-item",{active:typeId=='nengxiaofenxi'})}
               onClick={this.selectType.bind(this,'nengxiaofenxi')}>
              <span>能效分析</span></div>*/}

        </div>
          <div className="right-content">
              {nengxiaomenu}
              {this.props.children}

          </div>
        </div>

      )
  }

  selectName(nameId)
  {
  this.setState({nameId: nameId});
  browserHistory.push('/bgp/pc/fenxi/' +  this.state.typeId + '?project=' + nameId )

  }
  selectType(typeId)
  {

  //alert(idx);
  //this.typeId = typeId;
  this.setState({typeId: typeId});
  browserHistory.push('/bgp/pc/fenxi/' +  typeId + '?project=' + this.state.nameId)

  }


};

export default connect(state => state, null)(Fenxi);
