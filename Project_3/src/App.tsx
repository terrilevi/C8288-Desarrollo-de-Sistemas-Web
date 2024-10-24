import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { AddSongForm } from "./components/AddSongForm";
import { SongList } from "./components/SongList";

function App() {
  return (
    <AppProvider>
      <div style={{ padding: "20px" }}>
        <h1>DeepSounds</h1>
        <AddSongForm />
        <SongList />
      </div>
    </AppProvider>
  );
}

export default App;
