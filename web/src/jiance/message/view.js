/**
 * @file MMonitor
 * @author luwenlong
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import classNames from 'classnames'
//import jquery from 'jquery'
import jquery from './constants/jquery.js'
import jquer from './constants/jquer.js'
import FileUpload from 'react-fileupload'
import mqtt from './components/mqtt/mqtt.js'
import moment from 'moment'
import Loading from './components/Loading'
//import rem from './constants/rem.js'
import shuaxin from './constants/shuaxin.js'
import './styles/view.styl'
import jquerymousewheel from './constants/jquery.mousewheel.js'

import Panel101 from './components/panel101'
import Panel102 from './components/panel102'
import Panel201 from './components/panel201'
import Panel202 from './components/panel202'
import Panel301 from './components/panel301'
import Panel302 from './components/panel302'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as actions from './actions.js'


class Message extends Component { 
    static contextTypes = {
        allData: PropTypes.object.isRequired 
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            openPanel:'',
            maintainid:0,
            clientuser:0

        }

        };
    render() {
        let project =this.props.location.query.project;
        let title=""
        title += project=="all"?"全部":project==28?"28/38泵站":project==3?"3/4泵站":"综合泵站"
        var path= localStorage.getItem("path")
        console.log(path)
        var titles= localStorage.getItem("titles")
        var paths=titles+"c"+path
        var userid= localStorage.getItem("userid")
        var username= localStorage.getItem("username")
        var ip= localStorage.getItem("ip")
        var ips= localStorage.getItem("ips")
        var bengzhan= localStorage.getItem("bengzhan")
        var mydate = new Date();
        var myyear = mydate.getFullYear();
        var mymonth = mydate.getMonth() + 1;
        var myday = mydate.getDate();
        var myhour = mydate.getHours();
        var myminute = mydate.getMinutes();
        var time=myyear+"-"+mymonth+"-"+myday+""+" "+myhour+"："+myminute
        const {openPanel,maintainid} = this.state;
        const options={
            baseUrl:ips+'upload/MessageUpload',
            param:{
                userid:userid,
                username:username,
                topic:paths,
                time:time
            },
            multiple: true,
            numberLimit: 9,
            chooseAndUpload:true
        }

        return (
            <div className=" gonggao_list" >
                <div className="load"><img  src={require('./img/load.gif')} alt="" /></div>
                <div className="bigimg"><img  src={require('./img/load.gif')} alt="" /></div>
                <div className="gonggao_list_head" id="mes_list_head">
                    <div className="gonggao_list_title" onChange={this.handleChange.bind(this,title)} ref="inputContent">消息--{title}</div>
                </div>
                <div className="gonggao_list_content"  id="gonggao_list_content"  onClick={this.hideMore.bind(this)}>
                    <div id="kong"></div>
                    <div className="gonggao_list_cons"  id="scroll-container">
                    </div>
                    {openPanel==101&&<div className={classNames("panel-model",{active:true})}>
                    <Panel101 closeFun={::this.closePanel} data={userid} />
                    </div>}
                    {openPanel==102&&<div className={classNames("panel-model",{active:true})}>
                    <Panel102 closeFun={::this.closePanel} maintainid ={maintainid} />
                    </div>}
                     {openPanel==201&&<div className={classNames("panel-model",{active:true})}>
                    <Panel201 closeFun={::this.closePanel} />
                    </div>}
                    {openPanel==202&&<div className={classNames("panel-model",{active:true})}>
                    <Panel202 closeFun={::this.closePanel} maintainid ={maintainid}/>
                    </div>}
                    {openPanel==301&&<div className={classNames("panel-model",{active:true})}>
                    <Panel301 closeFun={::this.closePanel} />
                    </div>}
                    {openPanel==302&&<div className={classNames("panel-model",{active:true})}>
                    <Panel302 closeFun={::this.closePanel} maintainid ={maintainid}/>
                    </div>}
                     
                </div>
                <div className="gonggao_list_sc">
                    <div className="gonggao_list_top">
                        <div className="gonggao_list_bottom_paizhao">
                            <FileUpload options={options}>
                            <dt className="tj1" ref="chooseAndUpload"><img src={require('./img/chat1.png')} alt="" /></dt>
                            </FileUpload>

                        </div>
                        <div className="gonggao_list_bottom_renwu1 baoxiuanniu"  onClick={::this.openPanel.bind(this, 101,0)}>
                            <dt><img src={require('./img/chat2.png')} alt="" /></dt>

                        </div>  
                        <div className="gonggao_list_bottom_renwu2 weixiuanniu"  onClick={::this.openPanel.bind(this, 201,0)}>
                            <dt><img src={require('./img/chat3.png')} alt="" /></dt>
                        </div>
                        <div className="gonggao_list_bottom_renwu xunjian1"  onClick={::this.openPanel.bind(this, 301,0)} style={{"display":"none"}}>
                            <dt><img src={require('./img/chat4.png')} alt="" /></dt>

                        </div>
                    </div>
                    <div className="gonggao_list_bottom">
                        <textarea  name="describe" className="gonggao_list_sc_input" id="gonggao_list_sc_input">

                        </textarea>

                    </div>
                </div>

                <div className="twhxq_content">
                    <div className="twhxq_con">
                    </div>
                    <div className="gb"><img  src={require('./img/gb.png')} alt="" />
                    </div>
                </div>

            </div>

        )



    }


    handleChange(event){
        alert( event)
        //通过React.findDOMNode()拿到真实的DOM对象
        var node = React.findDOMNode(this.refs.inputContent);
        node.innerHTML = event.target.value;

    }

    openPanel(num,maintainid){
       this.setState({openPanel:num})
       this.setState({maintainid:maintainid})
       console.log("openPanel");
    }
    closePanel(num,id){
      this.setState({openPanel:""})
    }
    brower(){
        browserHistory.push(`/ecloud/jzjny/mobile/messages`)
    }
    showMore(){
        //$(".gonggao_list_sc").css({"margin-bottom":"0"})
    }
    hideMore(){
        //console.log("1")
       // $(".gonggao_list_sc").css({"margin-bottom":"-4.5rem"})
    }
    moveshezhi(){
        //client.end()
        //browserHistory.push(`/ecloud/jzjny/mobile/shezhi`)
    }

    componentWillMount(){

    }
    componentWillUnmount(){
         var client=this.state.clientuser;
         client.end();
         const {clearMessageNumber} = this.props;
         var topicid= localStorage.getItem("path")
         var userid= localStorage.getItem("userid")
         var parmes={"topicid":topicid,"userid":userid}
            clearMessageNumber(parmes);
    }
    //componentDidUpdate(){
    //    //切换频道
    //    let project =this.props.location.query.project;
    //    refers(project)
    //    $(".gonggao_list_cons").empty()
    //    function refers(project){
    //       // alert(project)
    //        var j=0;
    //
    //        //首次进页面 刷5条信息开始
    //        var ip= localStorage.getItem("ip")
    //        var ips=localStorage.getItem("ips");
    //        var baseUrl=ips+'message/getMessageByUser';
    //        var userid= localStorage.getItem("userid")
    //        var username= localStorage.getItem("username")
    //        var path= localStorage.getItem("path")
    //        var that = this
    //        console.log(j)
    //        $.ajax({
    //            cache: true,
    //            type: "POST",
    //            url:baseUrl,
    //            data:{
    //                topicid:path,
    //                userid:userid
    //            },
    //            async: false,
    //            error: function(request) {
    //                alert("Connection error1");
    //            },
    //            success: function(data) {
    //                var length=data.data.length;
    //                var number=data.data.messagenumber
    //                console.log(data.data)
    //                j=number
    //                $.each(data.data.messageList,function(c,d){
    //                    console.log(c)
    //                    console.log(d)
    //                    //var ip= localStorage.getItem("ip")
    //                    var  baseUrl=ip;
    //                    var  thatme = that
    //                    //chakan
    //                    var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"
    //                    if(d.type=="text"){
    //                        var html="";
    //                        if(username==d.username){
    //                            html+='<ul class="gonggao_list_cons_ul">'
    //                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
    //                            html+='<li class="gonggao_list_cons_ul_li2_right">'
    //                            html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
    //                            html+='</li>'
    //                            html+='</ul>'
    //                            $(".gonggao_list_cons").prepend(html)
    //                        }else {
    //                            html+='<ul class="gonggao_list_cons_ul">'
    //                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
    //                            html+='<li class="gonggao_list_cons_ul_li2_left">'
    //                            html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
    //                            html+='</li>'
    //                            html+='</ul>'
    //                            $(".gonggao_list_cons").prepend(html)
    //                        }
    //                    }else if(d.type=="alarm"){
    //                        //var ip= localStorage.getItem("ip")
    //                        var baseUrl=ip;
    //                        var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"
    //                        if(d.alarmstatus==0){
    //                            d.alarmstatus="未解除"
    //                        }else {
    //                            d.alarmstatus="已解除"
    //                        }
    //                        var html="";
    //                        html+='<ul class="gonggao_list_cons_ul">'
    //                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
    //                        html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
    //                        html+='<li class="gonggao_list_cons_ul_li2_left">'
    //                        html+='<div class="gonggao_list_cons_ul_li2_2" id="gonggao_list_cons_ul_li2_2">'+d.alarmcontent+'</div>'
    //                        html+='<div class="zhuxiao" id="zhuxiao">'+d.alarmstatus+'</div>'
    //                        html+='</li>'
    //                        html+='</ul>'
    //                        $(".gonggao_list_cons").prepend(html)
    //                        var text=document.getElementById("zhuxiao").innerHTML;
    //                        if(text=="已解除"){
    //                            document.getElementById("zhuxiao").style.display="block"
    //                        }else {
    //                            document.getElementById("zhuxiao").style.display="none"
    //                        }
    //                    }else if(d.type=="img"){
    //                        //var ip= localStorage.getItem("ip")
    //                        var  baseUrl=ip;
    //                        var html="";
    //                        if(username==d.username){
    //                            html+='<ul class="gonggao_list_cons_ul">'
    //                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
    //                            html+='<li class="gonggao_list_cons_ul_li2_right">'
    //                            html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
    //                            html+='</li>'
    //                            html+='</ul>'
    //                            $(".gonggao_list_cons").prepend(html)
    //                        }else {
    //                            html+='<ul class="gonggao_list_cons_ul">'
    //                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
    //                            html+='<li class="gonggao_list_cons_ul_li2_left">'
    //                            html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
    //                            html+='</li>'
    //                            html+='</ul>'
    //                            $(".gonggao_list_cons").prepend(html)
    //                        }
    //                        $(".gonggao_img").unbind("click").click(function(){
    //                            $(".bigimg").find('img').attr('src',this.src);
    //                            $(".bigimg").show();
    //                        })
    //                    }else if(d.type=="maintain"){
    //                        //  
    //                        //var ip= localStorage.getItem("ip")
    //                        var  baseUrl=ip;
    //                        var status=d.status
    //                        console.log(status)
    //                        if(status==0){
    //                            var html="";
    //                            if(username==d.username){
    //                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修任务</span></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //                            }else {
    //                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修任务</span></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //                            }
    //                            $(".weixiulingqu").click(function(){
    //                                var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
    //                                that.openPanel(202,maintainid);
    //                            })
    //                        }else if(status==1){
    //                            var html="";
    //                            if(username==d.username){
    //                                html+='<ul class="gonggao_list_cons_ul">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
    //                                html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //                            }else {
    //                                html+='<ul class="gonggao_list_cons_ul">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></em></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
    //                                html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //                            }
    //                            $(".weixiuchakan").unbind("click").click(function(){
    //                                var maintainid=$(this).siblings(".maintainid").html();
    //                                that.openPanel(202,maintainid);
    //                            })
    //                        }
    //                    }else if(d.type=="repair"){
    //                        //var ip= localStorage.getItem("ip")
    //                        var  baseUrl=ip;
    //                        var status=d.status
    //                        console.log(status)
    //                        if(status==0){
    //                            var html="";
    //                            if(username==d.username){
    //                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">报修</span></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_4  baoxiuchakan" >报修确认</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                //
    //                                $(".gonggao_list_cons").prepend(html)
    //                            }else {
    //                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修</span></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //                            }
    //                            $(".baoxiuchakan").unbind("click").click(function(){
    //                                var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
    //                                that.openPanel(102,maintainid);
    //                            })
    //                        }else if(status==1){
    //                            var html="";
    //                            if(username==d.username){
    //                                html+='<ul class="gonggao_list_cons_ul">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确认</span></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_3 baoxiuxichakan"  >查看详情</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //
    //                            }else {
    //                                html+='<ul class="gonggao_list_cons_ul">'
    //                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
    //                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
    //                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确认</span></em></div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_3 baoxiuxichakan"  >查看详情</div>'
    //                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
    //                                html+='</li>'
    //                                html+='</ul>'
    //                                $(".gonggao_list_cons").prepend(html)
    //
    //                            }
    //                            $(".baoxiuxichakan").unbind("click").click(function(){
    //                                var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
    //                                that.openPanel(102,maintainid);
    //
    //                            })
    //                        }
    //                    }else if(d.type=="reportform"){
    //                        //var ip= localStorage.getItem("ip")
    //                        var  baseUrl=ip;
    //                        var imgurl="%5Cupload%5Cavatar%5Cpump.jpg";
    //                        var text="";
    //                        var strs= new Array(); //定义一数组
    //                        var cont=new Array(); //定义一数组
    //                        var num=new Array(); //定义一数组
    //                        strs= d.content.split(","); //字符分割
    //                        console.log(strs)
    //                        cont=strs[2].split(" ");
    //                        num=cont[0].split("-");
    //                        if(strs[0]=="day"){
    //                            text=cont[0]+"号日报已生成，请点击查看"
    //                        }else if(strs[0]=="month"){
    //                            text=num[0]+num[1]+"月报已生成，请点击查看"
    //                        }else {
    //                            text=num[0]+"年报已生成，请点击查看"
    //                        }
    //                        var html="";
    //                        html+='<ul class="gonggao_list_cons_ul">'
    //                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
    //                        html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
    //                        html+='<li class="gonggao_list_cons_ul_li2_left">'
    //                        html+='<div class="gonggao_list_cons_ul_li2_2 gonggao_list_cons_ul_li2_ribao" id="gonggao_list_cons_ul_li2_ribao">'+text+'</div>'
    //                        html+='<div class="zhuxiao" id="zhuxiao">'+strs[0]+'</div>'
    //                        html+='<div class="baobiaoDate" id="baobiaoDate" style="display: none">'+cont[0]+'</div>'
    //
    //                        html+='</li>'
    //                        html+='</ul>'
    //                        $(".gonggao_list_cons").prepend(html)
    //                        $(".gonggao_list_cons_ul_li2_ribao").click(function(){
    //                            var path= localStorage.getItem("path")
    //                            var baobiaoDate=$(this).siblings(".baobiaoDate").html()
    //                            console.log(path)
    //                            // sessionStorage.setItem("key", "value");
    //                            sessionStorage.setItem("type", strs[0])
    //                            sessionStorage.setItem("startTime", strs[1])
    //                            sessionStorage.setItem("endTime", strs[2])
    //                            sessionStorage.setItem("baobiaoDate", baobiaoDate)
    //                            var userid= localStorage.getItem("userid")
    //                            var username= localStorage.getItem("username")
    //                            var avatar= localStorage.getItem("avatar")
    //                            var dataes={
    //                                "userid":userid,
    //                                "username":username,
    //                                "topicid":path,
    //                                "clear":1
    //                            }
    //                            browserHistory.push(`/ecloud/jzjny/mobile/baobiao?maintainid=`+path)
    //                        })
    //
    //
    //                    }else if(d.type=="xunjian"){
    //                        //var ip= localStorage.getItem("ip")
    //                        var  baseUrl=ip;
    //                        console.log(decodeURIComponent(baseUrl+d.content));
    //                        var mes=d.content;
    //                        var strs= new Array();
    //                        strs=mes.split(",");
    //                        var html="";
    //                        if(username==d.username){
    //                            html+='<ul class="gonggao_list_cons_ul"  >'
    //                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                            html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</dd>'
    //                            html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
    //                            html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
    //                            html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
    //                            html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
    //                            html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
    //                            html+='</dt>'
    //                            html+='</ul>'
    //                            $(".gonggao_list_cons").prepend(html)
    //                        }else {
    //                            html+='<ul class="gonggao_list_cons_ul"  >'
    //                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.time+'</span></li>'
    //                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
    //                            html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</dd>'
    //                            html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
    //                            html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
    //                            html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
    //                            html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
    //                            html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
    //                            html+='</dt>'
    //                            html+='</ul>'
    //                            $(".gonggao_list_cons").prepend(html)
    //                        }
    //                        $(".xuanjianchakan").unbind("click").click(function(){
    //                            var mes=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
    //                            console.log("-----"+mes);
    //                            that.openPanel(302,mes);
    //                        })
    //                    }
    //
    //
    //
    //
    //
    //                    //
    //
    //
    //                })
    //                var div = document.getElementById('gonggao_list_content');
    //                div.scrollTop = div.scrollHeight;
    //
    //            }
    //        });
    //        //首次进页面 刷5条信息结束
    //    }
    //}
    componentDidMount(){
        //定位光标
        //document.getElementById("gonggao_list_sc_input").focus();

        var j=0;

        //首次进页面 刷5条信息开始
        var ip= localStorage.getItem("ip")
        var ips=localStorage.getItem("ips");
        var baseUrl=ips+'message/getMessageByUser';
        var userid= localStorage.getItem("userid")
        var username= localStorage.getItem("username")
        var path= localStorage.getItem("path")
        var that = this
        console.log(j)
        $.ajax({
            cache: true,
            type: "POST",
            url:baseUrl,
            data:{
                topicid:path,
                userid:userid
            },
            async: false,
            error: function(request) {
               // alert("Connection error1");
               alert("接口服务连接异常");
            },
            success: function(data) {
                var length=data.data.length;
                var number=data.data.messagenumber
                console.log(data.data)
                j=number
                $.each(data.data.messageList,function(c,d){
                    console.log(c)
                    console.log(d)
                    //var ip= localStorage.getItem("ip")
                    var  baseUrl=ip;
                    var  thatme = that
                    //chakan
                    var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"
                    if(d.type=="text"){
                        var html="";
                        if(username==d.username){
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_right">'
                            html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                        }else {
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_left">'
                            html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                        }
                    }else if(d.type=="alarm"){
                        //var ip= localStorage.getItem("ip")
                        var baseUrl=ip;
                        var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"
                        if(d.alarmstatus==0){
                            d.alarmstatus="未解除"
                        }else {
                            d.alarmstatus="已解除"
                        }
                        var html="";
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
                        html+='<li class="gonggao_list_cons_ul_li2_left">'
                        html+='<div class="gonggao_list_cons_ul_li2_2" id="gonggao_list_cons_ul_li2_2">'+d.alarmcontent+'</div>'
                        html+='<div class="zhuxiao" id="zhuxiao">'+d.alarmstatus+'</div>'
                        html+='</li>'
                        html+='</ul>'
                        $(".gonggao_list_cons").prepend(html)
                        var text=document.getElementById("zhuxiao").innerHTML;
                        if(text=="已解除"){
                            document.getElementById("zhuxiao").style.display="block"
                        }else {
                            document.getElementById("zhuxiao").style.display="none"
                        }
                    }else if(d.type=="img"){
                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        var html="";
                        if(username==d.username){
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_right">'
                            html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                        }else {
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_left">'
                            html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                        }
                        $(".gonggao_img").unbind("click").click(function(){
                            $(".bigimg").find('img').attr('src',this.src);
                            $(".bigimg").show();
                        })
                    }else if(d.type=="maintain"){
                      //  
                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        var status=d.status
                        console.log(status)
                        if(status==0){
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修任务</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修任务</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".weixiulingqu").click(function(){
                                var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                that.openPanel(202,maintainid);
                            })
                        }else if(status==1){
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
                                html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></em></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
                                html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".weixiuchakan").unbind("click").click(function(){
                                var maintainid=$(this).siblings(".maintainid").html();
                                that.openPanel(202,maintainid);
                            })
                        }
                    }else if(d.type=="repair"){
                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        var status=d.status
                        console.log(status)
                        if(status==0){
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">报修</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4  baoxiuchakan" >报修确认</div>'
                                html+='</li>'
                                html+='</ul>'
                                //
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul" id="id'+d.maintainid+'">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".baoxiuchakan").unbind("click").click(function(){
                                  var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                  that.openPanel(102,maintainid);
                            })
                        }else if(status==1){
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确认</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_3 baoxiuxichakan"  >查看详情</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                                
                            }else {
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确认</span></em></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_3 baoxiuxichakan"  >查看详情</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                                
                            }
                            $(".baoxiuxichakan").unbind("click").click(function(){
                                  var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                  that.openPanel(102,maintainid);

                            })
                        }
                    }else if(d.type=="reportform"){
                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        var imgurl="%5Cupload%5Cavatar%5Cpump.jpg";
                        var text="";
                        var strs= new Array(); //定义一数组
                        var cont=new Array(); //定义一数组
                        var num=new Array(); //定义一数组
                        strs= d.content.split(","); //字符分割
                        console.log(strs)
                        cont=strs[2].split(" ");
                        num=cont[0].split("-");
                        if(strs[0]=="day"){
                            text=cont[0]+"号日报已生成，请点击查看"
                        }else if(strs[0]=="month"){
                            text=num[0]+num[1]+"月报已生成，请点击查看"
                        }else {
                            text=num[0]+"年报已生成，请点击查看"
                        }
                        var html="";
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
                        html+='<li class="gonggao_list_cons_ul_li2_left">'
                        html+='<div class="gonggao_list_cons_ul_li2_2 gonggao_list_cons_ul_li2_ribao" id="gonggao_list_cons_ul_li2_ribao">'+text+'</div>'
                        html+='<div class="zhuxiao" id="zhuxiao">'+strs[0]+'</div>'
                        html+='<div class="baobiaoDate" id="baobiaoDate" style="display: none">'+cont[0]+'</div>'

                        html+='</li>'
                        html+='</ul>'
                        $(".gonggao_list_cons").prepend(html)
                        $(".gonggao_list_cons_ul_li2_ribao").click(function(){
                            var path= localStorage.getItem("path")
                            var baobiaoDate=$(this).siblings(".baobiaoDate").html()
                            console.log(path)
                            // sessionStorage.setItem("key", "value");
                            sessionStorage.setItem("type", strs[0])
                            sessionStorage.setItem("startTime", strs[1])
                            sessionStorage.setItem("endTime", strs[2])
                            sessionStorage.setItem("baobiaoDate", baobiaoDate)
                            var userid= localStorage.getItem("userid")
                            var username= localStorage.getItem("username")
                            var avatar= localStorage.getItem("avatar")
                            var dataes={
                                "userid":userid,
                                "username":username,
                                "topicid":path,
                                "clear":1
                            }
                            browserHistory.push(`/ecloud/jzjny/mobile/baobiao?maintainid=`+path)
                        })


                    }else if(d.type=="xunjian"){
                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        console.log(decodeURIComponent(baseUrl+d.content));
                        var mes=d.content;
                        var strs= new Array();
                        strs=mes.split(",");
                        var html="";
                        if(username==d.username){
                            html+='<ul class="gonggao_list_cons_ul"  >'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                            html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</dd>'
                            html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                            html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                            html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
                            html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
                            html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                            html+='</dt>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                        }else {
                            html+='<ul class="gonggao_list_cons_ul"  >'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.time+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                            html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</dd>'
                            html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                            html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                            html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
                            html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
                            html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                            html+='</dt>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                        }
                        $(".xuanjianchakan").unbind("click").click(function(){
                            var mes=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                            console.log("-----"+mes);
                            that.openPanel(302,mes);
                        })
                    }





                    //
                    

                })
                 var div = document.getElementById('gonggao_list_content');
                 div.scrollTop = div.scrollHeight;

            }
        });
        //首次进页面 刷5条信息结束

 
        var userid= localStorage.getItem("userid")
        var username= localStorage.getItem("username")
        var path= localStorage.getItem("path")


        //下拉
        function upRefresh() {
            console.log('下拉刷新回调');
            var ips= localStorage.getItem("ips")
            var  baseUrl=ips+'message/getMessage';
            var div = document.getElementById('gonggao_list_content');
            var height=div.scrollHeight ;
            var i = 3;
            //j=j+5;
            console.log(j)
            $.ajax({
                cache: true,
                type: "POST",
                url:baseUrl,
                data:{
                    topicid:path,
                    pagestart:j
                },
                async: false,
                error: function(request) {
                    alert("Connection error2");
                },
                success: function(data) {
                    j=j+5
                    console.log(j)
                    var length=data.data.length
                    console.log(data.data)

                    $.each(data.data,function(c,d){
                        console.log(c)
                        console.log(d)

                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"
                        if(d.type=="text"){
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right">'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left">'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }

                           
                        }else if(d.type=="alarm"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"

                            if(d.alarmstatus==0){
                                d.alarmstatus="未解除"
                            }else {
                                d.alarmstatus="已解除"
                            }

                            var html="";
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统yyyy</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_left">'
                            html+='<div class="gonggao_list_cons_ul_li2_2">'+d.alarmcontent+'</div>'
                            html+='<div class="zhuxiao" id="zhuxiao">'+d.alarmstatus+'</div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                            var text=document.getElementById("zhuxiao").innerHTML;
                            if(text=="已解除"){
                                document.getElementById("zhuxiao").style.display="block"
                            }else {
                                document.getElementById("zhuxiao").style.display="none"
                            }
                        }else if(d.type=="img"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right ">'
                                html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left">'
                                html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".gonggao_img").unbind("click").click(function(){
                                $(".bigimg").find('img').attr('src',this.src);
                                $(".bigimg").show();
                            })
                        }else if(d.type=="maintain"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var status=d.status
                            console.log(status)
                            if(status==0){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }
                                $(".weixiulingqu").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                    that.openPanel(202,maintainid);
                                })
                            }else if(status==1){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
                                    html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
                                    html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }


                                $(".weixiuchakan").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".maintainid").html();
                                    that.openPanel(202,maintainid);
                                })
                            }
                        }else if(d.type=="repair"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var status=d.status
                            console.log(status)
                            if(status==0){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }
                                $(".baoxiuchakan").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                    that.openPanel(102,maintainid);
                                })
                            }else if(status==1){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确定</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 baoxiujindu"  >查看详情</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确定</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 baoxiujindu"  >查看详情</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }


                                $(".baoxiujindu").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                    that.openPanel(102,maintainid);
                                })
                            }
                            // var div = document.getElementById('gonggao_list_content');
                            // div.scrollTop = 0;

                        }else if(d.type=="reportform"){
                           // var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var imgurl="%5Cupload%5Cavatar%5Cpump.jpg";
                            var text="";
                            var strs= new Array(); //定义一数组
                            var cont=new Array(); //定义一数组
                            var num=new Array(); //定义一数组
                            strs= d.content.split(","); //字符分割
                            cont=strs[2].split(" ");
                            num=cont[0].split("-");
                            if(strs[0]=="day"){
                                text=cont[0]+"号日报已生成，请点击查看"
                            }else if(strs[0]=="month"){
                                text=num[0]+num[1]+"月报已生成，请点击查看"
                            }else {
                                text=num[0]+"年报已生成，请点击查看"
                            }
                            var html="";
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_left">'
                            html+='<div class="gonggao_list_cons_ul_li2_2 gonggao_list_cons_ul_li2_ribao" id="gonggao_list_cons_ul_li2_ribao">'+text+'</div>'
                            html+='<div class="zhuxiao" id="zhuxiao">'+strs[0]+'</div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                            $(".gonggao_list_cons_ul_li2_ribao").click(function(){
                                var path= localStorage.getItem("path")
                                console.log(path)
                                localStorage.setItem("type", strs[0])
                                localStorage.setItem("startTime", strs[1])
                                localStorage.setItem("endTime", strs[2])
                                var userid= localStorage.getItem("userid")
                                var username= localStorage.getItem("username")
                                var avatar= localStorage.getItem("avatar")
                                var dataes={
                                    "userid":userid,
                                    "username":username,
                                    "topicid":path,
                                    "clear":1
                                }
                                browserHistory.push(`/ecloud/jzjny/mobile/baobiao?maintainid=`+path)
                            })

                        }else if(d.type=="xunjian"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            console.log(decodeURIComponent(baseUrl+data.mes));
                            var mes=d.content;
                            var strs= new Array();
                            strs=mes.split(",");
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul"  >'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</dd>'
                                html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                                html+='</dt>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul"  >'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</dd>'
                                html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                                html+='</dt>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".xuanjianchakan").unbind("click").click(function(){
                                var mes=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                that.openPanel(302,mes);
                            })
                        }



                        //

                    })


                }
            });
            var div = document.getElementById('gonggao_list_content');
            div.scrollTop =div.scrollHeight-height;
            //div.scrollTop = 0;
        }



        //重新加载
        function Refresh(topicid,pagestart,pagesize) {
            console.log('网络不好，重新加载');
            var ips= localStorage.getItem("ips")
            var  baseUrl=ips+'message/getMessage2';
            var div = document.getElementById('gonggao_list_content');
            var height=div.scrollHeight ;
            var i = 3;
            //j=j+5;
            console.log(j)
            $.ajax({
                cache: true,
                type: "POST",
                contentType : "application/json",  
                dataType : "json",  
                url:baseUrl,
                data:JSON.stringify({ 'topicid':topicid, 'pagestart':pagestart,'pagesize':pagesize }), 
                async: false,
                error: function(request) {
                    alert("Connection error2");
                },
                success: function(data) {
                    j=j+5
                    console.log(j)
                    var length=data.data.length
                    console.log(data.data)

                    $.each(data.data,function(c,d){
                        console.log(c)
                        console.log(d)

                        //var ip= localStorage.getItem("ip")
                        var  baseUrl=ip;
                        var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"
                        if(d.type=="text"){
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right">'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left">'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+d.content+'</div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }

                           
                        }else if(d.type=="alarm"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var imgurl="%5Cupload%5Cavatar%5Cpump.jpg"

                            if(d.alarmstatus==0){
                                d.alarmstatus="未解除"
                            }else {
                                d.alarmstatus="已解除"
                            }

                            var html="";
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统yyyy</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_left">'
                            html+='<div class="gonggao_list_cons_ul_li2_2">'+d.alarmcontent+'</div>'
                            html+='<div class="zhuxiao" id="zhuxiao">'+d.alarmstatus+'</div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                            var text=document.getElementById("zhuxiao").innerHTML;
                            if(text=="已解除"){
                                document.getElementById("zhuxiao").style.display="block"
                            }else {
                                document.getElementById("zhuxiao").style.display="none"
                            }
                        }else if(d.type=="img"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_right ">'
                                html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul">'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                html+='<li class="gonggao_list_cons_ul_li2_left">'
                                html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+d.content)+'" /></div>'
                                html+='</li>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".gonggao_img").unbind("click").click(function(){
                                $(".bigimg").find('img').attr('src',this.src);
                                $(".bigimg").show();
                            })
                        }else if(d.type=="maintain"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var status=d.status
                            console.log(status)
                            if(status==0){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu"  >领取任务</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }
                                $(".weixiulingqu").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                    that.openPanel(202,maintainid);
                                })
                            }else if(status==1){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
                                    html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 weixiuchakan"  >查看进度</div>'
                                    html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }


                                $(".weixiuchakan").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".maintainid").html();
                                    that.openPanel(202,maintainid);
                                })
                            }
                        }else if(d.type=="repair"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var status=d.status
                            console.log(status)
                            if(status==0){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修</span></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.maintainid+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                    var renwu= $("#id"+data.maintainid+"").find(".gonggao_list_cons_ul_li2_11").html();
                                    renwu="任务已领取"
                                }
                                $(".baoxiuchakan").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                    that.openPanel(102,maintainid);
                                })
                            }else if(status==1){
                                var html="";
                                if(username==d.username){
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确定</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 baoxiujindu"  >查看详情</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }else {
                                    html+='<ul class="gonggao_list_cons_ul">'
                                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                    html+='<li class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</li>'
                                    html+='<li class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                    html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确定</span></em></div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_2">'+d.devicename+'的'+decodeURIComponent(d.describes)+'</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_3 baoxiujindu"  >查看详情</div>'
                                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+d.maintainid+'</div>'
                                    html+='</li>'
                                    html+='</ul>'
                                    $(".gonggao_list_cons").prepend(html)
                                }


                                $(".baoxiujindu").unbind("click").click(function(){
                                    var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                    that.openPanel(102,maintainid);
                                })
                            }
                            // var div = document.getElementById('gonggao_list_content');
                            // div.scrollTop = 0;

                        }else if(d.type=="reportform"){
                           // var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            var imgurl="%5Cupload%5Cavatar%5Cpump.jpg";
                            var text="";
                            var strs= new Array(); //定义一数组
                            var cont=new Array(); //定义一数组
                            var num=new Array(); //定义一数组
                            strs= d.content.split(","); //字符分割
                            cont=strs[2].split(" ");
                            num=cont[0].split("-");
                            if(strs[0]=="day"){
                                text=cont[0]+"号日报已生成，请点击查看"
                            }else if(strs[0]=="month"){
                                text=num[0]+num[1]+"月报已生成，请点击查看"
                            }else {
                                text=num[0]+"年报已生成，请点击查看"
                            }
                            var html="";
                            html+='<ul class="gonggao_list_cons_ul">'
                            html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                            html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
                            html+='<li class="gonggao_list_cons_ul_li2_left">'
                            html+='<div class="gonggao_list_cons_ul_li2_2 gonggao_list_cons_ul_li2_ribao" id="gonggao_list_cons_ul_li2_ribao">'+text+'</div>'
                            html+='<div class="zhuxiao" id="zhuxiao">'+strs[0]+'</div>'
                            html+='</li>'
                            html+='</ul>'
                            $(".gonggao_list_cons").prepend(html)
                            $(".gonggao_list_cons_ul_li2_ribao").click(function(){
                                var path= localStorage.getItem("path")
                                console.log(path)
                                localStorage.setItem("type", strs[0])
                                localStorage.setItem("startTime", strs[1])
                                localStorage.setItem("endTime", strs[2])
                                var userid= localStorage.getItem("userid")
                                var username= localStorage.getItem("username")
                                var avatar= localStorage.getItem("avatar")
                                var dataes={
                                    "userid":userid,
                                    "username":username,
                                    "topicid":path,
                                    "clear":1
                                }
                                browserHistory.push(`/ecloud/jzjny/mobile/baobiao?maintainid=`+path)
                            })

                        }else if(d.type=="xunjian"){
                            //var ip= localStorage.getItem("ip")
                            var  baseUrl=ip;
                            console.log(decodeURIComponent(baseUrl+data.mes));
                            var mes=d.content;
                            var strs= new Array();
                            strs=mes.split(",");
                            var html="";
                            if(username==d.username){
                                html+='<ul class="gonggao_list_cons_ul"  >'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+d.username+'</dd>'
                                html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                                html+='</dt>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }else {
                                html+='<ul class="gonggao_list_cons_ul"  >'
                                html+='<li class="gonggao_list_cons_ul_li1"><span>'+d.createtime+'</span></li>'
                                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+d.avatar)+'" /></li>'
                                html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+d.username+'</dd>'
                                html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                                html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                                html+='<div class="gonggao_list_cons_ul_li2_2">'+strs[1]+'的巡检提交完成</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+d.content+'</div>'
                                html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                                html+='</dt>'
                                html+='</ul>'
                                $(".gonggao_list_cons").prepend(html)
                            }
                            $(".xuanjianchakan").unbind("click").click(function(){
                                var mes=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                                that.openPanel(302,mes);
                            })
                        }



                        //

                    })


                }
            });
            var div = document.getElementById('gonggao_list_content');
            div.scrollTop =div.scrollHeight;
            
        }
        
            
       $('.bigimg').unbind('click').click(function(event) { 
           $('.bigimg').hide();
       })



          
       //上拉    
      $('.gonggao_list_content').bind('mousewheel', function(event) { 
            var div = document.getElementById('gonggao_list_content');
            //div.scrollTop = div.scrollHeight;
            //console.log(event.originalEvent.deltaY);
            if(event.originalEvent.deltaY<0 && div.scrollTop<100){
                  $(".load").show();
                  upRefresh();
                  $(".load").hide();
            }
             
       });

        console.log(path)
        var userid= localStorage.getItem("userid")
        var titles= localStorage.getItem("titles")
        var topicprefix= localStorage.getItem("topicprefix")
        var paths=topicprefix+path
        var endTime1  = new Date().getTime();
            var clientId =paths+"-"+userid+"-"+endTime1;
            //var clientId =paths+"-"+userid;
           // var host = 'http://118.190.44.91:61614'
           // var host = 'http://192.168.30.122:61614'
            var host= localStorage.getItem("host")
            var options = {
                keepalive: 10,
                clientId: clientId,
                protocolId: 'MQTT',
                protocolVersion: 4,
                clean: true,
                reconnectPeriod: 1000,
                connectTimeout: 5 * 1000,
                will: {
                    topic: 'WillMsg',
                    payload: 'Connection Closed abnormally..!',
                    qos: 2,
                    retain: false
                },
                username: 'demo',
                password: 'demo',
                rejectUnauthorized: false
            }

        //聊天--发送消息
        //
        var client = mqtt.connect(host, options)
        that.setState({clientuser:client});
        $(document).keyup(function(event){
            if(event.keyCode ==13){
                //alert("key");
                var path= localStorage.getItem("path")
                var titles= localStorage.getItem("titles")
                console.log(path)
                var mydate = new Date();
                var myyear = mydate.getFullYear();
                var mymonth = mydate.getMonth() + 1;
                var myday = mydate.getDate();
                var myhour = mydate.getHours();
                var myminute = mydate.getMinutes();
                var time=myyear+"-"+mymonth+"-"+myday+""+" "+myhour+"："+myminute
                var sc_value= $(".gonggao_list_sc_input").val();
                var userid= localStorage.getItem("userid")
                var username= localStorage.getItem("username")
                var avatar= localStorage.getItem("avatar")
                var datas={
                    "time":time,
                    "mes":sc_value,
                    "userid":userid,
                    "username":username,
                    "topic":paths,
                    "type":"text",
                    "avatar":avatar
                }
                var  dataTostring=JSON.stringify(datas)
                //上传文件
                if(sc_value !==""){
                     
                    var titles= localStorage.getItem("titles")
                    console.log(path)
                    //var paths=titles+"c"+path
                    //alert(1);
                    client.publish(paths, dataTostring, {qos:2})
                }else {
                    alert("发送内容不能为空")
                }
            }
        });
        
        client.on('error', function (err) {
            console.log(err)
            if(err=="Error: Connection refused: Identifier rejected"){
                alert("用户多地登录或者网络错误")
            }
            client.end()
        })
        var flag=0;
        client.on('connect', function () {
            console.log('--client connected:' + clientId+"------flag:"+flag+"-----j:"+j)
            //alert(1);
            if(flag!==0){
                $(".gonggao_list_cons").empty();
                Refresh(path,0,j);
                $(".load").hide();
            }
            flag++;
            
        })
        var path= localStorage.getItem("path")
        var titles= localStorage.getItem("titles")
        console.log(path)
        client.subscribe(paths, { qos: 2 })
        //client.subscribe({'c1': 1, 'c2': 1}, { qos: 1 })
        //接收消息
        client.on('message', function (paths, message, packet) {
            j=j+1
            var datas=message.toString()
            var data=JSON.parse(datas)
            console.log(datas)

            if(data.type=="text"){
                //var ip= localStorage.getItem("ip")
                var  baseUrl=ip;
                var html="";
                if(username==data.username){
                    html+='<ul class="gonggao_list_cons_ul">'
                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                    html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                    html+='<dt class="gonggao_list_cons_ul_li2_right">'
                    html+='<div class="gonggao_list_cons_ul_li2_2">'+data.mes+'</div>'
                    html+='</dt>'
                    html+='</ul>'

                    $(".gonggao_list_cons").append(html)
                }else{
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_left">'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.mes+'</div>'
                        html+='</dt>'
                        html+='</ul>'

                        $(".gonggao_list_cons").append(html)
                }
                var div = document.getElementById('gonggao_list_content');
                div.scrollTop = div.scrollHeight;
                console.log("3")
            }else if(data.type=="alarm"){
                //var ip= localStorage.getItem("ip")
                var  baseUrl=ip;
                if(data.alarmstatus==0){
                    data.alarmstatus="未解除"
                }else {
                    data.alarmstatus="已解除"
                }
                var html="";
                html+='<ul class="gonggao_list_cons_ul">'
                html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.pumpname+'</dd>'
                html+='<dt class="gonggao_list_cons_ul_li2_left">'
                html+='<div class="gonggao_list_cons_ul_li2_2">'+data.mes+'</div>'
                html+='<div class="zhuxiao" id="zhuxiao">'+data.alarmstatus+'</div>'
                html+='</dt>'
                html+='</ul>'

                $(".gonggao_list_cons").append(html)
                var text=document.getElementById("zhuxiao").innerHTML;
                if(text=="已解除"){
                    document.getElementById("zhuxiao").style.display="block"
                }else {
                    document.getElementById("zhuxiao").style.display="none"
                }

            }else if(data.type=="img"){
                //var ip= localStorage.getItem("ip")
                var  baseUrl=ip;
                console.log(decodeURIComponent(baseUrl+data.mes))
                var html="";
                if(username==data.username){
                    html+='<ul class="gonggao_list_cons_ul">'
                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                    html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                    html+='<dt class="gonggao_list_cons_ul_li2_right">'
                    html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+data.mes)+'" /></div>'
                    html+='</dt>'
                    html+='</ul>'

                    $(".gonggao_list_cons").append(html)
                }else{
                    html+='<ul class="gonggao_list_cons_ul">'
                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                    html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                    html+='<dt class="gonggao_list_cons_ul_li2_left">'
                    html+='<div class="gonggao_list_cons_ul_li2_2"><img class="gonggao_img" src="'+decodeURIComponent(baseUrl+data.mes)+'" /></div>'
                    html+='</dt>'
                    html+='</ul>'

                    $(".gonggao_list_cons").append(html)

                }



                var div = document.getElementById('gonggao_list_content');
                div.scrollTop = div.scrollHeight;
                $(".gonggao_img").unbind("click").click(function(){
                    $(".bigimg").find('img').attr('src',this.src);
                    $(".bigimg").show();

                })

            }else if(data.type=="maintain"){
                //var ip= localStorage.getItem("ip")
                var  baseUrl=ip;
                console.log(decodeURIComponent(baseUrl+data.mes));
                var status=data.status
                console.log(status)
                if(status==0){
                    var html="";
                    if(username==data.username){
                        html+='<ul class="gonggao_list_cons_ul" id="id'+data.maintainid+'" >'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修任务</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+data.maintainid+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu" id="wx'+data.maintainid+'" >领取任务</div>'
                        html+='</dt>'
                        html+='</ul>'
                        $(".gonggao_list_cons").append(html)
                    }else {
                        html+='<ul class="gonggao_list_cons_ul" id="id'+data.maintainid+'" >'
                        htgonggao_list_cons_ul_li2_3ml+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">维修任务</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+data.maintainid+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_4 weixiulingqu" id="wx'+data.maintainid+'" >领取任务</div>'
                        html+='</dt>'
                        html+='</ul>'
                        $(".gonggao_list_cons").append(html)
                    }

                    alert(data.maintainid)
                    $(".weixiulingqu").unbind("click").click(function(){

                        var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                        that.openPanel(202,maintainid);
                    })
                }else if(status==1){

                    var html="";
                    if(username==data.username){
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_3 weixiujindu"  >查看进度</div>'
                        html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+data.maintainid+'</div>'
                        html+='</dt>'
                        html+='</ul>'
                        console.log(data)

                        var renwu= $("#id"+data.id+"").find(".maintainid").html();
                        renwu="任务已领取"
                        $(".gonggao_list_cons").append(html)
                    }else {
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span>维修任务已领取</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_3 weixiujindu"  >查看进度</div>'
                        html+='<div class="maintainid " style="font-size: 1px;color: #fff"  >'+data.maintainid+'</div>'
                        html+='</dt>'
                        html+='</ul>'
                        console.log(data.id)

                       var renwu= $("#id"+data.id+"").find(".maintainid").html();
                        renwu="任务已领取"
                        $(".gonggao_list_cons").append(html)
                    }
                    alert(data.maintainid)
                    $("#wx"+data.maintainid).html("已完成")
                    $(".weixiujindu").unbind("click").click(function(){
                        var maintainid=$(this).siblings(".maintainid").html();
                        that.openPanel(202,maintainid);
                    })

                }

                var div = document.getElementById('gonggao_list_content');
                div.scrollTop = div.scrollHeight;
            }else if(data.type=="repair"){
                //var ip= localStorage.getItem("ip")
                var  baseUrl=ip;
                console.log(decodeURIComponent(baseUrl+data.mes));
                var status=data.status
                console.log(status)
                if(status==0){
                    var html="";
                    if(username==data.username){
                        html+='<ul class="gonggao_list_cons_ul" id="id'+data.maintainid+'" >'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">报修</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+data.repairid+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                        html+='</dt>'
                        html+='</ul>'
                        $(".gonggao_list_cons").append(html)
                    }else {
                        html+='<ul class="gonggao_list_cons_ul" id="id'+data.maintainid+'" >'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">报修</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+data.repairid+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_4 baoxiuchakan"  >报修确认</div>'
                        html+='</dt>'
                        html+='</ul>'
                        $(".gonggao_list_cons").append(html)
                    }


                    $(".baoxiuchakan").unbind("click").click(function(){
                        var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                        that.openPanel(102,maintainid);
                    })
                }else if(status==1){

                    var html="";
                    if(username==data.username){
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确认</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_3 baoxiujindu"  >查看进度</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+data.maintainid+'</div>'
                        html+='</dt>'
                        html+='</ul>'


                        var renwu= $("#id"+data.id+"").find(".gonggao_list_cons_ul_li2_11").html();
                        renwu="任务已领取"
                        $(".gonggao_list_cons").append(html)
                    }else {
                        html+='<ul class="gonggao_list_cons_ul">'
                        html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                        html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                        html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                        html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                        html+='<div class="gonggao_list_cons_ul_li2_1"><span>报修已确认</span></div>'
                        html+='<div class="gonggao_list_cons_ul_li2_2">'+data.devicename+'的'+decodeURIComponent(data.describes)+'</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_3 baoxiujindu"  >查看进度</div>'
                        html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none" >'+data.maintainid+'</div>'
                        html+='</dt>'
                        html+='</ul>'
                        //console.log(data.id)

                        var renwu= $("#id"+data.id+"").find(".gonggao_list_cons_ul_li2_11").html();
                        renwu="任务已领取"
                        $(".gonggao_list_cons").append(html)
                    }
                    $(".baoxiujindu").unbind("click").click(function(){
                        var maintainid=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                        that.openPanel(102,maintainid);
                    })
                }

                var div = document.getElementById('gonggao_list_content');
                div.scrollTop = div.scrollHeight;
            }else if(data.type=="reportform"){

                //var ip= localStorage.getItem("ip")
                var  baseUrl=ip;
                var imgurl="%5Cupload%5Cavatar%5Cpump.jpg";
                var text="";
                var strs= new Array(); //定义一数组
                var cont=new Array(); //定义一数组
                var num=new Array(); //定义一数组
                strs= data.mes.split(","); //字符分割
                console.log(strs)
                cont=strs[2].split(" ");
                num=cont[0].split("-");
                if(strs[0]=="day"){
                    text=cont[0]+"号日报已生成，请点击查看"
                }else if(strs[0]=="month"){
                    text=num[0]+num[1]+"月报已生成，请点击查看"
                }else {
                    text=num[0]+"年报已生成，请点击查看"
                }
                var html="";
                html+='<ul class="gonggao_list_cons_ul">'
                html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+imgurl)+'" /></li>'
                html+='<li class="gonggao_list_cons_ul_li1_1_left">运维系统</li>'
                html+='<li class="gonggao_list_cons_ul_li2_left">'
                html+='<div class="gonggao_list_cons_ul_li2_2 gonggao_list_cons_ul_li2_ribao" id="gonggao_list_cons_ul_li2_ribao">'+text+'</div>'
                html+='<div class="zhuxiao" id="zhuxiao">'+strs[0]+'</div>'
                html+='</li>'
                html+='</ul>'
                $(".gonggao_list_cons").append(html)
                var div = document.getElementById('gonggao_list_content');
                div.scrollTop = div.scrollHeight;
                $(".gonggao_list_cons_ul_li2_ribao").click(function(){
                    var path= localStorage.getItem("path")
                    console.log(path)
                    localStorage.setItem("type", strs[0])
                    localStorage.setItem("startTime", strs[1])
                    localStorage.setItem("endTime", strs[2])
                    localStorage.setItem("baobiaoDate", cont[0])
                    var userid= localStorage.getItem("userid")
                    var username= localStorage.getItem("username")
                    var avatar= localStorage.getItem("avatar")
                    var dataes={
                        "userid":userid,
                        "username":username,
                        "topicid":path,
                        "clear":1
                    }
                    browserHistory.push(`/ecloud/jzjny/mobile/baobiao?maintainid=`+path)
                })
            }else if(data.type=="xunjian"){
                //var ip= localStorage.getItem("ip")
                //alert(11);
                var  baseUrl=ip;
                console.log(decodeURIComponent(baseUrl+data.mes));
                var html="";
                if(username==data.username){
                    html+='<ul class="gonggao_list_cons_ul"  >'
                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                    html+='<li class="gonggao_list_cons_ul_li1_0_right"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                    html+='<dd class="gonggao_list_cons_ul_li1_1_right">'+data.username+'</dd>'
                    html+='<dt class="gonggao_list_cons_ul_li2_right gonggao_list_cons_ul_li2_rw">'
                    html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                    html+='<div class="gonggao_list_cons_ul_li2_2">'+data.time+'的巡检提交完成</div>'
                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+data.mes+'</div>'
                    html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                    html+='</dt>'
                    html+='</ul>'
                    $(".gonggao_list_cons").append(html)
                }else {
                    html+='<ul class="gonggao_list_cons_ul"  >'
                    html+='<li class="gonggao_list_cons_ul_li1"><span>'+data.time+'</span></li>'
                    html+='<li class="gonggao_list_cons_ul_li1_0_left"><img class="touxiang_img" src="'+decodeURIComponent(baseUrl+data.avatar)+'" /></li>'
                    html+='<dd class="gonggao_list_cons_ul_li1_1_left">'+data.username+'</dd>'
                    html+='<dt class="gonggao_list_cons_ul_li2_left gonggao_list_cons_ul_li2_rw">'
                    html+='<div class="gonggao_list_cons_ul_li2_1"><span class="gonggao_list_cons_ul_li2_11">巡检</span></div>'
                    html+='<div class="gonggao_list_cons_ul_li2_2">'+data.time+'的巡检提交完成</div>'
                    html+='<div class="gonggao_list_cons_ul_li2_31" style="color: #fff;font-size: 10px;display: none">'+data.mes+'</div>'
                    html+='<div class="gonggao_list_cons_ul_li2_4 xuanjianchakan"  >查看详情</div>'
                    html+='</dt>'
                    html+='</ul>'
                    $(".gonggao_list_cons").append(html)
                }
                $(".xuanjianchakan").unbind("click").click(function(){
                    var mes=$(this).siblings(".gonggao_list_cons_ul_li2_31").html();
                    that.openPanel(302,mes);
                })
                 
            }

            if(message.toString() !=""){
                document.getElementById("gonggao_list_sc_input").value="";

            }
            var content = document.getElementById('gonggao_list_content');
            content.scrollTop = content.scrollHeight;

        })

        client.on('close', function () {
            $(".load").show();
            console.log(clientId + ' disconnected,网络不好！')
        })

        



    }

}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
};
export default connect(state => state.xiaoxi, mapDispatchToProps)(Message);

