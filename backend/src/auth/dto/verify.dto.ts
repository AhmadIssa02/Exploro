import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class verifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsString()
  @IsNotEmpty()
  @IsJWT()
  verifyEmailToken: string;
}
