import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Throttle } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
@Throttle({ default: { limit: 1000000, ttl: 60000 } })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('paginate')
  findWithPagination(@Query() query: ExpressQuery): Promise<User[]> {
    return this.usersService.findUsersWithPagination(query);
  }

  // findAll(@Query() query: ExpressQuery): Promise<User[]> {
  //   return this.usersService.findAll(query);
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Post('email')
  findByEmail(@Body('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
