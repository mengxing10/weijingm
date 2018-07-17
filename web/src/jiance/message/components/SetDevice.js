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

export default class SetDevice extends Component {

    constructor(props) {
        super(props)
        this.device = {"name":"冷却塔","model":"NC8402QAN4FPK","number":4,"manufacturer": '斯必克冷却技术(苏州)有限公司',"madedate": '2016.06'};
        

        this.state = {
            oldphone: 'NC8402QAN4FPK',
            newphone: '冷却塔'

        }
    }

    render() {

        const {device} = this.props;
 

        return (
            <div className="device-wrap">
            <h3>设备详情</h3>
            <div className="device-item">
            <h4>名称</h4>
            <Input onChange={this.change.bind(this, 'oldphone')} defaultValue={this.device.name}   />
            </div>
            <div className="device-item">
            <h4>型号</h4>
            <Input onChange={this.change.bind(this, 'newphone')} defaultValue={this.device.model}   />
            </div>


            <div className="device-item">
            <h4>台数</h4>
            <Input onChange={this.change.bind(this, 'newphone')} defaultValue={this.device.number}   />
            </div>

            <div className="device-item">
            <h4>制造厂商</h4>
            <Input onChange={this.change.bind(this, 'newphone')} defaultValue={this.device.manufacturer}   />
            </div>


            <div className="device-item">
            <h4>出厂日期</h4>
            <Input onChange={this.change.bind(this, 'newphone')} defaultValue={this.device.madedate}   />
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
        const {exitSet_device} = this.props;
        console.log(this.props)
        exitSet_device && exitSet_device();
    }

    confirm() {
        this.props.exitSet_device && this.props.exitSet_device(this.state);
    }
}
