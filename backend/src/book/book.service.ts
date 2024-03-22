import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book, Category } from './schemas/book.schema';
import { CreateBookDto } from './dto/createBook.dto';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}
  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async create(createBookDto:CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }
}
