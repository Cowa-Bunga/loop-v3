import { IsOptional, IsString } from 'class-validator'

export class CreateDriverDto {
  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  mobile_no: string

  @IsString()
  password: string

  @IsString()
  vehicle_type: string

  @IsString()
  employee_code: string

  @IsString()
  @IsOptional()
  payment_setting?: string
}
