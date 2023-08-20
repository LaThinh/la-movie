/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "image.tmdb.org"
        ],
    },

    experimental: {
        serverActions: true,
    },

    serverRuntimeConfig: {
        movieToken: process.env.THE_MOVIE_API_TOKEN
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

}

module.exports = nextConfig
