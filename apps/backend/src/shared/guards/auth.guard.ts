import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { ClientRequest, UserRequest } from '../entities/request.entity'
import { ClientService } from '../../modules/client/client.service'
import { UserService } from '../../modules/user/user.service'

/**
 * Custom guard to perform authentication and authorization for the API
 * Combines both API Key and JWT authentication, based on the type of header provided.
 */
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

    // Check if the request contains either an api key or a jwt token.
    if (!apiKey && !authHeader) {
      throw new UnauthorizedException('User is not authorized. Please provide valid authentication credentials.')
    }

    // Validate the provided api key or jwt token.
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

  /**
   * Validates the provided api key and appends the client to the request
   * @param apiKey api key provided in the x-api-key header
   * @param request request object to append client to
   */
  validateAPIKey = async (apiKey: string, request: Request) => {
    // Obtain the client from the database via api key.
    const client = await this.clientService.getClientByKey(apiKey)

    // Check if a client has been found for the given api key
    if (!client.exists) {
      throw new UnauthorizedException('Invalid or missing API Key.')
    }

    // Add the client object to the request.
    request['client'] = new ClientRequest(client)
  }

  /**
   * Validates the provided jwt token and appends the client and user to the request
   * @param header Authorization header value containing the jwt token
   * @param request request object to append client and user to
   */
  validateToken = async (header: string, request: Request) => {
    // Split the header value, and check that the provided value is a bearer token.
    const [type, token] = header.split(' ') ?? []
    if (type !== 'Bearer') {
      throw new UnauthorizedException('User is not authorized. Please provide valid authentication credentials.')
    }

    // Verify the provided token and decode the payload.
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET')
    })
    const client_id = payload.client.id
    const user_id = payload.user.id

    // Obtain the client and user from the database.
    const client = await this.clientService.getClientById(client_id)
    const user = await this.userService.getUserById(user_id)

    // Check if the client and user exists
    if (!client.exists || !user.exists) {
      throw new UnauthorizedException('Client or user does not exist. Please provide valid authentication credentials.')
    }

    // Check that the client is not archived.
    if (client.data().archived === true) {
      throw new UnauthorizedException(
        'Your company no longer has access to the Loop platform. Please contact customer support for further assistance.'
      )
    }

    // Obtain the user's permissions
    const userPermissions = await this.userService.getUserPermissions(user_id, client_id)

    // Add the client and user object to the request.
    request['client'] = new ClientRequest(client)
    request['user'] = new UserRequest(user, userPermissions)
  }
}
