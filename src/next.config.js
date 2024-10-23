   /** @type {import('next').NextConfig} */
   const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/price',
          destination: 'https://api.blockberry.one/sui/v1/widgets/get-price',
        },
      ];
    },
  };

  module.exports = nextConfig;