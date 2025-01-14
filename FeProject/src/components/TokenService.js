// tokenService.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from '../api/api';

const REFRESH_INTERVAL = 25 * 60 * 1000; // Refresh every 14 minutes

let refreshTimer;

const startTokenRefresh = () => {
    // Clear any existing timer
    clearInterval(refreshTimer);

    // Set a timer to refresh the token periodically
    refreshTimer = setInterval(async () => {
        try {
            const newToken = await refreshToken();
            Cookies.set('token', newToken, { expires: 7 }); // Update the token in cookies
            console.log("Token refreshed:", newToken);
        } catch (error) {
            console.error("Token refresh failed:", error);
            clearInterval(refreshTimer); // Stop the timer if refresh fails
            // Optionally, redirect to login or show a message
            // window.location.href = '/login'; // Uncomment to redirect
        }
    }, REFRESH_INTERVAL);
};

// Call this function to stop the refresh process when logging out
const stopTokenRefresh = () => {
    clearInterval(refreshTimer);
};

// Optionally, you can also set up an interceptor for requests
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