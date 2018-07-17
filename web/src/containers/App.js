/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import Cookies from 'universal-cookie';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../common/index.styl';
// import * as actions from '../actions'
import Header from '../header'
import Footer from '../footer'
import mqtt from 'mqtt'
import {view as Xiaoxi} from '../xiaoxi';


const cookies = new Cookies();

class App extends Component {
      constructor(props) {
          super(props);
          this.state={
            xiaoxis : [],
            mqttClient :{},
          }
      }






      render() {
        const cpath = location.pathname.split('/')[3]
        const BodyStyle={height: document.documentElement.clientHeight-130   +'px'}
          return (

              <div className='per'>
                  <Xiaoxi/>
                  {cpath!='login'?<Header/>:''}
                  <div  className='per-body' style={BodyStyle}>{this.props.children}</div>
                  {cpath!='login'?<Footer/>:''}
              </div>


          )
      }
    componentWillMount() {

      const isLogin = cookies.get("isLogin")?true:false
      const {prod, pcompare, login} = this.props;
      const path = window.location.pathname.substr(1).split('/')[1];
      const pc = window.location.pathname.substr(1).split('/')[0];

       if ( path == 'login' && isLogin) {

          browserHistory.push('/bgp/pc/home')
          // window.location.href=`/ecloud/intro`

      }

      if (!isLogin) {

          browserHistory.push('/bgp/pc/login')
          // window.location.href=`/ecloud/login`
      }
    }



    // componentDidMount(){
    //   let {mqttClient} = this.state
    //   let options = {
    //       keepalive: 10,
    //       clientId: "admin_web43322",
    //       protocolId: 'MQTT',
    //       protocolVersion: 4,
    //       clean: true,
    //       reconnectPeriod: 1000,
    //       connectTimeout: 30 * 1000,
    //       will: {
    //           topic: 'baogang.1',
    //           payload: 'Connection Closed abnormally..!',
    //           qos: 1,
    //           retain: false
    //       },
    //       username: 'demo',
    //       password: 'demo',
    //       rejectUnauthorized: false
    //   }
    //   mqttClient  = mqtt.connect('mqtt://118.190.88.23:61614',options)
    //   mqttClient.on('connect', function () {
    //     mqttClient.subscribe("baogang.1")
    //     console.log("mqtt connected!!!")
    //   })
    //   mqttClient.on('error', function (err) {
    //       console.log(err)
    //       if(err=="Error: Connection refused: Identifier rejected"){
    //           alert("用户多地登录或者网络错误聊天")
    //       }
    //       // client.end()
    //   })
    //
    //   mqttClient.on('message', function (topic, message) {
    //     // message is Buffer
    //     console.log(message.toString())
    //     debugger
    //     let {xiaoxis} = this.state
    //     xiaoxis.push(message)
    //     sessionStorage.setItem("xiaoxi",JSON.stringify(xiaoxis))
    //     this.setState({xiaoxis:xiaoxis})
    //
    //   })
    //   this.setState({mqttClient:mqttClient})
    // }
    // componentWillUnmount(){
    //   let {mqqtClient} = this.state
    //   mqqtClient.end()
    // }







};

// function mapDispatchToProps (dispatch) {
//     return bindActionCreators(actions.default, dispatch);
// }

export default connect(state => state, null)(App);
