import { IsString } from 'class-validator'

export class CreateHubDto {
  @IsString()
  name: string
}
