var tgdd360 = (function () {
    var g, f;
    g = f = (function () {
        var i = {
            version: "v2.6.2-74-g847a74c",
            UUID: 0,
            storage: {},
            $uuid: function (l) {
                return (l.$J_UUID || (l.$J_UUID = ++h.UUID))
            },
            getStorage: function (l) {
                return (h.storage[l] || (h.storage[l] = {}))
            },
            $F: function () {},
            $false: function () {
                return false
            },
            $true: function () {
                return true
            },
            defined: function (l) {
                return (undefined != l)
            },
            ifndef: function (m, l) {
                return (undefined != m) ? m : l
            },
            exists: function (l) {
                return !!(l)
            },
            j1: function (l) {
                if (!h.defined(l)) {
                    return false
                }
                if (l.$J_TYPE) {
                    return l.$J_TYPE
                }
                if ( !! l.nodeType) {
                    if (1 == l.nodeType) {
                        return "element"
                    }
                    if (3 == l.nodeType) {
                        return "textnode"
                    }
                }
                if (l.length && l.item) {
                    return "collection"
                }
                if (l.length && l.callee) {
                    return "arguments"
                }
                if ((l instanceof window.Object || l instanceof window.Function) && l.constructor === h.Class) {
                    return "class"
                }
                if (l instanceof window.Array) {
                    return "array"
                }
                if (l instanceof window.Function) {
                    return "function"
                }
                if (l instanceof window.String) {
                    return "string"
                }
                if (h.j21.trident) {
                    if (h.defined(l.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (l === window.event || l.constructor == window.Event || l.constructor == window.MouseEvent || l.constructor == window.UIEvent || l.constructor == window.KeyboardEvent || l.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (l instanceof window.Date) {
                    return "date"
                }
                if (l instanceof window.RegExp) {
                    return "regexp"
                }
                if (l === window) {
                    return "window"
                }
                if (l === document) {
                    return "document"
                }
                return typeof (l)
            },
            extend: function (u, s) {
                if (!(u instanceof window.Array)) {
                    u = [u]
                }
                for (var r = 0, n = u.length; r < n; r++) {
                    if (!h.defined(u)) {
                        continue
                    }
                    for (var q in (s || {})) {
                        try {
                            u[r][q] = s[q]
                        } catch (m) {}
                    }
                }
                return u[0]
            },
            implement: function (s, r) {
                if (!(s instanceof window.Array)) {
                    s = [s]
                }
                for (var q = 0, m = s.length; q < m; q++) {
                    if (!h.defined(s[q])) {
                        continue
                    }
                    if (!s[q].prototype) {
                        continue
                    }
                    for (var n in (r || {})) {
                        if (!s[q].prototype[n]) {
                            s[q].prototype[n] = r[n]
                        }
                    }
                }
                return s[0]
            },
            nativize: function (n, m) {
                if (!h.defined(n)) {
                    return n
                }
                for (var l in (m || {})) {
                    if (!n[l]) {
                        n[l] = m[l]
                    }
                }
                return n
            },
            $try: function () {
                for (var n = 0, m = arguments.length; n < m; n++) {
                    try {
                        return arguments[n]()
                    } catch (o) {}
                }
                return null
            },
            $A: function (p) {
                if (!h.defined(p)) {
                    return $mjs([])
                }
                if (p.toArray) {
                    return $mjs(p.toArray())
                }
                if (p.item) {
                    var n = p.length || 0,
                        m = new Array(n);
                    while (n--) {
                        m[n] = p[n]
                    }
                    return $mjs(m)
                }
                return $mjs(Array.prototype.slice.call(p))
            },
            now: function () {
                return new Date().getTime()
            },
            detach: function (u) {
                var q;
                switch (h.j1(u)) {
                    case "object":
                        q = {};
                        for (var s in u) {
                            q[s] = h.detach(u[s])
                        }
                        break;
                    case "array":
                        q = [];
                        for (var n = 0, m = u.length; n < m; n++) {
                            q[n] = h.detach(u[n])
                        }
                        break;
                    default:
                        return u
                }
                return h.$(q)
            },
            $: function (m) {
                if (!h.defined(m)) {
                    return null
                }
                if (m.$J_EXTENDED) {
                    return m
                }
                switch (h.j1(m)) {
                    case "array":
                        m = h.nativize(m, h.extend(h.Array, {
                            $J_EXTENDED: h.$F
                        }));
                        m.j14 = m.forEach;
                        return m;
                        break;
                    case "string":
                        var l = document.getElementById(m);
                        if (h.defined(l)) {
                            return h.$(l)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        h.$uuid(m);
                        m = h.extend(m, h.Doc);
                        break;
                    case "element":
                        h.$uuid(m);
                        m = h.extend(m, h.Element);
                        break;
                    case "event":
                        m = h.extend(m, h.Event);
                        break;
                    case "textnode":
                        return m;
                        break;
                    case "function":
                    case "array":
                    case "date":
                    default:
                        break
                }
                return h.extend(m, {
                    $J_EXTENDED: h.$F
                })
            },
            $new: function (l, n, m) {
                return $mjs(h.doc.createElement(l)).setProps(n || {}).j6(m || {})
            },
            addCSS: function (m) {
                if (document.styleSheets && document.styleSheets.length) {
                    document.styleSheets[0].insertRule(m, 0)
                } else {
                    var l = $mjs(document.createElement("style"));
                    l.update(m);
                    document.getElementsByTagName("head")[0].appendChild(l)
                }
            }
        };
        var h = i;
        var j = i.$;
        if (!window.magicJS) {
            window.magicJS = i;
            window.$mjs = i.$
        }
        h.Array = {
            $J_TYPE: "array",
            indexOf: function (p, q) {
                var m = this.length;
                for (var n = this.length, o = (q < 0) ? Math.max(0, n + q) : q || 0; o < n; o++) {
                    if (this[o] === p) {
                        return o
                    }
                }
                return -1
            },
            contains: function (l, m) {
                return this.indexOf(l, m) != -1
            },
            forEach: function (m, q) {
                for (var p = 0, n = this.length; p < n; p++) {
                    if (p in this) {
                        m.call(q, this[p], p, this)
                    }
                }
            },
            filter: function (m, u) {
                var s = [];
                for (var q = 0, n = this.length; q < n; q++) {
                    if (q in this) {
                        var p = this[q];
                        if (m.call(u, this[q], q, this)) {
                            s.push(p)
                        }
                    }
                }
                return s
            },
            map: function (m, s) {
                var q = [];
                for (var p = 0, n = this.length; p < n; p++) {
                    if (p in this) {
                        q[p] = m.call(s, this[p], p, this)
                    }
                }
                return q
            }
        };
        h.implement(String, {
            $J_TYPE: "string",
            j26: function () {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function (l, m) {
                return (m || false) ? (this.toString() === l.toString()) : (this.toLowerCase().toString() === l.toLowerCase().toString())
            },
            j22: function () {
                return this.replace(/-\D/g, function (l) {
                    return l.charAt(1).toUpperCase()
                })
            },
            dashize: function () {
                return this.replace(/[A-Z]/g, function (l) {
                    return ("-" + l.charAt(0).toLowerCase())
                })
            },
            j17: function (l) {
                return parseInt(this, l || 10)
            },
            toFloat: function () {
                return parseFloat(this)
            },
            j18: function () {
                return !this.replace(/true/i, "").j26()
            },
            has: function (m, l) {
                l = l || "";
                return (l + this + l).indexOf(l + m + l) > -1
            }
        });
        i.implement(Function, {
            $J_TYPE: "function",
            j24: function () {
                var n = h.$A(arguments),
                    l = this,
                    p = n.shift();
                return function () {
                    return l.apply(p || null, n.concat(h.$A(arguments)))
                }
            },
            j16: function () {
                var n = h.$A(arguments),
                    l = this,
                    p = n.shift();
                return function (m) {
                    return l.apply(p || null, $mjs([m || window.event]).concat(n))
                }
            },
            j27: function () {
                var n = h.$A(arguments),
                    l = this,
                    o = n.shift();
                return window.setTimeout(function () {
                    return l.apply(l, n)
                }, o || 0)
            },
            j28: function () {
                var n = h.$A(arguments),
                    l = this;
                return function () {
                    return l.j27.apply(l, n)
                }
            },
            interval: function () {
                var n = h.$A(arguments),
                    l = this,
                    o = n.shift();
                return window.setInterval(function () {
                    return l.apply(l, n)
                }, o || 0)
            }
        });
        var k = navigator.userAgent.toLowerCase();
        h.j21 = {
            features: {
                xpath: !! (document.evaluate),
                air: !! (window.runtime),
                query: !! (document.querySelector),
                fullScreen: !! (document.exitFullScreen || document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen)
            },
            touchScreen: function () {
                try {
                    if (document.createEvent) {
                        document.createEvent("TouchEvent", "touchend");
                        return true
                    }
                    return false
                } catch (l) {
                    return false
                }
            }(),
            mobile: k.match(/android|tablet|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(j21|link)|vodafone|wap|windows (ce|phone)|xda|xiino/) ? true : false,
            engine: (window.opera) ? "presto" : !! (window.ActiveXObject) ? "trident" : (undefined != document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : (null != window.WebKitPoint || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: "",
            cssPrefix: "",
            ieMode: 0,
            platform: k.match(/ip(?:ad|od|hone)/) ? "ios" : (k.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
            getDoc: function () {
                return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
            },
            ready: false,
            onready: function () {
                if (h.j21.ready) {
                    return
                }
                h.j21.ready = true;
                h.body = $mjs(document.body);
                h.win = $mjs(window);
                (function () {
                    h.j21.css3Transformations = {
                        capable: false,
                        prefix: ""
                    };
                    if (typeof document.body.style.transform !== "undefined") {
                        h.j21.css3Transformations.capable = true
                    } else {
                        var n = "Webkit Moz O ms Khtml".split(" ");
                        for (var m = 0, l = n.length; m < l; m++) {
                            h.j21.css3Transformations.prefix = n[m];
                            if (typeof document.body.style[h.j21.css3Transformations.prefix + "Transform"] !== "undefined") {
                                h.j21.css3Transformations.capable = true;
                                break
                            }
                        }
                    }
                })();
                (function () {
                    h.j21.css3Animation = {
                        capable: false,
                        prefix: ""
                    };
                    if (typeof document.body.style.animationName !== "undefined") {
                        h.j21.css3Animation.capable = true
                    } else {
                        var n = "Webkit Moz O ms Khtml".split(" ");
                        for (var m = 0, l = n.length; m < l; m++) {
                            h.j21.css3Animation.prefix = n[m];
                            if (typeof document.body.style[h.j21.css3Animation.prefix + "AnimationName"] !== "undefined") {
                                h.j21.css3Animation.capable = true;
                                break
                            }
                        }
                    }
                })();
                $mjs(document).callEvent("domready")
            }
        };
        (function () {
            function l() {
                return !!(arguments.callee.caller)
            }
            h.j21.version = ("presto" == h.j21.engine) ? !! (document.head) ? 270 : !! (window.applicationCache) ? 260 : !! (window.localStorage) ? 250 : (h.j21.features.query) ? 220 : ((l()) ? 211 : ((document.getElementsByClassName) ? 210 : 200)) : ("trident" == h.j21.engine) ? !! (window.msPerformance || window.performance) ? 900 : !! (window.XMLHttpRequest && window.postMessage) ? 6 : ((window.XMLHttpRequest) ? 5 : 4) : ("webkit" == h.j21.engine) ? ((h.j21.features.xpath) ? ((h.j21.features.query) ? 525 : 420) : 419) : ("gecko" == h.j21.engine) ? !! (document.head) ? 200 : !! document.readyState ? 192 : !! (window.localStorage) ? 191 : ((document.getElementsByClassName) ? 190 : 181) : "";
            h.j21[h.j21.engine] = h.j21[h.j21.engine + h.j21.version] = true;
            if (window.chrome) {
                h.j21.chrome = true
            }
            var m = {
                webkit: "webkit",
                gecko: "moz",
                opera: "o",
                presto: "ms"
            };
            h.j21.cssPrefix = m[h.j21.engine];
            h.j21.ieMode = (!h.j21.trident) ? 0 : (document.documentMode) ? document.documentMode : function () {
                var n = 0;
                if (h.j21.backCompat) {
                    return 5
                }
                switch (h.j21.version) {
                    case 4:
                        n = 6;
                        break;
                    case 5:
                        n = 7;
                        break;
                    case 6:
                        n = 8;
                        break;
                    case 900:
                        n = 9;
                        break
                }
                return n
            }()
        })();
        (function () {
            h.j21.fullScreen = {
                capable: h.j21.features.fullScreen,
                enabled: function () {
                    return !!(document.fullScreen || document.webkitIsFullScreen || document[h.j21.cssPrefix + "FullScreen"])
                },
                request: function (l, m) {
                    m || (m = {});
                    if (this.capable) {
                        h.$(document).je1(this.changeEventName, this.onchange = function (n) {
                            if (this.enabled()) {
                                m.onEnter && m.onEnter()
                            } else {
                                h.$(document).je2(this.changeEventName, this.onchange);
                                m.onExit && m.onExit()
                            }
                        }.j16(this));
                        h.$(document).je1(this.errorEventName, this.onerror = function (n) {
                            m.fallback && m.fallback();
                            h.$(document).je2(this.errorEventName, this.onerror)
                        }.j16(this));
                        l[h.j21.cssPrefix + "RequestFullScreen"] ? l[h.j21.cssPrefix + "RequestFullScreen"]() : l.requestFullScreen()
                    } else {
                        if (m.fallback) {
                            m.fallback()
                        }
                    }
                },
                cancel: (document.exitFullScreen || document.cancelFullScreen || document[h.j21.cssPrefix + "CancelFullScreen"] || function () {}).j24(document),
                changeEventName: h.j21.cssPrefix + "fullscreenchange",
                errorEventName: h.j21.cssPrefix + "fullscreenerror",
                prefix: h.j21.cssPrefix,
                activeElement: null
            }
        })();
        h.Element = {
            j13: function (l) {
                return this.className.has(l, " ")
            },
            j2: function (l) {
                if (l && !this.j13(l)) {
                    this.className += (this.className ? " " : "") + l
                }
                return this
            },
            j3: function (l) {
                l = l || ".*";
                this.className = this.className.replace(new RegExp("(^|\\s)" + l + "(?:\\s|$)"), "$1").j26();
                return this
            },
            j4: function (l) {
                return this.j13(l) ? this.j3(l) : this.j2(l)
            },
            j5: function (n) {
                n = (n == "float" && this.currentStyle) ? "styleFloat" : n.j22();
                var l = null,
                    m = null;
                if (this.currentStyle) {
                    l = this.currentStyle[n]
                } else {
                    if (document.defaultView && document.defaultView.getComputedStyle) {
                        m = document.defaultView.getComputedStyle(this, null);
                        l = m ? m.getPropertyValue([n.dashize()]) : null
                    }
                }
                if (!l) {
                    l = this.style[n]
                }
                if ("opacity" == n) {
                    return h.defined(l) ? parseFloat(l) : 1
                }
                if (/^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/.test(n)) {
                    l = parseInt(l) ? l : "0px"
                }
                return ("auto" == l ? null : l)
            },
            j6Prop: function (m, l) {
                try {
                    if ("opacity" == m) {
                        this.j23(l);
                        return this
                    } else {
                        if ("float" == m) {
                            this.style[("undefined" === typeof (this.style.styleFloat)) ? "cssFloat" : "styleFloat"] = l;
                            return this
                        } else {
                            if (h.j21.css3Transformations && /transform/.test(m)) {}
                        }
                    }
                    this.style[m.j22()] = l + (("number" == h.j1(l) && !$mjs(["zIndex", "zoom"]).contains(m.j22())) ? "px" : "")
                } catch (n) {}
                return this
            },
            j6: function (m) {
                for (var l in m) {
                    this.j6Prop(l, m[l])
                }
                return this
            },
            j19s: function () {
                var l = {};
                h.$A(arguments).j14(function (m) {
                    l[m] = this.j5(m)
                }, this);
                return l
            },
            j23: function (o, m) {
                m = m || false;
                o = parseFloat(o);
                if (m) {
                    if (o == 0) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (h.j21.trident) {
                    if (!this.currentStyle || !this.currentStyle.hasLayout) {
                        this.style.zoom = 1
                    }
                    try {
                        var n = this.filters.item("DXImageTransform.Microsoft.Alpha");
                        n.enabled = (1 != o);
                        n.opacity = o * 100
                    } catch (l) {
                        this.style.filter += (1 == o) ? "" : "progid:DXImageTransform.Microsoft.Alpha(enabled=true,opacity=" + o * 100 + ")"
                    }
                }
                this.style.opacity = o;
                return this
            },
            setProps: function (l) {
                for (var m in l) {
                    this.setAttribute(m, "" + l[m])
                }
                return this
            },
            hide: function () {
                return this.j6({
                    display: "none",
                    visibility: "hidden"
                })
            },
            show: function () {
                return this.j6({
                    display: "block",
                    visibility: "visible"
                })
            },
            j7: function () {
                return {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }
            },
            j10: function () {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            j11: function () {
                var l = this,
                    m = {
                        top: 0,
                        left: 0
                    };
                do {
                    m.left += l.scrollLeft || 0;
                    m.top += l.scrollTop || 0;
                    l = l.parentNode
                } while (l);
                return m
            },
            j8: function () {
                if (h.defined(document.documentElement.getBoundingClientRect)) {
                    var m = this.getBoundingClientRect(),
                        o = $mjs(document).j10(),
                        q = h.j21.getDoc();
                    return {
                        top: m.top + o.y - q.clientTop,
                        left: m.left + o.x - q.clientLeft
                    }
                }
                var p = this,
                    n = t = 0;
                do {
                    n += p.offsetLeft || 0;
                    t += p.offsetTop || 0;
                    p = p.offsetParent
                } while (p && !(/^(?:body|html)$/i).test(p.tagName));
                return {
                    top: t,
                    left: n
                }
            },
            j9: function () {
                var m = this.j8();
                var l = this.j7();
                return {
                    top: m.top,
                    bottom: m.top + l.height,
                    left: m.left,
                    right: m.left + l.width
                }
            },
            changeContent: function (m) {
                try {
                    this.innerHTML = m
                } catch (l) {
                    this.innerText = m
                }
                return this
            },
            j33: function () {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function () {
                h.$A(this.childNodes).j14(function (l) {
                    if (3 == l.nodeType || 8 == l.nodeType) {
                        return
                    }
                    $mjs(l).kill()
                });
                this.j33();
                this.je3();
                if (this.$J_UUID) {
                    h.storage[this.$J_UUID] = null;
                    delete h.storage[this.$J_UUID]
                }
                return null
            },
            append: function (n, m) {
                m = m || "bottom";
                var l = this.firstChild;
                ("top" == m && l) ? this.insertBefore(n, l) : this.appendChild(n);
                return this
            },
            j32: function (n, m) {
                var l = $mjs(n).append(this, m);
                return this
            },
            enclose: function (l) {
                this.append(l.parentNode.replaceChild(this, l));
                return this
            },
            hasChild: function (l) {
                if (!(l = $mjs(l))) {
                    return false
                }
                return (this == l) ? false : (this.contains && !(h.j21.webkit419)) ? (this.contains(l)) : (this.compareDocumentPosition) ? !! (this.compareDocumentPosition(l) & 16) : h.$A(this.byTag(l.tagName)).contains(l)
            }
        };
        h.Element.j19 = h.Element.j5;
        h.Element.j20 = h.Element.j6;
        if (!window.Element) {
            window.Element = h.$F;
            if (h.j21.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (h.j21.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        h.implement(window.Element, {
            $J_TYPE: "element"
        });
        h.Doc = {
            j7: function () {
                if (h.j21.touchScreen || h.j21.presto925 || h.j21.webkit419) {
                    return {
                        width: self.innerWidth,
                        height: self.innerHeight
                    }
                }
                return {
                    width: h.j21.getDoc().clientWidth,
                    height: h.j21.getDoc().clientHeight
                }
            },
            j10: function () {
                return {
                    x: self.pageXOffset || h.j21.getDoc().scrollLeft,
                    y: self.pageYOffset || h.j21.getDoc().scrollTop
                }
            },
            j12: function () {
                var l = this.j7();
                return {
                    width: Math.max(h.j21.getDoc().scrollWidth, l.width),
                    height: Math.max(h.j21.getDoc().scrollHeight, l.height)
                }
            }
        };
        h.extend(document, {
            $J_TYPE: "document"
        });
        h.extend(window, {
            $J_TYPE: "window"
        });
        h.extend([h.Element, h.Doc], {
            j29: function (o, m) {
                var l = h.getStorage(this.$J_UUID),
                    n = l[o];
                if (undefined != m && undefined == n) {
                    n = l[o] = m
                }
                return (h.defined(n) ? n : null)
            },
            j30: function (n, m) {
                var l = h.getStorage(this.$J_UUID);
                l[n] = m;
                return this
            },
            j31: function (m) {
                var l = h.getStorage(this.$J_UUID);
                delete l[m];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            h.extend([h.Element, h.Doc], {
                getElementsByClassName: function (l) {
                    return h.$A(this.getElementsByTagName("*")).filter(function (n) {
                        try {
                            return (1 == n.nodeType && n.className.has(l, " "))
                        } catch (m) {}
                    })
                }
            })
        }
        h.extend([h.Element, h.Doc], {
            byClass: function () {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function () {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (h.j21.fullScreen.capable && !document.requestFullScreen) {
            h.Element.requestFullScreen = function () {
                h.j21.fullScreen.request(this)
            }
        }
        h.Event = {
            $J_TYPE: "event",
            isQueueStopped: h.$false,
            stop: function () {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function () {
                if (this.stopPropagation) {
                    this.stopPropagation()
                } else {
                    this.cancelBubble = true
                }
                return this
            },
            stopDefaults: function () {
                if (this.preventDefault) {
                    this.preventDefault()
                } else {
                    this.returnValue = false
                }
                return this
            },
            stopQueue: function () {
                this.isQueueStopped = h.$true;
                return this
            },
            j15: function () {
                var m, l;
                m = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!h.defined(m)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: m.pageX || m.clientX + h.j21.getDoc().scrollLeft,
                    y: m.pageY || m.clientY + h.j21.getDoc().scrollTop
                }
            },
            getTarget: function () {
                var l = this.target || this.srcElement;
                while (l && 3 == l.nodeType) {
                    l = l.parentNode
                }
                return l
            },
            getRelated: function () {
                var m = null;
                switch (this.type) {
                    case "mouseover":
                        m = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                        m = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return m
                }
                try {
                    while (m && 3 == m.nodeType) {
                        m = m.parentNode
                    }
                } catch (l) {
                    m = null
                }
                return m
            },
            getButton: function () {
                if (!this.which && this.button !== undefined) {
                    return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
                }
                return this.which
            }
        };
        h._event_add_ = "addEventListener";
        h._event_del_ = "removeEventListener";
        h._event_prefix_ = "";
        if (!document.addEventListener) {
            h._event_add_ = "attachEvent";
            h._event_del_ = "detachEvent";
            h._event_prefix_ = "on"
        }
        h.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: h.$false,
            events: $mjs([]),
            pushToEvents: function (l) {
                var m = l;
                this.events.push(m)
            },
            stop: function () {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function () {
                this.events.j14(function (m) {
                    try {
                        m.stopDistribution()
                    } catch (l) {}
                });
                return this
            },
            stopDefaults: function () {
                this.events.j14(function (m) {
                    try {
                        m.stopDefaults()
                    } catch (l) {}
                });
                return this
            },
            stopQueue: function () {
                this.isQueueStopped = h.$true;
                return this
            },
            j15: function () {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            getTarget: function () {
                return this.target
            },
            getRelated: function () {
                return this.relatedTarget
            },
            getButton: function () {
                return this.button
            }
        };
        h.extend([h.Element, h.Doc], {
            je1: function (s, r, q, o) {
                var p, n, m, l;
                if (h.j1(s) == "array") {
                    $mjs(s).j14(this.je1.j16(this, r, q));
                    return this
                }
                if (!s || !r || h.j1(s) != "string" || h.j1(r) != "function") {
                    return this
                }
                if (s == "domready" && h.j21.ready) {
                    r.call(this);
                    return this
                }
                q = parseInt(q || 50);
                if (!r.$J_EUID) {
                    r.$J_EUID = Math.floor(Math.random() * h.now())
                }
                p = this.j29("events", {});
                n = p[s];
                if (!n) {
                    p[s] = n = $mjs([]);
                    m = this;
                    if (h.Event.Custom[s]) {
                        h.Event.Custom[s].handler.add.call(this, o)
                    } else {
                        n.handle = function (u) {
                            u = h.extend(u || window.e, {
                                $J_TYPE: "event"
                            });
                            m.callEvent(s, $mjs(u))
                        };
                        this[h._event_add_](h._event_prefix_ + s, n.handle, false)
                    }
                }
                l = {
                    type: s,
                    fn: r,
                    priority: q,
                    euid: r.$J_EUID
                };
                n.push(l);
                n.sort(function (v, u) {
                    return v.priority - u.priority
                });
                return this
            },
            je2: function (r) {
                var p = this.j29("events"),
                    o, l, n, m, q;
                if (!r || h.j1(r) != "string" || !p || !p[r]) {
                    return this
                }
                o = p[r] || [];
                q = arguments[1] || null;
                for (n = 0; n < o.length; n++) {
                    l = o[n];
                    if (!q || q.$J_EUID === l.euid) {
                        m = o.splice(n--, 1);
                        delete m
                    }
                }
                if (0 === o.length) {
                    if (h.Event.Custom[r]) {
                        h.Event.Custom[r].handler.j33.call(this)
                    } else {
                        this[h._event_del_](h._event_prefix_ + r, o.handle, false)
                    }
                    delete p[r]
                }
                return this
            },
            callEvent: function (p, r) {
                var o = this.j29("events"),
                    n, l, m;
                if (!p || h.j1(p) != "string" || !o || !o[p]) {
                    return this
                }
                try {
                    r = h.extend(r || {}, {
                        type: p
                    })
                } catch (q) {}
                if (undefined === r.timeStamp) {
                    r.timeStamp = h.now()
                }
                n = o[p] || [];
                for (m = 0; m < n.length && !(r.isQueueStopped && r.isQueueStopped()); m++) {
                    n[m].fn.call(this, r)
                }
            },
            raiseEvent: function (m, l) {
                var q = ("domready" == m) ? false : true,
                    p = this,
                    n;
                if (!q) {
                    this.callEvent(m);
                    return this
                }
                if (p === document && document.createEvent && !p.dispatchEvent) {
                    p = document.documentElement
                }
                if (document.createEvent) {
                    n = document.createEvent(m);
                    n.initEvent(l, true, true)
                } else {
                    n = document.createEventObject();
                    n.eventType = m
                }
                if (document.createEvent) {
                    p.dispatchEvent(n)
                } else {
                    p.fireEvent("on" + l, n)
                }
                return n
            },
            je3: function () {
                var l = this.j29("events");
                if (!l) {
                    return this
                }
                for (var m in l) {
                    this.je2(m)
                }
                this.j31("events");
                return this
            }
        });
        (function () {
            if (h.j21.webkit && h.j21.version < 420) {
                (function () {
                    ($mjs(["loaded", "complete"]).contains(document.readyState)) ? h.j21.onready() : arguments.callee.j27(50)
                })()
            } else {
                if (h.j21.trident && h.j21.ieMode < 9 && window == top) {
                    (function () {
                        (h.$try(function () {
                            h.j21.getDoc().doScroll("left");
                            return true
                        })) ? h.j21.onready() : arguments.callee.j27(50)
                    })()
                } else {
                    $mjs(document).je1("DOMContentLoaded", h.j21.onready);
                    $mjs(window).je1("load", h.j21.onready)
                }
            }
        })();
        h.Class = function () {
            var q = null,
                m = h.$A(arguments);
            if ("class" == h.j1(m[0])) {
                q = m.shift()
            }
            var l = function () {
                for (var u in this) {
                    this[u] = h.detach(this[u])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var w = this.constructor.$parent;
                    for (var v in w) {
                        var s = w[v];
                        switch (h.j1(s)) {
                            case "function":
                                this.$parent[v] = h.Class.wrap(this, s);
                                break;
                            case "object":
                                this.$parent[v] = h.detach(s);
                                break;
                            case "array":
                                this.$parent[v] = h.detach(s);
                                break
                        }
                    }
                }
                var r = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return r
            };
            if (!l.prototype.init) {
                l.prototype.init = h.$F
            }
            if (q) {
                var o = function () {};
                o.prototype = q.prototype;
                l.prototype = new o;
                l.$parent = {};
                for (var n in q.prototype) {
                    l.$parent[n] = q.prototype[n]
                }
            } else {
                l.$parent = null
            }
            l.constructor = h.Class;
            l.prototype.constructor = l;
            h.extend(l.prototype, m[0]);
            h.extend(l, {
                $J_TYPE: "class"
            });
            return l
        };
        i.Class.wrap = function (l, m) {
            return function () {
                var o = this.caller;
                var n = m.apply(l, arguments);
                return n
            }
        };
        h.Event.Custom.btnclick = new h.Class(h.extend(h.Event.Custom, {
            type: "btnclick",
            init: function (n, m) {
                var l = m.j15();
                this.x = l.x;
                this.y = l.y;
                this.timeStamp = m.timeStamp;
                this.button = m.getButton();
                this.target = n;
                this.pushToEvents(m)
            }
        }));
        h.Event.Custom.btnclick.handler = {
            options: {
                threshold: 200,
                button: 1
            },
            add: function (l) {
                this.j30("event:btnclick:options", h.extend(h.detach(h.Event.Custom.btnclick.handler.options), l || {}));
                this.je1("mousedown", h.Event.Custom.btnclick.handler.handle, 1);
                this.je1("mouseup", h.Event.Custom.btnclick.handler.handle, 1);
                this.je1("click", h.Event.Custom.btnclick.handler.onclick, 1);
                if (h.j21.trident && h.j21.ieMode < 9) {
                    this.je1("dblclick", h.Event.Custom.btnclick.handler.handle, 1)
                }
            },
            j33: function () {
                this.je2("mousedown", h.Event.Custom.btnclick.handler.handle);
                this.je2("mouseup", h.Event.Custom.btnclick.handler.handle);
                this.je2("click", h.Event.Custom.btnclick.handler.onclick);
                if (h.j21.trident && h.j21.ieMode < 9) {
                    this.je2("dblclick", h.Event.Custom.btnclick.handler.handle)
                }
            },
            onclick: function (l) {
                l.stopDefaults()
            },
            handle: function (o) {
                var n, l, m;
                l = this.j29("event:btnclick:options");
                if (o.type != "dblclick" && o.getButton() != l.button) {
                    return
                }
                if ("mousedown" == o.type) {
                    o.stop();
                    n = new h.Event.Custom.btnclick(this, o);
                    this.j30("event:btnclick:btnclickEvent", n)
                } else {
                    if ("mouseup" == o.type) {
                        n = this.j29("event:btnclick:btnclickEvent");
                        if (!n) {
                            return
                        }
                        m = o.j15();
                        this.j31("event:btnclick:btnclickEvent");
                        n.pushToEvents(o);
                        if (o.timeStamp - n.timeStamp <= l.threshold && n.x == m.x && n.y == m.y) {
                            this.callEvent("btnclick", n)
                        }
                    } else {
                        if (o.type == "dblclick") {
                            n = new h.Event.Custom.btnclick(this, o);
                            this.callEvent("btnclick", n)
                        }
                    }
                }
            }
        };
        h.Event.Custom.mousedrag = new h.Class(h.extend(h.Event.Custom, {
            type: "mousedrag",
            state: "dragstart",
            init: function (o, n, m) {
                var l = n.j15();
                this.x = l.x;
                this.y = l.y;
                this.timeStamp = n.timeStamp;
                this.button = n.getButton();
                this.target = o;
                this.pushToEvents(n);
                this.state = m
            }
        }));
        h.Event.Custom.mousedrag.handler = {
            add: function () {
                this.je1("mousedown", h.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                this.je1("mouseup", h.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                this.je1("mousemove", h.Event.Custom.mousedrag.handler.handleMouseMove, 1);
                document.je1("mouseup", h.Event.Custom.mousedrag.handler.handleMouseUp.j16(this), 1)
            },
            j33: function () {
                this.je2("mousedown", h.Event.Custom.mousedrag.handler.handleMouseDown);
                this.je2("mouseup", h.Event.Custom.mousedrag.handler.handleMouseUp);
                this.je2("mousemove", h.Event.Custom.mousedrag.handler.handleMouseMove);
                document.je2("mouseup", h.Event.Custom.mousedrag.handler.handleMouseUp)
            },
            handleMouseDown: function (m) {
                var l;
                m.stopDefaults();
                l = new h.Event.Custom.mousedrag(this, m, "dragstart");
                this.j30("event:mousedrag:dragstart", l);
                this.callEvent("mousedrag", l)
            },
            handleMouseUp: function (m) {
                var l;
                m.stopDefaults();
                l = this.j29("event:mousedrag:dragstart");
                if (!l) {
                    return
                }
                l = new h.Event.Custom.mousedrag(this, m, "dragend");
                this.j31("event:mousedrag:dragstart");
                this.callEvent("mousedrag", l)
            },
            handleMouseMove: function (m) {
                var l;
                m.stopDefaults();
                l = this.j29("event:mousedrag:dragstart");
                if (!l) {
                    return
                }
                l = new h.Event.Custom.mousedrag(this, m, "dragmove");
                this.callEvent("mousedrag", l)
            }
        };
        h.Event.Custom.dblbtnclick = new h.Class(h.extend(h.Event.Custom, {
            type: "dblbtnclick",
            timedout: false,
            tm: null,
            init: function (n, m) {
                var l = m.j15();
                this.x = l.x;
                this.y = l.y;
                this.timeStamp = m.timeStamp;
                this.button = m.getButton();
                this.target = n;
                this.pushToEvents(m)
            }
        }));
        h.Event.Custom.dblbtnclick.handler = {
            options: {
                threshold: 200
            },
            add: function (l) {
                this.j30("event:dblbtnclick:options", h.extend(h.detach(h.Event.Custom.dblbtnclick.handler.options), l || {}));
                this.je1("btnclick", h.Event.Custom.dblbtnclick.handler.handle, 1)
            },
            j33: function () {
                this.je2("btnclick", h.Event.Custom.dblbtnclick.handler.handle)
            },
            handle: function (n) {
                var m, l;
                m = this.j29("event:dblbtnclick:event");
                l = this.j29("event:dblbtnclick:options");
                if (!m) {
                    m = new h.Event.Custom.dblbtnclick(this, n);
                    m.tm = setTimeout(function () {
                        m.timedout = true;
                        n.isQueueStopped = h.$false;
                        this.callEvent("btnclick", n)
                    }.j24(this), l.threshold + 10);
                    this.j30("event:dblbtnclick:event", m);
                    n.stopQueue()
                } else {
                    clearTimeout(m.tm);
                    this.j31("event:dblbtnclick:event");
                    if (!m.timedout) {
                        m.pushToEvents(n);
                        n.stopQueue().stop();
                        this.callEvent("dblbtnclick", m)
                    } else {}
                }
            }
        };
        h.Event.Custom.tap = new h.Class(h.extend(h.Event.Custom, {
            type: "tap",
            id: null,
            init: function (m, l) {
                this.id = l.targetTouches[0].identifier;
                this.x = l.targetTouches[0].clientX;
                this.y = l.targetTouches[0].clientY;
                this.timeStamp = l.timeStamp;
                this.button = 0;
                this.target = m;
                this.pushToEvents(l)
            }
        }));
        h.Event.Custom.tap.handler = {
            options: {
                threshold: 200,
                radius: 10
            },
            add: function (l) {
                this.j30("event:tap:options", h.extend(h.detach(h.Event.Custom.tap.handler.options), l || {}));
                this.je1("touchstart", h.Event.Custom.tap.handler.handle, 1);
                this.je1("touchend", h.Event.Custom.tap.handler.handle, 1);
                this.je1("click", h.Event.Custom.tap.handler.onclick, 1)
            },
            j33: function () {
                this.je2("touchstart", h.Event.Custom.tap.handler.handle);
                this.je2("touchend", h.Event.Custom.tap.handler.handle);
                this.je2("click", h.Event.Custom.tap.handler.onclick)
            },
            onclick: function (l) {
                l.stopDefaults()
            },
            handle: function (o) {
                var m, n, l;
                l = this.j29("event:tap:options");
                if ("touchstart" == o.type) {
                    if (o.targetTouches.length > 1) {
                        return
                    }
                    n = new h.Event.Custom.tap(this, o);
                    o.stop();
                    this.j30("event:tap:event", n)
                } else {
                    if ("touchend" == o.type) {
                        n = this.j29("event:tap:event");
                        m = h.now();
                        if (!n || o.changedTouches.length > 1) {
                            return
                        }
                        this.j31("event:tap:event");
                        if (n.id == o.changedTouches[0].identifier && o.timeStamp - n.timeStamp <= l.threshold && Math.sqrt(Math.pow(o.changedTouches[0].clientX - n.x, 2) + Math.pow(o.changedTouches[0].clientY - n.y, 2)) <= l.radius) {
                            this.callEvent("tap", n)
                        }
                    }
                }
            }
        };
        h.Event.Custom.dbltap = new h.Class(h.extend(h.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function (m, l) {
                this.x = l.x;
                this.y = l.y;
                this.timeStamp = l.timeStamp;
                this.button = 0;
                this.target = m;
                this.pushToEvents(l)
            }
        }));
        h.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function (l) {
                this.j30("event:dbltap:options", h.extend(h.detach(h.Event.Custom.dbltap.handler.options), l || {}));
                this.je1("tap", h.Event.Custom.dbltap.handler.handle, 1)
            },
            j33: function () {
                this.je2("tap", h.Event.Custom.dbltap.handler.handle)
            },
            handle: function (n) {
                var m, l;
                m = this.j29("event:dbltap:event");
                l = this.j29("event:dbltap:options");
                if (!m) {
                    m = new h.Event.Custom.dbltap(this, n);
                    m.tm = setTimeout(function () {
                        m.timedout = true;
                        n.isQueueStopped = h.$false;
                        this.callEvent("tap", n)
                    }.j24(this), l.threshold + 10);
                    this.j30("event:dbltap:event", m);
                    n.stopQueue()
                } else {
                    clearTimeout(m.tm);
                    this.j31("event:dbltap:event");
                    if (!m.timedout) {
                        m.pushToEvents(n);
                        n.stopQueue().stop();
                        this.callEvent("dbltap", m)
                    } else {}
                }
            }
        };
        h.Event.Custom.touchdrag = new h.Class(h.extend(h.Event.Custom, {
            type: "touchdrag",
            state: "dragstart",
            id: null,
            dragged: false,
            init: function (n, m, l) {
                var o = null;
                if ("touchstart" == m.type) {
                    o = m.touches[0]
                } else {
                    o = m.changedTouches[0]
                }
                this.id = o.identifier;
                this.x = o.clientX;
                this.y = o.clientY;
                this.timeStamp = m.timeStamp;
                this.button = 0;
                this.target = n;
                this.pushToEvents(m);
                this.state = l
            }
        }));
        h.Event.Custom.touchdrag.handler = {
            add: function () {
                this.je1("touchstart", h.Event.Custom.touchdrag.handler.handleTouchStart, 1);
                this.je1("touchend", h.Event.Custom.touchdrag.handler.handleTouchEnd, 1);
                this.je1("touchmove", h.Event.Custom.touchdrag.handler.handleTouchMove, 1)
            },
            j33: function () {
                this.je2("touchstart", h.Event.Custom.touchdrag.handler.handleTouchStart);
                this.je2("touchend", h.Event.Custom.touchdrag.handler.handleTouchEnd);
                this.je2("touchmove", h.Event.Custom.touchdrag.handler.handleTouchMove)
            },
            handleTouchStart: function (m) {
                var l;
                if (m.touches.length > 1) {
                    this.j31("event:touchdrag:dragstart");
                    return
                }
                l = new h.Event.Custom.touchdrag(this, m, "dragstart");
                this.j30("event:touchdrag:dragstart", l)
            },
            handleTouchEnd: function (m) {
                var l;
                l = this.j29("event:touchdrag:dragstart");
                if (!l || m.changedTouches.length > 1) {
                    this.j31("event:touchdrag:dragstart");
                    return
                }
                if (l.id != m.changedTouches[0].identifier) {
                    this.j31("event:touchdrag:dragstart");
                    return
                }
                if (!l.dragged) {
                    return
                }
                l = new h.Event.Custom.touchdrag(this, m, "dragend");
                this.j31("event:touchdrag:dragstart");
                this.callEvent("touchdrag", l)
            },
            handleTouchMove: function (m) {
                var l;
                l = this.j29("event:touchdrag:dragstart");
                if (!l || m.changedTouches.length > 1) {
                    this.j31("event:touchdrag:dragstart");
                    return
                }
                if (l.id != m.changedTouches[0].identifier) {
                    this.j31("event:touchdrag:dragstart");
                    return
                }
                if (!l.dragged) {
                    l.dragged = true;
                    this.callEvent("touchdrag", l)
                }
                l = new h.Event.Custom.touchdrag(this, m, "dragmove");
                this.callEvent("touchdrag", l)
            }
        };
        h.Event.Custom.touchpinch = new h.Class(h.extend(h.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function (m, l) {
                this.timeStamp = l.timeStamp;
                this.button = 0;
                this.target = m;
                this.x = l.touches[0].clientX + (l.touches[1].clientX - l.touches[0].clientX) / 2;
                this.y = l.touches[0].clientY + (l.touches[1].clientY - l.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(l.touches[0].clientX - l.touches[1].clientX, 2) + Math.pow(l.touches[0].clientY - l.touches[1].clientY, 2));
                this.pushToEvents(l)
            },
            update: function (l) {
                var m;
                this.state = "pinchupdate";
                if (l.changedTouches[0].identifier != this.events[0].touches[0].identifier || l.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                m = Math.sqrt(Math.pow(l.changedTouches[0].clientX - l.changedTouches[1].clientX, 2) + Math.pow(l.changedTouches[0].clientY - l.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = m / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = l.changedTouches[0].clientX + (l.changedTouches[1].clientX - l.changedTouches[0].clientX) / 2;
                this.y = l.changedTouches[0].clientY + (l.changedTouches[1].clientY - l.changedTouches[0].clientY) / 2;
                this.pushToEvents(l)
            }
        }));
        h.Event.Custom.touchpinch.handler = {
            add: function () {
                this.je1("touchstart", h.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.je1("touchend", h.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.je1("touchmove", h.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            j33: function () {
                this.je2("touchstart", h.Event.Custom.touchpinch.handler.handleTouchStart);
                this.je2("touchend", h.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.je2("touchmove", h.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function (m) {
                var l;
                if (m.touches.length != 2) {
                    return
                }
                m.stopDefaults();
                l = new h.Event.Custom.touchpinch(this, m);
                this.j30("event:touchpinch:event", l)
            },
            handleTouchEnd: function (m) {
                var l;
                l = this.j29("event:touchpinch:event");
                if (!l) {
                    return
                }
                m.stopDefaults();
                this.j31("event:touchpinch:event")
            },
            handleTouchMove: function (m) {
                var l;
                l = this.j29("event:touchpinch:event");
                if (!l) {
                    return
                }
                m.stopDefaults();
                l.update(m);
                this.callEvent("touchpinch", l)
            }
        };
        h.win = $mjs(window);
        h.doc = $mjs(document);
        return i
    })();
    (function (h) {
        if (!h) {
            throw "tgdd.360.js not found";
            return
        }
        if (h.FX) {
            return
        }
        var i = h.$;
        h.FX = new h.Class({
            init: function (k, j) {
                this.el = $mjs(k);
                this.options = h.extend(this.options, j);
                this.timer = false
            },
            options: {
                fps: 50,
                duration: 500,
                transition: function (j) {
                    return -(Math.cos(Math.PI * j) - 1) / 2
                },
                onStart: h.$F,
                onComplete: h.$F,
                onBeforeRender: h.$F,
                roundCss: true
            },
            styles: null,
            start: function (j) {
                this.styles = j;
                this.state = 0;
                this.curFrame = 0;
                this.startTime = h.now();
                this.finishTime = this.startTime + this.options.duration;
                if (this.options.duration != 0) {
                    this.timer = this.loop.j24(this).interval(Math.round(1000 / this.options.fps))
                }
                this.options.onStart.call();
                if (this.options.duration == 0) {
                    this.render(1);
                    this.options.onComplete.call()
                }
                return this
            },
            stop: function (j) {
                j = h.defined(j) ? j : false;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = false
                }
                if (j) {
                    this.render(1);
                    this.options.onComplete.j27(10)
                }
                return this
            },
            calc: function (l, k, j) {
                return (k - l) * j + l
            },
            loop: function () {
                var k = h.now();
                if (k >= this.finishTime) {
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.timer = false
                    }
                    this.render(1);
                    this.options.onComplete.j27(10);
                    return this
                }
                var j = this.options.transition((k - this.startTime) / this.options.duration);
                this.render(j)
            },
            render: function (j) {
                var k = {};
                for (var l in this.styles) {
                    if ("opacity" === l) {
                        k[l] = Math.round(this.calc(this.styles[l][0], this.styles[l][1], j) * 100) / 100
                    } else {
                        k[l] = this.calc(this.styles[l][0], this.styles[l][1], j);
                        if (this.options.roundCss) {
                            k[l] = Math.round(k[l])
                        }
                    }
                }
                this.options.onBeforeRender(k);
                this.set(k)
            },
            set: function (j) {
                return this.el.j6(j)
            }
        });
        h.FX.Transition = {
            linear: function (j) {
                return j
            },
            sineIn: function (j) {
                return -(Math.cos(Math.PI * j) - 1) / 2
            },
            sineOut: function (j) {
                return 1 - h.FX.Transition.sineIn(1 - j)
            },
            expoIn: function (j) {
                return Math.pow(2, 8 * (j - 1))
            },
            expoOut: function (j) {
                return 1 - h.FX.Transition.expoIn(1 - j)
            },
            quadIn: function (j) {
                return Math.pow(j, 2)
            },
            quadOut: function (j) {
                return 1 - h.FX.Transition.quadIn(1 - j)
            },
            cubicIn: function (j) {
                return Math.pow(j, 3)
            },
            cubicOut: function (j) {
                return 1 - h.FX.Transition.cubicIn(1 - j)
            },
            backIn: function (k, j) {
                j = j || 1.618;
                return Math.pow(k, 2) * ((j + 1) * k - j)
            },
            backOut: function (k, j) {
                return 1 - h.FX.Transition.backIn(1 - k)
            },
            elasticIn: function (k, j) {
                j = j || [];
                return Math.pow(2, 10 * --k) * Math.cos(20 * k * Math.PI * (j[0] || 1) / 3)
            },
            elasticOut: function (k, j) {
                return 1 - h.FX.Transition.elasticIn(1 - k, j)
            },
            bounceIn: function (l) {
                for (var k = 0, j = 1; 1; k += j, j /= 2) {
                    if (l >= (7 - 4 * k) / 11) {
                        return j * j - Math.pow((11 - 6 * k - 11 * l) / 4, 2)
                    }
                }
            },
            bounceOut: function (j) {
                return 1 - h.FX.Transition.bounceIn(1 - j)
            },
            none: function (j) {
                return 0
            }
        }
    })(g);
    (function (h) {
        if (!h) {
            throw "tgdd.360.js not found";
            return
        }
        if (!h.FX) {
            throw "tgdd.360.js.FX not found";
            return
        }
        if (h.FX.Slide) {
            return
        }
        var i = h.$;
        h.FX.Slide = new h.Class(h.FX, {
            options: {
                mode: "vertical"
            },
            init: function (k, j) {
                this.el = $mjs(k);
                this.options = h.extend(this.$parent.options, this.options);
                this.$parent.init(k, j);
                this.wrapper = this.el.j29("slide:wrapper");
                this.wrapper = this.wrapper || h.$new("DIV").j6(h.extend(this.el.j19s("margin-top", "margin-left", "margin-right", "margin-bottom", "position", "top", "float"), {
                    overflow: "hidden"
                })).enclose(this.el);
                this.el.j30("slide:wrapper", this.wrapper).j6({
                    margin: 0
                })
            },
            vertical: function () {
                this.margin = "margin-top";
                this.layout = "height";
                this.offset = this.el.offsetHeight
            },
            horizontal: function (j) {
                this.margin = "margin-" + (j || "left");
                this.layout = "width";
                this.offset = this.el.offsetWidth
            },
            right: function () {
                this.horizontal()
            },
            left: function () {
                this.horizontal("right")
            },
            start: function (l, o) {
                this[o || this.options.mode]();
                var n = this.el.j5(this.margin).j17(),
                    m = this.wrapper.j5(this.layout).j17(),
                    j = {}, p = {}, k;
                j[this.margin] = [n, 0], j[this.layout] = [0, this.offset], p[this.margin] = [n, - this.offset], p[this.layout] = [m, 0];
                switch (l) {
                    case "in":
                        k = j;
                        break;
                    case "out":
                        k = p;
                        break;
                    case "toggle":
                        k = (0 == m) ? j : p;
                        break
                }
                this.$parent.start(k);
                return this
            },
            set: function (j) {
                this.el.j6Prop(this.margin, j[this.margin]);
                this.wrapper.j6Prop(this.layout, j[this.layout]);
                return this
            },
            slideIn: function (j) {
                return this.start("in", j)
            },
            slideOut: function (j) {
                return this.start("out", j)
            },
            hide: function (k) {
                this[k || this.options.mode]();
                var j = {};
                j[this.layout] = 0, j[this.margin] = -this.offset;
                return this.set(j)
            },
            show: function (k) {
                this[k || this.options.mode]();
                var j = {};
                j[this.layout] = this.offset, j[this.margin] = 0;
                return this.set(j)
            },
            toggle: function (j) {
                return this.start("toggle", j)
            }
        })
    })(g);
    (function (h) {
        if (!h) {
            throw "tgdd.360.js not found";
            return
        }
        if (h.PFX) {
            return
        }
        var i = h.$;
        h.PFX = new h.Class(h.FX, {
            init: function (j, k) {
                this.el_arr = j;
                this.options = h.extend(this.options, k);
                this.timer = false
            },
            start: function (j) {
                this.styles_arr = j;
                this.$parent.start([]);
                return this
            },
            render: function (j) {
                for (var k = 0; k < this.el_arr.length; k++) {
                    this.el = $mjs(this.el_arr[k]);
                    this.styles = this.styles_arr[k];
                    this.$parent.render(j)
                }
            }
        })
    })(g);
    (function (h) {
        if (!h) {
            throw "tgdd.360.js not found";
            return
        }
        if (h.Tooltip) {
            return
        }
        var i = h.$;
        h.Tooltip = function (k, l) {
            var j = this.tooltip = h.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).j2("MagicToolboxTooltip");
            h.$(k).je1("mouseover", function () {
                j.j32(document.body)
            });
            h.$(k).je1("mouseout", function () {
                j.j33()
            });
            h.$(k).je1("mousemove", function (u) {
                var w = 20,
                    r = h.$(u).j15(),
                    q = j.j7(),
                    n = h.$(window).j7(),
                    v = h.$(window).j10();

                function m(y, o, x) {
                    return (x < (y - o) / 2) ? x : ((x > (y + o) / 2) ? (x - o) : (y - o) / 2)
                }
                j.j6({
                    left: v.x + m(n.width, q.width + 2 * w, r.x - v.x) + w,
                    top: v.y + m(n.height, q.height + 2 * w, r.y - v.y) + w
                })
            });
            this.text(l)
        };
        h.Tooltip.prototype.text = function (j) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(j))
        }
    })(g);
    (function (i) {
        if (!i) {
            throw "tgdd.360.js not found";
            return
        }
        if (i.MessageBox) {
            return
        }
        var h = i.$;
        i.Message = function (m, l, k, j) {
            this.hideTimer = null;
            this.messageBox = i.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).j2(j || "").j32(k || i.body);
            this.setMessage(m);
            this.show(l)
        };
        i.Message.prototype.show = function (j) {
            this.messageBox.show();
            this.hideTimer = this.hide.j24(this).j27(i.ifndef(j, 5000))
        };
        i.Message.prototype.hide = function (j) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new g.FX(this.messageBox, {
                    duration: i.ifndef(j, 500),
                    onComplete: function () {
                        this.messageBox.kill();
                        delete this.messageBox;
                        this.hideFX = null
                    }.j24(this)
                }).start({
                    opacity: [this.messageBox.j5("opacity"), 0]
                })
            }
        };
        i.Message.prototype.setMessage = function (j) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(j))
        }
    })(g);
    (function (i) {
        if (!i) {
            throw "tgdd.360.js not found";
            return
        }
        var h = i.$;
        g.ImageLoader = new i.Class({
            img: null,
            ready: false,
            options: {
                onload: i.$F,
                onabort: i.$F,
                onerror: i.$F,
                oncomplete: i.$F
            },
            size: null,
            _timer: null,
            _handlers: {
                onload: function (j) {
                    if (j) {
                        h(j).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    this.options.onload.j24(null, this).j27(1);
                    this.options.oncomplete.j24(null, this).j27(1)
                },
                onabort: function (j) {
                    if (j) {
                        h(j).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.j24(null, this).j27(1);
                    this.options.oncomplete.j24(null, this).j27(1)
                },
                onerror: function (j) {
                    if (j) {
                        h(j).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.j24(null, this).j27(1);
                    this.options.oncomplete.j24(null, this).j27(1)
                }
            },
            _bind: function () {
                h(["load", "abort", "error"]).j14(function (j) {
                    this.img.je1(j, this._handlers["on" + j].j16(this).j28(1))
                }, this)
            },
            _unbind: function () {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (j) {}
                    this._timer = null
                }
                h(["load", "abort", "error"]).j14(function (k) {
                    this.img.je2(k)
                }, this)
            },
            _cleanup: function () {
                this.j7();
                if (this.img.j29("new")) {
                    var j = this.img.parentNode;
                    this.img.j33().j31("new").j6({
                        position: "static",
                        top: "auto"
                    });
                    j.kill()
                }
            },
            init: function (k, j) {
                this.options = i.extend(this.options, j);
                this.img = h(k) || i.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).j32(i.$new("div").j2("magic-temporary-img").j6({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).j32(i.body)).j30("new", true);
                var l = function () {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    l = null
                }.j24(this);
                this._bind();
                if (!k.src) {
                    this.img.src = k
                } else {
                    if (i.j21.trident900 && i.j21.ieMode < 9) {
                        this.img.onreadystatechange = function () {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                l && l()
                            }
                        }.j24(this)
                    }
                    this.img.src = k.src
                }
                this.img && this.img.complete && (this._timer = l.j27(100))
            },
            destroy: function () {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function () {
                var j = this.img;
                return (j.naturalWidth) ? (j.naturalWidth > 0) : (j.readyState) ? ("complete" == j.readyState) : j.width > 0
            },
            j7: function () {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(g);
    g.Options = (function (i) {
        if (!i) {
            throw "tgdd.360.js not found";
            return
        }
        var h = i.$;
        var j = function (k) {
            this.defaults = k;
            this.options = {}
        };
        j.prototype.get = function (k) {
            return i.defined(this.options[k]) ? this.options[k] : this.defaults[k]
        };
        j.prototype.set = function (l, k) {
            l = l.j26();
            if (!l) {
                return
            }
            i.j1(k) === "string" && (k = k.j26());
            if (k === "true") {
                k = true
            }
            if (k === "false") {
                k = false
            }
            if (parseInt(k) == k) {
                k = parseInt(k)
            }
            this.options[l] = k
        };
        j.prototype.fromRel = function (k) {
            var l = this;
            h(k.split(";")).j14(function (m) {
                m = m.split(":");
                l.set(m.shift(), m.join(":"))
            })
        };
        j.prototype.fromJSON = function (l) {
            for (var k in l) {
                if (l.hasOwnProperty(k)) {
                    this.set(k, l[k])
                }
            }
        };
        j.prototype.exists = function (k) {
            return i.defined(this.options[k]) ? true : false
        };
        return j
    }(g));
    f.Element.addEvent__ = f.Element.je1;
    f.Element.je1 = function (k, h) {
        if (k == "mousewheel") {
            f.j21.gecko && (k = "DOMMouseScroll");
            var j = h,
                i = this;
            h = function (l) {
                var m = 0;
                if (l.wheelDelta) {
                    m = l.wheelDelta / 120
                } else {
                    if (l.detail) {
                        m = -l.detail / 3
                    }
                }
                l.delta = Math.round(m);
                j.call(i, l)
            }
        }
        return this.addEvent__(k, h)
    };
    var e = f.$;
    f.me = {
        mousedown: f.j21.touchScreen ? "touchstart" : "mousedown",
        mouseup: f.j21.touchScreen ? "touchend" : "mouseup",
        mousemove: f.j21.touchScreen ? "touchmove" : "mousemove",
        mouseover: "mouseover",
        mouseout: f.j21.touchScreen ? "touchend" : "mouseout",
        click: "click"
    };
    var a = function (m, i) {
        this.o = e(m);
        while (m.firstChild && m.firstChild.tagName !== "IMG") {
            m.removeChild(m.firstChild)
        }
        if (m.firstChild.tagName !== "IMG") {
            throw "Lỗi khi tải hình 360 độ"
        }
        this.oi = m.replaceChild(m.firstChild.cloneNode(false), m.firstChild);
        this._o = new f.Options({
            rows: 1,
            frames: 1,
            columns: 36,
            speed: 50,
            filename: "auto",
            filepath: "auto",
            "large-filename": "auto",
            "large-filepath": "auto",
            "loop-row": false,
            "loop-column": true,
            "start-row": "auto",
            "start-column": "auto",
            "row-increment": 1,
            "column-increment": 1,
            autospin: "once",
            "autospin-start": "load",
            "autospin-stop": "click",
            "autospin-speed": 4000,
            "autospin-direction": "clockwise",
            spin: "drag",
            smoothing: true,
            magnify: true,
            "magnifier-width": "80%",
            "magnifier-shape": "inner",
            fullscreen: true,
            hint: true,
            images: "",
            "large-images": "",
            "initialize-on": "load",
            "mousewheel-step": 3,
            onready: f.$F,
            onstart: f.$F,
            onstop: f.$F
        });
        this.op = e(this._o.get).j24(this._o);
        this._o.fromJSON(f.extend(window.tgdd360Options || {}, tgdd360.options));
        this._o.fromRel(m.getAttribute("data-tgdd360-options") || m.rel);
        this.lang = new f.Options({
            "loading-text": "Đang tải...",
            "hint-text": "Kéo chuột để xoay hình",
            "mobile-hint-text": "Swipe to spin"
        });
        this.lang.fromJSON(f.extend(window.tgdd360Lang || {}, tgdd360.lang));
        this.localString = e(this.lang.get).j24(this.lang);
        this._o.exists("magnifier-size") && this._o.set("magnifier-width", this.op("magnifier-size"));
        if (this._o.exists("magnify-filename") && "auto" !== this.op("magnify-filename")) {
            this._o.set("large-filename", this.op("magnify-filename"))
        }
        if (this._o.exists("magnify-filepath") && "auto" !== this.op("magnify-filepath")) {
            this._o.set("large-filepath", this.op("magnify-filepath"))
        }
        if (this._o.exists("magnifier-images")) {
            this._o.set("large-images", this.op("magnifier-images"))
        }
        this.images = {
            small: e([]),
            large: e([])
        };
        this.isFullScreen = false;
        this.fullScreenSize = {
            width: 0,
            height: 0
        };
        this.fullScreenBox = null;
        this.fullscreenIcon = null;
        this.fullScreenImage = null;
        this.fullScreenResizeCallback = null;
        this.fullScreenFX = null;
        this.fullScreenExitFX = null;
        this.largeImageReady = false;
        this.resizeCallback = null;
        this.boundaries = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        this.normalSize = {
            width: 0,
            height: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        var h = this;

        function l(v, s, q) {
            var r, p = {
                path: s,
                tpl: q.replace(/(\/|\\)/ig, "")
            };
            v = v.split("/");
            q = v.pop().split(".");
            s = v.join("/") + "/";
            r = q.pop();
            p.path = "auto" == p.path ? s : p.path.replace(/\/$/, "") + "/";
            if (p.tpl == "auto") {
                q = q.join(".").split("-");
                var o = q.pop(),
                    u = q.pop();
                if (parseInt(o, 10) != o) {
                    q.push(u);
                    u = true;
                    q.push(o);
                    o = true;
                    q.push("{row}");
                    q.push("{col}")
                } else {
                    if (parseInt(u, 10) != u) {
                        q.push(u);
                        u = false;
                        (!h._o.exists("start-row") || "auto" == h.op("start-row")) && h._o.set("start-row", 1)
                    }
                }
                u && q.push("{row}") && ("auto" == h.op("start-row") && h._o.set("start-row", u.j17()));
                o && q.push("{col}") && ("auto" == h.op("start-column") && h._o.set("start-column", o.j17()));
                q = q.join("-") + "." + r;
                p.tpl = q
            } else {
                if ("auto" == h.op("start-row") || "auto" == h.op("start-column")) {
                    q = q.join(".") + "." + r;
                    var n = q.match(new RegExp(p.tpl.split("{row}").join("(\\d{2})").split("{col}").join("(\\d{2})")));
                    ("auto" === h.op("start-row")) && h._o.set("start-row", (n && n.length > 2) ? n[1].j17() : 1);
                    ("auto" === h.op("start-column")) && h._o.set("start-column", (!n || n.length < 2) ? 1 : n.length > 2 ? n[2].j17() : n[1].j17())
                }
            }
            return p
        }
        function k(o, q) {
            var p = f.$new(o);
            var n = q.split(",");
            e(n).j14(function (r) {
                p.j2(r.j26())
            });
            p.j20({
                position: "absolute",
                top: -10000,
                left: 0,
                visibility: "hidden"
            });
            document.body.appendChild(p);
            (function () {
                this.j33()
            }).j24(p).j27(100)
        }
        var j;
        this.sis = e(e(this.op("images").j26().split(" ")).filter(function (n) {
            return "" != n
        }));
        this.bis = e(e(this.op("large-images").j26().split(" ")).filter(function (n) {
            return "" != n
        }));
        if (i) {
            this._o.options = i
        } else {
            if (!this.sis.length) {
                j = l(m.firstChild.src, this.op("filepath"), this.op("filename"));
                this._o.set("filepath", j.path);
                this._o.set("filename", j.tpl);
                j = l(m.href, this.op("large-filepath"), this.op("large-filename"));
                this._o.set("large-filepath", j.path);
                this._o.set("large-filename", j.tpl)
            }
            this._o.set("columns", Math.floor(this.op("columns") / this.op("column-increment")));
            this._o.set("rows", Math.floor(this.op("rows") / this.op("row-increment")));
            !parseInt(this.op("start-row"), 10) && this._o.set("start-row", 1);
            !parseInt(this.op("start-column"), 10) && this._o.set("start-column", 1);
            this._o.set("start-column", this.op("start-column") - 1);
            this._o.set("start-row", this.op("start-row") - 1);
            !parseInt(this.op("mousewheel-step"), 10) && this._o.set("mousewheel-step", 3);
            this._o.set("autospin-start", this.op("autospin-start").split(","));
            (f.j21.touchScreen && "hover" === this.op("autospin-stop")) && this._o.set("autospin-stop", "click");
            ("infinite" === this.op("autospin") && "hover" === this.op("autospin-stop")) && this._o.set("hint", false);
            !this._o.exists("hint") && ("infinite" === this.op("autospin") && "click" === this.op("autospin-stop") && e(this.op("autospin-start")).contains("click")) && this._o.set("hint", false);
            this._o.exists("loading-text") && this.lang.set("loading-text", this.op("loading-text"));
            ("string" == f.j1(this.op("onready"))) && ("function" == f.j1(window[this.op("onready")])) && this._o.set("onready", window[this.op("onready")])
        }
        this.o.je1("click", function (n) {
            n.stop()
        }).je1("dragstart", function (n) {
            n.stop()
        }).j6({
            "-webkit-user-select": "none",
            "-webkit-touch-callout": "none",
            "-webkit-tap-highlight-color": "transparent"
        });
        if (this.op("hint")) {
            k("span", "tgdd360-hint-side")
        }
        k("div", "tgdd360-progress-bar-state");
        k("div", "tgdd360-wait");
        if (this.op("fullscreen")) {
            k("div", "tgdd360-button,fullscreen")
        }
        new f.ImageLoader(m.firstChild, {
            onload: e(function (n) {
                var p = false,
                    o = e(function () {
                        if (!p) {
                            p = true;
                            e(this.preInit).call(this)
                        }
                    }).j24(this);
                switch (this.op("initialize-on")) {
                    case "hover":
                        this.o.je1("mouseover", o);
                        break;
                    case "click":
                        this.o.je1("click", o);
                        break;
                    default:
                        o()
                }
            }).j24(this)
        })
    };
    a.prototype.prepareUrl = function (j, h, i) {
        i = i === true ? "large-" : "";
        if (this.sis.length) {
            if (i && !this.bis.length) {
                return ""
            }
            return this[(i) ? "bis" : "sis"][(j - 1) * this.op("columns") + h - 1]
        }(j = 1 + (j - 1) * this.op("row-increment")) < 10 && (j = "" + j);
        (h = 1 + (h - 1) * this.op("column-increment")) < 10 && (h = "" + h);
        return this.op(i + "filepath") + this.op(i + "filename").split("{row}").join(j).split("{col}").join(h)
    };
    a.prototype.preloadImages = function (k, i) {
        var n = this.op("columns"),
            j = this.op("rows"),
            h, o, m = j * n / this.op("frames");
        k || (k = "small");
        for (o = 1; o <= j; o++) {
            this.images[k].push([]);
            for (h = 1; h <= n; h++) {
                this.images[k][o - 1].push("");
                new f.ImageLoader(this.prepareUrl(o, h, "large" === k), {
                    onload: e(function (l, q, p) {
                        this.images[k][q - 1][l - 1] = p.img;
                        m--;
                        i && i(m)
                    }).j24(this, h, o)
                })
            }
        }
    };
    a.prototype.preInit = function (j) {
        if (!j && (this.op("fullscreen") || this.op("magnify"))) {
            new f.ImageLoader(this.prepareUrl(1, 1, true), {
                onload: e(function (n) {
                    this.fullScreenSize = n.j7()
                }).j24(this),
                onerror: e(function (n) {
                    this._o.set("fullscreen", false);
                    this._o.set("magnify", false)
                }).j24(this),
                oncomplete: e(function (n) {
                    this.preInit(true)
                }).j24(this)
            });
            return
        }
        this.normalSize = e(this.o.firstChild).j7();
        this.size = this.normalSize;
        if (0 == this.size.height) {
            this.preInit.j24(this).j27(500);
            return
        }
        this.wrapper = f.$new("div").j6(this.size).j6({
            display: "block" == this.o.j5("display") ? "block" : "inline-block",
            overflow: "hidden",
            position: "relative"
        }).enclose(this.o.j6({
            display: "block" == this.o.j5("display") ? "block" : "inline-block",
            overflow: "hidden",
            position: "relative",
            "text-decoration": "none",
            color: "#000",
            height: "100%"
        }));
        this.o.firstChild.j6({
            width: "100%"
        });
        this.boundaries = this.o.j9();
        this.resizeCallback = function () {
            this.boundaries = this.wrapper.j9()
        }.j24(this);
        e(window).je1("resize", this.resizeCallback);
        if (!f.j21.touchScreen) {
            this.o.j2("desktop")
        }
        if (f.j21.ieMode) {
            this.o.j2("magic-for-ie" + f.j21.ieMode)
        }
        var i, k, m;
        this.o.append(i = f.$new("DIV", null, {
            position: "absolute",
            cursor: "default"
        }).append(f.$new("DIV").append(e(f.doc.createTextNode(this.localString("loading-text")))).append(f.$new("DIV").append(f.$new("DIV").j2("bar").append(k = f.$new("DIV").j2("state").j6({
            width: 0
        }))))).j2("progress"));
        m = i.j7();
        i.j6({
            top: (this.size.height - m.height) / 2 + "px",
            left: (this.size.width - m.width) / 2 + "px"
        });
        var l = 0,
            h = parseFloat(m.width) / parseFloat(this.op("rows") * (this.op("columns") / this.op("frames")));
        this.preloadImages("small", function (n) {
            k.j6Prop("width", l += h);
            if (n == 0) {
                new f.FX(i, {
                    onComplete: function () {
                        i.j33()
                    }
                }).start({
                    opacity: [i.j5("opacity"), 0]
                });
                this.init()
            }
        }.j24(this))
    };
    a.prototype.init = function () {
        this.C = {
            row: 1,
            col: 1,
            tmp: {
                row: 1,
                col: 1
            }
        };
        this.jump(this.op("start-row"), this.op("start-column"));
        var p = {
            x: 0,
            y: 0
        };
        var m = {
            x: 0,
            y: 0
        };
        var l = this;
        var v = {
            x: Math.floor(this.size.width / this.op("columns") / Math.pow(this.op("speed") / 50, 2)),
            y: Math.floor(this.size.height / this.op("rows") / Math.pow(this.op("speed") / 50, 2))
        };
        var s = false;
        var q = false;
        var u = false,
            w = false;
        this._A = {
            invoked: false,
            infinite: ("infinite" == this.op("autospin")),
            cancelable: ("never" != this.op("autospin-stop")),
            timer: false,
            maxFrames: (function (x, y) {
                switch (x) {
                    case "once":
                        return 1 * y;
                    case "twice":
                        return 2 * y;
                    case "infinite":
                        return Number.MAX_VALUE;
                    default:
                        return 0
                }
            })(this.op("autospin"), this.op("columns")),
            frames: 0,
            fn: (function (y, x) {
                this.jump(this.C.row, this.C.col + x);
                (--this._A.frames > 0) && (this._A.timer = this._A.fn.j27(y))
            }).j24(this, this.op("autospin-speed") / this.op("columns"), ("anticlockwise" == this.op("autospin-direction") ? -1 : 1)),
            play: function (x) {
                this.frames = x || this.maxFrames;
                clearTimeout(this.timer);
                if (this.frames > 0) {
                    this.timer = this.fn.j27(1)
                }
            },
            pause: function () {
                this.timer && clearTimeout(this.timer);
                this.frames = 0
            }
        };
        this.o.j6({
            outline: "none"
        });
        this._A.cancelable && e(l.op("spin") == "drag" ? document : this.o).je1(f.me.mousemove, this.mMoveEvent = function (C) {
            if ((/touch/i).test(C.type) && C.touches.length > 1) {
                return true
            }
            if (q || w) {
                if (!w) {
                    i(C);
                    s = true
                } else {
                    return
                }
            }
            var B = C.j15();
            var A = B.x - p.x,
                E = B.y - p.y,
                z = A > 0 ? Math.floor(A / v.x) : Math.ceil(A / v.x),
                D = E > 0 ? Math.floor(E / v.y) : Math.ceil(E / v.y);
            if (l.op("spin") == "hover" || l.op("spin") == "drag" && s) {
                u = true;
                if (Math.abs(A) >= v.x) {
                    p.x = p.x + z * v.x;
                    l.jump(l.C.row, l.C.col + (0 - z))
                }
                if (Math.abs(E) >= v.y) {
                    p.y = p.y + D * v.y;
                    l.jump(l.C.row + D, l.C.col)
                }
            }
            return false
        });
        this._A.cancelable && !f.j21.touchScreen && this.o.je1("mouseover", function (x) {
            if (q || w) {
                q && l.magnifier.div.show() && r(x);
                return
            }
            if (l._A.frames > 0 && "hover" == l.op("autospin-stop")) {
                l._A.pause()
            } else {
                !l._A.invoked && e(l.op("autospin-start")).contains("hover") && (l._A.invoked = !l._A.infinite) && l._A.play()
            }
            p = x.j15();
            return false
        });
        this._A.cancelable && !f.j21.touchScreen && this.o.je1("mouseout", function (x) {
            if (l.o.hasChild(x.getRelated())) {
                return
            }
            if (l._A.infinite && "hover" == l.op("autospin-stop")) {
                q && i(x);
                l._A.play()
            } else {
                q && x.stop() && i(x)
            }
            return false
        });
        var o = {
            date: false
        };
        this._A.cancelable && this.o.je1(f.me.mousedown, function (x) {
            if (3 == x.getButton()) {
                return true
            }
            if (l.hintBox) {
                l.hideHintBox()
            }
            if ((/touch/i).test(x.type) && x.touches.length > 1) {
                return true
            }
            m = x.j15();
            m.autospinStopped = false;
            if (q) {
                l.magnifier.delta.x = !f.j21.touchScreen ? 0 : m.x - l.magnifier.pos.x - l.boundaries.left;
                l.magnifier.delta.y = !f.j21.touchScreen ? 0 : m.y - l.magnifier.pos.y - l.boundaries.top;
                l.magnifier.ddx = l.magnifier.pos.x;
                l.magnifier.ddy = l.magnifier.pos.y
            }
            o.spos = x.j15();
            o.date = new Date();
            l.op("spin") == "drag" && (p = x.j15());
            if (q || w) {
                !f.j21.touchScreen && (w = false);
                return
            }
            x.stop();
            if (l._A.frames > 0 && "click" == l.op("autospin-stop")) {
                m.autospinStopped = true;
                l._A.pause()
            }
            s = true;
            u = false;
            l.op("spin") == "drag" && (p = x.j15());
            return false
        });
        this._A.cancelable && e(document).je1(f.me.mouseup, this.mUpEvent = function (x) {
            if (3 == x.getButton()) {
                return true
            }
            if (q || w || !s) {
                return
            }
            l._checkDragFrames(o, x.j15(), p, v);
            s = false
        });
        this._A.cancelable && this.o.je1(f.me.mouseup, function (y) {
            var x = y.j15();
            if (0 == Math.abs(x.x - m.x) && 0 == Math.abs(x.y - m.y)) {
                if (!q && !w) {
                    if (m.autospinStopped) {
                        return
                    }
                    if (!l._A.invoked && l._A.frames < 1 && e(l.op("autospin-start")).contains("click")) {
                        l._A.invoked = !l._A.infinite;
                        l._A.play();
                        return
                    }
                }
                if (l.op("magnify")) {
                    u = false;
                    i(y)
                }
                return
            }
            if (q || w) {
                return
            }
            l._checkDragFrames(o, y.j15(), p, v);
            s = false;
            return false
        });
        this._A.cancelable && this.o.je1("mousewheel", function (x) {
            if (q || w || l._A.frames > 0) {
                return
            }
            e(x).stop();
            l.jump(l.C.row, l.C.col + l.op("mousewheel-step") * x.delta, true, 200)
        });
        if (this._A.cancelable && !("infinite" == this.op("autospin") && e(this.op("autospin-start")).contains("click")) && this.op("magnify")) {
            q = false;
            if ("inner" != this.op("magnifier-shape")) {
                var h = "" + this.op("magnifier-width");
                if (h.match(/\%$/i)) {
                    h = Math.round(this.size.width * parseInt(h) / 100)
                } else {
                    h = parseInt(h)
                }
            }
            this.o.j2("zoom-in");
            this.magnifier = {
                div: f.$new("div", null, {
                    position: "absolute",
                    "z-index": 10,
                    left: 0,
                    top: 0,
                    width: (h || this.size.width) + "px",
                    height: (h || this.size.height) + "px",
                    "background-repeat": "no-repeat",
                    "border-radius": ("circle" != l.op("magnifier-shape")) ? 0 : h / 2
                }),
                ratio: {
                    x: 0,
                    y: 0
                },
                pos: {
                    x: 0,
                    y: 0
                },
                delta: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: (h || this.size.width),
                    height: (h || this.size.width)
                },
                ddx: 0,
                ddy: 0,
                fadeFX: null,
                moveTimer: null,
                start: function (x, y) {
                    this.ratio.x || (this.ratio.x = x.j7().width / l.size.width);
                    this.ratio.y || (this.ratio.y = x.j7().height / l.size.height);
                    q = true;
                    s = false;
                    if ("inner" == l.op("magnifier-shape")) {
                        this.size = x.j7();
                        this.div.j6({
                            width: this.size.width,
                            height: this.size.height
                        })
                    }
                    this.div.j6Prop("background-image", "url('" + x.img.src + "')");
                    this.div.j23(0);
                    l.o.j3("zoom-in");
                    l.o.append(this.div);
                    r(null, y);
                    this.fadeFX.stop();
                    this.fadeFX.options.duration = 400;
                    this.fadeFX.options.onComplete = f.$F;
                    this.fadeFX.start({
                        opacity: [0, 1]
                    });
                    k && k.toggle(false)
                },
                stop: function () {
                    q = false;
                    w = false;
                    this.fadeFX.stop();
                    this.fadeFX.options.onComplete = function () {
                        l.magnifier.div.j33();
                        l.magnifier.pos = {
                            x: 0,
                            y: 0
                        };
                        l.magnifier.delta = {
                            x: 0,
                            y: 0
                        };
                        l.magnifier.ddx = 0, l.magnifier.ddy = 0;
                        l.o.j2("zoom-in")
                    };
                    this.fadeFX.options.duration = 200;
                    this.fadeFX.start({
                        opacity: [this.fadeFX.el.j5("opacity"), 0]
                    })
                },
                move: function () {
                    var z, G, C, A, D, B, F, E;
                    if ("inner" != l.op("magnifier-shape")) {
                        z = this.x;
                        G = this.y;
                        this.moveTimer = null
                    } else {
                        C = Math.ceil((this.x - this.ddx) * 0.4);
                        A = Math.ceil((this.y - this.ddy) * 0.4);
                        if (!C && !A) {
                            this.moveTimer = null;
                            return
                        }
                        this.ddx += C;
                        this.ddy += A;
                        z = this.pos.x + C;
                        G = this.pos.y + A;
                        (z > l.size.width) && (z = l.size.width);
                        (G > l.size.height) && (G = l.size.height);
                        z < 0 && (z = 0);
                        G < 0 && (G = 0);
                        this.pos = {
                            x: z,
                            y: G
                        };
                        if (f.j21.touchScreen && "inner" == l.op("magnifier-shape")) {
                            z = l.size.width - z;
                            G = l.size.height - G
                        }
                    }
                    D = z - this.size.width / 2;
                    B = G - this.size.height / 2;
                    F = Math.round(0 - z * this.ratio.x + (this.size.width / 2));
                    E = Math.round(0 - G * this.ratio.y + (this.size.height / 2));
                    if ("inner" == l.op("magnifier-shape")) {
                        D = (D < l.size.width - this.size.width) ? l.size.width - this.size.width : (D > 0) ? 0 : D;
                        B = (B < l.size.height - this.size.height) ? l.size.height - this.size.height : (B > 0) ? 0 : B;
                        if (F < 0 && F < l.size.width - this.size.width) {
                            F = l.size.width - this.size.width
                        }
                        if (F > 0 && F > this.size.width - l.size.width) {
                            F = this.size.width - l.size.width
                        }
                        if (E < 0 && E < l.size.height - this.size.height) {
                            E = l.size.height - this.size.height
                        }
                        if (E > 0 && E > this.size.height - l.size.height) {
                            E = this.size.height - l.size.height
                        }
                    }
                    q && this.div.j6({
                        left: D,
                        top: B,
                        "background-position": F + "px " + E + "px"
                    });
                    if (this.moveTimer) {
                        this.moveTimer = setTimeout(this.moveBind, 40)
                    }
                }
            };
            this.magnifier.fadeFX = new f.FX(this.magnifier.div);
            this.magnifier.moveBind = this.magnifier.move.j24(this.magnifier);
            this.magnifier.div.j2("magnifier").j2(this.op("magnifier-shape"));
            if ("inner" != this.op("magnifier-shape")) {
                l.magnifier.div.je1("mousewheel", function (z) {
                    e(z).stop();
                    var y = 10;
                    y = (100 + y * Math.abs(z.delta)) / 100;
                    if (z.delta < 0) {
                        y = 1 / y
                    }
                    l.magnifier.size = this.j7();
                    var x = Math.round(l.magnifier.size.width * y);
                    this.j6({
                        width: x,
                        height: x,
                        "border-radius": ("circle" != l.op("magnifier-shape")) ? 0 : x / 2
                    });
                    r(z)
                })
            }
            var k = this.loader = f.$new("div").j2("tgdd360-wait");
            k.toggle = function (x) {
                if (x) {
                    e(l.o.firstChild).j23(0.5);
                    l.o.append(k)
                } else {
                    e(l.o.firstChild).j23(1);
                    (l.o === this.parentNode) && l.o.removeChild(k)
                }
            };

            function i(B, x) {
                var A, z, y;
                if (u) {
                    return
                }
                if (l.isFullScreen) {
                    return
                }
                if (f.j1(B) == "event") {
                    if ((y = e(B.getTarget())).j13("icon")) {
                        if (q && y.j13("magnify")) {
                            return
                        }
                        if (!q && y.j13("spin")) {
                            return
                        }
                    }
                    B.stop()
                }
                if (q && x) {
                    return
                }
                if (!q && false == x) {
                    return
                }
                if (q && !x) {
                    l.magnifier.stop();
                    y && y.j13("spin") && l._A.infinite && l._A.play()
                } else {
                    A = l.checkJumpRowCol(l.C.row, l.C.col);
                    z = (f.j1(B) == "event") ? B.j15() : B;
                    k && k.toggle(true);
                    w = true;
                    s = false;
                    l._A.pause();
                    new f.ImageLoader(l.prepareUrl(A.row + 1, A.col + 1, true), {
                        onload: function (C) {
                            l.magnifier.start(C, z)
                        },
                        onerror: function () {
                            w = false;
                            k && k.toggle(false)
                        }
                    })
                }
                return false
            }
            this._showM = i.j24(this, {
                x: l.boundaries.left + (l.boundaries.right - l.boundaries.left) / 2,
                y: l.boundaries.top + (l.boundaries.bottom - l.boundaries.top) / 2
            }, true);
            this._hideM = i.j24(this, null, false);

            function r(y, x) {
                if (!q) {
                    return
                }
                x = x || y.j15();
                if (x.x > l.boundaries.right || x.x < l.boundaries.left || x.y > l.boundaries.bottom || x.y < l.boundaries.top) {
                    return
                }
                if (y && f.j21.touchScreen) {
                    y.stop()
                }
                if (f.j21.touchScreen && "inner" == l.op("magnifier-shape")) {
                    x.x -= l.magnifier.delta.x;
                    x.y -= l.magnifier.delta.y;
                    if (!y) {
                        x.x = l.boundaries.right - x.x + l.boundaries.left;
                        x.y = l.boundaries.bottom - x.y + l.boundaries.top
                    }
                }
                l.magnifier.x = x.x - l.boundaries.left;
                l.magnifier.y = x.y - l.boundaries.top;
                (null == l.magnifier.moveTimer) && (l.magnifier.moveTimer = setTimeout(l.magnifier.moveBind, 10))
            }
            this.o.je1(f.me.mousemove, r)
        }
        if (this._A.cancelable && this.op("fullscreen")) {
            this.fullscreenIcon = f.$new("div", null, {}).j2("tgdd360-button").j2("fullscreen").je1(f.me.mousedown, function (x) {
                x.stop()
            }).je1(f.me.mouseup, function (x) {
                if (3 == x.getButton()) {
                    return true
                }
                x.stop();
                this.enterFullscreen()
            }.j16(this)).j32(this.o)
        }(this._A.maxFrames > 0) && e(this.op("autospin-start")).contains("load") && this._A.play();
        if (this.op("hint") && this._A.cancelable) {
            this.setupHint()
        }
        function j(A, y, B) {
            for (B = 0, y = ""; B < A.length; y += String.fromCharCode(14 ^ A.charCodeAt(B++))) {}
            return y
        }
        var n, j;
        n = f.$new("div", null, {
            color: "red",
            position: "absolute",
            bottom: 0,
            right: 0,
            "font-size": "0.8em",
            "z-index": 100
        }).j32(this.o);
        //n.changeContent(j("Wa{.o|k.{}g`i.z|gob.xk|}ga`.ah.Coigm.=8>(z|ojk5"));
        ("function" == f.j1(this.op("onready"))) && this.op("onready").call(null, this.o)
    };
    a.prototype._checkDragFrames = function (i, h, j, n) {
        if (!this.op("smoothing") || !i.date) {
            return
        }
        var m = new Date() - i.date;
        i.date = false;
        var p = h.x - i.spos.x;
        var o = h.y - i.spos.y;
        var k = 0.001;

        function l(w) {
            var x = w == "x" ? p : o;
            var q = x / m;
            var u = (q / 2) * (q / k);
            var s;
            if (w == "x") {
                s = Math.abs(x + (x > 0 ? u : (0 - u))) - Math.abs(i.spos.x - j.x);
                s = x > 0 ? (0 - s) : s
            } else {
                s = u - (i.spos.y - j.y)
            }
            s /= n[w];
            return s > 0 ? Math.floor(s) : Math.ceil(s)
        }
        this.jump(this.C.row + l("y"), this.C.col + l("x"), true, Math.abs(Math.floor(p / m / k)))
    };
    a.prototype.jump = function (k, i, h, j) {
        this.C.row = k;
        this.C.col = i;
        this.fx && this.fx.stop();
        if (!h) {
            this.C.tmp.row = k;
            this.C.tmp.col = i;
            this.jump_(k, i);
            return
        }
        this.fx = new f.FX(this.o, {
            duration: j,
            transition: f.FX.Transition.quadOut,
            onStart: function () {
                b = new Date()
            },
            onBeforeRender: (function (l) {
                this.C.tmp.col = l.col;
                this.C.tmp.row = l.row;
                this.jump_(l.row, l.col)
            }).j24(this)
        }).start({
            col: [this.C.tmp.col, i],
            row: [this.C.tmp.row, k]
        })
    };
    a.prototype.checkJumpRowCol = function (i, h) {
        if (!this.op("loop-row")) {
            i > (this.op("rows") - 1) && (i = this.op("rows") - 1);
            i < 0 && (i = 0)
        }
        if (!this.op("loop-column")) {
            h > (this.op("columns") - 1) && (h = this.op("columns") - 1);
            h < 0 && (h = 0)
        }
        i %= this.op("rows");
        h %= this.op("columns");
        i < 0 && (i += this.op("rows"));
        h < 0 && (h += this.op("columns"));
        return {
            row: i,
            col: h
        }
    };
    a.prototype.jump_ = function (k, h) {
        var i = this.checkJumpRowCol(k, h);
        k = i.row;
        h = i.col;
        (!this.op("loop-row")) && (this.C.row = i.row);
        (!this.op("loop-column")) && (this.C.col = i.col);
        var j = this.images[this.isFullScreen ? "large" : "small"][k][Math.floor(h / this.op("frames"))];
        this.o.firstChild.src = j.src;
        this.o.scrollLeft = h % this.op("frames") * this.size.width
    };
    a.prototype.spin = function (h) {
        (this._hideM) && this._hideM();
        (h || null) ? this.jump(this.C.row, this.C.col + h, true, 100 * (Math.log(Math.abs(h) / Math.log(2)))) : this._A.play(Number.MAX_VALUE)
    };
    a.prototype.magnify = function (i) {
        (f.defined(i) ? i : true) ? this._showM && this._showM() : this._hideM && this._hideM()
    };
    a.prototype.stop = function () {
        this._A && this._A.frames > 0 && this._A.pause();
        if (this.isFullScreen) {
            this.o.firstChild.j6({});
            this.o.j6({
                width: "",
                height: "100%",
                "max-height": "",
                "max-width": ""
            }).j32(this.wrapper)
        }
        if (this.fullScreenBox) {
            if (this.fullScreenScrollCallback) {
                e(window).je2("scroll", this.fullScreenScrollCallback)
            }
            if (this.fullScreenScrollCallbackTimer) {
                clearTimeout(this.fullScreenScrollCallbackTimer)
            }
            if (this.fullScreenResizeCallback) {
                e(window).je2("resize", this.fullScreenResizeCallback)
            }
            this.fullScreenBox.kill();
            this.fullScreenBox = null
        }
        if (this.magnifier && this.magnifier.div) {
            this.magnifier.div.kill();
            this.magnifier = null
        }
        if (this.fullscreenIcon) {
            this.fullscreenIcon.kill();
            this.fullscreenIcon = null
        }
        e(window).je2("resize", this.resizeCallback);
        this.o.je3();
        while (this.o.firstChild != this.o.lastChild) {
            this.o.removeChild(this.o.lastChild)
        }
        if (this.op("spin") == "drag") {
            e(document).je2("mousemove", this.mMoveEvent)
        }
        e(document).je2("mousemove", this.mUpEvent);
        this.o.replaceChild(this.oi, this.o.firstChild);
        this.o.j3("zoom-in");
        this.wrapper.parentNode.replaceChild(this.o, this.wrapper);
        this.wrapper.kill();
        this.wrapper = null
    };
    a.prototype.enterFullscreen = function () {
        if (!this._A.cancelable || !this.op("fullscreen")) {
            return
        }
        var j = e(document).j7(),
            h = e(window).j10(),
            i = this.checkJumpRowCol(this.C.row, this.C.col);
        if (!this.fullScreenBox) {
            this.fullScreenBox = f.$new("div", {}, {
                display: "block",
                overflow: "hidden",
                position: "absolute",
                zIndex: 20000,
                "text-align": "center",
                "vertical-align": "middle",
                opacity: 1,
                width: this.size.width,
                height: this.size.height,
                top: this.boundaries.top,
                left: this.boundaries.left
            }).j2("tgdd360-fullscreen");
            if (!f.j21.touchScreen) {
                this.fullScreenBox.j2("desktop")
            }
            if (f.j21.ieMode) {
                this.fullScreenBox.j2("magic-for-ie" + f.j21.ieMode)
            }
            if (f.j21.ieMode && f.j21.ieMode < 8) {
                this.fullScreenBox.append(f.$new("span", null, {
                    display: "inline-block",
                    height: "100%",
                    width: 1,
                    "vertical-align": "middle"
                }))
            }
            this.fullScreenResizeCallback = function () {
                var k, m, n = e(document).j7(),
                    l = this.fullScreenSize.width / this.fullScreenSize.height;
                if (f.j21.trident && f.j21.backCompat) {
                    this.fullScreenBox.j6({
                        width: n.width,
                        height: n.height
                    })
                }
                k = Math.min(this.fullScreenSize.width, n.width * 0.98);
                m = Math.min(this.fullScreenSize.height, n.height * 0.98);
                if (k / m > l) {
                    k = m * l
                } else {
                    if (k / m < l) {
                        m = k / l
                    }
                }
                this.o.j6Prop("width", Math.ceil(k));
                this.size = this.o.j7()
            }.j24(this);
            if (f.j21.trident && f.j21.backCompat) {
                this.fullScreenScrollCallback = function () {
                    var k = e(window).j10(),
                        l = this.fullScreenBox.j8();
                    this.fullScreenScrollCallbackTimer && clearTimeout(this.fullScreenScrollCallbackTimer);
                    this.fullScreenScrollCallbackTimer = setTimeout(function () {
                        new f.FX(this.fullScreenBox, {
                            duration: 250
                        }).start({
                            top: [l.top, k.y],
                            left: [l.left, k.x]
                        })
                    }.j24(this), 300)
                }.j24(this)
            }
        }
        this.fullScreenImage && (this.fullScreenImage.src = this.o.firstChild.src) || (this.fullScreenImage = e(this.o.firstChild.cloneNode(false)));
        if (j.width / j.height > this.fullScreenSize.width / this.fullScreenSize.height) {
            this.fullScreenImage.j6({
                width: "auto",
                height: "98%",
                "max-height": this.fullScreenSize.height,
                display: "inline-block",
                "vertical-align": "middle"
            })
        } else {
            this.fullScreenImage.j6({
                width: "98%",
                "max-width": this.fullScreenSize.width,
                height: "auto",
                display: "inline-block",
                "vertical-align": "middle"
            })
        }
        this.fullScreenBox.j32(f.body).append(this.fullScreenImage).show();
        g.j21.features.fullScreen && this.fullScreenBox.j23(1);
        g.j21.fullScreen.request(this.fullScreenBox, {
            onEnter: this.onEnteredFullScreen.j24(this),
            onExit: this.onExitFullScreen.j24(this),
            fallback: function () {
                this.fullScreenFX || (this.fullScreenFX = new f.FX(this.fullScreenBox, {
                    duration: 1000,
                    transition: f.FX.Transition.expoOut,
                    onStart: (function () {
                        this.fullScreenBox.j6({
                            width: this.size.width,
                            height: this.size.height,
                            top: this.boundaries.top,
                            left: this.boundaries.left
                        }).j32(f.body)
                    }).j24(this),
                    onComplete: (function () {
                        this.onEnteredFullScreen(true)
                    }).j24(this)
                }));
                this.fullScreenFX.start({
                    width: [this.size.width, j.width],
                    height: [this.size.height, j.height],
                    top: [this.boundaries.top, 0 + h.y],
                    left: [this.boundaries.left, 0 + h.x],
                    opacity: [0, 1]
                })
            }.j24(this)
        })
    };
    a.prototype.onEnteredFullScreen = function (i) {
        var j;
        (i && !this.isFullScreen && !(f.j21.trident && f.j21.backCompat)) && this.fullScreenBox.j6({
            display: "block",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "auto",
            height: "auto"
        });
        this.isFullScreen = true;
        this.size = this.fullScreenSize;
        if (!this.largeImageReady) {
            j = f.$new("div").j2("tgdd360-wait").j32(this.fullScreenBox);
            this.fullScreenImage.j23(0.5);
            this.preloadImages("large", function (k) {
                if (k == 0) {
                    j && j.j33() && delete j;
                    this.largeImageReady = true;
                    this.onEnteredFullScreen(i)
                }
            }.j24(this));
            return
        }
        this.jump_(this.C.row, this.C.col);
        this.o.firstChild.j6({
            width: "100%",
            height: "auto",
            "max-width": this.fullScreenSize.width,
            "max-height": this.fullScreenSize.height
        });
        this.fullScreenBox.replaceChild(this.o.j6({
            width: this.fullScreenImage.j7().width,
            height: "auto",
            "max-width": this.fullScreenSize.width,
            "max-height": this.fullScreenSize.height
        }), this.fullScreenImage);
        this.size = this.o.j7();
        e(window).je1("resize", this.fullScreenResizeCallback);
        if (this.fullScreenScrollCallback) {
            e(window).je1("scroll", this.fullScreenScrollCallback)
        }
        this.leaveFSButton || (this.leaveFSButton = f.$new("div", {}, {
            zIndex: 20
        }).j2("tgdd360-button").j2("fullscreen-exit").j32(this.fullScreenBox).je1(f.me.mouseup, function (k) {
            if (3 == k.getButton()) {
                return true
            }
            k.stop();
            this.exitFullscreen()
        }.j16(this)));
        this.leaveFSButton.show();
        if (i) {
            var h = function (k) {
                if (k.keyCode == 27) {
                    f.doc.je2("keydown", h);
                    this.exitFullscreen()
                }
            }.j16(this);
            f.doc.je1("keydown", h);
            !f.j21.touchScreen && (this.leaveFSMessage = new f.Message("Press ESC key to leave full-screen", 4000, this.fullScreenBox, "tgdd360-message"))
        }
    };
    a.prototype.exitFullscreen = function () {
        var i = e(document).j7(),
            h = e(document).j10();
        this.leaveFSMessage && this.leaveFSMessage.hide(0);
        this.fullScreenImage.src = this.o.firstChild.src;
        if (i.width / i.height > this.fullScreenSize.width / this.fullScreenSize.height) {
            this.fullScreenImage.j6({
                width: "auto",
                height: "98%",
                "max-height": this.fullScreenSize.height,
                display: "inline-block",
                "vertical-align": "middle"
            })
        } else {
            this.fullScreenImage.j6({
                width: "98%",
                "max-width": this.fullScreenSize.width,
                height: "auto",
                display: "inline-block",
                "vertical-align": "middle"
            })
        }
        this.fullScreenBox.replaceChild(this.fullScreenImage, this.o);
        if (g.j21.fullScreen.capable && g.j21.fullScreen.enabled()) {
            g.j21.fullScreen.cancel()
        } else {
            this.o.j6({
                width: "",
                height: "100%",
                "max-height": "",
                "max-width": "100%"
            }).j32(this.wrapper);
            this.leaveFSButton.hide();
            this.fullScreenExitFX || (this.fullScreenExitFX = new f.FX(this.fullScreenBox, {
                duration: 1500,
                transition: f.FX.Transition.expoOut,
                onStart: (function () {
                    this.fullScreenBox.j6({
                        position: "absolute"
                    }).j32(f.body)
                }).j24(this),
                onComplete: (function () {
                    this.onExitFullScreen(true)
                }).j24(this)
            }));
            this.fullScreenExitFX.start({
                width: [i.width, this.normalSize.width],
                height: [i.height, this.normalSize.height],
                top: [0 + h.y, this.boundaries.top],
                left: [0 + h.x, this.boundaries.left],
                opacity: [1, 0]
            })
        }
    };
    a.prototype.onExitFullScreen = function (h) {
        if (!this.fullScreenBox) {
            return
        }
        if (!h) {
            this.o.j6({
                width: "",
                height: "100%",
                "max-height": "",
                "max-width": "100%"
            }).j32(this.wrapper);
            this.leaveFSButton.hide()
        }
        this.size = this.normalSize;
        e(window).je2("resize", this.fullScreenResizeCallback);
        if (this.fullScreenScrollCallback) {
            e(window).je2("scroll", this.fullScreenScrollCallback)
        }
        this.isFullScreen = false;
        this.fullScreenBox.hide();
        this.jump_(this.C.row, this.C.col)
    };
    a.prototype.setupHint = function () {
        this.hintBox = f.$new("span", null, {
            position: "absolute",
            "z-index": 999,
            visibility: "hidden"
        }).j2("tgdd360-hint").j32(this.o);
        this.hintBox.j6Prop("margin-left", - (parseInt(this.hintBox.j5("width"), 10) / 2));
        f.$new("span").j2("hint-side").j2("right").j32(this.hintBox);
        f.$new("span").j2("hint-side").j2("left").j32(this.hintBox);
        this.hintBox.append(f.$new("span", null, {
            display: "inline-block",
            height: "100%",
            width: 1,
            "vertical-align": "middle"
        }));
        f.$new("span").j6({
            position: "relative",
            margin: "auto",
            display: "inline-block",
            "vertical-align": "middle"
        }).j2("hint-text").append(document.createTextNode(this.localString(f.j21.touchScreen ? "mobile-hint-text" : "hint-text"))).j32(this.hintBox);
        if (f.j21.ieMode == 5) {
            this.hintBox.j6({
                height: this.hintBox.j7().height
            })
        }
        this.hintBox.show();
        var h = function (j) {
            this.o.je2("mousewheel", h);
            this.hideHintBox()
        }.j16(this);
        this.o.je1("mousewheel", h);
        if ("hover" === this.op("spin")) {
            var i = function (j) {
                this.hideHintBox();
                this.o.je2("mousemove", i)
            }.j16(this);
            this.o.je1("mousemove", i)
        }
    };
    a.prototype.hideHintBox = function () {
        if (!this.hintBox || this.hintBox.hidding) {
            return
        }
        this.hintBox.hidding = true;
        new f.FX(this.hintBox, {
            duration: 200,
            onComplete: function () {
                this.hintBox.j33();
                delete this.hintBox
            }.j24(this)
        }).start({
            opacity: [this.hintBox.j5("opacity"), 0]
        })
    };
    var d = {
        version: "v3.0.2",
        tools: e([]),
        start: function (h) {
            f.$A((h ? [e(h)] : document.byTag("a"))).j14((function (i) {
                if (e(i).j13("tgdd360")) {
                    !d.tools.filter(function (j) {
                        return j.o === i
                    }).length && d.tools.push(new a(i))
                }
            }).j24(this))
        },
        stop: function (k) {
            var i = 0,
                j = null,
                h = null;
            if (k && (h = e(k))) {
                j = d.tools.filter(function (l) {
                    return l.o === h
                });
                j && j.length && (j = d.tools.splice(d.tools.indexOf(j[0]), 1)) && j[0].stop() && (delete j);
                return
            }
            while (i = d.tools.length) {
                j = d.tools.splice(i - 1, 1);
                j[0].stop();
                delete j
            }
        },
        spin: function (j, i) {
            var h = null;
            (h = c(j)) && h.spin(i)
        },
        pause: function (i) {
            var h = null;
            (h = c(i)) && h._A.pause()
        },
        magnifyOn: function (i) {
            var h = null;
            (h = c(i)) && h.magnify(true)
        },
        magnifyOff: function (i) {
            var h = null;
            (h = c(i)) && h.magnify(false)
        },
        fullscreen: function (i) {
            var h = null;
            (h = c(i)) && h.enterFullscreen()
        }
    };

    function c(j) {
        var i = [],
            h = null;
        (j && (h = e(j))) && (i = d.tools.filter(function (k) {
            return k.o === h
        }));
        return i.length ? i[0] : null
    }
    d.options = {};
    d.lang = {};
    e(document).je1("domready", function () {
        d.start()
    });
    return d
})();