// Reducer de Amigos (friendsReducer)
// Este reducer se encarga de manejar todo el estado relacionado con
// las solicitudes de amistad y la lista de amigos 

// Importamos las constantes que definen los tipos de acciones que este reducer
// va a procesar. Estas constantes las usamos para identificar qué acción 
// queremos realizar en cada caso...
import { GET_FRIEND_REQUESTS, ACCEPT_FRIEND_REQUEST, REJECT_FRIEND_REQUEST, GET_FRIENDS } from '../constants/actionTypes';

// Definimos nuestro reducer como una función que recibe dos elementos:
// 1. state: el estado actual (si no existe, se inicializa con dos arrays vacíos:
//    uno para solicitudes y otro para la lista de amigos)
// 2. action: la acción que queremos realizar
const friendsReducer = (state = { requests: [], friendsList: [] }, action) => {
  // Usamos un switch para determinar qué acción ejecutar según el tipo
  switch (action.type) {
      case GET_FRIEND_REQUESTS:
          // Esta acción se ejecuta cuando queremos obtener todas las
          // solicitudes de amistad pendientes
          
          // Actualizamos el estado reemplazando completamente el array
          // de solicitudes con los nuevos datos que vienen en action.payload
          // El spread operator (...) nos permite mantener el resto del estado intacto
          return { ...state, requests: action.payload };

      case ACCEPT_FRIEND_REQUEST:
          // Esta acción se ejecuta cuando un usuario acepta una solicitud de amistad
          // Lo que hacemos es eliminar la solicitud aceptada de la lista de solicitudes
          // pendientes
          
          // Usamos filter para crear un nuevo array que excluya la solicitud aceptada
          // luego comparamos el _id de cada solicitud con el ID que viene en action.payload
          return { 
              ...state, 
              requests: state.requests.filter(request => request._id !== action.payload) 
          };

      case REJECT_FRIEND_REQUEST:
          // Esta acción se ejecuta cuando un usuario rechaza una solicitud de amistad
          // Tmb eliminamos la solicitud rechazada de la lista de solicitudes pendientes
          
          // es idéntica a ACCEPT_FRIEND_REQUEST porque en ambos
          // casos queremos remover la solicitud de la lista de pendientes
          return { 
              ...state, 
              requests: state.requests.filter(request => request._id !== action.payload) 
          };

      case GET_FRIENDS:
          // Esta acción se ejecuta cuando queremos obtener la lista completa
          // de amigos del usuario
          
          // Actualizamos el estado reemplazando el array friendsList
          // con los nuevos datos que vienen en action.payload
          return { ...state, friendsList: action.payload };

      default:
          // Este es el caso por defecto, que se ejecuta cuando:
          // La aplicación se inicia por primera o recibimos una acción que no está arriba
          // simplemente devolvemos el estado sin modificar
          return state; // tal vez deberia agregar casos de error..
  }
};

// Exportamos nuestro reducer para poder utilizarlo en la configuración
// del store de Redux, específicamente en el combineReducers
export default friendsReducer;