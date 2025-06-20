import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		API_BASE_URL: "https://jsm33t.com/api"
	},
	images: {
		domains: ['around.createx.studio', 'api.jsm33t.com','localhost','res.cloudinary.com']
	},
	eslint: {
		ignoreDuringBuilds: true
	}
};

export default nextConfig;
