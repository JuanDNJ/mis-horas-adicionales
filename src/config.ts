import {
  FaSun,
  FaMoon,
  FaPalette,
  FaLeaf,
  FaFire,
  FaShieldAlt,
  FaMusic,
  FaMask,
  FaRocket,
  FaDesktop,
} from "react-icons/fa";

export const themes = [
  {
    id: "theme-default",
    name: "Default",
    icon: FaDesktop,
    color: "text-slate-800",
  },
  {
    id: "theme-light",
    name: "Light",
    icon: FaSun,
    color: "text-amber-500",
  },
  {
    id: "theme-dark",
    name: "Dark",
    icon: FaMoon,
    color: "text-slate-200",
  },
  {
    id: "theme-diablo",
    name: "Diablo",
    icon: FaFire,
    color: "text-red-600",
  },
  {
    id: "theme-duende",
    name: "Duende del sur",
    icon: FaLeaf,
    color: "text-green-600",
  },
  {
    id: "theme-militar",
    name: "Militar",
    icon: FaShieldAlt,
    color: "text-emerald-800",
  },
  {
    id: "theme-rockero",
    name: "Rockero",
    icon: FaMusic,
    color: "text-purple-600",
  },
  {
    id: "theme-comic",
    name: "Cómic",
    icon: FaPalette,
    color: "text-yellow-500",
  },
  {
    id: "theme-heroe",
    name: "Héroe",
    icon: FaMask,
    color: "text-blue-600",
  },
  {
    id: "theme-espacio",
    name: "Espacio",
    icon: FaRocket,
    color: "text-indigo-600",
  },
] as const;

export type Theme = (typeof themes)[number];
