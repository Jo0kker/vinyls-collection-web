/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        id: number;
        name: string;
        email: string;
        avatar: string;
        email_verified_at: Date;
        is_subscribed_newsletter: number;
        is_blocked: number;
        last_activity: string;
        first_name: string;
        last_name: string;
        phone: string;
        birth_date: string;
        audio_equipment: string;
        influence: string;
        description: string;
        created_at: Date;
        updated_at: Date;
        deleted_at?: Date;
        collections_count?: number;
        collectionVinyls_count?: number;
    }

    interface Session {
        user: User & {
            access_token: string;
        };
    }

    interface JWT {
        username: string;
        access_token: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string;
        access_token: string;
    }
}
