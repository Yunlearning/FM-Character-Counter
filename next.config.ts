import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        dimensions: false, // 移除 width 和 height
                    },
                },
            ],
        });
        return config;
    },
};

export default nextConfig;
