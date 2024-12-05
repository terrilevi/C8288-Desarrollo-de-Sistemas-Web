// Este es un action creator file que define las acciones relacionadas con el sistema de amigos.
// Y maneja 5 operaciones fundamentales
// - Enviar solicitudes de amistad
// - Obtener la lista de solicitudes de amistad enviadas
// - Aceptar solicitudes de amistad
// - Rechazar solicitudes de amistad
// - Obtener la lista de amigos agregados


// Primero importamos nuestros action type constants para acciones que tienen que ver con "amigos"
import {GET_FRIEND_REQUESTS, ACCEPT_FRIEND_REQUEST, REJECT_FRIEND_REQUEST, GET_FRIENDS } from '../constants/actionTypes';

// Importamos todas las funciones de la API como un objeto nombrado 'api'
// Permite acceder a endpoints específicos para amigos como api.sendFriendRequest, api.getFriends, etc.
import * as api from '../api/index.js';


// Exportamos nuestro action creator asincrono llamado sendFriendRequest, que acepta userId, que
// es el ID del usuario de la persona que el usuario quiere agregar.
export const sendFriendRequest = (userId) => async (dispatch) => {
  try {
      await api.sendFriendRequest(userId);
      // No realizamos un dispatch acá- Dejamos que Socket.IO maneje el update 
  } catch (error) {
      console.log('Error enviando un friendRequest: ', error);
  }
};

// Flujo completo de datos:
// Se inicia cuando un usuario hace clic en el botón de agregar amigo en Post.js:
// const handleFriendRequest = () => {
//   dispatch(sendFriendRequest(post.creator));
// };
// El action creator recibe el ID del usuario destinatario (post.creator)
// Hace una llamada POST a http://localhost:5000/user/friend-request/${userId} vía api.sendFriendRequest
// El backend:
  // Verifica autenticación mediante el middleware auth
  // Añade la solicitud al array friendRequests del destinatario
  // Emite un evento Socket.IO 'friendRequestUpdate'
// El Socket.IO en el cliente recibe el evento y actualiza el estado
// No hay dispatch directo porque Socket.IO maneja la actualización del estado



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
// Flujo de datos:
// Se inicia en dos momentos:
    // Cuando el componente FriendRequests.js se monta:
      // useEffect(() => {
      //   dispatch(getFriendRequests());
      // }, [dispatch]);
    // Cuando se recibe un evento Socket.IO 'friendRequestUpdate'
// El action creator no recibe parámetros
// Hace una llamada GET a http://localhost:5000/user/friend-requests
// El backend:
  // Verifica autenticación
  // Busca al usuario en la base de datos
  // Hace populate de los datos de los remitentes de las solicitudes
// La respuesta contiene un array de objetos de solicitud con formato:
  // {
  //   _id: 'requestId',
  //   from: {
  //     _id: 'userId',
  //     name: 'userName',
  //     email: 'userEmail'
  //   },
  //   createdAt: Date
  // }
// El dispatch envía estos datos al reducer friends.js
// El reducer actualiza el estado: state.friends.requests = action.payload



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
// Flujo de datos :
// Se inicia cuando un usuario hace clic en "Accept" en FriendRequests.js:
  // <Button onClick={() => dispatch(acceptFriendRequest(request._id))}></Button>
// El action creator recibe el ID de la solicitud específica
// Hace una llamada POST a http://localhost:5000/user/friend-request/${requestId}/accept
// El backend:
  // Encuentra la solicitud específica
  // Añade cada usuario a la lista de amigos del otro
  // Elimina la solicitud de friendRequests
  // Emite eventos Socket.IO para actualizar ambos usuarios
// El dispatch actualiza el estado local removiendo la solicitud aceptada
// El reducer filtra la solicitud del array:
  // requests: state.requests.filter(request => request._id !== action.payload)



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
// Flujo de datos:
// Se inicia cuando un usuario hace clic en "Not now" en FriendRequests.js:
  // <Button onClick={() => dispatch(rejectFriendRequest(request._id))}></Button>
// El action creator recibe el ID de la solicitud a rechazar
// Hace una llamada POST a http://localhost:5000/user/friend-request/${requestId}/reject
// El backend:
  // Encuentra la solicitud específica
  // La elimina del array friendRequests
  // No realiza ninguna modificación a las listas de amigos
// El dispatch actualiza el estado local removiendo la solicitud rechazada
// El reducer usa la misma lógica que accept para filtrar la solicitud




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
// Flujo de datos
// Se inicia cuando el componente FriendsList.js se monta:
// El action creator no recibe parámetros
// Hace una llamada GET a http://localhost:5000/user/friends
// El backend:
  // Busca al usuario autenticado
  // Hace populate de su array friends con los datos de cada amigo
// La respuesta contiene un array de objetos de usuario con formato:
  // [{
  //   _id: 'userId',
  //   name: 'userName',
  //   email: 'userEmail'
  // }]
// El dispatch envía estos datos al reducer
// El reducer actualiza el estado: state.friends.friendsList = action.payload