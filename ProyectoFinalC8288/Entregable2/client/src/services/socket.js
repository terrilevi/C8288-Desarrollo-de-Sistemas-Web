// Importamos la biblioteca socket.io-client usando la palabra clave 'io'
// socket.io-client permite crear conexiones de WebSocket para comunicación en tiempo real
// WebSocket mantiene una conexión abierta entre el cliente y el servidor, permitiendo 
// que ambos envíen mensajes en cualquier momento
import { io } from 'socket.io-client';

// Importamos las constantes que definen los tipos de acciones para Redux
// Estas constantes se usan cuando despachamos acciones para actualizar el estado
import { CREATE, LIKE, GET_FRIEND_REQUESTS } from '../constants/actionTypes';

// Declaramos dos variables a nivel de módulo (fuera de cualquier función)
// Estas variables estarán disponibles para todos los métodos del socketService
let store;    // Almacenará la referencia al store de Redux
let socket;   // Almacenará la instancia de la conexión Socket.IO

// Creamos y exportamos un objeto llamado socketService que contendrá todos los métodos
// relacionados con la gestión de sockets
export const socketService = {
    // Método init: Inicializa el servicio guardando la referencia al store de Redux
    // Este método se llama una sola vez cuando la aplicación arranca
    init: (reduxStore) => {
        // Guardamos el store que recibimos como parámetro en nuestra variable global
        store = reduxStore;
        // Ahora podemos usar store.dispatch() y store.getState() desde cualquier parte del servicio
    },

    // Método connect: Establece la conexión Socket.IO para un usuario específico
    // Se llama cada vez que un usuario inicia sesión
    connect: (userId) => {
        // Si ya existe una conexión socket previa
        if (socket) {
            // La desconectamos para evitar duplicados y fugas de memoria
            socket.disconnect();
        }

        // Creamos una nueva instancia de Socket.IO
        // io() crea una conexión al servidor especificado
        socket = io('http://localhost:5000', {
            autoConnect: false  // No conectar automáticamente al crear la instancia
        });

        // Iniciamos la conexión manualmente
        // Esto nos da más control sobre cuándo se establece la conexión
        socket.connect();
        
        // Configuramos el evento 'connect'
        // Este callback se ejecuta cuando la conexión se establece exitosamente
        socket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
            // Emitimos un evento 'authenticate' al servidor con el userId
            // Esto permite al servidor identificar quién es cada socket conectado
            socket.emit('authenticate', userId);
        });

        // Configuramos el manejador para nuevos posts
        // Este callback se ejecuta cuando el servidor emite un evento 'newPost'
        socket.on('newPost', (newPost) => {
            // Verificamos que tengamos acceso al store
            if (store) {
                // Obtenemos la lista actual de posts del estado de Redux
                const currentPosts = store.getState().posts;
                // Verificamos si el post ya existe en nuestra lista
                // some() retorna true si encuentra al menos un elemento que cumpla la condición
                const postExists = currentPosts.some(post => post._id === newPost._id);
                
                // Si el post no existe, lo añadimos al estado
                if (!postExists) {
                    // Despachamos una acción CREATE a Redux con el nuevo post
                    store.dispatch({ type: CREATE, payload: newPost });
                }
            }
        });

        // Configuramos el manejador para actualizaciones de posts
        // Este callback se ejecuta cuando alguien actualiza un post (ej: da like)
        socket.on('postUpdate', (updatedPost) => {
            if (store) {
                const currentPosts = store.getState().posts;
                // Verificamos si el post existe en nuestra lista
                const postExists = currentPosts.some(post => post._id === updatedPost._id);
                
                // Solo actualizamos si el post existe
                if (postExists) {
                    // Despachamos una acción LIKE a Redux con el post actualizado
                    store.dispatch({ type: LIKE, payload: updatedPost });
                }
            }
        });

        // Configuramos el manejador para actualizaciones de solicitudes de amistad
        // Este callback se ejecuta cuando recibimos una nueva solicitud
        socket.on('friendRequestUpdate', (requests) => {
            if (store) {
                // Despachamos una acción para actualizar las solicitudes en Redux
                store.dispatch({ type: GET_FRIEND_REQUESTS, payload: requests });
            }
        });

        // Configuramos el manejador para desconexiones
        // Este callback se ejecuta cuando perdemos conexión con el servidor
        socket.on('disconnect', () => {
            console.log('Desconectado del servidor de Socket.IO');
        });
    },

    // Método disconnect: Cierra la conexión Socket.IO
    // Se llama cuando el usuario cierra sesión
    disconnect: () => {
        // Si existe una conexión activa
        if (socket) {
            // La cerramos
            socket.disconnect();
            // Y limpiamos la referencia
            socket = null;
        }
    },

    // Método getSocket: Retorna la instancia actual del socket
    // Útil si necesitamos acceder al socket desde otros componentes
    getSocket: () => socket
};

// El flujo completo del sistema Socket.IO es:

// 1. INICIALIZACIÓN:
//    - Cuando la aplicación arranca, index.js llama a socketService.init(store)
//    - Esto guarda la referencia al store de Redux para poder usarla después

// 2. CONEXIÓN:
//    - Cuando un usuario inicia sesión, se llama a socketService.connect(userId)
//    - Se crea una nueva conexión Socket.IO al servidor
//    - Se configura todos los event listeners para diferentes tipos de eventos

// 3. DURANTE EL USO:
//    a) Cuando alguien crea un post:
//       - El servidor emite 'newPost'
//       - Todos los clientes conectados reciben el evento
//       - Verifican si ya tienen el post
//       - Si no lo tienen, lo añaden a su estado local

//    b) Cuando alguien da like:
//       - El servidor emite 'postUpdate'
//       - Todos los clientes reciben el post actualizado
//       - Actualizan su estado local si tienen ese post

//    c) Cuando alguien envía una solicitud de amistad:
//       - El servidor emite 'friendRequestUpdate'
//       - El destinatario recibe las solicitudes actualizadas
//       - Actualiza su lista de solicitudes pendientes

// 4. DESCONEXIÓN:
//    - Cuando el usuario cierra sesión, se llama a socketService.disconnect()
//    - Se cierra la conexión WebSocket
//    - Se limpia la referencia al socket

