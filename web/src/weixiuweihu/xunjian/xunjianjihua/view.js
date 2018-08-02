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
import CsvFetch from '../../../common/components/CsvFetch'
import MyTable from '../../../common/components/MyTable'
import HeatMap from './components/HeatMap.js'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio} from 'semantic-ui-react'

import moment from 'moment'
import Menus from '../../../common/components/Menus'
import ChaKan from './components/ChaKan.js'
class Xunjianjihua extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            stationName:'',
            planTime:'',
            chakan:false
        }
        //handleChange = (e, { value }) => this.setState({ value })
    }

    render() {
        var startDate= moment();
        var endDate= moment().add(1, 'd');
        var xunjiandata = this.props.xunjiandata;
        var nextTime = ',';
        var bengzhanData = [];
        var xjdata = [];
        var xunjiandatas = [];
        xunjiandata.forEach((item,i) => {
          if('undefined' != typeof(item.nextTime)){
            if(i==0){
              nextTime = '下次巡检时间：';
            }
            nextTime += item.stationName+moment(item.nextTime).format('YYYY年MM月DD日 HH:mm')+"，";
          }
          if('undefined'!=typeof(item.planId)){
            bengzhanData.push(item.stationName);
            xunjiandatas.push(item);
            xjdata.push([moment(item.planTime).format('HH:mm'),item.stationName,item.status==50000?1:item.status==50001?3:2]);
          }
        });
        nextTime = nextTime.substring(0,nextTime.length-1);
        var xdata = ['00:00', '01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00',
      '11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00',];
        var ydata = this.distinct(bengzhanData);//['28#泵站', '38#泵站', '黄河3#泵站','黄河4#泵站', '综合泵站', '气浮泵站'];

        var data = xjdata;//[['04:00','28#泵站','1'],['01:00','38#泵站','3'],['09:00','黄河4#泵站','2'],['06:00','28#泵站','1'],['08:00','28#泵站','1']];
        var that = this;
        var xunjiandan = this.props.xunjiandandata;
        const EventsDict = {
            click: function (data, echart) {
                    that.onChakan(xunjiandatas[data.dataIndex].planId,xunjiandatas[data.dataIndex].stationID,xunjiandatas[data.dataIndex].stationName,xunjiandatas[data.dataIndex].planTime)
                }
        }
        return (
          <div className="tab-xunjian">
            <div className="query-condition" style={{"border-bottom":"none"}}>
                <label className="labStyle">开始时间</label>
                    <DateField
                        dateFormat="YYYY-MM-DD"
                        locale="zh-cn"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        defaultValue={startDate}
                        ref='time'
                        //value={this.state.startDate}
                        //onChange={::this.handleChangeStart}
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
                <span className="commitBtn" onClick={this.searchOption.bind(this)}>查询</span>
            </div>
            <p className="xunjian_tips">{nextTime}</p>
            <div className="weixiu-table">
              <HeatMap  style={{width:'95%',height:'500px',margin:'20px'}}
                  xdata={xdata}
                  ydata={ydata}
                  data={data} EventsDict={EventsDict} />
            </div>

            {this.state.chakan &&
              <ChaKan xunjiandan={xunjiandan}
                      stationName = {this.state.stationName}
                      planTime = {this.state.planTime}
                      onChakanN={::this.onChakanN}/>
            }
          </div>
        )
    }

    handleChangeStart(){

    }
    handleChangeEnd(){

    }

  async onChakan(planid,stationid,stationName,planTime){
    const {getpcStationinfo}  = this.props
    let pars ={};
    pars["stationid"]=stationid;
    pars["planid"]=planid;
    await getpcStationinfo(pars)
    this.setState({chakan:true,stationName:stationName,planTime:moment(planTime).format('YYYY-MM-DD HH:mm')})
  }
  onChakanN(){
    this.setState({chakan:false})
  }
  queryData(){
    var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
    var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
  }

  componentWillReceiveProps(nextprops){}
  componentDidMount(){
    const {getStationstatus}  = this.props
    let pars ={};
    getStationstatus(pars)
  }
  searchOption(){
    var time = this.refs.time.state.value;
    const {getStationstatus}  = this.props
    let pars ={};
    pars['datetime']=moment(time).format('YYYY-MM-DD');
    getStationstatus(pars)
  }
  distinct(arr){
    var result = [],i,j,
    len = arr.length;
     for(i = 0; i < len; i++){
      for(j = i + 1; j < len; j++){
       if(arr[i] === arr[j]){
        j = ++i;
       }
      }
      result.push(arr[i]);
     }
   return result;
  }
  componentWillUnmount() {}
}

function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.xunjianjihua, mapDispatchToProps)(Xunjianjihua);
