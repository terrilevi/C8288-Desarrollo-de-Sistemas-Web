/*
Este componente es un contenedor que maneja la visualización de todos los posts
en la aplicación. Su función principal es:
1. Obtener la lista de posts desde el estado global de Redux
2. Mostrar un indicador de carga (spinner) mientras no hay posts
3. Renderizar cada post individual usando un componente Post separado
4. Manejar el mapeo eficiente de posts usando keys únicas 

El componente implementa un patrón común en React donde un componente padre (Posts)
maneja una colección de datos y delega la renderización de cada elemento individual
a un componente hijo (Post).
*/
import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
  // Obtenemos los posts del estado global usando useSelector
  // useSelector recibe una función que toma el estado completo como parámetro
  // y retorna la parte del estado que queremos, en este caso state.posts
  // 
  // Por ejemplo, si nuestro estado global es:
  // {
  //   auth: { ... },
  //   posts: [{ id: 1, message: 'Hola' }, { id: 2, message: 'Mundo' }],
  //   friends: { ... }
  // }
  // 
  // Entonces state.posts nos dará el array de posts
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
 
  // Renderizamos nuestro componente
  return (
    // Usamos un operador ternario para renderizado condicional
    // sintax: condición ? (si es verdadera) : (si es falsa)
    // 
    // !posts.length verifica si el array de posts está vacío
    // Si está vacío (!posts.length es true), muestra el CircularProgress
    // Si tiene posts (!posts.length es false), muestra el div con los posts
    !posts.length ? <CircularProgress /> : (
      // El container div que contendrá todos nuestros posts
      // Le aplicamos los estilos definidos en classes.container
      <div className={classes.container}>
        {/* 
          Usamos map para transformar cada post en el array posts
          en un elemento JSX
          
          map es un método de arrays que:
          1. Toma cada elemento del array
          2. Le aplica una función
          3. Retorna un nuevo array con los resultados
          
          Por ejemplo, si posts es:
          [
            { _id: '1', message: 'Hola' },
            { _id: '2', message: 'Mundo' }
          ]
          
          posts.map(post => ...) ejecutará la función para cada post
        */}
        {posts.map((post, index) => (
          // Para cada post, creamos un div contenedor
          // key={post._id} es necesario para que React pueda trackear cada elemento en la lista de forma eficiente
          // Siempre que hagamos .map() en React, necesitamos una key única
          <div key={`${post._id}-${index}`}> 
            {/* 
              Renderizamos el componente Post para cada post
              Le pasamos el post completo como prop
              Esto significa que en el componente Post podremos acceder
              a toda la información del post como props.post
            */}
            <Post post={post} />
          </div>
        ))}
      </div>
    )
  );
 };
 

export default Posts;



