import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { FeedPost } from './schema/post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('feedpost')
export class PostController {

    constructor(private postService: PostService ) {}

    @Get()
    async getAllPosts(): Promise<FeedPost[]> {
        return this.postService.getAllPosts();
    }


    @Post()
    @UseGuards(AuthGuard())
    async addPost(
      @Body() createPostDto: CreatePostDto,
      @Req() req
      ): Promise<FeedPost> {
        return this.postService.create(createPostDto, req.user);
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
