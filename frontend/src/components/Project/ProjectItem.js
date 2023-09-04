import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProjectItem({ project }) {
    return (
        <Card className="mb-4">
            {project.image && <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_URL}/${project.image}`} />}

            <div>${process.env.PORT}/${project.image}</div>
            <Card.Body>
                <Card.Title>{project.titre}</Card.Title>
                <Card.Text>
                    {project.description}
                </Card.Text>
                <Badge
                    bg={
                        project.status === 'pending' ? 'warning' :
                            project.status === 'in_progress' ? 'primary' : 'success'
                    }
                >
                    {project.status}
                </Badge>
                {' '}
                <Badge
                    bg={
                        project.importance === 'low' ? 'secondary' :
                            project.importance === 'medium' ? 'primary' : 'danger'
                    }
                >
                    {project.importance}
                </Badge>
                <div className="mt-3">
                    <Link to={`/projects/${project.id}`}>
                        <Button variant="primary" className="mr-2">Voir les détails</Button>
                    </Link>
                    {/* Si vous voulez ajouter des boutons d'édition ou de suppression rapide ici, vous pouvez le faire */}
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProjectItem;
