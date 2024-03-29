import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubNavbar from './components/SubNavbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Character from './pages/Character';
import CharacterSearchResults from './pages/CharacterSearchResults';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import TermsOfService from './pages/Terms';
import PrivacyPolicy from './pages/Policy';
import konamiCodeListener from './utils/EasterEgg';
import { BeatLoader } from 'react-spinners';
import { useUser } from './contexts/UserContext';

function App() {
  const [characterResults, setCharacterResults] = useState(undefined);
  const [subNavbarText, setSubNavBarText] = useState('SEARCH');
  const { loading, isLoggedIn } = useUser();

  useEffect(() => {
    const cleanup = konamiCodeListener();
    return cleanup;
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="mt-14">
        <SubNavbar text={subNavbarText} />
        <div className="body-content" style={{ paddingTop: '100px' }}>
          {loading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center" >
              <div className='text-[#FFF] text-4xl font-bold text-shadow'>Loading &nbsp;</div>
              <BeatLoader color="#FFF" size="15"/>
            </div>
          )}
          <div className="routes-container" style={{ marginTop: '-60px' }}>
            <Routes>
              <Route path="/" element={<Home onSearch={setCharacterResults} onMount={() => setSubNavBarText('SEARCH')} />} />
              <Route path="/character" element={<Character onMount={() => setSubNavBarText('CHARACTER')} />} />
              <Route path="/characterSearchResults" element={<CharacterSearchResults characterResults={characterResults} onMount={() => setSubNavBarText('RESULTS')} />} />
              {!isLoggedIn && <Route path="/sign-in" element={<SignIn onMount={() => setSubNavBarText('ACCOUNT')} />} />}
              {!isLoggedIn && <Route path="/register" element={<Register onMount={() => setSubNavBarText('ACCOUNT')} />} />}
              <Route path="/favorites" element={<Favorites onMount={() => setSubNavBarText('FAVORITES')} />} />
              <Route path="/Terms" element={<TermsOfService onMount={() => setSubNavBarText('ACCOUNT')} />} />
              <Route path="/Policy" element={<PrivacyPolicy onMount={() => setSubNavBarText('ACCOUNT')} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
