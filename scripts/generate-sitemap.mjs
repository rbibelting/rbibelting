import { writeFile } from 'node:fs/promises';
import { loadSiteData, publicPaths } from './site-data.mjs';

const data = await loadSiteData();
const origin = data.websiteIdentity.url;
const paths = publicPaths(data);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + paths.map(path => `  <url><loc>${new URL(path, origin).href}</loc></url>`).join('\n') + '\n</urlset>\n';
await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml);
await writeFile(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated sitemap and robots.txt for ${paths.length} public URLs on ${origin}.`);
