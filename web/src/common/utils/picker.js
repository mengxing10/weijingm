/**
 * @file picker 依赖zepto/jquery
 * @author luwenlong
 */

import classNames from 'classnames';

function Picker() {
    //this.init(options);
}

Picker.prototype.init = function (options) {
    this.lastMoveStart = 0;
    this.lastMoveTime = 0;
    this.options = options || {};
    this.active = options.active;
}

Picker.prototype.show = function (options) {
    document.body.style.overflow = 'hidden';
    this.init(options);
    this.render();
}

Picker.prototype.hide = function () {
    document.body.style.overflow = '';
    $('.cas-masker').remove();
    $('.caswrap').remove();
}

Picker.prototype.bindEvents = function () {
    const me = this
    let itemHeight = document.querySelector('.casitem').offsetHeight
    let startY = 0
    let startR = 0

    let stopInertiaMove = false
    let wrap = document.querySelector('.' + me.options.uuid)

    this.itemHeight = itemHeight;
    this.wrap = wrap;

    wrap.addEventListener('touchstart', event => {
        event.preventDefault()
        startY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        var transform = wrap.style.WebkitTransform || wrap.style.transform;
        startR = parseFloat(transform.substr(17))
        this.updateInertiaParams(event, true)
    }, false)

    wrap.addEventListener('touchend', event => {
        event.preventDefault()
        //this.startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchcancel', event => {
        event.preventDefault()
        //this.startInertiaScroll(event)
    }, false)

    wrap.addEventListener('touchmove', event => {
        event.preventDefault()
        this.updateInertiaParams(event)

        let endY = (event.changedTouches ? event.changedTouches[0] : event).pageY
        let endRange = endY - startY + startR

        this.setTranslate(endRange);

        // event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }, false)

    $('body').on('touchstart', '.' + me.options.uuid + ' li', function (e) {
    //$('.' + me.options.uuid + ' li').click(function () {
        let index = $(this).index()
        let endRange = -Math.abs(index * me.itemHeight)

        me.setTranslate(endRange)
    });

    $('body').on('touchmove', '.cas-masker', function (ev) {
        ev.preventDefault();
        ev.stopPropagation()
    })

    $('body').on('touchstart', '.cas-header i', function (ev) {
        ev.preventDefault();
        ev.stopPropagation()
        ev.stopImmediatePropagation();
        me.hide();
    })

    //$('body').on('click', '.' + me.options.uuid + 'btn', function() {
    $('.' + me.options.uuid + 'btn').click(function() {
        var selectItem = $('.' + me.options.uuid +' .active').html();

        me.options.callback(selectItem);
        setTimeout(me.hide, 10)
    })

}

Picker.prototype.getActive = function () {
    return this.active;
}

Picker.prototype.setTranslate = function(endRange) {
    // 向上(-)滑动超过最大值: 取最大; 向下(+)滑动超过最大值: 取0
    let MAX_EXCEED = (this.options.lists.length - 1) * this.itemHeight * -1

    if (Math.abs(endRange) > Math.abs(MAX_EXCEED)) {
        endRange = endRange > 0 ? 0 : MAX_EXCEED
    }
    else if (endRange > 0) {
        endRange = 0
    }

    let sub = endRange % this.itemHeight;

    if (sub < this.itemHeight / 2) {
        endRange = endRange - sub;
    }
    else {
        endRange = endRange + this.itemHeight - sub;
    }

    // 矫正距离为行高整数倍
    endRange = this.correctRange(endRange);

    let index = Math.abs(endRange / this.itemHeight)

    this.active = index;
    this.wrap.style.WebkitTransform = 'translate3d(0px, ' + endRange + 'px, 0px)';
    this.wrap.style.transform = 'translate3d(0px, ' + endRange + 'px, 0px)';

    this.highlight(this.wrap, index);
}

// 渲染高亮
Picker.prototype.highlight = function (selector, index) {
    $(selector).find('.casitem').removeClass('active sh');
    $(selector).find('.casitem').eq(index).addClass('active');
    $(selector).find('.casitem').eq(index - 1).addClass('sh');
    $(selector).find('.casitem').eq(index + 1).addClass('sh');
}

Picker.prototype.correctRange = function(endRange) {
    if ((endRange % this.itemHeight) / this.itemHeight > .6) {
        endRange = Math.ceil(endRange / this.itemHeight) * this.itemHeight
    }
    else {
        endRange = Math.floor(endRange / this.itemHeight) * this.itemHeight
    }

    return endRange
}

Picker.prototype.startInertiaScroll = function(event) {
    let MAX_EXCEED = (this.options.lists.length - 1) * this.itemHeight * -1
    let currentR = parseFloat(this.wrap.style.WebkitTransform.substr(17))

    if (currentR == 0 || currentR == MAX_EXCEED) {
        return false
    }

    /**
     * 缓动
     */
    let point = event.changedTouches ? event.changedTouches[0] : event
    let nowTime = event.timeStamp || Date.now()
    // 最后一段时间手指划动速度
    let v = (point.pageY - this.lastMoveStart) / (nowTime - this.lastMoveTime)
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

Picker.prototype.updateInertiaParams = function(event, isStart) {
    let point = event.changedTouches ? event.changedTouches[0] : event

    if (isStart) {
        this.lastMoveStart = point.pageY
        this.lastMoveTime = event.timeStamp || Date.now()
    }
    else {
        let nowTime = event.timeStamp || Date.now()
        if (nowTime - this.lastMoveTime > 300) {
            this.lastMoveTime = nowTime
            this.lastMoveStart = point.pageY
        }
    }

    //stopInertiaMove = true;
}

Picker.prototype.render = function () {
    const me = this;
    const {lists, active, single, uuid, title} = this.options;
    const rootSize = +$('html').css('fontSize').replace('px', '');
    const itemHeight = parseInt(this.itemHeight || (98 / 46.875 * rootSize), 10);

    if (single) {
        var html = "<div class='cas-masker'></div>"
            +   "<div class='caswrap'>"
            +       "<div class='cas-header'>"
            +           "<span>" + title + "</span>"
            +           "<i></i>"
            +       "</div>"
            +       "<div class='cas-body'>";
    }
    else {
        var html =   "<div class='cas-body'>";
    }

    for (var i = 0; i < 5; i++) {
        html += "<div class='cas-tfade" + i + "'></div>"
    }

    var trans3ds = -active * itemHeight;

    html += "<div class='cascont'>"
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
    html += "</div>";

    if (single) {
        html += "<div class='cas-footer'>"
             +     "<div class='cas-button " + uuid + "btn'>确认</div>"
             + "</div>"
             + "</div>";
    }

    $('body').append(html);

    this.bindEvents();

    $('.cas-masker').height(document.documentElement.scrollHeight);

    $('body').on('touchmove', '.cas-masker', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    $('body').on('touchstart', '.cas-masker', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    $('body').on('touchmove', '.caswrap', function (e) {
        if (!$(e.target).parents('.' + me.options.uuid).length) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    });
}

module.exports = Picker;
