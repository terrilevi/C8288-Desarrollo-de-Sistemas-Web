import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import connectDB from './db/connect';
import { RecommendationService } from './services/recommendationService';
import { typeDefs } from './graphql/schema/typesDefs';
import { resolvers } from './graphql/resolvers/recommendationResolver';
import dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config();
    const app = express();

    // Conectar a MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || '';
    if (!MONGODB_URI) {
        throw new Error('MongoDB URI no encontrada en variables de entorno');
    }

    await connectDB(MONGODB_URI);

    if (!mongoose.connection || !mongoose.connection.db) {
        throw new Error('La conexión a MongoDB no está disponible');
    }

    const ratingsCollection = mongoose.connection.db.collection('ratings');
    const recommendationService = new RecommendationService(ratingsCollection);

    // Crear el servidor Apollo
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    // Iniciar el servidor Apollo
    await server.start();

    // Middleware
    app.use(cors());
    app.use(json());

    // Ruta GraphQL
    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async () => ({
                recommendationService,
            }),
        })
    );

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server listo ennn http://localhost:${PORT}/graphql`);
    });
}

bootstrap().catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
});