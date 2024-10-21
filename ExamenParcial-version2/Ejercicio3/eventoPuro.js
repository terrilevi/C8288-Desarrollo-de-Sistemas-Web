class Evento {
  constructor(id, titulo, descripcion, fecha, ubicacion) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.ubicacion = ubicacion;
  }

  // Métodos de acceso (encapsulación)
  getTitulo() {
    return this.titulo;
  }

  setTitulo(nuevoTitulo) {
    this.titulo = nuevoTitulo;
  }

  // aqui puedo regresar para añadir más métodos de acceso si kiero
}

export default Evento;
