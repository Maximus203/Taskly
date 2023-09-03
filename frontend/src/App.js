import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Login from './components/Auth/Login';

import AuthContextProvider from './context/AuthContext';
import ExtraButtonContext from './context/ExtraButtonContext';

const HomePage = React.lazy(() => import('./views/HomePage'));
const AuthView = React.lazy(() => import('./views/AuthView'));

function App() {
  const [extraButton, setExtraButton] = useState(null);
  return (
    <AuthContextProvider>
      <ExtraButtonContext.Provider value={{ extraButton, setExtraButton }}>
        <Container fluid>
          <Router>
            <Header />
            <Suspense fallback={<div>Chargement...</div>}>
              <Routes>
                {/** Routes commentées pour les projets, les tâches et les utilisateurs... */}
                <Route path="/auth" element={<AuthView />}>
                  <Route index element={<Login />} />
                </Route>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Suspense>
            <Footer />
          </Router>
        </Container>
      </ExtraButtonContext.Provider>
    </AuthContextProvider>
  );
}


export default App;
