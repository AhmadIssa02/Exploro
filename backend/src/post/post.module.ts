import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedPostSchema } from './schema/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'FeedPost', schema: FeedPostSchema }])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
