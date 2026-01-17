var e = () => void 0,
  t = function (e) {
    let t = [],
      n = 0;
    for (let r = 0; r < e.length; r++) {
      let i = e.charCodeAt(r);
      i < 128
        ? (t[n++] = i)
        : i < 2048
          ? ((t[n++] = (i >> 6) | 192), (t[n++] = (i & 63) | 128))
          : (i & 64512) == 55296 && r + 1 < e.length && (e.charCodeAt(r + 1) & 64512) == 56320
            ? ((i = 65536 + ((i & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
              (t[n++] = (i >> 18) | 240),
              (t[n++] = ((i >> 12) & 63) | 128),
              (t[n++] = ((i >> 6) & 63) | 128),
              (t[n++] = (i & 63) | 128))
            : ((t[n++] = (i >> 12) | 224),
              (t[n++] = ((i >> 6) & 63) | 128),
              (t[n++] = (i & 63) | 128));
    }
    return t;
  },
  n = function (e) {
    let t = [],
      n = 0,
      r = 0;
    for (; n < e.length; ) {
      let i = e[n++];
      if (i < 128) t[r++] = String.fromCharCode(i);
      else if (i > 191 && i < 224) {
        let a = e[n++];
        t[r++] = String.fromCharCode(((i & 31) << 6) | (a & 63));
      } else if (i > 239 && i < 365) {
        let a = e[n++],
          o = e[n++],
          s = e[n++],
          c = (((i & 7) << 18) | ((a & 63) << 12) | ((o & 63) << 6) | (s & 63)) - 65536;
        ((t[r++] = String.fromCharCode(55296 + (c >> 10))),
          (t[r++] = String.fromCharCode(56320 + (c & 1023))));
      } else {
        let a = e[n++],
          o = e[n++];
        t[r++] = String.fromCharCode(((i & 15) << 12) | ((a & 63) << 6) | (o & 63));
      }
    }
    return t.join(``);
  },
  r = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + `+/=`;
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + `-_.`;
    },
    HAS_NATIVE_SUPPORT: typeof atob == `function`,
    encodeByteArray(e, t) {
      if (!Array.isArray(e)) throw Error(`encodeByteArray takes an array as a parameter`);
      this.init_();
      let n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let t = 0; t < e.length; t += 3) {
        let i = e[t],
          a = t + 1 < e.length,
          o = a ? e[t + 1] : 0,
          s = t + 2 < e.length,
          c = s ? e[t + 2] : 0,
          l = i >> 2,
          u = ((i & 3) << 4) | (o >> 4),
          d = ((o & 15) << 2) | (c >> 6),
          f = c & 63;
        (s || ((f = 64), a || (d = 64)), r.push(n[l], n[u], n[d], n[f]));
      }
      return r.join(``);
    },
    encodeString(e, n) {
      return this.HAS_NATIVE_SUPPORT && !n ? btoa(e) : this.encodeByteArray(t(e), n);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : n(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      let n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let t = 0; t < e.length; ) {
        let a = n[e.charAt(t++)],
          o = t < e.length ? n[e.charAt(t)] : 0;
        ++t;
        let s = t < e.length ? n[e.charAt(t)] : 64;
        ++t;
        let c = t < e.length ? n[e.charAt(t)] : 64;
        if ((++t, a == null || o == null || s == null || c == null)) throw new i();
        let l = (a << 2) | (o >> 4);
        if ((r.push(l), s !== 64)) {
          let e = ((o << 4) & 240) | (s >> 2);
          if ((r.push(e), c !== 64)) {
            let e = ((s << 6) & 192) | c;
            r.push(e);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        ((this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {}));
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          ((this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)));
      }
    },
  },
  i = class extends Error {
    constructor() {
      (super(...arguments), (this.name = `DecodeBase64StringError`));
    }
  },
  a = function (e) {
    let n = t(e);
    return r.encodeByteArray(n, !0);
  },
  o = function (e) {
    return a(e).replace(/\./g, ``);
  },
  s = function (e) {
    try {
      return r.decodeString(e, !0);
    } catch (e) {
      console.error(`base64Decode failed: `, e);
    }
    return null;
  };
function c() {
  if (typeof self < `u`) return self;
  if (typeof window < `u`) return window;
  if (typeof global < `u`) return global;
  throw Error(`Unable to locate global object.`);
}
var l = () => c().__FIREBASE_DEFAULTS__,
  u = () => {
    if (typeof process > `u`) return;
    let e = {}.__FIREBASE_DEFAULTS__;
    if (e) return JSON.parse(e);
  },
  d = () => {
    if (typeof document > `u`) return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    let t = e && s(e[1]);
    return t && JSON.parse(t);
  },
  f = () => {
    try {
      return e() || l() || u() || d();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
      return;
    }
  },
  p = (e) => f()?.emulatorHosts?.[e],
  m = (e) => {
    let t = p(e);
    if (!t) return;
    let n = t.lastIndexOf(`:`);
    if (n <= 0 || n + 1 === t.length)
      throw Error(`Invalid host ${t} with no separate hostname and port!`);
    let r = parseInt(t.substring(n + 1), 10);
    return t[0] === `[` ? [t.substring(1, n - 1), r] : [t.substring(0, n), r];
  },
  h = () => f()?.config,
  g = (e) => f()?.[`_${e}`],
  ee = class {
    constructor() {
      ((this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((e, t) => {
          ((this.resolve = e), (this.reject = t));
        })));
    }
    wrapCallback(e) {
      return (t, n) => {
        (t ? this.reject(t) : this.resolve(n),
          typeof e == `function` &&
            (this.promise.catch(() => {}), e.length === 1 ? e(t) : e(t, n)));
      };
    }
  };
function te(e) {
  try {
    return (e.startsWith(`http://`) || e.startsWith(`https://`) ? new URL(e).hostname : e).endsWith(
      `.cloudworkstations.dev`
    );
  } catch {
    return !1;
  }
}
async function ne(e) {
  return (await fetch(e, { credentials: `include` })).ok;
}
function re(e, t) {
  if (e.uid)
    throw Error(
      `The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.`
    );
  let n = { alg: `none`, type: `JWT` },
    r = t || `demo-project`,
    i = e.iat || 0,
    a = e.sub || e.user_id;
  if (!a) throw Error(`mockUserToken must contain 'sub' or 'user_id' field!`);
  let s = {
    iss: `https://securetoken.google.com/${r}`,
    aud: r,
    iat: i,
    exp: i + 3600,
    auth_time: i,
    sub: a,
    user_id: a,
    firebase: { sign_in_provider: `custom`, identities: {} },
    ...e,
  };
  return [o(JSON.stringify(n)), o(JSON.stringify(s)), ``].join(`.`);
}
var ie = {};
function ae() {
  let e = { prod: [], emulator: [] };
  for (let t of Object.keys(ie)) ie[t] ? e.emulator.push(t) : e.prod.push(t);
  return e;
}
function oe(e) {
  let t = document.getElementById(e),
    n = !1;
  return (
    t || ((t = document.createElement(`div`)), t.setAttribute(`id`, e), (n = !0)),
    { created: n, element: t }
  );
}
var se = !1;
function ce(e, t) {
  if (
    typeof window > `u` ||
    typeof document > `u` ||
    !te(window.location.host) ||
    ie[e] === t ||
    ie[e] ||
    se
  )
    return;
  ie[e] = t;
  function n(e) {
    return `__firebase__banner__${e}`;
  }
  let r = `__firebase__banner`,
    i = ae().prod.length > 0;
  function a() {
    let e = document.getElementById(r);
    e && e.remove();
  }
  function o(e) {
    ((e.style.display = `flex`),
      (e.style.background = `#7faaf0`),
      (e.style.position = `fixed`),
      (e.style.bottom = `5px`),
      (e.style.left = `5px`),
      (e.style.padding = `.5em`),
      (e.style.borderRadius = `5px`),
      (e.style.alignItems = `center`));
  }
  function s(e, t) {
    (e.setAttribute(`width`, `24`),
      e.setAttribute(`id`, t),
      e.setAttribute(`height`, `24`),
      e.setAttribute(`viewBox`, `0 0 24 24`),
      e.setAttribute(`fill`, `none`),
      (e.style.marginLeft = `-6px`));
  }
  function c() {
    let e = document.createElement(`span`);
    return (
      (e.style.cursor = `pointer`),
      (e.style.marginLeft = `16px`),
      (e.style.fontSize = `24px`),
      (e.innerHTML = ` &times;`),
      (e.onclick = () => {
        ((se = !0), a());
      }),
      e
    );
  }
  function l(e, t) {
    (e.setAttribute(`id`, t),
      (e.innerText = `Learn more`),
      (e.href = `https://firebase.google.com/docs/studio/preview-apps#preview-backend`),
      e.setAttribute(`target`, `__blank`),
      (e.style.paddingLeft = `5px`),
      (e.style.textDecoration = `underline`));
  }
  function u() {
    let e = oe(r),
      t = n(`text`),
      a = document.getElementById(t) || document.createElement(`span`),
      u = n(`learnmore`),
      d = document.getElementById(u) || document.createElement(`a`),
      f = n(`preprendIcon`),
      p =
        document.getElementById(f) || document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    if (e.created) {
      let t = e.element;
      (o(t), l(d, u));
      let n = c();
      (s(p, f), t.append(p, a, d, n), document.body.appendChild(t));
    }
    (i
      ? ((a.innerText = `Preview backend disconnected.`),
        (p.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`))
      : ((p.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`),
        (a.innerText = `Preview backend running in this workspace.`)),
      a.setAttribute(`id`, t));
  }
  document.readyState === `loading` ? window.addEventListener(`DOMContentLoaded`, u) : u();
}
function _() {
  return typeof navigator < `u` && typeof navigator.userAgent == `string`
    ? navigator.userAgent
    : ``;
}
function v() {
  return (
    typeof window < `u` &&
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())
  );
}
function le() {
  let e = f()?.forceEnvironment;
  if (e === `node`) return !0;
  if (e === `browser`) return !1;
  try {
    return Object.prototype.toString.call(global.process) === `[object process]`;
  } catch {
    return !1;
  }
}
function ue() {
  return typeof navigator < `u` && navigator.userAgent === `Cloudflare-Workers`;
}
function de() {
  let e =
    typeof chrome == `object`
      ? chrome.runtime
      : typeof browser == `object`
        ? browser.runtime
        : void 0;
  return typeof e == `object` && e.id !== void 0;
}
function fe() {
  return typeof navigator == `object` && navigator.product === `ReactNative`;
}
function pe() {
  let e = _();
  return e.indexOf(`MSIE `) >= 0 || e.indexOf(`Trident/`) >= 0;
}
function me() {
  return (
    !le() &&
    !!navigator.userAgent &&
    navigator.userAgent.includes(`Safari`) &&
    !navigator.userAgent.includes(`Chrome`)
  );
}
function he() {
  try {
    return typeof indexedDB == `object`;
  } catch {
    return !1;
  }
}
function ge() {
  return new Promise((e, t) => {
    try {
      let n = !0,
        r = `validate-browser-context-for-indexeddb-analytics-module`,
        i = self.indexedDB.open(r);
      ((i.onsuccess = () => {
        (i.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0));
      }),
        (i.onupgradeneeded = () => {
          n = !1;
        }),
        (i.onerror = () => {
          t(i.error?.message || ``);
        }));
    } catch (e) {
      t(e);
    }
  });
}
function _e() {
  return !(typeof navigator > `u` || !navigator.cookieEnabled);
}
var ve = `FirebaseError`,
  ye = class e extends Error {
    constructor(t, n, r) {
      (super(n),
        (this.code = t),
        (this.customData = r),
        (this.name = ve),
        Object.setPrototypeOf(this, e.prototype),
        Error.captureStackTrace && Error.captureStackTrace(this, be.prototype.create));
    }
  },
  be = class {
    constructor(e, t, n) {
      ((this.service = e), (this.serviceName = t), (this.errors = n));
    }
    create(e, ...t) {
      let n = t[0] || {},
        r = `${this.service}/${e}`,
        i = this.errors[e],
        a = i ? xe(i, n) : `Error`;
      return new ye(r, `${this.serviceName}: ${a} (${r}).`, n);
    }
  };
function xe(e, t) {
  return e.replace(Se, (e, n) => {
    let r = t[n];
    return r == null ? `<${n}?>` : String(r);
  });
}
var Se = /\{\$([^}]+)}/g;
function Ce(e) {
  for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
function we(e, t) {
  if (e === t) return !0;
  let n = Object.keys(e),
    r = Object.keys(t);
  for (let i of n) {
    if (!r.includes(i)) return !1;
    let n = e[i],
      a = t[i];
    if (Te(n) && Te(a)) {
      if (!we(n, a)) return !1;
    } else if (n !== a) return !1;
  }
  for (let e of r) if (!n.includes(e)) return !1;
  return !0;
}
function Te(e) {
  return typeof e == `object` && !!e;
}
function Ee(e) {
  let t = [];
  for (let [n, r] of Object.entries(e))
    Array.isArray(r)
      ? r.forEach((e) => {
          t.push(encodeURIComponent(n) + `=` + encodeURIComponent(e));
        })
      : t.push(encodeURIComponent(n) + `=` + encodeURIComponent(r));
  return t.length ? `&` + t.join(`&`) : ``;
}
function De(e) {
  let t = {};
  return (
    e
      .replace(/^\?/, ``)
      .split(`&`)
      .forEach((e) => {
        if (e) {
          let [n, r] = e.split(`=`);
          t[decodeURIComponent(n)] = decodeURIComponent(r);
        }
      }),
    t
  );
}
function Oe(e) {
  let t = e.indexOf(`?`);
  if (!t) return ``;
  let n = e.indexOf(`#`, t);
  return e.substring(t, n > 0 ? n : void 0);
}
function ke(e, t) {
  let n = new Ae(e, t);
  return n.subscribe.bind(n);
}
var Ae = class {
  constructor(e, t) {
    ((this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = t),
      this.task
        .then(() => {
          e(this);
        })
        .catch((e) => {
          this.error(e);
        }));
  }
  next(e) {
    this.forEachObserver((t) => {
      t.next(e);
    });
  }
  error(e) {
    (this.forEachObserver((t) => {
      t.error(e);
    }),
      this.close(e));
  }
  complete() {
    (this.forEachObserver((e) => {
      e.complete();
    }),
      this.close());
  }
  subscribe(e, t, n) {
    let r;
    if (e === void 0 && t === void 0 && n === void 0) throw Error(`Missing Observer.`);
    ((r = je(e, [`next`, `error`, `complete`]) ? e : { next: e, error: t, complete: n }),
      r.next === void 0 && (r.next = Me),
      r.error === void 0 && (r.error = Me),
      r.complete === void 0 && (r.complete = Me));
    let i = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? r.error(this.finalError) : r.complete();
          } catch {}
        }),
      this.observers.push(r),
      i
    );
  }
  unsubscribeOne(e) {
    this.observers === void 0 ||
      this.observers[e] === void 0 ||
      (delete this.observers[e],
      --this.observerCount,
      this.observerCount === 0 && this.onNoObservers !== void 0 && this.onNoObservers(this));
  }
  forEachObserver(e) {
    if (!this.finalized) for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
  }
  sendOne(e, t) {
    this.task.then(() => {
      if (this.observers !== void 0 && this.observers[e] !== void 0)
        try {
          t(this.observers[e]);
        } catch (e) {
          typeof console < `u` && console.error && console.error(e);
        }
    });
  }
  close(e) {
    this.finalized ||
      ((this.finalized = !0),
      e !== void 0 && (this.finalError = e),
      this.task.then(() => {
        ((this.observers = void 0), (this.onNoObservers = void 0));
      }));
  }
};
function je(e, t) {
  if (typeof e != `object` || !e) return !1;
  for (let n of t) if (n in e && typeof e[n] == `function`) return !0;
  return !1;
}
function Me() {}
var Ne = 1e3,
  Pe = 2,
  Fe = 14400 * 1e3,
  Ie = 0.5;
function y(e, t = Ne, n = Pe) {
  let r = t * n ** +e,
    i = Math.round(Ie * r * (Math.random() - 0.5) * 2);
  return Math.min(Fe, r + i);
}
function b(e) {
  return e && e._delegate ? e._delegate : e;
}
var Le = class {
    constructor(e, t, n) {
      ((this.name = e),
        (this.instanceFactory = t),
        (this.type = n),
        (this.multipleInstances = !1),
        (this.serviceProps = {}),
        (this.instantiationMode = `LAZY`),
        (this.onInstanceCreated = null));
    }
    setInstantiationMode(e) {
      return ((this.instantiationMode = e), this);
    }
    setMultipleInstances(e) {
      return ((this.multipleInstances = e), this);
    }
    setServiceProps(e) {
      return ((this.serviceProps = e), this);
    }
    setInstanceCreatedCallback(e) {
      return ((this.onInstanceCreated = e), this);
    }
  },
  Re = `[DEFAULT]`,
  ze = class {
    constructor(e, t) {
      ((this.name = e),
        (this.container = t),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map()));
    }
    get(e) {
      let t = this.normalizeInstanceIdentifier(e);
      if (!this.instancesDeferred.has(t)) {
        let e = new ee();
        if (
          (this.instancesDeferred.set(t, e), this.isInitialized(t) || this.shouldAutoInitialize())
        )
          try {
            let n = this.getOrInitializeService({ instanceIdentifier: t });
            n && e.resolve(n);
          } catch {}
      }
      return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
      let t = this.normalizeInstanceIdentifier(e?.identifier),
        n = e?.optional ?? !1;
      if (this.isInitialized(t) || this.shouldAutoInitialize())
        try {
          return this.getOrInitializeService({ instanceIdentifier: t });
        } catch (e) {
          if (n) return null;
          throw e;
        }
      else if (n) return null;
      else throw Error(`Service ${this.name} is not available`);
    }
    getComponent() {
      return this.component;
    }
    setComponent(e) {
      if (e.name !== this.name)
        throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
      if (this.component) throw Error(`Component for ${this.name} has already been provided`);
      if (((this.component = e), this.shouldAutoInitialize())) {
        if (Ve(e))
          try {
            this.getOrInitializeService({ instanceIdentifier: Re });
          } catch {}
        for (let [e, t] of this.instancesDeferred.entries()) {
          let n = this.normalizeInstanceIdentifier(e);
          try {
            let e = this.getOrInitializeService({ instanceIdentifier: n });
            t.resolve(e);
          } catch {}
        }
      }
    }
    clearInstance(e = Re) {
      (this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e));
    }
    async delete() {
      let e = Array.from(this.instances.values());
      await Promise.all([
        ...e.filter((e) => `INTERNAL` in e).map((e) => e.INTERNAL.delete()),
        ...e.filter((e) => `_delete` in e).map((e) => e._delete()),
      ]);
    }
    isComponentSet() {
      return this.component != null;
    }
    isInitialized(e = Re) {
      return this.instances.has(e);
    }
    getOptions(e = Re) {
      return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
      let { options: t = {} } = e,
        n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
      if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
      if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
      let r = this.getOrInitializeService({ instanceIdentifier: n, options: t });
      for (let [e, t] of this.instancesDeferred.entries())
        n === this.normalizeInstanceIdentifier(e) && t.resolve(r);
      return r;
    }
    onInit(e, t) {
      let n = this.normalizeInstanceIdentifier(t),
        r = this.onInitCallbacks.get(n) ?? new Set();
      (r.add(e), this.onInitCallbacks.set(n, r));
      let i = this.instances.get(n);
      return (
        i && e(i, n),
        () => {
          r.delete(e);
        }
      );
    }
    invokeOnInitCallbacks(e, t) {
      let n = this.onInitCallbacks.get(t);
      if (n)
        for (let r of n)
          try {
            r(e, t);
          } catch {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
      let n = this.instances.get(e);
      if (
        !n &&
        this.component &&
        ((n = this.component.instanceFactory(this.container, {
          instanceIdentifier: Be(e),
          options: t,
        })),
        this.instances.set(e, n),
        this.instancesOptions.set(e, t),
        this.invokeOnInitCallbacks(n, e),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, e, n);
        } catch {}
      return n || null;
    }
    normalizeInstanceIdentifier(e = Re) {
      return this.component ? (this.component.multipleInstances ? e : Re) : e;
    }
    shouldAutoInitialize() {
      return !!this.component && this.component.instantiationMode !== `EXPLICIT`;
    }
  };
function Be(e) {
  return e === Re ? void 0 : e;
}
function Ve(e) {
  return e.instantiationMode === `EAGER`;
}
var He = class {
    constructor(e) {
      ((this.name = e), (this.providers = new Map()));
    }
    addComponent(e) {
      let t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw Error(`Component ${e.name} has already been registered with ${this.name}`);
      t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
      (this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name),
        this.addComponent(e));
    }
    getProvider(e) {
      if (this.providers.has(e)) return this.providers.get(e);
      let t = new ze(e, this);
      return (this.providers.set(e, t), t);
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  },
  Ue = [],
  x;
(function (e) {
  ((e[(e.DEBUG = 0)] = `DEBUG`),
    (e[(e.VERBOSE = 1)] = `VERBOSE`),
    (e[(e.INFO = 2)] = `INFO`),
    (e[(e.WARN = 3)] = `WARN`),
    (e[(e.ERROR = 4)] = `ERROR`),
    (e[(e.SILENT = 5)] = `SILENT`));
})((x ||= {}));
var We = {
    debug: x.DEBUG,
    verbose: x.VERBOSE,
    info: x.INFO,
    warn: x.WARN,
    error: x.ERROR,
    silent: x.SILENT,
  },
  Ge = x.INFO,
  Ke = {
    [x.DEBUG]: `log`,
    [x.VERBOSE]: `log`,
    [x.INFO]: `info`,
    [x.WARN]: `warn`,
    [x.ERROR]: `error`,
  },
  qe = (e, t, ...n) => {
    if (t < e.logLevel) return;
    let r = new Date().toISOString(),
      i = Ke[t];
    if (i) console[i](`[${r}]  ${e.name}:`, ...n);
    else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`);
  },
  Je = class {
    constructor(e) {
      ((this.name = e),
        (this._logLevel = Ge),
        (this._logHandler = qe),
        (this._userLogHandler = null),
        Ue.push(this));
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in x)) throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = typeof e == `string` ? We[e] : e;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(e) {
      if (typeof e != `function`)
        throw TypeError("Value assigned to `logHandler` must be a function");
      this._logHandler = e;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(e) {
      this._userLogHandler = e;
    }
    debug(...e) {
      (this._userLogHandler && this._userLogHandler(this, x.DEBUG, ...e),
        this._logHandler(this, x.DEBUG, ...e));
    }
    log(...e) {
      (this._userLogHandler && this._userLogHandler(this, x.VERBOSE, ...e),
        this._logHandler(this, x.VERBOSE, ...e));
    }
    info(...e) {
      (this._userLogHandler && this._userLogHandler(this, x.INFO, ...e),
        this._logHandler(this, x.INFO, ...e));
    }
    warn(...e) {
      (this._userLogHandler && this._userLogHandler(this, x.WARN, ...e),
        this._logHandler(this, x.WARN, ...e));
    }
    error(...e) {
      (this._userLogHandler && this._userLogHandler(this, x.ERROR, ...e),
        this._logHandler(this, x.ERROR, ...e));
    }
  },
  Ye = (e, t) => t.some((t) => e instanceof t),
  Xe,
  Ze;
function Qe() {
  return (Xe ||= [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function $e() {
  return (Ze ||= [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey,
  ]);
}
var et = new WeakMap(),
  tt = new WeakMap(),
  nt = new WeakMap(),
  S = new WeakMap(),
  rt = new WeakMap();
function it(e) {
  let t = new Promise((t, n) => {
    let r = () => {
        (e.removeEventListener(`success`, i), e.removeEventListener(`error`, a));
      },
      i = () => {
        (t(ut(e.result)), r());
      },
      a = () => {
        (n(e.error), r());
      };
    (e.addEventListener(`success`, i), e.addEventListener(`error`, a));
  });
  return (
    t
      .then((t) => {
        t instanceof IDBCursor && et.set(t, e);
      })
      .catch(() => {}),
    rt.set(t, e),
    t
  );
}
function at(e) {
  if (tt.has(e)) return;
  let t = new Promise((t, n) => {
    let r = () => {
        (e.removeEventListener(`complete`, i),
          e.removeEventListener(`error`, a),
          e.removeEventListener(`abort`, a));
      },
      i = () => {
        (t(), r());
      },
      a = () => {
        (n(e.error || new DOMException(`AbortError`, `AbortError`)), r());
      };
    (e.addEventListener(`complete`, i),
      e.addEventListener(`error`, a),
      e.addEventListener(`abort`, a));
  });
  tt.set(e, t);
}
var ot = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === `done`) return tt.get(e);
      if (t === `objectStoreNames`) return e.objectStoreNames || nt.get(e);
      if (t === `store`)
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return ut(e[t]);
  },
  set(e, t, n) {
    return ((e[t] = n), !0);
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === `done` || t === `store`) ? !0 : t in e;
  },
};
function st(e) {
  ot = e(ot);
}
function ct(e) {
  return e === IDBDatabase.prototype.transaction &&
    !(`objectStoreNames` in IDBTransaction.prototype)
    ? function (t, ...n) {
        let r = e.call(dt(this), t, ...n);
        return (nt.set(r, t.sort ? t.sort() : [t]), ut(r));
      }
    : $e().includes(e)
      ? function (...t) {
          return (e.apply(dt(this), t), ut(et.get(this)));
        }
      : function (...t) {
          return ut(e.apply(dt(this), t));
        };
}
function lt(e) {
  return typeof e == `function`
    ? ct(e)
    : (e instanceof IDBTransaction && at(e), Ye(e, Qe()) ? new Proxy(e, ot) : e);
}
function ut(e) {
  if (e instanceof IDBRequest) return it(e);
  if (S.has(e)) return S.get(e);
  let t = lt(e);
  return (t !== e && (S.set(e, t), rt.set(t, e)), t);
}
var dt = (e) => rt.get(e);
function ft(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
  let o = indexedDB.open(e, t),
    s = ut(o);
  return (
    r &&
      o.addEventListener(`upgradeneeded`, (e) => {
        r(ut(o.result), e.oldVersion, e.newVersion, ut(o.transaction), e);
      }),
    n && o.addEventListener(`blocked`, (e) => n(e.oldVersion, e.newVersion, e)),
    s
      .then((e) => {
        (a && e.addEventListener(`close`, () => a()),
          i && e.addEventListener(`versionchange`, (e) => i(e.oldVersion, e.newVersion, e)));
      })
      .catch(() => {}),
    s
  );
}
var pt = [`get`, `getKey`, `getAll`, `getAllKeys`, `count`],
  mt = [`put`, `add`, `delete`, `clear`],
  ht = new Map();
function gt(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == `string`)) return;
  if (ht.get(t)) return ht.get(t);
  let n = t.replace(/FromIndex$/, ``),
    r = t !== n,
    i = mt.includes(n);
  if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || pt.includes(n))) return;
  let a = async function (e, ...t) {
    let a = this.transaction(e, i ? `readwrite` : `readonly`),
      o = a.store;
    return (r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0]);
  };
  return (ht.set(t, a), a);
}
st((e) => ({
  ...e,
  get: (t, n, r) => gt(t, n) || e.get(t, n, r),
  has: (t, n) => !!gt(t, n) || e.has(t, n),
}));
var _t = class {
  constructor(e) {
    this.container = e;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((e) => {
        if (vt(e)) {
          let t = e.getImmediate();
          return `${t.library}/${t.version}`;
        } else return null;
      })
      .filter((e) => e)
      .join(` `);
  }
};
function vt(e) {
  return e.getComponent()?.type === `VERSION`;
}
var yt = `@firebase/app`,
  bt = `0.14.7`,
  xt = new Je(`@firebase/app`),
  St = `@firebase/app-compat`,
  Ct = `@firebase/analytics-compat`,
  wt = `@firebase/analytics`,
  Tt = `@firebase/app-check-compat`,
  Et = `@firebase/app-check`,
  Dt = `@firebase/auth`,
  Ot = `@firebase/auth-compat`,
  kt = `@firebase/database`,
  At = `@firebase/data-connect`,
  jt = `@firebase/database-compat`,
  Mt = `@firebase/functions`,
  Nt = `@firebase/functions-compat`,
  Pt = `@firebase/installations`,
  Ft = `@firebase/installations-compat`,
  It = `@firebase/messaging`,
  Lt = `@firebase/messaging-compat`,
  Rt = `@firebase/performance`,
  zt = `@firebase/performance-compat`,
  Bt = `@firebase/remote-config`,
  Vt = `@firebase/remote-config-compat`,
  Ht = `@firebase/storage`,
  Ut = `@firebase/storage-compat`,
  Wt = `@firebase/firestore`,
  Gt = `@firebase/ai`,
  Kt = `@firebase/firestore-compat`,
  C = `firebase`,
  qt = `12.8.0`,
  Jt = `[DEFAULT]`,
  Yt = {
    [yt]: `fire-core`,
    [St]: `fire-core-compat`,
    [wt]: `fire-analytics`,
    [Ct]: `fire-analytics-compat`,
    [Et]: `fire-app-check`,
    [Tt]: `fire-app-check-compat`,
    [Dt]: `fire-auth`,
    [Ot]: `fire-auth-compat`,
    [kt]: `fire-rtdb`,
    [At]: `fire-data-connect`,
    [jt]: `fire-rtdb-compat`,
    [Mt]: `fire-fn`,
    [Nt]: `fire-fn-compat`,
    [Pt]: `fire-iid`,
    [Ft]: `fire-iid-compat`,
    [It]: `fire-fcm`,
    [Lt]: `fire-fcm-compat`,
    [Rt]: `fire-perf`,
    [zt]: `fire-perf-compat`,
    [Bt]: `fire-rc`,
    [Vt]: `fire-rc-compat`,
    [Ht]: `fire-gcs`,
    [Ut]: `fire-gcs-compat`,
    [Wt]: `fire-fst`,
    [Kt]: `fire-fst-compat`,
    [Gt]: `fire-vertex`,
    "fire-js": `fire-js`,
    [C]: `fire-js-all`,
  },
  Xt = new Map(),
  Zt = new Map(),
  Qt = new Map();
function $t(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    xt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
  }
}
function en(e) {
  let t = e.name;
  if (Qt.has(t)) return (xt.debug(`There were multiple attempts to register component ${t}.`), !1);
  Qt.set(t, e);
  for (let t of Xt.values()) $t(t, e);
  for (let t of Zt.values()) $t(t, e);
  return !0;
}
function tn(e, t) {
  let n = e.container.getProvider(`heartbeat`).getImmediate({ optional: !0 });
  return (n && n.triggerHeartbeat(), e.container.getProvider(t));
}
function w(e) {
  return e == null ? !1 : e.settings !== void 0;
}
var nn = new be(`app`, `Firebase`, {
    "no-app": `No Firebase App '{$appName}' has been created - call initializeApp() first`,
    "bad-app-name": `Illegal App name: '{$appName}'`,
    "duplicate-app": `Firebase App named '{$appName}' already exists with different options or config`,
    "app-deleted": `Firebase App named '{$appName}' already deleted`,
    "server-app-deleted": `Firebase Server App has been deleted`,
    "no-options": `Need to provide options, when not being deployed to hosting via source.`,
    "invalid-app-argument": `firebase.{$appName}() takes either no argument or a Firebase App instance.`,
    "invalid-log-argument": "First argument to `onLog` must be null or a function.",
    "idb-open": `Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.`,
    "idb-get": `Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.`,
    "idb-set": `Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.`,
    "idb-delete": `Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.`,
    "finalization-registry-not-supported": `FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.`,
    "invalid-server-app-environment": `FirebaseServerApp is not for use in browser environments.`,
  }),
  rn = class {
    constructor(e, t, n) {
      ((this._isDeleted = !1),
        (this._options = { ...e }),
        (this._config = { ...t }),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled),
        (this._container = n),
        this.container.addComponent(new Le(`app`, () => this, `PUBLIC`)));
    }
    get automaticDataCollectionEnabled() {
      return (this.checkDestroyed(), this._automaticDataCollectionEnabled);
    }
    set automaticDataCollectionEnabled(e) {
      (this.checkDestroyed(), (this._automaticDataCollectionEnabled = e));
    }
    get name() {
      return (this.checkDestroyed(), this._name);
    }
    get options() {
      return (this.checkDestroyed(), this._options);
    }
    get config() {
      return (this.checkDestroyed(), this._config);
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted) throw nn.create(`app-deleted`, { appName: this._name });
    }
  },
  an = qt;
function on(e, t = {}) {
  let n = e;
  typeof t != `object` && (t = { name: t });
  let r = { name: Jt, automaticDataCollectionEnabled: !0, ...t },
    i = r.name;
  if (typeof i != `string` || !i) throw nn.create(`bad-app-name`, { appName: String(i) });
  if (((n ||= h()), !n)) throw nn.create(`no-options`);
  let a = Xt.get(i);
  if (a) {
    if (we(n, a.options) && we(r, a.config)) return a;
    throw nn.create(`duplicate-app`, { appName: i });
  }
  let o = new He(i);
  for (let e of Qt.values()) o.addComponent(e);
  let s = new rn(n, r, o);
  return (Xt.set(i, s), s);
}
function sn(e = Jt) {
  let t = Xt.get(e);
  if (!t && e === `[DEFAULT]` && h()) return on();
  if (!t) throw nn.create(`no-app`, { appName: e });
  return t;
}
function T(e, t, n) {
  let r = Yt[e] ?? e;
  n && (r += `-${n}`);
  let i = r.match(/\s|\//),
    a = t.match(/\s|\//);
  if (i || a) {
    let e = [`Unable to register library "${r}" with version "${t}":`];
    (i && e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),
      i && a && e.push(`and`),
      a && e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
      xt.warn(e.join(` `)));
    return;
  }
  en(new Le(`${r}-version`, () => ({ library: r, version: t }), `VERSION`));
}
var cn = `firebase-heartbeat-database`,
  ln = 1,
  un = `firebase-heartbeat-store`,
  dn = null;
function fn() {
  return (
    (dn ||= ft(cn, ln, {
      upgrade: (e, t) => {
        switch (t) {
          case 0:
            try {
              e.createObjectStore(un);
            } catch (e) {
              console.warn(e);
            }
        }
      },
    }).catch((e) => {
      throw nn.create(`idb-open`, { originalErrorMessage: e.message });
    })),
    dn
  );
}
async function pn(e) {
  try {
    let t = (await fn()).transaction(un),
      n = await t.objectStore(un).get(hn(e));
    return (await t.done, n);
  } catch (e) {
    if (e instanceof ye) xt.warn(e.message);
    else {
      let t = nn.create(`idb-get`, { originalErrorMessage: e?.message });
      xt.warn(t.message);
    }
  }
}
async function mn(e, t) {
  try {
    let n = (await fn()).transaction(un, `readwrite`);
    (await n.objectStore(un).put(t, hn(e)), await n.done);
  } catch (e) {
    if (e instanceof ye) xt.warn(e.message);
    else {
      let t = nn.create(`idb-set`, { originalErrorMessage: e?.message });
      xt.warn(t.message);
    }
  }
}
function hn(e) {
  return `${e.name}!${e.options.appId}`;
}
var gn = 1024,
  _n = 30,
  vn = class {
    constructor(e) {
      ((this.container = e),
        (this._heartbeatsCache = null),
        (this._storage = new E(this.container.getProvider(`app`).getImmediate())),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => ((this._heartbeatsCache = e), e))));
    }
    async triggerHeartbeat() {
      try {
        let e = this.container
            .getProvider(`platform-logger`)
            .getImmediate()
            .getPlatformInfoString(),
          t = yn();
        if (
          (this._heartbeatsCache?.heartbeats == null &&
            ((this._heartbeatsCache = await this._heartbeatsCachePromise),
            this._heartbeatsCache?.heartbeats == null)) ||
          this._heartbeatsCache.lastSentHeartbeatDate === t ||
          this._heartbeatsCache.heartbeats.some((e) => e.date === t)
        )
          return;
        if (
          (this._heartbeatsCache.heartbeats.push({ date: t, agent: e }),
          this._heartbeatsCache.heartbeats.length > _n)
        ) {
          let e = Sn(this._heartbeatsCache.heartbeats);
          this._heartbeatsCache.heartbeats.splice(e, 1);
        }
        return this._storage.overwrite(this._heartbeatsCache);
      } catch (e) {
        xt.warn(e);
      }
    }
    async getHeartbeatsHeader() {
      try {
        if (
          (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
          this._heartbeatsCache?.heartbeats == null ||
            this._heartbeatsCache.heartbeats.length === 0)
        )
          return ``;
        let e = yn(),
          { heartbeatsToSend: t, unsentEntries: n } = bn(this._heartbeatsCache.heartbeats),
          r = o(JSON.stringify({ version: 2, heartbeats: t }));
        return (
          (this._heartbeatsCache.lastSentHeartbeatDate = e),
          n.length > 0
            ? ((this._heartbeatsCache.heartbeats = n),
              await this._storage.overwrite(this._heartbeatsCache))
            : ((this._heartbeatsCache.heartbeats = []),
              this._storage.overwrite(this._heartbeatsCache)),
          r
        );
      } catch (e) {
        return (xt.warn(e), ``);
      }
    }
  };
function yn() {
  return new Date().toISOString().substring(0, 10);
}
function bn(e, t = gn) {
  let n = [],
    r = e.slice();
  for (let i of e) {
    let e = n.find((e) => e.agent === i.agent);
    if (e) {
      if ((e.dates.push(i.date), xn(n) > t)) {
        e.dates.pop();
        break;
      }
    } else if ((n.push({ agent: i.agent, dates: [i.date] }), xn(n) > t)) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: n, unsentEntries: r };
}
var E = class {
  constructor(e) {
    ((this.app = e), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()));
  }
  async runIndexedDBEnvironmentCheck() {
    return he()
      ? ge()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      let e = await pn(this.app);
      return e?.heartbeats ? e : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      let t = await this.read();
      return mn(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? t.lastSentHeartbeatDate,
        heartbeats: e.heartbeats,
      });
    } else return;
  }
  async add(e) {
    if (await this._canUseIndexedDBPromise) {
      let t = await this.read();
      return mn(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? t.lastSentHeartbeatDate,
        heartbeats: [...t.heartbeats, ...e.heartbeats],
      });
    } else return;
  }
};
function xn(e) {
  return o(JSON.stringify({ version: 2, heartbeats: e })).length;
}
function Sn(e) {
  if (e.length === 0) return -1;
  let t = 0,
    n = e[0].date;
  for (let r = 1; r < e.length; r++) e[r].date < n && ((n = e[r].date), (t = r));
  return t;
}
function Cn(e) {
  (en(new Le(`platform-logger`, (e) => new _t(e), `PRIVATE`)),
    en(new Le(`heartbeat`, (e) => new vn(e), `PRIVATE`)),
    T(yt, bt, e),
    T(yt, bt, `esm2020`),
    T(`fire-js`, ``));
}
(Cn(``), T(`firebase`, `12.8.0`, `app`));
function wn() {
  return {
    "dependent-sdk-initialized-before-auth":
      "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
  };
}
var Tn = wn,
  En = new be(`auth`, `Firebase`, wn()),
  Dn = new Je(`@firebase/auth`);
function On(e, ...t) {
  Dn.logLevel <= x.WARN && Dn.warn(`Auth (${an}): ${e}`, ...t);
}
function kn(e, ...t) {
  Dn.logLevel <= x.ERROR && Dn.error(`Auth (${an}): ${e}`, ...t);
}
function D(e, ...t) {
  throw Pn(e, ...t);
}
function An(e, ...t) {
  return Pn(e, ...t);
}
function jn(e, t, n) {
  return new be(`auth`, `Firebase`, { ...Tn(), [t]: n }).create(t, { appName: e.name });
}
function Mn(e) {
  return jn(
    e,
    `operation-not-supported-in-this-environment`,
    `Operations that alter the current user are not supported in conjunction with FirebaseServerApp`
  );
}
function Nn(e, t, n) {
  let r = n;
  if (!(t instanceof r))
    throw (
      r.name !== t.constructor.name && D(e, `argument-error`),
      jn(
        e,
        `argument-error`,
        `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
      )
    );
}
function Pn(e, ...t) {
  if (typeof e != `string`) {
    let n = t[0],
      r = [...t.slice(1)];
    return (r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r));
  }
  return En.create(e, ...t);
}
function O(e, t, ...n) {
  if (!e) throw Pn(t, ...n);
}
function Fn(e) {
  let t = `INTERNAL ASSERTION FAILED: ` + e;
  throw (kn(t), Error(t));
}
function In(e, t) {
  e || Fn(t);
}
function Ln() {
  return (typeof self < `u` && self.location?.href) || ``;
}
function Rn() {
  return zn() === `http:` || zn() === `https:`;
}
function zn() {
  return (typeof self < `u` && self.location?.protocol) || null;
}
function Bn() {
  return typeof navigator < `u` &&
    navigator &&
    `onLine` in navigator &&
    typeof navigator.onLine == `boolean` &&
    (Rn() || de() || `connection` in navigator)
    ? navigator.onLine
    : !0;
}
function Vn() {
  if (typeof navigator > `u`) return null;
  let e = navigator;
  return (e.languages && e.languages[0]) || e.language || null;
}
var Hn = class {
  constructor(e, t) {
    ((this.shortDelay = e),
      (this.longDelay = t),
      In(t > e, `Short delay should be less than long delay!`),
      (this.isMobile = v() || fe()));
  }
  get() {
    return Bn()
      ? this.isMobile
        ? this.longDelay
        : this.shortDelay
      : Math.min(5e3, this.shortDelay);
  }
};
function Un(e, t) {
  In(e.emulator, `Emulator should always be set here`);
  let { url: n } = e.emulator;
  return t ? `${n}${t.startsWith(`/`) ? t.slice(1) : t}` : n;
}
var Wn = class {
    static initialize(e, t, n) {
      ((this.fetchImpl = e), t && (this.headersImpl = t), n && (this.responseImpl = n));
    }
    static fetch() {
      if (this.fetchImpl) return this.fetchImpl;
      if (typeof self < `u` && `fetch` in self) return self.fetch;
      if (typeof globalThis < `u` && globalThis.fetch) return globalThis.fetch;
      if (typeof fetch < `u`) return fetch;
      Fn(
        `Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`
      );
    }
    static headers() {
      if (this.headersImpl) return this.headersImpl;
      if (typeof self < `u` && `Headers` in self) return self.Headers;
      if (typeof globalThis < `u` && globalThis.Headers) return globalThis.Headers;
      if (typeof Headers < `u`) return Headers;
      Fn(
        `Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`
      );
    }
    static response() {
      if (this.responseImpl) return this.responseImpl;
      if (typeof self < `u` && `Response` in self) return self.Response;
      if (typeof globalThis < `u` && globalThis.Response) return globalThis.Response;
      if (typeof Response < `u`) return Response;
      Fn(
        `Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`
      );
    }
  },
  Gn = {
    CREDENTIAL_MISMATCH: `custom-token-mismatch`,
    MISSING_CUSTOM_TOKEN: `internal-error`,
    INVALID_IDENTIFIER: `invalid-email`,
    MISSING_CONTINUE_URI: `internal-error`,
    INVALID_PASSWORD: `wrong-password`,
    MISSING_PASSWORD: `missing-password`,
    INVALID_LOGIN_CREDENTIALS: `invalid-credential`,
    EMAIL_EXISTS: `email-already-in-use`,
    PASSWORD_LOGIN_DISABLED: `operation-not-allowed`,
    INVALID_IDP_RESPONSE: `invalid-credential`,
    INVALID_PENDING_TOKEN: `invalid-credential`,
    FEDERATED_USER_ID_ALREADY_LINKED: `credential-already-in-use`,
    MISSING_REQ_TYPE: `internal-error`,
    EMAIL_NOT_FOUND: `user-not-found`,
    RESET_PASSWORD_EXCEED_LIMIT: `too-many-requests`,
    EXPIRED_OOB_CODE: `expired-action-code`,
    INVALID_OOB_CODE: `invalid-action-code`,
    MISSING_OOB_CODE: `internal-error`,
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: `requires-recent-login`,
    INVALID_ID_TOKEN: `invalid-user-token`,
    TOKEN_EXPIRED: `user-token-expired`,
    USER_NOT_FOUND: `user-token-expired`,
    TOO_MANY_ATTEMPTS_TRY_LATER: `too-many-requests`,
    PASSWORD_DOES_NOT_MEET_REQUIREMENTS: `password-does-not-meet-requirements`,
    INVALID_CODE: `invalid-verification-code`,
    INVALID_SESSION_INFO: `invalid-verification-id`,
    INVALID_TEMPORARY_PROOF: `invalid-credential`,
    MISSING_SESSION_INFO: `missing-verification-id`,
    SESSION_EXPIRED: `code-expired`,
    MISSING_ANDROID_PACKAGE_NAME: `missing-android-pkg-name`,
    UNAUTHORIZED_DOMAIN: `unauthorized-continue-uri`,
    INVALID_OAUTH_CLIENT_ID: `invalid-oauth-client-id`,
    ADMIN_ONLY_OPERATION: `admin-restricted-operation`,
    INVALID_MFA_PENDING_CREDENTIAL: `invalid-multi-factor-session`,
    MFA_ENROLLMENT_NOT_FOUND: `multi-factor-info-not-found`,
    MISSING_MFA_ENROLLMENT_ID: `missing-multi-factor-info`,
    MISSING_MFA_PENDING_CREDENTIAL: `missing-multi-factor-session`,
    SECOND_FACTOR_EXISTS: `second-factor-already-in-use`,
    SECOND_FACTOR_LIMIT_EXCEEDED: `maximum-second-factor-count-exceeded`,
    BLOCKING_FUNCTION_ERROR_RESPONSE: `internal-error`,
    RECAPTCHA_NOT_ENABLED: `recaptcha-not-enabled`,
    MISSING_RECAPTCHA_TOKEN: `missing-recaptcha-token`,
    INVALID_RECAPTCHA_TOKEN: `invalid-recaptcha-token`,
    INVALID_RECAPTCHA_ACTION: `invalid-recaptcha-action`,
    MISSING_CLIENT_TYPE: `missing-client-type`,
    MISSING_RECAPTCHA_VERSION: `missing-recaptcha-version`,
    INVALID_RECAPTCHA_VERSION: `invalid-recaptcha-version`,
    INVALID_REQ_TYPE: `invalid-req-type`,
  },
  Kn = [
    `/v1/accounts:signInWithCustomToken`,
    `/v1/accounts:signInWithEmailLink`,
    `/v1/accounts:signInWithIdp`,
    `/v1/accounts:signInWithPassword`,
    `/v1/accounts:signInWithPhoneNumber`,
    `/v1/token`,
  ],
  qn = new Hn(3e4, 6e4);
function k(e, t) {
  return e.tenantId && !t.tenantId ? { ...t, tenantId: e.tenantId } : t;
}
async function A(e, t, n, r, i = {}) {
  return Jn(e, i, async () => {
    let i = {},
      a = {};
    r && (t === `GET` ? (a = r) : (i = { body: JSON.stringify(r) }));
    let o = Ee({ key: e.config.apiKey, ...a }).slice(1),
      s = await e._getAdditionalHeaders();
    ((s[`Content-Type`] = `application/json`),
      e.languageCode && (s[`X-Firebase-Locale`] = e.languageCode));
    let c = { method: t, headers: s, ...i };
    return (
      ue() || (c.referrerPolicy = `no-referrer`),
      e.emulatorConfig && te(e.emulatorConfig.host) && (c.credentials = `include`),
      Wn.fetch()(await Yn(e, e.config.apiHost, n, o), c)
    );
  });
}
async function Jn(e, t, n) {
  e._canInitEmulator = !1;
  let r = { ...Gn, ...t };
  try {
    let t = new Zn(e),
      i = await Promise.race([n(), t.promise]);
    t.clearNetworkTimeout();
    let a = await i.json();
    if (`needConfirmation` in a) throw Qn(e, `account-exists-with-different-credential`, a);
    if (i.ok && !(`errorMessage` in a)) return a;
    {
      let [t, n] = (i.ok ? a.errorMessage : a.error.message).split(` : `);
      if (t === `FEDERATED_USER_ID_ALREADY_LINKED`) throw Qn(e, `credential-already-in-use`, a);
      if (t === `EMAIL_EXISTS`) throw Qn(e, `email-already-in-use`, a);
      if (t === `USER_DISABLED`) throw Qn(e, `user-disabled`, a);
      let o = r[t] || t.toLowerCase().replace(/[_\s]+/g, `-`);
      if (n) throw jn(e, o, n);
      D(e, o);
    }
  } catch (t) {
    if (t instanceof ye) throw t;
    D(e, `network-request-failed`, { message: String(t) });
  }
}
async function j(e, t, n, r, i = {}) {
  let a = await A(e, t, n, r, i);
  return (
    `mfaPendingCredential` in a && D(e, `multi-factor-auth-required`, { _serverResponse: a }),
    a
  );
}
async function Yn(e, t, n, r) {
  let i = `${t}${n}?${r}`,
    a = e,
    o = a.config.emulator ? Un(e.config, i) : `${e.config.apiScheme}://${i}`;
  return Kn.includes(n) &&
    (await a._persistenceManagerAvailable, a._getPersistenceType() === `COOKIE`)
    ? a._getPersistence()._getFinalTarget(o).toString()
    : o;
}
function Xn(e) {
  switch (e) {
    case `ENFORCE`:
      return `ENFORCE`;
    case `AUDIT`:
      return `AUDIT`;
    case `OFF`:
      return `OFF`;
    default:
      return `ENFORCEMENT_STATE_UNSPECIFIED`;
  }
}
var Zn = class {
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
  constructor(e) {
    ((this.auth = e),
      (this.timer = null),
      (this.promise = new Promise((e, t) => {
        this.timer = setTimeout(() => t(An(this.auth, `network-request-failed`)), qn.get());
      })));
  }
};
function Qn(e, t, n) {
  let r = { appName: e.name };
  (n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber));
  let i = An(e, t, r);
  return ((i.customData._tokenResponse = n), i);
}
function $n(e) {
  return e !== void 0 && e.enterprise !== void 0;
}
var er = class {
  constructor(e) {
    if (((this.siteKey = ``), (this.recaptchaEnforcementState = []), e.recaptchaKey === void 0))
      throw Error(`recaptchaKey undefined`);
    ((this.siteKey = e.recaptchaKey.split(`/`)[3]),
      (this.recaptchaEnforcementState = e.recaptchaEnforcementState));
  }
  getProviderEnforcementState(e) {
    if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
    for (let t of this.recaptchaEnforcementState)
      if (t.provider && t.provider === e) return Xn(t.enforcementState);
    return null;
  }
  isProviderEnabled(e) {
    return (
      this.getProviderEnforcementState(e) === `ENFORCE` ||
      this.getProviderEnforcementState(e) === `AUDIT`
    );
  }
  isAnyProviderEnabled() {
    return (
      this.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`) || this.isProviderEnabled(`PHONE_PROVIDER`)
    );
  }
};
async function tr(e, t) {
  return A(e, `GET`, `/v2/recaptchaConfig`, k(e, t));
}
async function nr(e, t) {
  return A(e, `POST`, `/v1/accounts:delete`, t);
}
async function rr(e, t) {
  return A(e, `POST`, `/v1/accounts:lookup`, t);
}
function ir(e) {
  if (e)
    try {
      let t = new Date(Number(e));
      if (!isNaN(t.getTime())) return t.toUTCString();
    } catch {}
}
async function ar(e, t = !1) {
  let n = b(e),
    r = await n.getIdToken(t),
    i = sr(r);
  O(i && i.exp && i.auth_time && i.iat, n.auth, `internal-error`);
  let a = typeof i.firebase == `object` ? i.firebase : void 0,
    o = a?.sign_in_provider;
  return {
    claims: i,
    token: r,
    authTime: ir(or(i.auth_time)),
    issuedAtTime: ir(or(i.iat)),
    expirationTime: ir(or(i.exp)),
    signInProvider: o || null,
    signInSecondFactor: a?.sign_in_second_factor || null,
  };
}
function or(e) {
  return Number(e) * 1e3;
}
function sr(e) {
  let [t, n, r] = e.split(`.`);
  if (t === void 0 || n === void 0 || r === void 0)
    return (kn(`JWT malformed, contained fewer than 3 sections`), null);
  try {
    let e = s(n);
    return e ? JSON.parse(e) : (kn(`Failed to decode base64 JWT payload`), null);
  } catch (e) {
    return (kn(`Caught error parsing JWT payload as JSON`, e?.toString()), null);
  }
}
function cr(e) {
  let t = sr(e);
  return (
    O(t, `internal-error`),
    O(t.exp !== void 0, `internal-error`),
    O(t.iat !== void 0, `internal-error`),
    Number(t.exp) - Number(t.iat)
  );
}
async function lr(e, t, n = !1) {
  if (n) return t;
  try {
    return await t;
  } catch (t) {
    throw (t instanceof ye && ur(t) && e.auth.currentUser === e && (await e.auth.signOut()), t);
  }
}
function ur({ code: e }) {
  return e === `auth/user-disabled` || e === `auth/user-token-expired`;
}
var dr = class {
    constructor(e) {
      ((this.user = e), (this.isRunning = !1), (this.timerId = null), (this.errorBackoff = 3e4));
    }
    _start() {
      this.isRunning || ((this.isRunning = !0), this.schedule());
    }
    _stop() {
      this.isRunning &&
        ((this.isRunning = !1), this.timerId !== null && clearTimeout(this.timerId));
    }
    getInterval(e) {
      if (e) {
        let e = this.errorBackoff;
        return ((this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4)), e);
      } else {
        this.errorBackoff = 3e4;
        let e = (this.user.stsTokenManager.expirationTime ?? 0) - Date.now() - 3e5;
        return Math.max(0, e);
      }
    }
    schedule(e = !1) {
      if (!this.isRunning) return;
      let t = this.getInterval(e);
      this.timerId = setTimeout(async () => {
        await this.iteration();
      }, t);
    }
    async iteration() {
      try {
        await this.user.getIdToken(!0);
      } catch (e) {
        e?.code === `auth/network-request-failed` && this.schedule(!0);
        return;
      }
      this.schedule();
    }
  },
  fr = class {
    constructor(e, t) {
      ((this.createdAt = e), (this.lastLoginAt = t), this._initializeTime());
    }
    _initializeTime() {
      ((this.lastSignInTime = ir(this.lastLoginAt)), (this.creationTime = ir(this.createdAt)));
    }
    _copy(e) {
      ((this.createdAt = e.createdAt), (this.lastLoginAt = e.lastLoginAt), this._initializeTime());
    }
    toJSON() {
      return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
    }
  };
async function pr(e) {
  let t = e.auth,
    n = await lr(e, rr(t, { idToken: await e.getIdToken() }));
  O(n?.users.length, t, `internal-error`);
  let r = n.users[0];
  e._notifyReloadListener(r);
  let i = r.providerUserInfo?.length ? gr(r.providerUserInfo) : [],
    a = hr(e.providerData, i),
    o = e.isAnonymous,
    s = !(e.email && r.passwordHash) && !a?.length,
    c = o ? s : !1,
    l = {
      uid: r.localId,
      displayName: r.displayName || null,
      photoURL: r.photoUrl || null,
      email: r.email || null,
      emailVerified: r.emailVerified || !1,
      phoneNumber: r.phoneNumber || null,
      tenantId: r.tenantId || null,
      providerData: a,
      metadata: new fr(r.createdAt, r.lastLoginAt),
      isAnonymous: c,
    };
  Object.assign(e, l);
}
async function mr(e) {
  let t = b(e);
  (await pr(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t));
}
function hr(e, t) {
  return [...e.filter((e) => !t.some((t) => t.providerId === e.providerId)), ...t];
}
function gr(e) {
  return e.map(({ providerId: e, ...t }) => ({
    providerId: e,
    uid: t.rawId || ``,
    displayName: t.displayName || null,
    email: t.email || null,
    phoneNumber: t.phoneNumber || null,
    photoURL: t.photoUrl || null,
  }));
}
async function _r(e, t) {
  let n = await Jn(e, {}, async () => {
    let n = Ee({ grant_type: `refresh_token`, refresh_token: t }).slice(1),
      { tokenApiHost: r, apiKey: i } = e.config,
      a = await Yn(e, r, `/v1/token`, `key=${i}`),
      o = await e._getAdditionalHeaders();
    o[`Content-Type`] = `application/x-www-form-urlencoded`;
    let s = { method: `POST`, headers: o, body: n };
    return (
      e.emulatorConfig && te(e.emulatorConfig.host) && (s.credentials = `include`),
      Wn.fetch()(a, s)
    );
  });
  return { accessToken: n.access_token, expiresIn: n.expires_in, refreshToken: n.refresh_token };
}
async function vr(e, t) {
  return A(e, `POST`, `/v2/accounts:revokeToken`, k(e, t));
}
var yr = class e {
  constructor() {
    ((this.refreshToken = null), (this.accessToken = null), (this.expirationTime = null));
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(e) {
    (O(e.idToken, `internal-error`),
      O(e.idToken !== void 0, `internal-error`),
      O(e.refreshToken !== void 0, `internal-error`));
    let t = `expiresIn` in e && e.expiresIn !== void 0 ? Number(e.expiresIn) : cr(e.idToken);
    this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
  }
  updateFromIdToken(e) {
    O(e.length !== 0, `internal-error`);
    let t = cr(e);
    this.updateTokensAndExpiration(e, null, t);
  }
  async getToken(e, t = !1) {
    return !t && this.accessToken && !this.isExpired
      ? this.accessToken
      : (O(this.refreshToken, e, `user-token-expired`),
        this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null);
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(e, t) {
    let { accessToken: n, refreshToken: r, expiresIn: i } = await _r(e, t);
    this.updateTokensAndExpiration(n, r, Number(i));
  }
  updateTokensAndExpiration(e, t, n) {
    ((this.refreshToken = t || null),
      (this.accessToken = e || null),
      (this.expirationTime = Date.now() + n * 1e3));
  }
  static fromJSON(t, n) {
    let { refreshToken: r, accessToken: i, expirationTime: a } = n,
      o = new e();
    return (
      r && (O(typeof r == `string`, `internal-error`, { appName: t }), (o.refreshToken = r)),
      i && (O(typeof i == `string`, `internal-error`, { appName: t }), (o.accessToken = i)),
      a && (O(typeof a == `number`, `internal-error`, { appName: t }), (o.expirationTime = a)),
      o
    );
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime,
    };
  }
  _assign(e) {
    ((this.accessToken = e.accessToken),
      (this.refreshToken = e.refreshToken),
      (this.expirationTime = e.expirationTime));
  }
  _clone() {
    return Object.assign(new e(), this.toJSON());
  }
  _performRefresh() {
    return Fn(`not implemented`);
  }
};
function br(e, t) {
  O(typeof e == `string` || e === void 0, `internal-error`, { appName: t });
}
var xr = class e {
    constructor({ uid: e, auth: t, stsTokenManager: n, ...r }) {
      ((this.providerId = `firebase`),
        (this.proactiveRefresh = new dr(this)),
        (this.reloadUserInfo = null),
        (this.reloadListener = null),
        (this.uid = e),
        (this.auth = t),
        (this.stsTokenManager = n),
        (this.accessToken = n.accessToken),
        (this.displayName = r.displayName || null),
        (this.email = r.email || null),
        (this.emailVerified = r.emailVerified || !1),
        (this.phoneNumber = r.phoneNumber || null),
        (this.photoURL = r.photoURL || null),
        (this.isAnonymous = r.isAnonymous || !1),
        (this.tenantId = r.tenantId || null),
        (this.providerData = r.providerData ? [...r.providerData] : []),
        (this.metadata = new fr(r.createdAt || void 0, r.lastLoginAt || void 0)));
    }
    async getIdToken(e) {
      let t = await lr(this, this.stsTokenManager.getToken(this.auth, e));
      return (
        O(t, this.auth, `internal-error`),
        this.accessToken !== t &&
          ((this.accessToken = t),
          await this.auth._persistUserIfCurrent(this),
          this.auth._notifyListenersIfCurrent(this)),
        t
      );
    }
    getIdTokenResult(e) {
      return ar(this, e);
    }
    reload() {
      return mr(this);
    }
    _assign(e) {
      this !== e &&
        (O(this.uid === e.uid, this.auth, `internal-error`),
        (this.displayName = e.displayName),
        (this.photoURL = e.photoURL),
        (this.email = e.email),
        (this.emailVerified = e.emailVerified),
        (this.phoneNumber = e.phoneNumber),
        (this.isAnonymous = e.isAnonymous),
        (this.tenantId = e.tenantId),
        (this.providerData = e.providerData.map((e) => ({ ...e }))),
        this.metadata._copy(e.metadata),
        this.stsTokenManager._assign(e.stsTokenManager));
    }
    _clone(t) {
      let n = new e({ ...this, auth: t, stsTokenManager: this.stsTokenManager._clone() });
      return (n.metadata._copy(this.metadata), n);
    }
    _onReload(e) {
      (O(!this.reloadListener, this.auth, `internal-error`),
        (this.reloadListener = e),
        (this.reloadUserInfo &&= (this._notifyReloadListener(this.reloadUserInfo), null)));
    }
    _notifyReloadListener(e) {
      this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
    }
    _startProactiveRefresh() {
      this.proactiveRefresh._start();
    }
    _stopProactiveRefresh() {
      this.proactiveRefresh._stop();
    }
    async _updateTokensIfNecessary(e, t = !1) {
      let n = !1;
      (e.idToken &&
        e.idToken !== this.stsTokenManager.accessToken &&
        (this.stsTokenManager.updateFromServerResponse(e), (n = !0)),
        t && (await pr(this)),
        await this.auth._persistUserIfCurrent(this),
        n && this.auth._notifyListenersIfCurrent(this));
    }
    async delete() {
      if (w(this.auth.app)) return Promise.reject(Mn(this.auth));
      let e = await this.getIdToken();
      return (
        await lr(this, nr(this.auth, { idToken: e })),
        this.stsTokenManager.clearRefreshToken(),
        this.auth.signOut()
      );
    }
    toJSON() {
      return {
        uid: this.uid,
        email: this.email || void 0,
        emailVerified: this.emailVerified,
        displayName: this.displayName || void 0,
        isAnonymous: this.isAnonymous,
        photoURL: this.photoURL || void 0,
        phoneNumber: this.phoneNumber || void 0,
        tenantId: this.tenantId || void 0,
        providerData: this.providerData.map((e) => ({ ...e })),
        stsTokenManager: this.stsTokenManager.toJSON(),
        _redirectEventId: this._redirectEventId,
        ...this.metadata.toJSON(),
        apiKey: this.auth.config.apiKey,
        appName: this.auth.name,
      };
    }
    get refreshToken() {
      return this.stsTokenManager.refreshToken || ``;
    }
    static _fromJSON(t, n) {
      let r = n.displayName ?? void 0,
        i = n.email ?? void 0,
        a = n.phoneNumber ?? void 0,
        o = n.photoURL ?? void 0,
        s = n.tenantId ?? void 0,
        c = n._redirectEventId ?? void 0,
        l = n.createdAt ?? void 0,
        u = n.lastLoginAt ?? void 0,
        { uid: d, emailVerified: f, isAnonymous: p, providerData: m, stsTokenManager: h } = n;
      O(d && h, t, `internal-error`);
      let g = yr.fromJSON(this.name, h);
      (O(typeof d == `string`, t, `internal-error`),
        br(r, t.name),
        br(i, t.name),
        O(typeof f == `boolean`, t, `internal-error`),
        O(typeof p == `boolean`, t, `internal-error`),
        br(a, t.name),
        br(o, t.name),
        br(s, t.name),
        br(c, t.name),
        br(l, t.name),
        br(u, t.name));
      let ee = new e({
        uid: d,
        auth: t,
        email: i,
        emailVerified: f,
        displayName: r,
        isAnonymous: p,
        photoURL: o,
        phoneNumber: a,
        tenantId: s,
        stsTokenManager: g,
        createdAt: l,
        lastLoginAt: u,
      });
      return (
        m && Array.isArray(m) && (ee.providerData = m.map((e) => ({ ...e }))),
        c && (ee._redirectEventId = c),
        ee
      );
    }
    static async _fromIdTokenResponse(t, n, r = !1) {
      let i = new yr();
      i.updateFromServerResponse(n);
      let a = new e({ uid: n.localId, auth: t, stsTokenManager: i, isAnonymous: r });
      return (await pr(a), a);
    }
    static async _fromGetAccountInfoResponse(t, n, r) {
      let i = n.users[0];
      O(i.localId !== void 0, `internal-error`);
      let a = i.providerUserInfo === void 0 ? [] : gr(i.providerUserInfo),
        o = !(i.email && i.passwordHash) && !a?.length,
        s = new yr();
      s.updateFromIdToken(r);
      let c = new e({ uid: i.localId, auth: t, stsTokenManager: s, isAnonymous: o }),
        l = {
          uid: i.localId,
          displayName: i.displayName || null,
          photoURL: i.photoUrl || null,
          email: i.email || null,
          emailVerified: i.emailVerified || !1,
          phoneNumber: i.phoneNumber || null,
          tenantId: i.tenantId || null,
          providerData: a,
          metadata: new fr(i.createdAt, i.lastLoginAt),
          isAnonymous: !(i.email && i.passwordHash) && !a?.length,
        };
      return (Object.assign(c, l), c);
    }
  },
  Sr = new Map();
function Cr(e) {
  In(e instanceof Function, `Expected a class definition`);
  let t = Sr.get(e);
  return t
    ? (In(t instanceof e, `Instance stored in cache mismatched with class`), t)
    : ((t = new e()), Sr.set(e, t), t);
}
var wr = class {
  constructor() {
    ((this.type = `NONE`), (this.storage = {}));
  }
  async _isAvailable() {
    return !0;
  }
  async _set(e, t) {
    this.storage[e] = t;
  }
  async _get(e) {
    let t = this.storage[e];
    return t === void 0 ? null : t;
  }
  async _remove(e) {
    delete this.storage[e];
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
};
wr.type = `NONE`;
var Tr = wr;
function Er(e, t, n) {
  return `firebase:${e}:${t}:${n}`;
}
var Dr = class e {
  constructor(e, t, n) {
    ((this.persistence = e), (this.auth = t), (this.userKey = n));
    let { config: r, name: i } = this.auth;
    ((this.fullUserKey = Er(this.userKey, r.apiKey, i)),
      (this.fullPersistenceKey = Er(`persistence`, r.apiKey, i)),
      (this.boundEventHandler = t._onStorageEvent.bind(t)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler));
  }
  setCurrentUser(e) {
    return this.persistence._set(this.fullUserKey, e.toJSON());
  }
  async getCurrentUser() {
    let e = await this.persistence._get(this.fullUserKey);
    if (!e) return null;
    if (typeof e == `string`) {
      let t = await rr(this.auth, { idToken: e }).catch(() => void 0);
      return t ? xr._fromGetAccountInfoResponse(this.auth, t, e) : null;
    }
    return xr._fromJSON(this.auth, e);
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
  }
  async setPersistence(e) {
    if (this.persistence === e) return;
    let t = await this.getCurrentUser();
    if ((await this.removeCurrentUser(), (this.persistence = e), t)) return this.setCurrentUser(t);
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(t, n, r = `authUser`) {
    if (!n.length) return new e(Cr(Tr), t, r);
    let i = (
        await Promise.all(
          n.map(async (e) => {
            if (await e._isAvailable()) return e;
          })
        )
      ).filter((e) => e),
      a = i[0] || Cr(Tr),
      o = Er(r, t.config.apiKey, t.name),
      s = null;
    for (let e of n)
      try {
        let n = await e._get(o);
        if (n) {
          let r;
          if (typeof n == `string`) {
            let e = await rr(t, { idToken: n }).catch(() => void 0);
            if (!e) break;
            r = await xr._fromGetAccountInfoResponse(t, e, n);
          } else r = xr._fromJSON(t, n);
          (e !== a && (s = r), (a = e));
          break;
        }
      } catch {}
    let c = i.filter((e) => e._shouldAllowMigration);
    return !a._shouldAllowMigration || !c.length
      ? new e(a, t, r)
      : ((a = c[0]),
        s && (await a._set(o, s.toJSON())),
        await Promise.all(
          n.map(async (e) => {
            if (e !== a)
              try {
                await e._remove(o);
              } catch {}
          })
        ),
        new e(a, t, r));
  }
};
function Or(e) {
  let t = e.toLowerCase();
  if (t.includes(`opera/`) || t.includes(`opr/`) || t.includes(`opios/`)) return `Opera`;
  if (Mr(t)) return `IEMobile`;
  if (t.includes(`msie`) || t.includes(`trident/`)) return `IE`;
  if (t.includes(`edge/`)) return `Edge`;
  if (kr(t)) return `Firefox`;
  if (t.includes(`silk/`)) return `Silk`;
  if (Pr(t)) return `Blackberry`;
  if (Fr(t)) return `Webos`;
  if (Ar(t)) return `Safari`;
  if ((t.includes(`chrome/`) || jr(t)) && !t.includes(`edge/`)) return `Chrome`;
  if (Nr(t)) return `Android`;
  {
    let t = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
    if (t?.length === 2) return t[1];
  }
  return `Other`;
}
function kr(e = _()) {
  return /firefox\//i.test(e);
}
function Ar(e = _()) {
  let t = e.toLowerCase();
  return (
    t.includes(`safari/`) &&
    !t.includes(`chrome/`) &&
    !t.includes(`crios/`) &&
    !t.includes(`android`)
  );
}
function jr(e = _()) {
  return /crios\//i.test(e);
}
function Mr(e = _()) {
  return /iemobile/i.test(e);
}
function Nr(e = _()) {
  return /android/i.test(e);
}
function Pr(e = _()) {
  return /blackberry/i.test(e);
}
function Fr(e = _()) {
  return /webos/i.test(e);
}
function Ir(e = _()) {
  return /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e));
}
function Lr(e = _()) {
  return Ir(e) && !!window.navigator?.standalone;
}
function Rr() {
  return pe() && document.documentMode === 10;
}
function zr(e = _()) {
  return Ir(e) || Nr(e) || Fr(e) || Pr(e) || /windows phone/i.test(e) || Mr(e);
}
function Br(e, t = []) {
  let n;
  switch (e) {
    case `Browser`:
      n = Or(_());
      break;
    case `Worker`:
      n = `${Or(_())}-${e}`;
      break;
    default:
      n = e;
  }
  let r = t.length ? t.join(`,`) : `FirebaseCore-web`;
  return `${n}/JsCore/${an}/${r}`;
}
var Vr = class {
  constructor(e) {
    ((this.auth = e), (this.queue = []));
  }
  pushCallback(e, t) {
    let n = (t) =>
      new Promise((n, r) => {
        try {
          n(e(t));
        } catch (e) {
          r(e);
        }
      });
    ((n.onAbort = t), this.queue.push(n));
    let r = this.queue.length - 1;
    return () => {
      this.queue[r] = () => Promise.resolve();
    };
  }
  async runMiddleware(e) {
    if (this.auth.currentUser === e) return;
    let t = [];
    try {
      for (let n of this.queue) (await n(e), n.onAbort && t.push(n.onAbort));
    } catch (e) {
      t.reverse();
      for (let e of t)
        try {
          e();
        } catch {}
      throw this.auth._errorFactory.create(`login-blocked`, { originalMessage: e?.message });
    }
  }
};
async function Hr(e, t = {}) {
  return A(e, `GET`, `/v2/passwordPolicy`, k(e, t));
}
var Ur = 6,
  Wr = class {
    constructor(e) {
      let t = e.customStrengthOptions;
      ((this.customStrengthOptions = {}),
        (this.customStrengthOptions.minPasswordLength = t.minPasswordLength ?? Ur),
        t.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = t.maxPasswordLength),
        t.containsLowercaseCharacter !== void 0 &&
          (this.customStrengthOptions.containsLowercaseLetter = t.containsLowercaseCharacter),
        t.containsUppercaseCharacter !== void 0 &&
          (this.customStrengthOptions.containsUppercaseLetter = t.containsUppercaseCharacter),
        t.containsNumericCharacter !== void 0 &&
          (this.customStrengthOptions.containsNumericCharacter = t.containsNumericCharacter),
        t.containsNonAlphanumericCharacter !== void 0 &&
          (this.customStrengthOptions.containsNonAlphanumericCharacter =
            t.containsNonAlphanumericCharacter),
        (this.enforcementState = e.enforcementState),
        this.enforcementState === `ENFORCEMENT_STATE_UNSPECIFIED` &&
          (this.enforcementState = `OFF`),
        (this.allowedNonAlphanumericCharacters =
          e.allowedNonAlphanumericCharacters?.join(``) ?? ``),
        (this.forceUpgradeOnSignin = e.forceUpgradeOnSignin ?? !1),
        (this.schemaVersion = e.schemaVersion));
    }
    validatePassword(e) {
      let t = { isValid: !0, passwordPolicy: this };
      return (
        this.validatePasswordLengthOptions(e, t),
        this.validatePasswordCharacterOptions(e, t),
        (t.isValid &&= t.meetsMinPasswordLength ?? !0),
        (t.isValid &&= t.meetsMaxPasswordLength ?? !0),
        (t.isValid &&= t.containsLowercaseLetter ?? !0),
        (t.isValid &&= t.containsUppercaseLetter ?? !0),
        (t.isValid &&= t.containsNumericCharacter ?? !0),
        (t.isValid &&= t.containsNonAlphanumericCharacter ?? !0),
        t
      );
    }
    validatePasswordLengthOptions(e, t) {
      let n = this.customStrengthOptions.minPasswordLength,
        r = this.customStrengthOptions.maxPasswordLength;
      (n && (t.meetsMinPasswordLength = e.length >= n),
        r && (t.meetsMaxPasswordLength = e.length <= r));
    }
    validatePasswordCharacterOptions(e, t) {
      this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
      let n;
      for (let r = 0; r < e.length; r++)
        ((n = e.charAt(r)),
          this.updatePasswordCharacterOptionsStatuses(
            t,
            n >= `a` && n <= `z`,
            n >= `A` && n <= `Z`,
            n >= `0` && n <= `9`,
            this.allowedNonAlphanumericCharacters.includes(n)
          ));
    }
    updatePasswordCharacterOptionsStatuses(e, t, n, r, i) {
      (this.customStrengthOptions.containsLowercaseLetter && (e.containsLowercaseLetter ||= t),
        this.customStrengthOptions.containsUppercaseLetter && (e.containsUppercaseLetter ||= n),
        this.customStrengthOptions.containsNumericCharacter && (e.containsNumericCharacter ||= r),
        this.customStrengthOptions.containsNonAlphanumericCharacter &&
          (e.containsNonAlphanumericCharacter ||= i));
    }
  },
  Gr = class {
    constructor(e, t, n, r) {
      ((this.app = e),
        (this.heartbeatServiceProvider = t),
        (this.appCheckServiceProvider = n),
        (this.config = r),
        (this.currentUser = null),
        (this.emulatorConfig = null),
        (this.operations = Promise.resolve()),
        (this.authStateSubscription = new qr(this)),
        (this.idTokenSubscription = new qr(this)),
        (this.beforeStateQueue = new Vr(this)),
        (this.redirectUser = null),
        (this.isProactiveRefreshEnabled = !1),
        (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
        (this._canInitEmulator = !0),
        (this._isInitialized = !1),
        (this._deleted = !1),
        (this._initializationPromise = null),
        (this._popupRedirectResolver = null),
        (this._errorFactory = En),
        (this._agentRecaptchaConfig = null),
        (this._tenantRecaptchaConfigs = {}),
        (this._projectPasswordPolicy = null),
        (this._tenantPasswordPolicies = {}),
        (this._resolvePersistenceManagerAvailable = void 0),
        (this.lastNotifiedUid = void 0),
        (this.languageCode = null),
        (this.tenantId = null),
        (this.settings = { appVerificationDisabledForTesting: !1 }),
        (this.frameworks = []),
        (this.name = e.name),
        (this.clientVersion = r.sdkClientVersion),
        (this._persistenceManagerAvailable = new Promise(
          (e) => (this._resolvePersistenceManagerAvailable = e)
        )));
    }
    _initializeWithPersistence(e, t) {
      return (
        t && (this._popupRedirectResolver = Cr(t)),
        (this._initializationPromise = this.queue(async () => {
          if (
            !this._deleted &&
            ((this.persistenceManager = await Dr.create(this, e)),
            this._resolvePersistenceManagerAvailable?.(),
            !this._deleted)
          ) {
            if (this._popupRedirectResolver?._shouldInitProactively)
              try {
                await this._popupRedirectResolver._initialize(this);
              } catch {}
            (await this.initializeCurrentUser(t),
              (this.lastNotifiedUid = this.currentUser?.uid || null),
              !this._deleted && (this._isInitialized = !0));
          }
        })),
        this._initializationPromise
      );
    }
    async _onStorageEvent() {
      if (this._deleted) return;
      let e = await this.assertedPersistence.getCurrentUser();
      if (!(!this.currentUser && !e)) {
        if (this.currentUser && e && this.currentUser.uid === e.uid) {
          (this._currentUser._assign(e), await this.currentUser.getIdToken());
          return;
        }
        await this._updateCurrentUser(e, !0);
      }
    }
    async initializeCurrentUserFromIdToken(e) {
      try {
        let t = await rr(this, { idToken: e }),
          n = await xr._fromGetAccountInfoResponse(this, t, e);
        await this.directlySetCurrentUser(n);
      } catch (e) {
        (console.warn(`FirebaseServerApp could not login user with provided authIdToken: `, e),
          await this.directlySetCurrentUser(null));
      }
    }
    async initializeCurrentUser(e) {
      if (w(this.app)) {
        let e = this.app.settings.authIdToken;
        return e
          ? new Promise((t) => {
              setTimeout(() => this.initializeCurrentUserFromIdToken(e).then(t, t));
            })
          : this.directlySetCurrentUser(null);
      }
      let t = await this.assertedPersistence.getCurrentUser(),
        n = t,
        r = !1;
      if (e && this.config.authDomain) {
        await this.getOrInitRedirectPersistenceManager();
        let t = this.redirectUser?._redirectEventId,
          i = n?._redirectEventId,
          a = await this.tryRedirectSignIn(e);
        (!t || t === i) && a?.user && ((n = a.user), (r = !0));
      }
      if (!n) return this.directlySetCurrentUser(null);
      if (!n._redirectEventId) {
        if (r)
          try {
            await this.beforeStateQueue.runMiddleware(n);
          } catch (e) {
            ((n = t),
              this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e)));
          }
        return n ? this.reloadAndSetCurrentUserOrClear(n) : this.directlySetCurrentUser(null);
      }
      return (
        O(this._popupRedirectResolver, this, `argument-error`),
        await this.getOrInitRedirectPersistenceManager(),
        this.redirectUser && this.redirectUser._redirectEventId === n._redirectEventId
          ? this.directlySetCurrentUser(n)
          : this.reloadAndSetCurrentUserOrClear(n)
      );
    }
    async tryRedirectSignIn(e) {
      let t = null;
      try {
        t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
      } catch {
        await this._setRedirectUser(null);
      }
      return t;
    }
    async reloadAndSetCurrentUserOrClear(e) {
      try {
        await pr(e);
      } catch (e) {
        if (e?.code !== `auth/network-request-failed`) return this.directlySetCurrentUser(null);
      }
      return this.directlySetCurrentUser(e);
    }
    useDeviceLanguage() {
      this.languageCode = Vn();
    }
    async _delete() {
      this._deleted = !0;
    }
    async updateCurrentUser(e) {
      if (w(this.app)) return Promise.reject(Mn(this));
      let t = e ? b(e) : null;
      return (
        t && O(t.auth.config.apiKey === this.config.apiKey, this, `invalid-user-token`),
        this._updateCurrentUser(t && t._clone(this))
      );
    }
    async _updateCurrentUser(e, t = !1) {
      if (!this._deleted)
        return (
          e && O(this.tenantId === e.tenantId, this, `tenant-id-mismatch`),
          t || (await this.beforeStateQueue.runMiddleware(e)),
          this.queue(async () => {
            (await this.directlySetCurrentUser(e), this.notifyAuthListeners());
          })
        );
    }
    async signOut() {
      return w(this.app)
        ? Promise.reject(Mn(this))
        : (await this.beforeStateQueue.runMiddleware(null),
          (this.redirectPersistenceManager || this._popupRedirectResolver) &&
            (await this._setRedirectUser(null)),
          this._updateCurrentUser(null, !0));
    }
    setPersistence(e) {
      return w(this.app)
        ? Promise.reject(Mn(this))
        : this.queue(async () => {
            await this.assertedPersistence.setPersistence(Cr(e));
          });
    }
    _getRecaptchaConfig() {
      return this.tenantId == null
        ? this._agentRecaptchaConfig
        : this._tenantRecaptchaConfigs[this.tenantId];
    }
    async validatePassword(e) {
      this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
      let t = this._getPasswordPolicyInternal();
      return t.schemaVersion === this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
        ? t.validatePassword(e)
        : Promise.reject(
            this._errorFactory.create(`unsupported-password-policy-schema-version`, {})
          );
    }
    _getPasswordPolicyInternal() {
      return this.tenantId === null
        ? this._projectPasswordPolicy
        : this._tenantPasswordPolicies[this.tenantId];
    }
    async _updatePasswordPolicy() {
      let e = new Wr(await Hr(this));
      this.tenantId === null
        ? (this._projectPasswordPolicy = e)
        : (this._tenantPasswordPolicies[this.tenantId] = e);
    }
    _getPersistenceType() {
      return this.assertedPersistence.persistence.type;
    }
    _getPersistence() {
      return this.assertedPersistence.persistence;
    }
    _updateErrorMap(e) {
      this._errorFactory = new be(`auth`, `Firebase`, e());
    }
    onAuthStateChanged(e, t, n) {
      return this.registerStateListener(this.authStateSubscription, e, t, n);
    }
    beforeAuthStateChanged(e, t) {
      return this.beforeStateQueue.pushCallback(e, t);
    }
    onIdTokenChanged(e, t, n) {
      return this.registerStateListener(this.idTokenSubscription, e, t, n);
    }
    authStateReady() {
      return new Promise((e, t) => {
        if (this.currentUser) e();
        else {
          let n = this.onAuthStateChanged(() => {
            (n(), e());
          }, t);
        }
      });
    }
    async revokeAccessToken(e) {
      if (this.currentUser) {
        let t = {
          providerId: `apple.com`,
          tokenType: `ACCESS_TOKEN`,
          token: e,
          idToken: await this.currentUser.getIdToken(),
        };
        (this.tenantId != null && (t.tenantId = this.tenantId), await vr(this, t));
      }
    }
    toJSON() {
      return {
        apiKey: this.config.apiKey,
        authDomain: this.config.authDomain,
        appName: this.name,
        currentUser: this._currentUser?.toJSON(),
      };
    }
    async _setRedirectUser(e, t) {
      let n = await this.getOrInitRedirectPersistenceManager(t);
      return e === null ? n.removeCurrentUser() : n.setCurrentUser(e);
    }
    async getOrInitRedirectPersistenceManager(e) {
      if (!this.redirectPersistenceManager) {
        let t = (e && Cr(e)) || this._popupRedirectResolver;
        (O(t, this, `argument-error`),
          (this.redirectPersistenceManager = await Dr.create(
            this,
            [Cr(t._redirectPersistence)],
            `redirectUser`
          )),
          (this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()));
      }
      return this.redirectPersistenceManager;
    }
    async _redirectUserForId(e) {
      return (
        this._isInitialized && (await this.queue(async () => {})),
        this._currentUser?._redirectEventId === e
          ? this._currentUser
          : this.redirectUser?._redirectEventId === e
            ? this.redirectUser
            : null
      );
    }
    async _persistUserIfCurrent(e) {
      if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e));
    }
    _notifyListenersIfCurrent(e) {
      e === this.currentUser && this.notifyAuthListeners();
    }
    _key() {
      return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
    }
    _startProactiveRefresh() {
      ((this.isProactiveRefreshEnabled = !0),
        this.currentUser && this._currentUser._startProactiveRefresh());
    }
    _stopProactiveRefresh() {
      ((this.isProactiveRefreshEnabled = !1),
        this.currentUser && this._currentUser._stopProactiveRefresh());
    }
    get _currentUser() {
      return this.currentUser;
    }
    notifyAuthListeners() {
      if (!this._isInitialized) return;
      this.idTokenSubscription.next(this.currentUser);
      let e = this.currentUser?.uid ?? null;
      this.lastNotifiedUid !== e &&
        ((this.lastNotifiedUid = e), this.authStateSubscription.next(this.currentUser));
    }
    registerStateListener(e, t, n, r) {
      if (this._deleted) return () => {};
      let i = typeof t == `function` ? t : t.next.bind(t),
        a = !1,
        o = this._isInitialized ? Promise.resolve() : this._initializationPromise;
      if (
        (O(o, this, `internal-error`),
        o.then(() => {
          a || i(this.currentUser);
        }),
        typeof t == `function`)
      ) {
        let i = e.addObserver(t, n, r);
        return () => {
          ((a = !0), i());
        };
      } else {
        let n = e.addObserver(t);
        return () => {
          ((a = !0), n());
        };
      }
    }
    async directlySetCurrentUser(e) {
      (this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(),
        e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
        (this.currentUser = e),
        e
          ? await this.assertedPersistence.setCurrentUser(e)
          : await this.assertedPersistence.removeCurrentUser());
    }
    queue(e) {
      return ((this.operations = this.operations.then(e, e)), this.operations);
    }
    get assertedPersistence() {
      return (O(this.persistenceManager, this, `internal-error`), this.persistenceManager);
    }
    _logFramework(e) {
      !e ||
        this.frameworks.includes(e) ||
        (this.frameworks.push(e),
        this.frameworks.sort(),
        (this.clientVersion = Br(this.config.clientPlatform, this._getFrameworks())));
    }
    _getFrameworks() {
      return this.frameworks;
    }
    async _getAdditionalHeaders() {
      let e = { "X-Client-Version": this.clientVersion };
      this.app.options.appId && (e[`X-Firebase-gmpid`] = this.app.options.appId);
      let t = await this.heartbeatServiceProvider
        .getImmediate({ optional: !0 })
        ?.getHeartbeatsHeader();
      t && (e[`X-Firebase-Client`] = t);
      let n = await this._getAppCheckToken();
      return (n && (e[`X-Firebase-AppCheck`] = n), e);
    }
    async _getAppCheckToken() {
      if (w(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
      let e = await this.appCheckServiceProvider.getImmediate({ optional: !0 })?.getToken();
      return (e?.error && On(`Error while retrieving App Check token: ${e.error}`), e?.token);
    }
  };
function Kr(e) {
  return b(e);
}
var qr = class {
    constructor(e) {
      ((this.auth = e),
        (this.observer = null),
        (this.addObserver = ke((e) => (this.observer = e))));
    }
    get next() {
      return (
        O(this.observer, this.auth, `internal-error`),
        this.observer.next.bind(this.observer)
      );
    }
  },
  Jr = {
    async loadJS() {
      throw Error(`Unable to load external scripts`);
    },
    recaptchaV2Script: ``,
    recaptchaEnterpriseScript: ``,
    gapiScript: ``,
  };
function Yr(e) {
  Jr = e;
}
function Xr(e) {
  return Jr.loadJS(e);
}
function Zr() {
  return Jr.recaptchaEnterpriseScript;
}
function Qr() {
  return Jr.gapiScript;
}
function $r(e) {
  return `__${e}${Math.floor(Math.random() * 1e6)}`;
}
var ei = class {
    constructor() {
      this.enterprise = new ti();
    }
    ready(e) {
      e();
    }
    execute(e, t) {
      return Promise.resolve(`token`);
    }
    render(e, t) {
      return ``;
    }
  },
  ti = class {
    ready(e) {
      e();
    }
    execute(e, t) {
      return Promise.resolve(`token`);
    }
    render(e, t) {
      return ``;
    }
  },
  ni = `recaptcha-enterprise`,
  ri = `NO_RECAPTCHA`,
  ii = class {
    constructor(e) {
      ((this.type = ni), (this.auth = Kr(e)));
    }
    async verify(e = `verify`, t = !1) {
      async function n(e) {
        if (!t) {
          if (e.tenantId == null && e._agentRecaptchaConfig != null)
            return e._agentRecaptchaConfig.siteKey;
          if (e.tenantId != null && e._tenantRecaptchaConfigs[e.tenantId] !== void 0)
            return e._tenantRecaptchaConfigs[e.tenantId].siteKey;
        }
        return new Promise(async (t, n) => {
          tr(e, { clientType: `CLIENT_TYPE_WEB`, version: `RECAPTCHA_ENTERPRISE` })
            .then((r) => {
              if (r.recaptchaKey === void 0) n(Error(`recaptcha Enterprise site key undefined`));
              else {
                let n = new er(r);
                return (
                  e.tenantId == null
                    ? (e._agentRecaptchaConfig = n)
                    : (e._tenantRecaptchaConfigs[e.tenantId] = n),
                  t(n.siteKey)
                );
              }
            })
            .catch((e) => {
              n(e);
            });
        });
      }
      function r(t, n, r) {
        let i = window.grecaptcha;
        $n(i)
          ? i.enterprise.ready(() => {
              i.enterprise
                .execute(t, { action: e })
                .then((e) => {
                  n(e);
                })
                .catch(() => {
                  n(ri);
                });
            })
          : r(Error(`No reCAPTCHA enterprise script loaded.`));
      }
      return this.auth.settings.appVerificationDisabledForTesting
        ? new ei().execute(`siteKey`, { action: `verify` })
        : new Promise((e, i) => {
            n(this.auth)
              .then((n) => {
                if (!t && $n(window.grecaptcha)) r(n, e, i);
                else {
                  if (typeof window > `u`) {
                    i(Error(`RecaptchaVerifier is only supported in browser`));
                    return;
                  }
                  let t = Zr();
                  (t.length !== 0 && (t += n),
                    Xr(t)
                      .then(() => {
                        r(n, e, i);
                      })
                      .catch((e) => {
                        i(e);
                      }));
                }
              })
              .catch((e) => {
                i(e);
              });
          });
    }
  };
async function ai(e, t, n, r = !1, i = !1) {
  let a = new ii(e),
    o;
  if (i) o = ri;
  else
    try {
      o = await a.verify(n);
    } catch {
      o = await a.verify(n, !0);
    }
  let s = { ...t };
  if (n === `mfaSmsEnrollment` || n === `mfaSmsSignIn`) {
    if (`phoneEnrollmentInfo` in s) {
      let e = s.phoneEnrollmentInfo.phoneNumber,
        t = s.phoneEnrollmentInfo.recaptchaToken;
      Object.assign(s, {
        phoneEnrollmentInfo: {
          phoneNumber: e,
          recaptchaToken: t,
          captchaResponse: o,
          clientType: `CLIENT_TYPE_WEB`,
          recaptchaVersion: `RECAPTCHA_ENTERPRISE`,
        },
      });
    } else if (`phoneSignInInfo` in s) {
      let e = s.phoneSignInInfo.recaptchaToken;
      Object.assign(s, {
        phoneSignInInfo: {
          recaptchaToken: e,
          captchaResponse: o,
          clientType: `CLIENT_TYPE_WEB`,
          recaptchaVersion: `RECAPTCHA_ENTERPRISE`,
        },
      });
    }
    return s;
  }
  return (
    r ? Object.assign(s, { captchaResp: o }) : Object.assign(s, { captchaResponse: o }),
    Object.assign(s, { clientType: `CLIENT_TYPE_WEB` }),
    Object.assign(s, { recaptchaVersion: `RECAPTCHA_ENTERPRISE` }),
    s
  );
}
async function oi(e, t, n, r, i) {
  return i === `EMAIL_PASSWORD_PROVIDER`
    ? e._getRecaptchaConfig()?.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)
      ? r(e, await ai(e, t, n, n === `getOobCode`))
      : r(e, t).catch(async (i) =>
          i.code === `auth/missing-recaptcha-token`
            ? (console.log(
                `${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`
              ),
              r(e, await ai(e, t, n, n === `getOobCode`)))
            : Promise.reject(i)
        )
    : i === `PHONE_PROVIDER`
      ? e._getRecaptchaConfig()?.isProviderEnabled(`PHONE_PROVIDER`)
        ? r(e, await ai(e, t, n)).catch(async (i) =>
            e._getRecaptchaConfig()?.getProviderEnforcementState(`PHONE_PROVIDER`) === `AUDIT` &&
            (i.code === `auth/missing-recaptcha-token` || i.code === `auth/invalid-app-credential`)
              ? (console.log(
                  `Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`
                ),
                r(e, await ai(e, t, n, !1, !0)))
              : Promise.reject(i)
          )
        : r(e, await ai(e, t, n, !1, !0))
      : Promise.reject(i + ` provider is not supported.`);
}
async function si(e) {
  let t = Kr(e),
    n = new er(await tr(t, { clientType: `CLIENT_TYPE_WEB`, version: `RECAPTCHA_ENTERPRISE` }));
  (t.tenantId == null ? (t._agentRecaptchaConfig = n) : (t._tenantRecaptchaConfigs[t.tenantId] = n),
    n.isAnyProviderEnabled() && new ii(t).verify());
}
function ci(e, t) {
  let n = tn(e, `auth`);
  if (n.isInitialized()) {
    let e = n.getImmediate();
    if (we(n.getOptions(), t ?? {})) return e;
    D(e, `already-initialized`);
  }
  return n.initialize({ options: t });
}
function li(e, t) {
  let n = t?.persistence || [],
    r = (Array.isArray(n) ? n : [n]).map(Cr);
  (t?.errorMap && e._updateErrorMap(t.errorMap),
    e._initializeWithPersistence(r, t?.popupRedirectResolver));
}
function ui(e, t, n) {
  let r = Kr(e);
  O(/^https?:\/\//.test(t), r, `invalid-emulator-scheme`);
  let i = !!n?.disableWarnings,
    a = di(t),
    { host: o, port: s } = fi(t),
    c = s === null ? `` : `:${s}`,
    l = { url: `${a}//${o}${c}/` },
    u = Object.freeze({
      host: o,
      port: s,
      protocol: a.replace(`:`, ``),
      options: Object.freeze({ disableWarnings: i }),
    });
  if (!r._canInitEmulator) {
    (O(r.config.emulator && r.emulatorConfig, r, `emulator-config-failed`),
      O(we(l, r.config.emulator) && we(u, r.emulatorConfig), r, `emulator-config-failed`));
    return;
  }
  ((r.config.emulator = l),
    (r.emulatorConfig = u),
    (r.settings.appVerificationDisabledForTesting = !0),
    te(o) ? (ne(`${a}//${o}${c}`), ce(`Auth`, !0)) : i || mi());
}
function di(e) {
  let t = e.indexOf(`:`);
  return t < 0 ? `` : e.substr(0, t + 1);
}
function fi(e) {
  let t = di(e),
    n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
  if (!n) return { host: ``, port: null };
  let r = n[2].split(`@`).pop() || ``,
    i = /^(\[[^\]]+\])(:|$)/.exec(r);
  if (i) {
    let e = i[1];
    return { host: e, port: pi(r.substr(e.length + 1)) };
  } else {
    let [e, t] = r.split(`:`);
    return { host: e, port: pi(t) };
  }
}
function pi(e) {
  if (!e) return null;
  let t = Number(e);
  return isNaN(t) ? null : t;
}
function mi() {
  function e() {
    let e = document.createElement(`p`),
      t = e.style;
    ((e.innerText = `Running in emulator mode. Do not use with production credentials.`),
      (t.position = `fixed`),
      (t.width = `100%`),
      (t.backgroundColor = `#ffffff`),
      (t.border = `.1em solid #000000`),
      (t.color = `#b50000`),
      (t.bottom = `0px`),
      (t.left = `0px`),
      (t.margin = `0px`),
      (t.zIndex = `10000`),
      (t.textAlign = `center`),
      e.classList.add(`firebase-emulator-warning`),
      document.body.appendChild(e));
  }
  (typeof console < `u` &&
    typeof console.info == `function` &&
    console.info(
      `WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`
    ),
    typeof window < `u` &&
      typeof document < `u` &&
      (document.readyState === `loading` ? window.addEventListener(`DOMContentLoaded`, e) : e()));
}
var hi = class {
  constructor(e, t) {
    ((this.providerId = e), (this.signInMethod = t));
  }
  toJSON() {
    return Fn(`not implemented`);
  }
  _getIdTokenResponse(e) {
    return Fn(`not implemented`);
  }
  _linkToIdToken(e, t) {
    return Fn(`not implemented`);
  }
  _getReauthenticationResolver(e) {
    return Fn(`not implemented`);
  }
};
async function gi(e, t) {
  return A(e, `POST`, `/v1/accounts:signUp`, t);
}
async function _i(e, t) {
  return j(e, `POST`, `/v1/accounts:signInWithPassword`, k(e, t));
}
async function vi(e, t) {
  return j(e, `POST`, `/v1/accounts:signInWithEmailLink`, k(e, t));
}
async function yi(e, t) {
  return j(e, `POST`, `/v1/accounts:signInWithEmailLink`, k(e, t));
}
var bi = class e extends hi {
  constructor(e, t, n, r = null) {
    (super(`password`, n), (this._email = e), (this._password = t), (this._tenantId = r));
  }
  static _fromEmailAndPassword(t, n) {
    return new e(t, n, `password`);
  }
  static _fromEmailAndCode(t, n, r = null) {
    return new e(t, n, `emailLink`, r);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId,
    };
  }
  static fromJSON(e) {
    let t = typeof e == `string` ? JSON.parse(e) : e;
    if (t?.email && t?.password) {
      if (t.signInMethod === `password`) return this._fromEmailAndPassword(t.email, t.password);
      if (t.signInMethod === `emailLink`)
        return this._fromEmailAndCode(t.email, t.password, t.tenantId);
    }
    return null;
  }
  async _getIdTokenResponse(e) {
    switch (this.signInMethod) {
      case `password`:
        return oi(
          e,
          {
            returnSecureToken: !0,
            email: this._email,
            password: this._password,
            clientType: `CLIENT_TYPE_WEB`,
          },
          `signInWithPassword`,
          _i,
          `EMAIL_PASSWORD_PROVIDER`
        );
      case `emailLink`:
        return vi(e, { email: this._email, oobCode: this._password });
      default:
        D(e, `internal-error`);
    }
  }
  async _linkToIdToken(e, t) {
    switch (this.signInMethod) {
      case `password`:
        return oi(
          e,
          {
            idToken: t,
            returnSecureToken: !0,
            email: this._email,
            password: this._password,
            clientType: `CLIENT_TYPE_WEB`,
          },
          `signUpPassword`,
          gi,
          `EMAIL_PASSWORD_PROVIDER`
        );
      case `emailLink`:
        return yi(e, { idToken: t, email: this._email, oobCode: this._password });
      default:
        D(e, `internal-error`);
    }
  }
  _getReauthenticationResolver(e) {
    return this._getIdTokenResponse(e);
  }
};
async function xi(e, t) {
  return j(e, `POST`, `/v1/accounts:signInWithIdp`, k(e, t));
}
var Si = `http://localhost`,
  Ci = class e extends hi {
    constructor() {
      (super(...arguments), (this.pendingToken = null));
    }
    static _fromParams(t) {
      let n = new e(t.providerId, t.signInMethod);
      return (
        t.idToken || t.accessToken
          ? (t.idToken && (n.idToken = t.idToken),
            t.accessToken && (n.accessToken = t.accessToken),
            t.nonce && !t.pendingToken && (n.nonce = t.nonce),
            t.pendingToken && (n.pendingToken = t.pendingToken))
          : t.oauthToken && t.oauthTokenSecret
            ? ((n.accessToken = t.oauthToken), (n.secret = t.oauthTokenSecret))
            : D(`argument-error`),
        n
      );
    }
    toJSON() {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod,
      };
    }
    static fromJSON(t) {
      let { providerId: n, signInMethod: r, ...i } = typeof t == `string` ? JSON.parse(t) : t;
      if (!n || !r) return null;
      let a = new e(n, r);
      return (
        (a.idToken = i.idToken || void 0),
        (a.accessToken = i.accessToken || void 0),
        (a.secret = i.secret),
        (a.nonce = i.nonce),
        (a.pendingToken = i.pendingToken || null),
        a
      );
    }
    _getIdTokenResponse(e) {
      return xi(e, this.buildRequest());
    }
    _linkToIdToken(e, t) {
      let n = this.buildRequest();
      return ((n.idToken = t), xi(e, n));
    }
    _getReauthenticationResolver(e) {
      let t = this.buildRequest();
      return ((t.autoCreate = !1), xi(e, t));
    }
    buildRequest() {
      let e = { requestUri: Si, returnSecureToken: !0 };
      if (this.pendingToken) e.pendingToken = this.pendingToken;
      else {
        let t = {};
        (this.idToken && (t.id_token = this.idToken),
          this.accessToken && (t.access_token = this.accessToken),
          this.secret && (t.oauth_token_secret = this.secret),
          (t.providerId = this.providerId),
          this.nonce && !this.pendingToken && (t.nonce = this.nonce),
          (e.postBody = Ee(t)));
      }
      return e;
    }
  };
async function wi(e, t) {
  return A(e, `POST`, `/v1/accounts:sendVerificationCode`, k(e, t));
}
async function Ti(e, t) {
  return j(e, `POST`, `/v1/accounts:signInWithPhoneNumber`, k(e, t));
}
async function Ei(e, t) {
  let n = await j(e, `POST`, `/v1/accounts:signInWithPhoneNumber`, k(e, t));
  if (n.temporaryProof) throw Qn(e, `account-exists-with-different-credential`, n);
  return n;
}
var Di = { USER_NOT_FOUND: `user-not-found` };
async function Oi(e, t) {
  return j(
    e,
    `POST`,
    `/v1/accounts:signInWithPhoneNumber`,
    k(e, { ...t, operation: `REAUTH` }),
    Di
  );
}
var ki = class e extends hi {
  constructor(e) {
    (super(`phone`, `phone`), (this.params = e));
  }
  static _fromVerification(t, n) {
    return new e({ verificationId: t, verificationCode: n });
  }
  static _fromTokenResponse(t, n) {
    return new e({ phoneNumber: t, temporaryProof: n });
  }
  _getIdTokenResponse(e) {
    return Ti(e, this._makeVerificationRequest());
  }
  _linkToIdToken(e, t) {
    return Ei(e, { idToken: t, ...this._makeVerificationRequest() });
  }
  _getReauthenticationResolver(e) {
    return Oi(e, this._makeVerificationRequest());
  }
  _makeVerificationRequest() {
    let { temporaryProof: e, phoneNumber: t, verificationId: n, verificationCode: r } = this.params;
    return e && t ? { temporaryProof: e, phoneNumber: t } : { sessionInfo: n, code: r };
  }
  toJSON() {
    let e = { providerId: this.providerId };
    return (
      this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber),
      this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof),
      this.params.verificationCode && (e.verificationCode = this.params.verificationCode),
      this.params.verificationId && (e.verificationId = this.params.verificationId),
      e
    );
  }
  static fromJSON(t) {
    typeof t == `string` && (t = JSON.parse(t));
    let { verificationId: n, verificationCode: r, phoneNumber: i, temporaryProof: a } = t;
    return !r && !n && !i && !a
      ? null
      : new e({ verificationId: n, verificationCode: r, phoneNumber: i, temporaryProof: a });
  }
};
function Ai(e) {
  switch (e) {
    case `recoverEmail`:
      return `RECOVER_EMAIL`;
    case `resetPassword`:
      return `PASSWORD_RESET`;
    case `signIn`:
      return `EMAIL_SIGNIN`;
    case `verifyEmail`:
      return `VERIFY_EMAIL`;
    case `verifyAndChangeEmail`:
      return `VERIFY_AND_CHANGE_EMAIL`;
    case `revertSecondFactorAddition`:
      return `REVERT_SECOND_FACTOR_ADDITION`;
    default:
      return null;
  }
}
function ji(e) {
  let t = De(Oe(e)).link,
    n = t ? De(Oe(t)).deep_link_id : null,
    r = De(Oe(e)).deep_link_id;
  return (r ? De(Oe(r)).link : null) || r || n || t || e;
}
var Mi = class e {
    constructor(e) {
      let t = De(Oe(e)),
        n = t.apiKey ?? null,
        r = t.oobCode ?? null,
        i = Ai(t.mode ?? null);
      (O(n && r && i, `argument-error`),
        (this.apiKey = n),
        (this.operation = i),
        (this.code = r),
        (this.continueUrl = t.continueUrl ?? null),
        (this.languageCode = t.lang ?? null),
        (this.tenantId = t.tenantId ?? null));
    }
    static parseLink(t) {
      let n = ji(t);
      try {
        return new e(n);
      } catch {
        return null;
      }
    }
  },
  Ni = class e {
    constructor() {
      this.providerId = e.PROVIDER_ID;
    }
    static credential(e, t) {
      return bi._fromEmailAndPassword(e, t);
    }
    static credentialWithLink(e, t) {
      let n = Mi.parseLink(t);
      return (O(n, `argument-error`), bi._fromEmailAndCode(e, n.code, n.tenantId));
    }
  };
((Ni.PROVIDER_ID = `password`),
  (Ni.EMAIL_PASSWORD_SIGN_IN_METHOD = `password`),
  (Ni.EMAIL_LINK_SIGN_IN_METHOD = `emailLink`));
var Pi = class {
    constructor(e) {
      ((this.providerId = e), (this.defaultLanguageCode = null), (this.customParameters = {}));
    }
    setDefaultLanguage(e) {
      this.defaultLanguageCode = e;
    }
    setCustomParameters(e) {
      return ((this.customParameters = e), this);
    }
    getCustomParameters() {
      return this.customParameters;
    }
  },
  Fi = class extends Pi {
    constructor() {
      (super(...arguments), (this.scopes = []));
    }
    addScope(e) {
      return (this.scopes.includes(e) || this.scopes.push(e), this);
    }
    getScopes() {
      return [...this.scopes];
    }
  },
  Ii = class e extends Fi {
    constructor() {
      super(`facebook.com`);
    }
    static credential(t) {
      return Ci._fromParams({
        providerId: e.PROVIDER_ID,
        signInMethod: e.FACEBOOK_SIGN_IN_METHOD,
        accessToken: t,
      });
    }
    static credentialFromResult(t) {
      return e.credentialFromTaggedObject(t);
    }
    static credentialFromError(t) {
      return e.credentialFromTaggedObject(t.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: t }) {
      if (!t || !(`oauthAccessToken` in t) || !t.oauthAccessToken) return null;
      try {
        return e.credential(t.oauthAccessToken);
      } catch {
        return null;
      }
    }
  };
((Ii.FACEBOOK_SIGN_IN_METHOD = `facebook.com`), (Ii.PROVIDER_ID = `facebook.com`));
var Li = class e extends Fi {
  constructor() {
    (super(`google.com`), this.addScope(`profile`));
  }
  static credential(t, n) {
    return Ci._fromParams({
      providerId: e.PROVIDER_ID,
      signInMethod: e.GOOGLE_SIGN_IN_METHOD,
      idToken: t,
      accessToken: n,
    });
  }
  static credentialFromResult(t) {
    return e.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return e.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t) return null;
    let { oauthIdToken: n, oauthAccessToken: r } = t;
    if (!n && !r) return null;
    try {
      return e.credential(n, r);
    } catch {
      return null;
    }
  }
};
((Li.GOOGLE_SIGN_IN_METHOD = `google.com`), (Li.PROVIDER_ID = `google.com`));
var Ri = class e extends Fi {
  constructor() {
    super(`github.com`);
  }
  static credential(t) {
    return Ci._fromParams({
      providerId: e.PROVIDER_ID,
      signInMethod: e.GITHUB_SIGN_IN_METHOD,
      accessToken: t,
    });
  }
  static credentialFromResult(t) {
    return e.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return e.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t || !(`oauthAccessToken` in t) || !t.oauthAccessToken) return null;
    try {
      return e.credential(t.oauthAccessToken);
    } catch {
      return null;
    }
  }
};
((Ri.GITHUB_SIGN_IN_METHOD = `github.com`), (Ri.PROVIDER_ID = `github.com`));
var zi = class e extends Fi {
  constructor() {
    super(`twitter.com`);
  }
  static credential(t, n) {
    return Ci._fromParams({
      providerId: e.PROVIDER_ID,
      signInMethod: e.TWITTER_SIGN_IN_METHOD,
      oauthToken: t,
      oauthTokenSecret: n,
    });
  }
  static credentialFromResult(t) {
    return e.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return e.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t) return null;
    let { oauthAccessToken: n, oauthTokenSecret: r } = t;
    if (!n || !r) return null;
    try {
      return e.credential(n, r);
    } catch {
      return null;
    }
  }
};
((zi.TWITTER_SIGN_IN_METHOD = `twitter.com`), (zi.PROVIDER_ID = `twitter.com`));
var Bi = class e {
  constructor(e) {
    ((this.user = e.user),
      (this.providerId = e.providerId),
      (this._tokenResponse = e._tokenResponse),
      (this.operationType = e.operationType));
  }
  static async _fromIdTokenResponse(t, n, r, i = !1) {
    return new e({
      user: await xr._fromIdTokenResponse(t, r, i),
      providerId: Vi(r),
      _tokenResponse: r,
      operationType: n,
    });
  }
  static async _forOperation(t, n, r) {
    return (
      await t._updateTokensIfNecessary(r, !0),
      new e({ user: t, providerId: Vi(r), _tokenResponse: r, operationType: n })
    );
  }
};
function Vi(e) {
  return e.providerId ? e.providerId : `phoneNumber` in e ? `phone` : null;
}
var Hi = class e extends ye {
  constructor(t, n, r, i) {
    (super(n.code, n.message),
      (this.operationType = r),
      (this.user = i),
      Object.setPrototypeOf(this, e.prototype),
      (this.customData = {
        appName: t.name,
        tenantId: t.tenantId ?? void 0,
        _serverResponse: n.customData._serverResponse,
        operationType: r,
      }));
  }
  static _fromErrorAndOperation(t, n, r, i) {
    return new e(t, n, r, i);
  }
};
function Ui(e, t, n, r) {
  return (
    t === `reauthenticate` ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)
  ).catch((n) => {
    throw n.code === `auth/multi-factor-auth-required` ? Hi._fromErrorAndOperation(e, n, t, r) : n;
  });
}
async function Wi(e, t, n = !1) {
  let r = await lr(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
  return Bi._forOperation(e, `link`, r);
}
async function Gi(e, t, n = !1) {
  let { auth: r } = e;
  if (w(r.app)) return Promise.reject(Mn(r));
  let i = `reauthenticate`;
  try {
    let a = await lr(e, Ui(r, i, t, e), n);
    O(a.idToken, r, `internal-error`);
    let o = sr(a.idToken);
    O(o, r, `internal-error`);
    let { sub: s } = o;
    return (O(e.uid === s, r, `user-mismatch`), Bi._forOperation(e, i, a));
  } catch (e) {
    throw (e?.code === `auth/user-not-found` && D(r, `user-mismatch`), e);
  }
}
async function Ki(e, t, n = !1) {
  if (w(e.app)) return Promise.reject(Mn(e));
  let r = `signIn`,
    i = await Ui(e, r, t),
    a = await Bi._fromIdTokenResponse(e, r, i);
  return (n || (await e._updateCurrentUser(a.user)), a);
}
async function qi(e, t) {
  return A(e, `POST`, `/v1/accounts:update`, t);
}
async function Ji(e, { displayName: t, photoURL: n }) {
  if (t === void 0 && n === void 0) return;
  let r = b(e),
    i = { idToken: await r.getIdToken(), displayName: t, photoUrl: n, returnSecureToken: !0 },
    a = await lr(r, qi(r.auth, i));
  ((r.displayName = a.displayName || null), (r.photoURL = a.photoUrl || null));
  let o = r.providerData.find(({ providerId: e }) => e === `password`);
  (o && ((o.displayName = r.displayName), (o.photoURL = r.photoURL)),
    await r._updateTokensIfNecessary(a));
}
function Yi(e, t, n, r) {
  return b(e).onIdTokenChanged(t, n, r);
}
function Xi(e, t, n) {
  return b(e).beforeAuthStateChanged(t, n);
}
function Zi(e, t, n, r) {
  return b(e).onAuthStateChanged(t, n, r);
}
function Qi(e) {
  return b(e).signOut();
}
function $i(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaEnrollment:start`, k(e, t));
}
function ea(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaEnrollment:finalize`, k(e, t));
}
function ta(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaEnrollment:start`, k(e, t));
}
function na(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaEnrollment:finalize`, k(e, t));
}
var ra = `__sak`,
  ia = class {
    constructor(e, t) {
      ((this.storageRetriever = e), (this.type = t));
    }
    _isAvailable() {
      try {
        return this.storage
          ? (this.storage.setItem(ra, `1`), this.storage.removeItem(ra), Promise.resolve(!0))
          : Promise.resolve(!1);
      } catch {
        return Promise.resolve(!1);
      }
    }
    _set(e, t) {
      return (this.storage.setItem(e, JSON.stringify(t)), Promise.resolve());
    }
    _get(e) {
      let t = this.storage.getItem(e);
      return Promise.resolve(t ? JSON.parse(t) : null);
    }
    _remove(e) {
      return (this.storage.removeItem(e), Promise.resolve());
    }
    get storage() {
      return this.storageRetriever();
    }
  },
  aa = 1e3,
  oa = 10,
  sa = class extends ia {
    constructor() {
      (super(() => window.localStorage, `LOCAL`),
        (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.fallbackToPolling = zr()),
        (this._shouldAllowMigration = !0));
    }
    forAllChangedKeys(e) {
      for (let t of Object.keys(this.listeners)) {
        let n = this.storage.getItem(t),
          r = this.localCache[t];
        n !== r && e(t, r, n);
      }
    }
    onStorageEvent(e, t = !1) {
      if (!e.key) {
        this.forAllChangedKeys((e, t, n) => {
          this.notifyListeners(e, n);
        });
        return;
      }
      let n = e.key;
      t ? this.detachListener() : this.stopPolling();
      let r = () => {
          let e = this.storage.getItem(n);
          (!t && this.localCache[n] === e) || this.notifyListeners(n, e);
        },
        i = this.storage.getItem(n);
      Rr() && i !== e.newValue && e.newValue !== e.oldValue ? setTimeout(r, oa) : r();
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      let n = this.listeners[e];
      if (n) for (let e of Array.from(n)) e(t && JSON.parse(t));
    }
    startPolling() {
      (this.stopPolling(),
        (this.pollTimer = setInterval(() => {
          this.forAllChangedKeys((e, t, n) => {
            this.onStorageEvent(
              new StorageEvent(`storage`, { key: e, oldValue: t, newValue: n }),
              !0
            );
          });
        }, aa)));
    }
    stopPolling() {
      this.pollTimer &&= (clearInterval(this.pollTimer), null);
    }
    attachListener() {
      window.addEventListener(`storage`, this.boundEventHandler);
    }
    detachListener() {
      window.removeEventListener(`storage`, this.boundEventHandler);
    }
    _addListener(e, t) {
      (Object.keys(this.listeners).length === 0 &&
        (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
        this.listeners[e] ||
          ((this.listeners[e] = new Set()), (this.localCache[e] = this.storage.getItem(e))),
        this.listeners[e].add(t));
    }
    _removeListener(e, t) {
      (this.listeners[e] &&
        (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]),
        Object.keys(this.listeners).length === 0 && (this.detachListener(), this.stopPolling()));
    }
    async _set(e, t) {
      (await super._set(e, t), (this.localCache[e] = JSON.stringify(t)));
    }
    async _get(e) {
      let t = await super._get(e);
      return ((this.localCache[e] = JSON.stringify(t)), t);
    }
    async _remove(e) {
      (await super._remove(e), delete this.localCache[e]);
    }
  };
sa.type = `LOCAL`;
var ca = sa,
  la = 1e3;
function ua(e) {
  let t = e.replace(/[\\^$.*+?()[\]{}|]/g, `\\$&`),
    n = RegExp(`${t}=([^;]+)`);
  return document.cookie.match(n)?.[1] ?? null;
}
function da(e) {
  return `${window.location.protocol === `http:` ? `__dev_` : `__HOST-`}FIREBASE_${e.split(`:`)[3]}`;
}
var fa = class {
  constructor() {
    ((this.type = `COOKIE`), (this.listenerUnsubscribes = new Map()));
  }
  _getFinalTarget(e) {
    let t = new URL(`${window.location.origin}/__cookies__`);
    return (t.searchParams.set(`finalTarget`, e), t);
  }
  async _isAvailable() {
    return (typeof isSecureContext == `boolean` && !isSecureContext) ||
      typeof navigator > `u` ||
      typeof document > `u`
      ? !1
      : (navigator.cookieEnabled ?? !0);
  }
  async _set(e, t) {}
  async _get(e) {
    if (!this._isAvailable()) return null;
    let t = da(e);
    return window.cookieStore ? (await window.cookieStore.get(t))?.value : ua(t);
  }
  async _remove(e) {
    if (!this._isAvailable() || !(await this._get(e))) return;
    let t = da(e);
    ((document.cookie = `${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`),
      await fetch(`/__cookies__`, { method: `DELETE` }).catch(() => void 0));
  }
  _addListener(e, t) {
    if (!this._isAvailable()) return;
    let n = da(e);
    if (window.cookieStore) {
      let e = (e) => {
        let r = e.changed.find((e) => e.name === n);
        (r && t(r.value), e.deleted.find((e) => e.name === n) && t(null));
      };
      return (
        this.listenerUnsubscribes.set(t, () => window.cookieStore.removeEventListener(`change`, e)),
        window.cookieStore.addEventListener(`change`, e)
      );
    }
    let r = ua(n),
      i = setInterval(() => {
        let e = ua(n);
        e !== r && (t(e), (r = e));
      }, la);
    this.listenerUnsubscribes.set(t, () => clearInterval(i));
  }
  _removeListener(e, t) {
    let n = this.listenerUnsubscribes.get(t);
    n && (n(), this.listenerUnsubscribes.delete(t));
  }
};
fa.type = `COOKIE`;
var pa = class extends ia {
  constructor() {
    super(() => window.sessionStorage, `SESSION`);
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
};
pa.type = `SESSION`;
var ma = pa;
function ha(e) {
  return Promise.all(
    e.map(async (e) => {
      try {
        return { fulfilled: !0, value: await e };
      } catch (e) {
        return { fulfilled: !1, reason: e };
      }
    })
  );
}
var ga = class e {
  constructor(e) {
    ((this.eventTarget = e),
      (this.handlersMap = {}),
      (this.boundEventHandler = this.handleEvent.bind(this)));
  }
  static _getInstance(t) {
    let n = this.receivers.find((e) => e.isListeningto(t));
    if (n) return n;
    let r = new e(t);
    return (this.receivers.push(r), r);
  }
  isListeningto(e) {
    return this.eventTarget === e;
  }
  async handleEvent(e) {
    let t = e,
      { eventId: n, eventType: r, data: i } = t.data,
      a = this.handlersMap[r];
    if (!a?.size) return;
    t.ports[0].postMessage({ status: `ack`, eventId: n, eventType: r });
    let o = await ha(Array.from(a).map(async (e) => e(t.origin, i)));
    t.ports[0].postMessage({ status: `done`, eventId: n, eventType: r, response: o });
  }
  _subscribe(e, t) {
    (Object.keys(this.handlersMap).length === 0 &&
      this.eventTarget.addEventListener(`message`, this.boundEventHandler),
      this.handlersMap[e] || (this.handlersMap[e] = new Set()),
      this.handlersMap[e].add(t));
  }
  _unsubscribe(e, t) {
    (this.handlersMap[e] && t && this.handlersMap[e].delete(t),
      (!t || this.handlersMap[e].size === 0) && delete this.handlersMap[e],
      Object.keys(this.handlersMap).length === 0 &&
        this.eventTarget.removeEventListener(`message`, this.boundEventHandler));
  }
};
ga.receivers = [];
function _a(e = ``, t = 10) {
  let n = ``;
  for (let e = 0; e < t; e++) n += Math.floor(Math.random() * 10);
  return e + n;
}
var va = class {
  constructor(e) {
    ((this.target = e), (this.handlers = new Set()));
  }
  removeMessageHandler(e) {
    (e.messageChannel &&
      (e.messageChannel.port1.removeEventListener(`message`, e.onMessage),
      e.messageChannel.port1.close()),
      this.handlers.delete(e));
  }
  async _send(e, t, n = 50) {
    let r = typeof MessageChannel < `u` ? new MessageChannel() : null;
    if (!r) throw Error(`connection_unavailable`);
    let i, a;
    return new Promise((o, s) => {
      let c = _a(``, 20);
      r.port1.start();
      let l = setTimeout(() => {
        s(Error(`unsupported_event`));
      }, n);
      ((a = {
        messageChannel: r,
        onMessage(e) {
          let t = e;
          if (t.data.eventId === c)
            switch (t.data.status) {
              case `ack`:
                (clearTimeout(l),
                  (i = setTimeout(() => {
                    s(Error(`timeout`));
                  }, 3e3)));
                break;
              case `done`:
                (clearTimeout(i), o(t.data.response));
                break;
              default:
                (clearTimeout(l), clearTimeout(i), s(Error(`invalid_response`)));
                break;
            }
        },
      }),
        this.handlers.add(a),
        r.port1.addEventListener(`message`, a.onMessage),
        this.target.postMessage({ eventType: e, eventId: c, data: t }, [r.port2]));
    }).finally(() => {
      a && this.removeMessageHandler(a);
    });
  }
};
function ya() {
  return window;
}
function ba(e) {
  ya().location.href = e;
}
function xa() {
  return ya().WorkerGlobalScope !== void 0 && typeof ya().importScripts == `function`;
}
async function Sa() {
  if (!navigator?.serviceWorker) return null;
  try {
    return (await navigator.serviceWorker.ready).active;
  } catch {
    return null;
  }
}
function Ca() {
  return navigator?.serviceWorker?.controller || null;
}
function wa() {
  return xa() ? self : null;
}
var Ta = `firebaseLocalStorageDb`,
  Ea = 1,
  Da = `firebaseLocalStorage`,
  Oa = `fbase_key`,
  ka = class {
    constructor(e) {
      this.request = e;
    }
    toPromise() {
      return new Promise((e, t) => {
        (this.request.addEventListener(`success`, () => {
          e(this.request.result);
        }),
          this.request.addEventListener(`error`, () => {
            t(this.request.error);
          }));
      });
    }
  };
function Aa(e, t) {
  return e.transaction([Da], t ? `readwrite` : `readonly`).objectStore(Da);
}
function ja() {
  return new ka(indexedDB.deleteDatabase(Ta)).toPromise();
}
function Ma() {
  let e = indexedDB.open(Ta, Ea);
  return new Promise((t, n) => {
    (e.addEventListener(`error`, () => {
      n(e.error);
    }),
      e.addEventListener(`upgradeneeded`, () => {
        let t = e.result;
        try {
          t.createObjectStore(Da, { keyPath: Oa });
        } catch (e) {
          n(e);
        }
      }),
      e.addEventListener(`success`, async () => {
        let n = e.result;
        n.objectStoreNames.contains(Da) ? t(n) : (n.close(), await ja(), t(await Ma()));
      }));
  });
}
async function Na(e, t, n) {
  return new ka(Aa(e, !0).put({ [Oa]: t, value: n })).toPromise();
}
async function Pa(e, t) {
  let n = await new ka(Aa(e, !1).get(t)).toPromise();
  return n === void 0 ? null : n.value;
}
function Fa(e, t) {
  return new ka(Aa(e, !0).delete(t)).toPromise();
}
var Ia = 800,
  La = 3,
  Ra = class {
    constructor() {
      ((this.type = `LOCAL`),
        (this._shouldAllowMigration = !0),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.pendingWrites = 0),
        (this.receiver = null),
        (this.sender = null),
        (this.serviceWorkerReceiverAvailable = !1),
        (this.activeServiceWorker = null),
        (this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(
          () => {},
          () => {}
        )));
    }
    async _openDb() {
      return ((this.db ||= await Ma()), this.db);
    }
    async _withRetries(e) {
      let t = 0;
      for (;;)
        try {
          return await e(await this._openDb());
        } catch (e) {
          if (t++ > La) throw e;
          this.db &&= (this.db.close(), void 0);
        }
    }
    async initializeServiceWorkerMessaging() {
      return xa() ? this.initializeReceiver() : this.initializeSender();
    }
    async initializeReceiver() {
      ((this.receiver = ga._getInstance(wa())),
        this.receiver._subscribe(`keyChanged`, async (e, t) => ({
          keyProcessed: (await this._poll()).includes(t.key),
        })),
        this.receiver._subscribe(`ping`, async (e, t) => [`keyChanged`]));
    }
    async initializeSender() {
      if (((this.activeServiceWorker = await Sa()), !this.activeServiceWorker)) return;
      this.sender = new va(this.activeServiceWorker);
      let e = await this.sender._send(`ping`, {}, 800);
      e &&
        e[0]?.fulfilled &&
        e[0]?.value.includes(`keyChanged`) &&
        (this.serviceWorkerReceiverAvailable = !0);
    }
    async notifyServiceWorker(e) {
      if (!(!this.sender || !this.activeServiceWorker || Ca() !== this.activeServiceWorker))
        try {
          await this.sender._send(
            `keyChanged`,
            { key: e },
            this.serviceWorkerReceiverAvailable ? 800 : 50
          );
        } catch {}
    }
    async _isAvailable() {
      try {
        if (!indexedDB) return !1;
        let e = await Ma();
        return (await Na(e, ra, `1`), await Fa(e, ra), !0);
      } catch {}
      return !1;
    }
    async _withPendingWrite(e) {
      this.pendingWrites++;
      try {
        await e();
      } finally {
        this.pendingWrites--;
      }
    }
    async _set(e, t) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries((n) => Na(n, e, t)),
          (this.localCache[e] = t),
          this.notifyServiceWorker(e)
        )
      );
    }
    async _get(e) {
      let t = await this._withRetries((t) => Pa(t, e));
      return ((this.localCache[e] = t), t);
    }
    async _remove(e) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries((t) => Fa(t, e)),
          delete this.localCache[e],
          this.notifyServiceWorker(e)
        )
      );
    }
    async _poll() {
      let e = await this._withRetries((e) => new ka(Aa(e, !1).getAll()).toPromise());
      if (!e || this.pendingWrites !== 0) return [];
      let t = [],
        n = new Set();
      if (e.length !== 0)
        for (let { fbase_key: r, value: i } of e)
          (n.add(r),
            JSON.stringify(this.localCache[r]) !== JSON.stringify(i) &&
              (this.notifyListeners(r, i), t.push(r)));
      for (let e of Object.keys(this.localCache))
        this.localCache[e] && !n.has(e) && (this.notifyListeners(e, null), t.push(e));
      return t;
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      let n = this.listeners[e];
      if (n) for (let e of Array.from(n)) e(t);
    }
    startPolling() {
      (this.stopPolling(), (this.pollTimer = setInterval(async () => this._poll(), Ia)));
    }
    stopPolling() {
      this.pollTimer &&= (clearInterval(this.pollTimer), null);
    }
    _addListener(e, t) {
      (Object.keys(this.listeners).length === 0 && this.startPolling(),
        this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
        this.listeners[e].add(t));
    }
    _removeListener(e, t) {
      (this.listeners[e] &&
        (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]),
        Object.keys(this.listeners).length === 0 && this.stopPolling());
    }
  };
Ra.type = `LOCAL`;
var za = Ra;
function Ba(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaSignIn:start`, k(e, t));
}
function Va(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaSignIn:finalize`, k(e, t));
}
function Ha(e, t) {
  return A(e, `POST`, `/v2/accounts/mfaSignIn:finalize`, k(e, t));
}
($r(`rcb`), new Hn(3e4, 6e4));
var Ua = `recaptcha`;
async function Wa(e, t, n) {
  if (!e._getRecaptchaConfig())
    try {
      await si(e);
    } catch {
      console.log(
        `Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.`
      );
    }
  try {
    let r;
    if (((r = typeof t == `string` ? { phoneNumber: t } : t), `session` in r)) {
      let t = r.session;
      if (`phoneNumber` in r)
        return (
          O(t.type === `enroll`, e, `internal-error`),
          (
            await oi(
              e,
              {
                idToken: t.credential,
                phoneEnrollmentInfo: { phoneNumber: r.phoneNumber, clientType: `CLIENT_TYPE_WEB` },
              },
              `mfaSmsEnrollment`,
              async (e, t) =>
                t.phoneEnrollmentInfo.captchaResponse === ri
                  ? (O(n?.type === Ua, e, `argument-error`), $i(e, await Ga(e, t, n)))
                  : $i(e, t),
              `PHONE_PROVIDER`
            ).catch((e) => Promise.reject(e))
          ).phoneSessionInfo.sessionInfo
        );
      {
        O(t.type === `signin`, e, `internal-error`);
        let i = r.multiFactorHint?.uid || r.multiFactorUid;
        return (
          O(i, e, `missing-multi-factor-info`),
          (
            await oi(
              e,
              {
                mfaPendingCredential: t.credential,
                mfaEnrollmentId: i,
                phoneSignInInfo: { clientType: `CLIENT_TYPE_WEB` },
              },
              `mfaSmsSignIn`,
              async (e, t) =>
                t.phoneSignInInfo.captchaResponse === ri
                  ? (O(n?.type === Ua, e, `argument-error`), Ba(e, await Ga(e, t, n)))
                  : Ba(e, t),
              `PHONE_PROVIDER`
            ).catch((e) => Promise.reject(e))
          ).phoneResponseInfo.sessionInfo
        );
      }
    } else
      return (
        await oi(
          e,
          { phoneNumber: r.phoneNumber, clientType: `CLIENT_TYPE_WEB` },
          `sendVerificationCode`,
          async (e, t) =>
            t.captchaResponse === ri
              ? (O(n?.type === Ua, e, `argument-error`), wi(e, await Ga(e, t, n)))
              : wi(e, t),
          `PHONE_PROVIDER`
        ).catch((e) => Promise.reject(e))
      ).sessionInfo;
  } finally {
    n?._reset();
  }
}
async function Ga(e, t, n) {
  O(n.type === Ua, e, `argument-error`);
  let r = await n.verify();
  O(typeof r == `string`, e, `argument-error`);
  let i = { ...t };
  if (`phoneEnrollmentInfo` in i) {
    let e = i.phoneEnrollmentInfo.phoneNumber,
      t = i.phoneEnrollmentInfo.captchaResponse,
      n = i.phoneEnrollmentInfo.clientType,
      a = i.phoneEnrollmentInfo.recaptchaVersion;
    return (
      Object.assign(i, {
        phoneEnrollmentInfo: {
          phoneNumber: e,
          recaptchaToken: r,
          captchaResponse: t,
          clientType: n,
          recaptchaVersion: a,
        },
      }),
      i
    );
  } else if (`phoneSignInInfo` in i) {
    let e = i.phoneSignInInfo.captchaResponse,
      t = i.phoneSignInInfo.clientType,
      n = i.phoneSignInInfo.recaptchaVersion;
    return (
      Object.assign(i, {
        phoneSignInInfo: {
          recaptchaToken: r,
          captchaResponse: e,
          clientType: t,
          recaptchaVersion: n,
        },
      }),
      i
    );
  } else return (Object.assign(i, { recaptchaToken: r }), i);
}
var Ka = class e {
  constructor(t) {
    ((this.providerId = e.PROVIDER_ID), (this.auth = Kr(t)));
  }
  verifyPhoneNumber(e, t) {
    return Wa(this.auth, e, b(t));
  }
  static credential(e, t) {
    return ki._fromVerification(e, t);
  }
  static credentialFromResult(t) {
    let n = t;
    return e.credentialFromTaggedObject(n);
  }
  static credentialFromError(t) {
    return e.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    let { phoneNumber: t, temporaryProof: n } = e;
    return t && n ? ki._fromTokenResponse(t, n) : null;
  }
};
((Ka.PROVIDER_ID = `phone`), (Ka.PHONE_SIGN_IN_METHOD = `phone`));
function qa(e, t) {
  return t ? Cr(t) : (O(e._popupRedirectResolver, e, `argument-error`), e._popupRedirectResolver);
}
var Ja = class extends hi {
  constructor(e) {
    (super(`custom`, `custom`), (this.params = e));
  }
  _getIdTokenResponse(e) {
    return xi(e, this._buildIdpRequest());
  }
  _linkToIdToken(e, t) {
    return xi(e, this._buildIdpRequest(t));
  }
  _getReauthenticationResolver(e) {
    return xi(e, this._buildIdpRequest());
  }
  _buildIdpRequest(e) {
    let t = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0,
    };
    return (e && (t.idToken = e), t);
  }
};
function Ya(e) {
  return Ki(e.auth, new Ja(e), e.bypassAuthState);
}
function Xa(e) {
  let { auth: t, user: n } = e;
  return (O(n, t, `internal-error`), Gi(n, new Ja(e), e.bypassAuthState));
}
async function Za(e) {
  let { auth: t, user: n } = e;
  return (O(n, t, `internal-error`), Wi(n, new Ja(e), e.bypassAuthState));
}
var Qa = class {
    constructor(e, t, n, r, i = !1) {
      ((this.auth = e),
        (this.resolver = n),
        (this.user = r),
        (this.bypassAuthState = i),
        (this.pendingPromise = null),
        (this.eventManager = null),
        (this.filter = Array.isArray(t) ? t : [t]));
    }
    execute() {
      return new Promise(async (e, t) => {
        this.pendingPromise = { resolve: e, reject: t };
        try {
          ((this.eventManager = await this.resolver._initialize(this.auth)),
            await this.onExecution(),
            this.eventManager.registerConsumer(this));
        } catch (e) {
          this.reject(e);
        }
      });
    }
    async onAuthEvent(e) {
      let { urlResponse: t, sessionId: n, postBody: r, tenantId: i, error: a, type: o } = e;
      if (a) {
        this.reject(a);
        return;
      }
      let s = {
        auth: this.auth,
        requestUri: t,
        sessionId: n,
        tenantId: i || void 0,
        postBody: r || void 0,
        user: this.user,
        bypassAuthState: this.bypassAuthState,
      };
      try {
        this.resolve(await this.getIdpTask(o)(s));
      } catch (e) {
        this.reject(e);
      }
    }
    onError(e) {
      this.reject(e);
    }
    getIdpTask(e) {
      switch (e) {
        case `signInViaPopup`:
        case `signInViaRedirect`:
          return Ya;
        case `linkViaPopup`:
        case `linkViaRedirect`:
          return Za;
        case `reauthViaPopup`:
        case `reauthViaRedirect`:
          return Xa;
        default:
          D(this.auth, `internal-error`);
      }
    }
    resolve(e) {
      (In(this.pendingPromise, `Pending promise was never set`),
        this.pendingPromise.resolve(e),
        this.unregisterAndCleanUp());
    }
    reject(e) {
      (In(this.pendingPromise, `Pending promise was never set`),
        this.pendingPromise.reject(e),
        this.unregisterAndCleanUp());
    }
    unregisterAndCleanUp() {
      (this.eventManager && this.eventManager.unregisterConsumer(this),
        (this.pendingPromise = null),
        this.cleanUp());
    }
  },
  $a = new Hn(2e3, 1e4);
async function eo(e, t, n) {
  if (w(e.app)) return Promise.reject(An(e, `operation-not-supported-in-this-environment`));
  let r = Kr(e);
  return (Nn(e, t, Pi), new to(r, `signInViaPopup`, t, qa(r, n)).executeNotNull());
}
var to = class e extends Qa {
  constructor(t, n, r, i, a) {
    (super(t, n, i, a),
      (this.provider = r),
      (this.authWindow = null),
      (this.pollId = null),
      e.currentPopupAction && e.currentPopupAction.cancel(),
      (e.currentPopupAction = this));
  }
  async executeNotNull() {
    let e = await this.execute();
    return (O(e, this.auth, `internal-error`), e);
  }
  async onExecution() {
    In(this.filter.length === 1, `Popup operations only handle one event`);
    let e = _a();
    ((this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      e
    )),
      (this.authWindow.associatedEvent = e),
      this.resolver._originValidation(this.auth).catch((e) => {
        this.reject(e);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
        e || this.reject(An(this.auth, `web-storage-unsupported`));
      }),
      this.pollUserCancellation());
  }
  get eventId() {
    return this.authWindow?.associatedEvent || null;
  }
  cancel() {
    this.reject(An(this.auth, `cancelled-popup-request`));
  }
  cleanUp() {
    (this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      (e.currentPopupAction = null));
  }
  pollUserCancellation() {
    let e = () => {
      if (this.authWindow?.window?.closed) {
        this.pollId = window.setTimeout(() => {
          ((this.pollId = null), this.reject(An(this.auth, `popup-closed-by-user`)));
        }, 8e3);
        return;
      }
      this.pollId = window.setTimeout(e, $a.get());
    };
    e();
  }
};
to.currentPopupAction = null;
var no = `pendingRedirect`,
  ro = new Map(),
  io = class extends Qa {
    constructor(e, t, n = !1) {
      (super(
        e,
        [`signInViaRedirect`, `linkViaRedirect`, `reauthViaRedirect`, `unknown`],
        t,
        void 0,
        n
      ),
        (this.eventId = null));
    }
    async execute() {
      let e = ro.get(this.auth._key());
      if (!e) {
        try {
          let t = (await ao(this.resolver, this.auth)) ? await super.execute() : null;
          e = () => Promise.resolve(t);
        } catch (t) {
          e = () => Promise.reject(t);
        }
        ro.set(this.auth._key(), e);
      }
      return (this.bypassAuthState || ro.set(this.auth._key(), () => Promise.resolve(null)), e());
    }
    async onAuthEvent(e) {
      if (e.type === `signInViaRedirect`) return super.onAuthEvent(e);
      if (e.type === `unknown`) {
        this.resolve(null);
        return;
      }
      if (e.eventId) {
        let t = await this.auth._redirectUserForId(e.eventId);
        if (t) return ((this.user = t), super.onAuthEvent(e));
        this.resolve(null);
      }
    }
    async onExecution() {}
    cleanUp() {}
  };
async function ao(e, t) {
  let n = co(t),
    r = so(e);
  if (!(await r._isAvailable())) return !1;
  let i = (await r._get(n)) === `true`;
  return (await r._remove(n), i);
}
function oo(e, t) {
  ro.set(e._key(), t);
}
function so(e) {
  return Cr(e._redirectPersistence);
}
function co(e) {
  return Er(no, e.config.apiKey, e.name);
}
async function lo(e, t, n = !1) {
  if (w(e.app)) return Promise.reject(Mn(e));
  let r = Kr(e),
    i = await new io(r, qa(r, t), n).execute();
  return (
    i &&
      !n &&
      (delete i.user._redirectEventId,
      await r._persistUserIfCurrent(i.user),
      await r._setRedirectUser(null, t)),
    i
  );
}
var uo = 600 * 1e3,
  fo = class {
    constructor(e) {
      ((this.auth = e),
        (this.cachedEventUids = new Set()),
        (this.consumers = new Set()),
        (this.queuedRedirectEvent = null),
        (this.hasHandledPotentialRedirect = !1),
        (this.lastProcessedEventTime = Date.now()));
    }
    registerConsumer(e) {
      (this.consumers.add(e),
        this.queuedRedirectEvent &&
          this.isEventForConsumer(this.queuedRedirectEvent, e) &&
          (this.sendToConsumer(this.queuedRedirectEvent, e),
          this.saveEventToCache(this.queuedRedirectEvent),
          (this.queuedRedirectEvent = null)));
    }
    unregisterConsumer(e) {
      this.consumers.delete(e);
    }
    onEvent(e) {
      if (this.hasEventBeenHandled(e)) return !1;
      let t = !1;
      return (
        this.consumers.forEach((n) => {
          this.isEventForConsumer(e, n) &&
            ((t = !0), this.sendToConsumer(e, n), this.saveEventToCache(e));
        }),
        this.hasHandledPotentialRedirect || !ho(e)
          ? t
          : ((this.hasHandledPotentialRedirect = !0),
            (t ||= ((this.queuedRedirectEvent = e), !0)),
            t)
      );
    }
    sendToConsumer(e, t) {
      if (e.error && !mo(e)) {
        let n = e.error.code?.split(`auth/`)[1] || `internal-error`;
        t.onError(An(this.auth, n));
      } else t.onAuthEvent(e);
    }
    isEventForConsumer(e, t) {
      let n = t.eventId === null || (!!e.eventId && e.eventId === t.eventId);
      return t.filter.includes(e.type) && n;
    }
    hasEventBeenHandled(e) {
      return (
        Date.now() - this.lastProcessedEventTime >= uo && this.cachedEventUids.clear(),
        this.cachedEventUids.has(po(e))
      );
    }
    saveEventToCache(e) {
      (this.cachedEventUids.add(po(e)), (this.lastProcessedEventTime = Date.now()));
    }
  };
function po(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter((e) => e).join(`-`);
}
function mo({ type: e, error: t }) {
  return e === `unknown` && t?.code === `auth/no-auth-event`;
}
function ho(e) {
  switch (e.type) {
    case `signInViaRedirect`:
    case `linkViaRedirect`:
    case `reauthViaRedirect`:
      return !0;
    case `unknown`:
      return mo(e);
    default:
      return !1;
  }
}
async function go(e, t = {}) {
  return A(e, `GET`, `/v1/projects`, t);
}
var _o = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  vo = /^https?/;
async function yo(e) {
  if (e.config.emulator) return;
  let { authorizedDomains: t } = await go(e);
  for (let e of t)
    try {
      if (bo(e)) return;
    } catch {}
  D(e, `unauthorized-domain`);
}
function bo(e) {
  let t = Ln(),
    { protocol: n, hostname: r } = new URL(t);
  if (e.startsWith(`chrome-extension://`)) {
    let i = new URL(e);
    return i.hostname === `` && r === ``
      ? n === `chrome-extension:` &&
          e.replace(`chrome-extension://`, ``) === t.replace(`chrome-extension://`, ``)
      : n === `chrome-extension:` && i.hostname === r;
  }
  if (!vo.test(n)) return !1;
  if (_o.test(e)) return r === e;
  let i = e.replace(/\./g, `\\.`);
  return RegExp(`^(.+\\.` + i + `|` + i + `)$`, `i`).test(r);
}
var xo = new Hn(3e4, 6e4);
function So() {
  let e = ya().___jsl;
  if (e?.H) {
    for (let t of Object.keys(e.H))
      if (
        ((e.H[t].r = e.H[t].r || []), (e.H[t].L = e.H[t].L || []), (e.H[t].r = [...e.H[t].L]), e.CP)
      )
        for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
  }
}
function Co(e) {
  return new Promise((t, n) => {
    function r() {
      (So(),
        gapi.load(`gapi.iframes`, {
          callback: () => {
            t(gapi.iframes.getContext());
          },
          ontimeout: () => {
            (So(), n(An(e, `network-request-failed`)));
          },
          timeout: xo.get(),
        }));
    }
    if (ya().gapi?.iframes?.Iframe) t(gapi.iframes.getContext());
    else if (ya().gapi?.load) r();
    else {
      let t = $r(`iframefcb`);
      return (
        (ya()[t] = () => {
          gapi.load ? r() : n(An(e, `network-request-failed`));
        }),
        Xr(`${Qr()}?onload=${t}`).catch((e) => n(e))
      );
    }
  }).catch((e) => {
    throw ((wo = null), e);
  });
}
var wo = null;
function To(e) {
  return ((wo ||= Co(e)), wo);
}
var Eo = new Hn(5e3, 15e3),
  Do = `__/auth/iframe`,
  Oo = `emulator/auth/iframe`,
  ko = {
    style: { position: `absolute`, top: `-100px`, width: `1px`, height: `1px` },
    "aria-hidden": `true`,
    tabindex: `-1`,
  },
  Ao = new Map([
    [`identitytoolkit.googleapis.com`, `p`],
    [`staging-identitytoolkit.sandbox.googleapis.com`, `s`],
    [`test-identitytoolkit.sandbox.googleapis.com`, `t`],
  ]);
function jo(e) {
  let t = e.config;
  O(t.authDomain, e, `auth-domain-config-required`);
  let n = t.emulator ? Un(t, Oo) : `https://${e.config.authDomain}/${Do}`,
    r = { apiKey: t.apiKey, appName: e.name, v: an },
    i = Ao.get(e.config.apiHost);
  i && (r.eid = i);
  let a = e._getFrameworks();
  return (a.length && (r.fw = a.join(`,`)), `${n}?${Ee(r).slice(1)}`);
}
async function Mo(e) {
  let t = await To(e),
    n = ya().gapi;
  return (
    O(n, e, `internal-error`),
    t.open(
      {
        where: document.body,
        url: jo(e),
        messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        attributes: ko,
        dontclear: !0,
      },
      (t) =>
        new Promise(async (n, r) => {
          await t.restyle({ setHideOnLeave: !1 });
          let i = An(e, `network-request-failed`),
            a = ya().setTimeout(() => {
              r(i);
            }, Eo.get());
          function o() {
            (ya().clearTimeout(a), n(t));
          }
          t.ping(o).then(o, () => {
            r(i);
          });
        })
    )
  );
}
var No = { location: `yes`, resizable: `yes`, statusbar: `yes`, toolbar: `no` },
  Po = 500,
  Fo = 600,
  Io = `_blank`,
  Lo = `http://localhost`,
  Ro = class {
    constructor(e) {
      ((this.window = e), (this.associatedEvent = null));
    }
    close() {
      if (this.window)
        try {
          this.window.close();
        } catch {}
    }
  };
function zo(e, t, n, r = Po, i = Fo) {
  let a = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
    o = Math.max((window.screen.availWidth - r) / 2, 0).toString(),
    s = ``,
    c = { ...No, width: r.toString(), height: i.toString(), top: a, left: o },
    l = _().toLowerCase();
  (n && (s = jr(l) ? Io : n), kr(l) && ((t ||= Lo), (c.scrollbars = `yes`)));
  let u = Object.entries(c).reduce((e, [t, n]) => `${e}${t}=${n},`, ``);
  if (Lr(l) && s !== `_self`) return (Bo(t || ``, s), new Ro(null));
  let d = window.open(t || ``, s, u);
  O(d, e, `popup-blocked`);
  try {
    d.focus();
  } catch {}
  return new Ro(d);
}
function Bo(e, t) {
  let n = document.createElement(`a`);
  ((n.href = e), (n.target = t));
  let r = document.createEvent(`MouseEvent`);
  (r.initMouseEvent(`click`, !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null),
    n.dispatchEvent(r));
}
var Vo = `__/auth/handler`,
  Ho = `emulator/auth/handler`,
  Uo = `fac`;
async function Wo(e, t, n, r, i, a) {
  (O(e.config.authDomain, e, `auth-domain-config-required`),
    O(e.config.apiKey, e, `invalid-api-key`));
  let o = {
    apiKey: e.config.apiKey,
    appName: e.name,
    authType: n,
    redirectUrl: r,
    v: an,
    eventId: i,
  };
  if (t instanceof Pi) {
    (t.setDefaultLanguage(e.languageCode),
      (o.providerId = t.providerId || ``),
      Ce(t.getCustomParameters()) ||
        (o.customParameters = JSON.stringify(t.getCustomParameters())));
    for (let [e, t] of Object.entries(a || {})) o[e] = t;
  }
  if (t instanceof Fi) {
    let e = t.getScopes().filter((e) => e !== ``);
    e.length > 0 && (o.scopes = e.join(`,`));
  }
  e.tenantId && (o.tid = e.tenantId);
  let s = o;
  for (let e of Object.keys(s)) s[e] === void 0 && delete s[e];
  let c = await e._getAppCheckToken(),
    l = c ? `#${Uo}=${encodeURIComponent(c)}` : ``;
  return `${Go(e)}?${Ee(s).slice(1)}${l}`;
}
function Go({ config: e }) {
  return e.emulator ? Un(e, Ho) : `https://${e.authDomain}/${Vo}`;
}
var Ko = `webStorageSupport`,
  qo = class {
    constructor() {
      ((this.eventManagers = {}),
        (this.iframes = {}),
        (this.originValidationPromises = {}),
        (this._redirectPersistence = ma),
        (this._completeRedirectFn = lo),
        (this._overrideRedirectResult = oo));
    }
    async _openPopup(e, t, n, r) {
      return (
        In(this.eventManagers[e._key()]?.manager, `_initialize() not called before _openPopup()`),
        zo(e, await Wo(e, t, n, Ln(), r), _a())
      );
    }
    async _openRedirect(e, t, n, r) {
      return (
        await this._originValidation(e),
        ba(await Wo(e, t, n, Ln(), r)),
        new Promise(() => {})
      );
    }
    _initialize(e) {
      let t = e._key();
      if (this.eventManagers[t]) {
        let { manager: e, promise: n } = this.eventManagers[t];
        return e ? Promise.resolve(e) : (In(n, `If manager is not set, promise should be`), n);
      }
      let n = this.initAndGetManager(e);
      return (
        (this.eventManagers[t] = { promise: n }),
        n.catch(() => {
          delete this.eventManagers[t];
        }),
        n
      );
    }
    async initAndGetManager(e) {
      let t = await Mo(e),
        n = new fo(e);
      return (
        t.register(
          `authEvent`,
          (t) => (
            O(t?.authEvent, e, `invalid-auth-event`),
            { status: n.onEvent(t.authEvent) ? `ACK` : `ERROR` }
          ),
          gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
        ),
        (this.eventManagers[e._key()] = { manager: n }),
        (this.iframes[e._key()] = t),
        n
      );
    }
    _isIframeWebStorageSupported(e, t) {
      this.iframes[e._key()].send(
        Ko,
        { type: Ko },
        (n) => {
          let r = n?.[0]?.[Ko];
          (r !== void 0 && t(!!r), D(e, `internal-error`));
        },
        gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
      );
    }
    _originValidation(e) {
      let t = e._key();
      return (
        this.originValidationPromises[t] || (this.originValidationPromises[t] = yo(e)),
        this.originValidationPromises[t]
      );
    }
    get _shouldInitProactively() {
      return zr() || Ar() || Ir();
    }
  },
  Jo = class {
    constructor(e) {
      this.factorId = e;
    }
    _process(e, t, n) {
      switch (t.type) {
        case `enroll`:
          return this._finalizeEnroll(e, t.credential, n);
        case `signin`:
          return this._finalizeSignIn(e, t.credential);
        default:
          return Fn(`unexpected MultiFactorSessionType`);
      }
    }
  },
  Yo = class e extends Jo {
    constructor(e) {
      (super(`phone`), (this.credential = e));
    }
    static _fromCredential(t) {
      return new e(t);
    }
    _finalizeEnroll(e, t, n) {
      return ea(e, {
        idToken: t,
        displayName: n,
        phoneVerificationInfo: this.credential._makeVerificationRequest(),
      });
    }
    _finalizeSignIn(e, t) {
      return Va(e, {
        mfaPendingCredential: t,
        phoneVerificationInfo: this.credential._makeVerificationRequest(),
      });
    }
  },
  Xo = class {
    constructor() {}
    static assertion(e) {
      return Yo._fromCredential(e);
    }
  };
Xo.FACTOR_ID = `phone`;
var Zo = class {
  static assertionForEnrollment(e, t) {
    return Qo._fromSecret(e, t);
  }
  static assertionForSignIn(e, t) {
    return Qo._fromEnrollmentId(e, t);
  }
  static async generateSecret(e) {
    let t = e;
    O(t.user?.auth !== void 0, `internal-error`);
    let n = await ta(t.user.auth, { idToken: t.credential, totpEnrollmentInfo: {} });
    return $o._fromStartTotpMfaEnrollmentResponse(n, t.user.auth);
  }
};
Zo.FACTOR_ID = `totp`;
var Qo = class e extends Jo {
    constructor(e, t, n) {
      (super(`totp`), (this.otp = e), (this.enrollmentId = t), (this.secret = n));
    }
    static _fromSecret(t, n) {
      return new e(n, void 0, t);
    }
    static _fromEnrollmentId(t, n) {
      return new e(n, t);
    }
    async _finalizeEnroll(e, t, n) {
      return (
        O(this.secret !== void 0, e, `argument-error`),
        na(e, {
          idToken: t,
          displayName: n,
          totpVerificationInfo: this.secret._makeTotpVerificationInfo(this.otp),
        })
      );
    }
    async _finalizeSignIn(e, t) {
      O(this.enrollmentId !== void 0 && this.otp !== void 0, e, `argument-error`);
      let n = { verificationCode: this.otp };
      return Ha(e, {
        mfaPendingCredential: t,
        mfaEnrollmentId: this.enrollmentId,
        totpVerificationInfo: n,
      });
    }
  },
  $o = class e {
    constructor(e, t, n, r, i, a, o) {
      ((this.sessionInfo = a),
        (this.auth = o),
        (this.secretKey = e),
        (this.hashingAlgorithm = t),
        (this.codeLength = n),
        (this.codeIntervalSeconds = r),
        (this.enrollmentCompletionDeadline = i));
    }
    static _fromStartTotpMfaEnrollmentResponse(t, n) {
      return new e(
        t.totpSessionInfo.sharedSecretKey,
        t.totpSessionInfo.hashingAlgorithm,
        t.totpSessionInfo.verificationCodeLength,
        t.totpSessionInfo.periodSec,
        new Date(t.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),
        t.totpSessionInfo.sessionInfo,
        n
      );
    }
    _makeTotpVerificationInfo(e) {
      return { sessionInfo: this.sessionInfo, verificationCode: e };
    }
    generateQrCodeUrl(e, t) {
      let n = !1;
      return (
        (es(e) || es(t)) && (n = !0),
        n &&
          (es(e) && (e = this.auth.currentUser?.email || `unknownuser`),
          es(t) && (t = this.auth.name)),
        `otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`
      );
    }
  };
function es(e) {
  return e === void 0 || e?.length === 0;
}
var ts = `@firebase/auth`,
  ns = `1.12.0`,
  rs = class {
    constructor(e) {
      ((this.auth = e), (this.internalListeners = new Map()));
    }
    getUid() {
      return (this.assertAuthConfigured(), this.auth.currentUser?.uid || null);
    }
    async getToken(e) {
      return (
        this.assertAuthConfigured(),
        await this.auth._initializationPromise,
        this.auth.currentUser ? { accessToken: await this.auth.currentUser.getIdToken(e) } : null
      );
    }
    addAuthTokenListener(e) {
      if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
      let t = this.auth.onIdTokenChanged((t) => {
        e(t?.stsTokenManager.accessToken || null);
      });
      (this.internalListeners.set(e, t), this.updateProactiveRefresh());
    }
    removeAuthTokenListener(e) {
      this.assertAuthConfigured();
      let t = this.internalListeners.get(e);
      t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
    }
    assertAuthConfigured() {
      O(this.auth._initializationPromise, `dependent-sdk-initialized-before-auth`);
    }
    updateProactiveRefresh() {
      this.internalListeners.size > 0
        ? this.auth._startProactiveRefresh()
        : this.auth._stopProactiveRefresh();
    }
  };
function is(e) {
  switch (e) {
    case `Node`:
      return `node`;
    case `ReactNative`:
      return `rn`;
    case `Worker`:
      return `webworker`;
    case `Cordova`:
      return `cordova`;
    case `WebExtension`:
      return `web-extension`;
    default:
      return;
  }
}
function as(e) {
  (en(
    new Le(
      `auth`,
      (t, { options: n }) => {
        let r = t.getProvider(`app`).getImmediate(),
          i = t.getProvider(`heartbeat`),
          a = t.getProvider(`app-check-internal`),
          { apiKey: o, authDomain: s } = r.options;
        O(o && !o.includes(`:`), `invalid-api-key`, { appName: r.name });
        let c = new Gr(r, i, a, {
          apiKey: o,
          authDomain: s,
          clientPlatform: e,
          apiHost: `identitytoolkit.googleapis.com`,
          tokenApiHost: `securetoken.googleapis.com`,
          apiScheme: `https`,
          sdkClientVersion: Br(e),
        });
        return (li(c, n), c);
      },
      `PUBLIC`
    )
      .setInstantiationMode(`EXPLICIT`)
      .setInstanceCreatedCallback((e, t, n) => {
        e.getProvider(`auth-internal`).initialize();
      })
  ),
    en(
      new Le(
        `auth-internal`,
        (e) => ((e) => new rs(e))(Kr(e.getProvider(`auth`).getImmediate())),
        `PRIVATE`
      ).setInstantiationMode(`EXPLICIT`)
    ),
    T(ts, ns, is(e)),
    T(ts, ns, `esm2020`));
}
var os = g(`authIdTokenMaxAge`) || 300,
  ss = null,
  cs = (e) => async (t) => {
    let n = t && (await t.getIdTokenResult()),
      r = n && (new Date().getTime() - Date.parse(n.issuedAtTime)) / 1e3;
    if (r && r > os) return;
    let i = n?.token;
    ss !== i &&
      ((ss = i),
      await fetch(e, {
        method: i ? `POST` : `DELETE`,
        headers: i ? { Authorization: `Bearer ${i}` } : {},
      }));
  };
function ls(e = sn()) {
  let t = tn(e, `auth`);
  if (t.isInitialized()) return t.getImmediate();
  let n = ci(e, { popupRedirectResolver: qo, persistence: [za, ca, ma] }),
    r = g(`authTokenSyncURL`);
  if (r && typeof isSecureContext == `boolean` && isSecureContext) {
    let e = new URL(r, location.origin);
    if (location.origin === e.origin) {
      let t = cs(e.toString());
      (Xi(n, t, () => t(n.currentUser)), Yi(n, (e) => t(e)));
    }
  }
  let i = p(`auth`);
  return (i && ui(n, `http://${i}`), n);
}
function us() {
  return document.getElementsByTagName(`head`)?.[0] ?? document;
}
(Yr({
  loadJS(e) {
    return new Promise((t, n) => {
      let r = document.createElement(`script`);
      (r.setAttribute(`src`, e),
        (r.onload = t),
        (r.onerror = (e) => {
          let t = An(`internal-error`);
          ((t.customData = e), n(t));
        }),
        (r.type = `text/javascript`),
        (r.charset = `UTF-8`),
        us().appendChild(r));
    });
  },
  gapiScript: `https://apis.google.com/js/api.js`,
  recaptchaV2Script: `https://www.google.com/recaptcha/api.js`,
  recaptchaEnterpriseScript: `https://www.google.com/recaptcha/enterprise.js?render=`,
}),
  as(`Browser`));
var ds = `@firebase/installations`,
  fs = `0.6.19`,
  ps = 1e4,
  ms = `w:${fs}`,
  hs = `FIS_v2`,
  gs = `https://firebaseinstallations.googleapis.com/v1`,
  _s = 3600 * 1e3,
  vs = new be(`installations`, `Installations`, {
    "missing-app-config-values": `Missing App configuration value: "{$valueName}"`,
    "not-registered": `Firebase Installation is not registered.`,
    "installation-not-found": `Firebase Installation not found.`,
    "request-failed": `{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"`,
    "app-offline": `Could not process request. Application offline.`,
    "delete-pending-registration": `Can't delete installation while there is a pending registration request.`,
  });
function ys(e) {
  return e instanceof ye && e.code.includes(`request-failed`);
}
function bs({ projectId: e }) {
  return `${gs}/projects/${e}/installations`;
}
function xs(e) {
  return { token: e.token, requestStatus: 2, expiresIn: Es(e.expiresIn), creationTime: Date.now() };
}
async function Ss(e, t) {
  let n = (await t.json()).error;
  return vs.create(`request-failed`, {
    requestName: e,
    serverCode: n.code,
    serverMessage: n.message,
    serverStatus: n.status,
  });
}
function Cs({ apiKey: e }) {
  return new Headers({
    "Content-Type": `application/json`,
    Accept: `application/json`,
    "x-goog-api-key": e,
  });
}
function ws(e, { refreshToken: t }) {
  let n = Cs(e);
  return (n.append(`Authorization`, Ds(t)), n);
}
async function Ts(e) {
  let t = await e();
  return t.status >= 500 && t.status < 600 ? e() : t;
}
function Es(e) {
  return Number(e.replace(`s`, `000`));
}
function Ds(e) {
  return `${hs} ${e}`;
}
async function Os({ appConfig: e, heartbeatServiceProvider: t }, { fid: n }) {
  let r = bs(e),
    i = Cs(e),
    a = t.getImmediate({ optional: !0 });
  if (a) {
    let e = await a.getHeartbeatsHeader();
    e && i.append(`x-firebase-client`, e);
  }
  let o = { fid: n, authVersion: hs, appId: e.appId, sdkVersion: ms },
    s = { method: `POST`, headers: i, body: JSON.stringify(o) },
    c = await Ts(() => fetch(r, s));
  if (c.ok) {
    let e = await c.json();
    return {
      fid: e.fid || n,
      registrationStatus: 2,
      refreshToken: e.refreshToken,
      authToken: xs(e.authToken),
    };
  } else throw await Ss(`Create Installation`, c);
}
function ks(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function As(e) {
  return btoa(String.fromCharCode(...e))
    .replace(/\+/g, `-`)
    .replace(/\//g, `_`);
}
var js = /^[cdef][\w-]{21}$/,
  Ms = ``;
function Ns() {
  try {
    let e = new Uint8Array(17);
    ((self.crypto || self.msCrypto).getRandomValues(e), (e[0] = 112 + (e[0] % 16)));
    let t = Ps(e);
    return js.test(t) ? t : Ms;
  } catch {
    return Ms;
  }
}
function Ps(e) {
  return As(e).substr(0, 22);
}
function Fs(e) {
  return `${e.appName}!${e.appId}`;
}
var Is = new Map();
function Ls(e, t) {
  let n = Fs(e);
  (Rs(n, t), zs(n, t));
}
function Rs(e, t) {
  let n = Is.get(e);
  if (n) for (let e of n) e(t);
}
function zs(e, t) {
  let n = Vs();
  (n && n.postMessage({ key: e, fid: t }), Hs());
}
var Bs = null;
function Vs() {
  return (
    !Bs &&
      `BroadcastChannel` in self &&
      ((Bs = new BroadcastChannel(`[Firebase] FID Change`)),
      (Bs.onmessage = (e) => {
        Rs(e.data.key, e.data.fid);
      })),
    Bs
  );
}
function Hs() {
  Is.size === 0 && Bs && (Bs.close(), (Bs = null));
}
var Us = `firebase-installations-database`,
  Ws = 1,
  Gs = `firebase-installations-store`,
  Ks = null;
function qs() {
  return (
    (Ks ||= ft(Us, Ws, {
      upgrade: (e, t) => {
        switch (t) {
          case 0:
            e.createObjectStore(Gs);
        }
      },
    })),
    Ks
  );
}
async function Js(e, t) {
  let n = Fs(e),
    r = (await qs()).transaction(Gs, `readwrite`),
    i = r.objectStore(Gs),
    a = await i.get(n);
  return (await i.put(t, n), await r.done, (!a || a.fid !== t.fid) && Ls(e, t.fid), t);
}
async function Ys(e) {
  let t = Fs(e),
    n = (await qs()).transaction(Gs, `readwrite`);
  (await n.objectStore(Gs).delete(t), await n.done);
}
async function Xs(e, t) {
  let n = Fs(e),
    r = (await qs()).transaction(Gs, `readwrite`),
    i = r.objectStore(Gs),
    a = await i.get(n),
    o = t(a);
  return (
    o === void 0 ? await i.delete(n) : await i.put(o, n),
    await r.done,
    o && (!a || a.fid !== o.fid) && Ls(e, o.fid),
    o
  );
}
async function Zs(e) {
  let t,
    n = await Xs(e.appConfig, (n) => {
      let r = $s(e, Qs(n));
      return ((t = r.registrationPromise), r.installationEntry);
    });
  return n.fid === Ms
    ? { installationEntry: await t }
    : { installationEntry: n, registrationPromise: t };
}
function Qs(e) {
  return rc(e || { fid: Ns(), registrationStatus: 0 });
}
function $s(e, t) {
  if (t.registrationStatus === 0) {
    if (!navigator.onLine)
      return {
        installationEntry: t,
        registrationPromise: Promise.reject(vs.create(`app-offline`)),
      };
    let n = { fid: t.fid, registrationStatus: 1, registrationTime: Date.now() };
    return { installationEntry: n, registrationPromise: ec(e, n) };
  } else if (t.registrationStatus === 1)
    return { installationEntry: t, registrationPromise: tc(e) };
  else return { installationEntry: t };
}
async function ec(e, t) {
  try {
    let n = await Os(e, t);
    return Js(e.appConfig, n);
  } catch (n) {
    throw (
      ys(n) && n.customData.serverCode === 409
        ? await Ys(e.appConfig)
        : await Js(e.appConfig, { fid: t.fid, registrationStatus: 0 }),
      n
    );
  }
}
async function tc(e) {
  let t = await nc(e.appConfig);
  for (; t.registrationStatus === 1; ) (await ks(100), (t = await nc(e.appConfig)));
  if (t.registrationStatus === 0) {
    let { installationEntry: t, registrationPromise: n } = await Zs(e);
    return n || t;
  }
  return t;
}
function nc(e) {
  return Xs(e, (e) => {
    if (!e) throw vs.create(`installation-not-found`);
    return rc(e);
  });
}
function rc(e) {
  return ic(e) ? { fid: e.fid, registrationStatus: 0 } : e;
}
function ic(e) {
  return e.registrationStatus === 1 && e.registrationTime + ps < Date.now();
}
async function ac({ appConfig: e, heartbeatServiceProvider: t }, n) {
  let r = oc(e, n),
    i = ws(e, n),
    a = t.getImmediate({ optional: !0 });
  if (a) {
    let e = await a.getHeartbeatsHeader();
    e && i.append(`x-firebase-client`, e);
  }
  let o = { installation: { sdkVersion: ms, appId: e.appId } },
    s = { method: `POST`, headers: i, body: JSON.stringify(o) },
    c = await Ts(() => fetch(r, s));
  if (c.ok) return xs(await c.json());
  throw await Ss(`Generate Auth Token`, c);
}
function oc(e, { fid: t }) {
  return `${bs(e)}/${t}/authTokens:generate`;
}
async function sc(e, t = !1) {
  let n,
    r = await Xs(e.appConfig, (r) => {
      if (!dc(r)) throw vs.create(`not-registered`);
      let i = r.authToken;
      if (!t && fc(i)) return r;
      if (i.requestStatus === 1) return ((n = cc(e, t)), r);
      {
        if (!navigator.onLine) throw vs.create(`app-offline`);
        let t = mc(r);
        return ((n = uc(e, t)), t);
      }
    });
  return n ? await n : r.authToken;
}
async function cc(e, t) {
  let n = await lc(e.appConfig);
  for (; n.authToken.requestStatus === 1; ) (await ks(100), (n = await lc(e.appConfig)));
  let r = n.authToken;
  return r.requestStatus === 0 ? sc(e, t) : r;
}
function lc(e) {
  return Xs(e, (e) => {
    if (!dc(e)) throw vs.create(`not-registered`);
    let t = e.authToken;
    return hc(t) ? { ...e, authToken: { requestStatus: 0 } } : e;
  });
}
async function uc(e, t) {
  try {
    let n = await ac(e, t),
      r = { ...t, authToken: n };
    return (await Js(e.appConfig, r), n);
  } catch (n) {
    if (ys(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
      await Ys(e.appConfig);
    else {
      let n = { ...t, authToken: { requestStatus: 0 } };
      await Js(e.appConfig, n);
    }
    throw n;
  }
}
function dc(e) {
  return e !== void 0 && e.registrationStatus === 2;
}
function fc(e) {
  return e.requestStatus === 2 && !pc(e);
}
function pc(e) {
  let t = Date.now();
  return t < e.creationTime || e.creationTime + e.expiresIn < t + _s;
}
function mc(e) {
  let t = { requestStatus: 1, requestTime: Date.now() };
  return { ...e, authToken: t };
}
function hc(e) {
  return e.requestStatus === 1 && e.requestTime + ps < Date.now();
}
async function gc(e) {
  let t = e,
    { installationEntry: n, registrationPromise: r } = await Zs(t);
  return (r ? r.catch(console.error) : sc(t).catch(console.error), n.fid);
}
async function _c(e, t = !1) {
  let n = e;
  return (await vc(n), (await sc(n, t)).token);
}
async function vc(e) {
  let { registrationPromise: t } = await Zs(e);
  t && (await t);
}
function yc(e) {
  if (!e || !e.options) throw bc(`App Configuration`);
  if (!e.name) throw bc(`App Name`);
  for (let t of [`projectId`, `apiKey`, `appId`]) if (!e.options[t]) throw bc(t);
  return {
    appName: e.name,
    projectId: e.options.projectId,
    apiKey: e.options.apiKey,
    appId: e.options.appId,
  };
}
function bc(e) {
  return vs.create(`missing-app-config-values`, { valueName: e });
}
var xc = `installations`,
  Sc = `installations-internal`,
  Cc = (e) => {
    let t = e.getProvider(`app`).getImmediate();
    return {
      app: t,
      appConfig: yc(t),
      heartbeatServiceProvider: tn(t, `heartbeat`),
      _delete: () => Promise.resolve(),
    };
  },
  wc = (e) => {
    let t = tn(e.getProvider(`app`).getImmediate(), xc).getImmediate();
    return { getId: () => gc(t), getToken: (e) => _c(t, e) };
  };
function Tc() {
  (en(new Le(xc, Cc, `PUBLIC`)), en(new Le(Sc, wc, `PRIVATE`)));
}
(Tc(), T(ds, fs), T(ds, fs, `esm2020`));
var Ec = `analytics`,
  Dc = `firebase_id`,
  Oc = `origin`,
  kc = 60 * 1e3,
  Ac = `https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig`,
  jc = `https://www.googletagmanager.com/gtag/js`,
  Mc = new Je(`@firebase/analytics`),
  Nc = new be(`analytics`, `Analytics`, {
    "already-exists": `A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.`,
    "already-initialized": `initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.`,
    "already-initialized-settings": `Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.`,
    "interop-component-reg-failed": `Firebase Analytics Interop Component failed to instantiate: {$reason}`,
    "invalid-analytics-context": `Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}`,
    "indexeddb-unavailable": `IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}`,
    "fetch-throttle": `The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.`,
    "config-fetch-failed": `Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}`,
    "no-api-key": `The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.`,
    "no-app-id": `The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.`,
    "no-client-id": `The "client_id" field is empty.`,
    "invalid-gtag-resource": `Trusted Types detected an invalid gtag resource: {$gtagURL}.`,
  });
function Pc(e) {
  if (!e.startsWith(jc)) {
    let t = Nc.create(`invalid-gtag-resource`, { gtagURL: e });
    return (Mc.warn(t.message), ``);
  }
  return e;
}
function Fc(e) {
  return Promise.all(e.map((e) => e.catch((e) => e)));
}
function Ic(e, t) {
  let n;
  return (window.trustedTypes && (n = window.trustedTypes.createPolicy(e, t)), n);
}
function Lc(e, t) {
  let n = Ic(`firebase-js-sdk-policy`, { createScriptURL: Pc }),
    r = document.createElement(`script`),
    i = `${jc}?l=${e}&id=${t}`;
  ((r.src = n ? n?.createScriptURL(i) : i), (r.async = !0), document.head.appendChild(r));
}
function Rc(e) {
  let t = [];
  return (Array.isArray(window[e]) ? (t = window[e]) : (window[e] = t), t);
}
async function zc(e, t, n, r, i, a) {
  let o = r[i];
  try {
    if (o) await t[o];
    else {
      let e = (await Fc(n)).find((e) => e.measurementId === i);
      e && (await t[e.appId]);
    }
  } catch (e) {
    Mc.error(e);
  }
  e(`config`, i, a);
}
async function Bc(e, t, n, r, i) {
  try {
    let a = [];
    if (i && i.send_to) {
      let e = i.send_to;
      Array.isArray(e) || (e = [e]);
      let r = await Fc(n);
      for (let n of e) {
        let e = r.find((e) => e.measurementId === n),
          i = e && t[e.appId];
        if (i) a.push(i);
        else {
          a = [];
          break;
        }
      }
    }
    (a.length === 0 && (a = Object.values(t)), await Promise.all(a), e(`event`, r, i || {}));
  } catch (e) {
    Mc.error(e);
  }
}
function Vc(e, t, n, r) {
  async function i(i, ...a) {
    try {
      if (i === `event`) {
        let [r, i] = a;
        await Bc(e, t, n, r, i);
      } else if (i === `config`) {
        let [i, o] = a;
        await zc(e, t, n, r, i, o);
      } else if (i === `consent`) {
        let [t, n] = a;
        e(`consent`, t, n);
      } else if (i === `get`) {
        let [t, n, r] = a;
        e(`get`, t, n, r);
      } else if (i === `set`) {
        let [t] = a;
        e(`set`, t);
      } else e(i, ...a);
    } catch (e) {
      Mc.error(e);
    }
  }
  return i;
}
function Hc(e, t, n, r, i) {
  let a = function (...e) {
    window[r].push(arguments);
  };
  return (
    window[i] && typeof window[i] == `function` && (a = window[i]),
    (window[i] = Vc(a, e, t, n)),
    { gtagCore: a, wrappedGtag: window[i] }
  );
}
function Uc(e) {
  let t = window.document.getElementsByTagName(`script`);
  for (let n of Object.values(t)) if (n.src && n.src.includes(jc) && n.src.includes(e)) return n;
  return null;
}
var Wc = 30,
  Gc = 1e3,
  Kc = new (class {
    constructor(e = {}, t = Gc) {
      ((this.throttleMetadata = e), (this.intervalMillis = t));
    }
    getThrottleMetadata(e) {
      return this.throttleMetadata[e];
    }
    setThrottleMetadata(e, t) {
      this.throttleMetadata[e] = t;
    }
    deleteThrottleMetadata(e) {
      delete this.throttleMetadata[e];
    }
  })();
function qc(e) {
  return new Headers({ Accept: `application/json`, "x-goog-api-key": e });
}
async function Jc(e) {
  let { appId: t, apiKey: n } = e,
    r = { method: `GET`, headers: qc(n) },
    i = Ac.replace(`{app-id}`, t),
    a = await fetch(i, r);
  if (a.status !== 200 && a.status !== 304) {
    let e = ``;
    try {
      let t = await a.json();
      t.error?.message && (e = t.error.message);
    } catch {}
    throw Nc.create(`config-fetch-failed`, { httpStatus: a.status, responseMessage: e });
  }
  return a.json();
}
async function Yc(e, t = Kc, n) {
  let { appId: r, apiKey: i, measurementId: a } = e.options;
  if (!r) throw Nc.create(`no-app-id`);
  if (!i) {
    if (a) return { measurementId: a, appId: r };
    throw Nc.create(`no-api-key`);
  }
  let o = t.getThrottleMetadata(r) || { backoffCount: 0, throttleEndTimeMillis: Date.now() },
    s = new $c();
  return (
    setTimeout(
      async () => {
        s.abort();
      },
      n === void 0 ? kc : n
    ),
    Xc({ appId: r, apiKey: i, measurementId: a }, o, s, t)
  );
}
async function Xc(e, { throttleEndTimeMillis: t, backoffCount: n }, r, i = Kc) {
  let { appId: a, measurementId: o } = e;
  try {
    await Zc(r, t);
  } catch (e) {
    if (o)
      return (
        Mc.warn(
          `Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${e?.message}]`
        ),
        { appId: a, measurementId: o }
      );
    throw e;
  }
  try {
    let t = await Jc(e);
    return (i.deleteThrottleMetadata(a), t);
  } catch (t) {
    let s = t;
    if (!Qc(s)) {
      if ((i.deleteThrottleMetadata(a), o))
        return (
          Mc.warn(
            `Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${s?.message}]`
          ),
          { appId: a, measurementId: o }
        );
      throw t;
    }
    let c =
        Number(s?.customData?.httpStatus) === 503
          ? y(n, i.intervalMillis, Wc)
          : y(n, i.intervalMillis),
      l = { throttleEndTimeMillis: Date.now() + c, backoffCount: n + 1 };
    return (
      i.setThrottleMetadata(a, l),
      Mc.debug(`Calling attemptFetch again in ${c} millis`),
      Xc(e, l, r, i)
    );
  }
}
function Zc(e, t) {
  return new Promise((n, r) => {
    let i = Math.max(t - Date.now(), 0),
      a = setTimeout(n, i);
    e.addEventListener(() => {
      (clearTimeout(a), r(Nc.create(`fetch-throttle`, { throttleEndTimeMillis: t })));
    });
  });
}
function Qc(e) {
  if (!(e instanceof ye) || !e.customData) return !1;
  let t = Number(e.customData.httpStatus);
  return t === 429 || t === 500 || t === 503 || t === 504;
}
var $c = class {
    constructor() {
      this.listeners = [];
    }
    addEventListener(e) {
      this.listeners.push(e);
    }
    abort() {
      this.listeners.forEach((e) => e());
    }
  },
  el;
async function tl(e, t, n, r, i) {
  if (i && i.global) {
    e(`event`, n, r);
    return;
  } else {
    let i = await t;
    e(`event`, n, { ...r, send_to: i });
  }
}
async function nl(e, t, n, r) {
  if (r && r.global) {
    let t = {};
    for (let e of Object.keys(n)) t[`user_properties.${e}`] = n[e];
    return (e(`set`, t), Promise.resolve());
  } else e(`config`, await t, { update: !0, user_properties: n });
}
var rl;
function il(e) {
  rl = e;
}
function al(e) {
  el = e;
}
async function ol() {
  if (he())
    try {
      await ge();
    } catch (e) {
      return (
        Mc.warn(Nc.create(`indexeddb-unavailable`, { errorInfo: e?.toString() }).message),
        !1
      );
    }
  else
    return (
      Mc.warn(
        Nc.create(`indexeddb-unavailable`, {
          errorInfo: `IndexedDB is not available in this environment.`,
        }).message
      ),
      !1
    );
  return !0;
}
async function sl(e, t, n, r, i, a, o) {
  let s = Yc(e);
  (s
    .then((t) => {
      ((n[t.measurementId] = t.appId),
        e.options.measurementId &&
          t.measurementId !== e.options.measurementId &&
          Mc.warn(
            `The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`
          ));
    })
    .catch((e) => Mc.error(e)),
    t.push(s));
  let c = ol().then((e) => {
      if (e) return r.getId();
    }),
    [l, u] = await Promise.all([s, c]);
  (Uc(a) || Lc(a, l.measurementId),
    rl && (i(`consent`, `default`, rl), il(void 0)),
    i(`js`, new Date()));
  let d = o?.config ?? {};
  return (
    (d[Oc] = `firebase`),
    (d.update = !0),
    u != null && (d[Dc] = u),
    i(`config`, l.measurementId, d),
    el && (i(`set`, el), al(void 0)),
    l.measurementId
  );
}
var cl = class {
    constructor(e) {
      this.app = e;
    }
    _delete() {
      return (delete ll[this.app.options.appId], Promise.resolve());
    }
  },
  ll = {},
  ul = [],
  dl = {},
  fl = `dataLayer`,
  pl = `gtag`,
  ml,
  hl,
  gl = !1;
function _l() {
  let e = [];
  if (
    (de() && e.push(`This is a browser extension environment.`),
    _e() || e.push(`Cookies are not available.`),
    e.length > 0)
  ) {
    let t = e.map((e, t) => `(${t + 1}) ${e}`).join(` `),
      n = Nc.create(`invalid-analytics-context`, { errorInfo: t });
    Mc.warn(n.message);
  }
}
function vl(e, t, n) {
  _l();
  let r = e.options.appId;
  if (!r) throw Nc.create(`no-app-id`);
  if (!e.options.apiKey)
    if (e.options.measurementId)
      Mc.warn(
        `The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`
      );
    else throw Nc.create(`no-api-key`);
  if (ll[r] != null) throw Nc.create(`already-exists`, { id: r });
  if (!gl) {
    Rc(fl);
    let { wrappedGtag: e, gtagCore: t } = Hc(ll, ul, dl, fl, pl);
    ((hl = e), (ml = t), (gl = !0));
  }
  return ((ll[r] = sl(e, ul, dl, t, ml, fl, n)), new cl(e));
}
function yl(e = sn()) {
  e = b(e);
  let t = tn(e, Ec);
  return t.isInitialized() ? t.getImmediate() : bl(e);
}
function bl(e, t = {}) {
  let n = tn(e, Ec);
  if (n.isInitialized()) {
    let e = n.getImmediate();
    if (we(t, n.getOptions())) return e;
    throw Nc.create(`already-initialized`);
  }
  return n.initialize({ options: t });
}
function xl(e, t, n) {
  ((e = b(e)), nl(hl, ll[e.app.options.appId], t, n).catch((e) => Mc.error(e)));
}
function Sl(e, t, n, r) {
  ((e = b(e)), tl(hl, ll[e.app.options.appId], t, n, r).catch((e) => Mc.error(e)));
}
var Cl = `@firebase/analytics`,
  wl = `0.10.19`;
function Tl() {
  (en(
    new Le(
      Ec,
      (e, { options: t }) =>
        vl(
          e.getProvider(`app`).getImmediate(),
          e.getProvider(`installations-internal`).getImmediate(),
          t
        ),
      `PUBLIC`
    )
  ),
    en(new Le(`analytics-internal`, e, `PRIVATE`)),
    T(Cl, wl),
    T(Cl, wl, `esm2020`));
  function e(e) {
    try {
      let t = e.getProvider(Ec).getImmediate();
      return { logEvent: (e, n, r) => Sl(t, e, n, r), setUserProperties: (e, n) => xl(t, e, n) };
    } catch (e) {
      throw Nc.create(`interop-component-reg-failed`, { reason: e });
    }
  }
}
Tl();
var El =
    typeof globalThis < `u`
      ? globalThis
      : typeof window < `u`
        ? window
        : typeof global < `u`
          ? global
          : typeof self < `u`
            ? self
            : {},
  Dl = {},
  Ol,
  kl;
(function () {
  var e;
  function t(e, t) {
    function n() {}
    ((n.prototype = t.prototype),
      (e.F = t.prototype),
      (e.prototype = new n()),
      (e.prototype.constructor = e),
      (e.D = function (e, n, r) {
        for (var i = Array(arguments.length - 2), a = 2; a < arguments.length; a++)
          i[a - 2] = arguments[a];
        return t.prototype[n].apply(e, i);
      }));
  }
  function n() {
    this.blockSize = -1;
  }
  function r() {
    ((this.blockSize = -1),
      (this.blockSize = 64),
      (this.g = [, , , ,]),
      (this.C = Array(this.blockSize)),
      (this.o = this.h = 0),
      this.u());
  }
  (t(r, n),
    (r.prototype.u = function () {
      ((this.g[0] = 1732584193),
        (this.g[1] = 4023233417),
        (this.g[2] = 2562383102),
        (this.g[3] = 271733878),
        (this.o = this.h = 0));
    }));
  function i(e, t, n) {
    n ||= 0;
    let r = Array(16);
    if (typeof t == `string`)
      for (var i = 0; i < 16; ++i)
        r[i] =
          t.charCodeAt(n++) |
          (t.charCodeAt(n++) << 8) |
          (t.charCodeAt(n++) << 16) |
          (t.charCodeAt(n++) << 24);
    else for (i = 0; i < 16; ++i) r[i] = t[n++] | (t[n++] << 8) | (t[n++] << 16) | (t[n++] << 24);
    ((t = e.g[0]), (n = e.g[1]), (i = e.g[2]));
    let a = e.g[3],
      o;
    ((o = (t + (a ^ (n & (i ^ a))) + r[0] + 3614090360) & 4294967295),
      (t = n + (((o << 7) & 4294967295) | (o >>> 25))),
      (o = (a + (i ^ (t & (n ^ i))) + r[1] + 3905402710) & 4294967295),
      (a = t + (((o << 12) & 4294967295) | (o >>> 20))),
      (o = (i + (n ^ (a & (t ^ n))) + r[2] + 606105819) & 4294967295),
      (i = a + (((o << 17) & 4294967295) | (o >>> 15))),
      (o = (n + (t ^ (i & (a ^ t))) + r[3] + 3250441966) & 4294967295),
      (n = i + (((o << 22) & 4294967295) | (o >>> 10))),
      (o = (t + (a ^ (n & (i ^ a))) + r[4] + 4118548399) & 4294967295),
      (t = n + (((o << 7) & 4294967295) | (o >>> 25))),
      (o = (a + (i ^ (t & (n ^ i))) + r[5] + 1200080426) & 4294967295),
      (a = t + (((o << 12) & 4294967295) | (o >>> 20))),
      (o = (i + (n ^ (a & (t ^ n))) + r[6] + 2821735955) & 4294967295),
      (i = a + (((o << 17) & 4294967295) | (o >>> 15))),
      (o = (n + (t ^ (i & (a ^ t))) + r[7] + 4249261313) & 4294967295),
      (n = i + (((o << 22) & 4294967295) | (o >>> 10))),
      (o = (t + (a ^ (n & (i ^ a))) + r[8] + 1770035416) & 4294967295),
      (t = n + (((o << 7) & 4294967295) | (o >>> 25))),
      (o = (a + (i ^ (t & (n ^ i))) + r[9] + 2336552879) & 4294967295),
      (a = t + (((o << 12) & 4294967295) | (o >>> 20))),
      (o = (i + (n ^ (a & (t ^ n))) + r[10] + 4294925233) & 4294967295),
      (i = a + (((o << 17) & 4294967295) | (o >>> 15))),
      (o = (n + (t ^ (i & (a ^ t))) + r[11] + 2304563134) & 4294967295),
      (n = i + (((o << 22) & 4294967295) | (o >>> 10))),
      (o = (t + (a ^ (n & (i ^ a))) + r[12] + 1804603682) & 4294967295),
      (t = n + (((o << 7) & 4294967295) | (o >>> 25))),
      (o = (a + (i ^ (t & (n ^ i))) + r[13] + 4254626195) & 4294967295),
      (a = t + (((o << 12) & 4294967295) | (o >>> 20))),
      (o = (i + (n ^ (a & (t ^ n))) + r[14] + 2792965006) & 4294967295),
      (i = a + (((o << 17) & 4294967295) | (o >>> 15))),
      (o = (n + (t ^ (i & (a ^ t))) + r[15] + 1236535329) & 4294967295),
      (n = i + (((o << 22) & 4294967295) | (o >>> 10))),
      (o = (t + (i ^ (a & (n ^ i))) + r[1] + 4129170786) & 4294967295),
      (t = n + (((o << 5) & 4294967295) | (o >>> 27))),
      (o = (a + (n ^ (i & (t ^ n))) + r[6] + 3225465664) & 4294967295),
      (a = t + (((o << 9) & 4294967295) | (o >>> 23))),
      (o = (i + (t ^ (n & (a ^ t))) + r[11] + 643717713) & 4294967295),
      (i = a + (((o << 14) & 4294967295) | (o >>> 18))),
      (o = (n + (a ^ (t & (i ^ a))) + r[0] + 3921069994) & 4294967295),
      (n = i + (((o << 20) & 4294967295) | (o >>> 12))),
      (o = (t + (i ^ (a & (n ^ i))) + r[5] + 3593408605) & 4294967295),
      (t = n + (((o << 5) & 4294967295) | (o >>> 27))),
      (o = (a + (n ^ (i & (t ^ n))) + r[10] + 38016083) & 4294967295),
      (a = t + (((o << 9) & 4294967295) | (o >>> 23))),
      (o = (i + (t ^ (n & (a ^ t))) + r[15] + 3634488961) & 4294967295),
      (i = a + (((o << 14) & 4294967295) | (o >>> 18))),
      (o = (n + (a ^ (t & (i ^ a))) + r[4] + 3889429448) & 4294967295),
      (n = i + (((o << 20) & 4294967295) | (o >>> 12))),
      (o = (t + (i ^ (a & (n ^ i))) + r[9] + 568446438) & 4294967295),
      (t = n + (((o << 5) & 4294967295) | (o >>> 27))),
      (o = (a + (n ^ (i & (t ^ n))) + r[14] + 3275163606) & 4294967295),
      (a = t + (((o << 9) & 4294967295) | (o >>> 23))),
      (o = (i + (t ^ (n & (a ^ t))) + r[3] + 4107603335) & 4294967295),
      (i = a + (((o << 14) & 4294967295) | (o >>> 18))),
      (o = (n + (a ^ (t & (i ^ a))) + r[8] + 1163531501) & 4294967295),
      (n = i + (((o << 20) & 4294967295) | (o >>> 12))),
      (o = (t + (i ^ (a & (n ^ i))) + r[13] + 2850285829) & 4294967295),
      (t = n + (((o << 5) & 4294967295) | (o >>> 27))),
      (o = (a + (n ^ (i & (t ^ n))) + r[2] + 4243563512) & 4294967295),
      (a = t + (((o << 9) & 4294967295) | (o >>> 23))),
      (o = (i + (t ^ (n & (a ^ t))) + r[7] + 1735328473) & 4294967295),
      (i = a + (((o << 14) & 4294967295) | (o >>> 18))),
      (o = (n + (a ^ (t & (i ^ a))) + r[12] + 2368359562) & 4294967295),
      (n = i + (((o << 20) & 4294967295) | (o >>> 12))),
      (o = (t + (n ^ i ^ a) + r[5] + 4294588738) & 4294967295),
      (t = n + (((o << 4) & 4294967295) | (o >>> 28))),
      (o = (a + (t ^ n ^ i) + r[8] + 2272392833) & 4294967295),
      (a = t + (((o << 11) & 4294967295) | (o >>> 21))),
      (o = (i + (a ^ t ^ n) + r[11] + 1839030562) & 4294967295),
      (i = a + (((o << 16) & 4294967295) | (o >>> 16))),
      (o = (n + (i ^ a ^ t) + r[14] + 4259657740) & 4294967295),
      (n = i + (((o << 23) & 4294967295) | (o >>> 9))),
      (o = (t + (n ^ i ^ a) + r[1] + 2763975236) & 4294967295),
      (t = n + (((o << 4) & 4294967295) | (o >>> 28))),
      (o = (a + (t ^ n ^ i) + r[4] + 1272893353) & 4294967295),
      (a = t + (((o << 11) & 4294967295) | (o >>> 21))),
      (o = (i + (a ^ t ^ n) + r[7] + 4139469664) & 4294967295),
      (i = a + (((o << 16) & 4294967295) | (o >>> 16))),
      (o = (n + (i ^ a ^ t) + r[10] + 3200236656) & 4294967295),
      (n = i + (((o << 23) & 4294967295) | (o >>> 9))),
      (o = (t + (n ^ i ^ a) + r[13] + 681279174) & 4294967295),
      (t = n + (((o << 4) & 4294967295) | (o >>> 28))),
      (o = (a + (t ^ n ^ i) + r[0] + 3936430074) & 4294967295),
      (a = t + (((o << 11) & 4294967295) | (o >>> 21))),
      (o = (i + (a ^ t ^ n) + r[3] + 3572445317) & 4294967295),
      (i = a + (((o << 16) & 4294967295) | (o >>> 16))),
      (o = (n + (i ^ a ^ t) + r[6] + 76029189) & 4294967295),
      (n = i + (((o << 23) & 4294967295) | (o >>> 9))),
      (o = (t + (n ^ i ^ a) + r[9] + 3654602809) & 4294967295),
      (t = n + (((o << 4) & 4294967295) | (o >>> 28))),
      (o = (a + (t ^ n ^ i) + r[12] + 3873151461) & 4294967295),
      (a = t + (((o << 11) & 4294967295) | (o >>> 21))),
      (o = (i + (a ^ t ^ n) + r[15] + 530742520) & 4294967295),
      (i = a + (((o << 16) & 4294967295) | (o >>> 16))),
      (o = (n + (i ^ a ^ t) + r[2] + 3299628645) & 4294967295),
      (n = i + (((o << 23) & 4294967295) | (o >>> 9))),
      (o = (t + (i ^ (n | ~a)) + r[0] + 4096336452) & 4294967295),
      (t = n + (((o << 6) & 4294967295) | (o >>> 26))),
      (o = (a + (n ^ (t | ~i)) + r[7] + 1126891415) & 4294967295),
      (a = t + (((o << 10) & 4294967295) | (o >>> 22))),
      (o = (i + (t ^ (a | ~n)) + r[14] + 2878612391) & 4294967295),
      (i = a + (((o << 15) & 4294967295) | (o >>> 17))),
      (o = (n + (a ^ (i | ~t)) + r[5] + 4237533241) & 4294967295),
      (n = i + (((o << 21) & 4294967295) | (o >>> 11))),
      (o = (t + (i ^ (n | ~a)) + r[12] + 1700485571) & 4294967295),
      (t = n + (((o << 6) & 4294967295) | (o >>> 26))),
      (o = (a + (n ^ (t | ~i)) + r[3] + 2399980690) & 4294967295),
      (a = t + (((o << 10) & 4294967295) | (o >>> 22))),
      (o = (i + (t ^ (a | ~n)) + r[10] + 4293915773) & 4294967295),
      (i = a + (((o << 15) & 4294967295) | (o >>> 17))),
      (o = (n + (a ^ (i | ~t)) + r[1] + 2240044497) & 4294967295),
      (n = i + (((o << 21) & 4294967295) | (o >>> 11))),
      (o = (t + (i ^ (n | ~a)) + r[8] + 1873313359) & 4294967295),
      (t = n + (((o << 6) & 4294967295) | (o >>> 26))),
      (o = (a + (n ^ (t | ~i)) + r[15] + 4264355552) & 4294967295),
      (a = t + (((o << 10) & 4294967295) | (o >>> 22))),
      (o = (i + (t ^ (a | ~n)) + r[6] + 2734768916) & 4294967295),
      (i = a + (((o << 15) & 4294967295) | (o >>> 17))),
      (o = (n + (a ^ (i | ~t)) + r[13] + 1309151649) & 4294967295),
      (n = i + (((o << 21) & 4294967295) | (o >>> 11))),
      (o = (t + (i ^ (n | ~a)) + r[4] + 4149444226) & 4294967295),
      (t = n + (((o << 6) & 4294967295) | (o >>> 26))),
      (o = (a + (n ^ (t | ~i)) + r[11] + 3174756917) & 4294967295),
      (a = t + (((o << 10) & 4294967295) | (o >>> 22))),
      (o = (i + (t ^ (a | ~n)) + r[2] + 718787259) & 4294967295),
      (i = a + (((o << 15) & 4294967295) | (o >>> 17))),
      (o = (n + (a ^ (i | ~t)) + r[9] + 3951481745) & 4294967295),
      (e.g[0] = (e.g[0] + t) & 4294967295),
      (e.g[1] = (e.g[1] + (i + (((o << 21) & 4294967295) | (o >>> 11)))) & 4294967295),
      (e.g[2] = (e.g[2] + i) & 4294967295),
      (e.g[3] = (e.g[3] + a) & 4294967295));
  }
  ((r.prototype.v = function (e, t) {
    t === void 0 && (t = e.length);
    let n = t - this.blockSize,
      r = this.C,
      a = this.h,
      o = 0;
    for (; o < t; ) {
      if (a == 0) for (; o <= n; ) (i(this, e, o), (o += this.blockSize));
      if (typeof e == `string`) {
        for (; o < t; )
          if (((r[a++] = e.charCodeAt(o++)), a == this.blockSize)) {
            (i(this, r), (a = 0));
            break;
          }
      } else
        for (; o < t; )
          if (((r[a++] = e[o++]), a == this.blockSize)) {
            (i(this, r), (a = 0));
            break;
          }
    }
    ((this.h = a), (this.o += t));
  }),
    (r.prototype.A = function () {
      var e = Array((this.h < 56 ? this.blockSize : this.blockSize * 2) - this.h);
      e[0] = 128;
      for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
      t = this.o * 8;
      for (var n = e.length - 8; n < e.length; ++n) ((e[n] = t & 255), (t /= 256));
      for (this.v(e), e = Array(16), t = 0, n = 0; n < 4; ++n)
        for (let r = 0; r < 32; r += 8) e[t++] = (this.g[n] >>> r) & 255;
      return e;
    }));
  function a(e, t) {
    var n = s;
    return Object.prototype.hasOwnProperty.call(n, e) ? n[e] : (n[e] = t(e));
  }
  function o(e, t) {
    this.h = t;
    let n = [],
      r = !0;
    for (let i = e.length - 1; i >= 0; i--) {
      let a = e[i] | 0;
      (r && a == t) || ((n[i] = a), (r = !1));
    }
    this.g = n;
  }
  var s = {};
  function c(e) {
    return -128 <= e && e < 128
      ? a(e, function (e) {
          return new o([e | 0], e < 0 ? -1 : 0);
        })
      : new o([e | 0], e < 0 ? -1 : 0);
  }
  function l(e) {
    if (isNaN(e) || !isFinite(e)) return d;
    if (e < 0) return g(l(-e));
    let t = [],
      n = 1;
    for (let r = 0; e >= n; r++) ((t[r] = (e / n) | 0), (n *= 4294967296));
    return new o(t, 0);
  }
  function u(e, t) {
    if (e.length == 0) throw Error(`number format error: empty string`);
    if (((t ||= 10), t < 2 || 36 < t)) throw Error(`radix out of range: ` + t);
    if (e.charAt(0) == `-`) return g(u(e.substring(1), t));
    if (e.indexOf(`-`) >= 0) throw Error(`number format error: interior "-" character`);
    let n = l(t ** 8),
      r = d;
    for (let a = 0; a < e.length; a += 8) {
      var i = Math.min(8, e.length - a);
      let o = parseInt(e.substring(a, a + i), t);
      i < 8 ? ((i = l(t ** +i)), (r = r.j(i).add(l(o)))) : ((r = r.j(n)), (r = r.add(l(o))));
    }
    return r;
  }
  var d = c(0),
    f = c(1),
    p = c(16777216);
  ((e = o.prototype),
    (e.m = function () {
      if (h(this)) return -g(this).m();
      let e = 0,
        t = 1;
      for (let n = 0; n < this.g.length; n++) {
        let r = this.i(n);
        ((e += (r >= 0 ? r : 4294967296 + r) * t), (t *= 4294967296));
      }
      return e;
    }),
    (e.toString = function (e) {
      if (((e ||= 10), e < 2 || 36 < e)) throw Error(`radix out of range: ` + e);
      if (m(this)) return `0`;
      if (h(this)) return `-` + g(this).toString(e);
      let t = l(e ** 6);
      var n = this;
      let r = ``;
      for (;;) {
        let i = re(n, t).g;
        n = ee(n, i.j(t));
        let a = ((n.g.length > 0 ? n.g[0] : n.h) >>> 0).toString(e);
        if (((n = i), m(n))) return a + r;
        for (; a.length < 6; ) a = `0` + a;
        r = a + r;
      }
    }),
    (e.i = function (e) {
      return e < 0 ? 0 : e < this.g.length ? this.g[e] : this.h;
    }));
  function m(e) {
    if (e.h != 0) return !1;
    for (let t = 0; t < e.g.length; t++) if (e.g[t] != 0) return !1;
    return !0;
  }
  function h(e) {
    return e.h == -1;
  }
  e.l = function (e) {
    return ((e = ee(this, e)), h(e) ? -1 : m(e) ? 0 : 1);
  };
  function g(e) {
    let t = e.g.length,
      n = [];
    for (let r = 0; r < t; r++) n[r] = ~e.g[r];
    return new o(n, ~e.h).add(f);
  }
  ((e.abs = function () {
    return h(this) ? g(this) : this;
  }),
    (e.add = function (e) {
      let t = Math.max(this.g.length, e.g.length),
        n = [],
        r = 0;
      for (let i = 0; i <= t; i++) {
        let t = r + (this.i(i) & 65535) + (e.i(i) & 65535),
          a = (t >>> 16) + (this.i(i) >>> 16) + (e.i(i) >>> 16);
        ((r = a >>> 16), (t &= 65535), (a &= 65535), (n[i] = (a << 16) | t));
      }
      return new o(n, n[n.length - 1] & -2147483648 ? -1 : 0);
    }));
  function ee(e, t) {
    return e.add(g(t));
  }
  e.j = function (e) {
    if (m(this) || m(e)) return d;
    if (h(this)) return h(e) ? g(this).j(g(e)) : g(g(this).j(e));
    if (h(e)) return g(this.j(g(e)));
    if (this.l(p) < 0 && e.l(p) < 0) return l(this.m() * e.m());
    let t = this.g.length + e.g.length,
      n = [];
    for (var r = 0; r < 2 * t; r++) n[r] = 0;
    for (r = 0; r < this.g.length; r++)
      for (let t = 0; t < e.g.length; t++) {
        let i = this.i(r) >>> 16,
          a = this.i(r) & 65535,
          o = e.i(t) >>> 16,
          s = e.i(t) & 65535;
        ((n[2 * r + 2 * t] += a * s),
          te(n, 2 * r + 2 * t),
          (n[2 * r + 2 * t + 1] += i * s),
          te(n, 2 * r + 2 * t + 1),
          (n[2 * r + 2 * t + 1] += a * o),
          te(n, 2 * r + 2 * t + 1),
          (n[2 * r + 2 * t + 2] += i * o),
          te(n, 2 * r + 2 * t + 2));
      }
    for (e = 0; e < t; e++) n[e] = (n[2 * e + 1] << 16) | n[2 * e];
    for (e = t; e < 2 * t; e++) n[e] = 0;
    return new o(n, 0);
  };
  function te(e, t) {
    for (; (e[t] & 65535) != e[t]; ) ((e[t + 1] += e[t] >>> 16), (e[t] &= 65535), t++);
  }
  function ne(e, t) {
    ((this.g = e), (this.h = t));
  }
  function re(e, t) {
    if (m(t)) throw Error(`division by zero`);
    if (m(e)) return new ne(d, d);
    if (h(e)) return ((t = re(g(e), t)), new ne(g(t.g), g(t.h)));
    if (h(t)) return ((t = re(e, g(t))), new ne(g(t.g), t.h));
    if (e.g.length > 30) {
      if (h(e) || h(t)) throw Error(`slowDivide_ only works with positive integers.`);
      for (var n = f, r = t; r.l(e) <= 0; ) ((n = ie(n)), (r = ie(r)));
      var i = ae(n, 1),
        a = ae(r, 1);
      for (r = ae(r, 2), n = ae(n, 2); !m(r); ) {
        var o = a.add(r);
        (o.l(e) <= 0 && ((i = i.add(n)), (a = o)), (r = ae(r, 1)), (n = ae(n, 1)));
      }
      return ((t = ee(e, i.j(t))), new ne(i, t));
    }
    for (i = d; e.l(t) >= 0; ) {
      for (
        n = Math.max(1, Math.floor(e.m() / t.m())),
          r = Math.ceil(Math.log(n) / Math.LN2),
          r = r <= 48 ? 1 : 2 ** (r - 48),
          a = l(n),
          o = a.j(t);
        h(o) || o.l(e) > 0;
      )
        ((n -= r), (a = l(n)), (o = a.j(t)));
      (m(a) && (a = f), (i = i.add(a)), (e = ee(e, o)));
    }
    return new ne(i, e);
  }
  ((e.B = function (e) {
    return re(this, e).h;
  }),
    (e.and = function (e) {
      let t = Math.max(this.g.length, e.g.length),
        n = [];
      for (let r = 0; r < t; r++) n[r] = this.i(r) & e.i(r);
      return new o(n, this.h & e.h);
    }),
    (e.or = function (e) {
      let t = Math.max(this.g.length, e.g.length),
        n = [];
      for (let r = 0; r < t; r++) n[r] = this.i(r) | e.i(r);
      return new o(n, this.h | e.h);
    }),
    (e.xor = function (e) {
      let t = Math.max(this.g.length, e.g.length),
        n = [];
      for (let r = 0; r < t; r++) n[r] = this.i(r) ^ e.i(r);
      return new o(n, this.h ^ e.h);
    }));
  function ie(e) {
    let t = e.g.length + 1,
      n = [];
    for (let r = 0; r < t; r++) n[r] = (e.i(r) << 1) | (e.i(r - 1) >>> 31);
    return new o(n, e.h);
  }
  function ae(e, t) {
    let n = t >> 5;
    t %= 32;
    let r = e.g.length - n,
      i = [];
    for (let a = 0; a < r; a++)
      i[a] = t > 0 ? (e.i(a + n) >>> t) | (e.i(a + n + 1) << (32 - t)) : e.i(a + n);
    return new o(i, e.h);
  }
  ((r.prototype.digest = r.prototype.A),
    (r.prototype.reset = r.prototype.u),
    (r.prototype.update = r.prototype.v),
    (kl = Dl.Md5 = r),
    (o.prototype.add = o.prototype.add),
    (o.prototype.multiply = o.prototype.j),
    (o.prototype.modulo = o.prototype.B),
    (o.prototype.compare = o.prototype.l),
    (o.prototype.toNumber = o.prototype.m),
    (o.prototype.toString = o.prototype.toString),
    (o.prototype.getBits = o.prototype.i),
    (o.fromNumber = l),
    (o.fromString = u),
    (Ol = Dl.Integer = o));
}).apply(El === void 0 ? (typeof self < `u` ? self : typeof window < `u` ? window : {}) : El);
var Al =
    typeof globalThis < `u`
      ? globalThis
      : typeof window < `u`
        ? window
        : typeof global < `u`
          ? global
          : typeof self < `u`
            ? self
            : {},
  jl = {},
  Ml,
  Nl,
  Pl,
  Fl,
  Il,
  Ll,
  Rl,
  zl;
(function () {
  var e,
    t = Object.defineProperty;
  function n(e) {
    e = [
      typeof globalThis == `object` && globalThis,
      e,
      typeof window == `object` && window,
      typeof self == `object` && self,
      typeof Al == `object` && Al,
    ];
    for (var t = 0; t < e.length; ++t) {
      var n = e[t];
      if (n && n.Math == Math) return n;
    }
    throw Error(`Cannot find global object`);
  }
  var r = n(this);
  function i(e, n) {
    if (n)
      a: {
        var i = r;
        e = e.split(`.`);
        for (var a = 0; a < e.length - 1; a++) {
          var o = e[a];
          if (!(o in i)) break a;
          i = i[o];
        }
        ((e = e[e.length - 1]),
          (a = i[e]),
          (n = n(a)),
          n != a && n != null && t(i, e, { configurable: !0, writable: !0, value: n }));
      }
  }
  (i(`Symbol.dispose`, function (e) {
    return e || Symbol(`Symbol.dispose`);
  }),
    i(`Array.prototype.values`, function (e) {
      return (
        e ||
        function () {
          return this[Symbol.iterator]();
        }
      );
    }),
    i(`Object.entries`, function (e) {
      return (
        e ||
        function (e) {
          var t = [],
            n;
          for (n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push([n, e[n]]);
          return t;
        }
      );
    }));
  var a = a || {},
    o = this || self;
  function s(e) {
    var t = typeof e;
    return (t == `object` && e != null) || t == `function`;
  }
  function c(e, t, n) {
    return e.call.apply(e.bind, arguments);
  }
  function l(e, t, n) {
    return ((l = c), l.apply(null, arguments));
  }
  function u(e, t) {
    var n = Array.prototype.slice.call(arguments, 1);
    return function () {
      var t = n.slice();
      return (t.push.apply(t, arguments), e.apply(this, t));
    };
  }
  function d(e, t) {
    function n() {}
    ((n.prototype = t.prototype),
      (e.Z = t.prototype),
      (e.prototype = new n()),
      (e.prototype.constructor = e),
      (e.Ob = function (e, n, r) {
        for (var i = Array(arguments.length - 2), a = 2; a < arguments.length; a++)
          i[a - 2] = arguments[a];
        return t.prototype[n].apply(e, i);
      }));
  }
  var f =
    typeof AsyncContext < `u` && typeof AsyncContext.Snapshot == `function`
      ? (e) => e && AsyncContext.Snapshot.wrap(e)
      : (e) => e;
  function p(e) {
    let t = e.length;
    if (t > 0) {
      let n = Array(t);
      for (let r = 0; r < t; r++) n[r] = e[r];
      return n;
    }
    return [];
  }
  function m(e, t) {
    for (let t = 1; t < arguments.length; t++) {
      let r = arguments[t];
      var n = typeof r;
      if (
        ((n = n == `object` ? (r ? (Array.isArray(r) ? `array` : n) : `null`) : n),
        n == `array` || (n == `object` && typeof r.length == `number`))
      ) {
        n = e.length || 0;
        let t = r.length || 0;
        e.length = n + t;
        for (let i = 0; i < t; i++) e[n + i] = r[i];
      } else e.push(r);
    }
  }
  class h {
    constructor(e, t) {
      ((this.i = e), (this.j = t), (this.h = 0), (this.g = null));
    }
    get() {
      let e;
      return (
        this.h > 0 ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null)) : (e = this.i()),
        e
      );
    }
  }
  function g(e) {
    o.setTimeout(() => {
      throw e;
    }, 0);
  }
  function ee() {
    var e = oe;
    let t = null;
    return (e.g && ((t = e.g), (e.g = e.g.next), e.g || (e.h = null), (t.next = null)), t);
  }
  class te {
    constructor() {
      this.h = this.g = null;
    }
    add(e, t) {
      let n = ne.get();
      (n.set(e, t), this.h ? (this.h.next = n) : (this.g = n), (this.h = n));
    }
  }
  var ne = new h(
    () => new re(),
    (e) => e.reset()
  );
  class re {
    constructor() {
      this.next = this.g = this.h = null;
    }
    set(e, t) {
      ((this.h = e), (this.g = t), (this.next = null));
    }
    reset() {
      this.next = this.g = this.h = null;
    }
  }
  let ie,
    ae = !1,
    oe = new te(),
    se = () => {
      let e = Promise.resolve(void 0);
      ie = () => {
        e.then(ce);
      };
    };
  function ce() {
    for (var e; (e = ee()); ) {
      try {
        e.h.call(e.g);
      } catch (e) {
        g(e);
      }
      var t = ne;
      (t.j(e), t.h < 100 && (t.h++, (e.next = t.g), (t.g = e)));
    }
    ae = !1;
  }
  function _() {
    ((this.u = this.u), (this.C = this.C));
  }
  ((_.prototype.u = !1),
    (_.prototype.dispose = function () {
      this.u || ((this.u = !0), this.N());
    }),
    (_.prototype[Symbol.dispose] = function () {
      this.dispose();
    }),
    (_.prototype.N = function () {
      if (this.C) for (; this.C.length; ) this.C.shift()();
    }));
  function v(e, t) {
    ((this.type = e), (this.g = this.target = t), (this.defaultPrevented = !1));
  }
  v.prototype.h = function () {
    this.defaultPrevented = !0;
  };
  var le = (function () {
    if (!o.addEventListener || !Object.defineProperty) return !1;
    var e = !1,
      t = Object.defineProperty({}, `passive`, {
        get: function () {
          e = !0;
        },
      });
    try {
      let e = () => {};
      (o.addEventListener(`test`, e, t), o.removeEventListener(`test`, e, t));
    } catch {}
    return e;
  })();
  function ue(e) {
    return /^[\s\xa0]*$/.test(e);
  }
  function de(e, t) {
    (v.call(this, e ? e.type : ``),
      (this.relatedTarget = this.g = this.target = null),
      (this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
      (this.key = ``),
      (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
      (this.state = null),
      (this.pointerId = 0),
      (this.pointerType = ``),
      (this.i = null),
      e && this.init(e, t));
  }
  (d(de, v),
    (de.prototype.init = function (e, t) {
      let n = (this.type = e.type),
        r = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
      ((this.target = e.target || e.srcElement),
        (this.g = t),
        (t = e.relatedTarget),
        t || (n == `mouseover` ? (t = e.fromElement) : n == `mouseout` && (t = e.toElement)),
        (this.relatedTarget = t),
        r
          ? ((this.clientX = r.clientX === void 0 ? r.pageX : r.clientX),
            (this.clientY = r.clientY === void 0 ? r.pageY : r.clientY),
            (this.screenX = r.screenX || 0),
            (this.screenY = r.screenY || 0))
          : ((this.clientX = e.clientX === void 0 ? e.pageX : e.clientX),
            (this.clientY = e.clientY === void 0 ? e.pageY : e.clientY),
            (this.screenX = e.screenX || 0),
            (this.screenY = e.screenY || 0)),
        (this.button = e.button),
        (this.key = e.key || ``),
        (this.ctrlKey = e.ctrlKey),
        (this.altKey = e.altKey),
        (this.shiftKey = e.shiftKey),
        (this.metaKey = e.metaKey),
        (this.pointerId = e.pointerId || 0),
        (this.pointerType = e.pointerType),
        (this.state = e.state),
        (this.i = e),
        e.defaultPrevented && de.Z.h.call(this));
    }),
    (de.prototype.h = function () {
      de.Z.h.call(this);
      let e = this.i;
      e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }));
  var fe = `closure_listenable_` + ((Math.random() * 1e6) | 0),
    pe = 0;
  function me(e, t, n, r, i) {
    ((this.listener = e),
      (this.proxy = null),
      (this.src = t),
      (this.type = n),
      (this.capture = !!r),
      (this.ha = i),
      (this.key = ++pe),
      (this.da = this.fa = !1));
  }
  function he(e) {
    ((e.da = !0), (e.listener = null), (e.proxy = null), (e.src = null), (e.ha = null));
  }
  function ge(e, t, n) {
    for (let r in e) t.call(n, e[r], r, e);
  }
  function _e(e, t) {
    for (let n in e) t.call(void 0, e[n], n, e);
  }
  function ve(e) {
    let t = {};
    for (let n in e) t[n] = e[n];
    return t;
  }
  let ye =
    `constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf`.split(
      ` `
    );
  function be(e, t) {
    let n, r;
    for (let t = 1; t < arguments.length; t++) {
      for (n in ((r = arguments[t]), r)) e[n] = r[n];
      for (let t = 0; t < ye.length; t++)
        ((n = ye[t]), Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]));
    }
  }
  function xe(e) {
    ((this.src = e), (this.g = {}), (this.h = 0));
  }
  xe.prototype.add = function (e, t, n, r, i) {
    let a = e.toString();
    ((e = this.g[a]), e || ((e = this.g[a] = []), this.h++));
    let o = Ce(e, t, r, i);
    return (
      o > -1
        ? ((t = e[o]), n || (t.fa = !1))
        : ((t = new me(t, this.src, a, !!r, i)), (t.fa = n), e.push(t)),
      t
    );
  };
  function Se(e, t) {
    let n = t.type;
    if (n in e.g) {
      var r = e.g[n],
        i = Array.prototype.indexOf.call(r, t, void 0),
        a;
      ((a = i >= 0) && Array.prototype.splice.call(r, i, 1),
        a && (he(t), e.g[n].length == 0 && (delete e.g[n], e.h--)));
    }
  }
  function Ce(e, t, n, r) {
    for (let i = 0; i < e.length; ++i) {
      let a = e[i];
      if (!a.da && a.listener == t && a.capture == !!n && a.ha == r) return i;
    }
    return -1;
  }
  var we = `closure_lm_` + ((Math.random() * 1e6) | 0),
    Te = {};
  function Ee(e, t, n, r, i) {
    if (r && r.once) return ke(e, t, n, r, i);
    if (Array.isArray(t)) {
      for (let a = 0; a < t.length; a++) Ee(e, t[a], n, r, i);
      return null;
    }
    return (
      (n = Ie(n)),
      e && e[fe] ? e.J(t, n, s(r) ? !!r.capture : !!r, i) : De(e, t, n, !1, r, i)
    );
  }
  function De(e, t, n, r, i, a) {
    if (!t) throw Error(`Invalid event type`);
    let o = s(i) ? !!i.capture : !!i,
      c = Pe(e);
    if ((c || (e[we] = c = new xe(e)), (n = c.add(t, n, r, o, a)), n.proxy)) return n;
    if (((r = Oe()), (n.proxy = r), (r.src = e), (r.listener = n), e.addEventListener))
      (le || (i = o), i === void 0 && (i = !1), e.addEventListener(t.toString(), r, i));
    else if (e.attachEvent) e.attachEvent(Me(t.toString()), r);
    else if (e.addListener && e.removeListener) e.addListener(r);
    else throw Error(`addEventListener and attachEvent are unavailable.`);
    return n;
  }
  function Oe() {
    function e(n) {
      return t.call(e.src, e.listener, n);
    }
    let t = Ne;
    return e;
  }
  function ke(e, t, n, r, i) {
    if (Array.isArray(t)) {
      for (let a = 0; a < t.length; a++) ke(e, t[a], n, r, i);
      return null;
    }
    return (
      (n = Ie(n)),
      e && e[fe] ? e.K(t, n, s(r) ? !!r.capture : !!r, i) : De(e, t, n, !0, r, i)
    );
  }
  function Ae(e, t, n, r, i) {
    if (Array.isArray(t)) for (var a = 0; a < t.length; a++) Ae(e, t[a], n, r, i);
    else
      ((r = s(r) ? !!r.capture : !!r),
        (n = Ie(n)),
        e && e[fe]
          ? ((e = e.i),
            (a = String(t).toString()),
            a in e.g &&
              ((t = e.g[a]),
              (n = Ce(t, n, r, i)),
              n > -1 &&
                (he(t[n]),
                Array.prototype.splice.call(t, n, 1),
                t.length == 0 && (delete e.g[a], e.h--))))
          : (e &&= Pe(e)) &&
            ((t = e.g[t.toString()]),
            (e = -1),
            t && (e = Ce(t, n, r, i)),
            (n = e > -1 ? t[e] : null) && je(n)));
  }
  function je(e) {
    if (typeof e != `number` && e && !e.da) {
      var t = e.src;
      if (t && t[fe]) Se(t.i, e);
      else {
        var n = e.type,
          r = e.proxy;
        (t.removeEventListener
          ? t.removeEventListener(n, r, e.capture)
          : t.detachEvent
            ? t.detachEvent(Me(n), r)
            : t.addListener && t.removeListener && t.removeListener(r),
          (n = Pe(t)) ? (Se(n, e), n.h == 0 && ((n.src = null), (t[we] = null))) : he(e));
      }
    }
  }
  function Me(e) {
    return e in Te ? Te[e] : (Te[e] = `on` + e);
  }
  function Ne(e, t) {
    if (e.da) e = !0;
    else {
      t = new de(t, this);
      let n = e.listener,
        r = e.ha || e.src;
      (e.fa && je(e), (e = n.call(r, t)));
    }
    return e;
  }
  function Pe(e) {
    return ((e = e[we]), e instanceof xe ? e : null);
  }
  var Fe = `__closure_events_fn_` + ((Math.random() * 1e9) >>> 0);
  function Ie(e) {
    return typeof e == `function`
      ? e
      : (e[Fe] ||
          (e[Fe] = function (t) {
            return e.handleEvent(t);
          }),
        e[Fe]);
  }
  function y() {
    (_.call(this), (this.i = new xe(this)), (this.M = this), (this.G = null));
  }
  (d(y, _),
    (y.prototype[fe] = !0),
    (y.prototype.removeEventListener = function (e, t, n, r) {
      Ae(this, e, t, n, r);
    }));
  function b(e, t) {
    var n,
      r = e.G;
    if (r) for (n = []; r; r = r.G) n.push(r);
    if (((e = e.M), (r = t.type || t), typeof t == `string`)) t = new v(t, e);
    else if (t instanceof v) t.target = t.target || e;
    else {
      var i = t;
      ((t = new v(r, e)), be(t, i));
    }
    i = !0;
    let a, o;
    if (n) for (o = n.length - 1; o >= 0; o--) ((a = t.g = n[o]), (i = Le(a, r, !0, t) && i));
    if (((a = t.g = e), (i = Le(a, r, !0, t) && i), (i = Le(a, r, !1, t) && i), n))
      for (o = 0; o < n.length; o++) ((a = t.g = n[o]), (i = Le(a, r, !1, t) && i));
  }
  ((y.prototype.N = function () {
    if ((y.Z.N.call(this), this.i)) {
      var e = this.i;
      for (let t in e.g) {
        let n = e.g[t];
        for (let e = 0; e < n.length; e++) he(n[e]);
        (delete e.g[t], e.h--);
      }
    }
    this.G = null;
  }),
    (y.prototype.J = function (e, t, n, r) {
      return this.i.add(String(e), t, !1, n, r);
    }),
    (y.prototype.K = function (e, t, n, r) {
      return this.i.add(String(e), t, !0, n, r);
    }));
  function Le(e, t, n, r) {
    if (((t = e.i.g[String(t)]), !t)) return !0;
    t = t.concat();
    let i = !0;
    for (let a = 0; a < t.length; ++a) {
      let o = t[a];
      if (o && !o.da && o.capture == n) {
        let t = o.listener,
          n = o.ha || o.src;
        (o.fa && Se(e.i, o), (i = t.call(n, r) !== !1 && i));
      }
    }
    return i && !r.defaultPrevented;
  }
  function Re(e, t) {
    if (typeof e != `function`)
      if (e && typeof e.handleEvent == `function`) e = l(e.handleEvent, e);
      else throw Error(`Invalid listener argument`);
    return Number(t) > 2147483647 ? -1 : o.setTimeout(e, t || 0);
  }
  function ze(e) {
    e.g = Re(() => {
      ((e.g = null), e.i && ((e.i = !1), ze(e)));
    }, e.l);
    let t = e.h;
    ((e.h = null), e.m.apply(null, t));
  }
  class Be extends _ {
    constructor(e, t) {
      (super(), (this.m = e), (this.l = t), (this.h = null), (this.i = !1), (this.g = null));
    }
    j(e) {
      ((this.h = arguments), this.g ? (this.i = !0) : ze(this));
    }
    N() {
      (super.N(),
        this.g && (o.clearTimeout(this.g), (this.g = null), (this.i = !1), (this.h = null)));
    }
  }
  function Ve(e) {
    (_.call(this), (this.h = e), (this.g = {}));
  }
  d(Ve, _);
  var He = [];
  function Ue(e) {
    (ge(
      e.g,
      function (e, t) {
        this.g.hasOwnProperty(t) && je(e);
      },
      e
    ),
      (e.g = {}));
  }
  ((Ve.prototype.N = function () {
    (Ve.Z.N.call(this), Ue(this));
  }),
    (Ve.prototype.handleEvent = function () {
      throw Error(`EventHandler.handleEvent not implemented`);
    }));
  var x = o.JSON.stringify,
    We = o.JSON.parse,
    Ge = class {
      stringify(e) {
        return o.JSON.stringify(e, void 0);
      }
      parse(e) {
        return o.JSON.parse(e, void 0);
      }
    };
  function Ke() {}
  function qe() {}
  var Je = { OPEN: `a`, hb: `b`, ERROR: `c`, tb: `d` };
  function Ye() {
    v.call(this, `d`);
  }
  d(Ye, v);
  function Xe() {
    v.call(this, `c`);
  }
  d(Xe, v);
  var Ze = {},
    Qe = null;
  function $e() {
    return (Qe ||= new y());
  }
  Ze.Ia = `serverreachability`;
  function et(e) {
    v.call(this, Ze.Ia, e);
  }
  d(et, v);
  function tt(e) {
    let t = $e();
    b(t, new et(t));
  }
  Ze.STAT_EVENT = `statevent`;
  function nt(e, t) {
    (v.call(this, Ze.STAT_EVENT, e), (this.stat = t));
  }
  d(nt, v);
  function S(e) {
    let t = $e();
    b(t, new nt(t, e));
  }
  Ze.Ja = `timingevent`;
  function rt(e, t) {
    (v.call(this, Ze.Ja, e), (this.size = t));
  }
  d(rt, v);
  function it(e, t) {
    if (typeof e != `function`) throw Error(`Fn must not be null and must be a function`);
    return o.setTimeout(function () {
      e();
    }, t);
  }
  function at() {
    this.g = !0;
  }
  at.prototype.ua = function () {
    this.g = !1;
  };
  function ot(e, t, n, r, i, a) {
    e.info(function () {
      if (e.g)
        if (a) {
          var o = ``,
            s = a.split(`&`);
          for (let e = 0; e < s.length; e++) {
            var c = s[e].split(`=`);
            if (c.length > 1) {
              let e = c[0];
              c = c[1];
              let t = e.split(`_`);
              o =
                t.length >= 2 && t[1] == `type` ? o + (e + `=` + c + `&`) : o + (e + `=redacted&`);
            }
          }
        } else o = null;
      else o = a;
      return (
        `XMLHTTP REQ (` +
        r +
        `) [attempt ` +
        i +
        `]: ` +
        t +
        `
` +
        n +
        `
` +
        o
      );
    });
  }
  function st(e, t, n, r, i, a, o) {
    e.info(function () {
      return (
        `XMLHTTP RESP (` +
        r +
        `) [ attempt ` +
        i +
        `]: ` +
        t +
        `
` +
        n +
        `
` +
        a +
        ` ` +
        o
      );
    });
  }
  function ct(e, t, n, r) {
    e.info(function () {
      return `XMLHTTP TEXT (` + t + `): ` + ut(e, n) + (r ? ` ` + r : ``);
    });
  }
  function lt(e, t) {
    e.info(function () {
      return `TIMEOUT: ` + t;
    });
  }
  at.prototype.info = function () {};
  function ut(e, t) {
    if (!e.g) return t;
    if (!t) return null;
    try {
      let a = JSON.parse(t);
      if (a) {
        for (e = 0; e < a.length; e++)
          if (Array.isArray(a[e])) {
            var n = a[e];
            if (!(n.length < 2)) {
              var r = n[1];
              if (Array.isArray(r) && !(r.length < 1)) {
                var i = r[0];
                if (i != `noop` && i != `stop` && i != `close`)
                  for (let e = 1; e < r.length; e++) r[e] = ``;
              }
            }
          }
      }
      return x(a);
    } catch {
      return t;
    }
  }
  var dt = { NO_ERROR: 0, cb: 1, qb: 2, pb: 3, kb: 4, ob: 5, rb: 6, Ga: 7, TIMEOUT: 8, ub: 9 },
    ft = {
      ib: `complete`,
      Fb: `success`,
      ERROR: `error`,
      Ga: `abort`,
      xb: `ready`,
      yb: `readystatechange`,
      TIMEOUT: `timeout`,
      sb: `incrementaldata`,
      wb: `progress`,
      lb: `downloadprogress`,
      Nb: `uploadprogress`,
    },
    pt;
  function mt() {}
  (d(mt, Ke),
    (mt.prototype.g = function () {
      return new XMLHttpRequest();
    }),
    (pt = new mt()));
  function ht(e) {
    return encodeURIComponent(String(e));
  }
  function gt(e) {
    var t = 1;
    e = e.split(`:`);
    let n = [];
    for (; t > 0 && e.length; ) (n.push(e.shift()), t--);
    return (e.length && n.push(e.join(`:`)), n);
  }
  function _t(e, t, n, r) {
    ((this.j = e),
      (this.i = t),
      (this.l = n),
      (this.S = r || 1),
      (this.V = new Ve(this)),
      (this.H = 45e3),
      (this.J = null),
      (this.o = !1),
      (this.u = this.B = this.A = this.M = this.F = this.T = this.D = null),
      (this.G = []),
      (this.g = null),
      (this.C = 0),
      (this.m = this.v = null),
      (this.X = -1),
      (this.K = !1),
      (this.P = 0),
      (this.O = null),
      (this.W = this.L = this.U = this.R = !1),
      (this.h = new vt()));
  }
  function vt() {
    ((this.i = null), (this.g = ``), (this.h = !1));
  }
  var yt = {},
    bt = {};
  function xt(e, t, n) {
    ((e.M = 1), (e.A = qt(Ut(t))), (e.u = n), (e.R = !0), St(e, null));
  }
  function St(e, t) {
    ((e.F = Date.now()), Et(e), (e.B = Ut(e.A)));
    var n = e.B,
      r = e.S;
    (Array.isArray(r) || (r = [String(r)]),
      sn(n.i, `t`, r),
      (e.C = 0),
      (n = e.j.L),
      (e.h = new vt()),
      (e.g = k(e.j, n ? t : null, !e.u)),
      e.P > 0 && (e.O = new Be(l(e.Y, e, e.g), e.P)),
      (t = e.V),
      (n = e.g),
      (r = e.ba));
    var i = `readystatechange`;
    Array.isArray(i) || (i && (He[0] = i.toString()), (i = He));
    for (let e = 0; e < i.length; e++) {
      let a = Ee(n, i[e], r || t.handleEvent, !1, t.h || t);
      if (!a) break;
      t.g[a.key] = a;
    }
    ((t = e.J ? ve(e.J) : {}),
      e.u
        ? ((e.v ||= `POST`),
          (t[`Content-Type`] = `application/x-www-form-urlencoded`),
          e.g.ea(e.B, e.v, e.u, t))
        : ((e.v = `GET`), e.g.ea(e.B, e.v, null, t)),
      tt(),
      ot(e.i, e.v, e.B, e.l, e.S, e.u));
  }
  ((_t.prototype.ba = function (e) {
    e = e.target;
    let t = this.O;
    t && Dn(e) == 3 ? t.j() : this.Y(e);
  }),
    (_t.prototype.Y = function (e) {
      try {
        if (e == this.g)
          a: {
            let s = Dn(this.g),
              c = this.g.ya(),
              l = this.g.ca();
            if (!(s < 3) && (s != 3 || (this.g && (this.h.h || this.g.la() || On(this.g))))) {
              (this.K || s != 4 || c == 7 || tt(c == 8 || l <= 0 ? 3 : 2), Ot(this));
              var t = this.g.ca();
              this.X = t;
              var n = Ct(this);
              if (((this.o = t == 200), st(this.i, this.v, this.B, this.l, this.S, s, t), this.o)) {
                if (this.U && !this.L) {
                  b: {
                    if (this.g) {
                      var r,
                        i = this.g;
                      if (
                        (r = i.g ? i.g.getResponseHeader(`X-HTTP-Initial-Response`) : null) &&
                        !ue(r)
                      ) {
                        var a = r;
                        break b;
                      }
                    }
                    a = null;
                  }
                  if ((e = a))
                    (ct(
                      this.i,
                      this.l,
                      e,
                      `Initial handshake response via X-HTTP-Initial-Response`
                    ),
                      (this.L = !0),
                      jt(this, e));
                  else {
                    ((this.o = !1), (this.m = 3), S(12), At(this), kt(this));
                    break a;
                  }
                }
                if (this.R) {
                  e = !0;
                  let t;
                  for (; !this.K && this.C < n.length; )
                    if (((t = Tt(this, n)), t == bt)) {
                      (s == 4 && ((this.m = 4), S(14), (e = !1)),
                        ct(this.i, this.l, null, `[Incomplete Response]`));
                      break;
                    } else if (t == yt) {
                      ((this.m = 4), S(15), ct(this.i, this.l, n, `[Invalid Chunk]`), (e = !1));
                      break;
                    } else (ct(this.i, this.l, t, null), jt(this, t));
                  if (
                    (wt(this) && this.C != 0 && ((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
                    s != 4 || n.length != 0 || this.h.h || ((this.m = 1), S(16), (e = !1)),
                    (this.o = this.o && e),
                    !e)
                  )
                    (ct(this.i, this.l, n, `[Invalid Chunked Response]`), At(this), kt(this));
                  else if (n.length > 0 && !this.W) {
                    this.W = !0;
                    var o = this.j;
                    o.g == this &&
                      o.aa &&
                      !o.P &&
                      (o.j.info(`Great, no buffering proxy detected. Bytes received: ` + n.length),
                      Bn(o),
                      (o.P = !0),
                      S(11));
                  }
                } else (ct(this.i, this.l, n, null), jt(this, n));
                (s == 4 && At(this),
                  this.o && !this.K && (s == 4 ? Un(this.j, this) : ((this.o = !1), Et(this))));
              } else
                (kn(this.g),
                  t == 400 && n.indexOf(`Unknown SID`) > 0
                    ? ((this.m = 3), S(12))
                    : ((this.m = 0), S(13)),
                  At(this),
                  kt(this));
            }
          }
      } catch {}
    }));
  function Ct(e) {
    if (!wt(e)) return e.g.la();
    let t = On(e.g);
    if (t === ``) return ``;
    let n = ``,
      r = t.length,
      i = Dn(e.g) == 4;
    if (!e.h.i) {
      if (typeof TextDecoder > `u`) return (At(e), kt(e), ``);
      e.h.i = new o.TextDecoder();
    }
    for (let a = 0; a < r; a++)
      ((e.h.h = !0), (n += e.h.i.decode(t[a], { stream: !(i && a == r - 1) })));
    return ((t.length = 0), (e.h.g += n), (e.C = 0), e.h.g);
  }
  function wt(e) {
    return e.g ? e.v == `GET` && e.M != 2 && e.j.Aa : !1;
  }
  function Tt(e, t) {
    var n = e.C,
      r = t.indexOf(
        `
`,
        n
      );
    return r == -1
      ? bt
      : ((n = Number(t.substring(n, r))),
        isNaN(n)
          ? yt
          : ((r += 1), r + n > t.length ? bt : ((t = t.slice(r, r + n)), (e.C = r + n), t)));
  }
  _t.prototype.cancel = function () {
    ((this.K = !0), At(this));
  };
  function Et(e) {
    ((e.T = Date.now() + e.H), Dt(e, e.H));
  }
  function Dt(e, t) {
    if (e.D != null) throw Error(`WatchDog timer not null`);
    e.D = it(l(e.aa, e), t);
  }
  function Ot(e) {
    e.D &&= (o.clearTimeout(e.D), null);
  }
  _t.prototype.aa = function () {
    this.D = null;
    let e = Date.now();
    e - this.T >= 0
      ? (lt(this.i, this.B), this.M != 2 && (tt(), S(17)), At(this), (this.m = 2), kt(this))
      : Dt(this, this.T - e);
  };
  function kt(e) {
    e.j.I == 0 || e.K || Un(e.j, e);
  }
  function At(e) {
    Ot(e);
    var t = e.O;
    (t && typeof t.dispose == `function` && t.dispose(),
      (e.O = null),
      Ue(e.V),
      e.g && ((t = e.g), (e.g = null), t.abort(), t.dispose()));
  }
  function jt(e, t) {
    try {
      var n = e.j;
      if (n.I != 0 && (n.g == e || It(n.h, e))) {
        if (!e.L && It(n.h, e) && n.I == 3) {
          try {
            var r = n.Ba.g.parse(t);
          } catch {
            r = null;
          }
          if (Array.isArray(r) && r.length == 3) {
            var i = r;
            if (i[0] == 0) {
              a: if (!n.v) {
                if (n.g)
                  if (n.g.F + 3e3 < e.F) (Hn(n), Mn(n));
                  else break a;
                (zn(n), S(18));
              }
            } else
              ((n.xa = i[1]),
                0 < n.xa - n.K &&
                  i[2] < 37500 &&
                  n.F &&
                  n.A == 0 &&
                  !n.C &&
                  (n.C = it(l(n.Va, n), 6e3)));
            Ft(n.h) <= 1 && n.ta && (n.ta = void 0);
          } else Gn(n, 11);
        } else if (((e.L || n.g == e) && Hn(n), !ue(t)))
          for (i = n.Ba.g.parse(t), t = 0; t < i.length; t++) {
            let l = i[t],
              u = l[0];
            if (!(u <= n.K))
              if (((n.K = u), (l = l[1]), n.I == 2))
                if (l[0] == `c`) {
                  ((n.M = l[1]), (n.ba = l[2]));
                  let t = l[3];
                  t != null && ((n.ka = t), n.j.info(`VER=` + n.ka));
                  let i = l[4];
                  i != null && ((n.za = i), n.j.info(`SVER=` + n.za));
                  let u = l[5];
                  (u != null &&
                    typeof u == `number` &&
                    u > 0 &&
                    ((r = 1.5 * u), (n.O = r), n.j.info(`backChannelRequestTimeoutMs_=` + r)),
                    (r = n));
                  let d = e.g;
                  if (d) {
                    let e = d.g ? d.g.getResponseHeader(`X-Client-Wire-Protocol`) : null;
                    if (e) {
                      var a = r.h;
                      a.g ||
                        (e.indexOf(`spdy`) == -1 &&
                          e.indexOf(`quic`) == -1 &&
                          e.indexOf(`h2`) == -1) ||
                        ((a.j = a.l), (a.g = new Set()), (a.h &&= (Lt(a, a.h), null)));
                    }
                    if (r.G) {
                      let e = d.g ? d.g.getResponseHeader(`X-HTTP-Session-Id`) : null;
                      e && ((r.wa = e), C(r.J, r.G, e));
                    }
                  }
                  ((n.I = 3),
                    n.l && n.l.ra(),
                    n.aa && ((n.T = Date.now() - e.F), n.j.info(`Handshake RTT: ` + n.T + `ms`)),
                    (r = n));
                  var o = e;
                  if (((r.na = qn(r, r.L ? r.ba : null, r.W)), o.L)) {
                    Rt(r.h, o);
                    var s = o,
                      c = r.O;
                    (c && (s.H = c), s.D && (Ot(s), Et(s)), (r.g = o));
                  } else Rn(r);
                  n.i.length > 0 && Pn(n);
                } else (l[0] != `stop` && l[0] != `close`) || Gn(n, 7);
              else
                n.I == 3 &&
                  (l[0] == `stop` || l[0] == `close`
                    ? l[0] == `stop`
                      ? Gn(n, 7)
                      : jn(n)
                    : l[0] != `noop` && n.l && n.l.qa(l),
                  (n.A = 0));
          }
      }
      tt(4);
    } catch {}
  }
  var Mt = class {
    constructor(e, t) {
      ((this.g = e), (this.map = t));
    }
  };
  function Nt(e) {
    ((this.l = e || 10),
      o.PerformanceNavigationTiming
        ? ((e = o.performance.getEntriesByType(`navigation`)),
          (e = e.length > 0 && (e[0].nextHopProtocol == `hq` || e[0].nextHopProtocol == `h2`)))
        : (e = !!(
            o.chrome &&
            o.chrome.loadTimes &&
            o.chrome.loadTimes() &&
            o.chrome.loadTimes().wasFetchedViaSpdy
          )),
      (this.j = e ? this.l : 1),
      (this.g = null),
      this.j > 1 && (this.g = new Set()),
      (this.h = null),
      (this.i = []));
  }
  function Pt(e) {
    return e.h ? !0 : e.g ? e.g.size >= e.j : !1;
  }
  function Ft(e) {
    return e.h ? 1 : e.g ? e.g.size : 0;
  }
  function It(e, t) {
    return e.h ? e.h == t : e.g ? e.g.has(t) : !1;
  }
  function Lt(e, t) {
    e.g ? e.g.add(t) : (e.h = t);
  }
  function Rt(e, t) {
    e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
  }
  Nt.prototype.cancel = function () {
    if (((this.i = zt(this)), this.h)) (this.h.cancel(), (this.h = null));
    else if (this.g && this.g.size !== 0) {
      for (let e of this.g.values()) e.cancel();
      this.g.clear();
    }
  };
  function zt(e) {
    if (e.h != null) return e.i.concat(e.h.G);
    if (e.g != null && e.g.size !== 0) {
      let t = e.i;
      for (let n of e.g.values()) t = t.concat(n.G);
      return t;
    }
    return p(e.i);
  }
  var Bt = RegExp(
    `^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$`
  );
  function Vt(e, t) {
    if (e) {
      e = e.split(`&`);
      for (let n = 0; n < e.length; n++) {
        let r = e[n].indexOf(`=`),
          i,
          a = null;
        (r >= 0 ? ((i = e[n].substring(0, r)), (a = e[n].substring(r + 1))) : (i = e[n]),
          t(i, a ? decodeURIComponent(a.replace(/\+/g, ` `)) : ``));
      }
    }
  }
  function Ht(e) {
    ((this.g = this.o = this.j = ``), (this.u = null), (this.m = this.h = ``), (this.l = !1));
    let t;
    e instanceof Ht
      ? ((this.l = e.l),
        Wt(this, e.j),
        (this.o = e.o),
        (this.g = e.g),
        Gt(this, e.u),
        (this.h = e.h),
        Kt(this, T(e.i)),
        (this.m = e.m))
      : e && (t = String(e).match(Bt))
        ? ((this.l = !1),
          Wt(this, t[1] || ``, !0),
          (this.o = Jt(t[2] || ``)),
          (this.g = Jt(t[3] || ``, !0)),
          Gt(this, t[4]),
          (this.h = Jt(t[5] || ``, !0)),
          Kt(this, t[6] || ``, !0),
          (this.m = Jt(t[7] || ``)))
        : ((this.l = !1), (this.i = new w(null, this.l)));
  }
  ((Ht.prototype.toString = function () {
    let e = [];
    var t = this.j;
    t && e.push(Yt(t, Zt, !0), `:`);
    var n = this.g;
    return (
      (n || t == `file`) &&
        (e.push(`//`),
        (t = this.o) && e.push(Yt(t, Zt, !0), `@`),
        e.push(ht(n).replace(/%25([0-9a-fA-F]{2})/g, `%$1`)),
        (n = this.u),
        n != null && e.push(`:`, String(n))),
      (n = this.h) &&
        (this.g && n.charAt(0) != `/` && e.push(`/`),
        e.push(Yt(n, n.charAt(0) == `/` ? $t : Qt, !0))),
      (n = this.i.toString()) && e.push(`?`, n),
      (n = this.m) && e.push(`#`, Yt(n, tn)),
      e.join(``)
    );
  }),
    (Ht.prototype.resolve = function (e) {
      let t = Ut(this),
        n = !!e.j;
      (n ? Wt(t, e.j) : (n = !!e.o),
        n ? (t.o = e.o) : (n = !!e.g),
        n ? (t.g = e.g) : (n = e.u != null));
      var r = e.h;
      if (n) Gt(t, e.u);
      else if ((n = !!e.h)) {
        if (r.charAt(0) != `/`)
          if (this.g && !this.h) r = `/` + r;
          else {
            var i = t.h.lastIndexOf(`/`);
            i != -1 && (r = t.h.slice(0, i + 1) + r);
          }
        if (((i = r), i == `..` || i == `.`)) r = ``;
        else if (i.indexOf(`./`) != -1 || i.indexOf(`/.`) != -1) {
          ((r = i.lastIndexOf(`/`, 0) == 0), (i = i.split(`/`)));
          let e = [];
          for (let t = 0; t < i.length; ) {
            let n = i[t++];
            n == `.`
              ? r && t == i.length && e.push(``)
              : n == `..`
                ? ((e.length > 1 || (e.length == 1 && e[0] != ``)) && e.pop(),
                  r && t == i.length && e.push(``))
                : (e.push(n), (r = !0));
          }
          r = e.join(`/`);
        } else r = i;
      }
      return (
        n ? (t.h = r) : (n = e.i.toString() !== ``),
        n ? Kt(t, T(e.i)) : (n = !!e.m),
        n && (t.m = e.m),
        t
      );
    }));
  function Ut(e) {
    return new Ht(e);
  }
  function Wt(e, t, n) {
    ((e.j = n ? Jt(t, !0) : t), (e.j &&= e.j.replace(/:$/, ``)));
  }
  function Gt(e, t) {
    if (t) {
      if (((t = Number(t)), isNaN(t) || t < 0)) throw Error(`Bad port number ` + t);
      e.u = t;
    } else e.u = null;
  }
  function Kt(e, t, n) {
    t instanceof w ? ((e.i = t), ln(e.i, e.l)) : (n || (t = Yt(t, en)), (e.i = new w(t, e.l)));
  }
  function C(e, t, n) {
    e.i.set(t, n);
  }
  function qt(e) {
    return (
      C(
        e,
        `zx`,
        Math.floor(Math.random() * 2147483648).toString(36) +
          Math.abs(Math.floor(Math.random() * 2147483648) ^ Date.now()).toString(36)
      ),
      e
    );
  }
  function Jt(e, t) {
    return e ? (t ? decodeURI(e.replace(/%25/g, `%2525`)) : decodeURIComponent(e)) : ``;
  }
  function Yt(e, t, n) {
    return typeof e == `string`
      ? ((e = encodeURI(e).replace(t, Xt)), n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, `%$1`)), e)
      : null;
  }
  function Xt(e) {
    return ((e = e.charCodeAt(0)), `%` + ((e >> 4) & 15).toString(16) + (e & 15).toString(16));
  }
  var Zt = /[#\/\?@]/g,
    Qt = /[#\?:]/g,
    $t = /[#\?]/g,
    en = /[#\?@]/g,
    tn = /#/g;
  function w(e, t) {
    ((this.h = this.g = null), (this.i = e || null), (this.j = !!t));
  }
  function nn(e) {
    e.g ||
      ((e.g = new Map()),
      (e.h = 0),
      e.i &&
        Vt(e.i, function (t, n) {
          e.add(decodeURIComponent(t.replace(/\+/g, ` `)), n);
        }));
  }
  ((e = w.prototype),
    (e.add = function (e, t) {
      (nn(this), (this.i = null), (e = cn(this, e)));
      let n = this.g.get(e);
      return (n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this);
    }));
  function rn(e, t) {
    (nn(e),
      (t = cn(e, t)),
      e.g.has(t) && ((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t)));
  }
  function an(e, t) {
    return (nn(e), (t = cn(e, t)), e.g.has(t));
  }
  e.forEach = function (e, t) {
    (nn(this),
      this.g.forEach(function (n, r) {
        n.forEach(function (n) {
          e.call(t, n, r, this);
        }, this);
      }, this));
  };
  function on(e, t) {
    nn(e);
    let n = [];
    if (typeof t == `string`) an(e, t) && (n = n.concat(e.g.get(cn(e, t))));
    else for (e = Array.from(e.g.values()), t = 0; t < e.length; t++) n = n.concat(e[t]);
    return n;
  }
  ((e.set = function (e, t) {
    return (
      nn(this),
      (this.i = null),
      (e = cn(this, e)),
      an(this, e) && (this.h -= this.g.get(e).length),
      this.g.set(e, [t]),
      (this.h += 1),
      this
    );
  }),
    (e.get = function (e, t) {
      return e ? ((e = on(this, e)), e.length > 0 ? String(e[0]) : t) : t;
    }));
  function sn(e, t, n) {
    (rn(e, t), n.length > 0 && ((e.i = null), e.g.set(cn(e, t), p(n)), (e.h += n.length)));
  }
  e.toString = function () {
    if (this.i) return this.i;
    if (!this.g) return ``;
    let e = [],
      t = Array.from(this.g.keys());
    for (let r = 0; r < t.length; r++) {
      var n = t[r];
      let i = ht(n);
      n = on(this, n);
      for (let t = 0; t < n.length; t++) {
        let r = i;
        (n[t] !== `` && (r += `=` + ht(n[t])), e.push(r));
      }
    }
    return (this.i = e.join(`&`));
  };
  function T(e) {
    let t = new w();
    return ((t.i = e.i), e.g && ((t.g = new Map(e.g)), (t.h = e.h)), t);
  }
  function cn(e, t) {
    return ((t = String(t)), e.j && (t = t.toLowerCase()), t);
  }
  function ln(e, t) {
    (t &&
      !e.j &&
      (nn(e),
      (e.i = null),
      e.g.forEach(function (e, t) {
        let n = t.toLowerCase();
        t != n && (rn(this, t), sn(this, n, e));
      }, e)),
      (e.j = t));
  }
  function un(e, t) {
    let n = new at();
    if (o.Image) {
      let r = new Image();
      ((r.onload = u(fn, n, `TestLoadImage: loaded`, !0, t, r)),
        (r.onerror = u(fn, n, `TestLoadImage: error`, !1, t, r)),
        (r.onabort = u(fn, n, `TestLoadImage: abort`, !1, t, r)),
        (r.ontimeout = u(fn, n, `TestLoadImage: timeout`, !1, t, r)),
        o.setTimeout(function () {
          r.ontimeout && r.ontimeout();
        }, 1e4),
        (r.src = e));
    } else t(!1);
  }
  function dn(e, t) {
    let n = new at(),
      r = new AbortController(),
      i = setTimeout(() => {
        (r.abort(), fn(n, `TestPingServer: timeout`, !1, t));
      }, 1e4);
    fetch(e, { signal: r.signal })
      .then((e) => {
        (clearTimeout(i),
          e.ok ? fn(n, `TestPingServer: ok`, !0, t) : fn(n, `TestPingServer: server error`, !1, t));
      })
      .catch(() => {
        (clearTimeout(i), fn(n, `TestPingServer: error`, !1, t));
      });
  }
  function fn(e, t, n, r, i) {
    try {
      (i && ((i.onload = null), (i.onerror = null), (i.onabort = null), (i.ontimeout = null)),
        r(n));
    } catch {}
  }
  function pn() {
    this.g = new Ge();
  }
  function mn(e) {
    ((this.i = e.Sb || null), (this.h = e.ab || !1));
  }
  (d(mn, Ke),
    (mn.prototype.g = function () {
      return new hn(this.i, this.h);
    }));
  function hn(e, t) {
    (y.call(this),
      (this.H = e),
      (this.o = t),
      (this.m = void 0),
      (this.status = this.readyState = 0),
      (this.responseType = this.responseText = this.response = this.statusText = ``),
      (this.onreadystatechange = null),
      (this.A = new Headers()),
      (this.h = null),
      (this.F = `GET`),
      (this.D = ``),
      (this.g = !1),
      (this.B = this.j = this.l = null),
      (this.v = new AbortController()));
  }
  (d(hn, y),
    (e = hn.prototype),
    (e.open = function (e, t) {
      if (this.readyState != 0) throw (this.abort(), Error(`Error reopening a connection`));
      ((this.F = e), (this.D = t), (this.readyState = 1), vn(this));
    }),
    (e.send = function (e) {
      if (this.readyState != 1) throw (this.abort(), Error(`need to call open() first. `));
      if (this.v.signal.aborted) throw (this.abort(), Error(`Request was aborted.`));
      this.g = !0;
      let t = {
        headers: this.A,
        method: this.F,
        credentials: this.m,
        cache: void 0,
        signal: this.v.signal,
      };
      (e && (t.body = e),
        (this.H || o).fetch(new Request(this.D, t)).then(this.Pa.bind(this), this.ga.bind(this)));
    }),
    (e.abort = function () {
      ((this.response = this.responseText = ``),
        (this.A = new Headers()),
        (this.status = 0),
        this.v.abort(),
        this.j && this.j.cancel(`Request was aborted.`).catch(() => {}),
        this.readyState >= 1 && this.g && this.readyState != 4 && ((this.g = !1), _n(this)),
        (this.readyState = 0));
    }),
    (e.Pa = function (e) {
      if (
        this.g &&
        ((this.l = e),
        this.h ||
          ((this.status = this.l.status),
          (this.statusText = this.l.statusText),
          (this.h = e.headers),
          (this.readyState = 2),
          vn(this)),
        this.g && ((this.readyState = 3), vn(this), this.g))
      )
        if (this.responseType === `arraybuffer`)
          e.arrayBuffer().then(this.Na.bind(this), this.ga.bind(this));
        else if (o.ReadableStream !== void 0 && `body` in e) {
          if (((this.j = e.body.getReader()), this.o)) {
            if (this.responseType)
              throw Error(`responseType must be empty for "streamBinaryChunks" mode responses.`);
            this.response = [];
          } else ((this.response = this.responseText = ``), (this.B = new TextDecoder()));
          gn(this);
        } else e.text().then(this.Oa.bind(this), this.ga.bind(this));
    }));
  function gn(e) {
    e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e));
  }
  ((e.Ma = function (e) {
    if (this.g) {
      if (this.o && e.value) this.response.push(e.value);
      else if (!this.o) {
        var t = e.value ? e.value : new Uint8Array();
        (t = this.B.decode(t, { stream: !e.done })) && (this.response = this.responseText += t);
      }
      (e.done ? _n(this) : vn(this), this.readyState == 3 && gn(this));
    }
  }),
    (e.Oa = function (e) {
      this.g && ((this.response = this.responseText = e), _n(this));
    }),
    (e.Na = function (e) {
      this.g && ((this.response = e), _n(this));
    }),
    (e.ga = function () {
      this.g && _n(this);
    }));
  function _n(e) {
    ((e.readyState = 4), (e.l = null), (e.j = null), (e.B = null), vn(e));
  }
  ((e.setRequestHeader = function (e, t) {
    this.A.append(e, t);
  }),
    (e.getResponseHeader = function (e) {
      return (this.h && this.h.get(e.toLowerCase())) || ``;
    }),
    (e.getAllResponseHeaders = function () {
      if (!this.h) return ``;
      let e = [],
        t = this.h.entries();
      for (var n = t.next(); !n.done; ) ((n = n.value), e.push(n[0] + `: ` + n[1]), (n = t.next()));
      return e.join(`\r
`);
    }));
  function vn(e) {
    e.onreadystatechange && e.onreadystatechange.call(e);
  }
  Object.defineProperty(hn.prototype, `withCredentials`, {
    get: function () {
      return this.m === `include`;
    },
    set: function (e) {
      this.m = e ? `include` : `same-origin`;
    },
  });
  function yn(e) {
    let t = ``;
    return (
      ge(e, function (e, n) {
        ((t += n),
          (t += `:`),
          (t += e),
          (t += `\r
`));
      }),
      t
    );
  }
  function bn(e, t, n) {
    a: {
      for (r in n) {
        var r = !1;
        break a;
      }
      r = !0;
    }
    r || ((n = yn(n)), typeof e == `string` || C(e, t, n));
  }
  function E(e) {
    (y.call(this),
      (this.headers = new Map()),
      (this.L = e || null),
      (this.h = !1),
      (this.g = null),
      (this.D = ``),
      (this.o = 0),
      (this.l = ``),
      (this.j = this.B = this.v = this.A = !1),
      (this.m = null),
      (this.F = ``),
      (this.H = !1));
  }
  d(E, y);
  var xn = /^https?$/i,
    Sn = [`POST`, `PUT`];
  ((e = E.prototype),
    (e.Fa = function (e) {
      this.H = e;
    }),
    (e.ea = function (e, t, n, r) {
      if (this.g)
        throw Error(
          `[goog.net.XhrIo] Object is active with another request=` + this.D + `; newUri=` + e
        );
      ((t = t ? t.toUpperCase() : `GET`),
        (this.D = e),
        (this.l = ``),
        (this.o = 0),
        (this.A = !1),
        (this.h = !0),
        (this.g = this.L ? this.L.g() : pt.g()),
        (this.g.onreadystatechange = f(l(this.Ca, this))));
      try {
        ((this.B = !0), this.g.open(t, String(e), !0), (this.B = !1));
      } catch (e) {
        Cn(this, e);
        return;
      }
      if (((e = n || ``), (n = new Map(this.headers)), r))
        if (Object.getPrototypeOf(r) === Object.prototype) for (var i in r) n.set(i, r[i]);
        else if (typeof r.keys == `function` && typeof r.get == `function`)
          for (let e of r.keys()) n.set(e, r.get(e));
        else throw Error(`Unknown input type for opt_headers: ` + String(r));
      ((r = Array.from(n.keys()).find((e) => e.toLowerCase() == `content-type`)),
        (i = o.FormData && e instanceof o.FormData),
        !(Array.prototype.indexOf.call(Sn, t, void 0) >= 0) ||
          r ||
          i ||
          n.set(`Content-Type`, `application/x-www-form-urlencoded;charset=utf-8`));
      for (let [e, t] of n) this.g.setRequestHeader(e, t);
      (this.F && (this.g.responseType = this.F),
        `withCredentials` in this.g &&
          this.g.withCredentials !== this.H &&
          (this.g.withCredentials = this.H));
      try {
        ((this.m &&= (clearTimeout(this.m), null)), (this.v = !0), this.g.send(e), (this.v = !1));
      } catch (e) {
        Cn(this, e);
      }
    }));
  function Cn(e, t) {
    ((e.h = !1), e.g && ((e.j = !0), e.g.abort(), (e.j = !1)), (e.l = t), (e.o = 5), wn(e), En(e));
  }
  function wn(e) {
    e.A || ((e.A = !0), b(e, `complete`), b(e, `error`));
  }
  ((e.abort = function (e) {
    this.g &&
      this.h &&
      ((this.h = !1),
      (this.j = !0),
      this.g.abort(),
      (this.j = !1),
      (this.o = e || 7),
      b(this, `complete`),
      b(this, `abort`),
      En(this));
  }),
    (e.N = function () {
      (this.g &&
        (this.h && ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)), En(this, !0)),
        E.Z.N.call(this));
    }),
    (e.Ca = function () {
      this.u || (this.B || this.v || this.j ? Tn(this) : this.Xa());
    }),
    (e.Xa = function () {
      Tn(this);
    }));
  function Tn(e) {
    if (e.h && a !== void 0) {
      if (e.v && Dn(e) == 4) setTimeout(e.Ca.bind(e), 0);
      else if ((b(e, `readystatechange`), Dn(e) == 4)) {
        e.h = !1;
        try {
          let a = e.ca();
          a: switch (a) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var t = !0;
              break a;
            default:
              t = !1;
          }
          var n;
          if (!(n = t)) {
            var r;
            if ((r = a === 0)) {
              let t = String(e.D).match(Bt)[1] || null;
              (!t && o.self && o.self.location && (t = o.self.location.protocol.slice(0, -1)),
                (r = !xn.test(t ? t.toLowerCase() : ``)));
            }
            n = r;
          }
          if (n) (b(e, `complete`), b(e, `success`));
          else {
            e.o = 6;
            try {
              var i = Dn(e) > 2 ? e.g.statusText : ``;
            } catch {
              i = ``;
            }
            ((e.l = i + ` [` + e.ca() + `]`), wn(e));
          }
        } finally {
          En(e);
        }
      }
    }
  }
  function En(e, t) {
    if (e.g) {
      e.m &&= (clearTimeout(e.m), null);
      let n = e.g;
      ((e.g = null), t || b(e, `ready`));
      try {
        n.onreadystatechange = null;
      } catch {}
    }
  }
  e.isActive = function () {
    return !!this.g;
  };
  function Dn(e) {
    return e.g ? e.g.readyState : 0;
  }
  ((e.ca = function () {
    try {
      return Dn(this) > 2 ? this.g.status : -1;
    } catch {
      return -1;
    }
  }),
    (e.la = function () {
      try {
        return this.g ? this.g.responseText : ``;
      } catch {
        return ``;
      }
    }),
    (e.La = function (e) {
      if (this.g) {
        var t = this.g.responseText;
        return (e && t.indexOf(e) == 0 && (t = t.substring(e.length)), We(t));
      }
    }));
  function On(e) {
    try {
      if (!e.g) return null;
      if (`response` in e.g) return e.g.response;
      switch (e.F) {
        case ``:
        case `text`:
          return e.g.responseText;
        case `arraybuffer`:
          if (`mozResponseArrayBuffer` in e.g) return e.g.mozResponseArrayBuffer;
      }
      return null;
    } catch {
      return null;
    }
  }
  function kn(e) {
    let t = {};
    e = ((e.g && Dn(e) >= 2 && e.g.getAllResponseHeaders()) || ``).split(`\r
`);
    for (let r = 0; r < e.length; r++) {
      if (ue(e[r])) continue;
      var n = gt(e[r]);
      let i = n[0];
      if (((n = n[1]), typeof n != `string`)) continue;
      n = n.trim();
      let a = t[i] || [];
      ((t[i] = a), a.push(n));
    }
    _e(t, function (e) {
      return e.join(`, `);
    });
  }
  ((e.ya = function () {
    return this.o;
  }),
    (e.Ha = function () {
      return typeof this.l == `string` ? this.l : String(this.l);
    }));
  function D(e, t, n) {
    return (n && n.internalChannelParams && n.internalChannelParams[e]) || t;
  }
  function An(e) {
    ((this.za = 0),
      (this.i = []),
      (this.j = new at()),
      (this.ba =
        this.na =
        this.J =
        this.W =
        this.g =
        this.wa =
        this.G =
        this.H =
        this.u =
        this.U =
        this.o =
          null),
      (this.Ya = this.V = 0),
      (this.Sa = D(`failFast`, !1, e)),
      (this.F = this.C = this.v = this.m = this.l = null),
      (this.X = !0),
      (this.xa = this.K = -1),
      (this.Y = this.A = this.D = 0),
      (this.Qa = D(`baseRetryDelayMs`, 5e3, e)),
      (this.Za = D(`retryDelaySeedMs`, 1e4, e)),
      (this.Ta = D(`forwardChannelMaxRetries`, 2, e)),
      (this.va = D(`forwardChannelRequestTimeoutMs`, 2e4, e)),
      (this.ma = (e && e.xmlHttpFactory) || void 0),
      (this.Ua = (e && e.Rb) || void 0),
      (this.Aa = (e && e.useFetchStreams) || !1),
      (this.O = void 0),
      (this.L = (e && e.supportsCrossDomainXhr) || !1),
      (this.M = ``),
      (this.h = new Nt(e && e.concurrentRequestLimit)),
      (this.Ba = new pn()),
      (this.S = (e && e.fastHandshake) || !1),
      (this.R = (e && e.encodeInitMessageHeaders) || !1),
      this.S && this.R && (this.R = !1),
      (this.Ra = (e && e.Pb) || !1),
      e && e.ua && this.j.ua(),
      e && e.forceLongPolling && (this.X = !1),
      (this.aa = (!this.S && this.X && e && e.detectBufferingProxy) || !1),
      (this.ia = void 0),
      e && e.longPollingTimeout && e.longPollingTimeout > 0 && (this.ia = e.longPollingTimeout),
      (this.ta = void 0),
      (this.T = 0),
      (this.P = !1),
      (this.ja = this.B = null));
  }
  ((e = An.prototype),
    (e.ka = 8),
    (e.I = 1),
    (e.connect = function (e, t, n, r) {
      (S(0),
        (this.W = e),
        (this.H = t || {}),
        n && r !== void 0 && ((this.H.OSID = n), (this.H.OAID = r)),
        (this.F = this.X),
        (this.J = qn(this, null, this.W)),
        Pn(this));
    }));
  function jn(e) {
    if ((Nn(e), e.I == 3)) {
      var t = e.V++,
        n = Ut(e.J);
      if (
        (C(n, `SID`, e.M),
        C(n, `RID`, t),
        C(n, `TYPE`, `terminate`),
        In(e, n),
        (t = new _t(e, e.j, t)),
        (t.M = 2),
        (t.A = qt(Ut(n))),
        (n = !1),
        o.navigator && o.navigator.sendBeacon)
      )
        try {
          n = o.navigator.sendBeacon(t.A.toString(), ``);
        } catch {}
      (!n && o.Image && ((new Image().src = t.A), (n = !0)),
        n || ((t.g = k(t.j, null)), t.g.ea(t.A)),
        (t.F = Date.now()),
        Et(t));
    }
    Kn(e);
  }
  function Mn(e) {
    e.g &&= (Bn(e), e.g.cancel(), null);
  }
  function Nn(e) {
    (Mn(e),
      (e.v &&= (o.clearTimeout(e.v), null)),
      Hn(e),
      e.h.cancel(),
      (e.m &&= (typeof e.m == `number` && o.clearTimeout(e.m), null)));
  }
  function Pn(e) {
    if (!Pt(e.h) && !e.m) {
      e.m = !0;
      var t = e.Ea;
      (ie || se(), (ae ||= (ie(), !0)), oe.add(t, e), (e.D = 0));
    }
  }
  function O(e, t) {
    return Ft(e.h) >= e.h.j - (e.m ? 1 : 0)
      ? !1
      : e.m
        ? ((e.i = t.G.concat(e.i)), !0)
        : e.I == 1 || e.I == 2 || e.D >= (e.Sa ? 0 : e.Ta)
          ? !1
          : ((e.m = it(l(e.Ea, e, t), Wn(e, e.D))), e.D++, !0);
  }
  e.Ea = function (e) {
    if (this.m)
      if (((this.m = null), this.I == 1)) {
        if (!e) {
          ((this.V = Math.floor(Math.random() * 1e5)), (e = this.V++));
          let i = new _t(this, this.j, e),
            a = this.o;
          if (
            (this.U && (a ? ((a = ve(a)), be(a, this.U)) : (a = this.U)),
            this.u !== null || this.R || ((i.J = a), (a = null)),
            this.S)
          )
            a: {
              for (var t = 0, n = 0; n < this.i.length; n++) {
                b: {
                  var r = this.i[n];
                  if (`__data__` in r.map && ((r = r.map.__data__), typeof r == `string`)) {
                    r = r.length;
                    break b;
                  }
                  r = void 0;
                }
                if (r === void 0) break;
                if (((t += r), t > 4096)) {
                  t = n;
                  break a;
                }
                if (t === 4096 || n === this.i.length - 1) {
                  t = n + 1;
                  break a;
                }
              }
              t = 1e3;
            }
          else t = 1e3;
          ((t = Ln(this, i, t)),
            (n = Ut(this.J)),
            C(n, `RID`, e),
            C(n, `CVER`, 22),
            this.G && C(n, `X-HTTP-Session-Id`, this.G),
            In(this, n),
            a && (this.R ? (t = `headers=` + ht(yn(a)) + `&` + t) : this.u && bn(n, this.u, a)),
            Lt(this.h, i),
            this.Ra && C(n, `TYPE`, `init`),
            this.S
              ? (C(n, `$req`, t), C(n, `SID`, `null`), (i.U = !0), xt(i, n, null))
              : xt(i, n, t),
            (this.I = 2));
        }
      } else this.I == 3 && (e ? Fn(this, e) : this.i.length == 0 || Pt(this.h) || Fn(this));
  };
  function Fn(e, t) {
    var n = t ? t.l : e.V++;
    let r = Ut(e.J);
    (C(r, `SID`, e.M),
      C(r, `RID`, n),
      C(r, `AID`, e.K),
      In(e, r),
      e.u && e.o && bn(r, e.u, e.o),
      (n = new _t(e, e.j, n, e.D + 1)),
      e.u === null && (n.J = e.o),
      t && (e.i = t.G.concat(e.i)),
      (t = Ln(e, n, 1e3)),
      (n.H = Math.round(e.va * 0.5) + Math.round(e.va * 0.5 * Math.random())),
      Lt(e.h, n),
      xt(n, r, t));
  }
  function In(e, t) {
    (e.H &&
      ge(e.H, function (e, n) {
        C(t, n, e);
      }),
      e.l &&
        ge({}, function (e, n) {
          C(t, n, e);
        }));
  }
  function Ln(e, t, n) {
    n = Math.min(e.i.length, n);
    let r = e.l ? l(e.l.Ka, e.l, e) : null;
    a: {
      var i = e.i;
      let t = -1;
      for (;;) {
        let e = [`count=` + n];
        t == -1 ? (n > 0 ? ((t = i[0].g), e.push(`ofs=` + t)) : (t = 0)) : e.push(`ofs=` + t);
        let c = !0;
        for (let l = 0; l < n; l++) {
          var a = i[l].g;
          let n = i[l].map;
          if (((a -= t), a < 0)) ((t = Math.max(0, i[l].g - 100)), (c = !1));
          else
            try {
              a = `req` + a + `_` || ``;
              try {
                var o = n instanceof Map ? n : Object.entries(n);
                for (let [t, n] of o) {
                  let r = n;
                  (s(n) && (r = x(n)), e.push(a + t + `=` + encodeURIComponent(r)));
                }
              } catch (t) {
                throw (e.push(a + `type=_badmap`), t);
              }
            } catch {
              r && r(n);
            }
        }
        if (c) {
          o = e.join(`&`);
          break a;
        }
      }
      o = void 0;
    }
    return ((e = e.i.splice(0, n)), (t.G = e), o);
  }
  function Rn(e) {
    if (!e.g && !e.v) {
      e.Y = 1;
      var t = e.Da;
      (ie || se(), (ae ||= (ie(), !0)), oe.add(t, e), (e.A = 0));
    }
  }
  function zn(e) {
    return e.g || e.v || e.A >= 3 ? !1 : (e.Y++, (e.v = it(l(e.Da, e), Wn(e, e.A))), e.A++, !0);
  }
  ((e.Da = function () {
    if (((this.v = null), Vn(this), this.aa && !(this.P || this.g == null || this.T <= 0))) {
      var e = 4 * this.T;
      (this.j.info(`BP detection timer enabled: ` + e), (this.B = it(l(this.Wa, this), e)));
    }
  }),
    (e.Wa = function () {
      this.B &&
        ((this.B = null),
        this.j.info(`BP detection timeout reached.`),
        this.j.info(`Buffering proxy detected and switch to long-polling!`),
        (this.F = !1),
        (this.P = !0),
        S(10),
        Mn(this),
        Vn(this));
    }));
  function Bn(e) {
    e.B != null && (o.clearTimeout(e.B), (e.B = null));
  }
  function Vn(e) {
    ((e.g = new _t(e, e.j, `rpc`, e.Y)), e.u === null && (e.g.J = e.o), (e.g.P = 0));
    var t = Ut(e.na);
    (C(t, `RID`, `rpc`),
      C(t, `SID`, e.M),
      C(t, `AID`, e.K),
      C(t, `CI`, e.F ? `0` : `1`),
      !e.F && e.ia && C(t, `TO`, e.ia),
      C(t, `TYPE`, `xmlhttp`),
      In(e, t),
      e.u && e.o && bn(t, e.u, e.o),
      e.O && (e.g.H = e.O));
    var n = e.g;
    ((e = e.ba), (n.M = 1), (n.A = qt(Ut(t))), (n.u = null), (n.R = !0), St(n, e));
  }
  e.Va = function () {
    this.C != null && ((this.C = null), Mn(this), zn(this), S(19));
  };
  function Hn(e) {
    e.C != null && (o.clearTimeout(e.C), (e.C = null));
  }
  function Un(e, t) {
    var n = null;
    if (e.g == t) {
      (Hn(e), Bn(e), (e.g = null));
      var r = 2;
    } else if (It(e.h, t)) ((n = t.G), Rt(e.h, t), (r = 1));
    else return;
    if (e.I != 0) {
      if (t.o)
        if (r == 1) {
          ((n = t.u ? t.u.length : 0), (t = Date.now() - t.F));
          var i = e.D;
          ((r = $e()), b(r, new rt(r, n)), Pn(e));
        } else Rn(e);
      else if (
        ((i = t.m), i == 3 || (i == 0 && t.X > 0) || !((r == 1 && O(e, t)) || (r == 2 && zn(e))))
      )
        switch ((n && n.length > 0 && ((t = e.h), (t.i = t.i.concat(n))), i)) {
          case 1:
            Gn(e, 5);
            break;
          case 4:
            Gn(e, 10);
            break;
          case 3:
            Gn(e, 6);
            break;
          default:
            Gn(e, 2);
        }
    }
  }
  function Wn(e, t) {
    let n = e.Qa + Math.floor(Math.random() * e.Za);
    return (e.isActive() || (n *= 2), n * t);
  }
  function Gn(e, t) {
    if ((e.j.info(`Error code ` + t), t == 2)) {
      var n = l(e.bb, e),
        r = e.Ua;
      let t = !r;
      ((r = new Ht(r || `//www.google.com/images/cleardot.gif`)),
        (o.location && o.location.protocol == `http`) || Wt(r, `https`),
        qt(r),
        t ? un(r.toString(), n) : dn(r.toString(), n));
    } else S(2);
    ((e.I = 0), e.l && e.l.pa(t), Kn(e), Nn(e));
  }
  e.bb = function (e) {
    e
      ? (this.j.info(`Successfully pinged google.com`), S(2))
      : (this.j.info(`Failed to ping google.com`), S(1));
  };
  function Kn(e) {
    if (((e.I = 0), (e.ja = []), e.l)) {
      let t = zt(e.h);
      ((t.length != 0 || e.i.length != 0) &&
        (m(e.ja, t), m(e.ja, e.i), (e.h.i.length = 0), p(e.i), (e.i.length = 0)),
        e.l.oa());
    }
  }
  function qn(e, t, n) {
    var r = n instanceof Ht ? Ut(n) : new Ht(n);
    if (r.g != ``) (t && (r.g = t + `.` + r.g), Gt(r, r.u));
    else {
      var i = o.location;
      ((r = i.protocol), (t = t ? t + `.` + i.hostname : i.hostname), (i = +i.port));
      let e = new Ht(null);
      (r && Wt(e, r), t && (e.g = t), i && Gt(e, i), n && (e.h = n), (r = e));
    }
    return ((n = e.G), (t = e.wa), n && t && C(r, n, t), C(r, `VER`, e.ka), In(e, r), r);
  }
  function k(e, t, n) {
    if (t && !e.L) throw Error(`Can't create secondary domain capable XhrIo object.`);
    return ((t = e.Aa && !e.ma ? new E(new mn({ ab: n })) : new E(e.ma)), t.Fa(e.L), t);
  }
  e.isActive = function () {
    return !!this.l && this.l.isActive(this);
  };
  function A() {}
  ((e = A.prototype),
    (e.ra = function () {}),
    (e.qa = function () {}),
    (e.pa = function () {}),
    (e.oa = function () {}),
    (e.isActive = function () {
      return !0;
    }),
    (e.Ka = function () {}));
  function Jn() {}
  Jn.prototype.g = function (e, t) {
    return new j(e, t);
  };
  function j(e, t) {
    (y.call(this),
      (this.g = new An(t)),
      (this.l = e),
      (this.h = (t && t.messageUrlParams) || null),
      (e = (t && t.messageHeaders) || null),
      t &&
        t.clientProtocolHeaderRequired &&
        (e ? (e[`X-Client-Protocol`] = `webchannel`) : (e = { "X-Client-Protocol": `webchannel` })),
      (this.g.o = e),
      (e = (t && t.initMessageHeaders) || null),
      t &&
        t.messageContentType &&
        (e
          ? (e[`X-WebChannel-Content-Type`] = t.messageContentType)
          : (e = { "X-WebChannel-Content-Type": t.messageContentType })),
      t &&
        t.sa &&
        (e
          ? (e[`X-WebChannel-Client-Profile`] = t.sa)
          : (e = { "X-WebChannel-Client-Profile": t.sa })),
      (this.g.U = e),
      (e = t && t.Qb) && !ue(e) && (this.g.u = e),
      (this.A = (t && t.supportsCrossDomainXhr) || !1),
      (this.v = (t && t.sendRawJson) || !1),
      (t &&= t.httpSessionIdParam) &&
        !ue(t) &&
        ((this.g.G = t),
        (e = this.h),
        e !== null && t in e && ((e = this.h), t in e && delete e[t])),
      (this.j = new Zn(this)));
  }
  (d(j, y),
    (j.prototype.m = function () {
      ((this.g.l = this.j), this.A && (this.g.L = !0), this.g.connect(this.l, this.h || void 0));
    }),
    (j.prototype.close = function () {
      jn(this.g);
    }),
    (j.prototype.o = function (e) {
      var t = this.g;
      if (typeof e == `string`) {
        var n = {};
        ((n.__data__ = e), (e = n));
      } else this.v && ((n = {}), (n.__data__ = x(e)), (e = n));
      (t.i.push(new Mt(t.Ya++, e)), t.I == 3 && Pn(t));
    }),
    (j.prototype.N = function () {
      ((this.g.l = null), delete this.j, jn(this.g), delete this.g, j.Z.N.call(this));
    }));
  function Yn(e) {
    (Ye.call(this),
      e.__headers__ &&
        ((this.headers = e.__headers__),
        (this.statusCode = e.__status__),
        delete e.__headers__,
        delete e.__status__));
    var t = e.__sm__;
    if (t) {
      a: {
        for (let n in t) {
          e = n;
          break a;
        }
        e = void 0;
      }
      ((this.i = e) && ((e = this.i), (t = t !== null && e in t ? t[e] : void 0)), (this.data = t));
    } else this.data = e;
  }
  d(Yn, Ye);
  function Xn() {
    (Xe.call(this), (this.status = 1));
  }
  d(Xn, Xe);
  function Zn(e) {
    this.g = e;
  }
  (d(Zn, A),
    (Zn.prototype.ra = function () {
      b(this.g, `a`);
    }),
    (Zn.prototype.qa = function (e) {
      b(this.g, new Yn(e));
    }),
    (Zn.prototype.pa = function (e) {
      b(this.g, new Xn());
    }),
    (Zn.prototype.oa = function () {
      b(this.g, `b`);
    }),
    (Jn.prototype.createWebChannel = Jn.prototype.g),
    (j.prototype.send = j.prototype.o),
    (j.prototype.open = j.prototype.m),
    (j.prototype.close = j.prototype.close),
    (zl = jl.createWebChannelTransport =
      function () {
        return new Jn();
      }),
    (Rl = jl.getStatEventTarget =
      function () {
        return $e();
      }),
    (Ll = jl.Event = Ze),
    (Il = jl.Stat =
      {
        jb: 0,
        mb: 1,
        nb: 2,
        Hb: 3,
        Mb: 4,
        Jb: 5,
        Kb: 6,
        Ib: 7,
        Gb: 8,
        Lb: 9,
        PROXY: 10,
        NOPROXY: 11,
        Eb: 12,
        Ab: 13,
        Bb: 14,
        zb: 15,
        Cb: 16,
        Db: 17,
        fb: 18,
        eb: 19,
        gb: 20,
      }),
    (dt.NO_ERROR = 0),
    (dt.TIMEOUT = 8),
    (dt.HTTP_ERROR = 6),
    (Fl = jl.ErrorCode = dt),
    (ft.COMPLETE = `complete`),
    (Pl = jl.EventType = ft),
    (qe.EventType = Je),
    (Je.OPEN = `a`),
    (Je.CLOSE = `b`),
    (Je.ERROR = `c`),
    (Je.MESSAGE = `d`),
    (y.prototype.listen = y.prototype.J),
    (Nl = jl.WebChannel = qe),
    (jl.FetchXmlHttpFactory = mn),
    (E.prototype.listenOnce = E.prototype.K),
    (E.prototype.getLastError = E.prototype.Ha),
    (E.prototype.getLastErrorCode = E.prototype.ya),
    (E.prototype.getStatus = E.prototype.ca),
    (E.prototype.getResponseJson = E.prototype.La),
    (E.prototype.getResponseText = E.prototype.la),
    (E.prototype.send = E.prototype.ea),
    (E.prototype.setWithCredentials = E.prototype.Fa),
    (Ml = jl.XhrIo = E));
}).apply(Al === void 0 ? (typeof self < `u` ? self : typeof window < `u` ? window : {}) : Al);
var Bl = class {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return this.uid != null;
  }
  toKey() {
    return this.isAuthenticated() ? `uid:` + this.uid : `anonymous-user`;
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
};
((Bl.UNAUTHENTICATED = new Bl(null)),
  (Bl.GOOGLE_CREDENTIALS = new Bl(`google-credentials-uid`)),
  (Bl.FIRST_PARTY = new Bl(`first-party-uid`)),
  (Bl.MOCK_USER = new Bl(`mock-user`)));
var Vl = `12.8.0`;
function Hl(e) {
  Vl = e;
}
var Ul = new Je(`@firebase/firestore`);
function Wl() {
  return Ul.logLevel;
}
function M(e, ...t) {
  if (Ul.logLevel <= x.DEBUG) {
    let n = t.map(ql);
    Ul.debug(`Firestore (${Vl}): ${e}`, ...n);
  }
}
function Gl(e, ...t) {
  if (Ul.logLevel <= x.ERROR) {
    let n = t.map(ql);
    Ul.error(`Firestore (${Vl}): ${e}`, ...n);
  }
}
function Kl(e, ...t) {
  if (Ul.logLevel <= x.WARN) {
    let n = t.map(ql);
    Ul.warn(`Firestore (${Vl}): ${e}`, ...n);
  }
}
function ql(e) {
  if (typeof e == `string`) return e;
  try {
    return (function (e) {
      return JSON.stringify(e);
    })(e);
  } catch {
    return e;
  }
}
function N(e, t, n) {
  let r = `Unexpected state`;
  (typeof t == `string` ? (r = t) : (n = t), Jl(e, r, n));
}
function Jl(e, t, n) {
  let r = `FIRESTORE (${Vl}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;
  if (n !== void 0)
    try {
      r += ` CONTEXT: ` + JSON.stringify(n);
    } catch {
      r += ` CONTEXT: ` + n;
    }
  throw (Gl(r), Error(r));
}
function P(e, t, n, r) {
  let i = `Unexpected state`;
  (typeof n == `string` ? (i = n) : (r = n), e || Jl(t, i, r));
}
function F(e, t) {
  return e;
}
var I = {
    OK: `ok`,
    CANCELLED: `cancelled`,
    UNKNOWN: `unknown`,
    INVALID_ARGUMENT: `invalid-argument`,
    DEADLINE_EXCEEDED: `deadline-exceeded`,
    NOT_FOUND: `not-found`,
    ALREADY_EXISTS: `already-exists`,
    PERMISSION_DENIED: `permission-denied`,
    UNAUTHENTICATED: `unauthenticated`,
    RESOURCE_EXHAUSTED: `resource-exhausted`,
    FAILED_PRECONDITION: `failed-precondition`,
    ABORTED: `aborted`,
    OUT_OF_RANGE: `out-of-range`,
    UNIMPLEMENTED: `unimplemented`,
    INTERNAL: `internal`,
    UNAVAILABLE: `unavailable`,
    DATA_LOSS: `data-loss`,
  },
  L = class extends ye {
    constructor(e, t) {
      (super(e, t),
        (this.code = e),
        (this.message = t),
        (this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`));
    }
  },
  Yl = class {
    constructor() {
      this.promise = new Promise((e, t) => {
        ((this.resolve = e), (this.reject = t));
      });
    }
  },
  Xl = class {
    constructor(e, t) {
      ((this.user = t),
        (this.type = `OAuth`),
        (this.headers = new Map()),
        this.headers.set(`Authorization`, `Bearer ${e}`));
    }
  },
  Zl = class {
    getToken() {
      return Promise.resolve(null);
    }
    invalidateToken() {}
    start(e, t) {
      e.enqueueRetryable(() => t(Bl.UNAUTHENTICATED));
    }
    shutdown() {}
  },
  Ql = class {
    constructor(e) {
      ((this.token = e), (this.changeListener = null));
    }
    getToken() {
      return Promise.resolve(this.token);
    }
    invalidateToken() {}
    start(e, t) {
      ((this.changeListener = t), e.enqueueRetryable(() => t(this.token.user)));
    }
    shutdown() {
      this.changeListener = null;
    }
  },
  $l = class {
    constructor(e) {
      ((this.t = e),
        (this.currentUser = Bl.UNAUTHENTICATED),
        (this.i = 0),
        (this.forceRefresh = !1),
        (this.auth = null));
    }
    start(e, t) {
      P(this.o === void 0, 42304);
      let n = this.i,
        r = (e) => (this.i === n ? Promise.resolve() : ((n = this.i), t(e))),
        i = new Yl();
      this.o = () => {
        (this.i++,
          (this.currentUser = this.u()),
          i.resolve(),
          (i = new Yl()),
          e.enqueueRetryable(() => r(this.currentUser)));
      };
      let a = () => {
          let t = i;
          e.enqueueRetryable(async () => {
            (await t.promise, await r(this.currentUser));
          });
        },
        o = (e) => {
          (M(`FirebaseAuthCredentialsProvider`, `Auth detected`),
            (this.auth = e),
            this.o && (this.auth.addAuthTokenListener(this.o), a()));
        };
      (this.t.onInit((e) => o(e)),
        setTimeout(() => {
          if (!this.auth) {
            let e = this.t.getImmediate({ optional: !0 });
            e
              ? o(e)
              : (M(`FirebaseAuthCredentialsProvider`, `Auth not yet detected`),
                i.resolve(),
                (i = new Yl()));
          }
        }, 0),
        a());
    }
    getToken() {
      let e = this.i,
        t = this.forceRefresh;
      return (
        (this.forceRefresh = !1),
        this.auth
          ? this.auth
              .getToken(t)
              .then((t) =>
                this.i === e
                  ? t
                    ? (P(typeof t.accessToken == `string`, 31837, { l: t }),
                      new Xl(t.accessToken, this.currentUser))
                    : null
                  : (M(`FirebaseAuthCredentialsProvider`, `getToken aborted due to token change.`),
                    this.getToken())
              )
          : Promise.resolve(null)
      );
    }
    invalidateToken() {
      this.forceRefresh = !0;
    }
    shutdown() {
      (this.auth && this.o && this.auth.removeAuthTokenListener(this.o), (this.o = void 0));
    }
    u() {
      let e = this.auth && this.auth.getUid();
      return (P(e === null || typeof e == `string`, 2055, { h: e }), new Bl(e));
    }
  },
  eu = class {
    constructor(e, t, n) {
      ((this.P = e),
        (this.T = t),
        (this.I = n),
        (this.type = `FirstParty`),
        (this.user = Bl.FIRST_PARTY),
        (this.R = new Map()));
    }
    A() {
      return this.I ? this.I() : null;
    }
    get headers() {
      this.R.set(`X-Goog-AuthUser`, this.P);
      let e = this.A();
      return (
        e && this.R.set(`Authorization`, e),
        this.T && this.R.set(`X-Goog-Iam-Authorization-Token`, this.T),
        this.R
      );
    }
  },
  tu = class {
    constructor(e, t, n) {
      ((this.P = e), (this.T = t), (this.I = n));
    }
    getToken() {
      return Promise.resolve(new eu(this.P, this.T, this.I));
    }
    start(e, t) {
      e.enqueueRetryable(() => t(Bl.FIRST_PARTY));
    }
    shutdown() {}
    invalidateToken() {}
  },
  nu = class {
    constructor(e) {
      ((this.value = e),
        (this.type = `AppCheck`),
        (this.headers = new Map()),
        e && e.length > 0 && this.headers.set(`x-firebase-appcheck`, this.value));
    }
  },
  ru = class {
    constructor(e, t) {
      ((this.V = t),
        (this.forceRefresh = !1),
        (this.appCheck = null),
        (this.m = null),
        (this.p = null),
        w(e) && e.settings.appCheckToken && (this.p = e.settings.appCheckToken));
    }
    start(e, t) {
      P(this.o === void 0, 3512);
      let n = (e) => {
        e.error != null &&
          M(
            `FirebaseAppCheckTokenProvider`,
            `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`
          );
        let n = e.token !== this.m;
        return (
          (this.m = e.token),
          M(`FirebaseAppCheckTokenProvider`, `Received ${n ? `new` : `existing`} token.`),
          n ? t(e.token) : Promise.resolve()
        );
      };
      this.o = (t) => {
        e.enqueueRetryable(() => n(t));
      };
      let r = (e) => {
        (M(`FirebaseAppCheckTokenProvider`, `AppCheck detected`),
          (this.appCheck = e),
          this.o && this.appCheck.addTokenListener(this.o));
      };
      (this.V.onInit((e) => r(e)),
        setTimeout(() => {
          if (!this.appCheck) {
            let e = this.V.getImmediate({ optional: !0 });
            e ? r(e) : M(`FirebaseAppCheckTokenProvider`, `AppCheck not yet detected`);
          }
        }, 0));
    }
    getToken() {
      if (this.p) return Promise.resolve(new nu(this.p));
      let e = this.forceRefresh;
      return (
        (this.forceRefresh = !1),
        this.appCheck
          ? this.appCheck
              .getToken(e)
              .then((e) =>
                e
                  ? (P(typeof e.token == `string`, 44558, { tokenResult: e }),
                    (this.m = e.token),
                    new nu(e.token))
                  : null
              )
          : Promise.resolve(null)
      );
    }
    invalidateToken() {
      this.forceRefresh = !0;
    }
    shutdown() {
      (this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), (this.o = void 0));
    }
  };
function iu(e) {
  let t = typeof self < `u` && (self.crypto || self.msCrypto),
    n = new Uint8Array(e);
  if (t && typeof t.getRandomValues == `function`) t.getRandomValues(n);
  else for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random());
  return n;
}
var au = class {
  static newId() {
    let e = ``;
    for (; e.length < 20; ) {
      let t = iu(40);
      for (let n = 0; n < t.length; ++n)
        e.length < 20 &&
          t[n] < 248 &&
          (e += `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(t[n] % 62));
    }
    return e;
  }
};
function R(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function ou(e, t) {
  let n = Math.min(e.length, t.length);
  for (let r = 0; r < n; r++) {
    let n = e.charAt(r),
      i = t.charAt(r);
    if (n !== i) return lu(n) === lu(i) ? R(n, i) : lu(n) ? 1 : -1;
  }
  return R(e.length, t.length);
}
var su = 55296,
  cu = 57343;
function lu(e) {
  let t = e.charCodeAt(0);
  return t >= su && t <= cu;
}
function uu(e, t, n) {
  return e.length === t.length && e.every((e, r) => n(e, t[r]));
}
var du = `__name__`,
  fu = class e {
    constructor(e, t, n) {
      (t === void 0 ? (t = 0) : t > e.length && N(637, { offset: t, range: e.length }),
        n === void 0
          ? (n = e.length - t)
          : n > e.length - t && N(1746, { length: n, range: e.length - t }),
        (this.segments = e),
        (this.offset = t),
        (this.len = n));
    }
    get length() {
      return this.len;
    }
    isEqual(t) {
      return e.comparator(this, t) === 0;
    }
    child(t) {
      let n = this.segments.slice(this.offset, this.limit());
      return (
        t instanceof e
          ? t.forEach((e) => {
              n.push(e);
            })
          : n.push(t),
        this.construct(n)
      );
    }
    limit() {
      return this.offset + this.length;
    }
    popFirst(e) {
      return (
        (e = e === void 0 ? 1 : e),
        this.construct(this.segments, this.offset + e, this.length - e)
      );
    }
    popLast() {
      return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
      return this.segments[this.offset];
    }
    lastSegment() {
      return this.get(this.length - 1);
    }
    get(e) {
      return this.segments[this.offset + e];
    }
    isEmpty() {
      return this.length === 0;
    }
    isPrefixOf(e) {
      if (e.length < this.length) return !1;
      for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
      return !0;
    }
    isImmediateParentOf(e) {
      if (this.length + 1 !== e.length) return !1;
      for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
      return !0;
    }
    forEach(e) {
      for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t]);
    }
    toArray() {
      return this.segments.slice(this.offset, this.limit());
    }
    static comparator(t, n) {
      let r = Math.min(t.length, n.length);
      for (let i = 0; i < r; i++) {
        let r = e.compareSegments(t.get(i), n.get(i));
        if (r !== 0) return r;
      }
      return R(t.length, n.length);
    }
    static compareSegments(t, n) {
      let r = e.isNumericId(t),
        i = e.isNumericId(n);
      return r && !i
        ? -1
        : !r && i
          ? 1
          : r && i
            ? e.extractNumericId(t).compare(e.extractNumericId(n))
            : ou(t, n);
    }
    static isNumericId(e) {
      return e.startsWith(`__id`) && e.endsWith(`__`);
    }
    static extractNumericId(e) {
      return Ol.fromString(e.substring(4, e.length - 2));
    }
  },
  z = class e extends fu {
    construct(t, n, r) {
      return new e(t, n, r);
    }
    canonicalString() {
      return this.toArray().join(`/`);
    }
    toString() {
      return this.canonicalString();
    }
    toUriEncodedString() {
      return this.toArray().map(encodeURIComponent).join(`/`);
    }
    static fromString(...t) {
      let n = [];
      for (let e of t) {
        if (e.indexOf(`//`) >= 0)
          throw new L(
            I.INVALID_ARGUMENT,
            `Invalid segment (${e}). Paths must not contain // in them.`
          );
        n.push(...e.split(`/`).filter((e) => e.length > 0));
      }
      return new e(n);
    }
    static emptyPath() {
      return new e([]);
    }
  },
  pu = /^[_a-zA-Z][_a-zA-Z0-9]*$/,
  mu = class e extends fu {
    construct(t, n, r) {
      return new e(t, n, r);
    }
    static isValidIdentifier(e) {
      return pu.test(e);
    }
    canonicalString() {
      return this.toArray()
        .map(
          (t) => (
            (t = t.replace(/\\/g, `\\\\`).replace(/`/g, "\\`")),
            e.isValidIdentifier(t) || (t = "`" + t + "`"),
            t
          )
        )
        .join(`.`);
    }
    toString() {
      return this.canonicalString();
    }
    isKeyField() {
      return this.length === 1 && this.get(0) === `__name__`;
    }
    static keyField() {
      return new e([du]);
    }
    static fromServerFormat(t) {
      let n = [],
        r = ``,
        i = 0,
        a = () => {
          if (r.length === 0)
            throw new L(
              I.INVALID_ARGUMENT,
              `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
            );
          (n.push(r), (r = ``));
        },
        o = !1;
      for (; i < t.length; ) {
        let e = t[i];
        if (e === `\\`) {
          if (i + 1 === t.length)
            throw new L(I.INVALID_ARGUMENT, `Path has trailing escape character: ` + t);
          let e = t[i + 1];
          if (e !== `\\` && e !== `.` && e !== "`")
            throw new L(I.INVALID_ARGUMENT, `Path has invalid escape sequence: ` + t);
          ((r += e), (i += 2));
        } else e === "`" ? ((o = !o), i++) : e !== `.` || o ? ((r += e), i++) : (a(), i++);
      }
      if ((a(), o)) throw new L(I.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
      return new e(n);
    }
    static emptyPath() {
      return new e([]);
    }
  },
  B = class e {
    constructor(e) {
      this.path = e;
    }
    static fromPath(t) {
      return new e(z.fromString(t));
    }
    static fromName(t) {
      return new e(z.fromString(t).popFirst(5));
    }
    static empty() {
      return new e(z.emptyPath());
    }
    get collectionGroup() {
      return this.path.popLast().lastSegment();
    }
    hasCollectionId(e) {
      return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
    }
    getCollectionGroup() {
      return this.path.get(this.path.length - 2);
    }
    getCollectionPath() {
      return this.path.popLast();
    }
    isEqual(e) {
      return e !== null && z.comparator(this.path, e.path) === 0;
    }
    toString() {
      return this.path.toString();
    }
    static comparator(e, t) {
      return z.comparator(e.path, t.path);
    }
    static isDocumentKey(e) {
      return e.length % 2 == 0;
    }
    static fromSegments(t) {
      return new e(new z(t.slice()));
    }
  };
function hu(e, t, n) {
  if (!n) throw new L(I.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`);
}
function gu(e, t, n, r) {
  if (!0 === t && !0 === r)
    throw new L(I.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`);
}
function _u(e) {
  if (!B.isDocumentKey(e))
    throw new L(
      I.INVALID_ARGUMENT,
      `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
    );
}
function vu(e) {
  if (B.isDocumentKey(e))
    throw new L(
      I.INVALID_ARGUMENT,
      `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
    );
}
function yu(e) {
  return (
    typeof e == `object` &&
    !!e &&
    (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null)
  );
}
function bu(e) {
  if (e === void 0) return `undefined`;
  if (e === null) return `null`;
  if (typeof e == `string`)
    return (e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e));
  if (typeof e == `number` || typeof e == `boolean`) return `` + e;
  if (typeof e == `object`) {
    if (e instanceof Array) return `an array`;
    {
      let t = (function (e) {
        return e.constructor ? e.constructor.name : null;
      })(e);
      return t ? `a custom ${t} object` : `an object`;
    }
  }
  return typeof e == `function` ? `a function` : N(12329, { type: typeof e });
}
function xu(e, t) {
  if ((`_delegate` in e && (e = e._delegate), !(e instanceof t))) {
    if (t.name === e.constructor.name)
      throw new L(
        I.INVALID_ARGUMENT,
        `Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?`
      );
    {
      let n = bu(e);
      throw new L(I.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`);
    }
  }
  return e;
}
function V(e, t) {
  let n = { typeString: e };
  return (t && (n.value = t), n);
}
function Su(e, t) {
  if (!yu(e)) throw new L(I.INVALID_ARGUMENT, `JSON must be an object`);
  let n;
  for (let r in t)
    if (t[r]) {
      let i = t[r].typeString,
        a = `value` in t[r] ? { value: t[r].value } : void 0;
      if (!(r in e)) {
        n = `JSON missing required field: '${r}'`;
        break;
      }
      let o = e[r];
      if (i && typeof o !== i) {
        n = `JSON field '${r}' must be a ${i}.`;
        break;
      }
      if (a !== void 0 && o !== a.value) {
        n = `Expected '${r}' field to equal '${a.value}'`;
        break;
      }
    }
  if (n) throw new L(I.INVALID_ARGUMENT, n);
  return !0;
}
var Cu = -62135596800,
  wu = 1e6,
  H = class e {
    static now() {
      return e.fromMillis(Date.now());
    }
    static fromDate(t) {
      return e.fromMillis(t.getTime());
    }
    static fromMillis(t) {
      let n = Math.floor(t / 1e3);
      return new e(n, Math.floor((t - 1e3 * n) * wu));
    }
    constructor(e, t) {
      if (((this.seconds = e), (this.nanoseconds = t), t < 0 || t >= 1e9))
        throw new L(I.INVALID_ARGUMENT, `Timestamp nanoseconds out of range: ` + t);
      if (e < Cu || e >= 253402300800)
        throw new L(I.INVALID_ARGUMENT, `Timestamp seconds out of range: ` + e);
    }
    toDate() {
      return new Date(this.toMillis());
    }
    toMillis() {
      return 1e3 * this.seconds + this.nanoseconds / wu;
    }
    _compareTo(e) {
      return this.seconds === e.seconds
        ? R(this.nanoseconds, e.nanoseconds)
        : R(this.seconds, e.seconds);
    }
    isEqual(e) {
      return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
    }
    toString() {
      return `Timestamp(seconds=` + this.seconds + `, nanoseconds=` + this.nanoseconds + `)`;
    }
    toJSON() {
      return { type: e._jsonSchemaVersion, seconds: this.seconds, nanoseconds: this.nanoseconds };
    }
    static fromJSON(t) {
      if (Su(t, e._jsonSchema)) return new e(t.seconds, t.nanoseconds);
    }
    valueOf() {
      let e = this.seconds - Cu;
      return String(e).padStart(12, `0`) + `.` + String(this.nanoseconds).padStart(9, `0`);
    }
  };
((H._jsonSchemaVersion = `firestore/timestamp/1.0`),
  (H._jsonSchema = {
    type: V(`string`, H._jsonSchemaVersion),
    seconds: V(`number`),
    nanoseconds: V(`number`),
  }));
var U = class e {
    static fromTimestamp(t) {
      return new e(t);
    }
    static min() {
      return new e(new H(0, 0));
    }
    static max() {
      return new e(new H(253402300799, 999999999));
    }
    constructor(e) {
      this.timestamp = e;
    }
    compareTo(e) {
      return this.timestamp._compareTo(e.timestamp);
    }
    isEqual(e) {
      return this.timestamp.isEqual(e.timestamp);
    }
    toMicroseconds() {
      return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
      return `SnapshotVersion(` + this.timestamp.toString() + `)`;
    }
    toTimestamp() {
      return this.timestamp;
    }
  },
  Tu = -1,
  Eu = class {
    constructor(e, t, n, r) {
      ((this.indexId = e), (this.collectionGroup = t), (this.fields = n), (this.indexState = r));
    }
  };
Eu.UNKNOWN_ID = -1;
function Du(e, t) {
  let n = e.toTimestamp().seconds,
    r = e.toTimestamp().nanoseconds + 1;
  return new ku(U.fromTimestamp(r === 1e9 ? new H(n + 1, 0) : new H(n, r)), B.empty(), t);
}
function Ou(e) {
  return new ku(e.readTime, e.key, Tu);
}
var ku = class e {
  constructor(e, t, n) {
    ((this.readTime = e), (this.documentKey = t), (this.largestBatchId = n));
  }
  static min() {
    return new e(U.min(), B.empty(), Tu);
  }
  static max() {
    return new e(U.max(), B.empty(), Tu);
  }
};
function Au(e, t) {
  let n = e.readTime.compareTo(t.readTime);
  return n === 0
    ? ((n = B.comparator(e.documentKey, t.documentKey)),
      n === 0 ? R(e.largestBatchId, t.largestBatchId) : n)
    : n;
}
var ju = `The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.`,
  Mu = class {
    constructor() {
      this.onCommittedListeners = [];
    }
    addOnCommittedListener(e) {
      this.onCommittedListeners.push(e);
    }
    raiseOnCommittedEvent() {
      this.onCommittedListeners.forEach((e) => e());
    }
  };
async function Nu(e) {
  if (e.code !== I.FAILED_PRECONDITION || e.message !== ju) throw e;
  M(`LocalStore`, `Unexpectedly lost primary lease`);
}
var W = class e {
  constructor(e) {
    ((this.nextCallback = null),
      (this.catchCallback = null),
      (this.result = void 0),
      (this.error = void 0),
      (this.isDone = !1),
      (this.callbackAttached = !1),
      e(
        (e) => {
          ((this.isDone = !0), (this.result = e), this.nextCallback && this.nextCallback(e));
        },
        (e) => {
          ((this.isDone = !0), (this.error = e), this.catchCallback && this.catchCallback(e));
        }
      ));
  }
  catch(e) {
    return this.next(void 0, e);
  }
  next(t, n) {
    return (
      this.callbackAttached && N(59440),
      (this.callbackAttached = !0),
      this.isDone
        ? this.error
          ? this.wrapFailure(n, this.error)
          : this.wrapSuccess(t, this.result)
        : new e((e, r) => {
            ((this.nextCallback = (n) => {
              this.wrapSuccess(t, n).next(e, r);
            }),
              (this.catchCallback = (t) => {
                this.wrapFailure(n, t).next(e, r);
              }));
          })
    );
  }
  toPromise() {
    return new Promise((e, t) => {
      this.next(e, t);
    });
  }
  wrapUserFunction(t) {
    try {
      let n = t();
      return n instanceof e ? n : e.resolve(n);
    } catch (t) {
      return e.reject(t);
    }
  }
  wrapSuccess(t, n) {
    return t ? this.wrapUserFunction(() => t(n)) : e.resolve(n);
  }
  wrapFailure(t, n) {
    return t ? this.wrapUserFunction(() => t(n)) : e.reject(n);
  }
  static resolve(t) {
    return new e((e, n) => {
      e(t);
    });
  }
  static reject(t) {
    return new e((e, n) => {
      n(t);
    });
  }
  static waitFor(t) {
    return new e((e, n) => {
      let r = 0,
        i = 0,
        a = !1;
      (t.forEach((t) => {
        (++r,
          t.next(
            () => {
              (++i, a && i === r && e());
            },
            (e) => n(e)
          ));
      }),
        (a = !0),
        i === r && e());
    });
  }
  static or(t) {
    let n = e.resolve(!1);
    for (let r of t) n = n.next((t) => (t ? e.resolve(t) : r()));
    return n;
  }
  static forEach(e, t) {
    let n = [];
    return (
      e.forEach((e, r) => {
        n.push(t.call(this, e, r));
      }),
      this.waitFor(n)
    );
  }
  static mapArray(t, n) {
    return new e((e, r) => {
      let i = t.length,
        a = Array(i),
        o = 0;
      for (let s = 0; s < i; s++) {
        let c = s;
        n(t[c]).next(
          (t) => {
            ((a[c] = t), ++o, o === i && e(a));
          },
          (e) => r(e)
        );
      }
    });
  }
  static doWhile(t, n) {
    return new e((e, r) => {
      let i = () => {
        !0 === t()
          ? n().next(() => {
              i();
            }, r)
          : e();
      };
      i();
    });
  }
};
function Pu(e) {
  let t = e.match(/Android ([\d.]+)/i),
    n = t ? t[1].split(`.`).slice(0, 2).join(`.`) : `-1`;
  return Number(n);
}
function Fu(e) {
  return e.name === `IndexedDbTransactionError`;
}
var Iu = class {
  constructor(e, t) {
    ((this.previousValue = e),
      t &&
        ((t.sequenceNumberHandler = (e) => this.ae(e)),
        (this.ue = (e) => t.writeSequenceNumber(e))));
  }
  ae(e) {
    return ((this.previousValue = Math.max(e, this.previousValue)), this.previousValue);
  }
  next() {
    let e = ++this.previousValue;
    return (this.ue && this.ue(e), e);
  }
};
Iu.ce = -1;
var Lu = -1;
function Ru(e) {
  return e == null;
}
function zu(e) {
  return e === 0 && 1 / e == -1 / 0;
}
function Bu(e) {
  return (
    typeof e == `number` && Number.isInteger(e) && !zu(e) && e <= 2 ** 53 - 1 && e >= -(2 ** 53 - 1)
  );
}
var Vu = ``;
function Hu(e) {
  let t = ``;
  for (let n = 0; n < e.length; n++) (t.length > 0 && (t = Wu(t)), (t = Uu(e.get(n), t)));
  return Wu(t);
}
function Uu(e, t) {
  let n = t,
    r = e.length;
  for (let t = 0; t < r; t++) {
    let r = e.charAt(t);
    switch (r) {
      case `\0`:
        n += ``;
        break;
      case Vu:
        n += ``;
        break;
      default:
        n += r;
    }
  }
  return n;
}
function Wu(e) {
  return e + Vu + ``;
}
function Gu(e) {
  let t = 0;
  for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
  return t;
}
function Ku(e, t) {
  for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
}
function qu(e) {
  for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
var G = class e {
    constructor(e, t) {
      ((this.comparator = e), (this.root = t || Yu.EMPTY));
    }
    insert(t, n) {
      return new e(
        this.comparator,
        this.root.insert(t, n, this.comparator).copy(null, null, Yu.BLACK, null, null)
      );
    }
    remove(t) {
      return new e(
        this.comparator,
        this.root.remove(t, this.comparator).copy(null, null, Yu.BLACK, null, null)
      );
    }
    get(e) {
      let t = this.root;
      for (; !t.isEmpty(); ) {
        let n = this.comparator(e, t.key);
        if (n === 0) return t.value;
        n < 0 ? (t = t.left) : n > 0 && (t = t.right);
      }
      return null;
    }
    indexOf(e) {
      let t = 0,
        n = this.root;
      for (; !n.isEmpty(); ) {
        let r = this.comparator(e, n.key);
        if (r === 0) return t + n.left.size;
        r < 0 ? (n = n.left) : ((t += n.left.size + 1), (n = n.right));
      }
      return -1;
    }
    isEmpty() {
      return this.root.isEmpty();
    }
    get size() {
      return this.root.size;
    }
    minKey() {
      return this.root.minKey();
    }
    maxKey() {
      return this.root.maxKey();
    }
    inorderTraversal(e) {
      return this.root.inorderTraversal(e);
    }
    forEach(e) {
      this.inorderTraversal((t, n) => (e(t, n), !1));
    }
    toString() {
      let e = [];
      return (this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), !1)), `{${e.join(`, `)}}`);
    }
    reverseTraversal(e) {
      return this.root.reverseTraversal(e);
    }
    getIterator() {
      return new Ju(this.root, null, this.comparator, !1);
    }
    getIteratorFrom(e) {
      return new Ju(this.root, e, this.comparator, !1);
    }
    getReverseIterator() {
      return new Ju(this.root, null, this.comparator, !0);
    }
    getReverseIteratorFrom(e) {
      return new Ju(this.root, e, this.comparator, !0);
    }
  },
  Ju = class {
    constructor(e, t, n, r) {
      ((this.isReverse = r), (this.nodeStack = []));
      let i = 1;
      for (; !e.isEmpty(); )
        if (((i = t ? n(e.key, t) : 1), t && r && (i *= -1), i < 0))
          e = this.isReverse ? e.left : e.right;
        else {
          if (i === 0) {
            this.nodeStack.push(e);
            break;
          }
          (this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left));
        }
    }
    getNext() {
      let e = this.nodeStack.pop(),
        t = { key: e.key, value: e.value };
      if (this.isReverse) for (e = e.left; !e.isEmpty(); ) (this.nodeStack.push(e), (e = e.right));
      else for (e = e.right; !e.isEmpty(); ) (this.nodeStack.push(e), (e = e.left));
      return t;
    }
    hasNext() {
      return this.nodeStack.length > 0;
    }
    peek() {
      if (this.nodeStack.length === 0) return null;
      let e = this.nodeStack[this.nodeStack.length - 1];
      return { key: e.key, value: e.value };
    }
  },
  Yu = class e {
    constructor(t, n, r, i, a) {
      ((this.key = t),
        (this.value = n),
        (this.color = r ?? e.RED),
        (this.left = i ?? e.EMPTY),
        (this.right = a ?? e.EMPTY),
        (this.size = this.left.size + 1 + this.right.size));
    }
    copy(t, n, r, i, a) {
      return new e(
        t ?? this.key,
        n ?? this.value,
        r ?? this.color,
        i ?? this.left,
        a ?? this.right
      );
    }
    isEmpty() {
      return !1;
    }
    inorderTraversal(e) {
      return (
        this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e)
      );
    }
    reverseTraversal(e) {
      return (
        this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
      );
    }
    min() {
      return this.left.isEmpty() ? this : this.left.min();
    }
    minKey() {
      return this.min().key;
    }
    maxKey() {
      return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    insert(e, t, n) {
      let r = this,
        i = n(e, r.key);
      return (
        (r =
          i < 0
            ? r.copy(null, null, null, r.left.insert(e, t, n), null)
            : i === 0
              ? r.copy(null, t, null, null, null)
              : r.copy(null, null, null, null, r.right.insert(e, t, n))),
        r.fixUp()
      );
    }
    removeMin() {
      if (this.left.isEmpty()) return e.EMPTY;
      let t = this;
      return (
        t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()),
        (t = t.copy(null, null, null, t.left.removeMin(), null)),
        t.fixUp()
      );
    }
    remove(t, n) {
      let r,
        i = this;
      if (n(t, i.key) < 0)
        (i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()),
          (i = i.copy(null, null, null, i.left.remove(t, n), null)));
      else {
        if (
          (i.left.isRed() && (i = i.rotateRight()),
          i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()),
          n(t, i.key) === 0)
        ) {
          if (i.right.isEmpty()) return e.EMPTY;
          ((r = i.right.min()), (i = i.copy(r.key, r.value, null, null, i.right.removeMin())));
        }
        i = i.copy(null, null, null, null, i.right.remove(t, n));
      }
      return i.fixUp();
    }
    isRed() {
      return this.color;
    }
    fixUp() {
      let e = this;
      return (
        e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
        e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
        e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
        e
      );
    }
    moveRedLeft() {
      let e = this.colorFlip();
      return (
        e.right.left.isRed() &&
          ((e = e.copy(null, null, null, null, e.right.rotateRight())),
          (e = e.rotateLeft()),
          (e = e.colorFlip())),
        e
      );
    }
    moveRedRight() {
      let e = this.colorFlip();
      return (e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())), e);
    }
    rotateLeft() {
      let t = this.copy(null, null, e.RED, null, this.right.left);
      return this.right.copy(null, null, this.color, t, null);
    }
    rotateRight() {
      let t = this.copy(null, null, e.RED, this.left.right, null);
      return this.left.copy(null, null, this.color, null, t);
    }
    colorFlip() {
      let e = this.left.copy(null, null, !this.left.color, null, null),
        t = this.right.copy(null, null, !this.right.color, null, null);
      return this.copy(null, null, !this.color, e, t);
    }
    checkMaxDepth() {
      return 2 ** this.check() <= this.size + 1;
    }
    check() {
      if (this.isRed() && this.left.isRed()) throw N(43730, { key: this.key, value: this.value });
      if (this.right.isRed()) throw N(14113, { key: this.key, value: this.value });
      let e = this.left.check();
      if (e !== this.right.check()) throw N(27949);
      return e + (this.isRed() ? 0 : 1);
    }
  };
((Yu.EMPTY = null),
  (Yu.RED = !0),
  (Yu.BLACK = !1),
  (Yu.EMPTY = new (class {
    constructor() {
      this.size = 0;
    }
    get key() {
      throw N(57766);
    }
    get value() {
      throw N(16141);
    }
    get color() {
      throw N(16727);
    }
    get left() {
      throw N(29726);
    }
    get right() {
      throw N(36894);
    }
    copy(e, t, n, r, i) {
      return this;
    }
    insert(e, t, n) {
      return new Yu(e, t);
    }
    remove(e, t) {
      return this;
    }
    isEmpty() {
      return !0;
    }
    inorderTraversal(e) {
      return !1;
    }
    reverseTraversal(e) {
      return !1;
    }
    minKey() {
      return null;
    }
    maxKey() {
      return null;
    }
    isRed() {
      return !1;
    }
    checkMaxDepth() {
      return !0;
    }
    check() {
      return 0;
    }
  })()));
var Xu = class e {
    constructor(e) {
      ((this.comparator = e), (this.data = new G(this.comparator)));
    }
    has(e) {
      return this.data.get(e) !== null;
    }
    first() {
      return this.data.minKey();
    }
    last() {
      return this.data.maxKey();
    }
    get size() {
      return this.data.size;
    }
    indexOf(e) {
      return this.data.indexOf(e);
    }
    forEach(e) {
      this.data.inorderTraversal((t, n) => (e(t), !1));
    }
    forEachInRange(e, t) {
      let n = this.data.getIteratorFrom(e[0]);
      for (; n.hasNext(); ) {
        let r = n.getNext();
        if (this.comparator(r.key, e[1]) >= 0) return;
        t(r.key);
      }
    }
    forEachWhile(e, t) {
      let n;
      for (n = t === void 0 ? this.data.getIterator() : this.data.getIteratorFrom(t); n.hasNext(); )
        if (!e(n.getNext().key)) return;
    }
    firstAfterOrEqual(e) {
      let t = this.data.getIteratorFrom(e);
      return t.hasNext() ? t.getNext().key : null;
    }
    getIterator() {
      return new Zu(this.data.getIterator());
    }
    getIteratorFrom(e) {
      return new Zu(this.data.getIteratorFrom(e));
    }
    add(e) {
      return this.copy(this.data.remove(e).insert(e, !0));
    }
    delete(e) {
      return this.has(e) ? this.copy(this.data.remove(e)) : this;
    }
    isEmpty() {
      return this.data.isEmpty();
    }
    unionWith(e) {
      let t = this;
      return (
        t.size < e.size && ((t = e), (e = this)),
        e.forEach((e) => {
          t = t.add(e);
        }),
        t
      );
    }
    isEqual(t) {
      if (!(t instanceof e) || this.size !== t.size) return !1;
      let n = this.data.getIterator(),
        r = t.data.getIterator();
      for (; n.hasNext(); ) {
        let e = n.getNext().key,
          t = r.getNext().key;
        if (this.comparator(e, t) !== 0) return !1;
      }
      return !0;
    }
    toArray() {
      let e = [];
      return (
        this.forEach((t) => {
          e.push(t);
        }),
        e
      );
    }
    toString() {
      let e = [];
      return (this.forEach((t) => e.push(t)), `SortedSet(` + e.toString() + `)`);
    }
    copy(t) {
      let n = new e(this.comparator);
      return ((n.data = t), n);
    }
  },
  Zu = class {
    constructor(e) {
      this.iter = e;
    }
    getNext() {
      return this.iter.getNext().key;
    }
    hasNext() {
      return this.iter.hasNext();
    }
  },
  Qu = class e {
    constructor(e) {
      ((this.fields = e), e.sort(mu.comparator));
    }
    static empty() {
      return new e([]);
    }
    unionWith(t) {
      let n = new Xu(mu.comparator);
      for (let e of this.fields) n = n.add(e);
      for (let e of t) n = n.add(e);
      return new e(n.toArray());
    }
    covers(e) {
      for (let t of this.fields) if (t.isPrefixOf(e)) return !0;
      return !1;
    }
    isEqual(e) {
      return uu(this.fields, e.fields, (e, t) => e.isEqual(t));
    }
  },
  $u = class extends Error {
    constructor() {
      (super(...arguments), (this.name = `Base64DecodeError`));
    }
  },
  ed = class e {
    constructor(e) {
      this.binaryString = e;
    }
    static fromBase64String(t) {
      return new e(
        (function (e) {
          try {
            return atob(e);
          } catch (e) {
            throw typeof DOMException < `u` && e instanceof DOMException
              ? new $u(`Invalid base64 string: ` + e)
              : e;
          }
        })(t)
      );
    }
    static fromUint8Array(t) {
      return new e(
        (function (e) {
          let t = ``;
          for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
          return t;
        })(t)
      );
    }
    [Symbol.iterator]() {
      let e = 0;
      return {
        next: () =>
          e < this.binaryString.length
            ? { value: this.binaryString.charCodeAt(e++), done: !1 }
            : { value: void 0, done: !0 },
      };
    }
    toBase64() {
      return (function (e) {
        return btoa(e);
      })(this.binaryString);
    }
    toUint8Array() {
      return (function (e) {
        let t = new Uint8Array(e.length);
        for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
        return t;
      })(this.binaryString);
    }
    approximateByteSize() {
      return 2 * this.binaryString.length;
    }
    compareTo(e) {
      return R(this.binaryString, e.binaryString);
    }
    isEqual(e) {
      return this.binaryString === e.binaryString;
    }
  };
ed.EMPTY_BYTE_STRING = new ed(``);
var td = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function nd(e) {
  if ((P(!!e, 39018), typeof e == `string`)) {
    let t = 0,
      n = td.exec(e);
    if ((P(!!n, 46558, { timestamp: e }), n[1])) {
      let e = n[1];
      ((e = (e + `000000000`).substr(0, 9)), (t = Number(e)));
    }
    let r = new Date(e);
    return { seconds: Math.floor(r.getTime() / 1e3), nanos: t };
  }
  return { seconds: K(e.seconds), nanos: K(e.nanos) };
}
function K(e) {
  return typeof e == `number` ? e : typeof e == `string` ? Number(e) : 0;
}
function rd(e) {
  return typeof e == `string` ? ed.fromBase64String(e) : ed.fromUint8Array(e);
}
var id = `server_timestamp`,
  ad = `__type__`,
  od = `__previous_value__`,
  sd = `__local_write_time__`;
function cd(e) {
  return (e?.mapValue?.fields || {})[ad]?.stringValue === id;
}
function ld(e) {
  let t = e.mapValue.fields[od];
  return cd(t) ? ld(t) : t;
}
function ud(e) {
  let t = nd(e.mapValue.fields[sd].timestampValue);
  return new H(t.seconds, t.nanos);
}
var dd = class {
    constructor(e, t, n, r, i, a, o, s, c, l, u) {
      ((this.databaseId = e),
        (this.appId = t),
        (this.persistenceKey = n),
        (this.host = r),
        (this.ssl = i),
        (this.forceLongPolling = a),
        (this.autoDetectLongPolling = o),
        (this.longPollingOptions = s),
        (this.useFetchStreams = c),
        (this.isUsingEmulator = l),
        (this.apiKey = u));
    }
  },
  fd = `(default)`,
  pd = class e {
    constructor(e, t) {
      ((this.projectId = e), (this.database = t || fd));
    }
    static empty() {
      return new e(``, ``);
    }
    get isDefaultDatabase() {
      return this.database === fd;
    }
    isEqual(t) {
      return t instanceof e && t.projectId === this.projectId && t.database === this.database;
    }
  };
function md(e, t) {
  if (!Object.prototype.hasOwnProperty.apply(e.options, [`projectId`]))
    throw new L(I.INVALID_ARGUMENT, `"projectId" not provided in firebase.initializeApp.`);
  return new pd(e.options.projectId, t);
}
var hd = `__type__`,
  gd = `__max__`,
  _d = { mapValue: { fields: { __type__: { stringValue: gd } } } },
  vd = `__vector__`,
  yd = `value`;
function bd(e) {
  return `nullValue` in e
    ? 0
    : `booleanValue` in e
      ? 1
      : `integerValue` in e || `doubleValue` in e
        ? 2
        : `timestampValue` in e
          ? 3
          : `stringValue` in e
            ? 5
            : `bytesValue` in e
              ? 6
              : `referenceValue` in e
                ? 7
                : `geoPointValue` in e
                  ? 8
                  : `arrayValue` in e
                    ? 9
                    : `mapValue` in e
                      ? cd(e)
                        ? 4
                        : Ld(e)
                          ? 9007199254740991
                          : Fd(e)
                            ? 10
                            : 11
                      : N(28295, { value: e });
}
function xd(e, t) {
  if (e === t) return !0;
  let n = bd(e);
  if (n !== bd(t)) return !1;
  switch (n) {
    case 0:
    case 9007199254740991:
      return !0;
    case 1:
      return e.booleanValue === t.booleanValue;
    case 4:
      return ud(e).isEqual(ud(t));
    case 3:
      return (function (e, t) {
        if (
          typeof e.timestampValue == `string` &&
          typeof t.timestampValue == `string` &&
          e.timestampValue.length === t.timestampValue.length
        )
          return e.timestampValue === t.timestampValue;
        let n = nd(e.timestampValue),
          r = nd(t.timestampValue);
        return n.seconds === r.seconds && n.nanos === r.nanos;
      })(e, t);
    case 5:
      return e.stringValue === t.stringValue;
    case 6:
      return (function (e, t) {
        return rd(e.bytesValue).isEqual(rd(t.bytesValue));
      })(e, t);
    case 7:
      return e.referenceValue === t.referenceValue;
    case 8:
      return (function (e, t) {
        return (
          K(e.geoPointValue.latitude) === K(t.geoPointValue.latitude) &&
          K(e.geoPointValue.longitude) === K(t.geoPointValue.longitude)
        );
      })(e, t);
    case 2:
      return (function (e, t) {
        if (`integerValue` in e && `integerValue` in t)
          return K(e.integerValue) === K(t.integerValue);
        if (`doubleValue` in e && `doubleValue` in t) {
          let n = K(e.doubleValue),
            r = K(t.doubleValue);
          return n === r ? zu(n) === zu(r) : isNaN(n) && isNaN(r);
        }
        return !1;
      })(e, t);
    case 9:
      return uu(e.arrayValue.values || [], t.arrayValue.values || [], xd);
    case 10:
    case 11:
      return (function (e, t) {
        let n = e.mapValue.fields || {},
          r = t.mapValue.fields || {};
        if (Gu(n) !== Gu(r)) return !1;
        for (let e in n) if (n.hasOwnProperty(e) && (r[e] === void 0 || !xd(n[e], r[e]))) return !1;
        return !0;
      })(e, t);
    default:
      return N(52216, { left: e });
  }
}
function Sd(e, t) {
  return (e.values || []).find((e) => xd(e, t)) !== void 0;
}
function Cd(e, t) {
  if (e === t) return 0;
  let n = bd(e),
    r = bd(t);
  if (n !== r) return R(n, r);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return R(e.booleanValue, t.booleanValue);
    case 2:
      return (function (e, t) {
        let n = K(e.integerValue || e.doubleValue),
          r = K(t.integerValue || t.doubleValue);
        return n < r ? -1 : n > r ? 1 : n === r ? 0 : isNaN(n) ? (isNaN(r) ? 0 : -1) : 1;
      })(e, t);
    case 3:
      return wd(e.timestampValue, t.timestampValue);
    case 4:
      return wd(ud(e), ud(t));
    case 5:
      return ou(e.stringValue, t.stringValue);
    case 6:
      return (function (e, t) {
        let n = rd(e),
          r = rd(t);
        return n.compareTo(r);
      })(e.bytesValue, t.bytesValue);
    case 7:
      return (function (e, t) {
        let n = e.split(`/`),
          r = t.split(`/`);
        for (let e = 0; e < n.length && e < r.length; e++) {
          let t = R(n[e], r[e]);
          if (t !== 0) return t;
        }
        return R(n.length, r.length);
      })(e.referenceValue, t.referenceValue);
    case 8:
      return (function (e, t) {
        let n = R(K(e.latitude), K(t.latitude));
        return n === 0 ? R(K(e.longitude), K(t.longitude)) : n;
      })(e.geoPointValue, t.geoPointValue);
    case 9:
      return Td(e.arrayValue, t.arrayValue);
    case 10:
      return (function (e, t) {
        let n = e.fields || {},
          r = t.fields || {},
          i = n[yd]?.arrayValue,
          a = r[yd]?.arrayValue,
          o = R(i?.values?.length || 0, a?.values?.length || 0);
        return o === 0 ? Td(i, a) : o;
      })(e.mapValue, t.mapValue);
    case 11:
      return (function (e, t) {
        if (e === _d.mapValue && t === _d.mapValue) return 0;
        if (e === _d.mapValue) return 1;
        if (t === _d.mapValue) return -1;
        let n = e.fields || {},
          r = Object.keys(n),
          i = t.fields || {},
          a = Object.keys(i);
        (r.sort(), a.sort());
        for (let e = 0; e < r.length && e < a.length; ++e) {
          let t = ou(r[e], a[e]);
          if (t !== 0) return t;
          let o = Cd(n[r[e]], i[a[e]]);
          if (o !== 0) return o;
        }
        return R(r.length, a.length);
      })(e.mapValue, t.mapValue);
    default:
      throw N(23264, { he: n });
  }
}
function wd(e, t) {
  if (typeof e == `string` && typeof t == `string` && e.length === t.length) return R(e, t);
  let n = nd(e),
    r = nd(t),
    i = R(n.seconds, r.seconds);
  return i === 0 ? R(n.nanos, r.nanos) : i;
}
function Td(e, t) {
  let n = e.values || [],
    r = t.values || [];
  for (let e = 0; e < n.length && e < r.length; ++e) {
    let t = Cd(n[e], r[e]);
    if (t) return t;
  }
  return R(n.length, r.length);
}
function Ed(e) {
  return Dd(e);
}
function Dd(e) {
  return `nullValue` in e
    ? `null`
    : `booleanValue` in e
      ? `` + e.booleanValue
      : `integerValue` in e
        ? `` + e.integerValue
        : `doubleValue` in e
          ? `` + e.doubleValue
          : `timestampValue` in e
            ? (function (e) {
                let t = nd(e);
                return `time(${t.seconds},${t.nanos})`;
              })(e.timestampValue)
            : `stringValue` in e
              ? e.stringValue
              : `bytesValue` in e
                ? (function (e) {
                    return rd(e).toBase64();
                  })(e.bytesValue)
                : `referenceValue` in e
                  ? (function (e) {
                      return B.fromName(e).toString();
                    })(e.referenceValue)
                  : `geoPointValue` in e
                    ? (function (e) {
                        return `geo(${e.latitude},${e.longitude})`;
                      })(e.geoPointValue)
                    : `arrayValue` in e
                      ? (function (e) {
                          let t = `[`,
                            n = !0;
                          for (let r of e.values || []) (n ? (n = !1) : (t += `,`), (t += Dd(r)));
                          return t + `]`;
                        })(e.arrayValue)
                      : `mapValue` in e
                        ? (function (e) {
                            let t = Object.keys(e.fields || {}).sort(),
                              n = `{`,
                              r = !0;
                            for (let i of t)
                              (r ? (r = !1) : (n += `,`), (n += `${i}:${Dd(e.fields[i])}`));
                            return n + `}`;
                          })(e.mapValue)
                        : N(61005, { value: e });
}
function Od(e) {
  switch (bd(e)) {
    case 0:
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
    case 8:
      return 16;
    case 4:
      let t = ld(e);
      return t ? 16 + Od(t) : 16;
    case 5:
      return 2 * e.stringValue.length;
    case 6:
      return rd(e.bytesValue).approximateByteSize();
    case 7:
      return e.referenceValue.length;
    case 9:
      return (function (e) {
        return (e.values || []).reduce((e, t) => e + Od(t), 0);
      })(e.arrayValue);
    case 10:
    case 11:
      return (function (e) {
        let t = 0;
        return (
          Ku(e.fields, (e, n) => {
            t += e.length + Od(n);
          }),
          t
        );
      })(e.mapValue);
    default:
      throw N(13486, { value: e });
  }
}
function kd(e, t) {
  return {
    referenceValue: `projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`,
  };
}
function Ad(e) {
  return !!e && `integerValue` in e;
}
function jd(e) {
  return !!e && `arrayValue` in e;
}
function Md(e) {
  return !!e && `nullValue` in e;
}
function Nd(e) {
  return !!e && `doubleValue` in e && isNaN(Number(e.doubleValue));
}
function Pd(e) {
  return !!e && `mapValue` in e;
}
function Fd(e) {
  return (e?.mapValue?.fields || {})[hd]?.stringValue === vd;
}
function Id(e) {
  if (e.geoPointValue) return { geoPointValue: { ...e.geoPointValue } };
  if (e.timestampValue && typeof e.timestampValue == `object`)
    return { timestampValue: { ...e.timestampValue } };
  if (e.mapValue) {
    let t = { mapValue: { fields: {} } };
    return (Ku(e.mapValue.fields, (e, n) => (t.mapValue.fields[e] = Id(n))), t);
  }
  if (e.arrayValue) {
    let t = { arrayValue: { values: [] } };
    for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
      t.arrayValue.values[n] = Id(e.arrayValue.values[n]);
    return t;
  }
  return { ...e };
}
function Ld(e) {
  return (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === gd;
}
var Rd = class e {
  constructor(e) {
    this.value = e;
  }
  static empty() {
    return new e({ mapValue: {} });
  }
  field(e) {
    if (e.isEmpty()) return this.value;
    {
      let t = this.value;
      for (let n = 0; n < e.length - 1; ++n)
        if (((t = (t.mapValue.fields || {})[e.get(n)]), !Pd(t))) return null;
      return ((t = (t.mapValue.fields || {})[e.lastSegment()]), t || null);
    }
  }
  set(e, t) {
    this.getFieldsMap(e.popLast())[e.lastSegment()] = Id(t);
  }
  setAll(e) {
    let t = mu.emptyPath(),
      n = {},
      r = [];
    e.forEach((e, i) => {
      if (!t.isImmediateParentOf(i)) {
        let e = this.getFieldsMap(t);
        (this.applyChanges(e, n, r), (n = {}), (r = []), (t = i.popLast()));
      }
      e ? (n[i.lastSegment()] = Id(e)) : r.push(i.lastSegment());
    });
    let i = this.getFieldsMap(t);
    this.applyChanges(i, n, r);
  }
  delete(e) {
    let t = this.field(e.popLast());
    Pd(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
  }
  isEqual(e) {
    return xd(this.value, e.value);
  }
  getFieldsMap(e) {
    let t = this.value;
    t.mapValue.fields || (t.mapValue = { fields: {} });
    for (let n = 0; n < e.length; ++n) {
      let r = t.mapValue.fields[e.get(n)];
      ((Pd(r) && r.mapValue.fields) ||
        ((r = { mapValue: { fields: {} } }), (t.mapValue.fields[e.get(n)] = r)),
        (t = r));
    }
    return t.mapValue.fields;
  }
  applyChanges(e, t, n) {
    Ku(t, (t, n) => (e[t] = n));
    for (let t of n) delete e[t];
  }
  clone() {
    return new e(Id(this.value));
  }
};
function zd(e) {
  let t = [];
  return (
    Ku(e.fields, (e, n) => {
      let r = new mu([e]);
      if (Pd(n)) {
        let e = zd(n.mapValue).fields;
        if (e.length === 0) t.push(r);
        else for (let n of e) t.push(r.child(n));
      } else t.push(r);
    }),
    new Qu(t)
  );
}
var Bd = class e {
    constructor(e, t, n, r, i, a, o) {
      ((this.key = e),
        (this.documentType = t),
        (this.version = n),
        (this.readTime = r),
        (this.createTime = i),
        (this.data = a),
        (this.documentState = o));
    }
    static newInvalidDocument(t) {
      return new e(t, 0, U.min(), U.min(), U.min(), Rd.empty(), 0);
    }
    static newFoundDocument(t, n, r, i) {
      return new e(t, 1, n, U.min(), r, i, 0);
    }
    static newNoDocument(t, n) {
      return new e(t, 2, n, U.min(), U.min(), Rd.empty(), 0);
    }
    static newUnknownDocument(t, n) {
      return new e(t, 3, n, U.min(), U.min(), Rd.empty(), 2);
    }
    convertToFoundDocument(e, t) {
      return (
        !this.createTime.isEqual(U.min()) ||
          (this.documentType !== 2 && this.documentType !== 0) ||
          (this.createTime = e),
        (this.version = e),
        (this.documentType = 1),
        (this.data = t),
        (this.documentState = 0),
        this
      );
    }
    convertToNoDocument(e) {
      return (
        (this.version = e),
        (this.documentType = 2),
        (this.data = Rd.empty()),
        (this.documentState = 0),
        this
      );
    }
    convertToUnknownDocument(e) {
      return (
        (this.version = e),
        (this.documentType = 3),
        (this.data = Rd.empty()),
        (this.documentState = 2),
        this
      );
    }
    setHasCommittedMutations() {
      return ((this.documentState = 2), this);
    }
    setHasLocalMutations() {
      return ((this.documentState = 1), (this.version = U.min()), this);
    }
    setReadTime(e) {
      return ((this.readTime = e), this);
    }
    get hasLocalMutations() {
      return this.documentState === 1;
    }
    get hasCommittedMutations() {
      return this.documentState === 2;
    }
    get hasPendingWrites() {
      return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
      return this.documentType !== 0;
    }
    isFoundDocument() {
      return this.documentType === 1;
    }
    isNoDocument() {
      return this.documentType === 2;
    }
    isUnknownDocument() {
      return this.documentType === 3;
    }
    isEqual(t) {
      return (
        t instanceof e &&
        this.key.isEqual(t.key) &&
        this.version.isEqual(t.version) &&
        this.documentType === t.documentType &&
        this.documentState === t.documentState &&
        this.data.isEqual(t.data)
      );
    }
    mutableCopy() {
      return new e(
        this.key,
        this.documentType,
        this.version,
        this.readTime,
        this.createTime,
        this.data.clone(),
        this.documentState
      );
    }
    toString() {
      return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
    }
  },
  Vd = class {
    constructor(e, t) {
      ((this.position = e), (this.inclusive = t));
    }
  };
function Hd(e, t, n) {
  let r = 0;
  for (let i = 0; i < e.position.length; i++) {
    let a = t[i],
      o = e.position[i];
    if (
      ((r = a.field.isKeyField()
        ? B.comparator(B.fromName(o.referenceValue), n.key)
        : Cd(o, n.data.field(a.field))),
      a.dir === `desc` && (r *= -1),
      r !== 0)
    )
      break;
  }
  return r;
}
function Ud(e, t) {
  if (e === null) return t === null;
  if (t === null || e.inclusive !== t.inclusive || e.position.length !== t.position.length)
    return !1;
  for (let n = 0; n < e.position.length; n++) if (!xd(e.position[n], t.position[n])) return !1;
  return !0;
}
var Wd = class {
  constructor(e, t = `asc`) {
    ((this.field = e), (this.dir = t));
  }
};
function Gd(e, t) {
  return e.dir === t.dir && e.field.isEqual(t.field);
}
var Kd = class {},
  q = class e extends Kd {
    constructor(e, t, n) {
      (super(), (this.field = e), (this.op = t), (this.value = n));
    }
    static create(t, n, r) {
      return t.isKeyField()
        ? n === `in` || n === `not-in`
          ? this.createKeyFieldInFilter(t, n, r)
          : new ef(t, n, r)
        : n === `array-contains`
          ? new af(t, r)
          : n === `in`
            ? new of(t, r)
            : n === `not-in`
              ? new sf(t, r)
              : n === `array-contains-any`
                ? new cf(t, r)
                : new e(t, n, r);
    }
    static createKeyFieldInFilter(e, t, n) {
      return t === `in` ? new tf(e, n) : new nf(e, n);
    }
    matches(e) {
      let t = e.data.field(this.field);
      return this.op === `!=`
        ? t !== null && t.nullValue === void 0 && this.matchesComparison(Cd(t, this.value))
        : t !== null && bd(this.value) === bd(t) && this.matchesComparison(Cd(t, this.value));
    }
    matchesComparison(e) {
      switch (this.op) {
        case `<`:
          return e < 0;
        case `<=`:
          return e <= 0;
        case `==`:
          return e === 0;
        case `!=`:
          return e !== 0;
        case `>`:
          return e > 0;
        case `>=`:
          return e >= 0;
        default:
          return N(47266, { operator: this.op });
      }
    }
    isInequality() {
      return [`<`, `<=`, `>`, `>=`, `!=`, `not-in`].indexOf(this.op) >= 0;
    }
    getFlattenedFilters() {
      return [this];
    }
    getFilters() {
      return [this];
    }
  },
  qd = class e extends Kd {
    constructor(e, t) {
      (super(), (this.filters = e), (this.op = t), (this.Pe = null));
    }
    static create(t, n) {
      return new e(t, n);
    }
    matches(e) {
      return Jd(this)
        ? this.filters.find((t) => !t.matches(e)) === void 0
        : this.filters.find((t) => t.matches(e)) !== void 0;
    }
    getFlattenedFilters() {
      return (
        this.Pe !== null ||
          (this.Pe = this.filters.reduce((e, t) => e.concat(t.getFlattenedFilters()), [])),
        this.Pe
      );
    }
    getFilters() {
      return Object.assign([], this.filters);
    }
  };
function Jd(e) {
  return e.op === `and`;
}
function Yd(e) {
  return Xd(e) && Jd(e);
}
function Xd(e) {
  for (let t of e.filters) if (t instanceof qd) return !1;
  return !0;
}
function Zd(e) {
  if (e instanceof q) return e.field.canonicalString() + e.op.toString() + Ed(e.value);
  if (Yd(e)) return e.filters.map((e) => Zd(e)).join(`,`);
  {
    let t = e.filters.map((e) => Zd(e)).join(`,`);
    return `${e.op}(${t})`;
  }
}
function Qd(e, t) {
  return e instanceof q
    ? (function (e, t) {
        return t instanceof q && e.op === t.op && e.field.isEqual(t.field) && xd(e.value, t.value);
      })(e, t)
    : e instanceof qd
      ? (function (e, t) {
          return t instanceof qd && e.op === t.op && e.filters.length === t.filters.length
            ? e.filters.reduce((e, n, r) => e && Qd(n, t.filters[r]), !0)
            : !1;
        })(e, t)
      : void N(19439);
}
function $d(e) {
  return e instanceof q
    ? (function (e) {
        return `${e.field.canonicalString()} ${e.op} ${Ed(e.value)}`;
      })(e)
    : e instanceof qd
      ? (function (e) {
          return e.op.toString() + ` {` + e.getFilters().map($d).join(` ,`) + `}`;
        })(e)
      : `Filter`;
}
var ef = class extends q {
    constructor(e, t, n) {
      (super(e, t, n), (this.key = B.fromName(n.referenceValue)));
    }
    matches(e) {
      let t = B.comparator(e.key, this.key);
      return this.matchesComparison(t);
    }
  },
  tf = class extends q {
    constructor(e, t) {
      (super(e, `in`, t), (this.keys = rf(`in`, t)));
    }
    matches(e) {
      return this.keys.some((t) => t.isEqual(e.key));
    }
  },
  nf = class extends q {
    constructor(e, t) {
      (super(e, `not-in`, t), (this.keys = rf(`not-in`, t)));
    }
    matches(e) {
      return !this.keys.some((t) => t.isEqual(e.key));
    }
  };
function rf(e, t) {
  return (t.arrayValue?.values || []).map((e) => B.fromName(e.referenceValue));
}
var af = class extends q {
    constructor(e, t) {
      super(e, `array-contains`, t);
    }
    matches(e) {
      let t = e.data.field(this.field);
      return jd(t) && Sd(t.arrayValue, this.value);
    }
  },
  of = class extends q {
    constructor(e, t) {
      super(e, `in`, t);
    }
    matches(e) {
      let t = e.data.field(this.field);
      return t !== null && Sd(this.value.arrayValue, t);
    }
  },
  sf = class extends q {
    constructor(e, t) {
      super(e, `not-in`, t);
    }
    matches(e) {
      if (Sd(this.value.arrayValue, { nullValue: `NULL_VALUE` })) return !1;
      let t = e.data.field(this.field);
      return t !== null && t.nullValue === void 0 && !Sd(this.value.arrayValue, t);
    }
  },
  cf = class extends q {
    constructor(e, t) {
      super(e, `array-contains-any`, t);
    }
    matches(e) {
      let t = e.data.field(this.field);
      return (
        !(!jd(t) || !t.arrayValue.values) &&
        t.arrayValue.values.some((e) => Sd(this.value.arrayValue, e))
      );
    }
  },
  lf = class {
    constructor(e, t = null, n = [], r = [], i = null, a = null, o = null) {
      ((this.path = e),
        (this.collectionGroup = t),
        (this.orderBy = n),
        (this.filters = r),
        (this.limit = i),
        (this.startAt = a),
        (this.endAt = o),
        (this.Te = null));
    }
  };
function uf(e, t = null, n = [], r = [], i = null, a = null, o = null) {
  return new lf(e, t, n, r, i, a, o);
}
function df(e) {
  let t = F(e);
  if (t.Te === null) {
    let e = t.path.canonicalString();
    (t.collectionGroup !== null && (e += `|cg:` + t.collectionGroup),
      (e += `|f:`),
      (e += t.filters.map((e) => Zd(e)).join(`,`)),
      (e += `|ob:`),
      (e += t.orderBy
        .map((e) =>
          (function (e) {
            return e.field.canonicalString() + e.dir;
          })(e)
        )
        .join(`,`)),
      Ru(t.limit) || ((e += `|l:`), (e += t.limit)),
      t.startAt &&
        ((e += `|lb:`),
        (e += t.startAt.inclusive ? `b:` : `a:`),
        (e += t.startAt.position.map((e) => Ed(e)).join(`,`))),
      t.endAt &&
        ((e += `|ub:`),
        (e += t.endAt.inclusive ? `a:` : `b:`),
        (e += t.endAt.position.map((e) => Ed(e)).join(`,`))),
      (t.Te = e));
  }
  return t.Te;
}
function ff(e, t) {
  if (e.limit !== t.limit || e.orderBy.length !== t.orderBy.length) return !1;
  for (let n = 0; n < e.orderBy.length; n++) if (!Gd(e.orderBy[n], t.orderBy[n])) return !1;
  if (e.filters.length !== t.filters.length) return !1;
  for (let n = 0; n < e.filters.length; n++) if (!Qd(e.filters[n], t.filters[n])) return !1;
  return (
    e.collectionGroup === t.collectionGroup &&
    !!e.path.isEqual(t.path) &&
    !!Ud(e.startAt, t.startAt) &&
    Ud(e.endAt, t.endAt)
  );
}
function pf(e) {
  return B.isDocumentKey(e.path) && e.collectionGroup === null && e.filters.length === 0;
}
var mf = class {
  constructor(e, t = null, n = [], r = [], i = null, a = `F`, o = null, s = null) {
    ((this.path = e),
      (this.collectionGroup = t),
      (this.explicitOrderBy = n),
      (this.filters = r),
      (this.limit = i),
      (this.limitType = a),
      (this.startAt = o),
      (this.endAt = s),
      (this.Ie = null),
      (this.Ee = null),
      (this.Re = null),
      this.startAt,
      this.endAt);
  }
};
function hf(e, t, n, r, i, a, o, s) {
  return new mf(e, t, n, r, i, a, o, s);
}
function gf(e) {
  return new mf(e);
}
function _f(e) {
  return (
    e.filters.length === 0 &&
    e.limit === null &&
    e.startAt == null &&
    e.endAt == null &&
    (e.explicitOrderBy.length === 0 ||
      (e.explicitOrderBy.length === 1 && e.explicitOrderBy[0].field.isKeyField()))
  );
}
function vf(e) {
  return B.isDocumentKey(e.path) && e.collectionGroup === null && e.filters.length === 0;
}
function yf(e) {
  return e.collectionGroup !== null;
}
function bf(e) {
  let t = F(e);
  if (t.Ie === null) {
    t.Ie = [];
    let e = new Set();
    for (let n of t.explicitOrderBy) (t.Ie.push(n), e.add(n.field.canonicalString()));
    let n =
      t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : `asc`;
    ((function (e) {
      let t = new Xu(mu.comparator);
      return (
        e.filters.forEach((e) => {
          e.getFlattenedFilters().forEach((e) => {
            e.isInequality() && (t = t.add(e.field));
          });
        }),
        t
      );
    })(t).forEach((r) => {
      e.has(r.canonicalString()) || r.isKeyField() || t.Ie.push(new Wd(r, n));
    }),
      e.has(mu.keyField().canonicalString()) || t.Ie.push(new Wd(mu.keyField(), n)));
  }
  return t.Ie;
}
function xf(e) {
  let t = F(e);
  return ((t.Ee ||= Sf(t, bf(e))), t.Ee);
}
function Sf(e, t) {
  if (e.limitType === `F`)
    return uf(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt);
  {
    t = t.map((e) => {
      let t = e.dir === `desc` ? `asc` : `desc`;
      return new Wd(e.field, t);
    });
    let n = e.endAt ? new Vd(e.endAt.position, e.endAt.inclusive) : null,
      r = e.startAt ? new Vd(e.startAt.position, e.startAt.inclusive) : null;
    return uf(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
  }
}
function Cf(e, t) {
  let n = e.filters.concat([t]);
  return new mf(
    e.path,
    e.collectionGroup,
    e.explicitOrderBy.slice(),
    n,
    e.limit,
    e.limitType,
    e.startAt,
    e.endAt
  );
}
function wf(e, t) {
  let n = e.explicitOrderBy.concat([t]);
  return new mf(
    e.path,
    e.collectionGroup,
    n,
    e.filters.slice(),
    e.limit,
    e.limitType,
    e.startAt,
    e.endAt
  );
}
function Tf(e, t, n) {
  return new mf(
    e.path,
    e.collectionGroup,
    e.explicitOrderBy.slice(),
    e.filters.slice(),
    t,
    n,
    e.startAt,
    e.endAt
  );
}
function Ef(e, t) {
  return ff(xf(e), xf(t)) && e.limitType === t.limitType;
}
function Df(e) {
  return `${df(xf(e))}|lt:${e.limitType}`;
}
function Of(e) {
  return `Query(target=${(function (e) {
    let t = e.path.canonicalString();
    return (
      e.collectionGroup !== null && (t += ` collectionGroup=` + e.collectionGroup),
      e.filters.length > 0 && (t += `, filters: [${e.filters.map((e) => $d(e)).join(`, `)}]`),
      Ru(e.limit) || (t += `, limit: ` + e.limit),
      e.orderBy.length > 0 &&
        (t += `, orderBy: [${e.orderBy
          .map((e) =>
            (function (e) {
              return `${e.field.canonicalString()} (${e.dir})`;
            })(e)
          )
          .join(`, `)}]`),
      e.startAt &&
        ((t += `, startAt: `),
        (t += e.startAt.inclusive ? `b:` : `a:`),
        (t += e.startAt.position.map((e) => Ed(e)).join(`,`))),
      e.endAt &&
        ((t += `, endAt: `),
        (t += e.endAt.inclusive ? `a:` : `b:`),
        (t += e.endAt.position.map((e) => Ed(e)).join(`,`))),
      `Target(${t})`
    );
  })(xf(e))}; limitType=${e.limitType})`;
}
function kf(e, t) {
  return (
    t.isFoundDocument() &&
    (function (e, t) {
      let n = t.key.path;
      return e.collectionGroup === null
        ? B.isDocumentKey(e.path)
          ? e.path.isEqual(n)
          : e.path.isImmediateParentOf(n)
        : t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n);
    })(e, t) &&
    (function (e, t) {
      for (let n of bf(e)) if (!n.field.isKeyField() && t.data.field(n.field) === null) return !1;
      return !0;
    })(e, t) &&
    (function (e, t) {
      for (let n of e.filters) if (!n.matches(t)) return !1;
      return !0;
    })(e, t) &&
    (function (e, t) {
      return !(
        (e.startAt &&
          !(function (e, t, n) {
            let r = Hd(e, t, n);
            return e.inclusive ? r <= 0 : r < 0;
          })(e.startAt, bf(e), t)) ||
        (e.endAt &&
          !(function (e, t, n) {
            let r = Hd(e, t, n);
            return e.inclusive ? r >= 0 : r > 0;
          })(e.endAt, bf(e), t))
      );
    })(e, t)
  );
}
function Af(e) {
  return (
    e.collectionGroup ||
    (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
  );
}
function jf(e) {
  return (t, n) => {
    let r = !1;
    for (let i of bf(e)) {
      let e = Mf(i, t, n);
      if (e !== 0) return e;
      r ||= i.field.isKeyField();
    }
    return 0;
  };
}
function Mf(e, t, n) {
  let r = e.field.isKeyField()
    ? B.comparator(t.key, n.key)
    : (function (e, t, n) {
        let r = t.data.field(e),
          i = n.data.field(e);
        return r !== null && i !== null ? Cd(r, i) : N(42886);
      })(e.field, t, n);
  switch (e.dir) {
    case `asc`:
      return r;
    case `desc`:
      return -1 * r;
    default:
      return N(19790, { direction: e.dir });
  }
}
var Nf = class {
    constructor(e, t) {
      ((this.mapKeyFn = e), (this.equalsFn = t), (this.inner = {}), (this.innerSize = 0));
    }
    get(e) {
      let t = this.mapKeyFn(e),
        n = this.inner[t];
      if (n !== void 0) {
        for (let [t, r] of n) if (this.equalsFn(t, e)) return r;
      }
    }
    has(e) {
      return this.get(e) !== void 0;
    }
    set(e, t) {
      let n = this.mapKeyFn(e),
        r = this.inner[n];
      if (r === void 0) return ((this.inner[n] = [[e, t]]), void this.innerSize++);
      for (let n = 0; n < r.length; n++) if (this.equalsFn(r[n][0], e)) return void (r[n] = [e, t]);
      (r.push([e, t]), this.innerSize++);
    }
    delete(e) {
      let t = this.mapKeyFn(e),
        n = this.inner[t];
      if (n === void 0) return !1;
      for (let r = 0; r < n.length; r++)
        if (this.equalsFn(n[r][0], e))
          return (n.length === 1 ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0);
      return !1;
    }
    forEach(e) {
      Ku(this.inner, (t, n) => {
        for (let [t, r] of n) e(t, r);
      });
    }
    isEmpty() {
      return qu(this.inner);
    }
    size() {
      return this.innerSize;
    }
  },
  Pf = new G(B.comparator);
function Ff() {
  return Pf;
}
var If = new G(B.comparator);
function Lf(...e) {
  let t = If;
  for (let n of e) t = t.insert(n.key, n);
  return t;
}
function Rf(e) {
  let t = If;
  return (e.forEach((e, n) => (t = t.insert(e, n.overlayedDocument))), t);
}
function zf() {
  return Vf();
}
function Bf() {
  return Vf();
}
function Vf() {
  return new Nf(
    (e) => e.toString(),
    (e, t) => e.isEqual(t)
  );
}
var Hf = new G(B.comparator),
  Uf = new Xu(B.comparator);
function J(...e) {
  let t = Uf;
  for (let n of e) t = t.add(n);
  return t;
}
var Wf = new Xu(R);
function Gf() {
  return Wf;
}
function Kf(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t)) return { doubleValue: `NaN` };
    if (t === 1 / 0) return { doubleValue: `Infinity` };
    if (t === -1 / 0) return { doubleValue: `-Infinity` };
  }
  return { doubleValue: zu(t) ? `-0` : t };
}
function qf(e) {
  return { integerValue: `` + e };
}
function Jf(e, t) {
  return Bu(t) ? qf(t) : Kf(e, t);
}
var Yf = class {
  constructor() {
    this._ = void 0;
  }
};
function Xf(e, t, n) {
  return e instanceof $f
    ? (function (e, t) {
        let n = {
          fields: {
            [ad]: { stringValue: id },
            [sd]: { timestampValue: { seconds: e.seconds, nanos: e.nanoseconds } },
          },
        };
        return (t && cd(t) && (t = ld(t)), t && (n.fields[od] = t), { mapValue: n });
      })(n, t)
    : e instanceof ep
      ? tp(e, t)
      : e instanceof np
        ? rp(e, t)
        : (function (e, t) {
            let n = Qf(e, t),
              r = ap(n) + ap(e.Ae);
            return Ad(n) && Ad(e.Ae) ? qf(r) : Kf(e.serializer, r);
          })(e, t);
}
function Zf(e, t, n) {
  return e instanceof ep ? tp(e, t) : e instanceof np ? rp(e, t) : n;
}
function Qf(e, t) {
  return e instanceof ip
    ? (function (e) {
        return (
          Ad(e) ||
          (function (e) {
            return !!e && `doubleValue` in e;
          })(e)
        );
      })(t)
      ? t
      : { integerValue: 0 }
    : null;
}
var $f = class extends Yf {},
  ep = class extends Yf {
    constructor(e) {
      (super(), (this.elements = e));
    }
  };
function tp(e, t) {
  let n = op(t);
  for (let t of e.elements) n.some((e) => xd(e, t)) || n.push(t);
  return { arrayValue: { values: n } };
}
var np = class extends Yf {
  constructor(e) {
    (super(), (this.elements = e));
  }
};
function rp(e, t) {
  let n = op(t);
  for (let t of e.elements) n = n.filter((e) => !xd(e, t));
  return { arrayValue: { values: n } };
}
var ip = class extends Yf {
  constructor(e, t) {
    (super(), (this.serializer = e), (this.Ae = t));
  }
};
function ap(e) {
  return K(e.integerValue || e.doubleValue);
}
function op(e) {
  return jd(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
}
var sp = class {
  constructor(e, t) {
    ((this.field = e), (this.transform = t));
  }
};
function cp(e, t) {
  return (
    e.field.isEqual(t.field) &&
    (function (e, t) {
      return (e instanceof ep && t instanceof ep) || (e instanceof np && t instanceof np)
        ? uu(e.elements, t.elements, xd)
        : e instanceof ip && t instanceof ip
          ? xd(e.Ae, t.Ae)
          : e instanceof $f && t instanceof $f;
    })(e.transform, t.transform)
  );
}
var lp = class {
    constructor(e, t) {
      ((this.version = e), (this.transformResults = t));
    }
  },
  up = class e {
    constructor(e, t) {
      ((this.updateTime = e), (this.exists = t));
    }
    static none() {
      return new e();
    }
    static exists(t) {
      return new e(void 0, t);
    }
    static updateTime(t) {
      return new e(t);
    }
    get isNone() {
      return this.updateTime === void 0 && this.exists === void 0;
    }
    isEqual(e) {
      return (
        this.exists === e.exists &&
        (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
      );
    }
  };
function dp(e, t) {
  return e.updateTime === void 0
    ? e.exists === void 0 || e.exists === t.isFoundDocument()
    : t.isFoundDocument() && t.version.isEqual(e.updateTime);
}
var fp = class {};
function pp(e, t) {
  if (!e.hasLocalMutations || (t && t.fields.length === 0)) return null;
  if (t === null)
    return e.isNoDocument() ? new Cp(e.key, up.none()) : new vp(e.key, e.data, up.none());
  {
    let n = e.data,
      r = Rd.empty(),
      i = new Xu(mu.comparator);
    for (let e of t.fields)
      if (!i.has(e)) {
        let t = n.field(e);
        (t === null && e.length > 1 && ((e = e.popLast()), (t = n.field(e))),
          t === null ? r.delete(e) : r.set(e, t),
          (i = i.add(e)));
      }
    return new yp(e.key, r, new Qu(i.toArray()), up.none());
  }
}
function mp(e, t, n) {
  e instanceof vp
    ? (function (e, t, n) {
        let r = e.value.clone(),
          i = xp(e.fieldTransforms, t, n.transformResults);
        (r.setAll(i), t.convertToFoundDocument(n.version, r).setHasCommittedMutations());
      })(e, t, n)
    : e instanceof yp
      ? (function (e, t, n) {
          if (!dp(e.precondition, t)) return void t.convertToUnknownDocument(n.version);
          let r = xp(e.fieldTransforms, t, n.transformResults),
            i = t.data;
          (i.setAll(bp(e)),
            i.setAll(r),
            t.convertToFoundDocument(n.version, i).setHasCommittedMutations());
        })(e, t, n)
      : (function (e, t, n) {
          t.convertToNoDocument(n.version).setHasCommittedMutations();
        })(0, t, n);
}
function hp(e, t, n, r) {
  return e instanceof vp
    ? (function (e, t, n, r) {
        if (!dp(e.precondition, t)) return n;
        let i = e.value.clone(),
          a = Sp(e.fieldTransforms, r, t);
        return (i.setAll(a), t.convertToFoundDocument(t.version, i).setHasLocalMutations(), null);
      })(e, t, n, r)
    : e instanceof yp
      ? (function (e, t, n, r) {
          if (!dp(e.precondition, t)) return n;
          let i = Sp(e.fieldTransforms, r, t),
            a = t.data;
          return (
            a.setAll(bp(e)),
            a.setAll(i),
            t.convertToFoundDocument(t.version, a).setHasLocalMutations(),
            n === null
              ? null
              : n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e) => e.field))
          );
        })(e, t, n, r)
      : (function (e, t, n) {
          return dp(e.precondition, t)
            ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
            : n;
        })(e, t, n);
}
function gp(e, t) {
  let n = null;
  for (let r of e.fieldTransforms) {
    let e = t.data.field(r.field),
      i = Qf(r.transform, e || null);
    i != null && (n === null && (n = Rd.empty()), n.set(r.field, i));
  }
  return n || null;
}
function _p(e, t) {
  return (
    e.type === t.type &&
    !!e.key.isEqual(t.key) &&
    !!e.precondition.isEqual(t.precondition) &&
    !!(function (e, t) {
      return (e === void 0 && t === void 0) || (!(!e || !t) && uu(e, t, (e, t) => cp(e, t)));
    })(e.fieldTransforms, t.fieldTransforms) &&
    (e.type === 0
      ? e.value.isEqual(t.value)
      : e.type !== 1 || (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
  );
}
var vp = class extends fp {
    constructor(e, t, n, r = []) {
      (super(),
        (this.key = e),
        (this.value = t),
        (this.precondition = n),
        (this.fieldTransforms = r),
        (this.type = 0));
    }
    getFieldMask() {
      return null;
    }
  },
  yp = class extends fp {
    constructor(e, t, n, r, i = []) {
      (super(),
        (this.key = e),
        (this.data = t),
        (this.fieldMask = n),
        (this.precondition = r),
        (this.fieldTransforms = i),
        (this.type = 1));
    }
    getFieldMask() {
      return this.fieldMask;
    }
  };
function bp(e) {
  let t = new Map();
  return (
    e.fieldMask.fields.forEach((n) => {
      if (!n.isEmpty()) {
        let r = e.data.field(n);
        t.set(n, r);
      }
    }),
    t
  );
}
function xp(e, t, n) {
  let r = new Map();
  P(e.length === n.length, 32656, { Ve: n.length, de: e.length });
  for (let i = 0; i < n.length; i++) {
    let a = e[i],
      o = a.transform,
      s = t.data.field(a.field);
    r.set(a.field, Zf(o, s, n[i]));
  }
  return r;
}
function Sp(e, t, n) {
  let r = new Map();
  for (let i of e) {
    let e = i.transform,
      a = n.data.field(i.field);
    r.set(i.field, Xf(e, a, t));
  }
  return r;
}
var Cp = class extends fp {
    constructor(e, t) {
      (super(),
        (this.key = e),
        (this.precondition = t),
        (this.type = 2),
        (this.fieldTransforms = []));
    }
    getFieldMask() {
      return null;
    }
  },
  wp = class extends fp {
    constructor(e, t) {
      (super(),
        (this.key = e),
        (this.precondition = t),
        (this.type = 3),
        (this.fieldTransforms = []));
    }
    getFieldMask() {
      return null;
    }
  },
  Tp = class {
    constructor(e, t, n, r) {
      ((this.batchId = e),
        (this.localWriteTime = t),
        (this.baseMutations = n),
        (this.mutations = r));
    }
    applyToRemoteDocument(e, t) {
      let n = t.mutationResults;
      for (let t = 0; t < this.mutations.length; t++) {
        let r = this.mutations[t];
        r.key.isEqual(e.key) && mp(r, e, n[t]);
      }
    }
    applyToLocalView(e, t) {
      for (let n of this.baseMutations)
        n.key.isEqual(e.key) && (t = hp(n, e, t, this.localWriteTime));
      for (let n of this.mutations) n.key.isEqual(e.key) && (t = hp(n, e, t, this.localWriteTime));
      return t;
    }
    applyToLocalDocumentSet(e, t) {
      let n = Bf();
      return (
        this.mutations.forEach((r) => {
          let i = e.get(r.key),
            a = i.overlayedDocument,
            o = this.applyToLocalView(a, i.mutatedFields);
          o = t.has(r.key) ? null : o;
          let s = pp(a, o);
          (s !== null && n.set(r.key, s), a.isValidDocument() || a.convertToNoDocument(U.min()));
        }),
        n
      );
    }
    keys() {
      return this.mutations.reduce((e, t) => e.add(t.key), J());
    }
    isEqual(e) {
      return (
        this.batchId === e.batchId &&
        uu(this.mutations, e.mutations, (e, t) => _p(e, t)) &&
        uu(this.baseMutations, e.baseMutations, (e, t) => _p(e, t))
      );
    }
  },
  Ep = class e {
    constructor(e, t, n, r) {
      ((this.batch = e),
        (this.commitVersion = t),
        (this.mutationResults = n),
        (this.docVersions = r));
    }
    static from(t, n, r) {
      P(t.mutations.length === r.length, 58842, { me: t.mutations.length, fe: r.length });
      let i = (function () {
          return Hf;
        })(),
        a = t.mutations;
      for (let e = 0; e < a.length; e++) i = i.insert(a[e].key, r[e].version);
      return new e(t, n, r, i);
    }
  },
  Dp = class {
    constructor(e, t) {
      ((this.largestBatchId = e), (this.mutation = t));
    }
    getKey() {
      return this.mutation.key;
    }
    isEqual(e) {
      return e !== null && this.mutation === e.mutation;
    }
    toString() {
      return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
    }
  },
  Op = class {
    constructor(e, t) {
      ((this.count = e), (this.unchangedNames = t));
    }
  },
  Y,
  X;
function kp(e) {
  switch (e) {
    case I.OK:
      return N(64938);
    case I.CANCELLED:
    case I.UNKNOWN:
    case I.DEADLINE_EXCEEDED:
    case I.RESOURCE_EXHAUSTED:
    case I.INTERNAL:
    case I.UNAVAILABLE:
    case I.UNAUTHENTICATED:
      return !1;
    case I.INVALID_ARGUMENT:
    case I.NOT_FOUND:
    case I.ALREADY_EXISTS:
    case I.PERMISSION_DENIED:
    case I.FAILED_PRECONDITION:
    case I.ABORTED:
    case I.OUT_OF_RANGE:
    case I.UNIMPLEMENTED:
    case I.DATA_LOSS:
      return !0;
    default:
      return N(15467, { code: e });
  }
}
function Ap(e) {
  if (e === void 0) return (Gl(`GRPC error has no .code`), I.UNKNOWN);
  switch (e) {
    case Y.OK:
      return I.OK;
    case Y.CANCELLED:
      return I.CANCELLED;
    case Y.UNKNOWN:
      return I.UNKNOWN;
    case Y.DEADLINE_EXCEEDED:
      return I.DEADLINE_EXCEEDED;
    case Y.RESOURCE_EXHAUSTED:
      return I.RESOURCE_EXHAUSTED;
    case Y.INTERNAL:
      return I.INTERNAL;
    case Y.UNAVAILABLE:
      return I.UNAVAILABLE;
    case Y.UNAUTHENTICATED:
      return I.UNAUTHENTICATED;
    case Y.INVALID_ARGUMENT:
      return I.INVALID_ARGUMENT;
    case Y.NOT_FOUND:
      return I.NOT_FOUND;
    case Y.ALREADY_EXISTS:
      return I.ALREADY_EXISTS;
    case Y.PERMISSION_DENIED:
      return I.PERMISSION_DENIED;
    case Y.FAILED_PRECONDITION:
      return I.FAILED_PRECONDITION;
    case Y.ABORTED:
      return I.ABORTED;
    case Y.OUT_OF_RANGE:
      return I.OUT_OF_RANGE;
    case Y.UNIMPLEMENTED:
      return I.UNIMPLEMENTED;
    case Y.DATA_LOSS:
      return I.DATA_LOSS;
    default:
      return N(39323, { code: e });
  }
}
(((X = Y ||= {})[(X.OK = 0)] = `OK`),
  (X[(X.CANCELLED = 1)] = `CANCELLED`),
  (X[(X.UNKNOWN = 2)] = `UNKNOWN`),
  (X[(X.INVALID_ARGUMENT = 3)] = `INVALID_ARGUMENT`),
  (X[(X.DEADLINE_EXCEEDED = 4)] = `DEADLINE_EXCEEDED`),
  (X[(X.NOT_FOUND = 5)] = `NOT_FOUND`),
  (X[(X.ALREADY_EXISTS = 6)] = `ALREADY_EXISTS`),
  (X[(X.PERMISSION_DENIED = 7)] = `PERMISSION_DENIED`),
  (X[(X.UNAUTHENTICATED = 16)] = `UNAUTHENTICATED`),
  (X[(X.RESOURCE_EXHAUSTED = 8)] = `RESOURCE_EXHAUSTED`),
  (X[(X.FAILED_PRECONDITION = 9)] = `FAILED_PRECONDITION`),
  (X[(X.ABORTED = 10)] = `ABORTED`),
  (X[(X.OUT_OF_RANGE = 11)] = `OUT_OF_RANGE`),
  (X[(X.UNIMPLEMENTED = 12)] = `UNIMPLEMENTED`),
  (X[(X.INTERNAL = 13)] = `INTERNAL`),
  (X[(X.UNAVAILABLE = 14)] = `UNAVAILABLE`),
  (X[(X.DATA_LOSS = 15)] = `DATA_LOSS`));
var jp = null;
function Mp() {
  return new TextEncoder();
}
var Np = new Ol([4294967295, 4294967295], 0);
function Pp(e) {
  let t = Mp().encode(e),
    n = new kl();
  return (n.update(t), new Uint8Array(n.digest()));
}
function Fp(e) {
  let t = new DataView(e.buffer),
    n = t.getUint32(0, !0),
    r = t.getUint32(4, !0),
    i = t.getUint32(8, !0),
    a = t.getUint32(12, !0);
  return [new Ol([n, r], 0), new Ol([i, a], 0)];
}
var Ip = class e {
    constructor(e, t, n) {
      if (((this.bitmap = e), (this.padding = t), (this.hashCount = n), t < 0 || t >= 8))
        throw new Lp(`Invalid padding: ${t}`);
      if (n < 0 || (e.length > 0 && this.hashCount === 0)) throw new Lp(`Invalid hash count: ${n}`);
      if (e.length === 0 && t !== 0) throw new Lp(`Invalid padding when bitmap length is 0: ${t}`);
      ((this.ge = 8 * e.length - t), (this.pe = Ol.fromNumber(this.ge)));
    }
    ye(e, t, n) {
      let r = e.add(t.multiply(Ol.fromNumber(n)));
      return (
        r.compare(Np) === 1 && (r = new Ol([r.getBits(0), r.getBits(1)], 0)),
        r.modulo(this.pe).toNumber()
      );
    }
    we(e) {
      return !!(this.bitmap[Math.floor(e / 8)] & (1 << (e % 8)));
    }
    mightContain(e) {
      if (this.ge === 0) return !1;
      let [t, n] = Fp(Pp(e));
      for (let e = 0; e < this.hashCount; e++) {
        let r = this.ye(t, n, e);
        if (!this.we(r)) return !1;
      }
      return !0;
    }
    static create(t, n, r) {
      let i = t % 8 == 0 ? 0 : 8 - (t % 8),
        a = new e(new Uint8Array(Math.ceil(t / 8)), i, n);
      return (r.forEach((e) => a.insert(e)), a);
    }
    insert(e) {
      if (this.ge === 0) return;
      let [t, n] = Fp(Pp(e));
      for (let e = 0; e < this.hashCount; e++) {
        let r = this.ye(t, n, e);
        this.be(r);
      }
    }
    be(e) {
      let t = Math.floor(e / 8),
        n = e % 8;
      this.bitmap[t] |= 1 << n;
    }
  },
  Lp = class extends Error {
    constructor() {
      (super(...arguments), (this.name = `BloomFilterError`));
    }
  },
  Rp = class e {
    constructor(e, t, n, r, i) {
      ((this.snapshotVersion = e),
        (this.targetChanges = t),
        (this.targetMismatches = n),
        (this.documentUpdates = r),
        (this.resolvedLimboDocuments = i));
    }
    static createSynthesizedRemoteEventForCurrentChange(t, n, r) {
      let i = new Map();
      return (
        i.set(t, zp.createSynthesizedTargetChangeForCurrentChange(t, n, r)),
        new e(U.min(), i, new G(R), Ff(), J())
      );
    }
  },
  zp = class e {
    constructor(e, t, n, r, i) {
      ((this.resumeToken = e),
        (this.current = t),
        (this.addedDocuments = n),
        (this.modifiedDocuments = r),
        (this.removedDocuments = i));
    }
    static createSynthesizedTargetChangeForCurrentChange(t, n, r) {
      return new e(r, n, J(), J(), J());
    }
  },
  Bp = class {
    constructor(e, t, n, r) {
      ((this.Se = e), (this.removedTargetIds = t), (this.key = n), (this.De = r));
    }
  },
  Vp = class {
    constructor(e, t) {
      ((this.targetId = e), (this.Ce = t));
    }
  },
  Hp = class {
    constructor(e, t, n = ed.EMPTY_BYTE_STRING, r = null) {
      ((this.state = e), (this.targetIds = t), (this.resumeToken = n), (this.cause = r));
    }
  },
  Up = class {
    constructor() {
      ((this.ve = 0),
        (this.Fe = Kp()),
        (this.Me = ed.EMPTY_BYTE_STRING),
        (this.xe = !1),
        (this.Oe = !0));
    }
    get current() {
      return this.xe;
    }
    get resumeToken() {
      return this.Me;
    }
    get Ne() {
      return this.ve !== 0;
    }
    get Be() {
      return this.Oe;
    }
    Le(e) {
      e.approximateByteSize() > 0 && ((this.Oe = !0), (this.Me = e));
    }
    ke() {
      let e = J(),
        t = J(),
        n = J();
      return (
        this.Fe.forEach((r, i) => {
          switch (i) {
            case 0:
              e = e.add(r);
              break;
            case 2:
              t = t.add(r);
              break;
            case 1:
              n = n.add(r);
              break;
            default:
              N(38017, { changeType: i });
          }
        }),
        new zp(this.Me, this.xe, e, t, n)
      );
    }
    Ke() {
      ((this.Oe = !1), (this.Fe = Kp()));
    }
    qe(e, t) {
      ((this.Oe = !0), (this.Fe = this.Fe.insert(e, t)));
    }
    Ue(e) {
      ((this.Oe = !0), (this.Fe = this.Fe.remove(e)));
    }
    $e() {
      this.ve += 1;
    }
    We() {
      (--this.ve, P(this.ve >= 0, 3241, { ve: this.ve }));
    }
    Qe() {
      ((this.Oe = !0), (this.xe = !0));
    }
  },
  Wp = class {
    constructor(e) {
      ((this.Ge = e),
        (this.ze = new Map()),
        (this.je = Ff()),
        (this.He = Gp()),
        (this.Je = Gp()),
        (this.Ze = new G(R)));
    }
    Xe(e) {
      for (let t of e.Se)
        e.De && e.De.isFoundDocument() ? this.Ye(t, e.De) : this.et(t, e.key, e.De);
      for (let t of e.removedTargetIds) this.et(t, e.key, e.De);
    }
    tt(e) {
      this.forEachTarget(e, (t) => {
        let n = this.nt(t);
        switch (e.state) {
          case 0:
            this.rt(t) && n.Le(e.resumeToken);
            break;
          case 1:
            (n.We(), n.Ne || n.Ke(), n.Le(e.resumeToken));
            break;
          case 2:
            (n.We(), n.Ne || this.removeTarget(t));
            break;
          case 3:
            this.rt(t) && (n.Qe(), n.Le(e.resumeToken));
            break;
          case 4:
            this.rt(t) && (this.it(t), n.Le(e.resumeToken));
            break;
          default:
            N(56790, { state: e.state });
        }
      });
    }
    forEachTarget(e, t) {
      e.targetIds.length > 0
        ? e.targetIds.forEach(t)
        : this.ze.forEach((e, n) => {
            this.rt(n) && t(n);
          });
    }
    st(e) {
      let t = e.targetId,
        n = e.Ce.count,
        r = this.ot(t);
      if (r) {
        let i = r.target;
        if (pf(i))
          if (n === 0) {
            let e = new B(i.path);
            this.et(t, e, Bd.newNoDocument(e, U.min()));
          } else P(n === 1, 20013, { expectedCount: n });
        else {
          let r = this._t(t);
          if (r !== n) {
            let n = this.ut(e),
              i = n ? this.ct(n, e, r) : 1;
            if (i !== 0) {
              this.it(t);
              let e =
                i === 2
                  ? `TargetPurposeExistenceFilterMismatchBloom`
                  : `TargetPurposeExistenceFilterMismatch`;
              this.Ze = this.Ze.insert(t, e);
            }
            jp?.lt(
              (function (e, t, n, r, i) {
                let a = {
                    localCacheCount: e,
                    existenceFilterCount: t.count,
                    databaseId: n.database,
                    projectId: n.projectId,
                  },
                  o = t.unchangedNames;
                return (
                  o &&
                    (a.bloomFilter = {
                      applied: i === 0,
                      hashCount: o?.hashCount ?? 0,
                      bitmapLength: o?.bits?.bitmap?.length ?? 0,
                      padding: o?.bits?.padding ?? 0,
                      mightContain: (e) => r?.mightContain(e) ?? !1,
                    }),
                  a
                );
              })(r, e.Ce, this.Ge.ht(), n, i)
            );
          }
        }
      }
    }
    ut(e) {
      let t = e.Ce.unchangedNames;
      if (!t || !t.bits) return null;
      let {
          bits: { bitmap: n = ``, padding: r = 0 },
          hashCount: i = 0,
        } = t,
        a,
        o;
      try {
        a = rd(n).toUint8Array();
      } catch (e) {
        if (e instanceof $u)
          return (
            Kl(
              `Decoding the base64 bloom filter in existence filter failed (` +
                e.message +
                `); ignoring the bloom filter and falling back to full re-query.`
            ),
            null
          );
        throw e;
      }
      try {
        o = new Ip(a, r, i);
      } catch (e) {
        return (
          Kl(e instanceof Lp ? `BloomFilter error: ` : `Applying bloom filter failed: `, e),
          null
        );
      }
      return o.ge === 0 ? null : o;
    }
    ct(e, t, n) {
      return t.Ce.count === n - this.Pt(e, t.targetId) ? 0 : 2;
    }
    Pt(e, t) {
      let n = this.Ge.getRemoteKeysForTarget(t),
        r = 0;
      return (
        n.forEach((n) => {
          let i = this.Ge.ht(),
            a = `projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;
          e.mightContain(a) || (this.et(t, n, null), r++);
        }),
        r
      );
    }
    Tt(e) {
      let t = new Map();
      this.ze.forEach((n, r) => {
        let i = this.ot(r);
        if (i) {
          if (n.current && pf(i.target)) {
            let t = new B(i.target.path);
            this.It(t).has(r) || this.Et(r, t) || this.et(r, t, Bd.newNoDocument(t, e));
          }
          n.Be && (t.set(r, n.ke()), n.Ke());
        }
      });
      let n = J();
      (this.Je.forEach((e, t) => {
        let r = !0;
        (t.forEachWhile((e) => {
          let t = this.ot(e);
          return !t || t.purpose === `TargetPurposeLimboResolution` || ((r = !1), !1);
        }),
          r && (n = n.add(e)));
      }),
        this.je.forEach((t, n) => n.setReadTime(e)));
      let r = new Rp(e, t, this.Ze, this.je, n);
      return ((this.je = Ff()), (this.He = Gp()), (this.Je = Gp()), (this.Ze = new G(R)), r);
    }
    Ye(e, t) {
      if (!this.rt(e)) return;
      let n = this.Et(e, t.key) ? 2 : 0;
      (this.nt(e).qe(t.key, n),
        (this.je = this.je.insert(t.key, t)),
        (this.He = this.He.insert(t.key, this.It(t.key).add(e))),
        (this.Je = this.Je.insert(t.key, this.Rt(t.key).add(e))));
    }
    et(e, t, n) {
      if (!this.rt(e)) return;
      let r = this.nt(e);
      (this.Et(e, t) ? r.qe(t, 1) : r.Ue(t),
        (this.Je = this.Je.insert(t, this.Rt(t).delete(e))),
        (this.Je = this.Je.insert(t, this.Rt(t).add(e))),
        n && (this.je = this.je.insert(t, n)));
    }
    removeTarget(e) {
      this.ze.delete(e);
    }
    _t(e) {
      let t = this.nt(e).ke();
      return (
        this.Ge.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size
      );
    }
    $e(e) {
      this.nt(e).$e();
    }
    nt(e) {
      let t = this.ze.get(e);
      return (t || ((t = new Up()), this.ze.set(e, t)), t);
    }
    Rt(e) {
      let t = this.Je.get(e);
      return (t || ((t = new Xu(R)), (this.Je = this.Je.insert(e, t))), t);
    }
    It(e) {
      let t = this.He.get(e);
      return (t || ((t = new Xu(R)), (this.He = this.He.insert(e, t))), t);
    }
    rt(e) {
      let t = this.ot(e) !== null;
      return (t || M(`WatchChangeAggregator`, `Detected inactive target`, e), t);
    }
    ot(e) {
      let t = this.ze.get(e);
      return t && t.Ne ? null : this.Ge.At(e);
    }
    it(e) {
      (this.ze.set(e, new Up()),
        this.Ge.getRemoteKeysForTarget(e).forEach((t) => {
          this.et(e, t, null);
        }));
    }
    Et(e, t) {
      return this.Ge.getRemoteKeysForTarget(e).has(t);
    }
  };
function Gp() {
  return new G(B.comparator);
}
function Kp() {
  return new G(B.comparator);
}
var qp = (() => ({ asc: `ASCENDING`, desc: `DESCENDING` }))(),
  Jp = (() => ({
    "<": `LESS_THAN`,
    "<=": `LESS_THAN_OR_EQUAL`,
    ">": `GREATER_THAN`,
    ">=": `GREATER_THAN_OR_EQUAL`,
    "==": `EQUAL`,
    "!=": `NOT_EQUAL`,
    "array-contains": `ARRAY_CONTAINS`,
    in: `IN`,
    "not-in": `NOT_IN`,
    "array-contains-any": `ARRAY_CONTAINS_ANY`,
  }))(),
  Yp = (() => ({ and: `AND`, or: `OR` }))(),
  Xp = class {
    constructor(e, t) {
      ((this.databaseId = e), (this.useProto3Json = t));
    }
  };
function Zp(e, t) {
  return e.useProto3Json || Ru(t) ? t : { value: t };
}
function Qp(e, t) {
  return e.useProto3Json
    ? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, ``).replace(`Z`, ``)}.${(`000000000` + t.nanoseconds).slice(-9)}Z`
    : { seconds: `` + t.seconds, nanos: t.nanoseconds };
}
function $p(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array();
}
function em(e, t) {
  return Qp(e, t.toTimestamp());
}
function tm(e) {
  return (
    P(!!e, 49232),
    U.fromTimestamp(
      (function (e) {
        let t = nd(e);
        return new H(t.seconds, t.nanos);
      })(e)
    )
  );
}
function nm(e, t) {
  return rm(e, t).canonicalString();
}
function rm(e, t) {
  let n = (function (e) {
    return new z([`projects`, e.projectId, `databases`, e.database]);
  })(e).child(`documents`);
  return t === void 0 ? n : n.child(t);
}
function im(e) {
  let t = z.fromString(e);
  return (P(Dm(t), 10190, { key: t.toString() }), t);
}
function am(e, t) {
  return nm(e.databaseId, t.path);
}
function om(e, t) {
  let n = im(t);
  if (n.get(1) !== e.databaseId.projectId)
    throw new L(
      I.INVALID_ARGUMENT,
      `Tried to deserialize key from different project: ` +
        n.get(1) +
        ` vs ` +
        e.databaseId.projectId
    );
  if (n.get(3) !== e.databaseId.database)
    throw new L(
      I.INVALID_ARGUMENT,
      `Tried to deserialize key from different database: ` +
        n.get(3) +
        ` vs ` +
        e.databaseId.database
    );
  return new B(um(n));
}
function sm(e, t) {
  return nm(e.databaseId, t);
}
function cm(e) {
  let t = im(e);
  return t.length === 4 ? z.emptyPath() : um(t);
}
function lm(e) {
  return new z([
    `projects`,
    e.databaseId.projectId,
    `databases`,
    e.databaseId.database,
  ]).canonicalString();
}
function um(e) {
  return (P(e.length > 4 && e.get(4) === `documents`, 29091, { key: e.toString() }), e.popFirst(5));
}
function dm(e, t, n) {
  return { name: am(e, t), fields: n.value.mapValue.fields };
}
function fm(e, t) {
  let n;
  if (`targetChange` in t) {
    t.targetChange;
    let r = (function (e) {
        return e === `NO_CHANGE`
          ? 0
          : e === `ADD`
            ? 1
            : e === `REMOVE`
              ? 2
              : e === `CURRENT`
                ? 3
                : e === `RESET`
                  ? 4
                  : N(39313, { state: e });
      })(t.targetChange.targetChangeType || `NO_CHANGE`),
      i = t.targetChange.targetIds || [],
      a = (function (e, t) {
        return e.useProto3Json
          ? (P(t === void 0 || typeof t == `string`, 58123), ed.fromBase64String(t || ``))
          : (P(t === void 0 || t instanceof Buffer || t instanceof Uint8Array, 16193),
            ed.fromUint8Array(t || new Uint8Array()));
      })(e, t.targetChange.resumeToken),
      o = t.targetChange.cause;
    n = new Hp(
      r,
      i,
      a,
      (o &&
        (function (e) {
          return new L(e.code === void 0 ? I.UNKNOWN : Ap(e.code), e.message || ``);
        })(o)) ||
        null
    );
  } else if (`documentChange` in t) {
    t.documentChange;
    let r = t.documentChange;
    (r.document, r.document.name, r.document.updateTime);
    let i = om(e, r.document.name),
      a = tm(r.document.updateTime),
      o = r.document.createTime ? tm(r.document.createTime) : U.min(),
      s = new Rd({ mapValue: { fields: r.document.fields } }),
      c = Bd.newFoundDocument(i, a, o, s);
    n = new Bp(r.targetIds || [], r.removedTargetIds || [], c.key, c);
  } else if (`documentDelete` in t) {
    t.documentDelete;
    let r = t.documentDelete;
    r.document;
    let i = om(e, r.document),
      a = r.readTime ? tm(r.readTime) : U.min(),
      o = Bd.newNoDocument(i, a);
    n = new Bp([], r.removedTargetIds || [], o.key, o);
  } else if (`documentRemove` in t) {
    t.documentRemove;
    let r = t.documentRemove;
    r.document;
    let i = om(e, r.document);
    n = new Bp([], r.removedTargetIds || [], i, null);
  } else {
    if (!(`filter` in t)) return N(11601, { Vt: t });
    {
      t.filter;
      let e = t.filter;
      e.targetId;
      let { count: r = 0, unchangedNames: i } = e,
        a = new Op(r, i),
        o = e.targetId;
      n = new Vp(o, a);
    }
  }
  return n;
}
function pm(e, t) {
  let n;
  if (t instanceof vp) n = { update: dm(e, t.key, t.value) };
  else if (t instanceof Cp) n = { delete: am(e, t.key) };
  else if (t instanceof yp) n = { update: dm(e, t.key, t.data), updateMask: Em(t.fieldMask) };
  else {
    if (!(t instanceof wp)) return N(16599, { dt: t.type });
    n = { verify: am(e, t.key) };
  }
  return (
    t.fieldTransforms.length > 0 &&
      (n.updateTransforms = t.fieldTransforms.map((e) =>
        (function (e, t) {
          let n = t.transform;
          if (n instanceof $f)
            return { fieldPath: t.field.canonicalString(), setToServerValue: `REQUEST_TIME` };
          if (n instanceof ep)
            return {
              fieldPath: t.field.canonicalString(),
              appendMissingElements: { values: n.elements },
            };
          if (n instanceof np)
            return {
              fieldPath: t.field.canonicalString(),
              removeAllFromArray: { values: n.elements },
            };
          if (n instanceof ip) return { fieldPath: t.field.canonicalString(), increment: n.Ae };
          throw N(20930, { transform: t.transform });
        })(0, e)
      )),
    t.precondition.isNone ||
      (n.currentDocument = (function (e, t) {
        return t.updateTime === void 0
          ? t.exists === void 0
            ? N(27497)
            : { exists: t.exists }
          : { updateTime: em(e, t.updateTime) };
      })(e, t.precondition)),
    n
  );
}
function mm(e, t) {
  return e && e.length > 0
    ? (P(t !== void 0, 14353),
      e.map((e) =>
        (function (e, t) {
          let n = e.updateTime ? tm(e.updateTime) : tm(t);
          return (n.isEqual(U.min()) && (n = tm(t)), new lp(n, e.transformResults || []));
        })(e, t)
      ))
    : [];
}
function hm(e, t) {
  return { documents: [sm(e, t.path)] };
}
function gm(e, t) {
  let n = { structuredQuery: {} },
    r = t.path,
    i;
  (t.collectionGroup === null
    ? ((i = r.popLast()), (n.structuredQuery.from = [{ collectionId: r.lastSegment() }]))
    : ((i = r),
      (n.structuredQuery.from = [{ collectionId: t.collectionGroup, allDescendants: !0 }])),
    (n.parent = sm(e, i)));
  let a = (function (e) {
    if (e.length !== 0) return Tm(qd.create(e, `and`));
  })(t.filters);
  a && (n.structuredQuery.where = a);
  let o = (function (e) {
    if (e.length !== 0)
      return e.map((e) =>
        (function (e) {
          return { field: Cm(e.field), direction: bm(e.dir) };
        })(e)
      );
  })(t.orderBy);
  o && (n.structuredQuery.orderBy = o);
  let s = Zp(e, t.limit);
  return (
    s !== null && (n.structuredQuery.limit = s),
    t.startAt &&
      (n.structuredQuery.startAt = (function (e) {
        return { before: e.inclusive, values: e.position };
      })(t.startAt)),
    t.endAt &&
      (n.structuredQuery.endAt = (function (e) {
        return { before: !e.inclusive, values: e.position };
      })(t.endAt)),
    { ft: n, parent: i }
  );
}
function _m(e) {
  let t = cm(e.parent),
    n = e.structuredQuery,
    r = n.from ? n.from.length : 0,
    i = null;
  if (r > 0) {
    P(r === 1, 65062);
    let e = n.from[0];
    e.allDescendants ? (i = e.collectionId) : (t = t.child(e.collectionId));
  }
  let a = [];
  n.where &&
    (a = (function (e) {
      let t = ym(e);
      return t instanceof qd && Yd(t) ? t.getFilters() : [t];
    })(n.where));
  let o = [];
  n.orderBy &&
    (o = (function (e) {
      return e.map((e) =>
        (function (e) {
          return new Wd(
            wm(e.field),
            (function (e) {
              switch (e) {
                case `ASCENDING`:
                  return `asc`;
                case `DESCENDING`:
                  return `desc`;
                default:
                  return;
              }
            })(e.direction)
          );
        })(e)
      );
    })(n.orderBy));
  let s = null;
  n.limit &&
    (s = (function (e) {
      let t;
      return ((t = typeof e == `object` ? e.value : e), Ru(t) ? null : t);
    })(n.limit));
  let c = null;
  n.startAt &&
    (c = (function (e) {
      let t = !!e.before;
      return new Vd(e.values || [], t);
    })(n.startAt));
  let l = null;
  return (
    n.endAt &&
      (l = (function (e) {
        let t = !e.before;
        return new Vd(e.values || [], t);
      })(n.endAt)),
    hf(t, i, o, a, s, `F`, c, l)
  );
}
function vm(e, t) {
  let n = (function (e) {
    switch (e) {
      case `TargetPurposeListen`:
        return null;
      case `TargetPurposeExistenceFilterMismatch`:
        return `existence-filter-mismatch`;
      case `TargetPurposeExistenceFilterMismatchBloom`:
        return `existence-filter-mismatch-bloom`;
      case `TargetPurposeLimboResolution`:
        return `limbo-document`;
      default:
        return N(28987, { purpose: e });
    }
  })(t.purpose);
  return n == null ? null : { "goog-listen-tags": n };
}
function ym(e) {
  return e.unaryFilter === void 0
    ? e.fieldFilter === void 0
      ? e.compositeFilter === void 0
        ? N(30097, { filter: e })
        : (function (e) {
            return qd.create(
              e.compositeFilter.filters.map((e) => ym(e)),
              (function (e) {
                switch (e) {
                  case `AND`:
                    return `and`;
                  case `OR`:
                    return `or`;
                  default:
                    return N(1026);
                }
              })(e.compositeFilter.op)
            );
          })(e)
      : (function (e) {
          return q.create(
            wm(e.fieldFilter.field),
            (function (e) {
              switch (e) {
                case `EQUAL`:
                  return `==`;
                case `NOT_EQUAL`:
                  return `!=`;
                case `GREATER_THAN`:
                  return `>`;
                case `GREATER_THAN_OR_EQUAL`:
                  return `>=`;
                case `LESS_THAN`:
                  return `<`;
                case `LESS_THAN_OR_EQUAL`:
                  return `<=`;
                case `ARRAY_CONTAINS`:
                  return `array-contains`;
                case `IN`:
                  return `in`;
                case `NOT_IN`:
                  return `not-in`;
                case `ARRAY_CONTAINS_ANY`:
                  return `array-contains-any`;
                case `OPERATOR_UNSPECIFIED`:
                  return N(58110);
                default:
                  return N(50506);
              }
            })(e.fieldFilter.op),
            e.fieldFilter.value
          );
        })(e)
    : (function (e) {
        switch (e.unaryFilter.op) {
          case `IS_NAN`:
            let t = wm(e.unaryFilter.field);
            return q.create(t, `==`, { doubleValue: NaN });
          case `IS_NULL`:
            let n = wm(e.unaryFilter.field);
            return q.create(n, `==`, { nullValue: `NULL_VALUE` });
          case `IS_NOT_NAN`:
            let r = wm(e.unaryFilter.field);
            return q.create(r, `!=`, { doubleValue: NaN });
          case `IS_NOT_NULL`:
            let i = wm(e.unaryFilter.field);
            return q.create(i, `!=`, { nullValue: `NULL_VALUE` });
          case `OPERATOR_UNSPECIFIED`:
            return N(61313);
          default:
            return N(60726);
        }
      })(e);
}
function bm(e) {
  return qp[e];
}
function xm(e) {
  return Jp[e];
}
function Sm(e) {
  return Yp[e];
}
function Cm(e) {
  return { fieldPath: e.canonicalString() };
}
function wm(e) {
  return mu.fromServerFormat(e.fieldPath);
}
function Tm(e) {
  return e instanceof q
    ? (function (e) {
        if (e.op === `==`) {
          if (Nd(e.value)) return { unaryFilter: { field: Cm(e.field), op: `IS_NAN` } };
          if (Md(e.value)) return { unaryFilter: { field: Cm(e.field), op: `IS_NULL` } };
        } else if (e.op === `!=`) {
          if (Nd(e.value)) return { unaryFilter: { field: Cm(e.field), op: `IS_NOT_NAN` } };
          if (Md(e.value)) return { unaryFilter: { field: Cm(e.field), op: `IS_NOT_NULL` } };
        }
        return { fieldFilter: { field: Cm(e.field), op: xm(e.op), value: e.value } };
      })(e)
    : e instanceof qd
      ? (function (e) {
          let t = e.getFilters().map((e) => Tm(e));
          return t.length === 1 ? t[0] : { compositeFilter: { op: Sm(e.op), filters: t } };
        })(e)
      : N(54877, { filter: e });
}
function Em(e) {
  let t = [];
  return (e.fields.forEach((e) => t.push(e.canonicalString())), { fieldPaths: t });
}
function Dm(e) {
  return e.length >= 4 && e.get(0) === `projects` && e.get(2) === `databases`;
}
function Om(e) {
  return !!e && typeof e._toProto == `function` && e._protoValueType === `ProtoValue`;
}
var km = class e {
    constructor(e, t, n, r, i = U.min(), a = U.min(), o = ed.EMPTY_BYTE_STRING, s = null) {
      ((this.target = e),
        (this.targetId = t),
        (this.purpose = n),
        (this.sequenceNumber = r),
        (this.snapshotVersion = i),
        (this.lastLimboFreeSnapshotVersion = a),
        (this.resumeToken = o),
        (this.expectedCount = s));
    }
    withSequenceNumber(t) {
      return new e(
        this.target,
        this.targetId,
        this.purpose,
        t,
        this.snapshotVersion,
        this.lastLimboFreeSnapshotVersion,
        this.resumeToken,
        this.expectedCount
      );
    }
    withResumeToken(t, n) {
      return new e(
        this.target,
        this.targetId,
        this.purpose,
        this.sequenceNumber,
        n,
        this.lastLimboFreeSnapshotVersion,
        t,
        null
      );
    }
    withExpectedCount(t) {
      return new e(
        this.target,
        this.targetId,
        this.purpose,
        this.sequenceNumber,
        this.snapshotVersion,
        this.lastLimboFreeSnapshotVersion,
        this.resumeToken,
        t
      );
    }
    withLastLimboFreeSnapshotVersion(t) {
      return new e(
        this.target,
        this.targetId,
        this.purpose,
        this.sequenceNumber,
        this.snapshotVersion,
        t,
        this.resumeToken,
        this.expectedCount
      );
    }
  },
  Am = class {
    constructor(e) {
      this.yt = e;
    }
  };
function jm(e) {
  let t = _m({ parent: e.parent, structuredQuery: e.structuredQuery });
  return e.limitType === `LAST` ? Tf(t, t.limit, `L`) : t;
}
var Mm = class {
  constructor() {}
  Dt(e, t) {
    (this.Ct(e, t), t.vt());
  }
  Ct(e, t) {
    if (`nullValue` in e) this.Ft(t, 5);
    else if (`booleanValue` in e) (this.Ft(t, 10), t.Mt(e.booleanValue ? 1 : 0));
    else if (`integerValue` in e) (this.Ft(t, 15), t.Mt(K(e.integerValue)));
    else if (`doubleValue` in e) {
      let n = K(e.doubleValue);
      isNaN(n) ? this.Ft(t, 13) : (this.Ft(t, 15), zu(n) ? t.Mt(0) : t.Mt(n));
    } else if (`timestampValue` in e) {
      let n = e.timestampValue;
      (this.Ft(t, 20),
        typeof n == `string` && (n = nd(n)),
        t.xt(`${n.seconds || ``}`),
        t.Mt(n.nanos || 0));
    } else if (`stringValue` in e) (this.Ot(e.stringValue, t), this.Nt(t));
    else if (`bytesValue` in e) (this.Ft(t, 30), t.Bt(rd(e.bytesValue)), this.Nt(t));
    else if (`referenceValue` in e) this.Lt(e.referenceValue, t);
    else if (`geoPointValue` in e) {
      let n = e.geoPointValue;
      (this.Ft(t, 45), t.Mt(n.latitude || 0), t.Mt(n.longitude || 0));
    } else
      `mapValue` in e
        ? Ld(e)
          ? this.Ft(t, 2 ** 53 - 1)
          : Fd(e)
            ? this.kt(e.mapValue, t)
            : (this.Kt(e.mapValue, t), this.Nt(t))
        : `arrayValue` in e
          ? (this.qt(e.arrayValue, t), this.Nt(t))
          : N(19022, { Ut: e });
  }
  Ot(e, t) {
    (this.Ft(t, 25), this.$t(e, t));
  }
  $t(e, t) {
    t.xt(e);
  }
  Kt(e, t) {
    let n = e.fields || {};
    this.Ft(t, 55);
    for (let e of Object.keys(n)) (this.Ot(e, t), this.Ct(n[e], t));
  }
  kt(e, t) {
    let n = e.fields || {};
    this.Ft(t, 53);
    let r = yd,
      i = n[r].arrayValue?.values?.length || 0;
    (this.Ft(t, 15), t.Mt(K(i)), this.Ot(r, t), this.Ct(n[r], t));
  }
  qt(e, t) {
    let n = e.values || [];
    this.Ft(t, 50);
    for (let e of n) this.Ct(e, t);
  }
  Lt(e, t) {
    (this.Ft(t, 37),
      B.fromName(e).path.forEach((e) => {
        (this.Ft(t, 60), this.$t(e, t));
      }));
  }
  Ft(e, t) {
    e.Mt(t);
  }
  Nt(e) {
    e.Mt(2);
  }
};
Mm.Wt = new Mm();
var Nm = class {
    constructor() {
      this.Sn = new Pm();
    }
    addToCollectionParentIndex(e, t) {
      return (this.Sn.add(t), W.resolve());
    }
    getCollectionParents(e, t) {
      return W.resolve(this.Sn.getEntries(t));
    }
    addFieldIndex(e, t) {
      return W.resolve();
    }
    deleteFieldIndex(e, t) {
      return W.resolve();
    }
    deleteAllFieldIndexes(e) {
      return W.resolve();
    }
    createTargetIndexes(e, t) {
      return W.resolve();
    }
    getDocumentsMatchingTarget(e, t) {
      return W.resolve(null);
    }
    getIndexType(e, t) {
      return W.resolve(0);
    }
    getFieldIndexes(e, t) {
      return W.resolve([]);
    }
    getNextCollectionGroupToUpdate(e) {
      return W.resolve(null);
    }
    getMinOffset(e, t) {
      return W.resolve(ku.min());
    }
    getMinOffsetFromCollectionGroup(e, t) {
      return W.resolve(ku.min());
    }
    updateCollectionGroup(e, t, n) {
      return W.resolve();
    }
    updateIndexEntries(e, t) {
      return W.resolve();
    }
  },
  Pm = class {
    constructor() {
      this.index = {};
    }
    add(e) {
      let t = e.lastSegment(),
        n = e.popLast(),
        r = this.index[t] || new Xu(z.comparator),
        i = !r.has(n);
      return ((this.index[t] = r.add(n)), i);
    }
    has(e) {
      let t = e.lastSegment(),
        n = e.popLast(),
        r = this.index[t];
      return r && r.has(n);
    }
    getEntries(e) {
      return (this.index[e] || new Xu(z.comparator)).toArray();
    }
  };
new Uint8Array();
var Fm = { didRun: !1, sequenceNumbersCollected: 0, targetsRemoved: 0, documentsRemoved: 0 },
  Im = 41943040,
  Lm = class e {
    static withCacheSize(t) {
      return new e(t, e.DEFAULT_COLLECTION_PERCENTILE, e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }
    constructor(e, t, n) {
      ((this.cacheSizeCollectionThreshold = e),
        (this.percentileToCollect = t),
        (this.maximumSequenceNumbersToCollect = n));
    }
  };
((Lm.DEFAULT_COLLECTION_PERCENTILE = 10),
  (Lm.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
  (Lm.DEFAULT = new Lm(
    Im,
    Lm.DEFAULT_COLLECTION_PERCENTILE,
    Lm.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
  )),
  (Lm.DISABLED = new Lm(-1, 0, 0)));
var Rm = class e {
    constructor(e) {
      this.sr = e;
    }
    next() {
      return ((this.sr += 2), this.sr);
    }
    static _r() {
      return new e(0);
    }
    static ar() {
      return new e(-1);
    }
  },
  zm = `LruGarbageCollector`,
  Bm = 1048576;
function Vm([e, t], [n, r]) {
  let i = R(e, n);
  return i === 0 ? R(t, r) : i;
}
var Hm = class {
    constructor(e) {
      ((this.Pr = e), (this.buffer = new Xu(Vm)), (this.Tr = 0));
    }
    Ir() {
      return ++this.Tr;
    }
    Er(e) {
      let t = [e, this.Ir()];
      if (this.buffer.size < this.Pr) this.buffer = this.buffer.add(t);
      else {
        let e = this.buffer.last();
        Vm(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
      }
    }
    get maxValue() {
      return this.buffer.last()[0];
    }
  },
  Um = class {
    constructor(e, t, n) {
      ((this.garbageCollector = e), (this.asyncQueue = t), (this.localStore = n), (this.Rr = null));
    }
    start() {
      this.garbageCollector.params.cacheSizeCollectionThreshold !== -1 && this.Ar(6e4);
    }
    stop() {
      this.Rr &&= (this.Rr.cancel(), null);
    }
    get started() {
      return this.Rr !== null;
    }
    Ar(e) {
      (M(zm, `Garbage collection scheduled in ${e}ms`),
        (this.Rr = this.asyncQueue.enqueueAfterDelay(`lru_garbage_collection`, e, async () => {
          this.Rr = null;
          try {
            await this.localStore.collectGarbage(this.garbageCollector);
          } catch (e) {
            Fu(e) ? M(zm, `Ignoring IndexedDB error during garbage collection: `, e) : await Nu(e);
          }
          await this.Ar(3e5);
        })));
    }
  },
  Wm = class {
    constructor(e, t) {
      ((this.Vr = e), (this.params = t));
    }
    calculateTargetCount(e, t) {
      return this.Vr.dr(e).next((e) => Math.floor((t / 100) * e));
    }
    nthSequenceNumber(e, t) {
      if (t === 0) return W.resolve(Iu.ce);
      let n = new Hm(t);
      return this.Vr.forEachTarget(e, (e) => n.Er(e.sequenceNumber))
        .next(() => this.Vr.mr(e, (e) => n.Er(e)))
        .next(() => n.maxValue);
    }
    removeTargets(e, t, n) {
      return this.Vr.removeTargets(e, t, n);
    }
    removeOrphanedDocuments(e, t) {
      return this.Vr.removeOrphanedDocuments(e, t);
    }
    collect(e, t) {
      return this.params.cacheSizeCollectionThreshold === -1
        ? (M(`LruGarbageCollector`, `Garbage collection skipped; disabled`), W.resolve(Fm))
        : this.getCacheSize(e).next((n) =>
            n < this.params.cacheSizeCollectionThreshold
              ? (M(
                  `LruGarbageCollector`,
                  `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
                ),
                Fm)
              : this.gr(e, t)
          );
    }
    getCacheSize(e) {
      return this.Vr.getCacheSize(e);
    }
    gr(e, t) {
      let n,
        r,
        i,
        a,
        o,
        s,
        c,
        l = Date.now();
      return this.calculateTargetCount(e, this.params.percentileToCollect)
        .next(
          (t) => (
            t > this.params.maximumSequenceNumbersToCollect
              ? (M(
                  `LruGarbageCollector`,
                  `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`
                ),
                (r = this.params.maximumSequenceNumbersToCollect))
              : (r = t),
            (a = Date.now()),
            this.nthSequenceNumber(e, r)
          )
        )
        .next((r) => ((n = r), (o = Date.now()), this.removeTargets(e, n, t)))
        .next((t) => ((i = t), (s = Date.now()), this.removeOrphanedDocuments(e, n)))
        .next(
          (e) => (
            (c = Date.now()),
            Wl() <= x.DEBUG &&
              M(
                `LruGarbageCollector`,
                `LRU Garbage Collection\n\tCounted targets in ${a - l}ms\n\tDetermined least recently used ${r} in ` +
                  (o - a) +
                  `ms
\tRemoved ${i} targets in ` +
                  (s - o) +
                  `ms
\tRemoved ${e} documents in ` +
                  (c - s) +
                  `ms
Total Duration: ${c - l}ms`
              ),
            W.resolve({
              didRun: !0,
              sequenceNumbersCollected: r,
              targetsRemoved: i,
              documentsRemoved: e,
            })
          )
        );
    }
  };
function Gm(e, t) {
  return new Wm(e, t);
}
var Km = class {
    constructor() {
      ((this.changes = new Nf(
        (e) => e.toString(),
        (e, t) => e.isEqual(t)
      )),
        (this.changesApplied = !1));
    }
    addEntry(e) {
      (this.assertNotApplied(), this.changes.set(e.key, e));
    }
    removeEntry(e, t) {
      (this.assertNotApplied(), this.changes.set(e, Bd.newInvalidDocument(e).setReadTime(t)));
    }
    getEntry(e, t) {
      this.assertNotApplied();
      let n = this.changes.get(t);
      return n === void 0 ? this.getFromCache(e, t) : W.resolve(n);
    }
    getEntries(e, t) {
      return this.getAllFromCache(e, t);
    }
    apply(e) {
      return (this.assertNotApplied(), (this.changesApplied = !0), this.applyChanges(e));
    }
    assertNotApplied() {}
  },
  qm = class {
    constructor(e, t) {
      ((this.overlayedDocument = e), (this.mutatedFields = t));
    }
  },
  Jm = class {
    constructor(e, t, n, r) {
      ((this.remoteDocumentCache = e),
        (this.mutationQueue = t),
        (this.documentOverlayCache = n),
        (this.indexManager = r));
    }
    getDocument(e, t) {
      let n = null;
      return this.documentOverlayCache
        .getOverlay(e, t)
        .next((r) => ((n = r), this.remoteDocumentCache.getEntry(e, t)))
        .next((e) => (n !== null && hp(n.mutation, e, Qu.empty(), H.now()), e));
    }
    getDocuments(e, t) {
      return this.remoteDocumentCache
        .getEntries(e, t)
        .next((t) => this.getLocalViewOfDocuments(e, t, J()).next(() => t));
    }
    getLocalViewOfDocuments(e, t, n = J()) {
      let r = zf();
      return this.populateOverlays(e, r, t).next(() =>
        this.computeViews(e, t, r, n).next((e) => {
          let t = Lf();
          return (
            e.forEach((e, n) => {
              t = t.insert(e, n.overlayedDocument);
            }),
            t
          );
        })
      );
    }
    getOverlayedDocuments(e, t) {
      let n = zf();
      return this.populateOverlays(e, n, t).next(() => this.computeViews(e, t, n, J()));
    }
    populateOverlays(e, t, n) {
      let r = [];
      return (
        n.forEach((e) => {
          t.has(e) || r.push(e);
        }),
        this.documentOverlayCache.getOverlays(e, r).next((e) => {
          e.forEach((e, n) => {
            t.set(e, n);
          });
        })
      );
    }
    computeViews(e, t, n, r) {
      let i = Ff(),
        a = Vf(),
        o = (function () {
          return Vf();
        })();
      return (
        t.forEach((e, t) => {
          let o = n.get(t.key);
          r.has(t.key) && (o === void 0 || o.mutation instanceof yp)
            ? (i = i.insert(t.key, t))
            : o === void 0
              ? a.set(t.key, Qu.empty())
              : (a.set(t.key, o.mutation.getFieldMask()),
                hp(o.mutation, t, o.mutation.getFieldMask(), H.now()));
        }),
        this.recalculateAndSaveOverlays(e, i).next(
          (e) => (
            e.forEach((e, t) => a.set(e, t)),
            t.forEach((e, t) => o.set(e, new qm(t, a.get(e) ?? null))),
            o
          )
        )
      );
    }
    recalculateAndSaveOverlays(e, t) {
      let n = Vf(),
        r = new G((e, t) => e - t),
        i = J();
      return this.mutationQueue
        .getAllMutationBatchesAffectingDocumentKeys(e, t)
        .next((e) => {
          for (let i of e)
            i.keys().forEach((e) => {
              let a = t.get(e);
              if (a === null) return;
              let o = n.get(e) || Qu.empty();
              ((o = i.applyToLocalView(a, o)), n.set(e, o));
              let s = (r.get(i.batchId) || J()).add(e);
              r = r.insert(i.batchId, s);
            });
        })
        .next(() => {
          let a = [],
            o = r.getReverseIterator();
          for (; o.hasNext(); ) {
            let r = o.getNext(),
              s = r.key,
              c = r.value,
              l = Bf();
            (c.forEach((e) => {
              if (!i.has(e)) {
                let r = pp(t.get(e), n.get(e));
                (r !== null && l.set(e, r), (i = i.add(e)));
              }
            }),
              a.push(this.documentOverlayCache.saveOverlays(e, s, l)));
          }
          return W.waitFor(a);
        })
        .next(() => n);
    }
    recalculateAndSaveOverlaysForDocumentKeys(e, t) {
      return this.remoteDocumentCache
        .getEntries(e, t)
        .next((t) => this.recalculateAndSaveOverlays(e, t));
    }
    getDocumentsMatchingQuery(e, t, n, r) {
      return vf(t)
        ? this.getDocumentsMatchingDocumentQuery(e, t.path)
        : yf(t)
          ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r)
          : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
    }
    getNextDocuments(e, t, n, r) {
      return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r).next((i) => {
        let a =
            r - i.size > 0
              ? this.documentOverlayCache.getOverlaysForCollectionGroup(
                  e,
                  t,
                  n.largestBatchId,
                  r - i.size
                )
              : W.resolve(zf()),
          o = Tu,
          s = i;
        return a.next((t) =>
          W.forEach(
            t,
            (t, n) => (
              o < n.largestBatchId && (o = n.largestBatchId),
              i.get(t)
                ? W.resolve()
                : this.remoteDocumentCache.getEntry(e, t).next((e) => {
                    s = s.insert(t, e);
                  })
            )
          )
            .next(() => this.populateOverlays(e, t, i))
            .next(() => this.computeViews(e, s, t, J()))
            .next((e) => ({ batchId: o, changes: Rf(e) }))
        );
      });
    }
    getDocumentsMatchingDocumentQuery(e, t) {
      return this.getDocument(e, new B(t)).next((e) => {
        let t = Lf();
        return (e.isFoundDocument() && (t = t.insert(e.key, e)), t);
      });
    }
    getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
      let i = t.collectionGroup,
        a = Lf();
      return this.indexManager.getCollectionParents(e, i).next((o) =>
        W.forEach(o, (o) => {
          let s = (function (e, t) {
            return new mf(
              t,
              null,
              e.explicitOrderBy.slice(),
              e.filters.slice(),
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            );
          })(t, o.child(i));
          return this.getDocumentsMatchingCollectionQuery(e, s, n, r).next((e) => {
            e.forEach((e, t) => {
              a = a.insert(e, t);
            });
          });
        }).next(() => a)
      );
    }
    getDocumentsMatchingCollectionQuery(e, t, n, r) {
      let i;
      return this.documentOverlayCache
        .getOverlaysForCollection(e, t.path, n.largestBatchId)
        .next((a) => ((i = a), this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r)))
        .next((e) => {
          i.forEach((t, n) => {
            let r = n.getKey();
            e.get(r) === null && (e = e.insert(r, Bd.newInvalidDocument(r)));
          });
          let n = Lf();
          return (
            e.forEach((e, r) => {
              let a = i.get(e);
              (a !== void 0 && hp(a.mutation, r, Qu.empty(), H.now()),
                kf(t, r) && (n = n.insert(e, r)));
            }),
            n
          );
        });
    }
  },
  Ym = class {
    constructor(e) {
      ((this.serializer = e), (this.Nr = new Map()), (this.Br = new Map()));
    }
    getBundleMetadata(e, t) {
      return W.resolve(this.Nr.get(t));
    }
    saveBundleMetadata(e, t) {
      return (
        this.Nr.set(
          t.id,
          (function (e) {
            return { id: e.id, version: e.version, createTime: tm(e.createTime) };
          })(t)
        ),
        W.resolve()
      );
    }
    getNamedQuery(e, t) {
      return W.resolve(this.Br.get(t));
    }
    saveNamedQuery(e, t) {
      return (
        this.Br.set(
          t.name,
          (function (e) {
            return { name: e.name, query: jm(e.bundledQuery), readTime: tm(e.readTime) };
          })(t)
        ),
        W.resolve()
      );
    }
  },
  Xm = class {
    constructor() {
      ((this.overlays = new G(B.comparator)), (this.Lr = new Map()));
    }
    getOverlay(e, t) {
      return W.resolve(this.overlays.get(t));
    }
    getOverlays(e, t) {
      let n = zf();
      return W.forEach(t, (t) =>
        this.getOverlay(e, t).next((e) => {
          e !== null && n.set(t, e);
        })
      ).next(() => n);
    }
    saveOverlays(e, t, n) {
      return (
        n.forEach((n, r) => {
          this.bt(e, t, r);
        }),
        W.resolve()
      );
    }
    removeOverlaysForBatchId(e, t, n) {
      let r = this.Lr.get(n);
      return (
        r !== void 0 &&
          (r.forEach((e) => (this.overlays = this.overlays.remove(e))), this.Lr.delete(n)),
        W.resolve()
      );
    }
    getOverlaysForCollection(e, t, n) {
      let r = zf(),
        i = t.length + 1,
        a = new B(t.child(``)),
        o = this.overlays.getIteratorFrom(a);
      for (; o.hasNext(); ) {
        let e = o.getNext().value,
          a = e.getKey();
        if (!t.isPrefixOf(a.path)) break;
        a.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e);
      }
      return W.resolve(r);
    }
    getOverlaysForCollectionGroup(e, t, n, r) {
      let i = new G((e, t) => e - t),
        a = this.overlays.getIterator();
      for (; a.hasNext(); ) {
        let e = a.getNext().value;
        if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
          let t = i.get(e.largestBatchId);
          (t === null && ((t = zf()), (i = i.insert(e.largestBatchId, t))), t.set(e.getKey(), e));
        }
      }
      let o = zf(),
        s = i.getIterator();
      for (; s.hasNext() && (s.getNext().value.forEach((e, t) => o.set(e, t)), !(o.size() >= r)); );
      return W.resolve(o);
    }
    bt(e, t, n) {
      let r = this.overlays.get(n.key);
      if (r !== null) {
        let e = this.Lr.get(r.largestBatchId).delete(n.key);
        this.Lr.set(r.largestBatchId, e);
      }
      this.overlays = this.overlays.insert(n.key, new Dp(t, n));
      let i = this.Lr.get(t);
      (i === void 0 && ((i = J()), this.Lr.set(t, i)), this.Lr.set(t, i.add(n.key)));
    }
  },
  Zm = class {
    constructor() {
      this.sessionToken = ed.EMPTY_BYTE_STRING;
    }
    getSessionToken(e) {
      return W.resolve(this.sessionToken);
    }
    setSessionToken(e, t) {
      return ((this.sessionToken = t), W.resolve());
    }
  },
  Qm = class {
    constructor() {
      ((this.kr = new Xu(Z.Kr)), (this.qr = new Xu(Z.Ur)));
    }
    isEmpty() {
      return this.kr.isEmpty();
    }
    addReference(e, t) {
      let n = new Z(e, t);
      ((this.kr = this.kr.add(n)), (this.qr = this.qr.add(n)));
    }
    $r(e, t) {
      e.forEach((e) => this.addReference(e, t));
    }
    removeReference(e, t) {
      this.Wr(new Z(e, t));
    }
    Qr(e, t) {
      e.forEach((e) => this.removeReference(e, t));
    }
    Gr(e) {
      let t = new B(new z([])),
        n = new Z(t, e),
        r = new Z(t, e + 1),
        i = [];
      return (
        this.qr.forEachInRange([n, r], (e) => {
          (this.Wr(e), i.push(e.key));
        }),
        i
      );
    }
    zr() {
      this.kr.forEach((e) => this.Wr(e));
    }
    Wr(e) {
      ((this.kr = this.kr.delete(e)), (this.qr = this.qr.delete(e)));
    }
    jr(e) {
      let t = new B(new z([])),
        n = new Z(t, e),
        r = new Z(t, e + 1),
        i = J();
      return (
        this.qr.forEachInRange([n, r], (e) => {
          i = i.add(e.key);
        }),
        i
      );
    }
    containsKey(e) {
      let t = new Z(e, 0),
        n = this.kr.firstAfterOrEqual(t);
      return n !== null && e.isEqual(n.key);
    }
  },
  Z = class {
    constructor(e, t) {
      ((this.key = e), (this.Hr = t));
    }
    static Kr(e, t) {
      return B.comparator(e.key, t.key) || R(e.Hr, t.Hr);
    }
    static Ur(e, t) {
      return R(e.Hr, t.Hr) || B.comparator(e.key, t.key);
    }
  },
  $m = class {
    constructor(e, t) {
      ((this.indexManager = e),
        (this.referenceDelegate = t),
        (this.mutationQueue = []),
        (this.Yn = 1),
        (this.Jr = new Xu(Z.Kr)));
    }
    checkEmpty(e) {
      return W.resolve(this.mutationQueue.length === 0);
    }
    addMutationBatch(e, t, n, r) {
      let i = this.Yn;
      (this.Yn++,
        this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1]);
      let a = new Tp(i, t, n, r);
      this.mutationQueue.push(a);
      for (let t of r)
        ((this.Jr = this.Jr.add(new Z(t.key, i))),
          this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast()));
      return W.resolve(a);
    }
    lookupMutationBatch(e, t) {
      return W.resolve(this.Zr(t));
    }
    getNextMutationBatchAfterBatchId(e, t) {
      let n = t + 1,
        r = this.Xr(n),
        i = r < 0 ? 0 : r;
      return W.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
    }
    getHighestUnacknowledgedBatchId() {
      return W.resolve(this.mutationQueue.length === 0 ? Lu : this.Yn - 1);
    }
    getAllMutationBatches(e) {
      return W.resolve(this.mutationQueue.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(e, t) {
      let n = new Z(t, 0),
        r = new Z(t, 1 / 0),
        i = [];
      return (
        this.Jr.forEachInRange([n, r], (e) => {
          let t = this.Zr(e.Hr);
          i.push(t);
        }),
        W.resolve(i)
      );
    }
    getAllMutationBatchesAffectingDocumentKeys(e, t) {
      let n = new Xu(R);
      return (
        t.forEach((e) => {
          let t = new Z(e, 0),
            r = new Z(e, 1 / 0);
          this.Jr.forEachInRange([t, r], (e) => {
            n = n.add(e.Hr);
          });
        }),
        W.resolve(this.Yr(n))
      );
    }
    getAllMutationBatchesAffectingQuery(e, t) {
      let n = t.path,
        r = n.length + 1,
        i = n;
      B.isDocumentKey(i) || (i = i.child(``));
      let a = new Z(new B(i), 0),
        o = new Xu(R);
      return (
        this.Jr.forEachWhile((e) => {
          let t = e.key.path;
          return !!n.isPrefixOf(t) && (t.length === r && (o = o.add(e.Hr)), !0);
        }, a),
        W.resolve(this.Yr(o))
      );
    }
    Yr(e) {
      let t = [];
      return (
        e.forEach((e) => {
          let n = this.Zr(e);
          n !== null && t.push(n);
        }),
        t
      );
    }
    removeMutationBatch(e, t) {
      (P(this.ei(t.batchId, `removed`) === 0, 55003), this.mutationQueue.shift());
      let n = this.Jr;
      return W.forEach(t.mutations, (r) => {
        let i = new Z(r.key, t.batchId);
        return ((n = n.delete(i)), this.referenceDelegate.markPotentiallyOrphaned(e, r.key));
      }).next(() => {
        this.Jr = n;
      });
    }
    nr(e) {}
    containsKey(e, t) {
      let n = new Z(t, 0),
        r = this.Jr.firstAfterOrEqual(n);
      return W.resolve(t.isEqual(r && r.key));
    }
    performConsistencyCheck(e) {
      return (this.mutationQueue.length, W.resolve());
    }
    ei(e, t) {
      return this.Xr(e);
    }
    Xr(e) {
      return this.mutationQueue.length === 0 ? 0 : e - this.mutationQueue[0].batchId;
    }
    Zr(e) {
      let t = this.Xr(e);
      return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t];
    }
  },
  eh = class {
    constructor(e) {
      ((this.ti = e),
        (this.docs = (function () {
          return new G(B.comparator);
        })()),
        (this.size = 0));
    }
    setIndexManager(e) {
      this.indexManager = e;
    }
    addEntry(e, t) {
      let n = t.key,
        r = this.docs.get(n),
        i = r ? r.size : 0,
        a = this.ti(t);
      return (
        (this.docs = this.docs.insert(n, { document: t.mutableCopy(), size: a })),
        (this.size += a - i),
        this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
      );
    }
    removeEntry(e) {
      let t = this.docs.get(e);
      t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
    }
    getEntry(e, t) {
      let n = this.docs.get(t);
      return W.resolve(n ? n.document.mutableCopy() : Bd.newInvalidDocument(t));
    }
    getEntries(e, t) {
      let n = Ff();
      return (
        t.forEach((e) => {
          let t = this.docs.get(e);
          n = n.insert(e, t ? t.document.mutableCopy() : Bd.newInvalidDocument(e));
        }),
        W.resolve(n)
      );
    }
    getDocumentsMatchingQuery(e, t, n, r) {
      let i = Ff(),
        a = t.path,
        o = new B(a.child(`__id-9223372036854775808__`)),
        s = this.docs.getIteratorFrom(o);
      for (; s.hasNext(); ) {
        let {
          key: e,
          value: { document: o },
        } = s.getNext();
        if (!a.isPrefixOf(e.path)) break;
        e.path.length > a.length + 1 ||
          Au(Ou(o), n) <= 0 ||
          ((r.has(o.key) || kf(t, o)) && (i = i.insert(o.key, o.mutableCopy())));
      }
      return W.resolve(i);
    }
    getAllFromCollectionGroup(e, t, n, r) {
      N(9500);
    }
    ni(e, t) {
      return W.forEach(this.docs, (e) => t(e));
    }
    newChangeBuffer(e) {
      return new th(this);
    }
    getSize(e) {
      return W.resolve(this.size);
    }
  },
  th = class extends Km {
    constructor(e) {
      (super(), (this.Mr = e));
    }
    applyChanges(e) {
      let t = [];
      return (
        this.changes.forEach((n, r) => {
          r.isValidDocument() ? t.push(this.Mr.addEntry(e, r)) : this.Mr.removeEntry(n);
        }),
        W.waitFor(t)
      );
    }
    getFromCache(e, t) {
      return this.Mr.getEntry(e, t);
    }
    getAllFromCache(e, t) {
      return this.Mr.getEntries(e, t);
    }
  },
  nh = class {
    constructor(e) {
      ((this.persistence = e),
        (this.ri = new Nf((e) => df(e), ff)),
        (this.lastRemoteSnapshotVersion = U.min()),
        (this.highestTargetId = 0),
        (this.ii = 0),
        (this.si = new Qm()),
        (this.targetCount = 0),
        (this.oi = Rm._r()));
    }
    forEachTarget(e, t) {
      return (this.ri.forEach((e, n) => t(n)), W.resolve());
    }
    getLastRemoteSnapshotVersion(e) {
      return W.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(e) {
      return W.resolve(this.ii);
    }
    allocateTargetId(e) {
      return ((this.highestTargetId = this.oi.next()), W.resolve(this.highestTargetId));
    }
    setTargetsMetadata(e, t, n) {
      return (n && (this.lastRemoteSnapshotVersion = n), t > this.ii && (this.ii = t), W.resolve());
    }
    lr(e) {
      this.ri.set(e.target, e);
      let t = e.targetId;
      (t > this.highestTargetId && ((this.oi = new Rm(t)), (this.highestTargetId = t)),
        e.sequenceNumber > this.ii && (this.ii = e.sequenceNumber));
    }
    addTargetData(e, t) {
      return (this.lr(t), (this.targetCount += 1), W.resolve());
    }
    updateTargetData(e, t) {
      return (this.lr(t), W.resolve());
    }
    removeTargetData(e, t) {
      return (this.ri.delete(t.target), this.si.Gr(t.targetId), --this.targetCount, W.resolve());
    }
    removeTargets(e, t, n) {
      let r = 0,
        i = [];
      return (
        this.ri.forEach((a, o) => {
          o.sequenceNumber <= t &&
            n.get(o.targetId) === null &&
            (this.ri.delete(a), i.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r++);
        }),
        W.waitFor(i).next(() => r)
      );
    }
    getTargetCount(e) {
      return W.resolve(this.targetCount);
    }
    getTargetData(e, t) {
      let n = this.ri.get(t) || null;
      return W.resolve(n);
    }
    addMatchingKeys(e, t, n) {
      return (this.si.$r(t, n), W.resolve());
    }
    removeMatchingKeys(e, t, n) {
      this.si.Qr(t, n);
      let r = this.persistence.referenceDelegate,
        i = [];
      return (
        r &&
          t.forEach((t) => {
            i.push(r.markPotentiallyOrphaned(e, t));
          }),
        W.waitFor(i)
      );
    }
    removeMatchingKeysForTargetId(e, t) {
      return (this.si.Gr(t), W.resolve());
    }
    getMatchingKeysForTargetId(e, t) {
      let n = this.si.jr(t);
      return W.resolve(n);
    }
    containsKey(e, t) {
      return W.resolve(this.si.containsKey(t));
    }
  },
  rh = class {
    constructor(e, t) {
      ((this._i = {}),
        (this.overlays = {}),
        (this.ai = new Iu(0)),
        (this.ui = !1),
        (this.ui = !0),
        (this.ci = new Zm()),
        (this.referenceDelegate = e(this)),
        (this.li = new nh(this)),
        (this.indexManager = new Nm()),
        (this.remoteDocumentCache = (function (e) {
          return new eh(e);
        })((e) => this.referenceDelegate.hi(e))),
        (this.serializer = new Am(t)),
        (this.Pi = new Ym(this.serializer)));
    }
    start() {
      return Promise.resolve();
    }
    shutdown() {
      return ((this.ui = !1), Promise.resolve());
    }
    get started() {
      return this.ui;
    }
    setDatabaseDeletedListener() {}
    setNetworkEnabled() {}
    getIndexManager(e) {
      return this.indexManager;
    }
    getDocumentOverlayCache(e) {
      let t = this.overlays[e.toKey()];
      return (t || ((t = new Xm()), (this.overlays[e.toKey()] = t)), t);
    }
    getMutationQueue(e, t) {
      let n = this._i[e.toKey()];
      return (n || ((n = new $m(t, this.referenceDelegate)), (this._i[e.toKey()] = n)), n);
    }
    getGlobalsCache() {
      return this.ci;
    }
    getTargetCache() {
      return this.li;
    }
    getRemoteDocumentCache() {
      return this.remoteDocumentCache;
    }
    getBundleCache() {
      return this.Pi;
    }
    runTransaction(e, t, n) {
      M(`MemoryPersistence`, `Starting transaction:`, e);
      let r = new ih(this.ai.next());
      return (
        this.referenceDelegate.Ti(),
        n(r)
          .next((e) => this.referenceDelegate.Ii(r).next(() => e))
          .toPromise()
          .then((e) => (r.raiseOnCommittedEvent(), e))
      );
    }
    Ei(e, t) {
      return W.or(Object.values(this._i).map((n) => () => n.containsKey(e, t)));
    }
  },
  ih = class extends Mu {
    constructor(e) {
      (super(), (this.currentSequenceNumber = e));
    }
  },
  ah = class e {
    constructor(e) {
      ((this.persistence = e), (this.Ri = new Qm()), (this.Ai = null));
    }
    static Vi(t) {
      return new e(t);
    }
    get di() {
      if (this.Ai) return this.Ai;
      throw N(60996);
    }
    addReference(e, t, n) {
      return (this.Ri.addReference(n, t), this.di.delete(n.toString()), W.resolve());
    }
    removeReference(e, t, n) {
      return (this.Ri.removeReference(n, t), this.di.add(n.toString()), W.resolve());
    }
    markPotentiallyOrphaned(e, t) {
      return (this.di.add(t.toString()), W.resolve());
    }
    removeTarget(e, t) {
      this.Ri.Gr(t.targetId).forEach((e) => this.di.add(e.toString()));
      let n = this.persistence.getTargetCache();
      return n
        .getMatchingKeysForTargetId(e, t.targetId)
        .next((e) => {
          e.forEach((e) => this.di.add(e.toString()));
        })
        .next(() => n.removeTargetData(e, t));
    }
    Ti() {
      this.Ai = new Set();
    }
    Ii(e) {
      let t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
      return W.forEach(this.di, (n) => {
        let r = B.fromPath(n);
        return this.mi(e, r).next((e) => {
          e || t.removeEntry(r, U.min());
        });
      }).next(() => ((this.Ai = null), t.apply(e)));
    }
    updateLimboDocument(e, t) {
      return this.mi(e, t).next((e) => {
        e ? this.di.delete(t.toString()) : this.di.add(t.toString());
      });
    }
    hi(e) {
      return 0;
    }
    mi(e, t) {
      return W.or([
        () => W.resolve(this.Ri.containsKey(t)),
        () => this.persistence.getTargetCache().containsKey(e, t),
        () => this.persistence.Ei(e, t),
      ]);
    }
  },
  oh = class e {
    constructor(e, t) {
      ((this.persistence = e),
        (this.fi = new Nf(
          (e) => Hu(e.path),
          (e, t) => e.isEqual(t)
        )),
        (this.garbageCollector = Gm(this, t)));
    }
    static Vi(t, n) {
      return new e(t, n);
    }
    Ti() {}
    Ii(e) {
      return W.resolve();
    }
    forEachTarget(e, t) {
      return this.persistence.getTargetCache().forEachTarget(e, t);
    }
    dr(e) {
      let t = this.pr(e);
      return this.persistence
        .getTargetCache()
        .getTargetCount(e)
        .next((e) => t.next((t) => e + t));
    }
    pr(e) {
      let t = 0;
      return this.mr(e, (e) => {
        t++;
      }).next(() => t);
    }
    mr(e, t) {
      return W.forEach(this.fi, (n, r) => this.wr(e, n, r).next((e) => (e ? W.resolve() : t(r))));
    }
    removeTargets(e, t, n) {
      return this.persistence.getTargetCache().removeTargets(e, t, n);
    }
    removeOrphanedDocuments(e, t) {
      let n = 0,
        r = this.persistence.getRemoteDocumentCache(),
        i = r.newChangeBuffer();
      return r
        .ni(e, (r) =>
          this.wr(e, r, t).next((e) => {
            e || (n++, i.removeEntry(r, U.min()));
          })
        )
        .next(() => i.apply(e))
        .next(() => n);
    }
    markPotentiallyOrphaned(e, t) {
      return (this.fi.set(t, e.currentSequenceNumber), W.resolve());
    }
    removeTarget(e, t) {
      let n = t.withSequenceNumber(e.currentSequenceNumber);
      return this.persistence.getTargetCache().updateTargetData(e, n);
    }
    addReference(e, t, n) {
      return (this.fi.set(n, e.currentSequenceNumber), W.resolve());
    }
    removeReference(e, t, n) {
      return (this.fi.set(n, e.currentSequenceNumber), W.resolve());
    }
    updateLimboDocument(e, t) {
      return (this.fi.set(t, e.currentSequenceNumber), W.resolve());
    }
    hi(e) {
      let t = e.key.toString().length;
      return (e.isFoundDocument() && (t += Od(e.data.value)), t);
    }
    wr(e, t, n) {
      return W.or([
        () => this.persistence.Ei(e, t),
        () => this.persistence.getTargetCache().containsKey(e, t),
        () => {
          let e = this.fi.get(t);
          return W.resolve(e !== void 0 && e > n);
        },
      ]);
    }
    getCacheSize(e) {
      return this.persistence.getRemoteDocumentCache().getSize(e);
    }
  },
  sh = class e {
    constructor(e, t, n, r) {
      ((this.targetId = e), (this.fromCache = t), (this.Ts = n), (this.Is = r));
    }
    static Es(t, n) {
      let r = J(),
        i = J();
      for (let e of n.docChanges)
        switch (e.type) {
          case 0:
            r = r.add(e.doc.key);
            break;
          case 1:
            i = i.add(e.doc.key);
        }
      return new e(t, n.fromCache, r, i);
    }
  },
  ch = class {
    constructor() {
      this._documentReadCount = 0;
    }
    get documentReadCount() {
      return this._documentReadCount;
    }
    incrementDocumentReadCount(e) {
      this._documentReadCount += e;
    }
  },
  lh = class {
    constructor() {
      ((this.Rs = !1),
        (this.As = !1),
        (this.Vs = 100),
        (this.ds = (function () {
          return me() ? 8 : Pu(_()) > 0 ? 6 : 4;
        })()));
    }
    initialize(e, t) {
      ((this.fs = e), (this.indexManager = t), (this.Rs = !0));
    }
    getDocumentsMatchingQuery(e, t, n, r) {
      let i = { result: null };
      return this.gs(e, t)
        .next((e) => {
          i.result = e;
        })
        .next(() => {
          if (!i.result)
            return this.ps(e, t, r, n).next((e) => {
              i.result = e;
            });
        })
        .next(() => {
          if (i.result) return;
          let n = new ch();
          return this.ys(e, t, n).next((r) => {
            if (((i.result = r), this.As)) return this.ws(e, t, n, r.size);
          });
        })
        .next(() => i.result);
    }
    ws(e, t, n, r) {
      return n.documentReadCount < this.Vs
        ? (Wl() <= x.DEBUG &&
            M(
              `QueryEngine`,
              `SDK will not create cache indexes for query:`,
              Of(t),
              `since it only creates cache indexes for collection contains`,
              `more than or equal to`,
              this.Vs,
              `documents`
            ),
          W.resolve())
        : (Wl() <= x.DEBUG &&
            M(
              `QueryEngine`,
              `Query:`,
              Of(t),
              `scans`,
              n.documentReadCount,
              `local documents and returns`,
              r,
              `documents as results.`
            ),
          n.documentReadCount > this.ds * r
            ? (Wl() <= x.DEBUG &&
                M(
                  `QueryEngine`,
                  `The SDK decides to create cache indexes for query:`,
                  Of(t),
                  `as using cache indexes may help improve performance.`
                ),
              this.indexManager.createTargetIndexes(e, xf(t)))
            : W.resolve());
    }
    gs(e, t) {
      if (_f(t)) return W.resolve(null);
      let n = xf(t);
      return this.indexManager.getIndexType(e, n).next((r) =>
        r === 0
          ? null
          : (t.limit !== null && r === 1 && ((t = Tf(t, null, `F`)), (n = xf(t))),
            this.indexManager.getDocumentsMatchingTarget(e, n).next((r) => {
              let i = J(...r);
              return this.fs.getDocuments(e, i).next((r) =>
                this.indexManager.getMinOffset(e, n).next((n) => {
                  let a = this.bs(t, r);
                  return this.Ss(t, a, i, n.readTime)
                    ? this.gs(e, Tf(t, null, `F`))
                    : this.Ds(e, a, t, n);
                })
              );
            }))
      );
    }
    ps(e, t, n, r) {
      return _f(t) || r.isEqual(U.min())
        ? W.resolve(null)
        : this.fs.getDocuments(e, n).next((i) => {
            let a = this.bs(t, i);
            return this.Ss(t, a, n, r)
              ? W.resolve(null)
              : (Wl() <= x.DEBUG &&
                  M(
                    `QueryEngine`,
                    `Re-using previous result from %s to execute query: %s`,
                    r.toString(),
                    Of(t)
                  ),
                this.Ds(e, a, t, Du(r, Tu)).next((e) => e));
          });
    }
    bs(e, t) {
      let n = new Xu(jf(e));
      return (
        t.forEach((t, r) => {
          kf(e, r) && (n = n.add(r));
        }),
        n
      );
    }
    Ss(e, t, n, r) {
      if (e.limit === null) return !1;
      if (n.size !== t.size) return !0;
      let i = e.limitType === `F` ? t.last() : t.first();
      return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
    }
    ys(e, t, n) {
      return (
        Wl() <= x.DEBUG && M(`QueryEngine`, `Using full collection scan to execute query:`, Of(t)),
        this.fs.getDocumentsMatchingQuery(e, t, ku.min(), n)
      );
    }
    Ds(e, t, n, r) {
      return this.fs.getDocumentsMatchingQuery(e, n, r).next(
        (e) => (
          t.forEach((t) => {
            e = e.insert(t.key, t);
          }),
          e
        )
      );
    }
  },
  uh = `LocalStore`,
  dh = 3e8,
  fh = class {
    constructor(e, t, n, r) {
      ((this.persistence = e),
        (this.Cs = t),
        (this.serializer = r),
        (this.vs = new G(R)),
        (this.Fs = new Nf((e) => df(e), ff)),
        (this.Ms = new Map()),
        (this.xs = e.getRemoteDocumentCache()),
        (this.li = e.getTargetCache()),
        (this.Pi = e.getBundleCache()),
        this.Os(n));
    }
    Os(e) {
      ((this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e)),
        (this.indexManager = this.persistence.getIndexManager(e)),
        (this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager)),
        (this.localDocuments = new Jm(
          this.xs,
          this.mutationQueue,
          this.documentOverlayCache,
          this.indexManager
        )),
        this.xs.setIndexManager(this.indexManager),
        this.Cs.initialize(this.localDocuments, this.indexManager));
    }
    collectGarbage(e) {
      return this.persistence.runTransaction(`Collect garbage`, `readwrite-primary`, (t) =>
        e.collect(t, this.vs)
      );
    }
  };
function ph(e, t, n, r) {
  return new fh(e, t, n, r);
}
async function mh(e, t) {
  let n = F(e);
  return await n.persistence.runTransaction(`Handle user change`, `readonly`, (e) => {
    let r;
    return n.mutationQueue
      .getAllMutationBatches(e)
      .next((i) => ((r = i), n.Os(t), n.mutationQueue.getAllMutationBatches(e)))
      .next((t) => {
        let i = [],
          a = [],
          o = J();
        for (let e of r) {
          i.push(e.batchId);
          for (let t of e.mutations) o = o.add(t.key);
        }
        for (let e of t) {
          a.push(e.batchId);
          for (let t of e.mutations) o = o.add(t.key);
        }
        return n.localDocuments
          .getDocuments(e, o)
          .next((e) => ({ Ns: e, removedBatchIds: i, addedBatchIds: a }));
      });
  });
}
function hh(e, t) {
  let n = F(e);
  return n.persistence.runTransaction(`Acknowledge batch`, `readwrite-primary`, (e) => {
    let r = t.batch.keys(),
      i = n.xs.newChangeBuffer({ trackRemovals: !0 });
    return (function (e, t, n, r) {
      let i = n.batch,
        a = i.keys(),
        o = W.resolve();
      return (
        a.forEach((e) => {
          o = o
            .next(() => r.getEntry(t, e))
            .next((t) => {
              let a = n.docVersions.get(e);
              (P(a !== null, 48541),
                t.version.compareTo(a) < 0 &&
                  (i.applyToRemoteDocument(t, n),
                  t.isValidDocument() && (t.setReadTime(n.commitVersion), r.addEntry(t))));
            });
        }),
        o.next(() => e.mutationQueue.removeMutationBatch(t, i))
      );
    })(n, e, t, i)
      .next(() => i.apply(e))
      .next(() => n.mutationQueue.performConsistencyCheck(e))
      .next(() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t.batch.batchId))
      .next(() =>
        n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
          e,
          (function (e) {
            let t = J();
            for (let n = 0; n < e.mutationResults.length; ++n)
              e.mutationResults[n].transformResults.length > 0 &&
                (t = t.add(e.batch.mutations[n].key));
            return t;
          })(t)
        )
      )
      .next(() => n.localDocuments.getDocuments(e, r));
  });
}
function gh(e) {
  let t = F(e);
  return t.persistence.runTransaction(`Get last remote snapshot version`, `readonly`, (e) =>
    t.li.getLastRemoteSnapshotVersion(e)
  );
}
function _h(e, t) {
  let n = F(e),
    r = t.snapshotVersion,
    i = n.vs;
  return n.persistence
    .runTransaction(`Apply remote event`, `readwrite-primary`, (e) => {
      let a = n.xs.newChangeBuffer({ trackRemovals: !0 });
      i = n.vs;
      let o = [];
      t.targetChanges.forEach((a, s) => {
        let c = i.get(s);
        if (!c) return;
        o.push(
          n.li
            .removeMatchingKeys(e, a.removedDocuments, s)
            .next(() => n.li.addMatchingKeys(e, a.addedDocuments, s))
        );
        let l = c.withSequenceNumber(e.currentSequenceNumber);
        (t.targetMismatches.get(s) === null
          ? a.resumeToken.approximateByteSize() > 0 && (l = l.withResumeToken(a.resumeToken, r))
          : (l = l
              .withResumeToken(ed.EMPTY_BYTE_STRING, U.min())
              .withLastLimboFreeSnapshotVersion(U.min())),
          (i = i.insert(s, l)),
          (function (e, t, n) {
            return e.resumeToken.approximateByteSize() === 0 ||
              t.snapshotVersion.toMicroseconds() - e.snapshotVersion.toMicroseconds() >= dh
              ? !0
              : n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0;
          })(c, l, a) && o.push(n.li.updateTargetData(e, l)));
      });
      let s = Ff(),
        c = J();
      if (
        (t.documentUpdates.forEach((r) => {
          t.resolvedLimboDocuments.has(r) &&
            o.push(n.persistence.referenceDelegate.updateLimboDocument(e, r));
        }),
        o.push(
          vh(e, a, t.documentUpdates).next((e) => {
            ((s = e.Bs), (c = e.Ls));
          })
        ),
        !r.isEqual(U.min()))
      ) {
        let t = n.li
          .getLastRemoteSnapshotVersion(e)
          .next((t) => n.li.setTargetsMetadata(e, e.currentSequenceNumber, r));
        o.push(t);
      }
      return W.waitFor(o)
        .next(() => a.apply(e))
        .next(() => n.localDocuments.getLocalViewOfDocuments(e, s, c))
        .next(() => s);
    })
    .then((e) => ((n.vs = i), e));
}
function vh(e, t, n) {
  let r = J(),
    i = J();
  return (
    n.forEach((e) => (r = r.add(e))),
    t.getEntries(e, r).next((e) => {
      let r = Ff();
      return (
        n.forEach((n, a) => {
          let o = e.get(n);
          (a.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n)),
            a.isNoDocument() && a.version.isEqual(U.min())
              ? (t.removeEntry(n, a.readTime), (r = r.insert(n, a)))
              : !o.isValidDocument() ||
                  a.version.compareTo(o.version) > 0 ||
                  (a.version.compareTo(o.version) === 0 && o.hasPendingWrites)
                ? (t.addEntry(a), (r = r.insert(n, a)))
                : M(
                    uh,
                    `Ignoring outdated watch update for `,
                    n,
                    `. Current version:`,
                    o.version,
                    ` Watch version:`,
                    a.version
                  ));
        }),
        { Bs: r, Ls: i }
      );
    })
  );
}
function yh(e, t) {
  let n = F(e);
  return n.persistence.runTransaction(
    `Get next mutation batch`,
    `readonly`,
    (e) => (t === void 0 && (t = Lu), n.mutationQueue.getNextMutationBatchAfterBatchId(e, t))
  );
}
function bh(e, t) {
  let n = F(e);
  return n.persistence
    .runTransaction(`Allocate target`, `readwrite`, (e) => {
      let r;
      return n.li
        .getTargetData(e, t)
        .next((i) =>
          i
            ? ((r = i), W.resolve(r))
            : n.li
                .allocateTargetId(e)
                .next(
                  (i) => (
                    (r = new km(t, i, `TargetPurposeListen`, e.currentSequenceNumber)),
                    n.li.addTargetData(e, r).next(() => r)
                  )
                )
        );
    })
    .then((e) => {
      let r = n.vs.get(e.targetId);
      return (
        (r === null || e.snapshotVersion.compareTo(r.snapshotVersion) > 0) &&
          ((n.vs = n.vs.insert(e.targetId, e)), n.Fs.set(t, e.targetId)),
        e
      );
    });
}
async function xh(e, t, n) {
  let r = F(e),
    i = r.vs.get(t),
    a = n ? `readwrite` : `readwrite-primary`;
  try {
    n ||
      (await r.persistence.runTransaction(`Release target`, a, (e) =>
        r.persistence.referenceDelegate.removeTarget(e, i)
      ));
  } catch (e) {
    if (!Fu(e)) throw e;
    M(uh, `Failed to update sequence numbers for target ${t}: ${e}`);
  }
  ((r.vs = r.vs.remove(t)), r.Fs.delete(i.target));
}
function Sh(e, t, n) {
  let r = F(e),
    i = U.min(),
    a = J();
  return r.persistence.runTransaction(`Execute query`, `readwrite`, (e) =>
    (function (e, t, n) {
      let r = F(e),
        i = r.Fs.get(n);
      return i === void 0 ? r.li.getTargetData(t, n) : W.resolve(r.vs.get(i));
    })(r, e, xf(t))
      .next((t) => {
        if (t)
          return (
            (i = t.lastLimboFreeSnapshotVersion),
            r.li.getMatchingKeysForTargetId(e, t.targetId).next((e) => {
              a = e;
            })
          );
      })
      .next(() => r.Cs.getDocumentsMatchingQuery(e, t, n ? i : U.min(), n ? a : J()))
      .next((e) => (Ch(r, Af(t), e), { documents: e, ks: a }))
  );
}
function Ch(e, t, n) {
  let r = e.Ms.get(t) || U.min();
  (n.forEach((e, t) => {
    t.readTime.compareTo(r) > 0 && (r = t.readTime);
  }),
    e.Ms.set(t, r));
}
var wh = class {
    constructor() {
      this.activeTargetIds = Gf();
    }
    Qs(e) {
      this.activeTargetIds = this.activeTargetIds.add(e);
    }
    Gs(e) {
      this.activeTargetIds = this.activeTargetIds.delete(e);
    }
    Ws() {
      let e = { activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now() };
      return JSON.stringify(e);
    }
  },
  Th = class {
    constructor() {
      ((this.vo = new wh()),
        (this.Fo = {}),
        (this.onlineStateHandler = null),
        (this.sequenceNumberHandler = null));
    }
    addPendingMutation(e) {}
    updateMutationState(e, t, n) {}
    addLocalQueryTarget(e, t = !0) {
      return (t && this.vo.Qs(e), this.Fo[e] || `not-current`);
    }
    updateQueryState(e, t, n) {
      this.Fo[e] = t;
    }
    removeLocalQueryTarget(e) {
      this.vo.Gs(e);
    }
    isLocalQueryTarget(e) {
      return this.vo.activeTargetIds.has(e);
    }
    clearQueryState(e) {
      delete this.Fo[e];
    }
    getAllActiveQueryTargets() {
      return this.vo.activeTargetIds;
    }
    isActiveQueryTarget(e) {
      return this.vo.activeTargetIds.has(e);
    }
    start() {
      return ((this.vo = new wh()), Promise.resolve());
    }
    handleUserChange(e, t, n) {}
    setOnlineState(e) {}
    shutdown() {}
    writeSequenceNumber(e) {}
    notifyBundleLoaded(e) {}
  },
  Eh = class {
    Mo(e) {}
    shutdown() {}
  },
  Dh = `ConnectivityMonitor`,
  Oh = class {
    constructor() {
      ((this.xo = () => this.Oo()), (this.No = () => this.Bo()), (this.Lo = []), this.ko());
    }
    Mo(e) {
      this.Lo.push(e);
    }
    shutdown() {
      (window.removeEventListener(`online`, this.xo),
        window.removeEventListener(`offline`, this.No));
    }
    ko() {
      (window.addEventListener(`online`, this.xo), window.addEventListener(`offline`, this.No));
    }
    Oo() {
      M(Dh, `Network connectivity changed: AVAILABLE`);
      for (let e of this.Lo) e(0);
    }
    Bo() {
      M(Dh, `Network connectivity changed: UNAVAILABLE`);
      for (let e of this.Lo) e(1);
    }
    static v() {
      return (
        typeof window < `u` &&
        window.addEventListener !== void 0 &&
        window.removeEventListener !== void 0
      );
    }
  },
  kh = null;
function Ah() {
  return (
    kh === null
      ? (kh = (function () {
          return 268435456 + Math.round(2147483648 * Math.random());
        })())
      : kh++,
    `0x` + kh.toString(16)
  );
}
var jh = `RestConnection`,
  Mh = {
    BatchGetDocuments: `batchGet`,
    Commit: `commit`,
    RunQuery: `runQuery`,
    RunAggregationQuery: `runAggregationQuery`,
    ExecutePipeline: `executePipeline`,
  },
  Nh = class {
    get Ko() {
      return !1;
    }
    constructor(e) {
      ((this.databaseInfo = e), (this.databaseId = e.databaseId));
      let t = e.ssl ? `https` : `http`,
        n = encodeURIComponent(this.databaseId.projectId),
        r = encodeURIComponent(this.databaseId.database);
      ((this.qo = t + `://` + e.host),
        (this.Uo = `projects/${n}/databases/${r}`),
        (this.$o =
          this.databaseId.database === fd
            ? `project_id=${n}`
            : `project_id=${n}&database_id=${r}`));
    }
    Wo(e, t, n, r, i) {
      let a = Ah(),
        o = this.Qo(e, t.toUriEncodedString());
      M(jh, `Sending RPC '${e}' ${a}:`, o, n);
      let s = { "google-cloud-resource-prefix": this.Uo, "x-goog-request-params": this.$o };
      this.Go(s, r, i);
      let { host: c } = new URL(o),
        l = te(c);
      return this.zo(e, o, s, n, l).then(
        (t) => (M(jh, `Received RPC '${e}' ${a}: `, t), t),
        (t) => {
          throw (Kl(jh, `RPC '${e}' ${a} failed with error: `, t, `url: `, o, `request:`, n), t);
        }
      );
    }
    jo(e, t, n, r, i, a) {
      return this.Wo(e, t, n, r, i);
    }
    Go(e, t, n) {
      ((e[`X-Goog-Api-Client`] = (function () {
        return `gl-js/ fire/` + Vl;
      })()),
        (e[`Content-Type`] = `text/plain`),
        this.databaseInfo.appId && (e[`X-Firebase-GMPID`] = this.databaseInfo.appId),
        t && t.headers.forEach((t, n) => (e[n] = t)),
        n && n.headers.forEach((t, n) => (e[n] = t)));
    }
    Qo(e, t) {
      let n = Mh[e],
        r = `${this.qo}/v1/${t}:${n}`;
      return (
        this.databaseInfo.apiKey &&
          (r = `${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),
        r
      );
    }
    terminate() {}
  },
  Ph = class {
    constructor(e) {
      ((this.Ho = e.Ho), (this.Jo = e.Jo));
    }
    Zo(e) {
      this.Xo = e;
    }
    Yo(e) {
      this.e_ = e;
    }
    t_(e) {
      this.n_ = e;
    }
    onMessage(e) {
      this.r_ = e;
    }
    close() {
      this.Jo();
    }
    send(e) {
      this.Ho(e);
    }
    i_() {
      this.Xo();
    }
    s_() {
      this.e_();
    }
    o_(e) {
      this.n_(e);
    }
    __(e) {
      this.r_(e);
    }
  },
  Fh = `WebChannelConnection`,
  Ih = (e, t, n) => {
    e.listen(t, (e) => {
      try {
        n(e);
      } catch (e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
    });
  },
  Lh = class e extends Nh {
    constructor(e) {
      (super(e),
        (this.a_ = []),
        (this.forceLongPolling = e.forceLongPolling),
        (this.autoDetectLongPolling = e.autoDetectLongPolling),
        (this.useFetchStreams = e.useFetchStreams),
        (this.longPollingOptions = e.longPollingOptions));
    }
    static u_() {
      e.c_ ||=
        (Ih(Rl(), Ll.STAT_EVENT, (e) => {
          e.stat === Il.PROXY
            ? M(Fh, `STAT_EVENT: detected buffering proxy`)
            : e.stat === Il.NOPROXY && M(Fh, `STAT_EVENT: detected no buffering proxy`);
        }),
        !0);
    }
    zo(e, t, n, r, i) {
      let a = Ah();
      return new Promise((i, o) => {
        let s = new Ml();
        (s.setWithCredentials(!0),
          s.listenOnce(Pl.COMPLETE, () => {
            try {
              switch (s.getLastErrorCode()) {
                case Fl.NO_ERROR:
                  let t = s.getResponseJson();
                  (M(Fh, `XHR for RPC '${e}' ${a} received:`, JSON.stringify(t)), i(t));
                  break;
                case Fl.TIMEOUT:
                  (M(Fh, `RPC '${e}' ${a} timed out`),
                    o(new L(I.DEADLINE_EXCEEDED, `Request time out`)));
                  break;
                case Fl.HTTP_ERROR:
                  let n = s.getStatus();
                  if (
                    (M(
                      Fh,
                      `RPC '${e}' ${a} failed with status:`,
                      n,
                      `response text:`,
                      s.getResponseText()
                    ),
                    n > 0)
                  ) {
                    let e = s.getResponseJson();
                    Array.isArray(e) && (e = e[0]);
                    let t = e?.error;
                    t && t.status && t.message
                      ? o(
                          new L(
                            (function (e) {
                              let t = e.toLowerCase().replace(/_/g, `-`);
                              return Object.values(I).indexOf(t) >= 0 ? t : I.UNKNOWN;
                            })(t.status),
                            t.message
                          )
                        )
                      : o(new L(I.UNKNOWN, `Server responded with status ` + s.getStatus()));
                  } else o(new L(I.UNAVAILABLE, `Connection failed.`));
                  break;
                default:
                  N(9055, { l_: e, streamId: a, h_: s.getLastErrorCode(), P_: s.getLastError() });
              }
            } finally {
              M(Fh, `RPC '${e}' ${a} completed.`);
            }
          }));
        let c = JSON.stringify(r);
        (M(Fh, `RPC '${e}' ${a} sending request:`, r), s.send(t, `POST`, c, n, 15));
      });
    }
    T_(t, n, r) {
      let i = Ah(),
        a = [this.qo, `/`, `google.firestore.v1.Firestore`, `/`, t, `/channel`],
        o = this.createWebChannelTransport(),
        s = {
          httpSessionIdParam: `gsessionid`,
          initMessageHeaders: {},
          messageUrlParams: {
            database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
          },
          sendRawJson: !0,
          supportsCrossDomainXhr: !0,
          internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
          forceLongPolling: this.forceLongPolling,
          detectBufferingProxy: this.autoDetectLongPolling,
        },
        c = this.longPollingOptions.timeoutSeconds;
      (c !== void 0 && (s.longPollingTimeout = Math.round(1e3 * c)),
        this.useFetchStreams && (s.useFetchStreams = !0),
        this.Go(s.initMessageHeaders, n, r),
        (s.encodeInitMessageHeaders = !0));
      let l = a.join(``);
      M(Fh, `Creating RPC '${t}' stream ${i}: ${l}`, s);
      let u = o.createWebChannel(l, s);
      this.I_(u);
      let d = !1,
        f = !1,
        p = new Ph({
          Ho: (e) => {
            f
              ? M(Fh, `Not sending because RPC '${t}' stream ${i} is closed:`, e)
              : ((d ||= (M(Fh, `Opening RPC '${t}' stream ${i} transport.`), u.open(), !0)),
                M(Fh, `RPC '${t}' stream ${i} sending:`, e),
                u.send(e));
          },
          Jo: () => u.close(),
        });
      return (
        Ih(u, Nl.EventType.OPEN, () => {
          f || (M(Fh, `RPC '${t}' stream ${i} transport opened.`), p.i_());
        }),
        Ih(u, Nl.EventType.CLOSE, () => {
          f || ((f = !0), M(Fh, `RPC '${t}' stream ${i} transport closed`), p.o_(), this.E_(u));
        }),
        Ih(u, Nl.EventType.ERROR, (e) => {
          f ||
            ((f = !0),
            Kl(
              Fh,
              `RPC '${t}' stream ${i} transport errored. Name:`,
              e.name,
              `Message:`,
              e.message
            ),
            p.o_(new L(I.UNAVAILABLE, `The operation could not be completed`)));
        }),
        Ih(u, Nl.EventType.MESSAGE, (e) => {
          if (!f) {
            let n = e.data[0];
            P(!!n, 16349);
            let r = n,
              a = r?.error || r[0]?.error;
            if (a) {
              M(Fh, `RPC '${t}' stream ${i} received error:`, a);
              let e = a.status,
                n = (function (e) {
                  let t = Y[e];
                  if (t !== void 0) return Ap(t);
                })(e),
                r = a.message;
              (n === void 0 &&
                ((n = I.INTERNAL),
                (r = `Unknown error status: ` + e + ` with message ` + a.message)),
                (f = !0),
                p.o_(new L(n, r)),
                u.close());
            } else (M(Fh, `RPC '${t}' stream ${i} received:`, n), p.__(n));
          }
        }),
        e.u_(),
        setTimeout(() => {
          p.s_();
        }, 0),
        p
      );
    }
    terminate() {
      (this.a_.forEach((e) => e.close()), (this.a_ = []));
    }
    I_(e) {
      this.a_.push(e);
    }
    E_(e) {
      this.a_ = this.a_.filter((t) => t === e);
    }
    Go(e, t, n) {
      (super.Go(e, t, n),
        this.databaseInfo.apiKey && (e[`x-goog-api-key`] = this.databaseInfo.apiKey));
    }
    createWebChannelTransport() {
      return zl();
    }
  };
function Rh(e) {
  return new Lh(e);
}
function zh() {
  return typeof document < `u` ? document : null;
}
function Bh(e) {
  return new Xp(e, !0);
}
Lh.c_ = !1;
var Vh = class {
    constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
      ((this.Ci = e),
        (this.timerId = t),
        (this.R_ = n),
        (this.A_ = r),
        (this.V_ = i),
        (this.d_ = 0),
        (this.m_ = null),
        (this.f_ = Date.now()),
        this.reset());
    }
    reset() {
      this.d_ = 0;
    }
    g_() {
      this.d_ = this.V_;
    }
    p_(e) {
      this.cancel();
      let t = Math.floor(this.d_ + this.y_()),
        n = Math.max(0, Date.now() - this.f_),
        r = Math.max(0, t - n);
      (r > 0 &&
        M(
          `ExponentialBackoff`,
          `Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
        ),
        (this.m_ = this.Ci.enqueueAfterDelay(this.timerId, r, () => ((this.f_ = Date.now()), e()))),
        (this.d_ *= this.A_),
        this.d_ < this.R_ && (this.d_ = this.R_),
        this.d_ > this.V_ && (this.d_ = this.V_));
    }
    w_() {
      this.m_ !== null && (this.m_.skipDelay(), (this.m_ = null));
    }
    cancel() {
      this.m_ !== null && (this.m_.cancel(), (this.m_ = null));
    }
    y_() {
      return (Math.random() - 0.5) * this.d_;
    }
  },
  Hh = `PersistentStream`,
  Uh = class {
    constructor(e, t, n, r, i, a, o, s) {
      ((this.Ci = e),
        (this.b_ = n),
        (this.S_ = r),
        (this.connection = i),
        (this.authCredentialsProvider = a),
        (this.appCheckCredentialsProvider = o),
        (this.listener = s),
        (this.state = 0),
        (this.D_ = 0),
        (this.C_ = null),
        (this.v_ = null),
        (this.stream = null),
        (this.F_ = 0),
        (this.M_ = new Vh(e, t)));
    }
    x_() {
      return this.state === 1 || this.state === 5 || this.O_();
    }
    O_() {
      return this.state === 2 || this.state === 3;
    }
    start() {
      ((this.F_ = 0), this.state === 4 ? this.N_() : this.auth());
    }
    async stop() {
      this.x_() && (await this.close(0));
    }
    B_() {
      ((this.state = 0), this.M_.reset());
    }
    L_() {
      this.O_() &&
        this.C_ === null &&
        (this.C_ = this.Ci.enqueueAfterDelay(this.b_, 6e4, () => this.k_()));
    }
    K_(e) {
      (this.q_(), this.stream.send(e));
    }
    async k_() {
      if (this.O_()) return this.close(0);
    }
    q_() {
      this.C_ &&= (this.C_.cancel(), null);
    }
    U_() {
      this.v_ &&= (this.v_.cancel(), null);
    }
    async close(e, t) {
      (this.q_(),
        this.U_(),
        this.M_.cancel(),
        this.D_++,
        e === 4
          ? t && t.code === I.RESOURCE_EXHAUSTED
            ? (Gl(t.toString()),
              Gl(`Using maximum backoff delay to prevent overloading the backend.`),
              this.M_.g_())
            : t &&
              t.code === I.UNAUTHENTICATED &&
              this.state !== 3 &&
              (this.authCredentialsProvider.invalidateToken(),
              this.appCheckCredentialsProvider.invalidateToken())
          : this.M_.reset(),
        this.stream !== null && (this.W_(), this.stream.close(), (this.stream = null)),
        (this.state = e),
        await this.listener.t_(t));
    }
    W_() {}
    auth() {
      this.state = 1;
      let e = this.Q_(this.D_),
        t = this.D_;
      Promise.all([
        this.authCredentialsProvider.getToken(),
        this.appCheckCredentialsProvider.getToken(),
      ]).then(
        ([e, n]) => {
          this.D_ === t && this.G_(e, n);
        },
        (t) => {
          e(() => {
            let e = new L(I.UNKNOWN, `Fetching auth token failed: ` + t.message);
            return this.z_(e);
          });
        }
      );
    }
    G_(e, t) {
      let n = this.Q_(this.D_);
      ((this.stream = this.j_(e, t)),
        this.stream.Zo(() => {
          n(() => this.listener.Zo());
        }),
        this.stream.Yo(() => {
          n(
            () => (
              (this.state = 2),
              (this.v_ = this.Ci.enqueueAfterDelay(
                this.S_,
                1e4,
                () => (this.O_() && (this.state = 3), Promise.resolve())
              )),
              this.listener.Yo()
            )
          );
        }),
        this.stream.t_((e) => {
          n(() => this.z_(e));
        }),
        this.stream.onMessage((e) => {
          n(() => (++this.F_ == 1 ? this.H_(e) : this.onNext(e)));
        }));
    }
    N_() {
      ((this.state = 5),
        this.M_.p_(async () => {
          ((this.state = 0), this.start());
        }));
    }
    z_(e) {
      return (M(Hh, `close with error: ${e}`), (this.stream = null), this.close(4, e));
    }
    Q_(e) {
      return (t) => {
        this.Ci.enqueueAndForget(() =>
          this.D_ === e
            ? t()
            : (M(Hh, `stream callback skipped by getCloseGuardedDispatcher.`), Promise.resolve())
        );
      };
    }
  },
  Wh = class extends Uh {
    constructor(e, t, n, r, i, a) {
      (super(
        e,
        `listen_stream_connection_backoff`,
        `listen_stream_idle`,
        `health_check_timeout`,
        t,
        n,
        r,
        a
      ),
        (this.serializer = i));
    }
    j_(e, t) {
      return this.connection.T_(`Listen`, e, t);
    }
    H_(e) {
      return this.onNext(e);
    }
    onNext(e) {
      this.M_.reset();
      let t = fm(this.serializer, e),
        n = (function (e) {
          if (!(`targetChange` in e)) return U.min();
          let t = e.targetChange;
          return t.targetIds && t.targetIds.length
            ? U.min()
            : t.readTime
              ? tm(t.readTime)
              : U.min();
        })(e);
      return this.listener.J_(t, n);
    }
    Z_(e) {
      let t = {};
      ((t.database = lm(this.serializer)),
        (t.addTarget = (function (e, t) {
          let n,
            r = t.target;
          if (
            ((n = pf(r) ? { documents: hm(e, r) } : { query: gm(e, r).ft }),
            (n.targetId = t.targetId),
            t.resumeToken.approximateByteSize() > 0)
          ) {
            n.resumeToken = $p(e, t.resumeToken);
            let r = Zp(e, t.expectedCount);
            r !== null && (n.expectedCount = r);
          } else if (t.snapshotVersion.compareTo(U.min()) > 0) {
            n.readTime = Qp(e, t.snapshotVersion.toTimestamp());
            let r = Zp(e, t.expectedCount);
            r !== null && (n.expectedCount = r);
          }
          return n;
        })(this.serializer, e)));
      let n = vm(this.serializer, e);
      (n && (t.labels = n), this.K_(t));
    }
    X_(e) {
      let t = {};
      ((t.database = lm(this.serializer)), (t.removeTarget = e), this.K_(t));
    }
  },
  Gh = class extends Uh {
    constructor(e, t, n, r, i, a) {
      (super(
        e,
        `write_stream_connection_backoff`,
        `write_stream_idle`,
        `health_check_timeout`,
        t,
        n,
        r,
        a
      ),
        (this.serializer = i));
    }
    get Y_() {
      return this.F_ > 0;
    }
    start() {
      ((this.lastStreamToken = void 0), super.start());
    }
    W_() {
      this.Y_ && this.ea([]);
    }
    j_(e, t) {
      return this.connection.T_(`Write`, e, t);
    }
    H_(e) {
      return (
        P(!!e.streamToken, 31322),
        (this.lastStreamToken = e.streamToken),
        P(!e.writeResults || e.writeResults.length === 0, 55816),
        this.listener.ta()
      );
    }
    onNext(e) {
      (P(!!e.streamToken, 12678), (this.lastStreamToken = e.streamToken), this.M_.reset());
      let t = mm(e.writeResults, e.commitTime),
        n = tm(e.commitTime);
      return this.listener.na(n, t);
    }
    ra() {
      let e = {};
      ((e.database = lm(this.serializer)), this.K_(e));
    }
    ea(e) {
      let t = { streamToken: this.lastStreamToken, writes: e.map((e) => pm(this.serializer, e)) };
      this.K_(t);
    }
  },
  Kh = class {},
  qh = class extends Kh {
    constructor(e, t, n, r) {
      (super(),
        (this.authCredentials = e),
        (this.appCheckCredentials = t),
        (this.connection = n),
        (this.serializer = r),
        (this.ia = !1));
    }
    sa() {
      if (this.ia) throw new L(I.FAILED_PRECONDITION, `The client has already been terminated.`);
    }
    Wo(e, t, n, r) {
      return (
        this.sa(),
        Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
          .then(([i, a]) => this.connection.Wo(e, rm(t, n), r, i, a))
          .catch((e) => {
            throw e.name === `FirebaseError`
              ? (e.code === I.UNAUTHENTICATED &&
                  (this.authCredentials.invalidateToken(),
                  this.appCheckCredentials.invalidateToken()),
                e)
              : new L(I.UNKNOWN, e.toString());
          })
      );
    }
    jo(e, t, n, r, i) {
      return (
        this.sa(),
        Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
          .then(([a, o]) => this.connection.jo(e, rm(t, n), r, a, o, i))
          .catch((e) => {
            throw e.name === `FirebaseError`
              ? (e.code === I.UNAUTHENTICATED &&
                  (this.authCredentials.invalidateToken(),
                  this.appCheckCredentials.invalidateToken()),
                e)
              : new L(I.UNKNOWN, e.toString());
          })
      );
    }
    terminate() {
      ((this.ia = !0), this.connection.terminate());
    }
  };
function Jh(e, t, n, r) {
  return new qh(e, t, n, r);
}
var Yh = class {
    constructor(e, t) {
      ((this.asyncQueue = e),
        (this.onlineStateHandler = t),
        (this.state = `Unknown`),
        (this.oa = 0),
        (this._a = null),
        (this.aa = !0));
    }
    ua() {
      this.oa === 0 &&
        (this.ca(`Unknown`),
        (this._a = this.asyncQueue.enqueueAfterDelay(
          `online_state_timeout`,
          1e4,
          () => (
            (this._a = null),
            this.la(`Backend didn't respond within 10 seconds.`),
            this.ca(`Offline`),
            Promise.resolve()
          )
        )));
    }
    ha(e) {
      this.state === `Online`
        ? this.ca(`Unknown`)
        : (this.oa++,
          this.oa >= 1 &&
            (this.Pa(),
            this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),
            this.ca(`Offline`)));
    }
    set(e) {
      (this.Pa(), (this.oa = 0), e === `Online` && (this.aa = !1), this.ca(e));
    }
    ca(e) {
      e !== this.state && ((this.state = e), this.onlineStateHandler(e));
    }
    la(e) {
      let t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
      this.aa ? (Gl(t), (this.aa = !1)) : M(`OnlineStateTracker`, t);
    }
    Pa() {
      this._a !== null && (this._a.cancel(), (this._a = null));
    }
  },
  Xh = `RemoteStore`,
  Zh = class {
    constructor(e, t, n, r, i) {
      ((this.localStore = e),
        (this.datastore = t),
        (this.asyncQueue = n),
        (this.remoteSyncer = {}),
        (this.Ta = []),
        (this.Ia = new Map()),
        (this.Ea = new Set()),
        (this.Ra = []),
        (this.Aa = i),
        this.Aa.Mo((e) => {
          n.enqueueAndForget(async () => {
            og(this) &&
              (M(Xh, `Restarting streams for network reachability change.`),
              await (async function (e) {
                let t = F(e);
                (t.Ea.add(4), await $h(t), t.Va.set(`Unknown`), t.Ea.delete(4), await Qh(t));
              })(this));
          });
        }),
        (this.Va = new Yh(n, r)));
    }
  };
async function Qh(e) {
  if (og(e)) for (let t of e.Ra) await t(!0);
}
async function $h(e) {
  for (let t of e.Ra) await t(!1);
}
function eg(e, t) {
  let n = F(e);
  n.Ia.has(t.targetId) || (n.Ia.set(t.targetId, t), ag(n) ? ig(n) : Tg(n).O_() && ng(n, t));
}
function tg(e, t) {
  let n = F(e),
    r = Tg(n);
  (n.Ia.delete(t),
    r.O_() && rg(n, t),
    n.Ia.size === 0 && (r.O_() ? r.L_() : og(n) && n.Va.set(`Unknown`)));
}
function ng(e, t) {
  if (
    (e.da.$e(t.targetId),
    t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(U.min()) > 0)
  ) {
    let n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
    t = t.withExpectedCount(n);
  }
  Tg(e).Z_(t);
}
function rg(e, t) {
  (e.da.$e(t), Tg(e).X_(t));
}
function ig(e) {
  ((e.da = new Wp({
    getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
    At: (t) => e.Ia.get(t) || null,
    ht: () => e.datastore.serializer.databaseId,
  })),
    Tg(e).start(),
    e.Va.ua());
}
function ag(e) {
  return og(e) && !Tg(e).x_() && e.Ia.size > 0;
}
function og(e) {
  return F(e).Ea.size === 0;
}
function sg(e) {
  e.da = void 0;
}
async function cg(e) {
  e.Va.set(`Online`);
}
async function lg(e) {
  e.Ia.forEach((t, n) => {
    ng(e, t);
  });
}
async function ug(e, t) {
  (sg(e), ag(e) ? (e.Va.ha(t), ig(e)) : e.Va.set(`Unknown`));
}
async function dg(e, t, n) {
  if ((e.Va.set(`Online`), t instanceof Hp && t.state === 2 && t.cause))
    try {
      await (async function (e, t) {
        let n = t.cause;
        for (let r of t.targetIds)
          e.Ia.has(r) &&
            (await e.remoteSyncer.rejectListen(r, n), e.Ia.delete(r), e.da.removeTarget(r));
      })(e, t);
    } catch (n) {
      (M(Xh, `Failed to remove targets %s: %s `, t.targetIds.join(`,`), n), await fg(e, n));
    }
  else if (
    (t instanceof Bp ? e.da.Xe(t) : t instanceof Vp ? e.da.st(t) : e.da.tt(t), !n.isEqual(U.min()))
  )
    try {
      let t = await gh(e.localStore);
      n.compareTo(t) >= 0 &&
        (await (function (e, t) {
          let n = e.da.Tt(t);
          return (
            n.targetChanges.forEach((n, r) => {
              if (n.resumeToken.approximateByteSize() > 0) {
                let i = e.Ia.get(r);
                i && e.Ia.set(r, i.withResumeToken(n.resumeToken, t));
              }
            }),
            n.targetMismatches.forEach((t, n) => {
              let r = e.Ia.get(t);
              r &&
                (e.Ia.set(t, r.withResumeToken(ed.EMPTY_BYTE_STRING, r.snapshotVersion)),
                rg(e, t),
                ng(e, new km(r.target, t, n, r.sequenceNumber)));
            }),
            e.remoteSyncer.applyRemoteEvent(n)
          );
        })(e, n));
    } catch (t) {
      (M(Xh, `Failed to raise snapshot:`, t), await fg(e, t));
    }
}
async function fg(e, t, n) {
  if (!Fu(t)) throw t;
  (e.Ea.add(1),
    await $h(e),
    e.Va.set(`Offline`),
    (n ||= () => gh(e.localStore)),
    e.asyncQueue.enqueueRetryable(async () => {
      (M(Xh, `Retrying IndexedDB access`), await n(), e.Ea.delete(1), await Qh(e));
    }));
}
function pg(e, t) {
  return t().catch((n) => fg(e, n, t));
}
async function mg(e) {
  let t = F(e),
    n = Eg(t),
    r = t.Ta.length > 0 ? t.Ta[t.Ta.length - 1].batchId : Lu;
  for (; hg(t); )
    try {
      let e = await yh(t.localStore, r);
      if (e === null) {
        t.Ta.length === 0 && n.L_();
        break;
      }
      ((r = e.batchId), gg(t, e));
    } catch (e) {
      await fg(t, e);
    }
  _g(t) && vg(t);
}
function hg(e) {
  return og(e) && e.Ta.length < 10;
}
function gg(e, t) {
  e.Ta.push(t);
  let n = Eg(e);
  n.O_() && n.Y_ && n.ea(t.mutations);
}
function _g(e) {
  return og(e) && !Eg(e).x_() && e.Ta.length > 0;
}
function vg(e) {
  Eg(e).start();
}
async function yg(e) {
  Eg(e).ra();
}
async function bg(e) {
  let t = Eg(e);
  for (let n of e.Ta) t.ea(n.mutations);
}
async function xg(e, t, n) {
  let r = e.Ta.shift(),
    i = Ep.from(r, t, n);
  (await pg(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await mg(e));
}
async function Sg(e, t) {
  (t &&
    Eg(e).Y_ &&
    (await (async function (e, t) {
      if (
        (function (e) {
          return kp(e) && e !== I.ABORTED;
        })(t.code)
      ) {
        let n = e.Ta.shift();
        (Eg(e).B_(),
          await pg(e, () => e.remoteSyncer.rejectFailedWrite(n.batchId, t)),
          await mg(e));
      }
    })(e, t)),
    _g(e) && vg(e));
}
async function Cg(e, t) {
  let n = F(e);
  (n.asyncQueue.verifyOperationInProgress(), M(Xh, `RemoteStore received new credentials`));
  let r = og(n);
  (n.Ea.add(3),
    await $h(n),
    r && n.Va.set(`Unknown`),
    await n.remoteSyncer.handleCredentialChange(t),
    n.Ea.delete(3),
    await Qh(n));
}
async function wg(e, t) {
  let n = F(e);
  t ? (n.Ea.delete(2), await Qh(n)) : t || (n.Ea.add(2), await $h(n), n.Va.set(`Unknown`));
}
function Tg(e) {
  return (
    e.ma ||
      ((e.ma = (function (e, t, n) {
        let r = F(e);
        return (
          r.sa(),
          new Wh(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
        );
      })(e.datastore, e.asyncQueue, {
        Zo: cg.bind(null, e),
        Yo: lg.bind(null, e),
        t_: ug.bind(null, e),
        J_: dg.bind(null, e),
      })),
      e.Ra.push(async (t) => {
        t ? (e.ma.B_(), ag(e) ? ig(e) : e.Va.set(`Unknown`)) : (await e.ma.stop(), sg(e));
      })),
    e.ma
  );
}
function Eg(e) {
  return (
    e.fa ||
      ((e.fa = (function (e, t, n) {
        let r = F(e);
        return (
          r.sa(),
          new Gh(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
        );
      })(e.datastore, e.asyncQueue, {
        Zo: () => Promise.resolve(),
        Yo: yg.bind(null, e),
        t_: Sg.bind(null, e),
        ta: bg.bind(null, e),
        na: xg.bind(null, e),
      })),
      e.Ra.push(async (t) => {
        t
          ? (e.fa.B_(), await mg(e))
          : (await e.fa.stop(),
            e.Ta.length > 0 &&
              (M(Xh, `Stopping write stream with ${e.Ta.length} pending writes`), (e.Ta = [])));
      })),
    e.fa
  );
}
var Dg = class e {
  constructor(e, t, n, r, i) {
    ((this.asyncQueue = e),
      (this.timerId = t),
      (this.targetTimeMs = n),
      (this.op = r),
      (this.removalCallback = i),
      (this.deferred = new Yl()),
      (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
      this.deferred.promise.catch((e) => {}));
  }
  get promise() {
    return this.deferred.promise;
  }
  static createAndSchedule(t, n, r, i, a) {
    let o = new e(t, n, Date.now() + r, i, a);
    return (o.start(r), o);
  }
  start(e) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
  }
  skipDelay() {
    return this.handleDelayElapsed();
  }
  cancel(e) {
    this.timerHandle !== null &&
      (this.clearTimeout(),
      this.deferred.reject(new L(I.CANCELLED, `Operation cancelled` + (e ? `: ` + e : ``))));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() =>
      this.timerHandle === null
        ? Promise.resolve()
        : (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e)))
    );
  }
  clearTimeout() {
    this.timerHandle !== null &&
      (this.removalCallback(this), clearTimeout(this.timerHandle), (this.timerHandle = null));
  }
};
function Og(e, t) {
  if ((Gl(`AsyncQueue`, `${t}: ${e}`), Fu(e))) return new L(I.UNAVAILABLE, `${t}: ${e}`);
  throw e;
}
var kg = class e {
    static emptySet(t) {
      return new e(t.comparator);
    }
    constructor(e) {
      ((this.comparator = e
        ? (t, n) => e(t, n) || B.comparator(t.key, n.key)
        : (e, t) => B.comparator(e.key, t.key)),
        (this.keyedMap = Lf()),
        (this.sortedSet = new G(this.comparator)));
    }
    has(e) {
      return this.keyedMap.get(e) != null;
    }
    get(e) {
      return this.keyedMap.get(e);
    }
    first() {
      return this.sortedSet.minKey();
    }
    last() {
      return this.sortedSet.maxKey();
    }
    isEmpty() {
      return this.sortedSet.isEmpty();
    }
    indexOf(e) {
      let t = this.keyedMap.get(e);
      return t ? this.sortedSet.indexOf(t) : -1;
    }
    get size() {
      return this.sortedSet.size;
    }
    forEach(e) {
      this.sortedSet.inorderTraversal((t, n) => (e(t), !1));
    }
    add(e) {
      let t = this.delete(e.key);
      return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
    }
    delete(e) {
      let t = this.get(e);
      return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this;
    }
    isEqual(t) {
      if (!(t instanceof e) || this.size !== t.size) return !1;
      let n = this.sortedSet.getIterator(),
        r = t.sortedSet.getIterator();
      for (; n.hasNext(); ) {
        let e = n.getNext().key,
          t = r.getNext().key;
        if (!e.isEqual(t)) return !1;
      }
      return !0;
    }
    toString() {
      let e = [];
      return (
        this.forEach((t) => {
          e.push(t.toString());
        }),
        e.length === 0
          ? `DocumentSet ()`
          : `DocumentSet (
  ` +
            e.join(`  
`) +
            `
)`
      );
    }
    copy(t, n) {
      let r = new e();
      return ((r.comparator = this.comparator), (r.keyedMap = t), (r.sortedSet = n), r);
    }
  },
  Ag = class {
    constructor() {
      this.ga = new G(B.comparator);
    }
    track(e) {
      let t = e.doc.key,
        n = this.ga.get(t);
      n
        ? e.type !== 0 && n.type === 3
          ? (this.ga = this.ga.insert(t, e))
          : e.type === 3 && n.type !== 1
            ? (this.ga = this.ga.insert(t, { type: n.type, doc: e.doc }))
            : e.type === 2 && n.type === 2
              ? (this.ga = this.ga.insert(t, { type: 2, doc: e.doc }))
              : e.type === 2 && n.type === 0
                ? (this.ga = this.ga.insert(t, { type: 0, doc: e.doc }))
                : e.type === 1 && n.type === 0
                  ? (this.ga = this.ga.remove(t))
                  : e.type === 1 && n.type === 2
                    ? (this.ga = this.ga.insert(t, { type: 1, doc: n.doc }))
                    : e.type === 0 && n.type === 1
                      ? (this.ga = this.ga.insert(t, { type: 2, doc: e.doc }))
                      : N(63341, { Vt: e, pa: n })
        : (this.ga = this.ga.insert(t, e));
    }
    ya() {
      let e = [];
      return (
        this.ga.inorderTraversal((t, n) => {
          e.push(n);
        }),
        e
      );
    }
  },
  jg = class e {
    constructor(e, t, n, r, i, a, o, s, c) {
      ((this.query = e),
        (this.docs = t),
        (this.oldDocs = n),
        (this.docChanges = r),
        (this.mutatedKeys = i),
        (this.fromCache = a),
        (this.syncStateChanged = o),
        (this.excludesMetadataChanges = s),
        (this.hasCachedResults = c));
    }
    static fromInitialDocuments(t, n, r, i, a) {
      let o = [];
      return (
        n.forEach((e) => {
          o.push({ type: 0, doc: e });
        }),
        new e(t, n, kg.emptySet(n), o, r, i, !0, !1, a)
      );
    }
    get hasPendingWrites() {
      return !this.mutatedKeys.isEmpty();
    }
    isEqual(e) {
      if (
        !(
          this.fromCache === e.fromCache &&
          this.hasCachedResults === e.hasCachedResults &&
          this.syncStateChanged === e.syncStateChanged &&
          this.mutatedKeys.isEqual(e.mutatedKeys) &&
          Ef(this.query, e.query) &&
          this.docs.isEqual(e.docs) &&
          this.oldDocs.isEqual(e.oldDocs)
        )
      )
        return !1;
      let t = this.docChanges,
        n = e.docChanges;
      if (t.length !== n.length) return !1;
      for (let e = 0; e < t.length; e++)
        if (t[e].type !== n[e].type || !t[e].doc.isEqual(n[e].doc)) return !1;
      return !0;
    }
  },
  Mg = class {
    constructor() {
      ((this.wa = void 0), (this.ba = []));
    }
    Sa() {
      return this.ba.some((e) => e.Da());
    }
  },
  Ng = class {
    constructor() {
      ((this.queries = Pg()), (this.onlineState = `Unknown`), (this.Ca = new Set()));
    }
    terminate() {
      (function (e, t) {
        let n = F(e),
          r = n.queries;
        ((n.queries = Pg()),
          r.forEach((e, n) => {
            for (let e of n.ba) e.onError(t);
          }));
      })(this, new L(I.ABORTED, `Firestore shutting down`));
    }
  };
function Pg() {
  return new Nf((e) => Df(e), Ef);
}
async function Fg(e, t) {
  let n = F(e),
    r = 3,
    i = t.query,
    a = n.queries.get(i);
  a ? !a.Sa() && t.Da() && (r = 2) : ((a = new Mg()), (r = t.Da() ? 0 : 1));
  try {
    switch (r) {
      case 0:
        a.wa = await n.onListen(i, !0);
        break;
      case 1:
        a.wa = await n.onListen(i, !1);
        break;
      case 2:
        await n.onFirstRemoteStoreListen(i);
    }
  } catch (e) {
    let n = Og(e, `Initialization of query '${Of(t.query)}' failed`);
    t.onError(n);
    return;
  }
  (n.queries.set(i, a), a.ba.push(t), t.va(n.onlineState), a.wa && t.Fa(a.wa) && zg(n));
}
async function Ig(e, t) {
  let n = F(e),
    r = t.query,
    i = 3,
    a = n.queries.get(r);
  if (a) {
    let e = a.ba.indexOf(t);
    e >= 0 &&
      (a.ba.splice(e, 1), a.ba.length === 0 ? (i = t.Da() ? 0 : 1) : !a.Sa() && t.Da() && (i = 2));
  }
  switch (i) {
    case 0:
      return (n.queries.delete(r), n.onUnlisten(r, !0));
    case 1:
      return (n.queries.delete(r), n.onUnlisten(r, !1));
    case 2:
      return n.onLastRemoteStoreUnlisten(r);
    default:
      return;
  }
}
function Lg(e, t) {
  let n = F(e),
    r = !1;
  for (let e of t) {
    let t = e.query,
      i = n.queries.get(t);
    if (i) {
      for (let t of i.ba) t.Fa(e) && (r = !0);
      i.wa = e;
    }
  }
  r && zg(n);
}
function Rg(e, t, n) {
  let r = F(e),
    i = r.queries.get(t);
  if (i) for (let e of i.ba) e.onError(n);
  r.queries.delete(t);
}
function zg(e) {
  e.Ca.forEach((e) => {
    e.next();
  });
}
var Bg, Vg;
(((Vg = Bg ||= {}).Ma = `default`), (Vg.Cache = `cache`));
var Hg = class {
    constructor(e, t, n) {
      ((this.query = e),
        (this.xa = t),
        (this.Oa = !1),
        (this.Na = null),
        (this.onlineState = `Unknown`),
        (this.options = n || {}));
    }
    Fa(e) {
      if (!this.options.includeMetadataChanges) {
        let t = [];
        for (let n of e.docChanges) n.type !== 3 && t.push(n);
        e = new jg(
          e.query,
          e.docs,
          e.oldDocs,
          t,
          e.mutatedKeys,
          e.fromCache,
          e.syncStateChanged,
          !0,
          e.hasCachedResults
        );
      }
      let t = !1;
      return (
        this.Oa
          ? this.Ba(e) && (this.xa.next(e), (t = !0))
          : this.La(e, this.onlineState) && (this.ka(e), (t = !0)),
        (this.Na = e),
        t
      );
    }
    onError(e) {
      this.xa.error(e);
    }
    va(e) {
      this.onlineState = e;
      let t = !1;
      return (this.Na && !this.Oa && this.La(this.Na, e) && (this.ka(this.Na), (t = !0)), t);
    }
    La(e, t) {
      if (!e.fromCache || !this.Da()) return !0;
      let n = t !== `Offline`;
      return (
        (!this.options.Ka || !n) && (!e.docs.isEmpty() || e.hasCachedResults || t === `Offline`)
      );
    }
    Ba(e) {
      if (e.docChanges.length > 0) return !0;
      let t = this.Na && this.Na.hasPendingWrites !== e.hasPendingWrites;
      return !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges;
    }
    ka(e) {
      ((e = jg.fromInitialDocuments(
        e.query,
        e.docs,
        e.mutatedKeys,
        e.fromCache,
        e.hasCachedResults
      )),
        (this.Oa = !0),
        this.xa.next(e));
    }
    Da() {
      return this.options.source !== Bg.Cache;
    }
  },
  Ug = class {
    constructor(e) {
      this.key = e;
    }
  },
  Wg = class {
    constructor(e) {
      this.key = e;
    }
  },
  Gg = class {
    constructor(e, t) {
      ((this.query = e),
        (this.Za = t),
        (this.Xa = null),
        (this.hasCachedResults = !1),
        (this.current = !1),
        (this.Ya = J()),
        (this.mutatedKeys = J()),
        (this.eu = jf(e)),
        (this.tu = new kg(this.eu)));
    }
    get nu() {
      return this.Za;
    }
    ru(e, t) {
      let n = t ? t.iu : new Ag(),
        r = t ? t.tu : this.tu,
        i = t ? t.mutatedKeys : this.mutatedKeys,
        a = r,
        o = !1,
        s = this.query.limitType === `F` && r.size === this.query.limit ? r.last() : null,
        c = this.query.limitType === `L` && r.size === this.query.limit ? r.first() : null;
      if (
        (e.inorderTraversal((e, t) => {
          let l = r.get(e),
            u = kf(this.query, t) ? t : null,
            d = !!l && this.mutatedKeys.has(l.key),
            f =
              !!u &&
              (u.hasLocalMutations || (this.mutatedKeys.has(u.key) && u.hasCommittedMutations)),
            p = !1;
          (l && u
            ? l.data.isEqual(u.data)
              ? d !== f && (n.track({ type: 3, doc: u }), (p = !0))
              : this.su(l, u) ||
                (n.track({ type: 2, doc: u }),
                (p = !0),
                ((s && this.eu(u, s) > 0) || (c && this.eu(u, c) < 0)) && (o = !0))
            : !l && u
              ? (n.track({ type: 0, doc: u }), (p = !0))
              : l && !u && (n.track({ type: 1, doc: l }), (p = !0), (s || c) && (o = !0)),
            p &&
              (u
                ? ((a = a.add(u)), (i = f ? i.add(e) : i.delete(e)))
                : ((a = a.delete(e)), (i = i.delete(e)))));
        }),
        this.query.limit !== null)
      )
        for (; a.size > this.query.limit; ) {
          let e = this.query.limitType === `F` ? a.last() : a.first();
          ((a = a.delete(e.key)), (i = i.delete(e.key)), n.track({ type: 1, doc: e }));
        }
      return { tu: a, iu: n, Ss: o, mutatedKeys: i };
    }
    su(e, t) {
      return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations;
    }
    applyChanges(e, t, n, r) {
      let i = this.tu;
      ((this.tu = e.tu), (this.mutatedKeys = e.mutatedKeys));
      let a = e.iu.ya();
      (a.sort(
        (e, t) =>
          (function (e, t) {
            let n = (e) => {
              switch (e) {
                case 0:
                  return 1;
                case 2:
                case 3:
                  return 2;
                case 1:
                  return 0;
                default:
                  return N(20277, { Vt: e });
              }
            };
            return n(e) - n(t);
          })(e.type, t.type) || this.eu(e.doc, t.doc)
      ),
        this.ou(n),
        (r ??= !1));
      let o = t && !r ? this._u() : [],
        s = this.Ya.size === 0 && this.current && !r ? 1 : 0,
        c = s !== this.Xa;
      return (
        (this.Xa = s),
        a.length !== 0 || c
          ? {
              snapshot: new jg(
                this.query,
                e.tu,
                i,
                a,
                e.mutatedKeys,
                s === 0,
                c,
                !1,
                !!n && n.resumeToken.approximateByteSize() > 0
              ),
              au: o,
            }
          : { au: o }
      );
    }
    va(e) {
      return this.current && e === `Offline`
        ? ((this.current = !1),
          this.applyChanges(
            { tu: this.tu, iu: new Ag(), mutatedKeys: this.mutatedKeys, Ss: !1 },
            !1
          ))
        : { au: [] };
    }
    uu(e) {
      return !this.Za.has(e) && !!this.tu.has(e) && !this.tu.get(e).hasLocalMutations;
    }
    ou(e) {
      e &&
        (e.addedDocuments.forEach((e) => (this.Za = this.Za.add(e))),
        e.modifiedDocuments.forEach((e) => {}),
        e.removedDocuments.forEach((e) => (this.Za = this.Za.delete(e))),
        (this.current = e.current));
    }
    _u() {
      if (!this.current) return [];
      let e = this.Ya;
      ((this.Ya = J()),
        this.tu.forEach((e) => {
          this.uu(e.key) && (this.Ya = this.Ya.add(e.key));
        }));
      let t = [];
      return (
        e.forEach((e) => {
          this.Ya.has(e) || t.push(new Wg(e));
        }),
        this.Ya.forEach((n) => {
          e.has(n) || t.push(new Ug(n));
        }),
        t
      );
    }
    cu(e) {
      ((this.Za = e.ks), (this.Ya = J()));
      let t = this.ru(e.documents);
      return this.applyChanges(t, !0);
    }
    lu() {
      return jg.fromInitialDocuments(
        this.query,
        this.tu,
        this.mutatedKeys,
        this.Xa === 0,
        this.hasCachedResults
      );
    }
  },
  Kg = `SyncEngine`,
  qg = class {
    constructor(e, t, n) {
      ((this.query = e), (this.targetId = t), (this.view = n));
    }
  },
  Jg = class {
    constructor(e) {
      ((this.key = e), (this.hu = !1));
    }
  },
  Yg = class {
    constructor(e, t, n, r, i, a) {
      ((this.localStore = e),
        (this.remoteStore = t),
        (this.eventManager = n),
        (this.sharedClientState = r),
        (this.currentUser = i),
        (this.maxConcurrentLimboResolutions = a),
        (this.Pu = {}),
        (this.Tu = new Nf((e) => Df(e), Ef)),
        (this.Iu = new Map()),
        (this.Eu = new Set()),
        (this.Ru = new G(B.comparator)),
        (this.Au = new Map()),
        (this.Vu = new Qm()),
        (this.du = {}),
        (this.mu = new Map()),
        (this.fu = Rm.ar()),
        (this.onlineState = `Unknown`),
        (this.gu = void 0));
    }
    get isPrimaryClient() {
      return !0 === this.gu;
    }
  };
async function Xg(e, t, n = !0) {
  let r = v_(e),
    i,
    a = r.Tu.get(t);
  return (
    a
      ? (r.sharedClientState.addLocalQueryTarget(a.targetId), (i = a.view.lu()))
      : (i = await Qg(r, t, n, !0)),
    i
  );
}
async function Zg(e, t) {
  await Qg(v_(e), t, !0, !1);
}
async function Qg(e, t, n, r) {
  let i = await bh(e.localStore, xf(t)),
    a = i.targetId,
    o = e.sharedClientState.addLocalQueryTarget(a, n),
    s;
  return (
    r && (s = await $g(e, t, a, o === `current`, i.resumeToken)),
    e.isPrimaryClient && n && eg(e.remoteStore, i),
    s
  );
}
async function $g(e, t, n, r, i) {
  e.pu = (t, n, r) =>
    (async function (e, t, n, r) {
      let i = t.view.ru(n);
      i.Ss && (i = await Sh(e.localStore, t.query, !1).then(({ documents: e }) => t.view.ru(e, i)));
      let a = r && r.targetChanges.get(t.targetId),
        o = r && r.targetMismatches.get(t.targetId) != null,
        s = t.view.applyChanges(i, e.isPrimaryClient, a, o);
      return (f_(e, t.targetId, s.au), s.snapshot);
    })(e, t, n, r);
  let a = await Sh(e.localStore, t, !0),
    o = new Gg(t, a.ks),
    s = o.ru(a.documents),
    c = zp.createSynthesizedTargetChangeForCurrentChange(n, r && e.onlineState !== `Offline`, i),
    l = o.applyChanges(s, e.isPrimaryClient, c);
  f_(e, n, l.au);
  let u = new qg(t, n, o);
  return (e.Tu.set(t, u), e.Iu.has(n) ? e.Iu.get(n).push(t) : e.Iu.set(n, [t]), l.snapshot);
}
async function e_(e, t, n) {
  let r = F(e),
    i = r.Tu.get(t),
    a = r.Iu.get(i.targetId);
  if (a.length > 1)
    return (
      r.Iu.set(
        i.targetId,
        a.filter((e) => !Ef(e, t))
      ),
      void r.Tu.delete(t)
    );
  r.isPrimaryClient
    ? (r.sharedClientState.removeLocalQueryTarget(i.targetId),
      r.sharedClientState.isActiveQueryTarget(i.targetId) ||
        (await xh(r.localStore, i.targetId, !1)
          .then(() => {
            (r.sharedClientState.clearQueryState(i.targetId),
              n && tg(r.remoteStore, i.targetId),
              u_(r, i.targetId));
          })
          .catch(Nu)))
    : (u_(r, i.targetId), await xh(r.localStore, i.targetId, !0));
}
async function t_(e, t) {
  let n = F(e),
    r = n.Tu.get(t),
    i = n.Iu.get(r.targetId);
  n.isPrimaryClient &&
    i.length === 1 &&
    (n.sharedClientState.removeLocalQueryTarget(r.targetId), tg(n.remoteStore, r.targetId));
}
async function n_(e, t, n) {
  let r = y_(e);
  try {
    let e = await (function (e, t) {
      let n = F(e),
        r = H.now(),
        i = t.reduce((e, t) => e.add(t.key), J()),
        a,
        o;
      return n.persistence
        .runTransaction(`Locally write mutations`, `readwrite`, (e) => {
          let s = Ff(),
            c = J();
          return n.xs
            .getEntries(e, i)
            .next((e) => {
              ((s = e),
                s.forEach((e, t) => {
                  t.isValidDocument() || (c = c.add(e));
                }));
            })
            .next(() => n.localDocuments.getOverlayedDocuments(e, s))
            .next((i) => {
              a = i;
              let o = [];
              for (let e of t) {
                let t = gp(e, a.get(e.key).overlayedDocument);
                t != null && o.push(new yp(e.key, t, zd(t.value.mapValue), up.exists(!0)));
              }
              return n.mutationQueue.addMutationBatch(e, r, o, t);
            })
            .next((t) => {
              o = t;
              let r = t.applyToLocalDocumentSet(a, c);
              return n.documentOverlayCache.saveOverlays(e, t.batchId, r);
            });
        })
        .then(() => ({ batchId: o.batchId, changes: Rf(a) }));
    })(r.localStore, t);
    (r.sharedClientState.addPendingMutation(e.batchId),
      (function (e, t, n) {
        let r = e.du[e.currentUser.toKey()];
        ((r ||= new G(R)), (r = r.insert(t, n)), (e.du[e.currentUser.toKey()] = r));
      })(r, e.batchId, n),
      await h_(r, e.changes),
      await mg(r.remoteStore));
  } catch (e) {
    let t = Og(e, `Failed to persist write`);
    n.reject(t);
  }
}
async function r_(e, t) {
  let n = F(e);
  try {
    let e = await _h(n.localStore, t);
    (t.targetChanges.forEach((e, t) => {
      let r = n.Au.get(t);
      r &&
        (P(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1, 22616),
        e.addedDocuments.size > 0
          ? (r.hu = !0)
          : e.modifiedDocuments.size > 0
            ? P(r.hu, 14607)
            : e.removedDocuments.size > 0 && (P(r.hu, 42227), (r.hu = !1)));
    }),
      await h_(n, e, t));
  } catch (e) {
    await Nu(e);
  }
}
function i_(e, t, n) {
  let r = F(e);
  if ((r.isPrimaryClient && n === 0) || (!r.isPrimaryClient && n === 1)) {
    let e = [];
    (r.Tu.forEach((n, r) => {
      let i = r.view.va(t);
      i.snapshot && e.push(i.snapshot);
    }),
      (function (e, t) {
        let n = F(e);
        n.onlineState = t;
        let r = !1;
        (n.queries.forEach((e, n) => {
          for (let e of n.ba) e.va(t) && (r = !0);
        }),
          r && zg(n));
      })(r.eventManager, t),
      e.length && r.Pu.J_(e),
      (r.onlineState = t),
      r.isPrimaryClient && r.sharedClientState.setOnlineState(t));
  }
}
async function a_(e, t, n) {
  let r = F(e);
  r.sharedClientState.updateQueryState(t, `rejected`, n);
  let i = r.Au.get(t),
    a = i && i.key;
  if (a) {
    let e = new G(B.comparator);
    e = e.insert(a, Bd.newNoDocument(a, U.min()));
    let n = J().add(a);
    (await r_(r, new Rp(U.min(), new Map(), new G(R), e, n)),
      (r.Ru = r.Ru.remove(a)),
      r.Au.delete(t),
      m_(r));
  } else
    await xh(r.localStore, t, !1)
      .then(() => u_(r, t, n))
      .catch(Nu);
}
async function o_(e, t) {
  let n = F(e),
    r = t.batch.batchId;
  try {
    let e = await hh(n.localStore, t);
    (l_(n, r, null),
      c_(n, r),
      n.sharedClientState.updateMutationState(r, `acknowledged`),
      await h_(n, e));
  } catch (e) {
    await Nu(e);
  }
}
async function s_(e, t, n) {
  let r = F(e);
  try {
    let e = await (function (e, t) {
      let n = F(e);
      return n.persistence.runTransaction(`Reject batch`, `readwrite-primary`, (e) => {
        let r;
        return n.mutationQueue
          .lookupMutationBatch(e, t)
          .next(
            (t) => (P(t !== null, 37113), (r = t.keys()), n.mutationQueue.removeMutationBatch(e, t))
          )
          .next(() => n.mutationQueue.performConsistencyCheck(e))
          .next(() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t))
          .next(() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, r))
          .next(() => n.localDocuments.getDocuments(e, r));
      });
    })(r.localStore, t);
    (l_(r, t, n),
      c_(r, t),
      r.sharedClientState.updateMutationState(t, `rejected`, n),
      await h_(r, e));
  } catch (e) {
    await Nu(e);
  }
}
function c_(e, t) {
  ((e.mu.get(t) || []).forEach((e) => {
    e.resolve();
  }),
    e.mu.delete(t));
}
function l_(e, t, n) {
  let r = F(e),
    i = r.du[r.currentUser.toKey()];
  if (i) {
    let e = i.get(t);
    (e && (n ? e.reject(n) : e.resolve(), (i = i.remove(t))), (r.du[r.currentUser.toKey()] = i));
  }
}
function u_(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t);
  for (let r of e.Iu.get(t)) (e.Tu.delete(r), n && e.Pu.yu(r, n));
  (e.Iu.delete(t),
    e.isPrimaryClient &&
      e.Vu.Gr(t).forEach((t) => {
        e.Vu.containsKey(t) || d_(e, t);
      }));
}
function d_(e, t) {
  e.Eu.delete(t.path.canonicalString());
  let n = e.Ru.get(t);
  n !== null && (tg(e.remoteStore, n), (e.Ru = e.Ru.remove(t)), e.Au.delete(n), m_(e));
}
function f_(e, t, n) {
  for (let r of n)
    r instanceof Ug
      ? (e.Vu.addReference(r.key, t), p_(e, r))
      : r instanceof Wg
        ? (M(Kg, `Document no longer in limbo: ` + r.key),
          e.Vu.removeReference(r.key, t),
          e.Vu.containsKey(r.key) || d_(e, r.key))
        : N(19791, { wu: r });
}
function p_(e, t) {
  let n = t.key,
    r = n.path.canonicalString();
  e.Ru.get(n) || e.Eu.has(r) || (M(Kg, `New document in limbo: ` + n), e.Eu.add(r), m_(e));
}
function m_(e) {
  for (; e.Eu.size > 0 && e.Ru.size < e.maxConcurrentLimboResolutions; ) {
    let t = e.Eu.values().next().value;
    e.Eu.delete(t);
    let n = new B(z.fromString(t)),
      r = e.fu.next();
    (e.Au.set(r, new Jg(n)),
      (e.Ru = e.Ru.insert(n, r)),
      eg(e.remoteStore, new km(xf(gf(n.path)), r, `TargetPurposeLimboResolution`, Iu.ce)));
  }
}
async function h_(e, t, n) {
  let r = F(e),
    i = [],
    a = [],
    o = [];
  r.Tu.isEmpty() ||
    (r.Tu.forEach((e, s) => {
      o.push(
        r.pu(s, t, n).then((e) => {
          if ((e || n) && r.isPrimaryClient) {
            let t = e ? !e.fromCache : n?.targetChanges.get(s.targetId)?.current;
            r.sharedClientState.updateQueryState(s.targetId, t ? `current` : `not-current`);
          }
          if (e) {
            i.push(e);
            let t = sh.Es(s.targetId, e);
            a.push(t);
          }
        })
      );
    }),
    await Promise.all(o),
    r.Pu.J_(i),
    await (async function (e, t) {
      let n = F(e);
      try {
        await n.persistence.runTransaction(`notifyLocalViewChanges`, `readwrite`, (e) =>
          W.forEach(t, (t) =>
            W.forEach(t.Ts, (r) =>
              n.persistence.referenceDelegate.addReference(e, t.targetId, r)
            ).next(() =>
              W.forEach(t.Is, (r) =>
                n.persistence.referenceDelegate.removeReference(e, t.targetId, r)
              )
            )
          )
        );
      } catch (e) {
        if (!Fu(e)) throw e;
        M(uh, `Failed to update sequence numbers: ` + e);
      }
      for (let e of t) {
        let t = e.targetId;
        if (!e.fromCache) {
          let e = n.vs.get(t),
            r = e.snapshotVersion,
            i = e.withLastLimboFreeSnapshotVersion(r);
          n.vs = n.vs.insert(t, i);
        }
      }
    })(r.localStore, a));
}
async function g_(e, t) {
  let n = F(e);
  if (!n.currentUser.isEqual(t)) {
    M(Kg, `User change. New user:`, t.toKey());
    let e = await mh(n.localStore, t);
    ((n.currentUser = t),
      (function (e, t) {
        (e.mu.forEach((e) => {
          e.forEach((e) => {
            e.reject(new L(I.CANCELLED, t));
          });
        }),
          e.mu.clear());
      })(n, `'waitForPendingWrites' promise is rejected due to a user change.`),
      n.sharedClientState.handleUserChange(t, e.removedBatchIds, e.addedBatchIds),
      await h_(n, e.Ns));
  }
}
function __(e, t) {
  let n = F(e),
    r = n.Au.get(t);
  if (r && r.hu) return J().add(r.key);
  {
    let e = J(),
      r = n.Iu.get(t);
    if (!r) return e;
    for (let t of r) {
      let r = n.Tu.get(t);
      e = e.unionWith(r.view.nu);
    }
    return e;
  }
}
function v_(e) {
  let t = F(e);
  return (
    (t.remoteStore.remoteSyncer.applyRemoteEvent = r_.bind(null, t)),
    (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = __.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectListen = a_.bind(null, t)),
    (t.Pu.J_ = Lg.bind(null, t.eventManager)),
    (t.Pu.yu = Rg.bind(null, t.eventManager)),
    t
  );
}
function y_(e) {
  let t = F(e);
  return (
    (t.remoteStore.remoteSyncer.applySuccessfulWrite = o_.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectFailedWrite = s_.bind(null, t)),
    t
  );
}
var b_ = class {
  constructor() {
    ((this.kind = `memory`), (this.synchronizeTabs = !1));
  }
  async initialize(e) {
    ((this.serializer = Bh(e.databaseInfo.databaseId)),
      (this.sharedClientState = this.Du(e)),
      (this.persistence = this.Cu(e)),
      await this.persistence.start(),
      (this.localStore = this.vu(e)),
      (this.gcScheduler = this.Fu(e, this.localStore)),
      (this.indexBackfillerScheduler = this.Mu(e, this.localStore)));
  }
  Fu(e, t) {
    return null;
  }
  Mu(e, t) {
    return null;
  }
  vu(e) {
    return ph(this.persistence, new lh(), e.initialUser, this.serializer);
  }
  Cu(e) {
    return new rh(ah.Vi, this.serializer);
  }
  Du(e) {
    return new Th();
  }
  async terminate() {
    (this.gcScheduler?.stop(),
      this.indexBackfillerScheduler?.stop(),
      this.sharedClientState.shutdown(),
      await this.persistence.shutdown());
  }
};
b_.provider = { build: () => new b_() };
var x_ = class extends b_ {
    constructor(e) {
      (super(), (this.cacheSizeBytes = e));
    }
    Fu(e, t) {
      P(this.persistence.referenceDelegate instanceof oh, 46915);
      let n = this.persistence.referenceDelegate.garbageCollector;
      return new Um(n, e.asyncQueue, t);
    }
    Cu(e) {
      let t = this.cacheSizeBytes === void 0 ? Lm.DEFAULT : Lm.withCacheSize(this.cacheSizeBytes);
      return new rh((e) => oh.Vi(e, t), this.serializer);
    }
  },
  S_ = class {
    async initialize(e, t) {
      this.localStore ||
        ((this.localStore = e.localStore),
        (this.sharedClientState = e.sharedClientState),
        (this.datastore = this.createDatastore(t)),
        (this.remoteStore = this.createRemoteStore(t)),
        (this.eventManager = this.createEventManager(t)),
        (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
        (this.sharedClientState.onlineStateHandler = (e) => i_(this.syncEngine, e, 1)),
        (this.remoteStore.remoteSyncer.handleCredentialChange = g_.bind(null, this.syncEngine)),
        await wg(this.remoteStore, this.syncEngine.isPrimaryClient));
    }
    createEventManager(e) {
      return (function () {
        return new Ng();
      })();
    }
    createDatastore(e) {
      let t = Bh(e.databaseInfo.databaseId),
        n = Rh(e.databaseInfo);
      return Jh(e.authCredentials, e.appCheckCredentials, n, t);
    }
    createRemoteStore(e) {
      return (function (e, t, n, r, i) {
        return new Zh(e, t, n, r, i);
      })(
        this.localStore,
        this.datastore,
        e.asyncQueue,
        (e) => i_(this.syncEngine, e, 0),
        (function () {
          return Oh.v() ? new Oh() : new Eh();
        })()
      );
    }
    createSyncEngine(e, t) {
      return (function (e, t, n, r, i, a, o) {
        let s = new Yg(e, t, n, r, i, a);
        return (o && (s.gu = !0), s);
      })(
        this.localStore,
        this.remoteStore,
        this.eventManager,
        this.sharedClientState,
        e.initialUser,
        e.maxConcurrentLimboResolutions,
        t
      );
    }
    async terminate() {
      (await (async function (e) {
        let t = F(e);
        (M(Xh, `RemoteStore shutting down.`),
          t.Ea.add(5),
          await $h(t),
          t.Aa.shutdown(),
          t.Va.set(`Unknown`));
      })(this.remoteStore),
        this.datastore?.terminate(),
        this.eventManager?.terminate());
    }
  };
S_.provider = { build: () => new S_() };
var C_ = class {
    constructor(e) {
      ((this.observer = e), (this.muted = !1));
    }
    next(e) {
      this.muted || (this.observer.next && this.Ou(this.observer.next, e));
    }
    error(e) {
      this.muted ||
        (this.observer.error
          ? this.Ou(this.observer.error, e)
          : Gl(`Uncaught Error in snapshot listener:`, e.toString()));
    }
    Nu() {
      this.muted = !0;
    }
    Ou(e, t) {
      setTimeout(() => {
        this.muted || e(t);
      }, 0);
    }
  },
  w_ = `FirestoreClient`,
  T_ = class {
    constructor(e, t, n, r, i) {
      ((this.authCredentials = e),
        (this.appCheckCredentials = t),
        (this.asyncQueue = n),
        (this._databaseInfo = r),
        (this.user = Bl.UNAUTHENTICATED),
        (this.clientId = au.newId()),
        (this.authCredentialListener = () => Promise.resolve()),
        (this.appCheckCredentialListener = () => Promise.resolve()),
        (this._uninitializedComponentsProvider = i),
        this.authCredentials.start(n, async (e) => {
          (M(w_, `Received user=`, e.uid), await this.authCredentialListener(e), (this.user = e));
        }),
        this.appCheckCredentials.start(
          n,
          (e) => (
            M(w_, `Received new app check token=`, e),
            this.appCheckCredentialListener(e, this.user)
          )
        ));
    }
    get configuration() {
      return {
        asyncQueue: this.asyncQueue,
        databaseInfo: this._databaseInfo,
        clientId: this.clientId,
        authCredentials: this.authCredentials,
        appCheckCredentials: this.appCheckCredentials,
        initialUser: this.user,
        maxConcurrentLimboResolutions: 100,
      };
    }
    setCredentialChangeListener(e) {
      this.authCredentialListener = e;
    }
    setAppCheckTokenChangeListener(e) {
      this.appCheckCredentialListener = e;
    }
    terminate() {
      this.asyncQueue.enterRestrictedMode();
      let e = new Yl();
      return (
        this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
          try {
            (this._onlineComponents && (await this._onlineComponents.terminate()),
              this._offlineComponents && (await this._offlineComponents.terminate()),
              this.authCredentials.shutdown(),
              this.appCheckCredentials.shutdown(),
              e.resolve());
          } catch (t) {
            let n = Og(t, `Failed to shutdown persistence`);
            e.reject(n);
          }
        }),
        e.promise
      );
    }
  };
async function E_(e, t) {
  (e.asyncQueue.verifyOperationInProgress(), M(w_, `Initializing OfflineComponentProvider`));
  let n = e.configuration;
  await t.initialize(n);
  let r = n.initialUser;
  (e.setCredentialChangeListener(async (e) => {
    r.isEqual(e) || (await mh(t.localStore, e), (r = e));
  }),
    t.persistence.setDatabaseDeletedListener(() => e.terminate()),
    (e._offlineComponents = t));
}
async function D_(e, t) {
  e.asyncQueue.verifyOperationInProgress();
  let n = await O_(e);
  (M(w_, `Initializing OnlineComponentProvider`),
    await t.initialize(n, e.configuration),
    e.setCredentialChangeListener((e) => Cg(t.remoteStore, e)),
    e.setAppCheckTokenChangeListener((e, n) => Cg(t.remoteStore, n)),
    (e._onlineComponents = t));
}
async function O_(e) {
  if (!e._offlineComponents)
    if (e._uninitializedComponentsProvider) {
      M(w_, `Using user provided OfflineComponentProvider`);
      try {
        await E_(e, e._uninitializedComponentsProvider._offline);
      } catch (t) {
        let n = t;
        if (
          !(function (e) {
            return e.name === `FirebaseError`
              ? e.code === I.FAILED_PRECONDITION || e.code === I.UNIMPLEMENTED
              : !(typeof DOMException < `u` && e instanceof DOMException) ||
                  e.code === 22 ||
                  e.code === 20 ||
                  e.code === 11;
          })(n)
        )
          throw n;
        (Kl(`Error using user provided cache. Falling back to memory cache: ` + n),
          await E_(e, new b_()));
      }
    } else (M(w_, `Using default OfflineComponentProvider`), await E_(e, new x_(void 0)));
  return e._offlineComponents;
}
async function k_(e) {
  return (
    e._onlineComponents ||
      (e._uninitializedComponentsProvider
        ? (M(w_, `Using user provided OnlineComponentProvider`),
          await D_(e, e._uninitializedComponentsProvider._online))
        : (M(w_, `Using default OnlineComponentProvider`), await D_(e, new S_()))),
    e._onlineComponents
  );
}
function A_(e) {
  return k_(e).then((e) => e.syncEngine);
}
async function j_(e) {
  let t = await k_(e),
    n = t.eventManager;
  return (
    (n.onListen = Xg.bind(null, t.syncEngine)),
    (n.onUnlisten = e_.bind(null, t.syncEngine)),
    (n.onFirstRemoteStoreListen = Zg.bind(null, t.syncEngine)),
    (n.onLastRemoteStoreUnlisten = t_.bind(null, t.syncEngine)),
    n
  );
}
function M_(e, t, n = {}) {
  let r = new Yl();
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function (e, t, n, r, i) {
        let a = new C_({
            next: (s) => {
              (a.Nu(), t.enqueueAndForget(() => Ig(e, o)));
              let c = s.docs.has(n);
              !c && s.fromCache
                ? i.reject(
                    new L(I.UNAVAILABLE, `Failed to get document because the client is offline.`)
                  )
                : c && s.fromCache && r && r.source === `server`
                  ? i.reject(
                      new L(
                        I.UNAVAILABLE,
                        `Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)`
                      )
                    )
                  : i.resolve(s);
            },
            error: (e) => i.reject(e),
          }),
          o = new Hg(gf(n.path), a, { includeMetadataChanges: !0, Ka: !0 });
        return Fg(e, o);
      })(await j_(e), e.asyncQueue, t, n, r)
    ),
    r.promise
  );
}
function N_(e, t, n = {}) {
  let r = new Yl();
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function (e, t, n, r, i) {
        let a = new C_({
            next: (n) => {
              (a.Nu(),
                t.enqueueAndForget(() => Ig(e, o)),
                n.fromCache && r.source === `server`
                  ? i.reject(
                      new L(
                        I.UNAVAILABLE,
                        `Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)`
                      )
                    )
                  : i.resolve(n));
            },
            error: (e) => i.reject(e),
          }),
          o = new Hg(n, a, { includeMetadataChanges: !0, Ka: !0 });
        return Fg(e, o);
      })(await j_(e), e.asyncQueue, t, n, r)
    ),
    r.promise
  );
}
function P_(e, t) {
  let n = new Yl();
  return (e.asyncQueue.enqueueAndForget(async () => n_(await A_(e), t, n)), n.promise);
}
function F_(e) {
  let t = {};
  return (e.timeoutSeconds !== void 0 && (t.timeoutSeconds = e.timeoutSeconds), t);
}
var I_ = `ComponentProvider`,
  L_ = new Map();
function R_(e, t, n, r, i) {
  return new dd(
    e,
    t,
    n,
    i.host,
    i.ssl,
    i.experimentalForceLongPolling,
    i.experimentalAutoDetectLongPolling,
    F_(i.experimentalLongPollingOptions),
    i.useFetchStreams,
    i.isUsingEmulator,
    r
  );
}
var z_ = `firestore.googleapis.com`,
  B_ = !0,
  V_ = class {
    constructor(e) {
      if (e.host === void 0) {
        if (e.ssl !== void 0)
          throw new L(I.INVALID_ARGUMENT, `Can't provide ssl option if host option is not set`);
        ((this.host = z_), (this.ssl = B_));
      } else ((this.host = e.host), (this.ssl = e.ssl ?? B_));
      if (
        ((this.isUsingEmulator = e.emulatorOptions !== void 0),
        (this.credentials = e.credentials),
        (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
        (this.localCache = e.localCache),
        e.cacheSizeBytes === void 0)
      )
        this.cacheSizeBytes = Im;
      else {
        if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < Bm)
          throw new L(I.INVALID_ARGUMENT, `cacheSizeBytes must be at least 1048576`);
        this.cacheSizeBytes = e.cacheSizeBytes;
      }
      (gu(
        `experimentalForceLongPolling`,
        e.experimentalForceLongPolling,
        `experimentalAutoDetectLongPolling`,
        e.experimentalAutoDetectLongPolling
      ),
        (this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
        this.experimentalForceLongPolling
          ? (this.experimentalAutoDetectLongPolling = !1)
          : e.experimentalAutoDetectLongPolling === void 0
            ? (this.experimentalAutoDetectLongPolling = !0)
            : (this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling),
        (this.experimentalLongPollingOptions = F_(e.experimentalLongPollingOptions ?? {})),
        (function (e) {
          if (e.timeoutSeconds !== void 0) {
            if (isNaN(e.timeoutSeconds))
              throw new L(
                I.INVALID_ARGUMENT,
                `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`
              );
            if (e.timeoutSeconds < 5)
              throw new L(
                I.INVALID_ARGUMENT,
                `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`
              );
            if (e.timeoutSeconds > 30)
              throw new L(
                I.INVALID_ARGUMENT,
                `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`
              );
          }
        })(this.experimentalLongPollingOptions),
        (this.useFetchStreams = !!e.useFetchStreams));
    }
    isEqual(e) {
      return (
        this.host === e.host &&
        this.ssl === e.ssl &&
        this.credentials === e.credentials &&
        this.cacheSizeBytes === e.cacheSizeBytes &&
        this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
        this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling &&
        (function (e, t) {
          return e.timeoutSeconds === t.timeoutSeconds;
        })(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) &&
        this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
        this.useFetchStreams === e.useFetchStreams
      );
    }
  },
  H_ = class {
    constructor(e, t, n, r) {
      ((this._authCredentials = e),
        (this._appCheckCredentials = t),
        (this._databaseId = n),
        (this._app = r),
        (this.type = `firestore-lite`),
        (this._persistenceKey = `(lite)`),
        (this._settings = new V_({})),
        (this._settingsFrozen = !1),
        (this._emulatorOptions = {}),
        (this._terminateTask = `notTerminated`));
    }
    get app() {
      if (!this._app)
        throw new L(
          I.FAILED_PRECONDITION,
          `Firestore was not initialized using the Firebase SDK. 'app' is not available`
        );
      return this._app;
    }
    get _initialized() {
      return this._settingsFrozen;
    }
    get _terminated() {
      return this._terminateTask !== `notTerminated`;
    }
    _setSettings(e) {
      if (this._settingsFrozen)
        throw new L(
          I.FAILED_PRECONDITION,
          `Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.`
        );
      ((this._settings = new V_(e)),
        (this._emulatorOptions = e.emulatorOptions || {}),
        e.credentials !== void 0 &&
          (this._authCredentials = (function (e) {
            if (!e) return new Zl();
            switch (e.type) {
              case `firstParty`:
                return new tu(
                  e.sessionIndex || `0`,
                  e.iamToken || null,
                  e.authTokenFactory || null
                );
              case `provider`:
                return e.client;
              default:
                throw new L(
                  I.INVALID_ARGUMENT,
                  `makeAuthCredentialsProvider failed due to invalid credential type`
                );
            }
          })(e.credentials)));
    }
    _getSettings() {
      return this._settings;
    }
    _getEmulatorOptions() {
      return this._emulatorOptions;
    }
    _freezeSettings() {
      return ((this._settingsFrozen = !0), this._settings);
    }
    _delete() {
      return (
        this._terminateTask === `notTerminated` && (this._terminateTask = this._terminate()),
        this._terminateTask
      );
    }
    async _restart() {
      this._terminateTask === `notTerminated`
        ? await this._terminate()
        : (this._terminateTask = `notTerminated`);
    }
    toJSON() {
      return { app: this._app, databaseId: this._databaseId, settings: this._settings };
    }
    _terminate() {
      return (
        (function (e) {
          let t = L_.get(e);
          t && (M(I_, `Removing Datastore`), L_.delete(e), t.terminate());
        })(this),
        Promise.resolve()
      );
    }
  };
function U_(e, t, n, r = {}) {
  e = xu(e, H_);
  let i = te(t),
    a = e._getSettings(),
    o = { ...a, emulatorOptions: e._getEmulatorOptions() },
    s = `${t}:${n}`;
  (i && (ne(`https://${s}`), ce(`Firestore`, !0)),
    a.host !== z_ &&
      a.host !== s &&
      Kl(
        `Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.`
      ));
  let c = { ...a, host: s, ssl: i, emulatorOptions: r };
  if (!we(c, o) && (e._setSettings(c), r.mockUserToken)) {
    let t, n;
    if (typeof r.mockUserToken == `string`) ((t = r.mockUserToken), (n = Bl.MOCK_USER));
    else {
      t = re(r.mockUserToken, e._app?.options.projectId);
      let i = r.mockUserToken.sub || r.mockUserToken.user_id;
      if (!i)
        throw new L(I.INVALID_ARGUMENT, `mockUserToken must contain 'sub' or 'user_id' field!`);
      n = new Bl(i);
    }
    e._authCredentials = new Ql(new Xl(t, n));
  }
}
var W_ = class e {
    constructor(e, t, n) {
      ((this.converter = t), (this._query = n), (this.type = `query`), (this.firestore = e));
    }
    withConverter(t) {
      return new e(this.firestore, t, this._query);
    }
  },
  G_ = class e {
    constructor(e, t, n) {
      ((this.converter = t), (this._key = n), (this.type = `document`), (this.firestore = e));
    }
    get _path() {
      return this._key.path;
    }
    get id() {
      return this._key.path.lastSegment();
    }
    get path() {
      return this._key.path.canonicalString();
    }
    get parent() {
      return new K_(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(t) {
      return new e(this.firestore, t, this._key);
    }
    toJSON() {
      return { type: e._jsonSchemaVersion, referencePath: this._key.toString() };
    }
    static fromJSON(t, n, r) {
      if (Su(n, e._jsonSchema)) return new e(t, r || null, new B(z.fromString(n.referencePath)));
    }
  };
((G_._jsonSchemaVersion = `firestore/documentReference/1.0`),
  (G_._jsonSchema = { type: V(`string`, G_._jsonSchemaVersion), referencePath: V(`string`) }));
var K_ = class e extends W_ {
  constructor(e, t, n) {
    (super(e, t, gf(n)), (this._path = n), (this.type = `collection`));
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    let e = this._path.popLast();
    return e.isEmpty() ? null : new G_(this.firestore, null, new B(e));
  }
  withConverter(t) {
    return new e(this.firestore, t, this._path);
  }
};
function q_(e, t, ...n) {
  if (((e = b(e)), hu(`collection`, `path`, t), e instanceof H_)) {
    let r = z.fromString(t, ...n);
    return (vu(r), new K_(e, null, r));
  }
  {
    if (!(e instanceof G_ || e instanceof K_))
      throw new L(
        I.INVALID_ARGUMENT,
        `Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore`
      );
    let r = e._path.child(z.fromString(t, ...n));
    return (vu(r), new K_(e.firestore, null, r));
  }
}
function J_(e, t, ...n) {
  if (
    ((e = b(e)), arguments.length === 1 && (t = au.newId()), hu(`doc`, `path`, t), e instanceof H_)
  ) {
    let r = z.fromString(t, ...n);
    return (_u(r), new G_(e, null, new B(r)));
  }
  {
    if (!(e instanceof G_ || e instanceof K_))
      throw new L(
        I.INVALID_ARGUMENT,
        `Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore`
      );
    let r = e._path.child(z.fromString(t, ...n));
    return (_u(r), new G_(e.firestore, e instanceof K_ ? e.converter : null, new B(r)));
  }
}
var Y_ = `AsyncQueue`,
  X_ = class {
    constructor(e = Promise.resolve()) {
      ((this.Yu = []),
        (this.ec = !1),
        (this.tc = []),
        (this.nc = null),
        (this.rc = !1),
        (this.sc = !1),
        (this.oc = []),
        (this.M_ = new Vh(this, `async_queue_retry`)),
        (this._c = () => {
          let e = zh();
          (e && M(Y_, `Visibility state changed to ` + e.visibilityState), this.M_.w_());
        }),
        (this.ac = e));
      let t = zh();
      t &&
        typeof t.addEventListener == `function` &&
        t.addEventListener(`visibilitychange`, this._c);
    }
    get isShuttingDown() {
      return this.ec;
    }
    enqueueAndForget(e) {
      this.enqueue(e);
    }
    enqueueAndForgetEvenWhileRestricted(e) {
      (this.uc(), this.cc(e));
    }
    enterRestrictedMode(e) {
      if (!this.ec) {
        ((this.ec = !0), (this.sc = e || !1));
        let t = zh();
        t &&
          typeof t.removeEventListener == `function` &&
          t.removeEventListener(`visibilitychange`, this._c);
      }
    }
    enqueue(e) {
      if ((this.uc(), this.ec)) return new Promise(() => {});
      let t = new Yl();
      return this.cc(() =>
        this.ec && this.sc ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise)
      ).then(() => t.promise);
    }
    enqueueRetryable(e) {
      this.enqueueAndForget(() => (this.Yu.push(e), this.lc()));
    }
    async lc() {
      if (this.Yu.length !== 0) {
        try {
          (await this.Yu[0](), this.Yu.shift(), this.M_.reset());
        } catch (e) {
          if (!Fu(e)) throw e;
          M(Y_, `Operation failed with retryable error: ` + e);
        }
        this.Yu.length > 0 && this.M_.p_(() => this.lc());
      }
    }
    cc(e) {
      let t = this.ac.then(
        () => (
          (this.rc = !0),
          e()
            .catch((e) => {
              throw ((this.nc = e), (this.rc = !1), Gl(`INTERNAL UNHANDLED ERROR: `, Z_(e)), e);
            })
            .then((e) => ((this.rc = !1), e))
        )
      );
      return ((this.ac = t), t);
    }
    enqueueAfterDelay(e, t, n) {
      (this.uc(), this.oc.indexOf(e) > -1 && (t = 0));
      let r = Dg.createAndSchedule(this, e, t, n, (e) => this.hc(e));
      return (this.tc.push(r), r);
    }
    uc() {
      this.nc && N(47125, { Pc: Z_(this.nc) });
    }
    verifyOperationInProgress() {}
    async Tc() {
      let e;
      do ((e = this.ac), await e);
      while (e !== this.ac);
    }
    Ic(e) {
      for (let t of this.tc) if (t.timerId === e) return !0;
      return !1;
    }
    Ec(e) {
      return this.Tc().then(() => {
        this.tc.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
        for (let t of this.tc) if ((t.skipDelay(), e !== `all` && t.timerId === e)) break;
        return this.Tc();
      });
    }
    Rc(e) {
      this.oc.push(e);
    }
    hc(e) {
      let t = this.tc.indexOf(e);
      this.tc.splice(t, 1);
    }
  };
function Z_(e) {
  let t = e.message || ``;
  return (
    e.stack &&
      (t = e.stack.includes(e.message)
        ? e.stack
        : e.message +
          `
` +
          e.stack),
    t
  );
}
var Q_ = class extends H_ {
  constructor(e, t, n, r) {
    (super(e, t, n, r),
      (this.type = `firestore`),
      (this._queue = new X_()),
      (this._persistenceKey = r?.name || `[DEFAULT]`));
  }
  async _terminate() {
    if (this._firestoreClient) {
      let e = this._firestoreClient.terminate();
      ((this._queue = new X_(e)), (this._firestoreClient = void 0), await e);
    }
  }
};
function $_(e, t) {
  let n = typeof e == `object` ? e : sn(),
    r = typeof e == `string` ? e : t || fd,
    i = tn(n, `firestore`).getImmediate({ identifier: r });
  if (!i._initialized) {
    let e = m(`firestore`);
    e && U_(i, ...e);
  }
  return i;
}
function ev(e) {
  if (e._terminated) throw new L(I.FAILED_PRECONDITION, `The client has already been terminated.`);
  return (e._firestoreClient || tv(e), e._firestoreClient);
}
function tv(e) {
  let t = e._freezeSettings(),
    n = R_(
      e._databaseId,
      e._app?.options.appId || ``,
      e._persistenceKey,
      e._app?.options.apiKey,
      t
    );
  (e._componentsProvider ||
    (t.localCache?._offlineComponentProvider &&
      t.localCache?._onlineComponentProvider &&
      (e._componentsProvider = {
        _offline: t.localCache._offlineComponentProvider,
        _online: t.localCache._onlineComponentProvider,
      })),
    (e._firestoreClient = new T_(
      e._authCredentials,
      e._appCheckCredentials,
      e._queue,
      n,
      e._componentsProvider &&
        (function (e) {
          let t = e?._online.build();
          return { _offline: e?._offline.build(t), _online: t };
        })(e._componentsProvider)
    )));
}
var nv = class e {
  constructor(e) {
    this._byteString = e;
  }
  static fromBase64String(t) {
    try {
      return new e(ed.fromBase64String(t));
    } catch (e) {
      throw new L(I.INVALID_ARGUMENT, `Failed to construct data from Base64 string: ` + e);
    }
  }
  static fromUint8Array(t) {
    return new e(ed.fromUint8Array(t));
  }
  toBase64() {
    return this._byteString.toBase64();
  }
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  toString() {
    return `Bytes(base64: ` + this.toBase64() + `)`;
  }
  isEqual(e) {
    return this._byteString.isEqual(e._byteString);
  }
  toJSON() {
    return { type: e._jsonSchemaVersion, bytes: this.toBase64() };
  }
  static fromJSON(t) {
    if (Su(t, e._jsonSchema)) return e.fromBase64String(t.bytes);
  }
};
((nv._jsonSchemaVersion = `firestore/bytes/1.0`),
  (nv._jsonSchema = { type: V(`string`, nv._jsonSchemaVersion), bytes: V(`string`) }));
var rv = class {
    constructor(...e) {
      for (let t = 0; t < e.length; ++t)
        if (e[t].length === 0)
          throw new L(
            I.INVALID_ARGUMENT,
            `Invalid field name at argument $(i + 1). Field names must not be empty.`
          );
      this._internalPath = new mu(e);
    }
    isEqual(e) {
      return this._internalPath.isEqual(e._internalPath);
    }
  },
  iv = class {
    constructor(e) {
      this._methodName = e;
    }
  },
  av = class e {
    constructor(e, t) {
      if (!isFinite(e) || e < -90 || e > 90)
        throw new L(
          I.INVALID_ARGUMENT,
          `Latitude must be a number between -90 and 90, but was: ` + e
        );
      if (!isFinite(t) || t < -180 || t > 180)
        throw new L(
          I.INVALID_ARGUMENT,
          `Longitude must be a number between -180 and 180, but was: ` + t
        );
      ((this._lat = e), (this._long = t));
    }
    get latitude() {
      return this._lat;
    }
    get longitude() {
      return this._long;
    }
    isEqual(e) {
      return this._lat === e._lat && this._long === e._long;
    }
    _compareTo(e) {
      return R(this._lat, e._lat) || R(this._long, e._long);
    }
    toJSON() {
      return { latitude: this._lat, longitude: this._long, type: e._jsonSchemaVersion };
    }
    static fromJSON(t) {
      if (Su(t, e._jsonSchema)) return new e(t.latitude, t.longitude);
    }
  };
((av._jsonSchemaVersion = `firestore/geoPoint/1.0`),
  (av._jsonSchema = {
    type: V(`string`, av._jsonSchemaVersion),
    latitude: V(`number`),
    longitude: V(`number`),
  }));
var ov = class e {
  constructor(e) {
    this._values = (e || []).map((e) => e);
  }
  toArray() {
    return this._values.map((e) => e);
  }
  isEqual(e) {
    return (function (e, t) {
      if (e.length !== t.length) return !1;
      for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
      return !0;
    })(this._values, e._values);
  }
  toJSON() {
    return { type: e._jsonSchemaVersion, vectorValues: this._values };
  }
  static fromJSON(t) {
    if (Su(t, e._jsonSchema)) {
      if (Array.isArray(t.vectorValues) && t.vectorValues.every((e) => typeof e == `number`))
        return new e(t.vectorValues);
      throw new L(I.INVALID_ARGUMENT, `Expected 'vectorValues' field to be a number array`);
    }
  }
};
((ov._jsonSchemaVersion = `firestore/vectorValue/1.0`),
  (ov._jsonSchema = { type: V(`string`, ov._jsonSchemaVersion), vectorValues: V(`object`) }));
var sv = /^__.*__$/,
  cv = class {
    constructor(e, t, n) {
      ((this.data = e), (this.fieldMask = t), (this.fieldTransforms = n));
    }
    toMutation(e, t) {
      return this.fieldMask === null
        ? new vp(e, this.data, t, this.fieldTransforms)
        : new yp(e, this.data, this.fieldMask, t, this.fieldTransforms);
    }
  },
  lv = class {
    constructor(e, t, n) {
      ((this.data = e), (this.fieldMask = t), (this.fieldTransforms = n));
    }
    toMutation(e, t) {
      return new yp(e, this.data, this.fieldMask, t, this.fieldTransforms);
    }
  };
function uv(e) {
  switch (e) {
    case 0:
    case 2:
    case 1:
      return !0;
    case 3:
    case 4:
      return !1;
    default:
      throw N(40011, { dataSource: e });
  }
}
var dv = class e {
    constructor(e, t, n, r, i, a) {
      ((this.settings = e),
        (this.databaseId = t),
        (this.serializer = n),
        (this.ignoreUndefinedProperties = r),
        i === void 0 && this.validatePath(),
        (this.fieldTransforms = i || []),
        (this.fieldMask = a || []));
    }
    get path() {
      return this.settings.path;
    }
    get dataSource() {
      return this.settings.dataSource;
    }
    contextWith(t) {
      return new e(
        { ...this.settings, ...t },
        this.databaseId,
        this.serializer,
        this.ignoreUndefinedProperties,
        this.fieldTransforms,
        this.fieldMask
      );
    }
    childContextForField(e) {
      let t = this.path?.child(e),
        n = this.contextWith({ path: t, arrayElement: !1 });
      return (n.validatePathSegment(e), n);
    }
    childContextForFieldPath(e) {
      let t = this.path?.child(e),
        n = this.contextWith({ path: t, arrayElement: !1 });
      return (n.validatePath(), n);
    }
    childContextForArray(e) {
      return this.contextWith({ path: void 0, arrayElement: !0 });
    }
    createError(e) {
      return Dv(
        e,
        this.settings.methodName,
        this.settings.hasConverter || !1,
        this.path,
        this.settings.targetDoc
      );
    }
    contains(e) {
      return (
        this.fieldMask.find((t) => e.isPrefixOf(t)) !== void 0 ||
        this.fieldTransforms.find((t) => e.isPrefixOf(t.field)) !== void 0
      );
    }
    validatePath() {
      if (this.path)
        for (let e = 0; e < this.path.length; e++) this.validatePathSegment(this.path.get(e));
    }
    validatePathSegment(e) {
      if (e.length === 0) throw this.createError(`Document fields must not be empty`);
      if (uv(this.dataSource) && sv.test(e))
        throw this.createError(`Document fields cannot begin and end with "__"`);
    }
  },
  fv = class {
    constructor(e, t, n) {
      ((this.databaseId = e), (this.ignoreUndefinedProperties = t), (this.serializer = n || Bh(e)));
    }
    createContext(e, t, n, r = !1) {
      return new dv(
        {
          dataSource: e,
          methodName: t,
          targetDoc: n,
          path: mu.emptyPath(),
          arrayElement: !1,
          hasConverter: r,
        },
        this.databaseId,
        this.serializer,
        this.ignoreUndefinedProperties
      );
    }
  };
function pv(e) {
  let t = e._freezeSettings(),
    n = Bh(e._databaseId);
  return new fv(e._databaseId, !!t.ignoreUndefinedProperties, n);
}
function mv(e, t, n, r, i, a = {}) {
  let o = e.createContext(a.merge || a.mergeFields ? 2 : 0, t, n, i);
  Cv(`Data must be an object, but it was:`, o, r);
  let s = xv(r, o),
    c,
    l;
  if (a.merge) ((c = new Qu(o.fieldMask)), (l = o.fieldTransforms));
  else if (a.mergeFields) {
    let e = [];
    for (let r of a.mergeFields) {
      let i = wv(t, r, n);
      if (!o.contains(i))
        throw new L(
          I.INVALID_ARGUMENT,
          `Field '${i}' is specified in your field mask but missing from your input data.`
        );
      Ov(e, i) || e.push(i);
    }
    ((c = new Qu(e)), (l = o.fieldTransforms.filter((e) => c.covers(e.field))));
  } else ((c = null), (l = o.fieldTransforms));
  return new cv(new Rd(s), c, l);
}
var hv = class e extends iv {
    _toFieldTransform(e) {
      if (e.dataSource !== 2)
        throw e.dataSource === 1
          ? e.createError(
              `${this._methodName}() can only appear at the top level of your update data`
            )
          : e.createError(
              `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
            );
      return (e.fieldMask.push(e.path), null);
    }
    isEqual(t) {
      return t instanceof e;
    }
  },
  gv = class e extends iv {
    _toFieldTransform(e) {
      return new sp(e.path, new $f());
    }
    isEqual(t) {
      return t instanceof e;
    }
  };
function _v(e, t, n, r) {
  let i = e.createContext(1, t, n);
  Cv(`Data must be an object, but it was:`, i, r);
  let a = [],
    o = Rd.empty();
  return (
    Ku(r, (e, r) => {
      let s = Ev(t, e, n);
      r = b(r);
      let c = i.childContextForFieldPath(s);
      if (r instanceof hv) a.push(s);
      else {
        let e = bv(r, c);
        e != null && (a.push(s), o.set(s, e));
      }
    }),
    new lv(o, new Qu(a), i.fieldTransforms)
  );
}
function vv(e, t, n, r, i, a) {
  let o = e.createContext(1, t, n),
    s = [wv(t, r, n)],
    c = [i];
  if (a.length % 2 != 0)
    throw new L(
      I.INVALID_ARGUMENT,
      `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
    );
  for (let e = 0; e < a.length; e += 2) (s.push(wv(t, a[e])), c.push(a[e + 1]));
  let l = [],
    u = Rd.empty();
  for (let e = s.length - 1; e >= 0; --e)
    if (!Ov(l, s[e])) {
      let t = s[e],
        n = c[e];
      n = b(n);
      let r = o.childContextForFieldPath(t);
      if (n instanceof hv) l.push(t);
      else {
        let e = bv(n, r);
        e != null && (l.push(t), u.set(t, e));
      }
    }
  return new lv(u, new Qu(l), o.fieldTransforms);
}
function yv(e, t, n, r = !1) {
  return bv(n, e.createContext(r ? 4 : 3, t));
}
function bv(e, t) {
  if (Sv((e = b(e)))) return (Cv(`Unsupported field value:`, t, e), xv(e, t));
  if (e instanceof iv)
    return (
      (function (e, t) {
        if (!uv(t.dataSource))
          throw t.createError(`${e._methodName}() can only be used with update() and set()`);
        if (!t.path)
          throw t.createError(`${e._methodName}() is not currently supported inside arrays`);
        let n = e._toFieldTransform(t);
        n && t.fieldTransforms.push(n);
      })(e, t),
      null
    );
  if (e === void 0 && t.ignoreUndefinedProperties) return null;
  if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
    if (t.settings.arrayElement && t.dataSource !== 4)
      throw t.createError(`Nested arrays are not supported`);
    return (function (e, t) {
      let n = [],
        r = 0;
      for (let i of e) {
        let e = bv(i, t.childContextForArray(r));
        ((e ??= { nullValue: `NULL_VALUE` }), n.push(e), r++);
      }
      return { arrayValue: { values: n } };
    })(e, t);
  }
  return (function (e, t) {
    if ((e = b(e)) === null) return { nullValue: `NULL_VALUE` };
    if (typeof e == `number`) return Jf(t.serializer, e);
    if (typeof e == `boolean`) return { booleanValue: e };
    if (typeof e == `string`) return { stringValue: e };
    if (e instanceof Date) {
      let n = H.fromDate(e);
      return { timestampValue: Qp(t.serializer, n) };
    }
    if (e instanceof H) {
      let n = new H(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
      return { timestampValue: Qp(t.serializer, n) };
    }
    if (e instanceof av) return { geoPointValue: { latitude: e.latitude, longitude: e.longitude } };
    if (e instanceof nv) return { bytesValue: $p(t.serializer, e._byteString) };
    if (e instanceof G_) {
      let n = t.databaseId,
        r = e.firestore._databaseId;
      if (!r.isEqual(n))
        throw t.createError(
          `Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`
        );
      return { referenceValue: nm(e.firestore._databaseId || t.databaseId, e._key.path) };
    }
    if (e instanceof ov)
      return (function (e, t) {
        let n = e instanceof ov ? e.toArray() : e;
        return {
          mapValue: {
            fields: {
              [hd]: { stringValue: vd },
              [yd]: {
                arrayValue: {
                  values: n.map((e) => {
                    if (typeof e != `number`)
                      throw t.createError(`VectorValues must only contain numeric values.`);
                    return Kf(t.serializer, e);
                  }),
                },
              },
            },
          },
        };
      })(e, t);
    if (Om(e)) return e._toProto(t.serializer);
    throw t.createError(`Unsupported field value: ${bu(e)}`);
  })(e, t);
}
function xv(e, t) {
  let n = {};
  return (
    qu(e)
      ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
      : Ku(e, (e, r) => {
          let i = bv(r, t.childContextForField(e));
          i != null && (n[e] = i);
        }),
    { mapValue: { fields: n } }
  );
}
function Sv(e) {
  return !(
    typeof e != `object` ||
    !e ||
    e instanceof Array ||
    e instanceof Date ||
    e instanceof H ||
    e instanceof av ||
    e instanceof nv ||
    e instanceof G_ ||
    e instanceof iv ||
    e instanceof ov ||
    Om(e)
  );
}
function Cv(e, t, n) {
  if (!Sv(n) || !yu(n)) {
    let r = bu(n);
    throw r === `an object` ? t.createError(e + ` a custom object`) : t.createError(e + ` ` + r);
  }
}
function wv(e, t, n) {
  if ((t = b(t)) instanceof rv) return t._internalPath;
  if (typeof t == `string`) return Ev(e, t);
  throw Dv(`Field path arguments must be of type string or `, e, !1, void 0, n);
}
var Tv = RegExp(`[~\\*/\\[\\]]`);
function Ev(e, t, n) {
  if (t.search(Tv) >= 0)
    throw Dv(
      `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
      e,
      !1,
      void 0,
      n
    );
  try {
    return new rv(...t.split(`.`))._internalPath;
  } catch {
    throw Dv(
      `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      e,
      !1,
      void 0,
      n
    );
  }
}
function Dv(e, t, n, r, i) {
  let a = r && !r.isEmpty(),
    o = i !== void 0,
    s = `Function ${t}() called with invalid data`;
  (n && (s += " (via `toFirestore()`)"), (s += `. `));
  let c = ``;
  return (
    (a || o) &&
      ((c += ` (found`), a && (c += ` in field ${r}`), o && (c += ` in document ${i}`), (c += `)`)),
    new L(I.INVALID_ARGUMENT, s + e + c)
  );
}
function Ov(e, t) {
  return e.some((e) => e.isEqual(t));
}
var kv = class {
    convertValue(e, t = `none`) {
      switch (bd(e)) {
        case 0:
          return null;
        case 1:
          return e.booleanValue;
        case 2:
          return K(e.integerValue || e.doubleValue);
        case 3:
          return this.convertTimestamp(e.timestampValue);
        case 4:
          return this.convertServerTimestamp(e, t);
        case 5:
          return e.stringValue;
        case 6:
          return this.convertBytes(rd(e.bytesValue));
        case 7:
          return this.convertReference(e.referenceValue);
        case 8:
          return this.convertGeoPoint(e.geoPointValue);
        case 9:
          return this.convertArray(e.arrayValue, t);
        case 11:
          return this.convertObject(e.mapValue, t);
        case 10:
          return this.convertVectorValue(e.mapValue);
        default:
          throw N(62114, { value: e });
      }
    }
    convertObject(e, t) {
      return this.convertObjectMap(e.fields, t);
    }
    convertObjectMap(e, t = `none`) {
      let n = {};
      return (
        Ku(e, (e, r) => {
          n[e] = this.convertValue(r, t);
        }),
        n
      );
    }
    convertVectorValue(e) {
      let t = e.fields?.[yd].arrayValue?.values?.map((e) => K(e.doubleValue));
      return new ov(t);
    }
    convertGeoPoint(e) {
      return new av(K(e.latitude), K(e.longitude));
    }
    convertArray(e, t) {
      return (e.values || []).map((e) => this.convertValue(e, t));
    }
    convertServerTimestamp(e, t) {
      switch (t) {
        case `previous`:
          let n = ld(e);
          return n == null ? null : this.convertValue(n, t);
        case `estimate`:
          return this.convertTimestamp(ud(e));
        default:
          return null;
      }
    }
    convertTimestamp(e) {
      let t = nd(e);
      return new H(t.seconds, t.nanos);
    }
    convertDocumentKey(e, t) {
      let n = z.fromString(e);
      P(Dm(n), 9688, { name: e });
      let r = new pd(n.get(1), n.get(3)),
        i = new B(n.popFirst(5));
      return (
        r.isEqual(t) ||
          Gl(
            `Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
          ),
        i
      );
    }
  },
  Av = class extends kv {
    constructor(e) {
      (super(), (this.firestore = e));
    }
    convertBytes(e) {
      return new nv(e);
    }
    convertReference(e) {
      let t = this.convertDocumentKey(e, this.firestore._databaseId);
      return new G_(this.firestore, null, t);
    }
  };
function jv() {
  return new gv(`serverTimestamp`);
}
var Mv = `@firebase/firestore`,
  Nv = `4.10.0`,
  Pv = class {
    constructor(e, t, n, r, i) {
      ((this._firestore = e),
        (this._userDataWriter = t),
        (this._key = n),
        (this._document = r),
        (this._converter = i));
    }
    get id() {
      return this._key.path.lastSegment();
    }
    get ref() {
      return new G_(this._firestore, this._converter, this._key);
    }
    exists() {
      return this._document !== null;
    }
    data() {
      if (this._document) {
        if (this._converter) {
          let e = new Fv(this._firestore, this._userDataWriter, this._key, this._document, null);
          return this._converter.fromFirestore(e);
        }
        return this._userDataWriter.convertValue(this._document.data.value);
      }
    }
    _fieldsProto() {
      return this._document?.data.clone().value.mapValue.fields ?? void 0;
    }
    get(e) {
      if (this._document) {
        let t = this._document.data.field(wv(`DocumentSnapshot.get`, e));
        if (t !== null) return this._userDataWriter.convertValue(t);
      }
    }
  },
  Fv = class extends Pv {
    data() {
      return super.data();
    }
  };
function Iv(e) {
  if (e.limitType === `L` && e.explicitOrderBy.length === 0)
    throw new L(
      I.UNIMPLEMENTED,
      `limitToLast() queries require specifying at least one orderBy() clause`
    );
}
var Lv = class {},
  Rv = class extends Lv {};
function zv(e, t, ...n) {
  let r = [];
  (t instanceof Lv && r.push(t),
    (r = r.concat(n)),
    (function (e) {
      let t = e.filter((e) => e instanceof Hv).length,
        n = e.filter((e) => e instanceof Bv).length;
      if (t > 1 || (t > 0 && n > 0))
        throw new L(
          I.INVALID_ARGUMENT,
          "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`."
        );
    })(r));
  for (let t of r) e = t._apply(e);
  return e;
}
var Bv = class e extends Rv {
  constructor(e, t, n) {
    (super(), (this._field = e), (this._op = t), (this._value = n), (this.type = `where`));
  }
  static _create(t, n, r) {
    return new e(t, n, r);
  }
  _apply(e) {
    let t = this._parse(e);
    return (qv(e._query, t), new W_(e.firestore, e.converter, Cf(e._query, t)));
  }
  _parse(e) {
    let t = pv(e.firestore);
    return (function (e, t, n, r, i, a, o) {
      let s;
      if (i.isKeyField()) {
        if (a === `array-contains` || a === `array-contains-any`)
          throw new L(
            I.INVALID_ARGUMENT,
            `Invalid Query. You can't perform '${a}' queries on documentId().`
          );
        if (a === `in` || a === `not-in`) {
          Kv(o, a);
          let t = [];
          for (let n of o) t.push(Gv(r, e, n));
          s = { arrayValue: { values: t } };
        } else s = Gv(r, e, o);
      } else
        ((a !== `in` && a !== `not-in` && a !== `array-contains-any`) || Kv(o, a),
          (s = yv(n, t, o, a === `in` || a === `not-in`)));
      return q.create(i, a, s);
    })(e._query, `where`, t, e.firestore._databaseId, this._field, this._op, this._value);
  }
};
function Vv(e, t, n) {
  let r = t,
    i = wv(`where`, e);
  return Bv._create(i, r, n);
}
var Hv = class e extends Lv {
    constructor(e, t) {
      (super(), (this.type = e), (this._queryConstraints = t));
    }
    static _create(t, n) {
      return new e(t, n);
    }
    _parse(e) {
      let t = this._queryConstraints
        .map((t) => t._parse(e))
        .filter((e) => e.getFilters().length > 0);
      return t.length === 1 ? t[0] : qd.create(t, this._getOperator());
    }
    _apply(e) {
      let t = this._parse(e);
      return t.getFilters().length === 0
        ? e
        : ((function (e, t) {
            let n = e,
              r = t.getFlattenedFilters();
            for (let e of r) (qv(n, e), (n = Cf(n, e)));
          })(e._query, t),
          new W_(e.firestore, e.converter, Cf(e._query, t)));
    }
    _getQueryConstraints() {
      return this._queryConstraints;
    }
    _getOperator() {
      return this.type === `and` ? `and` : `or`;
    }
  },
  Uv = class e extends Rv {
    constructor(e, t) {
      (super(), (this._field = e), (this._direction = t), (this.type = `orderBy`));
    }
    static _create(t, n) {
      return new e(t, n);
    }
    _apply(e) {
      let t = (function (e, t, n) {
        if (e.startAt !== null)
          throw new L(
            I.INVALID_ARGUMENT,
            `Invalid query. You must not call startAt() or startAfter() before calling orderBy().`
          );
        if (e.endAt !== null)
          throw new L(
            I.INVALID_ARGUMENT,
            `Invalid query. You must not call endAt() or endBefore() before calling orderBy().`
          );
        return new Wd(t, n);
      })(e._query, this._field, this._direction);
      return new W_(e.firestore, e.converter, wf(e._query, t));
    }
  };
function Wv(e, t = `asc`) {
  let n = t,
    r = wv(`orderBy`, e);
  return Uv._create(r, n);
}
function Gv(e, t, n) {
  if (typeof (n = b(n)) == `string`) {
    if (n === ``)
      throw new L(
        I.INVALID_ARGUMENT,
        `Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.`
      );
    if (!yf(t) && n.indexOf(`/`) !== -1)
      throw new L(
        I.INVALID_ARGUMENT,
        `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
      );
    let r = t.path.child(z.fromString(n));
    if (!B.isDocumentKey(r))
      throw new L(
        I.INVALID_ARGUMENT,
        `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`
      );
    return kd(e, new B(r));
  }
  if (n instanceof G_) return kd(e, n._key);
  throw new L(
    I.INVALID_ARGUMENT,
    `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${bu(n)}.`
  );
}
function Kv(e, t) {
  if (!Array.isArray(e) || e.length === 0)
    throw new L(
      I.INVALID_ARGUMENT,
      `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
    );
}
function qv(e, t) {
  let n = (function (e, t) {
    for (let n of e) for (let e of n.getFlattenedFilters()) if (t.indexOf(e.op) >= 0) return e.op;
    return null;
  })(
    e.filters,
    (function (e) {
      switch (e) {
        case `!=`:
          return [`!=`, `not-in`];
        case `array-contains-any`:
        case `in`:
          return [`not-in`];
        case `not-in`:
          return [`array-contains-any`, `in`, `not-in`, `!=`];
        default:
          return [];
      }
    })(t.op)
  );
  if (n !== null)
    throw n === t.op
      ? new L(
          I.INVALID_ARGUMENT,
          `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
        )
      : new L(
          I.INVALID_ARGUMENT,
          `Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`
        );
}
function Jv(e, t, n) {
  let r;
  return (
    (r = e ? (n && (n.merge || n.mergeFields) ? e.toFirestore(t, n) : e.toFirestore(t)) : t),
    r
  );
}
var Yv = class {
    constructor(e, t) {
      ((this.hasPendingWrites = e), (this.fromCache = t));
    }
    isEqual(e) {
      return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
    }
  },
  Xv = class e extends Pv {
    constructor(e, t, n, r, i, a) {
      (super(e, t, n, r, a), (this._firestore = e), (this._firestoreImpl = e), (this.metadata = i));
    }
    exists() {
      return super.exists();
    }
    data(e = {}) {
      if (this._document) {
        if (this._converter) {
          let t = new Zv(
            this._firestore,
            this._userDataWriter,
            this._key,
            this._document,
            this.metadata,
            null
          );
          return this._converter.fromFirestore(t, e);
        }
        return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
      }
    }
    get(e, t = {}) {
      if (this._document) {
        let n = this._document.data.field(wv(`DocumentSnapshot.get`, e));
        if (n !== null) return this._userDataWriter.convertValue(n, t.serverTimestamps);
      }
    }
    toJSON() {
      if (this.metadata.hasPendingWrites)
        throw new L(
          I.FAILED_PRECONDITION,
          `DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().`
        );
      let t = this._document,
        n = {};
      return (
        (n.type = e._jsonSchemaVersion),
        (n.bundle = ``),
        (n.bundleSource = `DocumentSnapshot`),
        (n.bundleName = this._key.toString()),
        !t || !t.isValidDocument() || !t.isFoundDocument()
          ? n
          : (this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields, `previous`),
            (n.bundle = (this._firestore, this.ref.path, `NOT SUPPORTED`)),
            n)
      );
    }
  };
((Xv._jsonSchemaVersion = `firestore/documentSnapshot/1.0`),
  (Xv._jsonSchema = {
    type: V(`string`, Xv._jsonSchemaVersion),
    bundleSource: V(`string`, `DocumentSnapshot`),
    bundleName: V(`string`),
    bundle: V(`string`),
  }));
var Zv = class extends Xv {
    data(e = {}) {
      return super.data(e);
    }
  },
  Qv = class e {
    constructor(e, t, n, r) {
      ((this._firestore = e),
        (this._userDataWriter = t),
        (this._snapshot = r),
        (this.metadata = new Yv(r.hasPendingWrites, r.fromCache)),
        (this.query = n));
    }
    get docs() {
      let e = [];
      return (this.forEach((t) => e.push(t)), e);
    }
    get size() {
      return this._snapshot.docs.size;
    }
    get empty() {
      return this.size === 0;
    }
    forEach(e, t) {
      this._snapshot.docs.forEach((n) => {
        e.call(
          t,
          new Zv(
            this._firestore,
            this._userDataWriter,
            n.key,
            n,
            new Yv(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache),
            this.query.converter
          )
        );
      });
    }
    docChanges(e = {}) {
      let t = !!e.includeMetadataChanges;
      if (t && this._snapshot.excludesMetadataChanges)
        throw new L(
          I.INVALID_ARGUMENT,
          `To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().`
        );
      return (
        (this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t) ||
          ((this._cachedChanges = (function (e, t) {
            if (e._snapshot.oldDocs.isEmpty()) {
              let t = 0;
              return e._snapshot.docChanges.map((n) => {
                let r = new Zv(
                  e._firestore,
                  e._userDataWriter,
                  n.doc.key,
                  n.doc,
                  new Yv(e._snapshot.mutatedKeys.has(n.doc.key), e._snapshot.fromCache),
                  e.query.converter
                );
                return (n.doc, { type: `added`, doc: r, oldIndex: -1, newIndex: t++ });
              });
            }
            {
              let n = e._snapshot.oldDocs;
              return e._snapshot.docChanges
                .filter((e) => t || e.type !== 3)
                .map((t) => {
                  let r = new Zv(
                      e._firestore,
                      e._userDataWriter,
                      t.doc.key,
                      t.doc,
                      new Yv(e._snapshot.mutatedKeys.has(t.doc.key), e._snapshot.fromCache),
                      e.query.converter
                    ),
                    i = -1,
                    a = -1;
                  return (
                    t.type !== 0 && ((i = n.indexOf(t.doc.key)), (n = n.delete(t.doc.key))),
                    t.type !== 1 && ((n = n.add(t.doc)), (a = n.indexOf(t.doc.key))),
                    { type: $v(t.type), doc: r, oldIndex: i, newIndex: a }
                  );
                });
            }
          })(this, t)),
          (this._cachedChangesIncludeMetadataChanges = t)),
        this._cachedChanges
      );
    }
    toJSON() {
      if (this.metadata.hasPendingWrites)
        throw new L(
          I.FAILED_PRECONDITION,
          `QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().`
        );
      let t = {};
      ((t.type = e._jsonSchemaVersion),
        (t.bundleSource = `QuerySnapshot`),
        (t.bundleName = au.newId()),
        this._firestore._databaseId.database,
        this._firestore._databaseId.projectId);
      let n = [],
        r = [],
        i = [];
      return (
        this.docs.forEach((e) => {
          e._document !== null &&
            (n.push(e._document),
            r.push(
              this._userDataWriter.convertObjectMap(
                e._document.data.value.mapValue.fields,
                `previous`
              )
            ),
            i.push(e.ref.path));
        }),
        (t.bundle = (this._firestore, this.query._query, t.bundleName, `NOT SUPPORTED`)),
        t
      );
    }
  };
function $v(e) {
  switch (e) {
    case 0:
      return `added`;
    case 2:
    case 3:
      return `modified`;
    case 1:
      return `removed`;
    default:
      return N(61501, { type: e });
  }
}
((Qv._jsonSchemaVersion = `firestore/querySnapshot/1.0`),
  (Qv._jsonSchema = {
    type: V(`string`, Qv._jsonSchemaVersion),
    bundleSource: V(`string`, `QuerySnapshot`),
    bundleName: V(`string`),
    bundle: V(`string`),
  }));
function ey(e) {
  e = xu(e, G_);
  let t = xu(e.firestore, Q_);
  return M_(ev(t), e._key).then((n) => sy(t, e, n));
}
function ty(e) {
  e = xu(e, W_);
  let t = xu(e.firestore, Q_),
    n = ev(t),
    r = new Av(t);
  return (Iv(e._query), N_(n, e._query).then((n) => new Qv(t, r, e, n)));
}
function ny(e, t, n) {
  e = xu(e, G_);
  let r = xu(e.firestore, Q_),
    i = Jv(e.converter, t, n);
  return oy(r, [
    mv(pv(r), `setDoc`, e._key, i, e.converter !== null, n).toMutation(e._key, up.none()),
  ]);
}
function ry(e, t, n, ...r) {
  e = xu(e, G_);
  let i = xu(e.firestore, Q_),
    a = pv(i),
    o;
  return (
    (o =
      typeof (t = b(t)) == `string` || t instanceof rv
        ? vv(a, `updateDoc`, e._key, t, n, r)
        : _v(a, `updateDoc`, e._key, t)),
    oy(i, [o.toMutation(e._key, up.exists(!0))])
  );
}
function iy(e) {
  return oy(xu(e.firestore, Q_), [new Cp(e._key, up.none())]);
}
function ay(e, t) {
  let n = xu(e.firestore, Q_),
    r = J_(e),
    i = Jv(e.converter, t);
  return oy(n, [
    mv(pv(e.firestore), `addDoc`, r._key, i, e.converter !== null, {}).toMutation(
      r._key,
      up.exists(!1)
    ),
  ]).then(() => r);
}
function oy(e, t) {
  return P_(ev(e), t);
}
function sy(e, t, n) {
  let r = n.docs.get(t._key);
  return new Xv(e, new Av(e), t._key, r, new Yv(n.hasPendingWrites, n.fromCache), t.converter);
}
(function (e, t = !0) {
  (Hl(an),
    en(
      new Le(
        `firestore`,
        (e, { instanceIdentifier: n, options: r }) => {
          let i = e.getProvider(`app`).getImmediate(),
            a = new Q_(
              new $l(e.getProvider(`auth-internal`)),
              new ru(i, e.getProvider(`app-check-internal`)),
              md(i, n),
              i
            );
          return ((r = { useFetchStreams: t, ...r }), a._setSettings(r), a);
        },
        `PUBLIC`
      ).setMultipleInstances(!0)
    ),
    T(Mv, Nv, e),
    T(Mv, Nv, `esm2020`));
})();
var cy = `firebasestorage.googleapis.com`,
  ly = `storageBucket`,
  uy = 120 * 1e3,
  dy = 600 * 1e3,
  Q = class e extends ye {
    constructor(t, n, r = 0) {
      (super(fy(t), `Firebase Storage: ${n} (${fy(t)})`),
        (this.status_ = r),
        (this.customData = { serverResponse: null }),
        (this._baseMessage = this.message),
        Object.setPrototypeOf(this, e.prototype));
    }
    get status() {
      return this.status_;
    }
    set status(e) {
      this.status_ = e;
    }
    _codeEquals(e) {
      return fy(e) === this.code;
    }
    get serverResponse() {
      return this.customData.serverResponse;
    }
    set serverResponse(e) {
      ((this.customData.serverResponse = e),
        this.customData.serverResponse
          ? (this.message = `${this._baseMessage}\n${this.customData.serverResponse}`)
          : (this.message = this._baseMessage));
    }
  },
  $;
(function (e) {
  ((e.UNKNOWN = `unknown`),
    (e.OBJECT_NOT_FOUND = `object-not-found`),
    (e.BUCKET_NOT_FOUND = `bucket-not-found`),
    (e.PROJECT_NOT_FOUND = `project-not-found`),
    (e.QUOTA_EXCEEDED = `quota-exceeded`),
    (e.UNAUTHENTICATED = `unauthenticated`),
    (e.UNAUTHORIZED = `unauthorized`),
    (e.UNAUTHORIZED_APP = `unauthorized-app`),
    (e.RETRY_LIMIT_EXCEEDED = `retry-limit-exceeded`),
    (e.INVALID_CHECKSUM = `invalid-checksum`),
    (e.CANCELED = `canceled`),
    (e.INVALID_EVENT_NAME = `invalid-event-name`),
    (e.INVALID_URL = `invalid-url`),
    (e.INVALID_DEFAULT_BUCKET = `invalid-default-bucket`),
    (e.NO_DEFAULT_BUCKET = `no-default-bucket`),
    (e.CANNOT_SLICE_BLOB = `cannot-slice-blob`),
    (e.SERVER_FILE_WRONG_SIZE = `server-file-wrong-size`),
    (e.NO_DOWNLOAD_URL = `no-download-url`),
    (e.INVALID_ARGUMENT = `invalid-argument`),
    (e.INVALID_ARGUMENT_COUNT = `invalid-argument-count`),
    (e.APP_DELETED = `app-deleted`),
    (e.INVALID_ROOT_OPERATION = `invalid-root-operation`),
    (e.INVALID_FORMAT = `invalid-format`),
    (e.INTERNAL_ERROR = `internal-error`),
    (e.UNSUPPORTED_ENVIRONMENT = `unsupported-environment`));
})(($ ||= {}));
function fy(e) {
  return `storage/` + e;
}
function py() {
  return new Q(
    $.UNKNOWN,
    `An unknown error occurred, please check the error payload for server response.`
  );
}
function my(e) {
  return new Q($.OBJECT_NOT_FOUND, `Object '` + e + `' does not exist.`);
}
function hy(e) {
  return new Q(
    $.QUOTA_EXCEEDED,
    `Quota for bucket '` +
      e +
      `' exceeded, please view quota on https://firebase.google.com/pricing/.`
  );
}
function gy() {
  return new Q(
    $.UNAUTHENTICATED,
    `User is not authenticated, please authenticate using Firebase Authentication and try again.`
  );
}
function _y() {
  return new Q(
    $.UNAUTHORIZED_APP,
    `This app does not have permission to access Firebase Storage on this project.`
  );
}
function vy(e) {
  return new Q($.UNAUTHORIZED, `User does not have permission to access '` + e + `'.`);
}
function yy() {
  return new Q($.RETRY_LIMIT_EXCEEDED, `Max retry time for operation exceeded, please try again.`);
}
function by() {
  return new Q($.CANCELED, `User canceled the upload/download.`);
}
function xy(e) {
  return new Q($.INVALID_URL, `Invalid URL '` + e + `'.`);
}
function Sy(e) {
  return new Q($.INVALID_DEFAULT_BUCKET, `Invalid default bucket '` + e + `'.`);
}
function Cy() {
  return new Q(
    $.NO_DEFAULT_BUCKET,
    `No default bucket found. Did you set the '` + ly + `' property when initializing the app?`
  );
}
function wy() {
  return new Q($.CANNOT_SLICE_BLOB, `Cannot slice blob for upload. Please retry the upload.`);
}
function Ty() {
  return new Q($.NO_DOWNLOAD_URL, `The given file does not have any download URLs.`);
}
function Ey(e) {
  return new Q(
    $.UNSUPPORTED_ENVIRONMENT,
    `${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`
  );
}
function Dy(e) {
  return new Q($.INVALID_ARGUMENT, e);
}
function Oy() {
  return new Q($.APP_DELETED, `The Firebase app was deleted.`);
}
function ky(e) {
  return new Q(
    $.INVALID_ROOT_OPERATION,
    `The operation '` +
      e +
      `' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').`
  );
}
function Ay(e, t) {
  return new Q($.INVALID_FORMAT, `String does not match format '` + e + `': ` + t);
}
function jy(e) {
  throw new Q($.INTERNAL_ERROR, `Internal error: ` + e);
}
var My = class e {
    constructor(e, t) {
      ((this.bucket = e), (this.path_ = t));
    }
    get path() {
      return this.path_;
    }
    get isRoot() {
      return this.path.length === 0;
    }
    fullServerUrl() {
      let e = encodeURIComponent;
      return `/b/` + e(this.bucket) + `/o/` + e(this.path);
    }
    bucketOnlyServerUrl() {
      return `/b/` + encodeURIComponent(this.bucket) + `/o`;
    }
    static makeFromBucketSpec(t, n) {
      let r;
      try {
        r = e.makeFromUrl(t, n);
      } catch {
        return new e(t, ``);
      }
      if (r.path === ``) return r;
      throw Sy(t);
    }
    static makeFromUrl(t, n) {
      let r = null,
        i = `([A-Za-z0-9.\\-_]+)`;
      function a(e) {
        e.path.charAt(e.path.length - 1) === `/` && (e.path_ = e.path_.slice(0, -1));
      }
      let o = RegExp(`^gs://` + i + `(/(.*))?$`, `i`),
        s = { bucket: 1, path: 3 };
      function c(e) {
        e.path_ = decodeURIComponent(e.path);
      }
      let l = n.replace(/[.]/g, `\\.`),
        u = RegExp(`^https?://${l}/v[A-Za-z0-9_]+/b/${i}/o(/([^?#]*).*)?\$`, `i`),
        d = { bucket: 1, path: 3 },
        f = n === cy ? `(?:storage.googleapis.com|storage.cloud.google.com)` : n,
        p = RegExp(`^https?://${f}/${i}/([^?#]*)`, `i`),
        m = [
          { regex: o, indices: s, postModify: a },
          { regex: u, indices: d, postModify: c },
          { regex: p, indices: { bucket: 1, path: 2 }, postModify: c },
        ];
      for (let n = 0; n < m.length; n++) {
        let i = m[n],
          a = i.regex.exec(t);
        if (a) {
          let t = a[i.indices.bucket],
            n = a[i.indices.path];
          ((n ||= ``), (r = new e(t, n)), i.postModify(r));
          break;
        }
      }
      if (r == null) throw xy(t);
      return r;
    }
  },
  Ny = class {
    constructor(e) {
      this.promise_ = Promise.reject(e);
    }
    getPromise() {
      return this.promise_;
    }
    cancel(e = !1) {}
  };
function Py(e, t, n) {
  let r = 1,
    i = null,
    a = null,
    o = !1,
    s = 0;
  function c() {
    return s === 2;
  }
  let l = !1;
  function u(...e) {
    l || ((l = !0), t.apply(null, e));
  }
  function d(t) {
    i = setTimeout(() => {
      ((i = null), e(p, c()));
    }, t);
  }
  function f() {
    a && clearTimeout(a);
  }
  function p(e, ...t) {
    if (l) {
      f();
      return;
    }
    if (e) {
      (f(), u.call(null, e, ...t));
      return;
    }
    if (c() || o) {
      (f(), u.call(null, e, ...t));
      return;
    }
    r < 64 && (r *= 2);
    let n;
    (s === 1 ? ((s = 2), (n = 0)) : (n = (r + Math.random()) * 1e3), d(n));
  }
  let m = !1;
  function h(e) {
    m || ((m = !0), f(), !l && (i === null ? e || (s = 1) : (e || (s = 2), clearTimeout(i), d(0))));
  }
  return (
    d(0),
    (a = setTimeout(() => {
      ((o = !0), h(!0));
    }, n)),
    h
  );
}
function Fy(e) {
  e(!1);
}
function Iy(e) {
  return e !== void 0;
}
function Ly(e) {
  return typeof e == `object` && !Array.isArray(e);
}
function Ry(e) {
  return typeof e == `string` || e instanceof String;
}
function zy(e) {
  return By() && e instanceof Blob;
}
function By() {
  return typeof Blob < `u`;
}
function Vy(e, t, n, r) {
  if (r < t) throw Dy(`Invalid value for '${e}'. Expected ${t} or greater.`);
  if (r > n) throw Dy(`Invalid value for '${e}'. Expected ${n} or less.`);
}
function Hy(e, t, n) {
  let r = t;
  return (n ?? (r = `https://${t}`), `${n}://${r}/v0${e}`);
}
function Uy(e) {
  let t = encodeURIComponent,
    n = `?`;
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let i = t(r) + `=` + t(e[r]);
      n = n + i + `&`;
    }
  return ((n = n.slice(0, -1)), n);
}
var Wy;
(function (e) {
  ((e[(e.NO_ERROR = 0)] = `NO_ERROR`),
    (e[(e.NETWORK_ERROR = 1)] = `NETWORK_ERROR`),
    (e[(e.ABORT = 2)] = `ABORT`));
})((Wy ||= {}));
function Gy(e, t) {
  let n = e >= 500 && e < 600,
    r = [408, 429].indexOf(e) !== -1,
    i = t.indexOf(e) !== -1;
  return n || r || i;
}
var Ky = class {
    constructor(e, t, n, r, i, a, o, s, c, l, u, d = !0, f = !1) {
      ((this.url_ = e),
        (this.method_ = t),
        (this.headers_ = n),
        (this.body_ = r),
        (this.successCodes_ = i),
        (this.additionalRetryCodes_ = a),
        (this.callback_ = o),
        (this.errorCallback_ = s),
        (this.timeout_ = c),
        (this.progressCallback_ = l),
        (this.connectionFactory_ = u),
        (this.retry = d),
        (this.isUsingEmulator = f),
        (this.pendingConnection_ = null),
        (this.backoffId_ = null),
        (this.canceled_ = !1),
        (this.appDelete_ = !1),
        (this.promise_ = new Promise((e, t) => {
          ((this.resolve_ = e), (this.reject_ = t), this.start_());
        })));
    }
    start_() {
      let e = (e, t) => {
          if (t) {
            e(!1, new qy(!1, null, !0));
            return;
          }
          let n = this.connectionFactory_();
          this.pendingConnection_ = n;
          let r = (e) => {
            let t = e.loaded,
              n = e.lengthComputable ? e.total : -1;
            this.progressCallback_ !== null && this.progressCallback_(t, n);
          };
          (this.progressCallback_ !== null && n.addUploadProgressListener(r),
            n
              .send(this.url_, this.method_, this.isUsingEmulator, this.body_, this.headers_)
              .then(() => {
                (this.progressCallback_ !== null && n.removeUploadProgressListener(r),
                  (this.pendingConnection_ = null));
                let t = n.getErrorCode() === Wy.NO_ERROR,
                  i = n.getStatus();
                if (!t || (Gy(i, this.additionalRetryCodes_) && this.retry)) {
                  e(!1, new qy(!1, null, n.getErrorCode() === Wy.ABORT));
                  return;
                }
                e(!0, new qy(this.successCodes_.indexOf(i) !== -1, n));
              }));
        },
        t = (e, t) => {
          let n = this.resolve_,
            r = this.reject_,
            i = t.connection;
          if (t.wasSuccessCode)
            try {
              let e = this.callback_(i, i.getResponse());
              Iy(e) ? n(e) : n();
            } catch (e) {
              r(e);
            }
          else if (i !== null) {
            let e = py();
            ((e.serverResponse = i.getErrorText()),
              this.errorCallback_ ? r(this.errorCallback_(i, e)) : r(e));
          } else t.canceled ? r(this.appDelete_ ? Oy() : by()) : r(yy());
        };
      this.canceled_ ? t(!1, new qy(!1, null, !0)) : (this.backoffId_ = Py(e, t, this.timeout_));
    }
    getPromise() {
      return this.promise_;
    }
    cancel(e) {
      ((this.canceled_ = !0),
        (this.appDelete_ = e || !1),
        this.backoffId_ !== null && Fy(this.backoffId_),
        this.pendingConnection_ !== null && this.pendingConnection_.abort());
    }
  },
  qy = class {
    constructor(e, t, n) {
      ((this.wasSuccessCode = e), (this.connection = t), (this.canceled = !!n));
    }
  };
function Jy(e, t) {
  t !== null && t.length > 0 && (e.Authorization = `Firebase ` + t);
}
function Yy(e, t) {
  e[`X-Firebase-Storage-Version`] = `webjs/` + (t ?? `AppManager`);
}
function Xy(e, t) {
  t && (e[`X-Firebase-GMPID`] = t);
}
function Zy(e, t) {
  t !== null && (e[`X-Firebase-AppCheck`] = t);
}
function Qy(e, t, n, r, i, a, o = !0, s = !1) {
  let c = Uy(e.urlParams),
    l = e.url + c,
    u = Object.assign({}, e.headers);
  return (
    Xy(u, t),
    Jy(u, n),
    Yy(u, a),
    Zy(u, r),
    new Ky(
      l,
      e.method,
      u,
      e.body,
      e.successCodes,
      e.additionalRetryCodes,
      e.handler,
      e.errorHandler,
      e.timeout,
      e.progressCallback,
      i,
      o,
      s
    )
  );
}
function $y() {
  if (typeof BlobBuilder < `u`) return BlobBuilder;
  if (typeof WebKitBlobBuilder < `u`) return WebKitBlobBuilder;
}
function eb(...e) {
  let t = $y();
  if (t !== void 0) {
    let n = new t();
    for (let t = 0; t < e.length; t++) n.append(e[t]);
    return n.getBlob();
  } else if (By()) return new Blob(e);
  else
    throw new Q($.UNSUPPORTED_ENVIRONMENT, `This browser doesn't seem to support creating Blobs`);
}
function tb(e, t, n) {
  return e.webkitSlice
    ? e.webkitSlice(t, n)
    : e.mozSlice
      ? e.mozSlice(t, n)
      : e.slice
        ? e.slice(t, n)
        : null;
}
function nb(e) {
  if (typeof atob > `u`) throw Ey(`base-64`);
  return atob(e);
}
var rb = { RAW: `raw`, BASE64: `base64`, BASE64URL: `base64url`, DATA_URL: `data_url` },
  ib = class {
    constructor(e, t) {
      ((this.data = e), (this.contentType = t || null));
    }
  };
function ab(e, t) {
  switch (e) {
    case rb.RAW:
      return new ib(ob(t));
    case rb.BASE64:
    case rb.BASE64URL:
      return new ib(cb(e, t));
    case rb.DATA_URL:
      return new ib(ub(t), db(t));
  }
  throw py();
}
function ob(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (r <= 127) t.push(r);
    else if (r <= 2047) t.push(192 | (r >> 6), 128 | (r & 63));
    else if ((r & 64512) == 55296)
      if (!(n < e.length - 1 && (e.charCodeAt(n + 1) & 64512) == 56320)) t.push(239, 191, 189);
      else {
        let i = r,
          a = e.charCodeAt(++n);
        ((r = 65536 | ((i & 1023) << 10) | (a & 1023)),
          t.push(240 | (r >> 18), 128 | ((r >> 12) & 63), 128 | ((r >> 6) & 63), 128 | (r & 63)));
      }
    else
      (r & 64512) == 56320
        ? t.push(239, 191, 189)
        : t.push(224 | (r >> 12), 128 | ((r >> 6) & 63), 128 | (r & 63));
  }
  return new Uint8Array(t);
}
function sb(e) {
  let t;
  try {
    t = decodeURIComponent(e);
  } catch {
    throw Ay(rb.DATA_URL, `Malformed data URL.`);
  }
  return ob(t);
}
function cb(e, t) {
  switch (e) {
    case rb.BASE64: {
      let n = t.indexOf(`-`) !== -1,
        r = t.indexOf(`_`) !== -1;
      if (n || r)
        throw Ay(e, `Invalid character '` + (n ? `-` : `_`) + `' found: is it base64url encoded?`);
      break;
    }
    case rb.BASE64URL: {
      let n = t.indexOf(`+`) !== -1,
        r = t.indexOf(`/`) !== -1;
      if (n || r)
        throw Ay(e, `Invalid character '` + (n ? `+` : `/`) + `' found: is it base64 encoded?`);
      t = t.replace(/-/g, `+`).replace(/_/g, `/`);
      break;
    }
  }
  let n;
  try {
    n = nb(t);
  } catch (t) {
    throw t.message.includes(`polyfill`) ? t : Ay(e, `Invalid character found`);
  }
  let r = new Uint8Array(n.length);
  for (let e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
  return r;
}
var lb = class {
  constructor(e) {
    ((this.base64 = !1), (this.contentType = null));
    let t = e.match(/^data:([^,]+)?,/);
    if (t === null) throw Ay(rb.DATA_URL, `Must be formatted 'data:[<mediatype>][;base64],<data>`);
    let n = t[1] || null;
    (n != null &&
      ((this.base64 = fb(n, `;base64`)),
      (this.contentType = this.base64 ? n.substring(0, n.length - 7) : n)),
      (this.rest = e.substring(e.indexOf(`,`) + 1)));
  }
};
function ub(e) {
  let t = new lb(e);
  return t.base64 ? cb(rb.BASE64, t.rest) : sb(t.rest);
}
function db(e) {
  return new lb(e).contentType;
}
function fb(e, t) {
  return e.length >= t.length ? e.substring(e.length - t.length) === t : !1;
}
var pb = class e {
  constructor(e, t) {
    let n = 0,
      r = ``;
    (zy(e)
      ? ((this.data_ = e), (n = e.size), (r = e.type))
      : e instanceof ArrayBuffer
        ? (t
            ? (this.data_ = new Uint8Array(e))
            : ((this.data_ = new Uint8Array(e.byteLength)), this.data_.set(new Uint8Array(e))),
          (n = this.data_.length))
        : e instanceof Uint8Array &&
          (t ? (this.data_ = e) : ((this.data_ = new Uint8Array(e.length)), this.data_.set(e)),
          (n = e.length)),
      (this.size_ = n),
      (this.type_ = r));
  }
  size() {
    return this.size_;
  }
  type() {
    return this.type_;
  }
  slice(t, n) {
    if (zy(this.data_)) {
      let r = this.data_,
        i = tb(r, t, n);
      return i === null ? null : new e(i);
    } else return new e(new Uint8Array(this.data_.buffer, t, n - t), !0);
  }
  static getBlob(...t) {
    if (By()) {
      let n = t.map((t) => (t instanceof e ? t.data_ : t));
      return new e(eb.apply(null, n));
    } else {
      let n = t.map((e) => (Ry(e) ? ab(rb.RAW, e).data : e.data_)),
        r = 0;
      n.forEach((e) => {
        r += e.byteLength;
      });
      let i = new Uint8Array(r),
        a = 0;
      return (
        n.forEach((e) => {
          for (let t = 0; t < e.length; t++) i[a++] = e[t];
        }),
        new e(i, !0)
      );
    }
  }
  uploadData() {
    return this.data_;
  }
};
function mb(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return null;
  }
  return Ly(t) ? t : null;
}
function hb(e) {
  if (e.length === 0) return null;
  let t = e.lastIndexOf(`/`);
  return t === -1 ? `` : e.slice(0, t);
}
function gb(e, t) {
  let n = t
    .split(`/`)
    .filter((e) => e.length > 0)
    .join(`/`);
  return e.length === 0 ? n : e + `/` + n;
}
function _b(e) {
  let t = e.lastIndexOf(`/`, e.length - 2);
  return t === -1 ? e : e.slice(t + 1);
}
function vb(e, t) {
  return t;
}
var yb = class {
    constructor(e, t, n, r) {
      ((this.server = e), (this.local = t || e), (this.writable = !!n), (this.xform = r || vb));
    }
  },
  bb = null;
function xb(e) {
  return !Ry(e) || e.length < 2 ? e : _b(e);
}
function Sb() {
  if (bb) return bb;
  let e = [];
  (e.push(new yb(`bucket`)),
    e.push(new yb(`generation`)),
    e.push(new yb(`metageneration`)),
    e.push(new yb(`name`, `fullPath`, !0)));
  function t(e, t) {
    return xb(t);
  }
  let n = new yb(`name`);
  ((n.xform = t), e.push(n));
  function r(e, t) {
    return t === void 0 ? t : Number(t);
  }
  let i = new yb(`size`);
  return (
    (i.xform = r),
    e.push(i),
    e.push(new yb(`timeCreated`)),
    e.push(new yb(`updated`)),
    e.push(new yb(`md5Hash`, null, !0)),
    e.push(new yb(`cacheControl`, null, !0)),
    e.push(new yb(`contentDisposition`, null, !0)),
    e.push(new yb(`contentEncoding`, null, !0)),
    e.push(new yb(`contentLanguage`, null, !0)),
    e.push(new yb(`contentType`, null, !0)),
    e.push(new yb(`metadata`, `customMetadata`, !0)),
    (bb = e),
    bb
  );
}
function Cb(e, t) {
  function n() {
    let n = e.bucket,
      r = e.fullPath,
      i = new My(n, r);
    return t._makeStorageReference(i);
  }
  Object.defineProperty(e, `ref`, { get: n });
}
function wb(e, t, n) {
  let r = {};
  r.type = `file`;
  let i = n.length;
  for (let e = 0; e < i; e++) {
    let i = n[e];
    r[i.local] = i.xform(r, t[i.server]);
  }
  return (Cb(r, e), r);
}
function Tb(e, t, n) {
  let r = mb(t);
  return r === null ? null : wb(e, r, n);
}
function Eb(e, t, n, r) {
  let i = mb(t);
  if (i === null || !Ry(i.downloadTokens)) return null;
  let a = i.downloadTokens;
  if (a.length === 0) return null;
  let o = encodeURIComponent;
  return a.split(`,`).map((t) => {
    let i = e.bucket,
      a = e.fullPath;
    return Hy(`/b/` + o(i) + `/o/` + o(a), n, r) + Uy({ alt: `media`, token: t });
  })[0];
}
function Db(e, t) {
  let n = {},
    r = t.length;
  for (let i = 0; i < r; i++) {
    let r = t[i];
    r.writable && (n[r.server] = e[r.local]);
  }
  return JSON.stringify(n);
}
var Ob = class {
  constructor(e, t, n, r) {
    ((this.url = e),
      (this.method = t),
      (this.handler = n),
      (this.timeout = r),
      (this.urlParams = {}),
      (this.headers = {}),
      (this.body = null),
      (this.errorHandler = null),
      (this.progressCallback = null),
      (this.successCodes = [200]),
      (this.additionalRetryCodes = []));
  }
};
function kb(e) {
  if (!e) throw py();
}
function Ab(e, t) {
  function n(n, r) {
    let i = Tb(e, r, t);
    return (kb(i !== null), i);
  }
  return n;
}
function jb(e, t) {
  function n(n, r) {
    let i = Tb(e, r, t);
    return (kb(i !== null), Eb(i, r, e.host, e._protocol));
  }
  return n;
}
function Mb(e) {
  function t(t, n) {
    let r;
    return (
      (r =
        t.getStatus() === 401
          ? t.getErrorText().includes(`Firebase App Check token is invalid`)
            ? _y()
            : gy()
          : t.getStatus() === 402
            ? hy(e.bucket)
            : t.getStatus() === 403
              ? vy(e.path)
              : n),
      (r.status = t.getStatus()),
      (r.serverResponse = n.serverResponse),
      r
    );
  }
  return t;
}
function Nb(e) {
  let t = Mb(e);
  function n(n, r) {
    let i = t(n, r);
    return (n.getStatus() === 404 && (i = my(e.path)), (i.serverResponse = r.serverResponse), i);
  }
  return n;
}
function Pb(e, t, n) {
  let r = Hy(t.fullServerUrl(), e.host, e._protocol),
    i = e.maxOperationRetryTime,
    a = new Ob(r, `GET`, jb(e, n), i);
  return ((a.errorHandler = Nb(t)), a);
}
function Fb(e, t) {
  return (e && e.contentType) || (t && t.type()) || `application/octet-stream`;
}
function Ib(e, t, n) {
  let r = Object.assign({}, n);
  return ((r.fullPath = e.path), (r.size = t.size()), (r.contentType ||= Fb(null, t)), r);
}
function Lb(e, t, n, r, i) {
  let a = t.bucketOnlyServerUrl(),
    o = { "X-Goog-Upload-Protocol": `multipart` };
  function s() {
    let e = ``;
    for (let t = 0; t < 2; t++) e += Math.random().toString().slice(2);
    return e;
  }
  let c = s();
  o[`Content-Type`] = `multipart/related; boundary=` + c;
  let l = Ib(t, r, i),
    u = Db(l, n),
    d =
      `--` +
      c +
      `\r
Content-Type: application/json; charset=utf-8\r
\r
` +
      u +
      `\r
--` +
      c +
      `\r
Content-Type: ` +
      l.contentType +
      `\r
\r
`,
    f =
      `\r
--` +
      c +
      `--`,
    p = pb.getBlob(d, r, f);
  if (p === null) throw wy();
  let m = { name: l.fullPath },
    h = Hy(a, e.host, e._protocol),
    g = e.maxUploadRetryTime,
    ee = new Ob(h, `POST`, Ab(e, n), g);
  return (
    (ee.urlParams = m),
    (ee.headers = o),
    (ee.body = p.uploadData()),
    (ee.errorHandler = Mb(t)),
    ee
  );
}
var Rb = class {
    constructor() {
      ((this.sent_ = !1),
        (this.xhr_ = new XMLHttpRequest()),
        this.initXhr(),
        (this.errorCode_ = Wy.NO_ERROR),
        (this.sendPromise_ = new Promise((e) => {
          (this.xhr_.addEventListener(`abort`, () => {
            ((this.errorCode_ = Wy.ABORT), e());
          }),
            this.xhr_.addEventListener(`error`, () => {
              ((this.errorCode_ = Wy.NETWORK_ERROR), e());
            }),
            this.xhr_.addEventListener(`load`, () => {
              e();
            }));
        })));
    }
    send(e, t, n, r, i) {
      if (this.sent_) throw jy(`cannot .send() more than once`);
      if (
        (te(e) && n && (this.xhr_.withCredentials = !0),
        (this.sent_ = !0),
        this.xhr_.open(t, e, !0),
        i !== void 0)
      )
        for (let e in i) i.hasOwnProperty(e) && this.xhr_.setRequestHeader(e, i[e].toString());
      return (r === void 0 ? this.xhr_.send() : this.xhr_.send(r), this.sendPromise_);
    }
    getErrorCode() {
      if (!this.sent_) throw jy(`cannot .getErrorCode() before sending`);
      return this.errorCode_;
    }
    getStatus() {
      if (!this.sent_) throw jy(`cannot .getStatus() before sending`);
      try {
        return this.xhr_.status;
      } catch {
        return -1;
      }
    }
    getResponse() {
      if (!this.sent_) throw jy(`cannot .getResponse() before sending`);
      return this.xhr_.response;
    }
    getErrorText() {
      if (!this.sent_) throw jy(`cannot .getErrorText() before sending`);
      return this.xhr_.statusText;
    }
    abort() {
      this.xhr_.abort();
    }
    getResponseHeader(e) {
      return this.xhr_.getResponseHeader(e);
    }
    addUploadProgressListener(e) {
      this.xhr_.upload != null && this.xhr_.upload.addEventListener(`progress`, e);
    }
    removeUploadProgressListener(e) {
      this.xhr_.upload != null && this.xhr_.upload.removeEventListener(`progress`, e);
    }
  },
  zb = class extends Rb {
    initXhr() {
      this.xhr_.responseType = `text`;
    }
  };
function Bb() {
  return new zb();
}
var Vb = class e {
  constructor(e, t) {
    ((this._service = e),
      t instanceof My ? (this._location = t) : (this._location = My.makeFromUrl(t, e.host)));
  }
  toString() {
    return `gs://` + this._location.bucket + `/` + this._location.path;
  }
  _newRef(t, n) {
    return new e(t, n);
  }
  get root() {
    let e = new My(this._location.bucket, ``);
    return this._newRef(this._service, e);
  }
  get bucket() {
    return this._location.bucket;
  }
  get fullPath() {
    return this._location.path;
  }
  get name() {
    return _b(this._location.path);
  }
  get storage() {
    return this._service;
  }
  get parent() {
    let t = hb(this._location.path);
    if (t === null) return null;
    let n = new My(this._location.bucket, t);
    return new e(this._service, n);
  }
  _throwIfRoot(e) {
    if (this._location.path === ``) throw ky(e);
  }
};
function Hb(e, t, n) {
  e._throwIfRoot(`uploadBytes`);
  let r = Lb(e.storage, e._location, Sb(), new pb(t, !0), n);
  return e.storage.makeRequestWithTokens(r, Bb).then((t) => ({ metadata: t, ref: e }));
}
function Ub(e) {
  e._throwIfRoot(`getDownloadURL`);
  let t = Pb(e.storage, e._location, Sb());
  return e.storage.makeRequestWithTokens(t, Bb).then((e) => {
    if (e === null) throw Ty();
    return e;
  });
}
function Wb(e, t) {
  let n = gb(e._location.path, t),
    r = new My(e._location.bucket, n);
  return new Vb(e.storage, r);
}
function Gb(e) {
  return /^[A-Za-z]+:\/\//.test(e);
}
function Kb(e, t) {
  return new Vb(e, t);
}
function qb(e, t) {
  if (e instanceof Zb) {
    let n = e;
    if (n._bucket == null) throw Cy();
    let r = new Vb(n, n._bucket);
    return t == null ? r : qb(r, t);
  } else if (t !== void 0) return Wb(e, t);
  else return e;
}
function Jb(e, t) {
  if (t && Gb(t)) {
    if (e instanceof Zb) return Kb(e, t);
    throw Dy(`To use ref(service, url), the first argument must be a Storage instance.`);
  } else return qb(e, t);
}
function Yb(e, t) {
  let n = t?.[ly];
  return n == null ? null : My.makeFromBucketSpec(n, e);
}
function Xb(e, t, n, r = {}) {
  e.host = `${t}:${n}`;
  let i = te(t);
  (i && (ne(`https://${e.host}/b`), ce(`Storage`, !0)),
    (e._isUsingEmulator = !0),
    (e._protocol = i ? `https` : `http`));
  let { mockUserToken: a } = r;
  a && (e._overrideAuthToken = typeof a == `string` ? a : re(a, e.app.options.projectId));
}
var Zb = class {
    constructor(e, t, n, r, i, a = !1) {
      ((this.app = e),
        (this._authProvider = t),
        (this._appCheckProvider = n),
        (this._url = r),
        (this._firebaseVersion = i),
        (this._isUsingEmulator = a),
        (this._bucket = null),
        (this._host = cy),
        (this._protocol = `https`),
        (this._appId = null),
        (this._deleted = !1),
        (this._maxOperationRetryTime = uy),
        (this._maxUploadRetryTime = dy),
        (this._requests = new Set()),
        r == null
          ? (this._bucket = Yb(this._host, this.app.options))
          : (this._bucket = My.makeFromBucketSpec(r, this._host)));
    }
    get host() {
      return this._host;
    }
    set host(e) {
      ((this._host = e),
        this._url == null
          ? (this._bucket = Yb(e, this.app.options))
          : (this._bucket = My.makeFromBucketSpec(this._url, e)));
    }
    get maxUploadRetryTime() {
      return this._maxUploadRetryTime;
    }
    set maxUploadRetryTime(e) {
      (Vy(`time`, 0, 1 / 0, e), (this._maxUploadRetryTime = e));
    }
    get maxOperationRetryTime() {
      return this._maxOperationRetryTime;
    }
    set maxOperationRetryTime(e) {
      (Vy(`time`, 0, 1 / 0, e), (this._maxOperationRetryTime = e));
    }
    async _getAuthToken() {
      if (this._overrideAuthToken) return this._overrideAuthToken;
      let e = this._authProvider.getImmediate({ optional: !0 });
      if (e) {
        let t = await e.getToken();
        if (t !== null) return t.accessToken;
      }
      return null;
    }
    async _getAppCheckToken() {
      if (w(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
      let e = this._appCheckProvider.getImmediate({ optional: !0 });
      return e ? (await e.getToken()).token : null;
    }
    _delete() {
      return (
        this._deleted ||
          ((this._deleted = !0), this._requests.forEach((e) => e.cancel()), this._requests.clear()),
        Promise.resolve()
      );
    }
    _makeStorageReference(e) {
      return new Vb(this, e);
    }
    _makeRequest(e, t, n, r, i = !0) {
      if (this._deleted) return new Ny(Oy());
      {
        let a = Qy(e, this._appId, n, r, t, this._firebaseVersion, i, this._isUsingEmulator);
        return (
          this._requests.add(a),
          a.getPromise().then(
            () => this._requests.delete(a),
            () => this._requests.delete(a)
          ),
          a
        );
      }
    }
    async makeRequestWithTokens(e, t) {
      let [n, r] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()]);
      return this._makeRequest(e, t, n, r).getPromise();
    }
  },
  Qb = `@firebase/storage`,
  $b = `0.14.0`,
  ex = `storage`;
function tx(e, t, n) {
  return ((e = b(e)), Hb(e, t, n));
}
function nx(e) {
  return ((e = b(e)), Ub(e));
}
function rx(e, t) {
  return ((e = b(e)), Jb(e, t));
}
function ix(e = sn(), t) {
  e = b(e);
  let n = tn(e, ex).getImmediate({ identifier: t }),
    r = m(`storage`);
  return (r && ax(n, ...r), n);
}
function ax(e, t, n, r = {}) {
  Xb(e, t, n, r);
}
function ox(e, { instanceIdentifier: t }) {
  return new Zb(
    e.getProvider(`app`).getImmediate(),
    e.getProvider(`auth-internal`),
    e.getProvider(`app-check-internal`),
    t,
    an
  );
}
function sx() {
  (en(new Le(ex, ox, `PUBLIC`).setMultipleInstances(!0)), T(Qb, $b, ``), T(Qb, $b, `esm2020`));
}
sx();
export {
  eo as C,
  on as E,
  Zi as S,
  Ji as T,
  $_ as _,
  ay as a,
  Li as b,
  ty as c,
  ny as d,
  ry as f,
  J_ as g,
  q_ as h,
  tx as i,
  Wv as l,
  H as m,
  ix as n,
  iy as o,
  Vv as p,
  rx as r,
  ey as s,
  nx as t,
  zv as u,
  jv as v,
  Qi as w,
  ls as x,
  yl as y,
};
