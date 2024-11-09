import React from "react";
import { GameProvider } from "./GameProvider";

import Game from "./Game";

const App = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

export default App;
