import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from '../api/api';

const REFRESH_INTERVAL = 23 * 60 * 1000; 

let refreshTimer;

const startTokenRefresh = () => {
    clearInterval(refreshTimer);

    refreshTimer = setInterval(async () => {
        try {
            const newToken = await refreshToken();
            Cookies.set('token', newToken, { expires: 7 }); 
        } catch (error) {
            console.error("Token refresh failed:", error);
            clearInterval(refreshTimer); 
        }
    }, REFRESH_INTERVAL);
};

const stopTokenRefresh = () => {
    clearInterval(refreshTimer);
};

axios.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { startTokenRefresh, stopTokenRefresh };