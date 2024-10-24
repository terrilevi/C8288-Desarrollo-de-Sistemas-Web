import React from "react";
import { useApp } from "../contexts/AppContext";
import { Song } from "../types/types";

export const SongList: React.FC = () => {
  // Obtenemos state y dispatch del contexto global
  const { state, dispatch } = useApp();
  // Función para manejar reacciones
  const handleAddGenre = (songId: string, genre: string) => {
    if (genre.trim()) {
      dispatch({
        type: "ADD_GENRE",
        payload: { songId, genre: genre.trim() },
      });
    }
  };

  const handleReaction = (
    songId: string,
    reactionType: keyof Song["reactions"]
  ) => {
    dispatch({
      type: "ADD_REACTION",
      payload: { songId, reactionType },
    });
  };

  return (
    <div>
      {/* Mapea todas las canciones del estado global */}
      {state.songs.map((song) => (
        <div
          key={song.id}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>{song.songName}</h3> {/* Muestra nombre de canción */}
          {song.artist && <p>Artist: {song.artist}</p>} {/* Muestra artista */}
          <p>Recommended by: {song.recommendedBy}</p>{" "}
          {/* Muestra quién recomendó */}
          <a href={song.link} target="_blank" rel="noopener noreferrer">
            Listen
          </a>
          {song.note && <p>Note: {song.note}</p>}
          {/* Sección de géneros */}
          <div>
            Genres:
            {song.genres.map((genre) => (
              <span
                key={genre}
                style={{
                  margin: "0 5px",
                  padding: "2px 5px",
                  backgroundColor: "#eee",
                }}
              >
                {genre}
              </span>
            ))}
            {/* Input para agregar nuevos géneros */}
            <input
              type="text"
              placeholder="Add genre"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddGenre(song.id, e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          {/* Botones de reacción */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleReaction(song.id, "wantMore")}>
              I WANT MORE LIKE THIS I BEG YOU ({song.reactions.wantMore})
            </button>
            <button onClick={() => handleReaction(song.id, "listenedEnjoyed")}>
              listened and enjoyed ({song.reactions.listenedEnjoyed})
            </button>
            <button onClick={() => handleReaction(song.id, "notListenedYet")}>
              not listened STILL ({song.reactions.notListenedYet})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
