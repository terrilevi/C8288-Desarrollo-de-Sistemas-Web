import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";

export const AddSongForm: React.FC = () => {
  // Primero obtenemos el dispatch del contexto global
  // no necesitamos state, porque ese form solo agrega canciones
  // useApp nos da acceso a dispatch que viene del Provider
  const { dispatch } = useApp();
  // 3. Estado local del formulario
  // Este estado solo maneja los inputs, es diferente al estado global
  const [formData, setFormData] = useState({
    // aqui usamos useState solo para manejar el estado local, guarda lo que el usuario escribe
    songName: "", // valor inicial vacío
    artist: "",
    recommendedBy: "",
    link: "",
    note: "",
    genre: "",
  });
  // 4. Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (e: React.FormEvent) => {
    // Previene que el formulario recargue la página
    e.preventDefault();
    // se ejecuta dispatch,
    dispatch({
      type: "ADD_SONG", // tipo de acción
      payload: {
        // datos de la nueva canción
        id: Date.now().toString(), // genera ID único
        songName: formData.songName,
        artist: formData.artist,
        recommendedBy: formData.recommendedBy,
        link: formData.link,
        note: formData.note,
        genres: formData.genre ? [formData.genre] : [], // si hay género, créalo como array
        reactions: {
          // inicializa contadores de reacciones
          wantMore: 0,
          listenedEnjoyed: 0,
          notListenedYet: 0,
        },
      },
    });
    setFormData({
      // Limpia el formulario después de enviar
      songName: "",
      artist: "",
      recommendedBy: "",
      link: "",
      note: "",
      genre: "",
    });
  };

  // 5. Renderizado del formulario o sea El formulario en sí
  return (
    // cuando se envie se ejecuta handlesubtim
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Cancion"
          value={formData.songName} // Muestra lo que hay en formData.songName
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, songName: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Artist (optional)"
          value={formData.artist}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, artist: e.target.value }))
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={formData.recommendedBy}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, recommendedBy: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <input
          type="url"
          placeholder="Song link"
          value={formData.link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, link: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Note (optional)"
          value={formData.note}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, note: e.target.value }))
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Genre (optional)"
          value={formData.genre}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, genre: e.target.value }))
          }
        />
      </div>
      <button type="submit">Add Song</button>
    </form>
  );
};
