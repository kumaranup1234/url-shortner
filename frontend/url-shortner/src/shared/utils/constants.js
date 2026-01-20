export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/users/login',
        SIGNUP: '/api/users/signup',
        LOGOUT: '/api/users/logout',
        STATUS: '/api/users/status',
    },
    URLS: {
        CREATE: '/api/urls/manage/shorten',
        LIST: '/api/urls/manage/user-urls',
        DELETE: '/api/urls/manage/delete',
        UPDATE: '/api/urls/manage/update',
    },
    ANALYTICS: {
        DASHBOARD: '/api/users/getAll',
        BROWSER: '/api/urls/clicks/getUserClicksByBrowser',
        LOCATION: '/api/urls/clicks/getUserClicksByLocations',
    }
};

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
};

export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};