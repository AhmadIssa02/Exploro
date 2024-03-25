import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedPostSchema } from './schema/post.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'FeedPost', schema: FeedPostSchema }])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
