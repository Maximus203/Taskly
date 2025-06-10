import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import api from '../../services/api';

function TaskForm({ onSuccess, taskData }) {
    const [task, setTask] = useState(taskData || {
        libelle: '',
        description: '',
        status: 'pending',
        delai: '',
        porteur_id: '',
        projet_id: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (taskData) {
                response = await api.put(`/tasks/${taskData.id}`, task);
            } else {
                response = await api.post('/tasks', task);
            }
            if (response.data.success) {
                onSuccess && onSuccess();
                setTask({ libelle: '', description: '', status: 'pending', delai: '', porteur_id: '', projet_id: '' });
            } else {
                setError(response.data.message || "Une erreur est survenue.");
            }
        } catch (err) {
            setError("Une erreur est survenue lors de l'envoi des données.");
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-3">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="fw-bolder">Libellé</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="libelle" value={task.libelle} onChange={handleInputChange} required />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="fw-bolder">Description</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" name="description" value={task.description} onChange={handleInputChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="fw-bolder">Statut</Form.Label>
                <Col sm={9}>
                    <Form.Select name="status" value={task.status} onChange={handleInputChange} required>
                        <option value="pending">En attente</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Terminée</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="fw-bolder">Délai</Form.Label>
                <Col sm={9}>
                    <Form.Control type="date" name="delai" value={task.delai} onChange={handleInputChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="fw-bolder">Porteur ID</Form.Label>
                <Col sm={9}>
                    <Form.Control type="number" name="porteur_id" value={task.porteur_id} onChange={handleInputChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="fw-bolder">Projet ID</Form.Label>
                <Col sm={9}>
                    <Form.Control type="number" name="projet_id" value={task.projet_id} onChange={handleInputChange} required />
                </Col>
            </Form.Group>
            <Row className="justify-content-center my-4">
                <Col md={6} className="text-center">
                    <Button className="fw-medium w-100" type="submit" variant="primary">
                        {taskData ? 'Mettre à jour' : 'Créer'}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default TaskForm;
