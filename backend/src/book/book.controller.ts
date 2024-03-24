import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book, Category } from './schemas/book.schema';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id:string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id:string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookService.updateById(id, updateBookDto);
  }

  
  @Delete(':id')
  async deleteBook(
    @Param('id')
    id:string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
