/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'abijrjpibayqrzanhqcq.supabase.co',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
