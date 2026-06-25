import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert } from 'react-bootstrap';
import api from '../../services/api';

function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/tasks/${id}`)
            .then(res => {
                setTask(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération de la tâche');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center margin-top-10">
                <Spinner animation="border" variant="primary" role="status" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!task) return null;

    return (
        <Card className="mt-3 w-50 mx-auto">
            <Card.Body>
                <Card.Title>{task.libelle}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>Statut : {task.status}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default TaskDetail;
