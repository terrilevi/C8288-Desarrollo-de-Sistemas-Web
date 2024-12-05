import express from 'express';
import { signin, signup, sendFriendRequest, updateProfile,  getFriendRequests, acceptFriendRequest, rejectFriendRequest, getFriends } from '../controllers/user.js';
import { validateSignup } from '../middleware/validate.js';
import auth from '../middleware/auth.js';


const router = express.Router();

// 1. Rutas de Autenticación

// Ruta para inicio de sesión
// Estructura: POST /user/signin
router.post('/signin', signin);
// No necesita validación porque la hace el controlador (MEJORAR DEFINITIVAMENTE XD)
// No necesita auth porque es para usuarios no autenticados

// Ruta para registro
// Estructura: POST /user/signup
router.post('/signup', validateSignup, signup);
// validateSignup verifica:
// - Formato de email
// - Fortaleza de contraseña
// - Coincidencia de contraseñas
// - Longitud de nombres

// 2. Rutas de Solicitudes de Amistad

// Enviar solicitud de amistad
// Estructura: POST /user/friend-request/:id
router.post('/friend-request/:id', auth, sendFriendRequest);
// :id es el ID del usuario a quien se envía la solicitud
// auth asegura que el remitente está autenticado

// Obtener solicitudes pendientes
// Estructura: GET /user/friend-requests
router.get('/friend-requests', auth, getFriendRequests);
// auth identifica de qué usuario obtener las solicitudes

// Aceptar solicitud de amistad
// Estructura: POST /user/friend-request/:id/accept
router.post('/friend-request/:id/accept', auth, acceptFriendRequest);
// :id es el ID de la solicitud (no del usuario)

// Rechazar solicitud de amistad
// Estructura: POST /user/friend-request/:id/reject
router.post('/friend-request/:id/reject', auth, rejectFriendRequest);
// Similar a accept, pero elimina la solicitud

// 3. Rutas de Amigos y Perfil

// Obtener lista de amigos
// Estructura: GET /user/friends
router.get('/friends', auth, getFriends);
// auth identifica de qué usuario obtener los amigos

// Actualizar perfil
// Estructura: PATCH /user/profile
router.patch('/profile', auth, updateProfile);
// PATCH porque es una actualización parcial
// auth identifica qué perfil actualizar

export default router;