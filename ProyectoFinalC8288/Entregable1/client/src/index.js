import React from 'react';                
import ReactDOM from 'react-dom';         // Necesario para renderizar en el DOM

// Importaciones relacionadas con Redux
import { Provider } from 'react-redux';   
import { createStore, applyMiddleware, compose } from 'redux';  
import thunk from 'redux-thunk';          

// Importaciones del app
import { reducers } from './reducers';    // Nuestros reducers combinados
import App from './App';                  // Componente principal
import './index.css';                     // Estilos globales

// CONFIGURACIÓN DEL STORE DE REDUX
const store = createStore(
   reducers,                       // Todos nuestros reducers combinados
   compose(applyMiddleware(thunk)) // Configuración de middleware
);

// RENDERIZADO DE LA APLICACIÓN
ReactDOM.render(
   // Provider envuelve toda nuestra app
   // hace que el store
   // esté disponible para todos los componentes
   <Provider store={store}>
       {/* App es nuestro componente principal */}
       <App />
   </Provider>,
   // document.getElementById('root') le dice a React
   // dónde debe montar nuestra aplicación en el HTML
   document.getElementById('root'),
);








// Notas:

// // Para recordar porque usamos thunk:
// // Con thunk, ahora podemos hacer esto en nuestras acciones:
// export const getPosts = () => async (dispatch) => {
//   try {
//       // 1. Podemos hacer la llamada API
//       const { data } = await axios.get('/posts');
      
//       // 2. Y luego despachar el resultado
//       dispatch({ type: 'FETCH_ALL', payload: data });
//   } catch (error) {
//       console.log(error);
//   }
// };


// ESTRUCTURA DEL STORE:
// {
//     auth: {
//         // Información del usuario logueado
//     },
//     posts: [
//         // Array de posts
//     ],
//     friends: {
//         // Información de amigos
//     }
// }

// Notas importantes: 
// Un middleware es como un "intermediario" que se sitúa entre el dispatch 
// de una acción y el momento en que esta acción llega al reducer.
// Acción -> [Middleware] -> Reducer -> Store

// Si es alguien que necesita hacer algo antes (función asíncrona),
//    le permite hacerlo y luego entrar(DESPACHAR)


