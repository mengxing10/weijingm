const platform = {
    getOS: function(t) {
        var e = this.os = {},
            n = this.browser = {},
            i = t.match(/WebKit\/([\d.]+)/),
            r = t.match(/(Android)\s+([\d.]+)/),
            o = t.match(/(iPad).*OS\s([\d_]+)/),
            a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
            s = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            u = s && t.match(/TouchPad/),
            c = t.match(/Kindle\/([\d.]+)/),
            l = t.match(/Silk\/([\d._]+)/),
            f = t.match(/(BlackBerry).*Version\/([\d.]+)/),
            h = t.match(/(BB10).*Version\/([\d.]+)/),
            p = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            d = t.match(/PlayBook/),
            m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
            v = t.match(/Firefox\/([\d.]+)/);
        (n.webkit = !!i) && (n.version = i[1]),
        r && (e.android = !0, e.version = r[2]),
        a && (e.ios = e.iphone = !0, e.version = a[2].replace(/_/g, ".")),
        o && (e.ios = e.ipad = !0, e.version = o[2].replace(/_/g, ".")),
        s && (e.webos = !0, e.version = s[2]),
        u && (e.touchpad = !0),
        f && (e.blackberry = !0, e.version = f[2]),
        h && (e.bb10 = !0, e.version = h[2]),
        p && (e.rimtabletos = !0, e.version = p[2]),
        d && (n.playbook = !0),
        c && (e.kindle = !0, e.version = c[1]),
        l && (n.silk = !0, n.version = l[1]),
        !l && e.android && t.match(/Kindle Fire/) && (n.silk = !0),
        m && (n.chrome = !0, n.version = m[1]),
        v && (n.firefox = !0, n.version = v[1]),
        e.tablet = !!(o || d || r && !t.match(/Mobile/) || v && t.match(/Tablet/)),
        e.phone = !e.tablet && !!(r || a || s || f || h || m && t.match(/Android/)
            || m && t.match(/CriOS\/([\d.]+)/)
            || v && t.match(/Mobile/))
    }

}

platform.getOS(window.navigator.userAgent)

export const OS = platform.os
export const BROWSER = platform.browser
