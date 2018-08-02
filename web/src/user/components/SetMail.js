/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * @file Setpasswd component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'

export default class Setmail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            oldmail: '123456@163.com',
            newmail: '34576@163.com'

        }
    }

    render() {
        return (
            <div className="sp-wrap">
            <h3>设置邮箱</h3>
            <div className="sp-item">
            <h4>原邮箱</h4>
            <Input onChange={this.change.bind(this, 'oldmail')} defaultValue={this.props.oldmail}  />
            </div>
            <div className="sp-item">
            <h4>新邮箱</h4>
        <Input onChange={this.change.bind(this, 'newmail')} defaultValue={this.state.newmail}  />
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
        console.log(this.state)
    }

    exit() {
        const {exitcb_mail} = this.props;
        console.log(this.props)
        exitcb_mail && exitcb_mail();
    }

    confirm() {
        this.props.exitcb_mail && this.props.exitcb_mail(this.state);
        
    }
}
