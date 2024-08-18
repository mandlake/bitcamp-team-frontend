/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        port: '',
        pathname: '/bucket-lawmate-lawyer/**',
      },
    ],
    domains: [
      'mblogthumb-phinf.pstatic.net',
      'www.shutterstock.com',
      'img.etoday.co.kr',
      'img.icons8.com',
      'blog.kakaocdn.net',
      'bucket-lawmate-lawyer.kr.object.ncloudstorage.com',
    ], // Add the hostname here
  },
};

export default nextConfig;
