import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import api from '../../services/api';


function ProjectForm({ onSuccess, projectData }) {
    const [project, setProject] = useState(projectData || { titre: '', description: '', status: 'pending', importance: 'low' });
    const [image, setImage] = useState(null);  // Séparation de l'image
    const [error, setError] = useState(null);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };


    const handleImageChange = e => {
        const file = e.target.files[0];
        setImage(file);  // Mise à jour de l'état de l'image
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in project) {
            formData.append(key, project[key]);
        }

        if (image) {
            formData.append('image', image);  // Ajout de l'image si elle est présente
        }

        try {
            let response;
            if (projectData) {
                // Update project
                response = await api.put(`/projects/${projectData.id}`, formData);
            } else {
                // Create a new project
                response = await api.post('/projects', formData);
            }

            if (response.data.success) {
                onSuccess && onSuccess();

                // Réinitialisez l'état du formulaire
                setProject({ titre: '', description: '', status: 'pending', importance: 'low' });
                setImage(null);
            } else {
                setError(response.data.message || "Une erreur est survenue.");
            }

        } catch (err) {
            // Ici, nous vérifions d'abord si `err.response` existe avant d'accéder à ses propriétés. 
            // Cela est nécessaire car, dans certains cas d'erreur réseau, `err.response` pourrait être undefined.
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "Une erreur est survenue lors de l'envoi des données.";
            setError(errorMessage);
        }
    };



    return (
        <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-3">
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} className="fw-bolder">Titre</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        name="titre"
                        value={project.titre}
                        onChange={handleInputChange}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} className="fw-bolder">Description</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={project.description}
                        onChange={handleInputChange}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} className="fw-bolder">Status</Form.Label>
                <Col sm={10}>
                    <Form.Select
                        name="status"
                        value={project.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="pending">En attente</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Terminé</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} className="fw-bolder">Importance</Form.Label>
                <Col sm={10}>
                    <Form.Select
                        name="importance"
                        value={project.importance}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} className="fw-bolder">Image</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </Col>
            </Form.Group>

            <Row className="justify-content-center my-4">
                <Col md={6} className="text-center">
                    <Button className="fw-medium w-100" type="submit" variant="primary">
                        {projectData ? 'Mettre à jour' : 'Créer'}
                    </Button>
                </Col>
            </Row>

        </Form>
    );
}

export default ProjectForm;
