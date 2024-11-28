// REDUCER DE POSTS
// Este reducer maneja toda la lógica relacionada con los posts

// Importamos los tipos de acciones que este reducer va a manejar
// Estos tipos son constantes que definimos ya previamente, sobre todo se realiza esto para evitar errores de tipeo
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// Definimos nuestro reducer como una función que exportamos por defecto
// La función recibe dos parámetros:
// 1. posts = [] : El estado actual (se inicializa como array vacío si no existe)
// 2. action: La acción que queremos realizar ( este action contiene type y payload(always))
export default (posts = [], action) => {
   // Usamos switch para determinar qué hacer según el tipo de acción
   switch (action.type) {
       case FETCH_ALL:
           // Esta acción se ejecuta cuando obtenemos todos los posts del servidor
           // Simplemente reemplazamos todo el estado actual con los nuevos posts
           // action.payload contiene el array de posts que vino del servidor
           return action.payload;

       case LIKE:
           // Esta acción se ejecuta cuando un usuario da like a un post
           // Necesitamos actualizar un post específico dentro del array
           return posts.map((post) => {
               // map crea un nuevo array recorriendo cada post
               // Si encontramos el post que recibió el like (comparando IDs)
               // lo reemplazamos con la versión actualizada (action.payload)
               // Si no es el post que buscamos, lo dejamos como está
               return post._id === action.payload._id ? action.payload : post
           });

       case CREATE:
           // Esta acción se ejecuta cuando creamos un nuevo post
           // Usamos spread operator (...) para crear un nuevo array que contiene:
           // todos los posts existentes (...posts)
           // y el nuevo post al final (action.payload)
           return [...posts, action.payload];

       case DELETE:
           // Esta acción se ejecuta cuando eliminamos un post
           // Usamos filter para crear un nuevo array que excluya
           // el post que queremos eliminar
           // filter crea un nuevo array solo con los posts cuyo ID
           // NO coincida con el ID que queremos eliminar
           return posts.filter((post) => post._id !== action.payload);

       default:
           return posts;
   }
};

// EJEMPLITO:

// Estado Inicial:
// posts = []

// Si llega una acción CREATE:
// action = {
//     type: CREATE,
//     payload: { _id: '123', title: 'Nuevo Post', likes: 0 }
// }
// Resultado: posts = [{ _id: '123', title: 'Nuevo Post', likes: 0 }]

// Si llega una acción LIKE para ese post:
// action = {
//     type: LIKE,
//     payload: { _id: '123', title: 'Nuevo Post', likes: 1 }
// }
// Resultado: posts = [{ _id: '123', title: 'Nuevo Post', likes: 1 }]

// Si llega una acción DELETE:
// action = {
//     type: DELETE,
//     payload: '123'
// }
// Resultado: posts = []