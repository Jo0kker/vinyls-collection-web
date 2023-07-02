import axios from 'axios';

import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const axiosApiInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        common: {
            'Accept-Encoding': 'identity',
            'Access-Control-Allow-Origin': '*'
        }
    }
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async (request: AxiosRequestConfig) => {
        const session = await getSession();

        if (session && request.headers) {
            request.headers.common?.set(
                'Authorization',
                `Bearer ${session.user.access_token}`
            );
        }
        return request;
    },
    (error: AxiosError) => {
        Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    function (error: AxiosError) {
        signOut();
        return Promise.reject(error);
    }
);

export default axiosApiInstance;
