// despues de haber instalado nuestras primeras dependencias
// npm install body parser cors express mongoose, podemos:
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


// despues de crear nuestra carpeta rutas debemos instalar:
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
// Inicializar una instancia de app express, es que estoy creando el servidor express


import swaggerUi from 'swagger-ui-express'; // Import Swagger UI middleware
import swaggerDocs from './swaggerConfig.js';

// Creamos la aplicación Express
// Esta será la base de nuestro servidor
const app = express ()


// Dudas resueltas:
// app.use se usa para registrar middleware en express. un middleware es una funcion
// que se ejecuta cada vez que llega una solicitud al servidor
// cada vez que el servidor recibe una solicitud HTTP, antes de pasarla a las rutas o just
// responder, se ejecutan los middlewares registrados con app.use

// Configuración de Middlewares
// Los middlewares se ejecutan en orden para CADA petición

// 1. bodyParser.json()
// - Parsea el cuerpo de las peticiones con Content-Type: application/json
// - Convierte el JSON recibido en un objeto JavaScript
// - Lo hace disponible en req.body
app.use(bodyParser.json()) 
// 2. bodyParser.urlencoded
// - Parsea datos enviados en formularios 
// - extended: true permite objetos anidados
app.use(bodyParser.urlencoded({extended:true}))
// 3. cors()
// - Habilita Cross-Origin Resource Sharing
// - Permite que el frontend en localhost:3000 haga peticiones al backend en localhost:5000
// - Añade los headers necesarios para evitar errores CORS
app.use(cors());


// Configuración de Rutas
// Cada app.use monta un router en una ruta específica
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Documentación API con Swagger(en proceso todavia implementadolo...)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 



// ahora si podemos conectar el backend a la bd
// usaremos mongodb atlas, o sea ellos hostearan mi db en su nubecita

// Usa el puerto definido en .env o 5000 como fallback
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`El servidor corre en: ${PORT}`)))
    .catch((error) => console.log(error.message));








/*
Flujo de una petición típica:
1. Cliente hace POST a /posts/
  {
    "message": "Nuevo post"
  }

2. La petición pasa por los middlewares en orden:
  a. cors() -> Añade headers CORS
  b. bodyParser.json() -> Parsea el JSON a objeto
  c. bodyParser.urlencoded() -> No hace nada (no es form-data)

3. Llega a app.use('/posts', postRoutes)
  - Coincide con la ruta '/posts'
  - Se pasa al router de posts

4. En el router de posts:
  - Coincide con POST '/'
  - Pasa por middleware auth
  - Pasa por middleware validatePost
  - Llega al controlador createPost

5. El controlador:
  - Crea el post en MongoDB
  - Envía respuesta al cliente
*/