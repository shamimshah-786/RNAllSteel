import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const slug    = filename.replace(/\.mdx?$/, '');
      const raw     = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title:       data.title       ?? 'Untitled',
        description: data.description ?? '',
        date:        data.date        ?? null,
        coverImage:  data.coverImage  ?? null,
        category:    data.category    ?? 'General',
        tags:        data.tags        ?? [],
        author:      data.author      ?? 'RN All Steel',
        readingTime: readingTime(content).text,
        published:   data.published   ?? true,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath  = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    title:       data.title       ?? 'Untitled',
    description: data.description ?? '',
    date:        data.date        ?? null,
    coverImage:  data.coverImage  ?? null,
    category:    data.category    ?? 'General',
    tags:        data.tags        ?? [],
    author:      data.author      ?? 'RN All Steel',
    readingTime: readingTime(content).text,
    published:   data.published   ?? true,
  };
}


/**
 * Extracts H2 and H3 headings from raw MDX content
 * Returns: [{ id, text, level }]
 */
export function extractHeadings(content) {
  const lines   = content.split('\n');
  const heading = /^(#{2,3})\s+(.+)$/;
  const result  = [];

  for (const line of lines) {
    const match = line.match(heading);
    if (!match) continue;
    const level = match[1].length;          // 2 or 3
    const text  = match[2].trim()
      .replace(/\*\*/g, '')                 // strip bold markers
      .replace(/`/g, '');                   // strip code ticks
    const id    = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    result.push({ id, text, level });
  }

  return result;
}