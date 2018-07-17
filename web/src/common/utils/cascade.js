/**
 * @file 省市级联选择
 * @author luwenlong
 * @param type 可选 后续使用
 * @param lists 省市数据列表
 * @param province 省份数据
 * @param city 城市数据
 * @param callback 回调函数
 */

import classNames from 'classnames';

function Cascade(options) {}

/**
 * 根据省份名字查询其下的所有的城市
 *
 * @param {string} name 省份名
 * @param {Object} data 省市数据全集
 *
 * @return {Array} cities 城市集合
 */
function queryCitiesFromProvince(name, data) {
    let ret = ['北京']

    data.forEach(item => {
        if (item.value == name) {
            ret = item.cities
        }
    })

    return ret
}

/**
 * 获取所有省份数据
 *
 */
function getAllProvinces(data) {
    return data.map(item => item.value)
}

/**
 * 初始化 渲染 省份 + 指定的城市
 *
 */
Cascade.prototype.init = function (options) {
    var provinces = getAllProvinces(options.lists);
    var cities = queryCitiesFromProvince(options.province, options.lists);

    this.provinces = provinces;
    var provinceIndex = this.computeIndex(options.province);
    var cityIndex = cities.indexOf(options.city) == -1 ? 0 : cities.indexOf(options.city);

    var opts = [
        {
            uuid: 'province',
            lists: provinces,
            active: provinceIndex,
            name: options.province
        },
        {
            uuid: 'city',
            lists: cities,
            active: cityIndex,
            name: options.city
        }
    ]

    this.defopts = options;
    this.options = opts;
    this.callback = options.callback;

    this.provincedata = {
        uuid: 'province',
        lists: provinces,
        active: provinceIndex
    }
    this.citydata = {
        uuid: 'city',
        lists: cities,
        active: cityIndex
    }

    this.render();

    // 绑定事件
    this.bindProvinceEvents(this.provincedata);
    this.bindCityEvents(this.citydata);
}

Cascade.prototype.show = function (options) {
    if (!options) {
        console.log('options is required')
    }
    document.body.style.overflow = 'hidden';
    this.init(options);
}

Cascade.prototype.hide = function () {
    document.body.style.overflow = '';
    $('.cas-masker').remove();
    $('.caswrap').remove();
}

Cascade.prototype.render = function () {
    var width = 1 / this.options.length * 100 + '%';
    const rootSize = +$('html').css('fontSize').replace('px', '');
    const itemHeight = parseInt(this.itemHeight || (98 / 46.875 * rootSize), 10);

    var html = "<div class='cas-masker'></div>"
        +   "<div class='caswrap'>"
        +   "<div class='cas-header'>"
        +       "<span>出生地选择</span>"
        +       "<i></i>"
        +   "</div>"
        +   "<div class='cas-body'>";

    for (var i = 0; i < 5; i++) {
        html += "<div class='cas-tfade" + i + "'></div>"
    }

    for (var i = 0, len = this.options.length; i < len; i++) {
        const {lists, active, uuid} = this.options[i];
        var trans3ds = -active * itemHeight;

        html += "<div class='cascont' style='width:50%'>"
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
        });

        html += "</ul>";
        html += "</div>";
        html += "</div>";
    }

    html += "</div>"
         + "<div class='cas-footer'>"
         +     "<div class='cas-button cascadebtn'>确认</div>"
         + "</div>"
         + "</div>";

    $('body').append(html)

    $('.cas-masker').height(document.documentElement.scrollHeight);

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

// 计算索引
Cascade.prototype.computeIndex = function (provinceName) {
    return this.provinces.indexOf(provinceName) == -1 ? 0 : this.provinces.indexOf(provinceName);
}

