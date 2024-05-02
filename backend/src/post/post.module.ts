import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedPostSchema } from './schema/post.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'FeedPost', schema: FeedPostSchema },
      { name: 'User', schema: UserSchema}
    ])],
  controllers: [PostController],
  providers: [PostService, UsersService]
})
export class PostModule {}
