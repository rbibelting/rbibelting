// Tooling-only loader: taxonomy contains browser image imports; route generation needs
// their paths, not the image bytes. Runtime application imports are not modified.
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

export async function loadSiteData() {
  const text = await readFile(new URL('../src/lib/site-data.ts', import.meta.url), 'utf8');
  const source = text.replace(/^import (\w+) from "(@\/assets\/[^"\n]+)";$/gm,
    (_, name, path) => `const ${name} = ${JSON.stringify(path)};`);
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}

export function publicPaths(data) {
  return ['/', '/about', '/contact', '/franchise', ...data.pillarList.flatMap(pillar =>
    [`/${pillar.key}`, ...pillar.subcategories.map(sub => `/${pillar.key}/${sub.slug}`)])];
}
