import { Collection } from 'mongodb';
import { UserRating, UserVector, UserSimilarity, RecommendationScore, RatingDocument, Recommendation } from '../types';

export class RecommendationService {
    private ratingsCollection: Collection;

    constructor(ratingsCollection: Collection) {
        this.ratingsCollection = ratingsCollection;
    }

    private calculateCosineSimilarity(vector1: UserVector, vector2: UserVector): number {
        const songs = new Set([...Object.keys(vector1), ...Object.keys(vector2)]);
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;

        songs.forEach(song => {
            const rating1 = vector1[song] || 0;
            const rating2 = vector2[song] || 0;
            dotProduct += rating1 * rating2;
            norm1 += rating1 * rating1;
            norm2 += rating2 * rating2;
        });

        if (norm1 === 0 || norm2 === 0) return 0;
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    private createUserVector(ratings: UserRating[]): UserVector {
        return ratings.reduce((acc: UserVector, rating: UserRating) => {
            acc[rating.song_id] = rating.rating;
            return acc;
        }, {});
    }

    private async getAllRatings(): Promise<RatingDocument[]> {
        const allRatingsRaw = await this.ratingsCollection.find({}).toArray();
        return allRatingsRaw as unknown as RatingDocument[];
    }

    private createUserVectors(allRatings: RatingDocument[]): Record<string, UserVector> {
        const userVectors: Record<string, UserVector> = {};
        allRatings.forEach(rating => {
            if (rating.user_id && rating.song_id && typeof rating.rating === 'number') {
                if (!userVectors[rating.user_id]) {
                    userVectors[rating.user_id] = {};
                }
                userVectors[rating.user_id][rating.song_id] = rating.rating;
            }
        });
        return userVectors;
    }

    private calculateSimilarities(currentUserVector: UserVector, userVectors: Record<string, UserVector>): UserSimilarity[] {
        return Object.entries(userVectors)
            .map(([userId, vector]) => ({
                userId,
                similarity: this.calculateCosineSimilarity(currentUserVector, vector)
            }))
            .sort((a, b) => b.similarity - a.similarity);
    }

    async getRecommendations(ratings: UserRating[]): Promise<Recommendation[]> {
        try {
            console.log("1. Ratings recibidos:", ratings);

            const currentUserVector = this.createUserVector(ratings);
            console.log("2. Vector del usuario actual:", currentUserVector);

            const allRatings = await this.getAllRatings();
            console.log("3. Número total de ratings en BD:", allRatings.length);

            const userVectors = this.createUserVectors(allRatings);
            console.log("4. Número de usuarios encontrados:", Object.keys(userVectors).length);

            const similarities = this.calculateSimilarities(currentUserVector, userVectors);
            console.log("5. Top 3 usuarios similares:", similarities.slice(0, 3));

            const ratedSongIds = new Set(ratings.map(r => r.song_id));
            const recommendations = new Map<string, RecommendationScore>();

            // Usar los 5 usuarios más similares
            for (const { userId, similarity } of similarities.slice(0, 5)) {
                if (similarity > 0) {
                    const userVector = userVectors[userId];
                    Object.entries(userVector).forEach(([songId, rating]) => {
                        if (!ratedSongIds.has(songId) && rating > 0) {
                            const current = recommendations.get(songId) || { score: 0, count: 0 };
                            recommendations.set(songId, {
                                score: current.score + (rating * similarity),
                                count: current.count + 1
                            });
                        }
                    });
                }
            }

            console.log("6. Número de canciones recomendadas:", recommendations.size);

            const recommendedSongs = await Promise.all(
                Array.from(recommendations.entries())
                    .map(async ([songId, { score, count }]) => {
                        const song = await this.ratingsCollection.findOne({ song_id: songId }) as unknown as RatingDocument | null;
                        if (!song) {
                            console.log(`No se encontró la canción con song_id: ${songId}`);
                            return null;
                        }
                        return {
                            song_id: songId,
                            title: song.title,
                            genre: song.genre,
                            score: score / count
                        };
                    })
            );

            const topRecommendations = recommendedSongs
                .filter((song): song is NonNullable<typeof song> => song !== null)
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);

            console.log("7. Recomendaciones finales:", topRecommendations);
            return topRecommendations;

        } catch (error) {
            console.error('Error in recommendation service:', error);
            throw error;
        }
    }
}