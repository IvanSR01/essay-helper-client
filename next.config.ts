import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEST_PUBLIC_API_URL: process.env.NEST_PUBLIC_API_URL,
	},
};

export default nextConfig;
