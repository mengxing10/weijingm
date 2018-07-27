/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from 'moment'
import {Button, Input, Icon, Divider, Popup, Dropdown} from 'semantic-ui-react'
import classNames from 'classnames'
import CsvFetch from './components/CsvFetch.js'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { DateField,DatePicker } from 'react-date-picker'
import {reportAPI} from './constants/api'
import 'react-date-picker/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import * as actions from './actions.js'
import CudismPlot from'./components/cubismplot/cubismplot.js'
import 'rc-tree/assets/index.css';
import Tree, { TreeNode } from 'rc-tree';
import './styles/index.styl'



class Quxian extends Component {


    constructor(props) {
        super(props)

        this.state = {
            addmnitem: false,
            startDate:  moment().add(-1,"day"),
            endDate: moment(),
            isOpened: false,
            fetchcditem:false,
            deviceFilter:'',
            infos:[],
            dataIntever:'5m'
        }
    }


    // 根据type + query
    // type决定title
    // type + query决定table数据
    render() {

      let pars ={}
      let datatypes=this.props.datatypes.data;
      let {curveslist} = this.props

      let width =900
      let horizon_height=80
      let labels=curveslist.map(item=>{
        let name;
        datatypes.forEach(iitem=>{if(iitem.key==item.datatype){name= iitem.name}})
        return name
      })
      curveslist.forEach((item,i)=>{
        let name;
        datatypes.forEach(iitem=>{if(iitem.key==item.datatype){name= iitem.name}})
        curveslist[i]["name"]=name
      })
      const {dataIntever} = this.state
      const dataoptions = [
        {
          key: '实时数据',
          text: '实时数据',
          value: '5m',
        },
        {
          key: '小时数据',
          text: '小时数据',
          value: '1h',
        },
        {
          key: '逐日数据',
          text: '逐日数据',
          value: '1d',
        },
        {
          key: '逐月数据',
          text: '逐月数据',
          value: '1M',
        },


      ]


      const options =this.props.datatypes.data.map(item=>({key:item.key,text:item.name,value:item.key}))
      const { currentValues } = this.state
      const BodyStyle={height: document.documentElement.clientHeight-130   +'px'}
        return (
          <div>
                <div className='chaxun' style={BodyStyle}>
                  <div className="top-charts">
                    <div className="query-data">
                      <Dropdown placeholder='时间间隔' fluid  selection  options={dataoptions} onChange = {this.changeInt.bind(this)}
                        value = {dataIntever}/>
                    </div>
                    <div className="query-condition">

                        <label>日期</label>
                            <DateField
                                dateFormat="YYYY-MM-DD HH:mm:ss"
                                locale="zh-cn"
                                forceValidDate={true}
                                updateOnDateClick={true}
                                // defaultValue={1495031479774}
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
                                    footer={false}
                                    />
                            </DateField>
                            <label>至</label>
                              <DateField
                              dateFormat="YYYY-MM-DD HH:mm:ss"
                              locale="zh-cn"
                              forceValidDate={true}
                              updateOnDateClick={true}
                              // defaultValue={1495031479774}
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
                                  footer={false}
                                  />
                          </DateField>

                    </div>
                    <div className="query-btn">
                    <CsvFetch
                    url={reportAPI.baobiao}
                    query={pars}
                    parseCsv={::this.parseCsv}
                    />
                    </div>

                </div>
                  <div className="rp-wrap">
                      <div className="query-data">
                      <Dropdown placeholder='数据选择' fluid multiple selection   options={options}
                        value = {this.state.infos}
                        onChange={this.dropDownhandleChange.bind(this)} />
                      </div>

                      <div className = "contain">
                        <div className = "curves">
                          {curveslist.map((item,i)=>( <div className="charts_body">
                              <ReactEcharts ref={item.datatype}
                                option={::this.getLineOption(item,i==curveslist.length-1)}
                                style={{width: '100%', height: '100%'}}
                              />
                            </div>))}


                        {
                        // curveslist.length>0&&<CudismPlot
                        //   id= 'plot'
                        //   width ={1440}
                        //   horizon_height={80}
                        //   dates={dates}
                        //   labels={labels}
                        //   data_by_col={data_by_col}
                        //   />
                         }
                        </div>
                      </div>


                  </div>
                </div>
          </div>


        )
    }

