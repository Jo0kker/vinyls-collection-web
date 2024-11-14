'use server'

import { fetchAPI } from '@/utils/fetchAPI'

export async function updatePassword(data: { 
    current_password: string;
    password: string; 
    password_confirmation: string 
}) {
    return fetchAPI('/users/change-password', {
        method: 'POST',
        body: JSON.stringify(data),
        withSession: true
    })
}

export async function deleteAccount() {
    return fetchAPI('/users/account', {
        method: 'DELETE',
        withSession: true
    })
}