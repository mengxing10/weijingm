/**
 * @file App smart component
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions.js'


class Xiaoxi extends Component {
      constructor(props) {
          super(props);
          this.state = {
            mqttClient:{},
          }
      }
      render() { return (<div/>) }

      componentDidMount(){
        let {mqttClient,mqttConnect,mqttClose} = this.props
        let options = {
            keepalive: 10,
            clientId: `admin_web_${Math.random()}`,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: 'baogang.1',
                payload: 'Connection Closed abnormally..!',
                qos: 1,
                retain: false
            },
            username: 'demo',
            password: 'demo',
            rejectUnauthorized: false
        }
        let host ='mqtt://118.190.88.23:61614'
        mqttConnect(host,options)
        // mqttClient  = mqtt.connect('mqtt://118.190.88.23:61614',options)
        // mqttClient.on('connect', function () {
        //   console.log("mqtt connected!!!")
        // })
        // mqttClient.on('error', function (err) {
        //     console.log(err)
        //     if(err=="Error: Connection refused: Identifier rejected"){
        //         alert("用户多地登录或者网络错误聊天")
        //     }
        //     // client.end()
        // })
        //
        // mqttClient.on('message', function (topic, message) {
        //   // message is Buffer
        //   console.log(message.toString())
        //   let {xiaoxis} = this.state
        //   xiaoxis.push(message)
        //   sessionStorage.setItem("xiaoxi",JSON.stringify(xiaoxis))
        //   this.setState({xiaoxis:xiaoxis})
        //
        // })
        // this.setState({mqttClient:mqttClient})
      }
      componentWillUnmount(){
        let {mqttClient,mqttConnect,mqttClose} = this.props
        mqttClose()
        // mqqtClient.end()
      }






};
function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };


export default connect(state => state.xiaoxi, mapDispatchToProps)(Xiaoxi);
