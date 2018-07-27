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

class GailanBengzu extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }
    //
    constructor(props) {
        super(props)
        this.resizeWindow1=this.resizeWindow.bind(this)

        this.state = {
          jiancedata:{pagename:'jiance_jiankong_28-2',status:2,
              d1:{data:[],status:2},
              d2:{data:[],status:2},
              d3:{data:[],status:2},
              d4:{data:[],status:2},
              d5:{data:[],status:2},


          },
          pageRequest:{d8:{pageRequest:{column:"time",order:"desc",page:{pageNum:1,pageSize:5}}}},
          bzNum:'28-2',
          BodyStyle:{height: document.documentElement.clientHeight-80  +'px'},
          ChartsStyle:{height: (document.documentElement.clientHeight*0.35)  +'px'},
          RightHeightStyle:{height: document.documentElement.clientHeight-150  +'px'},
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




          }
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {

      const {jiancedata,bzNum} = this.state
      let {BodyStyle,ChartsStyle,RightHeightStyle} = this.state
      let hour = moment().hours()+1
      let dabiaolv = {'28-2':new Array(hour).fill(15).map(item=>(Math.round(item*10+(Math.random()*3-2)*10)/10)),
      '38-all':new Array(hour).fill(0.24).map((item,i)=>{
        if(i<hour-1)
          return Math.round(item*100+(Math.random()*0.05-0.02)*100)/100
        else
          return 0.12
      })}

      let dabiaolvs = {'28-2':new Array(hour).fill(17.5),'38-all':new Array(hour).fill(0.28)}

      let dabiaolvx = {'28-2':new Array(hour).fill(12),'38-all':new Array(hour).fill(0.15)}


      let dabiaoy ={'28-2':'m','38-all':'MPa'}
      //
      // var BengZuDaBiaoLvOption = {
      //     //scatterColors: ['#facc17', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
      //     //lineColors: ["#2c8cf9","#00e099","#facc17","#5c67e5"],
      //     grid: ['20%','15%','5%','5%'],
      //     scatterColors: ["#73eecc","#00e099","#facc17","#5c67e5"],
      //     xAxis: {name:"m³/h",data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
      //     yAxis: {name:["P/pa"]},
      //     series: {
      //             scatters:[
      //                {
      //                 name:'故障',
      //                // symbolSize: 20,
      //                 //itemStyle:{color:'#73eecc'},
      //                 data:
      //                 [
      //                     [10.0, 8.04],
      //                     [8.0, 6.95],
      //                     [13.0, 7.58],
      //                     [9.0, 8.81],
      //                     [11.0, 8.33],
      //                     [14.0, 9.96],
      //                     [6.0, 7.24],
      //                     [4.0, 4.26],
      //                     [12.0, 10.84],
      //                     [7.0, 4.82],
      //                     [5.0, 5.68]
      //                 ],
      //                 //type: 'scatter',
      //                 markArea:
      //                 {
      //                     itemStyle:{normal:{color:'rgba(252, 243, 170, 0.39)'}},
      //                     data: [[{
      //                                 xAxis:6,
      //                                 yAxis:5
      //                             },
      //                             {
      //                                 xAxis:12,
      //                                 yAxis:10
      //                             }]]
      //                 }
      //              }]
      //    }
      // };
      var BengZuDaBiaoLvOption =
      {
        title: "",
        grid: ['40%','15%','5%','5%'],
        legend:{left:'30%',top:'-6%'},
        lineColors:  ['#facc17','#73ecee','white'], //可选
        barWidth:8,
        xAxis: {name:"时",data:new Array(hour).fill(80).map((item,i)=>(i))},
        yAxis: {name:[dabiaoy[bzNum]]},
        series:{

                  lines:[
                           {name:"下限",data:dabiaolvs[bzNum],lineStyle:{ type:'dashed'} },
                           {name:"上限",data:dabiaolvx[bzNum],lineStyle:{ type:'dashed'} },
                           {name:"实时",data: dabiaolv[bzNum]}
                        ],
               }
      };


      var ShuiBengXiaoLvOption = {
          //scatterColors: ['#facc17', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
          lineColors: ["#73eecc","#facc17","#5c67e5"], //2c8cf9
          scatterColors: ["#73eecc","#facc17","#5c67e5"],  //2c8cf9
          grid: ['20%','15%','5%','5%'],
          legend:{left:'30%',top:'-4%'},
          //xAxis: {type:"category",name:"m³/h",data:[924,1082,1281,1508,1797,2046,2160,2284]},
          xAxis: [{type:"value",name:"m³/h"},{type:"value",name:"m³/h"}],
          yAxis: {name:["%"]},
          tooltip:{
                    trigger: 'item',//'axis',
                  },
          series: {

                  // lines:   [
                  //             {name:"203水泵",data:[75,80,85,87,88,87,85,82].map(item=>(Math.round(item)))},
                  //             {name:"204水泵",data:[79,82,85,87,88,87,85,82].map(item=>(Math.round(item)))},
                  //          ]
                  // scatters:[

                  //             {
                  //                 name:bzNum=='28-2'?"203泵":"2泵",
                  //                // symbolSize: 20,
                  //                // itemStyle:{color:'#facc17'},
                  //                 data:
                  //                 [
                  //                     [3, 79],
                  //                     [3, 82.95],
                  //                     [4, 79.58],
                  //                     [4, 82.95],
                  //                     [5, 82.95],

                  //                 ]
                  //             },
                  //             {
                  //                 name:bzNum=='28-2'?"204泵":"3泵",
                  //                // symbolSize: 20,
                  //                // itemStyle:{color:'#facc17'},
                  //                 data:
                  //                 [
                  //                     [3, 78],
                  //                     [3, 81.95],
                  //                     [4, 80.58],
                  //                     [4, 84.95],
                  //                     [5, 81.25],

                  //                 ]
                  //             }

                  //          ]


                  lines:   [
                              {name:bzNum=='28-2'?"203泵":"2泵",xAxisIndex:0,data:[[0,75],[8,80],[16,85],[24,87],[32,88],[40,82] ] },
                              {name:bzNum=='28-2'?"204泵":"3泵",xAxisIndex:0,data:[[0,79],[8,82],[16,80],[24,67],[32,75],[40,80] ] },
                           ],

                  scatters:[
                      {
                          name:bzNum=='28-2'?"203泵":"2泵",
                          xAxisIndex:0,
                         // symbolSize: 20,
                         // itemStyle:{color:'#facc17'},
                          data:
                          [
                              [3, 79],
                              [6, 82.95],
                              [14, 79.58],
                              [24, 82.95],
                              [35, 82.95],

                          ]
                      },
                      {
                          name:bzNum=='28-2'?"204泵":"3泵",
                          xAxisIndex:1,
                         // symbolSize: 20,
                         // itemStyle:{color:'#facc17'},
                          data:
                          [
                              [900, 70],
                              [1030, 71.95],
                              [1230, 70.58],
                              [1500, 74.95],
                              [1600, 71.25],
                          ]
                      }
                    ]
         }
      }

      var GuZhangPanBieOption =
          {
            //lineColors:  ['#facc17','#73ecee','white'], //可选
            lineColors: ["#73eecc","#00e099","#facc17","#5c67e5","#f04864"], //2c8cf9
            barWidth:8,
            grid: ['40%','15%','5%','5%'],
            legend:{left:'30%',top:'-4%'},
            xAxis: {name:"",data:['管路堵塞','密封环磨损','叶轮与密封环磨擦','吸水管漏气','发生汽蚀','润滑油不够',
              '叶轮损坏','泵轴与电机轴不同心','转速低','地脚螺栓松动']}, //月
            yAxis: {name:["%"]},
            series:{
                      lines:[
                               {name:bzNum=='28-2'?"203泵":"2泵",data:new Array(10).fill(6).map(item=>(Math.round(item*(1+Math.random()/2)))), areaStyle: {normal: {color:"rgb(250, 204, 22,0.3)"}} },
                               {name:bzNum=='28-2'?"204泵":"3泵",data:new Array(10).fill(4).map(item=>(Math.round(item*(1+Math.random()/2)))), areaStyle: {normal: {color:"rgb(0, 224, 153,0.3)"}}  },
                               {name:"警戒",data:new Array(10).fill(30),lineStyle:{ type:'dashed'} },
                            ],
                   }
          };

      var ShuiBengXiaoLvFenBu =
         {
           //lineColors:  ['#facc17','#73ecee','white'], //可选
           lineColors: ["#73eecc","#00e099","#facc17","#5c67e5","#f04864"], //2c8cf9
           barWidth:8,
           grid: ['40%','15%','5%','5%'],
           legend:{left:'30%',top:'-4%'},
           xAxis: {name:"%",data:[10,20,30,40,50,60,70,80,90,100]}, //月
           yAxis: {name:["时长"]},
           series:{
                     lines:[

                              {name:bzNum=='28-2'?"203泵":"2泵",data:[0,0,0,0,0,8,86,70,640,0] },
                              {name:bzNum=='28-2'?"204泵":"3泵",data:[0,0,0,0,0,0,72,54,639,0] },

                           ],
                  }
         };
      let svgpath = `/resources/${bzNum}.svg`;
      let svgdata = []
      jiancedata.d1.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:1})))
      jiancedata.d2.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:2})))
      jiancedata.d3.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:3})))
      jiancedata.d4.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:4})))
      jiancedata.d5.data.forEach((item,i)=>(svgdata.push({pointid:i+1,value:item,valuetype:5})))


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
        }
      ]
      let xiaoxis = this.props.xiaoxis?this.props.xiaoxis.slice(0,3):[]

        return (
          <div className="gailanbengzu theBody" style={BodyStyle}>
            <ToastContainer ref="toastcontainer" className="toast-top-right"/>

            <div className="gailanzonglan-top">
                <h2>泵组</h2>
                <div className="query-data">
                <Dropdown placeholder='泵组选择' fluid  selection  options={options}
                  value = {bzNum} onChange={::this.changeBz}/>
                </div>
                <span>更新时间: {moment().format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div className="gailanzonglan-body " style={RightHeightStyle}>
                <div className="gailanzonglan-left">
                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'dabiaolv')}>
                    <h3>达标判别</h3>
                    <div className="charts" style={ChartsStyle} >
                        <ReactEcharts
                            option={GeneralCharts.theLineBar( BengZuDaBiaoLvOption )}  //XiangMuDaBiaoLv
                            className="charts-body"/>
                        <div className="charts-text" >
                          {bzNum=='38-all'?<span>压力偏低，提高变频器频率，或减小阀门开度，与需求相匹配</span>:<span>无</span>}
                        </div>
                    </div>
                  </div>
                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'zuoyelv')} >
                    <h3>故障判别</h3>
                    <div className="charts" style={ChartsStyle}>
                        <ReactEcharts
                          option={GeneralCharts.theLineBar(GuZhangPanBieOption)}  //XiangMuZuoYeLv
                           className="charts-body"/>
                         <div className="charts-text">无</div>
                    </div>
                  </div>

                </div>
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
                      <div className="gailanzonglan-center-bot-right" >
                          <div className="gongdan-body-1">
                              <div className="gongdan-item">
                                  <div className="icon jiedian-icon"></div>
                                <div className="item"><span>20<sub>%</sub></span><h3>节电率</h3></div>
                              </div>
                              <div className="gongdan-item">
                                  <div className="icon jiankang-icon"></div>
                                <div className="item"><span>92<sub>%</sub></span><h3>健康度</h3></div>
                              </div>
                          </div>
                          <div className="gongdan-body-2">
                              <div className="gongdan-item">
                                  <div className="icon daiban-icon"></div>
                                <div className="item"><span>1</span><h3>待办</h3></div>
                              </div>
                              <div className="gongdan-item">
                                  <div className="icon yiban-icon"></div>
                                <div className="item"><span>2</span><h3>办结</h3></div>
                              </div>
                          </div>
                      </div>

                    </div>
                </div>
                <div className="gailanzonglan-left">
                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'nengxiao')}>
                    <h3>水泵效率</h3>
                    <div className="charts" style={ChartsStyle}>
                        <ReactEcharts
                          option={GeneralCharts.theLineBar( ShuiBengXiaoLvOption)}
                           className="charts-body"/>
                         <div className="charts-text">无</div>
                    </div>

                  </div>

                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'jiankangdu')}>
                    <h3>健康度</h3>
                    <div className="charts" style={ChartsStyle} >
                        <ReactEcharts
                            option={GeneralCharts.theLineBar( ShuiBengXiaoLvFenBu )}  //XiangMuDaBiaoLv
                            className="charts-body"/>
                        <div className="charts-text" >
                        <span>无</span>
                        </div>
                    </div>
                  </div>
                </div>
           </div>
           {/*this.state.tanceng&&<TanChuang
             type={this.state.tanchuang_type}
             shuju={this.state.shuju}
             tanchuangClose={::this.tanchuangClose}
             TancengStyle={this.state.TancengStyle}
           />*/}
          </div>
        )
    }


    changeBz(t,ev){
      let bzNum = ev.value
      let pagename = `jiance_jiankong_${bzNum}`
      let jiancedata = {pagename:pagename,status:2,
          d1:{data:[],status:2},
          d2:{data:[],status:2},
          d3:{data:[],status:2},
          d4:{data:[],status:2},
          d5:{data:[],status:2},
      }

      this.setState({bzNum:bzNum,jiancedata:jiancedata})

      this.getNewPageData(pagename,jiancedata)


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
            this.setState({BodyStyle:BodyStyle,ChartsStyle:ChartsStyle,RightHeightStyle:RightHeightStyle})
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
    export default connect(state => state.gailanbengzus, mapDispatchToProps)(GailanBengzu);
