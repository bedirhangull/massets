/** @type {import('next').NextConfig} */
const path = require('path');

const aliasPathsToResolve = [
  { name: 'pages', path: path.resolve(__dirname, './') },
  { name: 'components', path: path.resolve(__dirname, './src/components') },
]

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, './')],
      use: [defaultLoaders.babel],
    })
    aliasPathsToResolve.forEach((module) => {
      console.log(module.path);
      config.resolve.alias[module.name] = module.path
    })
    return config;
  }
}



// module.exports = nextConfig


module.exports = nextConfig