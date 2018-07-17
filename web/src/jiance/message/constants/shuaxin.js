(function () {
    var _default = {
        scrollContainer:'#scroll-container',
        limitMultiple:2,
        height: 50,
        headerHeight:'.8rem',//rem必须带单位，px不用带单位
        footerHeight:'.8rem',
        up:{
            domClass   : 'dropload-up',
            stateObj:{
                start:[],
                loading:[],
                release:[]
            },
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span></div>',
            callBack:''
        },
        down:{
            domClass   : 'dropload-down',
            stateObj:{
                start:[],
                loading:[],
                release:[]
            },
            autoLoad : true,
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domUpdate  : '<div class="dropload-update">↓释放加载</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span></div>',
            domNoData  : '<div class="dropload-noData"></div>',
            callBack:''
        }
    };
    function Refresh(options) {
        this._default = $.extend(true,_default,options);
        this.upState = new UpState(this);
        this.downSate = new DownSate(this);
        this.$container = $(_default.scrollContainer);
        this.MaxHeight = _default.height*_default.limitMultiple;
        this.lock = true;
        this.direct = '';
        this.downLock = true;
    }
    Refresh.prototype = {
        init:function () {
            var upWrapper = $('<div class='+_default.up.domClass+'></div>'),
                downWrapper = $('<div class='+_default.down.domClass+'></div>');
            this.$container.prepend(upWrapper);
            this.$container.append(downWrapper);
            this._offsetHeight = this.$container[0].offsetHeight;
            this.screenHeight = $(document).height();
            //_default.headerHeight.search('px') > -1?(console.error('px不可以带单位')):'';
            //_default.footerHeight.search('px') > -1?(console.error('px不可以带单位')):'';
            //var fontSize = $('html').css('font-size').split('px')[0];
            //_default.headerHeight.search('rem') > -1?(_default.headerHeight=_default.headerHeight.split('rem')[0]*fontSize):'';
            //_default.footerHeight.search('rem') > -1?(_default.footerHeight=_default.footerHeight.split('rem')[0]*fontSize):'';
            this.bindEvent();
            this.autoLoad();
        },
        resize:function () {
            window.location.reload();
        },
        autoLoad:function () {
            if(this._default.down.autoLoad){
                if(this._offsetHeight < (this.screenHeight-_default.headerHeight-_default.footerHeight)){
                    this.downSate.loading();
                    _default.down.callBack.call(this);
                }
            }
        },
        bindEvent:function () {
            var startY = 0,
                currentY = 0,
                distance,
                _this = this;
            this.$container.on('touchstart',function (e) {
                startY = e.originalEvent.touches[0].pageY;
            });
            this.$container.on('touchmove',function(e){
                currentY = e.originalEvent.touches[0].pageY;
                distance = currentY-startY;
                if(_this.lock === true){
                    if(distance > 0){
                        _unit.move(_default.up.domClass,distance);
                        _this.top(distance);
                        if(distance > _default.height){
                            _this.direct = 'up';
                        }else{
                            _this.direct = '';
                        }
                    }else if(distance < 0){
                        _unit.move(_default.down.domClass,distance);
                        _this.bottom(distance);
                        if(Math.abs(distance) > _default.height){
                            _this.direct = 'down';
                        }else{
                            _this.direct = '';
                        }
                    }
                }
            });
            this.$container.on('touchend',function(e){
                if(_this.lock === true){
                    if(_this.direct === 'up'){
                        _unit.move(_default.up.domClass,_default.height);
                        _this.upState.loading();
                        _this.downSate.clear();
                        _this.lock =false;
                        _this.direct = '';
                        _this.downLock = true;
                        _default.up.callBack.call(this);
                        return;
                    }else if(_this.direct === 'down' && _this.downLock === true){
                        _unit.move(_default.down.domClass,_default.height);
                        _this.downSate.loading();
                        _this.lock =false;
                        _this.direct = '';
                        _default.down.callBack.call(this);
                        return;
                    }
                    _unit.move(_default.up.domClass,0);
                    _unit.move(_default.down.domClass,0);
                    _this.upState.clear();
                    if(_this.downLock === true){
                        _this.downSate.clear();
                    }
                }
            });
        },
        top:function (distance) {
            if(this.lock != true){return}
            if(distance<_default.height){
                this.upState.start();
            }else if(distance > _default.height && distance <= this.MaxHeight){
                this.upState.release();
            }else if(distance > this.MaxHeight){
                //这里没有状态仅仅是想在超出制定距离后自动触发touchend
                this.upState.stop();
            }
        },
        bottom:function (distance) {
            if(this.lock != true){return};
            var abs = Math.abs;
            if(this.downLock === true){
                if(abs(distance)<_default.height){
                    this.downSate.start();
                }else if(abs(distance) > _default.height && abs(distance) <= this.MaxHeight){
                    this.downSate.release();
                }else if(abs(distance) > this.MaxHeight){
                    //DONE:这里没有状态仅仅是想在超出制定距离后自动触发touchend
                    this.downSate.stop();
                }
            }
        },
        endPullDownRefresh:function () {
            this.lock = true;
            this.upState.clear();
            _unit.move(_default.up.domClass,0);
        },
        endPullUpRefresh:function () {
            this.lock = true;
            this.downSate.clear();
            _unit.move(_default.down.domClass,0);
        },
        noData:function () {
            this.downSate.noData();
            this.downLock = false;
        }
    };
    var _unit = {
        clearState:function(stateObj) {
            $.each(stateObj,function (index) {
                stateObj[index] = [];
            });
            return stateObj;
        },
        commonState:function(up,start,domEle) {
            //DONE:这块为了防止重复加载设定
            if(up.stateObj[start]){
                if(up.stateObj[start].length>0){
                    return;
                }
                up.stateObj = this.clearState(up.stateObj);
                up.stateObj[start].push(1);
            }
            if(domEle){
                $('.'+up.domClass).html(up[domEle]);
            }else{
                throw new Error(domEle+'不存在，请检查您的配置项是否完整');
            }
        },
        move:function (domClass,distance) {
            $('.'+domClass).css({'height':Math.abs(distance)+'px','transition':'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'});
        }
    };
// 这块还是要用工厂模式
    var stateFactory = (function () {
        var State = function () {};
        State.prototype.start = function () {
            throw new Error('子类需要重写父类start的方法');
        };
        State.prototype.loading = function () {
            throw new Error('子类需要重写父类loading的方法');
        };
        State.prototype.noData = function () {
            throw new Error('子类需要重写父类noData的方法');
        };
        State.prototype.release = function () {
            throw new Error('子类需要重写父类release的方法');
        };
        State.prototype.stop = function () {
            throw new Error('子类需要重写父类stop的方法');
        };
        return function (param) {
            var F = function (obj) {
                this.obj = obj;
            };
            F.prototype = new State();
            for(var i in param){
                F.prototype[i] = param[i];
            }
            return F;
        }
    })();
    var UpState = stateFactory({
        start:function () {
            _unit.commonState(this.obj._default.up,'start','domRefresh');
        },
        loading:function () {
            _unit.commonState(this.obj._default.up,'loading','domLoad');
        },
        release:function () {
            _unit.commonState(this.obj._default.up,'release','domUpdate');
        },
        clear: function () {
            $('.'+this.obj._default.up.domClass).children().remove();
        },
        stop:function () {
            //TODO:这里还需要添加功能:触发touchend事件
        }
    });
    var DownSate = stateFactory({
        start:function () {
            _unit.commonState(this.obj._default.down,'start','domRefresh');
        },
        loading:function () {
            _unit.commonState(this.obj._default.down,'loading','domLoad');
        },
        clear: function () {
            $('.'+this.obj._default.down.domClass).children().remove();
        },
        release: function () {
            _unit.commonState(this.obj._default.down,'release','domUpdate');
        },
        noData:function () {
            _unit.commonState(this.obj._default.down,'noData','domNoData');
        },
        stop:function () {
            //TODO:这里还需要添加功能触发:touchend事件
        }
    });
    window.install = function (name) {
        var myname = name || 'LcRefresh';
        window[myname] = Refresh;
    }
})();



