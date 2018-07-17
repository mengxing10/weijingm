/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'

class Shebeizichan extends Component {
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
                <div className ={classNames("charts-menu-item",{active:nameId=='jbxx'})} onClick={this.selectName.bind(this,'jbxx','jibenxinxi')}>
                    <span>基本信息</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='wbjh'})} onClick={this.selectName.bind(this,'wbjh','weibaojihua')}>
                    <span>计划管理</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='wbjl'})} onClick={this.selectName.bind(this,'wbjl','weibaojilu')}>
                    <span>维保记录</span>
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
   browserHistory.push('/bgp/pc/shebeizichan/' +  typeId + '?project=' + nameId )
}
};

export default connect(state => state, null)(Shebeizichan);
