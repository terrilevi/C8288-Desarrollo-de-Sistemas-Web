import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  // Campo para el nombre del usuario
  name: { 
      type: String,      
      required: true     
  },
  
  // Campo para el email del usuario
  email: { 
      type: String,      
      required: true     
  },
  
  // Campo para la contraseña (ya hasheada)
  password: { 
      type: String,      
      required: true     // Obligatorio
  },
  
  // Array de solicitudes de amistad pendientes
  friendRequests: [{
      // Campo 'from' que referencia a otro usuario
      from: { 
          type: mongoose.Schema.Types.ObjectId,  // Tipo especial para IDs de MongoDB
          ref: 'User'                           // Referencia al modelo 'User'
          // ref: 'User' permite usar populate() para obtener los datos completos
          // del usuario que envió la solicitud
      },
      // Timestamp de cuándo se creó la solicitud
      createdAt: { 
          type: Date,              // Tipo fecha
          default: Date.now        // Valor por defecto: fecha actual
      }
  }],
  
  // Array de amigos (usuarios que ya aceptaron la solicitud)
  friends: [{
      type: mongoose.Schema.Types.ObjectId,  // ID de MongoDB
      ref: 'User'                           // Referencia al modelo 'User'
      // Esto también permite usar populate() para obtener los datos
      // completos de cada amigo
  }]
});

export default mongoose.model("User", userSchema);
