//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  standalone: true,
  nx: {
    svgr: false
  },
  pageExtensions: ['page.tsx', 'page.ts']
};

module.exports = withNx(nextConfig);
