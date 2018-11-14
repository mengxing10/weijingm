/**
 * @file static server 开发服务器
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

var fs = require('fs');
var path = require('path');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var qs = require('qs')
var cookieParser = require('cookie-parser')
var axios = require('axios');

var express = require('express')

var app = new express()
var port = 8080
var host = getHost()

// 定义环境变量
var env = process.env.NODE_ENV || 'development';

var bodyParser = require('body-parser')
var compiler = webpack(config)

if (env === 'development') {
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: {color: true}
    }))

    app.use(webpackHotMiddleware(compiler))
}

//app.use(express.static(path.join(__dirname, 'wap')))

app.use(cookieParser())

app.use(bodyParser.json({limit: '50mb'}))

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

app.get('/favicon.ico', function (req, res) {
    res.end();
});

var statics = require('./statics.json')


// 开发
app.get(/weijingm/, function(req, res) {
  if (env === 'development') {
    console.log(req.path.split('/'));
    res.sendFile(path.join(__dirname, 'web/entry/mobile.html'))

  }
})

// 开发
app.get(/mobile/, function(req, res) {
    if (env === 'development') {
        res.sendFile(path.join(__dirname, 'entry/mobile.html'))
    }
})


app.get(/resources/, function(req,res){
  if (env === 'development'){
    res.sendFile(path.join(__dirname, req.path))
  }
})

// 光伏云首页数据
app.get(/warn/, function (req, res) {
  if (env === 'development'){
    console.log(_____warnning)
    res.sendFile(path.join(__dirname, req.path))
  }
})


let apiServer = 'http://192.168.3.6:8080';



// 光伏云接口
app.post(/library|manage|entity/, function (req, res) {
    if (process.env.NODE_ENV == 'production') {

        axios.post(apiServer + req.path, req.body)
        .then(ret => {
            return res.json(ret);
        })
        .catch(err => {
            console.log('接口调用报错: ', err);
            return res.json({status: 0, msg: err});
        })
    }
    else {
        setTimeout(
            function () {
                res.sendFile(path.join(__dirname, 'api', req.path + '.json'));
            },
            2000
        )
    }
})

 // http://192.168.31.155:8089/pumpcloud/pc/monlist
 app.post(/monlist/, function (req, res) {
   console.log(req.params);
   console.log(req.body);
     if (process.env.NODE_ENV == 'production') {

         axios.post(apiServer + req.path, req.body)
         .then(ret => {
             return res.json(ret);
         })
         .catch(err => {
             console.log('接口调用报错: ', err);
             return res.json({status: 0, msg: err});
         })
     }
     else {
         setTimeout(
             function () {
                 let _path = req.path.split('/').pop();
                 console.log('----------path: ', _path);
                 // res.json({ss:32,tt:09});
                 res.sendFile(path.join(__dirname, 'api/home', _path + '.json'));
             },
             2000
         )
     }
 })

// 光伏云首页数据
app.post(/guangfuinfos|warn/, function (req, res) {
    if (process.env.NODE_ENV == 'production') {
        axios.post(apiServer + req.path, req.body)
        .then(ret => {
            return res.json(ret);
        })
        .catch(err => {
            console.log('接口调用报错: ', err);
            return res.json({status: 0, msg: err});
        })
    }
    else {
        setTimeout(
            function () {
                let _path = req.path.split('/').pop();
                console.log('----------path: ', _path);
                // res.json({ss:32,tt:09});
                res.sendFile(path.join(__dirname, 'api/home', _path + '.json'));
            },
            2000
        )
    }
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    }
    else {
        console.info("==> 🌎  Listening on port %s. Open up http://%s:%s/ in your browser.", port, host, port)
    }
})

axios.interceptors.request.use(config => {
    config.timeout = 10000;
    config.timestart = new Date().getTime();
    return config;
});

axios.interceptors.response.use(response => {
    let error = new Error();

    let {status, statusText, config, headers, data} = response;

    console.log((new Date().getTime() - config.timestart) + 'ms');

    return data;
});

/**
 * 获取本机IP
 * 默认取127.0.0.1之外的第一个IP地址
 *
 * @return {string}
 */
function getHost() {
    var ifaces = require( 'os' ).networkInterfaces();
    var defultAddress = '127.0.0.1';
    var ip = defultAddress;

    function x( details ) {
        if (ip === defultAddress && details.family === 'IPv4') {
            ip = details.address;
        }
    }

    for ( var dev in ifaces ) {
        ifaces[ dev ].forEach( x );
    }

    return ip;
}
