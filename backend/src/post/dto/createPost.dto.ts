// create-book.dto.ts
import { IsString } from 'class-validator';


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
}
