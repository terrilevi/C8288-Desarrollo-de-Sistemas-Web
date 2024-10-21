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