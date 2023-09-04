import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Collapse, Button } from 'react-bootstrap';
import ExtraButtonContext from '../context/ExtraButtonContext';
import Signup from '../components/Auth/Signup';
import Login from '../components/Auth/Login';

function AuthView() {
    const { setExtraButton } = useContext(ExtraButtonContext);
    const [showSignup, setShowSignup] = useState(false); // initialisez à false pour afficher d'abord la connexion

    useEffect(() => {
        const button = (
            <Button
                onClick={() => setShowSignup(!showSignup)}
                aria-controls="auth-collapse-text"
                aria-expanded={showSignup}
                className="me-3"
            >
                <i className="bi bi-box-arrow-in-left"></i> {showSignup ? 'Se connecter' : "S'inscrire"}
            </Button>
        );
        setExtraButton(button);

        // Nettoyage : supprimez le bouton supplémentaire lorsque ce composant est démonté
        return () => setExtraButton(null);
    }, [showSignup, setExtraButton]);

    return (
        <div>
            <Row className="justify-content-center my-5 auth-container">
                <Col md={6}>
                    <Collapse in={showSignup} dimension="height">
                        <div id="auth-collapse-text">
                            <Signup />
                        </div>
                    </Collapse>

                    <Collapse in={!showSignup} dimension="height">
                        <div id="auth-collapse-text">
                            <Login />
                        </div>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
}

export default AuthView;
