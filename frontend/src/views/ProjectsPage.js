import React, { useState, useEffect } from 'react';
import { Collapse, Button, Row, Col } from 'react-bootstrap';
import ProjectList from '../components/Project/ProjectList';
import ProjectForm from '../components/Project/ProjectForm';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ProjectsPage() {
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    navigate('/auth'); // Redirigez vers la page de connexion
                    window.location.reload();
                }
                return Promise.reject(error);
            }
        );
    }, [navigate]);

    return (
        <>
            <Row className="align-items-center my-1">
                <Col className="text-end">
                    <Button
                        onClick={() => setIsAddingProject(!isAddingProject)}
                        aria-controls="project-collapse-text"
                        aria-expanded={isAddingProject}
                        className="me-3"
                    >
                        <i className={isAddingProject ? 'bi bi-x-circle-fill' : 'bi bi-plus-circle-fill'}></i> <span className="d-none d-lg-inline">{isAddingProject ? 'Retour à la liste' : 'Ajouter un projet'}</span>
                    </Button>
                </Col>
            </Row>
            <Collapse in={!isAddingProject} dimension="height">
                <div id="project-collapse-text">
                    <ProjectList forceUpdate={forceUpdate} />
                </div>
            </Collapse>

            <Collapse in={isAddingProject} dimension="height">
                <div id="project-collapse-text">
                    <ProjectForm
                        onSuccess={() => {
                            setIsAddingProject(false);
                            setForceUpdate(prev => !prev);  // Toggle the forceUpdate state
                        }}
                    />

                </div>
            </Collapse>
        </>
    );
}

export default ProjectsPage;
