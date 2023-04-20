const { withNx } = require('@nrwl/next/plugins/with-nx')
const path = require('path')

const nextConfig = {
  // output: 'standalone',
  // typescript: {
  //   ignoreBuildErrors: true
  // },
  // transpilePackages: ['i18n', 'auth', 'firebase', 'reactfire'],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../')
  },
  nx: {
    svgr: false
  },
  pageExtensions: ['page.tsx', 'page.ts']
}

module.exports = withNx(nextConfig)
