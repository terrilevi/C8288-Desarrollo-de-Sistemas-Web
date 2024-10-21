
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