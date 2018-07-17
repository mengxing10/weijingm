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
import {Dropdown} from 'semantic-ui-react'
import $ from 'jquery'
import './edittable.styl'

export default class EditTable extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)

        this.state = {
            xinghao: [{key: -1, value: '', text: '请选择'}],
            changjia: [{key: -1, value: '', text: '请选择'}],
            libraryId: -1,
            tvalue: '',
            cvalue: '',
            xvalue: '',
            parent: '',
        }
    }

    render() {
        const {edit, thead, tbody} = this.props;

        let liwidth = (100 / thead.length) + '%';



        // 添加时 按照thead生成一列，同时添加flag，flag真无法继续添加
        return (
            <div className="el-edittable">
                <div className="el-table">
                    <ul className="el-thead">
                    {thead.map(item => {
                        return (
                            <li data-id={item.id} style={{width: liwidth}} key={item.id}>{item.value}</li>
                        )
                    })}
                    </ul>
                    {tbody.map((body, i) => {
                        return (
                            <ul className="el-tbody" key={i}>
                                {body.map((item, ii) => {
                                    return (
                                        <li onDoubleClick={this.edit.bind(this, item.edit, item.id)}
                                            data-edit={item.edit}
                                            data-id={item.id}
                                            style={{width: liwidth}}
                                            key={ii}>
                                            <span>{item.value}</span>
                                            {item.edit && <input
                                                data-id={item.id}
                                                data-key={item.key}
                                                className="editli"
                                                type="text"
                                                name={item.value}
                                                defaultValue={item.value}
                                            />}
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}
                    {edit ? <ul className="el-tbody">
                        {thead.map(item => {
                                return (
                                    <li style={{width: liwidth}} key={item.id}>
                                        <input
                                            ref={item.id} type="text"
                                            name={item.name}
                                            className={item.name}
                                            defaultValue="" />
                                    </li>
                                )
                        })}
                        </ul>
                    : ''}
                </div>
                {edit ? <div className="el-btns">
                    <span onClick={::this.save} className="el-save">保存</span>
                    <span onClick={::this.cancel} className="el-cancel">取消</span>
                </div> : ''}
            </div>
        )
    }


    edit(editable, id, ev) {
        if (!editable) {
            return false;
        }

        $(ev.target).hide();
        $(ev.target).siblings('input').show();
    }


    // 新增
    save() {
        if (!this.props.edit) {
            return false
        }
        const {type, levelId, parentId} = this.props;
        let params = {};

        this.props.save && this.props.save(params)
    }

    // 取消 丢弃添加的编辑内容
    cancel() {
        this.props.cancel && this.props.cancel(false)
    }
}

function handler(data) {
    let ret = [{
        value: '',
        key: -1,
        text: '请选择'
    }];

    for (var prop in data) {
        ret.push({
            value: JSON.stringify(data[prop]),
            key: prop,
            text: prop
        })
    }

    return ret;
}
