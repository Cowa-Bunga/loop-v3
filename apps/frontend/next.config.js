//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const path = require('path');
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../')
  },
  nx: {
    svgr: false
  },
  pageExtensions: ['page.tsx', 'page.ts']
};

module.exports = withNx(nextConfig);
