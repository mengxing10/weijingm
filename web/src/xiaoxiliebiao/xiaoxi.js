/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'

class Xiaoxi extends Component {
      constructor(props) {
          super(props);
           this.typeId = "gongdan";
           this.state = {typeId:"chaobiao",nameId:'cb'} ;
      }
      render() {
          const {query} = this.props.location
          let {typeId,nameId} = this.state
           typeId = location.pathname.split('/')[4]
           nameId = location.search.split('=')[1]
           //chaobiao?project=cb
           if( typeof typeId ==  'undefined')   typeId =  'chaobiao';
          if( typeof nameId ==  'undefined')   nameId =  'cb';

          //http://localhost:8089/bgp/pc/chaobiaojiesuan/chaobiao?project=cb

          return (
            <div className="per-content theBody">

              <div className="charts-menu-list2">
                <div className ={classNames("charts-menu-item",{active:nameId=='dbtx'})} onClick={this.selectName.bind(this,'dbtx','daibantixing')}>
                    <span>待办提醒</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='yxbj'})} onClick={this.selectName.bind(this,'yxbj','daibantixing')}>
                    <span>运行报警</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='nxzd'})} onClick={this.selectName.bind(this,'nxzd','daibantixing')}>
                    <span>能效诊断</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='gzzd'})} onClick={this.selectName.bind(this,'gzzd','daibantixing')}>
                    <span>故障诊断</span>
                </div>
              </div>
              <div className="right-content">
                  {this.props.children}
              </div>
            </div>
          )
      }
selectName(nameId,typeId)
{
   this.setState({nameId: nameId,typeId:typeId});
   browserHistory.push('/bgp/pc/xiaoxi/' +  typeId + '?project=' + nameId )
}


};

export default connect(state => state, null)(Xiaoxi);
