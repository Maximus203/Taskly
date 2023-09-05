import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import './views/styles/taskly-theme.css';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Login from './components/Auth/Login';

import AuthContextProvider from './context/AuthContext';
import ExtraButtonContext from './context/ExtraButtonContext';

import { apiInterceptors } from './services/api';

const HomePage = React.lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./views/HomePage')), 300)
  )
);
const ProjectsPage = React.lazy(() => import('./views/ProjectsPage'));
const AuthView = React.lazy(() => import('./views/AuthView'));

function App() {
  const [extraButton, setExtraButton] = useState(null);

  return (
    <AuthContextProvider>
      <Container fluid>
        <Router>
          <ExtraButtonContext.Provider value={{ extraButton, setExtraButton }}>
            <Header />
            <Suspense fallback={
              <div className="d-flex justify-content-center margin-top-10">
                <Spinner animation="border" variant="primary" role="status">
                </Spinner>
                <span className="ms-3 sr-only">Chargement...</span>
              </div>}>
              <Routes>
                <Route path="/project-list" element={<ProjectsPage />} />
                <Route path="/auth" element={<AuthView />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Suspense>
            <Footer />
          </ExtraButtonContext.Provider>
        </Router>
      </Container>
    </AuthContextProvider>
  );
}

export default App;
