/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'

import classNames from 'classnames'
import EditTableGw from '../../../common/components/EditTableGw'
import {Dropdown,Checkbox,Popup,Grid,Button} from 'semantic-ui-react'
import { ToastContainer } from "react-toastr"
import './view.styl'
class ManageBiaoge extends Component {

  constructor(props) {
    super(props)

    this.state = {
      biaogename: '',
      biaogeadd: false,
      tableColumnInfos: [],
      tableInfo:{chineseName:"",englishName:"",type:0},
      isAddPopOpen:false,
      isDelPopOpen:false,



    }
  }

  render() {

    const {biaogeadd, tableColumnInfos,isAddPopOpen,isDelPopOpen} = this.state
    // TABLE_ENGLISH_NAME
    let {tablenames,table_column_info} = this.props

    const biaogename = this.state.biaogename?this.state.biaogename:this.props.tablenames[0]['value']
    let oldthead = [
      {
        "id": "serialNumber",
        "value": "序号"
      },
      {
        "id": "uuid",
        "value": "id"
      },
      {
        "id": "columnEnglishName",
        "value": "列名"
      }, {
        "id": "columnChineseName",
        "value": "别名"
      }, {
        "id": "columnType",
        "value": "数据类型"
      }, {
        "id": "contentLength",
        "value": "数据长度"
      }
    ]

    let addthead = [
      {
        "id": "serialNumber",
        "value": "序号"
      },
      {
        "id": "columnEnglishName",
        "value": "英文名"
      }, {
        "id": "columnChineseName",
        "value": "中文名"
      }, {
        "id": "columnType",
        "value": "数据类型"
      }, {
        "id": "contentLength",
        "value": "数据长度"
      }
    ]
    let thead = !biaogeadd?oldthead: addthead
    // , {
    //   "id": "SERIAL_NUMBER",
    //   "value": "列号"
    // }
    let result = !biaogeadd?table_column_info: tableColumnInfos
    let len = result.length
    let page = {
      pageNum: 1,
      pageSize: 20
    }
    // let options = tablenames


    return (<div className='gfybiaogeguanli'>
    <ToastContainer
        ref="toastcontainer"
        className="toast-top-right"
      />
      <div className='gfybiaogeguanli-body'>
        <h2>表格管理</h2>
        <div className="gfybiaogeguanli-choice">
          <div className="gfybiaogeguanli-choice-left">
            <Dropdown onChange={::this.handleChange} options={tablenames} placeholder='Choose an option' selection="selection" value={biaogename}/>
          </div>
          <div className="gfybiaogeguanli-choice-right">
            {
              biaogeadd?<div className="choice-div">
                <span className="name-span">中文名:</span>
                <input className="name-input" ref='chinese_name' type="text"/>
                <span className="name-span">英文名:</span>
                <input className="name-input"    ref='english_name'type="text"/>
                <span className="name-span">是否配置表？</span>
                <Checkbox  className="name-check" onChange={::this.isConfigTable}/>
                  <Popup
                    trigger={<div className="query-div" >新增</div>}
                    on='click'
                    onOpen={this.handleAddOpenPopup.bind(this)}
                    open={isAddPopOpen}
                    position='bottom center'
                  >
                     <Grid divided columns='equal'>
                       <Grid.Column>
                         <Button color='blue' onClick={this.addTableCommit.bind(this, true)} content='确定' fluid />
                       </Grid.Column>
                       <Grid.Column>
                         <Button color='red' onClick={this.addTableCommit.bind(this,false)}  content='取消' fluid />
                       </Grid.Column>
                     </Grid>
                   </Popup>
              </div>:<div className="choice-div">
              <span className="name-span">英文名:</span>
              <span className="name-check">{biaogename}</span>
              <Popup
                  trigger={<div className="query-div" >删除</div>}
                  on='click'
                  onOpen={this.handleDelOpenPopup.bind(this)}
                  open={isDelPopOpen}
                  position='bottom center'
                >
                   <Grid divided columns='equal'>
                     <Grid.Column>
                       <Button color='blue' onClick={this.delTableCommit.bind(this, true)} content='确定' fluid />
                     </Grid.Column>
                     <Grid.Column>
                       <Button color='red' onClick={this.delTableCommit.bind(this,false)}  content='取消' fluid />
                     </Grid.Column>
                   </Grid>
                 </Popup></div>
            }
          </div>
        </div>
        <div className="gfybiaogeguanli-table">
          <EditTableGw thead={thead} tdata={result} page={page} noOrder = {true} hasId={false} hasOpt={true} noMod={!biaogeadd} hasAdd={true} saveAndGetNew={::this.saveAndGetNew} />
        </div>
      </div>
    </div>)
  }

