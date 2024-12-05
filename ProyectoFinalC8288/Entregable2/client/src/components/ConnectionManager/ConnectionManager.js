// Importamos el hook useEffect que nos permite ejecutar efectos secundarios en componentes
import { useEffect } from 'react';
// Importamos el servicio de socket que maneja las conexiones en tiempo real
import { socketService } from '../../services/socket';

// ConnectionManager es un componente funcional que maneja la conexión del socket
// Su único propósito es mantener la conexión del socket activa cuando la app inicia
const ConnectionManager = () => {
    // useEffect se usa para ejecutar código cuando el componente se monta
    // El array vacío [] como segundo argumento significa que solo se ejecuta una vez
    useEffect(() => {
        // Intentamos obtener el perfil del usuario del localStorage
        // localStorage.getItem('profile') busca datos guardados bajo la clave 'profile'
        // Estos datos fueron guardados durante el login/signup
        const profile = localStorage.getItem('profile');
        
        // Verificamos si existe un perfil guardado
        // Si no hay perfil, el usuario no está autenticado
        if (profile) {
            // Si hay perfil, lo convertimos de string JSON a objeto JavaScript
            // profile es un string porque localStorage solo almacena strings
            // JSON.parse convierte ese string en un objeto utilizable
            const user = JSON.parse(profile);
            
            // Conectamos el socket usando el ID del usuario
            // user.result._id es el ID único del usuario
            // Esta conexión permite recibir actualizaciones en tiempo real
            socketService.connect(user.result._id);
        }
    }, []); // El array vacío significa que este efecto solo se ejecuta al montar

    // Este componente no necesita renderizar nada en la UI
    // Su único propósito es manejar la conexión del socket
    // return null es válido en React y significa que no se renderiza nada
    return null;
};

// Exportamos el componente para poder importarlo en App.js
export default ConnectionManager;

// El flujo es:
// 1. App.js renderiza ConnectionManager
// 2. El componente se monta y useEffect se ejecuta
// 3. Se busca el perfil en localStorage
// 4. Si hay perfil:
//    - Se parsea el JSON
//    - Se extrae el ID del usuario
//    - Se conecta el socket con ese ID
// 5. El socket queda conectado y listo para:
//    - Recibir actualizaciones de posts
//    - Recibir nuevas solicitudes de amistad
//    - Recibir jajas o likes xd
