/**
 * @file EditTable component
 * @author luwenlong
 *
 * @thead       参数   必传   {Array}       表格标题
 * @body        参数   必传   {Array}       表格内容
 * @edit        参数   必传   {boolean}     是否编辑新行
 * @save        参数   必传   {Function}    [回调]保存编辑的内容
 * @cancel      参数   必传   {Function}    [回调]取消编辑的内容
 */

import React, {PropTypes, Component} from 'react'
import './mytable.styl'

export default class EditTable extends Component {


    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const {thead, tbody} = this.props;
        //thead=[{width:10%,value:32}，{}]
        //tbody =[[],[]]
        let liwidth = (100 / thead.length) + '%';
        return (
            <div className="el-mytable">
                <div className="el-table">
                    <ul className="el-thead">
                    {thead.map((item ,j)=> {
                        return (
                            <li style={{width: item.width}} key={j}>{item.value}</li>
                        )
                    })}
                    </ul>
                    {tbody.map((body, i) => {
                        return (
                            <ul className="el-tbody" key={i} onClick={this.pointOption.bind(this,i)}>
                                {body.map((item, ii) => {
                                    return (
                                        <li
                                            style={{width: thead[ii].width}}
                                            key={ii}>
                                            <span>{item}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}

                </div>

            </div>
        )
    }
pointOption(i){
  let {pointOption} = this.props
  pointOption&&pointOption(i)
}

}
