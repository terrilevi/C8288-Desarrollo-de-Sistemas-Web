import { useState } from "react";
import { useLazyQuery } from '@apollo/client';
import { songsList } from "../folder/songs";
import { GET_RECOMMENDATIONS } from '../graphql/queries';
import type { RecommendationsData, RecommendationsVars } from '../types/graphql';

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(
    Math.floor(Math.random() * songsList.length)
  );
  const [ratings, setRatings] = useState<{ song_id: string; rating: number }[]>([]);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [getRecommendations, { loading: isLoading, data }] = useLazyQuery<
    RecommendationsData,
    RecommendationsVars
  >(GET_RECOMMENDATIONS, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      console.error("Error detallado:", error);
      setError(error.message);
    }
  });

  const handleRating = (rating: number) => {
    if (ratings.length >= 10) {
      setLimitReached(true);
      return;
    }
    const song = songsList[currentSongIndex];
    setRatings((prevRatings) => [
      ...prevRatings,
      { song_id: song.song_id, rating },
    ]);
    const nextIndex = Math.floor(Math.random() * songsList.length);
    setCurrentSongIndex(nextIndex);
  };

  const fetchRecommendations = async () => {
    setError(null);
    try {
      await getRecommendations({
        variables: { ratings }
      });
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const recommendations = data?.getRecommendations || [];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Te recomiendo canciones!</h1>
      {limitReached ? (
        <h2>Has alcanzado el límite de 10 calificaciones</h2>
      ) : (
        <>
          <h2>{songsList[currentSongIndex].title}</h2>
          <p>Género: {songsList[currentSongIndex].genre}</p>
          <div>
            <p>Calificaciones actuales: {ratings.length}/10</p>
            <button
              onClick={() => handleRating(1)}
              style={{ 
                margin: "10px", 
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Like
            </button>
            <button
              onClick={() => handleRating(0)}
              style={{ 
                margin: "10px", 
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Dislike
            </button>
          </div>
        </>
      )}
      
      {limitReached && (
        <div>
          <button
            onClick={fetchRecommendations}
            disabled={isLoading}
            style={{
              margin: "20px",
              padding: "10px 20px",
              backgroundColor: isLoading ? "gray" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "default" : "pointer",
            }}
          >
            {isLoading ? "Cargando..." : "Dame mis recomendaciones"}
          </button>
          
          {error && (
            <p style={{ color: "red" }}>Error: {error}</p>
          )}
        </div>
      )}

      <h3>Recomendaciones:</h3>
      {isLoading ? (
        <p>Cargando recomendaciones...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recommendations.map((rec, index) => (
            <li 
              key={index} 
              style={{ 
                margin: "10px 0",
                padding: "10px",
                // backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <strong>{rec.title}</strong> - {rec.genre}
              <div style={{ 
                fontSize: "0.9em", 
                color: 'gray',
                marginTop: "5px"
              }}>
                Score: {rec.score.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}