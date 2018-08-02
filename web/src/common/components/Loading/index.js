/**
 * @file Loading view
 * @author zlc <lichao9182@126.com>
 */

import React, {Component} from 'react'
import  './loading.styl'

export default class Loading extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={this.props.style}>
               <div className='pageLoading'>
                    <span></span>
               </div>
            </div>
        )
    }
}
