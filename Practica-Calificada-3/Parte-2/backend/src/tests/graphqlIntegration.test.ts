import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import request from 'supertest';
import { typeDefs } from '../graphql/schema/typesDefs';
import { resolvers } from '../graphql/resolvers/recommendationResolver';
import { RecommendationService } from '../services/recommendationService';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Collection } from 'mongodb';

// Configuración para usar una base de datos en memoria
let mongoServer: MongoMemoryServer;
let collection: Collection;
let recommendationService: RecommendationService;

// Configuración del servidor GraphQL
let app: express.Application;

beforeAll(async () => {
  // Inicializar MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('ratings');
  collection = db.collection('ratings');

  // Insertar datos simulados
  await collection.insertMany([
    { user_id: 'U001', song_id: 'S1', title: 'Song 1', genre: 'pop', rating: 1 },
    { user_id: 'U001', song_id: 'S2', title: 'Song 2', genre: 'rock', rating: 0 },
    { user_id: 'U002', song_id: 'S1', title: 'Song 1', genre: 'pop', rating: 1 },
    { user_id: 'U002', song_id: 'S3', title: 'Song 3', genre: 'pop', rating: 1 },
  ]);

  // Crear instancia del servicio
  recommendationService = new RecommendationService(collection);

  // Configurar ApolloServer y Express
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ recommendationService }),
  });

  await server.start();
  app = express();
  server.applyMiddleware({ app });
});

afterAll(async () => {
  // Cerrar MongoDB en memoria
  await mongoServer.stop();
});

describe('GraphQL API Integration Tests', () => {
  it('should return recommendations for valid ratings input', async () => {
    const query = `
      query GetRecommendations($ratings: [RatingInput!]!) {
        getRecommendations(ratings: $ratings) {
          song_id
          title
          genre
          score
        }
      }
    `;

    const variables = {
      ratings: [
        { song_id: 'S1', rating: 1 },
        { song_id: 'S2', rating: 0 },
      ],
    };

    const response = await request(app)
      .post('/graphql')
      .send({ query, variables });

    expect(response.status).toBe(200); // Verificar que el estado HTTP sea 200
    expect(response.body.data).toBeDefined();
    expect(response.body.data.getRecommendations).toHaveLength(1);
    expect(response.body.data.getRecommendations[0]).toEqual({
      song_id: 'S3',
      title: 'Song 3',
      genre: 'pop',
      score: expect.any(Number),
    });
  });
});