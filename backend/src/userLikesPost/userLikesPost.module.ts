import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLikesPostSchema } from './schemas/userLikesPost.schema';
import { UserLikesPostController } from './userLikesPost.controller';
import { UserLikesPostService } from './userLikesPost.service';
import { UsersService } from 'src/users/users.service';
import { PostService } from 'src/post/post.service';
import { UserSchema } from 'src/users/schemas/user.schema';
import { FeedPostSchema } from 'src/post/schema/post.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'UserLikesPost', schema: UserLikesPostSchema },
    { name: 'User', schema: UserSchema },
    { name: 'FeedPost', schema: FeedPostSchema },
  ])],
  controllers: [UserLikesPostController],
  providers: [UserLikesPostService, UsersService, PostService],
})
export class UserLikesPostModule {}
