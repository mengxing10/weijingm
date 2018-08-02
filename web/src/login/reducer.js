/**
 * @file loginReducer
 * @author zlc <lichao9182@126.com>
 */

import Cookies from 'universal-cookie'
import cookie from 'cookie'
import {
    UPLOGINSTATUS,
    REQUESTLOGINMSGCODE,
    RECEIVELOGINMSGCODE,
    SENDLOGININFO,
    RECEIVELOGININFO,
} from './constants/actionTypes'

//TODO:Improve the login info
const cookies = new Cookies();

const initialState = {
    isLogin:false
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case UPLOGINSTATUS:

            return Object.assign(
                {},
                state,
                {
                  isLogin: action.data.data?action.data.data:false
                }
            )

        case RECEIVELOGININFO:
        {

            if(action.data.data){

                cookies.set("isLogin",1)


                console.log("sssss");
                console.log(cookies);
                console.log(cookies.getAll());
              }

            else {
                cookies.remove("isLogin")
            }

            return Object.assign(
                {},
                state,
                {
                    isLogin: action.data.data?action.data.data:false
                }

            )
          }
        default:
            return state
    }
}
