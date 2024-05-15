// create-book.dto.ts
import { IsEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class UpdatePostDto {
  @IsString()
  username?: string;

  @IsString()
  location?: string;

  @IsString()
  content?: string;

  @IsString()
  profileImageUrl?: string;

  @IsString()
  mainImageUrl?: string;

  @IsNumber()
  likeCount?: number;


  // @IsEmpty({ message: 'You cannot pass user id' })
  // readonly user: User;
}
