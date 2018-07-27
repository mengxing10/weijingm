/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'
import classNames from 'classnames'
import SVGIDMap from '../../common/components/SVGMAPBYID'
import {Popup, Dropdown} from 'semantic-ui-react'
import * as commonActions from '../../common/actions.js'
import {ToastContainer} from "react-toastr"
import Loading from '../../common/components/Loading'
class Monitor extends Component {
  // static contextTypes = {
  //     allData: PropTypes.object.isRequired
  // }

  constructor(props) {
    super(props)

    this.state = {
      jiancedata:{pagename:'jiance_jiankong_28-1',status:2,
          d1:{data:[],status:2},
          d2:{data:[],status:2},
          d3:{data:[],status:2},
          d4:{data:[],status:2},
          d5:{data:[],status:2},


      },
      pageRequest:{d8:{pageRequest:{column:"time",order:"desc",page:{pageNum:1,pageSize:5}}}},
      bzNum:0,
      openMore:false,
      svgMenu:["28-1","28-2","38-all",
                      "28-hongxi","28-chengqing","28-jiayao","28-eryanghualv",
                      "28-yaxiaosuan","28-203","28-204","38-2",
                      "38-3","28-paiwu","38-qianshui"],
      funMenu:["28泵站1组","28泵站2组","38泵站",
                      "虹吸滤池","澄清池","澄清池加药","二氧化氯加药",
                      "亚硝酸钠加药","28-203泵","28-204泵","38-2泵",
                    "38-3泵","28潜污泵","38污泵"],
    }
  }

  // 不同的item 调不同的components 展示完成后[销毁]
  // 公共的弹层组件 内容不同
  render() {
    const {bzNum,openMore,svgMenu,funMenu,jiancedata} = this.state;
    let svgdata = []
    jiancedata.d1.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:1})))
    jiancedata.d2.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:2})))
    jiancedata.d3.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:3})))
    jiancedata.d4.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:4})))
    jiancedata.d5.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:5})))
    let project =this.props.location.query.project;
    const BodyStyle={height: document.documentElement.clientHeight-130   +'px'}
    let svgpath = `/resources/${svgMenu[bzNum]}.svg`;


    return (
      <div className='monitor' style={BodyStyle}>
        <ToastContainer ref="toastcontainer" className="toast-top-right"/>
        <div className="monitor-left" >
        <div className="top-charts">
          <div className={classNames("query-btn",{active:openMore})}   onClick={this.openMoreMenu.bind(this)}>更多</div>
        <div className = {classNames("funMenus",{active:openMore})}>
            {funMenu.map((item,i)=>(
              <div className={classNames("funMenuItem",{active:i==bzNum})}
                onClick={this.changeBz.bind(this,i)}>{item}</div>
            ))}
          </div>
        </div>
        <div className="right-svg">
          <div className="svg-panel">
            <SVGIDMap svg={svgpath} width="95%" height="90%" data={svgdata} id='svg-02'/>
          </div>
        </div>
        </div>
        <div className="monitor-right">
          <h3 className="renwu-title">维保记录</h3>
          <div className="renwu-body">

            {/*<div className="renwu-item">
              <div className="renwu-icon">报修</div>
              <div className="renwu-text">
                <div className="renwu-text-time-name">
                  <span className="renwu-text-time">2018-06-10</span>
                  <span className="renwu-text-name">305#水泵</span>
                </div>
                <div className="renwu-text-body">
                    水泵断路器无法断开，电流显示不正常跳动。
                </div>
            </div>
            </div>
            <div className="renwu-item">
              <div className="renwu-icon">报修</div>
              <div className="renwu-text">
                <div className="renwu-text-time-name">
                  <span className="renwu-text-time">2018-06-10</span>
                  <span className="renwu-text-name">305#水泵</span>
                </div>
                <div className="renwu-text-body">
                    水泵断路器无法断开，电流显示不正常跳动。
                </div>
            </div>
            </div>
            <div className="renwu-item">
              <div className="renwu-icon">报修</div>
              <div className="renwu-text">
                <div className="renwu-text-time-name">
                  <span className="renwu-text-time">2018-06-10</span>
                  <span className="renwu-text-name">305#水泵</span>
                </div>
                <div className="renwu-text-body">
                    水泵断路器无法断开，电流显示不正常跳动。
                </div>
            </div>
            </div>*/}



          </div>



        </div>

      </div>
    )
  }
  changeBz(num){

    let {svgMenu,funMenu} = this.state;
    let hang = Math.floor(num/4)*4
    let bzNum = num%4
    
    if(hang>0){
      let svgM1 =svgMenu.slice(0,hang+1)
      let svgM2 =svgMenu.slice(hang,svgMenu.length-1)
      svgMenu = svgM2.concat(svgM1)
      let funM1 =funMenu.slice(0,hang+1)
      let funM2 =funMenu.slice(hang,funMenu.length-1)
      funMenu = funM2.concat(funM1)
    }
    let pagename = `jiance_jiankong_${svgMenu[bzNum]}`
    let jiancedata = {pagename:pagename,status:2,
        d1:{data:[],status:2},
        d2:{data:[],status:2},
        d3:{data:[],status:2},
        d4:{data:[],status:2},
        d5:{data:[],status:2},
    }

    this.setState({bzNum:bzNum,svgMenu:svgMenu,funMenu:funMenu,openMore:false,jiancedata:jiancedata})

    this.getNewPageData(pagename,jiancedata)


  }
  openMoreMenu(){
    this.setState({openMore:true})
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

     async  initPage(p,data){
        const {getPageConf,getPageData} =p
        let {pageRequest} = this.state

        let {pagename} = data
        await getPageConf(pagename,data)
        await getPageData(pagename,data,pageRequest)
     }

     async  getNewPageData(pagename,data){
        const {getPageConf,getPageData} = this.props

        await getPageConf(pagename,data)
        await getPageData(pagename,data)
     }



     componentWillMount(){
       let {jiancedata} = this.state
       this.initPage(this.props,jiancedata)

     }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actions,...commonActions}, dispatch);
};
export default connect(state => state.monitor, mapDispatchToProps)(Monitor);
