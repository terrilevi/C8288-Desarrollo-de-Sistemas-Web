# ¿Qué aplicación crearé?

Esta una app simplificada de gestión de tareas, con este app el usuario, en tiempo real, puede: 

- Crear nuevas tareas 
- Marcar tareas como completadas
- Eliminar tareas en TaskList
- Filtrar tareas 

Basicamente, es una implementación de CRUD (Create, Read, Update, Delete) que tiene la funcionalidad adicional de filtrado y simulacion de actualizaciones en tiempo real.

## Cumplimiento de requerimientos del ExamenParcial:

Este app responde a los requerimientos proporcionados por el ExamenParcial.

En el REQ1 se menciona **Utiliza los Hooks de React**: En nuestro caso estamos usando todos los Hooks mencionados.

En el REQ2 se menciona **Implementa Hooks personalizados para reutilizar lógica entre componentes**

En el REQ3 se menciona **Gestiona un estado global utilizando useContext y useReducer**

En el REQ4 se menciona **Optimiza el rendimiento de la aplicación utilizando useMemo y useCallback para evitar renders innecesarios**: usaremos `useMemo` para optimizar el filtrado de tareas en TaskList.

En el REQ5 se menciona **Manipula referencias directas al DOM con useRef y preserva valores entre renders**

En el REQ6 se menciona **No utilizar librerías de manejo de estado como Redux**: En nuestro caso no usamos para nada Redux, todo lo hacemos con Hooks.

En el REQ7 se menciona **El código debe estar escrito en TS, usando Interfaces, Tipos Avanzados y Generics donde sea apropiado**

En el REQ8 se menciona **Debes manejar errores y casos de borde, asegurando que la app no se rompa ante entradas inesperadas**

## Instrucciones del proyecto:

1. Crear un nuevo proyecto React con TS, para eso usamos el siguiente comando: 

- npx create-react-app gestor-tareas --template typescript

2. Como yo cree el directorio `gestor-tareas`, debo navegar hasta ese directorio, para eso usar:

- cd gestor-tareas


3. Inicialmente, lo que realizo es crear los archivos que usaré dentro de `src`, como:

- taskManager.tsx
- taskAdd.tsx
- taskFiltro.tsx
- taskMostrar.tsx
- taskTareasRandom.ts

### 4. Implementado el GENERADOR DE TAREAS ALEATORIAS.

Ahora sí, implementaremos el generador de tareas aleatorias. Cuando corres la app, te aparecerá una lista de tareas aleatorias con estados aleatorios. Para esto usamos el script de `taskTareasRandom.ts`, que contiene el siguiente código:

Implementamos una interface `Task` que define la estructura de una tarea individual. Esta interface se utiliza para tipar nuestros datos, lo cual asegura que haya consistencia en toda nuestra app.

```typescript
interface Task {
id: number;
texto: string;
completada: boolean;
}
```

Creamos nuestra constante tareasEjemplo, que es un array de strings. Este array se usará como fuente de datos para generar nuestras tareas aleatorias iniciales:
```typescript
const tareasEjemplo = [
  "Hacer examen V2 de Desarrollo de sistemas web",
  "Almorzar saludable",
  "Estudiar Next.js",
  "Hacer ejercicio",
  "Leer un libro",
  "Practicar meditación",
  "Llamar a un amigo",
  "Organizar el escritorio"
];
```
Exportamos generarTareasIniciales, que es una función que no toma parámetros y devuelve un array de objetos Task. Esta funcion utiliza el metodo map para iterar sobre cada elemento del array creado anteriormente(tareasejemplo)
Para cada tarea, crea un nuevo objeto que cumple con la interface Task
Asigna un id basado en el indice del elemento en el array
Usa el texto de la tarea directamente del array tareasEjemplo
y genera aleatoriamente el estado completado con una probabilidad del 30% de ser True.

Esta función se utilizará en nuestro TaskProvider para inicializar el estado de las tareas cuando la aplicación se inicie.

```typescript
export const generarTareasIniciales = (): Task[] => {
  return tareasEjemplo.map((tarea, index) => ({
    id: index,
    texto: tarea,
    completada: Math.random() < 0.3 // 30% de probabilidad de estar completada
  }));
};
```
### 5. Implementado el ADMINISTRADOR DE TAREAS(CONTEXT Y REDUCER)

