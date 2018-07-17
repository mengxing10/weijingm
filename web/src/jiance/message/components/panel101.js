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
import ss from '../constants/photo.js'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import  '../styles/panel101.styl'
import * as actions from '../actions.js'

class Mbaoxiu extends Component {
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
        let weihushebei=this.props.weihushebei
        const {fetchweuhushebei} = this.props;
        const {typeid,operation} = this.props
        //console.log(weihushebei)
        var path= localStorage.getItem("path")
        var titles= localStorage.getItem("titles")
        var topicprefix= localStorage.getItem("topicprefix")
        var paths=topicprefix+path
        //console.log(path)
        return (
            <div className="home baoxiu">
                <div className="wh_cekuang">
                        <div className="wh_ck_head">
                            <div className="wh_ck_title">报修</div>
                            <div className="panel-exit">
                                <span onClick={this.props.closeFun.bind(this,1)}></span>
                            </div>
                        </div>
                        <div className="wh_ck_bzcont">
                            <form id="yourformid"   encType="multipart/form-data" method="post">
                                <div className="wh_ck_bzcont1">
                                    <input type="hidden" name="topic"  value={paths} />
                                    <input type="hidden" name="userid"  value={userid} />
                                    <input type="hidden" name="username"  value={username} />
                                    <input type="hidden" name="time"  value={time} />
                                    <span>报修设备</span>
                                    {fetchweuhushebei == 'start' && <Loading />}
                                    {fetchweuhushebei == 'done' && <select name="deviceid">
                                        {weihushebei.data.map((item,j)=> {
                                            return(
                                        <option value={item.id} key={j}>{item.name}</option>
                                    )
                                    })}
                                    </select>}

                                </div>
                                <div className="wh_ck_bzcont2">
                                    <span>紧急程度</span>
                                    <div className="jinji">
                                        <div className="field field1">
                                            <div className="ui radio checkbox">
                                                <input type="radio" name="level"  value="1" />
                                                <label>一般</label>
                                            </div>
                                        </div>
                                        <div className="field field2">
                                            <div className="ui radio checkbox">
                                                <input type="radio" name="level" value="2"  />
                                                <label>紧急</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wh_ck_bzcont3">
                                    <span>报修人</span>
                                    <div className="bxr_con">
                                        <input type="text"  placeholder="报修人" name="creatname"  />
                                    </div>
                                </div>
                                <div className="wh_ck_bzcont4">
                                    <span>联系方式</span>
                                    <div className="lxfs_con">
                                    <input type="text"  placeholder="173******" name="telephone"  />
                                    </div>
                                </div>
                                <div className="wh_ck_bzcont5">
                                    <span>问题描述</span>
                                    <div className="wtms_con">
                                        <textarea rows="4" cols="50" name="describe" placeholder="水泵底部震动过大，有异响。">
                                            
                                        </textarea>
                                    </div>
                                </div>
                                <ul className="paizhao">
                                    <li className="telphoto">
                                        <input id="file" name="zhaopian1" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian2" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian3" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian4" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian5" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian6" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian7" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian8" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian9" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian10" type="file" accept="image/*;"  />
                                        <input id="file" name="zhaopian11" type="file" accept="image/*;"  />

                                        <img className="photoBar" src={require('../img/xj.png')} alt="" />
                                    </li>
                                </ul>
                            </form>
                    </div>
                    <div className="wh_foot">
                        <div className="wh_foot_lf" onClick={this.clickclose_quxiao.bind(this)}>取消</div>
                        <div className="wh_foot_rg" >报修</div>
                    </div>
                    <div className="load"><img  src={require('../img/load.gif')} alt="" /></div>
                </div>
                 
            </div>

        )



    }





    componentWillMount(){
        const {getShebeiList} = this.props;
        var topicid= localStorage.getItem("path")
        var parmes={"topicid":topicid}
            getShebeiList(parmes);


    }


    componentDidMount(){
        var i=0
        $('input[type="file"]').change(function(e){
            i++
            if(i>10){
                alert("一次最多上传11张照片")
            }
           $(this).hide()

            var file = this.files[0];
            console.log(this.files)
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                //监听文件读取结束后事件
                reader.onloadend = function (e) {
                    console.log(e)
                    console.log(e.target.result)
                    var res=e.target.result
                    var ahtml = "";
                    ahtml += '<li><img class="zhaopian"   src=' + res + ' alt="照片未加载"  /></li>'
                    $(".paizhao").append(ahtml)

                };
            }
        })

        //侧框泵站
        var that=this
        $(".bzcont li").click(function(){
            var beng=$(this).children("span").html()
            console.log(beng)
            that.setState({bengtitle:beng});
            that.setState({sidebarOpen:false});

        })

        $(".paizhao li").click(function(){

            var index =$(this).index()
            console.log(index)

        })

        //提交
        $(".wh_foot_rg").unbind("click").click(function(){
            $(".load").show()
            var ips= localStorage.getItem("ips")
            var  baseUrl=ips+'upload/RepairUpload';
            var form1 = new FormData(document.getElementById("yourformid"));
            $.ajax({
                type: "POST",
                url:baseUrl,
                data:form1,// 你的formid
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                error: function(data) {
                    $(".load").hide()
                    console.log(data)
                    alert("Connection error");
                },
                success: function(data) {
                    var jieguo=data.data.success;
                    if(jieguo=="1"){
                        $(".load").hide()
                        alert("报修提交成功")
                        $(".panel-exit").children("span").click();
                    }

                }
            })

        })

    }

}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
};
export default connect(state => state.xiaoxi, mapDispatchToProps)(Mbaoxiu);

