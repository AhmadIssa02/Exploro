import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  verifyEmailToken?: string;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  // Include new fields added to User schema
  @IsOptional()
  @IsString({ each: true })
  savedPosts?: string[];

  @IsOptional()
  @IsString({ each: true })
  friends?: string[];

  @IsOptional()
  @IsString({ each: true })
  receivedFriendRequests?: string[];
}
