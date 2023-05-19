import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { ClientRequest, UserRequest } from '../entities/request.entity'
import { ClientService } from '../../modules/client/client.service'
import { UserService } from '../../modules/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private clientService: ClientService,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.header('x-api-key')
    const authHeader = request.header('Authorization')

    if (!apiKey && !authHeader) {
      throw new UnauthorizedException('User is not authorized. Please provide valid authentication credentials.')
    }
    try {
      if (apiKey) {
        await this.validateAPIKey(apiKey, request)
      } else {
        await this.validateToken(authHeader, request)
      }
    } catch (e) {
      Logger.error(e)
      throw new UnauthorizedException('User is not authorized. Please provide valid authentication credentials.')
    }
    return true
  }

  validateAPIKey = async (apiKey: string, request: Request) => {
    const clients = await this.clientService.getClientByKey(apiKey)

    if (clients.empty) {
      throw new UnauthorizedException('Invalid or missing API Key.')
    }

    const client = clients.docs.pop()
    request['client'] = new ClientRequest(client)
  }

  validateToken = async (header: string, request: Request) => {
    const [type, token] = header.split(' ') ?? []
    if (type !== 'Bearer') {
      throw new UnauthorizedException('User is not authorized. Please provide valid authentication credentials.')
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET')
    })
    const client_id = payload.client.id
    const user_id = payload.user.id

    const client = await this.clientService.getClientDoc(client_id)
    const user = await this.userService.getUserDoc(user_id)

    if (!client.exists || !user.exists) {
      throw new UnauthorizedException('Client or user does not exist. Please provide valid authentication credentials.')
    }

    if (client.data().archived === true) {
      throw new UnauthorizedException(
        'Your company no longer has access to the Loop platform. Please contact customer support for further assistance.'
      )
    }

    const userPermissions = await this.userService.getUserPermissionsDoc(user_id, client_id)

    request['client'] = new ClientRequest(client)
    request['user'] = new UserRequest(user, userPermissions)
  }
}
