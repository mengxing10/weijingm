/**
 * @file 日期级联选择
 * @author luwenlong
 * @param birthday 传递已有或者默认选择的生日
 * @param min 可选取范围的最小值
 * @param max 可选取范围的最大值
 * @param callback 选择确认后的回调函数
 *
 * TODO
 * 1. 支持birthday传空 自动根据min max计算birthday
 * 2. 改进级联更新时整体定位到第一个位置
 */

import classNames from 'classnames';
import {OS} from './platform'

function Datepicker(options) {}

Datepicker.prototype.show = function (options) {
    if (!options) {
        console.log('options is required')
    }
    document.body.style.overflow = 'hidden';
    this.init(options);
}

Datepicker.prototype.hide = function () {
    document.body.style.overflow = '';
    $('.cas-masker').remove();
    $('.caswrap').remove();
}

// 注意需要在传递的时候传递默认日期 用于取初始的active高亮显示
Datepicker.prototype.init = function (options) {
    //birthday: '1951-06-15', // 传递当前要标示的出生日期
    //min: '1936-07-23', // 可选范围的最小值
    //max: '1966-08-28', // 可选范围的最大值
    // 选中的日期 最小的日期 最大的日期 三者的数组
    try {
        if (new Date(options.birthday).getTime() < new Date(options.min).getTime()) {
            options.birthday = (+(options.min.substr(0, 4)) + 30) + '-06-15';
        }

        if (new Date(options.birthday).getTime() > new Date(options.max).getTime()) {
            options.birthday = (+(options.min.substr(0, 4)) + 30) + '-06-15';
        }
    }
    catch (e) {
        console.log('捕获到初始化日期处理错误');
    }

    var defarr = options.birthday.split('-').map(v => +v);
    var minarr = options.min.split('-').map(v => +v);
    var maxarr = options.max.split('-').map(v => +v);

    var yearlist = range(minarr[0], maxarr[0], 1);
    var monthlist = this.generatorMonthList(options.birthday, options.min, options.max, true);
    var daylist = this.generatorDayList(options.birthday, options.min, options.max, true);

    var opts = {
        birthday: options.birthday,
        min: options.min,
        max: options.max,
        defarr: defarr,
        minarr: minarr,
        maxarr: maxarr,
        yeardata: {
            uuid: 'year',
            lists: yearlist,
            active: yearlist.indexOf(defarr[0]) == -1 ? 0 : yearlist.indexOf(defarr[0]),
            name: defarr[0],
        },
        monthdata: {
            uuid: 'month',
            lists: monthlist,
            active: monthlist.indexOf(defarr[1]) == -1 ? 0 : monthlist.indexOf(defarr[1]),
            name: defarr[1],
        },
        daydata: {
            uuid: 'day',
            lists: daylist,
            active: daylist.indexOf(defarr[2]) == -1 ? 0 : daylist.indexOf(defarr[2]),
            name: defarr[2],
        },
        layer: 3,
        callback: options.callback
    }

    this.options = Object.assign({}, opts);

    // 渲染生成页面
    this.render();

    // 绑定事件
    this.bindYearEvents();
    this.bindMonthEvents();
    this.bindDayEvents();
}

