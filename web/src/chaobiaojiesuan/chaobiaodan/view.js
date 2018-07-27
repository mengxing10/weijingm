/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import {chaobiaodanAPI} from './constants/api'
import './styles/index.styl'
import classNames from 'classnames'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio,Checkbox} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'
import _ from 'lodash'
import moment from 'moment'
import Menus from '../../common/components/Menus'
class Chaobiaodan extends Component {
    constructor(props) {
        super(props)
        this.reportid='';
        this.state = {
            startDate: moment().subtract(1,'Y'),
            endDate: moment().subtract(1,'d'),
            addDate: moment().subtract(1,'d'),
            pageNum:1,
            xinzeng:false,
            chakan:false,
            bengzhanid:0,
            bengzu:'all',
            dianbiaos:{},
            waters:{},
            hours:{},
        }
    }

//ref 用于新增抄表单传参  一般不得使用
    render() {
        let {xinzeng,chakan,bengzu,bengzhanid,pageNum,dianbiaos,waters,hours,addDate} = this.state
        let {bengzus,chaobiaodanlist,chaobiaodaninfo,chaobiaodanadd} = this.props
        let bengzhanlist  =this.props.bengzhanlist
        if(xinzeng){
          bengzus=_.filter(bengzus, function(o) { return o.key!=0; });
          bengzhanlist=_.filter(bengzhanlist, function(o) { return o.id!=0; });
          if(bengzu=='all')bengzu=bengzus[0].value
        }
        const BodyStyle={height: document.documentElement.clientHeight-80  +'px'};

        //编号  泵站名称 系统名称 电表合计 累时器合计 水表合计 抄表时间 抄表人 是否结算

        const chaobiaothead=[{width:"5%",value:"编号"},{width:"10%",value:"泵站名称"},
                              {width:"10%",value:"泵组名称"},{width:"15%",value:"电表合计"},
                              {width:"10%",value:"累时器合计"},{width:"15%",value:"水表合计"},
                              {width:"10%",value:"抄表时间"},{width:"10%",value:"抄表人"},
                              {width:"5%",value:"是否结算"},{width:"10%",value:"操作"}]

        //泵站名称 泵组名称 水泵编号 电表读数 累时器读数 抄表时间 抄表人 备注

        const dianbiaoThead=[{width:"5%",value:"编号"},{width:"10%",value:"泵站名称"},{width:"10%",value:"泵组名称"},
                            {width:"25%",value:"水泵编号"},{width:"25%",value:"电表读数"},{width:"25%",value:"累时器读数"}]


        const shuibiaoThead=[{width:"5%",value:"编号"},{width:"10%",value:"泵站名称"},{width:"10%",value:"泵组名称"},
                            {width:"50%",value:"水表编号"},{width:"25%",value:"水表读数"}]

        const hejiThead=[{width:"5%",value:"编号"},{width:"10%",value:"泵站名称"},
                              {width:"10%",value:"泵组名称"},{width:"20%",value:"电表合计"},
                              {width:"20%",value:"累时器合计"},{width:"20%",value:"水表合计"},
                              {width:"10%",value:"抄表时间"},{width:"5%",value:"抄表人"}]

        const tbody =!xinzeng&&!chakan?this.parseTbBody(chaobiaodanlist.data):[]

        const waterBody = this.parseTbWaterBody(chaobiaodaninfo.waters)
        const electricBody = this.parseTbElectricBody(chaobiaodaninfo.hourElectrics)
        const totalBody = this.parseTbTotalBody(chaobiaodaninfo.groupTotal)

        const addwaterBody = this.parseTbAddWaterBody(chaobiaodanadd.waters)
        const addelectricBody = this.parseTbAddElectricBody(chaobiaodanadd.hourElectrics)
        const addtotalBody = [[1,_.get(_.find(bengzhanlist,['id',bengzhanid]),'name',''),
                              _.get(_.find(bengzus,['key',bengzu]),'text',''),
                              _.reduce(dianbiaos, function(sum, value,key) {return sum + value;}, 0),
                              _.reduce(hours, function(sum, value,key) {return sum + value;}, 0),
                              _.reduce(waters, function(sum, value,key) {return sum + value;}, 0),
                              addDate.format('YYYY-MM-DD'),
                              1

                              ]]

        return (
          <div className="chaobiaodan" style={BodyStyle}>
              {!chakan&&!xinzeng?<div className="chaobiaodan-header">
                <div className="bengzhanxuanze">
                  {bengzhanlist.map((item,i)=>
                    (<span className={classNames('item',{active:item.id==bengzhanid})} onClick={this.changeBengzhan.bind(this,item.id)}>
                    {item.name}</span>))}
                </div>
                <div className="query-condition">
                    <div className="bengzu">
                        <label className="labStyle">泵组选择:</label>
                        <Dropdown
                          className="query-value"
                           value = {bengzu}
                           selection
                           openOnFocus
                           options={bengzus}
                           onChange = {this.changeBengZu.bind(this)}
                         />
                    </div>

                    <div className ="shijian">
                        <label className="labStyle">抄表时间:</label>
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
                      {!xinzeng&&<div className="jiesuan"><Checkbox label={{ children: '是否结算' }}  onChange={this.selectCharged.bind(this)}/></div>}
                      {!xinzeng&&<div className="xinzeng" onClick={this.xinZeng.bind(this)}>新增抄表单</div>}
                </div>
            </div>
            :
            <div className="chaobiaodan-header">
              <div className="query-condition">
                  {xinzeng&&<div className ="shijian">
                      <label className="labStyle">抄表时间:</label>
                      <DateField
                              dateFormat="YYYY-MM-DD"
                              locale="zh-cn"
                              forceValidDate={true}
                              updateOnDateClick={true}
                              //defaultValue={startDate}
                              value={this.state.addDate}
                              onChange={::this.handleChangeAdd}
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
                  </div>}
              </div>
          </div>}
              <div className="chaobiaodan-body">
                  {!xinzeng&&!chakan?
                    <div className="chaobiaodanlist">
                      <MyTable thead={chaobiaothead} tbody={tbody}/>
                      <div className="pages">
                         <Pager total={chaobiaodanlist.pageCount}
                                gap={5}
                                change={::this.changePager}
                                current ={pageNum}
                                fetching={false}
                          />
                      </div>
                    </div>
                    :
                    <div className="chaobiaobody">
                          <div className="fenge"><h3>电表</h3></div>
                        <MyTable thead={dianbiaoThead} tbody={xinzeng?addelectricBody:electricBody}/>
                        <div className="fenge"><h3>水表</h3></div>
                        <MyTable thead={shuibiaoThead} tbody={xinzeng?addwaterBody:waterBody}/>
                        <div className="fenge"><h3>合计</h3></div>
                      <MyTable thead={hejiThead} tbody={xinzeng?addtotalBody:totalBody}/>
                          <div className="fenge"></div>
                          <div className="caozuo">
                              {xinzeng?<div className="item" onClick={this.xinChaobiao.bind(this)}>生成新抄表单</div>:
                                       <div className="item" onClick={this.backList.bind(this)}>打印</div>
                              }
                              <div className="item" onClick={this.backList.bind(this)}>返回</div>
                          </div>

                    </div>
                  }
              </div>

          </div>
        )
    }
    //新增
    async xinZeng(){
      let {bengzhanid,bengzu,addDate,dianbiaos,waters,hours} = this.state
      if(bengzhanid==0||bengzu=='all'){
        alert('请选择泵组及泵组')
      }else{

        const {getChaoBiaoDanAdd} = this.props
        let params = {pumpgroupid:bengzu,readingdate:addDate.format('YYYY-MM-DD')}
        await getChaoBiaoDanAdd(params)

        const {chaobiaodanadd} = this.props
        chaobiaodanadd.waters.forEach(item=>(waters[item.SBS]=item.SBS_value))
        chaobiaodanadd.hourElectrics.forEach(item=>(hours[item.LSQXSS]=item.LSQXSS_value))
        chaobiaodanadd.hourElectrics.forEach(item=>(dianbiaos[item.DBDS]=item.DBDS_value))


        this.setState({xinzeng:true,dianbiaos:dianbiaos,waters:waters,hours:hours})
      }
    }
    selectCharged(e, { checked }){
      const {bengzu,bengzhanid} = this.state
      this.getAllChaoBiaoDanList(undefined,undefined,undefined,bengzhanid==0?undefined:bengzhanid,
        bengzu=='all'?undefined:bengzu,checked)
    }

