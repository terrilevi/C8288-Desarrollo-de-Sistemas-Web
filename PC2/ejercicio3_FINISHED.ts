// Primero planeo probar con solo una interfaz para edad 
// la cual valideremos eventualmente
// tmb tenemos:
// nombre, correo, celular

// defino mi interfaz UserData que contiene age: number(según la restricción)

interface UserData {
    age: number;
    correo: string;
    cell:string;
    nombre:string;
}

// defino mi interfaz para el registro exitoso, cuando la validazion esté correcta
interface RegistroExitoso {
    status: "success";
    message: string;
}

// defino mi interfaz para el registro malito, para los errores de validación
interface ErrorDeValidacion {
    status: "error";
    message: string;
    detalles: string[];
}

// Implementamos un tipo que representa el resultado de la validación (éxito o error)
type ResultadoValidacion = RegistroExitoso | ErrorDeValidacion;

// Y tambien planeo usar una interfaz que actue como una base
// para mis validacione
interface Validacion {
    validar(data: UserData): Promise<ResultadoValidacion>;
}

// Implementación de la validación de edad
class ValidacionEdad implements Validacion {
    validar(data: UserData): Promise<ResultadoValidacion> {
        // Si deseo implementar la validacion
        // Necesitamos retornar la promesa de forma asíncrona
        return new Promise((resolve) => {
            // Verificamos si la edad está dentro del rango válido (18-100 años)
            if (data.age < 18 || data.age > 100) {
                // Si la edad no es válida, lo resolvemos con un objeto de error(según la restricción del exam)
                resolve({
                    status: "error",
                    message: "Error en la validación de la edad",
                    detalles: ["La edad debe estar entre 18 y 100 años"]
                });
            } else {
                // Si la edad es válida, solo resolvemos con un objeto de éxito(según la restricción del exam)
                resolve({
                    status: "success",
                    message: "Edad válida"
                });
            }
        });
    }
}

// Declaramos nuestro clase principal para el registro de usuarios
class RegistroUsuario {
    private validacion: Validacion;

    constructor() {
        // Inicializamos con la la validación que tenemos, que es la ValidacionEdad
        this.validacion = new ValidacionEdad();
    }

    // Método para registrar un usuario (en este caso, solo creo una validacion de la edad)
    registrarUsuario(data: UserData): Promise<ResultadoValidacion> {
        // Ejecutamos la validación de edad
        return this.validacion.validar(data).then(resultado => {
            if (resultado.status === "error") {
                // Si hay un error, lo retornamos tal cual
                return resultado;
            } else {
                // Si la validación es exitosa, retornamos un mensaje de registro exitoso
                return {
                    status: "success",
                    message: "Usuario registrado exitosamente"
                };
            }
        });
    }
}


// Para probar nuestro registro de usuario
// podemos crear una función llamada probarRegistro()
function probarRegistro() {
    const registro = new RegistroUsuario();
    
    // Probemos con ambas validaciones para que en la consola se demuestre
    // que nuestro code si bota ambos objetos con una validacion erronea y otra buena:


    // validacion con una edad permitida:
    const usuarioValido: UserData = { age: 25, correo: "valeria@upch", cell:"789456", nombre:'vale' };
    
    // Realizamos la prueba con el usuario válido
    registro.registrarUsuario(usuarioValido)
        .then(resultado => {
            console.log(" --- ESTA ES UNA SIMLUACIÓN DEL OBJETO DEVUELTO CUANDO SE VALIDA CORRECTAMENTE ---")
            console.log(" ---------------------------------------------------------------------------------")
            console.log("Resultado del registro (usuario válido):", resultado);
        })
        .catch(error => {
            console.error("Error inesperado:", error);
        });



    // ahora Probamos con una edad inválida
    const usuarioInvalido: UserData = { age: 15, correo: "marcos@upch", cell:"9876513", nombre:'marcos'  };
    
    // Realizamos la prueba con el usuario inválido
    registro.registrarUsuario(usuarioInvalido)
        .then(resultado => {
            console.log(" --- ESTA ES UNA SIMLUACIÓN DEL OBJETO DEVUELTO CUANDO SE VALIDA INCORRECTAMENTE ---")
            console.log(" ---------------------------------------------------------------------------------")
            console.log("Resultado del registro (usuario inválido):", resultado);
        })
        .catch(error => {
            console.error("Error inesperado:", error);
        });
}

// Ejecutamos las simulaciones:
probarRegistro();