    changeInt(e, { value }){
      this.setState({dataIntever:value})
      const {infos,startDate,endDate}  = this.state
      this.getAllCurves(infos,startDate,endDate,value)

    }

    getLineOption(item,last){
         var date = item.col.time;
         var data = item.col.value.map(item=>(item==-9999||item==-1111?0:item));
         var option = {
             tooltip: {
                 trigger: 'axis',
                 position: function (pt) {
                     return [pt[0], '10%'];
                 }
             },
             "color": [
                 "#6be6c1",
                 "#626c91",
                 "#a0a7e6",
                 "#c4ebad",
                 "#96dee8"
             ],
             xAxis: {
                "show": last,
                 type: 'category',
                 boundaryGap: true,
                 axisLabel: {
                     show: true,
                     textStyle: {
                         color:  "#4591d5",
                     }
                 },
                 axisLine: {
                   onZero:false,
                   lineStyle: {
                     show: true,
                     color: 'rgba(0, 0, 0, .2)',
                     width:"2"
                   }
                 },

                 data: date
             },
             yAxis: {
                 type: 'value',
                 name:item.name,
                 nameLocation :'middle',
                 nameTextStyle:{
                   color:"#a3cff6",
                   fontSize:"14",
                   fontFamily:"Microsoft YaHei"
                 },
                 axisLabel: {
                     show: true,
                     textStyle: {
                         color:  "#4591d5",

                     }
                 },
                 splitLine: {
                     lineStyle: {
                         color: 'rgba(0, 0, 0, .2)'
                     }
                 },

                 nameGap : 45,
                 boundaryGap: [0, '100%']
             },
             "grid": {
                  "top": 10,
                  "left": 60,
                  borderColor:"#2671b2",
                  bottom:last?60:10
              },

             series: [
                 {
                     name:item.name,
                     type:'line',
                     smooth:true,
                     symbol: 'none',
                     sampling: 'average',
                     data: data
                 }
             ]
         };
         return option

   }
    dropDownhandleChange(e, { value }){
          let info = value
          console.log(info);
          this.setState({infos:info})
          const {curveslist} =this.props
          const {delCurves}  =this.props
          const {getCurves} =this.props
          const {startDate,endDate,dataIntever}  = this.state
          const curvename = curveslist.map(item=>item.datatype)
          const deletename = curvename.filter(t=>{
            let ii=0
            while(ii<info.length){
              if(info[ii]==t)
                return false
             ii++;
            }
            if(ii==info.length)
               return true
          })
          const addname = info.filter(t=>{
            let ii=0
            while(ii<curvename.length){
              if(curvename[ii]==t)
                return false
             ii++;
            }
            if(ii==curvename.length)
               return true
          })
          deletename.forEach(item=>{
            delCurves({datatype:item})
          })

          addname.forEach(item=>{
            getCurves({"aggregateAndPointIds":["avg#"+item],"startDate":startDate.format('YYYY-MM-DD HH:mm:ss'),"endDate":endDate.format('YYYY-MM-DD HH:mm:ss'),"interval":dataIntever})
        })



        }
        handleChangeStart(dateString, { dateMoment, timestamp}) {
            const{infos,endDate,dataIntever} = this.state
                    if (dateMoment.toDate().getTime() > this.state.endDate.toDate().getTime()) {
                        this.setState({
                            startDate: this.state.endDate,
                            endDate: dateMoment
                        })
                    }
                    else {
                        this.setState({
                            startDate: dateMoment,
                        })
                    }
                    this.getAllCurves(infos,dateMoment,endDate,dataIntever)
                }
        handleChangeEnd(dateString, { dateMoment, timestamp}) {
                const{infos,startDate,dataIntever} = this.state
                    if (dateMoment.toDate().getTime() < this.state.startDate.toDate().getTime()) {
                        this.setState({
                            startDate: dateMoment,
                            endDate: this.state.startDate
                        })
                    }
                    else {
                        this.setState({
                            endDate: dateMoment,
                        })
                    }

                    this.getAllCurves(infos,startDate,dateMoment,dataIntever)
                }

