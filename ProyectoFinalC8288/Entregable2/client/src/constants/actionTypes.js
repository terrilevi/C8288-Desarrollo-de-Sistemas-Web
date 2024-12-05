// ESTAS SON LAS CONSTANTES DE ACTION TYPES PARA REDUX
// En este file se centraliza todas las constantes que identifican los tipos de acciones
// que pueden ser despachadas.

// ACCIONES RELACIONADAS CON POSTS:
// Estas constantes se utilizan para operaciones CRUD de posts

// Acción para crear un nuevo post
// La utilizamos en actions/posts.js -> createPost
// La manejamos/usamos en : reducers/posts.js
export const CREATE = 'CREATE';

// Acción para eliminar un post existente
// La utilizamos en actions/posts.js -> deletePost
// La manejamos/usamos en : reducers/posts.js
export const DELETE = 'DELETE';

// Acción para obtener todos los posts
// La utilizamos en actions/posts.js -> getPosts
// La manejamos/usamos en : reducers/posts.js
// Esta acción se ejecuta al cargar la aplicación o actualizar el feed
export const FETCH_ALL = 'FETCH_ALL';

// Acción para gestionar likes en posts
// La utilizamos en actions/posts.js -> likePost
// La manejamos/usamos en : reducers/posts.js
// Se ejecuta cuando un usuario da like/unlike a un post
export const LIKE = 'LIKE';

export const HAHA = 'HAHA';



// ACCIONES RELACIONADAS CON AUTENTICACIÓN:


// Acción para autenticación exitosa
// La utilizamos en actions/auth.js -> signin, signup
// La manejamos/usamos en : reducers/auth.js
// Se ejecuta después de un login o registro exitoso
export const AUTH = 'AUTH';

// Acción para cerrar sesión
// La utilizamos en components/NavBar/NavBar.js
// La manejamos/usamos en : reducers/auth.js
// Limpia el estado de autenticación y el localStorage
export const LOGOUT = 'LOGOUT';

// Acción para actualizar perfil de usuario
// La utilizamos en actions/auth.js -> updateProfile
// La manejamos/usamos en : reducers/auth.js
// Se ejecuta cuando el usuario modifica su información de perfil
export const UPDATE_PROFILE = 'UPDATE_PROFILE';



// ACCIONES RELACIONADAS CON SISTEMA DE AMIGOS:

// Acción para enviar solicitud de amistad
// La utilizamos en actions/friends.js -> sendFriendRequest
// La manejamos/usamos en : reducers/friends.js
// Se ejecuta cuando un usuario envía una solicitud de amistad
export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';

// Acción para obtener solicitudes de amistad pendientes
// La utilizamos en actions/friends.js -> getFriendRequests
// La manejamos/usamos en : reducers/friends.js
// Carga las solicitudes de amistad pendientes del usuario
export const GET_FRIEND_REQUESTS = 'GET_FRIEND_REQUESTS';

// Acción para aceptar una solicitud de amistad
// La utilizamos en actions/friends.js -> acceptFriendRequest
// La manejamos/usamos en : reducers/friends.js
// Actualiza el estado cuando se acepta una solicitud
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';

// Acción para rechazar una solicitud de amistad
// La utilizamos en actions/friends.js -> rejectFriendRequest
// La manejamos/usamos en : reducers/friends.js
// Actualiza el estado cuando se rechaza una solicitud
export const REJECT_FRIEND_REQUEST = 'REJECT_FRIEND_REQUEST';

// Acción para obtener lista de amigos
// La utilizamos en actions/friends.js -> getFriends
// La manejamos/usamos en : reducers/friends.js
// Carga la lista de amigos del usuario actual
export const GET_FRIENDS = 'GET_FRIENDS';


// Acción para añadir comentarios a un post
// La utilizamos en actions/posts.js -> createComment
// La manejamos/usamos en: reducers/posts.js
// Se ejecuta cuando un usuario agrega un comentario a un post
// El reducer actualiza el post específico con el nuevo comentario
export const COMMENT = 'COMMENT';
