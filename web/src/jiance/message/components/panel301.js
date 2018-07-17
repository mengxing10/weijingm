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
class Mxunjian extends Component {
    static contextTypes = {
        allData: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            sidebarOpen: false,
            bengtitle:"38",
            list:[{"name":"1"},{"name":"2"},{"name":"3"},{"name":"1"},{"name":"2"},{"name":"3"},{"name":"1"},{"name":"2"},{"name":"3"},{"name":"1"},{"name":"2"},{"name":"3"}]
        }

    };




    clickclose(ev){
        var path= window.location.href.split('=').pop()
        console.log(path)
        var maintainid=path
        browserHistory.push(`/ecloud/jzjny/mobile/gonggaolist?maintainid=`+maintainid)
    }

    clickclose_quxiao(ev){
        $(".panel-exit").children("span").click();

    }

    render() {
        var mydate = new Date();
        var myyear = mydate.getFullYear();
        var mymonth = mydate.getMonth() + 1;
        var myday = mydate.getDate();
        var myhour = mydate.getHours();
        var myminute = mydate.getMinutes();
        var time=myyear+"-"+mymonth+"-"+myday+""+" "+myhour+"："+myminute
        var userid= localStorage.getItem("userid")
        var username= localStorage.getItem("username")
        let xjlist=this.props
        const {fetchxjlist} = this.props;
        console.log(xjlist)
        var path= window.location.href.split('=').pop()
        var paths="c"+path
        console.log(path)
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
            {fetchxjlist=="start" && Loading}
            {fetchxjlist=="done" &&
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
                                    <div className="count_lists yxcs">
                                        {xjlist.data.systemparameter.map((index,i)=>{
                                                return(
                                                    <ul key={i+"u1"}>
                                                        <li className="yxcssb" key={i+"a1"}>{index.parameters}</li>
                                                        <li className=" yxcsfw"key={i+"b1"}>{index.workcondition}</li>
                                                        <li className={" yxcssj"+i} key={i+"c1"}><input className="shuru" type="text" placeholder="输入实际参数" readOnly="true" /></li>
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
                                        <div className="count_lists yxsb">
                                            {xjlist.data.devicecondition.map((index,i)=>{
                                                return(
                                                    <ul key={i+"u2"}>
                                                        <li className={" yxsbsb"+i} key={i+"a1"}>{index.device}</li>
                                                        <li className={" yxsbyy"+i} key={i+"c1"}><input className="shuru" type="text" placeholder="有无异音" readOnly="true" /></li>
                                                        <li className={" yxsbbwd"+i} key={i+"c2"}><input className="shuru" type="text" placeholder="泵温度" readOnly="true" /></li>
                                                        <li className={" yxsbdjwd"+i} key={i+"c3"}><input className="shuru" type="text" placeholder="电机温度" readOnly="true" /></li>
                                                        <li className={" yxsbdl"+i}  key={i+"c4"}><input className="shuru" type="text" placeholder="电流" readOnly="true" /></li>
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
                                        <div className="count_lists fm">
                                            {xjlist.data.tapcondition.map((index,i)=>{
                                                return(
                                            <ul key={i+"u3"}>
                                                <li className={" fmsb"+i} key={i+"a"}>{index.tap}</li>
                                                <li className={" fmyy"+i} key={i+"d1"}><input className="shuru" type="text" placeholder="有无异音" readOnly="true" /></li>
                                                <li className={" fmdjwd"+i} key={i+"d2"}><input className="shuru" type="text" placeholder="电机温度" readOnly="true" /></li>
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
                                        <div className="count_lists qtsb">
                                                {xjlist.data.otherdeviceconditon.map((index,i)=>{
                                                    return(
                                                <ul key={i+"u4"}>
                                                    <li  className={" qtsb"+i } key={i+"a"}>{index.otherdevice}</li>
                                                    <li className={" qtwt"+i} key={i+"f1"}><input className="shuru" type="text" placeholder="问题描述" readOnly="true" /></li>
                                                </ul>
                                                    )
                                                    }

                                             )}
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="wh_foot">
                            <div className="wh_foot_lf" onClick={this.clickclose_quxiao.bind(this)}>取消</div>
                            <div className="wh_foot_rg" >提交</div>

                        </div>
                        <div className="load"><img  src={require('../img/load.gif')} alt="" /></div>

                    </div>}
            </div>

        )



    }





    componentWillMount(){
        var path= localStorage.getItem("path");
        const {getxjlist} = this.props;
        let parmes={"xiangmu":path}
        getxjlist(parmes);




    }


    componentDidMount(){
    }
    componentDidUpdate(){
        

        var that=this
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


        //双击输入实际值
        var i = 0;
        $(".shuru").click(function(){

            i++;
            setTimeout(function () {
                i = 0;
            }, 500);
            if (i > 1) {
                $(this).removeAttr("readonly")
                i = 0;
            }
        })
        //监听参数输入响应
        $(".shuru").change(function(){
            if(($(this).val() !="")){

                //$(this).parent().siblings(".csname").css("color","red");
                $(this).css("color","red");
            }else {
               // $(this).parent().siblings(".csname").css("color","#000");
                $(this).css("color","#000");
            }

        });

        var username= localStorage.getItem("username")
        //提交
        $(".wh_foot_rg").unbind("click").click(function(){
            var path= localStorage.getItem("path");
            var userid= localStorage.getItem("userid");
            console.log(path)
            var xinxi="\"xiangmu\":"+path+",\"userid\":"+userid
            var canshu="\"systemparameterlist\":[";
            $('.yxcs').children("ul").each(function(){
                if($(this).index()==0){
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            canshu=canshu+"{\"xiangmu\":\""+path+"\",\"parameters\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){

                            canshu=canshu+",\"workcondition\":\""+$(this).html()+"\"";
                        }else if($(this).index()==2){
                            canshu=canshu+",\"currentcondition\":\""+$(this).children("input").val()+"\"";
                            console.log($(this).children("input").val())
                            if($(this).children("input").val() !=""){
                                canshu=canshu+",\"qualified\":\"否\"";
                            }else {
                                canshu=canshu+",\"qualified\":\"是\"";
                            }
                            canshu=canshu+",\"watch\":\""+username+"\"}";
                        }
                    });
                }else {
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            canshu=canshu+",{\"xiangmu\":\""+path+"\",\"parameters\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){

                            canshu=canshu+",\"workcondition\":\""+$(this).html()+"\"";
                        }else if($(this).index()==2){
                            canshu=canshu+",\"currentcondition\":\""+$(this).children("input").val()+"\"";
                            console.log($(this).children("input").val())
                            if($(this).children("input").val() !=""){
                                canshu=canshu+",\"qualified\":\"否\"";
                            }else {
                                canshu=canshu+",\"qualified\":\"是\"";
                            }
                            canshu=canshu+",\"watch\":\""+username+"\"}";
                        }
                    });
                }


            });
            canshu=canshu+"]";
           // alert(canshu);


            var shebei="\"deviceconditionlist\":[";
            $('.yxsb').children("ul").each(function(){
                var num=0;
                if($(this).index()==0){
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            shebei=shebei+"{\"xiangmu\":\""+path+"\",\"device\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){

                            shebei=shebei+",\"sound\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }
                        }else if($(this).index()==2){
                            shebei=shebei+",\"pumptemperature\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }

                        }else if($(this).index()==3){
                            shebei=shebei+",\"motortemperature\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }

                        }else if($(this).index()==4){
                            shebei=shebei+",\"current\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }
                            if(num>0){
                                shebei=shebei+",\"normal\":\"否\"";
                            }else {
                                shebei=shebei+",\"normal\":\"是\"";
                            }
                            shebei=shebei+",\"watch\":\""+username+"\"}";
                        }


                    });
                }else {
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            shebei=shebei+",{\"xiangmu\":\""+path+"\",\"device\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){

                            shebei=shebei+",\"sound\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }
                        }else if($(this).index()==2){
                            shebei=shebei+",\"pumptemperature\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }

                        }else if($(this).index()==3){
                            shebei=shebei+",\"motortemperature\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }

                        }else if($(this).index()==4){
                            shebei=shebei+",\"current\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num+=1;
                            }else {
                                num+=0;
                            }
                            if(num>0){
                                shebei=shebei+",\"normal\":\"否\"";
                            }else {
                                shebei=shebei+",\"normal\":\"是\"";
                            }
                            shebei=shebei+",\"watch\":\""+username+"\"}";
                        }


                    });
                }


            });
            shebei=shebei+"]";
            //alert(shebei);

            var fm="\"tapconditionlist\":[";
            $('.fm').children("ul").each(function(){
                var num_fm=0;
                if($(this).index()==0){
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            fm=fm+"{\"xiangmu\":\""+path+"\",\"tap\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){

                            fm=fm+",\"sound\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num_fm+=1;
                            }else {
                                num_fm+=0;
                            }
                        }else if($(this).index()==2){
                            fm=fm+",\"motortemperature\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num_fm+=1;
                            }else {
                                num_fm+=0;
                            }
                            if(num_fm>0){
                                fm=fm+",\"normal\":\"否\"";
                            }else {
                                fm=fm+",\"normal\":\"是\"";
                            }
                            fm=fm+",\"watch\":\""+username+"\"}";

                        }


                    });
                }else {
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            fm=fm+",{\"xiangmu\":\""+path+"\",\"tap\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){

                            fm=fm+",\"sound\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num_fm+=1;
                            }else {
                                num_fm+=0;
                            }
                        }else if($(this).index()==2){
                            fm=fm+",\"motortemperature\":\""+$(this).children("input").val()+"\"";
                            if($(this).children("input").val() !=""){
                                num_fm+=1;
                            }else {
                                num_fm+=0;
                            }
                            if(num_fm>0){
                                fm=fm+",\"normal\":\"否\"";
                            }else {
                                fm=fm+",\"normal\":\"是\"";
                            }
                            fm=fm+",\"watch\":\""+username+"\"}";

                        }


                    });
                }


            });
            fm=fm+"]";
           // alert(fm);


            var qtsb="\"otherdeviceconditonlist\":[";
            $('.qtsb').children("ul").each(function(){
                var num_qtsb=0;
                if($(this).index()==0){
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            qtsb=qtsb+"{\"xiangmu\":\""+path+"\",\"otherdevice\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){
                            qtsb=qtsb+",\"normal\":\""+$(this).children("input").val()+"\"";

                            qtsb=qtsb+",\"watch\":\""+username+"\"}";
                        }


                    });
                }else {
                    $(this).children("li").each(function(){
                        if($(this).index()==0){
                            qtsb=qtsb+",{\"xiangmu\":\""+path+"\",\"otherdevice\":\""+$(this).html()+"\"";
                        }else if($(this).index()==1){
                            qtsb=qtsb+",\"normal\":\""+$(this).children("input").val()+"\"";

                            qtsb=qtsb+",\"watch\":\""+username+"\"}";
                        }


                    });
                }


            });
            qtsb=qtsb+"]";

            let parmes="{"+xinxi+","+canshu+","+shebei+","+fm+","+qtsb+"}"
            console.log(parmes)
            $(".load").show()

            var ips= localStorage.getItem("ips")
            var  baseUrl=ips+'routinginspection/addRoutingInspection ';
            $.ajax({
                cache: true,
                contentType: "application/json; charset=utf-8",
                type: "POST",
                url: baseUrl,
                dataType: "json",
                data:parmes,
                async: false,
                error: function(data) {
                    $(".load").hide();
                    console.log(data);
                    alert("Connection error");
                },
                success: function(data) {
                    if(data.status=1){
                        $(".load").hide();
                        $(".panel-exit").children("span").click();
                        //alert("提交成功");
                    }
                   console.log(data)

                }
            })
        })


    }

}

function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
};
export default connect(state => state.xiaoxi, mapDispatchToProps)(Mxunjian);