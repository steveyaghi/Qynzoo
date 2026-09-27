#!/usr/bin/env node
// Builds the Dutch site in /nl from the English pages.
//
//   node tools/build-nl.js            build /nl and add hreflang links to the EN pages
//   node tools/build-nl.js --missing  list English strings that have no Dutch
//                                     translation yet (as JSON, ready to paste
//                                     into tools/nl.json)
//
// Every visible text, <title>, meta description/og/twitter text, alt/aria-label/
// placeholder attribute and JSON-LD text value is looked up in tools/nl/*.json
// (English -> Dutch). Paths are rewritten so assets and the English-only blog
// still resolve from inside /nl. Re-run after changing an English page.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://qynzoo.com/';
const PAGES = [
  'index.html', 'about.html', 'websites.html', 'faq.html', 'process.html',
  'privacy-policy.html', 'terms-of-service.html', 'sitemap.html',
  'case-studies/waterprof.html', 'case-studies/haskoning.html', 'case-studies/odido.html',
  'case-studies/podcast-tuhaf-dashboard.html', 'case-studies/fugro.html'
];
// Translations live in tools/nl/*.json (one file per page area), merged here.
const DICT_DIR = path.join(__dirname, 'nl');
const dict = {};
if (fs.existsSync(DICT_DIR)) {
  for (const f of fs.readdirSync(DICT_DIR).filter(f => f.endsWith('.json')).sort()) {
    Object.assign(dict, JSON.parse(fs.readFileSync(path.join(DICT_DIR, f), 'utf8')));
  }
}
const missing = {};

const norm = s => s.replace(/\s+/g, ' ').trim();
const hasWords = s => /[A-Za-z]{2,}/.test(s);

function tr(raw, page) {
  const key = norm(raw);
  if (!key || !hasWords(key)) return raw;
  // Footer line carries the site version, which changes on every deploy.
  const copy = key.match(/^&copy; (\d{4}) Qynzoo\. All rights reserved\. \| (V[\d.]+)$/);
  if (copy) return raw.replace(key, '&copy; ' + copy[1] + ' Qynzoo. Alle rechten voorbehouden. | ' + copy[2]);
  if (Object.prototype.hasOwnProperty.call(dict, key)) {
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.match(/\s*$/)[0];
    return lead + dict[key] + trail;
  }
  (missing[page] = missing[page] || {})[key] = '';
  return raw;
}

// Things that are never translated: brand/product names, emails, numbers.
const KEEP = /^(Qynzoo|Qynzoo Logo|Waterprof|Fugro|Haskoning|ODIDO|Odido|Podcast Tuhaf|LinkedIn|Azure|Python|SharePoint|n8n|Excel|SQL|Power BI|ThoughtSpot|React|Vite|JavaScript|GitHub|HTML|CSS|RAG|YouTube|Facebook|Werner Halter|Natalia Trushina|Mostafa Yaghi|mostafa\.yaghi@qynzoo\.com|0684550084|\+31-684550084|Random Forest|Neural Networks|Auto-Encoders|Blog|FAQ|Nederlands Arabisch Cultuurhuis|WORKED WITH|BUILT WITH)$/;

function trText(raw, page) {
  const key = norm(raw);
  if (KEEP.test(key)) return raw;
  return tr(raw, page);
}

