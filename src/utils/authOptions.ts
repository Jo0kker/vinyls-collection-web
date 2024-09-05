import { AuthOptions, Awaitable, JWT, Session, User, getServerSession } from 'next-auth'
import { default as CredentialsProvider } from 'next-auth/providers/credentials'

type AuthResponse = {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
}

async function refreshToken(token: JWT) {
    try {
        const response = await fetch(process.env.API_URL + '/oauth/token', {
            method: 'POST',
            body: JSON.stringify({
                scope: '',
                refresh_token: token.refresh_token,
                grant_type: 'refresh_token',
                client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const data = (await response.json()) as { accessToken: string; refreshToken: string }

            return {
                ...token,
                ...data
            }
        } else {
            throw response
        }
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                username: { label: 'E-mail' },
                password: { label: 'Mot de passe', type: 'password' }
            },
            async authorize(credentials) {
                const authResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/oauth/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...credentials,
                        grant_type: 'password',
                        client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
                        client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET
                    })
                })

                console.log(authResponse)

                if (!authResponse.ok) return null

                const authData = (await authResponse.json()) as AuthResponse

                console.log(authData)

                const user = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users/me', {
                    next: {
                        revalidate: 3600
                    },
                    headers: {
                        Authorization: `Bearer ${authData.access_token}`
                    }
                })

                if (!user.ok) return null

                const userData = await user.json().then(response => {
                    return Object.entries(response).reduce(
                        (acc, [key, value]) =>
                            value
                                ? {
                                      ...acc,
                                      [key]: value
                                  }
                                : acc,
                        {}
                    )
                })

                console.log(userData)

                return {
                    ...userData,
                    ...authData
                } as unknown as Awaitable<User>
            }
        })
    ],
    callbacks: {
        signIn({ user }) {
            if (user) return true
            return false
        },
        jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user
                }

                return token
            } else if (Date.now() < token.exp * 1000) {
                return token
            } else {
                return refreshToken(token)
            }
        },
        session({ session, token }) {
            session.user = {
                ...session.user,
                ...token,
                image: null
            } as Session['user']

            return session
        },
        redirect({ baseUrl }) {
            return baseUrl
        }
    }
}

export const getSession = () => getServerSession(authOptions)
