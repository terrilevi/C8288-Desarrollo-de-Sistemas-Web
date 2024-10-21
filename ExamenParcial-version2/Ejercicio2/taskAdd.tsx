import React, { useState, useRef } from 'react';
import { useTaskContext } from './taskManager';

const TaskAdd: React.FC = () => {
  const [nuevaTarea, setNuevaTarea] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaTarea.trim()) {
      dispatch({ type: 'AGREGAR_TAREA', payload: nuevaTarea });
      setNuevaTarea('');
      inputRef.current?.focus();
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