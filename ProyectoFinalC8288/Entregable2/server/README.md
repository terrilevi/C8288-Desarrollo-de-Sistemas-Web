# Guía de Instalación y Ejecución del Servidor

## Método 1: Instalación Local

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (viene incluido con Node.js)
- MongoDB instalado localmente o una cuenta en MongoDB Atlas

### Pasos de Instalación

1. Navega al directorio del servidor:
```bash
cd social-media-functional-first-part/server
```

2. Instala las dependencias:
```bash
npm install --legacy-peer-deps
```

3. Crea un archivo `.env` en el directorio `server` con las siguientes variables:
```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/social-media (es un ejemplo)
JWT_SECRET=tu_secreto_
```

Nota: Si usas MongoDB Atlas, reemplaza la URI con tu string de conexión.

4. Inicia el servidor:
```bash
npm start
```

El servidor estará corriendo en `http://localhost:5000`

### Verificación de la Instalación
- Para verificar que el servidor está funcionando:
  ```bash
  curl http://localhost:5000/posts
  ```
- Deberías ver una respuesta JSON (aunque esté vacía al principio)


## Método 2: Usando Docker

### Prerrequisitos
- Docker instalado
- Docker Compose instalado

### Pasos para Ejecutar con Docker

1. Navega al directorio raíz del proyecto donde está el `docker-compose.yml`

2. Ejecuta:
```bash
docker-compose up server
```

El servidor estará disponible en `http://localhost:5000`

### Comandos Docker Útiles
- Para ver los logs del servidor:
  ```bash
  docker-compose logs -f server
  ```
- Para reconstruir el contenedor:
  ```bash
  docker-compose build server
  ```
- Para detener todos los servicios:
  ```bash
  docker-compose down
  ```

## Notas Importantes
- El servidor necesita MongoDB para funcionar
- Asegúrate de que las variables de entorno estén correctamente configuradas
- Los logs del servidor mostrarán información útil sobre conexiones y errores
- El servidor implementa Socket.IO para actualizaciones en tiempo real
