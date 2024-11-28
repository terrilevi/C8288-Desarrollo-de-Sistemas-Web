# Aplicación web de red social - FakeSocialMedia

Este proyecto es una aplicación web de red social que permite a los usuarios registrarse, iniciar sesión, crear publicaciones, enviar solicitudes de amistad, aceptar o rechazar solicitudes, y actualizar su perfil. La aplicación está dividida en dos partes principales: el cliente (frontend) construido con React y Redux, y el servidor (backend) construido con Node.js, Express y MongoDB.

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
- [Estructura de Directorios](#estructura-de-directorios)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso de Docker](#uso-de-docker)
  - [Requisitos Previos](#requisitos-previos)
  - [Construcción de la Imagen Docker](#construcción-de-la-imagen-docker)
  - [Ejecución de los Contenedores](#ejecución-de-los-contenedores)
  - [Detener los Contenedores](#detener-los-contenedores)
- [APIs y Endpoints](#apis-y-endpoints)



---

## Características

- **Autenticación de Usuarios**: Registro e inicio de sesión con validación y tokens JWT.
- **Creación y Gestión de Publicaciones**: Los usuarios pueden crear, ver, eliminar y dar "me gusta" a publicaciones.
- **Sistema de Amistades**: Envío, aceptación y rechazo de solicitudes de amistad.
- **Actualización de Perfil**: Los usuarios pueden actualizar su información personal.
- **Interfaz de Usuario Intuitiva**: Construida con React.

---

## Tecnologías Utilizadas

### Frontend

- **React**
- **Redux**
- **React Router**
- **Axios**
- **Material-UI**

### Backend

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JSON Web Tokens (JWT)**
- **bcryptjs**
- **Joi**

---

## Arquitectura de la Aplicación

La aplicación sigue una arquitectura cliente-servidor, donde el cliente envía solicitudes HTTP al servidor para realizar operaciones. El servidor maneja las solicitudes, interactúa con la base de datos MongoDB y devuelve las respuestas al cliente.

- **Cliente**: Interfaz de usuario construida con React, que interactúa con el usuario y envía solicitudes al servidor.
- **Servidor**: API REST construida con Express, que maneja la lógica de negocio y las operaciones de la base de datos.
- **Base de Datos**: MongoDB almacena los datos persistentes, como usuarios, publicaciones y solicitudes de amistad.

---

## Estructura de Directorios

### Directorio Principal

```
proyecto-red-social/
├── client/
├── server/
├── docker-compose.yml
├── Dockerfile
└── README.md
```

### Directorio del Cliente (`client/`)

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

### Directorio del Servidor (`server/`)

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

## Instalación y Configuración

### Requisitos Previos

- **Docker** y **Docker Compose** instalados en su sistema.
- **Node.js** y **npm** si desea ejecutar la aplicación sin Docker.

### Clonar el Repositorio

```bash
git clone https://github.com/terrilevi/C8288-Desarrollo-de-Sistemas-Web/tree/main/finalProject.git
```

### Configuración de Variables de Entorno

Crear un archivo `.env` en el directorio `server/` con el siguiente contenido:

```env
PORT=5000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
```

**Nota**: Reemplaza `tu_uri_de_mongodb` y `tu_secreto_jwt` con tus credenciales reales.

---

## Uso de Docker

La aplicación está preparada para ser ejecutada en contenedores Docker utilizando Docker Compose.

### Requisitos Previos

- **Docker** instalado en tu sistema.
- **Docker Compose** instalado (viene incluido con Docker en muchas instalaciones).

### Construcción de la Imagen Docker

Desde el directorio raíz del proyecto, ejecuta:

```bash
docker-compose build
```

Este comando construirá las imágenes Docker para el cliente y el servidor.

Nota: Yo tuve que usar sudo en linux.

### Ejecución de los Contenedores

Para iniciar los contenedores, ejecuta:

```bash
docker-compose up
```

Esto iniciará los servicios definidos en `docker-compose.yml`. La aplicación estará disponible en `http://localhost:3000`.

### Detener los Contenedores

Para detener los contenedores, presiona `Ctrl+C` en la terminal donde se está ejecutando `docker-compose up`, o ejecuta:

```bash
docker-compose down
```

---

## APIs y Endpoints

### Autenticación de Usuarios

- **POST `/user/signup`**: Registro de nuevos usuarios.

  ```javascript
  // Acción de registro
  export const signup = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  ```

- **POST `/user/signin`**: Inicio de sesión de usuarios existentes.

  ```javascript
  // Acción de inicio de sesión
  export const signin = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  ```

### Gestión de Publicaciones

- **GET `/posts`**: Obtener todas las publicaciones.

  ```javascript
  // Acción para obtener publicaciones
  export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  ```

- **POST `/posts`**: Crear una nueva publicación.

  ```javascript
  // Acción para crear una publicación
  export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  ```

- **DELETE `/posts/:id`**: Eliminar una publicación.

  ```javascript
  // Acción para eliminar una publicación
  export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };
  ```

- **PATCH `/posts/:id/likePost`**: Dar o quitar "me gusta" a una publicación.

  ```javascript
  // Acción para dar "me gusta" a una publicación
  export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  ```

### Sistema de Amistades

- **POST `/user/friend-request/:id`**: Enviar una solicitud de amistad.

  ```javascript
  // Acción para enviar solicitud de amistad
  export const sendFriendRequest = (userId) => async (dispatch) => {
    try {
      const { data } = await api.sendFriendRequest(userId);
      dispatch({ type: SEND_FRIEND_REQUEST, payload: data });
    } catch (error) {
      console.log('Error details:', {
        message: error.response?.data?.message || error.message,
        userId: userId
      });
    }
  };
  ```

- **GET `/user/friend-requests`**: Obtener las solicitudes de amistad recibidas.

  ```javascript
  // Acción para obtener solicitudes de amistad
  export const getFriendRequests = () => async (dispatch) => {
    try {
      const { data } = await api.getFriendRequests();
      dispatch({ type: GET_FRIEND_REQUESTS, payload: data });
    } catch (error) {
      console.log('Error fetching friend requests:', error);
    }
  };
  ```

- **POST `/user/friend-request/:id/accept`**: Aceptar una solicitud de amistad.

  ```javascript
  // Acción para aceptar solicitud de amistad
  export const acceptFriendRequest = (requestId) => async (dispatch) => {
    try {
      await api.acceptFriendRequest(requestId);
      dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: requestId });
    } catch (error) {
      console.log(error);
    }
  };
  ```

- **POST `/user/friend-request/:id/reject`**: Rechazar una solicitud de amistad.

  ```javascript
  // Acción para rechazar solicitud de amistad
  export const rejectFriendRequest = (requestId) => async (dispatch) => {
    try {
      await api.rejectFriendRequest(requestId);
      dispatch({ type: REJECT_FRIEND_REQUEST, payload: requestId });
    } catch (error) {
      console.log(error);
    }
  };
  ```

- **GET `/user/friends`**: Obtener la lista de amigos.

  ```javascript
  // Acción para obtener lista de amigos
  export const getFriends = () => async (dispatch) => {
    try {
      const { data } = await api.getFriends();
      dispatch({ type: 'GET_FRIENDS', payload: data });
    } catch (error) {
      console.log('Error fetching friends:', error);
    }
  };
  ```

### Actualización de Perfil

- **PATCH `/user/profile`**: Actualizar información de perfil.

  ```javascript
  // Acción para actualizar el perfil
  export const updateProfile = (userData, history) => async (dispatch) => {
    try {
      const { data } = await api.updateProfile(userData);
      dispatch({ type: UPDATE_PROFILE, data });
      dispatch(getPosts()); 
      history.push('/');
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };
  ```

---

**¡Yay!**

---
