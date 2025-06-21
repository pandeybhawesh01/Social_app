export const BASE_URL = 'http://localhost:3000/api';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/update',
    },
    POSTS: {
        GET_ALL: '/posts',
        CREATE: '/posts/create',
        DELETE: '/posts/:id',
    },
};