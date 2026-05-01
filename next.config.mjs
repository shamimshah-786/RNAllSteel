// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {

  // ✅ Vercel ko batata hai ki content folder bundle mein include karo
  // Dynamic fs.readdirSync() files Vercel pe miss ho jaati hain bina is config ke
  experimental: {
    outputFileTracingIncludes: {
      '/blog':        ['./src/content/blog/**'],
      '/blog/[slug]': ['./src/content/blog/**'],
      '/sitemap.xml': ['./src/content/blog/**'],
    },
  },

  images: {
    // Agar external images use karte ho toh yahan add karo
    // remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
  },

  // Webpack warnings suppress (optional)
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;