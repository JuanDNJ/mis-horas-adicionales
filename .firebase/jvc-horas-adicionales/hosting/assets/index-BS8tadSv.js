const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/App-DRUjMu9p.js",
      "assets/vendor-CPiAnCAo.js",
      "assets/rolldown-runtime-DGruFWvd.js",
      "assets/Main-DWFXURMq.js",
      "assets/Profile-uq1ZQGMF.js",
      "assets/Dashboard-DsQ8rWQO.js",
      "assets/HoursForm-CIkwc9GH.js",
      "assets/RecordDetail-COz_AWoV.js",
    ])
) => i.map((i) => d[i]);
import { r as e } from "./rolldown-runtime-DGruFWvd.js";
import {
  D as t,
  F as n,
  H as r,
  P as i,
  R as a,
  U as o,
  V as s,
  W as c,
  _ as l,
  b as u,
  h as d,
  k as f,
  p,
  v as m,
  w as h,
  x as g,
  y as _,
} from "./vendor-CPiAnCAo.js";
import { a as v, i as y, n as b, o as x, r as S, t as C } from "./firebase-DoLiR3Yt.js";
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var w = r(),
  T = o(),
  E = c(),
  D = i(),
  O = (0, E.lazy)(() => s(() => import(`./App-DRUjMu9p.js`), __vite__mapDeps([0, 1, 2, 3]))),
  k = (0, E.lazy)(() => s(() => import(`./Profile-uq1ZQGMF.js`), __vite__mapDeps([4, 1, 2, 3]))),
  A = (0, E.lazy)(() =>
    s(() => import(`./Dashboard-DsQ8rWQO.js`), __vite__mapDeps([5, 1, 2, 3, 6]))
  ),
  j = (0, E.lazy)(() =>
    s(() => import(`./RecordDetail-COz_AWoV.js`), __vite__mapDeps([7, 1, 2, 3, 6]))
  ),
  M = a([
    { path: `/`, element: (0, D.jsx)(O, {}) },
    { path: `/dashboard`, element: (0, D.jsx)(A, {}) },
    { path: `/record/:id`, element: (0, D.jsx)(j, {}) },
    { path: `/profile`, element: (0, D.jsx)(k, {}) },
  ]),
  N = () => {
    let e = (0, w.c)(1),
      t;
    return (
      e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((t = (0, D.jsx)(E.StrictMode, { children: (0, D.jsx)(n, { router: M }) })), (e[0] = t))
        : (t = e[0]),
      t
    );
  },
  P = (0, E.createContext)(void 0),
  F = (0, E.createContext)(void 0);
const I = [
  { id: `theme-default`, name: `Default`, icon: p, color: `text-slate-800` },
  { id: `theme-light`, name: `Light`, icon: f, color: `text-amber-500` },
  { id: `theme-dark`, name: `Dark`, icon: _, color: `text-slate-200` },
  { id: `theme-diablo`, name: `Diablo`, icon: d, color: `text-red-600` },
  { id: `theme-duende`, name: `Duende del sur`, icon: l, color: `text-green-600` },
  { id: `theme-militar`, name: `Militar`, icon: t, color: `text-emerald-800` },
  { id: `theme-rockero`, name: `Rockero`, icon: u, color: `text-purple-600` },
  { id: `theme-comic`, name: `Cómic`, icon: g, color: `text-yellow-500` },
  { id: `theme-heroe`, name: `Héroe`, icon: m, color: `text-blue-600` },
  { id: `theme-espacio`, name: `Espacio`, icon: h, color: `text-indigo-600` },
];
var L = r();
const R = (e) => {
  let t = (0, L.c)(10),
    { children: n } = e,
    [r, i] = (0, E.useState)(`Horas Adicionales`),
    [a, o] = (0, E.useState)(z),
    s;
  t[0] === a.id
    ? (s = t[1])
    : ((s = () => {
        ((document.documentElement.className = `${a.id} bg-cover bg-center bg-fixed`),
          localStorage.setItem(`selected-theme-id`, a.id));
      }),
      (t[0] = a.id),
      (t[1] = s));
  let c;
  (t[2] === a ? (c = t[3]) : ((c = [a]), (t[2] = a), (t[3] = c)), (0, E.useEffect)(s, c));
  let l;
  t[4] !== r || t[5] !== a
    ? ((l = { appTitle: r, setAppTitle: i, selectedTheme: a, setSelectedTheme: o }),
      (t[4] = r),
      (t[5] = a),
      (t[6] = l))
    : (l = t[6]);
  let u;
  return (
    t[7] !== n || t[8] !== l
      ? ((u = (0, D.jsx)(P.Provider, { value: l, children: n })),
        (t[7] = n),
        (t[8] = l),
        (t[9] = u))
      : (u = t[9]),
    u
  );
};
function z() {
  let e = localStorage.getItem(`selected-theme-id`);
  return I.find((t) => t.id === e) || I[0];
}
var B = x({
  apiKey: `AIzaSyB8oFT-klNy6Xf4a14SIry84KpZGG_3-WI`,
  authDomain: `jvc-horas-adicionales.firebaseapp.com`,
  projectId: `jvc-horas-adicionales`,
  storageBucket: `jvc-horas-adicionales.firebasestorage.app`,
  messagingSenderId: `866926590864`,
  appId: `1:866926590864:web:e75c6829310a34bafbd115`,
});
(b(B), C(B));
var V = y(),
  H = r();
(0, T.createRoot)(document.getElementById(`root`)).render(
  (0, D.jsx)(R, {
    children: (0, D.jsx)(
      (e) => {
        let t = (0, H.c)(9),
          { children: n } = e,
          r;
        t[0] === Symbol.for(`react.memo_cache_sentinel`) ? ((r = new S()), (t[0] = r)) : (r = t[0]);
        let i = r,
          a;
        t[1] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((a = {
              displayName: `Juan Antonio`,
              photoURL: `https://avatars.githubusercontent.com/u/132897973?v=4`,
              phoneNumber: `123-456-7890`,
              email: `juandevnjv@gmail.com`,
            }),
            (t[1] = a))
          : (a = t[1]);
        let [o, s] = (0, E.useState)(a),
          c;
        t[2] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((c = (e, t, n, r) => {
              s(() => ({ displayName: e, photoURL: t, phoneNumber: n, email: r }));
            }),
            (t[2] = c))
          : (c = t[2]);
        let l = c,
          u;
        t[3] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((u = () => {
              v(V, i);
            }),
            (t[3] = u))
          : (u = t[3]);
        let d = u,
          f;
        t[4] === o
          ? (f = t[5])
          : ((f = { ...o, updateUserProfile: l, login: d }), (t[4] = o), (t[5] = f));
        let p;
        return (
          t[6] !== n || t[7] !== f
            ? ((p = (0, D.jsx)(F.Provider, { value: f, children: n })),
              (t[6] = n),
              (t[7] = f),
              (t[8] = p))
            : (p = t[8]),
          p
        );
      },
      { children: (0, D.jsx)(N, {}) }
    ),
  })
);
export { P as n, F as r, I as t };
