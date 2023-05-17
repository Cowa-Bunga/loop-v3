import { NextRequest } from 'next/server'
// import { checkPermissions } from '@util/rules/permissions'

const middleware = (request: NextRequest) => {
  // const cookie = JSON.parse(request.cookies.get('cowabunga-user-cookie')?.value)
  // TODO: breaks build
  // Learn More: https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
  // if (request.nextUrl.pathname.startsWith('/fleet')) {
  //   const canAccess = (required: string[]) =>
  //     checkPermissions([...cookie['permissions']['scopes']], required)
  //   if (!canAccess(['fleet:access'])) {
  //     return NextResponse.rewrite(new URL('/', request.url))
  //   }
  // }
}
export const config = {
  matcher: '/:path*'
}
export default middleware
