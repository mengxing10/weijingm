/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
import './view.styl'


class Moniter extends Component {
      constructor(props) {
          super(props);

      }
      render(){


    return (
              <div className='body'>
                  <div className='gfymanage'>
                    {this.props.children}
                  </div>
              </div>


          )
      }



};

// function mapDispatchToProps (dispatch) {
//     return bindActionCreators(actions.default, dispatch);
// }

export default connect(state => state, null)(Moniter);
