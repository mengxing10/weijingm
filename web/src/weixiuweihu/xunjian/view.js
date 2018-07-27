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
import CsvFetch from '../../common/components/CsvFetch'
import MyTable from '../../common/components/MyTable'
import { DateField,DatePicker } from 'react-date-picker'
import {Icon, Dropdown, Input,Form,Radio} from 'semantic-ui-react'
import Pager from '../../common/components/Pager'

import moment from 'moment'
import Menus from '../../common/components/Menus'
class Xunjian extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment("2016-01-01"),
            endDate: moment().add(1, 'd'),
            typeId:'xjjh',
            nameId:'xjjh'
        }
    }


    render() {
      let {typeId,nameId} = this.state
       typeId = location.pathname.split('/')[5]
       nameId = location.search.split('=')[1]
       if( typeof typeId ==  'undefined')   typeId =  'xunjianjh';

      if( typeof nameId ==  'undefined')   nameId =  'xjjh';
      const BodyStyle={height: document.documentElement.clientHeight-80  +'px'}


        return (
          <div className="table-xunjian" style={BodyStyle}>
            <div className="right-menus">
              <div className ={classNames("mitem",{active:nameId=='xjjh'})} onClick={this.selectName.bind(this,'xunjianjh','xjjh')} >巡检计划</div>
              <div className ={classNames("mitem",{active:nameId=='xjjhsz'})} onClick={this.selectName.bind(this,'xunjianjhsz','xjjhsz')} >巡检计划设置</div>
              <div className ={classNames("mitem",{active:nameId=='jhsjmb'})}  onClick={this.selectName.bind(this,'timemodel','jhsjmb')} >计划时间模板管理</div>
            </div>
            <div className="weixiu-table">
              {this.props.children}
            </div>
          </div>
        )
    }


    selectName(typeId,nameId)
    {
       this.setState({nameId: nameId,typeId:typeId});
       browserHistory.push('/bgp/pc/weixiuwh/xunjian/' +  typeId + '?project=' + nameId )

    }

    handleChangeStart(){

    }
    handleChangeEnd(){

    }


    queryData()
    {
        var endDate =  moment(this.state.endDate).format('YYYY-MM-DD');
        var startDate  =  moment(this.state.startDate).format('YYYY-MM-DD');
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
export default connect(state => state.xunjian, mapDispatchToProps)(Xunjian);
