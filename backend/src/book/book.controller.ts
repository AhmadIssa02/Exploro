import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book, Category } from './schemas/book.schema';
import { CreateBookDto } from './dto/createBook.dto';

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
}