Ahora, abramos taskManager.tsx, este es nuestro core, maneja el estado global de toda nuestra app, utiliza el context API y useReducer de React.

Primero importamos las funciones de react y nuestra funcion que genera tareas aleatorias
```typescript
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { generarTareasIniciales } from './taskTareasRandom';
```

Ahora definamos nuestros tipos, esto lo hacemo mediante interfaces, en esta caso podemos definir la estructura de una tarea, el estado global(un array de tareas) y las acciones posibles que pueden modificar el estado.
```typescript
interface Task {
  id: number;
  texto: string;
  completada: boolean;
}

interface TaskState {
  tareas: Task[];
}
```
Este tipo describe las acciones posibles que podemos "dispatchear". Cada acción tiene un type que indica qué es lo que se quiere hacer y un payload que contiene la info adicional necesaria para realizar la acción.
```typescript
type TaskAction =
  | { type: 'AGREGAR_TAREA'; payload: string }
  | { type: 'TOGGLE_TAREA'; payload: number }
  | { type: 'ELIMINAR_TAREA'; payload: number };

```

Ahora, creemos el contexto, que contendrá el estado actual y una función Dispatch para poder actualizar ese estado:
```typescript
const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | undefined>(undefined);
```

Ahora creamos el Reducer, es una funcion que define cómo debe cambiar el estado dependiendo de la accion que se envie(o sea el dispatch)

explicacion a mas detalle: 
AGREGAR_TAREA: Añade una nueva tarea al array de tareas. La tarea nueva incluye un id generado con Date.now(), el payload(texto de la tarea) y un estado completada inicializado a false.

TOGGLE_TAREA: Cambia el estado de completada de una tarea específica (identificamos eso por el id en el payload)

ELIMINAR_TAREA: Filtra el array de tareas y elimina la tarea cuyo id es igual con el valor del payload.

Creamos el proveedor de contexto(TaskProvider), que es el componente que proporciona el contexto a todos los componentes hijos.
```typescript
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'AGREGAR_TAREA':
      return {
        ...state,
        tareas: [...state.tareas, { id: Date.now(), texto: action.payload, completada: false }],
      };

    case 'TOGGLE_TAREA':
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload ? { ...tarea, completada: !tarea.completada } : tarea
        ),
      };

    case 'ELIMINAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };

    default:
      return state;
  }
};
```

Aqui usamos useReducer para inicializar el estado usando taskReducer y las tareas iniciales generadas con generarTareasIniciales. Tambien TaskContext.Provider proporcionar tanto el estado como la funcion dispatch, es decir, cualquier componente que este envuelto de este proveedor tendra acceso al estado y la capacidad de modificarlo.
```typescript
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tareas: generarTareasIniciales() });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
```
Finalmente, creamos nuestro hook personalizado llamado useTaskContext a otros componentes acceder fácilmente al estado y dispatch sin tener que usar useContext directamente, tambien tiene una verificacion que si el hook fuera del proveedor taskprovider, arroja un error, esto asegura que el contexto este disponible:

```typescript
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext debe ser usado dentro de un TaskProvider');
  }
  return context;
};
```


### 6. Implementado el componente para ANADIR TAREAS:

Primero debemos abrir taskAdd.tsx, nuestro objetivo aca es crear el formulario sencillo para que el usuario pueda añadir nuevas tareas, usamos el estado local para almacenar temporalmente el texto de la nueva tarea antes de enviarla al estado global mediante el dispatch. Hacemos esto porque el estado global (que maneja la lista completa de tareas) no necesita actualizarse con cada letra que el usuario escribe...

Primero añadimos las funciones necesarias y nuestro hook personalizado para acceder al contexto de tareas:
```typescript
import React, { useState, useRef } from 'react';
import { useTaskContext } from './taskManager';
```


