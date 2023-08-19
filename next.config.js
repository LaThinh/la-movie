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

    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
