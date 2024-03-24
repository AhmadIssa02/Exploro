import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { FeedPost } from './schema/post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('feedpost')
export class PostController {

    constructor(private postService: PostService ) {}

    @Get()
    async getAllPosts(): Promise<FeedPost[]> {
        return this.postService.getAllPosts();
    }
    @Post()
    async addPost(@Body() createPostDto: CreatePostDto): Promise<FeedPost> {
      return this.postService.create(createPostDto);
    }

    @Get(':id')
    async getPost(
      @Param('id')
      id:string): Promise<FeedPost> {
      return this.postService.findById(id);
    }
  
    @Put(':id')
    async updatePost(
      @Param('id') id:string, @Body() updatePostDto: UpdatePostDto): Promise<FeedPost> {
      return this.postService.updateById(id, updatePostDto);
    }
  
    
    @Delete(':id')
    async deletePost(
      @Param('id')
      id:string): Promise<FeedPost> {
      return this.postService.deleteById(id);
    }
}
