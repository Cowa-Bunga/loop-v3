const { withNx } = require('@nrwl/next/plugins/with-nx')
const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  debugger: false,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../')
  },

  nx: {
    svgr: false
  },

  pageExtensions: ['page.tsx', 'page.ts']

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
}

module.exports = withNx(
  process.env.SENTRY_ENABLED
    ? withSentryConfig(
        {
          ...nextConfig,
          sentry: {
            hideSourceMaps: process.env.NODE_ENV === 'production'
          }
        },
        {
          org: 'loop-platform-pty-ltd',
          project: 'loop-pro-frontend',
          silent: true
        }
      )
    : nextConfig
)
