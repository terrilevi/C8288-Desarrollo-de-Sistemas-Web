# Instrucciones de Instalación y Ejecución

## Prerrequisitos
- Tener instalado [Docker](https://www.docker.com/get-started)
- Tener instalado [Docker Compose](https://docs.docker.com/compose/install/) (viene incluido con Docker Desktop para Windows y Mac)

## Configuración Inicial
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   MONGODB_URI=<tu-uri-real-de-mongodb>
   PORT=4000
   ```

## Ejecución
1. Iniciar los servicios con Docker Compose:
   ```bash
   docker-compose up
   ```
   - Para ejecutar en segundo plano: `docker-compose up -d`
   - Para reconstruir las imágenes: `docker-compose up --build`

2. Una vez iniciado, podrás acceder a:
   - Frontend: http://localhost:3000
   - Backend API (GraphQL): http://localhost:4000/graphql

