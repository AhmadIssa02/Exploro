import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim()) // Transform email to lowercase and trim
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
