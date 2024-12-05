import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import PostMessage from '../models/postMessage.js'; 

import { io } from '../index.js';  // Añadir esta línea


// Controlador para el proceso de inicio de sesión
// Es una función asíncrona que maneja la petición (req) y respuesta (res)
export const signin = async (req, res) => {
  // Extraemos email y password del cuerpo de la petición usando destructuring
  // req.body contiene los datos que el cliente envió en formato JSON
  // { email, password } = req.body es equivalente a:
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body;

  try {
    // Buscamos si existe un usuario con ese email
    // User.findOne({ email }) es equivalente a User.findOne({ email: email })
    // findOne retorna el primer documento que coincida o null si no encuentra nada
    const existingUser = await User.findOne({ email });
    // Si no encontramos el usuario, retornamos un error 404 (Not Found)
    // return aquí detiene la ejecución de la función
    if (!existingUser) 
      return res.status(404).json({ message: "usuario no existe" });
    
    // Verificamos si la contraseña es correcta
    // bcrypt.compare:
    // - Toma la contraseña sin encriptar (password)
    // - La compara con la contraseña encriptada (existingUser.password)
    // - Retorna true si coinciden, false si no
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    // Si la contraseña no es correcta, retornamos error 400 (Bad Request)
    if (!isPasswordCorrect) 
      return res.status(400).json({ message: "credenciales invalidas" });
    // Si llegamos aquí, el usuario existe y la contraseña es correcta
    // Creamos un token JWT que contendrá la información del usuario
    // jwt.sign toma tres argumentos:
    // - Payload: datos que queremos incluir en el token ({ email, id })
    // - Secret: clave secreta para firmar el token (process.env.JWT_SECRET)
    // - Opciones: como expiresIn que define cuánto tiempo será válido el token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Enviamos la respuesta exitosa (status 200)
    // Incluimos:
    // - result: datos del usuario
    // - token: JWT que el cliente usará para futuras peticiones
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'algo está generando error' });
  }
};

