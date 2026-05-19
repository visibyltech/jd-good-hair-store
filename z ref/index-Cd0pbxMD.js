var bd = e => {
    throw TypeError(e)
}
    ;
var Xl = (e, t, n) => t.has(e) || bd("Cannot " + n);
var T = (e, t, n) => (Xl(e, t, "read from private field"),
    n ? n.call(e) : t.get(e))
    , Z = (e, t, n) => t.has(e) ? bd("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n)
    , H = (e, t, n, r) => (Xl(e, t, "write to private field"),
        r ? r.call(e, n) : t.set(e, n),
        n)
    , Ae = (e, t, n) => (Xl(e, t, "access private method"),
        n);
var Ws = (e, t, n, r) => ({
    set _(o) {
        H(e, t, o, n)
    },
    get _() {
        return T(e, t, r)
    }
});
function xv(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const o in r)
                if (o !== "default" && !(o in e)) {
                    const s = Object.getOwnPropertyDescriptor(r, o);
                    s && Object.defineProperty(e, o, s.get ? s : {
                        enumerable: !0,
                        get: () => r[o]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
        r(o);
    new MutationObserver(o => {
        for (const s of o)
            if (s.type === "childList")
                for (const i of s.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(o) {
        const s = {};
        return o.integrity && (s.integrity = o.integrity),
            o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
            o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
            s
    }
    function r(o) {
        if (o.ep)
            return;
        o.ep = !0;
        const s = n(o);
        fetch(o.href, s)
    }
}
)();
function qp(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Yp = {
    exports: {}
}
    , dl = {}
    , Gp = {
        exports: {}
    }
    , J = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ns = Symbol.for("react.element")
    , wv = Symbol.for("react.portal")
    , Sv = Symbol.for("react.fragment")
    , Ev = Symbol.for("react.strict_mode")
    , bv = Symbol.for("react.profiler")
    , Cv = Symbol.for("react.provider")
    , kv = Symbol.for("react.context")
    , Pv = Symbol.for("react.forward_ref")
    , Nv = Symbol.for("react.suspense")
    , Tv = Symbol.for("react.memo")
    , Rv = Symbol.for("react.lazy")
    , Cd = Symbol.iterator;
function jv(e) {
    return e === null || typeof e != "object" ? null : (e = Cd && e[Cd] || e["@@iterator"],
        typeof e == "function" ? e : null)
}
var Xp = {
    isMounted: function () {
        return !1
    },
    enqueueForceUpdate: function () { },
    enqueueReplaceState: function () { },
    enqueueSetState: function () { }
}
    , Jp = Object.assign
    , Zp = {};
function So(e, t, n) {
    this.props = e,
        this.context = t,
        this.refs = Zp,
        this.updater = n || Xp
}
So.prototype.isReactComponent = {};
So.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
    ;
So.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
    ;
function eh() { }
eh.prototype = So.prototype;
function Yu(e, t, n) {
    this.props = e,
        this.context = t,
        this.refs = Zp,
        this.updater = n || Xp
}
var Gu = Yu.prototype = new eh;
Gu.constructor = Yu;
Jp(Gu, So.prototype);
Gu.isPureReactComponent = !0;
var kd = Array.isArray
    , th = Object.prototype.hasOwnProperty
    , Xu = {
        current: null
    }
    , nh = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
function rh(e, t, n) {
    var r, o = {}, s = null, i = null;
    if (t != null)
        for (r in t.ref !== void 0 && (i = t.ref),
            t.key !== void 0 && (s = "" + t.key),
            t)
            th.call(t, r) && !nh.hasOwnProperty(r) && (o[r] = t[r]);
    var l = arguments.length - 2;
    if (l === 1)
        o.children = n;
    else if (1 < l) {
        for (var a = Array(l), u = 0; u < l; u++)
            a[u] = arguments[u + 2];
        o.children = a
    }
    if (e && e.defaultProps)
        for (r in l = e.defaultProps,
            l)
            o[r] === void 0 && (o[r] = l[r]);
    return {
        $$typeof: Ns,
        type: e,
        key: s,
        ref: i,
        props: o,
        _owner: Xu.current
    }
}
function Ov(e, t) {
    return {
        $$typeof: Ns,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function Ju(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Ns
}
function Av(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function (n) {
        return t[n]
    })
}
var Pd = /\/+/g;
function Jl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Av("" + e.key) : t.toString(36)
}
function mi(e, t, n, r, o) {
    var s = typeof e;
    (s === "undefined" || s === "boolean") && (e = null);
    var i = !1;
    if (e === null)
        i = !0;
    else
        switch (s) {
            case "string":
            case "number":
                i = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case Ns:
                    case wv:
                        i = !0
                }
        }
    if (i)
        return i = e,
            o = o(i),
            e = r === "" ? "." + Jl(i, 0) : r,
            kd(o) ? (n = "",
                e != null && (n = e.replace(Pd, "$&/") + "/"),
                mi(o, t, n, "", function (u) {
                    return u
                })) : o != null && (Ju(o) && (o = Ov(o, n + (!o.key || i && i.key === o.key ? "" : ("" + o.key).replace(Pd, "$&/") + "/") + e)),
                    t.push(o)),
            1;
    if (i = 0,
        r = r === "" ? "." : r + ":",
        kd(e))
        for (var l = 0; l < e.length; l++) {
            s = e[l];
            var a = r + Jl(s, l);
            i += mi(s, t, n, a, o)
        }
    else if (a = jv(e),
        typeof a == "function")
        for (e = a.call(e),
            l = 0; !(s = e.next()).done;)
            s = s.value,
                a = r + Jl(s, l++),
                i += mi(s, t, n, a, o);
    else if (s === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return i
}
function Qs(e, t, n) {
    if (e == null)
        return e;
    var r = []
        , o = 0;
    return mi(e, r, "", "", function (s) {
        return t.call(n, s, o++)
    }),
        r
}
function _v(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
            t.then(function (n) {
                (e._status === 0 || e._status === -1) && (e._status = 1,
                    e._result = n)
            }, function (n) {
                (e._status === 0 || e._status === -1) && (e._status = 2,
                    e._result = n)
            }),
            e._status === -1 && (e._status = 0,
                e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var Ue = {
    current: null
}
    , gi = {
        transition: null
    }
    , Lv = {
        ReactCurrentDispatcher: Ue,
        ReactCurrentBatchConfig: gi,
        ReactCurrentOwner: Xu
    };
function oh() {
    throw Error("act(...) is not supported in production builds of React.")
}
J.Children = {
    map: Qs,
    forEach: function (e, t, n) {
        Qs(e, function () {
            t.apply(this, arguments)
        }, n)
    },
    count: function (e) {
        var t = 0;
        return Qs(e, function () {
            t++
        }),
            t
    },
    toArray: function (e) {
        return Qs(e, function (t) {
            return t
        }) || []
    },
    only: function (e) {
        if (!Ju(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
J.Component = So;
J.Fragment = Sv;
J.Profiler = bv;
J.PureComponent = Yu;
J.StrictMode = Ev;
J.Suspense = Nv;
J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lv;
J.act = oh;
J.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Jp({}, e.props)
        , o = e.key
        , s = e.ref
        , i = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (s = t.ref,
            i = Xu.current),
            t.key !== void 0 && (o = "" + t.key),
            e.type && e.type.defaultProps)
            var l = e.type.defaultProps;
        for (a in t)
            th.call(t, a) && !nh.hasOwnProperty(a) && (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a])
    }
    var a = arguments.length - 2;
    if (a === 1)
        r.children = n;
    else if (1 < a) {
        l = Array(a);
        for (var u = 0; u < a; u++)
            l[u] = arguments[u + 2];
        r.children = l
    }
    return {
        $$typeof: Ns,
        type: e.type,
        key: o,
        ref: s,
        props: r,
        _owner: i
    }
}
    ;
J.createContext = function (e) {
    return e = {
        $$typeof: kv,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
        e.Provider = {
            $$typeof: Cv,
            _context: e
        },
        e.Consumer = e
}
    ;
J.createElement = rh;
J.createFactory = function (e) {
    var t = rh.bind(null, e);
    return t.type = e,
        t
}
    ;
J.createRef = function () {
    return {
        current: null
    }
}
    ;
J.forwardRef = function (e) {
    return {
        $$typeof: Pv,
        render: e
    }
}
    ;
J.isValidElement = Ju;
J.lazy = function (e) {
    return {
        $$typeof: Rv,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: _v
    }
}
    ;
J.memo = function (e, t) {
    return {
        $$typeof: Tv,
        type: e,
        compare: t === void 0 ? null : t
    }
}
    ;
J.startTransition = function (e) {
    var t = gi.transition;
    gi.transition = {};
    try {
        e()
    } finally {
        gi.transition = t
    }
}
    ;
J.unstable_act = oh;
J.useCallback = function (e, t) {
    return Ue.current.useCallback(e, t)
}
    ;
J.useContext = function (e) {
    return Ue.current.useContext(e)
}
    ;
J.useDebugValue = function () { }
    ;
J.useDeferredValue = function (e) {
    return Ue.current.useDeferredValue(e)
}
    ;
J.useEffect = function (e, t) {
    return Ue.current.useEffect(e, t)
}
    ;
J.useId = function () {
    return Ue.current.useId()
}
    ;
J.useImperativeHandle = function (e, t, n) {
    return Ue.current.useImperativeHandle(e, t, n)
}
    ;
J.useInsertionEffect = function (e, t) {
    return Ue.current.useInsertionEffect(e, t)
}
    ;
J.useLayoutEffect = function (e, t) {
    return Ue.current.useLayoutEffect(e, t)
}
    ;
J.useMemo = function (e, t) {
    return Ue.current.useMemo(e, t)
}
    ;
J.useReducer = function (e, t, n) {
    return Ue.current.useReducer(e, t, n)
}
    ;
J.useRef = function (e) {
    return Ue.current.useRef(e)
}
    ;
J.useState = function (e) {
    return Ue.current.useState(e)
}
    ;
J.useSyncExternalStore = function (e, t, n) {
    return Ue.current.useSyncExternalStore(e, t, n)
}
    ;
J.useTransition = function () {
    return Ue.current.useTransition()
}
    ;
J.version = "18.3.1";
Gp.exports = J;
var S = Gp.exports;
const A = qp(S)
    , Zu = xv({
        __proto__: null,
        default: A
    }, [S]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dv = S
    , Iv = Symbol.for("react.element")
    , Mv = Symbol.for("react.fragment")
    , Fv = Object.prototype.hasOwnProperty
    , zv = Dv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
    , $v = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
function sh(e, t, n) {
    var r, o = {}, s = null, i = null;
    n !== void 0 && (s = "" + n),
        t.key !== void 0 && (s = "" + t.key),
        t.ref !== void 0 && (i = t.ref);
    for (r in t)
        Fv.call(t, r) && !$v.hasOwnProperty(r) && (o[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
            t)
            o[r] === void 0 && (o[r] = t[r]);
    return {
        $$typeof: Iv,
        type: e,
        key: s,
        ref: i,
        props: o,
        _owner: zv.current
    }
}
dl.Fragment = Mv;
dl.jsx = sh;
dl.jsxs = sh;
Yp.exports = dl;
var f = Yp.exports
    , ih = {
        exports: {}
    }
    , st = {}
    , lh = {
        exports: {}
    }
    , ah = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function (e) {
    function t(N, j) {
        var I = N.length;
        N.push(j);
        e: for (; 0 < I;) {
            var B = I - 1 >>> 1
                , $ = N[B];
            if (0 < o($, j))
                N[B] = j,
                    N[I] = $,
                    I = B;
            else
                break e
        }
    }
    function n(N) {
        return N.length === 0 ? null : N[0]
    }
    function r(N) {
        if (N.length === 0)
            return null;
        var j = N[0]
            , I = N.pop();
        if (I !== j) {
            N[0] = I;
            e: for (var B = 0, $ = N.length, q = $ >>> 1; B < q;) {
                var Y = 2 * (B + 1) - 1
                    , pe = N[Y]
                    , Oe = Y + 1
                    , re = N[Oe];
                if (0 > o(pe, I))
                    Oe < $ && 0 > o(re, pe) ? (N[B] = re,
                        N[Oe] = I,
                        B = Oe) : (N[B] = pe,
                            N[Y] = I,
                            B = Y);
                else if (Oe < $ && 0 > o(re, I))
                    N[B] = re,
                        N[Oe] = I,
                        B = Oe;
                else
                    break e
            }
        }
        return j
    }
    function o(N, j) {
        var I = N.sortIndex - j.sortIndex;
        return I !== 0 ? I : N.id - j.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var s = performance;
        e.unstable_now = function () {
            return s.now()
        }
    } else {
        var i = Date
            , l = i.now();
        e.unstable_now = function () {
            return i.now() - l
        }
    }
    var a = []
        , u = []
        , c = 1
        , d = null
        , h = 3
        , p = !1
        , m = !1
        , g = !1
        , w = typeof setTimeout == "function" ? setTimeout : null
        , v = typeof clearTimeout == "function" ? clearTimeout : null
        , y = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function x(N) {
        for (var j = n(u); j !== null;) {
            if (j.callback === null)
                r(u);
            else if (j.startTime <= N)
                r(u),
                    j.sortIndex = j.expirationTime,
                    t(a, j);
            else
                break;
            j = n(u)
        }
    }
    function E(N) {
        if (g = !1,
            x(N),
            !m)
            if (n(a) !== null)
                m = !0,
                    z(b);
            else {
                var j = n(u);
                j !== null && W(E, j.startTime - N)
            }
    }
    function b(N, j) {
        m = !1,
            g && (g = !1,
                v(R),
                R = -1),
            p = !0;
        var I = h;
        try {
            for (x(j),
                d = n(a); d !== null && (!(d.expirationTime > j) || N && !U());) {
                var B = d.callback;
                if (typeof B == "function") {
                    d.callback = null,
                        h = d.priorityLevel;
                    var $ = B(d.expirationTime <= j);
                    j = e.unstable_now(),
                        typeof $ == "function" ? d.callback = $ : d === n(a) && r(a),
                        x(j)
                } else
                    r(a);
                d = n(a)
            }
            if (d !== null)
                var q = !0;
            else {
                var Y = n(u);
                Y !== null && W(E, Y.startTime - j),
                    q = !1
            }
            return q
        } finally {
            d = null,
                h = I,
                p = !1
        }
    }
    var C = !1
        , k = null
        , R = -1
        , L = 5
        , D = -1;
    function U() {
        return !(e.unstable_now() - D < L)
    }
    function M() {
        if (k !== null) {
            var N = e.unstable_now();
            D = N;
            var j = !0;
            try {
                j = k(!0, N)
            } finally {
                j ? Q() : (C = !1,
                    k = null)
            }
        } else
            C = !1
    }
    var Q;
    if (typeof y == "function")
        Q = function () {
            y(M)
        }
            ;
    else if (typeof MessageChannel < "u") {
        var _ = new MessageChannel
            , X = _.port2;
        _.port1.onmessage = M,
            Q = function () {
                X.postMessage(null)
            }
    } else
        Q = function () {
            w(M, 0)
        }
            ;
    function z(N) {
        k = N,
            C || (C = !0,
                Q())
    }
    function W(N, j) {
        R = w(function () {
            N(e.unstable_now())
        }, j)
    }
    e.unstable_IdlePriority = 5,
        e.unstable_ImmediatePriority = 1,
        e.unstable_LowPriority = 4,
        e.unstable_NormalPriority = 3,
        e.unstable_Profiling = null,
        e.unstable_UserBlockingPriority = 2,
        e.unstable_cancelCallback = function (N) {
            N.callback = null
        }
        ,
        e.unstable_continueExecution = function () {
            m || p || (m = !0,
                z(b))
        }
        ,
        e.unstable_forceFrameRate = function (N) {
            0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < N ? Math.floor(1e3 / N) : 5
        }
        ,
        e.unstable_getCurrentPriorityLevel = function () {
            return h
        }
        ,
        e.unstable_getFirstCallbackNode = function () {
            return n(a)
        }
        ,
        e.unstable_next = function (N) {
            switch (h) {
                case 1:
                case 2:
                case 3:
                    var j = 3;
                    break;
                default:
                    j = h
            }
            var I = h;
            h = j;
            try {
                return N()
            } finally {
                h = I
            }
        }
        ,
        e.unstable_pauseExecution = function () { }
        ,
        e.unstable_requestPaint = function () { }
        ,
        e.unstable_runWithPriority = function (N, j) {
            switch (N) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    N = 3
            }
            var I = h;
            h = N;
            try {
                return j()
            } finally {
                h = I
            }
        }
        ,
        e.unstable_scheduleCallback = function (N, j, I) {
            var B = e.unstable_now();
            switch (typeof I == "object" && I !== null ? (I = I.delay,
                I = typeof I == "number" && 0 < I ? B + I : B) : I = B,
            N) {
                case 1:
                    var $ = -1;
                    break;
                case 2:
                    $ = 250;
                    break;
                case 5:
                    $ = 1073741823;
                    break;
                case 4:
                    $ = 1e4;
                    break;
                default:
                    $ = 5e3
            }
            return $ = I + $,
                N = {
                    id: c++,
                    callback: j,
                    priorityLevel: N,
                    startTime: I,
                    expirationTime: $,
                    sortIndex: -1
                },
                I > B ? (N.sortIndex = I,
                    t(u, N),
                    n(a) === null && N === n(u) && (g ? (v(R),
                        R = -1) : g = !0,
                        W(E, I - B))) : (N.sortIndex = $,
                            t(a, N),
                            m || p || (m = !0,
                                z(b))),
                N
        }
        ,
        e.unstable_shouldYield = U,
        e.unstable_wrapCallback = function (N) {
            var j = h;
            return function () {
                var I = h;
                h = j;
                try {
                    return N.apply(this, arguments)
                } finally {
                    h = I
                }
            }
        }
}
)(ah);
lh.exports = ah;
var Bv = lh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uv = S
    , ot = Bv;
function O(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var uh = new Set
    , ns = {};
function kr(e, t) {
    co(e, t),
        co(e + "Capture", t)
}
function co(e, t) {
    for (ns[e] = t,
        e = 0; e < t.length; e++)
        uh.add(t[e])
}
var en = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
    , La = Object.prototype.hasOwnProperty
    , Vv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
    , Nd = {}
    , Td = {};
function Hv(e) {
    return La.call(Td, e) ? !0 : La.call(Nd, e) ? !1 : Vv.test(e) ? Td[e] = !0 : (Nd[e] = !0,
        !1)
}
function Wv(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
                e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}
function Qv(e, t, n, r) {
    if (t === null || typeof t > "u" || Wv(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t
        }
    return !1
}
function Ve(e, t, n, r, o, s, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
        this.attributeName = r,
        this.attributeNamespace = o,
        this.mustUseProperty = n,
        this.propertyName = e,
        this.type = t,
        this.sanitizeURL = s,
        this.removeEmptyString = i
}
var je = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
    je[e] = new Ve(e, 0, !1, e, null, !1, !1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (e) {
    var t = e[0];
    je[t] = new Ve(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    je[e] = new Ve(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
    je[e] = new Ve(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (e) {
    je[e] = new Ve(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    je[e] = new Ve(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function (e) {
    je[e] = new Ve(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function (e) {
    je[e] = new Ve(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function (e) {
    je[e] = new Ve(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var ec = /[\-:]([a-z])/g;
function tc(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (e) {
    var t = e.replace(ec, tc);
    je[t] = new Ve(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
    var t = e.replace(ec, tc);
    je[t] = new Ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(ec, tc);
    je[t] = new Ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    je[e] = new Ve(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
je.xlinkHref = new Ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
    je[e] = new Ve(e, 1, !1, e.toLowerCase(), null, !0, !0)
});
function nc(e, t, n, r) {
    var o = je.hasOwnProperty(t) ? je[t] : null;
    (o !== null ? o.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Qv(t, n, o, r) && (n = null),
        r || o === null ? Hv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName,
            r = o.attributeNamespace,
            n === null ? e.removeAttribute(t) : (o = o.type,
                n = o === 3 || o === 4 && n === !0 ? "" : "" + n,
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var ln = Uv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    , Ks = Symbol.for("react.element")
    , Ir = Symbol.for("react.portal")
    , Mr = Symbol.for("react.fragment")
    , rc = Symbol.for("react.strict_mode")
    , Da = Symbol.for("react.profiler")
    , ch = Symbol.for("react.provider")
    , dh = Symbol.for("react.context")
    , oc = Symbol.for("react.forward_ref")
    , Ia = Symbol.for("react.suspense")
    , Ma = Symbol.for("react.suspense_list")
    , sc = Symbol.for("react.memo")
    , wn = Symbol.for("react.lazy")
    , fh = Symbol.for("react.offscreen")
    , Rd = Symbol.iterator;
function Oo(e) {
    return e === null || typeof e != "object" ? null : (e = Rd && e[Rd] || e["@@iterator"],
        typeof e == "function" ? e : null)
}
var ge = Object.assign, Zl;
function Uo(e) {
    if (Zl === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Zl = t && t[1] || ""
        }
    return `
` + Zl + e
}
var ea = !1;
function ta(e, t) {
    if (!e || ea)
        return "";
    ea = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function () {
                throw Error()
            }
                ,
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error()
                    }
                }),
                typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (u) {
                    var r = u
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (u) {
                    r = u
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (u) {
                r = u
            }
            e()
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (var o = u.stack.split(`
`), s = r.stack.split(`
`), i = o.length - 1, l = s.length - 1; 1 <= i && 0 <= l && o[i] !== s[l];)
                l--;
            for (; 1 <= i && 0 <= l; i--,
                l--)
                if (o[i] !== s[l]) {
                    if (i !== 1 || l !== 1)
                        do
                            if (i--,
                                l--,
                                0 > l || o[i] !== s[l]) {
                                var a = `
` + o[i].replace(" at new ", " at ");
                                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)),
                                    a
                            }
                        while (1 <= i && 0 <= l);
                    break
                }
        }
    } finally {
        ea = !1,
            Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Uo(e) : ""
}
function Kv(e) {
    switch (e.tag) {
        case 5:
            return Uo(e.type);
        case 16:
            return Uo("Lazy");
        case 13:
            return Uo("Suspense");
        case 19:
            return Uo("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = ta(e.type, !1),
                e;
        case 11:
            return e = ta(e.type.render, !1),
                e;
        case 1:
            return e = ta(e.type, !0),
                e;
        default:
            return ""
    }
}
function Fa(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
        case Mr:
            return "Fragment";
        case Ir:
            return "Portal";
        case Da:
            return "Profiler";
        case rc:
            return "StrictMode";
        case Ia:
            return "Suspense";
        case Ma:
            return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case dh:
                return (e.displayName || "Context") + ".Consumer";
            case ch:
                return (e._context.displayName || "Context") + ".Provider";
            case oc:
                var t = e.render;
                return e = e.displayName,
                    e || (e = t.displayName || t.name || "",
                        e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                    e;
            case sc:
                return t = e.displayName || null,
                    t !== null ? t : Fa(e.type) || "Memo";
            case wn:
                t = e._payload,
                    e = e._init;
                try {
                    return Fa(e(t))
                } catch { }
        }
    return null
}
function qv(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render,
                e = e.displayName || e.name || "",
                t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Fa(t);
        case 8:
            return t === rc ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function")
                return t.displayName || t.name || null;
            if (typeof t == "string")
                return t
    }
    return null
}
function Un(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}
function ph(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function Yv(e) {
    var t = ph(e) ? "checked" : "value"
        , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
        , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var o = n.get
            , s = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
                return o.call(this)
            },
            set: function (i) {
                r = "" + i,
                    s.call(this, i)
            }
        }),
            Object.defineProperty(e, t, {
                enumerable: n.enumerable
            }),
        {
            getValue: function () {
                return r
            },
            setValue: function (i) {
                r = "" + i
            },
            stopTracking: function () {
                e._valueTracker = null,
                    delete e[t]
            }
        }
    }
}
function qs(e) {
    e._valueTracker || (e._valueTracker = Yv(e))
}
function hh(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
        , r = "";
    return e && (r = ph(e) ? e.checked ? "true" : "false" : e.value),
        e = r,
        e !== n ? (t.setValue(e),
            !0) : !1
}
function _i(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function za(e, t) {
    var n = t.checked;
    return ge({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function jd(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
        , r = t.checked != null ? t.checked : t.defaultChecked;
    n = Un(t.value != null ? t.value : n),
        e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
        }
}
function mh(e, t) {
    t = t.checked,
        t != null && nc(e, "checked", t, !1)
}
function $a(e, t) {
    mh(e, t);
    var n = Un(t.value)
        , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Ba(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ba(e, t.type, Un(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function Od(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
            n || t === e.value || (e.value = t),
            e.defaultValue = t
    }
    n = e.name,
        n !== "" && (e.name = ""),
        e.defaultChecked = !!e._wrapperState.initialChecked,
        n !== "" && (e.name = n)
}
function Ba(e, t, n) {
    (t !== "number" || _i(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Vo = Array.isArray;
function qr(e, t, n, r) {
    if (e = e.options,
        t) {
        t = {};
        for (var o = 0; o < n.length; o++)
            t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++)
            o = t.hasOwnProperty("$" + e[n].value),
                e[n].selected !== o && (e[n].selected = o),
                o && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + Un(n),
            t = null,
            o = 0; o < e.length; o++) {
            if (e[o].value === n) {
                e[o].selected = !0,
                    r && (e[o].defaultSelected = !0);
                return
            }
            t !== null || e[o].disabled || (t = e[o])
        }
        t !== null && (t.selected = !0)
    }
}
function Ua(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(O(91));
    return ge({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function Ad(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
            t = t.defaultValue,
            n != null) {
            if (t != null)
                throw Error(O(92));
            if (Vo(n)) {
                if (1 < n.length)
                    throw Error(O(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
            n = t
    }
    e._wrapperState = {
        initialValue: Un(n)
    }
}
function gh(e, t) {
    var n = Un(t.value)
        , r = Un(t.defaultValue);
    n != null && (n = "" + n,
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r)
}
function _d(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function yh(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}
function Va(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? yh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var Ys, vh = function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function (t, n, r, o) {
        MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o)
        })
    }
        : e
}(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
    else {
        for (Ys = Ys || document.createElement("div"),
            Ys.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Ys.firstChild; e.firstChild;)
            e.removeChild(e.firstChild);
        for (; t.firstChild;)
            e.appendChild(t.firstChild)
    }
});
function rs(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Qo = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
    , Gv = ["Webkit", "ms", "Moz", "O"];
Object.keys(Qo).forEach(function (e) {
    Gv.forEach(function (t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
            Qo[t] = Qo[e]
    })
});
function xh(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Qo.hasOwnProperty(e) && Qo[e] ? ("" + t).trim() : t + "px"
}
function wh(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
                , o = xh(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, o) : e[n] = o
        }
}
var Xv = ge({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function Ha(e, t) {
    if (t) {
        if (Xv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(O(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(O(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
                throw Error(O(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(O(62))
    }
}
function Wa(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var Qa = null;
function ic(e) {
    return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
}
var Ka = null
    , Yr = null
    , Gr = null;
function Ld(e) {
    if (e = js(e)) {
        if (typeof Ka != "function")
            throw Error(O(280));
        var t = e.stateNode;
        t && (t = gl(t),
            Ka(e.stateNode, e.type, t))
    }
}
function Sh(e) {
    Yr ? Gr ? Gr.push(e) : Gr = [e] : Yr = e
}
function Eh() {
    if (Yr) {
        var e = Yr
            , t = Gr;
        if (Gr = Yr = null,
            Ld(e),
            t)
            for (e = 0; e < t.length; e++)
                Ld(t[e])
    }
}
function bh(e, t) {
    return e(t)
}
function Ch() { }
var na = !1;
function kh(e, t, n) {
    if (na)
        return e(t, n);
    na = !0;
    try {
        return bh(e, t, n)
    } finally {
        na = !1,
            (Yr !== null || Gr !== null) && (Ch(),
                Eh())
    }
}
function os(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = gl(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type,
                r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
                e = !r;
            break e;
        default:
            e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(O(231, t, typeof n));
    return n
}
var qa = !1;
if (en)
    try {
        var Ao = {};
        Object.defineProperty(Ao, "passive", {
            get: function () {
                qa = !0
            }
        }),
            window.addEventListener("test", Ao, Ao),
            window.removeEventListener("test", Ao, Ao)
    } catch {
        qa = !1
    }
function Jv(e, t, n, r, o, s, i, l, a) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u)
    } catch (c) {
        this.onError(c)
    }
}
var Ko = !1
    , Li = null
    , Di = !1
    , Ya = null
    , Zv = {
        onError: function (e) {
            Ko = !0,
                Li = e
        }
    };
function e0(e, t, n, r, o, s, i, l, a) {
    Ko = !1,
        Li = null,
        Jv.apply(Zv, arguments)
}
function t0(e, t, n, r, o, s, i, l, a) {
    if (e0.apply(this, arguments),
        Ko) {
        if (Ko) {
            var u = Li;
            Ko = !1,
                Li = null
        } else
            throw Error(O(198));
        Di || (Di = !0,
            Ya = u)
    }
}
function Pr(e) {
    var t = e
        , n = e;
    if (e.alternate)
        for (; t.return;)
            t = t.return;
    else {
        e = t;
        do
            t = e,
                t.flags & 4098 && (n = t.return),
                e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function Ph(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
            return t.dehydrated
    }
    return null
}
function Dd(e) {
    if (Pr(e) !== e)
        throw Error(O(188))
}
function n0(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Pr(e),
            t === null)
            throw Error(O(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ;) {
        var o = n.return;
        if (o === null)
            break;
        var s = o.alternate;
        if (s === null) {
            if (r = o.return,
                r !== null) {
                n = r;
                continue
            }
            break
        }
        if (o.child === s.child) {
            for (s = o.child; s;) {
                if (s === n)
                    return Dd(o),
                        e;
                if (s === r)
                    return Dd(o),
                        t;
                s = s.sibling
            }
            throw Error(O(188))
        }
        if (n.return !== r.return)
            n = o,
                r = s;
        else {
            for (var i = !1, l = o.child; l;) {
                if (l === n) {
                    i = !0,
                        n = o,
                        r = s;
                    break
                }
                if (l === r) {
                    i = !0,
                        r = o,
                        n = s;
                    break
                }
                l = l.sibling
            }
            if (!i) {
                for (l = s.child; l;) {
                    if (l === n) {
                        i = !0,
                            n = s,
                            r = o;
                        break
                    }
                    if (l === r) {
                        i = !0,
                            r = s,
                            n = o;
                        break
                    }
                    l = l.sibling
                }
                if (!i)
                    throw Error(O(189))
            }
        }
        if (n.alternate !== r)
            throw Error(O(190))
    }
    if (n.tag !== 3)
        throw Error(O(188));
    return n.stateNode.current === n ? e : t
}
function Nh(e) {
    return e = n0(e),
        e !== null ? Th(e) : null
}
function Th(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null;) {
        var t = Th(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var Rh = ot.unstable_scheduleCallback
    , Id = ot.unstable_cancelCallback
    , r0 = ot.unstable_shouldYield
    , o0 = ot.unstable_requestPaint
    , xe = ot.unstable_now
    , s0 = ot.unstable_getCurrentPriorityLevel
    , lc = ot.unstable_ImmediatePriority
    , jh = ot.unstable_UserBlockingPriority
    , Ii = ot.unstable_NormalPriority
    , i0 = ot.unstable_LowPriority
    , Oh = ot.unstable_IdlePriority
    , fl = null
    , Bt = null;
function l0(e) {
    if (Bt && typeof Bt.onCommitFiberRoot == "function")
        try {
            Bt.onCommitFiberRoot(fl, e, void 0, (e.current.flags & 128) === 128)
        } catch { }
}
var Nt = Math.clz32 ? Math.clz32 : c0
    , a0 = Math.log
    , u0 = Math.LN2;
function c0(e) {
    return e >>>= 0,
        e === 0 ? 32 : 31 - (a0(e) / u0 | 0) | 0
}
var Gs = 64
    , Xs = 4194304;
function Ho(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}
function Mi(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
        , o = e.suspendedLanes
        , s = e.pingedLanes
        , i = n & 268435455;
    if (i !== 0) {
        var l = i & ~o;
        l !== 0 ? r = Ho(l) : (s &= i,
            s !== 0 && (r = Ho(s)))
    } else
        i = n & ~o,
            i !== 0 ? r = Ho(i) : s !== 0 && (r = Ho(s));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & o) && (o = r & -r,
        s = t & -t,
        o >= s || o === 16 && (s & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
        t = e.entangledLanes,
        t !== 0)
        for (e = e.entanglements,
            t &= r; 0 < t;)
            n = 31 - Nt(t),
                o = 1 << n,
                r |= e[n],
                t &= ~o;
    return r
}
function d0(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}
function f0(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, s = e.pendingLanes; 0 < s;) {
        var i = 31 - Nt(s)
            , l = 1 << i
            , a = o[i];
        a === -1 ? (!(l & n) || l & r) && (o[i] = d0(l, t)) : a <= t && (e.expiredLanes |= l),
            s &= ~l
    }
}
function Ga(e) {
    return e = e.pendingLanes & -1073741825,
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function Ah() {
    var e = Gs;
    return Gs <<= 1,
        !(Gs & 4194240) && (Gs = 64),
        e
}
function ra(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function Ts(e, t, n) {
    e.pendingLanes |= t,
        t !== 536870912 && (e.suspendedLanes = 0,
            e.pingedLanes = 0),
        e = e.eventTimes,
        t = 31 - Nt(t),
        e[t] = n
}
function p0(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.expiredLanes &= t,
        e.mutableReadLanes &= t,
        e.entangledLanes &= t,
        t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var o = 31 - Nt(n)
            , s = 1 << o;
        t[o] = 0,
            r[o] = -1,
            e[o] = -1,
            n &= ~s
    }
}
function ac(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - Nt(n)
            , o = 1 << r;
        o & t | e[r] & t && (e[r] |= t),
            n &= ~o
    }
}
var oe = 0;
function _h(e) {
    return e &= -e,
        1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Lh, uc, Dh, Ih, Mh, Xa = !1, Js = [], _n = null, Ln = null, Dn = null, ss = new Map, is = new Map, En = [], h0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Md(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            _n = null;
            break;
        case "dragenter":
        case "dragleave":
            Ln = null;
            break;
        case "mouseover":
        case "mouseout":
            Dn = null;
            break;
        case "pointerover":
        case "pointerout":
            ss.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            is.delete(t.pointerId)
    }
}
function _o(e, t, n, r, o, s) {
    return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [o]
    },
        t !== null && (t = js(t),
            t !== null && uc(t)),
        e) : (e.eventSystemFlags |= r,
            t = e.targetContainers,
            o !== null && t.indexOf(o) === -1 && t.push(o),
            e)
}
function m0(e, t, n, r, o) {
    switch (t) {
        case "focusin":
            return _n = _o(_n, e, t, n, r, o),
                !0;
        case "dragenter":
            return Ln = _o(Ln, e, t, n, r, o),
                !0;
        case "mouseover":
            return Dn = _o(Dn, e, t, n, r, o),
                !0;
        case "pointerover":
            var s = o.pointerId;
            return ss.set(s, _o(ss.get(s) || null, e, t, n, r, o)),
                !0;
        case "gotpointercapture":
            return s = o.pointerId,
                is.set(s, _o(is.get(s) || null, e, t, n, r, o)),
                !0
    }
    return !1
}
function Fh(e) {
    var t = sr(e.target);
    if (t !== null) {
        var n = Pr(t);
        if (n !== null) {
            if (t = n.tag,
                t === 13) {
                if (t = Ph(n),
                    t !== null) {
                    e.blockedOn = t,
                        Mh(e.priority, function () {
                            Dh(n)
                        });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function yi(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = Ja(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            Qa = r,
                n.target.dispatchEvent(r),
                Qa = null
        } else
            return t = js(n),
                t !== null && uc(t),
                e.blockedOn = n,
                !1;
        t.shift()
    }
    return !0
}
function Fd(e, t, n) {
    yi(e) && n.delete(t)
}
function g0() {
    Xa = !1,
        _n !== null && yi(_n) && (_n = null),
        Ln !== null && yi(Ln) && (Ln = null),
        Dn !== null && yi(Dn) && (Dn = null),
        ss.forEach(Fd),
        is.forEach(Fd)
}
function Lo(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
        Xa || (Xa = !0,
            ot.unstable_scheduleCallback(ot.unstable_NormalPriority, g0)))
}
function ls(e) {
    function t(o) {
        return Lo(o, e)
    }
    if (0 < Js.length) {
        Lo(Js[0], e);
        for (var n = 1; n < Js.length; n++) {
            var r = Js[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (_n !== null && Lo(_n, e),
        Ln !== null && Lo(Ln, e),
        Dn !== null && Lo(Dn, e),
        ss.forEach(t),
        is.forEach(t),
        n = 0; n < En.length; n++)
        r = En[n],
            r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < En.length && (n = En[0],
        n.blockedOn === null);)
        Fh(n),
            n.blockedOn === null && En.shift()
}
var Xr = ln.ReactCurrentBatchConfig
    , Fi = !0;
function y0(e, t, n, r) {
    var o = oe
        , s = Xr.transition;
    Xr.transition = null;
    try {
        oe = 1,
            cc(e, t, n, r)
    } finally {
        oe = o,
            Xr.transition = s
    }
}
function v0(e, t, n, r) {
    var o = oe
        , s = Xr.transition;
    Xr.transition = null;
    try {
        oe = 4,
            cc(e, t, n, r)
    } finally {
        oe = o,
            Xr.transition = s
    }
}
function cc(e, t, n, r) {
    if (Fi) {
        var o = Ja(e, t, n, r);
        if (o === null)
            pa(e, t, r, zi, n),
                Md(e, r);
        else if (m0(o, e, t, n, r))
            r.stopPropagation();
        else if (Md(e, r),
            t & 4 && -1 < h0.indexOf(e)) {
            for (; o !== null;) {
                var s = js(o);
                if (s !== null && Lh(s),
                    s = Ja(e, t, n, r),
                    s === null && pa(e, t, r, zi, n),
                    s === o)
                    break;
                o = s
            }
            o !== null && r.stopPropagation()
        } else
            pa(e, t, r, null, n)
    }
}
var zi = null;
function Ja(e, t, n, r) {
    if (zi = null,
        e = ic(r),
        e = sr(e),
        e !== null)
        if (t = Pr(e),
            t === null)
            e = null;
        else if (n = t.tag,
            n === 13) {
            if (e = Ph(t),
                e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return zi = e,
        null
}
function zh(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (s0()) {
                case lc:
                    return 1;
                case jh:
                    return 4;
                case Ii:
                case i0:
                    return 16;
                case Oh:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var jn = null
    , dc = null
    , vi = null;
function $h() {
    if (vi)
        return vi;
    var e, t = dc, n = t.length, r, o = "value" in jn ? jn.value : jn.textContent, s = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++)
        ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === o[s - r]; r++)
        ;
    return vi = o.slice(e, 1 < r ? 1 - r : void 0)
}
function xi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
}
function Zs() {
    return !0
}
function zd() {
    return !1
}
function it(e) {
    function t(n, r, o, s, i) {
        this._reactName = n,
            this._targetInst = o,
            this.type = r,
            this.nativeEvent = s,
            this.target = i,
            this.currentTarget = null;
        for (var l in e)
            e.hasOwnProperty(l) && (n = e[l],
                this[l] = n ? n(s) : s[l]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Zs : zd,
            this.isPropagationStopped = zd,
            this
    }
    return ge(t.prototype, {
        preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                this.isDefaultPrevented = Zs)
        },
        stopPropagation: function () {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
                this.isPropagationStopped = Zs)
        },
        persist: function () { },
        isPersistent: Zs
    }),
        t
}
var Eo = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, fc = it(Eo), Rs = ge({}, Eo, {
    view: 0,
    detail: 0
}), x0 = it(Rs), oa, sa, Do, pl = ge({}, Rs, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: pc,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function (e) {
        return "movementX" in e ? e.movementX : (e !== Do && (Do && e.type === "mousemove" ? (oa = e.screenX - Do.screenX,
            sa = e.screenY - Do.screenY) : sa = oa = 0,
            Do = e),
            oa)
    },
    movementY: function (e) {
        return "movementY" in e ? e.movementY : sa
    }
}), $d = it(pl), w0 = ge({}, pl, {
    dataTransfer: 0
}), S0 = it(w0), E0 = ge({}, Rs, {
    relatedTarget: 0
}), ia = it(E0), b0 = ge({}, Eo, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), C0 = it(b0), k0 = ge({}, Eo, {
    clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData
    }
}), P0 = it(k0), N0 = ge({}, Eo, {
    data: 0
}), Bd = it(N0), T0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, R0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, j0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function O0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = j0[e]) ? !!t[e] : !1
}
function pc() {
    return O0
}
var A0 = ge({}, Rs, {
    key: function (e) {
        if (e.key) {
            var t = T0[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = xi(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? R0[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: pc,
    charCode: function (e) {
        return e.type === "keypress" ? xi(e) : 0
    },
    keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function (e) {
        return e.type === "keypress" ? xi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
    , _0 = it(A0)
    , L0 = ge({}, pl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
    , Ud = it(L0)
    , D0 = ge({}, Rs, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: pc
    })
    , I0 = it(D0)
    , M0 = ge({}, Eo, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
    , F0 = it(M0)
    , z0 = ge({}, pl, {
        deltaX: function (e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function (e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
    , $0 = it(z0)
    , B0 = [9, 13, 27, 32]
    , hc = en && "CompositionEvent" in window
    , qo = null;
en && "documentMode" in document && (qo = document.documentMode);
var U0 = en && "TextEvent" in window && !qo
    , Bh = en && (!hc || qo && 8 < qo && 11 >= qo)
    , Vd = " "
    , Hd = !1;
function Uh(e, t) {
    switch (e) {
        case "keyup":
            return B0.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}
function Vh(e) {
    return e = e.detail,
        typeof e == "object" && "data" in e ? e.data : null
}
var Fr = !1;
function V0(e, t) {
    switch (e) {
        case "compositionend":
            return Vh(t);
        case "keypress":
            return t.which !== 32 ? null : (Hd = !0,
                Vd);
        case "textInput":
            return e = t.data,
                e === Vd && Hd ? null : e;
        default:
            return null
    }
}
function H0(e, t) {
    if (Fr)
        return e === "compositionend" || !hc && Uh(e, t) ? (e = $h(),
            vi = dc = jn = null,
            Fr = !1,
            e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Bh && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var W0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function Wd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!W0[e.type] : t === "textarea"
}
function Hh(e, t, n, r) {
    Sh(r),
        t = $i(t, "onChange"),
        0 < t.length && (n = new fc("onChange", "change", null, n, r),
            e.push({
                event: n,
                listeners: t
            }))
}
var Yo = null
    , as = null;
function Q0(e) {
    tm(e, 0)
}
function hl(e) {
    var t = Br(e);
    if (hh(t))
        return e
}
function K0(e, t) {
    if (e === "change")
        return t
}
var Wh = !1;
if (en) {
    var la;
    if (en) {
        var aa = "oninput" in document;
        if (!aa) {
            var Qd = document.createElement("div");
            Qd.setAttribute("oninput", "return;"),
                aa = typeof Qd.oninput == "function"
        }
        la = aa
    } else
        la = !1;
    Wh = la && (!document.documentMode || 9 < document.documentMode)
}
function Kd() {
    Yo && (Yo.detachEvent("onpropertychange", Qh),
        as = Yo = null)
}
function Qh(e) {
    if (e.propertyName === "value" && hl(as)) {
        var t = [];
        Hh(t, as, e, ic(e)),
            kh(Q0, t)
    }
}
function q0(e, t, n) {
    e === "focusin" ? (Kd(),
        Yo = t,
        as = n,
        Yo.attachEvent("onpropertychange", Qh)) : e === "focusout" && Kd()
}
function Y0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return hl(as)
}
function G0(e, t) {
    if (e === "click")
        return hl(t)
}
function X0(e, t) {
    if (e === "input" || e === "change")
        return hl(t)
}
function J0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Rt = typeof Object.is == "function" ? Object.is : J0;
function us(e, t) {
    if (Rt(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
        , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var o = n[r];
        if (!La.call(t, o) || !Rt(e[o], t[o]))
            return !1
    }
    return !0
}
function qd(e) {
    for (; e && e.firstChild;)
        e = e.firstChild;
    return e
}
function Yd(e, t) {
    var n = qd(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
                e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = qd(n)
    }
}
function Kh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Kh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function qh() {
    for (var e = window, t = _i(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = _i(e.document)
    }
    return t
}
function mc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Z0(e) {
    var t = qh()
        , n = e.focusedElem
        , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Kh(n.ownerDocument.documentElement, n)) {
        if (r !== null && mc(n)) {
            if (t = r.start,
                e = r.end,
                e === void 0 && (e = t),
                "selectionStart" in n)
                n.selectionStart = t,
                    n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
                e.getSelection) {
                e = e.getSelection();
                var o = n.textContent.length
                    , s = Math.min(r.start, o);
                r = r.end === void 0 ? s : Math.min(r.end, o),
                    !e.extend && s > r && (o = r,
                        r = s,
                        s = o),
                    o = Yd(n, s);
                var i = Yd(n, r);
                o && i && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(),
                    t.setStart(o.node, o.offset),
                    e.removeAllRanges(),
                    s > r ? (e.addRange(t),
                        e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset),
                            e.addRange(t)))
            }
        }
        for (t = [],
            e = n; e = e.parentNode;)
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
            n = 0; n < t.length; n++)
            e = t[n],
                e.element.scrollLeft = e.left,
                e.element.scrollTop = e.top
    }
}
var ex = en && "documentMode" in document && 11 >= document.documentMode
    , zr = null
    , Za = null
    , Go = null
    , eu = !1;
function Gd(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    eu || zr == null || zr !== _i(r) || (r = zr,
        "selectionStart" in r && mc(r) ? r = {
            start: r.selectionStart,
            end: r.selectionEnd
        } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
            r = {
                anchorNode: r.anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset
            }),
        Go && us(Go, r) || (Go = r,
            r = $i(Za, "onSelect"),
            0 < r.length && (t = new fc("onSelect", "select", null, t, n),
                e.push({
                    event: t,
                    listeners: r
                }),
                t.target = zr)))
}
function ei(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
        n["Webkit" + e] = "webkit" + t,
        n["Moz" + e] = "moz" + t,
        n
}
var $r = {
    animationend: ei("Animation", "AnimationEnd"),
    animationiteration: ei("Animation", "AnimationIteration"),
    animationstart: ei("Animation", "AnimationStart"),
    transitionend: ei("Transition", "TransitionEnd")
}
    , ua = {}
    , Yh = {};
en && (Yh = document.createElement("div").style,
    "AnimationEvent" in window || (delete $r.animationend.animation,
        delete $r.animationiteration.animation,
        delete $r.animationstart.animation),
    "TransitionEvent" in window || delete $r.transitionend.transition);
function ml(e) {
    if (ua[e])
        return ua[e];
    if (!$r[e])
        return e;
    var t = $r[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Yh)
            return ua[e] = t[n];
    return e
}
var Gh = ml("animationend")
    , Xh = ml("animationiteration")
    , Jh = ml("animationstart")
    , Zh = ml("transitionend")
    , em = new Map
    , Xd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function qn(e, t) {
    em.set(e, t),
        kr(t, [e])
}
for (var ca = 0; ca < Xd.length; ca++) {
    var da = Xd[ca]
        , tx = da.toLowerCase()
        , nx = da[0].toUpperCase() + da.slice(1);
    qn(tx, "on" + nx)
}
qn(Gh, "onAnimationEnd");
qn(Xh, "onAnimationIteration");
qn(Jh, "onAnimationStart");
qn("dblclick", "onDoubleClick");
qn("focusin", "onFocus");
qn("focusout", "onBlur");
qn(Zh, "onTransitionEnd");
co("onMouseEnter", ["mouseout", "mouseover"]);
co("onMouseLeave", ["mouseout", "mouseover"]);
co("onPointerEnter", ["pointerout", "pointerover"]);
co("onPointerLeave", ["pointerout", "pointerover"]);
kr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
kr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
kr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
kr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
kr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
kr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Wo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
    , rx = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wo));
function Jd(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
        t0(r, t, void 0, e),
        e.currentTarget = null
}
function tm(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
            , o = r.event;
        r = r.listeners;
        e: {
            var s = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var l = r[i]
                        , a = l.instance
                        , u = l.currentTarget;
                    if (l = l.listener,
                        a !== s && o.isPropagationStopped())
                        break e;
                    Jd(o, l, u),
                        s = a
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (l = r[i],
                        a = l.instance,
                        u = l.currentTarget,
                        l = l.listener,
                        a !== s && o.isPropagationStopped())
                        break e;
                    Jd(o, l, u),
                        s = a
                }
        }
    }
    if (Di)
        throw e = Ya,
        Di = !1,
        Ya = null,
        e
}
function ae(e, t) {
    var n = t[su];
    n === void 0 && (n = t[su] = new Set);
    var r = e + "__bubble";
    n.has(r) || (nm(t, e, 2, !1),
        n.add(r))
}
function fa(e, t, n) {
    var r = 0;
    t && (r |= 4),
        nm(n, e, r, t)
}
var ti = "_reactListening" + Math.random().toString(36).slice(2);
function cs(e) {
    if (!e[ti]) {
        e[ti] = !0,
            uh.forEach(function (n) {
                n !== "selectionchange" && (rx.has(n) || fa(n, !1, e),
                    fa(n, !0, e))
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ti] || (t[ti] = !0,
            fa("selectionchange", !1, t))
    }
}
function nm(e, t, n, r) {
    switch (zh(t)) {
        case 1:
            var o = y0;
            break;
        case 4:
            o = v0;
            break;
        default:
            o = cc
    }
    n = o.bind(null, t, n, e),
        o = void 0,
        !qa || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0),
        r ? o !== void 0 ? e.addEventListener(t, n, {
            capture: !0,
            passive: o
        }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
            passive: o
        }) : e.addEventListener(t, n, !1)
}
function pa(e, t, n, r, o) {
    var s = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ;) {
            if (r === null)
                return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var l = r.stateNode.containerInfo;
                if (l === o || l.nodeType === 8 && l.parentNode === o)
                    break;
                if (i === 4)
                    for (i = r.return; i !== null;) {
                        var a = i.tag;
                        if ((a === 3 || a === 4) && (a = i.stateNode.containerInfo,
                            a === o || a.nodeType === 8 && a.parentNode === o))
                            return;
                        i = i.return
                    }
                for (; l !== null;) {
                    if (i = sr(l),
                        i === null)
                        return;
                    if (a = i.tag,
                        a === 5 || a === 6) {
                        r = s = i;
                        continue e
                    }
                    l = l.parentNode
                }
            }
            r = r.return
        }
    kh(function () {
        var u = s
            , c = ic(n)
            , d = [];
        e: {
            var h = em.get(e);
            if (h !== void 0) {
                var p = fc
                    , m = e;
                switch (e) {
                    case "keypress":
                        if (xi(n) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        p = _0;
                        break;
                    case "focusin":
                        m = "focus",
                            p = ia;
                        break;
                    case "focusout":
                        m = "blur",
                            p = ia;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        p = ia;
                        break;
                    case "click":
                        if (n.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        p = $d;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        p = S0;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        p = I0;
                        break;
                    case Gh:
                    case Xh:
                    case Jh:
                        p = C0;
                        break;
                    case Zh:
                        p = F0;
                        break;
                    case "scroll":
                        p = x0;
                        break;
                    case "wheel":
                        p = $0;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        p = P0;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        p = Ud
                }
                var g = (t & 4) !== 0
                    , w = !g && e === "scroll"
                    , v = g ? h !== null ? h + "Capture" : null : h;
                g = [];
                for (var y = u, x; y !== null;) {
                    x = y;
                    var E = x.stateNode;
                    if (x.tag === 5 && E !== null && (x = E,
                        v !== null && (E = os(y, v),
                            E != null && g.push(ds(y, E, x)))),
                        w)
                        break;
                    y = y.return
                }
                0 < g.length && (h = new p(h, m, null, n, c),
                    d.push({
                        event: h,
                        listeners: g
                    }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (h = e === "mouseover" || e === "pointerover",
                    p = e === "mouseout" || e === "pointerout",
                    h && n !== Qa && (m = n.relatedTarget || n.fromElement) && (sr(m) || m[tn]))
                    break e;
                if ((p || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window,
                    p ? (m = n.relatedTarget || n.toElement,
                        p = u,
                        m = m ? sr(m) : null,
                        m !== null && (w = Pr(m),
                            m !== w || m.tag !== 5 && m.tag !== 6) && (m = null)) : (p = null,
                                m = u),
                    p !== m)) {
                    if (g = $d,
                        E = "onMouseLeave",
                        v = "onMouseEnter",
                        y = "mouse",
                        (e === "pointerout" || e === "pointerover") && (g = Ud,
                            E = "onPointerLeave",
                            v = "onPointerEnter",
                            y = "pointer"),
                        w = p == null ? h : Br(p),
                        x = m == null ? h : Br(m),
                        h = new g(E, y + "leave", p, n, c),
                        h.target = w,
                        h.relatedTarget = x,
                        E = null,
                        sr(c) === u && (g = new g(v, y + "enter", m, n, c),
                            g.target = x,
                            g.relatedTarget = w,
                            E = g),
                        w = E,
                        p && m)
                        t: {
                            for (g = p,
                                v = m,
                                y = 0,
                                x = g; x; x = Dr(x))
                                y++;
                            for (x = 0,
                                E = v; E; E = Dr(E))
                                x++;
                            for (; 0 < y - x;)
                                g = Dr(g),
                                    y--;
                            for (; 0 < x - y;)
                                v = Dr(v),
                                    x--;
                            for (; y--;) {
                                if (g === v || v !== null && g === v.alternate)
                                    break t;
                                g = Dr(g),
                                    v = Dr(v)
                            }
                            g = null
                        }
                    else
                        g = null;
                    p !== null && Zd(d, h, p, g, !1),
                        m !== null && w !== null && Zd(d, w, m, g, !0)
                }
            }
            e: {
                if (h = u ? Br(u) : window,
                    p = h.nodeName && h.nodeName.toLowerCase(),
                    p === "select" || p === "input" && h.type === "file")
                    var b = K0;
                else if (Wd(h))
                    if (Wh)
                        b = X0;
                    else {
                        b = Y0;
                        var C = q0
                    }
                else
                    (p = h.nodeName) && p.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (b = G0);
                if (b && (b = b(e, u))) {
                    Hh(d, b, n, c);
                    break e
                }
                C && C(e, h, u),
                    e === "focusout" && (C = h._wrapperState) && C.controlled && h.type === "number" && Ba(h, "number", h.value)
            }
            switch (C = u ? Br(u) : window,
            e) {
                case "focusin":
                    (Wd(C) || C.contentEditable === "true") && (zr = C,
                        Za = u,
                        Go = null);
                    break;
                case "focusout":
                    Go = Za = zr = null;
                    break;
                case "mousedown":
                    eu = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    eu = !1,
                        Gd(d, n, c);
                    break;
                case "selectionchange":
                    if (ex)
                        break;
                case "keydown":
                case "keyup":
                    Gd(d, n, c)
            }
            var k;
            if (hc)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var R = "onCompositionStart";
                            break e;
                        case "compositionend":
                            R = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            R = "onCompositionUpdate";
                            break e
                    }
                    R = void 0
                }
            else
                Fr ? Uh(e, n) && (R = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (R = "onCompositionStart");
            R && (Bh && n.locale !== "ko" && (Fr || R !== "onCompositionStart" ? R === "onCompositionEnd" && Fr && (k = $h()) : (jn = c,
                dc = "value" in jn ? jn.value : jn.textContent,
                Fr = !0)),
                C = $i(u, R),
                0 < C.length && (R = new Bd(R, e, null, n, c),
                    d.push({
                        event: R,
                        listeners: C
                    }),
                    k ? R.data = k : (k = Vh(n),
                        k !== null && (R.data = k)))),
                (k = U0 ? V0(e, n) : H0(e, n)) && (u = $i(u, "onBeforeInput"),
                    0 < u.length && (c = new Bd("onBeforeInput", "beforeinput", null, n, c),
                        d.push({
                            event: c,
                            listeners: u
                        }),
                        c.data = k))
        }
        tm(d, t)
    })
}
function ds(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function $i(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var o = e
            , s = o.stateNode;
        o.tag === 5 && s !== null && (o = s,
            s = os(e, n),
            s != null && r.unshift(ds(e, s, o)),
            s = os(e, t),
            s != null && r.push(ds(e, s, o))),
            e = e.return
    }
    return r
}
function Dr(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function Zd(e, t, n, r, o) {
    for (var s = t._reactName, i = []; n !== null && n !== r;) {
        var l = n
            , a = l.alternate
            , u = l.stateNode;
        if (a !== null && a === r)
            break;
        l.tag === 5 && u !== null && (l = u,
            o ? (a = os(n, s),
                a != null && i.unshift(ds(n, a, l))) : o || (a = os(n, s),
                    a != null && i.push(ds(n, a, l)))),
            n = n.return
    }
    i.length !== 0 && e.push({
        event: t,
        listeners: i
    })
}
var ox = /\r\n?/g
    , sx = /\u0000|\uFFFD/g;
function ef(e) {
    return (typeof e == "string" ? e : "" + e).replace(ox, `
`).replace(sx, "")
}
function ni(e, t, n) {
    if (t = ef(t),
        ef(e) !== t && n)
        throw Error(O(425))
}
function Bi() { }
var tu = null
    , nu = null;
function ru(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var ou = typeof setTimeout == "function" ? setTimeout : void 0
    , ix = typeof clearTimeout == "function" ? clearTimeout : void 0
    , tf = typeof Promise == "function" ? Promise : void 0
    , lx = typeof queueMicrotask == "function" ? queueMicrotask : typeof tf < "u" ? function (e) {
        return tf.resolve(null).then(e).catch(ax)
    }
        : ou;
function ax(e) {
    setTimeout(function () {
        throw e
    })
}
function ha(e, t) {
    var n = t
        , r = 0;
    do {
        var o = n.nextSibling;
        if (e.removeChild(n),
            o && o.nodeType === 8)
            if (n = o.data,
                n === "/$") {
                if (r === 0) {
                    e.removeChild(o),
                        ls(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = o
    } while (n);
    ls(t)
}
function In(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
                t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function nf(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var bo = Math.random().toString(36).slice(2)
    , zt = "__reactFiber$" + bo
    , fs = "__reactProps$" + bo
    , tn = "__reactContainer$" + bo
    , su = "__reactEvents$" + bo
    , ux = "__reactListeners$" + bo
    , cx = "__reactHandles$" + bo;
function sr(e) {
    var t = e[zt];
    if (t)
        return t;
    for (var n = e.parentNode; n;) {
        if (t = n[tn] || n[zt]) {
            if (n = t.alternate,
                t.child !== null || n !== null && n.child !== null)
                for (e = nf(e); e !== null;) {
                    if (n = e[zt])
                        return n;
                    e = nf(e)
                }
            return t
        }
        e = n,
            n = e.parentNode
    }
    return null
}
function js(e) {
    return e = e[zt] || e[tn],
        !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Br(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(O(33))
}
function gl(e) {
    return e[fs] || null
}
var iu = []
    , Ur = -1;
function Yn(e) {
    return {
        current: e
    }
}
function ue(e) {
    0 > Ur || (e.current = iu[Ur],
        iu[Ur] = null,
        Ur--)
}
function ie(e, t) {
    Ur++,
        iu[Ur] = e.current,
        e.current = t
}
var Vn = {}
    , Fe = Yn(Vn)
    , Ke = Yn(!1)
    , vr = Vn;
function fo(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return Vn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var o = {}, s;
    for (s in n)
        o[s] = t[s];
    return r && (e = e.stateNode,
        e.__reactInternalMemoizedUnmaskedChildContext = t,
        e.__reactInternalMemoizedMaskedChildContext = o),
        o
}
function qe(e) {
    return e = e.childContextTypes,
        e != null
}
function Ui() {
    ue(Ke),
        ue(Fe)
}
function rf(e, t, n) {
    if (Fe.current !== Vn)
        throw Error(O(168));
    ie(Fe, t),
        ie(Ke, n)
}
function rm(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
        typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var o in r)
        if (!(o in t))
            throw Error(O(108, qv(e) || "Unknown", o));
    return ge({}, n, r)
}
function Vi(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Vn,
        vr = Fe.current,
        ie(Fe, e),
        ie(Ke, Ke.current),
        !0
}
function of(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(O(169));
    n ? (e = rm(e, t, vr),
        r.__reactInternalMemoizedMergedChildContext = e,
        ue(Ke),
        ue(Fe),
        ie(Fe, e)) : ue(Ke),
        ie(Ke, n)
}
var Yt = null
    , yl = !1
    , ma = !1;
function om(e) {
    Yt === null ? Yt = [e] : Yt.push(e)
}
function dx(e) {
    yl = !0,
        om(e)
}
function Gn() {
    if (!ma && Yt !== null) {
        ma = !0;
        var e = 0
            , t = oe;
        try {
            var n = Yt;
            for (oe = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            Yt = null,
                yl = !1
        } catch (o) {
            throw Yt !== null && (Yt = Yt.slice(e + 1)),
            Rh(lc, Gn),
            o
        } finally {
            oe = t,
                ma = !1
        }
    }
    return null
}
var Vr = []
    , Hr = 0
    , Hi = null
    , Wi = 0
    , ct = []
    , dt = 0
    , xr = null
    , Xt = 1
    , Jt = "";
function rr(e, t) {
    Vr[Hr++] = Wi,
        Vr[Hr++] = Hi,
        Hi = e,
        Wi = t
}
function sm(e, t, n) {
    ct[dt++] = Xt,
        ct[dt++] = Jt,
        ct[dt++] = xr,
        xr = e;
    var r = Xt;
    e = Jt;
    var o = 32 - Nt(r) - 1;
    r &= ~(1 << o),
        n += 1;
    var s = 32 - Nt(t) + o;
    if (30 < s) {
        var i = o - o % 5;
        s = (r & (1 << i) - 1).toString(32),
            r >>= i,
            o -= i,
            Xt = 1 << 32 - Nt(t) + o | n << o | r,
            Jt = s + e
    } else
        Xt = 1 << s | n << o | r,
            Jt = e
}
function gc(e) {
    e.return !== null && (rr(e, 1),
        sm(e, 1, 0))
}
function yc(e) {
    for (; e === Hi;)
        Hi = Vr[--Hr],
            Vr[Hr] = null,
            Wi = Vr[--Hr],
            Vr[Hr] = null;
    for (; e === xr;)
        xr = ct[--dt],
            ct[dt] = null,
            Jt = ct[--dt],
            ct[dt] = null,
            Xt = ct[--dt],
            ct[dt] = null
}
var nt = null
    , tt = null
    , fe = !1
    , Pt = null;
function im(e, t) {
    var n = ft(5, null, null, 0);
    n.elementType = "DELETED",
        n.stateNode = t,
        n.return = e,
        t = e.deletions,
        t === null ? (e.deletions = [n],
            e.flags |= 16) : t.push(n)
}
function sf(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
                t !== null ? (e.stateNode = t,
                    nt = e,
                    tt = In(t.firstChild),
                    !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
                t !== null ? (e.stateNode = t,
                    nt = e,
                    tt = null,
                    !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t,
                t !== null ? (n = xr !== null ? {
                    id: Xt,
                    overflow: Jt
                } : null,
                    e.memoizedState = {
                        dehydrated: t,
                        treeContext: n,
                        retryLane: 1073741824
                    },
                    n = ft(18, null, null, 0),
                    n.stateNode = t,
                    n.return = e,
                    e.child = n,
                    nt = e,
                    tt = null,
                    !0) : !1;
        default:
            return !1
    }
}
function lu(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function au(e) {
    if (fe) {
        var t = tt;
        if (t) {
            var n = t;
            if (!sf(e, t)) {
                if (lu(e))
                    throw Error(O(418));
                t = In(n.nextSibling);
                var r = nt;
                t && sf(e, t) ? im(r, n) : (e.flags = e.flags & -4097 | 2,
                    fe = !1,
                    nt = e)
            }
        } else {
            if (lu(e))
                throw Error(O(418));
            e.flags = e.flags & -4097 | 2,
                fe = !1,
                nt = e
        }
    }
}
function lf(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
        e = e.return;
    nt = e
}
function ri(e) {
    if (e !== nt)
        return !1;
    if (!fe)
        return lf(e),
            fe = !0,
            !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
        t = t !== "head" && t !== "body" && !ru(e.type, e.memoizedProps)),
        t && (t = tt)) {
        if (lu(e))
            throw lm(),
            Error(O(418));
        for (; t;)
            im(e, t),
                t = In(t.nextSibling)
    }
    if (lf(e),
        e.tag === 13) {
        if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
            throw Error(O(317));
        e: {
            for (e = e.nextSibling,
                t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            tt = In(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            tt = null
        }
    } else
        tt = nt ? In(e.stateNode.nextSibling) : null;
    return !0
}
function lm() {
    for (var e = tt; e;)
        e = In(e.nextSibling)
}
function po() {
    tt = nt = null,
        fe = !1
}
function vc(e) {
    Pt === null ? Pt = [e] : Pt.push(e)
}
var fx = ln.ReactCurrentBatchConfig;
function Io(e, t, n) {
    if (e = n.ref,
        e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
                n) {
                if (n.tag !== 1)
                    throw Error(O(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(O(147, e));
            var o = r
                , s = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s ? t.ref : (t = function (i) {
                var l = o.refs;
                i === null ? delete l[s] : l[s] = i
            }
                ,
                t._stringRef = s,
                t)
        }
        if (typeof e != "string")
            throw Error(O(284));
        if (!n._owner)
            throw Error(O(290, e))
    }
    return e
}
function oi(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(O(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function af(e) {
    var t = e._init;
    return t(e._payload)
}
function am(e) {
    function t(v, y) {
        if (e) {
            var x = v.deletions;
            x === null ? (v.deletions = [y],
                v.flags |= 16) : x.push(y)
        }
    }
    function n(v, y) {
        if (!e)
            return null;
        for (; y !== null;)
            t(v, y),
                y = y.sibling;
        return null
    }
    function r(v, y) {
        for (v = new Map; y !== null;)
            y.key !== null ? v.set(y.key, y) : v.set(y.index, y),
                y = y.sibling;
        return v
    }
    function o(v, y) {
        return v = $n(v, y),
            v.index = 0,
            v.sibling = null,
            v
    }
    function s(v, y, x) {
        return v.index = x,
            e ? (x = v.alternate,
                x !== null ? (x = x.index,
                    x < y ? (v.flags |= 2,
                        y) : x) : (v.flags |= 2,
                            y)) : (v.flags |= 1048576,
                                y)
    }
    function i(v) {
        return e && v.alternate === null && (v.flags |= 2),
            v
    }
    function l(v, y, x, E) {
        return y === null || y.tag !== 6 ? (y = Ea(x, v.mode, E),
            y.return = v,
            y) : (y = o(y, x),
                y.return = v,
                y)
    }
    function a(v, y, x, E) {
        var b = x.type;
        return b === Mr ? c(v, y, x.props.children, E, x.key) : y !== null && (y.elementType === b || typeof b == "object" && b !== null && b.$$typeof === wn && af(b) === y.type) ? (E = o(y, x.props),
            E.ref = Io(v, y, x),
            E.return = v,
            E) : (E = Pi(x.type, x.key, x.props, null, v.mode, E),
                E.ref = Io(v, y, x),
                E.return = v,
                E)
    }
    function u(v, y, x, E) {
        return y === null || y.tag !== 4 || y.stateNode.containerInfo !== x.containerInfo || y.stateNode.implementation !== x.implementation ? (y = ba(x, v.mode, E),
            y.return = v,
            y) : (y = o(y, x.children || []),
                y.return = v,
                y)
    }
    function c(v, y, x, E, b) {
        return y === null || y.tag !== 7 ? (y = gr(x, v.mode, E, b),
            y.return = v,
            y) : (y = o(y, x),
                y.return = v,
                y)
    }
    function d(v, y, x) {
        if (typeof y == "string" && y !== "" || typeof y == "number")
            return y = Ea("" + y, v.mode, x),
                y.return = v,
                y;
        if (typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case Ks:
                    return x = Pi(y.type, y.key, y.props, null, v.mode, x),
                        x.ref = Io(v, null, y),
                        x.return = v,
                        x;
                case Ir:
                    return y = ba(y, v.mode, x),
                        y.return = v,
                        y;
                case wn:
                    var E = y._init;
                    return d(v, E(y._payload), x)
            }
            if (Vo(y) || Oo(y))
                return y = gr(y, v.mode, x, null),
                    y.return = v,
                    y;
            oi(v, y)
        }
        return null
    }
    function h(v, y, x, E) {
        var b = y !== null ? y.key : null;
        if (typeof x == "string" && x !== "" || typeof x == "number")
            return b !== null ? null : l(v, y, "" + x, E);
        if (typeof x == "object" && x !== null) {
            switch (x.$$typeof) {
                case Ks:
                    return x.key === b ? a(v, y, x, E) : null;
                case Ir:
                    return x.key === b ? u(v, y, x, E) : null;
                case wn:
                    return b = x._init,
                        h(v, y, b(x._payload), E)
            }
            if (Vo(x) || Oo(x))
                return b !== null ? null : c(v, y, x, E, null);
            oi(v, x)
        }
        return null
    }
    function p(v, y, x, E, b) {
        if (typeof E == "string" && E !== "" || typeof E == "number")
            return v = v.get(x) || null,
                l(y, v, "" + E, b);
        if (typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
                case Ks:
                    return v = v.get(E.key === null ? x : E.key) || null,
                        a(y, v, E, b);
                case Ir:
                    return v = v.get(E.key === null ? x : E.key) || null,
                        u(y, v, E, b);
                case wn:
                    var C = E._init;
                    return p(v, y, x, C(E._payload), b)
            }
            if (Vo(E) || Oo(E))
                return v = v.get(x) || null,
                    c(y, v, E, b, null);
            oi(y, E)
        }
        return null
    }
    function m(v, y, x, E) {
        for (var b = null, C = null, k = y, R = y = 0, L = null; k !== null && R < x.length; R++) {
            k.index > R ? (L = k,
                k = null) : L = k.sibling;
            var D = h(v, k, x[R], E);
            if (D === null) {
                k === null && (k = L);
                break
            }
            e && k && D.alternate === null && t(v, k),
                y = s(D, y, R),
                C === null ? b = D : C.sibling = D,
                C = D,
                k = L
        }
        if (R === x.length)
            return n(v, k),
                fe && rr(v, R),
                b;
        if (k === null) {
            for (; R < x.length; R++)
                k = d(v, x[R], E),
                    k !== null && (y = s(k, y, R),
                        C === null ? b = k : C.sibling = k,
                        C = k);
            return fe && rr(v, R),
                b
        }
        for (k = r(v, k); R < x.length; R++)
            L = p(k, v, R, x[R], E),
                L !== null && (e && L.alternate !== null && k.delete(L.key === null ? R : L.key),
                    y = s(L, y, R),
                    C === null ? b = L : C.sibling = L,
                    C = L);
        return e && k.forEach(function (U) {
            return t(v, U)
        }),
            fe && rr(v, R),
            b
    }
    function g(v, y, x, E) {
        var b = Oo(x);
        if (typeof b != "function")
            throw Error(O(150));
        if (x = b.call(x),
            x == null)
            throw Error(O(151));
        for (var C = b = null, k = y, R = y = 0, L = null, D = x.next(); k !== null && !D.done; R++,
            D = x.next()) {
            k.index > R ? (L = k,
                k = null) : L = k.sibling;
            var U = h(v, k, D.value, E);
            if (U === null) {
                k === null && (k = L);
                break
            }
            e && k && U.alternate === null && t(v, k),
                y = s(U, y, R),
                C === null ? b = U : C.sibling = U,
                C = U,
                k = L
        }
        if (D.done)
            return n(v, k),
                fe && rr(v, R),
                b;
        if (k === null) {
            for (; !D.done; R++,
                D = x.next())
                D = d(v, D.value, E),
                    D !== null && (y = s(D, y, R),
                        C === null ? b = D : C.sibling = D,
                        C = D);
            return fe && rr(v, R),
                b
        }
        for (k = r(v, k); !D.done; R++,
            D = x.next())
            D = p(k, v, R, D.value, E),
                D !== null && (e && D.alternate !== null && k.delete(D.key === null ? R : D.key),
                    y = s(D, y, R),
                    C === null ? b = D : C.sibling = D,
                    C = D);
        return e && k.forEach(function (M) {
            return t(v, M)
        }),
            fe && rr(v, R),
            b
    }
    function w(v, y, x, E) {
        if (typeof x == "object" && x !== null && x.type === Mr && x.key === null && (x = x.props.children),
            typeof x == "object" && x !== null) {
            switch (x.$$typeof) {
                case Ks:
                    e: {
                        for (var b = x.key, C = y; C !== null;) {
                            if (C.key === b) {
                                if (b = x.type,
                                    b === Mr) {
                                    if (C.tag === 7) {
                                        n(v, C.sibling),
                                            y = o(C, x.props.children),
                                            y.return = v,
                                            v = y;
                                        break e
                                    }
                                } else if (C.elementType === b || typeof b == "object" && b !== null && b.$$typeof === wn && af(b) === C.type) {
                                    n(v, C.sibling),
                                        y = o(C, x.props),
                                        y.ref = Io(v, C, x),
                                        y.return = v,
                                        v = y;
                                    break e
                                }
                                n(v, C);
                                break
                            } else
                                t(v, C);
                            C = C.sibling
                        }
                        x.type === Mr ? (y = gr(x.props.children, v.mode, E, x.key),
                            y.return = v,
                            v = y) : (E = Pi(x.type, x.key, x.props, null, v.mode, E),
                                E.ref = Io(v, y, x),
                                E.return = v,
                                v = E)
                    }
                    return i(v);
                case Ir:
                    e: {
                        for (C = x.key; y !== null;) {
                            if (y.key === C)
                                if (y.tag === 4 && y.stateNode.containerInfo === x.containerInfo && y.stateNode.implementation === x.implementation) {
                                    n(v, y.sibling),
                                        y = o(y, x.children || []),
                                        y.return = v,
                                        v = y;
                                    break e
                                } else {
                                    n(v, y);
                                    break
                                }
                            else
                                t(v, y);
                            y = y.sibling
                        }
                        y = ba(x, v.mode, E),
                            y.return = v,
                            v = y
                    }
                    return i(v);
                case wn:
                    return C = x._init,
                        w(v, y, C(x._payload), E)
            }
            if (Vo(x))
                return m(v, y, x, E);
            if (Oo(x))
                return g(v, y, x, E);
            oi(v, x)
        }
        return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x,
            y !== null && y.tag === 6 ? (n(v, y.sibling),
                y = o(y, x),
                y.return = v,
                v = y) : (n(v, y),
                    y = Ea(x, v.mode, E),
                    y.return = v,
                    v = y),
            i(v)) : n(v, y)
    }
    return w
}
var ho = am(!0)
    , um = am(!1)
    , Qi = Yn(null)
    , Ki = null
    , Wr = null
    , xc = null;
function wc() {
    xc = Wr = Ki = null
}
function Sc(e) {
    var t = Qi.current;
    ue(Qi),
        e._currentValue = t
}
function uu(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
            break;
        e = e.return
    }
}
function Jr(e, t) {
    Ki = e,
        xc = Wr = null,
        e = e.dependencies,
        e !== null && e.firstContext !== null && (e.lanes & t && (Qe = !0),
            e.firstContext = null)
}
function ht(e) {
    var t = e._currentValue;
    if (xc !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
            Wr === null) {
            if (Ki === null)
                throw Error(O(308));
            Wr = e,
                Ki.dependencies = {
                    lanes: 0,
                    firstContext: e
                }
        } else
            Wr = Wr.next = e;
    return t
}
var ir = null;
function Ec(e) {
    ir === null ? ir = [e] : ir.push(e)
}
function cm(e, t, n, r) {
    var o = t.interleaved;
    return o === null ? (n.next = n,
        Ec(t)) : (n.next = o.next,
            o.next = n),
        t.interleaved = n,
        nn(e, r)
}
function nn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
        n = e,
        e = e.return; e !== null;)
        e.childLanes |= t,
            n = e.alternate,
            n !== null && (n.childLanes |= t),
            n = e,
            e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Sn = !1;
function bc(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function dm(e, t) {
    e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects
        })
}
function Zt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function Mn(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
        te & 2) {
        var o = r.pending;
        return o === null ? t.next = t : (t.next = o.next,
            o.next = t),
            r.pending = t,
            nn(e, n)
    }
    return o = r.interleaved,
        o === null ? (t.next = t,
            Ec(r)) : (t.next = o.next,
                o.next = t),
        r.interleaved = t,
        nn(e, n)
}
function wi(e, t, n) {
    if (t = t.updateQueue,
        t !== null && (t = t.shared,
            (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
            n |= r,
            t.lanes = n,
            ac(e, n)
    }
}
function uf(e, t) {
    var n = e.updateQueue
        , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
        n === r)) {
        var o = null
            , s = null;
        if (n = n.firstBaseUpdate,
            n !== null) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                s === null ? o = s = i : s = s.next = i,
                    n = n.next
            } while (n !== null);
            s === null ? o = s = t : s = s.next = t
        } else
            o = s = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: o,
            lastBaseUpdate: s,
            shared: r.shared,
            effects: r.effects
        },
            e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
        e === null ? n.firstBaseUpdate = t : e.next = t,
        n.lastBaseUpdate = t
}
function qi(e, t, n, r) {
    var o = e.updateQueue;
    Sn = !1;
    var s = o.firstBaseUpdate
        , i = o.lastBaseUpdate
        , l = o.shared.pending;
    if (l !== null) {
        o.shared.pending = null;
        var a = l
            , u = a.next;
        a.next = null,
            i === null ? s = u : i.next = u,
            i = a;
        var c = e.alternate;
        c !== null && (c = c.updateQueue,
            l = c.lastBaseUpdate,
            l !== i && (l === null ? c.firstBaseUpdate = u : l.next = u,
                c.lastBaseUpdate = a))
    }
    if (s !== null) {
        var d = o.baseState;
        i = 0,
            c = u = a = null,
            l = s;
        do {
            var h = l.lane
                , p = l.eventTime;
            if ((r & h) === h) {
                c !== null && (c = c.next = {
                    eventTime: p,
                    lane: 0,
                    tag: l.tag,
                    payload: l.payload,
                    callback: l.callback,
                    next: null
                });
                e: {
                    var m = e
                        , g = l;
                    switch (h = t,
                    p = n,
                    g.tag) {
                        case 1:
                            if (m = g.payload,
                                typeof m == "function") {
                                d = m.call(p, d, h);
                                break e
                            }
                            d = m;
                            break e;
                        case 3:
                            m.flags = m.flags & -65537 | 128;
                        case 0:
                            if (m = g.payload,
                                h = typeof m == "function" ? m.call(p, d, h) : m,
                                h == null)
                                break e;
                            d = ge({}, d, h);
                            break e;
                        case 2:
                            Sn = !0
                    }
                }
                l.callback !== null && l.lane !== 0 && (e.flags |= 64,
                    h = o.effects,
                    h === null ? o.effects = [l] : h.push(l))
            } else
                p = {
                    eventTime: p,
                    lane: h,
                    tag: l.tag,
                    payload: l.payload,
                    callback: l.callback,
                    next: null
                },
                    c === null ? (u = c = p,
                        a = d) : c = c.next = p,
                    i |= h;
            if (l = l.next,
                l === null) {
                if (l = o.shared.pending,
                    l === null)
                    break;
                h = l,
                    l = h.next,
                    h.next = null,
                    o.lastBaseUpdate = h,
                    o.shared.pending = null
            }
        } while (!0);
        if (c === null && (a = d),
            o.baseState = a,
            o.firstBaseUpdate = u,
            o.lastBaseUpdate = c,
            t = o.shared.interleaved,
            t !== null) {
            o = t;
            do
                i |= o.lane,
                    o = o.next;
            while (o !== t)
        } else
            s === null && (o.shared.lanes = 0);
        Sr |= i,
            e.lanes = i,
            e.memoizedState = d
    }
}
function cf(e, t, n) {
    if (e = t.effects,
        t.effects = null,
        e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
                , o = r.callback;
            if (o !== null) {
                if (r.callback = null,
                    r = n,
                    typeof o != "function")
                    throw Error(O(191, o));
                o.call(r)
            }
        }
}
var Os = {}
    , Ut = Yn(Os)
    , ps = Yn(Os)
    , hs = Yn(Os);
function lr(e) {
    if (e === Os)
        throw Error(O(174));
    return e
}
function Cc(e, t) {
    switch (ie(hs, t),
    ie(ps, e),
    ie(Ut, Os),
    e = t.nodeType,
    e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Va(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t,
                t = e.namespaceURI || null,
                e = e.tagName,
                t = Va(t, e)
    }
    ue(Ut),
        ie(Ut, t)
}
function mo() {
    ue(Ut),
        ue(ps),
        ue(hs)
}
function fm(e) {
    lr(hs.current);
    var t = lr(Ut.current)
        , n = Va(t, e.type);
    t !== n && (ie(ps, e),
        ie(Ut, n))
}
function kc(e) {
    ps.current === e && (ue(Ut),
        ue(ps))
}
var he = Yn(0);
function Yi(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
                n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
                t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
            t = t.sibling
    }
    return null
}
var ga = [];
function Pc() {
    for (var e = 0; e < ga.length; e++)
        ga[e]._workInProgressVersionPrimary = null;
    ga.length = 0
}
var Si = ln.ReactCurrentDispatcher
    , ya = ln.ReactCurrentBatchConfig
    , wr = 0
    , me = null
    , Ee = null
    , Pe = null
    , Gi = !1
    , Xo = !1
    , ms = 0
    , px = 0;
function _e() {
    throw Error(O(321))
}
function Nc(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Rt(e[n], t[n]))
            return !1;
    return !0
}
function Tc(e, t, n, r, o, s) {
    if (wr = s,
        me = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        Si.current = e === null || e.memoizedState === null ? yx : vx,
        e = n(r, o),
        Xo) {
        s = 0;
        do {
            if (Xo = !1,
                ms = 0,
                25 <= s)
                throw Error(O(301));
            s += 1,
                Pe = Ee = null,
                t.updateQueue = null,
                Si.current = xx,
                e = n(r, o)
        } while (Xo)
    }
    if (Si.current = Xi,
        t = Ee !== null && Ee.next !== null,
        wr = 0,
        Pe = Ee = me = null,
        Gi = !1,
        t)
        throw Error(O(300));
    return e
}
function Rc() {
    var e = ms !== 0;
    return ms = 0,
        e
}
function Dt() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return Pe === null ? me.memoizedState = Pe = e : Pe = Pe.next = e,
        Pe
}
function mt() {
    if (Ee === null) {
        var e = me.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = Ee.next;
    var t = Pe === null ? me.memoizedState : Pe.next;
    if (t !== null)
        Pe = t,
            Ee = e;
    else {
        if (e === null)
            throw Error(O(310));
        Ee = e,
            e = {
                memoizedState: Ee.memoizedState,
                baseState: Ee.baseState,
                baseQueue: Ee.baseQueue,
                queue: Ee.queue,
                next: null
            },
            Pe === null ? me.memoizedState = Pe = e : Pe = Pe.next = e
    }
    return Pe
}
function gs(e, t) {
    return typeof t == "function" ? t(e) : t
}
function va(e) {
    var t = mt()
        , n = t.queue;
    if (n === null)
        throw Error(O(311));
    n.lastRenderedReducer = e;
    var r = Ee
        , o = r.baseQueue
        , s = n.pending;
    if (s !== null) {
        if (o !== null) {
            var i = o.next;
            o.next = s.next,
                s.next = i
        }
        r.baseQueue = o = s,
            n.pending = null
    }
    if (o !== null) {
        s = o.next,
            r = r.baseState;
        var l = i = null
            , a = null
            , u = s;
        do {
            var c = u.lane;
            if ((wr & c) === c)
                a !== null && (a = a.next = {
                    lane: 0,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                }),
                    r = u.hasEagerState ? u.eagerState : e(r, u.action);
            else {
                var d = {
                    lane: c,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                a === null ? (l = a = d,
                    i = r) : a = a.next = d,
                    me.lanes |= c,
                    Sr |= c
            }
            u = u.next
        } while (u !== null && u !== s);
        a === null ? i = r : a.next = l,
            Rt(r, t.memoizedState) || (Qe = !0),
            t.memoizedState = r,
            t.baseState = i,
            t.baseQueue = a,
            n.lastRenderedState = r
    }
    if (e = n.interleaved,
        e !== null) {
        o = e;
        do
            s = o.lane,
                me.lanes |= s,
                Sr |= s,
                o = o.next;
        while (o !== e)
    } else
        o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function xa(e) {
    var t = mt()
        , n = t.queue;
    if (n === null)
        throw Error(O(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
        , o = n.pending
        , s = t.memoizedState;
    if (o !== null) {
        n.pending = null;
        var i = o = o.next;
        do
            s = e(s, i.action),
                i = i.next;
        while (i !== o);
        Rt(s, t.memoizedState) || (Qe = !0),
            t.memoizedState = s,
            t.baseQueue === null && (t.baseState = s),
            n.lastRenderedState = s
    }
    return [s, r]
}
function pm() { }
function hm(e, t) {
    var n = me
        , r = mt()
        , o = t()
        , s = !Rt(r.memoizedState, o);
    if (s && (r.memoizedState = o,
        Qe = !0),
        r = r.queue,
        jc(ym.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || s || Pe !== null && Pe.memoizedState.tag & 1) {
        if (n.flags |= 2048,
            ys(9, gm.bind(null, n, r, o, t), void 0, null),
            Ne === null)
            throw Error(O(349));
        wr & 30 || mm(n, t, o)
    }
    return o
}
function mm(e, t, n) {
    e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: n
        },
        t = me.updateQueue,
        t === null ? (t = {
            lastEffect: null,
            stores: null
        },
            me.updateQueue = t,
            t.stores = [e]) : (n = t.stores,
                n === null ? t.stores = [e] : n.push(e))
}
function gm(e, t, n, r) {
    t.value = n,
        t.getSnapshot = r,
        vm(t) && xm(e)
}
function ym(e, t, n) {
    return n(function () {
        vm(t) && xm(e)
    })
}
function vm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Rt(e, n)
    } catch {
        return !0
    }
}
function xm(e) {
    var t = nn(e, 1);
    t !== null && Tt(t, e, 1, -1)
}
function df(e) {
    var t = Dt();
    return typeof e == "function" && (e = e()),
        t.memoizedState = t.baseState = e,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: gs,
            lastRenderedState: e
        },
        t.queue = e,
        e = e.dispatch = gx.bind(null, me, e),
        [t.memoizedState, e]
}
function ys(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
        t = me.updateQueue,
        t === null ? (t = {
            lastEffect: null,
            stores: null
        },
            me.updateQueue = t,
            t.lastEffect = e.next = e) : (n = t.lastEffect,
                n === null ? t.lastEffect = e.next = e : (r = n.next,
                    n.next = e,
                    e.next = r,
                    t.lastEffect = e)),
        e
}
function wm() {
    return mt().memoizedState
}
function Ei(e, t, n, r) {
    var o = Dt();
    me.flags |= e,
        o.memoizedState = ys(1 | t, n, void 0, r === void 0 ? null : r)
}
function vl(e, t, n, r) {
    var o = mt();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (Ee !== null) {
        var i = Ee.memoizedState;
        if (s = i.destroy,
            r !== null && Nc(r, i.deps)) {
            o.memoizedState = ys(t, n, s, r);
            return
        }
    }
    me.flags |= e,
        o.memoizedState = ys(1 | t, n, s, r)
}
function ff(e, t) {
    return Ei(8390656, 8, e, t)
}
function jc(e, t) {
    return vl(2048, 8, e, t)
}
function Sm(e, t) {
    return vl(4, 2, e, t)
}
function Em(e, t) {
    return vl(4, 4, e, t)
}
function bm(e, t) {
    if (typeof t == "function")
        return e = e(),
            t(e),
            function () {
                t(null)
            }
            ;
    if (t != null)
        return e = e(),
            t.current = e,
            function () {
                t.current = null
            }
}
function Cm(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
        vl(4, 4, bm.bind(null, t, e), n)
}
function Oc() { }
function km(e, t) {
    var n = mt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Nc(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
        e)
}
function Pm(e, t) {
    var n = mt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Nc(t, r[1]) ? r[0] : (e = e(),
        n.memoizedState = [e, t],
        e)
}
function Nm(e, t, n) {
    return wr & 21 ? (Rt(n, t) || (n = Ah(),
        me.lanes |= n,
        Sr |= n,
        e.baseState = !0),
        t) : (e.baseState && (e.baseState = !1,
            Qe = !0),
            e.memoizedState = n)
}
function hx(e, t) {
    var n = oe;
    oe = n !== 0 && 4 > n ? n : 4,
        e(!0);
    var r = ya.transition;
    ya.transition = {};
    try {
        e(!1),
            t()
    } finally {
        oe = n,
            ya.transition = r
    }
}
function Tm() {
    return mt().memoizedState
}
function mx(e, t, n) {
    var r = zn(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
        Rm(e))
        jm(t, n);
    else if (n = cm(e, t, n, r),
        n !== null) {
        var o = Be();
        Tt(n, e, r, o),
            Om(n, t, r)
    }
}
function gx(e, t, n) {
    var r = zn(e)
        , o = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (Rm(e))
        jm(t, o);
    else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer,
            s !== null))
            try {
                var i = t.lastRenderedState
                    , l = s(i, n);
                if (o.hasEagerState = !0,
                    o.eagerState = l,
                    Rt(l, i)) {
                    var a = t.interleaved;
                    a === null ? (o.next = o,
                        Ec(t)) : (o.next = a.next,
                            a.next = o),
                        t.interleaved = o;
                    return
                }
            } catch { } finally { }
        n = cm(e, t, o, r),
            n !== null && (o = Be(),
                Tt(n, e, r, o),
                Om(n, t, r))
    }
}
function Rm(e) {
    var t = e.alternate;
    return e === me || t !== null && t === me
}
function jm(e, t) {
    Xo = Gi = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
        n.next = t),
        e.pending = t
}
function Om(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
            n |= r,
            t.lanes = n,
            ac(e, n)
    }
}
var Xi = {
    readContext: ht,
    useCallback: _e,
    useContext: _e,
    useEffect: _e,
    useImperativeHandle: _e,
    useInsertionEffect: _e,
    useLayoutEffect: _e,
    useMemo: _e,
    useReducer: _e,
    useRef: _e,
    useState: _e,
    useDebugValue: _e,
    useDeferredValue: _e,
    useTransition: _e,
    useMutableSource: _e,
    useSyncExternalStore: _e,
    useId: _e,
    unstable_isNewReconciler: !1
}
    , yx = {
        readContext: ht,
        useCallback: function (e, t) {
            return Dt().memoizedState = [e, t === void 0 ? null : t],
                e
        },
        useContext: ht,
        useEffect: ff,
        useImperativeHandle: function (e, t, n) {
            return n = n != null ? n.concat([e]) : null,
                Ei(4194308, 4, bm.bind(null, t, e), n)
        },
        useLayoutEffect: function (e, t) {
            return Ei(4194308, 4, e, t)
        },
        useInsertionEffect: function (e, t) {
            return Ei(4, 2, e, t)
        },
        useMemo: function (e, t) {
            var n = Dt();
            return t = t === void 0 ? null : t,
                e = e(),
                n.memoizedState = [e, t],
                e
        },
        useReducer: function (e, t, n) {
            var r = Dt();
            return t = n !== void 0 ? n(t) : t,
                r.memoizedState = r.baseState = t,
                e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t
                },
                r.queue = e,
                e = e.dispatch = mx.bind(null, me, e),
                [r.memoizedState, e]
        },
        useRef: function (e) {
            var t = Dt();
            return e = {
                current: e
            },
                t.memoizedState = e
        },
        useState: df,
        useDebugValue: Oc,
        useDeferredValue: function (e) {
            return Dt().memoizedState = e
        },
        useTransition: function () {
            var e = df(!1)
                , t = e[0];
            return e = hx.bind(null, e[1]),
                Dt().memoizedState = e,
                [t, e]
        },
        useMutableSource: function () { },
        useSyncExternalStore: function (e, t, n) {
            var r = me
                , o = Dt();
            if (fe) {
                if (n === void 0)
                    throw Error(O(407));
                n = n()
            } else {
                if (n = t(),
                    Ne === null)
                    throw Error(O(349));
                wr & 30 || mm(r, t, n)
            }
            o.memoizedState = n;
            var s = {
                value: n,
                getSnapshot: t
            };
            return o.queue = s,
                ff(ym.bind(null, r, s, e), [e]),
                r.flags |= 2048,
                ys(9, gm.bind(null, r, s, n, t), void 0, null),
                n
        },
        useId: function () {
            var e = Dt()
                , t = Ne.identifierPrefix;
            if (fe) {
                var n = Jt
                    , r = Xt;
                n = (r & ~(1 << 32 - Nt(r) - 1)).toString(32) + n,
                    t = ":" + t + "R" + n,
                    n = ms++,
                    0 < n && (t += "H" + n.toString(32)),
                    t += ":"
            } else
                n = px++,
                    t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    }
    , vx = {
        readContext: ht,
        useCallback: km,
        useContext: ht,
        useEffect: jc,
        useImperativeHandle: Cm,
        useInsertionEffect: Sm,
        useLayoutEffect: Em,
        useMemo: Pm,
        useReducer: va,
        useRef: wm,
        useState: function () {
            return va(gs)
        },
        useDebugValue: Oc,
        useDeferredValue: function (e) {
            var t = mt();
            return Nm(t, Ee.memoizedState, e)
        },
        useTransition: function () {
            var e = va(gs)[0]
                , t = mt().memoizedState;
            return [e, t]
        },
        useMutableSource: pm,
        useSyncExternalStore: hm,
        useId: Tm,
        unstable_isNewReconciler: !1
    }
    , xx = {
        readContext: ht,
        useCallback: km,
        useContext: ht,
        useEffect: jc,
        useImperativeHandle: Cm,
        useInsertionEffect: Sm,
        useLayoutEffect: Em,
        useMemo: Pm,
        useReducer: xa,
        useRef: wm,
        useState: function () {
            return xa(gs)
        },
        useDebugValue: Oc,
        useDeferredValue: function (e) {
            var t = mt();
            return Ee === null ? t.memoizedState = e : Nm(t, Ee.memoizedState, e)
        },
        useTransition: function () {
            var e = xa(gs)[0]
                , t = mt().memoizedState;
            return [e, t]
        },
        useMutableSource: pm,
        useSyncExternalStore: hm,
        useId: Tm,
        unstable_isNewReconciler: !1
    };
function St(e, t) {
    if (e && e.defaultProps) {
        t = ge({}, t),
            e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function cu(e, t, n, r) {
    t = e.memoizedState,
        n = n(r, t),
        n = n == null ? t : ge({}, t, n),
        e.memoizedState = n,
        e.lanes === 0 && (e.updateQueue.baseState = n)
}
var xl = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? Pr(e) === e : !1
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Be()
            , o = zn(e)
            , s = Zt(r, o);
        s.payload = t,
            n != null && (s.callback = n),
            t = Mn(e, s, o),
            t !== null && (Tt(t, e, o, r),
                wi(t, e, o))
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Be()
            , o = zn(e)
            , s = Zt(r, o);
        s.tag = 1,
            s.payload = t,
            n != null && (s.callback = n),
            t = Mn(e, s, o),
            t !== null && (Tt(t, e, o, r),
                wi(t, e, o))
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Be()
            , r = zn(e)
            , o = Zt(n, r);
        o.tag = 2,
            t != null && (o.callback = t),
            t = Mn(e, o, r),
            t !== null && (Tt(t, e, r, n),
                wi(t, e, r))
    }
};
function pf(e, t, n, r, o, s, i) {
    return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, s, i) : t.prototype && t.prototype.isPureReactComponent ? !us(n, r) || !us(o, s) : !0
}
function Am(e, t, n) {
    var r = !1
        , o = Vn
        , s = t.contextType;
    return typeof s == "object" && s !== null ? s = ht(s) : (o = qe(t) ? vr : Fe.current,
        r = t.contextTypes,
        s = (r = r != null) ? fo(e, o) : Vn),
        t = new t(n, s),
        e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
        t.updater = xl,
        e.stateNode = t,
        t._reactInternals = e,
        r && (e = e.stateNode,
            e.__reactInternalMemoizedUnmaskedChildContext = o,
            e.__reactInternalMemoizedMaskedChildContext = s),
        t
}
function hf(e, t, n, r) {
    e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && xl.enqueueReplaceState(t, t.state, null)
}
function du(e, t, n, r) {
    var o = e.stateNode;
    o.props = n,
        o.state = e.memoizedState,
        o.refs = {},
        bc(e);
    var s = t.contextType;
    typeof s == "object" && s !== null ? o.context = ht(s) : (s = qe(t) ? vr : Fe.current,
        o.context = fo(e, s)),
        o.state = e.memoizedState,
        s = t.getDerivedStateFromProps,
        typeof s == "function" && (cu(e, t, s, n),
            o.state = e.memoizedState),
        typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state,
            typeof o.componentWillMount == "function" && o.componentWillMount(),
            typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(),
            t !== o.state && xl.enqueueReplaceState(o, o.state, null),
            qi(e, n, o, r),
            o.state = e.memoizedState),
        typeof o.componentDidMount == "function" && (e.flags |= 4194308)
}
function go(e, t) {
    try {
        var n = ""
            , r = t;
        do
            n += Kv(r),
                r = r.return;
        while (r);
        var o = n
    } catch (s) {
        o = `
Error generating stack: ` + s.message + `
` + s.stack
    }
    return {
        value: e,
        source: t,
        stack: o,
        digest: null
    }
}
function wa(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function fu(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function () {
            throw n
        })
    }
}
var wx = typeof WeakMap == "function" ? WeakMap : Map;
function _m(e, t, n) {
    n = Zt(-1, n),
        n.tag = 3,
        n.payload = {
            element: null
        };
    var r = t.value;
    return n.callback = function () {
        Zi || (Zi = !0,
            Eu = r),
            fu(e, t)
    }
        ,
        n
}
function Lm(e, t, n) {
    n = Zt(-1, n),
        n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var o = t.value;
        n.payload = function () {
            return r(o)
        }
            ,
            n.callback = function () {
                fu(e, t)
            }
    }
    var s = e.stateNode;
    return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function () {
        fu(e, t),
            typeof r != "function" && (Fn === null ? Fn = new Set([this]) : Fn.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: i !== null ? i : ""
        })
    }
    ),
        n
}
function mf(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new wx;
        var o = new Set;
        r.set(t, o)
    } else
        o = r.get(t),
            o === void 0 && (o = new Set,
                r.set(t, o));
    o.has(n) || (o.add(n),
        e = Lx.bind(null, e, t, n),
        t.then(e, e))
}
function gf(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
            t = t !== null ? t.dehydrated !== null : !0),
            t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function yf(e, t, n, r, o) {
    return e.mode & 1 ? (e.flags |= 65536,
        e.lanes = o,
        e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
            n.flags |= 131072,
            n.flags &= -52805,
            n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Zt(-1, 1),
                t.tag = 2,
                Mn(n, t, 1))),
            n.lanes |= 1),
            e)
}
var Sx = ln.ReactCurrentOwner
    , Qe = !1;
function ze(e, t, n, r) {
    t.child = e === null ? um(t, null, n, r) : ho(t, e.child, n, r)
}
function vf(e, t, n, r, o) {
    n = n.render;
    var s = t.ref;
    return Jr(t, o),
        r = Tc(e, t, n, r, s, o),
        n = Rc(),
        e !== null && !Qe ? (t.updateQueue = e.updateQueue,
            t.flags &= -2053,
            e.lanes &= ~o,
            rn(e, t, o)) : (fe && n && gc(t),
                t.flags |= 1,
                ze(e, t, r, o),
                t.child)
}
function xf(e, t, n, r, o) {
    if (e === null) {
        var s = n.type;
        return typeof s == "function" && !zc(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
            t.type = s,
            Dm(e, t, s, r, o)) : (e = Pi(n.type, null, r, t, t.mode, o),
                e.ref = t.ref,
                e.return = t,
                t.child = e)
    }
    if (s = e.child,
        !(e.lanes & o)) {
        var i = s.memoizedProps;
        if (n = n.compare,
            n = n !== null ? n : us,
            n(i, r) && e.ref === t.ref)
            return rn(e, t, o)
    }
    return t.flags |= 1,
        e = $n(s, r),
        e.ref = t.ref,
        e.return = t,
        t.child = e
}
function Dm(e, t, n, r, o) {
    if (e !== null) {
        var s = e.memoizedProps;
        if (us(s, r) && e.ref === t.ref)
            if (Qe = !1,
                t.pendingProps = r = s,
                (e.lanes & o) !== 0)
                e.flags & 131072 && (Qe = !0);
            else
                return t.lanes = e.lanes,
                    rn(e, t, o)
    }
    return pu(e, t, n, r, o)
}
function Im(e, t, n) {
    var r = t.pendingProps
        , o = r.children
        , s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
                ie(Kr, Ze),
                Ze |= n;
        else {
            if (!(n & 1073741824))
                return e = s !== null ? s.baseLanes | n : n,
                    t.lanes = t.childLanes = 1073741824,
                    t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    },
                    t.updateQueue = null,
                    ie(Kr, Ze),
                    Ze |= e,
                    null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
                r = s !== null ? s.baseLanes : n,
                ie(Kr, Ze),
                Ze |= r
        }
    else
        s !== null ? (r = s.baseLanes | n,
            t.memoizedState = null) : r = n,
            ie(Kr, Ze),
            Ze |= r;
    return ze(e, t, o, n),
        t.child
}
function Mm(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
        t.flags |= 2097152)
}
function pu(e, t, n, r, o) {
    var s = qe(n) ? vr : Fe.current;
    return s = fo(t, s),
        Jr(t, o),
        n = Tc(e, t, n, r, s, o),
        r = Rc(),
        e !== null && !Qe ? (t.updateQueue = e.updateQueue,
            t.flags &= -2053,
            e.lanes &= ~o,
            rn(e, t, o)) : (fe && r && gc(t),
                t.flags |= 1,
                ze(e, t, n, o),
                t.child)
}
function wf(e, t, n, r, o) {
    if (qe(n)) {
        var s = !0;
        Vi(t)
    } else
        s = !1;
    if (Jr(t, o),
        t.stateNode === null)
        bi(e, t),
            Am(t, n, r),
            du(t, n, r, o),
            r = !0;
    else if (e === null) {
        var i = t.stateNode
            , l = t.memoizedProps;
        i.props = l;
        var a = i.context
            , u = n.contextType;
        typeof u == "object" && u !== null ? u = ht(u) : (u = qe(n) ? vr : Fe.current,
            u = fo(t, u));
        var c = n.getDerivedStateFromProps
            , d = typeof c == "function" || typeof i.getSnapshotBeforeUpdate == "function";
        d || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (l !== r || a !== u) && hf(t, i, r, u),
            Sn = !1;
        var h = t.memoizedState;
        i.state = h,
            qi(t, r, i, o),
            a = t.memoizedState,
            l !== r || h !== a || Ke.current || Sn ? (typeof c == "function" && (cu(t, n, c, r),
                a = t.memoizedState),
                (l = Sn || pf(t, n, l, r, h, a, u)) ? (d || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(),
                    typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
                    typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
                        t.memoizedProps = r,
                        t.memoizedState = a),
                i.props = r,
                i.state = a,
                i.context = u,
                r = l) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
                    r = !1)
    } else {
        i = t.stateNode,
            dm(e, t),
            l = t.memoizedProps,
            u = t.type === t.elementType ? l : St(t.type, l),
            i.props = u,
            d = t.pendingProps,
            h = i.context,
            a = n.contextType,
            typeof a == "object" && a !== null ? a = ht(a) : (a = qe(n) ? vr : Fe.current,
                a = fo(t, a));
        var p = n.getDerivedStateFromProps;
        (c = typeof p == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (l !== d || h !== a) && hf(t, i, r, a),
            Sn = !1,
            h = t.memoizedState,
            i.state = h,
            qi(t, r, i, o);
        var m = t.memoizedState;
        l !== d || h !== m || Ke.current || Sn ? (typeof p == "function" && (cu(t, n, p, r),
            m = t.memoizedState),
            (u = Sn || pf(t, n, u, r, h, m, a) || !1) ? (c || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, m, a),
                typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, m, a)),
                typeof i.componentDidUpdate == "function" && (t.flags |= 4),
                typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024),
                    t.memoizedProps = r,
                    t.memoizedState = m),
            i.props = r,
            i.state = m,
            i.context = a,
            r = u) : (typeof i.componentDidUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 4),
                typeof i.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024),
                r = !1)
    }
    return hu(e, t, n, r, s, o)
}
function hu(e, t, n, r, o, s) {
    Mm(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i)
        return o && of(t, n, !1),
            rn(e, t, s);
    r = t.stateNode,
        Sx.current = t;
    var l = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
        e !== null && i ? (t.child = ho(t, e.child, null, s),
            t.child = ho(t, null, l, s)) : ze(e, t, l, s),
        t.memoizedState = r.state,
        o && of(t, n, !0),
        t.child
}
function Fm(e) {
    var t = e.stateNode;
    t.pendingContext ? rf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && rf(e, t.context, !1),
        Cc(e, t.containerInfo)
}
function Sf(e, t, n, r, o) {
    return po(),
        vc(o),
        t.flags |= 256,
        ze(e, t, n, r),
        t.child
}
var mu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function gu(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function zm(e, t, n) {
    var r = t.pendingProps, o = he.current, s = !1, i = (t.flags & 128) !== 0, l;
    if ((l = i) || (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
        l ? (s = !0,
            t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1),
        ie(he, o & 1),
        e === null)
        return au(t),
            e = t.memoizedState,
            e !== null && (e = e.dehydrated,
                e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
                    null) : (i = r.children,
                        e = r.fallback,
                        s ? (r = t.mode,
                            s = t.child,
                            i = {
                                mode: "hidden",
                                children: i
                            },
                            !(r & 1) && s !== null ? (s.childLanes = 0,
                                s.pendingProps = i) : s = El(i, r, 0, null),
                            e = gr(e, r, n, null),
                            s.return = t,
                            e.return = t,
                            s.sibling = e,
                            t.child = s,
                            t.child.memoizedState = gu(n),
                            t.memoizedState = mu,
                            e) : Ac(t, i));
    if (o = e.memoizedState,
        o !== null && (l = o.dehydrated,
            l !== null))
        return Ex(e, t, i, r, l, o, n);
    if (s) {
        s = r.fallback,
            i = t.mode,
            o = e.child,
            l = o.sibling;
        var a = {
            mode: "hidden",
            children: r.children
        };
        return !(i & 1) && t.child !== o ? (r = t.child,
            r.childLanes = 0,
            r.pendingProps = a,
            t.deletions = null) : (r = $n(o, a),
                r.subtreeFlags = o.subtreeFlags & 14680064),
            l !== null ? s = $n(l, s) : (s = gr(s, i, n, null),
                s.flags |= 2),
            s.return = t,
            r.return = t,
            r.sibling = s,
            t.child = r,
            r = s,
            s = t.child,
            i = e.child.memoizedState,
            i = i === null ? gu(n) : {
                baseLanes: i.baseLanes | n,
                cachePool: null,
                transitions: i.transitions
            },
            s.memoizedState = i,
            s.childLanes = e.childLanes & ~n,
            t.memoizedState = mu,
            r
    }
    return s = e.child,
        e = s.sibling,
        r = $n(s, {
            mode: "visible",
            children: r.children
        }),
        !(t.mode & 1) && (r.lanes = n),
        r.return = t,
        r.sibling = null,
        e !== null && (n = t.deletions,
            n === null ? (t.deletions = [e],
                t.flags |= 16) : n.push(e)),
        t.child = r,
        t.memoizedState = null,
        r
}
function Ac(e, t) {
    return t = El({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
        t.return = e,
        e.child = t
}
function si(e, t, n, r) {
    return r !== null && vc(r),
        ho(t, e.child, null, n),
        e = Ac(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
}
function Ex(e, t, n, r, o, s, i) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
            r = wa(Error(O(422))),
            si(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child,
                t.flags |= 128,
                null) : (s = r.fallback,
                    o = t.mode,
                    r = El({
                        mode: "visible",
                        children: r.children
                    }, o, 0, null),
                    s = gr(s, o, i, null),
                    s.flags |= 2,
                    r.return = t,
                    s.return = t,
                    r.sibling = s,
                    t.child = r,
                    t.mode & 1 && ho(t, e.child, null, i),
                    t.child.memoizedState = gu(i),
                    t.memoizedState = mu,
                    s);
    if (!(t.mode & 1))
        return si(e, t, i, null);
    if (o.data === "$!") {
        if (r = o.nextSibling && o.nextSibling.dataset,
            r)
            var l = r.dgst;
        return r = l,
            s = Error(O(419)),
            r = wa(s, r, void 0),
            si(e, t, i, r)
    }
    if (l = (i & e.childLanes) !== 0,
        Qe || l) {
        if (r = Ne,
            r !== null) {
            switch (i & -i) {
                case 4:
                    o = 2;
                    break;
                case 16:
                    o = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    o = 32;
                    break;
                case 536870912:
                    o = 268435456;
                    break;
                default:
                    o = 0
            }
            o = o & (r.suspendedLanes | i) ? 0 : o,
                o !== 0 && o !== s.retryLane && (s.retryLane = o,
                    nn(e, o),
                    Tt(r, e, o, -1))
        }
        return Fc(),
            r = wa(Error(O(421))),
            si(e, t, i, r)
    }
    return o.data === "$?" ? (t.flags |= 128,
        t.child = e.child,
        t = Dx.bind(null, e),
        o._reactRetry = t,
        null) : (e = s.treeContext,
            tt = In(o.nextSibling),
            nt = t,
            fe = !0,
            Pt = null,
            e !== null && (ct[dt++] = Xt,
                ct[dt++] = Jt,
                ct[dt++] = xr,
                Xt = e.id,
                Jt = e.overflow,
                xr = t),
            t = Ac(t, r.children),
            t.flags |= 4096,
            t)
}
function Ef(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
        uu(e.return, t, n)
}
function Sa(e, t, n, r, o) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o
    } : (s.isBackwards = t,
        s.rendering = null,
        s.renderingStartTime = 0,
        s.last = r,
        s.tail = n,
        s.tailMode = o)
}
function $m(e, t, n) {
    var r = t.pendingProps
        , o = r.revealOrder
        , s = r.tail;
    if (ze(e, t, r.children, n),
        r = he.current,
        r & 2)
        r = r & 1 | 2,
            t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null;) {
                if (e.tag === 13)
                    e.memoizedState !== null && Ef(e, n, t);
                else if (e.tag === 19)
                    Ef(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                        e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                    e = e.sibling
            }
        r &= 1
    }
    if (ie(he, r),
        !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (o) {
            case "forwards":
                for (n = t.child,
                    o = null; n !== null;)
                    e = n.alternate,
                        e !== null && Yi(e) === null && (o = n),
                        n = n.sibling;
                n = o,
                    n === null ? (o = t.child,
                        t.child = null) : (o = n.sibling,
                            n.sibling = null),
                    Sa(t, !1, o, n, s);
                break;
            case "backwards":
                for (n = null,
                    o = t.child,
                    t.child = null; o !== null;) {
                    if (e = o.alternate,
                        e !== null && Yi(e) === null) {
                        t.child = o;
                        break
                    }
                    e = o.sibling,
                        o.sibling = n,
                        n = o,
                        o = e
                }
                Sa(t, !0, n, null, s);
                break;
            case "together":
                Sa(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null
        }
    return t.child
}
function bi(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
        t.alternate = null,
        t.flags |= 2)
}
function rn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
        Sr |= t.lanes,
        !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(O(153));
    if (t.child !== null) {
        for (e = t.child,
            n = $n(e, e.pendingProps),
            t.child = n,
            n.return = t; e.sibling !== null;)
            e = e.sibling,
                n = n.sibling = $n(e, e.pendingProps),
                n.return = t;
        n.sibling = null
    }
    return t.child
}
function bx(e, t, n) {
    switch (t.tag) {
        case 3:
            Fm(t),
                po();
            break;
        case 5:
            fm(t);
            break;
        case 1:
            qe(t.type) && Vi(t);
            break;
        case 4:
            Cc(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context
                , o = t.memoizedProps.value;
            ie(Qi, r._currentValue),
                r._currentValue = o;
            break;
        case 13:
            if (r = t.memoizedState,
                r !== null)
                return r.dehydrated !== null ? (ie(he, he.current & 1),
                    t.flags |= 128,
                    null) : n & t.child.childLanes ? zm(e, t, n) : (ie(he, he.current & 1),
                        e = rn(e, t, n),
                        e !== null ? e.sibling : null);
            ie(he, he.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0,
                e.flags & 128) {
                if (r)
                    return $m(e, t, n);
                t.flags |= 128
            }
            if (o = t.memoizedState,
                o !== null && (o.rendering = null,
                    o.tail = null,
                    o.lastEffect = null),
                ie(he, he.current),
                r)
                break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0,
                Im(e, t, n)
    }
    return rn(e, t, n)
}
var Bm, yu, Um, Vm;
Bm = function (e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
                n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
            n = n.sibling
    }
}
    ;
yu = function () { }
    ;
Um = function (e, t, n, r) {
    var o = e.memoizedProps;
    if (o !== r) {
        e = t.stateNode,
            lr(Ut.current);
        var s = null;
        switch (n) {
            case "input":
                o = za(e, o),
                    r = za(e, r),
                    s = [];
                break;
            case "select":
                o = ge({}, o, {
                    value: void 0
                }),
                    r = ge({}, r, {
                        value: void 0
                    }),
                    s = [];
                break;
            case "textarea":
                o = Ua(e, o),
                    r = Ua(e, r),
                    s = [];
                break;
            default:
                typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Bi)
        }
        Ha(n, r);
        var i;
        n = null;
        for (u in o)
            if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
                if (u === "style") {
                    var l = o[u];
                    for (i in l)
                        l.hasOwnProperty(i) && (n || (n = {}),
                            n[i] = "")
                } else
                    u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (ns.hasOwnProperty(u) ? s || (s = []) : (s = s || []).push(u, null));
        for (u in r) {
            var a = r[u];
            if (l = o != null ? o[u] : void 0,
                r.hasOwnProperty(u) && a !== l && (a != null || l != null))
                if (u === "style")
                    if (l) {
                        for (i in l)
                            !l.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (n || (n = {}),
                                n[i] = "");
                        for (i in a)
                            a.hasOwnProperty(i) && l[i] !== a[i] && (n || (n = {}),
                                n[i] = a[i])
                    } else
                        n || (s || (s = []),
                            s.push(u, n)),
                            n = a;
                else
                    u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0,
                        l = l ? l.__html : void 0,
                        a != null && l !== a && (s = s || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (s = s || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (ns.hasOwnProperty(u) ? (a != null && u === "onScroll" && ae("scroll", e),
                            s || l === a || (s = [])) : (s = s || []).push(u, a))
        }
        n && (s = s || []).push("style", n);
        var u = s;
        (t.updateQueue = u) && (t.flags |= 4)
    }
}
    ;
Vm = function (e, t, n, r) {
    n !== r && (t.flags |= 4)
}
    ;
function Mo(e, t) {
    if (!fe)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null;)
                    t.alternate !== null && (n = t),
                        t = t.sibling;
                n === null ? e.tail = null : n.sibling = null;
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null;)
                    n.alternate !== null && (r = n),
                        n = n.sibling;
                r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function Le(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
        , n = 0
        , r = 0;
    if (t)
        for (var o = e.child; o !== null;)
            n |= o.lanes | o.childLanes,
                r |= o.subtreeFlags & 14680064,
                r |= o.flags & 14680064,
                o.return = e,
                o = o.sibling;
    else
        for (o = e.child; o !== null;)
            n |= o.lanes | o.childLanes,
                r |= o.subtreeFlags,
                r |= o.flags,
                o.return = e,
                o = o.sibling;
    return e.subtreeFlags |= r,
        e.childLanes = n,
        t
}
function Cx(e, t, n) {
    var r = t.pendingProps;
    switch (yc(t),
    t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Le(t),
                null;
        case 1:
            return qe(t.type) && Ui(),
                Le(t),
                null;
        case 3:
            return r = t.stateNode,
                mo(),
                ue(Ke),
                ue(Fe),
                Pc(),
                r.pendingContext && (r.context = r.pendingContext,
                    r.pendingContext = null),
                (e === null || e.child === null) && (ri(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
                    Pt !== null && (ku(Pt),
                        Pt = null))),
                yu(e, t),
                Le(t),
                null;
        case 5:
            kc(t);
            var o = lr(hs.current);
            if (n = t.type,
                e !== null && t.stateNode != null)
                Um(e, t, n, r, o),
                    e.ref !== t.ref && (t.flags |= 512,
                        t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null)
                        throw Error(O(166));
                    return Le(t),
                        null
                }
                if (e = lr(Ut.current),
                    ri(t)) {
                    r = t.stateNode,
                        n = t.type;
                    var s = t.memoizedProps;
                    switch (r[zt] = t,
                    r[fs] = s,
                    e = (t.mode & 1) !== 0,
                    n) {
                        case "dialog":
                            ae("cancel", r),
                                ae("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            ae("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (o = 0; o < Wo.length; o++)
                                ae(Wo[o], r);
                            break;
                        case "source":
                            ae("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            ae("error", r),
                                ae("load", r);
                            break;
                        case "details":
                            ae("toggle", r);
                            break;
                        case "input":
                            jd(r, s),
                                ae("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!s.multiple
                            },
                                ae("invalid", r);
                            break;
                        case "textarea":
                            Ad(r, s),
                                ae("invalid", r)
                    }
                    Ha(n, s),
                        o = null;
                    for (var i in s)
                        if (s.hasOwnProperty(i)) {
                            var l = s[i];
                            i === "children" ? typeof l == "string" ? r.textContent !== l && (s.suppressHydrationWarning !== !0 && ni(r.textContent, l, e),
                                o = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (s.suppressHydrationWarning !== !0 && ni(r.textContent, l, e),
                                    o = ["children", "" + l]) : ns.hasOwnProperty(i) && l != null && i === "onScroll" && ae("scroll", r)
                        }
                    switch (n) {
                        case "input":
                            qs(r),
                                Od(r, s, !0);
                            break;
                        case "textarea":
                            qs(r),
                                _d(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof s.onClick == "function" && (r.onclick = Bi)
                    }
                    r = o,
                        t.updateQueue = r,
                        r !== null && (t.flags |= 4)
                } else {
                    i = o.nodeType === 9 ? o : o.ownerDocument,
                        e === "http://www.w3.org/1999/xhtml" && (e = yh(n)),
                        e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"),
                            e.innerHTML = "<script><\/script>",
                            e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, {
                                is: r.is
                            }) : (e = i.createElement(n),
                                n === "select" && (i = e,
                                    r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n),
                        e[zt] = t,
                        e[fs] = r,
                        Bm(e, t, !1, !1),
                        t.stateNode = e;
                    e: {
                        switch (i = Wa(n, r),
                        n) {
                            case "dialog":
                                ae("cancel", e),
                                    ae("close", e),
                                    o = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                ae("load", e),
                                    o = r;
                                break;
                            case "video":
                            case "audio":
                                for (o = 0; o < Wo.length; o++)
                                    ae(Wo[o], e);
                                o = r;
                                break;
                            case "source":
                                ae("error", e),
                                    o = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                ae("error", e),
                                    ae("load", e),
                                    o = r;
                                break;
                            case "details":
                                ae("toggle", e),
                                    o = r;
                                break;
                            case "input":
                                jd(e, r),
                                    o = za(e, r),
                                    ae("invalid", e);
                                break;
                            case "option":
                                o = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                },
                                    o = ge({}, r, {
                                        value: void 0
                                    }),
                                    ae("invalid", e);
                                break;
                            case "textarea":
                                Ad(e, r),
                                    o = Ua(e, r),
                                    ae("invalid", e);
                                break;
                            default:
                                o = r
                        }
                        Ha(n, o),
                            l = o;
                        for (s in l)
                            if (l.hasOwnProperty(s)) {
                                var a = l[s];
                                s === "style" ? wh(e, a) : s === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0,
                                    a != null && vh(e, a)) : s === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && rs(e, a) : typeof a == "number" && rs(e, "" + a) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (ns.hasOwnProperty(s) ? a != null && s === "onScroll" && ae("scroll", e) : a != null && nc(e, s, a, i))
                            }
                        switch (n) {
                            case "input":
                                qs(e),
                                    Od(e, r, !1);
                                break;
                            case "textarea":
                                qs(e),
                                    _d(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + Un(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple,
                                    s = r.value,
                                    s != null ? qr(e, !!r.multiple, s, !1) : r.defaultValue != null && qr(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof o.onClick == "function" && (e.onclick = Bi)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512,
                    t.flags |= 2097152)
            }
            return Le(t),
                null;
        case 6:
            if (e && t.stateNode != null)
                Vm(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(O(166));
                if (n = lr(hs.current),
                    lr(Ut.current),
                    ri(t)) {
                    if (r = t.stateNode,
                        n = t.memoizedProps,
                        r[zt] = t,
                        (s = r.nodeValue !== n) && (e = nt,
                            e !== null))
                        switch (e.tag) {
                            case 3:
                                ni(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !== !0 && ni(r.nodeValue, n, (e.mode & 1) !== 0)
                        }
                    s && (t.flags |= 4)
                } else
                    r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                        r[zt] = t,
                        t.stateNode = r
            }
            return Le(t),
                null;
        case 13:
            if (ue(he),
                r = t.memoizedState,
                e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (fe && tt !== null && t.mode & 1 && !(t.flags & 128))
                    lm(),
                        po(),
                        t.flags |= 98560,
                        s = !1;
                else if (s = ri(t),
                    r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!s)
                            throw Error(O(318));
                        if (s = t.memoizedState,
                            s = s !== null ? s.dehydrated : null,
                            !s)
                            throw Error(O(317));
                        s[zt] = t
                    } else
                        po(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            t.flags |= 4;
                    Le(t),
                        s = !1
                } else
                    Pt !== null && (ku(Pt),
                        Pt = null),
                        s = !0;
                if (!s)
                    return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n,
                t) : (r = r !== null,
                    r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
                        t.mode & 1 && (e === null || he.current & 1 ? Ce === 0 && (Ce = 3) : Fc())),
                    t.updateQueue !== null && (t.flags |= 4),
                    Le(t),
                    null);
        case 4:
            return mo(),
                yu(e, t),
                e === null && cs(t.stateNode.containerInfo),
                Le(t),
                null;
        case 10:
            return Sc(t.type._context),
                Le(t),
                null;
        case 17:
            return qe(t.type) && Ui(),
                Le(t),
                null;
        case 19:
            if (ue(he),
                s = t.memoizedState,
                s === null)
                return Le(t),
                    null;
            if (r = (t.flags & 128) !== 0,
                i = s.rendering,
                i === null)
                if (r)
                    Mo(s, !1);
                else {
                    if (Ce !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null;) {
                            if (i = Yi(e),
                                i !== null) {
                                for (t.flags |= 128,
                                    Mo(s, !1),
                                    r = i.updateQueue,
                                    r !== null && (t.updateQueue = r,
                                        t.flags |= 4),
                                    t.subtreeFlags = 0,
                                    r = n,
                                    n = t.child; n !== null;)
                                    s = n,
                                        e = r,
                                        s.flags &= 14680066,
                                        i = s.alternate,
                                        i === null ? (s.childLanes = 0,
                                            s.lanes = e,
                                            s.child = null,
                                            s.subtreeFlags = 0,
                                            s.memoizedProps = null,
                                            s.memoizedState = null,
                                            s.updateQueue = null,
                                            s.dependencies = null,
                                            s.stateNode = null) : (s.childLanes = i.childLanes,
                                                s.lanes = i.lanes,
                                                s.child = i.child,
                                                s.subtreeFlags = 0,
                                                s.deletions = null,
                                                s.memoizedProps = i.memoizedProps,
                                                s.memoizedState = i.memoizedState,
                                                s.updateQueue = i.updateQueue,
                                                s.type = i.type,
                                                e = i.dependencies,
                                                s.dependencies = e === null ? null : {
                                                    lanes: e.lanes,
                                                    firstContext: e.firstContext
                                                }),
                                        n = n.sibling;
                                return ie(he, he.current & 1 | 2),
                                    t.child
                            }
                            e = e.sibling
                        }
                    s.tail !== null && xe() > yo && (t.flags |= 128,
                        r = !0,
                        Mo(s, !1),
                        t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = Yi(i),
                        e !== null) {
                        if (t.flags |= 128,
                            r = !0,
                            n = e.updateQueue,
                            n !== null && (t.updateQueue = n,
                                t.flags |= 4),
                            Mo(s, !0),
                            s.tail === null && s.tailMode === "hidden" && !i.alternate && !fe)
                            return Le(t),
                                null
                    } else
                        2 * xe() - s.renderingStartTime > yo && n !== 1073741824 && (t.flags |= 128,
                            r = !0,
                            Mo(s, !1),
                            t.lanes = 4194304);
                s.isBackwards ? (i.sibling = t.child,
                    t.child = i) : (n = s.last,
                        n !== null ? n.sibling = i : t.child = i,
                        s.last = i)
            }
            return s.tail !== null ? (t = s.tail,
                s.rendering = t,
                s.tail = t.sibling,
                s.renderingStartTime = xe(),
                t.sibling = null,
                n = he.current,
                ie(he, r ? n & 1 | 2 : n & 1),
                t) : (Le(t),
                    null);
        case 22:
        case 23:
            return Mc(),
                r = t.memoizedState !== null,
                e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
                r && t.mode & 1 ? Ze & 1073741824 && (Le(t),
                    t.subtreeFlags & 6 && (t.flags |= 8192)) : Le(t),
                null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(O(156, t.tag))
}
function kx(e, t) {
    switch (yc(t),
    t.tag) {
        case 1:
            return qe(t.type) && Ui(),
                e = t.flags,
                e & 65536 ? (t.flags = e & -65537 | 128,
                    t) : null;
        case 3:
            return mo(),
                ue(Ke),
                ue(Fe),
                Pc(),
                e = t.flags,
                e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
                    t) : null;
        case 5:
            return kc(t),
                null;
        case 13:
            if (ue(he),
                e = t.memoizedState,
                e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(O(340));
                po()
            }
            return e = t.flags,
                e & 65536 ? (t.flags = e & -65537 | 128,
                    t) : null;
        case 19:
            return ue(he),
                null;
        case 4:
            return mo(),
                null;
        case 10:
            return Sc(t.type._context),
                null;
        case 22:
        case 23:
            return Mc(),
                null;
        case 24:
            return null;
        default:
            return null
    }
}
var ii = !1
    , Ie = !1
    , Px = typeof WeakSet == "function" ? WeakSet : Set
    , F = null;
function Qr(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                ve(e, t, r)
            }
        else
            n.current = null
}
function vu(e, t, n) {
    try {
        n()
    } catch (r) {
        ve(e, t, r)
    }
}
var bf = !1;
function Nx(e, t) {
    if (tu = Fi,
        e = qh(),
        mc(e)) {
        if ("selectionStart" in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var o = r.anchorOffset
                        , s = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                            s.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var i = 0
                        , l = -1
                        , a = -1
                        , u = 0
                        , c = 0
                        , d = e
                        , h = null;
                    t: for (; ;) {
                        for (var p; d !== n || o !== 0 && d.nodeType !== 3 || (l = i + o),
                            d !== s || r !== 0 && d.nodeType !== 3 || (a = i + r),
                            d.nodeType === 3 && (i += d.nodeValue.length),
                            (p = d.firstChild) !== null;)
                            h = d,
                                d = p;
                        for (; ;) {
                            if (d === e)
                                break t;
                            if (h === n && ++u === o && (l = i),
                                h === s && ++c === r && (a = i),
                                (p = d.nextSibling) !== null)
                                break;
                            d = h,
                                h = d.parentNode
                        }
                        d = p
                    }
                    n = l === -1 || a === -1 ? null : {
                        start: l,
                        end: a
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (nu = {
        focusedElem: e,
        selectionRange: n
    },
        Fi = !1,
        F = t; F !== null;)
        if (t = F,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
                F = e;
        else
            for (; F !== null;) {
                t = F;
                try {
                    var m = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (m !== null) {
                                    var g = m.memoizedProps
                                        , w = m.memoizedState
                                        , v = t.stateNode
                                        , y = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : St(t.type, g), w);
                                    v.__reactInternalSnapshotBeforeUpdate = y
                                }
                                break;
                            case 3:
                                var x = t.stateNode.containerInfo;
                                x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(O(163))
                        }
                } catch (E) {
                    ve(t, t.return, E)
                }
                if (e = t.sibling,
                    e !== null) {
                    e.return = t.return,
                        F = e;
                    break
                }
                F = t.return
            }
    return m = bf,
        bf = !1,
        m
}
function Jo(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
        r !== null) {
        var o = r = r.next;
        do {
            if ((o.tag & e) === e) {
                var s = o.destroy;
                o.destroy = void 0,
                    s !== void 0 && vu(t, n, s)
            }
            o = o.next
        } while (o !== r)
    }
}
function wl(e, t) {
    if (t = t.updateQueue,
        t = t !== null ? t.lastEffect : null,
        t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function xu(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function Hm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
        Hm(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
            t !== null && (delete t[zt],
                delete t[fs],
                delete t[su],
                delete t[ux],
                delete t[cx])),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
}
function Wm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Cf(e) {
    e: for (; ;) {
        for (; e.sibling === null;) {
            if (e.return === null || Wm(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
                e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function wu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
            t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
                t.insertBefore(e, n)) : (t = n,
                    t.appendChild(e)),
                n = n._reactRootContainer,
                n != null || t.onclick !== null || (t.onclick = Bi));
    else if (r !== 4 && (e = e.child,
        e !== null))
        for (wu(e, t, n),
            e = e.sibling; e !== null;)
            wu(e, t, n),
                e = e.sibling
}
function Su(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
            t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
        e !== null))
        for (Su(e, t, n),
            e = e.sibling; e !== null;)
            Su(e, t, n),
                e = e.sibling
}
var Te = null
    , kt = !1;
function mn(e, t, n) {
    for (n = n.child; n !== null;)
        Qm(e, t, n),
            n = n.sibling
}
function Qm(e, t, n) {
    if (Bt && typeof Bt.onCommitFiberUnmount == "function")
        try {
            Bt.onCommitFiberUnmount(fl, n)
        } catch { }
    switch (n.tag) {
        case 5:
            Ie || Qr(n, t);
        case 6:
            var r = Te
                , o = kt;
            Te = null,
                mn(e, t, n),
                Te = r,
                kt = o,
                Te !== null && (kt ? (e = Te,
                    n = n.stateNode,
                    e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Te.removeChild(n.stateNode));
            break;
        case 18:
            Te !== null && (kt ? (e = Te,
                n = n.stateNode,
                e.nodeType === 8 ? ha(e.parentNode, n) : e.nodeType === 1 && ha(e, n),
                ls(e)) : ha(Te, n.stateNode));
            break;
        case 4:
            r = Te,
                o = kt,
                Te = n.stateNode.containerInfo,
                kt = !0,
                mn(e, t, n),
                Te = r,
                kt = o;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!Ie && (r = n.updateQueue,
                r !== null && (r = r.lastEffect,
                    r !== null))) {
                o = r = r.next;
                do {
                    var s = o
                        , i = s.destroy;
                    s = s.tag,
                        i !== void 0 && (s & 2 || s & 4) && vu(n, t, i),
                        o = o.next
                } while (o !== r)
            }
            mn(e, t, n);
            break;
        case 1:
            if (!Ie && (Qr(n, t),
                r = n.stateNode,
                typeof r.componentWillUnmount == "function"))
                try {
                    r.props = n.memoizedProps,
                        r.state = n.memoizedState,
                        r.componentWillUnmount()
                } catch (l) {
                    ve(n, t, l)
                }
            mn(e, t, n);
            break;
        case 21:
            mn(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (Ie = (r = Ie) || n.memoizedState !== null,
                mn(e, t, n),
                Ie = r) : mn(e, t, n);
            break;
        default:
            mn(e, t, n)
    }
}
function kf(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Px),
            t.forEach(function (r) {
                var o = Ix.bind(null, e, r);
                n.has(r) || (n.add(r),
                    r.then(o, o))
            })
    }
}
function xt(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var o = n[r];
            try {
                var s = e
                    , i = t
                    , l = i;
                e: for (; l !== null;) {
                    switch (l.tag) {
                        case 5:
                            Te = l.stateNode,
                                kt = !1;
                            break e;
                        case 3:
                            Te = l.stateNode.containerInfo,
                                kt = !0;
                            break e;
                        case 4:
                            Te = l.stateNode.containerInfo,
                                kt = !0;
                            break e
                    }
                    l = l.return
                }
                if (Te === null)
                    throw Error(O(160));
                Qm(s, i, o),
                    Te = null,
                    kt = !1;
                var a = o.alternate;
                a !== null && (a.return = null),
                    o.return = null
            } catch (u) {
                ve(o, t, u)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;)
            Km(t, e),
                t = t.sibling
}
function Km(e, t) {
    var n = e.alternate
        , r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (xt(t, e),
                Lt(e),
                r & 4) {
                try {
                    Jo(3, e, e.return),
                        wl(3, e)
                } catch (g) {
                    ve(e, e.return, g)
                }
                try {
                    Jo(5, e, e.return)
                } catch (g) {
                    ve(e, e.return, g)
                }
            }
            break;
        case 1:
            xt(t, e),
                Lt(e),
                r & 512 && n !== null && Qr(n, n.return);
            break;
        case 5:
            if (xt(t, e),
                Lt(e),
                r & 512 && n !== null && Qr(n, n.return),
                e.flags & 32) {
                var o = e.stateNode;
                try {
                    rs(o, "")
                } catch (g) {
                    ve(e, e.return, g)
                }
            }
            if (r & 4 && (o = e.stateNode,
                o != null)) {
                var s = e.memoizedProps
                    , i = n !== null ? n.memoizedProps : s
                    , l = e.type
                    , a = e.updateQueue;
                if (e.updateQueue = null,
                    a !== null)
                    try {
                        l === "input" && s.type === "radio" && s.name != null && mh(o, s),
                            Wa(l, i);
                        var u = Wa(l, s);
                        for (i = 0; i < a.length; i += 2) {
                            var c = a[i]
                                , d = a[i + 1];
                            c === "style" ? wh(o, d) : c === "dangerouslySetInnerHTML" ? vh(o, d) : c === "children" ? rs(o, d) : nc(o, c, d, u)
                        }
                        switch (l) {
                            case "input":
                                $a(o, s);
                                break;
                            case "textarea":
                                gh(o, s);
                                break;
                            case "select":
                                var h = o._wrapperState.wasMultiple;
                                o._wrapperState.wasMultiple = !!s.multiple;
                                var p = s.value;
                                p != null ? qr(o, !!s.multiple, p, !1) : h !== !!s.multiple && (s.defaultValue != null ? qr(o, !!s.multiple, s.defaultValue, !0) : qr(o, !!s.multiple, s.multiple ? [] : "", !1))
                        }
                        o[fs] = s
                    } catch (g) {
                        ve(e, e.return, g)
                    }
            }
            break;
        case 6:
            if (xt(t, e),
                Lt(e),
                r & 4) {
                if (e.stateNode === null)
                    throw Error(O(162));
                o = e.stateNode,
                    s = e.memoizedProps;
                try {
                    o.nodeValue = s
                } catch (g) {
                    ve(e, e.return, g)
                }
            }
            break;
        case 3:
            if (xt(t, e),
                Lt(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
                try {
                    ls(t.containerInfo)
                } catch (g) {
                    ve(e, e.return, g)
                }
            break;
        case 4:
            xt(t, e),
                Lt(e);
            break;
        case 13:
            xt(t, e),
                Lt(e),
                o = e.child,
                o.flags & 8192 && (s = o.memoizedState !== null,
                    o.stateNode.isHidden = s,
                    !s || o.alternate !== null && o.alternate.memoizedState !== null || (Dc = xe())),
                r & 4 && kf(e);
            break;
        case 22:
            if (c = n !== null && n.memoizedState !== null,
                e.mode & 1 ? (Ie = (u = Ie) || c,
                    xt(t, e),
                    Ie = u) : xt(t, e),
                Lt(e),
                r & 8192) {
                if (u = e.memoizedState !== null,
                    (e.stateNode.isHidden = u) && !c && e.mode & 1)
                    for (F = e,
                        c = e.child; c !== null;) {
                        for (d = F = c; F !== null;) {
                            switch (h = F,
                            p = h.child,
                            h.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Jo(4, h, h.return);
                                    break;
                                case 1:
                                    Qr(h, h.return);
                                    var m = h.stateNode;
                                    if (typeof m.componentWillUnmount == "function") {
                                        r = h,
                                            n = h.return;
                                        try {
                                            t = r,
                                                m.props = t.memoizedProps,
                                                m.state = t.memoizedState,
                                                m.componentWillUnmount()
                                        } catch (g) {
                                            ve(r, n, g)
                                        }
                                    }
                                    break;
                                case 5:
                                    Qr(h, h.return);
                                    break;
                                case 22:
                                    if (h.memoizedState !== null) {
                                        Nf(d);
                                        continue
                                    }
                            }
                            p !== null ? (p.return = h,
                                F = p) : Nf(d)
                        }
                        c = c.sibling
                    }
                e: for (c = null,
                    d = e; ;) {
                    if (d.tag === 5) {
                        if (c === null) {
                            c = d;
                            try {
                                o = d.stateNode,
                                    u ? (s = o.style,
                                        typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (l = d.stateNode,
                                            a = d.memoizedProps.style,
                                            i = a != null && a.hasOwnProperty("display") ? a.display : null,
                                            l.style.display = xh("display", i))
                            } catch (g) {
                                ve(e, e.return, g)
                            }
                        }
                    } else if (d.tag === 6) {
                        if (c === null)
                            try {
                                d.stateNode.nodeValue = u ? "" : d.memoizedProps
                            } catch (g) {
                                ve(e, e.return, g)
                            }
                    } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
                        d.child.return = d,
                            d = d.child;
                        continue
                    }
                    if (d === e)
                        break e;
                    for (; d.sibling === null;) {
                        if (d.return === null || d.return === e)
                            break e;
                        c === d && (c = null),
                            d = d.return
                    }
                    c === d && (c = null),
                        d.sibling.return = d.return,
                        d = d.sibling
                }
            }
            break;
        case 19:
            xt(t, e),
                Lt(e),
                r & 4 && kf(e);
            break;
        case 21:
            break;
        default:
            xt(t, e),
                Lt(e)
    }
}
function Lt(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (Wm(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(O(160))
            }
            switch (r.tag) {
                case 5:
                    var o = r.stateNode;
                    r.flags & 32 && (rs(o, ""),
                        r.flags &= -33);
                    var s = Cf(e);
                    Su(e, s, o);
                    break;
                case 3:
                case 4:
                    var i = r.stateNode.containerInfo
                        , l = Cf(e);
                    wu(e, l, i);
                    break;
                default:
                    throw Error(O(161))
            }
        } catch (a) {
            ve(e, e.return, a)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function Tx(e, t, n) {
    F = e,
        qm(e)
}
function qm(e, t, n) {
    for (var r = (e.mode & 1) !== 0; F !== null;) {
        var o = F
            , s = o.child;
        if (o.tag === 22 && r) {
            var i = o.memoizedState !== null || ii;
            if (!i) {
                var l = o.alternate
                    , a = l !== null && l.memoizedState !== null || Ie;
                l = ii;
                var u = Ie;
                if (ii = i,
                    (Ie = a) && !u)
                    for (F = o; F !== null;)
                        i = F,
                            a = i.child,
                            i.tag === 22 && i.memoizedState !== null ? Tf(o) : a !== null ? (a.return = i,
                                F = a) : Tf(o);
                for (; s !== null;)
                    F = s,
                        qm(s),
                        s = s.sibling;
                F = o,
                    ii = l,
                    Ie = u
            }
            Pf(e)
        } else
            o.subtreeFlags & 8772 && s !== null ? (s.return = o,
                F = s) : Pf(e)
    }
}
function Pf(e) {
    for (; F !== null;) {
        var t = F;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            Ie || wl(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !Ie)
                                if (n === null)
                                    r.componentDidMount();
                                else {
                                    var o = t.elementType === t.type ? n.memoizedProps : St(t.type, n.memoizedProps);
                                    r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                                }
                            var s = t.updateQueue;
                            s !== null && cf(t, s, r);
                            break;
                        case 3:
                            var i = t.updateQueue;
                            if (i !== null) {
                                if (n = null,
                                    t.child !== null)
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode
                                    }
                                cf(t, i, n)
                            }
                            break;
                        case 5:
                            var l = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = l;
                                var a = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        a.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        a.src && (n.src = a.src)
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var u = t.alternate;
                                if (u !== null) {
                                    var c = u.memoizedState;
                                    if (c !== null) {
                                        var d = c.dehydrated;
                                        d !== null && ls(d)
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(O(163))
                    }
                Ie || t.flags & 512 && xu(t)
            } catch (h) {
                ve(t, t.return, h)
            }
        }
        if (t === e) {
            F = null;
            break
        }
        if (n = t.sibling,
            n !== null) {
            n.return = t.return,
                F = n;
            break
        }
        F = t.return
    }
}
function Nf(e) {
    for (; F !== null;) {
        var t = F;
        if (t === e) {
            F = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
                F = n;
            break
        }
        F = t.return
    }
}
function Tf(e) {
    for (; F !== null;) {
        var t = F;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        wl(4, t)
                    } catch (a) {
                        ve(t, n, a)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var o = t.return;
                        try {
                            r.componentDidMount()
                        } catch (a) {
                            ve(t, o, a)
                        }
                    }
                    var s = t.return;
                    try {
                        xu(t)
                    } catch (a) {
                        ve(t, s, a)
                    }
                    break;
                case 5:
                    var i = t.return;
                    try {
                        xu(t)
                    } catch (a) {
                        ve(t, i, a)
                    }
            }
        } catch (a) {
            ve(t, t.return, a)
        }
        if (t === e) {
            F = null;
            break
        }
        var l = t.sibling;
        if (l !== null) {
            l.return = t.return,
                F = l;
            break
        }
        F = t.return
    }
}
var Rx = Math.ceil
    , Ji = ln.ReactCurrentDispatcher
    , _c = ln.ReactCurrentOwner
    , pt = ln.ReactCurrentBatchConfig
    , te = 0
    , Ne = null
    , we = null
    , Re = 0
    , Ze = 0
    , Kr = Yn(0)
    , Ce = 0
    , vs = null
    , Sr = 0
    , Sl = 0
    , Lc = 0
    , Zo = null
    , We = null
    , Dc = 0
    , yo = 1 / 0
    , qt = null
    , Zi = !1
    , Eu = null
    , Fn = null
    , li = !1
    , On = null
    , el = 0
    , es = 0
    , bu = null
    , Ci = -1
    , ki = 0;
function Be() {
    return te & 6 ? xe() : Ci !== -1 ? Ci : Ci = xe()
}
function zn(e) {
    return e.mode & 1 ? te & 2 && Re !== 0 ? Re & -Re : fx.transition !== null ? (ki === 0 && (ki = Ah()),
        ki) : (e = oe,
            e !== 0 || (e = window.event,
                e = e === void 0 ? 16 : zh(e.type)),
            e) : 1
}
function Tt(e, t, n, r) {
    if (50 < es)
        throw es = 0,
        bu = null,
        Error(O(185));
    Ts(e, n, r),
        (!(te & 2) || e !== Ne) && (e === Ne && (!(te & 2) && (Sl |= n),
            Ce === 4 && bn(e, Re)),
            Ye(e, r),
            n === 1 && te === 0 && !(t.mode & 1) && (yo = xe() + 500,
                yl && Gn()))
}
function Ye(e, t) {
    var n = e.callbackNode;
    f0(e, t);
    var r = Mi(e, e === Ne ? Re : 0);
    if (r === 0)
        n !== null && Id(n),
            e.callbackNode = null,
            e.callbackPriority = 0;
    else if (t = r & -r,
        e.callbackPriority !== t) {
        if (n != null && Id(n),
            t === 1)
            e.tag === 0 ? dx(Rf.bind(null, e)) : om(Rf.bind(null, e)),
                lx(function () {
                    !(te & 6) && Gn()
                }),
                n = null;
        else {
            switch (_h(r)) {
                case 1:
                    n = lc;
                    break;
                case 4:
                    n = jh;
                    break;
                case 16:
                    n = Ii;
                    break;
                case 536870912:
                    n = Oh;
                    break;
                default:
                    n = Ii
            }
            n = ng(n, Ym.bind(null, e))
        }
        e.callbackPriority = t,
            e.callbackNode = n
    }
}
function Ym(e, t) {
    if (Ci = -1,
        ki = 0,
        te & 6)
        throw Error(O(327));
    var n = e.callbackNode;
    if (Zr() && e.callbackNode !== n)
        return null;
    var r = Mi(e, e === Ne ? Re : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = tl(e, r);
    else {
        t = r;
        var o = te;
        te |= 2;
        var s = Xm();
        (Ne !== e || Re !== t) && (qt = null,
            yo = xe() + 500,
            mr(e, t));
        do
            try {
                Ax();
                break
            } catch (l) {
                Gm(e, l)
            }
        while (!0);
        wc(),
            Ji.current = s,
            te = o,
            we !== null ? t = 0 : (Ne = null,
                Re = 0,
                t = Ce)
    }
    if (t !== 0) {
        if (t === 2 && (o = Ga(e),
            o !== 0 && (r = o,
                t = Cu(e, o))),
            t === 1)
            throw n = vs,
            mr(e, 0),
            bn(e, r),
            Ye(e, xe()),
            n;
        if (t === 6)
            bn(e, r);
        else {
            if (o = e.current.alternate,
                !(r & 30) && !jx(o) && (t = tl(e, r),
                    t === 2 && (s = Ga(e),
                        s !== 0 && (r = s,
                            t = Cu(e, s))),
                    t === 1))
                throw n = vs,
                mr(e, 0),
                bn(e, r),
                Ye(e, xe()),
                n;
            switch (e.finishedWork = o,
            e.finishedLanes = r,
            t) {
                case 0:
                case 1:
                    throw Error(O(345));
                case 2:
                    or(e, We, qt);
                    break;
                case 3:
                    if (bn(e, r),
                        (r & 130023424) === r && (t = Dc + 500 - xe(),
                            10 < t)) {
                        if (Mi(e, 0) !== 0)
                            break;
                        if (o = e.suspendedLanes,
                            (o & r) !== r) {
                            Be(),
                                e.pingedLanes |= e.suspendedLanes & o;
                            break
                        }
                        e.timeoutHandle = ou(or.bind(null, e, We, qt), t);
                        break
                    }
                    or(e, We, qt);
                    break;
                case 4:
                    if (bn(e, r),
                        (r & 4194240) === r)
                        break;
                    for (t = e.eventTimes,
                        o = -1; 0 < r;) {
                        var i = 31 - Nt(r);
                        s = 1 << i,
                            i = t[i],
                            i > o && (o = i),
                            r &= ~s
                    }
                    if (r = o,
                        r = xe() - r,
                        r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Rx(r / 1960)) - r,
                        10 < r) {
                        e.timeoutHandle = ou(or.bind(null, e, We, qt), r);
                        break
                    }
                    or(e, We, qt);
                    break;
                case 5:
                    or(e, We, qt);
                    break;
                default:
                    throw Error(O(329))
            }
        }
    }
    return Ye(e, xe()),
        e.callbackNode === n ? Ym.bind(null, e) : null
}
function Cu(e, t) {
    var n = Zo;
    return e.current.memoizedState.isDehydrated && (mr(e, t).flags |= 256),
        e = tl(e, t),
        e !== 2 && (t = We,
            We = n,
            t !== null && ku(t)),
        e
}
function ku(e) {
    We === null ? We = e : We.push.apply(We, e)
}
function jx(e) {
    for (var t = e; ;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
                n !== null))
                for (var r = 0; r < n.length; r++) {
                    var o = n[r]
                        , s = o.getSnapshot;
                    o = o.value;
                    try {
                        if (!Rt(s(), o))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
            t.subtreeFlags & 16384 && n !== null)
            n.return = t,
                t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
                t = t.sibling
        }
    }
    return !0
}
function bn(e, t) {
    for (t &= ~Lc,
        t &= ~Sl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes; 0 < t;) {
        var n = 31 - Nt(t)
            , r = 1 << n;
        e[n] = -1,
            t &= ~r
    }
}
function Rf(e) {
    if (te & 6)
        throw Error(O(327));
    Zr();
    var t = Mi(e, 0);
    if (!(t & 1))
        return Ye(e, xe()),
            null;
    var n = tl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Ga(e);
        r !== 0 && (t = r,
            n = Cu(e, r))
    }
    if (n === 1)
        throw n = vs,
        mr(e, 0),
        bn(e, t),
        Ye(e, xe()),
        n;
    if (n === 6)
        throw Error(O(345));
    return e.finishedWork = e.current.alternate,
        e.finishedLanes = t,
        or(e, We, qt),
        Ye(e, xe()),
        null
}
function Ic(e, t) {
    var n = te;
    te |= 1;
    try {
        return e(t)
    } finally {
        te = n,
            te === 0 && (yo = xe() + 500,
                yl && Gn())
    }
}
function Er(e) {
    On !== null && On.tag === 0 && !(te & 6) && Zr();
    var t = te;
    te |= 1;
    var n = pt.transition
        , r = oe;
    try {
        if (pt.transition = null,
            oe = 1,
            e)
            return e()
    } finally {
        oe = r,
            pt.transition = n,
            te = t,
            !(te & 6) && Gn()
    }
}
function Mc() {
    Ze = Kr.current,
        ue(Kr)
}
function mr(e, t) {
    e.finishedWork = null,
        e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
        ix(n)),
        we !== null)
        for (n = we.return; n !== null;) {
            var r = n;
            switch (yc(r),
            r.tag) {
                case 1:
                    r = r.type.childContextTypes,
                        r != null && Ui();
                    break;
                case 3:
                    mo(),
                        ue(Ke),
                        ue(Fe),
                        Pc();
                    break;
                case 5:
                    kc(r);
                    break;
                case 4:
                    mo();
                    break;
                case 13:
                    ue(he);
                    break;
                case 19:
                    ue(he);
                    break;
                case 10:
                    Sc(r.type._context);
                    break;
                case 22:
                case 23:
                    Mc()
            }
            n = n.return
        }
    if (Ne = e,
        we = e = $n(e.current, null),
        Re = Ze = t,
        Ce = 0,
        vs = null,
        Lc = Sl = Sr = 0,
        We = Zo = null,
        ir !== null) {
        for (t = 0; t < ir.length; t++)
            if (n = ir[t],
                r = n.interleaved,
                r !== null) {
                n.interleaved = null;
                var o = r.next
                    , s = n.pending;
                if (s !== null) {
                    var i = s.next;
                    s.next = o,
                        r.next = i
                }
                n.pending = r
            }
        ir = null
    }
    return e
}
function Gm(e, t) {
    do {
        var n = we;
        try {
            if (wc(),
                Si.current = Xi,
                Gi) {
                for (var r = me.memoizedState; r !== null;) {
                    var o = r.queue;
                    o !== null && (o.pending = null),
                        r = r.next
                }
                Gi = !1
            }
            if (wr = 0,
                Pe = Ee = me = null,
                Xo = !1,
                ms = 0,
                _c.current = null,
                n === null || n.return === null) {
                Ce = 1,
                    vs = t,
                    we = null;
                break
            }
            e: {
                var s = e
                    , i = n.return
                    , l = n
                    , a = t;
                if (t = Re,
                    l.flags |= 32768,
                    a !== null && typeof a == "object" && typeof a.then == "function") {
                    var u = a
                        , c = l
                        , d = c.tag;
                    if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
                        var h = c.alternate;
                        h ? (c.updateQueue = h.updateQueue,
                            c.memoizedState = h.memoizedState,
                            c.lanes = h.lanes) : (c.updateQueue = null,
                                c.memoizedState = null)
                    }
                    var p = gf(i);
                    if (p !== null) {
                        p.flags &= -257,
                            yf(p, i, l, s, t),
                            p.mode & 1 && mf(s, u, t),
                            t = p,
                            a = u;
                        var m = t.updateQueue;
                        if (m === null) {
                            var g = new Set;
                            g.add(a),
                                t.updateQueue = g
                        } else
                            m.add(a);
                        break e
                    } else {
                        if (!(t & 1)) {
                            mf(s, u, t),
                                Fc();
                            break e
                        }
                        a = Error(O(426))
                    }
                } else if (fe && l.mode & 1) {
                    var w = gf(i);
                    if (w !== null) {
                        !(w.flags & 65536) && (w.flags |= 256),
                            yf(w, i, l, s, t),
                            vc(go(a, l));
                        break e
                    }
                }
                s = a = go(a, l),
                    Ce !== 4 && (Ce = 2),
                    Zo === null ? Zo = [s] : Zo.push(s),
                    s = i;
                do {
                    switch (s.tag) {
                        case 3:
                            s.flags |= 65536,
                                t &= -t,
                                s.lanes |= t;
                            var v = _m(s, a, t);
                            uf(s, v);
                            break e;
                        case 1:
                            l = a;
                            var y = s.type
                                , x = s.stateNode;
                            if (!(s.flags & 128) && (typeof y.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (Fn === null || !Fn.has(x)))) {
                                s.flags |= 65536,
                                    t &= -t,
                                    s.lanes |= t;
                                var E = Lm(s, l, t);
                                uf(s, E);
                                break e
                            }
                    }
                    s = s.return
                } while (s !== null)
            }
            Zm(n)
        } catch (b) {
            t = b,
                we === n && n !== null && (we = n = n.return);
            continue
        }
        break
    } while (!0)
}
function Xm() {
    var e = Ji.current;
    return Ji.current = Xi,
        e === null ? Xi : e
}
function Fc() {
    (Ce === 0 || Ce === 3 || Ce === 2) && (Ce = 4),
        Ne === null || !(Sr & 268435455) && !(Sl & 268435455) || bn(Ne, Re)
}
function tl(e, t) {
    var n = te;
    te |= 2;
    var r = Xm();
    (Ne !== e || Re !== t) && (qt = null,
        mr(e, t));
    do
        try {
            Ox();
            break
        } catch (o) {
            Gm(e, o)
        }
    while (!0);
    if (wc(),
        te = n,
        Ji.current = r,
        we !== null)
        throw Error(O(261));
    return Ne = null,
        Re = 0,
        Ce
}
function Ox() {
    for (; we !== null;)
        Jm(we)
}
function Ax() {
    for (; we !== null && !r0();)
        Jm(we)
}
function Jm(e) {
    var t = tg(e.alternate, e, Ze);
    e.memoizedProps = e.pendingProps,
        t === null ? Zm(e) : we = t,
        _c.current = null
}
function Zm(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
            t.flags & 32768) {
            if (n = kx(n, t),
                n !== null) {
                n.flags &= 32767,
                    we = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                    e.subtreeFlags = 0,
                    e.deletions = null;
            else {
                Ce = 6,
                    we = null;
                return
            }
        } else if (n = Cx(n, t, Ze),
            n !== null) {
            we = n;
            return
        }
        if (t = t.sibling,
            t !== null) {
            we = t;
            return
        }
        we = t = e
    } while (t !== null);
    Ce === 0 && (Ce = 5)
}
function or(e, t, n) {
    var r = oe
        , o = pt.transition;
    try {
        pt.transition = null,
            oe = 1,
            _x(e, t, n, r)
    } finally {
        pt.transition = o,
            oe = r
    }
    return null
}
function _x(e, t, n, r) {
    do
        Zr();
    while (On !== null);
    if (te & 6)
        throw Error(O(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
        e.finishedLanes = 0,
        n === e.current)
        throw Error(O(177));
    e.callbackNode = null,
        e.callbackPriority = 0;
    var s = n.lanes | n.childLanes;
    if (p0(e, s),
        e === Ne && (we = Ne = null,
            Re = 0),
        !(n.subtreeFlags & 2064) && !(n.flags & 2064) || li || (li = !0,
            ng(Ii, function () {
                return Zr(),
                    null
            })),
        s = (n.flags & 15990) !== 0,
        n.subtreeFlags & 15990 || s) {
        s = pt.transition,
            pt.transition = null;
        var i = oe;
        oe = 1;
        var l = te;
        te |= 4,
            _c.current = null,
            Nx(e, n),
            Km(n, e),
            Z0(nu),
            Fi = !!tu,
            nu = tu = null,
            e.current = n,
            Tx(n),
            o0(),
            te = l,
            oe = i,
            pt.transition = s
    } else
        e.current = n;
    if (li && (li = !1,
        On = e,
        el = o),
        s = e.pendingLanes,
        s === 0 && (Fn = null),
        l0(n.stateNode),
        Ye(e, xe()),
        t !== null)
        for (r = e.onRecoverableError,
            n = 0; n < t.length; n++)
            o = t[n],
                r(o.value, {
                    componentStack: o.stack,
                    digest: o.digest
                });
    if (Zi)
        throw Zi = !1,
        e = Eu,
        Eu = null,
        e;
    return el & 1 && e.tag !== 0 && Zr(),
        s = e.pendingLanes,
        s & 1 ? e === bu ? es++ : (es = 0,
            bu = e) : es = 0,
        Gn(),
        null
}
function Zr() {
    if (On !== null) {
        var e = _h(el)
            , t = pt.transition
            , n = oe;
        try {
            if (pt.transition = null,
                oe = 16 > e ? 16 : e,
                On === null)
                var r = !1;
            else {
                if (e = On,
                    On = null,
                    el = 0,
                    te & 6)
                    throw Error(O(331));
                var o = te;
                for (te |= 4,
                    F = e.current; F !== null;) {
                    var s = F
                        , i = s.child;
                    if (F.flags & 16) {
                        var l = s.deletions;
                        if (l !== null) {
                            for (var a = 0; a < l.length; a++) {
                                var u = l[a];
                                for (F = u; F !== null;) {
                                    var c = F;
                                    switch (c.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Jo(8, c, s)
                                    }
                                    var d = c.child;
                                    if (d !== null)
                                        d.return = c,
                                            F = d;
                                    else
                                        for (; F !== null;) {
                                            c = F;
                                            var h = c.sibling
                                                , p = c.return;
                                            if (Hm(c),
                                                c === u) {
                                                F = null;
                                                break
                                            }
                                            if (h !== null) {
                                                h.return = p,
                                                    F = h;
                                                break
                                            }
                                            F = p
                                        }
                                }
                            }
                            var m = s.alternate;
                            if (m !== null) {
                                var g = m.child;
                                if (g !== null) {
                                    m.child = null;
                                    do {
                                        var w = g.sibling;
                                        g.sibling = null,
                                            g = w
                                    } while (g !== null)
                                }
                            }
                            F = s
                        }
                    }
                    if (s.subtreeFlags & 2064 && i !== null)
                        i.return = s,
                            F = i;
                    else
                        e: for (; F !== null;) {
                            if (s = F,
                                s.flags & 2048)
                                switch (s.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Jo(9, s, s.return)
                                }
                            var v = s.sibling;
                            if (v !== null) {
                                v.return = s.return,
                                    F = v;
                                break e
                            }
                            F = s.return
                        }
                }
                var y = e.current;
                for (F = y; F !== null;) {
                    i = F;
                    var x = i.child;
                    if (i.subtreeFlags & 2064 && x !== null)
                        x.return = i,
                            F = x;
                    else
                        e: for (i = y; F !== null;) {
                            if (l = F,
                                l.flags & 2048)
                                try {
                                    switch (l.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            wl(9, l)
                                    }
                                } catch (b) {
                                    ve(l, l.return, b)
                                }
                            if (l === i) {
                                F = null;
                                break e
                            }
                            var E = l.sibling;
                            if (E !== null) {
                                E.return = l.return,
                                    F = E;
                                break e
                            }
                            F = l.return
                        }
                }
                if (te = o,
                    Gn(),
                    Bt && typeof Bt.onPostCommitFiberRoot == "function")
                    try {
                        Bt.onPostCommitFiberRoot(fl, e)
                    } catch { }
                r = !0
            }
            return r
        } finally {
            oe = n,
                pt.transition = t
        }
    }
    return !1
}
function jf(e, t, n) {
    t = go(n, t),
        t = _m(e, t, 1),
        e = Mn(e, t, 1),
        t = Be(),
        e !== null && (Ts(e, 1, t),
            Ye(e, t))
}
function ve(e, t, n) {
    if (e.tag === 3)
        jf(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                jf(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Fn === null || !Fn.has(r))) {
                    e = go(n, e),
                        e = Lm(t, e, 1),
                        t = Mn(t, e, 1),
                        e = Be(),
                        t !== null && (Ts(t, 1, e),
                            Ye(t, e));
                    break
                }
            }
            t = t.return
        }
}
function Lx(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        t = Be(),
        e.pingedLanes |= e.suspendedLanes & n,
        Ne === e && (Re & n) === n && (Ce === 4 || Ce === 3 && (Re & 130023424) === Re && 500 > xe() - Dc ? mr(e, 0) : Lc |= n),
        Ye(e, t)
}
function eg(e, t) {
    t === 0 && (e.mode & 1 ? (t = Xs,
        Xs <<= 1,
        !(Xs & 130023424) && (Xs = 4194304)) : t = 1);
    var n = Be();
    e = nn(e, t),
        e !== null && (Ts(e, t, n),
            Ye(e, n))
}
function Dx(e) {
    var t = e.memoizedState
        , n = 0;
    t !== null && (n = t.retryLane),
        eg(e, n)
}
function Ix(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode
                , o = e.memoizedState;
            o !== null && (n = o.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(O(314))
    }
    r !== null && r.delete(t),
        eg(e, n)
}
var tg;
tg = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Ke.current)
            Qe = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return Qe = !1,
                    bx(e, t, n);
            Qe = !!(e.flags & 131072)
        }
    else
        Qe = !1,
            fe && t.flags & 1048576 && sm(t, Wi, t.index);
    switch (t.lanes = 0,
    t.tag) {
        case 2:
            var r = t.type;
            bi(e, t),
                e = t.pendingProps;
            var o = fo(t, Fe.current);
            Jr(t, n),
                o = Tc(null, t, r, e, o, n);
            var s = Rc();
            return t.flags |= 1,
                typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1,
                    t.memoizedState = null,
                    t.updateQueue = null,
                    qe(r) ? (s = !0,
                        Vi(t)) : s = !1,
                    t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null,
                    bc(t),
                    o.updater = xl,
                    t.stateNode = o,
                    o._reactInternals = t,
                    du(t, r, e, n),
                    t = hu(null, t, r, !0, s, n)) : (t.tag = 0,
                        fe && s && gc(t),
                        ze(null, t, o, n),
                        t = t.child),
                t;
        case 16:
            r = t.elementType;
            e: {
                switch (bi(e, t),
                e = t.pendingProps,
                o = r._init,
                r = o(r._payload),
                t.type = r,
                o = t.tag = Fx(r),
                e = St(r, e),
                o) {
                    case 0:
                        t = pu(null, t, r, e, n);
                        break e;
                    case 1:
                        t = wf(null, t, r, e, n);
                        break e;
                    case 11:
                        t = vf(null, t, r, e, n);
                        break e;
                    case 14:
                        t = xf(null, t, r, St(r.type, e), n);
                        break e
                }
                throw Error(O(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type,
                o = t.pendingProps,
                o = t.elementType === r ? o : St(r, o),
                pu(e, t, r, o, n);
        case 1:
            return r = t.type,
                o = t.pendingProps,
                o = t.elementType === r ? o : St(r, o),
                wf(e, t, r, o, n);
        case 3:
            e: {
                if (Fm(t),
                    e === null)
                    throw Error(O(387));
                r = t.pendingProps,
                    s = t.memoizedState,
                    o = s.element,
                    dm(e, t),
                    qi(t, r, null, n);
                var i = t.memoizedState;
                if (r = i.element,
                    s.isDehydrated)
                    if (s = {
                        element: r,
                        isDehydrated: !1,
                        cache: i.cache,
                        pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                        transitions: i.transitions
                    },
                        t.updateQueue.baseState = s,
                        t.memoizedState = s,
                        t.flags & 256) {
                        o = go(Error(O(423)), t),
                            t = Sf(e, t, r, n, o);
                        break e
                    } else if (r !== o) {
                        o = go(Error(O(424)), t),
                            t = Sf(e, t, r, n, o);
                        break e
                    } else
                        for (tt = In(t.stateNode.containerInfo.firstChild),
                            nt = t,
                            fe = !0,
                            Pt = null,
                            n = um(t, null, r, n),
                            t.child = n; n;)
                            n.flags = n.flags & -3 | 4096,
                                n = n.sibling;
                else {
                    if (po(),
                        r === o) {
                        t = rn(e, t, n);
                        break e
                    }
                    ze(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return fm(t),
                e === null && au(t),
                r = t.type,
                o = t.pendingProps,
                s = e !== null ? e.memoizedProps : null,
                i = o.children,
                ru(r, o) ? i = null : s !== null && ru(r, s) && (t.flags |= 32),
                Mm(e, t),
                ze(e, t, i, n),
                t.child;
        case 6:
            return e === null && au(t),
                null;
        case 13:
            return zm(e, t, n);
        case 4:
            return Cc(t, t.stateNode.containerInfo),
                r = t.pendingProps,
                e === null ? t.child = ho(t, null, r, n) : ze(e, t, r, n),
                t.child;
        case 11:
            return r = t.type,
                o = t.pendingProps,
                o = t.elementType === r ? o : St(r, o),
                vf(e, t, r, o, n);
        case 7:
            return ze(e, t, t.pendingProps, n),
                t.child;
        case 8:
            return ze(e, t, t.pendingProps.children, n),
                t.child;
        case 12:
            return ze(e, t, t.pendingProps.children, n),
                t.child;
        case 10:
            e: {
                if (r = t.type._context,
                    o = t.pendingProps,
                    s = t.memoizedProps,
                    i = o.value,
                    ie(Qi, r._currentValue),
                    r._currentValue = i,
                    s !== null)
                    if (Rt(s.value, i)) {
                        if (s.children === o.children && !Ke.current) {
                            t = rn(e, t, n);
                            break e
                        }
                    } else
                        for (s = t.child,
                            s !== null && (s.return = t); s !== null;) {
                            var l = s.dependencies;
                            if (l !== null) {
                                i = s.child;
                                for (var a = l.firstContext; a !== null;) {
                                    if (a.context === r) {
                                        if (s.tag === 1) {
                                            a = Zt(-1, n & -n),
                                                a.tag = 2;
                                            var u = s.updateQueue;
                                            if (u !== null) {
                                                u = u.shared;
                                                var c = u.pending;
                                                c === null ? a.next = a : (a.next = c.next,
                                                    c.next = a),
                                                    u.pending = a
                                            }
                                        }
                                        s.lanes |= n,
                                            a = s.alternate,
                                            a !== null && (a.lanes |= n),
                                            uu(s.return, n, t),
                                            l.lanes |= n;
                                        break
                                    }
                                    a = a.next
                                }
                            } else if (s.tag === 10)
                                i = s.type === t.type ? null : s.child;
                            else if (s.tag === 18) {
                                if (i = s.return,
                                    i === null)
                                    throw Error(O(341));
                                i.lanes |= n,
                                    l = i.alternate,
                                    l !== null && (l.lanes |= n),
                                    uu(i, n, t),
                                    i = s.sibling
                            } else
                                i = s.child;
                            if (i !== null)
                                i.return = s;
                            else
                                for (i = s; i !== null;) {
                                    if (i === t) {
                                        i = null;
                                        break
                                    }
                                    if (s = i.sibling,
                                        s !== null) {
                                        s.return = i.return,
                                            i = s;
                                        break
                                    }
                                    i = i.return
                                }
                            s = i
                        }
                ze(e, t, o.children, n),
                    t = t.child
            }
            return t;
        case 9:
            return o = t.type,
                r = t.pendingProps.children,
                Jr(t, n),
                o = ht(o),
                r = r(o),
                t.flags |= 1,
                ze(e, t, r, n),
                t.child;
        case 14:
            return r = t.type,
                o = St(r, t.pendingProps),
                o = St(r.type, o),
                xf(e, t, r, o, n);
        case 15:
            return Dm(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type,
                o = t.pendingProps,
                o = t.elementType === r ? o : St(r, o),
                bi(e, t),
                t.tag = 1,
                qe(r) ? (e = !0,
                    Vi(t)) : e = !1,
                Jr(t, n),
                Am(t, r, o),
                du(t, r, o, n),
                hu(null, t, r, !0, e, n);
        case 19:
            return $m(e, t, n);
        case 22:
            return Im(e, t, n)
    }
    throw Error(O(156, t.tag))
}
    ;
function ng(e, t) {
    return Rh(e, t)
}
function Mx(e, t, n, r) {
    this.tag = e,
        this.key = n,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = r,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
}
function ft(e, t, n, r) {
    return new Mx(e, t, n, r)
}
function zc(e) {
    return e = e.prototype,
        !(!e || !e.isReactComponent)
}
function Fx(e) {
    if (typeof e == "function")
        return zc(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
            e === oc)
            return 11;
        if (e === sc)
            return 14
    }
    return 2
}
function $n(e, t) {
    var n = e.alternate;
    return n === null ? (n = ft(e.tag, t, e.key, e.mode),
        n.elementType = e.elementType,
        n.type = e.type,
        n.stateNode = e.stateNode,
        n.alternate = e,
        e.alternate = n) : (n.pendingProps = t,
            n.type = e.type,
            n.flags = 0,
            n.subtreeFlags = 0,
            n.deletions = null),
        n.flags = e.flags & 14680064,
        n.childLanes = e.childLanes,
        n.lanes = e.lanes,
        n.child = e.child,
        n.memoizedProps = e.memoizedProps,
        n.memoizedState = e.memoizedState,
        n.updateQueue = e.updateQueue,
        t = e.dependencies,
        n.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        n.sibling = e.sibling,
        n.index = e.index,
        n.ref = e.ref,
        n
}
function Pi(e, t, n, r, o, s) {
    var i = 2;
    if (r = e,
        typeof e == "function")
        zc(e) && (i = 1);
    else if (typeof e == "string")
        i = 5;
    else
        e: switch (e) {
            case Mr:
                return gr(n.children, o, s, t);
            case rc:
                i = 8,
                    o |= 8;
                break;
            case Da:
                return e = ft(12, n, t, o | 2),
                    e.elementType = Da,
                    e.lanes = s,
                    e;
            case Ia:
                return e = ft(13, n, t, o),
                    e.elementType = Ia,
                    e.lanes = s,
                    e;
            case Ma:
                return e = ft(19, n, t, o),
                    e.elementType = Ma,
                    e.lanes = s,
                    e;
            case fh:
                return El(n, o, s, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case ch:
                            i = 10;
                            break e;
                        case dh:
                            i = 9;
                            break e;
                        case oc:
                            i = 11;
                            break e;
                        case sc:
                            i = 14;
                            break e;
                        case wn:
                            i = 16,
                                r = null;
                            break e
                    }
                throw Error(O(130, e == null ? e : typeof e, ""))
        }
    return t = ft(i, n, t, o),
        t.elementType = e,
        t.type = r,
        t.lanes = s,
        t
}
function gr(e, t, n, r) {
    return e = ft(7, e, r, t),
        e.lanes = n,
        e
}
function El(e, t, n, r) {
    return e = ft(22, e, r, t),
        e.elementType = fh,
        e.lanes = n,
        e.stateNode = {
            isHidden: !1
        },
        e
}
function Ea(e, t, n) {
    return e = ft(6, e, null, t),
        e.lanes = n,
        e
}
function ba(e, t, n) {
    return t = ft(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = n,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
}
function zx(e, t, n, r, o) {
    this.tag = t,
        this.containerInfo = e,
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.pendingContext = this.context = null,
        this.callbackPriority = 0,
        this.eventTimes = ra(0),
        this.expirationTimes = ra(-1),
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = ra(0),
        this.identifierPrefix = r,
        this.onRecoverableError = o,
        this.mutableSourceEagerHydrationData = null
}
function $c(e, t, n, r, o, s, i, l, a) {
    return e = new zx(e, t, n, l, a),
        t === 1 ? (t = 1,
            s === !0 && (t |= 8)) : t = 0,
        s = ft(3, null, null, t),
        e.current = s,
        s.stateNode = e,
        s.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null
        },
        bc(s),
        e
}
function $x(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Ir,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function rg(e) {
    if (!e)
        return Vn;
    e = e._reactInternals;
    e: {
        if (Pr(e) !== e || e.tag !== 1)
            throw Error(O(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (qe(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(O(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (qe(n))
            return rm(e, n, t)
    }
    return t
}
function og(e, t, n, r, o, s, i, l, a) {
    return e = $c(n, r, !0, e, o, s, i, l, a),
        e.context = rg(null),
        n = e.current,
        r = Be(),
        o = zn(n),
        s = Zt(r, o),
        s.callback = t ?? null,
        Mn(n, s, o),
        e.current.lanes = o,
        Ts(e, o, r),
        Ye(e, r),
        e
}
function bl(e, t, n, r) {
    var o = t.current
        , s = Be()
        , i = zn(o);
    return n = rg(n),
        t.context === null ? t.context = n : t.pendingContext = n,
        t = Zt(s, i),
        t.payload = {
            element: e
        },
        r = r === void 0 ? null : r,
        r !== null && (t.callback = r),
        e = Mn(o, t, i),
        e !== null && (Tt(e, o, i, s),
            wi(e, o, i)),
        i
}
function nl(e) {
    if (e = e.current,
        !e.child)
        return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}
function Of(e, t) {
    if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function Bc(e, t) {
    Of(e, t),
        (e = e.alternate) && Of(e, t)
}
function Bx() {
    return null
}
var sg = typeof reportError == "function" ? reportError : function (e) {
    console.error(e)
}
    ;
function Uc(e) {
    this._internalRoot = e
}
Cl.prototype.render = Uc.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(O(409));
    bl(e, t, null, null)
}
    ;
Cl.prototype.unmount = Uc.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Er(function () {
            bl(null, e, null, null)
        }),
            t[tn] = null
    }
}
    ;
function Cl(e) {
    this._internalRoot = e
}
Cl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Ih();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < En.length && t !== 0 && t < En[n].priority; n++)
            ;
        En.splice(n, 0, e),
            n === 0 && Fh(e)
    }
}
    ;
function Vc(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function kl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function Af() { }
function Ux(e, t, n, r, o) {
    if (o) {
        if (typeof r == "function") {
            var s = r;
            r = function () {
                var u = nl(i);
                s.call(u)
            }
        }
        var i = og(t, r, e, 0, null, !1, !1, "", Af);
        return e._reactRootContainer = i,
            e[tn] = i.current,
            cs(e.nodeType === 8 ? e.parentNode : e),
            Er(),
            i
    }
    for (; o = e.lastChild;)
        e.removeChild(o);
    if (typeof r == "function") {
        var l = r;
        r = function () {
            var u = nl(a);
            l.call(u)
        }
    }
    var a = $c(e, 0, !1, null, null, !1, !1, "", Af);
    return e._reactRootContainer = a,
        e[tn] = a.current,
        cs(e.nodeType === 8 ? e.parentNode : e),
        Er(function () {
            bl(t, a, n, r)
        }),
        a
}
function Pl(e, t, n, r, o) {
    var s = n._reactRootContainer;
    if (s) {
        var i = s;
        if (typeof o == "function") {
            var l = o;
            o = function () {
                var a = nl(i);
                l.call(a)
            }
        }
        bl(t, i, e, o)
    } else
        i = Ux(n, t, e, o, r);
    return nl(i)
}
Lh = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Ho(t.pendingLanes);
                n !== 0 && (ac(t, n | 1),
                    Ye(t, xe()),
                    !(te & 6) && (yo = xe() + 500,
                        Gn()))
            }
            break;
        case 13:
            Er(function () {
                var r = nn(e, 1);
                if (r !== null) {
                    var o = Be();
                    Tt(r, e, 1, o)
                }
            }),
                Bc(e, 1)
    }
}
    ;
uc = function (e) {
    if (e.tag === 13) {
        var t = nn(e, 134217728);
        if (t !== null) {
            var n = Be();
            Tt(t, e, 134217728, n)
        }
        Bc(e, 134217728)
    }
}
    ;
Dh = function (e) {
    if (e.tag === 13) {
        var t = zn(e)
            , n = nn(e, t);
        if (n !== null) {
            var r = Be();
            Tt(n, e, t, r)
        }
        Bc(e, t)
    }
}
    ;
Ih = function () {
    return oe
}
    ;
Mh = function (e, t) {
    var n = oe;
    try {
        return oe = e,
            t()
    } finally {
        oe = n
    }
}
    ;
Ka = function (e, t, n) {
    switch (t) {
        case "input":
            if ($a(e, n),
                t = n.name,
                n.type === "radio" && t != null) {
                for (n = e; n.parentNode;)
                    n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
                    t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var o = gl(r);
                        if (!o)
                            throw Error(O(90));
                        hh(r),
                            $a(r, o)
                    }
                }
            }
            break;
        case "textarea":
            gh(e, n);
            break;
        case "select":
            t = n.value,
                t != null && qr(e, !!n.multiple, t, !1)
    }
}
    ;
bh = Ic;
Ch = Er;
var Vx = {
    usingClientEntryPoint: !1,
    Events: [js, Br, gl, Sh, Eh, Ic]
}
    , Fo = {
        findFiberByHostInstance: sr,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    }
    , Hx = {
        bundleType: Fo.bundleType,
        version: Fo.version,
        rendererPackageName: Fo.rendererPackageName,
        rendererConfig: Fo.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: ln.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return e = Nh(e),
                e === null ? null : e.stateNode
        },
        findFiberByHostInstance: Fo.findFiberByHostInstance || Bx,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ai = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ai.isDisabled && ai.supportsFiber)
        try {
            fl = ai.inject(Hx),
                Bt = ai
        } catch { }
}
st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vx;
st.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Vc(t))
        throw Error(O(200));
    return $x(e, t, null, n)
}
    ;
st.createRoot = function (e, t) {
    if (!Vc(e))
        throw Error(O(299));
    var n = !1
        , r = ""
        , o = sg;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
        t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        t = $c(e, 1, !1, null, null, n, !1, r, o),
        e[tn] = t.current,
        cs(e.nodeType === 8 ? e.parentNode : e),
        new Uc(t)
}
    ;
st.findDOMNode = function (e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(O(188)) : (e = Object.keys(e).join(","),
            Error(O(268, e)));
    return e = Nh(t),
        e = e === null ? null : e.stateNode,
        e
}
    ;
st.flushSync = function (e) {
    return Er(e)
}
    ;
st.hydrate = function (e, t, n) {
    if (!kl(t))
        throw Error(O(200));
    return Pl(null, e, t, !0, n)
}
    ;
st.hydrateRoot = function (e, t, n) {
    if (!Vc(e))
        throw Error(O(405));
    var r = n != null && n.hydratedSources || null
        , o = !1
        , s = ""
        , i = sg;
    if (n != null && (n.unstable_strictMode === !0 && (o = !0),
        n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        t = og(t, null, e, 1, n ?? null, o, !1, s, i),
        e[tn] = t.current,
        cs(e),
        r)
        for (e = 0; e < r.length; e++)
            n = r[e],
                o = n._getVersion,
                o = o(n._source),
                t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(n, o);
    return new Cl(t)
}
    ;
st.render = function (e, t, n) {
    if (!kl(t))
        throw Error(O(200));
    return Pl(null, e, t, !1, n)
}
    ;
st.unmountComponentAtNode = function (e) {
    if (!kl(e))
        throw Error(O(40));
    return e._reactRootContainer ? (Er(function () {
        Pl(null, null, e, !1, function () {
            e._reactRootContainer = null,
                e[tn] = null
        })
    }),
        !0) : !1
}
    ;
st.unstable_batchedUpdates = Ic;
st.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!kl(n))
        throw Error(O(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(O(38));
    return Pl(e, t, n, !1, r)
}
    ;
st.version = "18.3.1-next-f1338f8080-20240426";
function ig() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ig)
        } catch (e) {
            console.error(e)
        }
}
ig(),
    ih.exports = st;
var As = ih.exports;
const lg = qp(As);
var ag, _f = As;
ag = _f.createRoot,
    _f.hydrateRoot;
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function xs() {
    return xs = Object.assign ? Object.assign.bind() : function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
        ,
        xs.apply(this, arguments)
}
var An;
(function (e) {
    e.Pop = "POP",
        e.Push = "PUSH",
        e.Replace = "REPLACE"
}
)(An || (An = {}));
const Lf = "popstate";
function Wx(e) {
    e === void 0 && (e = {});
    function t(r, o) {
        let { pathname: s, search: i, hash: l } = r.location;
        return Pu("", {
            pathname: s,
            search: i,
            hash: l
        }, o.state && o.state.usr || null, o.state && o.state.key || "default")
    }
    function n(r, o) {
        return typeof o == "string" ? o : rl(o)
    }
    return Kx(t, n, null, e)
}
function Se(e, t) {
    if (e === !1 || e === null || typeof e > "u")
        throw new Error(t)
}
function Hc(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch { }
    }
}
function Qx() {
    return Math.random().toString(36).substr(2, 8)
}
function Df(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}
function Pu(e, t, n, r) {
    return n === void 0 && (n = null),
        xs({
            pathname: typeof e == "string" ? e : e.pathname,
            search: "",
            hash: ""
        }, typeof t == "string" ? Co(t) : t, {
            state: n,
            key: t && t.key || r || Qx()
        })
}
function rl(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
        r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
        t
}
function Co(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n),
            e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r),
            e = e.substr(0, r)),
            e && (t.pathname = e)
    }
    return t
}
function Kx(e, t, n, r) {
    r === void 0 && (r = {});
    let { window: o = document.defaultView, v5Compat: s = !1 } = r
        , i = o.history
        , l = An.Pop
        , a = null
        , u = c();
    u == null && (u = 0,
        i.replaceState(xs({}, i.state, {
            idx: u
        }), ""));
    function c() {
        return (i.state || {
            idx: null
        }).idx
    }
    function d() {
        l = An.Pop;
        let w = c()
            , v = w == null ? null : w - u;
        u = w,
            a && a({
                action: l,
                location: g.location,
                delta: v
            })
    }
    function h(w, v) {
        l = An.Push;
        let y = Pu(g.location, w, v);
        u = c() + 1;
        let x = Df(y, u)
            , E = g.createHref(y);
        try {
            i.pushState(x, "", E)
        } catch (b) {
            if (b instanceof DOMException && b.name === "DataCloneError")
                throw b;
            o.location.assign(E)
        }
        s && a && a({
            action: l,
            location: g.location,
            delta: 1
        })
    }
    function p(w, v) {
        l = An.Replace;
        let y = Pu(g.location, w, v);
        u = c();
        let x = Df(y, u)
            , E = g.createHref(y);
        i.replaceState(x, "", E),
            s && a && a({
                action: l,
                location: g.location,
                delta: 0
            })
    }
    function m(w) {
        let v = o.location.origin !== "null" ? o.location.origin : o.location.href
            , y = typeof w == "string" ? w : rl(w);
        return y = y.replace(/ $/, "%20"),
            Se(v, "No window.location.(origin|href) available to create URL for href: " + y),
            new URL(y, v)
    }
    let g = {
        get action() {
            return l
        },
        get location() {
            return e(o, i)
        },
        listen(w) {
            if (a)
                throw new Error("A history only accepts one active listener");
            return o.addEventListener(Lf, d),
                a = w,
                () => {
                    o.removeEventListener(Lf, d),
                        a = null
                }
        },
        createHref(w) {
            return t(o, w)
        },
        createURL: m,
        encodeLocation(w) {
            let v = m(w);
            return {
                pathname: v.pathname,
                search: v.search,
                hash: v.hash
            }
        },
        push: h,
        replace: p,
        go(w) {
            return i.go(w)
        }
    };
    return g
}
var If;
(function (e) {
    e.data = "data",
        e.deferred = "deferred",
        e.redirect = "redirect",
        e.error = "error"
}
)(If || (If = {}));
function qx(e, t, n) {
    return n === void 0 && (n = "/"),
        Yx(e, t, n)
}
function Yx(e, t, n, r) {
    let o = typeof t == "string" ? Co(t) : t
        , s = Wc(o.pathname || "/", n);
    if (s == null)
        return null;
    let i = ug(e);
    Gx(i);
    let l = null;
    for (let a = 0; l == null && a < i.length; ++a) {
        let u = aw(s);
        l = sw(i[a], u)
    }
    return l
}
function ug(e, t, n, r) {
    t === void 0 && (t = []),
        n === void 0 && (n = []),
        r === void 0 && (r = "");
    let o = (s, i, l) => {
        let a = {
            relativePath: l === void 0 ? s.path || "" : l,
            caseSensitive: s.caseSensitive === !0,
            childrenIndex: i,
            route: s
        };
        a.relativePath.startsWith("/") && (Se(a.relativePath.startsWith(r), 'Absolute route path "' + a.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."),
            a.relativePath = a.relativePath.slice(r.length));
        let u = Bn([r, a.relativePath])
            , c = n.concat(a);
        s.children && s.children.length > 0 && (Se(s.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')),
            ug(s.children, t, c, u)),
            !(s.path == null && !s.index) && t.push({
                path: u,
                score: rw(u, s.index),
                routesMeta: c
            })
    }
        ;
    return e.forEach((s, i) => {
        var l;
        if (s.path === "" || !((l = s.path) != null && l.includes("?")))
            o(s, i);
        else
            for (let a of cg(s.path))
                o(s, i, a)
    }
    ),
        t
}
function cg(e) {
    let t = e.split("/");
    if (t.length === 0)
        return [];
    let [n, ...r] = t
        , o = n.endsWith("?")
        , s = n.replace(/\?$/, "");
    if (r.length === 0)
        return o ? [s, ""] : [s];
    let i = cg(r.join("/"))
        , l = [];
    return l.push(...i.map(a => a === "" ? s : [s, a].join("/"))),
        o && l.push(...i),
        l.map(a => e.startsWith("/") && a === "" ? "/" : a)
}
function Gx(e) {
    e.sort((t, n) => t.score !== n.score ? n.score - t.score : ow(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const Xx = /^:[\w-]+$/
    , Jx = 3
    , Zx = 2
    , ew = 1
    , tw = 10
    , nw = -2
    , Mf = e => e === "*";
function rw(e, t) {
    let n = e.split("/")
        , r = n.length;
    return n.some(Mf) && (r += nw),
        t && (r += Zx),
        n.filter(o => !Mf(o)).reduce((o, s) => o + (Xx.test(s) ? Jx : s === "" ? ew : tw), r)
}
function ow(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0
}
function sw(e, t, n) {
    let { routesMeta: r } = e
        , o = {}
        , s = "/"
        , i = [];
    for (let l = 0; l < r.length; ++l) {
        let a = r[l]
            , u = l === r.length - 1
            , c = s === "/" ? t : t.slice(s.length) || "/"
            , d = iw({
                path: a.relativePath,
                caseSensitive: a.caseSensitive,
                end: u
            }, c)
            , h = a.route;
        if (!d)
            return null;
        Object.assign(o, d.params),
            i.push({
                params: o,
                pathname: Bn([s, d.pathname]),
                pathnameBase: pw(Bn([s, d.pathnameBase])),
                route: h
            }),
            d.pathnameBase !== "/" && (s = Bn([s, d.pathnameBase]))
    }
    return i
}
function iw(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [n, r] = lw(e.path, e.caseSensitive, e.end)
        , o = t.match(n);
    if (!o)
        return null;
    let s = o[0]
        , i = s.replace(/(.)\/+$/, "$1")
        , l = o.slice(1);
    return {
        params: r.reduce((u, c, d) => {
            let { paramName: h, isOptional: p } = c;
            if (h === "*") {
                let g = l[d] || "";
                i = s.slice(0, s.length - g.length).replace(/(.)\/+$/, "$1")
            }
            const m = l[d];
            return p && !m ? u[h] = void 0 : u[h] = (m || "").replace(/%2F/g, "/"),
                u
        }
            , {}),
        pathname: s,
        pathnameBase: i,
        pattern: e
    }
}
function lw(e, t, n) {
    t === void 0 && (t = !1),
        n === void 0 && (n = !0),
        Hc(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = []
        , o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (i, l, a) => (r.push({
            paramName: l,
            isOptional: a != null
        }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }),
        o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
        [new RegExp(o, t ? void 0 : "i"), r]
}
function aw(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return Hc(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")),
            e
    }
}
function Wc(e, t) {
    if (t === "/")
        return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase()))
        return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length
        , r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
const uw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
    , cw = e => uw.test(e);
function dw(e, t) {
    t === void 0 && (t = "/");
    let { pathname: n, search: r = "", hash: o = "" } = typeof e == "string" ? Co(e) : e, s;
    if (n)
        if (cw(n))
            s = n;
        else {
            if (n.includes("//")) {
                let i = n;
                n = n.replace(/\/\/+/g, "/"),
                    Hc(!1, "Pathnames cannot have embedded double slashes - normalizing " + (i + " -> " + n))
            }
            n.startsWith("/") ? s = Ff(n.substring(1), "/") : s = Ff(n, t)
        }
    else
        s = t;
    return {
        pathname: s,
        search: hw(r),
        hash: mw(o)
    }
}
function Ff(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(o => {
        o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o)
    }
    ),
        n.length > 1 ? n.join("/") : "/"
}
function Ca(e, t, n, r) {
    return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.'
}
function fw(e) {
    return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0)
}
function dg(e, t) {
    let n = fw(e);
    return t ? n.map((r, o) => o === n.length - 1 ? r.pathname : r.pathnameBase) : n.map(r => r.pathnameBase)
}
function fg(e, t, n, r) {
    r === void 0 && (r = !1);
    let o;
    typeof e == "string" ? o = Co(e) : (o = xs({}, e),
        Se(!o.pathname || !o.pathname.includes("?"), Ca("?", "pathname", "search", o)),
        Se(!o.pathname || !o.pathname.includes("#"), Ca("#", "pathname", "hash", o)),
        Se(!o.search || !o.search.includes("#"), Ca("#", "search", "hash", o)));
    let s = e === "" || o.pathname === "", i = s ? "/" : o.pathname, l;
    if (i == null)
        l = n;
    else {
        let d = t.length - 1;
        if (!r && i.startsWith("..")) {
            let h = i.split("/");
            for (; h[0] === "..";)
                h.shift(),
                    d -= 1;
            o.pathname = h.join("/")
        }
        l = d >= 0 ? t[d] : "/"
    }
    let a = dw(o, l)
        , u = i && i !== "/" && i.endsWith("/")
        , c = (s || i === ".") && n.endsWith("/");
    return !a.pathname.endsWith("/") && (u || c) && (a.pathname += "/"),
        a
}
const Bn = e => e.join("/").replace(/\/\/+/g, "/")
    , pw = e => e.replace(/\/+$/, "").replace(/^\/*/, "/")
    , hw = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e
    , mw = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function gw(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e
}
const pg = ["post", "put", "patch", "delete"];
new Set(pg);
const yw = ["get", ...pg];
new Set(yw);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ws() {
    return ws = Object.assign ? Object.assign.bind() : function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
        ,
        ws.apply(this, arguments)
}
const Qc = S.createContext(null)
    , vw = S.createContext(null)
    , Nr = S.createContext(null)
    , Nl = S.createContext(null)
    , Xn = S.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1
    })
    , hg = S.createContext(null);
function xw(e, t) {
    let { relative: n } = t === void 0 ? {} : t;
    _s() || Se(!1);
    let { basename: r, navigator: o } = S.useContext(Nr)
        , { hash: s, pathname: i, search: l } = gg(e, {
            relative: n
        })
        , a = i;
    return r !== "/" && (a = i === "/" ? r : Bn([r, i])),
        o.createHref({
            pathname: a,
            search: l,
            hash: s
        })
}
function _s() {
    return S.useContext(Nl) != null
}
function Jn() {
    return _s() || Se(!1),
        S.useContext(Nl).location
}
function mg(e) {
    S.useContext(Nr).static || S.useLayoutEffect(e)
}
function Tr() {
    let { isDataRoute: e } = S.useContext(Xn);
    return e ? _w() : ww()
}
function ww() {
    _s() || Se(!1);
    let e = S.useContext(Qc)
        , { basename: t, future: n, navigator: r } = S.useContext(Nr)
        , { matches: o } = S.useContext(Xn)
        , { pathname: s } = Jn()
        , i = JSON.stringify(dg(o, n.v7_relativeSplatPath))
        , l = S.useRef(!1);
    return mg(() => {
        l.current = !0
    }
    ),
        S.useCallback(function (u, c) {
            if (c === void 0 && (c = {}),
                !l.current)
                return;
            if (typeof u == "number") {
                r.go(u);
                return
            }
            let d = fg(u, JSON.parse(i), s, c.relative === "path");
            e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : Bn([t, d.pathname])),
                (c.replace ? r.replace : r.push)(d, c.state, c)
        }, [t, r, i, s, e])
}
function Sw() {
    let { matches: e } = S.useContext(Xn)
        , t = e[e.length - 1];
    return t ? t.params : {}
}
function gg(e, t) {
    let { relative: n } = t === void 0 ? {} : t
        , { future: r } = S.useContext(Nr)
        , { matches: o } = S.useContext(Xn)
        , { pathname: s } = Jn()
        , i = JSON.stringify(dg(o, r.v7_relativeSplatPath));
    return S.useMemo(() => fg(e, JSON.parse(i), s, n === "path"), [e, i, s, n])
}
function Ew(e, t) {
    return bw(e, t)
}
function bw(e, t, n, r) {
    _s() || Se(!1);
    let { navigator: o } = S.useContext(Nr)
        , { matches: s } = S.useContext(Xn)
        , i = s[s.length - 1]
        , l = i ? i.params : {};
    i && i.pathname;
    let a = i ? i.pathnameBase : "/";
    i && i.route;
    let u = Jn(), c;
    if (t) {
        var d;
        let w = typeof t == "string" ? Co(t) : t;
        a === "/" || (d = w.pathname) != null && d.startsWith(a) || Se(!1),
            c = w
    } else
        c = u;
    let h = c.pathname || "/"
        , p = h;
    if (a !== "/") {
        let w = a.replace(/^\//, "").split("/");
        p = "/" + h.replace(/^\//, "").split("/").slice(w.length).join("/")
    }
    let m = qx(e, {
        pathname: p
    })
        , g = Tw(m && m.map(w => Object.assign({}, w, {
            params: Object.assign({}, l, w.params),
            pathname: Bn([a, o.encodeLocation ? o.encodeLocation(w.pathname).pathname : w.pathname]),
            pathnameBase: w.pathnameBase === "/" ? a : Bn([a, o.encodeLocation ? o.encodeLocation(w.pathnameBase).pathname : w.pathnameBase])
        })), s, n, r);
    return t && g ? S.createElement(Nl.Provider, {
        value: {
            location: ws({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, c),
            navigationType: An.Pop
        }
    }, g) : g
}
function Cw() {
    let e = Aw()
        , t = gw(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e)
        , n = e instanceof Error ? e.stack : null
        , o = {
            padding: "0.5rem",
            backgroundColor: "rgba(200,200,200, 0.5)"
        };
    return S.createElement(S.Fragment, null, S.createElement("h2", null, "Unexpected Application Error!"), S.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? S.createElement("pre", {
        style: o
    }, n) : null, null)
}
const kw = S.createElement(Cw, null);
class Pw extends S.Component {
    constructor(t) {
        super(t),
            this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error
            }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n) {
        console.error("React Router caught the following error during render", t, n)
    }
    render() {
        return this.state.error !== void 0 ? S.createElement(Xn.Provider, {
            value: this.props.routeContext
        }, S.createElement(hg.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}
function Nw(e) {
    let { routeContext: t, match: n, children: r } = e
        , o = S.useContext(Qc);
    return o && o.static && o.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = n.route.id),
        S.createElement(Xn.Provider, {
            value: t
        }, r)
}
function Tw(e, t, n, r) {
    var o;
    if (t === void 0 && (t = []),
        n === void 0 && (n = null),
        r === void 0 && (r = null),
        e == null) {
        var s;
        if (!n)
            return null;
        if (n.errors)
            e = n.matches;
        else if ((s = r) != null && s.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
            e = n.matches;
        else
            return null
    }
    let i = e
        , l = (o = n) == null ? void 0 : o.errors;
    if (l != null) {
        let c = i.findIndex(d => d.route.id && (l == null ? void 0 : l[d.route.id]) !== void 0);
        c >= 0 || Se(!1),
            i = i.slice(0, Math.min(i.length, c + 1))
    }
    let a = !1
        , u = -1;
    if (n && r && r.v7_partialHydration)
        for (let c = 0; c < i.length; c++) {
            let d = i[c];
            if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c),
                d.route.id) {
                let { loaderData: h, errors: p } = n
                    , m = d.route.loader && h[d.route.id] === void 0 && (!p || p[d.route.id] === void 0);
                if (d.route.lazy || m) {
                    a = !0,
                        u >= 0 ? i = i.slice(0, u + 1) : i = [i[0]];
                    break
                }
            }
        }
    return i.reduceRight((c, d, h) => {
        let p, m = !1, g = null, w = null;
        n && (p = l && d.route.id ? l[d.route.id] : void 0,
            g = d.route.errorElement || kw,
            a && (u < 0 && h === 0 ? (Lw("route-fallback"),
                m = !0,
                w = null) : u === h && (m = !0,
                    w = d.route.hydrateFallbackElement || null)));
        let v = t.concat(i.slice(0, h + 1))
            , y = () => {
                let x;
                return p ? x = g : m ? x = w : d.route.Component ? x = S.createElement(d.route.Component, null) : d.route.element ? x = d.route.element : x = c,
                    S.createElement(Nw, {
                        match: d,
                        routeContext: {
                            outlet: c,
                            matches: v,
                            isDataRoute: n != null
                        },
                        children: x
                    })
            }
            ;
        return n && (d.route.ErrorBoundary || d.route.errorElement || h === 0) ? S.createElement(Pw, {
            location: n.location,
            revalidation: n.revalidation,
            component: g,
            error: p,
            children: y(),
            routeContext: {
                outlet: null,
                matches: v,
                isDataRoute: !0
            }
        }) : y()
    }
        , null)
}
var yg = function (e) {
    return e.UseBlocker = "useBlocker",
        e.UseRevalidator = "useRevalidator",
        e.UseNavigateStable = "useNavigate",
        e
}(yg || {})
    , vg = function (e) {
        return e.UseBlocker = "useBlocker",
            e.UseLoaderData = "useLoaderData",
            e.UseActionData = "useActionData",
            e.UseRouteError = "useRouteError",
            e.UseNavigation = "useNavigation",
            e.UseRouteLoaderData = "useRouteLoaderData",
            e.UseMatches = "useMatches",
            e.UseRevalidator = "useRevalidator",
            e.UseNavigateStable = "useNavigate",
            e.UseRouteId = "useRouteId",
            e
    }(vg || {});
function Rw(e) {
    let t = S.useContext(Qc);
    return t || Se(!1),
        t
}
function jw(e) {
    let t = S.useContext(vw);
    return t || Se(!1),
        t
}
function Ow(e) {
    let t = S.useContext(Xn);
    return t || Se(!1),
        t
}
function xg(e) {
    let t = Ow()
        , n = t.matches[t.matches.length - 1];
    return n.route.id || Se(!1),
        n.route.id
}
function Aw() {
    var e;
    let t = S.useContext(hg)
        , n = jw()
        , r = xg();
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function _w() {
    let { router: e } = Rw(yg.UseNavigateStable)
        , t = xg(vg.UseNavigateStable)
        , n = S.useRef(!1);
    return mg(() => {
        n.current = !0
    }
    ),
        S.useCallback(function (o, s) {
            s === void 0 && (s = {}),
                n.current && (typeof o == "number" ? e.navigate(o) : e.navigate(o, ws({
                    fromRouteId: t
                }, s)))
        }, [e, t])
}
const zf = {};
function Lw(e, t, n) {
    zf[e] || (zf[e] = !0)
}
function Dw(e, t) {
    e == null || e.v7_startTransition,
        e == null || e.v7_relativeSplatPath
}
function vn(e) {
    Se(!1)
}
function Iw(e) {
    let { basename: t = "/", children: n = null, location: r, navigationType: o = An.Pop, navigator: s, static: i = !1, future: l } = e;
    _s() && Se(!1);
    let a = t.replace(/^\/*/, "/")
        , u = S.useMemo(() => ({
            basename: a,
            navigator: s,
            static: i,
            future: ws({
                v7_relativeSplatPath: !1
            }, l)
        }), [a, l, s, i]);
    typeof r == "string" && (r = Co(r));
    let { pathname: c = "/", search: d = "", hash: h = "", state: p = null, key: m = "default" } = r
        , g = S.useMemo(() => {
            let w = Wc(c, a);
            return w == null ? null : {
                location: {
                    pathname: w,
                    search: d,
                    hash: h,
                    state: p,
                    key: m
                },
                navigationType: o
            }
        }
            , [a, c, d, h, p, m, o]);
    return g == null ? null : S.createElement(Nr.Provider, {
        value: u
    }, S.createElement(Nl.Provider, {
        children: n,
        value: g
    }))
}
function Mw(e) {
    let { children: t, location: n } = e;
    return Ew(Nu(t), n)
}
new Promise(() => { }
);
function Nu(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return S.Children.forEach(e, (r, o) => {
        if (!S.isValidElement(r))
            return;
        let s = [...t, o];
        if (r.type === S.Fragment) {
            n.push.apply(n, Nu(r.props.children, s));
            return
        }
        r.type !== vn && Se(!1),
            !r.props.index || !r.props.children || Se(!1);
        let i = {
            id: r.props.id || s.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (i.children = Nu(r.props.children, s)),
            n.push(i)
    }
    ),
        n
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Tu() {
    return Tu = Object.assign ? Object.assign.bind() : function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
        ,
        Tu.apply(this, arguments)
}
function Fw(e, t) {
    if (e == null)
        return {};
    var n = {}, r = Object.keys(e), o, s;
    for (s = 0; s < r.length; s++)
        o = r[s],
            !(t.indexOf(o) >= 0) && (n[o] = e[o]);
    return n
}
function zw(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function $w(e, t) {
    return e.button === 0 && (!t || t === "_self") && !zw(e)
}
function Ru(e) {
    return e === void 0 && (e = ""),
        new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return t.concat(Array.isArray(r) ? r.map(o => [n, o]) : [[n, r]])
        }
            , []))
}
function Bw(e, t) {
    let n = Ru(e);
    return t && t.forEach((r, o) => {
        n.has(o) || t.getAll(o).forEach(s => {
            n.append(o, s)
        }
        )
    }
    ),
        n
}
const Uw = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"]
    , Vw = "6";
try {
    window.__reactRouterVersion = Vw
} catch { }
const Hw = "startTransition"
    , $f = Zu[Hw];
function Ww(e) {
    let { basename: t, children: n, future: r, window: o } = e
        , s = S.useRef();
    s.current == null && (s.current = Wx({
        window: o,
        v5Compat: !0
    }));
    let i = s.current
        , [l, a] = S.useState({
            action: i.action,
            location: i.location
        })
        , { v7_startTransition: u } = r || {}
        , c = S.useCallback(d => {
            u && $f ? $f(() => a(d)) : a(d)
        }
            , [a, u]);
    return S.useLayoutEffect(() => i.listen(c), [i, c]),
        S.useEffect(() => Dw(r), [r]),
        S.createElement(Iw, {
            basename: t,
            children: n,
            location: l.location,
            navigationType: l.action,
            navigator: i,
            future: r
        })
}
const Qw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u"
    , Kw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
    , ee = S.forwardRef(function (t, n) {
        let { onClick: r, relative: o, reloadDocument: s, replace: i, state: l, target: a, to: u, preventScrollReset: c, viewTransition: d } = t, h = Fw(t, Uw), { basename: p } = S.useContext(Nr), m, g = !1;
        if (typeof u == "string" && Kw.test(u) && (m = u,
            Qw))
            try {
                let x = new URL(window.location.href)
                    , E = u.startsWith("//") ? new URL(x.protocol + u) : new URL(u)
                    , b = Wc(E.pathname, p);
                E.origin === x.origin && b != null ? u = b + E.search + E.hash : g = !0
            } catch { }
        let w = xw(u, {
            relative: o
        })
            , v = qw(u, {
                replace: i,
                state: l,
                target: a,
                preventScrollReset: c,
                relative: o,
                viewTransition: d
            });
        function y(x) {
            r && r(x),
                x.defaultPrevented || v(x)
        }
        return S.createElement("a", Tu({}, h, {
            href: m || w,
            onClick: g || s ? r : y,
            ref: n,
            target: a
        }))
    });
var Bf;
(function (e) {
    e.UseScrollRestoration = "useScrollRestoration",
        e.UseSubmit = "useSubmit",
        e.UseSubmitFetcher = "useSubmitFetcher",
        e.UseFetcher = "useFetcher",
        e.useViewTransitionState = "useViewTransitionState"
}
)(Bf || (Bf = {}));
var Uf;
(function (e) {
    e.UseFetcher = "useFetcher",
        e.UseFetchers = "useFetchers",
        e.UseScrollRestoration = "useScrollRestoration"
}
)(Uf || (Uf = {}));
function qw(e, t) {
    let { target: n, replace: r, state: o, preventScrollReset: s, relative: i, viewTransition: l } = t === void 0 ? {} : t
        , a = Tr()
        , u = Jn()
        , c = gg(e, {
            relative: i
        });
    return S.useCallback(d => {
        if ($w(d, n)) {
            d.preventDefault();
            let h = r !== void 0 ? r : rl(u) === rl(c);
            a(e, {
                replace: h,
                state: o,
                preventScrollReset: s,
                relative: i,
                viewTransition: l
            })
        }
    }
        , [u, a, c, r, o, n, e, s, i, l])
}
function Yw(e) {
    let t = S.useRef(Ru(e))
        , n = S.useRef(!1)
        , r = Jn()
        , o = S.useMemo(() => Bw(r.search, n.current ? null : t.current), [r.search])
        , s = Tr()
        , i = S.useCallback((l, a) => {
            const u = Ru(typeof l == "function" ? l(o) : l);
            n.current = !0,
                s("?" + u, a)
        }
            , [s, o]);
    return [o, i]
}
var Tl = class {
    constructor() {
        this.listeners = new Set,
            this.subscribe = this.subscribe.bind(this)
    }
    subscribe(e) {
        return this.listeners.add(e),
            this.onSubscribe(),
            () => {
                this.listeners.delete(e),
                    this.onUnsubscribe()
            }
    }
    hasListeners() {
        return this.listeners.size > 0
    }
    onSubscribe() { }
    onUnsubscribe() { }
}
    , Gw = {
        setTimeout: (e, t) => setTimeout(e, t),
        clearTimeout: e => clearTimeout(e),
        setInterval: (e, t) => setInterval(e, t),
        clearInterval: e => clearInterval(e)
    }, Cn, qu, zp, Xw = (zp = class {
        constructor() {
            Z(this, Cn, Gw);
            Z(this, qu, !1)
        }
        setTimeoutProvider(e) {
            H(this, Cn, e)
        }
        setTimeout(e, t) {
            return T(this, Cn).setTimeout(e, t)
        }
        clearTimeout(e) {
            T(this, Cn).clearTimeout(e)
        }
        setInterval(e, t) {
            return T(this, Cn).setInterval(e, t)
        }
        clearInterval(e) {
            T(this, Cn).clearInterval(e)
        }
    }
        ,
        Cn = new WeakMap,
        qu = new WeakMap,
        zp), ju = new Xw;
function Jw(e) {
    setTimeout(e, 0)
}
var Rl = typeof window > "u" || "Deno" in globalThis;
function Et() { }
function Zw(e, t) {
    return typeof e == "function" ? e(t) : e
}
function e1(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
}
function t1(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}
function Ou(e, t) {
    return typeof e == "function" ? e(t) : e
}
function n1(e, t) {
    return typeof e == "function" ? e(t) : e
}
function Vf(e, t) {
    const { type: n = "all", exact: r, fetchStatus: o, predicate: s, queryKey: i, stale: l } = e;
    if (i) {
        if (r) {
            if (t.queryHash !== Kc(i, t.options))
                return !1
        } else if (!Es(t.queryKey, i))
            return !1
    }
    if (n !== "all") {
        const a = t.isActive();
        if (n === "active" && !a || n === "inactive" && a)
            return !1
    }
    return !(typeof l == "boolean" && t.isStale() !== l || o && o !== t.state.fetchStatus || s && !s(t))
}
function Hf(e, t) {
    const { exact: n, status: r, predicate: o, mutationKey: s } = e;
    if (s) {
        if (!t.options.mutationKey)
            return !1;
        if (n) {
            if (Ss(t.options.mutationKey) !== Ss(s))
                return !1
        } else if (!Es(t.options.mutationKey, s))
            return !1
    }
    return !(r && t.state.status !== r || o && !o(t))
}
function Kc(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || Ss)(e)
}
function Ss(e) {
    return JSON.stringify(e, (t, n) => Au(n) ? Object.keys(n).sort().reduce((r, o) => (r[o] = n[o],
        r), {}) : n)
}
function Es(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(n => Es(e[n], t[n])) : !1
}
var r1 = Object.prototype.hasOwnProperty;
function wg(e, t, n = 0) {
    if (e === t)
        return e;
    if (n > 500)
        return t;
    const r = Wf(e) && Wf(t);
    if (!r && !(Au(e) && Au(t)))
        return t;
    const s = (r ? e : Object.keys(e)).length
        , i = r ? t : Object.keys(t)
        , l = i.length
        , a = r ? new Array(l) : {};
    let u = 0;
    for (let c = 0; c < l; c++) {
        const d = r ? c : i[c]
            , h = e[d]
            , p = t[d];
        if (h === p) {
            a[d] = h,
                (r ? c < s : r1.call(e, d)) && u++;
            continue
        }
        if (h === null || p === null || typeof h != "object" || typeof p != "object") {
            a[d] = p;
            continue
        }
        const m = wg(h, p, n + 1);
        a[d] = m,
            m === h && u++
    }
    return s === l && u === s ? e : a
}
function Wf(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}
function Au(e) {
    if (!Qf(e))
        return !1;
    const t = e.constructor;
    if (t === void 0)
        return !0;
    const n = t.prototype;
    return !(!Qf(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
}
function Qf(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}
function o1(e) {
    return new Promise(t => {
        ju.setTimeout(t, e)
    }
    )
}
function s1(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? wg(e, t) : t
}
function i1(e, t, n = 0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}
function l1(e, t, n = 0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var qc = Symbol();
function Sg(e, t) {
    return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === qc ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
}
function a1(e, t, n) {
    let r = !1, o;
    return Object.defineProperty(e, "signal", {
        enumerable: !0,
        get: () => (o ?? (o = t()),
            r || (r = !0,
                o.aborted ? n() : o.addEventListener("abort", n, {
                    once: !0
                })),
            o)
    }),
        e
}
var ur, kn, no, $p, u1 = ($p = class extends Tl {
    constructor() {
        super();
        Z(this, ur);
        Z(this, kn);
        Z(this, no);
        H(this, no, t => {
            if (!Rl && window.addEventListener) {
                const n = () => t();
                return window.addEventListener("visibilitychange", n, !1),
                    () => {
                        window.removeEventListener("visibilitychange", n)
                    }
            }
        }
        )
    }
    onSubscribe() {
        T(this, kn) || this.setEventListener(T(this, no))
    }
    onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = T(this, kn)) == null || t.call(this),
            H(this, kn, void 0))
    }
    setEventListener(t) {
        var n;
        H(this, no, t),
            (n = T(this, kn)) == null || n.call(this),
            H(this, kn, t(r => {
                typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
            }
            ))
    }
    setFocused(t) {
        T(this, ur) !== t && (H(this, ur, t),
            this.onFocus())
    }
    onFocus() {
        const t = this.isFocused();
        this.listeners.forEach(n => {
            n(t)
        }
        )
    }
    isFocused() {
        var t;
        return typeof T(this, ur) == "boolean" ? T(this, ur) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
    }
}
    ,
    ur = new WeakMap,
    kn = new WeakMap,
    no = new WeakMap,
    $p), Eg = new u1;
function c1() {
    let e, t;
    const n = new Promise((o, s) => {
        e = o,
            t = s
    }
    );
    n.status = "pending",
        n.catch(() => { }
        );
    function r(o) {
        Object.assign(n, o),
            delete n.resolve,
            delete n.reject
    }
    return n.resolve = o => {
        r({
            status: "fulfilled",
            value: o
        }),
            e(o)
    }
        ,
        n.reject = o => {
            r({
                status: "rejected",
                reason: o
            }),
                t(o)
        }
        ,
        n
}
var d1 = Jw;
function f1() {
    let e = []
        , t = 0
        , n = l => {
            l()
        }
        , r = l => {
            l()
        }
        , o = d1;
    const s = l => {
        t ? e.push(l) : o(() => {
            n(l)
        }
        )
    }
        , i = () => {
            const l = e;
            e = [],
                l.length && o(() => {
                    r(() => {
                        l.forEach(a => {
                            n(a)
                        }
                        )
                    }
                    )
                }
                )
        }
        ;
    return {
        batch: l => {
            let a;
            t++;
            try {
                a = l()
            } finally {
                t--,
                    t || i()
            }
            return a
        }
        ,
        batchCalls: l => (...a) => {
            s(() => {
                l(...a)
            }
            )
        }
        ,
        schedule: s,
        setNotifyFunction: l => {
            n = l
        }
        ,
        setBatchNotifyFunction: l => {
            r = l
        }
        ,
        setScheduler: l => {
            o = l
        }
    }
}
var $e = f1(), ro, Pn, oo, Bp, p1 = (Bp = class extends Tl {
    constructor() {
        super();
        Z(this, ro, !0);
        Z(this, Pn);
        Z(this, oo);
        H(this, oo, t => {
            if (!Rl && window.addEventListener) {
                const n = () => t(!0)
                    , r = () => t(!1);
                return window.addEventListener("online", n, !1),
                    window.addEventListener("offline", r, !1),
                    () => {
                        window.removeEventListener("online", n),
                            window.removeEventListener("offline", r)
                    }
            }
        }
        )
    }
    onSubscribe() {
        T(this, Pn) || this.setEventListener(T(this, oo))
    }
    onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = T(this, Pn)) == null || t.call(this),
            H(this, Pn, void 0))
    }
    setEventListener(t) {
        var n;
        H(this, oo, t),
            (n = T(this, Pn)) == null || n.call(this),
            H(this, Pn, t(this.setOnline.bind(this)))
    }
    setOnline(t) {
        T(this, ro) !== t && (H(this, ro, t),
            this.listeners.forEach(r => {
                r(t)
            }
            ))
    }
    isOnline() {
        return T(this, ro)
    }
}
    ,
    ro = new WeakMap,
    Pn = new WeakMap,
    oo = new WeakMap,
    Bp), ol = new p1;
function h1(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}
function bg(e) {
    return (e ?? "online") === "online" ? ol.isOnline() : !0
}
var _u = class extends Error {
    constructor(e) {
        super("CancelledError"),
            this.revert = e == null ? void 0 : e.revert,
            this.silent = e == null ? void 0 : e.silent
    }
}
    ;
function Cg(e) {
    let t = !1, n = 0, r;
    const o = c1()
        , s = () => o.status !== "pending"
        , i = g => {
            var w;
            if (!s()) {
                const v = new _u(g);
                h(v),
                    (w = e.onCancel) == null || w.call(e, v)
            }
        }
        , l = () => {
            t = !0
        }
        , a = () => {
            t = !1
        }
        , u = () => Eg.isFocused() && (e.networkMode === "always" || ol.isOnline()) && e.canRun()
        , c = () => bg(e.networkMode) && e.canRun()
        , d = g => {
            s() || (r == null || r(),
                o.resolve(g))
        }
        , h = g => {
            s() || (r == null || r(),
                o.reject(g))
        }
        , p = () => new Promise(g => {
            var w;
            r = v => {
                (s() || u()) && g(v)
            }
                ,
                (w = e.onPause) == null || w.call(e)
        }
        ).then(() => {
            var g;
            r = void 0,
                s() || (g = e.onContinue) == null || g.call(e)
        }
        )
        , m = () => {
            if (s())
                return;
            let g;
            const w = n === 0 ? e.initialPromise : void 0;
            try {
                g = w ?? e.fn()
            } catch (v) {
                g = Promise.reject(v)
            }
            Promise.resolve(g).then(d).catch(v => {
                var C;
                if (s())
                    return;
                const y = e.retry ?? (Rl ? 0 : 3)
                    , x = e.retryDelay ?? h1
                    , E = typeof x == "function" ? x(n, v) : x
                    , b = y === !0 || typeof y == "number" && n < y || typeof y == "function" && y(n, v);
                if (t || !b) {
                    h(v);
                    return
                }
                n++,
                    (C = e.onFail) == null || C.call(e, n, v),
                    o1(E).then(() => u() ? void 0 : p()).then(() => {
                        t ? h(v) : m()
                    }
                    )
            }
            )
        }
        ;
    return {
        promise: o,
        status: () => o.status,
        cancel: i,
        continue: () => (r == null || r(),
            o),
        cancelRetry: l,
        continueRetry: a,
        canStart: c,
        start: () => (c() ? m() : p().then(m),
            o)
    }
}
var cr, Up, kg = (Up = class {
    constructor() {
        Z(this, cr)
    }
    destroy() {
        this.clearGcTimeout()
    }
    scheduleGc() {
        this.clearGcTimeout(),
            e1(this.gcTime) && H(this, cr, ju.setTimeout(() => {
                this.optionalRemove()
            }
                , this.gcTime))
    }
    updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (Rl ? 1 / 0 : 5 * 60 * 1e3))
    }
    clearGcTimeout() {
        T(this, cr) && (ju.clearTimeout(T(this, cr)),
            H(this, cr, void 0))
    }
}
    ,
    cr = new WeakMap,
    Up), dr, so, ut, fr, ke, Cs, pr, bt, Kt, Vp, m1 = (Vp = class extends kg {
        constructor(t) {
            super();
            Z(this, bt);
            Z(this, dr);
            Z(this, so);
            Z(this, ut);
            Z(this, fr);
            Z(this, ke);
            Z(this, Cs);
            Z(this, pr);
            H(this, pr, !1),
                H(this, Cs, t.defaultOptions),
                this.setOptions(t.options),
                this.observers = [],
                H(this, fr, t.client),
                H(this, ut, T(this, fr).getQueryCache()),
                this.queryKey = t.queryKey,
                this.queryHash = t.queryHash,
                H(this, dr, qf(this.options)),
                this.state = t.state ?? T(this, dr),
                this.scheduleGc()
        }
        get meta() {
            return this.options.meta
        }
        get promise() {
            var t;
            return (t = T(this, ke)) == null ? void 0 : t.promise
        }
        setOptions(t) {
            if (this.options = {
                ...T(this, Cs),
                ...t
            },
                this.updateGcTime(this.options.gcTime),
                this.state && this.state.data === void 0) {
                const n = qf(this.options);
                n.data !== void 0 && (this.setState(Kf(n.data, n.dataUpdatedAt)),
                    H(this, dr, n))
            }
        }
        optionalRemove() {
            !this.observers.length && this.state.fetchStatus === "idle" && T(this, ut).remove(this)
        }
        setData(t, n) {
            const r = s1(this.state.data, t, this.options);
            return Ae(this, bt, Kt).call(this, {
                data: r,
                type: "success",
                dataUpdatedAt: n == null ? void 0 : n.updatedAt,
                manual: n == null ? void 0 : n.manual
            }),
                r
        }
        setState(t, n) {
            Ae(this, bt, Kt).call(this, {
                type: "setState",
                state: t,
                setStateOptions: n
            })
        }
        cancel(t) {
            var r, o;
            const n = (r = T(this, ke)) == null ? void 0 : r.promise;
            return (o = T(this, ke)) == null || o.cancel(t),
                n ? n.then(Et).catch(Et) : Promise.resolve()
        }
        destroy() {
            super.destroy(),
                this.cancel({
                    silent: !0
                })
        }
        reset() {
            this.destroy(),
                this.setState(T(this, dr))
        }
        isActive() {
            return this.observers.some(t => n1(t.options.enabled, this) !== !1)
        }
        isDisabled() {
            return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === qc || this.state.dataUpdateCount + this.state.errorUpdateCount === 0
        }
        isStatic() {
            return this.getObserversCount() > 0 ? this.observers.some(t => Ou(t.options.staleTime, this) === "static") : !1
        }
        isStale() {
            return this.getObserversCount() > 0 ? this.observers.some(t => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
        }
        isStaleByTime(t = 0) {
            return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !t1(this.state.dataUpdatedAt, t)
        }
        onFocus() {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
            t == null || t.refetch({
                cancelRefetch: !1
            }),
                (n = T(this, ke)) == null || n.continue()
        }
        onOnline() {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnReconnect());
            t == null || t.refetch({
                cancelRefetch: !1
            }),
                (n = T(this, ke)) == null || n.continue()
        }
        addObserver(t) {
            this.observers.includes(t) || (this.observers.push(t),
                this.clearGcTimeout(),
                T(this, ut).notify({
                    type: "observerAdded",
                    query: this,
                    observer: t
                }))
        }
        removeObserver(t) {
            this.observers.includes(t) && (this.observers = this.observers.filter(n => n !== t),
                this.observers.length || (T(this, ke) && (T(this, pr) ? T(this, ke).cancel({
                    revert: !0
                }) : T(this, ke).cancelRetry()),
                    this.scheduleGc()),
                T(this, ut).notify({
                    type: "observerRemoved",
                    query: this,
                    observer: t
                }))
        }
        getObserversCount() {
            return this.observers.length
        }
        invalidate() {
            this.state.isInvalidated || Ae(this, bt, Kt).call(this, {
                type: "invalidate"
            })
        }
        async fetch(t, n) {
            var a, u, c, d, h, p, m, g, w, v, y, x;
            if (this.state.fetchStatus !== "idle" && ((a = T(this, ke)) == null ? void 0 : a.status()) !== "rejected") {
                if (this.state.data !== void 0 && (n != null && n.cancelRefetch))
                    this.cancel({
                        silent: !0
                    });
                else if (T(this, ke))
                    return T(this, ke).continueRetry(),
                        T(this, ke).promise
            }
            if (t && this.setOptions(t),
                !this.options.queryFn) {
                const E = this.observers.find(b => b.options.queryFn);
                E && this.setOptions(E.options)
            }
            const r = new AbortController
                , o = E => {
                    Object.defineProperty(E, "signal", {
                        enumerable: !0,
                        get: () => (H(this, pr, !0),
                            r.signal)
                    })
                }
                , s = () => {
                    const E = Sg(this.options, n)
                        , C = (() => {
                            const k = {
                                client: T(this, fr),
                                queryKey: this.queryKey,
                                meta: this.meta
                            };
                            return o(k),
                                k
                        }
                        )();
                    return H(this, pr, !1),
                        this.options.persister ? this.options.persister(E, C, this) : E(C)
                }
                , l = (() => {
                    const E = {
                        fetchOptions: n,
                        options: this.options,
                        queryKey: this.queryKey,
                        client: T(this, fr),
                        state: this.state,
                        fetchFn: s
                    };
                    return o(E),
                        E
                }
                )();
            (u = this.options.behavior) == null || u.onFetch(l, this),
                H(this, so, this.state),
                (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((c = l.fetchOptions) == null ? void 0 : c.meta)) && Ae(this, bt, Kt).call(this, {
                    type: "fetch",
                    meta: (d = l.fetchOptions) == null ? void 0 : d.meta
                }),
                H(this, ke, Cg({
                    initialPromise: n == null ? void 0 : n.initialPromise,
                    fn: l.fetchFn,
                    onCancel: E => {
                        E instanceof _u && E.revert && this.setState({
                            ...T(this, so),
                            fetchStatus: "idle"
                        }),
                            r.abort()
                    }
                    ,
                    onFail: (E, b) => {
                        Ae(this, bt, Kt).call(this, {
                            type: "failed",
                            failureCount: E,
                            error: b
                        })
                    }
                    ,
                    onPause: () => {
                        Ae(this, bt, Kt).call(this, {
                            type: "pause"
                        })
                    }
                    ,
                    onContinue: () => {
                        Ae(this, bt, Kt).call(this, {
                            type: "continue"
                        })
                    }
                    ,
                    retry: l.options.retry,
                    retryDelay: l.options.retryDelay,
                    networkMode: l.options.networkMode,
                    canRun: () => !0
                }));
            try {
                const E = await T(this, ke).start();
                if (E === void 0)
                    throw new Error(`${this.queryHash} data is undefined`);
                return this.setData(E),
                    (p = (h = T(this, ut).config).onSuccess) == null || p.call(h, E, this),
                    (g = (m = T(this, ut).config).onSettled) == null || g.call(m, E, this.state.error, this),
                    E
            } catch (E) {
                if (E instanceof _u) {
                    if (E.silent)
                        return T(this, ke).promise;
                    if (E.revert) {
                        if (this.state.data === void 0)
                            throw E;
                        return this.state.data
                    }
                }
                throw Ae(this, bt, Kt).call(this, {
                    type: "error",
                    error: E
                }),
                (v = (w = T(this, ut).config).onError) == null || v.call(w, E, this),
                (x = (y = T(this, ut).config).onSettled) == null || x.call(y, this.state.data, E, this),
                E
            } finally {
                this.scheduleGc()
            }
        }
    }
        ,
        dr = new WeakMap,
        so = new WeakMap,
        ut = new WeakMap,
        fr = new WeakMap,
        ke = new WeakMap,
        Cs = new WeakMap,
        pr = new WeakMap,
        bt = new WeakSet,
        Kt = function (t) {
            const n = r => {
                switch (t.type) {
                    case "failed":
                        return {
                            ...r,
                            fetchFailureCount: t.failureCount,
                            fetchFailureReason: t.error
                        };
                    case "pause":
                        return {
                            ...r,
                            fetchStatus: "paused"
                        };
                    case "continue":
                        return {
                            ...r,
                            fetchStatus: "fetching"
                        };
                    case "fetch":
                        return {
                            ...r,
                            ...g1(r.data, this.options),
                            fetchMeta: t.meta ?? null
                        };
                    case "success":
                        const o = {
                            ...r,
                            ...Kf(t.data, t.dataUpdatedAt),
                            dataUpdateCount: r.dataUpdateCount + 1,
                            ...!t.manual && {
                                fetchStatus: "idle",
                                fetchFailureCount: 0,
                                fetchFailureReason: null
                            }
                        };
                        return H(this, so, t.manual ? o : void 0),
                            o;
                    case "error":
                        const s = t.error;
                        return {
                            ...r,
                            error: s,
                            errorUpdateCount: r.errorUpdateCount + 1,
                            errorUpdatedAt: Date.now(),
                            fetchFailureCount: r.fetchFailureCount + 1,
                            fetchFailureReason: s,
                            fetchStatus: "idle",
                            status: "error",
                            isInvalidated: !0
                        };
                    case "invalidate":
                        return {
                            ...r,
                            isInvalidated: !0
                        };
                    case "setState":
                        return {
                            ...r,
                            ...t.state
                        }
                }
            }
                ;
            this.state = n(this.state),
                $e.batch(() => {
                    this.observers.forEach(r => {
                        r.onQueryUpdate()
                    }
                    ),
                        T(this, ut).notify({
                            query: this,
                            type: "updated",
                            action: t
                        })
                }
                )
        }
        ,
        Vp);
function g1(e, t) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: bg(t.networkMode) ? "fetching" : "paused",
        ...e === void 0 && {
            error: null,
            status: "pending"
        }
    }
}
function Kf(e, t) {
    return {
        data: e,
        dataUpdatedAt: t ?? Date.now(),
        error: null,
        isInvalidated: !1,
        status: "success"
    }
}
function qf(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData
        , n = t !== void 0
        , r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
    }
}
function Yf(e) {
    return {
        onFetch: (t, n) => {
            var c, d, h, p, m;
            const r = t.options
                , o = (h = (d = (c = t.fetchOptions) == null ? void 0 : c.meta) == null ? void 0 : d.fetchMore) == null ? void 0 : h.direction
                , s = ((p = t.state.data) == null ? void 0 : p.pages) || []
                , i = ((m = t.state.data) == null ? void 0 : m.pageParams) || [];
            let l = {
                pages: [],
                pageParams: []
            }
                , a = 0;
            const u = async () => {
                let g = !1;
                const w = x => {
                    a1(x, () => t.signal, () => g = !0)
                }
                    , v = Sg(t.options, t.fetchOptions)
                    , y = async (x, E, b) => {
                        if (g)
                            return Promise.reject();
                        if (E == null && x.pages.length)
                            return Promise.resolve(x);
                        const k = (() => {
                            const U = {
                                client: t.client,
                                queryKey: t.queryKey,
                                pageParam: E,
                                direction: b ? "backward" : "forward",
                                meta: t.options.meta
                            };
                            return w(U),
                                U
                        }
                        )()
                            , R = await v(k)
                            , { maxPages: L } = t.options
                            , D = b ? l1 : i1;
                        return {
                            pages: D(x.pages, R, L),
                            pageParams: D(x.pageParams, E, L)
                        }
                    }
                    ;
                if (o && s.length) {
                    const x = o === "backward"
                        , E = x ? y1 : Gf
                        , b = {
                            pages: s,
                            pageParams: i
                        }
                        , C = E(r, b);
                    l = await y(b, C, x)
                } else {
                    const x = e ?? s.length;
                    do {
                        const E = a === 0 ? i[0] ?? r.initialPageParam : Gf(r, l);
                        if (a > 0 && E == null)
                            break;
                        l = await y(l, E),
                            a++
                    } while (a < x)
                }
                return l
            }
                ;
            t.options.persister ? t.fetchFn = () => {
                var g, w;
                return (w = (g = t.options).persister) == null ? void 0 : w.call(g, u, {
                    client: t.client,
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal
                }, n)
            }
                : t.fetchFn = u
        }
    }
}
function Gf(e, { pages: t, pageParams: n }) {
    const r = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
}
function y1(e, { pages: t, pageParams: n }) {
    var r;
    return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0
}
var ks, It, De, hr, Mt, xn, Hp, v1 = (Hp = class extends kg {
    constructor(t) {
        super();
        Z(this, Mt);
        Z(this, ks);
        Z(this, It);
        Z(this, De);
        Z(this, hr);
        H(this, ks, t.client),
            this.mutationId = t.mutationId,
            H(this, De, t.mutationCache),
            H(this, It, []),
            this.state = t.state || x1(),
            this.setOptions(t.options),
            this.scheduleGc()
    }
    setOptions(t) {
        this.options = t,
            this.updateGcTime(this.options.gcTime)
    }
    get meta() {
        return this.options.meta
    }
    addObserver(t) {
        T(this, It).includes(t) || (T(this, It).push(t),
            this.clearGcTimeout(),
            T(this, De).notify({
                type: "observerAdded",
                mutation: this,
                observer: t
            }))
    }
    removeObserver(t) {
        H(this, It, T(this, It).filter(n => n !== t)),
            this.scheduleGc(),
            T(this, De).notify({
                type: "observerRemoved",
                mutation: this,
                observer: t
            })
    }
    optionalRemove() {
        T(this, It).length || (this.state.status === "pending" ? this.scheduleGc() : T(this, De).remove(this))
    }
    continue() {
        var t;
        return ((t = T(this, hr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
    }
    async execute(t) {
        var i, l, a, u, c, d, h, p, m, g, w, v, y, x, E, b, C, k;
        const n = () => {
            Ae(this, Mt, xn).call(this, {
                type: "continue"
            })
        }
            , r = {
                client: T(this, ks),
                meta: this.options.meta,
                mutationKey: this.options.mutationKey
            };
        H(this, hr, Cg({
            fn: () => this.options.mutationFn ? this.options.mutationFn(t, r) : Promise.reject(new Error("No mutationFn found")),
            onFail: (R, L) => {
                Ae(this, Mt, xn).call(this, {
                    type: "failed",
                    failureCount: R,
                    error: L
                })
            }
            ,
            onPause: () => {
                Ae(this, Mt, xn).call(this, {
                    type: "pause"
                })
            }
            ,
            onContinue: n,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => T(this, De).canRun(this)
        }));
        const o = this.state.status === "pending"
            , s = !T(this, hr).canStart();
        try {
            if (o)
                n();
            else {
                Ae(this, Mt, xn).call(this, {
                    type: "pending",
                    variables: t,
                    isPaused: s
                }),
                    T(this, De).config.onMutate && await T(this, De).config.onMutate(t, this, r);
                const L = await ((l = (i = this.options).onMutate) == null ? void 0 : l.call(i, t, r));
                L !== this.state.context && Ae(this, Mt, xn).call(this, {
                    type: "pending",
                    context: L,
                    variables: t,
                    isPaused: s
                })
            }
            const R = await T(this, hr).start();
            return await ((u = (a = T(this, De).config).onSuccess) == null ? void 0 : u.call(a, R, t, this.state.context, this, r)),
                await ((d = (c = this.options).onSuccess) == null ? void 0 : d.call(c, R, t, this.state.context, r)),
                await ((p = (h = T(this, De).config).onSettled) == null ? void 0 : p.call(h, R, null, this.state.variables, this.state.context, this, r)),
                await ((g = (m = this.options).onSettled) == null ? void 0 : g.call(m, R, null, t, this.state.context, r)),
                Ae(this, Mt, xn).call(this, {
                    type: "success",
                    data: R
                }),
                R
        } catch (R) {
            try {
                await ((v = (w = T(this, De).config).onError) == null ? void 0 : v.call(w, R, t, this.state.context, this, r))
            } catch (L) {
                Promise.reject(L)
            }
            try {
                await ((x = (y = this.options).onError) == null ? void 0 : x.call(y, R, t, this.state.context, r))
            } catch (L) {
                Promise.reject(L)
            }
            try {
                await ((b = (E = T(this, De).config).onSettled) == null ? void 0 : b.call(E, void 0, R, this.state.variables, this.state.context, this, r))
            } catch (L) {
                Promise.reject(L)
            }
            try {
                await ((k = (C = this.options).onSettled) == null ? void 0 : k.call(C, void 0, R, t, this.state.context, r))
            } catch (L) {
                Promise.reject(L)
            }
            throw Ae(this, Mt, xn).call(this, {
                type: "error",
                error: R
            }),
            R
        } finally {
            T(this, De).runNext(this)
        }
    }
}
    ,
    ks = new WeakMap,
    It = new WeakMap,
    De = new WeakMap,
    hr = new WeakMap,
    Mt = new WeakSet,
    xn = function (t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return {
                        ...r,
                        failureCount: t.failureCount,
                        failureReason: t.error
                    };
                case "pause":
                    return {
                        ...r,
                        isPaused: !0
                    };
                case "continue":
                    return {
                        ...r,
                        isPaused: !1
                    };
                case "pending":
                    return {
                        ...r,
                        context: t.context,
                        data: void 0,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        isPaused: t.isPaused,
                        status: "pending",
                        variables: t.variables,
                        submittedAt: Date.now()
                    };
                case "success":
                    return {
                        ...r,
                        data: t.data,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        status: "success",
                        isPaused: !1
                    };
                case "error":
                    return {
                        ...r,
                        data: void 0,
                        error: t.error,
                        failureCount: r.failureCount + 1,
                        failureReason: t.error,
                        isPaused: !1,
                        status: "error"
                    }
            }
        }
            ;
        this.state = n(this.state),
            $e.batch(() => {
                T(this, It).forEach(r => {
                    r.onMutationUpdate(t)
                }
                ),
                    T(this, De).notify({
                        mutation: this,
                        type: "updated",
                        action: t
                    })
            }
            )
    }
    ,
    Hp);
function x1() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
    }
}
var Gt, Ct, Ps, Wp, w1 = (Wp = class extends Tl {
    constructor(t = {}) {
        super();
        Z(this, Gt);
        Z(this, Ct);
        Z(this, Ps);
        this.config = t,
            H(this, Gt, new Set),
            H(this, Ct, new Map),
            H(this, Ps, 0)
    }
    build(t, n, r) {
        const o = new v1({
            client: t,
            mutationCache: this,
            mutationId: ++Ws(this, Ps)._,
            options: t.defaultMutationOptions(n),
            state: r
        });
        return this.add(o),
            o
    }
    add(t) {
        T(this, Gt).add(t);
        const n = ui(t);
        if (typeof n == "string") {
            const r = T(this, Ct).get(n);
            r ? r.push(t) : T(this, Ct).set(n, [t])
        }
        this.notify({
            type: "added",
            mutation: t
        })
    }
    remove(t) {
        if (T(this, Gt).delete(t)) {
            const n = ui(t);
            if (typeof n == "string") {
                const r = T(this, Ct).get(n);
                if (r)
                    if (r.length > 1) {
                        const o = r.indexOf(t);
                        o !== -1 && r.splice(o, 1)
                    } else
                        r[0] === t && T(this, Ct).delete(n)
            }
        }
        this.notify({
            type: "removed",
            mutation: t
        })
    }
    canRun(t) {
        const n = ui(t);
        if (typeof n == "string") {
            const r = T(this, Ct).get(n)
                , o = r == null ? void 0 : r.find(s => s.state.status === "pending");
            return !o || o === t
        } else
            return !0
    }
    runNext(t) {
        var r;
        const n = ui(t);
        if (typeof n == "string") {
            const o = (r = T(this, Ct).get(n)) == null ? void 0 : r.find(s => s !== t && s.state.isPaused);
            return (o == null ? void 0 : o.continue()) ?? Promise.resolve()
        } else
            return Promise.resolve()
    }
    clear() {
        $e.batch(() => {
            T(this, Gt).forEach(t => {
                this.notify({
                    type: "removed",
                    mutation: t
                })
            }
            ),
                T(this, Gt).clear(),
                T(this, Ct).clear()
        }
        )
    }
    getAll() {
        return Array.from(T(this, Gt))
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return this.getAll().find(r => Hf(n, r))
    }
    findAll(t = {}) {
        return this.getAll().filter(n => Hf(t, n))
    }
    notify(t) {
        $e.batch(() => {
            this.listeners.forEach(n => {
                n(t)
            }
            )
        }
        )
    }
    resumePausedMutations() {
        const t = this.getAll().filter(n => n.state.isPaused);
        return $e.batch(() => Promise.all(t.map(n => n.continue().catch(Et))))
    }
}
    ,
    Gt = new WeakMap,
    Ct = new WeakMap,
    Ps = new WeakMap,
    Wp);
function ui(e) {
    var t;
    return (t = e.options.scope) == null ? void 0 : t.id
}
var Ft, Qp, S1 = (Qp = class extends Tl {
    constructor(t = {}) {
        super();
        Z(this, Ft);
        this.config = t,
            H(this, Ft, new Map)
    }
    build(t, n, r) {
        const o = n.queryKey
            , s = n.queryHash ?? Kc(o, n);
        let i = this.get(s);
        return i || (i = new m1({
            client: t,
            queryKey: o,
            queryHash: s,
            options: t.defaultQueryOptions(n),
            state: r,
            defaultOptions: t.getQueryDefaults(o)
        }),
            this.add(i)),
            i
    }
    add(t) {
        T(this, Ft).has(t.queryHash) || (T(this, Ft).set(t.queryHash, t),
            this.notify({
                type: "added",
                query: t
            }))
    }
    remove(t) {
        const n = T(this, Ft).get(t.queryHash);
        n && (t.destroy(),
            n === t && T(this, Ft).delete(t.queryHash),
            this.notify({
                type: "removed",
                query: t
            }))
    }
    clear() {
        $e.batch(() => {
            this.getAll().forEach(t => {
                this.remove(t)
            }
            )
        }
        )
    }
    get(t) {
        return T(this, Ft).get(t)
    }
    getAll() {
        return [...T(this, Ft).values()]
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return this.getAll().find(r => Vf(n, r))
    }
    findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter(r => Vf(t, r)) : n
    }
    notify(t) {
        $e.batch(() => {
            this.listeners.forEach(n => {
                n(t)
            }
            )
        }
        )
    }
    onFocus() {
        $e.batch(() => {
            this.getAll().forEach(t => {
                t.onFocus()
            }
            )
        }
        )
    }
    onOnline() {
        $e.batch(() => {
            this.getAll().forEach(t => {
                t.onOnline()
            }
            )
        }
        )
    }
}
    ,
    Ft = new WeakMap,
    Qp), ye, Nn, Tn, io, lo, Rn, ao, uo, Kp, E1 = (Kp = class {
        constructor(e = {}) {
            Z(this, ye);
            Z(this, Nn);
            Z(this, Tn);
            Z(this, io);
            Z(this, lo);
            Z(this, Rn);
            Z(this, ao);
            Z(this, uo);
            H(this, ye, e.queryCache || new S1),
                H(this, Nn, e.mutationCache || new w1),
                H(this, Tn, e.defaultOptions || {}),
                H(this, io, new Map),
                H(this, lo, new Map),
                H(this, Rn, 0)
        }
        mount() {
            Ws(this, Rn)._++,
                T(this, Rn) === 1 && (H(this, ao, Eg.subscribe(async e => {
                    e && (await this.resumePausedMutations(),
                        T(this, ye).onFocus())
                }
                )),
                    H(this, uo, ol.subscribe(async e => {
                        e && (await this.resumePausedMutations(),
                            T(this, ye).onOnline())
                    }
                    )))
        }
        unmount() {
            var e, t;
            Ws(this, Rn)._--,
                T(this, Rn) === 0 && ((e = T(this, ao)) == null || e.call(this),
                    H(this, ao, void 0),
                    (t = T(this, uo)) == null || t.call(this),
                    H(this, uo, void 0))
        }
        isFetching(e) {
            return T(this, ye).findAll({
                ...e,
                fetchStatus: "fetching"
            }).length
        }
        isMutating(e) {
            return T(this, Nn).findAll({
                ...e,
                status: "pending"
            }).length
        }
        getQueryData(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = T(this, ye).get(t.queryHash)) == null ? void 0 : n.state.data
        }
        ensureQueryData(e) {
            const t = this.defaultQueryOptions(e)
                , n = T(this, ye).build(this, t)
                , r = n.state.data;
            return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(Ou(t.staleTime, n)) && this.prefetchQuery(t),
                Promise.resolve(r))
        }
        getQueriesData(e) {
            return T(this, ye).findAll(e).map(({ queryKey: t, state: n }) => {
                const r = n.data;
                return [t, r]
            }
            )
        }
        setQueryData(e, t, n) {
            const r = this.defaultQueryOptions({
                queryKey: e
            })
                , o = T(this, ye).get(r.queryHash)
                , s = o == null ? void 0 : o.state.data
                , i = Zw(t, s);
            if (i !== void 0)
                return T(this, ye).build(this, r).setData(i, {
                    ...n,
                    manual: !0
                })
        }
        setQueriesData(e, t, n) {
            return $e.batch(() => T(this, ye).findAll(e).map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)]))
        }
        getQueryState(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = T(this, ye).get(t.queryHash)) == null ? void 0 : n.state
        }
        removeQueries(e) {
            const t = T(this, ye);
            $e.batch(() => {
                t.findAll(e).forEach(n => {
                    t.remove(n)
                }
                )
            }
            )
        }
        resetQueries(e, t) {
            const n = T(this, ye);
            return $e.batch(() => (n.findAll(e).forEach(r => {
                r.reset()
            }
            ),
                this.refetchQueries({
                    type: "active",
                    ...e
                }, t)))
        }
        cancelQueries(e, t = {}) {
            const n = {
                revert: !0,
                ...t
            }
                , r = $e.batch(() => T(this, ye).findAll(e).map(o => o.cancel(n)));
            return Promise.all(r).then(Et).catch(Et)
        }
        invalidateQueries(e, t = {}) {
            return $e.batch(() => (T(this, ye).findAll(e).forEach(n => {
                n.invalidate()
            }
            ),
                (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
                    ...e,
                    type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
                }, t)))
        }
        refetchQueries(e, t = {}) {
            const n = {
                ...t,
                cancelRefetch: t.cancelRefetch ?? !0
            }
                , r = $e.batch(() => T(this, ye).findAll(e).filter(o => !o.isDisabled() && !o.isStatic()).map(o => {
                    let s = o.fetch(void 0, n);
                    return n.throwOnError || (s = s.catch(Et)),
                        o.state.fetchStatus === "paused" ? Promise.resolve() : s
                }
                ));
            return Promise.all(r).then(Et)
        }
        fetchQuery(e) {
            const t = this.defaultQueryOptions(e);
            t.retry === void 0 && (t.retry = !1);
            const n = T(this, ye).build(this, t);
            return n.isStaleByTime(Ou(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data)
        }
        prefetchQuery(e) {
            return this.fetchQuery(e).then(Et).catch(Et)
        }
        fetchInfiniteQuery(e) {
            return e.behavior = Yf(e.pages),
                this.fetchQuery(e)
        }
        prefetchInfiniteQuery(e) {
            return this.fetchInfiniteQuery(e).then(Et).catch(Et)
        }
        ensureInfiniteQueryData(e) {
            return e.behavior = Yf(e.pages),
                this.ensureQueryData(e)
        }
        resumePausedMutations() {
            return ol.isOnline() ? T(this, Nn).resumePausedMutations() : Promise.resolve()
        }
        getQueryCache() {
            return T(this, ye)
        }
        getMutationCache() {
            return T(this, Nn)
        }
        getDefaultOptions() {
            return T(this, Tn)
        }
        setDefaultOptions(e) {
            H(this, Tn, e)
        }
        setQueryDefaults(e, t) {
            T(this, io).set(Ss(e), {
                queryKey: e,
                defaultOptions: t
            })
        }
        getQueryDefaults(e) {
            const t = [...T(this, io).values()]
                , n = {};
            return t.forEach(r => {
                Es(e, r.queryKey) && Object.assign(n, r.defaultOptions)
            }
            ),
                n
        }
        setMutationDefaults(e, t) {
            T(this, lo).set(Ss(e), {
                mutationKey: e,
                defaultOptions: t
            })
        }
        getMutationDefaults(e) {
            const t = [...T(this, lo).values()]
                , n = {};
            return t.forEach(r => {
                Es(e, r.mutationKey) && Object.assign(n, r.defaultOptions)
            }
            ),
                n
        }
        defaultQueryOptions(e) {
            if (e._defaulted)
                return e;
            const t = {
                ...T(this, Tn).queries,
                ...this.getQueryDefaults(e.queryKey),
                ...e,
                _defaulted: !0
            };
            return t.queryHash || (t.queryHash = Kc(t.queryKey, t)),
                t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"),
                t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
                !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
                t.queryFn === qc && (t.enabled = !1),
                t
        }
        defaultMutationOptions(e) {
            return e != null && e._defaulted ? e : {
                ...T(this, Tn).mutations,
                ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
                ...e,
                _defaulted: !0
            }
        }
        clear() {
            T(this, ye).clear(),
                T(this, Nn).clear()
        }
    }
        ,
        ye = new WeakMap,
        Nn = new WeakMap,
        Tn = new WeakMap,
        io = new WeakMap,
        lo = new WeakMap,
        Rn = new WeakMap,
        ao = new WeakMap,
        uo = new WeakMap,
        Kp), b1 = S.createContext(void 0), C1 = ({ client: e, children: t }) => (S.useEffect(() => (e.mount(),
            () => {
                e.unmount()
            }
        ), [e]),
            f.jsx(b1.Provider, {
                value: e,
                children: t
            }));
const Pg = S.createContext()
    , k1 = ({ children: e }) => {
        const [t, n] = S.useState([])
            , [r, o] = S.useState(!1)
            , s = d => {
                n(h => h.find(m => m.product.id === d.id) ? h.map(m => m.product.id === d.id ? {
                    ...m,
                    quantity: m.quantity + 1
                } : m) : [...h, {
                    product: d,
                    quantity: 1
                }]),
                    o(!0)
            }
            , i = d => {
                n(h => h.filter(p => p.product.id !== d))
            }
            , l = (d, h) => {
                if (h <= 0) {
                    i(d);
                    return
                }
                n(p => p.map(m => m.product.id === d ? {
                    ...m,
                    quantity: h
                } : m))
            }
            , a = () => {
                n([])
            }
            , u = S.useMemo(() => t.reduce((d, h) => d + h.quantity, 0), [t])
            , c = S.useMemo(() => t.reduce((d, h) => d + h.product.price * h.quantity, 0), [t]);
        return f.jsx(Pg.Provider, {
            value: {
                items: t,
                addToCart: s,
                removeFromCart: i,
                updateQuantity: l,
                clearCart: a,
                totalItems: u,
                subtotal: c,
                isCartOpen: r,
                setIsCartOpen: o
            },
            children: e
        })
    }
    , jl = () => {
        const e = S.useContext(Pg);
        if (!e)
            throw new Error("useCart must be used inside CartProvider");
        return e
    }
    , Ng = S.createContext()
    , P1 = ({ children: e }) => {
        const [t, n] = S.useState([])
            , r = {
                DAILY: 1,
                EVERY_3_DAYS: 3,
                EVERY_4_DAYS: 4,
                WEEKLY: 7
            }
            , o = [1e3, 1500, 2e3]
            , s = 30
            , i = (h, p, m) => {
                if (!r[p])
                    throw new Error("Invalid payment frequency");
                if (!o.includes(m))
                    throw new Error("Invalid daily payment amount");
                const g = h.installmentTotal
                    , w = r[p]
                    , v = Math.ceil(g / m);
                if (v * w > s)
                    throw new Error("Plan exceeds 30 day maximum");
                const x = [];
                let E = g;
                for (let C = 0; C < v; C++) {
                    const k = Math.min(m, E);
                    x.push({
                        paymentNumber: C + 1,
                        amount: k,
                        paid: !1,
                        dueDate: new Date(Date.now() + C * w * 864e5)
                    }),
                        E -= k
                }
                const b = {
                    id: Date.now(),
                    product: h,
                    total: g,
                    paidAmount: 0,
                    balance: g,
                    schedule: x,
                    paymentHistory: [],
                    status: "CREATED"
                };
                n(C => [...C, b])
            }
            , l = h => {
                n(p => p.map(m => {
                    if (m.id !== h)
                        return m;
                    const g = m.schedule.find(x => !x.paid);
                    if (!g)
                        return m;
                    g.paid = !0;
                    const w = m.paidAmount + g.amount
                        , v = m.total - w
                        , y = v <= 0 ? "COMPLETED" : "PAYMENT_ONGOING";
                    return {
                        ...m,
                        paidAmount: w,
                        balance: v,
                        status: y,
                        paymentHistory: [...m.paymentHistory, {
                            amount: g.amount,
                            date: new Date
                        }]
                    }
                }
                ))
            }
            , a = h => {
                n(p => p.map(m => m.id === h && m.status === "COMPLETED" ? {
                    ...m,
                    status: "READY_FOR_DELIVERY"
                } : m))
            }
            , u = h => {
                n(p => p.map(m => m.id === h ? {
                    ...m,
                    status: "DELIVERED"
                } : m))
            }
            , c = h => {
                const p = t.find(m => m.id === h);
                return p && p.schedule.find(m => !m.paid) || null
            }
            , d = h => {
                const p = t.find(g => g.id === h);
                if (!p)
                    return [];
                const m = new Date;
                return p.schedule.filter(g => !g.paid && g.dueDate < m)
            }
            ;
        return f.jsx(Ng.Provider, {
            value: {
                orders: t,
                createPlan: i,
                makePayment: l,
                markReadyForDelivery: a,
                markDelivered: u,
                getNextPayment: c,
                getOverduePayments: d,
                DAILY_OPTIONS: o
            },
            children: e
        })
    }
    , Ol = () => S.useContext(Ng);
function Tg(e, t) {
    return function () {
        return e.apply(t, arguments)
    }
}
const { toString: N1 } = Object.prototype
    , { getPrototypeOf: Yc } = Object
    , { iterator: Al, toStringTag: Rg } = Symbol
    , _l = (e => t => {
        const n = N1.call(t);
        return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
    }
    )(Object.create(null))
    , _t = e => (e = e.toLowerCase(),
        t => _l(t) === e)
    , Ll = e => t => typeof t === e
    , { isArray: ko } = Array
    , vo = Ll("undefined");
function Ls(e) {
    return e !== null && !vo(e) && e.constructor !== null && !vo(e.constructor) && Ge(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const jg = _t("ArrayBuffer");
function T1(e) {
    let t;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && jg(e.buffer),
        t
}
const R1 = Ll("string")
    , Ge = Ll("function")
    , Og = Ll("number")
    , Ds = e => e !== null && typeof e == "object"
    , j1 = e => e === !0 || e === !1
    , Ni = e => {
        if (_l(e) !== "object")
            return !1;
        const t = Yc(e);
        return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Rg in e) && !(Al in e)
    }
    , O1 = e => {
        if (!Ds(e) || Ls(e))
            return !1;
        try {
            return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype
        } catch {
            return !1
        }
    }
    , A1 = _t("Date")
    , _1 = _t("File")
    , L1 = _t("Blob")
    , D1 = _t("FileList")
    , I1 = e => Ds(e) && Ge(e.pipe)
    , M1 = e => {
        let t;
        return e && (typeof FormData == "function" && e instanceof FormData || Ge(e.append) && ((t = _l(e)) === "formdata" || t === "object" && Ge(e.toString) && e.toString() === "[object FormData]"))
    }
    , F1 = _t("URLSearchParams")
    , [z1, $1, B1, U1] = ["ReadableStream", "Request", "Response", "Headers"].map(_t)
    , V1 = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Is(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > "u")
        return;
    let r, o;
    if (typeof e != "object" && (e = [e]),
        ko(e))
        for (r = 0,
            o = e.length; r < o; r++)
            t.call(null, e[r], r, e);
    else {
        if (Ls(e))
            return;
        const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e)
            , i = s.length;
        let l;
        for (r = 0; r < i; r++)
            l = s[r],
                t.call(null, e[l], l, e)
    }
}
function Ag(e, t) {
    if (Ls(e))
        return null;
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length, o;
    for (; r-- > 0;)
        if (o = n[r],
            t === o.toLowerCase())
            return o;
    return null
}
const ar = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global
    , _g = e => !vo(e) && e !== ar;
function Lu() {
    const { caseless: e, skipUndefined: t } = _g(this) && this || {}
        , n = {}
        , r = (o, s) => {
            if (s === "__proto__" || s === "constructor" || s === "prototype")
                return;
            const i = e && Ag(n, s) || s;
            Ni(n[i]) && Ni(o) ? n[i] = Lu(n[i], o) : Ni(o) ? n[i] = Lu({}, o) : ko(o) ? n[i] = o.slice() : (!t || !vo(o)) && (n[i] = o)
        }
        ;
    for (let o = 0, s = arguments.length; o < s; o++)
        arguments[o] && Is(arguments[o], r);
    return n
}
const H1 = (e, t, n, { allOwnKeys: r } = {}) => (Is(t, (o, s) => {
    n && Ge(o) ? Object.defineProperty(e, s, {
        value: Tg(o, n),
        writable: !0,
        enumerable: !0,
        configurable: !0
    }) : Object.defineProperty(e, s, {
        value: o,
        writable: !0,
        enumerable: !0,
        configurable: !0
    })
}
    , {
        allOwnKeys: r
    }),
    e)
    , W1 = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)),
        e)
    , Q1 = (e, t, n, r) => {
        e.prototype = Object.create(t.prototype, r),
            Object.defineProperty(e.prototype, "constructor", {
                value: e,
                writable: !0,
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e, "super", {
                value: t.prototype
            }),
            n && Object.assign(e.prototype, n)
    }
    , K1 = (e, t, n, r) => {
        let o, s, i;
        const l = {};
        if (t = t || {},
            e == null)
            return t;
        do {
            for (o = Object.getOwnPropertyNames(e),
                s = o.length; s-- > 0;)
                i = o[s],
                    (!r || r(i, e, t)) && !l[i] && (t[i] = e[i],
                        l[i] = !0);
            e = n !== !1 && Yc(e)
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t
    }
    , q1 = (e, t, n) => {
        e = String(e),
            (n === void 0 || n > e.length) && (n = e.length),
            n -= t.length;
        const r = e.indexOf(t, n);
        return r !== -1 && r === n
    }
    , Y1 = e => {
        if (!e)
            return null;
        if (ko(e))
            return e;
        let t = e.length;
        if (!Og(t))
            return null;
        const n = new Array(t);
        for (; t-- > 0;)
            n[t] = e[t];
        return n
    }
    , G1 = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && Yc(Uint8Array))
    , X1 = (e, t) => {
        const r = (e && e[Al]).call(e);
        let o;
        for (; (o = r.next()) && !o.done;) {
            const s = o.value;
            t.call(e, s[0], s[1])
        }
    }
    , J1 = (e, t) => {
        let n;
        const r = [];
        for (; (n = e.exec(t)) !== null;)
            r.push(n);
        return r
    }
    , Z1 = _t("HTMLFormElement")
    , eS = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
        return r.toUpperCase() + o
    })
    , Xf = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype)
    , tS = _t("RegExp")
    , Lg = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e)
            , r = {};
        Is(n, (o, s) => {
            let i;
            (i = t(o, s, e)) !== !1 && (r[s] = i || o)
        }
        ),
            Object.defineProperties(e, r)
    }
    , nS = e => {
        Lg(e, (t, n) => {
            if (Ge(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
                return !1;
            const r = e[n];
            if (Ge(r)) {
                if (t.enumerable = !1,
                    "writable" in t) {
                    t.writable = !1;
                    return
                }
                t.set || (t.set = () => {
                    throw Error("Can not rewrite read-only method '" + n + "'")
                }
                )
            }
        }
        )
    }
    , rS = (e, t) => {
        const n = {}
            , r = o => {
                o.forEach(s => {
                    n[s] = !0
                }
                )
            }
            ;
        return ko(e) ? r(e) : r(String(e).split(t)),
            n
    }
    , oS = () => { }
    , sS = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function iS(e) {
    return !!(e && Ge(e.append) && e[Rg] === "FormData" && e[Al])
}
const lS = e => {
    const t = new Array(10)
        , n = (r, o) => {
            if (Ds(r)) {
                if (t.indexOf(r) >= 0)
                    return;
                if (Ls(r))
                    return r;
                if (!("toJSON" in r)) {
                    t[o] = r;
                    const s = ko(r) ? [] : {};
                    return Is(r, (i, l) => {
                        const a = n(i, o + 1);
                        !vo(a) && (s[l] = a)
                    }
                    ),
                        t[o] = void 0,
                        s
                }
            }
            return r
        }
        ;
    return n(e, 0)
}
    , aS = _t("AsyncFunction")
    , uS = e => e && (Ds(e) || Ge(e)) && Ge(e.then) && Ge(e.catch)
    , Dg = ((e, t) => e ? setImmediate : t ? ((n, r) => (ar.addEventListener("message", ({ source: o, data: s }) => {
        o === ar && s === n && r.length && r.shift()()
    }
        , !1),
        o => {
            r.push(o),
                ar.postMessage(n, "*")
        }
    ))(`axios@${Math.random()}`, []) : n => setTimeout(n))(typeof setImmediate == "function", Ge(ar.postMessage))
    , cS = typeof queueMicrotask < "u" ? queueMicrotask.bind(ar) : typeof process < "u" && process.nextTick || Dg
    , dS = e => e != null && Ge(e[Al])
    , P = {
        isArray: ko,
        isArrayBuffer: jg,
        isBuffer: Ls,
        isFormData: M1,
        isArrayBufferView: T1,
        isString: R1,
        isNumber: Og,
        isBoolean: j1,
        isObject: Ds,
        isPlainObject: Ni,
        isEmptyObject: O1,
        isReadableStream: z1,
        isRequest: $1,
        isResponse: B1,
        isHeaders: U1,
        isUndefined: vo,
        isDate: A1,
        isFile: _1,
        isBlob: L1,
        isRegExp: tS,
        isFunction: Ge,
        isStream: I1,
        isURLSearchParams: F1,
        isTypedArray: G1,
        isFileList: D1,
        forEach: Is,
        merge: Lu,
        extend: H1,
        trim: V1,
        stripBOM: W1,
        inherits: Q1,
        toFlatObject: K1,
        kindOf: _l,
        kindOfTest: _t,
        endsWith: q1,
        toArray: Y1,
        forEachEntry: X1,
        matchAll: J1,
        isHTMLForm: Z1,
        hasOwnProperty: Xf,
        hasOwnProp: Xf,
        reduceDescriptors: Lg,
        freezeMethods: nS,
        toObjectSet: rS,
        toCamelCase: eS,
        noop: oS,
        toFiniteNumber: sS,
        findKey: Ag,
        global: ar,
        isContextDefined: _g,
        isSpecCompliantForm: iS,
        toJSONObject: lS,
        isAsyncFn: aS,
        isThenable: uS,
        setImmediate: Dg,
        asap: cS,
        isIterable: dS
    };
let V = class Ig extends Error {
    static from(t, n, r, o, s, i) {
        const l = new Ig(t.message, n || t.code, r, o, s);
        return l.cause = t,
            l.name = t.name,
            i && Object.assign(l, i),
            l
    }
    constructor(t, n, r, o, s) {
        super(t),
            this.name = "AxiosError",
            this.isAxiosError = !0,
            n && (this.code = n),
            r && (this.config = r),
            o && (this.request = o),
            s && (this.response = s,
                this.status = s.status)
    }
    toJSON() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: P.toJSONObject(this.config),
            code: this.code,
            status: this.status
        }
    }
}
    ;
V.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
V.ERR_BAD_OPTION = "ERR_BAD_OPTION";
V.ECONNABORTED = "ECONNABORTED";
V.ETIMEDOUT = "ETIMEDOUT";
V.ERR_NETWORK = "ERR_NETWORK";
V.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
V.ERR_DEPRECATED = "ERR_DEPRECATED";
V.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
V.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
V.ERR_CANCELED = "ERR_CANCELED";
V.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
V.ERR_INVALID_URL = "ERR_INVALID_URL";
const fS = null;
function Du(e) {
    return P.isPlainObject(e) || P.isArray(e)
}
function Mg(e) {
    return P.endsWith(e, "[]") ? e.slice(0, -2) : e
}
function Jf(e, t, n) {
    return e ? e.concat(t).map(function (o, s) {
        return o = Mg(o),
            !n && s ? "[" + o + "]" : o
    }).join(n ? "." : "") : t
}
function pS(e) {
    return P.isArray(e) && !e.some(Du)
}
const hS = P.toFlatObject(P, {}, null, function (t) {
    return /^is[A-Z]/.test(t)
});
function Dl(e, t, n) {
    if (!P.isObject(e))
        throw new TypeError("target must be an object");
    t = t || new FormData,
        n = P.toFlatObject(n, {
            metaTokens: !0,
            dots: !1,
            indexes: !1
        }, !1, function (g, w) {
            return !P.isUndefined(w[g])
        });
    const r = n.metaTokens
        , o = n.visitor || c
        , s = n.dots
        , i = n.indexes
        , a = (n.Blob || typeof Blob < "u" && Blob) && P.isSpecCompliantForm(t);
    if (!P.isFunction(o))
        throw new TypeError("visitor must be a function");
    function u(m) {
        if (m === null)
            return "";
        if (P.isDate(m))
            return m.toISOString();
        if (P.isBoolean(m))
            return m.toString();
        if (!a && P.isBlob(m))
            throw new V("Blob is not supported. Use a Buffer instead.");
        return P.isArrayBuffer(m) || P.isTypedArray(m) ? a && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m
    }
    function c(m, g, w) {
        let v = m;
        if (m && !w && typeof m == "object") {
            if (P.endsWith(g, "{}"))
                g = r ? g : g.slice(0, -2),
                    m = JSON.stringify(m);
            else if (P.isArray(m) && pS(m) || (P.isFileList(m) || P.endsWith(g, "[]")) && (v = P.toArray(m)))
                return g = Mg(g),
                    v.forEach(function (x, E) {
                        !(P.isUndefined(x) || x === null) && t.append(i === !0 ? Jf([g], E, s) : i === null ? g : g + "[]", u(x))
                    }),
                    !1
        }
        return Du(m) ? !0 : (t.append(Jf(w, g, s), u(m)),
            !1)
    }
    const d = []
        , h = Object.assign(hS, {
            defaultVisitor: c,
            convertValue: u,
            isVisitable: Du
        });
    function p(m, g) {
        if (!P.isUndefined(m)) {
            if (d.indexOf(m) !== -1)
                throw Error("Circular reference detected in " + g.join("."));
            d.push(m),
                P.forEach(m, function (v, y) {
                    (!(P.isUndefined(v) || v === null) && o.call(t, v, P.isString(y) ? y.trim() : y, g, h)) === !0 && p(v, g ? g.concat(y) : [y])
                }),
                d.pop()
        }
    }
    if (!P.isObject(e))
        throw new TypeError("data must be an object");
    return p(e),
        t
}
function Zf(e) {
    const t = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
        return t[r]
    })
}
function Gc(e, t) {
    this._pairs = [],
        e && Dl(e, this, t)
}
const Fg = Gc.prototype;
Fg.append = function (t, n) {
    this._pairs.push([t, n])
}
    ;
Fg.toString = function (t) {
    const n = t ? function (r) {
        return t.call(this, r, Zf)
    }
        : Zf;
    return this._pairs.map(function (o) {
        return n(o[0]) + "=" + n(o[1])
    }, "").join("&")
}
    ;
function mS(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+")
}
function zg(e, t, n) {
    if (!t)
        return e;
    const r = n && n.encode || mS
        , o = P.isFunction(n) ? {
            serialize: n
        } : n
        , s = o && o.serialize;
    let i;
    if (s ? i = s(t, o) : i = P.isURLSearchParams(t) ? t.toString() : new Gc(t, o).toString(r),
        i) {
        const l = e.indexOf("#");
        l !== -1 && (e = e.slice(0, l)),
            e += (e.indexOf("?") === -1 ? "?" : "&") + i
    }
    return e
}
class ep {
    constructor() {
        this.handlers = []
    }
    use(t, n, r) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: r ? r.synchronous : !1,
            runWhen: r ? r.runWhen : null
        }),
            this.handlers.length - 1
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(t) {
        P.forEach(this.handlers, function (r) {
            r !== null && t(r)
        })
    }
}
const Xc = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0
}
    , gS = typeof URLSearchParams < "u" ? URLSearchParams : Gc
    , yS = typeof FormData < "u" ? FormData : null
    , vS = typeof Blob < "u" ? Blob : null
    , xS = {
        isBrowser: !0,
        classes: {
            URLSearchParams: gS,
            FormData: yS,
            Blob: vS
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
    }
    , Jc = typeof window < "u" && typeof document < "u"
    , Iu = typeof navigator == "object" && navigator || void 0
    , wS = Jc && (!Iu || ["ReactNative", "NativeScript", "NS"].indexOf(Iu.product) < 0)
    , SS = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function"
    , ES = Jc && window.location.href || "http://localhost"
    , bS = Object.freeze(Object.defineProperty({
        __proto__: null,
        hasBrowserEnv: Jc,
        hasStandardBrowserEnv: wS,
        hasStandardBrowserWebWorkerEnv: SS,
        navigator: Iu,
        origin: ES
    }, Symbol.toStringTag, {
        value: "Module"
    }))
    , Me = {
        ...bS,
        ...xS
    };
function CS(e, t) {
    return Dl(e, new Me.classes.URLSearchParams, {
        visitor: function (n, r, o, s) {
            return Me.isNode && P.isBuffer(n) ? (this.append(r, n.toString("base64")),
                !1) : s.defaultVisitor.apply(this, arguments)
        },
        ...t
    })
}
function kS(e) {
    return P.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
}
function PS(e) {
    const t = {}
        , n = Object.keys(e);
    let r;
    const o = n.length;
    let s;
    for (r = 0; r < o; r++)
        s = n[r],
            t[s] = e[s];
    return t
}
function $g(e) {
    function t(n, r, o, s) {
        let i = n[s++];
        if (i === "__proto__")
            return !0;
        const l = Number.isFinite(+i)
            , a = s >= n.length;
        return i = !i && P.isArray(o) ? o.length : i,
            a ? (P.hasOwnProp(o, i) ? o[i] = [o[i], r] : o[i] = r,
                !l) : ((!o[i] || !P.isObject(o[i])) && (o[i] = []),
                    t(n, r, o[i], s) && P.isArray(o[i]) && (o[i] = PS(o[i])),
                    !l)
    }
    if (P.isFormData(e) && P.isFunction(e.entries)) {
        const n = {};
        return P.forEachEntry(e, (r, o) => {
            t(kS(r), o, n, 0)
        }
        ),
            n
    }
    return null
}
function NS(e, t, n) {
    if (P.isString(e))
        try {
            return (t || JSON.parse)(e),
                P.trim(e)
        } catch (r) {
            if (r.name !== "SyntaxError")
                throw r
        }
    return (n || JSON.stringify)(e)
}
const Ms = {
    transitional: Xc,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function (t, n) {
        const r = n.getContentType() || ""
            , o = r.indexOf("application/json") > -1
            , s = P.isObject(t);
        if (s && P.isHTMLForm(t) && (t = new FormData(t)),
            P.isFormData(t))
            return o ? JSON.stringify($g(t)) : t;
        if (P.isArrayBuffer(t) || P.isBuffer(t) || P.isStream(t) || P.isFile(t) || P.isBlob(t) || P.isReadableStream(t))
            return t;
        if (P.isArrayBufferView(t))
            return t.buffer;
        if (P.isURLSearchParams(t))
            return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
                t.toString();
        let l;
        if (s) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1)
                return CS(t, this.formSerializer).toString();
            if ((l = P.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                const a = this.env && this.env.FormData;
                return Dl(l ? {
                    "files[]": t
                } : t, a && new a, this.formSerializer)
            }
        }
        return s || o ? (n.setContentType("application/json", !1),
            NS(t)) : t
    }
    ],
    transformResponse: [function (t) {
        const n = this.transitional || Ms.transitional
            , r = n && n.forcedJSONParsing
            , o = this.responseType === "json";
        if (P.isResponse(t) || P.isReadableStream(t))
            return t;
        if (t && P.isString(t) && (r && !this.responseType || o)) {
            const i = !(n && n.silentJSONParsing) && o;
            try {
                return JSON.parse(t, this.parseReviver)
            } catch (l) {
                if (i)
                    throw l.name === "SyntaxError" ? V.from(l, V.ERR_BAD_RESPONSE, this, null, this.response) : l
            }
        }
        return t
    }
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: Me.classes.FormData,
        Blob: Me.classes.Blob
    },
    validateStatus: function (t) {
        return t >= 200 && t < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
P.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
    Ms.headers[e] = {}
}
);
const TS = P.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"])
    , RS = e => {
        const t = {};
        let n, r, o;
        return e && e.split(`
`).forEach(function (i) {
            o = i.indexOf(":"),
                n = i.substring(0, o).trim().toLowerCase(),
                r = i.substring(o + 1).trim(),
                !(!n || t[n] && TS[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
        }),
            t
    }
    , tp = Symbol("internals");
function zo(e) {
    return e && String(e).trim().toLowerCase()
}
function Ti(e) {
    return e === !1 || e == null ? e : P.isArray(e) ? e.map(Ti) : String(e)
}
function jS(e) {
    const t = Object.create(null)
        , n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; r = n.exec(e);)
        t[r[1]] = r[2];
    return t
}
const OS = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ka(e, t, n, r, o) {
    if (P.isFunction(r))
        return r.call(this, t, n);
    if (o && (t = n),
        !!P.isString(t)) {
        if (P.isString(r))
            return t.indexOf(r) !== -1;
        if (P.isRegExp(r))
            return r.test(t)
    }
}
function AS(e) {
    return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}
function _S(e, t) {
    const n = P.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(r => {
        Object.defineProperty(e, r + n, {
            value: function (o, s, i) {
                return this[r].call(this, t, o, s, i)
            },
            configurable: !0
        })
    }
    )
}
let Xe = class {
    constructor(t) {
        t && this.set(t)
    }
    set(t, n, r) {
        const o = this;
        function s(l, a, u) {
            const c = zo(a);
            if (!c)
                throw new Error("header name must be a non-empty string");
            const d = P.findKey(o, c);
            (!d || o[d] === void 0 || u === !0 || u === void 0 && o[d] !== !1) && (o[d || a] = Ti(l))
        }
        const i = (l, a) => P.forEach(l, (u, c) => s(u, c, a));
        if (P.isPlainObject(t) || t instanceof this.constructor)
            i(t, n);
        else if (P.isString(t) && (t = t.trim()) && !OS(t))
            i(RS(t), n);
        else if (P.isObject(t) && P.isIterable(t)) {
            let l = {}, a, u;
            for (const c of t) {
                if (!P.isArray(c))
                    throw TypeError("Object iterator must return a key-value pair");
                l[u = c[0]] = (a = l[u]) ? P.isArray(a) ? [...a, c[1]] : [a, c[1]] : c[1]
            }
            i(l, n)
        } else
            t != null && s(n, t, r);
        return this
    }
    get(t, n) {
        if (t = zo(t),
            t) {
            const r = P.findKey(this, t);
            if (r) {
                const o = this[r];
                if (!n)
                    return o;
                if (n === !0)
                    return jS(o);
                if (P.isFunction(n))
                    return n.call(this, o, r);
                if (P.isRegExp(n))
                    return n.exec(o);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(t, n) {
        if (t = zo(t),
            t) {
            const r = P.findKey(this, t);
            return !!(r && this[r] !== void 0 && (!n || ka(this, this[r], r, n)))
        }
        return !1
    }
    delete(t, n) {
        const r = this;
        let o = !1;
        function s(i) {
            if (i = zo(i),
                i) {
                const l = P.findKey(r, i);
                l && (!n || ka(r, r[l], l, n)) && (delete r[l],
                    o = !0)
            }
        }
        return P.isArray(t) ? t.forEach(s) : s(t),
            o
    }
    clear(t) {
        const n = Object.keys(this);
        let r = n.length
            , o = !1;
        for (; r--;) {
            const s = n[r];
            (!t || ka(this, this[s], s, t, !0)) && (delete this[s],
                o = !0)
        }
        return o
    }
    normalize(t) {
        const n = this
            , r = {};
        return P.forEach(this, (o, s) => {
            const i = P.findKey(r, s);
            if (i) {
                n[i] = Ti(o),
                    delete n[s];
                return
            }
            const l = t ? AS(s) : String(s).trim();
            l !== s && delete n[s],
                n[l] = Ti(o),
                r[l] = !0
        }
        ),
            this
    }
    concat(...t) {
        return this.constructor.concat(this, ...t)
    }
    toJSON(t) {
        const n = Object.create(null);
        return P.forEach(this, (r, o) => {
            r != null && r !== !1 && (n[o] = t && P.isArray(r) ? r.join(", ") : r)
        }
        ),
            n
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`)
    }
    getSetCookie() {
        return this.get("set-cookie") || []
    }
    get [Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(t) {
        return t instanceof this ? t : new this(t)
    }
    static concat(t, ...n) {
        const r = new this(t);
        return n.forEach(o => r.set(o)),
            r
    }
    static accessor(t) {
        const r = (this[tp] = this[tp] = {
            accessors: {}
        }).accessors
            , o = this.prototype;
        function s(i) {
            const l = zo(i);
            r[l] || (_S(o, i),
                r[l] = !0)
        }
        return P.isArray(t) ? t.forEach(s) : s(t),
            this
    }
}
    ;
Xe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
P.reduceDescriptors(Xe.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
        get: () => e,
        set(r) {
            this[n] = r
        }
    }
}
);
P.freezeMethods(Xe);
function Pa(e, t) {
    const n = this || Ms
        , r = t || n
        , o = Xe.from(r.headers);
    let s = r.data;
    return P.forEach(e, function (l) {
        s = l.call(n, s, o.normalize(), t ? t.status : void 0)
    }),
        o.normalize(),
        s
}
function Bg(e) {
    return !!(e && e.__CANCEL__)
}
let Fs = class extends V {
    constructor(t, n, r) {
        super(t ?? "canceled", V.ERR_CANCELED, n, r),
            this.name = "CanceledError",
            this.__CANCEL__ = !0
    }
}
    ;
function Ug(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status) ? e(n) : t(new V("Request failed with status code " + n.status, [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}
function LS(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || ""
}
function DS(e, t) {
    e = e || 10;
    const n = new Array(e)
        , r = new Array(e);
    let o = 0, s = 0, i;
    return t = t !== void 0 ? t : 1e3,
        function (a) {
            const u = Date.now()
                , c = r[s];
            i || (i = u),
                n[o] = a,
                r[o] = u;
            let d = s
                , h = 0;
            for (; d !== o;)
                h += n[d++],
                    d = d % e;
            if (o = (o + 1) % e,
                o === s && (s = (s + 1) % e),
                u - i < t)
                return;
            const p = c && u - c;
            return p ? Math.round(h * 1e3 / p) : void 0
        }
}
function IS(e, t) {
    let n = 0, r = 1e3 / t, o, s;
    const i = (u, c = Date.now()) => {
        n = c,
            o = null,
            s && (clearTimeout(s),
                s = null),
            e(...u)
    }
        ;
    return [(...u) => {
        const c = Date.now()
            , d = c - n;
        d >= r ? i(u, c) : (o = u,
            s || (s = setTimeout(() => {
                s = null,
                    i(o)
            }
                , r - d)))
    }
        , () => o && i(o)]
}
const sl = (e, t, n = 3) => {
    let r = 0;
    const o = DS(50, 250);
    return IS(s => {
        const i = s.loaded
            , l = s.lengthComputable ? s.total : void 0
            , a = i - r
            , u = o(a)
            , c = i <= l;
        r = i;
        const d = {
            loaded: i,
            total: l,
            progress: l ? i / l : void 0,
            bytes: a,
            rate: u || void 0,
            estimated: u && l && c ? (l - i) / u : void 0,
            event: s,
            lengthComputable: l != null,
            [t ? "download" : "upload"]: !0
        };
        e(d)
    }
        , n)
}
    , np = (e, t) => {
        const n = e != null;
        return [r => t[0]({
            lengthComputable: n,
            total: e,
            loaded: r
        }), t[1]]
    }
    , rp = e => (...t) => P.asap(() => e(...t))
    , MS = Me.hasStandardBrowserEnv ? ((e, t) => n => (n = new URL(n, Me.origin),
        e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(new URL(Me.origin), Me.navigator && /(msie|trident)/i.test(Me.navigator.userAgent)) : () => !0
    , FS = Me.hasStandardBrowserEnv ? {
        write(e, t, n, r, o, s, i) {
            if (typeof document > "u")
                return;
            const l = [`${e}=${encodeURIComponent(t)}`];
            P.isNumber(n) && l.push(`expires=${new Date(n).toUTCString()}`),
                P.isString(r) && l.push(`path=${r}`),
                P.isString(o) && l.push(`domain=${o}`),
                s === !0 && l.push("secure"),
                P.isString(i) && l.push(`SameSite=${i}`),
                document.cookie = l.join("; ")
        },
        read(e) {
            if (typeof document > "u")
                return null;
            const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
            return t ? decodeURIComponent(t[1]) : null
        },
        remove(e) {
            this.write(e, "", Date.now() - 864e5, "/")
        }
    } : {
        write() { },
        read() {
            return null
        },
        remove() { }
    };
function zS(e) {
    return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function $S(e, t) {
    return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
}
function Vg(e, t, n) {
    let r = !zS(t);
    return e && (r || n == !1) ? $S(e, t) : t
}
const op = e => e instanceof Xe ? {
    ...e
} : e;
function br(e, t) {
    t = t || {};
    const n = {};
    function r(u, c, d, h) {
        return P.isPlainObject(u) && P.isPlainObject(c) ? P.merge.call({
            caseless: h
        }, u, c) : P.isPlainObject(c) ? P.merge({}, c) : P.isArray(c) ? c.slice() : c
    }
    function o(u, c, d, h) {
        if (P.isUndefined(c)) {
            if (!P.isUndefined(u))
                return r(void 0, u, d, h)
        } else
            return r(u, c, d, h)
    }
    function s(u, c) {
        if (!P.isUndefined(c))
            return r(void 0, c)
    }
    function i(u, c) {
        if (P.isUndefined(c)) {
            if (!P.isUndefined(u))
                return r(void 0, u)
        } else
            return r(void 0, c)
    }
    function l(u, c, d) {
        if (d in t)
            return r(u, c);
        if (d in e)
            return r(void 0, u)
    }
    const a = {
        url: s,
        method: s,
        data: s,
        baseURL: i,
        transformRequest: i,
        transformResponse: i,
        paramsSerializer: i,
        timeout: i,
        timeoutMessage: i,
        withCredentials: i,
        withXSRFToken: i,
        adapter: i,
        responseType: i,
        xsrfCookieName: i,
        xsrfHeaderName: i,
        onUploadProgress: i,
        onDownloadProgress: i,
        decompress: i,
        maxContentLength: i,
        maxBodyLength: i,
        beforeRedirect: i,
        transport: i,
        httpAgent: i,
        httpsAgent: i,
        cancelToken: i,
        socketPath: i,
        responseEncoding: i,
        validateStatus: l,
        headers: (u, c, d) => o(op(u), op(c), d, !0)
    };
    return P.forEach(Object.keys({
        ...e,
        ...t
    }), function (c) {
        if (c === "__proto__" || c === "constructor" || c === "prototype")
            return;
        const d = P.hasOwnProp(a, c) ? a[c] : o
            , h = d(e[c], t[c], c);
        P.isUndefined(h) && d !== l || (n[c] = h)
    }),
        n
}
const Hg = e => {
    const t = br({}, e);
    let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: i, auth: l } = t;
    if (t.headers = i = Xe.from(i),
        t.url = zg(Vg(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer),
        l && i.set("Authorization", "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))),
        P.isFormData(n)) {
        if (Me.hasStandardBrowserEnv || Me.hasStandardBrowserWebWorkerEnv)
            i.setContentType(void 0);
        else if (P.isFunction(n.getHeaders)) {
            const a = n.getHeaders()
                , u = ["content-type", "content-length"];
            Object.entries(a).forEach(([c, d]) => {
                u.includes(c.toLowerCase()) && i.set(c, d)
            }
            )
        }
    }
    if (Me.hasStandardBrowserEnv && (r && P.isFunction(r) && (r = r(t)),
        r || r !== !1 && MS(t.url))) {
        const a = o && s && FS.read(s);
        a && i.set(o, a)
    }
    return t
}
    , BS = typeof XMLHttpRequest < "u"
    , US = BS && function (e) {
        return new Promise(function (n, r) {
            const o = Hg(e);
            let s = o.data;
            const i = Xe.from(o.headers).normalize();
            let { responseType: l, onUploadProgress: a, onDownloadProgress: u } = o, c, d, h, p, m;
            function g() {
                p && p(),
                    m && m(),
                    o.cancelToken && o.cancelToken.unsubscribe(c),
                    o.signal && o.signal.removeEventListener("abort", c)
            }
            let w = new XMLHttpRequest;
            w.open(o.method.toUpperCase(), o.url, !0),
                w.timeout = o.timeout;
            function v() {
                if (!w)
                    return;
                const x = Xe.from("getAllResponseHeaders" in w && w.getAllResponseHeaders())
                    , b = {
                        data: !l || l === "text" || l === "json" ? w.responseText : w.response,
                        status: w.status,
                        statusText: w.statusText,
                        headers: x,
                        config: e,
                        request: w
                    };
                Ug(function (k) {
                    n(k),
                        g()
                }, function (k) {
                    r(k),
                        g()
                }, b),
                    w = null
            }
            "onloadend" in w ? w.onloadend = v : w.onreadystatechange = function () {
                !w || w.readyState !== 4 || w.status === 0 && !(w.responseURL && w.responseURL.indexOf("file:") === 0) || setTimeout(v)
            }
                ,
                w.onabort = function () {
                    w && (r(new V("Request aborted", V.ECONNABORTED, e, w)),
                        w = null)
                }
                ,
                w.onerror = function (E) {
                    const b = E && E.message ? E.message : "Network Error"
                        , C = new V(b, V.ERR_NETWORK, e, w);
                    C.event = E || null,
                        r(C),
                        w = null
                }
                ,
                w.ontimeout = function () {
                    let E = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
                    const b = o.transitional || Xc;
                    o.timeoutErrorMessage && (E = o.timeoutErrorMessage),
                        r(new V(E, b.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED, e, w)),
                        w = null
                }
                ,
                s === void 0 && i.setContentType(null),
                "setRequestHeader" in w && P.forEach(i.toJSON(), function (E, b) {
                    w.setRequestHeader(b, E)
                }),
                P.isUndefined(o.withCredentials) || (w.withCredentials = !!o.withCredentials),
                l && l !== "json" && (w.responseType = o.responseType),
                u && ([h, m] = sl(u, !0),
                    w.addEventListener("progress", h)),
                a && w.upload && ([d, p] = sl(a),
                    w.upload.addEventListener("progress", d),
                    w.upload.addEventListener("loadend", p)),
                (o.cancelToken || o.signal) && (c = x => {
                    w && (r(!x || x.type ? new Fs(null, e, w) : x),
                        w.abort(),
                        w = null)
                }
                    ,
                    o.cancelToken && o.cancelToken.subscribe(c),
                    o.signal && (o.signal.aborted ? c() : o.signal.addEventListener("abort", c)));
            const y = LS(o.url);
            if (y && Me.protocols.indexOf(y) === -1) {
                r(new V("Unsupported protocol " + y + ":", V.ERR_BAD_REQUEST, e));
                return
            }
            w.send(s || null)
        }
        )
    }
    , VS = (e, t) => {
        const { length: n } = e = e ? e.filter(Boolean) : [];
        if (t || n) {
            let r = new AbortController, o;
            const s = function (u) {
                if (!o) {
                    o = !0,
                        l();
                    const c = u instanceof Error ? u : this.reason;
                    r.abort(c instanceof V ? c : new Fs(c instanceof Error ? c.message : c))
                }
            };
            let i = t && setTimeout(() => {
                i = null,
                    s(new V(`timeout of ${t}ms exceeded`, V.ETIMEDOUT))
            }
                , t);
            const l = () => {
                e && (i && clearTimeout(i),
                    i = null,
                    e.forEach(u => {
                        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s)
                    }
                    ),
                    e = null)
            }
                ;
            e.forEach(u => u.addEventListener("abort", s));
            const { signal: a } = r;
            return a.unsubscribe = () => P.asap(l),
                a
        }
    }
    , HS = function* (e, t) {
        let n = e.byteLength;
        if (n < t) {
            yield e;
            return
        }
        let r = 0, o;
        for (; r < n;)
            o = r + t,
                yield e.slice(r, o),
                r = o
    }
    , WS = async function* (e, t) {
        for await (const n of QS(e))
            yield* HS(n, t)
    }
    , QS = async function* (e) {
        if (e[Symbol.asyncIterator]) {
            yield* e;
            return
        }
        const t = e.getReader();
        try {
            for (; ;) {
                const { done: n, value: r } = await t.read();
                if (n)
                    break;
                yield r
            }
        } finally {
            await t.cancel()
        }
    }
    , sp = (e, t, n, r) => {
        const o = WS(e, t);
        let s = 0, i, l = a => {
            i || (i = !0,
                r && r(a))
        }
            ;
        return new ReadableStream({
            async pull(a) {
                try {
                    const { done: u, value: c } = await o.next();
                    if (u) {
                        l(),
                            a.close();
                        return
                    }
                    let d = c.byteLength;
                    if (n) {
                        let h = s += d;
                        n(h)
                    }
                    a.enqueue(new Uint8Array(c))
                } catch (u) {
                    throw l(u),
                    u
                }
            },
            cancel(a) {
                return l(a),
                    o.return()
            }
        }, {
            highWaterMark: 2
        })
    }
    , ip = 64 * 1024
    , { isFunction: ci } = P
    , KS = (({ Request: e, Response: t }) => ({
        Request: e,
        Response: t
    }))(P.global)
    , { ReadableStream: lp, TextEncoder: ap } = P.global
    , up = (e, ...t) => {
        try {
            return !!e(...t)
        } catch {
            return !1
        }
    }
    , qS = e => {
        e = P.merge.call({
            skipUndefined: !0
        }, KS, e);
        const { fetch: t, Request: n, Response: r } = e
            , o = t ? ci(t) : typeof fetch == "function"
            , s = ci(n)
            , i = ci(r);
        if (!o)
            return !1;
        const l = o && ci(lp)
            , a = o && (typeof ap == "function" ? (m => g => m.encode(g))(new ap) : async m => new Uint8Array(await new n(m).arrayBuffer()))
            , u = s && l && up(() => {
                let m = !1;
                const g = new n(Me.origin, {
                    body: new lp,
                    method: "POST",
                    get duplex() {
                        return m = !0,
                            "half"
                    }
                }).headers.has("Content-Type");
                return m && !g
            }
            )
            , c = i && l && up(() => P.isReadableStream(new r("").body))
            , d = {
                stream: c && (m => m.body)
            };
        o && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(m => {
            !d[m] && (d[m] = (g, w) => {
                let v = g && g[m];
                if (v)
                    return v.call(g);
                throw new V(`Response type '${m}' is not supported`, V.ERR_NOT_SUPPORT, w)
            }
            )
        }
        );
        const h = async m => {
            if (m == null)
                return 0;
            if (P.isBlob(m))
                return m.size;
            if (P.isSpecCompliantForm(m))
                return (await new n(Me.origin, {
                    method: "POST",
                    body: m
                }).arrayBuffer()).byteLength;
            if (P.isArrayBufferView(m) || P.isArrayBuffer(m))
                return m.byteLength;
            if (P.isURLSearchParams(m) && (m = m + ""),
                P.isString(m))
                return (await a(m)).byteLength
        }
            , p = async (m, g) => {
                const w = P.toFiniteNumber(m.getContentLength());
                return w ?? h(g)
            }
            ;
        return async m => {
            let { url: g, method: w, data: v, signal: y, cancelToken: x, timeout: E, onDownloadProgress: b, onUploadProgress: C, responseType: k, headers: R, withCredentials: L = "same-origin", fetchOptions: D } = Hg(m)
                , U = t || fetch;
            k = k ? (k + "").toLowerCase() : "text";
            let M = VS([y, x && x.toAbortSignal()], E)
                , Q = null;
            const _ = M && M.unsubscribe && (() => {
                M.unsubscribe()
            }
            );
            let X;
            try {
                if (C && u && w !== "get" && w !== "head" && (X = await p(R, v)) !== 0) {
                    let B = new n(g, {
                        method: "POST",
                        body: v,
                        duplex: "half"
                    }), $;
                    if (P.isFormData(v) && ($ = B.headers.get("content-type")) && R.setContentType($),
                        B.body) {
                        const [q, Y] = np(X, sl(rp(C)));
                        v = sp(B.body, ip, q, Y)
                    }
                }
                P.isString(L) || (L = L ? "include" : "omit");
                const z = s && "credentials" in n.prototype
                    , W = {
                        ...D,
                        signal: M,
                        method: w.toUpperCase(),
                        headers: R.normalize().toJSON(),
                        body: v,
                        duplex: "half",
                        credentials: z ? L : void 0
                    };
                Q = s && new n(g, W);
                let N = await (s ? U(Q, D) : U(g, W));
                const j = c && (k === "stream" || k === "response");
                if (c && (b || j && _)) {
                    const B = {};
                    ["status", "statusText", "headers"].forEach(pe => {
                        B[pe] = N[pe]
                    }
                    );
                    const $ = P.toFiniteNumber(N.headers.get("content-length"))
                        , [q, Y] = b && np($, sl(rp(b), !0)) || [];
                    N = new r(sp(N.body, ip, q, () => {
                        Y && Y(),
                            _ && _()
                    }
                    ), B)
                }
                k = k || "text";
                let I = await d[P.findKey(d, k) || "text"](N, m);
                return !j && _ && _(),
                    await new Promise((B, $) => {
                        Ug(B, $, {
                            data: I,
                            headers: Xe.from(N.headers),
                            status: N.status,
                            statusText: N.statusText,
                            config: m,
                            request: Q
                        })
                    }
                    )
            } catch (z) {
                throw _ && _(),
                z && z.name === "TypeError" && /Load failed|fetch/i.test(z.message) ? Object.assign(new V("Network Error", V.ERR_NETWORK, m, Q, z && z.response), {
                    cause: z.cause || z
                }) : V.from(z, z && z.code, m, Q, z && z.response)
            }
        }
    }
    , YS = new Map
    , Wg = e => {
        let t = e && e.env || {};
        const { fetch: n, Request: r, Response: o } = t
            , s = [r, o, n];
        let i = s.length, l = i, a, u, c = YS;
        for (; l--;)
            a = s[l],
                u = c.get(a),
                u === void 0 && c.set(a, u = l ? new Map : qS(t)),
                c = u;
        return u
    }
    ;
Wg();
const Zc = {
    http: fS,
    xhr: US,
    fetch: {
        get: Wg
    }
};
P.forEach(Zc, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, "name", {
                value: t
            })
        } catch { }
        Object.defineProperty(e, "adapterName", {
            value: t
        })
    }
}
);
const cp = e => `- ${e}`
    , GS = e => P.isFunction(e) || e === null || e === !1;
function XS(e, t) {
    e = P.isArray(e) ? e : [e];
    const { length: n } = e;
    let r, o;
    const s = {};
    for (let i = 0; i < n; i++) {
        r = e[i];
        let l;
        if (o = r,
            !GS(r) && (o = Zc[(l = String(r)).toLowerCase()],
                o === void 0))
            throw new V(`Unknown adapter '${l}'`);
        if (o && (P.isFunction(o) || (o = o.get(t))))
            break;
        s[l || "#" + i] = o
    }
    if (!o) {
        const i = Object.entries(s).map(([a, u]) => `adapter ${a} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build"));
        let l = n ? i.length > 1 ? `since :
` + i.map(cp).join(`
`) : " " + cp(i[0]) : "as no adapter specified";
        throw new V("There is no suitable adapter to dispatch the request " + l, "ERR_NOT_SUPPORT")
    }
    return o
}
const Qg = {
    getAdapter: XS,
    adapters: Zc
};
function Na(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(),
        e.signal && e.signal.aborted)
        throw new Fs(null, e)
}
function dp(e) {
    return Na(e),
        e.headers = Xe.from(e.headers),
        e.data = Pa.call(e, e.transformRequest),
        ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1),
        Qg.getAdapter(e.adapter || Ms.adapter, e)(e).then(function (r) {
            return Na(e),
                r.data = Pa.call(e, e.transformResponse, r),
                r.headers = Xe.from(r.headers),
                r
        }, function (r) {
            return Bg(r) || (Na(e),
                r && r.response && (r.response.data = Pa.call(e, e.transformResponse, r.response),
                    r.response.headers = Xe.from(r.response.headers))),
                Promise.reject(r)
        })
}
const Kg = "1.13.5"
    , Il = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
    Il[e] = function (r) {
        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
    }
}
);
const fp = {};
Il.transitional = function (t, n, r) {
    function o(s, i) {
        return "[Axios v" + Kg + "] Transitional option '" + s + "'" + i + (r ? ". " + r : "")
    }
    return (s, i, l) => {
        if (t === !1)
            throw new V(o(i, " has been removed" + (n ? " in " + n : "")), V.ERR_DEPRECATED);
        return n && !fp[i] && (fp[i] = !0,
            console.warn(o(i, " has been deprecated since v" + n + " and will be removed in the near future"))),
            t ? t(s, i, l) : !0
    }
}
    ;
Il.spelling = function (t) {
    return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`),
        !0)
}
    ;
function JS(e, t, n) {
    if (typeof e != "object")
        throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let o = r.length;
    for (; o-- > 0;) {
        const s = r[o]
            , i = t[s];
        if (i) {
            const l = e[s]
                , a = l === void 0 || i(l, s, e);
            if (a !== !0)
                throw new V("option " + s + " must be " + a, V.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0)
            throw new V("Unknown option " + s, V.ERR_BAD_OPTION)
    }
}
const Ri = {
    assertOptions: JS,
    validators: Il
}
    , at = Ri.validators;
let yr = class {
    constructor(t) {
        this.defaults = t || {},
            this.interceptors = {
                request: new ep,
                response: new ep
            }
    }
    async request(t, n) {
        try {
            return await this._request(t, n)
        } catch (r) {
            if (r instanceof Error) {
                let o = {};
                Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error;
                const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
                try {
                    r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s
                } catch { }
            }
            throw r
        }
    }
    _request(t, n) {
        typeof t == "string" ? (n = n || {},
            n.url = t) : n = t || {},
            n = br(this.defaults, n);
        const { transitional: r, paramsSerializer: o, headers: s } = n;
        r !== void 0 && Ri.assertOptions(r, {
            silentJSONParsing: at.transitional(at.boolean),
            forcedJSONParsing: at.transitional(at.boolean),
            clarifyTimeoutError: at.transitional(at.boolean),
            legacyInterceptorReqResOrdering: at.transitional(at.boolean)
        }, !1),
            o != null && (P.isFunction(o) ? n.paramsSerializer = {
                serialize: o
            } : Ri.assertOptions(o, {
                encode: at.function,
                serialize: at.function
            }, !0)),
            n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0),
            Ri.assertOptions(n, {
                baseUrl: at.spelling("baseURL"),
                withXsrfToken: at.spelling("withXSRFToken")
            }, !0),
            n.method = (n.method || this.defaults.method || "get").toLowerCase();
        let i = s && P.merge(s.common, s[n.method]);
        s && P.forEach(["delete", "get", "head", "post", "put", "patch", "common"], m => {
            delete s[m]
        }
        ),
            n.headers = Xe.concat(i, s);
        const l = [];
        let a = !0;
        this.interceptors.request.forEach(function (g) {
            if (typeof g.runWhen == "function" && g.runWhen(n) === !1)
                return;
            a = a && g.synchronous;
            const w = n.transitional || Xc;
            w && w.legacyInterceptorReqResOrdering ? l.unshift(g.fulfilled, g.rejected) : l.push(g.fulfilled, g.rejected)
        });
        const u = [];
        this.interceptors.response.forEach(function (g) {
            u.push(g.fulfilled, g.rejected)
        });
        let c, d = 0, h;
        if (!a) {
            const m = [dp.bind(this), void 0];
            for (m.unshift(...l),
                m.push(...u),
                h = m.length,
                c = Promise.resolve(n); d < h;)
                c = c.then(m[d++], m[d++]);
            return c
        }
        h = l.length;
        let p = n;
        for (; d < h;) {
            const m = l[d++]
                , g = l[d++];
            try {
                p = m(p)
            } catch (w) {
                g.call(this, w);
                break
            }
        }
        try {
            c = dp.call(this, p)
        } catch (m) {
            return Promise.reject(m)
        }
        for (d = 0,
            h = u.length; d < h;)
            c = c.then(u[d++], u[d++]);
        return c
    }
    getUri(t) {
        t = br(this.defaults, t);
        const n = Vg(t.baseURL, t.url, t.allowAbsoluteUrls);
        return zg(n, t.params, t.paramsSerializer)
    }
}
    ;
P.forEach(["delete", "get", "head", "options"], function (t) {
    yr.prototype[t] = function (n, r) {
        return this.request(br(r || {}, {
            method: t,
            url: n,
            data: (r || {}).data
        }))
    }
});
P.forEach(["post", "put", "patch"], function (t) {
    function n(r) {
        return function (s, i, l) {
            return this.request(br(l || {}, {
                method: t,
                headers: r ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: s,
                data: i
            }))
        }
    }
    yr.prototype[t] = n(),
        yr.prototype[t + "Form"] = n(!0)
});
let ZS = class qg {
    constructor(t) {
        if (typeof t != "function")
            throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function (s) {
            n = s
        }
        );
        const r = this;
        this.promise.then(o => {
            if (!r._listeners)
                return;
            let s = r._listeners.length;
            for (; s-- > 0;)
                r._listeners[s](o);
            r._listeners = null
        }
        ),
            this.promise.then = o => {
                let s;
                const i = new Promise(l => {
                    r.subscribe(l),
                        s = l
                }
                ).then(o);
                return i.cancel = function () {
                    r.unsubscribe(s)
                }
                    ,
                    i
            }
            ,
            t(function (s, i, l) {
                r.reason || (r.reason = new Fs(s, i, l),
                    n(r.reason))
            })
    }
    throwIfRequested() {
        if (this.reason)
            throw this.reason
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }
    unsubscribe(t) {
        if (!this._listeners)
            return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1)
    }
    toAbortSignal() {
        const t = new AbortController
            , n = r => {
                t.abort(r)
            }
            ;
        return this.subscribe(n),
            t.signal.unsubscribe = () => this.unsubscribe(n),
            t.signal
    }
    static source() {
        let t;
        return {
            token: new qg(function (o) {
                t = o
            }
            ),
            cancel: t
        }
    }
}
    ;
function eE(e) {
    return function (n) {
        return e.apply(null, n)
    }
}
function tE(e) {
    return P.isObject(e) && e.isAxiosError === !0
}
const Mu = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
    WebServerIsDown: 521,
    ConnectionTimedOut: 522,
    OriginIsUnreachable: 523,
    TimeoutOccurred: 524,
    SslHandshakeFailed: 525,
    InvalidSslCertificate: 526
};
Object.entries(Mu).forEach(([e, t]) => {
    Mu[t] = e
}
);
function Yg(e) {
    const t = new yr(e)
        , n = Tg(yr.prototype.request, t);
    return P.extend(n, yr.prototype, t, {
        allOwnKeys: !0
    }),
        P.extend(n, t, null, {
            allOwnKeys: !0
        }),
        n.create = function (o) {
            return Yg(br(e, o))
        }
        ,
        n
}
const ce = Yg(Ms);
ce.Axios = yr;
ce.CanceledError = Fs;
ce.CancelToken = ZS;
ce.isCancel = Bg;
ce.VERSION = Kg;
ce.toFormData = Dl;
ce.AxiosError = V;
ce.Cancel = ce.CanceledError;
ce.all = function (t) {
    return Promise.all(t)
}
    ;
ce.spread = eE;
ce.isAxiosError = tE;
ce.mergeConfig = br;
ce.AxiosHeaders = Xe;
ce.formToJSON = e => $g(P.isHTMLForm(e) ? new FormData(e) : e);
ce.getAdapter = Qg.getAdapter;
ce.HttpStatusCode = Mu;
ce.default = ce;
const { Axios: fN, AxiosError: pN, CanceledError: hN, isCancel: mN, CancelToken: gN, VERSION: yN, all: vN, Cancel: xN, isAxiosError: wN, spread: SN, toFormData: EN, AxiosHeaders: bN, HttpStatusCode: CN, formToJSON: kN, getAdapter: PN, mergeConfig: NN } = ce
    , Gg = S.createContext()
    , nE = ({ children: e }) => {
        const [t, n] = S.useState(() => {
            try {
                const d = localStorage.getItem("user");
                return d ? JSON.parse(d) : null
            } catch {
                return localStorage.removeItem("user"),
                    null
            }
        }
        )
            , [r, o] = S.useState(() => localStorage.getItem("token") || null)
            , [s, i] = S.useState(!1)
            , l = async (d, h) => {
                var p, m;
                i(!0);
                try {
                    const g = await ce.post("http://127.0.0.1:8000/auth/login/", {
                        email: d,
                        password: h
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        , w = g.data.data.access
                        , v = g.data.data.user;
                    return o(w),
                        n(v),
                        localStorage.setItem("token", w),
                        localStorage.setItem("user", JSON.stringify(v)),
                        ce.defaults.headers.common.Authorization = `Bearer ${w}`,
                    {
                        success: !0
                    }
                } catch (g) {
                    return console.error("Login failed", ((p = g.response) == null ? void 0 : p.data) || g.message),
                    {
                        success: !1,
                        error: ((m = g.response) == null ? void 0 : m.data) || g.message
                    }
                } finally {
                    i(!1)
                }
            }
            , a = () => {
                n(null),
                    o(null),
                    localStorage.removeItem("user"),
                    localStorage.removeItem("token"),
                    delete ce.defaults.headers.common.Authorization
            }
            , u = !!t && !!r
            , c = () => {
                var d, h;
                return t ? `${((d = t.first_name) == null ? void 0 : d[0]) || ""}${((h = t.last_name) == null ? void 0 : h[0]) || ""}`.toUpperCase() : ""
            }
            ;
        return S.useEffect(() => {
            r && (ce.defaults.headers.common.Authorization = `Bearer ${r}`)
        }
            , [r]),
            f.jsx(Gg.Provider, {
                value: {
                    user: t,
                    token: r,
                    login: l,
                    logout: a,
                    isLoggedIn: u,
                    getUserInitials: c,
                    loading: s
                },
                children: e
            })
    }
    , zs = () => S.useContext(Gg)
    , Xg = S.createContext()
    , rE = ({ children: e }) => {
        const [t, n] = S.useState([]);
        S.useEffect(() => {
            const i = localStorage.getItem("cards");
            i && n(JSON.parse(i))
        }
            , []),
            S.useEffect(() => {
                localStorage.setItem("cards", JSON.stringify(t))
            }
                , [t]);
        const r = i => {
            n(l => [...l, {
                ...i,
                id: Date.now()
            }])
        }
            , o = i => {
                n(l => l.filter(a => a.id !== i))
            }
            , s = i => {
                n(l => l.map(a => ({
                    ...a,
                    isDefault: a.id === i
                })))
            }
            ;
        return f.jsx(Xg.Provider, {
            value: {
                cards: t,
                addCard: r,
                removeCard: o,
                setDefaultCard: s
            },
            children: e
        })
    }
    , oE = () => S.useContext(Xg);
function be(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
    return function (o) {
        if (e == null || e(o),
            n === !1 || !o.defaultPrevented)
            return t == null ? void 0 : t(o)
    }
}
function pp(e, t) {
    if (typeof e == "function")
        return e(t);
    e != null && (e.current = t)
}
function Ml(...e) {
    return t => {
        let n = !1;
        const r = e.map(o => {
            const s = pp(o, t);
            return !n && typeof s == "function" && (n = !0),
                s
        }
        );
        if (n)
            return () => {
                for (let o = 0; o < r.length; o++) {
                    const s = r[o];
                    typeof s == "function" ? s() : pp(e[o], null)
                }
            }
    }
}
function jt(...e) {
    return S.useCallback(Ml(...e), e)
}
function Fl(e, t = []) {
    let n = [];
    function r(s, i) {
        const l = S.createContext(i)
            , a = n.length;
        n = [...n, i];
        const u = d => {
            var v;
            const { scope: h, children: p, ...m } = d
                , g = ((v = h == null ? void 0 : h[e]) == null ? void 0 : v[a]) || l
                , w = S.useMemo(() => m, Object.values(m));
            return f.jsx(g.Provider, {
                value: w,
                children: p
            })
        }
            ;
        u.displayName = s + "Provider";
        function c(d, h) {
            var g;
            const p = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[a]) || l
                , m = S.useContext(p);
            if (m)
                return m;
            if (i !== void 0)
                return i;
            throw new Error(`\`${d}\` must be used within \`${s}\``)
        }
        return [u, c]
    }
    const o = () => {
        const s = n.map(i => S.createContext(i));
        return function (l) {
            const a = (l == null ? void 0 : l[e]) || s;
            return S.useMemo(() => ({
                [`__scope${e}`]: {
                    ...l,
                    [e]: a
                }
            }), [l, a])
        }
    }
        ;
    return o.scopeName = e,
        [r, sE(o, ...t)]
}
function sE(...e) {
    const t = e[0];
    if (e.length === 1)
        return t;
    const n = () => {
        const r = e.map(o => ({
            useScope: o(),
            scopeName: o.scopeName
        }));
        return function (s) {
            const i = r.reduce((l, { useScope: a, scopeName: u }) => {
                const d = a(s)[`__scope${u}`];
                return {
                    ...l,
                    ...d
                }
            }
                , {});
            return S.useMemo(() => ({
                [`__scope${t.scopeName}`]: i
            }), [i])
        }
    }
        ;
    return n.scopeName = t.scopeName,
        n
}
function iE(e) {
    const t = lE(e)
        , n = S.forwardRef((r, o) => {
            const { children: s, ...i } = r
                , l = S.Children.toArray(s)
                , a = l.find(uE);
            if (a) {
                const u = a.props.children
                    , c = l.map(d => d === a ? S.Children.count(u) > 1 ? S.Children.only(null) : S.isValidElement(u) ? u.props.children : null : d);
                return f.jsx(t, {
                    ...i,
                    ref: o,
                    children: S.isValidElement(u) ? S.cloneElement(u, void 0, c) : null
                })
            }
            return f.jsx(t, {
                ...i,
                ref: o,
                children: s
            })
        }
        );
    return n.displayName = `${e}.Slot`,
        n
}
function lE(e) {
    const t = S.forwardRef((n, r) => {
        const { children: o, ...s } = n;
        if (S.isValidElement(o)) {
            const i = dE(o)
                , l = cE(s, o.props);
            return o.type !== S.Fragment && (l.ref = r ? Ml(r, i) : i),
                S.cloneElement(o, l)
        }
        return S.Children.count(o) > 1 ? S.Children.only(null) : null
    }
    );
    return t.displayName = `${e}.SlotClone`,
        t
}
var aE = Symbol("radix.slottable");
function uE(e) {
    return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === aE
}
function cE(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const o = e[r]
            , s = t[r];
        /^on[A-Z]/.test(r) ? o && s ? n[r] = (...l) => {
            const a = s(...l);
            return o(...l),
                a
        }
            : o && (n[r] = o) : r === "style" ? n[r] = {
                ...o,
                ...s
            } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}
function dE(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get
        , n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get,
        n = t && "isReactWarning" in t && t.isReactWarning,
        n ? e.props.ref : e.props.ref || e.ref)
}
var fE = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"]
    , Je = fE.reduce((e, t) => {
        const n = iE(`Primitive.${t}`)
            , r = S.forwardRef((o, s) => {
                const { asChild: i, ...l } = o
                    , a = i ? n : t;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
                    f.jsx(a, {
                        ...l,
                        ref: s
                    })
            }
            );
        return r.displayName = `Primitive.${t}`,
        {
            ...e,
            [t]: r
        }
    }
        , {});
function Jg(e, t) {
    e && As.flushSync(() => e.dispatchEvent(t))
}
function Hn(e) {
    const t = S.useRef(e);
    return S.useEffect(() => {
        t.current = e
    }
    ),
        S.useMemo(() => (...n) => {
            var r;
            return (r = t.current) == null ? void 0 : r.call(t, ...n)
        }
            , [])
}
function pE(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = Hn(e);
    S.useEffect(() => {
        const r = o => {
            o.key === "Escape" && n(o)
        }
            ;
        return t.addEventListener("keydown", r, {
            capture: !0
        }),
            () => t.removeEventListener("keydown", r, {
                capture: !0
            })
    }
        , [n, t])
}
var hE = "DismissableLayer", Fu = "dismissableLayer.update", mE = "dismissableLayer.pointerDownOutside", gE = "dismissableLayer.focusOutside", hp, Zg = S.createContext({
    layers: new Set,
    layersWithOutsidePointerEventsDisabled: new Set,
    branches: new Set
}), ed = S.forwardRef((e, t) => {
    const { disableOutsidePointerEvents: n = !1, onEscapeKeyDown: r, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: i, onDismiss: l, ...a } = e
        , u = S.useContext(Zg)
        , [c, d] = S.useState(null)
        , h = (c == null ? void 0 : c.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document)
        , [, p] = S.useState({})
        , m = jt(t, k => d(k))
        , g = Array.from(u.layers)
        , [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1)
        , v = g.indexOf(w)
        , y = c ? g.indexOf(c) : -1
        , x = u.layersWithOutsidePointerEventsDisabled.size > 0
        , E = y >= v
        , b = vE(k => {
            const R = k.target
                , L = [...u.branches].some(D => D.contains(R));
            !E || L || (o == null || o(k),
                i == null || i(k),
                k.defaultPrevented || l == null || l())
        }
            , h)
        , C = xE(k => {
            const R = k.target;
            [...u.branches].some(D => D.contains(R)) || (s == null || s(k),
                i == null || i(k),
                k.defaultPrevented || l == null || l())
        }
            , h);
    return pE(k => {
        y === u.layers.size - 1 && (r == null || r(k),
            !k.defaultPrevented && l && (k.preventDefault(),
                l()))
    }
        , h),
        S.useEffect(() => {
            if (c)
                return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (hp = h.body.style.pointerEvents,
                    h.body.style.pointerEvents = "none"),
                    u.layersWithOutsidePointerEventsDisabled.add(c)),
                    u.layers.add(c),
                    mp(),
                    () => {
                        n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = hp)
                    }
        }
            , [c, h, n, u]),
        S.useEffect(() => () => {
            c && (u.layers.delete(c),
                u.layersWithOutsidePointerEventsDisabled.delete(c),
                mp())
        }
            , [c, u]),
        S.useEffect(() => {
            const k = () => p({});
            return document.addEventListener(Fu, k),
                () => document.removeEventListener(Fu, k)
        }
            , []),
        f.jsx(Je.div, {
            ...a,
            ref: m,
            style: {
                pointerEvents: x ? E ? "auto" : "none" : void 0,
                ...e.style
            },
            onFocusCapture: be(e.onFocusCapture, C.onFocusCapture),
            onBlurCapture: be(e.onBlurCapture, C.onBlurCapture),
            onPointerDownCapture: be(e.onPointerDownCapture, b.onPointerDownCapture)
        })
}
);
ed.displayName = hE;
var yE = "DismissableLayerBranch"
    , ey = S.forwardRef((e, t) => {
        const n = S.useContext(Zg)
            , r = S.useRef(null)
            , o = jt(t, r);
        return S.useEffect(() => {
            const s = r.current;
            if (s)
                return n.branches.add(s),
                    () => {
                        n.branches.delete(s)
                    }
        }
            , [n.branches]),
            f.jsx(Je.div, {
                ...e,
                ref: o
            })
    }
    );
ey.displayName = yE;
function vE(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = Hn(e)
        , r = S.useRef(!1)
        , o = S.useRef(() => { }
        );
    return S.useEffect(() => {
        const s = l => {
            if (l.target && !r.current) {
                let a = function () {
                    ty(mE, n, u, {
                        discrete: !0
                    })
                };
                const u = {
                    originalEvent: l
                };
                l.pointerType === "touch" ? (t.removeEventListener("click", o.current),
                    o.current = a,
                    t.addEventListener("click", o.current, {
                        once: !0
                    })) : a()
            } else
                t.removeEventListener("click", o.current);
            r.current = !1
        }
            , i = window.setTimeout(() => {
                t.addEventListener("pointerdown", s)
            }
                , 0);
        return () => {
            window.clearTimeout(i),
                t.removeEventListener("pointerdown", s),
                t.removeEventListener("click", o.current)
        }
    }
        , [t, n]),
    {
        onPointerDownCapture: () => r.current = !0
    }
}
function xE(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = Hn(e)
        , r = S.useRef(!1);
    return S.useEffect(() => {
        const o = s => {
            s.target && !r.current && ty(gE, n, {
                originalEvent: s
            }, {
                discrete: !1
            })
        }
            ;
        return t.addEventListener("focusin", o),
            () => t.removeEventListener("focusin", o)
    }
        , [t, n]),
    {
        onFocusCapture: () => r.current = !0,
        onBlurCapture: () => r.current = !1
    }
}
function mp() {
    const e = new CustomEvent(Fu);
    document.dispatchEvent(e)
}
function ty(e, t, n, { discrete: r }) {
    const o = n.originalEvent.target
        , s = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && o.addEventListener(e, t, {
        once: !0
    }),
        r ? Jg(o, s) : o.dispatchEvent(s)
}
var wE = ed
    , SE = ey
    , Wn = globalThis != null && globalThis.document ? S.useLayoutEffect : () => { }
    ;
const EE = ["top", "right", "bottom", "left"]
    , Qn = Math.min
    , et = Math.max
    , il = Math.round
    , di = Math.floor
    , Vt = e => ({
        x: e,
        y: e
    })
    , bE = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    }
    , CE = {
        start: "end",
        end: "start"
    };
function zu(e, t, n) {
    return et(e, Qn(t, n))
}
function on(e, t) {
    return typeof e == "function" ? e(t) : e
}
function sn(e) {
    return e.split("-")[0]
}
function Po(e) {
    return e.split("-")[1]
}
function td(e) {
    return e === "x" ? "y" : "x"
}
function nd(e) {
    return e === "y" ? "height" : "width"
}
const kE = new Set(["top", "bottom"]);
function $t(e) {
    return kE.has(sn(e)) ? "y" : "x"
}
function rd(e) {
    return td($t(e))
}
function PE(e, t, n) {
    n === void 0 && (n = !1);
    const r = Po(e)
        , o = rd(e)
        , s = nd(o);
    let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
    return t.reference[s] > t.floating[s] && (i = ll(i)),
        [i, ll(i)]
}
function NE(e) {
    const t = ll(e);
    return [$u(e), t, $u(t)]
}
function $u(e) {
    return e.replace(/start|end/g, t => CE[t])
}
const gp = ["left", "right"]
    , yp = ["right", "left"]
    , TE = ["top", "bottom"]
    , RE = ["bottom", "top"];
function jE(e, t, n) {
    switch (e) {
        case "top":
        case "bottom":
            return n ? t ? yp : gp : t ? gp : yp;
        case "left":
        case "right":
            return t ? TE : RE;
        default:
            return []
    }
}
function OE(e, t, n, r) {
    const o = Po(e);
    let s = jE(sn(e), n === "start", r);
    return o && (s = s.map(i => i + "-" + o),
        t && (s = s.concat(s.map($u)))),
        s
}
function ll(e) {
    return e.replace(/left|right|bottom|top/g, t => bE[t])
}
function AE(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    }
}
function ny(e) {
    return typeof e != "number" ? AE(e) : {
        top: e,
        right: e,
        bottom: e,
        left: e
    }
}
function al(e) {
    const { x: t, y: n, width: r, height: o } = e;
    return {
        width: r,
        height: o,
        top: n,
        left: t,
        right: t + r,
        bottom: n + o,
        x: t,
        y: n
    }
}
function vp(e, t, n) {
    let { reference: r, floating: o } = e;
    const s = $t(t)
        , i = rd(t)
        , l = nd(i)
        , a = sn(t)
        , u = s === "y"
        , c = r.x + r.width / 2 - o.width / 2
        , d = r.y + r.height / 2 - o.height / 2
        , h = r[l] / 2 - o[l] / 2;
    let p;
    switch (a) {
        case "top":
            p = {
                x: c,
                y: r.y - o.height
            };
            break;
        case "bottom":
            p = {
                x: c,
                y: r.y + r.height
            };
            break;
        case "right":
            p = {
                x: r.x + r.width,
                y: d
            };
            break;
        case "left":
            p = {
                x: r.x - o.width,
                y: d
            };
            break;
        default:
            p = {
                x: r.x,
                y: r.y
            }
    }
    switch (Po(t)) {
        case "start":
            p[i] -= h * (n && u ? -1 : 1);
            break;
        case "end":
            p[i] += h * (n && u ? -1 : 1);
            break
    }
    return p
}
async function _E(e, t) {
    var n;
    t === void 0 && (t = {});
    const { x: r, y: o, platform: s, rects: i, elements: l, strategy: a } = e
        , { boundary: u = "clippingAncestors", rootBoundary: c = "viewport", elementContext: d = "floating", altBoundary: h = !1, padding: p = 0 } = on(t, e)
        , m = ny(p)
        , w = l[h ? d === "floating" ? "reference" : "floating" : d]
        , v = al(await s.getClippingRect({
            element: (n = await (s.isElement == null ? void 0 : s.isElement(w))) == null || n ? w : w.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
            boundary: u,
            rootBoundary: c,
            strategy: a
        }))
        , y = d === "floating" ? {
            x: r,
            y: o,
            width: i.floating.width,
            height: i.floating.height
        } : i.reference
        , x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating))
        , E = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
            x: 1,
            y: 1
        } : {
            x: 1,
            y: 1
        }
        , b = al(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: y,
            offsetParent: x,
            strategy: a
        }) : y);
    return {
        top: (v.top - b.top + m.top) / E.y,
        bottom: (b.bottom - v.bottom + m.bottom) / E.y,
        left: (v.left - b.left + m.left) / E.x,
        right: (b.right - v.right + m.right) / E.x
    }
}
const LE = async (e, t, n) => {
    const { placement: r = "bottom", strategy: o = "absolute", middleware: s = [], platform: i } = n
        , l = s.filter(Boolean)
        , a = await (i.isRTL == null ? void 0 : i.isRTL(t));
    let u = await i.getElementRects({
        reference: e,
        floating: t,
        strategy: o
    })
        , { x: c, y: d } = vp(u, r, a)
        , h = r
        , p = {}
        , m = 0;
    for (let w = 0; w < l.length; w++) {
        var g;
        const { name: v, fn: y } = l[w]
            , { x, y: E, data: b, reset: C } = await y({
                x: c,
                y: d,
                initialPlacement: r,
                placement: h,
                strategy: o,
                middlewareData: p,
                rects: u,
                platform: {
                    ...i,
                    detectOverflow: (g = i.detectOverflow) != null ? g : _E
                },
                elements: {
                    reference: e,
                    floating: t
                }
            });
        c = x ?? c,
            d = E ?? d,
            p = {
                ...p,
                [v]: {
                    ...p[v],
                    ...b
                }
            },
            C && m <= 50 && (m++,
                typeof C == "object" && (C.placement && (h = C.placement),
                    C.rects && (u = C.rects === !0 ? await i.getElementRects({
                        reference: e,
                        floating: t,
                        strategy: o
                    }) : C.rects),
                    { x: c, y: d } = vp(u, h, a)),
                w = -1)
    }
    return {
        x: c,
        y: d,
        placement: h,
        strategy: o,
        middlewareData: p
    }
}
    , DE = e => ({
        name: "arrow",
        options: e,
        async fn(t) {
            const { x: n, y: r, placement: o, rects: s, platform: i, elements: l, middlewareData: a } = t
                , { element: u, padding: c = 0 } = on(e, t) || {};
            if (u == null)
                return {};
            const d = ny(c)
                , h = {
                    x: n,
                    y: r
                }
                , p = rd(o)
                , m = nd(p)
                , g = await i.getDimensions(u)
                , w = p === "y"
                , v = w ? "top" : "left"
                , y = w ? "bottom" : "right"
                , x = w ? "clientHeight" : "clientWidth"
                , E = s.reference[m] + s.reference[p] - h[p] - s.floating[m]
                , b = h[p] - s.reference[p]
                , C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
            let k = C ? C[x] : 0;
            (!k || !await (i.isElement == null ? void 0 : i.isElement(C))) && (k = l.floating[x] || s.floating[m]);
            const R = E / 2 - b / 2
                , L = k / 2 - g[m] / 2 - 1
                , D = Qn(d[v], L)
                , U = Qn(d[y], L)
                , M = D
                , Q = k - g[m] - U
                , _ = k / 2 - g[m] / 2 + R
                , X = zu(M, _, Q)
                , z = !a.arrow && Po(o) != null && _ !== X && s.reference[m] / 2 - (_ < M ? D : U) - g[m] / 2 < 0
                , W = z ? _ < M ? _ - M : _ - Q : 0;
            return {
                [p]: h[p] + W,
                data: {
                    [p]: X,
                    centerOffset: _ - X - W,
                    ...z && {
                        alignmentOffset: W
                    }
                },
                reset: z
            }
        }
    })
    , IE = function (e) {
        return e === void 0 && (e = {}),
        {
            name: "flip",
            options: e,
            async fn(t) {
                var n, r;
                const { placement: o, middlewareData: s, rects: i, initialPlacement: l, platform: a, elements: u } = t
                    , { mainAxis: c = !0, crossAxis: d = !0, fallbackPlacements: h, fallbackStrategy: p = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: g = !0, ...w } = on(e, t);
                if ((n = s.arrow) != null && n.alignmentOffset)
                    return {};
                const v = sn(o)
                    , y = $t(l)
                    , x = sn(l) === l
                    , E = await (a.isRTL == null ? void 0 : a.isRTL(u.floating))
                    , b = h || (x || !g ? [ll(l)] : NE(l))
                    , C = m !== "none";
                !h && C && b.push(...OE(l, g, m, E));
                const k = [l, ...b]
                    , R = await a.detectOverflow(t, w)
                    , L = [];
                let D = ((r = s.flip) == null ? void 0 : r.overflows) || [];
                if (c && L.push(R[v]),
                    d) {
                    const _ = PE(o, i, E);
                    L.push(R[_[0]], R[_[1]])
                }
                if (D = [...D, {
                    placement: o,
                    overflows: L
                }],
                    !L.every(_ => _ <= 0)) {
                    var U, M;
                    const _ = (((U = s.flip) == null ? void 0 : U.index) || 0) + 1
                        , X = k[_];
                    if (X && (!(d === "alignment" ? y !== $t(X) : !1) || D.every(N => $t(N.placement) === y ? N.overflows[0] > 0 : !0)))
                        return {
                            data: {
                                index: _,
                                overflows: D
                            },
                            reset: {
                                placement: X
                            }
                        };
                    let z = (M = D.filter(W => W.overflows[0] <= 0).sort((W, N) => W.overflows[1] - N.overflows[1])[0]) == null ? void 0 : M.placement;
                    if (!z)
                        switch (p) {
                            case "bestFit":
                                {
                                    var Q;
                                    const W = (Q = D.filter(N => {
                                        if (C) {
                                            const j = $t(N.placement);
                                            return j === y || j === "y"
                                        }
                                        return !0
                                    }
                                    ).map(N => [N.placement, N.overflows.filter(j => j > 0).reduce((j, I) => j + I, 0)]).sort((N, j) => N[1] - j[1])[0]) == null ? void 0 : Q[0];
                                    W && (z = W);
                                    break
                                }
                            case "initialPlacement":
                                z = l;
                                break
                        }
                    if (o !== z)
                        return {
                            reset: {
                                placement: z
                            }
                        }
                }
                return {}
            }
        }
    };
function xp(e, t) {
    return {
        top: e.top - t.height,
        right: e.right - t.width,
        bottom: e.bottom - t.height,
        left: e.left - t.width
    }
}
function wp(e) {
    return EE.some(t => e[t] >= 0)
}
const ME = function (e) {
    return e === void 0 && (e = {}),
    {
        name: "hide",
        options: e,
        async fn(t) {
            const { rects: n, platform: r } = t
                , { strategy: o = "referenceHidden", ...s } = on(e, t);
            switch (o) {
                case "referenceHidden":
                    {
                        const i = await r.detectOverflow(t, {
                            ...s,
                            elementContext: "reference"
                        })
                            , l = xp(i, n.reference);
                        return {
                            data: {
                                referenceHiddenOffsets: l,
                                referenceHidden: wp(l)
                            }
                        }
                    }
                case "escaped":
                    {
                        const i = await r.detectOverflow(t, {
                            ...s,
                            altBoundary: !0
                        })
                            , l = xp(i, n.floating);
                        return {
                            data: {
                                escapedOffsets: l,
                                escaped: wp(l)
                            }
                        }
                    }
                default:
                    return {}
            }
        }
    }
}
    , ry = new Set(["left", "top"]);
async function FE(e, t) {
    const { placement: n, platform: r, elements: o } = e
        , s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating))
        , i = sn(n)
        , l = Po(n)
        , a = $t(n) === "y"
        , u = ry.has(i) ? -1 : 1
        , c = s && a ? -1 : 1
        , d = on(t, e);
    let { mainAxis: h, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
        mainAxis: d,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis
    };
    return l && typeof m == "number" && (p = l === "end" ? m * -1 : m),
        a ? {
            x: p * c,
            y: h * u
        } : {
            x: h * u,
            y: p * c
        }
}
const zE = function (e) {
    return e === void 0 && (e = 0),
    {
        name: "offset",
        options: e,
        async fn(t) {
            var n, r;
            const { x: o, y: s, placement: i, middlewareData: l } = t
                , a = await FE(t, e);
            return i === ((n = l.offset) == null ? void 0 : n.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
                x: o + a.x,
                y: s + a.y,
                data: {
                    ...a,
                    placement: i
                }
            }
        }
    }
}
    , $E = function (e) {
        return e === void 0 && (e = {}),
        {
            name: "shift",
            options: e,
            async fn(t) {
                const { x: n, y: r, placement: o, platform: s } = t
                    , { mainAxis: i = !0, crossAxis: l = !1, limiter: a = {
                        fn: v => {
                            let { x: y, y: x } = v;
                            return {
                                x: y,
                                y: x
                            }
                        }
                    }, ...u } = on(e, t)
                    , c = {
                        x: n,
                        y: r
                    }
                    , d = await s.detectOverflow(t, u)
                    , h = $t(sn(o))
                    , p = td(h);
                let m = c[p]
                    , g = c[h];
                if (i) {
                    const v = p === "y" ? "top" : "left"
                        , y = p === "y" ? "bottom" : "right"
                        , x = m + d[v]
                        , E = m - d[y];
                    m = zu(x, m, E)
                }
                if (l) {
                    const v = h === "y" ? "top" : "left"
                        , y = h === "y" ? "bottom" : "right"
                        , x = g + d[v]
                        , E = g - d[y];
                    g = zu(x, g, E)
                }
                const w = a.fn({
                    ...t,
                    [p]: m,
                    [h]: g
                });
                return {
                    ...w,
                    data: {
                        x: w.x - n,
                        y: w.y - r,
                        enabled: {
                            [p]: i,
                            [h]: l
                        }
                    }
                }
            }
        }
    }
    , BE = function (e) {
        return e === void 0 && (e = {}),
        {
            options: e,
            fn(t) {
                const { x: n, y: r, placement: o, rects: s, middlewareData: i } = t
                    , { offset: l = 0, mainAxis: a = !0, crossAxis: u = !0 } = on(e, t)
                    , c = {
                        x: n,
                        y: r
                    }
                    , d = $t(o)
                    , h = td(d);
                let p = c[h]
                    , m = c[d];
                const g = on(l, t)
                    , w = typeof g == "number" ? {
                        mainAxis: g,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...g
                    };
                if (a) {
                    const x = h === "y" ? "height" : "width"
                        , E = s.reference[h] - s.floating[x] + w.mainAxis
                        , b = s.reference[h] + s.reference[x] - w.mainAxis;
                    p < E ? p = E : p > b && (p = b)
                }
                if (u) {
                    var v, y;
                    const x = h === "y" ? "width" : "height"
                        , E = ry.has(sn(o))
                        , b = s.reference[d] - s.floating[x] + (E && ((v = i.offset) == null ? void 0 : v[d]) || 0) + (E ? 0 : w.crossAxis)
                        , C = s.reference[d] + s.reference[x] + (E ? 0 : ((y = i.offset) == null ? void 0 : y[d]) || 0) - (E ? w.crossAxis : 0);
                    m < b ? m = b : m > C && (m = C)
                }
                return {
                    [h]: p,
                    [d]: m
                }
            }
        }
    }
    , UE = function (e) {
        return e === void 0 && (e = {}),
        {
            name: "size",
            options: e,
            async fn(t) {
                var n, r;
                const { placement: o, rects: s, platform: i, elements: l } = t
                    , { apply: a = () => { }
                        , ...u } = on(e, t)
                    , c = await i.detectOverflow(t, u)
                    , d = sn(o)
                    , h = Po(o)
                    , p = $t(o) === "y"
                    , { width: m, height: g } = s.floating;
                let w, v;
                d === "top" || d === "bottom" ? (w = d,
                    v = h === (await (i.isRTL == null ? void 0 : i.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (v = d,
                        w = h === "end" ? "top" : "bottom");
                const y = g - c.top - c.bottom
                    , x = m - c.left - c.right
                    , E = Qn(g - c[w], y)
                    , b = Qn(m - c[v], x)
                    , C = !t.middlewareData.shift;
                let k = E
                    , R = b;
                if ((n = t.middlewareData.shift) != null && n.enabled.x && (R = x),
                    (r = t.middlewareData.shift) != null && r.enabled.y && (k = y),
                    C && !h) {
                    const D = et(c.left, 0)
                        , U = et(c.right, 0)
                        , M = et(c.top, 0)
                        , Q = et(c.bottom, 0);
                    p ? R = m - 2 * (D !== 0 || U !== 0 ? D + U : et(c.left, c.right)) : k = g - 2 * (M !== 0 || Q !== 0 ? M + Q : et(c.top, c.bottom))
                }
                await a({
                    ...t,
                    availableWidth: R,
                    availableHeight: k
                });
                const L = await i.getDimensions(l.floating);
                return m !== L.width || g !== L.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };
function zl() {
    return typeof window < "u"
}
function No(e) {
    return oy(e) ? (e.nodeName || "").toLowerCase() : "#document"
}
function rt(e) {
    var t;
    return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function Wt(e) {
    var t;
    return (t = (oy(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement
}
function oy(e) {
    return zl() ? e instanceof Node || e instanceof rt(e).Node : !1
}
function Ot(e) {
    return zl() ? e instanceof Element || e instanceof rt(e).Element : !1
}
function Ht(e) {
    return zl() ? e instanceof HTMLElement || e instanceof rt(e).HTMLElement : !1
}
function Sp(e) {
    return !zl() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof rt(e).ShadowRoot
}
const VE = new Set(["inline", "contents"]);
function $s(e) {
    const { overflow: t, overflowX: n, overflowY: r, display: o } = At(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !VE.has(o)
}
const HE = new Set(["table", "td", "th"]);
function WE(e) {
    return HE.has(No(e))
}
const QE = [":popover-open", ":modal"];
function $l(e) {
    return QE.some(t => {
        try {
            return e.matches(t)
        } catch {
            return !1
        }
    }
    )
}
const KE = ["transform", "translate", "scale", "rotate", "perspective"]
    , qE = ["transform", "translate", "scale", "rotate", "perspective", "filter"]
    , YE = ["paint", "layout", "strict", "content"];
function od(e) {
    const t = sd()
        , n = Ot(e) ? At(e) : e;
    return KE.some(r => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || qE.some(r => (n.willChange || "").includes(r)) || YE.some(r => (n.contain || "").includes(r))
}
function GE(e) {
    let t = Kn(e);
    for (; Ht(t) && !xo(t);) {
        if (od(t))
            return t;
        if ($l(t))
            return null;
        t = Kn(t)
    }
    return null
}
function sd() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
const XE = new Set(["html", "body", "#document"]);
function xo(e) {
    return XE.has(No(e))
}
function At(e) {
    return rt(e).getComputedStyle(e)
}
function Bl(e) {
    return Ot(e) ? {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    } : {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY
    }
}
function Kn(e) {
    if (No(e) === "html")
        return e;
    const t = e.assignedSlot || e.parentNode || Sp(e) && e.host || Wt(e);
    return Sp(t) ? t.host : t
}
function sy(e) {
    const t = Kn(e);
    return xo(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ht(t) && $s(t) ? t : sy(t)
}
function bs(e, t, n) {
    var r;
    t === void 0 && (t = []),
        n === void 0 && (n = !0);
    const o = sy(e)
        , s = o === ((r = e.ownerDocument) == null ? void 0 : r.body)
        , i = rt(o);
    if (s) {
        const l = Bu(i);
        return t.concat(i, i.visualViewport || [], $s(o) ? o : [], l && n ? bs(l) : [])
    }
    return t.concat(o, bs(o, [], n))
}
function Bu(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function iy(e) {
    const t = At(e);
    let n = parseFloat(t.width) || 0
        , r = parseFloat(t.height) || 0;
    const o = Ht(e)
        , s = o ? e.offsetWidth : n
        , i = o ? e.offsetHeight : r
        , l = il(n) !== s || il(r) !== i;
    return l && (n = s,
        r = i),
    {
        width: n,
        height: r,
        $: l
    }
}
function id(e) {
    return Ot(e) ? e : e.contextElement
}
function eo(e) {
    const t = id(e);
    if (!Ht(t))
        return Vt(1);
    const n = t.getBoundingClientRect()
        , { width: r, height: o, $: s } = iy(t);
    let i = (s ? il(n.width) : n.width) / r
        , l = (s ? il(n.height) : n.height) / o;
    return (!i || !Number.isFinite(i)) && (i = 1),
        (!l || !Number.isFinite(l)) && (l = 1),
    {
        x: i,
        y: l
    }
}
const JE = Vt(0);
function ly(e) {
    const t = rt(e);
    return !sd() || !t.visualViewport ? JE : {
        x: t.visualViewport.offsetLeft,
        y: t.visualViewport.offsetTop
    }
}
function ZE(e, t, n) {
    return t === void 0 && (t = !1),
        !n || t && n !== rt(e) ? !1 : t
}
function Cr(e, t, n, r) {
    t === void 0 && (t = !1),
        n === void 0 && (n = !1);
    const o = e.getBoundingClientRect()
        , s = id(e);
    let i = Vt(1);
    t && (r ? Ot(r) && (i = eo(r)) : i = eo(e));
    const l = ZE(s, n, r) ? ly(s) : Vt(0);
    let a = (o.left + l.x) / i.x
        , u = (o.top + l.y) / i.y
        , c = o.width / i.x
        , d = o.height / i.y;
    if (s) {
        const h = rt(s)
            , p = r && Ot(r) ? rt(r) : r;
        let m = h
            , g = Bu(m);
        for (; g && r && p !== m;) {
            const w = eo(g)
                , v = g.getBoundingClientRect()
                , y = At(g)
                , x = v.left + (g.clientLeft + parseFloat(y.paddingLeft)) * w.x
                , E = v.top + (g.clientTop + parseFloat(y.paddingTop)) * w.y;
            a *= w.x,
                u *= w.y,
                c *= w.x,
                d *= w.y,
                a += x,
                u += E,
                m = rt(g),
                g = Bu(m)
        }
    }
    return al({
        width: c,
        height: d,
        x: a,
        y: u
    })
}
function Ul(e, t) {
    const n = Bl(e).scrollLeft;
    return t ? t.left + n : Cr(Wt(e)).left + n
}
function ay(e, t) {
    const n = e.getBoundingClientRect()
        , r = n.left + t.scrollLeft - Ul(e, n)
        , o = n.top + t.scrollTop;
    return {
        x: r,
        y: o
    }
}
function eb(e) {
    let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
    const s = o === "fixed"
        , i = Wt(r)
        , l = t ? $l(t.floating) : !1;
    if (r === i || l && s)
        return n;
    let a = {
        scrollLeft: 0,
        scrollTop: 0
    }
        , u = Vt(1);
    const c = Vt(0)
        , d = Ht(r);
    if ((d || !d && !s) && ((No(r) !== "body" || $s(i)) && (a = Bl(r)),
        Ht(r))) {
        const p = Cr(r);
        u = eo(r),
            c.x = p.x + r.clientLeft,
            c.y = p.y + r.clientTop
    }
    const h = i && !d && !s ? ay(i, a) : Vt(0);
    return {
        width: n.width * u.x,
        height: n.height * u.y,
        x: n.x * u.x - a.scrollLeft * u.x + c.x + h.x,
        y: n.y * u.y - a.scrollTop * u.y + c.y + h.y
    }
}
function tb(e) {
    return Array.from(e.getClientRects())
}
function nb(e) {
    const t = Wt(e)
        , n = Bl(e)
        , r = e.ownerDocument.body
        , o = et(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth)
        , s = et(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
    let i = -n.scrollLeft + Ul(e);
    const l = -n.scrollTop;
    return At(r).direction === "rtl" && (i += et(t.clientWidth, r.clientWidth) - o),
    {
        width: o,
        height: s,
        x: i,
        y: l
    }
}
const Ep = 25;
function rb(e, t) {
    const n = rt(e)
        , r = Wt(e)
        , o = n.visualViewport;
    let s = r.clientWidth
        , i = r.clientHeight
        , l = 0
        , a = 0;
    if (o) {
        s = o.width,
            i = o.height;
        const c = sd();
        (!c || c && t === "fixed") && (l = o.offsetLeft,
            a = o.offsetTop)
    }
    const u = Ul(r);
    if (u <= 0) {
        const c = r.ownerDocument
            , d = c.body
            , h = getComputedStyle(d)
            , p = c.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0
            , m = Math.abs(r.clientWidth - d.clientWidth - p);
        m <= Ep && (s -= m)
    } else
        u <= Ep && (s += u);
    return {
        width: s,
        height: i,
        x: l,
        y: a
    }
}
const ob = new Set(["absolute", "fixed"]);
function sb(e, t) {
    const n = Cr(e, !0, t === "fixed")
        , r = n.top + e.clientTop
        , o = n.left + e.clientLeft
        , s = Ht(e) ? eo(e) : Vt(1)
        , i = e.clientWidth * s.x
        , l = e.clientHeight * s.y
        , a = o * s.x
        , u = r * s.y;
    return {
        width: i,
        height: l,
        x: a,
        y: u
    }
}
function bp(e, t, n) {
    let r;
    if (t === "viewport")
        r = rb(e, n);
    else if (t === "document")
        r = nb(Wt(e));
    else if (Ot(t))
        r = sb(t, n);
    else {
        const o = ly(e);
        r = {
            x: t.x - o.x,
            y: t.y - o.y,
            width: t.width,
            height: t.height
        }
    }
    return al(r)
}
function uy(e, t) {
    const n = Kn(e);
    return n === t || !Ot(n) || xo(n) ? !1 : At(n).position === "fixed" || uy(n, t)
}
function ib(e, t) {
    const n = t.get(e);
    if (n)
        return n;
    let r = bs(e, [], !1).filter(l => Ot(l) && No(l) !== "body")
        , o = null;
    const s = At(e).position === "fixed";
    let i = s ? Kn(e) : e;
    for (; Ot(i) && !xo(i);) {
        const l = At(i)
            , a = od(i);
        !a && l.position === "fixed" && (o = null),
            (s ? !a && !o : !a && l.position === "static" && !!o && ob.has(o.position) || $s(i) && !a && uy(e, i)) ? r = r.filter(c => c !== i) : o = l,
            i = Kn(i)
    }
    return t.set(e, r),
        r
}
function lb(e) {
    let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
    const i = [...n === "clippingAncestors" ? $l(t) ? [] : ib(t, this._c) : [].concat(n), r]
        , l = i[0]
        , a = i.reduce((u, c) => {
            const d = bp(t, c, o);
            return u.top = et(d.top, u.top),
                u.right = Qn(d.right, u.right),
                u.bottom = Qn(d.bottom, u.bottom),
                u.left = et(d.left, u.left),
                u
        }
            , bp(t, l, o));
    return {
        width: a.right - a.left,
        height: a.bottom - a.top,
        x: a.left,
        y: a.top
    }
}
function ab(e) {
    const { width: t, height: n } = iy(e);
    return {
        width: t,
        height: n
    }
}
function ub(e, t, n) {
    const r = Ht(t)
        , o = Wt(t)
        , s = n === "fixed"
        , i = Cr(e, !0, s, t);
    let l = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const a = Vt(0);
    function u() {
        a.x = Ul(o)
    }
    if (r || !r && !s)
        if ((No(t) !== "body" || $s(o)) && (l = Bl(t)),
            r) {
            const p = Cr(t, !0, s, t);
            a.x = p.x + t.clientLeft,
                a.y = p.y + t.clientTop
        } else
            o && u();
    s && !r && o && u();
    const c = o && !r && !s ? ay(o, l) : Vt(0)
        , d = i.left + l.scrollLeft - a.x - c.x
        , h = i.top + l.scrollTop - a.y - c.y;
    return {
        x: d,
        y: h,
        width: i.width,
        height: i.height
    }
}
function Ta(e) {
    return At(e).position === "static"
}
function Cp(e, t) {
    if (!Ht(e) || At(e).position === "fixed")
        return null;
    if (t)
        return t(e);
    let n = e.offsetParent;
    return Wt(e) === n && (n = n.ownerDocument.body),
        n
}
function cy(e, t) {
    const n = rt(e);
    if ($l(e))
        return n;
    if (!Ht(e)) {
        let o = Kn(e);
        for (; o && !xo(o);) {
            if (Ot(o) && !Ta(o))
                return o;
            o = Kn(o)
        }
        return n
    }
    let r = Cp(e, t);
    for (; r && WE(r) && Ta(r);)
        r = Cp(r, t);
    return r && xo(r) && Ta(r) && !od(r) ? n : r || GE(e) || n
}
const cb = async function (e) {
    const t = this.getOffsetParent || cy
        , n = this.getDimensions
        , r = await n(e.floating);
    return {
        reference: ub(e.reference, await t(e.floating), e.strategy),
        floating: {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
        }
    }
};
function db(e) {
    return At(e).direction === "rtl"
}
const fb = {
    convertOffsetParentRelativeRectToViewportRelativeRect: eb,
    getDocumentElement: Wt,
    getClippingRect: lb,
    getOffsetParent: cy,
    getElementRects: cb,
    getClientRects: tb,
    getDimensions: ab,
    getScale: eo,
    isElement: Ot,
    isRTL: db
};
function dy(e, t) {
    return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function pb(e, t) {
    let n = null, r;
    const o = Wt(e);
    function s() {
        var l;
        clearTimeout(r),
            (l = n) == null || l.disconnect(),
            n = null
    }
    function i(l, a) {
        l === void 0 && (l = !1),
            a === void 0 && (a = 1),
            s();
        const u = e.getBoundingClientRect()
            , { left: c, top: d, width: h, height: p } = u;
        if (l || t(),
            !h || !p)
            return;
        const m = di(d)
            , g = di(o.clientWidth - (c + h))
            , w = di(o.clientHeight - (d + p))
            , v = di(c)
            , x = {
                rootMargin: -m + "px " + -g + "px " + -w + "px " + -v + "px",
                threshold: et(0, Qn(1, a)) || 1
            };
        let E = !0;
        function b(C) {
            const k = C[0].intersectionRatio;
            if (k !== a) {
                if (!E)
                    return i();
                k ? i(!1, k) : r = setTimeout(() => {
                    i(!1, 1e-7)
                }
                    , 1e3)
            }
            k === 1 && !dy(u, e.getBoundingClientRect()) && i(),
                E = !1
        }
        try {
            n = new IntersectionObserver(b, {
                ...x,
                root: o.ownerDocument
            })
        } catch {
            n = new IntersectionObserver(b, x)
        }
        n.observe(e)
    }
    return i(!0),
        s
}
function hb(e, t, n, r) {
    r === void 0 && (r = {});
    const { ancestorScroll: o = !0, ancestorResize: s = !0, elementResize: i = typeof ResizeObserver == "function", layoutShift: l = typeof IntersectionObserver == "function", animationFrame: a = !1 } = r
        , u = id(e)
        , c = o || s ? [...u ? bs(u) : [], ...bs(t)] : [];
    c.forEach(v => {
        o && v.addEventListener("scroll", n, {
            passive: !0
        }),
            s && v.addEventListener("resize", n)
    }
    );
    const d = u && l ? pb(u, n) : null;
    let h = -1
        , p = null;
    i && (p = new ResizeObserver(v => {
        let [y] = v;
        y && y.target === u && p && (p.unobserve(t),
            cancelAnimationFrame(h),
            h = requestAnimationFrame(() => {
                var x;
                (x = p) == null || x.observe(t)
            }
            )),
            n()
    }
    ),
        u && !a && p.observe(u),
        p.observe(t));
    let m, g = a ? Cr(e) : null;
    a && w();
    function w() {
        const v = Cr(e);
        g && !dy(g, v) && n(),
            g = v,
            m = requestAnimationFrame(w)
    }
    return n(),
        () => {
            var v;
            c.forEach(y => {
                o && y.removeEventListener("scroll", n),
                    s && y.removeEventListener("resize", n)
            }
            ),
                d == null || d(),
                (v = p) == null || v.disconnect(),
                p = null,
                a && cancelAnimationFrame(m)
        }
}
const mb = zE
    , gb = $E
    , yb = IE
    , vb = UE
    , xb = ME
    , kp = DE
    , wb = BE
    , Sb = (e, t, n) => {
        const r = new Map
            , o = {
                platform: fb,
                ...n
            }
            , s = {
                ...o.platform,
                _c: r
            };
        return LE(e, t, {
            ...o,
            platform: s
        })
    }
    ;
var Eb = typeof document < "u"
    , bb = function () { }
    , ji = Eb ? S.useLayoutEffect : bb;
function ul(e, t) {
    if (e === t)
        return !0;
    if (typeof e != typeof t)
        return !1;
    if (typeof e == "function" && e.toString() === t.toString())
        return !0;
    let n, r, o;
    if (e && t && typeof e == "object") {
        if (Array.isArray(e)) {
            if (n = e.length,
                n !== t.length)
                return !1;
            for (r = n; r-- !== 0;)
                if (!ul(e[r], t[r]))
                    return !1;
            return !0
        }
        if (o = Object.keys(e),
            n = o.length,
            n !== Object.keys(t).length)
            return !1;
        for (r = n; r-- !== 0;)
            if (!{}.hasOwnProperty.call(t, o[r]))
                return !1;
        for (r = n; r-- !== 0;) {
            const s = o[r];
            if (!(s === "_owner" && e.$$typeof) && !ul(e[s], t[s]))
                return !1
        }
        return !0
    }
    return e !== e && t !== t
}
function fy(e) {
    return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function Pp(e, t) {
    const n = fy(e);
    return Math.round(t * n) / n
}
function Ra(e) {
    const t = S.useRef(e);
    return ji(() => {
        t.current = e
    }
    ),
        t
}
function Cb(e) {
    e === void 0 && (e = {});
    const { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: o, elements: { reference: s, floating: i } = {}, transform: l = !0, whileElementsMounted: a, open: u } = e
        , [c, d] = S.useState({
            x: 0,
            y: 0,
            strategy: n,
            placement: t,
            middlewareData: {},
            isPositioned: !1
        })
        , [h, p] = S.useState(r);
    ul(h, r) || p(r);
    const [m, g] = S.useState(null)
        , [w, v] = S.useState(null)
        , y = S.useCallback(N => {
            N !== C.current && (C.current = N,
                g(N))
        }
            , [])
        , x = S.useCallback(N => {
            N !== k.current && (k.current = N,
                v(N))
        }
            , [])
        , E = s || m
        , b = i || w
        , C = S.useRef(null)
        , k = S.useRef(null)
        , R = S.useRef(c)
        , L = a != null
        , D = Ra(a)
        , U = Ra(o)
        , M = Ra(u)
        , Q = S.useCallback(() => {
            if (!C.current || !k.current)
                return;
            const N = {
                placement: t,
                strategy: n,
                middleware: h
            };
            U.current && (N.platform = U.current),
                Sb(C.current, k.current, N).then(j => {
                    const I = {
                        ...j,
                        isPositioned: M.current !== !1
                    };
                    _.current && !ul(R.current, I) && (R.current = I,
                        As.flushSync(() => {
                            d(I)
                        }
                        ))
                }
                )
        }
            , [h, t, n, U, M]);
    ji(() => {
        u === !1 && R.current.isPositioned && (R.current.isPositioned = !1,
            d(N => ({
                ...N,
                isPositioned: !1
            })))
    }
        , [u]);
    const _ = S.useRef(!1);
    ji(() => (_.current = !0,
        () => {
            _.current = !1
        }
    ), []),
        ji(() => {
            if (E && (C.current = E),
                b && (k.current = b),
                E && b) {
                if (D.current)
                    return D.current(E, b, Q);
                Q()
            }
        }
            , [E, b, Q, D, L]);
    const X = S.useMemo(() => ({
        reference: C,
        floating: k,
        setReference: y,
        setFloating: x
    }), [y, x])
        , z = S.useMemo(() => ({
            reference: E,
            floating: b
        }), [E, b])
        , W = S.useMemo(() => {
            const N = {
                position: n,
                left: 0,
                top: 0
            };
            if (!z.floating)
                return N;
            const j = Pp(z.floating, c.x)
                , I = Pp(z.floating, c.y);
            return l ? {
                ...N,
                transform: "translate(" + j + "px, " + I + "px)",
                ...fy(z.floating) >= 1.5 && {
                    willChange: "transform"
                }
            } : {
                position: n,
                left: j,
                top: I
            }
        }
            , [n, l, z.floating, c.x, c.y]);
    return S.useMemo(() => ({
        ...c,
        update: Q,
        refs: X,
        elements: z,
        floatingStyles: W
    }), [c, Q, X, z, W])
}
const kb = e => {
    function t(n) {
        return {}.hasOwnProperty.call(n, "current")
    }
    return {
        name: "arrow",
        options: e,
        fn(n) {
            const { element: r, padding: o } = typeof e == "function" ? e(n) : e;
            return r && t(r) ? r.current != null ? kp({
                element: r.current,
                padding: o
            }).fn(n) : {} : r ? kp({
                element: r,
                padding: o
            }).fn(n) : {}
        }
    }
}
    , Pb = (e, t) => ({
        ...mb(e),
        options: [e, t]
    })
    , Nb = (e, t) => ({
        ...gb(e),
        options: [e, t]
    })
    , Tb = (e, t) => ({
        ...wb(e),
        options: [e, t]
    })
    , Rb = (e, t) => ({
        ...yb(e),
        options: [e, t]
    })
    , jb = (e, t) => ({
        ...vb(e),
        options: [e, t]
    })
    , Ob = (e, t) => ({
        ...xb(e),
        options: [e, t]
    })
    , Ab = (e, t) => ({
        ...kb(e),
        options: [e, t]
    });
var _b = "Arrow"
    , py = S.forwardRef((e, t) => {
        const { children: n, width: r = 10, height: o = 5, ...s } = e;
        return f.jsx(Je.svg, {
            ...s,
            ref: t,
            width: r,
            height: o,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild ? n : f.jsx("polygon", {
                points: "0,0 30,0 15,10"
            })
        })
    }
    );
py.displayName = _b;
var Lb = py;
function Db(e) {
    const [t, n] = S.useState(void 0);
    return Wn(() => {
        if (e) {
            n({
                width: e.offsetWidth,
                height: e.offsetHeight
            });
            const r = new ResizeObserver(o => {
                if (!Array.isArray(o) || !o.length)
                    return;
                const s = o[0];
                let i, l;
                if ("borderBoxSize" in s) {
                    const a = s.borderBoxSize
                        , u = Array.isArray(a) ? a[0] : a;
                    i = u.inlineSize,
                        l = u.blockSize
                } else
                    i = e.offsetWidth,
                        l = e.offsetHeight;
                n({
                    width: i,
                    height: l
                })
            }
            );
            return r.observe(e, {
                box: "border-box"
            }),
                () => r.unobserve(e)
        } else
            n(void 0)
    }
        , [e]),
        t
}
var hy = "Popper"
    , [my, gy] = Fl(hy)
    , [TN, yy] = my(hy)
    , vy = "PopperAnchor"
    , xy = S.forwardRef((e, t) => {
        const { __scopePopper: n, virtualRef: r, ...o } = e
            , s = yy(vy, n)
            , i = S.useRef(null)
            , l = jt(t, i)
            , a = S.useRef(null);
        return S.useEffect(() => {
            const u = a.current;
            a.current = (r == null ? void 0 : r.current) || i.current,
                u !== a.current && s.onAnchorChange(a.current)
        }
        ),
            r ? null : f.jsx(Je.div, {
                ...o,
                ref: l
            })
    }
    );
xy.displayName = vy;
var ld = "PopperContent"
    , [Ib, Mb] = my(ld)
    , wy = S.forwardRef((e, t) => {
        var re, Rr, un, er, cn, jr;
        const { __scopePopper: n, side: r = "bottom", sideOffset: o = 0, align: s = "center", alignOffset: i = 0, arrowPadding: l = 0, avoidCollisions: a = !0, collisionBoundary: u = [], collisionPadding: c = 0, sticky: d = "partial", hideWhenDetached: h = !1, updatePositionStrategy: p = "optimized", onPlaced: m, ...g } = e
            , w = yy(ld, n)
            , [v, y] = S.useState(null)
            , x = jt(t, dn => y(dn))
            , [E, b] = S.useState(null)
            , C = Db(E)
            , k = (C == null ? void 0 : C.width) ?? 0
            , R = (C == null ? void 0 : C.height) ?? 0
            , L = r + (s !== "center" ? "-" + s : "")
            , D = typeof c == "number" ? c : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                ...c
            }
            , U = Array.isArray(u) ? u : [u]
            , M = U.length > 0
            , Q = {
                padding: D,
                boundary: U.filter(zb),
                altBoundary: M
            }
            , { refs: _, floatingStyles: X, placement: z, isPositioned: W, middlewareData: N } = Cb({
                strategy: "fixed",
                placement: L,
                whileElementsMounted: (...dn) => hb(...dn, {
                    animationFrame: p === "always"
                }),
                elements: {
                    reference: w.anchor
                },
                middleware: [Pb({
                    mainAxis: o + R,
                    alignmentAxis: i
                }), a && Nb({
                    mainAxis: !0,
                    crossAxis: !1,
                    limiter: d === "partial" ? Tb() : void 0,
                    ...Q
                }), a && Rb({
                    ...Q
                }), jb({
                    ...Q,
                    apply: ({ elements: dn, rects: Us, availableWidth: Kl, availableHeight: Vs }) => {
                        const { width: ql, height: Ro } = Us.reference
                            , Or = dn.floating.style;
                        Or.setProperty("--radix-popper-available-width", `${Kl}px`),
                            Or.setProperty("--radix-popper-available-height", `${Vs}px`),
                            Or.setProperty("--radix-popper-anchor-width", `${ql}px`),
                            Or.setProperty("--radix-popper-anchor-height", `${Ro}px`)
                    }
                }), E && Ab({
                    element: E,
                    padding: l
                }), $b({
                    arrowWidth: k,
                    arrowHeight: R
                }), h && Ob({
                    strategy: "referenceHidden",
                    ...Q
                })]
            })
            , [j, I] = by(z)
            , B = Hn(m);
        Wn(() => {
            W && (B == null || B())
        }
            , [W, B]);
        const $ = (re = N.arrow) == null ? void 0 : re.x
            , q = (Rr = N.arrow) == null ? void 0 : Rr.y
            , Y = ((un = N.arrow) == null ? void 0 : un.centerOffset) !== 0
            , [pe, Oe] = S.useState();
        return Wn(() => {
            v && Oe(window.getComputedStyle(v).zIndex)
        }
            , [v]),
            f.jsx("div", {
                ref: _.setFloating,
                "data-radix-popper-content-wrapper": "",
                style: {
                    ...X,
                    transform: W ? X.transform : "translate(0, -200%)",
                    minWidth: "max-content",
                    zIndex: pe,
                    "--radix-popper-transform-origin": [(er = N.transformOrigin) == null ? void 0 : er.x, (cn = N.transformOrigin) == null ? void 0 : cn.y].join(" "),
                    ...((jr = N.hide) == null ? void 0 : jr.referenceHidden) && {
                        visibility: "hidden",
                        pointerEvents: "none"
                    }
                },
                dir: e.dir,
                children: f.jsx(Ib, {
                    scope: n,
                    placedSide: j,
                    onArrowChange: b,
                    arrowX: $,
                    arrowY: q,
                    shouldHideArrow: Y,
                    children: f.jsx(Je.div, {
                        "data-side": j,
                        "data-align": I,
                        ...g,
                        ref: x,
                        style: {
                            ...g.style,
                            animation: W ? void 0 : "none"
                        }
                    })
                })
            })
    }
    );
wy.displayName = ld;
var Sy = "PopperArrow"
    , Fb = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
    }
    , Ey = S.forwardRef(function (t, n) {
        const { __scopePopper: r, ...o } = t
            , s = Mb(Sy, r)
            , i = Fb[s.placedSide];
        return f.jsx("span", {
            ref: s.onArrowChange,
            style: {
                position: "absolute",
                left: s.arrowX,
                top: s.arrowY,
                [i]: 0,
                transformOrigin: {
                    top: "",
                    right: "0 0",
                    bottom: "center 0",
                    left: "100% 0"
                }[s.placedSide],
                transform: {
                    top: "translateY(100%)",
                    right: "translateY(50%) rotate(90deg) translateX(-50%)",
                    bottom: "rotate(180deg)",
                    left: "translateY(50%) rotate(-90deg) translateX(50%)"
                }[s.placedSide],
                visibility: s.shouldHideArrow ? "hidden" : void 0
            },
            children: f.jsx(Lb, {
                ...o,
                ref: n,
                style: {
                    ...o.style,
                    display: "block"
                }
            })
        })
    });
Ey.displayName = Sy;
function zb(e) {
    return e !== null
}
var $b = e => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
        var w, v, y;
        const { placement: n, rects: r, middlewareData: o } = t
            , i = ((w = o.arrow) == null ? void 0 : w.centerOffset) !== 0
            , l = i ? 0 : e.arrowWidth
            , a = i ? 0 : e.arrowHeight
            , [u, c] = by(n)
            , d = {
                start: "0%",
                center: "50%",
                end: "100%"
            }[c]
            , h = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + l / 2
            , p = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + a / 2;
        let m = ""
            , g = "";
        return u === "bottom" ? (m = i ? d : `${h}px`,
            g = `${-a}px`) : u === "top" ? (m = i ? d : `${h}px`,
                g = `${r.floating.height + a}px`) : u === "right" ? (m = `${-a}px`,
                    g = i ? d : `${p}px`) : u === "left" && (m = `${r.floating.width + a}px`,
                        g = i ? d : `${p}px`),
        {
            data: {
                x: m,
                y: g
            }
        }
    }
});
function by(e) {
    const [t, n = "center"] = e.split("-");
    return [t, n]
}
var Bb = xy
    , Ub = wy
    , Vb = Ey
    , Hb = "Portal"
    , Cy = S.forwardRef((e, t) => {
        var l;
        const { container: n, ...r } = e
            , [o, s] = S.useState(!1);
        Wn(() => s(!0), []);
        const i = n || o && ((l = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : l.body);
        return i ? lg.createPortal(f.jsx(Je.div, {
            ...r,
            ref: t
        }), i) : null
    }
    );
Cy.displayName = Hb;
function Wb(e, t) {
    return S.useReducer((n, r) => t[n][r] ?? n, e)
}
var ad = e => {
    const { present: t, children: n } = e
        , r = Qb(t)
        , o = typeof n == "function" ? n({
            present: r.isPresent
        }) : S.Children.only(n)
        , s = jt(r.ref, Kb(o));
    return typeof n == "function" || r.isPresent ? S.cloneElement(o, {
        ref: s
    }) : null
}
    ;
ad.displayName = "Presence";
function Qb(e) {
    const [t, n] = S.useState()
        , r = S.useRef(null)
        , o = S.useRef(e)
        , s = S.useRef("none")
        , i = e ? "mounted" : "unmounted"
        , [l, a] = Wb(i, {
            mounted: {
                UNMOUNT: "unmounted",
                ANIMATION_OUT: "unmountSuspended"
            },
            unmountSuspended: {
                MOUNT: "mounted",
                ANIMATION_END: "unmounted"
            },
            unmounted: {
                MOUNT: "mounted"
            }
        });
    return S.useEffect(() => {
        const u = fi(r.current);
        s.current = l === "mounted" ? u : "none"
    }
        , [l]),
        Wn(() => {
            const u = r.current
                , c = o.current;
            if (c !== e) {
                const h = s.current
                    , p = fi(u);
                e ? a("MOUNT") : p === "none" || (u == null ? void 0 : u.display) === "none" ? a("UNMOUNT") : a(c && h !== p ? "ANIMATION_OUT" : "UNMOUNT"),
                    o.current = e
            }
        }
            , [e, a]),
        Wn(() => {
            if (t) {
                let u;
                const c = t.ownerDocument.defaultView ?? window
                    , d = p => {
                        const g = fi(r.current).includes(CSS.escape(p.animationName));
                        if (p.target === t && g && (a("ANIMATION_END"),
                            !o.current)) {
                            const w = t.style.animationFillMode;
                            t.style.animationFillMode = "forwards",
                                u = c.setTimeout(() => {
                                    t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w)
                                }
                                )
                        }
                    }
                    , h = p => {
                        p.target === t && (s.current = fi(r.current))
                    }
                    ;
                return t.addEventListener("animationstart", h),
                    t.addEventListener("animationcancel", d),
                    t.addEventListener("animationend", d),
                    () => {
                        c.clearTimeout(u),
                            t.removeEventListener("animationstart", h),
                            t.removeEventListener("animationcancel", d),
                            t.removeEventListener("animationend", d)
                    }
            } else
                a("ANIMATION_END")
        }
            , [t, a]),
    {
        isPresent: ["mounted", "unmountSuspended"].includes(l),
        ref: S.useCallback(u => {
            r.current = u ? getComputedStyle(u) : null,
                n(u)
        }
            , [])
    }
}
function fi(e) {
    return (e == null ? void 0 : e.animationName) || "none"
}
function Kb(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get
        , n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get,
        n = t && "isReactWarning" in t && t.isReactWarning,
        n ? e.props.ref : e.props.ref || e.ref)
}
var qb = Symbol("radix.slottable");
function Yb(e) {
    const t = ({ children: n }) => f.jsx(f.Fragment, {
        children: n
    });
    return t.displayName = `${e}.Slottable`,
        t.__radixId = qb,
        t
}
var Gb = Zu[" useInsertionEffect ".trim().toString()] || Wn;
function Xb({ prop: e, defaultProp: t, onChange: n = () => { }
    , caller: r }) {
    const [o, s, i] = Jb({
        defaultProp: t,
        onChange: n
    })
        , l = e !== void 0
        , a = l ? e : o;
    {
        const c = S.useRef(e !== void 0);
        S.useEffect(() => {
            const d = c.current;
            d !== l && console.warn(`${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),
                c.current = l
        }
            , [l, r])
    }
    const u = S.useCallback(c => {
        var d;
        if (l) {
            const h = Zb(c) ? c(e) : c;
            h !== e && ((d = i.current) == null || d.call(i, h))
        } else
            s(c)
    }
        , [l, e, s, i]);
    return [a, u]
}
function Jb({ defaultProp: e, onChange: t }) {
    const [n, r] = S.useState(e)
        , o = S.useRef(n)
        , s = S.useRef(t);
    return Gb(() => {
        s.current = t
    }
        , [t]),
        S.useEffect(() => {
            var i;
            o.current !== n && ((i = s.current) == null || i.call(s, n),
                o.current = n)
        }
            , [n, o]),
        [n, r, s]
}
function Zb(e) {
    return typeof e == "function"
}
var eC = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal"
})
    , tC = "VisuallyHidden"
    , Vl = S.forwardRef((e, t) => f.jsx(Je.span, {
        ...e,
        ref: t,
        style: {
            ...eC,
            ...e.style
        }
    }));
Vl.displayName = tC;
var nC = Vl
    , [Hl] = Fl("Tooltip", [gy])
    , ud = gy()
    , ky = "TooltipProvider"
    , rC = 700
    , Np = "tooltip.open"
    , [oC, Py] = Hl(ky)
    , Ny = e => {
        const { __scopeTooltip: t, delayDuration: n = rC, skipDelayDuration: r = 300, disableHoverableContent: o = !1, children: s } = e
            , i = S.useRef(!0)
            , l = S.useRef(!1)
            , a = S.useRef(0);
        return S.useEffect(() => {
            const u = a.current;
            return () => window.clearTimeout(u)
        }
            , []),
            f.jsx(oC, {
                scope: t,
                isOpenDelayedRef: i,
                delayDuration: n,
                onOpen: S.useCallback(() => {
                    window.clearTimeout(a.current),
                        i.current = !1
                }
                    , []),
                onClose: S.useCallback(() => {
                    window.clearTimeout(a.current),
                        a.current = window.setTimeout(() => i.current = !0, r)
                }
                    , [r]),
                isPointerInTransitRef: l,
                onPointerInTransitChange: S.useCallback(u => {
                    l.current = u
                }
                    , []),
                disableHoverableContent: o,
                children: s
            })
    }
    ;
Ny.displayName = ky;
var Ty = "Tooltip"
    , [RN, Wl] = Hl(Ty)
    , Uu = "TooltipTrigger"
    , sC = S.forwardRef((e, t) => {
        const { __scopeTooltip: n, ...r } = e
            , o = Wl(Uu, n)
            , s = Py(Uu, n)
            , i = ud(n)
            , l = S.useRef(null)
            , a = jt(t, l, o.onTriggerChange)
            , u = S.useRef(!1)
            , c = S.useRef(!1)
            , d = S.useCallback(() => u.current = !1, []);
        return S.useEffect(() => () => document.removeEventListener("pointerup", d), [d]),
            f.jsx(Bb, {
                asChild: !0,
                ...i,
                children: f.jsx(Je.button, {
                    "aria-describedby": o.open ? o.contentId : void 0,
                    "data-state": o.stateAttribute,
                    ...r,
                    ref: a,
                    onPointerMove: be(e.onPointerMove, h => {
                        h.pointerType !== "touch" && !c.current && !s.isPointerInTransitRef.current && (o.onTriggerEnter(),
                            c.current = !0)
                    }
                    ),
                    onPointerLeave: be(e.onPointerLeave, () => {
                        o.onTriggerLeave(),
                            c.current = !1
                    }
                    ),
                    onPointerDown: be(e.onPointerDown, () => {
                        o.open && o.onClose(),
                            u.current = !0,
                            document.addEventListener("pointerup", d, {
                                once: !0
                            })
                    }
                    ),
                    onFocus: be(e.onFocus, () => {
                        u.current || o.onOpen()
                    }
                    ),
                    onBlur: be(e.onBlur, o.onClose),
                    onClick: be(e.onClick, o.onClose)
                })
            })
    }
    );
sC.displayName = Uu;
var iC = "TooltipPortal"
    , [jN, lC] = Hl(iC, {
        forceMount: void 0
    })
    , wo = "TooltipContent"
    , Ry = S.forwardRef((e, t) => {
        const n = lC(wo, e.__scopeTooltip)
            , { forceMount: r = n.forceMount, side: o = "top", ...s } = e
            , i = Wl(wo, e.__scopeTooltip);
        return f.jsx(ad, {
            present: r || i.open,
            children: i.disableHoverableContent ? f.jsx(jy, {
                side: o,
                ...s,
                ref: t
            }) : f.jsx(aC, {
                side: o,
                ...s,
                ref: t
            })
        })
    }
    )
    , aC = S.forwardRef((e, t) => {
        const n = Wl(wo, e.__scopeTooltip)
            , r = Py(wo, e.__scopeTooltip)
            , o = S.useRef(null)
            , s = jt(t, o)
            , [i, l] = S.useState(null)
            , { trigger: a, onClose: u } = n
            , c = o.current
            , { onPointerInTransitChange: d } = r
            , h = S.useCallback(() => {
                l(null),
                    d(!1)
            }
                , [d])
            , p = S.useCallback((m, g) => {
                const w = m.currentTarget
                    , v = {
                        x: m.clientX,
                        y: m.clientY
                    }
                    , y = pC(v, w.getBoundingClientRect())
                    , x = hC(v, y)
                    , E = mC(g.getBoundingClientRect())
                    , b = yC([...x, ...E]);
                l(b),
                    d(!0)
            }
                , [d]);
        return S.useEffect(() => () => h(), [h]),
            S.useEffect(() => {
                if (a && c) {
                    const m = w => p(w, c)
                        , g = w => p(w, a);
                    return a.addEventListener("pointerleave", m),
                        c.addEventListener("pointerleave", g),
                        () => {
                            a.removeEventListener("pointerleave", m),
                                c.removeEventListener("pointerleave", g)
                        }
                }
            }
                , [a, c, p, h]),
            S.useEffect(() => {
                if (i) {
                    const m = g => {
                        const w = g.target
                            , v = {
                                x: g.clientX,
                                y: g.clientY
                            }
                            , y = (a == null ? void 0 : a.contains(w)) || (c == null ? void 0 : c.contains(w))
                            , x = !gC(v, i);
                        y ? h() : x && (h(),
                            u())
                    }
                        ;
                    return document.addEventListener("pointermove", m),
                        () => document.removeEventListener("pointermove", m)
                }
            }
                , [a, c, i, u, h]),
            f.jsx(jy, {
                ...e,
                ref: s
            })
    }
    )
    , [uC, cC] = Hl(Ty, {
        isInside: !1
    })
    , dC = Yb("TooltipContent")
    , jy = S.forwardRef((e, t) => {
        const { __scopeTooltip: n, children: r, "aria-label": o, onEscapeKeyDown: s, onPointerDownOutside: i, ...l } = e
            , a = Wl(wo, n)
            , u = ud(n)
            , { onClose: c } = a;
        return S.useEffect(() => (document.addEventListener(Np, c),
            () => document.removeEventListener(Np, c)), [c]),
            S.useEffect(() => {
                if (a.trigger) {
                    const d = h => {
                        const p = h.target;
                        p != null && p.contains(a.trigger) && c()
                    }
                        ;
                    return window.addEventListener("scroll", d, {
                        capture: !0
                    }),
                        () => window.removeEventListener("scroll", d, {
                            capture: !0
                        })
                }
            }
                , [a.trigger, c]),
            f.jsx(ed, {
                asChild: !0,
                disableOutsidePointerEvents: !1,
                onEscapeKeyDown: s,
                onPointerDownOutside: i,
                onFocusOutside: d => d.preventDefault(),
                onDismiss: c,
                children: f.jsxs(Ub, {
                    "data-state": a.stateAttribute,
                    ...u,
                    ...l,
                    ref: t,
                    style: {
                        ...l.style,
                        "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                        "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                        "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                        "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                        "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                    },
                    children: [f.jsx(dC, {
                        children: r
                    }), f.jsx(uC, {
                        scope: n,
                        isInside: !0,
                        children: f.jsx(nC, {
                            id: a.contentId,
                            role: "tooltip",
                            children: o || r
                        })
                    })]
                })
            })
    }
    );
Ry.displayName = wo;
var Oy = "TooltipArrow"
    , fC = S.forwardRef((e, t) => {
        const { __scopeTooltip: n, ...r } = e
            , o = ud(n);
        return cC(Oy, n).isInside ? null : f.jsx(Vb, {
            ...o,
            ...r,
            ref: t
        })
    }
    );
fC.displayName = Oy;
function pC(e, t) {
    const n = Math.abs(t.top - e.y)
        , r = Math.abs(t.bottom - e.y)
        , o = Math.abs(t.right - e.x)
        , s = Math.abs(t.left - e.x);
    switch (Math.min(n, r, o, s)) {
        case s:
            return "left";
        case o:
            return "right";
        case n:
            return "top";
        case r:
            return "bottom";
        default:
            throw new Error("unreachable")
    }
}
function hC(e, t, n = 5) {
    const r = [];
    switch (t) {
        case "top":
            r.push({
                x: e.x - n,
                y: e.y + n
            }, {
                x: e.x + n,
                y: e.y + n
            });
            break;
        case "bottom":
            r.push({
                x: e.x - n,
                y: e.y - n
            }, {
                x: e.x + n,
                y: e.y - n
            });
            break;
        case "left":
            r.push({
                x: e.x + n,
                y: e.y - n
            }, {
                x: e.x + n,
                y: e.y + n
            });
            break;
        case "right":
            r.push({
                x: e.x - n,
                y: e.y - n
            }, {
                x: e.x - n,
                y: e.y + n
            });
            break
    }
    return r
}
function mC(e) {
    const { top: t, right: n, bottom: r, left: o } = e;
    return [{
        x: o,
        y: t
    }, {
        x: n,
        y: t
    }, {
        x: n,
        y: r
    }, {
        x: o,
        y: r
    }]
}
function gC(e, t) {
    const { x: n, y: r } = e;
    let o = !1;
    for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
        const l = t[s]
            , a = t[i]
            , u = l.x
            , c = l.y
            , d = a.x
            , h = a.y;
        c > r != h > r && n < (d - u) * (r - c) / (h - c) + u && (o = !o)
    }
    return o
}
function yC(e) {
    const t = e.slice();
    return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0),
        vC(t)
}
function vC(e) {
    if (e.length <= 1)
        return e.slice();
    const t = [];
    for (let r = 0; r < e.length; r++) {
        const o = e[r];
        for (; t.length >= 2;) {
            const s = t[t.length - 1]
                , i = t[t.length - 2];
            if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x))
                t.pop();
            else
                break
        }
        t.push(o)
    }
    t.pop();
    const n = [];
    for (let r = e.length - 1; r >= 0; r--) {
        const o = e[r];
        for (; n.length >= 2;) {
            const s = n[n.length - 1]
                , i = n[n.length - 2];
            if ((s.x - i.x) * (o.y - i.y) >= (s.y - i.y) * (o.x - i.x))
                n.pop();
            else
                break
        }
        n.push(o)
    }
    return n.pop(),
        t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n)
}
var xC = Ny
    , Ay = Ry;
function _y(e) {
    var t, n, r = "";
    if (typeof e == "string" || typeof e == "number")
        r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++)
                e[t] && (n = _y(e[t])) && (r && (r += " "),
                    r += n)
        } else
            for (n in e)
                e[n] && (r && (r += " "),
                    r += n);
    return r
}
function Ly() {
    for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
        (e = arguments[n]) && (t = _y(e)) && (r && (r += " "),
            r += t);
    return r
}
const cd = "-"
    , wC = e => {
        const t = EC(e)
            , { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
        return {
            getClassGroupId: i => {
                const l = i.split(cd);
                return l[0] === "" && l.length !== 1 && l.shift(),
                    Dy(l, t) || SC(i)
            }
            ,
            getConflictingClassGroupIds: (i, l) => {
                const a = n[i] || [];
                return l && r[i] ? [...a, ...r[i]] : a
            }
        }
    }
    , Dy = (e, t) => {
        var i;
        if (e.length === 0)
            return t.classGroupId;
        const n = e[0]
            , r = t.nextPart.get(n)
            , o = r ? Dy(e.slice(1), r) : void 0;
        if (o)
            return o;
        if (t.validators.length === 0)
            return;
        const s = e.join(cd);
        return (i = t.validators.find(({ validator: l }) => l(s))) == null ? void 0 : i.classGroupId
    }
    , Tp = /^\[(.+)\]$/
    , SC = e => {
        if (Tp.test(e)) {
            const t = Tp.exec(e)[1]
                , n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
            if (n)
                return "arbitrary.." + n
        }
    }
    , EC = e => {
        const { theme: t, prefix: n } = e
            , r = {
                nextPart: new Map,
                validators: []
            };
        return CC(Object.entries(e.classGroups), n).forEach(([s, i]) => {
            Vu(i, r, s, t)
        }
        ),
            r
    }
    , Vu = (e, t, n, r) => {
        e.forEach(o => {
            if (typeof o == "string") {
                const s = o === "" ? t : Rp(t, o);
                s.classGroupId = n;
                return
            }
            if (typeof o == "function") {
                if (bC(o)) {
                    Vu(o(r), t, n, r);
                    return
                }
                t.validators.push({
                    validator: o,
                    classGroupId: n
                });
                return
            }
            Object.entries(o).forEach(([s, i]) => {
                Vu(i, Rp(t, s), n, r)
            }
            )
        }
        )
    }
    , Rp = (e, t) => {
        let n = e;
        return t.split(cd).forEach(r => {
            n.nextPart.has(r) || n.nextPart.set(r, {
                nextPart: new Map,
                validators: []
            }),
                n = n.nextPart.get(r)
        }
        ),
            n
    }
    , bC = e => e.isThemeGetter
    , CC = (e, t) => t ? e.map(([n, r]) => {
        const o = r.map(s => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([i, l]) => [t + i, l])) : s);
        return [n, o]
    }
    ) : e
    , kC = e => {
        if (e < 1)
            return {
                get: () => { }
                ,
                set: () => { }
            };
        let t = 0
            , n = new Map
            , r = new Map;
        const o = (s, i) => {
            n.set(s, i),
                t++,
                t > e && (t = 0,
                    r = n,
                    n = new Map)
        }
            ;
        return {
            get(s) {
                let i = n.get(s);
                if (i !== void 0)
                    return i;
                if ((i = r.get(s)) !== void 0)
                    return o(s, i),
                        i
            },
            set(s, i) {
                n.has(s) ? n.set(s, i) : o(s, i)
            }
        }
    }
    , Iy = "!"
    , PC = e => {
        const { separator: t, experimentalParseClassName: n } = e
            , r = t.length === 1
            , o = t[0]
            , s = t.length
            , i = l => {
                const a = [];
                let u = 0, c = 0, d;
                for (let w = 0; w < l.length; w++) {
                    let v = l[w];
                    if (u === 0) {
                        if (v === o && (r || l.slice(w, w + s) === t)) {
                            a.push(l.slice(c, w)),
                                c = w + s;
                            continue
                        }
                        if (v === "/") {
                            d = w;
                            continue
                        }
                    }
                    v === "[" ? u++ : v === "]" && u--
                }
                const h = a.length === 0 ? l : l.substring(c)
                    , p = h.startsWith(Iy)
                    , m = p ? h.substring(1) : h
                    , g = d && d > c ? d - c : void 0;
                return {
                    modifiers: a,
                    hasImportantModifier: p,
                    baseClassName: m,
                    maybePostfixModifierPosition: g
                }
            }
            ;
        return n ? l => n({
            className: l,
            parseClassName: i
        }) : i
    }
    , NC = e => {
        if (e.length <= 1)
            return e;
        const t = [];
        let n = [];
        return e.forEach(r => {
            r[0] === "[" ? (t.push(...n.sort(), r),
                n = []) : n.push(r)
        }
        ),
            t.push(...n.sort()),
            t
    }
    , TC = e => ({
        cache: kC(e.cacheSize),
        parseClassName: PC(e),
        ...wC(e)
    })
    , RC = /\s+/
    , jC = (e, t) => {
        const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: o } = t
            , s = []
            , i = e.trim().split(RC);
        let l = "";
        for (let a = i.length - 1; a >= 0; a -= 1) {
            const u = i[a]
                , { modifiers: c, hasImportantModifier: d, baseClassName: h, maybePostfixModifierPosition: p } = n(u);
            let m = !!p
                , g = r(m ? h.substring(0, p) : h);
            if (!g) {
                if (!m) {
                    l = u + (l.length > 0 ? " " + l : l);
                    continue
                }
                if (g = r(h),
                    !g) {
                    l = u + (l.length > 0 ? " " + l : l);
                    continue
                }
                m = !1
            }
            const w = NC(c).join(":")
                , v = d ? w + Iy : w
                , y = v + g;
            if (s.includes(y))
                continue;
            s.push(y);
            const x = o(g, m);
            for (let E = 0; E < x.length; ++E) {
                const b = x[E];
                s.push(v + b)
            }
            l = u + (l.length > 0 ? " " + l : l)
        }
        return l
    }
    ;
function OC() {
    let e = 0, t, n, r = "";
    for (; e < arguments.length;)
        (t = arguments[e++]) && (n = My(t)) && (r && (r += " "),
            r += n);
    return r
}
const My = e => {
    if (typeof e == "string")
        return e;
    let t, n = "";
    for (let r = 0; r < e.length; r++)
        e[r] && (t = My(e[r])) && (n && (n += " "),
            n += t);
    return n
}
    ;
function AC(e, ...t) {
    let n, r, o, s = i;
    function i(a) {
        const u = t.reduce((c, d) => d(c), e());
        return n = TC(u),
            r = n.cache.get,
            o = n.cache.set,
            s = l,
            l(a)
    }
    function l(a) {
        const u = r(a);
        if (u)
            return u;
        const c = jC(a, n);
        return o(a, c),
            c
    }
    return function () {
        return s(OC.apply(null, arguments))
    }
}
const le = e => {
    const t = n => n[e] || [];
    return t.isThemeGetter = !0,
        t
}
    , Fy = /^\[(?:([a-z-]+):)?(.+)\]$/i
    , _C = /^\d+\/\d+$/
    , LC = new Set(["px", "full", "screen"])
    , DC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/
    , IC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/
    , MC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/
    , FC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/
    , zC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/
    , Qt = e => to(e) || LC.has(e) || _C.test(e)
    , gn = e => To(e, "length", KC)
    , to = e => !!e && !Number.isNaN(Number(e))
    , ja = e => To(e, "number", to)
    , $o = e => !!e && Number.isInteger(Number(e))
    , $C = e => e.endsWith("%") && to(e.slice(0, -1))
    , G = e => Fy.test(e)
    , yn = e => DC.test(e)
    , BC = new Set(["length", "size", "percentage"])
    , UC = e => To(e, BC, zy)
    , VC = e => To(e, "position", zy)
    , HC = new Set(["image", "url"])
    , WC = e => To(e, HC, YC)
    , QC = e => To(e, "", qC)
    , Bo = () => !0
    , To = (e, t, n) => {
        const r = Fy.exec(e);
        return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1
    }
    , KC = e => IC.test(e) && !MC.test(e)
    , zy = () => !1
    , qC = e => FC.test(e)
    , YC = e => zC.test(e)
    , GC = () => {
        const e = le("colors")
            , t = le("spacing")
            , n = le("blur")
            , r = le("brightness")
            , o = le("borderColor")
            , s = le("borderRadius")
            , i = le("borderSpacing")
            , l = le("borderWidth")
            , a = le("contrast")
            , u = le("grayscale")
            , c = le("hueRotate")
            , d = le("invert")
            , h = le("gap")
            , p = le("gradientColorStops")
            , m = le("gradientColorStopPositions")
            , g = le("inset")
            , w = le("margin")
            , v = le("opacity")
            , y = le("padding")
            , x = le("saturate")
            , E = le("scale")
            , b = le("sepia")
            , C = le("skew")
            , k = le("space")
            , R = le("translate")
            , L = () => ["auto", "contain", "none"]
            , D = () => ["auto", "hidden", "clip", "visible", "scroll"]
            , U = () => ["auto", G, t]
            , M = () => [G, t]
            , Q = () => ["", Qt, gn]
            , _ = () => ["auto", to, G]
            , X = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"]
            , z = () => ["solid", "dashed", "dotted", "double", "none"]
            , W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
            , N = () => ["start", "end", "center", "between", "around", "evenly", "stretch"]
            , j = () => ["", "0", G]
            , I = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]
            , B = () => [to, G];
        return {
            cacheSize: 500,
            separator: ":",
            theme: {
                colors: [Bo],
                spacing: [Qt, gn],
                blur: ["none", "", yn, G],
                brightness: B(),
                borderColor: [e],
                borderRadius: ["none", "", "full", yn, G],
                borderSpacing: M(),
                borderWidth: Q(),
                contrast: B(),
                grayscale: j(),
                hueRotate: B(),
                invert: j(),
                gap: M(),
                gradientColorStops: [e],
                gradientColorStopPositions: [$C, gn],
                inset: U(),
                margin: U(),
                opacity: B(),
                padding: M(),
                saturate: B(),
                scale: B(),
                sepia: j(),
                skew: B(),
                space: M(),
                translate: M()
            },
            classGroups: {
                aspect: [{
                    aspect: ["auto", "square", "video", G]
                }],
                container: ["container"],
                columns: [{
                    columns: [yn]
                }],
                "break-after": [{
                    "break-after": I()
                }],
                "break-before": [{
                    "break-before": I()
                }],
                "break-inside": [{
                    "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                }],
                "box-decoration": [{
                    "box-decoration": ["slice", "clone"]
                }],
                box: [{
                    box: ["border", "content"]
                }],
                display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                float: [{
                    float: ["right", "left", "none", "start", "end"]
                }],
                clear: [{
                    clear: ["left", "right", "both", "none", "start", "end"]
                }],
                isolation: ["isolate", "isolation-auto"],
                "object-fit": [{
                    object: ["contain", "cover", "fill", "none", "scale-down"]
                }],
                "object-position": [{
                    object: [...X(), G]
                }],
                overflow: [{
                    overflow: D()
                }],
                "overflow-x": [{
                    "overflow-x": D()
                }],
                "overflow-y": [{
                    "overflow-y": D()
                }],
                overscroll: [{
                    overscroll: L()
                }],
                "overscroll-x": [{
                    "overscroll-x": L()
                }],
                "overscroll-y": [{
                    "overscroll-y": L()
                }],
                position: ["static", "fixed", "absolute", "relative", "sticky"],
                inset: [{
                    inset: [g]
                }],
                "inset-x": [{
                    "inset-x": [g]
                }],
                "inset-y": [{
                    "inset-y": [g]
                }],
                start: [{
                    start: [g]
                }],
                end: [{
                    end: [g]
                }],
                top: [{
                    top: [g]
                }],
                right: [{
                    right: [g]
                }],
                bottom: [{
                    bottom: [g]
                }],
                left: [{
                    left: [g]
                }],
                visibility: ["visible", "invisible", "collapse"],
                z: [{
                    z: ["auto", $o, G]
                }],
                basis: [{
                    basis: U()
                }],
                "flex-direction": [{
                    flex: ["row", "row-reverse", "col", "col-reverse"]
                }],
                "flex-wrap": [{
                    flex: ["wrap", "wrap-reverse", "nowrap"]
                }],
                flex: [{
                    flex: ["1", "auto", "initial", "none", G]
                }],
                grow: [{
                    grow: j()
                }],
                shrink: [{
                    shrink: j()
                }],
                order: [{
                    order: ["first", "last", "none", $o, G]
                }],
                "grid-cols": [{
                    "grid-cols": [Bo]
                }],
                "col-start-end": [{
                    col: ["auto", {
                        span: ["full", $o, G]
                    }, G]
                }],
                "col-start": [{
                    "col-start": _()
                }],
                "col-end": [{
                    "col-end": _()
                }],
                "grid-rows": [{
                    "grid-rows": [Bo]
                }],
                "row-start-end": [{
                    row: ["auto", {
                        span: [$o, G]
                    }, G]
                }],
                "row-start": [{
                    "row-start": _()
                }],
                "row-end": [{
                    "row-end": _()
                }],
                "grid-flow": [{
                    "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                }],
                "auto-cols": [{
                    "auto-cols": ["auto", "min", "max", "fr", G]
                }],
                "auto-rows": [{
                    "auto-rows": ["auto", "min", "max", "fr", G]
                }],
                gap: [{
                    gap: [h]
                }],
                "gap-x": [{
                    "gap-x": [h]
                }],
                "gap-y": [{
                    "gap-y": [h]
                }],
                "justify-content": [{
                    justify: ["normal", ...N()]
                }],
                "justify-items": [{
                    "justify-items": ["start", "end", "center", "stretch"]
                }],
                "justify-self": [{
                    "justify-self": ["auto", "start", "end", "center", "stretch"]
                }],
                "align-content": [{
                    content: ["normal", ...N(), "baseline"]
                }],
                "align-items": [{
                    items: ["start", "end", "center", "baseline", "stretch"]
                }],
                "align-self": [{
                    self: ["auto", "start", "end", "center", "stretch", "baseline"]
                }],
                "place-content": [{
                    "place-content": [...N(), "baseline"]
                }],
                "place-items": [{
                    "place-items": ["start", "end", "center", "baseline", "stretch"]
                }],
                "place-self": [{
                    "place-self": ["auto", "start", "end", "center", "stretch"]
                }],
                p: [{
                    p: [y]
                }],
                px: [{
                    px: [y]
                }],
                py: [{
                    py: [y]
                }],
                ps: [{
                    ps: [y]
                }],
                pe: [{
                    pe: [y]
                }],
                pt: [{
                    pt: [y]
                }],
                pr: [{
                    pr: [y]
                }],
                pb: [{
                    pb: [y]
                }],
                pl: [{
                    pl: [y]
                }],
                m: [{
                    m: [w]
                }],
                mx: [{
                    mx: [w]
                }],
                my: [{
                    my: [w]
                }],
                ms: [{
                    ms: [w]
                }],
                me: [{
                    me: [w]
                }],
                mt: [{
                    mt: [w]
                }],
                mr: [{
                    mr: [w]
                }],
                mb: [{
                    mb: [w]
                }],
                ml: [{
                    ml: [w]
                }],
                "space-x": [{
                    "space-x": [k]
                }],
                "space-x-reverse": ["space-x-reverse"],
                "space-y": [{
                    "space-y": [k]
                }],
                "space-y-reverse": ["space-y-reverse"],
                w: [{
                    w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", G, t]
                }],
                "min-w": [{
                    "min-w": [G, t, "min", "max", "fit"]
                }],
                "max-w": [{
                    "max-w": [G, t, "none", "full", "min", "max", "fit", "prose", {
                        screen: [yn]
                    }, yn]
                }],
                h: [{
                    h: [G, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "min-h": [{
                    "min-h": [G, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "max-h": [{
                    "max-h": [G, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                size: [{
                    size: [G, t, "auto", "min", "max", "fit"]
                }],
                "font-size": [{
                    text: ["base", yn, gn]
                }],
                "font-smoothing": ["antialiased", "subpixel-antialiased"],
                "font-style": ["italic", "not-italic"],
                "font-weight": [{
                    font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ja]
                }],
                "font-family": [{
                    font: [Bo]
                }],
                "fvn-normal": ["normal-nums"],
                "fvn-ordinal": ["ordinal"],
                "fvn-slashed-zero": ["slashed-zero"],
                "fvn-figure": ["lining-nums", "oldstyle-nums"],
                "fvn-spacing": ["proportional-nums", "tabular-nums"],
                "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                tracking: [{
                    tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", G]
                }],
                "line-clamp": [{
                    "line-clamp": ["none", to, ja]
                }],
                leading: [{
                    leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Qt, G]
                }],
                "list-image": [{
                    "list-image": ["none", G]
                }],
                "list-style-type": [{
                    list: ["none", "disc", "decimal", G]
                }],
                "list-style-position": [{
                    list: ["inside", "outside"]
                }],
                "placeholder-color": [{
                    placeholder: [e]
                }],
                "placeholder-opacity": [{
                    "placeholder-opacity": [v]
                }],
                "text-alignment": [{
                    text: ["left", "center", "right", "justify", "start", "end"]
                }],
                "text-color": [{
                    text: [e]
                }],
                "text-opacity": [{
                    "text-opacity": [v]
                }],
                "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                "text-decoration-style": [{
                    decoration: [...z(), "wavy"]
                }],
                "text-decoration-thickness": [{
                    decoration: ["auto", "from-font", Qt, gn]
                }],
                "underline-offset": [{
                    "underline-offset": ["auto", Qt, G]
                }],
                "text-decoration-color": [{
                    decoration: [e]
                }],
                "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                "text-wrap": [{
                    text: ["wrap", "nowrap", "balance", "pretty"]
                }],
                indent: [{
                    indent: M()
                }],
                "vertical-align": [{
                    align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", G]
                }],
                whitespace: [{
                    whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                }],
                break: [{
                    break: ["normal", "words", "all", "keep"]
                }],
                hyphens: [{
                    hyphens: ["none", "manual", "auto"]
                }],
                content: [{
                    content: ["none", G]
                }],
                "bg-attachment": [{
                    bg: ["fixed", "local", "scroll"]
                }],
                "bg-clip": [{
                    "bg-clip": ["border", "padding", "content", "text"]
                }],
                "bg-opacity": [{
                    "bg-opacity": [v]
                }],
                "bg-origin": [{
                    "bg-origin": ["border", "padding", "content"]
                }],
                "bg-position": [{
                    bg: [...X(), VC]
                }],
                "bg-repeat": [{
                    bg: ["no-repeat", {
                        repeat: ["", "x", "y", "round", "space"]
                    }]
                }],
                "bg-size": [{
                    bg: ["auto", "cover", "contain", UC]
                }],
                "bg-image": [{
                    bg: ["none", {
                        "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                    }, WC]
                }],
                "bg-color": [{
                    bg: [e]
                }],
                "gradient-from-pos": [{
                    from: [m]
                }],
                "gradient-via-pos": [{
                    via: [m]
                }],
                "gradient-to-pos": [{
                    to: [m]
                }],
                "gradient-from": [{
                    from: [p]
                }],
                "gradient-via": [{
                    via: [p]
                }],
                "gradient-to": [{
                    to: [p]
                }],
                rounded: [{
                    rounded: [s]
                }],
                "rounded-s": [{
                    "rounded-s": [s]
                }],
                "rounded-e": [{
                    "rounded-e": [s]
                }],
                "rounded-t": [{
                    "rounded-t": [s]
                }],
                "rounded-r": [{
                    "rounded-r": [s]
                }],
                "rounded-b": [{
                    "rounded-b": [s]
                }],
                "rounded-l": [{
                    "rounded-l": [s]
                }],
                "rounded-ss": [{
                    "rounded-ss": [s]
                }],
                "rounded-se": [{
                    "rounded-se": [s]
                }],
                "rounded-ee": [{
                    "rounded-ee": [s]
                }],
                "rounded-es": [{
                    "rounded-es": [s]
                }],
                "rounded-tl": [{
                    "rounded-tl": [s]
                }],
                "rounded-tr": [{
                    "rounded-tr": [s]
                }],
                "rounded-br": [{
                    "rounded-br": [s]
                }],
                "rounded-bl": [{
                    "rounded-bl": [s]
                }],
                "border-w": [{
                    border: [l]
                }],
                "border-w-x": [{
                    "border-x": [l]
                }],
                "border-w-y": [{
                    "border-y": [l]
                }],
                "border-w-s": [{
                    "border-s": [l]
                }],
                "border-w-e": [{
                    "border-e": [l]
                }],
                "border-w-t": [{
                    "border-t": [l]
                }],
                "border-w-r": [{
                    "border-r": [l]
                }],
                "border-w-b": [{
                    "border-b": [l]
                }],
                "border-w-l": [{
                    "border-l": [l]
                }],
                "border-opacity": [{
                    "border-opacity": [v]
                }],
                "border-style": [{
                    border: [...z(), "hidden"]
                }],
                "divide-x": [{
                    "divide-x": [l]
                }],
                "divide-x-reverse": ["divide-x-reverse"],
                "divide-y": [{
                    "divide-y": [l]
                }],
                "divide-y-reverse": ["divide-y-reverse"],
                "divide-opacity": [{
                    "divide-opacity": [v]
                }],
                "divide-style": [{
                    divide: z()
                }],
                "border-color": [{
                    border: [o]
                }],
                "border-color-x": [{
                    "border-x": [o]
                }],
                "border-color-y": [{
                    "border-y": [o]
                }],
                "border-color-s": [{
                    "border-s": [o]
                }],
                "border-color-e": [{
                    "border-e": [o]
                }],
                "border-color-t": [{
                    "border-t": [o]
                }],
                "border-color-r": [{
                    "border-r": [o]
                }],
                "border-color-b": [{
                    "border-b": [o]
                }],
                "border-color-l": [{
                    "border-l": [o]
                }],
                "divide-color": [{
                    divide: [o]
                }],
                "outline-style": [{
                    outline: ["", ...z()]
                }],
                "outline-offset": [{
                    "outline-offset": [Qt, G]
                }],
                "outline-w": [{
                    outline: [Qt, gn]
                }],
                "outline-color": [{
                    outline: [e]
                }],
                "ring-w": [{
                    ring: Q()
                }],
                "ring-w-inset": ["ring-inset"],
                "ring-color": [{
                    ring: [e]
                }],
                "ring-opacity": [{
                    "ring-opacity": [v]
                }],
                "ring-offset-w": [{
                    "ring-offset": [Qt, gn]
                }],
                "ring-offset-color": [{
                    "ring-offset": [e]
                }],
                shadow: [{
                    shadow: ["", "inner", "none", yn, QC]
                }],
                "shadow-color": [{
                    shadow: [Bo]
                }],
                opacity: [{
                    opacity: [v]
                }],
                "mix-blend": [{
                    "mix-blend": [...W(), "plus-lighter", "plus-darker"]
                }],
                "bg-blend": [{
                    "bg-blend": W()
                }],
                filter: [{
                    filter: ["", "none"]
                }],
                blur: [{
                    blur: [n]
                }],
                brightness: [{
                    brightness: [r]
                }],
                contrast: [{
                    contrast: [a]
                }],
                "drop-shadow": [{
                    "drop-shadow": ["", "none", yn, G]
                }],
                grayscale: [{
                    grayscale: [u]
                }],
                "hue-rotate": [{
                    "hue-rotate": [c]
                }],
                invert: [{
                    invert: [d]
                }],
                saturate: [{
                    saturate: [x]
                }],
                sepia: [{
                    sepia: [b]
                }],
                "backdrop-filter": [{
                    "backdrop-filter": ["", "none"]
                }],
                "backdrop-blur": [{
                    "backdrop-blur": [n]
                }],
                "backdrop-brightness": [{
                    "backdrop-brightness": [r]
                }],
                "backdrop-contrast": [{
                    "backdrop-contrast": [a]
                }],
                "backdrop-grayscale": [{
                    "backdrop-grayscale": [u]
                }],
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [c]
                }],
                "backdrop-invert": [{
                    "backdrop-invert": [d]
                }],
                "backdrop-opacity": [{
                    "backdrop-opacity": [v]
                }],
                "backdrop-saturate": [{
                    "backdrop-saturate": [x]
                }],
                "backdrop-sepia": [{
                    "backdrop-sepia": [b]
                }],
                "border-collapse": [{
                    border: ["collapse", "separate"]
                }],
                "border-spacing": [{
                    "border-spacing": [i]
                }],
                "border-spacing-x": [{
                    "border-spacing-x": [i]
                }],
                "border-spacing-y": [{
                    "border-spacing-y": [i]
                }],
                "table-layout": [{
                    table: ["auto", "fixed"]
                }],
                caption: [{
                    caption: ["top", "bottom"]
                }],
                transition: [{
                    transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", G]
                }],
                duration: [{
                    duration: B()
                }],
                ease: [{
                    ease: ["linear", "in", "out", "in-out", G]
                }],
                delay: [{
                    delay: B()
                }],
                animate: [{
                    animate: ["none", "spin", "ping", "pulse", "bounce", G]
                }],
                transform: [{
                    transform: ["", "gpu", "none"]
                }],
                scale: [{
                    scale: [E]
                }],
                "scale-x": [{
                    "scale-x": [E]
                }],
                "scale-y": [{
                    "scale-y": [E]
                }],
                rotate: [{
                    rotate: [$o, G]
                }],
                "translate-x": [{
                    "translate-x": [R]
                }],
                "translate-y": [{
                    "translate-y": [R]
                }],
                "skew-x": [{
                    "skew-x": [C]
                }],
                "skew-y": [{
                    "skew-y": [C]
                }],
                "transform-origin": [{
                    origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", G]
                }],
                accent: [{
                    accent: ["auto", e]
                }],
                appearance: [{
                    appearance: ["none", "auto"]
                }],
                cursor: [{
                    cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", G]
                }],
                "caret-color": [{
                    caret: [e]
                }],
                "pointer-events": [{
                    "pointer-events": ["none", "auto"]
                }],
                resize: [{
                    resize: ["none", "y", "x", ""]
                }],
                "scroll-behavior": [{
                    scroll: ["auto", "smooth"]
                }],
                "scroll-m": [{
                    "scroll-m": M()
                }],
                "scroll-mx": [{
                    "scroll-mx": M()
                }],
                "scroll-my": [{
                    "scroll-my": M()
                }],
                "scroll-ms": [{
                    "scroll-ms": M()
                }],
                "scroll-me": [{
                    "scroll-me": M()
                }],
                "scroll-mt": [{
                    "scroll-mt": M()
                }],
                "scroll-mr": [{
                    "scroll-mr": M()
                }],
                "scroll-mb": [{
                    "scroll-mb": M()
                }],
                "scroll-ml": [{
                    "scroll-ml": M()
                }],
                "scroll-p": [{
                    "scroll-p": M()
                }],
                "scroll-px": [{
                    "scroll-px": M()
                }],
                "scroll-py": [{
                    "scroll-py": M()
                }],
                "scroll-ps": [{
                    "scroll-ps": M()
                }],
                "scroll-pe": [{
                    "scroll-pe": M()
                }],
                "scroll-pt": [{
                    "scroll-pt": M()
                }],
                "scroll-pr": [{
                    "scroll-pr": M()
                }],
                "scroll-pb": [{
                    "scroll-pb": M()
                }],
                "scroll-pl": [{
                    "scroll-pl": M()
                }],
                "snap-align": [{
                    snap: ["start", "end", "center", "align-none"]
                }],
                "snap-stop": [{
                    snap: ["normal", "always"]
                }],
                "snap-type": [{
                    snap: ["none", "x", "y", "both"]
                }],
                "snap-strictness": [{
                    snap: ["mandatory", "proximity"]
                }],
                touch: [{
                    touch: ["auto", "none", "manipulation"]
                }],
                "touch-x": [{
                    "touch-pan": ["x", "left", "right"]
                }],
                "touch-y": [{
                    "touch-pan": ["y", "up", "down"]
                }],
                "touch-pz": ["touch-pinch-zoom"],
                select: [{
                    select: ["none", "text", "all", "auto"]
                }],
                "will-change": [{
                    "will-change": ["auto", "scroll", "contents", "transform", G]
                }],
                fill: [{
                    fill: [e, "none"]
                }],
                "stroke-w": [{
                    stroke: [Qt, gn, ja]
                }],
                stroke: [{
                    stroke: [e, "none"]
                }],
                sr: ["sr-only", "not-sr-only"],
                "forced-color-adjust": [{
                    "forced-color-adjust": ["auto", "none"]
                }]
            },
            conflictingClassGroups: {
                overflow: ["overflow-x", "overflow-y"],
                overscroll: ["overscroll-x", "overscroll-y"],
                inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
                "inset-x": ["right", "left"],
                "inset-y": ["top", "bottom"],
                flex: ["basis", "grow", "shrink"],
                gap: ["gap-x", "gap-y"],
                p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
                px: ["pr", "pl"],
                py: ["pt", "pb"],
                m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
                mx: ["mr", "ml"],
                my: ["mt", "mb"],
                size: ["w", "h"],
                "font-size": ["leading"],
                "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                "fvn-ordinal": ["fvn-normal"],
                "fvn-slashed-zero": ["fvn-normal"],
                "fvn-figure": ["fvn-normal"],
                "fvn-spacing": ["fvn-normal"],
                "fvn-fraction": ["fvn-normal"],
                "line-clamp": ["display", "overflow"],
                rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                "rounded-s": ["rounded-ss", "rounded-es"],
                "rounded-e": ["rounded-se", "rounded-ee"],
                "rounded-t": ["rounded-tl", "rounded-tr"],
                "rounded-r": ["rounded-tr", "rounded-br"],
                "rounded-b": ["rounded-br", "rounded-bl"],
                "rounded-l": ["rounded-tl", "rounded-bl"],
                "border-spacing": ["border-spacing-x", "border-spacing-y"],
                "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                "border-w-x": ["border-w-r", "border-w-l"],
                "border-w-y": ["border-w-t", "border-w-b"],
                "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                "border-color-x": ["border-color-r", "border-color-l"],
                "border-color-y": ["border-color-t", "border-color-b"],
                "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                "scroll-mx": ["scroll-mr", "scroll-ml"],
                "scroll-my": ["scroll-mt", "scroll-mb"],
                "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                "scroll-px": ["scroll-pr", "scroll-pl"],
                "scroll-py": ["scroll-pt", "scroll-pb"],
                touch: ["touch-x", "touch-y", "touch-pz"],
                "touch-x": ["touch"],
                "touch-y": ["touch"],
                "touch-pz": ["touch"]
            },
            conflictingClassGroupModifiers: {
                "font-size": ["leading"]
            }
        }
    }
    , XC = AC(GC);
function Zn(...e) {
    return XC(Ly(e))
}
const JC = xC
    , ZC = A.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => f.jsx(Ay, {
        ref: r,
        sideOffset: t,
        className: Zn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
        ...n
    }));
ZC.displayName = Ay.displayName;
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ek = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
    , $y = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var tk = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nk = S.forwardRef(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: r, className: o = "", children: s, iconNode: i, ...l }, a) => S.createElement("svg", {
    ref: a,
    ...tk,
    width: t,
    height: t,
    stroke: e,
    strokeWidth: r ? Number(n) * 24 / Number(t) : n,
    className: $y("lucide", o),
    ...l
}, [...i.map(([u, c]) => S.createElement(u, c)), ...Array.isArray(s) ? s : [s]]));
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const an = (e, t) => {
    const n = S.forwardRef(({ className: r, ...o }, s) => S.createElement(nk, {
        ref: s,
        iconNode: t,
        className: $y(`lucide-${ek(e)}`, r),
        ...o
    }));
    return n.displayName = `${e}`,
        n
}
    ;
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rk = an("Check", [["path", {
    d: "M20 6 9 17l-5-5",
    key: "1gmf2c"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ok = an("ChevronLeft", [["path", {
    d: "m15 18-6-6 6-6",
    key: "1wnfg3"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sk = an("Menu", [["line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12",
    key: "1e0a9i"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6",
    key: "1owob3"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18",
    key: "yk5zj1"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ik = an("Minus", [["path", {
    d: "M5 12h14",
    key: "1ays0h"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lk = an("Plus", [["path", {
    d: "M5 12h14",
    key: "1ays0h"
}], ["path", {
    d: "M12 5v14",
    key: "s699le"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const By = an("Search", [["circle", {
    cx: "11",
    cy: "11",
    r: "8",
    key: "4ej97u"
}], ["path", {
    d: "m21 21-4.3-4.3",
    key: "1qie3q"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dd = an("ShoppingBag", [["path", {
    d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",
    key: "hou9p0"
}], ["path", {
    d: "M3 6h18",
    key: "d0wm0j"
}], ["path", {
    d: "M16 10a4 4 0 0 1-8 0",
    key: "1ltviw"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ak = an("Trash2", [["path", {
    d: "M3 6h18",
    key: "d0wm0j"
}], ["path", {
    d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
    key: "4alrt4"
}], ["path", {
    d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
    key: "v07s0e"
}], ["line", {
    x1: "10",
    x2: "10",
    y1: "11",
    y2: "17",
    key: "1uufr5"
}], ["line", {
    x1: "14",
    x2: "14",
    y1: "11",
    y2: "17",
    key: "xtxkd"
}]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fd = an("X", [["path", {
    d: "M18 6 6 18",
    key: "1bl5f8"
}], ["path", {
    d: "m6 6 12 12",
    key: "d8bk6v"
}]]);
var uk = Symbol.for("react.lazy")
    , cl = Zu[" use ".trim().toString()];
function ck(e) {
    return typeof e == "object" && e !== null && "then" in e
}
function Uy(e) {
    return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === uk && "_payload" in e && ck(e._payload)
}
function dk(e) {
    const t = pk(e)
        , n = S.forwardRef((r, o) => {
            let { children: s, ...i } = r;
            Uy(s) && typeof cl == "function" && (s = cl(s._payload));
            const l = S.Children.toArray(s)
                , a = l.find(mk);
            if (a) {
                const u = a.props.children
                    , c = l.map(d => d === a ? S.Children.count(u) > 1 ? S.Children.only(null) : S.isValidElement(u) ? u.props.children : null : d);
                return f.jsx(t, {
                    ...i,
                    ref: o,
                    children: S.isValidElement(u) ? S.cloneElement(u, void 0, c) : null
                })
            }
            return f.jsx(t, {
                ...i,
                ref: o,
                children: s
            })
        }
        );
    return n.displayName = `${e}.Slot`,
        n
}
var fk = dk("Slot");
function pk(e) {
    const t = S.forwardRef((n, r) => {
        let { children: o, ...s } = n;
        if (Uy(o) && typeof cl == "function" && (o = cl(o._payload)),
            S.isValidElement(o)) {
            const i = yk(o)
                , l = gk(s, o.props);
            return o.type !== S.Fragment && (l.ref = r ? Ml(r, i) : i),
                S.cloneElement(o, l)
        }
        return S.Children.count(o) > 1 ? S.Children.only(null) : null
    }
    );
    return t.displayName = `${e}.SlotClone`,
        t
}
var hk = Symbol("radix.slottable");
function mk(e) {
    return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === hk
}
function gk(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const o = e[r]
            , s = t[r];
        /^on[A-Z]/.test(r) ? o && s ? n[r] = (...l) => {
            const a = s(...l);
            return o(...l),
                a
        }
            : o && (n[r] = o) : r === "style" ? n[r] = {
                ...o,
                ...s
            } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}
function yk(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get
        , n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get,
        n = t && "isReactWarning" in t && t.isReactWarning,
        n ? e.props.ref : e.props.ref || e.ref)
}
const jp = e => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e
    , Op = Ly
    , Vy = (e, t) => n => {
        var r;
        if ((t == null ? void 0 : t.variants) == null)
            return Op(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
        const { variants: o, defaultVariants: s } = t
            , i = Object.keys(o).map(u => {
                const c = n == null ? void 0 : n[u]
                    , d = s == null ? void 0 : s[u];
                if (c === null)
                    return null;
                const h = jp(c) || jp(d);
                return o[u][h]
            }
            )
            , l = n && Object.entries(n).reduce((u, c) => {
                let [d, h] = c;
                return h === void 0 || (u[d] = h),
                    u
            }
                , {})
            , a = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
                let { class: d, className: h, ...p } = c;
                return Object.entries(p).every(m => {
                    let [g, w] = m;
                    return Array.isArray(w) ? w.includes({
                        ...s,
                        ...l
                    }[g]) : {
                        ...s,
                        ...l
                    }[g] === w
                }
                ) ? [...u, d, h] : u
            }
                , []);
        return Op(e, i, a, n == null ? void 0 : n.class, n == null ? void 0 : n.className)
    }
    , vk = Vy("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    })
    , ne = A.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...o }, s) => {
        const i = r ? fk : "button";
        return f.jsx(i, {
            ref: s,
            className: Zn(vk({
                variant: t,
                size: n,
                className: e
            })),
            ...o
        })
    }
    );
ne.displayName = "Button";
const xk = "/assets/logo-EARcsWdg.png"
    , wk = () => {
        const { totalItems: e, setIsCartOpen: t } = jl()
            , { user: n, isLoggedIn: r, logout: o, getUserInitials: s } = zs()
            , [i, l] = S.useState(!1)
            , a = Tr()
            , u = () => {
                o(),
                    a("/")
            }
            ;
        return f.jsxs("header", {
            className: "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border",
            children: [f.jsxs("div", {
                className: "container flex items-center justify-between h-16 md:h-20",
                children: [f.jsx("button", {
                    className: "md:hidden p-2 text-foreground",
                    onClick: () => l(!i),
                    "aria-label": "Menu",
                    children: i ? f.jsx(fd, {
                        size: 22
                    }) : f.jsx(sk, {
                        size: 22
                    })
                }), f.jsx(ee, {
                    to: "/",
                    className: "flex items-center",
                    children: f.jsx("img", {
                        src: xk,
                        alt: "JD Good Hair Logo",
                        className: "h-20 md:h-28 w-auto object-contain"
                    })
                }), f.jsxs("nav", {
                    className: "hidden md:flex items-center gap-8",
                    children: [f.jsx(ee, {
                        to: "/",
                        className: "text-sm font-medium text-foreground hover:text-primary transition-colors font-body tracking-wide",
                        children: "Home"
                    }), f.jsx(ee, {
                        to: "/products",
                        className: "text-sm font-medium text-foreground hover:text-primary transition-colors font-body tracking-wide",
                        children: "Shop"
                    }), f.jsx(ee, {
                        to: "/products?category=Bundles",
                        className: "text-sm font-medium text-foreground hover:text-primary transition-colors font-body tracking-wide",
                        children: "Bundles"
                    }), f.jsx(ee, {
                        to: "/products?category=Wigs",
                        className: "text-sm font-medium text-foreground hover:text-primary transition-colors font-body tracking-wide",
                        children: "Wigs"
                    }), r && n && f.jsx(ee, {
                        to: "/dashboard",
                        children: f.jsx(ne, {
                            size: "sm",
                            className: "text-white font-body",
                            children: "Dashboard"
                        })
                    })]
                }), f.jsxs("div", {
                    className: "flex items-center gap-2 md:gap-3",
                    children: [f.jsx(ee, {
                        to: "/products",
                        "aria-label": "Search",
                        children: f.jsx(ne, {
                            variant: "ghost",
                            size: "icon",
                            className: "text-foreground hover:text-primary",
                            children: f.jsx(By, {
                                size: 20
                            })
                        })
                    }), r && n ? f.jsxs("div", {
                        className: "relative flex items-center gap-2",
                        children: [f.jsx("div", {
                            className: "relative w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold",
                            children: s() || "U"
                        }), f.jsx("span", {
                            className: "absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"
                        }), f.jsx(ne, {
                            variant: "outline",
                            size: "sm",
                            onClick: u,
                            className: "text-foreground hover:text-red-500 ml-2 font-body",
                            children: "Logout"
                        })]
                    }) : f.jsxs(f.Fragment, {
                        children: [f.jsx(ee, {
                            to: "/login",
                            children: f.jsx(ne, {
                                variant: "ghost",
                                size: "icon",
                                className: "text-foreground hover:text-primary",
                                children: f.jsx("span", {
                                    className: "text-xs font-bold",
                                    children: "Login"
                                })
                            })
                        }), f.jsx(ee, {
                            to: "/register",
                            children: f.jsx(ne, {
                                variant: "ghost",
                                size: "icon",
                                className: "text-foreground hover:text-primary",
                                children: f.jsx("span", {
                                    className: "text-xs font-bold",
                                    children: "Register"
                                })
                            })
                        })]
                    }), f.jsxs("button", {
                        onClick: () => t(!0),
                        className: "relative p-2 text-foreground hover:text-primary transition-colors",
                        "aria-label": "Cart",
                        children: [f.jsx(dd, {
                            size: 20
                        }), e > 0 && f.jsx("span", {
                            className: "absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center",
                            children: e
                        })]
                    })]
                })]
            }), i && f.jsx("div", {
                className: "md:hidden border-t border-border bg-background animate-fade-in",
                children: f.jsxs("nav", {
                    className: "container py-4 flex flex-col gap-3",
                    children: [f.jsx(ee, {
                        to: "/",
                        onClick: () => l(!1),
                        className: "py-2 text-sm font-medium text-foreground font-body",
                        children: "Home"
                    }), f.jsx(ee, {
                        to: "/products",
                        onClick: () => l(!1),
                        className: "py-2 text-sm font-medium text-foreground font-body",
                        children: "Shop All"
                    }), f.jsx(ee, {
                        to: "/products?category=Bundles",
                        onClick: () => l(!1),
                        className: "py-2 text-sm font-medium text-foreground font-body",
                        children: "Bundles"
                    }), f.jsx(ee, {
                        to: "/products?category=Wigs",
                        onClick: () => l(!1),
                        className: "py-2 text-sm font-medium text-foreground font-body",
                        children: "Wigs"
                    }), f.jsx("div", {
                        className: "flex flex-col gap-2 pt-2 border-t border-border",
                        children: !r || !n ? f.jsxs(f.Fragment, {
                            children: [f.jsx(ee, {
                                to: "/login",
                                onClick: () => l(!1),
                                children: f.jsx(ne, {
                                    variant: "outline",
                                    className: "w-full font-body",
                                    children: "Login"
                                })
                            }), f.jsx(ee, {
                                to: "/register",
                                onClick: () => l(!1),
                                children: f.jsx(ne, {
                                    className: "w-full gradient-primary text-primary-foreground font-body",
                                    children: "Register"
                                })
                            })]
                        }) : f.jsxs(f.Fragment, {
                            children: [f.jsx(ee, {
                                to: "/dashboard",
                                onClick: () => l(!1),
                                children: f.jsx(ne, {
                                    className: "w-full text-white font-body",
                                    children: "Dashboard"
                                })
                            }), f.jsx(ne, {
                                className: "w-full gradient-primary text-primary-foreground font-body",
                                onClick: () => {
                                    u(),
                                        l(!1)
                                }
                                ,
                                children: "Logout"
                            })]
                        })
                    })]
                })
            })]
        })
    }
    , Sk = () => f.jsx("footer", {
        className: "bg-foreground text-primary-foreground/80",
        children: f.jsxs("div", {
            className: "container py-12 md:py-16",
            children: [f.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-8",
                children: [f.jsxs("div", {
                    className: "md:col-span-2",
                    children: [f.jsx("h3", {
                        className: "font-display text-2xl font-bold text-primary-foreground mb-1",
                        children: "JD Good Hair"
                    }), f.jsx("p", {
                        className: "text-xs tracking-[0.25em] uppercase mb-4",
                        children: "Luxury for Less"
                    }), f.jsx("p", {
                        className: "text-sm leading-relaxed font-body max-w-sm",
                        children: "Premium 100% virgin human hair for every queen. Shop bundles, wigs, closures, and frontals at unbeatable prices."
                    })]
                }), f.jsxs("div", {
                    children: [f.jsx("h4", {
                        className: "font-display text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider",
                        children: "Shop"
                    }), f.jsxs("ul", {
                        className: "space-y-2 font-body text-sm",
                        children: [f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/products",
                                className: "hover:text-primary transition-colors",
                                children: "All Products"
                            })
                        }), f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/products?category=Bundles",
                                className: "hover:text-primary transition-colors",
                                children: "Bundles"
                            })
                        }), f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/products?category=Wigs",
                                className: "hover:text-primary transition-colors",
                                children: "Wigs"
                            })
                        }), f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/products?category=Closures",
                                className: "hover:text-primary transition-colors",
                                children: "Closures"
                            })
                        }), f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/products?category=Frontals",
                                className: "hover:text-primary transition-colors",
                                children: "Frontals"
                            })
                        })]
                    })]
                }), f.jsxs("div", {
                    children: [f.jsx("h4", {
                        className: "font-display text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider",
                        children: "Account"
                    }), f.jsxs("ul", {
                        className: "space-y-2 font-body text-sm",
                        children: [f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/login",
                                className: "hover:text-primary transition-colors",
                                children: "Login"
                            })
                        }), f.jsx("li", {
                            children: f.jsx(ee, {
                                to: "/register",
                                className: "hover:text-primary transition-colors",
                                children: "Register"
                            })
                        })]
                    })]
                })]
            }), f.jsxs("div", {
                className: "border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs font-body",
                children: ["© ", new Date().getFullYear(), " JD Good Hair. All rights reserved."]
            })]
        })
    })
    , Ek = () => {
        const { items: e, isCartOpen: t, setIsCartOpen: n, removeFromCart: r, updateQuantity: o, subtotal: s, totalItems: i } = jl();
        return t ? f.jsxs(f.Fragment, {
            children: [f.jsx("div", {
                className: "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm",
                onClick: () => n(!1)
            }), f.jsxs("div", {
                className: "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-elevated animate-slide-in flex flex-col",
                children: [f.jsxs("div", {
                    className: "flex items-center justify-between p-5 border-b border-border",
                    children: [f.jsxs("h2", {
                        className: "font-display text-lg font-semibold",
                        children: ["Your Bag (", i, ")"]
                    }), f.jsx("button", {
                        onClick: () => n(!1),
                        className: "text-muted-foreground hover:text-foreground",
                        children: f.jsx(fd, {
                            size: 20
                        })
                    })]
                }), f.jsx("div", {
                    className: "flex-1 overflow-y-auto p-5 space-y-4",
                    children: e.length === 0 ? f.jsxs("div", {
                        className: "text-center py-16",
                        children: [f.jsx("p", {
                            className: "text-muted-foreground font-body",
                            children: "Your bag is empty"
                        }), f.jsx(ne, {
                            variant: "outline",
                            className: "mt-4 font-body",
                            onClick: () => n(!1),
                            children: "Continue Shopping"
                        })]
                    }) : e.map(l => f.jsxs("div", {
                        className: "flex gap-4",
                        children: [f.jsx("img", {
                            src: l.product.image,
                            alt: l.product.name,
                            className: "w-20 h-20 object-cover rounded-md"
                        }), f.jsxs("div", {
                            className: "flex-1 min-w-0",
                            children: [f.jsx("h3", {
                                className: "font-display text-sm font-semibold truncate",
                                children: l.product.name
                            }), f.jsxs("p", {
                                className: "text-sm text-muted-foreground font-body",
                                children: ["R", l.product.price.toLocaleString()]
                            }), f.jsxs("div", {
                                className: "flex items-center gap-2 mt-2",
                                children: [f.jsx("button", {
                                    onClick: () => o(l.product.id, l.quantity - 1),
                                    className: "w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary",
                                    children: f.jsx(ik, {
                                        size: 14
                                    })
                                }), f.jsx("span", {
                                    className: "text-sm font-medium font-body w-6 text-center",
                                    children: l.quantity
                                }), f.jsx("button", {
                                    onClick: () => o(l.product.id, l.quantity + 1),
                                    className: "w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary",
                                    children: f.jsx(lk, {
                                        size: 14
                                    })
                                }), f.jsx("button", {
                                    onClick: () => r(l.product.id),
                                    className: "ml-auto text-muted-foreground hover:text-destructive",
                                    "aria-label": "Remove",
                                    children: f.jsx(ak, {
                                        size: 16
                                    })
                                })]
                            })]
                        })]
                    }, l.product.id))
                }), e.length > 0 && f.jsxs("div", {
                    className: "p-5 border-t border-border space-y-3",
                    children: [f.jsxs("div", {
                        className: "flex justify-between font-body",
                        children: [f.jsx("span", {
                            className: "text-muted-foreground",
                            children: "Subtotal"
                        }), f.jsxs("span", {
                            className: "font-semibold",
                            children: ["R", s.toLocaleString()]
                        })]
                    }), f.jsx(ee, {
                        to: "/login",
                        onClick: () => n(!1),
                        children: f.jsx(ne, {
                            className: "w-full gradient-primary text-primary-foreground font-body tracking-wide shadow-soft",
                            children: "Checkout"
                        })
                    }), f.jsx("p", {
                        className: "text-center text-xs text-muted-foreground font-body",
                        children: "Login required to complete checkout"
                    })]
                })]
            })]
        }) : null
    }
    , bk = "/assets/hero-banner-DJPxQuQ6.jpg"
    , Ck = () => f.jsxs("section", {
        className: "relative overflow-hidden",
        children: [f.jsxs("div", {
            className: "absolute inset-0",
            children: [f.jsx("img", {
                src: bk,
                alt: "JD Good Hair luxury hair extensions",
                className: "w-full h-full object-cover",
                loading: "eager"
            }), f.jsx("div", {
                className: "absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent"
            })]
        }), f.jsx("div", {
            className: "relative container py-24 md:py-40 lg:py-48 flex items-center justify-center",
            children: f.jsxs("div", {
                className: "max-w-2xl text-center animate-fade-in flex flex-col items-center",
                children: [f.jsx("p", {
                    className: "text-white font-body text-4xl tracking-[0.3em] uppercase mb-3 font-bold",
                    children: "Premium Hair Extensions"
                }), f.jsx("h1", {
                    className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4",
                    children: "Luxury for Less"
                }), f.jsx("p", {
                    className: "text-primary-foreground/80 font-body text-base md:text-lg mb-8 max-w-md",
                    children: "Discover our curated collection of 100% virgin human hair bundles, wigs, closures & frontals."
                }), f.jsxs("div", {
                    className: "flex flex-wrap gap-3 justify-center",
                    children: [f.jsx(ee, {
                        to: "/products",
                        children: f.jsx(ne, {
                            size: "lg",
                            className: "gradient-primary text-primary-foreground font-body tracking-wide px-8 shadow-soft hover:opacity-90 transition-opacity",
                            children: "Shop Now"
                        })
                    }), f.jsx(ee, {
                        to: "/products?category=Wigs",
                        children: f.jsx(ne, {
                            size: "lg",
                            variant: "outline",
                            className: "border-primary-foreground/30 bg-pink-600 text-white hover:bg-primary-foreground/10 font-body tracking-wide px-8",
                            children: "Browse Wigs"
                        })
                    })]
                })]
            })
        })]
    })
    , Hy = ({ product: e }) => {
        const { addToCart: t } = jl()
            , { isLoggedIn: n } = zs()
            , r = Tr()
            , o = i => {
                if (i.preventDefault(),
                    i.stopPropagation(),
                    !n) {
                    r("/login");
                    return
                }
                t(e)
            }
            , s = i => {
                if (i.preventDefault(),
                    i.stopPropagation(),
                    !n) {
                    r("/login");
                    return
                }
                r(`/products/${e.id}`, {
                    state: {
                        scrollToInstallment: !0
                    }
                })
            }
            ;
        return f.jsx(ee, {
            to: `/products/${e.id}`,
            children: f.jsxs("div", {
                className: "group animate-fade-in cursor-pointer shadow-sm rounded-lg overflow-hidden hover:shadow-lg transition-shadow",
                children: [f.jsxs("div", {
                    className: "relative bg-muted aspect-square mb-3",
                    children: [f.jsx("img", {
                        src: e.image,
                        alt: e.name,
                        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                        loading: "lazy"
                    }), e.featured && f.jsx("span", {
                        className: "absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full font-body",
                        children: "Featured"
                    })]
                }), f.jsxs("div", {
                    className: "space-y-1 px-2 pb-2",
                    children: [f.jsx("h3", {
                        className: "font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors",
                        children: e.name
                    }), e.length && f.jsx("p", {
                        className: "text-xs text-muted-foreground font-body",
                        children: e.length
                    }), f.jsxs("div", {
                        className: "pt-1 space-y-1",
                        children: [f.jsxs("p", {
                            className: "font-body font-semibold text-foreground",
                            children: ["₦", e.fullPrice.toLocaleString()]
                        }), f.jsxs("p", {
                            className: "text-xs text-muted-foreground font-body",
                            children: ["Pay Small Small: ₦", e.installmentTotal.toLocaleString()]
                        })]
                    }), f.jsxs("div", {
                        className: "flex justify-between mt-2",
                        children: [f.jsx(ne, {
                            size: "icon",
                            variant: "ghost",
                            className: "text-foreground hover:text-primary hover:bg-pink-light",
                            onClick: o,
                            "aria-label": `Add ${e.name} to cart`,
                            children: f.jsx(dd, {
                                size: 18
                            })
                        }), f.jsx(ne, {
                            size: "sm",
                            variant: "outline",
                            className: "font-body text-xs",
                            onClick: s,
                            children: "Pay Small Small"
                        })]
                    })]
                })]
            })
        })
    }
    , Ap = "/assets/product-straight-DAza1Bip.jpg"
    , kk = "/assets/product-bodywave-DsgDBDk0.jpg"
    , Pk = "/assets/product-deepwave-LcIEB5Mw.jpg"
    , Nk = "/assets/product-wig-DZGTbYBq.jpg"
    , Tk = "/assets/product-closure-7wADnmlc.jpg"
    , Rk = "/assets/product-frontal-CLe9oJ89.jpg"
    , jk = "/assets/product-kinky-CeS4B4F_.jpg"
    , Wy = ["All", "Bundles", "Wigs", "Closures", "Frontals"]
    , pd = [{
        id: "1",
        name: "Silky Straight Bundle",
        description: "Premium 100% virgin human hair straight bundles. Soft, silky, and tangle-free. Perfect for a sleek, polished look.",
        fullPrice: 129900,
        installmentTotal: 15e4,
        image: Ap,
        category: "Bundles",
        featured: !0,
        inStock: !0,
        length: '18"'
    }, {
        id: "2",
        name: "Body Wave Bundle",
        description: "Luxurious body wave bundles with a natural bounce and flow. Minimal shedding, can be dyed and styled.",
        fullPrice: 149900,
        installmentTotal: 17e4,
        image: kk,
        category: "Bundles",
        featured: !0,
        inStock: !0,
        length: '20"'
    }, {
        id: "3",
        name: "Deep Wave Bundle",
        description: "Gorgeous deep wave curls for a voluminous, glamorous style.",
        fullPrice: 159900,
        installmentTotal: 18e4,
        image: Pk,
        category: "Bundles",
        featured: !1,
        inStock: !0,
        length: '22"'
    }, {
        id: "4",
        name: "HD Lace Front Wig",
        description: "Invisible HD lace front wig with pre-plucked hairline.",
        fullPrice: 349900,
        installmentTotal: 38e4,
        image: Nk,
        category: "Wigs",
        featured: !0,
        inStock: !0,
        length: '24"'
    }, {
        id: "5",
        name: "Silk Base Closure",
        description: "4x4 silk base closure for a seamless part.",
        fullPrice: 89900,
        installmentTotal: 105e3,
        image: Tk,
        category: "Closures",
        featured: !1,
        inStock: !0,
        length: '16"'
    }, {
        id: "6",
        name: "13x4 Lace Frontal",
        description: "Ear-to-ear lace frontal for versatile styling.",
        fullPrice: 189900,
        installmentTotal: 21e4,
        image: Rk,
        category: "Frontals",
        featured: !0,
        inStock: !0,
        length: '18"'
    }, {
        id: "7",
        name: "Kinky Curly Bundle",
        description: "Natural kinky curly texture for a bold look.",
        fullPrice: 139900,
        installmentTotal: 16e4,
        image: jk,
        category: "Bundles",
        featured: !1,
        inStock: !0,
        length: '20"'
    }, {
        id: "8",
        name: "Straight Lace Wig",
        description: "Full lace wig with silky straight texture.",
        fullPrice: 399900,
        installmentTotal: 43e4,
        image: Ap,
        category: "Wigs",
        featured: !1,
        inStock: !0,
        length: '26"'
    }]
    , Ok = pd.filter(e => e.featured)
    , Ak = () => f.jsxs("main", {
        children: [f.jsx(Ck, {}), f.jsx("section", {
            className: "gradient-hero py-12 md:py-16",
            children: f.jsxs("div", {
                className: "container text-center",
                children: [f.jsx("h2", {
                    className: "font-display text-2xl md:text-3xl font-bold mb-8",
                    children: "Shop by Category"
                }), f.jsx("div", {
                    className: "flex flex-wrap justify-center gap-3",
                    children: Wy.filter(e => e !== "All").map(e => f.jsx(ee, {
                        to: `/products?category=${e}`,
                        children: f.jsx(ne, {
                            variant: "outline",
                            className: "font-body tracking-wide rounded-full px-6 border-primary/30 hover:bg-primary hover:text-primary-foreground",
                            children: e
                        })
                    }, e))
                })]
            })
        }), f.jsxs("section", {
            className: "container py-14 md:py-20",
            children: [f.jsxs("div", {
                className: "flex items-end justify-between mb-8",
                children: [f.jsxs("div", {
                    children: [f.jsx("p", {
                        className: "text-xs tracking-[0.25em] uppercase text-primary font-body mb-1",
                        children: "Curated Selection"
                    }), f.jsx("h2", {
                        className: "font-display text-2xl md:text-3xl font-bold",
                        children: "Featured Products"
                    })]
                }), f.jsx(ee, {
                    to: "/products",
                    children: f.jsx(ne, {
                        variant: "ghost",
                        className: "text-primary font-body hover:bg-pink-light",
                        children: "View All →"
                    })
                })]
            }), f.jsx("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
                children: Ok.map(e => f.jsx(Hy, {
                    product: e
                }, e.id))
            })]
        }), f.jsx("section", {
            className: "gradient-hero",
            children: f.jsxs("div", {
                className: "container py-14 md:py-20 text-center",
                children: [f.jsx("p", {
                    className: "text-xs tracking-[0.25em] uppercase text-secondary font-body mb-2",
                    children: "Flexible Payments"
                }), f.jsx("h2", {
                    className: "font-display text-2xl md:text-3xl font-bold mb-4",
                    children: "Pay in Installments"
                }), f.jsx("p", {
                    className: "text-muted-foreground font-body max-w-md mx-auto mb-6",
                    children: "Get the hair you love now and pay over time. Split your purchase into easy monthly payments."
                }), f.jsx(ee, {
                    to: "/products",
                    children: f.jsx(ne, {
                        size: "lg",
                        className: "gradient-primary text-primary-foreground font-body tracking-wide px-8 shadow-soft",
                        children: "Start Shopping"
                    })
                })]
            })
        })]
    })
    , _k = () => {
        const [e, t] = Yw()
            , n = e.get("category") || "All"
            , [r, o] = S.useState(n)
            , [s, i] = S.useState("")
            , l = S.useMemo(() => {
                let u = pd;
                if (r !== "All" && (u = u.filter(c => c.category === r)),
                    s.trim()) {
                    const c = s.toLowerCase();
                    u = u.filter(d => d.name.toLowerCase().includes(c) || d.description.toLowerCase().includes(c) || d.category.toLowerCase().includes(c))
                }
                return u
            }
                , [r, s])
            , a = u => {
                o(u),
                    u === "All" ? e.delete("category") : e.set("category", u),
                    t(e)
            }
            ;
        return f.jsxs("main", {
            className: "container mx-auto px-4 py-12 md:py-20",
            children: [f.jsxs("div", {
                className: "text-center mb-12",
                children: [f.jsx("h1", {
                    className: "font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2",
                    children: "JD Good Hair"
                }), f.jsx("p", {
                    className: "text-primary font-semibold tracking-wide text-lg mb-1",
                    children: "Luxury for Less"
                }), f.jsx("p", {
                    className: "text-gray-500 font-body text-sm md:text-base",
                    children: "Shop premium hair and enjoy flexible “Pay Small Small” options."
                })]
            }), f.jsxs("div", {
                className: "bg-pink-50 border border-pink-200 rounded-xl p-6 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4",
                children: [f.jsxs("div", {
                    className: "text-center md:text-left",
                    children: [f.jsx("p", {
                        className: "text-primary font-semibold text-sm md:text-base mb-1",
                        children: "Pay Small Small Available"
                    }), f.jsx("p", {
                        className: "text-gray-600 text-xs md:text-sm",
                        children: "Choose daily, every 3 days, every 4 days, or weekly payments. Maximum duration: 30 days. Delivery only after full payment."
                    })]
                }), f.jsx(ne, {
                    variant: "outline",
                    className: "mt-2 md:mt-0",
                    children: "Learn More"
                })]
            }), f.jsxs("div", {
                className: "relative mb-8 max-w-xl mx-auto",
                children: [f.jsx(By, {
                    size: 20,
                    className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                }), f.jsx("input", {
                    type: "text",
                    placeholder: "Search hair bundles, wigs, closures...",
                    value: s,
                    onChange: u => i(u.target.value),
                    className: "w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm text-gray-700 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                })]
            }), f.jsx("div", {
                className: "flex flex-wrap justify-center md:justify-start gap-3 mb-12",
                children: Wy.map(u => f.jsx(ne, {
                    variant: r === u ? "default" : "outline",
                    size: "sm",
                    className: `font-body rounded-full px-5 py-2 text-sm ${r === u ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg" : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"} transition-all`,
                    onClick: () => a(u),
                    children: u
                }, u))
            }), l.length === 0 ? f.jsx("div", {
                className: "text-center py-20",
                children: f.jsx("p", {
                    className: "text-gray-400 font-body text-base",
                    children: "No products found. Try adjusting your search."
                })
            }) : f.jsx("div", {
                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8",
                children: l.map(u => f.jsx(Hy, {
                    product: u
                }, u.id))
            }), f.jsx("div", {
                className: "mt-16 text-center text-xs text-gray-500 font-body",
                children: "Note: Orders under installment plans are delivered only after full payment is completed."
            })]
        })
    }
    , Lk = ({ product: e }) => {
        const { createPlan: t, DAILY_OPTIONS: n } = Ol()
            , [r, o] = S.useState("DAILY")
            , [s, i] = S.useState(1e3)
            , l = () => {
                try {
                    t(e, r, s),
                        alert("Installment plan created")
                } catch (a) {
                    alert(a.message)
                }
            }
            ;
        return f.jsxs("div", {
            className: "space-y-3",
            children: [f.jsxs("select", {
                className: "border p-2 rounded",
                onChange: a => o(a.target.value),
                children: [f.jsx("option", {
                    value: "DAILY",
                    children: "Daily"
                }), f.jsx("option", {
                    value: "EVERY_3_DAYS",
                    children: "Every 3 Days"
                }), f.jsx("option", {
                    value: "EVERY_4_DAYS",
                    children: "Every 4 Days"
                }), f.jsx("option", {
                    value: "WEEKLY",
                    children: "Weekly"
                })]
            }), f.jsx("select", {
                className: "border p-2 rounded",
                onChange: a => i(Number(a.target.value)),
                children: n.map(a => f.jsxs("option", {
                    value: a,
                    children: ["₦", a]
                }, a))
            }), f.jsx(ne, {
                onClick: l,
                children: "Start Installment Plan"
            })]
        })
    }
    , Dk = () => {
        const { orders: e, makePayment: t } = Ol()
            , n = e[0];
        if (!n)
            return null;
        const r = n.schedule.find(o => !o.paid);
        return f.jsxs("div", {
            className: "space-y-2 border p-4 rounded",
            children: [f.jsxs("p", {
                children: ["Total: ₦", n.total]
            }), f.jsxs("p", {
                children: ["Paid: ₦", n.paidAmount]
            }), f.jsxs("p", {
                children: ["Balance: ₦", n.balance]
            }), f.jsxs("p", {
                children: ["Status: ", n.status]
            }), r && f.jsxs("p", {
                children: ["Next Due: ", r.dueDate.toDateString()]
            }), n.status !== "COMPLETED" && f.jsx(ne, {
                onClick: () => t(n.id),
                children: "Make Next Payment"
            })]
        })
    }
    , Ik = () => {
        const { id: e } = Sw()
            , t = Jn()
            , n = Tr()
            , { isLoggedIn: r } = zs()
            , o = pd.find(p => Number(p.id) === Number(e))
            , { addToCart: s } = jl()
            , { orders: i = [] } = Ol() || {}
            , [l, a] = S.useState(!1)
            , u = S.useRef(null)
            , c = i == null ? void 0 : i.find(p => {
                var m;
                return ((m = p.product) == null ? void 0 : m.id) === (o == null ? void 0 : o.id)
            }
            );
        if (S.useEffect(() => {
            var p;
            (p = t.state) != null && p.scrollToInstallment && u.current && u.current.scrollIntoView({
                behavior: "smooth"
            })
        }
            , [t.state]),
            !o)
            return f.jsxs("div", {
                className: "container py-20 text-center",
                children: [f.jsx("p", {
                    className: "text-muted-foreground font-body",
                    children: "Product not found."
                }), f.jsx(ee, {
                    to: "/products",
                    children: f.jsx(ne, {
                        variant: "outline",
                        className: "mt-4 font-body",
                        children: "Back to Shop"
                    })
                })]
            });
        const d = () => {
            if (!r) {
                n("/login", {
                    state: {
                        from: t.pathname
                    }
                });
                return
            }
            o.inStock && (s(o),
                a(!0),
                setTimeout(() => a(!1), 2e3))
        }
            , h = () => {
                if (!r) {
                    n("/login", {
                        state: {
                            from: t.pathname
                        }
                    });
                    return
                }
                u.current && u.current.scrollIntoView({
                    behavior: "smooth"
                })
            }
            ;
        return f.jsxs("main", {
            className: "container py-8 md:py-14",
            children: [f.jsxs(ee, {
                to: "/products",
                className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary font-body mb-8",
                children: [f.jsx(ok, {
                    size: 16
                }), " Back to Shop"]
            }), f.jsxs("div", {
                className: "grid md:grid-cols-2 gap-10 md:gap-14",
                children: [f.jsx("div", {
                    className: "rounded-2xl overflow-hidden bg-muted aspect-square shadow-soft",
                    children: f.jsx("img", {
                        src: o.image,
                        alt: o.name,
                        className: "w-full h-full object-cover"
                    })
                }), f.jsxs("div", {
                    className: "flex flex-col justify-center",
                    children: [f.jsx("p", {
                        className: "text-xs tracking-[0.25em] uppercase text-primary font-body mb-2",
                        children: o.category
                    }), f.jsx("h1", {
                        className: "font-display text-3xl md:text-4xl font-bold mb-3",
                        children: o.name
                    }), o.length && f.jsxs("p", {
                        className: "text-sm text-muted-foreground font-body mb-4",
                        children: ["Length: ", o.length]
                    }), f.jsx("p", {
                        className: "text-muted-foreground font-body leading-relaxed mb-6",
                        children: o.description
                    }), f.jsxs("div", {
                        className: "bg-muted rounded-2xl p-6 mb-6 space-y-4",
                        children: [f.jsxs("div", {
                            children: [f.jsx("p", {
                                className: "text-sm text-muted-foreground font-body",
                                children: "Full Payment"
                            }), f.jsxs("p", {
                                className: "font-display text-2xl font-bold",
                                children: ["₦", o.fullPrice.toLocaleString()]
                            })]
                        }), f.jsxs("div", {
                            className: "border-t border-border pt-4",
                            children: [f.jsx("p", {
                                className: "text-sm font-body text-muted-foreground mb-1",
                                children: "Pay Small Small Option"
                            }), f.jsxs("p", {
                                className: "font-semibold text-foreground",
                                children: ["Total: ₦", o.installmentTotal.toLocaleString()]
                            }), f.jsx("p", {
                                className: "text-xs text-muted-foreground font-body mt-2",
                                children: "Choose daily, every 3 days, every 4 days or weekly payments. Maximum duration: 30 days."
                            }), f.jsx("p", {
                                className: "text-xs text-muted-foreground font-body mt-1",
                                children: "Delivery only after full payment is completed."
                            })]
                        })]
                    }), f.jsx("div", {
                        ref: u,
                        children: c ? f.jsxs(f.Fragment, {
                            children: [f.jsx("h2", {
                                className: "font-semibold text-lg mb-3",
                                children: "Your Payment Progress"
                            }), f.jsx(Dk, {})]
                        }) : f.jsxs(f.Fragment, {
                            children: [f.jsx("h2", {
                                className: "font-semibold text-lg mb-3",
                                children: "Start Installment Plan"
                            }), f.jsx(ne, {
                                size: "sm",
                                variant: "outline",
                                className: "mb-2 font-body",
                                onClick: h,
                                children: "Start Installment"
                            }), i && f.jsx(Lk, {
                                product: o
                            })]
                        })
                    }), !o.inStock && f.jsx("p", {
                        className: "text-sm text-red-500 font-body mt-4",
                        children: "This item is currently out of stock."
                    }), f.jsx(ne, {
                        size: "lg",
                        disabled: !o.inStock,
                        className: `font-body tracking-wide shadow-soft transition-all mt-6 ${l ? "bg-green-500 hover:bg-green-500" : o.inStock ? "gradient-primary" : "bg-muted text-muted-foreground cursor-not-allowed"} text-primary-foreground`,
                        onClick: d,
                        children: l ? f.jsxs("span", {
                            className: "flex items-center gap-2",
                            children: [f.jsx(rk, {
                                size: 18
                            }), " Added to Bag"]
                        }) : f.jsxs("span", {
                            className: "flex items-center gap-2",
                            children: [f.jsx(dd, {
                                size: 18
                            }), o.inStock ? "Buy Full Payment" : "Out of Stock"]
                        })
                    })]
                })]
            }), f.jsx("div", {
                className: "mt-16 text-center text-xs text-muted-foreground",
                children: "JD Good Hair — Luxury for Less."
            })]
        })
    }
    , Mk = () => {
        var d;
        const e = Tr()
            , t = Jn()
            , { login: n } = zs()
            , r = ((d = t.state) == null ? void 0 : d.from) || "/dashboard"
            , [o, s] = S.useState("")
            , [i, l] = S.useState("")
            , [a, u] = S.useState(!1)
            , c = async h => {
                h.preventDefault(),
                    u(!0);
                try {
                    const p = await n(o, i);
                    console.log("LOGIN FUNCTION RESULT:", p),
                        console.log("Stored user:", localStorage.getItem("user")),
                        console.log("Stored token:", localStorage.getItem("token")),
                        p.success ? e(r, {
                            replace: !0
                        }) : alert("Login failed — check your credentials")
                } catch (p) {
                    console.error("Unexpected error during login:", p),
                        alert("Login failed — please try again later")
                } finally {
                    u(!1)
                }
            }
            ;
        return f.jsx("main", {
            className: "min-h-[80vh] flex items-center justify-center",
            children: f.jsxs("div", {
                className: "w-full max-w-sm mx-auto p-6",
                children: [f.jsxs("div", {
                    className: "text-center mb-8",
                    children: [f.jsx("h1", {
                        className: "font-display text-2xl font-bold mb-1",
                        children: "Welcome Back"
                    }), f.jsx("p", {
                        className: "text-sm text-muted-foreground font-body",
                        children: "Sign in to your account"
                    })]
                }), f.jsxs("form", {
                    className: "space-y-4",
                    onSubmit: c,
                    children: [f.jsxs("div", {
                        children: [f.jsx("label", {
                            className: "text-sm font-body font-medium text-foreground mb-1 block",
                            children: "Email"
                        }), f.jsx("input", {
                            type: "email",
                            placeholder: "you@example.com",
                            value: o,
                            onChange: h => s(h.target.value),
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        })]
                    }), f.jsxs("div", {
                        children: [f.jsx("label", {
                            className: "text-sm font-body font-medium text-foreground mb-1 block",
                            children: "Password"
                        }), f.jsx("input", {
                            type: "password",
                            placeholder: "••••••••",
                            value: i,
                            onChange: h => l(h.target.value),
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        })]
                    }), f.jsx(ne, {
                        type: "submit",
                        className: "w-full gradient-primary text-primary-foreground font-body tracking-wide shadow-soft",
                        size: "lg",
                        disabled: a,
                        children: a ? "Signing in..." : "Sign In"
                    })]
                }), f.jsxs("p", {
                    className: "text-center text-sm text-muted-foreground font-body mt-6",
                    children: ["Don't have an account?", " ", f.jsx(ee, {
                        to: "/register",
                        className: "text-primary font-medium hover:underline",
                        children: "Register"
                    })]
                })]
            })
        })
    }
    , Fk = ce.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            "Content-Type": "application/json"
        }
    })
    , zk = () => {
        const e = Tr()
            , [t, n] = S.useState({
                email: "",
                first_name: "",
                last_name: "",
                phone_number: "",
                password: ""
            })
            , [r, o] = S.useState(!1)
            , s = l => {
                n({
                    ...t,
                    [l.target.name]: l.target.value
                })
            }
            , i = async l => {
                l.preventDefault(),
                    o(!0),
                    console.log(" Sending data to API:"),
                    console.log(t);
                try {
                    const a = await Fk.post("auth/register/", t);
                    console.log("FULL RESPONSE OBJECT:"),
                        console.log(a),
                        console.log(" RESPONSE DATA FROM API:"),
                        console.log(a.data),
                        alert("Registration successful"),
                        e("/login")
                } catch (a) {
                    console.log(" ERROR OBJECT:"),
                        console.log(a),
                        a.response ? (console.log(" ERROR RESPONSE STATUS:"),
                            console.log(a.response.status),
                            console.log(" ERROR RESPONSE DATA FROM API:"),
                            console.log(a.response.data)) : (console.log("NETWORK / UNKNOWN ERROR:"),
                                console.log(a.message))
                } finally {
                    o(!1)
                }
            }
            ;
        return f.jsx("main", {
            className: "min-h-[80vh] flex items-center justify-center",
            children: f.jsxs("div", {
                className: "w-full max-w-sm mx-auto p-6",
                children: [f.jsxs("div", {
                    className: "text-center mb-8",
                    children: [f.jsx("h1", {
                        className: "text-2xl font-bold",
                        children: "Create Account"
                    }), f.jsx("p", {
                        className: "text-sm",
                        children: "Join JD Good Hair today"
                    })]
                }), f.jsxs("form", {
                    className: "space-y-4",
                    onSubmit: i,
                    children: [f.jsx("input", {
                        name: "first_name",
                        placeholder: "First name",
                        onChange: s,
                        className: "w-full border p-3 rounded"
                    }), f.jsx("input", {
                        name: "last_name",
                        placeholder: "Last name",
                        onChange: s,
                        className: "w-full border p-3 rounded"
                    }), f.jsx("input", {
                        name: "email",
                        type: "email",
                        placeholder: "Email",
                        onChange: s,
                        className: "w-full border p-3 rounded"
                    }), f.jsx("input", {
                        name: "phone_number",
                        placeholder: "Phone number",
                        onChange: s,
                        className: "w-full border p-3 rounded"
                    }), f.jsx("input", {
                        name: "password",
                        type: "password",
                        placeholder: "Password",
                        onChange: s,
                        className: "w-full border p-3 rounded"
                    }), f.jsx(ne, {
                        type: "submit",
                        disabled: r,
                        className: "w-full",
                        children: r ? "Creating..." : "Create Account"
                    })]
                }), f.jsxs("p", {
                    className: "text-center mt-6",
                    children: ["Already have an account?", f.jsx(ee, {
                        to: "/login",
                        className: "text-primary font-medium hover:underline",
                        children: " Sign In"
                    })]
                })]
            })
        })
    }
    , $k = () => {
        const { user: e } = zs()
            , { orders: t, makePayment: n, getNextPayment: r, getOverduePayments: o } = Ol()
            , { cards: s, addCard: i, removeCard: l, setDefaultCard: a } = oE()
            , [u, c] = S.useState({
                number: "",
                expiry: "",
                cvv: ""
            })
            , d = () => {
                !u.number || !u.expiry || !u.cvv || (i(u),
                    c({
                        number: "",
                        expiry: "",
                        cvv: ""
                    }))
            }
            ;
        return f.jsx(f.Fragment, {
            children: f.jsxs("main", {
                className: "container mx-auto p-4 min-h-[80vh]",
                children: [f.jsxs("h1", {
                    className: "text-2xl font-bold mb-4",
                    children: ["Welcome, ", (e == null ? void 0 : e.name) || "Customer"]
                }), f.jsxs("section", {
                    className: "mb-6",
                    children: [f.jsx("h2", {
                        className: "text-xl font-semibold mb-2",
                        children: "Active Orders"
                    }), t.length === 0 && f.jsx("p", {
                        children: "No active orders."
                    }), t.map(h => f.jsxs("div", {
                        className: "border p-4 rounded mb-3",
                        children: [f.jsxs("p", {
                            className: "font-medium",
                            children: ["Product: ", h.product.name]
                        }), f.jsxs("p", {
                            children: ["Total: $", h.total]
                        }), f.jsxs("p", {
                            children: ["Status: ", h.status]
                        }), f.jsxs("p", {
                            children: ["Progress: ", (h.paidAmount / h.total * 100).toFixed(0), "%"]
                        }), f.jsxs("div", {
                            className: "flex flex-col mt-2",
                            children: [f.jsx("h3", {
                                className: "font-medium",
                                children: "Payment Schedule:"
                            }), h.schedule.map(p => f.jsxs("div", {
                                className: "flex justify-between items-center",
                                children: [f.jsxs("span", {
                                    children: ["Payment ", p.paymentNumber, ": $", p.amount]
                                }), f.jsx("span", {
                                    children: p.paid ? "Paid" : "Pending"
                                }), !p.paid && f.jsx(ne, {
                                    size: "sm",
                                    className: "ml-2",
                                    onClick: () => n(h.id),
                                    children: "Pay Now"
                                })]
                            }, p.paymentNumber))]
                        })]
                    }, h.id))]
                }), f.jsxs("section", {
                    className: "mb-6",
                    children: [f.jsx("h2", {
                        className: "text-xl font-semibold mb-2",
                        children: "Saved Cards"
                    }), f.jsxs("div", {
                        className: "flex flex-col gap-2",
                        children: [s.map(h => f.jsxs("div", {
                            className: "flex justify-between items-center border p-2 rounded",
                            children: [f.jsxs("span", {
                                children: [h.number, " ", h.isDefault && "(Default)"]
                            }), f.jsxs("div", {
                                className: "flex gap-2",
                                children: [!h.isDefault && f.jsx(ne, {
                                    size: "sm",
                                    onClick: () => a(h.id),
                                    children: "Set Default"
                                }), f.jsx(ne, {
                                    size: "sm",
                                    variant: "destructive",
                                    onClick: () => l(h.id),
                                    children: "Remove"
                                })]
                            })]
                        }, h.id)), f.jsxs("div", {
                            className: "flex gap-2 mt-2",
                            children: [f.jsx("input", {
                                type: "text",
                                placeholder: "Card Number",
                                className: "border p-1 rounded flex-1",
                                value: u.number,
                                onChange: h => c({
                                    ...u,
                                    number: h.target.value
                                })
                            }), f.jsx("input", {
                                type: "text",
                                placeholder: "Expiry",
                                className: "border p-1 rounded w-20",
                                value: u.expiry,
                                onChange: h => c({
                                    ...u,
                                    expiry: h.target.value
                                })
                            }), f.jsx("input", {
                                type: "text",
                                placeholder: "CVV",
                                className: "border p-1 rounded w-16",
                                value: u.cvv,
                                onChange: h => c({
                                    ...u,
                                    cvv: h.target.value
                                })
                            }), f.jsx(ne, {
                                size: "sm",
                                onClick: d,
                                children: "Add Card"
                            })]
                        })]
                    })]
                }), f.jsxs("section", {
                    children: [f.jsx("h2", {
                        className: "text-xl font-semibold mb-2",
                        children: "Upcoming Payments"
                    }), t.length === 0 && f.jsx("p", {
                        children: "No payments scheduled."
                    }), t.map(h => {
                        const p = r ? r(h.id) : null
                            , m = o ? o(h.id) : [];
                        return f.jsxs("div", {
                            className: "border p-2 rounded mb-2",
                            children: [f.jsxs("p", {
                                children: ["Product: ", h.product.name]
                            }), f.jsxs("p", {
                                children: ["Next Payment: ", p ? `$${p.amount} due on ${p.dueDate.toLocaleDateString()}` : "Completed"]
                            }), m.length > 0 && f.jsxs("p", {
                                className: "text-red-500",
                                children: ["Overdue Payments: ", m.map(g => `$${g.amount}`).join(", ")]
                            })]
                        }, h.id)
                    }
                    )]
                })]
            })
        })
    }
    , Bk = () => {
        const e = Jn();
        return S.useEffect(() => {
            console.error("404 Error: User attempted to access non-existent route:", e.pathname)
        }
            , [e.pathname]),
            f.jsx("div", {
                className: "flex min-h-screen items-center justify-center bg-muted",
                children: f.jsxs("div", {
                    className: "text-center",
                    children: [f.jsx("h1", {
                        className: "mb-4 text-4xl font-bold",
                        children: "404"
                    }), f.jsx("p", {
                        className: "mb-4 text-xl text-muted-foreground",
                        children: "Oops! Page not found"
                    }), f.jsx("a", {
                        href: "/",
                        className: "text-primary underline hover:text-primary/90",
                        children: "Return to Home"
                    })]
                })
            })
    }
    , Uk = 1
    , Vk = 1e6;
let Oa = 0;
function Hk() {
    return Oa = (Oa + 1) % Number.MAX_SAFE_INTEGER,
        Oa.toString()
}
const Aa = new Map
    , _p = e => {
        if (Aa.has(e))
            return;
        const t = setTimeout(() => {
            Aa.delete(e),
                ts({
                    type: "REMOVE_TOAST",
                    toastId: e
                })
        }
            , Vk);
        Aa.set(e, t)
    }
    , Wk = (e, t) => {
        switch (t.type) {
            case "ADD_TOAST":
                return {
                    ...e,
                    toasts: [t.toast, ...e.toasts].slice(0, Uk)
                };
            case "UPDATE_TOAST":
                return {
                    ...e,
                    toasts: e.toasts.map(n => n.id === t.toast.id ? {
                        ...n,
                        ...t.toast
                    } : n)
                };
            case "DISMISS_TOAST":
                {
                    const { toastId: n } = t;
                    return n ? _p(n) : e.toasts.forEach(r => {
                        _p(r.id)
                    }
                    ),
                    {
                        ...e,
                        toasts: e.toasts.map(r => r.id === n || n === void 0 ? {
                            ...r,
                            open: !1
                        } : r)
                    }
                }
            case "REMOVE_TOAST":
                return t.toastId === void 0 ? {
                    ...e,
                    toasts: []
                } : {
                    ...e,
                    toasts: e.toasts.filter(n => n.id !== t.toastId)
                };
            default:
                return e
        }
    }
    , Oi = [];
let Ai = {
    toasts: []
};
function ts(e) {
    Ai = Wk(Ai, e),
        Oi.forEach(t => {
            t(Ai)
        }
        )
}
function Qk(e) {
    const t = Hk()
        , n = o => ts({
            type: "UPDATE_TOAST",
            toast: {
                ...o,
                id: t
            }
        })
        , r = () => ts({
            type: "DISMISS_TOAST",
            toastId: t
        });
    return ts({
        type: "ADD_TOAST",
        toast: {
            ...e,
            id: t,
            open: !0,
            onOpenChange: o => {
                o || r()
            }
        }
    }),
    {
        id: t,
        dismiss: r,
        update: n
    }
}
function Kk() {
    const [e, t] = S.useState(Ai);
    return S.useEffect(() => (Oi.push(t),
        () => {
            const n = Oi.indexOf(t);
            n > -1 && Oi.splice(n, 1)
        }
    ), []),
    {
        ...e,
        toast: Qk,
        dismiss: n => ts({
            type: "DISMISS_TOAST",
            toastId: n
        })
    }
}
function Lp(e) {
    const t = qk(e)
        , n = S.forwardRef((r, o) => {
            const { children: s, ...i } = r
                , l = S.Children.toArray(s)
                , a = l.find(Gk);
            if (a) {
                const u = a.props.children
                    , c = l.map(d => d === a ? S.Children.count(u) > 1 ? S.Children.only(null) : S.isValidElement(u) ? u.props.children : null : d);
                return f.jsx(t, {
                    ...i,
                    ref: o,
                    children: S.isValidElement(u) ? S.cloneElement(u, void 0, c) : null
                })
            }
            return f.jsx(t, {
                ...i,
                ref: o,
                children: s
            })
        }
        );
    return n.displayName = `${e}.Slot`,
        n
}
function qk(e) {
    const t = S.forwardRef((n, r) => {
        const { children: o, ...s } = n;
        if (S.isValidElement(o)) {
            const i = Jk(o)
                , l = Xk(s, o.props);
            return o.type !== S.Fragment && (l.ref = r ? Ml(r, i) : i),
                S.cloneElement(o, l)
        }
        return S.Children.count(o) > 1 ? S.Children.only(null) : null
    }
    );
    return t.displayName = `${e}.SlotClone`,
        t
}
var Yk = Symbol("radix.slottable");
function Gk(e) {
    return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Yk
}
function Xk(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const o = e[r]
            , s = t[r];
        /^on[A-Z]/.test(r) ? o && s ? n[r] = (...l) => {
            const a = s(...l);
            return o(...l),
                a
        }
            : o && (n[r] = o) : r === "style" ? n[r] = {
                ...o,
                ...s
            } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}
function Jk(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get
        , n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get,
        n = t && "isReactWarning" in t && t.isReactWarning,
        n ? e.props.ref : e.props.ref || e.ref)
}
function Zk(e) {
    const t = e + "CollectionProvider"
        , [n, r] = Fl(t)
        , [o, s] = n(t, {
            collectionRef: {
                current: null
            },
            itemMap: new Map
        })
        , i = g => {
            const { scope: w, children: v } = g
                , y = A.useRef(null)
                , x = A.useRef(new Map).current;
            return f.jsx(o, {
                scope: w,
                itemMap: x,
                collectionRef: y,
                children: v
            })
        }
        ;
    i.displayName = t;
    const l = e + "CollectionSlot"
        , a = Lp(l)
        , u = A.forwardRef((g, w) => {
            const { scope: v, children: y } = g
                , x = s(l, v)
                , E = jt(w, x.collectionRef);
            return f.jsx(a, {
                ref: E,
                children: y
            })
        }
        );
    u.displayName = l;
    const c = e + "CollectionItemSlot"
        , d = "data-radix-collection-item"
        , h = Lp(c)
        , p = A.forwardRef((g, w) => {
            const { scope: v, children: y, ...x } = g
                , E = A.useRef(null)
                , b = jt(w, E)
                , C = s(c, v);
            return A.useEffect(() => (C.itemMap.set(E, {
                ref: E,
                ...x
            }),
                () => void C.itemMap.delete(E))),
                f.jsx(h, {
                    [d]: "",
                    ref: b,
                    children: y
                })
        }
        );
    p.displayName = c;
    function m(g) {
        const w = s(e + "CollectionConsumer", g);
        return A.useCallback(() => {
            const y = w.collectionRef.current;
            if (!y)
                return [];
            const x = Array.from(y.querySelectorAll(`[${d}]`));
            return Array.from(w.itemMap.values()).sort((C, k) => x.indexOf(C.ref.current) - x.indexOf(k.ref.current))
        }
            , [w.collectionRef, w.itemMap])
    }
    return [{
        Provider: i,
        Slot: u,
        ItemSlot: p
    }, m, r]
}
var hd = "ToastProvider"
    , [md, eP, tP] = Zk("Toast")
    , [Qy] = Fl("Toast", [tP])
    , [nP, Ql] = Qy(hd)
    , Ky = e => {
        const { __scopeToast: t, label: n = "Notification", duration: r = 5e3, swipeDirection: o = "right", swipeThreshold: s = 50, children: i } = e
            , [l, a] = S.useState(null)
            , [u, c] = S.useState(0)
            , d = S.useRef(!1)
            , h = S.useRef(!1);
        return n.trim() || console.error(`Invalid prop \`label\` supplied to \`${hd}\`. Expected non-empty \`string\`.`),
            f.jsx(md.Provider, {
                scope: t,
                children: f.jsx(nP, {
                    scope: t,
                    label: n,
                    duration: r,
                    swipeDirection: o,
                    swipeThreshold: s,
                    toastCount: u,
                    viewport: l,
                    onViewportChange: a,
                    onToastAdd: S.useCallback(() => c(p => p + 1), []),
                    onToastRemove: S.useCallback(() => c(p => p - 1), []),
                    isFocusedToastEscapeKeyDownRef: d,
                    isClosePausedRef: h,
                    children: i
                })
            })
    }
    ;
Ky.displayName = hd;
var qy = "ToastViewport"
    , rP = ["F8"]
    , Hu = "toast.viewportPause"
    , Wu = "toast.viewportResume"
    , Yy = S.forwardRef((e, t) => {
        const { __scopeToast: n, hotkey: r = rP, label: o = "Notifications ({hotkey})", ...s } = e
            , i = Ql(qy, n)
            , l = eP(n)
            , a = S.useRef(null)
            , u = S.useRef(null)
            , c = S.useRef(null)
            , d = S.useRef(null)
            , h = jt(t, d, i.onViewportChange)
            , p = r.join("+").replace(/Key/g, "").replace(/Digit/g, "")
            , m = i.toastCount > 0;
        S.useEffect(() => {
            const w = v => {
                var x;
                r.length !== 0 && r.every(E => v[E] || v.code === E) && ((x = d.current) == null || x.focus())
            }
                ;
            return document.addEventListener("keydown", w),
                () => document.removeEventListener("keydown", w)
        }
            , [r]),
            S.useEffect(() => {
                const w = a.current
                    , v = d.current;
                if (m && w && v) {
                    const y = () => {
                        if (!i.isClosePausedRef.current) {
                            const C = new CustomEvent(Hu);
                            v.dispatchEvent(C),
                                i.isClosePausedRef.current = !0
                        }
                    }
                        , x = () => {
                            if (i.isClosePausedRef.current) {
                                const C = new CustomEvent(Wu);
                                v.dispatchEvent(C),
                                    i.isClosePausedRef.current = !1
                            }
                        }
                        , E = C => {
                            !w.contains(C.relatedTarget) && x()
                        }
                        , b = () => {
                            w.contains(document.activeElement) || x()
                        }
                        ;
                    return w.addEventListener("focusin", y),
                        w.addEventListener("focusout", E),
                        w.addEventListener("pointermove", y),
                        w.addEventListener("pointerleave", b),
                        window.addEventListener("blur", y),
                        window.addEventListener("focus", x),
                        () => {
                            w.removeEventListener("focusin", y),
                                w.removeEventListener("focusout", E),
                                w.removeEventListener("pointermove", y),
                                w.removeEventListener("pointerleave", b),
                                window.removeEventListener("blur", y),
                                window.removeEventListener("focus", x)
                        }
                }
            }
                , [m, i.isClosePausedRef]);
        const g = S.useCallback(({ tabbingDirection: w }) => {
            const y = l().map(x => {
                const E = x.ref.current
                    , b = [E, ...gP(E)];
                return w === "forwards" ? b : b.reverse()
            }
            );
            return (w === "forwards" ? y.reverse() : y).flat()
        }
            , [l]);
        return S.useEffect(() => {
            const w = d.current;
            if (w) {
                const v = y => {
                    var b, C, k;
                    const x = y.altKey || y.ctrlKey || y.metaKey;
                    if (y.key === "Tab" && !x) {
                        const R = document.activeElement
                            , L = y.shiftKey;
                        if (y.target === w && L) {
                            (b = u.current) == null || b.focus();
                            return
                        }
                        const M = g({
                            tabbingDirection: L ? "backwards" : "forwards"
                        })
                            , Q = M.findIndex(_ => _ === R);
                        _a(M.slice(Q + 1)) ? y.preventDefault() : L ? (C = u.current) == null || C.focus() : (k = c.current) == null || k.focus()
                    }
                }
                    ;
                return w.addEventListener("keydown", v),
                    () => w.removeEventListener("keydown", v)
            }
        }
            , [l, g]),
            f.jsxs(SE, {
                ref: a,
                role: "region",
                "aria-label": o.replace("{hotkey}", p),
                tabIndex: -1,
                style: {
                    pointerEvents: m ? void 0 : "none"
                },
                children: [m && f.jsx(Qu, {
                    ref: u,
                    onFocusFromOutsideViewport: () => {
                        const w = g({
                            tabbingDirection: "forwards"
                        });
                        _a(w)
                    }
                }), f.jsx(md.Slot, {
                    scope: n,
                    children: f.jsx(Je.ol, {
                        tabIndex: -1,
                        ...s,
                        ref: h
                    })
                }), m && f.jsx(Qu, {
                    ref: c,
                    onFocusFromOutsideViewport: () => {
                        const w = g({
                            tabbingDirection: "backwards"
                        });
                        _a(w)
                    }
                })]
            })
    }
    );
Yy.displayName = qy;
var Gy = "ToastFocusProxy"
    , Qu = S.forwardRef((e, t) => {
        const { __scopeToast: n, onFocusFromOutsideViewport: r, ...o } = e
            , s = Ql(Gy, n);
        return f.jsx(Vl, {
            tabIndex: 0,
            ...o,
            ref: t,
            style: {
                position: "fixed"
            },
            onFocus: i => {
                var u;
                const l = i.relatedTarget;
                !((u = s.viewport) != null && u.contains(l)) && r()
            }
        })
    }
    );
Qu.displayName = Gy;
var Bs = "Toast"
    , oP = "toast.swipeStart"
    , sP = "toast.swipeMove"
    , iP = "toast.swipeCancel"
    , lP = "toast.swipeEnd"
    , Xy = S.forwardRef((e, t) => {
        const { forceMount: n, open: r, defaultOpen: o, onOpenChange: s, ...i } = e
            , [l, a] = Xb({
                prop: r,
                defaultProp: o ?? !0,
                onChange: s,
                caller: Bs
            });
        return f.jsx(ad, {
            present: n || l,
            children: f.jsx(cP, {
                open: l,
                ...i,
                ref: t,
                onClose: () => a(!1),
                onPause: Hn(e.onPause),
                onResume: Hn(e.onResume),
                onSwipeStart: be(e.onSwipeStart, u => {
                    u.currentTarget.setAttribute("data-swipe", "start")
                }
                ),
                onSwipeMove: be(e.onSwipeMove, u => {
                    const { x: c, y: d } = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "move"),
                        u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${c}px`),
                        u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${d}px`)
                }
                ),
                onSwipeCancel: be(e.onSwipeCancel, u => {
                    u.currentTarget.setAttribute("data-swipe", "cancel"),
                        u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
                        u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
                        u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
                        u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")
                }
                ),
                onSwipeEnd: be(e.onSwipeEnd, u => {
                    const { x: c, y: d } = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "end"),
                        u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
                        u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
                        u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${c}px`),
                        u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${d}px`),
                        a(!1)
                }
                )
            })
        })
    }
    );
Xy.displayName = Bs;
var [aP, uP] = Qy(Bs, {
    onClose() { }
})
    , cP = S.forwardRef((e, t) => {
        const { __scopeToast: n, type: r = "foreground", duration: o, open: s, onClose: i, onEscapeKeyDown: l, onPause: a, onResume: u, onSwipeStart: c, onSwipeMove: d, onSwipeCancel: h, onSwipeEnd: p, ...m } = e
            , g = Ql(Bs, n)
            , [w, v] = S.useState(null)
            , y = jt(t, _ => v(_))
            , x = S.useRef(null)
            , E = S.useRef(null)
            , b = o || g.duration
            , C = S.useRef(0)
            , k = S.useRef(b)
            , R = S.useRef(0)
            , { onToastAdd: L, onToastRemove: D } = g
            , U = Hn(() => {
                var X;
                (w == null ? void 0 : w.contains(document.activeElement)) && ((X = g.viewport) == null || X.focus()),
                    i()
            }
            )
            , M = S.useCallback(_ => {
                !_ || _ === 1 / 0 || (window.clearTimeout(R.current),
                    C.current = new Date().getTime(),
                    R.current = window.setTimeout(U, _))
            }
                , [U]);
        S.useEffect(() => {
            const _ = g.viewport;
            if (_) {
                const X = () => {
                    M(k.current),
                        u == null || u()
                }
                    , z = () => {
                        const W = new Date().getTime() - C.current;
                        k.current = k.current - W,
                            window.clearTimeout(R.current),
                            a == null || a()
                    }
                    ;
                return _.addEventListener(Hu, z),
                    _.addEventListener(Wu, X),
                    () => {
                        _.removeEventListener(Hu, z),
                            _.removeEventListener(Wu, X)
                    }
            }
        }
            , [g.viewport, b, a, u, M]),
            S.useEffect(() => {
                s && !g.isClosePausedRef.current && M(b)
            }
                , [s, b, g.isClosePausedRef, M]),
            S.useEffect(() => (L(),
                () => D()), [L, D]);
        const Q = S.useMemo(() => w ? ov(w) : null, [w]);
        return g.viewport ? f.jsxs(f.Fragment, {
            children: [Q && f.jsx(dP, {
                __scopeToast: n,
                role: "status",
                "aria-live": r === "foreground" ? "assertive" : "polite",
                children: Q
            }), f.jsx(aP, {
                scope: n,
                onClose: U,
                children: As.createPortal(f.jsx(md.ItemSlot, {
                    scope: n,
                    children: f.jsx(wE, {
                        asChild: !0,
                        onEscapeKeyDown: be(l, () => {
                            g.isFocusedToastEscapeKeyDownRef.current || U(),
                                g.isFocusedToastEscapeKeyDownRef.current = !1
                        }
                        ),
                        children: f.jsx(Je.li, {
                            tabIndex: 0,
                            "data-state": s ? "open" : "closed",
                            "data-swipe-direction": g.swipeDirection,
                            ...m,
                            ref: y,
                            style: {
                                userSelect: "none",
                                touchAction: "none",
                                ...e.style
                            },
                            onKeyDown: be(e.onKeyDown, _ => {
                                _.key === "Escape" && (l == null || l(_.nativeEvent),
                                    _.nativeEvent.defaultPrevented || (g.isFocusedToastEscapeKeyDownRef.current = !0,
                                        U()))
                            }
                            ),
                            onPointerDown: be(e.onPointerDown, _ => {
                                _.button === 0 && (x.current = {
                                    x: _.clientX,
                                    y: _.clientY
                                })
                            }
                            ),
                            onPointerMove: be(e.onPointerMove, _ => {
                                if (!x.current)
                                    return;
                                const X = _.clientX - x.current.x
                                    , z = _.clientY - x.current.y
                                    , W = !!E.current
                                    , N = ["left", "right"].includes(g.swipeDirection)
                                    , j = ["left", "up"].includes(g.swipeDirection) ? Math.min : Math.max
                                    , I = N ? j(0, X) : 0
                                    , B = N ? 0 : j(0, z)
                                    , $ = _.pointerType === "touch" ? 10 : 2
                                    , q = {
                                        x: I,
                                        y: B
                                    }
                                    , Y = {
                                        originalEvent: _,
                                        delta: q
                                    };
                                W ? (E.current = q,
                                    pi(sP, d, Y, {
                                        discrete: !1
                                    })) : Dp(q, g.swipeDirection, $) ? (E.current = q,
                                        pi(oP, c, Y, {
                                            discrete: !1
                                        }),
                                        _.target.setPointerCapture(_.pointerId)) : (Math.abs(X) > $ || Math.abs(z) > $) && (x.current = null)
                            }
                            ),
                            onPointerUp: be(e.onPointerUp, _ => {
                                const X = E.current
                                    , z = _.target;
                                if (z.hasPointerCapture(_.pointerId) && z.releasePointerCapture(_.pointerId),
                                    E.current = null,
                                    x.current = null,
                                    X) {
                                    const W = _.currentTarget
                                        , N = {
                                            originalEvent: _,
                                            delta: X
                                        };
                                    Dp(X, g.swipeDirection, g.swipeThreshold) ? pi(lP, p, N, {
                                        discrete: !0
                                    }) : pi(iP, h, N, {
                                        discrete: !0
                                    }),
                                        W.addEventListener("click", j => j.preventDefault(), {
                                            once: !0
                                        })
                                }
                            }
                            )
                        })
                    })
                }), g.viewport)
            })]
        }) : null
    }
    )
    , dP = e => {
        const { __scopeToast: t, children: n, ...r } = e
            , o = Ql(Bs, t)
            , [s, i] = S.useState(!1)
            , [l, a] = S.useState(!1);
        return hP(() => i(!0)),
            S.useEffect(() => {
                const u = window.setTimeout(() => a(!0), 1e3);
                return () => window.clearTimeout(u)
            }
                , []),
            l ? null : f.jsx(Cy, {
                asChild: !0,
                children: f.jsx(Vl, {
                    ...r,
                    children: s && f.jsxs(f.Fragment, {
                        children: [o.label, " ", n]
                    })
                })
            })
    }
    , fP = "ToastTitle"
    , Jy = S.forwardRef((e, t) => {
        const { __scopeToast: n, ...r } = e;
        return f.jsx(Je.div, {
            ...r,
            ref: t
        })
    }
    );
Jy.displayName = fP;
var pP = "ToastDescription"
    , Zy = S.forwardRef((e, t) => {
        const { __scopeToast: n, ...r } = e;
        return f.jsx(Je.div, {
            ...r,
            ref: t
        })
    }
    );
Zy.displayName = pP;
var ev = "ToastAction"
    , tv = S.forwardRef((e, t) => {
        const { altText: n, ...r } = e;
        return n.trim() ? f.jsx(rv, {
            altText: n,
            asChild: !0,
            children: f.jsx(gd, {
                ...r,
                ref: t
            })
        }) : (console.error(`Invalid prop \`altText\` supplied to \`${ev}\`. Expected non-empty \`string\`.`),
            null)
    }
    );
tv.displayName = ev;
var nv = "ToastClose"
    , gd = S.forwardRef((e, t) => {
        const { __scopeToast: n, ...r } = e
            , o = uP(nv, n);
        return f.jsx(rv, {
            asChild: !0,
            children: f.jsx(Je.button, {
                type: "button",
                ...r,
                ref: t,
                onClick: be(e.onClick, o.onClose)
            })
        })
    }
    );
gd.displayName = nv;
var rv = S.forwardRef((e, t) => {
    const { __scopeToast: n, altText: r, ...o } = e;
    return f.jsx(Je.div, {
        "data-radix-toast-announce-exclude": "",
        "data-radix-toast-announce-alt": r || void 0,
        ...o,
        ref: t
    })
}
);
function ov(e) {
    const t = [];
    return Array.from(e.childNodes).forEach(r => {
        if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent),
            mP(r)) {
            const o = r.ariaHidden || r.hidden || r.style.display === "none"
                , s = r.dataset.radixToastAnnounceExclude === "";
            if (!o)
                if (s) {
                    const i = r.dataset.radixToastAnnounceAlt;
                    i && t.push(i)
                } else
                    t.push(...ov(r))
        }
    }
    ),
        t
}
function pi(e, t, n, { discrete: r }) {
    const o = n.originalEvent.currentTarget
        , s = new CustomEvent(e, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        });
    t && o.addEventListener(e, t, {
        once: !0
    }),
        r ? Jg(o, s) : o.dispatchEvent(s)
}
var Dp = (e, t, n = 0) => {
    const r = Math.abs(e.x)
        , o = Math.abs(e.y)
        , s = r > o;
    return t === "left" || t === "right" ? s && r > n : !s && o > n
}
    ;
function hP(e = () => { }
) {
    const t = Hn(e);
    Wn(() => {
        let n = 0
            , r = 0;
        return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)),
            () => {
                window.cancelAnimationFrame(n),
                    window.cancelAnimationFrame(r)
            }
    }
        , [t])
}
function mP(e) {
    return e.nodeType === e.ELEMENT_NODE
}
function gP(e) {
    const t = []
        , n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: r => {
                const o = r.tagName === "INPUT" && r.type === "hidden";
                return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();)
        t.push(n.currentNode);
    return t
}
function _a(e) {
    const t = document.activeElement;
    return e.some(n => n === t ? !0 : (n.focus(),
        document.activeElement !== t))
}
var yP = Ky
    , vP = Yy
    , xP = Xy
    , wP = Jy
    , SP = Zy
    , EP = tv
    , bP = gd;
const CP = yP
    , sv = A.forwardRef(({ className: e, ...t }, n) => f.jsx(vP, {
        ref: n,
        className: Zn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", e),
        ...t
    }));
sv.displayName = "ToastViewport";
const kP = Vy("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
})
    , iv = A.forwardRef(({ className: e, variant: t, ...n }, r) => f.jsx(xP, {
        ref: r,
        className: Zn(kP({
            variant: t
        }), e),
        ...n
    }));
iv.displayName = "Toast";
const PP = A.forwardRef(({ className: e, ...t }, n) => f.jsx(EP, {
    ref: n,
    className: Zn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50", e),
    ...t
}));
PP.displayName = "ToastAction";
const lv = A.forwardRef(({ className: e, ...t }, n) => f.jsx(bP, {
    ref: n,
    className: Zn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", e),
    "toast-close": "",
    ...t,
    children: f.jsx(fd, {
        className: "h-4 w-4"
    })
}));
lv.displayName = "ToastClose";
const av = A.forwardRef(({ className: e, ...t }, n) => f.jsx(wP, {
    ref: n,
    className: Zn("text-sm font-semibold", e),
    ...t
}));
av.displayName = "ToastTitle";
const uv = A.forwardRef(({ className: e, ...t }, n) => f.jsx(SP, {
    ref: n,
    className: Zn("text-sm opacity-90", e),
    ...t
}));
uv.displayName = "ToastDescription";
function NP() {
    const { toasts: e } = Kk();
    return f.jsxs(CP, {
        children: [e.map(({ id: t, title: n, description: r, action: o, ...s }) => f.jsxs(iv, {
            ...s,
            children: [f.jsxs("div", {
                className: "grid gap-1",
                children: [n && f.jsx(av, {
                    children: n
                }), r && f.jsx(uv, {
                    children: r
                })]
            }), o, f.jsx(lv, {})]
        }, t)), f.jsx(sv, {})]
    })
}
var Ip = ["light", "dark"]
    , TP = "(prefers-color-scheme: dark)"
    , RP = S.createContext(void 0)
    , jP = {
        setTheme: e => { }
        ,
        themes: []
    }
    , OP = () => {
        var e;
        return (e = S.useContext(RP)) != null ? e : jP
    }
    ;
S.memo(({ forcedTheme: e, storageKey: t, attribute: n, enableSystem: r, enableColorScheme: o, defaultTheme: s, value: i, attrs: l, nonce: a }) => {
    let u = s === "system"
        , c = n === "class" ? `var d=document.documentElement,c=d.classList;${`c.remove(${l.map(m => `'${m}'`).join(",")})`};` : `var d=document.documentElement,n='${n}',s='setAttribute';`
        , d = o ? Ip.includes(s) && s ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${s}'` : "if(e==='light'||e==='dark')d.style.colorScheme=e" : ""
        , h = (m, g = !1, w = !0) => {
            let v = i ? i[m] : m
                , y = g ? m + "|| ''" : `'${v}'`
                , x = "";
            return o && w && !g && Ip.includes(m) && (x += `d.style.colorScheme = '${m}';`),
                n === "class" ? g || v ? x += `c.add(${y})` : x += "null" : v && (x += `d[s](n,${y})`),
                x
        }
        , p = e ? `!function(){${c}${h(e)}}()` : r ? `!function(){try{${c}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${TP}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${i ? `var x=${JSON.stringify(i)};` : ""}${h(i ? "x[e]" : "e", !0)}}${u ? "" : "else{" + h(s, !1, !1) + "}"}${d}}catch(e){}}()` : `!function(){try{${c}var e=localStorage.getItem('${t}');if(e){${i ? `var x=${JSON.stringify(i)};` : ""}${h(i ? "x[e]" : "e", !0)}}else{${h(s, !1, !1)};}${d}}catch(t){}}();`;
    return S.createElement("script", {
        nonce: a,
        dangerouslySetInnerHTML: {
            __html: p
        }
    })
}
);
var AP = e => {
    switch (e) {
        case "success":
            return DP;
        case "info":
            return MP;
        case "warning":
            return IP;
        case "error":
            return FP;
        default:
            return null
    }
}
    , _P = Array(12).fill(0)
    , LP = ({ visible: e, className: t }) => A.createElement("div", {
        className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
        "data-visible": e
    }, A.createElement("div", {
        className: "sonner-spinner"
    }, _P.map((n, r) => A.createElement("div", {
        className: "sonner-loading-bar",
        key: `spinner-bar-${r}`
    }))))
    , DP = A.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, A.createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd"
    }))
    , IP = A.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, A.createElement("path", {
        fillRule: "evenodd",
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
        clipRule: "evenodd"
    }))
    , MP = A.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, A.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
        clipRule: "evenodd"
    }))
    , FP = A.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, A.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
        clipRule: "evenodd"
    }))
    , zP = A.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, A.createElement("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
    }), A.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
    }))
    , $P = () => {
        let [e, t] = A.useState(document.hidden);
        return A.useEffect(() => {
            let n = () => {
                t(document.hidden)
            }
                ;
            return document.addEventListener("visibilitychange", n),
                () => window.removeEventListener("visibilitychange", n)
        }
            , []),
            e
    }
    , Ku = 1
    , BP = class {
        constructor() {
            this.subscribe = e => (this.subscribers.push(e),
                () => {
                    let t = this.subscribers.indexOf(e);
                    this.subscribers.splice(t, 1)
                }
            ),
                this.publish = e => {
                    this.subscribers.forEach(t => t(e))
                }
                ,
                this.addToast = e => {
                    this.publish(e),
                        this.toasts = [...this.toasts, e]
                }
                ,
                this.create = e => {
                    var t;
                    let { message: n, ...r } = e
                        , o = typeof (e == null ? void 0 : e.id) == "number" || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : Ku++
                        , s = this.toasts.find(l => l.id === o)
                        , i = e.dismissible === void 0 ? !0 : e.dismissible;
                    return this.dismissedToasts.has(o) && this.dismissedToasts.delete(o),
                        s ? this.toasts = this.toasts.map(l => l.id === o ? (this.publish({
                            ...l,
                            ...e,
                            id: o,
                            title: n
                        }),
                        {
                            ...l,
                            ...e,
                            id: o,
                            dismissible: i,
                            title: n
                        }) : l) : this.addToast({
                            title: n,
                            ...r,
                            dismissible: i,
                            id: o
                        }),
                        o
                }
                ,
                this.dismiss = e => (this.dismissedToasts.add(e),
                    e || this.toasts.forEach(t => {
                        this.subscribers.forEach(n => n({
                            id: t.id,
                            dismiss: !0
                        }))
                    }
                    ),
                    this.subscribers.forEach(t => t({
                        id: e,
                        dismiss: !0
                    })),
                    e),
                this.message = (e, t) => this.create({
                    ...t,
                    message: e
                }),
                this.error = (e, t) => this.create({
                    ...t,
                    message: e,
                    type: "error"
                }),
                this.success = (e, t) => this.create({
                    ...t,
                    type: "success",
                    message: e
                }),
                this.info = (e, t) => this.create({
                    ...t,
                    type: "info",
                    message: e
                }),
                this.warning = (e, t) => this.create({
                    ...t,
                    type: "warning",
                    message: e
                }),
                this.loading = (e, t) => this.create({
                    ...t,
                    type: "loading",
                    message: e
                }),
                this.promise = (e, t) => {
                    if (!t)
                        return;
                    let n;
                    t.loading !== void 0 && (n = this.create({
                        ...t,
                        promise: e,
                        type: "loading",
                        message: t.loading,
                        description: typeof t.description != "function" ? t.description : void 0
                    }));
                    let r = e instanceof Promise ? e : e(), o = n !== void 0, s, i = r.then(async a => {
                        if (s = ["resolve", a],
                            A.isValidElement(a))
                            o = !1,
                                this.create({
                                    id: n,
                                    type: "default",
                                    message: a
                                });
                        else if (VP(a) && !a.ok) {
                            o = !1;
                            let u = typeof t.error == "function" ? await t.error(`HTTP error! status: ${a.status}`) : t.error
                                , c = typeof t.description == "function" ? await t.description(`HTTP error! status: ${a.status}`) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: c
                            })
                        } else if (t.success !== void 0) {
                            o = !1;
                            let u = typeof t.success == "function" ? await t.success(a) : t.success
                                , c = typeof t.description == "function" ? await t.description(a) : t.description;
                            this.create({
                                id: n,
                                type: "success",
                                message: u,
                                description: c
                            })
                        }
                    }
                    ).catch(async a => {
                        if (s = ["reject", a],
                            t.error !== void 0) {
                            o = !1;
                            let u = typeof t.error == "function" ? await t.error(a) : t.error
                                , c = typeof t.description == "function" ? await t.description(a) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: c
                            })
                        }
                    }
                    ).finally(() => {
                        var a;
                        o && (this.dismiss(n),
                            n = void 0),
                            (a = t.finally) == null || a.call(t)
                    }
                    ), l = () => new Promise((a, u) => i.then(() => s[0] === "reject" ? u(s[1]) : a(s[1])).catch(u));
                    return typeof n != "string" && typeof n != "number" ? {
                        unwrap: l
                    } : Object.assign(n, {
                        unwrap: l
                    })
                }
                ,
                this.custom = (e, t) => {
                    let n = (t == null ? void 0 : t.id) || Ku++;
                    return this.create({
                        jsx: e(n),
                        id: n,
                        ...t
                    }),
                        n
                }
                ,
                this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id)),
                this.subscribers = [],
                this.toasts = [],
                this.dismissedToasts = new Set
        }
    }
    , He = new BP
    , UP = (e, t) => {
        let n = (t == null ? void 0 : t.id) || Ku++;
        return He.addToast({
            title: e,
            ...t,
            id: n
        }),
            n
    }
    , VP = e => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number"
    , HP = UP
    , WP = () => He.toasts
    , QP = () => He.getActiveToasts();
Object.assign(HP, {
    success: He.success,
    info: He.info,
    warning: He.warning,
    error: He.error,
    custom: He.custom,
    message: He.message,
    promise: He.promise,
    dismiss: He.dismiss,
    loading: He.loading
}, {
    getHistory: WP,
    getToasts: QP
});
function KP(e, { insertAt: t } = {}) {
    if (typeof document > "u")
        return;
    let n = document.head || document.getElementsByTagName("head")[0]
        , r = document.createElement("style");
    r.type = "text/css",
        t === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r),
        r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e))
}
KP(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function hi(e) {
    return e.label !== void 0
}
var qP = 3
    , YP = "32px"
    , GP = "16px"
    , Mp = 4e3
    , XP = 356
    , JP = 14
    , ZP = 20
    , eN = 200;
function wt(...e) {
    return e.filter(Boolean).join(" ")
}
function tN(e) {
    let [t, n] = e.split("-")
        , r = [];
    return t && r.push(t),
        n && r.push(n),
        r
}
var nN = e => {
    var t, n, r, o, s, i, l, a, u, c, d;
    let { invert: h, toast: p, unstyled: m, interacting: g, setHeights: w, visibleToasts: v, heights: y, index: x, toasts: E, expanded: b, removeToast: C, defaultRichColors: k, closeButton: R, style: L, cancelButtonStyle: D, actionButtonStyle: U, className: M = "", descriptionClassName: Q = "", duration: _, position: X, gap: z, loadingIcon: W, expandByDefault: N, classNames: j, icons: I, closeButtonAriaLabel: B = "Close toast", pauseWhenPageIsHidden: $ } = e
        , [q, Y] = A.useState(null)
        , [pe, Oe] = A.useState(null)
        , [re, Rr] = A.useState(!1)
        , [un, er] = A.useState(!1)
        , [cn, jr] = A.useState(!1)
        , [dn, Us] = A.useState(!1)
        , [Kl, Vs] = A.useState(!1)
        , [ql, Ro] = A.useState(0)
        , [Or, yd] = A.useState(0)
        , jo = A.useRef(p.duration || _ || Mp)
        , vd = A.useRef(null)
        , tr = A.useRef(null)
        , cv = x === 0
        , dv = x + 1 <= v
        , lt = p.type
        , Ar = p.dismissible !== !1
        , fv = p.className || ""
        , pv = p.descriptionClassName || ""
        , Hs = A.useMemo(() => y.findIndex(K => K.toastId === p.id) || 0, [y, p.id])
        , hv = A.useMemo(() => {
            var K;
            return (K = p.closeButton) != null ? K : R
        }
            , [p.closeButton, R])
        , xd = A.useMemo(() => p.duration || _ || Mp, [p.duration, _])
        , Yl = A.useRef(0)
        , _r = A.useRef(0)
        , wd = A.useRef(0)
        , Lr = A.useRef(null)
        , [mv, gv] = X.split("-")
        , Sd = A.useMemo(() => y.reduce((K, se, de) => de >= Hs ? K : K + se.height, 0), [y, Hs])
        , Ed = $P()
        , yv = p.invert || h
        , Gl = lt === "loading";
    _r.current = A.useMemo(() => Hs * z + Sd, [Hs, Sd]),
        A.useEffect(() => {
            jo.current = xd
        }
            , [xd]),
        A.useEffect(() => {
            Rr(!0)
        }
            , []),
        A.useEffect(() => {
            let K = tr.current;
            if (K) {
                let se = K.getBoundingClientRect().height;
                return yd(se),
                    w(de => [{
                        toastId: p.id,
                        height: se,
                        position: p.position
                    }, ...de]),
                    () => w(de => de.filter(gt => gt.toastId !== p.id))
            }
        }
            , [w, p.id]),
        A.useLayoutEffect(() => {
            if (!re)
                return;
            let K = tr.current
                , se = K.style.height;
            K.style.height = "auto";
            let de = K.getBoundingClientRect().height;
            K.style.height = se,
                yd(de),
                w(gt => gt.find(yt => yt.toastId === p.id) ? gt.map(yt => yt.toastId === p.id ? {
                    ...yt,
                    height: de
                } : yt) : [{
                    toastId: p.id,
                    height: de,
                    position: p.position
                }, ...gt])
        }
            , [re, p.title, p.description, w, p.id]);
    let fn = A.useCallback(() => {
        er(!0),
            Ro(_r.current),
            w(K => K.filter(se => se.toastId !== p.id)),
            setTimeout(() => {
                C(p)
            }
                , eN)
    }
        , [p, C, w, _r]);
    A.useEffect(() => {
        if (p.promise && lt === "loading" || p.duration === 1 / 0 || p.type === "loading")
            return;
        let K;
        return b || g || $ && Ed ? (() => {
            if (wd.current < Yl.current) {
                let se = new Date().getTime() - Yl.current;
                jo.current = jo.current - se
            }
            wd.current = new Date().getTime()
        }
        )() : jo.current !== 1 / 0 && (Yl.current = new Date().getTime(),
            K = setTimeout(() => {
                var se;
                (se = p.onAutoClose) == null || se.call(p, p),
                    fn()
            }
                , jo.current)),
            () => clearTimeout(K)
    }
        , [b, g, p, lt, $, Ed, fn]),
        A.useEffect(() => {
            p.delete && fn()
        }
            , [fn, p.delete]);
    function vv() {
        var K, se, de;
        return I != null && I.loading ? A.createElement("div", {
            className: wt(j == null ? void 0 : j.loader, (K = p == null ? void 0 : p.classNames) == null ? void 0 : K.loader, "sonner-loader"),
            "data-visible": lt === "loading"
        }, I.loading) : W ? A.createElement("div", {
            className: wt(j == null ? void 0 : j.loader, (se = p == null ? void 0 : p.classNames) == null ? void 0 : se.loader, "sonner-loader"),
            "data-visible": lt === "loading"
        }, W) : A.createElement(LP, {
            className: wt(j == null ? void 0 : j.loader, (de = p == null ? void 0 : p.classNames) == null ? void 0 : de.loader),
            visible: lt === "loading"
        })
    }
    return A.createElement("li", {
        tabIndex: 0,
        ref: tr,
        className: wt(M, fv, j == null ? void 0 : j.toast, (t = p == null ? void 0 : p.classNames) == null ? void 0 : t.toast, j == null ? void 0 : j.default, j == null ? void 0 : j[lt], (n = p == null ? void 0 : p.classNames) == null ? void 0 : n[lt]),
        "data-sonner-toast": "",
        "data-rich-colors": (r = p.richColors) != null ? r : k,
        "data-styled": !(p.jsx || p.unstyled || m),
        "data-mounted": re,
        "data-promise": !!p.promise,
        "data-swiped": Kl,
        "data-removed": un,
        "data-visible": dv,
        "data-y-position": mv,
        "data-x-position": gv,
        "data-index": x,
        "data-front": cv,
        "data-swiping": cn,
        "data-dismissible": Ar,
        "data-type": lt,
        "data-invert": yv,
        "data-swipe-out": dn,
        "data-swipe-direction": pe,
        "data-expanded": !!(b || N && re),
        style: {
            "--index": x,
            "--toasts-before": x,
            "--z-index": E.length - x,
            "--offset": `${un ? ql : _r.current}px`,
            "--initial-height": N ? "auto" : `${Or}px`,
            ...L,
            ...p.style
        },
        onDragEnd: () => {
            jr(!1),
                Y(null),
                Lr.current = null
        }
        ,
        onPointerDown: K => {
            Gl || !Ar || (vd.current = new Date,
                Ro(_r.current),
                K.target.setPointerCapture(K.pointerId),
                K.target.tagName !== "BUTTON" && (jr(!0),
                    Lr.current = {
                        x: K.clientX,
                        y: K.clientY
                    }))
        }
        ,
        onPointerUp: () => {
            var K, se, de, gt;
            if (dn || !Ar)
                return;
            Lr.current = null;
            let yt = Number(((K = tr.current) == null ? void 0 : K.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0)
                , pn = Number(((se = tr.current) == null ? void 0 : se.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0)
                , nr = new Date().getTime() - ((de = vd.current) == null ? void 0 : de.getTime())
                , vt = q === "x" ? yt : pn
                , hn = Math.abs(vt) / nr;
            if (Math.abs(vt) >= ZP || hn > .11) {
                Ro(_r.current),
                    (gt = p.onDismiss) == null || gt.call(p, p),
                    Oe(q === "x" ? yt > 0 ? "right" : "left" : pn > 0 ? "down" : "up"),
                    fn(),
                    Us(!0),
                    Vs(!1);
                return
            }
            jr(!1),
                Y(null)
        }
        ,
        onPointerMove: K => {
            var se, de, gt, yt;
            if (!Lr.current || !Ar || ((se = window.getSelection()) == null ? void 0 : se.toString().length) > 0)
                return;
            let pn = K.clientY - Lr.current.y
                , nr = K.clientX - Lr.current.x
                , vt = (de = e.swipeDirections) != null ? de : tN(X);
            !q && (Math.abs(nr) > 1 || Math.abs(pn) > 1) && Y(Math.abs(nr) > Math.abs(pn) ? "x" : "y");
            let hn = {
                x: 0,
                y: 0
            };
            q === "y" ? (vt.includes("top") || vt.includes("bottom")) && (vt.includes("top") && pn < 0 || vt.includes("bottom") && pn > 0) && (hn.y = pn) : q === "x" && (vt.includes("left") || vt.includes("right")) && (vt.includes("left") && nr < 0 || vt.includes("right") && nr > 0) && (hn.x = nr),
                (Math.abs(hn.x) > 0 || Math.abs(hn.y) > 0) && Vs(!0),
                (gt = tr.current) == null || gt.style.setProperty("--swipe-amount-x", `${hn.x}px`),
                (yt = tr.current) == null || yt.style.setProperty("--swipe-amount-y", `${hn.y}px`)
        }
    }, hv && !p.jsx ? A.createElement("button", {
        "aria-label": B,
        "data-disabled": Gl,
        "data-close-button": !0,
        onClick: Gl || !Ar ? () => { }
            : () => {
                var K;
                fn(),
                    (K = p.onDismiss) == null || K.call(p, p)
            }
        ,
        className: wt(j == null ? void 0 : j.closeButton, (o = p == null ? void 0 : p.classNames) == null ? void 0 : o.closeButton)
    }, (s = I == null ? void 0 : I.close) != null ? s : zP) : null, p.jsx || S.isValidElement(p.title) ? p.jsx ? p.jsx : typeof p.title == "function" ? p.title() : p.title : A.createElement(A.Fragment, null, lt || p.icon || p.promise ? A.createElement("div", {
        "data-icon": "",
        className: wt(j == null ? void 0 : j.icon, (i = p == null ? void 0 : p.classNames) == null ? void 0 : i.icon)
    }, p.promise || p.type === "loading" && !p.icon ? p.icon || vv() : null, p.type !== "loading" ? p.icon || (I == null ? void 0 : I[lt]) || AP(lt) : null) : null, A.createElement("div", {
        "data-content": "",
        className: wt(j == null ? void 0 : j.content, (l = p == null ? void 0 : p.classNames) == null ? void 0 : l.content)
    }, A.createElement("div", {
        "data-title": "",
        className: wt(j == null ? void 0 : j.title, (a = p == null ? void 0 : p.classNames) == null ? void 0 : a.title)
    }, typeof p.title == "function" ? p.title() : p.title), p.description ? A.createElement("div", {
        "data-description": "",
        className: wt(Q, pv, j == null ? void 0 : j.description, (u = p == null ? void 0 : p.classNames) == null ? void 0 : u.description)
    }, typeof p.description == "function" ? p.description() : p.description) : null), S.isValidElement(p.cancel) ? p.cancel : p.cancel && hi(p.cancel) ? A.createElement("button", {
        "data-button": !0,
        "data-cancel": !0,
        style: p.cancelButtonStyle || D,
        onClick: K => {
            var se, de;
            hi(p.cancel) && Ar && ((de = (se = p.cancel).onClick) == null || de.call(se, K),
                fn())
        }
        ,
        className: wt(j == null ? void 0 : j.cancelButton, (c = p == null ? void 0 : p.classNames) == null ? void 0 : c.cancelButton)
    }, p.cancel.label) : null, S.isValidElement(p.action) ? p.action : p.action && hi(p.action) ? A.createElement("button", {
        "data-button": !0,
        "data-action": !0,
        style: p.actionButtonStyle || U,
        onClick: K => {
            var se, de;
            hi(p.action) && ((de = (se = p.action).onClick) == null || de.call(se, K),
                !K.defaultPrevented && fn())
        }
        ,
        className: wt(j == null ? void 0 : j.actionButton, (d = p == null ? void 0 : p.classNames) == null ? void 0 : d.actionButton)
    }, p.action.label) : null))
}
    ;
function Fp() {
    if (typeof window > "u" || typeof document > "u")
        return "ltr";
    let e = document.documentElement.getAttribute("dir");
    return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e
}
function rN(e, t) {
    let n = {};
    return [e, t].forEach((r, o) => {
        let s = o === 1
            , i = s ? "--mobile-offset" : "--offset"
            , l = s ? GP : YP;
        function a(u) {
            ["top", "right", "bottom", "left"].forEach(c => {
                n[`${i}-${c}`] = typeof u == "number" ? `${u}px` : u
            }
            )
        }
        typeof r == "number" || typeof r == "string" ? a(r) : typeof r == "object" ? ["top", "right", "bottom", "left"].forEach(u => {
            r[u] === void 0 ? n[`${i}-${u}`] = l : n[`${i}-${u}`] = typeof r[u] == "number" ? `${r[u]}px` : r[u]
        }
        ) : a(l)
    }
    ),
        n
}
var oN = S.forwardRef(function (e, t) {
    let { invert: n, position: r = "bottom-right", hotkey: o = ["altKey", "KeyT"], expand: s, closeButton: i, className: l, offset: a, mobileOffset: u, theme: c = "light", richColors: d, duration: h, style: p, visibleToasts: m = qP, toastOptions: g, dir: w = Fp(), gap: v = JP, loadingIcon: y, icons: x, containerAriaLabel: E = "Notifications", pauseWhenPageIsHidden: b } = e
        , [C, k] = A.useState([])
        , R = A.useMemo(() => Array.from(new Set([r].concat(C.filter($ => $.position).map($ => $.position)))), [C, r])
        , [L, D] = A.useState([])
        , [U, M] = A.useState(!1)
        , [Q, _] = A.useState(!1)
        , [X, z] = A.useState(c !== "system" ? c : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        , W = A.useRef(null)
        , N = o.join("+").replace(/Key/g, "").replace(/Digit/g, "")
        , j = A.useRef(null)
        , I = A.useRef(!1)
        , B = A.useCallback($ => {
            k(q => {
                var Y;
                return (Y = q.find(pe => pe.id === $.id)) != null && Y.delete || He.dismiss($.id),
                    q.filter(({ id: pe }) => pe !== $.id)
            }
            )
        }
            , []);
    return A.useEffect(() => He.subscribe($ => {
        if ($.dismiss) {
            k(q => q.map(Y => Y.id === $.id ? {
                ...Y,
                delete: !0
            } : Y));
            return
        }
        setTimeout(() => {
            lg.flushSync(() => {
                k(q => {
                    let Y = q.findIndex(pe => pe.id === $.id);
                    return Y !== -1 ? [...q.slice(0, Y), {
                        ...q[Y],
                        ...$
                    }, ...q.slice(Y + 1)] : [$, ...q]
                }
                )
            }
            )
        }
        )
    }
    ), []),
        A.useEffect(() => {
            if (c !== "system") {
                z(c);
                return
            }
            if (c === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? z("dark") : z("light")),
                typeof window > "u")
                return;
            let $ = window.matchMedia("(prefers-color-scheme: dark)");
            try {
                $.addEventListener("change", ({ matches: q }) => {
                    z(q ? "dark" : "light")
                }
                )
            } catch {
                $.addListener(({ matches: Y }) => {
                    try {
                        z(Y ? "dark" : "light")
                    } catch (pe) {
                        console.error(pe)
                    }
                }
                )
            }
        }
            , [c]),
        A.useEffect(() => {
            C.length <= 1 && M(!1)
        }
            , [C]),
        A.useEffect(() => {
            let $ = q => {
                var Y, pe;
                o.every(Oe => q[Oe] || q.code === Oe) && (M(!0),
                    (Y = W.current) == null || Y.focus()),
                    q.code === "Escape" && (document.activeElement === W.current || (pe = W.current) != null && pe.contains(document.activeElement)) && M(!1)
            }
                ;
            return document.addEventListener("keydown", $),
                () => document.removeEventListener("keydown", $)
        }
            , [o]),
        A.useEffect(() => {
            if (W.current)
                return () => {
                    j.current && (j.current.focus({
                        preventScroll: !0
                    }),
                        j.current = null,
                        I.current = !1)
                }
        }
            , [W.current]),
        A.createElement("section", {
            ref: t,
            "aria-label": `${E} ${N}`,
            tabIndex: -1,
            "aria-live": "polite",
            "aria-relevant": "additions text",
            "aria-atomic": "false",
            suppressHydrationWarning: !0
        }, R.map(($, q) => {
            var Y;
            let [pe, Oe] = $.split("-");
            return C.length ? A.createElement("ol", {
                key: $,
                dir: w === "auto" ? Fp() : w,
                tabIndex: -1,
                ref: W,
                className: l,
                "data-sonner-toaster": !0,
                "data-theme": X,
                "data-y-position": pe,
                "data-lifted": U && C.length > 1 && !s,
                "data-x-position": Oe,
                style: {
                    "--front-toast-height": `${((Y = L[0]) == null ? void 0 : Y.height) || 0}px`,
                    "--width": `${XP}px`,
                    "--gap": `${v}px`,
                    ...p,
                    ...rN(a, u)
                },
                onBlur: re => {
                    I.current && !re.currentTarget.contains(re.relatedTarget) && (I.current = !1,
                        j.current && (j.current.focus({
                            preventScroll: !0
                        }),
                            j.current = null))
                }
                ,
                onFocus: re => {
                    re.target instanceof HTMLElement && re.target.dataset.dismissible === "false" || I.current || (I.current = !0,
                        j.current = re.relatedTarget)
                }
                ,
                onMouseEnter: () => M(!0),
                onMouseMove: () => M(!0),
                onMouseLeave: () => {
                    Q || M(!1)
                }
                ,
                onDragEnd: () => M(!1),
                onPointerDown: re => {
                    re.target instanceof HTMLElement && re.target.dataset.dismissible === "false" || _(!0)
                }
                ,
                onPointerUp: () => _(!1)
            }, C.filter(re => !re.position && q === 0 || re.position === $).map((re, Rr) => {
                var un, er;
                return A.createElement(nN, {
                    key: re.id,
                    icons: x,
                    index: Rr,
                    toast: re,
                    defaultRichColors: d,
                    duration: (un = g == null ? void 0 : g.duration) != null ? un : h,
                    className: g == null ? void 0 : g.className,
                    descriptionClassName: g == null ? void 0 : g.descriptionClassName,
                    invert: n,
                    visibleToasts: m,
                    closeButton: (er = g == null ? void 0 : g.closeButton) != null ? er : i,
                    interacting: Q,
                    position: $,
                    style: g == null ? void 0 : g.style,
                    unstyled: g == null ? void 0 : g.unstyled,
                    classNames: g == null ? void 0 : g.classNames,
                    cancelButtonStyle: g == null ? void 0 : g.cancelButtonStyle,
                    actionButtonStyle: g == null ? void 0 : g.actionButtonStyle,
                    removeToast: B,
                    toasts: C.filter(cn => cn.position == re.position),
                    heights: L.filter(cn => cn.position == re.position),
                    setHeights: D,
                    expandByDefault: s,
                    gap: v,
                    loadingIcon: y,
                    expanded: U,
                    pauseWhenPageIsHidden: b,
                    swipeDirections: e.swipeDirections
                })
            }
            )) : null
        }
        ))
});
const sN = e => {
    const { theme: t = "system" } = OP();
    return f.jsx(oN, {
        theme: t,
        className: "toaster group",
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            }
        },
        ...e
    })
}
    , iN = new E1
    , lN = () => f.jsx(C1, {
        client: iN,
        children: f.jsx(Ww, {
            children: f.jsx(JC, {
                children: f.jsx(nE, {
                    children: f.jsx(k1, {
                        children: f.jsx(P1, {
                            children: f.jsxs(rE, {
                                children: [" ", f.jsx(NP, {}), f.jsx(sN, {}), f.jsx(wk, {}), f.jsx(Ek, {}), f.jsxs(Mw, {
                                    children: [f.jsx(vn, {
                                        path: "/",
                                        element: f.jsx(Ak, {})
                                    }), f.jsx(vn, {
                                        path: "/products",
                                        element: f.jsx(_k, {})
                                    }), f.jsx(vn, {
                                        path: "/products/:id",
                                        element: f.jsx(Ik, {})
                                    }), f.jsx(vn, {
                                        path: "/login",
                                        element: f.jsx(Mk, {})
                                    }), f.jsx(vn, {
                                        path: "/register",
                                        element: f.jsx(zk, {})
                                    }), f.jsx(vn, {
                                        path: "/dashboard",
                                        element: f.jsx($k, {})
                                    }), " ", f.jsx(vn, {
                                        path: "*",
                                        element: f.jsx(Bk, {})
                                    })]
                                }), f.jsx(Sk, {})]
                            })
                        })
                    })
                })
            })
        })
    });
ag(document.getElementById("root")).render(f.jsx(S.StrictMode, {
    children: f.jsx(lN, {})
}));
