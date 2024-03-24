import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedPost } from './schema/post.schema';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectModel(FeedPost.name)
        private postModel: Model<FeedPost>,
    ) {}

    async getAllPosts() {
        return await this.postModel.find();
    }

    async create(createPostDto:CreatePostDto): Promise<FeedPost> {
        const newPost = await this.postModel.create(createPostDto);
        return newPost;
      }

    async findById(id: string): Promise<FeedPost> {
        const post = await this.postModel.findById(id);
    
        if (!post) {
          throw new NotFoundException('Post not found');
        }
    
        return post;
      }
    
    async updateById(id: string, createPostDto: CreatePostDto): Promise<FeedPost> {
        return await this.postModel.findByIdAndUpdate(id, createPostDto,
          {
            new: true,
            runValidators: true
          });
        }
        
        async deleteById(id: string): Promise<FeedPost> {
          return await this.postModel.findByIdAndDelete(id);
        }
}
