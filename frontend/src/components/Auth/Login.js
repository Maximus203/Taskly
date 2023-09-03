import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Utiliser la fonction login au lieu de api.post
            const response = await login(formData.email, formData.mot_de_passe);
            if (response.success) {
                navigate('/');
            } else {
                console.log("Erreur de backend:", response.message);
                setErrors({ global: response.message });
            }
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
            setErrors({ global: "Une erreur s'est produite lors de la connexion. Veuillez réessayer." });
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Col md="6">
                <h2 className="fw-semibold text-center">Connexion</h2>
                <Form onSubmit={handleSubmit}>
                    {errors.global && <Alert variant="danger">{errors.global}</Alert>}
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Entrez votre email"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="mot_de_passe" className="mt-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            name="mot_de_passe"
                            value={formData.mot_de_passe}
                            onChange={handleChange}
                            placeholder="Entrez votre mot de passe"
                            isInvalid={!!errors.mot_de_passe}
                        />
                        <Form.Control.Feedback type="invalid">{errors.mot_de_passe}</Form.Control.Feedback>
                    </Form.Group>

                    <Row className="justify-content-center my-3">
                        <Col md={6} className="text-center">
                            <Button variant="primary" type="submit" className="fw-medium w-100">
                                Se connecter
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;
