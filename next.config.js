/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        dangerouslyAllowSVG: true,
        domains: ['source.boringavatars.com', 'lh3.googleusercontent.com'],
    },
};

module.exports = nextConfig;
