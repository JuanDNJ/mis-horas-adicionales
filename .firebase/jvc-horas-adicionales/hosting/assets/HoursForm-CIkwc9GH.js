import { H as e, P as t, W as n, d as r, i, n as a, r as o, t as s } from "./vendor-CPiAnCAo.js";
import { a as c } from "./Main-DWFXURMq.js";
var l = e(),
  u = t();
const d = (e) => {
  let t = (0, l.c)(17),
    n,
    r,
    i,
    o;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]), (o = t[4]))
    : (({ className: n, classNames: r, showOutsideDays: o, ...i } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = o));
  let d = o === void 0 ? !0 : o,
    p;
  t[5] === n
    ? (p = t[6])
    : ((p = c(`p-3 border-4 border-black bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`, n)),
      (t[5] = n),
      (t[6] = p));
  let m;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = c(
        `h-7 w-7 bg-transparent p-0 flex items-center justify-center border-2 border-transparent hover:border-black transition-all hover:bg-black hover:text-white`
      )),
      (t[7] = m))
    : (m = t[7]);
  let h;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = c(
        `h-9 w-9 p-0 font-bold aria-selected:opacity-100 hover:bg-black hover:text-white border-2 border-transparent transition-all`
      )),
      (t[8] = h))
    : (h = t[8]);
  let g;
  t[9] === r
    ? (g = t[10])
    : ((g = {
        months: `flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-theme-color`,
        month: `space-y-4`,
        caption: `flex justify-center pt-1 relative items-center mb-2`,
        caption_label: `text-lg font-black uppercase tracking-wider`,
        nav: `space-x-1 flex items-center`,
        nav_button: m,
        nav_button_previous: `absolute left-1`,
        nav_button_next: `absolute right-1`,
        table: `w-full border-collapse space-y-1`,
        head_row: `flex`,
        head_cell: `text-secondary rounded-md w-9 font-normal text-[0.8rem] uppercase`,
        row: `flex w-full mt-2`,
        cell: `h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20`,
        day: h,
        day_range_end: `day-range-end`,
        day_selected: `bg-theme-accent text-white hover:bg-theme-accent hover:text-white focus:bg-theme-accent focus:text-white border-2 border-black`,
        day_today: `bg-theme-secondary/20 text-theme-color border-2 border-theme-secondary text-accent-foreground`,
        day_outside: `day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30`,
        day_disabled: `text-muted-foreground opacity-50`,
        day_range_middle: `aria-selected:bg-accent aria-selected:text-accent-foreground`,
        day_hidden: `invisible`,
        ...r,
      }),
      (t[9] = r),
      (t[10] = g));
  let _;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_ = { Chevron: f }), (t[11] = _))
    : (_ = t[11]);
  let v;
  return (
    t[12] !== i || t[13] !== d || t[14] !== p || t[15] !== g
      ? ((v = (0, u.jsx)(s, {
          locale: a,
          showOutsideDays: d,
          className: p,
          classNames: g,
          components: _,
          ...i,
        })),
        (t[12] = i),
        (t[13] = d),
        (t[14] = p),
        (t[15] = g),
        (t[16] = v))
      : (v = t[16]),
    v
  );
};
function f(e) {
  return (0, u.jsx)(i, { ...e, className: c(`h-4 w-4`, e.className) });
}
var p = e(),
  m = n();
