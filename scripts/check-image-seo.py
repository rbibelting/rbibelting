"""Validate social images, responsive assets and internal destinations on an SSR server."""
import concurrent.futures
import csv
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
import urllib.parse
import urllib.request

base = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8080'
folder = Path('docs/seo/current')
report = json.loads((folder / 'ssr-validation.json').read_text())
origin = report['canonical_origin']

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.images, self.links, self.ids, self.graphs = {}, [], [], set(), []
        self.capture = False
        self.buffer = ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'meta': self.meta[a.get('property', a.get('name'))] = a.get('content')
        if tag == 'img': self.images.append(a)
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.capture, self.buffer = True, ''
    def handle_data(self, value):
        if self.capture: self.buffer += value
    def handle_endtag(self, tag):
        if tag == 'script' and self.capture:
            self.graphs.append(json.loads(self.buffer)); self.capture = False

pages, assets, findings = {}, set(), []
for row in report['pages']:
    path = row['path']
    with urllib.request.urlopen(base + path) as response: html = response.read().decode()
    p = Page(); p.feed(html); pages[path] = p
    for key in ('og:image', 'og:image:alt', 'twitter:image', 'twitter:image:alt', 'twitter:title', 'twitter:description'):
        if not p.meta.get(key): findings.append(f'{path}: missing {key}')
    if p.meta.get('og:image') != p.meta.get('twitter:image'): findings.append(f'{path}: inconsistent social images')
    page = next(n for n in p.graphs[0]['@graph'] if n.get('@id') == origin + path + '#webpage')
    if page.get('primaryImageOfPage', {}).get('url') != p.meta.get('og:image'): findings.append(f'{path}: schema image mismatch')
    assets.add(p.meta['og:image'])
    for image in p.images:
        if 'alt' not in image: findings.append(f'{path}: missing alt')
        assets.add(urllib.parse.urljoin(origin, image['src']))
        for candidate in image.get('srcSet', image.get('srcset', '')).split(','):
            if candidate.strip(): assets.add(urllib.parse.urljoin(origin, candidate.strip().split()[0]))
for path, page in pages.items():
    for href in page.links:
        target = urllib.parse.urlsplit(urllib.parse.urljoin(origin + path, href))
        if target.netloc != urllib.parse.urlsplit(origin).netloc: continue
        dest = target.path or '/'
        if dest in pages:
            if target.fragment and target.fragment not in pages[dest].ids:
                findings.append(f'{path}: missing fragment {href}')
        else: assets.add(urllib.parse.urlunsplit((target.scheme, target.netloc, target.path, '', '')))

def check(url):
    local = base + urllib.parse.urlsplit(url).path
    try:
        with urllib.request.urlopen(local) as response:
            return {'url': url, 'status': response.status, 'bytes': len(response.read())}
    except Exception as error:
        return {'url': url, 'error': str(error)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: results = list(pool.map(check, sorted(assets)))
findings += [r['url'] for r in results if r.get('status') != 200]
with (folder / 'page-wise-seo.csv').open('w') as f:
    writer = csv.writer(f)
    writer.writerow(['Page URL', 'SEO title', 'Meta description', 'Primary keyword', 'Canonical URL', 'Schema type', 'Indexing directive'])
    with Path('docs/seo/advanced/keyword-url-map.csv').open() as k: keywords = {r['URL']: r['Primary keyword'] for r in csv.DictReader(k)}
    for row in report['pages']:
        url = origin + row['path']
        writer.writerow([url, row['title'], row['description'][0], keywords[url], row['canonical'][0], ', '.join(row['types']), pages[row['path']].meta.get('robots', 'index, follow (default)')])
(folder / 'image-link-validation.json').write_text(json.dumps({'pages': len(pages), 'assets': results, 'findings': findings, 'passed': not findings}, indent=2) + '\n')
print(json.dumps({'pages': len(pages), 'assets': len(results), 'findings': findings, 'passed': not findings}, indent=2))
if findings: sys.exit(1)
