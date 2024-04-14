import { IsEmpty, IsString, isEmpty } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class CreatePostDto {
  @IsString()
  username: string;

  @IsString()
  location: string;

  @IsString()
  content: string;

  @IsString()
  profileImageUrl: string;

  @IsString()
  mainImageUrl: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
