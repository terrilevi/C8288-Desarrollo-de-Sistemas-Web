import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

import { io } from '../index.js';               // Añade esta línea
import User from '../models/user.js';           // También necesitaremos esto

const router = express.Router();

// Definimos nuestros controladores para las rutas de posts

// CONTROLADOR PARA OBTENER POSTS
// Este controlador obtiene todos los posts y añade información sobre solicitudes de amistad
export const getPosts = async (req, res) => {
    try {
        // OBTENCIÓN DE POSTS
        
        // Obtenemos todos los posts de la base de datos
        // find() sin argumentos retorna todos los documentos de la colección
        const postMessages = await PostMessage.find();
        
        // Obtenemos el ID del usuario de la request
        const userId = req.userId;

        // Si hay un usuario autenticado, necesitamos información adicional
        if (userId) {
            // Buscamos usuarios que han recibido solicitudes de amistad del usuario actual
            const receivingUsers = await User.find({
                'friendRequests.from': userId  // Búsqueda en subdocumentos
            });

            // Extraemos y convertimos los IDs a string para comparaciones
            const sentRequestUserIds = receivingUsers.map(user => 
                user._id.toString()
            );

            // Añadimos el campo hasSentRequest a cada post
            const postsWithRequestStatus = postMessages.map(post => ({
                ...post._doc,  // Spread del documento Mongoose
                // Verificamos si ya se envió solicitud al creador del post
                hasSentRequest: sentRequestUserIds.includes(post.creator)
            }));

            // Enviamos los posts con la información adicional
            res.status(200).json(postsWithRequestStatus);
        } else {
            // Si no hay usuario autenticado, enviamos solo los posts
            res.status(200).json(postMessages);
        }
    } catch (error) {
        // Si hay error, enviamos código 404 con el mensaje
        res.status(404).json({ message: error.message });
    }
};



// CONTROLADOR PARA CREAR POSTS
// Maneja la creación de nuevos posts
export const createPost = async (req, res) => {
    // Obtenemos los datos del post del cuerpo de la request
    const post = req.body;
    // Verificamos autenticación
    if (!req.userId) {
        return res.status(401).json({ message: 'no autenticado' });
    }

    try {
        // Creamos una nueva instancia del modelo PostMessage
        const newPostMessage = new PostMessage({ 
            ...post, 
            creator: req.userId,  
            createdAt: new Date().toISOString() 
        });
        // Guardamos el post en la base de datos
        await newPostMessage.save();
        // Emitimos el post actualizado a todos los clientes
        io.emit('newPost', newPostMessage);
        res.status(201).json(newPostMessage);
    } catch (error) {
        console.error('Error al crear post:', error);
        res.status(409).json({ message: error.message });
    }
};


// Controlador para eliminar posts
export const deletePost = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`no hay posts con id: ${id}`);

    await PostMessage.findByIdAndDelete(id);
    res.json({ message: "post borrado satisfactoriamente" });
};


// CONTROLADOR DE LIKES
// Maneja la funcionalidad de dar/quitar like a un post
export const likePost = async (req, res) => {
    // Extraemos el ID del post de los parámetros de la URL
    const { id } = req.params;

    // VALIDACIONES INICIALES
    
    // Verificamos si hay un usuario autenticado
    if (!req.userId) {
        return res.json({ message: 'no autenticado' });
    }

    // Verificamos si el ID del post es válido según el formato de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`no hay posts con id:${id}`);
    }

    try {
        // OBTENCIÓN Y VALIDACIÓN DEL POST
        
        // Buscamos el post en la base de datos
        const post = await PostMessage.findById(id);
        
        // Si no encontramos el post, retornamos error 404
        if (!post) {
            return res.status(404).send('Post no encontrado');
        }

        // LÓGICA DE TOGGLE LIKE
        
        // Buscamos si el usuario ya dio like al post
        // findIndex retorna el índice del elemento o -1 si no lo encuentra
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // Si el usuario no había dado like, lo añadimos
            post.likes.push(req.userId);
        } else {
            // Si ya había dado like, lo quitamos usando filter
            // filter crea un nuevo array excluyendo el ID del usuario actual
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        // ACTUALIZACIÓN EN LA BASE DE DATOS
        
        // Actualizamos el post con los likes modificados
        // { new: true } hace que retorne el documento actualizado
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id,
            post,
            { new: true }
        );

        // NOTIFICACIÓN EN TIEMPO REAL
        
        // Emitimos el post actualizado a todos los clientes
        io.emit('postUpdate', updatedPost);

        // Enviamos el post actualizado como respuesta
        res.json(updatedPost);

    } catch (error) {
        // MANEJO DE ERRORES
        console.error('Error en likePost:', error);
        res.status(500).json({ message: error.message });
    }
};

// CONTROLADOR DE REACCIONES "HAHA"
// Similar al controlador de likes, pero maneja reacciones de tipo "haha"
export const hahaReact = async (req, res) => {
    const { id } = req.params;

    // Las validaciones son idénticas al controlador de likes
    if (!req.userId) {
        return res.json({ message: 'no autenticado' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`no hay posts con id:${id}`);
    }

    try {
        const post = await PostMessage.findById(id);
        if (!post) {
            return res.status(404).send('Post no encontrado');
        }

        // La lógica es similar, pero usamos el array hahaReactions
        const index = post.hahaReactions.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.hahaReactions.push(req.userId);
        } else {
            post.hahaReactions = post.hahaReactions.filter(
                (id) => id !== String(req.userId)
            );
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(
            id,
            post,
            { new: true }
        );

        // Notificación en tiempo real del cambio
        io.emit('postUpdate', updatedPost);
        res.json(updatedPost);

    } catch (error) {
        console.error('Error en hahaReact:', error);
        res.status(500).json({ message: error.message });
    }
};

// CONTROLADOR DE COMENTARIOS
// Maneja la adición de comentarios a un post
export const commentPost = async (req, res) => {
    // Extraemos el ID del post y el contenido del comentario
    const { id } = req.params;
    const { content } = req.body;

    // Verificación de autenticación
    if (!req.userId) {
        return res.status(401).json({ message: 'no autenticado' });
    }

    try {
        // Buscamos el post a comentar
        const post = await PostMessage.findById(id);
        
        if (!post) {
            return res.status(404).send(`no hay posts con id: ${id}`);
        }

        // Creamos el objeto de comentario
        const newComment = {
            content,                              // Contenido del comentario
            creator: req.userId,                  // ID de quien comenta
            name: req.body.name,                  // Nombre de quien comenta
            createdAt: new Date().toISOString()   // Timestamp del comentario
        };

        // Añadimos el comentario al array de comentarios del post
        post.comments.push(newComment);

        // Actualizamos el post en la base de datos
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id, 
            post, 
            { new: true }
        );

        // Enviamos el post actualizado como respuesta
        res.json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: 'algo está generando error' });
    }
};
