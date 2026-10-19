// Writing-section constants. Every value here traces to docs/content-brief.md.

import { SOCIAL } from './site';

export const WRITING = {
  title: 'Writing',
  description: 'Notes on AI, agent research and building things, by Kushal Jayavarapu.',
  feedPath: '/rss.xml',
} as const;

export interface FootnoteIssue {
  title: string;
  href: string;
  date: string; // ISO date, e.g. '2026-10-13'
}

// The Footnote is published on LinkedIn and linked out to, not republished here.
export const FOOTNOTE = {
  name: 'The Footnote',
  blurb: 'A weekly AI explainer series in plain words, published on LinkedIn every Tuesday.',
  followHref: SOCIAL.linkedin,
  // TODO(content-brief): per-issue links, newest first. The "Latest issues" list
  // stays hidden while this is empty.
  issues: [] as FootnoteIssue[],
};
