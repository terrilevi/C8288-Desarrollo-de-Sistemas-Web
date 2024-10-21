interface Task {
    id: number;
    texto: string;
    completada: boolean;
  }
  
  const tareasEjemplo = [
    "Hacer examen V2 de Desarrollo de sistemas web",
    "Almorzar saludable",
    "Estudiar Next.js",
    "Hacer ejercicio",
    "Leer un libro",
    "Practicar meditación",
    "Llamar a un amigo",
    "Organizar el escritorio"
  ];
  
  export const generarTareasIniciales = (): Task[] => {
    return tareasEjemplo.map((tarea, index) => ({
      id: index,
      texto: tarea,
      completada: Math.random() < 0.3 // 30% de probabilidad de estar completada
    }));
  };