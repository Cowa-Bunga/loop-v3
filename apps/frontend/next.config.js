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
  //         destination: 'http://localhost:3333/api/:path*'
  //       }
  //     ]
  //   }
  // }

  // Optional build-time configuration options
  sentry: {
    // See the sections below for information on the following options:
    //   'Configure Source Maps':
    //     - disableServerWebpackPlugin
    //     - disableClientWebpackPlugin
    hideSourceMaps: process.env.NODE_ENV === 'production'
    //     - widenClientFileUpload
    //   'Configure Legacy Browser Support':
    //     - transpileClientSDK
    //   'Configure Serverside Auto-instrumentation':
    //     - autoInstrumentServerFunctions
    //     - excludeServerRoutes
    //   'Configure Tunneling to avoid Ad-Blockers':
    //     - tunnelRoute
  }
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  org: 'loop-platform-pty-ltd',
  project: 'loop-pro-frontend',
  silent: true
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withNx(
  withSentryConfig(nextConfig, sentryWebpackPluginOptions)
)
