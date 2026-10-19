import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { WRITING } from '../config/writing';
import { getPosts, postHref } from '../lib/blog';

// Hand-written RSS 2.0 (a few lines, so no @astrojs/rss dependency). Drafts are
// never included, even in `astro dev`.

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  // `site` is always set in astro.config.mjs; the guard only keeps types honest.
  if (!site) throw new Error('[rss] `site` must be set in astro.config.mjs');
  const url = (path: string) => new URL(path, site).href;

  const posts = await getPosts({ includeDrafts: false });

  const items = posts
    .map((post) => {
      const link = url(postHref(post));
      const categories = post.data.tags
        .map((tag) => `      <category>${escape(tag)}</category>`)
        .join('\n');
      return [
        '    <item>',
        `      <title>${escape(post.data.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <description>${escape(post.data.description)}</description>`,
        `      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const lastBuild = posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate;

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escape(`${WRITING.title} · ${SITE.name}`)}</title>`,
    `    <link>${url('/writing/')}</link>`,
    `    <description>${escape(WRITING.description)}</description>`,
    `    <language>${SITE.locale}</language>`,
    `    <atom:link href="${url(WRITING.feedPath)}" rel="self" type="application/rss+xml" />`,
    lastBuild ? `    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>` : '',
    items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter((line, i, all) => line !== '' || i === all.length - 1)
    .join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