// 绑定省份事件
Cascade.prototype.bindProvinceEvents = function (options) {
    const me = this
    const itemHeight = document.querySelector('.casitem').offsetHeight
    let startY = 0
    let startR = 0

    let lastMoveStart = 0
    let lastMoveTime = 0
    let stopInertiaMove = false

    let wrap = document.querySelector(`.${options.uuid}`)

    wrap.addEventListener('touchstart', event => {
        event.preventDefault()
        startY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        var transform = wrap.style.WebkitTransform || wrap.style.transform;
        startR = parseFloat(transform.substr(17));

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

        event.stopPropagation();
        event.stopImmediatePropagation();
    }, false);

    // 关闭
    $('body').on('click', '.cas-header i', function () {
        me.hide();
    })

    // 选择 确认
    $('.cascadebtn').click(function () {
        var province = $('.caswrap .province .active').html();
        var city = $('.caswrap .city .active').html();

        me.callback({province, city});
        setTimeout(me.hide, 10)
    })

    $('body').on('touchstart', '.' + options.uuid + ' li', function () {

        if ($(this).hasClass('active')) {
            return false
        }

        let index = $(this).index()
        let endRange = -Math.abs(index * itemHeight)

        setTranslate(endRange)
    });

    function setTranslate(endRange) {
        // 向上(-)滑动超过最大值: 取最大; 向下(+)滑动超过最大值: 取0
        let MAX_EXCEED = (me.provincedata.lists.length - 1) * itemHeight * -1

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
        //endRange = correctRange(endRange)

        let index = Math.abs(endRange / itemHeight)

        wrap.style.WebkitTransform = 'translate3d(0px, ' + endRange + 'px, 0px)';
        wrap.style.transform = 'translate3d(0px, ' + endRange + 'px, 0px)';

        me.highlight(wrap, index);

        var type = options.uuid;
        var selectProvince = options.lists[index];

        // 点击省份 更新provincedata citydata
        if (type == 'province') {
            let citylist = queryCitiesFromProvince(selectProvince, me.defopts.lists)

            me.citydata = {
                uuid: 'city',
                lists: citylist,
                active: 0,
                name: citylist[0]
            }

            me.provincedata = {
                uuid: 'province',
                lists: me.provinces,
                active: me.computeIndex(selectProvince),
                name: selectProvince
            }

            // 更新city
            me.bindCityEvents(me.citydata, true)
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

// 渲染高亮
Cascade.prototype.highlight = function (selector, index) {
    $(selector).find('.casitem').removeClass('active sh');
    $(selector).find('.casitem').eq(index).addClass('active');
    $(selector).find('.casitem').eq(index - 1).addClass('sh');
    $(selector).find('.casitem').eq(index + 1).addClass('sh');
}

// 绑定城市事件
Cascade.prototype.bindCityEvents = function (options, update) {
    const me = this
    // 更新
    if (update) {
        $('.city').html(renderCities(this.provincedata.name));
        document.querySelector('.city').style.WebkitTransform = 'translate3d(0px, ' + 0 + 'px, 0px)';
        document.querySelector('.city').style.transform = 'translate3d(0px, ' + 0 + 'px, 0px)';
        me.highlight(document.querySelector('.city'), 0)

    }

    const itemHeight = document.querySelector('.casitem').offsetHeight
    let startY = 0
    let startR = 0

    let lastMoveStart = 0
    let lastMoveTime = 0
    let stopInertiaMove = false

    let wrap = document.querySelector(`.${options.uuid}`)

    wrap.addEventListener('touchstart', event => {
        event.preventDefault()
        startY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        var transform = wrap.style.WebkitTransform || wrap.style.transform;
        startR = parseFloat(transform.substr(17));
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

    $('body').on('touchstart', '.' + options.uuid + ' li', function () {

        if ($(this).hasClass('active')) {
            return false
        }

        let index = $(this).index()
        let endRange = -Math.abs(index * itemHeight)

        setTranslate(endRange)
    });

    function setTranslate(endRange) {
        // 向上(-)滑动超过最大值: 取最大; 向下(+)滑动超过最大值: 取0
        let MAX_EXCEED = (me.citydata.lists.length - 1) * itemHeight * -1

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
        //endRange = correctRange(endRange)

        let index = Math.abs(endRange / itemHeight)

        wrap.style.WebkitTransform = 'translate3d(0px, ' + endRange + 'px, 0px)';
        wrap.style.transform = 'translate3d(0px, ' + endRange + 'px, 0px)';

        me.highlight(wrap, index);

        var type = options.uuid;
        var selectProvince = options.lists[index];
    }

    /* 渲染city */
    function renderCities(provinceName) {
        var cities = queryCitiesFromProvince(provinceName, me.defopts.lists);

        var html = '';
        for (var i = 0, len = cities.length; i < len; i++) {
            html += '<li class="casitem">' + cities[i] + '</li>'
        }

        return html;
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

module.exports = Cascade;
