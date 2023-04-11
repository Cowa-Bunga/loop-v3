import { IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  public email: string
  public password: string
}
