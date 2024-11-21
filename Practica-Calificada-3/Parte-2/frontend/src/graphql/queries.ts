import { gql } from '@apollo/client';

export const GET_RECOMMENDATIONS = gql`
  query GetRecommendations($ratings: [RatingInput!]!) {
    getRecommendations(ratings: $ratings) {
      song_id
      title
      genre
      score
    }
  }
`;