// TODO 待优化改写点 !!!
Datepicker.prototype.bindYearEvents = function () {
    const me = this
    const itemHeight = document.querySelector('.casitem').offsetHeight

    let startY = 0
    let startR = 0

    let lastMoveStart = 0
    let lastMoveTime = 0
    let stopInertiaMove = false

    let wrap = document.querySelector('.caswrap .year')

    wrap.addEventListener('touchstart', event => {
        event.preventDefault()
        startY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        var transform = wrap.style.WebkitTransform || wrap.style.transform;
        startR = parseFloat(transform.substr(17))
        updateInertiaParams(event, true)
    }, false)

    wrap.addEventListener('touchend', event => {
        event.preventDefault();
        //startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchcancel', event => {
        event.preventDefault();
        //startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchmove', event => {
        event.preventDefault()
        updateInertiaParams(event)

        let endY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        let endRange = endY - startY + startR

        setTranslate(endRange)

        event.stopPropagation();
        event.stopImmediatePropagation();
    }, false);

    // 关闭
    $('body').on('click', '.cas-header i', function () {
        me.hide();
    })

    // 选择 确认
    $('.datepickerbtn').click(function () {
        var year = me.options.yeardata.name;
        var month = me.options.monthdata.name;
        var day = me.options.daydata.name;

        me.options.callback(`${year}-${pad(month, 2)}-${pad(day, 2)}`);
        setTimeout(me.hide, 10);
    })

    $('body').on('touchstart', '.caswrap .year li', function () {

        if ($(this).hasClass('active')) {
            return false
        }

        let index = $(this).index()
        let endRange = -Math.abs(index * itemHeight)

        setTranslate(endRange)
    });

    function setTranslate(endRange) {
        // 即时 向上(-)滑动超过最大值: 取最大; 向下(+)滑动超过最大值: 取0
        let MAX_EXCEED = (me.options.yeardata.lists.length - 1) * itemHeight * -1

        if (Math.abs(endRange) > Math.abs(MAX_EXCEED)) {
            endRange = endRange > 0 ? 0 : MAX_EXCEED
        }
        else if (endRange > 0) {
            endRange = 0
        }

        let sub = endRange % itemHeight;

        if (sub < itemHeight / 2) {
            endRange = endRange - sub;
        }
        else {
            endRange = endRange + itemHeight - sub;
        }

        // 矫正距离为行高整数倍
        endRange = correctRange(endRange)

        let index = Math.abs(endRange / itemHeight)

        wrap.style.WebkitTransform = 'translate3d(0px, ' + endRange + 'px, 0px)';
        wrap.style.transform = 'translate3d(0px, ' + endRange + 'px, 0px)';

        me.highlight(wrap, index);

        var type = me.options.yeardata.uuid;
        var selectYear = me.options.yeardata.lists[index];

        // 点击更新列表数据 这个type判断 以后扩展使用
        if (type == 'year') {
            let curm = pad(me.options.monthdata.name, 2);
            let curd = pad(me.options.daydata.name, 2);
            let cur = `${selectYear}-${curm}-${curd}`

            me.options.yeardata = Object.assign({}, me.options.yeardata, {
                name: selectYear,
                active: me.options.yeardata.lists.indexOf(selectYear)
            })

            // 根据年份选择 获取新的monthlist
            var monthlist = me.generatorMonthList(cur, me.options.min, me.options.max);

            // 若缓存的monthdata.lists 与 monthlist 的length相等且第一个元素相等 则认为相同 不需要更新
            // 否则更新me.options.monthdata
            if (!(+me.options.monthdata.lists.length === +monthlist.length
               && +me.options.monthdata.lists[0] === +monthlist[0]
            )) {
                let sindex = monthlist.indexOf(me.options.monthdata.name)

                // 查找如果当前值在新的list之内 继续定位到该位置
                me.options.monthdata = {
                    uuid: 'month',
                    lists: monthlist,
                    active: sindex == -1 ? 0 : sindex,
                    name: sindex == -1 ? monthlist[0] : monthlist[sindex]
                    //active: 0,
                    //name: monthlist[0]
                }

                me.bindMonthEvents(true)
            }

            // 再次依据前面确定的year和month 决定是否更新date 是否更新的判断逻辑同月份
            let ncur = `${selectYear}-${me.options.monthdata.name}-${curd}`;
            let daylist = me.generatorDayList(ncur, me.options.min, me.options.max);

            if (!(+me.options.daydata.lists.length === +daylist.length
               && +me.options.daydata.lists[0] === +daylist[0]
            )) {
                let sindex = daylist.indexOf(me.options.daydata.name)

                me.options.daydata = {
                    uuid: 'day',
                    lists: daylist,
                    active: sindex == -1 ? 0 : sindex,
                    name: sindex == -1 ? daylist[0] : daylist[sindex]
                    //active: 0,
                    //name: daylist[0]
                }

                me.bindDayEvents(true)
            }
        }
    }

    function correctRange(endRange) {
        if ((endRange % itemHeight) / itemHeight > .6) {
            endRange = Math.ceil(endRange / itemHeight) * itemHeight
        }
        else {
            endRange = Math.floor(endRange / itemHeight) * itemHeight
        }

        return endRange
    }

    function startInertiaScroll(event) {
        let MAX_EXCEED = (options.lists.length - 1) * itemHeight * -1
        let currentR = parseFloat(wrap.style.WebkitTransform.substr(17))

        if (currentR == 0 || currentR == MAX_EXCEED) {
            return false
        }

        /**
         * 缓动
         */
        let point = event.changedTouches ? event.changedTouches[0] : event
        let nowTime = event.timeStamp || Date.now()
        // 最后一段时间手指划动速度
        let v = (point.pageY - lastMoveStart) / (nowTime - lastMoveTime)
        // 加速度方向
        let dir = v > 0 ? -1 : 1
        // 减速度
        let deceleration = dir * 0.0003 * -1
        // 速度消减至0所需时间
        let duration = Math.abs(v / deceleration)
        //最终移动距离
        let dist = v * duration / 20

        setTranslate(currentR + dist, true)
    }

    function updateInertiaParams(event, isStart) {
        let point = event.changedTouches ? event.changedTouches[0] : event

        if (isStart) {
            lastMoveStart = point.pageY
            lastMoveTime = event.timeStamp || Date.now()
        }
        else {
            let nowTime = event.timeStamp || Date.now()
            if (nowTime - lastMoveTime > 300) {
                lastMoveTime = nowTime
                lastMoveStart = point.pageY
            }
        }

        //stopInertiaMove = true;
    }
}

