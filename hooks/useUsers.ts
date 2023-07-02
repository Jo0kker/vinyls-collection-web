import {
    QueryKey,
    UseQueryOptions,
    useMutation,
    useQuery
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import axiosApiInstance from '../services/interceptorService';
import type { User } from '../types/User';

export const useLogin = (username: string, password: string) => {
    return useMutation({
        mutationFn: () => {
            return axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/oauth/token`,
                    {
                        grant_type: 'password',
                        client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
                        client_secret:
                            process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
                        username: username,
                        password: password,
                        scope: ''
                    },
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response: AxiosResponse) => {
                    const cookie = new Cookies();
                    cookie.set('token', response.data.access_token, {
                        path: '/',
                        maxAge: 31536000 // Expires after 1year
                    });
                    cookie.set('refresh_token', response.data.refresh_token, {
                        path: '/',
                        maxAge: 31536000 // Expires after 1year
                    });
                    cookie.set('expires_in', response.data.expires_in, {
                        path: '/',
                        maxAge: 31536000 // Expires after 1year
                    });
                });
        }
    });
};

export const useMe = (options?: UseQueryOptions<User>) =>
    useQuery({
        ...options,
        queryKey: ['me'] as QueryKey,
        queryFn: ({ signal }) =>
            axiosApiInstance
                .get<User>('/users/me', { signal })
                .then(res => res.data)
    });

export const useLogout = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    cookies.remove('refresh_token');
    cookies.remove('expires_in');
    window.location.href = '/';
};
