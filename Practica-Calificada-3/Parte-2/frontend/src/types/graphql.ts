export interface Recommendation {
    song_id: string;
    title: string;
    genre: string;
    score: number;
  }
  
  export interface Rating {
    song_id: string;
    rating: number;
  }
  
  export interface RecommendationsData {
    getRecommendations: Recommendation[];
  }
  
  export interface RecommendationsVars {
    ratings: Rating[];
  }
  