Datepicker.prototype.bindMonthEvents = function (update) {
    const me = this
    const itemHeight = document.querySelector('.casitem').offsetHeight
    // 更新
    if (update) {
        let trans3d = me.options.monthdata.active * itemHeight * -1;

        // TODO 优化点 在此处 尽量利用已有html 不要直接重新生成
        $('.month').html(this.repaint(me.options.monthdata.lists));
        document.querySelector('.month').style.WebkitTransform = 'translate3d(0px, ' + trans3d + 'px, 0px)';
        document.querySelector('.month').style.transform = 'translate3d(0px, ' + trans3d + 'px, 0px)';
        me.highlight(document.querySelector('.month'), me.options.monthdata.active)
    }

    let startY = 0
    let startR = 0

    let lastMoveStart = 0
    let lastMoveTime = 0
    let stopInertiaMove = false

    let wrap = document.querySelector(`.caswrap .month`)

    wrap.addEventListener('touchstart', event => {
        event.preventDefault();
        startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
        var transform = wrap.style.WebkitTransform || wrap.style.transform;
        startR = parseFloat(transform.substr(17));
        updateInertiaParams(event, true);
    }, false)

    wrap.addEventListener('touchend', event => {
        event.preventDefault()
        //startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchcancel', event => {
        event.preventDefault()
        //startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchmove', event => {
        event.preventDefault()
        updateInertiaParams(event)

        let endY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        let endRange = endY - startY + startR

        setTranslate(endRange)
    }, false)

    $('body').on('touchstart', '.caswrap .month li', function () {
        if ($(this).hasClass('active')) {
            return false;
        }

        let index = $(this).index();
        let endRange = -Math.abs(index * itemHeight);

        setTranslate(endRange);
    });

    function setTranslate(endRange) {
        // 向上(-)滑动超过最大值: 取最大; 向下(+)滑动超过最大值: 取0
        let MAX_EXCEED = (me.options.monthdata.lists.length - 1) * itemHeight * -1

        if (Math.abs(endRange) > Math.abs(MAX_EXCEED)) {
            endRange = endRange > 0 ? 0 : MAX_EXCEED
        }
        else if (endRange > 0) {
            endRange = 0;
        }

        let sub = endRange % itemHeight;

        if (sub < itemHeight / 2) {
            endRange = endRange - sub;
        }
        else {
            endRange = endRange + itemHeight - sub;
        }

        // 矫正距离为行高整数倍
        endRange = correctRange(endRange)

        let index = Math.abs(endRange / itemHeight)

        wrap.style.WebkitTransform = 'translate3d(0px, ' + endRange + 'px, 0px)';
        wrap.style.transform = 'translate3d(0px, ' + endRange + 'px, 0px)';

        me.highlight(wrap, index);

        var type = me.options.monthdata.uuid;
        var selectMonth = me.options.monthdata.lists[index];

        // 点击更新列表数据 这个type判断 以后扩展使用
        if (type == 'month') {
            let cury = me.options.yeardata.name;
            let curd = pad(me.options.daydata.name, 2);
            let cur = `${cury}-${selectMonth}-${curd}`

            // 更新monthdata
            me.options.monthdata = Object.assign({}, me.options.monthdata, {
                name: selectMonth,
                active: me.options.monthdata.lists.indexOf(selectMonth)
            })

            // 依据前面确定的year和month 决定是否更新date 是否更新的判断逻辑同月份
            let daylist = me.generatorDayList(cur, me.options.min, me.options.max);

            if (!(+me.options.daydata.lists.length === +daylist.length
               && +me.options.daydata.lists[0] === +daylist[0]
            )) {
                let sindex = daylist.indexOf(me.options.daydata.name)

                me.options.daydata = {
                    uuid: 'day',
                    lists: daylist,
                    active: sindex == -1 ? 0 : sindex,
                    name: sindex == -1 ? daylist[0] : daylist[sindex],
                    //active: 0,
                    //name: daylist[0]
                }

                me.bindDayEvents(true)
            }
        }
    }

    function correctRange(endRange) {
        if ((endRange % itemHeight) / itemHeight > .6) {
            endRange = Math.ceil(endRange / itemHeight) * itemHeight
        }
        else {
            endRange = Math.floor(endRange / itemHeight) * itemHeight
        }

        return endRange
    }

    function startInertiaScroll(event) {
        let MAX_EXCEED = (options.lists.length - 1) * itemHeight * -1
        let currentR = parseFloat(wrap.style.WebkitTransform.substr(17))

        if (currentR == 0 || currentR == MAX_EXCEED) {
            return false
        }

        /**
         * 缓动
         */
        let point = event.changedTouches ? event.changedTouches[0] : event
        let nowTime = event.timeStamp || Date.now()
        // 最后一段时间手指划动速度
        let v = (point.pageY - lastMoveStart) / (nowTime - lastMoveTime)
        // 加速度方向
        let dir = v > 0 ? -1 : 1
        // 减速度
        let deceleration = dir * 0.0003 * -1
        // 速度消减至0所需时间
        let duration = Math.abs(v / deceleration)
        //最终移动距离
        let dist = v * duration / 20

        setTranslate(currentR + dist, true)
    }

    function updateInertiaParams(event, isStart) {
        let point = event.changedTouches ? event.changedTouches[0] : event

        if (isStart) {
            lastMoveStart = point.pageY
            lastMoveTime = event.timeStamp || Date.now()
        }
        else {
            let nowTime = event.timeStamp || Date.now()
            if (nowTime - lastMoveTime > 300) {
                lastMoveTime = nowTime
                lastMoveStart = point.pageY
            }
        }

        //stopInertiaMove = true;
    }
}

