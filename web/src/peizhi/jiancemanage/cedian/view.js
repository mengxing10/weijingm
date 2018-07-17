/**
 * @file monlist
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import classNames from 'classnames'
import EditTableGw from '../../../common/components/EditTableGw'
import * as actions from './actions.js'
import * as commonActions from '../../../common/actions.js'
import Loading from '../../../common/components/Loading'
import {ToastContainer} from "react-toastr"
import './view.styl'

 class Cedianguanli extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data:{pagename:'guanli_shujudian',d1:{status:2,data:{header:[],result:[],page:{pageNum:1,pageSize:10,totalCount:3}}},d2:{}}
        }
    }


    render() {
      const {entityCode,jiance} = this.props.location.query
      const {data}= this.state

        return (
            <div className='gfyshebeiguanli'>
              <ToastContainer ref="toastcontainer" className="toast-top-right"/>

                <div className="gfyshebeiguanli-body">
                  <EditTableGw
                    thead={data['d1']['data']['header']} tdata={data['d1']['data']['result']}
                    page={data['d1']['data']['page']}
                    noOrder= {false}
                    hasOpt= {true}
                    hasAdd = {true}
                    noDel= {true}

                    needOrderColumn={::this.needOrderColumn}
                    />
                </div>
            </div>
        )
    }

    needOrderColumn(pageRequest) {
      const {operateTableData} = this.props
      let {data} = this.state
      operateTableData(data.pagename,'sel','d1',data,{},pageRequest)

    }


      componentWillMount(){
          const {data} = this.state
          this.initPage(this.props,data)

        }
        async  initPage(p,data){

           const {getPageConf,getPageData} = p
           await getPageConf(data.pagename,data)
           await getPageData(data.pagename,data)
        }


        componentWillReceiveProps(nextProps) {
          const {data}=this.state
          let {pagename} = data
          if(nextProps.data.pagename==pagename){

          if (nextProps.status == 0 && nextProps.msg) {
            this.refs.toastcontainer.error(`${nextProps.msg}`, ``, {
              timeOut: 2000,
              closeButton: true
            })
          } else if (nextProps.status == 1 && nextProps.msg) {
            this.refs.toastcontainer.success(`${nextProps.msg}`, ``, {
              timeOut: 2000,
              closeButton: true
            })
          } else if (nextProps.status == 2 && nextProps.msg) {
            this.refs.toastcontainer.info(`${nextProps.msg}`, ``, {
              timeOut: 1000,
              closeButton: true
            })
          }
          if (this.props.location.query.projectname != nextProps.location.query.projectname) {
            const {data} = nextProps
             this.initPage(nextProps,data)
          }
          this.setState({data:nextProps.data})
        }


        }
}




function mapDispatchToProps (dispatch) {
        return bindActionCreators({...actions,...commonActions}, dispatch);
    };
export default connect(state => state.jiancecedianm, mapDispatchToProps)(Cedianguanli);
