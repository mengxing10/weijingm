/**
 * @file 登录页view
 * @author qiaolifeng <qiao.l.f@outlook.com>
 */

import React, {Component, PropTypes} from 'react'
import {Form, Button, Input,Checkbox} from 'semantic-ui-react'
import {browserHistory} from 'react-router'
import classNames from 'classnames'
import Cookies from 'universal-cookie'
import $ from './constants/jquery.js'

const cookies = new Cookies();




import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './actions.js'
import './styles/index.styl'



class Login extends Component {

    static contextTypes = {
        allData: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context)
        let user = cookies.get("user")=='undefined'?'':cookies.get("user")

        let password = cookies.get("password")=='undefined'?'':cookies.get("password")


        this.state={
          "user":user,
          "password":password

        }
    }

    render() {


   const { loginResult} = this.props

 //defaultChecked={this.state.user?true:false}


     const theHeight = {height: document.documentElement.clientHeight + 'px' }

        return (
          <div className="login"  style={theHeight}>
            {/*<div className="header"></div>*/}

            
            <div className="login-page">
              <div className="login-form">

                <h2>包钢智慧泵站云平台</h2>
                <Input ref="username" className="login-name" type="text"   value={this.state.user}  onChange={this.userchange.bind(this)} placeholder="请输入账号" />
                <Input ref="password" className="login-pw" type="password"  value={this.state.password}   onChange={this.pwchange.bind(this)}  placeholder="请输入密码"/>
                <div className = "message" >
                <Checkbox  className = "pwdlabel" label ="&nbsp;&nbsp;&nbsp;&nbsp;记住密码"  defaultChecked={this.state.user!=''?true:false}  onChange={this.savechange.bind(this)} />
                </div>
                <Button className="login-button"  onClick={this.submit.bind(this)} >登陆</Button>

              </div>

            </div>
            <div className="ff">
                <h1>浙江瀚普智慧科技有限公司</h1>
                <p>当前在线人数：2  人 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  累计访问： 23  次 </p>
            </div>
          </div>
        )
    }

    userchange(ev){
      this.setState({"user":ev.target.value})

    }

    pwchange(ev){
      this.setState({"password":ev.target.value})

    }

    savechange(ev,data){



      if(data.checked){

        cookies.set("user",this.state.user)
        cookies.set("password",this.state.password)



      }
      else{
        cookies.remove("user")
        cookies.remove("password")

      }

    }


    checkResult(res,t){

        //alert("test");



           var ds= res;  //{"status":0,"errorCode":-2,"errorMessage":"用户不存在"}
             //{"status":0,"errorCode":-3,"errorMessage":"密码错误"}
             //if (window.history.length)
             if(ds.status==1)
             {
                //browserHistory.goBack()

                 var exp = new Date();
                exp.setTime(exp.getTime() + 10*60*1000);
                cookies.set("isLogin",true,exp.getTime());
                cookies.set("userid",ds.data.userid,exp.getTime());
/*

                var userid=ds.data.userid;
                var username=ds.data.username;
                var avatar=ds.data.avatar;
                var isadmin=ds.data.isadmin
                localStorage.setItem("titles", "SY");
                localStorage.setItem("topicprefix", "SYc");
                localStorage.setItem("username", username);
                //localStorage.setItem("password", password)
                localStorage.setItem("userid", userid);
                localStorage.setItem("isadmin", isadmin);
                localStorage.setItem("avatar", avatar);
                //云接口
                localStorage.setItem("host", "http://118.190.88.23:61614");
                localStorage.setItem("ip", "http://118.190.88.23:8086");
                localStorage.setItem("ips", "http://118.190.88.23:8086/SanYaBoYue.portal/");

                // localStorage.setItem("host", "http://192.168.30.142:61614");
                // localStorage.setItem("ip", "http://192.168.30.142:8080");
                // localStorage.setItem("ips", "http://192.168.30.142:8080/SanYaBoYue.portal/");


                localStorage.setItem("bengzhan", "bengzhan");
                localStorage.setItem("path", "1");

 */



                browserHistory.push('/bgp/pc/gailan'); //  nengxiao
            }
            // HACK手工敲url直接进入登录页面的情况
            else {
                alert(ds.errorMessage);
                if(ds.errorCode==-2)
                 t.setState({"user":''})
                else  if(ds.errorCode==-3)
                 t.setState({"password":''})


             //  var dsds=  t.refs.password;

             // t.refs.password.getDOMNode().focus();
              // React.findDOMNode(t.refs.password).focus();

                //window.location.href = '/yayd/pc/login'
            }






    }
    submit(ev) {




       // const {user, password}=this.state;
        const {getLoginInfo}=this.props;



        // var user = "admin"; //this.refs.username.value;
        // var password = "sd";//this.refs.password.value;

        getLoginInfo({"username":this.state.user,"password":this.state.password},this.checkResult,this);
        //const isLogin = cookies.get("isLogin")?true:false

        // var isLogin = false;
        // if(user=="admin"  && password == "admin")
        //     isLogin = true;

        // if (isLogin)
        // {

        //     if (window.history.length) {
        //         //browserHistory.goBack()
        //         browserHistory.push('/yayd/pc/home')
        //     }
        //     // HACK手工敲url直接进入登录页面的情况
        //     else {
        //         window.location.href = '/yayd/pc/login'
        //     }
        // }
       //else
           // alert("用户或密码错误");



    }

    componentWillReceiveProps(nextProps, nextState)
  {
        const isLogin = cookies.get("isLogin")?true:false
        if (isLogin)
    {

            if (window.history.length) {
                //browserHistory.goBack()
                browserHistory.push('/bgp/pc/nengxiao')
            }
            // HACK手工敲url直接进入登录页面的情况
            else {
                window.location.href = '/bgp/pc/login'
            }
        }
      }
}


function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };
export default connect(state => state.login, mapDispatchToProps)(Login);
