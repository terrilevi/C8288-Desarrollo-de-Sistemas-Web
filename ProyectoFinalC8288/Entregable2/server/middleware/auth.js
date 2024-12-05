import jwt from 'jsonwebtoken';

// Middleware de autenticación
// Este middleware verifica que cada petición a rutas protegidas 
// incluya un token JWT válido
const auth = async (req, res, next) => {
  try {
      // Intentamos obtener el token del header Authorization
      // req.headers.authorization contiene: "Bearer <token>"
      // 
      // - req.headers.authorization?: el ? es optional chaining
      //    Si authorization es undefined, evita el error
      // 
      // - split(" "): divide el string usando el espacio como separador
      //    "Bearer abc123" → ["Bearer", "abc123"]
      // 
      // - [1]: toma el segundo elemento del array (el token)
      const token = req.headers.authorization?.split(" ")[1];
      
      // Si no hay token en el header, respondemos con error 401 (Unauthorized)
      if (!token) {
          return res.status(401).json({ message: 'no auth token' });
      }

      // Verificamos y decodificamos el token
      // jwt.verify hace varias cosas:
      // - Verifica que el token no haya sido manipulado
      // - Verifica que no haya expirado
      // - Decodifica el payload del token
      // - Si algo falla, lanza un error que capturará el catch
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      
      // Añadimos el ID del usuario a la request
      // Este ID estará disponible en todos los controladores siguientes
      // El ? (optional chaining) previene errores si decodedData es null
      req.userId = decodedData?.id;

      // Verificación final: aseguramos que tenemos un userId
      // Esta verificación extra nos protege de tokens malformados
      if (!req.userId) {
          return res.status(401).json({ message: 'invalid token' });
      }

      // Si llegamos aquí, la autenticación fue exitosa
      // next() pasa el control al siguiente middleware o controlador
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Exportamos el middleware para usarlo en nuestras rutas
export default auth;

/* 
Ejemplito de cómo se usa este middleware en las rutas:

import auth from '../middleware/auth.js';

// Ruta protegida que requiere autenticación
router.get('/posts', auth, getPosts);

Flujo de una petición autenticada:
- Cliente envía petición con header:
 Authorization: "Bearer eyJhbGciOiJIUzI1NiIs..."

- El middleware auth:
 - Extrae el token
 - Lo verifica usando JWT_SECRET
 - Añade req.userId a la request
 - Pasa al siguiente controlador

- El controlador puede usar req.userId para:
 - Identificar al usuario
 - Filtrar datos por usuario
 - Verificar permisos
 - etc.
*/

