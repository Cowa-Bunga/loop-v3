import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@ApiSecurity('x-api-key')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
