import React, { useState } from 'react';
import { Collapse, Button, Row, Col } from 'react-bootstrap';
import TaskList from '../components/Task/TaskList';
import CreateTask from '../components/Task/CreateTask';
import EditTask from '../components/Task/EditTask';

function TasksPage() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [forceRefresh, setForceRefresh] = useState(false);

    const handleSuccess = () => {
        setIsAdding(false);
        setEditingTask(null);
        setForceRefresh(!forceRefresh);
    };

    return (
        <>
            <Row className="align-items-center my-1">
                <Col className="text-end">
                    <Button
                        onClick={() => { setIsAdding(!isAdding); setEditingTask(null); }}
                        aria-controls="task-collapse-text"
                        aria-expanded={isAdding}
                        className="me-3"
                    >
                        <i className={isAdding ? 'bi bi-x-circle-fill' : 'bi bi-plus-circle-fill'}></i>
                        <span className="d-none d-lg-inline">{isAdding ? 'Retour à la liste' : 'Ajouter une tâche'}</span>
                    </Button>
                </Col>
            </Row>
            <Collapse in={!isAdding && !editingTask} dimension="height">
                <div id="task-collapse-text">
                    <TaskList key={forceRefresh} onEdit={(task) => { setEditingTask(task); setIsAdding(false); }} />
                </div>
            </Collapse>

            <Collapse in={isAdding} dimension="height">
                <div id="task-form-text">
                    <CreateTask onSuccess={handleSuccess} />
                </div>
            </Collapse>

            <Collapse in={!!editingTask} dimension="height">
                <div id="task-edit-text">
                    {editingTask && <EditTask task={editingTask} onSuccess={handleSuccess} />}
                </div>
            </Collapse>
        </>
    );
}

export default TasksPage;
