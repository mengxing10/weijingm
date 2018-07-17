/**
 * @file homeAction home
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */



 import mqtt from 'mqtt'


let request = (type, params) => {return {type, params}}
let receive = (type, data) => {return {type, data}}




/**
 * 建立连接
 */
export function mqttConnect(host,options) {
    return async dispatch => {
        try {
            let mqttClient=mqtt.connect(host,options)
            mqttClient.on('connect', function () {
              mqttClient.subscribe("baogang.1")
              console.log("baogang.1");
              dispatch(receive("MQTTCONNECT", mqttClient));
            })
            mqttClient.on('error', function (err) {
                console.log(err)
                dispatch(request("MQTTERROR", {status: 2, jiancemsg: err}));
            })

            mqttClient.on('message', function (topic, message) {
              // message is Buffer
              console.log(message.toString())
              try{
                let res = JSON.parse(message.toString())
                dispatch(receive("MQTTMESSAGE", res));
              }catch(newerr){
                console.error('捕获到错误: ', newerr)
              }

            })
        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive("MQTTERROR", {status: 2, jiancemsg: 'MQTT连接失败'}))
        }
    }
}

/**
 * 建立连接
 */
export function mqttClose(mqttClient) {
    return async dispatch => {
        try {
              mqttClient.end()
              dispatch(receive("MQTTCLOSE", mqttClient));


        }

        catch (err) {
            console.error('捕获到错误: ', err)

            dispatch(receive("MQTTCLOSE", {status: 2, errmsg: 'MQTT关闭失败'}))
        }
    }
}
