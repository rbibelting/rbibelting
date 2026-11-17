import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { loadSiteData, publicPaths } from './site-data.mjs';

const data = await loadSiteData();
const paths = publicPaths(data);
assert.equal(new Set(paths).size, paths.length);
const sitemap = await readFile('public/sitemap.xml', 'utf8');
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname), paths);
const slugs = new Set(data.pillarList.flatMap(pillar => pillar.subcategories.map(sub => sub.slug)));
for (const pillar of data.pillarList) for (const sub of pillar.subcategories) {
  const guidance = data.rangeGuidance[sub.slug];
  assert.ok(guidance?.explanation && guidance.question && guidance.answer && guidance.selection.length, sub.slug);
  for (const slug of guidance.related) assert.ok(slugs.has(slug), `Unknown related range: ${slug}`);
  for (const type of sub.types) {
    assert.ok(data.searchItems.some(item => item.name === type && item.to === `/${pillar.key}?product=${sub.slug}`));
  }
}
assert.equal(data.getEnquiryCategory('Automation & Motion Control'), 'Automation');
assert.equal(data.getEnquiryCategory('Industrial Adhesives & Chemicals'), 'Adhesives');
const source = await readFile('src/lib/analytics.ts', 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const context = {exports: {}, window: {}};
vm.runInNewContext(compiled, context);
context.exports.trackEnquiryHandoff('email', 'private@example.com');
const event = JSON.parse(JSON.stringify(context.window.dataLayer[0]));
assert.deepEqual(event, {event:'enquiry_handoff', enquiry_method:'email', product_category:'Unspecified'});
assert.ok(!JSON.stringify(event).includes('private@example.com'));
const root = await readFile('src/routes/__root.tsx', 'utf8');
assert.equal([...root.matchAll(/id="google-tag-manager"/g)].length, 1);
console.log(`PASS: ${paths.length} sitemap paths, ${slugs.size} range guidance records, product search destinations, category normalization and sanitized analytics.`);

for (const product of data.catalogueProductModels) {
  const [division, slug] = product.path.split('/').filter(Boolean);
  const sub = data.pillarList.find(pillar => pillar.key === division)?.subcategories.find(sub => sub.slug === slug);
  assert.ok(sub?.types.includes(product.name), `Product must match a visible catalogue card: ${product.name}`);
  assert.ok(product.brand && product.name.includes(product.brand), `Explicit brand for ${product.name}`);
}
const robots = await readFile('public/robots.txt', 'utf8');
for (const agent of data.aiCrawlerUserAgents) assert.ok(robots.includes(`User-agent: ${agent}\n`), `AI crawler policy: ${agent}`);
assert.ok(!/^Disallow:\s*\//m.test(robots), 'Public catalogue remains crawlable');
console.log(`PASS: ${data.catalogueProductModels.length} named catalogue Products and ${data.aiCrawlerUserAgents.length} explicit AI crawler permissions.`);
