import React, { useState, useEffect } from 'react';
import { Spinner, Row, Col, Alert } from 'react-bootstrap';
import ProjectItem from './ProjectItem';
import api from '../../services/api';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/projects')
            .then(response => {
                setProjects(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center margin-top-10">
                <Spinner animation="border" variant="primary" role="status"></Spinner>
                <span className="ms-3 sr-only">Chargement des projets ...</span>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">Erreur : {error}</Alert>;
    }

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <h2>Liste des Projets</h2>
                </Col>
            </Row>
            <Row>
                {projects.map(project => (
                    <Col md={4} key={project.id}>
                        <ProjectItem project={project} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default ProjectList;
