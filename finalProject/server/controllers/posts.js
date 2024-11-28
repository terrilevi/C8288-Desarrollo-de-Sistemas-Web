import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

// Definimos nuestros controladores para las rutas de posts

// Este controlador se encarga de obtener todos los posts
// Es una función asíncrona porque necesitamos esperar respuestas de la base de datos
export const getPosts = async (req, res) => { 
    // Usamos try/catch para manejar posibles errores en la operación
    try {
        // Primero, obtenemos todos los posts de la base de datos
        // PostMessage.find() es un método de Mongoose que retorna una promesa
        // await hace que esperemos hasta que esa promesa se resuelva
        const postMessages = await PostMessage.find();
        // Obtenemos el ID del usuario de req.userId
        // Este ID existe porque antes de llegar aquí, la petición pasó por
        // nuestro middleware auth que:
        // 1. Recibió el token JWT en el header
        // 2. Verificó que fuera válido
        // 3. Extrajo el ID del usuario y lo añadió a req.userId
        const userId = req.userId;
        // Si tenemos un usuario autenticado (userId existe)
        if (userId) {
            // Buscamos todos los usuarios que han recibido solicitudes de amistad del usuario actual
            // User.find() busca en la colección de usuarios
            // La sintaxis 'friendRequests.from': userId busca documentos donde:
            // Dentro del array friendRequests
            // Haya un objeto con la propiedad 'from' igual a userId
            const receivingUsers = await User.find({
                'friendRequests.from': userId
            });
            
            // Creamos un array solo con los IDs de los usuarios que recibieron solicitudes
            // map() transforma cada usuario en su ID
            // toString() convierte el ObjectId de MongoDB en string para poder compararlo después
            const sentRequestUserIds = receivingUsers.map(user => user._id.toString());

            // Transformamos la lista de posts para añadir información de solicitudes de amistad
            // map() crea un nuevo array donde cada elemento es un objeto que contiene:
            // - Todos los campos del post original (usando spread operator ...post._doc)
            // - Un nuevo campo hasSentRequest que será true si ya enviamos solicitud a este usuario
            const postsWithRequestStatus = postMessages.map(post => ({
                ...post._doc, // _doc contiene los datos puros del documento MongoDB
                // includes() verifica si el creator del post está en nuestra lista de solicitudes enviadas
                hasSentRequest: sentRequestUserIds.includes(post.creator)
            }));
            // Enviamos la respuesta con los posts modificados
            // status(200) indica que la petición fue exitosa
            // json() convierte nuestro objeto JavaScript en formato JSON
            res.status(200).json(postsWithRequestStatus);
        } else {
             // Si no hay usuario autenticado, enviamos los posts sin modificar
            res.status(200).json(postMessages);
        }
    } catch (error) {
        // Si ocurre algún error durante el proceso:
        // status(404) indica que no se encontró el recurso
        // Incluimos el mensaje de error para debugging
        res.status(404).json({ message: error.message });
    }
};


// Controlador para crear nuevos posts
export const createPost = async (req, res) => {
    // Obtenemos los datos del post del cuerpo de la petición (req.body)
    // req.body contiene los datos que el cliente envió en formato JSON
    const post = req.body;

    // Verificamos si hay un usuario autenticado
    // Si no existe req.userId significa que la petición no pasó por el middleware auth
    // o que el token no era válido
    if (!req.userId) {
        // status(401) indica que la petición no está autorizada
        return res.status(401).json({ message: 'no autenticado' });
    }
    // Creamos una nueva instancia del modelo PostMessage
    // Usamos el operador spread (...post) para copiar todos los campos recibidos
    // Y añadimos:
    // - creator: el ID del usuario que está creando el post
    // - createdAt: la fecha y hora actual en formato ISO string
    const newPostMessage = new PostMessage({ 
        ...post, 
        creator: req.userId,  
        createdAt: new Date().toISOString() 
    });

    try {
        // Guardamos el nuevo post en la base de datos
        // save() es un método de Mongoose que inserta el documento
        await newPostMessage.save();
        // Enviamos el nuevo post como respuesta
        // status(201) indica que se creó un nuevo recurso
        res.status(201).json(newPostMessage);
    } catch (error) {
        // Si hay error al guardar:
        // status(409) indica un conflicto
        res.status(409).json({ message: error.message });
    }
};

// Controlador para eliminar posts
export const deletePost = async (req, res) => {
    // Extraemos el id de los parámetros de la URL usando destructuring
     // req.params contiene todos los parámetros de ruta
     // Por ejemplo, si la URL es /posts/123, entonces id será '123'
    const { id } = req.params;
    // Verificamos si el id es un ObjectId válido de MongoDB
    // MongoDB usa un formato específico para sus IDs (ObjectId)
    // mongoose.Types.ObjectId.isValid() verifica si el string tiene el formato correcto
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`no hay posts con id: ${id}`);
    // Si el ID es válido, procedemos a eliminar el post
    // findByIdAndDelete es un método de Mongoose que:
    // 1. Busca un documento por su ID
    // 2. Si lo encuentra, lo elimina
    // 3. Si no lo encuentra, no hace nada
    await PostMessage.findByIdAndDelete(id);

    // Enviamos una respuesta exitosa
   // json() automáticamente establece status 200 si no especificamos otro
    res.json({ message: "post borrado satisfactoriamente" });
};


// Controlador para manejar likes en posts
export const likePost = async (req, res) => {
    // Obtenemos el id del post de los parámetros de la URL
    const { id } = req.params;
    // Verificamos si hay un usuario autenticado
    // Esta verificación es crucial porque necesitamos saber QUIÉN está dando like
    if (!req.userId) return res.json({ message: 'no autenticado' });
    // Verificamos si el id del post es válido
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`no hay posts con id:${id}`);
    // Buscamos el post en la base de datos
    // findById es un método de Mongoose que retorna un único documento
    const post = await PostMessage.findById(id);

    // Buscamos si el usuario ya dio like a este post
    // findIndex busca en el array de likes si existe el userId
    // Retorna -1 si no lo encuentra, o el índice si lo encuentra
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // Si el usuario no ha dado like (index === -1)
        // Añadimos su ID al array de likes usando push
        post.likes.push(req.userId);
    } else {
        // Si el usuario ya dio like
        // Creamos un nuevo array excluyendo el ID del usuario
        // filter crea un nuevo array donde la condición es true
        // Es decir, mantenemos todos los IDs excepto el del usuario actual
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // Actualizamos el post en la base de datos con los likes modificados
    // findByIdAndUpdate toma:
    // 1. El ID del documento a actualizar
    // 2. Los nuevos datos (el post modificado)
    // 3. Opciones: { new: true } hace que retorne el documento actualizado
    //    en lugar del documento original
    const updatedPost = await PostMessage.findByIdAndUpdate(
        id, 
        post, 
        { new: true }
    );
    // Enviamos el post actualizado como respuesta
    res.json(updatedPost);
};
// Exportamos el router para poder usarlo en index.js
export default router;