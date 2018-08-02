/**
 * Created by JEEP on 2017-04-25.
 */
/**
 * @file Setpasswd component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'

export default class Setusername extends Component {

    constructor(props) {
        super(props)

        this.state = {
            oldname: '周某',
            newname: '周某某'

        }
    }

    render() {
        return (
            <div className="sp-wrap">
            <h3>设置用户名</h3>
            <div className="sp-item">
            <h4>原用户名</h4>
            <Input onChange={this.change.bind(this, 'oldname')} defaultValue={this.props.oldname} type="passpord" />
            </div>
            <div className="sp-item">
            <h4>新用户名</h4>
        <Input onChange={this.change.bind(this, 'newname')} defaultValue={this.state.newname} type="passpord" />
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
    }

    exit() {
        const {exitcb_name} = this.props;

        exitcb_name && exitcb_name();
    }

    confirm() {
        this.props.exitcb_name && this.props.exitcb_name(this.state);
    }
}
