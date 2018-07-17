/**
 * @file 通用的toast提示
 * @author luwenlong
 */

import './ripple'
import './tapEvent'
import './dialog'

const loadinggif = require('../img/loadingtoast.gif')

export function loadingToast() {
    var notice = $(document).dialog({
        overlayShow: true,
        type : 'notice',
        infoIcon: loadinggif,
        infoText: '正在加载中',
        position: 'center'
    })

    return notice;
}

export function noticeToast(msg) {
    $(document).dialog({
        overlayShow: true,
        type : 'notice',
        infoText: msg,
        position: 'center',
        autoClose: 2000,
    })
}
