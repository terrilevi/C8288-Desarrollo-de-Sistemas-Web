import React, { useEffect } from "react";
import { EventProvider, useEventContext } from "./eventContext";
import EventAdd from "./eventAdd";
import EventList from "./eventList";
import eventManager from "./eventManager";

const App = () => {
  return (
    <EventProvider>
      <div className="App">
        <h1>Gestor de Eventos</h1>
        <EventLoader />
        <EventAdd />
        <EventList />
      </div>
    </EventProvider>
  );
};

const EventLoader = () => {
  const { dispatch } = useEventContext();

  useEffect(() => {
    eventManager.cargarEventos().then((events) => {
      dispatch({ type: "CARGAR_EVENTOS", payload: events });
    });
  }, [dispatch]);

  return null;
};

export default App;
