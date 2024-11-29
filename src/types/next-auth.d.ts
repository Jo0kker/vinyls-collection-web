/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { User } from './User'

declare module 'next-auth' {
    interface Session {
        user: User & {
            access_token: string
            error?: string
        }
    }

    interface JWT {
        username: string
        access_token: string
        refresh_token: string
        expires_in: number
        exp: number
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string
        access_token: string
        refresh_token: string
        exp: number
        expires_in: number
    }
}