Datepicker.prototype.bindDayEvents = function (update) {
    const me = this
    const itemHeight = document.querySelector('.casitem').offsetHeight
    // 更新
    if (update) {
        let trans3d = me.options.daydata.active * itemHeight * -1;

        $('.day').html(this.repaint(me.options.daydata.lists));
        document.querySelector('.day').style.WebkitTransform = 'translate3d(0px, ' + trans3d + 'px, 0px)';
        document.querySelector('.day').style.transform = 'translate3d(0px, ' + trans3d + 'px, 0px)';
        me.highlight(document.querySelector('.day'), me.options.daydata.active)
    }

    let startY = 0
    let startR = 0

    let lastMoveStart = 0
    let lastMoveTime = 0
    let stopInertiaMove = false

    let wrap = document.querySelector('.caswrap .day')

    wrap.addEventListener('touchstart', event => {
        event.preventDefault()
        startY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        var transform = wrap.style.WebkitTransform || wrap.style.transform;
        startR = parseFloat(transform.substr(17))
        updateInertiaParams(event, true)
    }, false)

    wrap.addEventListener('touchend', event => {
        event.preventDefault()
        //startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchcancel', event => {
        event.preventDefault()
        //startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchmove', event => {
        event.preventDefault()
        updateInertiaParams(event)

        let endY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        let endRange = endY - startY + startR

        setTranslate(endRange)
    }, false)

    $('body').on('touchstart', '.caswrap .day li', function () {
        if ($(this).hasClass('active')) {
            return false
        }

        let index = $(this).index()
        let endRange = -Math.abs(index * itemHeight)

        setTranslate(endRange)
    });

    function setTranslate(endRange) {
        // 向上(-)滑动超过最大值: 取最大; 向下(+)滑动超过最大值: 取0
        let MAX_EXCEED = (me.options.daydata.lists.length - 1) * itemHeight * -1

        if (Math.abs(endRange) > Math.abs(MAX_EXCEED)) {
            endRange = endRange > 0 ? 0 : MAX_EXCEED
        }
        else if (endRange > 0) {
            endRange = 0
        }

        let sub = endRange % itemHeight;

        if (sub < itemHeight / 2) {
            endRange = endRange - sub;
        }
        else {
            endRange = endRange + itemHeight - sub;
        }

        // 矫正距离为行高整数倍
        endRange = correctRange(endRange)

        let index = Math.abs(endRange / itemHeight)

        wrap.style.WebkitTransform = 'translate3d(0px, ' + endRange + 'px, 0px)';
        wrap.style.transform = 'translate3d(0px, ' + endRange + 'px, 0px)';

        me.highlight(wrap, index);

        var type = me.options.daydata.uuid;
        var selectDay = me.options.daydata.lists[index];

        me.options.daydata = Object.assign({}, me.options.daydata, {
            name: selectDay,
            active: me.options.daydata.lists.indexOf(selectDay)
        })
    }

    function correctRange(endRange) {
        if ((endRange % itemHeight) / itemHeight > .6) {
            endRange = Math.ceil(endRange / itemHeight) * itemHeight
        }
        else {
            endRange = Math.floor(endRange / itemHeight) * itemHeight
        }

        return endRange
    }

    // 废弃
    function startInertiaScroll(event) {
        let MAX_EXCEED = (options.lists.length - 1) * itemHeight * -1
        let currentR = parseFloat(wrap.style.WebkitTransform.substr(17))

        if (currentR == 0 || currentR == MAX_EXCEED) {
            return false
        }

        /**
         * 缓动
         */
        let point = event.changedTouches ? event.changedTouches[0] : event
        let nowTime = event.timeStamp || Date.now()
        // 最后一段时间手指划动速度
        let v = (point.pageY - lastMoveStart) / (nowTime - lastMoveTime)
        // 加速度方向
        let dir = v > 0 ? -1 : 1
        // 减速度
        let deceleration = dir * 0.0003 * -1
        // 速度消减至0所需时间
        let duration = Math.abs(v / deceleration)
        //最终移动距离
        let dist = v * duration / 20

        setTranslate(currentR + dist, true)
    }

    // 废弃
    function updateInertiaParams(event, isStart) {
        let point = event.changedTouches ? event.changedTouches[0] : event

        if (isStart) {
            lastMoveStart = point.pageY
            lastMoveTime = event.timeStamp || Date.now()
        }
        else {
            let nowTime = event.timeStamp || Date.now()
            if (nowTime - lastMoveTime > 300) {
                lastMoveTime = nowTime
                lastMoveStart = point.pageY
            }
        }

        //stopInertiaMove = true;
    }
}

