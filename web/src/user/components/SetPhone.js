/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * @file Setpasswd component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'

export default class Setphone extends Component {

    constructor(props) {
        super(props)

        this.state = {
            oldphone: '123456789',
            newphone: '145623445'

        }
    }

    render() {
        return (
            <div className="sp-wrap">
            <h3>设置手机号</h3>
            <div className="sp-item">
            <h4>原手机号</h4>
            <Input onChange={this.change.bind(this, 'oldphone')} defaultValue={this.props.oldphone} type="passpord" />
            </div>
            <div className="sp-item">
            <h4>新手机号</h4>
            <Input onChange={this.change.bind(this, 'newphone')} defaultValue={this.state.newphone} type="passpord" />
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
        const {exitcb_phone} = this.props;
        console.log(this.props)
        exitcb_phone && exitcb_phone();
    }

    confirm() {
        this.props.exitcb_phone && this.props.exitcb_phone(this.state);
    }
}
