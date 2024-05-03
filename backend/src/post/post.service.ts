import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeedPost } from './schema/post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/users/schemas/user.schema';
import { UpdatePostDto } from './dto/updatePost.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(FeedPost.name)
    private postModel: Model<FeedPost>,
    private userService: UsersService,
  ) {}

  async getAllPosts() {
    return await this.postModel.find();
  }

  async create(createPostDto: CreatePostDto): Promise<FeedPost> {
    console.log({'service' : createPostDto}); 

    const user = await this.userService.findOne(createPostDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const data = { ...createPostDto, user: user._id };
    console.log(data);
    const newPost = new this.postModel(data);
    return await newPost.save();
  }

  async findById(id: string): Promise<FeedPost> {
    const isValidObjectId = Types.ObjectId.isValid(id); // Check if id is a valid ObjectId
    if (!isValidObjectId) {
      throw new NotFoundException('Invalid post ID');
    }
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async updateById(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<FeedPost> {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<FeedPost> {
    return await this.postModel.findByIdAndDelete(id);
  }

  async likePost(userId: string, postId: string): Promise<FeedPost> {
    return this.postModel.findByIdAndUpdate(postId, {
      $addToSet: { likes: userId },
      $inc: { likeCount: 1 },
    }, { new: true }).exec();
  }

  async unlikePost(userId: string, postId: string): Promise<FeedPost> {
    return this.postModel.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
      $inc: { likeCount: -1 },
    }, { new: true }).exec();
  }
}
