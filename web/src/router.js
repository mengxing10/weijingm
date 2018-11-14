/**
 * @file indexRoutes
 * @author zlc <lichao9182@126.com>
 */
import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'
//主页
import App from './containers/App'
// 登录
import {view as Login }  from './login'
// 404
import {view as NotFound} from './notfound'

import {view as User} from './user'
//首页
import  Home  from './home/home'
//消息
import  Xiaoxi  from './xiaoxi/xiaoxi'
//集团
import  Jituan  from './jituan/jituan'
import {view as Nengxiaobi}  from './jituan/nengxiaobi'
//地区
import  Diqu  from './diqu/diqu'
//酒店
import  Jiudian  from './jiudian/jiudian'
//监测
import  Jiance  from './jiance/jiance'
import  Baojing  from './baojing/baojing'
import  Baojingc  from './baojingC/baojingC'
import  Weixiu  from './weixiu/weixiu'
import  WeixiuAdd  from './weixiuAdd/weixiuAdd'
import  WeixiuXq  from './weixiuXq/weixiuXq'
import  WeixiuHf  from './weixiuHf/weixiuHf'
import  WeixiuYs  from './weixiuYs/weixiuYs'
import  WeixiuPj  from './weixiuPj/weixiuPj'
import  Baoyang  from './baoyang/baoyang'
import  Baoyangxx  from './baoyangxx/baoyangxx'
import  Xunjian  from './xunjian/xunjian'
import  Xunjiandan  from './xunjiandan/xunjiandan'
import  Wendang  from './wendang/wendang'
import  Shipin  from './shipin/shipin'
import  JiudianXz  from './jiudianXz/jiudianXz'
import  Wode  from './my/my'
import  MyPwd  from './myPwd/myPwd'

export default (
    <Route path="/weijingm" component={App}>
        // <IndexRedirect to="/weijingm/login" />
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="user" component={User} />
        <Route path="home" component={Home} />
        <Route path="message" component={Xiaoxi} />
        <Route path="jituan" component={Jituan}>
            <IndexRoute component={Nengxiaobi} />
            <Route path="nengxiaobi" component={Nengxiaobi} />
        </Route>
        <Route path="diqu" component={Diqu} />
        <Route path="jiudian" component={Jiudian} />
        <Route path="jiance" component={Jiance} />
        <Route path="baojing" component={Baojing} />
        <Route path="baojingc" component={Baojingc} />
        <Route path="weixiu" component={Weixiu} />
        <Route path="weixiuadd" component={WeixiuAdd} />
        <Route path="weixiuxq" component={WeixiuXq} />
        <Route path="weixiuhf" component={WeixiuHf} />
        <Route path="weixiuys" component={WeixiuYs} />
        <Route path="weixiupj" component={WeixiuPj} />
        <Route path="baoyang" component={Baoyang} />
        <Route path="baoyangxx" component={Baoyangxx} />
        <Route path="xunjian" component={Xunjian} />
        <Route path="xunjiandan" component={Xunjiandan} />
        <Route path="wendang" component={Wendang} />
        <Route path="shipin" component={Shipin} />
        <Route path="jiudianxz" component={JiudianXz} />
        <Route path="my" component={Wode} />
        <Route path="mypwd" component={MyPwd} />
        <Route path="*" component={Login} />
    </Route>
)