  isConfigTable(e,data){

    let {tableInfo} = this.state

    tableInfo['type'] =  data.checked?1:0
    this.setState({tableInfo:tableInfo})
  }

  handleAddOpenPopup(){
    this.setState({isAddPopOpen:true})
  }
  handleDelOpenPopup(){
    this.setState({isDelPopOpen:true})
  }
  addTableCommit(commit){
    let {tableInfo,tableColumnInfos} = this.state
    let {addNewTable} = this.props
    tableInfo['englishName'] =  this.refs['english_name']['value']
    tableInfo['chineseName'] =  this.refs['chinese_name']['value']
    let params = {tableInfo:tableInfo,tableColumnInfos:tableColumnInfos}

    addNewTable(params)
    this.setState({isAddPopOpen:false,tableInfo:tableInfo})

    let that = this
    setTimeout(that.dataRefresh(),3000);


  }
  delTableCommit(commit){
    const {biaogename} = this.state
    const {delOldTable} = this.props
    this.setState({isDelPopOpen:false})
    let params = {tableName:biaogename}
    delOldTable(params)
    let that = this
    setTimeout(that.dataRefresh(),3000);


  }

  needOrderColumn(pageRequest) {}
  saveAndGetNew(pageRequest, modColValue, optSel,optColNum) {
    const {biaogeadd, tableColumnInfos,biaogename} = this.state
    const {selectColumnList,delOldTableColumn,addOldTableColumn} = this.props

    if (biaogeadd) {
      switch (optSel) {
        case 'add':
          tableColumnInfos.push(modColValue)
          break;
        case 'del':
          tableColumnInfos.splice(optColNum,1)
          break;
        case 'mod':
          tableColumnInfos.splice(optColNum,1,modColValue)
          break;
        default:

      }
      this.setState({modColValue: modColValue})
    }else{
      switch (optSel) {
        case 'add':
          //tableColumnInfos.push(modColValue)
          addOldTableColumn({"tableName": biaogename,"tableColumnInfos": [modColValue]})
          setTimeout(function(){selectColumnList(biaogename)},2000);

          break;
        case 'del':
          //tableColumnInfos.splice(optColNum,1)
          delOldTableColumn({tableName:biaogename,columnEnglishName:modColValue.columnEnglishName})
          setTimeout(function(){selectColumnList(biaogename)},2000);

          break;
        default:

      }
    }
  }
  handleChange(e, {value}) {
    this.setState({biaogename: value})
    if (value == 'add') {
      this.setState({biaogeadd: true})
    }else{
      this.setState({biaogeadd: false})
      const {selectColumnList} = this.props
      selectColumnList(value)

    }

  }
  componentWillMount() {
    const {selectTableNameList} = this.props
    selectTableNameList()
  }

  componentDidMount() {
    const {selectTableNameList,selectColumnList} = this.props
    const {tablenames,table_column_info} = this.props
    const tableName = tablenames[0]['value']
    selectColumnList(tableName)
  }
  dataRefresh(){
    const {selectTableNameList,selectColumnList} = this.props
    const {tablenames} = this.props
    let tableName = tablenames[0]['value']
    selectTableNameList()
    setTimeout(function(){ tableName = tablenames[0]['value'];selectColumnList(tableName)},1000);


    this.setState({biaogename:tableName})
  }
  componentWillUpdate(){

  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.status==0&&nextProps.errmsg){
      this.refs.toastcontainer.error(`${nextProps.errmsg}`, ``, {timeOut: 2000,
           closeButton: true,
         })
    }else if(nextProps.status==1&&nextProps.errmsg){
      this.refs.toastcontainer.success(`${nextProps.errmsg}`, ``, {timeOut: 2000,
           closeButton: true,
         })
    }else if(nextProps.status==2&&nextProps.errmsg){
      this.refs.toastcontainer.info(`${nextProps.errmsg}`, ``, {timeOut: 1000,
           closeButton: true,
         })
    }
    if(nextProps.location.query.projectname!=this.props.location.query.projectname){
      this.dataRefresh()
    }
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
};
export default connect(state => state.jiancebiaogem, mapDispatchToProps)(ManageBiaoge);
