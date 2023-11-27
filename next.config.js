/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/**'
            },
            {
                protocol: 'https',
                hostname: '*.digitaloceanspaces.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.discogs.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['*']
        }
    },
    eslint: {
        // On peut désactiver pour l'instant le temps de se familiariser avec les différentes règles
        ignoreDuringBuilds: true
    }
}

module.exports = nextConfig
