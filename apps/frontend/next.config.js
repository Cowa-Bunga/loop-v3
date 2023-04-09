const { withNx } = require('@nrwl/next/plugins/with-nx')
const path = require('path')
const webpack = require('webpack')

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
  pageExtensions: ['page.tsx', 'page.ts'],

  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium')
      })
    )
    return config
  }
}

module.exports = withNx(nextConfig)
