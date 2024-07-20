/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["192.168.1.105"],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.105',
                port: '8000',
                pathname: 'storage/media/**',
            },
            {
                protocol:'https',
                hostname:'thispersondoesnotexist.com',
                port:'',
                pathname:'*'
            }
        ],
    },
};

export default nextConfig;
