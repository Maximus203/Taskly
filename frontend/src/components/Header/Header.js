import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Taskly</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Accueil</Nav.Link>
                    <Nav.Link href="#about">À propos</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