// 重绘列表内容
Datepicker.prototype.repaint = function(data) {
    var html = '';
    for (var i = 0, len = data.length; i < len; i++) {
        html += '<li class="casitem">' + data[i] + '</li>'
    }

    return html;
}

Datepicker.prototype.render = function () {
    let width = 1 / this.options.layer * 100 + '%';
    const rootSize = +$('html').css('fontSize').replace('px', '');
    let itemHeight = parseInt(this.itemHeight || (98 / 46.875 * rootSize), 10);

    if (OS.ios && document.documentElement.clientWidth == 750) {
        itemHeight = Math.ceil(this.itemHeight || (98 / 46.875 * rootSize));
    }

    var html = "<div class='cas-masker'></div>"
        +   "<div class='caswrap'>"
        +   "<div class='cas-header'>"
        +       "<span>出生日期选择</span>"
        +       "<i></i>"
        +   "</div>"
        +   "<div class='cas-body'>";

    for (var i = 0; i < 5; i++) {
        html += "<div class='cas-tfade" + i + "'></div>"
    }

    var datas = [this.options.yeardata, this.options.monthdata, this.options.daydata];
    for (var i = 0, len = this.options.layer; i < len; i++) {
        const {lists, active, uuid} = datas[i];

        var trans3ds = -active * itemHeight;

        html += "<div class='cascont' style='width:" + width + "'>"
            +       "<div class='casfixh'>"
            +           "<ul class='casul " + uuid + "' style='WebkitTransform: translate3d(0px, " + trans3ds + "px, 0px); transform: translate3d(0px, " + trans3ds + "px, 0px);'>";

        lists.forEach(function (v, k) {
            var classname = classNames('casitem', {
                active: k === +active,
                sh: k === +active - 1
            });

            html += "<li class='" + classname + "'>"
                + v
                + "</li>"
        })

        html += "</ul>";
        html += "</div>";
        html += "</div>";
    }

    html += "</div>"
         + "<div class='cas-footer'>"
         +     "<div class='cas-button datepickerbtn'>确认</div>"
         + "</div>"
         + "</div>";

    $('body').append(html)

    $('body').on('touchmove', '.cas-masker', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    $('body').on('touchmove', '.caswrap', function (e) {
        if (!$(e.target).parents('ul').length) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    })
}

// 渲染高亮
Datepicker.prototype.highlight = function (selector, index) {
    $(selector).find('.casitem').removeClass('active sh');
    $(selector).find('.casitem').eq(index).addClass('active');
    $(selector).find('.casitem').eq(index - 1).addClass('sh');
    $(selector).find('.casitem').eq(index + 1).addClass('sh');
}

/**
 * 返回可选择的月份列表
 *
 * @param {string} def 所选日期
 * @param {string} min 最小日期
 * @param {string} max 最大日期
 * @param {boolean} init 初始化
 *
 * @return {array} 可选的月份列表
 */
Datepicker.prototype.generatorMonthList = function (def, min, max, init) {
    var defarr = def.split('-');
    var minarr = min.split('-');
    var maxarr = max.split('-');

    if (isNaN(+defarr[0]) || isNaN(+minarr[0]) || isNaN(+maxarr[0])) {
        console.error('日期格式有误');
        return false;
    }

    // 初始化校验日期是否超过范围
    // 其他不校验拦截  进行重置
    if (init && (new Date(def).getTime() < new Date(min).getTime()
        || new Date(def).getTime() > new Date(max).getTime())
    ) {
        console.error('日期超过范围');
        return false;
    }

    // 起始年
    if (+defarr[0] === +minarr[0]) {
        return range(+minarr[1], 12, 1);
    }
    // 终止年
    else if (+defarr[0] === +maxarr[0]) {
        return range(1, +maxarr[1], 1);
    }
    // (min, max)集合内
    else {
        return range(1, 12, 1);
    }
}

/**
 * 返回可选的天数列表
 *
 * @param {string} def 所选日期
 * @param {string} min 最小日期
 * @param {string} max 最大日期
 * @param {boolean} init 初始化
 */
Datepicker.prototype.generatorDayList = function (def, min, max, init) {
    var defarr = def.split('-').map(v => +v)
    var minarr = min.split('-').map(v => +v);
    var maxarr = max.split('-').map(v => +v);

    // TODO 改进日期格式的判断
    if (isNaN(defarr[0]) || isNaN(minarr[0]) || isNaN(maxarr[0])) {
        console.error('日期格式有误');
        return false;
    }

    // 校验日期是否超过范围
    if (init && (new Date(def).getTime() < new Date(min).getTime()
        || new Date(def).getTime() > new Date(max).getTime())
    ) {
        console.error('日期超过范围');
        return false;
    }

    // 与 最小范围 年份相同月份也相同 取 [min.day, 最大]
    if (defarr[0] === minarr[0] && defarr[1] === minarr[1]) {
        var maxday = getDaysInMonth(defarr[0], defarr[1]);
        return range(minarr[2], maxday, 1);
    }
    // 与 最大范围 年份相同月份相同 取 [1, max.day]
    else if (defarr[0] === maxarr[0] && defarr[1] === maxarr[1]) {
        return range(1, maxarr[2], 1);
    }
    // ()集合内 取 [1, def.y.m.maxday]
    else {
        var maxday = getDaysInMonth(defarr[0], defarr[1]);
        return range(1, maxday, 1);
    }
}

/**
 * 获取当前选择月份有多少天
 *
 * @param {number} year 年份
 * @param {number} month 月份
 *
 * @return {number} 选择月份的天数
 */
function getDaysInMonth(year, month) {
    return new Date(year, parseInt(month, 10), 0).getDate()
}

/**
 * 类php range方法
 *
 */
function range(min, max, step) {

    min = parseStr2num(min)
    max = parseStr2num(max)
    step = parseStr2num(step)

    let i = min
    let ret = []

    while(i <= max) {
        ret.push(i)
        i += step
    }

    return ret
}

/**
 * 转换字符串到数字
 *
 */
function parseStr2num(str) {
	
    if (Object.prototype.toString.call(str) === '[object String]') {
        str = parseInt(str.replace(',', ''), 10)
    }

    return str
}

function repeat(str, times) {
    return (new Array(times + 1)).join(str);
}

function pad(num, maxLength) {
    return repeat(`0`, maxLength - num.toString().length) + num;
}

module.exports = Datepicker;
