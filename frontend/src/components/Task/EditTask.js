import React from 'react';
import TaskForm from './TaskForm';

function EditTask({ task, onSuccess }) {
    return <TaskForm taskData={task} onSuccess={onSuccess} />;
}

export default EditTask;
