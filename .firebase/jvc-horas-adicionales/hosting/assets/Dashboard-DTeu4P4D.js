import {
  A as e,
  B as t,
  J as n,
  P as r,
  Z as i,
  lt as a,
  q as o,
  st as s,
  z as c,
} from "./vendor-CuWPEnc8.js";
import {
  a as l,
  c as u,
  f as d,
  g as f,
  h as p,
  l as m,
  m as h,
  o as g,
  p as _,
  u as v,
} from "./firebase-CTKiUIgJ.js";
import { n as y, t as b } from "./index-CSZ_YMvB.js";
import { a as x, i as S, n as C, t as w } from "./Main-B5QIXc64.js";
import { t as T } from "./useUserProfile-DVLzSzBY.js";
import { t as E } from "./HoursForm-D56zjIA9.js";
var D = a(),
  O = s(),
  k = i();
const A = (e) => {
  let t = (0, O.c)(24),
    { data: r, onDelete: i, onEdit: a } = e;
  if (r.length === 0) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, k.jsx)(`div`, {
            className: `w-full text-center p-8 border-4 border-black border-dashed bg-white/30 rounded-sm`,
            children: (0, k.jsx)(`p`, {
              className: `text-xl font-bold text-secondary uppercase`,
              children: `No hay registros aún`,
            }),
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  let o;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((o = (0, k.jsx)(`h2`, {
        className: `text-2xl font-black uppercase text-theme-color mb-4 drop-shadow-sm border-b-4 border-black inline-block pr-8`,
        children: `Registros Guardados`,
      })),
      (t[1] = o))
    : (o = t[1]);
  let s;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, k.jsx)(`thead`, {
        children: (0, k.jsxs)(`tr`, {
          className: `bg-theme-header-bg border-b-4 border-black text-theme-color uppercase tracking-wider text-sm`,
          children: [
            (0, k.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black`,
              children: `Fecha`,
            }),
            (0, k.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black hidden lg:table-cell`,
              children: `Horario`,
            }),
            (0, k.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black`,
              children: `Total`,
            }),
            (0, k.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black hidden xl:table-cell`,
              children: `Ruta`,
            }),
            (0, k.jsx)(`th`, {
              className: `p-4 border-r-2 border-black font-black hidden 2xl:table-cell`,
              children: `Empleado`,
            }),
            (0, k.jsx)(`th`, {
              className: `p-4 border-black font-black text-center`,
              children: `Acciones`,
            }),
          ],
        }),
      })),
      (t[2] = s))
    : (s = t[2]);
  let l;
  if (t[3] !== r || t[4] !== i || t[5] !== a) {
    let e;
    (t[7] !== i || t[8] !== a
      ? ((e = (e, t) =>
          (0, k.jsxs)(
            `tr`,
            {
              className: `border-b-2 border-black last:border-b-0 hover:bg-theme-accent/20 transition-colors duration-150 font-bold text-theme-secondary`,
              children: [
                (0, k.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black`,
                  children: [e.dia, `/`, e.mes, `/`, e.anio],
                }),
                (0, k.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black whitespace-nowrap hidden lg:table-cell`,
                  children: [e.hora_entrada, ` - `, e.hora_salida],
                }),
                (0, k.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black bg-theme-accent/10 text-theme-color`,
                  children: [e.total_horas, `h`],
                }),
                (0, k.jsx)(`td`, {
                  className: `p-4 border-r-2 border-black max-w-50 truncate hidden xl:table-cell`,
                  title: `${e.origen} -> ${e.destino}`,
                  children:
                    e.origen && e.destino
                      ? (0, k.jsxs)(k.Fragment, { children: [e.origen, ` → `, e.destino] })
                      : (0, k.jsx)(`span`, { className: `opacity-50 italic`, children: `N/A` }),
                }),
                (0, k.jsxs)(`td`, {
                  className: `p-4 border-r-2 border-black hidden 2xl:table-cell`,
                  children: [
                    e.nombre,
                    ` `,
                    e.apellido_paterno,
                    (0, k.jsx)(`div`, {
                      className: `text-xs opacity-60 font-mono`,
                      children: e.numero_empleado,
                    }),
                  ],
                }),
                (0, k.jsx)(`td`, {
                  className: `p-4 text-center`,
                  children: (0, k.jsxs)(`div`, {
                    className: `flex items-center justify-center gap-2`,
                    children: [
                      (0, k.jsx)(`button`, {
                        onClick: () => a(t),
                        className: `p-2 bg-theme-accent hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`,
                        title: `Editar registro`,
                        children: (0, k.jsx)(c, { size: 18 }),
                      }),
                      (0, k.jsx)(`button`, {
                        onClick: () => i(t),
                        className: `p-2 bg-action-delete hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`,
                        title: `Eliminar registro`,
                        children: (0, k.jsx)(n, { size: 18 }),
                      }),
                    ],
                  }),
                }),
              ],
            },
            t
          )),
        (t[7] = i),
        (t[8] = a),
        (t[9] = e))
      : (e = t[9]),
      (l = r.map(e)),
      (t[3] = r),
      (t[4] = i),
      (t[5] = a),
      (t[6] = l));
  } else l = t[6];
  let u;
  t[10] === l
    ? (u = t[11])
    : ((u = (0, k.jsx)(`div`, {
        className: `hidden md:block overflow-x-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`,
        children: (0, k.jsxs)(`table`, {
          className: `w-full bg-theme-bg text-left border-collapse`,
          children: [s, (0, k.jsx)(`tbody`, { children: l })],
        }),
      })),
      (t[10] = l),
      (t[11] = u));
  let d;
  if (t[12] !== r || t[13] !== i || t[14] !== a) {
    let e;
    (t[16] !== i || t[17] !== a
      ? ((e = (e, t) =>
          (0, k.jsxs)(
            `div`,
            {
              className: `border-4 border-black bg-theme-bg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-2`,
              children: [
                (0, k.jsxs)(`div`, {
                  className: `absolute top-2 right-2 flex gap-2`,
                  children: [
                    (0, k.jsx)(`button`, {
                      onClick: () => a(t),
                      className: `p-2 bg-theme-accent hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all`,
                      children: (0, k.jsx)(c, { size: 14 }),
                    }),
                    (0, k.jsx)(`button`, {
                      onClick: () => i(t),
                      className: `p-2 bg-action-delete hover:brightness-110 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all`,
                      children: (0, k.jsx)(n, { size: 16 }),
                    }),
                  ],
                }),
                (0, k.jsx)(`div`, {
                  className: `border-b-2 border-black pb-2 mb-2`,
                  children: (0, k.jsxs)(`span`, {
                    className: `bg-theme-header-bg px-2 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest`,
                    children: [e.dia, `/`, e.mes, `/`, e.anio],
                  }),
                }),
                (0, k.jsxs)(`div`, {
                  className: `flex justify-between items-center text-theme-color font-bold`,
                  children: [
                    (0, k.jsxs)(`div`, {
                      className: `flex flex-col`,
                      children: [
                        (0, k.jsx)(`span`, {
                          className: `text-xs text-secondary uppercase`,
                          children: `Horario`,
                        }),
                        (0, k.jsxs)(`span`, { children: [e.hora_entrada, ` - `, e.hora_salida] }),
                      ],
                    }),
                    (0, k.jsxs)(`div`, {
                      className: `flex flex-col text-right`,
                      children: [
                        (0, k.jsx)(`span`, {
                          className: `text-xs text-secondary uppercase`,
                          children: `Total`,
                        }),
                        (0, k.jsxs)(`span`, {
                          className: `text-xl bg-theme-accent text-white px-2 border-2 border-black -rotate-2 shadow-sm inline-block`,
                          children: [e.total_horas, `h`],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, k.jsxs)(`div`, {
                  className: `mt-2 text-sm font-semibold text-secondary border-t-2 border-dashed border-black pt-2`,
                  children: [
                    (0, k.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, k.jsx)(`div`, { className: `w-2 h-2 bg-black rounded-full` }),
                        e.origen,
                      ],
                    }),
                    (0, k.jsx)(`div`, { className: `ml-1 border-l-2 border-black h-3 my-0.5` }),
                    (0, k.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, k.jsx)(`div`, {
                          className: `w-2 h-2 bg-theme-accent border border-black rounded-full`,
                        }),
                        e.destino,
                      ],
                    }),
                  ],
                }),
                (0, k.jsxs)(`div`, {
                  className: `mt-2 pt-2 border-t-2 border-black text-xs text-right font-mono text-secondary`,
                  children: [e.nombre, ` `, e.apellido_paterno, ` (`, e.numero_empleado, `)`],
                }),
              ],
            },
            t
          )),
        (t[16] = i),
        (t[17] = a),
        (t[18] = e))
      : (e = t[18]),
      (d = r.map(e)),
      (t[12] = r),
      (t[13] = i),
      (t[14] = a),
      (t[15] = d));
  } else d = t[15];
  let f;
  t[19] === d
    ? (f = t[20])
    : ((f = (0, k.jsx)(`div`, { className: `grid grid-cols-1 gap-4 md:hidden`, children: d })),
      (t[19] = d),
      (t[20] = f));
  let p;
  return (
    t[21] !== u || t[22] !== f
      ? ((p = (0, k.jsxs)(`div`, { className: `w-full space-y-4`, children: [o, u, f] })),
        (t[21] = u),
        (t[22] = f),
        (t[23] = p))
      : (p = t[23]),
    p
  );
};
var j = s();
const M = (n) => {
  let i = (0, j.c)(20),
    { isFormOpen: a, onToggleForm: s, isAddDisabled: c } = n,
    l = c === void 0 ? !1 : c,
    u = l ? void 0 : s,
    d = a
      ? `bg-action-delete text-white hover:brightness-110`
      : l
        ? `bg-gray-400 text-gray-200 cursor-not-allowed border-gray-600 shadow-none opacity-80`
        : `bg-action-create text-white hover:brightness-110`,
    f;
  i[0] === d
    ? (f = i[1])
    : ((f = x(
        `flex items-center gap-2 px-6 py-3 font-black uppercase text-sm border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5`,
        d
      )),
      (i[0] = d),
      (i[1] = f));
  let p = l ? `Completa tu perfil para añadir registros` : ``,
    m;
  i[2] !== l || i[3] !== a
    ? ((m = l
        ? (0, k.jsx)(r, { size: 16 })
        : a
          ? (0, k.jsx)(o, { size: 16 })
          : (0, k.jsx)(t, { size: 16 })),
      (i[2] = l),
      (i[3] = a),
      (i[4] = m))
    : (m = i[4]);
  let h = a ? `Cerrar Formulario` : `Nuevo Registro`,
    g;
  i[5] !== l || i[6] !== u || i[7] !== f || i[8] !== p || i[9] !== m || i[10] !== h
    ? ((g = (0, k.jsx)(`div`, {
        className: `flex items-center gap-4`,
        children: (0, k.jsxs)(`button`, {
          onClick: u,
          disabled: l,
          className: f,
          title: p,
          children: [m, h],
        }),
      })),
      (i[5] = l),
      (i[6] = u),
      (i[7] = f),
      (i[8] = p),
      (i[9] = m),
      (i[10] = h),
      (i[11] = g))
    : (g = i[11]);
  let _;
  i[12] === l
    ? (_ = i[13])
    : ((_ =
        l &&
        (0, k.jsx)(`span`, {
          className: `text-xs font-bold text-red-600 bg-red-100 px-2 py-1 border border-red-500 inline-block`,
          children: `⚠ Completa tu perfil primero`,
        })),
      (i[12] = l),
      (i[13] = _));
  let v;
  i[14] !== g || i[15] !== _
    ? ((v = (0, k.jsxs)(`div`, { className: `flex flex-col gap-1`, children: [g, _] })),
      (i[14] = g),
      (i[15] = _),
      (i[16] = v))
    : (v = i[16]);
  let y;
  i[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = (0, k.jsx)(`div`, {
        className: `flex items-center gap-2`,
        children: (0, k.jsxs)(`div`, {
          className: `items-center gap-2 px-4 py-2 border-2 border-black bg-white/50 opacity-60 cursor-not-allowed hidden md:flex`,
          children: [
            (0, k.jsx)(e, { className: `text-secondary` }),
            (0, k.jsx)(`span`, {
              className: `text-secondary font-bold text-xs uppercase`,
              children: `Filtros (Próximamente)`,
            }),
          ],
        }),
      })),
      (i[17] = y))
    : (y = i[17]);
  let b;
  return (
    i[18] === v
      ? (b = i[19])
      : ((b = (0, k.jsxs)(`div`, {
          className: `w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8`,
          children: [v, y],
        })),
        (i[18] = v),
        (i[19] = b)),
    b
  );
};
var N = `hours_records`;
const P = async (e, t) => {
    try {
      let n = new Date(),
        r = { ...t, userId: e, createdAt: h.fromDate(n), updatedAt: h.fromDate(n) };
      return { id: (await l(p(y, N), r)).id, ...t, userId: e, createdAt: n, updatedAt: n };
    } catch (e) {
      throw (
        console.error(`Error al crear registro de horas:`, e),
        Error(`No se pudo guardar el registro de horas`)
      );
    }
  },
  F = async (e, t) => {
    try {
      await d(f(y, N, e), { ...t, updatedAt: h.fromDate(new Date()) });
    } catch (e) {
      throw (
        console.error(`Error al actualizar registro de horas:`, e),
        Error(`No se pudo actualizar el registro de horas`)
      );
    }
  },
  I = async (e) => {
    try {
      await g(f(y, N, e));
    } catch (e) {
      throw (
        console.error(`Error al eliminar registro de horas:`, e),
        Error(`No se pudo eliminar el registro de horas`)
      );
    }
  },
  L = async (e) => {
    try {
      let t = await u(v(p(y, N), _(`userId`, `==`, e), m(`createdAt`, `desc`))),
        n = [];
      return (
        t.forEach((e) => {
          let t = e.data();
          n.push({
            id: e.id,
            empresa: t.empresa || ``,
            numero_empleado: t.numero_empleado || ``,
            nombre: t.nombre || ``,
            apellido_paterno: t.apellido_paterno || ``,
            apellido_materno: t.apellido_materno || ``,
            telefono: t.telefono || ``,
            dia: t.dia || ``,
            mes: t.mes || ``,
            anio: t.anio || ``,
            hora_entrada: t.hora_entrada || ``,
            hora_salida: t.hora_salida || ``,
            origen: t.origen || ``,
            destino: t.destino || ``,
            total_horas: t.total_horas || ``,
            userId: t.userId,
            createdAt: t.createdAt?.toDate(),
            updatedAt: t.updatedAt?.toDate(),
          });
        }),
        n
      );
    } catch (e) {
      throw (
        console.error(`Error al obtener registros de horas:`, e),
        Error(`No se pudieron cargar los registros de horas`)
      );
    }
  };
var R = () => {
  let { userProfile: e } = T(),
    [n, r] = (0, D.useState)(!1),
    [i, a] = (0, D.useState)(null),
    [s, c] = (0, D.useState)(!0),
    [l, u] = (0, D.useState)(!1),
    [d, f] = (0, D.useState)(null),
    p = !e || !e.jobTitle || !e.sector || !e.employeeId,
    [m, h] = (0, D.useState)([]),
    [g, _] = (0, D.useState)({
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
    });
  (0, D.useEffect)(() => {
    (async () => {
      if (!b.currentUser) {
        c(!1);
        return;
      }
      try {
        (c(!0), h(await L(b.currentUser.uid)), f(null));
      } catch (e) {
        (console.error(`Error al cargar registros:`, e),
          f(`No se pudieron cargar los registros de horas`));
      } finally {
        c(!1);
      }
    })();
  }, []);
  let v = (e) => {
      let { name: t, value: n } = e.target;
      _((e) => {
        let r = { ...e, [t]: n };
        return (
          (t === `hora_entrada` || t === `hora_salida`) &&
            r.hora_entrada &&
            r.hora_salida &&
            (r.total_horas = S(r.hora_entrada, r.hora_salida)),
          r
        );
      });
    },
    y = async () => {
      if (!g.empresa || !g.dia || !g.hora_entrada) {
        alert(`Por favor completa los campos obligatorios`);
        return;
      }
      if (!b.currentUser) {
        alert(`Debes estar autenticado para guardar registros`);
        return;
      }
      try {
        if ((u(!0), f(null), i !== null)) {
          let e = m[i];
          (e.id && (await F(e.id, g), h(await L(b.currentUser.uid))), a(null));
        } else (await P(b.currentUser.uid, g), h(await L(b.currentUser.uid)));
        (_({
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
          r(!1));
      } catch (e) {
        (console.error(`Error al guardar registro:`, e),
          f(`No se pudo guardar el registro. Inténtalo de nuevo.`),
          alert(`No se pudo guardar el registro. Inténtalo de nuevo.`));
      } finally {
        u(!1);
      }
    };
  return (0, k.jsxs)(k.Fragment, {
    children: [
      (0, k.jsx)(C, {}),
      (0, k.jsx)(w, {
        children: (0, k.jsxs)(`div`, {
          className: `w-full flex flex-col py-8 px-4`,
          children: [
            (0, k.jsx)(M, {
              isFormOpen: n,
              onToggleForm: () => {
                n
                  ? (r(!1), a(null))
                  : (_({
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
                    a(null),
                    r(!0));
              },
              isAddDisabled: p,
            }),
            (0, k.jsxs)(`div`, {
              className: `flex flex-col xl:flex-row items-start justify-center w-full gap-8`,
              children: [
                n &&
                  (0, k.jsx)(`div`, {
                    className: `fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 xl:static xl:z-auto xl:bg-transparent xl:p-0 xl:backdrop-blur-none xl:flex-col xl:w-auto xl:min-w-112.5 animate-in fade-in duration-200 xl:slide-in-from-left`,
                    children: (0, k.jsxs)(`div`, {
                      className: `w-full max-h-[90vh] overflow-y-auto no-scrollbar xl:overflow-visible xl:max-h-none flex flex-col items-center gap-6 xl:gap-0`,
                      children: [
                        (0, k.jsx)(`div`, {
                          className: `w-full flex justify-end xl:hidden sticky top-0 z-10 mb-2`,
                          children: (0, k.jsx)(`button`, {
                            onClick: () => r(!1),
                            className: `bg-red-500 text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5 active:shadow-none transition-all`,
                            children: (0, k.jsx)(o, { size: 24 }),
                          }),
                        }),
                        (0, k.jsx)(E, { formData: g, onChange: v, setFormData: _ }),
                        (0, k.jsxs)(`button`, {
                          onClick: () => {
                            y();
                          },
                          disabled: l,
                          className: x(
                            `mt-8 group flex items-center gap-3 bg-action-create text-white border-4 border-black font-black uppercase tracking-widest text-xl py-4 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer w-full justify-center xl:w-auto xl:mt-8`,
                            l && `opacity-50 cursor-not-allowed`
                          ),
                          children: [
                            (0, k.jsx)(t, {
                              className: x(
                                `transition-transform duration-300`,
                                i === null ? `group-hover:rotate-90` : ``
                              ),
                            }),
                            l ? `Guardando...` : i === null ? `Registrar` : `Actualizar`,
                          ],
                        }),
                        (0, k.jsx)(`div`, { className: `h-8 xl:hidden` }),
                      ],
                    }),
                  }),
                (0, k.jsxs)(`div`, {
                  className: `w-full xl:flex-1 h-full animate-in fade-in duration-500`,
                  children: [
                    d &&
                      (0, k.jsx)(`div`, {
                        className: `mb-4 p-4 bg-red-100 border-2 border-red-500 text-red-700 font-bold`,
                        children: d,
                      }),
                    s
                      ? (0, k.jsx)(`div`, {
                          className: `flex items-center justify-center p-8`,
                          children: (0, k.jsx)(`div`, {
                            className: `text-theme-color font-bold text-xl`,
                            children: `Cargando registros...`,
                          }),
                        })
                      : (0, k.jsx)(A, {
                          data: m,
                          onDelete: async (e) => {
                            let t = m[e];
                            if (!t.id) {
                              h(m.filter((t, n) => n !== e));
                              return;
                            }
                            if (confirm(`¿Estás seguro de que quieres eliminar este registro?`))
                              try {
                                (f(null),
                                  await I(t.id),
                                  h(m.filter((t, n) => n !== e)),
                                  i === e && (a(null), r(!1)));
                              } catch (e) {
                                (console.error(`Error al eliminar registro:`, e),
                                  f(`No se pudo eliminar el registro. Inténtalo de nuevo.`),
                                  alert(`No se pudo eliminar el registro. Inténtalo de nuevo.`));
                              }
                          },
                          onEdit: (e) => {
                            (_(m[e]), a(e), r(!0));
                          },
                        }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
export { R as default };
