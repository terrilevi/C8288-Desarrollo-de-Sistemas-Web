class User {
    // definimos nuestro constructor, que inicializa 
    // con el nombre del User, su grupo, sus permisos.
    constructor(usuarios = [], nombre, grupo, permisos) {
        this.usuarios = usuarios;
        this.nombre = nombre;
        this.grupo = grupo;
        this.permisos = permisos;
    }

    // luego debemos implementar metodos estaticos
    // para crear nuevos usuarios

    static AgregarNuevosUsuarios(nombre, grupo, permiso) {
        return this.usuarios 
    }

    // no terminé...
}