import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../../services/api';

function TaskList({ onEdit }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = () => {
        api.get('/tasks')
            .then(response => {
                setTasks(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Erreur lors de la récupération des tâches');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cette tâche ?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            setError('Erreur lors de la suppression');
        }
    };

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

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Libellé</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.libelle}</td>
                        <td>{task.status}</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(task)}>
                                Éditer
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                                Supprimer
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TaskList;
