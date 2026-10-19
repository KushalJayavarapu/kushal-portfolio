// JSON-LD builders for the <Seo /> component. Every value traces to
// docs/content-brief.md; add fields here only when the brief records them.

import { SITE, SOCIAL } from '../config/site';

type JsonLd = Record<string, unknown>;

export interface ArticleMeta {
  /** First publication date (blog frontmatter `pubDate`). */
  publishedTime: Date;
  /** Last meaningful edit (blog frontmatter `updatedDate`). */
  modifiedTime?: Date;
  tags?: readonly string[];
}

const personId = (site: URL) => new URL('/#person', site).href;

export function personSchema(site: URL): JsonLd {
  return {
    '@type': 'Person',
    '@id': personId(site),
    name: SITE.name,
    url: new URL('/', site).href,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'PES University' },
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
  };
}

export function websiteSchema(site: URL): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': new URL('/#website', site).href,
    name: SITE.name,
    url: new URL('/', site).href,
    inLanguage: SITE.locale,
    publisher: { '@id': personId(site) },
  };
}

export function blogPostingSchema(opts: {
  site: URL;
  url: string;
  title: string;
  description: string;
  image: string;
  article: ArticleMeta;
}): JsonLd {
  const { site, url, title, description, image, article } = opts;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    headline: title,
    description,
    image,
    datePublished: article.publishedTime.toISOString(),
    dateModified: (article.modifiedTime ?? article.publishedTime).toISOString(),
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
    inLanguage: SITE.locale,
    author: { '@id': personId(site) },
    publisher: { '@id': personId(site) },
  };
}

/** Wraps nodes in one @graph so nodes can reference each other by @id. */
export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
