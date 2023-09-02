import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer bg-light">
            <Container>
                <span className="text-muted">© 2023 Taskly. Tous les droits sont réservés.</span>
            </Container>
        </footer>
    );
}

export default Footer;
