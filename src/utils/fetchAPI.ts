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
    if (response.ok || ![400, 401, 403, 404, 422, 429, 500, 503, 504].includes(response.status)) {
            const data = await response.json()
            return {
                ...data,
                status: response.status
            }
        } else {
            const errorData = await response.json()

            throw new Error(JSON.stringify(errorData), { cause: response.status })
        }
    })
}
