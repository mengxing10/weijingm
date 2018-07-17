'use strict'

var mqtt = require('../../mqtt.js')
var client = mqtt.connect()

client.publish('presence', 'hello!')
client.end()
