# ¿Qué aplicación crearé?

Esta una app simplificada de gestión de eventos, con este app el usuario, en tiempo real, puede: 

- Crear nuevas eventos: el usuario puede ingresar los detalles como titulo, descripcion, fecha, ubicacion 
- Editar eventos existentes
- Eliminar eventos
- Ver la lista de eventos


Tambien, la app mostrará mensajes de confirmacion al crear, editar o eliminar algun evento  y si algun o todos los campos estan vacios, tambien se mostrará un mensaje de advertencia.


# Instrucciones del proyecto:

### 1. Crear un nuevo proyecto React con JS, para eso usamos el siguiente comando: 

- npx create-react-app gestor-eventos 

### 2. Como yo cree el directorio `gestor-eventos`, debo navegar hasta ese directorio, para eso usar:

- cd gestor-eventos


### 3. Inicialmente, lo que realizo es crear los archivos que usaré dentro de `src`, como:

- eventoPuro.js
- eventManager.js
- eventAdd.js
- eventList.js
- eventEdit.js
- eventContext.js
- eventOper.js

### 4. Implementado la clase EVENT en eventoPuro.js

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



```javascript
import Evento from './eventoPuro';

const eventManager = {
  cargarEventos: () => {
    // simula una llamada asíncrona para cargar eventos
    return new Promise((resolve) => {
      setTimeout(() => {
        const eventosIniciales = [
          new Evento(1, 'Concierto de shakira', 'Shakira en peru', '2025-16-01', 'Estadio'),
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
```

### 6. MODIFICANDO APP.JS PARA CARGAR EVENTOS INICIALES CON USEEFFECT Y USESTATE en App.js

En el componente principal App.js, utilizamos useEffect para cargar los eventos iniciales cuando la aplicación se monta. y tambien usaremos EventProvider para proporcionar el contexto a los componentes hijos.

Primero importamos todos los componentes y contextos necesarios:
```javascript
import React, { useEffect } from 'react';
import { EventProvider, useEventContext } from './eventContext';
import EventAdd from './eventAdd';
import EventList from './eventList';
import EventManager from './eventManager';
```

Creamos el componente App que envuelve todo en EventProvider:
```javascript
const App = () => {
  return (
    <EventProvider>
      <div className="App">
        <h1>Gestor de Eventos</h1>
        <EventLoader />
        <EventAdd />
        <EventList />
      </div>
    </EventProvider>
  );
};
```
Creamos EventLoader para hacer la carga eventos iniciales usando UseEffect:
EventLoader es un componente que esta usando useEffect para cargar los eventos al montar el componente. y usamos dispatch para enviar la accion LOAD_EVENTS al reducer y actualizar el estado global con los eventos cargados. Vemos que tambien hay un array de dependencias [dispatch] que asegura que el efecto se ejecute solo una vez, ahora eventLoader no renderiza nada por eso eventLoader retorna null.
```javascript
const EventLoader = () => {
  const { dispatch } = useEventContext();

  useEffect(() => {
    EventManager.loadEvents().then((events) => {
      dispatch({ type: 'CARGAR_EVENTOS', payload: events });
    });
  }, [dispatch]);

  return null;
};

export default App;
```

### 7. IMPLEMENTANDO EL COMPONENTE PARA AÑADIR EVENTOS EN eventAdd.js:
Ahora, abrimos eventAdd.js para crear el formulario que permitirá al usuario añadir nuevos eventos. Usaremos el estado local para almacenar temporalmente los detalles del evento antes de enviarlos al estado global mediante el dispatch. Hacemos esto porque el estado global (que maneja la lista completa de eventos) no necesita actualizarse con cada letra que el usuario escribe.
Primero, importamos las funciones necesarias y el contexto de eventos:
```javascript
import React, { useState, useRef } from 'react';
import { useEventContext } from './eventContext';
import eventManager from './eventManager';
import Evento from './eventoPuro';
```
Creamos nuestro componente EventAdd y definimos los estados locales para cada campo del formulario,
en este caso, title, description, date, location almacenan los valores que el usuario ingresa en el formulario.
en el const inputRef usamos useRef para volver a enfocar el primer campo después de añadir un evento.
y en dispatch obtenemos la función dispatch del contexto de eventos para poder enviar acciones al reducer.
```javascript
const EventAdd = () => {
  const { dispatch } = useEventContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const inputRef = useRef(null);
```
Definimos la función handleSubmit para manejar el envío del formulario:

verificamos que todos los campos estén llenos; si no, mostramos una alerta simple.
creamos la constante newEvent que es una instancia de Evento con los datos proporcionados.
y simulamos guardar el evento, en este caso, usamos eventManager.guardarEvento para simular una llamada asíncrona que guarda el evento.
Después de guardar el evento, despachamos la acción AGREGAR_EVENTO al reducer para actualizar el estado global.
Limpiamos el formulario, es decir que reiniciamos los estados locales y "enfocamos: el primer campo para que se pueda inputar otros eventos:
```javascript
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!title || !description || !date || !location) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const newEvent = new Evento(Date.now(), title, description, date, location);

    // Simulamos guardar el evento
    eventManager.guardarEvento(newEvent).then((evento) => {
      dispatch({ type: 'AGREGAR_EVENTO', payload: evento });
      alert('Evento agregado exitosamente');
      // Limpiamos el formulario
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      inputRef.current.focus();
    });
  };
```

