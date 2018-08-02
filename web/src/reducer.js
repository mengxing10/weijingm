/**
 * @file indexReducer
 * @author zlc <lichao9182@126.com>
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as user}  from './user';
import {reducer as login} from './login';
// import {reducer as report} from './baobiao/report';
// import {reducer as qushi} from './baobiao/qushi';
//
// import {reducer as equipment} from './crud/equipment';
// import {reducer as company} from './crud/company';
// import {reducer as stationgroup} from './crud/stationgroup';

import {reducer as bengzhan} from './fenxi/bengzhan';
import {reducer as shuibeng} from './fenxi/shuibeng';
import {reducer as jiankang} from './fenxi/jiankang';
import {reducer as guzhangyuce} from './fenxi/guzhangyuce';



import {reducer as gailanzonglan} from './gailan/gailanzonglan';
import {reducer as gailanxiangmu} from './gailan/gailanxiangmu';
import {reducer as gailanbengzus} from './gailan/gailanbengzu';
import {reducer as gailanshuibeng} from './gailan/gailanshuibeng';

import {reducer as monitor}  from './jiance/monitor'
import {reducer as warn} from './jiance/warn';
import {reducer as quxian} from './jiance/quxian';




import {reducer as jiancebiaogem} from './peizhi/jiancemanage/biaoge';
import {reducer as jiancecedianm} from './peizhi/jiancemanage/cedian';
import {reducer as jiancejisuanm} from './peizhi/jiancemanage/jisuan';
import {reducer as jiancetbdatam} from './peizhi/jiancemanage/tbdata';

import {reducer as yewubiaogem} from './peizhi/yewumanage/biaoge';
import {reducer as yewutbdatam} from './peizhi/yewumanage/tbdata';


import {reducer as xiaoxi} from './xiaoxi';

import {reducer as daibantixing} from './xiaoxiliebiao/daibantixing'

import {reducer as timemodel} from './weixiuweihu/xunjian/timemodel'
import {reducer as xunjianjihuashezhi} from './weixiuweihu/xunjian/xunjianjihuashezhi'
import {reducer as xunjianjihua} from './weixiuweihu/xunjian/xunjianjihua'

import {reducer as baoyangrenwu} from './weixiuweihu/baoyang/baoyangrenwu'
import {reducer as baoyangjihuashezhi} from './weixiuweihu/baoyang/baoyangjihuashezhi'
import {reducer as jihua} from './weixiuweihu/baoyang/jihua'


import {reducer as gongdan} from './weixiuweihu/gongdan';
import {reducer as baoxiuwh} from './weixiuweihu/baoxiu';
import {reducer as jibenxinxi} from './weixiuweihu/jibenxinxi'

import {reducer as chaobiaodan} from './chaobiaojiesuan/chaobiaodan'
import {reducer as jiesuandan} from './chaobiaojiesuan/jiesuandan'

export default combineReducers({
    user,
    login,
    //监测
    monitor,
    warn,
    quxian,
    //消息
    xiaoxi,


    //分析
    bengzhan,
    shuibeng,
    jiankang,
    guzhangyuce,
    //概览
    gailanzonglan,
    gailanxiangmu,
    gailanbengzus,
    gailanshuibeng,

    //peizhi
    jiancebiaogem,
    jiancecedianm,
    jiancejisuanm,
    jiancetbdatam,
    yewubiaogem,
    yewutbdatam,



    daibantixing,

    timemodel,
    xunjianjihuashezhi,
    xunjianjihua,

    baoyangrenwu,
    baoyangjihuashezhi,
    jihua,

    gongdan,
    baoxiuwh,

    jibenxinxi,
    chaobiaodan,
    jiesuandan,


    routing: routerReducer
})
