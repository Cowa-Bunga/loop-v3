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
    const apiKey = request.headers['x-api-key']

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
