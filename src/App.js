// The objective is to build a 2 player Tic-Tac-Toe game.
// Assume that both players are playing on the same computer (the players alternate and they're using the same mouse/touchpad).
// The Tic-Tac-Toe board is not 3x3, but NxN.
// The value of N is taken as an input from the user before the game round begins.

import React from "react";
import Board from "./Components/Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic-Tac-Toe</h1>
      </header>
      <Board />
    </div>
  );
}

export default App;
