// Primero importamos las constantes que definen los tipos de acciones que nuestro reducer procesará luego.
import { FETCH_ALL, CREATE, DELETE, LIKE } from '../constants/actionTypes';

// Importamos todas las funciones de la API como un objeto nombrado 'api'
// La sintaxis * as api importa todas las exportaciones del módulo api/index.js
import * as api from '../api/index.js';

// Action Creator: getPosts
// Esta implementación consiste en:
export const getPosts = () => async (dispatch) => {
 try {
   // Llamada a la API:
   // Usa await para esperar la respuesta de fetchPosts()
   // Desestructura la propiedad 'data' de la respuesta
   const { data } = await api.fetchPosts();
   
   // Dispatch de Acción:
   // Crea y despacha un objeto de acción con:
   //    - type: FETCH_ALL para indicar que queremos obtener todos los posts
   //    - payload: data que contiene el array de posts recibido del servidor
   dispatch({ type: FETCH_ALL, payload: data });
 } catch (error) {
   console.log(error);
 }
};

// Action Creator: createPost
export const createPost = (post) => async (dispatch) => {
 try {
   // Llamada a la API:
   // Envía el objeto post al servidor mediante api.createPost
   // Desestructura la respuesta para obtener el nuevo post creado
   const { data } = await api.createPost(post);
   // Este dispatch es el PARÁMETRO que recibe la función async
        // y es el MISMO dispatch que el del componente -- notita para no olvidar...
   // Dispatch de Acción:
   // Despacha acción CREATE con el nuevo post en el payload
   // El reducer utilizará este payload para agregar el post al estado
   dispatch({ type: CREATE, payload: data });
 } catch (error) {
   console.log(error);
 }
};

// Action Creator: deletePost
export const deletePost = (id) => async (dispatch) => {
 try {
   // Llamada a la API:
   // 1. Envía petición de eliminación al servidor
   // 2. No necesitamos desestructurar la respuesta porque solo
   //    necesitamos saber si la eliminación fue exitosa
   await api.deletePost(id);
   
   // Dispatch de Acción:
   // 1. Si la eliminación fue exitosa, despacha DELETE con el id
   // 2. El reducer usará este id para eliminar el post del estado
   dispatch({ type: DELETE, payload: id });
 } catch (error) {
   console.log(error);
 }
};

// Action Creator: likePost
export const likePost = (id) => async (dispatch) => {
 try {
   // Llamada a la API:
   // Envía petición para dar like al servidor
   // Desestructura la respuesta para obtener el post actualizado
   const { data } = await api.likePost(id);
   
   // Dispatch de Acción:
   // Despacha acción LIKE con el post actualizado
   // El reducer actualizará el post en el estado con la nueva
   //    información de likes
   dispatch({ type: LIKE, payload: data });
 } catch (error) {
   console.log(error);
 }
};





// Action Creator: getPosts
// Recuperar todos los posts existentes del servidor y actualizarlos en el estado global de Redux.
// 
// 1. Cuando se invoca getPosts():
//    - Se crea una función thunk que tiene acceso al dispatch de Redux
//    - Esta función es async porque necesitamos esperar la respuesta del servidor
//
// 2. Proceso de Obtención de Datos:
//    - Se realiza una llamada GET a través de api.fetchPosts()
//    - La respuesta se desestructura para obtener solo los datos {data}
//    - Estos datos contienen el array de todos los posts
//
// 3. Actualización del Estado:
//    - Se despacha una acción FETCH_ALL con los posts como payload
//    - El reducer de posts procesará esta acción y actualizará el estado
//    - Todos los componentes suscritos al estado de posts se re-renderizarán
//
// Action Creator: createPost
// Crear un nuevo post en el servidor y agregarlo al estado global de la aplicación.
// 1. Cuando se invoca createPost(post):
//    - Recibe los datos del nuevo post del formulario
//    - Crea una función thunk para manejar la operación asíncrona
//
// 2. Proceso de Creación:
//    - Envía una petición POST al servidor con los datos del nuevo post
//    - Espera la respuesta que contiene el post creado con su ID generado
//    - La respuesta incluye datos adicionales como timestamp y creator
//
// 3. Actualización del Estado:
//    - Despacha una acción CREATE con el nuevo post
//    - El reducer añadirá este post al array de posts existente
//    - La UI se actualizará mostrando el nuevo post
//
// Action Creator: deletePost
// Eliminar un post específico tanto del servidor como del estado de la aplicación.
// 1. Cuando se invoca deletePost(id):
//    - Recibe el ID único del post a eliminar
//    - Prepara una función thunk para la operación asíncrona
//
// 2. Proceso de Eliminación:
//    - Envía una petición DELETE al servidor
//    - Espera la confirmación de eliminación
//    - No necesita datos de retorno, solo confirmación
//
// 3. Actualización del Estado:
//    - Despacha DELETE con el ID del post eliminado
//    - El reducer filtrará este post del estado
//    - La UI se actualizará removiendo el post
//


// Action Creator: likePost
// Gestionar el sistema de likes de posts, actualizando tanto en servidor como en cliente.
// 1. Cuando se invoca likePost(id):
//    - Recibe el ID del post que recibió el like
//    - Prepara la función thunk para manejar la actualización
//
// 2. Proceso de Like:
//    - Envía una petición PATCH al servidor
//    - El servidor verifica el usuario y actualiza el contador
//    - Retorna el post actualizado con la nueva información de likes
//
// 3. Actualización del Estado:
//    - Despacha LIKE con el post actualizado
//    - El reducer actualizará el post específico en el estado
//    - La UI reflejará el nuevo contador de likes
//
