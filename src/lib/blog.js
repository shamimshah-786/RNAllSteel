import fs           from 'fs';
import path         from 'path';
import matter       from 'gray-matter';
import readingTime  from 'reading-time';

// lib/blog.js ke top pe — BLOG_DIR ke baad
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
// ✅ Build time pe warn karo taaki Vercel logs mein dikh sake
if (!fs.existsSync(BLOG_DIR)) {
  console.warn(
    `⚠️  [blog.js] BLOG_DIR not found at: ${BLOG_DIR}\n` +
    `   Make sure src/content/blog/ is committed to git and not in .gitignore`
  );
}

/* ─────────────────────────────────────────────
   getAllPosts — metadata only (no raw content)
───────────────────────────────────────────── */
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
        date:        data.date
                       ? new Date(data.date).toISOString()
                       : null,
        coverImage:  data.coverImage  ?? null,
        category:    data.category    ?? 'General',
        tags:        Array.isArray(data.tags) ? data.tags : [],
        author:      data.author      ?? 'RN All Steel',
        readingTime: readingTime(content).text,
        published:   data.published   ?? true,
        faq:         Array.isArray(data.faq) ? data.faq : [],
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0));
}

/* ─────────────────────────────────────────────
   getPostBySlug — metadata + matter-stripped content
   (used for extractHeadings + meta only)
───────────────────────────────────────────── */
export function getPostBySlug(slug) {
  const filePath = _resolvePath(slug);
  if (!filePath) return null;

  const raw                   = fs.readFileSync(filePath, 'utf-8');
  const { data, content }     = matter(raw);

  return {
    slug,
    content,             // ← matter-stripped MDX body (for extractHeadings)
    title:       data.title       ?? 'Untitled',
    description: data.description ?? '',
    date:        data.date
                   ? new Date(data.date).toISOString()
                   : null,
    coverImage:  data.coverImage  ?? null,
    category:    data.category    ?? 'General',
    tags:        Array.isArray(data.tags) ? data.tags : [],
    author:      data.author      ?? 'RN All Steel',
    readingTime: readingTime(content).text,
    published:   data.published   ?? true,
    faq:         Array.isArray(data.faq) ? data.faq : [],
  };
}

/* ─────────────────────────────────────────────
   getRawPostSource — full raw file string
   (used by MDXRemote — includes frontmatter)
   This is what fixes the build error.
───────────────────────────────────────────── */
export function getRawPostSource(slug) {
  const filePath = _resolvePath(slug);
  if (!filePath) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

/* ─────────────────────────────────────────────
   extractHeadings — H2/H3 from matter content
───────────────────────────────────────────── */
export function extractHeadings(content) {
  const headingRe = /^(#{2,3})\s+(.+)$/;
  const result    = [];

  for (const line of content.split('\n')) {
    const match = line.match(headingRe);
    if (!match) continue;

    const level = match[1].length;
    const text  = match[2].trim()
      .replace(/\*\*/g, '')
      .replace(/`/g, '');
    const id    = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    result.push({ id, text, level });
  }

  return result;
}

/* ─────────────────────────────────────────────
   Internal helper
───────────────────────────────────────────── */
function _resolvePath(slug) {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath  = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(mdxPath)) return mdxPath;
  if (fs.existsSync(mdPath))  return mdPath;
  return null;
}