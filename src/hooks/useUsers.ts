import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../services/interceptorService';
import type { User } from '../types/User';

export const useMe = (options?: UseQueryOptions<User>) =>
    useQuery({
        ...options,
        queryKey: ['me'] as QueryKey,
        queryFn: ({ signal }) =>
            axiosApiInstance
                .get<User>('/users/me', { signal })
                .then(res => res.data)
    });
