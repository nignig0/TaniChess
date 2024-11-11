import React from 'react';
import './../styles/App.css';
import { ChessGame } from './ChessGame';

function App() {
  return (
    <div className="App">
      <h1>A chess game</h1>
      <ChessGame/>
    </div>
  );
}

export default App;
