// Usamos interface porque estamos definiendo nuestro objeto Song
// lo exportamos porque usaremos esta interfaz en otros archivos.
export interface Song {
  id: string; // id unico para cada cancion
  songName: string; // obligatorio
  artist?: string; // opcional
  recommendedBy: string; // obligatorio
  link: string; // obligatorio
  note?: string; // opcional
  genres: string[]; // genres es un array de strings y puede estar vacio
  reactions: {
    // reactions es un objeto anidado, cada propiedad del
    // objeto es un number para poder contar las reacciones.
    wantMore: number;
    listenedEnjoyed: number;
    notListenedYet: number;
  };
}

// creamos AppState para definir songs que será, mas adelante, nuestra
// lista de canciones disponibles para el estado global, songs es un array
// de objetos Song y currentUser solo es un string.
export interface AppState {
  songs: Song[];
  currentUser: string;
}

// Usamos type porque es una union de tipos, y no un objeto,
// Hay diferentes tipos de acciones y usamos el union type
// es un tipo de patron llamado: ACTION OBJECT PATTERN, en el cual
// cada accion tiene un type que dice que vamos a hacer y un payload
// que contiene los datos necesarios para hacer esa accion

export type AppAction =
  // ¿Qué puede hacer el usuario en mi aplicación?
  | {
      type: "ADD_SONG"; // Agregar una nueva canción, el tipo esta definiendo
      // bajo un literal string.
      payload: Song; // Contiene dentro toda la info del objeto Song.
    }
  | {
      type: "ADD_GENRE"; // Agregar un género a una canción existente
      payload: {
        songId: string; // ¿A qué canción? (necesito su id)
        genre: string; // ¿Qué género quiero agregar?
      };
    }
  | {
      type: "ADD_REACTION"; // Reaccionar a una canción
      payload: {
        songId: string; // ¿A qué canción? (necesito su id)
        reactionType: keyof Song["reactions"]; // ¿Qué tipo de reacción?
        // significa que solo acepta las keys del objeto reactions, que al mismo tiempo es un objeto dentro de songs
        // Solo "wantMore", "listenedEnjoyed", o "notListenedYet"
      };
    };
