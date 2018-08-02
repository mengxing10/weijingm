/**
 * @file App smart component
 * @author zlc <lichao9182@126.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Menus from '../common/components/Menus'
import classNames from 'classnames'

class Weixiuweihu extends Component {
      constructor(props) {
          super(props);

           this.typeId = "gongdan";

           this.state = {typeId:"gongdan",nameId:'28'} ;

      }
      render() {

       // var rightContent  =  window.innerWidth;

          // var rightContent = {
          //  width: (window.innerWidth  ) + 'px'
          // }



          const {query} = this.props.location
          let {typeId,nameId} = this.state


           typeId = location.pathname.split('/')[4]

           nameId = location.search.split('=')[1]

           //monitor?project=28
           if( typeof typeId ==  'undefined')   typeId =  'monitor';

          if( typeof nameId ==  'undefined')   nameId =  '28';


          //alert( nameId);



          return (
            <div className="per-content theBody">

              <div className="charts-menu-list2">

                <div className ={classNames("charts-menu-item",{active:nameId=='wx'})} onClick={this.selectName.bind(this,'wx','gongdan')}>
                    <span>设备维修</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='byjh'})} onClick={this.selectName.bind(this,'byjh','baoyang')}>
                    <span>设备保养</span>
                </div>
              {/*
                <div className ={classNames("charts-menu-item",{active:nameId=='bx'})} onClick={this.selectName.bind(this,'bx','baoxiu')}>
                    <span>设备报修</span>
                </div>
              */}
                <div className ={classNames("charts-menu-item",{active:nameId=='xjjh'})} onClick={this.selectName.bind(this,'xjjh','xunjian')}>
                    <span>设备点检</span>
                </div>

                <div className ={classNames("charts-menu-item",{active:nameId=='jbxx'})} onClick={this.selectName.bind(this,'jbxx','jibenxinxi')}>
                    <span>设备列表</span>
                </div>

                {/*
                  //http://localhost:8089/bgp/pc/shebeizichan/jibenxinxi?project=jbxx
                <div className ={classNames("charts-menu-item",{active:nameId=='dj'})} onClick={this.selectName.bind(this,'dj','dingjian')}>
                    <span>点检</span>
                </div>
                <div className ={classNames("charts-menu-item",{active:nameId=='dx'})} onClick={this.selectName.bind(this,'dx','dingxiu')}>
                    <span>定修</span>
                </div>

                <div className ={classNames("charts-menu-item",{active:nameId=='wbjh'})} onClick={this.selectName.bind(this,'wbjh','jihua')}>
                    <span>维保计划</span>
                </div>

                   */}

              {/*
                <div className ={classNames("charts-menu-item",{active:nameId=='wbjh'})} onClick={this.selectName.bind(this,'jueceshu','jueceshu')}>
                    <span>决策树</span>
                </div>
             */}


              </div>
              <div className="right-content tposition">

                  {this.props.children}
              </div>
            </div>

          )
      }

    selectName(nameId,typeId)
    {



      if(nameId=='jueceshu')
      {

          //window.open('http://localhost:8080/resources/dec/dec.html');

          window.open ('http://localhost:8089/resources/dec/dec.html', 'newwindow', 'height=700, width=750, top=80, left=180, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')

          //browserHistory.push('http://localhost:8080/resources/dec/dec.html' )

      }

      else
      {
       this.setState({nameId: nameId,typeId:typeId});

       //if(typeId=='dingxiu'||typeId=='dingjian'||typeId=='baoyang'||typeId=='gongdan')

          // typeId='gongdan'

       browserHistory.push('/bgp/pc/weixiuwh/' +  typeId + '?project=' + nameId )

       }


    }



};


export default connect(state => state, null)(Weixiuweihu);
