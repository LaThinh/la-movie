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
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

}

module.exports = nextConfig
