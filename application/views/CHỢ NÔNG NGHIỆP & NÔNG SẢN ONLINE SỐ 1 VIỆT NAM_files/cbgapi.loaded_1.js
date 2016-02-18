/* JS */
gapi.loaded_1(function (_) {
    var window = this;
    _.Fn = function () {
        return Math.floor((new Date).getTime() / 1E3)
    };
    var LC, MC;
    _.Vj = function (a, c) {
        this.po = a;
        var f = c || {};
        this.hg = Number(f.maxAge) || 0;
        this.zt = f.domain;
        this.Ei = f.path;
        this.wc = !!f.secure
    };
    LC = /^[-+/_=.:|%&a-zA-Z0-9@]*$/;
    MC = /^[A-Z_][A-Z0-9_]{0,63}$/;
    _.Vj.prototype.read = function () {
        for (var a = this.po + "=", c = window.document.cookie.split(/;\s*/), f = 0; f < c.length; ++f) {
            var g = c[f];
            if (0 == g.indexOf(a)) return g.substr(a.length)
        }
    };
    _.Vj.prototype.write = function (a, c) {
        if (!MC.test(this.po)) throw "Invalid cookie name";
        if (!LC.test(a)) throw "Invalid cookie value";
        var f = this.po + "=" + a;
        this.zt && (f += ";domain=" + this.zt);
        this.Ei && (f += ";path=" + this.Ei);
        var g = "number" === typeof c ? c : this.hg;
        if (0 <= g) {
            var h = new Date;
            h.setSeconds(h.getSeconds() + g);
            f += ";expires=" + h.toUTCString()
        }
        this.wc && (f += ";secure");
        window.document.cookie = f;
        return !0
    };
    _.Vj.prototype.clear = function () {
        this.write("", 0)
    };
    _.Vj.iterate = function (a) {
        for (var c = window.document.cookie.split(/;\s*/), f = 0; f < c.length; ++f) {
            var g = c[f].split("="),
                h = g.shift();
            a(h, g.join("="))
        }
    };
    var Ok;
    _.dk = function (a) {
        this.po = a
    };
    Ok = {};
    _.dk.prototype.read = function () {
        if (Ok.hasOwnProperty(this.po)) return Ok[this.po]
    };
    _.dk.prototype.write = function (a) {
        Ok[this.po] = a;
        return !0
    };
    _.dk.prototype.clear = function () {
        delete Ok[this.po]
    };
    _.dk.iterate = function (a) {
        for (var c in Ok) Ok.hasOwnProperty(c) && a(c, Ok[c])
    };
    var aw, us;
    aw = function () {
        this.po = null;
        this.key = function () {
            return null
        };
        this.getItem = function () {
            return this.po
        };
        this.setItem = function (a, c) {
            this.po = c;
            this.length = 1
        };
        this.removeItem = function () {
            this.clear()
        };
        this.clear = function () {
            this.po = null;
            this.length = 0
        };
        this.length = 0
    };
    us = function (a) {
        try {
            var c = a || window.sessionStorage;
            if (!c) return !1;
            c.setItem("gapi.sessionStorageTest", "gapi.sessionStorageTest" + c.length);
            c.removeItem("gapi.sessionStorageTest");
            return !0
        } catch (f) {
            return !1
        }
    };
    _.fk = function (a, c) {
        this.po = a;
        this.zt = us(c) ? c || window.sessionStorage : new aw
    };
    _.fk.prototype.read = function () {
        return this.zt.getItem(this.po)
    };
    _.fk.prototype.write = function (a) {
        try {
            this.zt.setItem(this.po, a)
        } catch (c) {
            return !1
        }
        return !0
    };
    _.fk.prototype.clear = function () {
        this.zt.removeItem(this.po)
    };
    _.fk.iterate = function (a) {
        if (us())
            for (var c = 0, f = window.sessionStorage.length; c < f; ++c) {
                var g = window.sessionStorage.key(c);
                a(g, window.sessionStorage[g])
            }
    };
    for (var Kh = 0; 64 > Kh; ++Kh);
    _.Yi = "https:" === window.location.protocol;
    _.dj = _.Yi || "http:" === window.location.protocol ? _.Vj : _.dk;
    _.jj = function (a) {
        var c = a.substr(1),
            f = "",
            g = window.location.hostname;
        if ("" !== c) {
            f = (0, window.parseInt)(c, 10);
            if ((0, window.isNaN)(f)) return null;
            c = g.split(".");
            if (c.length < f - 1) return null;
            c.length == f - 1 && (g = "." + g)
        } else g = "";
        return {
            Gb: "S" == a.charAt(0),
            domain: g,
            Ke: f
        }
    };
    var Gi;
    Gi = [".APPS.GOOGLEUSERCONTENT.COM", "@DEVELOPER.GSERVICEACCOUNT.COM"];
    _.fj = function (a) {
        a = a.toUpperCase();
        for (var c = 0, f = Gi.length; c < f; ++c) {
            var g = a.split(Gi[c]);
            2 == g.length && "" === g[1] && (a = g[0])
        }
        a = a.replace(/-/g, "_").toUpperCase();
        40 < a.length && (c = new _.pi, c.bB(a), a = c.Of().toUpperCase());
        return a
    };
    _.wj = function (a) {
        if (0 !== a.indexOf("GCSC")) return null;
        var c = {
            uf: !1
        };
        a = a.substr(4);
        if (!a) return c;
        var f = a.charAt(0);
        a = a.substr(1);
        var g = a.lastIndexOf("_");
        if (-1 == g) return c;
        var h = _.jj(a.substr(g + 1));
        if (null == h) return c;
        a = a.substring(0, g);
        if ("_" !== a.charAt(0)) return c;
        g = "E" === f && h.Gb;
        return !g && ("U" !== f || h.Gb) || g && !_.Yi ? c : {
            uf: !0,
            Gb: g,
            ep: a.substr(1),
            domain: h.domain,
            Ke: h.Ke
        }
    };
    var Bj, Oj, ak, bk, gk;
    Bj = _.r();
    Oj = _.r();
    _.Pj = _.r();
    _.Tj = _.r();
    _.Wj = null;
    ak = "state code cookie_policy g_user_cookie_policy authuser prompt g-oauth-window status".split(" ");
    bk = function (a) {
        this.zt = a;
        this.po = null
    };
    bk.prototype.write = function (a) {
        var c = _.r(),
            f = _.r(),
            g;
        for (g in a) _.Qa(a, g) && (f[g] = a[g], c[g] = a[g]);
        g = 0;
        for (var h = ak.length; g < h; ++g) delete f[ak[g]];
        a = String(a.authuser || 0);
        g = _.r();
        g[a] = _.R.dc("#" + _.ck(f));
        this.zt.write((0, _.mf)(g));
        this.po = c
    };
    bk.prototype.read = function () {
        return this.po
    };
    bk.prototype.clear = function () {
        this.zt.clear();
        this.po = _.r()
    };
    _.ek = function (a) {
        if (!a) return null;
        "single_host_origin" !== a && (a = _.T.Pq(a));
        var c = window.location.hostname,
            f = c,
            g = _.Yi;
        if ("single_host_origin" !== a) {
            f = a.split("://");
            if (2 == f.length) g = "https" === f.shift();
            else return _.kd("WARNING invalid cookie_policy: " + a), null;
            f = f[0]
        }
        if (-1 !== f.indexOf(":")) f = c = "";
        else {
            a = "." + f;
            if (c.lastIndexOf(a) !== c.length - a.length) return _.kd("Invalid cookie_policy domain: " + f), null;
            f = a;
            c = f.split(".").length - 1
        }
        return {
            domain: f,
            Gb: g,
            Ke: c
        }
    };
    gk = function (a) {
        if (!a) return null;
        var c = a.client_id;
        if (!c) return null;
        c = _.fj(c);
        a = _.ek(a.cookie_policy);
        return a ? !_.Yi && a.Gb ? (_.kd("WARNING: https cookie_policy set for http domain"), null) : ["GCSC", a.Gb ? "E" : "U", "_", c, "_", a.Gb ? "S" : "H", a.Ke].join("") : null
    };
    _.hk = function (a) {
        return a ? {
            domain: a.domain,
            path: "/",
            wD: a.Gb
        } : null
    };
    _.ik = function (a) {
        var c = Bj[a];
        c || (c = new bk(new _.dk(a)), Bj[a] = c);
        return {
            Kc: c,
            key: a
        }
    };
    _.jk = function (a, c) {
        var f = c ? Oj : Bj,
            g = c ? _.dj : _.fk,
            h = a && gk(a),
            l = !!h;
        a && !a.g_user_cookie_policy && (g = _.dk, h = "token");
        if (!h)
            if (!c && _.Wj) h = _.Wj;
            else return null;
        var n = f[h];
        if (!n) {
            n = _.wj(h);
            if (!("token" === h || n && n.uf)) return null;
            n = new g(h, _.hk(n));
            c || (n = new bk(n))
        }
        f[h] = n;
        return {
            Kc: n,
            key: h,
            Fj: l
        }
    };
    _.kk = function (a, c, f) {
        a = a && "token" !== a ? _.ik(a) : _.jk();
        if (!a) return null;
        if (f) {
            f = a.Kc;
            _.r();
            var g = f.zt.read();
            f = null;
            try {
                f = (0, _.of)(g)
            } catch (h) {}
            0 == f && (f = null);
            g = _.Dh() || "0";
            g = String(g);
            f = f && f[g]
        } else f = a.Kc.read();
        f && f.expires_at && _.Fn() > f.expires_at && (a.Kc.clear(), f = null);
        f && f.error && !c && (f = null);
        return f
    };
    _.ck = function (a) {
        var c = "";
        if (!a) return c;
        for (var f in a)
            if ({}.hasOwnProperty.call(a, f)) {
                var g;
                g = a[f];
                if (null != g) {
                    var h = [(0, window.encodeURIComponent)(f), "="];
                    if (g instanceof Array) {
                        for (var l = [], n = 0; n < g.length; n++) l.push((0, window.encodeURIComponent)(g[n]));
                        h.push(l.join("+"))
                    } else h.push((0, window.encodeURIComponent)(g));
                    g = h.join("")
                } else g = "";
                g && (c && (c += "&"), c += g)
            }
        return c
    };
    _.fk.iterate(function (a) {
        var c = _.wj(a);
        c && c.uf && (Bj[a] = new bk(new _.fk(a)))
    });
    _.dj.iterate(function (a) {
        Bj[a] && (Oj[a] = new _.dj(a, _.hk(_.wj(a))))
    });

    _.Xj = window.googleapis && window.googleapis.server || {};
    _.Yj = function () {
        var a = /\s*;\s*/;
        return {
            get: function (c, f) {
                for (var g = c + "=", h = (window.document.cookie || "").split(a), l = 0, n; n = h[l]; ++l)
                    if (0 == n.indexOf(g)) return n.substr(g.length);
                return f
            }
        }
    }();
    var cp, dp;
    _.bp = function (a) {
        this.po = a
    };
    cp = /\s*;\s*/;
    _.k = _.bp.prototype;
    _.k.isEnabled = function () {
        return window.navigator.cookieEnabled
    };
    _.k.set = function (a, c, f, g, h, l) {
        if (/[;=\s]/.test(a)) throw Error("O`" + a);
        if (/[;\r\n]/.test(c)) throw Error("aa`" + c);
        _.kf(f) || (f = -1);
        h = h ? ";domain=" + h : "";
        g = g ? ";path=" + g : "";
        l = l ? ";secure" : "";
        f = 0 > f ? "" : 0 == f ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date((0, _.pa)() + 1E3 * f)).toUTCString();
        this.po.cookie = a + "=" + c + h + g + f + l
    };
    _.k.get = function (a, c) {
        for (var f = a + "=", g = (this.po.cookie || "").split(cp), h = 0, l; l = g[h]; h++) {
            if (0 == l.lastIndexOf(f, 0)) return l.substr(f.length);
            if (l == a) return ""
        }
        return c
    };
    _.k.remove = function (a, c, f) {
        var g = _.kf(this.get(a));
        this.set(a, "", 0, c, f);
        return g
    };
    _.k.$b = function () {
        return dp(this).keys
    };
    _.k.Va = function () {
        return dp(this).values
    };
    _.k.isEmpty = function () {
        return !this.po.cookie
    };
    _.k.Da = function () {
        return this.po.cookie ? (this.po.cookie || "").split(cp).length : 0
    };
    _.k.zn = function (a) {
        for (var c = dp(this).values, f = 0; f < c.length; f++)
            if (c[f] == a) return !0;
        return !1
    };
    _.k.clear = function () {
        for (var a = dp(this).keys, c = a.length - 1; 0 <= c; c--) this.remove(a[c])
    };
    dp = function (a) {
        a = (a.po.cookie || "").split(cp);
        for (var c = [], f = [], g, h, l = 0; h = a[l]; l++) g = h.indexOf("="), -1 == g ? (c.push(""), f.push(h)) : (c.push(h.substring(0, g)), f.push(h.substring(g + 1)));
        return {
            keys: c,
            values: f
        }
    };
    _.hp = new _.bp(window.document);
    _.hp.zt = 3950;

    var Hp = function () {
        function a() {
            h[0] = 1732584193;
            h[1] = 4023233417;
            h[2] = 2562383102;
            h[3] = 271733878;
            h[4] = 3285377520;
            w = v = 0
        }

        function c(a) {
            for (var c = n, f = 0; 64 > f; f += 4) c[f / 4] = a[f] << 24 | a[f + 1] << 16 | a[f + 2] << 8 | a[f + 3];
            for (f = 16; 80 > f; f++) a = c[f - 3] ^ c[f - 8] ^ c[f - 14] ^ c[f - 16], c[f] = (a << 1 | a >>> 31) & 4294967295;
            a = h[0];
            for (var g = h[1], l = h[2], q = h[3], t = h[4], v, w, f = 0; 80 > f; f++) 40 > f ? 20 > f ? (v = q ^ g & (l ^ q), w = 1518500249) : (v = g ^ l ^ q, w = 1859775393) : 60 > f ? (v = g & l | q & (g | l), w = 2400959708) : (v = g ^ l ^ q, w = 3395469782), v = ((a << 5 | a >>> 27) & 4294967295) + v + t + w + c[f] & 4294967295,
                t = q, q = l, l = (g << 30 | g >>> 2) & 4294967295, g = a, a = v;
            h[0] = h[0] + a & 4294967295;
            h[1] = h[1] + g & 4294967295;
            h[2] = h[2] + l & 4294967295;
            h[3] = h[3] + q & 4294967295;
            h[4] = h[4] + t & 4294967295
        }

        function f(a, f) {
            if ("string" === typeof a) {
                a = (0, window.unescape)((0, window.encodeURIComponent)(a));
                for (var g = [], h = 0, n = a.length; h < n; ++h) g.push(a.charCodeAt(h));
                a = g
            }
            f || (f = a.length);
            g = 0;
            if (0 == v)
                for (; g + 64 < f;) c(a.slice(g, g + 64)), g += 64, w += 64;
            for (; g < f;)
                if (l[v++] = a[g++], w++, 64 == v)
                    for (v = 0, c(l); g + 64 < f;) c(a.slice(g, g + 64)), g += 64, w += 64
        }

        function g() {
            var a = [],
                g = 8 * w;
            56 > v ? f(q, 56 - v) : f(q, 64 - (v - 56));
            for (var n = 63; 56 <= n; n--) l[n] = g & 255, g >>>= 8;
            c(l);
            for (n = g = 0; 5 > n; n++)
                for (var t = 24; 0 <= t; t -= 8) a[g++] = h[n] >> t & 255;
            return a
        }
        for (var h = [], l = [], n = [], q = [128], t = 1; 64 > t; ++t) q[t] = 0;
        var v, w;
        a();
        return {
            reset: a,
            update: f,
            digest: g,
            Of: function () {
                for (var a = g(), c = "", f = 0; f < a.length; f++) c += "0123456789ABCDEF".charAt(Math.floor(a[f] / 16)) + "0123456789ABCDEF".charAt(a[f] % 16);
                return c
            }
        }
    };
    var Ck = function (a, c, f) {
            if (1 == (_.ea(f) ? 2 : 1)) return Wi([c, a].join(" "));
            var g = [],
                h = [];
            (0, _.Be)(f || [], function (a) {
                h.push(a.key);
                g.push(a.value)
            });
            f = Math.floor((new Date).getTime() / 1E3);
            var l = [],
                l = 0 == g.length ? [f, c, a] : [g.join(":"), f, c, a];
            a = Wi(l.join(" "));
            a = [f, a];
            0 == h.length || a.push(h.join(""));
            return a.join("_")
        },
        Wi = function (a) {
            var c = Hp();
            c.update(a);
            return c.Of().toLowerCase()
        };
    var Ip;
    _.sE = function (a) {
        var c = {
            SAPISIDHASH: !0,
            APISIDHASH: !0
        };
        return a && (a.OriginToken || a.Authorization && c[String(a.Authorization).split(" ")[0]]) ? !0 : !1
    };
    Ip = function () {
        var a = _.D.__OVERRIDE_SID;
        null == a && (a = (new _.bp(window.document)).get("SID"));
        return !!a
    };
    _.Qj = {
        Nq: _.sE,
        er: Ip,
        bq: function () {
            var a = null;
            Ip() && (a = window.__PVT, null == a && (a = _.Yj.get("BEAT")));
            return a
        },
        Qe: function (a) {
            var c = _.Vo(String(_.D.location.href));
            if (Ip()) {
                var f = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:"),
                    c = f ? _.D.__SAPISID : _.D.__APISID;
                null == c && (c = (new _.bp(window.document)).get(f ? "SAPISID" : "APISID"));
                if (c) {
                    var f = f ? "SAPISIDHASH" : "APISIDHASH",
                        g = String(_.D.location.href);
                    return g && c && f ? [f, Ck(_.Vo(g), c, a)].join(" ") : null
                }
            }
            return null
        }
    };

    _.Pb.ft = function (a) {
        var c = [];
        if (1 < arguments.length)
            for (var f = 0, g; g = arguments[f]; ++f) c.push(g);
        else c = a;
        return function (a) {
            for (var f = 0; c[f]; ++f)
                if (a === c[f]) return !0;
            return !1
        }
    };
    _.Pb.Dt = function (a) {
        return function (c) {
            return a.test(c)
        }
    };
    _.Pb.Sn = function (a) {
        return "undefined" !== typeof a
    };
    _.Pb.yt = function (a) {
        return "string" === typeof a && 0 < a.length
    };
    _.Pb.DM = function (a) {
        return "boolean" === typeof a
    };
    _.Pb.rt = function (a) {
        return function (c) {
            for (var f in a)
                if (a.hasOwnProperty(f) && !(0, a[f])(c[f])) return !1;
            return !0
        }
    };

    _.R = _.R || {};
    (function () {
        function a(c) {
            var f = "";
            if (3 == c.nodeType || 4 == c.nodeType) f = c.nodeValue;
            else if (c.innerText) f = c.innerText;
            else if (c.innerHTML) f = c.innerHTML;
            else if (c.firstChild) {
                f = [];
                for (c = c.firstChild; c; c = c.nextSibling) f.push(a(c));
                f = f.join("")
            }
            return f
        }
        _.R.createElement = function (a) {
            var f;
            if (!window.document.body || window.document.body.namespaceURI) try {
                f = window.document.createElementNS("http://www.w3.org/1999/xhtml", a)
            } catch (g) {}
            return f || window.document.createElement(a)
        };
        _.R.Fh = function (a) {
            var f = _.R.createElement("iframe");
            try {
                var g = ["<", "iframe"],
                    h = a || {},
                    l;
                for (l in h) h.hasOwnProperty(l) && (g.push(" "), g.push(l), g.push('="'), g.push(_.R.Qf(h[l])), g.push('"'));
                g.push("></");
                g.push("iframe");
                g.push(">");
                var n = _.R.createElement(g.join(""));
                n && (!f || n.tagName == f.tagName && n.namespaceURI == f.namespaceURI) && (f = n)
            } catch (t) {}
            g = f;
            a = a || {};
            for (var q in a) a.hasOwnProperty(q) && (g[q] = a[q]);
            return f
        };
        _.R.Jk = function () {
            if (window.document.body) return window.document.body;
            try {
                var a = window.document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "body");
                if (a && 1 == a.length) return a[0]
            } catch (f) {}
            return window.document.documentElement || window.document
        };
        _.R.Qt = function (c) {
            return a(c)
        }
    })();

    _.R = _.R || {};
    (function () {
        function a(a) {
            c = a["core.util"] || {}
        }
        var c = {},
            f = {};
        _.Pb && _.Pb.register("core.util", null, a);
        _.R.Nt = function (a) {
            return "undefined" === typeof c[a] ? null : c[a]
        };
        _.R.hasFeature = function (a) {
            return "undefined" !== typeof c[a]
        };
        _.R.Rt = function () {
            return f
        }
    })();

    var xk, Qk, Dp, Sn, Cp;
    xk = function (a) {
        return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    };
    _.Qn = function (a) {
        a = String(a);
        if (xk(a)) try {
            return eval("(" + a + ")")
        } catch (c) {}
        throw Error("G`" + a);
    };
    _.PC = function (a) {
        return _.cm(new _.zp(void 0), a)
    };
    _.zp = function (a) {
        this.po = a
    };
    _.cm = function (a, c) {
        var f = [];
        Qk(a, c, f);
        return f.join("")
    };
    Qk = function (a, c, f) {
        if (null == c) f.push("null");
        else {
            if ("object" == typeof c) {
                if (_.ea(c)) {
                    var g = c;
                    c = g.length;
                    f.push("[");
                    for (var h = "", l = 0; l < c; l++) f.push(h), h = g[l], Qk(a, a.po ? a.po.call(g, String(l), h) : h, f), h = ",";
                    f.push("]");
                    return
                }
                if (c instanceof String || c instanceof Number || c instanceof Boolean) c = c.valueOf();
                else {
                    f.push("{");
                    l = "";
                    for (g in c) Object.prototype.hasOwnProperty.call(c, g) && (h = c[g], "function" != typeof h && (f.push(l), Cp(g, f), f.push(":"), Qk(a, a.po ? a.po.call(c, g, h) : h, f), l = ","));
                    f.push("}");
                    return
                }
            }
            switch (typeof c) {
                case "string":
                    Cp(c,
                        f);
                    break;
                case "number":
                    f.push((0, window.isFinite)(c) && !(0, window.isNaN)(c) ? String(c) : "null");
                    break;
                case "boolean":
                    f.push(String(c));
                    break;
                case "function":
                    f.push("null");
                    break;
                default:
                    throw Error("H`" + typeof c);
            }
        }
    };
    Dp = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    };
    Sn = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    Cp = function (a, c) {
        c.push('"', a.replace(Sn, function (a) {
            var c = Dp[a];
            c || (c = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Dp[a] = c);
            return c
        }), '"')
    };

    _.OA = function (a, c) {
        _.Hh.call(this);
        this.zt = a || 1;
        this.po = c || _.D;
        this.Ei = (0, _.H)(this.bM, this);
        this.hg = (0, _.pa)()
    };
    _.J(_.OA, _.Hh);
    _.k = _.OA.prototype;
    _.k.enabled = !1;
    _.k.Oh = null;
    _.k.setInterval = function (a) {
        this.zt = a;
        this.Oh && this.enabled ? (_.PA(this), this.start()) : this.Oh && _.PA(this)
    };
    _.k.bM = function () {
        if (this.enabled) {
            var a = (0, _.pa)() - this.hg;
            0 < a && a < .8 * this.zt ? this.Oh = this.po.setTimeout(this.Ei, this.zt - a) : (this.Oh && (this.po.clearTimeout(this.Oh), this.Oh = null), this.dispatchEvent("tick"), this.enabled && (this.Oh = this.po.setTimeout(this.Ei, this.zt), this.hg = (0, _.pa)()))
        }
    };
    _.k.start = function () {
        this.enabled = !0;
        this.Oh || (this.Oh = this.po.setTimeout(this.Ei, this.zt), this.hg = (0, _.pa)())
    };
    _.PA = function (a) {
        a.enabled = !1;
        a.Oh && (a.po.clearTimeout(a.Oh), a.Oh = null)
    };
    _.OA.prototype.wj = function () {
        _.OA.T.wj.call(this);
        _.PA(this);
        delete this.po
    };
    _.Rn = function (a, c, f) {
        if (_.vd(a)) f && (a = (0, _.H)(a, f));
        else if (a && "function" == typeof a.handleEvent) a = (0, _.H)(a.handleEvent, a);
        else throw Error("t");
        return 2147483647 < c ? -1 : _.D.setTimeout(a, c || 0)
    };
    _.Pt = function (a) {
        _.D.clearTimeout(a)
    };

    var ch, rv, Bv, nw;
    _.yx = function (a) {
        for (var c = [], f = 0, g = 0; f < a.length;) {
            var h = a[f++];
            if (128 > h) c[g++] = String.fromCharCode(h);
            else if (191 < h && 224 > h) {
                var l = a[f++];
                c[g++] = String.fromCharCode((h & 31) << 6 | l & 63)
            } else if (239 < h && 365 > h) {
                var l = a[f++],
                    n = a[f++],
                    q = a[f++],
                    h = ((h & 7) << 18 | (l & 63) << 12 | (n & 63) << 6 | q & 63) - 65536;
                c[g++] = String.fromCharCode(55296 + (h >> 10));
                c[g++] = String.fromCharCode(56320 + (h & 1023))
            } else l = a[f++], n = a[f++], c[g++] = String.fromCharCode((h & 15) << 12 | (l & 63) << 6 | n & 63)
        }
        return c.join("")
    };
    _.tv = null;
    ch = null;
    rv = _.df || _.ef || _.cf;
    _.sv = rv || "function" == typeof _.D.btoa;
    Bv = rv || !_.W && "function" == typeof _.D.atob;
    _.MA = function (a, c) {
        if (Bv && !c) return _.D.atob(a);
        var f = "";
        nw(a, function (a) {
            f += String.fromCharCode(a)
        });
        return f
    };
    _.Ks = function (a) {
        var c = [];
        nw(a, function (a) {
            c.push(a)
        });
        return c
    };
    nw = function (a, c) {
        function f() {
            for (; g < a.length;) {
                var c = a.charAt(g++),
                    f = ch[c];
                if (null != f) return f;
                if (!_.im(c)) throw Error("Sa`" + c);
            }
            return null
        }
        _.vi();
        for (var g = 0;;) {
            var h = f(),
                l = f(),
                n = f(),
                q = f();
            if (null == q) {
                if (null == h) break;
                q = 64;
                n = null != n ? n : 64;
                l = null != l ? l : 0
            }
            c(h << 2 | l >> 4);
            64 != n && (c(l << 4 & 240 | n >> 2), 64 != q && c(n << 6 & 192 | q))
        }
    };
    _.vi = function () {
        if (!_.tv) {
            _.tv = {};
            ch = {};
            for (var a = 0; 65 > a; a++) _.tv[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), ch[_.tv[a]] = a, 62 <= a && (ch["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
        }
    };

    _.rF = function (a) {
        this.po = a
    };
    _.rF.prototype.toString = function () {
        return this.po
    };
    _.fp = function (a) {
        _.dh.call(this);
        this.Ph = 1;
        this.hg = [];
        this.wc = 0;
        this.po = [];
        this.zt = {};
        this.Na = Boolean(a)
    };
    _.J(_.fp, _.dh);
    _.fp.prototype.subscribe = _.b(31);
    _.fp.prototype.zf = function (a) {
        var c = this.po[a];
        if (c) {
            var f = this.zt[c];
            0 != this.wc ? (this.hg.push(a), this.po[a + 1] = _.gh) : (f && _.xe(f, a), delete this.po[a], delete this.po[a + 1], delete this.po[a + 2])
        }
        return !!c
    };
    _.fp.prototype.Ei = function (a, c) {
        var f = this.zt[a];
        if (f) {
            for (var g = Array(arguments.length - 1), h = 1, l = arguments.length; h < l; h++) g[h - 1] = arguments[h];
            if (this.Na)
                for (h = 0; h < f.length; h++) {
                    var n = f[h];
                    iN(this.po[n + 1], this.po[n + 2], g)
                } else {
                    this.wc++;
                    try {
                        for (h = 0, l = f.length; h < l; h++) n = f[h], this.po[n + 1].apply(this.po[n + 2], g)
                    } finally {
                        if (this.wc--, 0 < this.hg.length && 0 == this.wc)
                            for (; f = this.hg.pop();) this.zf(f)
                    }
                }
            return 0 != h
        }
        return !1
    };
    var iN = function (a, c, f) {
        _.Qp(function () {
            a.apply(c, f)
        })
    };
    _.fp.prototype.clear = function (a) {
        if (a) {
            var c = this.zt[a];
            c && ((0, _.Be)(c, this.zf, this), delete this.zt[a])
        } else this.po.length = 0, this.zt = {}
    };
    _.fp.prototype.Da = function (a) {
        if (a) {
            var c = this.zt[a];
            return c ? c.length : 0
        }
        a = 0;
        for (c in this.zt) a += this.Da(c);
        return a
    };
    _.fp.prototype.wj = function () {
        _.fp.T.wj.call(this);
        this.clear();
        this.hg.length = 0
    };
    _.lH = function (a) {
        _.dh.call(this);
        this.po = new _.fp(a);
        _.pD(this, this.po)
    };
    _.J(_.lH, _.dh);
    _.lH.prototype.subscribe = _.b(30);
    _.lH.prototype.zf = function (a) {
        return this.po.zf(a)
    };
    _.lH.prototype.clear = function (a) {
        this.po.clear(_.kf(a) ? a.toString() : void 0)
    };
    _.lH.prototype.Da = function (a) {
        return this.po.Da(_.kf(a) ? a.toString() : void 0)
    };

    _.Au = function () {
        _.wu = "oauth2relay" + String(2147483647 * (0, _.Vb)() | 0);
        _.Qt.proxy = _.wu
    };
    _.Bu = new _.lH;
    _.mH = new _.rF("oauth");
    _.Qt = {};
    _.Au();
    var Cx = _.P("oauth-flow/client_id");
    _.Qt.client_id = Cx;
    var V_ = _.Qt,
        u0;
    var z0 = String(_.P("oauth-flow/redirectUri"));
    if (z0) u0 = z0.replace(/[#][\s\S]*/, "");
    else {
        var W0 = _.Rb.Pq(window.location.href);
        u0 = [_.P("oauth-flow/callbackUrl"), "?x_origin=", (0, window.encodeURIComponent)(W0)].join("")
    }
    V_.redirect_uri = u0;
    _.Qt.origin = _.Rb.Pq(window.location.href);
    _.Qt.response_type = "token";

    var ku = _.V.Mo,
        iw = {
            open: function (a) {
                var c = _.bf(a.va());
                return a.Pa(c, {
                    style: _.gf(c)
                })
            },
            attach: function (a, c) {
                var f = _.bf(a.va()),
                    g = c.id,
                    h = c.getAttribute("data-postorigin") || c.src,
                    l = /#(?:.*&)?rpctoken=(\d+)/.exec(h),
                    l = l && l[1];
                a.id = g;
                a.zt = l;
                a.Ei = f;
                a.po = c;
                _.V.Uc[g] = a;
                l = _.sc(a.methods);
                l._ready = a.Jg;
                l._close = a.close;
                l._open = a.HB;
                l._resizeMe = a.Ug;
                l._renderstart = a.PA;
                _.tc(l, g, "", a, !0);
                _.T.Wg(a.id, a.zt);
                _.T.Xg(a.id, h);
                var f = _.V.Wp({
                        style: _.gf(f)
                    }),
                    n;
                for (n in f) Object.prototype.hasOwnProperty.call(f, n) && ("style" == n ? a.po.style.cssText = f[n] : a.po.setAttribute(n, f[n]))
            }
        };
    iw.onready = _.hf;
    iw.onRenderStart = _.hf;
    iw.close = _.jf;
    ku("inline", iw);

    var Sv, Rv, Tv, ZM, Vv, Wv, Xv, Yv, Zv, hw, lw, mw, PZ, yE, Es, ow, pw, zv, vw, ww, yw, Fs, Iw, Jw, Kw, Mw, Nw, vE, Rw, MD, Pw, ND, Ow, Sw, rE, Tw, Uw, Vw, Ww, Zw, $w, ax, bx, cx, dx, ex, fx, ix, gx, jx, kx, lx, ox;
    _.fp.prototype.subscribe = _.d(31, function (a, c, f) {
        var g = this.zt[a];
        g || (g = this.zt[a] = []);
        var h = this.Ph;
        this.po[h] = a;
        this.po[h + 1] = c;
        this.po[h + 2] = f;
        this.Ph = h + 3;
        g.push(h);
        return h
    });
    _.lH.prototype.subscribe = _.d(30, function (a, c, f) {
        return this.po.subscribe(a.toString(), c, f)
    });
    _.Bt = function (a, c, f, g) {
        if (c = a.zt[c]) {
            var h = a.po;
            (c = _.ue(c, function (a) {
                return h[a + 1] == f && h[a + 2] == g
            })) && a.zf(c)
        }
    };
    Sv = function (a) {
        var c = Rv;
        _.Nk(c, [{
            Rr: "-webkit-transform",
            duration: 1,
            timing: "ease",
            Le: 0
        }]);
        _.Nk(c, [{
            Rr: "transform",
            duration: 1,
            timing: "ease",
            Le: 0
        }]);
        _.Rn(function () {
            c.style.webkitTransform = "translate3d(0px," + a + "px,0px)";
            c.style.transform = "translate3d(0px," + a + "px,0px)"
        }, 0)
    };
    ZM = function (a) {
        var c = _.ek(a);
        if (!c) return new _.dk("G_USERSTATE_");
        a = ["G_USERSTATE_", _.Yi && c.Gb ? "S" : "H", c.Ke].join("");
        var f = _.Tj[a];
        f || (f = {
            Fr: 63072E3
        }, _.Sl(_.hk(c), f), f = new _.Vj(a, f), _.Tj[a] = f, c = f.read(), "undefined" !== typeof c && null !== c && (window.document.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/", f.write(c)));
        return f
    };
    Vv = function (a) {
        a = a && a.id_token;
        if (!a || !a.split(".")[1]) return null;
        a = (a.split(".")[1] + "...").replace(/^((....)+).?.?.?$/, "$1");
        return _.Qn(_.MA(a, !0))
    };
    Wv = function () {
        Rv.parentNode.removeChild(Rv)
    };
    Xv = function () {
        var a = Tv + 88;
        Sv(a);
        Tv = a
    };
    Yv = function () {
        var a = Tv - 88;
        Sv(a);
        Tv = a
    };
    Zv = function (a) {
        var c = ZM(a).read();
        a = _.r();
        if (c)
            for (var c = c.split(":"), f; f = c.shift();) f = f.split("="), a[f[0]] = f[1];
        return a
    };
    hw = function (a) {
        if (!a) return [];
        a = a.split("=");
        return a[1] ? a[1].split("|") : []
    };
    lw = function (a) {
        return (a = Vv(a)) ? a.sub : null
    };
    mw = function (a) {
        var c = a ? Xv : Yv,
            f = a ? Yv : Xv;
        a = a ? "-" : "";
        Tv = (0, window.parseInt)(a + 88, 10);
        Rv.style.webkitTransform = "translate3d(0px," + a + 88 + "px,0px)";
        Rv.style.transform = "translate3d(0px," + a + 88 + "px,0px)";
        Rv.style.display = "";
        Rv.style.visibility = "visible";
        c();
        _.Rn(f, 4E3);
        _.Rn(Wv, 5E3)
    };
    PZ = function () {
        var a, c = null;
        _.dj.iterate(function (f, g) {
            if (0 === f.indexOf("G_AUTHUSER_")) {
                var h = _.jj(f.substring(11));
                if (!a || h.Gb && !a.Gb || h.Gb == a.Gb && h.Ke > a.Ke) a = h, c = g
            }
        });
        return {
            fU: a,
            $t: c
        }
    };
    yE = function (a) {
        a = a.split(":");
        return {
            zC: a[0].split("=")[1],
            EL: hw(a[1]),
            DP: hw(a[2]),
            fP: hw(a[3])
        }
    };
    Es = function (a) {
        a = _.ek(a);
        if (!a || a.Gb && !_.Yi) return null;
        var c = ["G_AUTHUSER_", _.Yi && a.Gb ? "S" : "H", a.Ke].join(""),
            f = _.Pj[c];
        f || (f = new _.dj(c, _.hk(a)), _.Pj[c] = f);
        return f
    };
    ow = function (a) {
        var c = lw(a);
        c ? (a = Zv(a.cookie_policy), c = "0" == a[c] || "X" == a[c]) : c = !1;
        return c
    };
    pw = function (a) {
        var c = _.P("oauth-flow/toast/position");
        "top" !== c && (c = "bottom");
        var f = window.document.createElement("div");
        Rv = f;
        f.style.cssText = "position:fixed;left:0px;z-index:1000;width:100%;";
        var g;
        _.Mg(f, "visibility", "hidden");
        _.Mg(f, c, "-40px");
        _.Mg(f, "height", "128px");
        g = f;
        if ("desktop" == _.P("deviceType")) {
            g = window.document.createElement("div");
            g.style.cssText = "float:left;position:relative;left:50%;";
            f.appendChild(g);
            var h = window.document.createElement("div");
            h.style.cssText = "float:left;position:relative;left:-50%";
            g.appendChild(h);
            g = h
        }
        h = "top" == c ? "-" : "";
        Tv = (0, window.parseInt)(h + 88, 10);
        Rv.style.webkitTransform = "translate3d(0px," + h + 88 + "px,0px)";
        Rv.style.transform = "translate3d(0px," + h + 88 + "px,0px)";
        h = window;
        try {
            for (; h.parent != h && h.parent.document;) h = h.parent
        } catch (l) {}
        h = h.document.body;
        try {
            h.insertBefore(f, h.firstChild)
        } catch (l) {}
        _.Sm.cj({
            url: ":socialhost:/:session_prefix:_/widget/oauthflow/toast",
            queryParams: {
                clientId: a.client_id,
                idToken: a.id_token
            },
            where: g,
            onRestyle: function () {
                "top" === c ? mw(!0) : mw(!1)
            }
        })
    };
    zv = !1;
    vw = !1;
    _.gz = function (a) {
        _.La(a) && _.wc(a)
    };
    yw = function (a) {
        var c = PZ(),
            f = c.fU,
            c = c.$t,
            g = a && _.fj(a);
        if (null !== c) {
            var h;
            _.dj.iterate(function (a, c) {
                var l = _.wj(a);
                l && l.uf && (g && l.ep != g || l.Gb == f.Gb && l.Ke == f.Ke && (h = c))
            });
            if (h) {
                var l = yE(h);
                a = l && l.EL[Number(c)];
                l = l && l.zC;
                if (a) return {
                    $t: c,
                    ZP: a,
                    zC: l
                }
            }
        }
        return null
    };
    Fs = function (a) {
        a = Es(a.g_user_cookie_policy);
        _.Fa("googleapis.config/sessionIndex", null);
        a.clear()
    };
    Iw = function (a) {
        return "true" === String(a.immediate)
    };
    Jw = function (a, c) {
        var f = null;
        if (a && c) {
            f = c.client_id = c.client_id || a.client_id;
            c.scope = c.scope || a.scope;
            c.g_user_cookie_policy = a.cookie_policy;
            c.cookie_policy = c.cookie_policy || a.cookie_policy;
            c.response_type = c.response_type || a.response_type;
            var g = _.P("iframes/signin/iframeType");
            !zv && c.error && Iw(a) && (_.gz("gapi.signin.impression." + g + "." + f), zv = !0)
        }
        c && (c.issued_at || (c.issued_at = String(_.Fn())), g = (0, window.parseInt)(c.expires_in, 10) || 86400, c.error && (g = _.P("oauth-flow/errorMaxAge") || 86400), c.expires_in =
            String(g), c.expires_at || (c.expires_at = String(_.Fn() + g)), a && Iw(a) || (c["g-oauth-window"] = (ww || {}).popup), c._aa || c.error || null != yw(f) || !Iw(a) || (c._aa = "1"), f = c.status = {}, f.google_logged_in = !!c.session_state, g = f.signed_in = !!c.access_token, f.method = g ? c["g-oauth-window"] ? "PROMPT" : "AUTO" : null);
        return c
    };
    Kw = {};
    _.Lw = function (a, c) {
        var f, g;
        "string" == typeof a ? (f = c, g = a) : (f = a, g = "token");
        if (f) {
            var h = _.jk(f, !0);
            if (h) {
                var l;
                if ((l = f) && l.session_state) {
                    var n = [],
                        q = [],
                        t = [],
                        v = (0, window.parseInt)(l.authuser, 10) || 0;
                    n[v] = l.session_state;
                    q[v] = l.issued_at;
                    t[v] = l.expires_at;
                    l = ["C=" + l.client_id, "S=" + n.join("|"), "I=" + q.join("|"), "X=" + t.join("|")].join(":")
                } else l = null;
                l && h.Kc.write(l);
                "token" == g && (h = Es(f.g_user_cookie_policy)) && (f.error ? Fs(f) : f.session_state && h.write(f.authuser || "0"))
            }
        }
        if (g = "token" !== g ? _.ik(g) : _.jk(f))
            if (f) {
                if (g.Kc.write(f), !_.Wj || g.Fj && "token" !== _.Wj) _.Wj = g.key
            } else g.Kc.clear(), _.Wj = null;
        _.kk(void 0, void 0)
    };
    Mw = function (a, c) {
        var f = c && c.key || "token",
            g = a = Jw(c && c.params, a);
        !ow(g) && 0 <= (" " + (g.scope || "") + " ").indexOf(" https://www.googleapis.com/auth/plus.login ") && _.P("isLoggedIn") && "1" === g._aa && (g._aa = "0", vw || (vw = !0, pw(g)));
        _.Lw(f, a);
        a = _.kk(f, void 0);
        if (c) {
            f = c.popup;
            g = c.after_redirect;
            if (f && "keep_open" != g) try {
                f.close()
            } catch (h) {}
            c.callback && (c.callback(a), c.callback = null)
        }
    };
    Nw = {};
    vE = function () {
        return !!_.P("oauth-flow/usegapi")
    };
    Rw = function (a) {
        var c = _.wu;
        return function (f) {
            if (this.f == c && this.t == _.T.Wd(this.f) && this.origin == _.T.$d(this.f)) return a.apply(this, arguments)
        }
    };
    MD = null;
    Pw = [];
    ND = function (a, c, f) {
        vE() ? MD.register(a, f, _.Vz) : _.T.register(a + ":" + c, Rw(f))
    };
    Ow = {};
    Sw = 0;
    rE = function (a) {
        a && Pw.push(a);
        a = _.wu;
        var c = window.document.getElementById(a),
            f = (new Date).getTime();
        if (c) {
            if (Sw && 6E4 > f - Sw) return;
            c.parentNode.removeChild(c);
            if (/Firefox/.test(window.navigator.userAgent)) try {
                window.frames[a] = void 0
            } catch (l) {}
            _.Au();
            a = _.wu
        }
        Sw = f;
        var g = String(2147483647 * (0, _.Vb)() | 0),
            c = _.P("oauth-flow/proxyUrl") || _.P("oauth-flow/relayUrl");
        if (vE()) MD = _.Sm.cj({
            where: _.R.Jk(),
            url: c,
            id: a,
            attributes: {
                style: {
                    width: "1px",
                    height: "1px",
                    position: "absolute",
                    top: "-100px"
                }
            },
            dontclear: !0
        });
        else {
            var c = [c, "?parent=", (0, window.encodeURIComponent)(_.Rb.Pq(window.location.href)), "#rpctoken=", g, "&forcesecure=1"].join(""),
                f = _.R.Jk(),
                h = _.R.Fh({
                    name: a,
                    id: a
                });
            h.src = c;
            h.style.width = "1px";
            h.style.height = "1px";
            h.style.position = "absolute";
            h.style.top = "-100px";
            h.tabIndex = "-1";
            f.appendChild(h);
            _.T.tf(a)
        }
        ND("oauth2relayReady", g, function () {
            vE() ? MD.unregister("oauth2relayReady") : _.T.unregister("oauth2relayReady:" + g);
            var a = Pw;
            if (null !== a) {
                Pw = null;
                for (var c = 0, f = a.length; c < f; c++) a[c]()
            }
        });
        ND("oauth2callback", g, function (a) {
            var c =
                _.R.dc;
            a = c(a);
            var c = a.state,
                f;
            f = c.replace(/\|.*$/, "");
            a.state = {}.hasOwnProperty.call(Kw, f) ? Kw[f] : null;
            null != a.state && (f = Nw[c], delete Nw[c], Mw(a, f))
        })
    };
    Tw = function (a) {
        var c = {
            error: "user_signed_out"
        };
        c.client_id = a.client_id;
        c.g_user_cookie_policy = a.g_user_cookie_policy;
        c.scope = a.scope;
        c.response_type = a.response_type;
        c.session_state = a.session_state;
        return Jw(null, c)
    };
    Uw = function (a, c) {
        var f = a || {},
            g;
        for (g in _.Qt) _.kf(f[g]) || (f[g] = _.Qt[g]);
        a = f;
        f = _.P("googleapis/overrideClientId");
        null != f && (a.client_id = f);
        if (!a.redirect_uri || "postmessage" === a.redirect_uri) {
            f = a;
            g = a.state || "";
            g = String(g);
            var h = "";
            if ({}.hasOwnProperty.call(Ow, g)) h = Ow[g];
            else {
                for (var l = 2147483647 * (0, _.Vb)() | 0;;) {
                    h = String(l);
                    if (!{}.hasOwnProperty.call(Kw, h)) break;
                    l += (0, _.Vb)()
                }
                Kw[h] = g;
                Ow[g] = h
            }
            f.state = h + "|" + (0, _.Vb)();
            Nw[a.state] = c
        }
        f = a.authorize_uri || _.P("oauth-flow/authUrl");
        delete a.authorize_uri;
        f +=
            0 < f.indexOf("?") ? "&" : "?";
        f += _.ck(a);
        f = _.Xb(f);
        g = _.P("iframes/signin/iframeType");
        "blue" == g ? f += "&e=3100070" : "red" == g ? f += "&e=3100071" : "default" == g && (f += "&e=3100077");
        return f
    };
    Vw = function (a) {
        var c = _.Xu(),
            f = c && c.scope,
            c = a && a.scope,
            c = "string" === typeof c ? c.split(" ") : c || [];
        if (f) {
            for (var f = f.split(" "), g = 0; g < f.length; ++g) {
                var h = f[g]; - 1 == _.xd.call(c, h) && c.push(h)
            }
            0 < c.length && (a.scope = c.join(" "))
        }
        return a
    };
    Ww = function (a) {
        if (!_.kf(a.include_granted_scopes)) {
            var c = _.P("include_granted_scopes"),
                f = _.Xu().include_granted_scopes;
            _.kf(c) ? a.include_granted_scopes = !!c : _.kf(f) && (a.include_granted_scopes = "1" == f || "true" == f)
        }
        return a
    };
    _.Xw = function (a) {
        null === Pw ? a && a() : rE(a)
    };
    Zw = function (a, c, f, g) {
        var h = Zv(f),
            l = h[a];
        h[a] = c ? "0" : "1";
        var n = [];
        _.fb(h, function (a, c) {
            n.push(c + "=" + a)
        });
        c = n.join(":");
        f = ZM(f);
        c ? f.write(c) : f.clear();
        h[a] !== l && g && g()
    };
    $w = function (a, c) {
        for (var f = a.split(" "), g = c.split(" "), h = _.r(), l = 0, n = g.length; l < n; ++l) g[l] && (h[g[l]] = 1);
        l = 0;
        for (n = f.length; l < n; ++l)
            if (f[l] && !h[f[l]]) return !1;
        return !0
    };
    ax = function (a) {
        if (!a) return null;
        var c, f, g = _.fj(a);
        _.fk.iterate(function (a) {
            var l = _.wj(a);
            l && l.uf && l.ep === g && (!c || l.Gb && !c.Gb || l.Gb == c.Gb && l.Ke > c.Ke) && (c = l, f = a)
        });
        return f
    };
    bx = function (a) {
        if (vE()) {
            var c = _.Sm.cj({
                where: _.R.Jk(),
                url: a.uri,
                attributes: {
                    style: {
                        width: "1px",
                        height: "1px",
                        position: "absolute",
                        top: "-100px"
                    }
                },
                dontclear: !0
            });
            window.setTimeout(function () {
                c.close()
            }, 3E5)
        } else {
            var f = _.R.Jk(),
                c = _.R.Fh();
            c.src = a.uri;
            c.style.width = "1px";
            c.style.height = "1px";
            c.style.position = "absolute";
            c.style.top = "-100px";
            window.setTimeout(function () {
                c.parentNode && c.parentNode.removeChild(c)
            }, 3E5);
            f.appendChild(c)
        }
    };
    cx = function (a, c) {
        if (ww) {
            var f = ww.popup,
                g = ww.after_redirect;
            if (f && "keep_open" != g && !Iw(a)) try {
                f.close()
            } catch (h) {}
        }
        f = ww = {};
        "key" in a && (f.key = a.key, delete a.key);
        a = Ww(a);
        f.params = Vw(a);
        f.callback = function (f) {
            Iw(a) || !f || f.error || Zw(lw(f), !1, f.cookie_policy);
            ow(f) && Iw(a) && (f = Tw(f));
            (c || function () {})(Jw(a, f))
        };
        f.uri = Uw(a, f);
        return f
    };
    dx = function (a, c) {
        _.Xw(function () {
            vE() ? MD.send("check_session_state", {
                session_state: a.session_state,
                client_id: a.client_id
            }, function (a) {
                c.call(null, a[0])
            }, _.Vz) : _.T.call(_.wu, "check_session_state", Rw(function (a) {
                c.call(null, a)
            }), a.session_state, a.client_id)
        })
    };
    ex = function (a) {
        a = _.R.dc("#" + _.ck(a));
        if (!Iw(a)) return null;
        var c = a.key || ax(a.client_id);
        return (c = _.kk(c, !0, !0)) && c.client_id === a.client_id && $w(a.scope, c.scope) && $w(a.response_type, c.response_type) ? c : null
    };
    fx = function (a, c) {
        var f = _.R.dc();
        a.hl = f.lang || f.hl || _.P("lang");
        var g = cx(a, c);
        a.after_redirect && (g.after_redirect = a.after_redirect);
        if (null != a.scope && null != a.client_id) {
            var h = function () {
                    _.Xw(function () {
                        if (g.popup) g.popup.focus();
                        else if (Iw(a)) bx(g);
                        else {
                            var c = Math.min(_.P("oauth-flow/authWindowWidth", 650), window.screen.width - 20),
                                f = Math.min(_.P("oauth-flow/authWindowHeight", 600), window.screen.height - 30);
                            ww.popup = window.open(g.uri, "_blank", ["toolbar=no", "location=" + (window.opera ? "no" : "yes"), "directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no",
"width=" + c, "height=" + f, "top=" + (window.screen.height - f) / 2, "left=" + (window.screen.width - c) / 2].join())
                        }
                    })
                },
                l = ex(a);
            !_.P("oauth-flow/disableOpt") && l ? dx(l, function (a) {
                a ? Mw(l, ww) : h()
            }) : h()
        } else Mw(null, ww), _.kd("Unable to perform authorization: scope and/or client_idparameters missing.")
    };
    ix = function (a) {
        a || (a = _.kk(void 0, !0));
        a && "object" === typeof a || (a = {
            error: "invalid_request",
            error_description: "no callback data"
        });
        var c = a.error_description;
        c && window.console && (window.console.error(a.error), window.console.error(c));
        a.error || (_.bb.drw = null);
        _.Lw(a);
        if (c = a.authuser) _.P("googleapis.config/sessionIndex"), _.Fa("googleapis.config/sessionIndex", c);
        _.Bu.po.Ei(_.mH.toString(), a);
        return a
    };
    gx = function (a, c) {
        var f = a || {},
            g = c || function () {};
        if (_.P("oauth-flow/disableOpt") || _.P("isLoggedIn") || !Iw(f)) fx(f, g);
        else {
            var h = _.r();
            h.client_id = f.client_id;
            h.session_state = null;
            dx(h, function (a) {
                a ? (a = _.r(), a.error = "immediate_failed_user_logged_out", g(Jw(f, a))) : (_.Fa("isLoggedIn", !0), fx(f, g))
            })
        }
    };
    jx = function (a, c) {
        var f = lw(a);
        f && (Fs(a), Zw(f, !0, c, function () {
            ix && ix(Tw(a))
        }))
    };
    _.hx = function (a, c) {
        var f = new _.C(function (c, f) {
            var l = function (a) {
                null == a || a.error ? f(a) : c(a)
            };
            try {
                gx(a, l)
            } catch (n) {
                f(n)
            }
        });
        c && f.then(c, function (a) {
            c(ix(a))
        });
        return f
    };
    _.nH = function (a) {
        _.Kd && (_.Kd.error ? _.Kd.error(a) : _.Kd.log && _.Kd.log(a))
    };
    kx = _.Qj.Qe;
    lx = null;
    _.px = function (a, c) {
        if ("force" !== a.approvalprompt) {
            var f = _.nx(a);
            f.immediate = !0;
            delete f.redirect_uri;
            delete f.approval_prompt;
            var g;
            if (g = !c) lx ? (f.client_id !== lx.client_id && window.console && window.console.log && window.console.log("Ignoring mismatched page-level auth param client_id=" + f.client_id), g = !0) : (lx = f, g = !1);
            g || ox(f)
        }
    };
    _.nx = function (a) {
        var c = a.redirecturi || "postmessage",
            f = (0, _.Ge)((a.scope || "").replace(/[\s\xa0]+/g, " ")),
            c = {
                client_id: a.clientid,
                redirect_uri: c,
                response_type: "code token id_token gsession",
                scope: f
            };
        a.approvalprompt && (c.approval_prompt = a.approvalprompt);
        a.state && (c.state = a.state);
        a.openidrealm && (c["openid.realm"] = a.openidrealm);
        f = "offline" == a.accesstype ? !0 : (f = a.redirecturi) && "postmessage" != f;
        f && (c.access_type = "offline");
        a.requestvisibleactions && (c.request_visible_actions = (0, _.Ge)(a.requestvisibleactions.replace(/[\s\xa0]+/g,
            " ")));
        a.after_redirect && (c.after_redirect = a.after_redirect);
        a.cookiepolicy && "none" !== a.cookiepolicy && (c.cookie_policy = a.cookiepolicy);
        "none" === a.cookiepolicy && _.gz("gapi.signin.cpnone");
        "undefined" != typeof a.includegrantedscopes && (c.include_granted_scopes = a.includegrantedscopes);
        a.e && (c.e = a.e);
        (a = a.authuser || _.P("googleapis.config/sessionIndex")) && (c.authuser = a);
        (a = _.P("useoriginassocialhost")) && (c.use_origin_as_socialhost = a);
        return c
    };
    ox = function (a) {
        _.nf("waaf0", "signin", "0");
        _.hx(a, function (a) {
            _.nf("waaf1", "signin", "0");
            ix(a)
        })
    };
    _.qx = function (a) {
        a = _.nx(a);
        _.Fa("oauth-flow/authWindowWidth", 445);
        _.Fa("oauth-flow/authWindowHeight", 615);
        ox(a)
    };
    _.rx = function (a) {
        _.Bt(_.Bu.po, _.mH.toString(), a, void 0);
        _.Bu.subscribe(_.mH, a)
    };
    var Kx, fw;
    _.Ax = function (a) {
        return a.cookiepolicy ? !0 : (_.sx("cookiepolicy is a required field.  See https://developers.google.com/+/web/signin/#button_attr_cookiepolicy for more information."), !1)
    };
    _.sx = function (a) {
        window.console && (window.console.error ? window.console.error(a) : window.console.log && window.console.log(a))
    };
    _.Jx = function (a, c) {
        var f = _.Xu();
        _.Sl(a, f);
        f = Vw(f);
        if (_.Ax(f)) {
            var g = _.Gx(f);
            _.Hx(f);
            c ? _.Za(c, "click", function () {
                _.Ix(f, g)
            }) : _.Ix(f, g)
        }
    };
    _.Gx = function (a) {
        var c = new Kx;
        _.rx(function (f) {
            if (c.po && f && (f.access_token && _.Fa("isPlusUser", !0), f["g-oauth-window"]))
                if (c.po = !1, f.access_token && "consent" == f.prompt) {
                    var g = f["g-oauth-window"];
                    f = f.id_token;
                    var h = a.apppackagename;
                    if (h && g) {
                        var l = !0;
                        try {
                            l = g.closed
                        } catch (n) {}
                        l || (f = _.P("iframes/:socialhost:") + "/_/history/otaappinstall?clientId=" + (0, window.encodeURIComponent)(a.clientid) + "&appId=" + (0, window.encodeURIComponent)(h) + "&idToken=" + (0, window.encodeURIComponent)(f), f = _.Xb(f), g.location.href = f)
                    }
                } else if (g =
                f["g-oauth-window"], a.apppackagename && g) try {
                g.close()
            } catch (n) {}
        });
        return c
    };
    Kx = function () {
        this.po = !1
    };
    _.Hx = function (a) {
        a = _.Vx(a);
        _.uy(a.callback);
        _.Xw(function () {
            _.px(a)
        })
    };
    _.Vx = function (a) {
        fw(a);
        a.apppackagename && (a.after_redirect = "keep_open");
        a.redirecturi && delete a.redirecturi;
        _.Ve(function (c) {
            return a[c]
        }) || (a.authuser = 0);
        a.apppackagename && (a.apppackagename = a.apppackagename.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""));
        return a
    };
    fw = function (a) {
        /^\s*$/.test(a.scope || "") && (a.scope = "https://www.googleapis.com/auth/plus.login")
    };
    _.uy = function (a) {
        if ("string" === typeof a)
            if (window[a]) a = window[a];
            else {
                _.sx('Callback function named "' + a + '" not found');
                return
            }
        a && _.rx(a)
    };
    _.Ix = function (a, c) {
        c.po = !0;
        var f;
        f = _.Vx(a);
        _.qx(f)
    };
    _.e("gapi.auth.authorize", _.hx);
    _.e("gapi.auth.checkSessionState", dx);
    _.e("gapi.auth.getAuthHeaderValueForFirstParty", kx);
    _.e("gapi.auth.getToken", function (a, c) {
        return _.kk(a, c)
    });
    _.e("gapi.auth.getVersionInfo", function (a, c) {
        _.Xw(function () {
            var f = _.Qj.Qe() || "",
                g = null,
                h = null;
            f && (h = f.split(" "), 2 == h.length && (g = h[1]));
            g ? vE() ? MD.send("get_versioninfo", {
                xapisidHash: g,
                sessionIndex: c
            }, function (c) {
                a(c[0])
            }, _.Vz) : _.T.call(_.wu, "get_versioninfo", Rw(function (c) {
                a(c)
            }), g, c) : a()
        })
    });
    _.e("gapi.auth.init", _.Xw);
    _.e("gapi.auth.setToken", _.Lw);
    _.e("gapi.auth.signIn", function (a) {
        _.Jx(a)
    });
    _.e("gapi.auth.signOut", function () {
        var a = _.kk(void 0, void 0);
        a && jx(a, a.cookie_policy)
    });
    _.e("gapi.auth.unsafeUnpackIdToken", Vv);
    _.e("gapi.auth._pimf", _.px);
    _.e("gapi.auth._oart", pw);
    _.e("gapi.auth._guss", function (a) {
        return ZM(a).read()
    });
    var fz = _.Xu();
    fz.clientid && fz.scope && fz.cookiepolicy && _.gz("gapi.auth.pageLevelConfig(" + _.kb(fz).sort().join("-") + ")");
    fz.clientid && fz.scope && fz.callback && !_.P("disableRealtimeCallback") ? _.Hx(fz) : _.Xw();
});
// Google Inc.