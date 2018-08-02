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

class Daibangongzuo extends Component {
      constructor(props) {
          super(props);

           this.typeId = "gongdan";

           this.state = {typeId:"gongdan",nameId:'28'} ;

      }
      render() {

       // var rightContent  =  window.innerWidth;

          // var rightContent = {
          //  width: (window.innerWidth  ) + 'px'
          // }



          const {query} = this.props.location
          let {typeId,nameId} = this.state


           typeId = location.pathname.split('/')[4]

           nameId = location.search.split('=')[1]

           //monitor?project=28
           if( typeof typeId ==  'undefined')   typeId =  'monitor';

          if( typeof nameId ==  'undefined')   nameId =  '28';


          //alert( nameId);

          //http://localhost:8089/bgp/pc/yunwei/monitor?project=28
          let menus=[
                {name:'28',text:'28/38泵站',haschild:false,address:'/bgp/pc/weixiuwh/'+  typeId + '?project=28',openchild:false, value:[]},
                {name:'3',text:'3/4泵站',haschild:false,address:'/bgp/pc/weixiuwh/'+  typeId + '?project=3',openchild:false, value:[]},
                {name:'6',text:'综合泵站',haschild:false,address:'/bgp/pc/weixiuwh/warn?project=28',openchild:false, value:[]},
            ]

          return (
            <div className="per-content theBody">

              <div className="charts-menu-list2">
                <div className ={classNames("charts-menu-item",{active:nameId=='db'})} onClick={this.selectName.bind(this,'db','daiban')}>
                    <span>待办</span><i className="num_tips">99+</i>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='yb'})} onClick={this.selectName.bind(this,'yb','yiban')}>
                    <span>已办</span>
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
   browserHistory.push('/bgp/pc/daibangongzuo/' +  typeId + '?project=' + nameId )

}
};


export default connect(state => state, null)(Daibangongzuo);
