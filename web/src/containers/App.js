/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import Cookies from 'universal-cookie';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../common/index.styl';
// import * as actions from '../actions'
import Header from '../header'
import Footer from '../footer'


const cookies = new Cookies();

class App extends Component {
      constructor(props) {
          super(props);
          this.state={}
      }
      render() {
        return (
            <div className="per">{this.props.children}</div>
        )
      }
    componentWillMount() {
      const isLogin = cookies.get("isLogin")?true:false

      const {prod, pcompare, login} = this.props;
      const path = window.location.pathname.substr(1).split('/')[1];
      const pc = window.location.pathname.substr(1).split('/')[0];

      if ( path == 'login' && isLogin) {
        browserHistory.push('/weijingm/home')
      }
      if (!isLogin) {
        browserHistory.push('/weijingm/login')
      }
    }
};
export default connect(state => state, null)(App);
