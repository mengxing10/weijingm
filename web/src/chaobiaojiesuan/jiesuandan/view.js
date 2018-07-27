/**
 * @file jiesuandanViewer
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'
import classNames from 'classnames'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Checkbox,Table} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'
import _ from 'lodash'
import moment from 'moment'
import {DropModal} from 'boron'
class Jiesuandan extends Component {
    constructor(props) {
        super(props)
        this.reportid='';
        this.state = {
            startDate: moment().subtract(1,'Y'),
            endDate: moment().subtract(1,'d'),
            pageNum:1,
            xinzeng:false,
            chakan:false,
            queren:false,
            jiesuanuuid:'',
            jiesuandannew:[],
            jiesuannewpars:[],
            jiesuanmodnum:-9999,
            jiesuanconfmod:{}

        }
    }

//ref 用于新增抄表单传参  一般不得使用
    render() {
        let {xinzeng,chakan,queren,pageNum,startDate,endDate,jiesuandannew} = this.state
        let {jiesuanlist ,jiesuandaninfo,jiesuandanconf} = this.props

        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'};

        //编号  泵站名称 系统名称 电表合计 累时器合计 水表合计 抄表时间 抄表人 是否结算

        const jiesuanthead=[{width:"5%",value:"编号"},{width:"20%",value:"结算日期"},
                              {width:"20%",value:"节能率(%)"},{width:"20%",value:"节能量(kW·h)"},
                              {width:"20%",value:"节约金额(元)"},{width:"15%",value:"操作"}]

        //泵站名称 泵组名称 水泵编号 电表读数 累时器读数 抄表时间 抄表人 备注


        const tbody =!xinzeng&&!chakan?this.parseTbBody(jiesuanlist.data):[]

        const detailBody = this.parseTbDetailBody(jiesuandaninfo.chargeDetails)
        const reportBody = this.parseTbReportBody(jiesuandaninfo.chargeReport)

        const newBody = this.parseTbNewBody(jiesuandannew)
        debugger
        return (
          <div className="jiesuandan" style={BodyStyle}>
              <div className="jiesuandan-header">
                {!xinzeng&&!chakan&&<div className="query-condition">
                    <div className ="shijian">
                        <label className="labStyle">结算时间:</label>
                        <DateField
                                dateFormat="YYYY-MM-DD"
                                locale="zh-cn"
                                forceValidDate={true}
                                updateOnDateClick={true}
                                //defaultValue={startDate}
                                value={this.state.startDate}
                                onChange={::this.handleChangeStart}
                                >
                                <DatePicker
                                    navigation={true}
                                    locale="zh-cn"
                                    forceValidDate={true}
                                    highlightWeekends={true}
                                    highlightToday={true}
                                    weekNumbers={true}
                                    weekStartDay={0}
                                    footer={true}
                                    />
                        </DateField>
                        <label className="labStyle">~</label>
                        <DateField
                                dateFormat="YYYY-MM-DD"
                                locale="zh-cn"
                                forceValidDate={true}
                                updateOnDateClick={true}
                                //defaultValue={startDate}
                                value={this.state.endDate}
                                onChange={::this.handleChangeEnd}
                                >
                                <DatePicker
                                    navigation={true}
                                    locale="zh-cn"
                                    forceValidDate={true}
                                    highlightWeekends={true}
                                    highlightToday={true}
                                    weekNumbers={true}
                                    weekStartDay={0}
                                    footer={true}
                                    />
                        </DateField>
                      </div>
                      <div className="canshu" onClick={this.goConf.bind(this)}>参数设定</div>
                      <div className="xinzeng" onClick={this.xinZeng.bind(this)}>新增结算单</div>

                </div>}
                {xinzeng&&<div className="query-condition">
                      <div className="canshu" onClick={this.shengCheng.bind(this)}>生成结算单</div>
                      <div className="xinzeng" onClick={this.fanHui.bind(this)}>返回</div>
                </div>}
                {chakan&&<div className="query-condition">
                    <div className="canshu" onClick={this.daoChu.bind(this)}>导出</div>
                  <div className="xinzeng" onClick={this.fanHui.bind(this)}>返回</div>
                </div>}

            </div>
              <div className="jiesuandan-body">
                   {!xinzeng&&!chakan&&!queren&&
                    <div className="jiesuandanlist">
                      <MyTable thead={jiesuanthead} tbody={tbody}/>
                      <div className="pages">
                         <Pager total={jiesuanlist.pageCount}
                                gap={5}
                                change={::this.changePager}
                                current ={pageNum}
                                fetching={false}
                          />
                      </div>
                    </div>}
                    {chakan&&
                      <div className="jiesuandanlist">
                      <Table celled structured   size='large' className ="chakan-table" >
                                <Table.Header className ="chakan-tablehead">
                                  <Table.Row  className ="chakan-tablehead"textAlign='center' verticalAlign='middle'>
                                    <Table.HeaderCell rowSpan='2'>序号</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>泵站名称</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>系统名称</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>节约能源种类</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='3'>运行时间</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='3'>电表</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='3'>水表</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>吨水能耗</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>基准吨水能耗</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>节能率</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>节能量</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>合同约定能源单价</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>调整后能源单价</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>节约金额</Table.HeaderCell>
                                  </Table.Row>
                                  <Table.Row  className ="chakan-tablehead" textAlign='center' verticalAlign='middle'>
                                    <Table.HeaderCell>起时间</Table.HeaderCell>
                                    <Table.HeaderCell>止时间</Table.HeaderCell>
                                    <Table.HeaderCell>累计量</Table.HeaderCell>
                                    <Table.HeaderCell>起码</Table.HeaderCell>
                                    <Table.HeaderCell>止码</Table.HeaderCell>
                                    <Table.HeaderCell>累计量</Table.HeaderCell>
                                    <Table.HeaderCell>起码</Table.HeaderCell>
                                    <Table.HeaderCell>止码</Table.HeaderCell>
                                    <Table.HeaderCell>累计量</Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                {detailBody.map((item,i)=>(
                                  <Table.Body className ="chakan-tablebody" key ={i} textAlign='center' verticalAlign='middle'>
                                    {item.map((iitem,ii)=>(<Table.Cell key={ii} textAlign='center' verticalAlign='middle'>{iitem}</Table.Cell>))}
                                  </Table.Body>
                                ))}
                                {reportBody.map((item,i)=>(
                                  <Table.Body className ="chakan-tablebody" key ={i} textAlign='center' verticalAlign='middle'>
                                    {item.map((iitem,ii)=>(ii==0?<Table.Cell colSpan='14' key={ii} textAlign='center' verticalAlign='middle'>{iitem}</Table.Cell>
                                      :<Table.Cell  key={ii} textAlign='center' verticalAlign='middle'>{iitem}</Table.Cell>))}
                                  </Table.Body>
                                ))}
                            </Table>
                    </div>
                    }
                    {xinzeng&&
                      <div className="jiesuandanlist">
                      <Table celled structured   size='large' className ="chakan-table" >
                                <Table.Header className ="chakan-tablehead">
                                  <Table.Row  className ="chakan-tablehead"textAlign='center' verticalAlign='middle'>
                                    <Table.HeaderCell rowSpan='2'>序号</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>系统名称</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='4'>起</Table.HeaderCell>
                                    <Table.HeaderCell colSpan='4'>止</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>操作</Table.HeaderCell>

                                  </Table.Row>
                                  <Table.Row  className ="chakan-tablehead" textAlign='center' verticalAlign='middle'>
                                    <Table.HeaderCell>抄表时间</Table.HeaderCell>
                                    <Table.HeaderCell>电表合计</Table.HeaderCell>
                                    <Table.HeaderCell>累时器合计</Table.HeaderCell>
                                    <Table.HeaderCell>水表合计</Table.HeaderCell>
                                    <Table.HeaderCell>抄表时间</Table.HeaderCell>
                                    <Table.HeaderCell>电表合计</Table.HeaderCell>
                                    <Table.HeaderCell>累时器合计</Table.HeaderCell>
                                    <Table.HeaderCell>水表合计</Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                {newBody.map((item,i)=>(
                                  <Table.Body className ="chakan-tablebody" key ={i} textAlign='center' verticalAlign='middle'>
                                    {item.map((iitem,ii)=>(<Table.Cell key={ii} textAlign='center' verticalAlign='middle'>{iitem}</Table.Cell>))}
                                  </Table.Body>
                                ))}

                            </Table>
                    </div>
                    }

              </div>
              <DropModal ref='setConfig'
                  closeOnClick={true}
                  className='globalModal'
                  backdropStyle={{background: 'rgba(0, 0, 0, .61)'}}
              >
                  <div className="jiesuan-config">
                    <h3>结算参数设定</h3>
                  <div className="jiesuan-config-body">
                      {
                        // "unit": "元",————单位
                        // "textName": "q_17",————页面文本框名称(保存时的参数名称)
                        // "baseValue": 1,————值
                        // "description": "合同约定能源单价"————名称
                        jiesuandanconf.map((item,i)=>(
                          <div key ={i} className="jiesuan-config-item" >
                            <span className="desc">{item.description}</span>
                          <input data-id={item.textName} defaultValue={item.baseValue} onChange={this.confChange.bind(this)}/>
                            <span>{item.unit}</span>
                          </div>
                        ))
                      }
                    </div>
                    <div className="jiesuan-config-footer">
                      <div className="jiesuan-config-commit" onClick={this.confMod.bind(this)}>保存</div>

                    </div>

                  </div>
              </DropModal>
          </div>
        )
    }
    //新增
    async xinZeng(){
        const {getJieSuanDanNew} = this.props
        await getJieSuanDanNew()
        this.setState({xinzeng:true})
    }
    //生成结算单
    async shengCheng(){
      const {getJieSuanDanGen,getJieSuanDanInfo} = this.props
      const {jiesuandannew} = this.state
      let params = jiesuandannew.map(item=>(_.pick(item,['startId','endId'])))
      await getJieSuanDanGen({json:params})
      const {jiesuandangen} = this.props
      if(jiesuandangen!=''){
        await  getJieSuanDanInfo(jiesuandangen)
        this.setState({chakan:true,xinzeng:false})
      }
    }

    fanHui(){
      this.setState({xinzeng:false,chakan:false,queren:false})
    }
    goBack(){
      this.setState({queren:false})
    }

    async goConf(){
      const {getJieSuanDanConf,REQUESTE_JIESUANDANCONF} = this.props
      await getJieSuanDanConf()
      if(REQUESTE_JIESUANDANCONF=='done')
        {this.refs.setConfig && this.refs.setConfig.show()}
    }
    //修改配置参数
    confChange(ev){
      let {jiesuanconfmod} = this.state
      jiesuanconfmod[ev.target.dataset.id] =ev.target.value
      this.setState({jiesuanconfmod:jiesuanconfmod})


    }
    //触发修改参数
    async confMod(){
      let {jiesuanconfmod} = this.state
      const {getJieSuanDanConfMod,REQUESTE_JIESUANDANCONFMOD} = this.props
      await getJieSuanDanConfMod(jiesuanconfmod)
      if(REQUESTE_JIESUANDANCONFMOD=='done')
        {this.refs.setConfig && this.refs.setConfig.hide()}
    }
    //
    async  xinChaobiao(){
      const {bengzhanid,bengzu,dianbiaos,hours,waters,addDate,startDate,endDate,pageNum} = this.state

      const {postChaoBiaoDanNew} = this.props
      // {"readingDate":"2018-01-01",————抄表日期
      // "pumpgroupid":9,————泵组ID
      // "DBDS_101#_00001":100.36,————DBDS_101#_00001输入框名称
      // "LSQXSS_101#_00002":23.12,
      // "DBDS_102#_00001":120.36,
      // "LSQXSS_102#_00002":145.32,
      // "DBDS_103#_00001":125.31,
      // "LSQXSS_103#_00002":65.32,
      // "DBDS_104#_00001":321.02,
      // "LSQXSS_104#_00002":153.23,
      // "SBS_100000_00003":542.32
      // }
      let params = {readingDate:addDate.format('YYYY-MM-DD'),pumpgroupid:bengzu,...dianbiaos,...hours,...waters}
      await postChaoBiaoDanNew(params)
      await this.getAllChaoBiaoDanList(startDate,endDate,pageNum)
      this.setState({xinzeng:false,chakan:false})


    }
    //导出
    daoChu(){
      const {getJieSuanDanDaoChu} = this.props
      const {jiesuanuuid} = this.state
      getJieSuanDanDaoChu(jiesuanuuid)
    }

  //分页
  changePager(value){
    const {startDate,endDate} = this.state
    this.setState({pageNum:value})
    this.getAllJieSuanDanList(startDate,endDate,value)

  }


  handleChangeStart(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().toDate().getTime()){
      this.setState({
        startDate:moment()
      });
      return;
    }
    if(this.state.endDate.toDate().getTime()<dateMoment.toDate().getTime()){
      this.setState({
        endDate: dateMoment,
        startDate:this.state.endDate
      });
    }else{
      this.setState({
        startDate: dateMoment
      });
    }
    const {startDate,endDate,pageNum} = this.state
    this.getAllJieSuanDanList(startDate,dateMoment,pageNum)
  }
  handleChangeEnd(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().toDate().getTime()){
      this.setState({
        endDate:moment()
      });
      return;
    }
    if(this.state.startDate.toDate().getTime()>dateMoment.toDate().getTime()){
      this.setState({
        startDate: dateMoment,
        endDate:this.state.startDate
      });
    }else{
      this.setState({
        endDate: dateMoment
      });
    }
    const {startDate,endDate,pageNum} = this.state
    this.getAllJieSuanDanList(startDate,dateMoment,pageNum)
  }

  getAllJieSuanDanList(startT,endT,pageNo){
    const {getJieSuanList}  = this.props
    const {startDate,endDate,pageNum} = this.state

    let pars ={};
    if(startT)
      pars["startChargeDate"]=startT.format('YYYY-MM-DD');
    else
      pars["startChargeDate"]=startDate.format('YYYY-MM-DD');
    if(endT)
      pars["endChargeDate"]=endT.format('YYYY-MM-DD');
    else
      pars["endChargeDate"]=endDate.format('YYYY-MM-DD');
    if(pageNo)
      pars["pageNo"]=pageNo;
    else
      pars["pageNo"]=pageNum;


    //     {"hasCharge":"FALSE",————是否结算, 是：TRUE,否：FALSE
    // "startReadingDate":"2018-01-01",————结算开始时间
    // "endReadingDate":"2018-07-01",————结算结束时间
    // "stationID":1,————泵站ID
    // "groupID":"9",————泵组ID
    // "pageNo":1,————页码
    // "pageSize":20————每页条数
    // }
    getJieSuanList(pars);
  }





  async onChakan(uuid){

    const {getJieSuanDanInfo} = this.props
    await getJieSuanDanInfo(uuid)
    const {REQUESTE_JIESUANDANINFO} = this.props
    if(REQUESTE_JIESUANDANINFO=='done'){
      this.setState({chakan:true,jiesuanuuid:uuid})

    }else{
      alert('请求数据失败！稍后尝试')
    }
  }


  componentWillReceiveProps(nextprops){
    this.setState({jiesuandannew:nextprops.jiesuandannew})
  }
  componentDidMount() {
    const {startDate,endDate,pageNum} = this.state

    this.getAllJieSuanDanList(startDate,endDate,pageNum)

  }
  componentWillUnmount() {}
  parseTbBody(data){
    // {
    //             "saveMoney": 1000,
    //             "energySaving": 1000,
    //             "chargeDate": "2018-07-26",
    //             "uuid": "223ab5c94672433b99ae6cc82e4d9bf8",
    //             "energySavingRate": 0.2
    //         }
    return data.map((item, i) => {
      var status = <span className='jiesuan_table_chakan' onClick={this.onChakan.bind(this,item.uuid)}>查看</span>;
      return ([i+1,item.chargeDate,item.energySavingRate*100,item.energySaving,
              item.saveMoney,status]);
    })
  }


  parseTbDetailBody(data){
    // {
    //             "endElectrics": 12020,
    //             "energyConsumption": 4,
    //             "endWaters": 2000,
    //             "endHours": 12016,
    //             "startElectrics": 8020,
    //             "agreedPrice": 1,
    //             "energySaving": 1000,
    //             "baseEnergyConsumption": 5,
    //             "energyTypes": "电能",
    //             "adjustedPrice": 1,
    //             "groupName": "1组",
    //             "startWaters": 1000,
    //             "runWaters": 1000,
    //             "runElectrics": 4000,
    //             "startHours": 8016,
    //             "runHours": 4000,
    //             "saveMoney": 1000,
    //             "stationName": "28泵站",
    //             "energySavingRate": 0.2
    //         }
    return data.map((item, i) => {
      return ([i+1,item.stationName,item.groupName,item.energyTypes,
              item.startHours,item.endHours,item.runHours,
              item.startElectrics,item.endElectrics,item.runElectrics,
              item.startWaters,item.endWaters,item.runWaters,
              item.energyConsumption,item.baseEnergyConsumption,item.energySavingRate,
              item.energySaving,item.agreedPrice,item.adjustedPrice,item.saveMoney

              ]);
    })
  }

    parseTbReportBody(item){
      // "chargeReport": {
      //       "saveMoney": 1000,————合计节约金额
      //       "energySaving": 1000,————合计节电量
      //       "proportions": 80,————分成比例
      //       "shareAmount": 800,————合计分享金额
      //       "energySavingRate": 0.2————合计节能率
      //   },
        if(item.hasOwnProperty('saveMoney')){
          let shareAmount = `应付节能服务公司金额 = （${item.proportions}）×（${item.saveMoney}） =   ${item.shareAmount}   元`
          return [[shareAmount,'合计',item.energySavingRate,
            item.energySaving,'-','-',item.saveMoney]]
        }else
          return []

    }

    parseTbNewBody(data){
      // {
      //      "endReadingDate": "2018-01-02",————止抄表日期
      //      "endTotalElectric": 8016,————止电表合计
      //      "endTotalHour": 8020,————止累时器合计
      //      "endId": 8,————止抄表单ID
      //      "startTotalHour": 12016,————起累时器合计
      //      "startId": 7,————起抄表单ID
      //      "startTotalElectric": 12020,————起电表合计
      //      "endTotalWater": 1000,————止水表合计
      //      "name": "28泵站1组",————泵组名称
      //      "startReadingDate": "2018-05-01",————起抄表日期
      //      "startTotalWater": 2000————起水表合计
      //  }
      const {jiesuanmodnum,jiesuannewpars} = this.state
      const {jiesuandanmod} = this.props
      return data.map((item, i) => {
        var status = jiesuanmodnum==i?
                    <div className='jiesuan_table_opt'>
                       <span className='jiesuan_table_opt_i' onClick={this.confirmJieSuanDanNew.bind(this)}>确定</span>
                       <span className='jiesuan_table_opt_i' onClick={this.cancelJieSuanDanNew.bind(this)}>取消</span>
                    </div>
                    :
                    <div className='jiesuan_table_opt'>
                        <span className='jiesuan_table_opt_i' onClick={this.modJieSuanDanNew.bind(this,item.startId,i)}>修改</span>
                        <span className='jiesuan_table_opt_i' onClick={this.delJieSuanDanNew.bind(this,i)}>删除</span>
                    </div>
        var startReadingDate = jiesuanmodnum==i?
                              <div className='jiesuan_table_dropdown'>
                                <Dropdown
                                  className="jiesuan_table_dropdown"
                                   value = {item.startReadingDate}
                                   selection
                                   openOnFocus
                                   options={_.keys(jiesuandanmod.startReadingDate).map((item,i)=>({key:i,text:item,value:item}))}
                                   onChange = {this.jieduandanStart.bind(this)}
                                 />
                              </div>
                              :
                              item.startReadingDate
        let endReadingDate = jiesuanmodnum==i?
                              <div className='jiesuan_table_dropdown'>
                                <Dropdown
                                  className="jiesuan_table_dropdown"
                                   value = {item.endReadingDate}
                                   selection
                                   openOnFocus
                                   options={_.keys(jiesuandanmod.endReadingDate).map((item,i)=>({key:i,text:item,value:item}))}
                                   onChange = {this.jieduandanEnd.bind(this)}
                                 />
                              </div>
                              :
                              item.endReadingDate


        return ([i+1,item.name,startReadingDate,
                item.startTotalElectric,item.startTotalHour,item.startTotalWater,
                endReadingDate,item.endTotalElectric,item.endTotalHour,item.endTotalWater,status
                ]);
      })

    }

    async modJieSuanDanNew(id,num){
      const {getJieSuanDanMod} = this.props
      await getJieSuanDanMod(id)
      const {REQUESTE_JIESUANDANMOD} = this.props
      if(REQUESTE_JIESUANDANMOD=='done')
        this.setState({jiesuanmodnum:num})
      else
        alert('操作失败，请稍后再试！')

    }
    delJieSuanDanNew(num){
      let {jiesuandannew} = this.state
      jiesuandannew.pop(num,1)
      this.setState({jiesuandannew:jiesuandannew})
    }
    confirmJieSuanDanNew(id,num){
      this.setState({jiesuanmodnum:-9999})
    }
    cancelJieSuanDanNew(num){
      this.setState({jiesuanmodnum:-9999})
    }
    jieduandanStart(e,{value}){
      let {jiesuandanmod} = this.props
      let {jiesuandannew,jiesuanmodnum} = this.state
      let modPar = jiesuandanmod.startReadingDate[value]
      for(let prop in modPar){
        jiesuandannew[jiesuanmodnum][prop] = modPar[prop]
      }
      jiesuandannew[jiesuanmodnum]['startReadingDate'] = value
      this.setState({jiesuandannew:jiesuandannew})
    }

    jieduandanEnd(e,{value}){
      let {jiesuandanmod} = this.props
      let {jiesuandannew,jiesuanmodnum} = this.state
      let modPar = jiesuandanmod.endReadingDate[value]
      for(let prop in modPar){
        jiesuandannew[jiesuanmodnum][prop] = modPar[prop]
      }
      jiesuandannew[jiesuanmodnum]['endReadingDate'] = value
      this.setState({jiesuandannew:jiesuandannew})
    }










}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.jiesuandan, mapDispatchToProps)(Jiesuandan);
