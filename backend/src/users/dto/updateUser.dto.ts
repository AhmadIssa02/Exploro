import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  bio?: string;

  @IsString()
  profilePicture?: string;

  @IsBoolean()
  isVerified?: boolean;

  @IsString()
  verifyEmailToken?: string;

  @IsString()
  resetPasswordToken?: string;
}
