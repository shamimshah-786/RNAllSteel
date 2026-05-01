import BlogListingClient from './BlogListingClient';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Steel Fabrication Blog for Mumbai & Thane | RN All Steel',
  description:
    'Read steel fabrication tips, railing guides, gate ideas, grill designs and maintenance advice from RN All Steel for homeowners and businesses in Mumbai, Thane and Mumbra.',
  keywords: [
    'steel fabrication blog',
    'steel railing guide Mumbai',
    'main gate ideas Thane',
    'window grill design Mumbra',
    'steel fabrication tips Mumbai',
    'stainless steel maintenance tips',
    'balcony grill design ideas',
    'RN All Steel blog'
  ],
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/blog',
  },
  openGraph: {
    title: 'Steel Fabrication Blog for Mumbai & Thane | RN All Steel',
    description:
      'Steel fabrication tips, railing guides, gate ideas, grill designs and maintenance advice for Mumbai, Thane and Mumbra.',
    url: 'https://rnallsteelfabrication.com/blog',
    type: 'website',
    images: [
      {
        url: '/blog/stainless-steel-main-gate-house.webp',
        width: 1200,
        height: 630,
        alt: 'RN All Steel Fabrication Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steel Fabrication Blog for Mumbai & Thane | RN All Steel',
    description:
      'Steel fabrication tips, railing guides, gate ideas and grill design advice for Mumbai, Thane and Mumbra.',
    images: ['/blog/stainless-steel-main-gate-house.webp'],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListingClient posts={posts} />;
}