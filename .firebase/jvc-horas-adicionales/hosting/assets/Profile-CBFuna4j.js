import {
  Z as e,
  _ as ee,
  a as te,
  d as t,
  it as ne,
  l as re,
  o as ie,
  s as ae,
  st as oe,
  u as se,
  v as ce,
  y as le,
} from "./vendor-CuWPEnc8.js";
import { a as ue } from "./index-CSZ_YMvB.js";
import { n as de, t as fe } from "./Main-B5QIXc64.js";
import { t as pe } from "./useUserProfile-DVLzSzBY.js";
var me = oe(),
  n = e(),
  he = () => {
    let e = (0, me.c)(82),
      { displayName: oe, photoURL: he } = ue(),
      { userProfile: r, isLoading: i } = pe(),
      a = ne(),
      o = r?.displayName || oe || `USUARIO ANONIMO`,
      s = r?.photoURL || he,
      c = r?.phoneNumber,
      l = r?.employeeId,
      u = !r || !r.jobTitle || !r.sector || !r.employeeId,
      d;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((d = (0, n.jsx)(de, {})), (e[0] = d))
      : (d = e[0]);
    let f;
    e[1] !== u || e[2] !== i || e[3] !== a
      ? ((f =
          u &&
          !i &&
          (0, n.jsxs)(`div`, {
            className: `mb-8 relative group cursor-pointer`,
            onClick: () => a(`/create-profile`),
            children: [
              (0, n.jsx)(`div`, {
                className: `absolute inset-0 bg-black translate-x-2 translate-y-2 box-border`,
              }),
              (0, n.jsxs)(`div`, {
                className: `relative bg-yellow-300 border-4 border-black p-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:-translate-y-1 hover:-translate-x-1 hover:bg-yellow-400 transition-all`,
                children: [
                  (0, n.jsxs)(`div`, {
                    className: `flex items-center gap-4`,
                    children: [
                      (0, n.jsx)(`div`, {
                        className: `bg-red-500 text-white p-2 border-2 border-black rounded-full shrink-0`,
                        children: (0, n.jsx)(ae, { size: 24, fill: `white` }),
                      }),
                      (0, n.jsxs)(`div`, {
                        className: `text-center sm:text-left`,
                        children: [
                          (0, n.jsx)(`h3`, {
                            className: `font-black uppercase text-lg leading-none`,
                            children: `Perfil Incompleto`,
                          }),
                          (0, n.jsx)(`p`, {
                            className: `font-bold text-xs text-slate-800 mt-1`,
                            children: `¡Completa tu ficha para operar!`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, n.jsxs)(`div`, {
                    className: `bg-white px-3 py-2 font-black uppercase text-sm border-2 border-black shadow-[2px_2px_0_0_#000] flex items-center gap-2`,
                    children: [`Completar Ahora `, (0, n.jsx)(t, { size: 14 })],
                  }),
                ],
              }),
            ],
          })),
        (e[1] = u),
        (e[2] = i),
        (e[3] = a),
        (e[4] = f))
      : (f = e[4]);
    let p;
    e[5] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, n.jsx)(`div`, {
          className: `absolute inset-0 bg-black translate-x-2 translate-y-2 box-border`,
        })),
        (e[5] = p))
      : (p = e[5]);
    let m;
    e[6] === a ? (m = e[7]) : ((m = () => a(`/create-profile`)), (e[6] = a), (e[7] = m));
    let h;
    e[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((h = (0, n.jsx)(t, { size: 16 })), (e[8] = h))
      : (h = e[8]);
    let g;
    e[9] === m
      ? (g = e[10])
      : ((g = (0, n.jsx)(`button`, {
          onClick: m,
          className: `absolute top-2 right-2 p-2 bg-white border-2 border-black hover:bg-yellow-300 transition-colors z-10 shadow-[2px_2px_0_0_#000]`,
          title: `Editar Datos`,
          children: h,
        })),
        (e[9] = m),
        (e[10] = g));
    let _;
    e[11] === a ? (_ = e[12]) : ((_ = () => a(`/create-profile`)), (e[11] = a), (e[12] = _));
    let v;
    e[13] === s
      ? (v = e[14])
      : ((v = s
          ? (0, n.jsx)(`img`, { src: s, alt: `Profile`, className: `w-full h-full object-cover` })
          : (0, n.jsx)(ie, { size: 48, className: `text-black` })),
        (e[13] = s),
        (e[14] = v));
    let y;
    e[15] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((y = (0, n.jsx)(`div`, {
          className: `absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`,
          children: (0, n.jsx)(ee, { className: `text-white drop-shadow-md`, size: 24 }),
        })),
        (e[15] = y))
      : (y = e[15]);
    let b;
    e[16] === v
      ? (b = e[17])
      : ((b = (0, n.jsxs)(`div`, {
          className: `w-24 h-24 bg-cyan-400 border-4 border-black rounded-full flex items-center justify-center overflow-hidden box-border relative`,
          children: [v, y],
        })),
        (e[16] = v),
        (e[17] = b));
    let x;
    e[18] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((x = (0, n.jsx)(`div`, {
          className: `absolute -top-2 -right-2 bg-red-500 text-white p-1 border-2 border-black rotate-12 box-border`,
          children: (0, n.jsx)(te, { size: 16, fill: `white` }),
        })),
        (e[18] = x))
      : (x = e[18]);
    let S;
    e[19] !== _ || e[20] !== b
      ? ((S = (0, n.jsxs)(`div`, {
          className: `relative shrink-0 group cursor-pointer`,
          onClick: _,
          children: [b, x],
        })),
        (e[19] = _),
        (e[20] = b),
        (e[21] = S))
      : (S = e[21]);
    let C;
    e[22] === o
      ? (C = e[23])
      : ((C = (0, n.jsx)(`div`, {
          className: `flex items-center justify-center sm:justify-start gap-2`,
          children: (0, n.jsx)(`h1`, {
            className: `text-2xl sm:text-4xl font-black uppercase italic tracking-tighter mb-2 leading-none break-words`,
            children: o,
          }),
        })),
        (e[22] = o),
        (e[23] = C));
    let w;
    e[24] === c
      ? (w = e[25])
      : ((w =
          c &&
          (0, n.jsxs)(`div`, {
            className: `flex justify-center sm:justify-start items-center gap-2 mb-2`,
            children: [
              (0, n.jsx)(se, { size: 14, className: `text-slate-600` }),
              (0, n.jsx)(`span`, { className: `font-bold text-sm text-slate-600`, children: c }),
            ],
          })),
        (e[24] = c),
        (e[25] = w));
    let T;
    e[26] !== a || e[27] !== r
      ? ((T = r?.jobTitle
          ? (0, n.jsx)(`div`, {
              className: `bg-black text-yellow-400 px-3 py-1 text-xs font-bold uppercase skew-x-[-10deg] box-border`,
              children: r.jobTitle,
            })
          : (0, n.jsxs)(`button`, {
              onClick: () => a(`/create-profile`),
              className: `bg-amber-100 text-amber-700 hover:text-amber-900 px-3 py-1 text-xs font-bold uppercase skew-x-[-10deg] border-2 border-amber-500 box-border flex items-center gap-1 cursor-pointer`,
              children: [`Definir Puesto `, (0, n.jsx)(re, { size: 10, strokeWidth: 4 })],
            })),
        (e[26] = a),
        (e[27] = r),
        (e[28] = T))
      : (T = e[28]);
    let E;
    e[29] === l
      ? (E = e[30])
      : ((E = l
          ? (0, n.jsxs)(`div`, {
              className: `bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase border-2 border-black box-border`,
              children: [`ID: `, l],
            })
          : (0, n.jsx)(`div`, {
              className: `bg-red-100 text-red-700 px-2 py-1 text-xs font-bold uppercase border-2 border-red-500 box-border`,
              children: `ID: Sin Asignar`,
            })),
        (e[29] = l),
        (e[30] = E));
    let D;
    e[31] !== T || e[32] !== E
      ? ((D = (0, n.jsxs)(`div`, {
          className: `flex flex-wrap gap-2 justify-center sm:justify-start`,
          children: [T, E],
        })),
        (e[31] = T),
        (e[32] = E),
        (e[33] = D))
      : (D = e[33]);
    let O;
    e[34] !== C || e[35] !== w || e[36] !== D
      ? ((O = (0, n.jsxs)(`div`, {
          className: `text-center sm:text-left w-full overflow-hidden`,
          children: [C, w, D],
        })),
        (e[34] = C),
        (e[35] = w),
        (e[36] = D),
        (e[37] = O))
      : (O = e[37]);
    let k;
    e[38] !== S || e[39] !== O
      ? ((k = (0, n.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row items-center gap-4 sm:gap-6`,
          children: [S, O],
        })),
        (e[38] = S),
        (e[39] = O),
        (e[40] = k))
      : (k = e[40]);
    let A;
    e[41] !== k || e[42] !== g
      ? ((A = (0, n.jsxs)(`div`, {
          className: `relative mb-8`,
          children: [
            p,
            (0, n.jsxs)(`div`, {
              className: `relative bg-white border-4 border-black p-4 md:p-6 -rotate-1 box-border`,
              children: [g, k],
            }),
          ],
        })),
        (e[41] = k),
        (e[42] = g),
        (e[43] = A))
      : (A = e[43]);
    let j;
    e[44] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((j = (0, n.jsxs)(`h2`, {
          className: `font-black uppercase text-sm flex items-center gap-2 italic`,
          children: [(0, n.jsx)(ce, { size: 16 }), ` Sector Actual`],
        })),
        (e[44] = j))
      : (j = e[44]);
    let M;
    e[45] === a
      ? (M = e[46])
      : ((M = (0, n.jsxs)(`div`, {
          className: `flex justify-between items-center border-b-2 border-black mb-3 pb-2`,
          children: [
            j,
            (0, n.jsx)(`button`, {
              onClick: () => a(`/create-profile`),
              className: `opacity-0 group-hover:opacity-100 text-[10px] font-black bg-cyan-300 border-2 border-black px-2 hover:bg-cyan-400 transition-all uppercase`,
              children: `Editar`,
            }),
          ],
        })),
        (e[45] = a),
        (e[46] = M));
    let N = r?.sector ? `font-bold text-slate-700` : `font-bold text-amber-600 italic`,
      P = r?.sector || `Pendiente de definir`,
      F;
    e[47] !== N || e[48] !== P
      ? ((F = (0, n.jsx)(`p`, { className: N, children: P })),
        (e[47] = N),
        (e[48] = P),
        (e[49] = F))
      : (F = e[49]);
    let I;
    e[50] !== M || e[51] !== F
      ? ((I = (0, n.jsxs)(`div`, {
          className: `bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair box-border group`,
          children: [M, F],
        })),
        (e[50] = M),
        (e[51] = F),
        (e[52] = I))
      : (I = e[52]);
    let L;
    e[53] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((L = (0, n.jsxs)(`h2`, {
          className: `font-black uppercase text-sm flex items-center gap-2 italic`,
          children: [(0, n.jsx)(le, { size: 16 }), ` Cargo`],
        })),
        (e[53] = L))
      : (L = e[53]);
    let R;
    e[54] === a
      ? (R = e[55])
      : ((R = (0, n.jsxs)(`div`, {
          className: `flex justify-between items-center border-b-2 border-black mb-3 pb-2`,
          children: [
            L,
            (0, n.jsx)(`button`, {
              onClick: () => a(`/create-profile`),
              className: `opacity-0 group-hover:opacity-100 text-[10px] font-black bg-cyan-300 border-2 border-black px-2 hover:bg-cyan-400 transition-all uppercase`,
              children: `Editar`,
            }),
          ],
        })),
        (e[54] = a),
        (e[55] = R));
    let z = r?.jobTitle ? `font-bold text-slate-700` : `font-bold text-amber-600 italic`,
      B = r?.jobTitle || `Pendiente de definir`,
      V;
    e[56] !== z || e[57] !== B
      ? ((V = (0, n.jsx)(`p`, { className: z, children: B })),
        (e[56] = z),
        (e[57] = B),
        (e[58] = V))
      : (V = e[58]);
    let H;
    e[59] !== R || e[60] !== V
      ? ((H = (0, n.jsxs)(`div`, {
          className: `bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-crosshair box-border group`,
          children: [R, V],
        })),
        (e[59] = R),
        (e[60] = V),
        (e[61] = H))
      : (H = e[61]);
    let U;
    e[62] !== I || e[63] !== H
      ? ((U = (0, n.jsxs)(`div`, {
          className: `grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8`,
          children: [I, H],
        })),
        (e[62] = I),
        (e[63] = H),
        (e[64] = U))
      : (U = e[64]);
    let W;
    e[65] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((W = (0, n.jsx)(`div`, {
          className: `absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-2xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1 box-border`,
        })),
        (e[65] = W))
      : (W = e[65]);
    let G;
    e[66] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((G = (0, n.jsx)(`h2`, {
          className: `text-xl sm:text-2xl font-black italic uppercase`,
          children: `Bolsa de Horas`,
        })),
        (e[66] = G))
      : (G = e[66]);
    let K = r?.status || `INACTIVO`,
      q;
    e[67] === K
      ? (q = e[68])
      : ((q = (0, n.jsxs)(`div`, {
          className: `flex justify-between items-center mb-4`,
          children: [
            G,
            (0, n.jsx)(`div`, {
              className: `bg-white text-black px-2 py-1 font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] box-border`,
              children: K,
            }),
          ],
        })),
        (e[67] = K),
        (e[68] = q));
    let J = r?.totalHours || `0`,
      Y;
    e[69] === J
      ? (Y = e[70])
      : ((Y = (0, n.jsx)(`span`, {
          className: `text-5xl sm:text-6xl font-black leading-none tracking-tighter shadow-black drop-shadow-sm`,
          children: J,
        })),
        (e[69] = J),
        (e[70] = Y));
    let X;
    e[71] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((X = (0, n.jsx)(`span`, {
          className: `text-lg sm:text-xl font-black uppercase underline decoration-white decoration-4 mb-2`,
          children: `Registradas!`,
        })),
        (e[71] = X))
      : (X = e[71]);
    let Z;
    e[72] === Y
      ? (Z = e[73])
      : ((Z = (0, n.jsxs)(`div`, {
          className: `flex items-end gap-2 flex-wrap`,
          children: [Y, X],
        })),
        (e[72] = Y),
        (e[73] = Z));
    let Q;
    e[74] !== q || e[75] !== Z
      ? ((Q = (0, n.jsxs)(`div`, {
          className: `relative group cursor-pointer`,
          children: [
            W,
            (0, n.jsxs)(`div`, {
              className: `relative bg-red-500 border-4 border-black p-6 rounded-2xl text-white hover:bg-red-600 transition-colors box-border`,
              children: [q, Z],
            }),
          ],
        })),
        (e[74] = q),
        (e[75] = Z),
        (e[76] = Q))
      : (Q = e[76]);
    let $;
    return (
      e[77] !== f || e[78] !== A || e[79] !== U || e[80] !== Q
        ? (($ = (0, n.jsxs)(n.Fragment, {
            children: [
              d,
              (0, n.jsx)(fe, {
                children: (0, n.jsxs)(`div`, {
                  className: `w-full max-w-7xl mx-auto p-6 font-mono`,
                  children: [f, A, U, Q],
                }),
              }),
            ],
          })),
          (e[77] = f),
          (e[78] = A),
          (e[79] = U),
          (e[80] = Q),
          (e[81] = $))
        : ($ = e[81]),
      $
    );
  };
export { he as default };