Creamos nuestro componente TaskAdd, veamos cada parte de codigo dentro de TaskAdd:
Primero creamos tres contantes 
const [nuevaTarea, setNuevaTarea] = useState(''); -> es una deestrucutracion de array, que nos proporciona nuevaTarea, el texto que el usuario escribe en el forms, y setNuevaTarea, que es la funcion que actualiza el estado local cuando el usuario escribe en el forms.
inputRef: Usamos este ref para volver a enfocar el campo de texto después de añadir una tarea.
dispatch: Traemos la función dispatch del contexto de tareas mediante nuestro hook useTaskContext, porque esta función nos permitirá añadir la nueva tarea al estado global.


Luego creamos nuestra funcion handleSubmit, que lo que hace es verificar que el froms no este vacio y si es valido, despacha la accion AGREGAR_TAREA al reducer, y luego añade la nueva tarea al estado global.

Lo siguiente es crear el formulario, que contiene un input y un boton para añadir la tarea. 

Por ultimo, exportamos el componente para usarlo en otras partes del app.
```typescript
const TaskAdd: React.FC = () => {
  const [nuevaTarea, setNuevaTarea] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (nuevaTarea.trim()) { // Verificamos que la tarea no sea solo espacios en blanco
      dispatch({ type: 'AGREGAR_TAREA', payload: nuevaTarea }); // Enviamos la acción para agregar la nueva tarea
      setNuevaTarea(''); // limpiamos el forms después de añadir la tarea
      inputRef.current?.focus(); // volvemos a enfocar el input para añadir más tareas
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default TaskAdd; 
```

### 7. Implementado el componente para ANADIR TAREAS:

Primero abrimos taskFiltro.tsx y añadimos el código que nos permitirá filtrar las tareas basándonos en su estado. Este componente maneja tres tipos de filtros: "TODAS", "ACTIVAS" y "COMPLETADAS". 

Para empezar, definimos el tipo de filtro FilterType que se usará para controlar qué conjunto de tareas mostrar. Este tipo puede ser uno de los tres valores mencionados anteriormente: 'TODAS', 'ACTIVAS' o 'COMPLETADAS'.

Luego, tenemos la definición de la interfaz Props, la cual describe las propiedades que el componente recibirá, en este caso, el componente espera dos props: filtroActual, que representa el filtro que está actualmente activo, y setFiltro, que es una función que permite actualizar el filtro seleccionado. Esta función acepta un parámetro del tipo FilterType, que puede ser cualquiera de los tres filtros.

Luego implementamos el componente TaskFiltro como un componente funcional de React que recibe las props desestructuradas. Dentro del JSX, utilizamos tres botones que representan los diferentes filtros: "Todas", "Activas" y "Completadas". Cada botón tiene un onClick que, eso significa que al hacer clic, ejecuta la función setFiltro con el valor correspondiente al filtro que queremos activar.

Para finalizar, cada botón tiene un estado disabled que desactiva el botón cuando el filtro actual es igual con el valor del botón, si el filtro actual es "TODAS", el botón "Todas" estará desactivado para indicar que ya se está mostrando ese conjunto de tareas.

Por último, exportamos el componente TaskFiltro para usarlo en otras partes de la aplicación.

```typescript
import React from 'react';

export type FilterType = 'TODAS' | 'ACTIVAS' | 'COMPLETADAS';

interface Props {
  filtroActual: FilterType;
  setFiltro: (filtro: FilterType) => void;
}

const TaskFiltro: React.FC<Props> = ({ filtroActual, setFiltro }) => {
  return (
    <div>
      <button onClick={() => setFiltro('TODAS')} disabled={filtroActual === 'TODAS'}>
        Todas
      </button>
      <button onClick={() => setFiltro('ACTIVAS')} disabled={filtroActual === 'ACTIVAS'}>
        Activas
      </button>
      <button onClick={() => setFiltro('COMPLETADAS')} disabled={filtroActual === 'COMPLETADAS'}>
        Completadas
      </button>
    </div>
  );
};

export default TaskFiltro;
```


### 8. Implementando el compontente para MOSTRAR LAS TAREAS:

