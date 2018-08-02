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

class Bengzhan extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)

        this.state = {

          time:"10:00"

        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    // 不同的item 调不同的components 展示完成后[销毁]
    // 公共的弹层组件 内容不同
    render() {
      // const YueShuShuiLiang_1 = {data1:{name:"去年",value:[23,23,23,23,23,23,23]},
      // data2:{name:"今年",value:[13,53,6,34,64,23,35]},
      // x:[1,2,3,4,5,6,7],
      // axis:{y:"m3",x:"月",title:""}};

      // const YueHaoDianLiang1 = {
      // data1:{name:"耗电量",value:[13,53,6,34,64,23,35]},
      // x:[1,2,3,4,5,6,7],
      // axis:{y:"kWh",x:"月",title:""}};

      // const DunShuiNengHao1 = {data1:{name:"去年",value:[23,23,23,23,23,23,23]},
      // data2:{name:"今年",value:[13,53,6,34,64,23,35]},
      // x:[1,2,3,4,5,6,7],
      // axis:{y:"kWh/t",x:"月",title:""}}


     var YueShuShuiLiang =
      {
        title: "月输水量",
        barColors:  [['#2fd0e3','#2fd0e3','#2fd0e3'],['#677ee0','#677ee0','#677ee0'],['#ff7687','#ff7687','#ff7687']], //可选
        barWidth:8,
        xAxis: {name:"月",data:[1,2,3,4,5,6,7]},
        yAxis: {name:["m3"]},
        series:{
                  bars: [
                          {name:"去年",data:[23,23,23,23,23,23,23]},
                          {name:"今年",data:[13,53,6,34,64,23,35]}
                        ]
               }
      };



    var YueHaoDianLiang =
      {
        title: "月耗电量",
        barColors:  [['#dbb250','#dbb250','#dbb250'],['#677ee0','#677ee0','#677ee0'],['#FFD531','#FC9000','#F34E00']], //可选
        barWidth:8,
        xAxis: {name:"月",data:[1,2,3,4,5,6,7]},
        yAxis: {name:["kWh"]},
        series:{
                  bars: [
                          {name:"耗电量",data:[13,53,6,34,64,23,35]}
                        ]
               }
      };


     var DunShuiNengHao =
      {
        title: "月吨水能耗",
        barColors:  [['#2fd0e3','#2fd0e3','#2fd0e3'],['#677ee0','#677ee0','#677ee0'],['#ff7687','#ff7687','#ff7687']], //可选
        barWidth:8,
        xAxis: {name:"月",data:[1,2,3,4,5,6,7]},
        yAxis: {name:["kWh/t"]},
        series:{
                  bars: [
                          {name:"去年",data:[23,23,23,23,23,23,23]},
                          {name:"今年",data:[13,53,6,34,64,23,35]}
                        ]
               }
      };


      /* 28泵站一组；   2）28泵站二组；  3）38泵站泵组

4）黄河3#泵站；   5）黄河4#泵站； 6）调节泵站；

7）6#泵站3组；     8）6#泵站5组；  9）6#泵站6组；

10）气浮泵站1组； 11）气浮泵站2组； 12）澄清泵站。
*/

       // option={MyCharts.MoreBar(BengZuDunShui)}  Line3Bar(line3BarDatas)
      // const BengZuDunShui1 = {
      // y:{name:"吨水能耗",value:[13,53,6,34,64,23,35,47,87,62]}, //73,,28
      // x:['28泵站-1','28泵站-2','38泵站泵组','黄河3#','黄河4#','调节泵站','6#泵站-3','气浮泵站-1','气浮泵站-2','澄清泵站'], //'6#泵站-6', '6#泵站-5',
      // axis:{y:"kWh/t",x:"泵组",title:""}}
      // const DunShuiNengHaoLine = {
      // y:{name:"吨水能耗",value:[13,53,6,34,64,23,35]},
      // x:['1:00','2:00','3:00','4:00','5:00','6:00','7:00'],
      // axis:{y:"kWh",x:"h",title:""}}

   //SingleLine(DunShuiNengHaoLine)
   //
   // var line3BarDatas1 =
   //  {
   //  data: [{name:"总吨水能耗",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
   //  {name:"28#中心泵站",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
   //  {name:"黄河3#中心泵站",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))},
   //  {name:"6#中心泵站",value:[50,50,50,50,50,50,50].map(item=>(Math.round(item*(1+Math.random()/5)*10)/10))}],
   //  x:['1:00','2:00','3:00','4:00','5:00','6:00','7:00'],
   //  legenddata:["总吨水能耗",'28#中心泵站','黄河3#中心泵站','6#中心泵站'],
   //  axis : {y:["kWh/t","%"],x:"h",title:"28#泵组"}};


   var BengZuDunShui =
    {
      title:'泵组吨水能耗',
      legend:{left:'center'},
      barWidth:24,
      //barColors:  [['#2febf9','#28d2f9','#0c6df9'],['#FFD531','#FC9000','#F34E00'],['#FFD531','#FC9000','#F34E00']], //可选
      xAxis: {name:"",data:['28泵站-1','28泵站-2','38泵站泵组','黄河3#','黄河4#','调节泵站','6#泵站-3','气浮泵站-1','气浮泵站-2','澄清泵站']},
      yAxis: {name:["kWh/t"]},
      series:{
              bars: [
                        {name:"吨水能耗",data: [13,53,6,34,64,23,35,47,87,62] }
                     ]
             }
    };


   //实时吨水能耗
   var line3BarDatas =
    {
      title:'实时吨水能耗',
      legend:{left:'center'},
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


      //alert(document.documentElement.clientHeight*295/900)


      // const PanelCharsStyle={
      //     width: document.documentElement.clientWidth*390/1920+'px',
      //     height: document.documentElement.clientHeight*295/900 - 30 +'px'}

      // const RightCharsStyle={
      //     width: document.documentElement.clientWidth*1212/1920+'px',
      //     height: document.documentElement.clientHeight*352/900 - 35 +'px'}
      // const leftPanelHeight = {  height :  document.documentElement.clientHeight*295/900 +'px'  }
      // const rightMidHeight =   {  height : document.documentElement.clientHeight*352/900 +20 +'px' }
      // const rightBotHeight =   {  height : document.documentElement.clientHeight*352/900  +'px' }



      const PanelCharsStyle={
          width: document.documentElement.clientWidth*390/1920+'px',
          height: (document.documentElement.clientHeight -200)/3 - 35 +'px'}
      const RightCharsStyle={
          width: document.documentElement.clientWidth*1212/1920+'px',
          height: (document.documentElement.clientHeight -200 - 140 )/2-30   +'px'}
      const leftPanelHeight = {  height : (document.documentElement.clientHeight -200)/3  +'px'  }
      const rightMidHeight =   {  height : (document.documentElement.clientHeight -200 - 140 )/2   +'px' }
      const rightBotHeight =   {  height : (document.documentElement.clientHeight -200 - 140 )/2  +'px' }



        return (
          <div className="nengxiaogailan theBody">
            <div className="nengxiaogailan-left">
              <div className="nengxiaogailan-left-panel contentDiv" style={leftPanelHeight}>
               {/* <h3>月输水量</h3> */}
                <ReactEcharts
                     //option={MyCharts.TwoBar(YueShuShuiLiang)}
                    option={GeneralCharts.theLineBar(YueShuShuiLiang)}
                    style={PanelCharsStyle}/>

              </div>
              <div className="nengxiaogailan-left-panel contentDiv" style={leftPanelHeight}>
                {/* <h3>月耗电量</h3>*/}
                <ReactEcharts
                    //option={MyCharts.OneBar(YueHaoDianLiang)}
                    option={GeneralCharts.theLineBar(YueHaoDianLiang)}
                    style={PanelCharsStyle}/>

              </div>
              <div className="nengxiaogailan-left-panel contentDiv" style={leftPanelHeight}>
                {/* <h3>月吨水能耗</h3>*/}
                <ReactEcharts
                    //option={MyCharts.TwoBar(DunShuiNengHao)}
                    option={GeneralCharts.theLineBar(DunShuiNengHao)}
                    style={PanelCharsStyle}/>


              </div>
            </div>
            <div className="nengxiaogailan-right">
              <div className="nengxiaogailan-right-top">
                <div className="nengxiaogailan-right-top-tab contentDiv labStyle">
                  <span>年输水量</span>
                  <span className="numStyle">54678</span>
                  <span>m3</span>

                </div>

                <div className="nengxiaogailan-right-top-tab contentDiv labStyle">
                  <span>年耗电量</span>
                  <span className="numStyle">54678</span>
                  <span>kWh</span>
                </div>
                <div className="nengxiaogailan-right-top-tab contentDiv labStyle">
                  <span>水损失量</span>
                  <span className="numStyle">452</span>
                  <span>m3</span>
                </div>
                <div className="nengxiaogailan-right-top-tab contentDiv labStyle">
                  <span>水利用率</span>
                  <span className="numStyle">45</span>
                  <span>%</span>
                </div>
                <div className="nengxiaogailan-right-top-tab contentDiv labStyle">
                  <span>累计运行时间</span>
                  <span className="numStyle">54678</span>
                  <span>h</span>
                </div>


              </div>
              <div className="nengxiaogailan-right-mid  contentDiv" style={rightMidHeight}>
                <ReactEcharts
                    //option={MyCharts.Line3Bar(line3BarDatas)}
                    option={GeneralCharts.theLineBar(line3BarDatas)}
                    style={RightCharsStyle}/>

              </div>

              <div className="nengxiaogailan-right-bot  contentDiv" style={rightBotHeight}>

                <ReactEcharts
                    //option={MyCharts.MoreBar(BengZuDunShui)}
                    option={GeneralCharts.theLineBar(BengZuDunShui)}
                    style={RightCharsStyle}/>
              </div>
            {/*
              <div className="nengxiaogailan-right-mid" style={rightMidHeight}>
                <ReactEcharts
                    option={GeneralCharts.theLineBar(theLineBarOption)}
                    style={RightCharsStyle}/>

              </div>

             <div className="nengxiaogailan-right-mid" style={rightMidHeight}>
                <ReactEcharts
                    option={GeneralCharts.thePie(thePieOption)}
                    style={RightCharsStyle}/>

              </div>
           */}

            </div>



          </div>

        )
    }







timeChange(t){
  
  this.setState({time:t})
}





   componentWillReceiveProps(nextprops){

        }




    componentDidMount() {

   }



   componentWillUnmount() {
   }


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => null, mapDispatchToProps)(Bengzhan);
