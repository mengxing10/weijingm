/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Menus from '../common/components/Menus'

class Baobiao extends Component {
      constructor(props) {
          super(props);
      }
      render() {

        let menus=[
          {name:'qushi',text:'节能趋势',haschild:false,address: `/bgp/pc/baobiao/qushi`,openchild:true,value:[]},
          {name:'report',text:'节能报表',haschild:false,address: `/bgp/pc/baobiao/report`,openchild:false,value:[]},
          ]


          const {query} = this.props.location
          return (
            <div className="per-content">
              <Menus menus={menus}/>
              {this.props.children}
            </div>

          )
      }



};


export default connect(state => state, null)(Baobiao);
