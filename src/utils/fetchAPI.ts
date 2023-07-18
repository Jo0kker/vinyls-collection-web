import { getSession } from './authOptions'

type FetchResponse<T> = {
    data: T
    links?: {
        first: string | null
        last: string | null
        prev: string | null
        next: string | null
    }
    meta?: Partial<{
        current_page: number
        from: number
        last_page: number
        links: string[]
        path: string
        per_page: number
        to: number
        total: number
    }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchAPI<T = any>(
    url: string,
    options?: RequestInit & { withSession?: boolean }
): Promise<FetchResponse<T>> {
    const session = options?.withSession ? await getSession() : null

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api` + url, {
        ...options,
        headers: {
            ...options?.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'identity',
            'Access-Control-Allow-Origin': '*',
            ...(session
                ? {
                      Authorization: `Bearer ${session.user.access_token}`
                  }
                : {})
        }
    }).then(async response => {
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error(
                'Une erreur est survenue: ' +
                    response.status +
                    ': ' +
                    response.statusText +
                    response.url
            )
        }
    })
}
