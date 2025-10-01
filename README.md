# Data Science Platform

Una plataforma web moderna para Ciencia e Ingeniería de Datos construida con React, TypeScript, Node.js y Express.

## 🚀 Características

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **UI**: Bootstrap 5 con diseño responsivo
- **Autenticación**: Sistema de login/registro con tokens
- **Gestión de Datasets**: Creación, visualización y previsualización de CSV
- **Manejo de Errores**: Try/catch, reintentos automáticos y timeouts
- **Protección de Rutas**: Rutas privadas con verificación de tokens

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🛠️ Instalación y Configuración

### Paso 1: Clonar e Instalar Dependencias

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### Paso 2: Ejecutar el Backend

```bash
cd backend
npm run dev
```

El servidor backend se ejecutará en `http://localhost:5000`

### Paso 3: Ejecutar el Frontend

```bash
cd frontend
npm run dev
```

El servidor frontend se ejecutará en `http://localhost:5173`

### Paso 4: Acceder a la Aplicación

Abre tu navegador y ve a `http://localhost:5173`

### Paso 5: Crear una Cuenta

1. Haz clic en "Login" en la navbar
2. Haz clic en "Regístrate aquí"
3. Completa el formulario de registro
4. Una vez registrado, serás redirigido a la página de datasets

## 🎯 Funcionalidades Principales

### Autenticación
- Registro de nuevos usuarios
- Login con email y contraseña
- Tokens de autenticación almacenados en localStorage
- Protección de rutas privadas

### Gestión de Datasets
- Crear nuevos datasets con metadata
- Subir archivos CSV (validación de extensión y tamaño)
- Previsualización de las primeras 10 filas del CSV
- Lista de datasets con información detallada
- Etiquetas para categorización

### UI/UX
- Diseño responsivo con Bootstrap 5
- Carousel con información de la plataforma
- Formularios con validación
- Mensajes de error y éxito
- Loading states y spinners

### Manejo de Errores
- Timeout de 8 segundos en requests
- Reintentos automáticos en errores 5xx
- Rate limiting en el backend
- Validación de datos en frontend y backend

## 📁 Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── index.ts              # Servidor principal
│   │   ├── routes/
│   │   │   ├── auth.ts           # Endpoints de autenticación
│   │   │   └── datasets.ts       # Endpoints de datasets
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts   # Manejo de errores
│   │   │   └── rateLimit.ts      # Rate limiting
│   │   └── types.ts              # Tipos TypeScript
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Barra de navegación
│   │   │   ├── Footer.tsx        # Pie de página
│   │   │   └── Slider.tsx        # Carousel principal
│   │   ├── routes/
│   │   │   ├── Home.tsx          # Página principal
│   │   │   ├── Login.tsx         # Página de login
│   │   │   ├── Register.tsx      # Página de registro
│   │   │   ├── Datasets.tsx      # Lista de datasets
│   │   │   └── DatasetNew.tsx    # Crear nuevo dataset
│   │   ├── services/
│   │   │   └── api.ts            # Cliente API con manejo de errores
│   │   ├── styles/
│   │   │   └── global.css        # Estilos globales
│   │   ├── App.tsx               # Componente principal
│   │   └── main.tsx              # Punto de entrada
│   ├── index.html                # HTML principal con Bootstrap CDN
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔧 Scripts Disponibles

### Backend
- `npm run dev`: Ejecuta el servidor en modo desarrollo con nodemon
- `npm run build`: Compila TypeScript a JavaScript
- `npm start`: Ejecuta el servidor compilado

### Frontend
- `npm run dev`: Ejecuta el servidor de desarrollo de Vite
- `npm run build`: Compila la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

## 🌐 Endpoints de la API

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Datasets
- `GET /datasets` - Obtener datasets del usuario (requiere token)
- `POST /datasets` - Crear nuevo dataset (requiere token)

### Utilidades
- `GET /health` - Health check del servidor

## 🔒 Seguridad

- Rate limiting: 5 requests por 15 minutos para auth, 100 para general
- Validación de tokens en rutas protegidas
- CORS configurado para el frontend
- Validación de tipos en frontend y backend
- Sanitización básica de inputs

## 🎨 Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Vite, React Router
- **Backend**: Node.js, Express, TypeScript
- **UI**: Bootstrap 5, Bootstrap Icons
- **Herramientas**: ESLint, Prettier (configurables)

## 📝 Notas de Desarrollo

- Los datos se almacenan en memoria (se pierden al reiniciar el servidor)
- Los tokens son dummy (no son JWT reales)
- La subida de archivos CSV solo valida metadata (no se almacena el archivo)
- El proyecto está optimizado para desarrollo y demostración

## 🚀 Próximos Pasos

Para convertir esto en una aplicación de producción, considera:

1. Implementar una base de datos real (PostgreSQL, MongoDB)
2. Usar JWT reales para autenticación
3. Implementar subida real de archivos (AWS S3, etc.)
4. Añadir tests unitarios y de integración
5. Implementar CI/CD
6. Añadir logging y monitoreo
7. Implementar cache (Redis)
8. Añadir documentación de API (Swagger)

---

¡Disfruta explorando la plataforma de Data Science! 🎉
