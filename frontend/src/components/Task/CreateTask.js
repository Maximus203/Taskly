import React from 'react';
import TaskForm from './TaskForm';

function CreateTask({ onSuccess }) {
    return <TaskForm onSuccess={onSuccess} />;
}

export default CreateTask;
