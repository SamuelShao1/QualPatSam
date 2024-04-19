import React from 'react';
import Nav from './components/Nav';
import Main from './pages/Main';
import { isMobile } from 'react-device-detect';
import Mobile from './pages/utilityPages/Mobile';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import NotFound from './pages/utilityPages/NotFound';

const App = () => {
  return (
    <Router>
      {isMobile ? (
        <Mobile />
      ) : (
        <>
          <Nav />
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </>
      )}
    </Router>
  )
}

export default App
