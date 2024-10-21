# ¿Qué aplicación crearé?

Esta una app simplificada de gestión de eventos, con este app el usuario, en tiempo real, puede: 

- Crear nuevas eventos: el usuario puede ingresar los detalles como titulo, descripcion, fecha, ubicacion 
- Editar eventos existentes
- Eliminar eventos
- Ver la lista de eventos
![alt text](simApp2.png)

Tambien, la app mostrará mensajes de confirmacion al crear, editar o eliminar algun evento  y si algun o todos los campos estan vacios, tambien se mostrará un mensaje de advertencia.


# Instrucciones del proyecto:

### 1. Crear un nuevo proyecto React con JS, para eso usamos el siguiente comando: 

- npx create-react-app gestor-eventos 

### 2. Como yo cree el directorio `gestor-tareas`, debo navegar hasta ese directorio, para eso usar:

- cd gestor-eventos


### 3. Inicialmente, lo que realizo es crear los archivos que usaré dentro de `src`, como:

- eventoPuro.js
- eventManager.js
- eventAdd.js
- eventList.js
- eventEdit.js
- eventContext.js
- eventOper.js

### 4. Implementado el GENERADOR DE TAREAS ALEATORIAS.

Ahora sí, implementaremos la clase Evento. que define la estructura de un evento individual. Implementamos getTitulo y setTitulo para acceder y modificar el titulo del evento, aplicando encapsulacion. y por ultimo, exportamos la clase evento para usarla en otros archivos.

```javascript
class Evento {
  constructor(id, titulo, descripcion, fecha, ubicacion) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.ubicacion = ubicacion;
  }

  // Métodos de acceso (encapsulación)
  getTitulo() {
    return this.titulo;
  }

  setTitulo(nuevoTitulo) {
    this.titulo = nuevoTitulo;
  }

  // aqui puedo regresar para añadir más métodos de acceso si kiero
}

export default Evento;
```

### 5. Implementando el Administrador de Eventos (eventContext.js y eventManager.js)

Ahora, abramos eventContext.js que es nuestro core; maneja el estado global de toda nuestra aplicación, utiliza el Context API y useReducer de React.

## Para eventContext,js:

Primero, importamos las funciones necesarias de React y nuestra clase Evento:

```javascript
import React, { createContext, useContext, useReducer } from 'react';
import Evento from './eventoPuro';
```
Definimos initialState, que contiene un array vacío de eventos.
```javascript
const initialState = {
  eventos: [],
};
```
Creamos un objeto actionTypes que enumera las acciones que podemos despachar.
```javascript
const actionTypes = {
  AGREGAR_EVENTO: 'AGREGAR_EVENTO',
  EDITAR_EVENTO: 'EDITAR_EVENTO',
  ELIMINAR_EVENTO: 'ELIMINAR_EVENTO',
  CARGAR_EVENTOS: 'CARGAR_EVENTOS',
};
```

Creamos el contexto, que contiene el estado actual y la función dispatch para poder actualizar ese estado:
```javascript
const EventContext = createContext();
```
Ahora, creamos el Reducer, que es la función que define cómo debe cambiar el estado dependiendo de la acción que se envíe (dispatch):

AGREGAR_EVENTO: añade un nuevo evento al array de eventos, la acción contiene el nuevo evento en action.payload.
EDITAR_EVENTO: actualiza un evento existente en el array. Busca el evento por su id y lo reemplaza con el evento actualizado que viene en action.payload.
ELIMINAR_EVENTO: elimina un evento del array filtrando aquellos que no coincidan con el id proporcionado en action.payload.
CARGAR_EVENTOS: eeemplaza el array de eventos con el array proporcionado en action.payload(que fue usado para cargar eventos iniciales)
default: Si la acción no coincide con ningún caso entonces devuelve el estado actual sin cambios.
```javascript
const eventReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AGREGAR_EVENTO:
      return {
        ...state,
        eventos: [...state.eventos, action.payload],
      };

    case actionTypes.EDITAR_EVENTO:
      return {
        ...state,
        eventos: state.eventos.map((evento) =>
          evento.id === action.payload.id ? action.payload : evento
        ),
      };

    case actionTypes.ELIMINAR_EVENTO:
      return {
        ...state,
        eventos: state.eventos.filter((evento) => evento.id !== action.payload),
      };

    case actionTypes.CARGAR_EVENTOS:
      return {
        ...state,
        eventos: action.payload,
      };

    default:
      return state;
  }
};
```

Ahora, creamos el proveedor de contexto EventProvider, que es el componente que proporciona el contexto a todos los componentes hijos:
aqui usamos useReducer para manejar el estado state y la función dispatch usando nuestro eventReducer y el initialState. Y el eventContext.Provider proporciona el state y el dispatch a todos los comps hijos que esten envueltos por EventProvider:

```javascript
export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
```

ya finalmente, creamos nuestro hook personalizado useEventContext para que otros componentes puedan acceder fácilmente al estado y dispatch sin tener que usar useContext directamente, el useEventContext permite acceder al state y dispatch desde cualquier componente que este dentro de eventProvider, y si useEventContext se utiliza fuera del EventProvider se arroja un error.

```javascript
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext debe ser usado dentro deun EventProvider');
  }
  return context;
};
```

## Para eventManager.js:

Creamos eventManager.js que simular operaciones asincronas utilizando promesa, esto permite simular llamadas a un api.
Lo que hacemos es crear nuestra cons cargarEventos que simula una llamada asincrona que devuelve una lista de eventos despues de 1 seg, en este caso, usamos setTimeout y un promise para simular un pequeño retraso. Tambien,creamos algunos eventos de ejemplo utilizando la clase Evento. Simulamos guardar un evento y devuelve el evento guardado despues de 0.5 segundos (para que cargue rapidamente).
Ya al final, solo exportamos eventManager para usarlo en otros archivos


// eventManager.js

import Evento from './eventoPuro';

const eventManager = {
  cargarEventos: () => {
    // simula una llamada asíncrona para cargar eventos
    return new Promise((resolve) => {
      setTimeout(() => {
        const eventosIniciales = [
          new Evento(1, 'Concierto de Rock', 'Concierto de shakira', '2025-16-01', 'Estadio'),
          new Evento(2, 'examen de admision', 'UPCH', '2013-13-15', 'UPCH'),
        ];
        resolve(eventosIniciales);
      }, 1000);
    });
  },

  guardarEvento: (evento) => {
    // simula una llamada asíncrona para guardar un evento
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(evento);
      }, 500);
    });
  },
};

export default eventManager;


### 5. Implementando el Administrador de Eventos (eventContext.js y eventManager.js)
