/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Menus from '../common/components/Menus'
import classNames from 'classnames'

class Peizhi extends Component {
      constructor(props) {
          super(props);

           this.typeId = "jiance";

           this.state = {typeId:"jiance",nameId:'biaoge'} ;

      }
      render() {

          const {query} = this.props.location

          let typeId = location.pathname.split('/')[4]

          let nameId = location.pathname.split('/')[5]

          if( typeof typeId ==  'undefined')   typeId =  'jiance';

          if( typeof nameId ==  'undefined')   nameId =  'biaoge';
          let jiance = (
            <div className="right-menus">
            <div className ={classNames("mitem",{active:nameId=='biaoge'})}
              onClick={this.selectName.bind(this,'biaoge')}>
                <span>表格管理</span>
            </div>
            <div className ={classNames("mitem",{active:nameId=='cedian'})}
              onClick={this.selectName.bind(this,'cedian')}>
                <span>测点管理</span>
            </div>
            <div className ={classNames("mitem",{active:nameId=='jisuan'})}
              onClick={this.selectName.bind(this,'jisuan')}>
                <span>计算管理</span>
            </div>
            <div className ={classNames("mitem",{active:nameId=='tbdata'})}
              onClick={this.selectName.bind(this,'tbdata')}>
                <span>数据管理</span>
            </div>
          </div>

          )

          let yewu = (
            <div className="right-menus">
            <div className ={classNames("mitem",{active:nameId=='biaoge'})}
              onClick={this.selectName.bind(this,'biaoge')}>
                <span>表格管理</span>
            </div>
            <div className ={classNames("mitem",{active:nameId=='tbdata'})}
              onClick={this.selectName.bind(this,'tbdata')}>
                <span>数据管理</span>
            </div>
          </div>

          )


          return (
            <div className="per-content theBody">
              <div className="charts-menu-list2">
                <div   className ={classNames("charts-menu-item",{active:typeId=='jiance'})}
                  onClick={this.selectType.bind(this,'jiance')}>监测数据</div>
                <div    className ={classNames("charts-menu-item",{active:typeId=='yewu'})}
                  onClick={this.selectType.bind(this,'yewu')}>业务数据</div>
              </div>


              <div className="right-content">
                {typeId=="jiance"?jiance:yewu}
                  {this.props.children}

              </div>
            </div>

          )
      }

selectName(nameId)
{
   this.setState({nameId: nameId});
   browserHistory.push('/bgp/pc/peizhi/' +  this.state.typeId + '/' + nameId )

}
selectType(typeId)
{

  //alert(idx);
 //this.typeId = typeId;
  this.setState({typeId: typeId});
  browserHistory.push('/bgp/pc/peizhi/' +  typeId + '/' + this.state.nameId)

}

};


export default connect(state => state, null)(Peizhi);
