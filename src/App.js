import React, { useState } from "react";
import ClientComponent from "./ClientComponent";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  const [isMultiplayer, setMultiplayer] = useState(null);
  return (
    <>
      
      {/* LOAD OR UNLOAD THE CLIENT */}
      <button onClick={() => setLoadClient(prevState => !prevState)}>
        {loadClient ? "Disconnect" : "Connect"}
      </button>
      
      {/* SOCKET IO CLIENT*/}
      {loadClient ? <ClientComponent /> : null}

      <h1>Current Game Mode :  {isMultiplayer == null ? "None selected." :  isMultiplayer ? "Multiplayer" : "Singleplayer"}</h1>

      <button onClick={() => setMultiplayer(false)}>
        Singleplayer
      </button>

      <button onClick={() => setMultiplayer(true)}>
        Multiplayer
      </button>
    </>
  );
}

export default App;
