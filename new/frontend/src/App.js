import React from 'react';
import Nav from './components/NavBar/Nav';
import Main from './pages/Main/Main';
import { isMobile } from 'react-device-detect';
import Mobile from './pages/UtilityPages/Mobile';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import NotFound from './pages/UtilityPages/NotFound';
import { AuthProvider } from './context/AuthContext'; 
import Construction from './pages/UtilityPages/Construction';
import Help from './pages/General/Help';
import History from './pages/General/History';
import Settings from './pages/General/Settings';
import About from './pages/General/About';
import MinimumWidthWrapper from './wrappers/MinimumWidthWrapper';

const App = () => {
  return (
    <AuthProvider>
      <MinimumWidthWrapper minWidth={940}>
        <Router> 
          {/*{isMobile ? (
            <Mobile />
          ) : (
            <>
              <Nav />
              <Routes>
                <Route path="/*" element={<Main />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/history" element ={<History
                  />} />
                <Route path="/help" element ={<Help/>} />
                <Route path="/settings" element ={<Settings/>} />
                <Route path="/about" element ={<About/>} />
              </Routes>
            </>
          )} */}
          <Nav />
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/history" element ={<History/>} />
            <Route path="/help" element ={<Help/>} />
            <Route path="/settings" element ={<Settings/>} />
            <Route path="/about" element ={<About/>} />
          </Routes>
        </Router>
      </MinimumWidthWrapper>  
    </AuthProvider>
  )
}

export default App
