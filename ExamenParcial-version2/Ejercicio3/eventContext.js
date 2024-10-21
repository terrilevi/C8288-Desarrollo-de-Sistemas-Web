import React, { createContext, useContext, useReducer } from "react";
import Evento from "./eventoPuro";

// Estado inicial
const initialState = {
  eventos: [],
};

// Tipos de acciones
const actionTypes = {
  AGREGAR_EVENTO: "AGREGAR_EVENTO",
  EDITAR_EVENTO: "EDITAR_EVENTO",
  ELIMINAR_EVENTO: "ELIMINAR_EVENTO",
  CARGAR_EVENTOS: "CARGAR_EVENTOS",
};

// Reducer
const eventReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AGREGAR_EVENTO:
      return {
        ...state,
        eventos: [...state.eventos, action.payload],
      };

    case actionTypes.EDITAR_EVENTO:
      return {
        ...state,
        eventos: state.eventos.map((evento) =>
          evento.id === action.payload.id ? action.payload : evento
        ),
      };

    case actionTypes.ELIMINAR_EVENTO:
      return {
        ...state,
        eventos: state.eventos.filter((evento) => evento.id !== action.payload),
      };

    case actionTypes.CARGAR_EVENTOS:
      return {
        ...state,
        eventos: action.payload,
      };

    default:
      return state;
  }
};

// Contexto
const EventContext = createContext();

// Proveedor de contexto
export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error(
      "useEventContext debe ser usado dentro de un EventProvider"
    );
  }
  return context;
};
