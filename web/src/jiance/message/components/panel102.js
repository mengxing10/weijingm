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
class Mbaoxiuxq extends Component {
    static contextTypes = {
        allData: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            maintainid: 0
           

        }
    };

    render() {
        let baoxiuxq=this.props.baoxiuxq;
        //alert(baoxiuxq);
        //console.log(baoxiuxq);
        
        const {fetchbaoxiuxq,maintainid} = this.props;
        var ip= localStorage.getItem("ip")
        var  baseUrl=ip;
        console.log(baoxiuxq)
        return (
            <div className="home baoxiuxq">
                <div className="whxq_head">
                    <div className="whxq_title">报修详情</div>
                    <div className="panel-exit">
                        <span onClick={this.props.closeFun.bind(this,1)}></span>
                    </div>
                </div>
                <div className="whxq_content">
                {fetchbaoxiuxq == 'start' && <Loading />}
                {fetchbaoxiuxq == 'done' &&
                    <div className="whxq_list">
                                <div className="whxq_list_div">
                                  <ul className="whxq_list_ul">
                                    <li className="whxq_list_ul_li1" id="whxq_list_ul_li1">{baoxiuxq.devicename}</li>
                                  </ul>
                                    <ul className="whxq_list_ul">
                                        <li className="whxq_list_ul_li4" ><span>报修时间：</span><em>{baoxiuxq.createtime}</em> </li>
                                        <li className="whxq_list_ul_li2" id="whxq_list_ul_li2" >{baoxiuxq.level=="1"?"一般" :"紧急"}</li>
                                        <li className="whxq_list_ul_li3">{baoxiuxq.status=="0"?"未确认" :"已确认"}</li>
                                    </ul>
                                    <div className="whxq_list_cont">
                                        <div className="whxq_list_bdh  whxq_list_cont_div"><span>报修编号：</span><em>{baoxiuxq.formid}</em></div>
                                        <div className="whxq_list_wtms whxq_list_cont_div"><span>问题描述：</span><em>{baoxiuxq.describes}</em></div>
                                        <div className="whxq_list_bxr whxq_list_cont_div"><span>报修人：</span><em>{baoxiuxq.creatname}</em></div>
                                        <div className="whxq_list_lxfs whxq_list_cont_div" ><span>联系方式：</span><em>{baoxiuxq.telephone}</em></div>
                                    </div>
                                    <div className="whxq_list_img">
                                        {baoxiuxq.imglist.map((item,j)=> {
                                            return(
                                                    <img className="whxq_list_imgg" key={j} src={baseUrl+item.filepath} alt="" />
                                            )
                                            })}
                                    </div>
                                </div>
                                
                    </div>}

                    {fetchbaoxiuxq == 'done' && baoxiuxq.status=="0" &&<div className="wxlqrw" onClick={this.show_Tankuang.bind(this)}  >确认</div>}

                    <div className="load"><img  src={require('../img/load.gif')} alt="" /></div>
                </div>
                <div className="Tuichu">
                    <div className="tuichutk">
                        <div className="tccont">
                            是否确认任务
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
        // const {getbaoxiuxiangqing} = this.props;
        // var parmes={"path":localStorage.getItem("maintainid")}
        // getbaoxiuxiangqing(parmes);


    }
    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps");
        if(this.props.maintainid!=nextProps.maintainid){
        const {getbaoxiuxiangqing} = nextProps;
        var parmes={"path":nextProps.maintainid}
        this.state.maintainid=nextProps.maintainid;
        getbaoxiuxiangqing(parmes);


        const {clearMessageNumber} = this.props;
         var topicid= localStorage.getItem("path")
         var userid= localStorage.getItem("userid")
         var parmes={"topicid":topicid,"userid":userid}
            clearMessageNumber(parmes);
    }
    }

    componentDidMount(){


    $(".whxq_list_img .whxq_list_imgg").click(function(){

        var index=$(this).index()
        console.log(index)

        $(".whxq_list_img_big li").eq(index).css({"z-index":"10"}).fadeIn().siblings().css({"z-index":"-1"}).fadeOut()
        $(".whxq_list_img_big").css({"z-index":"10"})

    })

        $(".whxq_list_img_big ").click(function(){
            $(".whxq_list_img_big").css({"z-index":"-1"})
        })

        var that=this;
        $(".tcqueren").unbind("click").click(function(){
            //var gly= localStorage.getItem("gly")
            //if(gly=="1"){
                $(".load").show();
                var maintainid = that.state.maintainid

                var userid= localStorage.getItem("userid")
                var ips= localStorage.getItem("ips")
                var  baseUrl=ips+'repair/confirmRepair ';
                $.ajax({
                    cache: true,
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    url:baseUrl,
                    dataType: "json",
                    data:JSON.stringify({
                        id:maintainid,
                        confirmuserid:userid

                    }),
                    async: false,
                    error: function(request) {
                        $(".load").hide();
                        alert("Connection error");
                        console.log(request)
                    },
                    success: function(data) {
                        $(".load").hide();
                        $(".panel-exit").children("span").click();
                       // browserHistory.push(`/ecloud/jzjny/mobile/gonggaolist?maintainid=`+path)

                    }
                })
            // }else {
            //     alert("只有群管路员才有资格确认报修")
            //     $(".Tuichu").hide()
            // }


        })


    }

}

function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
};
export default connect(state => state.xiaoxi, mapDispatchToProps)(Mbaoxiuxq);

