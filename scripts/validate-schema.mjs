import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { loadSiteData } from './site-data.mjs';

const { contactFaqs, catalogueProductModels, describeType } = await loadSiteData();

// Run against an SSR server: node scripts/validate-schema.mjs http://localhost:8080
const base = process.argv[2] ?? 'http://localhost:8080';
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
const origin = urls[0].origin;
const report = [];
for (const canonical of urls) {
  const response = await fetch(new URL(canonical.pathname, base));
  assert.equal(response.status, 200, canonical.pathname);
  const html = await response.text();
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, `${canonical.pathname}: exactly one JSON-LD graph`);
  const graph = JSON.parse(scripts[0][1]);
  assert.equal(graph['@context'], 'https://schema.org');
  const nodes = graph['@graph'];
  const ids = new Set(nodes.map(node => node['@id']));
  assert.equal(ids.size, nodes.length, 'unique entity IDs');
  const types = nodes.flatMap(node => [node['@type']].flat());
  assert.equal(types.filter(type => type === 'Organization').length, 1);
  assert.equal(types.filter(type => type === 'LocalBusiness').length, 1);
  assert.equal(types.filter(type => type === 'WebSite').length, 1);
  const page = nodes.find(node => node['@id'] === `${canonical.href}#webpage`);
  assert.ok(page, 'page-specific WebPage');
  assert.equal(page.url, canonical.href);
  assert.ok(html.includes(`rel="canonical" href="${canonical.href}"`), 'matching canonical');
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1, 'one canonical per page');
  const breadcrumb = nodes.find(node => node['@type'] === 'BreadcrumbList');
  if (canonical.pathname !== '/') {
    assert.ok(breadcrumb, 'inner-page breadcrumbs');
    const items = breadcrumb.itemListElement;
    assert.equal(items.at(-1).item, canonical.href);
    assert.deepEqual(items.map(item => item.position), items.map((_, i) => i + 1));
  }
  function inspect(value) {
    if (!value || typeof value !== 'object') return;
    if (Object.keys(value).length === 1 && value['@id']) assert.ok(ids.has(value['@id']), `resolved reference: ${value['@id']}`);
    for (const [key, item] of Object.entries(value)) {
      assert.ok(!['offers', 'aggregateRating', 'review', 'price', 'availability'].includes(key), `no invented commercial data: ${key}`);
      if (['url', 'image', 'logo', 'item', '@id'].includes(key) && typeof item === 'string') {
        assert.ok(item.startsWith('https://'), `absolute URL: ${item}`);
        if (item.includes('#organization') || item.includes('#webpage') || item.includes('#website')) assert.ok(item.startsWith(origin), 'canonical entity origin');
      }
      if (Array.isArray(item)) item.forEach(inspect); else inspect(item);
    }
  }
  inspect(graph);
  const list = nodes.find(node => node['@id'] === `${canonical.href}#product-types`);
  const expectedProducts = catalogueProductModels.filter(product => product.path === canonical.pathname);
  const products = nodes.filter(node => node['@type'] === 'Product');
  assert.equal(products.length, expectedProducts.length, 'only named catalogue items receive Product records');
  assert.ok(page['@type'] !== 'Product', 'the page itself remains a collection, not an individual product');
  for (const expected of expectedProducts) {
    const product = products.find(node => node.name === expected.name);
    assert.ok(product, expected.name);
    assert.equal(product.brand.name, expected.brand);
    assert.equal(product.description, describeType(expected.name));
    assert.deepEqual(product.mainEntityOfPage, {'@id': page['@id']});
    assert.ok(html.includes(`id="${new URL(product.url).hash.slice(1)}"`), 'Product URL matches a visible card');
  }
  if (canonical.pathname.split('/').filter(Boolean).length === 2) {
    assert.ok(types.includes('CollectionPage') && list, 'collection and type list');
    assert.equal(list.numberOfItems, list.itemListElement.length);
    for (const item of list.itemListElement) {
      const entity = item.item['@id'] ? nodes.find(node => node['@id'] === item.item['@id']) : item.item;
      assert.ok(item.name && entity?.description && item.url.startsWith(canonical.href + '#type-'));
      assert.equal(entity.name, item.name);
      assert.ok(html.includes(`id="${new URL(item.url).hash.slice(1)}"`), 'type URL points to visible card');
    }
    assert.ok(html.includes('id="selection-guidance"'), 'server-rendered selection guidance');
  }
  if (canonical.pathname === '/contact') {
    assert.ok(types.includes('ContactPage') && types.includes('FAQPage'));
    assert.equal(page.mainEntity.length, contactFaqs.length);
    assert.deepEqual(page.mainEntity.map(question => ({question: question.name, answer: question.acceptedAnswer.text})), contactFaqs);
    assert.ok(page.mainEntity.every(question => question.acceptedAnswer.text));
  } else assert.ok(!types.includes('FAQPage'), 'FAQ only where rendered');
  report.push({ path: canonical.pathname, status: response.status, types, listedTypes: list?.numberOfItems ?? 0, products: products.length });
  await mkdir('/tmp/rbi-schema-validation', { recursive: true });
  await writeFile(`/tmp/rbi-schema-validation/${canonical.pathname.replaceAll('/', '_') || 'home'}.html`, html);
}
const missing = await fetch(new URL('/automation/not-a-real-product', base));
assert.equal(missing.status, 404, 'unknown product retains 404 behavior');
await writeFile('/tmp/rbi-schema-validation/report.json', JSON.stringify(report, null, 2));
console.log(`PASS: ${report.length} SSR routes; one connected graph per page; canonical URLs, breadcrumbs, FAQs, named catalogue Products, range lists and 404 behavior verified.`);
console.log(`Canonical origin: ${origin}`);
console.log('HTML exports and detailed results: /tmp/rbi-schema-validation/');
