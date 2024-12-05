// Primero, importamos combineReducers de redux que es una función nos permitirá juntar todos nuestros reducers en uno solo
import { combineReducers } from 'redux';

// Aquí realizamos la importación de nuestros reducers
// Cuando hacemos './posts', './auth', './friends' estamos yendo a buscar el 'export default' de cada archivo
// Por ejemplo, en auth.js tenemos 'export default authReducer'
// Entonces 'auth' será igual a todo el contenido de authReducer
import posts from './posts';     // es como decir: posts = postsReducer (el export default de posts.js)
import auth from './auth';       // auth = authReducer (el export default de auth.js)
import friends from './friends'; // friends = friendsReducer (el export default de friends.js)


// Ahora usamos combineReducers y le pasamos un objeto
export const reducers = combineReducers({
   // Esta sintaxis: posts, auth, friends es lo mismo que escribir:
   // posts: posts,
   // auth: auth,
   // friends: friends
   // - La parte izquierda (posts:) va a ser el nombre en nuestro ESTADO
   // - La parte derecha (posts) es el reducer que importamos arriba
   
   posts,    // Es como decir posts: postsReducer
   auth,     // Es como decir auth: authReducer
   friends   // Es como decir friends: friendsReducer
});

// Entonces, cuando en otro lado de nuestra app hacemos
// dispatch({ type: 'AUTH', data: userData })

// Redux mira este objeto que creamos:
// {
//     posts: postsReducer,
//     auth: authReducer,     <-- Ve que 'auth' tiene authReducer
//     friends: friendsReducer
// }

// Y sabe que debe enviar la acción 'AUTH' al authReducer
// porque en la configuración de arriba dijimos que 
// 'auth' será manejado por authReducer

// Al final, nuestro estado global se verá así:
// {
//     posts: {
//         // Aquí estará todo lo que maneje postsReducer
//     },
//     auth: {
//         // Aquí estará todo lo que maneje authReducer
//     },
//     friends: {
//         // Aquí estará todo lo que maneje friendsReducer
//     }
// }

// Y cuando queramos acceder al estado en cualquier componente:
// const auth = useSelector(state => state.auth)
// Podemos acceder porque 'auth' es el nombre que definimos aquí :3