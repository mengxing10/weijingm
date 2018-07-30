/**
 * @file indexRoutes
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React from 'react'
import {Route, IndexRoute, IndexRedirect} from 'react-router'

// 首页
import App from './containers/App'

// 404
import {view as NotFound} from './notfound'
import {view as Login }  from './login'
import {view as User} from './user'
//import {view as Example }  from './example'


import  Gailan  from './gailan/gailan'
import {view as GailanZonglan}  from './gailan/gailanzonglan'
import {view as GailanXiangmu}  from './gailan/gailanxiangmu'
import {view as GailanBengzu}  from './gailan/gailanbengzu'
import {view as GailanShuibeng}  from './gailan/gailanshuibeng'

import  Fenxi  from './fenxi/fenxi'



import {view as Bengzhan}  from './fenxi/bengzhan'
import {view as Bengzu}  from './fenxi/bengzhan'
import {view as Shuibeng}  from './fenxi/shuibeng'
import {view as Jiankang}  from './fenxi/jiankang'
import {view as GuzhangYuce }  from './fenxi/guzhangyuce'
import {view as Jiankanggailan }  from './fenxi/jiankanggailan'
import {view as NengxiaoFenxi }  from './fenxi/nengxiaofenxi'
import {view as DabiaoLv }  from './fenxi/dabiao'




// import  Baobiao  from './baobiao/baobiao'
// import {view as Report}  from './baobiao/report'
// import {view as Qushi}  from './baobiao/qushi'


// import  Crud  from './crud/crud'
// import {view as Equipment}  from './crud/equipment'
// import {view as Company}  from './crud/company'
// import {view as Stationgroup}  from './crud/stationgroup'

// import {view as Message}  from './yunwei/message'

import  Jiance  from './jiance/jiance'
import {view as Warn}  from './jiance/warn'
import {view as Monitor}  from './jiance/monitor'
import {view as Quxian}  from './jiance/quxian'


import  Peizhi  from './peizhi/peizhi'
import  JianceManage  from './peizhi/jiancemanage/view'
import  {view as JianceBiaogeM}   from './peizhi/jiancemanage/biaoge'
import  {view as JianceCedianM}   from './peizhi/jiancemanage/cedian'
import  {view as JianceJisuanM}   from './peizhi/jiancemanage/jisuan'
import  {view as JianceTbdataM}   from './peizhi/jiancemanage/tbdata'





import  YewuManage   from './peizhi/yewumanage/view'
import  {view as YewuBiaogeM}   from './peizhi/yewumanage/biaoge'
import  {view as YewuTbdataM}   from './peizhi/yewumanage/tbdata'





import  Weixiuweihu  from './weixiuweihu/weixiuweihu'
import {view as Gongdan}  from './weixiuweihu/gongdan'
import {view as Baoxiuwh}  from './weixiuweihu/baoxiu'
import {view as Jibenxinxi} from './weixiuweihu/jibenxinxi'
import {view as Xunjianwh}  from './weixiuweihu/xunjian'
import {view as Xunjianjh}  from './weixiuweihu/xunjian/xunjianjihua'
import {view as Timemodel}  from './weixiuweihu/xunjian/timemodel'
import {view as Xunjianjhsz}  from './weixiuweihu/xunjian/xunjianjihuashezhi'


import {view as Baoyang}  from './weixiuweihu/baoyang'
import {view as BaoyangRenwu}  from './weixiuweihu/baoyang/baoyangrenwu'
import {view as BaoyangJihuaShezhi}  from './weixiuweihu/baoyang/baoyangjihuashezhi'
import {view as Jihua}  from './weixiuweihu/baoyang/jihua'


import Chaobiaojiesuan from './chaobiaojiesuan/chaobiaojiesuan'
import {view as Chaobiaodan} from './chaobiaojiesuan/chaobiaodan'
import {view as Jiesuandan} from './chaobiaojiesuan/jiesuandan'

// import Shebeizichan from './shebeizichan/shebeizichan'
// import {view as Jibenxinxisbei} from './shebeizichan/jibenxinxi'
// import {view as Weibaojihuasbei} from './shebeizichan/weibaojihua'
// import {view as Weibaojilusbei} from './shebeizichan/weibaojilu'

import XiaoxiLiebiao from './xiaoxiliebiao/xiaoxi'
import {view as Daibantixing} from './xiaoxiliebiao/daibantixing'

import Daibangongzuo from './daibangongzuo/daibangongzuo'
import {view as Daiban} from './daibangongzuo/daiban'
import {view as Yiban} from './daibangongzuo/yiban'







export default (
    <Route path="/bgp/pc" component={App}>
        <IndexRoute component={Gailan} />
        <Route path="user" component={User} />
        <Route path="login" component={Login} />
        <Route path="gailan" component={Gailan}>
              <IndexRoute component={GailanZonglan} />
              <Route path="zonglan" component={GailanZonglan} />
              <Route path="xiangmu" component={GailanXiangmu} />
              <Route path="bengzu" component={GailanBengzu} />
              <Route path="shuibeng" component={GailanShuibeng} />
        </Route>

        <Route path="jiance" component={Jiance}>
            <IndexRoute component={Monitor} />
            <Route path="monitor" component={Monitor} />
            <Route path="warn" component={Warn} />
            <Route path="quxian" component={Quxian} />
        </Route>

        <Route path="fenxi" component={Fenxi}>
          <IndexRoute component={Bengzhan} />
          <Route path="bengzhan" component={Bengzhan} />
          <Route path="shuibeng" component={Shuibeng} />
          <Route path="jiankang" component={Jiankang} />
          <Route path="guzhangyuce" component={GuzhangYuce} />
          <Route path="jiankanggailan" component={Jiankanggailan} />
          <Route path="nengxiaofenxi" component={NengxiaoFenxi} />
          <Route path="dabiao" component={DabiaoLv} />


        </Route>




        <Route path="peizhi" component={Peizhi}>
              <IndexRoute component={JianceManage} />
              <Route path="jiance" component={JianceManage} >
                <IndexRoute component={JianceBiaogeM} />
                <Route path="biaoge" component={JianceBiaogeM} />
                <Route path="cedian" component={JianceCedianM} />
                <Route path="jisuan" component={JianceJisuanM} />
                <Route path="tbdata" component={JianceTbdataM} />
              </Route>

              <Route path="yewu" component={YewuManage} >
                <IndexRoute component={YewuBiaogeM} />
                <Route path="biaoge" component={YewuBiaogeM} />
                <Route path="tbdata" component={YewuTbdataM} />
              </Route>

        </Route>

        <Route path="weixiuwh" component={Weixiuweihu}>
            <IndexRoute component={Gongdan} />
            <Route path="gongdan" component={Gongdan} />
            <Route path="baoxiu" component={Baoxiuwh} />
            <Route path="jibenxinxi" component={Jibenxinxi} />
            <Route path="xunjian" component={Xunjianwh}>
              <IndexRoute component={Xunjianjh} />
              <Route path="xunjianjh" component={Xunjianjh} />
              <Route path="timemodel" component={Timemodel} />
              <Route path="xunjianjhsz" component={Xunjianjhsz} />
            </Route>

            <Route path="baoyang" component={Baoyang}>
              <IndexRoute component={Jihua} />
              <Route path="baoyangrenwu" component={BaoyangRenwu} />
              <Route path="baoyangjihuashezhi" component={BaoyangJihuaShezhi} />
              <Route path="jihua" component={Jihua} />

            </Route>




        </Route>


        <Route path="chaobiaojiesuan" component={Chaobiaojiesuan}>
            <IndexRoute component={Chaobiaodan} />
            <Route path="chaobiaodan" component={Chaobiaodan} />
            <Route path="jiesuandan" component={Jiesuandan} />
        </Route>



        <Route path="xiaoxi" component={XiaoxiLiebiao}>
            <IndexRoute component={Daibantixing} />
            <Route path="daibantixing" component={Daibantixing} />
        </Route>

        <Route path="daibangongzuo" component={Daibangongzuo}>
            <IndexRoute component={Daiban} />
            <Route path="daiban" component={Daiban} />
            <Route path="yiban" component={Yiban} />

        </Route>









        <Route path="*" component={NotFound} />


    </Route>
)
