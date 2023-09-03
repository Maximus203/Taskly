import React, { useState, useEffect, useContext } from 'react';
import ExtraButtonContext from '../../context/ExtraButtonContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';

function Header() {
    const location = useLocation();
    const { extraButton } = useContext(ExtraButtonContext);

    // Utiliser le contexte d'authentification pour récupérer l'utilisateur et les erreurs
    const { currentUser, errors } = useAuth();

    const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);
    // Utilisez l'effet pour suivre les changements dans le localStorage
    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!currentUser);
        };

        // Écouter l'événement storage pour détecter les changements dans d'autres onglets
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, [currentUser]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Ici, en réalité, vous devriez avoir une fonction logout dans votre contexte Auth pour vous assurer que l'utilisateur est correctement déconnecté côté backend.
        // Puisque vous n'avez pas encore cette logique, je vais simplifier cela pour l'instant.
        window.location.reload();
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand >
                <Link className="nav-link" to="/">
                    <Image src={`${process.env.PUBLIC_URL}/assets/images/01-Taskly-logo.png`} width="42px" />
                </Link>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Accueil</Link>
                    {isAuthenticated && (
                        <>
                            <Link className="nav-link" to="/dashboard">Projets</Link>
                            <Link className="nav-link" to="/settings">Tâches</Link>
                        </>
                    )}
                    <Link className="nav-link" to="/about">À propos</Link>
                </Nav>
            </Navbar.Collapse>

            <div className="d-flex">
                {!isAuthenticated && location.pathname !== "/auth" && (
                    <Link className="btn btn-primary me-3" to="/auth"><i class="bi bi-box-arrow-in-left"></i> Connexion</Link>
                )}
                {isAuthenticated && (
                    <button className="btn btn-danger me-3" onClick={handleLogout}><i class="bi bi-box-arrow-right"></i> Déconnexion</button>
                )}
                {extraButton && (
                    <div className="ms-2">
                        {extraButton}
                    </div>
                )}
            </div>
        </Navbar>
    );
}

export default Header;
