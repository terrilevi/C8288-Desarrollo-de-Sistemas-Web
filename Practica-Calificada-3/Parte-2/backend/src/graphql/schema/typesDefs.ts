import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Recommendation {
    song_id: String!
    title: String!
    genre: String!
    score: Float!
  }

  input RatingInput {
    song_id: String!
    rating: Int!
  }

  type Query {
    getRecommendations(ratings: [RatingInput!]!): [Recommendation!]!
  }
`;