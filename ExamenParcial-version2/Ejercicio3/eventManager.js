import Evento from "./eventoPuro";

const eventManager = {
  cargarEventos: () => {
    // Simula una llamada asíncrona para cargar eventos
    return new Promise((resolve) => {
      setTimeout(() => {
        const eventosIniciales = [
          new Evento(
            1,
            "Concierto de Shakira",
            "Shakira en Perú",
            "2025-01-16",
            "Estadio Nacional"
          ),
          new Evento(
            2,
            "Examen de Admisión",
            "UPCH",
            "2023-11-15",
            "UPCH Campus"
          ),
        ];
        resolve(eventosIniciales);
      }, 1000);
    });
  },

  guardarEvento: (evento) => {
    // Simula una llamada asíncrona para guardar un evento
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(evento);
      }, 500);
    });
  },
};

export default eventManager;