          handleChangeInput(ev){
            // const {getDatatypes}  =this.props
            // const {infos}  =this.state
            //
            // console.log(infos);
            //
            // const {getCurves,delCurves} =this.props
            // infos.forEach(item=>{
            //   delCurves({datatype:item})
            // })
            // let pars ={}
            this.setState({"deviceFilter":ev.target.value})
            // pars["likedata"] = ev.target.value;
            // getDatatypes(pars)
            // this.setState({infos:[]})

          }
          handleChange(date) {
              this.setState({startDate: date})
          }

          filterTreeNode(node){
            // console.log(node);
            name = node.props.title
            if(name.indexOf("数据选择")>=0){
              return true
            }
            if(this.state.deviceFilter===''||name.indexOf(this.state.deviceFilter)>=0){
              return true
            }else {
              return false
            }



          }



    getAllCurves(infos,startDate,endDate,dataIntever){
      const {getCurves,delCurves} =this.props
      infos.forEach(item=>{
        delCurves({datatype:item})
      })
      //{"aggregateAndPointIds":["max#15"],"startDate":"2018-05-03 15:00:00","endDate":"2018-05-03 17:00:00","interval":"10m"}

      infos.forEach(item=>{
        getCurves({"aggregateAndPointIds":["avg#"+item],"startDate":startDate.format('YYYY-MM-DD HH:mm:ss'),"endDate":endDate.format('YYYY-MM-DD HH:mm:ss'),"interval":dataIntever})
      })


    }

    componentDidMount() {

      const {getDatatypes}  =this.props
      let project =this.props.location.query.project;
      let tableName = 'peizhi_quxian_'+project

      let pars ={}
      pars["tableName"] = tableName;
      pars["pageRequest"]={"page":{"pageSize":100,"pageNum":1}}
      getDatatypes(pars)
    }

    componentDidUpdate (){

      let {curveslist} = this.props
      let charts = curveslist.map(item=>(this.refs[item.datatype]))
      let chartsin = curveslist.map(item=>(this.refs[item.datatype].getEchartsInstance()))
      echarts.connect(chartsin)
      console.log(charts);



      // if(nextprops.location.query.datatype!=this.props.location.query.datatype||nextprops.location.query.timetype!=this.props.location.query.timetype){
      //
      //
      //   const {query} = nextprops.location
      //   const {getBaoBiaoData}  =this.props
      //   let pars ={}
      //   pars["time"] = this.state.startDate.toDate().getTime();
      //   pars["datatype"] = query.datatype?query.datatype:"all"
      //   pars["timetype"] = query.timetype?query.timetype:"hour"
      //
      //
      //   getBaoBiaoData(pars)
      // }

    }





    parseTbBodyAll(data){
      let result=''
      for(let i=0;i<data[0].length;i++){
        for(let j=0;j<data.length;j++){
          result+=data[j][i]+','
        }
        result+='\n'
        // i+=data.length
      }
      return result

    }

    parseCsv(){
      //


      const{curveslist} = this.props
      let typemap={}
      this.props.datatypes.data.forEach(item=>(typemap[item["key"]]=item.name));

      let myhead=curveslist.map(item=>typemap[item.datatype])
      let mytime =curveslist[0]?curveslist[0].col.time:[]
      let mydata= curveslist.map(item=>(item.col.value))
      mydata.unshift(mytime)
      let mybody =mydata
      let thead = ["time"]
      thead=thead.concat(myhead)
      let mthead=thead.join()+'\n'
      let arraybody = this.parseTbBodyAll(mybody)


      return mthead+arraybody
    }

}




function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.quxian, mapDispatchToProps)(Quxian);
