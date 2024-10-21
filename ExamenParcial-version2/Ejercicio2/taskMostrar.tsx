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