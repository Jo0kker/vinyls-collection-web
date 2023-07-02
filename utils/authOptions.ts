import {
    AuthOptions,
    Awaitable,
    Session,
    User,
    getServerSession
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type AuthResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
};

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'E-mail' },
                password: { label: 'Mot de passe', type: 'password' }
            },
            async authorize(credentials) {
                const authResponse = await fetch(
                    process.env.NEXT_PUBLIC_API_URL + '/oauth/token',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...credentials,
                            grant_type: 'password',
                            client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
                            client_secret:
                                process.env.NEXT_PUBLIC_API_CLIENT_SECRET
                        })
                    }
                );

                if (!authResponse.ok) return null;

                const authData = (await authResponse.json()) as AuthResponse;

                const user = await fetch(
                    process.env.NEXT_PUBLIC_API_URL + '/api/users/me',
                    {
                        headers: {
                            Authorization: `Bearer ${authData.access_token}`
                        }
                    }
                );

                if (!user.ok) return null;

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
                    );
                });

                return {
                    ...userData,
                    ...authData
                } as unknown as Awaitable<User>;
            }
        })
    ],
    callbacks: {
        signIn({ user }) {
            if (user) return true;
            return false;
        },
        jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    ...user
                };

                return token;
            }

            return token;
        },
        session({ session, token, user }) {
            session.user = {
                ...session.user,
                ...token,
                image: null
            } as Session['user'];

            return session;
        }
    }
};

export const getSession = () => getServerSession(authOptions);
