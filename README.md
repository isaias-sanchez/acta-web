# ACTA - Desarrollo Web y Estrategia Digital

Proyecto web moderno construido con **Node.js**, **Vite** y **Tailwind CSS**.

## Stack Tecnológico

- **Frontend**: Vite + Vanilla JS (ES Modules)
- **Estilos**: Tailwind CSS + Custom CSS (src/style.css)
- **Backend**: Node.js + Express (API + Static Serving)
- **Emails**: Nodemailer

## Estructura de Carpetas

- `src/`: Código fuente del frontend (JS, CSS).
- `public/`: Assets estáticos (imágenes, iconos).
- `server/`: Código del backend (server.js, test scripts).
- `dist/`: Generado automáticamente por `npm run build` (producción).
- `index.html`: Punto de entrada de la aplicación.

## Comandos

### Instalación
```bash
npm install
```

### Desarrollo
Para iniciar el servidor de desarrollo del frontend (Vite):
```bash
npm run dev
```

### Producción
Para construir la aplicación (Frontend) y servirla con el backend:

1. Compilar el frontend:
```bash
npm run build
```

2. Iniciar el servidor:
```bash
npm start
```
El servidor correrá en `http://localhost:3000` (o el puerto definido en `.env`).

## Notas Importantes
- Las imágenes deben estar en la carpeta `public/` y se referencian como `/imagen.jpg`.
- El servidor Node.js sirve los archivos de la carpeta `dist/` en producción.
