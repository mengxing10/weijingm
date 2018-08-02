/**
 * @file 报警
 * @author zlc <lichao9182@126.com>
 */

 import React, {Component, PropTypes} from 'react'
 import {Link, browserHistory} from 'react-router'
 import {bindActionCreators} from 'redux'
 import {connect} from 'react-redux';
 import classNames from 'classnames'
 import * as actions from './actions.js'
 import * as commonActions from '../../common/actions.js'
 import Loading from '../../common/components/Loading'
 import {ToastContainer} from "react-toastr"
 import EditTableGw from './components/EditTableGw'


class Warn extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }
    constructor(props) {
        super(props)
        this.deviceFilter='';
        //this.theTitle="";
        this.state = {
        jiancedata:{pagename:'jiance_baojing',d1:{status:2,data:{header:[],result:[],page:{pageNum:1,pageSize:20,totalCount:3}}},d2:{}},
        pageRequest:{d1:{pageRequest:{column:"time",order:"desc",page:{}}}}
      }


    }

    // 根据type + query
    // type决定title
    // type + query决定table数据
    render() {
        const BodyStyle={height: document.documentElement.clientHeight-130   +'px'}
        const {jiancedata}= this.state
        const widths =['0%','10%','20%','10%','5%','10%','5%','10%','10%']
        const header =[
                  {id: "uuid", value: "uuid"},
                  {id: "time", value: "报警时间"},
                  {id: "baojing", value: "报警描述"},
                  {id: "jibie", value: "报警级别"},
                  {id: "devicename", value: "设备名称"},
                  {id: "systemname", value: "泵站名称"},
                  {id: "chuli", value: "处理状态"},
                  {id: "chuli_time", value: "处理时间"},
                  {id: "chuliren", value: "处理人"}
                ]


        return (
                <div className='gfy-warn' style={BodyStyle}>
                    <ToastContainer ref="toastcontainer" className="toast-top-right"/>
                    {jiancedata.d1.status!=1?<Loading/>:
                      <div className='gfyproject-warn'>
                        <div className="rp-wrap">
                      <EditTableGw
                        thead={header} tdata={jiancedata['d1']['data']['result']}
                        page={jiancedata['d1']['data']['page']}
                        noOrder= {false}
                        hasId ={true}
                        hasOpt = {true}
                        noDel ={false}
                        widths ={widths}
                        saveAndGetNew={::this.saveAndGetNew}
                        needOrderColumn={::this.needOrderColumn}
                        baoxiuChuli={::this.baoxiuChuli}
                        />
                    </div>
                  </div>}
                </div>
        )
    }

    baoxiuChuli(bengZhan,device,baojing){
      browserHistory.push(`/bgp/pc/weixiuwh?xinzeng=1&bengzhan=${bengZhan}&device=${device}&baojing=${baojing}`)

    }

    needOrderColumn(pageRequest) {
      const {operateTableData} = this.props
      let {jiancedata} = this.state
      let pR = pageRequest
      let pRs = this.state.pageRequest
      const column = pageRequest.pageRequest.column
      const order = pageRequest.pageRequest.order
      if(column==''){
        pR.pageRequest.column=pRs.d1.pageRequest.column
        pR.pageRequest.order=pRs.d1.pageRequest.order


      }
      operateTableData(jiancedata.pagename,'sel','d1',jiancedata,{},pR)

    }
    saveAndGetNew(pageRequest2, modColValue, optSel,optColNum) {
      const {operateTableData} = this.props
      let {jiancedata,pageRequest} = this.state
      let pRs = pageRequest2
      if(!pRs.pageRequest.column){pRs=pageRequest.d1}
      operateTableData(jiancedata.pagename,optSel,'d1',jiancedata,modColValue,pRs)

    }


  componentWillMount(){
      const {jiancedata} = this.state
      this.initPage(this.props,jiancedata)

    }
    async  initPage(p,data){
       const {pageRequest} = this.state
       const {getPageConf,getPageData} = p
       await getPageConf(data.pagename,data)
       await getPageData(data.pagename,data,pageRequest)
    }


    componentWillReceiveProps(nextProps) {
      const {jiancedata}=this.state

      let {pagename} = jiancedata
      if(pagename==nextProps.jiancedata.pagename){
      // if (nextProps.jiancestatus == 0 && nextProps.jiancemsg) {
      //   this.refs.toastcontainer.error(`${nextProps.jiancemsg}`, ``, {
      //     timeOut: 2000,
      //     closeButton: true
      //   })
      // } else if (nextProps.jiancestatus == 1 && nextProps.jiancemsg) {
      //   this.refs.toastcontainer.success(`${nextProps.jiancemsg}`, ``, {
      //     timeOut: 2000,
      //     closeButton: true
      //   })
      // } else if (nextProps.jiancestatus == 2 && nextProps.jiancemsg) {
      //   this.refs.toastcontainer.info(`${nextProps.jiancemsg}`, ``, {
      //     timeOut: 1000,
      //     closeButton: true
      //   })
      // }
      // if (this.props.location.query.projectname != nextProps.location.query.projectname) {
      //   const {data} = nextProps
      //    this.initPage(nextProps,data)
      // }
      let {jiancedata} = nextProps

      this.setState({jiancedata:nextProps.jiancedata})
    }


    }





}


function mapDispatchToProps (dispatch) {
            return bindActionCreators({...actions,...commonActions}, dispatch);
        };

export default connect(state => state.warn, mapDispatchToProps)(Warn);
