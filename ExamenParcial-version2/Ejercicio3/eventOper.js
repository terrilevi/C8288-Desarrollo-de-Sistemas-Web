import { useEventContext } from "./eventContext";
import eventManager from "./eventManager";

const useEventOperations = () => {
  const { dispatch } = useEventContext();

  const loadEvents = () => {
    return eventManager.cargarEventos().then((eventos) => {
      dispatch({ type: "CARGAR_EVENTOS", payload: eventos });
    });
  };

  const saveEvent = (evento) => {
    return eventManager.guardarEvento(evento).then((eventoGuardado) => {
      dispatch({ type: "AGREGAR_EVENTO", payload: eventoGuardado });
    });
  };

  // Podemos añadir más operaciones si es necesario

  return {
    loadEvents,
    saveEvent,
  };
};

export default useEventOperations;
