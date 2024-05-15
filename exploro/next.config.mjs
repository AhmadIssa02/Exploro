const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.chatbase.co;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' http://localhost:3000 https://test.api.amadeus.com https://www.chatbase.co https://tripadvisor16.p.rapidapi.com https://travel-advisor.p.rapidapi.com;
    frame-src 'self' https://www.chatbase.co;
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ' ').trim(), // Ensure proper formatting without newlines
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      }
    ],
  },
};

export default nextConfig;
