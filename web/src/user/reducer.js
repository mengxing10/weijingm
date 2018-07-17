/**
 * @file 用户页面
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */


 import {
     REQUESTSETMAIL,
     RECEIVESETMAIL,
     REQUESTSETNAME,
     RECEIVESETNAME,
     REQUESTSETPASSWD,
     RECEIVESETPASSWD,
     REQUESTSETPHONE,
     RECEIVESETPHONE,
     REQUESTUSERDETAIL,
     RECEIVEUSERDETAIL,
 } from './constants/actionTypes'

const initialState = {
                      userdetail:{
                                  "status": 1,
                                  "data": {
                                    //"userInfo": {
                                      "id": 1,
                                      "username": "admin",
                                      "email": "17@163.com",
                                      "password": "21232F297A5A0E4A801FC3",
                                      "department": "",
                                      "post": "",
                                      "mobile": "17387",
                                      "telephone": "",
                                      "is_del": 0,
                                      "created_at": 1492679783000,
                                      "updated_at": 1495592624000,
                                      "permission": null,
                                    //},
                                    "userEntities": [
                                      {
                                        "id": 1,
                                        "user_id": 1,
                                        "entity_code": "1"
                                      },
                                      {
                                        "id": 2,
                                        "user_id": 1,
                                        "entity_code": "2"
                                      },
                                      {
                                        "id": 3,
                                        "user_id": 1,
                                        "entity_code": "3"
                                      },
                                      {
                                        "id": 4,
                                        "user_id": 1,
                                        "entity_code": "4"
                                      }
                                    ]
                                  }
                                },

                    }

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case REQUESTUSERDETAIL:
      {
          return Object.assign({}, state, {fetchuserdetail: 'start'});
        }

      case RECEIVEUSERDETAIL:
      {
          return Object.assign(
              {},
              state,
              {
                ...action.data,
                fetchuserdetail:  action.data.errmsg?'start':'done'
              }
          )
        }
      case REQUESTSETPHONE:
          return Object.assign({}, state, {fetchphone: 'start'});
      case RECEIVESETPHONE:
          return Object.assign(
              {},
              state,
              {

                  ...action.data,

              fetchphone: 'done'
            }
          )
      case REQUESTSETPASSWD:
          return Object.assign({}, state, {fetchpasswd: 'start'});
      case RECEIVESETPASSWD:
          return Object.assign(
              {},
              state,
              {

                  ...action.data,

              fetchpasswd: 'done'
              }
            )
      case REQUESTSETNAME:
          return Object.assign({}, state, {fetchname: 'start'});
      case RECEIVESETNAME:
          return Object.assign(
              {},
              state,
              {

                  ...action.data,

              fetchname: 'done'
            }
          )
        case REQUESTSETMAIL:
            return Object.assign({}, state, {fetchmail: 'start'});
        case RECEIVESETMAIL:
            return Object.assign(
                {},
                state,
                {

                    ...action.data,

                fetchmail: 'done'
              }
            )

        default:
            return state
}
}