// Rewrite a relative URL so it still works one folder deeper (/nl/...).
// Pages that exist in Dutch keep their relative link (they resolve inside
// /nl); assets and the English-only blog get an extra "../".
const NL_PAGES = new Set(PAGES.map(p => path.basename(p)));
function fixUrl(url, depth) {
  if (!url || /^(https?:|mailto:|tel:|#|data:|javascript:)/.test(url)) return url;
  const m = url.match(/^((?:\.\.\/)*)(.*)$/);
  const ups = m[1];
  const rest = m[2];
  const file = rest.split(/[?#]/)[0];
  const top = file.split('/')[0];
  const isAsset = /^(css|js|images|logos|documents|tools)$/.test(top) || /^blog/.test(file);
  const isNlPage = NL_PAGES.has(path.basename(file)) || top === 'case-studies';
  if (isAsset || !isNlPage) return '../' + ups + rest;
  return url;
}

function translateJsonLd(json, page, enUrl, nlUrl) {
  const TEXT_KEYS = new Set(['name', 'description', 'text', 'headline', 'jobTitle', 'reviewBody', 'credentialCategory', 'educationalLevel', 'addressLocality']);
  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(node)) {
        if (typeof v === 'string' && TEXT_KEYS.has(k)) out[k] = trText(v, page);
        else if (typeof v === 'string' && k === 'url' && v === enUrl) out[k] = nlUrl; // page URL only; @ids stay shared
        else if (k === 'inLanguage') out[k] = 'nl';
        else out[k] = walk(v);
      }
      return out;
    }
    return node;
  };
  return walk(json);
}

function i18nBlock(page, forNl) {
  const enPath = page === 'index.html' ? '' : page;
  const en = SITE + enPath;
  const nl = SITE + 'nl/' + enPath;
  const depth = page.split('/').length - 1 + (forNl ? 1 : 0);
  const js = '../'.repeat(depth) + 'js/lang.js';
  return '<!-- i18n:start -->\n' +
    '    <link rel="alternate" hreflang="en" href="' + en + '">\n' +
    '    <link rel="alternate" hreflang="nl" href="' + nl + '">\n' +
    '    <link rel="alternate" hreflang="x-default" href="' + en + '">\n' +
    '    <script src="' + js + '"></script>\n' +
    '    <!-- i18n:end -->';
}

function withI18n(html, page, forNl) {
  const block = i18nBlock(page, forNl);
  if (html.includes('<!-- i18n:start -->')) {
    return html.replace(/<!-- i18n:start -->[\s\S]*?<!-- i18n:end -->/, block);
  }
  return html.replace(/(<link rel="canonical"[^>]*>)/, '$1\n    ' + block);
}

function buildPage(page) {
  const srcPath = path.join(ROOT, page);
  let html = fs.readFileSync(srcPath, 'utf8').replace(/\r\n/g, '\n');

  // English page: make sure it links to its Dutch twin.
  const enWithLinks = withI18n(html, page, false);
  if (enWithLinks !== html) fs.writeFileSync(srcPath, enWithLinks);
  html = enWithLinks;

  const depth = page.split('/').length; // folders below site root once inside /nl
  const enUrl = SITE + (page === 'index.html' ? '' : page);
  const nlUrl = SITE + 'nl/' + (page === 'index.html' ? '' : page);

  // Tokenize: comments, script, style, tags, text.
  const re = /(<!--[\s\S]*?-->)|(<script\b[^>]*>[\s\S]*?<\/script>)|(<style\b[^>]*>[\s\S]*?<\/style>)|(<[^>]+>)|([^<]+)/g;
  let out = '';
  let m;
  while ((m = re.exec(html))) {
    const [tok, comment, script, style, tag, text] = m;
    if (comment || style) { out += tok; continue; }
    if (script) {
      if (/application\/ld\+json/.test(script)) {
        const body = script.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
        const json = translateJsonLd(JSON.parse(body), page, enUrl, nlUrl);
        const indent = (body.match(/\n(\s*)\S/) || [, '    '])[1];
        out += '<script type="application/ld+json">\n' + indent + JSON.stringify(json, null, 2).replace(/\n/g, '\n' + indent) + '\n    </script>';
      } else {
        out += script
          .replace(/(<script[^>]*\bsrc=")([^"]+)(")/, (s, a, u, b) => a + fixUrl(u, depth) + b)
          .replace(/window\.CARD_NAV_BASE = '([^']*)'/, (s, b) => "window.CARD_NAV_BASE = '" + '../' + b + "'");
      }
      continue;
    }
    if (tag) {
      let t = tag;
      if (/^<html\b/.test(t)) t = t.replace(/lang="[^"]*"/, 'lang="nl"');
      t = t.replace(/\b(href|src|action)="([^"]*)"/g, (s, k, v) => k + '="' + fixUrl(v, depth) + '"');
      t = t.replace(/\b(data-photos|data-logo)="([^"]*)"/g, (s, k, v) => k + '="' + v.split(',').map(u => fixUrl(u, depth)).join(',') + '"');
      t = t.replace(/\b(alt|aria-label|placeholder|title)="([^"]*)"/g, (s, k, v) => k + '="' + trText(v, page) + '"');
      if (/^<meta\b/.test(t) && /(name|property)="(description|og:title|og:description|twitter:title|twitter:description)"/.test(t)) {
        t = t.replace(/content="([^"]*)"/, (s, v) => 'content="' + trText(v, page) + '"');
      }
      if (/^<meta\b/.test(t) && /(name|property)="(og:url|twitter:url)"/.test(t)) {
        t = t.replace(/content="([^"]*)"/, (s, v) => 'content="' + (v === enUrl ? nlUrl : v) + '"');
      }
      if (/^<link\b/.test(t) && /rel="canonical"/.test(t)) t = t.replace(/href="[^"]*"/, 'href="' + nlUrl + '"');
      out += t;
      continue;
    }
    out += trText(text, page);
  }

  // Dutch pages at /nl/*.html need the nav base for assets; case studies
  // already set it (and got an extra ../ above).
  if (!/window\.CARD_NAV_BASE/.test(out)) {
    out = out.replace(/(\s*<script src="[^"]*card-nav\.js[^"]*")/, "\n    <script>window.CARD_NAV_BASE = '" + '../'.repeat(depth) + "';</script>$1");
  }
  out = withI18n(out, page, true);

  const dest = path.join(ROOT, 'nl', page);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
}

PAGES.forEach(buildPage);

const missCount = Object.values(missing).reduce((n, o) => n + Object.keys(o).length, 0);
if (process.argv.includes('--missing')) {
  // --only=case-studies limits the list to pages whose path contains that text.
  const only = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7);
  const flat = {};
  Object.entries(missing).forEach(([p, o]) => { if (!only || p.includes(only)) Object.assign(flat, o); });
  process.stdout.write(JSON.stringify(flat, null, 2) + '\n');
} else {
  console.log('Built ' + PAGES.length + ' Dutch pages in /nl. Untranslated strings: ' + missCount);
  for (const [p, o] of Object.entries(missing)) console.log('  ' + p + ': ' + Object.keys(o).length);
}
