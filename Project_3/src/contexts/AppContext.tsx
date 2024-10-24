// Importamos nuestras funcion de react para crear contexto,
// que serian createContext para ..., useContext para ... y useReducer para...
import React, { createContext, useContext, useReducer } from "react";
// Luego importamos nuestros tipos que hicimos en types.ts
import { AppState, AppAction } from "../types/types";

// Creamos nuestro contexto
// Esta constante es igual a una función de React llamada createContext
// Esta función crea un objeto de contexto, este objeto tiene un Provider y un Consumer,
// pero nosotros usaremos useContext en lugar del Consumer, ¿por qué?
// useContext es un hook más moderno y limpio que el Consumer, mientras que Consumer requiere
// un render prop pattern

// createContext es una función genérica que necesita saber exactamente
// qué tipo de datos contendrá, ¿por qué?
// Porque TypeScript necesita validar en tiempo de compilación que todos los componentes
// que consuman el contexto estén usando los datos correctamente. Si no especificamos
// el tipo, TypeScript asumirá 'any' y perderemos la seguridad de tipos.

// createContext<TIPODELCONTEXTO>(valorInicial)
// Dentro de los <> especificamos tipos genéricos,
// cuando usemos contexto, que será cuando cualquier componente hijo necesite
// acceder al estado global o despache acciones, TypeScript sabrá exactamente qué contiene
// y nos dará autocompletado y validación de tipos.

// Estos tipos genéricos se leen como puede ser esto | o puede ser esto, en este caso,
// puede ser un objeto con dos propiedades:
// state, que contiene el estado actual de la aplicación, de tipo AppState
// (que es un tipo que definimos en type.ts), es un objeto inmutable, o sea
// solo se puede cambiar a través del dispatch,
// La inmutabilidad es crucial en React porque:
// 1. React compara referencias para determinar si debe re-renderizar
// 2. Nos permite tener un historial claro de cambios
// 3. Previene bugs por mutaciones accidentales

// Ahora sí tenemos al dispatch que es de tipo React.Dispatch, es una función de tipo React
// Es una función que acepta acciones, pero qué acciones y mejor dicho,
// como estamos definiendo nuestros tipos genéricos, acepta las acciones que
// definimos en type.ts (ADD_SONG, ADD_GENRE, ADD_REACTION)
// El dispatch también lo usamos para enviar instrucciones al reducer, eso significa que
// cuando un componente llame a dispatch con una acción, el reducer procesará esa acción
// y actualizará el estado global de manera predecible y centralizada.

// El valor inicial que pasamos a createContext es undefined porque el contexto real
// se establecerá cuando el Provider envuelva la aplicación, lo que significa que:
// En palabras entendibles: El contexto está vacío hasta que el Provider lo inicialice
// con valores reales al arrancar la app.
// En palabras técnicas: El Provider inyectará el estado inicial y la función dispatch
// en el árbol de componentes cuando React monte el componente AppProvider.

// Necesitamos un valor inicial aunque nunca lo usaremos directamente, también debe coincidir
// con uno de los tipos del union type creado.
// Esto es un requerimiento de TypeScript para garantizar type safety en todos los casos posibles,
// incluso antes de que el Provider inicialice el contexto.

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<AppAction>;
    }
  | undefined
>(undefined);

// Luego definimos nuestro estado inicial, debe cumplor con el tipo AppState
// Es el punto de partida de nuestra app
// songs inicia como un array vacio pq aun n ohay canciones
// currentUser lo iniciamos con TestUser, como un valor por defecto.
// thrthrthdrthsrhdtrhdrthdrthdr una duda que se me provoca, es que entiendo que no hay canciones, pero eso solo es para el componente que meustra la cancion, pero para el formulario?

