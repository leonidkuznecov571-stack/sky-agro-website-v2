import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();

function walk(dir, predicate, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, predicate, files);
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

const htmlFiles = walk(root, (file) => file.endsWith('.html'));
const errors = [];
const warnings = [];

function toRepoPath(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function addMessage(list, file, message) {
  list.push(`${toRepoPath(file)}: ${message}`);
}

function resolveSitePath(rawValue) {
  const cleanValue = decodeURIComponent(rawValue.split('#')[0].split('?')[0]);
  if (!cleanValue) {
    return null;
  }

  const withoutLeadingSlash = cleanValue.replace(/^\/+/, '');
  const direct = path.join(root, withoutLeadingSlash);
  const candidates = [direct];

  if (!path.extname(withoutLeadingSlash)) {
    candidates.push(path.join(root, `${withoutLeadingSlash}.html`));
    candidates.push(path.join(root, withoutLeadingSlash, 'index.html'));
  }

  if (cleanValue.endsWith('/')) {
    candidates.push(path.join(root, withoutLeadingSlash, 'index.html'));
  }

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf8');

  if (!text.includes('<main id="main-content">')) {
    addMessage(warnings, file, 'missing `<main id="main-content">`');
  }

  if (!text.includes('<header class="site-header"></header>')) {
    addMessage(warnings, file, 'missing shared header mount');
  }

  if (!text.includes('<footer class="site-footer"></footer>')) {
    addMessage(warnings, file, 'missing shared footer mount');
  }

  const nestedParagraph = text.match(/<p>(?:(?!<\/p>).)*<p>/s);
  if (nestedParagraph) {
    addMessage(errors, file, 'contains a nested or unclosed `<p>` sequence');
  }

  const srcHrefRegex = /\b(?:src|href)=["']([^"']+)["']/g;
  let match;
  while ((match = srcHrefRegex.exec(text))) {
    const value = match[1];

    if (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:') ||
      value.startsWith('data:') ||
      value.startsWith('#')
    ) {
      continue;
    }

    if (value === '#') {
      addMessage(warnings, file, 'contains placeholder `href="#"`');
      continue;
    }

    const resolved = value.startsWith('/')
      ? resolveSitePath(value)
      : resolveSitePath(path.posix.join(path.posix.dirname(toRepoPath(file)), value));

    if (!resolved) {
      addMessage(errors, file, `missing local asset or page for \`${value}\``);
    }
  }

  const actionMatches = text.match(/action=["']#["']/g);
  if (actionMatches) {
    addMessage(warnings, file, 'contains placeholder `action="#"`');
  }
}

const searchIndexPath = path.join(root, 'js/product-search-data.js');
if (fs.existsSync(searchIndexPath)) {
  const raw = fs.readFileSync(searchIndexPath, 'utf8');
  const prefix = 'window.SKY_AGRO_PRODUCT_INDEX = ';

  if (raw.startsWith(prefix)) {
    const source = raw.slice(prefix.length).trim().replace(/;?\s*$/, '');
    const entries = vm.runInNewContext(source);

    for (const entry of entries) {
      if (!entry.href || !entry.href.startsWith('/')) {
        continue;
      }

      if (!resolveSitePath(entry.href)) {
        addMessage(errors, searchIndexPath, `search entry points at a missing page: ${entry.href}`);
      }
    }
  }
}

if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.log('Errors:');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} HTML files with no blocking issues.`);
}
