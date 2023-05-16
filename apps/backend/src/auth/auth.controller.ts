import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiSecurity, ApiTags, ApiForbiddenResponse } from '@nestjs/swagger'

@ApiTags('Auth')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiSecurity('x-api-key')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
