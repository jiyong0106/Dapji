/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';

const withPWA = nextPwa({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    prependData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss";`,
  },
};

export default nextConfig;
// export default withPWA(nextConfig);
//pwa용
