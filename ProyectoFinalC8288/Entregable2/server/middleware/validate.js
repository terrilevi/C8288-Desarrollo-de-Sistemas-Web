// Middleware de validación
// Estos middlewares se encargan de validar los datos antes de que lleguen a los controladores
// Usamos Joi jeje
import Joi from 'joi';
// Middleware para validar los datos de registro de usuario
export const validateSignup = (req, res, next) => {
    // Definimos el esquema de validación usando Joi.
    // Joi.object() crea un esquema que define la estructura y reglas
    // que debe cumplir nuestro objeto de datos
    const schema = Joi.object({
        // Validación para el firstName
        firstName: Joi.string()           // Debe ser un string
            .required()                   // Es obligatorio
            .min(3)                       // Mínimo 3 caracteres
            .messages({                   // Mensajes personalizados de error
                // string.empty se dispara cuando el campo está vacío
                'string.empty': 'first name es necesario',
                // string.min se dispara cuando no cumple el mínimo de caracteres
                'string.min': 'el first name debe tener minimo 3 caracteres',
            }),
 
        // Validación para el lastName
        // Sigue las mismas reglas que firstName
        lastName: Joi.string()
            .required()
            .min(3)
            .messages({
                'string.empty': 'last name es necesario',
                'string.min': 'el last name debe tener minimo 3 caracteres',
            }),
 
        // Validación para el email
        email: Joi.string()
            .required()                   // Es obligatorio
            .email()                      // Debe tener formato de email válido
            .messages({
                'string.empty': 'email es necesario',
                // string.email se dispara cuando el formato no es válido
                'string.email': 'por favor escribe una direccion de email valida'
            }),
 
        // Validación para el password
        password: Joi.string()
            .required()
            // pattern() verifica que cumpla con una expresión regular
            // /^(?=.*[A-Z])(?=.*\d)/: significa que debe contener:
            // - ^ : inicio de la cadena
            // - (?=.*[A-Z]) : al menos una letra mayúscula
            // - (?=.*\d) : al menos un número
            .pattern(/^(?=.*[A-Z])(?=.*\d)/)
            .messages({
                'string.empty': 'password es necesario',
                // string.pattern.base se dispara cuando no cumple la expresión regular
                'string.pattern.base': 'el password como minimo debe tener una letra mayuscula y un numero'
            }),
 
        // Validación para confirmPassword
        // Joi.ref('password') significa que debe ser igual al campo password
        confirmPassword: Joi.ref('password')
    });
 
    // Validamos los datos recibidos contra nuestro esquema
    // schema.validate() retorna un objeto con error y value
    // { abortEarly: false } hace que Joi recolecte todos los errores
    // en lugar de detenerse en el primer error
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    // Si hay errores de validación
    if (error) {
        // Convertimos los detalles del error en un array de mensajes
        // error.details es un array de objetos de error
        // map() extrae solo el mensaje de cada error
        const errors = error.details.map(detail => detail.message);
        
        // Respondemos con el primer error encontrado
        // status(400) indica Bad Request (error del cliente)
        return res.status(400).json({ message: errors[0] });
    }
    
    // Si no hay errores, continuamos con el siguiente middleware
    next();
 };
 
 // Middleware para validar la creación de posts
 export const validatePost = (req, res, next) => {
    // Extraemos el mensaje del cuerpo de la petición
    const { message } = req.body;
 
    // Verificamos que el mensaje:
    // 1. Exista (!message verifica que no sea null/undefined)
    // 2. No esté vacío después de quitar espacios (trim())
    if (!message || message.trim() === '') {
        // Si está vacío, respondemos con error 400 (Bad Request)
        return res.status(400).json({ message: 'el contenido del post no puede estar vacio' });
    }
 
    // Si el mensaje es válido, continuamos al siguiente middleware
    next();
 };
 
 /*
 Ejemplito:
 
 router.post('/signup', validateSignup, signup);
 router.post('/posts', validatePost, createPost);
 
 Flujo de una petición de registro:
 1. Cliente envía POST a /signup con datos:
   {
     firstName: "J",
     lastName: "Doe",
     email: "invalidemail",
     password: "nouppercaseornumber",
     confirmPassword: "different"
   }
 
 2. validateSignup verifica los datos y encuentra múltiples errores:
   - firstName muy corto
   - email inválido
   - password sin mayúscula ni número
   - confirmPassword no coincide
 
 3. Responde con el primer error: "First name must be at least 3 characters"
 
 4. El controlador signup nunca se ejecuta porque los datos son inválidos
 */