import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ClientRequest } from '../shared/entities/request.entity'
import * as admin from 'firebase-admin'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    // TODO: remove hard key
    const apiKey =
      request.headers['x-api-key'] ||
      '9bzn9vwcy9zn5xvbito2yd3xacjvvatKJWhfTFoLNvCgLtKnmv'

    if (!apiKey) {
      throw new UnauthorizedException('Invalid or missing x-api-key.')
    }
    try {
      const db = admin.firestore()
      const clients = await db
        .collection('clients')
        .where('api.key', '==', apiKey)
        .limit(1)
        .get()

      if (clients.empty) {
        throw new UnauthorizedException('Invalid or missing x-api-key.')
      }

      const client = clients.docs.pop()
      request['client'] = new ClientRequest(client)
    } catch {
      throw new UnauthorizedException('Invalid or missing x-api-key.')
    }
    return true
  }
}
