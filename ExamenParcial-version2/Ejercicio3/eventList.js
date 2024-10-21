import React, { useState, useCallback } from "react";
import { useEventContext } from "./eventContext";
import EventEdit from "./eventEdit";

const EventList = () => {
  const { state, dispatch } = useEventContext();
  const [editingEventId, setEditingEventId] = useState(null);

  const handleDelete = useCallback(
    (id) => {
      // Simulamos la eliminación
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      }).then(() => {
        dispatch({ type: "ELIMINAR_EVENTO", payload: id });
        alert("Evento eliminado exitosamente");
      });
    },
    [dispatch]
  );

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
      dispatch({ type: "EDITAR_EVENTO", payload: evento });
      alert("Evento actualizado exitosamente");
      setEditingEventId(null);
    });
  };

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
