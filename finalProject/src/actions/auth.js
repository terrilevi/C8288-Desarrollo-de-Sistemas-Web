// Primero realizamos nuestras importaciones necesarias para eso necesitamos:

// Importar AUTH y UPDATE-PROFILE que son "action type constants"
// Estas constantes definen el tipo de acciones que serán despachadas.
import { AUTH, UPDATE_PROFILE } from '../constants/actionTypes';
// Tambien necesitamos importar todas las exportaciones de api/index.js
// como api, para poder usar las funciones API como api.signIn...
import * as api from '../api/index.js';
// Importamos el getPosts "action creator" de posts (action file) para poder refrescar los posts despues
// de actualizar nuestro nickname de perfil.
import { getPosts } from './posts';


// Creamos nuestro action creators, que son solo funciones que crean 
// y retornan un objeto (action objects), o tambien pueden retornan funciones (para manejar operaciones asincronas como API calls)


// Nuestro primer action creator lo exportamos y es una funcion asincrona
// lamada signin, este action creator acepta formData y history.
// Esta funcion por ejemplo retorna otra función que recibe dispatch como
// argumento (eso nos permite realizar operacion asincronas y despachar acciones) 
export const signin = (formData, history) => async (dispatch) => {
    // Como es una función asíncrona abrimos un bloque try 
    // Se realiza un API call al server usando api.signIn, pasandole
    // formData. Y usamos await para pausar la ejecución hasta que la
    // promesa se resuelva.
    // api.signIn(formData) es un API call definida en api/index.js
    // que envia un POST request a /user/signin endpoint con el email del usuario 
    // y la contraseña.
    // La respuesta del server es deestructurada para obtener el data object, que
    // obtiene la información del usuario y un JWT token.
  try { 
    const { data } = await api.signIn(formData); 
    dispatch({ type: AUTH, data }); // Al usar dispatch, despachamos la action tipo AUTH con el payload data.
    // esta accion será manejada por el auth reducer para actualizar el estado de la
    // autenticación en el Redux store.
    history.push('/'); // Tambien usamos esta línea para hacer que el usuario vaya al home page despues de un login correcto.
    
  } catch (error) { // este bloque catch es para capturar algun error si ocurriese en la llamada API y ese error se muestra en la consola.
    console.log(error);
  }
};

// Pequeño resumen del signin function:
// Esta funcion tiene como objetivo inicial autenticar al usuario mediante el envio de credenciales
// al backend, recibir un token del server (backend) y actualizando eso en el Redux store con user "data"





// Nuestro segundo action creator es similar al signin, pero ahora es el registro de usuario
// Usamos un action creator asíncrono, que hace una llamada api a api.signUp(formData)
// Despacha la accion AUTH con la data recibida y luego hace que el usuario
// navegue al home page. Si existe algun error con llamada API, entonces captura el error y lo muestra en la consola.
// Cuando usa api.signUp envia un POST request /user/signup.

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

// Pequeño resumen del signup function:
// Esta funcion tiene como objetivo registrar un nuevo usuario mediante el envio de informacion
// al server, recibe un token y lo actualiza al Redux Store. Llama al api.signUp, despacha AUTH action
// y Navega al usuario usando history.




// Nuestro tercer action creator es updateProfile.
// Exportamos un async action creator llamado updateProfile. Este acepta userData y history

export const updateProfile = (userData, history) => async (dispatch) => {
  try {
    // Realiza un API call a api.updateProfile(userData). api.updateProfile envia un PATCH
    // request a /user/profile con el perfil actualizado ( que solo es el nuevo name )
    const { data } = await api.updateProfile(userData);
    dispatch({ type: UPDATE_PROFILE, data });// Despacha un action de tipo UPDATE_PROFILE con el payload data, para poder
    // actualizar el perfil en el Redux Store y en el local storage.
    dispatch(getPosts()); // Tambien despacha el getPosts actions para refrescar los posts. 
    // Luego redirige al usuario al home page y si hay algun error lo muestra en la consola.
    history.push('/');
  } catch (error) {
    console.error('Hay un error cuando se intenta actualizar el nombre del usuario:', error);
  }
};

// Pequeño resumen del updateProfile function:
// Esta funcion tiene como objetivo updatear el perfil del usuario ( solo el name ). Llamando al api.updateProfile, despacha UPDATE_PROFILE
// actioni, tambien despacha getPosts action y navega al usuario usando history.

