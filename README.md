# 🕒 Gestión de Horas Adicionales

![Project Status](https://img.shields.io/badge/Status-Development-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una aplicación moderna y flexible construida con **React 19** y **TypeScript** para gestionar el registro y seguimiento de horas adicionales. Diseñada con un enfoque en la personalización de la experiencia de usuario a través de múltiples temas dinámicos.

---

## ✨ Características Principales

- **⚡ Rendimiento Ultra Rápido**: Impulsado por Vite.
- **🎨 Sistema de Temas Avanzado**: Personalización completa de la interfaz con múltiples temas predefinidos (incluyendo modos Diablo, Militar, Rockero y más).
- **📱 Diseño Responsive**: Adaptable a cualquier dispositivo.
- **🛠️ Stack Moderno**: Utilizando las últimas versiones de React (v19) y React Router (v7).
- **💅 Estilizado con Tailwind v4**: Diseño limpio y mantenible.

## 🎨 Temas Disponibles

La aplicación cuenta con un selector de temas dinámico que transforma completamente la apariencia de la interfaz:

| Tema                   | Descripción                        | Icono |
| ---------------------- | ---------------------------------- | ----- |
| **Default**            | Estilo clásico del sistema         | 🖥️    |
| **Light/Dark**         | Modos claro y oscuro tradicionales | ☀️/🌙 |
| **Diablo**             | Intensos tonos rojos y oscuros     | 🔥    |
| **Duende del Sur**     | Inspiración natural y verde        | 🍃    |
| **Militar**            | Estilo táctico y robusto           | 🛡️    |
| **Rockero**            | Actitud y colores vibrantes        | 🎸    |
| **Andalucía y más...** | Identidad regional y cultural      | 💃    |

## 🚀 Comenzando

Sigue estos pasos para tener el proyecto corriendo en tu máquina local.

### Prerrequisitos

- Node.js (versión LTS recomendada)
- npm o yarn

### Instalación

1.  **Clona el repositorio**

    ```bash
    git clone https://github.com/JuanDNJ/mis-horas-adicionales.git
    cd horas-adicionales
    ```

2.  **Instala las dependencias**

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo**

    ```bash
    npm run dev
    ```

4.  Abre tu navegador en `http://localhost:5173`.

## 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la build de producción localmente.
- `npm run lint`: Ejecuta el linter (ESLint).
- `npm run format`: Formatea el código con Prettier.

## 📂 Estructura del Proyecto

```text
src/
├── assets/         # Estilos, temas CSS e imágenes
├── components/     # Componentes reutilizables (Header, Hero, UserMenu...)
├── context/        # Gestión de estado global (Context API)
├── hooks/          # Custom hooks (useTheme, useGlobalContext...)
├── lib/            # Utilidades y funciones auxiliares
├── pages/          # Páginas de la aplicación
├── routes/         # Configuración de rutas
└── main.tsx        # Punto de entrada
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes alguna idea para mejorar la aplicación o quieres añadir un nuevo tema:

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu Feature (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia [ISC](LICENSE).
