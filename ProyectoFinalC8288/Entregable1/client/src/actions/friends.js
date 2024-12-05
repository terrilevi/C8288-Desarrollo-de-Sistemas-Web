// Primero importamos nuestros action type constants para acciones que tienen que ver con "amigos"
import { SEND_FRIEND_REQUEST, GET_FRIEND_REQUESTS, ACCEPT_FRIEND_REQUEST, REJECT_FRIEND_REQUEST, GET_FRIENDS } from '../constants/actionTypes';
// Tambien necesitamos importar todas las exportaciones de api/index.js
// como api, para poder usar las funciones API.
import * as api from '../api/index.js';


// Exportamos nuestro action creator asincrono llamado sendFriendRequest, que acepta userId, que
// es el ID del usuario de la persona que el usuario quiere agregar.
export const sendFriendRequest = (userId) => async (dispatch) => {
  // Dentro del bloque try se realiza un API call a api.sendFriendRequest(userId)
  // api.sendFriendRequest(userId) envia un POST request a /user/friend-request/:id
  // donde :id es userId
  try {
    const { data } = await api.sendFriendRequest(userId);
    // Despues, se despacha la accion SEND_FRIEND_REQUEST con la data recibida y si ocurre algun error
    // entonces se muestra en la consola el error.
    dispatch({ type: SEND_FRIEND_REQUEST, payload: data });
  } catch (error) {
    console.log('Error enviando un friendRequest: ', error);
    };
};

// Resumen de sendFriendRequest:
// Este action creator tiene como objetivo enviar un friend request a otro usuario, para realizar eso
// lo que sucede primero es una llamada a api.getFriendRequests, despacha SEND_FRIEND_REQUEST action y si pasa
// algun error en la llamada api o en el despacho, entonces se muestra el error en la consola.





// Exportamos nuestro action creator async llamado getFriendRequests que lo que hará principalmente
// es un fetch de las solicitudes enviadas al usuario autenticado. ( solicitudes de amistad )
export const getFriendRequests = () => async (dispatch) => {
  try {
    const { data } = await api.getFriendRequests();
    dispatch({ type: GET_FRIEND_REQUESTS, payload: data });
  } catch (error) {
    console.log('Error al realizar fetching de los friendRequests:', error);
  }
};

// Resumen de getFriendRequests:
// Realiza un API call a api.getFriendRequests, luego despacha GET_FRIEND_REQUESTS action con la data
// y si ocurre algun error en uno de esos procesos entonces muestra el error
// Notita: api.getFriendRequests() envia un GET request a /user/friend-requests



// Exportamos acceptFriendRequest action creator, este action creator llama al api.acceptFriendRequest(requestId)
// para aceptar el request, api.acceptFriendRequest(requestId) envia un POST request a /user/friend-request/:id/accept
// Y luego se despacha ACCEPT_FRIEND_REQUEST con el requestID para actualizar el Redux store
export const acceptFriendRequest = (requestId) => async (dispatch) => {
  try {
    await api.acceptFriendRequest(requestId);
    dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: requestId });
  } catch (error) {
    console.log(error);
  }
};


// Exportamos rejectFriendRequest action creaton, este action creator está hecho para poder "rechazar un request"
// para que pueda realizar eso primero llama al api.rejectFriendRequest(requestId) y despacha REJECT_FRIEND_REQUEST action con el 
// requestId.
export const rejectFriendRequest = (requestId) => async (dispatch) => {
  try {
    await api.rejectFriendRequest(requestId);
    dispatch({ type: REJECT_FRIEND_REQUEST, payload: requestId });
  } catch (error) {
    console.log(error);
  }
};


// Exportamos getFriends action creator, que tiene como objetivo llamar a api.getFriends para obtener la lista
// de ususarios argegados, para eso el api.getFriends envia un GET request a /user/friends.
// Despues se despacha un action de tipo GET_FRIENDS.

export const getFriends = () => async (dispatch) => {
  try {
    const { data } = await api.getFriends();
    dispatch({ type: GET_FRIENDS, payload: data });
  } catch (error) {
    console.log('Error al realizar fetching de lista de amigos del usuario:', error);
  }
};