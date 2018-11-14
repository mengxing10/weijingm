/**
 * @file monlist
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import moment from 'moment'
import {Button, Input, Icon, Divider, Popup, Dropdown} from 'semantic-ui-react'
import classNames from 'classnames'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { DateField,DatePicker } from 'react-date-picker'
import 'react-date-picker/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import * as actions from './actions.js'
import './styles/index.styl'



class TgQuxian extends Component {


    constructor(props) {
        super(props)

        this.state = {
            tableName : 'jiance_quxian_all',
            startDate:  moment().add(-1,"day"),
            endDate: moment(),
            dataIntever:'5m'
        }
    }


    // 根据type + query
    // type决定title
    // type + query决定table数据
    render() {

      let pars ={}
      let {pointId,isOpen} = this.props
      let {dataname,curves} = this.props
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

        return (
          <div>
          {isOpen&&<div className='tgquxian'>
                <div className='tgquxianbody' >
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
                    <div className="close_icon" onClick={::this.colsePanel}></div>
                </div>
                  <div className="rp-wrap">
                    <div className="charts_body">
                       <ReactEcharts
                                option={::this.getLineOption(dataname,curves)}
                                style={{width: '100%', height: '100%'}}
                          />
                      </div>
                  </div>
                </div>
          </div>}
        </div>

        )
    }

    colsePanel(){
      debugger
      const {close} = this.props
      close&&close()
    }

    changeInt(e, { value }){
      const {pointId} = this.props
      const {startDate,endDate}  = this.state
      //数据点ID，开始时间 结束时间 时间间隔
      this.getAllCurves(pointId,startDate,endDate,value)
      this.setState({dataIntever:value})


    }
    handleChangeStart( dateString, { dateMoment, timestamp } ) {
      const {pointId} = this.props
      const {startDate,endDate,dataIntever}  = this.state
      //数据点ID，开始时间 结束时间 时间间隔
      this.getAllCurves(pointId,dateMoment,endDate,dataIntever)

      if ( dateMoment.toDate().getTime() > this.state.endDate.toDate().getTime() ) {
        this.setState( { startDate: this.state.endDate, endDate: dateMoment } )
      } else {
        this.setState( { startDate: dateMoment } )
      }

    }
    handleChangeEnd( dateString, { dateMoment, timestamp } ) {
      const {pointId} = this.props
      const {startDate,endDate,dataIntever}  = this.state
      //数据点ID，开始时间 结束时间 时间间隔
      this.getAllCurves(pointId,startDate,dateMoment,dataIntever)
      if ( dateMoment.toDate().getTime() < this.state.startDate.toDate().getTime() ) {
        this.setState( { startDate: dateMoment, endDate: this.state.startDate } )
      } else {
        this.setState( { endDate: dateMoment } )
      }
    }




    getAllCurves(pointId,startDate,endDate,dataIntever){
      debugger
      const {getNewCurves} =this.props
      //{"aggregateAndPointIds":["max#15"],"startDate":"2018-05-03 15:00:00","endDate":"2018-05-03 17:00:00","interval":"10m"}
      getNewCurves({"aggregateAndPointIds":["avg#"+pointId],
          "startDate":startDate.format('YYYY-MM-DD HH:mm:ss'),
          "endDate":endDate.format('YYYY-MM-DD HH:mm:ss'),"interval":dataIntever})

    }




    async initPage(pointId){
      const {getDataName}  =this.props
      const {tableName,startDate,endDate,dataIntever} = this.state

      // {
      // 	"tableName":"test1",
      // 	"selectConditionPo":[
      // 	{"columnName":"c1","logicalSymbol":"like","condition":"%大法师%"},
      // 	{"columnName":"c4","logicalSymbol":">","condition":"3.2"}
      // ]
      // }
      //
      let pars ={}
      pars["tableName"] = tableName;
    //  pars["pageRequest"]={"page":{"pageSize":200,"pageNum":1}}
      pars["selectConditionPo"] = [
      	{"columnName":"pointid","logicalSymbol":"=","condition":""+pointId+""}
      ]
      await getDataName(pars)
      this.getAllCurves(pointId,startDate,endDate,dataIntever)
    }



    getLineOption(dataname,curves){
         var date = curves.time;

         const {dataIntever} = this.state
         switch (dataIntever) {
           case '1h':
             date=curves.time.map(item=>(moment(item).format('YYYY-MM-DD HH时')))
             break;
           case '1d':
            date=curves.time.map(item=>(moment(item).format('YYYY-MM-DD')))
            break;
           case '1d':
            date=curves.time.map(item=>(moment(item).format('YYYY-MM')))
           break;
           default:

         }
         var data = curves.value.map(item=>(item==-9999||item==-1111?0:item));
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
                "show": true,
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
                 name:dataname,
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
                  "left": 80,
                   right:60,
                   borderColor:"#2671b2",
                   bottom:60
              },

             series: [
                 {
                     name:dataname,
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


    componentWillReceiveProps(nextProps) {
       let {pointId,isOpen} = nextProps
       if(isOpen==true&&!this.props.isOpen){
         try {
           this.initPage(pointId)
         } catch (e) {
          // this.colsePanel()
         } finally {

         }

      }
    }



}




function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.tgquxian, mapDispatchToProps)(TgQuxian);
