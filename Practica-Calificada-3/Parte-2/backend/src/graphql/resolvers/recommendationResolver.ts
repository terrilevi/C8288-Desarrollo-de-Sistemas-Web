import { RecommendationService } from '../../services/recommendationService';
import { UserRating, Recommendation } from '../../types';

export const resolvers = {
  Query: {
    getRecommendations: async (
      _: any,
      { ratings }: { ratings: UserRating[] },
      { recommendationService }: { recommendationService: RecommendationService }
    ): Promise<Recommendation[]> => {
      if (!ratings || ratings.length === 0) {
        throw new Error('El campo ratings no puede estar vacío'); // Forzar un error
      }
      return await recommendationService.getRecommendations(ratings);
    },
  },
};
