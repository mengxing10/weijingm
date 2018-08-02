/**
 * @file Pager component
 * @author zlc <lichao9182@126.com>
 *
 * @gap         参数   选传   {number}      分割段 默认5
 * @prefix      参数   选传   {string}      分页器样式前缀 默认 el
 * @lang        参数   选传   {Object}      分页器上下首末页配置 默认
 * @pagesize    参数   选传   {number}      每页数据条目 默认 10
 *
 * @change      参数   必传   {Function}    分页器翻页回调
 * @total       参数   必传   {number}      总页数
 * @fetch       参数   必传   {boolean}     是否处于翻页中(异步翻页使用)
 */

import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import classNames from 'classnames'
import './pager.styl'

export default class Pager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current:1,
            gap: this.props.gap || 5,
            prefix: this.props.prefix || 'el',
            lang: this.props.lang || {
                first: '首页',
                prev: '上一页',
                last: '尾页',
                next: '下一页'
            }
        }
    }

    render() {
        // 计算页码
        // 1. total / pagesize 计算出所有页码
        // 2. 根据当前页码 生成当前显示的数字页码和中文页码
        const pages = this.renderItem();
        const {current} = this.state;
        const {lang} = this.state;
        const {total, pagesize } = this.props;
        return (
            <div className="el-pager">
                <ul>
                {total>=2&&pages.map((item, i)=> {
                    if (!item.hide) {
                        return (
                            <li
                                className={classNames({
                                    active: +item.id == current,
                                    first: item.text == lang.first,
                                    last: item.text == lang.last
                                })}
                                onClick={this.change.bind(this, item.id)}
                                key={i}
                            >
                                {item.text == lang.first ? <Icon name="angle left" /> : ''}
                                {item.text}
                                {item.text == lang.last ? <Icon name="angle right" /> : ''}
                            </li>
                        )
                    }
                })}
                </ul>
            </div>
        )
    }

    // 输出页码数组
    renderItem() {
        const {total, pagesize } = this.props;
        const {gap, prefix, lang,current} = this.state;

        let pages = [];
        for (let i = 1; i <= total; i++) {
            pages.push({
                id: i,
                text: i,
            })
        }

        // if (current - gap > 0) {

            pages.forEach(page => {
                if (page.id > 1 && page.id < current - gap) {
                    page.hide = true;
                }else if(page.id > parseInt(current) + gap){
                  page.hide = true;
                }
            })

            // ID = 1 后插入...
            // pages.splice(1, 0, {id: 'prevelli', text: '...'});
        // }
        if(current - gap > 0) {
          pages.splice(0, 1, {id: 'prevelli', text: '...'});
       }

        if (total - current > gap) {
            pages.forEach(page => {
                if (page.id > current + gap - 1 && page.id < total) {
                    page.hide = true;
                }
            })

            // current + gap - 1 后插入...
            pages.splice(current + gap, 0, {id: 'nextelli', text: '...'});
        }

        if (current !== 1) {
            pages = [
                {id: 1, text: lang.first},
                {id: current - 1, text: lang.prev},
                ...pages
            ]
        }

        if (current !== total) {
            pages = [
                ...pages,
                {id: current + 1, text: lang.next},
                {id: total, text: lang.last}
            ]
        }

        return pages;
    }

    // 点击页码翻页
    change(id) {

       const {gap, prefix, lang,current} = this.state;

        if (/(prevelli|nextelli)/i.test(id)) {
            // return false

        }


        if(id=='nextelli'){
          this.props.change(current+gap);

          this.setState({current: current+gap})
        }

        else if(id=='prevelli'){
          this.props.change(current-gap);

          this.setState({current: current-gap})
        }else{
          this.props.change && this.props.change(id);

          this.setState({current: id})
        }



        //if (this.props.fetching) {
            //return false
        //}


    }
}
