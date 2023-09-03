// services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/taskly-api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Token récupéré:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
