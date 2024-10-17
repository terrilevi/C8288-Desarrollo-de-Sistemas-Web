// DataContext.tsx

// Importamos React y los hooks necesarios para crear y usar el contexto
import { createContext, useContext, useReducer, useCallback } from "react";

// definimos la interfaz para nuestro estado global
interface estadoData {
  lecturas: tipLectura[]; // Un array de lecturas
  filtros: string; // Una cadena para filtrar las lecturas
}

// Definimos la interfaz para una lectura individual
interface tipLectura {
  id: number; // Identificador único para cada lectura
  value: number; // El valor de la lectura
  fechaYhora: Date; // La fecha y hora de la lectura
}

// Definimos los tipos de acciones que nuestro reducer puede manejar,
// estamos usando tipo de union que lista todas las posibles acciones que se puede desarrollar
// como añadir, filtrar, limpiar
// Esto es un tipo de unión que lista todas las posibles acciones
type DataAction = 
  | { type: 'agregarLec'; pl: tipLectura }
  | { type: 'filtrar'; pl: string }
  | { type: 'LIMPIAR' };


// Definimos nuestro reducer para manejar las actualizaciones de estado
// basicamente el reducer toma el estado actual y una acción, y devuelve el nuevo estado
const dataReducer = (state: estadoData, action: DataAction): estadoData => {
  switch (action.type) {
    case 'agregarLec':
      // Añadimos una nueva lectura al array de lecturas
      return { ...state, lecturas: [...state.lecturas, action.pl] };
    case 'filtrar':
      // Actualizamos el filtro
      return { ...state, filtros: action.pl };
    case 'LIMPIAR':
      // Limpiamos todas las lecturas
      return { ...state, lecturas: [] };
    default:
      // Si la acción no existe, devolvemos el estado sin cambios
      return state;
  }
};



