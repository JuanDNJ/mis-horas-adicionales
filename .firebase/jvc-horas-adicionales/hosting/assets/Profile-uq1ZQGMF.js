import { H as e, P as t, W as n } from "./vendor-CPiAnCAo.js";
import { r } from "./index-BS8tadSv.js";
import { n as i, t as a } from "./Main-DWFXURMq.js";
var o = e(),
  s = n();
const c = () => {
  let e = (0, s.useContext)(r);
  if (e === void 0) throw Error(`useProfileContext debe ser usado dentro de un UserProvider`);
  return e;
};
var l = t(),
  u = () => {
    let e = (0, o.c)(14),
      { displayName: t, photoURL: n } = c(),
      r;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((r = (0, l.jsx)(i, {})), (e[0] = r))
      : (r = e[0]);
    let s;
    e[1] !== t || e[2] !== n
      ? ((s =
          n && n.length > 0
            ? (0, l.jsx)(`img`, {
                src: n,
                alt: t.charAt(0).toUpperCase(),
                className: `w-full h-full rounded-full object-cover`,
              })
            : `A`),
        (e[1] = t),
        (e[2] = n),
        (e[3] = s))
      : (s = e[3]);
    let u;
    e[4] === s
      ? (u = e[5])
      : ((u = (0, l.jsx)(`article`, {
          className: `w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-4xl text-gray-600 font-bold`,
          children: s,
        })),
        (e[4] = s),
        (e[5] = u));
    let d;
    e[6] === t
      ? (d = e[7])
      : ((d =
          t &&
          t.length > 0 &&
          (0, l.jsxs)(`h2`, {
            className: `text-2xl font-bold text-theme-color mb-2`,
            children: [`Usuario `, t],
          })),
        (e[6] = t),
        (e[7] = d));
    let f;
    e[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((f = (0, l.jsx)(`p`, {
          className: `text-secondary mb-6 text-center`,
          children: `Bienvenido a tu perfil. Aquí podrás gestionar tu información personal y ajustes.`,
        })),
        (e[8] = f))
      : (f = e[8]);
    let p;
    e[9] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, l.jsxs)(`div`, {
          className: `p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between`,
          children: [
            (0, l.jsx)(`span`, { className: `text-secondary font-medium`, children: `Email:` }),
            (0, l.jsx)(`span`, {
              className: `text-theme-color font-bold`,
              children: `usuario@ejemplo.com`,
            }),
          ],
        })),
        (e[9] = p))
      : (p = e[9]);
    let m;
    e[10] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((m = (0, l.jsxs)(`article`, {
          className: `w-full space-y-3`,
          children: [
            p,
            (0, l.jsxs)(`div`, {
              className: `p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between`,
              children: [
                (0, l.jsx)(`span`, { className: `text-secondary font-medium`, children: `Rol:` }),
                (0, l.jsx)(`span`, {
                  className: `text-theme-color font-bold`,
                  children: `Administrador`,
                }),
              ],
            }),
          ],
        })),
        (e[10] = m))
      : (m = e[10]);
    let h;
    return (
      e[11] !== u || e[12] !== d
        ? ((h = (0, l.jsxs)(l.Fragment, {
            children: [
              r,
              (0, l.jsx)(a, {
                children: (0, l.jsxs)(`section`, {
                  className: `flex flex-col items-center justify-center w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 mx-4`,
                  children: [u, d, f, m],
                }),
              }),
            ],
          })),
          (e[11] = u),
          (e[12] = d),
          (e[13] = h))
        : (h = e[13]),
      h
    );
  };
export { u as default };
