# README del Cliente (Client-Side)

Este README proporciona información sobre el lado del cliente del proyecto, incluyendo la estructura de archivos, pasos de configuración para evitar problemas, una descripción general de cómo funciona el cliente y las instrucciones para ejecutar el cliente usando npm. Si prefieres ejecutar la aplicación utilizando Docker, por favor dirígete al directorio principal del proyecto donde encontrarás otro `README.md` con instrucciones sobre cómo configurar Docker.

---

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Prerrequisitos](#prerrequisitos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecutando el Cliente](#ejecutando-el-cliente)
- [Descripción General](#descripción-general)
- [Usando Docker](#usando-docker)

---

## Estructura del Proyecto

El lado del cliente del proyecto está construido con React y Redux. A continuación, se muestra la estructura de archivos del directorio `client`:

```
client/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── actions/
│   │   ├── auth.js
│   │   ├── friends.js
│   │   └── posts.js
│   ├── api/
│   │   └── index.js
│   ├── assets/
│   │   └── fonts/
│   │       └── Jayaque-Syln2.otf
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Auth.js
│   │   │   ├── Input.js
│   │   │   └── styles.js
│   │   ├── Form/
│   │   │   ├── Form.js
│   │   │   └── styles.js
│   │   ├── FriendRequests/
│   │   │   ├── FriendRequests.js
│   │   │   └── styles.js
│   │   ├── FriendsList/
│   │   │   ├── FriendsList.js
│   │   │   └── styles.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   ├── NavBar/
│   │   │   ├── NavBar.js
│   │   │   └── styles.js
│   │   ├── Posts/
│   │   │   ├── Post/
│   │   │   │   ├── Post.js
│   │   │   │   └── styles.js
│   │   │   ├── Posts.js
│   │   │   └── styles.js
│   │   ├── Profile/
│   │   │   ├── Profile.js
│   │   │   └── styles.js
│   ├── constants/
│   │   └── actionTypes.js
│   ├── images/
│   │   └── memories.png
│   ├── reducers/
│   │   ├── auth.js
│   │   ├── friends.js
│   │   ├── index.js
│   │   └── posts.js
│   ├── index.css
│   ├── index.js
│   ├── App.js
│   ├── styles.js
├── .env
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
```

---

## Prerrequisitos

Antes de configurar el cliente, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 12 o superior)
- **npm** (Administrador de Paquetes de Node, viene con Node.js)

---

## Instalación y Configuración

Sigue estos pasos para configurar la aplicación del lado del cliente:

1. **Clona el Repositorio**

   ```bash
   git clone https://github.com/terrilevi/C8288-Desarrollo-de-Sistemas-Web/tree/main/finalProject.git
   ```

2. **Navega al Directorio del Cliente**

   ```bash
   cd finalProject/client
   ```

3. **Instala las Dependencias**

   ```bash
   npm install --legacy-peer-deps
   ```
    Nota: estuve realizandolo de esa manera, por conflictos de version.

4. **Configura las Variables de Entorno**

   - Crea un archivo `.env` en el directorio `client`.
   - Agrega SKIP_PREFLIGHT_CHECK=true

---

## Ejecutando el Cliente

Para ejecutar la aplicación del lado del cliente usando npm, ejecuta el siguiente comando dentro del directorio `client`:

```bash
npm start
```

Este comando inicia el servidor de desarrollo y abre la aplicación en tu navegador predeterminado en `http://localhost:3000`.

Nota: Ten en cuenta, que el client trabajo con el server-side, asi que pueda que algunas funcionalidades no funcionen como deberian pues necesitan que el servidor esté tambien corriendo. 

---

## Descripción General

La aplicación del lado del cliente es una plataforma de redes sociales donde los usuarios pueden:

- **Autenticarse**: Registrarse e iniciar sesión usando su correo electrónico y contraseña.
- **Crear Publicaciones**: Los usuarios autenticados pueden crear nuevas publicaciones con texto e imágenes.
- **Ver Publicaciones**: Todos los usuarios pueden ver un feed de publicaciones.
- **Dar Me Gusta a Publicaciones**: Los usuarios pueden dar o quitar "Me Gusta" a las publicaciones.
- **Eliminar Publicaciones**: Los usuarios pueden eliminar sus propias publicaciones.
- **Enviar Solicitudes de Amistad**: Los usuarios pueden enviar solicitudes de amistad a otros usuarios.
- **Gestionar Solicitudes de Amistad**: Aceptar o rechazar solicitudes de amistad entrantes.
- **Ver Lista de Amigos**: Ver una lista de amigos aceptados.
- **Actualizar Perfil**: Los usuarios pueden actualizar su nickname.

### Tecnologías Utilizadas

- **React**: Para construir la interfaz de usuario.
- **Redux**: Para la gestión del estado.
- **Axios**: Para hacer llamadas API al servidor backend.
- **React Router**: Para manejar el enrutamiento del lado del cliente.
- **Material-UI**: Para componentes de interfaz de usuario y estilos.

---

## Usando Docker

Si prefieres ejecutar la aplicación del lado del cliente utilizando Docker, por favor navega al directorio principal del proyecto. En el directorio raíz, encontrarás otro archivo `README.md` con instrucciones sobre cómo configurar y ejecutar la aplicación completa (tanto cliente como servidor) usando Docker.

---

**¡Yay!**

---