    async changeBengzhan(id){
      this.setState({bengzhanid:id,bengzu:'all'})
      if(id!=0){
        const {getBengZuList} = this.props
        await getBengZuList(id)
        this.getAllChaoBiaoDanList(undefined,undefined,undefined,id)
      }else{
        this.getAllChaoBiaoDanList()
      }

    }

    changeBengZu(e, { value }){
      this.setState({bengzu:value})
      if(value!='all'){
        this.getAllChaoBiaoDanList(undefined,undefined,undefined,undefined,value)

      }else{
        const {bengzhanid} = this.state
        this.getAllChaoBiaoDanList(undefined,undefined,undefined,bengzhanid)
      }

    }

    dianbiaoChange(ev){
      let {dianbiaos} = this.state
      dianbiaos[ev.target.dataset.id] = parseFloat(ev.target.value)

      this.setState({dianbiaos:dianbiaos})

    }

    leishiqiChange(ev){
      let {hours} = this.state
      hours[ev.target.dataset.id] = parseFloat(ev.target.value)
      this.setState({hours:hours})


    }

    shuibiaoChange(ev){
      let {waters} = this.state
      waters[ev.target.dataset.id] =parseFloat( ev.target.value)
      this.setState({waters:waters})


    }
    backList(){
      this.setState({xinzeng:false,chakan:false})
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
      debugger
      await postChaoBiaoDanNew(params)
      await this.getAllChaoBiaoDanList(startDate,endDate,pageNum)
      this.setState({xinzeng:false,chakan:false})


    }
    //导出
    onDayin(url,query){
      //window.open(url+'?reportid='+query)
      var element = document.createElement("a");
      element.setAttribute("href", url+'?reportid='+query);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

  //分页
  changePager(value){
    const {startDate,endDate} = this.state
    this.setState({pageNum:value})
    this.getAllChaoBiaoDanList(startDate,endDate,value)

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
    this.getAllChaoBiaoDanList(startDate,dateMoment,pageNum)
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
    this.getAllChaoBiaoDanList(startDate,dateMoment,pageNum)
  }
  handleChangeAdd(dateString, { dateMoment, timestamp}){
    if(dateMoment.toDate().getTime()>moment().subtract(1,'d').toDate().getTime()){
      this.setState({
        addDate:moment().subtract(1,'d')
      });
    }
    else{
      this.setState({
        addDate: dateMoment
      });
    }
  }
  getAllChaoBiaoDanList(startT,endT,pageNo,stationID,groupID,hasCharge){
    const {getChaoBiaoDanList}  = this.props
    const {startDate,endDate,pageNum,bengzu,bengzhanid} = this.state

    let pars ={};
    if(startT)
      pars["startReadingDate"]=startT.format('YYYY-MM-DD');
    else
      pars["startReadingDate"]=startDate.format('YYYY-MM-DD');
    if(endT)
      pars["endReadingDate"]=endT.format('YYYY-MM-DD');
    else
      pars["endReadingDate"]=endDate.format('YYYY-MM-DD');
    if(pageNo)
      pars["pageNo"]=pageNo;
    else
      pars["pageNo"]=pageNum;
    if(stationID)
      pars["stationID"]=stationID;
    if(groupID)
      {pars["stationID"]=bengzhanid;pars["groupID"]=groupID;}
    if(undefined!=hasCharge)
      pars["hasCharge"]=hasCharge;


    //     {"hasCharge":"FALSE",————是否结算, 是：TRUE,否：FALSE
    // "startReadingDate":"2018-01-01",————结算开始时间
    // "endReadingDate":"2018-07-01",————结算结束时间
    // "stationID":1,————泵站ID
    // "groupID":"9",————泵组ID
    // "pageNo":1,————页码
    // "pageSize":20————每页条数
    // }
    getChaoBiaoDanList(pars);
  }





  onChakan(uuid){
    this.setState({chakan:true})
    const {getChaoBiaoDanInfo} = this.props
    getChaoBiaoDanInfo(uuid)
  }


  componentWillReceiveProps(nextprops){}
  componentDidMount() {
    const {getBengZhanList,getChaoBiaoDanList} = this.props
    getBengZhanList();

    const {startDate,endDate,pageNum} = this.state
    this.getAllChaoBiaoDanList(startDate,endDate,pageNum)

  }
  componentWillUnmount() {}
  parseTbBody(data){
    // [{
    //   "groupName": "1组",
    //   "nickName": "张三",
    //   "totalWater": 542.32,
    //   "hasCharge": 0,
    //   "totalHour": 386.99,
    //   "stationName": "28泵站",
    //   "uuid": "c6edda7c2c3c416087929d53e63181d5",
    //   "readingDate": "2018-01-01",
    //   "totalElectric": 66705
    // }]
    return data.map((item, i) => {
      var status = <span className='chaobiao_table_chakan' onClick={this.onChakan.bind(this,item.uuid)}>查看</span>;
      return ([i+1,item.stationName,item.groupName,item.totalElectric,
              item.totalHour,item.totalWater,item.readingDate,
              item.nickName,item.hasCharge?'是':'否',status]);
    })
  }
  parseTbWaterBody(data){
    // [————水表部分
    //         {
    //             "identifier": "100000",————水表编号
    //             "gropuName": "1组",————系统名称(泵组名称)
    //             "stationName": "28泵站",————泵站名称
    //             "water": 1000————水表读数
    //         }
    //     ],
    return data.map((item, i) => {
      return ([i+1,item.stationName,item.groupName,item.identifier,item.water]);
    })
  }

  parseTbElectricBody(data){
    // "hourElectrics": [
    //          {
    //              "gropuName": "1组",
    //              "hour": 2001,
    //              "electric": 2002,
    //              "stationName": "28泵站",
    //              "pumpName": "101#"
    //          },]
    return data.map((item, i) => {
      return ([i+1,item.stationName,item.groupName,item.pumpName,item.electric,item.hour]);
    })
  }

    parseTbTotalBody(item){
      // "groupTotal": {————统计部分
      //         "groupName": "1组",————系统名称(泵组名称)
      //         "nickName": "张三",————抄表人
      //         "totalWater": 1000,————水表合计
      //         "totalHour": 8016,————累时器合计
      //         "stationName": "28泵站",————泵站名称
      //          "remark": "11",————备注
      //         "readingDate": "2018-01-01",
      //         "totalElectric": 8020————电表合计
      //     },
        if(item.hasOwnProperty('stationName')){
          return [[1,item.stationName,item.groupName,item.totalElectric,
            item.totalHour,item.totalWater,item.readingDate,item.nickName]]
        }else
          return []

    }






  parseTbAddWaterBody(data){
    // {
    //            "identifier": "100000",————水表编号
    //            "groupName": "1组",————系统名称(泵组名称)
    //            "SBS": "SBS_100000_00003",————输入框名称(把页面上的文本框定义为SBS_100000_00003，或者传参时，参数名定义为SBS_100000_00003)
    //            "stationName": "28泵站",————泵站名称
    //            "SBS_value": 1000————水表数
    //        }
    return data.map((item, i) => {
      var water = <input className='chaobiao_table_input' data-id={item.SBS} step="0.01"
        defaultValue ={item.SBS_value} onChange={this.shuibiaoChange.bind(this)} type="number" />;
      return ([i+1,item.stationName,item.groupName,item.identifier,water]);
    })
  }


    parseTbAddElectricBody(data){
      // {
      //           "groupName": "1组",————泵组名称
      //           "DBDS": "DBDS_101#_00001",————电表输入框名称(把页面上的文本框定义为DBDS_101#_00001，或者传参时，参数名定义为DBDS_101#_00001)
      //           "LSQXSS_value": 2002,————累时器读数
      //           "LSQXSS": "LSQXSS_101#_00002",————累时器输入框名称
      //           "stationName": "28泵站",————泵站名称
      //           "DBDS_value": 2001,————电表读数
      //           "pumpName": "101#"————水泵名称
      //       },
      return data.map((item, i) => {
        var electric = <input className='chaobiao_table_input'  data-id={item.DBDS} step="0.01" defaultValue ={item.DBDS_value}
          onChange={this.dianbiaoChange.bind(this)} type="number" />;
        var hour = <input className='chaobiao_table_input' data-id={item.LSQXSS} step="0.01" defaultValue ={item.LSQXSS_value}
          onChange={this.leishiqiChange.bind(this)} type="number"  />;
        return ([i+1,item.stationName,item.groupName,item.pumpName,electric,hour]);
      })
    }





}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.chaobiaodan, mapDispatchToProps)(Chaobiaodan);
