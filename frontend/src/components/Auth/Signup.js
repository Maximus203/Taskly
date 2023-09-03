import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function Signup() {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        date_de_naissance: '',
        email: '',
        mot_de_passe: '',
        photo_de_profil: '',
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

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            photo_de_profil: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await api.post('users/signup', data);
            if (response.data.success) {
                // Après une inscription réussie, utilisez la fonction login pour connecter l'utilisateur
                const loginResponse = await login(formData.email, formData.mot_de_passe);
                if (loginResponse.success) {
                    navigate('/');
                } else {
                    setErrors({ global: loginResponse.message });
                }
            } else {
                console.log("Erreur de backend:", response.data);
                setErrors(response.data.errors || {});
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            setErrors({ global: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer." });
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Col md="6">
                <h2 className="fw-semibold text-center">Inscription</h2>
                <Form onSubmit={handleSubmit}>
                    {errors.global && <Alert variant="danger">{errors.global}</Alert>}
                    <Form.Group controlId="prenom" className="mt-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            placeholder="Entrez votre prénom"
                            isInvalid={errors.prenom}
                        />
                        <Form.Control.Feedback type="invalid">{errors.prenom}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="nom" className="mt-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Entrez votre nom"
                            isInvalid={errors.nom}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nom}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="date_de_naissance" className="mt-3">
                        <Form.Label>Date de naissance</Form.Label>
                        <Form.Control
                            type="date"
                            name="date_de_naissance"
                            value={formData.date_de_naissance}
                            onChange={handleChange}
                            isInvalid={errors.date_de_naissance}
                        />
                        <Form.Control.Feedback type="invalid">{errors.date_de_naissance}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Entrez votre email"
                            isInvalid={errors.email}
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
                            isInvalid={errors.mot_de_passe}
                        />
                        <Form.Control.Feedback type="invalid">{errors.mot_de_passe}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="photo_de_profil" className="mt-3">
                        <Form.Label>Photo de profil</Form.Label>
                        <Form.Control
                            type="file"
                            name="photo_de_profil"
                            onChange={handleFileChange}
                            isInvalid={errors.photo_de_profil}
                        />
                        <Form.Control.Feedback type="invalid">{errors.photo_de_profil}</Form.Control.Feedback>
                    </Form.Group>


                    <Row className="justify-content-center my-3">
                        <Col md={6} className="text-center">
                            <Button variant="primary" type="submit" className="fw-medium w-100">
                                Inscription
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

export default Signup;
