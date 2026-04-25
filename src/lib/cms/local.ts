import { getCollection, getEntry, render } from 'astro:content';
import type {
  Author,
  CMSProvider,
  ListOptions,
  Page,
  PaginatedResult,
  Post,
} from '../../types/cms';

// --- helpers -----------------------------------------------------------------

async function renderToHtml(entry: Awaited<ReturnType<typeof getEntry>>): Promise<string> {
  if (!entry) return '';
  await render(entry);
  return (entry as unknown as { body?: string }).body ?? '';
}

async function resolveAuthor(slug?: string): Promise<Author | undefined> {
  if (!slug) return undefined;
  const entry = await getEntry('authors', slug);
  if (!entry) return undefined;
  return {
    slug: entry.id,
    name: entry.data.name,
    bio: entry.data.bio,
    avatar: entry.data.avatar,
  };
}

// --- provider ----------------------------------------------------------------

export const localProvider: CMSProvider = {
  async getPage(slug) {
    const entry = await getEntry('pages', slug);
    if (!entry) return null;
    return {
      slug: entry.id,
      title: entry.data.title,
      body: await renderToHtml(entry),
      seo: entry.data.seo,
    };
  },

  async getAllPages() {
    const entries = await getCollection('pages');
    return Promise.all(
      entries.map(
        async (entry): Promise<Page> => ({
          slug: entry.id,
          title: entry.data.title,
          body: await renderToHtml(entry),
          seo: entry.data.seo,
        }),
      ),
    );
  },

  async getPost(slug) {
    const entry = await getEntry('posts', slug);
    if (!entry) return null;
    return {
      slug: entry.id,
      title: entry.data.title,
      excerpt: entry.data.excerpt,
      body: await renderToHtml(entry),
      heroImage: entry.data.heroImage,
      author: await resolveAuthor(entry.data.author),
      publishedAt: entry.data.publishedAt.toISOString(),
      updatedAt: entry.data.updatedAt?.toISOString(),
      tags: entry.data.tags,
      seo: entry.data.seo,
    };
  },

  async listPosts(options: ListOptions = {}) {
    const { limit, offset = 0, tag, orderBy = 'publishedAt', order = 'desc' } = options;

    let entries = await getCollection('posts');

    if (tag) {
      entries = entries.filter((e) => e.data.tags.includes(tag));
    }

    entries.sort((a, b) => {
      const aVal =
        orderBy === 'publishedAt'
          ? a.data.publishedAt.getTime()
          : a.data.title.localeCompare(b.data.title);
      const bVal = orderBy === 'publishedAt' ? b.data.publishedAt.getTime() : 0;
      const diff = typeof aVal === 'number' && typeof bVal === 'number' ? aVal - bVal : aVal;
      return order === 'desc' ? -diff : diff;
    });

    const total = entries.length;
    const sliced = limit ? entries.slice(offset, offset + limit) : entries.slice(offset);

    const items = await Promise.all(
      sliced.map(
        async (entry): Promise<Post> => ({
          slug: entry.id,
          title: entry.data.title,
          excerpt: entry.data.excerpt,
          body: await renderToHtml(entry),
          heroImage: entry.data.heroImage,
          author: await resolveAuthor(entry.data.author),
          publishedAt: entry.data.publishedAt.toISOString(),
          updatedAt: entry.data.updatedAt?.toISOString(),
          tags: entry.data.tags,
          seo: entry.data.seo,
        }),
      ),
    );

    return {
      items,
      total,
      hasMore: offset + items.length < total,
    } satisfies PaginatedResult<Post>;
  },

  async getPostSlugs() {
    const entries = await getCollection('posts');
    return entries.map((e) => e.id);
  },

  async getAuthor(slug) {
    return (await resolveAuthor(slug)) ?? null;
  },
};
