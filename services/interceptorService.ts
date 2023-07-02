import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';

import { useBearStore } from '@store/useBearStore';

import type { JwtPayload } from 'jwt-decode';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

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
    async (config: AxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            // get token from COOKIE
            const cookies = new Cookies();
            const accessToken = cookies.get('token');

            if (accessToken) {
                // check if token is expired
                const decodedToken = jwtDecode<JwtPayload>(accessToken);

                if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
                    // token is expired
                    // remove token from COOKIE
                    cookies.remove('token');
                    // remove token from store
                    useBearStore.getState().logout();

                    // try to refresh token
                    const refreshToken = cookies.get('refreshToken');
                    if (refreshToken) {
                        try {
                            const response = await axios.post(
                                '/api/auth/refresh',
                                {
                                    refreshToken
                                }
                            );
                            const newAccessToken = response.data.accessToken;
                            const newRefreshToken = response.data.refreshToken;
                            // set new token to COOKIE
                            cookies.set('token', newAccessToken);
                            cookies.set('refreshToken', newRefreshToken);
                        } catch (error) {
                            // eslint-disable-next-line no-console
                            console.error(error);
                        }
                    }
                } else {
                    if (config.headers)
                        config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
        }
        return config;
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
    async function (error: AxiosError) {
        const originalRequest: AxiosRequestConfig = error.config || {};

        if ([401, 403].includes(error.response?.status || 0)) {
            const cookies = new Cookies();
            const token = cookies.get('token');
            const refresh = cookies.get('refresh_token');
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/oauth/token/refresh`,
                { refresh },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                const newAccessToken = response.data.access;
                const newRefreshToken = response.data.refresh;
                // set new token to COOKIE
                cookies.set('token', newAccessToken);
                cookies.set('refresh_token', newRefreshToken);
                return axiosApiInstance(originalRequest);
            } else {
                // remove token from COOKIE
                cookies.remove('token');
                cookies.remove('refresh_token');
                // clear redux store
                useBearStore.getState().logout();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosApiInstance;
