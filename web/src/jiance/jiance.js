/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'

class Yunweiguanli extends Component {
      constructor(props) {
          super(props);

           this.state = {typeId:"monitor",nameId:'28'} ;

      }
      render() {
          const {query} = this.props.location
          let {typeId,nameId} = this.state
          typeId = location.pathname.split('/')[4]
          nameId = location.search.split('=')[1]
           //monitor?project=28
          if( typeof typeId ==  'undefined')   typeId =  'monitor';
          if( typeof nameId ==  'undefined')   nameId =  '28';

          return (
            <div className="per-content theBody" >
              <div className="charts-menu-list2">
                <div  className ={classNames("charts-menu-item",{active:typeId=='monitor'})} onClick={this.selectType.bind(this,'monitor')}>
                  <span>实时监测</span></div>
                <div   className ={classNames("charts-menu-item",{active:typeId=='warn'})} onClick={this.selectType.bind(this,'warn')}>
                  <span>系统报警</span></div>
                <div   className ={classNames("charts-menu-item",{active:typeId=='quxian'})} onClick={this.selectType.bind(this,'quxian')}>
                  <span>趋势曲线</span></div>

            </div>
              <div className="right-content">
                  <div className="right-menus">
                  {/* <span  className ={classNames("mitem",{active:typeId=='xiaoxi'})} onClick={this.selectType.bind(this,'xiaoxi')}>消息</span> */}

                      <div className ={classNames("mitem",{active:nameId=='28'})} onClick={this.selectName.bind(this,'28')}>
                      <span>28/38泵站</span>
                  </div>
                  <div className ={classNames("mitem",{active:nameId=='3'})} onClick={this.selectName.bind(this,'3')}>
                      <span>3/4泵站</span>
                  </div>
                  <div className ={classNames("mitem",{active:nameId=='6'})} onClick={this.selectName.bind(this,'6')}>
                      <span>综合泵站</span>
                  </div>

                </div>
                  {this.props.children}

              </div>
            </div>

          )
      }

selectName(nameId)
{
  if(nameId==28){
    this.setState({nameId: nameId});
    browserHistory.push('/bgp/pc/jiance/' +  this.state.typeId + '?project=' + nameId )
  }else{

  }


}
selectType(typeId)
{

  //alert(idx);
 //this.typeId = typeId;
  this.setState({typeId: typeId});
  browserHistory.push('/bgp/pc/jiance/' +  typeId + '?project=' + this.state.nameId)

}

};


export default connect(state => state, null)(Yunweiguanli);
