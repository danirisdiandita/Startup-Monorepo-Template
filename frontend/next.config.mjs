/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", 
                hostname: "images.unsplash.com", 
            }, 
            {
                protocol: "https", 
                hostname: "tailwindui.com"
            }, 
            {
                protocol: "https", 
                hostname: "lh3.googleusercontent.com"
            }
        ]
    }, 
    serverRuntimeConfig: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET, 
        NEXTAUTH_URL: process.env.NEXTAUTH_URL, 
        GITHUB_ID: process.env.GITHUB_ID, 
        GITHUB_SECRET: process.env.GITHUB_SECRET, 
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID, 
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET, 
        BACKEND_URL: process.env.BACKEND_URL
    }
};

export default nextConfig;
