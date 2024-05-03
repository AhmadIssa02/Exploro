import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SavedPostSchema } from './schema/savedPost.schema';
import { SavedPostController } from './savedPost.controller';
import { SavedPostService } from './savedPost.service';
import { PostService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';
import { PostModule } from 'src/post/post.module';
import { UsersModule } from 'src/users/users.module';
import { FeedPost, FeedPostSchema } from 'src/post/schema/post.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
        { name: FeedPost.name, schema: FeedPostSchema }, // Provide FeedPostModel using MongooseModule.forFeature
        { name: 'SavedPost', schema: SavedPostSchema },
        { name: User.name, schema: UserSchema }
      ])],
  controllers: [SavedPostController],
  providers: [SavedPostService, PostService, UsersService]
})
export class SavedPostModule {}
