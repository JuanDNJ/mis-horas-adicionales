import {
  A as e,
  H as t,
  I as n,
  L as r,
  M as i,
  N as a,
  O as o,
  P as s,
  W as c,
  a as l,
  f as u,
  g as d,
  o as f,
  u as p,
} from "./vendor-CPiAnCAo.js";
import { n as m, t as h } from "./index-BS8tadSv.js";
var g = t(),
  _ = s();
const v = () => {
  let e = (0, g.c)(1),
    t;
  return (
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((t = (0, _.jsxs)(`nav`, {
          className: `hidden lg:flex justify-center gap-8 items-center absolute left-1/2 -translate-x-1/2`,
          children: [
            (0, _.jsx)(r, {
              to: `/`,
              className: `text-theme-color font-bold hover:underline text-lg`,
              children: `Home`,
            }),
            (0, _.jsx)(r, {
              to: `/dashboard`,
              className: `text-theme-color font-bold hover:underline text-lg`,
              children: `Dashboard`,
            }),
            (0, _.jsx)(r, {
              to: `/profile`,
              className: `text-theme-color font-bold hover:underline text-lg`,
              children: `Profile`,
            }),
          ],
        })),
        (e[0] = t))
      : (t = e[0]),
    t
  );
};
function y(...e) {
  return l(f(e));
}
function b(e, t) {
  if (!e || !t) return ``;
  let [n, r] = e.split(`:`).map(Number),
    [i, a] = t.split(`:`).map(Number),
    o = new Date(0, 0, 0, n, r),
    s = new Date(0, 0, 0, i, a).getTime() - o.getTime();
  s < 0 && (s += 1440 * 60 * 1e3);
  let c = s / (1e3 * 60 * 60);
  return c % 1 == 0 ? c.toString() : c.toFixed(2);
}
var x = t();
const S = (t) => {
  let n = (0, x.c)(20),
    { isOpen: i, onClose: a } = t,
    o = i ? `opacity-100 pointer-events-auto` : `opacity-0 pointer-events-none`,
    s;
  n[0] === o
    ? (s = n[1])
    : ((s = y(`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300`, o)),
      (n[0] = o),
      (n[1] = s));
  let c;
  n[2] !== a || n[3] !== s
    ? ((c = (0, _.jsx)(`article`, { className: s, onClick: a })),
      (n[2] = a),
      (n[3] = s),
      (n[4] = c))
    : (c = n[4]);
  let l = i ? `translate-x-0` : `-translate-x-full`,
    u;
  n[5] === l
    ? (u = n[6])
    : ((u = y(
        `fixed top-0 left-0 w-64 h-full bg-header-bg border-r-4 border-black shadow-[4px_0_0_rgba(0,0,0,0.2)] z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col`,
        l
      )),
      (n[5] = l),
      (n[6] = u));
  let d;
  n[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((d = (0, _.jsx)(`h2`, {
        className: `text-xl font-bold text-theme-color`,
        children: `Menú`,
      })),
      (n[7] = d))
    : (d = n[7]);
  let f;
  n[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = (0, _.jsx)(e, {})), (n[8] = f))
    : (f = n[8]);
  let p;
  n[9] === a
    ? (p = n[10])
    : ((p = (0, _.jsxs)(`article`, {
        className: `p-4 flex justify-between items-center border-b-4 border-black/10`,
        children: [
          d,
          (0, _.jsx)(`button`, {
            onClick: a,
            className: `text-2xl text-theme-color hover:rotate-90 transition-transform`,
            children: f,
          }),
        ],
      })),
      (n[9] = a),
      (n[10] = p));
  let m;
  n[11] === a
    ? (m = n[12])
    : ((m = (0, _.jsxs)(`nav`, {
        className: `flex flex-col p-4 gap-4`,
        children: [
          (0, _.jsx)(r, {
            to: `/`,
            onClick: a,
            className: `text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20`,
            children: `Home`,
          }),
          (0, _.jsx)(r, {
            to: `/dashboard`,
            onClick: a,
            className: `text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20`,
            children: `Dashboard`,
          }),
          (0, _.jsx)(r, {
            to: `/profile`,
            onClick: a,
            className: `text-theme-color font-bold text-xl py-2 px-4 hover:bg-black/10 rounded-lg transition-colors border-2 border-transparent hover:border-black/20`,
            children: `Profile`,
          }),
        ],
      })),
      (n[11] = a),
      (n[12] = m));
  let h;
  n[13] !== u || n[14] !== p || n[15] !== m
    ? ((h = (0, _.jsxs)(`section`, { className: u, children: [p, m] })),
      (n[13] = u),
      (n[14] = p),
      (n[15] = m),
      (n[16] = h))
    : (h = n[16]);
  let g;
  return (
    n[17] !== h || n[18] !== c
      ? ((g = (0, _.jsxs)(_.Fragment, { children: [c, h] })), (n[17] = h), (n[18] = c), (n[19] = g))
      : (g = n[19]),
    g
  );
};
var C = t(),
  w = c();
