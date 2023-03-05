import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SubNavbar from './components/SubNavbar';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Character from './pages/Character';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

import { UserProvider } from './contexts/UserContext';

function App() {
  const [characterData, setCharacterData] = useState(undefined);
  const [subNavbarText, setSubNavBarText] = useState('SEARCH');

  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <div className="mt-14">
          <SubNavbar text={subNavbarText} />
          <div className='top-12 relative'>
            <Routes>
              <Route path="/" element={<Home onSearch={setCharacterData} onMount={() => setSubNavBarText('SEARCH')} />} />
              <Route path="/character" element={<Character selectedCharacter={characterData} onMount={() => setSubNavBarText('CHARACTER')} />} />
              <Route path="/sign-in" element={<SignIn onMount={() => setSubNavBarText('ACCOUNT')} />} />
              <Route path="/register" element={<Register onMount={() => setSubNavBarText('ACCOUNT')} />} />
              <Route path="/favorites" element={<Favorites onMount={() => setSubNavBarText('FAVORITES')} />} />
            </Routes>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
