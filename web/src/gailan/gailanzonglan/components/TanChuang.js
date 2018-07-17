
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import TcDaBiao from './TcDaBiao'
import TcDunshui from './TcDunshui'
import TcJieDian from './TcJieDian'
import TcJianKang from './TcJianKang'
import TcShiXiang from './TcShiXiang'
import TcJieDianLv from './TcJieDianLv'
import TcWeiBan from './TcWeiBan'




export default class TanChuang extends Component {

  constructor(props) {
      super(props)
      this.state={
        dataTypes:'shishi',
        statue:'',
        optionsType:null,
        jianyi:''
      }

  }

  render() {
    const type = this.props.type
    return(
      <div style ={this.props.TancengStyle}>
        {type=='dabiao'&&<TcDaBiao
          tanchuangClose={::this.tanchuangClose}
        />}
        {type=='dunshui'&&<TcDunshui
          tanchuangClose={::this.tanchuangClose}
        />}
        {type=='jiedian'&&<TcJieDianLv
          tanchuangClose={::this.tanchuangClose}
        />}
        {type=='jiankang'&&<TcJianKang
          tanchuangClose={::this.tanchuangClose}
        />}
        {type=='yibanshixiang'&&<TcShiXiang
          done = {true}
          tanchuangClose={::this.tanchuangClose}
        />}
        {type=='weibanshixiang'&&<TcShiXiang
          done = {false}
          tanchuangClose={::this.tanchuangClose}
        />}
        {type=='weiban'&&<TcWeiBan
          tanchuangClose={::this.tanchuangClose}
        />}
      </div>
    )

  }

  tanchuangClose(){
    this.props.tanchuangClose()
  }

  componentWillMount(){
    //this.handleClickStart(this.props.type)
  }




}
