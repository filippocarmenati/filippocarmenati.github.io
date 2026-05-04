import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** All non-draft posts, newest first. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  return all.sort((a, b) => {
    const da = a.data.date?.valueOf() ?? 0;
    const db = b.data.date?.valueOf() ?? 0;
    return db - da;
  });
}

/** Posts that carry a given tag (case-insensitive), newest first. */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const t = tag.toLowerCase();
  const all = await getBlogPosts();
  return all.filter(p => (p.data.tags ?? []).some(x => x.toLowerCase() === t));
}

/** All distinct tags across non-draft posts, sorted alphabetically. */
export async function getAllTags(): Promise<string[]> {
  const all = await getBlogPosts();
  const set = new Set<string>();
  for (const p of all) for (const t of p.data.tags ?? []) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b));
}

/** URL-safe slug for a tag. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, '-');
}
