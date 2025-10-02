# Plataforma Analisis de Datos 

Una plataforma web moderna para Ciencia e Ingeniería de Datos construida con React, TypeScript, Node.js y Express.

##  Características

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **UI**: Bootstrap 5 con diseño responsivo
- **Autenticación**: Sistema de login/registro con tokens
- **Gestión de Datasets**: Creación, visualización y previsualización de CSV
- **Manejo de Errores**: Try/catch, reintentos automáticos y timeouts
- **Protección de Rutas**: Rutas privadas con verificación de tokens

## Instalación y Configuración

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

## Funcionalidades Principales

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


## Scripts Disponibles

### Backend
- `npm run dev`: Ejecuta el servidor en modo desarrollo con nodemon
- `npm run build`: Compila TypeScript a JavaScript
- `npm start`: Ejecuta el servidor compilado

### Frontend
- `npm run dev`: Ejecuta el servidor de desarrollo de Vite
- `npm run build`: Compila la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

## Endpoints de la API

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Datasets
- `GET /datasets` - Obtener datasets del usuario (requiere token)
- `POST /datasets` - Crear nuevo dataset (requiere token)

### Utilidades
- `GET /health` - Health check del servidor
