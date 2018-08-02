/**
 * Created by JEEP on 2017-04-26.
 */
/**
 * @file Setpasswd component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'

export default class SetParams extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dianjia: '2342',
            shuijia: '3453'

        }
    }

    render() {
        return (
            <div className="sp-wrap">
            <h3>参数设置</h3>
            <div className="sp-item">
            <h4>电价</h4>
            <Input onChange={this.change.bind(this, 'dianjia')} defaultValue={this.state.dianjia}  />
            </div>
            <div className="sp-item">
            <h4>水价</h4>
            <Input onChange={this.change.bind(this, 'shuijia')} defaultValue={this.state.shuijia}  />
            </div>
            <div onClick={::this.confirm} className="sp-btn">
            <span>保存</span>
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
        const {exitcb_parmas} = this.props;
        console.log(this.props)
        exitcb_parmas && exitcb_parmas();
    }



    componentWillMount() {
      // let id=1;
      // let params ={id:id}
      // const{getUserDetail} = this.props
      // getUserDetail(params)
      //调用查询接口，显示参数设置值：

    }


    confirm() {

        // 调用保存接口：
        this.props.exitcb_parmas && this.props.exitcb_parmas(this.state);
        
    }
}
