import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { GamePage } from '../pages/gamePage';
import { Index } from '../pages/indexPage';
import { LobbyPage } from '../pages/lobbyPage';

export const API_BASE = 'https://tanichess.onrender.com';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Index/>} />
        <Route path='/:roomId' element = {<GamePage/>}/>
        <Route path='/lobby' element={<LobbyPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
