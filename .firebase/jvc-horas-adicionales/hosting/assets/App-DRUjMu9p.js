import { H as e, P as t, T as n, c as r, s as i } from "./vendor-CPiAnCAo.js";
import { t as a } from "./index-BS8tadSv.js";
import { a as o, n as s, r as c, t as l } from "./Main-DWFXURMq.js";
var u = e(),
  d = t(),
  f = (e) => {
    let t = (0, u.c)(21),
      {
        title: n,
        children: r,
        actions: i,
        className: a,
        titleClassName: s,
        cardClassName: c,
        actionsClassName: l,
        bgColor: f,
      } = e,
      p = `flex flex-col items-center min-h-fit gap-6 md:gap-10 py-12 px-4 md:px-8 ${f ?? `transparent`}`,
      m;
    t[0] !== a || t[1] !== p ? ((m = o(p, a)), (t[0] = a), (t[1] = p), (t[2] = m)) : (m = t[2]);
    let h;
    t[3] === s
      ? (h = t[4])
      : ((h = o(
          `text-theme-color font-bold text-center text-5xl md:text-7xl lg:text-9xl leading-tight text-wrap wrap-break-word`,
          s
        )),
        (t[3] = s),
        (t[4] = h));
    let g;
    t[5] !== h || t[6] !== n
      ? ((g = (0, d.jsx)(`header`, {
          className: `w-full`,
          children: (0, d.jsx)(`h2`, { className: h, children: n }),
        })),
        (t[5] = h),
        (t[6] = n),
        (t[7] = g))
      : (g = t[7]);
    let _;
    t[8] === c
      ? (_ = t[9])
      : ((_ = o(
          `bg-white rounded-lg shadow-lg w-full flex flex-col items-center justify-center p-6 md:p-12`,
          c
        )),
        (t[8] = c),
        (t[9] = _));
    let v;
    t[10] !== r || t[11] !== _
      ? ((v = (0, d.jsx)(`article`, { className: _, children: r })),
        (t[10] = r),
        (t[11] = _),
        (t[12] = v))
      : (v = t[12]);
    let y;
    t[13] !== i || t[14] !== l
      ? ((y =
          i &&
          (0, d.jsx)(`footer`, {
            className: o(`flex flex-wrap justify-center gap-4 py-6 w-full`, l),
            children: i,
          })),
        (t[13] = i),
        (t[14] = l),
        (t[15] = y))
      : (y = t[15]);
    let b;
    return (
      t[16] !== m || t[17] !== g || t[18] !== v || t[19] !== y
        ? ((b = (0, d.jsxs)(`section`, { className: m, children: [g, v, y] })),
          (t[16] = m),
          (t[17] = g),
          (t[18] = v),
          (t[19] = y),
          (t[20] = b))
        : (b = t[20]),
      b
    );
  },
  p = e(),
  m = () => {
    let e = (0, p.c)(1),
      t;
    return (
      e[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((t = (0, d.jsx)(f, {
            title: `Tu tiempo vale oro, Gestiónalo con estilo`,
            actions: (0, d.jsxs)(d.Fragment, {
              children: [
                (0, d.jsx)(`button`, {
                  className: `bg-amber-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-amber-600 transition-colors cursor-pointer`,
                  children: `Accede ya`,
                }),
                (0, d.jsx)(`button`, {
                  className: `bg-blue-400 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-500 transition-colors cursor-pointer`,
                  children: `Descubrir Más`,
                }),
              ],
            }),
            children: (0, d.jsx)(`p`, {
              className: `text-center text-2xl md:text-4xl text-gray-800`,
              children: `Olvídate de las hojas de cálculo aburridas, registra tus horas, calcula tus ingresos y mantén el control total, con una estética que te encantará.`,
            }),
          })),
          (e[0] = t))
        : (t = e[0]),
      t
    );
  },
  h = e(),
  g = () => {
    let e = (0, h.c)(22),
      { setSelectedTheme: t } = c(),
      o;
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((o = (0, d.jsx)(s, {})), (e[0] = o))
      : (o = e[0]);
    let u;
    e[1] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((u = (0, d.jsx)(m, {})), (e[1] = u))
      : (u = e[1]);
    let p;
    e[2] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((p = (0, d.jsx)(`button`, {
          type: `button`,
          className: `bg-amber-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-amber-600 transition-colors cursor-pointer font-bold`,
          children: `Registrame`,
        })),
        (e[2] = p))
      : (p = e[2]);
    let g, _;
    e[3] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((g = (0, d.jsx)(`h3`, {
          className: `text-2xl font-bold text-gray-800`,
          children: `Early Adopter`,
        })),
        (_ = (0, d.jsx)(`p`, {
          className: `text-gray-600 max-w-2xl`,
          children: `Regístrate ahora con tu email y disfruta de la WebApp GRATIS para siempre respecto a las funcionalidades actuales.`,
        })),
        (e[3] = g),
        (e[4] = _))
      : ((g = e[3]), (_ = e[4]));
    let v;
    e[5] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((v = (0, d.jsx)(f, {
          bgColor: `bg-black/80`,
          title: `Transparencia Total`,
          actions: p,
          children: (0, d.jsxs)(`div`, {
            className: `flex flex-col gap-4 text-center items-center`,
            children: [
              g,
              _,
              (0, d.jsxs)(`ul`, {
                className: `text-left list-disc list-inside text-gray-700 space-y-2 bg-gray-50 p-6 rounded-lg w-full max-w-lg shadow-inner`,
                children: [
                  (0, d.jsx)(`li`, { children: `Registro ilimitado de horas` }),
                  (0, d.jsx)(`li`, { children: `Exportación a Excel/PDF` }),
                  (0, d.jsx)(`li`, { children: `Acceso a todos los Temas` }),
                  (0, d.jsx)(`li`, { children: `Sin pagos futuros por uso actual` }),
                ],
              }),
              (0, d.jsx)(`p`, {
                className: `text-xs text-gray-400 italic mt-2 max-w-2xl`,
                children: `* En el futuro, introduciremos funcionalidades Premium avanzadas que tendrán coste, pero tu cuenta actual y sus funciones seguirán siendo gratuitas.`,
              }),
            ],
          }),
        })),
        (e[5] = v))
      : (v = e[5]);
    let y;
    e[6] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((y = (0, d.jsx)(`button`, {
          className: `bg-blue-400 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-500 transition-colors cursor-pointer font-bold`,
          children: `Descubre Más`,
        })),
        (e[6] = y))
      : (y = e[6]);
    let b;
    e[7] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((b = (0, d.jsxs)(`li`, {
          className: `flex flex-col items-center text-center gap-4`,
          children: [
            (0, d.jsx)(n, { size: 40, className: `text-theme-color` }),
            (0, d.jsx)(`h3`, { className: `text-xl font-bold`, children: `Interfaz Intuitiva` }),
            (0, d.jsx)(`p`, {
              className: `text-gray-600`,
              children: `Navega fácilmente por nuestra plataforma con un diseño limpio y accesible.`,
            }),
          ],
        })),
        (e[7] = b))
      : (b = e[7]);
    let x;
    e[8] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((x = (0, d.jsxs)(`li`, {
          className: `flex flex-col items-center text-center gap-4`,
          children: [
            (0, d.jsx)(i, { size: 40, className: `text-theme-color` }),
            (0, d.jsx)(`h3`, { className: `text-xl font-bold`, children: `Reportes al Instante` }),
            (0, d.jsx)(`p`, {
              className: `text-gray-600`,
              children: `Genera reportes instantáneos y detallados para un mejor control.`,
            }),
          ],
        })),
        (e[8] = x))
      : (x = e[8]);
    let S;
    e[9] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((S = (0, d.jsxs)(`li`, {
          className: `flex flex-col items-center text-center gap-4`,
          children: [
            (0, d.jsx)(n, { size: 40, className: `text-theme-color` }),
            (0, d.jsx)(`h3`, { className: `text-xl font-bold`, children: `Universal` }),
            (0, d.jsx)(`p`, {
              className: `text-gray-600`,
              children: `Funciona como una app nativa en tu móvil, tablet o escritorio. Instálala como PWA y úsala sin conexión.`,
            }),
          ],
        })),
        (e[9] = S))
      : (S = e[9]);
    let C;
    e[10] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((C = (0, d.jsx)(f, {
          bgColor: `bg-black/80`,
          title: `¿Por qué elegirnos?`,
          cardClassName: `max-w-7xl`,
          actions: y,
          children: (0, d.jsxs)(`ul`, {
            className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full p-4`,
            children: [
              b,
              x,
              S,
              (0, d.jsxs)(`li`, {
                className: `flex flex-col items-center text-center gap-4`,
                children: [
                  (0, d.jsx)(r, { size: 40, className: `text-theme-color` }),
                  (0, d.jsx)(`h3`, {
                    className: `text-xl font-bold`,
                    children: `10+ Temas Visuales`,
                  }),
                  (0, d.jsx)(`p`, {
                    className: `text-gray-600`,
                    children: `Desde el modo "Militar" para la batalla diaria hasta el modo "Cómic" para ponerle humor al trabajo. Hay un estilo para ti.`,
                  }),
                ],
              }),
            ],
          }),
        })),
        (e[10] = C))
      : (C = e[10]);
    let w;
    e[11] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((w = (0, d.jsx)(f, {
          bgColor: `bg-black/80`,
          title: `Prepárate para transformar tu gestión de horas`,
          actions: (0, d.jsx)(`button`, {
            className: `bg-amber-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-amber-600 transition-colors cursor-pointer font-bold`,
            children: `Comienza Ahora`,
          }),
          children: (0, d.jsx)(`p`, {
            className: `text-center text-xl md:text-2xl text-gray-700 max-w-4xl`,
            children: `Únete a nuestra comunidad de profesionales que ya están optimizando su tiempo y maximizando sus ingresos con nuestra WebApp. No esperes más para llevar el control total de tus horas adicionales con estilo y eficiencia.`,
          }),
        })),
        (e[11] = w))
      : (w = e[11]);
    let T;
    e[12] === t
      ? (T = e[13])
      : ((T = a.map((e) =>
          (0, d.jsxs)(
            `button`,
            {
              onClick: () => t(e),
              className: `bg-white border-2 border-gray-800 hover:bg-gray-100 text-gray-900 font-bold py-2 px-4 rounded shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center gap-2`,
              children: [(0, d.jsx)(e.icon, { className: e.color }), e.name],
            },
            e.id
          )
        )),
        (e[12] = t),
        (e[13] = T));
    let E;
    e[14] === T
      ? (E = e[15])
      : ((E = (0, d.jsx)(`div`, { className: `flex flex-wrap justify-center gap-3`, children: T })),
        (e[14] = T),
        (e[15] = E));
    let D;
    e[16] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((D = (0, d.jsx)(`p`, {
          className: `text-center text-xl text-gray-700 mb-6`,
          children: `Explora nuestra colección de temas. Porque trabajar no tiene por qué ser gris.`,
        })),
        (e[16] = D))
      : (D = e[16]);
    let O;
    e[17] === E
      ? (O = e[18])
      : ((O = (0, d.jsx)(f, { title: `Dale color a tu rutina`, actions: E, children: D })),
        (e[17] = E),
        (e[18] = O));
    let k;
    e[19] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((k = (0, d.jsx)(f, {
          title: `Contacto`,
          children: (0, d.jsxs)(`p`, {
            className: `text-center text-lg text-gray-700`,
            children: [
              `¿Tienes preguntas, sugerencias o necesitas ayuda? Nuestro equipo está aquí para ti. Contáctanos en`,
              ` `,
              (0, d.jsx)(`a`, {
                href: `mailto:support@example.com`,
                className: `text-blue-500 hover:underline font-bold`,
                children: `support@example.com`,
              }),
            ],
          }),
        })),
        (e[19] = k))
      : (k = e[19]);
    let A;
    return (
      e[20] === O
        ? (A = e[21])
        : ((A = (0, d.jsxs)(d.Fragment, {
            children: [o, (0, d.jsxs)(l, { children: [u, v, C, w, O, k] })],
          })),
          (e[20] = O),
          (e[21] = A)),
      A
    );
  };
export { g as default };
