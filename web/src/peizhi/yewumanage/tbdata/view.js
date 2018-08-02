/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import * as commonActions from '../../../common/actions.js'

import './view.styl'
import classNames from 'classnames'
import EditTableGw from '../../../common/components/EditTableGw'
import {ToastContainer} from "react-toastr"
import Loading from '../../../common/components/Loading'
import {Dropdown,Checkbox,Popup,Grid,Button} from 'semantic-ui-react'

class TableDataManage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      biaogename:'company',
      type:0,
      hasConf:false
    }
  }

  render() {
    let {data,status} = this.props
    const {biaogename,hasConf} = this.state
    
    return (<div className='gfybiaogedataguanli'>
      <ToastContainer ref="toastcontainer" className="toast-top-right"/>
        {<div className='gfybiaogeguanli-body'>
        <h2>数据管理</h2>
        <div className="gfybiaogeguanli-choice">
          <div className="gfybiaogeguanli-choice-left">
            {data&&data['tablenames']&&data['tablenames']['status']&&data['tablenames']['status']==1?
              <Dropdown onChange={::this.handleChange} options={data['tablenames']} placeholder='Choose an option' selection="selection" value={biaogename}/>
              :<Loading/>}
          </div>
          <div className="gfybiaogeguanli-choice-right">
            <span>表格英文名称：{biaogename}</span>
            {hasConf&&<Checkbox  className="name-check" onChange={::this.isConfigTable} label='修改配置表'/>}
          </div>
        </div>
          {data&&data['table']&&data['table']['resultCode']==0?<EditTableGw
            thead={data['table']['data']['header']} tdata={data['table']['data']['result']}
            page={data['table']['data']['page']}
            noOrder= {false}
            hasId={true} hasOpt={true} hasAdd={true}
            needOrderColumn={::this.needOrderColumn}
            saveAndGetNew={::this.saveAndGetNew}
            />:<Loading/>}
      </div>}
    </div>)
  }

  needOrderColumn(pageRequest) {
    const {operateTableData,data} = this.props
    const {biaogename,type} = this.state
    operateTableData(biaogename,type,'sel',data,{},pageRequest,false)


  }
  saveAndGetNew(pageRequest, modColValue, optSel,optColNum) {
    const {operateTableData,data} = this.props
    const {biaogename,type} = this.state
    operateTableData(biaogename,type,optSel,data,modColValue,pageRequest)

  }
  isConfigTable(e,d){

    let {type,biaogename} = this.state
    const {operateTableData,data} = this.props

    type =  d.checked?1:0
    this.setState({type:type})

    operateTableData(biaogename,type,'sel',data)

  }

  handleChange(e, {value}) {
    const {selectTableNameList,operateTableData} = this.props
    const {data} = this.props
    let hasConf= false
    let type = 0
    data['tablenames'].forEach(item=>{if(item.value==value) hasConf=item.type=="1"})
    this.setState({biaogename: value,hasConf:hasConf,type:type})
    operateTableData(value,type,'sel',data)

  }

  componentWillMount() {
    const {selectTableNameList,operateTableData} = this.props
    this.initPage()


  }
   async  initPage(){
      const {selectTableNameList,operateTableData} = this.props
     await selectTableNameList()
     const {data} = this.props
     await   operateTableData('company',0,'sel',data)

   }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status == 0 && nextProps.msg) {
      this.refs.toastcontainer.error(`${nextProps.msg}`, ``, {
        timeOut: 2000,
        closeButton: true
      })
    } else if (nextProps.status == 1 && nextProps.msg) {
      this.refs.toastcontainer.success(`${nextProps.msg}`, ``, {
        timeOut: 2000,
        closeButton: true
      })
    } else if (nextProps.status == 2 && nextProps.msg) {
      this.refs.toastcontainer.info(`${nextProps.msg}`, ``, {
        timeOut: 1000,
        closeButton: true
      })
    }
    if(nextProps.location.query.projectname!=this.props.location.query.projectname){
      const {selectTableNameList,operateTableData} = this.props
      this.initPage()
    }

  }



}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...commonActions,...actions}, dispatch);
};
export default connect(state => state.yewutbdatam, mapDispatchToProps)(TableDataManage);