El ultimo codigo de este componente es el renderizado, es basicamente un formulario, cada formulario esta linked a su estado local correspondiente, el primer campo tiene una ref para poder enfocarlo despues de agregar un eventos. y tambien hay un boton de envio, que ejecutra handleSubmit.
```javascript
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ubicación"
      />
      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventAdd;
```
### 8. IMPLEMENTANDO EL COMPONENTE PARA MOSTRAR Y EDITAR EVENTOS (eventList.js):
En eventList.js, vamos a mostrar la lista de eventos y proporcionar opciones para editar o eliminar cada evento. También implementaremos la capacidad de editar un evento que ya esta en pantalla(los cargados mediante operaciones async)
```javascript
import React, { useState, useCallback } from 'react';
import { useEventContext } from './eventContext';
import EventEdit from './eventEdit';
```
Creamos el componente EventList y definimos el estado local, en el cual editingEventId es el estado nos permite saber cuál evento está siendo editado actualmente.
Y en state, dispatch obtenemos el estado global y la función dispatch del contexto de eventos.
```javascript
const EventList = () => {
  const { state, dispatch } = useEventContext();
  const [editingEventId, setEditingEventId] = useState(null);
```
Ahora definimos las funciones handleDelete, handleEdit y handleSave:
handleDelete es el que simula la eliminación de un evento y despacha la acción ELIMINAR_EVENTO al reducer.
handleEdit es el que actualiza editingEventId con el ID del evento que queremos editar.
handleSave es el que simula guardar los cambios de un evento editado y despacha la acción EDITAR_EVENTO al reducer.
```javascript
  const handleDelete = useCallback((id) => {
    // Simulamos la eliminación
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    }).then(() => {
      dispatch({ type: 'ELIMINAR_EVENTO', payload: id });
      alert('Evento eliminado exitosamente');
    });
  }, [dispatch]);

  const handleEdit = (evento) => {
    setEditingEventId(evento.id);
  };

  const handleSave = (updatedEvent) => {
    // Simulamos guardar cambios
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedEvent);
      }, 500);
    }).then((evento) => {
      dispatch({ type: 'EDITAR_EVENTO', payload: evento });
      alert('Evento actualizado exitosamente');
      setEditingEventId(null);
    });
  };
```
ahora lo ultimo que queda es renderizar la lista de eventos, si el ID del evento coincide con editingEventId, mostramos el componente EventEdit, de lo contrario, mostramos los detalles del evento. tambien agregue botones para editar y eliminar cada evento:
```javascript
  return (
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {state.eventos.map((evento) =>
          editingEventId === evento.id ? (
            <EventEdit
              key={evento.id}
              evento={evento}
              onSave={handleSave}
              onCancel={() => setEditingEventId(null)}
            />
          ) : (
            <li key={evento.id}>
              <h3>{evento.titulo}</h3>
              <p>{evento.descripcion}</p>
              <p>Fecha: {evento.fecha}</p>
              <p>Ubicación: {evento.ubicacion}</p>
              <button onClick={() => handleEdit(evento)}>Editar</button>
              <button onClick={() => handleDelete(evento.id)}>Eliminar</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default EventList;
```

### 9. IMPLEMENTADO EL COMPONENTE PARA EDITAR EVENTOS (eventEdit.js):
Ahora en esta parte, creamos el formulario que permite al usuairo editar los detalles de un evento existente. 
Importamos useState para manejar el estado local:
```javascript
import React, { useState } from 'react';
```
Creamos el componente EventEdit y definimos los estados locales, en este caso estamos inicializando los estados locales con los valores actuales del evento que se está editando.
onSave, onCancel son funciones que recibimos como props para manejar la acción de guardar o cancelar la edición.
```javascript
const EventEdit = ({ evento, onSave, onCancel }) => {
  const [title, setTitle] = useState(evento.titulo);
  const [description, setDescription] = useState(evento.descripcion);
  const [date, setDate] = useState(evento.fecha);
  const [location, setLocation] = useState(evento.ubicacion);
```
Definimos la función handleSubmit para manejar el envío del formulario, en este caso nuestra validacion es asegurarnos que todos los campos estén llenos. tambien creamos un objeto llamado updatedEvent con los datos actualizados del evento.
y llamamos a la funcion onSave pasando el evento actualizado.
```javascript
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !date || !location) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const updatedEvent = {
      ...evento,
      titulo: title,
      descripcion: description,
      fecha: date,
      ubicacion: location,
    };

    onSave(updatedEvent);
  };
```
Por ultimo, esta es la parte de renderizado nuevamente, cada campo del formulario esta vinculado a su estado local y proporcionamos botones(optimizar despues pls):
```javascript
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ubicación"
      />
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default EventEdit;
```
### 10. CREANDO UN HOOK PERSONALIZADO PARA OPERACIONES DE EVENTOS (eventOper.js)
Ahora, crearemos eventOper.js para manejar las operaciones relacionadas con eventos y reutilizar la lógica en diferentes componentes.
Importamos el contexto de eventos y el eventManager:
```javascript
import { useEventContext } from './eventContext';
import eventManager from './eventManager';
```
Creamos el hook personalizado useEventOperations, donde loadEvents carga los eventos iniciales y actualiza el estado global, donde saveEvent guarda un nuevo evento y lo añade al estado global.
```javascript
const useEventOperations = () => {
  const { dispatch } = useEventContext();

  const loadEvents = () => {
    return eventManager.cargarEventos().then((eventos) => {
      dispatch({ type: 'CARGAR_EVENTOS', payload: eventos });
    });
  };

  const saveEvent = (evento) => {
    return eventManager.guardarEvento(evento).then((eventoGuardado) => {
      dispatch({ type: 'AGREGAR_EVENTO', payload: eventoGuardado });
    });
  };

  // Podemos añadir más operaciones si es que kiero

  return {
    loadEvents,
    saveEvent,
  };
};

export default useEventOperations;
```
### 11. EJECUTANDO LA APP:
- npm start
- http://localhost:3000

