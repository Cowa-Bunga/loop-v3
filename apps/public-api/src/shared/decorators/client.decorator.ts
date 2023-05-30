import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ClientRequest } from '../entities/request.entity'

/**
 * Custom decorator to access the Client from the request
 */
export const Client = createParamDecorator((data: unknown, ctx: ExecutionContext): ClientRequest => {
  const request = ctx.switchToHttp().getRequest()
  return request.client
})
