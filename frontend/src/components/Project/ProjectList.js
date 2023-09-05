import React, { useState, useEffect, useRef } from 'react';
import { Spinner, Row, Col, Alert } from 'react-bootstrap';
import ProjectItem from './ProjectItem';
import api from '../../services/api';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import './ProjectList.css';


function ProjectList({ forceUpdate }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const masonryGridRef = useRef(null);

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
    }, [forceUpdate]);

    useEffect(() => {
        if (projects.length > 0 && masonryGridRef.current) {
            const grid = masonryGridRef.current;

            // Initialiser Masonry après que toutes les images soient chargées
            imagesLoaded(grid, function () {
                new Masonry(grid, {
                    itemSelector: '.masonry-item',
                    columnWidth: '.masonry-item',
                    percentPosition: true
                });
            });
        }
    }, [projects]);

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
            <Row className="mb-4 w-100 mx-auto text-start">
                <Col>
                    <h2 className="fw-semibold">Liste des Projets</h2>
                </Col>
            </Row>
            <div ref={masonryGridRef} className="masonry-grid w-100 mx-auto">
                {projects.map(project => (
                    <div className="masonry-item m-2" style={{ width: '18.95%' }} key={project.id}>
                        <ProjectItem project={project} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProjectList;
