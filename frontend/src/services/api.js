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

const apiInterceptors = (setShouldReloadHeader) => {
    api.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response.status === 401) {
                setShouldReloadHeader(true);
            }
            return Promise.reject(error);
        }
    );
};

export { api, apiInterceptors };

export default api;