/**
 * @file MMonitor
 * @author luwenlong
 */

import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import classNames from 'classnames'
import jquery from '../constants/jquery.js'
import moment from 'moment'
import Loading from '../components/Loading'
//import rem from '../constants/rem.js'
//import Sidebar from 'react-sidebar';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import  '../styles/panel102.styl'
import * as actions from '../actions.js'
class Mweixiuxq extends Component {
    static contextTypes = {
        allData: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            maintainid: this.props.maintainid,
            number:1

        }
    };

    render() {
        let weixiuxq=this.props.weixiuxq;
        //alert(weixiuxq);
        console.log(weixiuxq);
        
        var userid= localStorage.getItem("userid")
        const {fetchweixiuxq,maintainid} = this.props;
        var ip= localStorage.getItem("ip")
        var  baseUrl=ip;
        return (
            <div className="home baoxiuxq">
                <div className="whxq_head">
                    <div className="whxq_title">维修详情</div>
                    <div className="panel-exit">
                        <span onClick={this.props.closeFun.bind(this,1)}></span>
                    </div>
                </div>
                <div className="whxq_content">
                {fetchweixiuxq == 'start' && <Loading />}
                {fetchweixiuxq == 'done' &&
                    <div className="whxq_list">
                                <div className="whxq_list_div">
                                    <ul className="whxq_list_ul">
                                       <li className="whxq_list_ul_li1" id="whxq_list_ul_li1">{weixiuxq.devicename}</li>
                                    </ul>
                                    <ul className="whxq_list_ul">
                                        <li className="whxq_list_ul_li4" ><span>维修时间：</span><em>{weixiuxq.createtime}</em> </li>
                                        <li className="whxq_list_ul_li2" id="whxq_list_ul_li2" >{weixiuxq.level=="1"?"一般" :"紧急"}</li>
                                        <li className="whxq_list_ul_li3">{weixiuxq.status=="0"?"未确认" :"已确认"}</li>
                                    </ul>
                                    <div className="whxq_list_cont">
                                        <div className="whxq_list_bdh  whxq_list_cont_div"><span>维修编号：</span><em>{weixiuxq.formid}</em></div>
                                        <div className="whxq_list_wtms whxq_list_cont_div"><span>问题描述：</span><em>{weixiuxq.describes}</em></div>
                                        <div className="whxq_list_bxr whxq_list_cont_div"><span>提交人：</span><em>{weixiuxq.creatname}</em></div>
                                        <div className="whxq_list_lxfs whxq_list_cont_div" ><span>联系方式：</span><em>{weixiuxq.telephone}</em></div>
                                    </div>
                                    <div className="whxq_list_img">
                                        {weixiuxq.imglist.map((item,j)=> {
                                            return(
                                                    <img className="whxq_list_imgg" key={j} src={baseUrl+item.filepath} alt="" />
                                            )
                                            })}
                                    </div>
                                </div>
                                 
                                
                    </div>
                }
                    {fetchweixiuxq == 'done' && weixiuxq.status=="0" &&<div className="wxlqrw" onClick={this.show_Tankuang.bind(this)}  >领取任务</div>}
                    {fetchweixiuxq == 'done' && weixiuxq.status=="1" && weixiuxq.receiveuserid==userid &&<div className="wxlqrw" onClick={this.show_Tankuang.bind(this)}  >完成任务</div>}
                    
                    }
                    <div className="load"><img  src={require('../img/load.gif')} alt="" /></div>
                </div>
                <div className="Tuichu">
                    <div className="tuichutk">
                        <div className="tccont">
                            确定领取任务
                        </div>
                        <div className="caozuo">
                            <div className="tcqueren">确认</div>
                            <div className="tcquxiao" onClick={this.click_Tankuang.bind(this)}>取消</div>
                        </div>
                    </div>
                </div>

            </div>

        )



    }


    click_Tankuang(){
        $(".Tuichu").hide()
    }
    show_Tankuang(){
        $(".Tuichu").show()
    }

    brower_gonggao(){
        var path= window.location.href.split('=').pop()

        browserHistory.push(`/ecloud/jzjny/mobile/gonggaolist?maintainid=`+path)
    }

    componentWillMount(){
        // const {getweixiuxiangqing} = this.props;
        // var parmes={"path":localStorage.getItem("maintainid")}
        // getweixiuxiangqing(parmes);


    }
    componentWillReceiveProps(nextProps)
{
    //    if(this.props.maintainid!=nextProps.maintainid){
    //    const {getweixiuxiangqing} = nextProps;
    //    var parmes={"path":nextProps.maintainid}
    //    this.state.maintainid=nextProps.maintainid;
    //        console.log(parmes)
    //    getweixiuxiangqing(parmes);
    //}

   // alert(this.state.number+"00000000")
    if (this.state.number == 1) {
        const {getweixiuxiangqing} = nextProps;
        var parmes = {"path": nextProps.maintainid}
        this.state.maintainid = nextProps.maintainid;
        console.log(parmes)
        getweixiuxiangqing(parmes);
        this.setState({number:2})
       // alert(this.state.number+"111111111111111")
    }
    //alert(this.state.number+"2222222222222")
}
componentDidUpdate(nextProps){
    //if(this.props.maintainid!=nextProps.maintainid){
    //    const {getweixiuxiangqing} = nextProps;
    //    var parmes={"path":nextProps.maintainid}
    //    this.state.maintainid=nextProps.maintainid;
    //    console.log(parmes)
    //    getweixiuxiangqing(parmes);
    //}
}
    componentDidMount(){

    var that=this;
    $(".whxq_list_img .whxq_list_imgg").click(function(){

        var index=$(this).index()
        console.log(index)

        $(".whxq_list_img_big li").eq(index).css({"z-index":"10"}).fadeIn().siblings().css({"z-index":"-1"}).fadeOut()
        $(".whxq_list_img_big").css({"z-index":"10"})

    })

        $(".whxq_list_img_big ").click(function(){
            $(".whxq_list_img_big").css({"z-index":"-1"})
        })


        $(".tcqueren").unbind("click").click(function(){
            //var gly= localStorage.getItem("gly")
            //if(gly=="1"){
                $(".load").show();
                //var path= window.location.href.split('=').pop()
                var maintainid = that.state.maintainid
                //var pair = vars[0].split("=")[1];
                //console.log(path)
                var userid= localStorage.getItem("userid")
                var username= localStorage.getItem("username")
                //var username= localStorage.getItem("username")
                var ips= localStorage.getItem("ips")
                var  baseUrl=ips+'maintain/receiveMaintain ';
                $.ajax({
                    cache: true,
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    url:baseUrl,
                    dataType: "json",
                    data:JSON.stringify({
                        id:maintainid,
                        receiveuserid:userid,
                        receiveusername:username
                    }),
                    async: false,
                    error: function(request) {
                        $(".load").hide();
                        alert("Connection error");
                        console.log(request)
                    },
                    success: function(data) {
                        $(".load").hide();
                       // alert(data.data.message)
                        $(".panel-exit").children("span").click();
                       // browserHistory.push(`/ecloud/jzjny/mobile/gonggaolist?maintainid=`+path)

                    }
                })
            // }else {
            //     alert("只有群管路员才有资格确认维修")
            //     $(".Tuichu").hide()
            // }


        })


    }

}

function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
};
export default connect(state => state.xiaoxi, mapDispatchToProps)(Mweixiuxq);

