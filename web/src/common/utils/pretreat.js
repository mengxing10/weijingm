/**
 * @file 通用请求预处理
 * @author zlc <lichao9182@126.com>
 */

import axios from 'axios'
import cookie from 'cookie'
import {OS, BROWSER} from './platform'

const cookies = cookie.parse(document.cookie);

const global = {}

axios.interceptors.request.use(
    config => {

        //if (config.headers && config.headers.host) {
            //delete config.headers.host;
        //}

        config.data = {...global, ...config.data};

        //console.log(`%c async request config: %o`, 'font-size: 14px; color: #5ab33b;', config);

        config.timeout = 10000;

        return config;

    },
    error => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    response => {

        //console.log(`%c async response: %o`, 'font-size: 14px; color: #fc6e51;', response.data);

        //response.data.headers = response.headers;

        return response.data;

    },
    error => {
        return Promise.reject(error)
    }
)

export default global
