/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
//import MyCharts from '../components/MyCharts'
import GeneralCharts from '../../common/components/GeneralCharts'
import {Form, Button,Dropdown, Input,Checkbox,Grid} from 'semantic-ui-react'
import SVGIDMap from '../../common/components/SVGMAPBYID'
import * as commonActions from '../../common/actions.js'
import {ToastContainer} from "react-toastr"
import Loading from '../../common/components/Loading'
import TanChuang from './components/TanChuang'
import moment from 'moment'

class GailanShuibeng extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }
    //
    constructor(props) {
        super(props)
        this.resizeWindow1=this.resizeWindow.bind(this)
        this.state = {
          jiancedata:{pagename:'jiance_jiankong_28-2_203',status:2,
               //工艺达标率 累计运行时间  达标运行时间
              d1:{data:[0,1,2],status:2},
              //工艺达标率
              d2:{data:[1,2,3,4,5,6,7,8,9,10],status:2},
              //健康达标率
              d3:{data:[1,2,3,4,5,6,7,8,9,10],status:2},
              //吨水能耗
              d4:{data:[0,1,2],status:2},
              //吨水能耗达标率
              d5:{data:[1,2,3,4,5,6,7,8,9,10],status:2},
              //吨钢水耗
              d6:{data:[1,2,3,4],status:2},

              d7:{data:[1,1,1,1,1,0,0,0],status:2},



              //报警信息



          },
          BodyStyle:{height: document.documentElement.clientHeight-80  +'px'},
          ChartsStyle:{height: document.documentElement.clientHeight*0.35  +'px'},
          RightHeightStyle:{height: document.documentElement.clientHeight-150  +'px'},
          pageRequest:{d8:{pageRequest:{column:"time",order:"desc",page:{pageNum:1,pageSize:5}}}},
          TancengStyle:{height: document.documentElement.clientHeight-120  +'px',width:'80%'},
          tanchuang_type:'',
          tanceng:false,
          shuju:{
            xdata:[2,2,3,4,5,6,7,8,9,10,11,12],
            ydata0:[60,60,60,60,60,60,60,60,60,60,60,60],
            ydata1:[80,80,80,80,80,80,80,80,80,80,80,80],
            ydata2:[69,63,56,79,64,73,55,63,72,54,39,63],
            ydata3:[33,43,23,33,63,33,33,38,29,54,41,29],
            ydata4:[11,26,16,12,21,23,22,28,21,15,19,26],
            ydata5:[13,23,6,14,24,13,25,18,11,35,29,16],
          },
          bzNum:'28-2',
          sbNum:'203'



        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
      const {jiancedata,bzNum,sbNum} = this.state
      let {BodyStyle,ChartsStyle,RightHeightStyle} = this.state
      let datas={
        204:[0,0,0,0,0,0,0.03,0.022,0.034,43,34,0.1,0.9,0,0],
        203:[10000,10000,10000,26,26,26,0.13,0.22,0.34,43,34,0.1,0.9,450,13],
        2:[0,0,0,0,0,0,0.04,0.01,0.02,43,34,0.1,0.9,0,0],
        3:[400,400,400,180,180,180,0.4,0.1,0.2,43,34,0.1,0.9,90,3]
      }


      let data = datas[sbNum]

      let svgdata = []
      jiancedata.d1.data.forEach((item,i)=>(svgdata.push({pointid:i+1,
        value:Math.round(item*(1-Math.random()/20)*100)/100,valuetype:1})))


      var GuZhangPanBieOption =
           {
             title: "",
             //lineColors:  ['#facc17','#73ecee','white'], //可选
             lineColors: ["#facc17","#f04864"], //2c8cf9
             barWidth:8,
             xAxis: {name:"",data:['管路堵塞','密封环磨损','叶轮与密封环磨擦','吸水管漏气','发生汽蚀','润滑油不够',
               '叶轮损坏','泵轴与电机轴不同心','转速低','地脚螺栓松动']}, //月
             yAxis: {name:["%"]},
             series:{

                       lines:[

                                {name:"故障",data:new Array(10).fill(6).map(item=>(Math.round(item*(1+Math.random()/2)))), areaStyle: {normal: {color:"#facc17"}}  },

                                {name:"警戒",data:new Array(10).fill(30),lineStyle:{ type:'dashed'} },
                             ],
                    }
           };
      let lv = 80+Math.round(5-Math.random()*5)
      var ShuiBengXiaoLvOption = {

        title: {
          text: '', // axis.title,
          // left:'center',
          // top:'bottom',
          // padding: [0, 10, 0, 10],
          left: 'center',
          top: 'top',
          //padding: [0, 0, 0, 10],
          textStyle: {
            color: '#a3cff6',
            fontSize: 15
          }

        },
        legend: {
          orient: 'vertical',
          x: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [
              0, '50%'
            ],
            hoverAnimation: false,
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            animation: false,
            data: [
              {
                value: 100,
                name: lv + '%',
                itemStyle: {
                  normal: {
                    color: '#2b539c' //'#2c8cf9' '#6a5acd'
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      color: '#f8f8f8',
                      fontSize: 20
                    }
                  }
                }
              }
            ]
          }, {
            type: 'pie',
            radius: [
              '60%', '63%'
            ],
            itemStyle: {
              normal: {
                color: '#73ecee' //'#6a5acd'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            animationEasing: 'cubicOut',
            data: [
              {
                value: lv,
                itemStyle: {
                  emphasis: {
                    color: '#6a5acd'
                  }
                }
              }, {
                value: 100 - lv,
                itemStyle: {
                  normal: {
                    color: '#d3d3d3'
                  }
                }
              }
            ]
          }
        ]
      };

      let svgpath = '/resources/shuibengpinggu.svg';

      let xiaoxis = this.props.xiaoxis?this.props.xiaoxis.slice(0,3):[]

      const options = [

        {
          key: '28-2组',
          text: '28-2组',
          value: '28-2',
        },
        {
          key: '38泵站',
          text: '38泵站',
          value: '38-all',
        },

      ]

      const sboptions28 = [
        {
          key: '203泵',
          text: '203泵',
          value: '203',
        },
        {
          key: '204泵',
          text: '204泵',
          value: '204',
        }

      ]

      const sboptions38 = [
        {
          key: '2泵',
          text: '2泵',
          value: '2',
        },
        {
          key: '3泵',
          text: '3泵',
          value: '3',
        }

      ]
      let sboptions = bzNum=='28-2'?sboptions28:sboptions38


        return (
          <div className="gailanshuibeng theBody" style={BodyStyle}>
            <ToastContainer ref="toastcontainer" className="toast-top-right"/>

            <div className="gailanzonglan-top">
                <h2>水泵</h2>
              <div className="query-data-1">
                <Dropdown placeholder='泵组选择' fluid  selection  options={options}  onChange={::this.changeBz}
                  value = {bzNum}/>
                </div>
                <div className="query-data-2">
                <Dropdown placeholder='水泵选择' fluid  selection  options={sboptions} onChange={::this.changeSb}
                  value = {sbNum}/>
                </div>
                <span>更新时间: {moment().format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div className="gailanzonglan-body " >
              <div className="gailanzonglan-center">

                  <div className="gailanzonglan-center-mid">
                    <SVGIDMap svg={svgpath} width="95%" height="95%" data={svgdata} id='svg-02'/>
                  </div>
                  <div className="gailanzonglan-center-bot  ">
                    <div className="gailanzonglan-center-bot-left ">
                        {xiaoxis.map(item=>(<div className="xiaoxi-item" onClick={this.toXiaoXi.bind(this,item.messageTypeID)}>
                          <div className="xiaoxi-icon">{item.messageModelName}</div>
                          <div className="alarmText">
                            <div className="aTime">{item.messageSendTime}</div>
                          <div className="aMsg">{item.messageDesc}</div>
                          </div>
                        </div>))}
                    </div>
                    <div className="gailanzonglan-center-bot-center" ></div>
                    <div className="gailanzonglan-center-bot-right">
                        <div className="gongdan-body-1">
                            <div className="gongdan-item">
                                <div className="icon jiedian-icon"></div>
                              <div className="item"><span>{19+Math.round(5-Math.random()*5)}<sub>%</sub></span><h3>节电率</h3></div>
                            </div>
                            <div className="gongdan-item">
                                <div className="icon jiankang-icon"></div>
                              <div className="item"><span>{94+Math.round(5-Math.random()*5)}<sub>%</sub></span><h3>健康度</h3></div>
                            </div>
                        </div>
                        <div className="gongdan-body-2">
                            <div className="gongdan-item">
                                <div className="icon daiban-icon"></div>
                              <div className="item"><span>1</span><h3>待办</h3></div>
                            </div>
                            <div className="gongdan-item">
                                <div className="icon yiban-icon"></div>
                              <div className="item"><span>0</span><h3>已办</h3></div>
                            </div>
                        </div>
                    </div>

                  </div>
              </div>
                <div className="gailanzonglan-left">
                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'xiaolv')}>
                    <h3>效率</h3>
                    <div className="charts" style={ChartsStyle}>
                        <ReactEcharts
                            option={ ShuiBengXiaoLvOption }  //XiangMuDaBiaoLv
                             className="charts-body"/>
                        <div className="charts-text" >
                        <span>无</span>
                        </div>
                    </div>
                  </div>
                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'jiankangdu')} >
                    <h3>健康</h3>
                    <div className="charts" style={ChartsStyle}>
                        <ReactEcharts
                          option={GeneralCharts.theLineBar(GuZhangPanBieOption)}  //XiangMuZuoYeLv
                           className="charts-body"/>
                         <div className="charts-text">无</div>
                    </div>
                  </div>

                </div>

                <div className="gailanzonglan-right contentDiv" style={RightHeightStyle} >
                    <h3>维护记录</h3>
                  {bzNum=='28-2'?sbNum==204?<div className="weihu-list">
                        <div className="renwu-item">
                          <div className="renwu-icon">保养</div>
                          <div className="renwu-text">
                            <div className="renwu-text-time-name">
                              <span className="renwu-text-time">2018-07-12 9:30</span>
                            </div>
                            <div className="renwu-text-body">
                                加润滑油。
                            </div>
                          </div>
                        </div>
                        <div className="renwu-item">
                          <div className="renwu-icon">保养</div>
                          <div className="renwu-text">
                            <div className="renwu-text-time-name">
                              <span className="renwu-text-time">2018-07-12 19:30</span>
                            </div>
                            <div className="renwu-text-body">
                                电机开箱检查。
                            </div>
                          </div>
                        </div>

                  </div>:<div className="weihu-list">
                        <div className="renwu-item">
                          <div className="renwu-icon">维修</div>
                          <div className="renwu-text">
                            <div className="renwu-text-time-name">
                              <span className="renwu-text-time">2018-07-11 10:27</span>
                            </div>
                            <div className="renwu-text-body">
                                检查螺丝松动情况。
                            </div>
                          </div>
                        </div>


                  </div>:<div className="weihu-list"></div>
                }


                </div>
           </div>
           {this.state.tanceng&&<TanChuang
             type={this.state.tanchuang_type}
             shuju={this.state.shuju}
             tanchuangClose={::this.tanchuangClose}
             TancengStyle={this.state.TancengStyle}
           />}
          </div>
        )
    }
    tanchuangOpen(type){
     // this.setState({tanchuang_type:type,tanceng:true})
   }
   toXiaoXi(tab){
     switch(tab){
       case 3:
         browserHistory.push(`/bgp/pc/xiaoxi?project=yxbj`);
         break;
       case 4:
         browserHistory.push(`/bgp/pc/xiaoxi?project=nxzd`);
         break;
       case 5:
         browserHistory.push(`/bgp/pc/xiaoxi?project=gzzd`);
         break;
       default:
         browserHistory.push(`/bgp/pc/xiaoxi?project=dbtx`);
         break;

     }
   }
   tanchuangClose(){
     this.setState({tanceng:false})

   }
   changeBz(t,ev){
     let bzNum = ev.value
     let sbNum = bzNum=="28-2"?'203':'2'
     let pagename = `jiance_jiankong_${bzNum}_${sbNum}`
     let jiancedata = {pagename:pagename,status:2,
         d1:{data:[],status:2},
         d2:{data:[],status:2},
         d3:{data:[],status:2},
         d4:{data:[],status:2},
         d5:{data:[],status:2},
     }


     this.setState({bzNum:bzNum,sbNum:sbNum,jiancedata:jiancedata})
     this.getNewPageData(pagename,jiancedata)



   }
   changeSb(t,ev){
     let sbNum = ev.value
     let {bzNum} = this.state
     let pagename = `jiance_jiankong_${bzNum}_${sbNum}`
     let jiancedata = {pagename:pagename,status:2,
         d1:{data:[],status:2},
         d2:{data:[],status:2},
         d3:{data:[],status:2},
         d4:{data:[],status:2},
         d5:{data:[],status:2},
     }

     this.setState({sbNum:sbNum,jiancedata:jiancedata})
     this.getNewPageData(pagename,jiancedata)




   }


    componentWillMount(){
      let {jiancedata} = this.state
      this.initPage(this.props,jiancedata)

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

    resizeWindow(){
       let BodyStyle={height: document.documentElement.clientHeight-80  +'px'}
       let ChartsStyle={height: (document.documentElement.clientHeight*0.35)  +'px'}
       let RightHeightStyle={height: document.documentElement.clientHeight-150  +'px'}
       let TancengStyle={height: document.documentElement.clientHeight-120  +'px',width:'80%'}
       this.setState({BodyStyle:BodyStyle,ChartsStyle:ChartsStyle,RightHeightStyle:RightHeightStyle,TancengStyle:TancengStyle})
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
  componentDidMount() {
      window.addEventListener('resize', this.resizeWindow1)
  }
  componentWillUnmount() {
         window.removeEventListener('resize', this.resizeWindow1)
  }




}


function mapDispatchToProps (dispatch) {
        return bindActionCreators({...commonActions,...actions}, dispatch);
    };
export default connect(state => state.gailanshuibeng, mapDispatchToProps)(GailanShuibeng);
