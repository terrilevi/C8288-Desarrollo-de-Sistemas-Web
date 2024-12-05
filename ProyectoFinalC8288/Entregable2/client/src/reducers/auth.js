// Reducer de autenticación (authReducer)
// Este reducer se encarga de manejar todo el estado de autenticación 
// Lo que significa que gestiona cuando un usuario inicia sesión, se registra, cierra sesión 
// y actualiza su perfil.

// Primero importamos las constantes que definen los tipos de acciones
// que este reducer va a manejar
import { AUTH, LOGOUT, UPDATE_PROFILE } from '../constants/actionTypes';

// Definimos nuestro reducer como una función que recibe dos parámetros:
// state: el estado actual (si no existe, se inicializa con authData en null)
// action: la acción que queremos realizar
const authReducer = (state = { authData: null }, action) => { // Utilizamos parámetros por defecto (state = { authData: null }) para inicializar el estado
    // Usamos un switch para evaluar qué tipo de acción queremos realizar
    switch (action.type) {
        case AUTH:
            // Esta es la acción que se ejecuta cuando un usuario se autentica
            // ya sea por inicio de sesión o registro
            
            // Primero, guardamos la información del usuario en localStorage
            // Esto es importante porque nos permite mantener la sesión activa
            // incluso si el usuario recarga la página
            // Usamos JSON.stringify porque localStorage solo almacena strings
            localStorage.setItem('profile', JSON.stringify({ ...action?.data })); // // El operador spread {...action?.data} crea una copia superficial del objeto
            // El operador ?. (optional chaining) previene errores si action.data es undefined
            
            // Luego actualizamos nuestro estado con la información del usuario
            // El spread operator (...) nos permite mantener cualquier otra
            // información que pudiera existir en el estado
            // {...state} crea una copia del estado actual
           // authData: action?.data sobrescribe la propiedad authData
            return { ...state, authData: action?.data };
            
        case LOGOUT:
            // Esta acción se ejecuta cuando el usuario cierra sesión
            // Necesitamos hacer dos cosas importantes:
            
            // 1. Limpiamos completamente localStorage
            // Esto elimina toda la información de la sesión del usuario
            localStorage.clear();
            
            // 2. Reseteamos el estado de autenticación a null
            // Esto hace que la aplicación vuelva a su estado inicial
            return { ...state, authData: null }; // / Mantenemos la estructura del estado pero establecemos authData en null
            
        case UPDATE_PROFILE:
            // Esta acción se ejecuta cuando el usuario actualiza su perfil
            // Es un poco más compleja porque necesitamos combinar la información
            // existente con la nueva información
            
            // Creamos un nuevo objeto que combina la información actual
            // con la nueva información del perfil
            const updatedProfile = {
                ...state.authData, // Spread del estado actual (...state.authData)
                // Anidación de result con spread de datos existentes y nuevos
                result: { ...state.authData?.result, // Datos existentes del perfil
                    ...action.data.result } // Nuevos datos del perfil
            };
            
            // Actualizamos localStorage con el perfil actualizado
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
            
            // Actualizamos el estado con el nuevo perfil
            return { ...state, authData: updatedProfile };
            
        default:
            // Verificamos si existe un perfil guardado en localStorage
            const profile = localStorage.getItem('profile'); // Intentamos obtener el perfil guardado en localStorage
            
            // Si existe un perfil en localStorage y no tenemos datos de autenticación
            // en el estado, actualizamos el estado con la información guardada
            // Parseamos el string JSON a objeto JavaScript
            // Actualizamos el estado con los datos recuperados
            if (profile && !state.authData) {
                return { ...state, authData: JSON.parse(profile) };
            }
            
            // Si no se cumple ninguna de las condiciones anteriores
            // simplemente devolvemos el estado sin cambios
            return state;
    }
};

// Exportamos nuestro reducer para poder utilizarlo en la configuración
// de nuestro store de Redux
export default authReducer;



// Notitas:
//  Siempre creamos nuevos objetos en lugar de modificar el estado directamente
// El estado tiene una estructura: { authData: {...} }
// authData puede ser null o un objeto con datos del usuario