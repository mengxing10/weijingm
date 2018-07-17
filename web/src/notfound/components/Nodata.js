/**
 * @file NoData view
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import {Link} from 'react-router'

export default class NoData extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const content = this.props.content || '网络异常，请刷新重试= 。='

        return (
            <div className='nocont'>
                <p>{content}</p>
                <Link to='/ecloud/login'>返回首页</Link>
            </div>
        )
    }
}
