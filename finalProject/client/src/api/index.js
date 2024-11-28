// Este archivo contiene /centraliza TODAS las llamadas HTTP al backend usando Axios!!!

// Importación de Axios:
// Axios es una biblioteca para realizar peticiones HTTP
import axios from 'axios';

// axios.create() genera una instancia configurada de Axios
// baseURL establece la URL base para todas las peticiones. Todas las rutas que 
// definamos después se añadirán a esta URL base
export const API = axios.create({ baseURL: 'http://localhost:5000' });

// Un Interceptor de Peticiones, se ejecuta antes de cada petición HTTP y permite modificar las peticiones antes de enviarlas al servidor
// Tambien es util para añadir headers de autenticación
API.interceptors.request.use((req) => {
// Primero se comprueba si existe un perfil en localStorage, localStorage es un API del navegador para almacenamiento persistente
    if(localStorage.getItem('profile')) {
        // Configuración del Token:
        // Primero se bbtiene el token del perfil almacenado
        // Luego JSON.parse convierte el string almacenado en un objeto
        // Y despues se añade el token en formato Bearer al header Authorization
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    // Luego solo retorna la petición ya modificada
    return req;
});

// ESTOS SON LOS ENDPOINTS DE POSTS: 
// Cada función representa una operación específica con posts

// Obtener Todos los Posts:
// GET /posts
// No requiere parámetros, retorna array de posts
export const fetchPosts = () => API.get('/posts');

// Crear Nuevo Post:
// POST /posts
// Requiere objeto newPost con datos del post
export const createPost = (newPost) => API.post('/posts', newPost);

// Dar Like a un Post:
// PATCH /posts/:id/likePost
// Actualización parcial para modificar likes
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// Actualizar Post:
// PATCH /posts/:id
// Requiere ID y objeto con datos actualizados
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

// Eliminar Post:
// DELETE /posts/:id
// Requiere ID del post a eliminar
export const deletePost = (id) => API.delete(`/posts/${id}`);






// ESTOS SON LOS ENDPOINTS DE AUTENTICACIÓN Y USUARIOS
// Relacionado con usuarios y autenticación

// Iniciar Sesión:
// POST /user/signin
// Requiere formData con credenciales (email, password)
export const signIn = (formData) => API.post('/user/signin', formData);

// Registrar Usuario:
// POST /user/signup
// Requiere formData con datos de registro
export const signUp = (formData) => API.post('/user/signup', formData);

// ESTOS SON LOS ENDPOINTS DE GESTIÓN DE AMIGOS

// Enviar Solicitud de Amistad:
// POST /user/friend-request/:userId
// Requiere ID del usuario a quien se envía la solicitud
export const sendFriendRequest = (userId) => API.post(`/user/friend-request/${userId}`);

// Aceptar Solicitud de Amistad:
// POST /user/friend-request/:requestId/accept
// Requiere ID de la solicitud a aceptar
export const acceptFriendRequest = (requestId) => API.post(`/user/friend-request/${requestId}/accept`);

// Rechazar Solicitud de Amistad:
// POST /user/friend-request/:requestId/reject
// Requiere ID de la solicitud a rechazar
export const rejectFriendRequest = (requestId) => API.post(`/user/friend-request/${requestId}/reject`);

// Obtener Solicitudes de Amistad:
// GET /user/friend-requests
// Retorna array de solicitudes pendientes
export const getFriendRequests = () => API.get('/user/friend-requests');

// Obtener Lista de Amigos:
// GET /user/friends
// Retorna array de amigos del usuario
export const getFriends = () => API.get('/user/friends');

// Actualizar Perfil de Usuario:
// PATCH /user/profile
// Requiere objeto userData con datos a actualizar
export const updateProfile = (userData) => API.patch('/user/profile', userData);