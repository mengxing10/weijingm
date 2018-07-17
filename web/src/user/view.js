/**
 * @file 用户界面
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {Link, browserHistory} from 'react-router'
import classNames from 'classnames'
import {RiseModal, WaveModal, DropModal,Toast} from 'boron'
import Setpasswd from './components/SetPasswd'
import Setusername from './components/SetUsername'
import Setmail from './components/SetMail'
import SetDianjia from './components/SetDianjia'
import Setphone from './components/SetPhone'
import * as actions from './actions.js'
import './styles/index.styl'

 class MyUser extends Component {
    // static contextTypes = {
    //     allData: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
    }

    render() {
      const {userdetail} = this.props
      const BodyStyle={height: document.documentElement.clientHeight  +'px'}

        return (
            <div className='user' style={BodyStyle}>

                <div className="u-wrap">
                    <h3>用户信息</h3>
                    <div className="u-info">
                        <ul>
                            <li>
                                <span>用户名: </span>
                                <em>{userdetail.data.username}</em>
                                {/* <strong onClick={this.modify_name.bind(this, 1)}>修改</strong> */}
                            </li>
                            <li>
                                <span>密码: </span>
                                <em>******</em>
                                <strong onClick={this.modify_passwd.bind(this, 1)}>修改</strong>
                            </li>
                            <li>
                                <span>邮箱: </span>
                                <em>{userdetail.data.email}</em>
                                <strong onClick={this.modify_mail.bind(this, 1)}>修改</strong>
                            </li>
                            <li>
                                <span>手机: </span>
                                <em>{userdetail.data.mobile}</em>
                                <strong onClick={this.modify_phone.bind(this, 1)}>修改</strong>
                            </li>
                        </ul>
                    </div>

                    <DropModal ref='setpasswd'
                        closeOnClick={true}
                        className='globalModal'
                        backdropStyle={{background: 'rgba(0, 0, 0, .61)'}}
                    >
                        <Setpasswd exitcb_passwd={::this.exitcb_passwd} oldpwd={userdetail.data.password}></Setpasswd>
                    </DropModal>
                    <DropModal ref='setname'
                        closeOnClick={true}
                        className='globalModal'
                        backdropStyle={{background: 'rgba(0, 0, 0, .61)'}}
                    >
                        <Setusername exitcb_name={::this.exitcb_name} oldname={userdetail.data.username}></Setusername>
                    </DropModal>
                    <DropModal ref='setmail'
                    closeOnClick={true}
                    className='globalModal'
                    backdropStyle={{background: 'rgba(0, 0, 0, .61)'}}
                    >
                    <Setmail exitcb_mail={::this.exitcb_mail} oldmail={userdetail.data.email}></Setmail>
                    </DropModal>
                    <DropModal ref='setphone'
                    closeOnClick={true}
                    className='globalModal'
                    backdropStyle={{background: 'rgba(0, 0, 0, .61)'}}
                    >
                    <Setphone exitcb_phone={::this.exitcb_phone} oldphone={userdetail.data.mobile}></Setphone>
                    </DropModal>


                </div>
            </div>
        )
    }


    //修改用户名弹框显隐
    modify_name(edit) {
        const me = this;

        if (!edit) {
            return false
        }

        me.refs.setname && me.refs.setname.show()
    }

    modify_passwd(edit) {
        const me = this;

        if (!edit) {
            return false
        }

        me.refs.setpasswd && me.refs.setpasswd.show()
    }
    modify_mail(edit) {
        const me = this;

        if (!edit) {
            return false
        }

        me.refs.setmail && me.refs.setmail.show()
    }
    modify_phone(edit) {
        const me = this;

        if (!edit) {
            return false
        }

        me.refs.setphone && me.refs.setphone.show()
    }


    exitcb_name(mod) {

        console.log('----mod: ', mod);
        this.refs.setname.hide();
        const {setname} = this.props
        // TODO ajax 保存密码
        if (mod) {
            var params=mod
            setname(params)
        }
    }



    exitcb_passwd(mod) {
        console.log('----mod: ', mod);
        this.refs.setpasswd.hide();
        const {setpasswd} = this.props
        // TODO ajax 保存密码
        if (mod) {
            var params=mod
            setpasswd(params)
        }
    }

    exitcb_mail(mod) {
        console.log('----mod: ', mod);
        this.refs.setmail.hide();
        const {setmail} = this.props
        // TODO ajax 保存密码
        if (mod) {
            var params=mod
            setmail(params)
        }
    }
    exitcb_phone(mod) {
        console.log('----mod: ', mod);
        this.refs.setphone.hide();
        const {setphone} = this.props
        // TODO ajax 保存密码
        if (mod) {
            var params=mod
            setphone(params)
        }
    }

    componentWillMount() {
      let id=1;
      let params ={id:id}
      const{getUserDetail} = this.props
      getUserDetail(params)
    }





};

function mapDispatchToProps (dispatch) {
        return bindActionCreators(actions, dispatch);
    };

export default connect(state => state.user, mapDispatchToProps)(MyUser);
