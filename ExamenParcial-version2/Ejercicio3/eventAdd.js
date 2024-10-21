import React, { useState, useRef } from "react";
import { useEventContext } from "./eventContext";
import eventManager from "./eventManager";
import Evento from "./eventoPuro";

const EventAdd = () => {
  const { dispatch } = useEventContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!title || !description || !date || !location) {
      alert("Por favor, complete todos los campos");
      return;
    }

    const newEvent = new Evento(Date.now(), title, description, date, location);

    // Simulamos guardar el evento
    eventManager.guardarEvento(newEvent).then((evento) => {
      dispatch({ type: "AGREGAR_EVENTO", payload: evento });
      alert("Evento agregado exitosamente");
      // Limpiamos el formulario
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      inputRef.current.focus();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
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
      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventAdd;
