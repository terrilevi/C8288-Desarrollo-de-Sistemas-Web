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

En el REQ2 se menciona **Implementa Hooks personalizados para reutilizar lógica entre componentes**: En nuestro caso crearemos un hook personalizado `useTaskOperations` que contendrá las operaciones comunes sobre las tareas añadir, toggle, eliminar. Este hook utilizará `useContext` y `useCallback` internamente.

En el REQ3 se menciona **Gestiona un estado global utilizando useContext y useReducer**: En nuestro caso `TaskContext.tsx` implementa un contexto global usando `createContext`. Utiliza `useReducer` para manejar el estado de las tareas y las acciones que lo modifican, que son: `ADD_TASK`, `TOGGLE_TASK`, `REMOVE_TASK`. Tambien, el `TaskProvider` envuelve la aplicación, proporcionando acceso al estado y `dispatch` a todos los componentes hijos.

En el REQ4 se menciona **Optimiza el rendimiento de la aplicación utilizando useMemo y useCallback para evitar renders innecesarios**: usaremos `useMemo` para optimizar el filtrado de tareas en TaskList, y `useCallback` en el hook personalizado `useTaskOperations` para memorizar las funciones de operaciones con tareas.

En el REQ5 se menciona **Manipula referencias directas al DOM con useRef y preserva valores entre renders**: En nuestro caso, en taskForm, usaremos `useRef` para manejar el input de nueva tarea, permitiendo limpiarlo después de añadir una tarea.

En el REQ6 se menciona **No utilizar librerías de manejo de estado como Redux**: En nuestro caso no usamos para nada Redux, todo lo hacemos con Hooks.

En el REQ7 se menciona **El código debe estar escrito en TS, usando Interfaces, Tipos Avanzados y Generics donde sea apropiado**: En nuestro caso estamos usando interfaces para definir la estructura de `Task` y `TaskState` y usar tipos avanzados para `taskAction` en el reducer.

En el REQ8 se menciona **Debes manejar errores y casos de borde, asegurando que la app no se rompa ante entradas inesperadas**: En `TaskForm`, solo implementaremos una validación básica para evitar la creación de tareas con texto vacío. En `TaskList`, manejaremos el caso de lista vacía mostrando un mensaje simple cuando no haya tareas.

## Instrucciones del proyecto:

1. Crear un nuevo proyecto React con TS, para eso usamos el siguiente comando: 

  npx create-react-app gestor-tareas --template typescript

2. Como yo cree el directorio `gestor-tareas`, debo navegar hasta ese directorio, para eso usar:

  cd gestor-tareas