Primero, importamos todo lo necesario para realizar el componente
Luego, definimos la interfaz Props, que simplemente espera recibir el filtro activo (del tipo FilterType) como una prop. El componente funcional TaskMostrar recibe esta prop desestructurada
Dentro del cuerpo del componente, usamos el hook useTaskContext para obtener el state (que contiene la lista de tareas) y dispatch. Luego definimos tareasFiltradas usando useMemo. En este caso, filtramos las tareas en función del valor de filtro y del estado actual de las tareas, para solo recalcular las tareas filtradas cuando el filtro o las tareas cambien
Dependiendo del filtro seleccionado, se retornan las tareas de tres formas posibles:
    Si el filtro es "ACTIVAS", se muestran solo las tareas no completadas.
    Si el filtro es "COMPLETADAS", se muestran las tareas que ya han sido completadas.
    En caso de que el filtro sea "TODAS", se muestran todas las tareas.
En el return, se renderiza un título ("Lista de Tareas") y una lista desordenada (ul). Por cada tarea en tareasFiltradas, creamos un elemento de lista (li), incluye un checkbox para marcar o desmarcar la tarea, un texto que muestra la descripción de la tarea (añadimos un estilo como TACHADO), y un botón para eliminar la tarea. El checkbox está controlado por el estado de la tarea (o sea si está completada o no) y al cambiar su estado se despacha la acción TOGGLE_TAREA con el id de la tarea correspondiente. El botón de eliminar despacha la acción ELIMINAR_TAREA, también con el id de la tarea, para quitarla de la lista.

Finalmente, exportamos el componente TaskMostrar
```typescript
import React, { useMemo } from 'react';
import { useTaskContext } from './taskManager';
import { FilterType } from './taskFiltro';

interface Props {
  filtro: FilterType;
}

const TaskMostrar: React.FC<Props> = ({ filtro }) => {
  const { state, dispatch } = useTaskContext();

  const tareasFiltradas = useMemo(() => {
    switch (filtro) {
      case 'ACTIVAS':
        return state.tareas.filter(tarea => !tarea.completada);
      case 'COMPLETADAS':
        return state.tareas.filter(tarea => tarea.completada);
      default:
        return state.tareas;
    }
  }, [filtro, state.tareas]);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => dispatch({ type: 'TOGGLE_TAREA', payload: tarea.id })}
            />
            <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
              {tarea.texto}
            </span>
            <button onClick={() => dispatch({ type: 'ELIMINAR_TAREA', payload: tarea.id })}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskMostrar;
```

### 9. Actualizamos nuestro componente principal APP:

Lo primero que hacemos dentro de App es utilizar el hook useState para gestionar el estado local del filtro. Aquí definimos el estado filtro, que se inicializa con el valor 'TODAS', es decir q al principio se mostrarán todas las tareas. setFiltro es la función que usamos para actualizar el estado del filtro cuando el usuario selecciona un nuevo filtro.

Luego, envolvemos todo el contenido del componente dentro de TaskProvider. ya que proporciona el contexto de tareas a todos los componentes hijos, permitiendo que  TaskAdd, TaskFiltro, y TaskMostrar(hijos) puedan acceder al estado global de las tareas y realizar cambios en ese estado mediante dispatch.

Dentro del JSX, empezamos con el título Gestor de Tareas. Justo debajo, renderizamos el componente TaskAdd, que permite al usuario añadir nuevas tareas. Luego incluimos TaskFiltro, pasando el estado filtroActual y la función setFiltro como props para que el usuario pueda filtrar las tareas entre todas, activas o completadas. ya por ultimo solo renderizamos TaskMostrar, ahi debemos pasarle el filtro seleccionado para que muestre las tareas correspondientes según el filtro actual.

```typescript

import React, { useState } from 'react';
import { TaskProvider } from './taskManager';
import TaskAdd from './taskAdd';
import TaskFiltro, { FilterType } from './taskFiltro';
import TaskMostrar from './taskMostrar';

const App: React.FC = () => {
  const [filtro, setFiltro] = useState<FilterType>('TODAS');

  return (
    <TaskProvider>
      <div className="App">
        <h1>Gestor de Tareas</h1>
        <TaskAdd />
        <TaskFiltro filtroActual={filtro} setFiltro={setFiltro} />
        <TaskMostrar filtro={filtro} />
      </div>
    </TaskProvider>
  );
};

export default App;
```


### 10. Verificamos que index.tsx contenga lo siguiente:

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
### 11. ULTIMO PASO:

npm start

### 12. Abrir en navegador: 

http://localhost:3000
