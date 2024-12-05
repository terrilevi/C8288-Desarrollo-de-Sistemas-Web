// Este es un action creator file que define las acciones relacionadas con la autenticacion de usuarios. 
// Y maneja 3 operaciones fundamentales
// - Inicio de sesion y Registro de usuarios
// - Actualizacion de perfil


// Importar AUTH y UPDATE-PROFILE que son "action type constants" ( constantes que definen los tipos de acciones)
// Estas constantes definen el tipo de acciones que serán despachadas.
import { AUTH, UPDATE_PROFILE } from '../constants/actionTypes';


// Tambien necesitamos importar todas las exportaciones de api/index.js
// como api, para poder usar las funciones API como api.signIn...
// En realidad estamos importando todas las funciones de la API como un objeto llamado api
import * as api from '../api/index.js';


// Importamos el getPosts "action creator" de posts (action file) para poder refrescar los posts despues
// de actualizar nuestro nickname de perfil.
import { getPosts } from './posts';



// Creamos nuestros action creators, que son solo funciones que crean 
// y retornan un objeto (action objects), o tambien pueden retornan funciones 
// (para manejar operaciones asincronas como API calls)



// Es una función asíncrona que retorna otra función (thunk pattern)
// Recibe formData (credenciales) y history (para navegación)
// Hace una llamada API a signIn con los datos del formulario
// Despacha una acción AUTH con la respuesta
// Redirige al usuario a la página principal
// Retorna los datos para uso posterior (como conectar el socket)
export const signin = (formData, history) => async (dispatch) => {
  try { 
    const { data } = await api.signIn(formData); 
    dispatch({ type: AUTH, data });
    history.push('/');
    return { data };
  } catch (error) {
    console.log(error);
  }
};
// Flujo completo:
    // Todo comienza cuando un usuario llena el formulario de login en el componente Auth.js
    // Al hacer submit, el componente llama a handleSubmit que dispara dispatch(signin(formData, history))
// El action creator signin recibe:
    // formData: objeto con {email, password}
    // history: objeto para navegación programática
// Dentro del action creator:
    // Se hace una llamada API POST a /user/signin con las credenciales
    // El backend valida las credenciales y devuelve datos del usuario + token JWT
    // Redux dispatch envía estos datos al reducer auth.js con type: 'AUTH'
    // El reducer almacena los datos en el estado global y localStorage
    // Se redirecciona al usuario a la página principal (/)
    // Se retorna {data} que contiene el ID del usuario para la conexión del socket
// Efectos posteriores:
    // El usuario queda autenticado en la aplicación
    // El token JWT se usa para futuras peticiones
    // Los componentes pueden acceder a la información del usuario desde Redux








// Nuestro segundo action creator es similar al signin, pero ahora es el registro de usuario
// Usamos un action creator asíncrono, que hace una llamada api a api.signUp(formData)
// Despacha la accion AUTH con la data recibida y luego hace que el usuario
// navegue al home page y retorna datos. 
// Si existe algun error con llamada API, entonces captura el error y lo muestra en la consola.
// Cuando usa api.signUp envia un POST request /user/signup.

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push('/');
    return { data };
  } catch (error) {
    console.log(error);
  }
};

// Flujo completo:
    // Inicia cuando un usuario completa el formulario de registro en Auth.js
    // Al hacer submit, se llama a handleSubmit que dispara dispatch(signup(formData, history))
    // El action creator signup recibe:
    // formData: objeto con {firstName, lastName, email, password, confirmPassword}
    // history: objeto para navegación
// Dentro del action creator:
    // Se hace una llamada API POST a /user/signup con los datos del usuario
    // El backend valida los datos, crea el usuario y genera un token JWT
    // Redux dispatch envía la respuesta al reducer con type: 'AUTH'
    // El reducer almacena los datos en el estado y localStorage
    // Se redirecciona al usuario a la página principal
    // Se retorna {data} para la conexión del socket
// Efectos posteriores:
    // Se crea una nueva cuenta de usuario
    // El usuario queda automáticamente autenticado
    // El sistema está listo para manejar sus interacciones



// Nuestro tercer action creator maneja la actualización del perfil:
// Llama a api.updateProfile con los nuevos datos
// Despacha UPDATE_PROFILE con la respuesta
// Refresca los posts para actualizar el nombre en todos lados
// Redirige al usuario a la página principal
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

// Flujo completo:
    // Se inicia cuando un usuario modifica su nombre en el componente Profile.js
    // Al hacer submit, se dispara dispatch(updateProfile({name}, history))
    // El action creator updateProfile recibe:
    // userData: objeto con {name} (nuevo nombre)
    // history: objeto para navegación
// Dentro del action creator:
    // Se hace una llamada API PATCH a /user/profile con el nuevo nombre
    // El backend actualiza el nombre en la colección de usuarios
    // También actualiza el nombre en todos los posts del usuario
    // Redux dispatch envía los datos actualizados al reducer con type: 'UPDATE_PROFILE'
    // Se dispara getPosts() para refrescar todos los posts con el nuevo nombre
    // Se redirecciona al usuario a la página principal
// Efectos posteriores:
    // El perfil del usuario se actualiza en la base de datos
    // El nombre se actualiza en todos los posts existentes
    // La interfaz se refresca mostrando el nuevo nombre en todas partes
    // Se genera un nuevo token JWT con la información actualizada
