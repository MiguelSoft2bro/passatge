const path = require('path');
const base = '/passatge';

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,       // genera /carta/index.html
  basePath: base,            // ajusta rutas a /passatge
  assetPrefix: base + '/',   // carga estáticos desde /passatge/_next

  // (opcional, si los quieres mantener)
  distDir: process.env.NEXT_DIST_DIR || '.next',
  experimental: { outputFileTracingRoot: path.join(__dirname, '../') },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};
