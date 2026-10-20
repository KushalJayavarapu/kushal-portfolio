import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts } from '../../../lib/blog';
import { getProjects } from '../../../lib/projects';
import { renderOgImage, type OgCard } from '../../../lib/og';

// One preview card per project and post, at the path ogImagePath() returns.
export const getStaticPaths = (async () => {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  return [
    ...projects.map((p) => ({
      params: { section: 'projects', id: p.id },
      props: { eyebrow: 'Project', title: p.data.title, description: p.data.summary },
    })),
    ...posts.map((p) => ({
      params: { section: 'writing', id: p.id },
      props: { eyebrow: 'Writing', title: p.data.title, description: p.data.description },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute<OgCard> = async ({ props }) =>
  new Response(new Uint8Array(await renderOgImage(props)), { headers: { 'Content-Type': 'image/png' } });
