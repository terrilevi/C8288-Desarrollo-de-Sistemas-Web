import express from 'express';
import { getPosts, createPost, likePost, deletePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
import { validatePost } from '../middleware/validate.js';



// Rutas para operaciones relacionadas con posts
// Este archivo define todas las rutas que manejan las operaciones CRUD de posts

const router = express.Router();

// Definición de rutas para posts:

// 1. Ruta GET para obtener todos los posts
// Estructura: GET /posts/
router.get('/', getPosts);
// No necesita auth porque los posts son públicos
// Cuando alguien hace GET a /posts, se ejecuta getPosts

// 2. Ruta POST para crear un nuevo post
// Estructura: POST /posts/
router.post('/', auth, validatePost, createPost);
// Aquí vemos un ejemplo de middleware en cadena:
// 1. auth: verifica que el usuario esté autenticado
// 2. validatePost: valida que el contenido del post sea válido
// 3. createPost: finalmente crea el post
// Si cualquiera falla, la cadena se interrumpe

// 3. Ruta DELETE para eliminar un post
// Estructura: DELETE /posts/:id
router.delete('/:id', auth, deletePost);
// :id es un parámetro de ruta (route parameter)
// Ejemplo: DELETE /posts/123 (123 es el ID)
// auth asegura que solo usuarios autenticados puedan eliminar

// 4. Ruta PATCH para dar/quitar like a un post
// Estructura: PATCH /posts/:id/likePost
router.patch('/:id/likePost', auth, likePost);
// PATCH se usa para modificaciones parciales
// auth asegura que solo usuarios autenticados puedan dar like

export default router;

