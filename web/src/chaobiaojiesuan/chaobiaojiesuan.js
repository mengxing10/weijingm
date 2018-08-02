/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames'

class Chaobiaojiesuan extends Component {
      constructor(props) {
          super(props);
           this.typeId = "gongdan";
           this.state = {typeId:"chaobiao",nameId:'cbd'} ;
      }
      render() {
          const {query} = this.props.location
          let {typeId,nameId} = this.state
           typeId = location.pathname.split('/')[4]
           nameId = location.search.split('=')[1]
           //chaobiao?project=cb
           if( typeof typeId ==  'undefined')   typeId =  'chaobiaodan';
          if( typeof nameId ==  'undefined')   nameId =  'cbd';

          //http://localhost:8089/bgp/pc/chaobiaojiesuan/chaobiao?project=cb

          return (
            <div className="per-content theBody">

              <div className="charts-menu-list2">

                <div className ={classNames("charts-menu-item",{active:nameId=='cbd'})} onClick={this.selectName.bind(this,'cbd','chaobiaodan')}>
                    <span>抄表单</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='jsd'})} onClick={this.selectName.bind(this,'jsd','jiesuandan')}>
                    <span>结算单</span>
                </div>
              </div>
              <div className="right-content tposition">
                  {this.props.children}
              </div>
            </div>
          )
      }
selectName(nameId,typeId)
{
   this.setState({nameId: nameId,typeId:typeId});
   browserHistory.push('/bgp/pc/chaobiaojiesuan/' +  typeId + '?project=' + nameId )
}
};

export default connect(state => state, null)(Chaobiaojiesuan);
