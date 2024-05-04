import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCommentsPostSchema } from './schemas/userCommentsPost.schema';
import { UserCommentsPostController } from './userCommentsPost.controller';
import { UserCommentsPostService } from './userCommentsPost.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserCommentsPost', schema: UserCommentsPostSchema }])],
  controllers: [UserCommentsPostController],
  providers: [UserCommentsPostService],
})
export class UserCommentsPostModule {}
