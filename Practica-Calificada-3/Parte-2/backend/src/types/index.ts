export interface UserRating {
    song_id: string;
    rating: number;
}

export interface UserVector {
    [key: string]: number;
}

export interface UserSimilarity {
    userId: string;
    similarity: number;
}

export interface RecommendationScore {
    score: number;
    count: number;
}

export interface RatingDocument {
    _id?: string;
    user_id: string;
    song_id: string;
    title: string;
    genre: string;
    rating: number;
}

export interface Recommendation {
    song_id: string;
    title: string;
    genre: string;
    score: number;
}