import React, { useState } from "react";

const EventEdit = ({ evento, onSave, onCancel }) => {
  const [title, setTitle] = useState(evento.titulo);
  const [description, setDescription] = useState(evento.descripcion);
  const [date, setDate] = useState(evento.fecha);
  const [location, setLocation] = useState(evento.ubicacion);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !date || !location) {
      alert("Por favor, complete todos los campos");
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