const initialState: AppState = {
  songs: [], // Array vacío, no hay canciones todavía
  currentUser: "TestUser",
};
// Creamos nuestro reducer
// Definición del reducer:
// 1. Es una función que toma dos parámetros y retorna un AppState
// 2. El tipado (state: AppState, action: AppAction): AppState significa:
//    - Primer parámetro 'state' debe ser de tipo AppState
//    - Segundo parámetro 'action' debe ser de tipo AppAction
//    - La función debe retornar un objeto de tipo AppState
// Es pura porque dado el mismo estado y la misma acción, siempre retorna el mismo resultado
const appReducer = (state: AppState, action: AppAction): AppState => {
  // switch evalúa action.type para determinar qué operación realizar
  // action.type solo puede ser "ADD_SONG", "ADD_GENRE" o "ADD_REACTION"
  // porque así lo definimos en AppAction
  switch (action.type) {
    case "ADD_SONG": // CASO 1: AGREGAR CANCIÓN
      return {
        ...state, // spread operator: copia todas las propiedades del estado actual
        songs: [...state.songs, action.payload], // reemplazamos la propiedad 'songs' con un nuevo array
        // spread operator: copia todas las canciones existentes
        // agrega la nueva canción al final del array, que viene en el payload. que de hecho si es un add_song, ya viene con el payload correcto
      };
    // Caso 2: Queremos agregar un género a una canción existente
    case "ADD_GENRE":
      return {
        ...state, // spread operator: copia el estado actual
        songs: state.songs.map(
          // map crea un nuevo array transformando cada elemento
          (
            song // Transformamos el array de canciones
          ) =>
            // Para cada canción, verificamos si es la que queremos modificar
            // operador ternario: condición ? valor si verdadero : valor si falso
            song.id === action.payload.songId // ¿esta canción es la que buscamos?
              ? // SI: modificamos esta canción
                // Mantenemos todos sus datos
                // spread operator: copia todos los datos
                // reemplazamos el array de géneros
                // spread operator: copia géneros existentes
                // agrega el nuevo género al final
                { ...song, genres: [...song.genres, action.payload.genre] }
              : song // Si no es la canción correcta, la dejamos igual
        ),
      };
    // Caso 3: Queremos agregar una reacción a una canción
    case "ADD_REACTION":
      return {
        ...state, // Mantenemos estado actual
        songs: state.songs.map(
          (
            song // Transformamos canciones
          ) =>
            song.id === action.payload.songId // ¿Es la canción correcta?
              ? {
                  ...song, // Mantenemos datos de la canción
                  reactions: {
                    // Pero modificamos sus reacciones
                    ...song.reactions, // Mantenemos reacciones existentes
                    // Incrementamos el contador de la reacción específica
                    // action.payload.reactionType es la key (wantMore, listenedEnjoyed, etc)
                    // Usamos [] porque es una key dinámica (computed property)
                    [action.payload.reactionType]:
                      song.reactions[action.payload.reactionType] + 1,
                  },
                }
              : song // Si no es la canción correcta, la dejamos igual
        ),
      };

    // Caso default: Si recibimos una acción que no reconocemos
    // Retornamos el estado sin cambios
    // Esto es requerido en TypeScript para manejar todos los casos posibles
    default:
      return state;
  }
};

// Creamos nuestro componente funcional, que acepta una prop llamada children de tipo
// reactnode, reactnode es cualquier cosa que react puede renderizar????
// // Con Provider, compartimos un estado global:
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children, //
}) => {
  // useReducer es un hook de React que retorna:
  // - state: el estado actual
  // - dispatch: función para enviar acciones
  // Recibe como argumentos:
  // - appReducer: la función que creamos arriba
  // - initialState: el estado inicial que definimos
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Recordemos que creamos un contexto con createContext
  // AppContext.Provider: componente que provee valores
  // react usa esto para pasar valores
  return (
    // AppContext.Provider guarda value en un sistema interno de react.
    // que lo usaremos asi:
    // estos pueden acceder al value, provider mas cercano es
    // porque literalmente hay un provider que envuelve toda la app
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  // React hace internamente algo como:
  // 1. Mira el árbol de componentes "hacia arriba"
  // 2. Encuentra el primer AppContext.Provider
  // 3. Obtiene su prop 'value'
  // 4. Te devuelve ese value

  // context = { state, dispatch }
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// // 1. Creas el contexto (como una "caja vacía")
// const AppContext = createContext(undefined);

// // 2. El Provider pone algo en esa "caja"
// <AppContext.Provider value={{ state, dispatch }}>
//   {/* todo lo que está aquí puede acceder a la "caja" */}
// </AppContext.Provider>

// // 3. useContext saca lo que hay en la "caja"
// const { state, dispatch } = useContext(AppContext);
