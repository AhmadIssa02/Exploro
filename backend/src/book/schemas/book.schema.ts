import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'adventure',
  SCIENCE_FICTION = 'science fiction',
  FANTASY = 'fantasy',
  MYSTERY = 'mystery',
  HORROR = 'horror',
  THRILLER = 'thriller',
  DYSTOPIAN = 'dystopian',
  BIOGRAPHY = 'biography',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  price: number;
  @Prop()
  category: Category;
}
export const BookSchema = SchemaFactory.createForClass(Book);
