/**
 * @file 404view
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import {Link} from 'react-router'
import Nodata from './components/Nodata'

export default class NotFound extends Component {

    render() {
        return (
            <div className='notfound'>
                <Nodata content='很抱歉，您要访问的页面不存在'/>
            </div>
        )
    }
}