const h = (e) => {
  let t = (0, p.c)(17),
    { trigger: n, content: r, className: i, isOpen: a, onOpenChange: o } = e,
    s = (0, m.useRef)(null),
    l,
    d;
  (t[0] !== a || t[1] !== o
    ? ((l = () => {
        let e = (e) => {
          s.current && !s.current.contains(e.target) && o(!1);
        };
        return (
          a && document.addEventListener(`mousedown`, e),
          () => {
            document.removeEventListener(`mousedown`, e);
          }
        );
      }),
      (d = [a, o]),
      (t[0] = a),
      (t[1] = o),
      (t[2] = l),
      (t[3] = d))
    : ((l = t[2]), (d = t[3])),
    (0, m.useEffect)(l, d));
  let f;
  t[4] !== a || t[5] !== o ? ((f = () => o(!a)), (t[4] = a), (t[5] = o), (t[6] = f)) : (f = t[6]);
  let h;
  t[7] !== f || t[8] !== n
    ? ((h = (0, u.jsx)(`div`, { onClick: f, children: n })), (t[7] = f), (t[8] = n), (t[9] = h))
    : (h = t[9]);
  let g;
  t[10] !== i || t[11] !== r || t[12] !== a
    ? ((g =
        a &&
        (0, u.jsx)(`div`, {
          className: c(
            `absolute z-50 mt-2 bg-theme-bg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black animate-in fade-in zoom-in-95 duration-200`,
            i
          ),
          children: r,
        })),
      (t[10] = i),
      (t[11] = r),
      (t[12] = a),
      (t[13] = g))
    : (g = t[13]);
  let _;
  return (
    t[14] !== h || t[15] !== g
      ? ((_ = (0, u.jsxs)(`div`, {
          className: `relative inline-block w-full`,
          ref: s,
          children: [h, g],
        })),
        (t[14] = h),
        (t[15] = g),
        (t[16] = _))
      : (_ = t[16]),
    _
  );
};
var g = e(),
  _ = (e) => {
    let t = (0, g.c)(15),
      { label: n, children: r, className: i, headerActions: a } = e,
      o;
    t[0] === i
      ? (o = t[1])
      : ((o = c(`flex flex-col gap-2 p-4 border-2 border-black bg-white/50`, i)),
        (t[0] = i),
        (t[1] = o));
    let s;
    t[2] === n
      ? (s = t[3])
      : ((s = (0, u.jsx)(`h3`, {
          className: `text-lg font-black uppercase italic text-theme-color`,
          children: n,
        })),
        (t[2] = n),
        (t[3] = s));
    let l;
    t[4] === a
      ? (l = t[5])
      : ((l = a && (0, u.jsx)(`div`, { className: `flex items-center`, children: a })),
        (t[4] = a),
        (t[5] = l));
    let d;
    t[6] !== s || t[7] !== l
      ? ((d = (0, u.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-black pb-1 mb-2 gap-2`,
          children: [s, l],
        })),
        (t[6] = s),
        (t[7] = l),
        (t[8] = d))
      : (d = t[8]);
    let f;
    t[9] === r
      ? (f = t[10])
      : ((f = (0, u.jsx)(`div`, {
          className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`,
          children: r,
        })),
        (t[9] = r),
        (t[10] = f));
    let p;
    return (
      t[11] !== o || t[12] !== d || t[13] !== f
        ? ((p = (0, u.jsxs)(`div`, { className: o, children: [d, f] })),
          (t[11] = o),
          (t[12] = d),
          (t[13] = f),
          (t[14] = p))
        : (p = t[14]),
      p
    );
  },
  v = (e) => {
    let t = (0, g.c)(18),
      n,
      r,
      i,
      a;
    t[0] === e
      ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]))
      : (({ label: i, className: n, containerClassName: r, ...a } = e),
        (t[0] = e),
        (t[1] = n),
        (t[2] = r),
        (t[3] = i),
        (t[4] = a));
    let o;
    t[5] === r ? (o = t[6]) : ((o = c(`flex flex-col gap-1`, r)), (t[5] = r), (t[6] = o));
    let s;
    t[7] === i
      ? (s = t[8])
      : ((s = (0, u.jsx)(`label`, {
          className: `text-xs font-bold text-secondary uppercase tracking-wider ml-1`,
          children: i,
        })),
        (t[7] = i),
        (t[8] = s));
    let l;
    t[9] === n
      ? (l = t[10])
      : ((l = c(
          `w-full px-3 py-2 bg-theme-bg border-2 border-black text-theme-color focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--theme-accent)] focus:border-theme-accent transition-all duration-200 placeholder:text-secondary/40 font-bold`,
          n
        )),
        (t[9] = n),
        (t[10] = l));
    let d;
    t[11] !== a || t[12] !== l
      ? ((d = (0, u.jsx)(`input`, { className: l, autoComplete: `off`, ...a })),
        (t[11] = a),
        (t[12] = l),
        (t[13] = d))
      : (d = t[13]);
    let f;
    return (
      t[14] !== o || t[15] !== s || t[16] !== d
        ? ((f = (0, u.jsxs)(`div`, { className: o, children: [s, d] })),
          (t[14] = o),
          (t[15] = s),
          (t[16] = d),
          (t[17] = f))
        : (f = t[17]),
      f
    );
  },
  y = (e) => {
    let t = (0, g.c)(20),
      { selectedSector: n, onSectorChange: r } = e,
      i;
    t[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((i = (0, u.jsx)(`span`, {
          className: `text-xs font-bold uppercase text-secondary mr-2`,
          children: `Sector:`,
        })),
        (t[0] = i))
      : (i = t[0]);
    let a = n === `general`,
      o;
    t[1] === r ? (o = t[2]) : ((o = () => r(`general`)), (t[1] = r), (t[2] = o));
    let s;
    t[3] !== a || t[4] !== o
      ? ((s = (0, u.jsx)(`input`, {
          type: `radio`,
          name: `sector_type`,
          value: `general`,
          checked: a,
          onChange: o,
          className: `accent-theme-color w-4 h-4 cursor-pointer`,
        })),
        (t[3] = a),
        (t[4] = o),
        (t[5] = s))
      : (s = t[5]);
    let c;
    t[6] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((c = (0, u.jsx)(`span`, {
          className: `text-sm font-bold text-theme-color select-none`,
          children: `General`,
        })),
        (t[6] = c))
      : (c = t[6]);
    let l;
    t[7] === s
      ? (l = t[8])
      : ((l = (0, u.jsxs)(`label`, {
          className: `flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity`,
          children: [s, c],
        })),
        (t[7] = s),
        (t[8] = l));
    let d = n === `transport`,
      f;
    t[9] === r ? (f = t[10]) : ((f = () => r(`transport`)), (t[9] = r), (t[10] = f));
    let p;
    t[11] !== d || t[12] !== f
      ? ((p = (0, u.jsx)(`input`, {
          type: `radio`,
          name: `sector_type`,
          value: `transport`,
          checked: d,
          onChange: f,
          className: `accent-theme-color w-4 h-4 cursor-pointer`,
        })),
        (t[11] = d),
        (t[12] = f),
        (t[13] = p))
      : (p = t[13]);
    let m;
    t[14] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((m = (0, u.jsx)(`span`, {
          className: `text-sm font-bold text-theme-color select-none`,
          children: `Transporte`,
        })),
        (t[14] = m))
      : (m = t[14]);
    let h;
    t[15] === p
      ? (h = t[16])
      : ((h = (0, u.jsxs)(`label`, {
          className: `flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity`,
          children: [p, m],
        })),
        (t[15] = p),
        (t[16] = h));
    let _;
    return (
      t[17] !== h || t[18] !== l
        ? ((_ = (0, u.jsxs)(`nav`, {
            className: `flex items-center gap-4 bg-white/50 px-3 py-1 rounded-sm border border-black/20`,
            children: [i, l, h],
          })),
          (t[17] = h),
          (t[18] = l),
          (t[19] = _))
        : (_ = t[19]),
      _
    );
  };
const b = (e) => {
  let t = (0, g.c)(86),
    { formData: n, onChange: i, setFormData: s } = e,
    [l, f] = (0, m.useState)(!1),
    p;
  t[0] !== n.destino || t[1] !== n.origen || t[2] !== n.ramo
    ? ((p = () => (n.ramo || n.origen || n.destino ? `transport` : `general`)),
      (t[0] = n.destino),
      (t[1] = n.origen),
      (t[2] = n.ramo),
      (t[3] = p))
    : (p = t[3]);
  let [b, S] = (0, m.useState)(p),
    C;
  t[4] === s
    ? (C = t[5])
    : ((C = (e) => {
        e &&
          s &&
          (s((t) => ({ ...t, dia: o(e, `dd`), mes: o(e, `MM`), anio: o(e, `yyyy`) })), f(!1));
      }),
      (t[4] = s),
      (t[5] = C));
  let w = C,
    T;
  t[6] !== n.anio || t[7] !== n.dia || t[8] !== n.mes
    ? ((T = () => {
        if (n.dia && n.mes && n.anio)
          return new Date(Number(n.anio), Number(n.mes) - 1, Number(n.dia));
      }),
      (t[6] = n.anio),
      (t[7] = n.dia),
      (t[8] = n.mes),
      (t[9] = T))
    : (T = t[9]);
  let E = T,
    D;
  t[10] !== n.anio || t[11] !== n.dia || t[12] !== n.mes
    ? ((D =
        n.dia && n.mes && n.anio
          ? o(new Date(Number(n.anio), Number(n.mes) - 1, Number(n.dia)), `PPP`, { locale: a })
          : `Selecciona una fecha`),
      (t[10] = n.anio),
      (t[11] = n.dia),
      (t[12] = n.mes),
      (t[13] = D))
    : (D = t[13]);
  let O = D,
    k;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (0, u.jsxs)(`div`, {
        className: `text-center mb-8 border-b-4 border-black pb-4`,
        children: [
          (0, u.jsx)(`h2`, {
            className: `text-3xl font-black uppercase text-theme-color drop-shadow-sm`,
            children: `Registro de Horas`,
          }),
          (0, u.jsx)(`p`, {
            className: `text-secondary font-bold font-mono text-sm mt-2`,
            children: `Rellena todos los campos requeridos`,
          }),
        ],
      })),
      (t[14] = k))
    : (k = t[14]);
  let A;
  t[15] !== n.empresa || t[16] !== i
    ? ((A = (0, u.jsx)(v, {
        label: `Empresa`,
        name: `empresa`,
        value: n.empresa,
        onChange: i,
        placeholder: `Nombre de la empresa`,
        containerClassName: `col-span-1 md:col-span-2 lg:col-span-3`,
      })),
      (t[15] = n.empresa),
      (t[16] = i),
      (t[17] = A))
    : (A = t[17]);
  let j;
  t[18] !== n.numero_empleado || t[19] !== i
    ? ((j = (0, u.jsx)(v, {
        label: `No. Empleado`,
        name: `numero_empleado`,
        value: n.numero_empleado,
        onChange: i,
        placeholder: `000000`,
      })),
      (t[18] = n.numero_empleado),
      (t[19] = i),
      (t[20] = j))
    : (j = t[20]);
  let M;
  t[21] !== n.nombre || t[22] !== i
    ? ((M = (0, u.jsx)(v, {
        label: `Nombre`,
        name: `nombre`,
        value: n.nombre,
        onChange: i,
        placeholder: `Tu nombre`,
      })),
      (t[21] = n.nombre),
      (t[22] = i),
      (t[23] = M))
    : (M = t[23]);
  let N;
  t[24] !== n.apellido_paterno || t[25] !== i
    ? ((N = (0, u.jsx)(v, {
        label: `Apellido Paterno`,
        name: `apellido_paterno`,
        value: n.apellido_paterno,
        onChange: i,
        placeholder: `Apellido Paterno`,
      })),
      (t[24] = n.apellido_paterno),
      (t[25] = i),
      (t[26] = N))
    : (N = t[26]);
  let P;
  t[27] !== n.apellido_materno || t[28] !== i
    ? ((P = (0, u.jsx)(v, {
        label: `Apellido Materno`,
        name: `apellido_materno`,
        value: n.apellido_materno,
        onChange: i,
        placeholder: `Apellido Materno`,
      })),
      (t[27] = n.apellido_materno),
      (t[28] = i),
      (t[29] = P))
    : (P = t[29]);
  let F;
  t[30] !== n.telefono || t[31] !== i
    ? ((F = (0, u.jsx)(v, {
        label: `Teléfono`,
        name: `telefono`,
        value: n.telefono,
        onChange: i,
        placeholder: `555-555-5555`,
        type: `tel`,
      })),
      (t[30] = n.telefono),
      (t[31] = i),
      (t[32] = F))
    : (F = t[32]);
  let I;
  t[33] !== P || t[34] !== F || t[35] !== A || t[36] !== j || t[37] !== M || t[38] !== N
    ? ((I = (0, u.jsxs)(_, { label: `Información Personal`, children: [A, j, M, N, P, F] })),
      (t[33] = P),
      (t[34] = F),
      (t[35] = A),
      (t[36] = j),
      (t[37] = M),
      (t[38] = N),
      (t[39] = I))
    : (I = t[39]);
  let L;
  t[40] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((L = (0, u.jsx)(`label`, {
        className: `text-xs font-bold text-secondary uppercase tracking-wider ml-1 mb-1 block`,
        children: `Seleccionar Fecha`,
      })),
      (t[40] = L))
    : (L = t[40]);
  let R = l ? `shadow-[4px_4px_0px_0px_var(--theme-accent)] border-theme-accent` : ``,
    z;
  t[41] === R
    ? (z = t[42])
    : ((z = c(
        `w-full px-3 py-2 bg-theme-bg border-2 border-black text-theme-color cursor-pointer flex items-center justify-between transition-all duration-200 font-bold hover:bg-theme-secondary/10`,
        R
      )),
      (t[41] = R),
      (t[42] = z));
  let B = n.dia ? `` : `text-secondary/60`,
    V;
  t[43] !== O || t[44] !== B
    ? ((V = (0, u.jsx)(`span`, { className: B, children: O })),
      (t[43] = O),
      (t[44] = B),
      (t[45] = V))
    : (V = t[45]);
  let H;
  t[46] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((H = (0, u.jsx)(r, { className: `text-secondary` })), (t[46] = H))
    : (H = t[46]);
  let U;
  t[47] !== z || t[48] !== V
    ? ((U = (0, u.jsxs)(`div`, { className: z, children: [V, H] })),
      (t[47] = z),
      (t[48] = V),
      (t[49] = U))
    : (U = t[49]);
  let W;
  t[50] === E ? (W = t[51]) : ((W = E()), (t[50] = E), (t[51] = W));
  let G;
  t[52] !== w || t[53] !== W
    ? ((G = (0, u.jsx)(d, { mode: `single`, selected: W, onSelect: w, initialFocus: !0 })),
      (t[52] = w),
      (t[53] = W),
      (t[54] = G))
    : (G = t[54]);
  let K;
  t[55] !== l || t[56] !== U || t[57] !== G
    ? ((K = (0, u.jsx)(_, {
        label: `Fecha del Registro`,
        className: `relative z-10`,
        children: (0, u.jsxs)(`div`, {
          className: `col-span-1 md:col-span-2 lg:col-span-3`,
          children: [L, (0, u.jsx)(h, { isOpen: l, onOpenChange: f, trigger: U, content: G })],
        }),
      })),
      (t[55] = l),
      (t[56] = U),
      (t[57] = G),
      (t[58] = K))
    : (K = t[58]);
  let q;
  t[59] === b
    ? (q = t[60])
    : ((q = (0, u.jsx)(y, { selectedSector: b, onSectorChange: S })), (t[59] = b), (t[60] = q));
  let J;
  t[61] !== n.hora_entrada || t[62] !== i
    ? ((J = (0, u.jsx)(v, {
        label: `Hora Entrada`,
        name: `hora_entrada`,
        value: n.hora_entrada,
        onChange: i,
        type: `time`,
      })),
      (t[61] = n.hora_entrada),
      (t[62] = i),
      (t[63] = J))
    : (J = t[63]);
  let Y;
  t[64] !== n.hora_salida || t[65] !== i
    ? ((Y = (0, u.jsx)(v, {
        label: `Hora Salida`,
        name: `hora_salida`,
        value: n.hora_salida,
        onChange: i,
        type: `time`,
      })),
      (t[64] = n.hora_salida),
      (t[65] = i),
      (t[66] = Y))
    : (Y = t[66]);
  let X;
  t[67] !== n.total_horas || t[68] !== i
    ? ((X = (0, u.jsx)(v, {
        label: `Total Horas`,
        name: `total_horas`,
        value: n.total_horas,
        onChange: i,
        placeholder: `0`,
        type: `number`,
        readOnly: !0,
      })),
      (t[67] = n.total_horas),
      (t[68] = i),
      (t[69] = X))
    : (X = t[69]);
  let Z;
  t[70] !== n.destino || t[71] !== n.origen || t[72] !== n.ramo || t[73] !== i || t[74] !== b
    ? ((Z =
        b === `transport` &&
        (0, u.jsxs)(u.Fragment, {
          children: [
            (0, u.jsx)(v, {
              label: `Ramo`,
              name: `ramo`,
              value: n.ramo || ``,
              onChange: i,
              placeholder: `Ej: Transporte de mercancías`,
              containerClassName: `col-span-1 md:col-span-1 lg:col-span-3`,
            }),
            (0, u.jsx)(v, {
              label: `Origen`,
              name: `origen`,
              value: n.origen,
              onChange: i,
              placeholder: `Lugar de origen`,
              containerClassName: `col-span-1 md:col-span-1 lg:col-span-1`,
            }),
            (0, u.jsx)(v, {
              label: `Destino`,
              name: `destino`,
              value: n.destino,
              onChange: i,
              placeholder: `Lugar de destino`,
              containerClassName: `col-span-1 md:col-span-1 lg:col-span-2`,
            }),
          ],
        })),
      (t[70] = n.destino),
      (t[71] = n.origen),
      (t[72] = n.ramo),
      (t[73] = i),
      (t[74] = b),
      (t[75] = Z))
    : (Z = t[75]);
  let Q;
  t[76] !== q || t[77] !== J || t[78] !== Y || t[79] !== X || t[80] !== Z
    ? ((Q = (0, u.jsxs)(_, {
        label: `Detalles del Servicio`,
        headerActions: q,
        children: [J, Y, X, Z],
      })),
      (t[76] = q),
      (t[77] = J),
      (t[78] = Y),
      (t[79] = X),
      (t[80] = Z),
      (t[81] = Q))
    : (Q = t[81]);
  let $;
  return (
    t[82] !== I || t[83] !== K || t[84] !== Q
      ? (($ = (0, u.jsxs)(`div`, {
          className: `w-full max-w-4xl mx-auto p-4 md:p-8 bg-header-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6`,
          children: [
            k,
            (0, u.jsxs)(`form`, { className: `space-y-6`, onSubmit: x, children: [I, K, Q] }),
          ],
        })),
        (t[82] = I),
        (t[83] = K),
        (t[84] = Q),
        (t[85] = $))
      : ($ = t[85]),
    $
  );
};
function x(e) {
  return e.preventDefault();
}
export { b as t };
