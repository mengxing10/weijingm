/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import classNames from 'classnames'
import Menu from '../../common/components/Menus'
import EditTableGw from '../../common/components/EditTableGw'
import './view.styl'

class ManageCedian extends Component {

  constructor(props) {
    super(props)

    this.state = {
      leixingid:'nibianqi',

    }
  }

  render() {

    const {leixingid} = this.state


    	let column={nibianqi:[
    			{"columnChineseName":"编号","columnEnglishName":"bianhao","isDel":"0","columnType":"double","contentLength":100,"serialNumber":1},
    			{"columnChineseName":"交流电压","columnEnglishName":"jiaoliudianya","isDel":"0","columnType":"double","contentLength":100,"serialNumber":2},
    			{"columnChineseName":"交流电流","columnEnglishName":"jiaoliudianliu","isDel":"0","columnType":"double","contentLength":100,"serialNumber":3},
    			{"columnChineseName":"交流功率","columnEnglishName":"jiuliugonglv","isDel":"0","columnType":"double","contentLength":100,"serialNumber":4},
    			{"columnChineseName":"直流电压","columnEnglishName":"zhiliudianya","isDel":"0","columnType":"double","contentLength":100,"serialNumber":5},
    			{"columnChineseName":"直流电流","columnEnglishName":"zhiliudianliu","isDel":"0","columnType":"double","contentLength":100,"serialNumber":6},
    			{"columnChineseName":"直流功率","columnEnglishName":"zhiliugonglv","isDel":"0","columnType":"double","contentLength":100,"serialNumber":7},
    			{"columnChineseName":"逆变效率","columnEnglishName":"nibianxiaolv","isDel":"0","columnType":"double","contentLength":100,"serialNumber":8},

    	],
      huiliuxiang:[
  				{"columnChineseName":"编号","columnEnglishName":"bianhao","isDel":"0","columnType":"double","contentLength":100,"serialNumber":1},
  				{"columnChineseName":"总电压","columnEnglishName":"zongdianya","isDel":"0","columnType":"double","contentLength":100,"serialNumber":2},
  				{"columnChineseName":"总电流","columnEnglishName":"zongdianliu","isDel":"0","columnType":"double","contentLength":100,"serialNumber":3},
  				{"columnChineseName":"总功率","columnEnglishName":"zonggonglv","isDel":"0","columnType":"double","contentLength":100,"serialNumber":4},
  		],
      huanjing:[
  				{"columnChineseName":"编号","columnEnglishName":"bianhao","isDel":"0","columnType":"double","contentLength":100,"serialNumber":1},
  				{"columnChineseName":"温度","columnEnglishName":"wendu","isDel":"0","columnType":"double","contentLength":100,"serialNumber":2},
  				{"columnChineseName":"湿度","columnEnglishName":"shidu","isDel":"0","columnType":"double","contentLength":100,"serialNumber":3},
  				{"columnChineseName":"辐照","columnEnglishName":"fuzhao","isDel":"0","columnType":"double","contentLength":100,"serialNumber":4},
  				{"columnChineseName":"风速","columnEnglishName":"fengsu","isDel":"0","columnType":"double","contentLength":100,"serialNumber":5},
  				{"columnChineseName":"风向","columnEnglishName":"fengxiang","isDel":"0","columnType":"varchar","contentLength":100,"serialNumber":6},

  		],
    dianbiao:[
					{"columnChineseName":"编号","columnEnglishName":"bianhao","isDel":"0","columnType":"double","contentLength":100,"serialNumber":1},
					{"columnChineseName":"有功功率","columnEnglishName":"yougonggonglv","isDel":"0","columnType":"double","contentLength":100,"serialNumber":2},
					{"columnChineseName":"无功功率","columnEnglishName":"wugonggonglv","isDel":"0","columnType":"double","contentLength":100,"serialNumber":3},
					{"columnChineseName":"正向有功电能","columnEnglishName":"zhengxiangyougongdianneng","isDel":"0","columnType":"double","contentLength":100,"serialNumber":4},
					{"columnChineseName":"正向无功电能","columnEnglishName":"zhengxiangwugongdianneng","isDel":"0","columnType":"double","contentLength":100,"serialNumber":5},
					{"columnChineseName":"反向有功电能","columnEnglishName":"fanxiangyougongdianneng","isDel":"0","columnType":"double","contentLength":100,"serialNumber":6},
					{"columnChineseName":"反向无功电能","columnEnglishName":"fanxiangyougongdianneng","isDel":"0","columnType":"double","contentLength":100,"serialNumber":7},


			]}

      let thead =column[leixingid].map(item=>({id:item.columnEnglishName,value:item.columnChineseName}))




    let result = [
      {
        uuid: 1,
        bianhao: 'sdf',
        xinghao: '23',
        xitong: '23',
        parentid: '23',
        anzhuangweizhi: '23',

      },
      {
        uuid: 2,
        bianhao: 'sdf',
        xinghao: '23',
        xitong: '23',
        parentid: '23',
        anzhuangweizhi: '23',

      },
      {
        uuid: 3,
        bianhao: 'sdf',
        xinghao: '23',
        xitong: '23',
        parentid: '23',
        anzhuangweizhi: '23',

      },
    ]
    let len = result.length
    let page = {
      pageNum: 1,
      pageSize: 20
    }

    let deviceType =[{id:'nibianqi',value:"逆变器"},{id:'huiliuxiang',value:"汇流箱"},{id:'huanjing',value:"环境监测"},{id:'dianbiao',value:"电表"}]

    return (<div className='gfyshebeiguanli'>
      <div className='gfyshebeiguanli-body'>
      <h2>测点管理</h2>
      <div className="gfyshebeiguanli-choice">{deviceType.map((item,i)=>(<span  onClick={this.choiceLeixing.bind(this,item.id)} className={classNames({active:leixingid==item.id})}>{item.value}</span>))}</div>
      <div className="gfyshebeiguanli-table">
      <EditTableGw thead={thead} tdata={result} page={page} hasId={true} hasOpt={true} hasAdd={true} needOrderColumn={::this.needOrderColumn}/>
      </div>
    </div>
  </div>)
  }

  needOrderColumn(column, order, page) {}
  choiceLeixing(i){this.setState({leixingid:i})}
  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
};
export default connect(state => state, mapDispatchToProps)(ManageCedian);
