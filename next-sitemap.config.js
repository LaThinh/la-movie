/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'movie.laquocthinh.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
    // exclude: ['/server-sitemap-index.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            process.env.NEXT_PUBLIC_SITE_URL + 'server-sitemap-index.xml', // <==== Add here
        ],
    },
}