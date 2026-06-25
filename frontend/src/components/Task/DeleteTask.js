import React from 'react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';

function DeleteTask({ taskId, onDeleted }) {
    const handleDelete = async () => {
        if (!window.confirm('Supprimer cette tâche ?')) return;
        try {
            await api.delete(`/tasks/${taskId}`);
            onDeleted && onDeleted();
        } catch (err) {
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <Button variant="danger" size="sm" onClick={handleDelete}>
            Supprimer
        </Button>
    );
}

export default DeleteTask;
