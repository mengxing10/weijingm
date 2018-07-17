/**
 * @file Setpasswd component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'

export default class Setpasswd extends Component {

    constructor(props) {
        super(props)

        this.state = {
            oldpwd: 'aa',
            newpwd: '123456789',
            cfmpwd: '123456789'
        }
    }

    render() {
        return (
            <div className="sp-wrap">
                <h3>设置密码</h3>
                <div className="sp-item">
                    <h4>原密码</h4>
                    <Input  onChange={this.change.bind(this, 'oldpwd')} defaultValue={this.props.oldpwd} type="password" />
                </div>
                <div className="sp-item">
                    <h4>新密码：建议不少于6位</h4>
                    <Input onChange={this.change.bind(this, 'newpwd')} defaultValue={this.state.newpwd} type="password" />
                </div>
                <div className="sp-item">
                    <h4>确认密码：建议不少于6位</h4>
                    <Input onChange={this.change.bind(this, 'cfmpwd')} defaultValue={this.state.cfmpwd} type="password" />
                </div>
                <div onClick={::this.confirm} className="sp-btn">
                    <span>确认</span>
                </div>
                <div onClick={::this.exit} className="sp-ext"></div>
            </div>
        )
    }

    change(type, ev) {
        this.setState({[type]: ev.target.value})
        console.log()
    }

    exit() {
        const {exitcb_passwd} = this.props;
console.log(this.props)
        exitcb_passwd && exitcb_passwd();
    }

    confirm() {
        this.props.exitcb_passwd && this.props.exitcb_passwd(this.state);
    }
}
