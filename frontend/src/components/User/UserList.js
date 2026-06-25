import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import api from '../../services/api';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/users')
            .then(res => {
                setUsers(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération des utilisateurs');
                setLoading(false);
            });
    }, []);

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
                    <th>Nom</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.prenom} {user.nom}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserList;