// Controlador para el proceso de registro
export const signup = async (req, res) => {
    // Extraemos todos los campos necesarios del cuerpo de la petición
    // Usamos destructuring para obtener cada campo individualmente
    const { email, password, confirmPassword, firstName, lastName } = req.body;
  
    try {
      // Verificamos si ya existe un usuario con ese email
      // Esto evita tener usuarios duplicados en la base de datos
      const existingUser = await User.findOne({ email });
      // Si existe, retornamos error 400 (Bad Request)
      if (existingUser)
        return res.status(400).json({ message: "el usuario ya EXISTE" });
      // Verificamos si las contraseñas coinciden
      if (password !== confirmPassword)
        return res.status(400).json({ message: "las contraseñas no coinciden" });
      // Si llegamos aquí, podemos crear el usuario
      // Primero encriptamos la contraseña usando bcrypt
      // bcrypt.hash toma:
      // - La contraseña a encriptar
      // - El número de rondas de salting.(deberia cambiarlo a otros?? analizarlo despues)
      const hashedPassword = await bcrypt.hash(password, 12);
      // Creamos el nuevo usuario en la base de datos
      // User.create es un método que:
      // - Crea una nueva instancia del modelo User
      // - La guarda en la base de datos
      // - Retorna el documento creado
      const result = await User.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`, // Concatenamos el nombre completo
      });
      // Creamos un token JWT para el nuevo usuario
      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      // Enviamos la respuesta exitosa con el usuario creado y su token
      res.status(200).json({ result, token });
    } catch (error) {
      // Manejamos cualquier error que pueda ocurrir
      res.status(500).json({ message: 'algo está generando error' });
    }
  };
  

// Este controlador maneja el proceso de enviar solicitudes de amistad entre usuarios

// Definimos y exportamos una función asíncrona que manejará las solicitudes de amistad
// req: objeto Request de Express que contiene toda la información de la petición
// res: objeto Response de Express que usaremos para enviar respuestas al cliente
export const sendFriendRequest = async (req, res) => {
  // Extraemos el ID del receptor de los parámetros de la URL usando destructuring
  // La sintaxis { id: receiverId } renombra 'id' a 'receiverId' para mayor claridad
  const { id: receiverId } = req.params;

  try {
      // VALIDACIONES INICIALES
      
      // 1. Verificamos si hay un usuario autenticado
      // req.userId fue añadido por el middleware de autenticación
      if (!req.userId) {
          // Si no hay usuario autenticado, retornamos error 401 (Unauthorized)
          return res.status(401).json({ message: 'no autenticado' });
      }

      // 2. Verificamos si se proporcionó un ID de receptor
      if (!receiverId) {
          // Si no hay ID de receptor, retornamos error 400 (Bad Request)
          return res.status(400).json({ message: 'el receiver id es requerido' });
      }

      // 3. Verificamos que el usuario no intente enviarse una solicitud a sí mismo
      if (req.userId === receiverId) {
          // Si los IDs son iguales, retornamos error 400 (Bad Request)
          return res.status(400).json({ 
              message: "no puedes enviarte solicitudes a ti mismo" 
          });
      }

      // BÚSQUEDA DE USUARIOS EN LA BASE DE DATOS
      
      // Buscamos al receptor y al remitente en la base de datos
      // findById es un método de Mongoose que busca documentos por su _id
      // await espera a que estas operaciones asíncronas se completen
      const receiver = await User.findById(receiverId);
      const sender = await User.findById(req.userId);

      // VALIDACIONES DE EXISTENCIA DE USUARIOS
      
      // Verificamos si el receptor existe
      if (!receiver) {
          return res.status(404).json({ message: "receptor no existe" });
      }

      // Verificamos si el remitente existe
      if (!sender) {
          return res.status(404).json({ message: "remitente no existe" });
      }

      // VALIDACIONES DE ESTADO DE LA SOLICITUD
      
      // Buscamos si ya existe una solicitud pendiente
      // find busca en el array friendRequests un elemento que cumpla la condición
      const existingRequest = receiver.friendRequests.find(
          // Convertimos los ObjectId a String para poder compararlos
          request => String(request.from) === String(req.userId)
      );

      // Si ya existe una solicitud, retornamos error
      if (existingRequest) {
          return res.status(400).json({ 
              message: "ya se envio una solicitud de amistad" 
          });
      }

      // Verificamos si los usuarios ya son amigos
      // includes verifica si el ID del remitente está en el array de amigos
      if (receiver.friends.includes(req.userId)) {
          return res.status(400).json({ 
              message: "los usuarios son amigos" 
          });
      }

      // CREACIÓN DE LA SOLICITUD DE AMISTAD
      
      // Añadimos la nueva solicitud al array de solicitudes del receptor
      receiver.friendRequests.push({ from: req.userId });
      // Guardamos los cambios en la base de datos
      await receiver.save();

      // NOTIFICACIÓN EN TIEMPO REAL
      
      // Buscamos al receptor nuevamente pero esta vez "poblamos" los datos
      // populate reemplaza las referencias con los documentos completos
      const populatedReceiver = await User.findById(receiverId)
          .populate({
              path: 'friendRequests.from',  // Campo a poblar
              select: 'name email'          // Campos a incluir
          });

      // Emitimos un evento de Socket.IO para notificar al receptor
      // to() envía el evento solo a un usuario específico
      io.to(`user:${receiverId}`).emit(
          'friendRequestUpdate', 
          populatedReceiver.friendRequests
      );

      // RESPUESTA EXITOSA
      
      // Enviamos respuesta 200 (OK) con mensaje de éxito
      res.status(200).json({ 
          message: "solicitud de amistad enviada correctamente" 
      });

  } catch (error) {
      // MANEJO DE ERRORES
      
      // Si ocurre algún error, lo registramos en la consola
      console.error('Error en sendFriendRequest:', error);
      // Y enviamos error 500 (Internal Server Error) al cliente
      res.status(500).json({ message: error.message });
  }
};



  // Controlador para obtener todas las solicitudes de amistad del usuario actual
  export const getFriendRequests = async (req, res) => {
    try {
      // Primero verificamos si hay un usuario autenticado
      // Si no hay userId significa que la petición no pasó por el middleware auth
      // o que el token no era válido
      if (!req.userId) return res.status(401).json({ message: 'no autenticado' });
      // Buscamos al usuario y "poblamos" sus solicitudes de amistad
     // User.findById encuentra un usuario por su ID
     // .populate() es un método de Mongoose que:
     // - Busca los documentos referenciados en otra colección
     // - Reemplaza los IDs por los documentos completos
      const user = await User.findById(req.userId)
        .populate({
          // path: indica qué campo queremos poblar
          // En este caso, dentro de friendRequests, queremos poblar el campo 'from'
          path: 'friendRequests.from',
          // select: especifica qué campos queremos traer del documento poblado
          // Solo traemos 'name' y 'email' para minimizar datos transferidos
          select: 'name email'
        });
      // Enviamos las solicitudes de amistad como respuesta
      // user.friendRequests ahora contiene los objetos completos de los usuarios
      // en lugar de solo sus IDs
      res.status(200).json(user.friendRequests);
    } catch (error) {
      // Si algo sale mal, enviamos un error 
      res.status(500).json({ message: 'algo está generando error' });
    }
  };
  

  // Controlador para aceptar una solicitud de amistad
  export const acceptFriendRequest = async (req, res) => {
    // Extraemos el ID de la solicitud de los parámetros de la URL
    // Usamos destructuring y renombramos 'id' a 'requestId' para mayor claridad
    const { id: requestId } = req.params;
    
    try {
      // Verificamos autenticación
      if (!req.userId) return res.status(401).json({ message: 'no autenticado' });
      // Buscamos al usuario que está aceptando la solicitud
      const user = await User.findById(req.userId);

      // Buscamos la solicitud específica en el array de solicitudes del usuario
      // find() busca el primer elemento que cumpla la condición
      // Convertimos ambos IDs a string para poder compararlos correctamente
      const request = user.friendRequests.find(request => String(request._id) === requestId);
      // Si no encontramos la solicitud, retornamos error 404 (Not Found)
      if (!request)
        return res.status(404).json({ message: "no se encontró la solicitud de amistad" });

      // Si encontramos la solicitud, procedemos a hacer amigos a ambos usuarios
     
     // Primero, encontramos al usuario que envió la solicitud
      const sender = await User.findById(request.from);

      // Añadimos cada usuario a la lista de amigos del otro
     // push() añade el ID al array de amigos
      user.friends.push(request.from); // Añadimos el remitente a los amigos del receptor
      sender.friends.push(user._id); // Añadimos el receptor a los amigos del remitente
      
      // Eliminamos la solicitud de amistad ya que ha sido aceptada
      // filter() crea un nuevo array excluyendo la solicitud aceptada
      // Mantenemos todas las solicitudes excepto la que acabamos de aceptar
      user.friendRequests = user.friendRequests.filter(
        request => String(request._id) !== requestId
      );
      // Guardamos los cambios en la base de datos para ambos usuarios
      // save() guarda los cambios realizados en el documento
      await user.save(); // Guardamos cambios del receptor
      await sender.save(); // Guardamos cambios del remitente
      // Enviamos respuesta exitosa
      res.status(200).json({ message: "solicitud de amistad aceptada" });
    } catch (error) {
      res.status(500).json({ message: 'algo está generando error' });
    }
  };
  // Controlador para rechazar una solicitud de amistad
  export const rejectFriendRequest = async (req, res) => {
    // Extraemos el ID de la solicitud de los parámetros usando destructuring
    // { id: requestId } significa: toma el parámetro 'id' y guárdalo en una variable 'requestId'
    // Este ID viene de una URL
    const { id: requestId } = req.params;
    
    try {
      // Verificamos si hay un usuario autenticado mediante el token JWT
      // req.userId fue añadido por nuestro middleware de autenticación
      // Si no existe, significa que el usuario no está autenticado
      if (!req.userId) return res.status(401).json({ message: 'no autenticado' });
      
      // Buscamos al usuario que está rechazando la solicitud en la base de datos
      // findById es un método de Mongoose que busca un documento por su _id
      const user = await User.findById(req.userId);
      
    // Filtramos las solicitudes de amistad para eliminar la rechazada
     // filter() es un método de arrays que:
     // primero toma cada elemento del array
     // luego ejecuta una función para cada elemento
     // y puede pasar : 
     // Si la función retorna true, mantiene el elemento
     // Si retorna false, lo excluye
     //
     // En este caso:
     // - Convertimos los ObjectId a string para poder compararlos
     // - Mantenemos todas las solicitudes EXCEPTO la que estamos rechazando
      user.friendRequests = user.friendRequests.filter(
        request => String(request._id) !== requestId
      );
      // Guardamos los cambios en la base de datos
      // save() que:
      // - Valida el documento según el esquema
      // - Si es válido, guarda los cambios en la base de datos y si no es válido, lanza un error
      await user.save();
      // Enviamos respuesta exitosa al cliente
      res.status(200).json({ message: "solicitud de amistad rechazada" });
    } catch (error) {
      res.status(500).json({ message: 'algo está generando error' });
    }
  };

  // Controlador para obtener la lista de amigos del usuario
  export const getFriends = async (req, res) => {
    try {
      // Verificamos autenticación
      // Esta verificación es important para asegurar que solo usuarios
      // autenticados puedan ver listas de amigos
      if (!req.userId) return res.status(401).json({ message: 'no autenticado' });
      // Buscamos al usuario y poblamos su lista de amigos
      const user = await User.findById(req.userId)
        .populate('friends', 'name email');
       // El segundo parámetro 'name email' especifica qué campos queremos
       // Solo traemos el nombre y email de cada amigo, no toda su información
       
     // Enviamos la lista de amigos como respuesta
     // Ahora user.friends contiene objetos con name y email en lugar de solo IDs        
      res.status(200).json(user.friends);
    } catch (error) {
      res.status(500).json({ message: 'algo está generando error' });
    }
  };


  // Controlador para actualizar el perfil del usuario
  export const updateProfile = async (req, res) => {
    // Extraemos el nuevo nombre del cuerpo de la petición
    const { name } = req.body;
    // Obtenemos el ID del usuario del middleware de autenticación
    const userId = req.userId;
  
    try {
      // Verificamos autenticación
      if (!userId) return res.status(401).json({ message: 'Unauthenticated' });

      // Actualizamos el perfil del usuario
      // findByIdAndUpdate es un método que:
      // - Busca un documento por ID
      // - Aplica las actualizaciones especificadas
      // - Retorna el documento actualizado si { new: true }
      const updatedUser = await User.findByIdAndUpdate(
        userId, // ID del usuario a actualizar
        { name }, // Cambios a realizar ({ name: name })
        { new: true } // Opción para retornar el documento actualizado
      ); 
  
      // Actualizamos el nombre en todos los posts del usuario
      // updateMany actualiza múltiples documentos que cumplan la condición
      // En este caso, todos los posts donde creator === userId
      await PostMessage.updateMany(
        { creator: userId }, // Condición: posts creados por este usuario
        { name: name } // Cambio: actualizar el campo name
      );
  
     // Generamos un nuevo token JWT con la información actualizada
      // jwt.sign crea un nuevo token
      const token = jwt.sign(
        { 
          email: updatedUser.email, 
          id: updatedUser._id 
        },
        process.env.JWT_SECRET,  // Usamos la variable de entorno JWT_SECRET
        { expiresIn: '1h' }      // El token expirará en 1 hora
      );
  
      // Enviamos la respuesta exitosa al cliente
      // status(200) indica que la petición fue exitosa
      // json() envía los datos en formato JSON:
      // - result: contiene los datos actualizados del usuario
      // - token: nuevo JWT que el cliente usará para futuras peticiones
      res.status(200).json({ result: updatedUser, token });
    } catch (error) {
      res.status(500).json({ message: 'algo está generando error al actualizar el perfil' });
    }
  };