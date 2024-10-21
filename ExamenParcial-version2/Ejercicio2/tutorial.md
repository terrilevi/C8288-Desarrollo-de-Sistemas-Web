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
```typescript
export const generarTareasIniciales = (): Task[] => {
  return tareasEjemplo.map((tarea, index) => ({
    id: index,
    texto: tarea,
    completada: Math.random() < 0.3 // 30% de probabilidad de estar completada
  }));
};
```
