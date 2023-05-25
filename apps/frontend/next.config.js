const { withNx } = require('@nrwl/next/plugins/with-nx')
const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

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

  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         source: '/api/:path*',
  //         destination: `${process.env.API_URL}/api/:path*`
  //       }
  //     ]
  //   }
  // }

  sentry: {
    hideSourceMaps: process.env.NODE_ENV === 'production'
  }
}

// https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  org: 'loop-platform-pty-ltd',
  project: 'loop-pro-frontend',
  silent: true
}

const exportConfigs = process.env.SENTRY_ENABLED ? withSentryConfig(nextConfig, sentryWebpackPluginOptions) : nextConfig

module.exports = withNx(exportConfigs)
