import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SubNavbar from './components/SubNavbar';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Character from './pages/Character';

function App() {
  const [characterData, setCharacterData] = useState(undefined);
  const [subNavbarText, setSubNavBarText] = useState('SEARCH');

  return (
    <div className="App">
      <Navbar />
      <div className="mt-14">
        <SubNavbar text={subNavbarText} />
        <Routes>
          <Route path="/" element={<Home setCharacterData={setCharacterData} onMount={() => setSubNavBarText('SEARCH')} />} />
          <Route path="/character" element={<Character characterData={characterData} onMount={() => setSubNavBarText('CHARACTER')} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
