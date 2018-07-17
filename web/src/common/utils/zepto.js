/*! Zepto 1.2.0 (generated with Zepto Builder) - zepto event selector detect fx - zeptojs.com/license */
var Zepto=function(){function t(t){return null==t?String(t):Y[J.call(t)]||"object"}function n(n){return"function"==t(n)}function e(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(n){return"object"==t(n)}function o(t){return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){var n=!!t&&"length"in t&&t.length,i=S.type(t);return"function"!=i&&!e(t)&&("array"==i||0===n||"number"==typeof n&&n>0&&n-1 in t)}function a(t){return A.call(t,function(t){return null!=t})}function u(t){return t.length>0?S.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function f(t){return t in L?L[t]:L[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function l(t,n){return"number"!=typeof n||_[c(t)]?n:n+"px"}function h(t){var n,e;return M[t]||(n=$.createElement(t),$.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),n.parentNode.removeChild(n),"none"==e&&(e="block"),M[t]=e),M[t]}function p(t){return"children"in t?Z.call(t.children):S.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function d(t,n){var e,i=t?t.length:0;for(e=0;i>e;e++)this[e]=t[e];this.length=i,this.selector=n||""}function m(t,n,e){for(N in n)e&&(o(n[N])||Q(n[N]))?(o(n[N])&&!o(t[N])&&(t[N]={}),Q(n[N])&&!Q(t[N])&&(t[N]=[]),m(t[N],n[N],e)):n[N]!==x&&(t[N]=n[N])}function v(t,n){return null==n?S(t):S(t).filter(n)}function g(t,e,i,r){return n(e)?e.call(t,i,r):e}function y(t,n,e){null==e?t.removeAttribute(n):t.setAttribute(n,e)}function b(t,n){var e=t.className||"",i=e&&e.baseVal!==x;return n===x?i?e.baseVal:e:void(i?e.baseVal=n:t.className=n)}function w(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?S.parseJSON(t):t):t}catch(n){return t}}function E(t,n){n(t);for(var e=0,i=t.childNodes.length;i>e;e++)E(t.childNodes[e],n)}var x,N,S,P,C,O,T=[],k=T.concat,A=T.filter,Z=T.slice,$=window.document,M={},L={},_={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},j=/^\s*<(\w+|!)[^>]*>/,z=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,D=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,F=/^(?:body|html)$/i,B=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],q=["after","prepend","before","append"],I=$.createElement("table"),R=$.createElement("tr"),W={tr:$.createElement("tbody"),tbody:I,thead:I,tfoot:I,td:R,th:R,"*":$.createElement("div")},H=/complete|loaded|interactive/,X=/^[\w-]*$/,Y={},J=Y.toString,K={},U=$.createElement("div"),G={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},Q=Array.isArray||function(t){return t instanceof Array};return K.matches=function(t,n){if(!n||!t||1!==t.nodeType)return!1;var e=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(e)return e.call(t,n);var i,r=t.parentNode,o=!r;return o&&(r=U).appendChild(t),i=~K.qsa(r,n).indexOf(t),o&&U.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,n){return n?n.toUpperCase():""})},O=function(t){return A.call(t,function(n,e){return t.indexOf(n)==e})},K.fragment=function(t,n,e){var i,r,s;return z.test(t)&&(i=S($.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(D,"<$1></$2>")),n===x&&(n=j.test(t)&&RegExp.$1),n in W||(n="*"),s=W[n],s.innerHTML=""+t,i=S.each(Z.call(s.childNodes),function(){s.removeChild(this)})),o(e)&&(r=S(i),S.each(e,function(t,n){V.indexOf(t)>-1?r[t](n):r.attr(t,n)})),i},K.Z=function(t,n){return new d(t,n)},K.isZ=function(t){return t instanceof K.Z},K.init=function(t,e){var i;if(!t)return K.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&j.test(t))i=K.fragment(t,RegExp.$1,e),t=null;else{if(e!==x)return S(e).find(t);i=K.qsa($,t)}else{if(n(t))return S($).ready(t);if(K.isZ(t))return t;if(Q(t))i=a(t);else if(r(t))i=[t],t=null;else if(j.test(t))i=K.fragment(t.trim(),RegExp.$1,e),t=null;else{if(e!==x)return S(e).find(t);i=K.qsa($,t)}}return K.Z(i,t)},S=function(t,n){return K.init(t,n)},S.extend=function(t){var n,e=Z.call(arguments,1);return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){m(t,e,n)}),t},K.qsa=function(t,n){var e,i="#"==n[0],r=!i&&"."==n[0],o=i||r?n.slice(1):n,s=X.test(o);return t.getElementById&&s&&i?(e=t.getElementById(o))?[e]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:Z.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(n):t.querySelectorAll(n))},S.contains=$.documentElement.contains?function(t,n){return t!==n&&t.contains(n)}:function(t,n){for(;n&&(n=n.parentNode);)if(n===t)return!0;return!1},S.type=t,S.isFunction=n,S.isWindow=e,S.isArray=Q,S.isPlainObject=o,S.isEmptyObject=function(t){var n;for(n in t)return!1;return!0},S.isNumeric=function(t){var n=Number(t),e=typeof t;return null!=t&&"boolean"!=e&&("string"!=e||t.length)&&!isNaN(n)&&isFinite(n)||!1},S.inArray=function(t,n,e){return T.indexOf.call(n,t,e)},S.camelCase=C,S.trim=function(t){return null==t?"":String.prototype.trim.call(t)},S.uuid=0,S.support={},S.expr={},S.noop=function(){},S.map=function(t,n){var e,i,r,o=[];if(s(t))for(i=0;i<t.length;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),null!=e&&o.push(e);return u(o)},S.each=function(t,n){var e,i;if(s(t)){for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;return t},S.grep=function(t,n){return A.call(t,n)},window.JSON&&(S.parseJSON=JSON.parse),S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){Y["[object "+n+"]"]=n.toLowerCase()}),S.fn={constructor:K.Z,length:0,forEach:T.forEach,reduce:T.reduce,push:T.push,sort:T.sort,splice:T.splice,indexOf:T.indexOf,concat:function(){var t,n,e=[];for(t=0;t<arguments.length;t++)n=arguments[t],e[t]=K.isZ(n)?n.toArray():n;return k.apply(K.isZ(this)?this.toArray():this,e)},map:function(t){return S(S.map(this,function(n,e){return t.call(n,e,n)}))},slice:function(){return S(Z.apply(this,arguments))},ready:function(t){return H.test($.readyState)&&$.body?t(S):$.addEventListener("DOMContentLoaded",function(){t(S)},!1),this},get:function(t){return t===x?Z.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return T.every.call(this,function(n,e){return t.call(n,e,n)!==!1}),this},filter:function(t){return n(t)?this.not(this.not(t)):S(A.call(this,function(n){return K.matches(n,t)}))},add:function(t,n){return S(O(this.concat(S(t,n))))},is:function(t){return this.length>0&&K.matches(this[0],t)},not:function(t){var e=[];if(n(t)&&t.call!==x)this.each(function(n){t.call(this,n)||e.push(this)});else{var i="string"==typeof t?this.filter(t):s(t)&&n(t.item)?Z.call(t):S(t);this.forEach(function(t){i.indexOf(t)<0&&e.push(t)})}return S(e)},has:function(t){return this.filter(function(){return r(t)?S.contains(this,t):S(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:S(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:S(t)},find:function(t){var n,e=this;return n=t?"object"==typeof t?S(t).filter(function(){var t=this;return T.some.call(e,function(n){return S.contains(n,t)})}):1==this.length?S(K.qsa(this[0],t)):this.map(function(){return K.qsa(this,t)}):S()},closest:function(t,n){var e=[],r="object"==typeof t&&S(t);return this.each(function(o,s){for(;s&&!(r?r.indexOf(s)>=0:K.matches(s,t));)s=s!==n&&!i(s)&&s.parentNode;s&&e.indexOf(s)<0&&e.push(s)}),S(e)},parents:function(t){for(var n=[],e=this;e.length>0;)e=S.map(e,function(t){return(t=t.parentNode)&&!i(t)&&n.indexOf(t)<0?(n.push(t),t):void 0});return v(n,t)},parent:function(t){return v(O(this.pluck("parentNode")),t)},children:function(t){return v(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||Z.call(this.childNodes)})},siblings:function(t){return v(this.map(function(t,n){return A.call(p(n.parentNode),function(t){return t!==n})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return S.map(this,function(n){return n[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=n(t);if(this[0]&&!e)var i=S(t).get(0),r=i.parentNode||this.length>1;return this.each(function(n){S(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){S(this[0]).before(t=S(t));for(var n;(n=t.children()).length;)t=n.first();S(t).append(this)}return this},wrapInner:function(t){var e=n(t);return this.each(function(n){var i=S(this),r=i.contents(),o=e?t.call(this,n):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){S(this).replaceWith(S(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=S(this);(t===x?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return S(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return S(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(n){var e=this.innerHTML;S(this).empty().append(g(this,t,n,e))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(n){var e=g(this,t,n,this.textContent);this.textContent=null==e?"":""+e}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,n){var e;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(r(t))for(N in t)y(this,N,t[N]);else y(this,t,g(this,n,e,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(e=this[0].getAttribute(t))?e:x},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){y(this,t)},this)})},prop:function(t,n){return t=G[t]||t,1 in arguments?this.each(function(e){this[t]=g(this,n,e,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=G[t]||t,this.each(function(){delete this[t]})},data:function(t,n){var e="data-"+t.replace(B,"-$1").toLowerCase(),i=1 in arguments?this.attr(e,n):this.attr(e);return null!==i?w(i):x},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(n){this.value=g(this,t,n,this.value)})):this[0]&&(this[0].multiple?S(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(n){var e=S(this),i=g(this,t,n,e.offset()),r=e.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==e.css("position")&&(o.position="relative"),e.css(o)});if(!this.length)return null;if($.documentElement!==this[0]&&!S.contains($.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(n,e){if(arguments.length<2){var i=this[0];if("string"==typeof n){if(!i)return;return i.style[C(n)]||getComputedStyle(i,"").getPropertyValue(n)}if(Q(n)){if(!i)return;var r={},o=getComputedStyle(i,"");return S.each(n,function(t,n){r[n]=i.style[C(n)]||o.getPropertyValue(n)}),r}}var s="";if("string"==t(n))e||0===e?s=c(n)+":"+l(n,e):this.each(function(){this.style.removeProperty(c(n))});else for(N in n)n[N]||0===n[N]?s+=c(N)+":"+l(N,n[N])+";":this.each(function(){this.style.removeProperty(c(N))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(S(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?T.some.call(this,function(t){return this.test(b(t))},f(t)):!1},addClass:function(t){return t?this.each(function(n){if("className"in this){P=[];var e=b(this),i=g(this,t,n,e);i.split(/\s+/g).forEach(function(t){S(this).hasClass(t)||P.push(t)},this),P.length&&b(this,e+(e?" ":"")+P.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===x)return b(this,"");P=b(this),g(this,t,n,P).split(/\s+/g).forEach(function(t){P=P.replace(f(t)," ")}),b(this,P.trim())}})},toggleClass:function(t,n){return t?this.each(function(e){var i=S(this),r=g(this,t,e,b(this));r.split(/\s+/g).forEach(function(t){(n===x?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===x?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===x?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],n=this.offsetParent(),e=this.offset(),i=F.test(n[0].nodeName)?{top:0,left:0}:n.offset();return e.top-=parseFloat(S(t).css("margin-top"))||0,e.left-=parseFloat(S(t).css("margin-left"))||0,i.top+=parseFloat(S(n[0]).css("border-top-width"))||0,i.left+=parseFloat(S(n[0]).css("border-left-width"))||0,{top:e.top-i.top,left:e.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||$.body;t&&!F.test(t.nodeName)&&"static"==S(t).css("position");)t=t.offsetParent;return t})}},S.fn.detach=S.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});S.fn[t]=function(r){var o,s=this[0];return r===x?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){s=S(this),s.css(t,g(this,r,n,s[t]()))})}}),q.forEach(function(n,e){var i=e%2;S.fn[n]=function(){var n,r,o=S.map(arguments,function(e){var i=[];return n=t(e),"array"==n?(e.forEach(function(t){return t.nodeType!==x?i.push(t):S.zepto.isZ(t)?i=i.concat(t.get()):void(i=i.concat(K.fragment(t)))}),i):"object"==n||null==e?e:K.fragment(e)}),s=this.length>1;return o.length<1?this:this.each(function(t,n){r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null;var a=S.contains($.documentElement,r);o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!r)return S(t).remove();r.insertBefore(t,n),a&&E(t,function(t){if(!(null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src)){var n=t.ownerDocument?t.ownerDocument.defaultView:window;n.eval.call(n,t.innerHTML)}})})})},S.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){return S(t)[n](this),this}}),K.Z.prototype=d.prototype=S.fn,K.uniq=O,K.deserializeValue=w,S.zepto=K,S}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function n(t,n){var e=this.os={},i=this.browser={},r=t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),o=t.match(/(Android);?[\s\/]+([\d.]+)?/),s=!!t.match(/\(Macintosh\; Intel /),a=t.match(/(iPad).*OS\s([\d_]+)/),u=t.match(/(iPod)(.*OS\s([\d_]+))?/),c=!a&&t.match(/(iPhone\sOS)\s([\d_]+)/),f=t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),l=/Win\d{2}|Windows/.test(n),h=t.match(/Windows Phone ([\d.]+)/),p=f&&t.match(/TouchPad/),d=t.match(/Kindle\/([\d.]+)/),m=t.match(/Silk\/([\d._]+)/),v=t.match(/(BlackBerry).*Version\/([\d.]+)/),g=t.match(/(BB10).*Version\/([\d.]+)/),y=t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),b=t.match(/PlayBook/),w=t.match(/Chrome\/([\d.]+)/)||t.match(/CriOS\/([\d.]+)/),E=t.match(/Firefox\/([\d.]+)/),x=t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),N=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),S=!w&&t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),P=S||t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);(i.webkit=!!r)&&(i.version=r[1]),o&&(e.android=!0,e.version=o[2]),c&&!u&&(e.ios=e.iphone=!0,e.version=c[2].replace(/_/g,".")),a&&(e.ios=e.ipad=!0,e.version=a[2].replace(/_/g,".")),u&&(e.ios=e.ipod=!0,e.version=u[3]?u[3].replace(/_/g,"."):null),h&&(e.wp=!0,e.version=h[1]),f&&(e.webos=!0,e.version=f[2]),p&&(e.touchpad=!0),v&&(e.blackberry=!0,e.version=v[2]),g&&(e.bb10=!0,e.version=g[2]),y&&(e.rimtabletos=!0,e.version=y[2]),b&&(i.playbook=!0),d&&(e.kindle=!0,e.version=d[1]),m&&(i.silk=!0,i.version=m[1]),!m&&e.android&&t.match(/Kindle Fire/)&&(i.silk=!0),w&&(i.chrome=!0,i.version=w[1]),E&&(i.firefox=!0,i.version=E[1]),x&&(e.firefoxos=!0,e.version=x[1]),N&&(i.ie=!0,i.version=N[1]),P&&(s||e.ios||l)&&(i.safari=!0,e.ios||(i.version=P[1])),S&&(i.webview=!0),e.tablet=!!(a||b||o&&!t.match(/Mobile/)||E&&t.match(/Tablet/)||N&&!t.match(/Phone/)&&t.match(/Touch/)),e.phone=!(e.tablet||e.ipod||!(o||c||f||v||g||w&&t.match(/Android/)||w&&t.match(/CriOS\/([\d.]+)/)||E&&t.match(/Mobile/)||N&&t.match(/Touch/)))}n.call(t,navigator.userAgent,navigator.platform),t.__detect=n}(Zepto),function(t){function n(t){return t._zid||(t._zid=h++)}function e(t,e,o,s){if(e=i(e),e.ns)var a=r(e.ns);return(v[n(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||a.test(t.ns))&&(!o||n(t.fn)===n(o))&&(!s||t.sel==s)})}function i(t){var n=(""+t).split(".");return{e:n[0],ns:n.slice(1).sort().join(" ")}}function r(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,n){return t.del&&!y&&t.e in b||!!n}function s(t){return w[t]||y&&b[t]||t}function a(e,r,a,u,f,h,p){var d=n(e),m=v[d]||(v[d]=[]);r.split(/\s/).forEach(function(n){if("ready"==n)return t(document).ready(a);var r=i(n);r.fn=a,r.sel=f,r.e in w&&(a=function(n){var e=n.relatedTarget;return!e||e!==this&&!t.contains(this,e)?r.fn.apply(this,arguments):void 0}),r.del=h;var d=h||a;r.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=u;var n=d.apply(e,t._args==l?[t]:[t].concat(t._args));return n===!1&&(t.preventDefault(),t.stopPropagation()),n}},r.i=m.length,m.push(r),"addEventListener"in e&&e.addEventListener(s(r.e),r.proxy,o(r,p))})}function u(t,i,r,a,u){var c=n(t);(i||"").split(/\s/).forEach(function(n){e(t,n,r,a).forEach(function(n){delete v[c][n.i],"removeEventListener"in t&&t.removeEventListener(s(n.e),n.proxy,o(n,u))})})}function c(n,e){if(e||!n.isDefaultPrevented){e||(e=n),t.each(S,function(t,i){var r=e[t];n[t]=function(){return this[i]=E,r&&r.apply(e,arguments)},n[i]=x});try{n.timeStamp||(n.timeStamp=Date.now())}catch(i){}(e.defaultPrevented!==l?e.defaultPrevented:"returnValue"in e?e.returnValue===!1:e.getPreventDefault&&e.getPreventDefault())&&(n.isDefaultPrevented=E)}return n}function f(t){var n,e={originalEvent:t};for(n in t)N.test(n)||t[n]===l||(e[n]=t[n]);return c(e,t)}var l,h=1,p=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},v={},g={},y="onfocusin"in window,b={focus:"focusin",blur:"focusout"},w={mouseenter:"mouseover",mouseleave:"mouseout"};g.click=g.mousedown=g.mouseup=g.mousemove="MouseEvents",t.event={add:a,remove:u},t.proxy=function(e,i){var r=2 in arguments&&p.call(arguments,2);if(d(e)){var o=function(){return e.apply(i,r?r.concat(p.call(arguments)):arguments)};return o._zid=n(e),o}if(m(i))return r?(r.unshift(e[i],e),t.proxy.apply(null,r)):t.proxy(e[i],e);throw new TypeError("expected function")},t.fn.bind=function(t,n,e){return this.on(t,n,e)},t.fn.unbind=function(t,n){return this.off(t,n)},t.fn.one=function(t,n,e,i){return this.on(t,n,e,i,1)};var E=function(){return!0},x=function(){return!1},N=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,S={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,n,e){return this.on(n,t,e)},t.fn.undelegate=function(t,n,e){return this.off(n,t,e)},t.fn.live=function(n,e){return t(document.body).delegate(this.selector,n,e),this},t.fn.die=function(n,e){return t(document.body).undelegate(this.selector,n,e),this},t.fn.on=function(n,e,i,r,o){var s,c,h=this;return n&&!m(n)?(t.each(n,function(t,n){h.on(t,e,i,n,o)}),h):(m(e)||d(r)||r===!1||(r=i,i=e,e=l),(r===l||i===!1)&&(r=i,i=l),r===!1&&(r=x),h.each(function(l,h){o&&(s=function(t){return u(h,t.type,r),r.apply(this,arguments)}),e&&(c=function(n){var i,o=t(n.target).closest(e,h).get(0);return o&&o!==h?(i=t.extend(f(n),{currentTarget:o,liveFired:h}),(s||r).apply(o,[i].concat(p.call(arguments,1)))):void 0}),a(h,n,r,i,e,c||s)}))},t.fn.off=function(n,e,i){var r=this;return n&&!m(n)?(t.each(n,function(t,n){r.off(t,e,n)}),r):(m(e)||d(i)||i===!1||(i=e,e=l),i===!1&&(i=x),r.each(function(){u(this,n,i,e)}))},t.fn.trigger=function(n,e){return n=m(n)||t.isPlainObject(n)?t.Event(n):c(n),n._args=e,this.each(function(){n.type in b&&"function"==typeof this[n.type]?this[n.type]():"dispatchEvent"in this?this.dispatchEvent(n):t(this).triggerHandler(n,e)})},t.fn.triggerHandler=function(n,i){var r,o;return this.each(function(s,a){r=f(m(n)?t.Event(n):n),r._args=i,r.target=a,t.each(e(a,n.type||n),function(t,n){return o=n.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n){t.fn[n]=function(t){return 0 in arguments?this.bind(n,t):this.trigger(n)}}),t.Event=function(t,n){m(t)||(n=t,t=n.type);var e=document.createEvent(g[t]||"Events"),i=!0;if(n)for(var r in n)"bubbles"==r?i=!!n[r]:e[r]=n[r];return e.initEvent(t,i,!0),c(e)}}(Zepto),function(t,n){function e(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function i(t){return r?r+t:t.toLowerCase()}var r,o,s,a,u,c,f,l,h,p,d="",m={Webkit:"webkit",Moz:"",O:"o"},v=document.createElement("div"),g=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,y={};v.style.transform===n&&t.each(m,function(t,e){return v.style[t+"TransitionProperty"]!==n?(d="-"+t.toLowerCase()+"-",r=e,!1):void 0}),o=d+"transform",y[s=d+"transition-property"]=y[a=d+"transition-duration"]=y[c=d+"transition-delay"]=y[u=d+"transition-timing-function"]=y[f=d+"animation-name"]=y[l=d+"animation-duration"]=y[p=d+"animation-delay"]=y[h=d+"animation-timing-function"]="",t.fx={off:r===n&&v.style.transitionProperty===n,speeds:{_default:400,fast:200,slow:600},cssPrefix:d,transitionEnd:i("TransitionEnd"),animationEnd:i("AnimationEnd")},t.fn.animate=function(e,i,r,o,s){return t.isFunction(i)&&(o=i,r=n,i=n),t.isFunction(r)&&(o=r,r=n),t.isPlainObject(i)&&(r=i.easing,o=i.complete,s=i.delay,i=i.duration),i&&(i=("number"==typeof i?i:t.fx.speeds[i]||t.fx.speeds._default)/1e3),s&&(s=parseFloat(s)/1e3),this.anim(e,i,r,o,s)},t.fn.anim=function(i,r,d,m,v){var b,w,E,x={},N="",S=this,P=t.fx.transitionEnd,C=!1;if(r===n&&(r=t.fx.speeds._default/1e3),v===n&&(v=0),t.fx.off&&(r=0),"string"==typeof i)x[f]=i,x[l]=r+"s",x[p]=v+"s",x[h]=d||"linear",P=t.fx.animationEnd;else{w=[];for(b in i)g.test(b)?N+=b+"("+i[b]+") ":(x[b]=i[b],w.push(e(b)));N&&(x[o]=N,w.push(o)),r>0&&"object"==typeof i&&(x[s]=w.join(", "),x[a]=r+"s",x[c]=v+"s",x[u]=d||"linear")}return E=function(n){if("undefined"!=typeof n){if(n.target!==n.currentTarget)return;t(n.target).unbind(P,E)}else t(this).unbind(P,E);C=!0,t(this).css(y),m&&m.call(this)},r>0&&(this.bind(P,E),setTimeout(function(){C||E.call(S)},1e3*(r+v)+25)),this.size()&&this.get(0).clientLeft,this.css(x),0>=r&&setTimeout(function(){S.each(function(){E.call(this)})},0),this},v=null}(Zepto),function(t){function n(n){return n=t(n),!(!n.width()&&!n.height())&&"none"!==n.css("display")}function e(t,n){t=t.replace(/=#\]/g,'="#"]');var e,i,r=a.exec(t);if(r&&r[2]in s&&(e=s[r[2]],i=r[3],t=r[1],i)){var o=Number(i);i=isNaN(o)?i.replace(/^["']|["']$/g,""):o}return n(t,e,i)}var i=t.zepto,r=i.qsa,o=i.matches,s=t.expr[":"]={visible:function(){return n(this)?this:void 0},hidden:function(){return n(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,n){return t===n.length-1?this:void 0},eq:function(t,n,e){return t===e?this:void 0},contains:function(n,e,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,e){return i.qsa(this,e).length?this:void 0}},a=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),u=/^\s*>/,c="Zepto"+ +new Date;i.qsa=function(n,o){return e(o,function(e,s,a){try{var f;!e&&s?e="*":u.test(e)&&(f=t(n).addClass(c),e="."+c+" "+e);var l=r(n,e)}catch(h){throw console.error("error performing selector: %o",o),h}finally{f&&f.removeClass(c)}return s?i.uniq(t.map(l,function(t,n){return s.call(t,n,l,a)})):l})},i.matches=function(t,n){return e(n,function(n,e,i){return(!n||o(t,n))&&(!e||e.call(t,null,i)===t)})}}(Zepto);