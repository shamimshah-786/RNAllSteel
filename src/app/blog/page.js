import BlogListingClient from './BlogListingClient';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Steel Fabrication Tips & Guides | Blog – RN All Steel',
  description:
    'Expert guides on steel railings, main gates, window grills, and fabrication tips for Mumbai & Thane homeowners and contractors.',
  keywords:
    'steel fabrication blog, railing tips Mumbai, main gate guide Thane, window grill types, steel care tips',
  alternates: { canonical: 'https://rnallsteelfabrication.com/blog' },
  openGraph: {
    title: 'Steel Fabrication Blog | RN All Steel – Mumbai & Thane',
    description:
      'Expert guides, tips and project insights for steel fabrication across Mumbai & Thane.',
    url: 'https://rnallsteelfabrication.com/blog',
    images: [
      {
        url: 'https://rnallsteelfabrication.com/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'RN All Steel Fabrication Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steel Fabrication Blog | RN All Steel',
    description: 'Expert guides on railings, gates, grills for Mumbai & Thane.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListingClient posts={posts} />;
}