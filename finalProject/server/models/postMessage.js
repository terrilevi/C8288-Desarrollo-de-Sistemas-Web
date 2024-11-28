// Publicaciones como minimo:

//     _id: Identificador único.
//     **message/contenido: Texto de la publicación.
//     **creator/autor: ID del usuario que crea la publicación.
//     **createdAt/fechaCreacion: Fecha y hora de creación.
//     **likes: Número de "me gusta".



import mongoose from 'mongoose';
// Definimos el esquema de la colección "posts" en MongoDB
const postSchema = mongoose.Schema({
    message: String,
    name: String,
    creator: String, // por ahora solo trabajare con estos
    createdAt: {
        type: Date,
        default: new Date()
    },
    likes: { 
        type: [String],
        default: []
    },
    selectedFile: String
});

// Con este esquema definimos cómo se verá cada documento (registro) en la colección
// pero aún no podemos interactuar con la base de datos hasta convertirlo en un modelo.

// Por eso, creamos el modelo Mongoose basado en el esquema
var PostMessage = mongoose.model('PostMessage', postSchema);
// Exportamos el modelo para que pueda usarse en otras partes de la aplicación
export default PostMessage;


// ----------------------------------------
// **¿Qué hemos hecho hasta aquí????**
// ----------------------------------------
// - Creamos un esquema (`postSchema`) que describe cómo debe lucir un documento
//   en la colección "PostMessage" en MongoDB.
// - Convertimos ese esquema en un modelo (`PostMessage`) que Mongoose utiliza
//   para interactuar con la base de datos.
// - Con este modelo podremos ejecutar comandos como crear, leer, actualizar
//   y eliminar publicaciones en la colección "PostMessage".