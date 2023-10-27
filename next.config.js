/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['picsum.photos', 'via.placeholder.com', 'i.discogs.com', 'localhost']
    },
    eslint: {
        // On peut désactiver pour l'instant le temps de se familiariser avec les différentes règles
        ignoreDuringBuilds: true
    }
}

module.exports = nextConfig
