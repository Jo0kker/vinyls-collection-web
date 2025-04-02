import { headers } from 'next/headers'

import { getSession } from './authOptions'

export type FetchResponse<T> = {
    avatar: string | null
    id: any
    data: T
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
    status: number
    message?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchAPI<T = any>(
    url: string,
    options?: RequestInit & { withSession?: boolean }
): Promise<FetchResponse<T>> {
    const session = options?.withSession ? await getSession() : null

    // if options.body not formData add headers 'application/json'
    if (options?.body && !(options.body instanceof FormData)) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json'
        }
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api` + url, {
        ...options,
        headers: {
            ...options?.headers,
            Accept: 'application/json',
            'Accept-Encoding': 'identity',
            'Access-Control-Allow-Origin': '*',
            ...(session
                ? {
                      Authorization: `Bearer ${session.user.access_token}`
                  }
                : {})
        }
    }).then(async response => {
        const data = await response.json()
        
        if (response.ok || ![400, 401, 403, 404, 422, 500, 503, 504].includes(response.status)) {
            return {
                ...data,
                status: response.status
            }
        } else {
            // Pour les erreurs 429, on retourne quand même les données
            if (response.status === 429) {
                return {
                    ...data,
                    status: response.status
                }
            }
            throw new Error(JSON.stringify(data))
        }
    })
}
