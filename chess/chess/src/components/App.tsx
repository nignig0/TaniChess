import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { GamePage } from '../pages/gamePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<GamePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
