# README del Servidor (Server-Side)

Este README proporciona información detallada sobre el lado del servidor del proyecto, incluyendo la estructura de archivos, configuración necesaria, descripción general del funcionamiento del servidor y las instrucciones para ejecutarlo usando npm. Si prefieres ejecutar la aplicación utilizando Docker, por favor dirígete al directorio principal del proyecto donde encontrarás otro `README.md` con instrucciones sobre cómo configurar Docker.

---

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Prerrequisitos](#prerrequisitos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecutando el Servidor](#ejecutando-el-servidor)
- [Descripción General](#descripción-general)
- [Usando Docker](#usando-docker)

---

## Estructura del Proyecto

El lado del servidor está construido con Node.js, Express y MongoDB. A continuación, se muestra la estructura de archivos del directorio `server`:

```
server/
├── controllers/
│   ├── posts.js
│   └── users.js
├── middleware/
│   ├── auth.js
│   └── validate.js
├── models/
│   ├── postMessage.js
│   └── user.js
├── node_modules/
├── routes/
│   ├── posts.js
│   └── users.js
├── .env
├── .gitignore
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── swaggerConfig.js

```

---

## Prerrequisitos

Antes de configurar el servidor, asegúrate de tener instalado:

- **Node.js** (versión 12 o superior)
- **npm** (Administrador de Paquetes de Node)
- **MongoDB Atlas** (cuenta creada para la base de datos en la nube)

---

## Instalación y Configuración

1. **Clona el Repositorio**
   ```bash
   git clone https://github.com/terrilevi/C8288-Desarrollo-de-Sistemas-Web/tree/main/finalProject.git
   ```

2. **Navega al Directorio del Servidor**
   ```bash
   cd finalProject/server
   ```

3. **Instala las Dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```
    Nota: estuve realizandolo de esa manera, por conflictos de version.

4. **Configura las Variables de Entorno**
   - Crea un archivo `.env` en el directorio `server`
   - Añade las siguientes variables:
     ```
     JWT_SECRET=test
     MONGODB_URI=tu_url_de_mongodb_atlas
     PORT=5000
     ```

---

## Ejecutando el Servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm start
```

El servidor se iniciará en `http://localhost:5000`

---

## Descripción General

El servidor proporciona una API RESTful que maneja:

### Autenticación y Usuarios
- **POST /user/signin**: Inicio de sesión
- **POST /user/signup**: Registro de usuarios
- **PATCH /user/profile**: Actualización de perfil

### Sistema de Publicaciones
- **GET /posts**: Obtener todas las publicaciones
- **POST /posts**: Crear nueva publicación
- **DELETE /posts/:id**: Eliminar publicación
- **PATCH /posts/:id/likePost**: Dar/quitar like a una publicación

### Sistema de Amigos
- **POST /user/friend-request/:id**: Enviar solicitud de amistad
- **GET /user/friend-requests**: Ver solicitudes pendientes
- **POST /user/friend-request/:id/accept**: Aceptar solicitud
- **POST /user/friend-request/:id/reject**: Rechazar solicitud
- **GET /user/friends**: Ver lista de amigos

### Características Principales
- Autenticación basada en JWT
- Validación de datos con Joi
- Protección de rutas mediante middleware
- Manejo de errores centralizado
- Integración con MongoDB Atlas

### Tecnologías Utilizadas
- **Express**: Framework web
- **MongoDB**: Base de datos
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación
- **bcryptjs**: Encriptación de contraseñas
- **Joi**: Validación de datos
- **Cors**: Manejo de CORS

---

## Usando Docker

Si prefieres ejecutar la aplicación utilizando Docker, por favor navega al directorio principal del proyecto. En el directorio raíz, encontrarás otro archivo `README.md` con instrucciones sobre cómo configurar y ejecutar la aplicación completa usando Docker.

---

**¡Yay!**

---

