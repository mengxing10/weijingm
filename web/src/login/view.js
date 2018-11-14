/**
 * @file MMonitor
 * @author luwenlong
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import {Button, Input, Icon, Divider, Checkbox} from 'semantic-ui-react'
import {Link, browserHistory} from 'react-router'
import moment from 'moment'
import './styles/index.styl'
import Cookies from 'universal-cookie'
import $ from 'jquery'
const cookies = new Cookies();

export default class Login extends Component {
    static contextTypes = {
        //allData: PropTypes.object.isRequired
    }
    constructor(props,context) {
        super(props,context)
        this.state = {
        }
    }

    render() {
        return (
          <div className="denglu_one">
            <div className="denglu_one_head">
                <i className="dengluone"></i>
                <div className="denglu_one_head_title">智能化管理监测平台</div>
            </div>
            <div className="denglu_one_cont">
              <from>
                <div className="zhanghao">
                    <span className="zhanghao_title">账号</span>
                    <input className="zhanghao_inout" type="text" ref="username" />
                </div>
                <div className="mima">
                    <span className="mima_title">密码</span>
                    <input  className="mima_inout" type="password" ref="password" />
                </div>
                <Checkbox label='记住密码' className="aaa" style={{height:"0.7rem",fontSize:"0.6rem",marginLeft:"1rem"}} onClick={this.click.bind(this)} />
                <div className="mima_submit" onClick={this.brower_denglunext.bind(this)}>
                  <span>登录</span>
                </div>
              </from>
            </div>
            <div className="denglu_foot">浙江瀚普智慧科技有限公司</div>
          </div>
        )
    }

    componentDidMount(){
        let username=this.refs.username.value=localStorage.getItem("username");
        let password=this.refs.password.value=localStorage.getItem("password");
        if(password!=null&&password!=''){
            $(".aaa").click()
        }
    }
    componentDidUpdate(){
        // var username=this.refs.username.value;
        // var password=this.refs.password.value;
        // const {fetchdenglu}=this.context.allData.Mdenglu;
        // if(fetchdenglu=="done"){
        //     var mdenglu=this.context.allData.Mdenglu.denglu;
        //     if(mdenglu){
        //         localStorage.setItem("username", username);
        //         sessionStorage.setItem("denglu", "true");
        //         let guangfu = [];
        //         mdenglu.projectList.map((item)=>{
        //           if(item.cloud=='guangfu') guangfu.push(JSON.parse(JSON.stringify(item)))
        //         })
        //         sessionStorage.setItem("projectList", JSON.stringify(guangfu))
        //         browserHistory.push(`/yili/enter/mobile/denglunext`)
        //     }else if(mdenglu==false){
        //         alert("用户名或密码错误，请重新输入")
        //     }
        // }
    }

    brower_denglunext(){
        var username=this.refs.username.value;
        var password=this.refs.password.value;
        // const {getMdenglu}=this.context.allData;
        //var params={"username":username,"password":password}
        //getMdenglu(params);

        // browserHistory.push(`/mobile/denglunext`)
        // localStorage.setItem("username", username)
        // sessionStorage.setItem("denglu", "true");
        if(username=='admin'&&password=='ganwei'){
            var exp = new Date();
            exp.setTime(exp.getTime() + 10*60*1000);
            cookies.set("isLogin",true,exp.getTime());
            browserHistory.push(`/weijingm/home`)
        }else{
            alert("用户名或密码错误，请重新输入")
        }

    }
    click(){
        if($(".aaa").hasClass("checked")){
            localStorage.clear();
        }else{
            var username=this.refs.username.value;
            var password=this.refs.password.value;
            localStorage.setItem("password", password)
            localStorage.setItem("username", username)
        }
    }
}
