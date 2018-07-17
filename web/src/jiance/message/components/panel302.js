/**
 * @file MMonitor
 * @author luwenlong
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import classNames from 'classnames'
import jquery from '../constants/jquery.js'
import Base64 from '../constants/base.js'
import moment from 'moment'
import Loading from '../components/Loading'
//import rem from '../constants/rem.js'
import common from '../constants/paizhao/common.js'
import utitls from '../constants/paizhao/utitls.js'
import mqtt from '../components/mqtt/mqtt.js'
import shuaxin from '../constants/shuaxin.js'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import  '../styles/panel301.styl'
import * as actions from '../actions.js'

class Mxunjianshow extends Component {
    static contextTypes = {
        allData: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            maintainid:this.props.maintainid
        }

    };




    clickclose(ev){
        var path= window.location.href.split('=').pop()
        console.log(path)
        var maintainid=path
        browserHistory.push(`/ecloud/jzjny/mobile/xunjianlist?maintainid=`+maintainid)
    }

    clickclose_quxiao(ev){
        document.getElementById("yourformid").reset()

    }

    render() {

        let xjshow=this.props
        const {fetchxjshow,maintainid} = this.props;
        console.log(fetchxjshow)
        console.log("2222"+xjshow)

        const data=[
            {"name":"低区回水温度","fanwei":"10-30"}, {"name":"高区回水温度","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"},
            {"name":"低区回水温度","fanwei":"10-30"}, {"name":"高区回水温度","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"},
            {"name":"低区回水温度","fanwei":"10-30"}, {"name":"高区回水温度","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}, {"name":"热泵机组2","fanwei":"10-30"}
        ]
        const data2=[
            {"name":"热泵机组1#"},{"name":"热泵机组2#"},{"name":"冷水泵1#"},{"name":"冷水泵2#"},{"name":"热水泵1#"},{"name":"热水泵2#"},{"name":"水箱循环泵站1#"},{"name":"水箱循环泵站2#"},{"name":"高区供水泵1#"},
            {"name":"高区供水泵2#"},{"name":"高区供水泵3#"},{"name":"低区供水泵1#"},{"name":"低区供水泵2#"},{"name":"低区供水泵3#"},
        ]
        const data3=[
            {"name":"电工阀门1#"},{"name":"电动阀门2#"},{"name":"电动调节阀1#"},{"name":"电动调节阀2#"}
        ]
        const data4=[
            {"name":"高区消耗器#"},{"name":"低区消耗器#"},{"name":"管区有无震动漏点#"},{"name":"电加热器#"},{"name":"电控柜#"},{"name":"温度计变送器#"},{"name":"压力变送器#"},{"name":"温度计#"},{"name":"压力表#"}

        ]

        return (

            <div className="home xunjian">
                    <div className="xj_head">
                        <div className="xj_title">巡检</div>
                        <div className="panel-exit">
                            <span onClick={this.props.closeFun.bind(this,1)}></span>
                        </div>
                    </div>
            {fetchxjshow=="start" && Loading}
            {fetchxjshow=="done" &&
                    <div className="xj_content">
                        <div className="xj_content2">
                            <div className="list canshu">
                                <div className="banner">
                                    <div className="banner_name">运行参数</div>
                                    <img className="banner_jt canshu_banner_jt" src={require('../img/xjjt.png')} alt="" />
                                </div>
                                <div className="count">
                                    <ul className="mingcheng">
                                        <li>设备</li>
                                        <li>参数范围</li>
                                        <li>实际参数</li>
                                    </ul>
                                    <div className="count_lists">
                                        {xjshow.data.systemparameter.map((index,i)=>{
                                                return(
                                                    <ul key={i+"u1"}>
                                                        <li className="csname" key={i+"a1"}>{index.parameters}</li>
                                                        <li key={i+"b1"}>{index.workcondition}</li>
                                                        <li key={i+"c1"} className="changeValue">{index.currentcondition}</li>
                                                    </ul>


                                                )
                                            }

                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="list shebei">
                                <div className="banner">
                                    <div className="banner_name">运行设备</div>
                                        <img className="banner_jt banner_jt_2" src={require('../img/xjjt.png')} alt="" />
                                    </div>
                                    <div className="count">
                                        <ul className="mingcheng">
                                            <li>设备</li>
                                            <li>有无异音</li>
                                            <li>泵温度</li>
                                            <li>电机温度</li>
                                            <li>电流</li>
                                        </ul>
                                        <div className="count_lists">
                                            {xjshow.data.devicecondition.map((index,i)=>{
                                                return(
                                                    <ul key={i+"u2"}>
                                                        <li className="csname" key={i+"a1"}>{index.device}</li>
                                                        <li className="changeValue" key={i+"c1"}>{index.sound}</li>
                                                        <li className="changeValue" key={i+"c2"}>{index.pumptemperature}</li>
                                                        <li className="changeValue" key={i+"c3"}>{index.motortemperature}</li>
                                                        <li className="changeValue" key={i+"c4"}>{index.current}</li>
                                                    </ul>

                                                )
                                                }

                                             )}
                                        </div>
                                    </div>
                            </div>
                            <div className="list famen">
                                <div className="banner">
                                    <div className="banner_name">阀门</div>
                                    <img className="banner_jt banner_jt_3" src={require('../img/xjjt.png')} alt="" />
                                </div>
                                <div className="count">
                                        <ul className="mingcheng">
                                            <li>设备</li>
                                            <li>有无异音</li>
                                            <li>电机温度</li>
                                        </ul>
                                        <div className="count_lists">
                                        {xjshow.data.tapcondition.map((index,i)=>{
                                                return(
                                            <ul key={i+"u3"}>
                                                <li className="csname" key={i+"a"}>{index.tap}</li>
                                                <li className="changeValue" key={i+"d1"}>{index.sound}</li>
                                                <li className="changeValue" key={i+"d2"}>{index.motortemperature}</li>
                                            </ul>


                                            )
                                            }

                                            )}
                                        </div>
                                    </div>
                            </div>
                            <div className="list qita">
                                <div className="banner">
                                    <div className="banner_name">其他设备</div>
                                    <img className="banner_jt banner_jt_4" src={require('../img/xjjt.png')} alt="" />
                                </div>
                                <div className="count">
                                        <ul className="mingcheng">
                                        <li>设备</li>
                                        <li>问题描述</li>
                                        </ul>
                                        <div className="count_lists">
                                        {xjshow.data.otherdeviceconditon.map((index,i)=>{
                                                    return(
                                                <ul key={i+"u4"}>
                                                    <li className="csname" key={i+"a"}>{index.otherdevice}</li>
                                                    <li className="changeValue" key={i+"f1"}>{index.normal}</li>
                                                </ul>
                                                    )
                                                    }

                                             )}
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="load"><img  src={require('../img/load.gif')} alt="" /></div>
                    </div>}
            </div>

        )



    }





    componentWillMount(){
        // const {xjshow} = this.context.allData;
        // let xjtime=localStorage.getItem("xjtime")
        // var path= window.location.href.split('=').pop()-1
        // var parmes={"xiangmu":path,"startTime":xjtime,"stopTime":xjtime}
        // console.log(parmes)
        // xjshow(parmes);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.maintainid!=nextProps.maintainid){
            const {xjshow} = nextProps;
            var mes=nextProps.maintainid;
            //
            console.log("44444"+mes);
            var strs= new Array(); //定义一数组
            strs=mes.split(",");
            var parmes={"xiangmu":strs[0],"startTime":strs[1],"stopTime":strs[2]}
            //
            xjshow(parmes);
        }
   }

    componentDidUpdate(){
        //lists伸展
        var j=0
        $(".canshu_banner_jt").click(function(){
            $(this).parent(".banner").siblings(".count").toggle();
            j++
            $(this).css("transform","rotate(-180deg)" )
            if(j>1){
                $(this).css("transform","rotate(0)" )
                j=0
            }

        })
        var z=0
        $(".banner_jt_2").click(function(){
            $(this).parent(".banner").siblings(".count").toggle();
            z++
            $(this).css("transform","rotate(0)" )

            if(z>1){
                $(this).css("transform","rotate(-180deg)" )
                z=0
            }

        })
        var m=0
        $(".banner_jt_3").click(function(){
            $(this).parent(".banner").siblings(".count").toggle();
            m++
            $(this).css("transform","rotate(0)" )
            if(m>1){
                $(this).css("transform","rotate(-180deg)" )
                m=0
            }

        })

        var n=0
        $(".banner_jt_4").click(function(){
            $(this).parent(".banner").siblings(".count").toggle();
            n++
            $(this).css("transform","rotate(0)" )
            if(n>1){
                $(this).css("transform","rotate(-180deg)" )
                n=0
            }

        })

       //数据变红
        $(".changeValue").css({"color":"red"})









    }

}
function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
};
export default connect(state => state.xiaoxi, mapDispatchToProps)(Mxunjianshow);
