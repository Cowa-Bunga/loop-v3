import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://1e734584d2344f87829f27cbbc1ee99a@o4505187363979264.ingest.sentry.io/4505192816574464',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
