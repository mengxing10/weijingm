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
import moment from 'moment'
import MyCharts from '../../common/components/MyCharts'
import Panel1 from './components/panel1'


class Qushi extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openPanel: '',
            left_1_id: 0,
            left_2_id:0,
            svgtype:"3d",
            tab: 'lengzhan',
            pd:[],
            inter:1,
        }
    }

    render() {
      let datas =[
        {jienenglv:{val:78,bfl:78,tName:"节能率",danwei:"%"},title:"全部",shouyi:32135},
        {jienenglv:{val:68,bfl:68,tName:"节能率",danwei:"%"},title:"28/38泵站",shouyi:8265},
        {jienenglv:{val:76,bfl:76,tName:"节能率",danwei:"%"},title:"3/4泵站",shouyi:10467},
        {jienenglv:{val:82,bfl:82,tName:"节能率",danwei:"%"},title:"综合泵站",shouyi:19876},

      ]

        return (
          <div className="qushi theBody">
            {

              datas.map((item,i)=>(
                <Panel1 key={i} data={item}/>
              ))
            }

        </div>
        )
    }



    componentWillReceiveProps(nextprops){}

    componentWillMount()
    {


        //
        //   const {getRealData,getCurveData} = this.props;
        //
        //   var  params1= {"pointId":[]};  //16,26,31:左侧几个图表的数据:
        //  //var  params2 = {pointId:[3],timeType:'hour',startTime: moment(this.state.startDate).format('YYYY-MM-DD 00:00:00'),stopTime:moment(this.state.endDate).format('YYYY-MM-DD 00:00:00')}
        //
        //   var  params2 = {pointId:[15,25,30],timeType:'hour',startTime: moment().add(-7,'hours').format('YYYY-MM-DD HH:00:00'),stopTime:moment().format('YYYY-MM-DD HH:00:00')}
        //
        //   var  params3 = {pointId:[48,63,78],timeType:'day',startTime: moment().format('YYYY-MM-01 00:00:00'),stopTime:moment().format('YYYY-MM-DD 00:00:00')}
        //
        // var allParams={"day":params2,"month":params3};
        //
        // getRealData(params1);
        // getCurveData(allParams);



  }

    componentDidMount() {
      let  paramsRealData= {};
       const {getRealData} = this.props;
       getRealData(paramsRealData);
    //   let inter = setInterval(function () {
    //   getHomeData()  //{p1:"p1"}
    // },300000)
    //  this.setState({inter:inter})
    }

   componentWillUnmount() {}


}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.qushi, mapDispatchToProps)(Qushi);
