import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/apiasdasd',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');

            if (window.location.pathname !== '/sign-in') {
                window.location.href = '/sign-in';
            }
        }
        return Promise.reject(error);
    }
);
