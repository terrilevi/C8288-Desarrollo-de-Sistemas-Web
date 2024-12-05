
### Proyecto 1: Plataforma social interactiva en tiempo real

####  **Introducción**

En la era digital actual, las plataformas sociales se han convertido en pilares fundamentales para la interacción y comunicación entre individuos a nivel global. La capacidad de conectar, compartir y colaborar en tiempo real ha redefinido la manera en que las personas se relacionan y construyen comunidades. El **proyecto: plataforma social interactiva en tiempo real** tiene como objetivo desarrollar una aplicación web social que facilite la interacción entre usuarios a través de perfiles personalizados, permitiendo la creación de cuentas, la adición de amigos, la publicación de contenido etiquetado y la respuesta o reacción a dichas publicaciones. Además, se implementará un manejo de datos en tiempo real para enriquecer la experiencia del usuario y fomentar una comunicación dinámica y fluida.

---

#### **Entregable 1: Desarrollo de funcionalidades básicas de la plataforma social**

**Fecha de entrega**: 28 de noviembre

**Objetivo:** Crear una aplicación web funcional que permita la gestión de usuarios, la creación de perfiles, la adición de amigos y la publicación de contenido básico.

#### **1. Diseño e implementación de la base de datos**

- **Gestor de base de datos:** Utilizar **MongoDB** por su flexibilidad y facilidad de uso.
  
- **Modelado de datos simplificado:**
  
  - **Usuarios:**
    - `_id`: Identificador único.
    - `nombre`: Nombre completo.
    - `email`: Correo electrónico único.
    - `contraseña`: Contraseña cifrada.
    - `fechaRegistro`: Fecha de creación de la cuenta.
    - `listaAmigos`: Arreglo de IDs de amigos.
    - `perfil`: Información básica (foto, biografía).

  - **Publicaciones:**
    - `_id`: Identificador único.
    - `contenido`: Texto de la publicación.
    - `autor`: ID del usuario que crea la publicación.
    - `fechaCreacion`: Fecha y hora de creación.
    - `reacciones`: Número de "me gusta".

#### **2. Desarrollo del backend**

- **Tecnologías:** **Node.js** con **Express.js**.
  
- **Funcionalidades:**
  
  - **Autenticación:**
    - **Registro de usuarios:** `POST /api/auth/register`
    - **Login de usuarios:** `POST /api/auth/login` (emite JWT)

  - **Gestión de usuarios:**
    - **Obtener perfil:** `GET /api/users/:id`
    - **Actualizar perfil:** `PUT /api/users/:id`
  
  - **Amistades:**
    - **Enviar solicitud de amistad:** `POST /api/friendships`
    - **Aceptar solicitud:** `PUT /api/friendships/:id/accept`
    - **Rechazar Solicitud:** `PUT /api/friendships/:id/reject`
    - **Listar amigos:** `GET /api/friendships/:userId`

  - **Publicaciones:**
    - **Crear publicación:** `POST /api/posts`
    - **Obtener publicaciones:** `GET /api/posts`
    - **Reaccionar a publicación:** `POST /api/posts/:id/reactions`

- **Seguridad:**
  
  - **Hash de contraseñas:** Utilizar **bcrypt**.
  - **Validación de datos:** Usar **Joi** para validar entradas.
  - **Autorización:** Proteger rutas con **JWT**.

#### **3. Desarrollo del frontend**

- **Tecnologías:** **React** para una interfaz de usuario interactiva.
  
- **Componentes clave:**
  
  - **Registro y login:**
    - Formularios para crear cuenta e iniciar sesión.
    - Validación básica de campos.

  - **Perfil de usuario:**
    - Visualización y edición de información básica.
    - Lista de amigos con opción para agregar nuevos.

  - **Feed de publicaciones:**
    - Mostrar publicaciones de amigos.
    - Crear nuevas publicaciones.
    - "Me gusta" en publicaciones.

#### **4. Integración y pruebas básicas**

- **Integración frontend y backend:** Asegurar que las solicitudes desde el frontend se comuniquen correctamente con el backend.
  
- **Pruebas funcionales:**
  - Verificar el registro y login de usuarios.
  - Comprobar la adición de amigos.
  - Validar la creación y visualización de publicaciones.

#### **5. Documentación básica**

- **Guía de instalación:** Instrucciones para configurar el entorno de desarrollo.
  
- **Manual de uso:** Descripción de las funcionalidades implementadas.

---

### **Entregable 2: Funcionalidades avanzadas y mejoras en tiempo real**

**Fecha de entrega**:  5 de diciembre

**Objetivo:** Incorporar características avanzadas que mejoren la interacción entre usuarios y añadir funcionalidades en tiempo real para una experiencia más dinámica.

#### **1. Implementación de datos en tiempo real**

- **Tecnología:** **Socket.IO** para habilitar la comunicación en tiempo real.
  
- **Funcionalidades:**
  
  - **Notificaciones de amistad:**
    - Notificar en tiempo real cuando un usuario recibe una solicitud de amistad.
  
  - **Actualización del feed:**
    - Actualizar el feed de publicaciones en tiempo real cuando un amigo crea una nueva publicación.

  - **Reacciones en tiempo real:**
    - Actualizar el conteo de "me gusta" en las publicaciones en tiempo real.

#### **2. Mejoras en la interacción de usuarios**

- **Sistema de reacciones mejorado:**
  - Permitir diferentes tipos de reacciones.
  
- **Comentarios básicos:**
  - Añadir la posibilidad de comentar en publicaciones, manteniendo la simplicidad.

#### **3. Mejoras en el frontend**

- **Interfaz mejorada:**
  - Añadir elementos visuales para notificaciones en tiempo real.
  - Mejorar la experiencia de usuario con actualizaciones dinámicas.

- **Manejo de estado:**
  - Utilizar **Redux** (para React) para gestionar el estado de la aplicación de manera más eficiente.

#### **4. Pruebas y documentación adicional**

- **Pruebas de integración:**
  - Asegurar que las nuevas funcionalidades en tiempo real funcionan correctamente.
  
- **Documentación extendida:**
  - Incluir detalles sobre la implementación de Socket.IO y Redis.
  - Actualizar el manual de uso con las nuevas funcionalidades.

#### **Resumen de tecnologías utilizadas**

- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt, Joi, Socket.IO
- **Frontend:** React, Redux, Socket.IO-client

