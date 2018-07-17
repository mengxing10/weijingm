/**
 * @file webpack 配置
 * @author luwenlong(zuiwosuifeng@gmail.com)
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    context: __dirname,
    entry: getEntries(),
    output: {
        path: path.join(__dirname, 'asset'),
        filename: isProduction ? '[name]7.js' : '[name].js',
        chunkFilename: '[id].js',
       // publicPath: isProduction ? '/yayd/pc/asset/' : ' http://127.0.0.1:8089/asset/',
        //publicPath: isProduction ? '/ecloud/asset/' : ' http://192.168.84.101:8089/asset/',

        //localhost:
		  //publicPath: isProduction ? '/baogang/asset/' : 'http://127.0.0.1:8089/baogang/asset/',
          // publicPath: isProduction ? '/baogang/asset/' : 'http://localhost:8089/baogang/asset/',
          // publicPath: isProduction ? '/baogang/asset/' : 'http://192.168.30.130:8089/baogang/asset/',
             publicPath: isProduction ? '/bgp/asset/' : 'http://127.0.0.1:8089/baogang/asset/',
        //服务器上:
        // publicPath: isProduction ? '/baogang/asset/' : 'http://118.190.44.91:8089/baogang/asset/',
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                use: isProduction
                    ? ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            'css-loader',
                            'postcss-loader',
                            'stylus-loader'
                        ]
                    })
                    : [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'stylus-loader',
                        }
                    ]
            },
            {
                test: /\.css$/,
                use: isProduction
                    ? ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            'css-loader',
                            'postcss-loader'
                        ]
                    })
                    : [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
            },
            {
                test: /\.js?$/,
                loader: [
                    'babel-loader'
                ],
                exclude: [/node_modules/]
            },
            {
                test: /\.(png|jpg|gif)?$/,
                use: ['url-loader?limit=81920&name=[name]_[sha512:hash:base64:7].[ext]'],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                use: 'url-loader?limit=81920&name=[name]_[sha512:hash:base64:7].[ext]'
            },
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'web/src'),

            'node_modules'
        ],
        extensions: ['.web.tsx', '.web.ts',
            '.web.jsx', '.web.js', '.ts', '.tsx',
            '.js', '.jsx', '.json', '.styl', '.html'
        ],
        alias: {}
    },
    node: {
        fs: 'empty'
    },
    externals: {},
    devtool: isProduction ?false:'eval',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isProduction ? '"production"' : '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new AddCopyRightPlugin(),
        isProduction ? new ExtractTextPlugin({
            filename: isProduction ? '[name]7.css' : '[name].css',
            disable: false,
            allChunks: true
        }) : function () {},
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: isProduction ? 'common7.js' : 'common.js'
        }),
        function() {
            this.plugin("done", function(stats) {
                var chunkobj = stats.toJson().assetsByChunkName;
                var ret = {}
                for (var item in chunkobj) {
                    if (isProduction) {
                        if (item !== 'common') {
                            var st = chunkobj[item];
                            for (var i = 0, len = st.length; i < len; i++) {
                                var type = st[i].substr(st[i].lastIndexOf('.') + 1)

                                if (!ret[item]) {
                                    ret[item] = {}
                                }

                                if (!ret[item][type]) {
                                    ret[item][type] = st[i]
                                }
                            }
                        }
                        else {
                            if (!isProduction) {
                                ret[item] = 'common.js';
                            }
                            else {
                                ret[item] = chunkobj[item];
                            }
                        }
                    }
                    else {
                        //abc: 'abc.js', plist: 'plist.js'
                        if (item == 'common') {
                            ret[item] = chunkobj[item];
                        }
                        else {
                            if (!ret[item]) {
                                ret[item] = {}
                            }

                            ret[item]['js'] = Array.isArray(chunkobj[item])
                                ? chunkobj[item][0] : chunkobj[item];
                            ret[item]['css'] = false;
                        }
                    }
                }

                // 添加feRoot+apiPath
                // ret.feRoot = webserverConfig.feRoot;
                // ret.apiPath = webserverConfig.apiPath;

                fs.writeFileSync(
                    path.join(__dirname, "statics.json"),
                    JSON.stringify(ret, 0, 4)
                );
            });
        },
        isProduction ? new UglifyJsPlugin({}) : function () {}
    ],
};

// 添加版权信息插件
function AddCopyRightPlugin(options) {}

AddCopyRightPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        compilation.chunks.forEach(function (chunk) {
            chunk.files.forEach(function (file) {
                var source = '/*! 2017 Inc. All Rights Reserved by GanWeiTech.CO. */\n'
                    + compilation.assets[file].source();

                compilation.assets[file] = {
                    source: function () {
                        return source;
                    },
                    size: function () {
                        return source.length;
                    }
                }
            });
        });

        callback();
    });
}

// 获取入口文件
function getEntries() {
    let entry = {};
    let files = [];

    let entryfile2={}
    entryfile2['name'] = 'web'
    entryfile2['path'] = './web/src/main.js'
    files.push(entryfile2)


    console.log(files);
    // entryfile['name'] = 'enter'
    // entryfile['path'] = 'enter/src/home/'


    files.forEach((file, idx) => {
        if (!entry[file.name]) {
            if (isProduction) {
                entry[file.name] = [

                    'babel-polyfill',
                    `${file.path}`,
                ]
            }
            // 若不能hmr就reload
            else {
                entry[file.name] = [
                    'webpack-hot-middleware/client',
                    'babel-polyfill',
                    `${file.path}`,
                ]
            }
        }
    });
    console.info(entry);

    return entry;

}

// // 获取入口文件
// function getEntries() {
//     let entry = {};
//     let enterfiles = fs.readdirSync(path.join(__dirname, 'enter/src'));
//     let gfyfiles = fs.readdirSync(path.join(__dirname, 'gfy/src'));
//     // let wwyfiles = fs.readdirSync(path.join(__dirname, 'wwy/src'));
//     let files = [];
//     let entryfile={}
//     entryfile['name'] = 'enter'
//     entryfile['path'] = 'enter/src/home/'
//     entryfile['name'] = 'gfy'
//     entryfile['path'] = 'enter/src/home/'
//     // entryfile['name'] = 'enter'
//     // entryfile['path'] = 'enter/src/home/'
//
//
//     let exclude = [
//         '.DS_Store', 'npm-debug.log', 'actions',
//         'components', 'common', 'constants',
//         'containers', 'pages', 'reducers',
//         'routes', 'store'
//     ];
//     files.push(enterfiles)
//     files.push(gfyfiles)
//     files = files.map(file => {
//         // 非 排除文件(夹)和bak文件
//         if (!exclude.includes(file) && !/\.bak$/.test(file)) {
//             return file;
//         }
//     }).filter(v => v);
//
//     files.forEach((file, idx) => {
//         if (!entry[file]) {
//             if (isProduction) {
//                 entry[file] = [
//                     'babel-polyfill',
//                     `./enter/src/${file}/main.js`,
//                 ]
//             }
//             // 若不能hmr就reload
//             else {
//                 entry[file] = [
//                     'webpack-hot-middleware/client',
//                     'babel-polyfill',
//                     `./enter/src/${file}/main.js`,
//                 ]
//             }
//         }
//     });
//     console.info(entry);
//
//     return entry;
//
// }
