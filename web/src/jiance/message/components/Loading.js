/**
 * @file Loading view
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component} from 'react'
import loading from './loading.css'

export default class Loading extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        const load_style={

    }
        return (
            <div style={this.props.style}>
               <div className='pageLoading' style={{width:"100%",height:"100%",position:"reactive"}}>
                    <span className="img" > <img src={require('./Image/images/load.gif')} alt="" /></span>
               </div>
            </div>
        )
    }
}
