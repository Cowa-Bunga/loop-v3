import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserRequest } from '../entities/request.entity'

/**
 * Custom decorator to access the User from the request. Only available via jwt authentiation.
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserRequest => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
