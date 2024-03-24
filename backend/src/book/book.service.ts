import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book, Category } from './schemas/book.schema';
import { CreateBookDto } from './dto/createBook.dto';
import {Query} from 'express-serve-static-core';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}
  
  async findAll(query: Query): Promise<Book[]> {

    const resultsPerPage = 6;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * resultsPerPage;
    const keyword = query.keyword ? {
      title: {
        $regex: query.keyword,
        $options: 'i'
      }
    } : {};

    const books = await this.bookModel.find({...keyword}).limit(resultsPerPage).skip(skip);
    return books;
  }
  
  async create(createBookDto:CreateBookDto): Promise<Book> {
    const newBook = await this.bookModel.create(createBookDto);
    return newBook;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async updateById(id: string, createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, createBookDto,
      {
        new: true,
        runValidators: true
      });
    }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
   }

}
