export interface CMSImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: CMSImage;
  noIndex?: boolean;
}

export interface Author {
  slug: string;
  name: string;
  bio?: string;
  avatar?: CMSImage;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  heroImage?: CMSImage;
  author?: Author;
  publishedAt: string; // ISO
  updatedAt?: string;
  tags: string[];
  seo?: SEO;
}

export interface Page {
  slug: string;
  title: string;
  body: string;
  seo?: SEO;
}

export interface ListOptions {
  limit?: number;
  offset?: number;
  tag?: string;
  orderBy?: 'publishedAt' | 'title';
  order?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export interface CMSProvider {
  getPage(slug: string): Promise<Page | null>;
  getAllPages(): Promise<Page[]>;

  getPost(slug: string): Promise<Post | null>;
  listPosts(options?: ListOptions): Promise<PaginatedResult<Post>>;
  getPostSlugs(): Promise<string[]>;

  getAuthor(slug: string): Promise<Author | null>;
}
