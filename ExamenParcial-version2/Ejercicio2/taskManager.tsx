import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { generarTareasIniciales } from './taskTareasRandom';

interface Task {
  id: number;
  texto: string;
  completada: boolean;
}

interface TaskState {
  tareas: Task[];
}

type TaskAction =
  | { type: 'AGREGAR_TAREA'; payload: string }
  | { type: 'TOGGLE_TAREA'; payload: number }
  | { type: 'ELIMINAR_TAREA'; payload: number };

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | undefined>(undefined);

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

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tareas: generarTareasIniciales() });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext debe ser usado dentro de un TaskProvider');
  }
  return context;
};