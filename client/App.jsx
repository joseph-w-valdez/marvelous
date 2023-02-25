import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Character from './pages/Character';

function App() {
  const [characterData, setCharacterData] = useState(undefined);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setCharacterData={setCharacterData}/>} />
        <Route path="/character" element={<Character characterData={characterData}/>} />
      </Routes>
    </div>
  );
}

export default App;
