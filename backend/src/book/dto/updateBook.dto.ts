// create-book.dto.ts
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Category } from '../schemas/book.schema';


export class UpdateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsNumber()
  price: number;

  @IsEnum(Category)
  category: Category;
}