const T = (e) => {
  let t = (0, C.c)(37),
    { label: n, options: r, value: i, onChange: a, renderItem: o, className: s } = e,
    [c, l] = (0, w.useState)(!1),
    d = (0, w.useRef)(null),
    f,
    p;
  (t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = () => {
        let e = (e) => {
          d.current && !d.current.contains(e.target) && l(!1);
        };
        return (
          document.addEventListener(`mousedown`, e),
          () => document.removeEventListener(`mousedown`, e)
        );
      }),
      (p = []),
      (t[0] = f),
      (t[1] = p))
    : ((f = t[0]), (p = t[1])),
    (0, w.useEffect)(f, p));
  let m;
  t[2] === s ? (m = t[3]) : ((m = y(`w-full max-w-xs space-y-3`, s)), (t[2] = s), (t[3] = m));
  let h;
  t[4] === n
    ? (h = t[5])
    : ((h =
        n &&
        (0, _.jsx)(`label`, {
          className: `block text-sm font-semibold text-secondary ml-1`,
          children: n,
        })),
      (t[4] = n),
      (t[5] = h));
  let g;
  t[6] === c ? (g = t[7]) : ((g = () => l(!c)), (t[6] = c), (t[7] = g));
  let v = c && `ring-2 ring-theme-color/20 border-theme-color`,
    b;
  t[8] === v
    ? (b = t[9])
    : ((b = y(
        `w-full flex items-center justify-between px-1 md:px-4 py-2 bg-theme-bg`,
        `border-2 border-theme-color rounded-lg`,
        `shadow-[4px_4px_0px_var(--theme-color)]`,
        `hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_var(--theme-color)]`,
        `active:translate-x-0.75 active:translate-y-0.75 active:shadow-none`,
        `transition-all cursor-pointer outline-none`,
        v
      )),
      (t[8] = v),
      (t[9] = b));
  let x;
  t[10] !== o || t[11] !== i
    ? ((x = o
        ? o(i, !0)
        : (0, _.jsx)(`span`, { className: `font-medium text-theme-color`, children: i.name })),
      (t[10] = o),
      (t[11] = i),
      (t[12] = x))
    : (x = t[12]);
  let S;
  t[13] === x
    ? (S = t[14])
    : ((S = (0, _.jsx)(`div`, { className: `flex items-center gap-1 md:gap-3`, children: x })),
      (t[13] = x),
      (t[14] = S));
  let T = c && `rotate-180`,
    E;
  t[15] === T
    ? (E = t[16])
    : ((E = y(`text-secondary transition-transform duration-200 ml-1 md:ml-3`, T)),
      (t[15] = T),
      (t[16] = E));
  let D;
  t[17] === E ? (D = t[18]) : ((D = (0, _.jsx)(u, { className: E })), (t[17] = E), (t[18] = D));
  let O;
  t[19] !== D || t[20] !== g || t[21] !== b || t[22] !== S
    ? ((O = (0, _.jsxs)(`button`, { type: `button`, onClick: g, className: b, children: [S, D] })),
      (t[19] = D),
      (t[20] = g),
      (t[21] = b),
      (t[22] = S),
      (t[23] = O))
    : (O = t[23]);
  let k;
  t[24] !== c || t[25] !== a || t[26] !== r || t[27] !== o || t[28] !== i
    ? ((k =
        c &&
        (0, _.jsx)(`div`, {
          className: `absolute right-0 z-10 w-max min-w-full mt-2 py-2 bg-theme-bg border-2 border-theme-color rounded-lg shadow-[4px_4px_0px_var(--theme-color)] animate-in fade-in zoom-in duration-200`,
          children: r.map((e) =>
            (0, _.jsxs)(
              `button`,
              {
                onClick: () => {
                  (a(e), l(!1));
                },
                className: y(
                  `w-full flex items-center gap-3 px-4 py-2 hover:bg-theme-color/10 transition-colors text-left`,
                  i.id === e.id && `bg-theme-color/20`
                ),
                children: [
                  o
                    ? o(e, i.id === e.id)
                    : (0, _.jsx)(`span`, {
                        className: y(
                          `flex-1 font-medium`,
                          i.id === e.id ? `text-option-selected` : `text-secondary`
                        ),
                        children: e.name,
                      }),
                  i.id === e.id &&
                    !o &&
                    (0, _.jsx)(`div`, {
                      className: `w-2 h-2 rounded-full bg-select shadow-[0_0_8px_rgba(var(--color-select),0.5)]`,
                    }),
                ],
              },
              e.id
            )
          ),
        })),
      (t[24] = c),
      (t[25] = a),
      (t[26] = r),
      (t[27] = o),
      (t[28] = i),
      (t[29] = k))
    : (k = t[29]);
  let A;
  t[30] !== O || t[31] !== k
    ? ((A = (0, _.jsxs)(`div`, { className: `relative`, children: [O, k] })),
      (t[30] = O),
      (t[31] = k),
      (t[32] = A))
    : (A = t[32]);
  let j;
  return (
    t[33] !== A || t[34] !== m || t[35] !== h
      ? ((j = (0, _.jsxs)(`div`, { className: m, ref: d, children: [h, A] })),
        (t[33] = A),
        (t[34] = m),
        (t[35] = h),
        (t[36] = j))
      : (j = t[36]),
    j
  );
};
var E = t();
const D = (e) => {
    let t = (0, E.c)(18),
      { className: r } = e,
      [s, c] = (0, w.useState)(!1),
      l = (0, w.useRef)(null),
      u,
      d;
    (t[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((u = () => {
          let e = (e) => {
            l.current && !l.current.contains(e.target) && c(!1);
          };
          return (
            document.addEventListener(`mousedown`, e),
            () => document.removeEventListener(`mousedown`, e)
          );
        }),
        (d = []),
        (t[0] = u),
        (t[1] = d))
      : ((u = t[0]), (d = t[1])),
      (0, w.useEffect)(u, d));
    let f;
    t[2] === r ? (f = t[3]) : ((f = y(`relative`, r)), (t[2] = r), (t[3] = f));
    let p;
    t[4] === s ? (p = t[5]) : ((p = () => c(!s)), (t[4] = s), (t[5] = p));
    let m = s && `ring-2 ring-theme-color/20`,
      h;
    t[6] === m
      ? (h = t[7])
      : ((h = y(
          `flex items-center justify-center p-1 md:p-2 rounded-full`,
          `bg-theme-bg border-2 border-theme-color`,
          `shadow-[4px_4px_0px_var(--theme-color)]`,
          `hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0px_var(--theme-color)]`,
          `active:translate-x-0.75 active:translate-y-0.75 active:shadow-none`,
          `transition-all cursor-pointer outline-none`,
          m
        )),
        (t[6] = m),
        (t[7] = h));
    let g;
    t[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((g = (0, _.jsx)(a, { className: `text-2xl md:text-3xl text-theme-color` })), (t[8] = g))
      : (g = t[8]);
    let v;
    t[9] !== p || t[10] !== h
      ? ((v = (0, _.jsx)(`button`, {
          type: `button`,
          onClick: p,
          className: h,
          "aria-label": `User menu`,
          children: g,
        })),
        (t[9] = p),
        (t[10] = h),
        (t[11] = v))
      : (v = t[11]);
    let b;
    t[12] === s
      ? (b = t[13])
      : ((b =
          s &&
          (0, _.jsxs)(`article`, {
            className: `absolute right-0 z-50 w-56 mt-4 py-3 bg-theme-bg border-2 border-theme-color rounded-lg shadow-[4px_4px_0px_var(--theme-color)] animate-in fade-in zoom-in duration-200 origin-top-right`,
            children: [
              (0, _.jsxs)(`div`, {
                className: `px-5 py-3 border-b-2 border-theme-color/20 mb-2`,
                children: [
                  (0, _.jsx)(`p`, {
                    className: `text-sm font-bold text-theme-color`,
                    children: `Usuario Invitado`,
                  }),
                  (0, _.jsx)(`p`, {
                    className: `text-xs text-secondary`,
                    children: `guest@example.com`,
                  }),
                ],
              }),
              (0, _.jsxs)(n, {
                to: `/profile`,
                onClick: () => c(!1),
                className: `flex items-center gap-3 px-4 py-2 hover:bg-theme-color/10 transition-colors text-theme-color font-medium`,
                children: [
                  (0, _.jsx)(i, { className: `text-lg` }),
                  (0, _.jsx)(`span`, { children: `Perfil` }),
                ],
              }),
              (0, _.jsxs)(`button`, {
                onClick: () => {
                  (c(!1), console.log(`Logout clicked`));
                },
                className: `w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/10 hover:text-red-600 transition-colors text-theme-color font-medium text-left`,
                children: [
                  (0, _.jsx)(o, { className: `text-lg` }),
                  (0, _.jsx)(`span`, { children: `Cerrar Sesión` }),
                ],
              }),
            ],
          })),
        (t[12] = s),
        (t[13] = b));
    let x;
    return (
      t[14] !== f || t[15] !== v || t[16] !== b
        ? ((x = (0, _.jsxs)(`section`, { className: f, ref: l, children: [v, b] })),
          (t[14] = f),
          (t[15] = v),
          (t[16] = b),
          (t[17] = x))
        : (x = t[17]),
      x
    );
  },
  O = () => {
    let e = (0, w.useContext)(m);
    if (e === void 0) throw Error(`useGlobalContext debe ser usado dentro de un GlobalProvider`);
    return e;
  };
var k = t(),
  A = () => {
    let e = (0, k.c)(5),
      { selectedTheme: t, setSelectedTheme: n } = O(),
      r;
    e[0] === n
      ? (r = e[1])
      : ((r = (e) => {
          n(e);
        }),
        (e[0] = n),
        (e[1] = r));
    let i = r,
      a;
    return (
      e[2] !== i || e[3] !== t
        ? ((a = { selectedTheme: t, onChangeTheme: i, themes: h }),
          (e[2] = i),
          (e[3] = t),
          (e[4] = a))
        : (a = e[4]),
      a
    );
  },
  j = t();
const M = () => {
  let e = (0, j.c)(7),
    { selectedTheme: t, onChangeTheme: n, themes: r } = A(),
    i;
  e[0] !== n || e[1] !== t || e[2] !== r
    ? ((i = (0, _.jsx)(T, {
        options: r,
        value: t,
        onChange: n,
        className: `w-fit`,
        renderItem: N,
      })),
      (e[0] = n),
      (e[1] = t),
      (e[2] = r),
      (e[3] = i))
    : (i = e[3]);
  let a;
  e[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((a = (0, _.jsx)(D, {})), (e[4] = a))
    : (a = e[4]);
  let o;
  return (
    e[5] === i
      ? (o = e[6])
      : ((o = (0, _.jsxs)(`article`, {
          className: `flex items-center gap-2 md:gap-4 z-50`,
          children: [i, a],
        })),
        (e[5] = i),
        (e[6] = o)),
    o
  );
};
function N(e, t) {
  return (0, _.jsxs)(_.Fragment, {
    children: [
      (0, _.jsx)(e.icon, { className: y(`text-lg md:text-xl`, e.color) }),
      (0, _.jsx)(`span`, {
        className: y(
          `flex-1 font-bold text-lg hidden md:block`,
          t ? `text-option-selected` : `text-secondary`
        ),
        children: e.name,
      }),
      t &&
        (0, _.jsx)(`div`, {
          className: `w-2 h-2 rounded-full bg-select shadow-[0_0_8px_rgba(59,130,246,0.5)] ml-1 md:ml-2`,
        }),
    ],
  });
}
var P = t();
const F = (e) => {
  let t = (0, P.c)(3),
    { onClick: n } = e,
    r;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((r = (0, _.jsx)(p, {})), (t[0] = r))
    : (r = t[0]);
  let i;
  return (
    t[1] === n
      ? (i = t[2])
      : ((i = (0, _.jsx)(`button`, {
          className: `lg:hidden p-1 md:p-2 text-theme-color text-2xl`,
          onClick: n,
          children: r,
        })),
        (t[1] = n),
        (t[2] = i)),
    i
  );
};
var I = t();
const L = (e) => {
  let t = (0, I.c)(12),
    { as: n, title: r, children: i, className: a, titleClassName: o } = e,
    s = n === void 0 ? `h1` : n,
    c;
  t[0] === a
    ? (c = t[1])
    : ((c = y(`flex items-center gap-2 md:gap-4`, a)), (t[0] = a), (t[1] = c));
  let l;
  t[2] === o ? (l = t[3]) : ((l = y(`text-theme-color`, o)), (t[2] = o), (t[3] = l));
  let u;
  t[4] !== s || t[5] !== l || t[6] !== r
    ? ((u = (0, _.jsx)(s, { className: l, children: r })),
      (t[4] = s),
      (t[5] = l),
      (t[6] = r),
      (t[7] = u))
    : (u = t[7]);
  let d;
  return (
    t[8] !== i || t[9] !== c || t[10] !== u
      ? ((d = (0, _.jsxs)(`article`, { className: c, children: [i, u] })),
        (t[8] = i),
        (t[9] = c),
        (t[10] = u),
        (t[11] = d))
      : (d = t[11]),
    d
  );
};
var R = t();
const z = () => {
  let e = (0, R.c)(1),
    t;
  return (
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((t = (0, _.jsx)(L, {
          as: `h1`,
          title: `Horas Adicionales`,
          titleClassName: `hidden sm:block text-2xl tracking-wider text-outline-white`,
          children: (0, _.jsx)(d, {
            className: `text-2xl md:text-4xl text-theme-color drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)]`,
          }),
        })),
        (e[0] = t))
      : (t = e[0]),
    t
  );
};
var B = t();
const V = (e) => {
  let t = (0, B.c)(5),
    { onOpenMobileMenu: n } = e,
    r;
  t[0] === n ? (r = t[1]) : ((r = (0, _.jsx)(F, { onClick: n })), (t[0] = n), (t[1] = r));
  let i;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((i = (0, _.jsx)(z, {})), (t[2] = i))
    : (i = t[2]);
  let a;
  return (
    t[3] === r
      ? (a = t[4])
      : ((a = (0, _.jsxs)(`article`, {
          className: `flex items-center gap-1 md:gap-4`,
          children: [r, i],
        })),
        (t[3] = r),
        (t[4] = a)),
    a
  );
};
var H = t(),
  U = () => {
    let e = (0, H.c)(6),
      [t, n] = (0, w.useState)(!1),
      r,
      i,
      a;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((r = (0, _.jsx)(V, { onOpenMobileMenu: () => n(!0) })),
        (i = (0, _.jsx)(v, {})),
        (a = (0, _.jsx)(M, {})),
        (e[0] = r),
        (e[1] = i),
        (e[2] = a))
      : ((r = e[0]), (i = e[1]), (a = e[2]));
    let o;
    e[3] === Symbol.for(`react.memo_cache_sentinel`) ? ((o = () => n(!1)), (e[3] = o)) : (o = e[3]);
    let s;
    return (
      e[4] === t
        ? (s = e[5])
        : ((s = (0, _.jsxs)(`header`, {
            className: `bg-header-bg border-b-4 border-black w-full max-w-[100vw] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-1 md:gap-4 sticky top-0 px-2 md:px-4 py-2 md:py-3 z-[100] transition-colors duration-300 box-border`,
            children: [r, i, a, (0, _.jsx)(S, { isOpen: t, onClose: o })],
          })),
          (e[4] = t),
          (e[5] = s)),
      s
    );
  },
  W = t(),
  G = (e) => {
    let t = (0, W.c)(2),
      { children: n } = e,
      r;
    return (
      t[0] === n
        ? (r = t[1])
        : ((r = (0, _.jsx)(`main`, { className: `flex flex-col overflow-x-hidden`, children: n })),
          (t[0] = n),
          (t[1] = r)),
      r
    );
  };
export { y as a, b as i, U as n, O as r, G as t };
