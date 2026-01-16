import {
  A as e,
  C as t,
  H as n,
  P as r,
  S as i,
  W as a,
  j as o,
  m as s,
} from "./vendor-CPiAnCAo.js";
import { a as c, i as l, n as u, t as d } from "./Main-DWFXURMq.js";
import { t as f } from "./HoursForm-CIkwc9GH.js";
var p = a(),
  m = n(),
  h = r();
const g = (e) => {
  let t = (0, m.c)(24),
    { data: n, onDelete: r, onEdit: a } = e;
  if (n.length === 0) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, h.jsx)(`div`, {
            className: `w-full text-center p-8 border-4 border-black border-dashed bg-white/30 rounded-sm`,
            children: (0, h.jsx)(`p`, {
              className: `text-xl font-bold text-secondary uppercase`,
              children: `No hay registros aún`,
            }),
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  let s;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, h.jsx)(`h2`, {
        className: `text-2xl font-black uppercase text-theme-color mb-4 drop-shadow-sm border-b-4 border-black inline-block pr-8`,
        children: `Registros Guardados`,
      })),
      (t[1] = s))
    : (s = t[1]);
  let c;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = (0, h.jsx)(`thead`, {
        children: (0, h.jsxs)(`tr`, {
          className: `bg-theme-header-bg border-b-4 border-black text-theme-color uppercase tracking-wider text-sm`,
          children: [
            (0, h.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black`,
              children: `Fecha`,
            }),
            (0, h.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black hidden lg:table-cell`,
              children: `Horario`,
            }),
            (0, h.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black`,
              children: `Total`,
            }),
            (0, h.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black hidden xl:table-cell`,
              children: `Ruta`,
            }),
            (0, h.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black hidden 2xl:table-cell`,
              children: `Empleado`,
            }),
            (0, h.jsx)(`th`, {
              className: `p-4 border-black font-black text-center`,
              children: `Acciones`,
            }),
          ],
        }),
      })),
      (t[2] = c))
    : (c = t[2]);
  let l;
  if (t[3] !== n || t[4] !== r || t[5] !== a) {
    let e;
    (t[7] !== r || t[8] !== a
      ? ((e = (e, t) =>
          (0, h.jsxs)(
            `tr`,
            {
              className: `border-b-2 border-black last:border-b-0 hover:bg-theme-accent/20 transition-colors duration-150 font-bold text-theme-secondary`,
              children: [
                (0, h.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black`,
                  children: [e.dia, `/`, e.mes, `/`, e.anio],
                }),
                (0, h.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black whitespace-nowrap hidden lg:table-cell`,
                  children: [e.hora_entrada, ` - `, e.hora_salida],
                }),
                (0, h.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black bg-theme-accent/10 text-theme-color`,
                  children: [e.total_horas, `h`],
                }),
                (0, h.jsx)(`td`, {
                  className: `p-4 border-r-2 border-black max-w-50 truncate hidden xl:table-cell`,
                  title: `${e.origen} -> ${e.destino}`,
                  children:
                    e.origen && e.destino
                      ? (0, h.jsxs)(h.Fragment, { children: [e.origen, ` → `, e.destino] })
                      : (0, h.jsx)(`span`, { className: `opacity-50 italic`, children: `N/A` }),
                }),
                (0, h.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black hidden 2xl:table-cell`,
                  children: [
                    e.nombre,
                    ` `,
                    e.apellido_paterno,
                    (0, h.jsx)(`div`, {
                      className: `text-xs opacity-60 font-mono`,
                      children: e.numero_empleado,
                    }),
                  ],
                }),
                (0, h.jsx)(`td`, {
                  className: `p-4 text-center`,
                  children: (0, h.jsxs)(`div`, {
                    className: `flex items-center justify-center gap-2`,
                    children: [
                      (0, h.jsx)(`button`, {
                        onClick: () => a(t),
                        className: `p-2 bg-theme-accent hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`,
                        title: `Editar registro`,
                        children: (0, h.jsx)(i, { size: 18 }),
                      }),
                      (0, h.jsx)(`button`, {
                        onClick: () => r(t),
                        className: `p-2 bg-action-delete hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`,
                        title: `Eliminar registro`,
                        children: (0, h.jsx)(o, { size: 18 }),
                      }),
                    ],
                  }),
                }),
              ],
            },
            t
          )),
        (t[7] = r),
        (t[8] = a),
        (t[9] = e))
      : (e = t[9]),
      (l = n.map(e)),
      (t[3] = n),
      (t[4] = r),
      (t[5] = a),
      (t[6] = l));
  } else l = t[6];
  let u;
  t[10] === l
    ? (u = t[11])
    : ((u = (0, h.jsx)(`div`, {
        className: `hidden md:block overflow-x-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`,
        children: (0, h.jsxs)(`table`, {
          className: `w-full bg-theme-bg text-left border-collapse`,
          children: [c, (0, h.jsx)(`tbody`, { children: l })],
        }),
      })),
      (t[10] = l),
      (t[11] = u));
  let d;
  if (t[12] !== n || t[13] !== r || t[14] !== a) {
    let e;
    (t[16] !== r || t[17] !== a
      ? ((e = (e, t) =>
          (0, h.jsxs)(
            `div`,
            {
              className: `border-4 border-black bg-theme-bg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-2`,
              children: [
                (0, h.jsxs)(`div`, {
                  className: `absolute top-2 right-2 flex gap-2`,
                  children: [
                    (0, h.jsx)(`button`, {
                      onClick: () => a(t),
                      className: `p-2 bg-theme-accent hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all`,
                      children: (0, h.jsx)(i, { size: 14 }),
                    }),
                    (0, h.jsx)(`button`, {
                      onClick: () => r(t),
                      className: `p-2 bg-action-delete hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all`,
                      children: (0, h.jsx)(o, { size: 16 }),
                    }),
                  ],
                }),
                (0, h.jsx)(`div`, {
                  className: `border-b-2 border-black pb-2 mb-2`,
                  children: (0, h.jsxs)(`span`, {
                    className: `bg-theme-header-bg px-2 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest`,
                    children: [e.dia, `/`, e.mes, `/`, e.anio],
                  }),
                }),
                (0, h.jsxs)(`div`, {
                  className: `flex justify-between items-center text-theme-color font-bold`,
                  children: [
                    (0, h.jsxs)(`div`, {
                      className: `flex flex-col`,
                      children: [
                        (0, h.jsx)(`span`, {
                          className: `text-xs text-secondary uppercase`,
                          children: `Horario`,
                        }),
                        (0, h.jsxs)(`span`, { children: [e.hora_entrada, ` - `, e.hora_salida] }),
                      ],
                    }),
                    (0, h.jsxs)(`div`, {
                      className: `flex flex-col text-right`,
                      children: [
                        (0, h.jsx)(`span`, {
                          className: `text-xs text-secondary uppercase`,
                          children: `Total`,
                        }),
                        (0, h.jsxs)(`span`, {
                          className: `text-xl bg-theme-accent text-white px-2 border-2 border-black -rotate-2 shadow-sm inline-block`,
                          children: [e.total_horas, `h`],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, h.jsxs)(`div`, {
                  className: `mt-2 text-sm font-semibold text-secondary border-t-2 border-dashed border-black pt-2`,
                  children: [
                    (0, h.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, h.jsx)(`div`, { className: `w-2 h-2 bg-black rounded-full` }),
                        e.origen,
                      ],
                    }),
                    (0, h.jsx)(`div`, { className: `ml-1 border-l-2 border-black h-3 my-0.5` }),
                    (0, h.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, h.jsx)(`div`, {
                          className: `w-2 h-2 bg-theme-accent border border-black rounded-full`,
                        }),
                        e.destino,
                      ],
                    }),
                  ],
                }),
                (0, h.jsxs)(`div`, {
                  className: `mt-2 pt-2 border-t-2 border-black text-xs text-right font-mono text-secondary`,
                  children: [e.nombre, ` `, e.apellido_paterno, ` (`, e.numero_empleado, `)`],
                }),
              ],
            },
            t
          )),
        (t[16] = r),
        (t[17] = a),
        (t[18] = e))
      : (e = t[18]),
      (d = n.map(e)),
      (t[12] = n),
      (t[13] = r),
      (t[14] = a),
      (t[15] = d));
  } else d = t[15];
  let f;
  t[19] === d
    ? (f = t[20])
    : ((f = (0, h.jsx)(`div`, { className: `grid grid-cols-1 gap-4 md:hidden`, children: d })),
      (t[19] = d),
      (t[20] = f));
  let p;
  return (
    t[21] !== u || t[22] !== f
      ? ((p = (0, h.jsxs)(`div`, { className: `w-full space-y-4`, children: [s, u, f] })),
        (t[21] = u),
        (t[22] = f),
        (t[23] = p))
      : (p = t[23]),
    p
  );
};
var _ = n();
const v = (n) => {
  let r = (0, _.c)(12),
    { isFormOpen: i, onToggleForm: a } = n,
    o = i
      ? `bg-action-delete text-white hover:brightness-110`
      : `bg-action-create text-white hover:brightness-110`,
    l;
  r[0] === o
    ? (l = r[1])
    : ((l = c(
        `flex items-center gap-2 px-6 py-3 font-black uppercase text-sm border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5`,
        o
      )),
      (r[0] = o),
      (r[1] = l));
  let u;
  r[2] === i
    ? (u = r[3])
    : ((u = i ? (0, h.jsx)(e, { size: 16 }) : (0, h.jsx)(t, { size: 16 })), (r[2] = i), (r[3] = u));
  let d = i ? `Cerrar Formulario` : `Nuevo Registro`,
    f;
  r[4] !== a || r[5] !== l || r[6] !== u || r[7] !== d
    ? ((f = (0, h.jsx)(`div`, {
        className: `flex items-center gap-4`,
        children: (0, h.jsxs)(`button`, { onClick: a, className: l, children: [u, d] }),
      })),
      (r[4] = a),
      (r[5] = l),
      (r[6] = u),
      (r[7] = d),
      (r[8] = f))
    : (f = r[8]);
  let p;
  r[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((p = (0, h.jsx)(`div`, {
        className: `flex items-center gap-2`,
        children: (0, h.jsxs)(`div`, {
          className: `items-center gap-2 px-4 py-2 border-2 border-black bg-white/50 opacity-60 cursor-not-allowed hidden md:flex`,
          children: [
            (0, h.jsx)(s, { className: `text-secondary` }),
            (0, h.jsx)(`span`, {
              className: `text-secondary font-bold text-xs uppercase`,
              children: `Filtros (Próximamente)`,
            }),
          ],
        }),
      })),
      (r[9] = p))
    : (p = r[9]);
  let m;
  return (
    r[10] === f
      ? (m = r[11])
      : ((m = (0, h.jsxs)(`div`, {
          className: `w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8`,
          children: [f, p],
        })),
        (r[10] = f),
        (r[11] = m)),
    m
  );
};
var y = n(),
  b = () => {
    let n = (0, y.c)(35),
      [r, i] = (0, p.useState)(!1),
      [a, o] = (0, p.useState)(null),
      [s, m] = (0, p.useState)(x),
      _;
    n[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((_ = {
          empresa: ``,
          numero_empleado: ``,
          nombre: ``,
          apellido_paterno: ``,
          apellido_materno: ``,
          telefono: ``,
          dia: ``,
          mes: ``,
          anio: ``,
          hora_entrada: ``,
          hora_salida: ``,
          origen: ``,
          destino: ``,
          total_horas: ``,
        }),
        (n[0] = _))
      : (_ = n[0]);
    let [b, S] = (0, p.useState)(_),
      C,
      w;
    (n[1] === s
      ? ((C = n[2]), (w = n[3]))
      : ((C = () => {
          localStorage.setItem(`horas-data`, JSON.stringify(s));
        }),
        (w = [s]),
        (n[1] = s),
        (n[2] = C),
        (n[3] = w)),
      (0, p.useEffect)(C, w));
    let T;
    n[4] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((T = (e) => {
          let { name: t, value: n } = e.target;
          S((e) => {
            let r = { ...e, [t]: n };
            return (
              (t === `hora_entrada` || t === `hora_salida`) &&
                r.hora_entrada &&
                r.hora_salida &&
                (r.total_horas = l(r.hora_entrada, r.hora_salida)),
              r
            );
          });
        }),
        (n[4] = T))
      : (T = n[4]);
    let E = T,
      D;
    n[5] !== a || n[6] !== s || n[7] !== b
      ? ((D = () => {
          if (!b.empresa || !b.dia || !b.hora_entrada) {
            alert(`Por favor completa los campos obligatorios`);
            return;
          }
          if (a !== null) {
            let e = [...s];
            ((e[a] = b), m(e), o(null));
          } else m([...s, b]);
          (S({
            empresa: ``,
            numero_empleado: ``,
            nombre: ``,
            apellido_paterno: ``,
            apellido_materno: ``,
            telefono: ``,
            dia: ``,
            mes: ``,
            anio: ``,
            hora_entrada: ``,
            hora_salida: ``,
            origen: ``,
            destino: ``,
            total_horas: ``,
            ramo: ``,
          }),
            i(!1));
        }),
        (n[5] = a),
        (n[6] = s),
        (n[7] = b),
        (n[8] = D))
      : (D = n[8]);
    let O = D,
      k;
    n[9] === s
      ? (k = n[10])
      : ((k = (e) => {
          (S(s[e]), o(e), i(!0));
        }),
        (n[9] = s),
        (n[10] = k));
    let A = k,
      j;
    n[11] !== a || n[12] !== s
      ? ((j = (e) => {
          (m(s.filter((t, n) => n !== e)), a === e && (o(null), i(!1)));
        }),
        (n[11] = a),
        (n[12] = s),
        (n[13] = j))
      : (j = n[13]);
    let M = j,
      N;
    n[14] === r
      ? (N = n[15])
      : ((N = () => {
          r
            ? (i(!1), o(null))
            : (S({
                empresa: ``,
                numero_empleado: ``,
                nombre: ``,
                apellido_paterno: ``,
                apellido_materno: ``,
                telefono: ``,
                dia: ``,
                mes: ``,
                anio: ``,
                hora_entrada: ``,
                hora_salida: ``,
                origen: ``,
                destino: ``,
                total_horas: ``,
                ramo: ``,
              }),
              o(null),
              i(!0));
        }),
        (n[14] = r),
        (n[15] = N));
    let P = N,
      F;
    n[16] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((F = (0, h.jsx)(u, {})), (n[16] = F))
      : (F = n[16]);
    let I;
    n[17] !== P || n[18] !== r
      ? ((I = (0, h.jsx)(v, { isFormOpen: r, onToggleForm: P })),
        (n[17] = P),
        (n[18] = r),
        (n[19] = I))
      : (I = n[19]);
    let L;
    n[20] !== a || n[21] !== O || n[22] !== r || n[23] !== b
      ? ((L =
          r &&
          (0, h.jsx)(`div`, {
            className: `fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 xl:static xl:z-auto xl:bg-transparent xl:p-0 xl:backdrop-blur-none xl:flex-col xl:w-auto xl:min-w-112.5 animate-in fade-in duration-200 xl:slide-in-from-left`,
            children: (0, h.jsxs)(`div`, {
              className: `w-full max-h-[90vh] overflow-y-auto no-scrollbar xl:overflow-visible xl:max-h-none flex flex-col items-center gap-6 xl:gap-0`,
              children: [
                (0, h.jsx)(`div`, {
                  className: `w-full flex justify-end xl:hidden sticky top-0 z-10 mb-2`,
                  children: (0, h.jsx)(`button`, {
                    onClick: () => i(!1),
                    className: `bg-red-500 text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5 active:shadow-none transition-all`,
                    children: (0, h.jsx)(e, { size: 24 }),
                  }),
                }),
                (0, h.jsx)(f, { formData: b, onChange: E, setFormData: S }),
                (0, h.jsxs)(`button`, {
                  onClick: () => {
                    O();
                  },
                  className: `mt-8 group flex items-center gap-3 bg-action-create text-white border-4 border-black font-black uppercase tracking-widest text-xl py-4 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer w-full justify-center xl:w-auto xl:mt-8`,
                  children: [
                    (0, h.jsx)(t, {
                      className: c(
                        `transition-transform duration-300`,
                        a === null ? `group-hover:rotate-90` : ``
                      ),
                    }),
                    a === null ? `Registrar` : `Actualizar`,
                  ],
                }),
                (0, h.jsx)(`div`, { className: `h-8 xl:hidden` }),
              ],
            }),
          })),
        (n[20] = a),
        (n[21] = O),
        (n[22] = r),
        (n[23] = b),
        (n[24] = L))
      : (L = n[24]);
    let R;
    n[25] !== M || n[26] !== A || n[27] !== s
      ? ((R = (0, h.jsx)(`div`, {
          className: `w-full xl:flex-1 h-full animate-in fade-in duration-500`,
          children: (0, h.jsx)(g, { data: s, onDelete: M, onEdit: A }),
        })),
        (n[25] = M),
        (n[26] = A),
        (n[27] = s),
        (n[28] = R))
      : (R = n[28]);
    let z;
    n[29] !== L || n[30] !== R
      ? ((z = (0, h.jsxs)(`div`, {
          className: `flex flex-col xl:flex-row items-start justify-center w-full gap-8`,
          children: [L, R],
        })),
        (n[29] = L),
        (n[30] = R),
        (n[31] = z))
      : (z = n[31]);
    let B;
    return (
      n[32] !== z || n[33] !== I
        ? ((B = (0, h.jsxs)(h.Fragment, {
            children: [
              F,
              (0, h.jsx)(d, {
                children: (0, h.jsxs)(`div`, {
                  className: `w-full flex flex-col py-8 px-4`,
                  children: [I, z],
                }),
              }),
            ],
          })),
          (n[32] = z),
          (n[33] = I),
          (n[34] = B))
        : (B = n[34]),
      B
    );
  };
function x() {
  let e = localStorage.getItem(`horas-data`);
  return e ? JSON.parse(e) : [];
}
export { b as default };
