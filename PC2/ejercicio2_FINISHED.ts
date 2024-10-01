// diseñar un sistema para_gestionar los permisos de diferentes tipos
// de usuarios:
// UsuarioBase
// Admin
// SuperAdmin


// Creamos nuestra clase base UsuarioBase
class UsuarioBase {
    nombre: string;
    correo: string;

    // debemos usar nuestro constructor para declarar nombre y correo y sus tipos:
    constructor(nombre: string, correo: string) {
        this.nombre = nombre;
        this.correo = correo;
    }

    // Podemos implementar un método para obtener un permisos básico(es una simulacion)
    getPermisos(): string[] {
        return ['leer'];
    }
}

// Como debemos usar herencia 
// lo que planteo es crear esta Clase Admin que hereda de UsuarioBase
// lo cual nos permitirá tener permisos adicionales(getPermisos())

class Admin extends UsuarioBase {
    // Nuestro constructor en este caso llama al constructor de la clase padre
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    // En esta parte lo que hacemos es SOBREESCRIBIR el método getPermisos 
    // para añadir más permisos
    getPermisos(): string[] {
        return [...super.getPermisos(), 'escribir', 'editar'];
    }
}

// Creamos una Clase SuperAdmin que hereda de Admin y tenga algunos permisos mas avanzados
class SuperAdmin extends Admin {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    // Aqui lo que tambien hacemos es sobreescribir el método getPermisos 
    // para añadir esos permisos avanzados
    getPermisos(): string[] {
        return [...super.getPermisos(), 'eliminar', 'gestionarSistema'];
    }
}

// Implementamos genericos para gestionar nuestro tipos de usuario
// para eso creamos una clase genérica llamada GestorDePermisos
class GestorDePermisos<T extends UsuarioBase> {
    asignarPermisos(usuario: T): string[] {
        return usuario.getPermisos();
    }
}



// creamos nuestra función para demostrar el uso del sistema de permisos
function demostrarSistema() {
    // ṕodemos hacer un ejemplito con un usuarionormal
    const usuarioNormal = new UsuarioBase('luisarenas', 'luis@upch');
    const adminUsuario = new Admin('sophi', 'sophi@upch');
    const superAdminUsuario = new SuperAdmin('vico', 'vico@upch');

    const gestor = new GestorDePermisos<UsuarioBase>();
    console.log("EL USUARIO NORMAL : ", usuarioNormal)
    console.log('TIENE LOS SIGUIENTES PERMISOS:', gestor.asignarPermisos(usuarioNormal));
    console.log(" ---------------------------------------------------------------------------------")
    console.log("EL USUARIO ADMIN : " , adminUsuario)
    console.log('TIENE LOS SIGUIENTES PERMISOS:', gestor.asignarPermisos(adminUsuario));
    console.log(" ---------------------------------------------------------------------------------")
    console.log("EL USUARIO SUPERADMIN : " , superAdminUsuario)
    console.log('TIENE LOS SIGUIENTES PERMISOS:', gestor.asignarPermisos(superAdminUsuario));


}

// Ejecutamos la demostración
demostrarSistema();