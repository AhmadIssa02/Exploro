import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SavedPost } from './schema/savedPost.schema';
import { UsersService } from 'src/users/users.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class SavedPostService {
  constructor(
    @InjectModel(SavedPost.name) private readonly savedPostModel: Model<SavedPost>,
    private readonly userService: UsersService,
    private readonly postService: PostService,
  ) {}

  async getAllUserSavedPosts(userId: string): Promise<SavedPost[]> {
    const response =  this.savedPostModel.find({ userId }).exec();
    return response;
  }

  async getAllSavedPosts(): Promise<SavedPost[]> {
    return this.savedPostModel.find().exec();
  }

  async savePost( userId: string, postId: string): Promise<SavedPost> {
    const user = await this.userService.findOne(userId);
    // console.log("user"+user)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.postService.findById(postId);
    // console.log("post"+post)
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const existingSavedPost = await this.savedPostModel.findOne({ userId, postId }).exec();
    if (existingSavedPost) {
      throw new Error('Post already saved');
    }
    const savedPost = new this.savedPostModel({ userId, postId });
    return savedPost.save();
  }

  async unsavePost(userId: string, postId: string): Promise<void> {
    const deletedPost = await this.savedPostModel.findOneAndDelete({ userId, postId }).exec();
    if (!deletedPost) {
      throw new NotFoundException('Saved post not found');
    }
    else{
        console.log("post unsaved")
    }
  }
}
