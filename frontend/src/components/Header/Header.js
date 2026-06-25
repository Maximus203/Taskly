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
    const { currentUser, errors, logout } = useAuth();

    const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

    // Utilisez l'effet pour mettre à jour le statut d'authentification lorsque currentUser change
    useEffect(() => {
        setIsAuthenticated(!!currentUser);
    }, [currentUser]);

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
        logout();
    };
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link className="nav-link" to="/">
                    <Image src={`${process.env.PUBLIC_URL}/assets/images/01-Taskly-logo.png`} width="42px" />
                </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center ms-5">
                <Nav className="mx-auto">
                    <Link className="nav-link me-3" to="/">Accueil</Link>
                    {isAuthenticated && (
                        <>
                            <Link className="nav-link me-3" to="/project-list">Projets</Link>
                            <Link className="nav-link me-3" to="/task-list">Tâches</Link>
                            <Link className="nav-link me-3" to="/user-list">Utilisateurs</Link>
                        </>
                    )}
                    <Link className="nav-link me-3" to="/about">À propos</Link>
                </Nav>

                <div className="d-flex">
                    {!isAuthenticated && location.pathname !== "/auth" && (
                        <Link className="btn btn-primary me-3" to="/auth">
                            <i className="bi bi-box-arrow-in-left"></i>
                            <span className="d-xm-none d-sm-none d-lg-inline">Connexion</span>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <button className="btn btn-danger me-3" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span className="d-xm-none d-sm-none d-lg-inline"> Déconnexion</span>
                        </button>
                    )}
                    {extraButton && (
                        <div className="ms-2">
                            {extraButton}
                        </div>
                    )}
                </div>
            </Navbar.Collapse>

        </Navbar>
    );


}

export default Header;
