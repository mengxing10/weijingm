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
import SVGIDMap from './components/SVGMAPBYID'
import * as commonActions from '../../common/actions.js'
import {ToastContainer} from "react-toastr"
import Loading from '../../common/components/Loading'
import { DateField,DatePicker } from 'react-date-picker'
import moment from 'moment'
import TanChuang from './components/TanChuang'
class GailanXiangmu extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }
    //
    constructor(props) {
        super(props)
        this.resizeWindow1=this.resizeWindow.bind(this)

        this.state = {
          jiancedata:{pagename:'jiance_zonglan',status:2,
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
          ChartsStyle:{height: (document.documentElement.clientHeight*0.35)  +'px'},
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

        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
      const {jiancedata} = this.state
      const {optionsType} = this.state
      let {BodyStyle,ChartsStyle,RightHeightStyle,TancengStyle} = this.state
      let hour = moment().hours()+1
      let dabiaolv = new Array(hour).fill(96).map(item=>(Math.round(item*(1+Math.random()/50)*10)/10))
      let zuoyelv = new Array(hour).fill(56).map(item=>(Math.round(item*(1+Math.random()/50)*10)/10))
      let dunshuinenghao = new Array(hour).fill(0.38).map(item=>(Math.round(item*(1+Math.random()/50)*100)/100))

      const options = [
        {
          key: '实时数据',
          text: '实时数据',
          value: 'shishi',
        },
        {
          key: '小时数据',
          text: '小时数据',
          value: 'xiaoshi',
        },
        {
          key: '逐日数据',
          text: '逐日数据',
          value: 'ri',
        },
        {
          key: '逐月数据',
          text: '逐月数据',
          value: 'yue',
        },


      ]

      var XiangMuDaBiaoLv =
      {
        title: "",
        grid: ['40%','15%','5%','5%'],
        legend:{left:'30%',top:'-6%'},
        lineColors:  ['#facc17','#73ecee','white'], //可选
        barWidth:8,
        xAxis: {name:"时",data:new Array(hour).fill(80).map((item,i)=>(i))},
        yAxis: {name:["%"]},
        series:{

                  lines:[
                           {name:"良",data:new Array(hour).fill(80),lineStyle:{ type:'dashed'} },
                           {name:"优",data:new Array(hour).fill(99),lineStyle:{ type:'dashed'} },
                           {name:"实时",data: dabiaolv}
                        ],
               }
      };



      var XiangMuZuoYeLv =
      {
        title: "",
        grid: ['40%','15%','5%','5%'],
        legend:{left:'30%',top:'-6%'},
        lineColors:  ['#facc17','#73ecee','white'], //可选
        barWidth:8,
        xAxis: {name:"时",data:new Array(hour).fill(80).map((item,i)=>(i))}, //月
        yAxis: {name:["%"]},
        series:{

                  lines:[
                           {name:"良",data:new Array(hour).fill(50),lineStyle:{ type:'dashed'} },
                           {name:"优",data:new Array(hour).fill(70),lineStyle:{ type:'dashed'} },
                           {name:"实时",data:zuoyelv  }
                        ],
               }
      };
      //健康度:
      var JianKangDu =
      {
        lineColors:['white'],
        grid: ['40%','15%','5%','5%'],
        legend:{left:'30%',top:'-6%'},
       // barColors:  [['#2fd0e3','#2fd0e3','#2fd0e3'],['#677ee0','#677ee0','#677ee0'],['#ff7687','#ff7687','#ff7687']], //可选
        barColors:  [['#73ecee','#73ecee','#73ecee'],['#f04864','#f04864','#f04864']],
        barWidth:8,
        xAxis: {name:"时",data:new Array(hour).fill(80).map((item,i)=>(i))},  //月
        yAxis: {name:["台","%"]},
        series:{
                  lines:[
                          {name:"健康度",yAxisIndex:0,data:new Array(hour).fill(89).map(item=>(Math.round(item*(1+Math.random()/50)*10)/10)) }
                        ],
                  bars: [
                          {name:"正常台数",yAxisIndex:1,data:new Array(hour).fill(4),stack:'个数'},
                          {name:"维修台数",yAxisIndex:1,data:new Array(hour).fill(0),stack:'个数'}
                        ]
               }
      };
      var JianKangDu_tc =
      {
        lineColors:['white'],
        grid: ['40%','15%','5%','5%'],
        legend:{left:'30%',top:'6%'},
       // barColors:  [['#2fd0e3','#2fd0e3','#2fd0e3'],['#677ee0','#677ee0','#677ee0'],['#ff7687','#ff7687','#ff7687']], //可选
        barColors:  [['#73ecee','#73ecee','#73ecee'],['#f04864','#f04864','#f04864']],
        barWidth:8,
        xAxis: {name:"h",data:[1,2,3,4,5,6,7,8,9,10,11,12]},  //月
        yAxis: {name:["台","%"]},
        series:{
                  lines:[
                          {name:"健康度",yAxisIndex:0,data:[19,63,56,34,24,73,55,42,39,26,29,65] }
                        ],
                  bars: [
                          {name:"正常台数",yAxisIndex:1,data:[33,43,23,33,63,33,33,38,29,54,41,29],stack:'个数'},
                          {name:"维修台数",yAxisIndex:1,data:[13,23,6,14,24,13,25,18,11,35,29,16],stack:'个数'}
                        ]
               }
      };


      //能效:
      var XiangMuNengXiao =
      {
        lineColors:  ['#facc17','#73ecee','white'], //可选
       // barColors:  [['#2fd0e3','#2fd0e3','#2fd0e3'],['#677ee0','#677ee0','#677ee0'],['#ff7687','#ff7687','#ff7687']], //可选
        barColors:  [['#5c67e5','#5c67e5','#5c67e5'],['#facc17','#facc17','#facc17'],['#00e099','#00e099','#00e099']],
        barWidth:8,
        legend:{left:'10%',top:'-6%'},
        grid: ['40%','15%','5%','5%'],
        xAxis: {name:"时",data:new Array(hour).fill(80).map((item,i)=>(i))},  //月
        yAxis: {name:["组","kW.h/t"]},
        series:{
                  lines:[
                          {name:"基准线",data:new Array(hour).fill(0.7),lineStyle:{ type:'dashed'} },
                          {name:"最优线",data:new Array(hour).fill(0.3),lineStyle:{ type:'dashed'} },
                          {name:"吨水能耗",yAxisIndex:0,data:dunshuinenghao},

                        ],
                  bars: [
                          {name:"低能效",yAxisIndex:1,data:new Array(hour).fill(0),stack:'个数'},
                          {name:"中能效",yAxisIndex:1,data:new Array(hour).fill(0),stack:'个数'},
                          {name:"高能效",yAxisIndex:1,data:new Array(hour).fill(3),stack:'个数'}
                        ]
               }
      };
      //实时吨水能耗
      var line3BarDatas =
      {
        title:'实时吨水能耗',
        legend:{left:'10%',top:'-10%'},
        grid: ['40%','15%','5%','5%'],
        //lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
       // barColors:  [['#53ff53','#00ec00','#00bb00'],['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
        xAxis: {name:"h",data:['1:00','2:00','3:00','4:00','5:00','6:00','7:00']},
        yAxis: {name:["kWh/t"]},
        series:{
                  lines:[
                          {name:"总电耗",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          //{name:"总吨水能耗",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}
                       ],
                  bars: [
                          {name:"28#中心泵站",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          {name:"黄河3#中心泵站",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          {name:"6#中心泵站",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10)) }
                       ]
               }
      };
      //test theBarLine: 示例
      var theLineBarOption =
      {
        title: "28#泵组",
        grid: ['40%','15%','5%','5%'],
        legend:{
                 // orient: 'horizontal',  //horizontal vertical
                  left:'center', //auto 'left', 'center', 'right'
                  //top:'top', //auto 'top', 'middle', 'bottom'
               },

        lineColors: ['#FF6200', '#FFEE2B', '#84d5d8', 'f8910c','#2c8cf9'], //可选
        barColors:  [['#53ff53','#00ec00','#00bb00'],['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00']], //可选
        xAxis: {name:"h",data:['1:00','2:00','3:00','4:00','5:00','6:00','7:00']},
        yAxis: {name:["kWh/t","%"]},
        series:{
                  lines:[
                          {name:"总电耗",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          {name:"总吨水能耗",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}

                       ],
                  bars: [
                          {name:"28#中心泵站",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          {name:"黄河3#中心泵站",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
                          {name:"6#中心泵站",data:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10)) }
                       ]
               }
      };
       //示例：
      var thePieOption=
       {
            title: "能源消耗占比",
            legend: {
                    orient: 'vertical',  //horizontal vertical
                    left:'left', //auto 'left', 'center', 'right'
                    top:'auto', //auto 'top', 'middle', 'bottom'
                    },
            //color: ['red','#FF6200', '#FFEE2B', '#84d5d8', '#c4ccd3'], //可选项
            series:{
                      pies:{
                            name:"能源类型",
                            radius: ['50%', '70%'],
                            data:[
                                    {value:335, name:'直接访问'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1548, name:'搜索引擎'}
                                 ]
                            }
                   }
          };
      let svgpath = '/resources/xiangmu.svg';
      let svgdata = []

      let xiaoxis = this.props.xiaoxis?this.props.xiaoxis.slice(0,3):[];

        return (
          <div className="gailanxiangmu theBody"  style={BodyStyle}>
            <ToastContainer ref="toastcontainer" className="toast-top-right"/>
            <div className="gailanzonglan-top">
                <h2>项目</h2>
                <span>更新时间: {moment().format("YYYY-MM-DD HH:mm")}</span>
            </div>
            <div className="gailanzonglan-body " style={RightHeightStyle}>
                <div className="gailanzonglan-left">
                  <div className="gailanzonglan-left-panel contentDiv">
                    <h3>达标率</h3>
                    <div className="charts" style={ChartsStyle} onClick={this.tanchuangOpen.bind(this,'dabiaolv')}>
                        <ReactEcharts
                            option={GeneralCharts.theLineBar( XiangMuDaBiaoLv )}  //XiangMuDaBiaoLv
                             className="charts-body"/>
                        <div className="charts-text" >
                          <div className={classNames({active:false})}></div>
                        <span>达标率{dabiaolv[hour-1]}%，环比上升8%</span>
                        </div>
                    </div>
                  </div>
                  <div className="gailanzonglan-left-panel contentDiv" >
                    <h3>作业率</h3>
                    <div className="charts" style={ChartsStyle} onClick={this.tanchuangOpen.bind(this,'zuoyelv')} >
                        <ReactEcharts
                          option={GeneralCharts.theLineBar(XiangMuZuoYeLv)}  //XiangMuZuoYeLv
                           className="charts-body"/>
                        <div className="charts-text">优化空间5%,节省能耗300kW·h</div>
                    </div>
                  </div>

                </div>
                <div className="gailanzonglan-center">

                    <div className="gailanzonglan-center-mid">
                      <SVGIDMap svg={svgpath} width="95%" height="95%" data={svgdata} goNewPage = {::this.goNewPage} id='svg-03'/>
                    </div>
                    <div className="gailanzonglan-center-bot  ">
                      <div className="gailanzonglan-center-bot-left ">
                        {xiaoxis.map(item=>(<div className="xiaoxi-item"onClick={this.toXiaoXi.bind(this,item.messageTypeID)}>
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
                                <div className="item"><span>20<sub>%</sub></span><h3>节电率</h3></div>
                              </div>
                              <div className="gongdan-item">
                                  <div className="icon jiankang-icon"></div>
                                <div className="item"><span>90<sub>%</sub></span><h3>健康度</h3></div>
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
                  <div className="gailanzonglan-left-panel contentDiv" onClick={this.tanchuangOpen.bind(this,'nengxiao')} >
                    <h3>能效</h3>
                    <div className="charts" style={ChartsStyle}>
                        <ReactEcharts
                          option={GeneralCharts.theLineBar( XiangMuNengXiao)}
                           className="charts-body"/>
                        <div className="charts-text">整体优化空间4.9%，优化后预计年节省电量19万kWh</div>
                    </div>

                  </div>

                  <div className="gailanzonglan-left-panel contentDiv">
                    <h3>健康度</h3>
                    <div className="charts" style={ChartsStyle} onClick={this.tanchuangOpen.bind(this,'jiankangdu')} >
                        <ReactEcharts
                            option={GeneralCharts.theLineBar( JianKangDu )}  //XiangMuDaBiaoLv
                            className="charts-body"/>
                        <div className="charts-text" >
                          <span>无</span>
                        </div>
                    </div>
                  </div>
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
      this.setState({tanchuang_type:type,tanceng:true})
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
    goNewPage(pumpGroup){
      browserHistory.push(`/bgp/pc/gailan/bengzu?groupid=${pumpGroup}`);
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
export default connect(state => state.gailanxiangmu, mapDispatchToProps)(GailanXiangmu);
