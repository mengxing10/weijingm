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
import classNames from 'classnames'
import Pager from '../Pager'

import './edittablegw.styl'

export default class EditTableGw extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)

        this.state = {
          orderColName:'',
          orderDesc:false,
          fetchcditem:false,
          addNewCol:false,//增加操作？
          modColNum:-1,//修改行号
          delColNum:-1,//删除行号
          optSel:'',//增删改操作选择
          confirmEn:false,
          modColValue:{},
          addColValue:{}

        }
    }

    render() {
        const {thead, tdata,page,hasId,hasOpt,hasAdd,noOrder,noMod,noDel,widths} = this.props;
        const {orderDesc,orderColName,fetchcditem,confirmEn,addNewCol,modColNum,delColNum,optSel,optView} =  this.state
        let liwidth = ((100-(hasId?10:0)-(hasOpt?10:0)) / (thead.length-1)) + '%';
        let liwidths = thead.map((item,i)=>widths?widths[i]?widths[i]:liwidth:liwidth)
        let tbody=tdata.map((item,i)=>thead.map(iitem=>({id:iitem['id'],value:item[iitem['id']]})))
        let pageNum = 0
        if(page&&page.pageNum){
          pageNum=page.pageNum-1
        }
        return (
            <div className="gw-edittable">
                <div className="gw-edittable-body">
                    <div className="gw-thead">
                    {hasId&&<div style= {{width:'10%'}}>序号</div>}
                    {thead.map((item,i) => {
                      if(!noOrder){
                        return (
                          <div className={classNames({nodisplay:item.id=='uuid' })}key ={i} onClick={this.orderCol.bind(this, item.id)} style= {{width:liwidths[i]}}>
                            {item.value}
                            <span className={classNames({active: orderColName==item.id, dbactive: !orderDesc})}>▼</span>
                          </div>

                        )}else{
                          return (<div className={classNames({nodisplay:item.id=='uuid' })}  key ={i} style= {{width:liwidths[i]}}>{item.value}</div>)
                        }
                      }
                    )}
                      {hasOpt&&<div  style= {{width:'10%'}}>操作</div>}
                    </div>
                    {tbody.map((body, i) => {
                        return (
                            <div className="gw-tbody" key={i}>
                                {hasId&&<div>{pageNum*10+i+1}</div>}
                                {body.map((item, ii) => {
                                  let regPos = /^-?\d+\.\d+$/
                                  if(regPos.test(item.value)){item.value=parseFloat(item.value).toFixed(2)}
                                  return(
                                    <div className={classNames({nodisplay:item.id=='uuid' })}  style={{width: liwidths[ii]}} key={ii}>
                                    {modColNum==i&&!addNewCol?<input ref={item.id} type="text" defaultValue={item.value}/>:item.value}
                                    </div>
                                  )})
                                }

                                {hasOpt&&!addNewCol&&
                                  <div className='gw-tbody-optli' style= {{width:'10%'}}>
                                    {modColNum==i||delColNum==i?<div onClick={::this.confirmFire}>确定</div>:!noMod&&<div onClick={this.modFire.bind(this,i)}>修改</div>}
                                    {modColNum==i||delColNum==i?<div onClick={::this.cancelFire}>取消</div>:!noDel&&<div onClick={this.delFire.bind(this,i)}>删除</div>}
                                </div>}
                                {addNewCol&&<div className='gw-tbody-optli' style= {{width:'10%'}}></div>}

                            </div>
                        )
                    })}
                    {addNewCol&&<div className="gw-tbody">
                      {hasId&&<div style= {{width:'10%'}}>{pageNum*10+tbody.length+1} </div>}
                      {thead.map((item,i) => {
                          return (
                            <div key ={i} className={classNames({nodisplay:item.id=='uuid' })}  style= {{width:liwidths[i]}}>
                              <input ref={item.id} type="text" />
                            </div>
                          )
                      })}
                      <div className='gw-tbody-optli' style= {{width:'10%'}}>
                      <div onClick={::this.confirmFire}>确定</div>
                      <div onClick={::this.cancelFire}>取消</div>
                      </div>
                    </div>}
                    {!addNewCol&&hasAdd&&<div className="gw-tbody-add"><div onClick={::this.addFire}>新增</div></div>}

                </div>
                {page&&<Pager total={Math.round(page['totalCount']/page['pageSize'])?Math.ceil(page['totalCount']/page['pageSize']):1}
                gap={5}
                change={::this.changePager}
                current={page['pageNum']?page['pageNum']:1}
                fetching={fetchcditem}
                 />}

            </div>
        )
    }
    addFire(){
      this.setState({modColNum:-1,delColNum:-1,addNewCol:true,confirmEn:true,optSel:'add'})
    }
    modFire(i){
      this.setState({modColNum:i,confirmEn:true,optSel:'mod'})
    }
    delFire(i){
      this.setState({delColNum:i,confirmEn:true,optSel:'del'})
    }
    confirmFire(){
      const {thead,saveAndGetNew,page,tdata} = this.props;
      const {orderDesc,orderColName,optSel,delColNum} =  this.state;
      let modColValue={}
      let optColNum=-1
      switch (optSel) {
        case 'add':
          thead.forEach(item=>{if(item.id!='uuid')modColValue[item['id']]=this.refs[item['id']]['value']})
          break;

        case 'mod':
          thead.forEach(item=>{modColValue[item['id']]=this.refs[item['id']]['value']})
          break;
       case 'del':
          modColValue=tdata[delColNum]
          optColNum=delColNum
         break;
        default:

      }
     this.setState({modColValue:modColValue})
      this.setState({modColNum:-1,delColNum:-1,addNewCol:false,confirmEn:false})
      let order=orderDesc?'desc':'asc';
      let column=orderColName;
      let pageRequest = {pageRequest:{
        "column": column,
        "order": order,
        "page": page
      }}
      // saveAndGetNew&&saveAndGetNew(column,order,page,modColValue,optSel,optColNum);

      saveAndGetNew&&saveAndGetNew(pageRequest,modColValue,optSel,optColNum);



    }
    cancelFire(){
      this.setState({modColNum:-1,delColNum:-1,addNewCol:false,confirmEn:false})
    }
    orderCol(name){
      let {orderDesc,orderColName} =  this.state;
      const {needOrderColumn,page} = this.props;
      if(orderColName==name){
        if(orderDesc)
          orderDesc=false;
        else
          orderDesc=true;
      }else{
        orderColName=name;
        orderDesc=false;
      }
      this.setState({orderColName:orderColName,orderDesc:orderDesc})
      let order=orderDesc?'desc':'asc';
      let column=orderColName;
      let pageRequest = {pageRequest:{
        "column": column,
        "order": order,
        "page": page
      }}
      needOrderColumn&&needOrderColumn(pageRequest);

      // needOrderColumn&&needOrderColumn(column,order,page);
    }
    changePager(id){
      let {orderDesc,orderColName} =  this.state;
      const {needOrderColumn,page} = this.props;
      page['pageNum'] = id;
      let order=orderDesc?'desc':'asc';
      let column=orderColName;
      let pageRequest = {pageRequest:{
        "column": column,
        "order": order,
        "page": page
      }}
      needOrderColumn&&needOrderColumn(pageRequest);
    }







}
