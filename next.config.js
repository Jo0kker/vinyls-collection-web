/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    distDir: 'build',
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
                hostname: '*.discogs.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname: 'minio',
                port: '9000',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '*.sslip.io',
                port: '',
                pathname: '/**'
            }
        ]
    },
    eslint: {
        // On peut désactiver pour l'instant le temps de se familiariser avec les différentes règles
        ignoreDuringBuilds: true
    }
}

module.exports = nextConfig

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: 'sentry',
    project: 'vinyls-collection-web',
    sentryUrl: 'https://sentry.codible.net/',

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
        enabled: true
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
})
