# Proyecto 🐺
Aplicación de recomendaciones personalizadas usando aprendizaje automático simplificado

***Descripción:***
Construye una aplicación que ofrezca recomendaciones básicas (como productos o contenido)
basadas en un conjunto de datos estático utilizando un algoritmo sencillo de filtrado colaborativo
con una biblioteca como simple-recommender. Utiliza Next.js y React en el frontend, y Node.js con
TypeScript en el backend. Emplea MongoDB para almacenar datos de usuarios y preferencias predefinidas. Implementa una API GraphQL básica que devuelve recomendaciones estáticas. Escribe pruebas unitarias para el algoritmo de recomendación y pruebas de integración para la API con Jest.
Conteneriza todo con Docker, separando backend y frontend.
Desafío:
Implementar un algoritmo de recomendación sencillo, manejar datos estáticos de usuarios y asegurar la funcionalidad básica mediante pruebas.

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

