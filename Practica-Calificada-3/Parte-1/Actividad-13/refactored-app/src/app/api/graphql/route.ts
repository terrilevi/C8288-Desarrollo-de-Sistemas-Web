import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// Crear el manejador del servidor Apollo
const handler = startServerAndCreateNextHandler(server);

// Manejar solicitudes POST para consultas y mutaciones
export async function POST(request: Request) {
  return handler(request);
}

// Manejar solicitudes GET para habilitar el sandbox de GraphQL
export async function GET(request: Request) {
  return handler(request);
}

// Opcionalmente, manejar solicitudes OPTIONS para CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
