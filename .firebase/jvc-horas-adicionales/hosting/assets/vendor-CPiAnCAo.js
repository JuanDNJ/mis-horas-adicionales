import { n as e, r as t, t as n } from "./rolldown-runtime-DGruFWvd.js";
var r = n((e) => {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      a: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
        else break a;
      }
    }
    function n(e) {
      return e.length === 0 ? null : e[0];
    }
    function r(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
          var s = 2 * (r + 1) - 1,
            c = e[s],
            l = s + 1,
            u = e[l];
          if (0 > i(c, n))
            l < a && 0 > i(u, c)
              ? ((e[r] = u), (e[l] = n), (r = l))
              : ((e[r] = c), (e[s] = n), (r = s));
          else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
          else break a;
        }
      }
      return t;
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n === 0 ? e.id - t.id : n;
    }
    if (
      ((e.unstable_now = void 0),
      typeof performance == `object` && typeof performance.now == `function`)
    ) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var c = [],
      l = [],
      u = 1,
      d = null,
      f = 3,
      p = !1,
      m = !1,
      h = !1,
      g = !1,
      _ = typeof setTimeout == `function` ? setTimeout : null,
      v = typeof clearTimeout == `function` ? clearTimeout : null,
      y = typeof setImmediate < `u` ? setImmediate : null;
    function b(e) {
      for (var i = n(l); i !== null; ) {
        if (i.callback === null) r(l);
        else if (i.startTime <= e) (r(l), (i.sortIndex = i.expirationTime), t(c, i));
        else break;
        i = n(l);
      }
    }
    function x(e) {
      if (((h = !1), b(e), !m))
        if (n(c) !== null) ((m = !0), S || ((S = !0), D()));
        else {
          var t = n(l);
          t !== null && k(x, t.startTime - e);
        }
    }
    var S = !1,
      C = -1,
      w = 5,
      T = -1;
    function E() {
      return g ? !0 : !(e.unstable_now() - T < w);
    }
    function ee() {
      if (((g = !1), S)) {
        var t = e.unstable_now();
        T = t;
        var i = !0;
        try {
          a: {
            ((m = !1), h && ((h = !1), v(C), (C = -1)), (p = !0));
            var a = f;
            try {
              b: {
                for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E()); ) {
                  var o = d.callback;
                  if (typeof o == `function`) {
                    ((d.callback = null), (f = d.priorityLevel));
                    var s = o(d.expirationTime <= t);
                    if (((t = e.unstable_now()), typeof s == `function`)) {
                      ((d.callback = s), b(t), (i = !0));
                      break b;
                    }
                    (d === n(c) && r(c), b(t));
                  } else r(c);
                  d = n(c);
                }
                if (d !== null) i = !0;
                else {
                  var u = n(l);
                  (u !== null && k(x, u.startTime - t), (i = !1));
                }
              }
              break a;
            } finally {
              ((d = null), (f = a), (p = !1));
            }
            i = void 0;
          }
        } finally {
          i ? D() : (S = !1);
        }
      }
    }
    var D;
    if (typeof y == `function`)
      D = function () {
        y(ee);
      };
    else if (typeof MessageChannel < `u`) {
      var te = new MessageChannel(),
        O = te.port2;
      ((te.port1.onmessage = ee),
        (D = function () {
          O.postMessage(null);
        }));
    } else
      D = function () {
        _(ee, 0);
      };
    function k(t, n) {
      C = _(function () {
        t(e.unstable_now());
      }, n);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`
            )
          : (w = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f;
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = f;
        }
        var n = f;
        f = t;
        try {
          return e();
        } finally {
          f = n;
        }
      }),
      (e.unstable_requestPaint = function () {
        g = !0;
      }),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = f;
        f = e;
        try {
          return t();
        } finally {
          f = n;
        }
      }),
      (e.unstable_scheduleCallback = function (r, i, a) {
        var o = e.unstable_now();
        switch (
          (typeof a == `object` && a
            ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
            : (a = o),
          r)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 1073741823;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (s = a + s),
          (r = {
            id: u++,
            callback: i,
            priorityLevel: r,
            startTime: a,
            expirationTime: s,
            sortIndex: -1,
          }),
          a > o
            ? ((r.sortIndex = a),
              t(l, r),
              n(c) === null && r === n(l) && (h ? (v(C), (C = -1)) : (h = !0), k(x, a - o)))
            : ((r.sortIndex = s), t(c, r), m || p || ((m = !0), S || ((S = !0), D()))),
          r
        );
      }),
      (e.unstable_shouldYield = E),
      (e.unstable_wrapCallback = function (e) {
        var t = f;
        return function () {
          var n = f;
          f = t;
          try {
            return e.apply(this, arguments);
          } finally {
            f = n;
          }
        };
      }));
  }),
  i = n((e, t) => {
    t.exports = r();
  }),
  a = n((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.consumer`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.for(`react.activity`),
      p = Symbol.iterator;
    function m(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (p && e[p]) || e[`@@iterator`]), typeof e == `function` ? e : null);
    }
    var h = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      g = Object.assign,
      _ = {};
    function v(e, t, n) {
      ((this.props = e), (this.context = t), (this.refs = _), (this.updater = n || h));
    }
    ((v.prototype.isReactComponent = {}),
      (v.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `takes an object of state variables to update or a function which returns an object of state variables.`
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (v.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }));
    function y() {}
    y.prototype = v.prototype;
    function b(e, t, n) {
      ((this.props = e), (this.context = t), (this.refs = _), (this.updater = n || h));
    }
    var x = (b.prototype = new y());
    ((x.constructor = b), g(x, v.prototype), (x.isPureReactComponent = !0));
    var S = Array.isArray;
    function C() {}
    var w = { H: null, A: null, T: null, S: null },
      T = Object.prototype.hasOwnProperty;
    function E(e, n, r) {
      var i = r.ref;
      return { $$typeof: t, type: e, key: n, ref: i === void 0 ? null : i, props: r };
    }
    function ee(e, t) {
      return E(e.type, t, e.props);
    }
    function D(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    function te(e) {
      var t = { "=": `=0`, ":": `=2` };
      return (
        `$` +
        e.replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    var O = /\/+/g;
    function k(e, t) {
      return typeof e == `object` && e && e.key != null ? te(`` + e.key) : t.toString(36);
    }
    function ne(e) {
      switch (e.status) {
        case `fulfilled`:
          return e.value;
        case `rejected`:
          throw e.reason;
        default:
          switch (
            (typeof e.status == `string`
              ? e.then(C, C)
              : ((e.status = `pending`),
                e.then(
                  function (t) {
                    e.status === `pending` && ((e.status = `fulfilled`), (e.value = t));
                  },
                  function (t) {
                    e.status === `pending` && ((e.status = `rejected`), (e.reason = t));
                  }
                )),
            e.status)
          ) {
            case `fulfilled`:
              return e.value;
            case `rejected`:
              throw e.reason;
          }
      }
      throw e;
    }
    function A(e, r, i, a, o) {
      var s = typeof e;
      (s === `undefined` || s === `boolean`) && (e = null);
      var c = !1;
      if (e === null) c = !0;
      else
        switch (s) {
          case `bigint`:
          case `string`:
          case `number`:
            c = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                c = !0;
                break;
              case d:
                return ((c = e._init), A(c(e._payload), r, i, a, o));
            }
        }
      if (c)
        return (
          (o = o(e)),
          (c = a === `` ? `.` + k(e, 0) : a),
          S(o)
            ? ((i = ``),
              c != null && (i = c.replace(O, `$&/`) + `/`),
              A(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (D(o) &&
                (o = ee(
                  o,
                  i +
                    (o.key == null || (e && e.key === o.key)
                      ? ``
                      : (`` + o.key).replace(O, `$&/`) + `/`) +
                    c
                )),
              r.push(o)),
          1
        );
      c = 0;
      var l = a === `` ? `.` : a + `:`;
      if (S(e))
        for (var u = 0; u < e.length; u++) ((a = e[u]), (s = l + k(a, u)), (c += A(a, r, i, s, o)));
      else if (((u = m(e)), typeof u == `function`))
        for (e = u.call(e), u = 0; !(a = e.next()).done; )
          ((a = a.value), (s = l + k(a, u++)), (c += A(a, r, i, s, o)));
      else if (s === `object`) {
        if (typeof e.then == `function`) return A(ne(e), r, i, a, o);
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`
          )
        );
      }
      return c;
    }
    function j(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        A(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function re(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (t) {
              (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = t));
            },
            function (t) {
              (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = t));
            }
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var M =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (typeof process == `object` && typeof process.emit == `function`) {
                process.emit(`uncaughtException`, e);
                return;
              }
              console.error(e);
            },
      N = {
        map: j,
        forEach: function (e, t, n) {
          j(
            e,
            function () {
              t.apply(this, arguments);
            },
            n
          );
        },
        count: function (e) {
          var t = 0;
          return (
            j(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            j(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!D(e))
            throw Error(`React.Children.only expected to receive a single React element child.`);
          return e;
        },
      };
    ((e.Activity = f),
      (e.Children = N),
      (e.Component = v),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = b),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w),
      (e.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (e) {
          return w.H.useMemoCache(e);
        },
      }),
      (e.cache = function (e) {
        return function () {
          return e.apply(null, arguments);
        };
      }),
      (e.cacheSignal = function () {
        return null;
      }),
      (e.cloneElement = function (e, t, n) {
        if (e == null)
          throw Error(`The argument must be a React element, but you passed ` + e + `.`);
        var r = g({}, e.props),
          i = e.key;
        if (t != null)
          for (a in (t.key !== void 0 && (i = `` + t.key), t))
            !T.call(t, a) ||
              a === `key` ||
              a === `__self` ||
              a === `__source` ||
              (a === `ref` && t.ref === void 0) ||
              (r[a] = t[a]);
        var a = arguments.length - 2;
        if (a === 1) r.children = n;
        else if (1 < a) {
          for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
          r.children = o;
        }
        return E(e.type, i, r);
      }),
      (e.createContext = function (e) {
        return (
          (e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (e.Provider = e),
          (e.Consumer = { $$typeof: o, _context: e }),
          e
        );
      }),
      (e.createElement = function (e, t, n) {
        var r,
          i = {},
          a = null;
        if (t != null)
          for (r in (t.key !== void 0 && (a = `` + t.key), t))
            T.call(t, r) && r !== `key` && r !== `__self` && r !== `__source` && (i[r] = t[r]);
        var o = arguments.length - 2;
        if (o === 1) i.children = n;
        else if (1 < o) {
          for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
          i.children = s;
        }
        if (e && e.defaultProps)
          for (r in ((o = e.defaultProps), o)) i[r] === void 0 && (i[r] = o[r]);
        return E(e, a, i);
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: c, render: e };
      }),
      (e.isValidElement = D),
      (e.lazy = function (e) {
        return { $$typeof: d, _payload: { _status: -1, _result: e }, _init: re };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = w.T,
          n = {};
        w.T = n;
        try {
          var r = e(),
            i = w.S;
          (i !== null && i(n, r),
            typeof r == `object` && r && typeof r.then == `function` && r.then(C, M));
        } catch (e) {
          M(e);
        } finally {
          (t !== null && n.types !== null && (t.types = n.types), (w.T = t));
        }
      }),
      (e.unstable_useCacheRefresh = function () {
        return w.H.useCacheRefresh();
      }),
      (e.use = function (e) {
        return w.H.use(e);
      }),
      (e.useActionState = function (e, t, n) {
        return w.H.useActionState(e, t, n);
      }),
      (e.useCallback = function (e, t) {
        return w.H.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return w.H.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e, t) {
        return w.H.useDeferredValue(e, t);
      }),
      (e.useEffect = function (e, t) {
        return w.H.useEffect(e, t);
      }),
      (e.useEffectEvent = function (e) {
        return w.H.useEffectEvent(e);
      }),
      (e.useId = function () {
        return w.H.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return w.H.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return w.H.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return w.H.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return w.H.useMemo(e, t);
      }),
      (e.useOptimistic = function (e, t) {
        return w.H.useOptimistic(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return w.H.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return w.H.useRef(e);
      }),
      (e.useState = function (e) {
        return w.H.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return w.H.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return w.H.useTransition();
      }),
      (e.version = `19.2.3`));
  }),
  o = n((e, t) => {
    t.exports = a();
  }),
  s = n((e) => {
    var t = o();
    function n(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function r() {}
    var i = {
        d: {
          f: r,
          r: function () {
            throw Error(n(522));
          },
          D: r,
          C: r,
          L: r,
          m: r,
          X: r,
          S: r,
          M: r,
        },
        p: 0,
        findDOMNode: null,
      },
      a = Symbol.for(`react.portal`);
    function s(e, t, n) {
      var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: a,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function l(e, t) {
      if (e === `font`) return ``;
      if (typeof t == `string`) return t === `use-credentials` ? t : ``;
    }
    ((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
      (e.createPortal = function (e, t) {
        var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)) throw Error(n(299));
        return s(e, t, null, r);
      }),
      (e.flushSync = function (e) {
        var t = c.T,
          n = i.p;
        try {
          if (((c.T = null), (i.p = 2), e)) return e();
        } finally {
          ((c.T = t), (i.p = n), i.d.f());
        }
      }),
      (e.preconnect = function (e, t) {
        typeof e == `string` &&
          (t
            ? ((t = t.crossOrigin),
              (t = typeof t == `string` ? (t === `use-credentials` ? t : ``) : void 0))
            : (t = null),
          i.d.C(e, t));
      }),
      (e.prefetchDNS = function (e) {
        typeof e == `string` && i.d.D(e);
      }),
      (e.preinit = function (e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
          var n = t.as,
            r = l(n, t.crossOrigin),
            a = typeof t.integrity == `string` ? t.integrity : void 0,
            o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
          n === `style`
            ? i.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                crossOrigin: r,
                integrity: a,
                fetchPriority: o,
              })
            : n === `script` &&
              i.d.X(e, {
                crossOrigin: r,
                integrity: a,
                fetchPriority: o,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
        }
      }),
      (e.preinitModule = function (e, t) {
        if (typeof e == `string`)
          if (typeof t == `object` && t) {
            if (t.as == null || t.as === `script`) {
              var n = l(t.as, t.crossOrigin);
              i.d.M(e, {
                crossOrigin: n,
                integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
            }
          } else t ?? i.d.M(e);
      }),
      (e.preload = function (e, t) {
        if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
          var n = t.as,
            r = l(n, t.crossOrigin);
          i.d.L(e, n, {
            crossOrigin: r,
            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            nonce: typeof t.nonce == `string` ? t.nonce : void 0,
            type: typeof t.type == `string` ? t.type : void 0,
            fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
            referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
            imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
            imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
            media: typeof t.media == `string` ? t.media : void 0,
          });
        }
      }),
      (e.preloadModule = function (e, t) {
        if (typeof e == `string`)
          if (t) {
            var n = l(t.as, t.crossOrigin);
            i.d.m(e, {
              as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
              crossOrigin: n,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            });
          } else i.d.m(e);
      }),
      (e.requestFormReset = function (e) {
        i.d.r(e);
      }),
      (e.unstable_batchedUpdates = function (e, t) {
        return e(t);
      }),
      (e.useFormState = function (e, t, n) {
        return c.H.useFormState(e, t, n);
      }),
      (e.useFormStatus = function () {
        return c.H.useHostTransitionStatus();
      }),
      (e.version = `19.2.3`));
  }),
  c = n((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = s()));
  }),
  l = n((e) => {
    var t = i(),
      n = o(),
      r = c();
    function a(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function s(e) {
      return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
    }
    function l(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function u(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
          return t.dehydrated;
      }
      return null;
    }
    function d(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
          return t.dehydrated;
      }
      return null;
    }
    function f(e) {
      if (l(e) !== e) throw Error(a(188));
    }
    function p(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = l(e)), t === null)) throw Error(a(188));
        return t === e ? e : null;
      }
      for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var o = i.alternate;
        if (o === null) {
          if (((r = i.return), r !== null)) {
            n = r;
            continue;
          }
          break;
        }
        if (i.child === o.child) {
          for (o = i.child; o; ) {
            if (o === n) return (f(i), e);
            if (o === r) return (f(i), t);
            o = o.sibling;
          }
          throw Error(a(188));
        }
        if (n.return !== r.return) ((n = i), (r = o));
        else {
          for (var s = !1, c = i.child; c; ) {
            if (c === n) {
              ((s = !0), (n = i), (r = o));
              break;
            }
            if (c === r) {
              ((s = !0), (r = i), (n = o));
              break;
            }
            c = c.sibling;
          }
          if (!s) {
            for (c = o.child; c; ) {
              if (c === n) {
                ((s = !0), (n = o), (r = i));
                break;
              }
              if (c === r) {
                ((s = !0), (r = o), (n = i));
                break;
              }
              c = c.sibling;
            }
            if (!s) throw Error(a(189));
          }
        }
        if (n.alternate !== r) throw Error(a(190));
      }
      if (n.tag !== 3) throw Error(a(188));
      return n.stateNode.current === n ? e : t;
    }
    function m(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (((t = m(e)), t !== null)) return t;
        e = e.sibling;
      }
      return null;
    }
    var h = Object.assign,
      g = Symbol.for(`react.element`),
      _ = Symbol.for(`react.transitional.element`),
      v = Symbol.for(`react.portal`),
      y = Symbol.for(`react.fragment`),
      b = Symbol.for(`react.strict_mode`),
      x = Symbol.for(`react.profiler`),
      S = Symbol.for(`react.consumer`),
      C = Symbol.for(`react.context`),
      w = Symbol.for(`react.forward_ref`),
      T = Symbol.for(`react.suspense`),
      E = Symbol.for(`react.suspense_list`),
      ee = Symbol.for(`react.memo`),
      D = Symbol.for(`react.lazy`),
      te = Symbol.for(`react.activity`),
      O = Symbol.for(`react.memo_cache_sentinel`),
      k = Symbol.iterator;
    function ne(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (k && e[k]) || e[`@@iterator`]), typeof e == `function` ? e : null);
    }
    var A = Symbol.for(`react.client.reference`);
    function j(e) {
      if (e == null) return null;
      if (typeof e == `function`) return e.$$typeof === A ? null : e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case y:
          return `Fragment`;
        case x:
          return `Profiler`;
        case b:
          return `StrictMode`;
        case T:
          return `Suspense`;
        case E:
          return `SuspenseList`;
        case te:
          return `Activity`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case v:
            return `Portal`;
          case C:
            return e.displayName || `Context`;
          case S:
            return (e._context.displayName || `Context`) + `.Consumer`;
          case w:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case ee:
            return ((t = e.displayName || null), t === null ? j(e.type) || `Memo` : t);
          case D:
            ((t = e._payload), (e = e._init));
            try {
              return j(e(t));
            } catch {}
        }
      return null;
    }
    var re = Array.isArray,
      M = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      N = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ie = { pending: !1, data: null, method: null, action: null },
      P = [],
      F = -1;
    function ae(e) {
      return { current: e };
    }
    function I(e) {
      0 > F || ((e.current = P[F]), (P[F] = null), F--);
    }
    function L(e, t) {
      (F++, (P[F] = e.current), (e.current = t));
    }
    var oe = ae(null),
      se = ae(null),
      ce = ae(null),
      le = ae(null);
    function ue(e, t) {
      switch ((L(ce, t), L(se, e), L(oe, null), t.nodeType)) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
          break;
        default:
          if (((e = t.tagName), (t = t.namespaceURI))) ((t = Vd(t)), (e = Hd(t, e)));
          else
            switch (e) {
              case `svg`:
                e = 1;
                break;
              case `math`:
                e = 2;
                break;
              default:
                e = 0;
            }
      }
      (I(oe), L(oe, e));
    }
    function de() {
      (I(oe), I(se), I(ce));
    }
    function fe(e) {
      e.memoizedState !== null && L(le, e);
      var t = oe.current,
        n = Hd(t, e.type);
      t !== n && (L(se, e), L(oe, n));
    }
    function pe(e) {
      (se.current === e && (I(oe), I(se)), le.current === e && (I(le), (Qf._currentValue = ie)));
    }
    var me, he;
    function ge(e) {
      if (me === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          ((me = (t && t[1]) || ``),
            (he =
              -1 <
              e.stack.indexOf(`
    at`)
                ? ` (<anonymous>)`
                : -1 < e.stack.indexOf(`@`)
                  ? `@unknown:0:0`
                  : ``));
        }
      return (
        `
` +
        me +
        e +
        he
      );
    }
    var _e = !1;
    function ve(e, t) {
      if (!e || _e) return ``;
      _e = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var r = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var n = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(n.prototype, `props`, {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == `object` && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(n, []);
                  } catch (e) {
                    var r = e;
                  }
                  Reflect.construct(e, [], n);
                } else {
                  try {
                    n.call();
                  } catch (e) {
                    r = e;
                  }
                  e.call(n.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (e) {
                  r = e;
                }
                (n = e()) && typeof n.catch == `function` && n.catch(function () {});
              }
            } catch (e) {
              if (e && r && typeof e.stack == `string`) return [e.stack, r.stack];
            }
            return [null, null];
          },
        };
        r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
        var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, `name`);
        i &&
          i.configurable &&
          Object.defineProperty(r.DetermineComponentFrameRoot, `name`, {
            value: `DetermineComponentFrameRoot`,
          });
        var a = r.DetermineComponentFrameRoot(),
          o = a[0],
          s = a[1];
        if (o && s) {
          var c = o.split(`
`),
            l = s.split(`
`);
          for (i = r = 0; r < c.length && !c[r].includes(`DetermineComponentFrameRoot`); ) r++;
          for (; i < l.length && !l[i].includes(`DetermineComponentFrameRoot`); ) i++;
          if (r === c.length || i === l.length)
            for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i]; ) i--;
          for (; 1 <= r && 0 <= i; r--, i--)
            if (c[r] !== l[i]) {
              if (r !== 1 || i !== 1)
                do
                  if ((r--, i--, 0 > i || c[r] !== l[i])) {
                    var u =
                      `
` + c[r].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        u.includes(`<anonymous>`) &&
                        (u = u.replace(`<anonymous>`, e.displayName)),
                      u
                    );
                  }
                while (1 <= r && 0 <= i);
              break;
            }
        }
      } finally {
        ((_e = !1), (Error.prepareStackTrace = n));
      }
      return (n = e ? e.displayName || e.name : ``) ? ge(n) : ``;
    }
    function ye(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return ge(e.type);
        case 16:
          return ge(`Lazy`);
        case 13:
          return e.child !== t && t !== null ? ge(`Suspense Fallback`) : ge(`Suspense`);
        case 19:
          return ge(`SuspenseList`);
        case 0:
        case 15:
          return ve(e.type, !1);
        case 11:
          return ve(e.type.render, !1);
        case 1:
          return ve(e.type, !0);
        case 31:
          return ge(`Activity`);
        default:
          return ``;
      }
    }
    function be(e) {
      try {
        var t = ``,
          n = null;
        do ((t += ye(e, n)), (n = e), (e = e.return));
        while (e);
        return t;
      } catch (e) {
        return (
          `
Error generating stack: ` +
          e.message +
          `
` +
          e.stack
        );
      }
    }
    var xe = Object.prototype.hasOwnProperty,
      Se = t.unstable_scheduleCallback,
      Ce = t.unstable_cancelCallback,
      we = t.unstable_shouldYield,
      Te = t.unstable_requestPaint,
      Ee = t.unstable_now,
      De = t.unstable_getCurrentPriorityLevel,
      Oe = t.unstable_ImmediatePriority,
      ke = t.unstable_UserBlockingPriority,
      Ae = t.unstable_NormalPriority,
      je = t.unstable_LowPriority,
      Me = t.unstable_IdlePriority,
      Ne = t.log,
      Pe = t.unstable_setDisableYieldValue,
      Fe = null,
      Ie = null;
    function Le(e) {
      if ((typeof Ne == `function` && Pe(e), Ie && typeof Ie.setStrictMode == `function`))
        try {
          Ie.setStrictMode(Fe, e);
        } catch {}
    }
    var Re = Math.clz32 ? Math.clz32 : Ve,
      ze = Math.log,
      Be = Math.LN2;
    function Ve(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((ze(e) / Be) | 0)) | 0);
    }
    var He = 256,
      Ue = 262144,
      We = 4194304;
    function Ge(e) {
      var t = e & 42;
      if (t !== 0) return t;
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
          return 64;
        case 128:
          return 128;
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
          return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return e;
      }
    }
    function Ke(e, t, n) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var i = 0,
        a = e.suspendedLanes,
        o = e.pingedLanes;
      e = e.warmLanes;
      var s = r & 134217727;
      return (
        s === 0
          ? ((s = r & ~a),
            s === 0
              ? o === 0
                ? n || ((n = r & ~e), n !== 0 && (i = Ge(n)))
                : (i = Ge(o))
              : (i = Ge(s)))
          : ((r = s & ~a),
            r === 0
              ? ((o &= s), o === 0 ? n || ((n = s & ~e), n !== 0 && (i = Ge(n))) : (i = Ge(o)))
              : (i = Ge(r))),
        i === 0
          ? 0
          : t !== 0 &&
              t !== i &&
              (t & a) === 0 &&
              ((a = i & -i), (n = t & -t), a >= n || (a === 32 && n & 4194048))
            ? t
            : i
      );
    }
    function qe(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Je(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
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
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Ye() {
      var e = We;
      return ((We <<= 1), !(We & 62914560) && (We = 4194304), e);
    }
    function Xe(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Ze(e, t) {
      ((e.pendingLanes |= t),
        t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
    }
    function Qe(e, t, n, r, i, a) {
      var o = e.pendingLanes;
      ((e.pendingLanes = n),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.warmLanes = 0),
        (e.expiredLanes &= n),
        (e.entangledLanes &= n),
        (e.errorRecoveryDisabledLanes &= n),
        (e.shellSuspendCounter = 0));
      var s = e.entanglements,
        c = e.expirationTimes,
        l = e.hiddenUpdates;
      for (n = o & ~n; 0 < n; ) {
        var u = 31 - Re(n),
          d = 1 << u;
        ((s[u] = 0), (c[u] = -1));
        var f = l[u];
        if (f !== null)
          for (l[u] = null, u = 0; u < f.length; u++) {
            var p = f[u];
            p !== null && (p.lane &= -536870913);
          }
        n &= ~d;
      }
      (r !== 0 && $e(e, r, 0),
        a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t)));
    }
    function $e(e, t, n) {
      ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
      var r = 31 - Re(t);
      ((e.entangledLanes |= t),
        (e.entanglements[r] = e.entanglements[r] | 1073741824 | (n & 261930)));
    }
    function et(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - Re(n),
          i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
      }
    }
    function tt(e, t) {
      var n = t & -t;
      return ((n = n & 42 ? 1 : nt(n)), (n & (e.suspendedLanes | t)) === 0 ? n : 0);
    }
    function nt(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
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
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function rt(e) {
      return ((e &= -e), 2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2);
    }
    function it() {
      var e = N.p;
      return e === 0 ? ((e = window.event), e === void 0 ? 32 : mp(e.type)) : e;
    }
    function at(e, t) {
      var n = N.p;
      try {
        return ((N.p = e), t());
      } finally {
        N.p = n;
      }
    }
    var ot = Math.random().toString(36).slice(2),
      st = `__reactFiber$` + ot,
      ct = `__reactProps$` + ot,
      lt = `__reactContainer$` + ot,
      ut = `__reactEvents$` + ot,
      dt = `__reactListeners$` + ot,
      ft = `__reactHandles$` + ot,
      pt = `__reactResources$` + ot,
      mt = `__reactMarker$` + ot;
    function ht(e) {
      (delete e[st], delete e[ct], delete e[ut], delete e[dt], delete e[ft]);
    }
    function gt(e) {
      var t = e[st];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[lt] || n[st])) {
          if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
            for (e = df(e); e !== null; ) {
              if ((n = e[st])) return n;
              e = df(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function _t(e) {
      if ((e = e[st] || e[lt])) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
      }
      return null;
    }
    function vt(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(a(33));
    }
    function yt(e) {
      var t = e[pt];
      return ((t ||= e[pt] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
    }
    function bt(e) {
      e[mt] = !0;
    }
    var xt = new Set(),
      St = {};
    function Ct(e, t) {
      (wt(e, t), wt(e + `Capture`, t));
    }
    function wt(e, t) {
      for (St[e] = t, e = 0; e < t.length; e++) xt.add(t[e]);
    }
    var Tt = RegExp(
        `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`
      ),
      Et = {},
      Dt = {};
    function Ot(e) {
      return xe.call(Dt, e)
        ? !0
        : xe.call(Et, e)
          ? !1
          : Tt.test(e)
            ? (Dt[e] = !0)
            : ((Et[e] = !0), !1);
    }
    function kt(e, t, n) {
      if (Ot(t))
        if (n === null) e.removeAttribute(t);
        else {
          switch (typeof n) {
            case `undefined`:
            case `function`:
            case `symbol`:
              e.removeAttribute(t);
              return;
            case `boolean`:
              var r = t.toLowerCase().slice(0, 5);
              if (r !== `data-` && r !== `aria-`) {
                e.removeAttribute(t);
                return;
              }
          }
          e.setAttribute(t, `` + n);
        }
    }
    function At(e, t, n) {
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case `undefined`:
          case `function`:
          case `symbol`:
          case `boolean`:
            e.removeAttribute(t);
            return;
        }
        e.setAttribute(t, `` + n);
      }
    }
    function jt(e, t, n, r) {
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case `undefined`:
          case `function`:
          case `symbol`:
          case `boolean`:
            e.removeAttribute(n);
            return;
        }
        e.setAttributeNS(t, n, `` + r);
      }
    }
    function Mt(e) {
      switch (typeof e) {
        case `bigint`:
        case `boolean`:
        case `number`:
        case `string`:
        case `undefined`:
          return e;
        case `object`:
          return e;
        default:
          return ``;
      }
    }
    function Nt(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === `input` && (t === `checkbox` || t === `radio`);
    }
    function Pt(e, t, n) {
      var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (
        !e.hasOwnProperty(t) &&
        r !== void 0 &&
        typeof r.get == `function` &&
        typeof r.set == `function`
      ) {
        var i = r.get,
          a = r.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              ((n = `` + e), a.call(this, e));
            },
          }),
          Object.defineProperty(e, t, { enumerable: r.enumerable }),
          {
            getValue: function () {
              return n;
            },
            setValue: function (e) {
              n = `` + e;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function Ft(e) {
      if (!e._valueTracker) {
        var t = Nt(e) ? `checked` : `value`;
        e._valueTracker = Pt(e, t, `` + e[t]);
      }
    }
    function It(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = ``;
      return (
        e && (r = Nt(e) ? (e.checked ? `true` : `false`) : e.value),
        (e = r),
        e === n ? !1 : (t.setValue(e), !0)
      );
    }
    function Lt(e) {
      if (((e ||= typeof document < `u` ? document : void 0), e === void 0)) return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Rt = /[\n"\\]/g;
    function zt(e) {
      return e.replace(Rt, function (e) {
        return `\\` + e.charCodeAt(0).toString(16) + ` `;
      });
    }
    function Bt(e, t, n, r, i, a, o, s) {
      ((e.name = ``),
        o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean`
          ? (e.type = o)
          : e.removeAttribute(`type`),
        t == null
          ? (o !== `submit` && o !== `reset`) || e.removeAttribute(`value`)
          : o === `number`
            ? ((t === 0 && e.value === ``) || e.value != t) && (e.value = `` + Mt(t))
            : e.value !== `` + Mt(t) && (e.value = `` + Mt(t)),
        t == null
          ? n == null
            ? r != null && e.removeAttribute(`value`)
            : Ht(e, o, Mt(n))
          : Ht(e, o, Mt(t)),
        i == null && a != null && (e.defaultChecked = !!a),
        i != null && (e.checked = i && typeof i != `function` && typeof i != `symbol`),
        s != null && typeof s != `function` && typeof s != `symbol` && typeof s != `boolean`
          ? (e.name = `` + Mt(s))
          : e.removeAttribute(`name`));
    }
    function Vt(e, t, n, r, i, a, o, s) {
      if (
        (a != null &&
          typeof a != `function` &&
          typeof a != `symbol` &&
          typeof a != `boolean` &&
          (e.type = a),
        t != null || n != null)
      ) {
        if (!((a !== `submit` && a !== `reset`) || t != null)) {
          Ft(e);
          return;
        }
        ((n = n == null ? `` : `` + Mt(n)),
          (t = t == null ? n : `` + Mt(t)),
          s || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((r ??= i),
        (r = typeof r != `function` && typeof r != `symbol` && !!r),
        (e.checked = s ? e.checked : !!r),
        (e.defaultChecked = !!r),
        o != null &&
          typeof o != `function` &&
          typeof o != `symbol` &&
          typeof o != `boolean` &&
          (e.name = o),
        Ft(e));
    }
    function Ht(e, t, n) {
      (t === `number` && Lt(e.ownerDocument) === e) ||
        e.defaultValue === `` + n ||
        (e.defaultValue = `` + n);
    }
    function Ut(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty(`$` + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0));
      } else {
        for (n = `` + Mt(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Wt(e, t, n) {
      if (t != null && ((t = `` + Mt(t)), t !== e.value && (e.value = t), n == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = n == null ? `` : `` + Mt(n);
    }
    function Gt(e, t, n, r) {
      if (t == null) {
        if (r != null) {
          if (n != null) throw Error(a(92));
          if (re(r)) {
            if (1 < r.length) throw Error(a(93));
            r = r[0];
          }
          n = r;
        }
        ((n ??= ``), (t = n));
      }
      ((n = Mt(t)),
        (e.defaultValue = n),
        (r = e.textContent),
        r === n && r !== `` && r !== null && (e.value = r),
        Ft(e));
    }
    function Kt(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var qt = new Set(
      `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
        ` `
      )
    );
    function Jt(e, t, n) {
      var r = t.indexOf(`--`) === 0;
      n == null || typeof n == `boolean` || n === ``
        ? r
          ? e.setProperty(t, ``)
          : t === `float`
            ? (e.cssFloat = ``)
            : (e[t] = ``)
        : r
          ? e.setProperty(t, n)
          : typeof n != `number` || n === 0 || qt.has(t)
            ? t === `float`
              ? (e.cssFloat = n)
              : (e[t] = (`` + n).trim())
            : (e[t] = n + `px`);
    }
    function Yt(e, t, n) {
      if (t != null && typeof t != `object`) throw Error(a(62));
      if (((e = e.style), n != null)) {
        for (var r in n)
          !n.hasOwnProperty(r) ||
            (t != null && t.hasOwnProperty(r)) ||
            (r.indexOf(`--`) === 0
              ? e.setProperty(r, ``)
              : r === `float`
                ? (e.cssFloat = ``)
                : (e[r] = ``));
        for (var i in t) ((r = t[i]), t.hasOwnProperty(i) && n[i] !== r && Jt(e, i, r));
      } else for (var o in t) t.hasOwnProperty(o) && Jt(e, o, t[o]);
    }
    function Xt(e) {
      if (e.indexOf(`-`) === -1) return !1;
      switch (e) {
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          return !1;
        default:
          return !0;
      }
    }
    var Zt = new Map([
        [`acceptCharset`, `accept-charset`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
        [`crossOrigin`, `crossorigin`],
        [`accentHeight`, `accent-height`],
        [`alignmentBaseline`, `alignment-baseline`],
        [`arabicForm`, `arabic-form`],
        [`baselineShift`, `baseline-shift`],
        [`capHeight`, `cap-height`],
        [`clipPath`, `clip-path`],
        [`clipRule`, `clip-rule`],
        [`colorInterpolation`, `color-interpolation`],
        [`colorInterpolationFilters`, `color-interpolation-filters`],
        [`colorProfile`, `color-profile`],
        [`colorRendering`, `color-rendering`],
        [`dominantBaseline`, `dominant-baseline`],
        [`enableBackground`, `enable-background`],
        [`fillOpacity`, `fill-opacity`],
        [`fillRule`, `fill-rule`],
        [`floodColor`, `flood-color`],
        [`floodOpacity`, `flood-opacity`],
        [`fontFamily`, `font-family`],
        [`fontSize`, `font-size`],
        [`fontSizeAdjust`, `font-size-adjust`],
        [`fontStretch`, `font-stretch`],
        [`fontStyle`, `font-style`],
        [`fontVariant`, `font-variant`],
        [`fontWeight`, `font-weight`],
        [`glyphName`, `glyph-name`],
        [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
        [`glyphOrientationVertical`, `glyph-orientation-vertical`],
        [`horizAdvX`, `horiz-adv-x`],
        [`horizOriginX`, `horiz-origin-x`],
        [`imageRendering`, `image-rendering`],
        [`letterSpacing`, `letter-spacing`],
        [`lightingColor`, `lighting-color`],
        [`markerEnd`, `marker-end`],
        [`markerMid`, `marker-mid`],
        [`markerStart`, `marker-start`],
        [`overlinePosition`, `overline-position`],
        [`overlineThickness`, `overline-thickness`],
        [`paintOrder`, `paint-order`],
        [`panose-1`, `panose-1`],
        [`pointerEvents`, `pointer-events`],
        [`renderingIntent`, `rendering-intent`],
        [`shapeRendering`, `shape-rendering`],
        [`stopColor`, `stop-color`],
        [`stopOpacity`, `stop-opacity`],
        [`strikethroughPosition`, `strikethrough-position`],
        [`strikethroughThickness`, `strikethrough-thickness`],
        [`strokeDasharray`, `stroke-dasharray`],
        [`strokeDashoffset`, `stroke-dashoffset`],
        [`strokeLinecap`, `stroke-linecap`],
        [`strokeLinejoin`, `stroke-linejoin`],
        [`strokeMiterlimit`, `stroke-miterlimit`],
        [`strokeOpacity`, `stroke-opacity`],
        [`strokeWidth`, `stroke-width`],
        [`textAnchor`, `text-anchor`],
        [`textDecoration`, `text-decoration`],
        [`textRendering`, `text-rendering`],
        [`transformOrigin`, `transform-origin`],
        [`underlinePosition`, `underline-position`],
        [`underlineThickness`, `underline-thickness`],
        [`unicodeBidi`, `unicode-bidi`],
        [`unicodeRange`, `unicode-range`],
        [`unitsPerEm`, `units-per-em`],
        [`vAlphabetic`, `v-alphabetic`],
        [`vHanging`, `v-hanging`],
        [`vIdeographic`, `v-ideographic`],
        [`vMathematical`, `v-mathematical`],
        [`vectorEffect`, `vector-effect`],
        [`vertAdvY`, `vert-adv-y`],
        [`vertOriginX`, `vert-origin-x`],
        [`vertOriginY`, `vert-origin-y`],
        [`wordSpacing`, `word-spacing`],
        [`writingMode`, `writing-mode`],
        [`xmlnsXlink`, `xmlns:xlink`],
        [`xHeight`, `x-height`],
      ]),
      Qt =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function $t(e) {
      return Qt.test(`` + e)
        ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`
        : e;
    }
    function en() {}
    var tn = null;
    function nn(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var rn = null,
      an = null;
    function on(e) {
      var t = _t(e);
      if (t && (e = t.stateNode)) {
        var n = e[ct] || null;
        a: switch (((e = t.stateNode), t.type)) {
          case `input`:
            if (
              (Bt(
                e,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name
              ),
              (t = n.name),
              n.type === `radio` && t != null)
            ) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(`input[name="` + zt(`` + t) + `"][type="radio"]`), t = 0;
                t < n.length;
                t++
              ) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                  var i = r[ct] || null;
                  if (!i) throw Error(a(90));
                  Bt(
                    r,
                    i.value,
                    i.defaultValue,
                    i.defaultValue,
                    i.checked,
                    i.defaultChecked,
                    i.type,
                    i.name
                  );
                }
              }
              for (t = 0; t < n.length; t++) ((r = n[t]), r.form === e.form && It(r));
            }
            break a;
          case `textarea`:
            Wt(e, n.value, n.defaultValue);
            break a;
          case `select`:
            ((t = n.value), t != null && Ut(e, !!n.multiple, t, !1));
        }
      }
    }
    var sn = !1;
    function cn(e, t, n) {
      if (sn) return e(t, n);
      sn = !0;
      try {
        return e(t);
      } finally {
        if (
          ((sn = !1),
          (rn !== null || an !== null) &&
            (yu(), rn && ((t = rn), (e = an), (an = rn = null), on(t), e)))
        )
          for (t = 0; t < e.length; t++) on(e[t]);
      }
    }
    function ln(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = n[ct] || null;
      if (r === null) return null;
      n = r[t];
      a: switch (t) {
        case `onClick`:
        case `onClickCapture`:
        case `onDoubleClick`:
        case `onDoubleClickCapture`:
        case `onMouseDown`:
        case `onMouseDownCapture`:
        case `onMouseMove`:
        case `onMouseMoveCapture`:
        case `onMouseUp`:
        case `onMouseUpCapture`:
        case `onMouseEnter`:
          ((r = !r.disabled) ||
            ((e = e.type),
            (r = !(e === `button` || e === `input` || e === `select` || e === `textarea`))),
            (e = !r));
          break a;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != `function`) throw Error(a(231, t, typeof n));
      return n;
    }
    var un = !(
        typeof window > `u` ||
        window.document === void 0 ||
        window.document.createElement === void 0
      ),
      dn = !1;
    if (un)
      try {
        var fn = {};
        (Object.defineProperty(fn, `passive`, {
          get: function () {
            dn = !0;
          },
        }),
          window.addEventListener(`test`, fn, fn),
          window.removeEventListener(`test`, fn, fn));
      } catch {
        dn = !1;
      }
    var pn = null,
      mn = null,
      hn = null;
    function gn() {
      if (hn) return hn;
      var e,
        t = mn,
        n = t.length,
        r,
        i = `value` in pn ? pn.value : pn.textContent,
        a = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e;
      for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
      return (hn = i.slice(e, 1 < r ? 1 - r : void 0));
    }
    function _n(e) {
      var t = e.keyCode;
      return (
        `charCode` in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function vn() {
      return !0;
    }
    function yn() {
      return !1;
    }
    function bn(e) {
      function t(t, n, r, i, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented
          )
            ? vn
            : yn),
          (this.isPropagationStopped = yn),
          this
        );
      }
      return (
        h(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != `unknown` && (e.returnValue = !1),
              (this.isDefaultPrevented = vn));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
              (this.isPropagationStopped = vn));
          },
          persist: function () {},
          isPersistent: vn,
        }),
        t
      );
    }
    var xn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Sn = bn(xn),
      Cn = h({}, xn, { view: 0, detail: 0 }),
      wn = bn(Cn),
      Tn,
      En,
      Dn,
      On = h({}, Cn, {
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
        getModifierState: zn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return `movementX` in e
            ? e.movementX
            : (e !== Dn &&
                (Dn && e.type === `mousemove`
                  ? ((Tn = e.screenX - Dn.screenX), (En = e.screenY - Dn.screenY))
                  : (En = Tn = 0),
                (Dn = e)),
              Tn);
        },
        movementY: function (e) {
          return `movementY` in e ? e.movementY : En;
        },
      }),
      kn = bn(On),
      An = bn(h({}, On, { dataTransfer: 0 })),
      jn = bn(h({}, Cn, { relatedTarget: 0 })),
      Mn = bn(h({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
      Nn = bn(
        h({}, xn, {
          clipboardData: function (e) {
            return `clipboardData` in e ? e.clipboardData : window.clipboardData;
          },
        })
      ),
      Pn = bn(h({}, xn, { data: 0 })),
      Fn = {
        Esc: `Escape`,
        Spacebar: ` `,
        Left: `ArrowLeft`,
        Up: `ArrowUp`,
        Right: `ArrowRight`,
        Down: `ArrowDown`,
        Del: `Delete`,
        Win: `OS`,
        Menu: `ContextMenu`,
        Apps: `ContextMenu`,
        Scroll: `ScrollLock`,
        MozPrintableKey: `Unidentified`,
      },
      In = {
        8: `Backspace`,
        9: `Tab`,
        12: `Clear`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        19: `Pause`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        45: `Insert`,
        46: `Delete`,
        112: `F1`,
        113: `F2`,
        114: `F3`,
        115: `F4`,
        116: `F5`,
        117: `F6`,
        118: `F7`,
        119: `F8`,
        120: `F9`,
        121: `F10`,
        122: `F11`,
        123: `F12`,
        144: `NumLock`,
        145: `ScrollLock`,
        224: `Meta`,
      },
      Ln = { Alt: `altKey`, Control: `ctrlKey`, Meta: `metaKey`, Shift: `shiftKey` };
    function Rn(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Ln[e]) ? !!t[e] : !1;
    }
    function zn() {
      return Rn;
    }
    var Bn = bn(
        h({}, Cn, {
          key: function (e) {
            if (e.key) {
              var t = Fn[e.key] || e.key;
              if (t !== `Unidentified`) return t;
            }
            return e.type === `keypress`
              ? ((e = _n(e)), e === 13 ? `Enter` : String.fromCharCode(e))
              : e.type === `keydown` || e.type === `keyup`
                ? In[e.keyCode] || `Unidentified`
                : ``;
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: zn,
          charCode: function (e) {
            return e.type === `keypress` ? _n(e) : 0;
          },
          keyCode: function (e) {
            return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
          },
          which: function (e) {
            return e.type === `keypress`
              ? _n(e)
              : e.type === `keydown` || e.type === `keyup`
                ? e.keyCode
                : 0;
          },
        })
      ),
      Vn = bn(
        h({}, On, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        })
      ),
      Hn = bn(
        h({}, Cn, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: zn,
        })
      ),
      Un = bn(h({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
      Wn = bn(
        h({}, On, {
          deltaX: function (e) {
            return `deltaX` in e ? e.deltaX : `wheelDeltaX` in e ? -e.wheelDeltaX : 0;
          },
          deltaY: function (e) {
            return `deltaY` in e
              ? e.deltaY
              : `wheelDeltaY` in e
                ? -e.wheelDeltaY
                : `wheelDelta` in e
                  ? -e.wheelDelta
                  : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        })
      ),
      Gn = bn(h({}, xn, { newState: 0, oldState: 0 })),
      Kn = [9, 13, 27, 32],
      qn = un && `CompositionEvent` in window,
      Jn = null;
    un && `documentMode` in document && (Jn = document.documentMode);
    var Yn = un && `TextEvent` in window && !Jn,
      Xn = un && (!qn || (Jn && 8 < Jn && 11 >= Jn)),
      Zn = ` `,
      Qn = !1;
    function $n(e, t) {
      switch (e) {
        case `keyup`:
          return Kn.indexOf(t.keyCode) !== -1;
        case `keydown`:
          return t.keyCode !== 229;
        case `keypress`:
        case `mousedown`:
        case `focusout`:
          return !0;
        default:
          return !1;
      }
    }
    function er(e) {
      return ((e = e.detail), typeof e == `object` && `data` in e ? e.data : null);
    }
    var tr = !1;
    function nr(e, t) {
      switch (e) {
        case `compositionend`:
          return er(t);
        case `keypress`:
          return t.which === 32 ? ((Qn = !0), Zn) : null;
        case `textInput`:
          return ((e = t.data), e === Zn && Qn ? null : e);
        default:
          return null;
      }
    }
    function rr(e, t) {
      if (tr)
        return e === `compositionend` || (!qn && $n(e, t))
          ? ((e = gn()), (hn = mn = pn = null), (tr = !1), e)
          : null;
      switch (e) {
        case `paste`:
          return null;
        case `keypress`:
          if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case `compositionend`:
          return Xn && t.locale !== `ko` ? null : t.data;
        default:
          return null;
      }
    }
    var ir = {
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
      week: !0,
    };
    function ar(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === `input` ? !!ir[e.type] : t === `textarea`;
    }
    function or(e, t, n, r) {
      (rn ? (an ? an.push(r) : (an = [r])) : (rn = r),
        (t = Td(t, `onChange`)),
        0 < t.length &&
          ((n = new Sn(`onChange`, `change`, null, n, r)), e.push({ event: n, listeners: t })));
    }
    var sr = null,
      cr = null;
    function lr(e) {
      vd(e, 0);
    }
    function ur(e) {
      if (It(vt(e))) return e;
    }
    function dr(e, t) {
      if (e === `change`) return t;
    }
    var fr = !1;
    if (un) {
      var pr;
      if (un) {
        var mr = `oninput` in document;
        if (!mr) {
          var hr = document.createElement(`div`);
          (hr.setAttribute(`oninput`, `return;`), (mr = typeof hr.oninput == `function`));
        }
        pr = mr;
      } else pr = !1;
      fr = pr && (!document.documentMode || 9 < document.documentMode);
    }
    function gr() {
      sr && (sr.detachEvent(`onpropertychange`, _r), (cr = sr = null));
    }
    function _r(e) {
      if (e.propertyName === `value` && ur(cr)) {
        var t = [];
        (or(t, cr, e, nn(e)), cn(lr, t));
      }
    }
    function vr(e, t, n) {
      e === `focusin`
        ? (gr(), (sr = t), (cr = n), sr.attachEvent(`onpropertychange`, _r))
        : e === `focusout` && gr();
    }
    function yr(e) {
      if (e === `selectionchange` || e === `keyup` || e === `keydown`) return ur(cr);
    }
    function br(e, t) {
      if (e === `click`) return ur(t);
    }
    function xr(e, t) {
      if (e === `input` || e === `change`) return ur(t);
    }
    function Sr(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var Cr = typeof Object.is == `function` ? Object.is : Sr;
    function wr(e, t) {
      if (Cr(e, t)) return !0;
      if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!xe.call(t, i) || !Cr(e[i], t[i])) return !1;
      }
      return !0;
    }
    function Tr(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Er(e, t) {
      var n = Tr(e);
      e = 0;
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
          e = r;
        }
        a: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break a;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Tr(n);
      }
    }
    function Dr(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? Dr(e, t.parentNode)
              : `contains` in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Or(e) {
      e =
        e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
          ? e.ownerDocument.defaultView
          : window;
      for (var t = Lt(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == `string`;
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Lt(e.document);
      }
      return t;
    }
    function kr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === `input` &&
          (e.type === `text` ||
            e.type === `search` ||
            e.type === `tel` ||
            e.type === `url` ||
            e.type === `password`)) ||
          t === `textarea` ||
          e.contentEditable === `true`)
      );
    }
    var Ar = un && `documentMode` in document && 11 >= document.documentMode,
      jr = null,
      Mr = null,
      Nr = null,
      Pr = !1;
    function Fr(e, t, n) {
      var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Pr ||
        jr == null ||
        jr !== Lt(r) ||
        ((r = jr),
        `selectionStart` in r && kr(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (Nr && wr(Nr, r)) ||
          ((Nr = r),
          (r = Td(Mr, `onSelect`)),
          0 < r.length &&
            ((t = new Sn(`onSelect`, `select`, null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = jr))));
    }
    function Ir(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n[`Webkit` + e] = `webkit` + t),
        (n[`Moz` + e] = `moz` + t),
        n
      );
    }
    var Lr = {
        animationend: Ir(`Animation`, `AnimationEnd`),
        animationiteration: Ir(`Animation`, `AnimationIteration`),
        animationstart: Ir(`Animation`, `AnimationStart`),
        transitionrun: Ir(`Transition`, `TransitionRun`),
        transitionstart: Ir(`Transition`, `TransitionStart`),
        transitioncancel: Ir(`Transition`, `TransitionCancel`),
        transitionend: Ir(`Transition`, `TransitionEnd`),
      },
      Rr = {},
      zr = {};
    un &&
      ((zr = document.createElement(`div`).style),
      `AnimationEvent` in window ||
        (delete Lr.animationend.animation,
        delete Lr.animationiteration.animation,
        delete Lr.animationstart.animation),
      `TransitionEvent` in window || delete Lr.transitionend.transition);
    function Br(e) {
      if (Rr[e]) return Rr[e];
      if (!Lr[e]) return e;
      var t = Lr[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in zr) return (Rr[e] = t[n]);
      return e;
    }
    var Vr = Br(`animationend`),
      Hr = Br(`animationiteration`),
      Ur = Br(`animationstart`),
      Wr = Br(`transitionrun`),
      Gr = Br(`transitionstart`),
      Kr = Br(`transitioncancel`),
      qr = Br(`transitionend`),
      Jr = new Map(),
      Yr =
        `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
          ` `
        );
    Yr.push(`scrollEnd`);
    function Xr(e, t) {
      (Jr.set(e, t), Ct(t, [e]));
    }
    var Zr =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (typeof process == `object` && typeof process.emit == `function`) {
                process.emit(`uncaughtException`, e);
                return;
              }
              console.error(e);
            },
      Qr = [],
      $r = 0,
      ei = 0;
    function ti() {
      for (var e = $r, t = (ei = $r = 0); t < e; ) {
        var n = Qr[t];
        Qr[t++] = null;
        var r = Qr[t];
        Qr[t++] = null;
        var i = Qr[t];
        Qr[t++] = null;
        var a = Qr[t];
        if (((Qr[t++] = null), r !== null && i !== null)) {
          var o = r.pending;
          (o === null ? (i.next = i) : ((i.next = o.next), (o.next = i)), (r.pending = i));
        }
        a !== 0 && ai(n, i, a);
      }
    }
    function ni(e, t, n, r) {
      ((Qr[$r++] = e),
        (Qr[$r++] = t),
        (Qr[$r++] = n),
        (Qr[$r++] = r),
        (ei |= r),
        (e.lanes |= r),
        (e = e.alternate),
        e !== null && (e.lanes |= r));
    }
    function ri(e, t, n, r) {
      return (ni(e, t, n, r), oi(e));
    }
    function ii(e, t) {
      return (ni(e, null, null, t), oi(e));
    }
    function ai(e, t, n) {
      e.lanes |= n;
      var r = e.alternate;
      r !== null && (r.lanes |= n);
      for (var i = !1, a = e.return; a !== null; )
        ((a.childLanes |= n),
          (r = a.alternate),
          r !== null && (r.childLanes |= n),
          a.tag === 22 && ((e = a.stateNode), e === null || e._visibility & 1 || (i = !0)),
          (e = a),
          (a = a.return));
      return e.tag === 3
        ? ((a = e.stateNode),
          i &&
            t !== null &&
            ((i = 31 - Re(n)),
            (e = a.hiddenUpdates),
            (r = e[i]),
            r === null ? (e[i] = [t]) : r.push(t),
            (t.lane = n | 536870912)),
          a)
        : null;
    }
    function oi(e) {
      if (50 < uu) throw ((uu = 0), (du = null), Error(a(185)));
      for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
      return e.tag === 3 ? e.stateNode : null;
    }
    var si = {};
    function ci(e, t, n, r) {
      ((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function li(e, t, n, r) {
      return new ci(e, t, n, r);
    }
    function ui(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function di(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = li(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 65011712),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        (n.refCleanup = e.refCleanup),
        n
      );
    }
    function fi(e, t) {
      e.flags &= 65011714;
      var n = e.alternate;
      return (
        n === null
          ? ((e.childLanes = 0),
            (e.lanes = t),
            (e.child = null),
            (e.subtreeFlags = 0),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.dependencies = null),
            (e.stateNode = null))
          : ((e.childLanes = n.childLanes),
            (e.lanes = n.lanes),
            (e.child = n.child),
            (e.subtreeFlags = 0),
            (e.deletions = null),
            (e.memoizedProps = n.memoizedProps),
            (e.memoizedState = n.memoizedState),
            (e.updateQueue = n.updateQueue),
            (e.type = n.type),
            (t = n.dependencies),
            (e.dependencies =
              t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
        e
      );
    }
    function pi(e, t, n, r, i, o) {
      var s = 0;
      if (((r = e), typeof e == `function`)) ui(e) && (s = 1);
      else if (typeof e == `string`)
        s = Uf(e, n, oe.current) ? 26 : e === `html` || e === `head` || e === `body` ? 27 : 5;
      else
        a: switch (e) {
          case te:
            return ((e = li(31, n, t, i)), (e.elementType = te), (e.lanes = o), e);
          case y:
            return mi(n.children, i, o, t);
          case b:
            ((s = 8), (i |= 24));
            break;
          case x:
            return ((e = li(12, n, t, i | 2)), (e.elementType = x), (e.lanes = o), e);
          case T:
            return ((e = li(13, n, t, i)), (e.elementType = T), (e.lanes = o), e);
          case E:
            return ((e = li(19, n, t, i)), (e.elementType = E), (e.lanes = o), e);
          default:
            if (typeof e == `object` && e)
              switch (e.$$typeof) {
                case C:
                  s = 10;
                  break a;
                case S:
                  s = 9;
                  break a;
                case w:
                  s = 11;
                  break a;
                case ee:
                  s = 14;
                  break a;
                case D:
                  ((s = 16), (r = null));
                  break a;
              }
            ((s = 29), (n = Error(a(130, e === null ? `null` : typeof e, ``))), (r = null));
        }
      return ((t = li(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t);
    }
    function mi(e, t, n, r) {
      return ((e = li(7, e, r, t)), (e.lanes = n), e);
    }
    function hi(e, t, n) {
      return ((e = li(6, e, null, t)), (e.lanes = n), e);
    }
    function gi(e) {
      var t = li(18, null, null, 0);
      return ((t.stateNode = e), t);
    }
    function _i(e, t, n) {
      return (
        (t = li(4, e.children === null ? [] : e.children, e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    var vi = new WeakMap();
    function yi(e, t) {
      if (typeof e == `object` && e) {
        var n = vi.get(e);
        return n === void 0 ? ((t = { value: e, source: t, stack: be(t) }), vi.set(e, t), t) : n;
      }
      return { value: e, source: t, stack: be(t) };
    }
    var bi = [],
      xi = 0,
      Si = null,
      Ci = 0,
      wi = [],
      Ti = 0,
      Ei = null,
      Di = 1,
      Oi = ``;
    function ki(e, t) {
      ((bi[xi++] = Ci), (bi[xi++] = Si), (Si = e), (Ci = t));
    }
    function Ai(e, t, n) {
      ((wi[Ti++] = Di), (wi[Ti++] = Oi), (wi[Ti++] = Ei), (Ei = e));
      var r = Di;
      e = Oi;
      var i = 32 - Re(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - Re(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        ((a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          (Di = (1 << (32 - Re(t) + i)) | (n << i) | r),
          (Oi = a + e));
      } else ((Di = (1 << a) | (n << i) | r), (Oi = e));
    }
    function ji(e) {
      e.return !== null && (ki(e, 1), Ai(e, 1, 0));
    }
    function Mi(e) {
      for (; e === Si; ) ((Si = bi[--xi]), (bi[xi] = null), (Ci = bi[--xi]), (bi[xi] = null));
      for (; e === Ei; )
        ((Ei = wi[--Ti]),
          (wi[Ti] = null),
          (Oi = wi[--Ti]),
          (wi[Ti] = null),
          (Di = wi[--Ti]),
          (wi[Ti] = null));
    }
    function Ni(e, t) {
      ((wi[Ti++] = Di), (wi[Ti++] = Oi), (wi[Ti++] = Ei), (Di = t.id), (Oi = t.overflow), (Ei = e));
    }
    var Pi = null,
      Fi = null,
      R = !1,
      Ii = null,
      Li = !1,
      Ri = Error(a(519));
    function zi(e) {
      throw (
        Gi(
          yi(
            Error(
              a(
                418,
                1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? `text` : `HTML`,
                ``
              )
            ),
            e
          )
        ),
        Ri
      );
    }
    function Bi(e) {
      var t = e.stateNode,
        n = e.type,
        r = e.memoizedProps;
      switch (((t[st] = e), (t[ct] = r), n)) {
        case `dialog`:
          ($(`cancel`, t), $(`close`, t));
          break;
        case `iframe`:
        case `object`:
        case `embed`:
          $(`load`, t);
          break;
        case `video`:
        case `audio`:
          for (n = 0; n < gd.length; n++) $(gd[n], t);
          break;
        case `source`:
          $(`error`, t);
          break;
        case `img`:
        case `image`:
        case `link`:
          ($(`error`, t), $(`load`, t));
          break;
        case `details`:
          $(`toggle`, t);
          break;
        case `input`:
          ($(`invalid`, t),
            Vt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0));
          break;
        case `select`:
          $(`invalid`, t);
          break;
        case `textarea`:
          ($(`invalid`, t), Gt(t, r.value, r.defaultValue, r.children));
      }
      ((n = r.children),
        (typeof n != `string` && typeof n != `number` && typeof n != `bigint`) ||
        t.textContent === `` + n ||
        !0 === r.suppressHydrationWarning ||
        jd(t.textContent, n)
          ? (r.popover != null && ($(`beforetoggle`, t), $(`toggle`, t)),
            r.onScroll != null && $(`scroll`, t),
            r.onScrollEnd != null && $(`scrollend`, t),
            r.onClick != null && (t.onclick = en),
            (t = !0))
          : (t = !1),
        t || zi(e, !0));
    }
    function Vi(e) {
      for (Pi = e.return; Pi; )
        switch (Pi.tag) {
          case 5:
          case 31:
          case 13:
            Li = !1;
            return;
          case 27:
          case 3:
            Li = !0;
            return;
          default:
            Pi = Pi.return;
        }
    }
    function Hi(e) {
      if (e !== Pi) return !1;
      if (!R) return (Vi(e), (R = !0), !1);
      var t = e.tag,
        n;
      if (
        ((n = t !== 3 && t !== 27) &&
          ((n = t === 5) &&
            ((n = e.type), (n = !(n !== `form` && n !== `button`) || Ud(e.type, e.memoizedProps))),
          (n = !n)),
        n && Fi && zi(e),
        Vi(e),
        t === 13)
      ) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(a(317));
        Fi = uf(e);
      } else if (t === 31) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(a(317));
        Fi = uf(e);
      } else
        t === 27
          ? ((t = Fi), Zd(e.type) ? ((e = lf), (lf = null), (Fi = e)) : (Fi = t))
          : (Fi = Pi ? cf(e.stateNode.nextSibling) : null);
      return !0;
    }
    function Ui() {
      ((Fi = Pi = null), (R = !1));
    }
    function Wi() {
      var e = Ii;
      return (e !== null && (Xl === null ? (Xl = e) : Xl.push.apply(Xl, e), (Ii = null)), e);
    }
    function Gi(e) {
      Ii === null ? (Ii = [e]) : Ii.push(e);
    }
    var Ki = ae(null),
      qi = null,
      Ji = null;
    function Yi(e, t, n) {
      (L(Ki, t._currentValue), (t._currentValue = n));
    }
    function z(e) {
      ((e._currentValue = Ki.current), I(Ki));
    }
    function Xi(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) === t
            ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
            : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function Zi(e, t, n, r) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var o = i.dependencies;
        if (o !== null) {
          var s = i.child;
          o = o.firstContext;
          a: for (; o !== null; ) {
            var c = o;
            o = i;
            for (var l = 0; l < t.length; l++)
              if (c.context === t[l]) {
                ((o.lanes |= n),
                  (c = o.alternate),
                  c !== null && (c.lanes |= n),
                  Xi(o.return, n, e),
                  r || (s = null));
                break a;
              }
            o = c.next;
          }
        } else if (i.tag === 18) {
          if (((s = i.return), s === null)) throw Error(a(341));
          ((s.lanes |= n),
            (o = s.alternate),
            o !== null && (o.lanes |= n),
            Xi(s, n, e),
            (s = null));
        } else s = i.child;
        if (s !== null) s.return = i;
        else
          for (s = i; s !== null; ) {
            if (s === e) {
              s = null;
              break;
            }
            if (((i = s.sibling), i !== null)) {
              ((i.return = s.return), (s = i));
              break;
            }
            s = s.return;
          }
        i = s;
      }
    }
    function Qi(e, t, n, r) {
      e = null;
      for (var i = t, o = !1; i !== null; ) {
        if (!o) {
          if (i.flags & 524288) o = !0;
          else if (i.flags & 262144) break;
        }
        if (i.tag === 10) {
          var s = i.alternate;
          if (s === null) throw Error(a(387));
          if (((s = s.memoizedProps), s !== null)) {
            var c = i.type;
            Cr(i.pendingProps.value, s.value) || (e === null ? (e = [c]) : e.push(c));
          }
        } else if (i === le.current) {
          if (((s = i.alternate), s === null)) throw Error(a(387));
          s.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
            (e === null ? (e = [Qf]) : e.push(Qf));
        }
        i = i.return;
      }
      (e !== null && Zi(t, e, n, r), (t.flags |= 262144));
    }
    function $i(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!Cr(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function ea(e) {
      ((qi = e), (Ji = null), (e = e.dependencies), e !== null && (e.firstContext = null));
    }
    function ta(e) {
      return ra(qi, e);
    }
    function na(e, t) {
      return (qi === null && ea(e), ra(e, t));
    }
    function ra(e, t) {
      var n = t._currentValue;
      if (((t = { context: t, memoizedValue: n, next: null }), Ji === null)) {
        if (e === null) throw Error(a(308));
        ((Ji = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
      } else Ji = Ji.next = t;
      return n;
    }
    var ia =
        typeof AbortController < `u`
          ? AbortController
          : function () {
              var e = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (t, n) {
                    e.push(n);
                  },
                });
              this.abort = function () {
                ((t.aborted = !0),
                  e.forEach(function (e) {
                    return e();
                  }));
              };
            },
      aa = t.unstable_scheduleCallback,
      oa = t.unstable_NormalPriority,
      sa = {
        $$typeof: C,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function ca() {
      return { controller: new ia(), data: new Map(), refCount: 0 };
    }
    function la(e) {
      (e.refCount--,
        e.refCount === 0 &&
          aa(oa, function () {
            e.controller.abort();
          }));
    }
    var ua = null,
      da = 0,
      fa = 0,
      pa = null;
    function ma(e, t) {
      if (ua === null) {
        var n = (ua = []);
        ((da = 0),
          (fa = ud()),
          (pa = {
            status: `pending`,
            value: void 0,
            then: function (e) {
              n.push(e);
            },
          }));
      }
      return (da++, t.then(ha, ha), t);
    }
    function ha() {
      if (--da === 0 && ua !== null) {
        pa !== null && (pa.status = `fulfilled`);
        var e = ua;
        ((ua = null), (fa = 0), (pa = null));
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function ga(e, t) {
      var n = [],
        r = {
          status: `pending`,
          value: null,
          reason: null,
          then: function (e) {
            n.push(e);
          },
        };
      return (
        e.then(
          function () {
            ((r.status = `fulfilled`), (r.value = t));
            for (var e = 0; e < n.length; e++) (0, n[e])(t);
          },
          function (e) {
            for (r.status = `rejected`, r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
          }
        ),
        r
      );
    }
    var _a = M.S;
    M.S = function (e, t) {
      (($l = Ee()),
        typeof t == `object` && t && typeof t.then == `function` && ma(e, t),
        _a !== null && _a(e, t));
    };
    var va = ae(null);
    function ya() {
      var e = va.current;
      return e === null ? Ll.pooledCache : e;
    }
    function ba(e, t) {
      t === null ? L(va, va.current) : L(va, t.pool);
    }
    function xa() {
      var e = ya();
      return e === null ? null : { parent: sa._currentValue, pool: e };
    }
    var Sa = Error(a(460)),
      Ca = Error(a(474)),
      wa = Error(a(542)),
      Ta = { then: function () {} };
    function Ea(e) {
      return ((e = e.status), e === `fulfilled` || e === `rejected`);
    }
    function Da(e, t, n) {
      switch (
        ((n = e[n]), n === void 0 ? e.push(t) : n !== t && (t.then(en, en), (t = n)), t.status)
      ) {
        case `fulfilled`:
          return t.value;
        case `rejected`:
          throw ((e = t.reason), ja(e), e);
        default:
          if (typeof t.status == `string`) t.then(en, en);
          else {
            if (((e = Ll), e !== null && 100 < e.shellSuspendCounter)) throw Error(a(482));
            ((e = t),
              (e.status = `pending`),
              e.then(
                function (e) {
                  if (t.status === `pending`) {
                    var n = t;
                    ((n.status = `fulfilled`), (n.value = e));
                  }
                },
                function (e) {
                  if (t.status === `pending`) {
                    var n = t;
                    ((n.status = `rejected`), (n.reason = e));
                  }
                }
              ));
          }
          switch (t.status) {
            case `fulfilled`:
              return t.value;
            case `rejected`:
              throw ((e = t.reason), ja(e), e);
          }
          throw ((ka = t), Sa);
      }
    }
    function Oa(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (e) {
        throw typeof e == `object` && e && typeof e.then == `function` ? ((ka = e), Sa) : e;
      }
    }
    var ka = null;
    function Aa() {
      if (ka === null) throw Error(a(459));
      var e = ka;
      return ((ka = null), e);
    }
    function ja(e) {
      if (e === Sa || e === wa) throw Error(a(483));
    }
    var Ma = null,
      Na = 0;
    function Pa(e) {
      var t = Na;
      return ((Na += 1), Ma === null && (Ma = []), Da(Ma, e, t));
    }
    function Fa(e, t) {
      ((t = t.props.ref), (e.ref = t === void 0 ? null : t));
    }
    function Ia(e, t) {
      throw t.$$typeof === g
        ? Error(a(525))
        : ((e = Object.prototype.toString.call(t)),
          Error(
            a(
              31,
              e === `[object Object]` ? `object with keys {` + Object.keys(t).join(`, `) + `}` : e
            )
          ));
    }
    function La(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; r !== null; ) (t(n, r), (r = r.sibling));
        return null;
      }
      function r(e) {
        for (var t = new Map(); e !== null; )
          (e.key === null ? t.set(e.index, e) : t.set(e.key, e), (e = e.sibling));
        return t;
      }
      function i(e, t) {
        return ((e = di(e, t)), (e.index = 0), (e.sibling = null), e);
      }
      function o(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              r === null
                ? ((t.flags |= 67108866), n)
                : ((r = r.index), r < n ? ((t.flags |= 67108866), n) : r))
            : ((t.flags |= 1048576), n)
        );
      }
      function s(t) {
        return (e && t.alternate === null && (t.flags |= 67108866), t);
      }
      function c(e, t, n, r) {
        return t === null || t.tag !== 6
          ? ((t = hi(n, e.mode, r)), (t.return = e), t)
          : ((t = i(t, n)), (t.return = e), t);
      }
      function l(e, t, n, r) {
        var a = n.type;
        return a === y
          ? d(e, t, n.props.children, r, n.key)
          : t !== null &&
              (t.elementType === a ||
                (typeof a == `object` && a && a.$$typeof === D && Oa(a) === t.type))
            ? ((t = i(t, n.props)), Fa(t, n), (t.return = e), t)
            : ((t = pi(n.type, n.key, n.props, null, e.mode, r)), Fa(t, n), (t.return = e), t);
      }
      function u(e, t, n, r) {
        return t === null ||
          t.tag !== 4 ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = _i(n, e.mode, r)), (t.return = e), t)
          : ((t = i(t, n.children || [])), (t.return = e), t);
      }
      function d(e, t, n, r, a) {
        return t === null || t.tag !== 7
          ? ((t = mi(n, e.mode, r, a)), (t.return = e), t)
          : ((t = i(t, n)), (t.return = e), t);
      }
      function f(e, t, n) {
        if ((typeof t == `string` && t !== ``) || typeof t == `number` || typeof t == `bigint`)
          return ((t = hi(`` + t, e.mode, n)), (t.return = e), t);
        if (typeof t == `object` && t) {
          switch (t.$$typeof) {
            case _:
              return (
                (n = pi(t.type, t.key, t.props, null, e.mode, n)),
                Fa(n, t),
                (n.return = e),
                n
              );
            case v:
              return ((t = _i(t, e.mode, n)), (t.return = e), t);
            case D:
              return ((t = Oa(t)), f(e, t, n));
          }
          if (re(t) || ne(t)) return ((t = mi(t, e.mode, n, null)), (t.return = e), t);
          if (typeof t.then == `function`) return f(e, Pa(t), n);
          if (t.$$typeof === C) return f(e, na(e, t), n);
          Ia(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var i = t === null ? null : t.key;
        if ((typeof n == `string` && n !== ``) || typeof n == `number` || typeof n == `bigint`)
          return i === null ? c(e, t, `` + n, r) : null;
        if (typeof n == `object` && n) {
          switch (n.$$typeof) {
            case _:
              return n.key === i ? l(e, t, n, r) : null;
            case v:
              return n.key === i ? u(e, t, n, r) : null;
            case D:
              return ((n = Oa(n)), p(e, t, n, r));
          }
          if (re(n) || ne(n)) return i === null ? d(e, t, n, r, null) : null;
          if (typeof n.then == `function`) return p(e, t, Pa(n), r);
          if (n.$$typeof === C) return p(e, t, na(e, n), r);
          Ia(e, n);
        }
        return null;
      }
      function m(e, t, n, r, i) {
        if ((typeof r == `string` && r !== ``) || typeof r == `number` || typeof r == `bigint`)
          return ((e = e.get(n) || null), c(t, e, `` + r, i));
        if (typeof r == `object` && r) {
          switch (r.$$typeof) {
            case _:
              return ((e = e.get(r.key === null ? n : r.key) || null), l(t, e, r, i));
            case v:
              return ((e = e.get(r.key === null ? n : r.key) || null), u(t, e, r, i));
            case D:
              return ((r = Oa(r)), m(e, t, n, r, i));
          }
          if (re(r) || ne(r)) return ((e = e.get(n) || null), d(t, e, r, i, null));
          if (typeof r.then == `function`) return m(e, t, n, Pa(r), i);
          if (r.$$typeof === C) return m(e, t, n, na(t, r), i);
          Ia(t, r);
        }
        return null;
      }
      function h(i, a, s, c) {
        for (
          var l = null, u = null, d = a, h = (a = 0), g = null;
          d !== null && h < s.length;
          h++
        ) {
          d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
          var _ = p(i, d, s[h], c);
          if (_ === null) {
            d === null && (d = g);
            break;
          }
          (e && d && _.alternate === null && t(i, d),
            (a = o(_, a, h)),
            u === null ? (l = _) : (u.sibling = _),
            (u = _),
            (d = g));
        }
        if (h === s.length) return (n(i, d), R && ki(i, h), l);
        if (d === null) {
          for (; h < s.length; h++)
            ((d = f(i, s[h], c)),
              d !== null && ((a = o(d, a, h)), u === null ? (l = d) : (u.sibling = d), (u = d)));
          return (R && ki(i, h), l);
        }
        for (d = r(d); h < s.length; h++)
          ((g = m(d, i, h, s[h], c)),
            g !== null &&
              (e && g.alternate !== null && d.delete(g.key === null ? h : g.key),
              (a = o(g, a, h)),
              u === null ? (l = g) : (u.sibling = g),
              (u = g)));
        return (
          e &&
            d.forEach(function (e) {
              return t(i, e);
            }),
          R && ki(i, h),
          l
        );
      }
      function g(i, s, c, l) {
        if (c == null) throw Error(a(151));
        for (
          var u = null, d = null, h = s, g = (s = 0), _ = null, v = c.next();
          h !== null && !v.done;
          g++, v = c.next()
        ) {
          h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
          var y = p(i, h, v.value, l);
          if (y === null) {
            h === null && (h = _);
            break;
          }
          (e && h && y.alternate === null && t(i, h),
            (s = o(y, s, g)),
            d === null ? (u = y) : (d.sibling = y),
            (d = y),
            (h = _));
        }
        if (v.done) return (n(i, h), R && ki(i, g), u);
        if (h === null) {
          for (; !v.done; g++, v = c.next())
            ((v = f(i, v.value, l)),
              v !== null && ((s = o(v, s, g)), d === null ? (u = v) : (d.sibling = v), (d = v)));
          return (R && ki(i, g), u);
        }
        for (h = r(h); !v.done; g++, v = c.next())
          ((v = m(h, i, g, v.value, l)),
            v !== null &&
              (e && v.alternate !== null && h.delete(v.key === null ? g : v.key),
              (s = o(v, s, g)),
              d === null ? (u = v) : (d.sibling = v),
              (d = v)));
        return (
          e &&
            h.forEach(function (e) {
              return t(i, e);
            }),
          R && ki(i, g),
          u
        );
      }
      function b(e, r, o, c) {
        if (
          (typeof o == `object` && o && o.type === y && o.key === null && (o = o.props.children),
          typeof o == `object` && o)
        ) {
          switch (o.$$typeof) {
            case _:
              a: {
                for (var l = o.key; r !== null; ) {
                  if (r.key === l) {
                    if (((l = o.type), l === y)) {
                      if (r.tag === 7) {
                        (n(e, r.sibling), (c = i(r, o.props.children)), (c.return = e), (e = c));
                        break a;
                      }
                    } else if (
                      r.elementType === l ||
                      (typeof l == `object` && l && l.$$typeof === D && Oa(l) === r.type)
                    ) {
                      (n(e, r.sibling), (c = i(r, o.props)), Fa(c, o), (c.return = e), (e = c));
                      break a;
                    }
                    n(e, r);
                    break;
                  } else t(e, r);
                  r = r.sibling;
                }
                o.type === y
                  ? ((c = mi(o.props.children, e.mode, c, o.key)), (c.return = e), (e = c))
                  : ((c = pi(o.type, o.key, o.props, null, e.mode, c)),
                    Fa(c, o),
                    (c.return = e),
                    (e = c));
              }
              return s(e);
            case v:
              a: {
                for (l = o.key; r !== null; ) {
                  if (r.key === l)
                    if (
                      r.tag === 4 &&
                      r.stateNode.containerInfo === o.containerInfo &&
                      r.stateNode.implementation === o.implementation
                    ) {
                      (n(e, r.sibling), (c = i(r, o.children || [])), (c.return = e), (e = c));
                      break a;
                    } else {
                      n(e, r);
                      break;
                    }
                  else t(e, r);
                  r = r.sibling;
                }
                ((c = _i(o, e.mode, c)), (c.return = e), (e = c));
              }
              return s(e);
            case D:
              return ((o = Oa(o)), b(e, r, o, c));
          }
          if (re(o)) return h(e, r, o, c);
          if (ne(o)) {
            if (((l = ne(o)), typeof l != `function`)) throw Error(a(150));
            return ((o = l.call(o)), g(e, r, o, c));
          }
          if (typeof o.then == `function`) return b(e, r, Pa(o), c);
          if (o.$$typeof === C) return b(e, r, na(e, o), c);
          Ia(e, o);
        }
        return (typeof o == `string` && o !== ``) || typeof o == `number` || typeof o == `bigint`
          ? ((o = `` + o),
            r !== null && r.tag === 6
              ? (n(e, r.sibling), (c = i(r, o)), (c.return = e), (e = c))
              : (n(e, r), (c = hi(o, e.mode, c)), (c.return = e), (e = c)),
            s(e))
          : n(e, r);
      }
      return function (e, t, n, r) {
        try {
          Na = 0;
          var i = b(e, t, n, r);
          return ((Ma = null), i);
        } catch (t) {
          if (t === Sa || t === wa) throw t;
          var a = li(29, t, null, e.mode);
          return ((a.lanes = r), (a.return = e), a);
        }
      };
    }
    var Ra = La(!0),
      za = La(!1),
      Ba = !1;
    function Va(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function Ha(e, t) {
      ((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null,
          }));
    }
    function Ua(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function Wa(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), J & 2)) {
        var i = r.pending;
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          (t = oi(e)),
          ai(e, null, n),
          t
        );
      }
      return (ni(e, r, t, n), oi(e));
    }
    function Ga(e, t, n) {
      if (((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194048))) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), et(e, n));
      }
    }
    function Ka(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          a = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null };
            (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
          } while (n !== null);
          a === null ? (i = a = t) : (a = a.next = t);
        } else i = a = t;
        ((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: a,
          shared: r.shared,
          callbacks: r.callbacks,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    var qa = !1;
    function Ja() {
      if (qa) {
        var e = pa;
        if (e !== null) throw e;
      }
    }
    function Ya(e, t, n, r) {
      qa = !1;
      var i = e.updateQueue;
      Ba = !1;
      var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending;
      if (s !== null) {
        i.shared.pending = null;
        var c = s,
          l = c.next;
        ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
        var u = e.alternate;
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== o && (s === null ? (u.firstBaseUpdate = l) : (s.next = l), (u.lastBaseUpdate = c)));
      }
      if (a !== null) {
        var d = i.baseState;
        ((o = 0), (u = l = c = null), (s = a));
        do {
          var f = s.lane & -536870913,
            p = f !== s.lane;
          if (p ? (X & f) === f : (r & f) === f) {
            (f !== 0 && f === fa && (qa = !0),
              u !== null &&
                (u = u.next =
                  { lane: 0, tag: s.tag, payload: s.payload, callback: null, next: null }));
            a: {
              var m = e,
                g = s;
              f = t;
              var _ = n;
              switch (g.tag) {
                case 1:
                  if (((m = g.payload), typeof m == `function`)) {
                    d = m.call(_, d, f);
                    break a;
                  }
                  d = m;
                  break a;
                case 3:
                  m.flags = (m.flags & -65537) | 128;
                case 0:
                  if (
                    ((m = g.payload), (f = typeof m == `function` ? m.call(_, d, f) : m), f == null)
                  )
                    break a;
                  d = h({}, d, f);
                  break a;
                case 2:
                  Ba = !0;
              }
            }
            ((f = s.callback),
              f !== null &&
                ((e.flags |= 64),
                p && (e.flags |= 8192),
                (p = i.callbacks),
                p === null ? (i.callbacks = [f]) : p.push(f)));
          } else
            ((p = { lane: f, tag: s.tag, payload: s.payload, callback: s.callback, next: null }),
              u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
              (o |= f));
          if (((s = s.next), s === null)) {
            if (((s = i.shared.pending), s === null)) break;
            ((p = s),
              (s = p.next),
              (p.next = null),
              (i.lastBaseUpdate = p),
              (i.shared.pending = null));
          }
        } while (1);
        (u === null && (c = d),
          (i.baseState = c),
          (i.firstBaseUpdate = l),
          (i.lastBaseUpdate = u),
          a === null && (i.shared.lanes = 0),
          (Wl |= o),
          (e.lanes = o),
          (e.memoizedState = d));
      }
    }
    function Xa(e, t) {
      if (typeof e != `function`) throw Error(a(191, e));
      e.call(t);
    }
    function Za(e, t) {
      var n = e.callbacks;
      if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Xa(n[e], t);
    }
    var Qa = ae(null),
      $a = ae(0);
    function eo(e, t) {
      ((e = Hl), L($a, e), L(Qa, t), (Hl = e | t.baseLanes));
    }
    function to() {
      (L($a, Hl), L(Qa, Qa.current));
    }
    function no() {
      ((Hl = $a.current), I(Qa), I($a));
    }
    var ro = ae(null),
      B = null;
    function io(e) {
      var t = e.alternate;
      (L(lo, lo.current & 1),
        L(ro, e),
        B === null && (t === null || Qa.current !== null || t.memoizedState !== null) && (B = e));
    }
    function ao(e) {
      (L(lo, lo.current), L(ro, e), B === null && (B = e));
    }
    function oo(e) {
      e.tag === 22 ? (L(lo, lo.current), L(ro, e), B === null && (B = e)) : so(e);
    }
    function so() {
      (L(lo, lo.current), L(ro, ro.current));
    }
    function co(e) {
      (I(ro), B === e && (B = null), I(lo));
    }
    var lo = ae(0);
    function uo(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && ((n = n.dehydrated), n === null || af(n) || of(n))) return t;
        } else if (
          t.tag === 19 &&
          (t.memoizedProps.revealOrder === `forwards` ||
            t.memoizedProps.revealOrder === `backwards` ||
            t.memoizedProps.revealOrder === `unstable_legacy-backwards` ||
            t.memoizedProps.revealOrder === `together`)
        ) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var fo = 0,
      V = null,
      H = null,
      po = null,
      mo = !1,
      ho = !1,
      go = !1,
      _o = 0,
      vo = 0,
      yo = null,
      bo = 0;
    function xo() {
      throw Error(a(321));
    }
    function So(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++) if (!Cr(e[n], t[n])) return !1;
      return !0;
    }
    function U(e, t, n, r, i, a) {
      return (
        (fo = a),
        (V = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (M.H = e === null || e.memoizedState === null ? Rs : zs),
        (go = !1),
        (a = n(r, i)),
        (go = !1),
        ho && (a = wo(t, n, r, i)),
        Co(e),
        a
      );
    }
    function Co(e) {
      M.H = Ls;
      var t = H !== null && H.next !== null;
      if (((fo = 0), (po = H = V = null), (mo = !1), (vo = 0), (yo = null), t)) throw Error(a(300));
      e === null || nc || ((e = e.dependencies), e !== null && $i(e) && (nc = !0));
    }
    function wo(e, t, n, r) {
      V = e;
      var i = 0;
      do {
        if ((ho && (yo = null), (vo = 0), (ho = !1), 25 <= i)) throw Error(a(301));
        if (((i += 1), (po = H = null), e.updateQueue != null)) {
          var o = e.updateQueue;
          ((o.lastEffect = null),
            (o.events = null),
            (o.stores = null),
            o.memoCache != null && (o.memoCache.index = 0));
        }
        ((M.H = Bs), (o = t(n, r)));
      } while (ho);
      return o;
    }
    function To() {
      var e = M.H,
        t = e.useState()[0];
      return (
        (t = typeof t.then == `function` ? jo(t) : t),
        (e = e.useState()[0]),
        (H === null ? null : H.memoizedState) !== e && (V.flags |= 1024),
        t
      );
    }
    function Eo() {
      var e = _o !== 0;
      return ((_o = 0), e);
    }
    function Do(e, t, n) {
      ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
    }
    function W(e) {
      if (mo) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          (t !== null && (t.pending = null), (e = e.next));
        }
        mo = !1;
      }
      ((fo = 0), (po = H = V = null), (ho = !1), (vo = _o = 0), (yo = null));
    }
    function Oo() {
      var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      return (po === null ? (V.memoizedState = po = e) : (po = po.next = e), po);
    }
    function ko() {
      if (H === null) {
        var e = V.alternate;
        e = e === null ? null : e.memoizedState;
      } else e = H.next;
      var t = po === null ? V.memoizedState : po.next;
      if (t !== null) ((po = t), (H = e));
      else {
        if (e === null) throw V.alternate === null ? Error(a(467)) : Error(a(310));
        ((H = e),
          (e = {
            memoizedState: H.memoizedState,
            baseState: H.baseState,
            baseQueue: H.baseQueue,
            queue: H.queue,
            next: null,
          }),
          po === null ? (V.memoizedState = po = e) : (po = po.next = e));
      }
      return po;
    }
    function Ao() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function jo(e) {
      var t = vo;
      return (
        (vo += 1),
        yo === null && (yo = []),
        (e = Da(yo, e, t)),
        (t = V),
        (po === null ? t.memoizedState : po.next) === null &&
          ((t = t.alternate), (M.H = t === null || t.memoizedState === null ? Rs : zs)),
        e
      );
    }
    function Mo(e) {
      if (typeof e == `object` && e) {
        if (typeof e.then == `function`) return jo(e);
        if (e.$$typeof === C) return ta(e);
      }
      throw Error(a(438, String(e)));
    }
    function No(e) {
      var t = null,
        n = V.updateQueue;
      if ((n !== null && (t = n.memoCache), t == null)) {
        var r = V.alternate;
        r !== null &&
          ((r = r.updateQueue),
          r !== null &&
            ((r = r.memoCache),
            r != null &&
              (t = {
                data: r.data.map(function (e) {
                  return e.slice();
                }),
                index: 0,
              })));
      }
      if (
        ((t ??= { data: [], index: 0 }),
        n === null && ((n = Ao()), (V.updateQueue = n)),
        (n.memoCache = t),
        (n = t.data[t.index]),
        n === void 0)
      )
        for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = O;
      return (t.index++, n);
    }
    function Po(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function Fo(e) {
      return Io(ko(), H, e);
    }
    function Io(e, t, n) {
      var r = e.queue;
      if (r === null) throw Error(a(311));
      r.lastRenderedReducer = n;
      var i = e.baseQueue,
        o = r.pending;
      if (o !== null) {
        if (i !== null) {
          var s = i.next;
          ((i.next = o.next), (o.next = s));
        }
        ((t.baseQueue = i = o), (r.pending = null));
      }
      if (((o = e.baseState), i === null)) e.memoizedState = o;
      else {
        t = i.next;
        var c = (s = null),
          l = null,
          u = t,
          d = !1;
        do {
          var f = u.lane & -536870913;
          if (f === u.lane ? (fo & f) === f : (X & f) === f) {
            var p = u.revertLane;
            if (p === 0)
              (l !== null &&
                (l = l.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null,
                  }),
                f === fa && (d = !0));
            else if ((fo & p) === p) {
              ((u = u.next), p === fa && (d = !0));
              continue;
            } else
              ((f = {
                lane: 0,
                revertLane: u.revertLane,
                gesture: null,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
                l === null ? ((c = l = f), (s = o)) : (l = l.next = f),
                (V.lanes |= p),
                (Wl |= p));
            ((f = u.action), go && n(o, f), (o = u.hasEagerState ? u.eagerState : n(o, f)));
          } else
            ((p = {
              lane: f,
              revertLane: u.revertLane,
              gesture: u.gesture,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
              l === null ? ((c = l = p), (s = o)) : (l = l.next = p),
              (V.lanes |= f),
              (Wl |= f));
          u = u.next;
        } while (u !== null && u !== t);
        if (
          (l === null ? (s = o) : (l.next = c),
          !Cr(o, e.memoizedState) && ((nc = !0), d && ((n = pa), n !== null)))
        )
          throw n;
        ((e.memoizedState = o), (e.baseState = s), (e.baseQueue = l), (r.lastRenderedState = o));
      }
      return (i === null && (r.lanes = 0), [e.memoizedState, r.dispatch]);
    }
    function Lo(e) {
      var t = ko(),
        n = t.queue;
      if (n === null) throw Error(a(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
      if (i !== null) {
        n.pending = null;
        var s = (i = i.next);
        do ((o = e(o, s.action)), (s = s.next));
        while (s !== i);
        (Cr(o, t.memoizedState) || (nc = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (n.lastRenderedState = o));
      }
      return [o, r];
    }
    function Ro(e, t, n) {
      var r = V,
        i = ko(),
        o = R;
      if (o) {
        if (n === void 0) throw Error(a(407));
        n = n();
      } else n = t();
      var s = !Cr((H || i).memoizedState, n);
      if (
        (s && ((i.memoizedState = n), (nc = !0)),
        (i = i.queue),
        ls(Vo.bind(null, r, i, e), [e]),
        i.getSnapshot !== t || s || (po !== null && po.memoizedState.tag & 1))
      ) {
        if (
          ((r.flags |= 2048),
          is(9, { destroy: void 0 }, Bo.bind(null, r, i, n, t), null),
          Ll === null)
        )
          throw Error(a(349));
        o || fo & 127 || zo(r, t, n);
      }
      return n;
    }
    function zo(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = V.updateQueue),
        t === null
          ? ((t = Ao()), (V.updateQueue = t), (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function Bo(e, t, n, r) {
      ((t.value = n), (t.getSnapshot = r), Ho(t) && Uo(e));
    }
    function Vo(e, t, n) {
      return n(function () {
        Ho(t) && Uo(e);
      });
    }
    function Ho(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Cr(e, n);
      } catch {
        return !0;
      }
    }
    function Uo(e) {
      var t = ii(e, 2);
      t !== null && mu(t, e, 2);
    }
    function Wo(e) {
      var t = Oo();
      if (typeof e == `function`) {
        var n = e;
        if (((e = n()), go)) {
          Le(!0);
          try {
            n();
          } finally {
            Le(!1);
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = e),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Po,
          lastRenderedState: e,
        }),
        t
      );
    }
    function Go(e, t, n, r) {
      return ((e.baseState = n), Io(e, H, typeof r == `function` ? r : Po));
    }
    function Ko(e, t, n, r, i) {
      if (Ps(e)) throw Error(a(485));
      if (((e = t.action), e !== null)) {
        var o = {
          payload: i,
          action: e,
          next: null,
          isTransition: !0,
          status: `pending`,
          value: null,
          reason: null,
          listeners: [],
          then: function (e) {
            o.listeners.push(e);
          },
        };
        (M.T === null ? (o.isTransition = !1) : n(!0),
          r(o),
          (n = t.pending),
          n === null
            ? ((o.next = t.pending = o), qo(t, o))
            : ((o.next = n.next), (t.pending = n.next = o)));
      }
    }
    function qo(e, t) {
      var n = t.action,
        r = t.payload,
        i = e.state;
      if (t.isTransition) {
        var a = M.T,
          o = {};
        M.T = o;
        try {
          var s = n(i, r),
            c = M.S;
          (c !== null && c(o, s), Jo(e, t, s));
        } catch (n) {
          Xo(e, t, n);
        } finally {
          (a !== null && o.types !== null && (a.types = o.types), (M.T = a));
        }
      } else
        try {
          ((a = n(i, r)), Jo(e, t, a));
        } catch (n) {
          Xo(e, t, n);
        }
    }
    function Jo(e, t, n) {
      typeof n == `object` && n && typeof n.then == `function`
        ? n.then(
            function (n) {
              Yo(e, t, n);
            },
            function (n) {
              return Xo(e, t, n);
            }
          )
        : Yo(e, t, n);
    }
    function Yo(e, t, n) {
      ((t.status = `fulfilled`),
        (t.value = n),
        Zo(t),
        (e.state = n),
        (t = e.pending),
        t !== null &&
          ((n = t.next), n === t ? (e.pending = null) : ((n = n.next), (t.next = n), qo(e, n))));
    }
    function Xo(e, t, n) {
      var r = e.pending;
      if (((e.pending = null), r !== null)) {
        r = r.next;
        do ((t.status = `rejected`), (t.reason = n), Zo(t), (t = t.next));
        while (t !== r);
      }
      e.action = null;
    }
    function Zo(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Qo(e, t) {
      return t;
    }
    function $o(e, t) {
      if (R) {
        var n = Ll.formState;
        if (n !== null) {
          a: {
            var r = V;
            if (R) {
              if (Fi) {
                b: {
                  for (var i = Fi, a = Li; i.nodeType !== 8; ) {
                    if (!a) {
                      i = null;
                      break b;
                    }
                    if (((i = cf(i.nextSibling)), i === null)) {
                      i = null;
                      break b;
                    }
                  }
                  ((a = i.data), (i = a === `F!` || a === `F` ? i : null));
                }
                if (i) {
                  ((Fi = cf(i.nextSibling)), (r = i.data === `F!`));
                  break a;
                }
              }
              zi(r);
            }
            r = !1;
          }
          r && (t = n[0]);
        }
      }
      return (
        (n = Oo()),
        (n.memoizedState = n.baseState = t),
        (r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Qo,
          lastRenderedState: t,
        }),
        (n.queue = r),
        (n = js.bind(null, V, r)),
        (r.dispatch = n),
        (r = Wo(!1)),
        (a = Ns.bind(null, V, !1, r.queue)),
        (r = Oo()),
        (i = { state: t, dispatch: null, action: e, pending: null }),
        (r.queue = i),
        (n = Ko.bind(null, V, i, a, n)),
        (i.dispatch = n),
        (r.memoizedState = e),
        [t, n, !1]
      );
    }
    function es(e) {
      return ts(ko(), H, e);
    }
    function ts(e, t, n) {
      if (
        ((t = Io(e, t, Qo)[0]),
        (e = Fo(Po)[0]),
        typeof t == `object` && t && typeof t.then == `function`)
      )
        try {
          var r = jo(t);
        } catch (e) {
          throw e === Sa ? wa : e;
        }
      else r = t;
      t = ko();
      var i = t.queue,
        a = i.dispatch;
      return (
        n !== t.memoizedState &&
          ((V.flags |= 2048), is(9, { destroy: void 0 }, ns.bind(null, i, n), null)),
        [r, a, e]
      );
    }
    function ns(e, t) {
      e.action = t;
    }
    function rs(e) {
      var t = ko(),
        n = H;
      if (n !== null) return ts(t, n, e);
      (ko(), (t = t.memoizedState), (n = ko()));
      var r = n.queue.dispatch;
      return ((n.memoizedState = e), [t, r, !1]);
    }
    function is(e, t, n, r) {
      return (
        (e = { tag: e, create: n, deps: r, inst: t, next: null }),
        (t = V.updateQueue),
        t === null && ((t = Ao()), (V.updateQueue = t)),
        (n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
        e
      );
    }
    function as() {
      return ko().memoizedState;
    }
    function os(e, t, n, r) {
      var i = Oo();
      ((V.flags |= e),
        (i.memoizedState = is(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r)));
    }
    function ss(e, t, n, r) {
      var i = ko();
      r = r === void 0 ? null : r;
      var a = i.memoizedState.inst;
      H !== null && r !== null && So(r, H.memoizedState.deps)
        ? (i.memoizedState = is(t, a, n, r))
        : ((V.flags |= e), (i.memoizedState = is(1 | t, a, n, r)));
    }
    function cs(e, t) {
      os(8390656, 8, e, t);
    }
    function ls(e, t) {
      ss(2048, 8, e, t);
    }
    function us(e) {
      V.flags |= 4;
      var t = V.updateQueue;
      if (t === null) ((t = Ao()), (V.updateQueue = t), (t.events = [e]));
      else {
        var n = t.events;
        n === null ? (t.events = [e]) : n.push(e);
      }
    }
    function ds(e) {
      var t = ko().memoizedState;
      return (
        us({ ref: t, nextImpl: e }),
        function () {
          if (J & 2) throw Error(a(440));
          return t.impl.apply(void 0, arguments);
        }
      );
    }
    function fs(e, t) {
      return ss(4, 2, e, t);
    }
    function ps(e, t) {
      return ss(4, 4, e, t);
    }
    function ms(e, t) {
      if (typeof t == `function`) {
        e = e();
        var n = t(e);
        return function () {
          typeof n == `function` ? n() : t(null);
        };
      }
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function hs(e, t, n) {
      ((n = n == null ? null : n.concat([e])), ss(4, 4, ms.bind(null, t, e), n));
    }
    function gs() {}
    function _s(e, t) {
      var n = ko();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return t !== null && So(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
    }
    function vs(e, t) {
      var n = ko();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      if (t !== null && So(t, r[1])) return r[0];
      if (((r = e()), go)) {
        Le(!0);
        try {
          e();
        } finally {
          Le(!1);
        }
      }
      return ((n.memoizedState = [r, t]), r);
    }
    function ys(e, t, n) {
      return n === void 0 || (fo & 1073741824 && !(X & 261930))
        ? (e.memoizedState = t)
        : ((e.memoizedState = n), (e = pu()), (V.lanes |= e), (Wl |= e), n);
    }
    function bs(e, t, n, r) {
      return Cr(n, t)
        ? n
        : Qa.current === null
          ? !(fo & 42) || (fo & 1073741824 && !(X & 261930))
            ? ((nc = !0), (e.memoizedState = n))
            : ((e = pu()), (V.lanes |= e), (Wl |= e), t)
          : ((e = ys(e, n, r)), Cr(e, t) || (nc = !0), e);
    }
    function xs(e, t, n, r, i) {
      var a = N.p;
      N.p = a !== 0 && 8 > a ? a : 8;
      var o = M.T,
        s = {};
      ((M.T = s), Ns(e, !1, t, n));
      try {
        var c = i(),
          l = M.S;
        (l !== null && l(s, c),
          typeof c == `object` && c && typeof c.then == `function`
            ? Ms(e, t, ga(c, r), fu(e))
            : Ms(e, t, r, fu(e)));
      } catch (n) {
        Ms(e, t, { then: function () {}, status: `rejected`, reason: n }, fu());
      } finally {
        ((N.p = a), o !== null && s.types !== null && (o.types = s.types), (M.T = o));
      }
    }
    function Ss() {}
    function Cs(e, t, n, r) {
      if (e.tag !== 5) throw Error(a(476));
      var i = ws(e).queue;
      xs(
        e,
        i,
        t,
        ie,
        n === null
          ? Ss
          : function () {
              return (Ts(e), n(r));
            }
      );
    }
    function ws(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ie,
        baseState: ie,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Po,
          lastRenderedState: ie,
        },
        next: null,
      };
      var n = {};
      return (
        (t.next = {
          memoizedState: n,
          baseState: n,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Po,
            lastRenderedState: n,
          },
          next: null,
        }),
        (e.memoizedState = t),
        (e = e.alternate),
        e !== null && (e.memoizedState = t),
        t
      );
    }
    function Ts(e) {
      var t = ws(e);
      (t.next === null && (t = e.alternate.memoizedState), Ms(e, t.next.queue, {}, fu()));
    }
    function Es() {
      return ta(Qf);
    }
    function Ds() {
      return ko().memoizedState;
    }
    function Os() {
      return ko().memoizedState;
    }
    function ks(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = fu();
            e = Ua(n);
            var r = Wa(t, e, n);
            (r !== null && (mu(r, t, n), Ga(r, t, n)), (t = { cache: ca() }), (e.payload = t));
            return;
        }
        t = t.return;
      }
    }
    function As(e, t, n) {
      var r = fu();
      ((n = {
        lane: r,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Ps(e) ? Fs(t, n) : ((n = ri(e, t, n, r)), n !== null && (mu(n, e, r), Is(n, t, r))));
    }
    function js(e, t, n) {
      Ms(e, t, n, fu());
    }
    function Ms(e, t, n, r) {
      var i = {
        lane: r,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Ps(e)) Fs(t, i);
      else {
        var a = e.alternate;
        if (
          e.lanes === 0 &&
          (a === null || a.lanes === 0) &&
          ((a = t.lastRenderedReducer), a !== null)
        )
          try {
            var o = t.lastRenderedState,
              s = a(o, n);
            if (((i.hasEagerState = !0), (i.eagerState = s), Cr(s, o)))
              return (ni(e, t, i, 0), Ll === null && ti(), !1);
          } catch {}
        if (((n = ri(e, t, i, r)), n !== null)) return (mu(n, e, r), Is(n, t, r), !0);
      }
      return !1;
    }
    function Ns(e, t, n, r) {
      if (
        ((r = {
          lane: 2,
          revertLane: ud(),
          gesture: null,
          action: r,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ps(e))
      ) {
        if (t) throw Error(a(479));
      } else ((t = ri(e, n, r, 2)), t !== null && mu(t, e, 2));
    }
    function Ps(e) {
      var t = e.alternate;
      return e === V || (t !== null && t === V);
    }
    function Fs(e, t) {
      ho = mo = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
    }
    function Is(e, t, n) {
      if (n & 4194048) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), et(e, n));
      }
    }
    var Ls = {
      readContext: ta,
      use: Mo,
      useCallback: xo,
      useContext: xo,
      useEffect: xo,
      useImperativeHandle: xo,
      useLayoutEffect: xo,
      useInsertionEffect: xo,
      useMemo: xo,
      useReducer: xo,
      useRef: xo,
      useState: xo,
      useDebugValue: xo,
      useDeferredValue: xo,
      useTransition: xo,
      useSyncExternalStore: xo,
      useId: xo,
      useHostTransitionStatus: xo,
      useFormState: xo,
      useActionState: xo,
      useOptimistic: xo,
      useMemoCache: xo,
      useCacheRefresh: xo,
    };
    Ls.useEffectEvent = xo;
    var Rs = {
        readContext: ta,
        use: Mo,
        useCallback: function (e, t) {
          return ((Oo().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: ta,
        useEffect: cs,
        useImperativeHandle: function (e, t, n) {
          ((n = n == null ? null : n.concat([e])), os(4194308, 4, ms.bind(null, t, e), n));
        },
        useLayoutEffect: function (e, t) {
          return os(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          os(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Oo();
          t = t === void 0 ? null : t;
          var r = e();
          if (go) {
            Le(!0);
            try {
              e();
            } finally {
              Le(!1);
            }
          }
          return ((n.memoizedState = [r, t]), r);
        },
        useReducer: function (e, t, n) {
          var r = Oo();
          if (n !== void 0) {
            var i = n(t);
            if (go) {
              Le(!0);
              try {
                n(t);
              } finally {
                Le(!1);
              }
            }
          } else i = t;
          return (
            (r.memoizedState = r.baseState = i),
            (e = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: i,
            }),
            (r.queue = e),
            (e = e.dispatch = As.bind(null, V, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Oo();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: function (e) {
          e = Wo(e);
          var t = e.queue,
            n = js.bind(null, V, t);
          return ((t.dispatch = n), [e.memoizedState, n]);
        },
        useDebugValue: gs,
        useDeferredValue: function (e, t) {
          return ys(Oo(), e, t);
        },
        useTransition: function () {
          var e = Wo(!1);
          return ((e = xs.bind(null, V, e.queue, !0, !1)), (Oo().memoizedState = e), [!1, e]);
        },
        useSyncExternalStore: function (e, t, n) {
          var r = V,
            i = Oo();
          if (R) {
            if (n === void 0) throw Error(a(407));
            n = n();
          } else {
            if (((n = t()), Ll === null)) throw Error(a(349));
            X & 127 || zo(r, t, n);
          }
          i.memoizedState = n;
          var o = { value: n, getSnapshot: t };
          return (
            (i.queue = o),
            cs(Vo.bind(null, r, o, e), [e]),
            (r.flags |= 2048),
            is(9, { destroy: void 0 }, Bo.bind(null, r, o, n, t), null),
            n
          );
        },
        useId: function () {
          var e = Oo(),
            t = Ll.identifierPrefix;
          if (R) {
            var n = Oi,
              r = Di;
            ((n = (r & ~(1 << (32 - Re(r) - 1))).toString(32) + n),
              (t = `_` + t + `R_` + n),
              (n = _o++),
              0 < n && (t += `H` + n.toString(32)),
              (t += `_`));
          } else ((n = bo++), (t = `_` + t + `r_` + n.toString(32) + `_`));
          return (e.memoizedState = t);
        },
        useHostTransitionStatus: Es,
        useFormState: $o,
        useActionState: $o,
        useOptimistic: function (e) {
          var t = Oo();
          t.memoizedState = t.baseState = e;
          var n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return ((t.queue = n), (t = Ns.bind(null, V, !0, n)), (n.dispatch = t), [e, t]);
        },
        useMemoCache: No,
        useCacheRefresh: function () {
          return (Oo().memoizedState = ks.bind(null, V));
        },
        useEffectEvent: function (e) {
          var t = Oo(),
            n = { impl: e };
          return (
            (t.memoizedState = n),
            function () {
              if (J & 2) throw Error(a(440));
              return n.impl.apply(void 0, arguments);
            }
          );
        },
      },
      zs = {
        readContext: ta,
        use: Mo,
        useCallback: _s,
        useContext: ta,
        useEffect: ls,
        useImperativeHandle: hs,
        useInsertionEffect: fs,
        useLayoutEffect: ps,
        useMemo: vs,
        useReducer: Fo,
        useRef: as,
        useState: function () {
          return Fo(Po);
        },
        useDebugValue: gs,
        useDeferredValue: function (e, t) {
          return bs(ko(), H.memoizedState, e, t);
        },
        useTransition: function () {
          var e = Fo(Po)[0],
            t = ko().memoizedState;
          return [typeof e == `boolean` ? e : jo(e), t];
        },
        useSyncExternalStore: Ro,
        useId: Ds,
        useHostTransitionStatus: Es,
        useFormState: es,
        useActionState: es,
        useOptimistic: function (e, t) {
          return Go(ko(), H, e, t);
        },
        useMemoCache: No,
        useCacheRefresh: Os,
      };
    zs.useEffectEvent = ds;
    var Bs = {
      readContext: ta,
      use: Mo,
      useCallback: _s,
      useContext: ta,
      useEffect: ls,
      useImperativeHandle: hs,
      useInsertionEffect: fs,
      useLayoutEffect: ps,
      useMemo: vs,
      useReducer: Lo,
      useRef: as,
      useState: function () {
        return Lo(Po);
      },
      useDebugValue: gs,
      useDeferredValue: function (e, t) {
        var n = ko();
        return H === null ? ys(n, e, t) : bs(n, H.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Lo(Po)[0],
          t = ko().memoizedState;
        return [typeof e == `boolean` ? e : jo(e), t];
      },
      useSyncExternalStore: Ro,
      useId: Ds,
      useHostTransitionStatus: Es,
      useFormState: rs,
      useActionState: rs,
      useOptimistic: function (e, t) {
        var n = ko();
        return H === null ? ((n.baseState = e), [e, n.queue.dispatch]) : Go(n, H, e, t);
      },
      useMemoCache: No,
      useCacheRefresh: Os,
    };
    Bs.useEffectEvent = ds;
    function Vs(e, t, n, r) {
      ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : h({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var Hs = {
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = fu(),
          i = Ua(r);
        ((i.payload = t),
          n != null && (i.callback = n),
          (t = Wa(e, i, r)),
          t !== null && (mu(t, e, r), Ga(t, e, r)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = fu(),
          i = Ua(r);
        ((i.tag = 1),
          (i.payload = t),
          n != null && (i.callback = n),
          (t = Wa(e, i, r)),
          t !== null && (mu(t, e, r), Ga(t, e, r)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = fu(),
          r = Ua(n);
        ((r.tag = 2),
          t != null && (r.callback = t),
          (t = Wa(e, r, n)),
          t !== null && (mu(t, e, n), Ga(t, e, n)));
      },
    };
    function Us(e, t, n, r, i, a, o) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == `function`
          ? e.shouldComponentUpdate(r, a, o)
          : t.prototype && t.prototype.isPureReactComponent
            ? !wr(n, r) || !wr(i, a)
            : !0
      );
    }
    function Ws(e, t, n, r) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == `function` && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == `function` &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Hs.enqueueReplaceState(t, t.state, null));
    }
    function Gs(e, t) {
      var n = t;
      if (`ref` in t) for (var r in ((n = {}), t)) r !== `ref` && (n[r] = t[r]);
      if ((e = e.defaultProps))
        for (var i in (n === t && (n = h({}, n)), e)) n[i] === void 0 && (n[i] = e[i]);
      return n;
    }
    function Ks(e) {
      Zr(e);
    }
    function qs(e) {
      console.error(e);
    }
    function Js(e) {
      Zr(e);
    }
    function Ys(e, t) {
      try {
        var n = e.onUncaughtError;
        n(t.value, { componentStack: t.stack });
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function Xs(e, t, n) {
      try {
        var r = e.onCaughtError;
        r(n.value, { componentStack: n.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function Zs(e, t, n) {
      return (
        (n = Ua(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Ys(e, t);
        }),
        n
      );
    }
    function Qs(e) {
      return ((e = Ua(e)), (e.tag = 3), e);
    }
    function $s(e, t, n, r) {
      var i = n.type.getDerivedStateFromError;
      if (typeof i == `function`) {
        var a = r.value;
        ((e.payload = function () {
          return i(a);
        }),
          (e.callback = function () {
            Xs(t, n, r);
          }));
      }
      var o = n.stateNode;
      o !== null &&
        typeof o.componentDidCatch == `function` &&
        (e.callback = function () {
          (Xs(t, n, r),
            typeof i != `function` && (nu === null ? (nu = new Set([this])) : nu.add(this)));
          var e = r.stack;
          this.componentDidCatch(r.value, { componentStack: e === null ? `` : e });
        });
    }
    function ec(e, t, n, r, i) {
      if (((n.flags |= 32768), typeof r == `object` && r && typeof r.then == `function`)) {
        if (((t = n.alternate), t !== null && Qi(t, n, i, !0), (n = ro.current), n !== null)) {
          switch (n.tag) {
            case 31:
            case 13:
              return (
                B === null ? Eu() : n.alternate === null && Ul === 0 && (Ul = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = i),
                r === Ta
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null ? (n.updateQueue = new Set([r])) : t.add(r),
                    Wu(e, r, i)),
                !1
              );
            case 22:
              return (
                (n.flags |= 65536),
                r === Ta
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null
                      ? ((t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([r]),
                        }),
                        (n.updateQueue = t))
                      : ((n = t.retryQueue), n === null ? (t.retryQueue = new Set([r])) : n.add(r)),
                    Wu(e, r, i)),
                !1
              );
          }
          throw Error(a(435, n.tag));
        }
        return (Wu(e, r, i), Eu(), !1);
      }
      if (R)
        return (
          (t = ro.current),
          t === null
            ? (r !== Ri && ((t = Error(a(423), { cause: r })), Gi(yi(t, n))),
              (e = e.current.alternate),
              (e.flags |= 65536),
              (i &= -i),
              (e.lanes |= i),
              (r = yi(r, n)),
              (i = Zs(e.stateNode, r, i)),
              Ka(e, i),
              Ul !== 4 && (Ul = 2))
            : (!(t.flags & 65536) && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = i),
              r !== Ri && ((e = Error(a(422), { cause: r })), Gi(yi(e, n)))),
          !1
        );
      var o = Error(a(520), { cause: r });
      if (((o = yi(o, n)), Yl === null ? (Yl = [o]) : Yl.push(o), Ul !== 4 && (Ul = 2), t === null))
        return !0;
      ((r = yi(r, n)), (n = t));
      do {
        switch (n.tag) {
          case 3:
            return (
              (n.flags |= 65536),
              (e = i & -i),
              (n.lanes |= e),
              (e = Zs(n.stateNode, r, e)),
              Ka(n, e),
              !1
            );
          case 1:
            if (
              ((t = n.type),
              (o = n.stateNode),
              !(n.flags & 128) &&
                (typeof t.getDerivedStateFromError == `function` ||
                  (o !== null &&
                    typeof o.componentDidCatch == `function` &&
                    (nu === null || !nu.has(o)))))
            )
              return (
                (n.flags |= 65536),
                (i &= -i),
                (n.lanes |= i),
                (i = Qs(i)),
                $s(i, e, n, r),
                Ka(n, i),
                !1
              );
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var tc = Error(a(461)),
      nc = !1;
    function rc(e, t, n, r) {
      t.child = e === null ? za(t, null, n, r) : Ra(t, e.child, n, r);
    }
    function ic(e, t, n, r, i) {
      n = n.render;
      var a = t.ref;
      if (`ref` in r) {
        var o = {};
        for (var s in r) s !== `ref` && (o[s] = r[s]);
      } else o = r;
      return (
        ea(t),
        (r = U(e, t, n, o, a, i)),
        (s = Eo()),
        e !== null && !nc
          ? (Do(e, t, i), Dc(e, t, i))
          : (R && s && ji(t), (t.flags |= 1), rc(e, t, r, i), t.child)
      );
    }
    function ac(e, t, n, r, i) {
      if (e === null) {
        var a = n.type;
        return typeof a == `function` && !ui(a) && a.defaultProps === void 0 && n.compare === null
          ? ((t.tag = 15), (t.type = a), oc(e, t, a, r, i))
          : ((e = pi(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((a = e.child), !Oc(e, i))) {
        var o = a.memoizedProps;
        if (((n = n.compare), (n = n === null ? wr : n), n(o, r) && e.ref === t.ref))
          return Dc(e, t, i);
      }
      return ((t.flags |= 1), (e = di(a, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    function oc(e, t, n, r, i) {
      if (e !== null) {
        var a = e.memoizedProps;
        if (wr(a, r) && e.ref === t.ref)
          if (((nc = !1), (t.pendingProps = r = a), Oc(e, i))) e.flags & 131072 && (nc = !0);
          else return ((t.lanes = e.lanes), Dc(e, t, i));
      }
      return pc(e, t, n, r, i);
    }
    function sc(e, t, n, r) {
      var i = r.children,
        a = e === null ? null : e.memoizedState;
      if (
        (e === null &&
          t.stateNode === null &&
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        r.mode === `hidden`)
      ) {
        if (t.flags & 128) {
          if (((a = a === null ? n : a.baseLanes | n), e !== null)) {
            for (r = t.child = e.child, i = 0; r !== null; )
              ((i = i | r.lanes | r.childLanes), (r = r.sibling));
            r = i & ~a;
          } else ((r = 0), (t.child = null));
          return cc(e, t, a, n, r);
        }
        if (n & 536870912)
          ((t.memoizedState = { baseLanes: 0, cachePool: null }),
            e !== null && ba(t, a === null ? null : a.cachePool),
            a === null ? to() : eo(t, a),
            oo(t));
        else return ((r = t.lanes = 536870912), cc(e, t, a === null ? n : a.baseLanes | n, n, r));
      } else
        a === null
          ? (e !== null && ba(t, null), to(), so(t))
          : (ba(t, a.cachePool), eo(t, a), so(t), (t.memoizedState = null));
      return (rc(e, t, i, n), t.child);
    }
    function G(e, t) {
      return (
        (e !== null && e.tag === 22) ||
          t.stateNode !== null ||
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        t.sibling
      );
    }
    function cc(e, t, n, r, i) {
      var a = ya();
      return (
        (a = a === null ? null : { parent: sa._currentValue, pool: a }),
        (t.memoizedState = { baseLanes: n, cachePool: a }),
        e !== null && ba(t, null),
        to(),
        oo(t),
        e !== null && Qi(e, t, r, !0),
        (t.childLanes = i),
        null
      );
    }
    function lc(e, t) {
      return (
        (t = Sc({ mode: t.mode, children: t.children }, e.mode)),
        (t.ref = e.ref),
        (e.child = t),
        (t.return = e),
        t
      );
    }
    function uc(e, t, n) {
      return (
        Ra(t, e.child, null, n),
        (e = lc(t, t.pendingProps)),
        (e.flags |= 2),
        co(t),
        (t.memoizedState = null),
        e
      );
    }
    function dc(e, t, n) {
      var r = t.pendingProps,
        i = (t.flags & 128) != 0;
      if (((t.flags &= -129), e === null)) {
        if (R) {
          if (r.mode === `hidden`) return ((e = lc(t, r)), (t.lanes = 536870912), G(null, e));
          if (
            (ao(t),
            (e = Fi)
              ? ((e = rf(e, Li)),
                (e = e !== null && e.data === `&` ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Ei === null ? null : { id: Di, overflow: Oi },
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = gi(e)),
                  (n.return = t),
                  (t.child = n),
                  (Pi = t),
                  (Fi = null)))
              : (e = null),
            e === null)
          )
            throw zi(t);
          return ((t.lanes = 536870912), null);
        }
        return lc(t, r);
      }
      var o = e.memoizedState;
      if (o !== null) {
        var s = o.dehydrated;
        if ((ao(t), i))
          if (t.flags & 256) ((t.flags &= -257), (t = uc(e, t, n)));
          else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
          else throw Error(a(558));
        else if ((nc || Qi(e, t, n, !1), (i = (n & e.childLanes) !== 0), nc || i)) {
          if (((r = Ll), r !== null && ((s = tt(r, n)), s !== 0 && s !== o.retryLane)))
            throw ((o.retryLane = s), ii(e, s), mu(r, e, s), tc);
          (Eu(), (t = uc(e, t, n)));
        } else
          ((e = o.treeContext),
            (Fi = cf(s.nextSibling)),
            (Pi = t),
            (R = !0),
            (Ii = null),
            (Li = !1),
            e !== null && Ni(t, e),
            (t = lc(t, r)),
            (t.flags |= 4096));
        return t;
      }
      return (
        (e = di(e.child, { mode: r.mode, children: r.children })),
        (e.ref = t.ref),
        (t.child = e),
        (e.return = t),
        e
      );
    }
    function fc(e, t) {
      var n = t.ref;
      if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof n != `function` && typeof n != `object`) throw Error(a(284));
        (e === null || e.ref !== n) && (t.flags |= 4194816);
      }
    }
    function pc(e, t, n, r, i) {
      return (
        ea(t),
        (n = U(e, t, n, r, void 0, i)),
        (r = Eo()),
        e !== null && !nc
          ? (Do(e, t, i), Dc(e, t, i))
          : (R && r && ji(t), (t.flags |= 1), rc(e, t, n, i), t.child)
      );
    }
    function mc(e, t, n, r, i, a) {
      return (
        ea(t),
        (t.updateQueue = null),
        (n = wo(t, r, n, i)),
        Co(e),
        (r = Eo()),
        e !== null && !nc
          ? (Do(e, t, a), Dc(e, t, a))
          : (R && r && ji(t), (t.flags |= 1), rc(e, t, n, a), t.child)
      );
    }
    function hc(e, t, n, r, i) {
      if ((ea(t), t.stateNode === null)) {
        var a = si,
          o = n.contextType;
        (typeof o == `object` && o && (a = ta(o)),
          (a = new n(r, a)),
          (t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null),
          (a.updater = Hs),
          (t.stateNode = a),
          (a._reactInternals = t),
          (a = t.stateNode),
          (a.props = r),
          (a.state = t.memoizedState),
          (a.refs = {}),
          Va(t),
          (o = n.contextType),
          (a.context = typeof o == `object` && o ? ta(o) : si),
          (a.state = t.memoizedState),
          (o = n.getDerivedStateFromProps),
          typeof o == `function` && (Vs(t, n, o, r), (a.state = t.memoizedState)),
          typeof n.getDerivedStateFromProps == `function` ||
            typeof a.getSnapshotBeforeUpdate == `function` ||
            (typeof a.UNSAFE_componentWillMount != `function` &&
              typeof a.componentWillMount != `function`) ||
            ((o = a.state),
            typeof a.componentWillMount == `function` && a.componentWillMount(),
            typeof a.UNSAFE_componentWillMount == `function` && a.UNSAFE_componentWillMount(),
            o !== a.state && Hs.enqueueReplaceState(a, a.state, null),
            Ya(t, r, a, i),
            Ja(),
            (a.state = t.memoizedState)),
          typeof a.componentDidMount == `function` && (t.flags |= 4194308),
          (r = !0));
      } else if (e === null) {
        a = t.stateNode;
        var s = t.memoizedProps,
          c = Gs(n, s);
        a.props = c;
        var l = a.context,
          u = n.contextType;
        ((o = si), typeof u == `object` && u && (o = ta(u)));
        var d = n.getDerivedStateFromProps;
        ((u = typeof d == `function` || typeof a.getSnapshotBeforeUpdate == `function`),
          (s = t.pendingProps !== s),
          u ||
            (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
              typeof a.componentWillReceiveProps != `function`) ||
            ((s || l !== o) && Ws(t, a, r, o)),
          (Ba = !1));
        var f = t.memoizedState;
        ((a.state = f),
          Ya(t, r, a, i),
          Ja(),
          (l = t.memoizedState),
          s || f !== l || Ba
            ? (typeof d == `function` && (Vs(t, n, d, r), (l = t.memoizedState)),
              (c = Ba || Us(t, n, c, r, f, l, o))
                ? (u ||
                    (typeof a.UNSAFE_componentWillMount != `function` &&
                      typeof a.componentWillMount != `function`) ||
                    (typeof a.componentWillMount == `function` && a.componentWillMount(),
                    typeof a.UNSAFE_componentWillMount == `function` &&
                      a.UNSAFE_componentWillMount()),
                  typeof a.componentDidMount == `function` && (t.flags |= 4194308))
                : (typeof a.componentDidMount == `function` && (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = l)),
              (a.props = r),
              (a.state = l),
              (a.context = o),
              (r = c))
            : (typeof a.componentDidMount == `function` && (t.flags |= 4194308), (r = !1)));
      } else {
        ((a = t.stateNode),
          Ha(e, t),
          (o = t.memoizedProps),
          (u = Gs(n, o)),
          (a.props = u),
          (d = t.pendingProps),
          (f = a.context),
          (l = n.contextType),
          (c = si),
          typeof l == `object` && l && (c = ta(l)),
          (s = n.getDerivedStateFromProps),
          (l = typeof s == `function` || typeof a.getSnapshotBeforeUpdate == `function`) ||
            (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
              typeof a.componentWillReceiveProps != `function`) ||
            ((o !== d || f !== c) && Ws(t, a, r, c)),
          (Ba = !1),
          (f = t.memoizedState),
          (a.state = f),
          Ya(t, r, a, i),
          Ja());
        var p = t.memoizedState;
        o !== d || f !== p || Ba || (e !== null && e.dependencies !== null && $i(e.dependencies))
          ? (typeof s == `function` && (Vs(t, n, s, r), (p = t.memoizedState)),
            (u =
              Ba ||
              Us(t, n, u, r, f, p, c) ||
              (e !== null && e.dependencies !== null && $i(e.dependencies)))
              ? (l ||
                  (typeof a.UNSAFE_componentWillUpdate != `function` &&
                    typeof a.componentWillUpdate != `function`) ||
                  (typeof a.componentWillUpdate == `function` && a.componentWillUpdate(r, p, c),
                  typeof a.UNSAFE_componentWillUpdate == `function` &&
                    a.UNSAFE_componentWillUpdate(r, p, c)),
                typeof a.componentDidUpdate == `function` && (t.flags |= 4),
                typeof a.getSnapshotBeforeUpdate == `function` && (t.flags |= 1024))
              : (typeof a.componentDidUpdate != `function` ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof a.getSnapshotBeforeUpdate != `function` ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = p)),
            (a.props = r),
            (a.state = p),
            (a.context = c),
            (r = u))
          : (typeof a.componentDidUpdate != `function` ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != `function` ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return (
        (a = r),
        fc(e, t),
        (r = (t.flags & 128) != 0),
        a || r
          ? ((a = t.stateNode),
            (n = r && typeof n.getDerivedStateFromError != `function` ? null : a.render()),
            (t.flags |= 1),
            e !== null && r
              ? ((t.child = Ra(t, e.child, null, i)), (t.child = Ra(t, null, n, i)))
              : rc(e, t, n, i),
            (t.memoizedState = a.state),
            (e = t.child))
          : (e = Dc(e, t, i)),
        e
      );
    }
    function gc(e, t, n, r) {
      return (Ui(), (t.flags |= 256), rc(e, t, n, r), t.child);
    }
    var _c = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
    function vc(e) {
      return { baseLanes: e, cachePool: xa() };
    }
    function yc(e, t, n) {
      return ((e = e === null ? 0 : e.childLanes & ~n), t && (e |= ql), e);
    }
    function bc(e, t, n) {
      var r = t.pendingProps,
        i = !1,
        o = (t.flags & 128) != 0,
        s;
      if (
        ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (lo.current & 2) != 0),
        s && ((i = !0), (t.flags &= -129)),
        (s = (t.flags & 32) != 0),
        (t.flags &= -33),
        e === null)
      ) {
        if (R) {
          if (
            (i ? io(t) : so(t),
            (e = Fi)
              ? ((e = rf(e, Li)),
                (e = e !== null && e.data !== `&` ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Ei === null ? null : { id: Di, overflow: Oi },
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = gi(e)),
                  (n.return = t),
                  (t.child = n),
                  (Pi = t),
                  (Fi = null)))
              : (e = null),
            e === null)
          )
            throw zi(t);
          return (of(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        }
        var c = r.children;
        return (
          (r = r.fallback),
          i
            ? (so(t),
              (i = t.mode),
              (c = Sc({ mode: `hidden`, children: c }, i)),
              (r = mi(r, i, n, null)),
              (c.return = t),
              (r.return = t),
              (c.sibling = r),
              (t.child = c),
              (r = t.child),
              (r.memoizedState = vc(n)),
              (r.childLanes = yc(e, s, n)),
              (t.memoizedState = _c),
              G(null, r))
            : (io(t), xc(t, c))
        );
      }
      var l = e.memoizedState;
      if (l !== null && ((c = l.dehydrated), c !== null)) {
        if (o)
          t.flags & 256
            ? (io(t), (t.flags &= -257), (t = Cc(e, t, n)))
            : t.memoizedState === null
              ? (so(t),
                (c = r.fallback),
                (i = t.mode),
                (r = Sc({ mode: `visible`, children: r.children }, i)),
                (c = mi(c, i, n, null)),
                (c.flags |= 2),
                (r.return = t),
                (c.return = t),
                (r.sibling = c),
                (t.child = r),
                Ra(t, e.child, null, n),
                (r = t.child),
                (r.memoizedState = vc(n)),
                (r.childLanes = yc(e, s, n)),
                (t.memoizedState = _c),
                (t = G(null, r)))
              : (so(t), (t.child = e.child), (t.flags |= 128), (t = null));
        else if ((io(t), of(c))) {
          if (((s = c.nextSibling && c.nextSibling.dataset), s)) var u = s.dgst;
          ((s = u),
            (r = Error(a(419))),
            (r.stack = ``),
            (r.digest = s),
            Gi({ value: r, source: null, stack: null }),
            (t = Cc(e, t, n)));
        } else if ((nc || Qi(e, t, n, !1), (s = (n & e.childLanes) !== 0), nc || s)) {
          if (((s = Ll), s !== null && ((r = tt(s, n)), r !== 0 && r !== l.retryLane)))
            throw ((l.retryLane = r), ii(e, r), mu(s, e, r), tc);
          (af(c) || Eu(), (t = Cc(e, t, n)));
        } else
          af(c)
            ? ((t.flags |= 192), (t.child = e.child), (t = null))
            : ((e = l.treeContext),
              (Fi = cf(c.nextSibling)),
              (Pi = t),
              (R = !0),
              (Ii = null),
              (Li = !1),
              e !== null && Ni(t, e),
              (t = xc(t, r.children)),
              (t.flags |= 4096));
        return t;
      }
      return i
        ? (so(t),
          (c = r.fallback),
          (i = t.mode),
          (l = e.child),
          (u = l.sibling),
          (r = di(l, { mode: `hidden`, children: r.children })),
          (r.subtreeFlags = l.subtreeFlags & 65011712),
          u === null ? ((c = mi(c, i, n, null)), (c.flags |= 2)) : (c = di(u, c)),
          (c.return = t),
          (r.return = t),
          (r.sibling = c),
          (t.child = r),
          G(null, r),
          (r = t.child),
          (c = e.child.memoizedState),
          c === null
            ? (c = vc(n))
            : ((i = c.cachePool),
              i === null
                ? (i = xa())
                : ((l = sa._currentValue), (i = i.parent === l ? i : { parent: l, pool: l })),
              (c = { baseLanes: c.baseLanes | n, cachePool: i })),
          (r.memoizedState = c),
          (r.childLanes = yc(e, s, n)),
          (t.memoizedState = _c),
          G(e.child, r))
        : (io(t),
          (n = e.child),
          (e = n.sibling),
          (n = di(n, { mode: `visible`, children: r.children })),
          (n.return = t),
          (n.sibling = null),
          e !== null &&
            ((s = t.deletions), s === null ? ((t.deletions = [e]), (t.flags |= 16)) : s.push(e)),
          (t.child = n),
          (t.memoizedState = null),
          n);
    }
    function xc(e, t) {
      return ((t = Sc({ mode: `visible`, children: t }, e.mode)), (t.return = e), (e.child = t));
    }
    function Sc(e, t) {
      return ((e = li(22, e, null, t)), (e.lanes = 0), e);
    }
    function Cc(e, t, n) {
      return (
        Ra(t, e.child, null, n),
        (e = xc(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function wc(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      (r !== null && (r.lanes |= t), Xi(e.return, t, n));
    }
    function Tc(e, t, n, r, i, a) {
      var o = e.memoizedState;
      o === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
            treeForkCount: a,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = i),
          (o.treeForkCount = a));
    }
    function Ec(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail;
      r = r.children;
      var o = lo.current,
        s = (o & 2) != 0;
      if (
        (s ? ((o = (o & 1) | 2), (t.flags |= 128)) : (o &= 1),
        L(lo, o),
        rc(e, t, r, n),
        (r = R ? Ci : 0),
        !s && e !== null && e.flags & 128)
      )
        a: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
          else if (e.tag === 19) wc(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break a;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break a;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      switch (i) {
        case `forwards`:
          for (n = t.child, i = null; n !== null; )
            ((e = n.alternate), e !== null && uo(e) === null && (i = n), (n = n.sibling));
          ((n = i),
            n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
            Tc(t, !1, i, n, a, r));
          break;
        case `backwards`:
        case `unstable_legacy-backwards`:
          for (n = null, i = t.child, t.child = null; i !== null; ) {
            if (((e = i.alternate), e !== null && uo(e) === null)) {
              t.child = i;
              break;
            }
            ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
          }
          Tc(t, !0, n, null, a, r);
          break;
        case `together`:
          Tc(t, !1, null, null, void 0, r);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Dc(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies), (Wl |= t.lanes), (n & t.childLanes) === 0)
      )
        if (e !== null) {
          if ((Qi(e, t, n, !1), (n & t.childLanes) === 0)) return null;
        } else return null;
      if (e !== null && t.child !== e.child) throw Error(a(153));
      if (t.child !== null) {
        for (
          e = t.child, n = di(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling), (n = n.sibling = di(e, e.pendingProps)), (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function Oc(e, t) {
      return (e.lanes & t) === 0 ? ((e = e.dependencies), !!(e !== null && $i(e))) : !0;
    }
    function kc(e, t, n) {
      switch (t.tag) {
        case 3:
          (ue(t, t.stateNode.containerInfo), Yi(t, sa, e.memoizedState.cache), Ui());
          break;
        case 27:
        case 5:
          fe(t);
          break;
        case 4:
          ue(t, t.stateNode.containerInfo);
          break;
        case 10:
          Yi(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return ((t.flags |= 128), ao(t), null);
          break;
        case 13:
          var r = t.memoizedState;
          if (r !== null)
            return r.dehydrated === null
              ? (n & t.child.childLanes) === 0
                ? (io(t), (e = Dc(e, t, n)), e === null ? null : e.sibling)
                : bc(e, t, n)
              : (io(t), (t.flags |= 128), null);
          io(t);
          break;
        case 19:
          var i = (e.flags & 128) != 0;
          if (
            ((r = (n & t.childLanes) !== 0), (r ||= (Qi(e, t, n, !1), (n & t.childLanes) !== 0)), i)
          ) {
            if (r) return Ec(e, t, n);
            t.flags |= 128;
          }
          if (
            ((i = t.memoizedState),
            i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            L(lo, lo.current),
            r)
          )
            break;
          return null;
        case 22:
          return ((t.lanes = 0), sc(e, t, n, t.pendingProps));
        case 24:
          Yi(t, sa, e.memoizedState.cache);
      }
      return Dc(e, t, n);
    }
    function Ac(e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps) nc = !0;
        else {
          if (!Oc(e, n) && !(t.flags & 128)) return ((nc = !1), kc(e, t, n));
          nc = !!(e.flags & 131072);
        }
      else ((nc = !1), R && t.flags & 1048576 && Ai(t, Ci, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          a: {
            var r = t.pendingProps;
            if (((e = Oa(t.elementType)), (t.type = e), typeof e == `function`))
              ui(e)
                ? ((r = Gs(e, r)), (t.tag = 1), (t = hc(null, t, e, r, n)))
                : ((t.tag = 0), (t = pc(null, t, e, r, n)));
            else {
              if (e != null) {
                var i = e.$$typeof;
                if (i === w) {
                  ((t.tag = 11), (t = ic(null, t, e, r, n)));
                  break a;
                } else if (i === ee) {
                  ((t.tag = 14), (t = ac(null, t, e, r, n)));
                  break a;
                }
              }
              throw ((t = j(e) || e), Error(a(306, t, ``)));
            }
          }
          return t;
        case 0:
          return pc(e, t, t.type, t.pendingProps, n);
        case 1:
          return ((r = t.type), (i = Gs(r, t.pendingProps)), hc(e, t, r, i, n));
        case 3:
          a: {
            if ((ue(t, t.stateNode.containerInfo), e === null)) throw Error(a(387));
            r = t.pendingProps;
            var o = t.memoizedState;
            ((i = o.element), Ha(e, t), Ya(t, r, null, n));
            var s = t.memoizedState;
            if (
              ((r = s.cache),
              Yi(t, sa, r),
              r !== o.cache && Zi(t, [sa], n, !0),
              Ja(),
              (r = s.element),
              o.isDehydrated)
            )
              if (
                ((o = { element: r, isDehydrated: !1, cache: s.cache }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                t.flags & 256)
              ) {
                t = gc(e, t, r, n);
                break a;
              } else if (r !== i) {
                ((i = yi(Error(a(424)), t)), Gi(i), (t = gc(e, t, r, n)));
                break a;
              } else {
                switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === `HTML` ? e.ownerDocument.body : e;
                }
                for (
                  Fi = cf(e.firstChild),
                    Pi = t,
                    R = !0,
                    Ii = null,
                    Li = !0,
                    n = za(t, null, r, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
              }
            else {
              if ((Ui(), r === i)) {
                t = Dc(e, t, n);
                break a;
              }
              rc(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            fc(e, t),
            e === null
              ? (n = kf(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = n)
                : R ||
                  ((n = t.type),
                  (e = t.pendingProps),
                  (r = Bd(ce.current).createElement(n)),
                  (r[st] = t),
                  (r[ct] = e),
                  Pd(r, n, e),
                  bt(r),
                  (t.stateNode = r))
              : (t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
            null
          );
        case 27:
          return (
            fe(t),
            e === null &&
              R &&
              ((r = t.stateNode = ff(t.type, t.pendingProps, ce.current)),
              (Pi = t),
              (Li = !0),
              (i = Fi),
              Zd(t.type) ? ((lf = i), (Fi = cf(r.firstChild))) : (Fi = i)),
            rc(e, t, t.pendingProps.children, n),
            fc(e, t),
            e === null && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            e === null &&
              R &&
              ((i = r = Fi) &&
                ((r = tf(r, t.type, t.pendingProps, Li)),
                r === null
                  ? (i = !1)
                  : ((t.stateNode = r), (Pi = t), (Fi = cf(r.firstChild)), (Li = !1), (i = !0))),
              i || zi(t)),
            fe(t),
            (i = t.type),
            (o = t.pendingProps),
            (s = e === null ? null : e.memoizedProps),
            (r = o.children),
            Ud(i, o) ? (r = null) : s !== null && Ud(i, s) && (t.flags |= 32),
            t.memoizedState !== null && ((i = U(e, t, To, null, null, n)), (Qf._currentValue = i)),
            fc(e, t),
            rc(e, t, r, n),
            t.child
          );
        case 6:
          return (
            e === null &&
              R &&
              ((e = n = Fi) &&
                ((n = nf(n, t.pendingProps, Li)),
                n === null ? (e = !1) : ((t.stateNode = n), (Pi = t), (Fi = null), (e = !0))),
              e || zi(t)),
            null
          );
        case 13:
          return bc(e, t, n);
        case 4:
          return (
            ue(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = Ra(t, null, r, n)) : rc(e, t, r, n),
            t.child
          );
        case 11:
          return ic(e, t, t.type, t.pendingProps, n);
        case 7:
          return (rc(e, t, t.pendingProps, n), t.child);
        case 8:
          return (rc(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (rc(e, t, t.pendingProps.children, n), t.child);
        case 10:
          return ((r = t.pendingProps), Yi(t, t.type, r.value), rc(e, t, r.children, n), t.child);
        case 9:
          return (
            (i = t.type._context),
            (r = t.pendingProps.children),
            ea(t),
            (i = ta(i)),
            (r = r(i)),
            (t.flags |= 1),
            rc(e, t, r, n),
            t.child
          );
        case 14:
          return ac(e, t, t.type, t.pendingProps, n);
        case 15:
          return oc(e, t, t.type, t.pendingProps, n);
        case 19:
          return Ec(e, t, n);
        case 31:
          return dc(e, t, n);
        case 22:
          return sc(e, t, n, t.pendingProps);
        case 24:
          return (
            ea(t),
            (r = ta(sa)),
            e === null
              ? ((i = ya()),
                i === null &&
                  ((i = Ll),
                  (o = ca()),
                  (i.pooledCache = o),
                  o.refCount++,
                  o !== null && (i.pooledCacheLanes |= n),
                  (i = o)),
                (t.memoizedState = { parent: r, cache: i }),
                Va(t),
                Yi(t, sa, i))
              : ((e.lanes & n) !== 0 && (Ha(e, t), Ya(t, null, null, n), Ja()),
                (i = e.memoizedState),
                (o = t.memoizedState),
                i.parent === r
                  ? ((r = o.cache), Yi(t, sa, r), r !== i.cache && Zi(t, [sa], n, !0))
                  : ((i = { parent: r, cache: r }),
                    (t.memoizedState = i),
                    t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
                    Yi(t, sa, r))),
            rc(e, t, t.pendingProps.children, n),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(a(156, t.tag));
    }
    function jc(e) {
      e.flags |= 4;
    }
    function Mc(e, t, n, r, i) {
      if (((t = (e.mode & 32) != 0) && (t = !1), t)) {
        if (((e.flags |= 16777216), (i & 335544128) === i))
          if (e.stateNode.complete) e.flags |= 8192;
          else if (Cu()) e.flags |= 8192;
          else throw ((ka = Ta), Ca);
      } else e.flags &= -16777217;
    }
    function Nc(e, t) {
      if (t.type !== `stylesheet` || t.state.loading & 4) e.flags &= -16777217;
      else if (((e.flags |= 16777216), !Wf(t)))
        if (Cu()) e.flags |= 8192;
        else throw ((ka = Ta), Ca);
    }
    function Pc(e, t) {
      (t !== null && (e.flags |= 4),
        e.flags & 16384 && ((t = e.tag === 22 ? 536870912 : Ye()), (e.lanes |= t), (Jl |= t)));
    }
    function Fc(e, t) {
      if (!R)
        switch (e.tailMode) {
          case `hidden`:
            t = e.tail;
            for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case `collapsed`:
            n = e.tail;
            for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling));
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function Ic(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 65011712),
            (r |= i.flags & 65011712),
            (i.return = e),
            (i = i.sibling));
      else
        for (i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling));
      return ((e.subtreeFlags |= r), (e.childLanes = n), t);
    }
    function Lc(e, t, n) {
      var r = t.pendingProps;
      switch ((Mi(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (Ic(t), null);
        case 1:
          return (Ic(t), null);
        case 3:
          return (
            (n = t.stateNode),
            (r = null),
            e !== null && (r = e.memoizedState.cache),
            t.memoizedState.cache !== r && (t.flags |= 2048),
            z(sa),
            de(),
            (n.pendingContext &&= ((n.context = n.pendingContext), null)),
            (e === null || e.child === null) &&
              (Hi(t)
                ? jc(t)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Wi())),
            Ic(t),
            null
          );
        case 26:
          var i = t.type,
            o = t.memoizedState;
          return (
            e === null
              ? (jc(t), o === null ? (Ic(t), Mc(t, i, null, r, n)) : (Ic(t), Nc(t, o)))
              : o
                ? o === e.memoizedState
                  ? (Ic(t), (t.flags &= -16777217))
                  : (jc(t), Ic(t), Nc(t, o))
                : ((e = e.memoizedProps), e !== r && jc(t), Ic(t), Mc(t, i, e, r, n)),
            null
          );
        case 27:
          if ((pe(t), (n = ce.current), (i = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== r && jc(t);
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(a(166));
              return (Ic(t), null);
            }
            ((e = oe.current), Hi(t) ? Bi(t, e) : ((e = ff(i, r, n)), (t.stateNode = e), jc(t)));
          }
          return (Ic(t), null);
        case 5:
          if ((pe(t), (i = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== r && jc(t);
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(a(166));
              return (Ic(t), null);
            }
            if (((o = oe.current), Hi(t))) Bi(t, o);
            else {
              var s = Bd(ce.current);
              switch (o) {
                case 1:
                  o = s.createElementNS(`http://www.w3.org/2000/svg`, i);
                  break;
                case 2:
                  o = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, i);
                  break;
                default:
                  switch (i) {
                    case `svg`:
                      o = s.createElementNS(`http://www.w3.org/2000/svg`, i);
                      break;
                    case `math`:
                      o = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, i);
                      break;
                    case `script`:
                      ((o = s.createElement(`div`)),
                        (o.innerHTML = `<script><\/script>`),
                        (o = o.removeChild(o.firstChild)));
                      break;
                    case `select`:
                      ((o =
                        typeof r.is == `string`
                          ? s.createElement(`select`, { is: r.is })
                          : s.createElement(`select`)),
                        r.multiple ? (o.multiple = !0) : r.size && (o.size = r.size));
                      break;
                    default:
                      o =
                        typeof r.is == `string`
                          ? s.createElement(i, { is: r.is })
                          : s.createElement(i);
                  }
              }
              ((o[st] = t), (o[ct] = r));
              a: for (s = t.child; s !== null; ) {
                if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
                else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                  ((s.child.return = s), (s = s.child));
                  continue;
                }
                if (s === t) break a;
                for (; s.sibling === null; ) {
                  if (s.return === null || s.return === t) break a;
                  s = s.return;
                }
                ((s.sibling.return = s.return), (s = s.sibling));
              }
              t.stateNode = o;
              a: switch ((Pd(o, i, r), i)) {
                case `button`:
                case `input`:
                case `select`:
                case `textarea`:
                  r = !!r.autoFocus;
                  break a;
                case `img`:
                  r = !0;
                  break a;
                default:
                  r = !1;
              }
              r && jc(t);
            }
          }
          return (
            Ic(t),
            Mc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
            null
          );
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== r && jc(t);
          else {
            if (typeof r != `string` && t.stateNode === null) throw Error(a(166));
            if (((e = ce.current), Hi(t))) {
              if (((e = t.stateNode), (n = t.memoizedProps), (r = null), (i = Pi), i !== null))
                switch (i.tag) {
                  case 27:
                  case 5:
                    r = i.memoizedProps;
                }
              ((e[st] = t),
                (e = !!(
                  e.nodeValue === n ||
                  (r !== null && !0 === r.suppressHydrationWarning) ||
                  jd(e.nodeValue, n)
                )),
                e || zi(t, !0));
            } else ((e = Bd(e).createTextNode(r)), (e[st] = t), (t.stateNode = e));
          }
          return (Ic(t), null);
        case 31:
          if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
            if (((r = Hi(t)), n !== null)) {
              if (e === null) {
                if (!r) throw Error(a(318));
                if (((e = t.memoizedState), (e = e === null ? null : e.dehydrated), !e))
                  throw Error(a(557));
                e[st] = t;
              } else (Ui(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
              (Ic(t), (e = !1));
            } else
              ((n = Wi()),
                e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
                (e = !0));
            if (!e) return t.flags & 256 ? (co(t), t) : (co(t), null);
            if (t.flags & 128) throw Error(a(558));
          }
          return (Ic(t), null);
        case 13:
          if (
            ((r = t.memoizedState),
            e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (((i = Hi(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!i) throw Error(a(318));
                if (((i = t.memoizedState), (i = i === null ? null : i.dehydrated), !i))
                  throw Error(a(317));
                i[st] = t;
              } else (Ui(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
              (Ic(t), (i = !1));
            } else
              ((i = Wi()),
                e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i),
                (i = !0));
            if (!i) return t.flags & 256 ? (co(t), t) : (co(t), null);
          }
          return (
            co(t),
            t.flags & 128
              ? ((t.lanes = n), t)
              : ((n = r !== null),
                (e = e !== null && e.memoizedState !== null),
                n &&
                  ((r = t.child),
                  (i = null),
                  r.alternate !== null &&
                    r.alternate.memoizedState !== null &&
                    r.alternate.memoizedState.cachePool !== null &&
                    (i = r.alternate.memoizedState.cachePool.pool),
                  (o = null),
                  r.memoizedState !== null &&
                    r.memoizedState.cachePool !== null &&
                    (o = r.memoizedState.cachePool.pool),
                  o !== i && (r.flags |= 2048)),
                n !== e && n && (t.child.flags |= 8192),
                Pc(t, t.updateQueue),
                Ic(t),
                null)
          );
        case 4:
          return (de(), e === null && xd(t.stateNode.containerInfo), Ic(t), null);
        case 10:
          return (z(t.type), Ic(t), null);
        case 19:
          if ((I(lo), (r = t.memoizedState), r === null)) return (Ic(t), null);
          if (((i = (t.flags & 128) != 0), (o = r.rendering), o === null))
            if (i) Fc(r, !1);
            else {
              if (Ul !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((o = uo(e)), o !== null)) {
                    for (
                      t.flags |= 128,
                        Fc(r, !1),
                        e = o.updateQueue,
                        t.updateQueue = e,
                        Pc(t, e),
                        t.subtreeFlags = 0,
                        e = n,
                        n = t.child;
                      n !== null;
                    )
                      (fi(n, e), (n = n.sibling));
                    return (L(lo, (lo.current & 1) | 2), R && ki(t, r.treeForkCount), t.child);
                  }
                  e = e.sibling;
                }
              r.tail !== null &&
                Ee() > eu &&
                ((t.flags |= 128), (i = !0), Fc(r, !1), (t.lanes = 4194304));
            }
          else {
            if (!i)
              if (((e = uo(o)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (i = !0),
                  (e = e.updateQueue),
                  (t.updateQueue = e),
                  Pc(t, e),
                  Fc(r, !0),
                  r.tail === null && r.tailMode === `hidden` && !o.alternate && !R)
                )
                  return (Ic(t), null);
              } else
                2 * Ee() - r.renderingStartTime > eu &&
                  n !== 536870912 &&
                  ((t.flags |= 128), (i = !0), Fc(r, !1), (t.lanes = 4194304));
            r.isBackwards
              ? ((o.sibling = t.child), (t.child = o))
              : ((e = r.last), e === null ? (t.child = o) : (e.sibling = o), (r.last = o));
          }
          return r.tail === null
            ? (Ic(t), null)
            : ((e = r.tail),
              (r.rendering = e),
              (r.tail = e.sibling),
              (r.renderingStartTime = Ee()),
              (e.sibling = null),
              (n = lo.current),
              L(lo, i ? (n & 1) | 2 : n & 1),
              R && ki(t, r.treeForkCount),
              e);
        case 22:
        case 23:
          return (
            co(t),
            no(),
            (r = t.memoizedState !== null),
            e === null
              ? r && (t.flags |= 8192)
              : (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r
              ? n & 536870912 &&
                !(t.flags & 128) &&
                (Ic(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : Ic(t),
            (n = t.updateQueue),
            n !== null && Pc(t, n.retryQueue),
            (n = null),
            e !== null &&
              e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (n = e.memoizedState.cachePool.pool),
            (r = null),
            t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (r = t.memoizedState.cachePool.pool),
            r !== n && (t.flags |= 2048),
            e !== null && I(va),
            null
          );
        case 24:
          return (
            (n = null),
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            z(sa),
            Ic(t),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(a(156, t.tag));
    }
    function Rc(e, t) {
      switch ((Mi(t), t.tag)) {
        case 1:
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
        case 3:
          return (
            z(sa),
            de(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 26:
        case 27:
        case 5:
          return (pe(t), null);
        case 31:
          if (t.memoizedState !== null) {
            if ((co(t), t.alternate === null)) throw Error(a(340));
            Ui();
          }
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
        case 13:
          if ((co(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
            if (t.alternate === null) throw Error(a(340));
            Ui();
          }
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
        case 19:
          return (I(lo), null);
        case 4:
          return (de(), null);
        case 10:
          return (z(t.type), null);
        case 22:
        case 23:
          return (
            co(t),
            no(),
            e !== null && I(va),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 24:
          return (z(sa), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function zc(e, t) {
      switch ((Mi(t), t.tag)) {
        case 3:
          (z(sa), de());
          break;
        case 26:
        case 27:
        case 5:
          pe(t);
          break;
        case 4:
          de();
          break;
        case 31:
          t.memoizedState !== null && co(t);
          break;
        case 13:
          co(t);
          break;
        case 19:
          I(lo);
          break;
        case 10:
          z(t.type);
          break;
        case 22:
        case 23:
          (co(t), no(), e !== null && I(va));
          break;
        case 24:
          z(sa);
      }
    }
    function Bc(e, t) {
      try {
        var n = t.updateQueue,
          r = n === null ? null : n.lastEffect;
        if (r !== null) {
          var i = r.next;
          n = i;
          do {
            if ((n.tag & e) === e) {
              r = void 0;
              var a = n.create,
                o = n.inst;
              ((r = a()), (o.destroy = r));
            }
            n = n.next;
          } while (n !== i);
        }
      } catch (e) {
        Q(t, t.return, e);
      }
    }
    function Vc(e, t, n) {
      try {
        var r = t.updateQueue,
          i = r === null ? null : r.lastEffect;
        if (i !== null) {
          var a = i.next;
          r = a;
          do {
            if ((r.tag & e) === e) {
              var o = r.inst,
                s = o.destroy;
              if (s !== void 0) {
                ((o.destroy = void 0), (i = t));
                var c = n,
                  l = s;
                try {
                  l();
                } catch (e) {
                  Q(i, c, e);
                }
              }
            }
            r = r.next;
          } while (r !== a);
        }
      } catch (e) {
        Q(t, t.return, e);
      }
    }
    function Hc(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var n = e.stateNode;
        try {
          Za(t, n);
        } catch (t) {
          Q(e, e.return, t);
        }
      }
    }
    function Uc(e, t, n) {
      ((n.props = Gs(e.type, e.memoizedProps)), (n.state = e.memoizedState));
      try {
        n.componentWillUnmount();
      } catch (n) {
        Q(e, t, n);
      }
    }
    function Wc(e, t) {
      try {
        var n = e.ref;
        if (n !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var r = e.stateNode;
              break;
            case 30:
              r = e.stateNode;
              break;
            default:
              r = e.stateNode;
          }
          typeof n == `function` ? (e.refCleanup = n(r)) : (n.current = r);
        }
      } catch (n) {
        Q(e, t, n);
      }
    }
    function Gc(e, t) {
      var n = e.ref,
        r = e.refCleanup;
      if (n !== null)
        if (typeof r == `function`)
          try {
            r();
          } catch (n) {
            Q(e, t, n);
          } finally {
            ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
          }
        else if (typeof n == `function`)
          try {
            n(null);
          } catch (n) {
            Q(e, t, n);
          }
        else n.current = null;
    }
    function Kc(e) {
      var t = e.type,
        n = e.memoizedProps,
        r = e.stateNode;
      try {
        a: switch (t) {
          case `button`:
          case `input`:
          case `select`:
          case `textarea`:
            n.autoFocus && r.focus();
            break a;
          case `img`:
            n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
        }
      } catch (t) {
        Q(e, e.return, t);
      }
    }
    function qc(e, t, n) {
      try {
        var r = e.stateNode;
        (Fd(r, e.type, n, t), (r[ct] = t));
      } catch (t) {
        Q(e, e.return, t);
      }
    }
    function Jc(e) {
      return (
        e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Zd(e.type)) || e.tag === 4
      );
    }
    function Yc(e) {
      a: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || Jc(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if ((e.tag === 27 && Zd(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
            continue a;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Xc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? (n.nodeType === 9
                ? n.body
                : n.nodeName === `HTML`
                  ? n.ownerDocument.body
                  : n
              ).insertBefore(e, t)
            : ((t = n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n),
              t.appendChild(e),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = en)));
      else if (
        r !== 4 &&
        (r === 27 && Zd(e.type) && ((n = e.stateNode), (t = null)), (e = e.child), e !== null)
      )
        for (Xc(e, t, n), e = e.sibling; e !== null; ) (Xc(e, t, n), (e = e.sibling));
    }
    function Zc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), (e = e.child), e !== null))
        for (Zc(e, t, n), e = e.sibling; e !== null; ) (Zc(e, t, n), (e = e.sibling));
    }
    function Qc(e) {
      var t = e.stateNode,
        n = e.memoizedProps;
      try {
        for (var r = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
        (Pd(t, r, n), (t[st] = e), (t[ct] = n));
      } catch (t) {
        Q(e, e.return, t);
      }
    }
    var $c = !1,
      el = !1,
      tl = !1,
      nl = typeof WeakSet == `function` ? WeakSet : Set,
      rl = null;
    function il(e, t) {
      if (((e = e.containerInfo), (Rd = sp), (e = Or(e)), kr(e))) {
        if (`selectionStart` in e) var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          a: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
              n = r.anchorNode;
              var i = r.anchorOffset,
                o = r.focusNode;
              r = r.focusOffset;
              try {
                (n.nodeType, o.nodeType);
              } catch {
                n = null;
                break a;
              }
              var s = 0,
                c = -1,
                l = -1,
                u = 0,
                d = 0,
                f = e,
                p = null;
              b: for (;;) {
                for (
                  var m;
                  f !== n || (i !== 0 && f.nodeType !== 3) || (c = s + i),
                    f !== o || (r !== 0 && f.nodeType !== 3) || (l = s + r),
                    f.nodeType === 3 && (s += f.nodeValue.length),
                    (m = f.firstChild) !== null;
                )
                  ((p = f), (f = m));
                for (;;) {
                  if (f === e) break b;
                  if (
                    (p === n && ++u === i && (c = s),
                    p === o && ++d === r && (l = s),
                    (m = f.nextSibling) !== null)
                  )
                    break;
                  ((f = p), (p = f.parentNode));
                }
                f = m;
              }
              n = c === -1 || l === -1 ? null : { start: c, end: l };
            } else n = null;
          }
        n ||= { start: 0, end: 0 };
      } else n = null;
      for (zd = { focusedElem: e, selectionRange: n }, sp = !1, rl = t; rl !== null; )
        if (((t = rl), (e = t.child), t.subtreeFlags & 1028 && e !== null))
          ((e.return = t), (rl = e));
        else
          for (; rl !== null; ) {
            switch (((t = rl), (o = t.alternate), (e = t.flags), t.tag)) {
              case 0:
                if (e & 4 && ((e = t.updateQueue), (e = e === null ? null : e.events), e !== null))
                  for (n = 0; n < e.length; n++) ((i = e[n]), (i.ref.impl = i.nextImpl));
                break;
              case 11:
              case 15:
                break;
              case 1:
                if (e & 1024 && o !== null) {
                  ((e = void 0),
                    (n = t),
                    (i = o.memoizedProps),
                    (o = o.memoizedState),
                    (r = n.stateNode));
                  try {
                    var h = Gs(n.type, i);
                    ((e = r.getSnapshotBeforeUpdate(h, o)),
                      (r.__reactInternalSnapshotBeforeUpdate = e));
                  } catch (e) {
                    Q(n, n.return, e);
                  }
                }
                break;
              case 3:
                if (e & 1024) {
                  if (((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)) ef(e);
                  else if (n === 1)
                    switch (e.nodeName) {
                      case `HEAD`:
                      case `HTML`:
                      case `BODY`:
                        ef(e);
                        break;
                      default:
                        e.textContent = ``;
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if (e & 1024) throw Error(a(163));
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (rl = e));
              break;
            }
            rl = t.return;
          }
    }
    function al(e, t, n) {
      var r = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (vl(e, n), r & 4 && Bc(5, n));
          break;
        case 1:
          if ((vl(e, n), r & 4))
            if (((e = n.stateNode), t === null))
              try {
                e.componentDidMount();
              } catch (e) {
                Q(n, n.return, e);
              }
            else {
              var i = Gs(n.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
              } catch (e) {
                Q(n, n.return, e);
              }
            }
          (r & 64 && Hc(n), r & 512 && Wc(n, n.return));
          break;
        case 3:
          if ((vl(e, n), r & 64 && ((e = n.updateQueue), e !== null))) {
            if (((t = null), n.child !== null))
              switch (n.child.tag) {
                case 27:
                case 5:
                  t = n.child.stateNode;
                  break;
                case 1:
                  t = n.child.stateNode;
              }
            try {
              Za(e, t);
            } catch (e) {
              Q(n, n.return, e);
            }
          }
          break;
        case 27:
          t === null && r & 4 && Qc(n);
        case 26:
        case 5:
          (vl(e, n), t === null && r & 4 && Kc(n), r & 512 && Wc(n, n.return));
          break;
        case 12:
          vl(e, n);
          break;
        case 31:
          (vl(e, n), r & 4 && ll(e, n));
          break;
        case 13:
          (vl(e, n),
            r & 4 && ul(e, n),
            r & 64 &&
              ((e = n.memoizedState),
              e !== null &&
                ((e = e.dehydrated), e !== null && ((n = qu.bind(null, n)), sf(e, n)))));
          break;
        case 22:
          if (((r = n.memoizedState !== null || $c), !r)) {
            ((t = (t !== null && t.memoizedState !== null) || el), (i = $c));
            var a = el;
            (($c = r),
              (el = t) && !a ? bl(e, n, (n.subtreeFlags & 8772) != 0) : vl(e, n),
              ($c = i),
              (el = a));
          }
          break;
        case 30:
          break;
        default:
          vl(e, n);
      }
    }
    function ol(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), ol(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 && ((t = e.stateNode), t !== null && ht(t)),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    var sl = null,
      K = !1;
    function q(e, t, n) {
      for (n = n.child; n !== null; ) (cl(e, t, n), (n = n.sibling));
    }
    function cl(e, t, n) {
      if (Ie && typeof Ie.onCommitFiberUnmount == `function`)
        try {
          Ie.onCommitFiberUnmount(Fe, n);
        } catch {}
      switch (n.tag) {
        case 26:
          (el || Gc(n, t),
            q(e, t, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
          break;
        case 27:
          el || Gc(n, t);
          var r = sl,
            i = K;
          (Zd(n.type) && ((sl = n.stateNode), (K = !1)),
            q(e, t, n),
            pf(n.stateNode),
            (sl = r),
            (K = i));
          break;
        case 5:
          el || Gc(n, t);
        case 6:
          if (((r = sl), (i = K), (sl = null), q(e, t, n), (sl = r), (K = i), sl !== null))
            if (K)
              try {
                (sl.nodeType === 9
                  ? sl.body
                  : sl.nodeName === `HTML`
                    ? sl.ownerDocument.body
                    : sl
                ).removeChild(n.stateNode);
              } catch (e) {
                Q(n, t, e);
              }
            else
              try {
                sl.removeChild(n.stateNode);
              } catch (e) {
                Q(n, t, e);
              }
          break;
        case 18:
          sl !== null &&
            (K
              ? ((e = sl),
                Qd(
                  e.nodeType === 9 ? e.body : e.nodeName === `HTML` ? e.ownerDocument.body : e,
                  n.stateNode
                ),
                Np(e))
              : Qd(sl, n.stateNode));
          break;
        case 4:
          ((r = sl),
            (i = K),
            (sl = n.stateNode.containerInfo),
            (K = !0),
            q(e, t, n),
            (sl = r),
            (K = i));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (Vc(2, n, t), el || Vc(4, n, t), q(e, t, n));
          break;
        case 1:
          (el ||
            (Gc(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == `function` && Uc(n, t, r)),
            q(e, t, n));
          break;
        case 21:
          q(e, t, n);
          break;
        case 22:
          ((el = (r = el) || n.memoizedState !== null), q(e, t, n), (el = r));
          break;
        default:
          q(e, t, n);
      }
    }
    function ll(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
      ) {
        e = e.dehydrated;
        try {
          Np(e);
        } catch (e) {
          Q(t, t.return, e);
        }
      }
    }
    function ul(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate),
        e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
      )
        try {
          Np(e);
        } catch (e) {
          Q(t, t.return, e);
        }
    }
    function dl(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return (t === null && (t = e.stateNode = new nl()), t);
        case 22:
          return (
            (e = e.stateNode),
            (t = e._retryCache),
            t === null && (t = e._retryCache = new nl()),
            t
          );
        default:
          throw Error(a(435, e.tag));
      }
    }
    function fl(e, t) {
      var n = dl(e);
      t.forEach(function (t) {
        if (!n.has(t)) {
          n.add(t);
          var r = Ju.bind(null, e, t);
          t.then(r, r);
        }
      });
    }
    function pl(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = e,
            s = t,
            c = s;
          a: for (; c !== null; ) {
            switch (c.tag) {
              case 27:
                if (Zd(c.type)) {
                  ((sl = c.stateNode), (K = !1));
                  break a;
                }
                break;
              case 5:
                ((sl = c.stateNode), (K = !1));
                break a;
              case 3:
              case 4:
                ((sl = c.stateNode.containerInfo), (K = !0));
                break a;
            }
            c = c.return;
          }
          if (sl === null) throw Error(a(160));
          (cl(o, s, i),
            (sl = null),
            (K = !1),
            (o = i.alternate),
            o !== null && (o.return = null),
            (i.return = null));
        }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (hl(t, e), (t = t.sibling));
    }
    var ml = null;
    function hl(e, t) {
      var n = e.alternate,
        r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (pl(t, e), gl(e), r & 4 && (Vc(3, e, e.return), Bc(3, e), Vc(5, e, e.return)));
          break;
        case 1:
          (pl(t, e),
            gl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            r & 64 &&
              $c &&
              ((e = e.updateQueue),
              e !== null &&
                ((r = e.callbacks),
                r !== null &&
                  ((n = e.shared.hiddenCallbacks),
                  (e.shared.hiddenCallbacks = n === null ? r : n.concat(r))))));
          break;
        case 26:
          var i = ml;
          if ((pl(t, e), gl(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 4)) {
            var o = n === null ? null : n.memoizedState;
            if (((r = e.memoizedState), n === null))
              if (r === null)
                if (e.stateNode === null) {
                  a: {
                    ((r = e.type), (n = e.memoizedProps), (i = i.ownerDocument || i));
                    b: switch (r) {
                      case `title`:
                        ((o = i.getElementsByTagName(`title`)[0]),
                          (!o ||
                            o[mt] ||
                            o[st] ||
                            o.namespaceURI === `http://www.w3.org/2000/svg` ||
                            o.hasAttribute(`itemprop`)) &&
                            ((o = i.createElement(r)),
                            i.head.insertBefore(o, i.querySelector(`head > title`))),
                          Pd(o, r, n),
                          (o[st] = e),
                          bt(o),
                          (r = o));
                        break a;
                      case `link`:
                        var s = Vf(`link`, `href`, i).get(r + (n.href || ``));
                        if (s) {
                          for (var c = 0; c < s.length; c++)
                            if (
                              ((o = s[c]),
                              o.getAttribute(`href`) ===
                                (n.href == null || n.href === `` ? null : n.href) &&
                                o.getAttribute(`rel`) === (n.rel == null ? null : n.rel) &&
                                o.getAttribute(`title`) === (n.title == null ? null : n.title) &&
                                o.getAttribute(`crossorigin`) ===
                                  (n.crossOrigin == null ? null : n.crossOrigin))
                            ) {
                              s.splice(c, 1);
                              break b;
                            }
                        }
                        ((o = i.createElement(r)), Pd(o, r, n), i.head.appendChild(o));
                        break;
                      case `meta`:
                        if ((s = Vf(`meta`, `content`, i).get(r + (n.content || ``)))) {
                          for (c = 0; c < s.length; c++)
                            if (
                              ((o = s[c]),
                              o.getAttribute(`content`) ===
                                (n.content == null ? null : `` + n.content) &&
                                o.getAttribute(`name`) === (n.name == null ? null : n.name) &&
                                o.getAttribute(`property`) ===
                                  (n.property == null ? null : n.property) &&
                                o.getAttribute(`http-equiv`) ===
                                  (n.httpEquiv == null ? null : n.httpEquiv) &&
                                o.getAttribute(`charset`) ===
                                  (n.charSet == null ? null : n.charSet))
                            ) {
                              s.splice(c, 1);
                              break b;
                            }
                        }
                        ((o = i.createElement(r)), Pd(o, r, n), i.head.appendChild(o));
                        break;
                      default:
                        throw Error(a(468, r));
                    }
                    ((o[st] = e), bt(o), (r = o));
                  }
                  e.stateNode = r;
                } else Hf(i, e.type, e.stateNode);
              else e.stateNode = If(i, r, e.memoizedProps);
            else
              o === r
                ? r === null && e.stateNode !== null && qc(e, e.memoizedProps, n.memoizedProps)
                : (o === null
                    ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                    : o.count--,
                  r === null ? Hf(i, e.type, e.stateNode) : If(i, r, e.memoizedProps));
          }
          break;
        case 27:
          (pl(t, e),
            gl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            n !== null && r & 4 && qc(e, e.memoizedProps, n.memoizedProps));
          break;
        case 5:
          if ((pl(t, e), gl(e), r & 512 && (el || n === null || Gc(n, n.return)), e.flags & 32)) {
            i = e.stateNode;
            try {
              Kt(i, ``);
            } catch (t) {
              Q(e, e.return, t);
            }
          }
          (r & 4 &&
            e.stateNode != null &&
            ((i = e.memoizedProps), qc(e, i, n === null ? i : n.memoizedProps)),
            r & 1024 && (tl = !0));
          break;
        case 6:
          if ((pl(t, e), gl(e), r & 4)) {
            if (e.stateNode === null) throw Error(a(162));
            ((r = e.memoizedProps), (n = e.stateNode));
            try {
              n.nodeValue = r;
            } catch (t) {
              Q(e, e.return, t);
            }
          }
          break;
        case 3:
          if (
            ((Bf = null),
            (i = ml),
            (ml = gf(t.containerInfo)),
            pl(t, e),
            (ml = i),
            gl(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Np(t.containerInfo);
            } catch (t) {
              Q(e, e.return, t);
            }
          tl && ((tl = !1), _l(e));
          break;
        case 4:
          ((r = ml), (ml = gf(e.stateNode.containerInfo)), pl(t, e), gl(e), (ml = r));
          break;
        case 12:
          (pl(t, e), gl(e));
          break;
        case 31:
          (pl(t, e),
            gl(e),
            r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), fl(e, r))));
          break;
        case 13:
          (pl(t, e),
            gl(e),
            e.child.flags & 8192 &&
              (e.memoizedState !== null) != (n !== null && n.memoizedState !== null) &&
              (Ql = Ee()),
            r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), fl(e, r))));
          break;
        case 22:
          i = e.memoizedState !== null;
          var l = n !== null && n.memoizedState !== null,
            u = $c,
            d = el;
          if ((($c = u || i), (el = d || l), pl(t, e), (el = d), ($c = u), gl(e), r & 8192))
            a: for (
              t = e.stateNode,
                t._visibility = i ? t._visibility & -2 : t._visibility | 1,
                i && (n === null || l || $c || el || yl(e)),
                n = null,
                t = e;
              ;
            ) {
              if (t.tag === 5 || t.tag === 26) {
                if (n === null) {
                  l = n = t;
                  try {
                    if (((o = l.stateNode), i))
                      ((s = o.style),
                        typeof s.setProperty == `function`
                          ? s.setProperty(`display`, `none`, `important`)
                          : (s.display = `none`));
                    else {
                      c = l.stateNode;
                      var f = l.memoizedProps.style,
                        p = f != null && f.hasOwnProperty(`display`) ? f.display : null;
                      c.style.display = p == null || typeof p == `boolean` ? `` : (`` + p).trim();
                    }
                  } catch (e) {
                    Q(l, l.return, e);
                  }
                }
              } else if (t.tag === 6) {
                if (n === null) {
                  l = t;
                  try {
                    l.stateNode.nodeValue = i ? `` : l.memoizedProps;
                  } catch (e) {
                    Q(l, l.return, e);
                  }
                }
              } else if (t.tag === 18) {
                if (n === null) {
                  l = t;
                  try {
                    var m = l.stateNode;
                    i ? $d(m, !0) : $d(l.stateNode, !1);
                  } catch (e) {
                    Q(l, l.return, e);
                  }
                }
              } else if (
                ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
                t.child !== null
              ) {
                ((t.child.return = t), (t = t.child));
                continue;
              }
              if (t === e) break a;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) break a;
                (n === t && (n = null), (t = t.return));
              }
              (n === t && (n = null), (t.sibling.return = t.return), (t = t.sibling));
            }
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((n = r.retryQueue), n !== null && ((r.retryQueue = null), fl(e, n))));
          break;
        case 19:
          (pl(t, e),
            gl(e),
            r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), fl(e, r))));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          (pl(t, e), gl(e));
      }
    }
    function gl(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var n, r = e.return; r !== null; ) {
            if (Jc(r)) {
              n = r;
              break;
            }
            r = r.return;
          }
          if (n == null) throw Error(a(160));
          switch (n.tag) {
            case 27:
              var i = n.stateNode;
              Zc(e, Yc(e), i);
              break;
            case 5:
              var o = n.stateNode;
              (n.flags & 32 && (Kt(o, ``), (n.flags &= -33)), Zc(e, Yc(e), o));
              break;
            case 3:
            case 4:
              var s = n.stateNode.containerInfo;
              Xc(e, Yc(e), s);
              break;
            default:
              throw Error(a(161));
          }
        } catch (t) {
          Q(e, e.return, t);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function _l(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          (_l(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
        }
    }
    function vl(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; ) (al(e, t.alternate, t), (t = t.sibling));
    }
    function yl(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (Vc(4, t, t.return), yl(t));
            break;
          case 1:
            Gc(t, t.return);
            var n = t.stateNode;
            (typeof n.componentWillUnmount == `function` && Uc(t, t.return, n), yl(t));
            break;
          case 27:
            pf(t.stateNode);
          case 26:
          case 5:
            (Gc(t, t.return), yl(t));
            break;
          case 22:
            t.memoizedState === null && yl(t);
            break;
          case 30:
            yl(t);
            break;
          default:
            yl(t);
        }
        e = e.sibling;
      }
    }
    function bl(e, t, n) {
      for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null; ) {
        var r = t.alternate,
          i = e,
          a = t,
          o = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            (bl(i, a, n), Bc(4, a));
            break;
          case 1:
            if ((bl(i, a, n), (r = a), (i = r.stateNode), typeof i.componentDidMount == `function`))
              try {
                i.componentDidMount();
              } catch (e) {
                Q(r, r.return, e);
              }
            if (((r = a), (i = r.updateQueue), i !== null)) {
              var s = r.stateNode;
              try {
                var c = i.shared.hiddenCallbacks;
                if (c !== null)
                  for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Xa(c[i], s);
              } catch (e) {
                Q(r, r.return, e);
              }
            }
            (n && o & 64 && Hc(a), Wc(a, a.return));
            break;
          case 27:
            Qc(a);
          case 26:
          case 5:
            (bl(i, a, n), n && r === null && o & 4 && Kc(a), Wc(a, a.return));
            break;
          case 12:
            bl(i, a, n);
            break;
          case 31:
            (bl(i, a, n), n && o & 4 && ll(i, a));
            break;
          case 13:
            (bl(i, a, n), n && o & 4 && ul(i, a));
            break;
          case 22:
            (a.memoizedState === null && bl(i, a, n), Wc(a, a.return));
            break;
          case 30:
            break;
          default:
            bl(i, a, n);
        }
        t = t.sibling;
      }
    }
    function xl(e, t) {
      var n = null;
      (e !== null &&
        e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (n = e.memoizedState.cachePool.pool),
        (e = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++, n != null && la(n)));
    }
    function Sl(e, t) {
      ((e = null),
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== e && (t.refCount++, e != null && la(e)));
    }
    function Cl(e, t, n, r) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (wl(e, t, n, r), (t = t.sibling));
    }
    function wl(e, t, n, r) {
      var i = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Cl(e, t, n, r), i & 2048 && Bc(9, t));
          break;
        case 1:
          Cl(e, t, n, r);
          break;
        case 3:
          (Cl(e, t, n, r),
            i & 2048 &&
              ((e = null),
              t.alternate !== null && (e = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache),
              t !== e && (t.refCount++, e != null && la(e))));
          break;
        case 12:
          if (i & 2048) {
            (Cl(e, t, n, r), (e = t.stateNode));
            try {
              var a = t.memoizedProps,
                o = a.id,
                s = a.onPostCommit;
              typeof s == `function` &&
                s(o, t.alternate === null ? `mount` : `update`, e.passiveEffectDuration, -0);
            } catch (e) {
              Q(t, t.return, e);
            }
          } else Cl(e, t, n, r);
          break;
        case 31:
          Cl(e, t, n, r);
          break;
        case 13:
          Cl(e, t, n, r);
          break;
        case 23:
          break;
        case 22:
          ((a = t.stateNode),
            (o = t.alternate),
            t.memoizedState === null
              ? a._visibility & 2
                ? Cl(e, t, n, r)
                : ((a._visibility |= 2), Tl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1))
              : a._visibility & 2
                ? Cl(e, t, n, r)
                : El(e, t),
            i & 2048 && xl(o, t));
          break;
        case 24:
          (Cl(e, t, n, r), i & 2048 && Sl(t.alternate, t));
          break;
        default:
          Cl(e, t, n, r);
      }
    }
    function Tl(e, t, n, r, i) {
      for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null; ) {
        var a = e,
          o = t,
          s = n,
          c = r,
          l = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            (Tl(a, o, s, c, i), Bc(8, o));
            break;
          case 23:
            break;
          case 22:
            var u = o.stateNode;
            (o.memoizedState === null
              ? ((u._visibility |= 2), Tl(a, o, s, c, i))
              : u._visibility & 2
                ? Tl(a, o, s, c, i)
                : El(a, o),
              i && l & 2048 && xl(o.alternate, o));
            break;
          case 24:
            (Tl(a, o, s, c, i), i && l & 2048 && Sl(o.alternate, o));
            break;
          default:
            Tl(a, o, s, c, i);
        }
        t = t.sibling;
      }
    }
    function El(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var n = e,
            r = t,
            i = r.flags;
          switch (r.tag) {
            case 22:
              (El(n, r), i & 2048 && xl(r.alternate, r));
              break;
            case 24:
              (El(n, r), i & 2048 && Sl(r.alternate, r));
              break;
            default:
              El(n, r);
          }
          t = t.sibling;
        }
    }
    var Dl = 8192;
    function Ol(e, t, n) {
      if (e.subtreeFlags & Dl) for (e = e.child; e !== null; ) (kl(e, t, n), (e = e.sibling));
    }
    function kl(e, t, n) {
      switch (e.tag) {
        case 26:
          (Ol(e, t, n),
            e.flags & Dl &&
              e.memoizedState !== null &&
              Gf(n, ml, e.memoizedState, e.memoizedProps));
          break;
        case 5:
          Ol(e, t, n);
          break;
        case 3:
        case 4:
          var r = ml;
          ((ml = gf(e.stateNode.containerInfo)), Ol(e, t, n), (ml = r));
          break;
        case 22:
          e.memoizedState === null &&
            ((r = e.alternate),
            r !== null && r.memoizedState !== null
              ? ((r = Dl), (Dl = 16777216), Ol(e, t, n), (Dl = r))
              : Ol(e, t, n));
          break;
        default:
          Ol(e, t, n);
      }
    }
    function Al(e) {
      var t = e.alternate;
      if (t !== null && ((e = t.child), e !== null)) {
        t.child = null;
        do ((t = e.sibling), (e.sibling = null), (e = t));
        while (e !== null);
      }
    }
    function jl(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            ((rl = r), Pl(r, e));
          }
        Al(e);
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Ml(e), (e = e.sibling));
    }
    function Ml(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          (jl(e), e.flags & 2048 && Vc(9, e, e.return));
          break;
        case 3:
          jl(e);
          break;
        case 12:
          jl(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null &&
          t._visibility & 2 &&
          (e.return === null || e.return.tag !== 13)
            ? ((t._visibility &= -3), Nl(e))
            : jl(e);
          break;
        default:
          jl(e);
      }
    }
    function Nl(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            ((rl = r), Pl(r, e));
          }
        Al(e);
      }
      for (e = e.child; e !== null; ) {
        switch (((t = e), t.tag)) {
          case 0:
          case 11:
          case 15:
            (Vc(8, t, t.return), Nl(t));
            break;
          case 22:
            ((n = t.stateNode), n._visibility & 2 && ((n._visibility &= -3), Nl(t)));
            break;
          default:
            Nl(t);
        }
        e = e.sibling;
      }
    }
    function Pl(e, t) {
      for (; rl !== null; ) {
        var n = rl;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Vc(8, n, t);
            break;
          case 23:
          case 22:
            if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
              var r = n.memoizedState.cachePool.pool;
              r != null && r.refCount++;
            }
            break;
          case 24:
            la(n.memoizedState.cache);
        }
        if (((r = n.child), r !== null)) ((r.return = n), (rl = r));
        else
          a: for (n = e; rl !== null; ) {
            r = rl;
            var i = r.sibling,
              a = r.return;
            if ((ol(r), r === n)) {
              rl = null;
              break a;
            }
            if (i !== null) {
              ((i.return = a), (rl = i));
              break a;
            }
            rl = a;
          }
      }
    }
    var Fl = {
        getCacheForType: function (e) {
          var t = ta(sa),
            n = t.data.get(e);
          return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
        },
        cacheSignal: function () {
          return ta(sa).controller.signal;
        },
      },
      Il = typeof WeakMap == `function` ? WeakMap : Map,
      J = 0,
      Ll = null,
      Y = null,
      X = 0,
      Z = 0,
      Rl = null,
      zl = !1,
      Bl = !1,
      Vl = !1,
      Hl = 0,
      Ul = 0,
      Wl = 0,
      Gl = 0,
      Kl = 0,
      ql = 0,
      Jl = 0,
      Yl = null,
      Xl = null,
      Zl = !1,
      Ql = 0,
      $l = 0,
      eu = 1 / 0,
      tu = null,
      nu = null,
      ru = 0,
      iu = null,
      au = null,
      ou = 0,
      su = 0,
      cu = null,
      lu = null,
      uu = 0,
      du = null;
    function fu() {
      return J & 2 && X !== 0 ? X & -X : M.T === null ? it() : ud();
    }
    function pu() {
      if (ql === 0)
        if (!(X & 536870912) || R) {
          var e = Ue;
          ((Ue <<= 1), !(Ue & 3932160) && (Ue = 262144), (ql = e));
        } else ql = 536870912;
      return ((e = ro.current), e !== null && (e.flags |= 32), ql);
    }
    function mu(e, t, n) {
      (((e === Ll && (Z === 2 || Z === 9)) || e.cancelPendingCommit !== null) &&
        (xu(e, 0), vu(e, X, ql, !1)),
        Ze(e, n),
        (!(J & 2) || e !== Ll) &&
          (e === Ll && (!(J & 2) && (Gl |= n), Ul === 4 && vu(e, X, ql, !1)), nd(e)));
    }
    function hu(e, t, n) {
      if (J & 6) throw Error(a(327));
      var r = (!n && (t & 127) == 0 && (t & e.expiredLanes) === 0) || qe(e, t),
        i = r ? ku(e, t) : Du(e, t, !0),
        o = r;
      do {
        if (i === 0) {
          Bl && !r && vu(e, t, 0, !1);
          break;
        } else {
          if (((n = e.current.alternate), o && !_u(n))) {
            ((i = Du(e, t, !1)), (o = !1));
            continue;
          }
          if (i === 2) {
            if (((o = t), e.errorRecoveryDisabledLanes & o)) var s = 0;
            else
              ((s = e.pendingLanes & -536870913),
                (s = s === 0 ? (s & 536870912 ? 536870912 : 0) : s));
            if (s !== 0) {
              t = s;
              a: {
                var c = e;
                i = Yl;
                var l = c.current.memoizedState.isDehydrated;
                if ((l && (xu(c, s).flags |= 256), (s = Du(c, s, !1)), s !== 2)) {
                  if (Vl && !l) {
                    ((c.errorRecoveryDisabledLanes |= o), (Gl |= o), (i = 4));
                    break a;
                  }
                  ((o = Xl),
                    (Xl = i),
                    o !== null && (Xl === null ? (Xl = o) : Xl.push.apply(Xl, o)));
                }
                i = s;
              }
              if (((o = !1), i !== 2)) continue;
            }
          }
          if (i === 1) {
            (xu(e, 0), vu(e, t, 0, !0));
            break;
          }
          a: {
            switch (((r = e), (o = i), o)) {
              case 0:
              case 1:
                throw Error(a(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                vu(r, t, ql, !zl);
                break a;
              case 2:
                Xl = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(a(329));
            }
            if ((t & 62914560) === t && ((i = Ql + 300 - Ee()), 10 < i)) {
              if ((vu(r, t, ql, !zl), Ke(r, 0, !0) !== 0)) break a;
              ((ou = t),
                (r.timeoutHandle = Kd(
                  gu.bind(null, r, n, Xl, tu, Zl, t, ql, Gl, Jl, zl, o, `Throttled`, -0, 0),
                  i
                )));
              break a;
            }
            gu(r, n, Xl, tu, Zl, t, ql, Gl, Jl, zl, o, null, -0, 0);
          }
        }
        break;
      } while (1);
      nd(e);
    }
    function gu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
      if (((e.timeoutHandle = -1), (d = t.subtreeFlags), d & 8192 || (d & 16785408) == 16785408)) {
        ((d = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: en,
        }),
          kl(t, a, d));
        var m = (a & 62914560) === a ? Ql - Ee() : (a & 4194048) === a ? $l - Ee() : 0;
        if (((m = qf(d, m)), m !== null)) {
          ((ou = a),
            (e.cancelPendingCommit = m(Iu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p))),
            vu(e, a, o, !l));
          return;
        }
      }
      Iu(e, t, a, n, r, i, o, s, c);
    }
    function _u(e) {
      for (var t = e; ; ) {
        var n = t.tag;
        if (
          (n === 0 || n === 11 || n === 15) &&
          t.flags & 16384 &&
          ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
        )
          for (var r = 0; r < n.length; r++) {
            var i = n[r],
              a = i.getSnapshot;
            i = i.value;
            try {
              if (!Cr(a(), i)) return !1;
            } catch {
              return !1;
            }
          }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function vu(e, t, n, r) {
      ((t &= ~Kl),
        (t &= ~Gl),
        (e.suspendedLanes |= t),
        (e.pingedLanes &= ~t),
        r && (e.warmLanes |= t),
        (r = e.expirationTimes));
      for (var i = t; 0 < i; ) {
        var a = 31 - Re(i),
          o = 1 << a;
        ((r[a] = -1), (i &= ~o));
      }
      n !== 0 && $e(e, n, t);
    }
    function yu() {
      return J & 6 ? !0 : (rd(0, !1), !1);
    }
    function bu() {
      if (Y !== null) {
        if (Z === 0) var e = Y.return;
        else ((e = Y), (Ji = qi = null), W(e), (Ma = null), (Na = 0), (e = Y));
        for (; e !== null; ) (zc(e.alternate, e), (e = e.return));
        Y = null;
      }
    }
    function xu(e, t) {
      var n = e.timeoutHandle;
      (n !== -1 && ((e.timeoutHandle = -1), qd(n)),
        (n = e.cancelPendingCommit),
        n !== null && ((e.cancelPendingCommit = null), n()),
        (ou = 0),
        bu(),
        (Ll = e),
        (Y = n = di(e.current, null)),
        (X = t),
        (Z = 0),
        (Rl = null),
        (zl = !1),
        (Bl = qe(e, t)),
        (Vl = !1),
        (Jl = ql = Kl = Gl = Wl = Ul = 0),
        (Xl = Yl = null),
        (Zl = !1),
        t & 8 && (t |= t & 32));
      var r = e.entangledLanes;
      if (r !== 0)
        for (e = e.entanglements, r &= t; 0 < r; ) {
          var i = 31 - Re(r),
            a = 1 << i;
          ((t |= e[i]), (r &= ~a));
        }
      return ((Hl = t), ti(), n);
    }
    function Su(e, t) {
      ((V = null),
        (M.H = Ls),
        t === Sa || t === wa
          ? ((t = Aa()), (Z = 3))
          : t === Ca
            ? ((t = Aa()), (Z = 4))
            : (Z = t === tc ? 8 : typeof t == `object` && t && typeof t.then == `function` ? 6 : 1),
        (Rl = t),
        Y === null && ((Ul = 1), Ys(e, yi(t, e.current))));
    }
    function Cu() {
      var e = ro.current;
      return e === null
        ? !0
        : (X & 4194048) === X
          ? B === null
          : (X & 62914560) === X || X & 536870912
            ? e === B
            : !1;
    }
    function wu() {
      var e = M.H;
      return ((M.H = Ls), e === null ? Ls : e);
    }
    function Tu() {
      var e = M.A;
      return ((M.A = Fl), e);
    }
    function Eu() {
      ((Ul = 4),
        zl || ((X & 4194048) !== X && ro.current !== null) || (Bl = !0),
        (!(Wl & 134217727) && !(Gl & 134217727)) || Ll === null || vu(Ll, X, ql, !1));
    }
    function Du(e, t, n) {
      var r = J;
      J |= 2;
      var i = wu(),
        a = Tu();
      ((Ll !== e || X !== t) && ((tu = null), xu(e, t)), (t = !1));
      var o = Ul;
      a: do
        try {
          if (Z !== 0 && Y !== null) {
            var s = Y,
              c = Rl;
            switch (Z) {
              case 8:
                (bu(), (o = 6));
                break a;
              case 3:
              case 2:
              case 9:
              case 6:
                ro.current === null && (t = !0);
                var l = Z;
                if (((Z = 0), (Rl = null), Nu(e, s, c, l), n && Bl)) {
                  o = 0;
                  break a;
                }
                break;
              default:
                ((l = Z), (Z = 0), (Rl = null), Nu(e, s, c, l));
            }
          }
          (Ou(), (o = Ul));
          break;
        } catch (t) {
          Su(e, t);
        }
      while (1);
      return (
        t && e.shellSuspendCounter++,
        (Ji = qi = null),
        (J = r),
        (M.H = i),
        (M.A = a),
        Y === null && ((Ll = null), (X = 0), ti()),
        o
      );
    }
    function Ou() {
      for (; Y !== null; ) ju(Y);
    }
    function ku(e, t) {
      var n = J;
      J |= 2;
      var r = wu(),
        i = Tu();
      Ll !== e || X !== t ? ((tu = null), (eu = Ee() + 500), xu(e, t)) : (Bl = qe(e, t));
      a: do
        try {
          if (Z !== 0 && Y !== null) {
            t = Y;
            var o = Rl;
            b: switch (Z) {
              case 1:
                ((Z = 0), (Rl = null), Nu(e, t, o, 1));
                break;
              case 2:
              case 9:
                if (Ea(o)) {
                  ((Z = 0), (Rl = null), Mu(t));
                  break;
                }
                ((t = function () {
                  ((Z !== 2 && Z !== 9) || Ll !== e || (Z = 7), nd(e));
                }),
                  o.then(t, t));
                break a;
              case 3:
                Z = 7;
                break a;
              case 4:
                Z = 5;
                break a;
              case 7:
                Ea(o) ? ((Z = 0), (Rl = null), Mu(t)) : ((Z = 0), (Rl = null), Nu(e, t, o, 7));
                break;
              case 5:
                var s = null;
                switch (Y.tag) {
                  case 26:
                    s = Y.memoizedState;
                  case 5:
                  case 27:
                    var c = Y;
                    if (s ? Wf(s) : c.stateNode.complete) {
                      ((Z = 0), (Rl = null));
                      var l = c.sibling;
                      if (l !== null) Y = l;
                      else {
                        var u = c.return;
                        u === null ? (Y = null) : ((Y = u), Pu(u));
                      }
                      break b;
                    }
                }
                ((Z = 0), (Rl = null), Nu(e, t, o, 5));
                break;
              case 6:
                ((Z = 0), (Rl = null), Nu(e, t, o, 6));
                break;
              case 8:
                (bu(), (Ul = 6));
                break a;
              default:
                throw Error(a(462));
            }
          }
          Au();
          break;
        } catch (t) {
          Su(e, t);
        }
      while (1);
      return (
        (Ji = qi = null),
        (M.H = r),
        (M.A = i),
        (J = n),
        Y === null ? ((Ll = null), (X = 0), ti(), Ul) : 0
      );
    }
    function Au() {
      for (; Y !== null && !we(); ) ju(Y);
    }
    function ju(e) {
      var t = Ac(e.alternate, e, Hl);
      ((e.memoizedProps = e.pendingProps), t === null ? Pu(e) : (Y = t));
    }
    function Mu(e) {
      var t = e,
        n = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = mc(n, t, t.pendingProps, t.type, void 0, X);
          break;
        case 11:
          t = mc(n, t, t.pendingProps, t.type.render, t.ref, X);
          break;
        case 5:
          W(t);
        default:
          (zc(n, t), (t = Y = fi(t, Hl)), (t = Ac(n, t, Hl)));
      }
      ((e.memoizedProps = e.pendingProps), t === null ? Pu(e) : (Y = t));
    }
    function Nu(e, t, n, r) {
      ((Ji = qi = null), W(t), (Ma = null), (Na = 0));
      var i = t.return;
      try {
        if (ec(e, i, t, n, X)) {
          ((Ul = 1), Ys(e, yi(n, e.current)), (Y = null));
          return;
        }
      } catch (t) {
        if (i !== null) throw ((Y = i), t);
        ((Ul = 1), Ys(e, yi(n, e.current)), (Y = null));
        return;
      }
      t.flags & 32768
        ? (R || r === 1
            ? (e = !0)
            : Bl || X & 536870912
              ? (e = !1)
              : ((zl = e = !0),
                (r === 2 || r === 9 || r === 3 || r === 6) &&
                  ((r = ro.current), r !== null && r.tag === 13 && (r.flags |= 16384))),
          Fu(t, e))
        : Pu(t);
    }
    function Pu(e) {
      var t = e;
      do {
        if (t.flags & 32768) {
          Fu(t, zl);
          return;
        }
        e = t.return;
        var n = Lc(t.alternate, t, Hl);
        if (n !== null) {
          Y = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Y = t;
          return;
        }
        Y = t = e;
      } while (t !== null);
      Ul === 0 && (Ul = 5);
    }
    function Fu(e, t) {
      do {
        var n = Rc(e.alternate, e);
        if (n !== null) {
          ((n.flags &= 32767), (Y = n));
          return;
        }
        if (
          ((n = e.return),
          n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !t && ((e = e.sibling), e !== null))
        ) {
          Y = e;
          return;
        }
        Y = e = n;
      } while (e !== null);
      ((Ul = 6), (Y = null));
    }
    function Iu(e, t, n, r, i, o, s, c, l) {
      e.cancelPendingCommit = null;
      do Vu();
      while (ru !== 0);
      if (J & 6) throw Error(a(327));
      if (t !== null) {
        if (t === e.current) throw Error(a(177));
        if (
          ((o = t.lanes | t.childLanes),
          (o |= ei),
          Qe(e, n, o, s, c, l),
          e === Ll && ((Y = Ll = null), (X = 0)),
          (au = t),
          (iu = e),
          (ou = n),
          (su = o),
          (cu = i),
          (lu = r),
          t.subtreeFlags & 10256 || t.flags & 10256
            ? ((e.callbackNode = null),
              (e.callbackPriority = 0),
              Yu(Ae, function () {
                return (Hu(), null);
              }))
            : ((e.callbackNode = null), (e.callbackPriority = 0)),
          (r = (t.flags & 13878) != 0),
          t.subtreeFlags & 13878 || r)
        ) {
          ((r = M.T), (M.T = null), (i = N.p), (N.p = 2), (s = J), (J |= 4));
          try {
            il(e, t, n);
          } finally {
            ((J = s), (N.p = i), (M.T = r));
          }
        }
        ((ru = 1), Lu(), Ru(), zu());
      }
    }
    function Lu() {
      if (ru === 1) {
        ru = 0;
        var e = iu,
          t = au,
          n = (t.flags & 13878) != 0;
        if (t.subtreeFlags & 13878 || n) {
          ((n = M.T), (M.T = null));
          var r = N.p;
          N.p = 2;
          var i = J;
          J |= 4;
          try {
            hl(t, e);
            var a = zd,
              o = Or(e.containerInfo),
              s = a.focusedElem,
              c = a.selectionRange;
            if (o !== s && s && s.ownerDocument && Dr(s.ownerDocument.documentElement, s)) {
              if (c !== null && kr(s)) {
                var l = c.start,
                  u = c.end;
                if ((u === void 0 && (u = l), `selectionStart` in s))
                  ((s.selectionStart = l), (s.selectionEnd = Math.min(u, s.value.length)));
                else {
                  var d = s.ownerDocument || document,
                    f = (d && d.defaultView) || window;
                  if (f.getSelection) {
                    var p = f.getSelection(),
                      m = s.textContent.length,
                      h = Math.min(c.start, m),
                      g = c.end === void 0 ? h : Math.min(c.end, m);
                    !p.extend && h > g && ((o = g), (g = h), (h = o));
                    var _ = Er(s, h),
                      v = Er(s, g);
                    if (
                      _ &&
                      v &&
                      (p.rangeCount !== 1 ||
                        p.anchorNode !== _.node ||
                        p.anchorOffset !== _.offset ||
                        p.focusNode !== v.node ||
                        p.focusOffset !== v.offset)
                    ) {
                      var y = d.createRange();
                      (y.setStart(_.node, _.offset),
                        p.removeAllRanges(),
                        h > g
                          ? (p.addRange(y), p.extend(v.node, v.offset))
                          : (y.setEnd(v.node, v.offset), p.addRange(y)));
                    }
                  }
                }
              }
              for (d = [], p = s; (p = p.parentNode); )
                p.nodeType === 1 && d.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
              for (typeof s.focus == `function` && s.focus(), s = 0; s < d.length; s++) {
                var b = d[s];
                ((b.element.scrollLeft = b.left), (b.element.scrollTop = b.top));
              }
            }
            ((sp = !!Rd), (zd = Rd = null));
          } finally {
            ((J = i), (N.p = r), (M.T = n));
          }
        }
        ((e.current = t), (ru = 2));
      }
    }
    function Ru() {
      if (ru === 2) {
        ru = 0;
        var e = iu,
          t = au,
          n = (t.flags & 8772) != 0;
        if (t.subtreeFlags & 8772 || n) {
          ((n = M.T), (M.T = null));
          var r = N.p;
          N.p = 2;
          var i = J;
          J |= 4;
          try {
            al(e, t.alternate, t);
          } finally {
            ((J = i), (N.p = r), (M.T = n));
          }
        }
        ru = 3;
      }
    }
    function zu() {
      if (ru === 4 || ru === 3) {
        ((ru = 0), Te());
        var e = iu,
          t = au,
          n = ou,
          r = lu;
        t.subtreeFlags & 10256 || t.flags & 10256
          ? (ru = 5)
          : ((ru = 0), (au = iu = null), Bu(e, e.pendingLanes));
        var i = e.pendingLanes;
        if (
          (i === 0 && (nu = null),
          rt(n),
          (t = t.stateNode),
          Ie && typeof Ie.onCommitFiberRoot == `function`)
        )
          try {
            Ie.onCommitFiberRoot(Fe, t, void 0, (t.current.flags & 128) == 128);
          } catch {}
        if (r !== null) {
          ((t = M.T), (i = N.p), (N.p = 2), (M.T = null));
          try {
            for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
              var s = r[o];
              a(s.value, { componentStack: s.stack });
            }
          } finally {
            ((M.T = t), (N.p = i));
          }
        }
        (ou & 3 && Vu(),
          nd(e),
          (i = e.pendingLanes),
          n & 261930 && i & 42 ? (e === du ? uu++ : ((uu = 0), (du = e))) : (uu = 0),
          rd(0, !1));
      }
    }
    function Bu(e, t) {
      (e.pooledCacheLanes &= t) === 0 &&
        ((t = e.pooledCache), t != null && ((e.pooledCache = null), la(t)));
    }
    function Vu() {
      return (Lu(), Ru(), zu(), Hu());
    }
    function Hu() {
      if (ru !== 5) return !1;
      var e = iu,
        t = su;
      su = 0;
      var n = rt(ou),
        r = M.T,
        i = N.p;
      try {
        ((N.p = 32 > n ? 32 : n), (M.T = null), (n = cu), (cu = null));
        var o = iu,
          s = ou;
        if (((ru = 0), (au = iu = null), (ou = 0), J & 6)) throw Error(a(331));
        var c = J;
        if (
          ((J |= 4),
          Ml(o.current),
          wl(o, o.current, s, n),
          (J = c),
          rd(0, !1),
          Ie && typeof Ie.onPostCommitFiberRoot == `function`)
        )
          try {
            Ie.onPostCommitFiberRoot(Fe, o);
          } catch {}
        return !0;
      } finally {
        ((N.p = i), (M.T = r), Bu(e, t));
      }
    }
    function Uu(e, t, n) {
      ((t = yi(n, t)),
        (t = Zs(e.stateNode, t, 2)),
        (e = Wa(e, t, 2)),
        e !== null && (Ze(e, 2), nd(e)));
    }
    function Q(e, t, n) {
      if (e.tag === 3) Uu(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Uu(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == `function` ||
              (typeof r.componentDidCatch == `function` && (nu === null || !nu.has(r)))
            ) {
              ((e = yi(n, e)),
                (n = Qs(2)),
                (r = Wa(t, n, 2)),
                r !== null && ($s(n, r, t, e), Ze(r, 2), nd(r)));
              break;
            }
          }
          t = t.return;
        }
    }
    function Wu(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new Il();
        var i = new Set();
        r.set(t, i);
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
      i.has(n) || ((Vl = !0), i.add(n), (e = Gu.bind(null, e, t, n)), t.then(e, e));
    }
    function Gu(e, t, n) {
      var r = e.pingCache;
      (r !== null && r.delete(t),
        (e.pingedLanes |= e.suspendedLanes & n),
        (e.warmLanes &= ~n),
        Ll === e &&
          (X & n) === n &&
          (Ul === 4 || (Ul === 3 && (X & 62914560) === X && 300 > Ee() - Ql)
            ? !(J & 2) && xu(e, 0)
            : (Kl |= n),
          Jl === X && (Jl = 0)),
        nd(e));
    }
    function Ku(e, t) {
      (t === 0 && (t = Ye()), (e = ii(e, t)), e !== null && (Ze(e, t), nd(e)));
    }
    function qu(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), Ku(e, n));
    }
    function Ju(e, t) {
      var n = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var r = e.stateNode,
            i = e.memoizedState;
          i !== null && (n = i.retryLane);
          break;
        case 19:
          r = e.stateNode;
          break;
        case 22:
          r = e.stateNode._retryCache;
          break;
        default:
          throw Error(a(314));
      }
      (r !== null && r.delete(t), Ku(e, n));
    }
    function Yu(e, t) {
      return Se(e, t);
    }
    var Xu = null,
      Zu = null,
      Qu = !1,
      $u = !1,
      ed = !1,
      td = 0;
    function nd(e) {
      (e !== Zu && e.next === null && (Zu === null ? (Xu = Zu = e) : (Zu = Zu.next = e)),
        ($u = !0),
        Qu || ((Qu = !0), ld()));
    }
    function rd(e, t) {
      if (!ed && $u) {
        ed = !0;
        do
          for (var n = !1, r = Xu; r !== null; ) {
            if (!t)
              if (e !== 0) {
                var i = r.pendingLanes;
                if (i === 0) var a = 0;
                else {
                  var o = r.suspendedLanes,
                    s = r.pingedLanes;
                  ((a = (1 << (31 - Re(42 | e) + 1)) - 1),
                    (a &= i & ~(o & ~s)),
                    (a = a & 201326741 ? (a & 201326741) | 1 : a ? a | 2 : 0));
                }
                a !== 0 && ((n = !0), cd(r, a));
              } else
                ((a = X),
                  (a = Ke(
                    r,
                    r === Ll ? a : 0,
                    r.cancelPendingCommit !== null || r.timeoutHandle !== -1
                  )),
                  !(a & 3) || qe(r, a) || ((n = !0), cd(r, a)));
            r = r.next;
          }
        while (n);
        ed = !1;
      }
    }
    function id() {
      ad();
    }
    function ad() {
      $u = Qu = !1;
      var e = 0;
      td !== 0 && Gd() && (e = td);
      for (var t = Ee(), n = null, r = Xu; r !== null; ) {
        var i = r.next,
          a = od(r, t);
        (a === 0
          ? ((r.next = null), n === null ? (Xu = i) : (n.next = i), i === null && (Zu = n))
          : ((n = r), (e !== 0 || a & 3) && ($u = !0)),
          (r = i));
      }
      ((ru !== 0 && ru !== 5) || rd(e, !1), td !== 0 && (td = 0));
    }
    function od(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          i = e.expirationTimes,
          a = e.pendingLanes & -62914561;
        0 < a;
      ) {
        var o = 31 - Re(a),
          s = 1 << o,
          c = i[o];
        (c === -1
          ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Je(s, t))
          : c <= t && (e.expiredLanes |= s),
          (a &= ~s));
      }
      if (
        ((t = Ll),
        (n = X),
        (n = Ke(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
        (r = e.callbackNode),
        n === 0 || (e === t && (Z === 2 || Z === 9)) || e.cancelPendingCommit !== null)
      )
        return (
          r !== null && r !== null && Ce(r),
          (e.callbackNode = null),
          (e.callbackPriority = 0)
        );
      if (!(n & 3) || qe(e, n)) {
        if (((t = n & -n), t === e.callbackPriority)) return t;
        switch ((r !== null && Ce(r), rt(n))) {
          case 2:
          case 8:
            n = ke;
            break;
          case 32:
            n = Ae;
            break;
          case 268435456:
            n = Me;
            break;
          default:
            n = Ae;
        }
        return (
          (r = sd.bind(null, e)),
          (n = Se(n, r)),
          (e.callbackPriority = t),
          (e.callbackNode = n),
          t
        );
      }
      return (
        r !== null && r !== null && Ce(r),
        (e.callbackPriority = 2),
        (e.callbackNode = null),
        2
      );
    }
    function sd(e, t) {
      if (ru !== 0 && ru !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
      var n = e.callbackNode;
      if (Vu() && e.callbackNode !== n) return null;
      var r = X;
      return (
        (r = Ke(e, e === Ll ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
        r === 0
          ? null
          : (hu(e, r, t),
            od(e, Ee()),
            e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null)
      );
    }
    function cd(e, t) {
      if (Vu()) return null;
      hu(e, t, !0);
    }
    function ld() {
      Yd(function () {
        J & 6 ? Se(Oe, id) : ad();
      });
    }
    function ud() {
      if (td === 0) {
        var e = fa;
        (e === 0 && ((e = He), (He <<= 1), !(He & 261888) && (He = 256)), (td = e));
      }
      return td;
    }
    function dd(e) {
      return e == null || typeof e == `symbol` || typeof e == `boolean`
        ? null
        : typeof e == `function`
          ? e
          : $t(`` + e);
    }
    function fd(e, t) {
      var n = t.ownerDocument.createElement(`input`);
      return (
        (n.name = t.name),
        (n.value = t.value),
        e.id && n.setAttribute(`form`, e.id),
        t.parentNode.insertBefore(n, t),
        (e = new FormData(e)),
        n.parentNode.removeChild(n),
        e
      );
    }
    function pd(e, t, n, r, i) {
      if (t === `submit` && n && n.stateNode === i) {
        var a = dd((i[ct] || null).action),
          o = r.submitter;
        o &&
          ((t = (t = o[ct] || null) ? dd(t.formAction) : o.getAttribute(`formAction`)),
          t !== null && ((a = t), (o = null)));
        var s = new Sn(`action`, `action`, null, r, i);
        e.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (r.defaultPrevented) {
                  if (td !== 0) {
                    var e = o ? fd(i, o) : new FormData(i);
                    Cs(n, { pending: !0, data: e, method: i.method, action: a }, null, e);
                  }
                } else
                  typeof a == `function` &&
                    (s.preventDefault(),
                    (e = o ? fd(i, o) : new FormData(i)),
                    Cs(n, { pending: !0, data: e, method: i.method, action: a }, a, e));
              },
              currentTarget: i,
            },
          ],
        });
      }
    }
    for (var md = 0; md < Yr.length; md++) {
      var hd = Yr[md];
      Xr(hd.toLowerCase(), `on` + (hd[0].toUpperCase() + hd.slice(1)));
    }
    (Xr(Vr, `onAnimationEnd`),
      Xr(Hr, `onAnimationIteration`),
      Xr(Ur, `onAnimationStart`),
      Xr(`dblclick`, `onDoubleClick`),
      Xr(`focusin`, `onFocus`),
      Xr(`focusout`, `onBlur`),
      Xr(Wr, `onTransitionRun`),
      Xr(Gr, `onTransitionStart`),
      Xr(Kr, `onTransitionCancel`),
      Xr(qr, `onTransitionEnd`),
      wt(`onMouseEnter`, [`mouseout`, `mouseover`]),
      wt(`onMouseLeave`, [`mouseout`, `mouseover`]),
      wt(`onPointerEnter`, [`pointerout`, `pointerover`]),
      wt(`onPointerLeave`, [`pointerout`, `pointerover`]),
      Ct(
        `onChange`,
        `change click focusin focusout input keydown keyup selectionchange`.split(` `)
      ),
      Ct(
        `onSelect`,
        `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
          ` `
        )
      ),
      Ct(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]),
      Ct(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)),
      Ct(
        `onCompositionStart`,
        `compositionstart focusout keydown keypress keyup mousedown`.split(` `)
      ),
      Ct(
        `onCompositionUpdate`,
        `compositionupdate focusout keydown keypress keyup mousedown`.split(` `)
      ));
    var gd =
        `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
          ` `
        ),
      _d = new Set(
        `beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd)
      );
    function vd(e, t) {
      t = (t & 4) != 0;
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event;
        r = r.listeners;
        a: {
          var a = void 0;
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var s = r[o],
                c = s.instance,
                l = s.currentTarget;
              if (((s = s.listener), c !== a && i.isPropagationStopped())) break a;
              ((a = s), (i.currentTarget = l));
              try {
                a(i);
              } catch (e) {
                Zr(e);
              }
              ((i.currentTarget = null), (a = c));
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((s = r[o]),
                (c = s.instance),
                (l = s.currentTarget),
                (s = s.listener),
                c !== a && i.isPropagationStopped())
              )
                break a;
              ((a = s), (i.currentTarget = l));
              try {
                a(i);
              } catch (e) {
                Zr(e);
              }
              ((i.currentTarget = null), (a = c));
            }
        }
      }
    }
    function $(e, t) {
      var n = t[ut];
      n === void 0 && (n = t[ut] = new Set());
      var r = e + `__bubble`;
      n.has(r) || (Sd(t, e, 2, !1), n.add(r));
    }
    function yd(e, t, n) {
      var r = 0;
      (t && (r |= 4), Sd(n, e, r, t));
    }
    var bd = `_reactListening` + Math.random().toString(36).slice(2);
    function xd(e) {
      if (!e[bd]) {
        ((e[bd] = !0),
          xt.forEach(function (t) {
            t !== `selectionchange` && (_d.has(t) || yd(t, !1, e), yd(t, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[bd] || ((t[bd] = !0), yd(`selectionchange`, !1, t));
      }
    }
    function Sd(e, t, n, r) {
      switch (mp(t)) {
        case 2:
          var i = cp;
          break;
        case 8:
          i = lp;
          break;
        default:
          i = up;
      }
      ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !dn || (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) || (i = !0),
        r
          ? i === void 0
            ? e.addEventListener(t, n, !0)
            : e.addEventListener(t, n, { capture: !0, passive: i })
          : i === void 0
            ? e.addEventListener(t, n, !1)
            : e.addEventListener(t, n, { passive: i }));
    }
    function Cd(e, t, n, r, i) {
      var a = r;
      if (!(t & 1) && !(t & 2) && r !== null)
        a: for (;;) {
          if (r === null) return;
          var o = r.tag;
          if (o === 3 || o === 4) {
            var s = r.stateNode.containerInfo;
            if (s === i) break;
            if (o === 4)
              for (o = r.return; o !== null; ) {
                var c = o.tag;
                if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
                o = o.return;
              }
            for (; s !== null; ) {
              if (((o = gt(s)), o === null)) return;
              if (((c = o.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
                r = a = o;
                continue a;
              }
              s = s.parentNode;
            }
          }
          r = r.return;
        }
      cn(function () {
        var r = a,
          i = nn(n),
          o = [];
        a: {
          var s = Jr.get(e);
          if (s !== void 0) {
            var c = Sn,
              u = e;
            switch (e) {
              case `keypress`:
                if (_n(n) === 0) break a;
              case `keydown`:
              case `keyup`:
                c = Bn;
                break;
              case `focusin`:
                ((u = `focus`), (c = jn));
                break;
              case `focusout`:
                ((u = `blur`), (c = jn));
                break;
              case `beforeblur`:
              case `afterblur`:
                c = jn;
                break;
              case `click`:
                if (n.button === 2) break a;
              case `auxclick`:
              case `dblclick`:
              case `mousedown`:
              case `mousemove`:
              case `mouseup`:
              case `mouseout`:
              case `mouseover`:
              case `contextmenu`:
                c = kn;
                break;
              case `drag`:
              case `dragend`:
              case `dragenter`:
              case `dragexit`:
              case `dragleave`:
              case `dragover`:
              case `dragstart`:
              case `drop`:
                c = An;
                break;
              case `touchcancel`:
              case `touchend`:
              case `touchmove`:
              case `touchstart`:
                c = Hn;
                break;
              case Vr:
              case Hr:
              case Ur:
                c = Mn;
                break;
              case qr:
                c = Un;
                break;
              case `scroll`:
              case `scrollend`:
                c = wn;
                break;
              case `wheel`:
                c = Wn;
                break;
              case `copy`:
              case `cut`:
              case `paste`:
                c = Nn;
                break;
              case `gotpointercapture`:
              case `lostpointercapture`:
              case `pointercancel`:
              case `pointerdown`:
              case `pointermove`:
              case `pointerout`:
              case `pointerover`:
              case `pointerup`:
                c = Vn;
                break;
              case `toggle`:
              case `beforetoggle`:
                c = Gn;
            }
            var d = (t & 4) != 0,
              f = !d && (e === `scroll` || e === `scrollend`),
              p = d ? (s === null ? null : s + `Capture`) : s;
            d = [];
            for (var m = r, h; m !== null; ) {
              var g = m;
              if (
                ((h = g.stateNode),
                (g = g.tag),
                (g !== 5 && g !== 26 && g !== 27) ||
                  h === null ||
                  p === null ||
                  ((g = ln(m, p)), g != null && d.push(wd(m, g, h))),
                f)
              )
                break;
              m = m.return;
            }
            0 < d.length && ((s = new c(s, u, null, n, i)), o.push({ event: s, listeners: d }));
          }
        }
        if (!(t & 7)) {
          a: {
            if (
              ((s = e === `mouseover` || e === `pointerover`),
              (c = e === `mouseout` || e === `pointerout`),
              s && n !== tn && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[lt]))
            )
              break a;
            if (
              (c || s) &&
              ((s =
                i.window === i
                  ? i
                  : (s = i.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              c
                ? ((u = n.relatedTarget || n.toElement),
                  (c = r),
                  (u = u ? gt(u) : null),
                  u !== null &&
                    ((f = l(u)), (d = u.tag), u !== f || (d !== 5 && d !== 27 && d !== 6)) &&
                    (u = null))
                : ((c = null), (u = r)),
              c !== u)
            ) {
              if (
                ((d = kn),
                (g = `onMouseLeave`),
                (p = `onMouseEnter`),
                (m = `mouse`),
                (e === `pointerout` || e === `pointerover`) &&
                  ((d = Vn), (g = `onPointerLeave`), (p = `onPointerEnter`), (m = `pointer`)),
                (f = c == null ? s : vt(c)),
                (h = u == null ? s : vt(u)),
                (s = new d(g, m + `leave`, c, n, i)),
                (s.target = f),
                (s.relatedTarget = h),
                (g = null),
                gt(i) === r &&
                  ((d = new d(p, m + `enter`, u, n, i)),
                  (d.target = h),
                  (d.relatedTarget = f),
                  (g = d)),
                (f = g),
                c && u)
              )
                b: {
                  for (d = Ed, p = c, m = u, h = 0, g = p; g; g = d(g)) h++;
                  g = 0;
                  for (var _ = m; _; _ = d(_)) g++;
                  for (; 0 < h - g; ) ((p = d(p)), h--);
                  for (; 0 < g - h; ) ((m = d(m)), g--);
                  for (; h--; ) {
                    if (p === m || (m !== null && p === m.alternate)) {
                      d = p;
                      break b;
                    }
                    ((p = d(p)), (m = d(m)));
                  }
                  d = null;
                }
              else d = null;
              (c !== null && Dd(o, s, c, d, !1), u !== null && f !== null && Dd(o, f, u, d, !0));
            }
          }
          a: {
            if (
              ((s = r ? vt(r) : window),
              (c = s.nodeName && s.nodeName.toLowerCase()),
              c === `select` || (c === `input` && s.type === `file`))
            )
              var v = dr;
            else if (ar(s))
              if (fr) v = xr;
              else {
                v = yr;
                var y = vr;
              }
            else
              ((c = s.nodeName),
                !c || c.toLowerCase() !== `input` || (s.type !== `checkbox` && s.type !== `radio`)
                  ? r && Xt(r.elementType) && (v = dr)
                  : (v = br));
            if ((v &&= v(e, r))) {
              or(o, v, n, i);
              break a;
            }
            (y && y(e, s, r),
              e === `focusout` &&
                r &&
                s.type === `number` &&
                r.memoizedProps.value != null &&
                Ht(s, `number`, s.value));
          }
          switch (((y = r ? vt(r) : window), e)) {
            case `focusin`:
              (ar(y) || y.contentEditable === `true`) && ((jr = y), (Mr = r), (Nr = null));
              break;
            case `focusout`:
              Nr = Mr = jr = null;
              break;
            case `mousedown`:
              Pr = !0;
              break;
            case `contextmenu`:
            case `mouseup`:
            case `dragend`:
              ((Pr = !1), Fr(o, n, i));
              break;
            case `selectionchange`:
              if (Ar) break;
            case `keydown`:
            case `keyup`:
              Fr(o, n, i);
          }
          var b;
          if (qn)
            b: {
              switch (e) {
                case `compositionstart`:
                  var x = `onCompositionStart`;
                  break b;
                case `compositionend`:
                  x = `onCompositionEnd`;
                  break b;
                case `compositionupdate`:
                  x = `onCompositionUpdate`;
                  break b;
              }
              x = void 0;
            }
          else
            tr
              ? $n(e, n) && (x = `onCompositionEnd`)
              : e === `keydown` && n.keyCode === 229 && (x = `onCompositionStart`);
          (x &&
            (Xn &&
              n.locale !== `ko` &&
              (tr || x !== `onCompositionStart`
                ? x === `onCompositionEnd` && tr && (b = gn())
                : ((pn = i), (mn = `value` in pn ? pn.value : pn.textContent), (tr = !0))),
            (y = Td(r, x)),
            0 < y.length &&
              ((x = new Pn(x, e, null, n, i)),
              o.push({ event: x, listeners: y }),
              b ? (x.data = b) : ((b = er(n)), b !== null && (x.data = b)))),
            (b = Yn ? nr(e, n) : rr(e, n)) &&
              ((x = Td(r, `onBeforeInput`)),
              0 < x.length &&
                ((y = new Pn(`onBeforeInput`, `beforeinput`, null, n, i)),
                o.push({ event: y, listeners: x }),
                (y.data = b))),
            pd(o, e, r, n, i));
        }
        vd(o, t);
      });
    }
    function wd(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function Td(e, t) {
      for (var n = t + `Capture`, r = []; e !== null; ) {
        var i = e,
          a = i.stateNode;
        if (
          ((i = i.tag),
          (i !== 5 && i !== 26 && i !== 27) ||
            a === null ||
            ((i = ln(e, n)),
            i != null && r.unshift(wd(e, i, a)),
            (i = ln(e, t)),
            i != null && r.push(wd(e, i, a))),
          e.tag === 3)
        )
          return r;
        e = e.return;
      }
      return [];
    }
    function Ed(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Dd(e, t, n, r, i) {
      for (var a = t._reactName, o = []; n !== null && n !== r; ) {
        var s = n,
          c = s.alternate,
          l = s.stateNode;
        if (((s = s.tag), c !== null && c === r)) break;
        ((s !== 5 && s !== 26 && s !== 27) ||
          l === null ||
          ((c = l),
          i
            ? ((l = ln(n, a)), l != null && o.unshift(wd(n, l, c)))
            : i || ((l = ln(n, a)), l != null && o.push(wd(n, l, c)))),
          (n = n.return));
      }
      o.length !== 0 && e.push({ event: t, listeners: o });
    }
    var Od = /\r\n?/g,
      kd = /\u0000|\uFFFD/g;
    function Ad(e) {
      return (typeof e == `string` ? e : `` + e)
        .replace(
          Od,
          `
`
        )
        .replace(kd, ``);
    }
    function jd(e, t) {
      return ((t = Ad(t)), Ad(e) === t);
    }
    function Md(e, t, n, r, i, o) {
      switch (n) {
        case `children`:
          typeof r == `string`
            ? t === `body` || (t === `textarea` && r === ``) || Kt(e, r)
            : (typeof r == `number` || typeof r == `bigint`) && t !== `body` && Kt(e, `` + r);
          break;
        case `className`:
          At(e, `class`, r);
          break;
        case `tabIndex`:
          At(e, `tabindex`, r);
          break;
        case `dir`:
        case `role`:
        case `viewBox`:
        case `width`:
        case `height`:
          At(e, n, r);
          break;
        case `style`:
          Yt(e, r, o);
          break;
        case `data`:
          if (t !== `object`) {
            At(e, `data`, r);
            break;
          }
        case `src`:
        case `href`:
          if (r === `` && (t !== `a` || n !== `href`)) {
            e.removeAttribute(n);
            break;
          }
          if (
            r == null ||
            typeof r == `function` ||
            typeof r == `symbol` ||
            typeof r == `boolean`
          ) {
            e.removeAttribute(n);
            break;
          }
          ((r = $t(`` + r)), e.setAttribute(n, r));
          break;
        case `action`:
        case `formAction`:
          if (typeof r == `function`) {
            e.setAttribute(
              n,
              `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`
            );
            break;
          } else
            typeof o == `function` &&
              (n === `formAction`
                ? (t !== `input` && Md(e, t, `name`, i.name, i, null),
                  Md(e, t, `formEncType`, i.formEncType, i, null),
                  Md(e, t, `formMethod`, i.formMethod, i, null),
                  Md(e, t, `formTarget`, i.formTarget, i, null))
                : (Md(e, t, `encType`, i.encType, i, null),
                  Md(e, t, `method`, i.method, i, null),
                  Md(e, t, `target`, i.target, i, null)));
          if (r == null || typeof r == `symbol` || typeof r == `boolean`) {
            e.removeAttribute(n);
            break;
          }
          ((r = $t(`` + r)), e.setAttribute(n, r));
          break;
        case `onClick`:
          r != null && (e.onclick = en);
          break;
        case `onScroll`:
          r != null && $(`scroll`, e);
          break;
        case `onScrollEnd`:
          r != null && $(`scrollend`, e);
          break;
        case `dangerouslySetInnerHTML`:
          if (r != null) {
            if (typeof r != `object` || !(`__html` in r)) throw Error(a(61));
            if (((n = r.__html), n != null)) {
              if (i.children != null) throw Error(a(60));
              e.innerHTML = n;
            }
          }
          break;
        case `multiple`:
          e.multiple = r && typeof r != `function` && typeof r != `symbol`;
          break;
        case `muted`:
          e.muted = r && typeof r != `function` && typeof r != `symbol`;
          break;
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `defaultValue`:
        case `defaultChecked`:
        case `innerHTML`:
        case `ref`:
          break;
        case `autoFocus`:
          break;
        case `xlinkHref`:
          if (
            r == null ||
            typeof r == `function` ||
            typeof r == `boolean` ||
            typeof r == `symbol`
          ) {
            e.removeAttribute(`xlink:href`);
            break;
          }
          ((n = $t(`` + r)), e.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n));
          break;
        case `contentEditable`:
        case `spellCheck`:
        case `draggable`:
        case `value`:
        case `autoReverse`:
        case `externalResourcesRequired`:
        case `focusable`:
        case `preserveAlpha`:
          r != null && typeof r != `function` && typeof r != `symbol`
            ? e.setAttribute(n, `` + r)
            : e.removeAttribute(n);
          break;
        case `inert`:
        case `allowFullScreen`:
        case `async`:
        case `autoPlay`:
        case `controls`:
        case `default`:
        case `defer`:
        case `disabled`:
        case `disablePictureInPicture`:
        case `disableRemotePlayback`:
        case `formNoValidate`:
        case `hidden`:
        case `loop`:
        case `noModule`:
        case `noValidate`:
        case `open`:
        case `playsInline`:
        case `readOnly`:
        case `required`:
        case `reversed`:
        case `scoped`:
        case `seamless`:
        case `itemScope`:
          r && typeof r != `function` && typeof r != `symbol`
            ? e.setAttribute(n, ``)
            : e.removeAttribute(n);
          break;
        case `capture`:
        case `download`:
          !0 === r
            ? e.setAttribute(n, ``)
            : !1 !== r && r != null && typeof r != `function` && typeof r != `symbol`
              ? e.setAttribute(n, r)
              : e.removeAttribute(n);
          break;
        case `cols`:
        case `rows`:
        case `size`:
        case `span`:
          r != null && typeof r != `function` && typeof r != `symbol` && !isNaN(r) && 1 <= r
            ? e.setAttribute(n, r)
            : e.removeAttribute(n);
          break;
        case `rowSpan`:
        case `start`:
          r == null || typeof r == `function` || typeof r == `symbol` || isNaN(r)
            ? e.removeAttribute(n)
            : e.setAttribute(n, r);
          break;
        case `popover`:
          ($(`beforetoggle`, e), $(`toggle`, e), kt(e, `popover`, r));
          break;
        case `xlinkActuate`:
          jt(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r);
          break;
        case `xlinkArcrole`:
          jt(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r);
          break;
        case `xlinkRole`:
          jt(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r);
          break;
        case `xlinkShow`:
          jt(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r);
          break;
        case `xlinkTitle`:
          jt(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r);
          break;
        case `xlinkType`:
          jt(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r);
          break;
        case `xmlBase`:
          jt(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r);
          break;
        case `xmlLang`:
          jt(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r);
          break;
        case `xmlSpace`:
          jt(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r);
          break;
        case `is`:
          kt(e, `is`, r);
          break;
        case `innerText`:
        case `textContent`:
          break;
        default:
          (!(2 < n.length) || (n[0] !== `o` && n[0] !== `O`) || (n[1] !== `n` && n[1] !== `N`)) &&
            ((n = Zt.get(n) || n), kt(e, n, r));
      }
    }
    function Nd(e, t, n, r, i, o) {
      switch (n) {
        case `style`:
          Yt(e, r, o);
          break;
        case `dangerouslySetInnerHTML`:
          if (r != null) {
            if (typeof r != `object` || !(`__html` in r)) throw Error(a(61));
            if (((n = r.__html), n != null)) {
              if (i.children != null) throw Error(a(60));
              e.innerHTML = n;
            }
          }
          break;
        case `children`:
          typeof r == `string`
            ? Kt(e, r)
            : (typeof r == `number` || typeof r == `bigint`) && Kt(e, `` + r);
          break;
        case `onScroll`:
          r != null && $(`scroll`, e);
          break;
        case `onScrollEnd`:
          r != null && $(`scrollend`, e);
          break;
        case `onClick`:
          r != null && (e.onclick = en);
          break;
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `innerHTML`:
        case `ref`:
          break;
        case `innerText`:
        case `textContent`:
          break;
        default:
          if (!St.hasOwnProperty(n))
            a: {
              if (
                n[0] === `o` &&
                n[1] === `n` &&
                ((i = n.endsWith(`Capture`)),
                (t = n.slice(2, i ? n.length - 7 : void 0)),
                (o = e[ct] || null),
                (o = o == null ? null : o[n]),
                typeof o == `function` && e.removeEventListener(t, o, i),
                typeof r == `function`)
              ) {
                (typeof o != `function` &&
                  o !== null &&
                  (n in e ? (e[n] = null) : e.hasAttribute(n) && e.removeAttribute(n)),
                  e.addEventListener(t, r, i));
                break a;
              }
              n in e ? (e[n] = r) : !0 === r ? e.setAttribute(n, ``) : kt(e, n, r);
            }
      }
    }
    function Pd(e, t, n) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
        case `a`:
        case `g`:
        case `p`:
        case `li`:
          break;
        case `img`:
          ($(`error`, e), $(`load`, e));
          var r = !1,
            i = !1,
            o;
          for (o in n)
            if (n.hasOwnProperty(o)) {
              var s = n[o];
              if (s != null)
                switch (o) {
                  case `src`:
                    r = !0;
                    break;
                  case `srcSet`:
                    i = !0;
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(a(137, t));
                  default:
                    Md(e, t, o, s, n, null);
                }
            }
          (i && Md(e, t, `srcSet`, n.srcSet, n, null), r && Md(e, t, `src`, n.src, n, null));
          return;
        case `input`:
          $(`invalid`, e);
          var c = (o = s = i = null),
            l = null,
            u = null;
          for (r in n)
            if (n.hasOwnProperty(r)) {
              var d = n[r];
              if (d != null)
                switch (r) {
                  case `name`:
                    i = d;
                    break;
                  case `type`:
                    s = d;
                    break;
                  case `checked`:
                    l = d;
                    break;
                  case `defaultChecked`:
                    u = d;
                    break;
                  case `value`:
                    o = d;
                    break;
                  case `defaultValue`:
                    c = d;
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    if (d != null) throw Error(a(137, t));
                    break;
                  default:
                    Md(e, t, r, d, n, null);
                }
            }
          Vt(e, o, c, l, u, s, i, !1);
          return;
        case `select`:
          for (i in ($(`invalid`, e), (r = s = o = null), n))
            if (n.hasOwnProperty(i) && ((c = n[i]), c != null))
              switch (i) {
                case `value`:
                  o = c;
                  break;
                case `defaultValue`:
                  s = c;
                  break;
                case `multiple`:
                  r = c;
                default:
                  Md(e, t, i, c, n, null);
              }
          ((t = o),
            (n = s),
            (e.multiple = !!r),
            t == null ? n != null && Ut(e, !!r, n, !0) : Ut(e, !!r, t, !1));
          return;
        case `textarea`:
          for (s in ($(`invalid`, e), (o = i = r = null), n))
            if (n.hasOwnProperty(s) && ((c = n[s]), c != null))
              switch (s) {
                case `value`:
                  r = c;
                  break;
                case `defaultValue`:
                  i = c;
                  break;
                case `children`:
                  o = c;
                  break;
                case `dangerouslySetInnerHTML`:
                  if (c != null) throw Error(a(91));
                  break;
                default:
                  Md(e, t, s, c, n, null);
              }
          Gt(e, r, i, o);
          return;
        case `option`:
          for (l in n)
            if (n.hasOwnProperty(l) && ((r = n[l]), r != null))
              switch (l) {
                case `selected`:
                  e.selected = r && typeof r != `function` && typeof r != `symbol`;
                  break;
                default:
                  Md(e, t, l, r, n, null);
              }
          return;
        case `dialog`:
          ($(`beforetoggle`, e), $(`toggle`, e), $(`cancel`, e), $(`close`, e));
          break;
        case `iframe`:
        case `object`:
          $(`load`, e);
          break;
        case `video`:
        case `audio`:
          for (r = 0; r < gd.length; r++) $(gd[r], e);
          break;
        case `image`:
          ($(`error`, e), $(`load`, e));
          break;
        case `details`:
          $(`toggle`, e);
          break;
        case `embed`:
        case `source`:
        case `link`:
          ($(`error`, e), $(`load`, e));
        case `area`:
        case `base`:
        case `br`:
        case `col`:
        case `hr`:
        case `keygen`:
        case `meta`:
        case `param`:
        case `track`:
        case `wbr`:
        case `menuitem`:
          for (u in n)
            if (n.hasOwnProperty(u) && ((r = n[u]), r != null))
              switch (u) {
                case `children`:
                case `dangerouslySetInnerHTML`:
                  throw Error(a(137, t));
                default:
                  Md(e, t, u, r, n, null);
              }
          return;
        default:
          if (Xt(t)) {
            for (d in n)
              n.hasOwnProperty(d) && ((r = n[d]), r !== void 0 && Nd(e, t, d, r, n, void 0));
            return;
          }
      }
      for (c in n) n.hasOwnProperty(c) && ((r = n[c]), r != null && Md(e, t, c, r, n, null));
    }
    function Fd(e, t, n, r) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
        case `a`:
        case `g`:
        case `p`:
        case `li`:
          break;
        case `input`:
          var i = null,
            o = null,
            s = null,
            c = null,
            l = null,
            u = null,
            d = null;
          for (m in n) {
            var f = n[m];
            if (n.hasOwnProperty(m) && f != null)
              switch (m) {
                case `checked`:
                  break;
                case `value`:
                  break;
                case `defaultValue`:
                  l = f;
                default:
                  r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
              }
          }
          for (var p in r) {
            var m = r[p];
            if (((f = n[p]), r.hasOwnProperty(p) && (m != null || f != null)))
              switch (p) {
                case `type`:
                  o = m;
                  break;
                case `name`:
                  i = m;
                  break;
                case `checked`:
                  u = m;
                  break;
                case `defaultChecked`:
                  d = m;
                  break;
                case `value`:
                  s = m;
                  break;
                case `defaultValue`:
                  c = m;
                  break;
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (m != null) throw Error(a(137, t));
                  break;
                default:
                  m !== f && Md(e, t, p, m, r, f);
              }
          }
          Bt(e, s, c, l, u, d, o, i);
          return;
        case `select`:
          for (o in ((m = s = c = p = null), n))
            if (((l = n[o]), n.hasOwnProperty(o) && l != null))
              switch (o) {
                case `value`:
                  break;
                case `multiple`:
                  m = l;
                default:
                  r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
              }
          for (i in r)
            if (((o = r[i]), (l = n[i]), r.hasOwnProperty(i) && (o != null || l != null)))
              switch (i) {
                case `value`:
                  p = o;
                  break;
                case `defaultValue`:
                  c = o;
                  break;
                case `multiple`:
                  s = o;
                default:
                  o !== l && Md(e, t, i, o, r, l);
              }
          ((t = c),
            (n = s),
            (r = m),
            p == null
              ? !!r != !!n && (t == null ? Ut(e, !!n, n ? [] : ``, !1) : Ut(e, !!n, t, !0))
              : Ut(e, !!n, p, !1));
          return;
        case `textarea`:
          for (c in ((m = p = null), n))
            if (((i = n[c]), n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)))
              switch (c) {
                case `value`:
                  break;
                case `children`:
                  break;
                default:
                  Md(e, t, c, null, r, i);
              }
          for (s in r)
            if (((i = r[s]), (o = n[s]), r.hasOwnProperty(s) && (i != null || o != null)))
              switch (s) {
                case `value`:
                  p = i;
                  break;
                case `defaultValue`:
                  m = i;
                  break;
                case `children`:
                  break;
                case `dangerouslySetInnerHTML`:
                  if (i != null) throw Error(a(91));
                  break;
                default:
                  i !== o && Md(e, t, s, i, r, o);
              }
          Wt(e, p, m);
          return;
        case `option`:
          for (var h in n)
            if (((p = n[h]), n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)))
              switch (h) {
                case `selected`:
                  e.selected = !1;
                  break;
                default:
                  Md(e, t, h, null, r, p);
              }
          for (l in r)
            if (
              ((p = r[l]), (m = n[l]), r.hasOwnProperty(l) && p !== m && (p != null || m != null))
            )
              switch (l) {
                case `selected`:
                  e.selected = p && typeof p != `function` && typeof p != `symbol`;
                  break;
                default:
                  Md(e, t, l, p, r, m);
              }
          return;
        case `img`:
        case `link`:
        case `area`:
        case `base`:
        case `br`:
        case `col`:
        case `embed`:
        case `hr`:
        case `keygen`:
        case `meta`:
        case `param`:
        case `source`:
        case `track`:
        case `wbr`:
        case `menuitem`:
          for (var g in n)
            ((p = n[g]),
              n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p));
          for (u in r)
            if (
              ((p = r[u]), (m = n[u]), r.hasOwnProperty(u) && p !== m && (p != null || m != null))
            )
              switch (u) {
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (p != null) throw Error(a(137, t));
                  break;
                default:
                  Md(e, t, u, p, r, m);
              }
          return;
        default:
          if (Xt(t)) {
            for (var _ in n)
              ((p = n[_]),
                n.hasOwnProperty(_) &&
                  p !== void 0 &&
                  !r.hasOwnProperty(_) &&
                  Nd(e, t, _, void 0, r, p));
            for (d in r)
              ((p = r[d]),
                (m = n[d]),
                !r.hasOwnProperty(d) ||
                  p === m ||
                  (p === void 0 && m === void 0) ||
                  Nd(e, t, d, p, r, m));
            return;
          }
      }
      for (var v in n)
        ((p = n[v]),
          n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p));
      for (f in r)
        ((p = r[f]),
          (m = n[f]),
          !r.hasOwnProperty(f) || p === m || (p == null && m == null) || Md(e, t, f, p, r, m));
    }
    function Id(e) {
      switch (e) {
        case `css`:
        case `script`:
        case `font`:
        case `img`:
        case `image`:
        case `input`:
        case `link`:
          return !0;
        default:
          return !1;
      }
    }
    function Ld() {
      if (typeof performance.getEntriesByType == `function`) {
        for (
          var e = 0, t = 0, n = performance.getEntriesByType(`resource`), r = 0;
          r < n.length;
          r++
        ) {
          var i = n[r],
            a = i.transferSize,
            o = i.initiatorType,
            s = i.duration;
          if (a && s && Id(o)) {
            for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
              var c = n[r],
                l = c.startTime;
              if (l > s) break;
              var u = c.transferSize,
                d = c.initiatorType;
              u && Id(d) && ((c = c.responseEnd), (o += u * (c < s ? 1 : (s - l) / (c - l))));
            }
            if ((--r, (t += (8 * (a + o)) / (i.duration / 1e3)), e++, 10 < e)) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && ((e = navigator.connection.downlink), typeof e == `number`)
        ? e
        : 5;
    }
    var Rd = null,
      zd = null;
    function Bd(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Vd(e) {
      switch (e) {
        case `http://www.w3.org/2000/svg`:
          return 1;
        case `http://www.w3.org/1998/Math/MathML`:
          return 2;
        default:
          return 0;
      }
    }
    function Hd(e, t) {
      if (e === 0)
        switch (t) {
          case `svg`:
            return 1;
          case `math`:
            return 2;
          default:
            return 0;
        }
      return e === 1 && t === `foreignObject` ? 0 : e;
    }
    function Ud(e, t) {
      return (
        e === `textarea` ||
        e === `noscript` ||
        typeof t.children == `string` ||
        typeof t.children == `number` ||
        typeof t.children == `bigint` ||
        (typeof t.dangerouslySetInnerHTML == `object` &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Wd = null;
    function Gd() {
      var e = window.event;
      return e && e.type === `popstate` ? (e === Wd ? !1 : ((Wd = e), !0)) : ((Wd = null), !1);
    }
    var Kd = typeof setTimeout == `function` ? setTimeout : void 0,
      qd = typeof clearTimeout == `function` ? clearTimeout : void 0,
      Jd = typeof Promise == `function` ? Promise : void 0,
      Yd =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : Jd === void 0
            ? Kd
            : function (e) {
                return Jd.resolve(null).then(e).catch(Xd);
              };
    function Xd(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Zd(e) {
      return e === `head`;
    }
    function Qd(e, t) {
      var n = t,
        r = 0;
      do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
          if (((n = i.data), n === `/$` || n === `/&`)) {
            if (r === 0) {
              (e.removeChild(i), Np(t));
              return;
            }
            r--;
          } else if (n === `$` || n === `$?` || n === `$~` || n === `$!` || n === `&`) r++;
          else if (n === `html`) pf(e.ownerDocument.documentElement);
          else if (n === `head`) {
            ((n = e.ownerDocument.head), pf(n));
            for (var a = n.firstChild; a; ) {
              var o = a.nextSibling,
                s = a.nodeName;
              (a[mt] ||
                s === `SCRIPT` ||
                s === `STYLE` ||
                (s === `LINK` && a.rel.toLowerCase() === `stylesheet`) ||
                n.removeChild(a),
                (a = o));
            }
          } else n === `body` && pf(e.ownerDocument.body);
        n = i;
      } while (n);
      Np(t);
    }
    function $d(e, t) {
      var n = e;
      e = 0;
      do {
        var r = n.nextSibling;
        if (
          (n.nodeType === 1
            ? t
              ? ((n._stashedDisplay = n.style.display), (n.style.display = `none`))
              : ((n.style.display = n._stashedDisplay || ``),
                n.getAttribute(`style`) === `` && n.removeAttribute(`style`))
            : n.nodeType === 3 &&
              (t
                ? ((n._stashedText = n.nodeValue), (n.nodeValue = ``))
                : (n.nodeValue = n._stashedText || ``)),
          r && r.nodeType === 8)
        )
          if (((n = r.data), n === `/$`)) {
            if (e === 0) break;
            e--;
          } else (n !== `$` && n !== `$?` && n !== `$~` && n !== `$!`) || e++;
        n = r;
      } while (n);
    }
    function ef(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t;
        switch (((t = t.nextSibling), n.nodeName)) {
          case `HTML`:
          case `HEAD`:
          case `BODY`:
            (ef(n), ht(n));
            continue;
          case `SCRIPT`:
          case `STYLE`:
            continue;
          case `LINK`:
            if (n.rel.toLowerCase() === `stylesheet`) continue;
        }
        e.removeChild(n);
      }
    }
    function tf(e, t, n, r) {
      for (; e.nodeType === 1; ) {
        var i = n;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) break;
        } else if (r) {
          if (!e[mt])
            switch (t) {
              case `meta`:
                if (!e.hasAttribute(`itemprop`)) break;
                return e;
              case `link`:
                if (
                  ((a = e.getAttribute(`rel`)),
                  (a === `stylesheet` && e.hasAttribute(`data-precedence`)) ||
                    a !== i.rel ||
                    e.getAttribute(`href`) !== (i.href == null || i.href === `` ? null : i.href) ||
                    e.getAttribute(`crossorigin`) !==
                      (i.crossOrigin == null ? null : i.crossOrigin) ||
                    e.getAttribute(`title`) !== (i.title == null ? null : i.title))
                )
                  break;
                return e;
              case `style`:
                if (e.hasAttribute(`data-precedence`)) break;
                return e;
              case `script`:
                if (
                  ((a = e.getAttribute(`src`)),
                  (a !== (i.src == null ? null : i.src) ||
                    e.getAttribute(`type`) !== (i.type == null ? null : i.type) ||
                    e.getAttribute(`crossorigin`) !==
                      (i.crossOrigin == null ? null : i.crossOrigin)) &&
                    a &&
                    e.hasAttribute(`async`) &&
                    !e.hasAttribute(`itemprop`))
                )
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === `input` && e.type === `hidden`) {
          var a = i.name == null ? null : `` + i.name;
          if (i.type === `hidden` && e.getAttribute(`name`) === a) return e;
        } else return e;
        if (((e = cf(e.nextSibling)), e === null)) break;
      }
      return null;
    }
    function nf(e, t, n) {
      if (t === ``) return null;
      for (; e.nodeType !== 3; )
        if (
          ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !n) ||
          ((e = cf(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function rf(e, t) {
      for (; e.nodeType !== 8; )
        if (
          ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !t) ||
          ((e = cf(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function af(e) {
      return e.data === `$?` || e.data === `$~`;
    }
    function of(e) {
      return e.data === `$!` || (e.data === `$?` && e.ownerDocument.readyState !== `loading`);
    }
    function sf(e, t) {
      var n = e.ownerDocument;
      if (e.data === `$~`) e._reactRetry = t;
      else if (e.data !== `$?` || n.readyState !== `loading`) t();
      else {
        var r = function () {
          (t(), n.removeEventListener(`DOMContentLoaded`, r));
        };
        (n.addEventListener(`DOMContentLoaded`, r), (e._reactRetry = r));
      }
    }
    function cf(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (
            ((t = e.data),
            t === `$` ||
              t === `$!` ||
              t === `$?` ||
              t === `$~` ||
              t === `&` ||
              t === `F!` ||
              t === `F`)
          )
            break;
          if (t === `/$` || t === `/&`) return null;
        }
      }
      return e;
    }
    var lf = null;
    function uf(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === `/$` || n === `/&`) {
            if (t === 0) return cf(e.nextSibling);
            t--;
          } else (n !== `$` && n !== `$!` && n !== `$?` && n !== `$~` && n !== `&`) || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function df(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === `$` || n === `$!` || n === `$?` || n === `$~` || n === `&`) {
            if (t === 0) return e;
            t--;
          } else (n !== `/$` && n !== `/&`) || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function ff(e, t, n) {
      switch (((t = Bd(n)), e)) {
        case `html`:
          if (((e = t.documentElement), !e)) throw Error(a(452));
          return e;
        case `head`:
          if (((e = t.head), !e)) throw Error(a(453));
          return e;
        case `body`:
          if (((e = t.body), !e)) throw Error(a(454));
          return e;
        default:
          throw Error(a(451));
      }
    }
    function pf(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      ht(e);
    }
    var mf = new Map(),
      hf = new Set();
    function gf(e) {
      return typeof e.getRootNode == `function`
        ? e.getRootNode()
        : e.nodeType === 9
          ? e
          : e.ownerDocument;
    }
    var _f = N.d;
    N.d = { f: vf, r: yf, D: Sf, C: Cf, L: wf, m: Tf, X: Df, S: Ef, M: Of };
    function vf() {
      var e = _f.f(),
        t = yu();
      return e || t;
    }
    function yf(e) {
      var t = _t(e);
      t !== null && t.tag === 5 && t.type === `form` ? Ts(t) : _f.r(e);
    }
    var bf = typeof document > `u` ? null : document;
    function xf(e, t, n) {
      var r = bf;
      if (r && typeof t == `string` && t) {
        var i = zt(t);
        ((i = `link[rel="` + e + `"][href="` + i + `"]`),
          typeof n == `string` && (i += `[crossorigin="` + n + `"]`),
          hf.has(i) ||
            (hf.add(i),
            (e = { rel: e, crossOrigin: n, href: t }),
            r.querySelector(i) === null &&
              ((t = r.createElement(`link`)), Pd(t, `link`, e), bt(t), r.head.appendChild(t))));
      }
    }
    function Sf(e) {
      (_f.D(e), xf(`dns-prefetch`, e, null));
    }
    function Cf(e, t) {
      (_f.C(e, t), xf(`preconnect`, e, t));
    }
    function wf(e, t, n) {
      _f.L(e, t, n);
      var r = bf;
      if (r && e && t) {
        var i = `link[rel="preload"][as="` + zt(t) + `"]`;
        t === `image` && n && n.imageSrcSet
          ? ((i += `[imagesrcset="` + zt(n.imageSrcSet) + `"]`),
            typeof n.imageSizes == `string` && (i += `[imagesizes="` + zt(n.imageSizes) + `"]`))
          : (i += `[href="` + zt(e) + `"]`);
        var a = i;
        switch (t) {
          case `style`:
            a = Af(e);
            break;
          case `script`:
            a = Pf(e);
        }
        mf.has(a) ||
          ((e = h(
            { rel: `preload`, href: t === `image` && n && n.imageSrcSet ? void 0 : e, as: t },
            n
          )),
          mf.set(a, e),
          r.querySelector(i) !== null ||
            (t === `style` && r.querySelector(jf(a))) ||
            (t === `script` && r.querySelector(Ff(a))) ||
            ((t = r.createElement(`link`)), Pd(t, `link`, e), bt(t), r.head.appendChild(t)));
      }
    }
    function Tf(e, t) {
      _f.m(e, t);
      var n = bf;
      if (n && e) {
        var r = t && typeof t.as == `string` ? t.as : `script`,
          i = `link[rel="modulepreload"][as="` + zt(r) + `"][href="` + zt(e) + `"]`,
          a = i;
        switch (r) {
          case `audioworklet`:
          case `paintworklet`:
          case `serviceworker`:
          case `sharedworker`:
          case `worker`:
          case `script`:
            a = Pf(e);
        }
        if (
          !mf.has(a) &&
          ((e = h({ rel: `modulepreload`, href: e }, t)), mf.set(a, e), n.querySelector(i) === null)
        ) {
          switch (r) {
            case `audioworklet`:
            case `paintworklet`:
            case `serviceworker`:
            case `sharedworker`:
            case `worker`:
            case `script`:
              if (n.querySelector(Ff(a))) return;
          }
          ((r = n.createElement(`link`)), Pd(r, `link`, e), bt(r), n.head.appendChild(r));
        }
      }
    }
    function Ef(e, t, n) {
      _f.S(e, t, n);
      var r = bf;
      if (r && e) {
        var i = yt(r).hoistableStyles,
          a = Af(e);
        t ||= `default`;
        var o = i.get(a);
        if (!o) {
          var s = { loading: 0, preload: null };
          if ((o = r.querySelector(jf(a)))) s.loading = 5;
          else {
            ((e = h({ rel: `stylesheet`, href: e, "data-precedence": t }, n)),
              (n = mf.get(a)) && Rf(e, n));
            var c = (o = r.createElement(`link`));
            (bt(c),
              Pd(c, `link`, e),
              (c._p = new Promise(function (e, t) {
                ((c.onload = e), (c.onerror = t));
              })),
              c.addEventListener(`load`, function () {
                s.loading |= 1;
              }),
              c.addEventListener(`error`, function () {
                s.loading |= 2;
              }),
              (s.loading |= 4),
              Lf(o, t, r));
          }
          ((o = { type: `stylesheet`, instance: o, count: 1, state: s }), i.set(a, o));
        }
      }
    }
    function Df(e, t) {
      _f.X(e, t);
      var n = bf;
      if (n && e) {
        var r = yt(n).hoistableScripts,
          i = Pf(e),
          a = r.get(i);
        a ||
          ((a = n.querySelector(Ff(i))),
          a ||
            ((e = h({ src: e, async: !0 }, t)),
            (t = mf.get(i)) && zf(e, t),
            (a = n.createElement(`script`)),
            bt(a),
            Pd(a, `link`, e),
            n.head.appendChild(a)),
          (a = { type: `script`, instance: a, count: 1, state: null }),
          r.set(i, a));
      }
    }
    function Of(e, t) {
      _f.M(e, t);
      var n = bf;
      if (n && e) {
        var r = yt(n).hoistableScripts,
          i = Pf(e),
          a = r.get(i);
        a ||
          ((a = n.querySelector(Ff(i))),
          a ||
            ((e = h({ src: e, async: !0, type: `module` }, t)),
            (t = mf.get(i)) && zf(e, t),
            (a = n.createElement(`script`)),
            bt(a),
            Pd(a, `link`, e),
            n.head.appendChild(a)),
          (a = { type: `script`, instance: a, count: 1, state: null }),
          r.set(i, a));
      }
    }
    function kf(e, t, n, r) {
      var i = (i = ce.current) ? gf(i) : null;
      if (!i) throw Error(a(446));
      switch (e) {
        case `meta`:
        case `title`:
          return null;
        case `style`:
          return typeof n.precedence == `string` && typeof n.href == `string`
            ? ((t = Af(n.href)),
              (n = yt(i).hoistableStyles),
              (r = n.get(t)),
              r || ((r = { type: `style`, instance: null, count: 0, state: null }), n.set(t, r)),
              r)
            : { type: `void`, instance: null, count: 0, state: null };
        case `link`:
          if (
            n.rel === `stylesheet` &&
            typeof n.href == `string` &&
            typeof n.precedence == `string`
          ) {
            e = Af(n.href);
            var o = yt(i).hoistableStyles,
              s = o.get(e);
            if (
              (s ||
                ((i = i.ownerDocument || i),
                (s = {
                  type: `stylesheet`,
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                o.set(e, s),
                (o = i.querySelector(jf(e))) && !o._p && ((s.instance = o), (s.state.loading = 5)),
                mf.has(e) ||
                  ((n = {
                    rel: `preload`,
                    as: `style`,
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  mf.set(e, n),
                  o || Nf(i, e, n, s.state))),
              t && r === null)
            )
              throw Error(a(528, ``));
            return s;
          }
          if (t && r !== null) throw Error(a(529, ``));
          return null;
        case `script`:
          return (
            (t = n.async),
            (n = n.src),
            typeof n == `string` && t && typeof t != `function` && typeof t != `symbol`
              ? ((t = Pf(n)),
                (n = yt(i).hoistableScripts),
                (r = n.get(t)),
                r || ((r = { type: `script`, instance: null, count: 0, state: null }), n.set(t, r)),
                r)
              : { type: `void`, instance: null, count: 0, state: null }
          );
        default:
          throw Error(a(444, e));
      }
    }
    function Af(e) {
      return `href="` + zt(e) + `"`;
    }
    function jf(e) {
      return `link[rel="stylesheet"][` + e + `]`;
    }
    function Mf(e) {
      return h({}, e, { "data-precedence": e.precedence, precedence: null });
    }
    function Nf(e, t, n, r) {
      e.querySelector(`link[rel="preload"][as="style"][` + t + `]`)
        ? (r.loading = 1)
        : ((t = e.createElement(`link`)),
          (r.preload = t),
          t.addEventListener(`load`, function () {
            return (r.loading |= 1);
          }),
          t.addEventListener(`error`, function () {
            return (r.loading |= 2);
          }),
          Pd(t, `link`, n),
          bt(t),
          e.head.appendChild(t));
    }
    function Pf(e) {
      return `[src="` + zt(e) + `"]`;
    }
    function Ff(e) {
      return `script[async]` + e;
    }
    function If(e, t, n) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case `style`:
            var r = e.querySelector(`style[data-href~="` + zt(n.href) + `"]`);
            if (r) return ((t.instance = r), bt(r), r);
            var i = h({}, n, {
              "data-href": n.href,
              "data-precedence": n.precedence,
              href: null,
              precedence: null,
            });
            return (
              (r = (e.ownerDocument || e).createElement(`style`)),
              bt(r),
              Pd(r, `style`, i),
              Lf(r, n.precedence, e),
              (t.instance = r)
            );
          case `stylesheet`:
            i = Af(n.href);
            var o = e.querySelector(jf(i));
            if (o) return ((t.state.loading |= 4), (t.instance = o), bt(o), o);
            ((r = Mf(n)),
              (i = mf.get(i)) && Rf(r, i),
              (o = (e.ownerDocument || e).createElement(`link`)),
              bt(o));
            var s = o;
            return (
              (s._p = new Promise(function (e, t) {
                ((s.onload = e), (s.onerror = t));
              })),
              Pd(o, `link`, r),
              (t.state.loading |= 4),
              Lf(o, n.precedence, e),
              (t.instance = o)
            );
          case `script`:
            return (
              (o = Pf(n.src)),
              (i = e.querySelector(Ff(o)))
                ? ((t.instance = i), bt(i), i)
                : ((r = n),
                  (i = mf.get(o)) && ((r = h({}, n)), zf(r, i)),
                  (e = e.ownerDocument || e),
                  (i = e.createElement(`script`)),
                  bt(i),
                  Pd(i, `link`, r),
                  e.head.appendChild(i),
                  (t.instance = i))
            );
          case `void`:
            return null;
          default:
            throw Error(a(443, t.type));
        }
      else
        t.type === `stylesheet` &&
          !(t.state.loading & 4) &&
          ((r = t.instance), (t.state.loading |= 4), Lf(r, n.precedence, e));
      return t.instance;
    }
    function Lf(e, t, n) {
      for (
        var r = n.querySelectorAll(
            `link[rel="stylesheet"][data-precedence],style[data-precedence]`
          ),
          i = r.length ? r[r.length - 1] : null,
          a = i,
          o = 0;
        o < r.length;
        o++
      ) {
        var s = r[o];
        if (s.dataset.precedence === t) a = s;
        else if (a !== i) break;
      }
      a
        ? a.parentNode.insertBefore(e, a.nextSibling)
        : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
    }
    function Rf(e, t) {
      ((e.crossOrigin ??= t.crossOrigin),
        (e.referrerPolicy ??= t.referrerPolicy),
        (e.title ??= t.title));
    }
    function zf(e, t) {
      ((e.crossOrigin ??= t.crossOrigin),
        (e.referrerPolicy ??= t.referrerPolicy),
        (e.integrity ??= t.integrity));
    }
    var Bf = null;
    function Vf(e, t, n) {
      if (Bf === null) {
        var r = new Map(),
          i = (Bf = new Map());
        i.set(n, r);
      } else ((i = Bf), (r = i.get(n)), r || ((r = new Map()), i.set(n, r)));
      if (r.has(e)) return r;
      for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
        var a = n[i];
        if (
          !(a[mt] || a[st] || (e === `link` && a.getAttribute(`rel`) === `stylesheet`)) &&
          a.namespaceURI !== `http://www.w3.org/2000/svg`
        ) {
          var o = a.getAttribute(t) || ``;
          o = e + o;
          var s = r.get(o);
          s ? s.push(a) : r.set(o, [a]);
        }
      }
      return r;
    }
    function Hf(e, t, n) {
      ((e = e.ownerDocument || e),
        e.head.insertBefore(n, t === `title` ? e.querySelector(`head > title`) : null));
    }
    function Uf(e, t, n) {
      if (n === 1 || t.itemProp != null) return !1;
      switch (e) {
        case `meta`:
        case `title`:
          return !0;
        case `style`:
          if (typeof t.precedence != `string` || typeof t.href != `string` || t.href === ``) break;
          return !0;
        case `link`:
          if (
            typeof t.rel != `string` ||
            typeof t.href != `string` ||
            t.href === `` ||
            t.onLoad ||
            t.onError
          )
            break;
          switch (t.rel) {
            case `stylesheet`:
              return ((e = t.disabled), typeof t.precedence == `string` && e == null);
            default:
              return !0;
          }
        case `script`:
          if (
            t.async &&
            typeof t.async != `function` &&
            typeof t.async != `symbol` &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            typeof t.src == `string`
          )
            return !0;
      }
      return !1;
    }
    function Wf(e) {
      return !(e.type === `stylesheet` && !(e.state.loading & 3));
    }
    function Gf(e, t, n, r) {
      if (
        n.type === `stylesheet` &&
        (typeof r.media != `string` || !1 !== matchMedia(r.media).matches) &&
        !(n.state.loading & 4)
      ) {
        if (n.instance === null) {
          var i = Af(r.href),
            a = t.querySelector(jf(i));
          if (a) {
            ((t = a._p),
              typeof t == `object` &&
                t &&
                typeof t.then == `function` &&
                (e.count++, (e = Jf.bind(e)), t.then(e, e)),
              (n.state.loading |= 4),
              (n.instance = a),
              bt(a));
            return;
          }
          ((a = t.ownerDocument || t),
            (r = Mf(r)),
            (i = mf.get(i)) && Rf(r, i),
            (a = a.createElement(`link`)),
            bt(a));
          var o = a;
          ((o._p = new Promise(function (e, t) {
            ((o.onload = e), (o.onerror = t));
          })),
            Pd(a, `link`, r),
            (n.instance = a));
        }
        (e.stylesheets === null && (e.stylesheets = new Map()),
          e.stylesheets.set(n, t),
          (t = n.state.preload) &&
            !(n.state.loading & 3) &&
            (e.count++,
            (n = Jf.bind(e)),
            t.addEventListener(`load`, n),
            t.addEventListener(`error`, n)));
      }
    }
    var Kf = 0;
    function qf(e, t) {
      return (
        e.stylesheets && e.count === 0 && Xf(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount
          ? function (n) {
              var r = setTimeout(function () {
                if ((e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
                  var t = e.unsuspend;
                  ((e.unsuspend = null), t());
                }
              }, 6e4 + t);
              0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
              var i = setTimeout(
                function () {
                  if (
                    ((e.waitingForImages = !1),
                    e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend))
                  ) {
                    var t = e.unsuspend;
                    ((e.unsuspend = null), t());
                  }
                },
                (e.imgBytes > Kf ? 50 : 800) + t
              );
              return (
                (e.unsuspend = n),
                function () {
                  ((e.unsuspend = null), clearTimeout(r), clearTimeout(i));
                }
              );
            }
          : null
      );
    }
    function Jf() {
      if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
        if (this.stylesheets) Xf(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          ((this.unsuspend = null), e());
        }
      }
    }
    var Yf = null;
    function Xf(e, t) {
      ((e.stylesheets = null),
        e.unsuspend !== null &&
          (e.count++, (Yf = new Map()), t.forEach(Zf, e), (Yf = null), Jf.call(e)));
    }
    function Zf(e, t) {
      if (!(t.state.loading & 4)) {
        var n = Yf.get(e);
        if (n) var r = n.get(null);
        else {
          ((n = new Map()), Yf.set(e, n));
          for (
            var i = e.querySelectorAll(`link[data-precedence],style[data-precedence]`), a = 0;
            a < i.length;
            a++
          ) {
            var o = i[a];
            (o.nodeName === `LINK` || o.getAttribute(`media`) !== `not all`) &&
              (n.set(o.dataset.precedence, o), (r = o));
          }
          r && n.set(null, r);
        }
        ((i = t.instance),
          (o = i.getAttribute(`data-precedence`)),
          (a = n.get(o) || r),
          a === r && n.set(null, i),
          n.set(o, i),
          this.count++,
          (r = Jf.bind(this)),
          i.addEventListener(`load`, r),
          i.addEventListener(`error`, r),
          a
            ? a.parentNode.insertBefore(i, a.nextSibling)
            : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(i, e.firstChild)),
          (t.state.loading |= 4));
      }
    }
    var Qf = {
      $$typeof: C,
      Provider: null,
      Consumer: null,
      _currentValue: ie,
      _currentValue2: ie,
      _threadCount: 0,
    };
    function $f(e, t, n, r, i, a, o, s, c) {
      ((this.tag = 1),
        (this.containerInfo = e),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = Xe(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Xe(0)),
        (this.hiddenUpdates = Xe(null)),
        (this.identifierPrefix = r),
        (this.onUncaughtError = i),
        (this.onCaughtError = a),
        (this.onRecoverableError = o),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = c),
        (this.incompleteTransitions = new Map()));
    }
    function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
      return (
        (e = new $f(e, t, n, o, c, l, u, d, s)),
        (t = 1),
        !0 === a && (t |= 24),
        (a = li(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (t = ca()),
        t.refCount++,
        (e.pooledCache = t),
        t.refCount++,
        (a.memoizedState = { element: r, isDehydrated: n, cache: t }),
        Va(a),
        e
      );
    }
    function tp(e) {
      return e ? ((e = si), e) : si;
    }
    function np(e, t, n, r, i, a) {
      ((i = tp(i)),
        r.context === null ? (r.context = i) : (r.pendingContext = i),
        (r = Ua(t)),
        (r.payload = { element: n }),
        (a = a === void 0 ? null : a),
        a !== null && (r.callback = a),
        (n = Wa(e, r, t)),
        n !== null && (mu(n, e, t), Ga(n, e, t)));
    }
    function rp(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function ip(e, t) {
      (rp(e, t), (e = e.alternate) && rp(e, t));
    }
    function ap(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = ii(e, 67108864);
        (t !== null && mu(t, e, 67108864), ip(e, 67108864));
      }
    }
    function op(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = fu();
        t = nt(t);
        var n = ii(e, t);
        (n !== null && mu(n, e, t), ip(e, t));
      }
    }
    var sp = !0;
    function cp(e, t, n, r) {
      var i = M.T;
      M.T = null;
      var a = N.p;
      try {
        ((N.p = 2), up(e, t, n, r));
      } finally {
        ((N.p = a), (M.T = i));
      }
    }
    function lp(e, t, n, r) {
      var i = M.T;
      M.T = null;
      var a = N.p;
      try {
        ((N.p = 8), up(e, t, n, r));
      } finally {
        ((N.p = a), (M.T = i));
      }
    }
    function up(e, t, n, r) {
      if (sp) {
        var i = dp(r);
        if (i === null) (Cd(e, t, r, fp, n), Cp(e, r));
        else if (Tp(i, e, t, n, r)) r.stopPropagation();
        else if ((Cp(e, r), t & 4 && -1 < Sp.indexOf(e))) {
          for (; i !== null; ) {
            var a = _t(i);
            if (a !== null)
              switch (a.tag) {
                case 3:
                  if (((a = a.stateNode), a.current.memoizedState.isDehydrated)) {
                    var o = Ge(a.pendingLanes);
                    if (o !== 0) {
                      var s = a;
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; o; ) {
                        var c = 1 << (31 - Re(o));
                        ((s.entanglements[1] |= c), (o &= ~c));
                      }
                      (nd(a), !(J & 6) && ((eu = Ee() + 500), rd(0, !1)));
                    }
                  }
                  break;
                case 31:
                case 13:
                  ((s = ii(a, 2)), s !== null && mu(s, a, 2), yu(), ip(a, 2));
              }
            if (((a = dp(r)), a === null && Cd(e, t, r, fp, n), a === i)) break;
            i = a;
          }
          i !== null && r.stopPropagation();
        } else Cd(e, t, r, null, n);
      }
    }
    function dp(e) {
      return ((e = nn(e)), pp(e));
    }
    var fp = null;
    function pp(e) {
      if (((fp = null), (e = gt(e)), e !== null)) {
        var t = l(e);
        if (t === null) e = null;
        else {
          var n = t.tag;
          if (n === 13) {
            if (((e = u(t)), e !== null)) return e;
            e = null;
          } else if (n === 31) {
            if (((e = d(t)), e !== null)) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ((fp = e), null);
    }
    function mp(e) {
      switch (e) {
        case `beforetoggle`:
        case `cancel`:
        case `click`:
        case `close`:
        case `contextmenu`:
        case `copy`:
        case `cut`:
        case `auxclick`:
        case `dblclick`:
        case `dragend`:
        case `dragstart`:
        case `drop`:
        case `focusin`:
        case `focusout`:
        case `input`:
        case `invalid`:
        case `keydown`:
        case `keypress`:
        case `keyup`:
        case `mousedown`:
        case `mouseup`:
        case `paste`:
        case `pause`:
        case `play`:
        case `pointercancel`:
        case `pointerdown`:
        case `pointerup`:
        case `ratechange`:
        case `reset`:
        case `resize`:
        case `seeked`:
        case `submit`:
        case `toggle`:
        case `touchcancel`:
        case `touchend`:
        case `touchstart`:
        case `volumechange`:
        case `change`:
        case `selectionchange`:
        case `textInput`:
        case `compositionstart`:
        case `compositionend`:
        case `compositionupdate`:
        case `beforeblur`:
        case `afterblur`:
        case `beforeinput`:
        case `blur`:
        case `fullscreenchange`:
        case `focus`:
        case `hashchange`:
        case `popstate`:
        case `select`:
        case `selectstart`:
          return 2;
        case `drag`:
        case `dragenter`:
        case `dragexit`:
        case `dragleave`:
        case `dragover`:
        case `mousemove`:
        case `mouseout`:
        case `mouseover`:
        case `pointermove`:
        case `pointerout`:
        case `pointerover`:
        case `scroll`:
        case `touchmove`:
        case `wheel`:
        case `mouseenter`:
        case `mouseleave`:
        case `pointerenter`:
        case `pointerleave`:
          return 8;
        case `message`:
          switch (De()) {
            case Oe:
              return 2;
            case ke:
              return 8;
            case Ae:
            case je:
              return 32;
            case Me:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var hp = !1,
      gp = null,
      _p = null,
      vp = null,
      yp = new Map(),
      bp = new Map(),
      xp = [],
      Sp =
        `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(
          ` `
        );
    function Cp(e, t) {
      switch (e) {
        case `focusin`:
        case `focusout`:
          gp = null;
          break;
        case `dragenter`:
        case `dragleave`:
          _p = null;
          break;
        case `mouseover`:
        case `mouseout`:
          vp = null;
          break;
        case `pointerover`:
        case `pointerout`:
          yp.delete(t.pointerId);
          break;
        case `gotpointercapture`:
        case `lostpointercapture`:
          bp.delete(t.pointerId);
      }
    }
    function wp(e, t, n, r, i, a) {
      return e === null || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [i],
          }),
          t !== null && ((t = _t(t)), t !== null && ap(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
    }
    function Tp(e, t, n, r, i) {
      switch (t) {
        case `focusin`:
          return ((gp = wp(gp, e, t, n, r, i)), !0);
        case `dragenter`:
          return ((_p = wp(_p, e, t, n, r, i)), !0);
        case `mouseover`:
          return ((vp = wp(vp, e, t, n, r, i)), !0);
        case `pointerover`:
          var a = i.pointerId;
          return (yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0);
        case `gotpointercapture`:
          return ((a = i.pointerId), bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0);
      }
      return !1;
    }
    function Ep(e) {
      var t = gt(e.target);
      if (t !== null) {
        var n = l(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = u(n)), t !== null)) {
              ((e.blockedOn = t),
                at(e.priority, function () {
                  op(n);
                }));
              return;
            }
          } else if (t === 31) {
            if (((t = d(n)), t !== null)) {
              ((e.blockedOn = t),
                at(e.priority, function () {
                  op(n);
                }));
              return;
            }
          } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Dp(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = dp(e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ((tn = r), n.target.dispatchEvent(r), (tn = null));
        } else return ((t = _t(n)), t !== null && ap(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function Op(e, t, n) {
      Dp(e) && n.delete(t);
    }
    function kp() {
      ((hp = !1),
        gp !== null && Dp(gp) && (gp = null),
        _p !== null && Dp(_p) && (_p = null),
        vp !== null && Dp(vp) && (vp = null),
        yp.forEach(Op),
        bp.forEach(Op));
    }
    function Ap(e, n) {
      e.blockedOn === n &&
        ((e.blockedOn = null),
        hp || ((hp = !0), t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
    }
    var jp = null;
    function Mp(e) {
      jp !== e &&
        ((jp = e),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
          jp === e && (jp = null);
          for (var t = 0; t < e.length; t += 3) {
            var n = e[t],
              r = e[t + 1],
              i = e[t + 2];
            if (typeof r != `function`) {
              if (pp(r || n) === null) continue;
              break;
            }
            var a = _t(n);
            a !== null &&
              (e.splice(t, 3),
              (t -= 3),
              Cs(a, { pending: !0, data: i, method: n.method, action: r }, r, i));
          }
        }));
    }
    function Np(e) {
      function t(t) {
        return Ap(t, e);
      }
      (gp !== null && Ap(gp, e),
        _p !== null && Ap(_p, e),
        vp !== null && Ap(vp, e),
        yp.forEach(t),
        bp.forEach(t));
      for (var n = 0; n < xp.length; n++) {
        var r = xp[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
      for (; 0 < xp.length && ((n = xp[0]), n.blockedOn === null); )
        (Ep(n), n.blockedOn === null && xp.shift());
      if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
        for (r = 0; r < n.length; r += 3) {
          var i = n[r],
            a = n[r + 1],
            o = i[ct] || null;
          if (typeof a == `function`) o || Mp(n);
          else if (o) {
            var s = null;
            if (a && a.hasAttribute(`formAction`)) {
              if (((i = a), (o = a[ct] || null))) s = o.formAction;
              else if (pp(i) !== null) continue;
            } else s = o.action;
            (typeof s == `function` ? (n[r + 1] = s) : (n.splice(r, 3), (r -= 3)), Mp(n));
          }
        }
    }
    function Pp() {
      function e(e) {
        e.canIntercept &&
          e.info === `react-transition` &&
          e.intercept({
            handler: function () {
              return new Promise(function (e) {
                return (i = e);
              });
            },
            focusReset: `manual`,
            scroll: `manual`,
          });
      }
      function t() {
        (i !== null && (i(), (i = null)), r || setTimeout(n, 20));
      }
      function n() {
        if (!r && !navigation.transition) {
          var e = navigation.currentEntry;
          e &&
            e.url != null &&
            navigation.navigate(e.url, {
              state: e.getState(),
              info: `react-transition`,
              history: `replace`,
            });
        }
      }
      if (typeof navigation == `object`) {
        var r = !1,
          i = null;
        return (
          navigation.addEventListener(`navigate`, e),
          navigation.addEventListener(`navigatesuccess`, t),
          navigation.addEventListener(`navigateerror`, t),
          setTimeout(n, 100),
          function () {
            ((r = !0),
              navigation.removeEventListener(`navigate`, e),
              navigation.removeEventListener(`navigatesuccess`, t),
              navigation.removeEventListener(`navigateerror`, t),
              i !== null && (i(), (i = null)));
          }
        );
      }
    }
    function Fp(e) {
      this._internalRoot = e;
    }
    ((Ip.prototype.render = Fp.prototype.render =
      function (e) {
        var t = this._internalRoot;
        if (t === null) throw Error(a(409));
        var n = t.current;
        np(n, fu(), e, t, null, null);
      }),
      (Ip.prototype.unmount = Fp.prototype.unmount =
        function () {
          var e = this._internalRoot;
          if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            (np(e.current, 2, null, e, null, null), yu(), (t[lt] = null));
          }
        }));
    function Ip(e) {
      this._internalRoot = e;
    }
    Ip.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = it();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
        (xp.splice(n, 0, e), n === 0 && Ep(e));
      }
    };
    var Lp = n.version;
    if (Lp !== `19.2.3`) throw Error(a(527, Lp, `19.2.3`));
    N.findDOMNode = function (e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == `function`
          ? Error(a(188))
          : ((e = Object.keys(e).join(`,`)), Error(a(268, e)));
      return ((e = p(t)), (e = e === null ? null : m(e)), (e = e === null ? null : e.stateNode), e);
    };
    var Rp = {
      bundleType: 0,
      version: `19.2.3`,
      rendererPackageName: `react-dom`,
      currentDispatcherRef: M,
      reconcilerVersion: `19.2.3`,
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
      var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!zp.isDisabled && zp.supportsFiber)
        try {
          ((Fe = zp.inject(Rp)), (Ie = zp));
        } catch {}
    }
    e.createRoot = function (e, t) {
      if (!s(e)) throw Error(a(299));
      var n = !1,
        r = ``,
        i = Ks,
        o = qs,
        c = Js;
      return (
        t != null &&
          (!0 === t.unstable_strictMode && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (o = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = ep(e, 1, !1, null, null, n, r, null, i, o, c, Pp)),
        (e[lt] = t.current),
        xd(e),
        new Fp(t)
      );
    };
  }),
  u = n((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = l()));
  }),
  d = n((e) => {
    var t = o().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    e.c = function (e) {
      return t.H.useMemoCache(e);
    };
  }),
  f = n((e, t) => {
    t.exports = d();
  }),
  p = `modulepreload`,
  m = function (e) {
    return `/` + e;
  },
  h = {};
const g = function (e, t, n) {
  let r = Promise.resolve();
  if (t && t.length > 0) {
    let e = document.getElementsByTagName(`link`),
      i = document.querySelector(`meta[property=csp-nonce]`),
      a = i?.nonce || i?.getAttribute(`nonce`);
    function o(e) {
      return Promise.all(
        e.map((e) =>
          Promise.resolve(e).then(
            (e) => ({ status: `fulfilled`, value: e }),
            (e) => ({ status: `rejected`, reason: e })
          )
        )
      );
    }
    r = o(
      t.map((t) => {
        if (((t = m(t, n)), t in h)) return;
        h[t] = !0;
        let r = t.endsWith(`.css`),
          i = r ? `[rel="stylesheet"]` : ``;
        if (n)
          for (let n = e.length - 1; n >= 0; n--) {
            let i = e[n];
            if (i.href === t && (!r || i.rel === `stylesheet`)) return;
          }
        else if (document.querySelector(`link[href="${t}"]${i}`)) return;
        let o = document.createElement(`link`);
        if (
          ((o.rel = r ? `stylesheet` : p),
          r || (o.as = `script`),
          (o.crossOrigin = ``),
          (o.href = t),
          a && o.setAttribute(`nonce`, a),
          document.head.appendChild(o),
          r)
        )
          return new Promise((e, n) => {
            (o.addEventListener(`load`, e),
              o.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`))));
          });
      })
    );
  }
  function i(e) {
    let t = new Event(`vite:preloadError`, { cancelable: !0 });
    if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e;
  }
  return r.then((t) => {
    for (let e of t || []) e.status === `rejected` && i(e.reason);
    return e().catch(i);
  });
};
var _ = t(o(), 1),
  v = (e) => {
    throw TypeError(e);
  },
  y = (e, t, n) => t.has(e) || v(`Cannot ` + n),
  b = (e, t, n) => (y(e, t, `read from private field`), n ? n.call(e) : t.get(e)),
  x = (e, t, n) =>
    t.has(e)
      ? v(`Cannot add the same private member more than once`)
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  S = `popstate`;
function C(e = {}) {
  function t(e, t) {
    let { pathname: n, search: r, hash: i } = e.location;
    return D(
      ``,
      { pathname: n, search: r, hash: i },
      (t.state && t.state.usr) || null,
      (t.state && t.state.key) || `default`
    );
  }
  function n(e, t) {
    return typeof t == `string` ? t : te(t);
  }
  return k(t, n, null, e);
}
function w(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function T(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t);
    try {
      throw Error(t);
    } catch {}
  }
}
function E() {
  return Math.random().toString(36).substring(2, 10);
}
function ee(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function D(e, t, n = null, r) {
  return {
    pathname: typeof e == `string` ? e : e.pathname,
    search: ``,
    hash: ``,
    ...(typeof t == `string` ? O(t) : t),
    state: n,
    key: (t && t.key) || r || E(),
  };
}
function te({ pathname: e = `/`, search: t = ``, hash: n = `` }) {
  return (
    t && t !== `?` && (e += t.charAt(0) === `?` ? t : `?` + t),
    n && n !== `#` && (e += n.charAt(0) === `#` ? n : `#` + n),
    e
  );
}
function O(e) {
  let t = {};
  if (e) {
    let n = e.indexOf(`#`);
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf(`?`);
    (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))), e && (t.pathname = e));
  }
  return t;
}
function k(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = `POP`,
    c = null,
    l = u();
  l ?? ((l = 0), o.replaceState({ ...o.state, idx: l }, ``));
  function u() {
    return (o.state || { idx: null }).idx;
  }
  function d() {
    s = `POP`;
    let e = u(),
      t = e == null ? null : e - l;
    ((l = e), c && c({ action: s, location: h.location, delta: t }));
  }
  function f(e, t) {
    s = `PUSH`;
    let r = D(h.location, e, t);
    (n && n(r, e), (l = u() + 1));
    let d = ee(r, l),
      f = h.createHref(r);
    try {
      o.pushState(d, ``, f);
    } catch (e) {
      if (e instanceof DOMException && e.name === `DataCloneError`) throw e;
      i.location.assign(f);
    }
    a && c && c({ action: s, location: h.location, delta: 1 });
  }
  function p(e, t) {
    s = `REPLACE`;
    let r = D(h.location, e, t);
    (n && n(r, e), (l = u()));
    let i = ee(r, l),
      d = h.createHref(r);
    (o.replaceState(i, ``, d), a && c && c({ action: s, location: h.location, delta: 0 }));
  }
  function m(e) {
    return ne(e);
  }
  let h = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(e) {
      if (c) throw Error(`A history only accepts one active listener`);
      return (
        i.addEventListener(S, d),
        (c = e),
        () => {
          (i.removeEventListener(S, d), (c = null));
        }
      );
    },
    createHref(e) {
      return t(i, e);
    },
    createURL: m,
    encodeLocation(e) {
      let t = m(e);
      return { pathname: t.pathname, search: t.search, hash: t.hash };
    },
    push: f,
    replace: p,
    go(e) {
      return o.go(e);
    },
  };
  return h;
}
function ne(e, t = !1) {
  let n = `http://localhost`;
  (typeof window < `u` &&
    (n = window.location.origin === `null` ? window.location.href : window.location.origin),
    w(n, `No window.location.(origin|href) available to create URL`));
  let r = typeof e == `string` ? e : te(e);
  return ((r = r.replace(/ $/, `%20`)), !t && r.startsWith(`//`) && (r = n + r), new URL(r, n));
}
var A,
  j = class {
    constructor(e) {
      if ((x(this, A, new Map()), e)) for (let [t, n] of e) this.set(t, n);
    }
    get(e) {
      if (b(this, A).has(e)) return b(this, A).get(e);
      if (e.defaultValue !== void 0) return e.defaultValue;
      throw Error(`No value found for context`);
    }
    set(e, t) {
      b(this, A).set(e, t);
    }
  };
A = new WeakMap();
var re = new Set([`lazy`, `caseSensitive`, `path`, `id`, `index`, `children`]);
function M(e) {
  return re.has(e);
}
var N = new Set([`lazy`, `caseSensitive`, `path`, `id`, `index`, `middleware`, `children`]);
function ie(e) {
  return N.has(e);
}
function P(e) {
  return e.index === !0;
}
function F(e, t, n = [], r = {}, i = !1) {
  return e.map((e, a) => {
    let o = [...n, String(a)],
      s = typeof e.id == `string` ? e.id : o.join(`-`);
    if (
      (w(e.index !== !0 || !e.children, `Cannot specify children on an index route`),
      w(
        i || !r[s],
        `Found a route id collision on id "${s}".  Route id's must be globally unique within Data Router usages`
      ),
      P(e))
    ) {
      let n = { ...e, id: s };
      return ((r[s] = ae(n, t(n))), n);
    } else {
      let n = { ...e, id: s, children: void 0 };
      return ((r[s] = ae(n, t(n))), e.children && (n.children = F(e.children, t, o, r, i)), n);
    }
  });
}
function ae(e, t) {
  return Object.assign(e, {
    ...t,
    ...(typeof t.lazy == `object` && t.lazy != null ? { lazy: { ...e.lazy, ...t.lazy } } : {}),
  });
}
function I(e, t, n = `/`) {
  return L(e, t, n, !1);
}
function L(e, t, n, r) {
  let i = Ce((typeof t == `string` ? O(t) : t).pathname || `/`, n);
  if (i == null) return null;
  let a = se(e);
  le(a);
  let o = null;
  for (let e = 0; o == null && e < a.length; ++e) {
    let t = Se(i);
    o = ye(a[e], t, r);
  }
  return o;
}
function oe(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return { id: n.id, pathname: r, params: i, data: t[n.id], loaderData: t[n.id], handle: n.handle };
}
function se(e, t = [], n = [], r = ``, i = !1) {
  let a = (e, a, o = i, s) => {
    let c = {
      relativePath: s === void 0 ? e.path || `` : s,
      caseSensitive: e.caseSensitive === !0,
      childrenIndex: a,
      route: e,
    };
    if (c.relativePath.startsWith(`/`)) {
      if (!c.relativePath.startsWith(r) && o) return;
      (w(
        c.relativePath.startsWith(r),
        `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (c.relativePath = c.relativePath.slice(r.length)));
    }
    let l = Ne([r, c.relativePath]),
      u = n.concat(c);
    (e.children &&
      e.children.length > 0 &&
      (w(
        e.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${l}".`
      ),
      se(e.children, t, u, l, o)),
      !(e.path == null && !e.index) && t.push({ path: l, score: _e(l, e.index), routesMeta: u }));
  };
  return (
    e.forEach((e, t) => {
      if (e.path === `` || !e.path?.includes(`?`)) a(e, t);
      else for (let n of ce(e.path)) a(e, t, !0, n);
    }),
    t
  );
}
function ce(e) {
  let t = e.split(`/`);
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``);
  if (r.length === 0) return i ? [a, ``] : [a];
  let o = ce(r.join(`/`)),
    s = [];
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  );
}
function le(e) {
  e.sort((e, t) =>
    e.score === t.score
      ? ve(
          e.routesMeta.map((e) => e.childrenIndex),
          t.routesMeta.map((e) => e.childrenIndex)
        )
      : t.score - e.score
  );
}
var ue = /^:[\w-]+$/,
  de = 3,
  fe = 2,
  pe = 1,
  me = 10,
  he = -2,
  ge = (e) => e === `*`;
function _e(e, t) {
  let n = e.split(`/`),
    r = n.length;
  return (
    n.some(ge) && (r += he),
    t && (r += fe),
    n.filter((e) => !ge(e)).reduce((e, t) => e + (ue.test(t) ? de : t === `` ? pe : me), r)
  );
}
function ve(e, t) {
  return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function ye(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = [];
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = be({ path: s.relativePath, caseSensitive: s.caseSensitive, end: c }, l),
      d = s.route;
    if (
      (!u &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (u = be({ path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 }, l)),
      !u)
    )
      return null;
    (Object.assign(i, u.params),
      o.push({
        params: i,
        pathname: Ne([a, u.pathname]),
        pathnameBase: Pe(Ne([a, u.pathnameBase])),
        route: d,
      }),
      u.pathnameBase !== `/` && (a = Ne([a, u.pathnameBase])));
  }
  return o;
}
function be(e, t) {
  typeof e == `string` && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = xe(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1);
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if (t === `*`) {
        let e = s[r] || ``;
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`);
      }
      let i = s[r];
      return (n && !i ? (e[t] = void 0) : (e[t] = (i || ``).replace(/%2F/g, `/`)), e);
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function xe(e, t = !1, n = !0) {
  T(
    e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, `/*`)}".`
  );
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (e, t, n) => (
            r.push({ paramName: t, isOptional: n != null }),
            n ? `/?([^\\/]+)?` : `/([^\\/]+)`
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`);
  return (
    e.endsWith(`*`)
      ? (r.push({ paramName: `*` }), (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  );
}
function Se(e) {
  try {
    return e
      .split(`/`)
      .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
      .join(`/`);
  } catch (t) {
    return (
      T(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
      ),
      e
    );
  }
}
function Ce(e, t) {
  if (t === `/`) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== `/` ? null : e.slice(n) || `/`;
}
function we({ basename: e, pathname: t }) {
  return t === `/` ? e : Ne([e, t]);
}
var Te = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ee = (e) => Te.test(e);
function De(e, t = `/`) {
  let { pathname: n, search: r = ``, hash: i = `` } = typeof e == `string` ? O(e) : e,
    a;
  if (n)
    if (Ee(n)) a = n;
    else {
      if (n.includes(`//`)) {
        let e = n;
        ((n = n.replace(/\/\/+/g, `/`)),
          T(!1, `Pathnames cannot have embedded double slashes - normalizing ${e} -> ${n}`));
      }
      a = n.startsWith(`/`) ? Oe(n.substring(1), `/`) : Oe(n, t);
    }
  else a = t;
  return { pathname: a, search: Fe(r), hash: Ie(i) };
}
function Oe(e, t) {
  let n = t.replace(/\/+$/, ``).split(`/`);
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e);
    }),
    n.length > 1 ? n.join(`/`) : `/`
  );
}
function ke(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ae(e) {
  return e.filter((e, t) => t === 0 || (e.route.path && e.route.path.length > 0));
}
function je(e) {
  let t = Ae(e);
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
}
function Me(e, t, n, r = !1) {
  let i;
  typeof e == `string`
    ? (i = O(e))
    : ((i = { ...e }),
      w(!i.pathname || !i.pathname.includes(`?`), ke(`?`, `pathname`, `search`, i)),
      w(!i.pathname || !i.pathname.includes(`#`), ke(`#`, `pathname`, `hash`, i)),
      w(!i.search || !i.search.includes(`#`), ke(`#`, `search`, `hash`, i)));
  let a = e === `` || i.pathname === ``,
    o = a ? `/` : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let e = t.length - 1;
    if (!r && o.startsWith(`..`)) {
      let t = o.split(`/`);
      for (; t[0] === `..`; ) (t.shift(), --e);
      i.pathname = t.join(`/`);
    }
    s = e >= 0 ? t[e] : `/`;
  }
  let c = De(i, s),
    l = o && o !== `/` && o.endsWith(`/`),
    u = (a || o === `.`) && n.endsWith(`/`);
  return (!c.pathname.endsWith(`/`) && (l || u) && (c.pathname += `/`), c);
}
var Ne = (e) => e.join(`/`).replace(/\/\/+/g, `/`),
  Pe = (e) => e.replace(/\/+$/, ``).replace(/^\/*/, `/`),
  Fe = (e) => (!e || e === `?` ? `` : e.startsWith(`?`) ? e : `?` + e),
  Ie = (e) => (!e || e === `#` ? `` : e.startsWith(`#`) ? e : `#` + e),
  Le = class {
    constructor(e, t, n, r = !1) {
      ((this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n));
    }
  };
function Re(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  );
}
function ze(e) {
  return (
    e
      .map((e) => e.route.path)
      .filter(Boolean)
      .join(`/`)
      .replace(/\/\/*/g, `/`) || `/`
  );
}
var Be =
  typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0;
function Ve(e, t) {
  let n = e;
  if (typeof n != `string` || !Te.test(n)) return { absoluteURL: void 0, isExternal: !1, to: n };
  let r = n,
    i = !1;
  if (Be)
    try {
      let e = new URL(window.location.href),
        r = n.startsWith(`//`) ? new URL(e.protocol + n) : new URL(n),
        a = Ce(r.pathname, t);
      r.origin === e.origin && a != null ? (n = a + r.search + r.hash) : (i = !0);
    } catch {
      T(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: i, to: n };
}
var He = Symbol(`Uninstrumented`);
function Ue(e, t) {
  let n = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: [],
  };
  e.forEach((e) =>
    e({
      id: t.id,
      index: t.index,
      path: t.path,
      instrument(e) {
        let t = Object.keys(n);
        for (let r of t) e[r] && n[r].push(e[r]);
      },
    })
  );
  let r = {};
  if (typeof t.lazy == `function` && n.lazy.length > 0) {
    let e = Ge(n.lazy, t.lazy, () => void 0);
    e && (r.lazy = e);
  }
  if (typeof t.lazy == `object`) {
    let e = t.lazy;
    [`middleware`, `loader`, `action`].forEach((t) => {
      let i = e[t],
        a = n[`lazy.${t}`];
      if (typeof i == `function` && a.length > 0) {
        let e = Ge(a, i, () => void 0);
        e && (r.lazy = Object.assign(r.lazy || {}, { [t]: e }));
      }
    });
  }
  return (
    [`loader`, `action`].forEach((e) => {
      let i = t[e];
      if (typeof i == `function` && n[e].length > 0) {
        let t = i[He] ?? i,
          a = Ge(n[e], t, (...e) => qe(e[0]));
        a && (e === `loader` && t.hydrate === !0 && (a.hydrate = !0), (a[He] = t), (r[e] = a));
      }
    }),
    t.middleware &&
      t.middleware.length > 0 &&
      n.middleware.length > 0 &&
      (r.middleware = t.middleware.map((e) => {
        let t = e[He] ?? e,
          r = Ge(n.middleware, t, (...e) => qe(e[0]));
        return r ? ((r[He] = t), r) : e;
      })),
    r
  );
}
function We(e, t) {
  let n = { navigate: [], fetch: [] };
  if (
    (t.forEach((e) =>
      e({
        instrument(e) {
          let t = Object.keys(e);
          for (let r of t) e[r] && n[r].push(e[r]);
        },
      })
    ),
    n.navigate.length > 0)
  ) {
    let t = e.navigate[He] ?? e.navigate,
      r = Ge(n.navigate, t, (...t) => {
        let [n, r] = t;
        return {
          to: typeof n == `number` || typeof n == `string` ? n : n ? te(n) : `.`,
          ...Je(e, r ?? {}),
        };
      });
    r && ((r[He] = t), (e.navigate = r));
  }
  if (n.fetch.length > 0) {
    let t = e.fetch[He] ?? e.fetch,
      r = Ge(n.fetch, t, (...t) => {
        let [n, , r, i] = t;
        return { href: r ?? `.`, fetcherKey: n, ...Je(e, i ?? {}) };
      });
    r && ((r[He] = t), (e.fetch = r));
  }
  return e;
}
function Ge(e, t, n) {
  return e.length === 0
    ? null
    : async (...r) => {
        let i = await Ke(e, n(...r), () => t(...r), e.length - 1);
        if (i.type === `error`) throw i.value;
        return i.value;
      };
}
async function Ke(e, t, n, r) {
  let i = e[r],
    a;
  if (i) {
    let o,
      s = async () => (
        o
          ? console.error(`You cannot call instrumented handlers more than once`)
          : (o = Ke(e, t, n, r - 1)),
        (a = await o),
        w(a, `Expected a result`),
        a.type === `error` && a.value instanceof Error
          ? { status: `error`, error: a.value }
          : { status: `success`, error: void 0 }
      );
    try {
      await i(s, t);
    } catch (e) {
      console.error(`An instrumentation function threw an error:`, e);
    }
    (o || (await s()), await o);
  } else
    try {
      a = { type: `success`, value: await n() };
    } catch (e) {
      a = { type: `error`, value: e };
    }
  return a || { type: `error`, value: Error(`No result assigned in instrumentation chain.`) };
}
function qe(e) {
  let { request: t, context: n, params: r, unstable_pattern: i } = e;
  return { request: Ye(t), params: { ...r }, unstable_pattern: i, context: Xe(n) };
}
function Je(e, t) {
  return {
    currentUrl: te(e.state.location),
    ...(`formMethod` in t ? { formMethod: t.formMethod } : {}),
    ...(`formEncType` in t ? { formEncType: t.formEncType } : {}),
    ...(`formData` in t ? { formData: t.formData } : {}),
    ...(`body` in t ? { body: t.body } : {}),
  };
}
function Ye(e) {
  return { method: e.method, url: e.url, headers: { get: (...t) => e.headers.get(...t) } };
}
function Xe(e) {
  if (Qe(e)) {
    let t = { ...e };
    return (Object.freeze(t), t);
  } else return { get: (t) => e.get(t) };
}
var Ze = Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
function Qe(e) {
  if (typeof e != `object` || !e) return !1;
  let t = Object.getPrototypeOf(e);
  return (
    t === Object.prototype || t === null || Object.getOwnPropertyNames(t).sort().join(`\0`) === Ze
  );
}
var $e = [`POST`, `PUT`, `PATCH`, `DELETE`],
  et = new Set($e),
  tt = [`GET`, ...$e],
  nt = new Set(tt),
  rt = new Set([301, 302, 303, 307, 308]),
  it = new Set([307, 308]),
  at = {
    state: `idle`,
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  ot = {
    state: `idle`,
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  st = { state: `unblocked`, proceed: void 0, reset: void 0, location: void 0 },
  ct = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  lt = `remix-router-transitions`,
  ut = Symbol(`ResetLoaderData`);
function dt(e) {
  let t = e.window ? e.window : typeof window < `u` ? window : void 0,
    n = t !== void 0 && t.document !== void 0 && t.document.createElement !== void 0;
  w(e.routes.length > 0, `You must provide a non-empty routes array to createRouter`);
  let r = e.hydrationRouteProperties || [],
    i = e.mapRouteProperties || ct,
    a = i;
  if (e.unstable_instrumentations) {
    let t = e.unstable_instrumentations;
    a = (e) => ({ ...i(e), ...Ue(t.map((e) => e.route).filter(Boolean), e) });
  }
  let o = {},
    s = F(e.routes, a, void 0, o),
    c,
    l = e.basename || `/`;
  l.startsWith(`/`) || (l = `/${l}`);
  let u = e.dataStrategy || Ot,
    d = { ...e.future },
    f = null,
    p = new Set(),
    m = null,
    h = null,
    g = null,
    _ = e.hydrationData != null,
    v = I(s, e.history.location, l),
    y = !1,
    b = null,
    x;
  if (v == null && !e.patchRoutesOnNavigation) {
    let t = Xt(404, { pathname: e.history.location.pathname }),
      { matches: n, route: r } = Yt(s);
    ((x = !0), (v = n), (b = { [r.id]: t }));
  } else if (
    (v && !e.hydrationData && ut(v, s, e.history.location.pathname).active && (v = null), v)
  )
    if (v.some((e) => e.route.lazy)) x = !1;
    else if (!v.some((e) => gt(e.route))) x = !0;
    else {
      let t = e.hydrationData ? e.hydrationData.loaderData : null,
        n = e.hydrationData ? e.hydrationData.errors : null;
      if (n) {
        let e = v.findIndex((e) => n[e.route.id] !== void 0);
        x = v.slice(0, e + 1).every((e) => !_t(e.route, t, n));
      } else x = v.every((e) => !_t(e.route, t, n));
    }
  else {
    ((x = !1), (v = []));
    let t = ut(null, s, e.history.location.pathname);
    t.active && t.matches && ((y = !0), (v = t.matches));
  }
  let S,
    C = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: v,
      initialized: x,
      navigation: at,
      restoreScrollPosition: e.hydrationData == null ? null : !1,
      preventScrollReset: !1,
      revalidation: `idle`,
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || b,
      fetchers: new Map(),
      blockers: new Map(),
    },
    E = `POP`,
    ee = null,
    te = !1,
    O,
    k = !1,
    A = new Map(),
    re = null,
    M = !1,
    N = !1,
    ie = new Set(),
    P = new Map(),
    ae = 0,
    se = -1,
    ce = new Map(),
    le = new Set(),
    ue = new Map(),
    de = new Map(),
    fe = new Set(),
    pe = new Map(),
    me,
    he = null;
  function ge() {
    if (
      ((f = e.history.listen(({ action: t, location: n, delta: r }) => {
        if (me) {
          (me(), (me = void 0));
          return;
        }
        T(
          pe.size === 0 || r != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let i = $e({ currentLocation: C.location, nextLocation: n, historyAction: t });
        if (i && r != null) {
          let t = new Promise((e) => {
            me = e;
          });
          (e.history.go(r * -1),
            Qe(i, {
              state: `blocked`,
              location: n,
              proceed() {
                (Qe(i, { state: `proceeding`, proceed: void 0, reset: void 0, location: n }),
                  t.then(() => e.history.go(r)));
              },
              reset() {
                let e = new Map(C.blockers);
                (e.set(i, st), ye({ blockers: e }));
              },
            }),
            ee?.resolve(),
            (ee = null));
          return;
        }
        return we(t, n);
      })),
      n)
    ) {
      xn(t, A);
      let e = () => Sn(t, A);
      (t.addEventListener(`pagehide`, e), (re = () => t.removeEventListener(`pagehide`, e)));
    }
    return (C.initialized || we(`POP`, C.location, { initialHydration: !0 }), S);
  }
  function _e() {
    (f && f(),
      re && re(),
      p.clear(),
      O && O.abort(),
      C.fetchers.forEach((e, t) => He(t)),
      C.blockers.forEach((e, t) => Ze(t)));
  }
  function ve(e) {
    return (p.add(e), () => p.delete(e));
  }
  function ye(e, t = {}) {
    ((e.matches &&= e.matches.map((e) => {
      let t = o[e.route.id],
        n = e.route;
      return n.element !== t.element ||
        n.errorElement !== t.errorElement ||
        n.hydrateFallbackElement !== t.hydrateFallbackElement
        ? { ...e, route: t }
        : e;
    })),
      (C = { ...C, ...e }));
    let n = [],
      r = [];
    (C.fetchers.forEach((e, t) => {
      e.state === `idle` && (fe.has(t) ? n.push(t) : r.push(t));
    }),
      fe.forEach((e) => {
        !C.fetchers.has(e) && !P.has(e) && n.push(e);
      }),
      [...p].forEach((r) =>
        r(C, {
          deletedFetchers: n,
          newErrors: e.errors ?? null,
          viewTransitionOpts: t.viewTransitionOpts,
          flushSync: t.flushSync === !0,
        })
      ),
      n.forEach((e) => He(e)),
      r.forEach((e) => C.fetchers.delete(e)));
  }
  function be(t, n, { flushSync: r } = {}) {
    let i =
        C.actionData != null &&
        C.navigation.formMethod != null &&
        fn(C.navigation.formMethod) &&
        C.navigation.state === `loading` &&
        t.state?._isRedirect !== !0,
      a;
    a = n.actionData
      ? Object.keys(n.actionData).length > 0
        ? n.actionData
        : null
      : i
        ? C.actionData
        : null;
    let o = n.loaderData ? Kt(C.loaderData, n.loaderData, n.matches || [], n.errors) : C.loaderData,
      l = C.blockers;
    l.size > 0 && ((l = new Map(l)), l.forEach((e, t) => l.set(t, st)));
    let u = M ? !1 : lt(t, n.matches || C.matches),
      d =
        te === !0 ||
        (C.navigation.formMethod != null &&
          fn(C.navigation.formMethod) &&
          t.state?._isRedirect !== !0);
    ((c &&= ((s = c), void 0)),
      M ||
        E === `POP` ||
        (E === `PUSH`
          ? e.history.push(t, t.state)
          : E === `REPLACE` && e.history.replace(t, t.state)));
    let f;
    if (E === `POP`) {
      let e = A.get(C.location.pathname);
      e && e.has(t.pathname)
        ? (f = { currentLocation: C.location, nextLocation: t })
        : A.has(t.pathname) && (f = { currentLocation: t, nextLocation: C.location });
    } else if (k) {
      let e = A.get(C.location.pathname);
      (e ? e.add(t.pathname) : ((e = new Set([t.pathname])), A.set(C.location.pathname, e)),
        (f = { currentLocation: C.location, nextLocation: t }));
    }
    (ye(
      {
        ...n,
        actionData: a,
        loaderData: o,
        historyAction: E,
        location: t,
        initialized: !0,
        navigation: at,
        revalidation: `idle`,
        restoreScrollPosition: u,
        preventScrollReset: d,
        blockers: l,
      },
      { viewTransitionOpts: f, flushSync: r === !0 }
    ),
      (E = `POP`),
      (te = !1),
      (k = !1),
      (M = !1),
      (N = !1),
      ee?.resolve(),
      (ee = null),
      he?.resolve(),
      (he = null));
  }
  async function xe(t, n) {
    if ((ee?.resolve(), (ee = null), typeof t == `number`)) {
      ee ||= Cn();
      let n = ee.promise;
      return (e.history.go(t), n);
    }
    let {
        path: r,
        submission: i,
        error: a,
      } = mt(!1, pt(C.location, C.matches, l, t, n?.fromRouteId, n?.relative), n),
      o = C.location,
      s = D(C.location, r, n && n.state);
    s = { ...s, ...e.history.encodeLocation(s) };
    let c = n && n.replace != null ? n.replace : void 0,
      u = `PUSH`;
    c === !0
      ? (u = `REPLACE`)
      : c === !1 ||
        (i != null &&
          fn(i.formMethod) &&
          i.formAction === C.location.pathname + C.location.search &&
          (u = `REPLACE`));
    let d = n && `preventScrollReset` in n ? n.preventScrollReset === !0 : void 0,
      f = (n && n.flushSync) === !0,
      p = $e({ currentLocation: o, nextLocation: s, historyAction: u });
    if (p) {
      Qe(p, {
        state: `blocked`,
        location: s,
        proceed() {
          (Qe(p, { state: `proceeding`, proceed: void 0, reset: void 0, location: s }), xe(t, n));
        },
        reset() {
          let e = new Map(C.blockers);
          (e.set(p, st), ye({ blockers: e }));
        },
      });
      return;
    }
    await we(u, s, {
      submission: i,
      pendingError: a,
      preventScrollReset: d,
      replace: n && n.replace,
      enableViewTransition: n && n.viewTransition,
      flushSync: f,
      callSiteDefaultShouldRevalidate: n && n.unstable_defaultShouldRevalidate,
    });
  }
  function Se() {
    ((he ||= Cn()), Ie(), ye({ revalidation: `loading` }));
    let e = he.promise;
    return C.navigation.state === `submitting`
      ? e
      : C.navigation.state === `idle`
        ? (we(C.historyAction, C.location, { startUninterruptedRevalidation: !0 }), e)
        : (we(E || C.historyAction, C.navigation.location, {
            overrideNavigation: C.navigation,
            enableViewTransition: k === !0,
          }),
          e);
  }
  async function we(t, n, r) {
    (O && O.abort(),
      (O = null),
      (E = t),
      (M = (r && r.startUninterruptedRevalidation) === !0),
      rt(C.location, C.matches),
      (te = (r && r.preventScrollReset) === !0),
      (k = (r && r.enableViewTransition) === !0));
    let i = c || s,
      a = r && r.overrideNavigation,
      o = r?.initialHydration && C.matches && C.matches.length > 0 && !y ? C.matches : I(i, n, l),
      u = (r && r.flushSync) === !0;
    if (
      o &&
      C.initialized &&
      !N &&
      $t(C.location, n) &&
      !(r && r.submission && fn(r.submission.formMethod))
    ) {
      be(n, { matches: o }, { flushSync: u });
      return;
    }
    let d = ut(o, i, n.pathname);
    if ((d.active && d.matches && (o = d.matches), !o)) {
      let { error: e, notFoundMatches: t, route: r } = et(n.pathname);
      be(n, { matches: t, loaderData: {}, errors: { [r.id]: e } }, { flushSync: u });
      return;
    }
    O = new AbortController();
    let f = Vt(e.history, n, O.signal, r && r.submission),
      p = e.getContext ? await e.getContext() : new j(),
      m;
    if (r && r.pendingError) m = [Jt(o).route.id, { type: `error`, error: r.pendingError }];
    else if (r && r.submission && fn(r.submission.formMethod)) {
      let t = await Te(f, n, r.submission, o, p, d.active, r && r.initialHydration === !0, {
        replace: r.replace,
        flushSync: u,
      });
      if (t.shortCircuited) return;
      if (t.pendingActionResult) {
        let [e, r] = t.pendingActionResult;
        if (an(r) && Re(r.error) && r.error.status === 404) {
          ((O = null), be(n, { matches: t.matches, loaderData: {}, errors: { [e]: r.error } }));
          return;
        }
      }
      ((o = t.matches || o),
        (m = t.pendingActionResult),
        (a = gn(n, r.submission)),
        (u = !1),
        (d.active = !1),
        (f = Vt(e.history, f.url, f.signal)));
    }
    let {
      shortCircuited: h,
      matches: g,
      loaderData: _,
      errors: v,
    } = await De(
      f,
      n,
      o,
      p,
      d.active,
      a,
      r && r.submission,
      r && r.fetcherSubmission,
      r && r.replace,
      r && r.initialHydration === !0,
      u,
      m,
      r && r.callSiteDefaultShouldRevalidate
    );
    h || ((O = null), be(n, { matches: g || o, ...qt(m), loaderData: _, errors: v }));
  }
  async function Te(t, n, i, c, u, d, f, p = {}) {
    if ((Ie(), ye({ navigation: _n(n, i) }, { flushSync: p.flushSync === !0 }), d)) {
      let e = await dt(c, n.pathname, t.signal);
      if (e.type === `aborted`) return { shortCircuited: !0 };
      if (e.type === `error`) {
        if (e.partialMatches.length === 0) {
          let { matches: t, route: n } = Yt(s);
          return { matches: t, pendingActionResult: [n.id, { type: `error`, error: e.error }] };
        }
        let t = Jt(e.partialMatches).route.id;
        return {
          matches: e.partialMatches,
          pendingActionResult: [t, { type: `error`, error: e.error }],
        };
      } else if (e.matches) c = e.matches;
      else {
        let { notFoundMatches: e, error: t, route: r } = et(n.pathname);
        return { matches: e, pendingActionResult: [r.id, { type: `error`, error: t }] };
      }
    }
    let m,
      h = mn(c, n);
    if (!h.route.action && !h.route.lazy)
      m = {
        type: `error`,
        error: Xt(405, { method: t.method, pathname: n.pathname, routeId: h.route.id }),
      };
    else {
      let e = await Pe(t, Pt(a, o, t, c, h, f ? [] : r, u), u, null);
      if (((m = e[h.route.id]), !m)) {
        for (let t of c)
          if (e[t.route.id]) {
            m = e[t.route.id];
            break;
          }
      }
      if (t.signal.aborted) return { shortCircuited: !0 };
    }
    if (on(m)) {
      let n;
      return (
        (n =
          p && p.replace != null
            ? p.replace
            : Bt(m.response.headers.get(`Location`), new URL(t.url), l, e.history) ===
              C.location.pathname + C.location.search),
        await Ne(t, m, !0, { submission: i, replace: n }),
        { shortCircuited: !0 }
      );
    }
    if (an(m)) {
      let e = Jt(c, h.route.id);
      return (
        (p && p.replace) !== !0 && (E = `PUSH`),
        { matches: c, pendingActionResult: [e.route.id, m, h.route.id] }
      );
    }
    return { matches: c, pendingActionResult: [h.route.id, m] };
  }
  async function De(t, n, i, u, d, f, p, m, h, g, _, v, y) {
    let b = f || gn(n, p),
      x = p || m || hn(b),
      S = !M && !g;
    if (d) {
      if (S) {
        let e = Oe(v);
        ye({ navigation: b, ...(e === void 0 ? {} : { actionData: e }) }, { flushSync: _ });
      }
      let e = await dt(i, n.pathname, t.signal);
      if (e.type === `aborted`) return { shortCircuited: !0 };
      if (e.type === `error`) {
        if (e.partialMatches.length === 0) {
          let { matches: t, route: n } = Yt(s);
          return { matches: t, loaderData: {}, errors: { [n.id]: e.error } };
        }
        let t = Jt(e.partialMatches).route.id;
        return { matches: e.partialMatches, loaderData: {}, errors: { [t]: e.error } };
      } else if (e.matches) i = e.matches;
      else {
        let { error: e, notFoundMatches: t, route: r } = et(n.pathname);
        return { matches: t, loaderData: {}, errors: { [r.id]: e } };
      }
    }
    let w = c || s,
      { dsMatches: T, revalidatingFetchers: E } = ht(
        t,
        u,
        a,
        o,
        e.history,
        C,
        i,
        x,
        n,
        g ? [] : r,
        g === !0,
        N,
        ie,
        fe,
        ue,
        le,
        w,
        l,
        e.patchRoutesOnNavigation != null,
        v,
        y
      );
    if (
      ((se = ++ae),
      !e.dataStrategy &&
        !T.some((e) => e.shouldLoad) &&
        !T.some((e) => e.route.middleware && e.route.middleware.length > 0) &&
        E.length === 0)
    ) {
      let e = Je();
      return (
        be(
          n,
          {
            matches: i,
            loaderData: {},
            errors: v && an(v[1]) ? { [v[0]]: v[1].error } : null,
            ...qt(v),
            ...(e ? { fetchers: new Map(C.fetchers) } : {}),
          },
          { flushSync: _ }
        ),
        { shortCircuited: !0 }
      );
    }
    if (S) {
      let e = {};
      if (!d) {
        e.navigation = b;
        let t = Oe(v);
        t !== void 0 && (e.actionData = t);
      }
      (E.length > 0 && (e.fetchers = ke(E)), ye(e, { flushSync: _ }));
    }
    E.forEach((e) => {
      (Ke(e.key), e.controller && P.set(e.key, e.controller));
    });
    let ee = () => E.forEach((e) => Ke(e.key));
    O && O.signal.addEventListener(`abort`, ee);
    let { loaderResults: D, fetcherResults: te } = await Fe(T, E, t, u);
    if (t.signal.aborted) return { shortCircuited: !0 };
    (O && O.signal.removeEventListener(`abort`, ee), E.forEach((e) => P.delete(e.key)));
    let k = Zt(D);
    if (k) return (await Ne(t, k.result, !0, { replace: h }), { shortCircuited: !0 });
    if (((k = Zt(te)), k))
      return (le.add(k.key), await Ne(t, k.result, !0, { replace: h }), { shortCircuited: !0 });
    let { loaderData: ne, errors: A } = Gt(C, i, D, v, E, te);
    g && C.errors && (A = { ...C.errors, ...A });
    let j = Je(),
      re = Ye(se),
      F = j || re || E.length > 0;
    return {
      matches: i,
      loaderData: ne,
      errors: A,
      ...(F ? { fetchers: new Map(C.fetchers) } : {}),
    };
  }
  function Oe(e) {
    if (e && !an(e[1])) return { [e[0]]: e[1].data };
    if (C.actionData) return Object.keys(C.actionData).length === 0 ? null : C.actionData;
  }
  function ke(e) {
    return (
      e.forEach((e) => {
        let t = C.fetchers.get(e.key),
          n = vn(void 0, t ? t.data : void 0);
        C.fetchers.set(e.key, n);
      }),
      new Map(C.fetchers)
    );
  }
  async function Ae(t, n, r, i) {
    Ke(t);
    let a = (i && i.flushSync) === !0,
      o = c || s,
      u = pt(C.location, C.matches, l, r, n, i?.relative),
      d = I(o, u, l),
      f = ut(d, o, u);
    if ((f.active && f.matches && (d = f.matches), !d)) {
      ze(t, n, Xt(404, { pathname: u }), { flushSync: a });
      return;
    }
    let { path: p, submission: m, error: h } = mt(!0, u, i);
    if (h) {
      ze(t, n, h, { flushSync: a });
      return;
    }
    let g = e.getContext ? await e.getContext() : new j(),
      _ = (i && i.preventScrollReset) === !0;
    if (m && fn(m.formMethod)) {
      await je(t, n, p, d, g, f.active, a, _, m, i && i.unstable_defaultShouldRevalidate);
      return;
    }
    (ue.set(t, { routeId: n, path: p }), await Me(t, n, p, d, g, f.active, a, _, m));
  }
  async function je(t, n, i, u, d, f, p, m, h, g) {
    (Ie(), ue.delete(t), Le(t, yn(h, C.fetchers.get(t)), { flushSync: p }));
    let _ = new AbortController(),
      v = Vt(e.history, i, _.signal, h);
    if (f) {
      let e = await dt(u, new URL(v.url).pathname, v.signal, t);
      if (e.type === `aborted`) return;
      if (e.type === `error`) {
        ze(t, n, e.error, { flushSync: p });
        return;
      } else if (e.matches) u = e.matches;
      else {
        ze(t, n, Xt(404, { pathname: i }), { flushSync: p });
        return;
      }
    }
    let y = mn(u, i);
    if (!y.route.action && !y.route.lazy) {
      ze(t, n, Xt(405, { method: h.formMethod, pathname: i, routeId: n }), { flushSync: p });
      return;
    }
    P.set(t, _);
    let b = ae,
      x = Pt(a, o, v, u, y, r, d),
      S = await Pe(v, x, d, t),
      T = S[y.route.id];
    if (!T) {
      for (let e of x)
        if (S[e.route.id]) {
          T = S[e.route.id];
          break;
        }
    }
    if (v.signal.aborted) {
      P.get(t) === _ && P.delete(t);
      return;
    }
    if (fe.has(t)) {
      if (on(T) || an(T)) {
        Le(t, bn(void 0));
        return;
      }
    } else {
      if (on(T))
        if ((P.delete(t), se > b)) {
          Le(t, bn(void 0));
          return;
        } else
          return (
            le.add(t),
            Le(t, vn(h)),
            Ne(v, T, !1, { fetcherSubmission: h, preventScrollReset: m })
          );
      if (an(T)) {
        ze(t, n, T.error);
        return;
      }
    }
    let ee = C.navigation.location || C.location,
      D = Vt(e.history, ee, _.signal),
      te = c || s,
      k = C.navigation.state === `idle` ? C.matches : I(te, C.navigation.location, l);
    w(k, `Didn't find any matches after fetcher action`);
    let ne = ++ae;
    ce.set(t, ne);
    let A = vn(h, T.data);
    C.fetchers.set(t, A);
    let { dsMatches: j, revalidatingFetchers: re } = ht(
      D,
      d,
      a,
      o,
      e.history,
      C,
      k,
      h,
      ee,
      r,
      !1,
      N,
      ie,
      fe,
      ue,
      le,
      te,
      l,
      e.patchRoutesOnNavigation != null,
      [y.route.id, T],
      g
    );
    (re
      .filter((e) => e.key !== t)
      .forEach((e) => {
        let t = e.key,
          n = C.fetchers.get(t),
          r = vn(void 0, n ? n.data : void 0);
        (C.fetchers.set(t, r), Ke(t), e.controller && P.set(t, e.controller));
      }),
      ye({ fetchers: new Map(C.fetchers) }));
    let M = () => re.forEach((e) => Ke(e.key));
    _.signal.addEventListener(`abort`, M);
    let { loaderResults: F, fetcherResults: L } = await Fe(j, re, D, d);
    if (_.signal.aborted) return;
    if (
      (_.signal.removeEventListener(`abort`, M),
      ce.delete(t),
      P.delete(t),
      re.forEach((e) => P.delete(e.key)),
      C.fetchers.has(t))
    ) {
      let e = bn(T.data);
      C.fetchers.set(t, e);
    }
    let oe = Zt(F);
    if (oe) return Ne(D, oe.result, !1, { preventScrollReset: m });
    if (((oe = Zt(L)), oe))
      return (le.add(oe.key), Ne(D, oe.result, !1, { preventScrollReset: m }));
    let { loaderData: de, errors: pe } = Gt(C, k, F, void 0, re, L);
    (Ye(ne),
      C.navigation.state === `loading` && ne > se
        ? (w(E, `Expected pending action`),
          O && O.abort(),
          be(C.navigation.location, {
            matches: k,
            loaderData: de,
            errors: pe,
            fetchers: new Map(C.fetchers),
          }))
        : (ye({
            errors: pe,
            loaderData: Kt(C.loaderData, de, k, pe),
            fetchers: new Map(C.fetchers),
          }),
          (N = !1)));
  }
  async function Me(t, n, i, s, c, l, u, d, f) {
    let p = C.fetchers.get(t);
    Le(t, vn(f, p ? p.data : void 0), { flushSync: u });
    let m = new AbortController(),
      h = Vt(e.history, i, m.signal);
    if (l) {
      let e = await dt(s, new URL(h.url).pathname, h.signal, t);
      if (e.type === `aborted`) return;
      if (e.type === `error`) {
        ze(t, n, e.error, { flushSync: u });
        return;
      } else if (e.matches) s = e.matches;
      else {
        ze(t, n, Xt(404, { pathname: i }), { flushSync: u });
        return;
      }
    }
    let g = mn(s, i);
    P.set(t, m);
    let _ = ae,
      v = (await Pe(h, Pt(a, o, h, s, g, r, c), c, t))[g.route.id];
    if ((P.get(t) === m && P.delete(t), !h.signal.aborted)) {
      if (fe.has(t)) {
        Le(t, bn(void 0));
        return;
      }
      if (on(v))
        if (se > _) {
          Le(t, bn(void 0));
          return;
        } else {
          (le.add(t), await Ne(h, v, !1, { preventScrollReset: d }));
          return;
        }
      if (an(v)) {
        ze(t, n, v.error);
        return;
      }
      Le(t, bn(v.data));
    }
  }
  async function Ne(
    r,
    i,
    a,
    { submission: o, fetcherSubmission: s, preventScrollReset: c, replace: u } = {}
  ) {
    (a || (ee?.resolve(), (ee = null)), i.response.headers.has(`X-Remix-Revalidate`) && (N = !0));
    let d = i.response.headers.get(`Location`);
    (w(d, `Expected a Location header on the redirect Response`),
      (d = Bt(d, new URL(r.url), l, e.history)));
    let f = D(C.location, d, { _isRedirect: !0 });
    if (n) {
      let e = !1;
      if (i.response.headers.has(`X-Remix-Reload-Document`)) e = !0;
      else if (Ee(d)) {
        let n = ne(d, !0);
        e = n.origin !== t.location.origin || Ce(n.pathname, l) == null;
      }
      if (e) {
        u ? t.location.replace(d) : t.location.assign(d);
        return;
      }
    }
    O = null;
    let p = u === !0 || i.response.headers.has(`X-Remix-Replace`) ? `REPLACE` : `PUSH`,
      { formMethod: m, formAction: h, formEncType: g } = C.navigation;
    !o && !s && m && h && g && (o = hn(C.navigation));
    let _ = o || s;
    it.has(i.response.status) && _ && fn(_.formMethod)
      ? await we(p, f, {
          submission: { ..._, formAction: d },
          preventScrollReset: c || te,
          enableViewTransition: a ? k : void 0,
        })
      : await we(p, f, {
          overrideNavigation: gn(f, o),
          fetcherSubmission: s,
          preventScrollReset: c || te,
          enableViewTransition: a ? k : void 0,
        });
  }
  async function Pe(e, t, n, r) {
    let i,
      a = {};
    try {
      i = await Ft(u, e, t, r, n, !1);
    } catch (e) {
      return (
        t
          .filter((e) => e.shouldLoad)
          .forEach((t) => {
            a[t.route.id] = { type: `error`, error: e };
          }),
        a
      );
    }
    if (e.signal.aborted) return a;
    if (!fn(e.method))
      for (let e of t) {
        if (i[e.route.id]?.type === `error`) break;
        !i.hasOwnProperty(e.route.id) &&
          !C.loaderData.hasOwnProperty(e.route.id) &&
          (!C.errors || !C.errors.hasOwnProperty(e.route.id)) &&
          e.shouldCallHandler() &&
          (i[e.route.id] = {
            type: `error`,
            result: Error(`No result returned from dataStrategy for route ${e.route.id}`),
          });
      }
    for (let [n, r] of Object.entries(i))
      if (rn(r)) {
        let i = r.result;
        a[n] = { type: `redirect`, response: zt(i, e, n, t, l) };
      } else a[n] = await Rt(r);
    return a;
  }
  async function Fe(e, t, n, r) {
    let i = Pe(n, e, r, null),
      a = Promise.all(
        t.map(async (e) => {
          if (e.matches && e.match && e.request && e.controller) {
            let t = (await Pe(e.request, e.matches, r, e.key))[e.match.route.id];
            return { [e.key]: t };
          } else
            return Promise.resolve({
              [e.key]: { type: `error`, error: Xt(404, { pathname: e.path }) },
            });
        })
      );
    return {
      loaderResults: await i,
      fetcherResults: (await a).reduce((e, t) => Object.assign(e, t), {}),
    };
  }
  function Ie() {
    ((N = !0),
      ue.forEach((e, t) => {
        (P.has(t) && ie.add(t), Ke(t));
      }));
  }
  function Le(e, t, n = {}) {
    (C.fetchers.set(e, t),
      ye({ fetchers: new Map(C.fetchers) }, { flushSync: (n && n.flushSync) === !0 }));
  }
  function ze(e, t, n, r = {}) {
    let i = Jt(C.matches, t);
    (He(e),
      ye(
        { errors: { [i.route.id]: n }, fetchers: new Map(C.fetchers) },
        { flushSync: (r && r.flushSync) === !0 }
      ));
  }
  function Be(e) {
    return (de.set(e, (de.get(e) || 0) + 1), fe.has(e) && fe.delete(e), C.fetchers.get(e) || ot);
  }
  function Ve(e, t) {
    (Ke(e, t?.reason), Le(e, bn(null)));
  }
  function He(e) {
    let t = C.fetchers.get(e);
    (P.has(e) && !(t && t.state === `loading` && ce.has(e)) && Ke(e),
      ue.delete(e),
      ce.delete(e),
      le.delete(e),
      fe.delete(e),
      ie.delete(e),
      C.fetchers.delete(e));
  }
  function Ge(e) {
    let t = (de.get(e) || 0) - 1;
    (t <= 0 ? (de.delete(e), fe.add(e)) : de.set(e, t), ye({ fetchers: new Map(C.fetchers) }));
  }
  function Ke(e, t) {
    let n = P.get(e);
    n && (n.abort(t), P.delete(e));
  }
  function qe(e) {
    for (let t of e) {
      let e = bn(Be(t).data);
      C.fetchers.set(t, e);
    }
  }
  function Je() {
    let e = [],
      t = !1;
    for (let n of le) {
      let r = C.fetchers.get(n);
      (w(r, `Expected fetcher: ${n}`),
        r.state === `loading` && (le.delete(n), e.push(n), (t = !0)));
    }
    return (qe(e), t);
  }
  function Ye(e) {
    let t = [];
    for (let [n, r] of ce)
      if (r < e) {
        let e = C.fetchers.get(n);
        (w(e, `Expected fetcher: ${n}`), e.state === `loading` && (Ke(n), ce.delete(n), t.push(n)));
      }
    return (qe(t), t.length > 0);
  }
  function Xe(e, t) {
    let n = C.blockers.get(e) || st;
    return (pe.get(e) !== t && pe.set(e, t), n);
  }
  function Ze(e) {
    (C.blockers.delete(e), pe.delete(e));
  }
  function Qe(e, t) {
    let n = C.blockers.get(e) || st;
    w(
      (n.state === `unblocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `proceeding`) ||
        (n.state === `blocked` && t.state === `unblocked`) ||
        (n.state === `proceeding` && t.state === `unblocked`),
      `Invalid blocker state transition: ${n.state} -> ${t.state}`
    );
    let r = new Map(C.blockers);
    (r.set(e, t), ye({ blockers: r }));
  }
  function $e({ currentLocation: e, nextLocation: t, historyAction: n }) {
    if (pe.size === 0) return;
    pe.size > 1 && T(!1, `A router only supports one blocker at a time`);
    let r = Array.from(pe.entries()),
      [i, a] = r[r.length - 1],
      o = C.blockers.get(i);
    if (
      !(o && o.state === `proceeding`) &&
      a({ currentLocation: e, nextLocation: t, historyAction: n })
    )
      return i;
  }
  function et(e) {
    let t = Xt(404, { pathname: e }),
      { matches: n, route: r } = Yt(c || s);
    return { notFoundMatches: n, route: r, error: t };
  }
  function tt(e, t, n) {
    if (((m = e), (g = t), (h = n || null), !_ && C.navigation === at)) {
      _ = !0;
      let e = lt(C.location, C.matches);
      e != null && ye({ restoreScrollPosition: e });
    }
    return () => {
      ((m = null), (g = null), (h = null));
    };
  }
  function nt(e, t) {
    return (
      (h &&
        h(
          e,
          t.map((e) => oe(e, C.loaderData))
        )) ||
      e.key
    );
  }
  function rt(e, t) {
    if (m && g) {
      let n = nt(e, t);
      m[n] = g();
    }
  }
  function lt(e, t) {
    if (m) {
      let n = nt(e, t),
        r = m[n];
      if (typeof r == `number`) return r;
    }
    return null;
  }
  function ut(t, n, r) {
    if (e.patchRoutesOnNavigation)
      if (t) {
        if (Object.keys(t[0].params).length > 0) return { active: !0, matches: L(n, r, l, !0) };
      } else return { active: !0, matches: L(n, r, l, !0) || [] };
    return { active: !1, matches: null };
  }
  async function dt(t, n, r, i) {
    if (!e.patchRoutesOnNavigation) return { type: `success`, matches: t };
    let u = t;
    for (;;) {
      let t = c == null,
        d = c || s,
        f = o;
      try {
        await e.patchRoutesOnNavigation({
          signal: r,
          path: n,
          matches: u,
          fetcherKey: i,
          patch: (e, t) => {
            r.aborted || xt(e, t, d, f, a, !1);
          },
        });
      } catch (e) {
        return { type: `error`, error: e, partialMatches: u };
      } finally {
        t && !r.aborted && (s = [...s]);
      }
      if (r.aborted) return { type: `aborted` };
      let p = I(d, n, l),
        m = null;
      if (
        p &&
        (Object.keys(p[0].params).length === 0 ||
          ((m = L(d, n, l, !0)), !(m && u.length < m.length && ft(u, m.slice(0, u.length)))))
      )
        return { type: `success`, matches: p };
      if (((m ||= L(d, n, l, !0)), !m || ft(u, m))) return { type: `success`, matches: null };
      u = m;
    }
  }
  function ft(e, t) {
    return e.length === t.length && e.every((e, n) => e.route.id === t[n].route.id);
  }
  function vt(e) {
    ((o = {}), (c = F(e, a, void 0, o)));
  }
  function yt(e, t, n = !1) {
    let r = c == null;
    (xt(e, t, c || s, o, a, n), r && ((s = [...s]), ye({})));
  }
  return (
    (S = {
      get basename() {
        return l;
      },
      get future() {
        return d;
      },
      get state() {
        return C;
      },
      get routes() {
        return s;
      },
      get window() {
        return t;
      },
      initialize: ge,
      subscribe: ve,
      enableScrollRestoration: tt,
      navigate: xe,
      fetch: Ae,
      revalidate: Se,
      createHref: (t) => e.history.createHref(t),
      encodeLocation: (t) => e.history.encodeLocation(t),
      getFetcher: Be,
      resetFetcher: Ve,
      deleteFetcher: Ge,
      dispose: _e,
      getBlocker: Xe,
      deleteBlocker: Ze,
      patchRoutes: yt,
      _internalFetchControllers: P,
      _internalSetRoutes: vt,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(e) {
        ye(e);
      },
    }),
    e.unstable_instrumentations &&
      (S = We(S, e.unstable_instrumentations.map((e) => e.router).filter(Boolean))),
    S
  );
}
function ft(e) {
  return (
    e != null && ((`formData` in e && e.formData != null) || (`body` in e && e.body !== void 0))
  );
}
function pt(e, t, n, r, i, a) {
  let o, s;
  if (i) {
    o = [];
    for (let e of t)
      if ((o.push(e), e.route.id === i)) {
        s = e;
        break;
      }
  } else ((o = t), (s = t[t.length - 1]));
  let c = Me(r || `.`, je(o), Ce(e.pathname, n) || e.pathname, a === `path`);
  if (
    (r ?? ((c.search = e.search), (c.hash = e.hash)), (r == null || r === `` || r === `.`) && s)
  ) {
    let e = pn(c.search);
    if (s.route.index && !e) c.search = c.search ? c.search.replace(/^\?/, `?index&`) : `?index`;
    else if (!s.route.index && e) {
      let e = new URLSearchParams(c.search),
        t = e.getAll(`index`);
      (e.delete(`index`), t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      c.search = n ? `?${n}` : ``;
    }
  }
  return (n !== `/` && (c.pathname = we({ basename: n, pathname: c.pathname })), te(c));
}
function mt(e, t, n) {
  if (!n || !ft(n)) return { path: t };
  if (n.formMethod && !dn(n.formMethod))
    return { path: t, error: Xt(405, { method: n.formMethod }) };
  let r = () => ({ path: t, error: Xt(400, { type: `invalid-body` }) }),
    i = (n.formMethod || `get`).toUpperCase(),
    a = Qt(t);
  if (n.body !== void 0) {
    if (n.formEncType === `text/plain`) {
      if (!fn(i)) return r();
      let e =
        typeof n.body == `string`
          ? n.body
          : n.body instanceof FormData || n.body instanceof URLSearchParams
            ? Array.from(n.body.entries()).reduce(
                (e, [t, n]) => `${e}${t}=${n}
`,
                ``
              )
            : String(n.body);
      return {
        path: t,
        submission: {
          formMethod: i,
          formAction: a,
          formEncType: n.formEncType,
          formData: void 0,
          json: void 0,
          text: e,
        },
      };
    } else if (n.formEncType === `application/json`) {
      if (!fn(i)) return r();
      try {
        let e = typeof n.body == `string` ? JSON.parse(n.body) : n.body;
        return {
          path: t,
          submission: {
            formMethod: i,
            formAction: a,
            formEncType: n.formEncType,
            formData: void 0,
            json: e,
            text: void 0,
          },
        };
      } catch {
        return r();
      }
    }
  }
  w(typeof FormData == `function`, `FormData is not available in this environment`);
  let o, s;
  if (n.formData) ((o = Ht(n.formData)), (s = n.formData));
  else if (n.body instanceof FormData) ((o = Ht(n.body)), (s = n.body));
  else if (n.body instanceof URLSearchParams) ((o = n.body), (s = Ut(o)));
  else if (n.body == null) ((o = new URLSearchParams()), (s = new FormData()));
  else
    try {
      ((o = new URLSearchParams(n.body)), (s = Ut(o)));
    } catch {
      return r();
    }
  let c = {
    formMethod: i,
    formAction: a,
    formEncType: (n && n.formEncType) || `application/x-www-form-urlencoded`,
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (fn(c.formMethod)) return { path: t, submission: c };
  let l = O(t);
  return (
    e && l.search && pn(l.search) && o.append(`index`, ``),
    (l.search = `?${o}`),
    { path: te(l), submission: c }
  );
}
function ht(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b) {
  let x = y ? (an(y[1]) ? y[1].error : y[1].data) : void 0,
    S = i.createURL(a.location),
    C = i.createURL(c),
    w;
  if (u && a.errors) {
    let e = Object.keys(a.errors)[0];
    w = o.findIndex((t) => t.route.id === e);
  } else if (y && an(y[1])) {
    let e = y[0];
    w = o.findIndex((t) => t.route.id === e) - 1;
  }
  let T = y ? y[1].statusCode : void 0,
    E = T && T >= 400,
    ee = {
      currentUrl: S,
      currentParams: a.matches[0]?.params || {},
      nextUrl: C,
      nextParams: o[0].params,
      ...s,
      actionResult: x,
      actionStatus: T,
    },
    D = ze(o),
    te = o.map((i, o) => {
      let { route: s } = i,
        c = null;
      if (
        (w != null && o > w
          ? (c = !1)
          : s.lazy
            ? (c = !0)
            : gt(s)
              ? u
                ? (c = _t(s, a.loaderData, a.errors))
                : vt(a.loaderData, a.matches[o], i) && (c = !0)
              : (c = !1),
        c !== null)
      )
        return Nt(n, r, e, D, i, l, t, c);
      let f = !1;
      typeof b == `boolean`
        ? (f = b)
        : E
          ? (f = !1)
          : d || S.pathname + S.search === C.pathname + C.search
            ? (f = !0)
            : S.search === C.search
              ? yt(a.matches[o], i) && (f = !0)
              : (f = !0);
      let p = { ...ee, defaultShouldRevalidate: f };
      return Nt(n, r, e, D, i, l, t, bt(i, p), p, b);
    }),
    O = [];
  return (
    m.forEach((e, s) => {
      if (u || !o.some((t) => t.route.id === e.routeId) || p.has(s)) return;
      let c = a.fetchers.get(s),
        m = c && c.state !== `idle` && c.data === void 0,
        y = I(g, e.path, _);
      if (!y) {
        if (v && m) return;
        O.push({
          key: s,
          routeId: e.routeId,
          path: e.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (h.has(s)) return;
      let x = mn(y, e.path),
        S = new AbortController(),
        C = Vt(i, e.path, S.signal),
        w = null;
      if (f.has(s)) (f.delete(s), (w = Pt(n, r, C, y, x, l, t)));
      else if (m) d && (w = Pt(n, r, C, y, x, l, t));
      else {
        let e;
        e = typeof b == `boolean` ? b : E ? !1 : d;
        let i = { ...ee, defaultShouldRevalidate: e };
        bt(x, i) && (w = Pt(n, r, C, y, x, l, t, i));
      }
      w &&
        O.push({
          key: s,
          routeId: e.routeId,
          path: e.path,
          matches: w,
          match: x,
          request: C,
          controller: S,
        });
    }),
    { dsMatches: te, revalidatingFetchers: O }
  );
}
function gt(e) {
  return e.loader != null || (e.middleware != null && e.middleware.length > 0);
}
function _t(e, t, n) {
  if (e.lazy) return !0;
  if (!gt(e)) return !1;
  let r = t != null && e.id in t,
    i = n != null && n[e.id] !== void 0;
  return !r && i ? !1 : typeof e.loader == `function` && e.loader.hydrate === !0 ? !0 : !r && !i;
}
function vt(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    i = !e.hasOwnProperty(n.route.id);
  return r || i;
}
function yt(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname || (n != null && n.endsWith(`*`) && e.params[`*`] !== t.params[`*`])
  );
}
function bt(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == `boolean`) return n;
  }
  return t.defaultShouldRevalidate;
}
function xt(e, t, n, r, i, a) {
  let o;
  if (e) {
    let t = r[e];
    (w(t, `No route found to patch children into: routeId = ${e}`),
      (t.children ||= []),
      (o = t.children));
  } else o = n;
  let s = [],
    c = [];
  if (
    (t.forEach((e) => {
      let t = o.find((t) => St(e, t));
      t ? c.push({ existingRoute: t, newRoute: e }) : s.push(e);
    }),
    s.length > 0)
  ) {
    let t = F(s, i, [e || `_`, `patch`, String(o?.length || `0`)], r);
    o.push(...t);
  }
  if (a && c.length > 0)
    for (let e = 0; e < c.length; e++) {
      let { existingRoute: t, newRoute: n } = c[e],
        r = t,
        [a] = F([n], i, [], {}, !0);
      Object.assign(r, {
        element: a.element ? a.element : r.element,
        errorElement: a.errorElement ? a.errorElement : r.errorElement,
        hydrateFallbackElement: a.hydrateFallbackElement
          ? a.hydrateFallbackElement
          : r.hydrateFallbackElement,
      });
    }
}
function St(e, t) {
  return `id` in e && `id` in t && e.id === t.id
    ? !0
    : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive
      ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0)
        ? !0
        : e.children.every((e, n) => t.children?.some((t) => St(e, t)))
      : !1;
}
var Ct = new WeakMap(),
  wt = ({ key: e, route: t, manifest: n, mapRouteProperties: r }) => {
    let i = n[t.id];
    if ((w(i, `No route found in manifest`), !i.lazy || typeof i.lazy != `object`)) return;
    let a = i.lazy[e];
    if (!a) return;
    let o = Ct.get(i);
    o || ((o = {}), Ct.set(i, o));
    let s = o[e];
    if (s) return s;
    let c = (async () => {
      let t = M(e),
        n = i[e] !== void 0 && e !== `hasErrorBoundary`;
      if (t)
        (T(
          !t,
          `Route property ` +
            e +
            ` is not a supported lazy route property. This property will be ignored.`
        ),
          (o[e] = Promise.resolve()));
      else if (n)
        T(
          !1,
          `Route "${i.id}" has a static property "${e}" defined. The lazy property will be ignored.`
        );
      else {
        let t = await a();
        t != null && (Object.assign(i, { [e]: t }), Object.assign(i, r(i)));
      }
      typeof i.lazy == `object` &&
        ((i.lazy[e] = void 0),
        Object.values(i.lazy).every((e) => e === void 0) && (i.lazy = void 0));
    })();
    return ((o[e] = c), c);
  },
  Tt = new WeakMap();
function Et(e, t, n, r, i) {
  let a = n[e.id];
  if ((w(a, `No route found in manifest`), !e.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof e.lazy == `function`) {
    let t = Tt.get(a);
    if (t) return { lazyRoutePromise: t, lazyHandlerPromise: t };
    let n = (async () => {
      w(typeof e.lazy == `function`, `No lazy route function found`);
      let t = await e.lazy(),
        n = {};
      for (let e in t) {
        let r = t[e];
        if (r === void 0) continue;
        let i = ie(e),
          o = a[e] !== void 0 && e !== `hasErrorBoundary`;
        i
          ? T(
              !i,
              `Route property ` +
                e +
                ` is not a supported property to be returned from a lazy route function. This property will be ignored.`
            )
          : o
            ? T(
                !o,
                `Route "${a.id}" has a static property "${e}" defined but its lazy function is also returning a value for this property. The lazy route property "${e}" will be ignored.`
              )
            : (n[e] = r);
      }
      (Object.assign(a, n), Object.assign(a, { ...r(a), lazy: void 0 }));
    })();
    return (Tt.set(a, n), n.catch(() => {}), { lazyRoutePromise: n, lazyHandlerPromise: n });
  }
  let o = Object.keys(e.lazy),
    s = [],
    c;
  for (let a of o) {
    if (i && i.includes(a)) continue;
    let o = wt({ key: a, route: e, manifest: n, mapRouteProperties: r });
    o && (s.push(o), a === t && (c = o));
  }
  let l = s.length > 0 ? Promise.all(s).then(() => {}) : void 0;
  return (l?.catch(() => {}), c?.catch(() => {}), { lazyRoutePromise: l, lazyHandlerPromise: c });
}
async function Dt(e) {
  let t = e.matches.filter((e) => e.shouldLoad),
    n = {};
  return (
    (await Promise.all(t.map((e) => e.resolve()))).forEach((e, r) => {
      n[t[r].route.id] = e;
    }),
    n
  );
}
async function Ot(e) {
  return e.matches.some((e) => e.route.middleware) ? kt(e, () => Dt(e)) : Dt(e);
}
function kt(e, t) {
  return At(
    e,
    t,
    (e) => {
      if (un(e)) throw e;
      return e;
    },
    tn,
    n
  );
  function n(t, n, r) {
    if (r) return Promise.resolve(Object.assign(r.value, { [n]: { type: `error`, result: t } }));
    {
      let { matches: r } = e,
        i = Jt(
          r,
          r[
            Math.min(
              Math.max(
                r.findIndex((e) => e.route.id === n),
                0
              ),
              Math.max(
                r.findIndex((e) => e.shouldCallHandler()),
                0
              )
            )
          ].route.id
        ).route.id;
      return Promise.resolve({ [i]: { type: `error`, result: t } });
    }
  }
}
async function At(e, t, n, r, i) {
  let { matches: a, request: o, params: s, context: c, unstable_pattern: l } = e,
    u = a.flatMap((e) =>
      e.route.middleware ? e.route.middleware.map((t) => [e.route.id, t]) : []
    );
  return await jt({ request: o, params: s, context: c, unstable_pattern: l }, u, t, n, r, i);
}
async function jt(e, t, n, r, i, a, o = 0) {
  let { request: s } = e;
  if (s.signal.aborted) throw s.signal.reason ?? Error(`Request aborted: ${s.method} ${s.url}`);
  let c = t[o];
  if (!c) return await n();
  let [l, u] = c,
    d,
    f = async () => {
      if (d) throw Error("You may only call `next()` once per middleware");
      try {
        return ((d = { value: await jt(e, t, n, r, i, a, o + 1) }), d.value);
      } catch (e) {
        return ((d = { value: await a(e, l, d) }), d.value);
      }
    };
  try {
    let t = await u(e, f),
      n = t == null ? void 0 : r(t);
    return i(n) ? n : d ? (n ?? d.value) : ((d = { value: await f() }), d.value);
  } catch (e) {
    return await a(e, l, d);
  }
}
function Mt(e, t, n, r, i) {
  let a = wt({ key: `middleware`, route: r.route, manifest: t, mapRouteProperties: e }),
    o = Et(r.route, fn(n.method) ? `action` : `loader`, t, e, i);
  return { middleware: a, route: o.lazyRoutePromise, handler: o.lazyHandlerPromise };
}
function Nt(e, t, n, r, i, a, o, s, c = null, l) {
  let u = !1,
    d = Mt(e, t, n, i, a);
  return {
    ...i,
    _lazyPromises: d,
    shouldLoad: s,
    shouldRevalidateArgs: c,
    shouldCallHandler(e) {
      return (
        (u = !0),
        c
          ? typeof l == `boolean`
            ? bt(i, { ...c, defaultShouldRevalidate: l })
            : typeof e == `boolean`
              ? bt(i, { ...c, defaultShouldRevalidate: e })
              : bt(i, c)
          : s
      );
    },
    resolve(e) {
      let { lazy: t, loader: a, middleware: c } = i.route,
        l = u || s || (e && !fn(n.method) && (t || a)),
        f = c && c.length > 0 && !a && !t;
      return l && (fn(n.method) || !f)
        ? It({
            request: n,
            unstable_pattern: r,
            match: i,
            lazyHandlerPromise: d?.handler,
            lazyRoutePromise: d?.route,
            handlerOverride: e,
            scopedContext: o,
          })
        : Promise.resolve({ type: `data`, result: void 0 });
    },
  };
}
function Pt(e, t, n, r, i, a, o, s = null) {
  return r.map((c) =>
    c.route.id === i.route.id
      ? Nt(e, t, n, ze(r), c, a, o, !0, s)
      : {
          ...c,
          shouldLoad: !1,
          shouldRevalidateArgs: s,
          shouldCallHandler: () => !1,
          _lazyPromises: Mt(e, t, n, c, a),
          resolve: () => Promise.resolve({ type: `data`, result: void 0 }),
        }
  );
}
async function Ft(e, t, n, r, i, a) {
  n.some((e) => e._lazyPromises?.middleware) &&
    (await Promise.all(n.map((e) => e._lazyPromises?.middleware)));
  let o = { request: t, unstable_pattern: ze(n), params: n[0].params, context: i, matches: n },
    s = a
      ? () => {
          throw Error(
            "You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`"
          );
        }
      : (e) => {
          let t = o;
          return kt(t, () =>
            e({
              ...t,
              fetcherKey: r,
              runClientMiddleware: () => {
                throw Error(
                  "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
                );
              },
            })
          );
        },
    c = await e({ ...o, fetcherKey: r, runClientMiddleware: s });
  try {
    await Promise.all(n.flatMap((e) => [e._lazyPromises?.handler, e._lazyPromises?.route]));
  } catch {}
  return c;
}
async function It({
  request: e,
  unstable_pattern: t,
  match: n,
  lazyHandlerPromise: r,
  lazyRoutePromise: i,
  handlerOverride: a,
  scopedContext: o,
}) {
  let s,
    c,
    l = fn(e.method),
    u = l ? `action` : `loader`,
    d = (r) => {
      let i,
        s = new Promise((e, t) => (i = t));
      ((c = () => i()), e.signal.addEventListener(`abort`, c));
      let l = (i) =>
          typeof r == `function`
            ? r(
                { request: e, unstable_pattern: t, params: n.params, context: o },
                ...(i === void 0 ? [] : [i])
              )
            : Promise.reject(
                Error(
                  `You cannot call the handler for a route which defines a boolean "${u}" [routeId: ${n.route.id}]`
                )
              ),
        d = (async () => {
          try {
            return { type: `data`, result: await (a ? a((e) => l(e)) : l()) };
          } catch (e) {
            return { type: `error`, result: e };
          }
        })();
      return Promise.race([d, s]);
    };
  try {
    let t = l ? n.route.action : n.route.loader;
    if (r || i)
      if (t) {
        let e,
          [n] = await Promise.all([
            d(t).catch((t) => {
              e = t;
            }),
            r,
            i,
          ]);
        if (e !== void 0) throw e;
        s = n;
      } else {
        await r;
        let t = l ? n.route.action : n.route.loader;
        if (t) [s] = await Promise.all([d(t), i]);
        else if (u === `action`) {
          let t = new URL(e.url),
            r = t.pathname + t.search;
          throw Xt(405, { method: e.method, pathname: r, routeId: n.route.id });
        } else return { type: `data`, result: void 0 };
      }
    else if (t) s = await d(t);
    else {
      let t = new URL(e.url);
      throw Xt(404, { pathname: t.pathname + t.search });
    }
  } catch (e) {
    return { type: `error`, result: e };
  } finally {
    c && e.signal.removeEventListener(`abort`, c);
  }
  return s;
}
async function Lt(e) {
  let t = e.headers.get(`Content-Type`);
  return t && /\bapplication\/json\b/.test(t) ? (e.body == null ? null : e.json()) : e.text();
}
async function Rt(e) {
  let { result: t, type: n } = e;
  if (cn(t)) {
    let e;
    try {
      e = await Lt(t);
    } catch (e) {
      return { type: `error`, error: e };
    }
    return n === `error`
      ? {
          type: `error`,
          error: new Le(t.status, t.statusText, e),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: `data`, data: e, statusCode: t.status, headers: t.headers };
  }
  return n === `error`
    ? sn(t)
      ? t.data instanceof Error
        ? {
            type: `error`,
            error: t.data,
            statusCode: t.init?.status,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
        : {
            type: `error`,
            error: en(t),
            statusCode: Re(t) ? t.status : void 0,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
      : { type: `error`, error: t, statusCode: Re(t) ? t.status : void 0 }
    : sn(t)
      ? {
          type: `data`,
          data: t.data,
          statusCode: t.init?.status,
          headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
        }
      : { type: `data`, data: t };
}
function zt(e, t, n, r, i) {
  let a = e.headers.get(`Location`);
  if (
    (w(a, `Redirects returned/thrown from loaders/actions must have a Location header`), !Ee(a))
  ) {
    let o = r.slice(0, r.findIndex((e) => e.route.id === n) + 1);
    ((a = pt(new URL(t.url), o, i, a)), e.headers.set(`Location`, a));
  }
  return e;
}
function Bt(e, t, n, r) {
  let i = [
    `about:`,
    `blob:`,
    `chrome:`,
    `chrome-untrusted:`,
    `content:`,
    `data:`,
    `devtools:`,
    `file:`,
    `filesystem:`,
    `javascript:`,
  ];
  if (Ee(e)) {
    let r = e,
      a = r.startsWith(`//`) ? new URL(t.protocol + r) : new URL(r);
    if (i.includes(a.protocol)) throw Error(`Invalid redirect location`);
    let o = Ce(a.pathname, n) != null;
    if (a.origin === t.origin && o) return a.pathname + a.search + a.hash;
  }
  try {
    let t = r.createURL(e);
    if (i.includes(t.protocol)) throw Error(`Invalid redirect location`);
  } catch {}
  return e;
}
function Vt(e, t, n, r) {
  let i = e.createURL(Qt(t)).toString(),
    a = { signal: n };
  if (r && fn(r.formMethod)) {
    let { formMethod: e, formEncType: t } = r;
    ((a.method = e.toUpperCase()),
      t === `application/json`
        ? ((a.headers = new Headers({ "Content-Type": t })), (a.body = JSON.stringify(r.json)))
        : t === `text/plain`
          ? (a.body = r.text)
          : t === `application/x-www-form-urlencoded` && r.formData
            ? (a.body = Ht(r.formData))
            : (a.body = r.formData));
  }
  return new Request(i, a);
}
function Ht(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries()) t.append(n, typeof r == `string` ? r : r.name);
  return t;
}
function Ut(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function Wt(e, t, n, r = !1, i = !1) {
  let a = {},
    o = null,
    s,
    c = !1,
    l = {},
    u = n && an(n[1]) ? n[1].error : void 0;
  return (
    e.forEach((n) => {
      if (!(n.route.id in t)) return;
      let d = n.route.id,
        f = t[d];
      if ((w(!on(f), `Cannot handle redirect results in processLoaderData`), an(f))) {
        let t = f.error;
        if ((u !== void 0 && ((t = u), (u = void 0)), (o ||= {}), i)) o[d] = t;
        else {
          let n = Jt(e, d);
          o[n.route.id] ?? (o[n.route.id] = t);
        }
        (r || (a[d] = ut),
          c || ((c = !0), (s = Re(f.error) ? f.error.status : 500)),
          f.headers && (l[d] = f.headers));
      } else
        ((a[d] = f.data),
          f.statusCode && f.statusCode !== 200 && !c && (s = f.statusCode),
          f.headers && (l[d] = f.headers));
    }),
    u !== void 0 && n && ((o = { [n[0]]: u }), n[2] && (a[n[2]] = void 0)),
    { loaderData: a, errors: o, statusCode: s || 200, loaderHeaders: l }
  );
}
function Gt(e, t, n, r, i, a) {
  let { loaderData: o, errors: s } = Wt(t, n, r);
  return (
    i
      .filter((e) => !e.matches || e.matches.some((e) => e.shouldLoad))
      .forEach((t) => {
        let { key: n, match: r, controller: i } = t;
        if (i && i.signal.aborted) return;
        let o = a[n];
        if ((w(o, `Did not find corresponding fetcher result`), an(o))) {
          let t = Jt(e.matches, r?.route.id);
          ((s && s[t.route.id]) || (s = { ...s, [t.route.id]: o.error }), e.fetchers.delete(n));
        } else if (on(o)) w(!1, `Unhandled fetcher revalidation redirect`);
        else {
          let t = bn(o.data);
          e.fetchers.set(n, t);
        }
      }),
    { loaderData: o, errors: s }
  );
}
function Kt(e, t, n, r) {
  let i = Object.entries(t)
    .filter(([, e]) => e !== ut)
    .reduce((e, [t, n]) => ((e[t] = n), e), {});
  for (let a of n) {
    let n = a.route.id;
    if (
      (!t.hasOwnProperty(n) && e.hasOwnProperty(n) && a.route.loader && (i[n] = e[n]),
      r && r.hasOwnProperty(n))
    )
      break;
  }
  return i;
}
function qt(e) {
  return e ? (an(e[1]) ? { actionData: {} } : { actionData: { [e[0]]: e[1].data } }) : {};
}
function Jt(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((e) => e.route.id === t) + 1) : [...e])
      .reverse()
      .find((e) => e.route.hasErrorBoundary === !0) || e[0]
  );
}
function Yt(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((e) => e.index || !e.path || e.path === `/`) || { id: `__shim-error-route__` };
  return { matches: [{ params: {}, pathname: ``, pathnameBase: ``, route: t }], route: t };
}
function Xt(e, { pathname: t, routeId: n, method: r, type: i, message: a } = {}) {
  let o = `Unknown Server Error`,
    s = `Unknown @remix-run/router error`;
  return (
    e === 400
      ? ((o = `Bad Request`),
        r && t && n
          ? (s = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`)
          : i === `invalid-body` && (s = `Unable to encode submission body`))
      : e === 403
        ? ((o = `Forbidden`), (s = `Route "${n}" does not match URL "${t}"`))
        : e === 404
          ? ((o = `Not Found`), (s = `No route matches URL "${t}"`))
          : e === 405 &&
            ((o = `Method Not Allowed`),
            r && t && n
              ? (s = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`)
              : r && (s = `Invalid request method "${r.toUpperCase()}"`)),
    new Le(e || 500, o, Error(s), !0)
  );
}
function Zt(e) {
  let t = Object.entries(e);
  for (let e = t.length - 1; e >= 0; e--) {
    let [n, r] = t[e];
    if (on(r)) return { key: n, result: r };
  }
}
function Qt(e) {
  return te({ ...(typeof e == `string` ? O(e) : e), hash: `` });
}
function $t(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ``
      ? t.hash !== ``
      : e.hash === t.hash
        ? !0
        : t.hash !== ``;
}
function en(e) {
  return new Le(e.init?.status ?? 500, e.init?.statusText ?? `Internal Server Error`, e.data);
}
function tn(e) {
  return (
    typeof e == `object` &&
    !!e &&
    Object.entries(e).every(([e, t]) => typeof e == `string` && nn(t))
  );
}
function nn(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `type` in e &&
    `result` in e &&
    (e.type === `data` || e.type === `error`)
  );
}
function rn(e) {
  return cn(e.result) && rt.has(e.result.status);
}
function an(e) {
  return e.type === `error`;
}
function on(e) {
  return (e && e.type) === `redirect`;
}
function sn(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `type` in e &&
    `data` in e &&
    `init` in e &&
    e.type === `DataWithResponseInit`
  );
}
function cn(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.headers == `object` &&
    e.body !== void 0
  );
}
function ln(e) {
  return rt.has(e);
}
function un(e) {
  return cn(e) && ln(e.status) && e.headers.has(`Location`);
}
function dn(e) {
  return nt.has(e.toUpperCase());
}
function fn(e) {
  return et.has(e.toUpperCase());
}
function pn(e) {
  return new URLSearchParams(e).getAll(`index`).some((e) => e === ``);
}
function mn(e, t) {
  let n = typeof t == `string` ? O(t).search : t.search;
  if (e[e.length - 1].route.index && pn(n || ``)) return e[e.length - 1];
  let r = Ae(e);
  return r[r.length - 1];
}
function hn(e) {
  let { formMethod: t, formAction: n, formEncType: r, text: i, formData: a, json: o } = e;
  if (!(!t || !n || !r)) {
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: i,
      };
    if (a != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: a,
        json: void 0,
        text: void 0,
      };
    if (o !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: o,
        text: void 0,
      };
  }
}
function gn(e, t) {
  return t
    ? {
        state: `loading`,
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: `loading`,
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function _n(e, t) {
  return {
    state: `submitting`,
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function vn(e, t) {
  return e
    ? {
        state: `loading`,
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: `loading`,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function yn(e, t) {
  return {
    state: `submitting`,
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function bn(e) {
  return {
    state: `idle`,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function xn(e, t) {
  try {
    let n = e.sessionStorage.getItem(lt);
    if (n) {
      let e = JSON.parse(n);
      for (let [n, r] of Object.entries(e || {}))
        r && Array.isArray(r) && t.set(n, new Set(r || []));
    }
  } catch {}
}
function Sn(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [e, r] of t) n[e] = [...r];
    try {
      e.sessionStorage.setItem(lt, JSON.stringify(n));
    } catch (e) {
      T(!1, `Failed to save applied view transitions in sessionStorage (${e}).`);
    }
  }
}
function Cn() {
  let e,
    t,
    n = new Promise((r, i) => {
      ((e = async (e) => {
        r(e);
        try {
          await n;
        } catch {}
      }),
        (t = async (e) => {
          i(e);
          try {
            await n;
          } catch {}
        }));
    });
  return { promise: n, resolve: e, reject: t };
}
var wn = _.createContext(null);
wn.displayName = `DataRouter`;
var Tn = _.createContext(null);
Tn.displayName = `DataRouterState`;
var En = _.createContext(!1);
function Dn() {
  return _.useContext(En);
}
var On = _.createContext({ isTransitioning: !1 });
On.displayName = `ViewTransition`;
var kn = _.createContext(new Map());
kn.displayName = `Fetchers`;
var An = _.createContext(null);
An.displayName = `Await`;
var jn = _.createContext(null);
jn.displayName = `Navigation`;
var Mn = _.createContext(null);
Mn.displayName = `Location`;
var Nn = _.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Nn.displayName = `Route`;
var Pn = _.createContext(null);
Pn.displayName = `RouteError`;
var Fn = `REACT_ROUTER_ERROR`,
  In = `REDIRECT`,
  Ln = `ROUTE_ERROR_RESPONSE`;
function Rn(e) {
  if (e.startsWith(`${Fn}:${In}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string` &&
        typeof t.location == `string` &&
        typeof t.reloadDocument == `boolean` &&
        typeof t.replace == `boolean`
      )
        return t;
    } catch {}
}
function zn(e) {
  if (e.startsWith(`${Fn}:${Ln}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string`
      )
        return new Le(t.status, t.statusText, t.data);
    } catch {}
}
function Bn(e, { relative: t } = {}) {
  w(Vn(), `useHref() may be used only in the context of a <Router> component.`);
  let { basename: n, navigator: r } = _.useContext(jn),
    { hash: i, pathname: a, search: o } = Jn(e, { relative: t }),
    s = a;
  return (
    n !== `/` && (s = a === `/` ? n : Ne([n, a])),
    r.createHref({ pathname: s, search: o, hash: i })
  );
}
function Vn() {
  return _.useContext(Mn) != null;
}
function Hn() {
  return (
    w(Vn(), `useLocation() may be used only in the context of a <Router> component.`),
    _.useContext(Mn).location
  );
}
var Un = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function Wn(e) {
  _.useContext(jn).static || _.useLayoutEffect(e);
}
function Gn() {
  let { isDataRoute: e } = _.useContext(Nn);
  return e ? fr() : Kn();
}
function Kn() {
  w(Vn(), `useNavigate() may be used only in the context of a <Router> component.`);
  let e = _.useContext(wn),
    { basename: t, navigator: n } = _.useContext(jn),
    { matches: r } = _.useContext(Nn),
    { pathname: i } = Hn(),
    a = JSON.stringify(je(r)),
    o = _.useRef(!1);
  return (
    Wn(() => {
      o.current = !0;
    }),
    _.useCallback(
      (r, s = {}) => {
        if ((T(o.current, Un), !o.current)) return;
        if (typeof r == `number`) {
          n.go(r);
          return;
        }
        let c = Me(r, JSON.parse(a), i, s.relative === `path`);
        (e == null && t !== `/` && (c.pathname = c.pathname === `/` ? t : Ne([t, c.pathname])),
          (s.replace ? n.replace : n.push)(c, s.state, s));
      },
      [t, n, a, i, e]
    )
  );
}
_.createContext(null);
function qn() {
  let { matches: e } = _.useContext(Nn),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Jn(e, { relative: t } = {}) {
  let { matches: n } = _.useContext(Nn),
    { pathname: r } = Hn(),
    i = JSON.stringify(je(n));
  return _.useMemo(() => Me(e, JSON.parse(i), r, t === `path`), [e, i, r, t]);
}
function Yn(e, t, n, r, i) {
  w(Vn(), `useRoutes() may be used only in the context of a <Router> component.`);
  let { navigator: a } = _.useContext(jn),
    { matches: o } = _.useContext(Nn),
    s = o[o.length - 1],
    c = s ? s.params : {},
    l = s ? s.pathname : `/`,
    u = s ? s.pathnameBase : `/`,
    d = s && s.route;
  {
    let e = (d && d.path) || ``;
    mr(
      l,
      !d || e.endsWith(`*`) || e.endsWith(`*?`),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e === `/` ? `*` : `${e}/*`}">.`
    );
  }
  let f = Hn(),
    p;
  if (t) {
    let e = typeof t == `string` ? O(t) : t;
    (w(
      u === `/` || e.pathname?.startsWith(u),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${u}" but pathname "${e.pathname}" was given in the \`location\` prop.`
    ),
      (p = e));
  } else p = f;
  let m = p.pathname || `/`,
    h = m;
  if (u !== `/`) {
    let e = u.replace(/^\//, ``).split(`/`);
    h = `/` + m.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`);
  }
  let g = I(e, { pathname: h });
  (T(d || g != null, `No routes matched location "${p.pathname}${p.search}${p.hash}" `),
    T(
      g == null ||
        g[g.length - 1].route.element !== void 0 ||
        g[g.length - 1].route.Component !== void 0 ||
        g[g.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let v = nr(
    g &&
      g.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, c, e.params),
          pathname: Ne([
            u,
            a.encodeLocation
              ? a.encodeLocation(e.pathname.replace(/\?/g, `%3F`).replace(/#/g, `%23`)).pathname
              : e.pathname,
          ]),
          pathnameBase:
            e.pathnameBase === `/`
              ? u
              : Ne([
                  u,
                  a.encodeLocation
                    ? a.encodeLocation(e.pathnameBase.replace(/\?/g, `%3F`).replace(/#/g, `%23`))
                        .pathname
                    : e.pathnameBase,
                ]),
        })
      ),
    o,
    n,
    r,
    i
  );
  return t && v
    ? _.createElement(
        Mn.Provider,
        {
          value: {
            location: { pathname: `/`, search: ``, hash: ``, state: null, key: `default`, ...p },
            navigationType: `POP`,
          },
        },
        v
      )
    : v;
}
function Xn() {
  let e = dr(),
    t = Re(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = `rgba(200,200,200, 0.5)`,
    i = { padding: `0.5rem`, backgroundColor: r },
    a = { padding: `2px 4px`, backgroundColor: r },
    o = null;
  return (
    console.error(`Error handled by React Router default ErrorBoundary:`, e),
    (o = _.createElement(
      _.Fragment,
      null,
      _.createElement(`p`, null, `💿 Hey developer 👋`),
      _.createElement(
        `p`,
        null,
        `You can provide a way better UX than this when your app throws errors by providing your own `,
        _.createElement(`code`, { style: a }, `ErrorBoundary`),
        ` or`,
        ` `,
        _.createElement(`code`, { style: a }, `errorElement`),
        ` prop on your route.`
      )
    )),
    _.createElement(
      _.Fragment,
      null,
      _.createElement(`h2`, null, `Unexpected Application Error!`),
      _.createElement(`h3`, { style: { fontStyle: `italic` } }, t),
      n ? _.createElement(`pre`, { style: i }, n) : null,
      o
    )
  );
}
var Zn = _.createElement(Xn, null),
  Qn = class extends _.Component {
    constructor(e) {
      (super(e),
        (this.state = { location: e.location, revalidation: e.revalidation, error: e.error }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location || (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(`React Router caught the following error during render`, e);
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == `object` &&
        e &&
        `digest` in e &&
        typeof e.digest == `string`
      ) {
        let t = zn(e.digest);
        t && (e = t);
      }
      let t =
        e === void 0
          ? this.props.children
          : _.createElement(
              Nn.Provider,
              { value: this.props.routeContext },
              _.createElement(Pn.Provider, { value: e, children: this.props.component })
            );
      return this.context ? _.createElement(er, { error: e }, t) : t;
    }
  };
Qn.contextType = En;
var $n = new WeakMap();
function er({ children: e, error: t }) {
  let { basename: n } = _.useContext(jn);
  if (typeof t == `object` && t && `digest` in t && typeof t.digest == `string`) {
    let e = Rn(t.digest);
    if (e) {
      let r = $n.get(t);
      if (r) throw r;
      let i = Ve(e.location, n);
      if (Be && !$n.get(t))
        if (i.isExternal || e.reloadDocument) window.location.href = i.absoluteURL || i.to;
        else {
          let n = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(i.to, { replace: e.replace })
          );
          throw ($n.set(t, n), n);
        }
      return _.createElement(`meta`, {
        httpEquiv: `refresh`,
        content: `0;url=${i.absoluteURL || i.to}`,
      });
    }
  }
  return e;
}
function tr({ routeContext: e, match: t, children: n }) {
  let r = _.useContext(wn);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    _.createElement(Nn.Provider, { value: e }, n)
  );
}
function nr(e, t = [], n = null, r = null, i = null) {
  if (e == null) {
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches;
    else return null;
  }
  let a = e,
    o = n?.errors;
  if (o != null) {
    let e = a.findIndex((e) => e.route.id && o?.[e.route.id] !== void 0);
    (w(
      e >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(`,`)}`
    ),
      (a = a.slice(0, Math.min(a.length, e + 1))));
  }
  let s = !1,
    c = -1;
  if (n)
    for (let e = 0; e < a.length; e++) {
      let t = a[e];
      if (((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (c = e), t.route.id)) {
        let { loaderData: e, errors: r } = n,
          i = t.route.loader && !e.hasOwnProperty(t.route.id) && (!r || r[t.route.id] === void 0);
        if (t.route.lazy || i) {
          ((s = !0), (a = c >= 0 ? a.slice(0, c + 1) : [a[0]]));
          break;
        }
      }
    }
  let l =
    n && r
      ? (e, t) => {
          r(e, {
            location: n.location,
            params: n.matches?.[0]?.params ?? {},
            unstable_pattern: ze(n.matches),
            errorInfo: t,
          });
        }
      : void 0;
  return a.reduceRight((e, r, i) => {
    let u,
      d = !1,
      f = null,
      p = null;
    n &&
      ((u = o && r.route.id ? o[r.route.id] : void 0),
      (f = r.route.errorElement || Zn),
      s &&
        (c < 0 && i === 0
          ? (mr(
              `route-fallback`,
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (d = !0),
            (p = null))
          : c === i && ((d = !0), (p = r.route.hydrateFallbackElement || null))));
    let m = t.concat(a.slice(0, i + 1)),
      h = () => {
        let t;
        return (
          (t = u
            ? f
            : d
              ? p
              : r.route.Component
                ? _.createElement(r.route.Component, null)
                : r.route.element
                  ? r.route.element
                  : e),
          _.createElement(tr, {
            match: r,
            routeContext: { outlet: e, matches: m, isDataRoute: n != null },
            children: t,
          })
        );
      };
    return n && (r.route.ErrorBoundary || r.route.errorElement || i === 0)
      ? _.createElement(Qn, {
          location: n.location,
          revalidation: n.revalidation,
          component: f,
          error: u,
          children: h(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
          onError: l,
        })
      : h();
  }, null);
}
function rr(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ir(e) {
  let t = _.useContext(wn);
  return (w(t, rr(e)), t);
}
function ar(e) {
  let t = _.useContext(Tn);
  return (w(t, rr(e)), t);
}
function or(e) {
  let t = _.useContext(Nn);
  return (w(t, rr(e)), t);
}
function sr(e) {
  let t = or(e),
    n = t.matches[t.matches.length - 1];
  return (w(n.route.id, `${e} can only be used on routes that contain a unique "id"`), n.route.id);
}
function cr() {
  return sr(`useRouteId`);
}
function lr() {
  return ar(`useNavigation`).navigation;
}
function ur() {
  let { matches: e, loaderData: t } = ar(`useMatches`);
  return _.useMemo(() => e.map((e) => oe(e, t)), [e, t]);
}
function dr() {
  let e = _.useContext(Pn),
    t = ar(`useRouteError`),
    n = sr(`useRouteError`);
  return e === void 0 ? t.errors?.[n] : e;
}
function fr() {
  let { router: e } = ir(`useNavigate`),
    t = sr(`useNavigate`),
    n = _.useRef(!1);
  return (
    Wn(() => {
      n.current = !0;
    }),
    _.useCallback(
      async (r, i = {}) => {
        (T(n.current, Un),
          n.current &&
            (typeof r == `number`
              ? await e.navigate(r)
              : await e.navigate(r, { fromRouteId: t, ...i })));
      },
      [e, t]
    )
  );
}
var pr = {};
function mr(e, t, n) {
  !t && !pr[e] && ((pr[e] = !0), T(!1, n));
}
var hr = {};
function gr(e, t) {
  !e && !hr[t] && ((hr[t] = !0), console.warn(t));
}
var _r = _.useOptimistic,
  vr = () => void 0;
function yr(e) {
  return _r ? _r(e) : [e, vr];
}
function br(e) {
  let t = {
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      (e.element &&
        T(
          !1,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        ),
      Object.assign(t, { element: _.createElement(e.Component), Component: void 0 })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement &&
        T(
          !1,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        ),
      Object.assign(t, {
        hydrateFallbackElement: _.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      })),
    e.ErrorBoundary &&
      (e.errorElement &&
        T(
          !1,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        ),
      Object.assign(t, { errorElement: _.createElement(e.ErrorBoundary), ErrorBoundary: void 0 })),
    t
  );
}
var xr = [`HydrateFallback`, `hydrateFallbackElement`],
  Sr = class {
    constructor() {
      ((this.status = `pending`),
        (this.promise = new Promise((e, t) => {
          ((this.resolve = (t) => {
            this.status === `pending` && ((this.status = `resolved`), e(t));
          }),
            (this.reject = (e) => {
              this.status === `pending` && ((this.status = `rejected`), t(e));
            }));
        })));
    }
  };
function Cr({ router: e, flushSync: t, onError: n, unstable_useTransitions: r }) {
  r = Dn() || r;
  let [i, a] = _.useState(e.state),
    [o, s] = yr(i),
    [c, l] = _.useState(),
    [u, d] = _.useState({ isTransitioning: !1 }),
    [f, p] = _.useState(),
    [m, h] = _.useState(),
    [g, v] = _.useState(),
    y = _.useRef(new Map()),
    b = _.useCallback(
      (i, { deletedFetchers: o, newErrors: c, flushSync: u, viewTransitionOpts: g }) => {
        (c &&
          n &&
          Object.values(c).forEach((e) =>
            n(e, {
              location: i.location,
              params: i.matches[0]?.params ?? {},
              unstable_pattern: ze(i.matches),
            })
          ),
          i.fetchers.forEach((e, t) => {
            e.data !== void 0 && y.current.set(t, e.data);
          }),
          o.forEach((e) => y.current.delete(e)),
          gr(
            u === !1 || t != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          ));
        let b =
          e.window != null &&
          e.window.document != null &&
          typeof e.window.document.startViewTransition == `function`;
        if (
          (gr(
            g == null || b,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
          ),
          !g || !b)
        ) {
          t && u
            ? t(() => a(i))
            : r === !1
              ? a(i)
              : _.startTransition(() => {
                  (r === !0 && s((e) => wr(e, i)), a(i));
                });
          return;
        }
        if (t && u) {
          t(() => {
            (m && (f?.resolve(), m.skipTransition()),
              d({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: g.currentLocation,
                nextLocation: g.nextLocation,
              }));
          });
          let n = e.window.document.startViewTransition(() => {
            t(() => a(i));
          });
          (n.finished.finally(() => {
            t(() => {
              (p(void 0), h(void 0), l(void 0), d({ isTransitioning: !1 }));
            });
          }),
            t(() => h(n)));
          return;
        }
        m
          ? (f?.resolve(),
            m.skipTransition(),
            v({ state: i, currentLocation: g.currentLocation, nextLocation: g.nextLocation }))
          : (l(i),
            d({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: g.currentLocation,
              nextLocation: g.nextLocation,
            }));
      },
      [e.window, t, m, f, r, s, n]
    );
  (_.useLayoutEffect(() => e.subscribe(b), [e, b]),
    _.useEffect(() => {
      u.isTransitioning && !u.flushSync && p(new Sr());
    }, [u]),
    _.useEffect(() => {
      if (f && c && e.window) {
        let t = c,
          n = f.promise,
          i = e.window.document.startViewTransition(async () => {
            (r === !1
              ? a(t)
              : _.startTransition(() => {
                  (r === !0 && s((e) => wr(e, t)), a(t));
                }),
              await n);
          });
        (i.finished.finally(() => {
          (p(void 0), h(void 0), l(void 0), d({ isTransitioning: !1 }));
        }),
          h(i));
      }
    }, [c, f, e.window, r, s]),
    _.useEffect(() => {
      f && c && o.location.key === c.location.key && f.resolve();
    }, [f, m, o.location, c]),
    _.useEffect(() => {
      !u.isTransitioning &&
        g &&
        (l(g.state),
        d({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: g.currentLocation,
          nextLocation: g.nextLocation,
        }),
        v(void 0));
    }, [u.isTransitioning, g]));
  let x = _.useMemo(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (t) => e.navigate(t),
        push: (t, n, r) => e.navigate(t, { state: n, preventScrollReset: r?.preventScrollReset }),
        replace: (t, n, r) =>
          e.navigate(t, { replace: !0, state: n, preventScrollReset: r?.preventScrollReset }),
      }),
      [e]
    ),
    S = e.basename || `/`,
    C = _.useMemo(
      () => ({ router: e, navigator: x, static: !1, basename: S, onError: n }),
      [e, x, S, n]
    );
  return _.createElement(
    _.Fragment,
    null,
    _.createElement(
      wn.Provider,
      { value: C },
      _.createElement(
        Tn.Provider,
        { value: o },
        _.createElement(
          kn.Provider,
          { value: y.current },
          _.createElement(
            On.Provider,
            { value: u },
            _.createElement(
              Dr,
              {
                basename: S,
                location: o.location,
                navigationType: o.historyAction,
                navigator: x,
                unstable_useTransitions: r,
              },
              _.createElement(Tr, { routes: e.routes, future: e.future, state: o, onError: n })
            )
          )
        )
      )
    ),
    null
  );
}
function wr(e, t) {
  return {
    ...e,
    navigation: t.navigation.state === `idle` ? e.navigation : t.navigation,
    revalidation: t.revalidation === `idle` ? e.revalidation : t.revalidation,
    actionData: t.navigation.state === `submitting` ? e.actionData : t.actionData,
    fetchers: t.fetchers,
  };
}
var Tr = _.memo(Er);
function Er({ routes: e, future: t, state: n, onError: r }) {
  return Yn(e, void 0, n, r, t);
}
function Dr({
  basename: e = `/`,
  children: t = null,
  location: n,
  navigationType: r = `POP`,
  navigator: i,
  static: a = !1,
  unstable_useTransitions: o,
}) {
  w(
    !Vn(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let s = e.replace(/^\/*/, `/`),
    c = _.useMemo(
      () => ({ basename: s, navigator: i, static: a, unstable_useTransitions: o, future: {} }),
      [s, i, a, o]
    );
  typeof n == `string` && (n = O(n));
  let { pathname: l = `/`, search: u = ``, hash: d = ``, state: f = null, key: p = `default` } = n,
    m = _.useMemo(() => {
      let e = Ce(l, s);
      return e == null
        ? null
        : { location: { pathname: e, search: u, hash: d, state: f, key: p }, navigationType: r };
    }, [s, l, u, d, f, p, r]);
  return (
    T(
      m != null,
      `<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    m == null
      ? null
      : _.createElement(
          jn.Provider,
          { value: c },
          _.createElement(Mn.Provider, { children: t, value: m })
        )
  );
}
var Or = `get`,
  kr = `application/x-www-form-urlencoded`;
function Ar(e) {
  return typeof HTMLElement < `u` && e instanceof HTMLElement;
}
function jr(e) {
  return Ar(e) && e.tagName.toLowerCase() === `button`;
}
function Mr(e) {
  return Ar(e) && e.tagName.toLowerCase() === `form`;
}
function Nr(e) {
  return Ar(e) && e.tagName.toLowerCase() === `input`;
}
function Pr(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Fr(e, t) {
  return e.button === 0 && (!t || t === `_self`) && !Pr(e);
}
var Ir = null;
function Lr() {
  if (Ir === null)
    try {
      (new FormData(document.createElement(`form`), 0), (Ir = !1));
    } catch {
      Ir = !0;
    }
  return Ir;
}
var Rr = new Set([`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`]);
function zr(e) {
  return e != null && !Rr.has(e)
    ? (T(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${kr}"`
      ),
      null)
    : e;
}
function Br(e, t) {
  let n, r, i, a, o;
  if (Mr(e)) {
    let o = e.getAttribute(`action`);
    ((r = o ? Ce(o, t) : null),
      (n = e.getAttribute(`method`) || Or),
      (i = zr(e.getAttribute(`enctype`)) || kr),
      (a = new FormData(e)));
  } else if (jr(e) || (Nr(e) && (e.type === `submit` || e.type === `image`))) {
    let o = e.form;
    if (o == null)
      throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
    let s = e.getAttribute(`formaction`) || o.getAttribute(`action`);
    if (
      ((r = s ? Ce(s, t) : null),
      (n = e.getAttribute(`formmethod`) || o.getAttribute(`method`) || Or),
      (i = zr(e.getAttribute(`formenctype`)) || zr(o.getAttribute(`enctype`)) || kr),
      (a = new FormData(o, e)),
      !Lr())
    ) {
      let { name: t, type: n, value: r } = e;
      if (n === `image`) {
        let e = t ? `${t}.` : ``;
        (a.append(`${e}x`, `0`), a.append(`${e}y`, `0`));
      } else t && a.append(t, r);
    }
  } else if (Ar(e))
    throw Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  else ((n = Or), (r = null), (i = kr), (o = e));
  return (
    a && i === `text/plain` && ((o = a), (a = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: a, body: o }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Vr = {
    "&": `\\u0026`,
    ">": `\\u003e`,
    "<": `\\u003c`,
    "\u2028": `\\u2028`,
    "\u2029": `\\u2029`,
  },
  Hr = /[&><\u2028\u2029]/g;
function Ur(e) {
  return e.replace(Hr, (e) => Vr[e]);
}
function Wr(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function Gr(e, t, n, r) {
  let i =
    typeof e == `string`
      ? new URL(e, typeof window > `u` ? `server://singlefetch/` : window.location.origin)
      : e;
  return (
    n
      ? i.pathname.endsWith(`/`)
        ? (i.pathname = `${i.pathname}_.${r}`)
        : (i.pathname = `${i.pathname}.${r}`)
      : i.pathname === `/`
        ? (i.pathname = `_root.${r}`)
        : t && Ce(i.pathname, t) === `/`
          ? (i.pathname = `${t.replace(/\/$/, ``)}/_root.${r}`)
          : (i.pathname = `${i.pathname.replace(/\/$/, ``)}.${r}`),
    i
  );
}
async function Kr(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await g(() => import(e.module), []);
    return ((t[e.id] = n), n);
  } catch (t) {
    return (
      console.error(`Error loading route module \`${e.module}\`, reloading page...`),
      console.error(t),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function qr(e) {
  return e != null && typeof e.page == `string`;
}
function Jr(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === `preload` && typeof e.imageSrcSet == `string` && typeof e.imageSizes == `string`
      : typeof e.rel == `string` && typeof e.href == `string`;
}
async function Yr(e, t, n) {
  return ei(
    (
      await Promise.all(
        e.map(async (e) => {
          let r = t.routes[e.route.id];
          if (r) {
            let e = await Kr(r, n);
            return e.links ? e.links() : [];
          }
          return [];
        })
      )
    )
      .flat(1)
      .filter(Jr)
      .filter((e) => e.rel === `stylesheet` || e.rel === `preload`)
      .map((e) =>
        e.rel === `stylesheet` ? { ...e, rel: `prefetch`, as: `style` } : { ...e, rel: `prefetch` }
      )
  );
}
function Xr(e, t, n, r, i, a) {
  let o = (e, t) => (n[t] ? e.route.id !== n[t].route.id : !0),
    s = (e, t) =>
      n[t].pathname !== e.pathname ||
      (n[t].route.path?.endsWith(`*`) && n[t].params[`*`] !== e.params[`*`]);
  return a === `assets`
    ? t.filter((e, t) => o(e, t) || s(e, t))
    : a === `data`
      ? t.filter((t, a) => {
          let c = r.routes[t.route.id];
          if (!c || !c.hasLoader) return !1;
          if (o(t, a) || s(t, a)) return !0;
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(i.pathname + i.search + i.hash, window.origin),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof r == `boolean`) return r;
          }
          return !0;
        })
      : [];
}
function Zr(e, t, { includeHydrateFallback: n } = {}) {
  return Qr(
    e
      .map((e) => {
        let r = t.routes[e.route.id];
        if (!r) return [];
        let i = [r.module];
        return (
          r.clientActionModule && (i = i.concat(r.clientActionModule)),
          r.clientLoaderModule && (i = i.concat(r.clientLoaderModule)),
          n && r.hydrateFallbackModule && (i = i.concat(r.hydrateFallbackModule)),
          r.imports && (i = i.concat(r.imports)),
          i
        );
      })
      .flat(1)
  );
}
function Qr(e) {
  return [...new Set(e)];
}
function $r(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function ei(e, t) {
  let n = new Set(),
    r = new Set(t);
  return e.reduce((e, i) => {
    if (t && !qr(i) && i.as === `script` && i.href && r.has(i.href)) return e;
    let a = JSON.stringify($r(i));
    return (n.has(a) || (n.add(a), e.push({ key: a, link: i })), e);
  }, []);
}
function ti() {
  let e = _.useContext(wn);
  return (Wr(e, `You must render this element inside a <DataRouterContext.Provider> element`), e);
}
function ni() {
  let e = _.useContext(Tn);
  return (
    Wr(e, `You must render this element inside a <DataRouterStateContext.Provider> element`),
    e
  );
}
var ri = _.createContext(void 0);
ri.displayName = `FrameworkContext`;
function ii() {
  let e = _.useContext(ri);
  return (Wr(e, `You must render this element inside a <HydratedRouter> element`), e);
}
function ai(e, t) {
  let n = _.useContext(ri),
    [r, i] = _.useState(!1),
    [a, o] = _.useState(!1),
    { onFocus: s, onBlur: c, onMouseEnter: l, onMouseLeave: u, onTouchStart: d } = t,
    f = _.useRef(null);
  (_.useEffect(() => {
    if ((e === `render` && o(!0), e === `viewport`)) {
      let e = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            o(e.isIntersecting);
          });
        },
        { threshold: 0.5 }
      );
      return (
        f.current && e.observe(f.current),
        () => {
          e.disconnect();
        }
      );
    }
  }, [e]),
    _.useEffect(() => {
      if (r) {
        let e = setTimeout(() => {
          o(!0);
        }, 100);
        return () => {
          clearTimeout(e);
        };
      }
    }, [r]));
  let p = () => {
      i(!0);
    },
    m = () => {
      (i(!1), o(!1));
    };
  return n
    ? e === `intent`
      ? [
          a,
          f,
          {
            onFocus: oi(s, p),
            onBlur: oi(c, m),
            onMouseEnter: oi(l, p),
            onMouseLeave: oi(u, m),
            onTouchStart: oi(d, p),
          },
        ]
      : [a, f, {}]
    : [!1, f, {}];
}
function oi(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function si({ page: e, ...t }) {
  let { router: n } = ti(),
    r = _.useMemo(() => I(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r ? _.createElement(li, { page: e, matches: r, ...t }) : null;
}
function ci(e) {
  let { manifest: t, routeModules: n } = ii(),
    [r, i] = _.useState([]);
  return (
    _.useEffect(() => {
      let r = !1;
      return (
        Yr(e, t, n).then((e) => {
          r || i(e);
        }),
        () => {
          r = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function li({ page: e, matches: t, ...n }) {
  let r = Hn(),
    { future: i, manifest: a, routeModules: o } = ii(),
    { basename: s } = ti(),
    { loaderData: c, matches: l } = ni(),
    u = _.useMemo(() => Xr(e, t, l, a, r, `data`), [e, t, l, a, r]),
    d = _.useMemo(() => Xr(e, t, l, a, r, `assets`), [e, t, l, a, r]),
    f = _.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let n = new Set(),
        l = !1;
      if (
        (t.forEach((e) => {
          let t = a.routes[e.route.id];
          !t ||
            !t.hasLoader ||
            ((!u.some((t) => t.route.id === e.route.id) &&
              e.route.id in c &&
              o[e.route.id]?.shouldRevalidate) ||
            t.hasClientLoader
              ? (l = !0)
              : n.add(e.route.id));
        }),
        n.size === 0)
      )
        return [];
      let d = Gr(e, s, i.unstable_trailingSlashAwareDataRequests, `data`);
      return (
        l &&
          n.size > 0 &&
          d.searchParams.set(
            `_routes`,
            t
              .filter((e) => n.has(e.route.id))
              .map((e) => e.route.id)
              .join(`,`)
          ),
        [d.pathname + d.search]
      );
    }, [s, i.unstable_trailingSlashAwareDataRequests, c, r, a, u, t, e, o]),
    p = _.useMemo(() => Zr(d, a), [d, a]),
    m = ci(d);
  return _.createElement(
    _.Fragment,
    null,
    f.map((e) => _.createElement(`link`, { key: e, rel: `prefetch`, as: `fetch`, href: e, ...n })),
    p.map((e) => _.createElement(`link`, { key: e, rel: `modulepreload`, href: e, ...n })),
    m.map(({ key: e, link: t }) => _.createElement(`link`, { key: e, nonce: n.nonce, ...t }))
  );
}
function ui(...e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t);
    });
  };
}
var di =
  typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0;
try {
  di && (window.__reactRouterVersion = `7.12.0`);
} catch {}
function fi(e, t) {
  return dt({
    basename: t?.basename,
    getContext: t?.getContext,
    future: t?.future,
    history: C({ window: t?.window }),
    hydrationData: t?.hydrationData || pi(),
    routes: e,
    mapRouteProperties: br,
    hydrationRouteProperties: xr,
    dataStrategy: t?.dataStrategy,
    patchRoutesOnNavigation: t?.patchRoutesOnNavigation,
    window: t?.window,
    unstable_instrumentations: t?.unstable_instrumentations,
  }).initialize();
}
function pi() {
  let e = window?.__staticRouterHydrationData;
  return (e && e.errors && (e = { ...e, errors: mi(e.errors) }), e);
}
function mi(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [e, r] of t)
    if (r && r.__type === `RouteErrorResponse`)
      n[e] = new Le(r.status, r.statusText, r.data, r.internal === !0);
    else if (r && r.__type === `Error`) {
      if (r.__subType) {
        let t = window[r.__subType];
        if (typeof t == `function`)
          try {
            let i = new t(r.message);
            ((i.stack = ``), (n[e] = i));
          } catch {}
      }
      if (n[e] == null) {
        let t = Error(r.message);
        ((t.stack = ``), (n[e] = t));
      }
    } else n[e] = r;
  return n;
}
function hi({ basename: e, children: t, history: n, unstable_useTransitions: r }) {
  let [i, a] = _.useState({ action: n.action, location: n.location }),
    o = _.useCallback(
      (e) => {
        r === !1 ? a(e) : _.startTransition(() => a(e));
      },
      [r]
    );
  return (
    _.useLayoutEffect(() => n.listen(o), [n, o]),
    _.createElement(Dr, {
      basename: e,
      children: t,
      location: i.location,
      navigationType: i.action,
      navigator: n,
      unstable_useTransitions: r,
    })
  );
}
hi.displayName = `unstable_HistoryRouter`;
var gi = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  _i = _.forwardRef(function (
    {
      onClick: e,
      discover: t = `render`,
      prefetch: n = `none`,
      relative: r,
      reloadDocument: i,
      replace: a,
      state: o,
      target: s,
      to: c,
      preventScrollReset: l,
      viewTransition: u,
      unstable_defaultShouldRevalidate: d,
      ...f
    },
    p
  ) {
    let { basename: m, unstable_useTransitions: h } = _.useContext(jn),
      g = typeof c == `string` && gi.test(c),
      v = Ve(c, m);
    c = v.to;
    let y = Bn(c, { relative: r }),
      [b, x, S] = ai(n, f),
      C = wi(c, {
        replace: a,
        state: o,
        target: s,
        preventScrollReset: l,
        relative: r,
        viewTransition: u,
        unstable_defaultShouldRevalidate: d,
        unstable_useTransitions: h,
      });
    function w(t) {
      (e && e(t), t.defaultPrevented || C(t));
    }
    let T = _.createElement(`a`, {
      ...f,
      ...S,
      href: v.absoluteURL || y,
      onClick: v.isExternal || i ? e : w,
      ref: ui(p, x),
      target: s,
      "data-discover": !g && t === `render` ? `true` : void 0,
    });
    return b && !g ? _.createElement(_.Fragment, null, T, _.createElement(si, { page: y })) : T;
  });
_i.displayName = `Link`;
var vi = _.forwardRef(function (
  {
    "aria-current": e = `page`,
    caseSensitive: t = !1,
    className: n = ``,
    end: r = !1,
    style: i,
    to: a,
    viewTransition: o,
    children: s,
    ...c
  },
  l
) {
  let u = Jn(a, { relative: c.relative }),
    d = Hn(),
    f = _.useContext(Tn),
    { navigator: p, basename: m } = _.useContext(jn),
    h = f != null && Pi(u) && o === !0,
    g = p.encodeLocation ? p.encodeLocation(u).pathname : u.pathname,
    v = d.pathname,
    y = f && f.navigation && f.navigation.location ? f.navigation.location.pathname : null;
  (t || ((v = v.toLowerCase()), (y = y ? y.toLowerCase() : null), (g = g.toLowerCase())),
    y && m && (y = Ce(y, m) || y));
  let b = g !== `/` && g.endsWith(`/`) ? g.length - 1 : g.length,
    x = v === g || (!r && v.startsWith(g) && v.charAt(b) === `/`),
    S = y != null && (y === g || (!r && y.startsWith(g) && y.charAt(g.length) === `/`)),
    C = { isActive: x, isPending: S, isTransitioning: h },
    w = x ? e : void 0,
    T;
  T =
    typeof n == `function`
      ? n(C)
      : [n, x ? `active` : null, S ? `pending` : null, h ? `transitioning` : null]
          .filter(Boolean)
          .join(` `);
  let E = typeof i == `function` ? i(C) : i;
  return _.createElement(
    _i,
    { ...c, "aria-current": w, className: T, ref: l, style: E, to: a, viewTransition: o },
    typeof s == `function` ? s(C) : s
  );
});
vi.displayName = `NavLink`;
var yi = _.forwardRef(
  (
    {
      discover: e = `render`,
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: i,
      state: a,
      method: o = Or,
      action: s,
      onSubmit: c,
      relative: l,
      preventScrollReset: u,
      viewTransition: d,
      unstable_defaultShouldRevalidate: f,
      ...p
    },
    m
  ) => {
    let { unstable_useTransitions: h } = _.useContext(jn),
      g = Di(),
      v = Oi(s, { relative: l }),
      y = o.toLowerCase() === `get` ? `get` : `post`,
      b = typeof s == `string` && gi.test(s);
    return _.createElement(`form`, {
      ref: m,
      method: y,
      action: v,
      onSubmit: r
        ? c
        : (e) => {
            if ((c && c(e), e.defaultPrevented)) return;
            e.preventDefault();
            let r = e.nativeEvent.submitter,
              s = r?.getAttribute(`formmethod`) || o,
              p = () =>
                g(r || e.currentTarget, {
                  fetcherKey: t,
                  method: s,
                  navigate: n,
                  replace: i,
                  state: a,
                  relative: l,
                  preventScrollReset: u,
                  viewTransition: d,
                  unstable_defaultShouldRevalidate: f,
                });
            h && n !== !1 ? _.startTransition(() => p()) : p();
          },
      ...p,
      "data-discover": !b && e === `render` ? `true` : void 0,
    });
  }
);
yi.displayName = `Form`;
function bi({ getKey: e, storageKey: t, ...n }) {
  let r = _.useContext(ri),
    { basename: i } = _.useContext(jn),
    a = Hn(),
    o = ur();
  Mi({ getKey: e, storageKey: t });
  let s = _.useMemo(() => {
    if (!r || !e) return null;
    let t = ji(a, o, i, e);
    return t === a.key ? null : t;
  }, []);
  if (!r || r.isSpaMode) return null;
  let c = ((e, t) => {
    if (!window.history.state || !window.history.state.key) {
      let e = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: e }, ``);
    }
    try {
      let n = JSON.parse(sessionStorage.getItem(e) || `{}`)[t || window.history.state.key];
      typeof n == `number` && window.scrollTo(0, n);
    } catch (t) {
      (console.error(t), sessionStorage.removeItem(e));
    }
  }).toString();
  return _.createElement(`script`, {
    ...n,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${c})(${Ur(JSON.stringify(t || ki))}, ${Ur(JSON.stringify(s))})`,
    },
  });
}
bi.displayName = `ScrollRestoration`;
function xi(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Si(e) {
  let t = _.useContext(wn);
  return (w(t, xi(e)), t);
}
function Ci(e) {
  let t = _.useContext(Tn);
  return (w(t, xi(e)), t);
}
function wi(
  e,
  {
    target: t,
    replace: n,
    state: r,
    preventScrollReset: i,
    relative: a,
    viewTransition: o,
    unstable_defaultShouldRevalidate: s,
    unstable_useTransitions: c,
  } = {}
) {
  let l = Gn(),
    u = Hn(),
    d = Jn(e, { relative: a });
  return _.useCallback(
    (f) => {
      if (Fr(f, t)) {
        f.preventDefault();
        let t = n === void 0 ? te(u) === te(d) : n,
          p = () =>
            l(e, {
              replace: t,
              state: r,
              preventScrollReset: i,
              relative: a,
              viewTransition: o,
              unstable_defaultShouldRevalidate: s,
            });
        c ? _.startTransition(() => p()) : p();
      }
    },
    [u, l, d, n, r, t, e, i, a, o, s, c]
  );
}
var Ti = 0,
  Ei = () => `__${String(++Ti)}__`;
function Di() {
  let { router: e } = Si(`useSubmit`),
    { basename: t } = _.useContext(jn),
    n = cr(),
    r = e.fetch,
    i = e.navigate;
  return _.useCallback(
    async (e, a = {}) => {
      let { action: o, method: s, encType: c, formData: l, body: u } = Br(e, t);
      a.navigate === !1
        ? await r(a.fetcherKey || Ei(), n, a.action || o, {
            unstable_defaultShouldRevalidate: a.unstable_defaultShouldRevalidate,
            preventScrollReset: a.preventScrollReset,
            formData: l,
            body: u,
            formMethod: a.method || s,
            formEncType: a.encType || c,
            flushSync: a.flushSync,
          })
        : await i(a.action || o, {
            unstable_defaultShouldRevalidate: a.unstable_defaultShouldRevalidate,
            preventScrollReset: a.preventScrollReset,
            formData: l,
            body: u,
            formMethod: a.method || s,
            formEncType: a.encType || c,
            replace: a.replace,
            state: a.state,
            fromRouteId: n,
            flushSync: a.flushSync,
            viewTransition: a.viewTransition,
          });
    },
    [r, i, t, n]
  );
}
function Oi(e, { relative: t } = {}) {
  let { basename: n } = _.useContext(jn),
    r = _.useContext(Nn);
  w(r, `useFormAction must be used inside a RouteContext`);
  let [i] = r.matches.slice(-1),
    a = { ...Jn(e || `.`, { relative: t }) },
    o = Hn();
  if (e == null) {
    a.search = o.search;
    let e = new URLSearchParams(a.search),
      t = e.getAll(`index`);
    if (t.some((e) => e === ``)) {
      (e.delete(`index`), t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      a.search = n ? `?${n}` : ``;
    }
  }
  return (
    (!e || e === `.`) &&
      i.route.index &&
      (a.search = a.search ? a.search.replace(/^\?/, `?index&`) : `?index`),
    n !== `/` && (a.pathname = a.pathname === `/` ? n : Ne([n, a.pathname])),
    te(a)
  );
}
var ki = `react-router-scroll-positions`,
  Ai = {};
function ji(e, t, n, r) {
  let i = null;
  return (
    r && (i = r(n === `/` ? e : { ...e, pathname: Ce(e.pathname, n) || e.pathname }, t)),
    (i ??= e.key),
    i
  );
}
function Mi({ getKey: e, storageKey: t } = {}) {
  let { router: n } = Si(`useScrollRestoration`),
    { restoreScrollPosition: r, preventScrollReset: i } = Ci(`useScrollRestoration`),
    { basename: a } = _.useContext(jn),
    o = Hn(),
    s = ur(),
    c = lr();
  (_.useEffect(
    () => (
      (window.history.scrollRestoration = `manual`),
      () => {
        window.history.scrollRestoration = `auto`;
      }
    ),
    []
  ),
    Ni(
      _.useCallback(() => {
        if (c.state === `idle`) {
          let t = ji(o, s, a, e);
          Ai[t] = window.scrollY;
        }
        try {
          sessionStorage.setItem(t || ki, JSON.stringify(Ai));
        } catch (e) {
          T(
            !1,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`
          );
        }
        window.history.scrollRestoration = `auto`;
      }, [c.state, e, a, o, s, t])
    ),
    typeof document < `u` &&
      (_.useLayoutEffect(() => {
        try {
          let e = sessionStorage.getItem(t || ki);
          e && (Ai = JSON.parse(e));
        } catch {}
      }, [t]),
      _.useLayoutEffect(() => {
        let t = n?.enableScrollRestoration(
          Ai,
          () => window.scrollY,
          e ? (t, n) => ji(t, n, a, e) : void 0
        );
        return () => t && t();
      }, [n, a, e]),
      _.useLayoutEffect(() => {
        if (r !== !1) {
          if (typeof r == `number`) {
            window.scrollTo(0, r);
            return;
          }
          try {
            if (o.hash) {
              let e = document.getElementById(decodeURIComponent(o.hash.slice(1)));
              if (e) {
                e.scrollIntoView();
                return;
              }
            }
          } catch {
            T(
              !1,
              `"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`
            );
          }
          i !== !0 && window.scrollTo(0, 0);
        }
      }, [o, r, i])));
}
function Ni(e, t) {
  let { capture: n } = t || {};
  _.useEffect(() => {
    let t = n == null ? void 0 : { capture: n };
    return (
      window.addEventListener(`pagehide`, e, t),
      () => {
        window.removeEventListener(`pagehide`, e, t);
      }
    );
  }, [e, n]);
}
function Pi(e, { relative: t } = {}) {
  let n = _.useContext(On);
  w(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = Si(`useViewTransitionState`),
    i = Jn(e, { relative: t });
  if (!n.isTransitioning) return !1;
  let a = Ce(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = Ce(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return be(i.pathname, o) != null || be(i.pathname, a) != null;
}
var Fi = t(c(), 1);
c();
function R(e) {
  return _.createElement(Cr, { flushSync: Fi.flushSync, ...e });
}
var Ii = n((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.fragment`);
    function r(e, n, r) {
      var i = null;
      if ((r !== void 0 && (i = `` + r), n.key !== void 0 && (i = `` + n.key), `key` in n))
        for (var a in ((r = {}), n)) a !== `key` && (r[a] = n[a]);
      else r = n;
      return (
        (n = r.ref),
        { $$typeof: t, type: e, key: i, ref: n === void 0 ? null : n, props: r }
      );
    }
    ((e.Fragment = n), (e.jsx = r), (e.jsxs = r));
  }),
  Li = n((e, t) => {
    t.exports = Ii();
  }),
  Ri = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
  zi = _.createContext && _.createContext(Ri),
  Bi = [`attr`, `size`, `title`];
function Vi(e, t) {
  if (e == null) return {};
  var n = Hi(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      ((r = a[i]),
        !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]));
  }
  return n;
}
function Hi(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Ui() {
  return (
    (Ui = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ui.apply(this, arguments)
  );
}
function Wi(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Gi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Wi(Object(n), !0).forEach(function (t) {
          Ki(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Wi(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Ki(e, t, n) {
  return (
    (t = qi(t)),
    t in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function qi(e) {
  var t = Ji(e, `string`);
  return typeof t == `symbol` ? t : t + ``;
}
function Ji(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function Yi(e) {
  return e && e.map((e, t) => _.createElement(e.tag, Gi({ key: t }, e.attr), Yi(e.child)));
}
function z(e) {
  return (t) => _.createElement(Xi, Ui({ attr: Gi({}, e.attr) }, t), Yi(e.child));
}
function Xi(e) {
  var t = (t) => {
    var { attr: n, size: r, title: i } = e,
      a = Vi(e, Bi),
      o = r || t.size || `1em`,
      s;
    return (
      t.className && (s = t.className),
      e.className && (s = (s ? s + ` ` : ``) + e.className),
      _.createElement(
        `svg`,
        Ui({ stroke: `currentColor`, fill: `currentColor`, strokeWidth: `0` }, t.attr, n, a, {
          className: s,
          style: Gi(Gi({ color: e.color || t.color }, t.style), e.style),
          height: o,
          width: o,
          xmlns: `http://www.w3.org/2000/svg`,
        }),
        i && _.createElement(`title`, null, i),
        e.children
      )
    );
  };
  return zi === void 0 ? t(Ri) : _.createElement(zi.Consumer, null, (e) => t(e));
}
function Zi(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M482.1 32H28.7C5.8 32 0 37.9 0 60.9v390.2C0 474.4 5.8 480 28.7 480h453.4c24.4 0 29.9-5.2 29.9-29.7V62.2c0-24.6-5.4-30.2-29.9-30.2zM178.4 220.3c-27.5-20.2-72.1-8.7-84.2 23.4-4.3 11.1-9.3 9.5-17.5 8.3-9.7-1.5-17.2-3.2-22.5-5.5-28.8-11.4 8.6-55.3 24.9-64.3 41.1-21.4 83.4-22.2 125.3-4.8 40.9 16.8 34.5 59.2 34.5 128.5 2.7 25.8-4.3 58.3 9.3 88.8 1.9 4.4.4 7.9-2.7 10.7-8.4 6.7-39.3 2.2-46.6-7.4-1.9-2.2-1.8-3.6-3.9-6.2-3.6-3.9-7.3-2.2-11.9 1-57.4 36.4-140.3 21.4-147-43.3-3.1-29.3 12.4-57.1 39.6-71 38.2-19.5 112.2-11.8 114-30.9 1.1-10.2-1.9-20.1-11.3-27.3zm286.7 222c0 15.1-11.1 9.9-17.8 9.9H52.4c-7.4 0-18.2 4.8-17.8-10.7.4-13.9 10.5-9.1 17.1-9.1 132.3-.4 264.5-.4 396.8 0 6.8 0 16.6-4.4 16.6 9.9zm3.8-340.5v291c0 5.7-.7 13.9-8.1 13.9-12.4-.4-27.5 7.1-36.1-5.6-5.8-8.7-7.8-4-12.4-1.2-53.4 29.7-128.1 7.1-144.4-85.2-6.1-33.4-.7-67.1 15.7-100 11.8-23.9 56.9-76.1 136.1-30.5v-71c0-26.2-.1-26.2 26-26.2 3.1 0 6.6.4 9.7 0 10.1-.8 13.6 4.4 13.6 14.3-.1.2-.1.3-.1.5zm-51.5 232.3c-19.5 47.6-72.9 43.3-90 5.2-15.1-33.3-15.5-68.2.4-101.5 16.3-34.1 59.7-35.7 81.5-4.8 20.6 28.8 14.9 84.6 8.1 101.1zm-294.8 35.3c-7.5-1.3-33-3.3-33.7-27.8-.4-13.9 7.8-23 19.8-25.8 24.4-5.9 49.3-9.9 73.7-14.7 8.9-2 7.4 4.4 7.8 9.5 1.4 33-26.1 59.2-67.6 58.8z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Qi(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M240.1 32c-61.9 0-131.5 16.9-184.2 55.4-5.1 3.1-9.1 9.2-7.2 19.4 1.1 5.1 5.1 27.4 10.2 39.6 4.1 10.2 14.2 10.2 20.3 6.1 32.5-22.3 96.5-47.7 152.3-47.7 57.9 0 58.9 28.4 58.9 73.1v38.5C203 227.7 78.2 251 46.7 264.2 11.2 280.5 16.3 357.7 16.3 376s15.2 104 124.9 104c47.8 0 113.7-20.7 153.3-42.1v25.4c0 3 2.1 8.2 6.1 9.1 3.1 1 50.7 2 59.9 2s62.5.3 66.5-.7c4.1-1 5.1-6.1 5.1-9.1V168c-.1-80.3-57.9-136-192-136zm50.2 348c-21.4 13.2-48.7 24.4-79.1 24.4-52.8 0-58.9-33.5-59-44.7 0-12.2-3-42.7 18.3-52.9 24.3-13.2 75.1-29.4 119.8-33.5z`,
        },
        child: [],
      },
    ],
  })(e);
}
function $i(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ea(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ta(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z`,
        },
        child: [],
      },
    ],
  })(e);
}
function na(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ra(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 576 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ia(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z`,
        },
        child: [],
      },
    ],
  })(e);
}
function aa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 384 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z`,
        },
        child: [],
      },
    ],
  })(e);
}
function oa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z`,
        },
        child: [],
      },
    ],
  })(e);
}
function sa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 576 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ca(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 640 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M320.67 64c-442.6 0-357.57 384-158.46 384 39.9 0 77.47-20.69 101.42-55.86l25.73-37.79c15.66-22.99 46.97-22.99 62.63 0l25.73 37.79C401.66 427.31 439.23 448 479.13 448c189.86 0 290.63-384-158.46-384zM184 308.36c-41.06 0-67.76-25.66-80.08-41.05-5.23-6.53-5.23-16.09 0-22.63 12.32-15.4 39.01-41.05 80.08-41.05s67.76 25.66 80.08 41.05c5.23 6.53 5.23 16.09 0 22.63-12.32 15.4-39.02 41.05-80.08 41.05zm272 0c-41.06 0-67.76-25.66-80.08-41.05-5.23-6.53-5.23-16.09 0-22.63 12.32-15.4 39.01-41.05 80.08-41.05s67.76 25.66 80.08 41.05c5.23 6.53 5.23 16.09 0 22.63-12.32 15.4-39.02 41.05-80.08 41.05z`,
        },
        child: [],
      },
    ],
  })(e);
}
function la(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ua(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z`,
        },
        child: [],
      },
    ],
  })(e);
}
function da(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z`,
        },
        child: [],
      },
    ],
  })(e);
}
function fa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z`,
        },
        child: [],
      },
    ],
  })(e);
}
function pa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ma(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ha(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M502.60969,310.04206l-96.70393,96.71625a31.88151,31.88151,0,0,1-45.00765,0L280.572,326.34115l-9.89231,9.90759a190.56343,190.56343,0,0,1-5.40716,168.52287c-4.50077,8.50115-16.39342,9.59505-23.20707,2.79725L134.54715,400.05428l-17.7999,17.79929c.70324,2.60972,1.60965,5.00067,1.60965,7.79793a32.00544,32.00544,0,1,1-32.00544-32.00434c2.79735,0,5.18838.90637,7.7982,1.60959l17.7999-17.79929L4.43129,269.94287c-6.798-6.81342-5.70409-18.6119,2.79735-23.20627a190.58161,190.58161,0,0,1,168.52864-5.407l9.79854-9.79821-80.31053-80.41716a32.002,32.002,0,0,1,0-45.09987L201.96474,9.29814A31.62639,31.62639,0,0,1,224.46868,0a31.99951,31.99951,0,0,1,22.59759,9.29814l80.32615,80.30777,47.805-47.89713a33.6075,33.6075,0,0,1,47.50808,0l47.50807,47.50645a33.63308,33.63308,0,0,1,0,47.50644l-47.805,47.89713L502.71908,265.036A31.78938,31.78938,0,0,1,502.60969,310.04206ZM219.56159,197.433l73.82505-73.82252-68.918-68.9-73.80942,73.80689Zm237.74352,90.106-68.90233-68.9156-73.825,73.82252,68.918,68.9Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ga(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z`,
        },
        child: [],
      },
    ],
  })(e);
}
function _a(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z`,
        },
        child: [],
      },
    ],
  })(e);
}
function va(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ya(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 512 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z`,
        },
        child: [],
      },
    ],
  })(e);
}
function ba(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 352 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z`,
        },
        child: [],
      },
    ],
  })(e);
}
function xa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Sa(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 496 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Ca(e) {
  return z({
    tag: `svg`,
    attr: { viewBox: `0 0 448 512` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z`,
        },
        child: [],
      },
    ],
  })(e);
}
function wa(e) {
  var t,
    n,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (n = wa(e[t])) && (r && (r += ` `), (r += n));
    } else for (n in e) e[n] && (r && (r += ` `), (r += n));
  return r;
}
function Ta() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = wa(e)) && (r && (r += ` `), (r += t));
  return r;
}
var Ea = (e, t) => {
    let n = Array(e.length + t.length);
    for (let t = 0; t < e.length; t++) n[t] = e[t];
    for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
    return n;
  },
  Da = (e, t) => ({ classGroupId: e, validator: t }),
  Oa = (e = new Map(), t = null, n) => ({ nextPart: e, validators: t, classGroupId: n }),
  ka = `-`,
  Aa = [],
  ja = `arbitrary..`,
  Ma = (e) => {
    let t = Fa(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (e) => {
        if (e.startsWith(`[`) && e.endsWith(`]`)) return Pa(e);
        let n = e.split(ka);
        return Na(n, n[0] === `` && n.length > 1 ? 1 : 0, t);
      },
      getConflictingClassGroupIds: (e, t) => {
        if (t) {
          let t = r[e],
            i = n[e];
          return t ? (i ? Ea(i, t) : t) : i || Aa;
        }
        return n[e] || Aa;
      },
    };
  },
  Na = (e, t, n) => {
    if (e.length - t === 0) return n.classGroupId;
    let r = e[t],
      i = n.nextPart.get(r);
    if (i) {
      let n = Na(e, t + 1, i);
      if (n) return n;
    }
    let a = n.validators;
    if (a === null) return;
    let o = t === 0 ? e.join(ka) : e.slice(t).join(ka),
      s = a.length;
    for (let e = 0; e < s; e++) {
      let t = a[e];
      if (t.validator(o)) return t.classGroupId;
    }
  },
  Pa = (e) =>
    e.slice(1, -1).indexOf(`:`) === -1
      ? void 0
      : (() => {
          let t = e.slice(1, -1),
            n = t.indexOf(`:`),
            r = t.slice(0, n);
          return r ? ja + r : void 0;
        })(),
  Fa = (e) => {
    let { theme: t, classGroups: n } = e;
    return Ia(n, t);
  },
  Ia = (e, t) => {
    let n = Oa();
    for (let r in e) {
      let i = e[r];
      La(i, n, r, t);
    }
    return n;
  },
  La = (e, t, n, r) => {
    let i = e.length;
    for (let a = 0; a < i; a++) {
      let i = e[a];
      Ra(i, t, n, r);
    }
  },
  Ra = (e, t, n, r) => {
    if (typeof e == `string`) {
      za(e, t, n);
      return;
    }
    if (typeof e == `function`) {
      Ba(e, t, n, r);
      return;
    }
    Va(e, t, n, r);
  },
  za = (e, t, n) => {
    let r = e === `` ? t : Ha(t, e);
    r.classGroupId = n;
  },
  Ba = (e, t, n, r) => {
    if (Ua(e)) {
      La(e(r), t, n, r);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(Da(n, e)));
  },
  Va = (e, t, n, r) => {
    let i = Object.entries(e),
      a = i.length;
    for (let e = 0; e < a; e++) {
      let [a, o] = i[e];
      La(o, Ha(t, a), n, r);
    }
  },
  Ha = (e, t) => {
    let n = e,
      r = t.split(ka),
      i = r.length;
    for (let e = 0; e < i; e++) {
      let t = r[e],
        i = n.nextPart.get(t);
      (i || ((i = Oa()), n.nextPart.set(t, i)), (n = i));
    }
    return n;
  },
  Ua = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
  Wa = (e) => {
    if (e < 1) return { get: () => void 0, set: () => {} };
    let t = 0,
      n = Object.create(null),
      r = Object.create(null),
      i = (i, a) => {
        ((n[i] = a), t++, t > e && ((t = 0), (r = n), (n = Object.create(null))));
      };
    return {
      get(e) {
        let t = n[e];
        if (t !== void 0) return t;
        if ((t = r[e]) !== void 0) return (i(e, t), t);
      },
      set(e, t) {
        e in n ? (n[e] = t) : i(e, t);
      },
    };
  },
  Ga = `!`,
  Ka = `:`,
  qa = [],
  Ja = (e, t, n, r, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: r,
    isExternal: i,
  }),
  Ya = (e) => {
    let { prefix: t, experimentalParseClassName: n } = e,
      r = (e) => {
        let t = [],
          n = 0,
          r = 0,
          i = 0,
          a,
          o = e.length;
        for (let s = 0; s < o; s++) {
          let o = e[s];
          if (n === 0 && r === 0) {
            if (o === Ka) {
              (t.push(e.slice(i, s)), (i = s + 1));
              continue;
            }
            if (o === `/`) {
              a = s;
              continue;
            }
          }
          o === `[` ? n++ : o === `]` ? n-- : o === `(` ? r++ : o === `)` && r--;
        }
        let s = t.length === 0 ? e : e.slice(i),
          c = s,
          l = !1;
        s.endsWith(Ga)
          ? ((c = s.slice(0, -1)), (l = !0))
          : s.startsWith(Ga) && ((c = s.slice(1)), (l = !0));
        let u = a && a > i ? a - i : void 0;
        return Ja(t, l, c, u);
      };
    if (t) {
      let e = t + Ka,
        n = r;
      r = (t) => (t.startsWith(e) ? n(t.slice(e.length)) : Ja(qa, !1, t, void 0, !0));
    }
    if (n) {
      let e = r;
      r = (t) => n({ className: t, parseClassName: e });
    }
    return r;
  },
  Xa = (e) => {
    let t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((e, n) => {
        t.set(e, 1e6 + n);
      }),
      (e) => {
        let n = [],
          r = [];
        for (let i = 0; i < e.length; i++) {
          let a = e[i],
            o = a[0] === `[`,
            s = t.has(a);
          o || s ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])), n.push(a)) : r.push(a);
        }
        return (r.length > 0 && (r.sort(), n.push(...r)), n);
      }
    );
  },
  Za = (e) => ({ cache: Wa(e.cacheSize), parseClassName: Ya(e), sortModifiers: Xa(e), ...Ma(e) }),
  Qa = /\s+/,
  $a = (e, t) => {
    let {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
        sortModifiers: a,
      } = t,
      o = [],
      s = e.trim().split(Qa),
      c = ``;
    for (let e = s.length - 1; e >= 0; --e) {
      let t = s[e],
        {
          isExternal: l,
          modifiers: u,
          hasImportantModifier: d,
          baseClassName: f,
          maybePostfixModifierPosition: p,
        } = n(t);
      if (l) {
        c = t + (c.length > 0 ? ` ` + c : c);
        continue;
      }
      let m = !!p,
        h = r(m ? f.substring(0, p) : f);
      if (!h) {
        if (!m) {
          c = t + (c.length > 0 ? ` ` + c : c);
          continue;
        }
        if (((h = r(f)), !h)) {
          c = t + (c.length > 0 ? ` ` + c : c);
          continue;
        }
        m = !1;
      }
      let g = u.length === 0 ? `` : u.length === 1 ? u[0] : a(u).join(`:`),
        _ = d ? g + Ga : g,
        v = _ + h;
      if (o.indexOf(v) > -1) continue;
      o.push(v);
      let y = i(h, m);
      for (let e = 0; e < y.length; ++e) {
        let t = y[e];
        o.push(_ + t);
      }
      c = t + (c.length > 0 ? ` ` + c : c);
    }
    return c;
  },
  eo = (...e) => {
    let t = 0,
      n,
      r,
      i = ``;
    for (; t < e.length; ) (n = e[t++]) && (r = to(n)) && (i && (i += ` `), (i += r));
    return i;
  },
  to = (e) => {
    if (typeof e == `string`) return e;
    let t,
      n = ``;
    for (let r = 0; r < e.length; r++) e[r] && (t = to(e[r])) && (n && (n += ` `), (n += t));
    return n;
  },
  no = (e, ...t) => {
    let n,
      r,
      i,
      a,
      o = (o) => (
        (n = Za(t.reduce((e, t) => t(e), e()))),
        (r = n.cache.get),
        (i = n.cache.set),
        (a = s),
        s(o)
      ),
      s = (e) => {
        let t = r(e);
        if (t) return t;
        let a = $a(e, n);
        return (i(e, a), a);
      };
    return ((a = o), (...e) => a(eo(...e)));
  },
  ro = [],
  B = (e) => {
    let t = (t) => t[e] || ro;
    return ((t.isThemeGetter = !0), t);
  },
  io = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  ao = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  oo = /^\d+\/\d+$/,
  so = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  co =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  lo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  uo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  fo =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  V = (e) => oo.test(e),
  H = (e) => !!e && !Number.isNaN(Number(e)),
  po = (e) => !!e && Number.isInteger(Number(e)),
  mo = (e) => e.endsWith(`%`) && H(e.slice(0, -1)),
  ho = (e) => so.test(e),
  go = () => !0,
  _o = (e) => co.test(e) && !lo.test(e),
  vo = () => !1,
  yo = (e) => uo.test(e),
  bo = (e) => fo.test(e),
  xo = (e) => !U(e) && !W(e),
  So = (e) => Po(e, Ro, vo),
  U = (e) => io.test(e),
  Co = (e) => Po(e, zo, _o),
  wo = (e) => Po(e, Bo, H),
  To = (e) => Po(e, Io, vo),
  Eo = (e) => Po(e, Lo, bo),
  Do = (e) => Po(e, Ho, yo),
  W = (e) => ao.test(e),
  Oo = (e) => Fo(e, zo),
  ko = (e) => Fo(e, Vo),
  Ao = (e) => Fo(e, Io),
  jo = (e) => Fo(e, Ro),
  Mo = (e) => Fo(e, Lo),
  No = (e) => Fo(e, Ho, !0),
  Po = (e, t, n) => {
    let r = io.exec(e);
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
  },
  Fo = (e, t, n = !1) => {
    let r = ao.exec(e);
    return r ? (r[1] ? t(r[1]) : n) : !1;
  },
  Io = (e) => e === `position` || e === `percentage`,
  Lo = (e) => e === `image` || e === `url`,
  Ro = (e) => e === `length` || e === `size` || e === `bg-size`,
  zo = (e) => e === `length`,
  Bo = (e) => e === `number`,
  Vo = (e) => e === `family-name`,
  Ho = (e) => e === `shadow`,
  Uo = no(() => {
    let e = B(`color`),
      t = B(`font`),
      n = B(`text`),
      r = B(`font-weight`),
      i = B(`tracking`),
      a = B(`leading`),
      o = B(`breakpoint`),
      s = B(`container`),
      c = B(`spacing`),
      l = B(`radius`),
      u = B(`shadow`),
      d = B(`inset-shadow`),
      f = B(`text-shadow`),
      p = B(`drop-shadow`),
      m = B(`blur`),
      h = B(`perspective`),
      g = B(`aspect`),
      _ = B(`ease`),
      v = B(`animate`),
      y = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
      b = () => [
        `center`,
        `top`,
        `bottom`,
        `left`,
        `right`,
        `top-left`,
        `left-top`,
        `top-right`,
        `right-top`,
        `bottom-right`,
        `right-bottom`,
        `bottom-left`,
        `left-bottom`,
      ],
      x = () => [...b(), W, U],
      S = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
      C = () => [`auto`, `contain`, `none`],
      w = () => [W, U, c],
      T = () => [V, `full`, `auto`, ...w()],
      E = () => [po, `none`, `subgrid`, W, U],
      ee = () => [`auto`, { span: [`full`, po, W, U] }, po, W, U],
      D = () => [po, `auto`, W, U],
      te = () => [`auto`, `min`, `max`, `fr`, W, U],
      O = () => [
        `start`,
        `end`,
        `center`,
        `between`,
        `around`,
        `evenly`,
        `stretch`,
        `baseline`,
        `center-safe`,
        `end-safe`,
      ],
      k = () => [`start`, `end`, `center`, `stretch`, `center-safe`, `end-safe`],
      ne = () => [`auto`, ...w()],
      A = () => [
        V,
        `auto`,
        `full`,
        `dvw`,
        `dvh`,
        `lvw`,
        `lvh`,
        `svw`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...w(),
      ],
      j = () => [e, W, U],
      re = () => [...b(), Ao, To, { position: [W, U] }],
      M = () => [`no-repeat`, { repeat: [``, `x`, `y`, `space`, `round`] }],
      N = () => [`auto`, `cover`, `contain`, jo, So, { size: [W, U] }],
      ie = () => [mo, Oo, Co],
      P = () => [``, `none`, `full`, l, W, U],
      F = () => [``, H, Oo, Co],
      ae = () => [`solid`, `dashed`, `dotted`, `double`],
      I = () => [
        `normal`,
        `multiply`,
        `screen`,
        `overlay`,
        `darken`,
        `lighten`,
        `color-dodge`,
        `color-burn`,
        `hard-light`,
        `soft-light`,
        `difference`,
        `exclusion`,
        `hue`,
        `saturation`,
        `color`,
        `luminosity`,
      ],
      L = () => [H, mo, Ao, To],
      oe = () => [``, `none`, m, W, U],
      se = () => [`none`, H, W, U],
      ce = () => [`none`, H, W, U],
      le = () => [H, W, U],
      ue = () => [V, `full`, ...w()];
    return {
      cacheSize: 500,
      theme: {
        animate: [`spin`, `ping`, `pulse`, `bounce`],
        aspect: [`video`],
        blur: [ho],
        breakpoint: [ho],
        color: [go],
        container: [ho],
        "drop-shadow": [ho],
        ease: [`in`, `out`, `in-out`],
        font: [xo],
        "font-weight": [
          `thin`,
          `extralight`,
          `light`,
          `normal`,
          `medium`,
          `semibold`,
          `bold`,
          `extrabold`,
          `black`,
        ],
        "inset-shadow": [ho],
        leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
        perspective: [`dramatic`, `near`, `normal`, `midrange`, `distant`, `none`],
        radius: [ho],
        shadow: [ho],
        spacing: [`px`, H],
        text: [ho],
        "text-shadow": [ho],
        tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`],
      },
      classGroups: {
        aspect: [{ aspect: [`auto`, `square`, V, U, W, g] }],
        container: [`container`],
        columns: [{ columns: [H, U, W, s] }],
        "break-after": [{ "break-after": y() }],
        "break-before": [{ "break-before": y() }],
        "break-inside": [{ "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`] }],
        "box-decoration": [{ "box-decoration": [`slice`, `clone`] }],
        box: [{ box: [`border`, `content`] }],
        display: [
          `block`,
          `inline-block`,
          `inline`,
          `flex`,
          `inline-flex`,
          `table`,
          `inline-table`,
          `table-caption`,
          `table-cell`,
          `table-column`,
          `table-column-group`,
          `table-footer-group`,
          `table-header-group`,
          `table-row-group`,
          `table-row`,
          `flow-root`,
          `grid`,
          `inline-grid`,
          `contents`,
          `list-item`,
          `hidden`,
        ],
        sr: [`sr-only`, `not-sr-only`],
        float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
        clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
        isolation: [`isolate`, `isolation-auto`],
        "object-fit": [{ object: [`contain`, `cover`, `fill`, `none`, `scale-down`] }],
        "object-position": [{ object: x() }],
        overflow: [{ overflow: S() }],
        "overflow-x": [{ "overflow-x": S() }],
        "overflow-y": [{ "overflow-y": S() }],
        overscroll: [{ overscroll: C() }],
        "overscroll-x": [{ "overscroll-x": C() }],
        "overscroll-y": [{ "overscroll-y": C() }],
        position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
        inset: [{ inset: T() }],
        "inset-x": [{ "inset-x": T() }],
        "inset-y": [{ "inset-y": T() }],
        start: [{ start: T() }],
        end: [{ end: T() }],
        top: [{ top: T() }],
        right: [{ right: T() }],
        bottom: [{ bottom: T() }],
        left: [{ left: T() }],
        visibility: [`visible`, `invisible`, `collapse`],
        z: [{ z: [po, `auto`, W, U] }],
        basis: [{ basis: [V, `full`, `auto`, s, ...w()] }],
        "flex-direction": [{ flex: [`row`, `row-reverse`, `col`, `col-reverse`] }],
        "flex-wrap": [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
        flex: [{ flex: [H, V, `auto`, `initial`, `none`, U] }],
        grow: [{ grow: [``, H, W, U] }],
        shrink: [{ shrink: [``, H, W, U] }],
        order: [{ order: [po, `first`, `last`, `none`, W, U] }],
        "grid-cols": [{ "grid-cols": E() }],
        "col-start-end": [{ col: ee() }],
        "col-start": [{ "col-start": D() }],
        "col-end": [{ "col-end": D() }],
        "grid-rows": [{ "grid-rows": E() }],
        "row-start-end": [{ row: ee() }],
        "row-start": [{ "row-start": D() }],
        "row-end": [{ "row-end": D() }],
        "grid-flow": [{ "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`] }],
        "auto-cols": [{ "auto-cols": te() }],
        "auto-rows": [{ "auto-rows": te() }],
        gap: [{ gap: w() }],
        "gap-x": [{ "gap-x": w() }],
        "gap-y": [{ "gap-y": w() }],
        "justify-content": [{ justify: [...O(), `normal`] }],
        "justify-items": [{ "justify-items": [...k(), `normal`] }],
        "justify-self": [{ "justify-self": [`auto`, ...k()] }],
        "align-content": [{ content: [`normal`, ...O()] }],
        "align-items": [{ items: [...k(), { baseline: [``, `last`] }] }],
        "align-self": [{ self: [`auto`, ...k(), { baseline: [``, `last`] }] }],
        "place-content": [{ "place-content": O() }],
        "place-items": [{ "place-items": [...k(), `baseline`] }],
        "place-self": [{ "place-self": [`auto`, ...k()] }],
        p: [{ p: w() }],
        px: [{ px: w() }],
        py: [{ py: w() }],
        ps: [{ ps: w() }],
        pe: [{ pe: w() }],
        pt: [{ pt: w() }],
        pr: [{ pr: w() }],
        pb: [{ pb: w() }],
        pl: [{ pl: w() }],
        m: [{ m: ne() }],
        mx: [{ mx: ne() }],
        my: [{ my: ne() }],
        ms: [{ ms: ne() }],
        me: [{ me: ne() }],
        mt: [{ mt: ne() }],
        mr: [{ mr: ne() }],
        mb: [{ mb: ne() }],
        ml: [{ ml: ne() }],
        "space-x": [{ "space-x": w() }],
        "space-x-reverse": [`space-x-reverse`],
        "space-y": [{ "space-y": w() }],
        "space-y-reverse": [`space-y-reverse`],
        size: [{ size: A() }],
        w: [{ w: [s, `screen`, ...A()] }],
        "min-w": [{ "min-w": [s, `screen`, `none`, ...A()] }],
        "max-w": [{ "max-w": [s, `screen`, `none`, `prose`, { screen: [o] }, ...A()] }],
        h: [{ h: [`screen`, `lh`, ...A()] }],
        "min-h": [{ "min-h": [`screen`, `lh`, `none`, ...A()] }],
        "max-h": [{ "max-h": [`screen`, `lh`, ...A()] }],
        "font-size": [{ text: [`base`, n, Oo, Co] }],
        "font-smoothing": [`antialiased`, `subpixel-antialiased`],
        "font-style": [`italic`, `not-italic`],
        "font-weight": [{ font: [r, W, wo] }],
        "font-stretch": [
          {
            "font-stretch": [
              `ultra-condensed`,
              `extra-condensed`,
              `condensed`,
              `semi-condensed`,
              `normal`,
              `semi-expanded`,
              `expanded`,
              `extra-expanded`,
              `ultra-expanded`,
              mo,
              U,
            ],
          },
        ],
        "font-family": [{ font: [ko, U, t] }],
        "fvn-normal": [`normal-nums`],
        "fvn-ordinal": [`ordinal`],
        "fvn-slashed-zero": [`slashed-zero`],
        "fvn-figure": [`lining-nums`, `oldstyle-nums`],
        "fvn-spacing": [`proportional-nums`, `tabular-nums`],
        "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
        tracking: [{ tracking: [i, W, U] }],
        "line-clamp": [{ "line-clamp": [H, `none`, W, wo] }],
        leading: [{ leading: [a, ...w()] }],
        "list-image": [{ "list-image": [`none`, W, U] }],
        "list-style-position": [{ list: [`inside`, `outside`] }],
        "list-style-type": [{ list: [`disc`, `decimal`, `none`, W, U] }],
        "text-alignment": [{ text: [`left`, `center`, `right`, `justify`, `start`, `end`] }],
        "placeholder-color": [{ placeholder: j() }],
        "text-color": [{ text: j() }],
        "text-decoration": [`underline`, `overline`, `line-through`, `no-underline`],
        "text-decoration-style": [{ decoration: [...ae(), `wavy`] }],
        "text-decoration-thickness": [{ decoration: [H, `from-font`, `auto`, W, Co] }],
        "text-decoration-color": [{ decoration: j() }],
        "underline-offset": [{ "underline-offset": [H, `auto`, W, U] }],
        "text-transform": [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
        "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
        "text-wrap": [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
        indent: [{ indent: w() }],
        "vertical-align": [
          {
            align: [
              `baseline`,
              `top`,
              `middle`,
              `bottom`,
              `text-top`,
              `text-bottom`,
              `sub`,
              `super`,
              W,
              U,
            ],
          },
        ],
        whitespace: [
          { whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`] },
        ],
        break: [{ break: [`normal`, `words`, `all`, `keep`] }],
        wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
        hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
        content: [{ content: [`none`, W, U] }],
        "bg-attachment": [{ bg: [`fixed`, `local`, `scroll`] }],
        "bg-clip": [{ "bg-clip": [`border`, `padding`, `content`, `text`] }],
        "bg-origin": [{ "bg-origin": [`border`, `padding`, `content`] }],
        "bg-position": [{ bg: re() }],
        "bg-repeat": [{ bg: M() }],
        "bg-size": [{ bg: N() }],
        "bg-image": [
          {
            bg: [
              `none`,
              {
                linear: [{ to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] }, po, W, U],
                radial: [``, W, U],
                conic: [po, W, U],
              },
              Mo,
              Eo,
            ],
          },
        ],
        "bg-color": [{ bg: j() }],
        "gradient-from-pos": [{ from: ie() }],
        "gradient-via-pos": [{ via: ie() }],
        "gradient-to-pos": [{ to: ie() }],
        "gradient-from": [{ from: j() }],
        "gradient-via": [{ via: j() }],
        "gradient-to": [{ to: j() }],
        rounded: [{ rounded: P() }],
        "rounded-s": [{ "rounded-s": P() }],
        "rounded-e": [{ "rounded-e": P() }],
        "rounded-t": [{ "rounded-t": P() }],
        "rounded-r": [{ "rounded-r": P() }],
        "rounded-b": [{ "rounded-b": P() }],
        "rounded-l": [{ "rounded-l": P() }],
        "rounded-ss": [{ "rounded-ss": P() }],
        "rounded-se": [{ "rounded-se": P() }],
        "rounded-ee": [{ "rounded-ee": P() }],
        "rounded-es": [{ "rounded-es": P() }],
        "rounded-tl": [{ "rounded-tl": P() }],
        "rounded-tr": [{ "rounded-tr": P() }],
        "rounded-br": [{ "rounded-br": P() }],
        "rounded-bl": [{ "rounded-bl": P() }],
        "border-w": [{ border: F() }],
        "border-w-x": [{ "border-x": F() }],
        "border-w-y": [{ "border-y": F() }],
        "border-w-s": [{ "border-s": F() }],
        "border-w-e": [{ "border-e": F() }],
        "border-w-t": [{ "border-t": F() }],
        "border-w-r": [{ "border-r": F() }],
        "border-w-b": [{ "border-b": F() }],
        "border-w-l": [{ "border-l": F() }],
        "divide-x": [{ "divide-x": F() }],
        "divide-x-reverse": [`divide-x-reverse`],
        "divide-y": [{ "divide-y": F() }],
        "divide-y-reverse": [`divide-y-reverse`],
        "border-style": [{ border: [...ae(), `hidden`, `none`] }],
        "divide-style": [{ divide: [...ae(), `hidden`, `none`] }],
        "border-color": [{ border: j() }],
        "border-color-x": [{ "border-x": j() }],
        "border-color-y": [{ "border-y": j() }],
        "border-color-s": [{ "border-s": j() }],
        "border-color-e": [{ "border-e": j() }],
        "border-color-t": [{ "border-t": j() }],
        "border-color-r": [{ "border-r": j() }],
        "border-color-b": [{ "border-b": j() }],
        "border-color-l": [{ "border-l": j() }],
        "divide-color": [{ divide: j() }],
        "outline-style": [{ outline: [...ae(), `none`, `hidden`] }],
        "outline-offset": [{ "outline-offset": [H, W, U] }],
        "outline-w": [{ outline: [``, H, Oo, Co] }],
        "outline-color": [{ outline: j() }],
        shadow: [{ shadow: [``, `none`, u, No, Do] }],
        "shadow-color": [{ shadow: j() }],
        "inset-shadow": [{ "inset-shadow": [`none`, d, No, Do] }],
        "inset-shadow-color": [{ "inset-shadow": j() }],
        "ring-w": [{ ring: F() }],
        "ring-w-inset": [`ring-inset`],
        "ring-color": [{ ring: j() }],
        "ring-offset-w": [{ "ring-offset": [H, Co] }],
        "ring-offset-color": [{ "ring-offset": j() }],
        "inset-ring-w": [{ "inset-ring": F() }],
        "inset-ring-color": [{ "inset-ring": j() }],
        "text-shadow": [{ "text-shadow": [`none`, f, No, Do] }],
        "text-shadow-color": [{ "text-shadow": j() }],
        opacity: [{ opacity: [H, W, U] }],
        "mix-blend": [{ "mix-blend": [...I(), `plus-darker`, `plus-lighter`] }],
        "bg-blend": [{ "bg-blend": I() }],
        "mask-clip": [
          { "mask-clip": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] },
          `mask-no-clip`,
        ],
        "mask-composite": [{ mask: [`add`, `subtract`, `intersect`, `exclude`] }],
        "mask-image-linear-pos": [{ "mask-linear": [H] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": L() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": L() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": j() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": j() }],
        "mask-image-t-from-pos": [{ "mask-t-from": L() }],
        "mask-image-t-to-pos": [{ "mask-t-to": L() }],
        "mask-image-t-from-color": [{ "mask-t-from": j() }],
        "mask-image-t-to-color": [{ "mask-t-to": j() }],
        "mask-image-r-from-pos": [{ "mask-r-from": L() }],
        "mask-image-r-to-pos": [{ "mask-r-to": L() }],
        "mask-image-r-from-color": [{ "mask-r-from": j() }],
        "mask-image-r-to-color": [{ "mask-r-to": j() }],
        "mask-image-b-from-pos": [{ "mask-b-from": L() }],
        "mask-image-b-to-pos": [{ "mask-b-to": L() }],
        "mask-image-b-from-color": [{ "mask-b-from": j() }],
        "mask-image-b-to-color": [{ "mask-b-to": j() }],
        "mask-image-l-from-pos": [{ "mask-l-from": L() }],
        "mask-image-l-to-pos": [{ "mask-l-to": L() }],
        "mask-image-l-from-color": [{ "mask-l-from": j() }],
        "mask-image-l-to-color": [{ "mask-l-to": j() }],
        "mask-image-x-from-pos": [{ "mask-x-from": L() }],
        "mask-image-x-to-pos": [{ "mask-x-to": L() }],
        "mask-image-x-from-color": [{ "mask-x-from": j() }],
        "mask-image-x-to-color": [{ "mask-x-to": j() }],
        "mask-image-y-from-pos": [{ "mask-y-from": L() }],
        "mask-image-y-to-pos": [{ "mask-y-to": L() }],
        "mask-image-y-from-color": [{ "mask-y-from": j() }],
        "mask-image-y-to-color": [{ "mask-y-to": j() }],
        "mask-image-radial": [{ "mask-radial": [W, U] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": L() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": L() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": j() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": j() }],
        "mask-image-radial-shape": [{ "mask-radial": [`circle`, `ellipse`] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: [`side`, `corner`], farthest: [`side`, `corner`] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": b() }],
        "mask-image-conic-pos": [{ "mask-conic": [H] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": L() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": L() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": j() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": j() }],
        "mask-mode": [{ mask: [`alpha`, `luminance`, `match`] }],
        "mask-origin": [
          { "mask-origin": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] },
        ],
        "mask-position": [{ mask: re() }],
        "mask-repeat": [{ mask: M() }],
        "mask-size": [{ mask: N() }],
        "mask-type": [{ "mask-type": [`alpha`, `luminance`] }],
        "mask-image": [{ mask: [`none`, W, U] }],
        filter: [{ filter: [``, `none`, W, U] }],
        blur: [{ blur: oe() }],
        brightness: [{ brightness: [H, W, U] }],
        contrast: [{ contrast: [H, W, U] }],
        "drop-shadow": [{ "drop-shadow": [``, `none`, p, No, Do] }],
        "drop-shadow-color": [{ "drop-shadow": j() }],
        grayscale: [{ grayscale: [``, H, W, U] }],
        "hue-rotate": [{ "hue-rotate": [H, W, U] }],
        invert: [{ invert: [``, H, W, U] }],
        saturate: [{ saturate: [H, W, U] }],
        sepia: [{ sepia: [``, H, W, U] }],
        "backdrop-filter": [{ "backdrop-filter": [``, `none`, W, U] }],
        "backdrop-blur": [{ "backdrop-blur": oe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [H, W, U] }],
        "backdrop-contrast": [{ "backdrop-contrast": [H, W, U] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [``, H, W, U] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [H, W, U] }],
        "backdrop-invert": [{ "backdrop-invert": [``, H, W, U] }],
        "backdrop-opacity": [{ "backdrop-opacity": [H, W, U] }],
        "backdrop-saturate": [{ "backdrop-saturate": [H, W, U] }],
        "backdrop-sepia": [{ "backdrop-sepia": [``, H, W, U] }],
        "border-collapse": [{ border: [`collapse`, `separate`] }],
        "border-spacing": [{ "border-spacing": w() }],
        "border-spacing-x": [{ "border-spacing-x": w() }],
        "border-spacing-y": [{ "border-spacing-y": w() }],
        "table-layout": [{ table: [`auto`, `fixed`] }],
        caption: [{ caption: [`top`, `bottom`] }],
        transition: [
          { transition: [``, `all`, `colors`, `opacity`, `shadow`, `transform`, `none`, W, U] },
        ],
        "transition-behavior": [{ transition: [`normal`, `discrete`] }],
        duration: [{ duration: [H, `initial`, W, U] }],
        ease: [{ ease: [`linear`, `initial`, _, W, U] }],
        delay: [{ delay: [H, W, U] }],
        animate: [{ animate: [`none`, v, W, U] }],
        backface: [{ backface: [`hidden`, `visible`] }],
        perspective: [{ perspective: [h, W, U] }],
        "perspective-origin": [{ "perspective-origin": x() }],
        rotate: [{ rotate: se() }],
        "rotate-x": [{ "rotate-x": se() }],
        "rotate-y": [{ "rotate-y": se() }],
        "rotate-z": [{ "rotate-z": se() }],
        scale: [{ scale: ce() }],
        "scale-x": [{ "scale-x": ce() }],
        "scale-y": [{ "scale-y": ce() }],
        "scale-z": [{ "scale-z": ce() }],
        "scale-3d": [`scale-3d`],
        skew: [{ skew: le() }],
        "skew-x": [{ "skew-x": le() }],
        "skew-y": [{ "skew-y": le() }],
        transform: [{ transform: [W, U, ``, `none`, `gpu`, `cpu`] }],
        "transform-origin": [{ origin: x() }],
        "transform-style": [{ transform: [`3d`, `flat`] }],
        translate: [{ translate: ue() }],
        "translate-x": [{ "translate-x": ue() }],
        "translate-y": [{ "translate-y": ue() }],
        "translate-z": [{ "translate-z": ue() }],
        "translate-none": [`translate-none`],
        accent: [{ accent: j() }],
        appearance: [{ appearance: [`none`, `auto`] }],
        "caret-color": [{ caret: j() }],
        "color-scheme": [
          { scheme: [`normal`, `dark`, `light`, `light-dark`, `only-dark`, `only-light`] },
        ],
        cursor: [
          {
            cursor: [
              `auto`,
              `default`,
              `pointer`,
              `wait`,
              `text`,
              `move`,
              `help`,
              `not-allowed`,
              `none`,
              `context-menu`,
              `progress`,
              `cell`,
              `crosshair`,
              `vertical-text`,
              `alias`,
              `copy`,
              `no-drop`,
              `grab`,
              `grabbing`,
              `all-scroll`,
              `col-resize`,
              `row-resize`,
              `n-resize`,
              `e-resize`,
              `s-resize`,
              `w-resize`,
              `ne-resize`,
              `nw-resize`,
              `se-resize`,
              `sw-resize`,
              `ew-resize`,
              `ns-resize`,
              `nesw-resize`,
              `nwse-resize`,
              `zoom-in`,
              `zoom-out`,
              W,
              U,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": [`fixed`, `content`] }],
        "pointer-events": [{ "pointer-events": [`auto`, `none`] }],
        resize: [{ resize: [`none`, ``, `y`, `x`] }],
        "scroll-behavior": [{ scroll: [`auto`, `smooth`] }],
        "scroll-m": [{ "scroll-m": w() }],
        "scroll-mx": [{ "scroll-mx": w() }],
        "scroll-my": [{ "scroll-my": w() }],
        "scroll-ms": [{ "scroll-ms": w() }],
        "scroll-me": [{ "scroll-me": w() }],
        "scroll-mt": [{ "scroll-mt": w() }],
        "scroll-mr": [{ "scroll-mr": w() }],
        "scroll-mb": [{ "scroll-mb": w() }],
        "scroll-ml": [{ "scroll-ml": w() }],
        "scroll-p": [{ "scroll-p": w() }],
        "scroll-px": [{ "scroll-px": w() }],
        "scroll-py": [{ "scroll-py": w() }],
        "scroll-ps": [{ "scroll-ps": w() }],
        "scroll-pe": [{ "scroll-pe": w() }],
        "scroll-pt": [{ "scroll-pt": w() }],
        "scroll-pr": [{ "scroll-pr": w() }],
        "scroll-pb": [{ "scroll-pb": w() }],
        "scroll-pl": [{ "scroll-pl": w() }],
        "snap-align": [{ snap: [`start`, `end`, `center`, `align-none`] }],
        "snap-stop": [{ snap: [`normal`, `always`] }],
        "snap-type": [{ snap: [`none`, `x`, `y`, `both`] }],
        "snap-strictness": [{ snap: [`mandatory`, `proximity`] }],
        touch: [{ touch: [`auto`, `none`, `manipulation`] }],
        "touch-x": [{ "touch-pan": [`x`, `left`, `right`] }],
        "touch-y": [{ "touch-pan": [`y`, `up`, `down`] }],
        "touch-pz": [`touch-pinch-zoom`],
        select: [{ select: [`none`, `text`, `all`, `auto`] }],
        "will-change": [{ "will-change": [`auto`, `scroll`, `contents`, `transform`, W, U] }],
        fill: [{ fill: [`none`, ...j()] }],
        "stroke-w": [{ stroke: [H, Oo, Co, wo] }],
        stroke: [{ stroke: [`none`, ...j()] }],
        "forced-color-adjust": [{ "forced-color-adjust": [`auto`, `none`] }],
      },
      conflictingClassGroups: {
        overflow: [`overflow-x`, `overflow-y`],
        overscroll: [`overscroll-x`, `overscroll-y`],
        inset: [`inset-x`, `inset-y`, `start`, `end`, `top`, `right`, `bottom`, `left`],
        "inset-x": [`right`, `left`],
        "inset-y": [`top`, `bottom`],
        flex: [`basis`, `grow`, `shrink`],
        gap: [`gap-x`, `gap-y`],
        p: [`px`, `py`, `ps`, `pe`, `pt`, `pr`, `pb`, `pl`],
        px: [`pr`, `pl`],
        py: [`pt`, `pb`],
        m: [`mx`, `my`, `ms`, `me`, `mt`, `mr`, `mb`, `ml`],
        mx: [`mr`, `ml`],
        my: [`mt`, `mb`],
        size: [`w`, `h`],
        "font-size": [`leading`],
        "fvn-normal": [
          `fvn-ordinal`,
          `fvn-slashed-zero`,
          `fvn-figure`,
          `fvn-spacing`,
          `fvn-fraction`,
        ],
        "fvn-ordinal": [`fvn-normal`],
        "fvn-slashed-zero": [`fvn-normal`],
        "fvn-figure": [`fvn-normal`],
        "fvn-spacing": [`fvn-normal`],
        "fvn-fraction": [`fvn-normal`],
        "line-clamp": [`display`, `overflow`],
        rounded: [
          `rounded-s`,
          `rounded-e`,
          `rounded-t`,
          `rounded-r`,
          `rounded-b`,
          `rounded-l`,
          `rounded-ss`,
          `rounded-se`,
          `rounded-ee`,
          `rounded-es`,
          `rounded-tl`,
          `rounded-tr`,
          `rounded-br`,
          `rounded-bl`,
        ],
        "rounded-s": [`rounded-ss`, `rounded-es`],
        "rounded-e": [`rounded-se`, `rounded-ee`],
        "rounded-t": [`rounded-tl`, `rounded-tr`],
        "rounded-r": [`rounded-tr`, `rounded-br`],
        "rounded-b": [`rounded-br`, `rounded-bl`],
        "rounded-l": [`rounded-tl`, `rounded-bl`],
        "border-spacing": [`border-spacing-x`, `border-spacing-y`],
        "border-w": [
          `border-w-x`,
          `border-w-y`,
          `border-w-s`,
          `border-w-e`,
          `border-w-t`,
          `border-w-r`,
          `border-w-b`,
          `border-w-l`,
        ],
        "border-w-x": [`border-w-r`, `border-w-l`],
        "border-w-y": [`border-w-t`, `border-w-b`],
        "border-color": [
          `border-color-x`,
          `border-color-y`,
          `border-color-s`,
          `border-color-e`,
          `border-color-t`,
          `border-color-r`,
          `border-color-b`,
          `border-color-l`,
        ],
        "border-color-x": [`border-color-r`, `border-color-l`],
        "border-color-y": [`border-color-t`, `border-color-b`],
        translate: [`translate-x`, `translate-y`, `translate-none`],
        "translate-none": [`translate`, `translate-x`, `translate-y`, `translate-z`],
        "scroll-m": [
          `scroll-mx`,
          `scroll-my`,
          `scroll-ms`,
          `scroll-me`,
          `scroll-mt`,
          `scroll-mr`,
          `scroll-mb`,
          `scroll-ml`,
        ],
        "scroll-mx": [`scroll-mr`, `scroll-ml`],
        "scroll-my": [`scroll-mt`, `scroll-mb`],
        "scroll-p": [
          `scroll-px`,
          `scroll-py`,
          `scroll-ps`,
          `scroll-pe`,
          `scroll-pt`,
          `scroll-pr`,
          `scroll-pb`,
          `scroll-pl`,
        ],
        "scroll-px": [`scroll-pr`, `scroll-pl`],
        "scroll-py": [`scroll-pt`, `scroll-pb`],
        touch: [`touch-x`, `touch-y`, `touch-pz`],
        "touch-x": [`touch`],
        "touch-y": [`touch`],
        "touch-pz": [`touch`],
      },
      conflictingClassGroupModifiers: { "font-size": [`leading`] },
      orderSensitiveModifiers: [
        `*`,
        `**`,
        `after`,
        `backdrop`,
        `before`,
        `details-content`,
        `file`,
        `first-letter`,
        `first-line`,
        `marker`,
        `placeholder`,
        `selection`,
      ],
    };
  }),
  Wo = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  Go = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => (n ? n.toUpperCase() : t.toLowerCase())),
  Ko = (e) => {
    let t = Go(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  qo = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  Jo = (e) => {
    for (let t in e) if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
  },
  Yo = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  Xo = (0, _.forwardRef)(
    (
      {
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c
    ) =>
      (0, _.createElement)(
        `svg`,
        {
          ref: c,
          ...Yo,
          width: t,
          height: t,
          stroke: e,
          strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
          className: qo(`lucide`, i),
          ...(!a && !Jo(s) && { "aria-hidden": `true` }),
          ...s,
        },
        [...o.map(([e, t]) => (0, _.createElement)(e, t)), ...(Array.isArray(a) ? a : [a])]
      )
  ),
  Zo = ((e, t) => {
    let n = (0, _.forwardRef)(({ className: n, ...r }, i) =>
      (0, _.createElement)(Xo, {
        ref: i,
        iconNode: t,
        className: qo(`lucide-${Wo(Ko(e))}`, `lucide-${e}`, n),
        ...r,
      })
    );
    return ((n.displayName = Ko(e)), n);
  })(`chevron-left`, [[`path`, { d: `m15 18-6-6 6-6`, key: `1wnfg3` }]]);
function Qo(e, t, n = `long`) {
  return new Intl.DateTimeFormat(`en-US`, { hour: `numeric`, timeZone: e, timeZoneName: n })
    .format(t)
    .split(/\s/g)
    .slice(2)
    .join(` `);
}
var $o = {},
  es = {};
function ts(e, t) {
  try {
    let n = ($o[e] ||= new Intl.DateTimeFormat(`en-US`, {
      timeZone: e,
      timeZoneName: `longOffset`,
    }).format)(t).split(`GMT`)[1];
    return n in es ? es[n] : rs(n, n.split(`:`));
  } catch {
    if (e in es) return es[e];
    let t = e?.match(ns);
    return t ? rs(e, t.slice(1)) : NaN;
  }
}
var ns = /([+-]\d\d):?(\d\d)?/;
function rs(e, t) {
  let n = +(t[0] || 0),
    r = +(t[1] || 0),
    i = (t[2] || 0) / 60;
  return (es[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i);
}
var is = class e extends Date {
    constructor(...e) {
      (super(),
        e.length > 1 && typeof e[e.length - 1] == `string` && (this.timeZone = e.pop()),
        (this.internal = new Date()),
        isNaN(ts(this.timeZone, this))
          ? this.setTime(NaN)
          : e.length
            ? typeof e[0] == `number` &&
              (e.length === 1 || (e.length === 2 && typeof e[1] != `number`))
              ? this.setTime(e[0])
              : typeof e[0] == `string`
                ? this.setTime(+new Date(e[0]))
                : e[0] instanceof Date
                  ? this.setTime(+e[0])
                  : (this.setTime(+new Date(...e)), cs(this, NaN), os(this))
            : this.setTime(Date.now()));
    }
    static tz(t, ...n) {
      return n.length ? new e(...n, t) : new e(Date.now(), t);
    }
    withTimeZone(t) {
      return new e(+this, t);
    }
    getTimezoneOffset() {
      let e = -ts(this.timeZone, this);
      return e > 0 ? Math.floor(e) : Math.ceil(e);
    }
    setTime(e) {
      return (Date.prototype.setTime.apply(this, arguments), os(this), +this);
    }
    [Symbol.for(`constructDateFrom`)](t) {
      return new e(+new Date(t), this.timeZone);
    }
  },
  as = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!as.test(e)) return;
  let t = e.replace(as, `$1UTC`);
  is.prototype[t] &&
    (e.startsWith(`get`)
      ? (is.prototype[e] = function () {
          return this.internal[t]();
        })
      : ((is.prototype[e] = function () {
          return (Date.prototype[t].apply(this.internal, arguments), ss(this), +this);
        }),
        (is.prototype[t] = function () {
          return (Date.prototype[t].apply(this, arguments), os(this), +this);
        })));
});
function os(e) {
  (e.internal.setTime(+e),
    e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-ts(e.timeZone, e) * 60)));
}
function ss(e) {
  (Date.prototype.setFullYear.call(
    e,
    e.internal.getUTCFullYear(),
    e.internal.getUTCMonth(),
    e.internal.getUTCDate()
  ),
    Date.prototype.setHours.call(
      e,
      e.internal.getUTCHours(),
      e.internal.getUTCMinutes(),
      e.internal.getUTCSeconds(),
      e.internal.getUTCMilliseconds()
    ),
    cs(e));
}
function cs(e) {
  let t = ts(e.timeZone, e),
    n = t > 0 ? Math.floor(t) : Math.ceil(t),
    r = new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  let i = -new Date(+e).getTimezoneOffset(),
    a = i - -new Date(+r).getTimezoneOffset(),
    o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  let s = i - n;
  s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
  let c = new Date(+e);
  c.setUTCSeconds(0);
  let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60,
    u = Math.round(-(ts(e.timeZone, e) * 60)) % 60;
  (u || l) &&
    (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u),
    Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
  let d = ts(e.timeZone, e),
    f = d > 0 ? Math.floor(d) : Math.ceil(d),
    p = -new Date(+e).getTimezoneOffset() - f,
    m = f !== n,
    h = p - s;
  if (m && h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
    let t = ts(e.timeZone, e),
      n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
    n &&
      (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n),
      Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
  }
}
var ls = class e extends is {
  static tz(t, ...n) {
    return n.length ? new e(...n, t) : new e(Date.now(), t);
  }
  toISOString() {
    let [e, t, n] = this.tzComponents(),
      r = `${e}${t}:${n}`;
    return this.internal.toISOString().slice(0, -1) + r;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    let [e, t, n, r] = this.internal.toUTCString().split(` `);
    return `${e?.slice(0, -1)} ${n} ${t} ${r}`;
  }
  toTimeString() {
    let e = this.internal.toUTCString().split(` `)[4],
      [t, n, r] = this.tzComponents();
    return `${e} GMT${t}${n}${r} (${Qo(this.timeZone, this)})`;
  }
  toLocaleString(e, t) {
    return Date.prototype.toLocaleString.call(this, e, {
      ...t,
      timeZone: t?.timeZone || this.timeZone,
    });
  }
  toLocaleDateString(e, t) {
    return Date.prototype.toLocaleDateString.call(this, e, {
      ...t,
      timeZone: t?.timeZone || this.timeZone,
    });
  }
  toLocaleTimeString(e, t) {
    return Date.prototype.toLocaleTimeString.call(this, e, {
      ...t,
      timeZone: t?.timeZone || this.timeZone,
    });
  }
  tzComponents() {
    let e = this.getTimezoneOffset();
    return [
      e > 0 ? `-` : `+`,
      String(Math.floor(Math.abs(e) / 60)).padStart(2, `0`),
      String(Math.abs(e) % 60).padStart(2, `0`),
    ];
  }
  withTimeZone(t) {
    return new e(+this, t);
  }
  [Symbol.for(`constructDateFrom`)](t) {
    return new e(+new Date(t), this.timeZone);
  }
};
const us = 6048e5,
  ds = 3600 * 24;
(ds * 7, ds * 365.2425);
const fs = Symbol.for(`constructDateFrom`);
function ps(e, t) {
  return typeof e == `function`
    ? e(t)
    : e && typeof e == `object` && fs in e
      ? e[fs](t)
      : e instanceof Date
        ? new e.constructor(t)
        : new Date(t);
}
function ms(e, t) {
  return ps(t || e, e);
}
function hs(e, t, n) {
  let r = ms(e, n?.in);
  return isNaN(t) ? ps(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function gs(e, t, n) {
  let r = ms(e, n?.in);
  if (isNaN(t)) return ps(n?.in || e, NaN);
  if (!t) return r;
  let i = r.getDate(),
    a = ps(n?.in || e, r.getTime());
  return (
    a.setMonth(r.getMonth() + t + 1, 0),
    i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r)
  );
}
var _s = {};
function vs() {
  return _s;
}
function ys(e, t) {
  let n = vs(),
    r =
      t?.weekStartsOn ??
      t?.locale?.options?.weekStartsOn ??
      n.weekStartsOn ??
      n.locale?.options?.weekStartsOn ??
      0,
    i = ms(e, t?.in),
    a = i.getDay(),
    o = (a < r ? 7 : 0) + a - r;
  return (i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i);
}
function bs(e, t) {
  return ys(e, { ...t, weekStartsOn: 1 });
}
function xs(e, t) {
  let n = ms(e, t?.in),
    r = n.getFullYear(),
    i = ps(n, 0);
  (i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0));
  let a = bs(i),
    o = ps(n, 0);
  (o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0));
  let s = bs(o);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
function Ss(e) {
  let t = ms(e),
    n = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds()
      )
    );
  return (n.setUTCFullYear(t.getFullYear()), e - +n);
}
function Cs(e, ...t) {
  let n = ps.bind(null, e || t.find((e) => typeof e == `object`));
  return t.map(n);
}
function ws(e, t) {
  let n = ms(e, t?.in);
  return (n.setHours(0, 0, 0, 0), n);
}
function Ts(e, t, n) {
  let [r, i] = Cs(n?.in, e, t),
    a = ws(r),
    o = ws(i),
    s = +a - Ss(a),
    c = +o - Ss(o);
  return Math.round((s - c) / 864e5);
}
function Es(e, t) {
  let n = xs(e, t),
    r = ps(t?.in || e, 0);
  return (r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), bs(r));
}
function Ds(e, t, n) {
  return hs(e, t * 7, n);
}
function Os(e, t, n) {
  return gs(e, t * 12, n);
}
function ks(e, t) {
  let n,
    r = t?.in;
  return (
    e.forEach((e) => {
      !r && typeof e == `object` && (r = ps.bind(null, e));
      let t = ms(e, r);
      (!n || n < t || isNaN(+t)) && (n = t);
    }),
    ps(r, n || NaN)
  );
}
function As(e, t) {
  let n,
    r = t?.in;
  return (
    e.forEach((e) => {
      !r && typeof e == `object` && (r = ps.bind(null, e));
      let t = ms(e, r);
      (!n || n > t || isNaN(+t)) && (n = t);
    }),
    ps(r, n || NaN)
  );
}
function js(e, t, n) {
  let [r, i] = Cs(n?.in, e, t);
  return +ws(r) == +ws(i);
}
function Ms(e) {
  return (
    e instanceof Date ||
    (typeof e == `object` && Object.prototype.toString.call(e) === `[object Date]`)
  );
}
function Ns(e) {
  return !((!Ms(e) && typeof e != `number`) || isNaN(+ms(e)));
}
function Ps(e, t, n) {
  let [r, i] = Cs(n?.in, e, t),
    a = r.getFullYear() - i.getFullYear(),
    o = r.getMonth() - i.getMonth();
  return a * 12 + o;
}
function Fs(e, t) {
  let n = ms(e, t?.in),
    r = n.getMonth();
  return (n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n);
}
function Is(e, t) {
  let [n, r] = Cs(e, t.start, t.end);
  return { start: n, end: r };
}
function Ls(e, t) {
  let { start: n, end: r } = Is(t?.in, e),
    i = +n > +r,
    a = i ? +n : +r,
    o = i ? r : n;
  (o.setHours(0, 0, 0, 0), o.setDate(1));
  let s = t?.step ?? 1;
  if (!s) return [];
  s < 0 && ((s = -s), (i = !i));
  let c = [];
  for (; +o <= a; ) (c.push(ps(n, o)), o.setMonth(o.getMonth() + s));
  return i ? c.reverse() : c;
}
function Rs(e, t) {
  let n = ms(e, t?.in);
  return (n.setDate(1), n.setHours(0, 0, 0, 0), n);
}
function zs(e, t) {
  let n = ms(e, t?.in),
    r = n.getFullYear();
  return (n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n);
}
function Bs(e, t) {
  let n = ms(e, t?.in);
  return (n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n);
}
function Vs(e, t) {
  let { start: n, end: r } = Is(t?.in, e),
    i = +n > +r,
    a = i ? +n : +r,
    o = i ? r : n;
  (o.setHours(0, 0, 0, 0), o.setMonth(0, 1));
  let s = t?.step ?? 1;
  if (!s) return [];
  s < 0 && ((s = -s), (i = !i));
  let c = [];
  for (; +o <= a; ) (c.push(ps(n, o)), o.setFullYear(o.getFullYear() + s));
  return i ? c.reverse() : c;
}
function Hs(e, t) {
  let n = vs(),
    r =
      t?.weekStartsOn ??
      t?.locale?.options?.weekStartsOn ??
      n.weekStartsOn ??
      n.locale?.options?.weekStartsOn ??
      0,
    i = ms(e, t?.in),
    a = i.getDay(),
    o = (a < r ? -7 : 0) + 6 - (a - r);
  return (i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i);
}
function Us(e, t) {
  return Hs(e, { ...t, weekStartsOn: 1 });
}
var Ws = {
  lessThanXSeconds: { one: `less than a second`, other: `less than {{count}} seconds` },
  xSeconds: { one: `1 second`, other: `{{count}} seconds` },
  halfAMinute: `half a minute`,
  lessThanXMinutes: { one: `less than a minute`, other: `less than {{count}} minutes` },
  xMinutes: { one: `1 minute`, other: `{{count}} minutes` },
  aboutXHours: { one: `about 1 hour`, other: `about {{count}} hours` },
  xHours: { one: `1 hour`, other: `{{count}} hours` },
  xDays: { one: `1 day`, other: `{{count}} days` },
  aboutXWeeks: { one: `about 1 week`, other: `about {{count}} weeks` },
  xWeeks: { one: `1 week`, other: `{{count}} weeks` },
  aboutXMonths: { one: `about 1 month`, other: `about {{count}} months` },
  xMonths: { one: `1 month`, other: `{{count}} months` },
  aboutXYears: { one: `about 1 year`, other: `about {{count}} years` },
  xYears: { one: `1 year`, other: `{{count}} years` },
  overXYears: { one: `over 1 year`, other: `over {{count}} years` },
  almostXYears: { one: `almost 1 year`, other: `almost {{count}} years` },
};
const Gs = (e, t, n) => {
  let r,
    i = Ws[e];
  return (
    (r = typeof i == `string` ? i : t === 1 ? i.one : i.other.replace(`{{count}}`, t.toString())),
    n?.addSuffix ? (n.comparison && n.comparison > 0 ? `in ` + r : r + ` ago`) : r
  );
};
function Ks(e) {
  return (t = {}) => {
    let n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const qs = {
  date: Ks({
    formats: {
      full: `EEEE, MMMM do, y`,
      long: `MMMM do, y`,
      medium: `MMM d, y`,
      short: `MM/dd/yyyy`,
    },
    defaultWidth: `full`,
  }),
  time: Ks({
    formats: { full: `h:mm:ss a zzzz`, long: `h:mm:ss a z`, medium: `h:mm:ss a`, short: `h:mm a` },
    defaultWidth: `full`,
  }),
  dateTime: Ks({
    formats: {
      full: `{{date}} 'at' {{time}}`,
      long: `{{date}} 'at' {{time}}`,
      medium: `{{date}}, {{time}}`,
      short: `{{date}}, {{time}}`,
    },
    defaultWidth: `full`,
  }),
};
var Js = {
  lastWeek: `'last' eeee 'at' p`,
  yesterday: `'yesterday at' p`,
  today: `'today at' p`,
  tomorrow: `'tomorrow at' p`,
  nextWeek: `eeee 'at' p`,
  other: `P`,
};
const Ys = (e, t, n, r) => Js[e];
function Xs(e) {
  return (t, n) => {
    let r = n?.context ? String(n.context) : `standalone`,
      i;
    if (r === `formatting` && e.formattingValues) {
      let t = e.defaultFormattingWidth || e.defaultWidth,
        r = n?.width ? String(n.width) : t;
      i = e.formattingValues[r] || e.formattingValues[t];
    } else {
      let t = e.defaultWidth,
        r = n?.width ? String(n.width) : e.defaultWidth;
      i = e.values[r] || e.values[t];
    }
    let a = e.argumentCallback ? e.argumentCallback(t) : t;
    return i[a];
  };
}
const Zs = {
  ordinalNumber: (e, t) => {
    let n = Number(e),
      r = n % 100;
    if (r > 20 || r < 10)
      switch (r % 10) {
        case 1:
          return n + `st`;
        case 2:
          return n + `nd`;
        case 3:
          return n + `rd`;
      }
    return n + `th`;
  },
  era: Xs({
    values: {
      narrow: [`B`, `A`],
      abbreviated: [`BC`, `AD`],
      wide: [`Before Christ`, `Anno Domini`],
    },
    defaultWidth: `wide`,
  }),
  quarter: Xs({
    values: {
      narrow: [`1`, `2`, `3`, `4`],
      abbreviated: [`Q1`, `Q2`, `Q3`, `Q4`],
      wide: [`1st quarter`, `2nd quarter`, `3rd quarter`, `4th quarter`],
    },
    defaultWidth: `wide`,
    argumentCallback: (e) => e - 1,
  }),
  month: Xs({
    values: {
      narrow: [`J`, `F`, `M`, `A`, `M`, `J`, `J`, `A`, `S`, `O`, `N`, `D`],
      abbreviated: [
        `Jan`,
        `Feb`,
        `Mar`,
        `Apr`,
        `May`,
        `Jun`,
        `Jul`,
        `Aug`,
        `Sep`,
        `Oct`,
        `Nov`,
        `Dec`,
      ],
      wide: [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`,
      ],
    },
    defaultWidth: `wide`,
  }),
  day: Xs({
    values: {
      narrow: [`S`, `M`, `T`, `W`, `T`, `F`, `S`],
      short: [`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`],
      abbreviated: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
      wide: [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
    },
    defaultWidth: `wide`,
  }),
  dayPeriod: Xs({
    values: {
      narrow: {
        am: `a`,
        pm: `p`,
        midnight: `mi`,
        noon: `n`,
        morning: `morning`,
        afternoon: `afternoon`,
        evening: `evening`,
        night: `night`,
      },
      abbreviated: {
        am: `AM`,
        pm: `PM`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `morning`,
        afternoon: `afternoon`,
        evening: `evening`,
        night: `night`,
      },
      wide: {
        am: `a.m.`,
        pm: `p.m.`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `morning`,
        afternoon: `afternoon`,
        evening: `evening`,
        night: `night`,
      },
    },
    defaultWidth: `wide`,
    formattingValues: {
      narrow: {
        am: `a`,
        pm: `p`,
        midnight: `mi`,
        noon: `n`,
        morning: `in the morning`,
        afternoon: `in the afternoon`,
        evening: `in the evening`,
        night: `at night`,
      },
      abbreviated: {
        am: `AM`,
        pm: `PM`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `in the morning`,
        afternoon: `in the afternoon`,
        evening: `in the evening`,
        night: `at night`,
      },
      wide: {
        am: `a.m.`,
        pm: `p.m.`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `in the morning`,
        afternoon: `in the afternoon`,
        evening: `in the evening`,
        night: `at night`,
      },
    },
    defaultFormattingWidth: `wide`,
  }),
};
function Qs(e) {
  return (t, n = {}) => {
    let r = n.width,
      i = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
      a = t.match(i);
    if (!a) return null;
    let o = a[0],
      s = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
      c = Array.isArray(s) ? ec(s, (e) => e.test(o)) : $s(s, (e) => e.test(o)),
      l;
    ((l = e.valueCallback ? e.valueCallback(c) : c),
      (l = n.valueCallback ? n.valueCallback(l) : l));
    let u = t.slice(o.length);
    return { value: l, rest: u };
  };
}
function $s(e, t) {
  for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function ec(e, t) {
  for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
function tc(e) {
  return (t, n = {}) => {
    let r = t.match(e.matchPattern);
    if (!r) return null;
    let i = r[0],
      a = t.match(e.parsePattern);
    if (!a) return null;
    let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    o = n.valueCallback ? n.valueCallback(o) : o;
    let s = t.slice(i.length);
    return { value: o, rest: s };
  };
}
const nc = {
  code: `en-US`,
  formatDistance: Gs,
  formatLong: qs,
  formatRelative: Ys,
  localize: Zs,
  match: {
    ordinalNumber: tc({
      matchPattern: /^(\d+)(th|st|nd|rd)?/i,
      parsePattern: /\d+/i,
      valueCallback: (e) => parseInt(e, 10),
    }),
    era: Qs({
      matchPatterns: {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: { any: [/^b/i, /^(a|c)/i] },
      defaultParseWidth: `any`,
    }),
    quarter: Qs({
      matchPatterns: {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
      defaultParseWidth: `any`,
      valueCallback: (e) => e + 1,
    }),
    month: Qs({
      matchPatterns: {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: {
        narrow: [
          /^j/i,
          /^f/i,
          /^m/i,
          /^a/i,
          /^m/i,
          /^j/i,
          /^j/i,
          /^a/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
        any: [
          /^ja/i,
          /^f/i,
          /^mar/i,
          /^ap/i,
          /^may/i,
          /^jun/i,
          /^jul/i,
          /^au/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
      },
      defaultParseWidth: `any`,
    }),
    day: Qs({
      matchPatterns: {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
      },
      defaultParseWidth: `any`,
    }),
    dayPeriod: Qs({
      matchPatterns: {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
      },
      defaultMatchWidth: `any`,
      parsePatterns: {
        any: {
          am: /^a/i,
          pm: /^p/i,
          midnight: /^mi/i,
          noon: /^no/i,
          morning: /morning/i,
          afternoon: /afternoon/i,
          evening: /evening/i,
          night: /night/i,
        },
      },
      defaultParseWidth: `any`,
    }),
  },
  options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
};
function rc(e, t) {
  let n = ms(e, t?.in);
  return Ts(n, Bs(n)) + 1;
}
function ic(e, t) {
  let n = ms(e, t?.in),
    r = bs(n) - +Es(n);
  return Math.round(r / us) + 1;
}
function ac(e, t) {
  let n = ms(e, t?.in),
    r = n.getFullYear(),
    i = vs(),
    a =
      t?.firstWeekContainsDate ??
      t?.locale?.options?.firstWeekContainsDate ??
      i.firstWeekContainsDate ??
      i.locale?.options?.firstWeekContainsDate ??
      1,
    o = ps(t?.in || e, 0);
  (o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0));
  let s = ys(o, t),
    c = ps(t?.in || e, 0);
  (c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0));
  let l = ys(c, t);
  return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
function oc(e, t) {
  let n = vs(),
    r =
      t?.firstWeekContainsDate ??
      t?.locale?.options?.firstWeekContainsDate ??
      n.firstWeekContainsDate ??
      n.locale?.options?.firstWeekContainsDate ??
      1,
    i = ac(e, t),
    a = ps(t?.in || e, 0);
  return (a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), ys(a, t));
}
function sc(e, t) {
  let n = ms(e, t?.in),
    r = ys(n, t) - +oc(n, t);
  return Math.round(r / us) + 1;
}
function G(e, t) {
  return (e < 0 ? `-` : ``) + Math.abs(e).toString().padStart(t, `0`);
}
const cc = {
  y(e, t) {
    let n = e.getFullYear(),
      r = n > 0 ? n : 1 - n;
    return G(t === `yy` ? r % 100 : r, t.length);
  },
  M(e, t) {
    let n = e.getMonth();
    return t === `M` ? String(n + 1) : G(n + 1, 2);
  },
  d(e, t) {
    return G(e.getDate(), t.length);
  },
  a(e, t) {
    let n = e.getHours() / 12 >= 1 ? `pm` : `am`;
    switch (t) {
      case `a`:
      case `aa`:
        return n.toUpperCase();
      case `aaa`:
        return n;
      case `aaaaa`:
        return n[0];
      case `aaaa`:
      default:
        return n === `am` ? `a.m.` : `p.m.`;
    }
  },
  h(e, t) {
    return G(e.getHours() % 12 || 12, t.length);
  },
  H(e, t) {
    return G(e.getHours(), t.length);
  },
  m(e, t) {
    return G(e.getMinutes(), t.length);
  },
  s(e, t) {
    return G(e.getSeconds(), t.length);
  },
  S(e, t) {
    let n = t.length,
      r = e.getMilliseconds();
    return G(Math.trunc(r * 10 ** (n - 3)), t.length);
  },
};
var lc = {
  am: `am`,
  pm: `pm`,
  midnight: `midnight`,
  noon: `noon`,
  morning: `morning`,
  afternoon: `afternoon`,
  evening: `evening`,
  night: `night`,
};
const uc = {
  G: function (e, t, n) {
    let r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case `G`:
      case `GG`:
      case `GGG`:
        return n.era(r, { width: `abbreviated` });
      case `GGGGG`:
        return n.era(r, { width: `narrow` });
      case `GGGG`:
      default:
        return n.era(r, { width: `wide` });
    }
  },
  y: function (e, t, n) {
    if (t === `yo`) {
      let t = e.getFullYear(),
        r = t > 0 ? t : 1 - t;
      return n.ordinalNumber(r, { unit: `year` });
    }
    return cc.y(e, t);
  },
  Y: function (e, t, n, r) {
    let i = ac(e, r),
      a = i > 0 ? i : 1 - i;
    return t === `YY`
      ? G(a % 100, 2)
      : t === `Yo`
        ? n.ordinalNumber(a, { unit: `year` })
        : G(a, t.length);
  },
  R: function (e, t) {
    return G(xs(e), t.length);
  },
  u: function (e, t) {
    return G(e.getFullYear(), t.length);
  },
  Q: function (e, t, n) {
    let r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case `Q`:
        return String(r);
      case `QQ`:
        return G(r, 2);
      case `Qo`:
        return n.ordinalNumber(r, { unit: `quarter` });
      case `QQQ`:
        return n.quarter(r, { width: `abbreviated`, context: `formatting` });
      case `QQQQQ`:
        return n.quarter(r, { width: `narrow`, context: `formatting` });
      case `QQQQ`:
      default:
        return n.quarter(r, { width: `wide`, context: `formatting` });
    }
  },
  q: function (e, t, n) {
    let r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case `q`:
        return String(r);
      case `qq`:
        return G(r, 2);
      case `qo`:
        return n.ordinalNumber(r, { unit: `quarter` });
      case `qqq`:
        return n.quarter(r, { width: `abbreviated`, context: `standalone` });
      case `qqqqq`:
        return n.quarter(r, { width: `narrow`, context: `standalone` });
      case `qqqq`:
      default:
        return n.quarter(r, { width: `wide`, context: `standalone` });
    }
  },
  M: function (e, t, n) {
    let r = e.getMonth();
    switch (t) {
      case `M`:
      case `MM`:
        return cc.M(e, t);
      case `Mo`:
        return n.ordinalNumber(r + 1, { unit: `month` });
      case `MMM`:
        return n.month(r, { width: `abbreviated`, context: `formatting` });
      case `MMMMM`:
        return n.month(r, { width: `narrow`, context: `formatting` });
      case `MMMM`:
      default:
        return n.month(r, { width: `wide`, context: `formatting` });
    }
  },
  L: function (e, t, n) {
    let r = e.getMonth();
    switch (t) {
      case `L`:
        return String(r + 1);
      case `LL`:
        return G(r + 1, 2);
      case `Lo`:
        return n.ordinalNumber(r + 1, { unit: `month` });
      case `LLL`:
        return n.month(r, { width: `abbreviated`, context: `standalone` });
      case `LLLLL`:
        return n.month(r, { width: `narrow`, context: `standalone` });
      case `LLLL`:
      default:
        return n.month(r, { width: `wide`, context: `standalone` });
    }
  },
  w: function (e, t, n, r) {
    let i = sc(e, r);
    return t === `wo` ? n.ordinalNumber(i, { unit: `week` }) : G(i, t.length);
  },
  I: function (e, t, n) {
    let r = ic(e);
    return t === `Io` ? n.ordinalNumber(r, { unit: `week` }) : G(r, t.length);
  },
  d: function (e, t, n) {
    return t === `do` ? n.ordinalNumber(e.getDate(), { unit: `date` }) : cc.d(e, t);
  },
  D: function (e, t, n) {
    let r = rc(e);
    return t === `Do` ? n.ordinalNumber(r, { unit: `dayOfYear` }) : G(r, t.length);
  },
  E: function (e, t, n) {
    let r = e.getDay();
    switch (t) {
      case `E`:
      case `EE`:
      case `EEE`:
        return n.day(r, { width: `abbreviated`, context: `formatting` });
      case `EEEEE`:
        return n.day(r, { width: `narrow`, context: `formatting` });
      case `EEEEEE`:
        return n.day(r, { width: `short`, context: `formatting` });
      case `EEEE`:
      default:
        return n.day(r, { width: `wide`, context: `formatting` });
    }
  },
  e: function (e, t, n, r) {
    let i = e.getDay(),
      a = (i - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case `e`:
        return String(a);
      case `ee`:
        return G(a, 2);
      case `eo`:
        return n.ordinalNumber(a, { unit: `day` });
      case `eee`:
        return n.day(i, { width: `abbreviated`, context: `formatting` });
      case `eeeee`:
        return n.day(i, { width: `narrow`, context: `formatting` });
      case `eeeeee`:
        return n.day(i, { width: `short`, context: `formatting` });
      case `eeee`:
      default:
        return n.day(i, { width: `wide`, context: `formatting` });
    }
  },
  c: function (e, t, n, r) {
    let i = e.getDay(),
      a = (i - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case `c`:
        return String(a);
      case `cc`:
        return G(a, t.length);
      case `co`:
        return n.ordinalNumber(a, { unit: `day` });
      case `ccc`:
        return n.day(i, { width: `abbreviated`, context: `standalone` });
      case `ccccc`:
        return n.day(i, { width: `narrow`, context: `standalone` });
      case `cccccc`:
        return n.day(i, { width: `short`, context: `standalone` });
      case `cccc`:
      default:
        return n.day(i, { width: `wide`, context: `standalone` });
    }
  },
  i: function (e, t, n) {
    let r = e.getDay(),
      i = r === 0 ? 7 : r;
    switch (t) {
      case `i`:
        return String(i);
      case `ii`:
        return G(i, t.length);
      case `io`:
        return n.ordinalNumber(i, { unit: `day` });
      case `iii`:
        return n.day(r, { width: `abbreviated`, context: `formatting` });
      case `iiiii`:
        return n.day(r, { width: `narrow`, context: `formatting` });
      case `iiiiii`:
        return n.day(r, { width: `short`, context: `formatting` });
      case `iiii`:
      default:
        return n.day(r, { width: `wide`, context: `formatting` });
    }
  },
  a: function (e, t, n) {
    let r = e.getHours() / 12 >= 1 ? `pm` : `am`;
    switch (t) {
      case `a`:
      case `aa`:
        return n.dayPeriod(r, { width: `abbreviated`, context: `formatting` });
      case `aaa`:
        return n.dayPeriod(r, { width: `abbreviated`, context: `formatting` }).toLowerCase();
      case `aaaaa`:
        return n.dayPeriod(r, { width: `narrow`, context: `formatting` });
      case `aaaa`:
      default:
        return n.dayPeriod(r, { width: `wide`, context: `formatting` });
    }
  },
  b: function (e, t, n) {
    let r = e.getHours(),
      i;
    switch (((i = r === 12 ? lc.noon : r === 0 ? lc.midnight : r / 12 >= 1 ? `pm` : `am`), t)) {
      case `b`:
      case `bb`:
        return n.dayPeriod(i, { width: `abbreviated`, context: `formatting` });
      case `bbb`:
        return n.dayPeriod(i, { width: `abbreviated`, context: `formatting` }).toLowerCase();
      case `bbbbb`:
        return n.dayPeriod(i, { width: `narrow`, context: `formatting` });
      case `bbbb`:
      default:
        return n.dayPeriod(i, { width: `wide`, context: `formatting` });
    }
  },
  B: function (e, t, n) {
    let r = e.getHours(),
      i;
    switch (
      ((i = r >= 17 ? lc.evening : r >= 12 ? lc.afternoon : r >= 4 ? lc.morning : lc.night), t)
    ) {
      case `B`:
      case `BB`:
      case `BBB`:
        return n.dayPeriod(i, { width: `abbreviated`, context: `formatting` });
      case `BBBBB`:
        return n.dayPeriod(i, { width: `narrow`, context: `formatting` });
      case `BBBB`:
      default:
        return n.dayPeriod(i, { width: `wide`, context: `formatting` });
    }
  },
  h: function (e, t, n) {
    if (t === `ho`) {
      let t = e.getHours() % 12;
      return (t === 0 && (t = 12), n.ordinalNumber(t, { unit: `hour` }));
    }
    return cc.h(e, t);
  },
  H: function (e, t, n) {
    return t === `Ho` ? n.ordinalNumber(e.getHours(), { unit: `hour` }) : cc.H(e, t);
  },
  K: function (e, t, n) {
    let r = e.getHours() % 12;
    return t === `Ko` ? n.ordinalNumber(r, { unit: `hour` }) : G(r, t.length);
  },
  k: function (e, t, n) {
    let r = e.getHours();
    return (
      r === 0 && (r = 24),
      t === `ko` ? n.ordinalNumber(r, { unit: `hour` }) : G(r, t.length)
    );
  },
  m: function (e, t, n) {
    return t === `mo` ? n.ordinalNumber(e.getMinutes(), { unit: `minute` }) : cc.m(e, t);
  },
  s: function (e, t, n) {
    return t === `so` ? n.ordinalNumber(e.getSeconds(), { unit: `second` }) : cc.s(e, t);
  },
  S: function (e, t) {
    return cc.S(e, t);
  },
  X: function (e, t, n) {
    let r = e.getTimezoneOffset();
    if (r === 0) return `Z`;
    switch (t) {
      case `X`:
        return fc(r);
      case `XXXX`:
      case `XX`:
        return pc(r);
      case `XXXXX`:
      case `XXX`:
      default:
        return pc(r, `:`);
    }
  },
  x: function (e, t, n) {
    let r = e.getTimezoneOffset();
    switch (t) {
      case `x`:
        return fc(r);
      case `xxxx`:
      case `xx`:
        return pc(r);
      case `xxxxx`:
      case `xxx`:
      default:
        return pc(r, `:`);
    }
  },
  O: function (e, t, n) {
    let r = e.getTimezoneOffset();
    switch (t) {
      case `O`:
      case `OO`:
      case `OOO`:
        return `GMT` + dc(r, `:`);
      case `OOOO`:
      default:
        return `GMT` + pc(r, `:`);
    }
  },
  z: function (e, t, n) {
    let r = e.getTimezoneOffset();
    switch (t) {
      case `z`:
      case `zz`:
      case `zzz`:
        return `GMT` + dc(r, `:`);
      case `zzzz`:
      default:
        return `GMT` + pc(r, `:`);
    }
  },
  t: function (e, t, n) {
    return G(Math.trunc(e / 1e3), t.length);
  },
  T: function (e, t, n) {
    return G(+e, t.length);
  },
};
function dc(e, t = ``) {
  let n = e > 0 ? `-` : `+`,
    r = Math.abs(e),
    i = Math.trunc(r / 60),
    a = r % 60;
  return a === 0 ? n + String(i) : n + String(i) + t + G(a, 2);
}
function fc(e, t) {
  return e % 60 == 0 ? (e > 0 ? `-` : `+`) + G(Math.abs(e) / 60, 2) : pc(e, t);
}
function pc(e, t = ``) {
  let n = e > 0 ? `-` : `+`,
    r = Math.abs(e),
    i = G(Math.trunc(r / 60), 2),
    a = G(r % 60, 2);
  return n + i + t + a;
}
var mc = (e, t) => {
    switch (e) {
      case `P`:
        return t.date({ width: `short` });
      case `PP`:
        return t.date({ width: `medium` });
      case `PPP`:
        return t.date({ width: `long` });
      case `PPPP`:
      default:
        return t.date({ width: `full` });
    }
  },
  hc = (e, t) => {
    switch (e) {
      case `p`:
        return t.time({ width: `short` });
      case `pp`:
        return t.time({ width: `medium` });
      case `ppp`:
        return t.time({ width: `long` });
      case `pppp`:
      default:
        return t.time({ width: `full` });
    }
  };
const gc = {
  p: hc,
  P: (e, t) => {
    let n = e.match(/(P+)(p+)?/) || [],
      r = n[1],
      i = n[2];
    if (!i) return mc(e, t);
    let a;
    switch (r) {
      case `P`:
        a = t.dateTime({ width: `short` });
        break;
      case `PP`:
        a = t.dateTime({ width: `medium` });
        break;
      case `PPP`:
        a = t.dateTime({ width: `long` });
        break;
      case `PPPP`:
      default:
        a = t.dateTime({ width: `full` });
        break;
    }
    return a.replace(`{{date}}`, mc(r, t)).replace(`{{time}}`, hc(i, t));
  },
};
var _c = /^D+$/,
  vc = /^Y+$/,
  yc = [`D`, `DD`, `YY`, `YYYY`];
function bc(e) {
  return _c.test(e);
}
function xc(e) {
  return vc.test(e);
}
function Sc(e, t, n) {
  let r = Cc(e, t, n);
  if ((console.warn(r), yc.includes(e))) throw RangeError(r);
}
function Cc(e, t, n) {
  let r = e[0] === `Y` ? `years` : `days of the month`;
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var wc = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  Tc = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  Ec = /^'([^]*?)'?$/,
  Dc = /''/g,
  Oc = /[a-zA-Z]/;
function kc(e, t, n) {
  let r = vs(),
    i = n?.locale ?? r.locale ?? nc,
    a =
      n?.firstWeekContainsDate ??
      n?.locale?.options?.firstWeekContainsDate ??
      r.firstWeekContainsDate ??
      r.locale?.options?.firstWeekContainsDate ??
      1,
    o =
      n?.weekStartsOn ??
      n?.locale?.options?.weekStartsOn ??
      r.weekStartsOn ??
      r.locale?.options?.weekStartsOn ??
      0,
    s = ms(e, n?.in);
  if (!Ns(s)) throw RangeError(`Invalid time value`);
  let c = t
    .match(Tc)
    .map((e) => {
      let t = e[0];
      if (t === `p` || t === `P`) {
        let n = gc[t];
        return n(e, i.formatLong);
      }
      return e;
    })
    .join(``)
    .match(wc)
    .map((e) => {
      if (e === `''`) return { isToken: !1, value: `'` };
      let t = e[0];
      if (t === `'`) return { isToken: !1, value: Ac(e) };
      if (uc[t]) return { isToken: !0, value: e };
      if (t.match(Oc))
        throw RangeError(
          "Format string contains an unescaped latin alphabet character `" + t + "`"
        );
      return { isToken: !1, value: e };
    });
  i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
  let l = { firstWeekContainsDate: a, weekStartsOn: o, locale: i };
  return c
    .map((r) => {
      if (!r.isToken) return r.value;
      let a = r.value;
      ((!n?.useAdditionalWeekYearTokens && xc(a)) || (!n?.useAdditionalDayOfYearTokens && bc(a))) &&
        Sc(a, t, String(e));
      let o = uc[a[0]];
      return o(s, a, i.localize, l);
    })
    .join(``);
}
function Ac(e) {
  let t = e.match(Ec);
  return t ? t[1].replace(Dc, `'`) : e;
}
function jc(e, t) {
  let n = ms(e, t?.in),
    r = n.getFullYear(),
    i = n.getMonth(),
    a = ps(n, 0);
  return (a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate());
}
function Mc(e, t) {
  return ms(e, t?.in).getMonth();
}
function Nc(e, t) {
  return ms(e, t?.in).getFullYear();
}
function Pc(e, t) {
  return +ms(e) > +ms(t);
}
function Fc(e, t) {
  return +ms(e) < +ms(t);
}
function Ic(e, t, n) {
  let [r, i] = Cs(n?.in, e, t);
  return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
function Lc(e, t, n) {
  let [r, i] = Cs(n?.in, e, t);
  return r.getFullYear() === i.getFullYear();
}
function Rc(e, t, n) {
  let r = ms(e, n?.in),
    i = r.getFullYear(),
    a = r.getDate(),
    o = ps(n?.in || e, 0);
  (o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0));
  let s = jc(o);
  return (r.setMonth(t, Math.min(a, s)), r);
}
function zc(e, t, n) {
  let r = ms(e, n?.in);
  return isNaN(+r) ? ps(n?.in || e, NaN) : (r.setFullYear(t), r);
}
var Bc = 5,
  Vc = 4;
function Hc(e, t) {
  let n = t.startOfMonth(e),
    r = n.getDay() > 0 ? n.getDay() : 7,
    i = t.addDays(e, -r + 1),
    a = t.addDays(i, Bc * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Bc : Vc;
}
function Uc(e, t) {
  let n = t.startOfMonth(e),
    r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Wc(e, t) {
  let n = Uc(e, t),
    r = Hc(e, t);
  return t.addDays(n, r * 7 - 1);
}
var Gc = {
  lessThanXSeconds: { one: `menos de un segundo`, other: `menos de {{count}} segundos` },
  xSeconds: { one: `1 segundo`, other: `{{count}} segundos` },
  halfAMinute: `medio minuto`,
  lessThanXMinutes: { one: `menos de un minuto`, other: `menos de {{count}} minutos` },
  xMinutes: { one: `1 minuto`, other: `{{count}} minutos` },
  aboutXHours: { one: `alrededor de 1 hora`, other: `alrededor de {{count}} horas` },
  xHours: { one: `1 hora`, other: `{{count}} horas` },
  xDays: { one: `1 día`, other: `{{count}} días` },
  aboutXWeeks: { one: `alrededor de 1 semana`, other: `alrededor de {{count}} semanas` },
  xWeeks: { one: `1 semana`, other: `{{count}} semanas` },
  aboutXMonths: { one: `alrededor de 1 mes`, other: `alrededor de {{count}} meses` },
  xMonths: { one: `1 mes`, other: `{{count}} meses` },
  aboutXYears: { one: `alrededor de 1 año`, other: `alrededor de {{count}} años` },
  xYears: { one: `1 año`, other: `{{count}} años` },
  overXYears: { one: `más de 1 año`, other: `más de {{count}} años` },
  almostXYears: { one: `casi 1 año`, other: `casi {{count}} años` },
};
const Kc = (e, t, n) => {
    let r,
      i = Gc[e];
    return (
      (r = typeof i == `string` ? i : t === 1 ? i.one : i.other.replace(`{{count}}`, t.toString())),
      n?.addSuffix ? (n.comparison && n.comparison > 0 ? `en ` + r : `hace ` + r) : r
    );
  },
  qc = {
    date: Ks({
      formats: {
        full: `EEEE, d 'de' MMMM 'de' y`,
        long: `d 'de' MMMM 'de' y`,
        medium: `d MMM y`,
        short: `dd/MM/y`,
      },
      defaultWidth: `full`,
    }),
    time: Ks({
      formats: { full: `HH:mm:ss zzzz`, long: `HH:mm:ss z`, medium: `HH:mm:ss`, short: `HH:mm` },
      defaultWidth: `full`,
    }),
    dateTime: Ks({
      formats: {
        full: `{{date}} 'a las' {{time}}`,
        long: `{{date}} 'a las' {{time}}`,
        medium: `{{date}}, {{time}}`,
        short: `{{date}}, {{time}}`,
      },
      defaultWidth: `full`,
    }),
  };
var Jc = {
    lastWeek: `'el' eeee 'pasado a la' p`,
    yesterday: `'ayer a la' p`,
    today: `'hoy a la' p`,
    tomorrow: `'mañana a la' p`,
    nextWeek: `eeee 'a la' p`,
    other: `P`,
  },
  Yc = {
    lastWeek: `'el' eeee 'pasado a las' p`,
    yesterday: `'ayer a las' p`,
    today: `'hoy a las' p`,
    tomorrow: `'mañana a las' p`,
    nextWeek: `eeee 'a las' p`,
    other: `P`,
  };
const Xc = {
    code: `es`,
    formatDistance: Kc,
    formatLong: qc,
    formatRelative: (e, t, n, r) => (t.getHours() === 1 ? Jc[e] : Yc[e]),
    localize: {
      ordinalNumber: (e, t) => Number(e) + `º`,
      era: Xs({
        values: {
          narrow: [`AC`, `DC`],
          abbreviated: [`AC`, `DC`],
          wide: [`antes de cristo`, `después de cristo`],
        },
        defaultWidth: `wide`,
      }),
      quarter: Xs({
        values: {
          narrow: [`1`, `2`, `3`, `4`],
          abbreviated: [`T1`, `T2`, `T3`, `T4`],
          wide: [`1º trimestre`, `2º trimestre`, `3º trimestre`, `4º trimestre`],
        },
        defaultWidth: `wide`,
        argumentCallback: (e) => Number(e) - 1,
      }),
      month: Xs({
        values: {
          narrow: [`e`, `f`, `m`, `a`, `m`, `j`, `j`, `a`, `s`, `o`, `n`, `d`],
          abbreviated: [
            `ene`,
            `feb`,
            `mar`,
            `abr`,
            `may`,
            `jun`,
            `jul`,
            `ago`,
            `sep`,
            `oct`,
            `nov`,
            `dic`,
          ],
          wide: [
            `enero`,
            `febrero`,
            `marzo`,
            `abril`,
            `mayo`,
            `junio`,
            `julio`,
            `agosto`,
            `septiembre`,
            `octubre`,
            `noviembre`,
            `diciembre`,
          ],
        },
        defaultWidth: `wide`,
      }),
      day: Xs({
        values: {
          narrow: [`d`, `l`, `m`, `m`, `j`, `v`, `s`],
          short: [`do`, `lu`, `ma`, `mi`, `ju`, `vi`, `sá`],
          abbreviated: [`dom`, `lun`, `mar`, `mié`, `jue`, `vie`, `sáb`],
          wide: [`domingo`, `lunes`, `martes`, `miércoles`, `jueves`, `viernes`, `sábado`],
        },
        defaultWidth: `wide`,
      }),
      dayPeriod: Xs({
        values: {
          narrow: {
            am: `a`,
            pm: `p`,
            midnight: `mn`,
            noon: `md`,
            morning: `mañana`,
            afternoon: `tarde`,
            evening: `tarde`,
            night: `noche`,
          },
          abbreviated: {
            am: `AM`,
            pm: `PM`,
            midnight: `medianoche`,
            noon: `mediodia`,
            morning: `mañana`,
            afternoon: `tarde`,
            evening: `tarde`,
            night: `noche`,
          },
          wide: {
            am: `a.m.`,
            pm: `p.m.`,
            midnight: `medianoche`,
            noon: `mediodia`,
            morning: `mañana`,
            afternoon: `tarde`,
            evening: `tarde`,
            night: `noche`,
          },
        },
        defaultWidth: `wide`,
        formattingValues: {
          narrow: {
            am: `a`,
            pm: `p`,
            midnight: `mn`,
            noon: `md`,
            morning: `de la mañana`,
            afternoon: `de la tarde`,
            evening: `de la tarde`,
            night: `de la noche`,
          },
          abbreviated: {
            am: `AM`,
            pm: `PM`,
            midnight: `medianoche`,
            noon: `mediodia`,
            morning: `de la mañana`,
            afternoon: `de la tarde`,
            evening: `de la tarde`,
            night: `de la noche`,
          },
          wide: {
            am: `a.m.`,
            pm: `p.m.`,
            midnight: `medianoche`,
            noon: `mediodia`,
            morning: `de la mañana`,
            afternoon: `de la tarde`,
            evening: `de la tarde`,
            night: `de la noche`,
          },
        },
        defaultFormattingWidth: `wide`,
      }),
    },
    match: {
      ordinalNumber: tc({
        matchPattern: /^(\d+)(º)?/i,
        parsePattern: /\d+/i,
        valueCallback: function (e) {
          return parseInt(e, 10);
        },
      }),
      era: Qs({
        matchPatterns: {
          narrow: /^(ac|dc|a|d)/i,
          abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
          wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i,
        },
        defaultMatchWidth: `wide`,
        parsePatterns: {
          any: [/^ac/i, /^dc/i],
          wide: [
            /^(antes de cristo|antes de la era com[uú]n)/i,
            /^(despu[eé]s de cristo|era com[uú]n)/i,
          ],
        },
        defaultParseWidth: `any`,
      }),
      quarter: Qs({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^T[1234]/i,
          wide: /^[1234](º)? trimestre/i,
        },
        defaultMatchWidth: `wide`,
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: `any`,
        valueCallback: (e) => e + 1,
      }),
      month: Qs({
        matchPatterns: {
          narrow: /^[efmajsond]/i,
          abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
          wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        },
        defaultMatchWidth: `wide`,
        parsePatterns: {
          narrow: [
            /^e/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^en/i,
            /^feb/i,
            /^mar/i,
            /^abr/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^ago/i,
            /^sep/i,
            /^oct/i,
            /^nov/i,
            /^dic/i,
          ],
        },
        defaultParseWidth: `any`,
      }),
      day: Qs({
        matchPatterns: {
          narrow: /^[dlmjvs]/i,
          short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
          abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
          wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i,
        },
        defaultMatchWidth: `wide`,
        parsePatterns: {
          narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
          any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i],
        },
        defaultParseWidth: `any`,
      }),
      dayPeriod: Qs({
        matchPatterns: {
          narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
          any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i,
        },
        defaultMatchWidth: `any`,
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mn/i,
            noon: /^md/i,
            morning: /mañana/i,
            afternoon: /tarde/i,
            evening: /tarde/i,
            night: /noche/i,
          },
        },
        defaultParseWidth: `any`,
      }),
    },
    options: { weekStartsOn: 1, firstWeekContainsDate: 1 },
  },
  Zc = {
    ...nc,
    labels: {
      labelDayButton: (e, t, n, r) => {
        let i;
        i =
          r && typeof r.format == `function`
            ? r.format.bind(r)
            : (e, t) => kc(e, t, { locale: nc, ...n });
        let a = i(e, `PPPP`);
        return (t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a);
      },
      labelMonthDropdown: `Choose the Month`,
      labelNext: `Go to the Next Month`,
      labelPrevious: `Go to the Previous Month`,
      labelWeekNumber: (e) => `Week ${e}`,
      labelYearDropdown: `Choose the Year`,
      labelGrid: (e, t, n) => {
        let r;
        return (
          (r =
            n && typeof n.format == `function`
              ? n.format.bind(n)
              : (e, n) => kc(e, n, { locale: nc, ...t })),
          r(e, `LLLL yyyy`)
        );
      },
      labelGridcell: (e, t, n, r) => {
        let i;
        i =
          r && typeof r.format == `function`
            ? r.format.bind(r)
            : (e, t) => kc(e, t, { locale: nc, ...n });
        let a = i(e, `PPPP`);
        return (t?.today && (a = `Today, ${a}`), a);
      },
      labelNav: `Navigation bar`,
      labelWeekNumberHeader: `Week Number`,
      labelWeekday: (e, t, n) => {
        let r;
        return (
          (r =
            n && typeof n.format == `function`
              ? n.format.bind(n)
              : (e, n) => kc(e, n, { locale: nc, ...t })),
          r(e, `cccc`)
        );
      },
    },
  };
var Qc = class e {
  constructor(e, t) {
    ((this.Date = Date),
      (this.today = () =>
        this.overrides?.today
          ? this.overrides.today()
          : this.options.timeZone
            ? ls.tz(this.options.timeZone)
            : new this.Date()),
      (this.newDate = (e, t, n) =>
        this.overrides?.newDate
          ? this.overrides.newDate(e, t, n)
          : this.options.timeZone
            ? new ls(e, t, n, this.options.timeZone)
            : new Date(e, t, n)),
      (this.addDays = (e, t) =>
        this.overrides?.addDays ? this.overrides.addDays(e, t) : hs(e, t)),
      (this.addMonths = (e, t) =>
        this.overrides?.addMonths ? this.overrides.addMonths(e, t) : gs(e, t)),
      (this.addWeeks = (e, t) =>
        this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : Ds(e, t)),
      (this.addYears = (e, t) =>
        this.overrides?.addYears ? this.overrides.addYears(e, t) : Os(e, t)),
      (this.differenceInCalendarDays = (e, t) =>
        this.overrides?.differenceInCalendarDays
          ? this.overrides.differenceInCalendarDays(e, t)
          : Ts(e, t)),
      (this.differenceInCalendarMonths = (e, t) =>
        this.overrides?.differenceInCalendarMonths
          ? this.overrides.differenceInCalendarMonths(e, t)
          : Ps(e, t)),
      (this.eachMonthOfInterval = (e) =>
        this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Ls(e)),
      (this.eachYearOfInterval = (e) => {
        let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : Vs(e),
          n = new Set(t.map((e) => this.getYear(e)));
        if (n.size === t.length) return t;
        let r = [];
        return (
          n.forEach((e) => {
            r.push(new Date(e, 0, 1));
          }),
          r
        );
      }),
      (this.endOfBroadcastWeek = (e) =>
        this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : Wc(e, this)),
      (this.endOfISOWeek = (e) =>
        this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : Us(e)),
      (this.endOfMonth = (e) =>
        this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Fs(e)),
      (this.endOfWeek = (e, t) =>
        this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : Hs(e, this.options)),
      (this.endOfYear = (e) => (this.overrides?.endOfYear ? this.overrides.endOfYear(e) : zs(e))),
      (this.format = (e, t, n) => {
        let r = this.overrides?.format
          ? this.overrides.format(e, t, this.options)
          : kc(e, t, this.options);
        return this.options.numerals && this.options.numerals !== `latn`
          ? this.replaceDigits(r)
          : r;
      }),
      (this.getISOWeek = (e) =>
        this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : ic(e)),
      (this.getMonth = (e, t) =>
        this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Mc(e, this.options)),
      (this.getYear = (e, t) =>
        this.overrides?.getYear ? this.overrides.getYear(e, this.options) : Nc(e, this.options)),
      (this.getWeek = (e, t) =>
        this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : sc(e, this.options)),
      (this.isAfter = (e, t) =>
        this.overrides?.isAfter ? this.overrides.isAfter(e, t) : Pc(e, t)),
      (this.isBefore = (e, t) =>
        this.overrides?.isBefore ? this.overrides.isBefore(e, t) : Fc(e, t)),
      (this.isDate = (e) => (this.overrides?.isDate ? this.overrides.isDate(e) : Ms(e))),
      (this.isSameDay = (e, t) =>
        this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : js(e, t)),
      (this.isSameMonth = (e, t) =>
        this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : Ic(e, t)),
      (this.isSameYear = (e, t) =>
        this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : Lc(e, t)),
      (this.max = (e) => (this.overrides?.max ? this.overrides.max(e) : ks(e))),
      (this.min = (e) => (this.overrides?.min ? this.overrides.min(e) : As(e))),
      (this.setMonth = (e, t) =>
        this.overrides?.setMonth ? this.overrides.setMonth(e, t) : Rc(e, t)),
      (this.setYear = (e, t) =>
        this.overrides?.setYear ? this.overrides.setYear(e, t) : zc(e, t)),
      (this.startOfBroadcastWeek = (e, t) =>
        this.overrides?.startOfBroadcastWeek
          ? this.overrides.startOfBroadcastWeek(e, this)
          : Uc(e, this)),
      (this.startOfDay = (e) =>
        this.overrides?.startOfDay ? this.overrides.startOfDay(e) : ws(e)),
      (this.startOfISOWeek = (e) =>
        this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : bs(e)),
      (this.startOfMonth = (e) =>
        this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : Rs(e)),
      (this.startOfWeek = (e, t) =>
        this.overrides?.startOfWeek
          ? this.overrides.startOfWeek(e, this.options)
          : ys(e, this.options)),
      (this.startOfYear = (e) =>
        this.overrides?.startOfYear ? this.overrides.startOfYear(e) : Bs(e)),
      (this.options = { locale: Zc, ...e }),
      (this.overrides = t));
  }
  getDigitMap() {
    let { numerals: e = `latn` } = this.options,
      t = new Intl.NumberFormat(`en-US`, { numberingSystem: e }),
      n = {};
    for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
    return n;
  }
  replaceDigits(e) {
    let t = this.getDigitMap();
    return e.replace(/\d/g, (e) => t[e] || e);
  }
  formatNumber(e) {
    return this.replaceDigits(e.toString());
  }
  getMonthYearOrder() {
    let t = this.options.locale?.code;
    return t && e.yearFirstLocales.has(t) ? `year-first` : `month-first`;
  }
  formatMonthYear(t) {
    let { locale: n, timeZone: r, numerals: i } = this.options,
      a = n?.code;
    if (a && e.yearFirstLocales.has(a))
      try {
        return new Intl.DateTimeFormat(a, {
          month: `long`,
          year: `numeric`,
          timeZone: r,
          numberingSystem: i,
        }).format(t);
      } catch {}
    let o = this.getMonthYearOrder() === `year-first` ? `y LLLL` : `LLLL y`;
    return this.format(t, o);
  }
};
Qc.yearFirstLocales = new Set([
  `eu`,
  `hu`,
  `ja`,
  `ja-Hira`,
  `ja-JP`,
  `ko`,
  `ko-KR`,
  `lt`,
  `lt-LT`,
  `lv`,
  `lv-LV`,
  `mn`,
  `mn-MN`,
  `zh`,
  `zh-CN`,
  `zh-HK`,
  `zh-TW`,
]);
const $c = new Qc();
var el = class {
    constructor(e, t, n = $c) {
      ((this.date = e),
        (this.displayMonth = t),
        (this.outside = !!(t && !n.isSameMonth(e, t))),
        (this.dateLib = n),
        (this.isoDate = n.format(e, `yyyy-MM-dd`)),
        (this.displayMonthId = n.format(t, `yyyy-MM`)),
        (this.dateMonthId = n.format(e, `yyyy-MM`)));
    }
    isEqualTo(e) {
      return (
        this.dateLib.isSameDay(e.date, this.date) &&
        this.dateLib.isSameMonth(e.displayMonth, this.displayMonth)
      );
    }
  },
  tl = class {
    constructor(e, t) {
      ((this.date = e), (this.weeks = t));
    }
  },
  nl = class {
    constructor(e, t) {
      ((this.days = t), (this.weekNumber = e));
    }
  };
function rl(e) {
  return _.createElement(`button`, { ...e });
}
function il(e) {
  return _.createElement(`span`, { ...e });
}
function al(e) {
  let { size: t = 24, orientation: n = `left`, className: r } = e;
  return _.createElement(
    `svg`,
    { className: r, width: t, height: t, viewBox: `0 0 24 24` },
    n === `up` &&
      _.createElement(`polygon`, { points: `6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28` }),
    n === `down` &&
      _.createElement(`polygon`, { points: `6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72` }),
    n === `left` &&
      _.createElement(`polygon`, {
        points: `16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20`,
      }),
    n === `right` &&
      _.createElement(`polygon`, {
        points: `8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20`,
      })
  );
}
function ol(e) {
  let { day: t, modifiers: n, ...r } = e;
  return _.createElement(`td`, { ...r });
}
function sl(e) {
  let { day: t, modifiers: n, ...r } = e,
    i = _.useRef(null);
  return (
    _.useEffect(() => {
      n.focused && i.current?.focus();
    }, [n.focused]),
    _.createElement(`button`, { ref: i, ...r })
  );
}
var K;
(function (e) {
  ((e.Root = `root`),
    (e.Chevron = `chevron`),
    (e.Day = `day`),
    (e.DayButton = `day_button`),
    (e.CaptionLabel = `caption_label`),
    (e.Dropdowns = `dropdowns`),
    (e.Dropdown = `dropdown`),
    (e.DropdownRoot = `dropdown_root`),
    (e.Footer = `footer`),
    (e.MonthGrid = `month_grid`),
    (e.MonthCaption = `month_caption`),
    (e.MonthsDropdown = `months_dropdown`),
    (e.Month = `month`),
    (e.Months = `months`),
    (e.Nav = `nav`),
    (e.NextMonthButton = `button_next`),
    (e.PreviousMonthButton = `button_previous`),
    (e.Week = `week`),
    (e.Weeks = `weeks`),
    (e.Weekday = `weekday`),
    (e.Weekdays = `weekdays`),
    (e.WeekNumber = `week_number`),
    (e.WeekNumberHeader = `week_number_header`),
    (e.YearsDropdown = `years_dropdown`));
})((K ||= {}));
var q;
(function (e) {
  ((e.disabled = `disabled`),
    (e.hidden = `hidden`),
    (e.outside = `outside`),
    (e.focused = `focused`),
    (e.today = `today`));
})((q ||= {}));
var cl;
(function (e) {
  ((e.range_end = `range_end`),
    (e.range_middle = `range_middle`),
    (e.range_start = `range_start`),
    (e.selected = `selected`));
})((cl ||= {}));
var ll;
(function (e) {
  ((e.weeks_before_enter = `weeks_before_enter`),
    (e.weeks_before_exit = `weeks_before_exit`),
    (e.weeks_after_enter = `weeks_after_enter`),
    (e.weeks_after_exit = `weeks_after_exit`),
    (e.caption_after_enter = `caption_after_enter`),
    (e.caption_after_exit = `caption_after_exit`),
    (e.caption_before_enter = `caption_before_enter`),
    (e.caption_before_exit = `caption_before_exit`));
})((ll ||= {}));
function ul(e) {
  let { options: t, className: n, components: r, classNames: i, ...a } = e,
    o = [i[K.Dropdown], n].join(` `),
    s = t?.find(({ value: e }) => e === a.value);
  return _.createElement(
    `span`,
    { "data-disabled": a.disabled, className: i[K.DropdownRoot] },
    _.createElement(
      r.Select,
      { className: o, ...a },
      t?.map(({ value: e, label: t, disabled: n }) =>
        _.createElement(r.Option, { key: e, value: e, disabled: n }, t)
      )
    ),
    _.createElement(
      `span`,
      { className: i[K.CaptionLabel], "aria-hidden": !0 },
      s?.label,
      _.createElement(r.Chevron, { orientation: `down`, size: 18, className: i[K.Chevron] })
    )
  );
}
function dl(e) {
  return _.createElement(`div`, { ...e });
}
function fl(e) {
  return _.createElement(`div`, { ...e });
}
function pl(e) {
  let { calendarMonth: t, displayIndex: n, ...r } = e;
  return _.createElement(`div`, { ...r }, e.children);
}
function ml(e) {
  let { calendarMonth: t, displayIndex: n, ...r } = e;
  return _.createElement(`div`, { ...r });
}
function hl(e) {
  return _.createElement(`table`, { ...e });
}
function gl(e) {
  return _.createElement(`div`, { ...e });
}
const _l = (0, _.createContext)(void 0);
function vl() {
  let e = (0, _.useContext)(_l);
  if (e === void 0) throw Error(`useDayPicker() must be used within a custom component.`);
  return e;
}
function yl(e) {
  let { components: t } = vl();
  return _.createElement(t.Dropdown, { ...e });
}
function bl(e) {
  let { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: i, ...a } = e,
    {
      components: o,
      classNames: s,
      labels: { labelPrevious: c, labelNext: l },
    } = vl(),
    u = (0, _.useCallback)(
      (e) => {
        i && n?.(e);
      },
      [i, n]
    ),
    d = (0, _.useCallback)(
      (e) => {
        r && t?.(e);
      },
      [r, t]
    );
  return _.createElement(
    `nav`,
    { ...a },
    _.createElement(
      o.PreviousMonthButton,
      {
        type: `button`,
        className: s[K.PreviousMonthButton],
        tabIndex: r ? void 0 : -1,
        "aria-disabled": r ? void 0 : !0,
        "aria-label": c(r),
        onClick: d,
      },
      _.createElement(o.Chevron, {
        disabled: r ? void 0 : !0,
        className: s[K.Chevron],
        orientation: `left`,
      })
    ),
    _.createElement(
      o.NextMonthButton,
      {
        type: `button`,
        className: s[K.NextMonthButton],
        tabIndex: i ? void 0 : -1,
        "aria-disabled": i ? void 0 : !0,
        "aria-label": l(i),
        onClick: u,
      },
      _.createElement(o.Chevron, {
        disabled: i ? void 0 : !0,
        orientation: `right`,
        className: s[K.Chevron],
      })
    )
  );
}
function xl(e) {
  let { components: t } = vl();
  return _.createElement(t.Button, { ...e });
}
function Sl(e) {
  return _.createElement(`option`, { ...e });
}
function Cl(e) {
  let { components: t } = vl();
  return _.createElement(t.Button, { ...e });
}
function wl(e) {
  let { rootRef: t, ...n } = e;
  return _.createElement(`div`, { ...n, ref: t });
}
function Tl(e) {
  return _.createElement(`select`, { ...e });
}
function El(e) {
  let { week: t, ...n } = e;
  return _.createElement(`tr`, { ...n });
}
function Dl(e) {
  return _.createElement(`th`, { ...e });
}
function Ol(e) {
  return _.createElement(`thead`, { "aria-hidden": !0 }, _.createElement(`tr`, { ...e }));
}
function kl(e) {
  let { week: t, ...n } = e;
  return _.createElement(`th`, { ...n });
}
function Al(e) {
  return _.createElement(`th`, { ...e });
}
function jl(e) {
  return _.createElement(`tbody`, { ...e });
}
function Ml(e) {
  let { components: t } = vl();
  return _.createElement(t.Dropdown, { ...e });
}
var Nl = e({
  Button: () => rl,
  CaptionLabel: () => il,
  Chevron: () => al,
  Day: () => ol,
  DayButton: () => sl,
  Dropdown: () => ul,
  DropdownNav: () => dl,
  Footer: () => fl,
  Month: () => pl,
  MonthCaption: () => ml,
  MonthGrid: () => hl,
  Months: () => gl,
  MonthsDropdown: () => yl,
  Nav: () => bl,
  NextMonthButton: () => xl,
  Option: () => Sl,
  PreviousMonthButton: () => Cl,
  Root: () => wl,
  Select: () => Tl,
  Week: () => El,
  WeekNumber: () => kl,
  WeekNumberHeader: () => Al,
  Weekday: () => Dl,
  Weekdays: () => Ol,
  Weeks: () => jl,
  YearsDropdown: () => Ml,
});
function Pl(e, t, n = !1, r = $c) {
  let { from: i, to: a } = e,
    { differenceInCalendarDays: o, isSameDay: s } = r;
  return i && a
    ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0))
    : !n && a
      ? s(a, t)
      : !n && i
        ? s(i, t)
        : !1;
}
function Fl(e) {
  return !!(e && typeof e == `object` && `before` in e && `after` in e);
}
function Il(e) {
  return !!(e && typeof e == `object` && `from` in e);
}
function J(e) {
  return !!(e && typeof e == `object` && `after` in e);
}
function Ll(e) {
  return !!(e && typeof e == `object` && `before` in e);
}
function Y(e) {
  return !!(e && typeof e == `object` && `dayOfWeek` in e);
}
function X(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Z(e, t, n = $c) {
  let r = Array.isArray(t) ? t : [t],
    { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
  return r.some((t) => {
    if (typeof t == `boolean`) return t;
    if (n.isDate(t)) return i(e, t);
    if (X(t, n)) return t.some((t) => i(e, t));
    if (Il(t)) return Pl(t, e, !1, n);
    if (Y(t))
      return Array.isArray(t.dayOfWeek)
        ? t.dayOfWeek.includes(e.getDay())
        : t.dayOfWeek === e.getDay();
    if (Fl(t)) {
      let n = a(t.before, e),
        r = a(t.after, e),
        i = n > 0,
        s = r < 0;
      return o(t.before, t.after) ? s && i : i || s;
    }
    return J(t)
      ? a(e, t.after) > 0
      : Ll(t)
        ? a(t.before, e) > 0
        : typeof t == `function`
          ? t(e)
          : !1;
  });
}
function Rl(e, t, n, r, i) {
  let {
      disabled: a,
      hidden: o,
      modifiers: s,
      showOutsideDays: c,
      broadcastCalendar: l,
      today: u = i.today(),
    } = t,
    { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i,
    _ = n && p(n),
    v = r && h(r),
    y = { [q.focused]: [], [q.outside]: [], [q.disabled]: [], [q.hidden]: [], [q.today]: [] },
    b = {};
  for (let t of e) {
    let { date: e, displayMonth: n } = t,
      r = !!(n && !f(e, n)),
      p = !!(_ && m(e, _)),
      h = !!(v && g(e, v)),
      x = !!(a && Z(e, a, i)),
      S = !!(o && Z(e, o, i)) || p || h || (!l && !c && r) || (l && c === !1 && r),
      C = d(e, u);
    (r && y.outside.push(t),
      x && y.disabled.push(t),
      S && y.hidden.push(t),
      C && y.today.push(t),
      s &&
        Object.keys(s).forEach((n) => {
          let r = s?.[n];
          r && Z(e, r, i) && (b[n] ? b[n].push(t) : (b[n] = [t]));
        }));
  }
  return (e) => {
    let t = { [q.focused]: !1, [q.disabled]: !1, [q.hidden]: !1, [q.outside]: !1, [q.today]: !1 },
      n = {};
    for (let n in y) t[n] = y[n].some((t) => t === e);
    for (let t in b) n[t] = b[t].some((t) => t === e);
    return { ...t, ...n };
  };
}
function zl(e, t, n = {}) {
  return Object.entries(e)
    .filter(([, e]) => e === !0)
    .reduce(
      (e, [r]) => (
        n[r] ? e.push(n[r]) : t[q[r]] ? e.push(t[q[r]]) : t[cl[r]] && e.push(t[cl[r]]),
        e
      ),
      [t[K.Day]]
    );
}
function Bl(e) {
  return { ...Nl, ...e };
}
function Vl(e) {
  let t = {
    "data-mode": e.mode ?? void 0,
    "data-required": `required` in e ? e.required : void 0,
    "data-multiple-months": (e.numberOfMonths && e.numberOfMonths > 1) || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0,
  };
  return (
    Object.entries(e).forEach(([e, n]) => {
      e.startsWith(`data-`) && (t[e] = n);
    }),
    t
  );
}
function Hl() {
  let e = {};
  for (let t in K) e[K[t]] = `rdp-${K[t]}`;
  for (let t in q) e[q[t]] = `rdp-${q[t]}`;
  for (let t in cl) e[cl[t]] = `rdp-${cl[t]}`;
  for (let t in ll) e[ll[t]] = `rdp-${ll[t]}`;
  return e;
}
function Ul(e, t, n) {
  return (n ?? new Qc(t)).formatMonthYear(e);
}
const Wl = Ul;
function Gl(e, t, n) {
  return (n ?? new Qc(t)).format(e, `d`);
}
function Kl(e, t = $c) {
  return t.format(e, `LLLL`);
}
function ql(e, t, n) {
  return (n ?? new Qc(t)).format(e, `cccccc`);
}
function Jl(e, t = $c) {
  return e < 10
    ? t.formatNumber(`0${e.toLocaleString()}`)
    : t.formatNumber(`${e.toLocaleString()}`);
}
function Yl() {
  return ``;
}
function Xl(e, t = $c) {
  return t.format(e, `yyyy`);
}
const Zl = Xl;
var Ql = e({
  formatCaption: () => Ul,
  formatDay: () => Gl,
  formatMonthCaption: () => Wl,
  formatMonthDropdown: () => Kl,
  formatWeekNumber: () => Jl,
  formatWeekNumberHeader: () => Yl,
  formatWeekdayName: () => ql,
  formatYearCaption: () => Zl,
  formatYearDropdown: () => Xl,
});
function $l(e) {
  return (
    e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption),
    e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption),
    { ...Ql, ...e }
  );
}
function eu(e, t, n, r) {
  let i = (r ?? new Qc(n)).format(e, `PPPP`);
  return (t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i);
}
const tu = eu;
function nu(e, t, n) {
  return (n ?? new Qc(t)).formatMonthYear(e);
}
const ru = nu;
function iu(e, t, n, r) {
  let i = (r ?? new Qc(n)).format(e, `PPPP`);
  return (t?.today && (i = `Today, ${i}`), i);
}
function au(e) {
  return `Choose the Month`;
}
function ou() {
  return ``;
}
var su = `Go to the Next Month`;
function cu(e, t) {
  return su;
}
function lu(e) {
  return `Go to the Previous Month`;
}
function uu(e, t, n) {
  return (n ?? new Qc(t)).format(e, `cccc`);
}
function du(e, t) {
  return `Week ${e}`;
}
function fu(e) {
  return `Week Number`;
}
function pu(e) {
  return `Choose the Year`;
}
var mu = e({
    labelCaption: () => ru,
    labelDay: () => tu,
    labelDayButton: () => eu,
    labelGrid: () => nu,
    labelGridcell: () => iu,
    labelMonthDropdown: () => au,
    labelNav: () => ou,
    labelNext: () => cu,
    labelPrevious: () => lu,
    labelWeekNumber: () => du,
    labelWeekNumberHeader: () => fu,
    labelWeekday: () => uu,
    labelYearDropdown: () => pu,
  }),
  hu = (e, t, n) => t || (n ? (typeof n == `function` ? n : (...e) => n) : e);
function gu(e, t) {
  let n = t.locale?.labels ?? {};
  return {
    ...mu,
    ...(e ?? {}),
    labelDayButton: hu(eu, e?.labelDayButton, n.labelDayButton),
    labelMonthDropdown: hu(au, e?.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: hu(cu, e?.labelNext, n.labelNext),
    labelPrevious: hu(lu, e?.labelPrevious, n.labelPrevious),
    labelWeekNumber: hu(du, e?.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: hu(pu, e?.labelYearDropdown, n.labelYearDropdown),
    labelGrid: hu(nu, e?.labelGrid, n.labelGrid),
    labelGridcell: hu(iu, e?.labelGridcell, n.labelGridcell),
    labelNav: hu(ou, e?.labelNav, n.labelNav),
    labelWeekNumberHeader: hu(fu, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: hu(uu, e?.labelWeekday, n.labelWeekday),
  };
}
function _u(e, t, n, r, i) {
  let { startOfMonth: a, startOfYear: o, endOfYear: s, eachMonthOfInterval: c, getMonth: l } = i;
  return c({ start: o(e), end: s(e) }).map((e) => {
    let o = r.formatMonthDropdown(e, i);
    return { value: l(e), label: o, disabled: (t && e < a(t)) || (n && e > a(n)) || !1 };
  });
}
function vu(e, t = {}, n = {}) {
  let r = { ...t?.[K.Day] };
  return (
    Object.entries(e)
      .filter(([, e]) => e === !0)
      .forEach(([e]) => {
        r = { ...r, ...n?.[e] };
      }),
    r
  );
}
function yu(e, t, n, r) {
  let i = r ?? e.today(),
    a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i),
    o = [];
  for (let t = 0; t < 7; t++) {
    let n = e.addDays(a, t);
    o.push(n);
  }
  return o;
}
function bu(e, t, n, r, i = !1) {
  if (!e || !t) return;
  let { startOfYear: a, endOfYear: o, eachYearOfInterval: s, getYear: c } = r,
    l = s({ start: a(e), end: o(t) });
  return (
    i && l.reverse(),
    l.map((e) => {
      let t = n.formatYearDropdown(e, r);
      return { value: c(e), label: t, disabled: !1 };
    })
  );
}
function xu(e, t = {}) {
  let { weekStartsOn: n, locale: r } = t,
    i = n ?? r?.options?.weekStartsOn ?? 0,
    a = (t) => {
      let n = typeof t == `number` || typeof t == `string` ? new Date(t) : t;
      return new ls(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
    },
    o = (e) => {
      let t = a(e);
      return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
    };
  return {
    today: () => a(ls.tz(e)),
    newDate: (t, n, r) => new ls(t, n, r, 12, 0, 0, e),
    startOfDay: (e) => a(e),
    startOfWeek: (e, t) => {
      let n = a(e),
        r = t?.weekStartsOn ?? i,
        o = (n.getDay() - r + 7) % 7;
      return (n.setDate(n.getDate() - o), n);
    },
    startOfISOWeek: (e) => {
      let t = a(e),
        n = (t.getDay() - 1 + 7) % 7;
      return (t.setDate(t.getDate() - n), t);
    },
    startOfMonth: (e) => {
      let t = a(e);
      return (t.setDate(1), t);
    },
    startOfYear: (e) => {
      let t = a(e);
      return (t.setMonth(0, 1), t);
    },
    endOfWeek: (e, t) => {
      let n = a(e),
        r = ((((t?.weekStartsOn ?? i) + 6) % 7) - n.getDay() + 7) % 7;
      return (n.setDate(n.getDate() + r), n);
    },
    endOfISOWeek: (e) => {
      let t = a(e),
        n = (7 - t.getDay()) % 7;
      return (t.setDate(t.getDate() + n), t);
    },
    endOfMonth: (e) => {
      let t = a(e);
      return (t.setMonth(t.getMonth() + 1, 0), t);
    },
    endOfYear: (e) => {
      let t = a(e);
      return (t.setMonth(11, 31), t);
    },
    eachMonthOfInterval: (t) => {
      let n = a(t.start),
        r = a(t.end),
        i = [],
        o = new ls(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e),
        s = r.getFullYear() * 12 + r.getMonth();
      for (; o.getFullYear() * 12 + o.getMonth() <= s; )
        (i.push(new ls(o, e)), o.setMonth(o.getMonth() + 1, 1));
      return i;
    },
    addDays: (e, t) => {
      let n = a(e);
      return (n.setDate(n.getDate() + t), n);
    },
    addWeeks: (e, t) => {
      let n = a(e);
      return (n.setDate(n.getDate() + t * 7), n);
    },
    addMonths: (e, t) => {
      let n = a(e);
      return (n.setMonth(n.getMonth() + t), n);
    },
    addYears: (e, t) => {
      let n = a(e);
      return (n.setFullYear(n.getFullYear() + t), n);
    },
    eachYearOfInterval: (t) => {
      let n = a(t.start),
        r = a(t.end),
        i = [],
        o = new ls(n.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; o.getFullYear() <= r.getFullYear(); )
        (i.push(new ls(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1));
      return i;
    },
    getWeek: (e, t) =>
      sc(o(e), {
        weekStartsOn: t?.weekStartsOn ?? i,
        firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1,
      }),
    getISOWeek: (e) => ic(o(e)),
    differenceInCalendarDays: (e, t) => Ts(o(e), o(t)),
    differenceInCalendarMonths: (e, t) => Ps(o(e), o(t)),
  };
}
var Su = (e) => (e instanceof HTMLElement ? e : null),
  Cu = (e) => [...(e.querySelectorAll(`[data-animated-month]`) ?? [])],
  wu = (e) => Su(e.querySelector(`[data-animated-month]`)),
  Tu = (e) => Su(e.querySelector(`[data-animated-caption]`)),
  Eu = (e) => Su(e.querySelector(`[data-animated-weeks]`)),
  Du = (e) => Su(e.querySelector(`[data-animated-nav]`)),
  Ou = (e) => Su(e.querySelector(`[data-animated-weekdays]`));
function ku(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
  let o = (0, _.useRef)(null),
    s = (0, _.useRef)(r),
    c = (0, _.useRef)(!1);
  (0, _.useLayoutEffect)(() => {
    let l = s.current;
    if (
      ((s.current = r),
      !t ||
        !e.current ||
        !(e.current instanceof HTMLElement) ||
        r.length === 0 ||
        l.length === 0 ||
        r.length !== l.length)
    )
      return;
    let u = a.isSameMonth(r[0].date, l[0].date),
      d = a.isAfter(r[0].date, l[0].date),
      f = d ? n[ll.caption_after_enter] : n[ll.caption_before_enter],
      p = d ? n[ll.weeks_after_enter] : n[ll.weeks_before_enter],
      m = o.current,
      h = e.current.cloneNode(!0);
    if (
      (h instanceof HTMLElement
        ? (Cu(h).forEach((e) => {
            if (!(e instanceof HTMLElement)) return;
            let t = wu(e);
            t && e.contains(t) && e.removeChild(t);
            let n = Tu(e);
            n && n.classList.remove(f);
            let r = Eu(e);
            r && r.classList.remove(p);
          }),
          (o.current = h))
        : (o.current = null),
      c.current || u || i)
    )
      return;
    let g = m instanceof HTMLElement ? Cu(m) : [],
      _ = Cu(e.current);
    if (
      _?.every((e) => e instanceof HTMLElement) &&
      g &&
      g.every((e) => e instanceof HTMLElement)
    ) {
      c.current = !0;
      let t = [];
      e.current.style.isolation = `isolate`;
      let r = Du(e.current);
      (r && (r.style.zIndex = `1`),
        _.forEach((i, a) => {
          let o = g[a];
          if (!o) return;
          ((i.style.position = `relative`), (i.style.overflow = `hidden`));
          let s = Tu(i);
          s && s.classList.add(f);
          let l = Eu(i);
          l && l.classList.add(p);
          let u = () => {
            ((c.current = !1),
              e.current && (e.current.style.isolation = ``),
              r && (r.style.zIndex = ``),
              s && s.classList.remove(f),
              l && l.classList.remove(p),
              (i.style.position = ``),
              (i.style.overflow = ``),
              i.contains(o) && i.removeChild(o));
          };
          (t.push(u),
            (o.style.pointerEvents = `none`),
            (o.style.position = `absolute`),
            (o.style.overflow = `hidden`),
            o.setAttribute(`aria-hidden`, `true`));
          let m = Ou(o);
          m && (m.style.opacity = `0`);
          let h = Tu(o);
          h &&
            (h.classList.add(d ? n[ll.caption_before_exit] : n[ll.caption_after_exit]),
            h.addEventListener(`animationend`, u));
          let _ = Eu(o);
          (_ && _.classList.add(d ? n[ll.weeks_before_exit] : n[ll.weeks_after_exit]),
            i.insertBefore(o, i.firstChild));
        }));
    }
  });
}
function Au(e, t, n, r) {
  let i = e[0],
    a = e[e.length - 1],
    { ISOWeek: o, fixedWeeks: s, broadcastCalendar: c } = n ?? {},
    {
      addDays: l,
      differenceInCalendarDays: u,
      differenceInCalendarMonths: d,
      endOfBroadcastWeek: f,
      endOfISOWeek: p,
      endOfMonth: m,
      endOfWeek: h,
      isAfter: g,
      startOfBroadcastWeek: _,
      startOfISOWeek: v,
      startOfWeek: y,
    } = r,
    b = c ? _(i, r) : o ? v(i) : y(i),
    x = c ? f(a) : o ? p(m(a)) : h(m(a)),
    S = t && (c ? f(t) : o ? p(t) : h(t)),
    C = u(S && g(x, S) ? S : x, b),
    w = d(a, i) + 1,
    T = [];
  for (let e = 0; e <= C; e++) {
    let t = l(b, e);
    T.push(t);
  }
  let E = (c ? 35 : 42) * w;
  if (s && T.length < E) {
    let e = E - T.length;
    for (let t = 0; t < e; t++) {
      let e = l(T[T.length - 1], 1);
      T.push(e);
    }
  }
  return T;
}
function ju(e) {
  let t = [];
  return e.reduce((e, n) => {
    let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
    return e.concat(r.slice());
  }, t.slice());
}
function Mu(e, t, n, r) {
  let { numberOfMonths: i = 1 } = n,
    a = [];
  for (let n = 0; n < i; n++) {
    let i = r.addMonths(e, n);
    if (t && i > t) break;
    a.push(i);
  }
  return a;
}
function Nu(e, t, n, r) {
  let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e,
    c = i || a || o,
    { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
  return (n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c));
}
function Pu(e, t, n, r) {
  let {
      addDays: i,
      endOfBroadcastWeek: a,
      endOfISOWeek: o,
      endOfMonth: s,
      endOfWeek: c,
      getISOWeek: l,
      getWeek: u,
      startOfBroadcastWeek: d,
      startOfISOWeek: f,
      startOfWeek: p,
    } = r,
    m = e.reduce((e, m) => {
      let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m),
        g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)),
        _ = t.filter((e) => e >= h && e <= g),
        v = n.broadcastCalendar ? 35 : 42;
      if (n.fixedWeeks && _.length < v) {
        let e = t.filter((e) => {
          let t = v - _.length;
          return e > g && e <= i(g, t);
        });
        _.push(...e);
      }
      let y = new tl(
        m,
        _.reduce((e, t) => {
          let i = n.ISOWeek ? l(t) : u(t),
            a = e.find((e) => e.weekNumber === i),
            o = new el(t, m, r);
          return (a ? a.days.push(o) : e.push(new nl(i, [o])), e);
        }, [])
      );
      return (e.push(y), e);
    }, []);
  return n.reverseMonths ? m.reverse() : m;
}
function Fu(e, t) {
  let { startMonth: n, endMonth: r } = e,
    {
      startOfYear: i,
      startOfDay: a,
      startOfMonth: o,
      endOfMonth: s,
      addYears: c,
      endOfYear: l,
      newDate: u,
      today: d,
    } = t,
    { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
  (!n && m && (n = m),
    !n && f && (n = t.newDate(f, 0, 1)),
    !r && h && (r = h),
    !r && p && (r = u(p, 11, 31)));
  let g = e.captionLayout === `dropdown` || e.captionLayout === `dropdown-years`;
  return (
    n ? (n = o(n)) : f ? (n = u(f, 0, 1)) : !n && g && (n = i(c(e.today ?? d(), -100))),
    r ? (r = s(r)) : p ? (r = u(p, 11, 31)) : !r && g && (r = l(e.today ?? d())),
    [n && a(n), r && a(r)]
  );
}
function Iu(e, t, n, r) {
  if (n.disableNavigation) return;
  let { pagedNavigation: i, numberOfMonths: a = 1 } = n,
    { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r,
    l = i ? a : 1,
    u = o(e);
  if (!t || !(c(t, e) < a)) return s(u, l);
}
function Lu(e, t, n, r) {
  if (n.disableNavigation) return;
  let { pagedNavigation: i, numberOfMonths: a } = n,
    { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r,
    l = i ? (a ?? 1) : 1,
    u = o(e);
  if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
function Ru(e) {
  return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
function zu(e, t) {
  let [n, r] = (0, _.useState)(e);
  return [t === void 0 ? n : t, r];
}
function Bu(e, t) {
  let [n, r] = Fu(e, t),
    { startOfMonth: i, endOfMonth: a } = t,
    o = Nu(e, n, r, t),
    [s, c] = zu(o, e.month ? o : void 0);
  (0, _.useEffect)(() => {
    c(Nu(e, n, r, t));
  }, [e.timeZone]);
  let {
      months: l,
      weeks: u,
      days: d,
      previousMonth: f,
      nextMonth: p,
    } = (0, _.useMemo)(() => {
      let i = Mu(s, r, { numberOfMonths: e.numberOfMonths }, t),
        o = Pu(
          i,
          Au(
            i,
            e.endMonth ? a(e.endMonth) : void 0,
            {
              ISOWeek: e.ISOWeek,
              fixedWeeks: e.fixedWeeks,
              broadcastCalendar: e.broadcastCalendar,
            },
            t
          ),
          {
            broadcastCalendar: e.broadcastCalendar,
            fixedWeeks: e.fixedWeeks,
            ISOWeek: e.ISOWeek,
            reverseMonths: e.reverseMonths,
          },
          t
        );
      return {
        months: o,
        weeks: Ru(o),
        days: ju(o),
        previousMonth: Lu(s, n, e, t),
        nextMonth: Iu(s, r, e, t),
      };
    }, [
      t,
      s.getTime(),
      r?.getTime(),
      n?.getTime(),
      e.disableNavigation,
      e.broadcastCalendar,
      e.endMonth?.getTime(),
      e.fixedWeeks,
      e.ISOWeek,
      e.numberOfMonths,
      e.pagedNavigation,
      e.reverseMonths,
    ]),
    { disableNavigation: m, onMonthChange: h } = e,
    g = (e) => u.some((t) => t.days.some((t) => t.isEqualTo(e))),
    v = (e) => {
      if (m) return;
      let t = i(e);
      (n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), c(t), h?.(t));
    };
  return {
    months: l,
    weeks: u,
    days: d,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: p,
    goToMonth: v,
    goToDay: (e) => {
      g(e) || v(e.date);
    },
  };
}
var Vu;
(function (e) {
  ((e[(e.Today = 0)] = `Today`),
    (e[(e.Selected = 1)] = `Selected`),
    (e[(e.LastFocused = 2)] = `LastFocused`),
    (e[(e.FocusedModifier = 3)] = `FocusedModifier`));
})((Vu ||= {}));
function Hu(e) {
  return !e[q.disabled] && !e[q.hidden] && !e[q.outside];
}
function Uu(e, t, n, r) {
  let i,
    a = -1;
  for (let o of e) {
    let e = t(o);
    Hu(e) &&
      (e[q.focused] && a < Vu.FocusedModifier
        ? ((i = o), (a = Vu.FocusedModifier))
        : r?.isEqualTo(o) && a < Vu.LastFocused
          ? ((i = o), (a = Vu.LastFocused))
          : n(o.date) && a < Vu.Selected
            ? ((i = o), (a = Vu.Selected))
            : e[q.today] && a < Vu.Today && ((i = o), (a = Vu.Today)));
  }
  return ((i ||= e.find((e) => Hu(t(e)))), i);
}
function Q(e, t, n, r, i, a, o) {
  let { ISOWeek: s, broadcastCalendar: c } = a,
    {
      addDays: l,
      addMonths: u,
      addWeeks: d,
      addYears: f,
      endOfBroadcastWeek: p,
      endOfISOWeek: m,
      endOfWeek: h,
      max: g,
      min: _,
      startOfBroadcastWeek: v,
      startOfISOWeek: y,
      startOfWeek: b,
    } = o,
    x = {
      day: l,
      week: d,
      month: u,
      year: f,
      startOfWeek: (e) => (c ? v(e, o) : s ? y(e) : b(e)),
      endOfWeek: (e) => (c ? p(e) : s ? m(e) : h(e)),
    }[e](n, t === `after` ? 1 : -1);
  return (t === `before` && r ? (x = g([r, x])) : t === `after` && i && (x = _([i, x])), x);
}
function Wu(e, t, n, r, i, a, o, s = 0) {
  if (s > 365) return;
  let c = Q(e, t, n.date, r, i, a, o),
    l = !!(a.disabled && Z(c, a.disabled, o)),
    u = !!(a.hidden && Z(c, a.hidden, o)),
    d = new el(c, c, o);
  return !l && !u ? d : Wu(e, t, d, r, i, a, o, s + 1);
}
function Gu(e, t, n, r, i) {
  let { autoFocus: a } = e,
    [o, s] = (0, _.useState)(),
    c = Uu(t.days, n, r || (() => !1), o),
    [l, u] = (0, _.useState)(a ? c : void 0);
  return {
    isFocusTarget: (e) => !!c?.isEqualTo(e),
    setFocused: u,
    focused: l,
    blur: () => {
      (s(l), u(void 0));
    },
    moveFocus: (n, r) => {
      if (!l) return;
      let a = Wu(n, r, l, t.navStart, t.navEnd, e, i);
      a && ((e.disableNavigation && !t.days.some((e) => e.isEqualTo(a))) || (t.goToDay(a), u(a)));
    },
  };
}
function Ku(e, t) {
  let { selected: n, required: r, onSelect: i } = e,
    [a, o] = zu(n, i ? n : void 0),
    s = i ? n : a,
    { isSameDay: c } = t,
    l = (e) => s?.some((t) => c(t, e)) ?? !1,
    { min: u, max: d } = e;
  return {
    selected: s,
    select: (e, t, n) => {
      let a = [...(s ?? [])];
      if (l(e)) {
        if (s?.length === u || (r && s?.length === 1)) return;
        a = s?.filter((t) => !c(t, e));
      } else a = s?.length === d ? [e] : [...a, e];
      return (i || o(a), i?.(a, e, t, n), a);
    },
    isSelected: l,
  };
}
function qu(e, t, n = 0, r = 0, i = !1, a = $c) {
  let { from: o, to: s } = t || {},
    { isSameDay: c, isAfter: l, isBefore: u } = a,
    d;
  if (!o && !s) d = { from: e, to: n > 0 ? void 0 : e };
  else if (o && !s)
    d = c(o, e)
      ? n === 0
        ? { from: o, to: e }
        : i
          ? { from: o, to: void 0 }
          : void 0
      : u(e, o)
        ? { from: e, to: o }
        : { from: o, to: e };
  else if (o && s)
    if (c(o, e) && c(s, e)) d = i ? { from: o, to: s } : void 0;
    else if (c(o, e)) d = { from: o, to: n > 0 ? void 0 : e };
    else if (c(s, e)) d = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, o)) d = { from: e, to: s };
    else if (l(e, o)) d = { from: o, to: e };
    else if (l(e, s)) d = { from: o, to: e };
    else throw Error(`Invalid range`);
  if (d?.from && d?.to) {
    let t = a.differenceInCalendarDays(d.to, d.from);
    ((r > 0 && t > r) || (n > 1 && t < n)) && (d = { from: e, to: void 0 });
  }
  return d;
}
function Ju(e, t, n = $c) {
  let r = Array.isArray(t) ? t : [t],
    i = e.from,
    a = n.differenceInCalendarDays(e.to, e.from),
    o = Math.min(a, 6);
  for (let e = 0; e <= o; e++) {
    if (r.includes(i.getDay())) return !0;
    i = n.addDays(i, 1);
  }
  return !1;
}
function Yu(e, t, n = $c) {
  return Pl(e, t.from, !1, n) || Pl(e, t.to, !1, n) || Pl(t, e.from, !1, n) || Pl(t, e.to, !1, n);
}
function Xu(e, t, n = $c) {
  let r = Array.isArray(t) ? t : [t];
  if (
    r
      .filter((e) => typeof e != `function`)
      .some((t) =>
        typeof t == `boolean`
          ? t
          : n.isDate(t)
            ? Pl(e, t, !1, n)
            : X(t, n)
              ? t.some((t) => Pl(e, t, !1, n))
              : Il(t)
                ? t.from && t.to
                  ? Yu(e, { from: t.from, to: t.to }, n)
                  : !1
                : Y(t)
                  ? Ju(e, t.dayOfWeek, n)
                  : Fl(t)
                    ? n.isAfter(t.before, t.after)
                      ? Yu(e, { from: n.addDays(t.after, 1), to: n.addDays(t.before, -1) }, n)
                      : Z(e.from, t, n) || Z(e.to, t, n)
                    : J(t) || Ll(t)
                      ? Z(e.from, t, n) || Z(e.to, t, n)
                      : !1
      )
  )
    return !0;
  let i = r.filter((e) => typeof e == `function`);
  if (i.length) {
    let t = e.from,
      r = n.differenceInCalendarDays(e.to, e.from);
    for (let e = 0; e <= r; e++) {
      if (i.some((e) => e(t))) return !0;
      t = n.addDays(t, 1);
    }
  }
  return !1;
}
function Zu(e, t) {
  let { disabled: n, excludeDisabled: r, selected: i, required: a, onSelect: o } = e,
    [s, c] = zu(i, o ? i : void 0),
    l = o ? i : s;
  return {
    selected: l,
    select: (i, s, u) => {
      let { min: d, max: f } = e,
        p = i ? qu(i, l, d, f, a, t) : void 0;
      return (
        r &&
          n &&
          p?.from &&
          p.to &&
          Xu({ from: p.from, to: p.to }, n, t) &&
          ((p.from = i), (p.to = void 0)),
        o || c(p),
        o?.(p, i, s, u),
        p
      );
    },
    isSelected: (e) => l && Pl(l, e, !1, t),
  };
}
function Qu(e, t) {
  let { selected: n, required: r, onSelect: i } = e,
    [a, o] = zu(n, i ? n : void 0),
    s = i ? n : a,
    { isSameDay: c } = t;
  return {
    selected: s,
    select: (e, t, n) => {
      let a = e;
      return (!r && s && s && c(e, s) && (a = void 0), i || o(a), i?.(a, e, t, n), a);
    },
    isSelected: (e) => (s ? c(s, e) : !1),
  };
}
function $u(e, t) {
  let n = Qu(e, t),
    r = Ku(e, t),
    i = Zu(e, t);
  switch (e.mode) {
    case `single`:
      return n;
    case `multiple`:
      return r;
    case `range`:
      return i;
    default:
      return;
  }
}
function ed(e, t) {
  return e instanceof ls && e.timeZone === t ? e : new ls(e, t);
}
function td(e, t, n) {
  if (!n) return ed(e, t);
  let r = ed(e, t),
    i = new ls(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
  return new Date(i.getTime());
}
function nd(e, t, n) {
  return typeof e == `boolean` || typeof e == `function`
    ? e
    : e instanceof Date
      ? td(e, t, n)
      : Array.isArray(e)
        ? e.map((e) => (e instanceof Date ? td(e, t, n) : e))
        : Il(e)
          ? { ...e, from: e.from ? ed(e.from, t) : e.from, to: e.to ? ed(e.to, t) : e.to }
          : Fl(e)
            ? { before: td(e.before, t, n), after: td(e.after, t, n) }
            : J(e)
              ? { after: td(e.after, t, n) }
              : Ll(e)
                ? { before: td(e.before, t, n) }
                : e;
}
function rd(e, t, n) {
  return e && (Array.isArray(e) ? e.map((e) => nd(e, t, n)) : nd(e, t, n));
}
function id(e) {
  let t = e,
    n = t.timeZone;
  if (
    n &&
    ((t = { ...e, timeZone: n }),
    (t.today &&= ed(t.today, n)),
    (t.month &&= ed(t.month, n)),
    (t.defaultMonth &&= ed(t.defaultMonth, n)),
    (t.startMonth &&= ed(t.startMonth, n)),
    (t.endMonth &&= ed(t.endMonth, n)),
    t.mode === `single` && t.selected
      ? (t.selected = ed(t.selected, n))
      : t.mode === `multiple` && t.selected
        ? (t.selected = t.selected?.map((e) => ed(e, n)))
        : t.mode === `range` &&
          t.selected &&
          (t.selected = {
            from: t.selected.from ? ed(t.selected.from, n) : t.selected.from,
            to: t.selected.to ? ed(t.selected.to, n) : t.selected.to,
          }),
    t.disabled !== void 0 && (t.disabled = rd(t.disabled, n)),
    t.hidden !== void 0 && (t.hidden = rd(t.hidden, n)),
    t.modifiers)
  ) {
    let e = {};
    (Object.keys(t.modifiers).forEach((r) => {
      e[r] = rd(t.modifiers?.[r], n);
    }),
      (t.modifiers = e));
  }
  let {
    components: r,
    formatters: i,
    labels: a,
    dateLib: o,
    locale: s,
    classNames: c,
  } = (0, _.useMemo)(() => {
    let e = { ...Zc, ...t.locale },
      n = t.broadcastCalendar ? 1 : t.weekStartsOn,
      r = t.noonSafe && t.timeZone ? xu(t.timeZone, { weekStartsOn: n, locale: e }) : void 0,
      i = t.dateLib && r ? { ...r, ...t.dateLib } : (t.dateLib ?? r),
      a = new Qc(
        {
          locale: e,
          weekStartsOn: n,
          firstWeekContainsDate: t.firstWeekContainsDate,
          useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
          useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
          timeZone: t.timeZone,
          numerals: t.numerals,
        },
        i
      );
    return {
      dateLib: a,
      components: Bl(t.components),
      formatters: $l(t.formatters),
      labels: gu(t.labels, a.options),
      locale: e,
      classNames: { ...Hl(), ...t.classNames },
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.noonSafe,
    t.components,
    t.formatters,
    t.labels,
    t.classNames,
  ]);
  t.today || (t = { ...t, today: o.today() });
  let {
      captionLayout: l,
      mode: u,
      navLayout: d,
      numberOfMonths: f = 1,
      onDayBlur: p,
      onDayClick: m,
      onDayFocus: h,
      onDayKeyDown: g,
      onDayMouseEnter: v,
      onDayMouseLeave: y,
      onNextClick: b,
      onPrevClick: x,
      showWeekNumber: S,
      styles: C,
    } = t,
    {
      formatCaption: w,
      formatDay: T,
      formatMonthDropdown: E,
      formatWeekNumber: ee,
      formatWeekNumberHeader: D,
      formatWeekdayName: te,
      formatYearDropdown: O,
    } = i,
    k = Bu(t, o),
    {
      days: ne,
      months: A,
      navStart: j,
      navEnd: re,
      previousMonth: M,
      nextMonth: N,
      goToMonth: ie,
    } = k,
    P = Rl(ne, t, j, re, o),
    { isSelected: F, select: ae, selected: I } = $u(t, o) ?? {},
    {
      blur: L,
      focused: oe,
      isFocusTarget: se,
      moveFocus: ce,
      setFocused: le,
    } = Gu(t, k, P, F ?? (() => !1), o),
    {
      labelDayButton: ue,
      labelGridcell: de,
      labelGrid: fe,
      labelMonthDropdown: pe,
      labelNav: me,
      labelPrevious: he,
      labelNext: ge,
      labelWeekday: _e,
      labelWeekNumber: ve,
      labelWeekNumberHeader: ye,
      labelYearDropdown: be,
    } = a,
    xe = (0, _.useMemo)(
      () => yu(o, t.ISOWeek, t.broadcastCalendar, t.today),
      [o, t.ISOWeek, t.broadcastCalendar, t.today]
    ),
    Se = u !== void 0 || m !== void 0,
    Ce = (0, _.useCallback)(() => {
      M && (ie(M), x?.(M));
    }, [M, ie, x]),
    we = (0, _.useCallback)(() => {
      N && (ie(N), b?.(N));
    }, [ie, N, b]),
    Te = (0, _.useCallback)(
      (e, t) => (n) => {
        (n.preventDefault(),
          n.stopPropagation(),
          le(e),
          !t.disabled && (ae?.(e.date, t, n), m?.(e.date, t, n)));
      },
      [ae, m, le]
    ),
    Ee = (0, _.useCallback)(
      (e, t) => (n) => {
        (le(e), h?.(e.date, t, n));
      },
      [h, le]
    ),
    De = (0, _.useCallback)(
      (e, t) => (n) => {
        (L(), p?.(e.date, t, n));
      },
      [L, p]
    ),
    Oe = (0, _.useCallback)(
      (e, n) => (r) => {
        let i = {
          ArrowLeft: [r.shiftKey ? `month` : `day`, t.dir === `rtl` ? `after` : `before`],
          ArrowRight: [r.shiftKey ? `month` : `day`, t.dir === `rtl` ? `before` : `after`],
          ArrowDown: [r.shiftKey ? `year` : `week`, `after`],
          ArrowUp: [r.shiftKey ? `year` : `week`, `before`],
          PageUp: [r.shiftKey ? `year` : `month`, `before`],
          PageDown: [r.shiftKey ? `year` : `month`, `after`],
          Home: [`startOfWeek`, `before`],
          End: [`endOfWeek`, `after`],
        };
        if (i[r.key]) {
          (r.preventDefault(), r.stopPropagation());
          let [e, t] = i[r.key];
          ce(e, t);
        }
        g?.(e.date, n, r);
      },
      [ce, g, t.dir]
    ),
    ke = (0, _.useCallback)(
      (e, t) => (n) => {
        v?.(e.date, t, n);
      },
      [v]
    ),
    Ae = (0, _.useCallback)(
      (e, t) => (n) => {
        y?.(e.date, t, n);
      },
      [y]
    ),
    je = (0, _.useCallback)(
      (e) => (t) => {
        let n = Number(t.target.value);
        ie(o.setMonth(o.startOfMonth(e), n));
      },
      [o, ie]
    ),
    Me = (0, _.useCallback)(
      (e) => (t) => {
        let n = Number(t.target.value);
        ie(o.setYear(o.startOfMonth(e), n));
      },
      [o, ie]
    ),
    { className: Ne, style: Pe } = (0, _.useMemo)(
      () => ({
        className: [c[K.Root], t.className].filter(Boolean).join(` `),
        style: { ...C?.[K.Root], ...t.style },
      }),
      [c, t.className, t.style, C]
    ),
    Fe = Vl(t),
    Ie = (0, _.useRef)(null);
  ku(Ie, !!t.animate, { classNames: c, months: A, focused: oe, dateLib: o });
  let Le = {
    dayPickerProps: t,
    selected: I,
    select: ae,
    isSelected: F,
    months: A,
    nextMonth: N,
    previousMonth: M,
    goToMonth: ie,
    getModifiers: P,
    components: r,
    classNames: c,
    styles: C,
    labels: a,
    formatters: i,
  };
  return _.createElement(
    _l.Provider,
    { value: Le },
    _.createElement(
      r.Root,
      {
        rootRef: t.animate ? Ie : void 0,
        className: Ne,
        style: Pe,
        dir: t.dir,
        id: t.id,
        lang: t.lang,
        nonce: t.nonce,
        title: t.title,
        role: t.role,
        "aria-label": t[`aria-label`],
        "aria-labelledby": t[`aria-labelledby`],
        ...Fe,
      },
      _.createElement(
        r.Months,
        { className: c[K.Months], style: C?.[K.Months] },
        !t.hideNavigation &&
          !d &&
          _.createElement(r.Nav, {
            "data-animated-nav": t.animate ? `true` : void 0,
            className: c[K.Nav],
            style: C?.[K.Nav],
            "aria-label": me(),
            onPreviousClick: Ce,
            onNextClick: we,
            previousMonth: M,
            nextMonth: N,
          }),
        A.map((e, n) =>
          _.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? `true` : void 0,
              className: c[K.Month],
              style: C?.[K.Month],
              key: n,
              displayIndex: n,
              calendarMonth: e,
            },
            d === `around` &&
              !t.hideNavigation &&
              n === 0 &&
              _.createElement(
                r.PreviousMonthButton,
                {
                  type: `button`,
                  className: c[K.PreviousMonthButton],
                  tabIndex: M ? void 0 : -1,
                  "aria-disabled": M ? void 0 : !0,
                  "aria-label": he(M),
                  onClick: Ce,
                  "data-animated-button": t.animate ? `true` : void 0,
                },
                _.createElement(r.Chevron, {
                  disabled: M ? void 0 : !0,
                  className: c[K.Chevron],
                  orientation: t.dir === `rtl` ? `right` : `left`,
                })
              ),
            _.createElement(
              r.MonthCaption,
              {
                "data-animated-caption": t.animate ? `true` : void 0,
                className: c[K.MonthCaption],
                style: C?.[K.MonthCaption],
                calendarMonth: e,
                displayIndex: n,
              },
              l?.startsWith(`dropdown`)
                ? _.createElement(
                    r.DropdownNav,
                    { className: c[K.Dropdowns], style: C?.[K.Dropdowns] },
                    (() => {
                      let n =
                          l === `dropdown` || l === `dropdown-months`
                            ? _.createElement(r.MonthsDropdown, {
                                key: `month`,
                                className: c[K.MonthsDropdown],
                                "aria-label": pe(),
                                classNames: c,
                                components: r,
                                disabled: !!t.disableNavigation,
                                onChange: je(e.date),
                                options: _u(e.date, j, re, i, o),
                                style: C?.[K.Dropdown],
                                value: o.getMonth(e.date),
                              })
                            : _.createElement(`span`, { key: `month` }, E(e.date, o)),
                        a =
                          l === `dropdown` || l === `dropdown-years`
                            ? _.createElement(r.YearsDropdown, {
                                key: `year`,
                                className: c[K.YearsDropdown],
                                "aria-label": be(o.options),
                                classNames: c,
                                components: r,
                                disabled: !!t.disableNavigation,
                                onChange: Me(e.date),
                                options: bu(j, re, i, o, !!t.reverseYears),
                                style: C?.[K.Dropdown],
                                value: o.getYear(e.date),
                              })
                            : _.createElement(`span`, { key: `year` }, O(e.date, o));
                      return o.getMonthYearOrder() === `year-first` ? [a, n] : [n, a];
                    })(),
                    _.createElement(
                      `span`,
                      {
                        role: `status`,
                        "aria-live": `polite`,
                        style: {
                          border: 0,
                          clip: `rect(0 0 0 0)`,
                          height: `1px`,
                          margin: `-1px`,
                          overflow: `hidden`,
                          padding: 0,
                          position: `absolute`,
                          width: `1px`,
                          whiteSpace: `nowrap`,
                          wordWrap: `normal`,
                        },
                      },
                      w(e.date, o.options, o)
                    )
                  )
                : _.createElement(
                    r.CaptionLabel,
                    { className: c[K.CaptionLabel], role: `status`, "aria-live": `polite` },
                    w(e.date, o.options, o)
                  )
            ),
            d === `around` &&
              !t.hideNavigation &&
              n === f - 1 &&
              _.createElement(
                r.NextMonthButton,
                {
                  type: `button`,
                  className: c[K.NextMonthButton],
                  tabIndex: N ? void 0 : -1,
                  "aria-disabled": N ? void 0 : !0,
                  "aria-label": ge(N),
                  onClick: we,
                  "data-animated-button": t.animate ? `true` : void 0,
                },
                _.createElement(r.Chevron, {
                  disabled: N ? void 0 : !0,
                  className: c[K.Chevron],
                  orientation: t.dir === `rtl` ? `left` : `right`,
                })
              ),
            n === f - 1 &&
              d === `after` &&
              !t.hideNavigation &&
              _.createElement(r.Nav, {
                "data-animated-nav": t.animate ? `true` : void 0,
                className: c[K.Nav],
                style: C?.[K.Nav],
                "aria-label": me(),
                onPreviousClick: Ce,
                onNextClick: we,
                previousMonth: M,
                nextMonth: N,
              }),
            _.createElement(
              r.MonthGrid,
              {
                role: `grid`,
                "aria-multiselectable": u === `multiple` || u === `range`,
                "aria-label": fe(e.date, o.options, o) || void 0,
                className: c[K.MonthGrid],
                style: C?.[K.MonthGrid],
              },
              !t.hideWeekdays &&
                _.createElement(
                  r.Weekdays,
                  {
                    "data-animated-weekdays": t.animate ? `true` : void 0,
                    className: c[K.Weekdays],
                    style: C?.[K.Weekdays],
                  },
                  S &&
                    _.createElement(
                      r.WeekNumberHeader,
                      {
                        "aria-label": ye(o.options),
                        className: c[K.WeekNumberHeader],
                        style: C?.[K.WeekNumberHeader],
                        scope: `col`,
                      },
                      D()
                    ),
                  xe.map((e) =>
                    _.createElement(
                      r.Weekday,
                      {
                        "aria-label": _e(e, o.options, o),
                        className: c[K.Weekday],
                        key: String(e),
                        style: C?.[K.Weekday],
                        scope: `col`,
                      },
                      te(e, o.options, o)
                    )
                  )
                ),
              _.createElement(
                r.Weeks,
                {
                  "data-animated-weeks": t.animate ? `true` : void 0,
                  className: c[K.Weeks],
                  style: C?.[K.Weeks],
                },
                e.weeks.map((e) =>
                  _.createElement(
                    r.Week,
                    { className: c[K.Week], key: e.weekNumber, style: C?.[K.Week], week: e },
                    S &&
                      _.createElement(
                        r.WeekNumber,
                        {
                          week: e,
                          style: C?.[K.WeekNumber],
                          "aria-label": ve(e.weekNumber, { locale: s }),
                          className: c[K.WeekNumber],
                          scope: `row`,
                          role: `rowheader`,
                        },
                        ee(e.weekNumber, o)
                      ),
                    e.days.map((e) => {
                      let { date: n } = e,
                        i = P(e);
                      if (
                        ((i[q.focused] = !i.hidden && !!oe?.isEqualTo(e)),
                        (i[cl.selected] = F?.(n) || i.selected),
                        Il(I))
                      ) {
                        let { from: e, to: t } = I;
                        ((i[cl.range_start] = !!(e && t && o.isSameDay(n, e))),
                          (i[cl.range_end] = !!(e && t && o.isSameDay(n, t))),
                          (i[cl.range_middle] = Pl(I, n, !0, o)));
                      }
                      let a = vu(i, C, t.modifiersStyles),
                        s = zl(i, c, t.modifiersClassNames),
                        l = !Se && !i.hidden ? de(n, i, o.options, o) : void 0;
                      return _.createElement(
                        r.Day,
                        {
                          key: `${e.isoDate}_${e.displayMonthId}`,
                          day: e,
                          modifiers: i,
                          className: s.join(` `),
                          style: a,
                          role: `gridcell`,
                          "aria-selected": i.selected || void 0,
                          "aria-label": l,
                          "data-day": e.isoDate,
                          "data-month": e.outside ? e.dateMonthId : void 0,
                          "data-selected": i.selected || void 0,
                          "data-disabled": i.disabled || void 0,
                          "data-hidden": i.hidden || void 0,
                          "data-outside": e.outside || void 0,
                          "data-focused": i.focused || void 0,
                          "data-today": i.today || void 0,
                        },
                        !i.hidden && Se
                          ? _.createElement(
                              r.DayButton,
                              {
                                className: c[K.DayButton],
                                style: C?.[K.DayButton],
                                type: `button`,
                                day: e,
                                modifiers: i,
                                disabled: (!i.focused && i.disabled) || void 0,
                                "aria-disabled": (i.focused && i.disabled) || void 0,
                                tabIndex: se(e) ? 0 : -1,
                                "aria-label": ue(n, i, o.options, o),
                                onClick: Te(e, i),
                                onBlur: De(e, i),
                                onFocus: Ee(e, i),
                                onKeyDown: Oe(e, i),
                                onMouseEnter: ke(e, i),
                                onMouseLeave: Ae(e, i),
                              },
                              T(n, o.options, o)
                            )
                          : !i.hidden && T(e.date, o.options, o)
                      );
                    })
                  )
                )
              )
            )
          )
        )
      ),
      t.footer &&
        _.createElement(
          r.Footer,
          { className: c[K.Footer], style: C?.[K.Footer], role: `status`, "aria-live": `polite` },
          t.footer
        )
    )
  );
}
export {
  ba as A,
  qn as B,
  pa as C,
  _a as D,
  ga as E,
  R as F,
  f as H,
  _i as I,
  vi as L,
  Ca as M,
  Sa as N,
  va as O,
  Li as P,
  fi as R,
  fa as S,
  ha as T,
  u as U,
  g as V,
  o as W,
  sa as _,
  Uo as a,
  ua as b,
  Qi as c,
  ta as d,
  na as f,
  oa as g,
  aa as h,
  Zo as i,
  xa as j,
  ya as k,
  $i as l,
  ia as m,
  Xc as n,
  Ta as o,
  ra as p,
  kc as r,
  Zi as s,
  id as t,
  ea as u,
  ca as v,
  ma as w,
  da as x,
  la as y,
  Gn as z,
};
