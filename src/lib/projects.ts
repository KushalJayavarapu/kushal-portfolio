import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Published projects, in display order. Drafts are hidden from production builds only. */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** Projects live on the home page; each one's sheet has its slug as its id. */
export const projectHref = (project: Project) => `/#${project.id}`;
