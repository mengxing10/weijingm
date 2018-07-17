'use strict'

var mqtt = require('../../mqtt.js')
var client = mqtt.connect()

client.subscribe('presence')
client.on('message', function (topic, message) {
  console.log(message)
})
