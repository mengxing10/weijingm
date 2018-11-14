/**
 * @file Header component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Icon, Dropdown, Input} from 'semantic-ui-react'
import {Link, browserHistory} from 'react-router'
import {RiseModal,DropModal,Toast} from 'boron'
import classNames from 'classnames'
import './index.styl'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {title,path,backIcon} = this.props
        return (
          <div className="home-head">
            <div className={classNames("head_iconleft",{head_iconleft_show:backIcon=="true"})} onClick={this.direact.bind(this,path)}></div>
            <div className="head_title">{title}</div>
          </div>
        )
    }

    

    direact(path) {
      if(path == 'login')   cookies.remove("isLogin")
      browserHistory.push(`/weijingm/${path}`)
    }

}
