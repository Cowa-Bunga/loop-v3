import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  public id: number
  public firstName: string
  public lastName: string
  public email: string
  public password: string
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string

  @IsString()
  @IsNotEmpty()
  public lastName: string

  @IsString()
  @IsNotEmpty()
  public email: string

  // @IsString()
  // protected salt: string;

  @IsString()
  @IsNotEmpty()
  public password: string
}
