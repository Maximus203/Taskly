import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function ProjectItem({ project, onProjectUpdate }) {

    const [showDetails, setShowDetails] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleClick = () => {
        setShowDetails(!showDetails);
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/projects/${project.id}`);
            if (onProjectUpdate) onProjectUpdate();
        } catch (error) {
            console.error("Erreur lors de la suppression du projet :", error);
        }
        setConfirmDelete(false);
    }

    const getStatusFr = (status) => {
        switch (status) {
            case 'pending':
                return 'En attente';
            case 'in_progress':
                return 'En cours';
            case 'completed':
                return 'Terminé';
            default:
                return status;
        }
    };

    const getImportanceFr = (importance) => {
        switch (importance) {
            case 'low':
                return 'Faible';
            case 'medium':
                return 'Moyenne';
            case 'high':
                return 'Haute';
            default:
                return importance;
        }
    };

    return (
        <>
            <Card className="mb-4" style={{ cursor: 'pointer' }} onClick={handleClick}>
                {project.image && <Card.Img variant="top" src={`http://localhost:3000/static/${project.image}`} />}
                <Card.Body>
                    <Card.Title>
                        {project.titre}
                        <Link to={`/projects/${project.id}/edit`} className="ml-2">
                            <i className="bi bi-pencil-fill text-warning"></i>
                        </Link>
                        <i className="bi bi-trash-fill text-danger ml-2" onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}></i>
                    </Card.Title>
                    {'Importance: '}
                    <Badge
                        bg={
                            project.importance === 'low' ? 'secondary' :
                                project.importance === 'medium' ? 'primary' : 'danger'
                        }
                    >
                        {getImportanceFr(project.importance)}
                    </Badge>
                </Card.Body>
            </Card>

            <Modal show={showDetails} onHide={handleClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Détails du projet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Description :</strong> {project.description}</p>
                    <Badge
                        bg={
                            project.status === 'pending' ? 'warning' :
                                project.status === 'in_progress' ? 'primary' : 'success'
                        }
                    >
                        {getStatusFr(project.status)}
                    </Badge>

                    <Badge
                        bg={
                            project.importance === 'low' ? 'secondary' :
                                project.importance === 'medium' ? 'primary' : 'danger'
                        }
                    >
                        {getImportanceFr(project.importance)}
                    </Badge>
                    {/* Ajouter d'autres détails si nécessaire */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClick}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer ce projet ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProjectItem;
