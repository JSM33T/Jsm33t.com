/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://jsm33t.com',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    changefreq: 'weekly',
    sitemapSize: 5000,
    exclude: ['/admin', '/api/*'], // if needed
  };
  