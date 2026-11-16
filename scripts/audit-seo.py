"""Audit initial HTML without a browser. Run with an SSR server already running.

python3 scripts/audit-seo.py http://localhost:8080 docs/seo/advanced/baseline.json
Set SEO_STRICT=1 to fail the process for findings.
"""
import collections
import concurrent.futures
import json
import os
from pathlib import Path
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.description = []
        self.canonical = []
        self.h1 = []
        self.links = []
        self.schemas = []
        self.text = []
        self.capture = None
        self.buffer = ""
        self.in_main = False
        self.main_text = []
        self.images_without_alt = 0
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "main":
            self.in_main = True
        if tag in ("title", "h1") or (tag == "script" and attrs.get("type") == "application/ld+json"):
            self.capture = tag
            self.buffer = ""
        if tag == "meta" and attrs.get("name") == "description":
            self.description.append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href"))
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])
        if tag == "img" and "alt" not in attrs:
            self.images_without_alt += 1

    def handle_data(self, data):
        if self.capture:
            self.buffer += data
        if self.in_main and not self.capture == "script":
            self.main_text.append(data)

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False
        if tag != self.capture:
            return
        if tag == "title":
            self.title = self.buffer
        elif tag == "h1":
            self.h1.append(self.buffer)
        elif tag == "script":
            self.schemas.append(json.loads(self.buffer))
        self.capture = None


base = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"
destination = Path(sys.argv[2] if len(sys.argv) > 2 else "docs/seo/advanced/ssr-validation.json")
urls = [node.text for node in ET.parse("public/sitemap.xml").getroot().findall("{*}url/{*}loc")]
origin = urllib.parse.urlsplit(urls[0]).scheme + "://" + urllib.parse.urlsplit(urls[0]).netloc
paths = {urllib.parse.urlsplit(url).path for url in urls}


def fetch(path):
    try:
        response = urllib.request.urlopen(base.rstrip("/") + path, timeout=30)
    except urllib.error.HTTPError as error:
        response = error
    return response.status, response.read().decode("utf-8"), dict(response.headers)


def audit(url):
    path = urllib.parse.urlsplit(url).path
    status, html, headers = fetch(path)
    doc = Document()
    doc.feed(html)
    findings = []
    checks = [(status == 200, "HTTP 200"), (len(doc.canonical) == 1 and doc.canonical[0] == url, "one matching canonical"),
              (bool(doc.title), "title"), (len(doc.description) == 1 and bool(doc.description[0]), "description"),
              (len(doc.h1) == 1, "one H1"), (len(' '.join(doc.main_text)) > 200, "meaningful initial HTML"),
              (len(doc.schemas) == 1, "one JSON-LD graph"), (doc.images_without_alt == 0, "image alt attributes")]
    for passed, name in checks:
        if not passed:
            findings.append(name)
    nodes = doc.schemas[0].get("@graph", []) if doc.schemas else []
    ids = {node.get("@id") for node in nodes}
    if len(ids) != len(nodes):
        findings.append("duplicate graph IDs")
    types = [t for node in nodes for t in (node.get("@type") if isinstance(node.get("@type"), list) else [node.get("@type")])]
    def inspect(value):
        if isinstance(value, dict):
            if list(value) == ["@id"] and value["@id"] not in ids:
                findings.append("unresolved graph reference: " + value["@id"])
            if any(key in value for key in ("offers", "aggregateRating", "review", "price", "availability")):
                findings.append("commercial/review schema requires verification")
            for child in value.values():
                inspect(child)
        elif isinstance(value, list):
            for child in value:
                inspect(child)
    inspect(nodes)
    links = set()
    for href in doc.links:
        target = urllib.parse.urlsplit(urllib.parse.urljoin(origin + path, href))
        if target.netloc == urllib.parse.urlsplit(origin).netloc:
            links.add(target.path or "/")
    return {"path": path, "status": status, "title": doc.title, "description": doc.description,
            "canonical": doc.canonical, "h1": doc.h1, "types": types, "links": sorted(links),
            "main_text_length": len(' '.join(doc.main_text)), "findings": findings}


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(audit, urls))
depth = {"/": 0}
queue = collections.deque(["/"])
by_path = {page["path"]: page for page in pages}
while queue:
    current = queue.popleft()
    for target in by_path[current]["links"]:
        if target in paths and target not in depth:
            depth[target] = depth[current] + 1
            queue.append(target)
orphans = sorted(paths - set(depth))
duplicate_titles = [title for title, count in collections.Counter(p["title"] for p in pages).items() if count > 1]
duplicate_descriptions = [description for description, count in collections.Counter(p["description"][0] for p in pages if p["description"]).items() if count > 1]
missing = {path: fetch(path)[0] for path in ["/not-a-real-page", "/automation/not-a-real-product", "/power-transmission/not-a-real-product", "/adhesives/not-a-real-product"]}
parameter_checks = []
for path in ["/power-transmission?product=v-belts", "/automation?product=linear-motion", "/adhesives?product=threadlockers"]:
    status, html, _ = fetch(path)
    doc = Document()
    doc.feed(html)
    parameter_checks.append({"path": path, "status": status, "canonical": doc.canonical,
                             "passed": status == 200 and doc.canonical == [origin + path.split("?")[0]]})
robots_status, robots, _ = fetch("/robots.txt")
sitemap_status, sitemap, _ = fetch("/sitemap.xml")
report = {"base": base, "canonical_origin": origin, "pages": pages, "orphan_pages": orphans,
          "link_depth": depth, "duplicate_titles": duplicate_titles, "duplicate_descriptions": duplicate_descriptions,
          "missing_route_statuses": missing, "parameter_checks": parameter_checks,
          "robots_valid": robots_status == 200 and "Allow: /" in robots and origin + "/sitemap.xml" in robots,
          "sitemap_matches_source": sitemap_status == 200 and sitemap.strip() == Path("public/sitemap.xml").read_text().strip()}
report["passed"] = (not any(page["findings"] for page in pages) and not orphans and not duplicate_titles
                    and not duplicate_descriptions and all(code == 404 for code in missing.values())
                    and all(check["passed"] for check in parameter_checks) and report["robots_valid"] and report["sitemap_matches_source"])
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({"passed": report["passed"], "pages": len(pages), "orphans": orphans,
                  "findings": {p["path"]: p["findings"] for p in pages if p["findings"]}, "report": str(destination)}, indent=2))
if os.environ.get("SEO_STRICT") == "1" and not report["passed"]:
    sys.exit(1)
